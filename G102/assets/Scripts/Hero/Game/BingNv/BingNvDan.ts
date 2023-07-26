
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
export default class BingNvDan extends Bullect {

    @property()
    bullect_type:number=0;
    public hero_lvl:number=0;
    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }        

    protected start(): void {
        this.tuowei_space=1;
    }

    onCollisionMonster(monsterTs:Monster) {
        switch(this.bullect_type){
            case 0:{
                //普通弹
                if(monsterTs){            
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.bing_nv_attack_hit,this.getHeadPos());
                    }
                    this.destroySelf();
                }
            }break;
            case 1:{
                //被动技能弹
                if(monsterTs){            
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.bing_nv_beidong_skill_create,this.getHeadPos());
                        let buffData=new BuffData();
                        buffData.buff_id=BuffId.Hero_BingNv_Skill1_JianSu;
                        buffData.buff_type=BuffType.Slowdown;
                        buffData.buff_value=[0.5];
                        buffData.remain_time=3;
                        monsterTs.addDeBuff(buffData,this.gongji_data);
                        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BNAttack);
                        /**范围伤害，不包括这个怪 */
                        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),200+this.hero_lvl*20);
                        if(monsters){
                            let jiansuValue=this.gongji_data.hero_data.getSkillValue3(SkillType.Passive_1)
                            for(let i=0; i<monsters.length; i++){
                                let monsterTTs=monsters[i].getComponent(Monster);
                                if(monsterTTs.uuid!=monsterTs.uuid){
                                    let data=monsterTTs.beFlashInjured(this.gongji_data);
                                    if(data.getDamageNum()>0){
                                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.bing_nv_beidong_skill_hit,monsterTTs.getCenterPos());
                                        if(!data.is_die){
                                            let buffData=new BuffData();
                                            buffData.buff_id=BuffId.Hero_BingNv_Skill1_JianSu;
                                            buffData.buff_type=BuffType.Slowdown;
                                         
                                            buffData.buff_value=[jiansuValue];
                                            buffData.remain_time=3+this.hero_lvl*0.5;
                                            monsterTTs.addDeBuff(buffData,this.gongji_data);
                                        }                                        
                                    }
                                }                                
                            }
                        }
                    }
                    this.destroySelf();
                }
            }break;
        }
        
    }

}
