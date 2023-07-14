import { LoadManager } from "../Loading/LoadManager";

export class JsonOfflineRevenueShow {
    /**通关章节 */
    public Chapter:number = 0 ;
    /**解锁道具 */
    public UnlockProps:number[] = [] ;
    /**每分钟金币 */
    public GetCoins:number = 0 ;
    /**本章文本 */
    public ChapterIntroduction:number = 0 ;
    /**标题文本ID */
    public Titletext:number = 0 ;
}

export class OfflineRevenueShowManager {
    private static _instance: OfflineRevenueShowManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonOfflineRevenueShow>=null;
    private is_load_completed:boolean=false;

    public static getInstance():OfflineRevenueShowManager {
        if(this._instance==null) {
            this._instance=new OfflineRevenueShowManager();
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
        LoadManager.loadJson('OfflineRevenueShow',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenueShow成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonOfflineRevenueShow();
                jsonData=json[i];
                this.data.set(jsonData.Chapter,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonOfflineRevenueShow(id:number):JsonOfflineRevenueShow {
        return this.data.get(id);
    }
    /**根据通关章节获取解锁道具 */
    public getUnlockProps(id:number): number[] {
        return this.data.get(id).UnlockProps;
    }
    /**根据通关章节获取每分钟金币 */
    public getGetCoins(id:number): number {
        return this.data.get(id).GetCoins;
    }
    /**根据通关章节获取本章文本 */
    public getChapterIntroduction(id:number): number {
        return this.data.get(id).ChapterIntroduction;
    }
    /**根据通关章节获取标题文本ID */
    public getTitletext(id:number): number {
        return this.data.get(id).Titletext;
    }

    /** 静态方法，获取最大的 通关章节*/
    public static getMaxChapter():number {
        return 10;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
