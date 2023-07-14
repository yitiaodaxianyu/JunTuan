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
import UIComponent from "../../UI/UIComponent";
import { RogueHexagonTypesManager } from "./RogueHexagonTypes";
import VoidScene from "./VoidScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Windfall extends UIComponent {

    @property(cc.Node)
    item: cc.Node[] =[];

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    type:number=0//打的那个的id
    mynode:cc.Node=null//选择格子的界面

    index:number=0//行数
    myindex:number=0//位置
    // onLoad () {}
    initUi(type,mynode,index,myindex) {//意外之财   是哪个位置的奖励   格子节点  //行数   位置   

        this.type=type//id
        this.mynode=mynode//格子界面
        this.index=index//行数
        this.myindex=myindex//位置
        
        
        let Prop1_ID=RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type)
        let Prop1_Sum=RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type)
        let ietm1=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        ietm1.parent=this.item[0]
        let Prop2_ID=RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type)

        let ietm2=PropManager.getInstance().createPropItem(Prop2_ID,1);
        ietm2.parent=this.item[1]
    }
    clickBtnShow(){//确认按钮
        let Prop1_ID=RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type)
        let Prop1_Sum=RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type)

        let Prop2_ID=RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type)
        let Prop2_Sum=RogueHexagonTypesManager.getInstance().getRogueProp2_Sum(this.type)
        let rd=JackpotManager.getInstance().getRewardDataById(Prop2_ID);

        let ietm1=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        let ietm2=PropManager.getInstance().createPropItem(rd.reward_id,Prop2_Sum);

        PropManager.getInstance().changePropNum(Prop1_ID,Prop1_Sum);
        PropManager.getInstance().changePropNum(rd.reward_id,Prop2_Sum);

        let myietm=[ietm1,ietm2]
        GameManager.getInstance().showMultipleGetTip(myietm);

        this.mynode.getComponent(VoidScene).Rowsnumber=this.index//行数
        this.mynode.getComponent(VoidScene).Positionnumber=this.myindex//位置数
        this.mynode.getComponent(VoidScene).Refresh()
        // this.mynode.getComponent(VoidScene).initUi(this.mytype,this.index,this.myindex)
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
