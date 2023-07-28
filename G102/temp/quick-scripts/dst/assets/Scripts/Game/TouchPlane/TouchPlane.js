
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchNode = null; //touchNode
        return _this;
    }
    TouchPlane.prototype.start = function () {
        this._initTouchEvent();
    };
    /**
   * 初始化触摸事件
   */
    TouchPlane.prototype._initTouchEvent = function () {
        // set the size of joystick node to control scale
        this.touchNode.x = 0;
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    };
    TouchPlane.prototype.onDestroy = function () {
        this._offTouchEvent();
    };
    /**
  * 初始化触摸事件
  */
    TouchPlane.prototype._offTouchEvent = function () {
        // set the size of joystick node to control scale
        this.touchNode.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    };
    /**
  * 触摸开始回调函数
  * @param event
  */
    TouchPlane.prototype._touchStartEvent = function (event) {
    };
    /**
   * 触摸移动回调函数
   * @param event
   */
    TouchPlane.prototype._touchMoveEvent = function (event) {
        var delta = event.touch.getDelta();
        this.touchNode.x += delta.x;
        if (this.touchNode.x < -275) {
            this.touchNode.x = -275;
        }
        if (this.touchNode.x > 275) {
            this.touchNode.x = 275;
        }
        GameManager_1.default.getInstance().aniType = this.touchNode.x;
        exports.instance.emit(cc.Node.EventType.TOUCH_MOVE, event, {});
    };
    /**
   * 触摸结束回调函数
   * @param event
   */
    TouchPlane.prototype._touchEndEvent = function (event) {
        // const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        // let directiontype = DirectionType.LEFT;
        // let cheWeiPos: number = (GameManager.getInstance().aniType - 4) * 75;
        // if (touchPos.x > cheWeiPos) {
        //     directiontype = DirectionType.RIGHT;
        //     if (GameManager.getInstance().aniType < 8) {
        //         GameManager.getInstance().aniType++;
        //     }
        // } else {
        //     if (GameManager.getInstance().aniType > 0) {
        //         GameManager.getInstance().aniType--;
        //     }
        // }
        // instance.emit(cc.Node.EventType.TOUCH_END, event, {
        //     directionType: directiontype,
        // });
    };
    __decorate([
        property(cc.Node)
    ], TouchPlane.prototype, "touchNode", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVG91Y2hQbGFuZVxcVG91Y2hQbGFuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFN0M7O0dBRUc7QUFDSCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsaURBQUksQ0FBQTtJQUNKLG1EQUFLLENBQUE7QUFDVCxDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRDtJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXFGQztRQWhGRyxlQUFTLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVzs7SUFnRnpDLENBQUM7SUE5RWEsMEJBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7O0tBRUM7SUFDRCxvQ0FBZSxHQUFmO1FBQ0ksaURBQWlEO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJ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VUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8qKlxyXG4gKiDlhajlsYDkuovku7bnm5HlkKzlrp7kvotcclxuICovXHJcbmV4cG9ydCBjb25zdCBpbnN0YW5jZSA9IG5ldyBjYy5FdmVudFRhcmdldCgpO1xyXG5cclxuLyoqXHJcbiAqIOeCueWHu+W3pui+ueaIluiAheWPs+i+uVxyXG4gKi9cclxuZXhwb3J0IGVudW0gRGlyZWN0aW9uVHlwZSB7XHJcbiAgICBMRUZULFxyXG4gICAgUklHSFRcclxufVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VjaFBsYW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdG91Y2hOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL3RvdWNoTm9kZVxyXG4gICBcclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pbml0VG91Y2hFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICog5Yid5aeL5YyW6Kem5pG45LqL5Lu2XHJcbiAgICovXHJcbiAgICBfaW5pdFRvdWNoRXZlbnQoKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBzaXplIG9mIGpveXN0aWNrIG5vZGUgdG8gY29udHJvbCBzY2FsZVxyXG4gICAgICAgIHRoaXMudG91Y2hOb2RlLng9MDtcclxuICAgICAgICB0aGlzLnRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fdG91Y2hTdGFydEV2ZW50LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl90b3VjaE1vdmVFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl90b3VjaEVuZEV2ZW50LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX3RvdWNoRW5kRXZlbnQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vZmZUb3VjaEV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAqIOWIneWni+WMluinpuaRuOS6i+S7tlxyXG4gICovXHJcbiAgICBfb2ZmVG91Y2hFdmVudCgpIHtcclxuICAgICAgICAvLyBzZXQgdGhlIHNpemUgb2Ygam95c3RpY2sgbm9kZSB0byBjb250cm9sIHNjYWxlXHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl90b3VjaFN0YXJ0RXZlbnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl90b3VjaE1vdmVFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fdG91Y2hFbmRFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fdG91Y2hFbmRFdmVudCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAqIOinpuaRuOW8gOWni+Wbnuiwg+WHveaVsFxyXG4gICogQHBhcmFtIGV2ZW50XHJcbiAgKi9cclxuICAgIF90b3VjaFN0YXJ0RXZlbnQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiDop6bmkbjnp7vliqjlm57osIPlh73mlbBcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICAgIF90b3VjaE1vdmVFdmVudChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIHZhciBkZWx0YSA9IGV2ZW50LnRvdWNoLmdldERlbHRhKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUueCArPSBkZWx0YS54O1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoTm9kZS54IDwgLTI3NSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoTm9kZS54ID0gLTI3NTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoTm9kZS54ID4gMjc1KSB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hOb2RlLnggPSAyNzU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSA9IHRoaXMudG91Y2hOb2RlLng7XHJcbiAgICAgICAgaW5zdGFuY2UuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBldmVudCwge1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiDop6bmkbjnu5PmnZ/lm57osIPlh73mlbBcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICAgIF90b3VjaEVuZEV2ZW50KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgLy8gY29uc3QgdG91Y2hQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBkaXJlY3Rpb250eXBlID0gRGlyZWN0aW9uVHlwZS5MRUZUO1xyXG4gICAgICAgIC8vIGxldCBjaGVXZWlQb3M6IG51bWJlciA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSA0KSAqIDc1O1xyXG4gICAgICAgIC8vIGlmICh0b3VjaFBvcy54ID4gY2hlV2VpUG9zKSB7XHJcbiAgICAgICAgLy8gICAgIGRpcmVjdGlvbnR5cGUgPSBEaXJlY3Rpb25UeXBlLlJJR0hUO1xyXG4gICAgICAgIC8vICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlIDwgOCkge1xyXG4gICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlKys7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlID4gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlLS07XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGluc3RhbmNlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBldmVudCwge1xyXG4gICAgICAgIC8vICAgICBkaXJlY3Rpb25UeXBlOiBkaXJlY3Rpb250eXBlLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==