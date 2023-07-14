import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { BuffStateType } from "./HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BuffState extends cc.Component {
    /**剩余的时间 */
    private remain_time:number=0;
    /**护盾类型，可以抵消的伤害类型 */
    private buff_type:BuffStateType=BuffStateType.Attack;
    /**时间结束的回调 */
    private destroy_callback:Function=null;

    opacity_num:number=5;

    init(type:BuffStateType,remainTime:number,callback:Function){
        this.remain_time=remainTime;
        this.buff_type=type;
        this.node.opacity=255;
        this.destroy_callback=callback;
    }

    getRemainTime():number{
        return this.remain_time;
    }

    getBuffType():BuffStateType{
        return this.buff_type;
    }

    refreshTime(remainTime:number){
        if(remainTime>this.remain_time)
        {
            this.remain_time=remainTime;
            if(this.remain_time>=3){
                this.node.opacity=255;
            }            
        }
    }

    public destroySelf(){
        if(this.destroy_callback){
            this.destroy_callback(this.buff_type);
        }
        this.node.removeFromParent();        
    }

    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.remain_time-=dt;
                if(this.remain_time<0){
                    this.remain_time=0;
                    this.destroySelf();
                }
                if(this.remain_time<=3){                    
                    this.node.opacity+=this.opacity_num;
                    if(this.node.opacity<=128){
                        this.opacity_num=5;
                    }else if(this.node.opacity>=255){
                        this.opacity_num=-5;
                    }
                }else{
                    this.node.opacity=255;
                }
            }
        }        
    }
}
