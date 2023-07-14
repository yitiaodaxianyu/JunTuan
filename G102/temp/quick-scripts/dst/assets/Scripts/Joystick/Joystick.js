
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
// resources/test/scripts/Joystick.ts

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFx0ZXN0XFxzY3JpcHRzXFxKb3lzdGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFDVSxRQUFBLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUU3Qzs7R0FFRztBQUNILElBQVksYUFJWDtBQUpELFdBQVksYUFBYTtJQUN2QixpREFBSSxDQUFBO0lBQ0osbURBQUssQ0FBQTtJQUNMLCtDQUFHLENBQUE7QUFDTCxDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7QUFFRDs7R0FFRztBQUNILElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQix5Q0FBSSxDQUFBO0lBQ0osNkNBQU0sQ0FBQTtJQUNOLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRDs7R0FFRztBQUNILElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUN0QixpREFBSyxDQUFBO0lBQ0wsbURBQU0sQ0FBQTtBQUNSLENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUVEOztHQUVHO0FBRUg7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFrTEM7UUE1S0MsU0FBRyxHQUFHLElBQUksQ0FBQztRQU9YLFVBQUksR0FBRyxJQUFJLENBQUM7UUFPWixrQkFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFPbkMsbUJBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBTWxDLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFNakIsb0JBQWMsR0FBRyxJQUFJLENBQUM7UUFLdEIsYUFBTyxHQUFH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USIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5YWo5bGA5LqL5Lu255uR5ZCs5a6e5L6LXG4gKi9cbmV4cG9ydCBjb25zdCBpbnN0YW5jZSA9IG5ldyBjYy5FdmVudFRhcmdldCgpO1xuXG4vKipcbiAqIOaWueWQkeexu+Wei1xuICovXG5leHBvcnQgZW51bSBEaXJlY3Rpb25UeXBlIHtcbiAgRk9VUixcbiAgRUlHSFQsXG4gIEFMTCxcbn1cblxuLyoqXG4gKiDpgJ/luqbnsbvlnotcbiAqL1xuZXhwb3J0IGVudW0gU3BlZWRUeXBlIHtcbiAgU1RPUCxcbiAgTk9STUFMLFxuICBGQVNULFxufVxuXG4vKipcbiAqIOaRh+adhuexu+Wei1xuICovXG5leHBvcnQgZW51bSBKb3lzdGlja1R5cGUge1xuICBGSVhFRCxcbiAgRk9MTE9XLFxufVxuXG4vKipcbiAqIOaRh+adhuexu1xuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm95c3RpY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoe1xuICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgZGlzcGxheU5hbWU6IFwiRG90XCIsXG4gICAgdG9vbHRpcDogXCLmkYfmnYbmk43nurXngrlcIixcbiAgfSlcbiAgZG90ID0gbnVsbDtcblxuICBAcHJvcGVydHkoe1xuICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgZGlzcGxheU5hbWU6IFwiUmluZ1wiLFxuICAgIHRvb2x0aXA6IFwi5pGH5p2G6IOM5pmv6IqC54K5XCIsXG4gIH0pXG4gIHJpbmcgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuRW51bShKb3lzdGlja1R5cGUpLFxuICAgIGRpc3BsYXlOYW1lOiBcIlRvdWNoIFR5cGVcIixcbiAgICB0b29sdGlwOiBcIuinpuaRuOexu+Wei1wiLFxuICB9KVxuICBqb3lzdGlja1R5cGUgPSBKb3lzdGlja1R5cGUuRk9MTE9XO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdHlwZTogY2MuRW51bShEaXJlY3Rpb25UeXBlKSxcbiAgICBkaXNwbGF5TmFtZTogXCJEaXJlY3Rpb24gVHlwZVwiLFxuICAgIHRvb2x0aXA6IFwi5pa55ZCR57G75Z6LXCIsXG4gIH0pXG4gIGRpcmVjdGlvblR5cGUgPSBEaXJlY3Rpb25UeXBlLkFMTDtcblxuICBAcHJvcGVydHkoe1xuICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgdG9vbHRpcDogXCLmkYfmnYbmiYDlnKjkvY3nva5cIixcbiAgfSlcbiAgX3N0aWNrUG9zID0gbnVsbDtcblxuICBAcHJvcGVydHkoe1xuICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgdG9vbHRpcDogXCLop6bmkbjkvY3nva5cIixcbiAgfSlcbiAgX3RvdWNoTG9jYXRpb24gPSBudWxsO1xuXG4gIEBwcm9wZXJ0eSh7XG4gICAgdG9vbHRpcDogXCLljYrlvoRcIixcbiAgfSlcbiAgX3JhZGl1cyA9IDA7XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMucmluZy53aWR0aCAvIDI7XG4gICAgdGhpcy5faW5pdFRvdWNoRXZlbnQoKTtcbiAgICAvLyBoaWRlIGpveXN0aWNrIHdoZW4gZm9sbG93XG4gICAgdGhpcy5qb3lzdGlja1R5cGUgPSBKb3lzdGlja1R5cGUuRk9MTE9XO1xuICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PT0gSm95c3RpY2tUeXBlLkZPTExPVykge1xuICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlkK/nlKjml7ZcbiAgICovXG4gIG9uRW5hYmxlKCkge1xuICAgIGluc3RhbmNlLm9uKFwic2V0X2pveXN0aWNrX3R5cGVcIiwgdGhpcy5fb25TZXRKb3lzdGlja1R5cGUsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOemgeeUqOaXtlxuICAgKi9cbiAgb25EaXNhYmxlKCkge1xuICAgIGluc3RhbmNlLm9mZihcInNldF9qb3lzdGlja190eXBlXCIsIHRoaXMuX29uU2V0Sm95c3RpY2tUeXBlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmlLnlj5jmkYfmnYbnsbvlnotcbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIF9vblNldEpveXN0aWNrVHlwZSh0eXBlOiBKb3lzdGlja1R5cGUpIHtcbiAgICB0aGlzLmpveXN0aWNrVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ub2RlLm9wYWNpdHkgPSB0eXBlID09PSBKb3lzdGlja1R5cGUuRklYRUQgPyAyNTUgOiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMluinpuaRuOS6i+S7tlxuICAgKi9cbiAgX2luaXRUb3VjaEV2ZW50KCkge1xuICAgIC8vIHNldCB0aGUgc2l6ZSBvZiBqb3lzdGljayBub2RlIHRvIGNvbnRyb2wgc2NhbGVcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX3RvdWNoU3RhcnRFdmVudCwgdGhpcyk7XG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX3RvdWNoTW92ZUV2ZW50LCB0aGlzKTtcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6bmkbjlvIDlp4vlm57osIPlh73mlbBcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBfdG91Y2hTdGFydEV2ZW50KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgaW5zdGFuY2UuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZXZlbnQpO1xuXG4gICAgY29uc3QgdG91Y2hQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG5cbiAgICBpZiAodGhpcy5qb3lzdGlja1R5cGUgPT09IEpveXN0aWNrVHlwZS5GSVhFRCkge1xuICAgICAgdGhpcy5fc3RpY2tQb3MgPSB0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgLy8g6Kem5pG454K55LiO5ZyG5ZyI5Lit5b+D55qE6Led56a7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHRvdWNoUG9zLnN1Yih0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKSkubWFnKCk7XG5cbiAgICAgIC8vIOaJi+aMh+WcqOWchuWciOWGheinpuaRuCzmjqfmnYbot5/pmo/op6bmkbjngrlcbiAgICAgIHRoaXMuX3JhZGl1cyA+IGRpc3RhbmNlICYmIHRoaXMuZG90LnNldFBvc2l0aW9uKHRvdWNoUG9zKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuam95c3RpY2tUeXBlID09PSBKb3lzdGlja1R5cGUuRk9MTE9XKSB7XG4gICAgICAvLyDorrDlvZXmkYfmnYbkvY3nva7vvIznu5kgdG91Y2ggbW92ZSDkvb/nlKhcbiAgICAgIHRoaXMuX3N0aWNrUG9zID0gdG91Y2hQb3M7XG4gICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgIHRoaXMuX3RvdWNoTG9jYXRpb24gPSBldmVudC5nZXRMb2NhdGlvbigpO1xuXG4gICAgICAvLyDmm7TmlLnmkYfmnYbnmoTkvY3nva5cbiAgICAgIHRoaXMucmluZy5zZXRQb3NpdGlvbih0b3VjaFBvcyk7XG4gICAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbih0b3VjaFBvcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOinpuaRuOenu+WKqOWbnuiwg+WHveaVsFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF90b3VjaE1vdmVFdmVudChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuICAgIC8vIOWmguaenCB0b3VjaCBzdGFydCDkvY3nva7lkowgdG91Y2ggbW92ZSDnm7jlkIzvvIznpoHmraLnp7vliqhcbiAgICBpZiAoXG4gICAgICB0aGlzLmpveXN0aWNrVHlwZSA9PT0gSm95c3RpY2tUeXBlLkZPTExPVyAmJlxuICAgICAgdGhpcy5fdG91Y2hMb2NhdGlvbiA9PT0gZXZlbnQuZ2V0TG9jYXRpb24oKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIOS7peWchuWciOS4uumUmueCueiOt+WPluinpuaRuOWdkOagh1xuICAgIGNvbnN0IHRvdWNoUG9zID0gdGhpcy5yaW5nLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdG91Y2hQb3MubWFnKCk7XG5cbiAgICAvLyDnlLHkuo7mkYfmnYbnmoQgcG9zdGlvbiDmmK/ku6XniLboioLngrnkuLrplJrngrnvvIzmiYDku6XlrprkvY3opoHliqDkuIogdG91Y2ggc3RhcnQg5pe255qE5L2N572uXG4gICAgY29uc3QgcG9zWCA9IHRoaXMuX3N0aWNrUG9zLnggKyB0b3VjaFBvcy54O1xuICAgIGNvbnN0IHBvc1kgPSB0aGlzLl9zdGlja1Bvcy55ICsgdG91Y2hQb3MueTtcblxuICAgIC8vIOW9kuS4gOWMllxuICAgIGNvbnN0IHAgPSBjYy52Mihwb3NYLCBwb3NZKS5zdWIodGhpcy5yaW5nLmdldFBvc2l0aW9uKCkpLm5vcm1hbGl6ZSgpO1xuXG4gICAgbGV0IHNwZWVkVHlwZTtcblxuICAgIGlmICh0aGlzLl9yYWRpdXMgPiBkaXN0YW5jZSkge1xuICAgICAgdGhpcy5kb3Quc2V0UG9zaXRpb24oY2MudjIocG9zWCwgcG9zWSkpO1xuXG4gICAgICBzcGVlZFR5cGUgPSBTcGVlZFR5cGUuTk9STUFMO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDmjqfmnYbmsLjov5zkv53mjIHlnKjlnIjlhoXvvIzlubblnKjlnIjlhoXot5/pmo/op6bmkbjmm7TmlrDop5LluqZcbiAgICAgIGNvbnN0IHggPSB0aGlzLl9zdGlja1Bvcy54ICsgcC54ICogdGhpcy5fcmFkaXVzO1xuICAgICAgY29uc3QgeSA9IHRoaXMuX3N0aWNrUG9zLnkgKyBwLnkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbihjYy52Mih4LCB5KSk7XG5cbiAgICAgIHNwZWVkVHlwZSA9IFNwZWVkVHlwZS5GQVNUO1xuICAgIH1cblxuICAgIGluc3RhbmNlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgZXZlbnQsIHtcbiAgICAgIHNwZWVkVHlwZTogc3BlZWRUeXBlLFxuICAgICAgbW92ZURpc3RhbmNlOiBwLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOinpuaRuOe7k+adn+Wbnuiwg+WHveaVsFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF90b3VjaEVuZEV2ZW50KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgdGhpcy5kb3Quc2V0UG9zaXRpb24odGhpcy5yaW5nLmdldFBvc2l0aW9uKCkpO1xuICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PT0gSm95c3RpY2tUeXBlLkZPTExPVykge1xuICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgIH1cblxuICAgIGluc3RhbmNlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBldmVudCwge1xuICAgICAgc3BlZWRUeXBlOiBTcGVlZFR5cGUuU1RPUCxcbiAgICB9KTtcbiAgfVxufVxuIl19