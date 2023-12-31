import ApkManager from "../Ads/ApkManager";
import { JiaSu } from "../Constants";
import HpProgressBar from "../Monster/HpProgressBar";
import GameManager from "../GameManager";
import MyTool from "../Tools/MyTool";
import ImmunityShield from "./ImmunityShield";
import Shield from "./Shield";
import {BuffId, BuffType, Hero_Type, SkillType } from "../Hero/Game/HeroConfig";
import { LevelManager } from "../Level/LevelManager";
import TutorailsManager from "../Tutorials/TutorailsManager";
import BuffStateManager from "../Game/BuffStateManager";
import Wall from "./Wall";
import WallManager from "./WallManager";
import { WallType } from "./WallConfig";
import { GameEffectsManager } from "../Game/GameEffectsManager";
import FightingManager from "../Game/FightingManager";
import { BuffData } from "../Hero/Game/BuffData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainWall extends Wall {

    /**城墙0特效 */
    wall_spine0:sp.Skeleton=null;
    /**城墙1特效 */
    wall_spine1:sp.Skeleton=null;
    /**当前城墙的阶段 */
    cur_wall_stage:number=0;
    /**上一个城墙的阶段 */
    pre_wall_stage:number=0;
    /**受伤的 */
    node_injured:cc.Node=null;
    injured_action:cc.Tween=null;
    node_vertigo:cc.Node=null;
    vertigo_action:cc.Tween=null;

    onLoad(){
        this.setHpChangeListen(this.onWallChangeHp.bind(this));
        this.setHpShowListen(this.showWallTeXiao.bind(this));
        super.setWallDieListen(this.onWallDie.bind(this));
        let hpRoot=cc.find('Canvas/Ui_Root/hp_root');
        this.hp_progress=hpRoot.getChildByName('hp').getComponent(HpProgressBar);
        this.shield_progress=hpRoot.getChildByName('shield').getComponent(cc.ProgressBar);
        this.hp_text=hpRoot.getChildByName('hpText').getComponent(cc.Label);
        this.shield_text=hpRoot.getChildByName('shieldText').getComponent(cc.Label);
        this.map_shield_value=new Map<number,Shield>();
        this.map_immunity_shield_value=new Map<number,ImmunityShield>();
        this.node_injured=hpRoot.parent.getChildByName('injured');
        this.node_vertigo=hpRoot.parent.getChildByName('vertigo');
        this.wall_spine0=this.node.getChildByName('wall0').getComponent(sp.Skeleton);
        this.wall_spine1=this.node.getChildByName('wall1').getComponent(sp.Skeleton);
        this.wall_spine0.node.active=false;
        this.wall_spine1.node.active=false;
        WallManager.getInstance().addWall(WallType.Main,this);
        this.showHp();
        this.showShildProgress();
        
    }

    start () {        
        BuffStateManager.getInstance().createBuffRoot(cc.v2(this.node.x,this.node.y+150),Hero_Type.Hero_Num);
        let wallDown=this.node.getChildByName('wall_down');
        let worldPos=wallDown.parent.convertToWorldSpaceAR(wallDown.getPosition());
        let pos=GameEffectsManager.getInstance().node.convertToNodeSpaceAR(worldPos);
        this.setWallRect(cc.rect(-cc.winSize.width/2,pos.y-wallDown.height/2,cc.winSize.width,wallDown.height));
        let ggp=FightingManager.getInstance().node.getComponent(cc.Graphics);
        ggp.rect(this.getWallRect().x,this.getWallRect().y,this.getWallRect().width,this.getWallRect().height);
    }

    onWallDie(){
        GameManager.getInstance().onWallDie();
    }

    startNextLevel(){            
        this.resetWallTeXiao();
        this.is_tutorail=false;
    }

    /** */
    public onWallChangeHp(hp:number):boolean
    {
        if(hp<0)
        {            
            this.showInjured();                     
        }
        /**教程 */
        if(TutorailsManager.getInstance().is_finish_game==false && this.is_tutorail==false && this.cur_hp<=this.max_hp*0.2){
            if(LevelManager.getInstance().start_level==1 ){
                //最后一波
                if(TutorailsManager.getInstance().isShowTutorials(200)){
                    this.is_tutorail=true;
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Wall_Tutorial_Add_hp;
                    buffData.buff_type=BuffType.Gain;
                    buffData.buff_value=[this.getMaxHp()*0.05];
                    buffData.remain_time=10;
                    // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                    buffData.recovery_jiange_time=0.2;
                    let buff=WallManager.getInstance().getMainWall().addBuff(buffData);
                    buff.addDestroyListen(()=>{
                        this.is_tutorail=false;
                    });
                }
            }
        }
        return true;
    }    

    showInjured(){
        if(this.injured_action)
        {
            this.injured_action.stop();
        }
        this.node_injured.opacity=255;
        this.injured_action=cc.tween(this.node_injured).to(0.5,{opacity:0}).start();
    }

    hideInjured(){
        if(this.injured_action)
        {
            this.injured_action.stop();
        }
        cc.tween(this.node_injured).to(0.2,{opacity:0}).start();
    }

    showVertigo(dt:number){
        this.node_vertigo.active=true;
        if(this.vertigo_action)
        {
            this.vertigo_action.stop();
        }
        this.node_vertigo.opacity=255;        
        this.vertigo_action=cc.tween(this.node_vertigo).to(dt,{opacity:0}).start();
    }

    hideVertigo(){
        if(this.vertigo_action)
        {
            this.vertigo_action.stop();
        }
        cc.tween(this.node_vertigo).to(0.5,{opacity:0}).start();
    }

    showWallTeXiao(){               
        this.pre_wall_stage=this.cur_wall_stage;
        if(this.hp_progress.progress>=0&&this.hp_progress.progress<0.25){            
            this.cur_wall_stage=3;
        }else if(this.hp_progress.progress>=0.25&&this.hp_progress.progress<0.5){
            this.cur_wall_stage=2;
        }else if(this.hp_progress.progress>=0.5&&this.hp_progress.progress<0.75){
            this.cur_wall_stage=1;
        }else if(this.hp_progress.progress>=0.75){
            this.cur_wall_stage=0;
        }
        if(this.cur_wall_stage!=this.pre_wall_stage){
            MyTool.randomSceneShakeSmall();
            ApkManager.getInstance().beVibrate(300);
            if(this.cur_wall_stage>0){
                this.wall_spine0.setAnimation(0,'Hurt'+this.cur_wall_stage+'_2',true);
                this.wall_spine0.node.active=true;
                if(this.cur_wall_stage>1){
                    this.wall_spine1.setAnimation(0,'Hurt'+this.cur_wall_stage+'_1',true);
                    this.wall_spine1.node.active=true;
                }else{
                    this.wall_spine1.node.active=false;
                }
            }else{
                this.wall_spine0.node.active=false;
            }
        }        
    }

    resetWallTeXiao(){
        this.pre_wall_stage=this.cur_wall_stage=0;
        if(this.wall_spine0){
            this.wall_spine0.node.active=false;
        }
        if(this.wall_spine1){
            this.wall_spine1.node.active=false;
        }
        
    }

}
