import WXManagerEX from "../../../startscene/WXManagerEX";
import { HttpManager, AccessName } from "../.././NetWork/HttpManager";
import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { SignInManager, SignInType } from "../../JsonData/SignIn";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PayManager } from "../../Payment/PayManager";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";

const {ccclass, property} = cc._decorator;

const googldId = "c601";

@ccclass
export default class SignInBuyUi extends UIComponent {

    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    iniData(){
        this.refreshUi();
    }

    refreshUi(){
        // let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
        // let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        // let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        // content.removeAllChildren();
        // let payInfo = PayManager.getInstance().getPayInfo(googldId);
        // let rewardList = new Map<number,number>();
        // for(let i = 0; i < data.length;i++){
        //     // let item:cc.Node = null;
        //     if(i<index){
        //         // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 4;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 4);
        //         }
        //     }else{
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 5;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 5);
        //         }
        //     }
        // }
        // rewardList.forEach((num,id)=>{
        //     let item = PropManager.getInstance().createPropItem(id,num);
        //     content.addChild(item);
        // })
        // this.node.getChildByName("sure").getComponentInChildren(cc.Label).string = payInfo.price;
    }

    onClickSureBtn(){
        // FollowManager.getInstance().followEvent(Follow_Type.点击解锁5倍奖励的购买成功次数);
        // let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
        // let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        // let rewardList = new Map<number,number>();
        // for(let i = 0; i < data.length;i++){
        //     // let item:cc.Node = null;
        //     if(i<index){
        //         // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 4;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 4);
        //         }
        //     }else{
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 5;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 5);
        //         }
        //     }
        // }
        // let rewardList1 = [];
        // rewardList.forEach((num,id)=>{
        //     PropManager.getInstance().changePropNum(id,num);
        //     let item = PropManager.getInstance().createPropItem(id,num);
        //     rewardList1.push(item);
        // })
        // GameManager.getInstance().showMultipleGetTip(rewardList1);
        // TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver,1);
        // HttpManager.post(AccessName.updateSevenGift,this.getUserIdJsonString());
        // this.onClose();

        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        var num;
        let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined) num = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index) return;
        if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                WXManagerEX.getInstance().qiriQiandaoShipin = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-74cd62188527aedb'
                });
                WXManagerEX.getInstance().qiriQiandaoShipin.offError();
                WXManagerEX.getInstance().qiriQiandaoShipin.onError(err => {
                    console.log(err)
                });
                WXManagerEX.getInstance().qiriQiandaoShipin.offClose();
                WXManagerEX.getInstance().qiriQiandaoShipin.show().catch(() => {
                    // 失败重试
                    WXManagerEX.getInstance().qiriQiandaoShipin.load()
                        .then(() => WXManagerEX.getInstance().qiriQiandaoShipin.show())
                        .catch(err => {
                            GameManager.getInstance().showMessage("广告拉取失败");
                        })
                })
                WXManagerEX.getInstance().qiriQiandaoShipin.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        this.onShipinComp();
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                    }
                })


            } else {
                this.onShipinComp();
            }
        } else {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(230008));
        }
    }
    private onShipinComp(): void {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0);
        var num = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index) return;
        if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
            let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
            let reward = PropManager.getInstance().createPropItem(data[index].Item, data[index].Num * 2);
            FollowManager.getInstance().followEvent(Follow_Type.新手签到x天的点击次数 + index);
            PropManager.getInstance().changePropNum(data[index].Item, data[index].Num * 2);
            GameManager.getInstance().showGetTip(reward);
            // this.node.getChildByName("receiveBtn").active = false;
            index++;
            if (index > 6) {
                TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver, 1);
                HttpManager.post(AccessName.updateSevenGift, this.getUserIdJsonString());
            }
            TheStorageManager.getInstance().setItem(StorageKey.CanSignIn, 1);
            TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInNum, index)
            this.refreshUi();
            EventManager.postRedEvent(RedEventString.RED_TIP, RedEventType.Btn_Main_SignIn, false, RedEventType.Btn_Main_SignIn_BtnGet);

            TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInTime, new Date().getTime());
            HttpManager.post(AccessName.sevenSign, this.getUserIdJsonString());
        } else {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(230008));
        }
    }
    onClickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // this.destroySelf();
        var num;
        let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined) num = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index) return;
        if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
            let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
            let reward = PropManager.getInstance().createPropItem(data[index].Item, data[index].Num);
            FollowManager.getInstance().followEvent(Follow_Type.新手签到x天的点击次数 + index);
            PropManager.getInstance().changePropNum(data[index].Item, data[index].Num);
            GameManager.getInstance().showGetTip(reward);
            // this.node.getChildByName("receiveBtn").active = false;
            index++;
            if (index > 6) {
                TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver, 1);
                HttpManager.post(AccessName.updateSevenGift, this.getUserIdJsonString());
            }
            TheStorageManager.getInstance().setItem(StorageKey.CanSignIn, 1);
            TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInNum, index)
            this.refreshUi();
            EventManager.postRedEvent(RedEventString.RED_TIP, RedEventType.Btn_Main_SignIn, false, RedEventType.Btn_Main_SignIn_BtnGet);

            TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInTime, new Date().getTime());
            HttpManager.post(AccessName.sevenSign, this.getUserIdJsonString());
        } else {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(230008));
        }
    }

    destroySelf()
    {
        super.onClose();
        // ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

    private getUserIdJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }
}
