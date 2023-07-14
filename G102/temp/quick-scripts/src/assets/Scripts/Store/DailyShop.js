"use strict";
cc._RF.push(module, '8617fgT1fpCoLRo3W7hqv3L', 'DailyShop');
// Scripts/Store/DailyShop.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyShopManager = exports.JsonDailyShop = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var CommodityInformation_1 = require("./CommodityInformation");
var JsonDailyShop = /** @class */ (function () {
    function JsonDailyShop() {
        /**商店ID */
        this.Shop_ID = 0;
        /**章节 */
        this.chapter = 0;
        /**序号 */
        this.ShopNum = 0;
        /**商店列表 */
        this.Shoplist = [];
    }
    return JsonDailyShop;
}());
exports.JsonDailyShop = JsonDailyShop;
var DailyShopManager = /** @class */ (function () {
    function DailyShopManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DailyShopManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DailyShopManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DailyShopManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DailyShopManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DailyShop', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDailyShop成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDailyShop();
                jsonData = json[i];
                _this.data.set(jsonData.Shop_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DailyShopManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DailyShopManager.prototype.getJsonDailyShop = function (id) {
        return this.data.get(id);
    };
    /**根据商店ID获取章节 */
    DailyShopManager.prototype.getchapter = function (id) {
        return this.data.get(id).chapter;
    };
    /**根据商店ID获取序号 */
    DailyShopManager.prototype.getShopNum = function (id) {
        return this.data.get(id).ShopNum;
    };
    /**根据商店ID获取商店列表 */
    DailyShopManager.prototype.getShoplist = function (id) {
        return this.data.get(id).Shoplist;
    };
    /** 静态方法，获取最大的 商店ID*/
    DailyShopManager.getMaxShop_ID = function () {
        return 10003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DailyShopManager.prototype.getJsonDataByChapterAndInde = function (chapter, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.chapter == chapter && v.ShopNum == index) {
                info = v;
            }
        });
        return info;
    };
    DailyShopManager.prototype.check = function () {
        this.data.forEach(function (v, k) {
            for (var i = 0; i < v.Shoplist.length; i++) {
                var shopId = v.Shoplist[i];
                if (!CommodityInformation_1.CommodityInformationManager.getInstance().getJsonCommodityInformation(shopId)) {
                    cc.error("不存在商店id：" + shopId);
                }
            }
        });
    };
    DailyShopManager._instance = null;
    return DailyShopManager;
}());
exports.DailyShopManager = DailyShopManager;

cc._RF.pop();