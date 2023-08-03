"use strict";
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
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.sevenSign, this.getUserIdJsonString());
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(230008));
        }
    };
    SignUi.prototype.onClickBuyBtn = function () {
        this.onClose();
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击解锁5倍奖励按钮的点击次数);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInBuy, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(SignInBuyUi_1.default).init(null);
                uiNode.getComponent(SignInBuyUi_1.default).iniData();
            }
        });
    };
    SignUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
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