export class JsonTaskInformation {
    /**任务ID */
    public TaskID:number = 0 ;
    /**任务类型 */
    public TaskType:number = 0 ;
    /**解锁关卡 */
    public Unlocklevel:number = 0 ;
    /**任务描述文本 */
    public TaskDescription:number = 0 ;
    /**任务参数 */
    public TaskParameters:number = 0 ;
    /**奖励道具ID */
    public RewardPropID:number = 0 ;
    /**奖励积分 */
    public RewardPropNum:number = 0 ;
    /**权重 */
    public weights:number = 0 ;
}

export class TaskInformationManager {
    private static _instance: TaskInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTaskInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TaskInformationManager {
        if(this._instance==null) {
            this._instance=new TaskInformationManager();
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
        LoadManager.loadJson('TaskInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTaskInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTaskInformation();
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
    public getJsonTaskInformation(id:number):JsonTaskInformation {
        return this.data.get(id);
    }
    /**根据任务ID获取任务类型 */
    public getTaskType(id:number): number {
        return this.data.get(id).TaskType;
    }
    /**根据任务ID获取解锁关卡 */
    public getUnlocklevel(id:number): number {
        return this.data.get(id).Unlocklevel;
    }
    /**根据任务ID获取任务描述文本 */
    public getTaskDescription(id:number): number {
        return this.data.get(id).TaskDescription;
    }
    /**根据任务ID获取任务参数 */
    public getTaskParameters(id:number): number {
        return this.data.get(id).TaskParameters;
    }
    /**根据任务ID获取奖励道具ID */
    public getRewardPropID(id:number): number {
        return this.data.get(id).RewardPropID;
    }
    /**根据任务ID获取奖励积分 */
    public getRewardPropNum(id:number): number {
        return this.data.get(id).RewardPropNum;
    }
    /**根据任务ID获取权重 */
    public getweights(id:number): number {
        return this.data.get(id).weights;
    }

    /** 静态方法，获取最大的 任务ID*/
    public static getMaxTaskID():number {
        return 45001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
