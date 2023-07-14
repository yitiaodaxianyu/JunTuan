
import { Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import Bullect from "../Bullect";
import { SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ActiveDart extends Bullect {

   
    @property(cc.Prefab)
    att_tuowei:cc.Prefab=null;

    tuo_wei:cc.Node=null;
    collision_num:number=0;
    remain_time:number=0;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);        
        this.addInitFinishedListen(this.onInitFinished);
    }        

    onInitFinished(){
        this.tuo_wei=cc.instantiate(this.att_tuowei);
        this.tuo_wei.setPosition(this.node.getPosition());
        FightingManager.getInstance().node.addChild(this.tuo_wei);
        this.collision_num=0;
        this.spin_speed=600;
        this.node.scale=1;
        this.remain_time=this.gongji_data.hero_data.getSkillValue3(SkillType.Active);
        this.unscheduleAllCallbacks();
    }

    destroySelf(): void {
        super.destroySelf();
        if(this.tuo_wei){
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime).removeSelf().start();
            this.tuo_wei=null;
        }
    }

    onCollisionMonster(monsterTs:Monster) {
        
    }

    update(dt: any): void {
        super.update(dt);
        if(this.tuo_wei){
            let pos=this.node.getPosition();
            //添加在子弹前面
            let distance=64;
            let xx=pos.x+Math.cos(this.move_direction)*distance;
            let yy=pos.y+Math.sin(this.move_direction)*distance;
            this.tuo_wei.setPosition(cc.v2(xx,yy));
        }
    }
}
