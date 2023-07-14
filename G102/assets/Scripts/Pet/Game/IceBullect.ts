import { IsDebug } from "../../Constants";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import { BuffData } from "../../Hero/Game/BuffData";
import Bullect from "../../Hero/Game/Bullect";
import { BuffId, BuffType, SkillType } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
import { StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { PetData } from "../Data/PetData";
import { PetSkillType } from "../PetConfig";



const {ccclass, property} = cc._decorator;

@ccclass
export default class IceBullect extends Bullect {

    pet_data:PetData=null;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }

    initPetData(petData:PetData){
        this.pet_data=petData;
    }     

    protected start(): void {
        this.tuowei_space=1;
    }

    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs)
        {
            let radius=this.pet_data.getSkillValue1(PetSkillType.Active);
            let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),radius);
            if(monsters){
                let jiansuValue=this.pet_data.getSkillValue3(PetSkillType.Active);
                for(let i=0; i<monsters.length; i++){
                    let monsterTTs=monsters[i].getComponent(Monster);
                    let data=monsterTTs.beFlashInjured(this.gongji_data);
                    if(!data.is_die && data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet1_attack_hit,monsterTTs.getCenterPos());
                        let buffData=new BuffData();
                        buffData.buff_id=BuffId.Pet1_JianSu;
                        buffData.buff_type=BuffType.Slowdown;
                        buffData.buff_value=[jiansuValue];
                        buffData.remain_time=3;
                        monsterTTs.addDeBuff(buffData,this.gongji_data);
                    }                                          
                }
            }
        }
        this.destroySelf();    
    }

}
