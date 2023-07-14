import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";

import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { UIManager } from "../UI/UIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeDoor extends cc.Component {

   
    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showMazeSendDoorUi();
    }
}
