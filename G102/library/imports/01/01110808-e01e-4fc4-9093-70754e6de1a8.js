"use strict";
cc._RF.push(module, '01110gI4B5PxJCTcHVObeGo', 'HeroAttribute');
// Scripts/Hero/Data/HeroAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroAttributeManager = exports.JsonHeroAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroAttribute = /** @class */ (function () {
    function JsonHeroAttribute() {
        /**属性ID */
        this.Attribute_ID = 0;
        /**绑定英雄ID */
        this.Hero_ID = 0;
        /**星级 */
        this.Star = 0;
        /**阶段 */
        this.Stage = 0;
        /**基础生命值 */
        this.BaseHealth = 0;
        /**基础攻击力 */
        this.BaseAttack = 0;
        /**基础防御力 */
        this.BaseDefense = 0;
        /**成长生命值 */
        this.GrowthHealth = 0;
        /**成长攻击力 */
        this.GrowthAttack = 0;
        /**成长防御力 */
        this.GrowthDefense = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
    }
    return JsonHeroAttribute;
}());
exports.JsonHeroAttribute = JsonHeroAttribute;
var HeroAttributeManager = /** @class */ (function () {
    function HeroAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Attribute_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroAttributeManager.prototype.getJsonHeroAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据属性ID获取绑定英雄ID */
    HeroAttributeManager.prototype.getHero_ID = function (id) {
        return this.data.get(id).Hero_ID;
    };
    /**根据属性ID获取星级 */
    HeroAttributeManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据属性ID获取阶段 */
    HeroAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据属性ID获取基础生命值 */
    HeroAttributeManager.prototype.getBaseHealth = function (id) {
        return this.data.get(id).BaseHealth;
    };
    /**根据属性ID获取基础攻击力 */
    HeroAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据属性ID获取基础防御力 */
    HeroAttributeManager.prototype.getBaseDefense = function (id) {
        return this.data.get(id).BaseDefense;
    };
    /**根据属性ID获取成长生命值 */
    HeroAttributeManager.prototype.getGrowthHealth = function (id) {
        return this.data.get(id).GrowthHealth;
    };
    /**根据属性ID获取成长攻击力 */
    HeroAttributeManager.prototype.getGrowthAttack = function (id) {
        return this.data.get(id).GrowthAttack;
    };
    /**根据属性ID获取成长防御力 */
    HeroAttributeManager.prototype.getGrowthDefense = function (id) {
        return this.data.get(id).GrowthDefense;
    };
    /**根据属性ID获取命中值 */
    HeroAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据属性ID获取闪避值 */
    HeroAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据属性ID获取暴击值 */
    HeroAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据属性ID获取防暴值 */
    HeroAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据属性ID获取暴击增幅 */
    HeroAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据属性ID获取暴击抗性 */
    HeroAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 属性ID*/
    HeroAttributeManager.getMaxAttribute_ID = function () {
        return 12026;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    HeroAttributeManager.getId = function (heroType, heroStage) {
        return heroType * 1000 + heroStage;
    };
    /**根据英雄类型和阶段获取星级 */
    HeroAttributeManager.prototype.getStarByHeroTypeAndStage = function (heroType, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (heroType == v.Hero_ID && heroStage == v.Stage) {
                info = v;
            }
        });
        if (info == null)
            return 0;
        return info.Star;
    };
    HeroAttributeManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (heroType == v.Hero_ID && heroStage == v.Stage) {
                info = v;
            }
        });
        return info;
    };
    HeroAttributeManager._instance = null;
    return HeroAttributeManager;
}());
exports.HeroAttributeManager = HeroAttributeManager;

cc._RF.pop();