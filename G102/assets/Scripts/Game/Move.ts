import { GameState } from "../Constants";
import GameManager from "../GameManager";
import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Move extends cc.Component {

    move_speed:number=320;
    move_direction:number=Math.PI*3/2;

    //移动的目标地点
    private move_target_pos:cc.Vec2=null;
    /**移动到目标地点后的回调 */
    private move_end_callback:Function=null;
    /**移动到城墙位置后的回调 */
    private move_wall_callback:Function=null;

    @property({type:cc.Prefab})
    prefab_tuowei:cc.Prefab=null;
    /**拖尾节点 */
    tuowei_node:cc.Node=null;

    game_effect_id:GameEffectId=GameEffectId.Null;

    onLoad()
    {
        
    }

    init(speed:number,dir:number,id:GameEffectId)
    {
        this.game_effect_id=id;
        this.move_speed=speed;
        this.update(0.015);
        if(this.prefab_tuowei){
            this.tuowei_node=cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent=this.node.parent;
            this.node.zIndex=1;
        }
    }

    private changeDir(dir:number)
    {
        this.move_direction=(dir+Math.PI*2)%(Math.PI*2);
    }

    /**设置移动的目标位置，以及到达目标后需要做的事情 */
    setTargetPos(pos:cc.Vec2,endCallback:Function,wallCallback?:Function){
        this.move_target_pos=pos;
        this.move_end_callback=endCallback;
        this.move_wall_callback=wallCallback;
        this.update(0.015);
    }

    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        let prevPos=this.node.getPosition();
        let disX=this.node.x;
        let disY=this.node.y;
        if(this.move_target_pos){
            let speed=this.move_speed*dt;
            let offsetPos=this.move_target_pos.sub(this.node.getPosition());
            if(offsetPos.mag()<speed)
            {
                if(this.move_end_callback){
                    this.destroySelf();
                    this.move_end_callback();
                    this.move_end_callback=null;
                }
            }else
            {
                let pi2=Math.PI*2;
                this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                disX+=speed*Math.cos(this.move_direction);
                disY+=speed*Math.sin(this.move_direction);
            }
        }
        this.setDirection(this.move_direction);
        this.node.x=disX;
        this.node.y=disY;
        if(this.move_wall_callback && disY<=GameManager.getInstance().enemy_att_y){
            this.destroySelf();
            this.move_wall_callback();
            this.move_wall_callback=null;
        }
        if(this.tuowei_node){
            let pos=this.node.getPosition();
            //添加在子弹前面
            let offsetPos=pos.sub(prevPos);
            let distance=offsetPos.mag()*4;
            let dir=Math.atan2(offsetPos.y,offsetPos.x);
            let xx=pos.x+Math.cos(dir)*distance;
            let yy=pos.y+Math.sin(dir)*distance;
            this.tuowei_node.setPosition(cc.v2(xx,yy));
        }
    }

    destroySelf()
    {
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
        if(this.tuowei_node){            
            let dt=this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            cc.tween(this.tuowei_node).delay(dt/10).removeSelf().start();
            this.tuowei_node=null;
        }
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        this.node.angle=180*dir/Math.PI+90;
    }

}
