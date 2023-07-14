"use strict";
cc._RF.push(module, '6d22av3ac1BWLqh/voWp9OK', 'AccumulatedRechargeUi');
// Scripts/AccumulatedRecharge/AccumulatedRechargeUi.ts

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
var Item_1 = require("../Prop/Data/Item");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var AccumulatedRechargeItem_1 = require("./AccumulatedRechargeItem");
var CumulativeRecharges_1 = require("./CumulativeRecharges");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccumulatedRechargeUi = /** @class */ (function (_super) {
    __extends(AccumulatedRechargeUi, _super);
    function AccumulatedRechargeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accumulated_recharge_ui = null;
        return _this;
    }
    AccumulatedRechargeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        this.refreshUi();
    };
    AccumulatedRechargeUi.prototype.refreshUi = function () {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var data = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().rewardMap;
        if (content.childrenCount == 0) {
            var rewardList_1 = new Map();
            data.forEach(function (v, k) {
                var message = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                if (rewardList_1.has(message.Item1_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item1_ID) != 3) {
                    rewardList_1.set(message.Item1_ID, message.Item1_Num);
                }
                else if (rewardList_1.has(message.Item1_ID) == true) {
                    var num = rewardList_1.get(message.Item1_ID) + message.Item1_Num;
                    rewardList_1.set(message.Item1_ID, num);
                }
                if (rewardList_1.has(message.Item2_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item2_ID) != 3) {
                    rewardList_1.set(message.Item2_ID, message.Item2_Num);
                }
                else if (rewardList_1.has(message.Item2_ID) == true) {
                    var num = rewardList_1.get(message.Item2_ID) + message.Item2_Num;
                    rewardList_1.set(message.Item2_ID, num);
                }
                if (rewardList_1.has(message.Item3_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item3_ID) != 3) {
                    rewardList_1.set(message.Item3_ID, message.Item3_Num);
                }
                else if (rewardList_1.has(message.Item3_ID) == true) {
                    var num = rewardList_1.get(message.Item3_ID) + message.Item3_Num;
                    rewardList_1.set(message.Item3_ID, num);
                }
                var item = cc.instantiate(_this.accumulated_recharge_ui);
                item.name = "item" + message.CumulativeRechargeID;
                if (v == 0) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initGoingItem(message);
                }
                else if (v == 1) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initFinishItem(message);
                }
                else {
                    item.getComponent(AccumulatedRechargeItem_1.default).initReceivedItem(message);
                }
                content.addChild(item);
            });
            var itemRoot_1 = this.node.getChildByName("itemRoot");
            rewardList_1.forEach(function (v, k) {
                var item = PropManager_1.PropManager.getInstance().createPropItem(k, v);
                item.scale = 0.75;
                itemRoot_1.addChild(item);
            });
        }
        else {
            data.forEach(function (v, k) {
                var message = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                var item = content.getChildByName("item" + message.CumulativeRechargeID);
                if (v == 0) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initGoingItem(message);
                }
                else if (v == 1) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initFinishItem(message);
                }
                else {
                    item.getComponent(AccumulatedRechargeItem_1.default).initReceivedItem(message);
                }
            });
        }
    };
    AccumulatedRechargeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    AccumulatedRechargeUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_LeiChong);
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], AccumulatedRechargeUi.prototype, "accumulated_recharge_ui", void 0);
    AccumulatedRechargeUi = __decorate([
        ccclass
    ], AccumulatedRechargeUi);
    return AccumulatedRechargeUi;
}(UIComponent_1.default));
exports.default = AccumulatedRechargeUi;

cc._RF.pop();