
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import Bullect from "../Bullect";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZhenDeDan extends Bullect {


    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }        

    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.zhen_de_attack_hit,this.getHeadPos());
                
            }
            this.destroySelf();
        }
    }

}
