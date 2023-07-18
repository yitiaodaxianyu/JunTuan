"use strict";
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