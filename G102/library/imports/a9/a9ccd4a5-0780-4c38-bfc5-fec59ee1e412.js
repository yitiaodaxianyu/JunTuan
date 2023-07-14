"use strict";
cc._RF.push(module, 'a9ccdSlB4BMOL/F/sWe4eQS', 'CumulativeCard');
// Scripts/Wish/CumulativeCard.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeCardManager = exports.JsonCumulativeCard = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCumulativeCard = /** @class */ (function () {
    function JsonCumulativeCard() {
        /**累计次数奖励ID */
        this.CumulativeRewardID = 0;
        /**许愿池类型 */
        this.WishType = 0;
        /**累计抽卡次数 */
        this.CumulativeCardDrawingTimes = 0;
        /**道具ID */
        this.ItemID = 0;
        /**数量 */
        this.RewardNum = 0;
    }
    return JsonCumulativeCard;
}());
exports.JsonCumulativeCard = JsonCumulativeCard;
var CumulativeCardManager = /** @class */ (function () {
    function CumulativeCardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CumulativeCardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeCardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeCardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeCardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeCard', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeCard成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeCard();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeCardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeCardManager.prototype.getJsonCumulativeCard = function (id) {
        return this.data.get(id);
    };
    /**根据累计次数奖励ID获取许愿池类型 */
    CumulativeCardManager.prototype.getWishType = function (id) {
        return this.data.get(id).WishType;
    };
    /**根据累计次数奖励ID获取累计抽卡次数 */
    CumulativeCardManager.prototype.getCumulativeCardDrawingTimes = function (id) {
        return this.data.get(id).CumulativeCardDrawingTimes;
    };
    /**根据累计次数奖励ID获取道具ID */
    CumulativeCardManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据累计次数奖励ID获取数量 */
    CumulativeCardManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /** 静态方法，获取最大的 累计次数奖励ID*/
    CumulativeCardManager.getMaxCumulativeRewardID = function () {
        return 2050;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 根据许愿池类型获取累计奖励列表
     * @param type
     * @returns
     */
    CumulativeCardManager.prototype.getWishingRewardList = function (type) {
        var arr = new Array();
        this.data.forEach(function (v, k) {
            if (v.WishType == type) {
                arr.push(v);
            }
        });
        return arr;
    };
    CumulativeCardManager._instance = null;
    return CumulativeCardManager;
}());
exports.CumulativeCardManager = CumulativeCardManager;

cc._RF.pop();