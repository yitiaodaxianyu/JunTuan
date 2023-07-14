"use strict";
cc._RF.push(module, 'bfa3dZfuB5EIIQjnO5cjEGi', 'PlayerLevelUp');
// Scripts/JsonData/PlayerLevelUp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLevelUpManager = exports.JsonPlayerLevelUp = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonPlayerLevelUp = /** @class */ (function () {
    function JsonPlayerLevelUp() {
        /**等级 */
        this.PlayerLevel = 0;
        /**经验消耗 */
        this.PlayerExpCost = 0;
    }
    return JsonPlayerLevelUp;
}());
exports.JsonPlayerLevelUp = JsonPlayerLevelUp;
var PlayerLevelUpManager = /** @class */ (function () {
    function PlayerLevelUpManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    PlayerLevelUpManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PlayerLevelUpManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PlayerLevelUpManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    PlayerLevelUpManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PlayerLevelUp', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPlayerLevelUp成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPlayerLevelUp();
                jsonData = json[i];
                _this.data.set(jsonData.PlayerLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    PlayerLevelUpManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PlayerLevelUpManager.prototype.getJsonPlayerLevelUp = function (id) {
        return this.data.get(id);
    };
    /**根据等级获取经验消耗 */
    PlayerLevelUpManager.prototype.getPlayerExpCost = function (id) {
        return this.data.get(id).PlayerExpCost;
    };
    /** 静态方法，获取最大的 等级*/
    PlayerLevelUpManager.getMaxPlayerLevel = function () {
        return 100;
    };
    PlayerLevelUpManager._instance = null;
    return PlayerLevelUpManager;
}());
exports.PlayerLevelUpManager = PlayerLevelUpManager;

cc._RF.pop();