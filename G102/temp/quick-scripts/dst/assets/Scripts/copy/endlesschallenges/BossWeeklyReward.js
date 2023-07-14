
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/BossWeeklyReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXEJvc3NXZWVrbHlSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQTBEO0FBRTFELHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixZQUFZO1FBQ0wsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixZQUFZO1FBQ0wsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO0lBQ25DLENBQUM7SUFBRCwyQkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksb0RBQW9CO0FBaUJqQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFrQyxJQUFJLENBQUM7UUFDM0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBNEY1QyxDQUFDO0lBMUZpQixtQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHNDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsMENBQVEsR0FBaEI7UUFB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QVEsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO2dCQUN4RCxJQUFJLEVBQUUsR0FBQyxJQUFJLDBCQUFVLEVBQUUsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEI7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUE3RmMsaUNBQVMsR0FBNEIsSUFBSSxDQUFDO0lBK0Y3RCw4QkFBQztDQWhHRCxBQWdHQyxJQUFBO0FBaEdZLDBEQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBKc29uRmlyc3RDb21wbGV0ZVJld2FyZCB9IGZyb20gXCIuLi8uLi9MZXZlbC9GaXJzdENvbXBsZXRlUmV3YXJkXCI7XHJcbmltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQm9zc1dlZWtseVJld2FyZCB7XHJcbiAgICAvKirlpZblirHmoaPmrKEgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRHcmFkZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFt18xICovXHJcbiAgICBwdWJsaWMgUmV3YXJJdGVtXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph49fMSAqL1xyXG4gICAgcHVibGljIFJld2FyZE51bV8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx6YGT5YW3XzIgKi9cclxuICAgIHB1YmxpYyBSZXdhckl0ZW1fMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKseaVsOmHj18yICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHpgZPlhbdfMyAqL1xyXG4gICAgcHVibGljIFJld2FySXRlbV8zOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx5pWw6YePXzMgKi9cclxuICAgIHB1YmxpYyBSZXdhcmROdW1fMzpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQm9zc1dlZWtseVJld2FyZE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQm9zc1dlZWtseVJld2FyZD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Qm9zc1dlZWtseVJld2FyZE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBCb3NzV2Vla2x5UmV3YXJkTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdCb3NzV2Vla2x5UmV3YXJkJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkJvc3NXZWVrbHlSZXdhcmTmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQm9zc1dlZWtseVJld2FyZCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuUmV3YXJkR3JhZGUsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Cb3NzV2Vla2x5UmV3YXJkKGlkOm51bWJlcik6SnNvbkJvc3NXZWVrbHlSZXdhcmQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluWKseaho+asoeiOt+WPluWlluWKsemBk+WFt18xICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJJdGVtXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJJdGVtXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHmoaPmrKHojrflj5blpZblirHmlbDph49fMSAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZE51bV8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJld2FyZE51bV8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5Yqx5qGj5qyh6I635Y+W5aWW5Yqx6YGT5YW3XzIgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhckl0ZW1fMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhckl0ZW1fMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluWKseaho+asoeiOt+WPluWlluWKseaVsOmHj18yICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHmoaPmrKHojrflj5blpZblirHpgZPlhbdfMyAqL1xyXG4gICAgcHVibGljIGdldFJld2FySXRlbV8zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJld2FySXRlbV8zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5Yqx5qGj5qyh6I635Y+W5aWW5Yqx5pWw6YePXzMgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmROdW1fMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmROdW1fMztcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWlluWKseaho+asoSovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJld2FyZEdyYWRlKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNztcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuICAgIC8qKuiOt+W+l+WlluWKsSAqL1xyXG4gICAgcHVibGljIGdldEZpcnN0UmV3YXJkQXJyKGxldmVsSWQ6bnVtYmVyKTpSZXdhcmREYXRhW11cclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IGpzb25EYXRhOkpzb25Cb3NzV2Vla2x5UmV3YXJkPXRoaXMuZ2V0SnNvbkJvc3NXZWVrbHlSZXdhcmQobGV2ZWxJZCk7XHJcbiAgICAgICAgbGV0IHJkQXJyPW5ldyBBcnJheTxSZXdhcmREYXRhPigpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrXCIsanNvbkRhdGEpXHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTM7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhWydSZXdhckl0ZW1fJytpXT4wICYmIGpzb25EYXRhWydSZXdhcmROdW1fJytpXT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcmQucmV3YXJkX2lkPWpzb25EYXRhWydSZXdhckl0ZW1fJytpXTtcclxuICAgICAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGFbJ1Jld2FyZE51bV8nK2ldO1xyXG4gICAgICAgICAgICAgICAgcmRBcnIucHVzaChyZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHJkQXJyO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=