"use strict";
cc._RF.push(module, 'd8e69deS61BY6W5AraQ4oU2', 'RogueReward');
// Scripts/Maze/Data/RogueReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueRewardManager = exports.JsonRogueReward = void 0;
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var LoadManager_1 = require("../../Loading/LoadManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var JsonRogueReward = /** @class */ (function () {
    function JsonRogueReward() {
        /**格子ID */
        this.Hexagon_ID = 0;
        /**道具1_ID */
        this.RogueProp1_ID = 0;
        /**道具1_数量 */
        this.RogueProp1_Sum = 0;
        /**道具2_ID */
        this.RogueProp2_ID = 0;
        /**道具2_数量 */
        this.RogueProp2_Sum = 0;
        /**道具3_ID */
        this.RogueProp3_ID = 0;
        /**道具3_数量 */
        this.RogueProp3_Sum = 0;
        /**探索币数量 */
        this.ExploreCoins_Sum = 0;
    }
    return JsonRogueReward;
}());
exports.JsonRogueReward = JsonRogueReward;
var RogueRewardManager = /** @class */ (function () {
    function RogueRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    RogueRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueReward();
                jsonData = json[i];
                _this.data.set(jsonData.Hexagon_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueRewardManager.prototype.getJsonRogueReward = function (id) {
        return this.data.get(id);
    };
    /**根据格子ID获取道具1_ID */
    RogueRewardManager.prototype.getRogueProp1_ID = function (id) {
        return this.data.get(id).RogueProp1_ID;
    };
    /**根据格子ID获取道具1_数量 */
    RogueRewardManager.prototype.getRogueProp1_Sum = function (id) {
        return this.data.get(id).RogueProp1_Sum;
    };
    /**根据格子ID获取道具2_ID */
    RogueRewardManager.prototype.getRogueProp2_ID = function (id) {
        return this.data.get(id).RogueProp2_ID;
    };
    /**根据格子ID获取道具2_数量 */
    RogueRewardManager.prototype.getRogueProp2_Sum = function (id) {
        return this.data.get(id).RogueProp2_Sum;
    };
    /**根据格子ID获取道具3_ID */
    RogueRewardManager.prototype.getRogueProp3_ID = function (id) {
        return this.data.get(id).RogueProp3_ID;
    };
    /**根据格子ID获取道具3_数量 */
    RogueRewardManager.prototype.getRogueProp3_Sum = function (id) {
        return this.data.get(id).RogueProp3_Sum;
    };
    /**根据格子ID获取探索币数量 */
    RogueRewardManager.prototype.getExploreCoins_Sum = function (id) {
        return this.data.get(id).ExploreCoins_Sum;
    };
    /** 静态方法，获取最大的 格子ID*/
    RogueRewardManager.getMaxHexagon_ID = function () {
        return 30091;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    RogueRewardManager.prototype.getRewardDatas = function (id) {
        var rewadDatas = new Array();
        var jsonData = this.getJsonRogueReward(id);
        //探索币/迷宫币
        var rd1 = new LevelJsonData_1.RewardData();
        rd1.reward_id = PropConfig_1.PropId.MazeCoin;
        rd1.reward_num = jsonData.ExploreCoins_Sum;
        rewadDatas.push(rd1);
        for (var i = 1; i <= 3; i++) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = jsonData['RogueProp' + i + '_ID'];
            rd.reward_num = jsonData['RogueProp' + i + '_Sum'];
            if (rd.reward_id > 0 && rd.reward_num) {
                rewadDatas.push(rd);
            }
        }
        return rewadDatas;
    };
    RogueRewardManager._instance = null;
    return RogueRewardManager;
}());
exports.RogueRewardManager = RogueRewardManager;

cc._RF.pop();