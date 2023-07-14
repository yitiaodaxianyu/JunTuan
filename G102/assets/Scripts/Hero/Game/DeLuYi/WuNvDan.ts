
import FightingManager from "../../../Game/FightingManager";
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import Bullect from "../Bullect";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WuNvDan extends Bullect {

    
    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    }        

    onInitFinished(){
        this.tuowei_space=1.5;
    }

    destroySelf(): void {
        super.destroySelf();        
    }

    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){            
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_skill_beidong_create,this.getHeadPos());
                // if(data.feedback_type==FeedBackType.BaoJi){
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_baoji,this.getHeadPos());
                // }else{
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_hit,this.getHeadPos());
                // }
                  
            }
            this.destroySelf();
        }
    }
}
