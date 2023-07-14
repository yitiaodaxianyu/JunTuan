import GameManager from "../GameManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropAction } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { CumulativeRechargeManager, JsonCumulativeRecharge } from "./Data/CumulativeRecharge";
import PayAccumulateChargeItem from "./PayAccumulateChargeItem";
import { PayManager } from "./PayManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PayAccumulateChargeUi extends cc.Component {

    @property(cc.Prefab)
    item:cc.Prefab = null;
    @property(cc.SpriteAtlas)
    common_ui:cc.SpriteAtlas = null;

    protected onEnable(): void {
        this.refreshUi();
    }

    protected start(): void {
        PayManager.getInstance().addTodayShow(PayUiIndex.Total);
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Total);
        this.adaptation();
    }

    private adaptation()
    {        
        let bottomNode=this.node.parent.getChildByName('bottom');
        let bottomHeight=bottomNode.height;
        let bottomY=bottomNode.y;        
        let topNode=this.node.parent.getChildByName('top')
        let topHeight=topNode.height;
        let topY=topNode.y;
        let height=((topY-topHeight)-(bottomY+bottomHeight));
        let centerY=(topY-topHeight-height/2);
        let scrollView=this.node.getChildByName('itemScroll');
        scrollView.height=height - this.node.getChildByName("Recharge_Bg_1").height;
        scrollView.y=centerY - 120;
        let tempPos = this.node.getChildByName("Recharge_Bg_1").y - this.node.getChildByName("tipLab").y;
        scrollView.getChildByName('view').height=height - this.node.getChildByName("Recharge_Bg_1").height;
        this.node.getChildByName("Recharge_Bg_1").y = topNode.y - (topNode.height + this.node.getChildByName("Recharge_Bg_1").height/2);
        this.node.getChildByName("tipLab").y = this.node.getChildByName("Recharge_Bg_1").y - tempPos;
    }

    refreshUi(){
        let data:Map<number,JsonCumulativeRecharge> = CumulativeRechargeManager.getInstance().getData();
        let content = this.node.getChildByName("itemScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        data.forEach((v,k) => {
            let state = PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            // if(state == 0){
            //     if(PayManager.getInstance().getTotalLongJingNum() > v.CumulativeRechargePrice){
            //         PayManager.getInstance().setTotalLongJingGetState(v.CumulativeRechargeID,1);
            //     }
            // }
            let item = cc.instantiate(this.item);
            item.getComponent(PayAccumulateChargeItem).initData(v);
            if(state == 2){
                let Itemcontent = item.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
                Itemcontent.children.forEach((v,k) =>{
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Common_Checkmark")
                    let mask = new cc.Node();
                    mask.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Item_frame_ZheZhao")
                    mask.opacity = 150;
                    mask.setParent(v);
                    gou.setParent(v);
                });
            }
            content.addChild(item);
            item.setSiblingIndex(0);
        });
        let maxData = CumulativeRechargeManager.getInstance().getJsonCumulativeRecharge(CumulativeRechargeManager.getMaxCumulativeRechargeID());
        this.node.getChildByName("Recharge_Bg_1").removeAllChildren();
        this.node.getChildByName("tipLab").getComponent(TextLanguage).setReplaceValue('~',maxData.CumulativeRechargePrice + '');
        // let reward = PropManager.getInstance().createPropItem(70021,1);
        // reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
        // reward.y = 30;
        if(PayManager.getInstance().getTotalLongJingNum() >= maxData.CumulativeRechargePrice){
            if(cc.sys.localStorage.getItem("pay_accumulate_charge_final") == null){
                let reward = PropManager.getInstance().createPropItem(70021,1,PropAction.Null);
                reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
                reward.y = 30;
                let btn=reward.getComponent(cc.Button);
                btn.interactable=true;
                let clickEvent=new cc.Component.EventHandler();
                clickEvent.target=this.node;
                clickEvent.component='PayAccumulateChargeUi';
                clickEvent.handler='onClickReward';
                // clickEvent.customEventData=enemyType+'';
                btn.clickEvents.push(clickEvent);
            }else{
                let reward = PropManager.getInstance().createPropItem(70021,1,PropAction.Null);
                reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
                let gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Common_Checkmark")
                let mask = new cc.Node();
                mask.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Item_frame_ZheZhao")
                mask.setParent(reward);
                mask.opacity = 150;
                gou.setParent(reward);
                reward.y = 30;
            }
        }else{
            let reward = PropManager.getInstance().createPropItem(70021,1);
            reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
            reward.y = 30;
        }
    }

    onClickReward(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let reward = PropManager.getInstance().createPropItem(70021,1);
        PropManager.getInstance().changePropNum(70021,1);
        cc.sys.localStorage.setItem("pay_accumulate_charge_final",1);
        GameManager.getInstance().showGetTip(reward,(() => {
            this.refreshUi();
        }).bind(this));
    }

}
