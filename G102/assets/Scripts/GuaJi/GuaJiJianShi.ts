import GuaJiManager from "./GuaJiManager";
import GuaJiMonster from "./GuaJiMonster";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiJianShi extends cc.Component {

    jianshi_type:number=1;
    move_speed:number=1600;
    move_direction:number=Math.PI/2;
    jiantou_dis:number=16;
    is_att:boolean=false;
    offset_xx_angle:number=90;

    collision_monster_callback:Function=null;
    max_move_distance:number=0;
    cur_move_distance:number=0;
    spin_speed:number=0;
    init_finish_callback:Function=null;
    /**加速度 */
    acceleration:number=0;
    /**拖尾*/
    tuowei:cc.Node=null;

    onLoad()
    {
        this.jiantou_dis=this.node.height/4;        
    }

    init(dir:number,jianshiType:number,isTuowei:boolean=false): void {
        this.setDirection(dir);
        this.is_att=false;
        this.jianshi_type=jianshiType;
        if(isTuowei){
            this.tuowei=GuaJiManager.getInstance().createTuoWei(this.node.getPosition());
        }
    }

    getJianTouPos():cc.Vec2
    {
        let xx=this.node.x+Math.cos(this.move_direction)*this.jiantou_dis;
        let yy=this.node.y+Math.sin(this.move_direction)*this.jiantou_dis;
        return cc.v2(xx,yy);
    }

    update (dt) {
        this.move_speed+=this.acceleration;
        let prevPos=this.node.getPosition();
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
        if(this.tuowei){
            let pos=this.node.getPosition();
            //添加在子弹前面            
            let offsetPos=pos.sub(prevPos);
            let distance=offsetPos.mag()*4;
            let dir=Math.atan2(offsetPos.y,offsetPos.x);
            let xx=pos.x+Math.cos(dir)*distance;
            let yy=pos.y+Math.sin(dir)*distance;
            this.tuowei.setPosition(cc.v2(xx,yy));
        }
    }

    destroySelf()
    {        
        if(this.tuowei){            
            let dt=this.tuowei.getComponent(cc.MotionStreak).fadeTime;
            cc.tween(this.tuowei).delay(dt/10).removeSelf().start();
            this.tuowei=null;
        }
        this.node.removeFromParent();
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        this.node.angle=180*dir/Math.PI-this.offset_xx_angle;
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let group=other.node.group;
        switch(group){
            case 'enemy':{
                switch(this.jianshi_type){
                    case 1:{
                        if(this.is_att==false){
                            let monsterTs=other.node.getComponent(GuaJiMonster);                    
                            if(!monsterTs.getIsDie()){
                                this.is_att=true;
                                monsterTs.changeHp();
                                GuaJiManager.getInstance().createHit(this.getJianTouPos());
                                this.destroySelf();
                            }
                        }
                    }break;
                    case 2:{
                        if(this.is_att==false){
                            let monsterTs=other.node.getComponent(GuaJiMonster);                    
                            if(!monsterTs.getIsDie()){
                                this.is_att=true;
                                monsterTs.changeHp();
                                GuaJiManager.getInstance().createPetHit(this.getJianTouPos());
                                this.destroySelf();
                            }
                        }
                    }break;
                }
                
            }break;
        }
    }
}
