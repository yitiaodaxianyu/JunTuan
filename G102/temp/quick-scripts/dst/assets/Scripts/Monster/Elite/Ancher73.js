
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Ancher73.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dfd74QDZVxGP7m0FYYsa4Wl', 'Ancher73');
// Scripts/Monster/Elite/Ancher73.ts

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
var MonsterBullet_1 = require("../MonsterBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Ancher73 = /** @class */ (function (_super) {
    __extends(Ancher73, _super);
    function Ancher73() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collision_callback = null;
        _this.is_collision = false;
        return _this;
    }
    Ancher73.prototype.onLoad = function () {
        this.addCollisionWallListen(this.onCollisionWall);
    };
    Ancher73.prototype.setCollisionCallback = function (callback) {
        this.collision_callback = callback;
        this.is_collision = false;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    Ancher73.prototype.onCollisionWall = function (wall) {
        if (wall && this.is_collision == false) {
            this.move_speed = 0;
            if (this.collision_target_callback) {
                this.collision_target_callback();
            }
        }
    };
    Ancher73 = __decorate([
        ccclass
    ], Ancher73);
    return Ancher73;
}(MonsterBullet_1.default));
exports.default = Ancher73;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEFuY2hlcjczLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtEQUE2QztBQUd2QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBYTtJQUFuRDtRQUFBLHFFQXVCQztRQXJCRyx3QkFBa0IsR0FBVSxJQUFJLENBQUM7UUFDakMsa0JBQVksR0FBUyxLQUFLLENBQUM7O0lBb0IvQixDQUFDO0lBbEJhLHlCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsdUNBQW9CLEdBQXBCLFVBQXFCLFFBQWlCO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxrQ0FBZSxHQUFmLFVBQWdCLElBQVM7UUFDckIsSUFBRyxJQUFJLElBQUUsSUFBSSxDQUFDLFlBQVksSUFBRSxLQUFLLEVBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMseUJBQXlCLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2FBQ3BDO1NBQ0o7SUFDTCxDQUFDO0lBdEJnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBdUI1QjtJQUFELGVBQUM7Q0F2QkQsQUF1QkMsQ0F2QnFDLHVCQUFhLEdBdUJsRDtrQkF2Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgTW9uc3RlckJ1bGxldCBmcm9tIFwiLi4vTW9uc3RlckJ1bGxldFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5jaGVyNzMgZXh0ZW5kcyBNb25zdGVyQnVsbGV0IHtcclxuXHJcbiAgICBjb2xsaXNpb25fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIGlzX2NvbGxpc2lvbjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRDb2xsaXNpb25XYWxsTGlzdGVuKHRoaXMub25Db2xsaXNpb25XYWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xsaXNpb25DYWxsYmFjayhjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25fY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5pc19jb2xsaXNpb249ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25XYWxsKHdhbGw6V2FsbCkge1xyXG4gICAgICAgIGlmKHdhbGwmJnRoaXMuaXNfY29sbGlzaW9uPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9zcGVlZD0wO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl90YXJnZXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25fdGFyZ2V0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19