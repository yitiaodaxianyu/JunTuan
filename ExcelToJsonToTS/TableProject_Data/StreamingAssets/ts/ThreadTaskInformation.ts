export class JsonThreadTaskInformation {
    /**主线任务ID */
    public ThreadTaskID:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**主线任务文本 */
    public ThreadTaskDescription:number = 0 ;
    /**道具1ID */
    public PropID_1:number = 0 ;
    /**道具1数量 */
    public PropNum_1:number = 0 ;
    /**道具2ID */
    public PropID_2:number = 0 ;
    /**道具2数量 */
    public PropNum_2:number = 0 ;
    /**任务类型 */
    public TaskType:number = 0 ;
    /**任务阶段 */
    public TaskPhase:number = 0 ;
    /**任务参数 */
    public TaskParameters:number = 0 ;
}

export class ThreadTaskInformationManager {
    private static _instance: ThreadTaskInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonThreadTaskInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ThreadTaskInformationManager {
        if(this._instance==null) {
            this._instance=new ThreadTaskInformationManager();
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
        LoadManager.loadJson('ThreadTaskInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonThreadTaskInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonThreadTaskInformation();
                jsonData=json[i];
                this.data.set(jsonData.ThreadTaskID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonThreadTaskInformation(id:number):JsonThreadTaskInformation {
        return this.data.get(id);
    }
    /**根据主线任务ID获取显示顺序 */
    public getDisplayOrder(id:number): number {
        return this.data.get(id).DisplayOrder;
    }
    /**根据主线任务ID获取主线任务文本 */
    public getThreadTaskDescription(id:number): number {
        return this.data.get(id).ThreadTaskDescription;
    }
    /**根据主线任务ID获取道具1ID */
    public getPropID_1(id:number): number {
        return this.data.get(id).PropID_1;
    }
    /**根据主线任务ID获取道具1数量 */
    public getPropNum_1(id:number): number {
        return this.data.get(id).PropNum_1;
    }
    /**根据主线任务ID获取道具2ID */
    public getPropID_2(id:number): number {
        return this.data.get(id).PropID_2;
    }
    /**根据主线任务ID获取道具2数量 */
    public getPropNum_2(id:number): number {
        return this.data.get(id).PropNum_2;
    }
    /**根据主线任务ID获取任务类型 */
    public getTaskType(id:number): number {
        return this.data.get(id).TaskType;
    }
    /**根据主线任务ID获取任务阶段 */
    public getTaskPhase(id:number): number {
        return this.data.get(id).TaskPhase;
    }
    /**根据主线任务ID获取任务参数 */
    public getTaskParameters(id:number): number {
        return this.data.get(id).TaskParameters;
    }

    /** 静态方法，获取最大的 主线任务ID*/
    public static getMaxThreadTaskID():number {
        return 180000001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
