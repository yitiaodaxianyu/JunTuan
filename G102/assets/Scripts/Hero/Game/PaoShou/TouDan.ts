import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { GongJiData } from "../../Data/HeroData";
import GongJi from "../GongJi";
import { PaoDan_Type } from "../HeroConfig";
import PaoDanBaoZha from "./PaoDanBaoZha";



const {ccclass, property} = cc._decorator;

@ccclass
export default class TouDan extends GongJi {

    @property({type:cc.Enum(PaoDan_Type)})
    paodan_type:PaoDan_Type=PaoDan_Type.skill;

    game_effect_id:GameEffectId=GameEffectId.Null;    
    //目标地点，到达后爆炸
    target_pos:cc.Vec2=null;

    init(id:GameEffectId,targetPos:cc.Vec2,gjData:GongJiData)
    {
        super.initData(gjData);
        this.game_effect_id=id;
        this.target_pos=targetPos;
        //距离
        let jtTime=0.6;
        this.node.scale=3;
        this.node.x=targetPos.x;
        let yy=GameManager.getInstance().enemy_att_y;
        let disScale=1.5-(this.target_pos.y-yy)/1000;
        //this.node.y=cc.winSize.height/2+200;
        cc.tween(this.node).then(cc.spawn(cc.scaleTo(jtTime,disScale),cc.moveTo(jtTime,targetPos))).call(this.destroySelf,this).start();        
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    }

    destroySelf()
    {
        //判断是否是分裂出来的,分裂过就不能分裂了
        this.createBomb();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_PaoShouSkill2);
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    createBomb(){
        let baozha=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_hit,this.target_pos);
        // baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_active_skill_2,PaoDan_Type.super,this.gongji_data);
        // //baozha.scale=this.gongji_data.hero_data.SkillValue_2/100;
        let sheshouEx1=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        let aoe=0;
        if(sheshouEx1&&sheshouEx1>0){
            //范围提升
            aoe=sheshouEx1;
        }
        MyTool.randomSceneShake(-5,5,0.02,6);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,this.node.getPosition(),120*(1+aoe));
        if(monsters){            
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                monsterTs.beFlashInjured(this.gongji_data);                
            }
        }
        baozha.scale=1.75;
    }
}
