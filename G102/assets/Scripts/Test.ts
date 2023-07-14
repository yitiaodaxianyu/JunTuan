// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    start()
    {
        
    }

    onTouchStart(e:cc.Event.EventTouch)
    {
        let pos=cc.find('Canvas').convertToNodeSpaceAR(e.getLocation());
        this.node.setPosition(pos);
    }

    onTouchMove(e)
    {
        let pos=cc.find('Canvas').convertToNodeSpaceAR(e.getLocation());
        this.node.setPosition(pos);
    }

    onTouchEnd(e)
    {
        let pos=cc.find('Canvas').convertToNodeSpaceAR(e.getLocation());
        this.node.setPosition(pos);
    }

    // banner () {
    //     cocosAnalytics.CACustomEvent.onStarted("banner", {
    //         name: "banner",            
    //     });
    // }

    // video () {
    //     cocosAnalytics.CACustomEvent.onStarted("video", {
    //         name: "video",            
    //     });
    // }
    // update (dt) {}
}
