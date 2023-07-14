

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodePoolManager extends cc.Component {

    //@property({type:[cc.NodePool],tooltip:'所有对象的对象池'})
    node_pools: cc.NodePool[]=[];

    @property({type:[cc.Prefab],tooltip:'所有对象的预制体'})
    prefabs: cc.Prefab[]=[];

    protected init(count:number):void
    {
        let initCount = count;
        let prefabNum=this.prefabs.length;
        for (let type = 0; type < prefabNum; ++type) {
            this.node_pools.push(new cc.NodePool());
            for(let i=0; i<initCount; ++i)
            {
                let node = cc.instantiate(this.prefabs[type]); // 创建节点
                this.node_pools[type].put(node); // 通过 put 接口放入对象池
            }
        }
    }

    protected createNodeByType(type:number,pos:cc.Vec2):cc.Node
    {
        let node:cc.Node = null;
        if (this.node_pools[type].size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = this.node_pools[type].get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(this.prefabs[type]);
        }
        node.setPosition(pos);
        node.parent = this.node; // 将生成的加入节点树
        return node;
    }

    protected createNodeByParent(type:number,pos:cc.Vec2,parent:cc.Node):cc.Node
    {
        let node:cc.Node = null;
        if (this.node_pools[type].size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = this.node_pools[type].get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(this.prefabs[type]);
        }
        node.setPosition(pos);
        node.active=true;
        node.parent = parent; // 将生成的加入节点树
        return node;
    }

    protected destroyNode(node:cc.Node,type:number)
    {
        this.node_pools[type].put(node); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }

    protected onDestroy()
    {
        let prefabNum=this.prefabs.length;
        for (let type = 0; type < prefabNum; ++type) {
            this.node_pools[type].clear();
        }
    }

}
