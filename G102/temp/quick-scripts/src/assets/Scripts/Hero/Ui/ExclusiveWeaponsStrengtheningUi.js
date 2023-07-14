"use strict";
cc._RF.push(module, '7a898eqhFpLkp8t++2z9rQF', 'ExclusiveWeaponsStrengtheningUi');
// Scripts/Hero/Ui/ExclusiveWeaponsStrengtheningUi.ts

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
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../Data/HeroManager");
var HeroConfig_1 = require("../Game/HeroConfig");
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var ExclusiveWeaponMessage_1 = require("../../JsonData/ExclusiveWeaponMessage");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExclusiveWeaponsStrengtheningUi = /** @class */ (function (_super) {
    __extends(ExclusiveWeaponsStrengtheningUi, _super);
    function ExclusiveWeaponsStrengtheningUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.is_activation = false;
        _this.exclusive_weapons_strengthening_ui = null;
        return _this;
    }
    ExclusiveWeaponsStrengtheningUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        var canvas = cc.find("Canvas");
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
    };
    ExclusiveWeaponsStrengtheningUi.prototype.initData = function (heroType, isActiVation) {
        if (isActiVation === void 0) { isActiVation = false; }
        this.hero_type = heroType;
        this.is_activation = isActiVation;
        this.refreshUi();
    };
    ExclusiveWeaponsStrengtheningUi.prototype.refreshUi = function () {
        if (this.is_activation) {
            this.refreshActivationUi();
        }
        else {
            this.refreshStrengtheningUi();
        }
    };
    ExclusiveWeaponsStrengtheningUi.prototype.refreshActivationUi = function () {
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        var data = HeroManager_1.HeroManager.getInstance().checkExclusive(this.hero_type);
        // if(weaponData == null){
        //     weaponData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroData.exclusive_equip_level);
        // }
        var weaponMessage = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        top.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_" + this.hero_type);
        bottom.getChildByName("Exclusive_Stone_Bg_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Stone_Bg_" + Item_1.ItemManager.getInstance().getQuality(data.cost_prop_id));
        bottom.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_" + data.cost_prop_id);
        bottom.getChildByName("itemNum").getComponent(cc.Label).string = data.cur_prop_num + "/" + data.cost_prop_num;
        if (!data.is_can_up) {
            bottom.getChildByName("itemNum").color = cc.Color.RED;
        }
        bottom.getChildByName("strengthening").active = false;
        var unlock = bottom.getChildByName("unlock");
        unlock.active = true;
        unlock.getChildByName("sikllIcon").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Skill_" + this.hero_type);
        unlock.getChildByName("skillName").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponSkillID);
        unlock.getChildByName("skillDes").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponSkillDescription);
        var content = unlock.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var text1 = content.getChildByName("levelDes1");
        var text2 = content.getChildByName("levelDes2");
        var text3 = content.getChildByName("levelDes3");
        text1.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        text2.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        text3.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
    };
    ExclusiveWeaponsStrengtheningUi.prototype.refreshStrengtheningUi = function () {
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        var heroInfo = HeroManager_1.HeroManager.getInstance().getHeroInfo(this.hero_type);
        bottom.getChildByName("unlock").active = false;
        var strengthening = bottom.getChildByName("strengthening");
        var notOver = strengthening.getChildByName("notOver");
        var over = strengthening.getChildByName("over");
        if (heroInfo.exclusive_equip_stage >= 30) {
            HeroManager_1.HeroManager.getInstance().setExclusiveEquipLevel(this.hero_type, 30);
            strengthening.getComponentInChildren(cc.Button).interactable = false;
            strengthening.getComponentInChildren(cc.Button).node.getComponentInChildren(TextLanguage_1.default).setTextId(120010);
            strengthening.getChildByName("over").active = true;
            notOver.active = false;
            var weaponNowData_1 = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type, heroInfo.exclusive_equip_stage);
            over.getChildByName("cur1").getComponent(cc.Label).string = "+" + heroInfo.exclusive_equip_stage;
            over.getChildByName("cur2").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.Health * 100, 2) + "%";
            over.getChildByName("cur3").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.Attack * 100, 2) + "%";
            over.getChildByName("cur4").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.Defense * 100, 2) + "%";
            switch (weaponNowData_1.AuxiliaryAttributeReading) {
                case 1:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110019);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData_1.Critical;
                    break;
                case 2:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110017);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData_1.Hit;
                    break;
                case 3:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110018);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.Miss * 100, 2) + "%";
                    break;
                case 4:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110020);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.ExtraCritical * 100, 2) + "%";
                    break;
                case 5:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110021);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.AntiCritical * 100, 2);
                    break;
                case 6:
                    strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110022);
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData_1.AntiExtraCritical * 100, 2) + "%";
                    break;
            }
            bottom.getChildByName("Exclusive_Stone_Bg_1").active = false;
            bottom.getChildByName("costIcon").active = false;
            bottom.getChildByName("Exclusive_Stone_Bg_0").active = false;
            bottom.getChildByName("itemNum").active = false;
            this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_" + this.hero_type);
            return;
        }
        var weaponNowData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type, heroInfo.exclusive_equip_stage);
        var weaponNextData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type, heroInfo.exclusive_equip_stage + 1);
        var weaponMessage = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        top.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_" + this.hero_type);
        bottom.getChildByName("Exclusive_Stone_Bg_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Stone_Bg_" + Item_1.ItemManager.getInstance().getQuality(weaponNowData.SpendPropID));
        bottom.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_" + weaponNowData.SpendPropID);
        bottom.getChildByName("itemNum").getComponent(cc.Label).string = PropManager_1.PropManager.getInstance().getPropNum(weaponNowData.SpendPropID) + "/" + weaponNowData.SpendPropNum;
        strengthening.active = true;
        over.active = false;
        notOver.active = true;
        notOver.getChildByName("cur1").getComponent(cc.Label).string = "+" + heroInfo.exclusive_equip_stage;
        notOver.getChildByName("cur2").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.Health * 100, 2) + "%";
        notOver.getChildByName("cur3").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.Attack * 100, 2) + "%";
        notOver.getChildByName("cur4").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.Defense * 100, 2) + "%";
        // console.log("typeof:" + typeof(weaponNowData.AuxiliaryAttributeReading),weaponNowData.AuxiliaryAttributeReading);
        notOver.getChildByName("next1").getComponent(cc.Label).string = "+" + (heroInfo.exclusive_equip_stage + 1);
        notOver.getChildByName("next2").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.Health * 100, 2) + "%";
        notOver.getChildByName("next3").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.Attack * 100, 2) + "%";
        notOver.getChildByName("next4").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.Defense * 100, 2) + "%";
        switch (weaponNowData.AuxiliaryAttributeReading) {
            case 1:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110019);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Critical;
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + weaponNextData.Critical;
                break;
            case 2:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110017);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Hit;
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + weaponNextData.Hit;
                break;
            case 3:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110018);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.Miss * 100, 2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.Miss * 100, 2);
                break;
            case 4:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110020);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.ExtraCritical * 100, 2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.ExtraCritical * 100, 2);
                break;
            case 5:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110021);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.AntiCritical * 100, 2);
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.AntiCritical * 100, 2);
                break;
            case 6:
                strengthening.getChildByName("label5").getComponent(TextLanguage_1.default).setTextId(110022);
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNowData.AntiExtraCritical * 100, 2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(weaponNextData.AntiExtraCritical * 100, 2);
                break;
        }
        if (heroInfo.exclusive_equip_stage < 10) {
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage_1.default).setReplaceValue("~", "10");
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        }
        else if (heroInfo.exclusive_equip_stage < 20) {
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage_1.default).setReplaceValue("~", "20");
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        }
        else if (heroInfo.exclusive_equip_stage < 30) {
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage_1.default).setReplaceValue("~", "30");
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
        }
        else {
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage_1.default).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
        }
    };
    ExclusiveWeaponsStrengtheningUi.prototype.onClickActivationBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        HeroManager_1.HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
        this.is_activation = false;
        // cc.sys.localStorage.setItem("ExclusiveWeaponLevel_" + this.hero_type,0);
        this.refreshUi();
    };
    ExclusiveWeaponsStrengtheningUi.prototype.onClickStrengtheningBtn = function () {
        // console.log("点击响应")
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var data = HeroManager_1.HeroManager.getInstance().checkExclusive(this.hero_type);
        if (data.is_can_up) {
            // console.log("强化成功")
            PropManager_1.PropManager.getInstance().changePropNum(data.cost_prop_id, -data.cost_prop_num);
            HeroManager_1.HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
            // cc.sys.localStorage.setItem("ExclusiveWeaponLevel_" + this.hero_type,HeroManager.getInstance().getHeroData(this.hero_type).exclusive_equip_level);
            this.refreshUi();
        }
    };
    ExclusiveWeaponsStrengtheningUi.prototype.onClickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ExclusiveWeaponsStrengtheningUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], ExclusiveWeaponsStrengtheningUi.prototype, "exclusive_weapons_strengthening_ui", void 0);
    ExclusiveWeaponsStrengtheningUi = __decorate([
        ccclass
    ], ExclusiveWeaponsStrengtheningUi);
    return ExclusiveWeaponsStrengtheningUi;
}(UIComponent_1.default));
exports.default = ExclusiveWeaponsStrengtheningUi;

cc._RF.pop();