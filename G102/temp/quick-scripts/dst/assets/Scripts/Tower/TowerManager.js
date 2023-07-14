
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '20ba51raTtNpI0zFO6/QCD0', 'TowerManager');
// Scripts/Tower/TowerManager.ts

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
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerManager = /** @class */ (function (_super) {
    __extends(TowerManager, _super);
    function TowerManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //资源
        _this.tower_atlas = null;
        return _this;
    }
    TowerManager_1 = TowerManager;
    TowerManager.getInstance = function () {
        return this._instance;
    };
    TowerManager.prototype.onLoad = function () {
        TowerManager_1._instance = this;
        this.init();
    };
    TowerManager.prototype.onDestroy = function () {
        TowerManager_1._instance = null;
    };
    //初始化游戏数据
    TowerManager.prototype.init = function () {
    };
    TowerManager.prototype.getSpByName = function (name) {
        return this.tower_atlas.getSpriteFrame(name);
    };
    /**获得正在挑战的塔的等级 */
    TowerManager.getTowerLevel = function () {
        var level = cc.sys.localStorage.getItem('tower_level');
        if (level === "" || level === null) {
            level = 1;
        }
        else {
            level = parseInt(level);
        }
        return level;
    };
    TowerManager.addTowerLevel = function (level) {
        var newLevel = this.getTowerLevel() + level;
        // let maxLevel=TowerLevelManager.getMaxFloor();
        // if(newLevel<=maxLevel){
        //     this.saveTowerLevel(newLevel);
        // }
        this.saveTowerLevel(newLevel);
    };
    TowerManager.saveTowerLevel = function (level) {
        cc.sys.localStorage.setItem('tower_level', level);
    };
    TowerManager.getTodayPassNum = function () {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.TowerPassNum, 0);
    };
    TowerManager.addTodayPassNum = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TowerPassNum, 1 + this.getTodayPassNum());
    };
    TowerManager.resetTodayPassNum = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TowerPassNum, 0);
    };
    var TowerManager_1;
    TowerManager._instance = null;
    TowerManager.is_show_tower = false;
    __decorate([
        property(cc.SpriteAtlas)
    ], TowerManager.prototype, "tower_atlas", void 0);
    TowerManager = TowerManager_1 = __decorate([
        ccclass
    ], TowerManager);
    return TowerManager;
}(cc.Component));
exports.default = TowerManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwREFBc0Q7QUFDdEQsNERBQThEO0FBSXhELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBbUVDO1FBakVHLElBQUk7UUFFSixpQkFBVyxHQUFnQixJQUFJLENBQUM7O0lBK0RwQyxDQUFDO3FCQW5Fb0IsWUFBWTtJQVFmLHdCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFUyw2QkFBTSxHQUFoQjtRQUNJLGNBQVksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRVMsZ0NBQVMsR0FBbkI7UUFDSSxjQUFZLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUztJQUNELDJCQUFJLEdBQVo7SUFFQSxDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBbUIsSUFBVztRQUMxQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxpQkFBaUI7SUFDViwwQkFBYSxHQUFwQjtRQUNJLElBQUksS0FBSyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFHLEtBQUssS0FBRyxFQUFFLElBQUksS0FBSyxLQUFHLElBQUksRUFDN0I7WUFDSSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1NBQ1g7YUFDRDtZQUNJLEtBQUssR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sMEJBQWEsR0FBcEIsVUFBcUIsS0FBWTtRQUM3QixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUMsS0FBSyxDQUFDO1FBQ3hDLGdEQUFnRDtRQUNoRCwwQkFBMEI7UUFDMUIscUNBQXFDO1FBQ3JDLElBQUk7UUFDSixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSwyQkFBYyxHQUFyQixVQUFzQixLQUFZO1FBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLDRCQUFlLEdBQXRCO1FBQ0ksT0FBTyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQVUsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDRCQUFlLEdBQXRCO1FBQ0ksa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsWUFBWSxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sOEJBQWlCLEdBQXhCO1FBQ0ksa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O0lBakVjLHNCQUFTLEdBQWlCLElBQUksQ0FBQztJQUt2QywwQkFBYSxHQUFTLEtBQUssQ0FBQztJQUZuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3FEQUNPO0lBSmYsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW1FaEM7SUFBRCxtQkFBQztDQW5FRCxBQW1FQyxDQW5FeUMsRUFBRSxDQUFDLFNBQVMsR0FtRXJEO2tCQW5Fb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVG93ZXJMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCB7IFRvd2VyUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL1Rvd2VyUmV3YXJkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRvd2VyTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+i1hOa6kFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgdG93ZXJfYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcbiAgICBzdGF0aWMgaXNfc2hvd190b3dlcjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUb3dlck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIFRvd2VyTWFuYWdlci5faW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIFRvd2VyTWFuYWdlci5faW5zdGFuY2U9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwQnlOYW1lKG5hbWU6c3RyaW5nKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3dlcl9hdGxhcy5nZXRTcHJpdGVGcmFtZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpfmraPlnKjmjJHmiJjnmoTloZTnmoTnrYnnuqcgKi9cclxuICAgIHN0YXRpYyBnZXRUb3dlckxldmVsKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBsZXZlbD1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rvd2VyX2xldmVsJyk7XHJcbiAgICAgICAgaWYobGV2ZWw9PT1cIlwiIHx8IGxldmVsPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldmVsPTE7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldmVsPXBhcnNlSW50KGxldmVsKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhZGRUb3dlckxldmVsKGxldmVsOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG5ld0xldmVsPXRoaXMuZ2V0VG93ZXJMZXZlbCgpK2xldmVsO1xyXG4gICAgICAgIC8vIGxldCBtYXhMZXZlbD1Ub3dlckxldmVsTWFuYWdlci5nZXRNYXhGbG9vcigpO1xyXG4gICAgICAgIC8vIGlmKG5ld0xldmVsPD1tYXhMZXZlbCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2F2ZVRvd2VyTGV2ZWwobmV3TGV2ZWwpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNhdmVUb3dlckxldmVsKG5ld0xldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2F2ZVRvd2VyTGV2ZWwobGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rvd2VyX2xldmVsJyxsZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFRvZGF5UGFzc051bSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5Ub3dlclBhc3NOdW0sMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBhZGRUb2RheVBhc3NOdW0oKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3dlclBhc3NOdW0sMSt0aGlzLmdldFRvZGF5UGFzc051bSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVzZXRUb2RheVBhc3NOdW0oKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3dlclBhc3NOdW0sMCk7XHJcbiAgICB9XHJcbn0iXX0=