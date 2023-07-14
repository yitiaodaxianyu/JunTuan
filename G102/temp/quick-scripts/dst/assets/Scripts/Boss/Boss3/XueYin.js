
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss3/XueYin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczNcXFh1ZVlpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQVdDO1FBUkcsZUFBUyxHQUFrQixFQUFFLENBQUM7O0lBUWxDLENBQUM7SUFORyx5QkFBUSxHQUFSLFVBQVMsR0FBVTtRQUNmLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDbkIsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRSxNQUFNLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFFLEdBQUcsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFQRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs2Q0FDRztJQUhiLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FXMUI7SUFBRCxhQUFDO0NBWEQsQUFXQyxDQVhtQyxFQUFFLENBQUMsU0FBUyxHQVcvQztrQkFYb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYdWVZaW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfeHVleWluOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgc2V0Rmxvb3IobnVtOm51bWJlcil7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTU7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlU3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGkudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIG5vZGVTcC5zcHJpdGVGcmFtZT10aGlzLnNwX3h1ZXlpbltpPD1udW0/MTowXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19