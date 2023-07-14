"use strict";
cc._RF.push(module, '0a878gKyddBMrpvSygQG8ov', 'AccumulatedInformation');
// Scripts/Task/Data/AccumulatedInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccumulatedInformationManager = exports.JsonAccumulatedInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonAccumulatedInformation = /** @class */ (function () {
    function JsonAccumulatedInformation() {
        /**累计积分奖励ID */
        this.AccumulatedPointsID = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**累计积分 */
        this.AccumulatedPoints = 0;
        /**道具1ID */
        this.PropID_1 = 0;
        /**道具1数量 */
        this.PropNum_1 = 0;
    }
    return JsonAccumulatedInformation;
}());
exports.JsonAccumulatedInformation = JsonAccumulatedInformation;
var AccumulatedInformationManager = /** @class */ (function () {
    function AccumulatedInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AccumulatedInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AccumulatedInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AccumulatedInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AccumulatedInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AccumulatedInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAccumulatedInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAccumulatedInformation();
                jsonData = json[i];
                _this.data.set(jsonData.AccumulatedPointsID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AccumulatedInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AccumulatedInformationManager.prototype.getJsonAccumulatedInformation = function (id) {
        return this.data.get(id);
    };
    /**根据累计积分奖励ID获取任务类型 */
    AccumulatedInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据累计积分奖励ID获取累计积分 */
    AccumulatedInformationManager.prototype.getAccumulatedPoints = function (id) {
        return this.data.get(id).AccumulatedPoints;
    };
    /**根据累计积分奖励ID获取道具1ID */
    AccumulatedInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据累计积分奖励ID获取道具1数量 */
    AccumulatedInformationManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /** 静态方法，获取最大的 累计积分奖励ID*/
    AccumulatedInformationManager.getMaxAccumulatedPointsID = function () {
        return 250010;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    AccumulatedInformationManager.prototype.getRewardByTaskType = function (type) {
        var info = [];
        this.data.forEach(function (v, k) {
            if (v.TaskType == type) {
                info.push(v);
            }
        });
        return info;
    };
    AccumulatedInformationManager._instance = null;
    return AccumulatedInformationManager;
}());
exports.AccumulatedInformationManager = AccumulatedInformationManager;

cc._RF.pop();