
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
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0) > 4) {
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
        var times = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeTime, 60 * 60 * 12);
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
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0) > 4) {
                // 没次数提示100120
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1700003), 3);
            }
            else {
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.userTurnPrize, this.getTurnPrizeJsonString(), true).then(function (data) {
                    // 成功
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFree, num);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘免费抽奖点击次数);
                    _this.startSpin(data.index, 1);
                }).catch(function (err) {
                    // 失败
                    // console.log("失败1")
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFree, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFree, num);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘免费抽奖点击次数);
                    _this.startSpin(1, 1);
                });
            }
        }
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
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, 60 * 60 * 12);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUdXJtdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtHQUFrRztBQUNsRywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDBDQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTFDLHdEQUFtRTtBQUNuRSw0REFBdUQ7QUFDdkQsZ0RBQTJDO0FBQzNDLDBDQUE0RDtBQUM1RCw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFFL0QsbURBQWtEO0FBQ2xELDBEQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsc0RBQW1GO0FBRW5GLDRDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsaURBQTRDO0FBQzVDLGlDQUE0QjtBQUM1QiwrREFBcUU7QUFFckUscUNBQXFDO0FBQy9CLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDOzs7Ozs7Ozs7O0dBVUc7QUFHRjtJQUF1Qyw2QkFBVztJQUFsRDtRQUNHLE1BQU07UUFDTixjQUFjO1FBRmpCLHFFQWdPQTtRQTVORyxnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFVBQUksR0FBYyxFQUFFLENBQUM7O1FBb01yQixnQkFBZ0I7UUFDaEIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixJQUFJO1FBRUosK0JBQStCO1FBQy9CLGFBQWE7UUFDYixJQUFJO0lBQ1IsQ0FB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UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQUl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ1E7SUFuQlIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWdPOUI7SUFBRCxnQkFBQztDQWhPQSxBQWdPQSxDQWhPdUMscUJBQVcsR0FnT2xEO2tCQWhPcUIsU0FBUztBQWtPL0I7Ozs7Ozs7OztHQVNHIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgTm9kZSwgVHdlZW4sIHR3ZWVuLCB2MywgU3ByaXRlLCBDb2xvciwgVmVjMywgTGFiZWwgfSBmcm9tICdjYyc7XHJcbi8vIGltcG9ydCB7IFNvdW5kIH0gZnJvbSAnLi4vU291bmQvU291bmQnO1xyXG4vLyBpbXBvcnQgeyBVSVBvcCB9IGZyb20gJy4uL1VJUG9wJztcclxuLy8gaW1wb3J0IHsgQURfVFlQRSwgVm9pZCB9IGZyb20gJy4vVm9pZCc7XHJcblxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9TY3JpcHRzL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJTlRFUl9WSURFT19UWVBFLCBWSURFT19UWVBFIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBQdWJsaWNNZXRob2RzIGZyb20gXCIuL1B1YmxpY01ldGhvZHNcIjtcclxuaW1wb3J0IFRpbWVzIGZyb20gXCIuL1RpbWVzXCI7XHJcbmltcG9ydCB7IFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL1R1cm50YWJsZUluZm9ybWF0aW9uXCI7XHJcblxyXG4vLyBpbXBvcnQgV1pQdWJsaWMgZnJvbSAnLi9XWlB1YmxpYyc7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIFByZWRlZmluZWQgdmFyaWFibGVzXHJcbiAqIE5hbWUgPSBUdXJtdGFibGVzXHJcbiAqIERhdGVUaW1lID0gVHVlIERlYyAyMSAyMDIxIDE4OjA3OjI5IEdNVCswODAwICjkuK3lm73moIflh4bml7bpl7QpXHJcbiAqIEF1dGhvciA9IFpRWVpcclxuICogRmlsZUJhc2VuYW1lID0gVHVybXRhYmxlcy50c1xyXG4gKiBGaWxlQmFzZW5hbWVOb0V4dGVuc2lvbiA9IFR1cm10YWJsZXNcclxuICogVVJMID0gZGI6Ly9hc3NldHMvc2NyaXB0L1daL1R1cm10YWJsZXMudHNcclxuICogTWFudWFsVXJsID0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yLzMuMy9tYW51YWwvemgvXHJcbiAqXHJcbiAqL1xyXG5cclxuIEBjY2NsYXNzXHJcbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJtdGFibGUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcbiAgICAvLyBbMV1cclxuICAgIC8vIGR1bW15ID0gJyc7XHJcblxyXG4gICAgaXNfc3BpbmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5hZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5zaG93OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJ0bl9hY3Rpb246IGNjLlR3ZWVuPGFueT4gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2lmdHM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNwaW5saWdodDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBpdGVtOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIGluaXRVaSgpIHtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1RKUCk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOeahOaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgbGV0IGJ0bl9zdGFydCA9IHRoaXMuYnRuYWQ7XHJcbiAgICAgICAgdGhpcy5idG5fYWN0aW9uID0gY2MudHdlZW4oYnRuX3N0YXJ0KS50bygwLjgsIHsgc2NhbGU6IDEuMSB9KS50bygwLjgsIHsgc2NhbGU6IDEgfSkudW5pb24oKS5yZXBlYXRGb3JldmVyKCkuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLnNwaW5saWdodC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5naWZ0cy5yZXN1bWVBbGxBY3Rpb25zKClcclxuICAgICAgICB0aGlzLmdpZnRzLmFuZ2xlID0gMFxyXG5cclxuICAgICAgICAvL+eUn+aIkDbkuKrlpZblirFcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuaXRlbS5sZW5ndGg7IGluZGV4IDwgdGhpcy5naWZ0cy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpZD1pbmRleCsxXHJcbiAgICAgICAgICAgIGxldCBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1JRChpZCksVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShpZCkpO1xyXG4gICAgICAgICAgICBpdGVtcy5zY2FsZT0wLjczXHJcbiAgICAgICAgICAgIGl0ZW1zLnBhcmVudD10aGlzLmdpZnRzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5jaGlsZHJlbltpbmRleF1cclxuICAgICAgICAgICAgdGhpcy5pdGVtLnB1c2goaXRlbXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRpbWVzLlR1cm10YWJsZW5vZGU9dGhpcy5ub2RlXHJcbiAgICAgICAgLy8gbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApO1xyXG4gICAgICAgIC8vIGlmKG51bT09MSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG5cclxuICAgIH1cclxuICAgIFJlZnJlc2goKXtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsMCkgPiA0KXtcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bmFkLnNldFBvc2l0aW9uKDAsLTMyMCwwKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5zZXRQb3NpdGlvbigtMTQ0LC0zMjAsMClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApO1xyXG4gICAgICAgIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPXRydWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1mYWxzZTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGltZXMudGltZXR4dD10aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpXHJcbiAgICAgICAgbGV0IHRpbWVzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIDYwKjYwKjEyKTtcclxuICAgICAgICBUaW1lcy50aW1ldHh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrUHVibGljTWV0aG9kcy50aW1lY29udmVyc2lvbnModGltZXMpXHJcbiAgICAgICAgdGhpcy5idG5hZC5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsMCkgPCAxMDtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuYnRuYWQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2J0blNwaW4oMCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5zaG93Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNidG5TcGluKDEpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQ2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3JcclxuICAgICAgICAvLyAxNSo2MCoxMDAwLy85MDBcclxuXHJcbiAgICB9XHJcbiAgICBvbkNsaWNidG5TcGluKHR5cGUpIHsgIC8vMDrngrnlh7vlub/lkYrovaznm5gxMOasoSAgIDHvvJrngrnlh7sxNeWIhumSn+WFjei0uSAgNeasoVxyXG4gICAgICAgIGlmKHR5cGU9PTApe1xyXG4gICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLDApID4gOSl7XHJcbiAgICAgICAgICAgICAgICAvLyDmsqHmrKHmlbDmj5DnpLoxMDAxMjBcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAwNCksMyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoKGlzVHJ1ZSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1RydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXNlclR1cm5Qcml6ZSx0aGlzLmdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKSx0cnVlKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5bm/5ZGK5oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKGRhdGEuaW5kZXgsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY5bm/5ZGK5oq95aWW54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKDEsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFZJREVPX1RZUEUuRXF1aXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLDApID4gNCl7XHJcbiAgICAgICAgICAgICAgICAvLyDmsqHmrKHmlbDmj5DnpLoxMDAxMjBcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAwMyksMyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVzZXJUdXJuUHJpemUsdGhpcy5nZXRUdXJuUHJpemVKc29uU3RyaW5nKCksdHJ1ZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSwwKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOWFjei0ueaKveWllueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4oZGF0YS5pbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jlhY3otLnmir3lpZbngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKDEsMSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBzdGFydFNwaW4oaW5kZXg6bnVtYmVyLHR5cGU6bnVtYmVyKSB7Ly90eXBlOiAgIDA65bm/5ZGKICAgMe+8muWFjei0uSAg5pu05paw5pe26Ze0XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ovazliqjovaznm5gx5qyhKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLui9rOebmFjmrKEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuaXNfc3BpbmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJld2FyZG51bWJlcj1pbmRleC8vMyAgIFxyXG4gICAgICAgIC8vIGN1YmljT3V0ICBxdWFkSW5PdXQgIDbvvIwwOuesrOS4gOS4qiAgICA1OuesrDbkuKogICA077ya56ysNeS4qiAgIHF1aW50T3V0XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5naWZ0cykudG8oNiwgeyBhbmdsZTogMzYwMCArIChyZXdhcmRudW1iZXItMSkgKiA2MCB9LCB7IGVhc2luZzogXCJxdWludE91dFwiIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3NwaW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQucGFyZW50LmFuZ2xlPSgzNjAwICsgKHJld2FyZG51bWJlci0xKSAqIDYwKSotMVxyXG4gICAgICAgICAgICB0aGlzLnNwaW5saWdodC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgYnRuU3BpbiA9IHRoaXMuYnRuYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0blNwaW4pLnRvKDEsIHsgc2NhbGU6MS4xIH0pLnRvKDEsIHsgc2NhbGU6IDEuMSB9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgdGltZSA9IDAuNFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNwaW5saWdodClcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTowICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OjI1NSAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjIsIHsgb3BhY2l0eTowICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OjI1NSAgfSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysr6L2s55uYXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1JRChyZXdhcmRudW1iZXIpLFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW1OdW0ocmV3YXJkbnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbUlEKHJld2FyZG51bWJlciksVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbU51bShyZXdhcmRudW1iZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG5fc3RhcnQgPSB0aGlzLmJ0bmFkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuX2FjdGlvbiA9IGNjLnR3ZWVuKGJ0bl9zdGFydCkudG8oMC44LCB7IHNjYWxlOiAxLjEgfSkudG8oMC44LCB7IHNjYWxlOiAxIH0pLnVuaW9uKCkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlubGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0cy5hbmdsZSA9IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCA2MCo2MCoxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVllcywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRpbWVzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVHVybXRhYmxlRnJlZVRpbWUsIDkwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGltZXMudGltZXR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK1B1YmxpY01ldGhvZHMudGltZWNvbnZlcnNpb25zKHRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKG51bT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bnNob3cuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuc2hvdy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5idG5zaG93LmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TcGluKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFR1cm5Qcml6ZUpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGRyYXdUeXBlOjUsXHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xvc2VWaWV3KCkge1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi5YWz6Zet5aSn6L2s55uYXCIpXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgLy8gICAgIC8vIFs0XVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG4vKipcclxuICogWzFdIENsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcy5cclxuICogWzJdIFVzZSBgcHJvcGVydHlgIGRlY29yYXRvciBpZiB5b3VyIHdhbnQgdGhlIG1lbWJlciB0byBiZSBzZXJpYWxpemFibGUuXHJcbiAqIFszXSBZb3VyIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZS5cclxuICogWzRdIFlvdXIgdXBkYXRlIGZ1bmN0aW9uIGdvZXMgaGVyZS5cclxuICpcclxuICogTGVhcm4gbW9yZSBhYm91dCBzY3JpcHRpbmc6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9cclxuICogTGVhcm4gbW9yZSBhYm91dCBDQ0NsYXNzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvY2NjbGFzcy5odG1sXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgbGlmZS1jeWNsZSBjYWxsYmFja3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbiAqL1xyXG4iXX0=