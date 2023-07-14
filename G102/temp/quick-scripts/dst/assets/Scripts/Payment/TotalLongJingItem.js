
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/TotalLongJingItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'feb63e/3EhPrp+1yLDpMTqI', 'TotalLongJingItem');
// Scripts/Payment/TotalLongJingItem.ts

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
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var CumulativeRecharge_1 = require("./Data/CumulativeRecharge");
var PayManager_1 = require("./PayManager");
var PaymentUi_1 = require("./PaymentUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TotalLongJingItem = /** @class */ (function (_super) {
    __extends(TotalLongJingItem, _super);
    function TotalLongJingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.total_id = 0;
        return _this;
    }
    TotalLongJingItem.prototype.onEnable = function () {
        this.init();
    };
    TotalLongJingItem.prototype.init = function () {
        this.refreshReward();
        this.refreshBtn();
    };
    TotalLongJingItem.prototype.refreshReward = function () {
        var _this = this;
        var totalNum = PayManager_1.PayManager.getInstance().getTotalLongJingNum();
        var CRM = CumulativeRecharge_1.CumulativeRechargeManager.getInstance();
        var data = CRM.getData();
        var isHaveNoGet = false;
        data.forEach(function (v, k) {
            var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            if (!isHaveNoGet && state == 1) {
                isHaveNoGet = true;
                _this.total_id = v.CumulativeRechargeID;
            }
        });
        if (isHaveNoGet == false) {
            this.total_id = CRM.getId(totalNum);
            if (this.total_id == 0) {
                this.node.removeFromParent();
                return;
            }
        }
        //奖励列表
        var itemContent = this.node.getChildByName('itemScrollView').getComponent(cc.ScrollView).content;
        itemContent.removeAllChildren();
        var rewardDatas = CRM.getRewardData(this.total_id);
        for (var i = 0; i < rewardDatas.length; i++) {
            var rewardData = rewardDatas[i];
            var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
            itemContent.addChild(item);
        }
        //进度条
        var targetTotal = CRM.getCumulativeRechargePrice(this.total_id);
        this.node.getChildByName('numLabel').getComponent(cc.Label).string = totalNum + '/' + targetTotal;
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = totalNum / targetTotal;
        //翻译
        var numText = this.node.getChildByName('numText').getComponent(TextLanguage_1.default);
        numText.setReplaceValue('~', '' + targetTotal);
    };
    TotalLongJingItem.prototype.refreshBtn = function () {
        //按钮
        var btnGet = this.node.getChildByName('btnGet').getComponent(cc.Button);
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(this.total_id);
        if (state == 1) {
            btnGet.interactable = true;
        }
        else {
            btnGet.interactable = false;
        }
        var red = btnGet.node.getChildByName('red');
        red.active = btnGet.interactable;
    };
    TotalLongJingItem.prototype.onClickGet = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var state = PayManager_1.PayManager.getInstance().getTotalLongJingGetState(this.total_id);
        if (state == 1) {
            PayManager_1.PayManager.getInstance().setTotalLongJingGetState(this.total_id, 2);
            var rewardDatas = CumulativeRecharge_1.CumulativeRechargeManager.getInstance().getRewardData(this.total_id);
            var itemList = new Array();
            for (var i = 0; i < rewardDatas.length; i++) {
                var rewardData = rewardDatas[i];
                var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
                PropManager_1.PropManager.getInstance().changePropNum(rewardData.reward_id, rewardData.reward_num);
                itemList.push(item);
            }
            GameManager_1.default.getInstance().showMultipleGetTip(itemList);
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_LongJing);
            this.init();
        }
    };
    TotalLongJingItem.prototype.onClickBtnMore = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //显示累计充值界面
        PaymentUi_1.default._instance.showIndex(4);
    };
    TotalLongJingItem = __decorate([
        ccclass
    ], TotalLongJingItem);
    return TotalLongJingItem;
}(cc.Component));
exports.default = TotalLongJingItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcVG90YWxMb25nSmluZ0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELHNEQUFtRjtBQUNuRixnRUFBc0U7QUFDdEUsMkNBQTBDO0FBQzFDLHlDQUFvQztBQUc5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQXdGQztRQXRGRyxjQUFRLEdBQVEsQ0FBQyxDQUFDOztJQXNGdEIsQ0FBQztJQXBGRyxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUFBLGlCQW1DQztRQWxDRyxJQUFJLFFBQVEsR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDNUQsSUFBSSxHQUFHLEdBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsSUFBSSxJQUFJLEdBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZCLElBQUksV0FBVyxHQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDYixJQUFJLEtBQUssR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BGLElBQUcsQ0FBQyxXQUFXLElBQUUs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QztTQUNmO0lBQ0wsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxVQUFVO1FBQ1YsbUJBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUF0RmdCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBd0ZyQztJQUFELHdCQUFDO0NBeEZELEFBd0ZDLENBeEY4QyxFQUFFLENBQUMsU0FBUyxHQXdGMUQ7a0JBeEZvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL0N1bXVsYXRpdmVSZWNoYXJnZVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgUGF5bWVudFVpIGZyb20gXCIuL1BheW1lbnRVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG90YWxMb25nSmluZ0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHRvdGFsX2lkOm51bWJlcj0wO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJld2FyZCgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEJ0bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hSZXdhcmQoKXtcclxuICAgICAgICBsZXQgdG90YWxOdW09UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdOdW0oKTtcclxuICAgICAgICBsZXQgQ1JNPUN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgZGF0YT1DUk0uZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBpc0hhdmVOb0dldD1mYWxzZTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgbGV0IHN0YXRlPVBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb3RhbExvbmdKaW5nR2V0U3RhdGUodi5DdW11bGF0aXZlUmVjaGFyZ2VJRCk7XHJcbiAgICAgICAgICAgIGlmKCFpc0hhdmVOb0dldCYmc3RhdGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlTm9HZXQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxfaWQ9di5DdW11bGF0aXZlUmVjaGFyZ2VJRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGlzSGF2ZU5vR2V0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxfaWQ9Q1JNLmdldElkKHRvdGFsTnVtKTtcclxuICAgICAgICAgICAgaWYodGhpcy50b3RhbF9pZD09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aWW5Yqx5YiX6KGoXHJcbiAgICAgICAgbGV0IGl0ZW1Db250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaXRlbVNjcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBpdGVtQ29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCByZXdhcmREYXRhcz1DUk0uZ2V0UmV3YXJkRGF0YSh0aGlzLnRvdGFsX2lkKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxyZXdhcmREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmREYXRhPXJld2FyZERhdGFzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIGl0ZW1Db250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i/m+W6puadoVxyXG4gICAgICAgIGxldCB0YXJnZXRUb3RhbD1DUk0uZ2V0Q3VtdWxhdGl2ZVJlY2hhcmdlUHJpY2UodGhpcy50b3RhbF9pZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdudW1MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRvdGFsTnVtKycvJyt0YXJnZXRUb3RhbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz10b3RhbE51bS90YXJnZXRUb3RhbDtcclxuICAgICAgICAvL+e/u+ivkVxyXG4gICAgICAgIGxldCBudW1UZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbnVtVGV4dCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpO1xyXG4gICAgICAgIG51bVRleHQuc2V0UmVwbGFjZVZhbHVlKCd+JywnJyt0YXJnZXRUb3RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEJ0bigpe1xyXG4gICAgICAgIC8v5oyJ6ZKuXHJcbiAgICAgICAgbGV0IGJ0bkdldD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkdldCcpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGxldCBzdGF0ZT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VG90YWxMb25nSmluZ0dldFN0YXRlKHRoaXMudG90YWxfaWQpOyAgICAgICAgXHJcbiAgICAgICAgaWYoc3RhdGU9PTEpe1xyXG4gICAgICAgICAgICBidG5HZXQuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bkdldC5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWQ9YnRuR2V0Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpO1xyXG4gICAgICAgIHJlZC5hY3RpdmU9YnRuR2V0LmludGVyYWN0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrR2V0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgc3RhdGU9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh0aGlzLnRvdGFsX2lkKTtcclxuICAgICAgICBpZihzdGF0ZT09MSl7XHJcbiAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUb3RhbExvbmdKaW5nR2V0U3RhdGUodGhpcy50b3RhbF9pZCwyKTtcclxuICAgICAgICAgICAgbGV0IHJld2FyZERhdGFzPUN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhKHRoaXMudG90YWxfaWQpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbUxpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHJld2FyZERhdGFzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmREYXRhPXJld2FyZERhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmREYXRhLnJld2FyZF9pZCxyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1MaXN0KTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfTG9uZ0ppbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bk1vcmUoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8v5pi+56S657Sv6K6h5YWF5YC855WM6Z2iXHJcbiAgICAgICAgUGF5bWVudFVpLl9pbnN0YW5jZS5zaG93SW5kZXgoNCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==