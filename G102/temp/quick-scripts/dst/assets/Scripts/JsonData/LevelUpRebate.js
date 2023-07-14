
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/LevelUpRebate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf703rUfKtHg5VcKuuCsStG', 'LevelUpRebate');
// Scripts/JsonData/LevelUpRebate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpRebateManager = exports.JsonLevelUpRebate = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonLevelUpRebate = /** @class */ (function () {
    function JsonLevelUpRebate() {
        /**奖励ID */
        this.RewardID = 0;
        /**获得钻石 */
        this.GetGem = 0;
        /**解锁等级 */
        this.UnlockUserLevel = 0;
    }
    return JsonLevelUpRebate;
}());
exports.JsonLevelUpRebate = JsonLevelUpRebate;
var LevelUpRebateManager = /** @class */ (function () {
    function LevelUpRebateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    LevelUpRebateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LevelUpRebateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    LevelUpRebateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    LevelUpRebateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('LevelUpRebate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUpRebate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonLevelUpRebate();
                jsonData = json[i];
                _this.data.set(jsonData.RewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    LevelUpRebateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    LevelUpRebateManager.prototype.getJsonLevelUpRebate = function (id) {
        return this.data.get(id);
    };
    /**根据奖励ID获取获得钻石 */
    LevelUpRebateManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据奖励ID获取解锁等级 */
    LevelUpRebateManager.prototype.getUnlockUserLevel = function (id) {
        return this.data.get(id).UnlockUserLevel;
    };
    /** 静态方法，获取最大的 奖励ID*/
    LevelUpRebateManager.getMaxRewardID = function () {
        return 20;
    };
    LevelUpRebateManager._instance = null;
    return LevelUpRebateManager;
}());
exports.LevelUpRebateManager = LevelUpRebateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXExldmVsVXBSZWJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixVQUFVO1FBQ0gsb0JBQWUsR0FBVSxDQUFDLENBQUU7SUFDdkMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSw4Q0FBaUI7QUFTOUI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBK0IsSUFBSSxDQUFDO1FBQ3hDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQXdEeEMseUJBQXlCO0lBRzdCLENBQUM7SUF6RGlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsbUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx1Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUN6RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM3QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGlEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixtREFBb0IsR0FBM0IsVUFBNEIsRUFBUztRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCx3Q0FBUyxHQUFoQixVQUFpQixFQUFTO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxpREFBa0IsR0FBekIsVUFBMEIsRUFBUztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AsbUNBQWMsR0FBNUI7UUFDSSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUF6RGMsOEJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBOEQxRCwyQkFBQztDQS9ERCxBQStEQyxJQUFBO0FBL0RZLG9EQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uTGV2ZWxVcFJlYmF0ZSB7XHJcbiAgICAvKirlpZblirFJRCAqL1xyXG4gICAgcHVibGljIFJld2FyZElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X6ZK755+zICovXHJcbiAgICBwdWJsaWMgR2V0R2VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Kej6ZSB562J57qnICovXHJcbiAgICBwdWJsaWMgVW5sb2NrVXNlckxldmVsOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWxVcFJlYmF0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMZXZlbFVwUmViYXRlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25MZXZlbFVwUmViYXRlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpMZXZlbFVwUmViYXRlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IExldmVsVXBSZWJhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0xldmVsVXBSZWJhdGUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uTGV2ZWxVcFJlYmF0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25MZXZlbFVwUmViYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5SZXdhcmRJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkxldmVsVXBSZWJhdGUoaWQ6bnVtYmVyKTpKc29uTGV2ZWxVcFJlYmF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5YqxSUTojrflj5bojrflvpfpkrvnn7MgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0R2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5YqxSUTojrflj5bop6PplIHnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRVbmxvY2tVc2VyTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVW5sb2NrVXNlckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5aWW5YqxSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhSZXdhcmRJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDIwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19