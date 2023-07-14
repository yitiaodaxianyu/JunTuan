"use strict";
cc._RF.push(module, 'dace8ZNkz5PzKmbxNSuCGHE', 'TaskManager');
// Scripts/Task/TaskManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaskInformation_1 = require("./Data/TaskInformation");
var ThreadTaskInformation_1 = require("./Data/ThreadTaskInformation");
var TaskEnum_1 = require("./TaskEnum");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var AchievenmentTask_1 = require("./Data/AchievenmentTask");
var EventManager_1 = require("../Tools/EventManager");
var AccumulatedInformation_1 = require("./Data/AccumulatedInformation");
var HttpManager_1 = require(".././NetWork/HttpManager");
var UserInfo_1 = require("../UserInfo/UserInfo");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        // 日常任务数据
        this.daily_task_list = null;
        // 主线任务数据
        this.main_task_data = null;
        // 成就任务数据
        this.achievement_task_list = null;
    }
    TaskManager_1 = TaskManager;
    TaskManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TaskManager_1();
            this._instance.init();
        }
        return this._instance;
    };
    TaskManager.prototype.init = function () {
        var _this = this;
        // 初始化日常任务
        this.daily_task_list = TaskInformation_1.TaskInformationManager.getInstance().getDailyTaskData();
        // 初始化主线任务
        this.main_task_data = ThreadTaskInformation_1.ThreadTaskInformationManager.getInstance().getMainTaskData();
        // 初始化成就任务
        this.achievement_task_list = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getAchievenmentTaskData();
        this.daily_task_list.forEach(function (v, k) {
            if (v != null) {
                _this.checkTask(v.TaskID);
            }
        });
        this.achievement_task_list.forEach(function (v, k) {
            if (v != null) {
                _this.checkTask(v.TaskID);
            }
        });
    };
    TaskManager.prototype.getDailyTaskIsCanGet = function () {
        // 初始化日常任务
        var list = this.daily_task_list;
        for (var i = 0; i < list.length; i++) {
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + list[i].TaskID, 0);
            if (num == 1) {
                return true;
            }
        }
        var weekActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeekActivityNum, 0);
        var dailyActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityNum, 0);
        // 处理累计积分奖励
        var weekAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        var dailyAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(1);
        var isCan = false;
        weekAccumulateData.forEach(function (v, k) {
            if (isCan == false && weekActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                isCan = true;
            }
        });
        if (isCan == false) {
            dailyAccumulateData.forEach(function (v, k) {
                if (isCan == false && dailyActivityNum >= v.AccumulatedPoints
                    && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                    isCan = true;
                }
            });
        }
        return isCan;
    };
    TaskManager.prototype.getMainTaskIsCanGet = function () {
        // 初始化日常任务
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + this.main_task_data.ThreadTaskID, 0);
        return num == 1;
    };
    TaskManager.prototype.getAchievenmentTaskIsCanGet = function () {
        var list = this.achievement_task_list;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == null)
                continue;
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + list[i].TaskID, 0);
            if (num == 1) {
                return true;
            }
        }
        return false;
    };
    // 获取日常任务列表
    TaskManager.prototype.getDailyTaskList = function () {
        return this.daily_task_list;
    };
    // 获取主线任务列表
    TaskManager.prototype.getMainTaskData = function () {
        return this.main_task_data;
    };
    // 获取成就任务
    TaskManager.prototype.getAchievementTaskData = function () {
        return this.achievement_task_list;
    };
    /**
     * 触发任务目标
     * 这里的事件触发是根据任务枚举进行触发的，
     * 这意味着所有任务即使出现或者未出现都会被触发到。
     * 在日常任务中我做了处理，当天刷的任务会对数据进行清空
     * @param taskItem 任务Id
     */
    TaskManager.prototype.emitTask = function (taskItem) {
        if (taskItem < 100000) {
            // 日常
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskNum + taskItem, 0);
            num++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskNum + taskItem, num);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeDailyTaskInfoEmitJsonString(taskItem, num));
            if (num >= TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(taskItem).TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + taskItem, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + taskItem, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeDailyTaskInfoStatusJsonString(taskItem, 1));
            }
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task_Daily);
        }
        else if (taskItem < 1000000) {
            // 成就
            var type = Math.floor(taskItem / 100000);
            // let id = type * 100000 + 1;
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getAchievenmentTaskDataByTypeAndIndex(type, StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1);
            if (info == null)
                return;
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, 0);
            num++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, num);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeAchievementTaskInfoEmitJsonString(type, num));
            if (num >= info.TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + info.TaskID, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + info.TaskID, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeAchievementTaskInfoStatusJsonString(type, 1));
            }
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task_Achievenment);
        }
        else {
            // 主线
            var type = Math.floor(taskItem / 10000000);
            // let id = type * 1000000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1;
            var info = ThreadTaskInformation_1.ThreadTaskInformationManager.getInstance().getMainTaskDataByTypeAndIndex(type, StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainIndex + type, 0) + 1);
            if (info == null)
                return;
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainNum + info.TaskType, 0);
            num++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainNum + info.TaskType, num);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoEmitJsonString(info.TaskType, num));
            if (num >= info.TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + info.ThreadTaskID, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + info.ThreadTaskID, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoStageJsonString(info.TaskType, 1));
            }
        }
    };
    /**获取到对应任务节点的当前进度 */
    TaskManager.prototype.getTaskNowProgress = function (taskItem) {
        var nowNum = 0;
        if (taskItem < 100000) {
            // 日常
        }
        else if (taskItem < 1000000) {
            // 成就
            var type = Math.floor(taskItem / 100000);
            // let id = type * 100000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementIndex + type,0) + 1;
            // let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(id);
            // if(info == null) return nowNum;
            nowNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + type, 0);
        }
        else {
            // 主线
            var type = Math.floor(taskItem / 10000000);
            // let id = type * 1000000 + TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1;
            // let info = ThreadTaskInformationManager.getInstance().getJsonThreadTaskInformation(id);
            // let info = ThreadTaskInformationManager.getInstance().getMainTaskDataByTypeAndIndex(type,TheStorageManager.getInstance().getNumber(StorageKey.TaskMainIndex + type,0) + 1);
            // if(info == null) return nowNum;
            nowNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainNum + type, 0);
        }
        return nowNum;
    };
    TaskManager.prototype.overTask = function (taskItem) {
        if (taskItem < 100000) {
            // 日常
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + taskItem, 2);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeDailyTaskInfoStatusJsonString(taskItem, 2));
            var info = TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(taskItem);
            var num1 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityNum, 0);
            var num2 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeekActivityNum, 0);
            var num3 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.AllActivityNum, 0);
            num1 += info.RewardPropNum;
            num2 += info.RewardPropNum;
            num3 += info.RewardPropNum;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityNum, num1);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeekActivityNum, num2);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.AllActivityNum, num3);
            this.emitTask(TaskEnum_1.TaskItem.完成X次每日任务);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(num1, 8));
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(num2, 9));
        }
        else if (taskItem < 1000000) {
            // 成就
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + taskItem, 2);
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(taskItem);
            var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + info.AchievenmentTaskType, 0);
            index++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskAchievementIndex + info.AchievenmentTaskType, index);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeAchievementTaskInfoStageJsonString(info.AchievenmentTaskType, index));
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeAchievementTaskInfoStatusJsonString(info.AchievenmentTaskType, 0));
            // 初始化成就任务
            this.achievement_task_list = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getAchievenmentTaskData();
            this.emitTask(TaskEnum_1.TaskItem.完成X次成就任务);
        }
        else {
            // 主线
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + taskItem, 2);
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainShowIndex, 0);
            num++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainShowIndex, num);
            // 刷新任务数据
            var info = ThreadTaskInformation_1.ThreadTaskInformationManager.getInstance().getJsonThreadTaskInformation(taskItem);
            var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainIndex + info.TaskType, 0);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoProgressJsonString(num));
            index++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainIndex + info.TaskType, index);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoStageJsonString(info.TaskType, index));
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoStatusJsonString(info.TaskType, 0));
            // 初始化主线任务
            this.main_task_data = ThreadTaskInformation_1.ThreadTaskInformationManager.getInstance().getMainTaskData();
        }
        this.checkTask(taskItem);
    };
    TaskManager.prototype.checkTask = function (taskItem) {
        if (taskItem < 100000) {
            // 日常
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskNum + taskItem, 0);
            if (num >= TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(taskItem).TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + taskItem, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + taskItem, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeDailyTaskInfoStatusJsonString(taskItem, 1));
            }
        }
        else if (taskItem < 1000000) {
            // 成就
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(taskItem);
            var nowInfo = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getNowAchievenmentTaskDataByType(info.AchievenmentTaskType);
            if (nowInfo == null)
                return;
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, 0);
            if (num >= nowInfo.TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + nowInfo.TaskID, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + nowInfo.TaskID, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeAchievementTaskInfoStatusJsonString(info.AchievenmentTaskType, 1));
            }
        }
        else {
            // 主线
            if (this.main_task_data == null)
                return;
            var nowNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainNum + this.main_task_data.TaskType, 0);
            if (nowNum >= this.main_task_data.TaskParameters
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + this.main_task_data.ThreadTaskID, 0) == 0) {
                // 将任务状态设置为可领取
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + this.main_task_data.ThreadTaskID, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.changeGameAchievementTask, this.getChangeMainTaskInfoStatusJsonString(this.main_task_data.TaskType, 1));
            }
        }
    };
    TaskManager.prototype.sortDailyTask = function () {
        // this.daily_task_list.sort((a:JsonTaskInformation,b:JsonTaskInformation):number=>{
        //     // return TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) - TheStorageManager.getInstance().getNumber(StorageKey.TaskState + b.TaskID);
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 1) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 0) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 2) return 1;
        // });
        var finishTask = [];
        var goingTask = [];
        var receiveTask = [];
        this.daily_task_list.forEach(function (v, k) {
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID) == 1) {
                finishTask.push(v);
            }
            else if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID) == 2) {
                receiveTask.push(v);
            }
            else {
                goingTask.push(v);
            }
        });
        var temp = [];
        temp = temp.concat(finishTask, goingTask, receiveTask);
        this.daily_task_list = temp;
    };
    TaskManager.prototype.sortAchievementTask = function () {
        // this.daily_task_list.sort((a:JsonTaskInformation,b:JsonTaskInformation):number=>{
        //     // return TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) - TheStorageManager.getInstance().getNumber(StorageKey.TaskState + b.TaskID);
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 1) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 0) return -1;
        //     if(TheStorageManager.getInstance().getNumber(StorageKey.TaskState + a.TaskID) == 2) return 1;
        // });
        var finishTask = [];
        var goingTask = [];
        var receiveTask = [];
        var nullTask = [];
        this.achievement_task_list.forEach(function (v, k) {
            if (v == null) {
                nullTask.push(v);
                return;
            }
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID) == 1) {
                finishTask.push(v);
            }
            else if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID) == 2) {
                receiveTask.push(v);
            }
            else {
                goingTask.push(v);
            }
        });
        var temp = [];
        temp = temp.concat(finishTask, goingTask, receiveTask);
        this.achievement_task_list = temp;
    };
    /**获取修改日常任务触发次数json */
    TaskManager.prototype.getChangeDailyTaskInfoEmitJsonString = function (taskId, emit) {
        var uid = UserData_1.default.getInstance().getUserID();
        var time = UserInfo_1.UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today: time,
            dimension: 1,
            taskId: taskId,
            emit: emit,
        });
    };
    /**获取修改日常任务状态json */
    TaskManager.prototype.getChangeDailyTaskInfoStatusJsonString = function (taskId, status) {
        var uid = UserData_1.default.getInstance().getUserID();
        var time = UserInfo_1.UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today: time,
            dimension: 1,
            taskId: taskId,
            status: status,
        });
    };
    /**获取修改成就任务阶段json */
    TaskManager.prototype.getChangeAchievementTaskInfoStageJsonString = function (type, stage) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType: type,
            taskId: type * 100000 + 1,
            stage: stage,
        });
    };
    /**获取修改成就任务触发次数json */
    TaskManager.prototype.getChangeAchievementTaskInfoEmitJsonString = function (type, emit) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType: type,
            taskId: type * 100000 + 1,
            emit: emit,
        });
    };
    /**获取修改成就任务状态json */
    TaskManager.prototype.getChangeAchievementTaskInfoStatusJsonString = function (type, status) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 2,
            taskType: type,
            taskId: type * 100000 + 1,
            status: status,
        });
    };
    /**获取修改主线任务显示顺序json */
    TaskManager.prototype.getChangeMainTaskInfoProgressJsonString = function (progress) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            progress: progress,
        });
    };
    /**获取修改主线任务状态json */
    TaskManager.prototype.getChangeMainTaskInfoStatusJsonString = function (type, status) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType: type,
            taskId: type * 10000000 + 1,
            status: status,
        });
    };
    /**获取修改主线任务阶段json */
    TaskManager.prototype.getChangeMainTaskInfoStageJsonString = function (type, stage) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType: type,
            taskId: type * 10000000 + 1,
            stage: stage,
        });
    };
    /**获取修改主线任务触发次数json */
    TaskManager.prototype.getChangeMainTaskInfoEmitJsonString = function (type, emit) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: 3,
            taskType: type,
            taskId: type * 10000000 + 1,
            emit: emit,
        });
    };
    var TaskManager_1;
    TaskManager._instance = null;
    TaskManager = TaskManager_1 = __decorate([
        ccclass
    ], TaskManager);
    return TaskManager;
}());
exports.default = TaskManager;

cc._RF.pop();