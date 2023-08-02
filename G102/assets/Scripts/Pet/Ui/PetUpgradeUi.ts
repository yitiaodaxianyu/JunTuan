import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { UIManager } from "../../UI/UIManager";
import { PetInfo } from "../PetConfig";
import { PetManager } from "../PetManager";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import AtrributeUi from "../../UI/home/AtrributeUi";
import WXManagerEX from "../../../startscene/WXManagerEX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetUpgradeUi extends UIComponent {

    @property(cc.SpriteAtlas)
    pet_upgrade_ui : cc.SpriteAtlas = null;

    private pet_info:PetInfo = null;

    init(uiAc: UiAction): void {
        super.init(uiAc)

    }

    initUi(petInfo:PetInfo){
        this.pet_info = petInfo;
        let spRoot = this.node.getChildByName("spRoot");
        let canvas = cc.find("Canvas")
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        this.loadPrefab("" + this.pet_info.pet_id,spRoot);  
        this.refreshUi();
    }

    refreshUi(){
        // let formData = SpiritMessageManager.getInstance().getJsonSpiritMessage(this.pet_info.pet_id);
        let top = this.node.getChildByName("top");
        let bottom = this.node.getChildByName("bottom");
        // PetManager.getInstance().loadPetData(this.pet_info);
        // let data = PetManager.getInstance().getPetData(this.pet_info);
        // let upData = PetManager.getInstance().checkUpgrade(this.pet_info);
        // top.getChildByName("name1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(formData.SpiritName);
        // top.getChildByName("quality").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(SpiritQualityMessageManager.getInstance().getSpiritQualityName(this.pet_info.pet_quality))
        // top.getChildByName("qualityIcon").getComponent(cc.Sprite).spriteFrame = this.pet_upgrade_ui.getSpriteFrame("Sprite_Up_Quality_"+SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.pet_info.pet_quality));
        top.getChildByName("topCoinNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin),1) ;
        top.getChildByName("topGemNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.AnimalFood),1);
        bottom.getChildByName("upgradeBtn").getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640004);
        bottom.getChildByName("advanceLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640005);
        bottom.getChildByName("awakeningLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640006);
        bottom.getChildByName("reduction").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640007);
        bottom.getChildByName("discarded").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640008);

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
    }

    onSkillClick(e,skillSlot:number){
        skillSlot = Number(skillSlot)
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
    }

    onUpgradeBtnClick(){
        let gm = GameManager.getInstance();
        gm.sound_manager.playSound(SoundIndex.click);
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
    }

    onAttributeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // UIManager.getInstance().showAttributeUi(null,null,this.pet_info);
        UIManager.getInstance().showUiDialog(UIPath.Attribute,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(AtrributeUi).init(null);
            uiNode.getComponent(AtrributeUi).initPetInfo(this.pet_info);
        },})
    }

    onClickResetBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.pet_info.pet_level <= 1) return;
        UIManager.getInstance().showPetResetUi({
            onClose:(()=>{
                this.refreshUi();
            }).bind(this)
        },this.pet_info);
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // 暂时在关闭界面时写入整个宠物数组
        // PetManager.getInstance().saveAllPetList();
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }


    loadPrefab(petId: string,parent:cc.Node) {
        WXManagerEX.getInstance().resourcesBundle.load("pet/ui/pet_"+petId, cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                cc.log(error);
                return;
            }
            let node = cc.instantiate(assets)
            node.parent = parent;
            let shadow = node.getChildByName("Sprite_Up_Shadow");
            shadow.parent = parent;
            shadow.scale = node.scale;
            node.zIndex = 1;
            node.setPosition(cc.v2(0,0));
            // node.scale = 0.7;
            let s = node.getComponent(sp.Skeleton);
            s.setAnimation(0,"Side_Idle",true);
        });
    }

}
