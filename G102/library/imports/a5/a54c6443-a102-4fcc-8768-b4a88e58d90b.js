"use strict";
cc._RF.push(module, 'a54c6RDoQJPzIdotKiOWNkL', 'ExclusiveEnhancement');
// Scripts/JsonData/ExclusiveEnhancement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveEnhancementManager = exports.JsonExclusiveEnhancement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveEnhancement = /** @class */ (function () {
    function JsonExclusiveEnhancement() {
        /**专武属性ID */
        this.ExclusiveWeapon = 0;
        /**英雄ID */
        this.HeroID = 0;
        /**总阶段 */
        this.SumStage = 0;
        /**星级 */
        this.Star = 0;
        /**当前阶段 */
        this.CurrentStage = 0;
        /**攻击力 */
        this.Attack = 0;
        /**生命值 */
        this.Health = 0;
        /**防御力 */
        this.Defense = 0;
        /**技能等级 */
        this.Stage = 0;
    }
    return JsonExclusiveEnhancement;
}());
exports.JsonExclusiveEnhancement = JsonExclusiveEnhancement;
var ExclusiveEnhancementManager = /** @class */ (function () {
    function ExclusiveEnhancementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ExclusiveEnhancementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveEnhancementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveEnhancementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveEnhancementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveEnhancement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveEnhancement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveEnhancement();
                jsonData = json[i];
                _this.data.set(jsonData.ExclusiveWeapon, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveEnhancementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveEnhancementManager.prototype.getJsonExclusiveEnhancement = function (id) {
        return this.data.get(id);
    };
    /**根据专武属性ID获取英雄ID */
    ExclusiveEnhancementManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据专武属性ID获取总阶段 */
    ExclusiveEnhancementManager.prototype.getSumStage = function (id) {
        return this.data.get(id).SumStage;
    };
    /**根据专武属性ID获取星级 */
    ExclusiveEnhancementManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据专武属性ID获取当前阶段 */
    ExclusiveEnhancementManager.prototype.getCurrentStage = function (id) {
        return this.data.get(id).CurrentStage;
    };
    /**根据专武属性ID获取攻击力 */
    ExclusiveEnhancementManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据专武属性ID获取生命值 */
    ExclusiveEnhancementManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据专武属性ID获取防御力 */
    ExclusiveEnhancementManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据专武属性ID获取技能等级 */
    ExclusiveEnhancementManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /** 静态方法，获取最大的 专武属性ID*/
    ExclusiveEnhancementManager.getMaxExclusiveWeapon = function () {
        return 4016;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ExclusiveEnhancementManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, stage) {
        var info;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.SumStage == stage) {
                info = v;
            }
        });
        return info;
    };
    ExclusiveEnhancementManager.prototype.getId = function (heroId, stage) {
        return heroId * 1000 + stage;
    };
    ExclusiveEnhancementManager._instance = null;
    return ExclusiveEnhancementManager;
}());
exports.ExclusiveEnhancementManager = ExclusiveEnhancementManager;

cc._RF.pop();