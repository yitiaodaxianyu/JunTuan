"use strict";
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