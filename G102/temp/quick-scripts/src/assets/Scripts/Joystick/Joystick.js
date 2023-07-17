"use strict";
cc._RF.push(module, '73162lxt5BLxbtr/vpxLfXd', 'Joystick');
// Scripts/Joystick/Joystick.ts

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
exports.JoystickType = exports.SpeedType = exports.DirectionType = exports.instance = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 全局事件监听实例
 */
exports.instance = new cc.EventTarget();
/**
 * 方向类型
 */
var DirectionType;
(function (DirectionType) {
    DirectionType[DirectionType["FOUR"] = 0] = "FOUR";
    DirectionType[DirectionType["EIGHT"] = 1] = "EIGHT";
    DirectionType[DirectionType["ALL"] = 2] = "ALL";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
/**
 * 速度类型
 */
var SpeedType;
(function (SpeedType) {
    SpeedType[SpeedType["STOP"] = 0] = "STOP";
    SpeedType[SpeedType["NORMAL"] = 1] = "NORMAL";
    SpeedType[SpeedType["FAST"] = 2] = "FAST";
})(SpeedType = exports.SpeedType || (exports.SpeedType = {}));
/**
 * 摇杆类型
 */
var JoystickType;
(function (JoystickType) {
    JoystickType[JoystickType["FIXED"] = 0] = "FIXED";
    JoystickType[JoystickType["FOLLOW"] = 1] = "FOLLOW";
})(JoystickType = exports.JoystickType || (exports.JoystickType = {}));
/**
 * 摇杆类
 */
var Joystick = /** @class */ (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dot = null;
        _this.ring = null;
        _this.joystickType = JoystickType.FOLLOW;
        _this.directionType = DirectionType.ALL;
        _this._stickPos = null;
        _this._touchLocation = null;
        _this._radius = 0;
        return _this;
    }
    Joystick.prototype.onLoad = function () {
        this._radius = this.ring.width / 2;
        this._initTouchEvent();
        // hide joystick when follow
        this.joystickType = JoystickType.FOLLOW;
        if (this.joystickType === JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }
    };
    /**
     * 启用时
     */
    Joystick.prototype.onEnable = function () {
        exports.instance.on("set_joystick_type", this._onSetJoystickType, this);
    };
    /**
     * 禁用时
     */
    Joystick.prototype.onDisable = function () {
        exports.instance.off("set_joystick_type", this._onSetJoystickType, this);
    };
    /**
     * 改变摇杆类型
     * @param type
     */
    Joystick.prototype._onSetJoystickType = function (type) {
        this.joystickType = type;
        this.node.opacity = type === JoystickType.FIXED ? 255 : 0;
    };
    /**
     * 初始化触摸事件
     */
    Joystick.prototype._initTouchEvent = function () {
        // set the size of joystick node to control scale
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    };
    /**
     * 触摸开始回调函数
     * @param event
     */
    Joystick.prototype._touchStartEvent = function (event) {
        exports.instance.emit(cc.Node.EventType.TOUCH_START, event);
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        if (this.joystickType === JoystickType.FIXED) {
            this._stickPos = this.ring.getPosition();
            // 触摸点与圆圈中心的距离
            var distance = touchPos.sub(this.ring.getPosition()).mag();
            // 手指在圆圈内触摸,控杆跟随触摸点
            this._radius > distance && this.dot.setPosition(touchPos);
        }
        else if (this.joystickType === JoystickType.FOLLOW) {
            // 记录摇杆位置，给 touch move 使用
            this._stickPos = touchPos;
            this.node.opacity = 255;
            this._touchLocation = event.getLocation();
            // 更改摇杆的位置
            this.ring.setPosition(touchPos);
            this.dot.setPosition(touchPos);
        }
    };
    /**
     * 触摸移动回调函数
     * @param event
     */
    Joystick.prototype._touchMoveEvent = function (event) {
        // 如果 touch start 位置和 touch move 相同，禁止移动
        if (this.joystickType === JoystickType.FOLLOW &&
            this._touchLocation === event.getLocation()) {
            return false;
        }
        // 以圆圈为锚点获取触摸坐标
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        // 归一化
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        var speedType;
        if (this._radius > distance) {
            this.dot.setPosition(cc.v2(posX, posY));
            speedType = SpeedType.NORMAL;
        }
        else {
            // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = this._stickPos.x + p.x * this._radius;
            var y = this._stickPos.y + p.y * this._radius;
            this.dot.setPosition(cc.v2(x, y));
            speedType = SpeedType.FAST;
        }
        exports.instance.emit(cc.Node.EventType.TOUCH_MOVE, event, {
            speedType: speedType,
            moveDistance: p,
        });
    };
    /**
     * 触摸结束回调函数
     * @param event
     */
    Joystick.prototype._touchEndEvent = function (event) {
        this.dot.setPosition(this.ring.getPosition());
        if (this.joystickType === JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }
        exports.instance.emit(cc.Node.EventType.TOUCH_END, event, {
            speedType: SpeedType.STOP,
        });
    };
    __decorate([
        property({
            type: cc.Node,
            displayName: "Dot",
            tooltip: "摇杆操纵点",
        })
    ], Joystick.prototype, "dot", void 0);
    __decorate([
        property({
            type: cc.Node,
            displayName: "Ring",
            tooltip: "摇杆背景节点",
        })
    ], Joystick.prototype, "ring", void 0);
    __decorate([
        property({
            type: cc.Enum(JoystickType),
            displayName: "Touch Type",
            tooltip: "触摸类型",
        })
    ], Joystick.prototype, "joystickType", void 0);
    __decorate([
        property({
            type: cc.Enum(DirectionType),
            displayName: "Direction Type",
            tooltip: "方向类型",
        })
    ], Joystick.prototype, "directionType", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "摇杆所在位置",
        })
    ], Joystick.prototype, "_stickPos", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "触摸位置",
        })
    ], Joystick.prototype, "_touchLocation", void 0);
    __decorate([
        property({
            tooltip: "半径",
        })
    ], Joystick.prototype, "_radius", void 0);
    Joystick = __decorate([
        ccclass
    ], Joystick);
    return Joystick;
}(cc.Component));
exports.default = Joystick;

cc._RF.pop();