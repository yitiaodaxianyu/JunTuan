"use strict";
cc._RF.push(module, '8eedaEMXZ5GKrRMs54qyGka', 'SpiritSkill');
// Scripts/Pet/Data/SpiritSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritSkillManager = exports.JsonSpiritSkill = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritSkill = /** @class */ (function () {
    function JsonSpiritSkill() {
        /**灵宠技能 */
        this.SpiritSkill = 0;
        /**灵宠种类 */
        this.SpiritType = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**冷却时间 */
        this.CoolDown = 0;
        /**技能参数1 */
        this.SkillParameter_1 = 0;
        /**技能参数2 */
        this.SkillParameter_2 = 0;
        /**技能参数3 */
        this.SkillParameter_3 = 0;
    }
    return JsonSpiritSkill;
}());
exports.JsonSpiritSkill = JsonSpiritSkill;
var SpiritSkillManager = /** @class */ (function () {
    function SpiritSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritSkill();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritSkill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritSkillManager.prototype.getJsonSpiritSkill = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠技能获取灵宠种类 */
    SpiritSkillManager.prototype.getSpiritType = function (id) {
        return this.data.get(id).SpiritType;
    };
    /**根据灵宠技能获取技能等级 */
    SpiritSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据灵宠技能获取冷却时间 */
    SpiritSkillManager.prototype.getCoolDown = function (id) {
        return this.data.get(id).CoolDown;
    };
    /**根据灵宠技能获取技能参数1 */
    SpiritSkillManager.prototype.getSkillParameter_1 = function (id) {
        return this.data.get(id).SkillParameter_1;
    };
    /**根据灵宠技能获取技能参数2 */
    SpiritSkillManager.prototype.getSkillParameter_2 = function (id) {
        return this.data.get(id).SkillParameter_2;
    };
    /**根据灵宠技能获取技能参数3 */
    SpiritSkillManager.prototype.getSkillParameter_3 = function (id) {
        return this.data.get(id).SkillParameter_3;
    };
    /** 静态方法，获取最大的 灵宠技能*/
    SpiritSkillManager.getMaxSpiritSkill = function () {
        return 403;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritSkillManager.prototype.getJsonByTypeAndLevel = function (type, level) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (type == v.SpiritType && level == v.SkillLevel) {
                info = v;
            }
        });
        return info;
    };
    SpiritSkillManager.prototype.getSkillId = function (type, level) {
        return type * 100 + level;
    };
    SpiritSkillManager._instance = null;
    return SpiritSkillManager;
}());
exports.SpiritSkillManager = SpiritSkillManager;

cc._RF.pop();