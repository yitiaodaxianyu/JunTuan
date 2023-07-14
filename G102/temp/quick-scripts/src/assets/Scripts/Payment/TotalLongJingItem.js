"use strict";
cc._RF.push(module, 'feb63e/3EhPrp+1yLDpMTqI', 'TotalLongJingItem');
// Scripts/Payment/TotalLongJingItem.ts

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
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var CumulativeRecharge_1 = require("./Data/CumulativeRecharge");
var PayManager_1 = require("./PayManager");
var PaymentUi_1 = require("./PaymentUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TotalLongJingItem = /** @class */ (function (_super) {
    __extends(TotalLongJingItem, _super);
    function TotalLongJingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.total_id = 0;
        return _this;
    }
    TotalLongJingItem.prototype.onEnable = function () {
        this.init();
    };
    TotalLongJingItem.prototype.init = function () {
        this.refreshReward();
        this.refreshBtn();
    };
    TotalLongJingItem.prototype.refreshReward = function () {
        var _this = this;
        var totalNum = PayManager_1.PayManager.getInstance().getTotalLongJingNum();
        var CRM = CumulativeRecharge_1.CumulativeRechargeManager.getInstance();
        var data = CRM.getData();
        var isHaveNoGet = false;
        data.forEach(function (v, k) {
            var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            if (!isHaveNoGet && state == 1) {
                isHaveNoGet = true;
                _this.total_id = v.CumulativeRechargeID;
            }
        });
        if (isHaveNoGet == false) {
            this.total_id = CRM.getId(totalNum);
            if (this.total_id == 0) {
                this.node.removeFromParent();
                return;
            }
        }
        //奖励列表
        var itemContent = this.node.getChildByName('itemScrollView').getComponent(cc.ScrollView).content;
        itemContent.removeAllChildren();
        var rewardDatas = CRM.getRewardData(this.total_id);
        for (var i = 0; i < rewardDatas.length; i++) {
            var rewardData = rewardDatas[i];
            var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
            itemContent.addChild(item);
        }
        //进度条
        var targetTotal = CRM.getCumulativeRechargePrice(this.total_id);
        this.node.getChildByName('numLabel').getComponent(cc.Label).string = totalNum + '/' + targetTotal;
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = totalNum / targetTotal;
        //翻译
        var numText = this.node.getChildByName('numText').getComponent(TextLanguage_1.default);
        numText.setReplaceValue('~', '' + targetTotal);
    };
    TotalLongJingItem.prototype.refreshBtn = function () {
        //按钮
        var btnGet = this.node.getChildByName('btnGet').getComponent(cc.Button);
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(this.total_id);
        if (state == 1) {
            btnGet.interactable = true;
        }
        else {
            btnGet.interactable = false;
        }
        var red = btnGet.node.getChildByName('red');
        red.active = btnGet.interactable;
    };
    TotalLongJingItem.prototype.onClickGet = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(this.total_id);
        if (state == 1) {
            PayManager_1.PayManager.getInstance().setTotalLongJingGetState(this.total_id, 2);
            var rewardDatas = CumulativeRecharge_1.CumulativeRechargeManager.getInstance().getRewardData(this.total_id);
            var itemList = new Array();
            for (var i = 0; i < rewardDatas.length; i++) {
                var rewardData = rewardDatas[i];
                var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
                PropManager_1.PropManager.getInstance().changePropNum(rewardData.reward_id, rewardData.reward_num);
                itemList.push(item);
            }
            GameManager_1.default.getInstance().showMultipleGetTip(itemList);
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_LongJing);
            this.init();
        }
    };
    TotalLongJingItem.prototype.onClickBtnMore = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //显示累计充值界面
        PaymentUi_1.default._instance.showIndex(4);
    };
    TotalLongJingItem = __decorate([
        ccclass
    ], TotalLongJingItem);
    return TotalLongJingItem;
}(cc.Component));
exports.default = TotalLongJingItem;

cc._RF.pop();