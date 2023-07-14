"use strict";
cc._RF.push(module, '90b7f0AwzZJ6rWu6MHmDOip', 'GuaJiRes');
// Scripts/GuaJi/GuaJiRes.ts

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
var GuaJiManager_1 = require("./GuaJiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiRes = /** @class */ (function (_super) {
    __extends(GuaJiRes, _super);
    function GuaJiRes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_follow_bg = false;
        return _this;
    }
    // onLoad () {}
    GuaJiRes.prototype.init = function (propId) {
        var _this = this;
        //换图片
        //this.node.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(propId);
        var xx = Math.random() * 20 + 30;
        xx *= Math.random() < 0.5 ? 1 : -1;
        var yy = 0;
        var height = Math.random() * 20 + 30;
        cc.tween(this.node).then(cc.jumpBy(0.5, xx, yy, height, 1)).call(function () {
            _this.is_follow_bg = true;
        }).delay(1).call(function () {
            _this.is_follow_bg = false;
        }).to(Math.random() * 0.3 + 0.3, { x: GuaJiManager_1.default.getInstance().box_pos.x, y: GuaJiManager_1.default.getInstance().box_pos.y, opacity: 168 }).removeSelf().start();
    };
    GuaJiRes.prototype.update = function (dt) {
        if (this.is_follow_bg) {
            var xx = -(GuaJiManager_1.default.getInstance().bg_speed_x * dt);
            this.node.x += xx;
        }
    };
    GuaJiRes = __decorate([
        ccclass
    ], GuaJiRes);
    return GuaJiRes;
}(cc.Component));
exports.default = GuaJiRes;

cc._RF.pop();