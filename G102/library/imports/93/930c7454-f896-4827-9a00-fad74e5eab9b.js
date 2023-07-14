"use strict";
cc._RF.push(module, '930c7RU+JZIJ5oA+tdOXqub', 'OfflineRevenueShow');
// Scripts/Level/OfflineRevenueShow.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineRevenueShowManager = exports.JsonOfflineRevenueShow = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonOfflineRevenueShow = /** @class */ (function () {
    function JsonOfflineRevenueShow() {
        /**通关章节 */
        this.Chapter = 0;
        /**解锁道具 */
        this.UnlockProps = [];
        /**每分钟金币 */
        this.GetCoins = 0;
        /**本章文本 */
        this.ChapterIntroduction = 0;
        /**标题文本ID */
        this.Titletext = 0;
    }
    return JsonOfflineRevenueShow;
}());
exports.JsonOfflineRevenueShow = JsonOfflineRevenueShow;
var OfflineRevenueShowManager = /** @class */ (function () {
    function OfflineRevenueShowManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    OfflineRevenueShowManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new OfflineRevenueShowManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    OfflineRevenueShowManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    OfflineRevenueShowManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('OfflineRevenueShow', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenueShow成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonOfflineRevenueShow();
                jsonData = json[i];
                _this.data.set(jsonData.Chapter, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    OfflineRevenueShowManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    OfflineRevenueShowManager.prototype.getJsonOfflineRevenueShow = function (id) {
        return this.data.get(id);
    };
    /**根据通关章节获取解锁道具 */
    OfflineRevenueShowManager.prototype.getUnlockProps = function (id) {
        return this.data.get(id).UnlockProps;
    };
    /**根据通关章节获取每分钟金币 */
    OfflineRevenueShowManager.prototype.getGetCoins = function (id) {
        return this.data.get(id).GetCoins;
    };
    /**根据通关章节获取本章文本 */
    OfflineRevenueShowManager.prototype.getChapterIntroduction = function (id) {
        return this.data.get(id).ChapterIntroduction;
    };
    /**根据通关章节获取标题文本ID */
    OfflineRevenueShowManager.prototype.getTitletext = function (id) {
        return this.data.get(id).Titletext;
    };
    /** 静态方法，获取最大的 通关章节*/
    OfflineRevenueShowManager.getMaxChapter = function () {
        return 10;
    };
    OfflineRevenueShowManager._instance = null;
    return OfflineRevenueShowManager;
}());
exports.OfflineRevenueShowManager = OfflineRevenueShowManager;

cc._RF.pop();