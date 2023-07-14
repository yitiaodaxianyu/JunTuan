"use strict";
cc._RF.push(module, '4eff3yAdfdBXavuuXD3KAMt', 'HeroQuality');
// Scripts/Hero/Data/HeroQuality.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroQualityManager = exports.JsonHeroQuality = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroQuality = /** @class */ (function () {
    function JsonHeroQuality() {
        /**星级养成ID */
        this.StarCultivateID = 0;
        /**英雄品质 */
        this.Quality = 0;
        /**阶段 */
        this.Stage = 0;
        /**星级 */
        this.Star = 0;
        /**当前阶段 */
        this.CurrentStage = 0;
        /**消耗碎片数量 */
        this.CostFragment = 0;
    }
    return JsonHeroQuality;
}());
exports.JsonHeroQuality = JsonHeroQuality;
var HeroQualityManager = /** @class */ (function () {
    function HeroQualityManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroQualityManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroQualityManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroQualityManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroQualityManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroQuality', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroQuality成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroQuality();
                jsonData = json[i];
                _this.data.set(jsonData.StarCultivateID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroQualityManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroQualityManager.prototype.getJsonHeroQuality = function (id) {
        return this.data.get(id);
    };
    /**根据星级养成ID获取英雄品质 */
    HeroQualityManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据星级养成ID获取阶段 */
    HeroQualityManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据星级养成ID获取星级 */
    HeroQualityManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据星级养成ID获取当前阶段 */
    HeroQualityManager.prototype.getCurrentStage = function (id) {
        return this.data.get(id).CurrentStage;
    };
    /**根据星级养成ID获取消耗碎片数量 */
    HeroQualityManager.prototype.getCostFragment = function (id) {
        return this.data.get(id).CostFragment;
    };
    /** 静态方法，获取最大的 星级养成ID*/
    HeroQualityManager.getMaxStarCultivateID = function () {
        return 6029;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**通过英雄类型和英雄阶段获取英雄升星的消耗道具数量 */
    HeroQualityManager.prototype.getCostDebrisByHeroQualityAndStage = function (heroQuality, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.Quality == heroQuality && v.Stage == heroStage) {
                info = v;
            }
        });
        if (info == null)
            return 0;
        return info.CostFragment;
    };
    HeroQualityManager._instance = null;
    return HeroQualityManager;
}());
exports.HeroQualityManager = HeroQualityManager;

cc._RF.pop();