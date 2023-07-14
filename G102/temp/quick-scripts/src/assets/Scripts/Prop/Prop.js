"use strict";
cc._RF.push(module, '82f5dUoabtCfJx0sxQntCYK', 'Prop');
// Scripts/Prop/Prop.ts

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
var MyTool_1 = require("../Tools/MyTool");
var PropManager_1 = require("./PropManager");
var PropConfig_1 = require("../Prop/PropConfig");
var UIManager_1 = require("../UI/UIManager");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var Item_1 = require("./Data/Item");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Prop = /** @class */ (function (_super) {
    __extends(Prop, _super);
    function Prop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop_id = PropConfig_1.PropId.Coin;
        _this.prop_num = 0;
        _this.prop_action = PropConfig_1.PropAction.Null;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    Prop.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    Prop.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    Prop.prototype.init = function (propType, num, propAction) {
        this.prop_id = propType;
        this.prop_num = num;
        this.prop_action = propAction;
        this.refreshData();
    };
    Prop.prototype.initSaleItem = function (currencyType, price, discount) {
        if (discount === void 0) { discount = 0; }
        this.prop_price = price;
        this.prop_cost = currencyType;
        if (discount == 0) {
            this.node.getChildByName("discountBg").active = false;
            this.node.getChildByName("discountNum").active = false;
            this.node.getChildByName("discount").active = false;
        }
        else {
            this.node.getChildByName("discountNum").getComponent(cc.Label).string = "" + discount + "%";
        }
        this.node.getChildByName("priceIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(currencyType);
        this.node.getChildByName("price").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(price);
    };
    Prop.prototype.soldOut = function () {
        this.node.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("discountBg").active = false;
        this.node.getChildByName("discountNum").active = false;
        this.node.getChildByName("discount").active = false;
        this.node.getChildByName("priceIcon").active = false;
        this.node.getChildByName("priceTitleBg").active = false;
        this.node.getChildByName("price").active = false;
        this.node.getChildByName("shop_Bg_SoldOut").active = true;
        this.node.getChildByName("saleOut").active = true;
    };
    Prop.prototype.refreshData = function () {
        var num = this.node.getChildByName('num');
        num.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(this.prop_num);
        num.active = this.prop_num != 0;
        //设置框的图片
        var sp = this.node.getComponent(cc.Sprite);
        sp.spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByPropType(this.prop_id);
        //设置icon图片
        var iconSp = this.node.getChildByName("mask").getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(Item_1.ItemManager.getInstance().getQuoteIcon(this.prop_id));
    };
    Prop.prototype.onClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.prop_action == PropConfig_1.PropAction.Null) {
            return;
        }
        UIManager_1.UIManager.getInstance().showPropInfo({
            onClose: function () {
                if (_this.prop_action == PropConfig_1.PropAction.Use) {
                    var newNum = PropManager_1.PropManager.getInstance().getPropNum(_this.prop_id);
                    if (newNum != _this.prop_num) {
                        _this.init(_this.prop_id, newNum, _this.prop_action);
                    }
                }
            },
        }, this.prop_action, {
            prop_id: this.prop_id,
            prop_num: this.prop_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    Prop = __decorate([
        ccclass
    ], Prop);
    return Prop;
}(cc.Component));
exports.default = Prop;

cc._RF.pop();