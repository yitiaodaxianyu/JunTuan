import BossBullet from "../../Boss/BossBullet";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import Wall from "../../Wall/Wall";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EliteAtt78 extends BossBullet {

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            this.monster_att_data.is_big=false;
            let data=wall.beInjured(this.monster_att_data)
            super.destroySelf();
            if(data.getDamageNum()>0){                
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster78_skill_bullect_hit,this.node.getPosition());
                
            }
            
        }
    }
}
