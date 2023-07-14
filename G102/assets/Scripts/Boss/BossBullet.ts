import { GameState, JiaSu } from "../Constants";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { MonsterAttData } from "../Monster/MonsterData";
import Wall from "../Wall/Wall";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BossBullet extends cc.Component {

    @property({type:cc.Prefab})
    prefab_tuowei:cc.Prefab=null;
    @property()
    acc_num:number=0;
    @property(cc.SpriteFrame)
    sp_fly:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    sp_create:cc.SpriteFrame=null;
    /**拖尾节点 */
    tuowei_node:cc.Node=null;

    game_effect_id:number=0;
    move_speed:number=700;
    move_direction:number=Math.PI/2;
    offset_xx_angle:number=90;
    is_att:boolean=true;
    monster_att_data:MonsterAttData=null;
    cur_acc_num:number=0;

    collision_target_callback:Function=null;
    is_can_move:boolean=true;
    boss_yy:number=0;
    /**碰撞器 */
    collider:cc.Collider=null;

    init(monsterAttData:MonsterAttData,gameEffectId:GameEffectId,speed:number,dir:number,bossY:number,angle:number=90)
    {
        this.monster_att_data=monsterAttData;
        this.game_effect_id=gameEffectId;
        this.move_speed=speed;
        this.offset_xx_angle=angle;
        this.is_att=false;
        this.cur_acc_num=this.acc_num;
        this.boss_yy=bossY;
        this.setDirection(dir);
        if(this.prefab_tuowei){
            this.tuowei_node=cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent=this.node.parent;
            this.node.zIndex=1;
        }
        if(this.sp_create){
            this.node.getComponent(cc.Sprite).spriteFrame=this.sp_create;
        }
        this.collider=this.getComponent(cc.Collider);
    }

    startFly(){
        this.is_can_move=true;
        this.node.getComponent(cc.Sprite).spriteFrame=this.sp_fly;
    }

    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        if(!this.is_can_move){
            if(this.tuowei_node){
                this.tuowei_node.opacity=0;
                this.tuowei_node.active=false;
                let pos=this.node.getPosition();                
                this.tuowei_node.setPosition(pos);
            }
            return;
        }
        let prevPos=this.node.getPosition();
        if(this.acc_num>0){            
            this.cur_acc_num+=this.acc_num*dt;            
        }
        this.move_speed+=this.cur_acc_num;
        if(this.move_speed>=10000){
            this.move_speed=10000;
        }
        let xx=this.move_speed*dt*Math.cos(this.move_direction);
        let yy=this.move_speed*dt*Math.sin(this.move_direction);
        this.node.x+=xx;
        this.node.y+=yy;
        this.collider.enabled=this.node.y<=this.boss_yy;
        if(this.node.y>cc.winSize.height){
            this.destroySelf();
        }
        if(Math.abs(this.node.x)>cc.winSize.width){
            this.destroySelf();
        }
        if(this.tuowei_node){
            this.tuowei_node.opacity=255;
            this.tuowei_node.active=true;
            let gr=GameManager.getInstance().getGameRate();
            if(gr<1){
                gr=1;
            }
            let pos=this.node.getPosition();
            //添加在子弹前面            
            let offsetPos=pos.sub(prevPos);
            let distance=offsetPos.mag()*2/gr;
            let dir=Math.atan2(offsetPos.y,offsetPos.x);
            let xx=pos.x+Math.cos(dir)*distance;
            let yy=pos.y+Math.sin(dir)*distance;
            this.tuowei_node.setPosition(cc.v2(xx,yy));
        }
    }

    destroySelf()
    {
        if(this.tuowei_node){
            cc.tween(this.tuowei_node).delay(this.tuowei_node.getComponent(cc.MotionStreak).fadeTime/5).removeSelf().start();
            this.tuowei_node=null;
        }
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
                if(this.collision_target_callback){                    
                    this.is_att=true;
                    this.collision_target_callback(other.node.getComponent(Wall));
                }
            }break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    }
}
