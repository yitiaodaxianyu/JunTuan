
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { SkillType, DamageType, BuffId, BuffType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NvWuDan extends Bullect {

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }        

    protected start(): void {
        this.tuowei_space=1;
    }

    onCollisionMonster(monsterTs:Monster) {
        //被动技能弹
        if(monsterTs){            
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.nvwu_attack_bullect_hit,this.getHeadPos());                
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BNAttack);
                /**范围伤害，不包括这个怪 */
                let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),this.gongji_data.hero_data.getSkillValue1(SkillType.Passive_1));
                //let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),260);
                if(monsters){
                    //伤害系数
                    let damageData=cc.instantiate(this.gongji_data);
                    damageData.damage_type=DamageType.Skill;
                    damageData.skill_damage_rate=this.gongji_data.hero_data.getSkillValue2(SkillType.Passive_1);
                    //毒数据
                    let duData=cc.instantiate(this.gongji_data);
                    duData.damage_type=DamageType.Skill;
                    duData.continuous_damage_rate=this.gongji_data.hero_data.getSkillValue3(SkillType.Passive_1);
                    for(let i=0; i<monsters.length; i++){
                        let monsterTTs=monsters[i].getComponent(Monster);
                        //立即造成参数2伤害
                        let data=monsterTTs.beFlashInjured(damageData);
                        if(data.getDamageNum()>0){
                            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.nvwu_attack_bullect_hit,monsterTTs.getCenterPos());
                            if(!data.is_die){
                                let buffData=new BuffData();
                                buffData.buff_id=BuffId.Hero_NvWu_Skill1_Zhongdu;
                                buffData.buff_type=BuffType.Normal;
                                buffData.remain_time=5;
                                buffData.add_floor=1;
                                buffData.max_floor=6;
                                buffData.damage_jiange_time=1;
                                monsterTTs.addDeBuff(buffData,duData);
                            }                                        
                        }
                    }
                }
            }
            this.destroySelf();
        }
    }

}
