import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { PetInfo } from "../PetConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetReductionUi extends UIComponent {

    private pet_info:PetInfo = null;

   init(uiAc: UiAction): void {
       super.init(uiAc);
   }

   initData(petInfo:PetInfo){
        this.pet_info = petInfo;
        this.refreshUi();
   }

   refreshUi(){
        // this.node.getChildByName("cinItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level));
        // this.node.getChildByName("foodItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level));
   }

   onClickSureBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(PropManager.getInstance().changePropNum(PropId.Gem,-50)){
            FollowManager.getInstance().followEvent(Follow_Type.宠物还原总次数);
            FollowManager.getInstance().followEvent(Follow_Type.不同宠物的还原次数 + this.pet_info.pet_id);
            // let coinNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level);
            // let foodNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level)
            // let coinItem = PropManager.getInstance().createPropItem(PropId.Coin,coinNum);
            // let foodItem = PropManager.getInstance().createPropItem(PropId.AnimalFood,foodNum);
            // let rewardList:cc.Node[] = [];
            // this.pet_info.resetLevel();
            // rewardList.push(coinItem);
            // rewardList.push(foodItem);
            // GameManager.getInstance().showMultipleGetTip(rewardList,(() =>{
            //     PropManager.getInstance().changePropNum(PropId.Coin,coinNum);
            //     PropManager.getInstance().changePropNum(PropId.AnimalFood,foodNum);
            //     this.destroySelf();
            // }).bind(this));
        }
   }

   clickBtnClose()
   {
       GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
       this.destroySelf();
   }

   destroySelf()
   {
       super.onClose();
       ApkManager.getInstance().closeBanner();
       // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
   }

}
