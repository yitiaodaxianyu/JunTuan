"use strict";
cc._RF.push(module, 'c3cdabe1eFMcYQM/JL9Ls/F', 'PetUpgradeUi');
// Scripts/Pet/Ui/PetUpgradeUi.ts

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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../../UI/UIComponent");
var UIManager_1 = require("../../UI/UIManager");
var UIConfig_1 = require("../../UI/UIConfig");
var AtrributeUi_1 = require("../../UI/home/AtrributeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetUpgradeUi = /** @class */ (function (_super) {
    __extends(PetUpgradeUi, _super);
    function PetUpgradeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_upgrade_ui = null;
        _this.pet_info = null;
        return _this;
    }
    PetUpgradeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetUpgradeUi.prototype.initUi = function (petInfo) {
        this.pet_info = petInfo;
        var spRoot = this.node.getChildByName("spRoot");
        var canvas = cc.find("Canvas");
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        this.loadPrefab("" + this.pet_info.pet_id, spRoot);
        this.refreshUi();
    };
    PetUpgradeUi.prototype.refreshUi = function () {
        // let formData = SpiritMessageManager.getInstance().getJsonSpiritMessage(this.pet_info.pet_id);
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        // PetManager.getInstance().loadPetData(this.pet_info);
        // let data = PetManager.getInstance().getPetData(this.pet_info);
        // let upData = PetManager.getInstance().checkUpgrade(this.pet_info);
        // top.getChildByName("name1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(formData.SpiritName);
        // top.getChildByName("quality").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(SpiritQualityMessageManager.getInstance().getSpiritQualityName(this.pet_info.pet_quality))
        // top.getChildByName("qualityIcon").getComponent(cc.Sprite).spriteFrame = this.pet_upgrade_ui.getSpriteFrame("Sprite_Up_Quality_"+SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.pet_info.pet_quality));
        top.getChildByName("topCoinNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin), 1);
        top.getChildByName("topGemNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.AnimalFood), 1);
        bottom.getChildByName("upgradeBtn").getComponentInChildren(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640004);
        bottom.getChildByName("advanceLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640005);
        bottom.getChildByName("awakeningLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640006);
        bottom.getChildByName("reduction").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640007);
        bottom.getChildByName("discarded").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640008);
        // let skillNum = SpiritMessageManager.getInstance().getSkillNum(this.pet_info.pet_id)
        // for(let i = 1;i< 5;i++){
        //     let skillLevel = 1;
        //     if(i == 1){
        //         skillLevel = SpiritLevelUpManager.getInstance().getPassiveSkillLevel_1(this.pet_info.pet_level);
        //     }else if(i == 2){
        //         skillLevel = SpiritLevelUpManager.getInstance().getActiveSkillLevel(this.pet_info.pet_level);
        //     }else if(i == 3){
        //         skillLevel = SpiritLevelUpManager.getInstance().getPassiveSkillLevel_2(this.pet_info.pet_level);
        //     }else if(i == 4){
        //         // skillLevel = SpiritLevelUpManager.getInstance().getActiveSkillLevel(this.pet_info.pet_level);
        //     }
        //     if( skillNum>= i){
        //         this.node.getChildByName("skillLevelNum" + i).getComponent(cc.Label).string = "" + PetManager.getInstance().getSkillLevel(this.pet_info,i);
        //         let skillIcon = this.node.getChildByName("skillIcon" + i)
        //         skillIcon.getComponent(cc.Sprite).spriteFrame = this.pet_upgrade_ui.getSpriteFrame("Sprite_"+ this.pet_info.pet_id +"_Skill_" + i);
        //         skillIcon.active = true;
        //     }else{
        //         this.node.getChildByName("skillBg" + i).active = false;
        //         this.node.getChildByName("skillLevelNum" + i).active = false;
        //         this.node.getChildByName("skillLevel" + i).active = false;
        //         this.node.getChildByName("skillIcon" + i).active = false;
        //     }
        // }
        bottom.getChildByName("typeIcon").getComponent(cc.Sprite).spriteFrame = this.pet_upgrade_ui.getSpriteFrame("Sprite_Hero_" + this.pet_info.hero_type);
        // bottom.getChildByName("fightNum").getComponent(cc.Label).string = MyTool.numberFormat(PetManager.getInstance().getPetZhanli(this.pet_info),2);
        bottom.getChildByName("levelNum").getComponent(cc.Label).string = "LV." + String(this.pet_info.pet_level);
        // bottom.getChildByName("hpLabel").getComponent(cc.Label).string = MyTool.numberFormat(data.Health,2);
        // bottom.getChildByName("damageLabel").getComponent(cc.Label).string = MyTool.numberFormat(data.Attack,2);
        // bottom.getChildByName("defenseLabel").getComponent(cc.Label).string = MyTool.numberFormat(data.Defense,2);
        // bottom.getChildByName("bottonCoinNum1").color = upData.is_coin ? cc.color(180,188,211) : cc.Color.RED;
        // bottom.getChildByName("bottonCoinNum2").color = upData.is_food ? cc.color(180,188,211) : cc.Color.RED;
        // bottom.getChildByName("bottonCoinNum1").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin),1) + "/" + MyTool.getCoinDanwei(upData.cost_coin,1);
        // bottom.getChildByName("bottonCoinNum2").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.AnimalFood),1) + "/" + MyTool.getCoinDanwei(upData.cost_food,1);
        // if(!upData.is_level){
        //     let upgradeBtn = bottom.getChildByName("upgradeBtn");
        //     upgradeBtn.getComponent(cc.Sprite).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"))
        //     upgradeBtn.getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getString(LanguageIndex.MAX);
        // }
    };
    PetUpgradeUi.prototype.onSkillClick = function (e, skillSlot) {
        skillSlot = Number(skillSlot);
        // switch(skillSlot){
        //     case 1:
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(SpiritMessageManager.getInstance().getPassiveSkillsIntro_1(this.pet_info.pet_id)));
        //         break;
        //     case 2:
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(SpiritMessageManager.getInstance().getActiveSkillsIntro(this.pet_info.pet_id)));
        //         break;
        //     case 3:
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(SpiritMessageManager.getInstance().getPassiveSkillsIntro_2(this.pet_info.pet_id)));
        //         break;
        //     case 4:
        //         break;
        // }
    };
    PetUpgradeUi.prototype.onUpgradeBtnClick = function () {
        var gm = GameManager_1.default.getInstance();
        gm.sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // FollowManager.getInstance().followEvent(Follow_Type.升级按钮点击数);
        // let data = PetManager.getInstance().checkUpgrade(this.pet_info);
        // if(data.is_can_up){
        //     FollowManager.getInstance().followEvent(Follow_Type.升级宠物总次数);
        //     FollowManager.getInstance().followEvent(Follow_Type.不同宠物的升级次数 + this.pet_info.pet_id);
        //     PropManager.getInstance().changePropNum(PropId.Coin,-data.cost_coin);
        //     PropManager.getInstance().changePropNum(PropId.AnimalFood,-data.cost_food);
        //     PetManager.getInstance().addPetLevel(this.pet_info,1);
        //     this.refreshUi();
        //     // UIManager.getInstance().showShengJi0(this.node.getChildByName("effect1"),cc.v2(0,0));
        //     // UIManager.getInstance().showShengJi1(this.node.getChildByName("effect2"),cc.v2(0,0));
        //     UIManager.getInstance().showZhanDouli(this.node.getChildByName("fightNum"),cc.v2(0,0));
        // }else{
        //     if(!data.is_level){
        //         let upgradeBtn = this.node.getChildByName("bottom").getChildByName("upgradeBtn");
        //         upgradeBtn.getComponent(cc.Sprite).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"))
        //         upgradeBtn.getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getString(LanguageIndex.MAX);
        //     }
        // }
    };
    PetUpgradeUi.prototype.onAttributeBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // UIManager.getInstance().showAttributeUi(null,null,this.pet_info);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Attribute, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(AtrributeUi_1.default).init(null);
                uiNode.getComponent(AtrributeUi_1.default).initPetInfo(_this.pet_info);
            }, });
    };
    PetUpgradeUi.prototype.onClickResetBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.pet_info.pet_level <= 1)
            return;
        UIManager_1.UIManager.getInstance().showPetResetUi({
            onClose: (function () {
                _this.refreshUi();
            }).bind(this)
        }, this.pet_info);
    };
    PetUpgradeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // 暂时在关闭界面时写入整个宠物数组
        // PetManager.getInstance().saveAllPetList();
        this.destroySelf();
    };
    PetUpgradeUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    PetUpgradeUi.prototype.loadPrefab = function (petId, parent) {
        cc.resources.load("pet/ui/pet_" + petId, cc.Prefab, function (error, assets) {
            if (error) {
                cc.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = parent;
            var shadow = node.getChildByName("Sprite_Up_Shadow");
            shadow.parent = parent;
            shadow.scale = node.scale;
            node.zIndex = 1;
            node.setPosition(cc.v2(0, 0));
            // node.scale = 0.7;
            var s = node.getComponent(sp.Skeleton);
            s.setAnimation(0, "Side_Idle", true);
        });
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], PetUpgradeUi.prototype, "pet_upgrade_ui", void 0);
    PetUpgradeUi = __decorate([
        ccclass
    ], PetUpgradeUi);
    return PetUpgradeUi;
}(UIComponent_1.default));
exports.default = PetUpgradeUi;

cc._RF.pop();