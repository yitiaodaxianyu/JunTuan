import { LoadManager } from "../Loading/LoadManager";
import { CommodityInformationManager } from "./CommodityInformation";

export class JsonDailyShop {
    /**商店ID */
    public Shop_ID:number = 0 ;
    /**章节 */
    public chapter:number = 0 ;
    /**序号 */
    public ShopNum:number = 0 ;
    /**商店列表 */
    public Shoplist:number[] = [] ;
}

export class DailyShopManager {
    private static _instance: DailyShopManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDailyShop>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DailyShopManager {
        if(this._instance==null) {
            this._instance=new DailyShopManager();
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
        LoadManager.loadJson('DailyShop',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDailyShop成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDailyShop();
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
    public getJsonDailyShop(id:number):JsonDailyShop {
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

    getJsonDataByChapterAndInde(chapter:number,index:number):JsonDailyShop{
        let info:JsonDailyShop = null;
        this.data.forEach((v,k)=>{
            if(v.chapter == chapter && v.ShopNum == index){
                info = v;
            }
        });
        return info;
    }

    check(){
        this.data.forEach((v,k)=>{
            for(let i=0; i<v.Shoplist.length; i++) {
                let shopId=v.Shoplist[i];
                if(!CommodityInformationManager.getInstance().getJsonCommodityInformation(shopId)){
                    cc.error("不存在商店id："+shopId);
                }
            }
        });
    }
}
