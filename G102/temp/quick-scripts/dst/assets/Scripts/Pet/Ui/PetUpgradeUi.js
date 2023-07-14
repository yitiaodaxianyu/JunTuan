
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetUpgradeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0VXBncmFkZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5QyxpREFBNEM7QUFJNUMsdUVBQWtFO0FBQ2xFLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZDQUF3QztBQUN4QyxvREFBK0M7QUFFL0MsZ0RBQStDO0FBRy9DLDhDQUF5RDtBQUN6RCx5REFBb0Q7QUFFOUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFBQSxxRUFnTEM7UUE3S0csb0JBQWMsR0FBb0IsSUFBSSxDQUFDO1FBRS9CLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBMktwQyxDQUFDO0lBektHLDJCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFBO0lBRXBCLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sT0FBZTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksZ0dBQWdHO1FBQ2hHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELHVEQUF1RDtRQUN2RCxpRUFBaUU7UUFDakUscUVBQXFFO1FBQ3JFLGlJQUFpSTtRQUNqSSx3TUFBd007UUFDeE0sK05BQStOO1FBQy9OLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBRTtRQUM1SSxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsYUFBYSxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFNLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEosTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25JLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdILE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4SCxzRkFBc0Y7UUFDdEYsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQixrQkFBa0I7UUFDbEIsMkdBQTJHO1FBQzNHLHdCQUF3QjtRQUN4Qix3R0FBd0c7UUFDeEcsd0JBQXdCO1FBQ3hCLDJHQUEyRztRQUMzRyx3QkFBd0I7UUFDeEIsMkdBQTJHO1FBQzNHLFFBQVE7UUFDUix5QkFBeUI7UUFDekIsc0pBQXNKO1FBQ3RKLG9FQUFvRTtRQUNwRSw4SUFBOEk7UUFDOUksbUNBQW1DO1FBQ25DLGFBQWE7UUFDYixrRUFBa0U7UUFDbEUsd0VBQXdFO1FBQ3hFLHFFQUFxRTtRQUNyRSxvRUFBb0U7UUFDcEUsUUFBUTtRQUNSLElBQUk7UUFDSixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JKLGlKQUFpSjtRQUNqSixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRyx1R0FBdUc7UUFDdkcsMkdBQTJHO1FBQzNHLDZHQUE2RztRQUM3Ryx5R0FBeUc7UUFDekcseUdBQXlHO1FBQ3pHLHNNQUFzTTtRQUN0TSw0TUFBNE07UUFDNU0sd0JBQXdCO1FBQ3hCLDREQUE0RDtRQUM1RCx5R0FBeUc7UUFDekcsdUhBQXVIO1FBQ3ZILElBQUk7SUFDUixDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLENBQUMsRUFBQyxTQUFnQjtRQUMzQixTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzdCLHFCQUFxQjtRQUNyQixjQUFjO1FBQ2QsaUxBQWlMO1FBQ2pMLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsOEtBQThLO1FBQzlLLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsaUxBQWlMO1FBQ2pMLGlCQUFpQjtRQUNqQixjQUFjO1FBRWQsaUJBQWlCO1FBQ2pCLElBQUk7SUFDUixDQUFDO0lBRUQsd0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxFQUFFLEdBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLGdFQUFnRTtRQUNoRSxtRUFBbUU7UUFDbkUsc0JBQXNCO1FBQ3RCLG9FQUFvRTtRQUNwRSw2RkFBNkY7UUFDN0YsNEVBQTRFO1FBQzVFLGtGQUFrRjtRQUNsRiw2REFBNkQ7UUFDN0Qsd0JBQXdCO1FBQ3hCLCtGQUErRjtRQUMvRiwrRkFBK0Y7UUFDL0YsOEZBQThGO1FBQzlGLFNBQVM7UUFDVCwwQkFBMEI7UUFDMUIsNEZBQTRGO1FBQzVGLDZHQUE2RztRQUM3RywySEFBMkg7UUFDM0gsUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO0lBRUQsMENBQW1CLEdBQW5CO1FBQUEsaUJBT0M7UUFORyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxvRUFBb0U7UUFDcEUscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxTQUFTLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNO2dCQUN2RixNQUFNLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxHQUFFLENBQUMsQ0FBQTtJQUNSLENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQUEsaUJBUUM7UUFQRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3hDLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ25DLE9BQU8sRUFBQyxDQUFDO2dCQUNMLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2hCLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsbUJBQW1CO1FBQ25CLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFFSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFHRCxpQ0FBVSxHQUFWLFVBQVcsS0FBYSxFQUFDLE1BQWM7UUFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBWSxFQUFFLE1BQWlCO1lBQzlFLElBQUksS0FBSyxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNLRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3dEQUNjO0lBSHRCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnTGhDO0lBQUQsbUJBQUM7Q0FoTEQsQUFnTEMsQ0FoTHlDLHFCQUFXLEdBZ0xwRDtrQkFoTG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgQXRycmlidXRlVWkgZnJvbSBcIi4uLy4uL1VJL2hvbWUvQXRycmlidXRlVWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGV0VXBncmFkZVVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHBldF91cGdyYWRlX3VpIDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgcGV0X2luZm86UGV0SW5mbyA9IG51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYylcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKHBldEluZm86UGV0SW5mbyl7XHJcbiAgICAgICAgdGhpcy5wZXRfaW5mbyA9IHBldEluZm87XHJcbiAgICAgICAgbGV0IHNwUm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNwUm9vdFwiKTtcclxuICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50YXJnZXQgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmxvYWRQcmVmYWIoXCJcIiArIHRoaXMucGV0X2luZm8ucGV0X2lkLHNwUm9vdCk7ICBcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpe1xyXG4gICAgICAgIC8vIGxldCBmb3JtRGF0YSA9IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdE1lc3NhZ2UodGhpcy5wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAvLyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFBldERhdGEodGhpcy5wZXRfaW5mbyk7XHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0RGF0YSh0aGlzLnBldF9pbmZvKTtcclxuICAgICAgICAvLyBsZXQgdXBEYXRhID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrVXBncmFkZSh0aGlzLnBldF9pbmZvKTtcclxuICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGZvcm1EYXRhLlNwaXJpdE5hbWUpO1xyXG4gICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRRdWFsaXR5TmFtZSh0aGlzLnBldF9pbmZvLnBldF9xdWFsaXR5KSlcclxuICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJxdWFsaXR5SWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X3VwZ3JhZGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJTcHJpdGVfVXBfUXVhbGl0eV9cIitTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRRdWFsaXR5ZnJhbWUodGhpcy5wZXRfaW5mby5wZXRfcXVhbGl0eSkpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInRvcENvaW5OdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLDEpIDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BHZW1OdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkFuaW1hbEZvb2QpLDEpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInVwZ3JhZGVCdG5cIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoNjQwMDA0KTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJhZHZhbmNlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg2NDAwMDUpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImF3YWtlbmluZ0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoNjQwMDA2KTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg2NDAwMDcpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImRpc2NhcmRlZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDY0MDAwOCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBza2lsbE51bSA9IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxOdW0odGhpcy5wZXRfaW5mby5wZXRfaWQpXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMTtpPCA1O2krKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBza2lsbExldmVsID0gMTtcclxuICAgICAgICAvLyAgICAgaWYoaSA9PSAxKXtcclxuICAgICAgICAvLyAgICAgICAgIHNraWxsTGV2ZWwgPSBTcGlyaXRMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpdmVTa2lsbExldmVsXzEodGhpcy5wZXRfaW5mby5wZXRfbGV2ZWwpO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZSBpZihpID09IDIpe1xyXG4gICAgICAgIC8vICAgICAgICAgc2tpbGxMZXZlbCA9IFNwaXJpdExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWN0aXZlU2tpbGxMZXZlbCh0aGlzLnBldF9pbmZvLnBldF9sZXZlbCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgLy8gICAgICAgICBza2lsbExldmVsID0gU3Bpcml0TGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzaXZlU2tpbGxMZXZlbF8yKHRoaXMucGV0X2luZm8ucGV0X2xldmVsKTtcclxuICAgICAgICAvLyAgICAgfWVsc2UgaWYoaSA9PSA0KXtcclxuICAgICAgICAvLyAgICAgICAgIC8vIHNraWxsTGV2ZWwgPSBTcGlyaXRMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFjdGl2ZVNraWxsTGV2ZWwodGhpcy5wZXRfaW5mby5wZXRfbGV2ZWwpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmKCBza2lsbE51bT49IGkpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2tpbGxMZXZlbE51bVwiICsgaSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsTGV2ZWwodGhpcy5wZXRfaW5mbyxpKTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBza2lsbEljb24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbEljb25cIiArIGkpXHJcbiAgICAgICAgLy8gICAgICAgICBza2lsbEljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF91cGdyYWRlX3VpLmdldFNwcml0ZUZyYW1lKFwiU3ByaXRlX1wiKyB0aGlzLnBldF9pbmZvLnBldF9pZCArXCJfU2tpbGxfXCIgKyBpKTtcclxuICAgICAgICAvLyAgICAgICAgIHNraWxsSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNraWxsQmdcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2tpbGxMZXZlbE51bVwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbExldmVsXCIgKyBpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNraWxsSWNvblwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwidHlwZUljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF91cGdyYWRlX3VpLmdldFNwcml0ZUZyYW1lKFwiU3ByaXRlX0hlcm9fXCIgKyB0aGlzLnBldF9pbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRaaGFubGkodGhpcy5wZXRfaW5mbyksMik7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkxWLlwiICsgU3RyaW5nKHRoaXMucGV0X2luZm8ucGV0X2xldmVsKTtcclxuICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJocExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChkYXRhLkhlYWx0aCwyKTtcclxuICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJkYW1hZ2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoZGF0YS5BdHRhY2ssMik7XHJcbiAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZGVmZW5zZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChkYXRhLkRlZmVuc2UsMik7XHJcbiAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiYm90dG9uQ29pbk51bTFcIikuY29sb3IgPSB1cERhdGEuaXNfY29pbiA/IGNjLmNvbG9yKDE4MCwxODgsMjExKSA6IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b25Db2luTnVtMlwiKS5jb2xvciA9IHVwRGF0YS5pc19mb29kID8gY2MuY29sb3IoMTgwLDE4OCwyMTEpIDogY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbkNvaW5OdW0xXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSwxKSArIFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkodXBEYXRhLmNvc3RfY29pbiwxKTtcclxuICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b25Db2luTnVtMlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCksMSkgKyBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKHVwRGF0YS5jb3N0X2Zvb2QsMSk7XHJcbiAgICAgICAgLy8gaWYoIXVwRGF0YS5pc19sZXZlbCl7XHJcbiAgICAgICAgLy8gICAgIGxldCB1cGdyYWRlQnRuID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKTtcclxuICAgICAgICAvLyAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKVxyXG4gICAgICAgIC8vICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lk1BWCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGxDbGljayhlLHNraWxsU2xvdDpudW1iZXIpe1xyXG4gICAgICAgIHNraWxsU2xvdCA9IE51bWJlcihza2lsbFNsb3QpXHJcbiAgICAgICAgLy8gc3dpdGNoKHNraWxsU2xvdCl7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgMTpcclxuICAgICAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoU3Bpcml0TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzaXZlU2tpbGxzSW50cm9fMSh0aGlzLnBldF9pbmZvLnBldF9pZCkpKTtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWN0aXZlU2tpbGxzSW50cm8odGhpcy5wZXRfaW5mby5wZXRfaWQpKSk7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAzOlxyXG4gICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpdmVTa2lsbHNJbnRyb18yKHRoaXMucGV0X2luZm8ucGV0X2lkKSkpO1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgNDpcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGdyYWRlQnRuQ2xpY2soKXtcclxuICAgICAgICBsZXQgZ20gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ljYfnuqfmjInpkq7ngrnlh7vmlbApO1xyXG4gICAgICAgIC8vIGxldCBkYXRhID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrVXBncmFkZSh0aGlzLnBldF9pbmZvKTtcclxuICAgICAgICAvLyBpZihkYXRhLmlzX2Nhbl91cCl7XHJcbiAgICAgICAgLy8gICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ljYfnuqflrqDnianmgLvmrKHmlbApO1xyXG4gICAgICAgIC8vICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM5a6g54mp55qE5Y2H57qn5qyh5pWwICsgdGhpcy5wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sLWRhdGEuY29zdF9jb2luKTtcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5BbmltYWxGb29kLC1kYXRhLmNvc3RfZm9vZCk7XHJcbiAgICAgICAgLy8gICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQZXRMZXZlbCh0aGlzLnBldF9pbmZvLDEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIC8vICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93U2hlbmdKaTAodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0MVwiKSxjYy52MigwLDApKTtcclxuICAgICAgICAvLyAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1NoZW5nSmkxKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDJcIiksY2MudjIoMCwwKSk7XHJcbiAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3daaGFuRG91bGkodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIiksY2MudjIoMCwwKSk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGlmKCFkYXRhLmlzX2xldmVsKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCB1cGdyYWRlQnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKTtcclxuICAgICAgICAvLyAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCxjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSlcclxuICAgICAgICAvLyAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguTUFYKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkF0dHJpYnV0ZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QXR0cmlidXRlVWkobnVsbCxudWxsLHRoaXMucGV0X2luZm8pO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQXR0cmlidXRlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0UGV0SW5mbyh0aGlzLnBldF9pbmZvKTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1Jlc2V0QnRuKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZih0aGlzLnBldF9pbmZvLnBldF9sZXZlbCA8PSAxKSByZXR1cm47XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BldFJlc2V0VWkoe1xyXG4gICAgICAgICAgICBvbkNsb3NlOigoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKVxyXG4gICAgICAgIH0sdGhpcy5wZXRfaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyDmmoLml7blnKjlhbPpl63nlYzpnaLml7blhpnlhaXmlbTkuKrlrqDnianmlbDnu4RcclxuICAgICAgICAvLyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFBldExpc3QoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbG9hZFByZWZhYihwZXRJZDogc3RyaW5nLHBhcmVudDpjYy5Ob2RlKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJwZXQvdWkvcGV0X1wiK3BldElkLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cylcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIGxldCBzaGFkb3cgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiU3ByaXRlX1VwX1NoYWRvd1wiKTtcclxuICAgICAgICAgICAgc2hhZG93LnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgc2hhZG93LnNjYWxlID0gbm9kZS5zY2FsZTtcclxuICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAvLyBub2RlLnNjYWxlID0gMC43O1xyXG4gICAgICAgICAgICBsZXQgcyA9IG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgcy5zZXRBbmltYXRpb24oMCxcIlNpZGVfSWRsZVwiLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=