
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/Data/TaskInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97dc45oqjJEGZdEHKS8O5uO', 'TaskInformation');
// Scripts/Task/Data/TaskInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInformationManager = exports.JsonTaskInformation = void 0;
var HttpManager_1 = require("../.././NetWork/HttpManager");
var LevelManager_1 = require("../../Level/LevelManager");
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var MyTool_1 = require("../../Tools/MyTool");
var UserData_1 = require("../../UserData");
var UserInfo_1 = require("../../UserInfo/UserInfo");
var JsonTaskInformation = /** @class */ (function () {
    function JsonTaskInformation() {
        /**任务ID */
        this.TaskID = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**解锁关卡 */
        this.Unlocklevel = 0;
        /**任务描述文本 */
        this.TaskDescription = 0;
        /**任务参数 */
        this.TaskParameters = 0;
        /**奖励道具ID */
        this.RewardPropID = 0;
        /**奖励积分 */
        this.RewardPropNum = 0;
        /**权重 */
        this.weights = 0;
    }
    return JsonTaskInformation;
}());
exports.JsonTaskInformation = JsonTaskInformation;
var TaskInformationManager = /** @class */ (function () {
    function TaskInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TaskInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TaskInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TaskInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TaskInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TaskInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTaskInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTaskInformation();
                jsonData = json[i];
                _this.data.set(jsonData.TaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TaskInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TaskInformationManager.prototype.getJsonTaskInformation = function (id) {
        return this.data.get(id);
    };
    /**根据任务ID获取任务类型 */
    TaskInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据任务ID获取解锁关卡 */
    TaskInformationManager.prototype.getUnlocklevel = function (id) {
        return this.data.get(id).Unlocklevel;
    };
    /**根据任务ID获取任务描述文本 */
    TaskInformationManager.prototype.getTaskDescription = function (id) {
        return this.data.get(id).TaskDescription;
    };
    /**根据任务ID获取任务参数 */
    TaskInformationManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /**根据任务ID获取奖励道具ID */
    TaskInformationManager.prototype.getRewardPropID = function (id) {
        return this.data.get(id).RewardPropID;
    };
    /**根据任务ID获取奖励积分 */
    TaskInformationManager.prototype.getRewardPropNum = function (id) {
        return this.data.get(id).RewardPropNum;
    };
    /**根据任务ID获取权重 */
    TaskInformationManager.prototype.getweights = function (id) {
        return this.data.get(id).weights;
    };
    /** 静态方法，获取最大的 任务ID*/
    TaskInformationManager.getMaxTaskID = function () {
        return 44004;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    // 根据通过关卡拿到对应的每日任务列表
    TaskInformationManager.prototype.getUnlockJsonData = function () {
        var info = [];
        var nowLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        this.data.forEach(function (v, k) {
            if (v.Unlocklevel <= nowLevel) {
                info.push(v);
            }
        });
        return info;
    };
    // 获取当日的任务列表
    TaskInformationManager.prototype.getDailyTaskData = function () {
        var info = [];
        // if(TheStorageManager.getInstance().getNumber(StorageKey.TaskId + 0,0) == 0){
        if (UserInfo_1.UserInfo.getInstance().dailyTaskList.length == 0) {
            var weight = [];
            var dataList = this.getUnlockJsonData();
            for (var i = 0; i < dataList.length; i++) {
                weight.push(dataList[i].weights);
            }
            var result = MyTool_1.default.getWeightIndexs(weight, 12);
            for (var i = 0; i < result.length; i++) {
                info.push(dataList[result[i]]);
                // 重置每日任务id
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskId + i, dataList[result[i]].TaskID);
                // 重置每日任务状态
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + dataList[result[i]].TaskID, 0);
                // 重置每日任务数据
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskNum + dataList[result[i]].TaskID, 0);
                // 上报新增的每日任务信息
                this.reportDailyTask(dataList[result[i]].TaskID);
            }
        }
        else {
            for (var i = 0; i < 12; i++) {
                info.push(this.getJsonTaskInformation(StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskId + i)));
            }
        }
        return info;
    };
    TaskInformationManager.prototype.reportDailyTask = function (id) {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameAchievementTask, this.getTaskInfoJsonString(id));
    };
    // 获取每日任务的上报json数据
    TaskInformationManager.prototype.getTaskInfoJsonString = function (id) {
        var uid = UserData_1.default.getInstance().getUserID();
        var time = UserInfo_1.UserInfo.getInstance().getNowDay();
        return JSON.stringify({
            uid: uid,
            today: time,
            dimension: 1,
            taskId: id,
            status: 0,
            emit: 0,
        });
    };
    TaskInformationManager._instance = null;
    return TaskInformationManager;
}());
exports.TaskInformationManager = TaskInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcRGF0YVxcVGFza0luZm9ybWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQseURBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsNkNBQXdDO0FBQ3hDLDJDQUFzQztBQUN0QyxvREFBbUQ7QUFFbkQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixZQUFZO1FBQ0wsb0JBQWUsR0FBVSxDQUFDLENBQUU7UUFDbkMsVUFBVTtRQUNILG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFlBQVk7UUFDTCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7SUFDL0IsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSxrREFBbUI7QUFtQmhDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWlDLElBQUksQ0FBQztRQUMxQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUF5STVDLENBQUM7SUF2SWlCLGtDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QscUNBQUksR0FBWjtRQUNJLElBQUcs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QUFrQjtJQUNWLHNEQUFxQixHQUE3QixVQUE4QixFQUFTO1FBQ25DLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFDLEdBQUc7WUFDUCxLQUFLLEVBQUMsSUFBSTtZQUNWLFNBQVMsRUFBQyxDQUFDO1lBQ1gsTUFBTSxFQUFDLEVBQUU7WUFDVCxNQUFNLEVBQUMsQ0FBQztZQUNSLElBQUksRUFBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTFJYyxnQ0FBUyxHQUEyQixJQUFJLENBQUM7SUE0STVELDZCQUFDO0NBN0lELEFBNklDLElBQUE7QUE3SVksd0RBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uLy4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblRhc2tJbmZvcm1hdGlvbiB7XHJcbiAgICAvKirku7vliqFJRCAqL1xyXG4gICAgcHVibGljIFRhc2tJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS7u+WKoeexu+WeiyAqL1xyXG4gICAgcHVibGljIFRhc2tUeXBlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Kej6ZSB5YWz5Y2hICovXHJcbiAgICBwdWJsaWMgVW5sb2NrbGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHmj4/ov7DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBUYXNrRGVzY3JpcHRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHlj4LmlbAgKi9cclxuICAgIHB1YmxpYyBUYXNrUGFyYW1ldGVyczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgUmV3YXJkUHJvcElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx56ev5YiGICovXHJcbiAgICBwdWJsaWMgUmV3YXJkUHJvcE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuadg+mHjSAqL1xyXG4gICAgcHVibGljIHdlaWdodHM6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVGFza0luZm9ybWF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25UYXNrSW5mb3JtYXRpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlRhc2tJbmZvcm1hdGlvbk1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1Rhc2tJbmZvcm1hdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25UYXNrSW5mb3JtYXRpb27miJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uVGFza0luZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5UYXNrSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25UYXNrSW5mb3JtYXRpb24oaWQ6bnVtYmVyKTpKc29uVGFza0luZm9ybWF0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ku7vliqFJROiOt+WPluS7u+WKoeexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldFRhc2tUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tUeXBlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Lu75YqhSUTojrflj5bop6PplIHlhbPljaEgKi9cclxuICAgIHB1YmxpYyBnZXRVbmxvY2tsZXZlbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5VbmxvY2tsZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS7u+WKoUlE6I635Y+W5Lu75Yqh5o+P6L+w5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0VGFza0Rlc2NyaXB0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS7u+WKoUlE6I635Y+W5Lu75Yqh5Y+C5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0VGFza1BhcmFtZXRlcnMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGFza1BhcmFtZXRlcnM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ku7vliqFJROiOt+WPluWlluWKsemBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkUHJvcElEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJld2FyZFByb3BJRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS7u+WKoUlE6I635Y+W5aWW5Yqx56ev5YiGICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkUHJvcE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmRQcm9wTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Lu75YqhSUTojrflj5bmnYPph40gKi9cclxuICAgIHB1YmxpYyBnZXR3ZWlnaHRzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLndlaWdodHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDku7vliqFJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFRhc2tJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDQ0MDA0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8vIOagueaNrumAmui/h+WFs+WNoeaLv+WIsOWvueW6lOeahOavj+aXpeS7u+WKoeWIl+ihqFxyXG4gICAgZ2V0VW5sb2NrSnNvbkRhdGEoKTpKc29uVGFza0luZm9ybWF0aW9uW117XHJcbiAgICAgICAgbGV0IGluZm8gPSBbXTtcclxuICAgICAgICBsZXQgbm93TGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5VbmxvY2tsZXZlbCA8PSBub3dMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5blvZPml6XnmoTku7vliqHliJfooahcclxuICAgIGdldERhaWx5VGFza0RhdGEoKTpKc29uVGFza0luZm9ybWF0aW9uW117XHJcbiAgICAgICAgbGV0IGluZm8gPSBbXTtcclxuICAgICAgICAvLyBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tJZCArIDAsMCkgPT0gMCl7XHJcbiAgICAgICAgaWYoVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5kYWlseVRhc2tMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IHdlaWdodDpudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUxpc3QgPSB0aGlzLmdldFVubG9ja0pzb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxkYXRhTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHdlaWdodC5wdXNoKGRhdGFMaXN0W2ldLndlaWdodHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBNeVRvb2wuZ2V0V2VpZ2h0SW5kZXhzKHdlaWdodCwxMik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxyZXN1bHQubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpbmZvLnB1c2goZGF0YUxpc3RbcmVzdWx0W2ldXSk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nva7mr4/ml6Xku7vliqFpZFxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0lkICsgaSxkYXRhTGlzdFtyZXN1bHRbaV1dLlRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nva7mr4/ml6Xku7vliqHnirbmgIFcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIGRhdGFMaXN0W3Jlc3VsdFtpXV0uVGFza0lELDApO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN572u5q+P5pel5Lu75Yqh5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrTnVtICsgZGF0YUxpc3RbcmVzdWx0W2ldXS5UYXNrSUQsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyDkuIrmiqXmlrDlop7nmoTmr4/ml6Xku7vliqHkv6Hmga9cclxuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0RGFpbHlUYXNrKGRhdGFMaXN0W3Jlc3VsdFtpXV0uVGFza0lEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2k8MTI7aSsrKXtcclxuICAgICAgICAgICAgICAgIGluZm8ucHVzaCh0aGlzLmdldEpzb25UYXNrSW5mb3JtYXRpb24oVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrSWQgKyBpKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcG9ydERhaWx5VGFzayhpZDpudW1iZXIpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldFRhc2tJbmZvSnNvblN0cmluZyhpZCkpO1xyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5q+P5pel5Lu75Yqh55qE5LiK5oqlanNvbuaVsOaNrlxyXG4gICAgcHJpdmF0ZSBnZXRUYXNrSW5mb0pzb25TdHJpbmcoaWQ6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCB0aW1lID0gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXROb3dEYXkoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICB0b2RheTp0aW1lLFxyXG4gICAgICAgICAgICBkaW1lbnNpb246MSxcclxuICAgICAgICAgICAgdGFza0lkOmlkLFxyXG4gICAgICAgICAgICBzdGF0dXM6MCxcclxuICAgICAgICAgICAgZW1pdDowLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=