import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, Hero_Type } from "../../Hero/Game/HeroConfig";
import { MonsterAttData } from "../../Monster/MonsterData";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import BossBullet from "../BossBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossSkill10 extends cc.Component {

    @property()
    acc_num:number=0;

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
        this.node.getComponent(cc.Animation).play("e51010");
        this.collider=this.getComponent(cc.Collider);
    }

    startFly(){
        this.is_can_move=true;
        this.node.getComponent(cc.Animation).play("e51011");
    }

    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;        
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
                if(wall){
                    this.monster_att_data.is_big=false;
                    let data=wall.beInjured(this.monster_att_data)
                    this.destroySelf();
                    if(data.getDamageNum()>0){                
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss10_skill2_hit,this.node.getPosition());                        
                    }
                    
                }
            }break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        
    }
}
