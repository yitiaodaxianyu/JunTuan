
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/MonthCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d69aLgwV9NiI7995oAxyfW', 'MonthCard');
// Scripts/Payment/MonthCard.ts

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
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var PrivilegedCardInformation_1 = require("./Data/PrivilegedCardInformation");
var DingYueManager_1 = require("./DingYueManager");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonthCard = /** @class */ (function (_super) {
    __extends(MonthCard, _super);
    function MonthCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.car_id = 1001;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    MonthCard.prototype.start = function () {
        this.initUi();
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.ZuXiang);
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
    };
    MonthCard.prototype.initUi = function () {
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
        item1.scale = 0.9;
        this.node.getChildByName('dailyRoot').addChild(item1);
        //累计
        var item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, totalNum);
        item2.scale = 0.9;
        this.node.getChildByName('totalRoot').addChild(item2);
        this.showBtnState();
    };
    MonthCard.prototype.getParametersStr = function (id, parameter) {
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
    MonthCard.prototype.showBtnState = function () {
        //按钮
        var btnGet = this.node.getChildByName('btnGet');
        var btnBuy = this.node.getChildByName('btnBuy');
        //let info=DingYueManager.getInstance().getMonthCardInfo();
        //收益
        var shouyiText = this.node.getChildByName('shouyiText').getComponent(TextLanguage_1.default);
        shouyiText.setReplaceValue('~', "50%");
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
    MonthCard.prototype.clickBtnBuy = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.月卡点击购买次数);
        ApkManager_1.default.getInstance().showDingYue({
            result: function (isDy) {
                if (isDy) {
                    PayManager_1.PayManager.getInstance().addPayNum(PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getProductId(_this.car_id));
                    var num = PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getGetDiamondsNowNum(_this.car_id);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, num);
                    GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, num), null);
                    //DingYueManager.getInstance().getMonthCardInfo().is_buy=true;
                    //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZunXiang);
                    ActivityManager_1.ActivityManager.getInstance().changeTicket(ActivityManager_1.ActivityType.Endless, 1);
                    ActivityManager_1.ActivityManager.getInstance().changeTicket(ActivityManager_1.ActivityType.Boss, 1);
                    _this.initUi();
                }
            }
        }, PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getProductId(this.car_id));
    };
    MonthCard.prototype.clickBtnGet = function () {
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
    MonthCard = __decorate([
        ccclass
    ], MonthCard);
    return MonthCard;
}(cc.Component));
exports.default = MonthCard;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcTW9udGhDYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUE0RTtBQUM1RSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0QsOERBQXlEO0FBQ3pELGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELHVEQUFvRTtBQUVwRSw4RUFBb0Y7QUFDcEYsbURBQWtEO0FBQ2xELDJDQUEwQztBQUdwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQW9JQztRQWxJRyxZQUFNLEdBQVEsSUFBSSxDQUFDOztRQWlJbkIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoSUcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCwwRkFBMEY7SUFDOUYsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDSSxJQUFJLFFBQVEsR0FBQyw0REFBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUcsSUFBSSxNQUFNLEdBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLElBQUksUUFBUSxHQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQztRQUNqRCxJQUFJLFFBQVEsR0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUM7UUFDNUMsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FB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R0FBRyxHQUFDLDREQUFnQyxDQUFDLFdBQVcsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNwRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsMEZBQTBGO1NBQzdGO0lBQ0wsQ0FBQztJQWpJZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW9JN0I7SUFBRCxnQkFBQztDQXBJRCxBQW9JQyxDQXBJc0MsRUFBRSxDQUFDLFNBQVMsR0FvSWxEO2tCQXBJb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2aXR5TWFuYWdlciwgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0FjdGl2aXR5TWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IERpbmdZdWVfVHlwZSwgUGF5VWlJbmRleCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuL0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aENhcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNhcl9pZDpudW1iZXI9MTAwMTtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG9kYXlTaG93KFBheVVpSW5kZXguWnVYaWFuZyk7XHJcbiAgICAgICAgLy9FdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9adW5YaWFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKCl7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPVByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb24odGhpcy5jYXJfaWQpO1xyXG4gICAgICAgIGxldCBub3dHZW09anNvbkRhdGEuR2V0RGlhbW9uZHNOb3dOdW07XHJcbiAgICAgICAgbGV0IGRhaWx5TnVtPWpzb25EYXRhLlJlY2VpdmVEaWFtb25kc0V2ZXJ5RGF5TnVtO1xyXG4gICAgICAgIGxldCB0b3RhbE51bT1qc29uRGF0YS5DdW11bGF0aXZlR2V0RGlhbW9uZHM7XHJcbiAgICAgICAgbGV0IHRlcXVhbklkcz1qc29uRGF0YS5HYWluUHJpdmlsZWdlcztcclxuICAgICAgICBsZXQgcGFyYW1ldGVycz1qc29uRGF0YS5Qcml2aWxlZ2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgIGxldCB0ZXh0SWRzPWpzb25EYXRhLlByaXZpbGVnZVRleHQ7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0ZXh0U2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRleHRJZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdGV4dD1jb250ZW50LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZXh0LnNldFByZWZpeCh0ZXF1YW5JZHNbaV0rJy4gJyk7XHJcbiAgICAgICAgICAgIHRleHQuc2V0VGV4dElkKHRleHRJZHNbaV0pO1xyXG4gICAgICAgICAgICB0ZXh0LnNldFJlcGxhY2VWYWx1ZSgnficsdGhpcy5nZXRQYXJhbWV0ZXJzU3RyKHRlcXVhbklkc1tpXSxwYXJhbWV0ZXJzW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v56uL5Y2z6I635b6XXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdub3dOdW1MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPScnK25vd0dlbTtcclxuICAgICAgICAvL+avj+aXpeiOt+W+l1xyXG4gICAgICAgIGxldCBpdGVtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sZGFpbHlOdW0pO1xyXG4gICAgICAgIGl0ZW0xLnNjYWxlPTAuOTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RhaWx5Um9vdCcpLmFkZENoaWxkKGl0ZW0xKTtcclxuICAgICAgICAvL+e0r+iuoVxyXG4gICAgICAgIGxldCBpdGVtMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdG90YWxOdW0pXHJcbiAgICAgICAgaXRlbTIuc2NhbGU9MC45O1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG90YWxSb290JykuYWRkQ2hpbGQoaXRlbTIpO1xyXG4gICAgICAgIHRoaXMuc2hvd0J0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFyYW1ldGVyc1N0cihpZDpudW1iZXIscGFyYW1ldGVyOm51bWJlcik6c3RyaW5neyAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKGlkKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGFyYW1ldGVyKjEwMCkrJyUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyKycnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyKycnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBhcmFtZXRlcioxMDApKyclJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXIrJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0J0blN0YXRlKCl7XHJcbiAgICAgICAgLy/mjInpkq5cclxuICAgICAgICBsZXQgYnRuR2V0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuR2V0Jyk7XHJcbiAgICAgICAgbGV0IGJ0bkJ1eT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkJ1eScpO1xyXG4gICAgICAgIC8vbGV0IGluZm89RGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb250aENhcmRJbmZvKCk7XHJcbiAgICAgICAgLy/mlLbnm4pcclxuICAgICAgICBsZXQgc2hvdXlpVGV4dD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Nob3V5aVRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICBzaG91eWlUZXh0LnNldFJlcGxhY2VWYWx1ZSgnficsXCI1MCVcIik7XHJcbiAgICAgICAgLy/mloflrZdcclxuICAgICAgICBsZXQgc3RhdGVUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3RhdGVUZXh0JykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgLy8gaWYoaW5mby5pc19idXkpe1xyXG4gICAgICAgIC8vICAgICBidG5CdXkuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICBidG5HZXQuYWN0aXZlPXRydWU7IFxyXG4gICAgICAgIC8vICAgICBzdGF0ZVRleHQuc2V0VGV4dElkKDE0MDAwMDkpO1xyXG4gICAgICAgIC8vICAgICBsZXQgYnRuPWJ0bkdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAvLyAgICAgbGV0IGdldFRleHQ9YnRuR2V0LmdldENoaWxkQnlOYW1lKCdnZXRUZXh0JykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBsYWJlbE91dGxpbmU9Z2V0VGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKTtcclxuICAgICAgICAvLyAgICAgaWYoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb2RheUlzR2V0KHRoaXMuY2FyX2lkKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBnZXRUZXh0LnNldFRleHRJZCgxMDAwMTMpO1xyXG4gICAgICAgIC8vICAgICAgICAgYnRuLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIGxhYmVsT3V0bGluZS5jb2xvcj1jYy5jb2xvcig1NCw1NCw1NCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgZ2V0VGV4dC5zZXRUZXh0SWQoMTAwMDExKTtcclxuICAgICAgICAvLyAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgIGxhYmVsT3V0bGluZS5jb2xvcj1jYy5jb2xvcig5OSw2MSwxMCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgLy/nuqLngrlcclxuICAgICAgICAvLyAgICAgbGV0IHJlZD1idG5HZXQuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpO1xyXG4gICAgICAgIC8vICAgICByZWQuYWN0aXZlPWJ0bi5pbnRlcmFjdGFibGU7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGJ0bkJ1eS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgYnRuR2V0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAvLyAgICAgc3RhdGVUZXh0LnNldFRleHRJZCgxNDAwMDA1KTtcclxuICAgICAgICAvLyAgICAgYnRuQnV5LmdldENoaWxkQnlOYW1lKCdwcmljZUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9aW5mby5wcmljZStpbmZvLmN1cnJlbmN5O1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkJ1eSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaciOWNoeeCueWHu+i0reS5sOasoeaVsCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaW5nWXVlKHtcclxuICAgICAgICAgICAgcmVzdWx0Oihpc0R5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgICAgICBpZihpc0R5KXtcclxuICAgICAgICAgICAgICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGF5TnVtKFByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvZHVjdElkKHRoaXMuY2FyX2lkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdldERpYW1vbmRzTm93TnVtKHRoaXMuY2FyX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sbnVtKSxudWxsKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb250aENhcmRJbmZvKCkuaXNfYnV5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9adW5YaWFuZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQWN0aXZpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlVGlja2V0KEFjdGl2aXR5VHlwZS5FbmRsZXNzLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVRpY2tldChBY3Rpdml0eVR5cGUuQm9zcywxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb2R1Y3RJZCh0aGlzLmNhcl9pZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR2V0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZighRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb2RheUlzR2V0KHRoaXMuY2FyX2lkKSl7XHJcbiAgICAgICAgICAgIERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRvZGF5R2V0KHRoaXMuY2FyX2lkLHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgbnVtPVByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVjZWl2ZURpYW1vbmRzRXZlcnlEYXlOdW0odGhpcy5jYXJfaWQpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxudW0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLG51bSksbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0J0blN0YXRlKCk7XHJcbiAgICAgICAgICAgIC8vRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfWnVuWGlhbmcpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19