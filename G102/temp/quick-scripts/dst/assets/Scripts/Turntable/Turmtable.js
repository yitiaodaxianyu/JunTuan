
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUdXJtdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtHQUFrRztBQUNsRywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDBDQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTFDLHdEQUFtRTtBQUNuRSw0REFBdUQ7QUFDdkQsZ0RBQTJDO0FBQzNDLDBDQUE0RDtBQUM1RCw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFFL0QsbURBQWtEO0FBQ2xELDBEQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsc0RBQW1GO0FBRW5GLDRDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLGlDQUE0QjtBQUM1QiwrREFBcUU7QUFFckUscUNBQXFDO0FBQy9CLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDOzs7Ozs7Ozs7O0dBVUc7QUFHRjtJQUF1Qyw2QkFBVztJQUFsRDtRQUNHLE1BQU07UUFDTixjQUFjO1FBRmpCLHFFQXlQQTtRQXJQRyxnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFVBQUksR0FBYyxFQUFFLENBQUM7O1FBNk5yQixnQkFBZ0I7UUFDaEIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixJQUFJO1FBRUosK0JBQStCO1FBQy9CLGFBQWE7UUFDYixJQUFJO0lBQ1IsQ0FB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RyxFQUFDLEdBQUc7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDO0lBek9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBSXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUTtJQW5CUixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBeVA5QjtJQUFELGdCQUFDO0NBelBBLEFBeVBBLENBelB1QyxxQkFBVyxHQXlQbEQ7a0JBelBxQixTQUFTO0FBMlAvQjs7Ozs7Ozs7O0dBU0ciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBOb2RlLCBUd2VlbiwgdHdlZW4sIHYzLCBTcHJpdGUsIENvbG9yLCBWZWMzLCBMYWJlbCB9IGZyb20gJ2NjJztcclxuLy8gaW1wb3J0IHsgU291bmQgfSBmcm9tICcuLi9Tb3VuZC9Tb3VuZCc7XHJcbi8vIGltcG9ydCB7IFVJUG9wIH0gZnJvbSAnLi4vVUlQb3AnO1xyXG4vLyBpbXBvcnQgeyBBRF9UWVBFLCBWb2lkIH0gZnJvbSAnLi9Wb2lkJztcclxuXHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1NjcmlwdHMvVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElOVEVSX1ZJREVPX1RZUEUsIFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFB1YmxpY01ldGhvZHMgZnJvbSBcIi4vUHVibGljTWV0aG9kc1wiO1xyXG5pbXBvcnQgVGltZXMgZnJvbSBcIi4vVGltZXNcIjtcclxuaW1wb3J0IHsgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vVHVybnRhYmxlSW5mb3JtYXRpb25cIjtcclxuXHJcbi8vIGltcG9ydCBXWlB1YmxpYyBmcm9tICcuL1daUHVibGljJztcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogUHJlZGVmaW5lZCB2YXJpYWJsZXNcclxuICogTmFtZSA9IFR1cm10YWJsZXNcclxuICogRGF0ZVRpbWUgPSBUdWUgRGVjIDIxIDIwMjEgMTg6MDc6MjkgR01UKzA4MDAgKOS4reWbveagh+WHhuaXtumXtClcclxuICogQXV0aG9yID0gWlFZWlxyXG4gKiBGaWxlQmFzZW5hbWUgPSBUdXJtdGFibGVzLnRzXHJcbiAqIEZpbGVCYXNlbmFtZU5vRXh0ZW5zaW9uID0gVHVybXRhYmxlc1xyXG4gKiBVUkwgPSBkYjovL2Fzc2V0cy9zY3JpcHQvV1ovVHVybXRhYmxlcy50c1xyXG4gKiBNYW51YWxVcmwgPSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9cclxuICpcclxuICovXHJcblxyXG4gQGNjY2xhc3NcclxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cm10YWJsZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8vIFsxXVxyXG4gICAgLy8gZHVtbXkgPSAnJztcclxuXHJcbiAgICBpc19zcGluaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bmFkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bnNob3c6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgYnRuX2FjdGlvbjogY2MuVHdlZW48YW55PiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBnaWZ0czogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3BpbmxpZ2h0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGl0ZW06IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgaW5pdFVpKCkge1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fVEpQKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY55qE5omT5byA5qyh5pWwKTtcclxuICAgICAgICBsZXQgYnRuX3N0YXJ0ID0gdGhpcy5idG5hZDtcclxuICAgICAgICB0aGlzLmJ0bl9hY3Rpb24gPSBjYy50d2VlbihidG5fc3RhcnQpLnRvKDAuOCwgeyBzY2FsZTogMS4xIH0pLnRvKDAuOCwgeyBzY2FsZTogMSB9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuc3BpbmxpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmdpZnRzLnJlc3VtZUFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuZ2lmdHMuYW5nbGUgPSAwXHJcblxyXG4gICAgICAgIC8v55Sf5oiQNuS4quWlluWKsVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXggPCB0aGlzLmdpZnRzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGlkPWluZGV4KzFcclxuICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKGlkKSxUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJdGVtTnVtKGlkKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnNjYWxlPTAuNzNcclxuICAgICAgICAgICAgaXRlbXMucGFyZW50PXRoaXMuZ2lmdHMuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpLmNoaWxkcmVuW2luZGV4XVxyXG4gICAgICAgICAgICB0aGlzLml0ZW0ucHVzaChpdGVtcylcclxuICAgICAgICB9XHJcbiAgICAgICAgVGltZXMuVHVybXRhYmxlbm9kZT10aGlzLm5vZGVcclxuICAgICAgICAvLyBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgLy8gaWYobnVtPT0xKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcblxyXG4gICAgfVxyXG4gICAgUmVmcmVzaCgpe1xyXG4gICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKSA+IDk5OTk5OSl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5zZXRQb3NpdGlvbigwLC0zMjAsMClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuYWQuc2V0UG9zaXRpb24oLTE0NCwtMzIwLDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAwKTtcclxuICAgICAgICBpZihudW09PTEpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT10cnVlOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFRpbWVzLnRpbWV0eHQ9dGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKVxyXG4gICAgICAgIGxldCB0aW1lcz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnR1bVRhYmxlVGltZSk7XHJcbiAgICAgICAgVGltZXMudGltZXR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK1B1YmxpY01ldGhvZHMudGltZWNvbnZlcnNpb25zKHRpbWVzKVxyXG4gICAgICAgIHRoaXMuYnRuYWQuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLDApIDwgMTA7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmJ0bmFkLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNidG5TcGluKDApO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuc2hvdy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljYnRuU3BpbigxKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bkNsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yXHJcbiAgICAgICAgLy8gMTUqNjAqMTAwMC8vOTAwXHJcblxyXG4gICAgfVxyXG4gICAgb25DbGljYnRuU3Bpbih0eXBlKSB7ICAvLzA654K55Ye75bm/5ZGK6L2s55uYMTDmrKEgICAx77ya54K55Ye7MTXliIbpkp/lhY3otLkgIDXmrKFcclxuICAgICAgICBpZih0eXBlPT0wKXtcclxuICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwwKSA+IDkpe1xyXG4gICAgICAgICAgICAgICAgLy8g5rKh5qyh5pWw5o+Q56S6MTAwMTIwXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMDQpLDMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKChpc1RydWUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNUcnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVzZXJUdXJuUHJpemUsdGhpcy5nZXRUdXJuUHJpemVKc29uU3RyaW5nKCksdHJ1ZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmiJDlip9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVBZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOW5v+WRiuaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3BpbihkYXRhLmluZGV4LDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLlpLHotKVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVBZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOW5v+WRiuaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3BpbigxLDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxWSURFT19UWVBFLkVxdWlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKSA+IDk5OTk5KXtcclxuICAgICAgICAgICAgICAgIC8vIOayoeasoeaVsOaPkOekujEwMDEyMFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDAzKSwzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLzEgMjAlIDIgMjAlIDMgMjAlIDQgMTUlIDUgMTUlIDYgMTAlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3Bpbih0aGlzLnJvdW5kbU51bSgpLDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVzZXJUdXJuUHJpemUsdGhpcy5nZXRUdXJuUHJpemVKc29uU3RyaW5nKCksdHJ1ZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8g5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgIC8vICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLG51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zdGFydFNwaW4oZGF0YS5pbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pLmNhdGNoKChlcnIpID0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIOWksei0pVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlMVwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlhY3otLnmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRTcGluKDEsMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJvdW5kbU51bSgpOm51bWJlcntcclxuICAgICAgIFxyXG4gICAgICAgIHZhciBydW06bnVtYmVyPU1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgaWYocnVtPDAuMil7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1lbHNlIGlmKHJ1bTwwLjQpe1xyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICB9ZWxzZSBpZihydW08MC42KXtcclxuICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgfWVsc2UgaWYocnVtPDAuNzUpe1xyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICB9ZWxzZSBpZihydW08MC45KXtcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfWVsc2UgaWYocnVtPDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBzdGFydFNwaW4oaW5kZXg6bnVtYmVyLHR5cGU6bnVtYmVyKSB7Ly90eXBlOiAgIDA65bm/5ZGKICAgMe+8muWFjei0uSAg5pu05paw5pe26Ze0XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ovazliqjovaznm5gx5qyhKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLui9rOebmFjmrKEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuaXNfc3BpbmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJld2FyZG51bWJlcj1pbmRleC8vMyAgIFxyXG4gICAgICAgIC8vIGN1YmljT3V0ICBxdWFkSW5PdXQgIDbvvIwwOuesrOS4gOS4qiAgICA1OuesrDbkuKogICA077ya56ysNeS4qiAgIHF1aW50T3V0XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5naWZ0cykudG8oNiwgeyBhbmdsZTogMzYwMCArIChyZXdhcmRudW1iZXItMSkgKiA2MCB9LCB7IGVhc2luZzogXCJxdWludE91dFwiIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3NwaW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQucGFyZW50LmFuZ2xlPSgzNjAwICsgKHJld2FyZG51bWJlci0xKSAqIDYwKSotMVxyXG4gICAgICAgICAgICB0aGlzLnNwaW5saWdodC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgYnRuU3BpbiA9IHRoaXMuYnRuYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0blNwaW4pLnRvKDEsIHsgc2NhbGU6MS4xIH0pLnRvKDEsIHsgc2NhbGU6IDEuMSB9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgdGltZSA9IDAuNFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNwaW5saWdodClcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTowICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OjI1NSAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTowICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OjI1NSAgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysr6L2s55uYXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1JRChyZXdhcmRudW1iZXIpLFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1OdW0ocmV3YXJkbnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKHJld2FyZG51bWJlciksVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShyZXdhcmRudW1iZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5fc3RhcnQgPSB0aGlzLmJ0bmFkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0bl9zdGFydCkudG8oMC44LCB7IHNjYWxlOiAxLjEgfSkudG8oMC44LCB7IHNjYWxlOiAxIH0pLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0cy5hbmdsZSA9IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnR1bVRhYmxlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRpbWVzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIDkwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGltZXMudGltZXR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK1B1YmxpY01ldGhvZHMudGltZWNvbnZlcnNpb25zKHRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TcGluKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGRyYXdUeXBlOjUsXHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xvc2VWaWV3KCkge1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi5YWz6Zet5aSn6L2s55uYXCIpXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgLy8gICAgIC8vIFs0XVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG4vKipcclxuICogWzFdIENsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcy5cclxuICogWzJdIFVzZSBgcHJvcGVydHlgIGRlY29yYXRvciBpZiB5b3VyIHdhbnQgdGhlIG1lbWJlciB0byBiZSBzZXJpYWxpemFibGUuXHJcbiAqIFszXSBZb3VyIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZS5cclxuICogWzRdIFlvdXIgdXBkYXRlIGZ1bmN0aW9uIGdvZXMgaGVyZS5cclxuICpcclxuICogTGVhcm4gbW9yZSBhYm91dCBzY3JpcHRpbmc6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9cclxuICogTGVhcm4gbW9yZSBhYm91dCBDQ0NsYXNzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvY2NjbGFzcy5odG1sXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgbGlmZS1jeWNsZSBjYWxsYmFja3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbiAqL1xyXG4iXX0=