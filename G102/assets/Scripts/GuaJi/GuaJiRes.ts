import { PropManager } from "../Prop/PropManager";
import GuaJiManager from "./GuaJiManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiRes extends cc.Component {


    is_follow_bg:boolean=false;

    // onLoad () {}

    init (propId:number) {
        //换图片
        //this.node.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(propId);
        let xx=Math.random()*20+30;
        xx*=Math.random()<0.5?1:-1;
        let yy=0;
        let height=Math.random()*20+30;
        cc.tween(this.node).then(cc.jumpBy(0.5,xx,yy,height,1)).call(()=>{
            this.is_follow_bg=true;
        }).delay(1).call(()=>{
            this.is_follow_bg=false;
        }).to(Math.random()*0.3+0.3,{x:GuaJiManager.getInstance().box_pos.x,y:GuaJiManager.getInstance().box_pos.y,opacity:168}).removeSelf().start();

    }

    update (dt) {
        if(this.is_follow_bg){
            let xx=-(GuaJiManager.getInstance().bg_speed_x*dt)
            this.node.x+=xx;
        }
    }
}
