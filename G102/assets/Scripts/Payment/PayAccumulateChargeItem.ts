import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { JsonCumulativeRecharge } from "./Data/CumulativeRecharge";
import PayAccumulateChargeUi from "./PayAccumulateChargeUi";
import { PayManager } from "./PayManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PayAccumulateChargeItem extends cc.Component {

    private data: JsonCumulativeRecharge = null;

    initData(data:JsonCumulativeRecharge){
        this.data = data;
        let item1, item2, item3, item4, item5
        if (data.GetCoin != 0) {
            item1 = PropManager.getInstance().createPropItem(PropId.Coin, data.GetCoin);
            item1.scale = 0.85;
        }
        if (data.GetGem != 0) {
            item2 = PropManager.getInstance().createPropItem(PropId.Gem, data.GetGem);
            item2.scale = 0.85;
        }
        if (data.Item1_ID != 0) {
            item3 = PropManager.getInstance().createPropItem(data.Item1_ID, data.Item1_Num);
            item3.scale = 0.85;
        }
        if (data.Item2_ID != 0) {
            item4 = PropManager.getInstance().createPropItem(data.Item2_ID, data.Item2_Num);
            item4.scale = 0.85;
        }
        if (data.Item3_ID != 0) {
            item5 = PropManager.getInstance().createPropItem(data.Item3_ID, data.Item3_Num);
            item5.scale = 0.85;
        }
        let content = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        if (item1) content.addChild(item1);
        if (item2) content.addChild(item2);
        if (item3) content.addChild(item3);
        if (item4) content.addChild(item4);
        if (item5) content.addChild(item5);
        let state = PayManager.getInstance().getTotalLongJingGetState(data.CumulativeRechargeID);
        if(state != 0){
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(-108,62));
            if(state == 1){
                this.node.getChildByName("rewardBtn").active = true;
                this.node.getChildByName("rewardBtn1").active = false;
            }else{
                this.node.getChildByName("rewardBtn1").active = true;
                this.node.getChildByName("rewardBtn").active = false;
            }
        }else{
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(0,62));
        }
        this.node.getChildByName("Label1").getComponent(TextLanguage).setTextId(1420001);
        this.node.getChildByName("Label1").getComponent(TextLanguage).setReplaceValue("~",data.CumulativeRechargePrice + "");
        this.node.getChildByName("num").getComponent(cc.Label).string =  PayManager.getInstance().getTotalLongJingNum() + "/" + data.CumulativeRechargePrice;
        this.node.getChildByName("Task_Bar_0").getComponent(cc.ProgressBar).progress =  PayManager.getInstance().getTotalLongJingNum() / data.CumulativeRechargePrice;
    }
    
    onClickRewardBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.每一档累充奖励领取人数 + this.data.CumulativeRechargePrice)
        let item1, item2, item3, item4, item5;
        let rewardList:cc.Node[] = [];
        if (this.data.GetCoin != 0) {
            item1 = PropManager.getInstance().createPropItem(PropId.Coin, this.data.GetCoin);
            PropManager.getInstance().changePropNum(PropId.Coin, this.data.GetCoin)
            item1.scale = 0.85;
        }
        if (this.data.GetGem != 0) {
            item2 = PropManager.getInstance().createPropItem(PropId.Gem, this.data.GetGem);
            PropManager.getInstance().changePropNum(PropId.Gem, this.data.GetGem)
            item2.scale = 0.85;
        }
        if (this.data.Item1_ID != 0) {
            item3 = PropManager.getInstance().createPropItem(this.data.Item1_ID, this.data.Item1_Num);
            PropManager.getInstance().changePropNum(this.data.Item1_ID, this.data.Item1_Num)
            item3.scale = 0.85;
        }
        if (this.data.Item2_ID != 0) {
            item4 = PropManager.getInstance().createPropItem(this.data.Item2_ID, this.data.Item2_Num);
            PropManager.getInstance().changePropNum(this.data.Item2_ID, this.data.Item2_Num)
            item4.scale = 0.85;
        }
        if (this.data.Item3_ID != 0) {
            item5 = PropManager.getInstance().createPropItem(this.data.Item3_ID, this.data.Item3_Num);
            PropManager.getInstance().changePropNum(this.data.Item3_ID, this.data.Item3_Num)
            item5.scale = 0.85;
        }
        PayManager.getInstance().setTotalLongJingGetState(this.data.CumulativeRechargeID,2);
        if (item1) rewardList.push(item1);
        if (item2) rewardList.push(item2);
        if (item3) rewardList.push(item3);
        if (item4) rewardList.push(item4);
        if (item5) rewardList.push(item5);

        GameManager.getInstance().showMultipleGetTip(rewardList,(()=>{
            this.node.parent.parent.parent.parent.getComponent(PayAccumulateChargeUi).refreshUi();
        }))
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Total);
    }

}
