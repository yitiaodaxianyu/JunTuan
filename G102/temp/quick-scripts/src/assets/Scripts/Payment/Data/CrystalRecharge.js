"use strict";
cc._RF.push(module, 'e823fkrplZETb11PKGHr67l', 'CrystalRecharge');
// Scripts/Payment/Data/CrystalRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrystalRechargeManager = exports.JsonCrystalRecharge = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonCrystalRecharge = /** @class */ (function () {
    function JsonCrystalRecharge() {
        /**充值ID */
        this.RechargeID = 0;
        /**龙晶数量 */
        this.CrystalQuantity = 0;
        /**首充赠送钻石数量 */
        this.DiamondsQuality = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCrystalRecharge;
}());
exports.JsonCrystalRecharge = JsonCrystalRecharge;
var CrystalRechargeManager = /** @class */ (function () {
    function CrystalRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CrystalRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CrystalRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CrystalRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CrystalRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CrystalRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCrystalRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCrystalRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.RechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CrystalRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CrystalRechargeManager.prototype.getJsonCrystalRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据充值ID获取龙晶数量 */
    CrystalRechargeManager.prototype.getCrystalQuantity = function (id) {
        return this.data.get(id).CrystalQuantity;
    };
    /**根据充值ID获取首充赠送钻石数量 */
    CrystalRechargeManager.prototype.getDiamondsQuality = function (id) {
        return this.data.get(id).DiamondsQuality;
    };
    /**根据充值ID获取谷歌计费ID */
    CrystalRechargeManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 充值ID*/
    CrystalRechargeManager.getMaxRechargeID = function () {
        return 606;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    CrystalRechargeManager.prototype.getData = function () {
        return this.data;
    };
    CrystalRechargeManager._instance = null;
    return CrystalRechargeManager;
}());
exports.CrystalRechargeManager = CrystalRechargeManager;

cc._RF.pop();