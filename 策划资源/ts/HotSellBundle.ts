export class JsonHotSellBundle {
    /**礼包ID */
    public GiftsBundle:number = 0 ;
    /**标题文本 */
    public TitleText:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**道具1 */
    public ItemId_1:number = 0 ;
    /**道具2 */
    public ItemId_2:number = 0 ;
    /**道具3 */
    public ItemId_3:number = 0 ;
    /**道具数量1 */
    public ItemNum_1:number = 0 ;
    /**道具数量2 */
    public ItemNum_2:number = 0 ;
    /**道具数量3 */
    public ItemNum_3:number = 0 ;
    /**金币 */
    public GetCoin:number = 0 ;
    /**钻石 */
    public GetGem:number = 0 ;
    /**英雄经验 */
    public HeroExp:number = 0 ;
    /**VIP点数 */
    public VipPoints:number = 0 ;
    /**优惠幅度 */
    public RabateRate:number = 0 ;
}

export class HotSellBundleManager {
    private static _instance: HotSellBundleManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonHotSellBundle>=null;
    private is_load_completed:boolean=false;

    public static getInstance():HotSellBundleManager {
        if(this._instance==null) {
            this._instance=new HotSellBundleManager();
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
        LoadManager.loadJson('HotSellBundle',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonHotSellBundle成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonHotSellBundle();
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
    public getJsonHotSellBundle(id:number):JsonHotSellBundle {
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
    /**根据礼包ID获取道具1 */
    public getItemId_1(id:number): number {
        return this.data.get(id).ItemId_1;
    }
    /**根据礼包ID获取道具2 */
    public getItemId_2(id:number): number {
        return this.data.get(id).ItemId_2;
    }
    /**根据礼包ID获取道具3 */
    public getItemId_3(id:number): number {
        return this.data.get(id).ItemId_3;
    }
    /**根据礼包ID获取道具数量1 */
    public getItemNum_1(id:number): number {
        return this.data.get(id).ItemNum_1;
    }
    /**根据礼包ID获取道具数量2 */
    public getItemNum_2(id:number): number {
        return this.data.get(id).ItemNum_2;
    }
    /**根据礼包ID获取道具数量3 */
    public getItemNum_3(id:number): number {
        return this.data.get(id).ItemNum_3;
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
    public getHeroExp(id:number): number {
        return this.data.get(id).HeroExp;
    }
    /**根据礼包ID获取VIP点数 */
    public getVipPoints(id:number): number {
        return this.data.get(id).VipPoints;
    }
    /**根据礼包ID获取优惠幅度 */
    public getRabateRate(id:number): number {
        return this.data.get(id).RabateRate;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftsBundle():number {
        return 2007;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
