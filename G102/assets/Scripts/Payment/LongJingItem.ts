import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { JsonCrystalRecharge } from "./Data/CrystalRecharge";
import LongJingUi from "./LongJingUi";
import { PayManager } from "./PayManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LongJingItem extends cc.Component {

    longjing_data:JsonCrystalRecharge=null;
    longjing_ts:LongJingUi=null;

    protected start(): void {
        let numText=this.node.getChildByName('numText').getComponent(TextLanguage);
        numText.setReplaceValue("~",(this.longjing_data.CrystalQuantity)+' ');
        //价格,需要转换
        let priceLabel=this.node.getChildByName('priceLabel').getComponent(cc.Label);
        let payInfo=PayManager.getInstance().getPayInfo(this.longjing_data.ProductId);
        // priceLabel.string=payInfo.price+payInfo.currency;
        priceLabel.string=payInfo.price;
        //item
        let item=PropManager.getInstance().createPropItem(PropId.LongJing,this.longjing_data.CrystalQuantity,PropAction.Look);
        this.node.addChild(item);
        item.y=88;
        this.refresh();
    }

    init (longjingData:JsonCrystalRecharge,longjingTs:LongJingUi) {
        //龙晶数量
        this.longjing_data=longjingData;
        this.longjing_ts=longjingTs;
    }

    refresh(){
        //首次充值文本
        let first=this.node.getChildByName('first');
        if(PayManager.getInstance().getPayNum(this.longjing_data.ProductId)<=0){
            let firstText=first.getChildByName('firstText').getComponent(TextLanguage);
            firstText.setReplaceValue("~",''+this.longjing_data.DiamondsQuality);
            first.active=true;
        }else{
            first.active=false;
        }
    }

    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.x龙晶点击购买次数 + this.longjing_data.CrystalQuantity);
        ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
            if(isPay){
                let PM=PropManager.getInstance();
                let itemList=new Array();
                if(PayManager.getInstance().getPayNum(this.longjing_data.ProductId)<=0){
                    PM.changePropNum(PropId.Gem,this.longjing_data.DiamondsQuality);   
                    itemList.push(PM.createPropItem(PropId.Gem,this.longjing_data.DiamondsQuality));               
                }
                PayManager.getInstance().addPayNum(this.longjing_data.ProductId);                
                PayManager.getInstance().addTotalLongJingNum(this.longjing_data.CrystalQuantity);
                PM.changePropNum(PropId.LongJing,this.longjing_data.CrystalQuantity);
                itemList.push(PM.createPropItem(PropId.LongJing,this.longjing_data.CrystalQuantity));
                GameManager.getInstance().showMultipleGetTip(itemList);
                this.refresh();
                this.longjing_ts.refreshTotalItem();
                //红点检测一下
                EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_LongJing);
                GameManager.getInstance().refreshLongJingShow();
            }
        }},this.longjing_data.ProductId)
    }


    // update (dt) {}
}
