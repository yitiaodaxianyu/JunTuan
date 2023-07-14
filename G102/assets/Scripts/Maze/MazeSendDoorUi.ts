import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { UIManager } from "../UI/UIManager";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeSendDoorUi extends UIComponent {

    box_id:number=5;
    is_can_go:boolean=true;    

    start(){
    this.initUi();
    }

    initUi(){
        //标题
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830008);
        let contentLabel=this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830014);
        
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        let curFloor=MazeManager.getInstance().getFloor();
        if(curFloor<2){
            MazeManager.getInstance().setFloor(curFloor+1);
            MazeManager.getInstance().resetFloorData();
            MazeUi.getInstance().jumpToNextFloor();
            super.onClose();        
        }
        
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
}
