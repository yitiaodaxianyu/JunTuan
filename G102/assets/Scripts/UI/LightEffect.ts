

const {ccclass, property} = cc._decorator;

@ccclass
export default class LightEffect extends cc.Component {

    light_materail:cc.Material=null;
    @property()
    light_y:number=-0.5;
    //cur_angle:number=45;

    start () {
        this.light_materail=this.node.getComponent(cc.Sprite).getMaterial(0);
    }

    update(dt)
    {
        this.light_y+=dt*1.2;
        if(this.light_y>1.5)
        {
            this.light_y=-0.5;
            // this.cur_angle=180-this.cur_angle;
            // this.light_materail.setProperty('lightAngle',this.cur_angle);
        }
        this.light_materail.setProperty('lightCenterPoint',cc.v2(0.5,this.light_y));
    }

}
