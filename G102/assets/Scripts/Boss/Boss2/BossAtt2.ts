import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import Wall from "../../Wall/Wall";
import BossBullet from "../BossBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossAtt2 extends BossBullet {

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            let data=wall.beInjured(this.monster_att_data)
            super.destroySelf();
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss2_normal_att_hit1,this.node.getPosition());
            }
        }
    }
}
