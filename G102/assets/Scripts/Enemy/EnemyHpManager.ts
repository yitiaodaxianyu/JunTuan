
import GameManager from "../GameManager";
import NodePoolManager from "../NodePoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyHpManager extends NodePoolManager  {

    onLoad () {
        super.init(8);
        GameManager.getInstance().enemy_hp_manager=this;        
    }

    createEnemyHp(pos:cc.Vec2):cc.Node
    {
        let node=super.createNodeByType(0,pos);        
        return node;
    }



    destroyBossHp(node:cc.Node)
    {
        node.removeFromParent();
    }

    destroyEnemyHp(node:cc.Node)
    {
        if(node!=null)
        {
            node.scale=1;
            node.opacity=255;
            super.destroyNode(node,0);
        }else
        {
            cc.log(node);
        }
        
    }

    onDestroy()
    {
        GameManager.getInstance().enemy_hp_manager=null;
    }
}
