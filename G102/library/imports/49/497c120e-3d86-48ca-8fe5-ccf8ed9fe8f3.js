"use strict";
cc._RF.push(module, '497c1IOPYZIyo/lzPjtn+jz', 'LightEffect');
// Scripts/UI/LightEffect.ts

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
var LightEffect = /** @class */ (function (_super) {
    __extends(LightEffect, _super);
    function LightEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light_materail = null;
        _this.light_y = -0.5;
        return _this;
    }
    //cur_angle:number=45;
    LightEffect.prototype.start = function () {
        this.light_materail = this.node.getComponent(cc.Sprite).getMaterial(0);
    };
    LightEffect.prototype.update = function (dt) {
        this.light_y += dt * 1.2;
        if (this.light_y > 1.5) {
            this.light_y = -0.5;
            // this.cur_angle=180-this.cur_angle;
            // this.light_materail.setProperty('lightAngle',this.cur_angle);
        }
        this.light_materail.setProperty('lightCenterPoint', cc.v2(0.5, this.light_y));
    };
    __decorate([
        property()
    ], LightEffect.prototype, "light_y", void 0);
    LightEffect = __decorate([
        ccclass
    ], LightEffect);
    return LightEffect;
}(cc.Component));
exports.default = LightEffect;

cc._RF.pop();