"use strict";
cc._RF.push(module, '43063hlJRVNjJXSW3O1vGLT', 'FirstCompleteReward');
// Scripts/Level/FirstCompleteReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstCompleteRewardManager = exports.JsonFirstCompleteReward = void 0;
var LevelJsonData_1 = require("../JsonData/LevelJsonData");
var LoadManager_1 = require("../Loading/LoadManager");
var Item_1 = require("../Prop/Data/Item");
var JsonFirstCompleteReward = /** @class */ (function () {
    function JsonFirstCompleteReward() {
        /**通关奖励ID */
        this.PassReward = 0;
        /**关卡ID */
        this.Level_ID = 0;
        /**星级 */
        this.Star_ID = 0;
        /**奖励道具1 */
        this.RewardItem_1 = 0;
        /**奖励数量1 */
        this.RewardNum_1 = 0;
        /**奖励道具2 */
        this.RewardItem_2 = 0;
        /**奖励数量2 */
        this.RewardNum_2 = 0;
        /**奖励道具3 */
        this.RewardItem_3 = 0;
        /**奖励数量3 */
        this.RewardNum_3 = 0;
        /**奖励道具4 */
        this.RewardItem_4 = 0;
        /**奖励数量4 */
        this.RewardNum_4 = 0;
    }
    return JsonFirstCompleteReward;
}());
exports.JsonFirstCompleteReward = JsonFirstCompleteReward;
var FirstCompleteRewardManager = /** @class */ (function () {
    function FirstCompleteRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    FirstCompleteRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new FirstCompleteRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    FirstCompleteRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    FirstCompleteRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('FirstCompleteReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonFirstCompleteReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonFirstCompleteReward();
                jsonData = json[i];
                _this.data.set(jsonData.PassReward, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    FirstCompleteRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    FirstCompleteRewardManager.prototype.getJsonFirstCompleteReward = function (id) {
        // console.log(")_",this.data)
        return this.data.get(id);
    };
    /**根据通关奖励ID获取关卡ID */
    FirstCompleteRewardManager.prototype.getLevel_ID = function (id) {
        return this.data.get(id).Level_ID;
    };
    /**根据通关奖励ID获取星级 */
    FirstCompleteRewardManager.prototype.getStar_ID = function (id) {
        return this.data.get(id).Star_ID;
    };
    /**根据通关奖励ID获取奖励道具1 */
    FirstCompleteRewardManager.prototype.getRewardItem_1 = function (id) {
        return this.data.get(id).RewardItem_1;
    };
    /**根据通关奖励ID获取奖励数量1 */
    FirstCompleteRewardManager.prototype.getRewardNum_1 = function (id) {
        return this.data.get(id).RewardNum_1;
    };
    /**根据通关奖励ID获取奖励道具2 */
    FirstCompleteRewardManager.prototype.getRewardItem_2 = function (id) {
        return this.data.get(id).RewardItem_2;
    };
    /**根据通关奖励ID获取奖励数量2 */
    FirstCompleteRewardManager.prototype.getRewardNum_2 = function (id) {
        return this.data.get(id).RewardNum_2;
    };
    /**根据通关奖励ID获取奖励道具3 */
    FirstCompleteRewardManager.prototype.getRewardItem_3 = function (id) {
        return this.data.get(id).RewardItem_3;
    };
    /**根据通关奖励ID获取奖励数量3 */
    FirstCompleteRewardManager.prototype.getRewardNum_3 = function (id) {
        return this.data.get(id).RewardNum_3;
    };
    /**根据通关奖励ID获取奖励道具4 */
    FirstCompleteRewardManager.prototype.getRewardItem_4 = function (id) {
        return this.data.get(id).RewardItem_4;
    };
    /**根据通关奖励ID获取奖励数量4 */
    FirstCompleteRewardManager.prototype.getRewardNum_4 = function (id) {
        return this.data.get(id).RewardNum_4;
    };
    /** 静态方法，获取最大的 通关奖励ID*/
    FirstCompleteRewardManager.getMaxPassReward = function () {
        return 153;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    FirstCompleteRewardManager.getId = function (level, star) {
        return level * 10 + star;
    };
    /**获得奖励 */
    FirstCompleteRewardManager.prototype.getFirstRewardArr = function (levelId) {
        var jsonData = this.getJsonFirstCompleteReward(levelId);
        var rdArr = new Array();
        // console.log("+++++++++",jsonData)
        for (var i = 1; i <= 4; i++) {
            if (jsonData['RewardItem_' + i] > 0 && jsonData['RewardNum_' + i] > 0) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = jsonData['RewardItem_' + i];
                rd.reward_num = jsonData['RewardNum_' + i];
                rdArr.push(rd);
            }
        }
        return rdArr;
    };
    FirstCompleteRewardManager.prototype.check = function () {
        this.data.forEach(function (v, k) {
            for (var i = 1; i <= 4; i++) {
                var id = v["RewardItem_" + i];
                if (id != 0) {
                    if (!Item_1.ItemManager.getInstance().getJsonItem(id)) {
                        console.error("首通奖励ID" + k + ",不存在奖励id:RewardItem_" + i + "=" + id);
                    }
                }
            }
        });
    };
    FirstCompleteRewardManager._instance = null;
    return FirstCompleteRewardManager;
}());
exports.FirstCompleteRewardManager = FirstCompleteRewardManager;

cc._RF.pop();