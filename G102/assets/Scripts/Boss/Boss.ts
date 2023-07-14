

import { GameMode } from "../Constants";
import BossHpProgressBar from "./BossHpProgressBar";
import { Enemy_State } from "../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import Monster from "../Monster/Monster";
import { BuffId, DamageType } from "../Hero/Game/HeroConfig";
import { BuffData } from "../Hero/Game/BuffData";

enum PosType{
    ZhongXin=0,
    Radian0,
    Radian60,
    Radian120,
    Radian180,
    Radian240,
    Radian300,

    Num,
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss extends Monster {

    /**血条进度条 */
    protected boss_hp_progress: BossHpProgressBar=null;  
    /**怪物血量发生变化时的回调 */
    private change_boss_hp_callback:Function=null;

    /**初始化回调 */
    private boss_init_callback:Function=null;
    /**-------------------------------统一移动相关属性-------------------------------------- */
    /**当前所处的位置类型 */
    cur_pos_type:PosType=PosType.ZhongXin;
    /**下一个要移动到的位置类型 */
    next_pos_type:PosType=PosType.ZhongXin;
    /**移动轨迹数组 */
    moving_track:cc.Vec2[]=[];

    /**攻击触发的回调 */
    att_callback:Function=null;
    /**开始移动的触发的回调 */
    move_callback:Function=null;
    is_init_hp:boolean=false;


    onLoad () {
        super.onLoad();           
        this.addChangeHpListen(this.onChangeBossHp);
        this.addInitListen(this.onInited);
        //this.initMovingTrack();        
    }

    onInited(){
        if(GameManager.getInstance().cur_game_mode!=GameMode.Boss_Challenge){
            GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss_hp,1,()=>{
                let hpRoot=cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');
                hpRoot.y=-108;
                let hpNode=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.boss_hp,cc.v2(0,0),hpRoot);
                this.boss_hp_progress=hpNode.getComponent(BossHpProgressBar); 
                this.boss_hp_progress.init(this.getMaxHp(),this.monster_id,this.monster_level);
            });
        }
        if(this.boss_hp_progress){
            this.boss_hp_progress.init(this.getMaxHp(),this.monster_id,this.monster_level);
        }
        if(this.boss_init_callback){
            this.boss_init_callback();
        }
        this.node.opacity=0;
        this.setEnemyState(Enemy_State.born);
        cc.tween(this.node).to(1,{opacity:255}).call(()=>{
            this.setEnemyState(Enemy_State.standby);
        }).start();
        if(GameManager.getInstance().cur_game_mode==GameMode.Boss_Challenge){
            let buffData=new BuffData();
            buffData.buff_id=BuffId.Boss_Mode_JianShang;
            buffData.buff_value=[-1.2];
            buffData.remain_time=30;
            super.addDeBuff(buffData,null);
        }
    }

    addBossInitedListen(callback:Function){
        this.boss_init_callback=callback;
    }

    addChangeBossHpListen(callback:Function){
        this.change_boss_hp_callback=callback;
    }

    addAttackListen(callback:Function){
        this.att_callback=callback;
    }

    addMoveListen(callback:Function){
        this.move_callback=callback;
    }

    

    onChangeBossHp(num:number){
        if(this.boss_hp_progress){
            this.boss_hp_progress.setHp(this.getCurHp());
        }
        if(this.change_boss_hp_callback){
            this.change_boss_hp_callback(num);
        }
    }

    /**--------------------------------------------统一移动---------------------------------------- */
    /**初始化移动轨迹 */
    // initMovingTrack(){
    //     let width=222;
    //     let cPos=GameManager.getInstance().getFightCenter();
    //     let aRadian=Math.PI/3;
    //     this.moving_track=new Array();
    //     this.moving_track.push(cPos);
    //     // let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
    //     // gg.moveTo(cPos.x,cPos.y);
    //     for(let i=PosType.Radian0; i<PosType.Num; i++){
    //         let radian=(i-1)*aRadian;
    //         let posX=cPos.x+width*Math.cos(radian);
    //         let posY=cPos.y+width*Math.sin(radian);
    //         this.moving_track.push(cc.v2(posX,posY));
    //         //gg.lineTo(posX,posY);
    //     }
    //     //gg.stroke();
    // }
    // /**获取下一个目标地点的坐标 */
    // getNextPos():cc.Vec2{
    //     return this.moving_track[this.next_pos_type];
    // }
    // /**获取一个随机的目标的坐标 */
    // getRandomPos():cc.Vec2{
    //     let pos=cc.v2(0,0);
    //     let randType=[];
    //     if(this.cur_pos_type==PosType.ZhongXin){
    //         for(let i=PosType.Radian0; i<PosType.Num; i++){
    //             randType.push(i);
    //         }
    //     }else{
    //         let nextType=this.cur_pos_type+1;
    //             if(nextType>=PosType.Num){
    //                 nextType=PosType.Radian0;
    //             }
    //             let prevType=this.cur_pos_type-1;
    //             if(prevType<=PosType.ZhongXin){
    //                 prevType=PosType.Radian300;
    //             }
    //             randType=[PosType.ZhongXin,nextType,prevType];
    //     }        
    //     let randIndex=Math.floor(Math.random()*randType.length);
    //     this.next_pos_type=randType[randIndex]
    //     pos=this.moving_track[this.next_pos_type];
    //     return pos;
    // }
    // /**开始移动 */
    // startMove(dt:number,pos?:cc.Vec2){
    //     super.setEnemyState(Enemy_State.move);        
    //     pos=pos?pos:this.getRandomPos();
    //     this.setTargetPos(pos,()=>{
    //         this.cur_pos_type=this.next_pos_type;
    //         if(this.node.x<-128){
    //             this.node.scaleX=this.setup_scale;
    //         }
    //         if(this.node.x>128){
    //             this.node.scaleX=-this.setup_scale;
    //         }
    //         this.startAttack();
    //     })
    //     if(this.move_callback){
    //         this.move_callback();
    //     }
    // }
    // /**设置要移动到的目标地点坐标 */
    // setTargetPos(pos:cc.Vec2,endCallback:Function){
    //     this.move_target_pos=pos;
    //     this.move_end_callback=endCallback;
    // }
    // /**开始攻击 */
    // startAttack(){
    //     //有前摇动作
    //     this.unschedule(this.startMove);
    //     super.setEnemyState(Enemy_State.att);
    //     if(this.att_callback){
    //         this.att_callback();
    //     }
    // }
}
