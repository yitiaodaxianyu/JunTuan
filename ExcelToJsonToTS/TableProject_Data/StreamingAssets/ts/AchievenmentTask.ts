export class JsonAchievenmentTask {
    /**成就任务ID */
    public TaskID:number = 0 ;
    /**成就任务类型 */
    public AchievenmentTaskType:number = 0 ;
    /**任务阶段 */
    public AchievenmentTaskPhase:number = 0 ;
    /**成就任务文本 */
    public TaskDescription:number = 0 ;
    /**任务参数1 */
    public TaskParameters:number = 0 ;
    /**奖励道具ID */
    public RewardPropID:number = 0 ;
    /**奖励道具数量 */
    public RewardPropNum:number = 0 ;
}

export class AchievenmentTaskManager {
    private static _instance: AchievenmentTaskManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonAchievenmentTask>=null;
    private is_load_completed:boolean=false;

    public static getInstance():AchievenmentTaskManager {
        if(this._instance==null) {
            this._instance=new AchievenmentTaskManager();
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
        LoadManager.loadJson('AchievenmentTask',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonAchievenmentTask成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonAchievenmentTask();
                jsonData=json[i];
                this.data.set(jsonData.TaskID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonAchievenmentTask(id:number):JsonAchievenmentTask {
        return this.data.get(id);
    }
    /**根据成就任务ID获取成就任务类型 */
    public getAchievenmentTaskType(id:number): number {
        return this.data.get(id).AchievenmentTaskType;
    }
    /**根据成就任务ID获取任务阶段 */
    public getAchievenmentTaskPhase(id:number): number {
        return this.data.get(id).AchievenmentTaskPhase;
    }
    /**根据成就任务ID获取成就任务文本 */
    public getTaskDescription(id:number): number {
        return this.data.get(id).TaskDescription;
    }
    /**根据成就任务ID获取任务参数1 */
    public getTaskParameters(id:number): number {
        return this.data.get(id).TaskParameters;
    }
    /**根据成就任务ID获取奖励道具ID */
    public getRewardPropID(id:number): number {
        return this.data.get(id).RewardPropID;
    }
    /**根据成就任务ID获取奖励道具数量 */
    public getRewardPropNum(id:number): number {
        return this.data.get(id).RewardPropNum;
    }

    /** 静态方法，获取最大的 成就任务ID*/
    public static getMaxTaskID():number {
        return 1400008;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
