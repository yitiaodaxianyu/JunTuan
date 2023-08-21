
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
                if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                    WXManagerEX_1.default.getInstance().zhuanpanShipin = tt.createRewardedVideoAd({
                        adUnitId: 'a1m58qb4ql9122f3mp'
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
                        WXManagerEX_1.default.getInstance().zhuanpanShipin.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUdXJtdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtHQUFrRztBQUNsRywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDBDQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRzFDLDREQUF1RDtBQUd2RCw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFFL0QsbURBQWtEO0FBQ2xELDBEQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsc0RBQW1GO0FBRW5GLDRDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLGlDQUE0QjtBQUM1QiwrREFBcUU7QUFDckUsNERBQXNFO0FBRXRFLHFDQUFxQztBQUMvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7OztHQVVHO0FBR0g7SUFBdUMsNkJBQVc7SUFBbEQ7UUFDSSxNQUFNO1FBQ04sY0FBYztRQUZsQixxRUFxVEM7UUFqVEcsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBR2pDLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixVQUFJLEdBQWMsRUFBRSxDQUFDOztRQXlSckIsZ0JBQWdCO1FBQ2hCLCtCQUErQjtRQUMvQiw4QkFBOEI7UUFDOUIsSUFBSTtRQUVKLCtCQUErQjtRQUMvQixhQUFhO1FBQ2IsSUFBSTtJQUNSLENBQUM7SUEvUmEsNkJBQVMsR0FBbkI7SUFFQSxD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UyxFQUFFLDJCQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCwyQkFBTyxHQUFQO1FBQ0ksaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFFcEIsQ0FBQztJQUNPLDBDQUFzQixHQUE5QjtRQUNJLElBQUksR0FBRyxHQUFHLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBclNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBSXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUTtJQW5CVCxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBcVQ3QjtJQUFELGdCQUFDO0NBclRELEFBcVRDLENBclRzQyxxQkFBVyxHQXFUakQ7a0JBclRvQixTQUFTO0FBdVQ5Qjs7Ozs7Ozs7O0dBU0ciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBOb2RlLCBUd2VlbiwgdHdlZW4sIHYzLCBTcHJpdGUsIENvbG9yLCBWZWMzLCBMYWJlbCB9IGZyb20gJ2NjJztcclxuLy8gaW1wb3J0IHsgU291bmQgfSBmcm9tICcuLi9Tb3VuZC9Tb3VuZCc7XHJcbi8vIGltcG9ydCB7IFVJUG9wIH0gZnJvbSAnLi4vVUlQb3AnO1xyXG4vLyBpbXBvcnQgeyBBRF9UWVBFLCBWb2lkIH0gZnJvbSAnLi9Wb2lkJztcclxuXHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1NjcmlwdHMvVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElOVEVSX1ZJREVPX1RZUEUsIFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFB1YmxpY01ldGhvZHMgZnJvbSBcIi4vUHVibGljTWV0aG9kc1wiO1xyXG5pbXBvcnQgVGltZXMgZnJvbSBcIi4vVGltZXNcIjtcclxuaW1wb3J0IHsgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vVHVybnRhYmxlSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IFdYTWFuYWdlckVYLCB7IFdYQURFbnZudCB9IGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcblxyXG4vLyBpbXBvcnQgV1pQdWJsaWMgZnJvbSAnLi9XWlB1YmxpYyc7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogUHJlZGVmaW5lZCB2YXJpYWJsZXNcclxuICogTmFtZSA9IFR1cm10YWJsZXNcclxuICogRGF0ZVRpbWUgPSBUdWUgRGVjIDIxIDIwMjEgMTg6MDc6MjkgR01UKzA4MDAgKOS4reWbveagh+WHhuaXtumXtClcclxuICogQXV0aG9yID0gWlFZWlxyXG4gKiBGaWxlQmFzZW5hbWUgPSBUdXJtdGFibGVzLnRzXHJcbiAqIEZpbGVCYXNlbmFtZU5vRXh0ZW5zaW9uID0gVHVybXRhYmxlc1xyXG4gKiBVUkwgPSBkYjovL2Fzc2V0cy9zY3JpcHQvV1ovVHVybXRhYmxlcy50c1xyXG4gKiBNYW51YWxVcmwgPSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9cclxuICpcclxuICovXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJtdGFibGUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcbiAgICAvLyBbMV1cclxuICAgIC8vIGR1bW15ID0gJyc7XHJcblxyXG4gICAgaXNfc3BpbmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5hZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5zaG93OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJ0bl9hY3Rpb246IGNjLlR3ZWVuPGFueT4gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2lmdHM6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3BpbmxpZ2h0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGl0ZW06IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgaW5pdFVpKCkge1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fVEpQKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY55qE5omT5byA5qyh5pWwKTtcclxuICAgICAgICBsZXQgYnRuX3N0YXJ0ID0gdGhpcy5idG5hZDtcclxuICAgICAgICB0aGlzLmJ0bl9hY3Rpb24gPSBjYy50d2VlbihidG5fc3RhcnQpLnRvKDAuOCwgeyBzY2FsZTogMS4xIH0pLnRvKDAuOCwgeyBzY2FsZTogMSB9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuc3BpbmxpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmdpZnRzLnJlc3VtZUFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuZ2lmdHMuYW5nbGUgPSAwXHJcblxyXG4gICAgICAgIC8v55Sf5oiQNuS4quWlluWKsVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXggPCB0aGlzLmdpZnRzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gaW5kZXggKyAxXHJcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKGlkKSwgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShpZCkpO1xyXG4gICAgICAgICAgICBpdGVtcy5zY2FsZSA9IDAuNzNcclxuICAgICAgICAgICAgaXRlbXMucGFyZW50ID0gdGhpcy5naWZ0cy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuY2hpbGRyZW5baW5kZXhdXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbS5wdXNoKGl0ZW1zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBUaW1lcy5UdXJtdGFibGVub2RlID0gdGhpcy5ub2RlXHJcbiAgICAgICAgLy8gbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApO1xyXG4gICAgICAgIC8vIGlmKG51bT09MSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgUmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLCAwKSA+IDk5OTk5OSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5zZXRQb3NpdGlvbigwLCAtMzIwLCAwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuYWQuc2V0UG9zaXRpb24oLTE0NCwgLTMyMCwgMClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRpbWVzLnRpbWV0eHQgPSB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpXHJcbiAgICAgICAgbGV0IHRpbWVzID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlVGltZSwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS50dW1UYWJsZVRpbWUpO1xyXG4gICAgICAgIFRpbWVzLnRpbWV0eHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgUHVibGljTWV0aG9kcy50aW1lY29udmVyc2lvbnModGltZXMpXHJcbiAgICAgICAgdGhpcy5idG5hZC5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwgMCkgPCAxMDtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuYnRuYWQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2J0blNwaW4oMCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5zaG93Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNidG5TcGluKDEpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQ2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3JcclxuICAgICAgICAvLyAxNSo2MCoxMDAwLy85MDBcclxuXHJcbiAgICB9XHJcbiAgICAvL+inhumikeingueci+WujOaIkFxyXG4gICAgcHJpdmF0ZSBvblNoaXBpbkNvbXAoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsIDApO1xyXG4gICAgICAgIG51bSsrO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLCBudW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlhY3otLnmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIC8vMSAyMCUgMiAyMCUgMyAyMCUgNCAxNSUgNSAxNSUgNiAxMCVcclxuICAgICAgICB0aGlzLnN0YXJ0U3Bpbih0aGlzLnJvdW5kbU51bSgpLCAwKTtcclxuICAgIH1cclxuICAgIG9uQ2xpY2J0blNwaW4odHlwZSkgeyAgLy8wOueCueWHu+W5v+WRiui9rOebmDEw5qyhICAgMe+8mueCueWHuzE15YiG6ZKf5YWN6LS5ICA15qyhXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwgMCkgPiAyMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5rKh5qyh5pWw5o+Q56S6MTAwMTIwXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMDQpLCAzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemh1YW5wYW5TaGlwaW4gPSB0dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJ2ExbTU4cWI0cWw5MTIyZjNtcCdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpodWFucGFuU2hpcGluLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpodWFucGFuU2hpcGluLm9mZkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5zaG93KCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemh1YW5wYW5TaGlwaW4uc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuW5v+WRiuaLieWPluWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpodWFucGFuU2hpcGluLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aHVhbnBhblNoaXBpbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsIG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8xIDIwJSAyIDIwJSAzIDIwJSA0IDE1JSA1IDE1JSA2IDEwJVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKHRoaXMucm91bmRtTnVtKCksIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoKGlzVHJ1ZSk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZihpc1RydWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXNlclR1cm5Qcml6ZSx0aGlzLmdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKSx0cnVlKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5bm/5ZGK5oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKGRhdGEuaW5kZXgsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8g5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5bm/5ZGK5oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKDEsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0pLFZJREVPX1RZUEUuRXF1aXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsIDApID4gOTk5OTkpIHtcclxuICAgICAgICAgICAgICAgIC8vIOayoeasoeaVsOaPkOekujEwMDEyMFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDAzKSwgMyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwgMCk7XHJcbiAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsIG51bSk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5YWN6LS55oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vMSAyMCUgMiAyMCUgMyAyMCUgNCAxNSUgNSAxNSUgNiAxMCVcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKHRoaXMucm91bmRtTnVtKCksIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVzZXJUdXJuUHJpemUsdGhpcy5nZXRUdXJuUHJpemVKc29uU3RyaW5nKCksdHJ1ZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8g5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIC8vICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLG51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zdGFydFNwaW4oZGF0YS5pbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pLmNhdGNoKChlcnIpID0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIOWksei0pVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlMVwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlhY3otLnmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRTcGluKDEsMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJvdW5kbU51bSgpOiBudW1iZXIge1xyXG5cclxuICAgICAgICB2YXIgcnVtOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIGlmIChydW0gPCAwLjIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChydW0gPCAwLjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChydW0gPCAwLjYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChydW0gPCAwLjc1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocnVtIDwgMC45KSB7XHJcbiAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocnVtIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBzdGFydFNwaW4oaW5kZXg6IG51bWJlciwgdHlwZTogbnVtYmVyKSB7Ly90eXBlOiAgIDA65bm/5ZGKICAgMe+8muWFjei0uSAg5pu05paw5pe26Ze0XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ovazliqjovaznm5gx5qyhKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLui9rOebmFjmrKEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuaXNfc3BpbmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJld2FyZG51bWJlciA9IGluZGV4Ly8zICAgXHJcbiAgICAgICAgLy8gY3ViaWNPdXQgIHF1YWRJbk91dCAgNu+8jDA656ys5LiA5LiqICAgIDU656ysNuS4qiAgIDTvvJrnrKw15LiqICAgcXVpbnRPdXRcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmdpZnRzKS50byg2LCB7IGFuZ2xlOiAzNjAwICsgKHJld2FyZG51bWJlciAtIDEpICogNjAgfSwgeyBlYXNpbmc6IFwicXVpbnRPdXRcIiB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc19zcGluaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmxpZ2h0LnBhcmVudC5hbmdsZSA9ICgzNjAwICsgKHJld2FyZG51bWJlciAtIDEpICogNjApICogLTFcclxuICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGJ0blNwaW4gPSB0aGlzLmJ0bmFkO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9hY3Rpb24gPSBjYy50d2VlbihidG5TcGluKS50bygxLCB7IHNjYWxlOiAxLjEgfSkudG8oMSwgeyBzY2FsZTogMS4xIH0pLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gMC40XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc3BpbmxpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IG9wYWNpdHk6IDI1NSB9KVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KHRpbWUpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKyvovaznm5hcIilcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKHJld2FyZG51bWJlciksIFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1OdW0ocmV3YXJkbnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKHJld2FyZG51bWJlciksIFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1OdW0ocmV3YXJkbnVtYmVyKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuX3N0YXJ0ID0gdGhpcy5idG5hZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bl9hY3Rpb24gPSBjYy50d2VlbihidG5fc3RhcnQpLnRvKDAuOCwgeyBzY2FsZTogMS4xIH0pLnRvKDAuOCwgeyBzY2FsZTogMSB9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmxpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdHMuYW5nbGUgPSAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkudHVtVGFibGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRpbWVzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIDkwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGltZXMudGltZXR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK1B1YmxpY01ldGhvZHMudGltZWNvbnZlcnNpb25zKHRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSywgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NwaW4pO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgb25DbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUdXJuUHJpemVKc29uU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgZHJhd1R5cGU6IDUsXHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsb3NlVmlldygpIHtcclxuICAgIC8vICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIuWFs+mXreWkp+i9rOebmFwiKVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZGVsdGFUaW1lOiBudW1iZXIpIHtcclxuICAgIC8vICAgICAvLyBbNF1cclxuICAgIC8vIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFsxXSBDbGFzcyBtZW1iZXIgY291bGQgYmUgZGVmaW5lZCBsaWtlIHRoaXMuXHJcbiAqIFsyXSBVc2UgYHByb3BlcnR5YCBkZWNvcmF0b3IgaWYgeW91ciB3YW50IHRoZSBtZW1iZXIgdG8gYmUgc2VyaWFsaXphYmxlLlxyXG4gKiBbM10gWW91ciBpbml0aWFsaXphdGlvbiBnb2VzIGhlcmUuXHJcbiAqIFs0XSBZb3VyIHVwZGF0ZSBmdW5jdGlvbiBnb2VzIGhlcmUuXHJcbiAqXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgc2NyaXB0aW5nOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgQ0NDbGFzczogaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzMuMy9tYW51YWwvemgvc2NyaXB0aW5nL2NjY2xhc3MuaHRtbFxyXG4gKiBMZWFybiBtb3JlIGFib3V0IGxpZmUtY3ljbGUgY2FsbGJhY2tzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4gKi9cclxuIl19