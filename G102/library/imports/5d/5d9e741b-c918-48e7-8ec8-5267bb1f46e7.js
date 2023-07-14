"use strict";
cc._RF.push(module, '5d9e7QbyRhI547IUme7H0bn', 'MonsterFeature');
// Scripts/Monster/Data/MonsterFeature.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterFeatureManager = exports.JsonMonsterFeature = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterFeature = /** @class */ (function () {
    function JsonMonsterFeature() {
        /**特性编号 */
        this.FeatureNumber = 0;
        /**作用对象 */
        this.Objective = 0;
        /**怪物特性描述文本ID */
        this.FeatureDiscribe_TextID = 0;
        /**数目(只) */
        this.Number = 0;
        /**血量 */
        this.HP = 0;
        /**持续时间(秒) */
        this.Time = 0;
        /**增加速度 */
        this.SpeedUp = 0;
        /**范围 */
        this.Range = 0;
        /**加血(秒) */
        this.Recovery = 0;
    }
    return JsonMonsterFeature;
}());
exports.JsonMonsterFeature = JsonMonsterFeature;
var MonsterFeatureManager = /** @class */ (function () {
    function MonsterFeatureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterFeatureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterFeatureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterFeatureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterFeatureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterFeature', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterFeature成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterFeature();
                jsonData = json[i];
                _this.data.set(jsonData.FeatureNumber, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterFeatureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterFeatureManager.prototype.getJsonMonsterFeature = function (id) {
        return this.data.get(id);
    };
    /**根据特性编号获取作用对象 */
    MonsterFeatureManager.prototype.getObjective = function (id) {
        return this.data.get(id).Objective;
    };
    /**根据特性编号获取怪物特性描述文本ID */
    MonsterFeatureManager.prototype.getFeatureDiscribe_TextID = function (id) {
        return this.data.get(id).FeatureDiscribe_TextID;
    };
    /**根据特性编号获取数目(只) */
    MonsterFeatureManager.prototype.getNumber = function (id) {
        return this.data.get(id).Number;
    };
    /**根据特性编号获取血量 */
    MonsterFeatureManager.prototype.getHP = function (id) {
        return this.data.get(id).HP;
    };
    /**根据特性编号获取持续时间(秒) */
    MonsterFeatureManager.prototype.getTime = function (id) {
        return this.data.get(id).Time;
    };
    /**根据特性编号获取增加速度 */
    MonsterFeatureManager.prototype.getSpeedUp = function (id) {
        return this.data.get(id).SpeedUp;
    };
    /**根据特性编号获取范围 */
    MonsterFeatureManager.prototype.getRange = function (id) {
        return this.data.get(id).Range;
    };
    /**根据特性编号获取加血(秒) */
    MonsterFeatureManager.prototype.getRecovery = function (id) {
        return this.data.get(id).Recovery;
    };
    /** 静态方法，获取最大的 特性编号*/
    MonsterFeatureManager.getMaxFeatureNumber = function () {
        return 17;
    };
    MonsterFeatureManager._instance = null;
    return MonsterFeatureManager;
}());
exports.MonsterFeatureManager = MonsterFeatureManager;

cc._RF.pop();