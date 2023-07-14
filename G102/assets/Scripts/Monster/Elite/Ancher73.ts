import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import Wall from "../../Wall/Wall";
import MonsterBullet from "../MonsterBullet";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Ancher73 extends MonsterBullet {

    collision_callback:Function=null;
    is_collision:boolean=false;

    protected onLoad(): void {
        this.addCollisionWallListen(this.onCollisionWall);
    }

    setCollisionCallback(callback:Function){
        this.collision_callback=callback;
        this.is_collision=false;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall&&this.is_collision==false){
            this.move_speed=0;
            if(this.collision_target_callback){
                this.collision_target_callback();
            }
        }
    }
}
