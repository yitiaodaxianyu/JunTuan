"use strict";
cc._RF.push(module, '44122a6HsFOL6FdvEr7y/eu', 'EquipmentLevelUpCost');
// Scripts/Equipment/Data/EquipmentLevelUpCost.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentLevelUpCostManager = exports.JsonEquipmentLevelUpCost = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentLevelUpCost = /** @class */ (function () {
    function JsonEquipmentLevelUpCost() {
        /**装备等级 */
        this.EquipmentLevel = 0;
        /**金币消耗 */
        this.CoinCost = 0;
        /**关卡限制 */
        this.LevelLimit = 0;
    }
    return JsonEquipmentLevelUpCost;
}());
exports.JsonEquipmentLevelUpCost = JsonEquipmentLevelUpCost;
var EquipmentLevelUpCostManager = /** @class */ (function () {
    function EquipmentLevelUpCostManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentLevelUpCostManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentLevelUpCostManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentLevelUpCostManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentLevelUpCostManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentLevelUpCost', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentLevelUpCost成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentLevelUpCost();
                jsonData = json[i];
                _this.data.set(jsonData.EquipmentLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentLevelUpCostManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentLevelUpCostManager.prototype.getJsonEquipmentLevelUpCost = function (id) {
        return this.data.get(id);
    };
    /**根据装备等级获取金币消耗 */
    EquipmentLevelUpCostManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据装备等级获取关卡限制 */
    EquipmentLevelUpCostManager.prototype.getLevelLimit = function (id) {
        return this.data.get(id).LevelLimit;
    };
    /** 静态方法，获取最大的 装备等级*/
    EquipmentLevelUpCostManager.getMaxEquipmentLevel = function () {
        return 100;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据装备等级获取一共消耗了多少金币 */
    EquipmentLevelUpCostManager.prototype.getCoinCostAll = function (id) {
        var coin = 0;
        for (var index = 1; index < id; index++) {
            coin += this.getCoinCost(index);
        }
        return coin;
    };
    EquipmentLevelUpCostManager._instance = null;
    return EquipmentLevelUpCostManager;
}());
exports.EquipmentLevelUpCostManager = EquipmentLevelUpCostManager;

cc._RF.pop();