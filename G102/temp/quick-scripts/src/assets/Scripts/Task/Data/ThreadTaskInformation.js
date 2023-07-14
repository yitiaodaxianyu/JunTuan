"use strict";
cc._RF.push(module, '409beCh1VZGL6N1LTdeiZ3m', 'ThreadTaskInformation');
// Scripts/Task/Data/ThreadTaskInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadTaskInformationManager = exports.JsonThreadTaskInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var JsonThreadTaskInformation = /** @class */ (function () {
    function JsonThreadTaskInformation() {
        /**主线任务ID */
        this.ThreadTaskID = 0;
        /**显示顺序 */
        this.DisplayOrder = 0;
        /**主线任务文本 */
        this.ThreadTaskDescription = 0;
        /**道具1ID */
        this.PropID_1 = 0;
        /**道具1数量 */
        this.PropNum_1 = 0;
        /**道具2ID */
        this.PropID_2 = 0;
        /**道具2数量 */
        this.PropNum_2 = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**任务阶段 */
        this.TaskPhase = 0;
        /**任务参数 */
        this.TaskParameters = 0;
    }
    return JsonThreadTaskInformation;
}());
exports.JsonThreadTaskInformation = JsonThreadTaskInformation;
var ThreadTaskInformationManager = /** @class */ (function () {
    function ThreadTaskInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ThreadTaskInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ThreadTaskInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ThreadTaskInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ThreadTaskInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ThreadTaskInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonThreadTaskInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonThreadTaskInformation();
                jsonData = json[i];
                _this.data.set(jsonData.ThreadTaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ThreadTaskInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ThreadTaskInformationManager.prototype.getJsonThreadTaskInformation = function (id) {
        return this.data.get(id);
    };
    /**根据主线任务ID获取显示顺序 */
    ThreadTaskInformationManager.prototype.getDisplayOrder = function (id) {
        return this.data.get(id).DisplayOrder;
    };
    /**根据主线任务ID获取主线任务文本 */
    ThreadTaskInformationManager.prototype.getThreadTaskDescription = function (id) {
        return this.data.get(id).ThreadTaskDescription;
    };
    /**根据主线任务ID获取道具1ID */
    ThreadTaskInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据主线任务ID获取道具1数量 */
    ThreadTaskInformationManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /**根据主线任务ID获取道具2ID */
    ThreadTaskInformationManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据主线任务ID获取道具2数量 */
    ThreadTaskInformationManager.prototype.getPropNum_2 = function (id) {
        return this.data.get(id).PropNum_2;
    };
    /**根据主线任务ID获取任务类型 */
    ThreadTaskInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据主线任务ID获取任务阶段 */
    ThreadTaskInformationManager.prototype.getTaskPhase = function (id) {
        return this.data.get(id).TaskPhase;
    };
    /**根据主线任务ID获取任务参数 */
    ThreadTaskInformationManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /** 静态方法，获取最大的 主线任务ID*/
    ThreadTaskInformationManager.getMaxThreadTaskID = function () {
        return 12001020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ThreadTaskInformationManager.prototype.getMainTaskData = function () {
        var info = null;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainShowIndex, 0) + 1;
        this.data.forEach(function (v, k) {
            if (v.DisplayOrder == index) {
                info = v;
            }
        });
        return info;
    };
    ThreadTaskInformationManager.prototype.getMainTaskDataByTypeAndIndex = function (type, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.TaskPhase == index && v.TaskType == type) {
                info = v;
            }
        });
        return info;
    };
    ThreadTaskInformationManager._instance = null;
    return ThreadTaskInformationManager;
}());
exports.ThreadTaskInformationManager = ThreadTaskInformationManager;

cc._RF.pop();