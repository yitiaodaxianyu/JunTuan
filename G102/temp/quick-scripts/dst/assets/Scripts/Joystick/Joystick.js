
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Joystick/Joystick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSm95c3RpY2tcXEpveXN0aWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRTdDOztHQUVHO0FBQ0gsSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3ZCLGlEQUFJLENBQUE7SUFDSixtREFBSyxDQUFBO0lBQ0wsK0NBQUcsQ0FBQTtBQUNMLENBQUMsRUFKVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUl4QjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlDQUFJLENBQUE7SUFDSiw2Q0FBTSxDQUFBO0lBQ04seUNBQUksQ0FBQTtBQUNOLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLGlEQUFLLENBQUE7SUFDTCxtREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQ7O0dBRUc7QUFFSDtJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtMQztRQTVLQyxTQUFHLEdBQUcsSUFBSSxDQUFDO1FBT1gsVUFBSSxHQUFHLElBQUksQ0FBQztRQU9aLGtCQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQU9uQyxtQkFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFNbEMsZUFBUyxHQUFHLElBQUksQ0FBQztRQU1qQixvQkFBYyxHQUFHLElBQUksQ0FBQztRQUt0QixhQUFPLEdBQUcsQ0FBQyxD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ZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiDlhajlsYDkuovku7bnm5HlkKzlrp7kvotcbiAqL1xuZXhwb3J0IGNvbnN0IGluc3RhbmNlID0gbmV3IGNjLkV2ZW50VGFyZ2V0KCk7XG5cbi8qKlxuICog5pa55ZCR57G75Z6LXG4gKi9cbmV4cG9ydCBlbnVtIERpcmVjdGlvblR5cGUge1xuICBGT1VSLFxuICBFSUdIVCxcbiAgQUxMLFxufVxuXG4vKipcbiAqIOmAn+W6puexu+Wei1xuICovXG5leHBvcnQgZW51bSBTcGVlZFR5cGUge1xuICBTVE9QLFxuICBOT1JNQUwsXG4gIEZBU1QsXG59XG5cbi8qKlxuICog5pGH5p2G57G75Z6LXG4gKi9cbmV4cG9ydCBlbnVtIEpveXN0aWNrVHlwZSB7XG4gIEZJWEVELFxuICBGT0xMT1csXG59XG5cbi8qKlxuICog5pGH5p2G57G7XG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3lzdGljayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuTm9kZSxcbiAgICBkaXNwbGF5TmFtZTogXCJEb3RcIixcbiAgICB0b29sdGlwOiBcIuaRh+adhuaTjee6teeCuVwiLFxuICB9KVxuICBkb3QgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuTm9kZSxcbiAgICBkaXNwbGF5TmFtZTogXCJSaW5nXCIsXG4gICAgdG9vbHRpcDogXCLmkYfmnYbog4zmma/oioLngrlcIixcbiAgfSlcbiAgcmluZyA9IG51bGw7XG5cbiAgQHByb3BlcnR5KHtcbiAgICB0eXBlOiBjYy5FbnVtKEpveXN0aWNrVHlwZSksXG4gICAgZGlzcGxheU5hbWU6IFwiVG91Y2ggVHlwZVwiLFxuICAgIHRvb2x0aXA6IFwi6Kem5pG457G75Z6LXCIsXG4gIH0pXG4gIGpveXN0aWNrVHlwZSA9IEpveXN0aWNrVHlwZS5GT0xMT1c7XG5cbiAgQHByb3BlcnR5KHtcbiAgICB0eXBlOiBjYy5FbnVtKERpcmVjdGlvblR5cGUpLFxuICAgIGRpc3BsYXlOYW1lOiBcIkRpcmVjdGlvbiBUeXBlXCIsXG4gICAgdG9vbHRpcDogXCLmlrnlkJHnsbvlnotcIixcbiAgfSlcbiAgZGlyZWN0aW9uVHlwZSA9IERpcmVjdGlvblR5cGUuQUxMO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuTm9kZSxcbiAgICB0b29sdGlwOiBcIuaRh+adhuaJgOWcqOS9jee9rlwiLFxuICB9KVxuICBfc3RpY2tQb3MgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuTm9kZSxcbiAgICB0b29sdGlwOiBcIuinpuaRuOS9jee9rlwiLFxuICB9KVxuICBfdG91Y2hMb2NhdGlvbiA9IG51bGw7XG5cbiAgQHByb3BlcnR5KHtcbiAgICB0b29sdGlwOiBcIuWNiuW+hFwiLFxuICB9KVxuICBfcmFkaXVzID0gMDtcblxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5fcmFkaXVzID0gdGhpcy5yaW5nLndpZHRoIC8gMjtcbiAgICB0aGlzLl9pbml0VG91Y2hFdmVudCgpO1xuICAgIC8vIGhpZGUgam95c3RpY2sgd2hlbiBmb2xsb3dcbiAgICB0aGlzLmpveXN0aWNrVHlwZSA9IEpveXN0aWNrVHlwZS5GT0xMT1c7XG4gICAgaWYgKHRoaXMuam95c3RpY2tUeXBlID09PSBKb3lzdGlja1R5cGUuRk9MTE9XKSB7XG4gICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWQr+eUqOaXtlxuICAgKi9cbiAgb25FbmFibGUoKSB7XG4gICAgaW5zdGFuY2Uub24oXCJzZXRfam95c3RpY2tfdHlwZVwiLCB0aGlzLl9vblNldEpveXN0aWNrVHlwZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICog56aB55So5pe2XG4gICAqL1xuICBvbkRpc2FibGUoKSB7XG4gICAgaW5zdGFuY2Uub2ZmKFwic2V0X2pveXN0aWNrX3R5cGVcIiwgdGhpcy5fb25TZXRKb3lzdGlja1R5cGUsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaUueWPmOaRh+adhuexu+Wei1xuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgX29uU2V0Sm95c3RpY2tUeXBlKHR5cGU6IEpveXN0aWNrVHlwZSkge1xuICAgIHRoaXMuam95c3RpY2tUeXBlID0gdHlwZTtcbiAgICB0aGlzLm5vZGUub3BhY2l0eSA9IHR5cGUgPT09IEpveXN0aWNrVHlwZS5GSVhFRCA/IDI1NSA6IDA7XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW6Kem5pG45LqL5Lu2XG4gICAqL1xuICBfaW5pdFRvdWNoRXZlbnQoKSB7XG4gICAgLy8gc2V0IHRoZSBzaXplIG9mIGpveXN0aWNrIG5vZGUgdG8gY29udHJvbCBzY2FsZVxuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fdG91Y2hTdGFydEV2ZW50LCB0aGlzKTtcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fdG91Y2hNb3ZlRXZlbnQsIHRoaXMpO1xuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX3RvdWNoRW5kRXZlbnQsIHRoaXMpO1xuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX3RvdWNoRW5kRXZlbnQsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOinpuaRuOW8gOWni+Wbnuiwg+WHveaVsFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF90b3VjaFN0YXJ0RXZlbnQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICBpbnN0YW5jZS5lbWl0KGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBldmVudCk7XG5cbiAgICBjb25zdCB0b3VjaFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcblxuICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PT0gSm95c3RpY2tUeXBlLkZJWEVEKSB7XG4gICAgICB0aGlzLl9zdGlja1BvcyA9IHRoaXMucmluZy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAvLyDop6bmkbjngrnkuI7lnIblnIjkuK3lv4PnmoTot53nprtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdG91Y2hQb3Muc3ViKHRoaXMucmluZy5nZXRQb3NpdGlvbigpKS5tYWcoKTtcblxuICAgICAgLy8g5omL5oyH5Zyo5ZyG5ZyI5YaF6Kem5pG4LOaOp+adhui3n+maj+inpuaRuOeCuVxuICAgICAgdGhpcy5fcmFkaXVzID4gZGlzdGFuY2UgJiYgdGhpcy5kb3Quc2V0UG9zaXRpb24odG91Y2hQb3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5qb3lzdGlja1R5cGUgPT09IEpveXN0aWNrVHlwZS5GT0xMT1cpIHtcbiAgICAgIC8vIOiusOW9leaRh+adhuS9jee9ru+8jOe7mSB0b3VjaCBtb3ZlIOS9v+eUqFxuICAgICAgdGhpcy5fc3RpY2tQb3MgPSB0b3VjaFBvcztcbiAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgdGhpcy5fdG91Y2hMb2NhdGlvbiA9IGV2ZW50LmdldExvY2F0aW9uKCk7XG5cbiAgICAgIC8vIOabtOaUueaRh+adhueahOS9jee9rlxuICAgICAgdGhpcy5yaW5nLnNldFBvc2l0aW9uKHRvdWNoUG9zKTtcbiAgICAgIHRoaXMuZG90LnNldFBvc2l0aW9uKHRvdWNoUG9zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6Kem5pG456e75Yqo5Zue6LCD5Ye95pWwXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX3RvdWNoTW92ZUV2ZW50KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgLy8g5aaC5p6cIHRvdWNoIHN0YXJ0IOS9jee9ruWSjCB0b3VjaCBtb3ZlIOebuOWQjO+8jOemgeatouenu+WKqFxuICAgIGlmIChcbiAgICAgIHRoaXMuam95c3RpY2tUeXBlID09PSBKb3lzdGlja1R5cGUuRk9MTE9XICYmXG4gICAgICB0aGlzLl90b3VjaExvY2F0aW9uID09PSBldmVudC5nZXRMb2NhdGlvbigpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8g5Lul5ZyG5ZyI5Li66ZSa54K56I635Y+W6Kem5pG45Z2Q5qCHXG4gICAgY29uc3QgdG91Y2hQb3MgPSB0aGlzLnJpbmcuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0b3VjaFBvcy5tYWcoKTtcblxuICAgIC8vIOeUseS6juaRh+adhueahCBwb3N0aW9uIOaYr+S7peeItuiKgueCueS4uumUmueCue+8jOaJgOS7peWumuS9jeimgeWKoOS4iiB0b3VjaCBzdGFydCDml7bnmoTkvY3nva5cbiAgICBjb25zdCBwb3NYID0gdGhpcy5fc3RpY2tQb3MueCArIHRvdWNoUG9zLng7XG4gICAgY29uc3QgcG9zWSA9IHRoaXMuX3N0aWNrUG9zLnkgKyB0b3VjaFBvcy55O1xuXG4gICAgLy8g5b2S5LiA5YyWXG4gICAgY29uc3QgcCA9IGNjLnYyKHBvc1gsIHBvc1kpLnN1Yih0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKSkubm9ybWFsaXplKCk7XG5cbiAgICBsZXQgc3BlZWRUeXBlO1xuXG4gICAgaWYgKHRoaXMuX3JhZGl1cyA+IGRpc3RhbmNlKSB7XG4gICAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbihjYy52Mihwb3NYLCBwb3NZKSk7XG5cbiAgICAgIHNwZWVkVHlwZSA9IFNwZWVkVHlwZS5OT1JNQUw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOaOp+adhuawuOi/nOS/neaMgeWcqOWciOWGhe+8jOW5tuWcqOWciOWGhei3n+maj+inpuaRuOabtOaWsOinkuW6plxuICAgICAgY29uc3QgeCA9IHRoaXMuX3N0aWNrUG9zLnggKyBwLnggKiB0aGlzLl9yYWRpdXM7XG4gICAgICBjb25zdCB5ID0gdGhpcy5fc3RpY2tQb3MueSArIHAueSAqIHRoaXMuX3JhZGl1cztcbiAgICAgIHRoaXMuZG90LnNldFBvc2l0aW9uKGNjLnYyKHgsIHkpKTtcblxuICAgICAgc3BlZWRUeXBlID0gU3BlZWRUeXBlLkZBU1Q7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBldmVudCwge1xuICAgICAgc3BlZWRUeXBlOiBzcGVlZFR5cGUsXG4gICAgICBtb3ZlRGlzdGFuY2U6IHAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog6Kem5pG457uT5p2f5Zue6LCD5Ye95pWwXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX3RvdWNoRW5kRXZlbnQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbih0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKSk7XG4gICAgaWYgKHRoaXMuam95c3RpY2tUeXBlID09PSBKb3lzdGlja1R5cGUuRk9MTE9XKSB7XG4gICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGV2ZW50LCB7XG4gICAgICBzcGVlZFR5cGU6IFNwZWVkVHlwZS5TVE9QLFxuICAgIH0pO1xuICB9XG59XG4iXX0=