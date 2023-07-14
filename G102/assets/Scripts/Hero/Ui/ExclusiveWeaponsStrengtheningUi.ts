import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../Data/HeroManager";
import { Hero_Type } from "../Game/HeroConfig";
import { ExclusiveEnhancementManager } from "../../JsonData/ExclusiveEnhancement";
import { ExclusiveWeaponMessageManager } from "../../JsonData/ExclusiveWeaponMessage";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExclusiveWeaponsStrengtheningUi extends UIComponent {

    hero_type:Hero_Type = Hero_Type.NULL;
    is_activation:boolean = false;

    @property(cc.SpriteAtlas)
    exclusive_weapons_strengthening_ui:cc.SpriteAtlas = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);
        let canvas = cc.find("Canvas")
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
    }

    initData(heroType:Hero_Type,isActiVation:boolean = false){
        this.hero_type = heroType;
        this.is_activation = isActiVation;
        this.refreshUi();
    }

    refreshUi(){
        if(this.is_activation){
            this.refreshActivationUi()
        }else{
            this.refreshStrengtheningUi();
        }
    }

    refreshActivationUi(){
        let top = this.node.getChildByName("top");
        let bottom = this.node.getChildByName("bottom");        
        let data=HeroManager.getInstance().checkExclusive(this.hero_type);
        // if(weaponData == null){
        //     weaponData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroData.exclusive_equip_level);
        // }
        let weaponMessage = ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        top.getChildByName("name").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_"+this.hero_type);
        bottom.getChildByName("Exclusive_Stone_Bg_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Stone_Bg_" + ItemManager.getInstance().getQuality(data.cost_prop_id));
        bottom.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_" + data.cost_prop_id);
        bottom.getChildByName("itemNum").getComponent(cc.Label).string = data.cur_prop_num + "/" + data.cost_prop_num;

        if(!data.is_can_up){
            bottom.getChildByName("itemNum").color = cc.Color.RED;
        }

        bottom.getChildByName("strengthening").active = false;
        let unlock = bottom.getChildByName("unlock")
        unlock.active = true;
        unlock.getChildByName("sikllIcon").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Skill_" + this.hero_type);
        unlock.getChildByName("skillName").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponSkillID);
        unlock.getChildByName("skillDes").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponSkillDescription);

        let content = unlock.getChildByName("scroll").getComponent(cc.ScrollView).content
        let text1 = content.getChildByName("levelDes1");
        let text2 = content.getChildByName("levelDes2");
        let text3 = content.getChildByName("levelDes3");
        text1.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        text2.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        text3.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
    }

    refreshStrengtheningUi(){
        let top = this.node.getChildByName("top");
        let bottom = this.node.getChildByName("bottom");
        let heroInfo = HeroManager.getInstance().getHeroInfo(this.hero_type);
        bottom.getChildByName("unlock").active = false;
        let strengthening = bottom.getChildByName("strengthening")
        let notOver = strengthening.getChildByName("notOver");
        let over = strengthening.getChildByName("over");
        if(heroInfo.exclusive_equip_stage >= 30){
            HeroManager.getInstance().setExclusiveEquipLevel(this.hero_type,30);
            strengthening.getComponentInChildren(cc.Button).interactable = false;
            strengthening.getComponentInChildren(cc.Button).node.getComponentInChildren(TextLanguage).setTextId(120010);
            strengthening.getChildByName("over").active = true;
            notOver.active = false;
            let weaponNowData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroInfo.exclusive_equip_stage);
            over.getChildByName("cur1").getComponent(cc.Label).string = "+" + heroInfo.exclusive_equip_stage;
            over.getChildByName("cur2").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Health * 100,2) + "%";
            over.getChildByName("cur3").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Attack * 100,2) + "%";
            over.getChildByName("cur4").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Defense * 100,2) + "%";
            switch(weaponNowData.AuxiliaryAttributeReading){
                case 1:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110019)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Critical;
                    break;
                case 2:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110017)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Hit;
                    break;
                case 3:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110018)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Miss * 100,2) + "%";
                    break;
                case 4:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110020)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.ExtraCritical * 100,2) + "%";
                    break;
                case 5:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110021)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.AntiCritical * 100,2);
                    break;
                case 6:
                    strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110022)
                    over.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.AntiExtraCritical * 100,2) + "%";
                    break;
            }
            bottom.getChildByName("Exclusive_Stone_Bg_1").active = false;
            bottom.getChildByName("costIcon").active = false;
            bottom.getChildByName("Exclusive_Stone_Bg_0").active = false;
            bottom.getChildByName("itemNum").active = false;
            this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_"+this.hero_type);
            return;
        }
        let weaponNowData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroInfo.exclusive_equip_stage);
        let weaponNextData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroInfo.exclusive_equip_stage+1);
        let weaponMessage = ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);

        top.getChildByName("name").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("Exclusive_Weapon_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Weapon_"+this.hero_type);
        bottom.getChildByName("Exclusive_Stone_Bg_1").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapons_strengthening_ui.getSpriteFrame("Exclusive_Stone_Bg_" + ItemManager.getInstance().getQuality(weaponNowData.SpendPropID));
        bottom.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_" + weaponNowData.SpendPropID);
        bottom.getChildByName("itemNum").getComponent(cc.Label).string = PropManager.getInstance().getPropNum(weaponNowData.SpendPropID) + "/" + weaponNowData.SpendPropNum;

        strengthening.active = true;
        over.active = false;

        notOver.active = true;
        notOver.getChildByName("cur1").getComponent(cc.Label).string = "+" + heroInfo.exclusive_equip_stage;
        notOver.getChildByName("cur2").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Health * 100,2) + "%";
        notOver.getChildByName("cur3").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Attack * 100,2) + "%";
        notOver.getChildByName("cur4").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Defense * 100,2) + "%";
        // console.log("typeof:" + typeof(weaponNowData.AuxiliaryAttributeReading),weaponNowData.AuxiliaryAttributeReading);
        
        notOver.getChildByName("next1").getComponent(cc.Label).string = "+" + (heroInfo.exclusive_equip_stage + 1);
        notOver.getChildByName("next2").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.Health * 100,2) + "%";
        notOver.getChildByName("next3").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.Attack * 100,2) + "%";
        notOver.getChildByName("next4").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.Defense * 100,2) + "%";
        
        
        switch(weaponNowData.AuxiliaryAttributeReading){
            case 1:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110019)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Critical;
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + weaponNextData.Critical;
                break;
            case 2:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110017)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + weaponNowData.Hit;
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + weaponNextData.Hit;
                break;
            case 3:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110018)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.Miss * 100,2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.Miss * 100,2);
                break;
            case 4:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110020)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.ExtraCritical * 100,2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.ExtraCritical * 100,2);
                break;
            case 5:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110021)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.AntiCritical * 100,2);
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.AntiCritical * 100,2);
                break;
            case 6:
                strengthening.getChildByName("label5").getComponent(TextLanguage).setTextId(110022)
                notOver.getChildByName("cur5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNowData.AntiExtraCritical * 100,2) + "%";
                notOver.getChildByName("next5").getComponent(cc.Label).string = "+" + MyTool.numberFormat(weaponNextData.AntiExtraCritical * 100,2);
                break;
        }

        if(heroInfo.exclusive_equip_stage < 10){
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage).setReplaceValue("~","10")
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        }
        else if(heroInfo.exclusive_equip_stage < 20){
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage).setReplaceValue("~","20")
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        }
        else if(heroInfo.exclusive_equip_stage < 30){
            strengthening.getChildByName("desLabel1").getComponent(TextLanguage).setReplaceValue("~","30")
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
        }
        else{
            strengthening.getChildByName("desLabel2").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);
        }


    }

    onClickActivationBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
        this.is_activation = false;
        // cc.sys.localStorage.setItem("ExclusiveWeaponLevel_" + this.hero_type,0);
        this.refreshUi();
    }

    onClickStrengtheningBtn(){
        // console.log("点击响应")
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let data=HeroManager.getInstance().checkExclusive(this.hero_type);
        if(data.is_can_up){
            // console.log("强化成功")
            PropManager.getInstance().changePropNum(data.cost_prop_id,-data.cost_prop_num);
            HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
            // cc.sys.localStorage.setItem("ExclusiveWeaponLevel_" + this.hero_type,HeroManager.getInstance().getHeroData(this.hero_type).exclusive_equip_level);
            this.refreshUi();
        }
    }

    onClickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }


}
