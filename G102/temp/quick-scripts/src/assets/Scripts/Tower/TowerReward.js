"use strict";
cc._RF.push(module, '2c2ded/CwlCka/gYEp5gu+Q', 'TowerReward');
// Scripts/Tower/TowerReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowerRewardManager = exports.JsonTowerReward = void 0;
var LevelJsonData_1 = require("../JsonData/LevelJsonData");
var LoadManager_1 = require("../Loading/LoadManager");
var PropConfig_1 = require("../Prop/PropConfig");
var JsonTowerReward = /** @class */ (function () {
    function JsonTowerReward() {
        /**层数 */
        this.Floor = 0;
        /**金币 */
        this.Coin = 0;
        /**英雄经验 */
        this.HeroExp = 0;
        /**钻石 */
        this.Gem = 0;
        /**奖励道具1 */
        this.ItemReward_1 = 0;
        /**奖励数量1 */
        this.Reward_1 = 0;
        /**奖励道具2 */
        this.ItemReward_2 = 0;
        /**奖励数量2 */
        this.Reward_2 = 0;
        /**奖励道具3 */
        this.ItemReward_3 = 0;
        /**奖励数量3 */
        this.Reward_3 = 0;
    }
    return JsonTowerReward;
}());
exports.JsonTowerReward = JsonTowerReward;
var TowerRewardManager = /** @class */ (function () {
    function TowerRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TowerRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TowerRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TowerRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TowerRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TowerReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTowerReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTowerReward();
                jsonData = json[i];
                _this.data.set(jsonData.Floor, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TowerRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TowerRewardManager.prototype.getJsonTowerReward = function (id) {
        return this.data.get(id);
    };
    /**根据层数获取金币 */
    TowerRewardManager.prototype.getCoin = function (id) {
        return this.data.get(id).Coin;
    };
    /**根据层数获取英雄经验 */
    TowerRewardManager.prototype.getHeroExp = function (id) {
        return this.data.get(id).HeroExp;
    };
    /**根据层数获取钻石 */
    TowerRewardManager.prototype.getGem = function (id) {
        return this.data.get(id).Gem;
    };
    /**根据层数获取奖励道具1 */
    TowerRewardManager.prototype.getItemReward_1 = function (id) {
        return this.data.get(id).ItemReward_1;
    };
    /**根据层数获取奖励数量1 */
    TowerRewardManager.prototype.getReward_1 = function (id) {
        return this.data.get(id).Reward_1;
    };
    /**根据层数获取奖励道具2 */
    TowerRewardManager.prototype.getItemReward_2 = function (id) {
        return this.data.get(id).ItemReward_2;
    };
    /**根据层数获取奖励数量2 */
    TowerRewardManager.prototype.getReward_2 = function (id) {
        return this.data.get(id).Reward_2;
    };
    /**根据层数获取奖励道具3 */
    TowerRewardManager.prototype.getItemReward_3 = function (id) {
        return this.data.get(id).ItemReward_3;
    };
    /**根据层数获取奖励数量3 */
    TowerRewardManager.prototype.getReward_3 = function (id) {
        return this.data.get(id).Reward_3;
    };
    /** 静态方法，获取最大的 层数*/
    TowerRewardManager.getMaxFloor = function () {
        return 480;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    TowerRewardManager.prototype.getRewardDatas = function (level) {
        var allRewardData = new Array();
        var jsonData = this.getJsonTowerReward(level);
        for (var i = 1; i <= 3; i++) {
            if (jsonData['ItemReward_' + i] > 0 && jsonData['Reward_' + i] > 0) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = jsonData['ItemReward_' + i];
                rd.reward_num = jsonData['Reward_' + i];
                allRewardData.push(rd);
            }
        }
        //英雄经验
        if (jsonData.HeroExp > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.HeroExp;
            rd.reward_num = jsonData.HeroExp;
            allRewardData.push(rd);
        }
        //玩家经验
        if (jsonData.Coin > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Coin;
            rd.reward_num = jsonData.Coin;
            allRewardData.push(rd);
        }
        //钻石
        if (jsonData.Gem > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Gem;
            rd.reward_num = jsonData.Gem;
            allRewardData.push(rd);
        }
        return allRewardData;
    };
    TowerRewardManager._instance = null;
    return TowerRewardManager;
}());
exports.TowerRewardManager = TowerRewardManager;

cc._RF.pop();