import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { PetInfo } from "../PetConfig";
import { PetManager } from "../PetManager";
import BtnPet from "./BtnPet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetAdvanceShowUi extends UIComponent {

    now_pet_info:PetInfo;
    old_pet_info:PetInfo;

    init(uiAc: UiAction): void {
        super.init(uiAc)
    }

    initData(nowPetInfo:PetInfo,oldPetInfo:PetInfo){
        this.now_pet_info = nowPetInfo;
        this.old_pet_info = oldPetInfo;
        this.refreshUi();
    }

    refreshUi(){
        this.node.getChildByName("old_btn_pet").getComponent(BtnPet).init(this.old_pet_info);
        this.node.getChildByName("now_btn_pet").getComponent(BtnPet).init(this.now_pet_info);

        // this.node.getChildByName("oldQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.old_pet_info.pet_quality);
        // this.node.getChildByName("nowQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.now_pet_info.pet_quality);

        // let oldData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.old_pet_info.pet_id,this.old_pet_info.pet_quality));
        // let nowData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.now_pet_info.pet_id,this.now_pet_info.pet_quality));

        // this.node.getChildByName("oldNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.old_pet_info).toString();
        // this.node.getChildByName("oldNumLabel2").getComponent(cc.Label).string = oldData.Cooperation.toString();
        // this.node.getChildByName("oldNumLabel3").getComponent(cc.Label).string = oldData.defend.toString();
        // this.node.getChildByName("oldNumLabel4").getComponent(cc.Label).string = oldData.OneHeart.toString();
        // this.node.getChildByName("oldNumLabel5").getComponent(cc.Label).string = oldData.Hit.toString();
        // this.node.getChildByName("oldNumLabel6").getComponent(cc.Label).string = oldData.Miss.toString();
        // this.node.getChildByName("oldNumLabel7").getComponent(cc.Label).string = oldData.Critical.toString();
        // this.node.getChildByName("oldNumLabel8").getComponent(cc.Label).string = oldData.ExtraCritical.toString();
        // this.node.getChildByName("oldNumLabel9").getComponent(cc.Label).string = oldData.AntiCritical.toString();
        // this.node.getChildByName("oldNumLabel10").getComponent(cc.Label).string = oldData.AntiExtraCritical.toString();

        // this.node.getChildByName("nowNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.now_pet_info).toString();
        // this.node.getChildByName("nowNumLabel2").getComponent(cc.Label).string = nowData.Cooperation.toString();
        // this.node.getChildByName("nowNumLabel3").getComponent(cc.Label).string = nowData.defend.toString();
        // this.node.getChildByName("nowNumLabel4").getComponent(cc.Label).string = nowData.OneHeart.toString();
        // this.node.getChildByName("nowNumLabel5").getComponent(cc.Label).string = nowData.Hit.toString();
        // this.node.getChildByName("nowNumLabel6").getComponent(cc.Label).string = nowData.Miss.toString();
        // this.node.getChildByName("nowNumLabel7").getComponent(cc.Label).string = nowData.Critical.toString();
        // this.node.getChildByName("nowNumLabel8").getComponent(cc.Label).string = nowData.ExtraCritical.toString();
        // this.node.getChildByName("nowNumLabel9").getComponent(cc.Label).string = nowData.AntiCritical.toString();
        // this.node.getChildByName("nowNumLabel10").getComponent(cc.Label).string = nowData.AntiExtraCritical.toString();


    }

    getPetAptitudeId(id:number,quality:number){
        return id * 100 + quality;
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
