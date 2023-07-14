

import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, SkillType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import ChainLightning from "../../Hero/Game/LeiShen/ChainLightning";
import Monster from "../../Monster/Monster";
import MonsterManager from "../../Monster/MonsterManager";
import { PetSkillType } from "../PetConfig";
import Pet from "./Pet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RayPet extends Pet {

    /**被闪电过的怪的uuid */
    shandian_monster:string[]=[];

    onLoad(): void {
        super.onLoad();
        this.addAttackListen(this.onAttack);
        this.addInitedListen(this.onPetInited);        
    }

    onPetInited(){
        this.cd_time=0;
    }

    /**普攻对敌人释放一道闪电，可以连续弹射N次*/
    onAttack(monster:cc.Node){
        if(Math.random()<this.pet_data.getSkillValue1(PetSkillType.Active)){
            this.shandian_monster=new Array();
            this.createShanDian(null,monster.getComponent(Monster));
            this.cd_time=0;
        }        
    }
    
    createShanDian(firstMonster:Monster,endMonster:Monster){        
        this.shandian_monster.push(endMonster.uuid);
        let shandian=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet4_skill,this.node.getPosition());
        shandian.getComponent(ChainLightning).init(GameEffectId.pet4_skill,firstMonster,endMonster,this.onEndMonster.bind(this));
        let gjData=this.getGongJiData(false,this.pet_data.getSkillValue3(PetSkillType.Active))
        let data=endMonster.beFlashInjured(gjData);
    }

    onEndMonster(endMonster:Monster){
        let tansheNum=this.pet_data.getSkillValue2(PetSkillType.Active);
        if(this.shandian_monster.length<tansheNum){
            let nextMonster=this.getMonster(endMonster.getCenterPos());
            if(nextMonster){
                this.createShanDian(endMonster,nextMonster);
            }
        }
    }

    getIsTanShe(uuid:string):boolean{
        return this.shandian_monster.indexOf(uuid)>=0;
    }

    getMonster(pos:cc.Vec2):Monster
    {
        let em=MonsterManager.getInstance();        
        if(em.node.childrenCount<=0)
        {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters:Monster[]=new Array();
        for(let enemy of em.node.children)
        {
            let enemyTS=enemy.getComponent(Monster);
            if(enemyTS && enemyTS.getIsCanCheck()==true)
            {
                let distance=pos.sub(enemyTS.getCenterPos()).mag();
                if(this.getIsTanShe(enemyTS.uuid)==false && distance<=500)
                {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        if(1==attMonsters.length)
        {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort((a:Monster,b:Monster)=>{
            return a.getCenterPos().sub(pos).mag()-b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
    }

    // update(dt:number){
    //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
    //     {
    //         return;
    //     }
    //     this.checkSkill(dt);
    // }

    // checkSkill(dt:number){
    //     this.cd_time-=dt;
    //     if(this.cd_time<0){
    //         this.cd_time=0;
    //     }
    // }
}
