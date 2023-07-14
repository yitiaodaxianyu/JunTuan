"use strict";
cc._RF.push(module, '22672rep+1LQZ44Id3DYt3/', 'ExclusiveWeaponSkill');
// Scripts/JsonData/ExclusiveWeaponSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveWeaponSkillManager = exports.JsonExclusiveWeaponSkill = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveWeaponSkill = /** @class */ (function () {
    function JsonExclusiveWeaponSkill() {
        /**专武技能ID */
        this.ExclusiveWeaponSkillID = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**英雄ID */
        this.HeroID = 0;
        /**技能参数1 */
        this.ExclusiveWeaponSkillValue_1 = 0;
        /**技能参数2 */
        this.ExclusiveWeaponSkillValue_2 = 0;
        /**技能参数3 */
        this.ExclusiveWeaponSkillValue_3 = 0;
        /**技能参数4 */
        this.ExclusiveWeaponSkillValue_4 = 0;
    }
    return JsonExclusiveWeaponSkill;
}());
exports.JsonExclusiveWeaponSkill = JsonExclusiveWeaponSkill;
var ExclusiveWeaponSkillManager = /** @class */ (function () {
    function ExclusiveWeaponSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ExclusiveWeaponSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveWeaponSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveWeaponSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveWeaponSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveWeaponSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveWeaponSkill();
                jsonData = json[i];
                _this.data.set(jsonData.ExclusiveWeaponSkillID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveWeaponSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveWeaponSkillManager.prototype.getJsonExclusiveWeaponSkill = function (id) {
        return this.data.get(id);
    };
    /**根据专武技能ID获取技能等级 */
    ExclusiveWeaponSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据专武技能ID获取英雄ID */
    ExclusiveWeaponSkillManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据专武技能ID获取技能参数1 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_1 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_1;
    };
    /**根据专武技能ID获取技能参数2 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_2 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_2;
    };
    /**根据专武技能ID获取技能参数3 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_3 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_3;
    };
    /**根据专武技能ID获取技能参数4 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_4 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_4;
    };
    /** 静态方法，获取最大的 专武技能ID*/
    ExclusiveWeaponSkillManager.getMaxExclusiveWeaponSkillID = function () {
        return 120006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ExclusiveWeaponSkillManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, skillLevel) {
        var info;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.SkillLevel == skillLevel) {
                info = v;
            }
        });
        return info;
    };
    ExclusiveWeaponSkillManager.prototype.getId = function (heroId, skillLevel) {
        return heroId * 10000 + skillLevel;
    };
    ExclusiveWeaponSkillManager._instance = null;
    return ExclusiveWeaponSkillManager;
}());
exports.ExclusiveWeaponSkillManager = ExclusiveWeaponSkillManager;

cc._RF.pop();