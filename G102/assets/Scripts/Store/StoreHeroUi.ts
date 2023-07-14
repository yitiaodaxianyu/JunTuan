import { HttpManager, AccessName } from "../../NetWork/HttpManager";
import { IsDebug } from "../Constants";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { RewardHeroData } from "../JsonData/LevelJsonData";
import LanguageManager from "../multiLanguage/LanguageManager";
import { ItemManager } from "../Prop/Data/Item";
import { PropAction } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";
import UserData from "../UserData";
import { DrawCardInformationManager } from "./DrawCardInformation";
import StoreHeroIconItem from "./StoreHeroIconItem";
import StoreHeroShowUi from "./StoreHeroShowUi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreHeroUi extends UIComponent {

    @property(cc.Prefab)
    hero_icon_item:cc.Prefab = null;

    rewardList:RewardHeroData[] = [];
    index:number = 0;
    content:cc.Node = null;

    // is_over:boolean = false;

    init(uiAc: UiAction): void {
        super.init(uiAc);
    }
    // todo 传递一个类型判断    1英雄，2装备，3宠物
    initData(rewardList:RewardHeroData[]){
        this.node.getChildByName("bgg").active = true;
        this.rewardList = rewardList;
        this.content = this.node.getChildByName("content");
        this.content.getComponent(cc.Layout).enabled = true;
        this.content.removeAllChildren();
        let showLatter = this.node.getChildByName("showLatter");
        if(rewardList.length == 1){
            this.content.getComponent(cc.Layout).enabled = false;
        }else{
            this.content.getComponent(cc.Layout).enabled = true;
        }
        this.index = 0;
        let prizeHeroData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if(PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1){
            showLatter.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            showLatter.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        }else{
            showLatter.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            showLatter.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }

        if(PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1){
            showLatter.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            showLatter.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        }else{
            showLatter.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            showLatter.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }

        let heroBtn1 = showLatter.getChildByName("btn1");
        let heroBtn10 = showLatter.getChildByName("btn10");
        heroBtn10.getChildByName('red').active=GameData.getInstance().getHeroRecruitingRedTip();
        heroBtn1.off(cc.Node.EventType.TOUCH_END);
        heroBtn10.off(cc.Node.EventType.TOUCH_END);
        heroBtn1.off(cc.Node.EventType.TOUCH_START);
        heroBtn10.off(cc.Node.EventType.TOUCH_START);

        heroBtn1.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.tween(heroBtn1).to(0.2,{scale:0.9}).to(0.2,{scale:1}).start();
        });
        heroBtn10.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.tween(heroBtn10).to(0.2,{scale:0.9}).to(0.2,{scale:1}).start();
        });
        heroBtn1.on(cc.Node.EventType.TOUCH_END,()=>{
            let costId = 0;
            let costNum = 0;
            if(PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1){
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.OneDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
            }else{
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.OneDrawPropsSpend_2;
            }

            if(PropManager.getInstance().getPropNum(costId) < costNum){
                UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }

            // if(IsDebug) costNum = 0;
            HttpManager.post(AccessName.tryPrize,this.getPrizeJsonString(1,1,costId,costNum),true).then((data:any) => {
                if(data){
                    PropManager.getInstance().changePropNum(costId,-costNum);
                    GameManager.getInstance().refreshGemShow();
                    PropManager.getInstance().changePropNum(data[0].dropId,data[0].dropNum);
                    PropManager.getInstance().saveAllPropNum();
                    this.initData(data);

                    // this.onClose();
                    // UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi,UILayerLevel.One,{
                    //     onCompleted:(uiNode)=>{
                    //         uiNode.getComponent(StoreHeroUi).init(null);
                    //         uiNode.getComponent(StoreHeroUi).initData(data);
                    //     },
                    // });
                }
            });
        });
        
        heroBtn10.on(cc.Node.EventType.TOUCH_END,()=>{
            let costId = 0;
            let costNum = 0;
            if(PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1){
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.TenDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
            }else{
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.TenDrawPropsSpend_2;
            }

            if(PropManager.getInstance().getPropNum(costId) < costNum){
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }

            // if(IsDebug) costNum = 0;   
            HttpManager.post(AccessName.tryPrize,this.getPrizeJsonString(2,1,costId,costNum),true).then((data:any) => {
                if(data){
                    PropManager.getInstance().changePropNum(costId,-costNum);
                    GameManager.getInstance().refreshGemShow();
                    let length = data.length;
                    let tempIndex = MyTool.randomRangeInt(0,9);
                    for(let i = 0;i < length;i++){
                        PropManager.getInstance().changePropNum(data[i].dropId,data[i].dropNum);
                    }
                    let temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    PropManager.getInstance().saveAllPropNum();
                    this.initData(data);
                    heroBtn10.getChildByName('red').active=GameData.getInstance().getHeroRecruitingRedTip();
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Shop);
                    // this.onClose();
                    // UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi,UILayerLevel.One,{
                    //     onCompleted:(uiNode)=>{
                    //         uiNode.getComponent(StoreHeroUi).init(null);
                    //         uiNode.getComponent(StoreHeroUi).initData(data);
                    //     },
                    // });
                }
            });
        });
        showLatter.active = false;
        // let bg=this.node.getChildByName('bg');
        // bg.off(cc.Node.EventType.TOUCH_START);
        this.showCard();
    }

    showCard(){
        let item = cc.instantiate(this.hero_icon_item);
        item.name = "item" + this.index;
        let info = ItemManager.getInstance().getJsonItem(this.rewardList[this.index].dropId);
        let card = item.getChildByName("cardBg");
        card.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpFrameByPropType(info.ItemID);
        card.getChildByName("mask").getComponentInChildren(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(info.ItemID);
        card.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Text_Quality_" + info.Quality);
        card.getChildByName("num").getComponent(cc.Label).string = this.rewardList[this.index].dropNum + '';
        item.getChildByName("frontLight").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("DiGuang_" + info.Quality);
        let animation= item.getComponent(cc.Animation);

        if(info.Quality < 3){
            // 普通
            let state = animation.play("store_hero_C");
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ChouKa1);
            if(this.rewardList.length == 1){
                state.speed = 1;
            }else{
                state.speed = 1.8;
            }
        }
        else if(info.Quality == 3){
            // S
            let state = animation.play("store_hero_S");
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Chouka2);
            item.getChildByName("backLight").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("BeiGuang_S");
            item.getChildByName("flowwingLight").getComponent(cc.Animation).play("store_hero_flowwing_light_S");
            if(this.rewardList.length == 1){
                state.speed = 1;
            }else{
                state.speed = 1.8;
            }
        }else{
            // SS
            let state = animation.play("store_hero_SS");
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Chouka2);
            item.getChildByName("backLight").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("BeiGuang_SS");
            item.getChildByName("flowwingLight").getComponent(cc.Animation).play("store_hero_flowwing_light_SS");
            if(this.rewardList.length == 1){
                state.speed = 1;
            }else{
                state.speed = 1.8;
            }
        }
        this.content.addChild(item);
        item.getComponent(StoreHeroIconItem).init(()=>{
            this.showHero();
        })
        this.index ++;
        animation.on("showHero",this.showHero,this);
        if(this.index < this.rewardList.length)
            animation.on("finished",this.showCard,this);
        else{
            this.scheduleOnce(()=>{
                this.node.getChildByName("showLatter").active = true;
                this.node.getChildByName("bgg").active = false;
                this.content.children.forEach((v,k)=>{
                    let button = v.addComponent(cc.Button);
                    button.transition = cc.Button.Transition.SCALE;
                    button.duration = 0.1;
                    button.zoomScale = 0.9;

                    let clickEvent=new cc.Component.EventHandler();
                    clickEvent.target=this.node;
                    clickEvent.component='StoreHeroUi';
                    clickEvent.handler='onItemBtnClick';
                    clickEvent.customEventData = k + '';
                    button.clickEvents.push(clickEvent);
                });
            },0.5);
            // this.scheduleOnce(()=>{
            //     let bg=this.node.getChildByName('bg');
            //     bg.on(cc.Node.EventType.TOUCH_START,()=>{
            //         this.onClose();
            //     },this);
            // },1.5);
        }
    }
    
    showHero(){
        if(this.rewardList[this.index - 1].dropId > 110000 && 
        TheStorageManager.getInstance().getNumber(StorageKey.StoreHeroID + this.rewardList[this.index - 1].dropId % 110000,0) == 0){
            let item = this.content.getChildByName("item" + (this.index - 1));
            item.getComponent(cc.Animation).pause();
            UIManager.getInstance().showUiDialog(UIPath.StoreHeroShowUi,UILayerLevel.Two,{onCompleted:(uiNode)=>{
                uiNode.getComponent(StoreHeroShowUi).init({
                    onClose:()=>{
                        item.getComponent(cc.Animation).resume();
                    }
                });
                uiNode.getComponent(StoreHeroShowUi).initData(this.rewardList[this.index - 1].dropId % 110000);
            }}); 
        }
    }

        /**
     * 
     * @param type 抽奖类型 1-单抽 2-十连抽
     * @param drawTyep 抽奖类型 1-英雄,英雄碎片 2-装备 3-灵宠
     * @param costId 消耗道具id
     * @param costNum 消耗道具数量
     * @returns 
     */
    private getPrizeJsonString(type:number,drawTyep:number,costId:number,costNum:number):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
            type:type,
            drawType:drawTyep,
            itemsId:costId,
            minusNum:costNum,
        });
    }

    onItemBtnClick(e,index:number){
        let i = Number(index);
        UIManager.getInstance().showPropInfo({},PropAction.Look,{
            prop_id: this.rewardList[i].dropId,
            prop_num: this.rewardList[i].dropNum,
        },null,null);
    }

}
