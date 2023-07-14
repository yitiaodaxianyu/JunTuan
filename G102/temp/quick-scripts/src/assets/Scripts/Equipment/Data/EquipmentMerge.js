"use strict";
cc._RF.push(module, 'da4358WOUxEJ5S6ZLXT88Os', 'EquipmentMerge');
// Scripts/Equipment/Data/EquipmentMerge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentMergeManager = exports.JsonEquipmentMerge = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentMerge = /** @class */ (function () {
    function JsonEquipmentMerge() {
        /**消耗装备id */
        this.CostEquipment_id = 0;
        /**消耗装备数量 */
        this.CostNumber = 0;
        /**目标装备id */
        this.TargetEquipment_id = 0;
        /**消耗金币数量 */
        this.CostCoin = 0;
    }
    return JsonEquipmentMerge;
}());
exports.JsonEquipmentMerge = JsonEquipmentMerge;
var EquipmentMergeManager = /** @class */ (function () {
    function EquipmentMergeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentMergeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentMergeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentMergeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentMergeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentMerge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentMerge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentMerge();
                jsonData = json[i];
                _this.data.set(jsonData.CostEquipment_id, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentMergeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentMergeManager.prototype.getJsonEquipmentMerge = function (id) {
        return this.data.get(id);
    };
    /**根据消耗装备id获取消耗装备数量 */
    EquipmentMergeManager.prototype.getCostNumber = function (id) {
        return this.data.get(id).CostNumber;
    };
    /**根据消耗装备id获取目标装备id */
    EquipmentMergeManager.prototype.getTargetEquipment_id = function (id) {
        return this.data.get(id).TargetEquipment_id;
    };
    /**根据消耗装备id获取消耗金币数量 */
    EquipmentMergeManager.prototype.getCostCoin = function (id) {
        return this.data.get(id).CostCoin;
    };
    /** 静态方法，获取最大的 消耗装备id*/
    EquipmentMergeManager.getMaxCostEquipment_id = function () {
        return 3035;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    EquipmentMergeManager.prototype.getData = function () {
        return this.data;
    };
    EquipmentMergeManager.prototype.getCostId = function (equipId) {
        var costId = 0;
        this.data.forEach(function (v, k) {
            if (v.TargetEquipment_id == equipId) {
                costId = k;
            }
        });
        return costId;
    };
    EquipmentMergeManager._instance = null;
    return EquipmentMergeManager;
}());
exports.EquipmentMergeManager = EquipmentMergeManager;

cc._RF.pop();