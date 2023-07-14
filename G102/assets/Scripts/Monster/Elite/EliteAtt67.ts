import BossBullet from "../../Boss/BossBullet";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, Hero_Type } from "../../Hero/Game/HeroConfig";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import { FeedBackType } from "../MonsterData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EliteAtt67 extends BossBullet {

    att_hero:Hero_Type=Hero_Type.NULL;

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            let data=wall.beInjured(this.monster_att_data)
            super.destroySelf();
            if(data.getDamageNum()>0){
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster67_shuijingyoulong_att_hit,this.node.getPosition());            
            }
        }
    }
}
