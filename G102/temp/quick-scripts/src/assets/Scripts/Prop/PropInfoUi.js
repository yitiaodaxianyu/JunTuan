"use strict";
cc._RF.push(module, '72d747omMJB8osy4BaV7drt', 'PropInfoUi');
// Scripts/Prop/PropInfoUi.ts

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
var Item_1 = require("./Data/Item");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var PropManager_1 = require("./PropManager");
var PropConfig_1 = require("./PropConfig");
var MyTool_1 = require("../Tools/MyTool");
var PressButton_1 = require("../Tools/PressButton");
var OfflineRevenue_1 = require("../JsonData/OfflineRevenue");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropInfoUi = /** @class */ (function (_super) {
    __extends(PropInfoUi, _super);
    function PropInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop_data = null;
        _this.prop_action = PropConfig_1.PropAction.Null;
        _this.use_num = 1;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
        // update (dt) {}
    }
    PropInfoUi.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    PropInfoUi.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    /**
     *
     * @param id 道具id
     * @param propAc 道具的行为，查看/使用/购买/等
     */
    PropInfoUi.prototype.initData = function (data, propAc) {
        this.prop_data = data;
        this.prop_action = propAc;
        this.use_num = this.prop_data.prop_num;
        this.initUi();
    };
    PropInfoUi.prototype.initUi = function () {
        var LM = LanguageManager_1.default.getInstance();
        var item = PropManager_1.PropManager.getInstance().createPropItem(this.prop_data.prop_id, 0, PropConfig_1.PropAction.Null);
        var propRoot = this.node.getChildByName('propRoot');
        propRoot.addChild(item);
        item.setPosition(cc.v2(0, 0));
        var jsonData = Item_1.ItemManager.getInstance().getJsonItem(this.prop_data.prop_id);
        //名称
        var propName = this.node.getChildByName('propName');
        var nameStr = LM.getStrByTextId(jsonData.NameTextId);
        //内容描述
        var propDetail = this.node.getChildByName('propDetail');
        var detailStr = LM.getStrByTextId(jsonData.DiscripitionTextId);
        if (jsonData.Type == 5) {
            var valueStr = 24;
            var yushu = jsonData.ItemID % 10 - 1;
            if (yushu < 4) {
                valueStr = Math.pow(2, yushu);
            }
            nameStr = nameStr.replace('~', valueStr.toString());
            detailStr = detailStr.replace('~', valueStr.toString());
        }
        propName.getComponent(cc.Label).string = nameStr;
        propDetail.getComponent(cc.Label).string = detailStr;
        //数量
        var propNum = this.node.getChildByName('propNum');
        propNum.getComponent(cc.Label).string = '' + this.prop_data.prop_num;
        //标题
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LM.getStrByTextId(100040);
        this.showAciton();
    };
    PropInfoUi.prototype.showAciton = function () {
        for (var i = PropConfig_1.PropAction.Use; i < PropConfig_1.PropAction.Num; i++) {
            var node = this.node.getChildByName('action' + i);
            node.active = this.prop_action == i;
            if (this.prop_action == i) {
                this.node.getChildByName("bbg").height = 649;
                this.node.getChildByName("bbg").y = 32;
            }
            else {
                this.node.getChildByName("bbg").height = 580;
                this.node.getChildByName("bbg").y = 69;
            }
        }
        switch (this.prop_action) {
            case PropConfig_1.PropAction.Use:
                {
                    //数量
                    this.showResNum();
                }
                break;
            case PropConfig_1.PropAction.Buy:
                {
                    //价格
                    var acRoot = this.node.getChildByName('action' + this.prop_action);
                    var num = acRoot.getChildByName('num');
                    num.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(this.prop_data.prop_price);
                    //按钮能否点击
                    var btnYes = acRoot.getChildByName('btnYes');
                    var isCanBuy = PropManager_1.PropManager.getInstance().getPropNum(this.prop_data.prop_cost_id) >= this.prop_data.prop_price;
                    btnYes.getComponent(cc.Button).interactable = isCanBuy;
                    acRoot.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_" + this.prop_data.prop_cost_id);
                }
                break;
        }
    };
    //显示资源数量
    PropInfoUi.prototype.showResNum = function () {
        var action2 = this.node.getChildByName('action2');
        var editbox = action2.getChildByName('editbox');
        var newNum = editbox.getChildByName('newNum');
        newNum.getComponent(cc.Label).string = "" + this.use_num;
    };
    PropInfoUi.prototype.onEditFinish = function (editbox) {
        var num = parseInt(editbox.string);
        if (num) {
            if (num > this.prop_data.prop_num) {
                num = this.prop_data.prop_num;
            }
            if (num < 1) {
                num = 1;
            }
            this.use_num = num;
            this.showResNum();
        }
        else {
            this.use_num = 1;
            this.showResNum();
        }
    };
    PropInfoUi.prototype.onEditStart = function (editbox) {
        editbox.string = this.use_num + '';
    };
    PropInfoUi.prototype.setSubAddBtn = function () {
        var action2 = this.node.getChildByName('action2');
        var btnAdd = action2.getChildByName('btnAdd');
        var num = this.use_num;
        var isCanAdd = num < this.prop_data.prop_num;
        btnAdd.getComponent(PressButton_1.default).setIsCanPress(isCanAdd);
        var btnSub = action2.getChildByName('btnSub');
        num = this.use_num;
        var isCanSub = num > 1;
        btnSub.getComponent(PressButton_1.default).setIsCanPress(isCanSub);
    };
    PropInfoUi.prototype.clickBtnAdd = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var num = this.use_num + 1;
        if (num <= this.prop_data.prop_num) {
            this.use_num = num;
            this.showResNum();
            this.setSubAddBtn();
        }
    };
    PropInfoUi.prototype.clickBtnSub = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var num = this.use_num - 1;
        if (num >= 1) {
            this.use_num = num;
            this.showResNum();
            this.setSubAddBtn();
        }
    };
    PropInfoUi.prototype.clickBtnBuy = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_cost_id, -this.prop_data.prop_price)) {
            PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, this.prop_data.prop_num);
            var item = PropManager_1.PropManager.getInstance().createPropItem(this.prop_data.prop_id, this.prop_data.prop_num);
            GameManager_1.default.getInstance().showGetTip(item);
            GameManager_1.default.getInstance().refreshGemShow();
            GameManager_1.default.getInstance().refreshCoinShow();
            if (this.buy_callback) {
                this.buy_callback();
            }
            _super.prototype.onClose.call(this);
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
        }
    };
    PropInfoUi.prototype.clickBtnUse = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.prop_data.prop_id) {
            case 50011:
                {
                    //金币挂机*1
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineReward60() * this.use_num;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50012:
                {
                    //金币挂机*2
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineReward60() * this.use_num * 2;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50013:
                {
                    //金币挂机*4
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineReward60() * this.use_num * 4;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50014:
                {
                    //金币挂机*8
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineReward60() * this.use_num * 8;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50015:
                {
                    //金币挂机*24
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineReward60() * this.use_num * 24;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50021:
                {
                    //英雄经验挂机*1
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroExp60() * this.use_num;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroExp, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50022:
                {
                    //英雄经验挂机*2
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroExp60() * this.use_num * 2;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroExp, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50023:
                {
                    //英雄经验挂机*4
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroExp60() * this.use_num * 4;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroExp, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50024:
                {
                    //英雄经验挂机*8
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroExp60() * this.use_num * 8;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroExp, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50025:
                {
                    //英雄经验挂机*24
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroExp60() * this.use_num * 24;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroExp, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50031:
                {
                    //魂石挂机*1
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroStone60() * this.use_num;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroStone, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50032:
                {
                    //魂石挂机*2
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroStone60() * this.use_num * 2;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroStone, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50033:
                {
                    //魂石挂机*4
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroStone60() * this.use_num * 4;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroStone, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50034:
                {
                    //魂石挂机*8
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroStone60() * this.use_num * 8;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroStone, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50035:
                {
                    //魂石挂机*24
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineHeroStone60() * this.use_num * 24;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.HeroStone, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50041:
                {
                    //兽粮挂机*1
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineAnimalFood60() * this.use_num;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.AnimalFood, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50042:
                {
                    //兽粮挂机*2
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineAnimalFood60() * this.use_num * 2;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.AnimalFood, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50043:
                {
                    //兽粮挂机*4
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineAnimalFood60() * this.use_num * 4;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.AnimalFood, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50044:
                {
                    //兽粮挂机*8
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineAnimalFood60() * this.use_num * 8;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.AnimalFood, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
            case 50045:
                {
                    //兽粮挂机*24
                    var num = OfflineRevenue_1.OfflineRevenueManager.getInstance().getOfflineAnimalFood60() * this.use_num * 24;
                    PropManager_1.PropManager.getInstance().changePropNum(this.prop_data.prop_id, -this.use_num);
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.AnimalFood, num);
                    var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.AnimalFood, num);
                    GameManager_1.default.getInstance().showGetTip(item);
                }
                break;
        }
        if (this.use_callback) {
            this.use_callback();
        }
        _super.prototype.onClose.call(this);
    };
    PropInfoUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    PropInfoUi = __decorate([
        ccclass
    ], PropInfoUi);
    return PropInfoUi;
}(UIComponent_1.default));
exports.default = PropInfoUi;

cc._RF.pop();