import AdManager from "../../Ads/AdManager";
import { VIDEO_TYPE, GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import Game from "../Game";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpeedUp extends cc.Component {

    
    clickBtnSpeedUp()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        AdManager.getInstance().showVideo((isSuc:boolean)=>{
            if(isSuc)
            {
                //cc.kSpeed(JiaSu);
                let game=cc.find('Canvas').getComponent(Game);
                game.is_unlock_rate=true;
                game.setBtnRateShow();
            }else{
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
            this.destroySelf();
        },VIDEO_TYPE.Coin);
    }

    clickBtnNo()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;
        cc.director.resume();
        this.node.removeFromParent();        
    }
    
}
