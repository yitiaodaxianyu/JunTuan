
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/WeekCard/WeekCardUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2Vla0NhcmRcXFdlZWtDYXJkVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRTNDLDhDQUF5QztBQUN6QywyRUFBaUY7QUFDakYsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCw4REFBeUQ7QUFDekQsNERBQTJEO0FBQzNELG9EQUFtRDtBQUNuRCxxQ0FBZ0M7QUFDaEMsaURBQXdEO0FBQ3hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUU5RCxzREFBbUY7QUFDbkYsaURBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBSzFDO0lBQXdDLDhCQUFXO0lBQW5EO1FBQUEscUVBMExDO1FBeExHLGlCQUFXLEdBQUcsTUFBTSxDQUFBLENBQUEsUUFBUTtRQUU1QixpQkFBVyxHQUFHLE1BQU0sQ0FBQSxDQUFBLFFBQVE7UUFHNUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUN6QixlQUFTLEdBQVcsSUFBSSxDQUFDOztJQWtMN0IsQ0FBQztJQWhMRyw4QkFBUyxHQUFUO1FBQ0ksdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQU0sQ0FBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLG9EQUE0QixDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLHVCQUFVLENB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Q0o7SUFDTCxDQUFDO0lBRUQscUNBQWdCLEdBQWhCO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN0RCxDQUFDO0lBRUQsaUNBQVksR0FBWjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdkQsQ0FBQztJQUVELG9DQUFlLEdBQWY7UUFDSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQywyQkFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkYsQ0FBQztJQXpMZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTBMOUI7SUFBRCxpQkFBQztDQTFMRCxBQTBMQyxDQTFMdUMscUJBQVcsR0EwTGxEO2tCQTFMb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDb25zdGFudENvbmZpZ3VyYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0NvbnN0YW50Q29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IERpbmdZdWVNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBheUluZm8gfSBmcm9tIFwiLi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlZWtDYXJkVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgZ29vZ2xlX2lkXzEgPSBcImM1MDJcIi8v6K6i6ZiF6LC35q2MaWRcclxuXHJcbiAgICBnb29nbGVfaWRfMiA9IFwiYzUwNVwiLy/mmL7npLrosLfmrYxpZFxyXG5cclxuXHJcbiAgICBwYXlfaW5mbzE6UGF5SW5mbyA9IG51bGw7XHJcbiAgICBwYXlfaW5mbzI6UGF5SW5mbyA9IG51bGw7XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWRqOWNoeeJueadg+WNoemhtemdouWxleekuuasoeaVsCk7XHJcbiAgICAgICAgbGV0IHByb3AxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3QxXCIpLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHByb3AxLmdldENvbXBvbmVudChQcm9wKS5pbml0KFByb3BJZC5HZW0sTnVtYmVyKENvbnN0YW50Q29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRWYWx1ZSg2KSksUHJvcEFjdGlvbi5Mb29rKTtcclxuXHJcbiAgICAgICAgaWYocHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJnb3VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcHJvcDIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdDJcIikuY2hpbGRyZW5bMF1cclxuICAgICAgICBwcm9wMi5nZXRDb21wb25lbnQoUHJvcCkuaW5pdChQcm9wSWQuR2VtLE51bWJlcihDb25zdGFudENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VmFsdWUoNykpLFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgdGhpcy5wYXlfaW5mbzEgPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5wYXlfaW5mbzIgPSAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8odGhpcy5nb29nbGVfaWRfMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJpY2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnBheV9pbmZvMS5wcmljZTtcclxuICAgICAgICBsZXQgZGluZ3l1ZUJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpbmdZdWVCdG5cIik7XHJcbiAgICAgICAgaWYodGhpcy5wYXlfaW5mbzEuaXNfYnV5KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJpY2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpbmdZdWVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCByZWNlaXZlQnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKTtcclxuICAgICAgICAgICAgcmVjZWl2ZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyDpooblj5bmjInpkq7lpITnkIZcclxuICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5XZWVrQ2FyZElzUmVjZWl2ZVRvZGF5LDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAxMSk7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9wMi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AyLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcDIuZ2V0Q2hpbGRCeU5hbWUoXCJnb3VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMTMpO1xyXG4gICAgICAgICAgICAgICAgaWYocHJvcDIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wMi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcDIuZ2V0Q2hpbGRCeU5hbWUoXCJnb3VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcubmFtZSA9IFwiYmdcIjtcclxuICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ291Lm5hbWUgPSBcImdvdVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wMi5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcDIuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwcm9wMS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJnb3VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYmcubmFtZSA9IFwiYmdcIjtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZ291Lm5hbWUgPSBcImdvdVwiO1xyXG4gICAgICAgICAgICAgICAgZ291LmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICBiZy5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgIHByb3AxLmFkZENoaWxkKGJnKTtcclxuICAgICAgICAgICAgICAgIHByb3AxLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoRGF0ZS5ub3coKSA+IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuV2Vla0NhcmRPdmVyVGltZSwwKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuV2Vla0NhcmRPdmVyVGltZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHQgPSA2MCo2MCoyNCo3ICogMTAwMDtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkT3ZlclRpbWUsdCt0dCk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxOdW1iZXIoQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFZhbHVlKDYpKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxOdW1iZXIoQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFZhbHVlKDYpKSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJpY2VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGluZ3l1ZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZihwcm9wMS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByb3AxLmdldENoaWxkQnlOYW1lKFwiZ291XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuV2Vla0NhcmRJc0ZpcnN0QnV5LDApID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBkaW5neXVlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucGF5X2luZm8yLnByaWNlO1xyXG4gICAgICAgICAgICBkaW5neXVlQnRuLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkaW5neXVlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucGF5X2luZm8xLnByaWNlO1xyXG4gICAgICAgICAgICBkaW5neXVlQnRuLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQ2xpY2tEaW5nWXVlQnRuKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0RpbmdZdWUoe1xyXG4gICAgICAgICAgICByZXN1bHQ6KGlzRHk6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzRHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpbmdZdWVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkSXNGaXJzdEJ1eSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxOdW1iZXIoQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFZhbHVlKDYpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sTnVtYmVyKENvbnN0YW50Q29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRWYWx1ZSg2KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0dCA9IDYwKjYwKjI0KjcgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkT3ZlclRpbWUsdCt0dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3AxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3QxXCIpLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHByb3AxLmdldENoaWxkQnlOYW1lKFwiYmdcIikgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3AxLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDEuZ2V0Q2hpbGRCeU5hbWUoXCJnb3VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcubmFtZSA9IFwiYmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ291Lm5hbWUgPSBcImdvdVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wMS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sdGhpcy5nb29nbGVfaWRfMSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrUmVjZWl2ZUJ0bigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5XZWVrQ2FyZElzUmVjZWl2ZVRvZGF5LDApID09IDApe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5XZWVrQ2FyZElzUmVjZWl2ZVRvZGF5LDEpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxOdW1iZXIoQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFZhbHVlKDcpKSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLE51bWJlcihDb25zdGFudENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VmFsdWUoNykpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgcmVjZWl2ZUJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIik7XHJcbiAgICAgICAgICAgIHJlY2VpdmVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICByZWNlaXZlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgcmVjZWl2ZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAxMyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvcDIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdDJcIikuY2hpbGRyZW5bMF1cclxuICAgICAgICAgICAgaWYocHJvcDIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHByb3AyLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByb3AyLmdldENoaWxkQnlOYW1lKFwiZ291XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGJnLm5hbWUgPSBcImJnXCI7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdvdS5uYW1lID0gXCJnb3VcIjtcclxuICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgYmcub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgIC8vIGJnLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICBwcm9wMi5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgICAgICAgICBwcm9wMi5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDYW5jZWxCdG4oKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRpcHNwb3BcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpZGVDYW5jZWwoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRpcHNwb3BcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bkNsb3NlKCl7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1dlZWtDYXJkKTtcclxuICAgIH1cclxufVxyXG4iXX0=