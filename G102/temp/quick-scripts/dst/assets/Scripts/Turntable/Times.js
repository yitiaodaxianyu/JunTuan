
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
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeTime, 900);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUaW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpRUFBaUU7QUFDakUsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCxpREFBNEM7QUFDNUMseUNBQW9DO0FBRXBDLG1EQUFtRDtBQUM3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQzs7Ozs7Ozs7OztHQVVHO0FBRUY7SUFBbUMseUJBQVk7SUFBL0M7O0lBdURELENBQUM7Y0F2RHFCLEtBQUs7SUFLdkIsc0JBQU0sR0FBTjtRQUNJLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUF1QixhQUFhO1FBQ3JELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUcsc0NBQXNDO1FBQzlFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQW9CLFlBQVk7UUFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsV0FBVztRQUNYLHVDQUF1QztRQUN2Qyx1QkFBdUI7UUFDdkIsWUFBWTtJQUVoQixDQUFDO0lBQ0QsMEJBQVUsR0FBVjtRQUNJLHVDQUF1QztRQUN2QyxJQUFJLGdCQUFnQixHQUFDLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlGLElBQUcsZ0JBQWdCLElBQUUsQ0FBQyxFQUFDO1lBQ25CLElBQUksR0FBRyxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZGLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDVCxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBRyxPQUFLLENBQUMsT0FBTyxJQUFFLElBQUksRUFBQztnQkFDbkIsYUFBYTtnQkFDYixJQUFHLE9BQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLEVBQUUsRUFBQztvQkFDdkIsT0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsdUJBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3BGO2FBQ0o7WUFDRCxJQUFHLEdBQUcsSUFBRSxDQUFDLEVBQUM7Z0JBQ04sa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLElBQUcsT0FBSyxDQUFDLGFBQWEsSUFBRSxJQUFJLEVBQUM7b0JBQ3pCLGFBQWE7b0JBQ2IsSUFBRyxPQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBRSxFQUFFLEVBQUM7d0JBQzdCLE9BQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtxQkFDeEQ7aUJBQ0o7YUFFSjtTQUNKO0lBQ0wsQ0FBQzs7SUF4Q2EsYUFBTyxHQUFTLElBQUksQ0FBQztJQUNyQixtQkFBYSxHQUFTLElBQUksQ0FBQztJQUUzQixnQkFBVSxHQUFRLENBQUMsQ0FBQyxDQUFBLGNBQWM7SUFKOUIsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXVEMUI7SUFBRCxZQUFDO0NBdkRBLEFBdURBLENBdkRtQyxFQUFFLENBQUMsU0FBUyxHQXVEL0M7a0JBdkRxQixLQUFLO0FBeUQzQjs7Ozs7Ozs7O0dBU0ciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBtYWNybywgR2FtZSwgZ2FtZSB9IGZyb20gJ2NjJztcclxuLy8gaW1wb3J0IHsgRnJhbWVQdWJsaWMgfSBmcm9tICcuL0ZyYW1lUHVibGljJztcclxuLy8gaW1wb3J0IExvY2FsSXRlbU5hbWUgZnJvbSAnLi9Mb2NhbEl0ZW1OYW1lJztcclxuLy8gaW1wb3J0IHsgT2ZmbGluZVJld2FyZCB9IGZyb20gJy4vT2ZmbGluZVJld2FyZCc7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFB1YmxpY01ldGhvZHMgZnJvbSBcIi4vUHVibGljTWV0aG9kc1wiO1xyXG5pbXBvcnQgVHVybXRhYmxlIGZyb20gXCIuL1R1cm10YWJsZVwiO1xyXG5cclxuLy8gaW1wb3J0IHsgUHVibGljTWV0aG9kcyB9IGZyb20gJy4vUHVibGljTWV0aG9kcyc7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKipcclxuICogUHJlZGVmaW5lZCB2YXJpYWJsZXNcclxuICogTmFtZSA9IFRpbWVcclxuICogRGF0ZVRpbWUgPSBUdWUgTm92IDA4IDIwMjIgMTc6NTE6NDkgR01UKzA4MDAgKOS4reWbveagh+WHhuaXtumXtClcclxuICogQXV0aG9yID0gZHhxMDMyOFxyXG4gKiBGaWxlQmFzZW5hbWUgPSBUaW1lLnRzXHJcbiAqIEZpbGVCYXNlbmFtZU5vRXh0ZW5zaW9uID0gVGltZVxyXG4gKiBVUkwgPSBkYjovL2Fzc2V0cy9TY3JpcHRzL0ZyYW1lL1RpbWUudHNcclxuICogTWFudWFsVXJsID0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzMuMy9tYW51YWwvemgvXHJcbiAqXHJcbiAqL1xyXG4gQGNjY2xhc3NcclxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGltZXR4dDpjYy5Ob2RlPW51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIFR1cm10YWJsZW5vZGU6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdm9pZHNlbnNpZDpudW1iZXI9MDsvL+iZmuepuuijgue8neaJk+WIsOmCo+S4gOWxgueahGlkXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdmFyIGludGVydmFsID0gMTsgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7peenkuS4uuWNleS9jeeahOaXtumXtOmXtOmalFxyXG4gICAgICAgIHZhciByZXBlYXQgPSBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUjsgICAvLyDph43lpI3mrKHmlbAgICAgIC8vIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSXHJcbiAgICAgICAgdmFyIGRlbGF5ID0gMDsgICAgICBcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpOyAgICAgICAgICAgICAgICAgICAgLy8g5byA5aeL5bu25pe2MeenkuWQjuW8gOWni1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5NYW5hZ2VtZW50LCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSk7XHJcbiAgICAgICAgLy/ku47lkI7lj7DliLDliY3lj7DnmoTkuovku7ZcclxuICAgICAgICAvLyBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgKCk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5HYW1lU2hvdygpO1xyXG4gICAgICAgIC8vIH0sIHRoaXMpO1xyXG5cclxuICAgIH1cclxuICAgIE1hbmFnZW1lbnQoKSB7Ly/orqHml7blmahcclxuICAgICAgICAvLyB0aGlzLlNhdmVMb2NhbFRpbWUoKTsvL+avj+malDHnp5Lkv53lrZjkuIDkuIvml7bpl7TliLDmnKzlnLBcclxuICAgICAgICBsZXQgVHVybXRhYmxlRnJlZVllcz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsMCk7XHJcbiAgICAgICAgaWYoVHVybXRhYmxlRnJlZVllcz09MCl7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCA5MDApO1xyXG4gICAgICAgICAgICBudW0gLT0gMTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIFwiXCIgKyBudW0pO1xyXG4gICAgICAgICAgICBpZihUaW1lcy50aW1ldHh0IT1udWxsKXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmKFRpbWVzLnRpbWV0eHQuX25hbWUhPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIFRpbWVzLnRpbWV0eHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitQdWJsaWNNZXRob2RzLnRpbWVjb252ZXJzaW9ucyhudW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtPT0wKXtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYoVGltZXMuVHVybXRhYmxlbm9kZSE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFRpbWVzLlR1cm10YWJsZW5vZGUuX25hbWUhPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaW1lcy5UdXJtdGFibGVub2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gU2F2ZUxvY2FsVGltZSgpIHsvL+S/neWtmOS4gOS4i+acrOWcsOaXtumXtFxyXG4gICAgLy8gICAgIFB1YmxpY01ldGhvZHMuc2V0Q3VycmVudFRpbWUoKTtcclxuICAgIC8vIH1cclxuICAgIC8vIEdhbWVIaWRlKCkgey8v5ri45oiP6ZqQ6JePXHJcbiAgICAvLyAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmuLjmiI/ov5vlhaXlkI7lj7BcIik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuU2F2ZUxvY2FsVGltZSgpOy8vXHJcbiAgICAvLyAgICAgfSwgdGhpcyk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBHYW1lU2hvdygpIHsvL+a4uOaIj+aYvuekulxyXG4gICAgLy8gICAgIC8vIE9mZmxpbmVSZXdhcmQuc2hhbmdkaWFuXzI0KCk7XHJcbiAgICAvLyAgICAgLy8gT2ZmbGluZVJld2FyZC5UaW1lX2ppYW5zaGFvKCk7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBbMV0gQ2xhc3MgbWVtYmVyIGNvdWxkIGJlIGRlZmluZWQgbGlrZSB0aGlzLlxyXG4gKiBbMl0gVXNlIGBwcm9wZXJ0eWAgZGVjb3JhdG9yIGlmIHlvdXIgd2FudCB0aGUgbWVtYmVyIHRvIGJlIHNlcmlhbGl6YWJsZS5cclxuICogWzNdIFlvdXIgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlLlxyXG4gKiBbNF0gWW91ciB1cGRhdGUgZnVuY3Rpb24gZ29lcyBoZXJlLlxyXG4gKlxyXG4gKiBMZWFybiBtb3JlIGFib3V0IHNjcmlwdGluZzogaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzMuMy9tYW51YWwvemgvc2NyaXB0aW5nL1xyXG4gKiBMZWFybiBtb3JlIGFib3V0IENDQ2xhc3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9jY2NsYXNzLmh0bWxcclxuICogTGVhcm4gbW9yZSBhYm91dCBsaWZlLWN5Y2xlIGNhbGxiYWNrczogaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzMuMy9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuICovXHJcbiJdfQ==