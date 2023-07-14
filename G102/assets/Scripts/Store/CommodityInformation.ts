import { LoadManager } from "../Loading/LoadManager";

export class JsonCommodityInformation {
    /**商品ID */
    public CommodityID:number = 0 ;
    /**获得道具ID */
    public GetItem:number = 0 ;
    /**消耗道具ID */
    public CostItemID:number = 0 ;
    /**消耗数量 */
    public CostNum:number = 0 ;
    /**获得道具数量 */
    public GetNum:number = 0 ;
    /**是否为广告奖励 */
    public AdReward:number = 0 ;
    /**广告可观看次数 */
    public AdPlayableTimes:number = 0 ;
}

export class CommodityInformationManager {
    private static _instance: CommodityInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCommodityInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CommodityInformationManager {
        if(this._instance==null) {
            this._instance=new CommodityInformationManager();
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
        LoadManager.loadJson('CommodityInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCommodityInformation();
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
    public getJsonCommodityInformation(id:number):JsonCommodityInformation {
        return this.data.get(id);
    }
    /**根据商品ID获取获得道具ID */
    public getGetItem(id:number): number {
        return this.data.get(id).GetItem;
    }
    /**根据商品ID获取消耗道具ID */
    public getCostItemID(id:number): number {
        return this.data.get(id).CostItemID;
    }
    /**根据商品ID获取消耗数量 */
    public getCostNum(id:number): number {
        return this.data.get(id).CostNum;
    }
    /**根据商品ID获取获得道具数量 */
    public getGetNum(id:number): number {
        return this.data.get(id).GetNum;
    }
    /**根据商品ID获取是否为广告奖励 */
    public getAdReward(id:number): number {
        return this.data.get(id).AdReward;
    }
    /**根据商品ID获取广告可观看次数 */
    public getAdPlayableTimes(id:number): number {
        return this.data.get(id).AdPlayableTimes;
    }

    /** 静态方法，获取最大的 商品ID*/
    public static getMaxCommodityID():number {
        return 301201;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
