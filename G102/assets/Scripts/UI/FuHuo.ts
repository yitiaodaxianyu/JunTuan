import WXManagerEX from "../../startscene/WXManagerEX";
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

    remain_time:number=20;

    onLoad()
    {
        this.remain_time=21;
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
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if(VipManager.getIsVip()==true)
            {
                GameManager.getInstance().onFuhuo();
                this.destroySelf();
                return;
            }
            this.unschedule(this.showRemain);
            
            WXManagerEX.getInstance().fuhuoShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-81a1f1f3d7c367bb'
            });
            WXManagerEX.getInstance().fuhuoShipin.offError();
            WXManagerEX.getInstance().fuhuoShipin.onError(err => {
                console.log(err)
                this.schedule(this.showRemain,1);
            });
            WXManagerEX.getInstance().fuhuoShipin.offClose();
            WXManagerEX.getInstance().fuhuoShipin.show().catch(() => {
                // 失败重试
                WXManagerEX.getInstance().fuhuoShipin.load()
                    .then(() => WXManagerEX.getInstance().fuhuoShipin.show())
                    .catch(err => {
                        GameManager.getInstance().showMessage("广告拉取失败");
                        this.schedule(this.showRemain,1);
                    })
            })
            WXManagerEX.getInstance().fuhuoShipin.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    this.schedule(this.showRemain,1);
                }
            })
        }else{
            this.onShipinComp();
        }
       
        
   }
    //视频观看完成
    private onShipinComp(): void {
        
        GameManager.getInstance().onFuhuo();
        this.destroySelf();
    }
   destroySelf()
   {
       cc.director.resume();
       this.node.removeFromParent();
   }
}
