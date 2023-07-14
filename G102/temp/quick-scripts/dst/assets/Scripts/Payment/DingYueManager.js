
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/DingYueManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '173bbbxjjJEronUtwPqt8Y1', 'DingYueManager');
// Scripts/Payment/DingYueManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingYueManager = void 0;
var Constants_1 = require("../Constants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var PayManager_1 = require("./PayManager");
var DingYueManager = /** @class */ (function () {
    function DingYueManager() {
        this.week_info = null;
        this.month_info = null;
        this.quarter_info = null;
    }
    DingYueManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DingYueManager();
            this._instance.init();
        }
        return this._instance;
    };
    DingYueManager.prototype.init = function () {
        this.initCardInfo();
    };
    DingYueManager.prototype.initCardInfo = function () {
        //ApkManager.getInstance().getDingYueInfo()
    };
    DingYueManager.prototype.setCardInfo = function (payInfos) {
        for (var i = 0; i < payInfos.length; i++) {
            var payInfo = payInfos[i];
            switch (payInfo.pay_id) {
                case 'b101':
                    {
                        this.month_info = payInfo;
                    }
                    break;
                case 'b102':
                    {
                        this.quarter_info = payInfo;
                    }
                    break;
                // 周卡支付ID
                case 'c502':
                    {
                        this.week_info = payInfo;
                    }
                    break;
            }
        }
    };
    DingYueManager.prototype.getWeekInfo = function () {
        if (Constants_1.IsDebug && this.week_info) {
            this.week_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.week_info.pay_id) > 0;
        }
        return this.week_info;
    };
    DingYueManager.prototype.getMonthCardInfo = function () {
        if (Constants_1.IsDebug && this.month_info) {
            this.month_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.month_info.pay_id) > 0;
        }
        return this.month_info;
    };
    DingYueManager.prototype.getQuarterCardInfo = function () {
        if (Constants_1.IsDebug) {
            this.quarter_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.quarter_info.pay_id) > 0;
        }
        return this.quarter_info;
    };
    /**获取今天是否领取了 */
    DingYueManager.prototype.getTodayIsGet = function (id) {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.DingYueGetState + id, 0) > 0;
    };
    DingYueManager.prototype.saveTodayGet = function (id, isGet) {
        var num = isGet ? 1 : 0;
        return StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + id, num);
    };
    DingYueManager.prototype.resetTodayGetState = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + 1001, 0);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + 2001, 0);
    };
    DingYueManager._instance = null;
    return DingYueManager;
}());
exports.DingYueManager = DingYueManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGluZ1l1ZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMENBQXVDO0FBQ3ZDLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFFOUQsMkNBQTBDO0FBRTFDO0lBQUE7UUFJWSxjQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLGVBQVUsR0FBUyxJQUFJLENBQUM7UUFDeEIsaUJBQVksR0FBUyxJQUFJLENBQUM7SUF3RXRDLENBQUM7SUF0RWlCLDBCQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksY0FBYyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU8sNkJBQUksR0FBWjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQscUNBQVksR0FBWjtRQUNJLDJDQUEyQztJQUMvQyxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLFFBQWtCO1FBQzFCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ2hDLElBQUksT0FBTyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixRQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUM7Z0JBQ2xCLEtBQUssTUFBTTtvQkFBQzt3QkFDUixJQUFJLENBQUMsVUFBVSxHQUFDLE9BQU8sQ0FBQztxQkFDM0I7b0JBQUEsTUFBTTtnQkFDUCxLQUFLLE1BQU07b0JBQUM7d0JBQ1IsSUFBSSxDQUFDLFlBQVksR0FBQyxPQUFPLENBQUM7cUJBQzdCO29CQUFBLE1BQU07Z0JBQ1AsU0FBUztnQkFDVCxLQUFLLE1BQU07b0JBQUM7d0JBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLENBQUM7cUJBQzFCO29CQUFBLE1BQU07YUFDVjtTQUNKO0lBQ0wsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxJQUFHLG1CQUFPLElBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQztTQUNyRjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0ksSUFBRyxtQkFBTyxJQUFFLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUM7U0FDdkY7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELDJDQUFrQixHQUFsQjtRQUNJLElBQUcsbUJBQU8sRUFBQztZQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQzNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFDRCxlQUFlO0lBQ2Ysc0NBQWEsR0FBYixVQUFjLEVBQVM7UUFDbkIsT0FBTyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQVUsQ0FBQyxlQUFlLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLEVBQVMsRUFBQyxLQUFhO1FBQ2hDLElBQUksR0FBRyxHQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDbEIsT0FBTyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxlQUFlLEdBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCwyQ0FBa0IsR0FBbEI7UUFDSSxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxlQUFlLEdBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLGVBQWUsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQTNFYyx3QkFBUyxHQUFnQixJQUFJLENBQUM7SUE0RWpELHFCQUFDO0NBOUVELEFBOEVDLElBQUE7QUE5RVksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXNEZWJ1ZyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlJbmZvIH0gZnJvbSBcIi4uL3RoaXJkUGFydHkvVGhpcmRQYXJ0eVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5TWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpbmdZdWVNYW5hZ2Vye1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpEaW5nWXVlTWFuYWdlcj1udWxsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHdlZWtfaW5mbzpQYXlJbmZvPW51bGw7XHJcbiAgICBwcml2YXRlIG1vbnRoX2luZm86UGF5SW5mbz1udWxsO1xyXG4gICAgcHJpdmF0ZSBxdWFydGVyX2luZm86UGF5SW5mbz1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpEaW5nWXVlTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IERpbmdZdWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpe1xyXG4gICAgICAgIHRoaXMuaW5pdENhcmRJbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENhcmRJbmZvKCl7XHJcbiAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGluZ1l1ZUluZm8oKVxyXG4gICAgfVxyXG5cclxuICAgIHNldENhcmRJbmZvKHBheUluZm9zOlBheUluZm9bXSl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8cGF5SW5mb3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcGF5SW5mbz1wYXlJbmZvc1tpXTtcclxuICAgICAgICAgICAgc3dpdGNoKHBheUluZm8ucGF5X2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2IxMDEnOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoX2luZm89cGF5SW5mbztcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2IxMDInOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1YXJ0ZXJfaW5mbz1wYXlJbmZvO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8g5ZGo5Y2h5pSv5LuYSURcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2M1MDInOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtfaW5mbz1wYXlJbmZvO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdlZWtJbmZvKCk6UGF5SW5mb3tcclxuICAgICAgICBpZihJc0RlYnVnJiZ0aGlzLndlZWtfaW5mbyl7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla19pbmZvLmlzX2J1eT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKHRoaXMud2Vla19pbmZvLnBheV9pZCk+MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla19pbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vbnRoQ2FyZEluZm8oKTpQYXlJbmZve1xyXG4gICAgICAgIGlmKElzRGVidWcmJnRoaXMubW9udGhfaW5mbyl7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGhfaW5mby5pc19idXk9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheU51bSh0aGlzLm1vbnRoX2luZm8ucGF5X2lkKT4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aF9pbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFF1YXJ0ZXJDYXJkSW5mbygpOlBheUluZm97XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIHRoaXMucXVhcnRlcl9pbmZvLmlzX2J1eT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKHRoaXMucXVhcnRlcl9pbmZvLnBheV9pZCk+MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVhcnRlcl9pbmZvO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5LuK5aSp5piv5ZCm6aKG5Y+W5LqGICovXHJcbiAgICBnZXRUb2RheUlzR2V0KGlkOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5EaW5nWXVlR2V0U3RhdGUraWQsMCk+MDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZVRvZGF5R2V0KGlkOm51bWJlcixpc0dldDpib29sZWFuKXtcclxuICAgICAgICBsZXQgbnVtPWlzR2V0PzE6MDtcclxuICAgICAgICByZXR1cm4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGluZ1l1ZUdldFN0YXRlK2lkLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRUb2RheUdldFN0YXRlKCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGluZ1l1ZUdldFN0YXRlKzEwMDEsMCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGluZ1l1ZUdldFN0YXRlKzIwMDEsMCk7XHJcbiAgICB9XHJcbn1cclxuIl19