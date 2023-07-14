import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import { BuffData } from "../../Hero/Game/BuffData";
import Bullect from "../../Hero/Game/Bullect";
import { BuffId, BuffType, SkillType } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
import MonsterManager from "../../Monster/MonsterManager";
import { PetData } from "../Data/PetData";
import { PetSkillType } from "../PetConfig";
import FireRing from "./FireRing";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBullect extends Bullect {

    pet_data:PetData=null;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }

    initPetData(petData:PetData){
        this.pet_data=petData;
    }

    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet2_attack_hit,this.getHeadPos());
            let fireRing=GroundManager.getInstance().createGameEffectById(GameEffectId.pet2_skill,monsterTs.node.getPosition());            
            fireRing.getComponent(FireRing).init(GameEffectId.pet2_skill,this.gongji_data,this.pet_data.getSkillValue3(PetSkillType.Active),this.pet_data.getSkillValue1(PetSkillType.Active),1);
            //fireRing.getComponent(FireRing).init(GameEffectId.pet2_skill,this.gongji_data,10,200,1);
            this.destroySelf();
        }        
    }

}
