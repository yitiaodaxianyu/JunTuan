"use strict";
cc._RF.push(module, '0af994C6VdP0bEWHrQB56Mi', 'CumulativeRecharges');
// Scripts/AccumulatedRecharge/CumulativeRecharges.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeRechargesManager = exports.JsonCumulativeRecharges = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var LoadManager_1 = require("../Loading/LoadManager");
var EventManager_1 = require("../Tools/EventManager");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var JsonCumulativeRecharges = /** @class */ (function () {
    function JsonCumulativeRecharges() {
        /**累计充值ID */
        this.CumulativeRechargeID = 0;
        /**累计充值钻石 */
        this.DiamondRechargePrice = 0;
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
    return JsonCumulativeRecharges;
}());
exports.JsonCumulativeRecharges = JsonCumulativeRecharges;
var CumulativeRechargesManager = /** @class */ (function () {
    function CumulativeRechargesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        // 数据
        this.rewardMap = new Map(); // k id标识，v 对应状态标记 0,1,2
    }
    CumulativeRechargesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeRechargesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeRechargesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeRechargesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeRecharges', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharges成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeRecharges();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeRechargesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeRechargesManager.prototype.getJsonCumulativeRecharges = function (id) {
        return this.data.get(id);
    };
    /**根据累计充值ID获取累计充值钻石 */
    CumulativeRechargesManager.prototype.getDiamondRechargePrice = function (id) {
        return this.data.get(id).DiamondRechargePrice;
    };
    /**根据累计充值ID获取道具1ID */
    CumulativeRechargesManager.prototype.getItem1_ID = function (id) {
        return this.data.get(id).Item1_ID;
    };
    /**根据累计充值ID获取道具1数量 */
    CumulativeRechargesManager.prototype.getItem1_Num = function (id) {
        return this.data.get(id).Item1_Num;
    };
    /**根据累计充值ID获取道具2ID */
    CumulativeRechargesManager.prototype.getItem2_ID = function (id) {
        return this.data.get(id).Item2_ID;
    };
    /**根据累计充值ID获取道具2数量 */
    CumulativeRechargesManager.prototype.getItem2_Num = function (id) {
        return this.data.get(id).Item2_Num;
    };
    /**根据累计充值ID获取道具3ID */
    CumulativeRechargesManager.prototype.getItem3_ID = function (id) {
        return this.data.get(id).Item3_ID;
    };
    /**根据累计充值ID获取道具3数量 */
    CumulativeRechargesManager.prototype.getItem3_Num = function (id) {
        return this.data.get(id).Item3_Num;
    };
    /** 静态方法，获取最大的 累计充值ID*/
    CumulativeRechargesManager.getMaxCumulativeRechargeID = function () {
        return 80001;
    };
    CumulativeRechargesManager.prototype.refreshData = function () {
        var _this = this;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, this.getCumulativeRechargeJsonString()).then(function (data) {
            if (data) {
                _this.rewardMap = new Map();
                if (data.length == 0) {
                    _this.data.forEach(function (v, k) {
                        if (UserInfo_1.UserInfo.getInstance().payGem >= v.DiamondRechargePrice) {
                            _this.rewardMap.set(v.CumulativeRechargeID, 1);
                        }
                        else {
                            _this.rewardMap.set(v.CumulativeRechargeID, 0);
                        }
                    });
                }
                else {
                    _this.data.forEach(function (v, k) {
                        if (UserInfo_1.UserInfo.getInstance().payGem >= v.DiamondRechargePrice) {
                            _this.rewardMap.set(v.CumulativeRechargeID, 1);
                        }
                        else {
                            _this.rewardMap.set(v.CumulativeRechargeID, 0);
                        }
                        // if(this.rewardMap.has(v.CumulativeRechargeID) == false){
                        // }
                    });
                    for (var i = 0; i < data.length; i++) {
                        _this.rewardMap.set(Number(data[i].playLevel), 2);
                    }
                }
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_LeiChong);
            }
        });
    };
    CumulativeRechargesManager.prototype.modifyData = function (message) {
        this.rewardMap.set(message.CumulativeRechargeID, 2);
    };
    CumulativeRechargesManager.prototype.getCumulativeRechargeJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            createTime: '',
            id: '',
            playLevel: '',
            rewardType: 6,
            uid: uid,
        });
    };
    CumulativeRechargesManager._instance = null;
    return CumulativeRechargesManager;
}());
exports.CumulativeRechargesManager = CumulativeRechargesManager;

cc._RF.pop();