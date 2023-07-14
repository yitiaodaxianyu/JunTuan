"use strict";
cc._RF.push(module, 'f9c9cQ4RWFMbKL3034zXKl+', 'SkillLevelUnlock');
// Scripts/Hero/Data/SkillLevelUnlock.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillLevelUnlockManager = exports.JsonSkillLevelUnlock = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSkillLevelUnlock = /** @class */ (function () {
    function JsonSkillLevelUnlock() {
        /**技能槽位 */
        this.SkillPosition = 0;
        /**英雄等级 */
        this.HeroLevel = 0;
    }
    return JsonSkillLevelUnlock;
}());
exports.JsonSkillLevelUnlock = JsonSkillLevelUnlock;
var SkillLevelUnlockManager = /** @class */ (function () {
    function SkillLevelUnlockManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SkillLevelUnlockManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkillLevelUnlockManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SkillLevelUnlockManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SkillLevelUnlockManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SkillLevelUnlock', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSkillLevelUnlock成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSkillLevelUnlock();
                jsonData = json[i];
                _this.data.set(jsonData.SkillPosition, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SkillLevelUnlockManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SkillLevelUnlockManager.prototype.getJsonSkillLevelUnlock = function (id) {
        return this.data.get(id);
    };
    /**根据技能槽位获取英雄等级 */
    SkillLevelUnlockManager.prototype.getHeroLevel = function (id) {
        return this.data.get(id).HeroLevel;
    };
    /** 静态方法，获取最大的 技能槽位*/
    SkillLevelUnlockManager.getMaxSkillPosition = function () {
        return 4;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SkillLevelUnlockManager.getId = function (skillSlot, heroSkillLevel) {
        return skillSlot * 100 + heroSkillLevel;
    };
    SkillLevelUnlockManager._instance = null;
    return SkillLevelUnlockManager;
}());
exports.SkillLevelUnlockManager = SkillLevelUnlockManager;

cc._RF.pop();