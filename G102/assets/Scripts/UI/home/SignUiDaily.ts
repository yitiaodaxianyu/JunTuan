import { AccessName, HttpManager } from "../.././NetWork/HttpManager";
import ApkManager from "../../Ads/ApkManager";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { SignInManager, SignInType } from "../../JsonData/SignIn";
import { SignNumManager } from "../../JsonData/SignNum";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import Prop from "../../Prop/Prop";
import { PropAction } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";
import { UILayerLevel, UIPath } from "../UIConfig";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";
import SignInGetTip from "./SignInGetTip";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SignUiDaily extends UIComponent {

    // @property(cc.Node)
    // today_bg:cc.Node = null;
    // @property(cc.Node)
    // today_light:cc.Node = null;
    @property(cc.Prefab)
    sign_in_item:cc.Prefab = null;
    @property(cc.Prefab)
    sign_in_cumulative_item:cc.Prefab = null;
    @property(cc.SpriteAtlas)
    sign_in_ui:cc.SpriteAtlas = null;
    @property(cc.Node)
    today:cc.Node = null;

    init(uiAc: UiAction) {
        FollowManager.getInstance().followEvent(Follow_Type.每日签到点击次数);
        this.refreshUi();
    }

    refreshUi(){
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        let todayZero = TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp) - (60*60*24);
        let date = new Date(todayZero * 1000);
        let tempDate = new Date(date.getFullYear(),date.getMonth() + 1,0);
        // 获取到当月的天数
        let days = tempDate.getDate();
        let monthType:SignInType = days;
        let data = SignInManager.getInstance().getDataBySignInType(monthType);
        content.removeAllChildren();
        data.forEach((v,k) =>{
            let item = cc.instantiate(this.sign_in_item);
            let reward = PropManager.getInstance().createPropItem(v.Item,v.Num);
            reward.name = 'reward';
            reward.scale = 0.74;
            item.addChild(reward);
            reward.setPosition(cc.v2(0,-15));
            item.getComponentInChildren(TextLanguage).setReplaceValue('~',(k+1)+'');

            let bg = new cc.Node();
            let gou = new cc.Node();
            bg.name = 'bg';
            if(v.Day < date.getDate()){
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Bg_1_Mask");
                if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInDay + v.Day,0) == 1){
                    gou.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                    bg.addChild(gou);
                    gou.setPosition(cc.v2(0,-7));
                }
                item.addChild(bg);
            }else if(v.Day == date.getDate()){
                if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInDay + v.Day,0) == 1){
                    bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Bg_1_Mask");
                    gou.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                    bg.addChild(gou);
                    gou.setPosition(cc.v2(0,-7));
                    item.addChild(bg);
                }else{
                    this.today.parent = item;
                    this.today.zIndex = -1;
                    this.today.setPosition(cc.v2(0,-15));
                    // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollTo(cc.v2(item.x,item.y),0.2);
                    this.scheduleOnce(()=>{
                        // let offset = content.y - item.y
                        if(date.getDate()>12){
                            if(date.getDate()>24){
                                this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(0.2);
                            }else{
                                cc.tween(content).to(0.2,{y:-item.y}).start();
                            }
                        }
                        
                    },0.2);
                }
            }
            content.addChild(item);
        });
        if(TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn,0) == 1){
            this.today.active = false;
            this.node.getChildByName("receiveBtn").active = false;
        }else{
            this.today.active = true;
            this.node.getChildByName("receiveBtn").active = true;
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active=true;
        }
        let cumulativeContent = this.node.getChildByName("checkBoxScroll").getComponent(cc.ScrollView).content;
        let cumulativeData = SignNumManager.getInstance().getJsonData();
        cumulativeContent.removeAllChildren();
        cumulativeData.forEach((v,k) =>{
            let item = cc.instantiate(this.sign_in_cumulative_item);
            item.name = "item" + k;
            item.getChildByName("days").getComponentInChildren(TextLanguage).setReplaceValue('~',v.DayNum + '');
            if(v.DayNum <= TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum)){
                item.getComponent(cc.ProgressBar).progress = 1;
            } else if(k>0){
                if(v.DayNum > TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum) 
                && cumulativeData[k-1].DayNum <= TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum))
                {
                    item.getComponent(cc.ProgressBar).progress = 
                    (TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum) - cumulativeData[k-1].DayNum)/(v.DayNum - cumulativeData[k-1].DayNum);
                }else{
                    item.getComponent(cc.ProgressBar).progress = 0;
                }
            }else{
                if(v.DayNum > TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum)){
                    item.getComponent(cc.ProgressBar).progress = 
                        (TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum)/(v.DayNum));
                }else{
                    item.getComponent(cc.ProgressBar).progress = 0;
                }
            }
            if(v.DayNum <= TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum,0)){
                if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInCumulativeDay + v.DayNum,0) == 1){
                    // 已领取
                    item.getChildByName("light").active = false;
                    item.getChildByName("box").getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Chesk_1");
                }else{
                    // 未领取
                    item.getChildByName("light").active = true;
                    item.getChildByName("box").getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Chesk_0");
                }
            }

            item.on(cc.Node.EventType.TOUCH_END,()=>{
                if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInCumulativeDay + v.DayNum,0) == 1 
                || v.DayNum > TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum)){
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
                    let tip = cumulativeContent.parent.parent.getChildByName("tip");
                    tip.active = true;
                    let itemRoot = tip.getChildByName("itemRoot");
                    itemRoot.removeAllChildren();
                    itemRoot.width = 0;
                    let pos = cc.v2(cumulativeContent.getPosition().x + item.x + 40, cumulativeContent.getPosition().y + item.y+70);
                    itemRoot.setPosition(pos);
                    let reward = PropManager.getInstance().createPropItem(v.Item,v.Num);
                    reward.scale = 0.7;
                    if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInCumulativeDay + v.DayNum,0) == 1){
                        // 已领取
                        let ss = new cc.Node();
                        ss.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                        ss.opacity = 155;
                        reward.addChild(ss);
                        let isOk = new cc.Node();
                        isOk.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                        reward.addChild(isOk);
                        ss.setPosition(cc.v2(0,0));
                        isOk.setPosition(cc.v2(0,0));
                    }
                    reward.parent = itemRoot;
                }

                if(TheStorageManager.getInstance().getNumber(StorageKey.DailySignInCumulativeDay + v.DayNum,0) == 0 
                && v.DayNum <= TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum)){
                    let reward = PropManager.getInstance().createPropItem(v.Item,v.Num);
                    PropManager.getInstance().changePropNum(v.Item,v.Num);
                    GameManager.getInstance().showGetTip(reward);
                    HttpManager.post(AccessName.addSignGift,this.getMonthJsonString(v.DayNum));
                    TheStorageManager.getInstance().setItem(StorageKey.DailySignInCumulativeDay + v.DayNum,1);
                    this.refreshUi();
                }
            });

            cumulativeContent.addChild(item);
        });
        this.node.getChildByName("checkBoxScroll").getChildByName("cumulativeDays").getComponent(TextLanguage).setReplaceValue('~',TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum) + '');
    }

    onSignInBtnClick(){
        let todayZero = TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp) - (60*60*24);
        let date = new Date(todayZero * 1000);
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        let reward:Prop = null;
        content.children.forEach((v,k)=>{
            if(reward == null){
                if(v.getChildByName('bg') == null){
                    reward = v.getChildByName("reward").getComponent(Prop);
                }
            }
        });
        // let rewardItem = PropManager.getInstance().createPropItem(reward.prop_id,reward.prop_num);
        PropManager.getInstance().changePropNum(reward.prop_id,reward.prop_num);
        GameManager.getInstance().refreshGemShow();
        GameManager.getInstance().refreshCoinShow();
        EventManager.postRedEvent(RedEventString.RED_TIP,RedEventType.Btn_Main_SignIn,false,RedEventType.Btn_Main_SignIn_BtnGet);
        UIManager.getInstance().showUiDialog(UIPath.SignInGet,UILayerLevel.Two,{onCompleted:(uiNode)=>{
            uiNode.getComponent(SignInGetTip).init(null);
            uiNode.getComponent(SignInGetTip).initData({
                reward_id:reward.prop_id,
                reward_num:reward.prop_num
            });
        }})
        // GameManager.getInstance().showGetTip(rewardItem);
        TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,1);
        TheStorageManager.getInstance().setItem(StorageKey.DailySignInDay + date.getDate(),1);
        HttpManager.post(AccessName.monthSign,this.getUserIdJsonString());
        let num = TheStorageManager.getInstance().getNumber(StorageKey.DailySignInNum,0);
        num++;
        TheStorageManager.getInstance().setItem(StorageKey.DailySignInNum,num);
        this.refreshUi();
    }

    clickSignIn(node:cc.Node){
        // this.today_bg.active = false;
        // this.today_light.active = false;
        // node.off(cc.Node.EventType.TOUCH_START)
        // let today = new Date().getDate();
        // node.getChildByName("dark").active = true;
        // node.getChildByName("checkmark").active = true;
        // node.getChildByName("item").getChildByName("effect1").active = false;
        // this.signInDays++;
        // this.node.getChildByName("cumulativeDays").getComponent(cc.Label).string = String(this.signInDays);
        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }
        // let infoSignNumManager = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // str += infoSignNumManager.DayNum;
        // // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        // if(this.signInDays >= Number(infoSignNumManager.DayNum)){
        //     // 特效显示
        //     this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = true;
        // }

        // let gm = GameManager.getInstance();
        // let prop = node.getChildByName("item").getComponent(Prop);
        // // let info = gm.box_json_data.getRewardByid(prop.prop_id,prop.prop_num)
        // // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);;
        // let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        // // if(info != null){
        // //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        // // }else{
        // // }
        // gm.showGetTip(item);
        // // 保存签到记录
        // cc.sys.localStorage.setItem("SignUiDaily_" + today,"1")
        // GameData.getInstance().saveIsSignToday(true);
    }

    supplementarySignIn(node:cc.Node){
        // console.log(node)
        // let supplementaryDay = Number(node.name);
        // node.getChildByName("checkmark").active = true;
        // node.off(cc.Node.EventType.TOUCH_START)
        // let label = node.getChildByName("day")
        // // label.getComponent(cc.Label).string = this.getJointString(100001,supplementaryDay);
        // label.color = new cc.Color(51,32,63);
        // label.getComponent(cc.LabelOutline).enabled = false;
        // this.signInDays++;
        // this.node.getChildByName("cumulativeDays").getComponent(cc.Label).string = String(this.signInDays);
        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }
        // // console.log(600 + Number(index))
        // let infoSignNumManager = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // str += infoSignNumManager.DayNum;
        // // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        // if(this.signInDays >= Number(infoSignNumManager.DayNum)){
        //     // 特效显示
        //     this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = true;
        // }

        // let gm = GameManager.getInstance();
        // let prop = node.getChildByName("item").getComponent(Prop);
        // // let info = gm.box_json_data.getRewardByid(prop.prop_type,prop.prop_num)
        // // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);;
        // let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        // // if(info != null){
        // //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        // // }else{
        // // }
        // gm.showGetTip(item);
        // // 保存签到记录
        // cc.sys.localStorage.setItem("SignUiDaily_" + supplementaryDay,"1")
    }

    cumulativeReward(node:cc.Node){

        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }

        // let infoReward = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // if(this.signInDays >= Number(infoReward.DayNum)){
        //     let gm = GameManager.getInstance();
        //     let prop = node.getComponent(Prop);
        //     // let info = gm.box_json_data.getRewardByid(prop.prop_type,prop.prop_num)
        //     // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);
        //     let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        //     // if(info != null){
        //     //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        //     // }else{
        //     // }
        //     index++;
        //     if(SignNumManager.getInstance().getJsonSignNum(600 + Number(index))){
        //         cc.sys.localStorage.setItem("SignUiDailyCumulative",index);
        //         let newItem = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        //         if(this.signInDays < newItem.DayNum){
        //             this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = false;
        //         }
        //         prop.init(newItem.Item,newItem.Num,PropAction.Look);
        //         str += newItem.DayNum;
        //         // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        //         gm.showGetTip(item);
        //     }
        // }
    }

    onClickTipBg(){
        this.node.getChildByName("checkBoxScroll").getChildByName("tip").active = false;
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

    private getUserIdJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }

    private getMonthJsonString(type:number):string{
        let uid=UserData.getInstance().getUserID();
        let t = type;
        return JSON.stringify({
            uid:uid,
            type:t,
        });
    }

}
