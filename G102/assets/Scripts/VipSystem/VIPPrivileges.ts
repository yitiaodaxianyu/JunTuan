// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    start () {
        for (let index = 0; index < this.itme.length; index++) {
            let itme=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
            itme.scale=0.85
            itme.parent=this.itme[index]
        }
    }
    onEnable(){
        this.lanText.getComponent(cc.Label).string=""+PayManager.getInstance().getPayInfo(this.id).price
    }
    clickBtnbtnLan(){//购买
        ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
            if(isPay){
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
            }
        }},this.id) 
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.active=false
    }


    // update (dt) {}
}
