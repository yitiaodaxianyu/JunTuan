import WXManagerEX, { WXADEnvnt } from "../../../startscene/WXManagerEX";
import ApkManager from "../../Ads/ApkManager";
import { VIDEO_TYPE } from "../../Constants";
import GameManager from "../../GameManager";
import { RewardData } from "../../JsonData/LevelJsonData";
import { PropManager } from "../../Prop/PropManager";
import UIComponent from "../UIComponent";
import { UILayerLevel } from "../UIConfig";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SignInGetTip extends UIComponent {

    reward_info:RewardData = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);
        cc.director.on(WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
    }

    initData(rewardInfo:RewardData){
        this.reward_info = rewardInfo;
        let reward = PropManager.getInstance().createPropItem(rewardInfo.reward_id,rewardInfo.reward_num);
        let root = this.node.getChildByName("itemRoot");
        root.removeAllChildren();
        root.addChild(reward);
    }

    onClickAdBtn(){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {

            WXManagerEX.getInstance().qiriQiandaoShipin= wx.createRewardedVideoAd({
                adUnitId: 'adunit-fafe5d05ac20c01b'
            });
            WXManagerEX.getInstance().qiriQiandaoShipin.offError();
                    WXManagerEX.getInstance().qiriQiandaoShipin.onError(err => {
                        console.log(err)
                    });
            WXManagerEX.getInstance().qiriQiandaoShipin.offClose();
            WXManagerEX.getInstance().qiriQiandaoShipin.show().catch(() => {
                // 失败重试
                WXManagerEX.getInstance().qiriQiandaoShipin.load()
                    .then(() => WXManagerEX.getInstance().qiriQiandaoShipin.show())
                    .catch(err => {
                        GameManager.getInstance().showMessage("广告拉取失败");
                    })
            })
            WXManagerEX.getInstance().qiriQiandaoShipin.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                  // 正常播放结束，可以下发游戏奖励
                  this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
            })

        }else{
            this.onShipinComp();
        }
    }
    private onShipinComp(): void {
        UIManager.getInstance().closeAllUiDialog(UILayerLevel.Two);
        PropManager.getInstance().changePropNum(this.reward_info.reward_id,this.reward_info.reward_num);
    }
    onClose(): void {
        super.onClose();
        cc.director.off(WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);

    }

}
