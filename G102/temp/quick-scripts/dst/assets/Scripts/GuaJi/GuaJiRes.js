
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiRes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90b7f0AwzZJ6rWu6MHmDOip', 'GuaJiRes');
// Scripts/GuaJi/GuaJiRes.ts

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
var GuaJiManager_1 = require("./GuaJiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiRes = /** @class */ (function (_super) {
    __extends(GuaJiRes, _super);
    function GuaJiRes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_follow_bg = false;
        return _this;
    }
    // onLoad () {}
    GuaJiRes.prototype.init = function (propId) {
        var _this = this;
        //换图片
        //this.node.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(propId);
        var xx = Math.random() * 20 + 30;
        xx *= Math.random() < 0.5 ? 1 : -1;
        var yy = 0;
        var height = Math.random() * 20 + 30;
        cc.tween(this.node).then(cc.jumpBy(0.5, xx, yy, height, 1)).call(function () {
            _this.is_follow_bg = true;
        }).delay(1).call(function () {
            _this.is_follow_bg = false;
        }).to(Math.random() * 0.3 + 0.3, { x: GuaJiManager_1.default.getInstance().box_pos.x, y: GuaJiManager_1.default.getInstance().box_pos.y, opacity: 168 }).removeSelf().start();
    };
    GuaJiRes.prototype.update = function (dt) {
        if (this.is_follow_bg) {
            var xx = -(GuaJiManager_1.default.getInstance().bg_speed_x * dt);
            this.node.x += xx;
        }
    };
    GuaJiRes = __decorate([
        ccclass
    ], GuaJiRes);
    return GuaJiRes;
}(cc.Component));
exports.default = GuaJiRes;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppUmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUEwQztBQUdwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTRCQztRQXpCRyxrQkFBWSxHQUFTLEtBQUssQ0FBQzs7SUF5Qi9CLENBQUM7SUF2QkcsZUFBZTtJQUVmLHVCQUFJLEdBQUosVUFBTSxNQUFhO1FBQW5CLGlCQWFDO1FBWkcsS0FBSztRQUNMLGdHQUFnRztRQUNoRyxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztRQUMzQixFQUFFLElBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDVCxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekQsS0FBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNiLEtBQUksQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxHQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVsSixDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFRLEVBQUU7UUFDTixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDakIsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFDLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUEzQmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0QjVCO0lBQUQsZUFBQztDQTVCRCxBQTRCQyxDQTVCcUMsRUFBRSxDQUFDLFNBQVMsR0E0QmpEO2tCQTVCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IEd1YUppTWFuYWdlciBmcm9tIFwiLi9HdWFKaU1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1YUppUmVzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgaXNfZm9sbG93X2JnOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgaW5pdCAocHJvcElkOm51bWJlcikge1xyXG4gICAgICAgIC8v5o2i5Zu+54mHXHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHByb3BJZCk7XHJcbiAgICAgICAgbGV0IHh4PU1hdGgucmFuZG9tKCkqMjArMzA7XHJcbiAgICAgICAgeHgqPU1hdGgucmFuZG9tKCk8MC41PzE6LTE7XHJcbiAgICAgICAgbGV0IHl5PTA7XHJcbiAgICAgICAgbGV0IGhlaWdodD1NYXRoLnJhbmRvbSgpKjIwKzMwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmlzX2ZvbGxvd19iZz10cnVlO1xyXG4gICAgICAgIH0pLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pc19mb2xsb3dfYmc9ZmFsc2U7XHJcbiAgICAgICAgfSkudG8oTWF0aC5yYW5kb20oKSowLjMrMC4zLHt4Okd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJveF9wb3MueCx5Okd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJveF9wb3MueSxvcGFjaXR5OjE2OH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYodGhpcy5pc19mb2xsb3dfYmcpe1xyXG4gICAgICAgICAgICBsZXQgeHg9LShHdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iZ19zcGVlZF94KmR0KVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCs9eHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==