"use strict";
cc._RF.push(module, '44ceeh9aIJJfKSMp0Ww//zr', 'WeekCardUi');
// Scripts/WeekCard/WeekCardUi.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var ConstantConfiguration_1 = require("../JsonData/ConstantConfiguration");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var DingYueManager_1 = require("../Payment/DingYueManager");
var PayManager_1 = require("../Payment/PayManager");
var Prop_1 = require("../Prop/Prop");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WeekCardUi = /** @class */ (function (_super) {
    __extends(WeekCardUi, _super);
    function WeekCardUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.google_id_1 = "c502"; //订阅谷歌id
        _this.google_id_2 = "c505"; //显示谷歌id
        _this.pay_info1 = null;
        _this.pay_info2 = null;
        return _this;
    }
    WeekCardUi.prototype.refreshUi = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.周卡特权卡页面展示次数);
        var prop1 = this.node.getChildByName("itemRoot1").children[0];
        prop1.getComponent(Prop_1.default).init(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(6)), PropConfig_1.PropAction.Look);
        if (prop1.getChildByName("bg") != null) {
            prop1.getChildByName("bg").active = false;
            prop1.getChildByName("gou").active = false;
        }
        var prop2 = this.node.getChildByName("itemRoot2").children[0];
        prop2.getComponent(Prop_1.default).init(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(7)), PropConfig_1.PropAction.Look);
        this.pay_info1 = DingYueManager_1.DingYueManager.getInstance().getWeekInfo();
        this.pay_info2 = PayManager_1.PayManager.getInstance().getPayInfo(this.google_id_2);
        this.node.getChildByName("price").getComponent(cc.Label).string = this.pay_info1.price;
        var dingyueBtn = this.node.getChildByName("dingYueBtn");
        if (this.pay_info1.is_buy) {
            this.node.getChildByName("price").active = false;
            this.node.getChildByName("dingYueBtn").active = false;
            var receiveBtn = this.node.getChildByName("receiveBtn");
            receiveBtn.active = true;
            // 领取按钮处理
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 0) == 0) {
                receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                receiveBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100011);
                if (prop2.getChildByName("bg") != null) {
                    prop2.getChildByName("bg").active = false;
                    prop2.getChildByName("gou").active = false;
                }
            }
            else {
                receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                receiveBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100013);
                if (prop2.getChildByName("bg") != null) {
                    prop2.getChildByName("bg").active = true;
                    prop2.getChildByName("gou").active = true;
                }
                else {
                    var bg = new cc.Node();
                    bg.name = "bg";
                    bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                    var gou = new cc.Node();
                    gou.name = "gou";
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                    bg.opacity = 150;
                    // bg.addChild(gou);
                    prop2.addChild(bg);
                    prop2.addChild(gou);
                }
            }
            if (prop1.getChildByName("bg") != null) {
                prop1.getChildByName("bg").active = true;
                prop1.getChildByName("gou").active = true;
            }
            else {
                var bg = new cc.Node();
                bg.name = "bg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                var gou = new cc.Node();
                gou.name = "gou";
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
            }
            if (Date.now() > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardOverTime, 0)) {
                var t = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardOverTime);
                var tt = 60 * 60 * 24 * 7 * 1000;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardOverTime, t + tt);
                PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(6)));
                var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(6)));
                GameManager_1.default.getInstance().showGetTip(item);
            }
        }
        else {
            this.node.getChildByName("price").active = true;
            dingyueBtn.active = true;
            this.node.getChildByName("receiveBtn").active = false;
            if (prop1.getChildByName("bg") != null) {
                prop1.getChildByName("bg").active = false;
                prop1.getChildByName("gou").active = false;
            }
        }
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardIsFirstBuy, 0) == 0) {
            this.node.getChildByName("price").children[0].active = true;
            dingyueBtn.getComponentInChildren(cc.Label).string = this.pay_info2.price;
            dingyueBtn.children[1].active = true;
        }
        else {
            this.node.getChildByName("price").children[0].active = false;
            dingyueBtn.getComponentInChildren(cc.Label).string = this.pay_info1.price;
            dingyueBtn.children[1].active = false;
        }
    };
    WeekCardUi.prototype.onClickDingYueBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        ApkManager_1.default.getInstance().showDingYue({
            result: function (isDy) {
                if (isDy) {
                    _this.node.getChildByName("dingYueBtn").active = false;
                    _this.node.getChildByName("receiveBtn").active = true;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardIsFirstBuy, 1);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(6)));
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(6)));
                    GameManager_1.default.getInstance().showGetTip(item);
                    DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy = true;
                    var t = Date.now();
                    var tt = 60 * 60 * 24 * 7 * 1000;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardOverTime, t + tt);
                    var prop1 = _this.node.getChildByName("itemRoot1").children[0];
                    if (prop1.getChildByName("bg") != null) {
                        prop1.getChildByName("bg").active = true;
                        prop1.getChildByName("gou").active = true;
                    }
                    else {
                        var bg = new cc.Node();
                        bg.name = "bg";
                        bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                        var gou = new cc.Node();
                        gou.name = "gou";
                        gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                        bg.opacity = 150;
                        // bg.addChild(gou);
                        prop1.addChild(bg);
                        prop1.addChild(gou);
                    }
                }
            }
        }, this.google_id_1);
    };
    WeekCardUi.prototype.onClickReceiveBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 0) == 0) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 1);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(7)));
            var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, Number(ConstantConfiguration_1.ConstantConfigurationManager.getInstance().getValue(7)));
            GameManager_1.default.getInstance().showGetTip(item);
            var receiveBtn = this.node.getChildByName("receiveBtn");
            receiveBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            receiveBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            receiveBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100013);
            var prop2 = this.node.getChildByName("itemRoot2").children[0];
            if (prop2.getChildByName("bg") != null) {
                prop2.getChildByName("bg").active = true;
                prop2.getChildByName("gou").active = true;
            }
            else {
                var bg = new cc.Node();
                bg.name = "bg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                var gou = new cc.Node();
                gou.name = "gou";
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop2.addChild(bg);
                prop2.addChild(gou);
            }
        }
    };
    WeekCardUi.prototype.onClickCancelBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("Tipspop").active = true;
    };
    WeekCardUi.prototype.onHideCancel = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("Tipspop").active = false;
    };
    WeekCardUi.prototype.onClickBtnClose = function () {
        _super.prototype.onClose.call(this);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_WeekCard);
    };
    WeekCardUi = __decorate([
        ccclass
    ], WeekCardUi);
    return WeekCardUi;
}(UIComponent_1.default));
exports.default = WeekCardUi;

cc._RF.pop();