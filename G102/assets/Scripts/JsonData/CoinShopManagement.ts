import { LoadManager } from "../Loading/LoadManager";


export class JsonCoinShopManagement {
    /**商店ID */
    public Shop_ID:number = 0 ;
    /**章节 */
    public chapter:number = 0 ;
    /**序号 */
    public ShopNum:number = 0 ;
    /**商店列表 */
    public Shoplist:number[] = [] ;
}

export class CoinShopManagementManager {
    private static _instance: CoinShopManagementManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCoinShopManagement>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CoinShopManagementManager {
        if(this._instance==null) {
            this._instance=new CoinShopManagementManager();
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
        LoadManager.loadJson('CoinShopManagement',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCoinShopManagement成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCoinShopManagement();
                jsonData=json[i];
                this.data.set(jsonData.Shop_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCoinShopManagement(id:number):JsonCoinShopManagement {
        return this.data.get(id);
    }
    /**根据商店ID获取章节 */
    public getchapter(id:number): number {
        return this.data.get(id).chapter;
    }
    /**根据商店ID获取序号 */
    public getShopNum(id:number): number {
        return this.data.get(id).ShopNum;
    }
    /**根据商店ID获取商店列表 */
    public getShoplist(id:number): number[] {
        return this.data.get(id).Shoplist;
    }

    /** 静态方法，获取最大的 商店ID*/
    public static getMaxShop_ID():number {
        return 10003;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
