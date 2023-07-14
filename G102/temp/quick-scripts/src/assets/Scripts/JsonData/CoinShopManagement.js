"use strict";
cc._RF.push(module, 'a7c92oloZxBt6YC0NI5/tff', 'CoinShopManagement');
// Scripts/JsonData/CoinShopManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinShopManagementManager = exports.JsonCoinShopManagement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCoinShopManagement = /** @class */ (function () {
    function JsonCoinShopManagement() {
        /**商店ID */
        this.Shop_ID = 0;
        /**章节 */
        this.chapter = 0;
        /**序号 */
        this.ShopNum = 0;
        /**商店列表 */
        this.Shoplist = [];
    }
    return JsonCoinShopManagement;
}());
exports.JsonCoinShopManagement = JsonCoinShopManagement;
var CoinShopManagementManager = /** @class */ (function () {
    function CoinShopManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CoinShopManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CoinShopManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CoinShopManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CoinShopManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CoinShopManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCoinShopManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCoinShopManagement();
                jsonData = json[i];
                _this.data.set(jsonData.Shop_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CoinShopManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CoinShopManagementManager.prototype.getJsonCoinShopManagement = function (id) {
        return this.data.get(id);
    };
    /**根据商店ID获取章节 */
    CoinShopManagementManager.prototype.getchapter = function (id) {
        return this.data.get(id).chapter;
    };
    /**根据商店ID获取序号 */
    CoinShopManagementManager.prototype.getShopNum = function (id) {
        return this.data.get(id).ShopNum;
    };
    /**根据商店ID获取商店列表 */
    CoinShopManagementManager.prototype.getShoplist = function (id) {
        return this.data.get(id).Shoplist;
    };
    /** 静态方法，获取最大的 商店ID*/
    CoinShopManagementManager.getMaxShop_ID = function () {
        return 10003;
    };
    CoinShopManagementManager._instance = null;
    return CoinShopManagementManager;
}());
exports.CoinShopManagementManager = CoinShopManagementManager;

cc._RF.pop();