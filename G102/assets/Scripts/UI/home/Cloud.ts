const {ccclass, property} = cc._decorator;

@ccclass
export default class Cloud extends cc.Component {

    @property(cc.Integer)
    speed:number = 1;
    
    protected start(): void {
        cc.tween(this.node).to(this.speed,{position:cc.v3(-525,this.node.y,0)}).call(()=>{
            this.node.x = 525;
        }).union().repeatForever().start();
    }

}
