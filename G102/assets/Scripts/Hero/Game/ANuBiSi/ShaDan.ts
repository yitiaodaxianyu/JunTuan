

import FightingManager from "../../../Game/FightingManager";
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { BuffId, BuffType, DamageType, SkillType } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShaDan extends Bullect {


    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }

    onCollisionMonster(monsterTs:Monster) {
        //普通弹
        if(monsterTs){            
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_attack_hit,this.node.getPosition());
                let rate=Math.random();
                if(rate<this.gongji_data.hero_data.getSkillValue1(SkillType.Passive_1))//
                {
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ANBSAttack);
                    //判断锥形范围的敌人
                    let fanweiData=cc.instantiate(this.gongji_data);
                    fanweiData.damage_type=DamageType.Skill;
                    fanweiData.is_bullet=false;
                    fanweiData.skill_damage_rate=this.gongji_data.hero_data.getSkillValue2(SkillType.Passive_1);
                    let shanxing=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_beidong_skill_1,this.node.getPosition());
                    shanxing.angle=this.node.angle;
                    //减速
                    let distance=260;
                    let min=this.move_direction-Math.PI/4;//45°+90
                    let max=min+Math.PI/2;//135°
                    //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).arc(this.getAPos(-50).x,this.getAPos(-50).y,distance,min,max);
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).stroke();
                    let allMonsters=MonsterManager.getInstance().getMonstersForRadian(-1,this.node.getPosition(),distance,min,max);
                    if(allMonsters){
                        for(let i=0; i<allMonsters.length; i++){
                            let monsterTTs=allMonsters[i].getComponent(Monster);
                            let zuiData=monsterTTs.beFlashInjured(fanweiData);;
                            if(zuiData.getDamageNum()>0){
                                let buffData=new BuffData();
                                buffData.buff_id=BuffId.Hero_ANuBiSi_Skill1_JianSu;
                                buffData.buff_type=BuffType.Slowdown;
                                buffData.buff_value=[0.3];
                                buffData.remain_time=3;
                                monsterTTs.addDeBuff(buffData,fanweiData);
                            }

                        }
                    }
                }
            }
            this.destroySelf();
        }
    }

}
