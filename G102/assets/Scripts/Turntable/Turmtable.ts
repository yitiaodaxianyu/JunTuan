
// import { _decorator, Component, Node, Tween, tween, v3, Sprite, Color, Vec3, Label } from 'cc';
// import { Sound } from '../Sound/Sound';
// import { UIPop } from '../UIPop';
// import { AD_TYPE, Void } from './Void';

import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import UIComponent from "../../Scripts/UI/UIComponent";
import ApkManager from "../Ads/ApkManager";
import { GameScene, INTER_VIDEO_TYPE, VIDEO_TYPE } from "../Constants";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { MusicIndex, SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { TaskItem } from "../Task/TaskEnum";
import TaskManager from "../Task/TaskManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MyTool from "../Tools/MyTool";
import MainUi from "../UI/home/MainUi";
import UserData from "../UserData";
import PublicMethods from "./PublicMethods";
import Times from "./Times";
import { TurntableInformationManager } from "./TurntableInformation";
import WXManagerEX, { WXADEnvnt } from "../../startscene/WXManagerEX";

// import WZPublic from './WZPublic';
const { ccclass, property } = cc._decorator;

/**
 * Predefined variables
 * Name = Turmtables
 * DateTime = Tue Dec 21 2021 18:07:29 GMT+0800 (中国标准时间)
 * Author = ZQYZ
 * FileBasename = Turmtables.ts
 * FileBasenameNoExtension = Turmtables
 * URL = db://assets/script/WZ/Turmtables.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass
export default class Turmtable extends UIComponent {
    // [1]
    // dummy = '';

    is_spining: boolean = false;
    @property(cc.Node)
    btnad: cc.Node = null;

    @property(cc.Node)
    btnshow: cc.Node = null;

    @property(cc.Node)
    btnClose: cc.Node = null;
    btn_action: cc.Tween<any> = null;

    @property(cc.Node)
    gifts: cc.Node = null;

    @property(cc.Node)
    spinlight: cc.Node = null;
    item: cc.Node[] = [];

    protected onDestroy(): void {

    }
    initUi() {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.转盘的打开次数);
        let btn_start = this.btnad;
        this.btn_action = cc.tween(btn_start).to(0.8, { scale: 1.1 }).to(0.8, { scale: 1 }).union().repeatForever().start();
        this.spinlight.active = false;
        this.node.getChildByName("B").active = false
        this.gifts.resumeAllActions()
        this.gifts.angle = 0

        //生成6个奖励
        for (let index = this.item.length; index < this.gifts.getChildByName("itme").children.length; index++) {
            let id = index + 1
            let items = PropManager.getInstance().createPropItem(TurntableInformationManager.getInstance().getItemID(id), TurntableInformationManager.getInstance().getItemNum(id));
            items.scale = 0.73
            items.parent = this.gifts.getChildByName("itme").children[index]
            this.item.push(items)
        }
        Times.Turmtablenode = this.node
        // let num=TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeYes, 0);
        // if(num==1){
        //     this.btnshow.getComponent(cc.Button).interactable=true
        //     this.btnshow.getChildByName("time").active=false
        //     this.btnshow.getChildByName("text").active=true
        // }else{
        //     this.btnshow.getComponent(cc.Button).interactable=false
        //     this.btnshow.getChildByName("text").active=false
        //     this.btnshow.getChildByName("time").active=true
        // }
        this.Refresh()



    }
    Refresh() {
        if (TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFree, 0) > 999999) {
            this.btnshow.active = false
            this.btnad.setPosition(0, -320, 0)
        } else {
            this.btnshow.active = true
            this.btnad.setPosition(-144, -320, 0)
        }
        let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeYes, 0);
        if (num == 1) {
            this.btnshow.getComponent(cc.Button).interactable = true
            this.btnshow.getChildByName("time").active = false
            this.btnshow.getChildByName("text").active = true
            this.btnshow.getChildByName('red').active = true;
        } else {
            this.btnshow.getComponent(cc.Button).interactable = false
            this.btnshow.getChildByName("text").active = false
            this.btnshow.getChildByName("time").active = true
            this.btnshow.getChildByName('red').active = false;
        }

        Times.timetxt = this.btnshow.getChildByName("time")
        let times = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeTime, GameManager.getInstance().tumTableTime);
        Times.timetxt.getComponent(cc.Label).string = "" + PublicMethods.timeconversions(times)
        this.btnad.getChildByName('red').active = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd, 0) < 10;
    }
    start() {
        this.btnad.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.onClicbtnSpin(0);
        }, this);
        this.btnshow.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.onClicbtnSpin(1);
        }, this);
        this.btnClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.clickBtnClose();
        }, this);

        // cc.director
        // 15*60*1000//900

    }
    //视频观看完成
    private onShipinComp(): void {
        let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd, 0);
        num++;
        TheStorageManager.getInstance().setItem(StorageKey.TurmtableAd, num);
        FollowManager.getInstance().followEvent(Follow_Type.转盘免费抽奖点击次数);
        //1 20% 2 20% 3 20% 4 15% 5 15% 6 10%
        this.startSpin(this.roundmNum(), 0);
    }
    onClicbtnSpin(type) {  //0:点击广告转盘10次   1：点击15分钟免费  5次
        if (type == 0) {
            if (TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd, 0) > 99999) {
                // 没次数提示100120
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1700004), 3);
            } else {
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    WXManagerEX.getInstance().zhuanpanShipin = wx.createRewardedVideoAd({
                        adUnitId: 'adunit-fafe5d05ac20c01b'
                    });
                    WXManagerEX.getInstance().zhuanpanShipin.offError();
                    WXManagerEX.getInstance().zhuanpanShipin.onError(err => {
                        console.log(err)
                    });
                    WXManagerEX.getInstance().zhuanpanShipin.offClose();
                    WXManagerEX.getInstance().zhuanpanShipin.show().catch(() => {
                        // 失败重试
                        WXManagerEX.getInstance().zhuanpanShipin.load()
                            .then(() => WXManagerEX.getInstance().zhuanpanShipin.show())
                            .catch(err => {
                                GameManager.getInstance().showMessage("广告拉取失败");
                            })
                    })
                    WXManagerEX.getInstance().zhuanpanShipin.onClose(res => {
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


                } else {
                    let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd, 0);
                    num++;
                    TheStorageManager.getInstance().setItem(StorageKey.TurmtableAd, num);
                    FollowManager.getInstance().followEvent(Follow_Type.转盘免费抽奖点击次数);
                    //1 20% 2 20% 3 20% 4 15% 5 15% 6 10%
                    this.startSpin(this.roundmNum(), 0);
                }
                // ApkManager.getInstance().showVideo(((isTrue)=>{
                //     if(isTrue){
                //         HttpManager.post(AccessName.userTurnPrize,this.getTurnPrizeJsonString(),true).then((data:any)=>{
                //             // 成功
                //             let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd,0);
                //             num++;
                //             TheStorageManager.getInstance().setItem(StorageKey.TurmtableAd,num);
                //             FollowManager.getInstance().followEvent(Follow_Type.转盘广告抽奖点击次数);
                //             this.startSpin(data.index,0);
                //         }).catch((err) =>{
                //             // 失败
                //             // console.log("失败")
                //             let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd,0);
                //             num++;
                //             TheStorageManager.getInstance().setItem(StorageKey.TurmtableAd,num);
                //             FollowManager.getInstance().followEvent(Follow_Type.转盘广告抽奖点击次数);
                //             this.startSpin(1,0);
                //         });
                //     }
                // }),VIDEO_TYPE.Equip)
            }
        }
        else if (type == 1) {
            if (TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFree, 0) > 99999) {
                // 没次数提示100120
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1700003), 3);
            } else {

                let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFree, 0);
                num++;
                TheStorageManager.getInstance().setItem(StorageKey.TurmtableFree, num);
                FollowManager.getInstance().followEvent(Follow_Type.转盘免费抽奖点击次数);
                //1 20% 2 20% 3 20% 4 15% 5 15% 6 10%
                this.startSpin(this.roundmNum(), 1);
                // HttpManager.post(AccessName.userTurnPrize,this.getTurnPrizeJsonString(),true).then((data:any)=>{
                //     // 成功
                //     let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFree,0);
                //     num++;
                //     TheStorageManager.getInstance().setItem(StorageKey.TurmtableFree,num);
                //     FollowManager.getInstance().followEvent(Follow_Type.转盘免费抽奖点击次数);
                //     this.startSpin(data.index,1);
                // }).catch((err) =>{
                //     // 失败
                //     // console.log("失败1")
                //     let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFree,0);
                //     num++;
                //     TheStorageManager.getInstance().setItem(StorageKey.TurmtableFree,num);
                //     FollowManager.getInstance().followEvent(Follow_Type.转盘免费抽奖点击次数);
                //     this.startSpin(1,1);
                // });
            }
        }

    }
    private roundmNum(): number {

        var rum: number = Math.random();
        if (rum < 0.2) {
            return 1;
        } else if (rum < 0.4) {
            return 2;
        } else if (rum < 0.6) {
            return 3;
        } else if (rum < 0.75) {
            return 4;
        } else if (rum < 0.9) {
            return 5;
        } else if (rum < 1) {
            return 6;
        }
        return 1;
    }
    startSpin(index: number, type: number) {//type:   0:广告   1：免费  更新时间
        TaskManager.getInstance().emitTask(TaskItem.转动转盘1次);
        TaskManager.getInstance().emitTask(TaskItem.转盘X次);
        this.node.getChildByName("B").active = true
        this.is_spining = true;
        this.spinlight.active = false;
        let rewardnumber = index//3   
        // cubicOut  quadInOut  6，0:第一个    5:第6个   4：第5个   quintOut
        cc.tween(this.gifts).to(6, { angle: 3600 + (rewardnumber - 1) * 60 }, { easing: "quintOut" }).call(() => {
            this.is_spining = false;
            this.spinlight.parent.angle = (3600 + (rewardnumber - 1) * 60) * -1
            this.spinlight.active = true;
            let btnSpin = this.btnad;
            this.btn_action = cc.tween(btnSpin).to(1, { scale: 1.1 }).to(1, { scale: 1.1 }).union().repeatForever().start();
            let time = 0.4
            cc.tween(this.spinlight)
                .to(0.2, { opacity: 0 })
                .to(0.2, { opacity: 255 })
                .to(0.2, { opacity: 0 })
                .to(0.2, { opacity: 255 })
                .delay(time)
                .call(() => {
                    // console.log("+++++++++转盘")
                    PropManager.getInstance().changePropNum(TurntableInformationManager.getInstance().getItemID(rewardnumber), TurntableInformationManager.getInstance().getItemNum(rewardnumber));
                    GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(TurntableInformationManager.getInstance().getItemID(rewardnumber), TurntableInformationManager.getInstance().getItemNum(rewardnumber)));
                    this.node.getChildByName("B").active = false
                    let btn_start = this.btnad;
                    this.btn_action = cc.tween(btn_start).to(0.8, { scale: 1.1 }).to(0.8, { scale: 1 }).union().repeatForever().start();
                    this.spinlight.active = false;
                    this.gifts.angle = 0

                    if (type == 1) {
                        TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeYes, 0)
                        TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeTime, GameManager.getInstance().tumTableTime);
                    }

                    
                    this.Refresh()
                    if(GameManager.getInstance().cur_game_scene==GameScene.home){
                        cc.find('Canvas/main_ui').getComponent(MainUi).refreshMainTaskUi();
                    }
                   
                    // let num=TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeYes, 0);
                    // let times=TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeTime, 900);
                    // Times.timetxt.getComponent(cc.Label).string=""+PublicMethods.timeconversions(times)
                    // if(num==1){
                    //     this.btnshow.getComponent(cc.Button).interactable=true
                    //     this.btnshow.getChildByName("time").active=false
                    //     this.btnshow.getChildByName("text").active=true
                    // }else{
                    //     this.btnshow.getComponent(cc.Button).interactable=false
                    //     this.btnshow.getChildByName("text").active=false
                    //     this.btnshow.getChildByName("time").active=true
                    // }
                }).start();
        }).start();
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Main_Spin);
        this.onClose();
    }
    onClose(): void {
        super.onClose();

    }
    private getTurnPrizeJsonString(): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            drawType: 5,
            uid: uid,
        });
    }

    // closeView() {
    //     this.node.active = false
    //     // console.log("关闭大转盘")
    // }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
