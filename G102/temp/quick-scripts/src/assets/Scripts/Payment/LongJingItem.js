"use strict";
cc._RF.push(module, '40dc3pVO2dN7I7ntRazh0TS', 'LongJingItem');
// Scripts/Payment/LongJingItem.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LongJingItem = /** @class */ (function (_super) {
    __extends(LongJingItem, _super);
    function LongJingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.longjing_data = null;
        _this.longjing_ts = null;
        return _this;
        // update (dt) {}
    }
    LongJingItem.prototype.start = function () {
        var numText = this.node.getChildByName('numText').getComponent(TextLanguage_1.default);
        numText.setReplaceValue("~", (this.longjing_data.CrystalQuantity) + ' ');
        //价格,需要转换
        var priceLabel = this.node.getChildByName('priceLabel').getComponent(cc.Label);
        var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(this.longjing_data.ProductId);
        // priceLabel.string=payInfo.price+payInfo.currency;
        priceLabel.string = payInfo.price;
        //item
        var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.LongJing, this.longjing_data.CrystalQuantity, PropConfig_1.PropAction.Look);
        this.node.addChild(item);
        item.y = 88;
        this.refresh();
    };
    LongJingItem.prototype.init = function (longjingData, longjingTs) {
        //龙晶数量
        this.longjing_data = longjingData;
        this.longjing_ts = longjingTs;
    };
    LongJingItem.prototype.refresh = function () {
        //首次充值文本
        var first = this.node.getChildByName('first');
        if (PayManager_1.PayManager.getInstance().getPayNum(this.longjing_data.ProductId) <= 0) {
            var firstText = first.getChildByName('firstText').getComponent(TextLanguage_1.default);
            firstText.setReplaceValue("~", '' + this.longjing_data.DiamondsQuality);
            first.active = true;
        }
        else {
            first.active = false;
        }
    };
    LongJingItem.prototype.onClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x龙晶点击购买次数 + this.longjing_data.CrystalQuantity);
        ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                if (isPay) {
                    var PM = PropManager_1.PropManager.getInstance();
                    var itemList = new Array();
                    if (PayManager_1.PayManager.getInstance().getPayNum(_this.longjing_data.ProductId) <= 0) {
                        PM.changePropNum(PropConfig_1.PropId.Gem, _this.longjing_data.DiamondsQuality);
                        itemList.push(PM.createPropItem(PropConfig_1.PropId.Gem, _this.longjing_data.DiamondsQuality));
                    }
                    PayManager_1.PayManager.getInstance().addPayNum(_this.longjing_data.ProductId);
                    PayManager_1.PayManager.getInstance().addTotalLongJingNum(_this.longjing_data.CrystalQuantity);
                    PM.changePropNum(PropConfig_1.PropId.LongJing, _this.longjing_data.CrystalQuantity);
                    itemList.push(PM.createPropItem(PropConfig_1.PropId.LongJing, _this.longjing_data.CrystalQuantity));
                    GameManager_1.default.getInstance().showMultipleGetTip(itemList);
                    _this.refresh();
                    _this.longjing_ts.refreshTotalItem();
                    //红点检测一下
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_LongJing);
                    GameManager_1.default.getInstance().refreshLongJingShow();
                }
            } }, this.longjing_data.ProductId);
    };
    LongJingItem = __decorate([
        ccclass
    ], LongJingItem);
    return LongJingItem;
}(cc.Component));
exports.default = LongJingItem;

cc._RF.pop();