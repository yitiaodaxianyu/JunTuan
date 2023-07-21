export class JsonOptionalBundle {
    /**礼包id */
    public GiftsBundle:number = 0 ;
    /**标题文本 */
    public TitleText:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**自选池 */
    public OpitionalPool:number = 0 ;
    /**可选择次数 */
    public OpitionalTimes:number = 0 ;
    /**获得金币数量 */
    public GetCoin:number = 0 ;
    /**获得钻石数量 */
    public GetGem:number = 0 ;
    /**获得道具ID */
    public GetItemId:number = 0 ;
    /**获得数量 */
    public GetItemNum:number = 0 ;
    /**VIP点数 */
    public VipPoints:number = 0 ;
    /**购买次数限制 */
    public PurchaseTimesLimit:number = 0 ;
}

export class OptionalBundleManager {
    private static _instance: OptionalBundleManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonOptionalBundle>=null;
    private is_load_completed:boolean=false;

    public static getInstance():OptionalBundleManager {
        if(this._instance==null) {
            this._instance=new OptionalBundleManager();
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
        LoadManager.loadJson('OptionalBundle',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonOptionalBundle成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonOptionalBundle();
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
    public getJsonOptionalBundle(id:number):JsonOptionalBundle {
        return this.data.get(id);
    }
    /**根据礼包id获取标题文本 */
    public getTitleText(id:number): number {
        return this.data.get(id).TitleText;
    }
    /**根据礼包id获取显示顺序 */
    public getDisplayOrder(id:number): number {
        return this.data.get(id).DisplayOrder;
    }
    /**根据礼包id获取自选池 */
    public getOpitionalPool(id:number): number {
        return this.data.get(id).OpitionalPool;
    }
    /**根据礼包id获取可选择次数 */
    public getOpitionalTimes(id:number): number {
        return this.data.get(id).OpitionalTimes;
    }
    /**根据礼包id获取获得金币数量 */
    public getGetCoin(id:number): number {
        return this.data.get(id).GetCoin;
    }
    /**根据礼包id获取获得钻石数量 */
    public getGetGem(id:number): number {
        return this.data.get(id).GetGem;
    }
    /**根据礼包id获取获得道具ID */
    public getGetItemId(id:number): number {
        return this.data.get(id).GetItemId;
    }
    /**根据礼包id获取获得数量 */
    public getGetItemNum(id:number): number {
        return this.data.get(id).GetItemNum;
    }
    /**根据礼包id获取VIP点数 */
    public getVipPoints(id:number): number {
        return this.data.get(id).VipPoints;
    }
    /**根据礼包id获取购买次数限制 */
    public getPurchaseTimesLimit(id:number): number {
        return this.data.get(id).PurchaseTimesLimit;
    }

    /** 静态方法，获取最大的 礼包id*/
    public static getMaxGiftsBundle():number {
        return 1002;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
