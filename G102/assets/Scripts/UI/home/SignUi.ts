import WXManagerEX, { WXADEnvnt } from "../../../startscene/WXManagerEX";
import { AccessName, HttpManager } from "../.././NetWork/HttpManager";
import ApkManager from "../../Ads/ApkManager";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { SignInManager, SignInType } from "../../JsonData/SignIn";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import Prop from "../../Prop/Prop";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";
import { UILayerLevel, UIPath } from "../UIConfig";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";
import SignInBuyUi from "./SignInBuyUi";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SignUi extends UIComponent {

    @property(cc.SpriteAtlas)
    sign_in_ui: cc.SpriteAtlas = null;
    @property(cc.Node)
    today: cc.Node = null;

    init(uiAc: UiAction): void {
        FollowManager.getInstance().followEvent(Follow_Type.新手签到点击次数);
        super.init(uiAc);
        cc.director.on(WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
        this.refreshUi();
    }

    refreshUi() {
        let root = this.node.getChildByName("dayBgRoot");
        let itemRoot = this.node.getChildByName("itemRoot");
        itemRoot.removeAllChildren();
        let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        for (let i = 0; i < data.length; i++) {
            let itemParent = root.getChildByName("day" + i);
            itemParent.getComponentInChildren(TextLanguage).setReplaceValue('~', (i + 1) + '');
            let item = PropManager.getInstance().createPropItem(data[i].Item, data[i].Num);
            // let temp = itemParent.children[0];
            // itemParent.removeAllChildren();
            // itemParent.addChild(temp);
            item.name = "item" + i;
            itemRoot.addChild(item);
            item.setPosition(cc.v2(itemParent.x, itemParent.y - 15));
            if (i < TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                let bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                let gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                bg.addChild(gou);
                gou.setPosition(cc.v2(0, -10));
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            }
            else if (i > TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                let bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            } else {
                if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
                    item.getComponent(cc.Button).enabled = false;
                } else {
                    let bg = new cc.Node();
                    bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                    if (i == 6) {
                        bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                    }
                    bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                    itemRoot.addChild(bg);
                }
            }
        }
        if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 1) {
            // this.node.getChildByName("receiveBtn").active = false;
            this.today.active = false;
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = false;
        } else {
            // this.node.getChildByName("receiveBtn").active = true;
            this.today.active = true;
            let item = itemRoot.getChildByName("item" + (TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0)));
            this.today.setPosition(item.x, item.y - 5);
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = true;
        }
    }

    onReceiveBtnClick(e, num: string) {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);

        UIManager.getInstance().showUiDialog(UIPath.SignInBuy,UILayerLevel.One,{
            onCompleted:(uiNode)=>{
                uiNode.getComponent(SignInBuyUi).init(null);
                uiNode.getComponent(SignInBuyUi).iniData();
            }
        })
        return;
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

    onClickBuyBtn() {
        //this.onClose();
        // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113))
        // return;
        // FollowManager.getInstance().followEvent(Follow_Type.点击解锁5倍奖励按钮的点击次数);
        // UIManager.getInstance().showUiDialog(UIPath.SignInBuy,UILayerLevel.One,{
        //     onCompleted:(uiNode)=>{
        //         uiNode.getComponent(SignInBuyUi).init(null);
        //         uiNode.getComponent(SignInBuyUi).iniData();
        //     }
        // })
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        var num;
        let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined) num = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index) return;
        if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
            if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                WXManagerEX.getInstance().qiriQiandaoShipin = tt.createRewardedVideoAd({
                    adUnitId: '90312q6nknsj0ao2an'
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
                    WXManagerEX.getInstance().qiriQiandaoShipin.destroy();
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
    clickBtnClose() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf() {

        super.onClose();
        ApkManager.getInstance().closeBanner();
    }
    onClose(): void {
        super.onClose();
        cc.director.off(WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
    }

    private getUserIdJsonString(): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    }

}
