
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayAccumulateChargeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '718a7Vy1JxNlbWyho/22p8F', 'PayAccumulateChargeItem');
// Scripts/Payment/PayAccumulateChargeItem.ts

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
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var PayAccumulateChargeUi_1 = require("./PayAccumulateChargeUi");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayAccumulateChargeItem = /** @class */ (function (_super) {
    __extends(PayAccumulateChargeItem, _super);
    function PayAccumulateChargeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        return _this;
    }
    PayAccumulateChargeItem.prototype.initData = function (data) {
        this.data = data;
        var item1, item2, item3, item4, item5;
        if (data.GetCoin != 0) {
            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, data.GetCoin);
            item1.scale = 0.85;
        }
        if (data.GetGem != 0) {
            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, data.GetGem);
            item2.scale = 0.85;
        }
        if (data.Item1_ID != 0) {
            item3 = PropManager_1.PropManager.getInstance().createPropItem(data.Item1_ID, data.Item1_Num);
            item3.scale = 0.85;
        }
        if (data.Item2_ID != 0) {
            item4 = PropManager_1.PropManager.getInstance().createPropItem(data.Item2_ID, data.Item2_Num);
            item4.scale = 0.85;
        }
        if (data.Item3_ID != 0) {
            item5 = PropManager_1.PropManager.getInstance().createPropItem(data.Item3_ID, data.Item3_Num);
            item5.scale = 0.85;
        }
        var content = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        if (item1)
            content.addChild(item1);
        if (item2)
            content.addChild(item2);
        if (item3)
            content.addChild(item3);
        if (item4)
            content.addChild(item4);
        if (item5)
            content.addChild(item5);
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(data.CumulativeRechargeID);
        if (state != 0) {
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(-108, 62));
            if (state == 1) {
                this.node.getChildByName("rewardBtn").active = true;
                this.node.getChildByName("rewardBtn1").active = false;
            }
            else {
                this.node.getChildByName("rewardBtn1").active = true;
                this.node.getChildByName("rewardBtn").active = false;
            }
        }
        else {
            this.node.getChildByName("rewardScroll").setPosition(cc.v2(0, 62));
        }
        this.node.getChildByName("Label1").getComponent(TextLanguage_1.default).setTextId(1420001);
        this.node.getChildByName("Label1").getComponent(TextLanguage_1.default).setReplaceValue("~", data.CumulativeRechargePrice + "");
        this.node.getChildByName("num").getComponent(cc.Label).string = PayManager_1.PayManager.getInstance().getTotalLongJingNum() + "/" + data.CumulativeRechargePrice;
        this.node.getChildByName("Task_Bar_0").getComponent(cc.ProgressBar).progress = PayManager_1.PayManager.getInstance().getTotalLongJingNum() / data.CumulativeRechargePrice;
    };
    PayAccumulateChargeItem.prototype.onClickRewardBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每一档累充奖励领取人数 + this.data.CumulativeRechargePrice);
        var item1, item2, item3, item4, item5;
        var rewardList = [];
        if (this.data.GetCoin != 0) {
            item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, this.data.GetCoin);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, this.data.GetCoin);
            item1.scale = 0.85;
        }
        if (this.data.GetGem != 0) {
            item2 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, this.data.GetGem);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, this.data.GetGem);
            item2.scale = 0.85;
        }
        if (this.data.Item1_ID != 0) {
            item3 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item1_ID, this.data.Item1_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item1_ID, this.data.Item1_Num);
            item3.scale = 0.85;
        }
        if (this.data.Item2_ID != 0) {
            item4 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item2_ID, this.data.Item2_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item2_ID, this.data.Item2_Num);
            item4.scale = 0.85;
        }
        if (this.data.Item3_ID != 0) {
            item5 = PropManager_1.PropManager.getInstance().createPropItem(this.data.Item3_ID, this.data.Item3_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.data.Item3_ID, this.data.Item3_Num);
            item5.scale = 0.85;
        }
        PayManager_1.PayManager.getInstance().setTotalLongJingGetState(this.data.CumulativeRechargeID, 2);
        if (item1)
            rewardList.push(item1);
        if (item2)
            rewardList.push(item2);
        if (item3)
            rewardList.push(item3);
        if (item4)
            rewardList.push(item4);
        if (item5)
            rewardList.push(item5);
        GameManager_1.default.getInstance().showMultipleGetTip(rewardList, (function () {
            _this.node.parent.parent.parent.parent.getComponent(PayAccumulateChargeUi_1.default).refreshUi();
        }));
        //EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Total);
    };
    PayAccumulateChargeItem = __decorate([
        ccclass
    ], PayAccumulateChargeItem);
    return PayAccumulateChargeItem;
}(cc.Component));
exports.default = PayAccumulateChargeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5QWNjdW11bGF0ZUNoYXJnZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0QsOERBQXlEO0FBQ3pELGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQXFEO0FBR3JELGlFQUE0RDtBQUM1RCwyQ0FBMEM7QUFFcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUQsMkNBQVk7SUFBakU7UUFBQSxxRUFnR0M7UUE5RlcsVUFBSSxHQUEyQixJQUFJLENBQUM7O0lBOEZoRCxDQUFDO0lBNUZHLDBDQUFRLEdBQVIsVUFBUyxJQUEyQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUE7UUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRTtZQUNuQixLQUFLLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVFLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNsQixLQUFLLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxJQUFJ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SSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLCtCQUFxQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUYsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNILHVGQUF1RjtJQUMzRixDQUFDO0lBOUZnQix1QkFBdUI7UUFEM0MsT0FBTztPQUNhLHVCQUF1QixDQWdHM0M7SUFBRCw4QkFBQztDQWhHRCxBQWdHQyxDQWhHb0QsRUFBRSxDQUFDLFNBQVMsR0FnR2hFO2tCQWhHb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbkN1bXVsYXRpdmVSZWNoYXJnZSB9IGZyb20gXCIuL0RhdGEvQ3VtdWxhdGl2ZVJlY2hhcmdlXCI7XHJcbmltcG9ydCBQYXlBY2N1bXVsYXRlQ2hhcmdlVWkgZnJvbSBcIi4vUGF5QWNjdW11bGF0ZUNoYXJnZVVpXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUFjY3VtdWxhdGVDaGFyZ2VJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIGRhdGE6IEpzb25DdW11bGF0aXZlUmVjaGFyZ2UgPSBudWxsO1xyXG5cclxuICAgIGluaXREYXRhKGRhdGE6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgaXRlbTEsIGl0ZW0yLCBpdGVtMywgaXRlbTQsIGl0ZW01XHJcbiAgICAgICAgaWYgKGRhdGEuR2V0Q29pbiAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW0xID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbiwgZGF0YS5HZXRDb2luKTtcclxuICAgICAgICAgICAgaXRlbTEuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5HZXRHZW0gIT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSwgZGF0YS5HZXRHZW0pO1xyXG4gICAgICAgICAgICBpdGVtMi5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLkl0ZW0xX0lEICE9IDApIHtcclxuICAgICAgICAgICAgaXRlbTMgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGEuSXRlbTFfSUQsIGRhdGEuSXRlbTFfTnVtKTtcclxuICAgICAgICAgICAgaXRlbTMuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5JdGVtMl9JRCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW00ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShkYXRhLkl0ZW0yX0lELCBkYXRhLkl0ZW0yX051bSk7XHJcbiAgICAgICAgICAgIGl0ZW00LnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuSXRlbTNfSUQgIT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtNSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YS5JdGVtM19JRCwgZGF0YS5JdGVtM19OdW0pO1xyXG4gICAgICAgICAgICBpdGVtNS5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkU2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAoaXRlbTEpIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbTEpO1xyXG4gICAgICAgIGlmIChpdGVtMikgY29udGVudC5hZGRDaGlsZChpdGVtMik7XHJcbiAgICAgICAgaWYgKGl0ZW0zKSBjb250ZW50LmFkZENoaWxkKGl0ZW0zKTtcclxuICAgICAgICBpZiAoaXRlbTQpIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbTQpO1xyXG4gICAgICAgIGlmIChpdGVtNSkgY29udGVudC5hZGRDaGlsZChpdGVtNSk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZShkYXRhLkN1bXVsYXRpdmVSZWNoYXJnZUlEKTtcclxuICAgICAgICBpZihzdGF0ZSAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkU2Nyb2xsXCIpLnNldFBvc2l0aW9uKGNjLnYyKC0xMDgsNjIpKTtcclxuICAgICAgICAgICAgaWYoc3RhdGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRCdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZEJ0bjFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkQnRuMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFNjcm9sbFwiKS5zZXRQb3NpdGlvbihjYy52MigwLDYyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsMVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQyMDAwMSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTGFiZWwxXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZShcIn5cIixkYXRhLkN1bXVsYXRpdmVSZWNoYXJnZVByaWNlICsgXCJcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb3RhbExvbmdKaW5nTnVtKCkgKyBcIi9cIiArIGRhdGEuQ3VtdWxhdGl2ZVJlY2hhcmdlUHJpY2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVGFza19CYXJfMFwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb3RhbExvbmdKaW5nTnVtKCkgLyBkYXRhLkN1bXVsYXRpdmVSZWNoYXJnZVByaWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkNsaWNrUmV3YXJkQnRuKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5LiA5qGj57Sv5YWF5aWW5Yqx6aKG5Y+W5Lq65pWwICsgdGhpcy5kYXRhLkN1bXVsYXRpdmVSZWNoYXJnZVByaWNlKVxyXG4gICAgICAgIGxldCBpdGVtMSwgaXRlbTIsIGl0ZW0zLCBpdGVtNCwgaXRlbTU7XHJcbiAgICAgICAgbGV0IHJld2FyZExpc3Q6Y2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5HZXRDb2luICE9IDApIHtcclxuICAgICAgICAgICAgaXRlbTEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLCB0aGlzLmRhdGEuR2V0Q29pbik7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbiwgdGhpcy5kYXRhLkdldENvaW4pXHJcbiAgICAgICAgICAgIGl0ZW0xLnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5HZXRHZW0gIT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSwgdGhpcy5kYXRhLkdldEdlbSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLCB0aGlzLmRhdGEuR2V0R2VtKVxyXG4gICAgICAgICAgICBpdGVtMi5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuSXRlbTFfSUQgIT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtMyA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5kYXRhLkl0ZW0xX0lELCB0aGlzLmRhdGEuSXRlbTFfTnVtKTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMuZGF0YS5JdGVtMV9JRCwgdGhpcy5kYXRhLkl0ZW0xX051bSlcclxuICAgICAgICAgICAgaXRlbTMuc2NhbGUgPSAwLjg1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kYXRhLkl0ZW0yX0lEICE9IDApIHtcclxuICAgICAgICAgICAgaXRlbTQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMuZGF0YS5JdGVtMl9JRCwgdGhpcy5kYXRhLkl0ZW0yX051bSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLmRhdGEuSXRlbTJfSUQsIHRoaXMuZGF0YS5JdGVtMl9OdW0pXHJcbiAgICAgICAgICAgIGl0ZW00LnNjYWxlID0gMC44NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5JdGVtM19JRCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW01ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLmRhdGEuSXRlbTNfSUQsIHRoaXMuZGF0YS5JdGVtM19OdW0pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5kYXRhLkl0ZW0zX0lELCB0aGlzLmRhdGEuSXRlbTNfTnVtKVxyXG4gICAgICAgICAgICBpdGVtNS5zY2FsZSA9IDAuODU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUb3RhbExvbmdKaW5nR2V0U3RhdGUodGhpcy5kYXRhLkN1bXVsYXRpdmVSZWNoYXJnZUlELDIpO1xyXG4gICAgICAgIGlmIChpdGVtMSkgcmV3YXJkTGlzdC5wdXNoKGl0ZW0xKTtcclxuICAgICAgICBpZiAoaXRlbTIpIHJld2FyZExpc3QucHVzaChpdGVtMik7XHJcbiAgICAgICAgaWYgKGl0ZW0zKSByZXdhcmRMaXN0LnB1c2goaXRlbTMpO1xyXG4gICAgICAgIGlmIChpdGVtNCkgcmV3YXJkTGlzdC5wdXNoKGl0ZW00KTtcclxuICAgICAgICBpZiAoaXRlbTUpIHJld2FyZExpc3QucHVzaChpdGVtNSk7XHJcblxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJld2FyZExpc3QsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFBheUFjY3VtdWxhdGVDaGFyZ2VVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgLy9FdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9Ub3RhbCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==