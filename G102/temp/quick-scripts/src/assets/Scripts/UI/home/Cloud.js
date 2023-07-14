"use strict";
cc._RF.push(module, '61572ifMJVKuZ+13Vmtwj5o', 'Cloud');
// Scripts/UI/home/Cloud.ts

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
var Cloud = /** @class */ (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        return _this;
    }
    Cloud.prototype.start = function () {
        var _this = this;
        cc.tween(this.node).to(this.speed, { position: cc.v3(-525, this.node.y, 0) }).call(function () {
            _this.node.x = 525;
        }).union().repeatForever().start();
    };
    __decorate([
        property(cc.Integer)
    ], Cloud.prototype, "speed", void 0);
    Cloud = __decorate([
        ccclass
    ], Cloud);
    return Cloud;
}(cc.Component));
exports.default = Cloud;

cc._RF.pop();