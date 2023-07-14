
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/TaskManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcVGFza01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwREFBcUY7QUFDckYsc0VBQXVHO0FBR3ZHLHVDQUFnRDtBQUNoRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDREQUF3RjtBQUN4RixzREFBbUY7QUFDbkYsd0VBQThFO0FBQzlFLHdEQUFtRTtBQUNuRSxpREFBZ0Q7QUFDaEQsd0NBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7UUFFSSxTQUFTO1FBQ0Qsb0JBQWUsR0FBeUIsSUFBSSxDQUFDO1FBQ3JELFNBQVM7UUFDRCxtQkFBYyxHQUE2QixJQUFJLENBQUM7UUFDeEQsU0FBUztRQUNELDBCQUFxQixHQUEwQixJQUFJLENBQUM7SUEwYWhFLENBQUM7b0JBamJvQixXQUFXO0lBVWQsdUJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxhQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTywwQkFBSSxHQUFaO1FBQUEsaUJBbUJDO1FBakJHLFVBQVU7UUFDVixJQUFJLENBQUMsZUFBZSxHQUFHLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0UsVUFBVTtRQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsb0RBQTRCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkYsVUFBVTtRQUNWLElBQUksQ0FBQyxxQkFBcUIsR0FBRywwQ0FBdUIsQ0FBQyxX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SSxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFFLEdBQUc7WUFDUixTQUFTLEVBQUUsQ0FBQztZQUNaLFFBQVEsRUFBQyxJQUFJO1lBQ2IsTUFBTSxFQUFDLElBQUksR0FBQyxRQUFRLEdBQUMsQ0FBQztZQUN0QixJQUFJLEVBQUMsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBdmFjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQVQ1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBaWIvQjtJQUFELGtCQUFDO0NBamJELEFBaWJDLElBQUE7a0JBamJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEpzb25UYXNrSW5mb3JtYXRpb24sIFRhc2tJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1Rhc2tJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBKc29uVGhyZWFkVGFza0luZm9ybWF0aW9uLCBUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9UaHJlYWRUYXNrSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0sVGFza1N0YXRlIH0gZnJvbSBcIi4vVGFza0VudW1cIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlciwgSnNvbkFjaGlldmVubWVudFRhc2sgfSBmcm9tIFwiLi9EYXRhL0FjaGlldmVubWVudFRhc2tcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvQWNjdW11bGF0ZWRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrTWFuYWdlciB7XHJcblxyXG4gICAgLy8g5pel5bi45Lu75Yqh5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhaWx5X3Rhc2tfbGlzdDpKc29uVGFza0luZm9ybWF0aW9uW10gPSBudWxsO1xyXG4gICAgLy8g5Li757q/5Lu75Yqh5pWw5o2uXHJcbiAgICBwcml2YXRlIG1haW5fdGFza19kYXRhOkpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb24gPSBudWxsO1xyXG4gICAgLy8g5oiQ5bCx5Lu75Yqh5pWw5o2uXHJcbiAgICBwcml2YXRlIGFjaGlldmVtZW50X3Rhc2tfbGlzdDpKc29uQWNoaWV2ZW5tZW50VGFza1tdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRhc2tNYW5hZ2VyID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUYXNrTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFRhc2tNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5pel5bi45Lu75YqhXHJcbiAgICAgICAgdGhpcy5kYWlseV90YXNrX2xpc3QgPSBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGFpbHlUYXNrRGF0YSgpO1xyXG4gICAgICAgIC8vIOWIneWni+WMluS4u+e6v+S7u+WKoVxyXG4gICAgICAgIHRoaXMubWFpbl90YXNrX2RhdGEgPSBUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpblRhc2tEYXRhKCk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5oiQ5bCx5Lu75YqhXHJcbiAgICAgICAgdGhpcy5hY2hpZXZlbWVudF90YXNrX2xpc3QgPSBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFjaGlldmVubWVudFRhc2tEYXRhKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGFpbHlfdGFza19saXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodiE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1Rhc2sodi5UYXNrSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hY2hpZXZlbWVudF90YXNrX2xpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1Rhc2sodi5UYXNrSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXREYWlseVRhc2tJc0NhbkdldCgpOmJvb2xlYW57XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5pel5bi45Lu75YqhXHJcbiAgICAgICAgbGV0IGxpc3QgPSAgdGhpcy5kYWlseV90YXNrX2xpc3Q7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGxpc3RbaV0uVGFza0lELDApO1xyXG4gICAgICAgICAgICBpZihudW09PTEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2Vla0FjdGl2aXR5TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla0FjdGl2aXR5TnVtLCAwKTtcclxuICAgICAgICBsZXQgZGFpbHlBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlOdW0sIDApO1xyXG4gICAgICAgIC8vIOWkhOeQhue0r+iuoeenr+WIhuWlluWKsVxyXG4gICAgICAgIGxldCB3ZWVrQWNjdW11bGF0ZURhdGEgPSBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5VGFza1R5cGUoMik7XHJcbiAgICAgICAgbGV0IGRhaWx5QWNjdW11bGF0ZURhdGEgPSBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5VGFza1R5cGUoMSk7XHJcbiAgICAgICAgbGV0IGlzQ2FuPWZhbHNlOyAgICAgICAgXHJcbiAgICAgICAgd2Vla0FjY3VtdWxhdGVEYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzQ2FuPT1mYWxzZSAmJiB3ZWVrQWN0aXZpdHlOdW0gPj0gdi5BY2N1bXVsYXRlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Nhbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGlzQ2FuPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGRhaWx5QWNjdW11bGF0ZURhdGEuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2FuPT1mYWxzZSAmJiBkYWlseUFjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5U3RhdGUgKyB2LkFjY3VtdWxhdGVkUG9pbnRzLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGlzQ2FuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1haW5UYXNrSXNDYW5HZXQoKTpib29sZWFue1xyXG4gICAgICAgIC8vIOWIneWni+WMluaXpeW4uOS7u+WKoVxyXG4gICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHRoaXMubWFpbl90YXNrX2RhdGEuVGhyZWFkVGFza0lELDApO1xyXG4gICAgICAgIHJldHVybiBudW09PTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWNoaWV2ZW5tZW50VGFza0lzQ2FuR2V0KCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgbGlzdCA9ICB0aGlzLmFjaGlldmVtZW50X3Rhc2tfbGlzdDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYobGlzdFtpXSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgbGlzdFtpXS5UYXNrSUQsMCk7XHJcbiAgICAgICAgICAgIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluaXpeW4uOS7u+WKoeWIl+ihqFxyXG4gICAgZ2V0RGFpbHlUYXNrTGlzdCgpOkpzb25UYXNrSW5mb3JtYXRpb25bXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYWlseV90YXNrX2xpc3Q7XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5bkuLvnur/ku7vliqHliJfooahcclxuICAgIGdldE1haW5UYXNrRGF0YSgpOkpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbl90YXNrX2RhdGE7XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5bmiJDlsLHku7vliqFcclxuICAgIGdldEFjaGlldmVtZW50VGFza0RhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY2hpZXZlbWVudF90YXNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6blj5Hku7vliqHnm67moIdcclxuICAgICAqIOi/memHjOeahOS6i+S7tuinpuWPkeaYr+agueaNruS7u+WKoeaemuS4vui/m+ihjOinpuWPkeeahO+8jFxyXG4gICAgICog6L+Z5oSP5ZGz552A5omA5pyJ5Lu75Yqh5Y2z5L2/5Ye6546w5oiW6ICF5pyq5Ye6546w6YO95Lya6KKr6Kem5Y+R5Yiw44CCXHJcbiAgICAgKiDlnKjml6XluLjku7vliqHkuK3miJHlgZrkuoblpITnkIbvvIzlvZPlpKnliLfnmoTku7vliqHkvJrlr7nmlbDmja7ov5vooYzmuIXnqbpcclxuICAgICAqIEBwYXJhbSB0YXNrSXRlbSDku7vliqFJZFxyXG4gICAgICovXHJcblxyXG4gICAgZW1pdFRhc2sodGFza0l0ZW06VGFza0l0ZW0pe1xyXG4gICAgICAgIGlmKHRhc2tJdGVtPCAxMDAwMDApe1xyXG4gICAgICAgICAgICAvLyDml6XluLhcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza051bSArIHRhc2tJdGVtLDApO1xyXG4gICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza051bSArIHRhc2tJdGVtLG51bSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlRGFpbHlUYXNrSW5mb0VtaXRKc29uU3RyaW5nKHRhc2tJdGVtLG51bSkpO1xyXG4gICAgICAgICAgICBpZihudW0gPj0gVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UYXNrSW5mb3JtYXRpb24odGFza0l0ZW0pLlRhc2tQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHRhc2tJdGVtLDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8g5bCG5Lu75Yqh54q25oCB6K6+572u5Li65Y+v6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB0YXNrSXRlbSwxKTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlRGFpbHlUYXNrSW5mb1N0YXR1c0pzb25TdHJpbmcodGFza0l0ZW0sMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFza19EYWlseSk7XHJcbiAgICAgICAgfWVsc2UgaWYodGFza0l0ZW08IDEwMDAwMDApe1xyXG4gICAgICAgICAgICAvLyDmiJDlsLFcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBNYXRoLmZsb29yKHRhc2tJdGVtIC8gMTAwMDAwKTtcclxuICAgICAgICAgICAgLy8gbGV0IGlkID0gdHlwZSAqIDEwMDAwMCArIDE7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gQWNoaWV2ZW5tZW50VGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBY2hpZXZlbm1lbnRUYXNrRGF0YUJ5VHlwZUFuZEluZGV4KHR5cGUsVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnRJbmRleCArIHR5cGUsMCkgKyAxKTtcclxuICAgICAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudE51bSArIGluZm8uQWNoaWV2ZW5tZW50VGFza1R5cGUsMCk7XHJcbiAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnROdW0gKyBpbmZvLkFjaGlldmVubWVudFRhc2tUeXBlLG51bSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlQWNoaWV2ZW1lbnRUYXNrSW5mb0VtaXRKc29uU3RyaW5nKHR5cGUsbnVtKSk7XHJcbiAgICAgICAgICAgIGlmKG51bSA+PSBpbmZvLlRhc2tQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGluZm8uVGFza0lELDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8g5bCG5Lu75Yqh54q25oCB6K6+572u5Li65Y+v6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBpbmZvLlRhc2tJRCwxKTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlQWNoaWV2ZW1lbnRUYXNrSW5mb1N0YXR1c0pzb25TdHJpbmcodHlwZSwxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9UYXNrX0FjaGlldmVubWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIOS4u+e6v1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IE1hdGguZmxvb3IodGFza0l0ZW0gLyAxMDAwMDAwMCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBpZCA9IHR5cGUgKiAxMDAwMDAwICsgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrTWFpbkluZGV4ICsgdHlwZSwwKSArIDE7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5UYXNrRGF0YUJ5VHlwZUFuZEluZGV4KHR5cGUsVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrTWFpbkluZGV4ICsgdHlwZSwwKSArIDEpO1xyXG4gICAgICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza01haW5OdW0gKyBpbmZvLlRhc2tUeXBlLDApO1xyXG4gICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5OdW0gKyBpbmZvLlRhc2tUeXBlLG51bSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlTWFpblRhc2tJbmZvRW1pdEpzb25TdHJpbmcoaW5mby5UYXNrVHlwZSxudW0pKTtcclxuICAgICAgICAgICAgaWYobnVtID49IGluZm8uVGFza1BhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgaW5mby5UaHJlYWRUYXNrSUQsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyDlsIbku7vliqHnirbmgIHorr7nva7kuLrlj6/pooblj5ZcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGluZm8uVGhyZWFkVGFza0lELDEpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRDaGFuZ2VNYWluVGFza0luZm9TdGFnZUpzb25TdHJpbmcoaW5mby5UYXNrVHlwZSwxKSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Yiw5a+55bqU5Lu75Yqh6IqC54K555qE5b2T5YmN6L+b5bqmICovXHJcbiAgICBnZXRUYXNrTm93UHJvZ3Jlc3ModGFza0l0ZW06VGFza0l0ZW0pOm51bWJlcntcclxuICAgICAgICBsZXQgbm93TnVtID0gMDtcclxuICAgICAgICBpZih0YXNrSXRlbTwgMTAwMDAwKXtcclxuICAgICAgICAgICAgLy8g5pel5bi4XHJcbiAgICAgICAgfWVsc2UgaWYodGFza0l0ZW08IDEwMDAwMDApe1xyXG4gICAgICAgICAgICAvLyDmiJDlsLFcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBNYXRoLmZsb29yKHRhc2tJdGVtIC8gMTAwMDAwKTtcclxuICAgICAgICAgICAgLy8gbGV0IGlkID0gdHlwZSAqIDEwMDAwMCArIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0FjaGlldmVtZW50SW5kZXggKyB0eXBlLDApICsgMTtcclxuICAgICAgICAgICAgLy8gbGV0IGluZm8gPSBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25BY2hpZXZlbm1lbnRUYXNrKGlkKTtcclxuICAgICAgICAgICAgLy8gaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbm93TnVtO1xyXG4gICAgICAgICAgICBub3dOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudE51bSArIHR5cGUsMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIOS4u+e6v1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IE1hdGguZmxvb3IodGFza0l0ZW0gLyAxMDAwMDAwMCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBpZCA9IHR5cGUgKiAxMDAwMDAwICsgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrTWFpbkluZGV4ICsgdHlwZSwwKSArIDE7XHJcbiAgICAgICAgICAgIC8vIGxldCBpbmZvID0gVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb24oaWQpO1xyXG4gICAgICAgICAgICAvLyBsZXQgaW5mbyA9IFRocmVhZFRhc2tJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluVGFza0RhdGFCeVR5cGVBbmRJbmRleCh0eXBlLFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza01haW5JbmRleCArIHR5cGUsMCkgKyAxKTtcclxuICAgICAgICAgICAgLy8gaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbm93TnVtO1xyXG4gICAgICAgICAgICBub3dOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluTnVtICsgdHlwZSwwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vd051bVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvdmVyVGFzayh0YXNrSXRlbTpUYXNrSXRlbSl7XHJcbiAgICAgICAgaWYodGFza0l0ZW08IDEwMDAwMCl7XHJcbiAgICAgICAgICAgIC8vIOaXpeW4uFxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB0YXNrSXRlbSwyKTtcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRDaGFuZ2VEYWlseVRhc2tJbmZvU3RhdHVzSnNvblN0cmluZyh0YXNrSXRlbSwyKSk7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UYXNrSW5mb3JtYXRpb24odGFza0l0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgbnVtMSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlOdW0sMCk7XHJcbiAgICAgICAgICAgIGxldCBudW0yID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla0FjdGl2aXR5TnVtLDApO1xyXG4gICAgICAgICAgICBsZXQgbnVtMyA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQWxsQWN0aXZpdHlOdW0sMCk7XHJcbiAgICAgICAgICAgIG51bTEgKz0gaW5mby5SZXdhcmRQcm9wTnVtO1xyXG4gICAgICAgICAgICBudW0yICs9IGluZm8uUmV3YXJkUHJvcE51bTtcclxuICAgICAgICAgICAgbnVtMyArPSBpbmZvLlJld2FyZFByb3BOdW07XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5TnVtLG51bTEpO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrV2Vla0FjdGl2aXR5TnVtLG51bTIpO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5BbGxBY3Rpdml0eU51bSxudW0zKTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0VGFzayhUYXNrSXRlbS7lrozmiJBY5qyh5q+P5pel5Lu75YqhKTtcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayxVc2VySW5mby5nZXRJbnN0YW5jZSgpLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcobnVtMSw4KSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKG51bTIsOSkpO1xyXG4gICAgICAgIH1lbHNlICBpZih0YXNrSXRlbTwgMTAwMDAwMCl7XHJcbiAgICAgICAgICAgIC8vIOaIkOWwsVxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB0YXNrSXRlbSwyKTtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25BY2hpZXZlbm1lbnRUYXNrKHRhc2tJdGVtKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnRJbmRleCArIGluZm8uQWNoaWV2ZW5tZW50VGFza1R5cGUsMCk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudEluZGV4ICsgaW5mby5BY2hpZXZlbm1lbnRUYXNrVHlwZSxpbmRleCk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlQWNoaWV2ZW1lbnRUYXNrSW5mb1N0YWdlSnNvblN0cmluZyhpbmZvLkFjaGlldmVubWVudFRhc2tUeXBlLGluZGV4KSlcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRDaGFuZ2VBY2hpZXZlbWVudFRhc2tJbmZvU3RhdHVzSnNvblN0cmluZyhpbmZvLkFjaGlldmVubWVudFRhc2tUeXBlLDApKTtcclxuICAgICAgICAgICAgLy8g5Yid5aeL5YyW5oiQ5bCx5Lu75YqhXHJcbiAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRfdGFza19saXN0ID0gQWNoaWV2ZW5tZW50VGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBY2hpZXZlbm1lbnRUYXNrRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRUYXNrKFRhc2tJdGVtLuWujOaIkFjmrKHmiJDlsLHku7vliqEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDkuLvnur9cclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdGFza0l0ZW0sMik7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluU2hvd0luZGV4LDApO1xyXG4gICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5TaG93SW5kZXgsbnVtKTtcclxuICAgICAgICAgICAgLy8g5Yi35paw5Lu75Yqh5pWw5o2uXHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb24odGFza0l0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluSW5kZXggKyBpbmZvLlRhc2tUeXBlLDApO1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuY2hhbmdlR2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldENoYW5nZU1haW5UYXNrSW5mb1Byb2dyZXNzSnNvblN0cmluZyhudW0pKTtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5JbmRleCArIGluZm8uVGFza1R5cGUsaW5kZXgpO1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuY2hhbmdlR2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldENoYW5nZU1haW5UYXNrSW5mb1N0YWdlSnNvblN0cmluZyhpbmZvLlRhc2tUeXBlLGluZGV4KSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlTWFpblRhc2tJbmZvU3RhdHVzSnNvblN0cmluZyhpbmZvLlRhc2tUeXBlLDApKTtcclxuICAgICAgICAgICAgLy8g5Yid5aeL5YyW5Li757q/5Lu75YqhXHJcbiAgICAgICAgICAgIHRoaXMubWFpbl90YXNrX2RhdGEgPSBUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpblRhc2tEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tUYXNrKHRhc2tJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1Rhc2sodGFza0l0ZW06VGFza0l0ZW0pe1xyXG4gICAgICAgIGlmKHRhc2tJdGVtPCAxMDAwMDApe1xyXG4gICAgICAgICAgICAvLyDml6XluLhcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza051bSArIHRhc2tJdGVtLDApO1xyXG4gICAgICAgICAgICBpZihudW0gPj0gVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UYXNrSW5mb3JtYXRpb24odGFza0l0ZW0pLlRhc2tQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHRhc2tJdGVtLDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8g5bCG5Lu75Yqh54q25oCB6K6+572u5Li65Y+v6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB0YXNrSXRlbSwxKTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0Q2hhbmdlRGFpbHlUYXNrSW5mb1N0YXR1c0pzb25TdHJpbmcodGFza0l0ZW0sMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgIGlmKHRhc2tJdGVtPDEwMDAwMDApe1xyXG4gICAgICAgICAgICAvLyDmiJDlsLFcclxuICAgICAgICAgICAgbGV0IGluZm8gPSBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25BY2hpZXZlbm1lbnRUYXNrKHRhc2tJdGVtKTtcclxuICAgICAgICAgICAgbGV0IG5vd0luZm8gPSBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vd0FjaGlldmVubWVudFRhc2tEYXRhQnlUeXBlKGluZm8uQWNoaWV2ZW5tZW50VGFza1R5cGUpO1xyXG4gICAgICAgICAgICBpZihub3dJbmZvID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0FjaGlldmVtZW50TnVtICsgaW5mby5BY2hpZXZlbm1lbnRUYXNrVHlwZSwwKTtcclxuICAgICAgICAgICAgaWYobnVtID49IG5vd0luZm8uVGFza1BhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgbm93SW5mby5UYXNrSUQsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyDlsIbku7vliqHnirbmgIHorr7nva7kuLrlj6/pooblj5ZcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIG5vd0luZm8uVGFza0lELDEpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRDaGFuZ2VBY2hpZXZlbWVudFRhc2tJbmZvU3RhdHVzSnNvblN0cmluZyhpbmZvLkFjaGlldmVubWVudFRhc2tUeXBlLDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDkuLvnur9cclxuICAgICAgICAgICAgaWYodGhpcy5tYWluX3Rhc2tfZGF0YSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBub3dOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluTnVtICsgdGhpcy5tYWluX3Rhc2tfZGF0YS5UYXNrVHlwZSwwKTtcclxuICAgICAgICAgICAgaWYobm93TnVtID49IHRoaXMubWFpbl90YXNrX2RhdGEuVGFza1BhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdGhpcy5tYWluX3Rhc2tfZGF0YS5UaHJlYWRUYXNrSUQsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCG5Lu75Yqh54q25oCB6K6+572u5Li65Y+v6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdGhpcy5tYWluX3Rhc2tfZGF0YS5UaHJlYWRUYXNrSUQsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRDaGFuZ2VNYWluVGFza0luZm9TdGF0dXNKc29uU3RyaW5nKHRoaXMubWFpbl90YXNrX2RhdGEuVGFza1R5cGUsMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNvcnREYWlseVRhc2soKXtcclxuICAgICAgICAvLyB0aGlzLmRhaWx5X3Rhc2tfbGlzdC5zb3J0KChhOkpzb25UYXNrSW5mb3JtYXRpb24sYjpKc29uVGFza0luZm9ybWF0aW9uKTpudW1iZXI9PntcclxuICAgICAgICAvLyAgICAgLy8gcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgYS5UYXNrSUQpIC0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBiLlRhc2tJRCk7XHJcbiAgICAgICAgLy8gICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgYS5UYXNrSUQpID09IDEpIHJldHVybiAtMTtcclxuICAgICAgICAvLyAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBhLlRhc2tJRCkgPT0gMCkgcmV0dXJuIC0xO1xyXG4gICAgICAgIC8vICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGEuVGFza0lEKSA9PSAyKSByZXR1cm4gMTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBsZXQgZmluaXNoVGFzayA9IFtdO1xyXG4gICAgICAgIGxldCBnb2luZ1Rhc2sgPSBbXTtcclxuICAgICAgICBsZXQgcmVjZWl2ZVRhc2sgPSBbXTtcclxuICAgICAgICB0aGlzLmRhaWx5X3Rhc2tfbGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdi5UYXNrSUQpID09IDEpe1xyXG4gICAgICAgICAgICAgICAgZmluaXNoVGFzay5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LlRhc2tJRCkgPT0gMil7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlVGFzay5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGdvaW5nVGFzay5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBbXTtcclxuICAgICAgICB0ZW1wID0gdGVtcC5jb25jYXQoZmluaXNoVGFzayxnb2luZ1Rhc2sscmVjZWl2ZVRhc2spO1xyXG4gICAgICAgIHRoaXMuZGFpbHlfdGFza19saXN0ID0gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICBzb3J0QWNoaWV2ZW1lbnRUYXNrKCl7XHJcbiAgICAgICAgLy8gdGhpcy5kYWlseV90YXNrX2xpc3Quc29ydCgoYTpKc29uVGFza0luZm9ybWF0aW9uLGI6SnNvblRhc2tJbmZvcm1hdGlvbik6bnVtYmVyPT57XHJcbiAgICAgICAgLy8gICAgIC8vIHJldHVybiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGEuVGFza0lEKSAtIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgYi5UYXNrSUQpO1xyXG4gICAgICAgIC8vICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGEuVGFza0lEKSA9PSAxKSByZXR1cm4gLTE7XHJcbiAgICAgICAgLy8gICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgYS5UYXNrSUQpID09IDApIHJldHVybiAtMTtcclxuICAgICAgICAvLyAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBhLlRhc2tJRCkgPT0gMikgcmV0dXJuIDE7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgbGV0IGZpbmlzaFRhc2sgPSBbXTtcclxuICAgICAgICBsZXQgZ29pbmdUYXNrID0gW107XHJcbiAgICAgICAgbGV0IHJlY2VpdmVUYXNrID0gW107XHJcbiAgICAgICAgbGV0IG51bGxUYXNrID0gW107XHJcbiAgICAgICAgdGhpcy5hY2hpZXZlbWVudF90YXNrX2xpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2ID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbnVsbFRhc2sucHVzaCh2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHYuVGFza0lEKSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGZpbmlzaFRhc2sucHVzaCh2KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdi5UYXNrSUQpID09IDIpe1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZVRhc2sucHVzaCh2KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBnb2luZ1Rhc2sucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCB0ZW1wID0gW107XHJcbiAgICAgICAgdGVtcCA9IHRlbXAuY29uY2F0KGZpbmlzaFRhc2ssZ29pbmdUYXNrLHJlY2VpdmVUYXNrKTtcclxuICAgICAgICB0aGlzLmFjaGlldmVtZW50X3Rhc2tfbGlzdCA9IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5L+u5pS55pel5bi45Lu75Yqh6Kem5Y+R5qyh5pWwanNvbiAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VEYWlseVRhc2tJbmZvRW1pdEpzb25TdHJpbmcodGFza0lkOiBudW1iZXIsZW1pdDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCB0aW1lID0gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXROb3dEYXkoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgdG9kYXk6dGltZSxcclxuICAgICAgICAgICAgZGltZW5zaW9uOiAxLFxyXG4gICAgICAgICAgICB0YXNrSWQ6dGFza0lkLFxyXG4gICAgICAgICAgICBlbWl0OmVtaXQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5L+u5pS55pel5bi45Lu75Yqh54q25oCBanNvbiAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VEYWlseVRhc2tJbmZvU3RhdHVzSnNvblN0cmluZyh0YXNrSWQ6IG51bWJlcixzdGF0dXM6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBsZXQgdGltZSA9IFVzZXJJbmZvLmdldEluc3RhbmNlKCkuZ2V0Tm93RGF5KCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIHRvZGF5OnRpbWUsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjogMSxcclxuICAgICAgICAgICAgdGFza0lkOnRhc2tJZCxcclxuICAgICAgICAgICAgc3RhdHVzOnN0YXR1cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bkv67mlLnmiJDlsLHku7vliqHpmLbmrrVqc29uICovICAgXHJcbiAgICBwcml2YXRlIGdldENoYW5nZUFjaGlldmVtZW50VGFza0luZm9TdGFnZUpzb25TdHJpbmcodHlwZTogbnVtYmVyLHN0YWdlOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjogMixcclxuICAgICAgICAgICAgdGFza1R5cGU6dHlwZSxcclxuICAgICAgICAgICAgdGFza0lkOnR5cGUqMTAwMDAwKzEsXHJcbiAgICAgICAgICAgIHN0YWdlOnN0YWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluS/ruaUueaIkOWwseS7u+WKoeinpuWPkeasoeaVsGpzb24gKi8gICBcclxuICAgIHByaXZhdGUgZ2V0Q2hhbmdlQWNoaWV2ZW1lbnRUYXNrSW5mb0VtaXRKc29uU3RyaW5nKHR5cGU6IG51bWJlcixlbWl0Om51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjogMixcclxuICAgICAgICAgICAgdGFza1R5cGU6dHlwZSxcclxuICAgICAgICAgICAgdGFza0lkOnR5cGUqMTAwMDAwKzEsXHJcbiAgICAgICAgICAgIGVtaXQ6ZW1pdCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bkv67mlLnmiJDlsLHku7vliqHnirbmgIFqc29uICovICAgXHJcbiAgICBwcml2YXRlIGdldENoYW5nZUFjaGlldmVtZW50VGFza0luZm9TdGF0dXNKc29uU3RyaW5nKHR5cGU6IG51bWJlcixzdGF0dXM6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgZGltZW5zaW9uOiAyLFxyXG4gICAgICAgICAgICB0YXNrVHlwZTp0eXBlLFxyXG4gICAgICAgICAgICB0YXNrSWQ6dHlwZSoxMDAwMDArMSxcclxuICAgICAgICAgICAgc3RhdHVzOnN0YXR1cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq6I635Y+W5L+u5pS55Li757q/5Lu75Yqh5pi+56S66aG65bqPanNvbiAqLyAgIFxyXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VNYWluVGFza0luZm9Qcm9ncmVzc0pzb25TdHJpbmcocHJvZ3Jlc3M6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgZGltZW5zaW9uOiAzLFxyXG4gICAgICAgICAgICBwcm9ncmVzczpwcm9ncmVzcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bkv67mlLnkuLvnur/ku7vliqHnirbmgIFqc29uICovICAgXHJcbiAgICBwcml2YXRlIGdldENoYW5nZU1haW5UYXNrSW5mb1N0YXR1c0pzb25TdHJpbmcodHlwZTogbnVtYmVyLHN0YXR1czpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgICAgICBkaW1lbnNpb246IDMsXHJcbiAgICAgICAgICAgIHRhc2tUeXBlOnR5cGUsXHJcbiAgICAgICAgICAgIHRhc2tJZDp0eXBlKjEwMDAwMDAwKzEsXHJcbiAgICAgICAgICAgIHN0YXR1czpzdGF0dXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5L+u5pS55Li757q/5Lu75Yqh6Zi25q61anNvbiAqLyAgIFxyXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VNYWluVGFza0luZm9TdGFnZUpzb25TdHJpbmcodHlwZTogbnVtYmVyLHN0YWdlOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjogMyxcclxuICAgICAgICAgICAgdGFza1R5cGU6dHlwZSxcclxuICAgICAgICAgICAgdGFza0lkOnR5cGUqMTAwMDAwMDArMSxcclxuICAgICAgICAgICAgc3RhZ2U6c3RhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5L+u5pS55Li757q/5Lu75Yqh6Kem5Y+R5qyh5pWwanNvbiAqLyAgIFxyXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VNYWluVGFza0luZm9FbWl0SnNvblN0cmluZyh0eXBlOiBudW1iZXIsZW1pdDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgICAgICBkaW1lbnNpb246IDMsXHJcbiAgICAgICAgICAgIHRhc2tUeXBlOnR5cGUsXHJcbiAgICAgICAgICAgIHRhc2tJZDp0eXBlKjEwMDAwMDAwKzEsXHJcbiAgICAgICAgICAgIGVtaXQ6ZW1pdCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==