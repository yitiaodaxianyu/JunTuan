import { HeroManager } from "../../Hero/Data/HeroManager";
import { SkillConfigurationManager } from "../../Hero/Data/SkillConfiguration";
import { SkillLevelUnlockManager } from "../../Hero/Data/SkillLevelUnlock";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { HeroAttributeManager } from "../Data/HeroAttribute";
import { HeroBaseInfoManager } from "../Data/HeroBaseInfo";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroSkillUi extends UIComponent {

    hero_type:Hero_Type = Hero_Type.NULL;
    skill_pos:number = 1;
    
    replace = ['~a','~b','~c','~d','~e']
    replaces = ['~z','~y','~x','~w','~v']
    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    initData(heroType:Hero_Type,skillPos:number){
        this.hero_type = heroType;
        this.skill_pos = Number(skillPos);
        this.refreshUi();
    }

    refreshUi(){

        let root = this.node.getChildByName("Common_TextBG");
        let titleStr = "";
        let contentStr = "";
        switch(this.skill_pos){
            case 1:
                titleStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getSkillText_ID(this.hero_type));
                contentStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getSkillDescription(this.hero_type));
            break;
            case 2:
                titleStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveIntro_1(this.hero_type));
                contentStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveDescription_1(this.hero_type));
                break;
            case 3:
                titleStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveIntro_2(this.hero_type));
                contentStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveDescription_2(this.hero_type));
                break;
            case 4:
                titleStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveIntro_3(this.hero_type));
                contentStr = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getPassiveDescription_3(this.hero_type));
                break;
        }
        if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= SkillLevelUnlockManager.getInstance().getHeroLevel(this.skill_pos)){
            let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,HeroManager.getInstance().getHeroStage(this.hero_type))
            star ++;
            titleStr += "<color=#4FFF46>(Lv."+star+")</c>";
            root.getChildByName("skill2").getComponent(TextLanguage).setTextId(120023);
            root.getChildByName("skill2").getComponent(TextLanguage).setReplaceValue('~',star + '');
        }else{
            titleStr += LanguageManager.getInstance().getStrByTextId(720001);
            root.getChildByName("skill2").getComponent(TextLanguage).setTextId(120022);
            root.getChildByName("skill2").getComponent(TextLanguage).setReplaceValue('~',SkillLevelUnlockManager.getInstance().getHeroLevel(this.skill_pos) + '');
        }
        let skillLevel = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,HeroManager.getInstance().getHeroStage(this.hero_type)) + 1;
        let skillId = SkillConfigurationManager.GetSkillId(this.hero_type,this.skill_pos,skillLevel);
        
        contentStr = contentStr.replace(this.replace[0], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_1(skillId),2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_2(skillId),2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_3(skillId),2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_4(skillId),2) + '');
        contentStr = contentStr.replace(this.replace[4], MyTool.numberFormat(SkillConfigurationManager.getInstance().getColdDown(skillId),2) + '');

        contentStr = contentStr.replace(this.replaces[0], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_1(skillId) * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_2(skillId) * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_3(skillId) * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool.numberFormat(SkillConfigurationManager.getInstance().getSkillValue_4(skillId) * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[4], MyTool.numberFormat(SkillConfigurationManager.getInstance().getColdDown(skillId) * 100,2) + '');

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

    }

    getHeroSkillId(heroLevel:number){
        // return this.hero_type*1000+(this.skill_pos * 100 + SkillLevelUnlockManager.getInstance().getSkillLevel(this.skill_pos, heroLevel));
    }

    replaceStr(str1:string,str2:string):string{
        return str1.replace('~',str2);
    }

}
