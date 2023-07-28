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