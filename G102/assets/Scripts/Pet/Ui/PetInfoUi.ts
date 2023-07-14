import CoinPop from "../../CoinPop";
import { Go_Type } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import Prop from "../../Prop/Prop";
import { PropAction, PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import MyTool from "../../Tools/MyTool";
import GetAssetsUi, { GetAssetsType } from "../../UI/GetAssetsUi";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { JsonSpiritAttribute, SpiritAttributeManager } from "../Data/SpiritAttribute";
import { SpiritCultivateManager } from "../Data/SpiritCultivate";
import { SpiritMessageManager } from "../Data/SpiritMessage";
import { SpiritSkillManager } from "../Data/SpiritSkill";
import Pet from "../Game/Pet";
import { PetManager } from "../PetManager";
import PetExchangeUi from "./PetExchangeUi";
import PetItem from "./PetItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetInfoUi extends UIComponent {

    hero_type:Hero_Type = Hero_Type.NULL;

    replace = ['~a','~b','~c','~d']
    replaces = ['~z','~y','~x','~w']

    initData(heroType:Hero_Type){
        this.hero_type = heroType;
        this.refreshUi();
    }

    refreshUi(){
        let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(HeroManager.getInstance().getWearPet(this.hero_type));
        let itemInfo = ItemManager.getInstance().getJsonItem(petInfo.SpiritItem);
        let back = this.node.getChildByName("back");
        let curRoot = back.getChildByName('curRoot');
        let content = back.getChildByName("content");
        // 头部处理
        curRoot.getChildByName("propRoot").children[0].getComponent(PetItem).init(this.hero_type,itemInfo.ItemID,PropAction.Null);
        let propName = curRoot.getChildByName("propName");
        // propName.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.getComponent(cc.Label).string="["+PropManager.getInstance().getPropQualityName(itemInfo.Quality)+"]"+LanguageManager.getInstance().getStrByTextId(itemInfo.NameTextId);
        propName.color=PropManager.getInstance().getPropQualityTextColor(itemInfo.Quality);
        curRoot.getChildByName("zhanliNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PetManager.getInstance().getPetZhanLi(itemInfo.ItemID));
        // 内容处理
        let ATKAndDefence = content.getChildByName("AKTAndDefence");
        ATKAndDefence.children[2].getComponent(TextLanguage).startTranslation();
        ATKAndDefence.children[2].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Attack,2);
        ATKAndDefence.children[3].getComponent(TextLanguage).startTranslation();
        ATKAndDefence.children[3].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Defense,2);
        let HP = content.getChildByName("HP");
        HP.children[1].getComponent(TextLanguage).startTranslation();
        HP.children[1].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Health,2);
        let HitAndMiss = content.getChildByName("HitAndMiss");
        HitAndMiss.children[2].getComponent(TextLanguage).startTranslation();
        HitAndMiss.children[2].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Hit,2);
        HitAndMiss.children[3].getComponent(TextLanguage).startTranslation();
        HitAndMiss.children[3].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Miss,2);
        let CriticalAndAntiCritical = content.getChildByName("CriticalAndAntiCritical");
        CriticalAndAntiCritical.children[2].getComponent(TextLanguage).startTranslation();
        CriticalAndAntiCritical.children[2].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.Critical,2);
        CriticalAndAntiCritical.children[3].getComponent(TextLanguage).startTranslation();
        CriticalAndAntiCritical.children[3].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.AntiCritical,2);
        let AntiCriticalAndAntiExtraCritical = content.getChildByName("ExtraCriticalAndAntiExtraCritical");
        AntiCriticalAndAntiExtraCritical.children[2].getComponent(TextLanguage).startTranslation();
        AntiCriticalAndAntiExtraCritical.children[2].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.ExtraCritical * 100,2) + "%";
        AntiCriticalAndAntiExtraCritical.children[3].getComponent(TextLanguage).startTranslation();
        AntiCriticalAndAntiExtraCritical.children[3].getComponent(cc.Label).string += ":" + MyTool.numberFormat(petInfo.AntiExtraCritical * 100,2) + "%";
        let skillIcon = content.getChildByName("skillIcon");
        skillIcon.children[0].getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Pet_"+ petInfo.SpiritType +"_Skill_0")
        let petMessage = SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
        skillIcon.children[1].children[0].getComponent(TextLanguage).setTextId(petMessage.SpiritSkillName);
        skillIcon.children[1].children[1].getComponent(cc.Label).string = "(Lv." + (petInfo.Quality - 2) + ")";

        let contentStr = LanguageManager.getInstance().getStrByTextId(petMessage.ActiveSkillsIntro);
        let skillInfo = SpiritSkillManager.getInstance().getJsonByTypeAndLevel(petInfo.SpiritType,petInfo.Quality-2);
        contentStr = contentStr.replace(this.replace[0], MyTool.numberFormat(skillInfo.SkillParameter_1,2) + '');
        contentStr = contentStr.replace(this.replace[1], MyTool.numberFormat(skillInfo.SkillParameter_2,2) + '');
        contentStr = contentStr.replace(this.replace[2], MyTool.numberFormat(skillInfo.SkillParameter_3,2) + '');
        contentStr = contentStr.replace(this.replace[3], MyTool.numberFormat(skillInfo.CoolDown,2) + '');

        contentStr = contentStr.replace(this.replaces[0], MyTool.numberFormat(skillInfo.SkillParameter_1 * 100) + '');
        contentStr = contentStr.replace(this.replaces[1], MyTool.numberFormat(skillInfo.SkillParameter_2 * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[2], MyTool.numberFormat(skillInfo.SkillParameter_3 * 100,2) + '');
        contentStr = contentStr.replace(this.replaces[3], MyTool.numberFormat(skillInfo.CoolDown * 100,2) + '');

        content.getChildByName("skillDescription").getComponent(cc.RichText).string = contentStr;
        // 尾部处理
        let cost = back.getChildByName("cost");
        let btns = back.getChildByName("btns");
        let red=btns.getChildByName("btnMerge").getChildByName("red");
        red.active=PetManager.getInstance().checkRedTip(this.hero_type);
        if(petInfo.Stage >= petMessage.StageLimit){
            cost.active = false;
            btns.children[0].active = false;
            
        }else{
            cost.active = true;
            btns.children[0].active = true;
            let costInfo = SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
            if(costInfo.CoinSpirit == 0){
                cost.children[0].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_20003");
                cost.children[0].getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.AnimalFood));
                if(PropManager.getInstance().getPropNum(PropId.AnimalFood) < costInfo.FoodCost){
                    cost.children[0].getChildByName("haveNum").color = cc.color(254,76,76);
                }else{
                    cost.children[0].getChildByName("haveNum").color = cc.color(222,199,166);
                }
                cost.children[0].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(costInfo.FoodCost);
                cost.children[1].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10001");
                cost.children[1].getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin));
                if(PropManager.getInstance().getPropNum(PropId.Coin) < costInfo.CoinCost){
                    cost.children[1].getChildByName("haveNum").color = cc.color(254,76,76);
                }else{
                    cost.children[1].getChildByName("haveNum").color = cc.color(222,199,166);
                }
                cost.children[1].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(costInfo.CoinCost);
            }else{
                let firstStageInfo = SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);
                cost.children[0].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Icon_Pet_" + petInfo.SpiritType);
                cost.children[0].getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem));
                if(PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) < costInfo.CoinSpirit){
                    cost.children[0].getChildByName("haveNum").color = cc.color(254,76,76);
                }else{
                    cost.children[0].getChildByName("haveNum").color = cc.color(222,199,166);
                }
                cost.children[0].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(costInfo.CoinSpirit);
                cost.children[1].getChildByName("coinIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10002");
                cost.children[1].getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem));
                if(PropManager.getInstance().getPropNum(PropId.Gem) < costInfo.DiamondCost){
                    cost.children[1].getChildByName("haveNum").color = cc.color(254,76,76);
                }else{
                    cost.children[1].getChildByName("haveNum").color = cc.color(222,199,166);
                }
                cost.children[1].getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(costInfo.DiamondCost);
            }
        }

    }

    onClickUnloadBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
        HeroManager.getInstance().unloadWearPet(this.hero_type);
        let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if(oldCombat != newCombat)
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        super.onClose();
    }

    onClickReplaceBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.PetList,UILayerLevel.Three,{
            onCompleted:(uiNode)=>{
                uiNode.getComponent(PetExchangeUi).init({
                    onClose:()=>{
                        this.refreshUi();
                    }
                })
                uiNode.getComponent(PetExchangeUi).initData(HeroManager.getInstance().getWearPet(this.hero_type),this.hero_type)
            }
        });
    }

    onClickSyntheticBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        
        let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(HeroManager.getInstance().getWearPet(this.hero_type));
        let costInfo = SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
        let petMessage = SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
        if(costInfo.CoinSpirit == 0){
            if(PropManager.getInstance().getPropNum(PropId.Coin) < costInfo.CoinCost){
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(CoinPop).init({
                        onClose:()=>{
                            this.refreshUi();
                        }
                    });
                    uiNode.getComponent(CoinPop).initUi(PropId.Coin)
                },});
                return
            }

            if(PropManager.getInstance().getPropNum(PropId.AnimalFood) < costInfo.FoodCost){
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2,2);
                // GameManager.getInstance().game_to_home=Go_Type.City;
                // GameManager.getInstance().jumoAndShowUi();
                // UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
                UIManager.getInstance().showUiDialog(UIPath.GetAssetsTip,UILayerLevel.Three,{onCompleted:(uiNode)=>{
                    uiNode.getComponent(GetAssetsUi).initData(GetAssetsType.PetAndEquip);
                }});
                return
            }

            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

            TaskManager.getInstance().emitTask(TaskItem.升级1次宠物);
            TaskManager.getInstance().emitTask(TaskItem.升级X次灵宠);
            PropManager.getInstance().changePropNum(PropId.AnimalFood,-costInfo.FoodCost);
            PropManager.getInstance().changePropNum(PropId.Coin,-costInfo.CoinCost);
            PropManager.getInstance().changePropNum(petInfo.SpiritItem,-1);
            PropManager.getInstance().changePropNum(petInfo.SpiritItem+1,1);
            HeroManager.getInstance().unloadWearPet(this.hero_type);
            HeroManager.getInstance().addWearPet(this.hero_type,petInfo.SpiritItem+1);
            let newPetInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petInfo.SpiritItem+1);

            let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            if(oldCombat != newCombat)
                UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);

            if(newPetInfo.Stage >= petMessage.StageLimit){
                TaskManager.getInstance().emitTask(TaskItem.累计将X只宠物升至最高品质);
            }
            if(petInfo.Quality != newPetInfo.Quality){
                this.showUpTip(petInfo,newPetInfo);
            }
            this.refreshUi();
        }else{
            let firstStageInfo = SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);
            if( PropManager.getInstance().getPropNum(PropId.Gem)<costInfo.DiamondCost){
                UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(CoinPop).init({
                        onClose:()=>{
                            this.refreshUi();
                        }
                    });
                    uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                },});
                return
            }

            if(PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) < costInfo.CoinSpirit ){
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2,2);
                GameManager.getInstance().game_to_home=Go_Type.City;
                GameManager.getInstance().jumoAndShowUi();
                UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
                return
            }

            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

            TaskManager.getInstance().emitTask(TaskItem.升级1次宠物);
            TaskManager.getInstance().emitTask(TaskItem.升级X次灵宠);
            PropManager.getInstance().changePropNum(firstStageInfo.SpiritItem,-costInfo.CoinSpirit);
            PropManager.getInstance().changePropNum(PropId.Gem,-costInfo.DiamondCost);
            PropManager.getInstance().changePropNum(petInfo.SpiritItem,-1);
            PropManager.getInstance().changePropNum(petInfo.SpiritItem+1,1);
            HeroManager.getInstance().unloadWearPet(this.hero_type);
            HeroManager.getInstance().addWearPet(this.hero_type,petInfo.SpiritItem+1);
            let newPetInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petInfo.SpiritItem+1);

            let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            if(oldCombat != newCombat)
                UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);

            if(newPetInfo.Stage >= petMessage.StageLimit){
                TaskManager.getInstance().emitTask(TaskItem.累计将X只宠物升至最高品质);
            }
            if(petInfo.Quality != newPetInfo.Quality){
                this.showUpTip(petInfo,newPetInfo);
            }
            this.refreshUi();
        }
    }

    showUpTip(oldPetInfo:JsonSpiritAttribute,petInfo:JsonSpiritAttribute){
        let upTip = this.node.getChildByName("upStarTip");
        upTip.active = true;
        upTip.getChildByName("oldNickname").getComponent(cc.Label).string = "["+PropManager.getInstance().getPropQualityName(oldPetInfo.Quality)+"]";
        upTip.getChildByName("oldNickname").color = PropManager.getInstance().getPropQualityTextColor(oldPetInfo.Quality);
        upTip.getChildByName("oldSkillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Pet_"+ oldPetInfo.SpiritType +"_Skill_0")
        upTip.getChildByName("oldSkillLevel").getComponent(cc.Label).string = "Lv." + (oldPetInfo.Quality - 2);
        upTip.getChildByName("oldHpNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(oldPetInfo.Health);
        upTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(oldPetInfo.Attack);
        upTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(oldPetInfo.Defense);

        upTip.getChildByName("nickname").getComponent(cc.Label).string = "["+PropManager.getInstance().getPropQualityName(petInfo.Quality)+"]";
        upTip.getChildByName("nickname").color = PropManager.getInstance().getPropQualityTextColor(petInfo.Quality);
        upTip.getChildByName("skillIcon").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Pet_"+ petInfo.SpiritType +"_Skill_0")
        upTip.getChildByName("skillLevel").getComponent(cc.Label).string = "Lv." + (petInfo.Quality - 2);
        upTip.getChildByName("hpNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(petInfo.Health);
        upTip.getChildByName("atkNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(petInfo.Attack);
        upTip.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(petInfo.Defense);
    }

    hideUpTip(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("upStarTip").active = false;
    }

}
