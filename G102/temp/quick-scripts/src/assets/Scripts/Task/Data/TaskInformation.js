"use strict";
cc._RF.push(module, '97dc45oqjJEGZdEHKS8O5uO', 'TaskInformation');
// Scripts/Task/Data/TaskInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInformationManager = exports.JsonTaskInformation = void 0;
var HttpManager_1 = require("../.././NetWork/HttpManager");
var LevelManager_1 = require("../../Level/LevelManager");
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var MyTool_1 = require("../../Tools/MyTool");
var UserData_1 = require("../../UserData");
var UserInfo_1 = require("../../UserInfo/UserInfo");
var JsonTaskInformation = /** @class */ (function () {
    function JsonTaskInformation() {
        /**任务ID */
        this.TaskID = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**解锁关卡 */
        this.Unlocklevel = 0;
        /**任务描述文本 */
        this.TaskDescription = 0;
        /**任务参数 */
        this.TaskParameters = 0;
        /**奖励道具ID */
        this.RewardPropID = 0;
        /**奖励积分 */
        this.RewardPropNum = 0;
        /**权重 */
        this.weights = 0;
    }
    return JsonTaskInformation;
}());
exports.JsonTaskInformation = JsonTaskInformation;
var TaskInformationManager = /** @class */ (function () {
    function TaskInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TaskInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TaskInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TaskInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TaskInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TaskInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTaskInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTaskInformation();
                jsonData = json[i];
                _this.data.set(jsonData.TaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TaskInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TaskInformationManager.prototype.getJsonTaskInformation = function (id) {
        return this.data.get(id);
    };
    /**根据任务ID获取任务类型 */
    TaskInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据任务ID获取解锁关卡 */
    TaskInformationManager.prototype.getUnlocklevel = function (id) {
        return this.data.get(id).Unlocklevel;
    };
    /**根据任务ID获取任务描述文本 */
    TaskInformationManager.prototype.getTaskDescription = function (id) {
        return this.data.get(id).TaskDescription;
    };
    /**根据任务ID获取任务参数 */
    TaskInformationManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /**根据任务ID获取奖励道具ID */
    TaskInformationManager.prototype.getRewardPropID = function (id) {
        return this.data.get(id).RewardPropID;
    };
    /**根据任务ID获取奖励积分 */
    TaskInformationManager.prototype.getRewardPropNum = function (id) {
        return this.data.get(id).RewardPropNum;
    };
    /**根据任务ID获取权重 */
    TaskInformationManager.prototype.getweights = function (id) {
        return this.data.get(id).weights;
    };
    /** 静态方法，获取最大的 任务ID*/
    TaskInformationManager.getMaxTaskID = function () {
        return 44004;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    // 根据通过关卡拿到对应的每日任务列表
    TaskInformationManager.prototype.getUnlockJsonData = function () {
        var info = [];
        var nowLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        this.data.forEach(function (v, k) {
            if (v.Unlocklevel <= nowLevel) {
                info.push(v);
            }
        });
        return info;
    };
    // 获取当日的任务列表
    TaskInformationManager.prototype.getDailyTaskData = function () {
        var info = [];
        // if(TheStorageManager.getInstance().getNumber(StorageKey.TaskId + 0,0) == 0){
        if (UserInfo_1.UserInfo.getInstance().dailyTaskList.length == 0) {
            var weight = [];
            var dataList = this.getUnlockJsonData();
            for (var i = 0; i < dataList.length; i++) {
                weight.push(dataList[i].weights);
            }
            var result = MyTool_1.default.getWeightIndexs(weight, 12);
            for (var i = 0; i < result.length; i++) {
                info.push(dataList[result[i]]);
                // 重置每日任务id
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskId + i, dataList[result[i]].TaskID);
                // 重置每日任务状态
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + dataList[result[i]].TaskID, 0);
                // 重置每日任务数据
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskNum + dataList[result[i]].TaskID, 0);
                // 上报新增的每日任务信息
                this.reportDailyTask(dataList[result[i]].TaskID);
            }
        }
        else {
            for (var i = 0; i < 12; i++) {
                info.push(this.getJsonTaskInformation(StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskId + i)));
            }
        }
        return info;
    };
    TaskInformationManager.prototype.reportDailyTask = function (id) {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameAchievementTask, this.getTaskInfoJsonString(id));
    };
    // 获取每日任务的上报json数据
    TaskInformationManager.prototype.getTaskInfoJsonString = function (id) {
        var uid = UserData_1.default.getInstance().getUserID();
        var time = UserInfo_1.UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today: time,
            dimension: 1,
            taskId: id,
            status: 0,
            emit: 0,
        });
    };
    TaskInformationManager._instance = null;
    return TaskInformationManager;
}());
exports.TaskInformationManager = TaskInformationManager;

cc._RF.pop();