import ApkManager from "../Ads/ApkManager";
import { FuncType } from "../Constants";
import GameManager from "../GameManager";
import { ConstantConfigurationManager } from "../JsonData/ConstantConfiguration";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { DingYueManager } from "../Payment/DingYueManager";
import { PayManager } from "../Payment/PayManager";
import Prop from "../Prop/Prop";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { PayInfo } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UIComponent from "../UI/UIComponent";

const {ccclass, property} = cc._decorator;



@ccclass
export default class WeekCardUi extends UIComponent {

    google_id_1 = "c502"//订阅谷歌id

    google_id_2 = "c505"//显示谷歌id


    pay_info1:PayInfo = null;
    pay_info2:PayInfo = null;

    refreshUi(){
        FollowManager.getInstance().followEvent(Follow_Type.周卡特权卡页面展示次数);
        let prop1 = this.node.getChildByName("itemRoot1").children[0];
        prop1.getComponent(Prop).init(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(6)),PropAction.Look);

        if(prop1.getChildByName("bg") != null){
            prop1.getChildByName("bg").active = false;
            prop1.getChildByName("gou").active = false;
        }

        let prop2 = this.node.getChildByName("itemRoot2").children[0]
        prop2.getComponent(Prop).init(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(7)),PropAction.Look);
        this.pay_info1 = DingYueManager.getInstance().getWeekInfo();
        this.pay_info2 =  PayManager.getInstance().getPayInfo(this.google_id_2);
        this.node.getChildByName("price").getComponent(cc.Label).string = this.pay_info1.price;
        let dingyueBtn = this.node.getChildByName("dingYueBtn");
        if(this.pay_info1.is_buy){
            this.node.getChildByName("price").active = false;
            this.node.getChildByName("dingYueBtn").active = false;
            let receiveBtn = this.node.getChildByName("receiveBtn");
            receiveBtn.active = true;
            // 领取按钮处理
            if(TheStorageManager.getInstance().getNumber(StorageKey.WeekCardIsReceiveToday,0) == 0){
                receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                receiveBtn.getComponentInChildren(TextLanguage).setTextId(100011);
                if(prop2.getChildByName("bg") != null){
                    prop2.getChildByName("bg").active = false;
                    prop2.getChildByName("gou").active = false;
                }
            }else{
                receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                receiveBtn.getComponentInChildren(TextLanguage).setTextId(100013);
                if(prop2.getChildByName("bg") != null){
                    prop2.getChildByName("bg").active = true;
                    prop2.getChildByName("gou").active = true;
                }else{
                    let bg = new cc.Node();
                    bg.name = "bg";
                    bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                    let gou = new cc.Node();
                    gou.name = "gou";
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                    bg.opacity = 150;
                    // bg.addChild(gou);
                    prop2.addChild(bg);
                    prop2.addChild(gou);
                }
            }
            if(prop1.getChildByName("bg") != null){
                prop1.getChildByName("bg").active = true;
                prop1.getChildByName("gou").active = true;
            }else{
                let bg = new cc.Node();
                bg.name = "bg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                let gou = new cc.Node();
                gou.name = "gou";
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
            }
            if(Date.now() > TheStorageManager.getInstance().getNumber(StorageKey.WeekCardOverTime,0)){
                let t = TheStorageManager.getInstance().getNumber(StorageKey.WeekCardOverTime);
                let tt = 60*60*24*7 * 1000;
                TheStorageManager.getInstance().setItem(StorageKey.WeekCardOverTime,t+tt);
                PropManager.getInstance().changePropNum(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(6)));
                let item = PropManager.getInstance().createPropItem(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(6)));
                GameManager.getInstance().showGetTip(item);
            }
        }else{
            this.node.getChildByName("price").active = true;
            dingyueBtn.active = true;
            this.node.getChildByName("receiveBtn").active = false;
            if(prop1.getChildByName("bg") != null){
                prop1.getChildByName("bg").active = false;
                prop1.getChildByName("gou").active = false;
            }
        }
        if(TheStorageManager.getInstance().getNumber(StorageKey.WeekCardIsFirstBuy,0) == 0){
            this.node.getChildByName("price").children[0].active = true;
            dingyueBtn.getComponentInChildren(cc.Label).string = this.pay_info2.price;
            dingyueBtn.children[1].active = true;
        }else{
            this.node.getChildByName("price").children[0].active = false;
            dingyueBtn.getComponentInChildren(cc.Label).string = this.pay_info1.price;
            dingyueBtn.children[1].active = false;
        } 
    }
    
    onClickDingYueBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        ApkManager.getInstance().showDingYue({
            result:(isDy:boolean)=>{
                if(isDy){
                    this.node.getChildByName("dingYueBtn").active = false;
                    this.node.getChildByName("receiveBtn").active = true;
                    TheStorageManager.getInstance().setItem(StorageKey.WeekCardIsFirstBuy,1);
                    PropManager.getInstance().changePropNum(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(6)));
                    let item = PropManager.getInstance().createPropItem(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(6)));
                    GameManager.getInstance().showGetTip(item);
                    DingYueManager.getInstance().getWeekInfo().is_buy=true;
                    let t = Date.now();
                    let tt = 60*60*24*7 * 1000;
                    TheStorageManager.getInstance().setItem(StorageKey.WeekCardOverTime,t+tt);
                    
                    let prop1 = this.node.getChildByName("itemRoot1").children[0];
                    if(prop1.getChildByName("bg") != null){
                        prop1.getChildByName("bg").active = true;
                        prop1.getChildByName("gou").active = true;
                    }else{
                        let bg = new cc.Node();
                        bg.name = "bg";
                        bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                        let gou = new cc.Node();
                        gou.name = "gou";
                        gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                        bg.opacity = 150;
                        // bg.addChild(gou);
                        prop1.addChild(bg);
                        prop1.addChild(gou);
                    }
                }
            }
        },this.google_id_1)
    }

    onClickReceiveBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(TheStorageManager.getInstance().getNumber(StorageKey.WeekCardIsReceiveToday,0) == 0){
            TheStorageManager.getInstance().setItem(StorageKey.WeekCardIsReceiveToday,1);
            PropManager.getInstance().changePropNum(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(7)));
            let item = PropManager.getInstance().createPropItem(PropId.Gem,Number(ConstantConfigurationManager.getInstance().getValue(7)));
            GameManager.getInstance().showGetTip(item);
            let receiveBtn = this.node.getChildByName("receiveBtn");
            receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            receiveBtn.getComponentInChildren(TextLanguage).setTextId(100013);

            let prop2 = this.node.getChildByName("itemRoot2").children[0]
            if(prop2.getChildByName("bg") != null){
                prop2.getChildByName("bg").active = true;
                prop2.getChildByName("gou").active = true;
            }else{
                let bg = new cc.Node();
                bg.name = "bg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                let gou = new cc.Node();
                gou.name = "gou";
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop2.addChild(bg);
                prop2.addChild(gou);
            }
        }
    }

    onClickCancelBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("Tipspop").active = true;
    }

    onHideCancel(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("Tipspop").active = false;
    }

    onClickBtnClose(){
        super.onClose();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_WeekCard);
    }
}
