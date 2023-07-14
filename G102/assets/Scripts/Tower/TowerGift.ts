import ApkManager from "../Ads/ApkManager";
import { VIDEO_TYPE } from "../Constants";
import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import TowerManager from "./TowerManager";
import { TowerRewardManager } from "./TowerReward";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerGift extends cc.Component {

    remain_sec:number=5;

    protected start(): void {
        let text=this.node.getChildByName('jobLabel');
        text.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(810006);
        this.schedule(this.countdown,1);
        this.showCountdown();
    }

    countdown(){
        this.remain_sec--;
        this.showCountdown();
        if(this.remain_sec<0){
            this.unschedule(this.countdown);
            this.node.removeFromParent();
        }
    }

    showCountdown(){
        let text=this.node.getChildByName('btnVideo').getChildByName('text');
        text.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(100030)+"("+this.remain_sec+")";
    }

    clickBtnVideo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.unschedule(this.countdown);
        // ApkManager.getInstance().showVideo((isTrue:boolean)=>{
        //     if(isTrue){
        //         let level=TowerManager.getTowerLevel()-1;
        //         let list=TowerRewardManager.getInstance().getAdReward(level);
        //         let gm=GameManager.getInstance();
        //         let itemList=new Array();
        //         for(let i=0; i<list.length; i++)
        //         {
        //             let rewardData=list[i];
        //             //可以获得奖品
        //             let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
        //             PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
        //             itemList.push(item);
        //         }
        //         gm.showMultipleGetTip(itemList,()=>{
        //             this.node.removeFromParent();
        //         });
        //     }else{
        //         this.schedule(this.countdown,1);
        //     }
        // },VIDEO_TYPE.Ziyuan);        
    }
}
