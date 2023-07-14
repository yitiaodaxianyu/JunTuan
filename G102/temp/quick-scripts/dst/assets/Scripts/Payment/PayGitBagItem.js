
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayGitBagItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5R2l0QmFnSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBMkM7QUFDM0MsMENBQTBDO0FBQzFDLDhDQUF5QztBQUV6Qyw4REFBeUQ7QUFDekQscUNBQWdDO0FBQ2hDLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMENBQXFDO0FBR3JDLDJDQUEwQztBQUMxQyxzREFBbUY7QUFDbkYsdURBQWtEO0FBQ2xELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFFekQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE0UEM7UUExUFcsVUFBSSxHQUFrQixJQUFJLENBQUM7O0lBMFB2QyxDQUFDO0lBeFBHLCtCQUErQjtJQUMvQix3QkFBd0I7SUFDeEIsSUFBSTtJQUVKLGdDQUFRLEdBQVIsVUFBUyxJQUFtQjtRQUE1QixpQkF3R0M7UUF2R0csSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ3RCLEtBQUssR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0UsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ3JCLEtBQUssR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxt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VyxDQUFDLDZCQUFXLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3hGO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQzFCO0lBQ0wsQ0FBQztJQTFQZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTRQakM7SUFBRCxvQkFBQztDQTVQRCxBQTRQQyxDQTVQMEMsRUFBRSxDQUFDLFNBQVMsR0E0UHREO2tCQTVQb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZE1hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbkN5Y2xlUGFjayB9IGZyb20gXCIuL0RhdGEvQ3ljbGVQYWNrXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEVxdWlwSXRlbSBmcm9tIFwiLi4vRXF1aXBtZW50L1VpL0VxdWlwSXRlbVwiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5R2l0QmFnSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhOiBKc29uQ3ljbGVQYWNrID0gbnVsbDtcclxuXHJcbiAgICAvLyBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAvLyAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBpbml0RGF0YShkYXRhOiBKc29uQ3ljbGVQYWNrKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgaXRlbTEsIGl0ZW0yLCBpdGVtMywgaXRlbTQsIGl0ZW01LCBpdGVtNjtcclxuICAgICAgICBpZiAoZGF0YS5HZXRDb2luTnVtICE9IDApIHtcclxuICAgICAgICAgICAgaXRlbTEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLCBkYXRhLkdldENvaW5OdW0pO1xyXG4gICAgICAgICAgICBpdGVtMS5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLkdldEdlbU51bSAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW0yID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLCBkYXRhLkdldEdlbU51bSk7XHJcbiAgICAgICAgICAgIGl0ZW0yLnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuR2V0Q3J5c3RhbCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW0zID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuTG9uZ0ppbmcsIGRhdGEuR2V0Q3J5c3RhbCk7XHJcbiAgICAgICAgICAgIGl0ZW0zLnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuSXRlbUlkXzEgIT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtNCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YS5JdGVtSWRfMSwgZGF0YS5JdGVtTnVtXzEpO1xyXG4gICAgICAgICAgICBpdGVtNC5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLkl0ZW1JZF8yICE9IDApIHtcclxuICAgICAgICAgICAgaXRlbTUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGEuSXRlbUlkXzIsIGRhdGEuSXRlbU51bV8yKTtcclxuICAgICAgICAgICAgaXRlbTUuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5JdGVtSWRfMyAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW02ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShkYXRhLkl0ZW1JZF8zLCBkYXRhLkl0ZW1OdW1fMyk7XHJcbiAgICAgICAgICAgIGl0ZW02LnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRTY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChpdGVtMSkgY29udGVudC5hZGRDaGlsZChpdGVtMSk7XHJcbiAgICAgICAgaWYgKGl0ZW0yKSBjb250ZW50LmFkZENoaWxkKGl0ZW0yKTtcclxuICAgICAgICBpZiAoaXRlbTMpIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbTMpO1xyXG4gICAgICAgIGlmIChpdGVtNCkgY29udGVudC5hZGRDaGlsZChpdGVtNCk7XHJcbiAgICAgICAgaWYgKGl0ZW01KSBjb250ZW50LmFkZENoaWxkKGl0ZW01KTtcclxuICAgICAgICBpZiAoaXRlbTYpIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbTYpO1xyXG4gICAgICAgIGlmIChkYXRhLkFkUmV3YXJkID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZnJlZUJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsaW1pdFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpc1NvbGRPdXQgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgZGF0YS5HaWZ0SUQpIHx8IDA7XHJcbiAgICAgICAgICAgIGlzU29sZE91dCA9IE51bWJlcihpc1NvbGRPdXQpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxpbWl0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZShbXCIlXCIsIFwiflwiXSwgW2RhdGEuQWRQbGF5YWJsZVRpbWVzIC0gaXNTb2xkT3V0ICsgJycsIGRhdGEuQWRQbGF5YWJsZVRpbWVzICsgJyddKSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaXNTb2xkT3V0ID49IGRhdGEuQWRQbGF5YWJsZVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvbGRPdXQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZyZWVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsaW1pdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkN5Y2xlX0JnXzNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb2RPdXRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkN5Y2xlX0JnXzNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsb2RPdXRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v57qi54K5XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZyZWVCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc1NvbGRPdXQgPCBkYXRhLkFkUGxheWFibGVUaW1lcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJmcmVlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsaW1pdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBwYXlJbmZvID0gUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8oZGF0YS5Qcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gcGF5SW5mby5wcmljZSArIHBheUluZm8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0blwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBwYXlJbmZvLnByaWNlO1xyXG4gICAgICAgICAgICBsZXQgaXNTb2xkT3V0ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicGF5X2dpdF9iYWdfaXRlbV9cIiArIGRhdGEuR2lmdElEKSB8fCAwO1xyXG4gICAgICAgICAgICBpZiAoaXNTb2xkT3V0ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29sZE91dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ3ljbGVfQmdfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2xvZE91dFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ3ljbGVfQmdfM1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2xvZE91dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IG5vd1RpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAvLyBsZXQgZW5kVGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUobmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKSkuZ2V0VGltZSgpIC8gMTAwMCkgKyAoMjQgKiA2MCAqIDYwKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKG5vd1RpbWUgLSBlbmRUaW1lKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vd1RpbWU6bnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgZW5kVGltZTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLkdpZnRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbm93VGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkpLmdldFRpbWUoKSAvIDEwMDApICsgKDI0ICogNjAgKiA2MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IE1pbGxpc2Vjb25kc0FEYXkgPSAyNCAqIDYwICogNjBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldEhvdXJzKDAsIDAsIDAsIDApKS5nZXRUaW1lKCkgLyAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRGF5ID0gbmV3IERhdGUoKS5nZXREYXkoKSA9PT0gMCA/ICg3IC0gMSkgOiAobmV3IERhdGUoKS5nZXREYXkoKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtUaW1lU3RhbXAgPSB0aW1lc3RhbXAgLSBNaWxsaXNlY29uZHNBRGF5ICogd2Vla0RheVxyXG4gICAgICAgICAgICAgICAgICAgIG5vd1RpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gd2Vla1RpbWVTdGFtcCArIDI0KjYwKjYwICogNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoMSlcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVTdGFtcCA9IGRhdGUuZ2V0VGltZSgpIC8gMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgIG5vd1RpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gdGltZVN0YW1wICsgMjQqNjAqNjAgKiAzMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKGVuZFRpbWUgLSBub3dUaW1lKTtcclxuICAgICAgICB9LCAwLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9XHJcblxyXG4gICAgc29sZE91dChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbkNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2xkT3V0KG5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tCdXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5BZFJld2FyZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKChpc1RydWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1RydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTEsIGl0ZW0yLCBpdGVtMywgaXRlbTQsIGl0ZW01LCBpdGVtNjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLkdldENvaW5OdW0gIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sIHRoaXMuZGF0YS5HZXRDb2luTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5HZXRHZW1OdW0gIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSwgdGhpcy5kYXRhLkdldEdlbU51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuR2V0Q3J5c3RhbCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0zID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuTG9uZ0ppbmcsIHRoaXMuZGF0YS5HZXRDcnlzdGFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsTG9uZ0ppbmdOdW0odGhpcy5kYXRhLkdldENyeXN0YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLkl0ZW1JZF8xICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMuZGF0YS5JdGVtSWRfMSwgdGhpcy5kYXRhLkl0ZW1OdW1fMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuSXRlbUlkXzIgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtNSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5kYXRhLkl0ZW1JZF8yLCB0aGlzLmRhdGEuSXRlbU51bV8yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5JdGVtSWRfMyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW02ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLmRhdGEuSXRlbUlkXzMsIHRoaXMuZGF0YS5JdGVtTnVtXzMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkTGlzdDogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0xKSByZXdhcmRMaXN0LnB1c2goaXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtMikgcmV3YXJkTGlzdC5wdXNoKGl0ZW0yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTMpIHJld2FyZExpc3QucHVzaChpdGVtMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW00KSByZXdhcmRMaXN0LnB1c2goaXRlbTQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtNSkgcmV3YXJkTGlzdC5wdXNoKGl0ZW01KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTYpIHJld2FyZExpc3QucHVzaChpdGVtNik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHJld2FyZExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJld2FyZExpc3RbaV0uZ2V0Q29tcG9uZW50KFByb3ApKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZXdhcmRMaXN0W2ldLmdldENvbXBvbmVudChQcm9wKS5wcm9wX2lkLHJld2FyZExpc3RbaV0uZ2V0Q29tcG9uZW50KFByb3ApLnByb3BfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkTGlzdFtpXS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5lcXVpcF9pbmZvLmVxdWlwX2lkLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJld2FyZExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgdGhpcy5kYXRhLkdpZnRJRCkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgdGhpcy5kYXRhLkdpZnRJRCwgKytudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzd2l0Y2godGhpcy5kYXRhLkdpZnRJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNhc2UgMTAwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9HaWZ0X0RhaWx5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNhc2UgMjAwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9HaWZ0X1dlZWspXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2FzZSAzMDAxOntcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaG9wX0dpZnRfTW9udGgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfR2lmdClcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhdGEuR2lmdFRleHQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaXpVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5pel56S85YyFeOaho+eCueWHu+i0reS5sOasoeaVsCArIFwiQURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5kYXRhLkdpZnRUZXh0ID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlkahcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+WRqOekvOWMhXjmoaPngrnlh7votK3kubDmrKHmlbAgKyBcIkFEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmnIhcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aciOekvOWMhXjmoaPngrnlh7votK3kubDmrKHmlbAgKyBcIkFEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSwgVklERU9fVFlQRS5HZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogKChpc1BheTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1BheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTEsIGl0ZW0yLCBpdGVtMywgaXRlbTQsIGl0ZW01LCBpdGVtNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5HZXRDb2luTnVtICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbiwgdGhpcy5kYXRhLkdldENvaW5OdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuR2V0R2VtTnVtICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0yID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLCB0aGlzLmRhdGEuR2V0R2VtTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLkdldENyeXN0YWwgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTMgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Mb25nSmluZywgdGhpcy5kYXRhLkdldENyeXN0YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsTG9uZ0ppbmdOdW0odGhpcy5kYXRhLkdldENyeXN0YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuSXRlbUlkXzEgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMuZGF0YS5JdGVtSWRfMSwgdGhpcy5kYXRhLkl0ZW1OdW1fMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5JdGVtSWRfMiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtNSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5kYXRhLkl0ZW1JZF8yLCB0aGlzLmRhdGEuSXRlbU51bV8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLkl0ZW1JZF8zICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW02ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLmRhdGEuSXRlbUlkXzMsIHRoaXMuZGF0YS5JdGVtTnVtXzMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmRMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0xKSByZXdhcmRMaXN0LnB1c2goaXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTIpIHJld2FyZExpc3QucHVzaChpdGVtMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtMykgcmV3YXJkTGlzdC5wdXNoKGl0ZW0zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW00KSByZXdhcmRMaXN0LnB1c2goaXRlbTQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTUpIHJld2FyZExpc3QucHVzaChpdGVtNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtNikgcmV3YXJkTGlzdC5wdXNoKGl0ZW02KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHJld2FyZExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXdhcmRMaXN0W2ldLmdldENvbXBvbmVudChQcm9wKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZExpc3RbaV0uZ2V0Q29tcG9uZW50KFByb3ApLnByb3BfaWQscmV3YXJkTGlzdFtpXS5nZXRDb21wb25lbnQoUHJvcCkucHJvcF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZExpc3RbaV0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuZXF1aXBfaW5mby5lcXVpcF9pZCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChyZXdhcmRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInBheV9naXRfYmFnX2l0ZW1fXCIgKyB0aGlzLmRhdGEuR2lmdElEKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgdGhpcy5kYXRhLkdpZnRJRCwgKytudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5HaWZ0VGV4dCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaXpVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aXpeekvOWMhXjmoaPngrnlh7votK3kubDmrKHmlbAgKyB0aGlzLmRhdGEuR2lmdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5kYXRhLkdpZnRUZXh0ID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5ZGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5ZGo56S85YyFeOaho+eCueWHu+i0reS5sOasoeaVsCArIHRoaXMuZGF0YS5HaWZ0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaciFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aciOekvOWMhXjmoaPngrnlh7votK3kubDmrKHmlbAgKyB0aGlzLmRhdGEuR2lmdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcylcclxuICAgICAgICAgICAgfSwgdGhpcy5kYXRhLlByb2R1Y3RJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==