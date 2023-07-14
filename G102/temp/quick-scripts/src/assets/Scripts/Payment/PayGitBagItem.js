"use strict";
cc._RF.push(module, 'f6f0d1MOfNPubPGLH0zV3M5', 'PayGitBagItem');
// Scripts/Payment/PayGitBagItem.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var Prop_1 = require("../Prop/Prop");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var MyTool_1 = require("../Tools/MyTool");
var PayManager_1 = require("./PayManager");
var EventManager_1 = require("../Tools/EventManager");
var EquipItem_1 = require("../Equipment/Ui/EquipItem");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayGitBagItem = /** @class */ (function (_super) {
    __extends(PayGitBagItem, _super);
    function PayGitBagItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        return _this;
    }
    // init(uiAc: UiAction): void {
    //     super.init(uiAc);
    // }
    PayGitBagItem.prototype.initData = function (data) {
        var _this = this;
        this.data = data;
        var item1, item2, item3, item4, item5, item6;
        if (data.GetCoinNum != 0) {
            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, data.GetCoinNum);
            item1.scale = 0.85;
        }
        if (data.GetGemNum != 0) {
            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, data.GetGemNum);
            item2.scale = 0.85;
        }
        if (data.GetCrystal != 0) {
            item3 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.LongJing, data.GetCrystal);
            item3.scale = 0.85;
        }
        if (data.ItemId_1 != 0) {
            item4 = PropManager_1.PropManager.getInstance().createPropItem(data.ItemId_1, data.ItemNum_1);
            item4.scale = 0.85;
        }
        if (data.ItemId_2 != 0) {
            item5 = PropManager_1.PropManager.getInstance().createPropItem(data.ItemId_2, data.ItemNum_2);
            item5.scale = 0.85;
        }
        if (data.ItemId_3 != 0) {
            item6 = PropManager_1.PropManager.getInstance().createPropItem(data.ItemId_3, data.ItemNum_3);
            item6.scale = 0.85;
        }
        var content = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        if (item1)
            content.addChild(item1);
        if (item2)
            content.addChild(item2);
        if (item3)
            content.addChild(item3);
        if (item4)
            content.addChild(item4);
        if (item5)
            content.addChild(item5);
        if (item6)
            content.addChild(item6);
        if (data.AdReward == 1) {
            this.node.getChildByName("freeBtn").active = true;
            this.node.getChildByName("limit").active = true;
            this.node.getChildByName("btn").active = false;
            var isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + data.GiftID) || 0;
            isSoldOut = Number(isSoldOut);
            this.node.getChildByName("limit").getComponent(TextLanguage_1.default).setReplaceValue(["%", "~"], [data.AdPlayableTimes - isSoldOut + '', data.AdPlayableTimes + '']);
            if (isSoldOut >= data.AdPlayableTimes) {
                this.soldOut(this.node);
                this.node.getChildByName("freeBtn").active = false;
                this.node.getChildByName("limit").active = false;
                this.node.getChildByName("Cycle_Bg_3").active = true;
                this.node.getChildByName("slodOut").active = true;
                this.node.getChildByName("Cycle_Bg_3").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("slodOut").getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("btn").getComponent(cc.Button).interactable = false;
            }
            //红点
            this.node.getChildByName("freeBtn").getChildByName('red').active = isSoldOut < data.AdPlayableTimes;
        }
        else {
            this.node.getChildByName("freeBtn").active = false;
            this.node.getChildByName("limit").active = false;
            this.node.getChildByName("btn").active = true;
            var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(data.ProductId);
            // this.node.getChildByName("btn").getComponentInChildren(cc.Label).string = payInfo.price + payInfo.currency;
            this.node.getChildByName("btn").getComponentInChildren(cc.Label).string = payInfo.price;
            var isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + data.GiftID) || 0;
            if (isSoldOut != 0) {
                this.soldOut(this.node);
                this.node.getChildByName("btn").active = false;
                this.node.getChildByName("Cycle_Bg_3").active = true;
                this.node.getChildByName("slodOut").active = true;
                this.node.getChildByName("Cycle_Bg_3").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("slodOut").getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.node.getChildByName("btn").getComponent(cc.Button).interactable = false;
            }
        }
        // let nowTime = Math.floor(Date.now() / 1000);
        // let endTime = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000) + (24 * 60 * 60);
        // this.node.getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(nowTime - endTime);
        this.schedule(function () {
            var nowTime;
            var endTime;
            switch (data.GiftText) {
                case 1:
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000) + (24 * 60 * 60);
                    break;
                case 2:
                    var MillisecondsADay = 24 * 60 * 60;
                    var timestamp = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000);
                    var weekDay = new Date().getDay() === 0 ? (7 - 1) : (new Date().getDay() - 1);
                    var weekTimeStamp = timestamp - MillisecondsADay * weekDay;
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = weekTimeStamp + 24 * 60 * 60 * 7;
                    break;
                case 3:
                    var date = new Date();
                    date.setDate(1);
                    date.setHours(0, 0, 0, 0);
                    var timeStamp = date.getTime() / 1000;
                    nowTime = Math.floor(Date.now() / 1000);
                    endTime = timeStamp + 24 * 60 * 60 * 30;
                    break;
            }
            _this.node.getChildByName("time").getComponent(cc.Label).string = MyTool_1.default.getTimeStr(endTime - nowTime);
        }, 0, cc.macro.REPEAT_FOREVER);
    };
    PayGitBagItem.prototype.soldOut = function (node) {
        for (var i = 0; i < node.childrenCount; i++) {
            if (node.children[i].getComponent(cc.Label)) {
                node.children[i].getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if (node.children[i].getComponent(cc.Sprite)) {
                node.children[i].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if (node.children[i].childrenCount > 0) {
                this.soldOut(node.children[i]);
            }
        }
    };
    PayGitBagItem.prototype.onClickBuy = function () {
        var _this = this;
        if (this.data.AdReward == 1) {
            ApkManager_1.default.getInstance().showVideo((function (isTrue) {
                if (isTrue) {
                    var item1 = void 0, item2 = void 0, item3 = void 0, item4 = void 0, item5 = void 0, item6 = void 0;
                    if (_this.data.GetCoinNum != 0) {
                        item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, _this.data.GetCoinNum);
                    }
                    if (_this.data.GetGemNum != 0) {
                        item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, _this.data.GetGemNum);
                    }
                    if (_this.data.GetCrystal != 0) {
                        item3 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.LongJing, _this.data.GetCrystal);
                        PayManager_1.PayManager.getInstance().addTotalLongJingNum(_this.data.GetCrystal);
                    }
                    if (_this.data.ItemId_1 != 0) {
                        item4 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_1, _this.data.ItemNum_1);
                    }
                    if (_this.data.ItemId_2 != 0) {
                        item5 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_2, _this.data.ItemNum_2);
                    }
                    if (_this.data.ItemId_3 != 0) {
                        item6 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_3, _this.data.ItemNum_3);
                    }
                    var rewardList = [];
                    if (item1)
                        rewardList.push(item1);
                    if (item2)
                        rewardList.push(item2);
                    if (item3)
                        rewardList.push(item3);
                    if (item4)
                        rewardList.push(item4);
                    if (item5)
                        rewardList.push(item5);
                    if (item6)
                        rewardList.push(item6);
                    for (var i = 0; i < rewardList.length; i++) {
                        if (rewardList[i].getComponent(Prop_1.default)) {
                            PropManager_1.PropManager.getInstance().changePropNum(rewardList[i].getComponent(Prop_1.default).prop_id, rewardList[i].getComponent(Prop_1.default).prop_num);
                        }
                        else {
                            PropManager_1.PropManager.getInstance().changePropNum(rewardList[i].getComponent(EquipItem_1.default).equip_info.equip_id, 1);
                        }
                    }
                    GameManager_1.default.getInstance().showMultipleGetTip(rewardList);
                    var num = cc.sys.localStorage.getItem("pay_git_bag_item_" + _this.data.GiftID) || 0;
                    cc.sys.localStorage.setItem("pay_git_bag_item_" + _this.data.GiftID, ++num);
                    _this.initData(_this.data);
                    // switch(this.data.GiftID){
                    //     case 1001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Daily)
                    //     }break;
                    //     case 2001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Week)
                    //     }break;
                    //     case 3001:{
                    //         EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift_Month)
                    //     }break;
                    // }
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_Gift);
                    if (_this.data.GiftText == 1) {
                        // 日
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日礼包x档点击购买次数 + "AD");
                    }
                    else if (_this.data.GiftText == 2) {
                        // 周
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每周礼包x档点击购买次数 + "AD");
                    }
                    else {
                        // 月
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每月礼包x档点击购买次数 + "AD");
                    }
                }
            }).bind(this), Constants_1.VIDEO_TYPE.Gem);
        }
        else {
            ApkManager_1.default.getInstance().showPay({
                result: (function (isPay) {
                    if (isPay) {
                        var item1 = void 0, item2 = void 0, item3 = void 0, item4 = void 0, item5 = void 0, item6 = void 0;
                        if (_this.data.GetCoinNum != 0) {
                            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, _this.data.GetCoinNum);
                        }
                        if (_this.data.GetGemNum != 0) {
                            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, _this.data.GetGemNum);
                        }
                        if (_this.data.GetCrystal != 0) {
                            item3 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.LongJing, _this.data.GetCrystal);
                            PayManager_1.PayManager.getInstance().addTotalLongJingNum(_this.data.GetCrystal);
                        }
                        if (_this.data.ItemId_1 != 0) {
                            item4 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_1, _this.data.ItemNum_1);
                        }
                        if (_this.data.ItemId_2 != 0) {
                            item5 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_2, _this.data.ItemNum_2);
                        }
                        if (_this.data.ItemId_3 != 0) {
                            item6 = PropManager_1.PropManager.getInstance().createPropItem(_this.data.ItemId_3, _this.data.ItemNum_3);
                        }
                        var rewardList = [];
                        if (item1)
                            rewardList.push(item1);
                        if (item2)
                            rewardList.push(item2);
                        if (item3)
                            rewardList.push(item3);
                        if (item4)
                            rewardList.push(item4);
                        if (item5)
                            rewardList.push(item5);
                        if (item6)
                            rewardList.push(item6);
                        for (var i = 0; i < rewardList.length; i++) {
                            if (rewardList[i].getComponent(Prop_1.default)) {
                                PropManager_1.PropManager.getInstance().changePropNum(rewardList[i].getComponent(Prop_1.default).prop_id, rewardList[i].getComponent(Prop_1.default).prop_num);
                            }
                            else {
                                PropManager_1.PropManager.getInstance().changePropNum(rewardList[i].getComponent(EquipItem_1.default).equip_info.equip_id, 1);
                            }
                        }
                        GameManager_1.default.getInstance().showMultipleGetTip(rewardList);
                        var num = cc.sys.localStorage.getItem("pay_git_bag_item_" + _this.data.GiftID) || 0;
                        cc.sys.localStorage.setItem("pay_git_bag_item_" + _this.data.GiftID, ++num);
                        _this.initData(_this.data);
                        if (_this.data.GiftText == 1) {
                            // 日
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日礼包x档点击购买次数 + _this.data.GiftID);
                        }
                        else if (_this.data.GiftText == 2) {
                            // 周
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每周礼包x档点击购买次数 + _this.data.GiftID);
                        }
                        else {
                            // 月
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每月礼包x档点击购买次数 + _this.data.GiftID);
                        }
                    }
                }).bind(this)
            }, this.data.ProductId);
        }
    };
    PayGitBagItem = __decorate([
        ccclass
    ], PayGitBagItem);
    return PayGitBagItem;
}(cc.Component));
exports.default = PayGitBagItem;

cc._RF.pop();