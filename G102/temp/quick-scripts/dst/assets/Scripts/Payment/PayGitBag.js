
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayGitBag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88874PCV/FBQ4aBbRVLJ9up', 'PayGitBag');
// Scripts/Payment/PayGitBag.ts

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
var CyclePack_1 = require("./Data/CyclePack");
var AudioConstants_1 = require("../Sound/AudioConstants");
var PayGitBagItem_1 = require("./PayGitBagItem");
var PayManager_1 = require("./PayManager");
var EventManager_1 = require("../Tools/EventManager");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GitState;
(function (GitState) {
    GitState[GitState["Day"] = 1] = "Day";
    GitState[GitState["Week"] = 2] = "Week";
    GitState[GitState["Month"] = 3] = "Month";
})(GitState || (GitState = {}));
var PayGitBag = /** @class */ (function (_super) {
    __extends(PayGitBag, _super);
    function PayGitBag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.git_state = GitState.Day;
        _this.git_bag_item = null;
        _this.pay_git_bag_ui = null;
        return _this;
    }
    PayGitBag.prototype.onEnable = function () {
        this.adaptation();
        this.refreshUI();
    };
    PayGitBag.prototype.adaptation = function () {
        var bottomNode = this.node.parent.getChildByName('bottom');
        var bottomHeight = bottomNode.height;
        var bottomY = bottomNode.y;
        var topNode = this.node.parent.getChildByName('top');
        var topHeight = topNode.height;
        var topY = topNode.y;
        var height = ((topY - topHeight) - (bottomY + bottomHeight));
        var centerY = (topY - topHeight - height / 2);
        var scrollView = this.node.getChildByName('itemScroll');
        scrollView.height = height;
        scrollView.y = centerY - 120;
        scrollView.getChildByName('view').height = height;
        this.node.getChildByName("top").y = topNode.y - (topNode.height / 2 + this.node.getChildByName("top").height);
    };
    PayGitBag.prototype.start = function () {
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.Gift);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_Gift);
    };
    PayGitBag.prototype.refreshUI = function () {
        var _this = this;
        for (var i = 1; i <= 3; i++) {
            var btn = this.node.getChildByName("top").getChildByName("btn" + i);
            if (i == this.git_state) {
                btn.getComponents(cc.Button).forEach(function (v, k) {
                    v.interactable = false;
                });
            }
            else {
                btn.getComponents(cc.Button).forEach(function (v, k) {
                    v.interactable = true;
                });
            }
        }
        var content = this.node.getChildByName("itemScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var dataList = [];
        dataList = CyclePack_1.CyclePackManager.getInstance().getDataByType(this.git_state);
        dataList.forEach(function (v, k) {
            var item = cc.instantiate(_this.git_bag_item);
            item.getComponent(PayGitBagItem_1.default).initData(v);
            if (v.GiftText == 1) {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Day");
            }
            else if (v.GiftText == 2) {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Week");
            }
            else {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Month");
            }
            content.addChild(item);
        });
    };
    PayGitBag.prototype.onBtnClick = function (e, index) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        index = Number(index);
        if (index == 1) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日礼包页签展示次数);
        }
        else if (index == 2) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每周礼包页签展示次数);
        }
        else {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每月礼包页签展示次数);
        }
        if (this.git_state != index) {
            this.git_state = index;
            this.refreshUI();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PayGitBag.prototype, "git_bag_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], PayGitBag.prototype, "pay_git_bag_ui", void 0);
    PayGitBag = __decorate([
        ccclass
    ], PayGitBag);
    return PayGitBag;
}(cc.Component));
exports.default = PayGitBag;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5R2l0QmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyw4Q0FBbUU7QUFDbkUsMERBQXFEO0FBQ3JELGlEQUE0QztBQUM1QywyQ0FBMEM7QUFDMUMsc0RBQW1GO0FBQ25GLHVEQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBRXpELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHFDQUFPLENBQUE7SUFDUCx1Q0FBSSxDQUFBO0lBQ0oseUNBQUssQ0FBQTtBQUNULENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBR0Q7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUF1RkM7UUFyRlcsZUFBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFHakMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFFOUIsb0JBQWMsR0FBa0IsSUFBSSxDQUFDOztJQWdGekMsQ0FBQztJQTlFYSw0QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLDhCQUFVLEdBQWxCO1FBRUksSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksWUFBWSxHQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxPQUFPLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENB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QUMsVUFBVSxDQUFDLENBQUM7U0FDbkU7YUFBSTtZQUNELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkU7UUFDRCxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsS0FBSyxFQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUE5RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3FEQUNZO0lBUHBCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F1RjdCO0lBQUQsZ0JBQUM7Q0F2RkQsQUF1RkMsQ0F2RnNDLEVBQUUsQ0FBQyxTQUFTLEdBdUZsRDtrQkF2Rm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN5Y2xlUGFja01hbmFnZXIsIEpzb25DeWNsZVBhY2sgfSBmcm9tIFwiLi9EYXRhL0N5Y2xlUGFja1wiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBQYXlHaXRCYWdJdGVtIGZyb20gXCIuL1BheUdpdEJhZ0l0ZW1cIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlVaUluZGV4IH0gZnJvbSBcIi4uL3RoaXJkUGFydHkvVGhpcmRQYXJ0eVwiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBHaXRTdGF0ZSB7XHJcbiAgICBEYXkgPSAxLFxyXG4gICAgV2VlayxcclxuICAgIE1vbnRoXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUdpdEJhZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBnaXRfc3RhdGUgPSBHaXRTdGF0ZS5EYXk7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGdpdF9iYWdfaXRlbTpjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgcGF5X2dpdF9iYWdfdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgYm90dG9tTm9kZT10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdib3R0b20nKTtcclxuICAgICAgICBsZXQgYm90dG9tSGVpZ2h0PWJvdHRvbU5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBib3R0b21ZPWJvdHRvbU5vZGUueTsgICAgICAgIFxyXG4gICAgICAgIGxldCB0b3BOb2RlPXRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpXHJcbiAgICAgICAgbGV0IHRvcEhlaWdodD10b3BOb2RlLmhlaWdodDtcclxuICAgICAgICBsZXQgdG9wWT10b3BOb2RlLnk7XHJcbiAgICAgICAgbGV0IGhlaWdodD0oKHRvcFktdG9wSGVpZ2h0KS0oYm90dG9tWStib3R0b21IZWlnaHQpKTtcclxuICAgICAgICBsZXQgY2VudGVyWT0odG9wWS10b3BIZWlnaHQtaGVpZ2h0LzIpO1xyXG4gICAgICAgIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaXRlbVNjcm9sbCcpO1xyXG4gICAgICAgIHNjcm9sbFZpZXcuaGVpZ2h0PWhlaWdodDtcclxuICAgICAgICBzY3JvbGxWaWV3Lnk9Y2VudGVyWSAtIDEyMDtcclxuICAgICAgICBzY3JvbGxWaWV3LmdldENoaWxkQnlOYW1lKCd2aWV3JykuaGVpZ2h0PWhlaWdodDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikueSA9IHRvcE5vZGUueSAtICh0b3BOb2RlLmhlaWdodC8yICsgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb2RheVNob3coUGF5VWlJbmRleC5HaWZ0KTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9HaWZ0KTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVUkoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIiArIGkpO1xyXG4gICAgICAgICAgICBpZihpID09IHRoaXMuZ2l0X3N0YXRlKXtcclxuICAgICAgICAgICAgICAgIGJ0bi5nZXRDb21wb25lbnRzKGNjLkJ1dHRvbikuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgICAgICAgICB2LmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudHMoY2MuQnV0dG9uKS5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1TY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBkYXRhTGlzdDpKc29uQ3ljbGVQYWNrW10gPSBbXTtcclxuICAgICAgICBkYXRhTGlzdCA9IEN5Y2xlUGFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhQnlUeXBlKHRoaXMuZ2l0X3N0YXRlKTtcclxuICAgICAgICBkYXRhTGlzdC5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdpdF9iYWdfaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBheUdpdEJhZ0l0ZW0pLmluaXREYXRhKHYpO1xyXG4gICAgICAgICAgICBpZih2LkdpZnRUZXh0ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIkN5Y2xlX0JnX0RheVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGF5X2dpdF9iYWdfdWkuZ2V0U3ByaXRlRnJhbWUoXCJDeWNsZV9CZ19EYXlcIik7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHYuR2lmdFRleHQgPT0gMil7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiQ3ljbGVfQmdfRGF5XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wYXlfZ2l0X2JhZ191aS5nZXRTcHJpdGVGcmFtZShcIkN5Y2xlX0JnX1dlZWtcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIkN5Y2xlX0JnX0RheVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGF5X2dpdF9iYWdfdWkuZ2V0U3ByaXRlRnJhbWUoXCJDeWNsZV9CZ19Nb250aFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuQ2xpY2soZSxpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaW5kZXg9TnVtYmVyKGluZGV4KTtcclxuICAgICAgICBpZihpbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aXpeekvOWMhemhteetvuWxleekuuasoeaVsCk7XHJcbiAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gMil7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mr4/lkajnpLzljIXpobXnrb7lsZXnpLrmrKHmlbApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5pyI56S85YyF6aG1562+5bGV56S65qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5naXRfc3RhdGUhPWluZGV4KXtcclxuICAgICAgICAgICAgdGhpcy5naXRfc3RhdGU9aW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVJKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iXX0=