

import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import Monster from "../../Monster/Monster";
import { PetSkillType } from "../PetConfig";
import FireBullect from "./FireBullect";
import Pet from "./Pet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirePet extends Pet {


    onLoad(): void {
        super.onLoad();
        this.addAttackListen(this.onAttack);
    }

    onAttack(monster:cc.Node){
        let pos=this.node.getPosition();
        let offsetPos=monster.getComponent(Monster).getCenterPos().sub(pos);
        let dir=Math.atan2(offsetPos.y,offsetPos.x);
        let fireBullect=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet2_attack,pos);
        let fireBts=fireBullect.getComponent(FireBullect);
        fireBts.init(GameEffectId.pet2_attack,1000,dir,super.getGongJiData(true,this.pet_data.getSkillValue2(PetSkillType.Active)));
        fireBts.initPetData(this.pet_data);
    }
    
    update(dt:number){
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        {
            return;
        }
        this.checkSkill(dt);
    }

    checkSkill(dt:number){
        this.cd_time-=dt;
        if(this.cd_time<0){
            this.cd_time=0;
        }
    }
}
