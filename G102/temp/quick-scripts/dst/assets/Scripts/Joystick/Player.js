
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Joystick/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba452nnVcJMPYIauwJ4Favx', 'Player');
// resources/test/scripts/Player.ts

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
var Joystick_1 = require("./Joystick");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Joystick_2 = require("./Joystick");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rigidbody = false;
        // from joystick
        _this.moveDir = cc.v2(0, 1);
        _this._speedType = Joystick_1.SpeedType.STOP;
        // from self
        _this._moveSpeed = 0;
        _this.stopSpeed = 0;
        _this.normalSpeed = 100;
        _this.fastSpeed = 200;
        return _this;
    }
    Player.prototype.onLoad = function () {
        if (this.rigidbody) {
            cc.director.getPhysicsManager().enabled = true;
            this._body = this.getComponent(cc.RigidBody);
        }
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    Player.prototype.onTouchStart = function () { };
    Player.prototype.onTouchMove = function (event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    };
    Player.prototype.onTouchEnd = function (event, data) {
        this._speedType = data.speedType;
    };
    /**
     * 移动
     */
    Player.prototype.move = function () {
        this.node.angle =
            cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        if (this.rigidbody) {
            this._body.applyForceToCenter(cc.v2(this.moveDir.x * 200, this.moveDir.y * 200), true);
        }
        else {
            var oldPos = cc.v2();
            this.node.getPosition(oldPos);
            var newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
            this.node.setPosition(newPos);
        }
    };
    Player.prototype.update = function (dt) {
        switch (this._speedType) {
            case Joystick_1.SpeedType.STOP:
                this._moveSpeed = this.stopSpeed;
                break;
            case Joystick_1.SpeedType.NORMAL:
                this._moveSpeed = this.normalSpeed;
                break;
            case Joystick_1.SpeedType.FAST:
                this._moveSpeed = this.fastSpeed;
                break;
            default:
                break;
        }
        if (this._speedType !== Joystick_1.SpeedType.STOP) {
            this.move();
        }
    };
    __decorate([
        property({
            displayName: "刚体模式",
            tooltip: "不会立即停止",
        })
    ], Player.prototype, "rigidbody", void 0);
    __decorate([
        property({
            displayName: "Move Dir",
            tooltip: "移动方向",
        })
    ], Player.prototype, "moveDir", void 0);
    __decorate([
        property({
            displayName: "Speed Type",
            tooltip: "速度级别",
        })
    ], Player.prototype, "_speedType", void 0);
    __decorate([
        property({
            type: cc.Integer,
            displayName: "Move Speed",
            tooltip: "移动速度",
        })
    ], Player.prototype, "_moveSpeed", void 0);
    __decorate([
        property({
            type: cc.Integer,
            displayName: "Stop Speed",
            tooltip: "停止时速度",
        })
    ], Player.prototype, "stopSpeed", void 0);
    __decorate([
        property({
            type: cc.Integer,
            tooltip: "正常速度",
        })
    ], Player.prototype, "normalSpeed", void 0);
    __decorate([
        property({
            type: cc.Integer,
            tooltip: "最快速度",
        })
    ], Player.prototype, "fastSpeed", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFx0ZXN0XFxzY3JpcHRzXFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ2pDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLHVDQUFzQztBQUd0QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTZHQztRQXhHQyxlQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGdCQUFnQjtRQUtoQixhQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFNdEIsZ0JBQVUsR0FBYyxvQkFBUyxDQUFDLElBQUksQ0FBQztRQUV2QyxZQUFZO1FBTVosZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFPZixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBTWQsaUJBQVcsR0FBRyxHQUFHLENBQUM7UUFNbEIsZUFBUyxHQUFHLEdBQUcsQ0FBQzs7SUFnRWxCLENBQUM7SUE1REMsdUJBQU0sR0FBTjtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsbUJBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsbUJBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUs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O1lBQ3pCLE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUM7OENBQ2E7SUFPZjtRQUxDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTztZQUNoQixXQUFXLEVBQUUsWUFBWTtZQUN6QixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDOzZDQUNZO0lBTWQ7UUFKQyxRQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU87WUFDaEIsT0FBTyxFQUFFLE1BQU07U0FDaEIsQ0FBQzsrQ0FDZ0I7SUFNbEI7UUFKQyxRQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU87WUFDaEIsT0FBTyxFQUFFLE1BQU07U0FDaEIsQ0FBQzs2Q0FDYztJQTdDRyxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBNkcxQjtJQUFELGFBQUM7Q0E3R0QsQUE2R0MsQ0E3R21DLEVBQUUsQ0FBQyxTQUFTLEdBNkcvQztrQkE3R29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGVlZFR5cGUgfSBmcm9tIFwiLi9Kb3lzdGlja1wiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuaW1wb3J0IHsgaW5zdGFuY2UgfSBmcm9tIFwiLi9Kb3lzdGlja1wiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgQHByb3BlcnR5KHtcbiAgICBkaXNwbGF5TmFtZTogXCLliJrkvZPmqKHlvI9cIixcbiAgICB0b29sdGlwOiBcIuS4jeS8mueri+WNs+WBnOatolwiLFxuICB9KVxuICByaWdpZGJvZHkgPSBmYWxzZTtcblxuICAvLyBmcm9tIGpveXN0aWNrXG4gIEBwcm9wZXJ0eSh7XG4gICAgZGlzcGxheU5hbWU6IFwiTW92ZSBEaXJcIixcbiAgICB0b29sdGlwOiBcIuenu+WKqOaWueWQkVwiLFxuICB9KVxuICBtb3ZlRGlyID0gY2MudjIoMCwgMSk7XG5cbiAgQHByb3BlcnR5KHtcbiAgICBkaXNwbGF5TmFtZTogXCJTcGVlZCBUeXBlXCIsXG4gICAgdG9vbHRpcDogXCLpgJ/luqbnuqfliKtcIixcbiAgfSlcbiAgX3NwZWVkVHlwZTogU3BlZWRUeXBlID0gU3BlZWRUeXBlLlNUT1A7XG5cbiAgLy8gZnJvbSBzZWxmXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuSW50ZWdlcixcbiAgICBkaXNwbGF5TmFtZTogXCJNb3ZlIFNwZWVkXCIsXG4gICAgdG9vbHRpcDogXCLnp7vliqjpgJ/luqZcIixcbiAgfSlcbiAgX21vdmVTcGVlZCA9IDA7XG5cbiAgQHByb3BlcnR5KHtcbiAgICB0eXBlOiBjYy5JbnRlZ2VyLFxuICAgIGRpc3BsYXlOYW1lOiBcIlN0b3AgU3BlZWRcIixcbiAgICB0b29sdGlwOiBcIuWBnOatouaXtumAn+W6plwiLFxuICB9KVxuICBzdG9wU3BlZWQgPSAwO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuSW50ZWdlcixcbiAgICB0b29sdGlwOiBcIuato+W4uOmAn+W6plwiLFxuICB9KVxuICBub3JtYWxTcGVlZCA9IDEwMDtcblxuICBAcHJvcGVydHkoe1xuICAgIHR5cGU6IGNjLkludGVnZXIsXG4gICAgdG9vbHRpcDogXCLmnIDlv6vpgJ/luqZcIixcbiAgfSlcbiAgZmFzdFNwZWVkID0gMjAwO1xuXG4gIF9ib2R5OiBjYy5SaWdpZEJvZHk7XG5cbiAgb25Mb2FkKCkge1xuICAgIGlmICh0aGlzLnJpZ2lkYm9keSkge1xuICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2JvZHkgPSB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgIH1cblxuICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KCkge31cblxuICBvblRvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xuICAgIHRoaXMuX3NwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xuICAgIHRoaXMubW92ZURpciA9IGRhdGEubW92ZURpc3RhbmNlO1xuICB9XG5cbiAgb25Ub3VjaEVuZChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xuICAgIHRoaXMuX3NwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIOenu+WKqFxuICAgKi9cbiAgbW92ZSgpIHtcbiAgICB0aGlzLm5vZGUuYW5nbGUgPVxuICAgICAgY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KSkgLSA5MDtcblxuICAgIGlmICh0aGlzLnJpZ2lkYm9keSkge1xuICAgICAgdGhpcy5fYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoXG4gICAgICAgIGNjLnYyKHRoaXMubW92ZURpci54ICogMjAwLCB0aGlzLm1vdmVEaXIueSAqIDIwMCksXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9sZFBvcyA9IGNjLnYyKCk7XG4gICAgICB0aGlzLm5vZGUuZ2V0UG9zaXRpb24ob2xkUG9zKTtcbiAgICAgIGNvbnN0IG5ld1BvcyA9IG9sZFBvcy5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLl9tb3ZlU3BlZWQgLyAxMjApKTtcbiAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShkdCkge1xuICAgIHN3aXRjaCAodGhpcy5fc3BlZWRUeXBlKSB7XG4gICAgICBjYXNlIFNwZWVkVHlwZS5TVE9QOlxuICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSB0aGlzLnN0b3BTcGVlZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNwZWVkVHlwZS5OT1JNQUw6XG4gICAgICAgIHRoaXMuX21vdmVTcGVlZCA9IHRoaXMubm9ybWFsU3BlZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTcGVlZFR5cGUuRkFTVDpcbiAgICAgICAgdGhpcy5fbW92ZVNwZWVkID0gdGhpcy5mYXN0U3BlZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zcGVlZFR5cGUgIT09IFNwZWVkVHlwZS5TVE9QKSB7XG4gICAgICB0aGlzLm1vdmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==