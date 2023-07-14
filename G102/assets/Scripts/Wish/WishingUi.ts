
import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { JackpotManager } from "../JsonData/Jackpot";
import { JackpotCollectionManager } from "../JsonData/JackpotCollection";
import { RewardData } from "../JsonData/LevelJsonData";
import { LevelManager } from "../Level/LevelManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PetManager } from "../Pet/PetManager";
import { ItemManager } from "../Prop/Data/Item";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { MusicIndex, SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import TutorailsManager from "../Tutorials/TutorailsManager";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";
import { CumulativeCardManager } from "./CumulativeCard";
import WishingCardUi from "./WishingCardUi";
import { WishSpendManager } from "./WishSpend";

const { ccclass, property } = cc._decorator;

export enum WishingState {
    Odinary = 1,
    Premium = 2
}

@ccclass
export default class WishingUi extends UIComponent {

    wishing_state: WishingState = WishingState.Odinary;
    show_cumulative_tip:boolean = false;

    @property(cc.SpriteAtlas)
    wishing_ui: cc.SpriteAtlas = null;
    @property(cc.Prefab)
    effect:cc.Prefab = null;
    @property(cc.Prefab)
    wishing_card_ui:cc.Prefab=null;

    // protected start(): void{
    //     this.init(null);
    // };

    init(uiAc: UiAction): void {
        super.init(uiAc);
        let canvas = cc.find("Canvas")
        this.node.getChildByName("wishingBg").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;

        let bottom = this.node.getChildByName("bottom")
        this.node.getChildByName("top").getChildByName("cumulativeTipsLabel").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840021);
        

        bottom.getChildByName("Common_Btn_3").getComponentInChildren(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840020);
        bottom.getChildByName("Common_Btn_3 copy").getComponentInChildren(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840010);
        bottom.getChildByName("freeTime").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840014);
        bottom.getChildByName("ordinaryWishing").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840012);
        bottom.getChildByName("premiumWishing").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840013);

        this.onClickRewardBtn(true);
        this.refreshUi();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_XuYuan);
        FollowManager.getInstance().followEvent(Follow_Type.许愿池打开次数);
    }

    protected start(): void {
        if(!TutorailsManager.getInstance().isShowTutorials(209)&&TutorailsManager.getInstance().isShowTutorials(211)){
            TutorailsManager.getInstance().showTutorials(211,null,()=>{
                TutorailsManager.getInstance().saveTutorials(210);
                TutorailsManager.getInstance().saveTutorials(211);
            });
        }
    }

    refreshUi() {
        let top = this.node.getChildByName("top")
        let bottom = this.node.getChildByName("bottom")
        top.getChildByName("gemNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem),1);
        top.getChildByName("ordinaryWishingCoinNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.OrdinaryWishingCoin),1)
        top.getChildByName("premiumWishingCoinNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.PremiumWishingCoin),1)

        if(this.wishing_state == WishingState.Odinary){
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string = 
            LanguageManager.getInstance().getStrByTextId(840030);
        }else{
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string = 
            LanguageManager.getInstance().getStrByTextId(840011);
        }

        if(this.wishing_state == WishingState.Odinary){
            // 普通
            // 单发
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_1");
            if (PropManager.getInstance().getPropNum(PropId.OrdinaryWishingCoin) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40005")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getOneDrawPropsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            } else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10002")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getOneDrawDiamondsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            }
            // 十连
            if (PropManager.getInstance().getPropNum(PropId.OrdinaryWishingCoin) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40005")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getTenDrawPropsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            } else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10002")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getTenDrawDiamondSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            }
        }else{
            // 高级
            // 单发
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_2");
            if (PropManager.getInstance().getPropNum(PropId.PremiumWishingCoin) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40004")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getOneDrawPropsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            } else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10002")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getOneDrawDiamondsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            }
            // 十连
            if (PropManager.getInstance().getPropNum(PropId.PremiumWishingCoin) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40004")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getTenDrawPropsSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            } else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10002")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpendManager.getInstance().getTenDrawDiamondSpend
                        (this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state))
            }
        }


        let arr = CumulativeCardManager.getInstance().getWishingRewardList(this.wishing_state);        
        let isFree = Number(cc.sys.localStorage.getItem("WishingFree" + this.wishing_state))
        let timeCountdownLable = bottom.getChildByName("freeTimeCountdown")
        let timeLable = bottom.getChildByName("freeTime")
        let timesLabel = bottom.getChildByName("wishingSingleCostNum")


        if(isFree == 1){
            let func:Function;
            let t = parseInt(cc.sys.localStorage.getItem("WishingFreeTime"+this.wishing_state));
            let tt = new Date().getTime();
            let ddd = Math.floor((tt - t)/1000);
            let remainSec=24*60*60-ddd;

            func = () =>{
                let tt = new Date().getTime();
                ddd = Math.floor((tt - t)/1000);
                remainSec=24*60*60-ddd;
                timeCountdownLable.getComponent(cc.Label).string = MyTool.getTimeStr(remainSec);
                if(remainSec <= 0){
                    this.unscheduleAllCallbacks();
                    cc.sys.localStorage.setItem("WishingFree" + this.wishing_state,0)
                    this.refreshUi();
                }
            }

            this.unscheduleAllCallbacks();
            timeCountdownLable.active = true;
            timeLable.active = true;

            if(remainSec <= 0){
                this.unscheduleAllCallbacks();
                cc.sys.localStorage.setItem("WishingFree" + this.wishing_state,0)
                this.refreshUi();
            }
            timeCountdownLable.getComponent(cc.Label).string = MyTool.getTimeStr(remainSec);
           
            this.unscheduleAllCallbacks();
            this.schedule(func,1,cc.macro.REPEAT_FOREVER,0)
        }else{
            timeCountdownLable.active = false;
            timeLable.active = false;
            timesLabel.color = cc.color(145,255,119);
            timesLabel.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(840014);
        }

        top.getChildByName("cumulativeNum").getComponent(cc.Label).string = 
            Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + "/" + 
            arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex"+this.wishing_state))].CumulativeCardDrawingTimes;
            
            top.getChildByName("cumulativeBar").getComponent(cc.ProgressBar).progress = 
            Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) 
            / arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes;
        if (this.wishing_state == WishingState.Odinary) {
            this.node.getChildByName("wishingBg").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bg_0");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_0");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_1_1");
            let ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            let premiumWishingLabel = bottom.getChildByName("premiumWishing");
            ordinaryWishingLabel.color = cc.color(168,179,200);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28,36,54);
            premiumWishingLabel.color = cc.color(126,135,151);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20,26,39);
        } else {
            this.node.getChildByName("wishingBg").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bg_1");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_0_1");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_1");
            let ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            let premiumWishingLabel = bottom.getChildByName("premiumWishing");
            premiumWishingLabel.color = cc.color(168,179,200);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28,36,54);
            ordinaryWishingLabel.color = cc.color(126,135,151);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20,26,39);
        }
    }

    onClickRewardBtn(isAuto:boolean = false){
        if(isAuto == false){
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            let arr = CumulativeCardManager.getInstance().getWishingRewardList(this.wishing_state);
            if(Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) >= arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) - arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,num);
                let index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state) || -1;
                index++;
                if(index >= arr.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + this.wishing_state,index)
                let gm=GameManager.getInstance();
                let item=PropManager.getInstance().createPropItem(arr[index].ItemID,arr[index].RewardNum);
                gm.showGetTip(item);
                this.refreshUi();
            }
        }
        else{
            let arr1 = CumulativeCardManager.getInstance().getWishingRewardList(WishingState.Odinary);
            let arr2 = CumulativeCardManager.getInstance().getWishingRewardList(WishingState.Premium);
            let gm=GameManager.getInstance();
            let item1:cc.Node = null;
            let item2:cc.Node = null;
            if(Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Odinary) || 0) >= 
            arr1[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0)]
            .CumulativeCardDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Odinary) || 0) - 
                arr1[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0)]
                .CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + WishingState.Odinary,num);
                let index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0;
                index++;
                if(index >= arr1.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + WishingState.Odinary,index)
                
                item1=PropManager.getInstance().createPropItem(arr1[index].ItemID,arr1[index].RewardNum);
                PropManager.getInstance().setPropNum(arr1[index].ItemID,arr1[index].RewardNum);
            }
            if(Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Premium) || 0) >= 
            arr2[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0)]
            .CumulativeCardDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Premium) || 0) - 
                arr2[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0)]
                .CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + WishingState.Premium,num);
                let index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0;
                index++;
                if(index >= arr2.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + WishingState.Premium,index)
                
                item2=PropManager.getInstance().createPropItem(arr2[index].ItemID,arr2[index].RewardNum);
                PropManager.getInstance().setPropNum(arr2[index].ItemID,arr2[index].RewardNum);
            }
            // gm.showGetTip(item);
            if(item1 != null && item2 != null){
                gm.showMultipleGetTip([item1,item2]);
            }else{
                if(item1!=null){
                    gm.showGetTip(item1);
                }
                if(item2!=null){
                    gm.showGetTip(item2);
                }
            }
            this.refreshUi();
        }
    }

    ondClickTypeBtn(e,type:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        type = Number(type);
        this.wishing_state = type;
        this.refreshUi();
    }

    checkCanWishing(type:number):boolean{
        let pm = PropManager.getInstance()
        let ws = WishSpendManager.getInstance()
        let lm = LevelManager.getInstance()
        if(type == 1){
            // 单抽
            if(this.wishing_state == WishingState.Odinary){
                // 普通
                if(pm.getPropNum(PropId.OrdinaryWishingCoin) >= ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.OrdinaryWishingCoin,-ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通许愿消耗的许愿币,ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                if(pm.getPropNum(PropId.Gem) >= ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.Gem,-ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通许愿消耗的钻石,ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                return false;
            }else{
                // 高级
                if(pm.getPropNum(PropId.PremiumWishingCoin) >= ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.PremiumWishingCoin,-ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级许愿消耗的许愿币,ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                if(pm.getPropNum(PropId.Gem) >= ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.Gem,-ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级许愿消耗的钻石,ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                return false;
            }
        }else{
            // 十抽
            if(this.wishing_state == WishingState.Odinary){
                // 普通
                if(pm.getPropNum(PropId.OrdinaryWishingCoin) >= ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.OrdinaryWishingCoin,-ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通许愿消耗的许愿币,ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                if(pm.getPropNum(PropId.Gem) >= ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.Gem,-ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通许愿消耗的钻石,ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                return false;
            }else{
                // 高级
                if(pm.getPropNum(PropId.PremiumWishingCoin) >= ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.PremiumWishingCoin,-ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级许愿消耗的许愿币,ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                if(pm.getPropNum(PropId.Gem) >= ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state))){
                    pm.changePropNum(PropId.Gem,-ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级许愿消耗的钻石,ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(),this.wishing_state)));
                    return true;
                }
                return false;
            }
        }
    }

    onClickWishingBtn(e,type:number){
        type = Number(type)
        
        if (type == 1) {
            let isFree = Number(cc.sys.localStorage.getItem("WishingFree" + this.wishing_state))
            if (isFree == 1) {
                if (this.checkCanWishing(type) == false) {
                    return;
                } else {
                    cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,
                        Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 1);
                    // if (type == 1) {
                    // } else {
                        // cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,
                        //     Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 10);
                    // }
                }
            }else{
                let date = new Date();
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,
                    Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 1);
                cc.sys.localStorage.setItem("WishingFree" + this.wishing_state, 1);
                cc.sys.localStorage.setItem("WishingFreeTime" + this.wishing_state, date.getTime());
            }
        }else {
            if(this.checkCanWishing(type) == false){
                return;
            }else{
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,
                Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 10);
            }
        }

        let effect = cc.instantiate(this.effect);
        let effectRoot = this.node.getChildByName("bottom").getChildByName("effectRoot")
        effect.parent = effectRoot;
        let anim;
        let reward:RewardData[] = [];
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_YingBi);
        if(this.wishing_state == 1){
            // 普通池
            anim = effect.getComponent(sp.Skeleton).setAnimation(0,"CommonWish",false)
            if(type == 2){
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false)
                // },0.1,9,0.4);
                for(let i = 1;i<10;i++){
                    setTimeout(()=>{
                        let coin = cc.instantiate(this.effect);
                        coin.parent = effectRoot;
                        let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false);
                        coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
                            if(event.data.name == "RuShui"){
                                this.RuShui();
                            }
                        });
                    },100*i)
                }
            }
        }else{
            // 高级池
            anim = effect.getComponent(sp.Skeleton).setAnimation(0,"SeniorWish",false)
            if(type == 2){
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
                // },0.1,9,0.4);
                for(let i = 1;i<10;i++){
                    setTimeout(()=>{
                        let coin = cc.instantiate(this.effect);
                        coin.parent = effectRoot;
                        let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
                        coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
                            if(event.data.name == "RuShui"){
                                this.RuShui();
                            }
                        });
                    },100*i)
                }
            }
        }

        if(type == 1){
            // 单抽
            if(this.wishing_state == WishingState.Odinary){
                FollowManager.getInstance().addFirstDo(Follow_Type.记录单次普通许愿的次数);
            }else{
                FollowManager.getInstance().addFirstDo(Follow_Type.记录单次高级许愿的次数);
            }
            let chapters = LevelManager.getInstance().getFinishChapter();
            let prizePoolId = WishSpendManager.getInstance().getGetRewardID(this.getWishSpendId(chapters,this.wishing_state));
            let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
            
            if(TutorailsManager.getInstance().isShowTutorials(212)&&!TutorailsManager.getInstance().isShowTutorials(211)){
                let rd=new RewardData();
                rd.reward_id=70018;
                rd.reward_num=1;
                reward.push(rd);
            }else{
                reward.push(JackpotManager.getInstance().getRewardDataById(poolId));
            }
        }else{
            // 十抽
            if(this.wishing_state == WishingState.Odinary){
                FollowManager.getInstance().addFirstDo(Follow_Type.记录十连普通许愿的次数);
            }else{
                FollowManager.getInstance().addFirstDo(Follow_Type.记录十连高级许愿的次数);
            }
            for(let i = 0;i<10;i++){
                let chapters = LevelManager.getInstance().getFinishChapter();
                let prizePoolId = WishSpendManager.getInstance().getGetRewardID(this.getWishSpendId(chapters,this.wishing_state));
                let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
                reward.push(JackpotManager.getInstance().getRewardDataById(poolId));
            }
            let minId = 0;
            let minQuality = 10;
            for(let i = 0;i<reward.length;i++){
                if(ItemManager.getInstance().getQuality(reward[i].reward_id) < minQuality){
                    minQuality = ItemManager.getInstance().getQuality(reward[i].reward_id)
                    minId = i;
                }
            }
            if(this.wishing_state == WishingState.Odinary){
                let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010009);
                let rewardInfo = JackpotManager.getInstance().getRewardDataById(poolId);
                reward[minId] = rewardInfo;
            }else{
                let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010010);
                let rewardInfo = JackpotManager.getInstance().getRewardDataById(poolId);
                reward[minId] = rewardInfo;
            }
        }
        effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry, event)=>{
            if(event.data.name == "ShowCard"){
                this.showCards(type,reward);
            }
            if(event.data.name == "RuShui"){
                this.RuShui();
            }
            if(event.data.name == "FeiChu"){
                this.TanChu();
            }
        });
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry,event)=>[

        // ])
        for(let i = 0;i<reward.length;i++){
            if(ItemManager.getInstance().getJsonItem(reward[i].reward_id).Type == 7){
                // 宠物
                // PetManager.getInstance().addPet(PetManager.getInstance().getPetId(reward[i].reward_id));
            }else{
                // 道具
                PropManager.getInstance().changePropNum(reward[i].reward_id,reward[i].reward_num);
            }
        }

        this.refreshUi();
    }

    onClickTipBtn(){
        let id = this.getWishSpendId(LevelManager.getInstance().getFinishChapter(), this.wishing_state);
        // UIManager.getInstance().showWishingTipUi(null,this.wishing_state,id);
        UIManager.getInstance().showUiDialog(UIPath.WishingTips,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            // uiNode.getComponent(WishingTipUi).init(null);
            // uiNode.getComponent(WishingTipUi).initUi(this.wishing_state,id);
        },});
    }

    onClickCumulativeTipBtn(){
        if(this.show_cumulative_tip == true) return;
        this.show_cumulative_tip = true;
        let label = this.node.getChildByName("top").getChildByName("cumulativeTipsLabel");
        let tip = this.node.getChildByName("top").getChildByName("cumulativeTips");
        label.active = true;
        tip.active = true;
        this.scheduleOnce(()=>{
            label.active = false;
            tip.active = false;
            this.show_cumulative_tip = false;
        },2)
    }

    showCards(type:number,reward:RewardData[]){
        let card = cc.instantiate(this.wishing_card_ui)
        card.getComponent(WishingCardUi).initCard(type,reward,(() => {
            this.onClickRewardBtn();
        }).bind(this));
        card.parent = this.node.getChildByName("bottom").getChildByName("cardRoot");

    }

    RuShui(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RuShui);
    }

    TanChu(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KaTanChu);
    }

    getWishSpendId(chapters:number,type:number):number{
        return type*1000+chapters;
    }

    clickBtnClose()
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
