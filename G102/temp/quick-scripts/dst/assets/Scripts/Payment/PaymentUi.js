
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PaymentUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a721dYAKK1AcKVO3JWoi85H', 'PaymentUi');
// Scripts/Payment/PaymentUi.ts

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
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var UIManager_1 = require("../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaymentUi = /** @class */ (function (_super) {
    __extends(PaymentUi, _super);
    function PaymentUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.all_ui = [];
        _this.cur_selected_index = 0;
        return _this;
    }
    PaymentUi_1 = PaymentUi;
    PaymentUi.prototype.onLoad = function () {
        PaymentUi_1._instance = this;
    };
    PaymentUi.prototype.onDestroy = function () {
        PaymentUi_1._instance = null;
    };
    PaymentUi.prototype.initData = function (showIndex) {
        this.cur_selected_index = showIndex;
    };
    PaymentUi.prototype.start = function () {
        this.adaptation();
        this.setBtnShow();
    };
    PaymentUi.prototype.adaptation = function () {
        var wp = cc.winSize;
        var bottom = this.node.getChildByName('bottom');
        bottom.y = -wp.height / 2;
        bottom.zIndex = 1;
        this.node.getChildByName('top').y = wp.height / 2;
        var rate = wp.height / wp.width;
        if (rate < 2) {
            this.node.getChildByName('premium_card').scale = rate - 1;
        }
    };
    PaymentUi.prototype.showIndex = function (index) {
        this.cur_selected_index = index;
        this.setBtnShow();
    };
    PaymentUi.prototype.setBtnShow = function () {
        var down = this.node.getChildByName('bottom');
        var content = down.getChildByName('btnScrollView').getComponent(cc.ScrollView).content;
        var textId = 0;
        for (var i = 0; i < 6; i++) {
            var btn = content.children[i];
            var btns = btn.getComponents(cc.Button);
            var isCanBtn = this.cur_selected_index != i;
            this.all_ui[i].active = !isCanBtn;
            if (!isCanBtn) {
                textId = btn.getChildByName('nameText').getComponent(TextLanguage_1.default).getTextId();
            }
            for (var n = 0; n < btns.length; n++) {
                btns[n].interactable = isCanBtn;
            }
        }
        //标题名称
        var top = this.node.getChildByName('top');
        top.getChildByName('titleText').getComponent(TextLanguage_1.default).setTextId(textId);
        if (this.cur_selected_index == 0 || this.cur_selected_index == 5) {
            this.node.getChildByName("top").getChildByName("btnHelp").active = true;
        }
        else {
            this.node.getChildByName("top").getChildByName("btnHelp").active = false;
        }
        //titleText.setTextId()
    };
    PaymentUi.prototype.clickBtnBottom = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        switch (index) {
            case 0:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_尊享卡页签点击次数);
                break;
            case 1:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_龙晶充值页签点击次数);
                break;
            case 2:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_热卖礼包签点击次数);
                break;
            case 3:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_通关返利签点击次数);
                break;
            case 4:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_累计充值页签点击次数);
                break;
            case 5:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_战令页签点击次数);
                break;
        }
        if (this.cur_selected_index != index) {
            this.cur_selected_index = index;
            this.setBtnShow();
        }
    };
    PaymentUi.prototype.clickBtnHelp = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.cur_selected_index == 0) {
            UIManager_1.UIManager.getInstance().showHelpTipsUi(null, 100003, [1400201, 1400202, 1400203]);
        }
        else if (this.cur_selected_index == 5) {
            UIManager_1.UIManager.getInstance().showHelpTipsUi(null, 100003, [1450004, 1450005, 1450006]);
        }
    };
    PaymentUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop);
        _super.prototype.onClose.call(this);
    };
    var PaymentUi_1;
    PaymentUi._instance = null;
    __decorate([
        property([cc.Node])
    ], PaymentUi.prototype, "all_ui", void 0);
    PaymentUi = PaymentUi_1 = __decorate([
        ccclass
    ], PaymentUi);
    return PaymentUi;
}(UIComponent_1.default));
exports.default = PaymentUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5bWVudFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELDhEQUF5RDtBQUN6RCwwREFBcUQ7QUFDckQsc0RBQW1GO0FBQ25GLGlEQUE0QztBQUM1Qyw2Q0FBNEM7QUFHdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUFxSEM7UUFoSEcsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQix3QkFBa0IsR0FBUSxDQUFDLENBQUM7O0lBOEdoQyxDQUFDO2tCQXJIb0IsU0FBUztJQVUxQiwwQkFBTSxHQUFOO1FBQ0ksV0FBUyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVTLDZCQUFTLEdBQW5CO1FBQ0ksV0FBUyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxTQUFnQjtRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUMsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sOEJBQVUsR0FBbEI7UUFFSSxJQUFJLEVBQUUsR0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENB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QUM7WUFDM0IscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRjthQUFLLElBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsRUFBQztZQUNsQyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQywyQkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9FLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7O0lBakhNLG1CQUFTLEdBQVcsSUFBSSxDQUFDO0lBR2hDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDOzZDQUNBO0lBTEgsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXFIN0I7SUFBRCxnQkFBQztDQXJIRCxBQXFIQyxDQXJIc0MscUJBQVcsR0FxSGpEO2tCQXJIb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5bWVudFVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBfaW5zdGFuY2U6UGF5bWVudFVpPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIGFsbF91aTpjYy5Ob2RlW109W107XHJcblxyXG4gICAgY3VyX3NlbGVjdGVkX2luZGV4Om51bWJlcj0wO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIFBheW1lbnRVaS5faW5zdGFuY2U9dGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIFBheW1lbnRVaS5faW5zdGFuY2U9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RGF0YShzaG93SW5kZXg6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1zaG93SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHdwPWNjLndpblNpemU7XHJcbiAgICAgICAgbGV0IGJvdHRvbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpO1xyXG4gICAgICAgIGJvdHRvbS55PS13cC5oZWlnaHQvMjtcclxuICAgICAgICBib3R0b20uekluZGV4PTE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3AnKS55PXdwLmhlaWdodC8yO1xyXG4gICAgICAgIGxldCByYXRlPXdwLmhlaWdodC93cC53aWR0aDtcclxuICAgICAgICBpZihyYXRlPDIpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3ByZW1pdW1fY2FyZCcpLnNjYWxlPXJhdGUtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0luZGV4KGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9aW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuU2hvdygpe1xyXG4gICAgICAgIGxldCBkb3duPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJyk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9ZG93bi5nZXRDaGlsZEJ5TmFtZSgnYnRuU2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGxldCB0ZXh0SWQ6bnVtYmVyfG51bWJlcltdPTA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8NjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ0bj1jb250ZW50LmNoaWxkcmVuW2ldOyAgIFxyXG4gICAgICAgICAgICBsZXQgYnRucz1idG4uZ2V0Q29tcG9uZW50cyhjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW5CdG49dGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXghPWk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3VpW2ldLmFjdGl2ZT0haXNDYW5CdG47XHJcbiAgICAgICAgICAgIGlmKCFpc0NhbkJ0bil7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9YnRuLmdldENoaWxkQnlOYW1lKCduYW1lVGV4dCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLmdldFRleHRJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGJ0bnMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgYnRuc1tuXS5pbnRlcmFjdGFibGU9aXNDYW5CdG47XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/moIfpopjlkI3np7BcclxuICAgICAgICBsZXQgdG9wPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG9wJylcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlVGV4dCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh0ZXh0SWQpOyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPT0gMCB8fCB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9PSA1KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuSGVscFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5IZWxwXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RpdGxlVGV4dC5zZXRUZXh0SWQoKVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQm90dG9tKGJ0bixpbmRleFN0cjpzdHJpbmcpeyAgICAgICAgXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXg9cGFyc2VJbnQoaW5kZXhTdHIpO1xyXG4gICAgICAgIHN3aXRjaChpbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f5bCK5Lqr5Y2h6aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f6b6Z5pm25YWF5YC86aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f54Ot5Y2W56S85YyF562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f6YCa5YWz6L+U5Yip562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f57Sv6K6h5YWF5YC86aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7llYbln45f5oiY5Luk6aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4IT1pbmRleCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5IZWxwKGUpe1xyXG4gICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID09IDApe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93SGVscFRpcHNVaShudWxsLDEwMDAwMyxbMTQwMDIwMSwxNDAwMjAyLDE0MDAyMDNdKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9PSA1KXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0hlbHBUaXBzVWkobnVsbCwxMDAwMDMsWzE0NTAwMDQsMTQ1MDAwNSwxNDUwMDA2XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaG9wKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==