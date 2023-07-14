
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Level/FirstCompleteReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXEZpcnN0Q29tcGxldGVSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXVEO0FBQ3ZELHNEQUFxRDtBQUNyRCwwQ0FBZ0Q7QUFHaEQ7SUFBQTtRQUNJLFlBQVk7UUFDTCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixXQUFXO1FBQ0osaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osZ0JBQVcsR0FBVSxDQUFDLENBQUU7SUFDbkMsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQXZCWSwwREFBdUI7QUF5QnBDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXFDLElBQUksQ0FBQztRQUM5QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUErSDVDLENBQUM7SUE3SGlCLHNDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksMEJBQTBCLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QseUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSw2Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQy9GLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO2dCQUMzQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsdURBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtEQUEwQixHQUFqQyxVQUFrQyxFQUFTO1FBQ3ZDLDhCQUE4QjtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxvQkFBb0I7SUFDYixnREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCwrQ0FBVSxHQUFqQixVQUFrQixFQUFTO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxvREFBZSxHQUF0QixVQUF1QixFQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxtREFBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxvREFBZSxHQUF0QixVQUF1QixFQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxtREFBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxvREFBZSxHQUF0QixVQUF1QixFQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxtREFBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxvREFBZSxHQUF0QixVQUF1QixFQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxtREFBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx1QkFBdUI7SUFDVCwyQ0FBZ0IsR0FBOUI7UUFDSSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCx5QkFBeUI7SUFFbEIsZ0NBQUssR0FBWixVQUFhLEtBQVksRUFBQyxJQUFXO1FBQ2pDLE9BQU8sS0FBSyxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7SUFDSCxzREFBaUIsR0FBeEIsVUFBeUIsT0FBYztRQUduQyxJQUFJLFFBQVEsR0FBeUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLElBQUksS0FBSyxHQUFDLElBQUksS0FBSyxFQUFjLENBQUM7UUFDbEMsb0NBQW9DO1FBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDbkIsSUFBRyxRQUFRLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztnQkFDekQsSUFBSSxFQUFFLEdBQUMsSUFBSSwwQkFBVSxFQUFFLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsRUFBRSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xCO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsMENBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDbkIsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBRyxFQUFFLElBQUUsQ0FBQyxFQUFDO29CQUNMLElBQUcsQ0FBQyxrQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBQzt3QkFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUMsQ0FBQyxHQUFDLHNCQUFzQixHQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzdEO2lCQUNKO2FBQ0o7UUFFTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFqSWMsb0NBQVMsR0FBK0IsSUFBSSxDQUFDO0lBa0loRSxpQ0FBQztDQW5JRCxBQW1JQyxJQUFBO0FBbklZLGdFQUEwQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRmlyc3RDb21wbGV0ZVJld2FyZCB7XHJcbiAgICAvKirpgJrlhbPlpZblirFJRCAqL1xyXG4gICAgcHVibGljIFBhc3NSZXdhcmQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlhbPljaFJRCAqL1xyXG4gICAgcHVibGljIExldmVsX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pif57qnICovXHJcbiAgICBwdWJsaWMgU3Rhcl9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFtzEgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRJdGVtXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph48xICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHpgZPlhbcyICovXHJcbiAgICBwdWJsaWMgUmV3YXJkSXRlbV8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx5pWw6YePMiAqL1xyXG4gICAgcHVibGljIFJld2FyZE51bV8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx6YGT5YW3MyAqL1xyXG4gICAgcHVibGljIFJld2FyZEl0ZW1fMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKseaVsOmHjzMgKi9cclxuICAgIHB1YmxpYyBSZXdhcmROdW1fMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFtzQgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRJdGVtXzQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph480ICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtXzQ6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkZpcnN0Q29tcGxldGVSZXdhcmQ+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRmlyc3RDb21wbGV0ZVJld2FyZE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRmlyc3RDb21wbGV0ZVJld2FyZCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25GaXJzdENvbXBsZXRlUmV3YXJk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkZpcnN0Q29tcGxldGVSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlBhc3NSZXdhcmQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25GaXJzdENvbXBsZXRlUmV3YXJkKGlkOm51bWJlcik6SnNvbkZpcnN0Q29tcGxldGVSZXdhcmQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKV9cIix0aGlzLmRhdGEpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5blhbPljaFJRCAqL1xyXG4gICAgcHVibGljIGdldExldmVsX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsX0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5bmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFyX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YXJfSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlpZblirFJROiOt+WPluWlluWKsemBk+WFtzEgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRJdGVtXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkSXRlbV8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5blpZblirHmlbDph48xICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlpZblirFJROiOt+WPluWlluWKsemBk+WFtzIgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRJdGVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkSXRlbV8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5blpZblirHmlbDph48yICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlpZblirFJROiOt+WPluWlluWKsemBk+WFtzMgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRJdGVtXzMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkSXRlbV8zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5blpZblirHmlbDph48zICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlpZblirFJROiOt+WPluWlluWKsemBk+WFtzQgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRJdGVtXzQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkSXRlbV80O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5aWW5YqxSUTojrflj5blpZblirHmlbDph480ICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDpgJrlhbPlpZblirFJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFBhc3NSZXdhcmQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxNTM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgc3RhdGljIGdldElkKGxldmVsOm51bWJlcixzdGFyOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBsZXZlbCoxMCtzdGFyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+WlluWKsSAqL1xyXG4gICAgcHVibGljIGdldEZpcnN0UmV3YXJkQXJyKGxldmVsSWQ6bnVtYmVyKTpSZXdhcmREYXRhW11cclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IGpzb25EYXRhOkpzb25GaXJzdENvbXBsZXRlUmV3YXJkPXRoaXMuZ2V0SnNvbkZpcnN0Q29tcGxldGVSZXdhcmQobGV2ZWxJZCk7XHJcbiAgICAgICAgbGV0IHJkQXJyPW5ldyBBcnJheTxSZXdhcmREYXRhPigpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrXCIsanNvbkRhdGEpXHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhWydSZXdhcmRJdGVtXycraV0+MCAmJiBqc29uRGF0YVsnUmV3YXJkTnVtXycraV0+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHJkLnJld2FyZF9pZD1qc29uRGF0YVsnUmV3YXJkSXRlbV8nK2ldO1xyXG4gICAgICAgICAgICAgICAgcmQucmV3YXJkX251bT1qc29uRGF0YVsnUmV3YXJkTnVtXycraV07XHJcbiAgICAgICAgICAgICAgICByZEFyci5wdXNoKHJkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcmRBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2soKXtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MTsgaTw9NDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpZD12W1wiUmV3YXJkSXRlbV9cIitpXTtcclxuICAgICAgICAgICAgICAgIGlmKGlkIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSXRlbShpZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6aaW6YCa5aWW5YqxSURcIitrK1wiLOS4jeWtmOWcqOWlluWKsWlkOlJld2FyZEl0ZW1fXCIraStcIj1cIitpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==