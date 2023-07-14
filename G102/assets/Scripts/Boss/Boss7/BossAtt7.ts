import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { StrengthType } from "../../Monster/MonsterData";
import { SoundIndex } from "../../Sound/AudioConstants";
import Wall from "../../Wall/Wall";
import BossBullet from "../BossBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossAtt7 extends BossBullet {

    /**0：普通攻击的，1是技能的 */
    @property()
    bullet_type:number=0;

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        if(wall){
            switch(this.bullet_type){
                case 0:{
                    let data=wall.beInjured(this.monster_att_data)
                    super.destroySelf();
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss7_attack_bullect_hit,this.node.getPosition());
                        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss1Attack);
                    }
                }break;
                case 1:{
                    let data=wall.beInjured(this.monster_att_data)
                    super.destroySelf();
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss7_attack_bullect_hit,this.node.getPosition());
                        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss1Attack);
                    }
                }break;
                
            }
            
        }
    }
}
