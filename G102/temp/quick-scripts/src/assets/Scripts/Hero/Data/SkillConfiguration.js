"use strict";
cc._RF.push(module, '8ecacTDIKZOjoAn3utO9WRn', 'SkillConfiguration');
// Scripts/Hero/Data/SkillConfiguration.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillConfigurationManager = exports.JsonSkillConfiguration = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSkillConfiguration = /** @class */ (function () {
    function JsonSkillConfiguration() {
        /**技能ID */
        this.Skill = 0;
        /**绑定英雄 */
        this.BindHero = 0;
        /**技能槽位 */
        this.SkillPosition = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**冷却时间 */
        this.ColdDown = 0;
        /**技能参数1 */
        this.SkillValue_1 = 0;
        /**技能参数2 */
        this.SkillValue_2 = 0;
        /**技能参数3 */
        this.SkillValue_3 = 0;
        /**技能参数4 */
        this.SkillValue_4 = 0;
    }
    return JsonSkillConfiguration;
}());
exports.JsonSkillConfiguration = JsonSkillConfiguration;
var SkillConfigurationManager = /** @class */ (function () {
    function SkillConfigurationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SkillConfigurationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkillConfigurationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SkillConfigurationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SkillConfigurationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SkillConfiguration', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSkillConfiguration成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSkillConfiguration();
                jsonData = json[i];
                _this.data.set(jsonData.Skill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SkillConfigurationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SkillConfigurationManager.prototype.getJsonSkillConfiguration = function (id) {
        return this.data.get(id);
    };
    /**根据技能ID获取绑定英雄 */
    SkillConfigurationManager.prototype.getBindHero = function (id) {
        return this.data.get(id).BindHero;
    };
    /**根据技能ID获取技能槽位 */
    SkillConfigurationManager.prototype.getSkillPosition = function (id) {
        return this.data.get(id).SkillPosition;
    };
    /**根据技能ID获取技能等级 */
    SkillConfigurationManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据技能ID获取冷却时间 */
    SkillConfigurationManager.prototype.getColdDown = function (id) {
        return this.data.get(id).ColdDown;
    };
    /**根据技能ID获取技能参数1 */
    SkillConfigurationManager.prototype.getSkillValue_1 = function (id) {
        return this.data.get(id).SkillValue_1;
    };
    /**根据技能ID获取技能参数2 */
    SkillConfigurationManager.prototype.getSkillValue_2 = function (id) {
        return this.data.get(id).SkillValue_2;
    };
    /**根据技能ID获取技能参数3 */
    SkillConfigurationManager.prototype.getSkillValue_3 = function (id) {
        return this.data.get(id).SkillValue_3;
    };
    /**根据技能ID获取技能参数4 */
    SkillConfigurationManager.prototype.getSkillValue_4 = function (id) {
        return this.data.get(id).SkillValue_4;
    };
    /** 静态方法，获取最大的 技能ID*/
    SkillConfigurationManager.getMaxSkill = function () {
        return 12306;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SkillConfigurationManager.prototype.getJsonDataByHeroTypeAndSkillPosAndSkillLevel = function (heroType, sillPos, skillLevel) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.BindHero == heroType && v.SkillPosition == sillPos && v.SkillLevel == skillLevel) {
                info = v;
            }
        });
        return info;
    };
    SkillConfigurationManager.GetSkillId = function (heroType, skillPos, skillLevel) {
        return heroType * 1000 + skillPos * 100 + skillLevel;
    };
    SkillConfigurationManager._instance = null;
    return SkillConfigurationManager;
}());
exports.SkillConfigurationManager = SkillConfigurationManager;

cc._RF.pop();