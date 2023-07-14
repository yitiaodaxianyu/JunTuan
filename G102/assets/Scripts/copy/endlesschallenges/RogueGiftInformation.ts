import { LoadManager } from "../../Loading/LoadManager";

export class JsonRogueGiftInformation {
    /**章节ID */
    public ChapterLevel:number = 0 ;
    /**奖励1显示ID */
    public PropID_1:number = 0 ;
    /**奖励2显示ID */
    public PropID_2:number = 0 ;
    /**奖励3显示ID */
    public PropID_3:number = 0 ;
}

export class RogueGiftInformationManager {
    private static _instance: RogueGiftInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueGiftInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueGiftInformationManager {
        if(this._instance==null) {
            this._instance=new RogueGiftInformationManager();
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
        LoadManager.loadJson('RogueGiftInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueGiftInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueGiftInformation();
                jsonData=json[i];
                this.data.set(jsonData.ChapterLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueGiftInformation(id:number):JsonRogueGiftInformation {
        return this.data.get(id);
    }
    /**根据章节ID获取奖励1显示ID */
    public getPropID_1(id:number): number {
        return this.data.get(id).PropID_1;
    }
    /**根据章节ID获取奖励2显示ID */
    public getPropID_2(id:number): number {
        return this.data.get(id).PropID_2;
    }
    /**根据章节ID获取奖励3显示ID */
    public getPropID_3(id:number): number {
        return this.data.get(id).PropID_3;
    }

    /** 静态方法，获取最大的 章节ID*/
    public static getMaxChapterLevel():number {
        return 8;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
