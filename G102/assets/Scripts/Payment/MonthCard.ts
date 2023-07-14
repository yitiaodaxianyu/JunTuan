import { ActivityManager, ActivityType } from "../Activity/ActivityManager";
import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { DingYue_Type, PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { PrivilegedCardInformationManager } from "./Data/PrivilegedCardInformation";
import { DingYueManager } from "./DingYueManager";
import { PayManager } from "./PayManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MonthCard extends cc.Component {

    car_id:number=1001;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.initUi();
        PayManager.getInstance().addTodayShow(PayUiIndex.ZuXiang);
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
    }

    initUi(){
        let jsonData=PrivilegedCardInformationManager.getInstance().getJsonPrivilegedCardInformation(this.car_id);
        let nowGem=jsonData.GetDiamondsNowNum;
        let dailyNum=jsonData.ReceiveDiamondsEveryDayNum;
        let totalNum=jsonData.CumulativeGetDiamonds;
        let tequanIds=jsonData.GainPrivileges;
        let parameters=jsonData.PrivilegeParameters;
        let textIds=jsonData.PrivilegeText;
        let content=this.node.getChildByName('textScrollView').getComponent(cc.ScrollView).content;
        for(let i=0; i<textIds.length; i++){
            let text=content.children[i].getComponent(TextLanguage);            
            text.setPrefix(tequanIds[i]+'. ');
            text.setTextId(textIds[i]);
            text.setReplaceValue('~',this.getParametersStr(tequanIds[i],parameters[i]));
        }
        //立即获得
        this.node.getChildByName('nowNumLabel').getComponent(cc.Label).string=''+nowGem;
        //每日获得
        let item1=PropManager.getInstance().createPropItem(PropId.Gem,dailyNum);
        item1.scale=0.9;
        this.node.getChildByName('dailyRoot').addChild(item1);
        //累计
        let item2=PropManager.getInstance().createPropItem(PropId.Gem,totalNum)
        item2.scale=0.9;
        this.node.getChildByName('totalRoot').addChild(item2);
        this.showBtnState();
    }

    getParametersStr(id:number,parameter:number):string{        
        switch(id){
            case 1:{
                return (parameter*100)+'%';
            }
            case 2:{
                return parameter+'';
            }
            case 3:{
                return parameter+'';
            }
            case 4:{
                return (parameter*100)+'%';
            }
            default:{
                return parameter+'';
            }
        }
    }

    showBtnState(){
        //按钮
        let btnGet=this.node.getChildByName('btnGet');
        let btnBuy=this.node.getChildByName('btnBuy');
        //let info=DingYueManager.getInstance().getMonthCardInfo();
        //收益
        let shouyiText=this.node.getChildByName('shouyiText').getComponent(TextLanguage);
        shouyiText.setReplaceValue('~',"50%");
        //文字
        let stateText=this.node.getChildByName('stateText').getComponent(TextLanguage);
        // if(info.is_buy){
        //     btnBuy.active=false;
        //     btnGet.active=true; 
        //     stateText.setTextId(1400009);
        //     let btn=btnGet.getComponent(cc.Button);
        //     let getText=btnGet.getChildByName('getText').getComponent(TextLanguage);
        //     let labelOutline=getText.getComponent(cc.LabelOutline);
        //     if(DingYueManager.getInstance().getTodayIsGet(this.car_id)){
        //         getText.setTextId(100013);
        //         btn.interactable=false;
        //         labelOutline.color=cc.color(54,54,54);
        //     }else{
        //         getText.setTextId(100011);
        //         btn.interactable=true;
        //         labelOutline.color=cc.color(99,61,10);
        //     }
        //     //红点
        //     let red=btnGet.getChildByName('red');
        //     red.active=btn.interactable;
        // }else{
        //     btnBuy.active=true;
        //     btnGet.active=false;
        //     stateText.setTextId(1400005);
        //     btnBuy.getChildByName('priceLabel').getComponent(cc.Label).string=info.price+info.currency;
        // }
    }

    clickBtnBuy(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.月卡点击购买次数);
        ApkManager.getInstance().showDingYue({
            result:(isDy:boolean)=>{
                if(isDy){
                    PayManager.getInstance().addPayNum(PrivilegedCardInformationManager.getInstance().getProductId(this.car_id));
                    let num=PrivilegedCardInformationManager.getInstance().getGetDiamondsNowNum(this.car_id);
                    PropManager.getInstance().changePropNum(PropId.Gem,num);
                    GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(PropId.Gem,num),null);                    
                    //DingYueManager.getInstance().getMonthCardInfo().is_buy=true;
                    //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
                    ActivityManager.getInstance().changeTicket(ActivityType.Endless,1);
                    ActivityManager.getInstance().changeTicket(ActivityType.Boss,1);
                    this.initUi();
                }
            }
        },PrivilegedCardInformationManager.getInstance().getProductId(this.car_id));
    }

    clickBtnGet(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(!DingYueManager.getInstance().getTodayIsGet(this.car_id)){
            DingYueManager.getInstance().saveTodayGet(this.car_id,true);
            let num=PrivilegedCardInformationManager.getInstance().getReceiveDiamondsEveryDayNum(this.car_id);
            PropManager.getInstance().changePropNum(PropId.Gem,num);
            GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(PropId.Gem,num),null);
            this.showBtnState();
            //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
        }        
    }

    // update (dt) {}
}
