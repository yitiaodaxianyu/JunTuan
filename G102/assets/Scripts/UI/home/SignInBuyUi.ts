import { HttpManager, AccessName } from "../.././NetWork/HttpManager";
import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { SignInManager, SignInType } from "../../JsonData/SignIn";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { PayManager } from "../../Payment/PayManager";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";

const {ccclass, property} = cc._decorator;

const googldId = "c601";

@ccclass
export default class SignInBuyUi extends UIComponent {

    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    iniData(){
        this.refreshUi();
    }

    refreshUi(){
        let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
        let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        let payInfo = PayManager.getInstance().getPayInfo(googldId);
        let rewardList = new Map<number,number>();
        for(let i = 0; i < data.length;i++){
            // let item:cc.Node = null;
            if(i<index){
                // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                if(rewardList.has(data[i].Item)){
                    let num = rewardList.get(data[i].Item);
                    num += data[i].Num * 4;
                    rewardList.set(data[i].Item,num);
                }else{
                    rewardList.set(data[i].Item,data[i].Num * 4);
                }
            }else{
                if(rewardList.has(data[i].Item)){
                    let num = rewardList.get(data[i].Item);
                    num += data[i].Num * 5;
                    rewardList.set(data[i].Item,num);
                }else{
                    rewardList.set(data[i].Item,data[i].Num * 5);
                }
            }
        }
        rewardList.forEach((num,id)=>{
            let item = PropManager.getInstance().createPropItem(id,num);
            content.addChild(item);
        })
        this.node.getChildByName("sure").getComponentInChildren(cc.Label).string = payInfo.price;
    }

    onClickSureBtn(){
        ApkManager.getInstance().showPay({
            result:(isDy)=>{
                if(isDy){
                    FollowManager.getInstance().followEvent(Follow_Type.点击解锁5倍奖励的购买成功次数);
                    let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
                    let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
                    let rewardList = new Map<number,number>();
                    for(let i = 0; i < data.length;i++){
                        // let item:cc.Node = null;
                        if(i<index){
                            // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                            if(rewardList.has(data[i].Item)){
                                let num = rewardList.get(data[i].Item);
                                num += data[i].Num * 4;
                                rewardList.set(data[i].Item,num);
                            }else{
                                rewardList.set(data[i].Item,data[i].Num * 4);
                            }
                        }else{
                            if(rewardList.has(data[i].Item)){
                                let num = rewardList.get(data[i].Item);
                                num += data[i].Num * 5;
                                rewardList.set(data[i].Item,num);
                            }else{
                                rewardList.set(data[i].Item,data[i].Num * 5);
                            }
                        }
                    }
                    let rewardList1 = [];
                    rewardList.forEach((num,id)=>{
                        PropManager.getInstance().changePropNum(id,num);
                        let item = PropManager.getInstance().createPropItem(id,num);
                        rewardList1.push(item);
                    })
                    GameManager.getInstance().showMultipleGetTip(rewardList1);
                    TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver,1);
                    HttpManager.post(AccessName.updateSevenGift,this.getUserIdJsonString());
                    this.onClose();
                }
            }
        },googldId)
    }

    onClickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

    private getUserIdJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }
}
