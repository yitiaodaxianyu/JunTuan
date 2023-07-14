"use strict";
cc._RF.push(module, 'b7ac9RDYgJBt6BeIB+qHp2v', 'XueYin');
// Scripts/Boss/Boss3/XueYin.ts

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
var XueYin = /** @class */ (function (_super) {
    __extends(XueYin, _super);
    function XueYin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_xueyin = [];
        return _this;
    }
    XueYin.prototype.setFloor = function (num) {
        for (var i = 1; i <= 5; i++) {
            var nodeSp = this.node.getChildByName(i.toString()).getComponent(cc.Sprite);
            nodeSp.spriteFrame = this.sp_xueyin[i <= num ? 1 : 0];
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], XueYin.prototype, "sp_xueyin", void 0);
    XueYin = __decorate([
        ccclass
    ], XueYin);
    return XueYin;
}(cc.Component));
exports.default = XueYin;

cc._RF.pop();