// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { BossWeeklyRewardManager } from "./BossWeeklyReward";

const { ccclass, property } = cc._decorator;

@ccclass
export default class rankingrewarddisplay extends UIComponent {    
    @property(cc.Node)
    item: cc.Node[] = []
    RewardGrade:number=-1//排名  默认-1     
    // Administrator:
    // 1：第1名
    // 2：第2名
    // 3：第3名
    // 4：4-10名
    // 5：11-50名
    // 6：51-100名
    // 7：100名+
    // boss:number[]=[20003,40006,20003,10002]
    initUi(type) {//排名  默认-1  
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if(type==-1){
            this.RewardGrade=7
        }else if(type==1){
            this.RewardGrade=1
        }else if(type==2){
            this.RewardGrade=2
        }else if(type==3){
            this.RewardGrade=3
        }else if(type<=10&&type>=4){
            this.RewardGrade=4
        }else if(type<=50&&type>=11){
            this.RewardGrade=5
        }else if(type<=100&&type>=51){
            this.RewardGrade=6
        }

        let rewardData= BossWeeklyRewardManager.getInstance().getFirstRewardArr(this.RewardGrade)
        for (let index = 0; index < this.item.length; index++) {
            if(index<rewardData.length){
                let items=PropManager.getInstance().createPropItem(rewardData[index].reward_id,rewardData[index].reward_num);
                this.item[index].active=true
                items.parent=this.item[index]
            }else{
                this.item[index].active=false
            }
        }
    }
    shanchu(){
        for (let index = 0; index < this.item.length; index++) {
            if(this.item[index].childrenCount>0){
                this.item[index].children[0].destroy()  
            }
        }
    }

    clickBtnClose()//关闭
    {
        this.shanchu()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
