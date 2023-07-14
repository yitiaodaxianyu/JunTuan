/**闪电链 */

import { GameState } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MyTool from "../../../Tools/MyTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChainLightning extends cc.Component {

    // @property([cc.SpriteFrame])
    // sp_lights: cc.SpriteFrame[] = [];

    // @property([cc.SpriteFrame])
    // sp_lights_small: cc.SpriteFrame[] = [];

    game_effect_id:GameEffectId=GameEffectId.lei_shen_shandian;
    _sp:cc.Sprite=null;
    cur_sp_index:number=0;
    /**首个敌人，为NULL时是英雄 */
    first_monster:Monster=null;
    //@property(cc.Node)
    end_monster:Monster=null;
    /**刷新间隔 */
    refresh_jiange:number=0.05;
    /**时间计数值 */
    jishu:number=0;
    /**当前闪电链的长度 */
    cur_move_len:number=0;
    /**加速度 */
    jiasu_num:number=0.0;
    /**到达时间,这个时间累计到一定时间后，闪电要开始消失 */
    end_remain_time:number=0;
    max_remain_time:number=0.2;
    /**到达回调 */
    end_callback:Function=null;
    /**释放需要继续判断 */
    is_need_update:boolean=true;

    onLoad(){
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,this.destroySelf.bind(this));
    }

    init(gameEffectId:GameEffectId,first:Monster,end:Monster,endCallback:Function){
        // if(!this._sp){
        //     this._sp=this.node.getComponent(cc.Sprite);
        // }
        this.end_callback=endCallback;
        this.game_effect_id=gameEffectId;
        this.first_monster=first;
        this.end_monster=end;
        this.jiasu_num=0;
        this.end_remain_time=this.max_remain_time;
        // this._sp.fillStart=0;
        // this._sp.fillRange=0;
        this.is_need_update=true;
        let animation=this.node.getComponent(cc.Animation);
        animation.play();        
        this.setShanDian();
    }

    onNext(){
        if(this.end_callback){
            this.end_callback(this.end_monster);
            this.end_callback=null;
        }
    }

    destroySelf(){
        this.is_need_update=false;
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    protected lateUpdate(dt: number): void {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing||this.is_need_update==false){
            return;
        }
        this.setShanDian();
    }

    // update (dt:number) {
    //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing||this.is_need_update==false){
    //         return;
    //     }
    //     this.setShanDian();
    //     // this.jishu+=dt;
    //     // if(this.jishu>=this.refresh_jiange){
    //     //     this.jishu=0;            
    //     //     //刷新帧
    //     //     if(this.node.height>=150){
    //     //         this.cur_sp_index=MyTool.getRandomIndex(this.sp_lights.length,this.cur_sp_index);
    //     //         this._sp.spriteFrame=this.sp_lights[this.cur_sp_index];
    //     //         // this.node.scaleX=this.node.height/300;
    //     //         // if(this.node.scaleX>1){
    //     //         //     this.node.scaleX=1;
    //     //         // }else if(this.node.scaleX<0.5){
    //     //         //     this.node.scaleX=0.5;
    //     //         // }
    //     //     }else{
    //     //         this.cur_sp_index=MyTool.getRandomIndex(this.sp_lights_small.length,this.cur_sp_index);
    //     //         this._sp.spriteFrame=this.sp_lights_small[this.cur_sp_index];
    //     //         // this.node.scaleX=this.node.height/150;
    //     //         // if(this.node.scaleX>1){
    //     //         //     this.node.scaleX=1;
    //     //         // }else if(this.node.scaleX<0.5){
    //     //         //     this.node.scaleX=0.5;
    //     //         // }
    //     //     }
            
    //     // }

    //     // this.jiasu_num+=1;
    //     // let range=this._sp.fillRange+dt*(1+this.jiasu_num);
    //     // if( range>=1){
    //     //     range=1;
    //     //     this.end_remain_time-=dt;
    //     //     if(this.end_remain_time<0){
    //     //         this.end_remain_time=0;
    //     //     }
    //     //     this._sp.fillStart=(this.max_remain_time-this.end_remain_time)/this.max_remain_time;            
    //     //     if(this._sp.fillStart>=1){
    //     //         this.destroySelf();
    //     //     }
    //     // }
    //     // this._sp.fillRange=range;
    //     // if(range>=1){
    //     //     if(this.end_callback){
    //     //         this.end_callback(this.end_monster);
    //     //         this.end_callback=null;
    //     //     }
    //     // }
    // }

    setShanDian(){
        if(this.first_monster){
            this.node.setPosition(this.first_monster.getCenterPos());
        }
        //跟随闪电链的末端目标
        let offsetPos=this.end_monster.getCenterPos().sub(this.node.getPosition());
        let pi2=Math.PI*2;
        let dir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
        let angle=MyTool.radianToAngle(dir)-90;
        this.node.angle=angle;
        this.node.height=offsetPos.mag();
    }
}
