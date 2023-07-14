"use strict";
cc._RF.push(module, 'f3d33EP0xtDfpHQxJ3xPsHM', 'EWStarUpCost');
// Scripts/JsonData/EWStarUpCost.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EWStarUpCostManager = exports.JsonEWStarUpCost = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEWStarUpCost = /** @class */ (function () {
    function JsonEWStarUpCost() {
        /**升星ID */
        this.StarUp = 0;
        /**专武品质 */
        this.ExclusiveWeaponQuality = 0;
        /**阶段 */
        this.Stage = 0;
        /**消耗数量 */
        this.CostNum = 0;
    }
    return JsonEWStarUpCost;
}());
exports.JsonEWStarUpCost = JsonEWStarUpCost;
var EWStarUpCostManager = /** @class */ (function () {
    function EWStarUpCostManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    EWStarUpCostManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EWStarUpCostManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EWStarUpCostManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EWStarUpCostManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EWStarUpCost', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEWStarUpCost成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEWStarUpCost();
                jsonData = json[i];
                _this.data.set(jsonData.StarUp, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EWStarUpCostManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EWStarUpCostManager.prototype.getJsonEWStarUpCost = function (id) {
        return this.data.get(id);
    };
    /**根据升星ID获取专武品质 */
    EWStarUpCostManager.prototype.getExclusiveWeaponQuality = function (id) {
        return this.data.get(id).ExclusiveWeaponQuality;
    };
    /**根据升星ID获取阶段 */
    EWStarUpCostManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据升星ID获取消耗数量 */
    EWStarUpCostManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /** 静态方法，获取最大的 升星ID*/
    EWStarUpCostManager.getMaxStarUp = function () {
        return 1;
    };
    EWStarUpCostManager._instance = null;
    return EWStarUpCostManager;
}());
exports.EWStarUpCostManager = EWStarUpCostManager;

cc._RF.pop();