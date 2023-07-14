"use strict";
cc._RF.push(module, '70513JESFVDkpCm5Thi1X8w', 'PayAccumulateChargeUi');
// Scripts/Payment/PayAccumulateChargeUi.ts

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
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var CumulativeRecharge_1 = require("./Data/CumulativeRecharge");
var PayAccumulateChargeItem_1 = require("./PayAccumulateChargeItem");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayAccumulateChargeUi = /** @class */ (function (_super) {
    __extends(PayAccumulateChargeUi, _super);
    function PayAccumulateChargeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.common_ui = null;
        return _this;
    }
    PayAccumulateChargeUi.prototype.onEnable = function () {
        this.refreshUi();
    };
    PayAccumulateChargeUi.prototype.start = function () {
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.Total);
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Total);
        this.adaptation();
    };
    PayAccumulateChargeUi.prototype.adaptation = function () {
        var bottomNode = this.node.parent.getChildByName('bottom');
        var bottomHeight = bottomNode.height;
        var bottomY = bottomNode.y;
        var topNode = this.node.parent.getChildByName('top');
        var topHeight = topNode.height;
        var topY = topNode.y;
        var height = ((topY - topHeight) - (bottomY + bottomHeight));
        var centerY = (topY - topHeight - height / 2);
        var scrollView = this.node.getChildByName('itemScroll');
        scrollView.height = height - this.node.getChildByName("Recharge_Bg_1").height;
        scrollView.y = centerY - 120;
        var tempPos = this.node.getChildByName("Recharge_Bg_1").y - this.node.getChildByName("tipLab").y;
        scrollView.getChildByName('view').height = height - this.node.getChildByName("Recharge_Bg_1").height;
        this.node.getChildByName("Recharge_Bg_1").y = topNode.y - (topNode.height + this.node.getChildByName("Recharge_Bg_1").height / 2);
        this.node.getChildByName("tipLab").y = this.node.getChildByName("Recharge_Bg_1").y - tempPos;
    };
    PayAccumulateChargeUi.prototype.refreshUi = function () {
        var _this = this;
        var data = CumulativeRecharge_1.CumulativeRechargeManager.getInstance().getData();
        var content = this.node.getChildByName("itemScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        data.forEach(function (v, k) {
            var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            // if(state == 0){
            //     if(PayManager.getInstance().getTotalLongJingNum() > v.CumulativeRechargePrice){
            //         PayManager.getInstance().setTotalLongJingGetState(v.CumulativeRechargeID,1);
            //     }
            // }
            var item = cc.instantiate(_this.item);
            item.getComponent(PayAccumulateChargeItem_1.default).initData(v);
            if (state == 2) {
                var Itemcontent = item.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
                Itemcontent.children.forEach(function (v, k) {
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = _this.common_ui.getSpriteFrame("Common_Checkmark");
                    var mask = new cc.Node();
                    mask.addComponent(cc.Sprite).spriteFrame = _this.common_ui.getSpriteFrame("Item_frame_ZheZhao");
                    mask.opacity = 150;
                    mask.setParent(v);
                    gou.setParent(v);
                });
            }
            content.addChild(item);
            item.setSiblingIndex(0);
        });
        var maxData = CumulativeRecharge_1.CumulativeRechargeManager.getInstance().getJsonCumulativeRecharge(CumulativeRecharge_1.CumulativeRechargeManager.getMaxCumulativeRechargeID());
        this.node.getChildByName("Recharge_Bg_1").removeAllChildren();
        this.node.getChildByName("tipLab").getComponent(TextLanguage_1.default).setReplaceValue('~', maxData.CumulativeRechargePrice + '');
        // let reward = PropManager.getInstance().createPropItem(70021,1);
        // reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
        // reward.y = 30;
        if (PayManager_1.PayManager.getInstance().getTotalLongJingNum() >= maxData.CumulativeRechargePrice) {
            if (cc.sys.localStorage.getItem("pay_accumulate_charge_final") == null) {
                var reward = PropManager_1.PropManager.getInstance().createPropItem(70021, 1, PropConfig_1.PropAction.Null);
                reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
                reward.y = 30;
                var btn = reward.getComponent(cc.Button);
                btn.interactable = true;
                var clickEvent = new cc.Component.EventHandler();
                clickEvent.target = this.node;
                clickEvent.component = 'PayAccumulateChargeUi';
                clickEvent.handler = 'onClickReward';
                // clickEvent.customEventData=enemyType+'';
                btn.clickEvents.push(clickEvent);
            }
            else {
                var reward = PropManager_1.PropManager.getInstance().createPropItem(70021, 1, PropConfig_1.PropAction.Null);
                reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Common_Checkmark");
                var mask = new cc.Node();
                mask.addComponent(cc.Sprite).spriteFrame = this.common_ui.getSpriteFrame("Item_frame_ZheZhao");
                mask.setParent(reward);
                mask.opacity = 150;
                gou.setParent(reward);
                reward.y = 30;
            }
        }
        else {
            var reward = PropManager_1.PropManager.getInstance().createPropItem(70021, 1);
            reward.setParent(this.node.getChildByName("Recharge_Bg_1"));
            reward.y = 30;
        }
    };
    PayAccumulateChargeUi.prototype.onClickReward = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var reward = PropManager_1.PropManager.getInstance().createPropItem(70021, 1);
        PropManager_1.PropManager.getInstance().changePropNum(70021, 1);
        cc.sys.localStorage.setItem("pay_accumulate_charge_final", 1);
        GameManager_1.default.getInstance().showGetTip(reward, (function () {
            _this.refreshUi();
        }).bind(this));
    };
    __decorate([
        property(cc.Prefab)
    ], PayAccumulateChargeUi.prototype, "item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], PayAccumulateChargeUi.prototype, "common_ui", void 0);
    PayAccumulateChargeUi = __decorate([
        ccclass
    ], PayAccumulateChargeUi);
    return PayAccumulateChargeUi;
}(cc.Component));
exports.default = PayAccumulateChargeUi;

cc._RF.pop();