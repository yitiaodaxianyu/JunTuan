import { Go_Type } from "../Constants";
import GameManager from "../GameManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "./UIComponent";
import { UILayerLevel } from "./UIConfig";
import { UiAction } from "./UiInterface";
import { UIManager } from "./UIManager";

const {ccclass, property} = cc._decorator;

export enum GetAssetsType{
    Hero = 1,
    PetAndEquip = 2,
}

@ccclass
export default class GetAssetsUi extends UIComponent {

    type:number = GetAssetsType.Hero;

    init(uiAc: UiAction): void {
        super.init(uiAc)
    }

    initData(type:number){
        this.type = type;
    }

    onClickGoBtn(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().game_to_home=Go_Type.City;
        GameManager.getInstance().jumoAndShowUi();
        UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
        if(this.type == GetAssetsType.Hero){
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToTop(2);
        }else if(this.type == GetAssetsType.PetAndEquip){
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2,2);
        }
        this.onClose();
    }

}
