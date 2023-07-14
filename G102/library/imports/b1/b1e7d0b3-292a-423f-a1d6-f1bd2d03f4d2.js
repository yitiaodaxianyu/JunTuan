"use strict";
cc._RF.push(module, 'b1e7dCzKSpCP6HW8b0tA/TS', 'HeroFragment');
// Scripts/Hero/Ui/HeroFragment.ts

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
var HeroManager_1 = require("../Data/HeroManager");
var HeroConfig_1 = require("../Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroFragment = /** @class */ (function (_super) {
    __extends(HeroFragment, _super);
    function HeroFragment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.fragment_num = 0;
        return _this;
    }
    HeroFragment.prototype.init = function (heroType, num) {
        this.hero_type = heroType;
        this.fragment_num = num;
        this.refreshData();
    };
    HeroFragment.prototype.refreshData = function () {
        var icon = this.node.getChildByName('mask').getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + this.hero_type);
        var num = this.node.getChildByName('num');
        num.getComponent(cc.Label).string = "" + this.fragment_num;
        this.node.name = 'fragment';
        if (this.hero_type == HeroConfig_1.Hero_Type.NULL) {
            icon.y = 26;
        }
        else {
            icon.y = 38;
        }
    };
    HeroFragment = __decorate([
        ccclass
    ], HeroFragment);
    return HeroFragment;
}(cc.Component));
exports.default = HeroFragment;

cc._RF.pop();