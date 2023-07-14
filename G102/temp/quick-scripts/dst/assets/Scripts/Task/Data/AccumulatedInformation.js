
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/Data/AccumulatedInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a878gKyddBMrpvSygQG8ov', 'AccumulatedInformation');
// Scripts/Task/Data/AccumulatedInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccumulatedInformationManager = exports.JsonAccumulatedInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonAccumulatedInformation = /** @class */ (function () {
    function JsonAccumulatedInformation() {
        /**累计积分奖励ID */
        this.AccumulatedPointsID = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**累计积分 */
        this.AccumulatedPoints = 0;
        /**道具1ID */
        this.PropID_1 = 0;
        /**道具1数量 */
        this.PropNum_1 = 0;
    }
    return JsonAccumulatedInformation;
}());
exports.JsonAccumulatedInformation = JsonAccumulatedInformation;
var AccumulatedInformationManager = /** @class */ (function () {
    function AccumulatedInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AccumulatedInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AccumulatedInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AccumulatedInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AccumulatedInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AccumulatedInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAccumulatedInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAccumulatedInformation();
                jsonData = json[i];
                _this.data.set(jsonData.AccumulatedPointsID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AccumulatedInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AccumulatedInformationManager.prototype.getJsonAccumulatedInformation = function (id) {
        return this.data.get(id);
    };
    /**根据累计积分奖励ID获取任务类型 */
    AccumulatedInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据累计积分奖励ID获取累计积分 */
    AccumulatedInformationManager.prototype.getAccumulatedPoints = function (id) {
        return this.data.get(id).AccumulatedPoints;
    };
    /**根据累计积分奖励ID获取道具1ID */
    AccumulatedInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据累计积分奖励ID获取道具1数量 */
    AccumulatedInformationManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /** 静态方法，获取最大的 累计积分奖励ID*/
    AccumulatedInformationManager.getMaxAccumulatedPointsID = function () {
        return 250010;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    AccumulatedInformationManager.prototype.getRewardByTaskType = function (type) {
        var info = [];
        this.data.forEach(function (v, k) {
            if (v.TaskType == type) {
                info.push(v);
            }
        });
        return info;
    };
    AccumulatedInformationManager._instance = null;
    return AccumulatedInformationManager;
}());
exports.AccumulatedInformationManager = AccumulatedInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcRGF0YVxcQWNjdW11bGF0ZWRJbmZvcm1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLGNBQWM7UUFDUCx3QkFBbUIsR0FBVSxDQUFDLENBQUU7UUFDdkMsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILHNCQUFpQixHQUFVLENBQUMsQ0FBRTtRQUNyQyxXQUFXO1FBQ0osYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixXQUFXO1FBQ0osY0FBUyxHQUFVLENBQUMsQ0FBRTtJQUNqQyxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLGdFQUEwQjtBQWF2QztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF3QyxJQUFJLENBQUM7UUFDakQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBNEU1QyxDQUFDO0lBMUVpQix5Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDZCQUE2QixFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDRDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsZ0RBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNsRyxJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksMEJBQTBCLEVBQUUsQ0FBQztnQkFDOUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsMERBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFFQUE2QixHQUFwQyxVQUFxQyxFQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHNCQUFzQjtJQUNmLG1EQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDREQUFvQixHQUEzQixVQUE0QixFQUFTO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUNELHVCQUF1QjtJQUNoQixtREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCx1QkFBdUI7SUFDaEIsb0RBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQseUJBQXlCO0lBQ1gsdURBQXlCLEdBQXZDO1FBQ0ksT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUF5QjtJQUV6QiwyREFBbUIsR0FBbkIsVUFBb0IsSUFBVztRQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2xCLElBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUM7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUE3RWMsdUNBQVMsR0FBa0MsSUFBSSxDQUFDO0lBK0VuRSxvQ0FBQztDQWhGRCxBQWdGQyxJQUFBO0FBaEZZLHNFQUE2QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQWNjdW11bGF0ZWRJbmZvcm1hdGlvbiB7XHJcbiAgICAvKirntK/orqHnp6/liIblpZblirFJRCAqL1xyXG4gICAgcHVibGljIEFjY3VtdWxhdGVkUG9pbnRzSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBUYXNrVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKue0r+iuoeenr+WIhiAqL1xyXG4gICAgcHVibGljIEFjY3VtdWxhdGVkUG9pbnRzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MUlEICovXHJcbiAgICBwdWJsaWMgUHJvcElEXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcx5pWw6YePICovXHJcbiAgICBwdWJsaWMgUHJvcE51bV8xOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdW11bGF0ZWRJbmZvcm1hdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25BY2N1bXVsYXRlZEluZm9ybWF0aW9uPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0FjY3VtdWxhdGVkSW5mb3JtYXRpb24nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQWNjdW11bGF0ZWRJbmZvcm1hdGlvbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25BY2N1bXVsYXRlZEluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5BY2N1bXVsYXRlZFBvaW50c0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQWNjdW11bGF0ZWRJbmZvcm1hdGlvbihpZDpudW1iZXIpOkpzb25BY2N1bXVsYXRlZEluZm9ybWF0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHnp6/liIblpZblirFJROiOt+WPluS7u+WKoeexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldFRhc2tUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tUeXBlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h56ev5YiG5aWW5YqxSUTojrflj5bntK/orqHnp6/liIYgKi9cclxuICAgIHB1YmxpYyBnZXRBY2N1bXVsYXRlZFBvaW50cyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BY2N1bXVsYXRlZFBvaW50cztcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeenr+WIhuWlluWKsUlE6I635Y+W6YGT5YW3MUlEICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvcElEXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvcElEXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHnp6/liIblpZblirFJROiOt+WPlumBk+WFtzHmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wTnVtXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvcE51bV8xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg57Sv6K6h56ev5YiG5aWW5YqxSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhBY2N1bXVsYXRlZFBvaW50c0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjUwMDEwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldFJld2FyZEJ5VGFza1R5cGUodHlwZTpudW1iZXIpOkpzb25BY2N1bXVsYXRlZEluZm9ybWF0aW9uW117XHJcbiAgICAgICAgbGV0IGluZm8gPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LlRhc2tUeXBlID09IHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgaW5mby5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==