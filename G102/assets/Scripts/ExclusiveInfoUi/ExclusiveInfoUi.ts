import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { HeroBaseInfoManager } from "../Hero/Data/HeroBaseInfo";
import { HeroData } from "../Hero/Data/HeroData";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { EWUnlockCostManager } from "../JsonData/EWUnlockCost";
import { ExclusiveEnhancementManager, JsonExclusiveEnhancement } from "../JsonData/ExclusiveEnhancement";
import { ExclusiveWeaponMessageManager } from "../JsonData/ExclusiveWeaponMessage";
import { ExclusiveWeaponSkillManager, JsonExclusiveWeaponSkill } from "../JsonData/ExclusiveWeaponSkill";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import PetItem from "../Pet/Ui/PetItem";
import { ItemManager } from "../Prop/Data/Item";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { TaskItem } from "../Task/TaskEnum";
import TaskManager from "../Task/TaskManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MyTool from "../Tools/MyTool";
import GetAssetsUi, { GetAssetsType } from "../UI/GetAssetsUi";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExclusiveInfoUi extends UIComponent {

    hero_type:Hero_Type = Hero_Type.NULL;

    replace = ['~a','~b','~c','~d']
    replaces = ['~z','~y','~x','~w']


    initData(heroType:Hero_Type){
        this.hero_type = heroType;
        this.refreshUi();
    }

    refreshUi(){
        let heroInfo = HeroManager.getInstance().getHeroInfo(this.hero_type);
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        let ewShowData = ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(this.hero_type);
        let ewJsonData:JsonExclusiveEnhancement;
        let ewData:HeroData;
        let back = this.node.getChildByName("back");
        let curRoot = back.getChildByName('curRoot');
        let content = back.getChildByName("content");
        let skillInfo:JsonExclusiveWeaponSkill;
        let cost = back.getChildByName("cost").children[0];
        let btns = back.getChildByName("btns");
        let progress = back.getChildByName("progress");
        // 预览处理
        if(heroInfo.exclusive_equip_stage == 0){
            ewJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,ewShowData.MaxStage);
            ewData = HeroManager.getInstance().getExclusiveWeaponData(this.hero_type,ewShowData.MaxStage);
            skillInfo = ExclusiveWeaponSkillManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,ewJsonData.Star+1);
            curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(HeroManager.getInstance().getExclusiveWeaponCombbat(this.hero_type,ewShowData.MaxStage));
            btns.children[0].active = true;
            btns.children[1].active = false;
            progress.active = false;
            cost.children[0].getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_"+heroBaseInfo.ExclusiveWeaponFragment);
            let needNum = EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
            let haveNum = PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
            cost.children[1].getComponent(cc.Label).string = MyTool.getCoinDanwei(haveNum);
            cost.children[2].getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(needNum);
            if(haveNum < needNum){
                cost.children[1].color = cc.color(254,76,76);
            }else{
                cost.children[1].color = cc.color(222,199,166);
            }
        }else{
            ewJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,heroInfo.exclusive_equip_stage);
            ewData = HeroManager.getInstance().getExclusiveWeaponData(this.hero_type,heroInfo.exclusive_equip_stage);
            skillInfo = ExclusiveWeaponSkillManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,ewJsonData.Star+1);
            curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(HeroManager.getInstance().getExclusiveWeaponCombbat(this.hero_type,heroInfo.exclusive_equip_stage));
            btns.children[0].active = false;
            btns.children[1].active = true;
            progress.active = true;
            if(heroInfo.exclusive_equip_stage != ewShowData.MaxStage){
                cost.children[0].getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_"+heroBaseInfo.ExclusiveWeaponFragment);
                let needNum = EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
                let haveNum = PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
                cost.children[1].getComponent(cc.Label).string = MyTool.getCoinDanwei(haveNum);
                cost.children[2].getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(needNum);
                if(haveNum < needNum){
                    cost.children[1].color = cc.color(254,76,76);
                }else{
                    cost.children[1].color = cc.color(222,199,166);
                }
            }
        }
        let itemInfo = ItemManager.getInstance().getJsonItem(heroBaseInfo.FirstExclusiveWeaponID + ewJsonData.Star);
        // 满级处理
        if(heroInfo.exclusive_equip_stage == ewShowData.MaxStage){
            btns.active = false;
            cost.active = false;
            progress.active = false
        }else{
            btns.active = true;
            cost.active = true;
            // progress.active = true;
        }
        // 头部
        curRoot.getChildByName("propRoot").children[0].getComponent(PetItem).init(this.hero_type,itemInfo.ItemID,PropAction.Null);
        let propName = curRoot.getChildByName("propName");
        propName.getComponent(cc.Label).string="["+PropManager.getInstance().getPropQualityName(itemInfo.Quality)+"]"+LanguageManager.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.color=PropManager.getInstance().getPropQualityTextColor(itemInfo.Quality);
        // 内容
        let ATK = content.getChildByName("AKT");
        ATK.children[2].getComponent(cc.Label).string = "+" + MyTool.numberFormat(ewJsonData.Attack * 100,2) + "%(" + MyTool.numberFormat(ewData.total_attack,2) + ")";
        let HP = content.getChildByName("HP");
        HP.children[2].getComponent(cc.Label).string = "+" + MyTool.numberFormat(ewJsonData.Health * 100,2) + "%(" +  MyTool.numberFormat(ewData.total_hp,2) + ")";
        let Defence = content.getChildByName("Defence");
        Defence.children[2].getComponent(cc.Label).string = "+" + MyTool.numberFormat(ewJsonData.Defense * 100,2) + "%(" +  MyTool.numberFormat(ewData.total_defense,2) + ")";

        let skillIcon = content.getChildByName("skillIcon");
        skillIcon.children[0].getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Item_"+ heroBaseInfo.FirstExclusiveWeaponID +"_Skill");
        skillIcon.children[1].children[0].getComponent(TextLanguage).setTextId(ewShowData.ExclusiveWeaponSkillID);
        skillIcon.children[1].children[1].getComponent(cc.Label).string = "(Lv." + (ewJsonData.Star+1) + ")";

        let contentStr = LanguageManager.getInstance().getStrByTextId(ewShowData.ExclusiveWeaponSkillDescription);
        contentStr = contentStr.replace(this.replace[0], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1,2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1,2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1,2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1,2) + '');

        contentStr = contentStr.replace(this.replaces[0], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool.numberFormat(skillInfo.ExclusiveWeaponSkillValue_1 * 100,2) + '');

        content.getChildByName("skillDescription").getComponent(cc.RichText).string = contentStr;
        // 尾部处理 尾部和解锁未解锁有关，所以尾部处理放在了前面
        for(let i = 0;i<5;i++){
            if(ewJsonData.CurrentStage>i){
                progress.getChildByName("circle"+i).active = true;
            }else{
                progress.getChildByName("circle"+i).active = false;
            }
            if(i<4)
                if(ewJsonData.CurrentStage>i+1){
                    progress.getChildByName("bar"+i).active = true;
                }else{
                    progress.getChildByName("bar"+i).active = false;
                }
        }

        let masterKeynum = 0;
        switch(heroBaseInfo.Quality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }

        if(masterKeynum < 1){
            btns.getChildByName("btnReplace").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            btns.getChildByName("btnReplace").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            btns.getChildByName("btnReplace").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            btns.getChildByName("btnReplace").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        let red=btns.getChildByName("redUp");
        red.active=HeroManager.getInstance().checkExUp(this.hero_type);
    }

    onBtnUnlockClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        let costNum = EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality);
        if(PropManager.getInstance().changePropNum(heroBaseInfo.ExclusiveWeaponFragment,-costNum)){
            HeroManager.getInstance().setExclusiveEquipLevel(this.hero_type,1);
            this.refreshUi();
        }else{
            UIManager.getInstance().showUiDialog(UIPath.GetAssetsTip,UILayerLevel.Three,{onCompleted:(uiNode)=>{
                uiNode.getComponent(GetAssetsUi).initData(GetAssetsType.PetAndEquip);
            }});
        }
    }

    onMasterKeyBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let textId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                textId = 1200017;
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                textId = 1200018;
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                textId = 1200019;
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                textId = 1200020;
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                textId = 1200021;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                textId = 1200022;
                break;
        }
        if(masterKeynum < 1){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(textId));
            return;
        }
        this.showExchangeUi();
    }

    showExchangeUi(){
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        let exchange = this.node.getChildByName("exchange");
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroBaseInfo.Quality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                keyId = PropId.ExclusiveWeaponMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                keyId = PropId.ExclusiveWeaponMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                keyId = PropId.ExclusiveWeaponMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                keyId = PropId.ExclusiveWeaponMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                keyId = PropId.ExclusiveWeaponMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                keyId = PropId.ExclusiveWeaponMasterKeySSS;
                break;
        }


        let p1 = PropManager.getInstance().createPropItem(keyId,0);
        let p2 = PropManager.getInstance().createPropItem(heroBaseInfo.ExclusiveWeaponFragment,0);
        exchange.active = true;
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);  
    }

    sliderMoveResponce(slider:cc.Slider){
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }

    onExChangeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                keyId = PropId.ExclusiveWeaponMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                keyId = PropId.ExclusiveWeaponMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                keyId = PropId.ExclusiveWeaponMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                keyId = PropId.ExclusiveWeaponMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                keyId = PropId.ExclusiveWeaponMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                keyId = PropId.ExclusiveWeaponMasterKeySSS;
                break;
        }
        let num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if(num == 0) return;
        PropManager.getInstance().changePropNum(keyId,-num);
        PropManager.getInstance().changePropNum(HeroBaseInfoManager.getInstance().getExclusiveWeaponFragment(this.hero_type),num);
        let item = PropManager.getInstance().createPropItem(HeroBaseInfoManager.getInstance().getExclusiveWeaponFragment(this.hero_type),num);
        GameManager.getInstance().showGetTip(item);
        this.refreshUi();
    }

    onChangeExchangeBtnClick(e,num:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        num = Number(num);
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.ExclusiveWeaponMasterKeySSS);
                break;
        }
        let slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress =  ((slider.progress * masterKeynum) + (1 * num))/masterKeynum;
        if(slider.progress > 1) slider.progress = 1;
        if(slider.progress < 0) slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }

    onCloseExchange(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
    }

    onBtnUpgradeClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        let costNum = EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality);
        if(PropManager.getInstance().changePropNum(heroBaseInfo.ExclusiveWeaponFragment,-costNum)){
            HeroManager.getInstance().addExclusiveEquipLevel(this.hero_type);
            TaskManager.getInstance().emitTask(TaskItem.升级1次专武);
            let newJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,HeroManager.getInstance().getExclusiveEquipLevel(this.hero_type));
            if(newJsonData.CurrentStage == 0){
                this.showUpTip(newJsonData.SumStage);
            }
            this.refreshUi();
        }else{
            UIManager.getInstance().showUiDialog(UIPath.GetAssetsTip,UILayerLevel.Three,{onCompleted:(uiNode)=>{
                uiNode.getComponent(GetAssetsUi).initData(GetAssetsType.PetAndEquip);
            }});
        }
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    showUpTip(sumStage:number){
        let upTip = this.node.getChildByName("upStarTip");
        let oldJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,sumStage-1);
        let newJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,sumStage);
        let oldData = HeroManager.getInstance().getExclusiveWeaponData(this.hero_type,sumStage-1);
        let newData = HeroManager.getInstance().getExclusiveWeaponData(this.hero_type,sumStage);
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        upTip.active = true;
        if(oldJsonData.Star == 0){
            upTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = null;
        }else{
            upTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Hero_Star_" + oldJsonData.Star);
        }
        upTip.getChildByName("oldSkillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Item_"+ heroBaseInfo.FirstExclusiveWeaponID +"_Skill");
        upTip.getChildByName("oldSkillLevel").getComponent(cc.Label).string = "Lv." + (oldJsonData.Star + 1);
        upTip.getChildByName("oldHpNum").getComponent(cc.Label).string = "+" + MyTool.numberFormat(oldJsonData.Attack * 100,2) + "%(" + MyTool.numberFormat(oldData.total_attack,2) + ")";
        upTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = "+" + MyTool.numberFormat(oldJsonData.Health * 100,2) + "%(" +  MyTool.numberFormat(oldData.total_hp,2) + ")";
        upTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = "+" + MyTool.numberFormat(oldJsonData.Defense * 100,2) + "%(" +  MyTool.numberFormat(oldData.total_defense,2) + ")";

        upTip.getChildByName("star").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Hero_Star_" + newJsonData.Star);
        upTip.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Item_"+ heroBaseInfo.FirstExclusiveWeaponID +"_Skill");
        upTip.getChildByName("skillLevel").getComponent(cc.Label).string = "Lv." + (newJsonData.Star + 1);
        upTip.getChildByName("hpNum").getComponent(cc.Label).string =  "+" + MyTool.numberFormat(newJsonData.Attack * 100,2) + "%(" + MyTool.numberFormat(newData.total_attack,2) + ")";
        upTip.getChildByName("atkNum").getComponent(cc.Label).string = "+" + MyTool.numberFormat(newJsonData.Health * 100,2) + "%(" +  MyTool.numberFormat(newData.total_hp,2) + ")";
        upTip.getChildByName("defanceNum").getComponent(cc.Label).string = "+" + MyTool.numberFormat(newJsonData.Defense * 100,2) + "%(" +  MyTool.numberFormat(newData.total_defense,2) + ")";
    }

    closeUpTip(){
        let upTip = this.node.getChildByName("upStarTip");
        upTip.active = false;
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }
    
}
