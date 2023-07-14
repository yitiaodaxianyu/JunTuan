"use strict";
cc._RF.push(module, 'a0d5ejm6NFCWq4x4ExB18V3', 'LevelUp');
// Scripts/Hero/Data/LevelUp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpManager = exports.JsonLevelUp = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonLevelUp = /** @class */ (function () {
    function JsonLevelUp() {
        /**等级 */
        this.Level = 0;
        /**金币消耗 */
        this.CostCoin = 0;
        /**钻石消耗 */
        this.CostGem = 0;
        /**关卡限制 */
        this.LevelLimit = 0;
    }
    return JsonLevelUp;
}());
exports.JsonLevelUp = JsonLevelUp;
var LevelUpManager = /** @class */ (function () {
    function LevelUpManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    LevelUpManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LevelUpManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    LevelUpManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    LevelUpManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('LevelUp', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUp成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonLevelUp();
                jsonData = json[i];
                _this.data.set(jsonData.Level, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    LevelUpManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    LevelUpManager.prototype.getJsonLevelUp = function (id) {
        return this.data.get(id);
    };
    /**根据等级获取金币消耗 */
    LevelUpManager.prototype.getCostCoin = function (id) {
        return this.data.get(id).CostCoin;
    };
    /**根据等级获取钻石消耗 */
    LevelUpManager.prototype.getCostGem = function (id) {
        return this.data.get(id).CostGem;
    };
    /**根据等级获取关卡限制 */
    LevelUpManager.prototype.getLevelLimit = function (id) {
        return this.data.get(id).LevelLimit;
    };
    /** 静态方法，获取最大的 等级*/
    LevelUpManager.getMaxLevel = function () {
        return 100;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据当前的等级获取所消耗的总金币 */
    LevelUpManager.prototype.getNowLevelAllCostCoin = function (level) {
        level -= 1;
        var sum1 = 0;
        var sum2 = 0;
        for (; level > 0; level--) {
            sum1 += this.data.get(level).CostCoin;
            sum2 += this.data.get(level).CostGem;
        }
        return [sum1, sum2];
    };
    LevelUpManager._instance = null;
    return LevelUpManager;
}());
exports.LevelUpManager = LevelUpManager;

cc._RF.pop();