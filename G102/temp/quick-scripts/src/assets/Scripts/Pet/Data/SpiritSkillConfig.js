"use strict";
cc._RF.push(module, 'a588cWRCllDD63lWOqf4Xkx', 'SpiritSkillConfig');
// Scripts/Pet/Data/SpiritSkillConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritSkillConfigManager = exports.JsonSpiritSkillConfig = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritSkillConfig = /** @class */ (function () {
    function JsonSpiritSkillConfig() {
        /**技能ID */
        this.SkillId = 0;
        /**灵宠ID */
        this.SpiritId = 0;
        /**技能槽位 */
        this.SkillPosition = 0;
        /**冷却时间 */
        this.CoolDown = 0;
        /**释放距离 */
        this.SkillRange = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**技能参数1 */
        this.SkillParameter_1 = 0;
        /**技能参数2 */
        this.SkillParameter_2 = 0;
        /**技能参数3 */
        this.SkillParameter_3 = 0;
    }
    return JsonSpiritSkillConfig;
}());
exports.JsonSpiritSkillConfig = JsonSpiritSkillConfig;
var SpiritSkillConfigManager = /** @class */ (function () {
    function SpiritSkillConfigManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritSkillConfigManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritSkillConfigManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritSkillConfigManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritSkillConfigManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritSkillConfig', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkillConfig成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritSkillConfig();
                jsonData = json[i];
                _this.data.set(jsonData.SkillId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritSkillConfigManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritSkillConfigManager.prototype.getJsonSpiritSkillConfig = function (id) {
        return this.data.get(id);
    };
    /**根据技能ID获取灵宠ID */
    SpiritSkillConfigManager.prototype.getSpiritId = function (id) {
        return this.data.get(id).SpiritId;
    };
    /**根据技能ID获取技能槽位 */
    SpiritSkillConfigManager.prototype.getSkillPosition = function (id) {
        return this.data.get(id).SkillPosition;
    };
    /**根据技能ID获取冷却时间 */
    SpiritSkillConfigManager.prototype.getCoolDown = function (id) {
        return this.data.get(id).CoolDown;
    };
    /**根据技能ID获取释放距离 */
    SpiritSkillConfigManager.prototype.getSkillRange = function (id) {
        return this.data.get(id).SkillRange;
    };
    /**根据技能ID获取技能等级 */
    SpiritSkillConfigManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据技能ID获取技能参数1 */
    SpiritSkillConfigManager.prototype.getSkillParameter_1 = function (id) {
        return this.data.get(id).SkillParameter_1;
    };
    /**根据技能ID获取技能参数2 */
    SpiritSkillConfigManager.prototype.getSkillParameter_2 = function (id) {
        return this.data.get(id).SkillParameter_2;
    };
    /**根据技能ID获取技能参数3 */
    SpiritSkillConfigManager.prototype.getSkillParameter_3 = function (id) {
        return this.data.get(id).SkillParameter_3;
    };
    /** 静态方法，获取最大的 技能ID*/
    SpiritSkillConfigManager.getMaxSkillId = function () {
        return 2143;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param petId 宠物id
     * @param skillSlot 技能槽位
     * @param skillLevel 技能等级
     * @returns
     */
    SpiritSkillConfigManager.getId = function (petId, skillSlot, skillLevel) {
        return petId * 100 + skillSlot * 10 + skillLevel;
    };
    SpiritSkillConfigManager._instance = null;
    return SpiritSkillConfigManager;
}());
exports.SpiritSkillConfigManager = SpiritSkillConfigManager;

cc._RF.pop();