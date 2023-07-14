"use strict";
cc._RF.push(module, '63c56t90mxElL6v+2t5o5JU', 'HeroTitle');
// Scripts/Hero/Data/HeroTitle.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroTitleManager = exports.JsonHeroTitle = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroTitle = /** @class */ (function () {
    function JsonHeroTitle() {
        /**英雄称号id */
        this.HeroTitleID = 0;
        /**英雄id */
        this.HeroID = 0;
        /**英雄星级 */
        this.HeroStar = 0;
        /**英雄称号文本 */
        this.HeroTitleText = 0;
    }
    return JsonHeroTitle;
}());
exports.JsonHeroTitle = JsonHeroTitle;
var HeroTitleManager = /** @class */ (function () {
    function HeroTitleManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroTitleManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroTitleManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroTitleManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroTitleManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroTitle', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroTitle成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroTitle();
                jsonData = json[i];
                _this.data.set(jsonData.HeroTitleID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroTitleManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroTitleManager.prototype.getJsonHeroTitle = function (id) {
        return this.data.get(id);
    };
    /**根据英雄称号id获取英雄id */
    HeroTitleManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据英雄称号id获取英雄星级 */
    HeroTitleManager.prototype.getHeroStar = function (id) {
        return this.data.get(id).HeroStar;
    };
    /**根据英雄称号id获取英雄称号文本 */
    HeroTitleManager.prototype.getHeroTitleText = function (id) {
        return this.data.get(id).HeroTitleText;
    };
    /** 静态方法，获取最大的 英雄称号id*/
    HeroTitleManager.getMaxHeroTitleID = function () {
        return 12005;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    HeroTitleManager.prototype.getHeroTitleTextIdByHeroTypeAndHeroStar = function (heroType, star) {
        var data;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.HeroStar == star)
                data = v;
        });
        return data.HeroTitleText;
    };
    HeroTitleManager._instance = null;
    return HeroTitleManager;
}());
exports.HeroTitleManager = HeroTitleManager;

cc._RF.pop();