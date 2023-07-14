import GameManager from "../GameManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { CumulativeRechargeManager } from "./Data/CumulativeRecharge";
import { PayManager } from "./PayManager";
import PaymentUi from "./PaymentUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TotalLongJingItem extends cc.Component {

    total_id:number=0;

    onEnable() {
        this.init();
    }

    init () {
        this.refreshReward();
        this.refreshBtn();
    }

    refreshReward(){
        let totalNum=PayManager.getInstance().getTotalLongJingNum();
        let CRM=CumulativeRechargeManager.getInstance();
        let data=CRM.getData();
        let isHaveNoGet=false;
        data.forEach((v,k)=>{
            let state=PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            if(!isHaveNoGet&&state==1){
                isHaveNoGet=true;
                this.total_id=v.CumulativeRechargeID;
            }
        });
        if(isHaveNoGet==false){
            this.total_id=CRM.getId(totalNum);
            if(this.total_id==0){
                this.node.removeFromParent();
                return;
            }
        }
        //奖励列表
        let itemContent=this.node.getChildByName('itemScrollView').getComponent(cc.ScrollView).content;
        itemContent.removeAllChildren();
        let rewardDatas=CRM.getRewardData(this.total_id);
        for(let i=0; i<rewardDatas.length; i++){
            let rewardData=rewardDatas[i];
            let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
            itemContent.addChild(item);
        }
        //进度条
        let targetTotal=CRM.getCumulativeRechargePrice(this.total_id);
        this.node.getChildByName('numLabel').getComponent(cc.Label).string=totalNum+'/'+targetTotal;
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress=totalNum/targetTotal;
        //翻译
        let numText=this.node.getChildByName('numText').getComponent(TextLanguage);
        numText.setReplaceValue('~',''+targetTotal);
    }

    refreshBtn(){
        //按钮
        let btnGet=this.node.getChildByName('btnGet').getComponent(cc.Button);
        let state=PayManager.getInstance().getTotalLongJingGetState(this.total_id);        
        if(state==1){
            btnGet.interactable=true;
        }else{
            btnGet.interactable=false;
        }
        let red=btnGet.node.getChildByName('red');
        red.active=btnGet.interactable;
    }

    onClickGet(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let state=PayManager.getInstance().getTotalLongJingGetState(this.total_id);
        if(state==1){
            PayManager.getInstance().setTotalLongJingGetState(this.total_id,2);
            let rewardDatas=CumulativeRechargeManager.getInstance().getRewardData(this.total_id);
            let itemList=new Array();
            for(let i=0; i<rewardDatas.length; i++){
                let rewardData=rewardDatas[i];
                let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
                PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
                itemList.push(item);
            }
            GameManager.getInstance().showMultipleGetTip(itemList);
            EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_LongJing);
            this.init();
        }
    }

    onClickBtnMore(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //显示累计充值界面
        PaymentUi._instance.showIndex(4);
    }

}
