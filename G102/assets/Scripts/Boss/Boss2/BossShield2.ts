import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { ShieldType, DamageType } from "../../Hero/Game/HeroConfig";



const {ccclass, property} = cc._decorator;

@ccclass
export default class BossShield2 extends cc.Component {
    /**护盾的唯一id */    
    private shield_id:number=0;
    /**剩余的时间 */
    private remain_time:number=0;
    /**剩余的免疫次数 */
    private shield_value:number=0;
    /**护盾类型，可以抵消的伤害类型 */
    private shield_type:ShieldType=ShieldType.Normal;
    /**时间结束或护盾被破时的回调 */
    private destroy_callback:Function=null;
    /**进度条 */
    private progress_bar:cc.ProgressBar=null;
    /**最大值*/
    private max_value:number=0;
    /**最初持续时间 */
    private max_time:number=0;
    //受伤动作
    private injured_action:cc.Tween=null;
    private shield:cc.Node=null;
    /**地表节点 */
    private ground:cc.Node=null;
    /**地表节点 */
    private ground_progress:cc.Node=null;

    init(id:number,type:ShieldType,remainTime:number,value:number,ground:cc.Node,callback:Function){
        this.progress_bar=this.node.getComponent(cc.ProgressBar);
        this.shield=this.node.getChildByName('shield');
        this.shield_id=id;
        this.remain_time=this.max_time=remainTime;
        this.shield_value=this.max_value=value;
        this.shield_type=type;
        this.destroy_callback=callback;
        this.ground=ground;
        this.ground_progress=ground.getChildByName('progress');
        this.ground_progress.scale=0;
        this.shield.scale=1;
    }

    startHurt(){
        if(this.injured_action)
        {
            this.injured_action.stop();
        }
        this.shield.color=cc.Color.RED;        
        this.injured_action=cc.tween(this.shield).to(0.18,{color:cc.color(255,255,255)}).start();
    }

    /**更改护盾值，返回更改后的值值*/
    changeShieldValue(num:number):number{
        let newValue=this.shield_value+num;
        let progress=1-(newValue/this.max_value);;
        this.progress_bar.progress=progress
        if(newValue<0){
            this.shield_value=0;
            this.progress_bar.progress=1;
            this.destroySelf();
        }else{
            this.shield_value=newValue;
        }
        if(num<0){
            this.startHurt();
        }
        return newValue;
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

    private destroySelf(){
        this.ground.removeFromParent();
        this.node.removeFromParent();        
        if(this.destroy_callback){
            //是否自爆
            let isAuto=this.remain_time<=0;
            this.destroy_callback(isAuto);
        }
    }

    public destoryShield(){
        this.ground.removeFromParent();
        this.node.removeFromParent();
    }

    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.remain_time-=dt;
                let scale=1-this.remain_time/this.max_time;
                this.ground_progress.scale=scale;
                this.shield.scale=1+scale;
                if(this.remain_time<0){
                    this.remain_time=0;
                    this.destroySelf();
                }
            }
        }        
    }
}
