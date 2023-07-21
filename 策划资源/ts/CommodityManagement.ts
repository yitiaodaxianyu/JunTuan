export class JsonCommodityManagement {
    /**商品ID */
    public CommodityID:number = 0 ;
    /**购买消耗道具ID */
    public CostItem:number = 0 ;
    /**消耗数量 */
    public CostNum:number = 0 ;
    /**获得道具ID */
    public GetItem:number = 0 ;
    /**获得道具数量 */
    public GetNum:number = 0 ;
}

export class CommodityManagementManager {
    private static _instance: CommodityManagementManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCommodityManagement>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CommodityManagementManager {
        if(this._instance==null) {
            this._instance=new CommodityManagementManager();
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
        LoadManager.loadJson('CommodityManagement',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityManagement成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCommodityManagement();
                jsonData=json[i];
                this.data.set(jsonData.CommodityID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCommodityManagement(id:number):JsonCommodityManagement {
        return this.data.get(id);
    }
    /**根据商品ID获取购买消耗道具ID */
    public getCostItem(id:number): number {
        return this.data.get(id).CostItem;
    }
    /**根据商品ID获取消耗数量 */
    public getCostNum(id:number): number {
        return this.data.get(id).CostNum;
    }
    /**根据商品ID获取获得道具ID */
    public getGetItem(id:number): number {
        return this.data.get(id).GetItem;
    }
    /**根据商品ID获取获得道具数量 */
    public getGetNum(id:number): number {
        return this.data.get(id).GetNum;
    }

    /** 静态方法，获取最大的 商品ID*/
    public static getMaxCommodityID():number {
        return 20199;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
