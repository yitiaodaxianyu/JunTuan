
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/LongJingUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4655e8K1dLb4CFBFjIBbW1', 'LongJingUi');
// Scripts/Payment/LongJingUi.ts

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
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var EventManager_1 = require("../Tools/EventManager");
var CrystalRecharge_1 = require("./Data/CrystalRecharge");
var LongJingItem_1 = require("./LongJingItem");
var PayManager_1 = require("./PayManager");
var TotalLongJingItem_1 = require("./TotalLongJingItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LongJingUi = /** @class */ (function (_super) {
    __extends(LongJingUi, _super);
    function LongJingUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_long_jing_item = null;
        _this.prefab_total_item = null;
        return _this;
    }
    // onLoad () {}
    LongJingUi.prototype.start = function () {
        this.adaptation();
        this.initItem();
        this.initTotalItem();
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.LongJing);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_LongJing);
    };
    LongJingUi.prototype.onEnable = function () {
        this.refreshTotalItem();
    };
    LongJingUi.prototype.adaptation = function () {
        var bottomNode = this.node.parent.getChildByName('bottom');
        var bottomHeight = bottomNode.height;
        var bottomY = bottomNode.y;
        var topNode = this.node.parent.getChildByName('top');
        var topHeight = topNode.height;
        var topY = topNode.y;
        var height = ((topY - topHeight) - (bottomY + bottomHeight));
        var centerY = (topY - topHeight - height / 2);
        var scrollView = this.node.getChildByName('scrollView');
        scrollView.height = height;
        scrollView.y = centerY;
        scrollView.getChildByName('view').height = height;
    };
    LongJingUi.prototype.initItem = function () {
        var _this = this;
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var data = CrystalRecharge_1.CrystalRechargeManager.getInstance().getData();
        data.forEach(function (v, k) {
            var longjingItem = cc.instantiate(_this.prefab_long_jing_item);
            longjingItem.getComponent(LongJingItem_1.default).init(v, _this);
            content.addChild(longjingItem);
        });
    };
    LongJingUi.prototype.initTotalItem = function () {
        //累计        
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var totalItem = cc.instantiate(this.prefab_total_item);
        content.addChild(totalItem);
        this.refreshTotalItem();
    };
    LongJingUi.prototype.refreshTotalItem = function () {
        var totalItem = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.getChildByName('total_item');
        if (totalItem) {
            totalItem.getComponent(TotalLongJingItem_1.default).init();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], LongJingUi.prototype, "prefab_long_jing_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], LongJingUi.prototype, "prefab_total_item", void 0);
    LongJingUi = __decorate([
        ccclass
    ], LongJingUi);
    return LongJingUi;
}(cc.Component));
exports.default = LongJingUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcTG9uZ0ppbmdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFDdEQsc0RBQW1GO0FBQ25GLDBEQUFnRTtBQUNoRSwrQ0FBMEM7QUFDMUMsMkNBQTBDO0FBQzFDLHlEQUFvRDtBQUc5QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQThEQztRQTNERywyQkFBcUIsR0FBVyxJQUFJLENBQUM7UUFHckMsdUJBQWlCLEdBQVcsSUFBSSxDQUFDOztJQXdEckMsQ0FBQztJQXRERyxlQUFlO0lBRWYsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsMkJBQVksQ0FBQyxZQUFZLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUMsMkJBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFUyw2QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTywrQkFBVSxHQUFsQjtRQUVJLElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksR0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xELElBQUksU0FBUyxHQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFNBQVMsQ0FBQyxHQUFDLENBQUMsT0FBTyxHQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxPQUFPLEdBQUMsQ0FBQyxJQUFJLEdBQUMsU0FBUyxHQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztRQUN6QixVQUFVLENBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQztRQUNyQixVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUM7SUFDcEQsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZGLElBQUksSUFBSSxHQUFDLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNiLElBQUksWUFBWSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDNUQsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxLQUFJLENBQUMsQ0FBQztZQUNyRCxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDSSxZQUFZO1FBQ1osSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdkYsSUFBSSxTQUFTLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxxQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEgsSUFBRyxTQUFTLEVBQUM7WUFDVCxTQUFTLENBQUMsWUFBWSxDQUFDLDJCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBMUREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ2lCO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2E7SUFOaEIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQThEOUI7SUFBRCxpQkFBQztDQTlERCxBQThEQyxDQTlEdUMsRUFBRSxDQUFDLFNBQVMsR0E4RG5EO2tCQTlEb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBheVVpSW5kZXggfSBmcm9tIFwiLi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3J5c3RhbFJlY2hhcmdlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvQ3J5c3RhbFJlY2hhcmdlXCI7XHJcbmltcG9ydCBMb25nSmluZ0l0ZW0gZnJvbSBcIi4vTG9uZ0ppbmdJdGVtXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCBUb3RhbExvbmdKaW5nSXRlbSBmcm9tIFwiLi9Ub3RhbExvbmdKaW5nSXRlbVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ0ppbmdVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9sb25nX2ppbmdfaXRlbTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX3RvdGFsX2l0ZW06Y2MuUHJlZmFiPW51bGw7ICAgIFxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICB0aGlzLmluaXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VG90YWxJdGVtKCk7XHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvZGF5U2hvdyhQYXlVaUluZGV4LkxvbmdKaW5nKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9Mb25nSmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFRvdGFsSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgYm90dG9tTm9kZT10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdib3R0b20nKTtcclxuICAgICAgICBsZXQgYm90dG9tSGVpZ2h0PWJvdHRvbU5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBib3R0b21ZPWJvdHRvbU5vZGUueTsgICAgICAgIFxyXG4gICAgICAgIGxldCB0b3BOb2RlPXRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpXHJcbiAgICAgICAgbGV0IHRvcEhlaWdodD10b3BOb2RlLmhlaWdodDtcclxuICAgICAgICBsZXQgdG9wWT10b3BOb2RlLnk7XHJcbiAgICAgICAgbGV0IGhlaWdodD0oKHRvcFktdG9wSGVpZ2h0KS0oYm90dG9tWStib3R0b21IZWlnaHQpKTtcclxuICAgICAgICBsZXQgY2VudGVyWT0odG9wWS10b3BIZWlnaHQtaGVpZ2h0LzIpO1xyXG4gICAgICAgIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpO1xyXG4gICAgICAgIHNjcm9sbFZpZXcuaGVpZ2h0PWhlaWdodDtcclxuICAgICAgICBzY3JvbGxWaWV3Lnk9Y2VudGVyWTtcclxuICAgICAgICBzY3JvbGxWaWV3LmdldENoaWxkQnlOYW1lKCd2aWV3JykuaGVpZ2h0PWhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0SXRlbSgpe1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGxldCBkYXRhPUNyeXN0YWxSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCk7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGxldCBsb25namluZ0l0ZW09Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbG9uZ19qaW5nX2l0ZW0pO1xyXG4gICAgICAgICAgICBsb25namluZ0l0ZW0uZ2V0Q29tcG9uZW50KExvbmdKaW5nSXRlbSkuaW5pdCh2LHRoaXMpO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGxvbmdqaW5nSXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRvdGFsSXRlbSgpe1xyXG4gICAgICAgIC8v57Sv6K6hICAgICAgICBcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgdG90YWxJdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3RvdGFsX2l0ZW0pO1xyXG4gICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQodG90YWxJdGVtKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hUb3RhbEl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG90YWxJdGVtKCl7XHJcbiAgICAgICAgbGV0IHRvdGFsSXRlbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudC5nZXRDaGlsZEJ5TmFtZSgndG90YWxfaXRlbScpO1xyXG4gICAgICAgIGlmKHRvdGFsSXRlbSl7XHJcbiAgICAgICAgICAgIHRvdGFsSXRlbS5nZXRDb21wb25lbnQoVG90YWxMb25nSmluZ0l0ZW0pLmluaXQoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuIl19