
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/CustomsClearanceRebate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21ab7XYIVRMwqc7a+8pE57S', 'CustomsClearanceRebate');
// Scripts/JsonData/CustomsClearanceRebate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomsClearanceRebateManager = exports.JsonCustomsClearanceRebate = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCustomsClearanceRebate = /** @class */ (function () {
    function JsonCustomsClearanceRebate() {
        /**奖励ID */
        this.RewardID = 0;
        /**获得钻石 */
        this.GetGem = 0;
        /**通关章节 */
        this.CompleteChapter = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCustomsClearanceRebate;
}());
exports.JsonCustomsClearanceRebate = JsonCustomsClearanceRebate;
var CustomsClearanceRebateManager = /** @class */ (function () {
    function CustomsClearanceRebateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CustomsClearanceRebateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CustomsClearanceRebateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CustomsClearanceRebateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CustomsClearanceRebateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CustomsClearanceRebate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCustomsClearanceRebate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCustomsClearanceRebate();
                jsonData = json[i];
                _this.data.set(jsonData.RewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CustomsClearanceRebateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CustomsClearanceRebateManager.prototype.getJsonCustomsClearanceRebate = function (id) {
        return this.data.get(id);
    };
    /**根据奖励ID获取获得钻石 */
    CustomsClearanceRebateManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据奖励ID获取通关章节 */
    CustomsClearanceRebateManager.prototype.getCompleteChapter = function (id) {
        return this.data.get(id).CompleteChapter;
    };
    /**根据奖励ID获取谷歌计费ID */
    CustomsClearanceRebateManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 奖励ID*/
    CustomsClearanceRebateManager.getMaxRewardID = function () {
        return 10;
    };
    CustomsClearanceRebateManager._instance = null;
    return CustomsClearanceRebateManager;
}());
exports.CustomsClearanceRebateManager = CustomsClearanceRebateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEN1c3RvbXNDbGVhcmFuY2VSZWJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBR3JEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixVQUFVO1FBQ0gsb0JBQWUsR0FBVSxDQUFDLENBQUU7UUFDbkMsWUFBWTtRQUNMLGNBQVMsR0FBVSxFQUFFLENBQUU7SUFDbEMsQ0FBQztJQUFELGlDQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSxnRUFBMEI7QUFXdkM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBd0MsSUFBSSxDQUFDO1FBQ2pELHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQTREeEMseUJBQXlCO0lBRzdCLENBQUM7SUE3RGlCLHlDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksNkJBQTZCLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsNENBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxnREFBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ2xHLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO2dCQUM5QyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsMERBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFFQUE2QixHQUFwQyxVQUFxQyxFQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGlEQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDBEQUFrQixHQUF6QixVQUEwQixFQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFDRCxvQkFBb0I7SUFDYixvREFBWSxHQUFuQixVQUFvQixFQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCw0Q0FBYyxHQUE1QjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQTdEYyx1Q0FBUyxHQUFrQyxJQUFJLENBQUM7SUFrRW5FLG9DQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksc0VBQTZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZSB7XHJcbiAgICAvKirlpZblirFJRCAqL1xyXG4gICAgcHVibGljIFJld2FyZElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X6ZK755+zICovXHJcbiAgICBwdWJsaWMgR2V0R2VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YCa5YWz56ug6IqCICovXHJcbiAgICBwdWJsaWMgQ29tcGxldGVDaGFwdGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6LC35q2M6K6h6LS5SUQgKi9cclxuICAgIHB1YmxpYyBQcm9kdWN0SWQ6c3RyaW5nID0gJycgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25DdXN0b21zQ2xlYXJhbmNlUmViYXRlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEN1c3RvbXNDbGVhcmFuY2VSZWJhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0N1c3RvbXNDbGVhcmFuY2VSZWJhdGUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25DdXN0b21zQ2xlYXJhbmNlUmViYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5SZXdhcmRJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkN1c3RvbXNDbGVhcmFuY2VSZWJhdGUoaWQ6bnVtYmVyKTpKc29uQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5YqxSUTojrflj5bojrflvpfpkrvnn7MgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0R2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5YqxSUTojrflj5bpgJrlhbPnq6DoioIgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wbGV0ZUNoYXB0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29tcGxldGVDaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5YqxSUTojrflj5bosLfmrYzorqHotLlJRCAqL1xyXG4gICAgcHVibGljIGdldFByb2R1Y3RJZChpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9kdWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlpZblirFJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJld2FyZElEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=