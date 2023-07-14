// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { JackpotManager } from "../../JsonData/Jackpot";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import UIComponent from "../../UI/UIComponent";
import { RoguefastPassManager } from "./RoguefastPass";
// import { RogueHexagonTypesManager } from "./RogueHexagonTypes";
import VoidScene from "./VoidScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoppingVoid extends UIComponent {

    @property(cc.Node)
    item: cc.Node[] =[];

    type:number=0//打的那个的id

    initUi(type) {//扫荡  扫荡哪一章

        this.type=type//id
        let Prop1_ID=RoguefastPassManager.getInstance().getPropID_1(this.type)
        let Prop1_Sum=RoguefastPassManager.getInstance().getPropNum_1(this.type)
        let ietm1=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        ietm1.parent=this.item[0]


        let Prop2_ID=RoguefastPassManager.getInstance().getPropID_2(this.type)
        let ietm2=PropManager.getInstance().createPropItem(Prop2_ID,1);
        ietm2.parent=this.item[1]
    }
    clickBtnShow(){//确认按钮
        let Prop1_ID=RoguefastPassManager.getInstance().getPropID_1(this.type)
        let Prop1_Sum=RoguefastPassManager.getInstance().getPropNum_1(this.type)

        let Prop2_ID=RoguefastPassManager.getInstance().getPropID_2(this.type)
        let Prop2_Sum=RoguefastPassManager.getInstance().getPropNum_2(this.type)
        let rd=JackpotManager.getInstance().getRewardDataById(Prop2_ID);

        let ietm1=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        let ietm2=PropManager.getInstance().createPropItem(rd.reward_id,Prop2_Sum);

        PropManager.getInstance().changePropNum(Prop1_ID,Prop1_Sum);
        PropManager.getInstance().changePropNum(rd.reward_id,Prop2_Sum);

        let myietm=[ietm1,ietm2]
        GameManager.getInstance().showMultipleGetTip(myietm);

        let totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalVoidCrackChallengeTimes,0);
        let num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
        num--;
        totalnum++
        TheStorageManager.getInstance().setItem(StorageKey.TotalVoidCrackChallengeTimes,totalnum);
        TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeTimes,num);

        this.clickBtnClose();
    }
    clickBtnClose()//关闭
    {
        this.item[0].children[0].destroy()
        this.item[1].children[0].destroy()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    
    }
    // update (dt) {}
}
