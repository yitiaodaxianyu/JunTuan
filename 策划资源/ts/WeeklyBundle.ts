export class JsonWeeklyBundle {
    /**礼包ID */
    public GiftsBundle:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**金币 */
    public GetCoin:number = 0 ;
    /**钻石 */
    public GetGem:number = 0 ;
    /**英雄经验 */
    public HeroExp:number = 0 ;
    /**道具ID_1 */
    public ItemId_1:number = 0 ;
    /**道具数量_1 */
    public ItemNum_1:number = 0 ;
    /**道具ID_2 */
    public ItemId_2:number = 0 ;
    /**道具数量_2 */
    public ItemNum_2:number = 0 ;
    /**VIP点数 */
    public VipPoints:number = 0 ;
    /**价值比例 */
    public ValueProportion:number = 0 ;
}

export class WeeklyBundleManager {
    private static _instance: WeeklyBundleManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonWeeklyBundle>=null;
    private is_load_completed:boolean=false;

    public static getInstance():WeeklyBundleManager {
        if(this._instance==null) {
            this._instance=new WeeklyBundleManager();
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
        LoadManager.loadJson('WeeklyBundle',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonWeeklyBundle成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonWeeklyBundle();
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
    public getJsonWeeklyBundle(id:number):JsonWeeklyBundle {
        return this.data.get(id);
    }
    /**根据礼包ID获取显示顺序 */
    public getDisplayOrder(id:number): number {
        return this.data.get(id).DisplayOrder;
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
    /**根据礼包ID获取道具ID_1 */
    public getItemId_1(id:number): number {
        return this.data.get(id).ItemId_1;
    }
    /**根据礼包ID获取道具数量_1 */
    public getItemNum_1(id:number): number {
        return this.data.get(id).ItemNum_1;
    }
    /**根据礼包ID获取道具ID_2 */
    public getItemId_2(id:number): number {
        return this.data.get(id).ItemId_2;
    }
    /**根据礼包ID获取道具数量_2 */
    public getItemNum_2(id:number): number {
        return this.data.get(id).ItemNum_2;
    }
    /**根据礼包ID获取VIP点数 */
    public getVipPoints(id:number): number {
        return this.data.get(id).VipPoints;
    }
    /**根据礼包ID获取价值比例 */
    public getValueProportion(id:number): number {
        return this.data.get(id).ValueProportion;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftsBundle():number {
        return 4003;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
