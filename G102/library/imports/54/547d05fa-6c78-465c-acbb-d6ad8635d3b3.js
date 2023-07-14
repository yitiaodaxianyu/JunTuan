"use strict";
cc._RF.push(module, '547d0X6bHhGXKy71q2GNdOz', 'Shop');
// Scripts/copy/endlesschallenges/Shop.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var RogueShop_1 = require("./RogueShop");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null; //物品的父节点
        _this.num = null; //虚空金币的数量
        _this.Maze_Shop_Bg_1 = null; //虚空商品的预制体
        _this.item = []; //生成的节点
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    Shop.prototype.initUi = function () {
        var _this = this;
        var max = RogueShop_1.RogueShopManager.getMaxShowLoacl();
        this.Refresh();
        var _loop_1 = function (index) {
            var id = index + 1;
            var myitem = cc.instantiate(this_1.Maze_Shop_Bg_1);
            var name = myitem.getChildByName("name");
            var num = myitem.getChildByName("num");
            var item = myitem.getChildByName("item");
            var prop_id = RogueShop_1.RogueShopManager.getInstance().getProp_ID(id);
            num.getComponent(cc.Label).string = "" + RogueShop_1.RogueShopManager.getInstance().getCostNum(id);
            name.getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(prop_id));
            var itemnode = PropManager_1.PropManager.getInstance().createPropItem(prop_id, RogueShop_1.RogueShopManager.getInstance().getProp_Num(id));
            itemnode.scale = 0.6;
            itemnode.parent = item;
            myitem.on(cc.Node.EventType.TOUCH_END, (function () {
                _this.clickBtnitem(id);
            }), this_1);
            myitem.active = true;
            myitem.parent = this_1.content;
            this_1.item.push(myitem);
        };
        var this_1 = this;
        for (var index = this.item.length; index < max; index++) {
            _loop_1(index);
        }
    };
    Shop.prototype.clickBtnitem = function (id) {
        var MazeCoin = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.MazeCoin);
        var CostNum = RogueShop_1.RogueShopManager.getInstance().getCostNum(id);
        if (MazeCoin >= CostNum) {
            // 可以购买
            var prop_id = RogueShop_1.RogueShopManager.getInstance().getProp_ID(id);
            var Prop_Num = RogueShop_1.RogueShopManager.getInstance().getProp_Num(id);
            var itemnode = PropManager_1.PropManager.getInstance().createPropItem(prop_id, Prop_Num);
            PropManager_1.PropManager.getInstance().changePropNum(prop_id, Prop_Num);
            GameManager_1.default.getInstance().showGetTip(itemnode);
            // MazeCoin-=CostNum
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.MazeCoin, -CostNum);
            this.Refresh();
        }
        else {
            // 虚空裂缝金币不足
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(830030), 3);
        }
    };
    Shop.prototype.Refresh = function () {
        var MazeCoin = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.MazeCoin);
        this.num.getComponent(cc.Label).string = "" + MazeCoin;
    };
    Shop.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "num", void 0);
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "Maze_Shop_Bg_1", void 0);
    Shop = __decorate([
        ccclass
    ], Shop);
    return Shop;
}(UIComponent_1.default));
exports.default = Shop;

cc._RF.pop();