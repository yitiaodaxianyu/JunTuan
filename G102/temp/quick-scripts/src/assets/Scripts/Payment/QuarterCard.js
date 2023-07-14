"use strict";
cc._RF.push(module, '3b7a1/QAfdAPK5FZzMgTGH+', 'QuarterCard');
// Scripts/Payment/QuarterCard.ts

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
var ActivityManager_1 = require("../Activity/ActivityManager");
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var PrivilegedCardInformation_1 = require("./Data/PrivilegedCardInformation");
var DingYueManager_1 = require("./DingYueManager");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var QuarterCard = /** @class */ (function (_super) {
    __extends(QuarterCard, _super);
    function QuarterCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.car_id = 2001;
        return _this;
    }
    QuarterCard.prototype.start = function () {
        this.initUi();
    };
    QuarterCard.prototype.initUi = function () {
        var jsonData = PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getJsonPrivilegedCardInformation(this.car_id);
        var nowGem = jsonData.GetDiamondsNowNum;
        var dailyNum = jsonData.ReceiveDiamondsEveryDayNum;
        var totalNum = jsonData.CumulativeGetDiamonds;
        var tequanIds = jsonData.GainPrivileges;
        var parameters = jsonData.PrivilegeParameters;
        var textIds = jsonData.PrivilegeText;
        var content = this.node.getChildByName('textScrollView').getComponent(cc.ScrollView).content;
        for (var i = 0; i < textIds.length; i++) {
            var text = content.children[i].getComponent(TextLanguage_1.default);
            text.setPrefix(tequanIds[i] + '. ');
            text.setTextId(textIds[i]);
            text.setReplaceValue('~', this.getParametersStr(tequanIds[i], parameters[i]));
        }
        //立即获得
        this.node.getChildByName('nowNumLabel').getComponent(cc.Label).string = '' + nowGem;
        //每日获得
        var item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, dailyNum);
        item1.scale = 0.8;
        this.node.getChildByName('dailyRoot').addChild(item1);
        //累计
        var item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, totalNum);
        item2.scale = 0.8;
        this.node.getChildByName('totalRoot').addChild(item2);
        //let info=DingYueManager.getInstance().getQuarterCardInfo();
        //按钮
        var btnGet = this.node.getChildByName('btnGet');
        var btnBuy = this.node.getChildByName('btnBuy');
        //收益
        var shouyiText = this.node.getChildByName('shouyiText').getComponent(TextLanguage_1.default);
        shouyiText.setReplaceValue('~', "50%");
        //文字
        var stateText = this.node.getChildByName('stateText').getComponent(TextLanguage_1.default);
        // if(info.is_buy){
        //     btnBuy.active=false;
        //     btnGet.active=true; 
        //     stateText.setTextId(1400009);
        // }else{
        //     btnBuy.active=true;
        //     btnGet.active=false;
        //     stateText.setTextId(1400005);
        //     btnBuy.getChildByName('priceLabel').getComponent(cc.Label).string=info.price+info.currency;
        // }
        this.showBtnState();
    };
    QuarterCard.prototype.getParametersStr = function (id, parameter) {
        switch (id) {
            case 1: {
                return (parameter * 100) + '%';
            }
            case 2: {
                return parameter + '';
            }
            case 3: {
                return parameter + '';
            }
            case 4: {
                return (parameter * 100) + '%';
            }
            default: {
                return parameter + '';
            }
        }
    };
    QuarterCard.prototype.showBtnState = function () {
        //按钮
        var btnGet = this.node.getChildByName('btnGet');
        var btnBuy = this.node.getChildByName('btnBuy');
        //let info=DingYueManager.getInstance().getQuarterCardInfo();
        //收益
        var shouyiText = this.node.getChildByName('shouyiText').getComponent(TextLanguage_1.default);
        shouyiText.setReplaceValue('~', "500%");
        //文字
        var stateText = this.node.getChildByName('stateText').getComponent(TextLanguage_1.default);
        // if(info.is_buy){
        //     btnBuy.active=false;
        //     btnGet.active=true; 
        //     stateText.setTextId(1400009);
        //     let btn=btnGet.getComponent(cc.Button);
        //     let getText=btnGet.getChildByName('getText').getComponent(TextLanguage);
        //     let labelOutline=getText.getComponent(cc.LabelOutline);
        //     if(DingYueManager.getInstance().getTodayIsGet(this.car_id)){
        //         getText.setTextId(100013);
        //         btn.interactable=false;
        //         labelOutline.color=cc.color(54,54,54);
        //     }else{
        //         getText.setTextId(100011);
        //         btn.interactable=true;
        //         labelOutline.color=cc.color(99,61,10);
        //     }
        //     //红点
        //     let red=btnGet.getChildByName('red');
        //     red.active=btn.interactable;
        // }else{
        //     btnBuy.active=true;
        //     btnGet.active=false;
        //     stateText.setTextId(1400005);
        //     btnBuy.getChildByName('priceLabel').getComponent(cc.Label).string=info.price+info.currency;
        // }
    };
    QuarterCard.prototype.clickBtnBuy = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.季卡点击购买次数);
        ApkManager_1.default.getInstance().showDingYue({
            result: function (isDy) {
                if (isDy) {
                    PayManager_1.PayManager.getInstance().addPayNum(PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getProductId(_this.car_id));
                    var num = PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getGetDiamondsNowNum(_this.car_id);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, num);
                    //DingYueManager.getInstance().getQuarterCardInfo().is_buy=true;
                    GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, num), null);
                    //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang_QuarterCard);
                    ActivityManager_1.ActivityManager.getInstance().changeTicket(ActivityManager_1.ActivityType.Endless, 2);
                    ActivityManager_1.ActivityManager.getInstance().changeTicket(ActivityManager_1.ActivityType.Boss, 2);
                    _this.initUi();
                }
            }
        }, PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getProductId(this.car_id));
    };
    QuarterCard.prototype.clickBtnGet = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (!DingYueManager_1.DingYueManager.getInstance().getTodayIsGet(this.car_id)) {
            DingYueManager_1.DingYueManager.getInstance().saveTodayGet(this.car_id, true);
            var num = PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getReceiveDiamondsEveryDayNum(this.car_id);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, num);
            GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, num), null);
            this.showBtnState();
            //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
        }
    };
    QuarterCard = __decorate([
        ccclass
    ], QuarterCard);
    return QuarterCard;
}(cc.Component));
exports.default = QuarterCard;

cc._RF.pop();