"use strict";
cc._RF.push(module, '353d6bkDidJz5zE1/iObsEM', 'ExclusiveWeaponsUi');
// Scripts/Hero/Ui/ExclusiveWeaponsUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var ExclusiveEquipItem_1 = require("../../Equipment/Ui/ExclusiveEquipItem");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var ExclusiveWeaponMessage_1 = require("../../JsonData/ExclusiveWeaponMessage");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var ExclusiveWeaponsStrengtheningUi_1 = require("./ExclusiveWeaponsStrengtheningUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExclusiveWeaponsUi = /** @class */ (function (_super) {
    __extends(ExclusiveWeaponsUi, _super);
    function ExclusiveWeaponsUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.exclusive_weapon_ui = null;
        return _this;
    }
    ExclusiveWeaponsUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    ExclusiveWeaponsUi.prototype.initData = function (heroType) {
        this.hero_type = heroType;
        this.refreshUi();
    };
    ExclusiveWeaponsUi.prototype.refreshUi = function () {
        var heroInfo = HeroManager_1.HeroManager.getInstance().getHeroInfo(this.hero_type);
        var weaponData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type, heroInfo.exclusive_equip_stage);
        var weaponMessage = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        this.node.getChildByName("equipName").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("heroDes").getComponent(TextLanguage_1.default).setTextId(weaponMessage.HeroExclusive);
        this.node.getChildByName("ATK").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(weaponData.Attack * HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type), 2);
        this.node.getChildByName("Hp").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(weaponData.Health * 100, 2) + "%";
        this.node.getChildByName("defence").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(weaponData.Defense * 100, 2) + "%";
        this.node.getChildByName("atk").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(weaponData.Attack * 100, 2) + "%";
        this.node.getChildByName("crit").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(weaponData.Hit, 2);
        this.node.getChildByName("exclusiveEquipItem").getComponent(ExclusiveEquipItem_1.default).init(this.hero_type);
        this.node.getChildByName("skillName").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponSkillID);
        this.node.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Skill_" + this.hero_type);
        this.node.getChildByName("skillDes").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponSkillDescription);
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var text1 = content.getChildByName("levelDes1");
        var text2 = content.getChildByName("levelDes2");
        var text3 = content.getChildByName("levelDes3");
        text1.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        text2.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        text3.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
        if (heroInfo.exclusive_equip_stage >= 10) {
            text1.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1");
            text1.color = cc.color(137, 233, 237);
            text1.addComponent(cc.LabelOutline).color = cc.color(32, 36, 55);
            text1.getComponent(cc.LabelOutline).width = 2;
        }
        if (heroInfo.exclusive_equip_stage >= 20) {
            text2.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1");
            text2.color = cc.color(137, 233, 237);
            text2.addComponent(cc.LabelOutline).color = cc.color(32, 36, 55);
            text2.getComponent(cc.LabelOutline).width = 2;
        }
        if (heroInfo.exclusive_equip_stage >= 30) {
            text3.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1");
            text3.color = cc.color(137, 233, 237);
            text3.addComponent(cc.LabelOutline).color = cc.color(32, 36, 55);
            text3.getComponent(cc.LabelOutline).width = 2;
        }
    };
    ExclusiveWeaponsUi.prototype.onClickBtnStrengthening = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsStrengtheningUi({
        //     onClose:()=>{
        //         this.refreshUi();
        //     }
        // },this.hero_type,false);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ExclusiveStrengthening, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(ExclusiveWeaponsStrengtheningUi_1.default).init({
                    onClose: function () {
                        _this.refreshUi();
                    }
                });
                uiNode.getComponent(ExclusiveWeaponsStrengtheningUi_1.default).initData(_this.hero_type, false);
            }, });
    };
    ExclusiveWeaponsUi.prototype.onClickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ExclusiveWeaponsUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], ExclusiveWeaponsUi.prototype, "exclusive_weapon_ui", void 0);
    ExclusiveWeaponsUi = __decorate([
        ccclass
    ], ExclusiveWeaponsUi);
    return ExclusiveWeaponsUi;
}(UIComponent_1.default));
exports.default = ExclusiveWeaponsUi;

cc._RF.pop();