"use strict";
cc._RF.push(module, '1bd60gd70NK657y8lOe9AC7', 'VipUi');
// Scripts/UI/VipUi.ts

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
var VipManager_1 = require("../Ads/VipManager");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("./UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipUi = /** @class */ (function (_super) {
    __extends(VipUi, _super);
    function VipUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VipUi.prototype.start = function () {
        //翻译
        ApkManager_1.default.getInstance().showBanner();
        var richText = this.node.getChildByName('richText');
        richText.getComponent(cc.RichText).string = LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.DingYueTip);
        //设置价格和货币单位
        var textWeek = this.node.getChildByName('textWeek');
        var lm = LanguageManager_1.default.getInstance();
        if (VipManager_1.VipManager.dy_info.length > VipManager_1.DingYue_Type.Week) {
            textWeek.getComponent(cc.Label).string = lm.getString(LanguageConstants_1.LanguageIndex.Day3free_trial) + VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Week].price + ' ' + VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Week].currency + '/' + lm.getString(LanguageConstants_1.LanguageIndex.Week);
        }
        if (VipManager_1.VipManager.dy_info.length > VipManager_1.DingYue_Type.Month) {
            var textMonth = this.node.getChildByName('textMonth');
            textMonth.getComponent(cc.Label).string = VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Month].price + ' ' + VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Month].currency + '/' + lm.getString(LanguageConstants_1.LanguageIndex.Month);
        }
        if (VipManager_1.VipManager.dy_info.length > VipManager_1.DingYue_Type.Year) {
            var textYear = this.node.getChildByName('textYear');
            textYear.getComponent(cc.Label).string = VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Year].price + ' ' + VipManager_1.VipManager.dy_info[VipManager_1.DingYue_Type.Year].currency + '/' + lm.getString(LanguageConstants_1.LanguageIndex.Year);
        }
    };
    // showRemainTime()
    // {
    //     let timeLabel=this.node.getChildByName('timeLabel');
    //     let isVip=VipManager.getIsVip();
    //     if(isVip)
    //     {
    //         timeLabel.active=true;
    //         let totalDay=VipManager.getVipTotalDay();
    //         let curSec=new Date().getTime();
    //         let startSec=VipManager.getVipStartTime();
    //         let offsetSec=curSec-startSec;
    //         let totalSec=totalDay*24*60*60;
    //         if(offsetSec>=totalSec)
    //         {
    //             //VIP可能过期，需要请求谷歌
    //         }else
    //         {
    //         }
    //         let rDay=totalDay;
    //     }else
    //     {
    //         timeLabel.active=false;
    //     }
    // }
    VipUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    VipUi.prototype.clickBtnWeek = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.周卡点击玩家数);
        ApkManager_1.default.getInstance().showDingYue({ result: function (isSuc) {
                if (isSuc) {
                    VipManager_1.VipManager.saveVip(1);
                    VipManager_1.VipManager.saveVipFreeNum(5);
                    VipManager_1.VipManager.saveVipStartTime(VipManager_1.DingYue_Type.Week, VipManager_1.Vip_Type.A);
                }
            } }, VipManager_1.DingYue_Type.Week);
    };
    VipUi.prototype.clickBtnMon = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.月卡点击玩家数);
        ApkManager_1.default.getInstance().showDingYue({ result: function (isSuc) {
                if (isSuc) {
                    VipManager_1.VipManager.saveVip(1);
                    VipManager_1.VipManager.saveVipFreeNum(5);
                    VipManager_1.VipManager.saveVipStartTime(VipManager_1.DingYue_Type.Month, VipManager_1.Vip_Type.A);
                }
            } }, VipManager_1.DingYue_Type.Month);
    };
    VipUi.prototype.clickBtnYear = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.年卡点击玩家数);
        ApkManager_1.default.getInstance().showDingYue({ result: function (isSuc) {
                if (isSuc) {
                    VipManager_1.VipManager.saveVip(1);
                    VipManager_1.VipManager.saveVipFreeNum(5);
                    VipManager_1.VipManager.saveVipStartTime(VipManager_1.DingYue_Type.Year, VipManager_1.Vip_Type.A);
                }
            } }, VipManager_1.DingYue_Type.Year);
    };
    VipUi.prototype.clickBtnTiaoKuan = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        ApkManager_1.default.getInstance().showTiaoKuan();
    };
    VipUi = __decorate([
        ccclass
    ], VipUi);
    return VipUi;
}(UIComponent_1.default));
exports.default = VipUi;

cc._RF.pop();