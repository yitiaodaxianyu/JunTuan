"use strict";
cc._RF.push(module, '6acfa10juJEwKI+ECEfQIAj', 'CommodityManagement');
// Scripts/JsonData/CommodityManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityManagementManager = exports.JsonCommodityManagement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCommodityManagement = /** @class */ (function () {
    function JsonCommodityManagement() {
        /**商品ID */
        this.CommodityID = 0;
        /**购买消耗道具ID */
        this.CostItem = 0;
        /**消耗数量 */
        this.CostNum = 0;
        /**获得道具ID */
        this.GetItem = 0;
        /**获得道具数量 */
        this.GetNum = 0;
    }
    return JsonCommodityManagement;
}());
exports.JsonCommodityManagement = JsonCommodityManagement;
var CommodityManagementManager = /** @class */ (function () {
    function CommodityManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CommodityManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CommodityManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CommodityManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CommodityManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CommodityManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCommodityManagement();
                jsonData = json[i];
                _this.data.set(jsonData.CommodityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CommodityManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CommodityManagementManager.prototype.getJsonCommodityManagement = function (id) {
        return this.data.get(id);
    };
    /**根据商品ID获取购买消耗道具ID */
    CommodityManagementManager.prototype.getCostItem = function (id) {
        return this.data.get(id).CostItem;
    };
    /**根据商品ID获取消耗数量 */
    CommodityManagementManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据商品ID获取获得道具ID */
    CommodityManagementManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据商品ID获取获得道具数量 */
    CommodityManagementManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /** 静态方法，获取最大的 商品ID*/
    CommodityManagementManager.getMaxCommodityID = function () {
        return 10210001;
    };
    CommodityManagementManager._instance = null;
    return CommodityManagementManager;
}());
exports.CommodityManagementManager = CommodityManagementManager;

cc._RF.pop();