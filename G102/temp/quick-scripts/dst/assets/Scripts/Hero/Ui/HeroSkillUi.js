
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/HeroSkillUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c88ebcDlBKOqaIpdfQqHe8', 'HeroSkillUi');
// Scripts/Hero/Ui/HeroSkillUi.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var SkillConfiguration_1 = require("../../Hero/Data/SkillConfiguration");
var SkillLevelUnlock_1 = require("../../Hero/Data/SkillLevelUnlock");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../../UI/UIComponent");
var HeroAttribute_1 = require("../Data/HeroAttribute");
var HeroBaseInfo_1 = require("../Data/HeroBaseInfo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroSkillUi = /** @class */ (function (_super) {
    __extends(HeroSkillUi, _super);
    function HeroSkillUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.skill_pos = 1;
        _this.replace = ['~a', '~b', '~c', '~d', '~e'];
        _this.replaces = ['~z', '~y', '~x', '~w', '~v'];
        return _this;
    }
    HeroSkillUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    HeroSkillUi.prototype.initData = function (heroType, skillPos) {
        this.hero_type = heroType;
        this.skill_pos = Number(skillPos);
        this.refreshUi();
    };
    HeroSkillUi.prototype.refreshUi = function () {
        var root = this.node.getChildByName("Common_TextBG");
        var titleStr = "";
        var contentStr = "";
        switch (this.skill_pos) {
            case 1:
                titleStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getSkillText_ID(this.hero_type));
                contentStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getSkillDescription(this.hero_type));
                break;
            case 2:
                titleStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveIntro_1(this.hero_type));
                contentStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveDescription_1(this.hero_type));
                break;
            case 3:
                titleStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveIntro_2(this.hero_type));
                contentStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveDescription_2(this.hero_type));
                break;
            case 4:
                titleStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveIntro_3(this.hero_type));
                contentStr = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getPassiveDescription_3(this.hero_type));
                break;
        }
        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(this.skill_pos)) {
            var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type));
            star++;
            titleStr += "<color=#4FFF46>(Lv." + star + ")</c>";
            root.getChildByName("skill2").getComponent(TextLanguage_1.default).setTextId(120023);
            root.getChildByName("skill2").getComponent(TextLanguage_1.default).setReplaceValue('~', star + '');
        }
        else {
            titleStr += LanguageManager_1.default.getInstance().getStrByTextId(720001);
            root.getChildByName("skill2").getComponent(TextLanguage_1.default).setTextId(120022);
            root.getChildByName("skill2").getComponent(TextLanguage_1.default).setReplaceValue('~', SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(this.skill_pos) + '');
        }
        var skillLevel = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type)) + 1;
        var skillId = SkillConfiguration_1.SkillConfigurationManager.GetSkillId(this.hero_type, this.skill_pos, skillLevel);
        contentStr = contentStr.replace(this.replace[0], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_1(skillId), 2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_2(skillId), 2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_3(skillId), 2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_4(skillId), 2) + '');
        contentStr = contentStr.replace(this.replace[4], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getColdDown(skillId), 2) + '');
        contentStr = contentStr.replace(this.replaces[0], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_1(skillId) * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_2(skillId) * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_3(skillId) * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getSkillValue_4(skillId) * 100, 2) + '');
        contentStr = contentStr.replace(this.replaces[4], MyTool_1.default.numberFormat(SkillConfiguration_1.SkillConfigurationManager.getInstance().getColdDown(skillId) * 100, 2) + '');
        root.getChildByName("title").getComponent(cc.RichText).string = titleStr;
        root.getChildByName("skill1").getComponent(cc.RichText).string = contentStr;
        // let root = this.node.getChildByName("Common_TextBG");
        // root.getChildByName("title").getComponent(TextLanguage).setTextId
        // (SkillConfigurationManager.getInstance().getSkillsName(this.getHeroSkillId(HeroManager.getInstance()
        // .getHeroLevel(this.hero_type))));
        // root.getChildByName("title").getComponent(TextLanguage).setReplaceValue
        // ('~',SkillLevelUnlockManager.getInstance().getSkillLevel(this.skill_pos, 
        //     HeroManager.getInstance().getHeroLevel(this.hero_type)) + '');
        // root.getChildByName("skill1").getComponent(cc.RichText).string = "<b>" + 
        // LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        // getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,1)))) + "</b>";
        // let isBool = true;
        // if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,2)){
        //     if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,3)){
        //         root.getChildByName("skill2").getComponent(cc.RichText).string = "<b>" +  
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,2)))) + "</b>";
        //     }else{
        //         root.getChildByName("skill2").getComponent(cc.RichText).string = "<b>" +  "<color=#E6E086>" +
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,2)))) + "</color>" + "</b>";
        //     }
        // }else{
        //     root.getChildByName("skill2").getComponent(cc.RichText).string = "<b>" +  "<color=#747474>" +
        //     LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //     getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,2)))) + "</color>" + "</b>";
        //     if(isBool){
        //         root.getChildByName("skill2").getComponent(cc.RichText).string += 
        //         this.replaceStr(LanguageManager.getInstance().getStrByTextId(100050),SkillLevelUnlockManager.
        //         getInstance().getUnlockLevelBySkill(this.skill_pos,2) + '');
        //         isBool = false;
        //     }
        // }
        // if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,3)){
        //     if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,4)){
        //         root.getChildByName("skill3").getComponent(cc.RichText).string = "<b>" +  
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,3)))) + "</b>";
        //     }else{
        //         root.getChildByName("skill3").getComponent(cc.RichText).string = "<b>" +  "<color=#E6E086>" +
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,3)))) + "</color>" + "</b>";
        //     }
        // }else{
        //     root.getChildByName("skill3").getComponent(cc.RichText).string = "<b>" +  "<color=#747474>" +
        //     LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //     getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,3)))) + "</color>" + "</b>";
        //     if(isBool){
        //         root.getChildByName("skill3").getComponent(cc.RichText).string += 
        //         this.replaceStr(LanguageManager.getInstance().getStrByTextId(100050),SkillLevelUnlockManager.
        //         getInstance().getUnlockLevelBySkill(this.skill_pos,3) + '');
        //         isBool = false;
        //     }
        // }
        // if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,4)){
        //     if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,5)){
        //         root.getChildByName("skill4").getComponent(cc.RichText).string = "<b>" +  
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,4)))) + "</b>";
        //     }else{
        //         root.getChildByName("skill4").getComponent(cc.RichText).string =  "<b>" +  "<color=#E6E086>" +
        //         LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //         getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,4)))) + "</color>" + "</b>";
        //     }
        // }else{
        //     root.getChildByName("skill4").getComponent(cc.RichText).string =  "<b>" +  "<color=#747474>" +
        //     LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //     getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,4)))) + "</color>" + "</b>";
        //     if(isBool){
        //         root.getChildByName("skill4").getComponent(cc.RichText).string += 
        //         this.replaceStr(LanguageManager.getInstance().getStrByTextId(100050),SkillLevelUnlockManager.
        //         getInstance().getUnlockLevelBySkill(this.skill_pos,4) + '');
        //         isBool = false;
        //     }
        // }
        // if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,5)){
        //     root.getChildByName("skill5").getComponent(cc.RichText).string =  "<b>" +  "<color=#E6E086>" +
        //     LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //     getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,5)))) + "</color>" + "</b>";
        // }else{
        //     root.getChildByName("skill5").getComponent(cc.RichText).string =  "<b>" +  "<color=#747474>" +
        //     LanguageManager.getInstance().getStrByTextId(SkillConfigurationManager.getInstance().
        //     getSkillsText(this.getHeroSkillId(SkillLevelUnlockManager.getInstance().getUnlockLevelBySkill(this.skill_pos,5)))) + "</color>" + "</b>";
        //     if(isBool){
        //         root.getChildByName("skill5").getComponent(cc.RichText).string += 
        //         this.replaceStr(LanguageManager.getInstance().getStrByTextId(100050),SkillLevelUnlockManager.
        //         getInstance().getUnlockLevelBySkill(this.skill_pos,5) + '');
        //         isBool = false;
        //     }
        // }
    };
    HeroSkillUi.prototype.getHeroSkillId = function (heroLevel) {
        // return this.hero_type*1000+(this.skill_pos * 100 + SkillLevelUnlockManager.getInstance().getSkillLevel(this.skill_pos, heroLevel));
    };
    HeroSkillUi.prototype.replaceStr = function (str1, str2) {
        return str1.replace('~', str2);
    };
    HeroSkillUi = __decorate([
        ccclass
    ], HeroSkillUi);
    return HeroSkillUi;
}(UIComponent_1.default));
exports.default = HeroSkillUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEhlcm9Ta2lsbFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUEwRDtBQUMxRCx5RUFBK0U7QUFDL0UscUVBQTJFO0FBQzNFLHlEQUF1RDtBQUN2RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELDZDQUF3QztBQUN4QyxvREFBK0M7QUFFL0MsdURBQTZEO0FBQzdELHFEQUEyRDtBQUdyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQStLQztRQTdLRyxlQUFTLEdBQWEsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDckMsZUFBUyxHQUFVLENBQUMsQ0FBQztRQUVyQixhQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEMsY0FBUSxHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFBOztJQXlLekMsQ0FBQztJQXhLRywwQkFBSSxHQUFKLFVBQUssSUFBYztRQUNmLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLFFBQWtCLEVBQUMsUUFBZTtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFFSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFl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Q0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0ksVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0ksVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFM0ksVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEosVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RKLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUks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UixJQUFJO0lBRVIsQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxTQUFnQjtRQUMzQixzSUFBc0k7SUFDMUksQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFXLEVBQUMsSUFBVztRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUE3S2dCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErSy9CO0lBQUQsa0JBQUM7Q0EvS0QsQUErS0MsQ0EvS3dDLHFCQUFXLEdBK0tuRDtrQkEvS29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvU2tpbGxDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9Ta2lsbExldmVsVW5sb2NrXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBIZXJvQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9BdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb1NraWxsVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZSA9IEhlcm9fVHlwZS5OVUxMO1xyXG4gICAgc2tpbGxfcG9zOm51bWJlciA9IDE7XHJcbiAgICBcclxuICAgIHJlcGxhY2UgPSBbJ35hJywnfmInLCd+YycsJ35kJywnfmUnXVxyXG4gICAgcmVwbGFjZXMgPSBbJ356JywnfnknLCd+eCcsJ353JywnfnYnXVxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEoaGVyb1R5cGU6SGVyb19UeXBlLHNraWxsUG9zOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGUgPSBoZXJvVHlwZTtcclxuICAgICAgICB0aGlzLnNraWxsX3BvcyA9IE51bWJlcihza2lsbFBvcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuXHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJDb21tb25fVGV4dEJHXCIpO1xyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnNraWxsX3Bvcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRpdGxlU3RyID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsVGV4dF9JRCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudFN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbERlc2NyaXB0aW9uKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aXRsZVN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzaXZlSW50cm9fMSh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudFN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzaXZlRGVzY3JpcHRpb25fMSh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRpdGxlU3RyID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpdmVJbnRyb18yKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50U3RyID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpdmVEZXNjcmlwdGlvbl8yKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGl0bGVTdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc2l2ZUludHJvXzModGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc2l2ZURlc2NyaXB0aW9uXzModGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5za2lsbF9wb3MpKXtcclxuICAgICAgICAgICAgbGV0IHN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKVxyXG4gICAgICAgICAgICBzdGFyICsrO1xyXG4gICAgICAgICAgICB0aXRsZVN0ciArPSBcIjxjb2xvcj0jNEZGRjQ2PihMdi5cIitzdGFyK1wiKTwvYz5cIjtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsMlwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTIwMDIzKTtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsMlwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLHN0YXIgKyAnJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpdGxlU3RyICs9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDcyMDAwMSk7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDJcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEyMDAyMik7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDJcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JyxTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLnNraWxsX3BvcykgKyAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBza2lsbExldmVsID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSkgKyAxO1xyXG4gICAgICAgIGxldCBza2lsbElkID0gU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5HZXRTa2lsbElkKHRoaXMuaGVyb190eXBlLHRoaXMuc2tpbGxfcG9zLHNraWxsTGV2ZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UodGhpcy5yZXBsYWNlWzBdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbFZhbHVlXzEoc2tpbGxJZCksMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VbMV0sIE15VG9vbC5udW1iZXJGb3JtYXQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsVmFsdWVfMihza2lsbElkKSwyKSArICcnKTtcclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZVsyXSwgTXlUb29sLm51bWJlckZvcm1hdChTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxWYWx1ZV8zKHNraWxsSWQpLDIpICsgJycpO1xyXG4gICAgICAgIGNvbnRlbnRTdHIgPSBjb250ZW50U3RyLnJlcGxhY2UodGhpcy5yZXBsYWNlWzNdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbFZhbHVlXzQoc2tpbGxJZCksMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VbNF0sIE15VG9vbC5udW1iZXJGb3JtYXQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbGREb3duKHNraWxsSWQpLDIpICsgJycpO1xyXG5cclxuICAgICAgICBjb250ZW50U3RyID0gY29udGVudFN0ci5yZXBsYWNlKHRoaXMucmVwbGFjZXNbMF0sIE15VG9vbC5udW1iZXJGb3JtYXQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsVmFsdWVfMShza2lsbElkKSAqIDEwMCkgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VzWzFdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbFZhbHVlXzIoc2tpbGxJZCkgKiAxMDAsMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VzWzJdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbFZhbHVlXzMoc2tpbGxJZCkgKiAxMDAsMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VzWzNdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbFZhbHVlXzQoc2tpbGxJZCkgKiAxMDAsMikgKyAnJyk7XHJcbiAgICAgICAgY29udGVudFN0ciA9IGNvbnRlbnRTdHIucmVwbGFjZSh0aGlzLnJlcGxhY2VzWzRdLCBNeVRvb2wubnVtYmVyRm9ybWF0KFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb2xkRG93bihza2lsbElkKSAqIDEwMCwyKSArICcnKTtcclxuXHJcbiAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gdGl0bGVTdHI7XHJcblxyXG4gICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDFcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBjb250ZW50U3RyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKTtcclxuICAgICAgICAvLyByb290LmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkXHJcbiAgICAgICAgLy8gKFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbHNOYW1lKHRoaXMuZ2V0SGVyb1NraWxsSWQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKVxyXG4gICAgICAgIC8vIC5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKSkpO1xyXG4gICAgICAgIC8vIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWVcclxuICAgICAgICAvLyAoJ34nLFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxMZXZlbCh0aGlzLnNraWxsX3BvcywgXHJcbiAgICAgICAgLy8gICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSkgKyAnJyk7XHJcbiAgICAgICAgLy8gcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsMVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiPGI+XCIgKyBcclxuICAgICAgICAvLyBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuXHJcbiAgICAgICAgLy8gZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDEpKSkpICsgXCI8L2I+XCI7XHJcblxyXG4gICAgICAgIC8vIGxldCBpc0Jvb2wgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSA+PSBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywyKSl7XHJcbiAgICAgICAgLy8gICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSA+PSBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywzKSl7XHJcbiAgICAgICAgLy8gICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwic2tpbGwyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI8Yj5cIiArICBcclxuICAgICAgICAvLyAgICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5cclxuICAgICAgICAvLyAgICAgICAgIGdldFNraWxsc1RleHQodGhpcy5nZXRIZXJvU2tpbGxJZChTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywyKSkpKSArIFwiPC9iPlwiO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxiPlwiICsgIFwiPGNvbG9yPSNFNkUwODY+XCIgK1xyXG4gICAgICAgIC8vICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgIC8vICAgICAgICAgZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDIpKSkpICsgXCI8L2NvbG9yPlwiICsgXCI8L2I+XCI7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsMlwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiPGI+XCIgKyAgXCI8Y29sb3I9Izc0NzQ3ND5cIiArXHJcbiAgICAgICAgLy8gICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5cclxuICAgICAgICAvLyAgICAgZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDIpKSkpICsgXCI8L2NvbG9yPlwiICsgXCI8L2I+XCI7XHJcbiAgICAgICAgLy8gICAgIGlmKGlzQm9vbCl7XHJcbiAgICAgICAgLy8gICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwic2tpbGwyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nICs9IFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yZXBsYWNlU3RyKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MCksU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuXHJcbiAgICAgICAgLy8gICAgICAgICBnZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywyKSArICcnKTtcclxuICAgICAgICAvLyAgICAgICAgIGlzQm9vbCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsMykpe1xyXG4gICAgICAgIC8vICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsNCkpe1xyXG4gICAgICAgIC8vICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsM1wiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiPGI+XCIgKyAgXHJcbiAgICAgICAgLy8gICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuXHJcbiAgICAgICAgLy8gICAgICAgICBnZXRTa2lsbHNUZXh0KHRoaXMuZ2V0SGVyb1NraWxsSWQoU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsMykpKSkgKyBcIjwvYj5cIjtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwic2tpbGwzXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI8Yj5cIiArICBcIjxjb2xvcj0jRTZFMDg2PlwiICtcclxuICAgICAgICAvLyAgICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5cclxuICAgICAgICAvLyAgICAgICAgIGdldFNraWxsc1RleHQodGhpcy5nZXRIZXJvU2tpbGxJZChTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywzKSkpKSArIFwiPC9jb2xvcj5cIiArIFwiPC9iPlwiO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDNcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxiPlwiICsgIFwiPGNvbG9yPSM3NDc0NzQ+XCIgK1xyXG4gICAgICAgIC8vICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuXHJcbiAgICAgICAgLy8gICAgIGdldFNraWxsc1RleHQodGhpcy5nZXRIZXJvU2tpbGxJZChTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3BvcywzKSkpKSArIFwiPC9jb2xvcj5cIiArIFwiPC9iPlwiO1xyXG4gICAgICAgIC8vICAgICBpZihpc0Jvb2wpe1xyXG4gICAgICAgIC8vICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsM1wiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVwbGFjZVN0cihMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTApLFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLlxyXG4gICAgICAgIC8vICAgICAgICAgZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsMykgKyAnJyk7XHJcbiAgICAgICAgLy8gICAgICAgICBpc0Jvb2wgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID49IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDQpKXtcclxuICAgICAgICAvLyAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID49IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDUpKXtcclxuICAgICAgICAvLyAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDRcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxiPlwiICsgIFxyXG4gICAgICAgIC8vICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgIC8vICAgICAgICAgZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDQpKSkpICsgXCI8L2I+XCI7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsNFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9ICBcIjxiPlwiICsgIFwiPGNvbG9yPSNFNkUwODY+XCIgK1xyXG4gICAgICAgIC8vICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgIC8vICAgICAgICAgZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDQpKSkpICsgXCI8L2NvbG9yPlwiICsgXCI8L2I+XCI7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsNFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9ICBcIjxiPlwiICsgIFwiPGNvbG9yPSM3NDc0NzQ+XCIgK1xyXG4gICAgICAgIC8vICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuXHJcbiAgICAgICAgLy8gICAgIGdldFNraWxsc1RleHQodGhpcy5nZXRIZXJvU2tpbGxJZChTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0xldmVsQnlTa2lsbCh0aGlzLnNraWxsX3Bvcyw0KSkpKSArIFwiPC9jb2xvcj5cIiArIFwiPC9iPlwiO1xyXG4gICAgICAgIC8vICAgICBpZihpc0Jvb2wpe1xyXG4gICAgICAgIC8vICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraWxsNFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVwbGFjZVN0cihMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTApLFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLlxyXG4gICAgICAgIC8vICAgICAgICAgZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsNCkgKyAnJyk7XHJcbiAgICAgICAgLy8gICAgICAgICBpc0Jvb2wgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsNSkpe1xyXG4gICAgICAgIC8vICAgICByb290LmdldENoaWxkQnlOYW1lKFwic2tpbGw1XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gIFwiPGI+XCIgKyAgXCI8Y29sb3I9I0U2RTA4Nj5cIiArXHJcbiAgICAgICAgLy8gICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5cclxuICAgICAgICAvLyAgICAgZ2V0U2tpbGxzVGV4dCh0aGlzLmdldEhlcm9Ta2lsbElkKFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDUpKSkpICsgXCI8L2NvbG9yPlwiICsgXCI8L2I+XCI7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDVcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSAgXCI8Yj5cIiArICBcIjxjb2xvcj0jNzQ3NDc0PlwiICtcclxuICAgICAgICAvLyAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgIC8vICAgICBnZXRTa2lsbHNUZXh0KHRoaXMuZ2V0SGVyb1NraWxsSWQoU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tMZXZlbEJ5U2tpbGwodGhpcy5za2lsbF9wb3MsNSkpKSkgKyBcIjwvY29sb3I+XCIgKyBcIjwvYj5cIjtcclxuICAgICAgICAvLyAgICAgaWYoaXNCb29sKXtcclxuICAgICAgICAvLyAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbDVcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgKz0gXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlcGxhY2VTdHIoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUwKSxTa2lsbExldmVsVW5sb2NrTWFuYWdlci5cclxuICAgICAgICAvLyAgICAgICAgIGdldEluc3RhbmNlKCkuZ2V0VW5sb2NrTGV2ZWxCeVNraWxsKHRoaXMuc2tpbGxfcG9zLDUpICsgJycpO1xyXG4gICAgICAgIC8vICAgICAgICAgaXNCb29sID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9Ta2lsbElkKGhlcm9MZXZlbDpudW1iZXIpe1xyXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmhlcm9fdHlwZSoxMDAwKyh0aGlzLnNraWxsX3BvcyAqIDEwMCArIFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxMZXZlbCh0aGlzLnNraWxsX3BvcywgaGVyb0xldmVsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVwbGFjZVN0cihzdHIxOnN0cmluZyxzdHIyOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBzdHIxLnJlcGxhY2UoJ34nLHN0cjIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=