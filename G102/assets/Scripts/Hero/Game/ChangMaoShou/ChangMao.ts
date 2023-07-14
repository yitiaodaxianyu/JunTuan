
import { GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { BuffId, BuffType, SkillType, DamageType } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChangMao extends Bullect {


    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){            
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){                            
                if(data.is_die==false){
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Hero_ChangMaoShow_Skill;
                    buffData.remain_time=60;
                    buffData.buff_type=BuffType.Normal;
                    buffData.buff_value=[5];
                    buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_zhuazi;
                    buffData.add_floor=1;
                    monsterTs.addDeBuff(buffData,this.gongji_data);
                    //判断有几层buff
                    let buffFloor=monsterTs.getDeBuff(BuffId.Hero_ChangMaoShow_Skill);
                    let floorNum=0;
                    if(buffFloor){
                        floorNum=buffFloor.getFloorNum();
                        if(floorNum>10){
                            floorNum=10;
                        }
                        /**额外真伤 */
                        let realData=cc.instantiate(this.gongji_data);
                        realData.damage_type=DamageType.Skill;
                        let totalAttack=realData.hero_data.total_attack
                        let realDamage=realData.hero_data.getSkillValue1(SkillType.Passive_1)*totalAttack;//0.2*100==20
                        let exRealDamage=realData.hero_data.getSkillValue2(SkillType.Passive_1)*floorNum*totalAttack;//0.05,5=0.25*100=25
                        let finalDamage=realDamage+exRealDamage;//20+25=45
                        if(finalDamage>0){
                            monsterTs.beRealDamage(realData,finalDamage);
                        }
                    }
                }
            }
            super.destroySelf();
        }
    }
}
