import { GameState } from "../Constants";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import Wall from "../Wall/Wall";
import { MonsterAttData } from "./MonsterData";




const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterBullet extends cc.Component {

    game_effect_id:number=0;
    game_effect_id_hit:number=0;
    move_speed:number=700;
    move_direction:number=Math.PI/2;
    offset_xx_angle:number=90;
    is_att:boolean=true;
    monster_att_data:MonsterAttData=null;

    collision_target_callback:Function=null;    
    /**碰撞器 */
    collider:cc.Collider=null;
    /**加速度 */
    acceleration:number=0;
    /***************拖尾***************** */
    @property({type:cc.Prefab})
    prefab_tuowei:cc.Prefab=null;
    /**拖尾节点 */
    tuowei_node:cc.Node=null;
    /**拖尾身位 */
    tuowei_space:number=0.25;
    tuowei_time:number=0.5;
    /**拖尾归1（原点位置）的身位数 */
    tuowei_guiyi:number=0;

    init(monsterAttData:MonsterAttData,gameEffectId:GameEffectId,hitGameEffectId:number,speed:number,dir:number,angle:number=90)
    {
        this.monster_att_data=monsterAttData;
        this.game_effect_id=gameEffectId;
        this.game_effect_id_hit=hitGameEffectId;
        this.move_speed=speed;
        this.offset_xx_angle=angle;
        this.is_att=false;
        this.setDirection(dir);
        this.collider=this.getComponent(cc.Collider);
        if(this.prefab_tuowei){
            this.tuowei_node=cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent=this.node.parent;
            this.node.zIndex=1;
            this.tuowei_time=this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            this.tuowei_guiyi=1/this.tuowei_time;
        }
    }

    /**获取下一帧位置 */
    getNextPos(dt:number):cc.Vec2
    {
        let gr=GameManager.getInstance().getGameRate();
        if(gr<1){
            gr=1;
        }
        let distance=this.tuowei_space*this.tuowei_guiyi*this.move_speed*dt/gr;
        let xx=this.node.x+Math.cos(this.move_direction)*distance;
        let yy=this.node.y+Math.sin(this.move_direction)*distance;
        return cc.v2(xx,yy);
    }

    getHeadPos():cc.Vec2{
        let distance=this.move_speed*cc.director.getDeltaTime();
        let xx=this.node.x+Math.cos(this.move_direction)*distance;
        let yy=this.node.y+Math.sin(this.move_direction)*distance;
        return cc.v2(xx,yy);
    }

    getAPos(offsetDistance:number):cc.Vec2{
        let distance=this.move_speed*cc.director.getDeltaTime()-offsetDistance;
        let xx=this.node.x+Math.cos(this.move_direction)*distance;
        let yy=this.node.y+Math.sin(this.move_direction)*distance;
        return cc.v2(xx,yy);
    }

    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        let xx=this.move_speed*dt*Math.cos(this.move_direction);
        let yy=this.move_speed*dt*Math.sin(this.move_direction);
        this.node.x+=xx;
        this.node.y+=yy;
        if(this.node.y>cc.winSize.height){
            this.destroySelf();
        }
        if(Math.abs(this.node.x)>cc.winSize.width){
            this.destroySelf();
        }
        if(this.tuowei_node){
            this.tuowei_node.setPosition(this.getNextPos(dt));
        }
    }

    destroySelf()
    {
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        this.node.angle=180*dir/Math.PI-this.offset_xx_angle;
    }
    /**添加城墙碰撞的监听,指玩家召唤的城墙 */
    addCollisionWallListen(callback:Function){
        this.collision_target_callback=callback;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose || this.is_att==true)
            return;
        let group=other.node.group;
        switch(group){
            case 'wall':{
                let wall=other.node.getComponent(Wall);
                if(this.collision_target_callback){
                    //有回调就处理回调
                    if(this.collision_target_callback(wall))
                    {
                        return;
                    }
                }          
                let aData=wall.beInjured(this.monster_att_data);
                if(aData.getDamageNum()>0){
                    if(this.game_effect_id_hit>0){
                        let hit=GameEffectsManager.getInstance().createGameEffectById(this.game_effect_id_hit,this.node.getPosition());
                        let animation=hit.getComponent(cc.Animation);
                        animation.play();
                        animation.on(cc.Animation.EventType.FINISHED,()=>{                    
                            animation.off(cc.Animation.EventType.FINISHED);
                            GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id_hit,this.node)                        
                        })
                    }                    
                }
                this.destroySelf();
            }break;
        }
    }
}
