"use strict";
cc._RF.push(module, 'c5507wF6UpJTLkSX0t3XWoz', 'CyclePack');
// Scripts/Payment/Data/CyclePack.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclePackManager = exports.JsonCyclePack = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonCyclePack = /** @class */ (function () {
    function JsonCyclePack() {
        /**礼包ID */
        this.GiftID = 0;
        /**礼包类型 */
        this.GiftText = 0;
        /**金币数量 */
        this.GetCoinNum = 0;
        /**钻石数量 */
        this.GetGemNum = 0;
        /**龙晶数量 */
        this.GetCrystal = 0;
        /**道具1ID */
        this.ItemId_1 = 0;
        /**道具1数量 */
        this.ItemNum_1 = 0;
        /**道具2ID */
        this.ItemId_2 = 0;
        /**道具2数量 */
        this.ItemNum_2 = 0;
        /**道具3ID */
        this.ItemId_3 = 0;
        /**道具3数量 */
        this.ItemNum_3 = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCyclePack;
}());
exports.JsonCyclePack = JsonCyclePack;
var CyclePackManager = /** @class */ (function () {
    function CyclePackManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CyclePackManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CyclePackManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CyclePackManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CyclePackManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CyclePack', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCyclePack成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCyclePack();
                jsonData = json[i];
                _this.data.set(jsonData.GiftID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CyclePackManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CyclePackManager.prototype.getJsonCyclePack = function (id) {
        return this.data.get(id);
    };
    /**根据礼包ID获取礼包类型 */
    CyclePackManager.prototype.getGiftText = function (id) {
        return this.data.get(id).GiftText;
    };
    /**根据礼包ID获取金币数量 */
    CyclePackManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据礼包ID获取钻石数量 */
    CyclePackManager.prototype.getGetGemNum = function (id) {
        return this.data.get(id).GetGemNum;
    };
    /**根据礼包ID获取龙晶数量 */
    CyclePackManager.prototype.getGetCrystal = function (id) {
        return this.data.get(id).GetCrystal;
    };
    /**根据礼包ID获取道具1ID */
    CyclePackManager.prototype.getItemId_1 = function (id) {
        return this.data.get(id).ItemId_1;
    };
    /**根据礼包ID获取道具1数量 */
    CyclePackManager.prototype.getItemNum_1 = function (id) {
        return this.data.get(id).ItemNum_1;
    };
    /**根据礼包ID获取道具2ID */
    CyclePackManager.prototype.getItemId_2 = function (id) {
        return this.data.get(id).ItemId_2;
    };
    /**根据礼包ID获取道具2数量 */
    CyclePackManager.prototype.getItemNum_2 = function (id) {
        return this.data.get(id).ItemNum_2;
    };
    /**根据礼包ID获取道具3ID */
    CyclePackManager.prototype.getItemId_3 = function (id) {
        return this.data.get(id).ItemId_3;
    };
    /**根据礼包ID获取道具3数量 */
    CyclePackManager.prototype.getItemNum_3 = function (id) {
        return this.data.get(id).ItemNum_3;
    };
    /**根据礼包ID获取是否为广告奖励 */
    CyclePackManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据礼包ID获取广告可观看次数 */
    CyclePackManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /**根据礼包ID获取谷歌计费ID */
    CyclePackManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 礼包ID*/
    CyclePackManager.getMaxGiftID = function () {
        return 3006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    CyclePackManager.prototype.getDataByType = function (type) {
        var dataList = [];
        this.data.forEach(function (v, k) {
            if (v.GiftText == type) {
                dataList.push(v);
            }
        });
        return dataList;
    };
    CyclePackManager.prototype.resetDayData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 1) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.resetWeekData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 2) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.resetMonthData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 3) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.getData = function () {
        return this.data;
    };
    CyclePackManager._instance = null;
    return CyclePackManager;
}());
exports.CyclePackManager = CyclePackManager;

cc._RF.pop();