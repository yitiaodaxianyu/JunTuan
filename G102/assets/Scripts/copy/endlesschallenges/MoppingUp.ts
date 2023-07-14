// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BossChallengeManager } from "../../Activity/BossChallenge";
import { BossRewardManager } from "../../Activity/BossReward";
import { EndlessLevelsManager } from "../../Activity/EndlessLevels";
import { EndlessRewardManager } from "../../Activity/EndlessReward";
import GameManager from "../../GameManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import UIComponent from "../../UI/UIComponent";
import endlesschallenges from "./endlesschallenges";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoppingUp extends UIComponent {    
    @property(cc.Node)
    item: cc.Node[] = []

    @property(cc.Node)
    bttxt: cc.Node = null
    @property(cc.Node)
    text: cc.Node = null
    @property(cc.Node)
    num: cc.Node = null
    RewardItem:number=0
    RewardNum:number=0

    RewardItem1:number=0
    RewardNum1:number=0
    type: number = 0//2:无尽挑战   3：boss挑战

    othernode:cc.Node=null//刷新父节点的排行榜
    initUi(type,othernode?) {//2:无尽挑战   3：boss挑战
        this.type=type
        this.othernode=othernode
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            let damage=EndlessLevelsManager.getInstance().getMaxWave()//TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);
            if(damage>EndlessRewardManager.getMaxRewardLevel()){
                damage=EndlessRewardManager.getMaxRewardLevel()
            }
            let RewardItem=EndlessRewardManager.getInstance().getRewardItem(damage)
            let RewardNum=EndlessRewardManager.getInstance().getRewardNum(damage)
            this.RewardItem=RewardItem
            this.RewardNum=RewardNum
            let items=PropManager.getInstance().createPropItem(RewardItem,RewardNum);
            this.item[0].x=0
            items.parent=this.item[0]
            this.text.getComponent(TextLanguage).setTextId(800016)//上次波数
            this.bttxt.getComponent(TextLanguage).setTextId(800015)//上次波数
            let mynum=damage
            this.num.getComponent(cc.Label).string=""+mynum
        } else if (type == 3) {
            let damage=TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeDamage,-1);//BossChallengeManager.getInstance().getMaxDamageNumber()//S
            let RewardLevel=BossRewardManager.getInstance().getRewardLevel(damage)
            let RewardItem=BossRewardManager.getInstance().getRewardItem(RewardLevel)
            let RewardNum=BossRewardManager.getInstance().getRewardNum(RewardLevel)
            this.RewardItem=RewardItem
            this.RewardNum=RewardNum
            let items=PropManager.getInstance().createPropItem(RewardItem,RewardNum);
            this.item[0].x=-80
            items.parent=this.item[0]

            let RewardItem1=BossRewardManager.getInstance().getRewardItem_2(RewardLevel)
            let RewardNum1=BossRewardManager.getInstance().getRewardNum_2(RewardLevel)
            this.RewardItem1=RewardItem1
            this.RewardNum1=RewardNum1
            let items1=PropManager.getInstance().createPropItem(RewardItem1,RewardNum1);
            this.item[1].x=80
            items1.parent=this.item[1]

            this.text.getComponent(TextLanguage).setTextId(820015)//上次伤害
            this.bttxt.getComponent(TextLanguage).setTextId(820014)//上次伤害
            let mynum=damage
            this.num.getComponent(cc.Label).string=""+mynum
        }
    }
    clickBtnYes(){//确认扫荡
        let num
        let totalnum
        if (this.type == 2) {
            totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes,3);
            num--;
            totalnum++
            TheStorageManager.getInstance().setItem(StorageKey.TotalUnlimitedChallengeTimes,totalnum);
            TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeTimes,num);

            PropManager.getInstance().changePropNum(this.RewardItem,this.RewardNum);
            let items=PropManager.getInstance().createPropItem(this.RewardItem,this.RewardNum);
            GameManager.getInstance().showGetTip(items);
        } else if (this.type == 3) {
            let damage=TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeDamage,-1);
            let zon=damage+BossChallengeManager.getInstance().getMaxDamageNumber()
            BossChallengeManager.getInstance().setDamageNumber(zon)//游戏胜利之后保存
            
            totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes,3);
            num--;
            totalnum++
            TheStorageManager.getInstance().setItem(StorageKey.TotalBossChallengeTimes,totalnum);
            TheStorageManager.getInstance().setItem(StorageKey.BossChallengeTimes,num);

            this.othernode.getComponent(endlesschallenges).initUi(3)

            PropManager.getInstance().changePropNum(this.RewardItem,this.RewardNum);
            PropManager.getInstance().changePropNum(this.RewardItem1,this.RewardNum1);
            let items=PropManager.getInstance().createPropItem(this.RewardItem,this.RewardNum);
            let items1=PropManager.getInstance().createPropItem(this.RewardItem1,this.RewardNum1);
            GameManager.getInstance().showMultipleGetTip([items,items1]);
        }

        this.clickBtnClose()
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Activity);
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
