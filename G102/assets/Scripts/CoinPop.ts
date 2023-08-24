// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { HttpManager, AccessName } from "./NetWork/HttpManager";
import { CumulativeRechargesManager } from "./AccumulatedRecharge/CumulativeRecharges";
import ApkManager from "./Ads/ApkManager";
import { Btn_Index, Go_Type, VIDEO_TYPE } from "./Constants";
import GameManager from "./GameManager";
import Home from "./Home";
import { Follow_Type } from "./multiLanguage/FollowConstants";
import FollowManager from "./multiLanguage/FollowManager";
import LanguageManager from "./multiLanguage/LanguageManager";
import TextLanguage from "./multiLanguage/TextLanguage";
import { PayManager } from "./Payment/PayManager";
import { PropId } from "./Prop/PropConfig";
import { PropManager } from "./Prop/PropManager";
import { MusicIndex, SoundIndex } from "./Sound/AudioConstants";
import { StorageKey } from "./Storage/StorageConfig";
import { TheStorageManager } from "./Storage/StorageManager";
import { DiamondsRechargeManager, JsonDiamondsRecharge } from "./Store/DiamondsRecharge";
import UIComponent from "./UI/UIComponent";
import { UILayerLevel, UIPath } from "./UI/UIConfig";
import { UiAction } from "./UI/UiInterface";
import { UIManager } from "./UI/UIManager";
import UserData from "./UserData";
import { UserInfo } from "./UserInfo/UserInfo";
import Turmtable from "./Turntable/Turmtable";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CoinPop extends UIComponent {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    itme:cc.Node=null
    @property(cc.Prefab)
    gem_item:cc.Prefab = null;
    @property(cc.SpriteAtlas)
    store_ui:cc.SpriteAtlas = null;
    // onLoad () {}
    type:PropId=PropId.Coin//默认金币

    num:number=20000//10000
    initUi(type) {
        UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(Turmtable).initUi()
        },});//转盘
        this.onClose();
        return;
        FollowManager.getInstance().followEvent(Follow_Type.资源不足弹窗弹出次数);
        this.type=type
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        //金币 10000
        if(this.itme.childrenCount>0){
            this.itme.children[0].destroy()
        }
        let items
        if(this.type==PropId.Coin){
            items=PropManager.getInstance().createPropItem(PropId.Coin,20000);
            this.num=20000;
            items.parent=this.itme
            this.node.getChildByName("coin").active = true;
            this.node.getChildByName("gem").active = false;
        }else if(this.type==PropId.Gem){
            // items=PropManager.getInstance().createPropItem(PropId.Gem,200);
            // this.num=200
            // console.log(GameManager.getInstance().game_to_home)
            let gemData = DiamondsRechargeManager.getInstance().getJsonData();
            let gemRoot = this.node.getChildByName("gem").getChildByName("content");
            if(gemRoot.childrenCount == 0){
                gemData.forEach((v,k) => {
                    let item = cc.instantiate(this.gem_item);
                    item.name = 'gem' + v.RechargeID;
                    item.scale = 0.82;
                    item.getChildByName("title").getComponent(TextLanguage).setTextId(400002);
                    item.getChildByName("title").getComponent(TextLanguage).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage).string;
                    let payInfo = PayManager.getInstance().getPayInfo(v.ProductId);
                    item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
                    item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
                    if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                        item.getChildByName('bg').active = true;
                        item.getChildByName('tip').active = true;
                        item.getChildByName("tip").getComponent(TextLanguage).setTextId(1410004);
                        item.getChildByName("tip").getComponent(TextLanguage).setReplaceValue('~',v.GetDiamondsNum + '');
                    }else{
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                    }
                    let button = item.addComponent(cc.Button);
                    button.transition = cc.Button.Transition.SCALE;
                    button.duration = 0.1;
                    button.zoomScale = 0.9;

                    let clickEvent=new cc.Component.EventHandler();
                    clickEvent.target=this.node;
                    clickEvent.component='CoinPop';
                    clickEvent.handler='onGemBtnClick';
                    clickEvent.customEventData = v.RechargeID + '';
                    button.clickEvents.push(clickEvent);
        
                    // item.on(cc.Node.EventType.TOUCH_END,()=>{
                    //     ApkManager.getInstance().showPay({
                    //         result:(isDy)=> {
                    //             if(isDy){
                    //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
                    //                     item.getChildByName('bg').active = false;
                    //                     item.getChildByName('tip').active = false;
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }else{
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }
                    //             }
                    //         }
                    //     },v.ProductId)
                    // });
                    gemRoot.addChild(item);
                });
            }else{
                gemData.forEach((v,k) => {
                    let item = gemRoot.getChildByName('gem' + v.RechargeID);
                    item.getChildByName("title").getComponent(TextLanguage).setTextId(400002);
                    item.getChildByName("title").getComponent(TextLanguage).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage).string;
                    let payInfo = PayManager.getInstance().getPayInfo(v.ProductId);
                    item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
                    item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
                    if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                        item.getChildByName('bg').active = true;
                        item.getChildByName('tip').active = true;
                        item.getChildByName("tip").getComponent(TextLanguage).setTextId(1410004);
                        item.getChildByName("tip").getComponent(TextLanguage).setReplaceValue('~',v.GetDiamondsNum + '');
                    }else{
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                    }
                    // item.off(cc.Node.EventType.TOUCH_END);
                    // item.on(cc.Node.EventType.TOUCH_END,()=>{
                    //     ApkManager.getInstance().showPay({
                    //         result:(isDy)=> {
                    //             if(isDy){
                    //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
                    //                     item.getChildByName('bg').active = false;
                    //                     item.getChildByName('tip').active = false;
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }else{
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }
                    //             }
                    //         }
                    //     },v.ProductId)
                    // });
                });
            }
            this.node.getChildByName("coin").active = false;
            this.node.getChildByName("gem").active = true;
        }
    }

    init(uiAc: UiAction): void {
        //super.init(uiAc);
    }

    // start () {
        
    // }
    clickBtnAd(){
        //coin 10000   zhuanshi:100

        if(TheStorageManager.getInstance().getNumber(StorageKey.CoinPopAd,0) > 4){
            // 没次数提示100120
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100120),3);
        }else{
            let videoType=VIDEO_TYPE.Coin;
            if(this.type==PropId.Gem){
                videoType=VIDEO_TYPE.Gem;
            }
            ApkManager.getInstance().showVideo(((isTrue)=>{
                if(isTrue){
                    FollowManager.getInstance().followEvent(Follow_Type.点击资源不足时广告获得按钮次数);
                    //有次数 ,可以看广告
                    let num = TheStorageManager.getInstance().getNumber(StorageKey.CoinPopAd,0);
                    num++;
                    TheStorageManager.getInstance().setItem(StorageKey.CoinPopAd,num);
                    PropManager.getInstance().changePropNum(this.type,this.num);
                    GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(this.type,this.num));
                    this.clickBtnClose()
                }
            }),videoType)
        }
    }
    clickBtnShow(){
        cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2)
        GameManager.getInstance().game_to_home=Go_Type.City
        FollowManager.getInstance().followEvent(Follow_Type.点击资源不足时前往的按钮点击次数);
        GameManager.getInstance().jumoAndShowUi()
        UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
        this.clickBtnClose()
    }
    clickBtnClose()//关闭
    {
        if(this.itme.childrenCount>0){
            this.itme.children[0].destroy()
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }

    onGemBtnClick(e,id:string){
        let item = this.node.getChildByName("gem").getChildByName("content").getChildByName("gem" + id);
        let v:JsonDiamondsRecharge = DiamondsRechargeManager.getInstance().getJsonDiamondsRecharge(Number(id));
        ApkManager.getInstance().showPay({
            result:(isDy)=> {
                if(isDy){
                    FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                        let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                        PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                        UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager.post(AccessName.updateUserInfo,this.setCumulativeRechargeJsonString(v.DiamondsNum)).then((data:any)=>{
                            UserInfo.getInstance().refreshData();
                            CumulativeRechargesManager.getInstance().refreshData();
                        });
                        TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                        GameManager.getInstance().showGetTip(reward);
                    }else{
                        let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
                        PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
                        UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager.post(AccessName.updateUserInfo,this.setCumulativeRechargeJsonString(v.DiamondsNum)).then((data:any)=>{
                            UserInfo.getInstance().refreshData();
                            CumulativeRechargesManager.getInstance().refreshData();
                        });
                        GameManager.getInstance().showGetTip(reward);
                    }
                }
            }
        },v.ProductId)
    }

    private setCumulativeRechargeJsonString(addNum:number):string{
        let uid=UserData.getInstance().getUserID();
        let num=addNum;
        return JSON.stringify({
            type:8,
            uid:uid,
            value:num,
        });
    }

    // update (dt) {}
}
