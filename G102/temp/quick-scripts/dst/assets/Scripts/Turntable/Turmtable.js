
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Turntable/Turmtable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var UIComponent_1 = require("../../Scripts/UI/UIComponent");
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
    Turmtable.prototype.onDestroy = function () {
    };
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
    //视频观看完成
    Turmtable.prototype.onShipinComp = function () {
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0);
        num++;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableAd, num);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘免费抽奖点击次数);
        //1 20% 2 20% 3 20% 4 15% 5 15% 6 10%
        this.startSpin(this.roundmNum(), 0);
    };
    Turmtable.prototype.onClicbtnSpin = function (type) {
        var _this = this;
        if (type == 0) {
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0) > 20) {
                // 没次数提示100120
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1700004), 3);
            }
            else {
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    WXManagerEX_1.default.getInstance().zhuanpanShipin = wx.createRewardedVideoAd({
                        adUnitId: 'adunit-fafe5d05ac20c01b'
                    });
                    WXManagerEX_1.default.getInstance().zhuanpanShipin.offError();
                    WXManagerEX_1.default.getInstance().zhuanpanShipin.onError(function (err) {
                        console.log(err);
                    });
                    WXManagerEX_1.default.getInstance().zhuanpanShipin.offClose();
                    WXManagerEX_1.default.getInstance().zhuanpanShipin.show().catch(function () {
                        // 失败重试
                        WXManagerEX_1.default.getInstance().zhuanpanShipin.load()
                            .then(function () { return WXManagerEX_1.default.getInstance().zhuanpanShipin.show(); })
                            .catch(function (err) {
                            GameManager_1.default.getInstance().showMessage("广告拉取失败");
                        });
                    });
                    WXManagerEX_1.default.getInstance().zhuanpanShipin.onClose(function (res) {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            _this.onShipinComp();
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                        }
                    });
                }
                else {
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableAd, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableAd, num);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘免费抽奖点击次数);
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
    Turmtable.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUdXJtdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtHQUFrRztBQUNsRywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDBDQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRzFDLDREQUF1RDtBQUd2RCw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFFL0QsbURBQWtEO0FBQ2xELDBEQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsc0RBQW1GO0FBRW5GLDRDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLGlDQUE0QjtBQUM1QiwrREFBcUU7QUFDckUsNERBQXNFO0FBRXRFLHFDQUFxQztBQUMvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7OztHQVVHO0FBR0g7SUFBdUMsNkJBQVc7SUFBbEQ7UUFDSSxNQUFNO1FBQ04sY0FBYztRQUZsQixxRUFpVEM7UUE3U0csZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBR2pDLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixVQUFJLEdBQWMsRUFBRSxDQUFDOztRQXFSckIsZ0JBQWdCO1FBQ2hCLCtCQUErQjtRQUMvQiw4QkFBOEI7UUFDOUIsSUFBSTtRQUVKLCtCQUErQjtRQUMvQixhQUFhO1FBQ2IsSUFBSTtJQUNSLENBQUM7SUEzUmEsNkJBQVMsR0FBbkI7SUFFQSxD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LENBQUM7SUFDbkIsQ0FBQztJQUNELDJCQUFPLEdBQVA7UUFDSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUVwQixDQUFDO0lBQ08sMENBQXNCLEdBQTlCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsUUFBUSxFQUFFLENBQUM7WUFDWCxHQUFHLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqU0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ087SUFJekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNRO0lBbkJULFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FpVDdCO0lBQUQsZ0JBQUM7Q0FqVEQsQUFpVEMsQ0FqVHNDLHFCQUFXLEdBaVRqRDtrQkFqVG9CLFNBQVM7QUFtVDlCOzs7Ozs7Ozs7R0FTRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIE5vZGUsIFR3ZWVuLCB0d2VlbiwgdjMsIFNwcml0ZSwgQ29sb3IsIFZlYzMsIExhYmVsIH0gZnJvbSAnY2MnO1xyXG4vLyBpbXBvcnQgeyBTb3VuZCB9IGZyb20gJy4uL1NvdW5kL1NvdW5kJztcclxuLy8gaW1wb3J0IHsgVUlQb3AgfSBmcm9tICcuLi9VSVBvcCc7XHJcbi8vIGltcG9ydCB7IEFEX1RZUEUsIFZvaWQgfSBmcm9tICcuL1ZvaWQnO1xyXG5cclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vU2NyaXB0cy9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSU5URVJfVklERU9fVFlQRSwgVklERU9fVFlQRSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi4vVUkvaG9tZS9NYWluVWlcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgUHVibGljTWV0aG9kcyBmcm9tIFwiLi9QdWJsaWNNZXRob2RzXCI7XHJcbmltcG9ydCBUaW1lcyBmcm9tIFwiLi9UaW1lc1wiO1xyXG5pbXBvcnQgeyBUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9UdXJudGFibGVJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgV1hNYW5hZ2VyRVgsIHsgV1hBREVudm50IH0gZnJvbSBcIi4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuXHJcbi8vIGltcG9ydCBXWlB1YmxpYyBmcm9tICcuL1daUHVibGljJztcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiBQcmVkZWZpbmVkIHZhcmlhYmxlc1xyXG4gKiBOYW1lID0gVHVybXRhYmxlc1xyXG4gKiBEYXRlVGltZSA9IFR1ZSBEZWMgMjEgMjAyMSAxODowNzoyOSBHTVQrMDgwMCAo5Lit5Zu95qCH5YeG5pe26Ze0KVxyXG4gKiBBdXRob3IgPSBaUVlaXHJcbiAqIEZpbGVCYXNlbmFtZSA9IFR1cm10YWJsZXMudHNcclxuICogRmlsZUJhc2VuYW1lTm9FeHRlbnNpb24gPSBUdXJtdGFibGVzXHJcbiAqIFVSTCA9IGRiOi8vYXNzZXRzL3NjcmlwdC9XWi9UdXJtdGFibGVzLnRzXHJcbiAqIE1hbnVhbFVybCA9IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL1xyXG4gKlxyXG4gKi9cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cm10YWJsZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8vIFsxXVxyXG4gICAgLy8gZHVtbXkgPSAnJztcclxuXHJcbiAgICBpc19zcGluaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bmFkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bnNob3c6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgYnRuX2FjdGlvbjogY2MuVHdlZW48YW55PiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBnaWZ0czogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzcGlubGlnaHQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgaXRlbTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBpbml0VWkoKSB7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9USlApO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jnmoTmiZPlvIDmrKHmlbApO1xyXG4gICAgICAgIGxldCBidG5fc3RhcnQgPSB0aGlzLmJ0bmFkO1xyXG4gICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0bl9zdGFydCkudG8oMC44LCB7IHNjYWxlOiAxLjEgfSkudG8oMC44LCB7IHNjYWxlOiAxIH0pLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuZ2lmdHMucmVzdW1lQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5naWZ0cy5hbmdsZSA9IDBcclxuXHJcbiAgICAgICAgLy/nlJ/miJA25Liq5aWW5YqxXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLml0ZW0ubGVuZ3RoOyBpbmRleCA8IHRoaXMuZ2lmdHMuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBpbmRleCArIDFcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJdGVtSUQoaWQpLCBUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJdGVtTnVtKGlkKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnNjYWxlID0gMC43M1xyXG4gICAgICAgICAgICBpdGVtcy5wYXJlbnQgPSB0aGlzLmdpZnRzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5jaGlsZHJlbltpbmRleF1cclxuICAgICAgICAgICAgdGhpcy5pdGVtLnB1c2goaXRlbXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRpbWVzLlR1cm10YWJsZW5vZGUgPSB0aGlzLm5vZGVcclxuICAgICAgICAvLyBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgLy8gaWYobnVtPT0xKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoKCkge1xyXG4gICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsIDApID4gOTk5OTk5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bmFkLnNldFBvc2l0aW9uKDAsIC0zMjAsIDApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5zZXRQb3NpdGlvbigtMTQ0LCAtMzIwLCAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAwKTtcclxuICAgICAgICBpZiAobnVtID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGltZXMudGltZXR4dCA9IHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIilcclxuICAgICAgICBsZXQgdGltZXMgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnR1bVRhYmxlVGltZSk7XHJcbiAgICAgICAgVGltZXMudGltZXR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBQdWJsaWNNZXRob2RzLnRpbWVjb252ZXJzaW9ucyh0aW1lcylcclxuICAgICAgICB0aGlzLmJ0bmFkLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLCAwKSA8IDEwO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5idG5hZC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljYnRuU3BpbigwKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bnNob3cub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2J0blNwaW4oMSk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5DbG9zZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBjYy5kaXJlY3RvclxyXG4gICAgICAgIC8vIDE1KjYwKjEwMDAvLzkwMFxyXG5cclxuICAgIH1cclxuICAgIC8v6KeG6aKR6KeC55yL5a6M5oiQXHJcbiAgICBwcml2YXRlIG9uU2hpcGluQ29tcCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwgMCk7XHJcbiAgICAgICAgbnVtKys7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsIG51bSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgLy8xIDIwJSAyIDIwJSAzIDIwJSA0IDE1JSA1IDE1JSA2IDEwJVxyXG4gICAgICAgIHRoaXMuc3RhcnRTcGluKHRoaXMucm91bmRtTnVtKCksIDApO1xyXG4gICAgfVxyXG4gICAgb25DbGljYnRuU3Bpbih0eXBlKSB7ICAvLzA654K55Ye75bm/5ZGK6L2s55uYMTDmrKEgICAx77ya54K55Ye7MTXliIbpkp/lhY3otLkgIDXmrKFcclxuICAgICAgICBpZiAodHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLCAwKSA+IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmsqHmrKHmlbDmj5DnpLoxMDAxMjBcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAwNCksIDMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbiA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LWZhZmU1ZDA1YWMyMGMwMWInXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemh1YW5wYW5TaGlwaW4ub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5vZmZDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemh1YW5wYW5TaGlwaW4uc2hvdygpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemh1YW5wYW5TaGlwaW4ubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpodWFucGFuU2hpcGluLnNob3coKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlub/lkYrmi4nlj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5vbkNsb3NlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVBZCwgbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5YWN6LS55oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLzEgMjAlIDIgMjAlIDMgMjAlIDQgMTUlIDUgMTUlIDYgMTAlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4odGhpcy5yb3VuZG1OdW0oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKCgoaXNUcnVlKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGlzVHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51c2VyVHVyblByaXplLHRoaXMuZ2V0VHVyblByaXplSnNvblN0cmluZygpLHRydWUpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8g5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlub/lkYrmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4oZGF0YS5pbmRleCwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSkuY2F0Y2goKGVycikgPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyDlpLHotKVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlub/lkYrmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4oMSwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfSksVklERU9fVFlQRS5FcXVpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwgMCkgPiA5OTk5OSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5rKh5qyh5pWw5o+Q56S6MTAwMTIwXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMDMpLCAzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLCAwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwgbnVtKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlhY3otLnmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8xIDIwJSAyIDIwJSAzIDIwJSA0IDE1JSA1IDE1JSA2IDEwJVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4odGhpcy5yb3VuZG1OdW0oKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXNlclR1cm5Qcml6ZSx0aGlzLmdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKSx0cnVlKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyDmiJDlip9cclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLDApO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5YWN6LS55oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0U3BpbihkYXRhLmluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSkuY2F0Y2goKGVycikgPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8g5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCLlpLHotKUxXCIpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIC8vICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLG51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zdGFydFNwaW4oMSwxKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgcm91bmRtTnVtKCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgIHZhciBydW06IG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgaWYgKHJ1bSA8IDAuMikge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJ1bSA8IDAuNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJ1bSA8IDAuNikge1xyXG4gICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICB9IGVsc2UgaWYgKHJ1bSA8IDAuNzUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChydW0gPCAwLjkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChydW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA2O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIHN0YXJ0U3BpbihpbmRleDogbnVtYmVyLCB0eXBlOiBudW1iZXIpIHsvL3R5cGU6ICAgMDrlub/lkYogICAx77ya5YWN6LS5ICDmm7TmlrDml7bpl7RcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLui9rOWKqOi9rOebmDHmrKEpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6L2s55uYWOasoSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5pc19zcGluaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNwaW5saWdodC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmV3YXJkbnVtYmVyID0gaW5kZXgvLzMgICBcclxuICAgICAgICAvLyBjdWJpY091dCAgcXVhZEluT3V0ICA277yMMDrnrKzkuIDkuKogICAgNTrnrKw25LiqICAgNO+8muesrDXkuKogICBxdWludE91dFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ2lmdHMpLnRvKDYsIHsgYW5nbGU6IDM2MDAgKyAocmV3YXJkbnVtYmVyIC0gMSkgKiA2MCB9LCB7IGVhc2luZzogXCJxdWludE91dFwiIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3NwaW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQucGFyZW50LmFuZ2xlID0gKDM2MDAgKyAocmV3YXJkbnVtYmVyIC0gMSkgKiA2MCkgKiAtMVxyXG4gICAgICAgICAgICB0aGlzLnNwaW5saWdodC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgYnRuU3BpbiA9IHRoaXMuYnRuYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0blNwaW4pLnRvKDEsIHsgc2NhbGU6IDEuMSB9KS50bygxLCB7IHNjYWxlOiAxLjEgfSkudW5pb24oKS5yZXBlYXRGb3JldmVyKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSAwLjRcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zcGlubGlnaHQpXHJcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTogMjU1IH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTogMjU1IH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkodGltZSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK+i9rOebmFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJdGVtSUQocmV3YXJkbnVtYmVyKSwgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShyZXdhcmRudW1iZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJdGVtSUQocmV3YXJkbnVtYmVyKSwgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShyZXdhcmRudW1iZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5fc3RhcnQgPSB0aGlzLmJ0bmFkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0bl9zdGFydCkudG8oMC44LCB7IHNjYWxlOiAxLjEgfSkudG8oMC44LCB7IHNjYWxlOiAxIH0pLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0cy5hbmdsZSA9IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlVGltZSwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS50dW1UYWJsZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdGltZXM9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlVGltZSwgOTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaW1lcy50aW1ldHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrUHVibGljTWV0aG9kcy50aW1lY29udmVyc2lvbnModGltZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYobnVtPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLCBSZWRFdmVudFR5cGUuQnRuX01haW5fU3Bpbik7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICBvbkNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBkcmF3VHlwZTogNSxcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xvc2VWaWV3KCkge1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi5YWz6Zet5aSn6L2s55uYXCIpXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgLy8gICAgIC8vIFs0XVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG4vKipcclxuICogWzFdIENsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcy5cclxuICogWzJdIFVzZSBgcHJvcGVydHlgIGRlY29yYXRvciBpZiB5b3VyIHdhbnQgdGhlIG1lbWJlciB0byBiZSBzZXJpYWxpemFibGUuXHJcbiAqIFszXSBZb3VyIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZS5cclxuICogWzRdIFlvdXIgdXBkYXRlIGZ1bmN0aW9uIGdvZXMgaGVyZS5cclxuICpcclxuICogTGVhcm4gbW9yZSBhYm91dCBzY3JpcHRpbmc6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9cclxuICogTGVhcm4gbW9yZSBhYm91dCBDQ0NsYXNzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvY2NjbGFzcy5odG1sXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgbGlmZS1jeWNsZSBjYWxsYmFja3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbiAqL1xyXG4iXX0=