"use strict";
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