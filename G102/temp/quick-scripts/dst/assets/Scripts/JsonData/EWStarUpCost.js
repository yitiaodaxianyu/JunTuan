
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/EWStarUpCost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3d33EP0xtDfpHQxJ3xPsHM', 'EWStarUpCost');
// Scripts/JsonData/EWStarUpCost.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EWStarUpCostManager = exports.JsonEWStarUpCost = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEWStarUpCost = /** @class */ (function () {
    function JsonEWStarUpCost() {
        /**升星ID */
        this.StarUp = 0;
        /**专武品质 */
        this.ExclusiveWeaponQuality = 0;
        /**阶段 */
        this.Stage = 0;
        /**消耗数量 */
        this.CostNum = 0;
    }
    return JsonEWStarUpCost;
}());
exports.JsonEWStarUpCost = JsonEWStarUpCost;
var EWStarUpCostManager = /** @class */ (function () {
    function EWStarUpCostManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    EWStarUpCostManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EWStarUpCostManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EWStarUpCostManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EWStarUpCostManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EWStarUpCost', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEWStarUpCost成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEWStarUpCost();
                jsonData = json[i];
                _this.data.set(jsonData.StarUp, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EWStarUpCostManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EWStarUpCostManager.prototype.getJsonEWStarUpCost = function (id) {
        return this.data.get(id);
    };
    /**根据升星ID获取专武品质 */
    EWStarUpCostManager.prototype.getExclusiveWeaponQuality = function (id) {
        return this.data.get(id).ExclusiveWeaponQuality;
    };
    /**根据升星ID获取阶段 */
    EWStarUpCostManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据升星ID获取消耗数量 */
    EWStarUpCostManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /** 静态方法，获取最大的 升星ID*/
    EWStarUpCostManager.getMaxStarUp = function () {
        return 1;
    };
    EWStarUpCostManager._instance = null;
    return EWStarUpCostManager;
}());
exports.EWStarUpCostManager = EWStarUpCostManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEVXU3RhclVwQ29zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFFckQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7UUFDMUMsUUFBUTtRQUNELFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7SUFDL0IsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSw0Q0FBZ0I7QUFXN0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBOEIsSUFBSSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQTREeEMseUJBQXlCO0lBRzdCLENBQUM7SUE3RGlCLCtCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0Qsa0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxzQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUN4RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDcEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUMzQztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGdEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixpREFBbUIsR0FBMUIsVUFBMkIsRUFBUztRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCx1REFBeUIsR0FBaEMsVUFBaUMsRUFBUztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBQ3BELENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxzQ0FBUSxHQUFmLFVBQWdCLEVBQVM7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHdDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLGdDQUFZLEdBQTFCO1FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBN0RjLDZCQUFTLEdBQXdCLElBQUksQ0FBQztJQWtFekQsMEJBQUM7Q0FuRUQsQUFtRUMsSUFBQTtBQW5FWSxrREFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkVXU3RhclVwQ29zdCB7XHJcbiAgICAvKirljYfmmJ9JRCAqL1xyXG4gICAgcHVibGljIFN0YXJVcDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4k+atpuWTgei0qCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKua2iOiAl+aVsOmHjyAqL1xyXG4gICAgcHVibGljIENvc3ROdW06bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFV1N0YXJVcENvc3RNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRVdTdGFyVXBDb3N0TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25FV1N0YXJVcENvc3Q+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkVXU3RhclVwQ29zdE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBFV1N0YXJVcENvc3RNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0VXU3RhclVwQ29zdCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25FV1N0YXJVcENvc3TmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uRVdTdGFyVXBDb3N0KCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5TdGFyVXAsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25FV1N0YXJVcENvc3QoaWQ6bnVtYmVyKTpKc29uRVdTdGFyVXBDb3N0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ljYfmmJ9JROiOt+WPluS4k+atpuWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvblF1YWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRXhjbHVzaXZlV2VhcG9uUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWNh+aYn0lE6I635Y+W6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ljYfmmJ9JROiOt+WPlua2iOiAl+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldENvc3ROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29zdE51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWNh+aYn0lEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3RhclVwKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==