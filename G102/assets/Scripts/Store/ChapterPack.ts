import { LoadManager } from "../Loading/LoadManager";

export class JsonChapterPack {
    /**礼包ID */
    public GiftID:number = 0 ;
    /**章节 */
    public Chapter:number = 0 ;
    /**礼包名称 */
    public Giftname:number = 0 ;
    /**金币数量 */
    public GetCoinNum:number = 0 ;
    /**钻石数量 */
    public GetGemNum:number = 0 ;
    /**道具1ID */
    public ItemId_1:number = 0 ;
    /**道具1数量 */
    public ItemNum_1:number = 0 ;
    /**道具2ID */
    public ItemId_2:number = 0 ;
    /**道具2数量 */
    public ItemNum_2:number = 0 ;
    /**初始价格 */
    public InitialPrice:number = 0 ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class ChapterPackManager {
    private static _instance: ChapterPackManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonChapterPack>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ChapterPackManager {
        if(this._instance==null) {
            this._instance=new ChapterPackManager();
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
        LoadManager.loadJson('ChapterPack',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonChapterPack成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonChapterPack();
                jsonData=json[i];
                this.data.set(jsonData.GiftID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonChapterPack(id:number):JsonChapterPack {
        return this.data.get(id);
    }
    /**根据礼包ID获取章节 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据礼包ID获取礼包名称 */
    public getGiftname(id:number): number {
        return this.data.get(id).Giftname;
    }
    /**根据礼包ID获取金币数量 */
    public getGetCoinNum(id:number): number {
        return this.data.get(id).GetCoinNum;
    }
    /**根据礼包ID获取钻石数量 */
    public getGetGemNum(id:number): number {
        return this.data.get(id).GetGemNum;
    }
    /**根据礼包ID获取道具1ID */
    public getItemId_1(id:number): number {
        return this.data.get(id).ItemId_1;
    }
    /**根据礼包ID获取道具1数量 */
    public getItemNum_1(id:number): number {
        return this.data.get(id).ItemNum_1;
    }
    /**根据礼包ID获取道具2ID */
    public getItemId_2(id:number): number {
        return this.data.get(id).ItemId_2;
    }
    /**根据礼包ID获取道具2数量 */
    public getItemNum_2(id:number): number {
        return this.data.get(id).ItemNum_2;
    }
    /**根据礼包ID获取初始价格 */
    public getInitialPrice(id:number): number {
        return this.data.get(id).InitialPrice;
    }
    /**根据礼包ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftID():number {
        return 1001;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getJsonData(){
        return this.data;
    }

}
