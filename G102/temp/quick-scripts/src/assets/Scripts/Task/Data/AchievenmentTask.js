"use strict";
cc._RF.push(module, '7e483WcloJJ+4vv7r/D0y5p', 'AchievenmentTask');
// Scripts/Task/Data/AchievenmentTask.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievenmentTaskManager = exports.JsonAchievenmentTask = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var JsonAchievenmentTask = /** @class */ (function () {
    function JsonAchievenmentTask() {
        /**成就任务ID */
        this.TaskID = 0;
        /**成就任务类型 */
        this.AchievenmentTaskType = 0;
        /**任务阶段 */
        this.AchievenmentTaskPhase = 0;
        /**成就任务文本 */
        this.TaskDescription = 0;
        /**任务参数1 */
        this.TaskParameters = 0;
        /**奖励道具ID */
        this.RewardPropID = 0;
        /**奖励道具数量 */
        this.RewardPropNum = 0;
    }
    return JsonAchievenmentTask;
}());
exports.JsonAchievenmentTask = JsonAchievenmentTask;
var AchievenmentTaskManager = /** @class */ (function () {
    function AchievenmentTaskManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AchievenmentTaskManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AchievenmentTaskManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AchievenmentTaskManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AchievenmentTaskManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AchievenmentTask', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAchievenmentTask成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAchievenmentTask();
                jsonData = json[i];
                _this.data.set(jsonData.TaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AchievenmentTaskManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AchievenmentTaskManager.prototype.getJsonAchievenmentTask = function (id) {
        return this.data.get(id);
    };
    /**根据成就任务ID获取成就任务类型 */
    AchievenmentTaskManager.prototype.getAchievenmentTaskType = function (id) {
        return this.data.get(id).AchievenmentTaskType;
    };
    /**根据成就任务ID获取任务阶段 */
    AchievenmentTaskManager.prototype.getAchievenmentTaskPhase = function (id) {
        return this.data.get(id).AchievenmentTaskPhase;
    };
    /**根据成就任务ID获取成就任务文本 */
    AchievenmentTaskManager.prototype.getTaskDescription = function (id) {
        return this.data.get(id).TaskDescription;
    };
    /**根据成就任务ID获取任务参数1 */
    AchievenmentTaskManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /**根据成就任务ID获取奖励道具ID */
    AchievenmentTaskManager.prototype.getRewardPropID = function (id) {
        return this.data.get(id).RewardPropID;
    };
    /**根据成就任务ID获取奖励道具数量 */
    AchievenmentTaskManager.prototype.getRewardPropNum = function (id) {
        return this.data.get(id).RewardPropNum;
    };
    /** 静态方法，获取最大的 成就任务ID*/
    AchievenmentTaskManager.getMaxTaskID = function () {
        return 700006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    // 获取当前成就任务列表
    AchievenmentTaskManager.prototype.getAchievenmentTaskData = function () {
        var info = [];
        var type = 1;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
        this.data.forEach(function (v, k) {
            if (type == v.AchievenmentTaskType) {
                if (index == v.AchievenmentTaskPhase) {
                    type++;
                    index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                    info.push(v);
                }
            }
            else if (type < v.AchievenmentTaskType) {
                info.push(null);
                type++;
                index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                if (index == v.AchievenmentTaskPhase) {
                    type++;
                    index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                    info.push(v);
                }
            }
        });
        if (info.length < Math.floor(AchievenmentTaskManager.getMaxTaskID() / 100000)) {
            info.push(null);
        }
        return info;
    };
    AchievenmentTaskManager.prototype.getNowAchievenmentTaskDataByType = function (type) {
        var info = null;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
        this.data.forEach(function (v, k) {
            if (type == v.AchievenmentTaskType) {
                if (index == v.AchievenmentTaskPhase) {
                    info = v;
                }
            }
        });
        return info;
    };
    AchievenmentTaskManager.prototype.getAchievenmentTaskDataByTypeAndIndex = function (type, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.AchievenmentTaskPhase == index && v.AchievenmentTaskType == type) {
                info = v;
            }
        });
        return info;
    };
    AchievenmentTaskManager._instance = null;
    return AchievenmentTaskManager;
}());
exports.AchievenmentTaskManager = AchievenmentTaskManager;

cc._RF.pop();