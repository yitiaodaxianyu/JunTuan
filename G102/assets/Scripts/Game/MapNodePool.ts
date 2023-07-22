

const {ccclass, property} = cc._decorator;

@ccclass
/**动态对象池*/
export default class MapNodePool extends cc.Component {

    map_node_pools: Map<number,cc.NodePool>=null;
    map_prefabs: Map<number,cc.Prefab>=null;
    preload_id:number[]=[];

    protected onLoad(): void {
        this.map_node_pools=new Map<number,cc.NodePool>();
        this.map_prefabs=new Map<number,cc.Prefab>();
        this.preload_id=new Array();
    }

    /**根据id和资源目录 新建一个对象池,返回是否需要加载*/
    protected addNodePool(id:number,path:string,initCount:number,loadCallback?:Function):boolean{
        //如果已经添加了，那么就不继续添加了
        if(this.map_node_pools.has(id)){
            if(loadCallback){
                loadCallback();
            }
            return false;
        }

        if(this.preload_id.includes(id)){
            return false;
        }

        this.preload_id.push(id);
      
        cc.resources.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=> {
            if(error){
                console.log(error);
                return;
            }
            this.map_prefabs.set(id,assets);
         
            let pool=new cc.NodePool();// 创建对象池
            //初始先放置多少个对象到对象池
            for(let i=0; i<initCount; ++i){
                let node = cc.instantiate(assets); // 创建节点
                pool.put(node);// 通过 put 接口放入对象池
                this.map_node_pools.set(id,pool); //把对象池放进map对象
            }
            if(loadCallback){
                loadCallback(pool.get());
            }
        });

        return true;
    }
    /**根据id获得一个对象节点*/
    protected getNodeById(id:number):cc.Node
    {
        let node:cc.Node = null;
        //获得id对应的对象池
        let pool=this.map_node_pools.get(id);
        if(pool){
            if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                node = pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                node = cc.instantiate(this.map_prefabs.get(id));
            }
        }
        return node;
    }
    /**根据id删除一个对象节点*/
    protected destroyNode(id:number,node:cc.Node)
    {
        //获得id对应的对象池
        let pool=this.map_node_pools.get(id);
        if(pool){
            // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
            pool.put(node);
        }
    }

    protected onDestroy()
    {
        if(this.map_node_pools){
            this.map_node_pools.forEach((v,k)=>{
                v.clear();
            });
            this.map_node_pools=null;            
        }
        
        //cc.log(cc.assetManager.assets.count);
        if(this.map_prefabs){
            // this.map_prefabs.forEach((v,k)=>{
                
            //     //cc.log(cc.assetManager.assets.count);
            // });
            this.map_prefabs=null;
        }
        if(this.preload_id){
            this.preload_id=null;
        }
        //this.map_prefabs=null;
        //cc.log(cc.assetManager.assets.count);
    }

}
