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
export default class EliteAtt65 extends BossBullet {

    att_hero:Hero_Type=Hero_Type.NULL;

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }

    setAttHero(heroId:Hero_Type){
        this.att_hero=heroId;
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            let data=wall.beInjured(this.monster_att_data)
            super.destroySelf();
            if(data.getDamageNum()>0){
                if(data.feedback_type==FeedBackType.BaoJi){
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster65_shuangjuren_att_hit_crit,this.node.getPosition());
                    if(wall.getWallType()==WallType.Main&&this.att_hero!=Hero_Type.NULL){
                        //眩晕英雄
                        let buffData=new BuffData();
                        buffData.buff_id=BuffId.Monster_XuanYun;
                        buffData.game_effect_id=GameEffectId.xuanyun;
                        buffData.remain_time=1;
                        buffData.buff_type=BuffType.Vertigo;
                        GameManager.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData)
                    }
                }else{
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster65_shuangjuren_att_hit,this.node.getPosition());
                }                
            }
        }
    }
}
