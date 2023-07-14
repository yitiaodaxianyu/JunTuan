"use strict";
cc._RF.push(module, '413e4l/p1pAIoZ8NJU0CELl', 'ExclusiveInfoUi');
// Scripts/ExclusiveInfoUi/ExclusiveInfoUi.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var HeroBaseInfo_1 = require("../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var EWUnlockCost_1 = require("../JsonData/EWUnlockCost");
var ExclusiveEnhancement_1 = require("../JsonData/ExclusiveEnhancement");
var ExclusiveWeaponMessage_1 = require("../JsonData/ExclusiveWeaponMessage");
var ExclusiveWeaponSkill_1 = require("../JsonData/ExclusiveWeaponSkill");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PetItem_1 = require("../Pet/Ui/PetItem");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var TaskEnum_1 = require("../Task/TaskEnum");
var TaskManager_1 = require("../Task/TaskManager");
var MyTool_1 = require("../Tools/MyTool");
var GetAssetsUi_1 = require("../UI/GetAssetsUi");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExclusiveInfoUi = /** @class */ (function (_super) {
    __extends(ExclusiveInfoUi, _super);
    function ExclusiveInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.replace = ['~a', '~b', '~c', '~d'];
        _this.replaces = ['~z', '~y', '~x', '~w'];
        return _this;
    }
    ExclusiveInfoUi.prototype.initData = function (heroType) {
        this.hero_type = heroType;
        this.refreshUi();
    };
    ExclusiveInfoUi.prototype.refreshUi = function () {
        var heroInfo = HeroManager_1.HeroManager.getInstance().getHeroInfo(this.hero_type);
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        var ewShowData = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        var ewJsonData;
        var ewData;
        var back = this.node.getChildByName("back");
        var curRoot = back.getChildByName('curRoot');
        var content = back.getChildByName("content");
        var skillInfo;
        var cost = back.getChildByName("cost").children[0];
        var btns = back.getChildByName("btns");
        var progress = back.getChildByName("progress");
        // 预览处理
        if (heroInfo.exclusive_equip_stage == 0) {
            ewJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, ewShowData.MaxStage);
            ewData = HeroManager_1.HeroManager.getInstance().getExclusiveWeaponData(this.hero_type, ewShowData.MaxStage);
            skillInfo = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, ewJsonData.Star + 1);
            curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(HeroManager_1.HeroManager.getInstance().getExclusiveWeaponCombbat(this.hero_type, ewShowData.MaxStage));
            btns.children[0].active = true;
            btns.children[1].active = false;
            progress.active = false;
            cost.children[0].getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_" + heroBaseInfo.ExclusiveWeaponFragment);
            var needNum = EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
            var haveNum = PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
            cost.children[1].getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(haveNum);
            cost.children[2].getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(needNum);
            if (haveNum < needNum) {
                cost.children[1].color = cc.color(254, 76, 76);
            }
            else {
                cost.children[1].color = cc.color(222, 199, 166);
            }
        }
        else {
            ewJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, heroInfo.exclusive_equip_stage);
            ewData = HeroManager_1.HeroManager.getInstance().getExclusiveWeaponData(this.hero_type, heroInfo.exclusive_equip_stage);
            skillInfo = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, ewJsonData.Star + 1);
            curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(HeroManager_1.HeroManager.getInstance().getExclusiveWeaponCombbat(this.hero_type, heroInfo.exclusive_equip_stage));
            btns.children[0].active = false;
            btns.children[1].active = true;
            progress.active = true;
            if (heroInfo.exclusive_equip_stage != ewShowData.MaxStage) {
                cost.children[0].getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_" + heroBaseInfo.ExclusiveWeaponFragment);
                var needNum = EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
                var haveNum = PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
                cost.children[1].getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(haveNum);
                cost.children[2].getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(needNum);
                if (haveNum < needNum) {
                    cost.children[1].color = cc.color(254, 76, 76);
                }
                else {
                    cost.children[1].color = cc.color(222, 199, 166);
                }
            }
        }
        var itemInfo = Item_1.ItemManager.getInstance().getJsonItem(heroBaseInfo.FirstExclusiveWeaponID + ewJsonData.Star);
        // 满级处理
        if (heroInfo.exclusive_equip_stage == ewShowData.MaxStage) {
            btns.active = false;
            cost.active = false;
            progress.active = false;
        }
        else {
            btns.active = true;
            cost.active = true;
            // progress.active = true;
        }
        // 头部
        curRoot.getChildByName("propRoot").children[0].getComponent(PetItem_1.default).init(this.hero_type, itemInfo.ItemID, PropConfig_1.PropAction.Null);
        var propName = curRoot.getChildByName("propName");
        propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(itemInfo.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(itemInfo.Quality);
        // 内容
        var ATK = content.getChildByName("AKT");
        ATK.children[2].getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(ewJsonData.Attack * 100, 2) + "%(" + MyTool_1.default.numberFormat(ewData.total_attack, 2) + ")";
        var HP = content.getChildByName("HP");
        HP.children[2].getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(ewJsonData.Health * 100, 2) + "%(" + MyTool_1.default.numberFormat(ewData.total_hp, 2) + ")";
        var Defence = content.getChildByName("Defence");
        Defence.children[2].getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(ewJsonData.Defense * 100, 2) + "%(" + MyTool_1.default.numberFormat(ewData.total_defense, 2) + ")";
        var skillIcon = content.getChildByName("skillIcon");
        skillIcon.children[0].getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Item_" + heroBaseInfo.FirstExclusiveWeaponID + "_Skill");
        skillIcon.children[1].children[0].getComponent(TextLanguage_1.default).setTextId(ewShowData.ExclusiveWeaponSkillID);
        skillIcon.children[1].children[1].getComponent(cc.Label).string = "(Lv." + (ewJsonData.Star + 1) + ")";
        var contentStr = LanguageManager_1.default.getInstance().getStrByTextId(ewShowData.ExclusiveWeaponSkillDescription);
        contentStr = contentStr.replace(this.replace[0], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1, 2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1, 2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1, 2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1, 2) + '');
        contentStr = contentStr.replace(this.replaces[0], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool_1.default.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100, 2) + '');
        content.getChildByName("skillDescription").getComponent(cc.RichText).string = contentStr;
        // 尾部处理 尾部和解锁未解锁有关，所以尾部处理放在了前面
        for (var i = 0; i < 5; i++) {
            if (ewJsonData.CurrentStage > i) {
                progress.getChildByName("circle" + i).active = true;
            }
            else {
                progress.getChildByName("circle" + i).active = false;
            }
            if (i < 4)
                if (ewJsonData.CurrentStage > i + 1) {
                    progress.getChildByName("bar" + i).active = true;
                }
                else {
                    progress.getChildByName("bar" + i).active = false;
                }
        }
        var masterKeynum = 0;
        switch (heroBaseInfo.Quality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }
        if (masterKeynum < 1) {
            btns.getChildByName("btnReplace").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            btns.getChildByName("btnReplace").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            btns.getChildByName("btnReplace").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            btns.getChildByName("btnReplace").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        var red = btns.getChildByName("redUp");
        red.active = HeroManager_1.HeroManager.getInstance().checkExUp(this.hero_type);
    };
    ExclusiveInfoUi.prototype.onBtnUnlockClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        var costNum = EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality);
        if (PropManager_1.PropManager.getInstance().changePropNum(heroBaseInfo.ExclusiveWeaponFragment, -costNum)) {
            HeroManager_1.HeroManager.getInstance().setExclusiveEquipLevel(this.hero_type, 1);
            this.refreshUi();
        }
        else {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GetAssetsTip, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                    uiNode.getComponent(GetAssetsUi_1.default).initData(GetAssetsUi_1.GetAssetsType.PetAndEquip);
                } });
        }
    };
    ExclusiveInfoUi.prototype.onMasterKeyBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var textId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                textId = 1200017;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                textId = 1200018;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                textId = 1200019;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                textId = 1200020;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                textId = 1200021;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                textId = 1200022;
                break;
        }
        if (masterKeynum < 1) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(textId));
            return;
        }
        this.showExchangeUi();
    };
    ExclusiveInfoUi.prototype.showExchangeUi = function () {
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        var exchange = this.node.getChildByName("exchange");
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroBaseInfo.Quality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS;
                break;
        }
        var p1 = PropManager_1.PropManager.getInstance().createPropItem(keyId, 0);
        var p2 = PropManager_1.PropManager.getInstance().createPropItem(heroBaseInfo.ExclusiveWeaponFragment, 0);
        exchange.active = true;
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);
    };
    ExclusiveInfoUi.prototype.sliderMoveResponce = function (slider) {
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    ExclusiveInfoUi.prototype.onExChangeBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                keyId = PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS;
                break;
        }
        var num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if (num == 0)
            return;
        PropManager_1.PropManager.getInstance().changePropNum(keyId, -num);
        PropManager_1.PropManager.getInstance().changePropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getExclusiveWeaponFragment(this.hero_type), num);
        var item = PropManager_1.PropManager.getInstance().createPropItem(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getExclusiveWeaponFragment(this.hero_type), num);
        GameManager_1.default.getInstance().showGetTip(item);
        this.refreshUi();
    };
    ExclusiveInfoUi.prototype.onChangeExchangeBtnClick = function (e, num) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        num = Number(num);
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }
        var slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress = ((slider.progress * masterKeynum) + (1 * num)) / masterKeynum;
        if (slider.progress > 1)
            slider.progress = 1;
        if (slider.progress < 0)
            slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    ExclusiveInfoUi.prototype.onCloseExchange = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
    };
    ExclusiveInfoUi.prototype.onBtnUpgradeClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        var costNum = EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality);
        if (PropManager_1.PropManager.getInstance().changePropNum(heroBaseInfo.ExclusiveWeaponFragment, -costNum)) {
            HeroManager_1.HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级1次专武);
            var newJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, HeroManager_1.HeroManager.getInstance().getExclusiveEquipLevel(this.hero_type));
            if (newJsonData.CurrentStage == 0) {
                this.showUpTip(newJsonData.SumStage);
            }
            this.refreshUi();
        }
        else {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GetAssetsTip, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                    uiNode.getComponent(GetAssetsUi_1.default).initData(GetAssetsUi_1.GetAssetsType.PetAndEquip);
                } });
        }
    };
    ExclusiveInfoUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ExclusiveInfoUi.prototype.showUpTip = function (sumStage) {
        var upTip = this.node.getChildByName("upStarTip");
        var oldJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, sumStage - 1);
        var newJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, sumStage);
        var oldData = HeroManager_1.HeroManager.getInstance().getExclusiveWeaponData(this.hero_type, sumStage - 1);
        var newData = HeroManager_1.HeroManager.getInstance().getExclusiveWeaponData(this.hero_type, sumStage);
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        upTip.active = true;
        if (oldJsonData.Star == 0) {
            upTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = null;
        }
        else {
            upTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Hero_Star_" + oldJsonData.Star);
        }
        upTip.getChildByName("oldSkillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Item_" + heroBaseInfo.FirstExclusiveWeaponID + "_Skill");
        upTip.getChildByName("oldSkillLevel").getComponent(cc.Label).string = "Lv." + (oldJsonData.Star + 1);
        upTip.getChildByName("oldHpNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(oldJsonData.Attack * 100, 2) + "%(" + MyTool_1.default.numberFormat(oldData.total_attack, 2) + ")";
        upTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(oldJsonData.Health * 100, 2) + "%(" + MyTool_1.default.numberFormat(oldData.total_hp, 2) + ")";
        upTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(oldJsonData.Defense * 100, 2) + "%(" + MyTool_1.default.numberFormat(oldData.total_defense, 2) + ")";
        upTip.getChildByName("star").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Hero_Star_" + newJsonData.Star);
        upTip.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Item_" + heroBaseInfo.FirstExclusiveWeaponID + "_Skill");
        upTip.getChildByName("skillLevel").getComponent(cc.Label).string = "Lv." + (newJsonData.Star + 1);
        upTip.getChildByName("hpNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(newJsonData.Attack * 100, 2) + "%(" + MyTool_1.default.numberFormat(newData.total_attack, 2) + ")";
        upTip.getChildByName("atkNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(newJsonData.Health * 100, 2) + "%(" + MyTool_1.default.numberFormat(newData.total_hp, 2) + ")";
        upTip.getChildByName("defanceNum").getComponent(cc.Label).string = "+" + MyTool_1.default.numberFormat(newJsonData.Defense * 100, 2) + "%(" + MyTool_1.default.numberFormat(newData.total_defense, 2) + ")";
    };
    ExclusiveInfoUi.prototype.closeUpTip = function () {
        var upTip = this.node.getChildByName("upStarTip");
        upTip.active = false;
    };
    ExclusiveInfoUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    ExclusiveInfoUi = __decorate([
        ccclass
    ], ExclusiveInfoUi);
    return ExclusiveInfoUi;
}(UIComponent_1.default));
exports.default = ExclusiveInfoUi;

cc._RF.pop();