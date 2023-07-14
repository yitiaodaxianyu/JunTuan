import { LoadManager } from "../Loading/LoadManager";


export class JsonCustomsClearanceRebate {
    /**奖励ID */
    public RewardID:number = 0 ;
    /**获得钻石 */
    public GetGem:number = 0 ;
    /**通关章节 */
    public CompleteChapter:number = 0 ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class CustomsClearanceRebateManager {
    private static _instance: CustomsClearanceRebateManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCustomsClearanceRebate>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CustomsClearanceRebateManager {
        if(this._instance==null) {
            this._instance=new CustomsClearanceRebateManager();
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
        LoadManager.loadJson('CustomsClearanceRebate',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCustomsClearanceRebate成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCustomsClearanceRebate();
                jsonData=json[i];
                this.data.set(jsonData.RewardID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCustomsClearanceRebate(id:number):JsonCustomsClearanceRebate {
        return this.data.get(id);
    }
    /**根据奖励ID获取获得钻石 */
    public getGetGem(id:number): number {
        return this.data.get(id).GetGem;
    }
    /**根据奖励ID获取通关章节 */
    public getCompleteChapter(id:number): number {
        return this.data.get(id).CompleteChapter;
    }
    /**根据奖励ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 奖励ID*/
    public static getMaxRewardID():number {
        return 10;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
