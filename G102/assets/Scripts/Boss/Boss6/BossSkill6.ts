import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, Hero_Type } from "../../Hero/Game/HeroConfig";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import BossBullet from "../BossBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossSkill6 extends BossBullet {

    att_hero:Hero_Type=Hero_Type.NULL;
    gongsu_value:number=0;

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    
    setHeroType(heroType:Hero_Type,value:number){
        this.att_hero=heroType;
        this.gongsu_value=value;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            this.monster_att_data.is_big=false;
            let data=wall.beInjured(this.monster_att_data)
            super.destroySelf();
            if(data.getDamageNum()>0){                
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss6_skill2_hit,this.node.getPosition());
                if(wall.getWallType()==WallType.Main&&this.att_hero!=Hero_Type.NULL){
                    //减速
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Boss6_Skill_2_jiangongsu;
                    buffData.remain_time=5;
                    buffData.buff_value=[this.gongsu_value];
                    buffData.max_floor=5;
                    GameManager.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData);
                }
            }
            
        }
    }
}
