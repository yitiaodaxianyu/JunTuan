import { LoadManager } from "../../Loading/LoadManager";

export class JsonAccumulatedInformation {
    /**累计积分奖励ID */
    public AccumulatedPointsID:number = 0 ;
    /**任务类型 */
    public TaskType:number = 0 ;
    /**累计积分 */
    public AccumulatedPoints:number = 0 ;
    /**道具1ID */
    public PropID_1:number = 0 ;
    /**道具1数量 */
    public PropNum_1:number = 0 ;
}

export class AccumulatedInformationManager {
    private static _instance: AccumulatedInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonAccumulatedInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():AccumulatedInformationManager {
        if(this._instance==null) {
            this._instance=new AccumulatedInformationManager();
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
        LoadManager.loadJson('AccumulatedInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonAccumulatedInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonAccumulatedInformation();
                jsonData=json[i];
                this.data.set(jsonData.AccumulatedPointsID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonAccumulatedInformation(id:number):JsonAccumulatedInformation {
        return this.data.get(id);
    }
    /**根据累计积分奖励ID获取任务类型 */
    public getTaskType(id:number): number {
        return this.data.get(id).TaskType;
    }
    /**根据累计积分奖励ID获取累计积分 */
    public getAccumulatedPoints(id:number): number {
        return this.data.get(id).AccumulatedPoints;
    }
    /**根据累计积分奖励ID获取道具1ID */
    public getPropID_1(id:number): number {
        return this.data.get(id).PropID_1;
    }
    /**根据累计积分奖励ID获取道具1数量 */
    public getPropNum_1(id:number): number {
        return this.data.get(id).PropNum_1;
    }

    /** 静态方法，获取最大的 累计积分奖励ID*/
    public static getMaxAccumulatedPointsID():number {
        return 250010;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getRewardByTaskType(type:number):JsonAccumulatedInformation[]{
        let info = [];
        this.data.forEach((v,k)=>{
            if(v.TaskType == type){
                info.push(v);
            }
        });
        return info;
    }

}
