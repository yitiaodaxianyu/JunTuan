// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ApkManager from "../../Ads/ApkManager";
import CoinPop from "../../CoinPop";
import { VIDEO_TYPE } from "../../Constants";
import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { BossWeeklyRewardManager } from "./BossWeeklyReward";

const { ccclass, property } = cc._decorator;

@ccclass
export default class purchasesnumbe extends UIComponent {    
    @property(cc.Node)
    num: cc.Node = null
    mynum:number[]=[50,200,300]//[50,100,150]
    type: number = 0//2:无尽挑战   3：boss挑战
    
    initUi(type) {
        let buynum
        this.type=type
        if(this.type==2){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyUnlimitedChallengeTimes,3);
        }else if(this.type==3){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyBossChallengeTimes,3);
        }else if(this.type==4){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyVoidCrackChallengeTimes,3);
        }
        this.num.getComponent(cc.Label).string=""+this.mynum[3-buynum]
    }
    clickBtnBuy(){//钻石购买
        let buynum
        if(this.type==2){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyUnlimitedChallengeTimes,3);
        }else if(this.type==3){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyBossChallengeTimes,3);
        }
        else if(this.type==4){
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyVoidCrackChallengeTimes,3);
        }
        let gem=PropManager.getInstance().getPropNum(PropId.Gem);


        if(gem>=this.mynum[3-buynum]){
            //可以购买
            PropManager.getInstance().changePropNum(PropId.Gem,-this.mynum[3-buynum]);
            buynum--
            if(this.type==2){
                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战挑战次数购买数);
                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_挑战次数购买数_每日第x次购买+(3-buynum));
                TheStorageManager.getInstance().setItem(StorageKey.BuyUnlimitedChallengeTimes,buynum);
                let num=TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes,0);
                num++
                TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeTimes,num);
            }else if(this.type==3){
                FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战挑战次数购买数);
                FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战_挑战次数购买数_每日第x次购买+(3-buynum));
                TheStorageManager.getInstance().setItem(StorageKey.BuyBossChallengeTimes,buynum);
                let num=TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes,0);
                num++
                TheStorageManager.getInstance().setItem(StorageKey.BossChallengeTimes,num);
            }
            else if(this.type==4){
                FollowManager.getInstance().followEvent(Follow_Type.虚空裂缝挑战次数购买数);
                FollowManager.getInstance().followEvent(Follow_Type.虚空裂缝_挑战次数购买数_每日第x次购买+(3-buynum));
                TheStorageManager.getInstance().setItem(StorageKey.BuyVoidCrackChallengeTimes,buynum);
                let num=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,0);
                num++
                TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeTimes,num);
            }
            this.clickBtnClose()
        }else{
            //钱不够
            UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
                uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            },});
        }
    }
    clickBtnBuyAd(){//广告购买
        ApkManager.getInstance().showVideo(((isTrue)=>{
            if(isTrue){
                let buynum
                if(this.type==2){
                    buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyUnlimitedChallengeTimes,3);
                }else if(this.type==3){
                    buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyBossChallengeTimes,3);
                }
                else if(this.type==4){
                    buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyVoidCrackChallengeTimes,3);
                }
                //可以购买
                PropManager.getInstance().changePropNum(PropId.Gem,-this.mynum[3-buynum]);
                buynum--
                if(this.type==2){
                    FollowManager.getInstance().followEvent(Follow_Type.无尽挑战挑战次数购买数);
                    FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_挑战次数购买数_每日第x次购买+(3-buynum));
                    TheStorageManager.getInstance().setItem(StorageKey.BuyUnlimitedChallengeTimes,buynum);
                    let num=TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes,0);
                    num++
                    TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeTimes,num);
                }else if(this.type==3){
                    FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战挑战次数购买数);
                    FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战_挑战次数购买数_每日第x次购买+(3-buynum));
                    TheStorageManager.getInstance().setItem(StorageKey.BuyBossChallengeTimes,buynum);
                    let num=TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes,0);
                    num++
                    TheStorageManager.getInstance().setItem(StorageKey.BossChallengeTimes,num);
                }
                else if(this.type==4){
                    FollowManager.getInstance().followEvent(Follow_Type.虚空裂缝挑战次数购买数);
                    FollowManager.getInstance().followEvent(Follow_Type.虚空裂缝_挑战次数购买数_每日第x次购买+(3-buynum));
                    TheStorageManager.getInstance().setItem(StorageKey.BuyVoidCrackChallengeTimes,buynum);
                    let num=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,0);
                    num++
                    TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeTimes,num);
                }
                this.clickBtnClose()
            }
        }),VIDEO_TYPE.Equip)
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
