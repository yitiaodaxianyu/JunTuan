export class JsonDailyTask {
    /**任务ID */
    public Task_ID:number = 0 ;
    /**任务描述文本 */
    public Description_TextID:number = 0 ;
    /**任务类型 */
    public Type:number = 0 ;
    /**任务目标数量 */
    public Target_Num:number[] = [] ;
    /**奖励ID */
    public Reward_ID:number[] = [] ;
    /**奖励数量 */
    public Reward_Num:number[] = [] ;
}

export class DailyTaskManager {
    private static _instance: DailyTaskManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDailyTask>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DailyTaskManager {
        if(this._instance==null) {
            this._instance=new DailyTaskManager();
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
        LoadManager.loadJson('DailyTask',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDailyTask成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDailyTask();
                jsonData=json[i];
                this.data.set(jsonData.Task_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDailyTask(id:number):JsonDailyTask {
        return this.data.get(id);
    }
    /**根据任务ID获取任务描述文本 */
    public getDescription_TextID(id:number): number {
        return this.data.get(id).Description_TextID;
    }
    /**根据任务ID获取任务类型 */
    public getType(id:number): number {
        return this.data.get(id).Type;
    }
    /**根据任务ID获取任务目标数量 */
    public getTarget_Num(id:number): number[] {
        return this.data.get(id).Target_Num;
    }
    /**根据任务ID获取奖励ID */
    public getReward_ID(id:number): number[] {
        return this.data.get(id).Reward_ID;
    }
    /**根据任务ID获取奖励数量 */
    public getReward_Num(id:number): number[] {
        return this.data.get(id).Reward_Num;
    }

    /** 静态方法，获取最大的 任务ID*/
    public static getMaxTask_ID():number {
        return 10103;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
