
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/RenZhe/Dart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7bf2T7lktPyr36r/pR0qji', 'Dart');
// Scripts/Hero/Game/RenZhe/Dart.ts

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
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Dart = /** @class */ (function (_super) {
    __extends(Dart, _super);
    function Dart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dark_type = HeroConfig_1.FeiBiao_Type.skill1;
        _this.collision_num = 0;
        return _this;
    }
    Dart.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.spin_speed = 600;
        this.addInitFinishedListen(this.onInitFinished);
    };
    Dart.prototype.onInitFinished = function () {
        this.collision_num = 0;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    Dart.prototype.onCollisionMonster = function (monsterTs) {
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.FeiBiao_Type) })
    ], Dart.prototype, "dark_type", void 0);
    Dart = __decorate([
        ccclass
    ], Dart);
    return Dart;
}(Bullect_1.default));
exports.default = Dart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUmVuWmhlXFxEYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLHNDQUFpQztBQUNqQyw0Q0FBK0Q7QUFFekQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQU87SUFBekM7UUFBQSxxRUFzQkM7UUFuQkcsZUFBUyxHQUFjLHlCQUFZLENBQUMsTUFBTSxDQUFDO1FBRTNDLG1CQUFhLEdBQVEsQ0FBQyxDQUFDOztJQWlCM0IsQ0FBQztJQWZHLHFCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELDZCQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLGlDQUFrQixHQUFsQixVQUFtQixTQUFpQjtJQUVwQyxDQUFDO0lBbEJEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQVksQ0FBQyxFQUFDLENBQUM7MkNBQ0k7SUFIMUIsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXNCeEI7SUFBRCxXQUFDO0NBdEJELEFBc0JDLENBdEJpQyxpQkFBTyxHQXNCeEM7a0JBdEJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEVuZW15X0RlQnVmZl9UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRmVpQmlhb19UeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFydCBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKEZlaUJpYW9fVHlwZSl9KVxyXG4gICAgZGFya190eXBlOkZlaUJpYW9fVHlwZT1GZWlCaWFvX1R5cGUuc2tpbGwxO1xyXG5cclxuICAgIGNvbGxpc2lvbl9udW06bnVtYmVyPTA7XHJcbiAgICBcclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgICAgICB0aGlzLnNwaW5fc3BlZWQ9NjAwO1xyXG4gICAgICAgIHRoaXMuYWRkSW5pdEZpbmlzaGVkTGlzdGVuKHRoaXMub25Jbml0RmluaXNoZWQpO1xyXG4gICAgfSAgICAgICAgXHJcblxyXG4gICAgb25Jbml0RmluaXNoZWQoKXtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbl9udW09MDtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=