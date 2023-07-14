"use strict";
cc._RF.push(module, 'd0326tvIkNHJK5i8i1eWiqv', 'WishingEffectUi');
// Scripts/Wish/WishingEffectUi.ts

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
var WishingEffectUi = /** @class */ (function (_super) {
    __extends(WishingEffectUi, _super);
    function WishingEffectUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // onLoad () {}
    WishingEffectUi.prototype.start = function () {
        var _this = this;
        var skeleton = this.node.getComponent(sp.Skeleton);
        skeleton.setCompleteListener(function (trackEnter) {
            _this.node.destroy();
        });
    };
    WishingEffectUi = __decorate([
        ccclass
    ], WishingEffectUi);
    return WishingEffectUi;
}(cc.Component));
exports.default = WishingEffectUi;

cc._RF.pop();