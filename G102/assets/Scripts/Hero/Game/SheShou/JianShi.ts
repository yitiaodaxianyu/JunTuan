
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import MyTool from "../../../Tools/MyTool";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { BuffId, BuffType, DamageType, JianShi_Type, SkillType } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JianShi extends Bullect {

    @property({type:cc.Enum(JianShi_Type)})
    jianshi_type:JianShi_Type=JianShi_Type.putong;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            switch(this.jianshi_type){
                case JianShi_Type.putong:{
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //本次攻击有效                        
                        if(data.feedback_type==FeedBackType.BaoJi){
                            if(this.gongji_data.hero_data.getIsUnlock(SkillType.Passive_2)){
                                //判断锥形范围的敌人
                                let fanweiData=cc.instantiate(this.gongji_data);
                                fanweiData.damage_type=DamageType.Skill;
                                fanweiData.is_bullet=false;
                                fanweiData.skill_damage_rate=this.gongji_data.hero_data.getSkillValue1(SkillType.Passive_2);
                                let shanxing=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_attack_ctrl_hit,this.node.getPosition());
                                shanxing.angle=this.node.angle;
                                //减速
                                let distance=220;
                                let min=this.move_direction-Math.PI/4;//45°+90
                                let max=min+Math.PI/2;//135°
                                //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                                let allMonsters=MonsterManager.getInstance().getMonstersForRadian(-1,this.node.getPosition(),distance,min,max);
                                if(allMonsters){
                                    for(let i=0; i<allMonsters.length; i++){
                                        let monsterTTs=allMonsters[i].getComponent(Monster);
                                        monsterTTs.beFlashInjured(fanweiData);;                                    
                                    }
                                }
                            }else{
                                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.node.getPosition());
                            }
                        }else{
                            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.node.getPosition());
                        }
                    }
                    this.is_att=true;
                    this.destroySelf();
                }break;
                case JianShi_Type.jineng:{
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //本次攻击有效
                        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.getHeadPos());
                        //node.scale=monsterTs.getSheShouAttackScale();
                        this.is_att=true;
                        this.destroySelf();
                    }else{
                        if(data.feedback_type!=FeedBackType.Die)
                            this.destroySelf();
                    }
                }break;
                case JianShi_Type.super:{
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){

                    }
                }break;
            }
            
        }
    }
}
