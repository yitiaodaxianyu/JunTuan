"use strict";
cc._RF.push(module, 'c3c66tTNtxK74zTxmEaIdVC', 'PetInfoUi');
// Scripts/Pet/Ui/PetInfoUi.ts

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
var CoinPop_1 = require("../../CoinPop");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var MyTool_1 = require("../../Tools/MyTool");
var GetAssetsUi_1 = require("../../UI/GetAssetsUi");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var SpiritAttribute_1 = require("../Data/SpiritAttribute");
var SpiritCultivate_1 = require("../Data/SpiritCultivate");
var SpiritMessage_1 = require("../Data/SpiritMessage");
var SpiritSkill_1 = require("../Data/SpiritSkill");
var PetManager_1 = require("../PetManager");
var PetExchangeUi_1 = require("./PetExchangeUi");
var PetItem_1 = require("./PetItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetInfoUi = /** @class */ (function (_super) {
    __extends(PetInfoUi, _super);
    function PetInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.replace = ['~a', '~b', '~c', '~d'];
        _this.replaces = ['~z', '~y', '~x', '~w'];
        return _this;
    }
    PetInfoUi.prototype.initData = function (heroType) {
        this.hero_type = heroType;
        this.refreshUi();
    };
    PetInfoUi.prototype.refreshUi = function () {
        var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(HeroManager_1.HeroManager.getInstance().getWearPet(this.hero_type));
        var itemInfo = Item_1.ItemManager.getInstance().getJsonItem(petInfo.SpiritItem);
        var back = this.node.getChildByName("back");
        var curRoot = back.getChildByName('curRoot');
        var content = back.getChildByName("content");
        // 头部处理
        curRoot.getChildByName("propRoot").children[0].getComponent(PetItem_1.default).init(this.hero_type, itemInfo.ItemID, PropConfig_1.PropAction.Null);
        var propName = curRoot.getChildByName("propName");
        // propName.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(itemInfo.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(itemInfo.Quality);
        curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PetManager_1.PetManager.getInstance().getPetZhanLi(itemInfo.ItemID));
        // 内容处理
        var ATKAndDefence = content.getChildByName("AKTAndDefence");
        ATKAndDefence.children[2].getComponent(TextLanguage_1.default).startTranslation();
        ATKAndDefence.children[2].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Attack, 2);
        ATKAndDefence.children[3].getComponent(TextLanguage_1.default).startTranslation();
        ATKAndDefence.children[3].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Defense, 2);
        var HP = content.getChildByName("HP");
        HP.children[1].getComponent(TextLanguage_1.default).startTranslation();
        HP.children[1].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Health, 2);
        var HitAndMiss = content.getChildByName("HitAndMiss");
        HitAndMiss.children[2].getComponent(TextLanguage_1.default).startTranslation();
        HitAndMiss.children[2].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Hit, 2);
        HitAndMiss.children[3].getComponent(TextLanguage_1.default).startTranslation();
        HitAndMiss.children[3].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Miss, 2);
        var CriticalAndAntiCritical = content.getChildByName("CriticalAndAntiCritical");
        CriticalAndAntiCritical.children[2].getComponent(TextLanguage_1.default).startTranslation();
        CriticalAndAntiCritical.children[2].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.Critical, 2);
        CriticalAndAntiCritical.children[3].getComponent(TextLanguage_1.default).startTranslation();
        CriticalAndAntiCritical.children[3].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.AntiCritical, 2);
        var AntiCriticalAndAntiExtraCritical = content.getChildByName("ExtraCriticalAndAntiExtraCritical");
        AntiCriticalAndAntiExtraCritical.children[2].getComponent(TextLanguage_1.default).startTranslation();
        AntiCriticalAndAntiExtraCritical.children[2].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.ExtraCritical * 100, 2) + "%";
        AntiCriticalAndAntiExtraCritical.children[3].getComponent(TextLanguage_1.default).startTranslation();
        AntiCriticalAndAntiExtraCritical.children[3].getComponent(cc.Label).string += ":" + MyTool_1.default.numberFormat(petInfo.AntiExtraCritical * 100, 2) + "%";
        var skillIcon = content.getChildByName("skillIcon");
        skillIcon.children[0].getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Pet_" + petInfo.SpiritType + "_Skill_0");
        var petMessage = SpiritMessage_1.SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
        skillIcon.children[1].children[0].getComponent(TextLanguage_1.default).setTextId(petMessage.SpiritSkillName);
        skillIcon.children[1].children[1].getComponent(cc.Label).string = "(Lv." + (petInfo.Quality - 2) + ")";
        var contentStr = LanguageManager_1.default.getInstance().getStrByTextId(petMessage.ActiveSkillsIntro);
        var skillInfo = SpiritSkill_1.SpiritSkillManager.getInstance().getJsonByTypeAndLevel(petInfo.SpiritType, petInfo.Quality - 2);
        contentStr = contentStr.replace(this.replace[0], MyTool_1.default.numberFormat(skillInfo.SkillParameter_1, 2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool_1.default.numberFormat(skillInfo.SkillParameter_2, 2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool_1.default.numberFormat(skillInfo.SkillParameter_3, 2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool_1.default.numberFormat(skillInfo.CoolDown, 2) + '');
        contentStr = contentStr.replace(this.replaces[0], MyTool_1.default.numberFormat(skillInfo.SkillParameter_1 * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool_1.default.numberFormat(skillInfo.SkillParameter_2 * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool_1.default.numberFormat(skillInfo.SkillParameter_3 * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool_1.default.numberFormat(skillInfo.CoolDown * 100, 2) + '');
        content.getChildByName("skillDescription").getComponent(cc.RichText).string = contentStr;
        // 尾部处理
        var cost = back.getChildByName("cost");
        var btns = back.getChildByName("btns");
        var red = btns.getChildByName("btnMerge").getChildByName("red");
        red.active = PetManager_1.PetManager.getInstance().checkRedTip(this.hero_type);
        if (petInfo.Stage >= petMessage.StageLimit) {
            cost.active = false;
            btns.children[0].active = false;
        }
        else {
            cost.active = true;
            btns.children[0].active = true;
            var costInfo = SpiritCultivate_1.SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
            if (costInfo.CoinSpirit == 0) {
                cost.children[0].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_20003");
                cost.children[0].getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.AnimalFood));
                if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.AnimalFood) < costInfo.FoodCost) {
                    cost.children[0].getChildByName("haveNum").color = cc.color(254, 76, 76);
                }
                else {
                    cost.children[0].getChildByName("haveNum").color = cc.color(222, 199, 166);
                }
                cost.children[0].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(costInfo.FoodCost);
                cost.children[1].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10001");
                cost.children[1].getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin));
                if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin) < costInfo.CoinCost) {
                    cost.children[1].getChildByName("haveNum").color = cc.color(254, 76, 76);
                }
                else {
                    cost.children[1].getChildByName("haveNum").color = cc.color(222, 199, 166);
                }
                cost.children[1].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(costInfo.CoinCost);
            }
            else {
                var firstStageInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);
                cost.children[0].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Icon_Pet_" + petInfo.SpiritType);
                cost.children[0].getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem));
                if (PropManager_1.PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) < costInfo.CoinSpirit) {
                    cost.children[0].getChildByName("haveNum").color = cc.color(254, 76, 76);
                }
                else {
                    cost.children[0].getChildByName("haveNum").color = cc.color(222, 199, 166);
                }
                cost.children[0].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(costInfo.CoinSpirit);
                cost.children[1].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10002");
                cost.children[1].getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem));
                if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem) < costInfo.DiamondCost) {
                    cost.children[1].getChildByName("haveNum").color = cc.color(254, 76, 76);
                }
                else {
                    cost.children[1].getChildByName("haveNum").color = cc.color(222, 199, 166);
                }
                cost.children[1].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(costInfo.DiamondCost);
            }
        }
    };
    PetInfoUi.prototype.onClickUnloadBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        HeroManager_1.HeroManager.getInstance().unloadWearPet(this.hero_type);
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if (oldCombat != newCombat)
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        _super.prototype.onClose.call(this);
    };
    PetInfoUi.prototype.onClickReplaceBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PetList, UIConfig_1.UILayerLevel.Three, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(PetExchangeUi_1.default).init({
                    onClose: function () {
                        _this.refreshUi();
                    }
                });
                uiNode.getComponent(PetExchangeUi_1.default).initData(HeroManager_1.HeroManager.getInstance().getWearPet(_this.hero_type), _this.hero_type);
            }
        });
    };
    PetInfoUi.prototype.onClickSyntheticBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(HeroManager_1.HeroManager.getInstance().getWearPet(this.hero_type));
        var costInfo = SpiritCultivate_1.SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
        var petMessage = SpiritMessage_1.SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
        if (costInfo.CoinSpirit == 0) {
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin) < costInfo.CoinCost) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                        uiNode.getComponent(CoinPop_1.default).init({
                            onClose: function () {
                                _this.refreshUi();
                            }
                        });
                        uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
                    }, });
                return;
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.AnimalFood) < costInfo.FoodCost) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2,2);
                // GameManager.getInstance().game_to_home=Go_Type.City;
                // GameManager.getInstance().jumoAndShowUi();
                // UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GetAssetsTip, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                        uiNode.getComponent(GetAssetsUi_1.default).initData(GetAssetsUi_1.GetAssetsType.PetAndEquip);
                    } });
                return;
            }
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级1次宠物);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级X次灵宠);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, -costInfo.FoodCost);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, -costInfo.CoinCost);
            PropManager_1.PropManager.getInstance().changePropNum(petInfo.SpiritItem, -1);
            PropManager_1.PropManager.getInstance().changePropNum(petInfo.SpiritItem + 1, 1);
            HeroManager_1.HeroManager.getInstance().unloadWearPet(this.hero_type);
            HeroManager_1.HeroManager.getInstance().addWearPet(this.hero_type, petInfo.SpiritItem + 1);
            var newPetInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petInfo.SpiritItem + 1);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            if (oldCombat != newCombat)
                UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            if (newPetInfo.Stage >= petMessage.StageLimit) {
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计将X只宠物升至最高品质);
            }
            if (petInfo.Quality != newPetInfo.Quality) {
                this.showUpTip(petInfo, newPetInfo);
            }
            this.refreshUi();
        }
        else {
            var firstStageInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem) < costInfo.DiamondCost) {
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                        uiNode.getComponent(CoinPop_1.default).init({
                            onClose: function () {
                                _this.refreshUi();
                            }
                        });
                        uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                    }, });
                return;
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) < costInfo.CoinSpirit) {
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2, 2);
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
                GameManager_1.default.getInstance().jumoAndShowUi();
                UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
                return;
            }
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级1次宠物);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级X次灵宠);
            PropManager_1.PropManager.getInstance().changePropNum(firstStageInfo.SpiritItem, -costInfo.CoinSpirit);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -costInfo.DiamondCost);
            PropManager_1.PropManager.getInstance().changePropNum(petInfo.SpiritItem, -1);
            PropManager_1.PropManager.getInstance().changePropNum(petInfo.SpiritItem + 1, 1);
            HeroManager_1.HeroManager.getInstance().unloadWearPet(this.hero_type);
            HeroManager_1.HeroManager.getInstance().addWearPet(this.hero_type, petInfo.SpiritItem + 1);
            var newPetInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petInfo.SpiritItem + 1);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            if (oldCombat != newCombat)
                UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            if (newPetInfo.Stage >= petMessage.StageLimit) {
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计将X只宠物升至最高品质);
            }
            if (petInfo.Quality != newPetInfo.Quality) {
                this.showUpTip(petInfo, newPetInfo);
            }
            this.refreshUi();
        }
    };
    PetInfoUi.prototype.showUpTip = function (oldPetInfo, petInfo) {
        var upTip = this.node.getChildByName("upStarTip");
        upTip.active = true;
        upTip.getChildByName("oldNickname").getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(oldPetInfo.Quality) + "]";
        upTip.getChildByName("oldNickname").color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(oldPetInfo.Quality);
        upTip.getChildByName("oldSkillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Pet_" + oldPetInfo.SpiritType + "_Skill_0");
        upTip.getChildByName("oldSkillLevel").getComponent(cc.Label).string = "Lv." + (oldPetInfo.Quality - 2);
        upTip.getChildByName("oldHpNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(oldPetInfo.Health);
        upTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(oldPetInfo.Attack);
        upTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(oldPetInfo.Defense);
        upTip.getChildByName("nickname").getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(petInfo.Quality) + "]";
        upTip.getChildByName("nickname").color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(petInfo.Quality);
        upTip.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Pet_" + petInfo.SpiritType + "_Skill_0");
        upTip.getChildByName("skillLevel").getComponent(cc.Label).string = "Lv." + (petInfo.Quality - 2);
        upTip.getChildByName("hpNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(petInfo.Health);
        upTip.getChildByName("atkNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(petInfo.Attack);
        upTip.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(petInfo.Defense);
    };
    PetInfoUi.prototype.hideUpTip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("upStarTip").active = false;
    };
    PetInfoUi = __decorate([
        ccclass
    ], PetInfoUi);
    return PetInfoUi;
}(UIComponent_1.default));
exports.default = PetInfoUi;

cc._RF.pop();