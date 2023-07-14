
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyUmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF1RDtBQUN2RCxzREFBcUQ7QUFDckQsaURBQTRDO0FBRTVDO0lBQUE7UUFDSSxRQUFRO1FBQ0QsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixRQUFRO1FBQ0QsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixRQUFRO1FBQ0QsUUFBRyxHQUFVLENBQUMsQ0FBRTtRQUN2QixXQUFXO1FBQ0osaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osYUFBUSxHQUFVLENBQUMsQ0FBRTtJQUNoQyxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxJQUFBO0FBckJZLDBDQUFlO0FBdUI1QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUE2QixJQUFJLENBQUM7UUFDdEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBMEg1QyxDQUFDO0lBeEhpQiw4QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELGlDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMs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WUFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUNELE1BQU07UUFDTixJQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDO1lBQ2YsSUFBSSxFQUFFLEdBQUMsSUFBSSwwQkFBVSxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLFNBQVMsR0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBQztZQUN6QixFQUFFLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUk7UUFDSixJQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxFQUFDO1lBQ2QsSUFBSSxFQUFFLEdBQUMsSUFBSSwwQkFBVSxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLFNBQVMsR0FBQyxtQkFBTSxDQUFDLEdBQUcsQ0FBQztZQUN4QixFQUFFLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUEzSGMsNEJBQVMsR0FBdUIsSUFBSSxDQUFDO0lBNkh4RCx5QkFBQztDQTlIRCxBQThIQyxJQUFBO0FBOUhZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uVG93ZXJSZXdhcmQge1xyXG4gICAgLyoq5bGC5pWwICovXHJcbiAgICBwdWJsaWMgRmxvb3I6bnVtYmVyID0gMCA7XHJcbiAgICAvKirph5HluIEgKi9cclxuICAgIHB1YmxpYyBDb2luOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE57uP6aqMICovXHJcbiAgICBwdWJsaWMgSGVyb0V4cDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumSu+efsyAqL1xyXG4gICAgcHVibGljIEdlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFtzEgKi9cclxuICAgIHB1YmxpYyBJdGVtUmV3YXJkXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph48xICovXHJcbiAgICBwdWJsaWMgUmV3YXJkXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHpgZPlhbcyICovXHJcbiAgICBwdWJsaWMgSXRlbVJld2FyZF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx5pWw6YePMiAqL1xyXG4gICAgcHVibGljIFJld2FyZF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx6YGT5YW3MyAqL1xyXG4gICAgcHVibGljIEl0ZW1SZXdhcmRfMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKseaVsOmHjzMgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRfMzpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvd2VyUmV3YXJkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRvd2VyUmV3YXJkTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Ub3dlclJld2FyZD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VG93ZXJSZXdhcmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVG93ZXJSZXdhcmRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1Rvd2VyUmV3YXJkJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblRvd2VyUmV3YXJk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblRvd2VyUmV3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5GbG9vcixqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblRvd2VyUmV3YXJkKGlkOm51bWJlcik6SnNvblRvd2VyUmV3YXJkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5bph5HluIEgKi9cclxuICAgIHB1YmxpYyBnZXRDb2luKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvaW47XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5boi7Hpm4Tnu4/pqowgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvRXhwKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9FeHA7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5bpkrvnn7MgKi9cclxuICAgIHB1YmxpYyBnZXRHZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGC5pWw6I635Y+W5aWW5Yqx6YGT5YW3MSAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1SZXdhcmRfMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtUmV3YXJkXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5blpZblirHmlbDph48xICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5blpZblirHpgZPlhbcyICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbVJld2FyZF8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW1SZXdhcmRfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxguaVsOiOt+WPluWlluWKseaVsOmHjzIgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRfMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmRfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxguaVsOiOt+WPluWlluWKsemBk+WFtzMgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtUmV3YXJkXzMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbVJld2FyZF8zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGC5pWw6I635Y+W5aWW5Yqx5pWw6YePMyAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZF8zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJld2FyZF8zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5bGC5pWwKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Rmxvb3IoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA0ODA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0UmV3YXJkRGF0YXMobGV2ZWw6bnVtYmVyKTpBcnJheTxSZXdhcmREYXRhPntcclxuICAgICAgICBsZXQgYWxsUmV3YXJkRGF0YT1uZXcgQXJyYXk8UmV3YXJkRGF0YT4oKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9dGhpcy5nZXRKc29uVG93ZXJSZXdhcmQobGV2ZWwpO1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspe1xyXG4gICAgICAgICAgICBpZihqc29uRGF0YVsnSXRlbVJld2FyZF8nK2ldPjAgJiYganNvbkRhdGFbJ1Jld2FyZF8nK2ldPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICByZC5yZXdhcmRfaWQ9anNvbkRhdGFbJ0l0ZW1SZXdhcmRfJytpXTtcclxuICAgICAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGFbJ1Jld2FyZF8nK2ldO1xyXG4gICAgICAgICAgICAgICAgYWxsUmV3YXJkRGF0YS5wdXNoKHJkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+iLsembhOe7j+mqjFxyXG4gICAgICAgIGlmKGpzb25EYXRhLkhlcm9FeHA+MCl7XHJcbiAgICAgICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfaWQ9UHJvcElkLkhlcm9FeHA7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGEuSGVyb0V4cDtcclxuICAgICAgICAgICAgYWxsUmV3YXJkRGF0YS5wdXNoKHJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/njqnlrrbnu4/pqoxcclxuICAgICAgICBpZihqc29uRGF0YS5Db2luPjApe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5Db2luO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfbnVtPWpzb25EYXRhLkNvaW47XHJcbiAgICAgICAgICAgIGFsbFJld2FyZERhdGEucHVzaChyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZK755+zXHJcbiAgICAgICAgaWYoanNvbkRhdGEuR2VtPjApe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5HZW07XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGEuR2VtO1xyXG4gICAgICAgICAgICBhbGxSZXdhcmREYXRhLnB1c2gocmQpO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgICByZXR1cm4gYWxsUmV3YXJkRGF0YTsgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=