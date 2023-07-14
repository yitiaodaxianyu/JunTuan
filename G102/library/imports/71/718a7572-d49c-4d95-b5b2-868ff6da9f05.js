"use strict";
cc._RF.push(module, '718a7Vy1JxNlbWyho/22p8F', 'PayAccumulateChargeItem');
// Scripts/Payment/PayAccumulateChargeItem.ts

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
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var PayAccumulateChargeUi_1 = require("./PayAccumulateChargeUi");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayAccumulateChargeItem = /** @class */ (function (_super) {
    __extends(PayAccumulateChargeItem, _super);
    function PayAccumulateChargeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        return _this;
    }
    PayAccumulateChargeItem.prototype.initData = function (data) {
        this.data = data;
        var item1, item2, item3, item4, item5;
        if (data.GetCoin != 0) {
            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, data.GetCoin);
            item1.scale = 0.85;
        }
        if (data.GetGem != 0) {
            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, data.GetGem);
            item2.scale = 0.85;
        }
        if (data.Item1_ID != 0) {
            item3 = PropManager_1.PropManager.getInstance().createPropItem(data.Item1_ID, data.Item1_Num);
            item3.scale = 0.85;
        }
        if (data.Item2_ID != 0) {
            item4 = PropManager_1.PropManager.getInstance().createPropItem(data.Item2_ID, data.Item2_Num);
            item4.scale = 0.85;
        }
        if (data.Item3_ID != 0) {
            item5 = PropManager_1.PropManager.getInstance().createPropItem(data.Item3_ID, data.Item3_Num);
            item5.scale = 0.85;
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
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(data.CumulativeRechargeID);
        if (state != 0) {
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(-108, 62));
            if (state == 1) {
                this.node.getChildByName("rewardBtn").active = true;
                this.node.getChildByName("rewardBtn1").active = false;
            }
            else {
                this.node.getChildByName("rewardBtn1").active = true;
                this.node.getChildByName("rewardBtn").active = false;
            }
        }
        else {
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(0, 62));
        }
        this.node.getChildByName("Label1").getComponent(TextLanguage_1.default).setTextId(1420001);
        this.node.getChildByName("Label1").getComponent(TextLanguage_1.default).setReplaceValue("~", data.CumulativeRechargePrice + "");
        this.node.getChildByName("num").getComponent(cc.Label).string = PayManager_1.PayManager.getInstance().getTotalLongJingNum() + "/" + data.CumulativeRechargePrice;
        this.node.getChildByName("Task_Bar_0").getComponent(cc.ProgressBar).progress = PayManager_1.PayManager.getInstance().getTotalLongJingNum() / data.CumulativeRechargePrice;
    };
    PayAccumulateChargeItem.prototype.onClickRewardBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每一档累充奖励领取人数 + this.data.CumulativeRechargePrice);
        var item1, item2, item3, item4, item5;
        var rewardList = [];
        if (this.data.GetCoin != 0) {
            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, this.data.GetCoin);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, this.data.GetCoin);
            item1.scale = 0.85;
        }
        if (this.data.GetGem != 0) {
            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, this.data.GetGem);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, this.data.GetGem);
            item2.scale = 0.85;
        }
        if (this.data.Item1_ID != 0) {
            item3 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item1_ID, this.data.Item1_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item1_ID, this.data.Item1_Num);
            item3.scale = 0.85;
        }
        if (this.data.Item2_ID != 0) {
            item4 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item2_ID, this.data.Item2_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item2_ID, this.data.Item2_Num);
            item4.scale = 0.85;
        }
        if (this.data.Item3_ID != 0) {
            item5 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item3_ID, this.data.Item3_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item3_ID, this.data.Item3_Num);
            item5.scale = 0.85;
        }
        PayManager_1.PayManager.getInstance().setTotalLongJingGetState(this.data.CumulativeRechargeID, 2);
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
        GameManager_1.default.getInstance().showMultipleGetTip(rewardList, (function () {
            _this.node.parent.parent.parent.parent.getComponent(PayAccumulateChargeUi_1.default).refreshUi();
        }));
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Total);
    };
    PayAccumulateChargeItem = __decorate([
        ccclass
    ], PayAccumulateChargeItem);
    return PayAccumulateChargeItem;
}(cc.Component));
exports.default = PayAccumulateChargeItem;

cc._RF.pop();