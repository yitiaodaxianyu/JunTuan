
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignInBuyUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '954f1hEmxZIerjfvPFRvPRS', 'SignInBuyUi');
// Scripts/UI/home/SignInBuyUi.ts

"use strict";
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var HttpManager_1 = require("../.././NetWork/HttpManager");
var GameManager_1 = require("../../GameManager");
var SignIn_1 = require("../../JsonData/SignIn");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var googldId = "c601";
var SignInBuyUi = /** @class */ (function (_super) {
    __extends(SignInBuyUi, _super);
    function SignInBuyUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInBuyUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    SignInBuyUi.prototype.iniData = function () {
        this.refreshUi();
    };
    SignInBuyUi.prototype.refreshUi = function () {
        // let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
        // let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        // let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        // content.removeAllChildren();
        // let payInfo = PayManager.getInstance().getPayInfo(googldId);
        // let rewardList = new Map<number,number>();
        // for(let i = 0; i < data.length;i++){
        //     // let item:cc.Node = null;
        //     if(i<index){
        //         // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 4;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 4);
        //         }
        //     }else{
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 5;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 5);
        //         }
        //     }
        // }
        // rewardList.forEach((num,id)=>{
        //     let item = PropManager.getInstance().createPropItem(id,num);
        //     content.addChild(item);
        // })
        // this.node.getChildByName("sure").getComponentInChildren(cc.Label).string = payInfo.price;
    };
    SignInBuyUi.prototype.onClickSureBtn = function () {
        // FollowManager.getInstance().followEvent(Follow_Type.点击解锁5倍奖励的购买成功次数);
        // let index = TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInNum,0)
        // let data = SignInManager.getInstance().getDataBySignInType(SignInType.SavenDay);
        // let rewardList = new Map<number,number>();
        // for(let i = 0; i < data.length;i++){
        //     // let item:cc.Node = null;
        //     if(i<index){
        //         // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 4;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 4);
        //         }
        //     }else{
        //         if(rewardList.has(data[i].Item)){
        //             let num = rewardList.get(data[i].Item);
        //             num += data[i].Num * 5;
        //             rewardList.set(data[i].Item,num);
        //         }else{
        //             rewardList.set(data[i].Item,data[i].Num * 5);
        //         }
        //     }
        // }
        // let rewardList1 = [];
        // rewardList.forEach((num,id)=>{
        //     PropManager.getInstance().changePropNum(id,num);
        //     let item = PropManager.getInstance().createPropItem(id,num);
        //     rewardList1.push(item);
        // })
        // GameManager.getInstance().showMultipleGetTip(rewardList1);
        // TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver,1);
        // HttpManager.post(AccessName.updateSevenGift,this.getUserIdJsonString());
        // this.onClose();
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var num;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined)
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index)
            return;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
            if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin = tt.createRewardedVideoAd({
                    adUnitId: '90312q6nknsj0ao2an'
                });
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.offError();
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.onError(function (err) {
                    console.log(err);
                });
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.offClose();
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.show().catch(function () {
                    // 失败重试
                    WXManagerEX_1.default.getInstance().qiriQiandaoShipin.load()
                        .then(function () { return WXManagerEX_1.default.getInstance().qiriQiandaoShipin.show(); })
                        .catch(function (err) {
                        GameManager_1.default.getInstance().showMessage("广告拉取失败");
                    });
                });
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.onClose(function (res) {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        _this.onShipinComp();
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                    }
                    WXManagerEX_1.default.getInstance().qiriQiandaoShipin.destroy();
                });
            }
            else {
                this.onShipinComp();
            }
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(230008));
        }
    };
    SignInBuyUi.prototype.onShipinComp = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index)
            return;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
            var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
            var reward = PropManager_1.PropManager.getInstance().createPropItem(data[index].Item, data[index].Num * 2);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手签到x天的点击次数 + index);
            PropManager_1.PropManager.getInstance().changePropNum(data[index].Item, data[index].Num * 2);
            GameManager_1.default.getInstance().showGetTip(reward);
            // this.node.getChildByName("receiveBtn").active = false;
            index++;
            if (index > 6) {
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateSevenGift, this.getUserIdJsonString());
            }
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, index);
            this.refreshUi();
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_SignIn, false, EventManager_1.RedEventType.Btn_Main_SignIn_BtnGet);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInTime, new Date().getTime());
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.sevenSign, this.getUserIdJsonString());
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(230008));
        }
    };
    SignInBuyUi.prototype.onClickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // this.destroySelf();
        var num;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined)
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index)
            return;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
            var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
            var reward = PropManager_1.PropManager.getInstance().createPropItem(data[index].Item, data[index].Num);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手签到x天的点击次数 + index);
            PropManager_1.PropManager.getInstance().changePropNum(data[index].Item, data[index].Num);
            GameManager_1.default.getInstance().showGetTip(reward);
            // this.node.getChildByName("receiveBtn").active = false;
            index++;
            if (index > 6) {
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateSevenGift, this.getUserIdJsonString());
            }
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, index);
            this.refreshUi();
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_SignIn, false, EventManager_1.RedEventType.Btn_Main_SignIn_BtnGet);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInTime, new Date().getTime());
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.sevenSign, this.getUserIdJsonString());
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(230008));
        }
    };
    SignInBuyUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        // ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    SignInBuyUi.prototype.getUserIdJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    SignInBuyUi = __decorate([
        ccclass
    ], SignInBuyUi);
    return SignInBuyUi;
}(UIComponent_1.default));
exports.default = SignInBuyUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25JbkJ1eVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCwyREFBc0U7QUFFdEUsaURBQTRDO0FBQzVDLGdEQUFrRTtBQUNsRSx1RUFBa0U7QUFDbEUsbUVBQThEO0FBQzlELHVFQUFrRTtBQUVsRSxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUseURBQXNGO0FBQ3RGLDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFHbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO0FBR3hCO0lBQXlDLCtCQUFXO0lBQXBEOztJQXVNQSxDQUFDO0lBck1HLDBCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0ksaUdBQWlHO1FBQ2pHLG1GQUFtRjtRQUNuRix3RkFBd0Y7UUFDeEYsK0JBQStCO1FBQy9CLCtEQUErRDtRQUMvRCw2Q0FBNkM7UUFDN0MsdUNBQXVDO1FBQ3ZDLGtDQUFrQztRQUNsQyxtQkFBbUI7UUFDbkIsNEZBQTRGO1FBQzVGLDRDQUE0QztRQUM1QyxzREFBc0Q7UUFDdEQsc0NBQXNDO1FBQ3RDLGdEQUFnRDtRQUNoRCxpQkFBaUI7UUFDakIsNERBQTREO1FBQzVELFlBQVk7UUFDWixhQUFhO1FBQ2IsNENBQTRDO1FBQzVDLHNEQUFzRDtRQUN0RCxzQ0FBc0M7UUFDdEMsZ0RBQWdEO1FBQ2hELGlCQUFpQjtRQUNqQiw0REFBNEQ7UUFD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ckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEh0dHBNYW5hZ2VyLCBBY2Nlc3NOYW1lIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaWduSW5NYW5hZ2VyLCBTaWduSW5UeXBlIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1NpZ25JblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IGdvb2dsZElkID0gXCJjNjAxXCI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5CdXlVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIH1cclxuXHJcbiAgICBpbmlEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICAvLyBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLDApXHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YUJ5U2lnbkluVHlwZShTaWduSW5UeXBlLlNhdmVuRGF5KTtcclxuICAgICAgICAvLyBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICAvLyBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgLy8gbGV0IHBheUluZm8gPSBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbyhnb29nbGRJZCk7XHJcbiAgICAgICAgLy8gbGV0IHJld2FyZExpc3QgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgLy8gICAgIC8vIGxldCBpdGVtOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICBpZihpPGluZGV4KXtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMoZGF0YVtpXS5JdGVtKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KGRhdGFbaV0uSXRlbSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbnVtICs9IGRhdGFbaV0uTnVtICogNDtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHJld2FyZExpc3QuaGFzKGRhdGFbaV0uSXRlbSkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBudW0gPSByZXdhcmRMaXN0LmdldChkYXRhW2ldLkl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIG51bSArPSBkYXRhW2ldLk51bSAqIDU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQoZGF0YVtpXS5JdGVtLG51bSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sZGF0YVtpXS5OdW0gKiA1KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXdhcmRMaXN0LmZvckVhY2goKG51bSxpZCk9PntcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGlkLG51bSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdXJlXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IHBheUluZm8ucHJpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1N1cmVCdG4oKXtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye76Kej6ZSBNeWAjeWlluWKseeahOi0reS5sOaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgLy8gbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwwKVxyXG4gICAgICAgIC8vIGxldCBkYXRhID0gU2lnbkluTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVNpZ25JblR5cGUoU2lnbkluVHlwZS5TYXZlbkRheSk7XHJcbiAgICAgICAgLy8gbGV0IHJld2FyZExpc3QgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgLy8gICAgIC8vIGxldCBpdGVtOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICBpZihpPGluZGV4KXtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMoZGF0YVtpXS5JdGVtKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KGRhdGFbaV0uSXRlbSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbnVtICs9IGRhdGFbaV0uTnVtICogNDtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHJld2FyZExpc3QuaGFzKGRhdGFbaV0uSXRlbSkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBudW0gPSByZXdhcmRMaXN0LmdldChkYXRhW2ldLkl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIG51bSArPSBkYXRhW2ldLk51bSAqIDU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQoZGF0YVtpXS5JdGVtLG51bSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sZGF0YVtpXS5OdW0gKiA1KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgcmV3YXJkTGlzdDEgPSBbXTtcclxuICAgICAgICAvLyByZXdhcmRMaXN0LmZvckVhY2goKG51bSxpZCk9PntcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGlkLG51bSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgIC8vICAgICByZXdhcmRMaXN0MS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAocmV3YXJkTGlzdDEpO1xyXG4gICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwxKTtcclxuICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlU2V2ZW5HaWZ0LHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICAvLyB0aGlzLm9uQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB2YXIgbnVtO1xyXG4gICAgICAgIGxldCBpbmRleCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sIDApO1xyXG4gICAgICAgIGlmIChudW0gPT0gJycgfHwgbnVtID09IHVuZGVmaW5lZCkgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCkgKyAnJztcclxuICAgICAgICBpZiAoTnVtYmVyKG51bSkgIT0gaW5kZXgpIHJldHVybjtcclxuICAgICAgICBpZiAoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sIDApID09IDApIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnFpcmlRaWFuZGFvU2hpcGluID0gdHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzkwMzEycTZua25zajBhbzJhbidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnFpcmlRaWFuZGFvU2hpcGluLm9mZkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnFpcmlRaWFuZGFvU2hpcGluLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5zaG93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuW5v+WRiuaLieWPluWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnFpcmlRaWFuZGFvU2hpcGluLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobjgJDlhbPpl63lub/lkYrjgJHmjInpkq5cclxuICAgICAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMjMwMDA4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNoaXBpbkNvbXAoKTogdm9pZCB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKTtcclxuICAgICAgICB2YXIgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCkgKyAnJztcclxuICAgICAgICBpZiAoTnVtYmVyKG51bSkgIT0gaW5kZXgpIHJldHVybjtcclxuICAgICAgICBpZiAoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sIDApID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YUJ5U2lnbkluVHlwZShTaWduSW5UeXBlLlNhdmVuRGF5KTtcclxuICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YVtpbmRleF0uSXRlbSwgZGF0YVtpbmRleF0uTnVtICogMik7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvnrb7liLB45aSp55qE54K55Ye75qyh5pWwICsgaW5kZXgpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oZGF0YVtpbmRleF0uSXRlbSwgZGF0YVtpbmRleF0uTnVtICogMik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA2KSB7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsIDEpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVNldmVuR2lmdCwgdGhpcy5nZXRVc2VySWRKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwgMSk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCBpbmRleClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfVElQLCBSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluLCBmYWxzZSwgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbl9CdG5HZXQpO1xyXG5cclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5UaW1lLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zZXZlblNpZ24sIHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDIzMDAwOCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQ2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgdmFyIG51bTtcclxuICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKTtcclxuICAgICAgICBpZiAobnVtID09ICcnIHx8IG51bSA9PSB1bmRlZmluZWQpIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sIDApICsgJyc7XHJcbiAgICAgICAgaWYgKE51bWJlcihudW0pICE9IGluZGV4KSByZXR1cm47XHJcbiAgICAgICAgaWYgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gU2lnbkluTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVNpZ25JblR5cGUoU2lnbkluVHlwZS5TYXZlbkRheSk7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaW5kZXhdLkl0ZW0sIGRhdGFbaW5kZXhdLk51bSk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvnrb7liLB45aSp55qE54K55Ye75qyh5pWwICsgaW5kZXgpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oZGF0YVtpbmRleF0uSXRlbSwgZGF0YVtpbmRleF0uTnVtKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKHJld2FyZCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDYpIHtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwgMSk7XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlU2V2ZW5HaWZ0LCB0aGlzLmdldFVzZXJJZEpzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLCAxKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sIGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAsIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4sIGZhbHNlLCBSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluX0J0bkdldCk7XHJcblxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25JblRpbWUsIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNldmVuU2lnbiwgdGhpcy5nZXRVc2VySWRKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMjMwMDA4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgLy8gQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRVc2VySWRKc29uU3RyaW5nKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==