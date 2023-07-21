export class JsonGemRecharge {
    /**钻石充值ID */
    public GemRecharge:number = 0 ;
    /**展示位 */
    public DisplayPosition:number = 0 ;
    /**是否为广告奖励 */
    public AdReward:number = 0 ;
    /**广告可观看次数 */
    public AdPlayableTimes:number = 0 ;
    /**刷新周期 */
    public RefreshCycle:number = 0 ;
    /**金额消耗 */
    public MoneyCost:number = 0 ;
    /**获得数量 */
    public GetNum:number = 0 ;
    /**首充额外赠送数量 */
    public ExtraNum:number = 0 ;
    /**返利幅度 */
    public MarginRebate:number = 0 ;
    /**奖励积分 */
    public VipPoints:number = 0 ;
    /**谷歌计费ID */
    public ProductId:number = 0 ;
}

export class GemRechargeManager {
    private static _instance: GemRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonGemRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():GemRechargeManager {
        if(this._instance==null) {
            this._instance=new GemRechargeManager();
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
        LoadManager.loadJson('GemRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonGemRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonGemRecharge();
                jsonData=json[i];
                this.data.set(jsonData.GemRecharge,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonGemRecharge(id:number):JsonGemRecharge {
        return this.data.get(id);
    }
    /**根据钻石充值ID获取展示位 */
    public getDisplayPosition(id:number): number {
        return this.data.get(id).DisplayPosition;
    }
    /**根据钻石充值ID获取是否为广告奖励 */
    public getAdReward(id:number): number {
        return this.data.get(id).AdReward;
    }
    /**根据钻石充值ID获取广告可观看次数 */
    public getAdPlayableTimes(id:number): number {
        return this.data.get(id).AdPlayableTimes;
    }
    /**根据钻石充值ID获取刷新周期 */
    public getRefreshCycle(id:number): number {
        return this.data.get(id).RefreshCycle;
    }
    /**根据钻石充值ID获取金额消耗 */
    public getMoneyCost(id:number): number {
        return this.data.get(id).MoneyCost;
    }
    /**根据钻石充值ID获取获得数量 */
    public getGetNum(id:number): number {
        return this.data.get(id).GetNum;
    }
    /**根据钻石充值ID获取首充额外赠送数量 */
    public getExtraNum(id:number): number {
        return this.data.get(id).ExtraNum;
    }
    /**根据钻石充值ID获取返利幅度 */
    public getMarginRebate(id:number): number {
        return this.data.get(id).MarginRebate;
    }
    /**根据钻石充值ID获取奖励积分 */
    public getVipPoints(id:number): number {
        return this.data.get(id).VipPoints;
    }
    /**根据钻石充值ID获取谷歌计费ID */
    public getProductId(id:number): number {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 钻石充值ID*/
    public static getMaxGemRecharge():number {
        return 10007;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
