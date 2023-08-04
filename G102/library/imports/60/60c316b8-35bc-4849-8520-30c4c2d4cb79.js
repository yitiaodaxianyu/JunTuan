"use strict";
cc._RF.push(module, '60c31a4NbxISYUgMMTC1Mt5', 'Turmtable');
// Scripts/Turntable/Turmtable.ts

"use strict";
// import { _decorator, Component, Node, Tween, tween, v3, Sprite, Color, Vec3, Label } from 'cc';
// import { Sound } from '../Sound/Sound';
// import { UIPop } from '../UIPop';
// import { AD_TYPE, Void } from './Void';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpManager_1 = require(".././NetWork/HttpManager");
var UIComponent_1 = require("../../Scripts/UI/UIComponent");
var ApkManager_1 = require("../Ads/ApkManager");
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var TaskEnum_1 = require("../Task/TaskEnum");
var TaskManager_1 = require("../Task/TaskManager");
var EventManager_1 = require("../Tools/EventManager");
var MainUi_1 = require("../UI/home/MainUi");
var UserData_1 = require("../UserData");
var PublicMethods_1 = require("./PublicMethods");
var Times_1 = require("./Times");
var TurntableInformation_1 = require("./TurntableInformation");
// import WZPublic from './WZPublic';
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
var Turmtable = /** @class */ (function (_super) {
    __extends(Turmtable, _super);
    function Turmtable() {
        // [1]
        // dummy = '';
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_spining = false;
        _this.btnad = null;
        _this.btnshow = null;
        _this.btnClose = null;
        _this.btn_action = null;
        _this.gifts = null;
        _this.spinlight = null;
        _this.item = [];
        return _this;
        // closeView() {
        //     this.node.active = false
        //     // console.log("关闭大转盘")
        // }
        // update (deltaTime: number) {
        //     // [4]
        // }
    }
    Turmtable.prototype.initUi = function () {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.转盘的打开次数);
        var btn_start = this.btnad;
        this.btn_action = cc.tween(btn_start).to(0.8, { scale: 1.1 }).to(0.8, { scale: 1 }).union().repeatForever().start();
        this.spinlight.active = false;
        this.node.getChildByName("B").active = false;
        this.gifts.resumeAllActions();
        this.gifts.angle = 0;
        //生成6个奖励
        for (var index = this.item.length; index < this.gifts.getChildByName("itme").children.length; index++) {
            var id = index + 1;
            var items = PropManager_1.PropManager.getInstance().createPropItem(TurntableInformation_1.TurntableInformationManager.getInstance().getItemID(id), TurntableInformation_1.TurntableInformationManager.getInstance().getItemNum(id));
            items.scale = 0.73;
            items.parent = this.gifts.getChildByName("itme").children[index];
            this.item.push(items);
        }
        Times_1.default.Turmtablenode = this.node;
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
        this.Refresh();
    };
    Turmtable.prototype.Refresh = function () {
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0) > 999999) {
            this.btnshow.active = false;
            this.btnad.setPosition(0, -320, 0);
        }
        else {
            this.btnshow.active = true;
            this.btnad.setPosition(-144, -320, 0);
        }
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeYes, 0);
        if (num == 1) {
            this.btnshow.getComponent(cc.Button).interactable = true;
            this.btnshow.getChildByName("time").active = false;
            this.btnshow.getChildByName("text").active = true;
            this.btnshow.getChildByName('red').active = true;
        }
        else {
            this.btnshow.getComponent(cc.Button).interactable = false;
            this.btnshow.getChildByName("text").active = false;
            this.btnshow.getChildByName("time").active = true;
            this.btnshow.getChildByName('red').active = false;
        }
        Times_1.default.timetxt = this.btnshow.getChildByName("time");
        var times = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeTime, GameManager_1.default.getInstance().tumTableTime);
        Times_1.default.timetxt.getComponent(cc.Label).string = "" + PublicMethods_1.default.timeconversions(times);
        this.btnad.getChildByName('red').active = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0) < 10;
    };
    Turmtable.prototype.start = function () {
        var _this = this;
        this.btnad.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.onClicbtnSpin(0);
        }, this);
        this.btnshow.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.onClicbtnSpin(1);
        }, this);
        this.btnClose.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.clickBtnClose();
        }, this);
        // cc.director
        // 15*60*1000//900
    };
    Turmtable.prototype.onClicbtnSpin = function (type) {
        var _this = this;
        if (type == 0) {
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0) > 9) {
                // 没次数提示100120
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1700004), 3);
            }
            else {
                ApkManager_1.default.getInstance().showVideo((function (isTrue) {
                    if (isTrue) {
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.userTurnPrize, _this.getTurnPrizeJsonString(), true).then(function (data) {
                            // 成功
                            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0);
                            num++;
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableAd, num);
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘广告抽奖点击次数);
                            _this.startSpin(data.index, 0);
                        }).catch(function (err) {
                            // 失败
                            // console.log("失败")
                            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0);
                            num++;
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableAd, num);
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘广告抽奖点击次数);
                            _this.startSpin(1, 0);
                        });
                    }
                }), Constants_1.VIDEO_TYPE.Equip);
            }
        }
        else if (type == 1) {
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0) > 99999) {
                // 没次数提示100120
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1700003), 3);
            }
            else {
                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0);
                num++;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFree, num);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘免费抽奖点击次数);
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
    };
    Turmtable.prototype.roundmNum = function () {
        var rum = Math.random();
        if (rum < 0.2) {
            return 1;
        }
        else if (rum < 0.4) {
            return 2;
        }
        else if (rum < 0.6) {
            return 3;
        }
        else if (rum < 0.75) {
            return 4;
        }
        else if (rum < 0.9) {
            return 5;
        }
        else if (rum < 1) {
            return 6;
        }
        return 1;
    };
    Turmtable.prototype.startSpin = function (index, type) {
        var _this = this;
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.转动转盘1次);
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.转盘X次);
        this.node.getChildByName("B").active = true;
        this.is_spining = true;
        this.spinlight.active = false;
        var rewardnumber = index; //3   
        // cubicOut  quadInOut  6，0:第一个    5:第6个   4：第5个   quintOut
        cc.tween(this.gifts).to(6, { angle: 3600 + (rewardnumber - 1) * 60 }, { easing: "quintOut" }).call(function () {
            _this.is_spining = false;
            _this.spinlight.parent.angle = (3600 + (rewardnumber - 1) * 60) * -1;
            _this.spinlight.active = true;
            var btnSpin = _this.btnad;
            _this.btn_action = cc.tween(btnSpin).to(1, { scale: 1.1 }).to(1, { scale: 1.1 }).union().repeatForever().start();
            var time = 0.4;
            cc.tween(_this.spinlight)
                .to(0.2, { opacity: 0 })
                .to(0.2, { opacity: 255 })
                .to(0.2, { opacity: 0 })
                .to(0.2, { opacity: 255 })
                .delay(time)
                .call(function () {
                // console.log("+++++++++转盘")
                PropManager_1.PropManager.getInstance().changePropNum(TurntableInformation_1.TurntableInformationManager.getInstance().getItemID(rewardnumber), TurntableInformation_1.TurntableInformationManager.getInstance().getItemNum(rewardnumber));
                GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(TurntableInformation_1.TurntableInformationManager.getInstance().getItemID(rewardnumber), TurntableInformation_1.TurntableInformationManager.getInstance().getItemNum(rewardnumber)));
                _this.node.getChildByName("B").active = false;
                var btn_start = _this.btnad;
                _this.btn_action = cc.tween(btn_start).to(0.8, { scale: 1.1 }).to(0.8, { scale: 1 }).union().repeatForever().start();
                _this.spinlight.active = false;
                _this.gifts.angle = 0;
                if (type == 1) {
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeYes, 0);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, GameManager_1.default.getInstance().tumTableTime);
                }
                cc.find('Canvas/main_ui').getComponent(MainUi_1.default).refreshMainTaskUi();
                _this.Refresh();
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
    };
    Turmtable.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Spin);
        this.onClose();
    };
    Turmtable.prototype.getTurnPrizeJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            drawType: 5,
            uid: uid,
        });
    };
    __decorate([
        property(cc.Node)
    ], Turmtable.prototype, "btnad", void 0);
    __decorate([
        property(cc.Node)
    ], Turmtable.prototype, "btnshow", void 0);
    __decorate([
        property(cc.Node)
    ], Turmtable.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], Turmtable.prototype, "gifts", void 0);
    __decorate([
        property(cc.Node)
    ], Turmtable.prototype, "spinlight", void 0);
    Turmtable = __decorate([
        ccclass
    ], Turmtable);
    return Turmtable;
}(UIComponent_1.default));
exports.default = Turmtable;
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

cc._RF.pop();