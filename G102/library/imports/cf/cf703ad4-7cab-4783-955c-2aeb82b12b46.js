"use strict";
cc._RF.push(module, 'cf703rUfKtHg5VcKuuCsStG', 'LevelUpRebate');
// Scripts/JsonData/LevelUpRebate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpRebateManager = exports.JsonLevelUpRebate = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonLevelUpRebate = /** @class */ (function () {
    function JsonLevelUpRebate() {
        /**奖励ID */
        this.RewardID = 0;
        /**获得钻石 */
        this.GetGem = 0;
        /**解锁等级 */
        this.UnlockUserLevel = 0;
    }
    return JsonLevelUpRebate;
}());
exports.JsonLevelUpRebate = JsonLevelUpRebate;
var LevelUpRebateManager = /** @class */ (function () {
    function LevelUpRebateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    LevelUpRebateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LevelUpRebateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    LevelUpRebateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    LevelUpRebateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('LevelUpRebate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUpRebate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonLevelUpRebate();
                jsonData = json[i];
                _this.data.set(jsonData.RewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    LevelUpRebateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    LevelUpRebateManager.prototype.getJsonLevelUpRebate = function (id) {
        return this.data.get(id);
    };
    /**根据奖励ID获取获得钻石 */
    LevelUpRebateManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据奖励ID获取解锁等级 */
    LevelUpRebateManager.prototype.getUnlockUserLevel = function (id) {
        return this.data.get(id).UnlockUserLevel;
    };
    /** 静态方法，获取最大的 奖励ID*/
    LevelUpRebateManager.getMaxRewardID = function () {
        return 20;
    };
    LevelUpRebateManager._instance = null;
    return LevelUpRebateManager;
}());
exports.LevelUpRebateManager = LevelUpRebateManager;

cc._RF.pop();