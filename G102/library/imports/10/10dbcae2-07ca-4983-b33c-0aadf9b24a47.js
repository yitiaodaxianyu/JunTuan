"use strict";
cc._RF.push(module, '10dbcriB8pJg7M8Cq35skpH', 'WishSpend');
// Scripts/Wish/WishSpend.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishSpendManager = exports.JsonWishSpend = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonWishSpend = /** @class */ (function () {
    function JsonWishSpend() {
        /**许愿池ID */
        this.WishID = 0;
        /**许愿池类型 */
        this.WishType = 0;
        /**章节进度 */
        this.Chapter = 0;
        /**获得奖池集ID */
        this.GetRewardID = 0;
        /**单抽道具ID */
        this.OneDrawPropsID = 0;
        /**单抽道具消耗 */
        this.OneDrawPropsSpend = 0;
        /**单抽钻石消耗 */
        this.OneDrawDiamondsSpend = 0;
        /**十连抽道具消耗 */
        this.TenDrawPropsSpend = 0;
        /**十连抽钻石消耗 */
        this.TenDrawDiamondSpend = 0;
    }
    return JsonWishSpend;
}());
exports.JsonWishSpend = JsonWishSpend;
var WishSpendManager = /** @class */ (function () {
    function WishSpendManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    WishSpendManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WishSpendManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    WishSpendManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    WishSpendManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('WishSpend', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonWishSpend成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonWishSpend();
                jsonData = json[i];
                _this.data.set(jsonData.WishID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    WishSpendManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    WishSpendManager.prototype.getJsonWishSpend = function (id) {
        return this.data.get(id);
    };
    /**根据许愿池ID获取许愿池类型 */
    WishSpendManager.prototype.getWishType = function (id) {
        return this.data.get(id).WishType;
    };
    /**根据许愿池ID获取章节进度 */
    WishSpendManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据许愿池ID获取获得奖池集ID */
    WishSpendManager.prototype.getGetRewardID = function (id) {
        return this.data.get(id).GetRewardID;
    };
    /**根据许愿池ID获取单抽道具ID */
    WishSpendManager.prototype.getOneDrawPropsID = function (id) {
        return this.data.get(id).OneDrawPropsID;
    };
    /**根据许愿池ID获取单抽道具消耗 */
    WishSpendManager.prototype.getOneDrawPropsSpend = function (id) {
        return this.data.get(id).OneDrawPropsSpend;
    };
    /**根据许愿池ID获取单抽钻石消耗 */
    WishSpendManager.prototype.getOneDrawDiamondsSpend = function (id) {
        return this.data.get(id).OneDrawDiamondsSpend;
    };
    /**根据许愿池ID获取十连抽道具消耗 */
    WishSpendManager.prototype.getTenDrawPropsSpend = function (id) {
        return this.data.get(id).TenDrawPropsSpend;
    };
    /**根据许愿池ID获取十连抽钻石消耗 */
    WishSpendManager.prototype.getTenDrawDiamondSpend = function (id) {
        return this.data.get(id).TenDrawDiamondSpend;
    };
    /** 静态方法，获取最大的 许愿池ID*/
    WishSpendManager.getMaxWishID = function () {
        return 2010;
    };
    WishSpendManager._instance = null;
    return WishSpendManager;
}());
exports.WishSpendManager = WishSpendManager;

cc._RF.pop();