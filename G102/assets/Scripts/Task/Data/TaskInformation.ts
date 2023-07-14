import { AccessName, HttpManager } from "../.././NetWork/HttpManager";
import { LevelManager } from "../../Level/LevelManager";
import { LoadManager } from "../../Loading/LoadManager";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import MyTool from "../../Tools/MyTool";
import UserData from "../../UserData";
import { UserInfo } from "../../UserInfo/UserInfo";

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
        return 44004;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    // 根据通过关卡拿到对应的每日任务列表
    getUnlockJsonData():JsonTaskInformation[]{
        let info = [];
        let nowLevel = LevelManager.getInstance().finish_level;
        this.data.forEach((v,k)=>{
            if(v.Unlocklevel <= nowLevel){
                info.push(v);
            }
        });
        return info;
    }

    // 获取当日的任务列表
    getDailyTaskData():JsonTaskInformation[]{
        let info = [];
        // if(TheStorageManager.getInstance().getNumber(StorageKey.TaskId + 0,0) == 0){
        if(UserInfo.getInstance().dailyTaskList.length == 0){
            let weight:number[] = [];
            let dataList = this.getUnlockJsonData();
            for(let i = 0;i<dataList.length;i++){
                weight.push(dataList[i].weights);
            }
            let result = MyTool.getWeightIndexs(weight,12);
            for(let i = 0;i<result.length;i++){
                info.push(dataList[result[i]]);
                // 重置每日任务id
                TheStorageManager.getInstance().setItem(StorageKey.TaskId + i,dataList[result[i]].TaskID);
                // 重置每日任务状态
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + dataList[result[i]].TaskID,0);
                // 重置每日任务数据
                TheStorageManager.getInstance().setItem(StorageKey.TaskNum + dataList[result[i]].TaskID,0);
                // 上报新增的每日任务信息
                this.reportDailyTask(dataList[result[i]].TaskID);
            }
        }else{
            for(let i = 0;i<12;i++){
                info.push(this.getJsonTaskInformation(TheStorageManager.getInstance().getNumber(StorageKey.TaskId + i)));
            }
        }
        return info;
    }

    reportDailyTask(id:number){
        HttpManager.post(AccessName.saveGameAchievementTask,this.getTaskInfoJsonString(id));
    }
    // 获取每日任务的上报json数据
    private getTaskInfoJsonString(id:number):string{
        let uid=UserData.getInstance().getUserID();
        let time = UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid:uid,
            today:time,
            dimension:1,
            taskId:id,
            status:0,
            emit:0,
        });
    }

}
