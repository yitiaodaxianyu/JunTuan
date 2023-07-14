
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayAccumulateChargeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5QWNjdW11bGF0ZUNoYXJnZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyw4REFBeUQ7QUFDekQsaURBQWdEO0FBQ2hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsdURBQXNEO0FBRXRELGdFQUE4RjtBQUM5RixxRUFBZ0U7QUFDaEUsMkNBQTBDO0FBRXBDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1ELHlDQUFZO0lBQS9EO1FBQUEscUVBZ0hDO1FBN0dHLFVBQUksR0FBYSxJQUFJLENBQUM7UUFFdEIsZUFBUyxHQUFrQixJQUFJLENBQUM7O0lBMkdwQyxDQUFDO0lBekdhLHdDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFUyxxQ0FBSyxHQUFmO1FBQ0ksdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCx1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTywwQ0FBVSxHQUFsQjtRQUVJLElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksR0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xELElBQUksU0FBUyxHQUFDLE9BQU8sQ0FB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QUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBM0dEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ0U7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0REFDTztJQUxmLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBZ0h6QztJQUFELDRCQUFDO0NBaEhELEFBZ0hDLENBaEhrRCxFQUFFLENBQUMsU0FBUyxHQWdIOUQ7a0JBaEhvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBQYXlVaUluZGV4IH0gZnJvbSBcIi4uL3RoaXJkUGFydHkvVGhpcmRQYXJ0eVwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIsIEpzb25DdW11bGF0aXZlUmVjaGFyZ2UgfSBmcm9tIFwiLi9EYXRhL0N1bXVsYXRpdmVSZWNoYXJnZVwiO1xyXG5pbXBvcnQgUGF5QWNjdW11bGF0ZUNoYXJnZUl0ZW0gZnJvbSBcIi4vUGF5QWNjdW11bGF0ZUNoYXJnZUl0ZW1cIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5QWNjdW11bGF0ZUNoYXJnZVVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaXRlbTpjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgY29tbW9uX3VpOmNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvZGF5U2hvdyhQYXlVaUluZGV4LlRvdGFsKTtcclxuICAgICAgICAvL0V2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaG9wX1RvdGFsKTtcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJvdHRvbU5vZGU9dGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJyk7XHJcbiAgICAgICAgbGV0IGJvdHRvbUhlaWdodD1ib3R0b21Ob2RlLmhlaWdodDtcclxuICAgICAgICBsZXQgYm90dG9tWT1ib3R0b21Ob2RlLnk7ICAgICAgICBcclxuICAgICAgICBsZXQgdG9wTm9kZT10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCd0b3AnKVxyXG4gICAgICAgIGxldCB0b3BIZWlnaHQ9dG9wTm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHRvcFk9dG9wTm9kZS55O1xyXG4gICAgICAgIGxldCBoZWlnaHQ9KCh0b3BZLXRvcEhlaWdodCktKGJvdHRvbVkrYm90dG9tSGVpZ2h0KSk7XHJcbiAgICAgICAgbGV0IGNlbnRlclk9KHRvcFktdG9wSGVpZ2h0LWhlaWdodC8yKTtcclxuICAgICAgICBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW1TY3JvbGwnKTtcclxuICAgICAgICBzY3JvbGxWaWV3LmhlaWdodD1oZWlnaHQgLSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNoYXJnZV9CZ18xXCIpLmhlaWdodDtcclxuICAgICAgICBzY3JvbGxWaWV3Lnk9Y2VudGVyWSAtIDEyMDtcclxuICAgICAgICBsZXQgdGVtcFBvcyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlJlY2hhcmdlX0JnXzFcIikueSAtIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcExhYlwiKS55O1xyXG4gICAgICAgIHNjcm9sbFZpZXcuZ2V0Q2hpbGRCeU5hbWUoJ3ZpZXcnKS5oZWlnaHQ9aGVpZ2h0IC0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUmVjaGFyZ2VfQmdfMVwiKS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUmVjaGFyZ2VfQmdfMVwiKS55ID0gdG9wTm9kZS55IC0gKHRvcE5vZGUuaGVpZ2h0ICsgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUmVjaGFyZ2VfQmdfMVwiKS5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwTGFiXCIpLnkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNoYXJnZV9CZ18xXCIpLnkgLSB0ZW1wUG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpe1xyXG4gICAgICAgIGxldCBkYXRhOk1hcDxudW1iZXIsSnNvbkN1bXVsYXRpdmVSZWNoYXJnZT4gPSBDdW11bGF0aXZlUmVjaGFyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh2LkN1bXVsYXRpdmVSZWNoYXJnZUlEKTtcclxuICAgICAgICAgICAgLy8gaWYoc3RhdGUgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VG90YWxMb25nSmluZ051bSgpID4gdi5DdW11bGF0aXZlUmVjaGFyZ2VQcmljZSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh2LkN1bXVsYXRpdmVSZWNoYXJnZUlELDEpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUGF5QWNjdW11bGF0ZUNoYXJnZUl0ZW0pLmluaXREYXRhKHYpO1xyXG4gICAgICAgICAgICBpZihzdGF0ZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgIGxldCBJdGVtY29udGVudCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRTY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBJdGVtY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuY29tbW9uX3VpLmdldFNwcml0ZUZyYW1lKFwiQ29tbW9uX0NoZWNrbWFya1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jb21tb25fdWkuZ2V0U3ByaXRlRnJhbWUoXCJJdGVtX2ZyYW1lX1poZVpoYW9cIilcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5zZXRQYXJlbnQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ291LnNldFBhcmVudCh2KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0U2libGluZ0luZGV4KDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtYXhEYXRhID0gQ3VtdWxhdGl2ZVJlY2hhcmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25DdW11bGF0aXZlUmVjaGFyZ2UoQ3VtdWxhdGl2ZVJlY2hhcmdlTWFuYWdlci5nZXRNYXhDdW11bGF0aXZlUmVjaGFyZ2VJRCgpKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNoYXJnZV9CZ18xXCIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwTGFiXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsbWF4RGF0YS5DdW11bGF0aXZlUmVjaGFyZ2VQcmljZSArICcnKTtcclxuICAgICAgICAvLyBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSg3MDAyMSwxKTtcclxuICAgICAgICAvLyByZXdhcmQuc2V0UGFyZW50KHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlJlY2hhcmdlX0JnXzFcIikpO1xyXG4gICAgICAgIC8vIHJld2FyZC55ID0gMzA7XHJcbiAgICAgICAgaWYoUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdOdW0oKSA+PSBtYXhEYXRhLkN1bXVsYXRpdmVSZWNoYXJnZVByaWNlKXtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicGF5X2FjY3VtdWxhdGVfY2hhcmdlX2ZpbmFsXCIpID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oNzAwMjEsMSxQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkLnNldFBhcmVudCh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJSZWNoYXJnZV9CZ18xXCIpKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZC55ID0gMzA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuPXJld2FyZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBjbGlja0V2ZW50PW5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnRhcmdldD10aGlzLm5vZGU7XHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50LmNvbXBvbmVudD0nUGF5QWNjdW11bGF0ZUNoYXJnZVVpJztcclxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuaGFuZGxlcj0nb25DbGlja1Jld2FyZCc7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGlja0V2ZW50LmN1c3RvbUV2ZW50RGF0YT1lbmVteVR5cGUrJyc7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSg3MDAyMSwxLFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmQuc2V0UGFyZW50KHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlJlY2hhcmdlX0JnXzFcIikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNvbW1vbl91aS5nZXRTcHJpdGVGcmFtZShcIkNvbW1vbl9DaGVja21hcmtcIilcclxuICAgICAgICAgICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNvbW1vbl91aS5nZXRTcHJpdGVGcmFtZShcIkl0ZW1fZnJhbWVfWmhlWmhhb1wiKVxyXG4gICAgICAgICAgICAgICAgbWFzay5zZXRQYXJlbnQocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgIG1hc2sub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgIGdvdS5zZXRQYXJlbnQocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZC55ID0gMzA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oNzAwMjEsMSk7XHJcbiAgICAgICAgICAgIHJld2FyZC5zZXRQYXJlbnQodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUmVjaGFyZ2VfQmdfMVwiKSk7XHJcbiAgICAgICAgICAgIHJld2FyZC55ID0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tSZXdhcmQoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKDcwMDIxLDEpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSg3MDAyMSwxKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYXlfYWNjdW11bGF0ZV9jaGFyZ2VfZmluYWxcIiwxKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkLCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==