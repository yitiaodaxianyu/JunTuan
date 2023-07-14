import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import Bullect from "../Bullect";
import { BuffId, BuffType, DamageType, SkillType } from "../HeroConfig";
import MeiMo from "./MeiMo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MeiDan extends Bullect {

    is_ex_damage:boolean=false;
    hero:MeiMo=null;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }

    setIsExDamage(hero:MeiMo,isEx:boolean){
        this.is_ex_damage=isEx;
        this.hero=hero;
    }

    onCollisionMonster(monsterTs:Monster) {
        //普通弹
        if(monsterTs){
            if(monsterTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_ZhengShang)){
                this.gongji_data.hero_data.all_increase_damage+=this.gongji_data.hero_data.getSkillValue4(SkillType.Active);
            }
            this.gongji_data.is_can_crit=true;
            let data=monsterTs.beFlashInjured(this.gongji_data);
            this.gongji_data.is_can_crit=false;
            let isDie=data.is_die;
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.mei_mo_attack_hit,this.getHeadPos());
                //额外伤害
                if(isDie==false && this.is_ex_damage){
                    //额外的技能伤害
                    let exGjData=cc.instantiate(this.gongji_data);
                    exGjData.damage_type=DamageType.Skill;
                    exGjData.is_bullet=false;
                    exGjData.skill_damage_rate=this.gongji_data.hero_data.getSkillValue4(SkillType.Passive_1);
                    let exData=monsterTs.beFlashInjured(this.gongji_data);
                    isDie=exData.is_die;
                }                
                if(isDie==false){
                    //被动二
                    if(this.hero.hero_data.getIsUnlock(SkillType.Passive_2)){
                        let rate=this.hero.hero_data.getSkillValue1(SkillType.Passive_2);
                        if(Math.random()<rate){                        
                            let damageRate=this.hero.hero_data.getSkillValue2(SkillType.Passive_2);
                            let curHpRate=monsterTs.getCurHp()/monsterTs.getMaxHp();
                            if(curHpRate<0.3){
                                curHpRate=0.3;
                            }
                            let remainRate=Math.floor((1-curHpRate)*100/10);
                            damageRate+=remainRate;
                            let exData=monsterTs.beFlashInjured(this.hero.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,damageRate));
                            isDie=exData.is_die;
                        }
                    }
                    
                }
                if(isDie){
                    //引爆
                   if(this.hero){
                        this.hero.startBomb(monsterTs);
                   }
                }
                //专武判断
                if(monsterTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                    //范围伤害
                    let ex1=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                    if(ex1&&ex1>0){
                        /**范围伤害，不包括这个怪 */
                        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),ex1);
                        if(monsters){
                            for(let i=0; i<monsters.length; i++){
                                let monsterTTs=monsters[i].getComponent(Monster);
                                if(monsterTTs.uuid!=monsterTs.uuid){
                                    //伤害比值是多少，暂用本次伤害，是否享受魅惑增伤,                                
                                    // let bzGjData=cc.instantiate(this.gongji_data);
                                    // if(monsterTTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_ZhengShang)){
                                    //     bzGjData.hero_data.all_increase_damage+=zengshang;
                                    // }
                                    let data=monsterTTs.beFlashInjured(this.gongji_data);
                                    if(data.getDamageNum()>0){
                                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.mei_mo_attack_hit,monsterTTs.getCenterPos());
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    }

}
