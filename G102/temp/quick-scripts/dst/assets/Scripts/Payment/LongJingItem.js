
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/LongJingItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40dc3pVO2dN7I7ntRazh0TS', 'LongJingItem');
// Scripts/Payment/LongJingItem.ts

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
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LongJingItem = /** @class */ (function (_super) {
    __extends(LongJingItem, _super);
    function LongJingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.longjing_data = null;
        _this.longjing_ts = null;
        return _this;
        // update (dt) {}
    }
    LongJingItem.prototype.start = function () {
        var numText = this.node.getChildByName('numText').getComponent(TextLanguage_1.default);
        numText.setReplaceValue("~", (this.longjing_data.CrystalQuantity) + ' ');
        //价格,需要转换
        var priceLabel = this.node.getChildByName('priceLabel').getComponent(cc.Label);
        var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(this.longjing_data.ProductId);
        // priceLabel.string=payInfo.price+payInfo.currency;
        priceLabel.string = payInfo.price;
        //item
        var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.LongJing, this.longjing_data.CrystalQuantity, PropConfig_1.PropAction.Look);
        this.node.addChild(item);
        item.y = 88;
        this.refresh();
    };
    LongJingItem.prototype.init = function (longjingData, longjingTs) {
        //龙晶数量
        this.longjing_data = longjingData;
        this.longjing_ts = longjingTs;
    };
    LongJingItem.prototype.refresh = function () {
        //首次充值文本
        var first = this.node.getChildByName('first');
        if (PayManager_1.PayManager.getInstance().getPayNum(this.longjing_data.ProductId) <= 0) {
            var firstText = first.getChildByName('firstText').getComponent(TextLanguage_1.default);
            firstText.setReplaceValue("~", '' + this.longjing_data.DiamondsQuality);
            first.active = true;
        }
        else {
            first.active = false;
        }
    };
    LongJingItem.prototype.onClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x龙晶点击购买次数 + this.longjing_data.CrystalQuantity);
        ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                if (isPay) {
                    var PM = PropManager_1.PropManager.getInstance();
                    var itemList = new Array();
                    if (PayManager_1.PayManager.getInstance().getPayNum(_this.longjing_data.ProductId) <= 0) {
                        PM.changePropNum(PropConfig_1.PropId.Gem, _this.longjing_data.DiamondsQuality);
                        itemList.push(PM.createPropItem(PropConfig_1.PropId.Gem, _this.longjing_data.DiamondsQuality));
                    }
                    PayManager_1.PayManager.getInstance().addPayNum(_this.longjing_data.ProductId);
                    PayManager_1.PayManager.getInstance().addTotalLongJingNum(_this.longjing_data.CrystalQuantity);
                    PM.changePropNum(PropConfig_1.PropId.LongJing, _this.longjing_data.CrystalQuantity);
                    itemList.push(PM.createPropItem(PropConfig_1.PropId.LongJing, _this.longjing_data.CrystalQuantity));
                    GameManager_1.default.getInstance().showMultipleGetTip(itemList);
                    _this.refresh();
                    _this.longjing_ts.refreshTotalItem();
                    //红点检测一下
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_LongJing);
                    GameManager_1.default.getInstance().refreshLongJingShow();
                }
            } }, this.longjing_data.ProductId);
    };
    LongJingItem = __decorate([
        ccclass
    ], LongJingItem);
    return LongJingItem;
}(cc.Component));
exports.default = LongJingItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcTG9uZ0ppbmdJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCw4REFBeUQ7QUFDekQsaURBQXdEO0FBQ3hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsc0RBQW1GO0FBR25GLDJDQUEwQztBQUdwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWlFQztRQS9ERyxtQkFBYSxHQUFxQixJQUFJLENBQUM7UUFDdkMsaUJBQVcsR0FBWSxJQUFJLENBQUM7O1FBNkQ1QixpQkFBaUI7SUFDckIsQ0FBQztJQTVEYSw0QkFBSyxHQUFmO1FBQ0ksSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQztRQUMzRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsU0FBUztRQUNULElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0UsSUFBSSxPQUFPLEdBQUMsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RSxvREFBb0Q7UUFDcEQsVUFBVSxDQUFDLE1BQU0sR0FBQyxPQUFPLENBQUMsS0FBSyxD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LGNBQWMsQ0FBQyxtQkFBTSxDQUFDLFFBQVEsRUFBQyxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JGLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixLQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3BDLFFBQVE7b0JBQ1IsMkJBQVksQ0FBQyxZQUFZLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUMsMkJBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUN4RixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQ25EO1lBQ0wsQ0FBQyxFQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBN0RnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBaUVoQztJQUFELG1CQUFDO0NBakVELEFBaUVDLENBakV5QyxFQUFFLENBQUMsU0FBUyxHQWlFckQ7a0JBakVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25DcnlzdGFsUmVjaGFyZ2UgfSBmcm9tIFwiLi9EYXRhL0NyeXN0YWxSZWNoYXJnZVwiO1xyXG5pbXBvcnQgTG9uZ0ppbmdVaSBmcm9tIFwiLi9Mb25nSmluZ1VpXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb25nSmluZ0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGxvbmdqaW5nX2RhdGE6SnNvbkNyeXN0YWxSZWNoYXJnZT1udWxsO1xyXG4gICAgbG9uZ2ppbmdfdHM6TG9uZ0ppbmdVaT1udWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbnVtVGV4dD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ251bVRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICBudW1UZXh0LnNldFJlcGxhY2VWYWx1ZShcIn5cIiwodGhpcy5sb25namluZ19kYXRhLkNyeXN0YWxRdWFudGl0eSkrJyAnKTtcclxuICAgICAgICAvL+S7t+agvCzpnIDopoHovazmjaJcclxuICAgICAgICBsZXQgcHJpY2VMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3ByaWNlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBwYXlJbmZvPVBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKHRoaXMubG9uZ2ppbmdfZGF0YS5Qcm9kdWN0SWQpO1xyXG4gICAgICAgIC8vIHByaWNlTGFiZWwuc3RyaW5nPXBheUluZm8ucHJpY2UrcGF5SW5mby5jdXJyZW5jeTtcclxuICAgICAgICBwcmljZUxhYmVsLnN0cmluZz1wYXlJbmZvLnByaWNlO1xyXG4gICAgICAgIC8vaXRlbVxyXG4gICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkxvbmdKaW5nLHRoaXMubG9uZ2ppbmdfZGF0YS5DcnlzdGFsUXVhbnRpdHksUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgaXRlbS55PTg4O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQgKGxvbmdqaW5nRGF0YTpKc29uQ3J5c3RhbFJlY2hhcmdlLGxvbmdqaW5nVHM6TG9uZ0ppbmdVaSkge1xyXG4gICAgICAgIC8v6b6Z5pm25pWw6YePXHJcbiAgICAgICAgdGhpcy5sb25namluZ19kYXRhPWxvbmdqaW5nRGF0YTtcclxuICAgICAgICB0aGlzLmxvbmdqaW5nX3RzPWxvbmdqaW5nVHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaCgpe1xyXG4gICAgICAgIC8v6aaW5qyh5YWF5YC85paH5pysXHJcbiAgICAgICAgbGV0IGZpcnN0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmlyc3QnKTtcclxuICAgICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKHRoaXMubG9uZ2ppbmdfZGF0YS5Qcm9kdWN0SWQpPD0wKXtcclxuICAgICAgICAgICAgbGV0IGZpcnN0VGV4dD1maXJzdC5nZXRDaGlsZEJ5TmFtZSgnZmlyc3RUZXh0JykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIGZpcnN0VGV4dC5zZXRSZXBsYWNlVmFsdWUoXCJ+XCIsJycrdGhpcy5sb25namluZ19kYXRhLkRpYW1vbmRzUXVhbGl0eSk7XHJcbiAgICAgICAgICAgIGZpcnN0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJzdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS546b6Z5pm254K55Ye76LSt5Lmw5qyh5pWwICsgdGhpcy5sb25namluZ19kYXRhLkNyeXN0YWxRdWFudGl0eSk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXkoe3Jlc3VsdDooaXNQYXk6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgaWYoaXNQYXkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IFBNPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUxpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKHRoaXMubG9uZ2ppbmdfZGF0YS5Qcm9kdWN0SWQpPD0wKXtcclxuICAgICAgICAgICAgICAgICAgICBQTS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdGhpcy5sb25namluZ19kYXRhLkRpYW1vbmRzUXVhbGl0eSk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUxpc3QucHVzaChQTS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHRoaXMubG9uZ2ppbmdfZGF0YS5EaWFtb25kc1F1YWxpdHkpKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0odGhpcy5sb25namluZ19kYXRhLlByb2R1Y3RJZCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsTG9uZ0ppbmdOdW0odGhpcy5sb25namluZ19kYXRhLkNyeXN0YWxRdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICBQTS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Mb25nSmluZyx0aGlzLmxvbmdqaW5nX2RhdGEuQ3J5c3RhbFF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2goUE0uY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkxvbmdKaW5nLHRoaXMubG9uZ2ppbmdfZGF0YS5DcnlzdGFsUXVhbnRpdHkpKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1MaXN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb25namluZ190cy5yZWZyZXNoVG90YWxJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAvL+e6oueCueajgOa1i+S4gOS4i1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfTG9uZ0ppbmcpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTG9uZ0ppbmdTaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9fSx0aGlzLmxvbmdqaW5nX2RhdGEuUHJvZHVjdElkKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==