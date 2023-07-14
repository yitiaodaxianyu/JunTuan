"use strict";
cc._RF.push(module, '140a8h4pO5G55+CfKrXL/8d', 'PressButton');
// Scripts/Tools/PressButton.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PressButton = /** @class */ (function (_super) {
    __extends(PressButton, _super);
    function PressButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.press_events = [];
        // @property([cc.Component.EventHandler])
        // release_events: cc.Component.EventHandler[]=[];
        _this.interval = 0.1;
        _this.is_can_press = true;
        _this.is_click = false;
        _this.is_press = false;
        return _this;
    }
    PressButton.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        if (this.interval <= 0) {
            this.interval = 0.1;
        }
    };
    PressButton.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    PressButton.prototype.onTouchStart = function (btn) {
        if (this.is_can_press) {
            //默认使用放大处理按下操作
            this.is_press = true;
            cc.tween(btn.currentTarget).to(0.1, { scale: 0.9 }).start();
            this.is_click = false;
            this.onClick(btn);
            this.schedule(this.onClick, this.interval);
            //cc.log('onTouchStart');
        }
    };
    PressButton.prototype.onTouchEnd = function (btn) {
        if (this.is_press) {
            this.is_press = false;
            cc.tween(btn.currentTarget).to(0.1, { scale: 1.0 }).start();
            this.unschedule(this.onClick);
            if (!this.is_click) {
                this.onClick(btn);
            }
            // for(let i=0; i<this.release_events.length; i++){
            //     this.release_events[i].emit([btn]);
            // }
            //cc.log('onTouchEnd');
        }
    };
    PressButton.prototype.onClick = function (btn) {
        this.is_click = true;
        for (var i = 0; i < this.press_events.length; i++) {
            this.press_events[i].emit([this.node]);
        }
    };
    PressButton.prototype.setIsCanPress = function (isCan) {
        this.is_can_press = isCan;
        this.setMat();
    };
    PressButton.prototype.getIsCanPress = function () {
        return this.is_can_press;
    };
    PressButton.prototype.setMat = function () {
        var normalMaterial = cc.Material.getBuiltinMaterial('2d-sprite');
        var grayMaterial = cc.Material.getBuiltinMaterial('2d-gray-sprite');
        this.node.getComponent(cc.Sprite).setMaterial(0, this.is_can_press ? normalMaterial : grayMaterial);
        if (this.is_can_press == false) {
            this.unschedule(this.onClick);
        }
    };
    __decorate([
        property([cc.Component.EventHandler])
    ], PressButton.prototype, "press_events", void 0);
    __decorate([
        property()
    ], PressButton.prototype, "interval", void 0);
    PressButton = __decorate([
        ccclass
    ], PressButton);
    return PressButton;
}(cc.Component));
exports.default = PressButton;

cc._RF.pop();