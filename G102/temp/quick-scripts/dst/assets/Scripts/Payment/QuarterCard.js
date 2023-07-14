
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/QuarterCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUXVhcnRlckNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTRFO0FBQzVFLGdEQUEyQztBQUUzQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCw4REFBeUQ7QUFDekQsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFFckQsOEVBQW9GO0FBQ3BGLG1EQUFrRDtBQUNsRCwyQ0FBMEM7QUFHcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUErSUM7UUE3SUcsWUFBTSxHQUFRLElBQUksQ0FBQzs7SUE2SXZCLENBQUM7SUEzSUcsMkJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLElBQUksUUFBUSxHQUFDLDREQUFnQyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRyxJQUFJLE1BQU0sR0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsSUFBSSxRQUFRLEdBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDO1FBQ2pELElBQUksUUFBUSxHQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQztRQUM1QyxJQUFJLFNBQVMsR0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QyxJQUFJLE9BQU8sR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFD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aW1wb3J0IHsgQWN0aXZpdHlNYW5hZ2VyLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQWN0aXZpdHlNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlX1R5cGUgfSBmcm9tIFwiLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1ByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi9EaW5nWXVlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5TWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhcnRlckNhcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNhcl9pZDpudW1iZXI9MjAwMTtcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBqc29uRGF0YT1Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uKHRoaXMuY2FyX2lkKTtcclxuICAgICAgICBsZXQgbm93R2VtPWpzb25EYXRhLkdldERpYW1vbmRzTm93TnVtO1xyXG4gICAgICAgIGxldCBkYWlseU51bT1qc29uRGF0YS5SZWNlaXZlRGlhbW9uZHNFdmVyeURheU51bTtcclxuICAgICAgICBsZXQgdG90YWxOdW09anNvbkRhdGEuQ3VtdWxhdGl2ZUdldERpYW1vbmRzO1xyXG4gICAgICAgIGxldCB0ZXF1YW5JZHM9anNvbkRhdGEuR2FpblByaXZpbGVnZXM7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlcnM9anNvbkRhdGEuUHJpdmlsZWdlUGFyYW1ldGVycztcclxuICAgICAgICBsZXQgdGV4dElkcz1qc29uRGF0YS5Qcml2aWxlZ2VUZXh0O1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGV4dFNjcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0ZXh0SWRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRleHQ9Y29udGVudC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGV4dC5zZXRQcmVmaXgodGVxdWFuSWRzW2ldKycuICcpO1xyXG4gICAgICAgICAgICB0ZXh0LnNldFRleHRJZCh0ZXh0SWRzW2ldKTtcclxuICAgICAgICAgICAgdGV4dC5zZXRSZXBsYWNlVmFsdWUoJ34nLHRoaXMuZ2V0UGFyYW1ldGVyc1N0cih0ZXF1YW5JZHNbaV0scGFyYW1ldGVyc1tpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eri+WNs+iOt+W+l1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbm93TnVtTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytub3dHZW07XHJcbiAgICAgICAgLy/mr4/ml6XojrflvpdcclxuICAgICAgICBsZXQgaXRlbTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLGRhaWx5TnVtKTtcclxuICAgICAgICBpdGVtMS5zY2FsZT0wLjg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdkYWlseVJvb3QnKS5hZGRDaGlsZChpdGVtMSk7XHJcbiAgICAgICAgLy/ntK/orqFcclxuICAgICAgICBsZXQgaXRlbTI9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHRvdGFsTnVtKVxyXG4gICAgICAgIGl0ZW0yLnNjYWxlPTAuODtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdGFsUm9vdCcpLmFkZENoaWxkKGl0ZW0yKTtcclxuICAgICAgICAvL2xldCBpbmZvPURpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhcnRlckNhcmRJbmZvKCk7XHJcbiAgICAgICAgLy/mjInpkq5cclxuICAgICAgICBsZXQgYnRuR2V0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuR2V0Jyk7XHJcbiAgICAgICAgbGV0IGJ0bkJ1eT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkJ1eScpOyAgICAgICAgXHJcbiAgICAgICAgLy/mlLbnm4pcclxuICAgICAgICBsZXQgc2hvdXlpVGV4dD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Nob3V5aVRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICBzaG91eWlUZXh0LnNldFJlcGxhY2VWYWx1ZSgnficsXCI1MCVcIik7XHJcbiAgICAgICAgLy/mloflrZdcclxuICAgICAgICBsZXQgc3RhdGVUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3RhdGVUZXh0JykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgLy8gaWYoaW5mby5pc19idXkpe1xyXG4gICAgICAgIC8vICAgICBidG5CdXkuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICBidG5HZXQuYWN0aXZlPXRydWU7IFxyXG4gICAgICAgIC8vICAgICBzdGF0ZVRleHQuc2V0VGV4dElkKDE0MDAwMDkpO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBidG5CdXkuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgLy8gICAgIGJ0bkdldC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHN0YXRlVGV4dC5zZXRUZXh0SWQoMTQwMDAwNSk7XHJcbiAgICAgICAgLy8gICAgIGJ0bkJ1eS5nZXRDaGlsZEJ5TmFtZSgncHJpY2VMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWluZm8ucHJpY2UraW5mby5jdXJyZW5jeTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zaG93QnRuU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXJhbWV0ZXJzU3RyKGlkOm51bWJlcixwYXJhbWV0ZXI6bnVtYmVyKTpzdHJpbmd7ICAgICAgICBcclxuICAgICAgICBzd2l0Y2goaWQpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYXJhbWV0ZXIqMTAwKSsnJSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXIrJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXIrJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGFyYW1ldGVyKjEwMCkrJyUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtZXRlcisnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93QnRuU3RhdGUoKXtcclxuICAgICAgICAvL+aMiemSrlxyXG4gICAgICAgIGxldCBidG5HZXQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5HZXQnKTtcclxuICAgICAgICBsZXQgYnRuQnV5PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuQnV5Jyk7XHJcbiAgICAgICAgLy9sZXQgaW5mbz1EaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YXJ0ZXJDYXJkSW5mbygpO1xyXG4gICAgICAgIC8v5pS255uKXHJcbiAgICAgICAgbGV0IHNob3V5aVRleHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaG91eWlUZXh0JykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgc2hvdXlpVGV4dC5zZXRSZXBsYWNlVmFsdWUoJ34nLFwiNTAwJVwiKTtcclxuICAgICAgICAvL+aWh+Wtl1xyXG4gICAgICAgIGxldCBzdGF0ZVRleHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzdGF0ZVRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICAvLyBpZihpbmZvLmlzX2J1eSl7XHJcbiAgICAgICAgLy8gICAgIGJ0bkJ1eS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIGJ0bkdldC5hY3RpdmU9dHJ1ZTsgXHJcbiAgICAgICAgLy8gICAgIHN0YXRlVGV4dC5zZXRUZXh0SWQoMTQwMDAwOSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBidG49YnRuR2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIC8vICAgICBsZXQgZ2V0VGV4dD1idG5HZXQuZ2V0Q2hpbGRCeU5hbWUoJ2dldFRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICAvLyAgICAgbGV0IGxhYmVsT3V0bGluZT1nZXRUZXh0LmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpO1xyXG4gICAgICAgIC8vICAgICBpZihEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvZGF5SXNHZXQodGhpcy5jYXJfaWQpKXtcclxuICAgICAgICAvLyAgICAgICAgIGdldFRleHQuc2V0VGV4dElkKDEwMDAxMyk7XHJcbiAgICAgICAgLy8gICAgICAgICBidG4uaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgbGFiZWxPdXRsaW5lLmNvbG9yPWNjLmNvbG9yKDU0LDU0LDU0KTtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBnZXRUZXh0LnNldFRleHRJZCgxMDAwMTEpO1xyXG4gICAgICAgIC8vICAgICAgICAgYnRuLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgbGFiZWxPdXRsaW5lLmNvbG9yPWNjLmNvbG9yKDk5LDYxLDEwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICAvL+e6oueCuVxyXG4gICAgICAgIC8vICAgICBsZXQgcmVkPWJ0bkdldC5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgLy8gICAgIHJlZC5hY3RpdmU9YnRuLmludGVyYWN0YWJsZTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgYnRuQnV5LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIC8vICAgICBidG5HZXQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICBzdGF0ZVRleHQuc2V0VGV4dElkKDE0MDAwMDUpO1xyXG4gICAgICAgIC8vICAgICBidG5CdXkuZ2V0Q2hpbGRCeU5hbWUoJ3ByaWNlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1pbmZvLnByaWNlK2luZm8uY3VycmVuY3k7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQnV5KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a2j5Y2h54K55Ye76LSt5Lmw5qyh5pWwKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0RpbmdZdWUoe1xyXG4gICAgICAgICAgICByZXN1bHQ6KGlzRHk6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzRHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0oUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9kdWN0SWQodGhpcy5jYXJfaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtPVByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2V0RGlhbW9uZHNOb3dOdW0odGhpcy5jYXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9EaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YXJ0ZXJDYXJkSW5mbygpLmlzX2J1eT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sbnVtKSxudWxsKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfWnVuWGlhbmdfUXVhcnRlckNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVRpY2tldChBY3Rpdml0eVR5cGUuRW5kbGVzcywyKTtcclxuICAgICAgICAgICAgICAgICAgICBBY3Rpdml0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VUaWNrZXQoQWN0aXZpdHlUeXBlLkJvc3MsMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9kdWN0SWQodGhpcy5jYXJfaWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdldCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIURpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VG9kYXlJc0dldCh0aGlzLmNhcl9pZCkpe1xyXG4gICAgICAgICAgICBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUb2RheUdldCh0aGlzLmNhcl9pZCx0cnVlKTtcclxuICAgICAgICAgICAgbGV0IG51bT1Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJlY2VpdmVEaWFtb25kc0V2ZXJ5RGF5TnVtKHRoaXMuY2FyX2lkKTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sbnVtKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxudW0pLG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dCdG5TdGF0ZSgpO1xyXG4gICAgICAgICAgICAvL0V2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaG9wX1p1blhpYW5nKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=