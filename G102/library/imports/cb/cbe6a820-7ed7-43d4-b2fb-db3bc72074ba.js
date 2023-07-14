"use strict";
cc._RF.push(module, 'cbe6aggftdD1LL72zvHIHS6', 'EWUnlockCost');
// Scripts/JsonData/EWUnlockCost.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EWUnlockCostManager = exports.JsonEWUnlockCost = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEWUnlockCost = /** @class */ (function () {
    function JsonEWUnlockCost() {
        /**专武品质 */
        this.ExclusiveWeaponQuality = 0;
        /**消耗碎片数量 */
        this.CostFragment = 0;
    }
    return JsonEWUnlockCost;
}());
exports.JsonEWUnlockCost = JsonEWUnlockCost;
var EWUnlockCostManager = /** @class */ (function () {
    function EWUnlockCostManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    EWUnlockCostManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EWUnlockCostManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EWUnlockCostManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EWUnlockCostManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EWUnlockCost', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEWUnlockCost成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEWUnlockCost();
                jsonData = json[i];
                _this.data.set(jsonData.ExclusiveWeaponQuality, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EWUnlockCostManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EWUnlockCostManager.prototype.getJsonEWUnlockCost = function (id) {
        return this.data.get(id);
    };
    /**根据专武品质获取消耗碎片数量 */
    EWUnlockCostManager.prototype.getCostFragment = function (id) {
        return this.data.get(id).CostFragment;
    };
    /** 静态方法，获取最大的 专武品质*/
    EWUnlockCostManager.getMaxExclusiveWeaponQuality = function () {
        return 6;
    };
    EWUnlockCostManager._instance = null;
    return EWUnlockCostManager;
}());
exports.EWUnlockCostManager = EWUnlockCostManager;

cc._RF.pop();