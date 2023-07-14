
import { JsonTaskInformation, TaskInformationManager } from "./Data/TaskInformation";
import { JsonThreadTaskInformation, ThreadTaskInformationManager } from "./Data/ThreadTaskInformation";
import { LevelManager } from "../Level/LevelManager";
import TowerManager from "../Tower/TowerManager";
import { TaskItem,TaskState } from "./TaskEnum";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { AchievenmentTaskManager, JsonAchievenmentTask } from "./Data/AchievenmentTask";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { AccumulatedInformationManager } from "./Data/AccumulatedInformation";
import { HttpManager, AccessName } from ".././NetWork/HttpManager";
import { UserInfo } from "../UserInfo/UserInfo";
import UserData from "../UserData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskManager {

    // 日常任务数据
    private daily_task_list:JsonTaskInformation[] = null;
    // 主线任务数据
    private main_task_data:JsonThreadTaskInformation = null;
    // 成就任务数据
    private achievement_task_list:JsonAchievenmentTask[] = null;

    private static _instance: TaskManager = null;
    public static getInstance():TaskManager
    {
        if(this._instance==null)
        {
            this._instance=new TaskManager();
            this._instance.init();
        }
        return this._instance;
    }

    private init()
    {
        // 初始化日常任务
        this.daily_task_list = TaskInformationManager.getInstance().getDailyTaskData();
        // 初始化主线任务
        this.main_task_data = ThreadTaskInformationManager.getInstance().getMainTaskData();
        // 初始化成就任务
        this.achievement_task_list = AchievenmentTaskManager.getInstance().getAchievenmentTaskData();

        this.daily_task_list.forEach((v,k)=>{
            if(v!= null){
                this.checkTask(v.TaskID);
            }
        });
        this.achievement_task_list.forEach((v,k)=>{
            if(v != null){
                this.checkTask(v.TaskID);
            }
        })
    }

    getDailyTaskIsCanGet():boolean{
        // 初始化日常任务
        let list =  this.daily_task_list;
        for(let i=0; i<list.length; i++){
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + list[i].TaskID,0);
            if(num==1){
                return true
            }
        }
        let weekActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskWeekActivityNum, 0);
        let dailyActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityNum, 0);
        // 处理累计积分奖励
        let weekAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        let dailyAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(1);
        let isCan=false;        
        weekAccumulateData.forEach((v, k) => {
            if (isCan==false && weekActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                    isCan=true;
                }
        });
        if(isCan==false){
            dailyAccumulateData.forEach((v, k) => {
                if (isCan==false && dailyActivityNum >= v.AccumulatedPoints
                    && TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                        isCan=true;
                    }
            });
        }
        
        return isCan;
    }

    getMainTaskIsCanGet():boolean{
        // 初始化日常任务
        let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + this.main_task_data.ThreadTaskID,0);
        return num==1;
    }

    getAchievenmentTaskIsCanGet():boolean{
        let list =  this.achievement_task_list;
        for(let i=0; i<list.length; i++){
            if(list[i] == null) continue;
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + list[i].TaskID,0);
            if(num==1){
                return true
            }
        }
        return false
    }

    // 获取日常任务列表
    getDailyTaskList():JsonTaskInformation[]{
        return this.daily_task_list;
    }
    // 获取主线任务列表
    getMainTaskData():JsonThreadTaskInformation{
        return this.main_task_data;
    }
    // 获取成就任务
    getAchievementTaskData(){
        return this.achievement_task_list;
    }

    /**
     * 触发任务目标
     * 这里的事件触发是根据任务枚举进行触发的，
     * 这意味着所有任务即使出现或者未出现都会被触发到。
     * 在日常任务中我做了处理，当天刷的任务会对数据进行清空
     * @param taskItem 任务Id
     */

    emitTask(taskItem:TaskItem){
        if(taskItem< 100000){
            // 日常
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskNum + taskItem,0);
            num++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskNum + taskItem,num);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeDailyTaskInfoEmitJsonString(taskItem,num));
            if(num >= TaskInformationManager.getInstance().getJsonTaskInformation(taskItem).TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + taskItem,0) == 0){
                // 将任务状态设置为可领取
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + taskItem,1);
                HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeDailyTaskInfoStatusJsonString(taskItem,1));
            }
            EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task_Daily);
        }else if(taskItem< 1000000){
            // 成就
            let type = Math.floor(taskItem / 100000);
            // let id = type * 100000 + 1;
            let info = AchievenmentTaskManager.getInstance().getAchievenmentTaskDataByTypeAndIndex(type,TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementIndex + type,0) + 1);
            if(info == null) return;
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,0);
            num++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,num);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeAchievementTaskInfoEmitJsonString(type,num));
            if(num >= info.TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + info.TaskID,0) == 0){
                // 将任务状态设置为可领取
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + info.TaskID,1);
                HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeAchievementTaskInfoStatusJsonString(type,1));
            }
            EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task_Achievenment);
        }else{
            // 主线
            let type = Math.floor(taskItem / 10000000);
            // let id = type * 1000000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1;
            let info = ThreadTaskInformationManager.getInstance().getMainTaskDataByTypeAndIndex(type,TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1);
            if(info == null) return;
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainNum + info.TaskType,0);
            num++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskMainNum + info.TaskType,num);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoEmitJsonString(info.TaskType,num));
            if(num >= info.TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + info.ThreadTaskID,0) == 0){
                // 将任务状态设置为可领取
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + info.ThreadTaskID,1);
                HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoStageJsonString(info.TaskType,1));
            } 
        }
    }
    /**获取到对应任务节点的当前进度 */
    getTaskNowProgress(taskItem:TaskItem):number{
        let nowNum = 0;
        if(taskItem< 100000){
            // 日常
        }else if(taskItem< 1000000){
            // 成就
            let type = Math.floor(taskItem / 100000);
            // let id = type * 100000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementIndex + type,0) + 1;
            // let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(id);
            // if(info == null) return nowNum;
            nowNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + type,0);
        }else{
            // 主线
            let type = Math.floor(taskItem / 10000000);
            // let id = type * 1000000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1;
            // let info = ThreadTaskInformationManager.getInstance().getJsonThreadTaskInformation(id);
            // let info = ThreadTaskInformationManager.getInstance().getMainTaskDataByTypeAndIndex(type,TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1);
            // if(info == null) return nowNum;
            nowNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainNum + type,0);
        }
        return nowNum
    }
    
    overTask(taskItem:TaskItem){
        if(taskItem< 100000){
            // 日常
            TheStorageManager.getInstance().setItem(StorageKey.TaskState + taskItem,2);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeDailyTaskInfoStatusJsonString(taskItem,2));
            let info = TaskInformationManager.getInstance().getJsonTaskInformation(taskItem);
            let num1 = TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityNum,0);
            let num2 = TheStorageManager.getInstance().getNumber(StorageKey.TaskWeekActivityNum,0);
            let num3 = TheStorageManager.getInstance().getNumber(StorageKey.AllActivityNum,0);
            num1 += info.RewardPropNum;
            num2 += info.RewardPropNum;
            num3 += info.RewardPropNum;
            TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityNum,num1);
            TheStorageManager.getInstance().setItem(StorageKey.TaskWeekActivityNum,num2);
            TheStorageManager.getInstance().setItem(StorageKey.AllActivityNum,num3);
            this.emitTask(TaskItem.完成X次每日任务);
            HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(num1,8));
            HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(num2,9));
        }else  if(taskItem< 1000000){
            // 成就
            TheStorageManager.getInstance().setItem(StorageKey.TaskState + taskItem,2);
            let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(taskItem);
            let index = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementIndex + info.AchievenmentTaskType,0);
            index++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskAchievementIndex + info.AchievenmentTaskType,index);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeAchievementTaskInfoStageJsonString(info.AchievenmentTaskType,index))
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeAchievementTaskInfoStatusJsonString(info.AchievenmentTaskType,0));
            // 初始化成就任务
            this.achievement_task_list = AchievenmentTaskManager.getInstance().getAchievenmentTaskData();
            this.emitTask(TaskItem.完成X次成就任务);
        }else{
            // 主线
            TheStorageManager.getInstance().setItem(StorageKey.TaskState + taskItem,2);
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainShowIndex,0);
            num++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskMainShowIndex,num);
            // 刷新任务数据
            let info = ThreadTaskInformationManager.getInstance().getJsonThreadTaskInformation(taskItem);
            let index = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + info.TaskType,0);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoProgressJsonString(num));
            index++;
            TheStorageManager.getInstance().setItem(StorageKey.TaskMainIndex + info.TaskType,index);
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoStageJsonString(info.TaskType,index));
            HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoStatusJsonString(info.TaskType,0));
            // 初始化主线任务
            this.main_task_data = ThreadTaskInformationManager.getInstance().getMainTaskData();
        }
        this.checkTask(taskItem);
    }

    checkTask(taskItem:TaskItem){
        if(taskItem< 100000){
            // 日常
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskNum + taskItem,0);
            if(num >= TaskInformationManager.getInstance().getJsonTaskInformation(taskItem).TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + taskItem,0) == 0){
                // 将任务状态设置为可领取
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + taskItem,1);
                HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeDailyTaskInfoStatusJsonString(taskItem,1));
            }
        }else  if(taskItem<1000000){
            // 成就
            let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(taskItem);
            let nowInfo = AchievenmentTaskManager.getInstance().getNowAchievenmentTaskDataByType(info.AchievenmentTaskType);
            if(nowInfo == null)
                return
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,0);
            if(num >= nowInfo.TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + nowInfo.TaskID,0) == 0){
                // 将任务状态设置为可领取
                TheStorageManager.getInstance().setItem(StorageKey.TaskState + nowInfo.TaskID,1);
                HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeAchievementTaskInfoStatusJsonString(info.AchievenmentTaskType,1));
            }
        }else{
            // 主线
            if(this.main_task_data == null) return;
            let nowNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainNum + this.main_task_data.TaskType,0);
            if(nowNum >= this.main_task_data.TaskParameters
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskState + this.main_task_data.ThreadTaskID,0) == 0){
                    // 将任务状态设置为可领取
                    TheStorageManager.getInstance().setItem(StorageKey.TaskState + this.main_task_data.ThreadTaskID,1);
                    HttpManager.post(AccessName.changeGameAchievementTask,this.getChangeMainTaskInfoStatusJsonString(this.main_task_data.TaskType,1));
            }
        }
    }

    sortDailyTask(){
        // this.daily_task_list.sort((a:JsonTaskInformation,b:JsonTaskInformation):number=>{
        //     // return TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) - TheStorageManager.getInstance().getNumber(StorageKey.TaskState + b.TaskID);
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 1) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 0) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 2) return 1;
        // });
        let finishTask = [];
        let goingTask = [];
        let receiveTask = [];
        this.daily_task_list.forEach((v,k)=>{
            if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID) == 1){
                finishTask.push(v);
            } else if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID) == 2){
                receiveTask.push(v);
            }else{
                goingTask.push(v);
            }
        });
        let temp = [];
        temp = temp.concat(finishTask,goingTask,receiveTask);
        this.daily_task_list = temp;
    }

    sortAchievementTask(){
        // this.daily_task_list.sort((a:JsonTaskInformation,b:JsonTaskInformation):number=>{
        //     // return TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) - TheStorageManager.getInstance().getNumber(StorageKey.TaskState + b.TaskID);
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 1) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 0) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 2) return 1;
        // });
        let finishTask = [];
        let goingTask = [];
        let receiveTask = [];
        let nullTask = [];
        this.achievement_task_list.forEach((v,k)=>{
            if(v == null){
                nullTask.push(v);
                return;
            }
            if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID) == 1){
                finishTask.push(v);
            } else if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID) == 2){
                receiveTask.push(v);
            }else{
                goingTask.push(v);
            }
        });
        let temp = [];
        temp = temp.concat(finishTask,goingTask,receiveTask);
        this.achievement_task_list = temp;
    }

    /**获取修改日常任务触发次数json */
    private getChangeDailyTaskInfoEmitJsonString(taskId: number,emit:number): string {
        let uid = UserData.getInstance().getUserID();
        let time = UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today:time,
            dimension: 1,
            taskId:taskId,
            emit:emit,
        });
    }

    /**获取修改日常任务状态json */
    private getChangeDailyTaskInfoStatusJsonString(taskId: number,status:number): string {
        let uid = UserData.getInstance().getUserID();
        let time = UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today:time,
            dimension: 1,
            taskId:taskId,
            status:status,
        });
    }

    /**获取修改成就任务阶段json */   
    private getChangeAchievementTaskInfoStageJsonString(type: number,stage:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType:type,
            taskId:type*100000+1,
            stage:stage,
        });
    }

    /**获取修改成就任务触发次数json */   
    private getChangeAchievementTaskInfoEmitJsonString(type: number,emit:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType:type,
            taskId:type*100000+1,
            emit:emit,
        });
    }

    /**获取修改成就任务状态json */   
    private getChangeAchievementTaskInfoStatusJsonString(type: number,status:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType:type,
            taskId:type*100000+1,
            status:status,
        });
    }


    /**获取修改主线任务显示顺序json */   
    private getChangeMainTaskInfoProgressJsonString(progress:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            progress:progress,
        });
    }

    /**获取修改主线任务状态json */   
    private getChangeMainTaskInfoStatusJsonString(type: number,status:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType:type,
            taskId:type*10000000+1,
            status:status,
        });
    }

    /**获取修改主线任务阶段json */   
    private getChangeMainTaskInfoStageJsonString(type: number,stage:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType:type,
            taskId:type*10000000+1,
            stage:stage,
        });
    }

    /**获取修改主线任务触发次数json */   
    private getChangeMainTaskInfoEmitJsonString(type: number,emit:number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType:type,
            taskId:type*10000000+1,
            emit:emit,
        });
    }
}