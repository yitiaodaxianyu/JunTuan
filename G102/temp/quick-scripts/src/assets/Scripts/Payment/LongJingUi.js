"use strict";
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