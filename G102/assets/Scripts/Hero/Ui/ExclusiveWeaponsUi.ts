import ApkManager from "../../Ads/ApkManager";
import ExclusiveEquipItem from "../../Equipment/Ui/ExclusiveEquipItem";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { ExclusiveEnhancementManager } from "../../JsonData/ExclusiveEnhancement";
import { ExclusiveWeaponMessageManager } from "../../JsonData/ExclusiveWeaponMessage";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UiAction } from "../../UI/UiInterface";
import { UIManager } from "../../UI/UIManager";
import ExclusiveWeaponsStrengtheningUi from "./ExclusiveWeaponsStrengtheningUi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExclusiveWeaponsUi extends UIComponent {

    hero_type:Hero_Type = Hero_Type.NULL;

    @property(cc.SpriteAtlas)
    exclusive_weapon_ui:cc.SpriteAtlas = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);

    }

    initData(heroType:Hero_Type){
        this.hero_type = heroType;
        this.refreshUi();
    }

    refreshUi(){
        let heroInfo = HeroManager.getInstance().getHeroInfo(this.hero_type);
        let weaponData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(this.hero_type,heroInfo.exclusive_equip_stage);
        let weaponMessage = ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        this.node.getChildByName("equipName").getComponent(TextLanguage).setTextId(weaponMessage.ExclusiveWeaponNameID);
        this.node.getChildByName("heroDes").getComponent(TextLanguage).setTextId(weaponMessage.HeroExclusive);
        this.node.getChildByName("ATK").getComponent(cc.Label).string = "" + MyTool.numberFormat(weaponData.Attack * HeroManager.getInstance().getHeroZhanli(this.hero_type),2);
        this.node.getChildByName("Hp").getComponent(cc.Label).string = "" + MyTool.numberFormat(weaponData.Health * 100,2) + "%";
        this.node.getChildByName("defence").getComponent(cc.Label).string = "" + MyTool.numberFormat(weaponData.Defense * 100,2) + "%";
        this.node.getChildByName("atk").getComponent(cc.Label).string = "" + MyTool.numberFormat(weaponData.Attack * 100,2) + "%";
        this.node.getChildByName("crit").getComponent(cc.Label).string = "" + MyTool.numberFormat(weaponData.Hit,2);
        this.node.getChildByName("exclusiveEquipItem").getComponent(ExclusiveEquipItem).init(this.hero_type);
        


        this.node.getChildByName("skillName").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponSkillID);
        this.node.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Skill_"+this.hero_type);
        this.node.getChildByName("skillDes").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponSkillDescription);

        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content
        let text1 = content.getChildByName("levelDes1");
        let text2 = content.getChildByName("levelDes2");
        let text3 = content.getChildByName("levelDes3");
        text1.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_1);
        text2.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_2);
        text3.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(weaponMessage.ExclusiveWeaponStrengthenID_3);

        if(heroInfo.exclusive_equip_stage >= 10){
            text1.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1")
            text1.color = cc.color(137,233,237);
            text1.addComponent(cc.LabelOutline).color = cc.color(32,36,55);
            text1.getComponent(cc.LabelOutline).width = 2;
        }
        if(heroInfo.exclusive_equip_stage >= 20){
            text2.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1")
            text2.color = cc.color(137,233,237);
            text2.addComponent(cc.LabelOutline).color = cc.color(32,36,55);
            text2.getComponent(cc.LabelOutline).width = 2;
        }
        if(heroInfo.exclusive_equip_stage >= 30){
            text3.getComponentInChildren(cc.Sprite).spriteFrame = this.exclusive_weapon_ui.getSpriteFrame("Exclusive_Info_1")
            text3.color = cc.color(137,233,237);
            text3.addComponent(cc.LabelOutline).color = cc.color(32,36,55);
            text3.getComponent(cc.LabelOutline).width = 2;
        }
    }

    onClickBtnStrengthening(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsStrengtheningUi({
        //     onClose:()=>{
        //         this.refreshUi();
        //     }
        // },this.hero_type,false);
        UIManager.getInstance().showUiDialog(UIPath.ExclusiveStrengthening,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ExclusiveWeaponsStrengtheningUi).init({
                onClose:()=>{
                    this.refreshUi();
                }
            });
            uiNode.getComponent(ExclusiveWeaponsStrengtheningUi).initData(this.hero_type,false);
        },})
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
