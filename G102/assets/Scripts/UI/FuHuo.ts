import AdManager from "../Ads/AdManager";
import { VipManager } from "../Ads/VipManager";
import { VIDEO_TYPE } from "../Constants";
import GameManager from "../GameManager";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FuHuo extends cc.Component {

    remain_time:number=10;

    onLoad()
    {
        this.remain_time=11;
        this.showRemain();
        this.schedule(this.showRemain,1);
        if(VipManager.getIsVip()==true){
            this.node.getChildByName('ads').active=false;
        }
    }

    showRemain()
    {
        this.remain_time--;
        let remainLabel=this.node.getChildByName('btnFuHuo').getChildByName('remainLabel');
        remainLabel.getComponent(cc.Label).string=this.remain_time+'s';
        if(this.remain_time<=0)
        {            
            this.showGameLose();
        }
    }

    showGameLose()
    {
        GameManager.getInstance().showGameLose();
        this.destroySelf();
    }

   clickBtnFangQi()
   {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.showGameLose();
   }

   clickBtnFuhuo()
   {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(VipManager.getIsVip()==true)
        {
            GameManager.getInstance().onFuhuo();
            this.destroySelf();
            return;
        }
        this.unschedule(this.showRemain);
        AdManager.getInstance().showVideo((isSuc:boolean)=>{
            if(isSuc)
            {
                GameManager.getInstance().onFuhuo();
                this.destroySelf();
            }else
            {
                this.schedule(this.showRemain,1);
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
        },VIDEO_TYPE.Coin);
   }

   destroySelf()
   {
       cc.director.resume();
       this.node.removeFromParent();
   }
}
