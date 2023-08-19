// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import WXManagerEX, { WXADEnvnt } from "../../startscene/WXManagerEX";
import { BossRewardManager } from "../Activity/BossReward";
import ApkManager from "../Ads/ApkManager";
import { BattlePassDataManager } from "../BattlePass/BattlePassData";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PayManager } from "../Payment/PayManager";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { TurntableInformationManager } from "../Turntable/TurntableInformation";
import UIComponent from "../UI/UIComponent";
import VipSystem from "./VipSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VIPPrivileges extends cc.Component {


    @property(cc.Node)
    itme:cc.Node[]=[]//每天领取的500钻石道具父节点
    id="c401"//c401  c501
    Gemnum:number=360
    // propid=[PropId.Gem,10002,40004,101004]
    // num=[this.Gemnum,500,10,20]
    propid=[10002,40004,101004]
    num=[500,10,20]
    @property(cc.Node)
    lanText:cc.Node=null//价格

    maxAadNum:number=10;
    start () {
        for (let index = 0; index < this.itme.length; index++) {
            let itme=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
            itme.scale=0.85
            itme.parent=this.itme[index]
        }
    }
    onEnable(){
        let adNum = TheStorageManager.getInstance().getNumber(StorageKey.VIPADNum,0);//观看广告次数
        this.lanText.getComponent(cc.Label).string="已观看"+adNum+"次广告，还差"+(this.maxAadNum-adNum)+"次可解锁";

        cc.director.on(WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
    }
    clickBtnbtnLan(){//购买

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {

          

            WXManagerEX.getInstance().zhanlingjiesuoShipin= wx.createRewardedVideoAd({
                adUnitId: 'adunit-5d0148773715f613'
            });

            WXManagerEX.getInstance().zhanlingjiesuoShipin.offError();
            WXManagerEX.getInstance().zhanlingjiesuoShipin.onError(err => {
                console.log(err)
            });
            WXManagerEX.getInstance().zhanlingjiesuoShipin.offClose();
            WXManagerEX.getInstance().zhanlingjiesuoShipin.show().catch(() => {
                // 失败重试
                WXManagerEX.getInstance().zhanlingjiesuoShipin.load()
                    .then(() => WXManagerEX.getInstance().zhanlingjiesuoShipin.show())
                    .catch(err => {
                        GameManager.getInstance().showMessage("广告拉取失败");
                    })
            })
            WXManagerEX.getInstance().zhanlingjiesuoShipin.onClose(res => {
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


        // ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
        //     if(isPay){
        //         FollowManager.getInstance().followEvent(Follow_Type.战令购买高级战令成功人数);
        //         let itme=[]
        //         for (let index = 0; index < this.itme.length; index++) {
        //             PropManager.getInstance().changePropNum(this.propid[index],this.num[index]);
        //             let itmes=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
        //             itme.push(itmes)
        //         }
        //         GameManager.getInstance().showMultipleGetTip(itme);
        //         TheStorageManager.getInstance().setItem(StorageKey.VipIdentity,1)
        //         PayManager.getInstance().addPayNum(this.id);
        //         this.node.parent.getComponent(VipSystem).Refresh()
        //         this.clickBtnClose()
        //     }
        // }},this.id) 
    }
    private onShipinComp():void{
        let adNum = TheStorageManager.getInstance().getNumber(StorageKey.VIPADNum,0)+1;//观看广告次数
        TheStorageManager.getInstance().setItem(StorageKey.VIPADNum,adNum);
        if(adNum==10){
            FollowManager.getInstance().followEvent(Follow_Type.战令购买高级战令成功人数);
            let itme=[]
            for (let index = 0; index < this.itme.length; index++) {
                PropManager.getInstance().changePropNum(this.propid[index],this.num[index]);
                let itmes=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
                itme.push(itmes)
            }
            GameManager.getInstance().showMultipleGetTip(itme);
            TheStorageManager.getInstance().setItem(StorageKey.VipIdentity,1)
            PayManager.getInstance().addPayNum(this.id);
            this.node.parent.getComponent(VipSystem).Refresh()
            this.clickBtnClose()
        }else{
            this.lanText.getComponent(cc.Label).string="已观看"+adNum+"次广告，还差"+(this.maxAadNum-adNum)+"次可解锁";
        }
        
      
       
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        cc.director.off(WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
        this.node.active=false
    }


    // update (dt) {}
}
