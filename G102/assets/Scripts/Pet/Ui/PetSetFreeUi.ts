import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { RewardData } from "../../JsonData/LevelJsonData";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { PetInfo } from "../PetConfig";
import { PetManager } from "../PetManager";
import BtnPet from "./BtnPet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetSetFreeUi extends UIComponent {

    private pet_info_list:PetInfo[] = [];
    private reward_list:RewardData[] =[];

    @property(cc.Prefab)
    pet_item:cc.Prefab = null;
    
    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    initData(petInfoList:PetInfo[]){
        this.pet_info_list = petInfoList;
        this.refreshUi();
    }

    refreshUi(){
        let content1 = this.node.getChildByName("petScroll").getComponent(cc.ScrollView).content;
        let content2 = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;

        this.pet_info_list.forEach((v,k) =>{
            // let data:JsonSpiritRelease = SpiritReleaseManager.getInstance().getDataByQualityAndRarity(v.pet_quality,SpiritMessageManager.getInstance().getSpiritRarity(v.pet_id));
            // let rewardData:RewardData = new RewardData();
            // rewardData.reward_id = data.GetItem;
            // rewardData.reward_num = data.GetNum;
            // let isAdd = false;
            // this.reward_list.find((v,i,a) => {
            //     if(v.reward_id == data.GetItem){
            //         v.reward_num += data.GetNum;
            //         isAdd = true
            //     }
            // });
            // if(isAdd == false){
            //     this.reward_list.push(rewardData);
            // }
        });

        this.pet_info_list.forEach((v,k) =>{
            let petItem = cc.instantiate(this.pet_item);
            petItem.getComponent(BtnPet).init(v);
            content1.addChild(petItem);
        });

        this.reward_list.forEach((v,k) => {
            let item = PropManager.getInstance().createPropItem(v.reward_id,v.reward_num);
            content2.addChild(item);
        });
    }

    onClickSureBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.pet_info_list.forEach((v,k) =>{
        //    PetManager.getInstance().removePet(v);
        });

        this.reward_list.forEach((v,k) =>{
            PropManager.getInstance().changePropNum(v.reward_id,v.reward_num);
        });
        let rewardList:cc.Node[] = [];
        this.reward_list.forEach((v,k) => {
            let item = PropManager.getInstance().createPropItem(v.reward_id,v.reward_num);
            rewardList.push(item);
        });
        GameManager.getInstance().showMultipleGetTip(rewardList,(() => {
            this.destroySelf();
        }).bind(this));
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Fangsheng);
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
