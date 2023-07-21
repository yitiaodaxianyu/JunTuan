export class JsonCoinRecharge {
    /**金币充值ID */
    public CoinRecharge:number = 0 ;
    /**展示位 */
    public DisplayPosition:number = 0 ;
    /**是否为广告奖励 */
    public AdReward:number = 0 ;
    /**广告可观看次数 */
    public AdPlayableTimes:number = 0 ;
    /**刷新周期 */
    public RefreshCycle:number = 0 ;
    /**次数限制 */
    public AvailableTimes:number = 0 ;
    /**钻石消耗 */
    public GemCost:number = 0 ;
    /**获取道具 */
    public GetItem:number = 0 ;
    /**获得数量 */
    public GetNum:number = 0 ;
}

export class CoinRechargeManager {
    private static _instance: CoinRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCoinRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CoinRechargeManager {
        if(this._instance==null) {
            this._instance=new CoinRechargeManager();
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
        LoadManager.loadJson('CoinRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCoinRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCoinRecharge();
                jsonData=json[i];
                this.data.set(jsonData.CoinRecharge,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCoinRecharge(id:number):JsonCoinRecharge {
        return this.data.get(id);
    }
    /**根据金币充值ID获取展示位 */
    public getDisplayPosition(id:number): number {
        return this.data.get(id).DisplayPosition;
    }
    /**根据金币充值ID获取是否为广告奖励 */
    public getAdReward(id:number): number {
        return this.data.get(id).AdReward;
    }
    /**根据金币充值ID获取广告可观看次数 */
    public getAdPlayableTimes(id:number): number {
        return this.data.get(id).AdPlayableTimes;
    }
    /**根据金币充值ID获取刷新周期 */
    public getRefreshCycle(id:number): number {
        return this.data.get(id).RefreshCycle;
    }
    /**根据金币充值ID获取次数限制 */
    public getAvailableTimes(id:number): number {
        return this.data.get(id).AvailableTimes;
    }
    /**根据金币充值ID获取钻石消耗 */
    public getGemCost(id:number): number {
        return this.data.get(id).GemCost;
    }
    /**根据金币充值ID获取获取道具 */
    public getGetItem(id:number): number {
        return this.data.get(id).GetItem;
    }
    /**根据金币充值ID获取获得数量 */
    public getGetNum(id:number): number {
        return this.data.get(id).GetNum;
    }

    /** 静态方法，获取最大的 金币充值ID*/
    public static getMaxCoinRecharge():number {
        return 20004;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
