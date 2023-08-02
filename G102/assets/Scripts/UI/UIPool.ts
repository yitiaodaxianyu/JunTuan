import WXManagerEX from "../../startscene/WXManagerEX";


const {ccclass, property} = cc._decorator;

@ccclass
/**动态对象池*/
export default class UIPool extends cc.Component {

    map_node_pools: Map<string,cc.NodePool>=null;
    map_prefabs: Map<string,cc.Prefab>=null;
    preload_path:string[]=[];
    test_pool:cc.NodePool=null;
    /**回调数组 */
    map_callback: Map<string,Array<Function>>=null;

    protected onLoad(): void {
        this.map_node_pools=new Map<string,cc.NodePool>();
        this.map_prefabs=new Map<string,cc.Prefab>();
        this.map_callback=new Map<string,Array<Function>>();
        this.preload_path=new Array();
        this.test_pool=new cc.NodePool();
    }

    /**根据id和资源目录 新建一个对象池,返回是否需要加载*/
    protected addNodePool(pathId:string,initCount:number,loadCallback?:Function):boolean{
        //如果已经添加了，那么就不继续添加了
        if(this.map_node_pools.has(pathId)){
            if(loadCallback){
                loadCallback();
            }
            return false;
        }

        if(this.preload_path.includes(pathId)){
            let arr=this.map_callback.get(pathId);
            if(arr){
                arr.push(loadCallback);
            }else{
                arr=new Array();
                arr.push(loadCallback);
            }            
            this.map_callback.set(pathId,arr);
            return false;
        }

        this.preload_path.push(pathId);
        WXManagerEX.getInstance().resourcesBundle.load(pathId,cc.Prefab,(error: Error, assets:cc.Prefab)=> {
            if(error){
                console.log(error);
                return;
            }
            
            this.map_prefabs.set(pathId,assets);
            let pool=new cc.NodePool();// 创建对象池
            //初始先放置多少个对象到对象池
            for(let i=0; i<initCount; ++i){
                let node:cc.Node = cc.instantiate(assets); // 创建节点
                pool.put(node);// 通过 put 接口放入对象池                
                //this.test_pool.put(node);
            }
            this.map_node_pools.set(pathId,pool); //把对象池放进map对象
            let pNode=pool.get()
            if(loadCallback){
                loadCallback(pNode);
            }
            let arr=this.map_callback.get(pathId);
            if(arr){
                arr.forEach((v,k)=>{
                    v(pNode);
                })
            }
        });

        return true;
    }
    /**根据id获得一个对象节点*/
    protected getNodeById(pathId:string):cc.Node
    {
        let node:cc.Node = null;
        //获得id对应的对象池
        let pool=this.map_node_pools.get(pathId);
        if(pool){
            if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                node = pool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                node = cc.instantiate(this.map_prefabs.get(pathId));
            }
        }
        return node;
    }
    /**根据id删除一个对象节点*/
    protected destroyNode(pathId:string,node:cc.Node)
    {
        //获得id对应的对象池
        let pool=this.map_node_pools.get(pathId);
        if(pool){
            // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent(false)
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
        
        if(this.map_prefabs){
            this.map_prefabs.forEach((v,k)=>{
                cc.log(cc.assetManager.assets.count);
            });
            this.map_prefabs=null;
        }
        if(this.preload_path){
            this.preload_path=null;
        }
    }

}
