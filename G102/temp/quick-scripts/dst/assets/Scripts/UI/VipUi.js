
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/VipUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFZpcFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyxnREFBdUU7QUFDdkUsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsd0VBQW1FO0FBQ25FLG9FQUErRDtBQUMvRCwwREFBcUQ7QUFDckQsNkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1DLHlCQUFXO0lBQTlDOztJQTZHQSxDQUFDO0lBM0dHLHFCQUFLLEdBQUw7UUFDSSxJQUFJO1FBQ0osb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUNBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RyxXQUFXO1FBQ1gsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFHLHVCQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyx5QkFBWSxDQUFDLElBQUksRUFDOUM7WUFDSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxpQ0FBYSxDQUFDLGNBQWMsQ0FBQyxHQUFDLHVCQUFVLENB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LENBQUMsZ0JBQWdCLENBQUMseUJBQVksQ0FBQyxJQUFJLEVBQUMscUJBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7WUFFTCxDQUFDLEVBQUMsRUFBQyx5QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBZ0IsR0FBaEI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUE1R2dCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0E2R3pCO0lBQUQsWUFBQztDQTdHRCxBQTZHQyxDQTdHa0MscUJBQVcsR0E2RzdDO2tCQTdHb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlX1R5cGUsIFZpcE1hbmFnZXIsIFZpcF9UeXBlIH0gZnJvbSBcIi4uL0Fkcy9WaXBNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4vVUlDb21wb25lbnRcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcFVpIGV4dGVuZHMgVUlDb21wb25lbnQgeyAgICBcclxuICAgIFxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8v57+76K+RXHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCYW5uZXIoKTtcclxuICAgICAgICBsZXQgcmljaFRleHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyaWNoVGV4dCcpO1xyXG4gICAgICAgIHJpY2hUZXh0LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkRpbmdZdWVUaXApO1xyXG4gICAgICAgIC8v6K6+572u5Lu35qC85ZKM6LSn5biB5Y2V5L2NXHJcbiAgICAgICAgbGV0IHRleHRXZWVrPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGV4dFdlZWsnKTtcclxuICAgICAgICBsZXQgbG09TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5keV9pbmZvLmxlbmd0aD5EaW5nWXVlX1R5cGUuV2VlaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXZWVrLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkRheTNmcmVlX3RyaWFsKStWaXBNYW5hZ2VyLmR5X2luZm9bRGluZ1l1ZV9UeXBlLldlZWtdLnByaWNlKycgJytWaXBNYW5hZ2VyLmR5X2luZm9bRGluZ1l1ZV9UeXBlLldlZWtdLmN1cnJlbmN5KycvJytsbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5XZWVrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5keV9pbmZvLmxlbmd0aD5EaW5nWXVlX1R5cGUuTW9udGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdGV4dE1vbnRoPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGV4dE1vbnRoJyk7XHJcbiAgICAgICAgICAgIHRleHRNb250aC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1WaXBNYW5hZ2VyLmR5X2luZm9bRGluZ1l1ZV9UeXBlLk1vbnRoXS5wcmljZSsnICcrVmlwTWFuYWdlci5keV9pbmZvW0RpbmdZdWVfVHlwZS5Nb250aF0uY3VycmVuY3krJy8nK2xtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lk1vbnRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5keV9pbmZvLmxlbmd0aD5EaW5nWXVlX1R5cGUuWWVhcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0WWVhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RleHRZZWFyJyk7XHJcbiAgICAgICAgICAgIHRleHRZZWFyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVZpcE1hbmFnZXIuZHlfaW5mb1tEaW5nWXVlX1R5cGUuWWVhcl0ucHJpY2UrJyAnK1ZpcE1hbmFnZXIuZHlfaW5mb1tEaW5nWXVlX1R5cGUuWWVhcl0uY3VycmVuY3krJy8nK2xtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlllYXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93UmVtYWluVGltZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHRpbWVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWVMYWJlbCcpO1xyXG4gICAgLy8gICAgIGxldCBpc1ZpcD1WaXBNYW5hZ2VyLmdldElzVmlwKCk7XHJcbiAgICAvLyAgICAgaWYoaXNWaXApXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aW1lTGFiZWwuYWN0aXZlPXRydWU7XHJcbiAgICAvLyAgICAgICAgIGxldCB0b3RhbERheT1WaXBNYW5hZ2VyLmdldFZpcFRvdGFsRGF5KCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBjdXJTZWM9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBzdGFydFNlYz1WaXBNYW5hZ2VyLmdldFZpcFN0YXJ0VGltZSgpO1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0U2VjPWN1clNlYy1zdGFydFNlYztcclxuICAgIC8vICAgICAgICAgbGV0IHRvdGFsU2VjPXRvdGFsRGF5KjI0KjYwKjYwO1xyXG4gICAgLy8gICAgICAgICBpZihvZmZzZXRTZWM+PXRvdGFsU2VjKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL1ZJUOWPr+iDvei/h+acn++8jOmcgOimgeivt+axguiwt+atjFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH1lbHNlXHJcbiAgICAvLyAgICAgICAgIHtcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgbGV0IHJEYXk9dG90YWxEYXk7XHJcbiAgICAvLyAgICAgfWVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRpbWVMYWJlbC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBjbGlja0J0bldlZWsoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWRqOWNoeeCueWHu+eOqeWutuaVsCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaW5nWXVlKHtyZXN1bHQ6KGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgIGlmKGlzU3VjKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWaXBNYW5hZ2VyLnNhdmVWaXAoMSk7XHJcbiAgICAgICAgICAgICAgICBWaXBNYW5hZ2VyLnNhdmVWaXBGcmVlTnVtKDUpO1xyXG4gICAgICAgICAgICAgICAgVmlwTWFuYWdlci5zYXZlVmlwU3RhcnRUaW1lKERpbmdZdWVfVHlwZS5XZWVrLFZpcF9UeXBlLkEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfX0sRGluZ1l1ZV9UeXBlLldlZWspOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Nb24oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaciOWNoeeCueWHu+eOqeWutuaVsCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaW5nWXVlKHtyZXN1bHQ6KGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgIGlmKGlzU3VjKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWaXBNYW5hZ2VyLnNhdmVWaXAoMSk7XHJcbiAgICAgICAgICAgICAgICBWaXBNYW5hZ2VyLnNhdmVWaXBGcmVlTnVtKDUpO1xyXG4gICAgICAgICAgICAgICAgVmlwTWFuYWdlci5zYXZlVmlwU3RhcnRUaW1lKERpbmdZdWVfVHlwZS5Nb250aCxWaXBfVHlwZS5BKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9fSxEaW5nWXVlX1R5cGUuTW9udGgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5ZZWFyKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lubTljaHngrnlh7vnjqnlrrbmlbApO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGluZ1l1ZSh7cmVzdWx0Oihpc1N1Yzpib29sZWFuKT0+e1xyXG4gICAgICAgICAgICBpZihpc1N1YylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmlwTWFuYWdlci5zYXZlVmlwKDEpO1xyXG4gICAgICAgICAgICAgICAgVmlwTWFuYWdlci5zYXZlVmlwRnJlZU51bSg1KTtcclxuICAgICAgICAgICAgICAgIFZpcE1hbmFnZXIuc2F2ZVZpcFN0YXJ0VGltZShEaW5nWXVlX1R5cGUuWWVhcixWaXBfVHlwZS5BKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9fSxEaW5nWXVlX1R5cGUuWWVhcik7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRpYW9LdWFuKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VGlhb0t1YW4oKTtcclxuICAgIH1cclxufVxyXG4iXX0=