
import { Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { BuffId, BuffType, FeiBiao_Type } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dart extends Bullect {

    @property({type:cc.Enum(FeiBiao_Type)})
    dark_type:FeiBiao_Type=FeiBiao_Type.skill1;

    collision_num:number=0;
    
    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
        this.spin_speed=600;
        this.addInitFinishedListen(this.onInitFinished);
    }        

    onInitFinished(){
        this.collision_num=0;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        
    }
}
