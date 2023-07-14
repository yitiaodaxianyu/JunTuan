

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoMove extends cc.Component {

    max_x:number=0;



    onLoad()
    {
        this.max_x=384;
    }

    update (dt) {
        this.node.x+=dt*256;
        // if(this.node.x>=this.max_x)
        // {
        //     this.node.x=-this.max_x;
        // }
    }
}
