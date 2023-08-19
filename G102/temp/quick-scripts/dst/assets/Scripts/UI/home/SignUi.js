
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '199d4jMcb1PxrnT7MaRKx4x', 'SignUi');
// Scripts/UI/home/SignUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var SignIn_1 = require("../../JsonData/SignIn");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var SignInBuyUi_1 = require("./SignInBuyUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignUi = /** @class */ (function (_super) {
    __extends(SignUi, _super);
    function SignUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sign_in_ui = null;
        _this.today = null;
        return _this;
    }
    SignUi.prototype.init = function (uiAc) {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手签到点击次数);
        _super.prototype.init.call(this, uiAc);
        cc.director.on(WXManagerEX_1.WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
        this.refreshUi();
    };
    SignUi.prototype.refreshUi = function () {
        var root = this.node.getChildByName("dayBgRoot");
        var itemRoot = this.node.getChildByName("itemRoot");
        itemRoot.removeAllChildren();
        var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
        for (var i = 0; i < data.length; i++) {
            var itemParent = root.getChildByName("day" + i);
            itemParent.getComponentInChildren(TextLanguage_1.default).setReplaceValue('~', (i + 1) + '');
            var item = PropManager_1.PropManager.getInstance().createPropItem(data[i].Item, data[i].Num);
            // let temp = itemParent.children[0];
            // itemParent.removeAllChildren();
            // itemParent.addChild(temp);
            item.name = "item" + i;
            itemRoot.addChild(item);
            item.setPosition(cc.v2(itemParent.x, itemParent.y - 15));
            if (i < StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                var bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                bg.addChild(gou);
                gou.setPosition(cc.v2(0, -10));
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            }
            else if (i > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                var bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            }
            else {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
                    item.getComponent(cc.Button).enabled = false;
                }
                else {
                    var bg = new cc.Node();
                    bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                    if (i == 6) {
                        bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                    }
                    bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                    itemRoot.addChild(bg);
                }
            }
        }
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 1) {
            // this.node.getChildByName("receiveBtn").active = false;
            this.today.active = false;
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = false;
        }
        else {
            // this.node.getChildByName("receiveBtn").active = true;
            this.today.active = true;
            var item = itemRoot.getChildByName("item" + (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)));
            this.today.setPosition(item.x, item.y - 5);
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = true;
        }
    };
    SignUi.prototype.onReceiveBtnClick = function (e, num) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInBuy, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(SignInBuyUi_1.default).init(null);
                uiNode.getComponent(SignInBuyUi_1.default).iniData();
            }
        });
        return;
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
    SignUi.prototype.onClickBuyBtn = function () {
        var _this = this;
        //this.onClose();
        // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113))
        // return;
        // FollowManager.getInstance().followEvent(Follow_Type.点击解锁5倍奖励按钮的点击次数);
        // UIManager.getInstance().showUiDialog(UIPath.SignInBuy,UILayerLevel.One,{
        //     onCompleted:(uiNode)=>{
        //         uiNode.getComponent(SignInBuyUi).init(null);
        //         uiNode.getComponent(SignInBuyUi).iniData();
        //     }
        // })
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var num;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined)
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index)
            return;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-74cd62188527aedb'
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
    SignUi.prototype.onShipinComp = function () {
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
    SignUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    SignUi.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        cc.director.off(WXManagerEX_1.WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
    };
    SignUi.prototype.getUserIdJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], SignUi.prototype, "sign_in_ui", void 0);
    __decorate([
        property(cc.Node)
    ], SignUi.prototype, "today", void 0);
    SignUi = __decorate([
        ccclass
    ], SignUi);
    return SignUi;
}(UIComponent_1.default));
exports.default = SignUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBeUU7QUFDekUsMkRBQXNFO0FBQ3RFLG1EQUE4QztBQUU5QyxpREFBNEM7QUFDNUMsZ0RBQWtFO0FBQ2xFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUU1RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUseURBQXNGO0FBQ3RGLDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFDekMsd0NBQW1EO0FBRW5ELDBDQUF5QztBQUN6Qyw2Q0FBd0M7QUFHbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVc7SUFBL0M7UUFBQSxxRUE0TkM7UUF6TkcsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLFdBQUssR0FBWSxJQUFJLENBQUM7O0lBdU4xQixDQUFDO0lBck5HLHFCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUks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bGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCwgeyBXWEFERW52bnQgfSBmcm9tIFwiLi4vLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaWduSW5NYW5hZ2VyLCBTaWduSW5UeXBlIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1NpZ25JblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgU2lnbkluQnV5VWkgZnJvbSBcIi4vU2lnbkluQnV5VWlcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHNpZ25faW5fdWk6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdG9kYXk6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5paw5omL562+5Yiw54K55Ye75qyh5pWwKTtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uKFdYQURFbnZudC5RSVJJUUlBTkRBT1NISVBJTiwgdGhpcy5vblNoaXBpbkNvbXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCkge1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGF5QmdSb290XCIpO1xyXG4gICAgICAgIGxldCBpdGVtUm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpO1xyXG4gICAgICAgIGl0ZW1Sb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YUJ5U2lnbkluVHlwZShTaWduSW5UeXBlLlNhdmVuRGF5KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1QYXJlbnQgPSByb290LmdldENoaWxkQnlOYW1lKFwiZGF5XCIgKyBpKTtcclxuICAgICAgICAgICAgaXRlbVBhcmVudC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywgKGkgKyAxKSArICcnKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaV0uSXRlbSwgZGF0YVtpXS5OdW0pO1xyXG4gICAgICAgICAgICAvLyBsZXQgdGVtcCA9IGl0ZW1QYXJlbnQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgIC8vIGl0ZW1QYXJlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgLy8gaXRlbVBhcmVudC5hZGRDaGlsZCh0ZW1wKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJpdGVtXCIgKyBpO1xyXG4gICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MihpdGVtUGFyZW50LngsIGl0ZW1QYXJlbnQueSAtIDE1KSk7XHJcbiAgICAgICAgICAgIGlmIChpIDwgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfMl9NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18zX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgZ291LnNldFBvc2l0aW9uKGNjLnYyKDAsIC0xMCkpO1xyXG4gICAgICAgICAgICAgICAgYmcuc2V0UG9zaXRpb24oY2MudjIoaXRlbVBhcmVudC54LCBpdGVtUGFyZW50LnkpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGJnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfMl9NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18zX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiZy5zZXRQb3NpdGlvbihjYy52MihpdGVtUGFyZW50LngsIGl0ZW1QYXJlbnQueSkpO1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzJfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18zX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJnLnNldFBvc2l0aW9uKGNjLnYyKGl0ZW1QYXJlbnQueCwgaXRlbVBhcmVudC55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwgMCkgPT0gMSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtUm9vdC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIiArIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5LnNldFBvc2l0aW9uKGl0ZW0ueCwgaXRlbS55IC0gNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ1JlZFRpcCcpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVjZWl2ZUJ0bkNsaWNrKGUsIG51bTogc3RyaW5nKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuXHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW5CdXksVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25JbkJ1eVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduSW5CdXlVaSkuaW5pRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAnJyB8fCBudW0gPT0gdW5kZWZpbmVkKSBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKSArICcnO1xyXG4gICAgICAgIGlmIChOdW1iZXIobnVtKSAhPSBpbmRleCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IFNpZ25Jbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhQnlTaWduSW5UeXBlKFNpZ25JblR5cGUuU2F2ZW5EYXkpO1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShkYXRhW2luZGV4XS5JdGVtLCBkYXRhW2luZGV4XS5OdW0pO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5paw5omL562+5YiweOWkqeeahOeCueWHu+asoeaVsCArIGluZGV4KTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGRhdGFbaW5kZXhdLkl0ZW0sIGRhdGFbaW5kZXhdLk51bSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA2KSB7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsIDEpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVNldmVuR2lmdCwgdGhpcy5nZXRVc2VySWRKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwgMSk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCBpbmRleClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfVElQLCBSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluLCBmYWxzZSwgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbl9CdG5HZXQpO1xyXG5cclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5UaW1lLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zZXZlblNpZ24sIHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDIzMDAwOCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQnV5QnRuKCkge1xyXG4gICAgICAgIC8vdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpKVxyXG4gICAgICAgIC8vIHJldHVybjtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye76Kej6ZSBNeWAjeWlluWKseaMiemSrueahOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW5CdXksVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgLy8gICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25JbkJ1eVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduSW5CdXlVaSkuaW5pRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHZhciBudW07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAnJyB8fCBudW0gPT0gdW5kZWZpbmVkKSBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKSArICcnO1xyXG4gICAgICAgIGlmIChOdW1iZXIobnVtKSAhPSBpbmRleCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4gPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LTc0Y2Q2MjE4ODUyN2FlZGInXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5vZmZDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5zaG93KCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4uc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlub/lkYrmi4nlj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5vbkNsb3NlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDIzMDAwOCkpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNoaXBpbkNvbXAoKTogdm9pZCB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCAwKTtcclxuICAgICAgICB2YXIgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwgMCkgKyAnJztcclxuICAgICAgICBpZiAoTnVtYmVyKG51bSkgIT0gaW5kZXgpIHJldHVybjtcclxuICAgICAgICBpZiAoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sIDApID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YUJ5U2lnbkluVHlwZShTaWduSW5UeXBlLlNhdmVuRGF5KTtcclxuICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YVtpbmRleF0uSXRlbSwgZGF0YVtpbmRleF0uTnVtICogMik7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvnrb7liLB45aSp55qE54K55Ye75qyh5pWwICsgaW5kZXgpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oZGF0YVtpbmRleF0uSXRlbSwgZGF0YVtpbmRleF0uTnVtICogMik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA2KSB7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsIDEpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVNldmVuR2lmdCwgdGhpcy5nZXRVc2VySWRKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwgMSk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLCBpbmRleClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfVElQLCBSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluLCBmYWxzZSwgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbl9CdG5HZXQpO1xyXG5cclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5UaW1lLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zZXZlblNpZ24sIHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDIzMDAwOCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKSB7XHJcblxyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuICAgIG9uQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihXWEFERW52bnQuUUlSSVFJQU5EQU9TSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFVzZXJJZEpzb25TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19