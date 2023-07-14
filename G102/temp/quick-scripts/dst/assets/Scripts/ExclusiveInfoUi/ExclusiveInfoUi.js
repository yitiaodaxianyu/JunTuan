
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ExclusiveInfoUi/ExclusiveInfoUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXhjbHVzaXZlSW5mb1VpXFxFeGNsdXNpdmVJbmZvVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6QywwREFBZ0U7QUFFaEUsd0RBQXVEO0FBQ3ZELHNEQUFvRDtBQUNwRCx5REFBK0Q7QUFDL0QseUVBQXlHO0FBQ3pHLDZFQUFtRjtBQUNuRix5RUFBeUc7QUFDekcsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCw2Q0FBd0M7QUFDeEMsMENBQWdEO0FBQ2hELGlEQUF3RDtBQUN4RCxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELDZDQUE0QztBQUM1QyxtREFBOEM7QUFFOUMsMENBQXFDO0FBQ3JDLGlEQUErRDtBQUMvRCxpREFBNEM7QUFDNUMsMkNBQXNEO0FBQ3RELDZDQUE0QztBQUV0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBVztJQUF4RDtRQUFBLHFFQTBjQztRQXhjRyxlQUFTLEdBQWEsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFFckMsYUFBTyxHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0IsY0FBUSxHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7O0lBcWNwQyxDQUFDO0lBbGNHLGtDQUFRLEdBQVIsVUFBUyxRQUFrQjtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDSSxJQUFJLFFBQVEsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FB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SyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUksZ0JBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFdEssSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsT0FBTyxHQUFFLFlBQVksQ0FBQyxzQkFBc0IsR0FBRSxRQUFRLENBQUMsQ0FBQztRQUNwSyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVyRyxJQUFJLFVBQVUsR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUMxRyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwSCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwSCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwSCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUVwSCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6SCxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsR0FBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0gsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVB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RyxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFJLGdCQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzdLLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLGdCQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBSSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzTCxDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBRUksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBeGNnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBMGNuQztJQUFELHNCQUFDO0NBMWNELEFBMGNDLENBMWM0QyxxQkFBVyxHQTBjdkQ7a0JBMWNvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9EYXRhIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVXVW5sb2NrQ29zdE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvRVdVbmxvY2tDb3N0XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciwgSnNvbkV4Y2x1c2l2ZUVuaGFuY2VtZW50IH0gZnJvbSBcIi4uL0pzb25EYXRhL0V4Y2x1c2l2ZUVuaGFuY2VtZW50XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLCBKc29uRXhjbHVzaXZlV2VhcG9uU2tpbGwgfSBmcm9tIFwiLi4vSnNvbkRhdGEvRXhjbHVzaXZlV2VhcG9uU2tpbGxcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IFBldEl0ZW0gZnJvbSBcIi4uL1BldC9VaS9QZXRJdGVtXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBHZXRBc3NldHNVaSwgeyBHZXRBc3NldHNUeXBlIH0gZnJvbSBcIi4uL1VJL0dldEFzc2V0c1VpXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGNsdXNpdmVJbmZvVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZSA9IEhlcm9fVHlwZS5OVUxMO1xyXG5cclxuICAgIHJlcGxhY2UgPSBbJ35hJywnfmInLCd+YycsJ35kJ11cclxuICAgIHJlcGxhY2VzID0gWyd+eicsJ355JywnfngnLCd+dyddXHJcblxyXG5cclxuICAgIGluaXREYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGUgPSBoZXJvVHlwZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpe1xyXG4gICAgICAgIGxldCBoZXJvSW5mbyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGV3U2hvd0RhdGEgPSBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25NZXNzYWdlKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgZXdKc29uRGF0YTpKc29uRXhjbHVzaXZlRW5oYW5jZW1lbnQ7XHJcbiAgICAgICAgbGV0IGV3RGF0YTpIZXJvRGF0YTtcclxuICAgICAgICBsZXQgYmFjayA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhY2tcIik7XHJcbiAgICAgICAgbGV0IGN1clJvb3QgPSBiYWNrLmdldENoaWxkQnlOYW1lKCdjdXJSb290Jyk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBiYWNrLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICBsZXQgc2tpbGxJbmZvOkpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbDtcclxuICAgICAgICBsZXQgY29zdCA9IGJhY2suZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0XCIpLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIGxldCBidG5zID0gYmFjay5nZXRDaGlsZEJ5TmFtZShcImJ0bnNcIik7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gYmFjay5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzXCIpO1xyXG4gICAgICAgIC8vIOmihOiniOWkhOeQhlxyXG4gICAgICAgIGlmKGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9PSAwKXtcclxuICAgICAgICAgICAgZXdKc29uRGF0YSA9IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGV3U2hvd0RhdGEuTWF4U3RhZ2UpO1xyXG4gICAgICAgICAgICBld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZVdlYXBvbkRhdGEodGhpcy5oZXJvX3R5cGUsZXdTaG93RGF0YS5NYXhTdGFnZSk7XHJcbiAgICAgICAgICAgIHNraWxsSW5mbyA9IEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGV3SnNvbkRhdGEuU3RhcisxKTtcclxuICAgICAgICAgICAgY3VyUm9vdC5nZXRDaGlsZEJ5TmFtZShcInpoYW5saU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXhjbHVzaXZlV2VhcG9uQ29tYmJhdCh0aGlzLmhlcm9fdHlwZSxld1Nob3dEYXRhLk1heFN0YWdlKSk7XHJcbiAgICAgICAgICAgIGJ0bnMuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnRucy5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvc3QuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9cIitoZXJvQmFzZUluZm8uRXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQpO1xyXG4gICAgICAgICAgICBsZXQgbmVlZE51bSA9IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0luZm8uaGVyb19xdWFsaXR5KTtcclxuICAgICAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KTtcclxuICAgICAgICAgICAgY29zdC5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKGhhdmVOdW0pO1xyXG4gICAgICAgICAgICBjb3N0LmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIvXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShuZWVkTnVtKTtcclxuICAgICAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICAgICAgY29zdC5jaGlsZHJlblsxXS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29zdC5jaGlsZHJlblsxXS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBld0pzb25EYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlKTtcclxuICAgICAgICAgICAgZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeGNsdXNpdmVXZWFwb25EYXRhKHRoaXMuaGVyb190eXBlLGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSk7XHJcbiAgICAgICAgICAgIHNraWxsSW5mbyA9IEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGV3SnNvbkRhdGEuU3RhcisxKTtcclxuICAgICAgICAgICAgY3VyUm9vdC5nZXRDaGlsZEJ5TmFtZShcInpoYW5saU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXhjbHVzaXZlV2VhcG9uQ29tYmJhdCh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UpKTtcclxuICAgICAgICAgICAgYnRucy5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnRucy5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgIT0gZXdTaG93RGF0YS5NYXhTdGFnZSl7XHJcbiAgICAgICAgICAgICAgICBjb3N0LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fXCIraGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KTtcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkTnVtID0gRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RGcmFnbWVudChoZXJvSW5mby5oZXJvX3F1YWxpdHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KTtcclxuICAgICAgICAgICAgICAgIGNvc3QuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShoYXZlTnVtKTtcclxuICAgICAgICAgICAgICAgIGNvc3QuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKG5lZWROdW0pO1xyXG4gICAgICAgICAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvc3QuY2hpbGRyZW5bMV0uY29sb3IgPSBjYy5jb2xvcigyNTQsNzYsNzYpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29zdC5jaGlsZHJlblsxXS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXRlbUluZm8gPSBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKGhlcm9CYXNlSW5mby5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklEICsgZXdKc29uRGF0YS5TdGFyKTtcclxuICAgICAgICAvLyDmu6HnuqflpITnkIZcclxuICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPT0gZXdTaG93RGF0YS5NYXhTdGFnZSl7XHJcbiAgICAgICAgICAgIGJ0bnMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvc3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bnMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29zdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBwcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpLTpg6hcclxuICAgICAgICBjdXJSb290LmdldENoaWxkQnlOYW1lKFwicHJvcFJvb3RcIikuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsaXRlbUluZm8uSXRlbUlELFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgbGV0IHByb3BOYW1lID0gY3VyUm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb3BOYW1lXCIpO1xyXG4gICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiW1wiK1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcFF1YWxpdHlOYW1lKGl0ZW1JbmZvLlF1YWxpdHkpK1wiXVwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGl0ZW1JbmZvLk5hbWVUZXh0SWQpO1xyXG4gICAgICAgIHByb3BOYW1lLmNvbG9yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcFF1YWxpdHlUZXh0Q29sb3IoaXRlbUluZm8uUXVhbGl0eSk7XHJcbiAgICAgICAgLy8g5YaF5a65XHJcbiAgICAgICAgbGV0IEFUSyA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJBS1RcIik7XHJcbiAgICAgICAgQVRLLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNeVRvb2wubnVtYmVyRm9ybWF0KGV3SnNvbkRhdGEuQXR0YWNrICogMTAwLDIpICsgXCIlKFwiICsgTXlUb29sLm51bWJlckZvcm1hdChld0RhdGEudG90YWxfYXR0YWNrLDIpICsgXCIpXCI7XHJcbiAgICAgICAgbGV0IEhQID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIkhQXCIpO1xyXG4gICAgICAgIEhQLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNeVRvb2wubnVtYmVyRm9ybWF0KGV3SnNvbkRhdGEuSGVhbHRoICogMTAwLDIpICsgXCIlKFwiICsgIE15VG9vbC5udW1iZXJGb3JtYXQoZXdEYXRhLnRvdGFsX2hwLDIpICsgXCIpXCI7XHJcbiAgICAgICAgbGV0IERlZmVuY2UgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiRGVmZW5jZVwiKTtcclxuICAgICAgICBEZWZlbmNlLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNeVRvb2wubnVtYmVyRm9ybWF0KGV3SnNvbkRhdGEuRGVmZW5zZSAqIDEwMCwyKSArIFwiJShcIiArICBNeVRvb2wubnVtYmVyRm9ybWF0KGV3RGF0YS50b3RhbF9kZWZlbnNlLDIpICsgXCIpXCI7XHJcblxyXG4gICAgICAgIGxldCBza2lsbEljb24gPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwic2tpbGxJY29uXCIpO1xyXG4gICAgICAgIHNraWxsSWNvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKFwiSXRlbV9cIisgaGVyb0Jhc2VJbmZvLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQgK1wiX1NraWxsXCIpO1xyXG4gICAgICAgIHNraWxsSWNvbi5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoZXdTaG93RGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbElEKTtcclxuICAgICAgICBza2lsbEljb24uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIihMdi5cIiArIChld0pzb25EYXRhLlN0YXIrMSkgKyBcIilcIjtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRTdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChld1Nob3dEYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UodGhpcy5yZXBsYWNlWzBdLCBNeVRvb2wubnVtYmVyRm9ybWF0KHNraWxsSW5mby5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzEsMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VbMV0sIE15VG9vbC5udW1iZXJGb3JtYXQoc2tpbGxJbmZvLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSwyKSArICcnKTtcclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZVsyXSwgTXlUb29sLm51bWJlckZvcm1hdChza2lsbEluZm8uRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xLDIpICsgJycpO1xyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UodGhpcy5yZXBsYWNlWzNdLCBNeVRvb2wubnVtYmVyRm9ybWF0KHNraWxsSW5mby5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzEsMikgKyAnJyk7XHJcblxyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UodGhpcy5yZXBsYWNlc1swXSwgTXlUb29sLm51bWJlckZvcm1hdChza2lsbEluZm8uRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xICogMTAwKSArICcnKTtcclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZXNbMV0sIE15VG9vbC5udW1iZXJGb3JtYXQoc2tpbGxJbmZvLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSAqIDEwMCwyKSArICcnKTtcclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZXNbMl0sIE15VG9vbC5udW1iZXJGb3JtYXQoc2tpbGxJbmZvLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSAqIDEwMCwyKSArICcnKTtcclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZXNbM10sIE15VG9vbC5udW1iZXJGb3JtYXQoc2tpbGxJbmZvLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSAqIDEwMCwyKSArICcnKTtcclxuXHJcbiAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcInNraWxsRGVzY3JpcHRpb25cIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBjb250ZW50U3RyO1xyXG4gICAgICAgIC8vIOWwvumDqOWkhOeQhiDlsL7pg6jlkozop6PplIHmnKrop6PplIHmnInlhbPvvIzmiYDku6XlsL7pg6jlpITnkIbmlL7lnKjkuobliY3pnaJcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8NTtpKyspe1xyXG4gICAgICAgICAgICBpZihld0pzb25EYXRhLkN1cnJlbnRTdGFnZT5pKXtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzLmdldENoaWxkQnlOYW1lKFwiY2lyY2xlXCIraSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcy5nZXRDaGlsZEJ5TmFtZShcImNpcmNsZVwiK2kpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGk8NClcclxuICAgICAgICAgICAgICAgIGlmKGV3SnNvbkRhdGEuQ3VycmVudFN0YWdlPmkrMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIitpKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIitpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvQmFzZUluZm8uUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtYXN0ZXJLZXludW0gPCAxKXtcclxuICAgICAgICAgICAgYnRucy5nZXRDaGlsZEJ5TmFtZShcImJ0blJlcGxhY2VcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBidG5zLmdldENoaWxkQnlOYW1lKFwiYnRuUmVwbGFjZVwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bnMuZ2V0Q2hpbGRCeU5hbWUoXCJidG5SZXBsYWNlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGJ0bnMuZ2V0Q2hpbGRCeU5hbWUoXCJidG5SZXBsYWNlXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWQ9YnRucy5nZXRDaGlsZEJ5TmFtZShcInJlZFVwXCIpO1xyXG4gICAgICAgIHJlZC5hY3RpdmU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0V4VXAodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuVW5sb2NrQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGNvc3ROdW0gPSBFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KTtcclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50LC1jb3N0TnVtKSl7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RXhjbHVzaXZlRXF1aXBMZXZlbCh0aGlzLmhlcm9fdHlwZSwxKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HZXRBc3NldHNUaXAsVUlMYXllckxldmVsLlRocmVlLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHZXRBc3NldHNVaSkuaW5pdERhdGEoR2V0QXNzZXRzVHlwZS5QZXRBbmRFcXVpcCk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXN0ZXJLZXlCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCB0ZXh0SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMDE3O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMDE4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMDE5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAwMjE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMDIyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0V4Y2hhbmdlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93RXhjaGFuZ2VVaSgpe1xyXG4gICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb0Jhc2VJbmZvLlF1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5UztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTUztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTUztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBwMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oa2V5SWQsMCk7XHJcbiAgICAgICAgbGV0IHAyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShoZXJvQmFzZUluZm8uRXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQsMCk7XHJcbiAgICAgICAgZXhjaGFuZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIkl0ZW1fMVwiKS5hZGRDaGlsZChwMSk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzJcIikuYWRkQ2hpbGQocDIpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVyTW92ZVJlc3BvbmNlKHNsaWRlcjpjYy5TbGlkZXIpe1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gc2xpZGVyLnByb2dyZXNzO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRXhDaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCBrZXlJZCA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5U1M7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTU1M7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bSA9IE51bWJlcigoZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpKTtcclxuICAgICAgICBpZihudW0gPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShrZXlJZCwtbnVtKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KHRoaXMuaGVyb190eXBlKSxudW0pO1xyXG4gICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VFeGNoYW5nZUJ0bkNsaWNrKGUsbnVtOm51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBudW0gPSBOdW1iZXIobnVtKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAgIHNsaWRlci5wcm9ncmVzcyA9ICAoKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkgKyAoMSAqIG51bSkpL21hc3RlcktleW51bTtcclxuICAgICAgICBpZihzbGlkZXIucHJvZ3Jlc3MgPiAxKSBzbGlkZXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA8IDApIHNsaWRlci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHNsaWRlci5wcm9ncmVzcztcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChzbGlkZXIucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlRXhjaGFuZ2UoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuVXBncmFkZUNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBjb3N0TnVtID0gRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RGcmFnbWVudChoZXJvQmFzZUluZm8uUXVhbGl0eSk7XHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCwtY29zdE51bSkpe1xyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEV4Y2x1c2l2ZUVxdWlwTGV2ZWwodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuWNh+e6pzHmrKHkuJPmraYpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZUVxdWlwTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgaWYobmV3SnNvbkRhdGEuQ3VycmVudFN0YWdlID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXBUaXAobmV3SnNvbkRhdGEuU3VtU3RhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2V0QXNzZXRzVGlwLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2V0QXNzZXRzVWkpLmluaXREYXRhKEdldEFzc2V0c1R5cGUuUGV0QW5kRXF1aXApO1xyXG4gICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVcFRpcChzdW1TdGFnZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCB1cFRpcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwU3RhclRpcFwiKTtcclxuICAgICAgICBsZXQgb2xkSnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxzdW1TdGFnZS0xKTtcclxuICAgICAgICBsZXQgbmV3SnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxzdW1TdGFnZSk7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZVdlYXBvbkRhdGEodGhpcy5oZXJvX3R5cGUsc3VtU3RhZ2UtMSk7XHJcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZVdlYXBvbkRhdGEodGhpcy5oZXJvX3R5cGUsc3VtU3RhZ2UpO1xyXG4gICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdXBUaXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZihvbGRKc29uRGF0YS5TdGFyID09IDApe1xyXG4gICAgICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lcyhcIkhlcm9fU3Rhcl9cIiArIG9sZEpzb25EYXRhLlN0YXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFNraWxsSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKFwiSXRlbV9cIisgaGVyb0Jhc2VJbmZvLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQgK1wiX1NraWxsXCIpO1xyXG4gICAgICAgIHVwVGlwLmdldENoaWxkQnlOYW1lKFwib2xkU2tpbGxMZXZlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTHYuXCIgKyAob2xkSnNvbkRhdGEuU3RhciArIDEpO1xyXG4gICAgICAgIHVwVGlwLmdldENoaWxkQnlOYW1lKFwib2xkSHBOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIE15VG9vbC5udW1iZXJGb3JtYXQob2xkSnNvbkRhdGEuQXR0YWNrICogMTAwLDIpICsgXCIlKFwiICsgTXlUb29sLm51bWJlckZvcm1hdChvbGREYXRhLnRvdGFsX2F0dGFjaywyKSArIFwiKVwiO1xyXG4gICAgICAgIHVwVGlwLmdldENoaWxkQnlOYW1lKFwib2xkQXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNeVRvb2wubnVtYmVyRm9ybWF0KG9sZEpzb25EYXRhLkhlYWx0aCAqIDEwMCwyKSArIFwiJShcIiArICBNeVRvb2wubnVtYmVyRm9ybWF0KG9sZERhdGEudG90YWxfaHAsMikgKyBcIilcIjtcclxuICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZERlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIE15VG9vbC5udW1iZXJGb3JtYXQob2xkSnNvbkRhdGEuRGVmZW5zZSAqIDEwMCwyKSArIFwiJShcIiArICBNeVRvb2wubnVtYmVyRm9ybWF0KG9sZERhdGEudG90YWxfZGVmZW5zZSwyKSArIFwiKVwiO1xyXG5cclxuICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lcyhcIkhlcm9fU3Rhcl9cIiArIG5ld0pzb25EYXRhLlN0YXIpO1xyXG4gICAgICAgIHVwVGlwLmdldENoaWxkQnlOYW1lKFwic2tpbGxJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZXMoXCJJdGVtX1wiKyBoZXJvQmFzZUluZm8uRmlyc3RFeGNsdXNpdmVXZWFwb25JRCArXCJfU2tpbGxcIik7XHJcbiAgICAgICAgdXBUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbExldmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJMdi5cIiArIChuZXdKc29uRGF0YS5TdGFyICsgMSk7XHJcbiAgICAgICAgdXBUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICBcIitcIiArIE15VG9vbC5udW1iZXJGb3JtYXQobmV3SnNvbkRhdGEuQXR0YWNrICogMTAwLDIpICsgXCIlKFwiICsgTXlUb29sLm51bWJlckZvcm1hdChuZXdEYXRhLnRvdGFsX2F0dGFjaywyKSArIFwiKVwiO1xyXG4gICAgICAgIHVwVGlwLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNeVRvb2wubnVtYmVyRm9ybWF0KG5ld0pzb25EYXRhLkhlYWx0aCAqIDEwMCwyKSArIFwiJShcIiArICBNeVRvb2wubnVtYmVyRm9ybWF0KG5ld0RhdGEudG90YWxfaHAsMikgKyBcIilcIjtcclxuICAgICAgICB1cFRpcC5nZXRDaGlsZEJ5TmFtZShcImRlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIE15VG9vbC5udW1iZXJGb3JtYXQobmV3SnNvbkRhdGEuRGVmZW5zZSAqIDEwMCwyKSArIFwiJShcIiArICBNeVRvb2wubnVtYmVyRm9ybWF0KG5ld0RhdGEudG90YWxfZGVmZW5zZSwyKSArIFwiKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlVXBUaXAoKXtcclxuICAgICAgICBsZXQgdXBUaXAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1cFN0YXJUaXBcIik7XHJcbiAgICAgICAgdXBUaXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==