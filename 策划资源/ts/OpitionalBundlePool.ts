export class JsonOpitionalBundlePool {
    /**自选池 */
    public OpitionalPool:number = 0 ;
    /**自选池道具列表 */
    public OpitionalPoolItem:number[] = [] ;
    /**自选数量 */
    public num:number[] = [] ;
}

export class OpitionalBundlePoolManager {
    private static _instance: OpitionalBundlePoolManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonOpitionalBundlePool>=null;
    private is_load_completed:boolean=false;

    public static getInstance():OpitionalBundlePoolManager {
        if(this._instance==null) {
            this._instance=new OpitionalBundlePoolManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init() {
        if(!this.data) {
            this.loadJson();
        }
    }
    //加载json
    private loadJson() {
        LoadManager.loadJson('OpitionalBundlePool',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonOpitionalBundlePool成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonOpitionalBundlePool();
                jsonData=json[i];
                this.data.set(jsonData.OpitionalPool,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonOpitionalBundlePool(id:number):JsonOpitionalBundlePool {
        return this.data.get(id);
    }
    /**根据自选池获取自选池道具列表 */
    public getOpitionalPoolItem(id:number): number[] {
        return this.data.get(id).OpitionalPoolItem;
    }
    /**根据自选池获取自选数量 */
    public getnum(id:number): number[] {
        return this.data.get(id).num;
    }

    /** 静态方法，获取最大的 自选池*/
    public static getMaxOpitionalPool():number {
        return 2;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
