import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import CoinPop from "../CoinPop";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import UserData from "../UserData";
import { UserInfo } from "../UserInfo/UserInfo";
import AccumulatedRechargeUi from "./AccumulatedRechargeUi";
import { CumulativeRechargesManager, JsonCumulativeRecharges } from "./CumulativeRecharges";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AccumulatedRechargeItem extends cc.Component {

    message:JsonCumulativeRecharges=null;
    
    initGoingItem(message:JsonCumulativeRecharges){
        this.message = message;
        let nowNum = UserInfo.getInstance().payGem;
        this.node.getChildByName("label1").getComponent(TextLanguage).setReplaceValue("~",message.DiamondRechargePrice+'');
        this.node.getChildByName("label2").getComponent(cc.Label).string = nowNum + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = nowNum/message.DiamondRechargePrice;
        let itemRoot = this.node.getChildByName("itemRoot");
        if(itemRoot.childrenCount == 0){
            let prop1 = PropManager.getInstance().createPropItem(message.Item1_ID,message.Item1_Num);
            let prop2 = PropManager.getInstance().createPropItem(message.Item2_ID,message.Item2_Num);
            let prop3 = PropManager.getInstance().createPropItem(message.Item3_ID,message.Item3_Num);
            prop1.scale = 0.75;
            prop2.scale = 0.75;
            prop3.scale = 0.75;
            itemRoot.addChild(prop1);
            itemRoot.addChild(prop2);
            itemRoot.addChild(prop3);
        }

        let btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = true;
        let text = btn.getComponentInChildren(TextLanguage);
        text.setTextId(100034);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    }

    initFinishItem(message:JsonCumulativeRecharges){
        this.message = message;
        // let nowNum = 0;
        this.node.getChildByName("label1").getComponent(TextLanguage).setReplaceValue("~",message.DiamondRechargePrice+'');
        this.node.getChildByName("label2").getComponent(cc.Label).string = message.DiamondRechargePrice + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = message.DiamondRechargePrice/message.DiamondRechargePrice;
        let itemRoot = this.node.getChildByName("itemRoot");
        if(itemRoot.childrenCount == 0){
            let prop1 = PropManager.getInstance().createPropItem(message.Item1_ID,message.Item1_Num);
            let prop2 = PropManager.getInstance().createPropItem(message.Item2_ID,message.Item2_Num);
            let prop3 = PropManager.getInstance().createPropItem(message.Item3_ID,message.Item3_Num);
            prop1.scale = 0.75;
            prop2.scale = 0.75;
            prop3.scale = 0.75;
            itemRoot.addChild(prop1);
            itemRoot.addChild(prop2);
            itemRoot.addChild(prop3);
        }
        let btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = true;
        let text = btn.getComponentInChildren(TextLanguage);
        text.setTextId(100011);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    }

    initReceivedItem(message:JsonCumulativeRecharges){
        this.message = message;
        this.node.getChildByName("label1").getComponent(TextLanguage).setReplaceValue("~",message.DiamondRechargePrice+'');
        this.node.getChildByName("label2").getComponent(cc.Label).string = message.DiamondRechargePrice + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = message.DiamondRechargePrice/message.DiamondRechargePrice;
        let itemRoot = this.node.getChildByName("itemRoot");
        if(itemRoot.childrenCount == 0){
            let prop1 = PropManager.getInstance().createPropItem(message.Item1_ID,message.Item1_Num);
            let bg = new cc.Node();
            bg.name = "bbbg";
            bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
            let gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
    
            prop1 = PropManager.getInstance().createPropItem(message.Item2_ID,message.Item2_Num);
            bg = new cc.Node();
            bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
            gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
    
            prop1 = PropManager.getInstance().createPropItem(message.Item3_ID,message.Item3_Num);
            bg = new cc.Node();
            bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
            gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
        }else{
            if(itemRoot.children[0].getChildByName("bbbg") == null){
                let prop1 = itemRoot.children[0];
                let bg = new cc.Node();
                bg.name = "bbbg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                let gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
    
                prop1 = itemRoot.children[1];
                bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
    
                prop1 = itemRoot.children[2];
                bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
            }
        }

        let btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = false;
        let text = btn.getComponentInChildren(TextLanguage);
        text.setTextId(100013);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
    }
   
    onBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let data = CumulativeRechargesManager.getInstance().rewardMap;
        let state = data.get(this.message.CumulativeRechargeID);
        if(state == 0){
            UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(CoinPop).init({
                    onClose:()=>{
                        this.node.parent.parent.parent.parent.getComponent(AccumulatedRechargeUi).refreshUi();
                    }
                })
                uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            },});
        }else if(state == 1){
            PropManager.getInstance().changePropNum(this.message.Item1_ID,this.message.Item1_Num);
            PropManager.getInstance().changePropNum(this.message.Item2_ID,this.message.Item2_Num);
            PropManager.getInstance().changePropNum(this.message.Item3_ID,this.message.Item3_Num);
            HttpManager.post(AccessName.saveGameTask,this.setUserTaskJsonString());
            FollowManager.getInstance().followEvent(Follow_Type.累计充值每一档的领取次数x+this.message.CumulativeRechargeID);

            // CumulativeRechargesManager.getInstance().refreshData();
            CumulativeRechargesManager.getInstance().modifyData(this.message);
            // this.node.parent.parent.parent.parent.getComponent(AccumulatedRechargeUi).refreshUi();
            this.initReceivedItem(this.message);
            GameManager.getInstance().showMultipleGetTip([
                PropManager.getInstance().createPropItem(this.message.Item1_ID,this.message.Item1_Num),
                PropManager.getInstance().createPropItem(this.message.Item2_ID,this.message.Item2_Num),
                PropManager.getInstance().createPropItem(this.message.Item3_ID,this.message.Item3_Num)
            ]);
        }
    }

    private setUserTaskJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            createTime:"",
            id:"",
            playLevel:this.message.CumulativeRechargeID,
            rewardType:6,
            uid:uid,
        });
    }
}
