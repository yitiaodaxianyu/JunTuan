"use strict";
cc._RF.push(module, '40fd4JjmHBO/p0Y5ISMPuVd', 'HpProgressBar');
// Scripts/Monster/HpProgressBar.ts

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
var HpProgressBar = /** @class */ (function (_super) {
    __extends(HpProgressBar, _super);
    function HpProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yellow = null;
        _this.min_width = 17;
        _this.min_pro = 0.2;
        _this.speed = 56;
        _this.is_need_hide = true;
        return _this;
    }
    HpProgressBar.prototype.onLoad = function () {
        this.yellow = this.node.getChildByName('yellow');
        this.min_pro = this.min_width / this.totalLength;
    };
    HpProgressBar.prototype.changeProgress = function (num) {
        if (this.is_need_hide) {
            if (num >= 1 || num <= 0) {
                this.node.opacity = 0;
            }
            else {
                this.node.opacity = 255;
            }
        }
        if (num < this.min_pro) {
            num = this.min_pro;
        }
        this.progress = num;
    };
    HpProgressBar.prototype.setPos = function (x, y) {
        this.node.x = x;
        this.node.y = y;
        var z = Math.round(8000 - this.node.y * 10);
        if (z < 0) {
            z = 0;
        }
        if (z > 8000) {
            z = 8000;
        }
        this.node.zIndex = z;
    };
    //显示黄色
    HpProgressBar.prototype.update = function (dt) {
        var curWidth = this.progress * this.totalLength;
        if (this.yellow.width > curWidth) {
            this.yellow.width -= this.speed * dt;
            if (this.yellow.width < curWidth) {
                this.yellow.width = curWidth;
            }
        }
        else if (this.yellow.width < curWidth) {
            this.yellow.width = curWidth;
        }
    };
    __decorate([
        property()
    ], HpProgressBar.prototype, "min_width", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "min_pro", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "speed", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "is_need_hide", void 0);
    HpProgressBar = __decorate([
        ccclass
    ], HpProgressBar);
    return HpProgressBar;
}(cc.ProgressBar));
exports.default = HpProgressBar;

cc._RF.pop();