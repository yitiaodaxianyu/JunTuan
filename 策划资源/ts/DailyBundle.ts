export class JsonDailyBundle {
    /**礼包ID */
    public GiftsBundle:number = 0 ;
    /**标题文本 */
    public TitleText:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**付费类型 */
    public PaymentType:number = 0 ;
    /**金币 */
    public GetCoin:number = 0 ;
    /**钻石 */
    public GetGem:number = 0 ;
    /**英雄经验 */
    public GetHeroExp:number = 0 ;
    /**天赋点 */
    public GetTalentPoints:number = 0 ;
    /**道具ID */
    public ItemId:number = 0 ;
    /**道具数量 */
    public ItemNum:number = 0 ;
    /**限购次数 */
    public PurchaseTimesLimit:number = 0 ;
    /**VIP点数 */
    public VipPoints:number = 0 ;
}

export class DailyBundleManager {
    private static _instance: DailyBundleManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDailyBundle>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DailyBundleManager {
        if(this._instance==null) {
            this._instance=new DailyBundleManager();
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
        LoadManager.loadJson('DailyBundle',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDailyBundle成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDailyBundle();
                jsonData=json[i];
                this.data.set(jsonData.GiftsBundle,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDailyBundle(id:number):JsonDailyBundle {
        return this.data.get(id);
    }
    /**根据礼包ID获取标题文本 */
    public getTitleText(id:number): number {
        return this.data.get(id).TitleText;
    }
    /**根据礼包ID获取显示顺序 */
    public getDisplayOrder(id:number): number {
        return this.data.get(id).DisplayOrder;
    }
    /**根据礼包ID获取付费类型 */
    public getPaymentType(id:number): number {
        return this.data.get(id).PaymentType;
    }
    /**根据礼包ID获取金币 */
    public getGetCoin(id:number): number {
        return this.data.get(id).GetCoin;
    }
    /**根据礼包ID获取钻石 */
    public getGetGem(id:number): number {
        return this.data.get(id).GetGem;
    }
    /**根据礼包ID获取英雄经验 */
    public getGetHeroExp(id:number): number {
        return this.data.get(id).GetHeroExp;
    }
    /**根据礼包ID获取天赋点 */
    public getGetTalentPoints(id:number): number {
        return this.data.get(id).GetTalentPoints;
    }
    /**根据礼包ID获取道具ID */
    public getItemId(id:number): number {
        return this.data.get(id).ItemId;
    }
    /**根据礼包ID获取道具数量 */
    public getItemNum(id:number): number {
        return this.data.get(id).ItemNum;
    }
    /**根据礼包ID获取限购次数 */
    public getPurchaseTimesLimit(id:number): number {
        return this.data.get(id).PurchaseTimesLimit;
    }
    /**根据礼包ID获取VIP点数 */
    public getVipPoints(id:number): number {
        return this.data.get(id).VipPoints;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftsBundle():number {
        return 3006;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
