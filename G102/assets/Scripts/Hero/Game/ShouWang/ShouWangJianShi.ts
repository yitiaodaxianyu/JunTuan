
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import Bullect from "../Bullect";
import { JianShi_Type, SkillType } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShouWangJianShi extends Bullect {

    @property({type:cc.Enum(JianShi_Type)})
    jianshi_type:JianShi_Type=JianShi_Type.putong;    

    /**穿透数量 */
    penetration_num:number=0;
    /**原来的增伤数值 */
    old_skill_rate:number=0;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
        super.addInitFinishedListen(this.onInitFinished);
    }
    
    onInitFinished(){
        this.penetration_num=0;
        this.old_skill_rate=this.gongji_data.skill_damage_rate;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            switch(this.jianshi_type){
                case JianShi_Type.putong:{
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //本次攻击有效
                        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.getHeadPos());
                        //node.scale=monsterTs.getSheShouAttackScale();                            
                    }
                    this.is_att=true;
                    this.destroySelf();
                }break;
                case JianShi_Type.jineng:{
                    //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                    if(this.penetration_num==0){
                        this.gongji_data.skill_damage_rate=1;
                    }else{
                        this.gongji_data.skill_damage_rate=this.old_skill_rate;
                    }
                    this.is_att=false;
                    this.penetration_num++;
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //本次攻击有效
                        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.shou_wang_jianshi_skill1_hit,this.getHeadPos());
                        //node.scale=monsterTs.getSheShouAttackScale();
                    }
                }break;
                
            }
            
        }
    }
}
