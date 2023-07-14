"use strict";
cc._RF.push(module, '908bfXkOhhCeofEZ1BFgDUu', 'RogueShop');
// Scripts/copy/endlesschallenges/RogueShop.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueShopManager = exports.JsonRogueShop = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueShop = /** @class */ (function () {
    function JsonRogueShop() {
        /**展示位 */
        this.ShowLoacl = 0;
        /**道具ID */
        this.Prop_ID = 0;
        /**道具数量 */
        this.Prop_Num = 0;
        /**花费代币数量 */
        this.CostNum = 0;
    }
    return JsonRogueShop;
}());
exports.JsonRogueShop = JsonRogueShop;
var RogueShopManager = /** @class */ (function () {
    function RogueShopManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueShopManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueShopManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueShopManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueShopManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueShop', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueShop成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueShop();
                jsonData = json[i];
                _this.data.set(jsonData.ShowLoacl, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueShopManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueShopManager.prototype.getJsonRogueShop = function (id) {
        return this.data.get(id);
    };
    /**根据展示位获取道具ID */
    RogueShopManager.prototype.getProp_ID = function (id) {
        return this.data.get(id).Prop_ID;
    };
    /**根据展示位获取道具数量 */
    RogueShopManager.prototype.getProp_Num = function (id) {
        return this.data.get(id).Prop_Num;
    };
    /**根据展示位获取花费代币数量 */
    RogueShopManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /** 静态方法，获取最大的 展示位*/
    RogueShopManager.getMaxShowLoacl = function () {
        return 13;
    };
    RogueShopManager._instance = null;
    return RogueShopManager;
}());
exports.RogueShopManager = RogueShopManager;

cc._RF.pop();