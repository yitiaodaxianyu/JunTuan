"use strict";
cc._RF.push(module, '6f57bxOo4RJf43fCudxAPq2', 'SkillInfoUi');
// Scripts/UI/home/SkillInfoUi.ts

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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillInfoUi = /** @class */ (function (_super) {
    __extends(SkillInfoUi, _super);
    function SkillInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_avatar = [];
        return _this;
        // update (dt) {}
    }
    SkillInfoUi.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    SkillInfoUi.prototype.init = function (heroType) {
        var lm = LanguageManager_1.default.getInstance();
        var lanType = lm.getCurLanguageType();
        var textRoot = this.node.getChildByName('textRoot');
        var avaIcon = textRoot.getChildByName('avaIcon');
        avaIcon.getComponent(cc.Sprite).spriteFrame = this.sp_avatar[heroType];
        var name = avaIcon.getChildByName('name');
        //name.getComponent(cc.Label).string=HerosDetails.getHeroName(heroType,lanType);
        var skillName = textRoot.getChildByName('skillName');
        //skillName.getComponent(cc.Label).string=lm.getString(LanguageIndex.Active_Skill)+':'+HerosDetails.getSkillName(heroType,lanType);
        var skillDes = textRoot.getChildByName('skillDes');
        //skillDes.getComponent(cc.Label).string=HerosDetails.getHeroSkillDetail(heroType,lanType);
        //        
    };
    SkillInfoUi.prototype.onTouchStart = function () {
        this.node.removeFromParent();
    };
    SkillInfoUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SkillInfoUi.prototype, "sp_avatar", void 0);
    SkillInfoUi = __decorate([
        ccclass
    ], SkillInfoUi);
    return SkillInfoUi;
}(cc.Component));
exports.default = SkillInfoUi;

cc._RF.pop();