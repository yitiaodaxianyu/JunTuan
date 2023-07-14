import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { ItemManager } from "../Prop/Data/Item";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";
import AccumulatedRechargeItem from "./AccumulatedRechargeItem";
import { CumulativeRechargesManager } from "./CumulativeRecharges";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AccumulatedRechargeUi extends UIComponent {

    @property(cc.Prefab)
    accumulated_recharge_ui:cc.Prefab = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);
        this.refreshUi();
    }
    
    refreshUi(){
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        let data = CumulativeRechargesManager.getInstance().rewardMap;
        if(content.childrenCount == 0){
            let rewardList = new Map<number,number>();
            data.forEach((v,k)=>{
                let message = CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                if(rewardList.has(message.Item1_ID) == false && ItemManager.getInstance().getType(message.Item1_ID) != 3){
                    rewardList.set(message.Item1_ID,message.Item1_Num);
                }else if(rewardList.has(message.Item1_ID) == true){
                    let num = rewardList.get(message.Item1_ID) + message.Item1_Num;
                    rewardList.set(message.Item1_ID,num);
                }
                if(rewardList.has(message.Item2_ID) == false && ItemManager.getInstance().getType(message.Item2_ID) != 3){
                    rewardList.set(message.Item2_ID,message.Item2_Num);
                }else if(rewardList.has(message.Item2_ID) == true){
                    let num = rewardList.get(message.Item2_ID) + message.Item2_Num;
                    rewardList.set(message.Item2_ID,num);
                }
                if(rewardList.has(message.Item3_ID) == false && ItemManager.getInstance().getType(message.Item3_ID) != 3){
                    rewardList.set(message.Item3_ID,message.Item3_Num);
                }else if(rewardList.has(message.Item3_ID) == true){
                    let num = rewardList.get(message.Item3_ID) + message.Item3_Num;
                    rewardList.set(message.Item3_ID,num);
                }
                let item = cc.instantiate(this.accumulated_recharge_ui);
                item.name = "item" + message.CumulativeRechargeID;
                if(v == 0){
                    item.getComponent(AccumulatedRechargeItem).initGoingItem(message);
                }else if(v == 1){
                    item.getComponent(AccumulatedRechargeItem).initFinishItem(message);
                }else{
                    item.getComponent(AccumulatedRechargeItem).initReceivedItem(message);
                }
                content.addChild(item);
            });
            let itemRoot = this.node.getChildByName("itemRoot");
            rewardList.forEach((v,k)=>{
                let item = PropManager.getInstance().createPropItem(k,v);
                item.scale = 0.75;
                itemRoot.addChild(item);
            });
        }else{
            data.forEach((v,k)=>{
                let message = CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                let item = content.getChildByName("item" + message.CumulativeRechargeID);
                if(v == 0){
                    item.getComponent(AccumulatedRechargeItem).initGoingItem(message);
                }else if(v == 1){
                    item.getComponent(AccumulatedRechargeItem).initFinishItem(message);
                }else{
                    item.getComponent(AccumulatedRechargeItem).initReceivedItem(message);
                }
            });
        }
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
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_LeiChong);
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }
}
