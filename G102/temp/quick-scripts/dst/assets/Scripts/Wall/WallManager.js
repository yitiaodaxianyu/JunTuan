
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wall/WallManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f09e1PW/d9OPKR1Lgrfc8pX', 'WallManager');
// Scripts/Wall/WallManager.ts

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
var MainWall_1 = require("./MainWall");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WallManager = /** @class */ (function (_super) {
    __extends(WallManager, _super);
    function WallManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_wall = null;
        _this.main_wall = null;
        return _this;
    }
    WallManager_1 = WallManager;
    WallManager.getInstance = function () {
        return this._instance;
    };
    WallManager.prototype.onLoad = function () {
        WallManager_1._instance = this;
        this.setMainWall();
        this.map_wall = new Map();
    };
    WallManager.prototype.onDestroy = function () {
        this.map_wall.clear();
        WallManager_1._instance = null;
    };
    /**添加一个墙体 */
    WallManager.prototype.addWall = function (wallId, wall) {
        var oldWall = this.map_wall.get(wallId);
        if (oldWall && wallId) {
            oldWall.destroyWall();
        }
        this.map_wall.set(wallId, wall);
    };
    /**移除指定的墙体 */
    WallManager.prototype.removeWall = function (id) {
        this.map_wall.delete(id);
    };
    /**获得所有墙体数据 */
    WallManager.prototype.getAllWall = function () {
        return this.map_wall;
    };
    /**获得一个墙体数据 */
    WallManager.prototype.getAWall = function (wallId) {
        return this.map_wall.get(wallId);
    };
    WallManager.prototype.setMainWall = function () {
        this.main_wall = cc.find('Canvas/wall_bg').getComponent(MainWall_1.default);
    };
    /**获得主城墙 */
    WallManager.prototype.getMainWall = function () {
        return this.main_wall;
    };
    var WallManager_1;
    WallManager._instance = null;
    WallManager = WallManager_1 = __decorate([
        ccclass
    ], WallManager);
    return WallManager;
}(cc.Component));
exports.default = WallManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcV2FsbE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQWtDO0FBSzVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBbURDO1FBL0NXLGNBQVEsR0FBb0IsSUFBSSxDQUFDO1FBQ2pDLGVBQVMsR0FBVSxJQUFJLENBQUM7O0lBOENwQyxDQUFDO29CQW5Eb0IsV0FBVztJQU9kLHVCQUFXLEdBQXpCO1FBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksYUFBVyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxHQUFHLEVBQWlCLENBQUM7SUFDM0MsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLGFBQVcsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxZQUFZO0lBQ1osNkJBQU8sR0FBUCxVQUFRLE1BQWUsRUFBQyxJQUFTO1FBQzdCLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUcsT0FBTyxJQUFFLE1BQU0sRUFBQztZQUNmLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsYUFBYTtJQUNiLGdDQUFVLEdBQVYsVUFBVyxFQUFXO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxjQUFjO0lBQ2QsZ0NBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsY0FBYztJQUNkLDhCQUFRLEdBQVIsVUFBUyxNQUFlO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGlDQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0QsV0FBVztJQUNYLGlDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7SUFoRGMscUJBQVMsR0FBZ0IsSUFBSSxDQUFDO0lBRjVCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FtRC9CO0lBQUQsa0JBQUM7Q0FuREQsQUFtREMsQ0FuRHdDLEVBQUUsQ0FBQyxTQUFTLEdBbURwRDtrQkFuRG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpbldhbGwgZnJvbSBcIi4vTWFpbldhbGxcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4vV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuL1dhbGxDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFdhbGxNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIG1hcF93YWxsOk1hcDxXYWxsVHlwZSxXYWxsPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBtYWluX3dhbGw6TWFpbldhbGw9bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6V2FsbE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBXYWxsTWFuYWdlci5faW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLnNldE1haW5XYWxsKCk7XHJcbiAgICAgICAgdGhpcy5tYXBfd2FsbD1uZXcgTWFwPFdhbGxUeXBlLFdhbGw+KCk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwX3dhbGwuY2xlYXIoKTtcclxuICAgICAgICBXYWxsTWFuYWdlci5faW5zdGFuY2U9bnVsbDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOS4gOS4quWimeS9kyAqL1xyXG4gICAgYWRkV2FsbCh3YWxsSWQ6V2FsbFR5cGUsd2FsbDpXYWxsKXtcclxuICAgICAgICBsZXQgb2xkV2FsbD10aGlzLm1hcF93YWxsLmdldCh3YWxsSWQpO1xyXG4gICAgICAgIGlmKG9sZFdhbGwmJndhbGxJZCl7XHJcbiAgICAgICAgICAgIG9sZFdhbGwuZGVzdHJveVdhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXBfd2FsbC5zZXQod2FsbElkLHdhbGwpO1xyXG4gICAgfVxyXG4gICAgLyoq56e76Zmk5oyH5a6a55qE5aKZ5L2TICovXHJcbiAgICByZW1vdmVXYWxsKGlkOldhbGxUeXBlKXtcclxuICAgICAgICB0aGlzLm1hcF93YWxsLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfmiYDmnInlopnkvZPmlbDmja4gKi9cclxuICAgIGdldEFsbFdhbGwoKTpNYXA8V2FsbFR5cGUsV2FsbD57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX3dhbGw7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfkuIDkuKrlopnkvZPmlbDmja4gKi9cclxuICAgIGdldEFXYWxsKHdhbGxJZDpXYWxsVHlwZSk6V2FsbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfd2FsbC5nZXQod2FsbElkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzZXRNYWluV2FsbCgpe1xyXG4gICAgICAgIHRoaXMubWFpbl93YWxsPWNjLmZpbmQoJ0NhbnZhcy93YWxsX2JnJykuZ2V0Q29tcG9uZW50KE1haW5XYWxsKTsgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5Li75Z+O5aKZICovXHJcbiAgICBnZXRNYWluV2FsbCgpOk1haW5XYWxse1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1haW5fd2FsbDtcclxuICAgIH1cclxufVxyXG4iXX0=