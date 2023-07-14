"use strict";
cc._RF.push(module, '40e49nas1NKeJTOBNrmYG2d', 'MpProgress');
// Scripts/Hero/Game/MpProgress.ts

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
var HeroManager_1 = require("../Data/HeroManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MpProgress = /** @class */ (function (_super) {
    __extends(MpProgress, _super);
    function MpProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_icon_bg = [];
        _this.prefab_bg = null;
        _this.ok_node = null;
        _this.left = null;
        _this.right = null;
        _this.is_cding = false;
        _this.icon = null;
        _this.icon_bg = null;
        /**禁止图标 */
        _this.disable = null;
        _this.is_disable = false;
        /**材质 */
        _this.materials = [];
        return _this;
    }
    MpProgress.prototype.init = function (heroId) {
        this.ok_node = this.node.getChildByName('ok');
        this.left = this.node.getChildByName('left').getComponent(cc.Sprite);
        this.right = this.node.getChildByName('right').getComponent(cc.Sprite);
        var iconBg = cc.instantiate(this.prefab_bg);
        iconBg.x = this.node.x;
        iconBg.y = this.node.y - 36;
        SkillManager_1.default.getInstance().node.getChildByName('skill_icon').addChild(iconBg);
        this.icon_bg = iconBg.getComponent(cc.Sprite);
        //icon
        this.icon = iconBg.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite);
        this.icon.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames('Hero_' + heroId + '_Skill_0');
        this.disable = this.icon.node.parent.getChildByName('disable');
        this.disable.active = false;
        this.setNormalSP();
        this.materials.push(cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.materials.push(cc.Material.getBuiltinMaterial('2d-sprite'));
        //this.prefab_bg=null;
    };
    // showLight(){
    // }
    MpProgress.prototype.setCDSP = function () {
        this.ok_node.active = false;
        this.is_cding = true;
        this.icon.setMaterial(0, this.materials[0]);
        this.icon_bg.spriteFrame = this.sp_icon_bg[0];
    };
    MpProgress.prototype.setNormalSP = function () {
        this.ok_node.active = true;
        this.is_cding = false;
        if (this.is_disable == false) {
            this.icon.setMaterial(0, this.materials[1]);
            this.icon_bg.spriteFrame = this.sp_icon_bg[1];
        }
    };
    MpProgress.prototype.setDisable = function (isDisable) {
        this.disable.active = isDisable;
        this.is_disable = isDisable;
        if (isDisable) {
            this.icon.setMaterial(0, this.materials[0]);
            this.icon_bg.spriteFrame = this.sp_icon_bg[0];
        }
        else {
            if (this.is_cding == false) {
                this.icon.setMaterial(0, this.materials[1]);
                this.icon_bg.spriteFrame = this.sp_icon_bg[1];
            }
        }
    };
    MpProgress.prototype.setProgress = function (progress) {
        this.left.fillRange = progress / 2;
        this.right.fillRange = progress / 2;
    };
    MpProgress.prototype.show = function () {
        this.icon_bg.node.active = true;
        this.node.opacity = 255;
    };
    MpProgress.prototype.hide = function () {
        this.icon_bg.node.active = false;
        this.node.opacity = 0;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], MpProgress.prototype, "sp_icon_bg", void 0);
    __decorate([
        property(cc.Prefab)
    ], MpProgress.prototype, "prefab_bg", void 0);
    MpProgress = __decorate([
        ccclass
    ], MpProgress);
    return MpProgress;
}(cc.Component));
exports.default = MpProgress;

cc._RF.pop();