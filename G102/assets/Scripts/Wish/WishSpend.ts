import { LoadManager } from "../Loading/LoadManager";

export class JsonWishSpend {
    /**许愿池ID */
    public WishID:number = 0 ;
    /**许愿池类型 */
    public WishType:number = 0 ;
    /**章节进度 */
    public Chapter:number = 0 ;
    /**获得奖池集ID */
    public GetRewardID:number = 0 ;
    /**单抽道具ID */
    public OneDrawPropsID:number = 0 ;
    /**单抽道具消耗 */
    public OneDrawPropsSpend:number = 0 ;
    /**单抽钻石消耗 */
    public OneDrawDiamondsSpend:number = 0 ;
    /**十连抽道具消耗 */
    public TenDrawPropsSpend:number = 0 ;
    /**十连抽钻石消耗 */
    public TenDrawDiamondSpend:number = 0 ;
}

export class WishSpendManager {
    private static _instance: WishSpendManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonWishSpend>=null;
    private is_load_completed:boolean=false;

    public static getInstance():WishSpendManager {
        if(this._instance==null) {
            this._instance=new WishSpendManager();
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
        LoadManager.loadJson('WishSpend',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonWishSpend成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonWishSpend();
                jsonData=json[i];
                this.data.set(jsonData.WishID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonWishSpend(id:number):JsonWishSpend {
        return this.data.get(id);
    }
    /**根据许愿池ID获取许愿池类型 */
    public getWishType(id:number): number {
        return this.data.get(id).WishType;
    }
    /**根据许愿池ID获取章节进度 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据许愿池ID获取获得奖池集ID */
    public getGetRewardID(id:number): number {
        return this.data.get(id).GetRewardID;
    }
    /**根据许愿池ID获取单抽道具ID */
    public getOneDrawPropsID(id:number): number {
        return this.data.get(id).OneDrawPropsID;
    }
    /**根据许愿池ID获取单抽道具消耗 */
    public getOneDrawPropsSpend(id:number): number {
        return this.data.get(id).OneDrawPropsSpend;
    }
    /**根据许愿池ID获取单抽钻石消耗 */
    public getOneDrawDiamondsSpend(id:number): number {
        return this.data.get(id).OneDrawDiamondsSpend;
    }
    /**根据许愿池ID获取十连抽道具消耗 */
    public getTenDrawPropsSpend(id:number): number {
        return this.data.get(id).TenDrawPropsSpend;
    }
    /**根据许愿池ID获取十连抽钻石消耗 */
    public getTenDrawDiamondSpend(id:number): number {
        return this.data.get(id).TenDrawDiamondSpend;
    }

    /** 静态方法，获取最大的 许愿池ID*/
    public static getMaxWishID():number {
        return 2010;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
