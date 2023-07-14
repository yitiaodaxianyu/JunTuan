"use strict";
cc._RF.push(module, 'bfe8c8jEfFCt7VVbKrlPqG1', 'SkillTip');
// Scripts/Hero/Game/SkillTip.ts

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
var SkillManager_1 = require("../../Game/SkillManager");
var HeroConfig_1 = require("./HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillTip = /** @class */ (function (_super) {
    __extends(SkillTip, _super);
    function SkillTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_tip = [];
        _this.skill_tip_type = HeroConfig_1.SkillTipType.Full;
        _this.self_sp = null;
        return _this;
    }
    SkillTip.prototype.onLoad = function () {
        this.self_sp = this.node.getComponent(cc.Sprite);
    };
    SkillTip.prototype.setIsCanRelease = function (isCan) {
        if (this.self_sp) {
            this.self_sp.spriteFrame = this.sp_tip[isCan ? 1 : 0];
        }
        SkillManager_1.default.getInstance().setSkillRange(isCan);
    };
    SkillTip.prototype.getSkillTipType = function () {
        return this.skill_tip_type;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SkillTip.prototype, "sp_tip", void 0);
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.SkillTipType) })
    ], SkillTip.prototype, "skill_tip_type", void 0);
    SkillTip = __decorate([
        ccclass
    ], SkillTip);
    return SkillTip;
}(cc.Component));
exports.default = SkillTip;

cc._RF.pop();