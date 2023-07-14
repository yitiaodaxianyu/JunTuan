"use strict";
cc._RF.push(module, '6f2881UqRJLI6l32ZjtcACS', 'PurchaseCoins');
// Scripts/Store/PurchaseCoins.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseCoinsManager = exports.JsonPurchaseCoins = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonPurchaseCoins = /** @class */ (function () {
    function JsonPurchaseCoins() {
        /**金币ID */
        this.CoinPurchaseID = 0;
        /**章节进度 */
        this.Chapter = 0;
        /**展示位 */
        this.DisplayPosition = 0;
        /**展示位文本 */
        this.DisplayPositionTextID = 0;
        /**消耗钻石数量 */
        this.ConsumeDiamondsNum = 0;
        /**获得金币数量 */
        this.GetCoinNum = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
    }
    return JsonPurchaseCoins;
}());
exports.JsonPurchaseCoins = JsonPurchaseCoins;
var PurchaseCoinsManager = /** @class */ (function () {
    function PurchaseCoinsManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PurchaseCoinsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PurchaseCoinsManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PurchaseCoinsManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    PurchaseCoinsManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PurchaseCoins', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPurchaseCoins成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPurchaseCoins();
                jsonData = json[i];
                _this.data.set(jsonData.CoinPurchaseID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    PurchaseCoinsManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PurchaseCoinsManager.prototype.getJsonPurchaseCoins = function (id) {
        return this.data.get(id);
    };
    /**根据金币ID获取章节进度 */
    PurchaseCoinsManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据金币ID获取展示位 */
    PurchaseCoinsManager.prototype.getDisplayPosition = function (id) {
        return this.data.get(id).DisplayPosition;
    };
    /**根据金币ID获取展示位文本 */
    PurchaseCoinsManager.prototype.getDisplayPositionTextID = function (id) {
        return this.data.get(id).DisplayPositionTextID;
    };
    /**根据金币ID获取消耗钻石数量 */
    PurchaseCoinsManager.prototype.getConsumeDiamondsNum = function (id) {
        return this.data.get(id).ConsumeDiamondsNum;
    };
    /**根据金币ID获取获得金币数量 */
    PurchaseCoinsManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据金币ID获取是否为广告奖励 */
    PurchaseCoinsManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据金币ID获取广告可观看次数 */
    PurchaseCoinsManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /** 静态方法，获取最大的 金币ID*/
    PurchaseCoinsManager.getMaxCoinPurchaseID = function () {
        return 1003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PurchaseCoinsManager.prototype.getJsonDataByChapter = function (chapter) {
        var list = [];
        this.data.forEach(function (v, k) {
            if (v.Chapter == chapter) {
                list.push(v);
            }
        });
        return list;
    };
    PurchaseCoinsManager._instance = null;
    return PurchaseCoinsManager;
}());
exports.PurchaseCoinsManager = PurchaseCoinsManager;

cc._RF.pop();