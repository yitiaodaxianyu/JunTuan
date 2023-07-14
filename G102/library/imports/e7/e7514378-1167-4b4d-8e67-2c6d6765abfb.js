"use strict";
cc._RF.push(module, 'e7514N4EWdLTY5nLG1nZav7', 'Item');
// Scripts/Prop/Data/Item.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemManager = exports.JsonItem = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonItem = /** @class */ (function () {
    function JsonItem() {
        /**ID */
        this.ItemID = 0;
        /**名称文本 */
        this.NameTextId = 0;
        /**道具描述 */
        this.DiscripitionTextId = 0;
        /**类型 */
        this.Type = 0;
        /**品质框 */
        this.Quality = 0;
        /**星级 */
        this.Star = 0;
        /**引用图标 */
        this.QuoteIcon = 0;
    }
    return JsonItem;
}());
exports.JsonItem = JsonItem;
var ItemManager = /** @class */ (function () {
    function ItemManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ItemManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ItemManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ItemManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ItemManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('Item', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonItem成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonItem();
                jsonData = json[i];
                _this.data.set(jsonData.ItemID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ItemManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ItemManager.prototype.getJsonItem = function (id) {
        return this.data.get(id);
    };
    /**根据ID获取名称文本 */
    ItemManager.prototype.getNameTextId = function (id) {
        return this.data.get(id).NameTextId;
    };
    /**根据ID获取道具描述 */
    ItemManager.prototype.getDiscripitionTextId = function (id) {
        return this.data.get(id).DiscripitionTextId;
    };
    /**根据ID获取类型 */
    ItemManager.prototype.getType = function (id) {
        return this.data.get(id).Type;
    };
    /**根据ID获取品质框 */
    ItemManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据ID获取星级 */
    ItemManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据ID获取引用图标 */
    ItemManager.prototype.getQuoteIcon = function (id) {
        return this.data.get(id).QuoteIcon;
    };
    /** 静态方法，获取最大的 ID*/
    ItemManager.getMaxItemID = function () {
        return 110012;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ItemManager.prototype.getPropIdList = function () {
        var idList = new Array();
        this.data.forEach(function (jsonData, key) {
            if (jsonData.Type != 9) {
                idList.push(jsonData.ItemID);
            }
        });
        return idList;
    };
    ItemManager._instance = null;
    return ItemManager;
}());
exports.ItemManager = ItemManager;

cc._RF.pop();