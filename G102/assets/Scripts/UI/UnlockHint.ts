import { Go_Type } from "../Constants";
import GameData from "../GameData";
import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UnlockHint extends cc.Component {

    protected start(): void {
        let hintText=this.node.getChildByName('hintText').getComponent(cc.Label);
        hintText.string=LanguageManager.getInstance().getStrByTextId(3107);
        GameData.getInstance().saveSignUnlockHint();
    }

   clickBtnOk(){
       GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
       GameManager.getInstance().game_to_home=Go_Type.Main_Sign;
       GameManager.getInstance().backToHome();
   }
}
