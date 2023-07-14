
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/Data/RogueReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcRGF0YVxcUm9ndWVSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQTBEO0FBQzFELHlEQUF3RDtBQUN4RCxvREFBK0M7QUFFL0M7SUFBQTtRQUNJLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFlBQVk7UUFDTCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxZQUFZO1FBQ0wsbUJBQWMsR0FBVSxDQUFDLENBQUU7UUFDbEMsWUFBWTtRQUNMLGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFlBQVk7UUFDTCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxZQUFZO1FBQ0wsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsWUFBWTtRQUNMLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFdBQVc7UUFDSixxQkFBZ0IsR0FBVSxDQUFDLENBQUU7SUFDeEMsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSwwQ0FBZTtBQW1CNUI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBNkIsSUFBSSxDQUFDO1FBQ3RDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQWdHNUMsQ0FBQztJQTlGaUIsOEJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxpQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLHFDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ3ZGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztnQkFDbkMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUMvQztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLCtDQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZiwrQ0FBa0IsR0FBekIsVUFBMEIsRUFBUztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxvQkFBb0I7SUFDYiw2Q0FBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsOENBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDZDQUFnQixHQUF2QixVQUF3QixFQUFTO1FBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFDRCxvQkFBb0I7SUFDYiw4Q0FBaUIsR0FBeEIsVUFBeUIsRUFBUztRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsNkNBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDhDQUFpQixHQUF4QixVQUF5QixFQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQzVDLENBQUM7SUFDRCxtQkFBbUI7SUFDWixnREFBbUIsR0FBMUIsVUFBMkIsRUFBUztRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0lBQzlDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCxtQ0FBZ0IsR0FBOUI7UUFDSSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQseUJBQXlCO0lBRWxCLDJDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsSUFBSSxVQUFVLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsU0FBUztRQUNULElBQUksR0FBRyxHQUFDLElBQUksMEJBQVUsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUMsbUJBQU0sQ0FBQyxRQUFRLENBQUM7UUFDOUIsR0FBRyxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ25CLElBQUksRUFBRSxHQUFDLElBQUksMEJBQVUsRUFBRSxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsRUFBRSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsV0FBVyxHQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxJQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkI7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFsR2MsNEJBQVMsR0FBdUIsSUFBSSxDQUFDO0lBbUd4RCx5QkFBQztDQXBHRCxBQW9HQyxJQUFBO0FBcEdZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uUm9ndWVSZXdhcmQge1xyXG4gICAgLyoq5qC85a2QSUQgKi9cclxuICAgIHB1YmxpYyBIZXhhZ29uX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MV9JRCAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDFfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcxX+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDFfU3VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3Ml9JRCAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDJfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcyX+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDJfU3VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3M19JRCAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDNfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbczX+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDNfU3VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5o6i57Si5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgRXhwbG9yZUNvaW5zX1N1bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvZ3VlUmV3YXJkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJvZ3VlUmV3YXJkTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Sb2d1ZVJld2FyZD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Um9ndWVSZXdhcmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgUm9ndWVSZXdhcmRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1JvZ3VlUmV3YXJkJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblJvZ3VlUmV3YXJk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblJvZ3VlUmV3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5IZXhhZ29uX0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUm9ndWVSZXdhcmQoaWQ6bnVtYmVyKTpKc29uUm9ndWVSZXdhcmQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3MV9JRCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlUHJvcDFfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wMV9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3MV/mlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZVByb3AxX1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb2d1ZVByb3AxX1N1bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3Ml9JRCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlUHJvcDJfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wMl9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3Ml/mlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZVByb3AyX1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb2d1ZVByb3AyX1N1bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3M19JRCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlUHJvcDNfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wM19JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6YGT5YW3M1/mlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZVByb3AzX1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb2d1ZVByb3AzX1N1bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W5o6i57Si5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0RXhwbG9yZUNvaW5zX1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeHBsb3JlQ29pbnNfU3VtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5qC85a2QSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhIZXhhZ29uX0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMzAwOTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgcHVibGljIGdldFJld2FyZERhdGFzKGlkOm51bWJlcik6UmV3YXJkRGF0YVtdIHtcclxuICAgICAgICBsZXQgcmV3YWREYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9dGhpcy5nZXRKc29uUm9ndWVSZXdhcmQoaWQpO1xyXG4gICAgICAgIC8v5o6i57Si5biBL+i/t+Wuq+W4gVxyXG4gICAgICAgIGxldCByZDE9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICByZDEucmV3YXJkX2lkPVByb3BJZC5NYXplQ29pbjtcclxuICAgICAgICByZDEucmV3YXJkX251bT1qc29uRGF0YS5FeHBsb3JlQ29pbnNfU3VtO1xyXG4gICAgICAgIHJld2FkRGF0YXMucHVzaChyZDEpO1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPWpzb25EYXRhWydSb2d1ZVByb3AnK2krJ19JRCddO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfbnVtPWpzb25EYXRhWydSb2d1ZVByb3AnK2krJ19TdW0nXTtcclxuICAgICAgICAgICAgaWYocmQucmV3YXJkX2lkPjAmJnJkLnJld2FyZF9udW0pe1xyXG4gICAgICAgICAgICAgICAgcmV3YWREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV3YWREYXRhcztcclxuICAgIH1cclxufVxyXG4iXX0=