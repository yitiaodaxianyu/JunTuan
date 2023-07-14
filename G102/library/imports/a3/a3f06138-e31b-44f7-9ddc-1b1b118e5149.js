"use strict";
cc._RF.push(module, 'a3f06E44xtE953cGxsRjlFJ', 'ExclusiveWeaponMessage');
// Scripts/JsonData/ExclusiveWeaponMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveWeaponMessageManager = exports.JsonExclusiveWeaponMessage = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveWeaponMessage = /** @class */ (function () {
    function JsonExclusiveWeaponMessage() {
        /**英雄ID */
        this.HeroID = 0;
        /**专属武器名字文本 */
        this.ExclusiveWeaponNameID = 0;
        /**专武技能名称文本 */
        this.ExclusiveWeaponSkillID = 0;
        /**专属武器技能描述 */
        this.ExclusiveWeaponSkillDescription = 0;
        /**最大阶段 */
        this.MaxStage = 0;
    }
    return JsonExclusiveWeaponMessage;
}());
exports.JsonExclusiveWeaponMessage = JsonExclusiveWeaponMessage;
var ExclusiveWeaponMessageManager = /** @class */ (function () {
    function ExclusiveWeaponMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    ExclusiveWeaponMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveWeaponMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveWeaponMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveWeaponMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveWeaponMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveWeaponMessage();
                jsonData = json[i];
                _this.data.set(jsonData.HeroID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveWeaponMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveWeaponMessageManager.prototype.getJsonExclusiveWeaponMessage = function (id) {
        return this.data.get(id);
    };
    /**根据英雄ID获取专属武器名字文本 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponNameID = function (id) {
        return this.data.get(id).ExclusiveWeaponNameID;
    };
    /**根据英雄ID获取专武技能名称文本 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponSkillID = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillID;
    };
    /**根据英雄ID获取专属武器技能描述 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponSkillDescription = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillDescription;
    };
    /**根据英雄ID获取最大阶段 */
    ExclusiveWeaponMessageManager.prototype.getMaxStage = function (id) {
        return this.data.get(id).MaxStage;
    };
    /** 静态方法，获取最大的 英雄ID*/
    ExclusiveWeaponMessageManager.getMaxHeroID = function () {
        return 12;
    };
    ExclusiveWeaponMessageManager._instance = null;
    return ExclusiveWeaponMessageManager;
}());
exports.ExclusiveWeaponMessageManager = ExclusiveWeaponMessageManager;

cc._RF.pop();