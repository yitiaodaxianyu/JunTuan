import WXManagerEX, { WXADEnvnt } from "../../../startscene/WXManagerEX";
import ApkManager from "../../Ads/ApkManager";
import { VipManager } from "../../Ads/VipManager";
import CoinPop from "../../CoinPop";
import { VIDEO_TYPE } from "../../Constants";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { OfflineRevenueManager } from "../../JsonData/OfflineRevenue";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UiAction } from "../../UI/UiInterface";
import { UIManager } from "../../UI/UIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FastGuaJiUi extends UIComponent {

    time_label:cc.Label=null;

    init(uiAc: UiAction) {
        super.init(uiAc);
        this.time_label=this.node.getChildByName('time').getComponent(cc.Label);
        this.node.getChildByName('Reward_Bg_1').getComponentInChildren(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(100119);
        // this.showRemainingNum();
        this.schedule(this.showRemainTime,1);
        this.showRemainTime();

        if(TheStorageManager.getInstance().getNumber(StorageKey.CanAdFastOffline,0) == 1){
            this.node.getChildByName("btnRoot").getChildByName("ad").active = false;
        }else{
            this.node.getChildByName("btnRoot").getChildByName("ad").active = true;
        }

        let bg=this.node.getChildByName('bg');
        bg.off(cc.Node.EventType.TOUCH_START);
        bg.on(cc.Node.EventType.TOUCH_START,()=>{
            this.clickBtnClose();
        },this);


        cc.director.on(WXADEnvnt.KUAISUGUAJISHIPIN, this.onShipinComp, this);
    }

    // onLoad(): void {
    //     super.onLoad();
        
    // }

    showRemainingNum(){
        // let lm=LanguageManager.getInstance();
        // let freeNum=GameData.getInstance().getFreeFastGuaJiNum();
        // let gemNum=GameData.getInstance().getFastGuaJiNum();
        // let totalNum=freeNum+gemNum;
        // let costGem=150-(gemNum*50);
        // let gem=PropManager.getInstance().getPropNum(PropId.Gem);

        // let gemIcon=this.node.getChildByName('btnRoot').getChildByName("btnFast").getChildByName("gemIcon");
        // let gemText=gemIcon.getChildByName('gemNum').getComponent(cc.Label);
        // let useText=this.node.getChildByName('useText');

        // let btnFast=this.node.getChildByName('btnFast').getComponent(cc.Button);
        // this.node.getChildByName('remainText').getComponent(cc.Label).string=lm.getString(LanguageIndex.UsesRemainingToday)+totalNum;
        // this.node.getChildByName('text1').getComponent(cc.RichText).string="<b><color=#253147 size=24>"+lm.getStrByTextId(220002)+": </c><color=#F9E06E><outline color=#865B2C width=3><size=30>120 min</></outline></c></b>";
        // this.node.getChildByName('text2').getComponent(cc.RichText).string="<b><outline color=#33203F width=3><color=#EBD9B1>"+lm.getStrByTextId(930001)+": 2</c></outline></b>";

        // gemText.string=costGem+'';
        
        // if(freeNum>0){
            // gemIcon.active=false;
            // useText.x=btnFast.node.x;
        // }else{
            // gemIcon.active=gemNum>0;
            // gemText.node.color=gem>=costGem?cc.Color.WHITE:cc.Color.RED;
            // useText.x=gemNum>0?18:btnFast.node.x;
        // }
        // btnFast.interactable=totalNum>0;
        // useText.color=totalNum>0?cc.color(124,82,13):cc.Color.WHITE;
        // if(totalNum > 0){
            // useText.color = cc.color(63, 45, 33);
        // }else{
            // useText.getComponent(cc.LabelOutline).color = cc.color(138,138,138);
            // this.node.getChildByName("btnFast").getComponent(cc.Button).interactable = false;
        // }
    }

    showRemainTime()
    {
        let s:string;
        let nowTime = Date.now() / 1000;
        let residueTime = TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp,0) - nowTime;
        if(residueTime < 0){
            residueTime = ((new Date(new Date().toLocaleDateString()).getTime()+8640000)/ 1000) - nowTime;
        }
        let hh = Math.floor(residueTime / (60*60));
        if(hh < 10){
            s = '0' + hh + ':';
        }else{
            s = hh +':';
        }
        let mm = Math.floor(residueTime % (60*60)/60);
        if(mm < 10){
            s += '0' + mm + ':'
        }else{
            s += mm + ':'
        }
        let ss = Math.floor(residueTime % (60*60)%60)
        if(ss < 10){
            s += '0' + ss
        }else{
            s += ss
        }
        this.time_label.string=s;
        // if(TheStorageManager.getInstance().getNumber(StorageKey.CanFastOffline,0) == 1){
        //     this.showRemainingNum();
        // }
        //获取当前时间
        // let date=new Date();
        // let curHours=date.getHours();
        // let curMin=date.getMinutes();
        // let curSec=date.getSeconds();
        // let remainHours=24-curHours-1;
        // let remainMin=60-curMin;
        // let remainSec=60-curSec;
        // let shiStr='0'+remainHours;
        // if(remainHours>=10)
        // {
        //     shiStr=''+remainHours;
        // }
        // let fenStr='0'+remainMin;
        // if(remainMin>=10)
        // {
        //     fenStr=''+remainMin;
        // }
        // let miaoStr='0'+remainSec;
        // if(remainSec>=10)
        // {
        //     miaoStr=''+remainSec;
        // }
        // if(GameData.getInstance().checkIsNewDay())
        // {
        // }
        // if(remainSec%5==0)
        // {
        //     GameData.getInstance().saveIsSignToday(false);
        //     this.showSignDay();
        // }
    }

    clickBtnAd(){
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {

 


            WXManagerEX.getInstance().kuaisuGuajiShipin= tt.createRewardedVideoAd({
                adUnitId: '3iifgrgt8f2515m1sg'
            });
            WXManagerEX.getInstance().kuaisuGuajiShipin.offError();
                    WXManagerEX.getInstance().kuaisuGuajiShipin.onError(err => {
                        console.log(err)
                    });
            WXManagerEX.getInstance().kuaisuGuajiShipin.offClose();
            WXManagerEX.getInstance().kuaisuGuajiShipin.show().catch(() => {
                // 失败重试
                WXManagerEX.getInstance().kuaisuGuajiShipin.load()
                    .then(() => WXManagerEX.getInstance().kuaisuGuajiShipin.show())
                    .catch(err => {
                        GameManager.getInstance().showMessage("广告拉取失败");
                    })
            })
            WXManagerEX.getInstance().kuaisuGuajiShipin.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                  // 正常播放结束，可以下发游戏奖励
                  this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
                WXManagerEX.getInstance().kuaisuGuajiShipin.destroy();
            })

        }else{
            this.onShipinComp();
        }
       
    }
    private onShipinComp(): void {
        FollowManager.getInstance().followEvent(Follow_Type.快速挂机广告按钮点击);
                GameManager.getInstance().refreshGemShow();
                TaskManager.getInstance().emitTask(TaskItem.领取挂机奖励2次);
                TaskManager.getInstance().emitTask(TaskItem.领取快速挂机1次);
                // TheStorageManager.getInstance().setItem(StorageKey.CanFastOffline,1);
                // GameData.getInstance().saveFastGuaJiNum(gemNum-1);
                this.showRemainingNum();
                let rewardDatas=OfflineRevenueManager.getInstance().getRewards(5*60);
                let rewardMap = new Map<number,number>();
                rewardDatas.forEach((v,k)=>{
                    if(rewardMap.has(v.reward_id)){
                        let num = rewardMap.get(v.reward_id);
                        num += v.reward_num;
                        rewardMap.set(v.reward_id,num);
                    }else{
                        rewardMap.set(v.reward_id,v.reward_num);
                    }
                })
                let rdNodes=new Array();
                rewardMap.forEach((num,id)=>{
                    let item=PropManager.getInstance().createPropItem(id,num);
                    PropManager.getInstance().changePropNum(id,num);
                    rdNodes.push(item);
                });
                // for(let i=0; i<rewardDatas.length; i++){
                //     let rd=rewardDatas[i];
                //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
                //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
                //     rdNodes.push(item);
                // }
                GameManager.getInstance().showMultipleGetTip(rdNodes);
                TheStorageManager.getInstance().setItem(StorageKey.CanAdFastOffline,1);
                this.node.getChildByName("btnRoot").getChildByName("ad").active = false;
                EventManager.postRedEvent(RedEventString.RED_TIP,RedEventType.Btn_Main_Guaji_Btn_Fast,false);
    }
    clickBtnFast(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(TheStorageManager.getInstance().getNumber(StorageKey.CanFastOffline,0) == 0){
            if(PropManager.getInstance().changePropNum(PropId.Gem,-200)){
                // FollowManager.getInstance().addTotal(Follow_Type.快速挂机消耗的钻石数量,costGem);
                TheStorageManager.getInstance().setItem(StorageKey.CanFastOffline,1);
                TaskManager.getInstance().emitTask(TaskItem.领取快速挂机1次);
                TaskManager.getInstance().emitTask(TaskItem.领取挂机奖励2次);
                // GameData.getInstance().saveFastGuaJiNum(gemNum-1);
                this.showRemainingNum();
                let rewardDatas=OfflineRevenueManager.getInstance().getRewards(5*60);
                let rewardMap = new Map<number,number>();
                rewardDatas.forEach((v,k)=>{
                    if(rewardMap.has(v.reward_id)){
                        let num = rewardMap.get(v.reward_id);
                        num += v.reward_num;
                        rewardMap.set(v.reward_id,num);
                    }else{
                        rewardMap.set(v.reward_id,v.reward_num);
                    }
                })
                let rdNodes=new Array();
                rewardMap.forEach((num,id)=>{
                    let item=PropManager.getInstance().createPropItem(id,num);
                    PropManager.getInstance().changePropNum(id,num);
                    rdNodes.push(item);
                });
                // let rdNodes=new Array();
                // for(let i=0; i<rewardDatas.length; i++){
                //     let rd=rewardDatas[i];
                //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
                //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
                //     rdNodes.push(item);
                // }
                GameManager.getInstance().showMultipleGetTip(rdNodes);
                // GameManager.getInstance().refreshGemShow();
            }else{
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                },});
            }  
        }else{
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100120));
        }
        // TaskManger.getInstance().setTaskItem(TaskItem.快速挂机1次);
        // TaskManger.getInstance().setTaskItem(TaskItem.收取挂机奖励2次);
        // FollowManager.getInstance().followEvent(Follow_Type.快速挂机使用次数);
        // let freeNum=GameData.getInstance().getFreeFastGuaJiNum();
        // let gemNum=GameData.getInstance().getFastGuaJiNum();
        // if(freeNum>0){
        //     GameData.getInstance().saveFreeFastGuaJiNum(freeNum-1);
        //     this.showRemainingNum();
        //     let rewardDatas=OfflineRevenueManager.getInstance().getRewards(2*60);
        //     let rdNodes=new Array();
        //     for(let i=0; i<rewardDatas.length; i++){
        //         let rd=rewardDatas[i];
        //         let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
        //         PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
        //         rdNodes.push(item);
        //     }
        //     GameManager.getInstance().showMultipleGetTip(rdNodes);
        //     EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Fast);
        // }else{
        //     if(gemNum>0){
        //         let costGem=150-(gemNum*50);
        //         if(PropManager.getInstance().changePropNum(PropId.Gem,-costGem)){
        //             FollowManager.getInstance().addTotal(Follow_Type.快速挂机消耗的钻石数量,costGem);
        //             GameManager.getInstance().refreshGemShow();
        //             GameData.getInstance().saveFastGuaJiNum(gemNum-1);
        //             this.showRemainingNum();
        //             let rewardDatas=OfflineRevenueManager.getInstance().getRewards(2*60);
        //             let rdNodes=new Array();
        //             for(let i=0; i<rewardDatas.length; i++){
        //                 let rd=rewardDatas[i];
        //                 let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
        //                 PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
        //                 rdNodes.push(item);
        //             }
        //             GameManager.getInstance().showMultipleGetTip(rdNodes);
        //         }else{
        //             GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.Insufficient_gems));
        //         }                
        //     }else{
                
        //     }
        // }
        
    }

    clickBtnVip(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showPayUi({onClose:()=>{
            this.showRemainTime();
        }},0);
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.unschedule(this.showRemainTime);
        super.onClose();
        ApkManager.getInstance().closeBanner();
        cc.director.on(WXADEnvnt.KUAISUGUAJISHIPIN, this.onShipinComp, this);
    }

    
}
