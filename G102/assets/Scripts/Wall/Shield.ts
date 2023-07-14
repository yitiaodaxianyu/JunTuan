import { GameState } from "../Constants";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { ShieldType, DamageType } from "../Hero/Game/HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Shield extends cc.Component {
    /**护盾的唯一id */    
    private shield_id:number=0;
    /**剩余的时间 */
    private remain_time:number=0;
    /**剩余的护盾值 */
    private shield_value:number=0;
    /**护盾类型，可以抵消的伤害类型 */
    private shield_type:ShieldType=ShieldType.Normal;
    /**时间结束或护盾被破时的回调 */
    private destroy_callback:Function=null;
    /**护盾的特效数据 */
    private game_effect_data:Map<GameEffectId,cc.Node>=null;

    init(id:number,type:ShieldType,remainTime:number,value:number,callback:Function){
        this.shield_id=id;
        this.remain_time=remainTime;
        this.shield_value=value;
        this.shield_type=type;
        this.destroy_callback=callback;
        this.game_effect_data=new Map<GameEffectId,cc.Node>();
    }

    /**更改护盾值，返回更改后的值值*/
    changeShieldValue(num:number):number{        
        let newValue=this.shield_value+num;
        if(newValue<0){
            this.shield_value=0;
            this.destroySelf();
        }else{
            this.shield_value=newValue;
        }
        return newValue;
    }

    setGameEffectData(id:GameEffectId,node:cc.Node){
        this.game_effect_data.set(id,node);
    }

    getShieldValue():number{
        return this.shield_value;
    }

    getRemainTime():number{
        return this.remain_time;
    }

    getShieldType():ShieldType{
        return this.shield_type;
    }

    refreshShield(remainTime:number,value:number){
        this.remain_time=remainTime;
        this.shield_value=value;
    }

    getIsCanWithstand(type:DamageType):boolean{        
        if(this.shield_type==ShieldType.All || this.shield_type==type.valueOf()){
            return true;
        }
        return false;
    }

    destroySelf(){
        this.game_effect_data.forEach((v,k)=>{
            GameEffectsManager.getInstance().destroyGameEffectById(k,v);
        });
        this.node.removeFromParent();
        if(this.destroy_callback){
            this.destroy_callback(this.shield_id);
        }
    }

    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.remain_time-=dt;
                if(this.remain_time<0){
                    this.remain_time=0;
                    this.destroySelf();
                }
            }
        }        
    }
}
