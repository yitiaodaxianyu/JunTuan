"use strict";
cc._RF.push(module, '4fa24UGiqtFv6KwZJEiFAI+', 'CumulativeRecharge');
// Scripts/Payment/Data/CumulativeRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeRechargeManager = exports.JsonCumulativeRecharge = void 0;
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var LoadManager_1 = require("../../Loading/LoadManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var JsonCumulativeRecharge = /** @class */ (function () {
    function JsonCumulativeRecharge() {
        /**累计充值ID */
        this.CumulativeRechargeID = 0;
        /**显示顺序 */
        this.DisplayOrder = 0;
        /**累计充值价格 */
        this.CumulativeRechargePrice = 0;
        /**金币数量 */
        this.GetCoin = 0;
        /**钻石数量 */
        this.GetGem = 0;
        /**道具1ID */
        this.Item1_ID = 0;
        /**道具1数量 */
        this.Item1_Num = 0;
        /**道具2ID */
        this.Item2_ID = 0;
        /**道具2数量 */
        this.Item2_Num = 0;
        /**道具3ID */
        this.Item3_ID = 0;
        /**道具3数量 */
        this.Item3_Num = 0;
    }
    return JsonCumulativeRecharge;
}());
exports.JsonCumulativeRecharge = JsonCumulativeRecharge;
var CumulativeRechargeManager = /** @class */ (function () {
    function CumulativeRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CumulativeRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeRechargeManager.prototype.getJsonCumulativeRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据累计充值ID获取显示顺序 */
    CumulativeRechargeManager.prototype.getDisplayOrder = function (id) {
        return this.data.get(id).DisplayOrder;
    };
    /**根据累计充值ID获取累计充值价格 */
    CumulativeRechargeManager.prototype.getCumulativeRechargePrice = function (id) {
        return this.data.get(id).CumulativeRechargePrice;
    };
    /**根据累计充值ID获取金币数量 */
    CumulativeRechargeManager.prototype.getGetCoin = function (id) {
        return this.data.get(id).GetCoin;
    };
    /**根据累计充值ID获取钻石数量 */
    CumulativeRechargeManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据累计充值ID获取道具1ID */
    CumulativeRechargeManager.prototype.getItem1_ID = function (id) {
        return this.data.get(id).Item1_ID;
    };
    /**根据累计充值ID获取道具1数量 */
    CumulativeRechargeManager.prototype.getItem1_Num = function (id) {
        return this.data.get(id).Item1_Num;
    };
    /**根据累计充值ID获取道具2ID */
    CumulativeRechargeManager.prototype.getItem2_ID = function (id) {
        return this.data.get(id).Item2_ID;
    };
    /**根据累计充值ID获取道具2数量 */
    CumulativeRechargeManager.prototype.getItem2_Num = function (id) {
        return this.data.get(id).Item2_Num;
    };
    /**根据累计充值ID获取道具3ID */
    CumulativeRechargeManager.prototype.getItem3_ID = function (id) {
        return this.data.get(id).Item3_ID;
    };
    /**根据累计充值ID获取道具3数量 */
    CumulativeRechargeManager.prototype.getItem3_Num = function (id) {
        return this.data.get(id).Item3_Num;
    };
    /** 静态方法，获取最大的 累计充值ID*/
    CumulativeRechargeManager.getMaxCumulativeRechargeID = function () {
        return 80001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得奖励列表数据
     * @param total 总共充值龙晶的数量
     * @returns 奖励列表数据
     */
    CumulativeRechargeManager.prototype.getRewardData = function (id) {
        var rewardDatas = new Array();
        var jsonData = this.getJsonCumulativeRecharge(id);
        if (jsonData.GetCoin > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Coin;
            rd.reward_num = jsonData.GetCoin;
            rewardDatas.push(rd);
        }
        if (jsonData.GetGem > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Gem;
            rd.reward_num = jsonData.GetGem;
            rewardDatas.push(rd);
        }
        for (var i = 1; i <= 3; i++) {
            var id_1 = 'Item' + i + '_ID';
            if (jsonData[id_1] > 0) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = jsonData[id_1];
                rd.reward_num = jsonData['Item' + i + '_Num'];
                rewardDatas.push(rd);
            }
        }
        return rewardDatas;
    };
    CumulativeRechargeManager.prototype.getId = function (total) {
        var id = 0;
        var isFind = false;
        this.data.forEach(function (v, k) {
            if (!isFind && total < v.CumulativeRechargePrice) {
                id = v.CumulativeRechargeID;
                isFind = true;
            }
        });
        return id;
    };
    CumulativeRechargeManager.prototype.getData = function () {
        return this.data;
    };
    CumulativeRechargeManager._instance = null;
    return CumulativeRechargeManager;
}());
exports.CumulativeRechargeManager = CumulativeRechargeManager;

cc._RF.pop();