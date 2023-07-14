
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/Data/AchievenmentTask.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7e483WcloJJ+4vv7r/D0y5p', 'AchievenmentTask');
// Scripts/Task/Data/AchievenmentTask.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievenmentTaskManager = exports.JsonAchievenmentTask = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var JsonAchievenmentTask = /** @class */ (function () {
    function JsonAchievenmentTask() {
        /**成就任务ID */
        this.TaskID = 0;
        /**成就任务类型 */
        this.AchievenmentTaskType = 0;
        /**任务阶段 */
        this.AchievenmentTaskPhase = 0;
        /**成就任务文本 */
        this.TaskDescription = 0;
        /**任务参数1 */
        this.TaskParameters = 0;
        /**奖励道具ID */
        this.RewardPropID = 0;
        /**奖励道具数量 */
        this.RewardPropNum = 0;
    }
    return JsonAchievenmentTask;
}());
exports.JsonAchievenmentTask = JsonAchievenmentTask;
var AchievenmentTaskManager = /** @class */ (function () {
    function AchievenmentTaskManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AchievenmentTaskManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AchievenmentTaskManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AchievenmentTaskManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AchievenmentTaskManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AchievenmentTask', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAchievenmentTask成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAchievenmentTask();
                jsonData = json[i];
                _this.data.set(jsonData.TaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AchievenmentTaskManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AchievenmentTaskManager.prototype.getJsonAchievenmentTask = function (id) {
        return this.data.get(id);
    };
    /**根据成就任务ID获取成就任务类型 */
    AchievenmentTaskManager.prototype.getAchievenmentTaskType = function (id) {
        return this.data.get(id).AchievenmentTaskType;
    };
    /**根据成就任务ID获取任务阶段 */
    AchievenmentTaskManager.prototype.getAchievenmentTaskPhase = function (id) {
        return this.data.get(id).AchievenmentTaskPhase;
    };
    /**根据成就任务ID获取成就任务文本 */
    AchievenmentTaskManager.prototype.getTaskDescription = function (id) {
        return this.data.get(id).TaskDescription;
    };
    /**根据成就任务ID获取任务参数1 */
    AchievenmentTaskManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /**根据成就任务ID获取奖励道具ID */
    AchievenmentTaskManager.prototype.getRewardPropID = function (id) {
        return this.data.get(id).RewardPropID;
    };
    /**根据成就任务ID获取奖励道具数量 */
    AchievenmentTaskManager.prototype.getRewardPropNum = function (id) {
        return this.data.get(id).RewardPropNum;
    };
    /** 静态方法，获取最大的 成就任务ID*/
    AchievenmentTaskManager.getMaxTaskID = function () {
        return 700006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    // 获取当前成就任务列表
    AchievenmentTaskManager.prototype.getAchievenmentTaskData = function () {
        var info = [];
        var type = 1;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
        this.data.forEach(function (v, k) {
            if (type == v.AchievenmentTaskType) {
                if (index == v.AchievenmentTaskPhase) {
                    type++;
                    index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                    info.push(v);
                }
            }
            else if (type < v.AchievenmentTaskType) {
                info.push(null);
                type++;
                index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                if (index == v.AchievenmentTaskPhase) {
                    type++;
                    index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
                    info.push(v);
                }
            }
        });
        if (info.length < Math.floor(AchievenmentTaskManager.getMaxTaskID() / 100000)) {
            info.push(null);
        }
        return info;
    };
    AchievenmentTaskManager.prototype.getNowAchievenmentTaskDataByType = function (type) {
        var info = null;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementIndex + type, 0) + 1;
        this.data.forEach(function (v, k) {
            if (type == v.AchievenmentTaskType) {
                if (index == v.AchievenmentTaskPhase) {
                    info = v;
                }
            }
        });
        return info;
    };
    AchievenmentTaskManager.prototype.getAchievenmentTaskDataByTypeAndIndex = function (type, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.AchievenmentTaskPhase == index && v.AchievenmentTaskType == type) {
                info = v;
            }
        });
        return info;
    };
    AchievenmentTaskManager._instance = null;
    return AchievenmentTaskManager;
}());
exports.AchievenmentTaskManager = AchievenmentTaskManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcRGF0YVxcQWNoaWV2ZW5tZW50VGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUVqRTtJQUFBO1FBQ0ksWUFBWTtRQUNMLFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsWUFBWTtRQUNMLHlCQUFvQixHQUFVLENBQUMsQ0FBRTtRQUN4QyxVQUFVO1FBQ0gsMEJBQXFCLEdBQVUsQ0FBQyxDQUFFO1FBQ3pDLFlBQVk7UUFDTCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxXQUFXO1FBQ0osbUJBQWMsR0FBVSxDQUFDLENBQUU7UUFDbEMsWUFBWTtRQUNMLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtJQUNyQyxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLG9EQUFvQjtBQWlCakM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBa0MsSUFBSSxDQUFDO1FBQzNDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQTZINUMsQ0FBQztJQTNIaUIsbUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxzQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDBDQUFRLEdBQWhCO1FB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QUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsa0VBQWdDLEdBQWhDLFVBQWlDLElBQVc7UUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksS0FBSyxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLG9CQUFvQixHQUFHLElBQUksRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFHLElBQUksSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUM7Z0JBQzlCLElBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsRUFBQztvQkFDaEMsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDWjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsdUVBQXFDLEdBQXJDLFVBQXNDLElBQVcsRUFBQyxLQUFZO1FBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2xCLElBQUcsQ0FBQyxDQUFDLHFCQUFxQixJQUFJLEtBQUssSUFBSyxDQUFDLENBQUMsb0JBQW9CLElBQUksSUFBSSxFQUFDO2dCQUNuRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQ1o7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUEvSGMsaUNBQVMsR0FBNEIsSUFBSSxDQUFDO0lBZ0k3RCw4QkFBQztDQWpJRCxBQWlJQyxJQUFBO0FBaklZLDBEQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25BY2hpZXZlbm1lbnRUYXNrIHtcclxuICAgIC8qKuaIkOWwseS7u+WKoUlEICovXHJcbiAgICBwdWJsaWMgVGFza0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oiQ5bCx5Lu75Yqh57G75Z6LICovXHJcbiAgICBwdWJsaWMgQWNoaWV2ZW5tZW50VGFza1R5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBBY2hpZXZlbm1lbnRUYXNrUGhhc2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJDlsLHku7vliqHmlofmnKwgKi9cclxuICAgIHB1YmxpYyBUYXNrRGVzY3JpcHRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHlj4LmlbAxICovXHJcbiAgICBwdWJsaWMgVGFza1BhcmFtZXRlcnM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIFJld2FyZFByb3BJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFt+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFJld2FyZFByb3BOdW06bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEFjaGlldmVubWVudFRhc2tNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkFjaGlldmVubWVudFRhc2s+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkFjaGlldmVubWVudFRhc2tNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQWNoaWV2ZW5tZW50VGFza01hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignQWNoaWV2ZW5tZW50VGFzaycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25BY2hpZXZlbm1lbnRUYXNr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkFjaGlldmVubWVudFRhc2soKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlRhc2tJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkFjaGlldmVubWVudFRhc2soaWQ6bnVtYmVyKTpKc29uQWNoaWV2ZW5tZW50VGFzayB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oiQ5bCx5Lu75YqhSUTojrflj5bmiJDlsLHku7vliqHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRBY2hpZXZlbm1lbnRUYXNrVHlwZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BY2hpZXZlbm1lbnRUYXNrVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaIkOWwseS7u+WKoUlE6I635Y+W5Lu75Yqh6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0QWNoaWV2ZW5tZW50VGFza1BoYXNlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFjaGlldmVubWVudFRhc2tQaGFzZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaIkOWwseS7u+WKoUlE6I635Y+W5oiQ5bCx5Lu75Yqh5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0VGFza0Rlc2NyaXB0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaIkOWwseS7u+WKoUlE6I635Y+W5Lu75Yqh5Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIGdldFRhc2tQYXJhbWV0ZXJzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oiQ5bCx5Lu75YqhSUTojrflj5blpZblirHpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZFByb3BJRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmRQcm9wSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJDlsLHku7vliqFJROiOt+WPluWlluWKsemBk+WFt+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZFByb3BOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkUHJvcE51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaIkOWwseS7u+WKoUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4VGFza0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNzAwMDA2O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8vIOiOt+WPluW9k+WJjeaIkOWwseS7u+WKoeWIl+ihqFxyXG4gICAgZ2V0QWNoaWV2ZW5tZW50VGFza0RhdGEoKTpKc29uQWNoaWV2ZW5tZW50VGFza1tde1xyXG4gICAgICAgIGxldCBpbmZvID0gW107XHJcbiAgICAgICAgbGV0IHR5cGUgPSAxO1xyXG4gICAgICAgIGxldCBpbmRleCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0FjaGlldmVtZW50SW5kZXggKyB0eXBlLDApICsgMTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlID09IHYuQWNoaWV2ZW5tZW50VGFza1R5cGUpe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gdi5BY2hpZXZlbm1lbnRUYXNrUGhhc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudEluZGV4ICsgdHlwZSwwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mby5wdXNoKHYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlIDwgdi5BY2hpZXZlbm1lbnRUYXNrVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpbmZvLnB1c2gobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0eXBlKys7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0FjaGlldmVtZW50SW5kZXggKyB0eXBlLDApICsgMTtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IHYuQWNoaWV2ZW5tZW50VGFza1BoYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlICsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnRJbmRleCArIHR5cGUsMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8ucHVzaCh2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGluZm8ubGVuZ3RoIDwgTWF0aC5mbG9vcihBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRNYXhUYXNrSUQoKSAvIDEwMDAwMCkpe1xyXG4gICAgICAgICAgICBpbmZvLnB1c2gobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vd0FjaGlldmVubWVudFRhc2tEYXRhQnlUeXBlKHR5cGU6bnVtYmVyKTpKc29uQWNoaWV2ZW5tZW50VGFza3tcclxuICAgICAgICBsZXQgaW5mbyA9IG51bGw7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnRJbmRleCArIHR5cGUsMCkgKyAxO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gdi5BY2hpZXZlbm1lbnRUYXNrVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSB2LkFjaGlldmVubWVudFRhc2tQaGFzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY2hpZXZlbm1lbnRUYXNrRGF0YUJ5VHlwZUFuZEluZGV4KHR5cGU6bnVtYmVyLGluZGV4Om51bWJlcik6SnNvbkFjaGlldmVubWVudFRhc2t7XHJcbiAgICAgICAgbGV0IGluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuQWNoaWV2ZW5tZW50VGFza1BoYXNlID09IGluZGV4ICAmJiB2LkFjaGlldmVubWVudFRhc2tUeXBlID09IHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxufVxyXG4iXX0=