"use strict";
cc._RF.push(module, '13e16ihZzhKvJTJc8v5hVZf', 'ChapterPack');
// Scripts/Store/ChapterPack.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterPackManager = exports.JsonChapterPack = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonChapterPack = /** @class */ (function () {
    function JsonChapterPack() {
        /**礼包ID */
        this.GiftID = 0;
        /**章节 */
        this.Chapter = 0;
        /**礼包名称 */
        this.Giftname = 0;
        /**金币数量 */
        this.GetCoinNum = 0;
        /**钻石数量 */
        this.GetGemNum = 0;
        /**道具1ID */
        this.ItemId_1 = 0;
        /**道具1数量 */
        this.ItemNum_1 = 0;
        /**道具2ID */
        this.ItemId_2 = 0;
        /**道具2数量 */
        this.ItemNum_2 = 0;
        /**初始价格 */
        this.InitialPrice = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonChapterPack;
}());
exports.JsonChapterPack = JsonChapterPack;
var ChapterPackManager = /** @class */ (function () {
    function ChapterPackManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ChapterPackManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ChapterPackManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ChapterPackManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ChapterPackManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ChapterPack', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonChapterPack成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonChapterPack();
                jsonData = json[i];
                _this.data.set(jsonData.GiftID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ChapterPackManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ChapterPackManager.prototype.getJsonChapterPack = function (id) {
        return this.data.get(id);
    };
    /**根据礼包ID获取章节 */
    ChapterPackManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据礼包ID获取礼包名称 */
    ChapterPackManager.prototype.getGiftname = function (id) {
        return this.data.get(id).Giftname;
    };
    /**根据礼包ID获取金币数量 */
    ChapterPackManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据礼包ID获取钻石数量 */
    ChapterPackManager.prototype.getGetGemNum = function (id) {
        return this.data.get(id).GetGemNum;
    };
    /**根据礼包ID获取道具1ID */
    ChapterPackManager.prototype.getItemId_1 = function (id) {
        return this.data.get(id).ItemId_1;
    };
    /**根据礼包ID获取道具1数量 */
    ChapterPackManager.prototype.getItemNum_1 = function (id) {
        return this.data.get(id).ItemNum_1;
    };
    /**根据礼包ID获取道具2ID */
    ChapterPackManager.prototype.getItemId_2 = function (id) {
        return this.data.get(id).ItemId_2;
    };
    /**根据礼包ID获取道具2数量 */
    ChapterPackManager.prototype.getItemNum_2 = function (id) {
        return this.data.get(id).ItemNum_2;
    };
    /**根据礼包ID获取初始价格 */
    ChapterPackManager.prototype.getInitialPrice = function (id) {
        return this.data.get(id).InitialPrice;
    };
    /**根据礼包ID获取谷歌计费ID */
    ChapterPackManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 礼包ID*/
    ChapterPackManager.getMaxGiftID = function () {
        return 1001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ChapterPackManager.prototype.getJsonData = function () {
        return this.data;
    };
    ChapterPackManager._instance = null;
    return ChapterPackManager;
}());
exports.ChapterPackManager = ChapterPackManager;

cc._RF.pop();