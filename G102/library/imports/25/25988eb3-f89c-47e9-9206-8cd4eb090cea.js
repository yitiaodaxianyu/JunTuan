"use strict";
cc._RF.push(module, '259886z+JxH6ZIGjNTrCQzq', 'PrivilegedCardInformation');
// Scripts/Payment/Data/PrivilegedCardInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegedCardInformationManager = exports.JsonPrivilegedCardInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonPrivilegedCardInformation = /** @class */ (function () {
    function JsonPrivilegedCardInformation() {
        /**尊享卡ID */
        this.PrivilegedCardID = 0;
        /**尊享卡类型 */
        this.PrivilegedCard = 0;
        /**文本 */
        this.PrivilegedCardText = 0;
        /**立即获得钻石数量 */
        this.GetDiamondsNowNum = 0;
        /**每天可领取钻石数量 */
        this.ReceiveDiamondsEveryDayNum = 0;
        /**累计获得钻石数量 */
        this.CumulativeGetDiamonds = 0;
        /**获得特权组ID */
        this.GainPrivileges = [];
        /**特权参数 */
        this.PrivilegeParameters = [];
        /**特权组文本ID */
        this.PrivilegeText = [];
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonPrivilegedCardInformation;
}());
exports.JsonPrivilegedCardInformation = JsonPrivilegedCardInformation;
var PrivilegedCardInformationManager = /** @class */ (function () {
    function PrivilegedCardInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PrivilegedCardInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PrivilegedCardInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PrivilegedCardInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    PrivilegedCardInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PrivilegedCardInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPrivilegedCardInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPrivilegedCardInformation();
                jsonData = json[i];
                _this.data.set(jsonData.PrivilegedCardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    PrivilegedCardInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PrivilegedCardInformationManager.prototype.getJsonPrivilegedCardInformation = function (id) {
        return this.data.get(id);
    };
    /**根据尊享卡ID获取尊享卡类型 */
    PrivilegedCardInformationManager.prototype.getPrivilegedCard = function (id) {
        return this.data.get(id).PrivilegedCard;
    };
    /**根据尊享卡ID获取文本 */
    PrivilegedCardInformationManager.prototype.getPrivilegedCardText = function (id) {
        return this.data.get(id).PrivilegedCardText;
    };
    /**根据尊享卡ID获取立即获得钻石数量 */
    PrivilegedCardInformationManager.prototype.getGetDiamondsNowNum = function (id) {
        return this.data.get(id).GetDiamondsNowNum;
    };
    /**根据尊享卡ID获取每天可领取钻石数量 */
    PrivilegedCardInformationManager.prototype.getReceiveDiamondsEveryDayNum = function (id) {
        return this.data.get(id).ReceiveDiamondsEveryDayNum;
    };
    /**根据尊享卡ID获取累计获得钻石数量 */
    PrivilegedCardInformationManager.prototype.getCumulativeGetDiamonds = function (id) {
        return this.data.get(id).CumulativeGetDiamonds;
    };
    /**根据尊享卡ID获取获得特权组ID */
    PrivilegedCardInformationManager.prototype.getGainPrivileges = function (id) {
        return this.data.get(id).GainPrivileges;
    };
    /**根据尊享卡ID获取特权参数 */
    PrivilegedCardInformationManager.prototype.getPrivilegeParameters = function (id) {
        return this.data.get(id).PrivilegeParameters;
    };
    /**根据尊享卡ID获取特权组文本ID */
    PrivilegedCardInformationManager.prototype.getPrivilegeText = function (id) {
        return this.data.get(id).PrivilegeText;
    };
    /**根据尊享卡ID获取谷歌计费ID */
    PrivilegedCardInformationManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 尊享卡ID*/
    PrivilegedCardInformationManager.getMaxPrivilegedCardID = function () {
        return 2001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PrivilegedCardInformationManager.prototype.getData = function () {
        return this.data;
    };
    PrivilegedCardInformationManager._instance = null;
    return PrivilegedCardInformationManager;
}());
exports.PrivilegedCardInformationManager = PrivilegedCardInformationManager;

cc._RF.pop();