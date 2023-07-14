

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hint extends cc.Component {

    hint_label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hint_label=this.node.getChildByName('hintLabel').getComponent(cc.Label);
    }

    start () {
        this.node.zIndex=9999;        
    }

    showHintMessage(message:string,dt?:number)
    {
        if(!dt)
        {
            dt=1.5;
        }
        this.hint_label.string=message;
        this.node.opacity=0;
        this.hint_label.enabled=false;
        this.scheduleOnce(()=>{
            this.node.opacity=255;
            this.hint_label.enabled=true;
            this.node.height=this.hint_label.node.height+(this.hint_label.lineHeight-this.hint_label.fontSize)*2;
            cc.tween(this.node).then(cc.sequence(cc.delayTime(dt),cc.fadeOut(1),cc.removeSelf())).start();
        },0.05);
    }
}
