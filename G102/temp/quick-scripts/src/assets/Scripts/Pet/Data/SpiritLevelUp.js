"use strict";
cc._RF.push(module, '7a73cnRWIdFIJsMtTuGS2v9', 'SpiritLevelUp');
// Scripts/Pet/Data/SpiritLevelUp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritLevelUpManager = exports.JsonSpiritLevelUp = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritLevelUp = /** @class */ (function () {
    function JsonSpiritLevelUp() {
        /**灵宠等级 */
        this.Spirit = 0;
        /**兽粮消耗 */
        this.FoodCost = 0;
        /**金币消耗 */
        this.CoinCost = 0;
        /**被动技能1等级 */
        this.PassiveSkillLevel_1 = 0;
        /**主动技能等级 */
        this.ActiveSkillLevel = 0;
        /**被动技能2等级 */
        this.PassiveSkillLevel_2 = 0;
    }
    return JsonSpiritLevelUp;
}());
exports.JsonSpiritLevelUp = JsonSpiritLevelUp;
var SpiritLevelUpManager = /** @class */ (function () {
    function SpiritLevelUpManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritLevelUpManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritLevelUpManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritLevelUpManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritLevelUpManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritLevelUp', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritLevelUp成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritLevelUp();
                jsonData = json[i];
                _this.data.set(jsonData.Spirit, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritLevelUpManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritLevelUpManager.prototype.getJsonSpiritLevelUp = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠等级获取兽粮消耗 */
    SpiritLevelUpManager.prototype.getFoodCost = function (id) {
        return this.data.get(id).FoodCost;
    };
    /**根据灵宠等级获取金币消耗 */
    SpiritLevelUpManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据灵宠等级获取被动技能1等级 */
    SpiritLevelUpManager.prototype.getPassiveSkillLevel_1 = function (id) {
        return this.data.get(id).PassiveSkillLevel_1;
    };
    /**根据灵宠等级获取主动技能等级 */
    SpiritLevelUpManager.prototype.getActiveSkillLevel = function (id) {
        return this.data.get(id).ActiveSkillLevel;
    };
    /**根据灵宠等级获取被动技能2等级 */
    SpiritLevelUpManager.prototype.getPassiveSkillLevel_2 = function (id) {
        return this.data.get(id).PassiveSkillLevel_2;
    };
    /** 静态方法，获取最大的 灵宠等级*/
    SpiritLevelUpManager.getMaxSpirit = function () {
        return 200;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritLevelUpManager.prototype.getNowLevelAllCostCoin = function (level) {
        level -= 1;
        var sum = 0;
        for (; level > 0; level--) {
            sum += this.data.get(level).CoinCost;
        }
        return sum;
    };
    SpiritLevelUpManager.prototype.getNowLevelAllCostFood = function (level) {
        level -= 1;
        var sum = 0;
        for (; level > 0; level--) {
            sum += this.data.get(level).FoodCost;
        }
        return sum;
    };
    SpiritLevelUpManager._instance = null;
    return SpiritLevelUpManager;
}());
exports.SpiritLevelUpManager = SpiritLevelUpManager;

cc._RF.pop();