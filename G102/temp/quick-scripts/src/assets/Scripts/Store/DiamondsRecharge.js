"use strict";
cc._RF.push(module, '79ffaJkq6pDpJJjWJ9dZh72', 'DiamondsRecharge');
// Scripts/Store/DiamondsRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondsRechargeManager = exports.JsonDiamondsRecharge = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDiamondsRecharge = /** @class */ (function () {
    function JsonDiamondsRecharge() {
        /**充值ID */
        this.RechargeID = 0;
        /**钻石数量 */
        this.DiamondsNum = 0;
        /**首充赠送钻石数量 */
        this.GetDiamondsNum = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonDiamondsRecharge;
}());
exports.JsonDiamondsRecharge = JsonDiamondsRecharge;
var DiamondsRechargeManager = /** @class */ (function () {
    function DiamondsRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DiamondsRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DiamondsRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DiamondsRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DiamondsRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DiamondsRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDiamondsRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDiamondsRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.RechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DiamondsRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DiamondsRechargeManager.prototype.getJsonDiamondsRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据充值ID获取钻石数量 */
    DiamondsRechargeManager.prototype.getDiamondsNum = function (id) {
        return this.data.get(id).DiamondsNum;
    };
    /**根据充值ID获取首充赠送钻石数量 */
    DiamondsRechargeManager.prototype.getGetDiamondsNum = function (id) {
        return this.data.get(id).GetDiamondsNum;
    };
    /**根据充值ID获取谷歌计费ID */
    DiamondsRechargeManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 充值ID*/
    DiamondsRechargeManager.getMaxRechargeID = function () {
        return 6;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DiamondsRechargeManager.prototype.getJsonData = function () {
        return this.data;
    };
    DiamondsRechargeManager._instance = null;
    return DiamondsRechargeManager;
}());
exports.DiamondsRechargeManager = DiamondsRechargeManager;

cc._RF.pop();