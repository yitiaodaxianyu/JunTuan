import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { EggCumulativeManager } from "./EggCumulative";
import { JackpotManager } from "../JsonData/Jackpot";
import { JackpotCollectionManager } from "../JsonData/JackpotCollection";
import { RewardData } from "../JsonData/LevelJsonData";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PetInfo } from "../Pet/PetConfig";
import { PetManager } from "../Pet/PetManager";
import BtnPet from "../Pet/Ui/BtnPet";
import { ItemManager } from "../Prop/Data/Item";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { MusicIndex, SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";
import { EggInformationManager } from "./EggInformation";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
// import WishingTipUi from "../Wish/WishingTipUi";


const {ccclass, property} = cc._decorator;

export enum TakeEggState {
    Odinary = 1,
    Premium = 2
}

@ccclass
export default class TakeEggUi extends UIComponent {
    take_egg_state: TakeEggState = TakeEggState.Odinary;
    show_cumulative_tip:boolean = false;

    @property(cc.SpriteAtlas)
    take_egg_ui: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas)
    wishing_ui: cc.SpriteAtlas = null;
    @property(cc.Prefab)
    pet_icon:cc.Prefab = null;
    @property([cc.String])
    animation_name:string[] = [];

    private isPlay:boolean = false;
    private pet_reward_list:PetInfo[] = [];
    // @property(cc.Prefab)
    // effect:cc.Prefab = null;
    // @property(cc.Prefab)
    // wishing_card_ui:cc.Prefab=null;

    // protected start(): void{
    //     this.init(null);
    // };

    init(uiAc: UiAction): void {
        super.init(uiAc);
        let canvas = cc.find("Canvas")
        this.node.getChildByName("takeEggBg").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;

        let bottom = this.node.getChildByName("bottom")
        this.node.getChildByName("top").getChildByName("cumulativeTipsLabel").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840021);
        

        bottom.getChildByName("Common_Btn_3").getComponentInChildren(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840026);
        bottom.getChildByName("Common_Btn_3 copy").getComponentInChildren(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840027);
        bottom.getChildByName("freeTime").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840014);
        bottom.getChildByName("ordinaryWishing").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840032);
        bottom.getChildByName("premiumWishing").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(840033);

        this.onClickRewardBtn(true);
        this.refreshUi();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_KaiEggjiemian);
        FollowManager.getInstance().followEvent(Follow_Type.龙巢打开次数);
    }

    refreshUi() {
        let top = this.node.getChildByName("top")
        let bottom = this.node.getChildByName("bottom")
        top.getChildByName("gemNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.LongJing),1);
        top.getChildByName("ordinaryWishingCoinNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.OrdinaryTakeEgg),1)
        top.getChildByName("premiumWishingCoinNum").getComponent(cc.Label).string = 
        MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.PremiumTakeEgg),1)

        if(this.take_egg_state == TakeEggState.Odinary){
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string = 
            LanguageManager.getInstance().getStrByTextId(840029);
        }else{
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string = 
            LanguageManager.getInstance().getStrByTextId(840028);
        }

        if(this.take_egg_state == TakeEggState.Odinary){
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_1");
        }else{
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_2");
        }
        if (this.take_egg_state == TakeEggState.Odinary) {
            //     普通
            //     单发
            if (PropManager.getInstance().getPropNum(EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40006")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getEggPropNum_1
                        (this.getTakeEggSpendId(this.take_egg_state))
            } else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10003")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getEggPropNum_2
                        (this.getTakeEggSpendId(this.take_egg_state))
            }
            // 十连
            if (PropManager.getInstance().getPropNum(EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40006")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getTenEggProp_1
                        (this.getTakeEggSpendId(this.take_egg_state))
            } else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10003")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getTenEggProp_2
                        (this.getTakeEggSpendId(this.take_egg_state))
            }
        }
        else {
            // 高级
            // 单发
            if (PropManager.getInstance().getPropNum(EggInformationManager.getInstance().getEggPropID_1
                (this.getTakeEggSpendId(this.take_egg_state))) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40007")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getEggPropNum_1
                        (this.getTakeEggSpendId(this.take_egg_state))
            } else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10003")
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getEggPropNum_2
                        (this.getTakeEggSpendId(this.take_egg_state))
            }
            // 十连
            if (PropManager.getInstance().getPropNum(EggInformationManager.getInstance().getEggPropID_1
                (this.getTakeEggSpendId(this.take_egg_state))) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_40007")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getTenEggProp_1
                        (this.getTakeEggSpendId(this.take_egg_state))
            } else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_10003")
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformationManager.getInstance().getTenEggProp_2
                        (this.getTakeEggSpendId(this.take_egg_state))
            }
        }


        let arr = EggCumulativeManager.getInstance().getTakeEggRewardList(this.take_egg_state);        
        let isFree = Number(cc.sys.localStorage.getItem("TakeEggFree" + this.take_egg_state))
        let timeCountdownLable = bottom.getChildByName("freeTimeCountdown")
        let timeLable = bottom.getChildByName("freeTime")
        let timesLabel = bottom.getChildByName("wishingSingleCostNum")


        if(isFree == 1){
            let func:Function;
            let t = parseInt(cc.sys.localStorage.getItem("TakeEggFreeTime"+this.take_egg_state));
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
                    cc.sys.localStorage.setItem("TakeEggFree" + this.take_egg_state,0)
                    this.refreshUi();
                }
            }

            this.unscheduleAllCallbacks();
            timeCountdownLable.active = true;
            timeLable.active = true;

            if(remainSec <= 0){
                this.unscheduleAllCallbacks();
                cc.sys.localStorage.setItem("TakeEggFree" + this.take_egg_state,0)
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
        // console.log(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + "/" + 
        // arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex"+this.take_egg_state))].CumulativeEggsDrawingTimes);
        top.getChildByName("cumulativeNum").getComponent(cc.Label).string = 
            Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + "/" + 
            arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex"+this.take_egg_state))].CumulativeEggsDrawingTimes;
        // console.log(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) 
        // , arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes) 
        top.getChildByName("cumulativeBar").getComponent(cc.ProgressBar).progress = 
            Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) 
            / arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes;
        if (this.take_egg_state == TakeEggState.Odinary) {
            this.node.getChildByName("takeEggBg").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Bg_0");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_0");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_1_1");
            let ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            let premiumWishingLabel = bottom.getChildByName("premiumWishing");
            ordinaryWishingLabel.color = cc.color(168,179,200);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28,36,54);
            premiumWishingLabel.color = cc.color(126,135,151);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20,26,39);
        } else {
            this.node.getChildByName("takeEggBg").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Bg_1");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_0_1");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_1");
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
            let arr = EggCumulativeManager.getInstance().getTakeEggRewardList(this.take_egg_state);
            if(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) >= 
            arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) - arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state,num);
                let index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state) || -1;
                index++;
                if(index >= arr.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + this.take_egg_state,index)
                let gm=GameManager.getInstance();
                let item=PropManager.getInstance().createPropItem(arr[index].ItemID,arr[index].RewardNum);
                gm.showGetTip(item);
                this.refreshUi();
            }
        }else{
            let arr1 = EggCumulativeManager.getInstance().getTakeEggRewardList(TakeEggState.Odinary);
            let arr2 = EggCumulativeManager.getInstance().getTakeEggRewardList(TakeEggState.Premium);
            let gm=GameManager.getInstance();
            let item1:cc.Node = null;
            let item2:cc.Node = null;
            if(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary) || 0) >= 
            arr1[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0)]
            .CumulativeEggsDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary) || 0) - 
                arr1[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0)]
                .CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary,num);
                let index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0;
                index++;
                if(index >= arr1.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary,index)
                
                item1=PropManager.getInstance().createPropItem(arr1[index].ItemID,arr1[index].RewardNum);
                PropManager.getInstance().setPropNum(arr1[index].ItemID,arr1[index].RewardNum);
            }
            if(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Premium) || 0) >= 
            arr2[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0)]
            .CumulativeEggsDrawingTimes){
                let num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Premium) || 0) - 
                arr2[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0)]
                .CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + TakeEggState.Premium,num);
                let index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0;
                index++;
                if(index >= arr2.length){
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium,index)
                
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
        this.take_egg_state = type;
        this.refreshUi();
    }

    checkCanWishing(type:number):boolean{
        let pm = PropManager.getInstance()
        let eim = EggInformationManager.getInstance()
        // let lm = LevelManager.getInstance()
        if(type == 1){
            // 单抽
            if(this.take_egg_state == TakeEggState.Odinary){
                // 普通
                if(pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)),-eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通开蛋消耗的普通宠物蛋数量,eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if(pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)),-eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通开蛋消耗的龙晶数量,eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }else{
                // 高级
                if(pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)),-eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级开蛋消耗的高级宠物蛋数量,eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if(pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)),-eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级开蛋消耗的龙晶数量,eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
        }else{
            // 十抽
            if(this.take_egg_state == TakeEggState.Odinary){
                // 普通
                if(pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)),-eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通开蛋消耗的普通宠物蛋数量,eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if(pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)),-eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录普通开蛋消耗的龙晶数量,eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }else{
                // 高级
                if(pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)),-eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级开蛋消耗的高级宠物蛋数量,eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if(pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state))){
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)),-eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager.getInstance().addTotal(Follow_Type.记录高级开蛋消耗的龙晶数量,eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
        }
    }

    onClickWishingBtn(e,type:number){
        type = Number(type)
        
        if (type == 1) {
            let isFree = Number(cc.sys.localStorage.getItem("TakeEggFree" + this.take_egg_state))
            if (isFree == 1) {
                if (this.checkCanWishing(type) == false) {
                    return;
                } else {
                    cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state,
                        Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 1);
                    // if (type == 1) {
                    // } else {
                        // cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.take_egg_state,
                        //     Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.take_egg_state)) + 10);
                    // }
                }
            }else{
                let date = new Date();
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state,
                    Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 1);
                cc.sys.localStorage.setItem("TakeEggFree" + this.take_egg_state, 1);
                cc.sys.localStorage.setItem("TakeEggFreeTime" + this.take_egg_state, date.getTime());
            }
        }else {
            if(this.checkCanWishing(type) == false){
                return;
            }else{
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state,
                Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 10);
            }
        }

        // let effect = cc.instantiate(this.effect);
        // let effectRoot = this.node.getChildByName("bottom").getChildByName("effectRoot")
        // effect.parent = effectRoot;
        // let anim;
        let reward:RewardData[] = [];
        // if(this.take_egg_state == 1){
            // 普通池
            // anim = effect.getComponent(sp.Skeleton).setAnimation(0,"CommonWish",false)
            // GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_YingBi);
            // if(type == 2){
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false)
                // },0.1,9,0.4);
                // for(let i = 1;i<10;i++){
                //     setTimeout(()=>{
                //         let coin = cc.instantiate(this.effect);
                //         coin.parent = effectRoot;
                //         let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false);
                //         coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
                //             if(event.data.name == "RuShui"){
                //                 this.RuShui();
                //             }
                //         });
                //     },100*i)
                // }
        //     }
        // }else{
            // 高级池
            // anim = effect.getComponent(sp.Skeleton).setAnimation(0,"SeniorWish",false)
            // if(type == 2){
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
                // },0.1,9,0.4);
                // for(let i = 1;i<10;i++){
                //     setTimeout(()=>{
                //         let coin = cc.instantiate(this.effect);
                //         coin.parent = effectRoot;
                //         let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
                //         coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
                //             if(event.data.name == "RuShui"){
                //                 this.RuShui();
                //             }
                //         });
                //     },100*i)
                // }
            // }
        // }

        if(type == 1){
            // 单抽
            // let chapters = LevelManager.getInstance().getFinishChapter();
            if(this.take_egg_state == TakeEggState.Odinary){
                FollowManager.getInstance().followEvent(Follow_Type.记录单次普通开蛋的次数);
            }else{
                FollowManager.getInstance().followEvent(Follow_Type.记录单次高级开蛋的次数);
            }
            let prizePoolId = EggInformationManager.getInstance().getEggsReward(this.getTakeEggSpendId(this.take_egg_state));
            let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
            reward.push(JackpotManager.getInstance().getRewardDataById(poolId));
        }else{
            // 十抽
            if(this.take_egg_state == TakeEggState.Odinary){
                FollowManager.getInstance().followEvent(Follow_Type.记录十连普通开蛋的次数);
            }else{
                FollowManager.getInstance().followEvent(Follow_Type.记录十连高级开蛋的次数);
            }
            for(let i = 0;i<10;i++){
                // let chapters = LevelManager.getInstance().getFinishChapter();
                let prizePoolId = EggInformationManager.getInstance().getEggsReward(this.getTakeEggSpendId(this.take_egg_state));
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
            if(this.take_egg_state == TakeEggState.Odinary){
                // let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010009);
                let rewardInfo = JackpotManager.getInstance().getRewardDataById(30002);
                reward[minId] = rewardInfo;
            }else{
                // let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010010);
                let rewardInfo = JackpotManager.getInstance().getRewardDataById(30003);
                reward[minId] = rewardInfo;
            }
        }
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry, event)=>{
        //     if(event.data.name == "ShowCard"){
        //         this.showCards(type,reward);
        //     }
        //     if(event.data.name == "RuShui"){
        //         this.RuShui();
        //     }
        //     if(event.data.name == "FeiChu"){
        //         this.TanChu();
        //     }
        // });
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry,event)=>[

        // ])
        let maxQuality = 1;
        this.pet_reward_list = [];
        for(let i = 0;i<reward.length;i++){
            // TaskManger.getInstance().setTaskItem(TaskItem.在许愿池中进行一次许愿);
            // TaskManger.getInstance().setTaskItem(TaskItem.在许愿池中许愿20次);
            // this.pet_reward_list.push(PetManager.getInstance().addPet(PetManager.getInstance().getPetId(reward[i].reward_id)));
            if(ItemManager.getInstance().getQuality(reward[i].reward_id) > maxQuality) maxQuality =  ItemManager.getInstance().getQuality(reward[i].reward_id);
            // if(ItemManager.getInstance().getJsonItem(reward[i].reward_id).Type == 7){
            //     // 宠物
            // }else{
            //     // 道具
            //     PropManager.getInstance().changePropNum(reward[i].reward_id,reward[i].reward_num);
            // }
        }

        let animRoot = this.node.getChildByName("Hatch_Bg_2");
        animRoot.active = true;
        let animNode = animRoot.children[0];
        this.isPlay = true;
        let anim;
        if(type == 1){
            anim = animNode.getComponent(sp.Skeleton).setAnimation(0,this.animation_name[maxQuality - 1],false);
        }
        else{
            anim = animNode.getComponent(sp.Skeleton).setAnimation(0,this.animation_name[(maxQuality - 1) + 4],false);
        }
        animNode.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry, event)=>{
            if(event.data.name == "OpenEgg"){
                this.onShowLight();
            }
        });
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KaiDan1);
        this.refreshUi();
    }

    onShowLight(){
        let animRoot = this.node.getChildByName("Hatch_Bg_2");
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Kaidan2);
        animRoot.children[1].active = true;
        cc.tween(animRoot.children[1]).to(0.5,{opacity:255}).to(0.5,{opacity:0}).call(() =>{
            animRoot.children[1].active = false;
            this.showGet();
        }).start();
    }

    showGet(){
        let itemList:cc.Node[] = [];
        // PetManager.getInstance().sortPetList(this.pet_reward_list);
        for(let i = 0;i<this.pet_reward_list.length;i++){
            let item = cc.instantiate(this.pet_icon);
            item.getComponent(BtnPet).init(this.pet_reward_list[i]);
            itemList.push(item);
        }
        if(itemList.length>1){
            GameManager.getInstance().showMultipleGetTip(itemList,(() => {
                this.isPlay = false;
                this.onClickTakeEggBg();
                this.onClickRewardBtn(true);
            }).bind(this)); 
        }else{
            GameManager.getInstance().showGetTip(itemList[0],(() => {
                this.isPlay = false;
                this.onClickTakeEggBg();
                this.onClickRewardBtn(true);
            }).bind(this))
        }
    }

    // 点击背景
    onClickTakeEggBg(){
        if(this.isPlay == false){
            this.node.getChildByName("Hatch_Bg_2").active = false;
        }
    }

    onClickTipBtn(){
        let id = this.getTakeEggSpendId(this.take_egg_state);
        // 抽蛋概率界面
        // UIManager.getInstance().showWishingTipUi(null,this.take_egg_state,id,true);
        UIManager.getInstance().showUiDialog(UIPath.WishingTips,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            // uiNode.getComponent(WishingTipUi).init(null);
            // uiNode.getComponent(WishingTipUi).initUi(this.take_egg_state,id,true);
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

    // showCards(type:number,reward:RewardData[]){
    //     let card = cc.instantiate(this.wishing_card_ui)
    //     card.getComponent(WishingCardUi).initCard(type,reward);
    //     card.parent = this.node.getChildByName("bottom").getChildByName("cardRoot");
    // }

    // RuShui(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RuShui);
    // }

    // TanChu(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KaTanChu);
    // }

    getTakeEggSpendId(type:number):number{
        return type*10000+1;
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
