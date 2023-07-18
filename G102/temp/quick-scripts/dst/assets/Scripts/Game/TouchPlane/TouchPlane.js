
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/TouchPlane/TouchPlane.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '24d5daFJVNHhI4qJNsEZxlO', 'TouchPlane');
// Scripts/Game/TouchPlane/TouchPlane.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
exports.DirectionType = exports.instance = void 0;
var GameManager_1 = require("../../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 全局事件监听实例
 */
exports.instance = new cc.EventTarget();
/**
 * 点击左边或者右边
 */
var DirectionType;
(function (DirectionType) {
    DirectionType[DirectionType["LEFT"] = 0] = "LEFT";
    DirectionType[DirectionType["RIGHT"] = 1] = "RIGHT";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
var TouchPlane = /** @class */ (function (_super) {
    __extends(TouchPlane, _super);
    function TouchPlane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchPlane.prototype.start = function () {
    };
    TouchPlane.prototype.onLoad = function () {
        this._initTouchEvent();
    };
    /**
   * 初始化触摸事件
   */
    TouchPlane.prototype._initTouchEvent = function () {
        // set the size of joystick node to control scale
        // this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    };
    TouchPlane.prototype.onDestroy = function () {
        this._offTouchEvent();
    };
    /**
  * 初始化触摸事件
  */
    TouchPlane.prototype._offTouchEvent = function () {
        // set the size of joystick node to control scale
        // this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        // this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    };
    /**
   * 触摸结束回调函数
   * @param event
   */
    TouchPlane.prototype._touchEndEvent = function (event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var directiontype = DirectionType.LEFT;
        var cheWeiPos = (GameManager_1.default.getInstance().aniType - 4) * 75;
        if (touchPos.x > cheWeiPos) {
            directiontype = DirectionType.RIGHT;
            if (GameManager_1.default.getInstance().aniType < 8) {
                GameManager_1.default.getInstance().aniType++;
            }
        }
        else {
            if (GameManager_1.default.getInstance().aniType > 0) {
                GameManager_1.default.getInstance().aniType--;
            }
        }
        exports.instance.emit(cc.Node.EventType.TOUCH_END, event, {
            directionType: directiontype,
        });
    };
    TouchPlane = __decorate([
        ccclass
    ], TouchPlane);
    return TouchPlane;
}(cc.Component));
exports.default = TouchPlane;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVG91Y2hQbGFuZVxcVG91Y2hQbGFuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFN0M7O0dBRUc7QUFDSCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsaURBQUksQ0FBQTtJQUNKLG1EQUFLLENBQUE7QUFDVCxDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRDtJQUF3Qyw4QkFBWTtJQUFwRDs7SUEwREEsQ0FBQztJQXJERywwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUNTLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRDs7S0FFQztJQUNELG9DQUFlLEdBQWY7UUFDSSxpREFBaUQ7UUFDakQsNEVBQTRFO1FBQzVFLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSwyRUFBMkU7SUFDL0UsQ0FBQztJQUNTLDhCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRDs7SUFFQTtJQUNBLG1DQUFjLEdBQWQ7UUFDSSxpREFBaUQ7UUFDakQsNkVBQTZFO1FBQzdFLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSw0RUFBNEU7SUFDaEYsQ0FBQztJQUNEOzs7S0FHQztJQUNELG1DQUFjLEdBQWQsVUFBZSxLQUEwQjtRQUNyQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLElBQUksYUFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxTQUFTLEdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckUsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRTtZQUN4QixhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUNwQyxJQUFJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDdkMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QztTQUNKO2FBQU07WUFDSCxJQUFJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDdkMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QztTQUNKO1FBRUQsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRTtZQUM5QyxhQUFhLEVBQUUsYUFBYTtTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBekRnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMEQ5QjtJQUFELGlCQUFDO0NBMURELEFBMERDLENBMUR1QyxFQUFFLENBQUMsU0FBUyxHQTBEbkQ7a0JBMURvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoqXHJcbiAqIOWFqOWxgOS6i+S7tuebkeWQrOWunuS+i1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluc3RhbmNlID0gbmV3IGNjLkV2ZW50VGFyZ2V0KCk7XHJcblxyXG4vKipcclxuICog54K55Ye75bem6L655oiW6ICF5Y+z6L65XHJcbiAqL1xyXG5leHBvcnQgZW51bSBEaXJlY3Rpb25UeXBlIHtcclxuICAgIExFRlQsXHJcbiAgICBSSUdIVFxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdWNoUGxhbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcblxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faW5pdFRvdWNoRXZlbnQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIOWIneWni+WMluinpuaRuOS6i+S7tlxyXG4gICAqL1xyXG4gICAgX2luaXRUb3VjaEV2ZW50KCkge1xyXG4gICAgICAgIC8vIHNldCB0aGUgc2l6ZSBvZiBqb3lzdGljayBub2RlIHRvIGNvbnRyb2wgc2NhbGVcclxuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX3RvdWNoU3RhcnRFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX3RvdWNoTW92ZUV2ZW50LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fb2ZmVG91Y2hFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgKiDliJ3lp4vljJbop6bmkbjkuovku7ZcclxuICAqL1xyXG4gICAgX29mZlRvdWNoRXZlbnQoKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBzaXplIG9mIGpveXN0aWNrIG5vZGUgdG8gY29udHJvbCBzY2FsZVxyXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX3RvdWNoU3RhcnRFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl90b3VjaE1vdmVFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX3RvdWNoRW5kRXZlbnQsIHRoaXMpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIOinpuaRuOe7k+adn+Wbnuiwg+WHveaVsFxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gICAgX3RvdWNoRW5kRXZlbnQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBjb25zdCB0b3VjaFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcclxuXHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbnR5cGUgPSBEaXJlY3Rpb25UeXBlLkxFRlQ7XHJcbiAgICAgICAgbGV0IGNoZVdlaVBvczogbnVtYmVyID0gKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSAtIDQpICogNzU7XHJcbiAgICAgICAgaWYgKHRvdWNoUG9zLnggPiBjaGVXZWlQb3MpIHtcclxuICAgICAgICAgICAgZGlyZWN0aW9udHlwZSA9IERpcmVjdGlvblR5cGUuUklHSFQ7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgPCA4KSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5zdGFuY2UuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGV2ZW50LCB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvblR5cGU6IGRpcmVjdGlvbnR5cGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19