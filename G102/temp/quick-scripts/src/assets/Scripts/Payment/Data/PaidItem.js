"use strict";
cc._RF.push(module, '6d38bOhjzxImLOml1nG9Njk', 'PaidItem');
// Scripts/Payment/Data/PaidItem.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaidItemManager = exports.JsonPaidItem = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonPaidItem = /** @class */ (function () {
    function JsonPaidItem() {
        /**付费项id */
        this.PaidItemId = '';
        /**付费类型 */
        this.PurchaseType = 0;
        /**付费项名称 */
        this.PaidItemTitle = 0;
        /**价格 */
        this.Price = 0;
    }
    return JsonPaidItem;
}());
exports.JsonPaidItem = JsonPaidItem;
var PaidItemManager = /** @class */ (function () {
    function PaidItemManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PaidItemManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PaidItemManager();
        }
        return this._instance;
    };
    //加载json
    PaidItemManager.prototype.loadJson = function (callback) {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PaidItem', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPaidItem成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPaidItem();
                jsonData = json[i];
                _this.data.set(jsonData.PaidItemId, jsonData);
            }
            _this.is_load_completed = true;
            if (callback) {
                callback();
            }
        });
    };
    /**加载是否完成 */
    PaidItemManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PaidItemManager.prototype.getJsonPaidItem = function (id) {
        return this.data.get(id);
    };
    /**根据付费项id获取付费类型 */
    PaidItemManager.prototype.getPurchaseType = function (id) {
        return this.data.get(id).PurchaseType;
    };
    /**根据付费项id获取付费项名称 */
    PaidItemManager.prototype.getPaidItemTitle = function (id) {
        return this.data.get(id).PaidItemTitle;
    };
    /**根据付费项id获取价格 */
    PaidItemManager.prototype.getPrice = function (id) {
        return this.data.get(id).Price;
    };
    /** 静态方法，获取最大的 付费项id*/
    PaidItemManager.getMaxPaidItemId = function () {
        return 'b501';
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PaidItemManager.prototype.getData = function () {
        return this.data;
    };
    PaidItemManager._instance = null;
    return PaidItemManager;
}());
exports.PaidItemManager = PaidItemManager;

cc._RF.pop();