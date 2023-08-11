
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Turntable/Times.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ede9OobuNKTpY4e4TFsF44', 'Times');
// Scripts/Turntable/Times.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { _decorator, Component, macro, Game, game } from 'cc';
// import { FramePublic } from './FramePublic';
// import LocalItemName from './LocalItemName';
// import { OfflineReward } from './OfflineReward';
var GameManager_1 = require("../GameManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var PublicMethods_1 = require("./PublicMethods");
var Turmtable_1 = require("./Turmtable");
// import { PublicMethods } from './PublicMethods';
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Predefined variables
 * Name = Time
 * DateTime = Tue Nov 08 2022 17:51:49 GMT+0800 (中国标准时间)
 * Author = dxq0328
 * FileBasename = Time.ts
 * FileBasenameNoExtension = Time
 * URL = db://assets/Scripts/Frame/Time.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
var Times = /** @class */ (function (_super) {
    __extends(Times, _super);
    function Times() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Times_1 = Times;
    Times.prototype.onLoad = function () {
        var interval = 1; // 以秒为单位的时间间隔
        var repeat = cc.macro.REPEAT_FOREVER; // 重复次数     // cc.macro.REPEAT_FOREVER
        var delay = 0;
        cc.game.addPersistRootNode(this.node); // 开始延时1秒后开始
        this.schedule(this.Management, interval, repeat, delay);
        //从后台到前台的事件
        // cc.game.on(cc.game.EVENT_HIDE, ()=>{
        //     this.GameShow();
        // }, this);
    };
    Times.prototype.Management = function () {
        // this.SaveLocalTime();//每隔1秒保存一下时间到本地
        var TurmtableFreeYes = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeYes, 0);
        if (TurmtableFreeYes == 0) {
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeTime, GameManager_1.default.getInstance().tumTableTime);
            num -= 1;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, "" + num);
            if (Times_1.timetxt != null) {
                // @ts-ignore
                if (Times_1.timetxt._name != "") {
                    Times_1.timetxt.getComponent(cc.Label).string = "" + PublicMethods_1.default.timeconversions(num);
                }
            }
            if (num == 0) {
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeYes, 1);
                if (Times_1.Turmtablenode != null) {
                    // @ts-ignore
                    if (Times_1.Turmtablenode._name != "") {
                        Times_1.Turmtablenode.getComponent(Turmtable_1.default).Refresh();
                    }
                }
            }
        }
    };
    var Times_1;
    Times.timetxt = null;
    Times.Turmtablenode = null;
    Times.voidsensid = 0; //虚空裂缝打到那一层的id
    Times = Times_1 = __decorate([
        ccclass
    ], Times);
    return Times;
}(cc.Component));
exports.default = Times;
/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUaW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpRUFBaUU7QUFDakUsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQsOENBQXlDO0FBQ3pDLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsaURBQTRDO0FBQzVDLHlDQUFvQztBQUVwQyxtREFBbUQ7QUFDN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUM7Ozs7Ozs7Ozs7R0FVRztBQUVGO0lBQW1DLHlCQUFZO0lBQS9DOztJQXVERCxDQUFDO2NBdkRxQixLQUFLO0lBS3ZCLHNCQUFNLEdBQU47UUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBdUIsYUFBYTtRQUNyRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFHLHNDQUFzQztRQUM5RSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFvQixZQUFZO1FBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELFdBQVc7UUFDWCx1Q0FBdUM7UUFDdkMsdUJBQXVCO1FBQ3ZCLFlBQVk7SUFFaEIsQ0FBQztJQUNELDBCQUFVLEdBQVY7UUFDSSx1Q0FBdUM7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBQyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFHLGdCQUFnQixJQUFFLENBQUMsRUFBQztZQUNuQixJQUFJLEdBQUcsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFILEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDVCxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBRyxPQUFLLENBQUMsT0FBTyxJQUFFLElBQUksRUFBQztnQkFDbkIsYUFBYTtnQkFDYixJQUFHLE9BQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLEVBQUUsRUFBQztvQkFDdkIsT0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsdUJBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3BGO2FBQ0o7WUFDRCxJQUFHLEdBQUcsSUFBRSxDQUFDLEVBQUM7Z0JBQ04sa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLElBQUcsT0FBSyxDQUFDLGFBQWEsSUFBRSxJQUFJLEVBQUM7b0JBQ3pCLGFBQWE7b0JBQ2IsSUFBRyxPQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBRSxFQUFFLEVBQUM7d0JBQzdCLE9BQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtxQkFDeEQ7aUJBQ0o7YUFFSjtTQUNKO0lBQ0wsQ0FBQzs7SUF4Q2EsYUFBTyxHQUFTLElBQUksQ0FBQztJQUNyQixtQkFBYSxHQUFTLElBQUksQ0FBQztJQUUzQixnQkFBVSxHQUFRLENBQUMsQ0FBQyxDQUFBLGNBQWM7SUFKOUIsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXVEMUI7SUFBRCxZQUFDO0NBdkRBLEFBdURBLENBdkRtQyxFQUFFLENBQUMsU0FBUyxHQXVEL0M7a0JBdkRxQixLQUFLO0FBeUQzQjs7Ozs7Ozs7O0dBU0ciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBtYWNybywgR2FtZSwgZ2FtZSB9IGZyb20gJ2NjJztcclxuLy8gaW1wb3J0IHsgRnJhbWVQdWJsaWMgfSBmcm9tICcuL0ZyYW1lUHVibGljJztcclxuLy8gaW1wb3J0IExvY2FsSXRlbU5hbWUgZnJvbSAnLi9Mb2NhbEl0ZW1OYW1lJztcclxuLy8gaW1wb3J0IHsgT2ZmbGluZVJld2FyZCB9IGZyb20gJy4vT2ZmbGluZVJld2FyZCc7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgUHVibGljTWV0aG9kcyBmcm9tIFwiLi9QdWJsaWNNZXRob2RzXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4vVHVybXRhYmxlXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBQdWJsaWNNZXRob2RzIH0gZnJvbSAnLi9QdWJsaWNNZXRob2RzJztcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8qKlxyXG4gKiBQcmVkZWZpbmVkIHZhcmlhYmxlc1xyXG4gKiBOYW1lID0gVGltZVxyXG4gKiBEYXRlVGltZSA9IFR1ZSBOb3YgMDggMjAyMiAxNzo1MTo0OSBHTVQrMDgwMCAo5Lit5Zu95qCH5YeG5pe26Ze0KVxyXG4gKiBBdXRob3IgPSBkeHEwMzI4XHJcbiAqIEZpbGVCYXNlbmFtZSA9IFRpbWUudHNcclxuICogRmlsZUJhc2VuYW1lTm9FeHRlbnNpb24gPSBUaW1lXHJcbiAqIFVSTCA9IGRiOi8vYXNzZXRzL1NjcmlwdHMvRnJhbWUvVGltZS50c1xyXG4gKiBNYW51YWxVcmwgPSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9cclxuICpcclxuICovXHJcbiBAY2NjbGFzc1xyXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyB0aW1ldHh0OmNjLk5vZGU9bnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHVybXRhYmxlbm9kZTpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB2b2lkc2Vuc2lkOm51bWJlcj0wOy8v6Jma56m66KOC57yd5omT5Yiw6YKj5LiA5bGC55qEaWRcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxOyAgICAgICAgICAgICAgICAgICAgICAgLy8g5Lul56eS5Li65Y2V5L2N55qE5pe26Ze06Ze06ZqUXHJcbiAgICAgICAgdmFyIHJlcGVhdCA9IGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSOyAgIC8vIOmHjeWkjeasoeaVsCAgICAgLy8gY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVJcclxuICAgICAgICB2YXIgZGVsYXkgPSAwOyAgICAgIFxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7ICAgICAgICAgICAgICAgICAgICAvLyDlvIDlp4vlu7bml7Yx56eS5ZCO5byA5aeLXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLk1hbmFnZW1lbnQsIGludGVydmFsLCByZXBlYXQsIGRlbGF5KTtcclxuICAgICAgICAvL+S7juWQjuWPsOWIsOWJjeWPsOeahOS6i+S7tlxyXG4gICAgICAgIC8vIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCAoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLkdhbWVTaG93KCk7XHJcbiAgICAgICAgLy8gfSwgdGhpcyk7XHJcblxyXG4gICAgfVxyXG4gICAgTWFuYWdlbWVudCgpIHsvL+iuoeaXtuWZqFxyXG4gICAgICAgIC8vIHRoaXMuU2F2ZUxvY2FsVGltZSgpOy8v5q+P6ZqUMeenkuS/neWtmOS4gOS4i+aXtumXtOWIsOacrOWcsFxyXG4gICAgICAgIGxldCBUdXJtdGFibGVGcmVlWWVzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywwKTtcclxuICAgICAgICBpZihUdXJtdGFibGVGcmVlWWVzPT0wKXtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkudHVtVGFibGVUaW1lKTtcclxuICAgICAgICAgICAgbnVtIC09IDE7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCBcIlwiICsgbnVtKTtcclxuICAgICAgICAgICAgaWYoVGltZXMudGltZXR4dCE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBpZihUaW1lcy50aW1ldHh0Ll9uYW1lIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBUaW1lcy50aW1ldHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrUHVibGljTWV0aG9kcy50aW1lY29udmVyc2lvbnMobnVtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG51bT09MCl7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmKFRpbWVzLlR1cm10YWJsZW5vZGUhPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBpZihUaW1lcy5UdXJtdGFibGVub2RlLl9uYW1lIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGltZXMuVHVybXRhYmxlbm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5SZWZyZXNoKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFNhdmVMb2NhbFRpbWUoKSB7Ly/kv53lrZjkuIDkuIvmnKzlnLDml7bpl7RcclxuICAgIC8vICAgICBQdWJsaWNNZXRob2RzLnNldEN1cnJlbnRUaW1lKCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBHYW1lSGlkZSgpIHsvL+a4uOaIj+makOiXj1xyXG4gICAgLy8gICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5ri45oiP6L+b5YWl5ZCO5Y+wXCIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLlNhdmVMb2NhbFRpbWUoKTsvL1xyXG4gICAgLy8gICAgIH0sIHRoaXMpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gR2FtZVNob3coKSB7Ly/muLjmiI/mmL7npLpcclxuICAgIC8vICAgICAvLyBPZmZsaW5lUmV3YXJkLnNoYW5nZGlhbl8yNCgpO1xyXG4gICAgLy8gICAgIC8vIE9mZmxpbmVSZXdhcmQuVGltZV9qaWFuc2hhbygpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG4vKipcclxuICogWzFdIENsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcy5cclxuICogWzJdIFVzZSBgcHJvcGVydHlgIGRlY29yYXRvciBpZiB5b3VyIHdhbnQgdGhlIG1lbWJlciB0byBiZSBzZXJpYWxpemFibGUuXHJcbiAqIFszXSBZb3VyIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZS5cclxuICogWzRdIFlvdXIgdXBkYXRlIGZ1bmN0aW9uIGdvZXMgaGVyZS5cclxuICpcclxuICogTGVhcm4gbW9yZSBhYm91dCBzY3JpcHRpbmc6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9cclxuICogTGVhcm4gbW9yZSBhYm91dCBDQ0NsYXNzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvY2NjbGFzcy5odG1sXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgbGlmZS1jeWNsZSBjYWxsYmFja3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbiAqL1xyXG4iXX0=