import AdManager from "../Ads/AdManager";
import ApkManager from "../Ads/ApkManager";
import { VIDEO_TYPE } from "../Constants";
import GameManager from "../GameManager";
import { JsonCyclePack } from "./Data/CyclePack";
import TextLanguage from "../multiLanguage/TextLanguage";
import Prop from "../Prop/Prop";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";
import { PayManager } from "./PayManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import EquipItem from "../Equipment/Ui/EquipItem";
import FollowManager from "../multiLanguage/FollowManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PayGitBagItem extends cc.Component {

    private data: JsonCyclePack = null;

    // init(uiAc: UiAction): void {
    //     super.init(uiAc);
    // }

    initData(data: JsonCyclePack) {
        this.data = data;
        let item1, item2, item3, item4, item5, item6;
        if (data.GetCoinNum != 0) {
            item1 = PropManager.getInstance().createPropItem(PropId.Coin, data.GetCoinNum);
            item1.scale = 0.85;
        }
        if (data.GetGemNum != 0) {
            item2 = PropManager.getInstance().createPropItem(PropId.Gem, data.GetGemNum);
            item2.scale = 0.85;
        }
        if (data.GetCrystal != 0) {
            item3 = PropManager.getInstance().createPropItem(PropId.LongJing, data.GetCrystal);
            item3.scale = 0.85;
        }
        if (data.ItemId_1 != 0) {
            item4 = PropManager.getInstance().createPropItem(data.ItemId_1, data.ItemNum_1);
            item4.scale = 0.85;
        }
        if (data.ItemId_2 != 0) {
            item5 = PropManager.getInstance().createPropItem(data.ItemId_2, data.ItemNum_2);
            item5.scale = 0.85;
        }
        if (data.ItemId_3 != 0) {
            item6 = PropManager.getInstance().createPropItem(data.ItemId_3, data.ItemNum_3);
            item6.scale = 0.85;
        }
        let content = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        if (item1) content.addChild(item1);
        if (item2) content.addChild(item2);
        if (item3) content.addChild(item3);
        if (item4) content.addChild(item4);
        if (item5) content.addChild(item5);
        if (item6) content.addChild(item6);
        if (data.AdReward == 1) {
            this.node.getChildByName("freeBtn").active = true;
            this.node.getChildByName("limit").active = true;
            this.node.getChildByName("btn").active = false;
            let isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + data.GiftID) || 0;
            isSoldOut = Number(isSoldOut)
            this.node.getChildByName("limit").getComponent(TextLanguage).setReplaceValue(["%", "~"], [data.AdPlayableTimes - isSoldOut + '', data.AdPlayableTimes + ''])            
            if (isSoldOut >= data.AdPlayableTimes) {
                this.soldOut(this.node);
                this.node.getChildByName("freeBtn").active = false;
                this.node.getChildByName("limit").active = false;
                this.node.getChildByName("Cycle_Bg_3").active = true;
                this.node.getChildByName("slodOut").active = true;
                this.node.getChildByName("Cycle_Bg_3").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("slodOut").getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("btn").getComponent(cc.Button).interactable = false;
            }
            //红点
            this.node.getChildByName("freeBtn").getChildByName('red').active=isSoldOut < data.AdPlayableTimes;
        } else {
            this.node.getChildByName("freeBtn").active = false;
            this.node.getChildByName("limit").active = false;
            this.node.getChildByName("btn").active = true;
            let payInfo = PayManager.getInstance().getPayInfo(data.ProductId);
            // this.node.getChildByName("btn").getComponentInChildren(cc.Label).string = payInfo.price + payInfo.currency;
            this.node.getChildByName("btn").getComponentInChildren(cc.Label).string = payInfo.price;
            let isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + data.GiftID) || 0;
            if (isSoldOut != 0) {
                this.soldOut(this.node);
                this.node.getChildByName("btn").active = false;
                this.node.getChildByName("Cycle_Bg_3").active = true;
                this.node.getChildByName("slodOut").active = true;
                this.node.getChildByName("Cycle_Bg_3").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("slodOut").getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("btn").getComponent(cc.Button).interactable = false;
            }
        }
        // let nowTime = Math.floor(Date.now() / 1000);
        // let endTime = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000) + (24 * 60 * 60);

        // this.node.getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(nowTime - endTime);
        this.schedule(() => {
            let nowTime:number;
            let endTime;
            switch (data.GiftText) {
                case 1:
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000) + (24 * 60 * 60);
                    break;
                case 2:
                    let MillisecondsADay = 24 * 60 * 60
                    let timestamp = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000)
                    let weekDay = new Date().getDay() === 0 ? (7 - 1) : (new Date().getDay() - 1)
                    let weekTimeStamp = timestamp - MillisecondsADay * weekDay
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = weekTimeStamp + 24*60*60 * 7;
                    break;
                case 3:
                    let date = new Date()
                    date.setDate(1)
                    date.setHours(0, 0, 0, 0)
                    let timeStamp = date.getTime() / 1000
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = timeStamp + 24*60*60 * 30;
                    break;
            }

            this.node.getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(endTime - nowTime);
        }, 0, cc.macro.REPEAT_FOREVER);
    }

    soldOut(node: cc.Node) {
        for (let i = 0; i < node.childrenCount; i++) {
            if (node.children[i].getComponent(cc.Label)) {
                node.children[i].getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if (node.children[i].getComponent(cc.Sprite)) {
                node.children[i].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if (node.children[i].childrenCount > 0) {
                this.soldOut(node.children[i]);
            }
        }
    }

    onClickBuy() {
        if (this.data.AdReward == 1) {
            ApkManager.getInstance().showVideo(((isTrue: boolean) => {
                if (isTrue) {
                    let item1, item2, item3, item4, item5, item6;
                    if (this.data.GetCoinNum != 0) {
                        item1 = PropManager.getInstance().createPropItem(PropId.Coin, this.data.GetCoinNum);
                    }
                    if (this.data.GetGemNum != 0) {
                        item2 = PropManager.getInstance().createPropItem(PropId.Gem, this.data.GetGemNum);
                    }
                    if (this.data.GetCrystal != 0) {
                        item3 = PropManager.getInstance().createPropItem(PropId.LongJing, this.data.GetCrystal);
                        PayManager.getInstance().addTotalLongJingNum(this.data.GetCrystal);
                    }
                    if (this.data.ItemId_1 != 0) {
                        item4 = PropManager.getInstance().createPropItem(this.data.ItemId_1, this.data.ItemNum_1);
                    }
                    if (this.data.ItemId_2 != 0) {
                        item5 = PropManager.getInstance().createPropItem(this.data.ItemId_2, this.data.ItemNum_2);
                    }
                    if (this.data.ItemId_3 != 0) {
                        item6 = PropManager.getInstance().createPropItem(this.data.ItemId_3, this.data.ItemNum_3);
                    }
                    let rewardList: cc.Node[] = [];
                    if (item1) rewardList.push(item1);
                    if (item2) rewardList.push(item2);
                    if (item3) rewardList.push(item3);
                    if (item4) rewardList.push(item4);
                    if (item5) rewardList.push(item5);
                    if (item6) rewardList.push(item6);
                    for(let i = 0;i<rewardList.length;i++){
                        if(rewardList[i].getComponent(Prop)){
                            PropManager.getInstance().changePropNum(rewardList[i].getComponent(Prop).prop_id,rewardList[i].getComponent(Prop).prop_num);
                        }else{
                            PropManager.getInstance().changePropNum(rewardList[i].getComponent(EquipItem).equip_info.equip_id,1);
                        }
                    }
                    GameManager.getInstance().showMultipleGetTip(rewardList);
                    let num = cc.sys.localStorage.getItem("pay_git_bag_item_" + this.data.GiftID) || 0;
                    cc.sys.localStorage.setItem("pay_git_bag_item_" + this.data.GiftID, ++num);
                    this.initData(this.data);
                    // switch(this.data.GiftID){
                    //     case 1001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Daily)
                    //     }break;
                    //     case 2001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Week)
                    //     }break;
                    //     case 3001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Month)
                    //     }break;
                    // }
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift)
                    if(this.data.GiftText == 1){
                        // 日
                        FollowManager.getInstance().followEvent(Follow_Type.每日礼包x档点击购买次数 + "AD");
                    }else if(this.data.GiftText == 2){
                        // 周
                        FollowManager.getInstance().followEvent(Follow_Type.每周礼包x档点击购买次数 + "AD");
                    }else{
                        // 月
                        FollowManager.getInstance().followEvent(Follow_Type.每月礼包x档点击购买次数 + "AD");
                    }
                }
            }).bind(this), VIDEO_TYPE.Gem);
        } else {
            ApkManager.getInstance().showPay({
                result: ((isPay: boolean) => {
                    if (isPay) {
                        let item1, item2, item3, item4, item5, item6;
                        if (this.data.GetCoinNum != 0) {
                            item1 = PropManager.getInstance().createPropItem(PropId.Coin, this.data.GetCoinNum);
                        }
                        if (this.data.GetGemNum != 0) {
                            item2 = PropManager.getInstance().createPropItem(PropId.Gem, this.data.GetGemNum);
                        }
                        if (this.data.GetCrystal != 0) {
                            item3 = PropManager.getInstance().createPropItem(PropId.LongJing, this.data.GetCrystal);
                            PayManager.getInstance().addTotalLongJingNum(this.data.GetCrystal);
                        }
                        if (this.data.ItemId_1 != 0) {
                            item4 = PropManager.getInstance().createPropItem(this.data.ItemId_1, this.data.ItemNum_1);
                        }
                        if (this.data.ItemId_2 != 0) {
                            item5 = PropManager.getInstance().createPropItem(this.data.ItemId_2, this.data.ItemNum_2);
                        }
                        if (this.data.ItemId_3 != 0) {
                            item6 = PropManager.getInstance().createPropItem(this.data.ItemId_3, this.data.ItemNum_3);
                        }
                        let rewardList: cc.Node[] = [];
                        if (item1) rewardList.push(item1);
                        if (item2) rewardList.push(item2);
                        if (item3) rewardList.push(item3);
                        if (item4) rewardList.push(item4);
                        if (item5) rewardList.push(item5);
                        if (item6) rewardList.push(item6);
                        for(let i = 0;i<rewardList.length;i++){
                            if(rewardList[i].getComponent(Prop)){
                                PropManager.getInstance().changePropNum(rewardList[i].getComponent(Prop).prop_id,rewardList[i].getComponent(Prop).prop_num);
                            }else{
                                PropManager.getInstance().changePropNum(rewardList[i].getComponent(EquipItem).equip_info.equip_id,1);
                            }
                        }
                        GameManager.getInstance().showMultipleGetTip(rewardList);
                        let num = cc.sys.localStorage.getItem("pay_git_bag_item_" + this.data.GiftID) || 0;
                        cc.sys.localStorage.setItem("pay_git_bag_item_" + this.data.GiftID, ++num);
                        this.initData(this.data);
                        if(this.data.GiftText == 1){
                            // 日
                            FollowManager.getInstance().followEvent(Follow_Type.每日礼包x档点击购买次数 + this.data.GiftID);
                        }else if(this.data.GiftText == 2){
                            // 周
                            FollowManager.getInstance().followEvent(Follow_Type.每周礼包x档点击购买次数 + this.data.GiftID);
                        }else{
                            // 月
                            FollowManager.getInstance().followEvent(Follow_Type.每月礼包x档点击购买次数 + this.data.GiftID);
                        }
                    }
                }).bind(this)
            }, this.data.ProductId)
        }
    }

}
