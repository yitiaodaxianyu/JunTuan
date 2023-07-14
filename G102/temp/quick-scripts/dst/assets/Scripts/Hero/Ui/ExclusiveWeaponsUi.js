
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/ExclusiveWeaponsUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEV4Y2x1c2l2ZVdlYXBvbnNVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNEVBQXVFO0FBQ3ZFLGlEQUE0QztBQUM1QywyREFBMEQ7QUFDMUQseURBQXVEO0FBQ3ZELDRFQUFrRjtBQUNsRixnRkFBc0Y7QUFDdEYsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUM1RCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBQ3hDLG9EQUErQztBQUMvQyw4Q0FBeUQ7QUFFekQsZ0RBQStDO0FBQy9DLHFGQUFnRjtBQUUxRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnRCxzQ0FBVztJQUEzRDtRQUFBLHFFQTZGQztRQTNGRyxlQUFTLEdBQWEsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFHckMseUJBQW1CLEdBQWtCLElBQUksQ0FBQzs7SUF3RjlDLENBQUM7SUF0RkcsaUNBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxRQUFrQjtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFDSSxJQUFJLFFBQVEsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxVQUFVLEdBQUcsa0RBQTJCLENBQUMsV0FBVyxFQUFFLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMx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QUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQXRGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21FQUNpQjtJQUx6QixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQTZGdEM7SUFBRCx5QkFBQztDQTdGRCxBQTZGQyxDQTdGK0MscUJBQVcsR0E2RjFEO2tCQTdGb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVFcXVpcEl0ZW0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9VaS9FeGNsdXNpdmVFcXVpcEl0ZW1cIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSBmcm9tIFwiLi9FeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4Y2x1c2l2ZVdlYXBvbnNVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlID0gSGVyb19UeXBlLk5VTEw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgZXhjbHVzaXZlX3dlYXBvbl91aTpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGUgPSBoZXJvVHlwZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpe1xyXG4gICAgICAgIGxldCBoZXJvSW5mbyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCB3ZWFwb25EYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkJ5SGVyb1R5cGVBbmRXZWFwb25MZXZlbCh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UpO1xyXG4gICAgICAgIGxldCB3ZWFwb25NZXNzYWdlID0gRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRXhjbHVzaXZlV2VhcG9uTWVzc2FnZSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXF1aXBOYW1lXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh3ZWFwb25NZXNzYWdlLkV4Y2x1c2l2ZVdlYXBvbk5hbWVJRCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaGVyb0Rlc1wiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQod2VhcG9uTWVzc2FnZS5IZXJvRXhjbHVzaXZlKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJBVEtcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLm51bWJlckZvcm1hdCh3ZWFwb25EYXRhLkF0dGFjayAqIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSksMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiSHBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLm51bWJlckZvcm1hdCh3ZWFwb25EYXRhLkhlYWx0aCAqIDEwMCwyKSArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRlZmVuY2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLm51bWJlckZvcm1hdCh3ZWFwb25EYXRhLkRlZmVuc2UgKiAxMDAsMikgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLm51bWJlckZvcm1hdCh3ZWFwb25EYXRhLkF0dGFjayAqIDEwMCwyKSArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNyaXRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLm51bWJlckZvcm1hdCh3ZWFwb25EYXRhLkhpdCwyKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleGNsdXNpdmVFcXVpcEl0ZW1cIikuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZUVxdWlwSXRlbSkuaW5pdCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbE5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh3ZWFwb25NZXNzYWdlLkV4Y2x1c2l2ZVdlYXBvblNraWxsSUQpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNraWxsSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZXhjbHVzaXZlX3dlYXBvbl91aS5nZXRTcHJpdGVGcmFtZShcIkV4Y2x1c2l2ZV9Ta2lsbF9cIit0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2tpbGxEZXNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh3ZWFwb25NZXNzYWdlLkV4Y2x1c2l2ZVdlYXBvblNraWxsRGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudFxyXG4gICAgICAgIGxldCB0ZXh0MSA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbERlczFcIik7XHJcbiAgICAgICAgbGV0IHRleHQyID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImxldmVsRGVzMlwiKTtcclxuICAgICAgICBsZXQgdGV4dDMgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwibGV2ZWxEZXMzXCIpO1xyXG4gICAgICAgIHRleHQxLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQod2VhcG9uTWVzc2FnZS5FeGNsdXNpdmVXZWFwb25TdHJlbmd0aGVuSURfMSk7XHJcbiAgICAgICAgdGV4dDIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh3ZWFwb25NZXNzYWdlLkV4Y2x1c2l2ZVdlYXBvblN0cmVuZ3RoZW5JRF8yKTtcclxuICAgICAgICB0ZXh0My5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHdlYXBvbk1lc3NhZ2UuRXhjbHVzaXZlV2VhcG9uU3RyZW5ndGhlbklEXzMpO1xyXG5cclxuICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPj0gMTApe1xyXG4gICAgICAgICAgICB0ZXh0MS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmV4Y2x1c2l2ZV93ZWFwb25fdWkuZ2V0U3ByaXRlRnJhbWUoXCJFeGNsdXNpdmVfSW5mb18xXCIpXHJcbiAgICAgICAgICAgIHRleHQxLmNvbG9yID0gY2MuY29sb3IoMTM3LDIzMywyMzcpO1xyXG4gICAgICAgICAgICB0ZXh0MS5hZGRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDMyLDM2LDU1KTtcclxuICAgICAgICAgICAgdGV4dDEuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkud2lkdGggPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPj0gMjApe1xyXG4gICAgICAgICAgICB0ZXh0Mi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmV4Y2x1c2l2ZV93ZWFwb25fdWkuZ2V0U3ByaXRlRnJhbWUoXCJFeGNsdXNpdmVfSW5mb18xXCIpXHJcbiAgICAgICAgICAgIHRleHQyLmNvbG9yID0gY2MuY29sb3IoMTM3LDIzMywyMzcpO1xyXG4gICAgICAgICAgICB0ZXh0Mi5hZGRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDMyLDM2LDU1KTtcclxuICAgICAgICAgICAgdGV4dDIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkud2lkdGggPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPj0gMzApe1xyXG4gICAgICAgICAgICB0ZXh0My5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmV4Y2x1c2l2ZV93ZWFwb25fdWkuZ2V0U3ByaXRlRnJhbWUoXCJFeGNsdXNpdmVfSW5mb18xXCIpXHJcbiAgICAgICAgICAgIHRleHQzLmNvbG9yID0gY2MuY29sb3IoMTM3LDIzMywyMzcpO1xyXG4gICAgICAgICAgICB0ZXh0My5hZGRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDMyLDM2LDU1KTtcclxuICAgICAgICAgICAgdGV4dDMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkud2lkdGggPSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQnRuU3RyZW5ndGhlbmluZygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkoe1xyXG4gICAgICAgIC8vICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSx0aGlzLmhlcm9fdHlwZSxmYWxzZSk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5FeGNsdXNpdmVTdHJlbmd0aGVuaW5nLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlLGZhbHNlKTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=