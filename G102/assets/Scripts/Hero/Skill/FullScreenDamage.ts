import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FullScreenDamage extends cc.Component {

    /**伤害间隔 */
    damage_jiange:number=0;
    /**伤害计数 */
    damage_jishu:number=0;
    /**特效 */
    game_effect_id:number=0;
    /**伤害监听回调 */
    damage_callback:Function=null;
    /**动画组件 */
    animation:cc.Animation=null;

    init(gameEffectId:GameEffectId,damageJiange:number,damageCallback:Function){
        this.game_effect_id=gameEffectId;
        this.damage_jiange=damageJiange;
        this.damage_jishu=0;
        this.damage_callback=damageCallback;
        this.node.opacity=255;
        this.animation=this.node.getComponent(cc.Animation);
        this.checkDamage();
    }

    destroySelf(){
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    checkDamage(){
        //播放特效
        this.node.opacity=255;
        this.animation.play();
        this.animation.on(cc.Animation.EventType.FINISHED,()=>{                    
            this.animation.off(cc.Animation.EventType.FINISHED);
            this.node.opacity=0;
        })
        if(this.damage_callback){
            this.damage_callback();
        }
    }

    update (dt:number) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
            return;
        }
        this.damage_jishu+=dt;
        if(this.damage_jishu>=this.damage_jiange){
            this.damage_jishu=0;
            this.checkDamage();
        }    
    }
}
