"use strict";
cc._RF.push(module, '5e8b2JXWAFNb5D9iMPfdpCu', 'CommodityInformation');
// Scripts/Store/CommodityInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityInformationManager = exports.JsonCommodityInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCommodityInformation = /** @class */ (function () {
    function JsonCommodityInformation() {
        /**商品ID */
        this.CommodityID = 0;
        /**获得道具ID */
        this.GetItem = 0;
        /**消耗道具ID */
        this.CostItemID = 0;
        /**消耗数量 */
        this.CostNum = 0;
        /**获得道具数量 */
        this.GetNum = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
    }
    return JsonCommodityInformation;
}());
exports.JsonCommodityInformation = JsonCommodityInformation;
var CommodityInformationManager = /** @class */ (function () {
    function CommodityInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CommodityInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CommodityInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CommodityInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CommodityInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CommodityInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCommodityInformation();
                jsonData = json[i];
                _this.data.set(jsonData.CommodityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CommodityInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CommodityInformationManager.prototype.getJsonCommodityInformation = function (id) {
        return this.data.get(id);
    };
    /**根据商品ID获取获得道具ID */
    CommodityInformationManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据商品ID获取消耗道具ID */
    CommodityInformationManager.prototype.getCostItemID = function (id) {
        return this.data.get(id).CostItemID;
    };
    /**根据商品ID获取消耗数量 */
    CommodityInformationManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据商品ID获取获得道具数量 */
    CommodityInformationManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /**根据商品ID获取是否为广告奖励 */
    CommodityInformationManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据商品ID获取广告可观看次数 */
    CommodityInformationManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /** 静态方法，获取最大的 商品ID*/
    CommodityInformationManager.getMaxCommodityID = function () {
        return 301201;
    };
    CommodityInformationManager._instance = null;
    return CommodityInformationManager;
}());
exports.CommodityInformationManager = CommodityInformationManager;

cc._RF.pop();