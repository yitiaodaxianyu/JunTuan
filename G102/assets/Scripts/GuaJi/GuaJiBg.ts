import GuaJiManager from "./GuaJiManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiBg extends cc.Component {

    @property()
    speed_x:number=40;

    

    // onLoad () {}

    start () {

    }

    update (dt) {
        let xx=-(this.speed_x*dt)
        this.node.x+=xx;

        if(this.node.x<=-1500){
            this.node.x+=3000;
        }
    }
}
