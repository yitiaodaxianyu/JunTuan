

import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import { PetSkillType } from "../PetConfig";
import Pet from "./Pet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WindPet extends Pet {

    buff_node_back:cc.Node=null;
    buff_node_front:cc.Node=null;

    onLoad(): void {
        super.onLoad();
        this.addAttackListen(this.onAttack);
    }

    onAttack(monster:cc.Node){
        //加攻速
        let buff=new BuffData();
        buff.buff_id=BuffId.Pet3_JiaSu;
        buff.buff_value=[this.pet_data.getSkillValue1(PetSkillType.Active)];
        buff.remain_time=this.pet_data.getSkillValue2(PetSkillType.Active);
        buff.buff_type=BuffType.Gain;
        let hero=GameManager.getInstance().getHero(this.hero_type);
        let buffTimer=hero.addBuff(buff);
        buffTimer.addDestroyListen(this.onBuffDestroy.bind(this));
        let pos=hero.node.getPosition();
        this.buff_node_back=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.pet3_skill_back,pos,cc.find("Canvas/Hero_Shadow_Root"));
        this.buff_node_front=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.pet3_skill_front,pos,cc.find("Canvas/Pet_Root"));
    }

    onBuffDestroy(buff:BuffData){
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.pet3_skill_back,this.buff_node_back);
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.pet3_skill_front,this.buff_node_front);
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
