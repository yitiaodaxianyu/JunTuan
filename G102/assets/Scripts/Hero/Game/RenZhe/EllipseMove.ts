//椭圆公式
// 当焦点在x轴时，椭圆的标准方程是：x^2/a^2+y^2/b^2=1，(a>b>0)；

// 当焦点在y轴时，椭圆的标准方程是：y^2/a^2+x^2/b^2=1，(a>b>0)；
const {ccclass, property} = cc._decorator;

@ccclass
export default class EllipseMove extends cc.Component {

    //围绕的几点数量
    revolve_num:number=1;
    weapons:cc.Node[]=[];
    //椭圆的参数
    //长轴
    @property()
    ellipse_A:number=64;

    //短轴
    @property()
    ellipse_B:number=32;

    //椭圆的中心
    @property()
    ellipse_Oxy:cc.Vec2=cc.v2(0,0);

    //环绕的角速度
    revolve_speed:number=360;
    //当前与正半轴的夹角
    @property()
    cur_angle:number=0;

    /*倾斜的角度*/
    tilt_angle:number=0;

    weapon_streak:cc.Node=null;


    /**
     * 
     * @param initAngle 初始的角度
     * @param tiltAngle 整个椭圆倾斜的角度
     * @param centerPos 中心位置,圆心
     */
    init(initAngle:number,tiltAngle:number,centerPos:cc.Vec2)
    {
        this.cur_angle=initAngle;
        this.tilt_angle=tiltAngle;
        this.ellipse_Oxy=centerPos;
        this.update(0.0);
        // if(this.tilt_angle==0)
        // {
        //     this.ellipse_A=100;
        //     this.ellipse_B=400;
        // }else
        // {
        //     this.ellipse_A=400;
        //     this.ellipse_B=80;
        // }
    }

    refreshAngle(angle:number){
        this.cur_angle=angle;
    }

    update (dt) {
        //if(this.target_node){            
            let endX=0;
            let endY=0;
            //this.tilt_angle=Math.atan2(this.ellipse_Oxy.y,this.ellipse_Oxy.x)+Math.PI/2;
            if(this.tilt_angle==0)
            {
                //正椭圆
                this.cur_angle=(this.cur_angle+this.revolve_speed*dt)%360;
                //转换弧度
                let hudu=Math.PI*(this.cur_angle)/180;
                endX=this.ellipse_Oxy.x+this.ellipse_A*Math.cos(hudu);
                endY=this.ellipse_Oxy.y+this.ellipse_B*Math.sin(hudu);                
            }else
            {
                //斜椭圆,倾斜60°
                if(this.tilt_angle>0)
                {
                    this.cur_angle=(this.cur_angle+this.revolve_speed*dt)%360;
                }else
                {
                    this.cur_angle=(this.cur_angle-this.revolve_speed*dt)%360;
                }
                //转换弧度
                let hudu=Math.PI*(this.cur_angle)/180;
                let normalCos=Math.cos(hudu);
                let normalSin=Math.sin(hudu);
                //转换弧度
                let qingxieAngle=this.tilt_angle;
                let qingxieCos=Math.cos(qingxieAngle);
                let qingxieSin=Math.sin(qingxieAngle);
               
                endX=this.ellipse_Oxy.x+this.ellipse_A*normalCos*qingxieCos-this.ellipse_B*normalSin*qingxieSin;
                endY=this.ellipse_Oxy.y+this.ellipse_B*normalCos*qingxieSin+this.ellipse_B*normalSin*qingxieCos;
            }
            this.node.x=endX;
            this.node.y=endY;
            this.node.zIndex=this.node.y>this.ellipse_Oxy.y?0:3;
        //}
        
    }
}
