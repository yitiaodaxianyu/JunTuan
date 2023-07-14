"use strict";
cc._RF.push(module, '14b9bsKPLtGi7ZNHSSVk0/c', 'EquipItem');
// Scripts/Equipment/Ui/EquipItem.ts

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
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIManager_1 = require("../../UI/UIManager");
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var EquipConfig_1 = require("../EquipConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipItem = /** @class */ (function (_super) {
    __extends(EquipItem, _super);
    function EquipItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.equip_info = null;
        _this.prop_action = PropConfig_1.PropAction.Look;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    EquipItem.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    EquipItem.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    EquipItem.prototype.init = function (heroType, info, pAc) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (typeof info == "number") {
            var equipInfo = new EquipConfig_1.EquipInfo();
            equipInfo.equip_id = info;
            equipInfo.equip_num = 1;
            this.equip_info = equipInfo;
        }
        else {
            this.equip_info = info;
        }
        this.hero_type = heroType;
        this.prop_action = pAc;
        this.refreshData();
    };
    EquipItem.prototype.initSaleItem = function (currencyType, price, discount) {
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
    EquipItem.prototype.soldOut = function () {
        this.node.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("discountBg").active = false;
        this.node.getChildByName("discountNum").active = false;
        this.node.getChildByName("discount").active = false;
        this.node.getChildByName("priceIcon").active = false;
        this.node.getChildByName("priceTitleBg").active = false;
        this.node.getChildByName("price").active = false;
        this.node.getChildByName("shop_Bg_SoldOut").active = true;
        this.node.getChildByName("saleOut").active = true;
    };
    EquipItem.prototype.refreshData = function () {
        var EAM = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpFrameByPropType(this.equip_info.equip_id);
        var iconSp = this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PM.getSpByPropId(this.equip_info.equip_id);
        this.node.getComponent(cc.Button).enabled = this.prop_action != PropConfig_1.PropAction.Null;
        var star = this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        var starNum = Item_1.ItemManager.getInstance().getStar(this.equip_info.equip_id);
        if (starNum > 0) {
            star.node.active = true;
            star.spriteFrame = PropManager_1.PropManager.getInstance().getSpByName('Common_Star_' + starNum);
        }
        else {
            star.node.active = false;
        }
        var num = this.node.getChildByName("num");
        if (this.equip_info.equip_num <= 1) {
            num.active = false;
        }
        else {
            num.active = true;
        }
        num.getComponent(cc.Label).string = "" + this.equip_info.equip_num;
    };
    EquipItem.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showEquipInfoUi(this.hero_type, this.equip_info.equip_id, this.prop_action, {
            prop_id: this.equip_info.equip_id,
            prop_num: this.equip_info.equip_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    EquipItem = __decorate([
        ccclass
    ], EquipItem);
    return EquipItem;
}(cc.Component));
exports.default = EquipItem;

cc._RF.pop();