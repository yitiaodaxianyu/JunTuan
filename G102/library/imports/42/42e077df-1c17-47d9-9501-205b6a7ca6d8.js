"use strict";
cc._RF.push(module, '42e07ffHBdH2ZUBIFtqfKbY', 'BossWeeklyReward');
// Scripts/copy/endlesschallenges/BossWeeklyReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossWeeklyRewardManager = exports.JsonBossWeeklyReward = void 0;
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonBossWeeklyReward = /** @class */ (function () {
    function JsonBossWeeklyReward() {
        /**奖励档次 */
        this.RewardGrade = 0;
        /**奖励道具_1 */
        this.RewarItem_1 = 0;
        /**奖励数量_1 */
        this.RewardNum_1 = 0;
        /**奖励道具_2 */
        this.RewarItem_2 = 0;
        /**奖励数量_2 */
        this.RewardNum_2 = 0;
        /**奖励道具_3 */
        this.RewarItem_3 = 0;
        /**奖励数量_3 */
        this.RewardNum_3 = 0;
    }
    return JsonBossWeeklyReward;
}());
exports.JsonBossWeeklyReward = JsonBossWeeklyReward;
var BossWeeklyRewardManager = /** @class */ (function () {
    function BossWeeklyRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    BossWeeklyRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BossWeeklyRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    BossWeeklyRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    BossWeeklyRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('BossWeeklyReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonBossWeeklyReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonBossWeeklyReward();
                jsonData = json[i];
                _this.data.set(jsonData.RewardGrade, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    BossWeeklyRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    BossWeeklyRewardManager.prototype.getJsonBossWeeklyReward = function (id) {
        return this.data.get(id);
    };
    /**根据奖励档次获取奖励道具_1 */
    BossWeeklyRewardManager.prototype.getRewarItem_1 = function (id) {
        return this.data.get(id).RewarItem_1;
    };
    /**根据奖励档次获取奖励数量_1 */
    BossWeeklyRewardManager.prototype.getRewardNum_1 = function (id) {
        return this.data.get(id).RewardNum_1;
    };
    /**根据奖励档次获取奖励道具_2 */
    BossWeeklyRewardManager.prototype.getRewarItem_2 = function (id) {
        return this.data.get(id).RewarItem_2;
    };
    /**根据奖励档次获取奖励数量_2 */
    BossWeeklyRewardManager.prototype.getRewardNum_2 = function (id) {
        return this.data.get(id).RewardNum_2;
    };
    /**根据奖励档次获取奖励道具_3 */
    BossWeeklyRewardManager.prototype.getRewarItem_3 = function (id) {
        return this.data.get(id).RewarItem_3;
    };
    /**根据奖励档次获取奖励数量_3 */
    BossWeeklyRewardManager.prototype.getRewardNum_3 = function (id) {
        return this.data.get(id).RewardNum_3;
    };
    /** 静态方法，获取最大的 奖励档次*/
    BossWeeklyRewardManager.getMaxRewardGrade = function () {
        return 7;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**获得奖励 */
    BossWeeklyRewardManager.prototype.getFirstRewardArr = function (levelId) {
        var jsonData = this.getJsonBossWeeklyReward(levelId);
        var rdArr = new Array();
        // console.log("+++++++++",jsonData)
        for (var i = 1; i <= 3; i++) {
            if (jsonData['RewarItem_' + i] > 0 && jsonData['RewardNum_' + i] > 0) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = jsonData['RewarItem_' + i];
                rd.reward_num = jsonData['RewardNum_' + i];
                rdArr.push(rd);
            }
        }
        return rdArr;
    };
    BossWeeklyRewardManager._instance = null;
    return BossWeeklyRewardManager;
}());
exports.BossWeeklyRewardManager = BossWeeklyRewardManager;

cc._RF.pop();