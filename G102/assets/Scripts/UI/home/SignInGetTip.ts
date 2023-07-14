import ApkManager from "../../Ads/ApkManager";
import { VIDEO_TYPE } from "../../Constants";
import { RewardData } from "../../JsonData/LevelJsonData";
import { PropManager } from "../../Prop/PropManager";
import UIComponent from "../UIComponent";
import { UILayerLevel } from "../UIConfig";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SignInGetTip extends UIComponent {

    reward_info:RewardData = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    initData(rewardInfo:RewardData){
        this.reward_info = rewardInfo;
        let reward = PropManager.getInstance().createPropItem(rewardInfo.reward_id,rewardInfo.reward_num);
        let root = this.node.getChildByName("itemRoot");
        root.removeAllChildren();
        root.addChild(reward);
    }

    onClickAdBtn(){
        ApkManager.getInstance().showVideo(((isTrue)=>{
            UIManager.getInstance().closeAllUiDialog(UILayerLevel.Two);
            PropManager.getInstance().changePropNum(this.reward_info.reward_id,this.reward_info.reward_num);
        }),VIDEO_TYPE.Equip);
    }

}
