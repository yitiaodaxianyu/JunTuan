import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../Data/HeroManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DamageRecord extends cc.Component {
    /**游戏特效id */
    game_effect_id:GameEffectId=GameEffectId.Null;
    private value_label:cc.Label=null;
    private total_value:number=0;
    private remain_time:number=5;
    /**销毁回调 */
    private destroy_callback:Function=null;
    private skill_release_id:number=0;

    init(gameEffectId:GameEffectId,skillReleaseId:number,value:number,callback:Function){                
        this.game_effect_id=gameEffectId;
        this.skill_release_id=skillReleaseId;
        this.destroy_callback=callback;
        let heroId=Math.floor(skillReleaseId/10000);
        let icon=this.node.getChildByName('icon').getComponent(cc.Sprite);
        icon.spriteFrame=HeroManager.getInstance().getSpriteFrameByNames('Hero_'+heroId+'_Skill_0');
        if(!this.value_label){
            this.value_label=this.node.getChildByName('num').getComponent(cc.Label);
        }
        this.total_value=0;
        this.refreshValue(value);
    }
    /**刷新伤害值 */
    refreshValue(value:number){
        this.remain_time=5;
        this.node.opacity=255;
        this.total_value+=Math.round(value);
        this.value_label.string=this.total_value.toString();
    }

    destroySelf(){
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
        if(this.destroy_callback){
            this.destroy_callback(this.skill_release_id);
        }
    }

    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.remain_time-=dt;
                if(this.remain_time<=2){
                    this.node.opacity-=2;
                    if(this.remain_time<=0){
                        this.remain_time=0;
                        this.destroySelf();
                    }
                }
            }
        }
    }
}
