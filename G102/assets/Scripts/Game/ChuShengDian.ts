import GameManager from "../GameManager";
import NodePoolManager from "../NodePoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChuShengDian extends NodePoolManager {


    onLoad () {
        this.init(8);
        GameManager.getInstance().chu_sheng_dian=this;        
    }
    onDestroy()
    {
        GameManager.getInstance().chu_sheng_dian=null;
    }
    createChuShengDian(pos:cc.Vec2,scale:number):cc.Node
    {
        let node=this.createNodeByType(0,pos);
        node.getComponent(sp.Skeleton).animation='animation';
        node.scale=scale;
        this.scheduleOnce(()=>{
            this.destroyChuShengDian(node);
        },3);
        return node;
    }

    destroyChuShengDian(node:cc.Node)
    {
        this.destroyNode(node,0);
    }

}
