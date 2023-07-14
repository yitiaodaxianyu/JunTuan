"use strict";
cc._RF.push(module, '818adHLZe9AWIbcD/1WUABK', 'RogueLevel');
// Scripts/copy/voidcrack/RogueLevel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueLevelManager = exports.JsonRogueLevel = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueLevel = /** @class */ (function () {
    function JsonRogueLevel() {
        /**关卡ID */
        this.Level = 0;
        /**怪物组配置 */
        this.MonsterGroupConfigure = [];
        /**最大波次 */
        this.MaxWave = 0;
        /**怪潮波次 */
        this.MonsterTideWave = [];
        /**每波时间间隔 */
        this.TimeInterval = [];
        /**怪物等级 */
        this.MonsterLevel = [];
        /**血量系数 */
        this.HpCoefficient = [];
    }
    return JsonRogueLevel;
}());
exports.JsonRogueLevel = JsonRogueLevel;
var RogueLevelManager = /** @class */ (function () {
    function RogueLevelManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueLevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueLevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueLevelManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueLevelManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueLevel成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueLevel();
                jsonData = json[i];
                _this.data.set(jsonData.Level, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueLevelManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueLevelManager.prototype.getJsonRogueLevel = function (id) {
        return this.data.get(id);
    };
    /**根据关卡ID获取怪物组配置 */
    RogueLevelManager.prototype.getMonsterGroupConfigure = function (id) {
        return this.data.get(id).MonsterGroupConfigure;
    };
    /**根据关卡ID获取最大波次 */
    RogueLevelManager.prototype.getMaxWave = function (id) {
        return this.data.get(id).MaxWave;
    };
    /**根据关卡ID获取怪潮波次 */
    RogueLevelManager.prototype.getMonsterTideWave = function (id) {
        return this.data.get(id).MonsterTideWave;
    };
    /**根据关卡ID获取每波时间间隔 */
    RogueLevelManager.prototype.getTimeInterval = function (id) {
        return this.data.get(id).TimeInterval;
    };
    /**根据关卡ID获取怪物等级 */
    RogueLevelManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /**根据关卡ID获取血量系数 */
    RogueLevelManager.prototype.getHpCoefficient = function (id) {
        return this.data.get(id).HpCoefficient;
    };
    /** 静态方法，获取最大的 关卡ID*/
    RogueLevelManager.getMaxLevel = function () {
        return 80092;
    };
    RogueLevelManager._instance = null;
    return RogueLevelManager;
}());
exports.RogueLevelManager = RogueLevelManager;

cc._RF.pop();