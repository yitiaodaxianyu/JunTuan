const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start () {
        this.schedule(()=>{
            this.node.angle -= 30;
        },0.1,cc.macro.REPEAT_FOREVER,0);
    }

}
