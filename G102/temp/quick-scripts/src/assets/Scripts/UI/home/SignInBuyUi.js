"use strict";
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
var HttpManager_1 = require("../.././NetWork/HttpManager");
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var SignIn_1 = require("../../JsonData/SignIn");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var PayManager_1 = require("../../Payment/PayManager");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
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
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(googldId);
        var rewardList = new Map();
        for (var i = 0; i < data.length; i++) {
            // let item:cc.Node = null;
            if (i < index) {
                // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                if (rewardList.has(data[i].Item)) {
                    var num = rewardList.get(data[i].Item);
                    num += data[i].Num * 4;
                    rewardList.set(data[i].Item, num);
                }
                else {
                    rewardList.set(data[i].Item, data[i].Num * 4);
                }
            }
            else {
                if (rewardList.has(data[i].Item)) {
                    var num = rewardList.get(data[i].Item);
                    num += data[i].Num * 5;
                    rewardList.set(data[i].Item, num);
                }
                else {
                    rewardList.set(data[i].Item, data[i].Num * 5);
                }
            }
        }
        rewardList.forEach(function (num, id) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
            content.addChild(item);
        });
        this.node.getChildByName("sure").getComponentInChildren(cc.Label).string = payInfo.price;
    };
    SignInBuyUi.prototype.onClickSureBtn = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showPay({
            result: function (isDy) {
                if (isDy) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击解锁5倍奖励的购买成功次数);
                    var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
                    var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
                    var rewardList = new Map();
                    for (var i = 0; i < data.length; i++) {
                        // let item:cc.Node = null;
                        if (i < index) {
                            // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                            if (rewardList.has(data[i].Item)) {
                                var num = rewardList.get(data[i].Item);
                                num += data[i].Num * 4;
                                rewardList.set(data[i].Item, num);
                            }
                            else {
                                rewardList.set(data[i].Item, data[i].Num * 4);
                            }
                        }
                        else {
                            if (rewardList.has(data[i].Item)) {
                                var num = rewardList.get(data[i].Item);
                                num += data[i].Num * 5;
                                rewardList.set(data[i].Item, num);
                            }
                            else {
                                rewardList.set(data[i].Item, data[i].Num * 5);
                            }
                        }
                    }
                    var rewardList1_1 = [];
                    rewardList.forEach(function (num, id) {
                        PropManager_1.PropManager.getInstance().changePropNum(id, num);
                        var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
                        rewardList1_1.push(item);
                    });
                    GameManager_1.default.getInstance().showMultipleGetTip(rewardList1_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 1);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateSevenGift, _this.getUserIdJsonString());
                    _this.onClose();
                }
            }
        }, googldId);
    };
    SignInBuyUi.prototype.onClickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignInBuyUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
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