"use strict";
cc._RF.push(module, '53736roQM5OJI/Q0WS2gY74', 'BtnHero');
// Scripts/Hero/Ui/BtnHero.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnHero = /** @class */ (function (_super) {
    __extends(BtnHero, _super);
    function BtnHero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_id = HeroConfig_1.Hero_Type.NULL;
        _this.icon = null;
        _this.team_index = 0;
        return _this;
    }
    BtnHero.prototype.init = function (heroId) {
        this.hero_id = heroId;
        this.icon = this.node.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + heroId);
        // let type = this.node.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName("Hero_Type_" + HeroBaseInfoManager.getInstance().getHeroType(heroId));
        // console.log(type.getComponent(cc.Sprite).spriteFrame)
        var levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + HeroManager_1.HeroManager.getInstance().getHeroLevel(heroId);
    };
    BtnHero.prototype.showSelect = function () {
        this.node.getChildByName("select").active = true;
    };
    BtnHero.prototype.hideSelect = function () {
        this.node.getChildByName("select").active = false;
    };
    __decorate([
        property()
    ], BtnHero.prototype, "team_index", void 0);
    BtnHero = __decorate([
        ccclass
    ], BtnHero);
    return BtnHero;
}(cc.Component));
exports.default = BtnHero;

cc._RF.pop();