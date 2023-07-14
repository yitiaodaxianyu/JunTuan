
import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import Monster from "../../Monster/Monster";
import { GongJiData } from "../Data/HeroData";
import GongJi from "./GongJi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullect extends GongJi {

    @property({type:cc.Prefab})
    prefab_tuowei:cc.Prefab=null;
    /**拖尾节点 */
    tuowei_node:cc.Node=null;

    game_effect_id:number=0;
    max_move_speed:number=0;
    move_speed:number=700;
    move_direction:number=Math.PI/2;
    jiantou_dis:number=50;
    is_att:boolean=false;
    offset_xx_angle:number=90;

    collision_monster_callback:Function=null;
    max_move_distance:number=0;
    cur_move_distance:number=0;
    spin_speed:number=0;
    init_finish_callback:Function=null;
    /**加速度 */
    acceleration:number=0;
    /**拖尾身位 */
    tuowei_space:number=1;
    tuowei_time:number=0.5;
    /**拖尾归1（原点位置）的身位数 */
    tuowei_guiyi:number=1;

    onLoad()
    {
        this.jiantou_dis=this.node.height/2;
    }

    init(gameEffectId:GameEffectId,speed:number,dir:number,gjData:GongJiData,offsetAngle:number=90,moveDistance:number=0)
    {
        super.initData(gjData);
        this.game_effect_id=gameEffectId;
        this.max_move_speed=this.move_speed=speed;
        this.setDirection(dir);
        this.is_att=false;        
        this.offset_xx_angle=offsetAngle;
        this.max_move_distance=moveDistance;
        this.cur_move_distance=0;
        if(this.init_finish_callback){
            this.init_finish_callback();
        }
        if(this.prefab_tuowei){
            this.tuowei_node=cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent=this.node.parent;
            this.node.zIndex=1;
            this.tuowei_time=this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            this.tuowei_guiyi=1/this.tuowei_time;
        }
    }

    addInitFinishedListen(callback:Function){
        this.init_finish_callback=callback;
    }

    protected addCollisionMonsterListen(callback:Function){
        this.collision_monster_callback=callback;
    }

    private changeDir(dir:number)
    {
        this.move_direction=(dir+Math.PI*2)%(Math.PI*2);
    }

    collisionToWall(wallName:string)
    {
        if(wallName=='wall_left' || wallName=='wall_right')
        {
            if(this.max_move_distance>0){
                this.collision_monster_callback(null)
            }
            this.destroySelf();
        }
        if(wallName=='wall_top')
        {
            if(this.max_move_distance>0){
                this.collision_monster_callback(null)
            }
            this.destroySelf();            
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
        this.move_speed+=this.acceleration*GameManager.getInstance().getGameRate();
        let xx=this.move_speed*dt*Math.cos(this.move_direction);
        let yy=this.move_speed*dt*Math.sin(this.move_direction);
        this.node.x+=xx;
        this.node.y+=yy;
        if(this.spin_speed>0){
            this.node.angle+=this.spin_speed*dt;
        }else{
            this.node.angle=180*this.move_direction/Math.PI-this.offset_xx_angle;
        }        
        if(this.max_move_distance>0&&this.cur_move_distance<this.max_move_distance){
            let distance=cc.v2(xx,yy).mag();
            this.cur_move_distance+=distance;
            if(this.cur_move_distance>=this.max_move_distance){
                this.collision_monster_callback(null);
            }
        }
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
        if(this.tuowei_node){
            cc.tween(this.tuowei_node).delay(this.tuowei_time).removeSelf().start();
            this.tuowei_node=null;
        }
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    setDirection(dir:number)
    {
        this.move_direction=(dir+Math.PI*2)%(Math.PI*2);
        this.node.angle=180*dir/Math.PI-this.offset_xx_angle;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose || this.is_att==true)
            return;
        let group=other.node.group;
        switch(group){
            case 'enemy':{
                if(this.collision_monster_callback){
                    let monsterTs=other.node.getComponent(Monster);
                    this.is_att=true;
                    if(monsterTs)
                        this.collision_monster_callback(monsterTs);
                }
            }break;
            // case "enemy_block":{
            //     this.is_att=true;
            //     this.destroySelf();
            //     // let gjData=other.node.getComponent(GongJi);
            //     // //本次伤害直接减伤
            //     // if(gjData){
            //     //     this.monster_ts.jianshang_rate+=this.monster_ts.skill_data.getSkillValue1(1);
            //     //     this.monster_ts.beFlashInjured(gjData.gongji_data);
            //     //     this.monster_ts.jianshang_rate-=this.monster_ts.skill_data.getSkillValue1(1);
            //     //     //直接销毁
            //     //     gjData.node.removeFromParent();
            //     // }
            // }break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    }
}
