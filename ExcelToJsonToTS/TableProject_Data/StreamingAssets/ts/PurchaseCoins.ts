export class JsonPurchaseCoins {
    /**金币ID */
    public CoinPurchaseID:number = 0 ;
    /**章节进度 */
    public Chapter:number = 0 ;
    /**展示位 */
    public DisplayPosition:number = 0 ;
    /**展示位文本 */
    public DisplayPositionTextID:number = 0 ;
    /**消耗钻石数量 */
    public ConsumeDiamondsNum:number = 0 ;
    /**获得金币数量 */
    public GetCoinNum:number = 0 ;
    /**是否为广告奖励 */
    public AdReward:number = 0 ;
    /**广告可观看次数 */
    public AdPlayableTimes:number = 0 ;
}

export class PurchaseCoinsManager {
    private static _instance: PurchaseCoinsManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonPurchaseCoins>=null;
    private is_load_completed:boolean=false;

    public static getInstance():PurchaseCoinsManager {
        if(this._instance==null) {
            this._instance=new PurchaseCoinsManager();
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
        LoadManager.loadJson('PurchaseCoins',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonPurchaseCoins成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonPurchaseCoins();
                jsonData=json[i];
                this.data.set(jsonData.CoinPurchaseID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonPurchaseCoins(id:number):JsonPurchaseCoins {
        return this.data.get(id);
    }
    /**根据金币ID获取章节进度 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据金币ID获取展示位 */
    public getDisplayPosition(id:number): number {
        return this.data.get(id).DisplayPosition;
    }
    /**根据金币ID获取展示位文本 */
    public getDisplayPositionTextID(id:number): number {
        return this.data.get(id).DisplayPositionTextID;
    }
    /**根据金币ID获取消耗钻石数量 */
    public getConsumeDiamondsNum(id:number): number {
        return this.data.get(id).ConsumeDiamondsNum;
    }
    /**根据金币ID获取获得金币数量 */
    public getGetCoinNum(id:number): number {
        return this.data.get(id).GetCoinNum;
    }
    /**根据金币ID获取是否为广告奖励 */
    public getAdReward(id:number): number {
        return this.data.get(id).AdReward;
    }
    /**根据金币ID获取广告可观看次数 */
    public getAdPlayableTimes(id:number): number {
        return this.data.get(id).AdPlayableTimes;
    }

    /** 静态方法，获取最大的 金币ID*/
    public static getMaxCoinPurchaseID():number {
        return 1003;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
