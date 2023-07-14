
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Prop/PropInfoUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcEluZm9VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsb0NBQTBDO0FBQzFDLG9FQUErRDtBQUMvRCwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLDZDQUE0QztBQUM1QywyQ0FBNEQ7QUFDNUQsMENBQXFDO0FBQ3JDLG9EQUErQztBQUMvQyw2REFBbUU7QUFHN0QsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVc7SUFBbkQ7UUFBQSxxRUFrV0M7UUFoV0csZUFBUyxHQUFVLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFZLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBRXZDLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIsa0JBQVksR0FBVSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBVSxJQUFJLENBQUM7O1FBeVYzQixpQkFBaUI7SUFDckIsQ0FBQztJQXhWVSxpQ0FBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRU0saUNBQVksR0FBbkIsVUFBb0IsUUFBaUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw2QkFBUSxHQUFSLFVBQVMsSUFBYSxFQUFDLE1BQWlCO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxFQUFFLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLFFBQVEsR0FBQyxrQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUk7UUFDSixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFJLE9BQU8sR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxNQUFNO1FBQ04sSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxTQUFTLEdBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3RCxJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUUsQ0FBQyxFQUFDO1lBQ2hCLElBQUksUUFBUSxHQUFDLEVBQUUsQ0FBQztZQUNoQixJQUFJLEtBQUssR0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBRyxLQUFLLEdBQUMsQ0FBQyxFQUFDO2dCQUNQLFFBQVEsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sR0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNqRCxTQUFTLEdBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsT0FBTyxDQUFDO1FBQy9DLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSTtRQUNKLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDakUsSUFBSTtRQUNKLElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUMsdUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFDLHVCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQzVDLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxDQUFDO1lBQ2hDLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSxDQUFDLEVBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUE7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUE7YUFDdkM7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQTtnQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQTthQUN2QztTQUNKO1FBRUQsUUFBTyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ3BCLEtBQUssdUJBQVUsQ0FBQyxHQUFHO2dCQUFDO29CQUNoQixJQUFJO29CQUNKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDckI7Z0JBQUEsTUFBTTtZQUNQLEtBQUssdUJBQVUsQ0FBQyxHQUFHO2dCQUFDO29CQUNoQixJQUFJO29CQUNKLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9ELElBQUksR0FBRyxHQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNsRixRQUFRO29CQUNSLElBQUksTUFBTSxHQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNDLElBQUksUUFBUSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7b0JBQzFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ25KO2dCQUFBLE1BQU07U0FDVjtJQUNMLENBQUM7SUFFRCxRQUFRO0lBQ1IsK0JBQVUsR0FBVjtRQUNJLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksT0FBTyxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDekQsQ0FBQztJQUVELGlDQUFZLEdBQVosVUFBYSxPQUFrQjtRQUMzQixJQUFJLEdBQUcsR0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2hDLElBQUcsR0FBRyxFQUFDO1lBQ0gsSUFBRyxHQUFHLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUM7Z0JBQzNCLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUMvQjtZQUNELElBQUcsR0FBRyxHQUFDLENBQUMsRUFBQztnQkFDTCxHQUFHLEdBQUMsQ0FBQyxDQUFDO2FBQ1Q7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFBSTtZQUNELElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxPQUFrQjtRQUMxQixPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBWSxHQUFaO1FBQ0ksSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JCLElBQUksUUFBUSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsZ0NBQVcsR0FBWDtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUcsR0FBRyxJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUMvQjtZQUNJLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsZ0NBQVcsR0FBWDtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUcsR0FBRyxJQUFFLENBQUMsRUFDVDtZQUNJLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBR0QsZ0NBQVcsR0FBWDtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQy9GLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEYsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDNUMsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO2dCQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFDRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztTQUNuQjthQUFJO1lBQ0QscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMvRjtJQUNMLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQztZQUMxQixLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDekQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25FLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFFBQVE7b0JBQ1IsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztvQkFDaEYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO29CQUNoRix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pELElBQUksSUFBSSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUM7Z0JBQUEsTUFBTTtZQUNQLEtBQUssS0FBSztnQkFBQztvQkFDUCxRQUFRO29CQUNSLElBQUksR0FBRyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7b0JBQ2hGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDekQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25FLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFNBQVM7b0JBQ1QsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztvQkFDakYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsVUFBVTtvQkFDVixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9FLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFVBQVU7b0JBQ1YsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztvQkFDakYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsVUFBVTtvQkFDVixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO29CQUNqRix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVELElBQUksSUFBSSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0RSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUM7Z0JBQUEsTUFBTTtZQUNQLEtBQUssS0FBSztnQkFBQztvQkFDUCxVQUFVO29CQUNWLElBQUksR0FBRyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7b0JBQ2pGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFdBQVc7b0JBQ1gsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztvQkFDbEYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2pGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxTQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFFBQVE7b0JBQ1IsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztvQkFDbkYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsU0FBUyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO29CQUNuRix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxTQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlELElBQUksSUFBSSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsU0FBUyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4RSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUM7Z0JBQUEsTUFBTTtZQUNQLEtBQUssS0FBSztnQkFBQztvQkFDUCxRQUFRO29CQUNSLElBQUksR0FBRyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7b0JBQ25GLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxTQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFNBQVM7b0JBQ1QsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztvQkFDcEYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsU0FBUyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2xGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFFBQVE7b0JBQ1IsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztvQkFDcEYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDekUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07WUFDUCxLQUFLLEtBQUs7Z0JBQUM7b0JBQ1AsUUFBUTtvQkFDUixJQUFJLEdBQUcsR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO29CQUNwRix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9ELElBQUksSUFBSSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUM7Z0JBQUEsTUFBTTtZQUNQLEtBQUssS0FBSztnQkFBQztvQkFDUCxRQUFRO29CQUNSLElBQUksR0FBRyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7b0JBQ3BGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxLQUFLO2dCQUFDO29CQUNQLFNBQVM7b0JBQ1QsSUFBSSxHQUFHLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztvQkFDckYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBTSxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDekUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLE1BQU07U0FDVjtRQUNELElBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztZQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsa0NBQWEsR0FBYjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUEvVmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FrVzlCO0lBQUQsaUJBQUM7Q0FsV0QsQUFrV0MsQ0FsV3VDLHFCQUFXLEdBa1dsRDtrQkFsV29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9JdGVtXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BEYXRhLCBQcm9wSWQgfSBmcm9tIFwiLi9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgUHJlc3NCdXR0b24gZnJvbSBcIi4uL1Rvb2xzL1ByZXNzQnV0dG9uXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvcEluZm9VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcm9wX2RhdGE6UHJvcERhdGE9bnVsbDtcclxuICAgIHByb3BfYWN0aW9uOlByb3BBY3Rpb249UHJvcEFjdGlvbi5OdWxsO1xyXG5cclxuICAgIHVzZV9udW06bnVtYmVyPTE7XHJcblxyXG4gICAgYnV5X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICB1c2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgYWRkQnV5TGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5idXlfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFVzZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMudXNlX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaWQg6YGT5YW3aWRcclxuICAgICAqIEBwYXJhbSBwcm9wQWMg6YGT5YW355qE6KGM5Li677yM5p+l55yLL+S9v+eUqC/otK3kubAv562JXHJcbiAgICAgKi9cclxuICAgIGluaXREYXRhKGRhdGE6UHJvcERhdGEscHJvcEFjOlByb3BBY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucHJvcF9kYXRhPWRhdGE7XHJcbiAgICAgICAgdGhpcy5wcm9wX2FjdGlvbj1wcm9wQWM7XHJcbiAgICAgICAgdGhpcy51c2VfbnVtPXRoaXMucHJvcF9kYXRhLnByb3BfbnVtO1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpICgpIHtcclxuICAgICAgICBsZXQgTE09TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLDAsUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICBsZXQgcHJvcFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wUm9vdCcpO1xyXG4gICAgICAgIHByb3BSb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkl0ZW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCk7XHJcbiAgICAgICAgLy/lkI3np7BcclxuICAgICAgICBsZXQgcHJvcE5hbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wTmFtZScpO1xyXG4gICAgICAgIGxldCBuYW1lU3RyPUxNLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLk5hbWVUZXh0SWQpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvL+WGheWuueaPj+i/sFxyXG4gICAgICAgIGxldCBwcm9wRGV0YWlsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcERldGFpbCcpO1xyXG4gICAgICAgIGxldCBkZXRhaWxTdHI9TE0uZ2V0U3RyQnlUZXh0SWQoanNvbkRhdGEuRGlzY3JpcGl0aW9uVGV4dElkKTsgIFxyXG4gICAgICAgIGlmKGpzb25EYXRhLlR5cGU9PTUpe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVTdHI9MjQ7XHJcbiAgICAgICAgICAgIGxldCB5dXNodT1qc29uRGF0YS5JdGVtSUQlMTAtMTtcclxuICAgICAgICAgICAgaWYoeXVzaHU8NCl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVN0cj1NYXRoLnBvdygyLHl1c2h1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuYW1lU3RyPW5hbWVTdHIucmVwbGFjZSgnficsdmFsdWVTdHIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGRldGFpbFN0cj1kZXRhaWxTdHIucmVwbGFjZSgnficsdmFsdWVTdHIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPW5hbWVTdHI7XHJcbiAgICAgICAgcHJvcERldGFpbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1kZXRhaWxTdHI7XHJcbiAgICAgICAgLy/mlbDph49cclxuICAgICAgICBsZXQgcHJvcE51bT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BOdW0nKTtcclxuICAgICAgICBwcm9wTnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPScnK3RoaXMucHJvcF9kYXRhLnByb3BfbnVtO1xyXG4gICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZUxhYmVsJyk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MTS5nZXRTdHJCeVRleHRJZCgxMDAwNDApO1xyXG4gICAgICAgIHRoaXMuc2hvd0FjaXRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBY2l0b24oKXtcclxuICAgICAgICBmb3IobGV0IGk9UHJvcEFjdGlvbi5Vc2U7IGk8UHJvcEFjdGlvbi5OdW07IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWN0aW9uJytpKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmU9dGhpcy5wcm9wX2FjdGlvbj09aTtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wX2FjdGlvbj09aSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYmdcIikuaGVpZ2h0PTY0OVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmJnXCIpLnk9MzJcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYmdcIikuaGVpZ2h0PTU4MFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmJnXCIpLnk9NjlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2godGhpcy5wcm9wX2FjdGlvbil7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcEFjdGlvbi5Vc2U6e1xyXG4gICAgICAgICAgICAgICAgLy/mlbDph49cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc051bSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcEFjdGlvbi5CdXk6e1xyXG4gICAgICAgICAgICAgICAgLy/ku7fmoLxcclxuICAgICAgICAgICAgICAgIGxldCBhY1Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdhY3Rpb24nK3RoaXMucHJvcF9hY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1hY1Jvb3QuZ2V0Q2hpbGRCeU5hbWUoJ251bScpO1xyXG4gICAgICAgICAgICAgICAgbnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPU15VG9vbC5nZXRDb2luRGFud2VpKHRoaXMucHJvcF9kYXRhLnByb3BfcHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgLy/mjInpkq7og73lkKbngrnlh7tcclxuICAgICAgICAgICAgICAgIGxldCBidG5ZZXM9YWNSb290LmdldENoaWxkQnlOYW1lKCdidG5ZZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0NhbkJ1eT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9jb3N0X2lkKT49dGhpcy5wcm9wX2RhdGEucHJvcF9wcmljZTtcclxuICAgICAgICAgICAgICAgIGJ0blllcy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9aXNDYW5CdXk7XHJcbiAgICAgICAgICAgICAgICBhY1Jvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9cIiArIHRoaXMucHJvcF9kYXRhLnByb3BfY29zdF9pZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrotYTmupDmlbDph49cclxuICAgIHNob3dSZXNOdW0oKXtcclxuICAgICAgICBsZXQgYWN0aW9uMj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2FjdGlvbjInKTtcclxuICAgICAgICBsZXQgZWRpdGJveD1hY3Rpb24yLmdldENoaWxkQnlOYW1lKCdlZGl0Ym94Jyk7XHJcbiAgICAgICAgbGV0IG5ld051bT1lZGl0Ym94LmdldENoaWxkQnlOYW1lKCduZXdOdW0nKVxyXG4gICAgICAgIG5ld051bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK3RoaXMudXNlX251bTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25FZGl0RmluaXNoKGVkaXRib3g6Y2MuRWRpdEJveCl7XHJcbiAgICAgICAgbGV0IG51bT1wYXJzZUludChlZGl0Ym94LnN0cmluZylcclxuICAgICAgICBpZihudW0pe1xyXG4gICAgICAgICAgICBpZihudW0+dGhpcy5wcm9wX2RhdGEucHJvcF9udW0pe1xyXG4gICAgICAgICAgICAgICAgbnVtPXRoaXMucHJvcF9kYXRhLnByb3BfbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG51bTwxKXtcclxuICAgICAgICAgICAgICAgIG51bT0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXNlX251bT1udW07XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc051bSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9udW09MTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzTnVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRWRpdFN0YXJ0KGVkaXRib3g6Y2MuRWRpdEJveCl7XHJcbiAgICAgICAgZWRpdGJveC5zdHJpbmc9dGhpcy51c2VfbnVtKycnO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN1YkFkZEJ0bigpe1xyXG4gICAgICAgIGxldCBhY3Rpb24yPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWN0aW9uMicpO1xyXG4gICAgICAgIGxldCBidG5BZGQ9YWN0aW9uMi5nZXRDaGlsZEJ5TmFtZSgnYnRuQWRkJyk7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLnVzZV9udW07XHJcbiAgICAgICAgbGV0IGlzQ2FuQWRkPW51bTx0aGlzLnByb3BfZGF0YS5wcm9wX251bTtcclxuICAgICAgICBidG5BZGQuZ2V0Q29tcG9uZW50KFByZXNzQnV0dG9uKS5zZXRJc0NhblByZXNzKGlzQ2FuQWRkKTtcclxuICAgICAgICBsZXQgYnRuU3ViPWFjdGlvbjIuZ2V0Q2hpbGRCeU5hbWUoJ2J0blN1YicpO1xyXG4gICAgICAgIG51bT10aGlzLnVzZV9udW07XHJcbiAgICAgICAgbGV0IGlzQ2FuU3ViPW51bT4xO1xyXG4gICAgICAgIGJ0blN1Yi5nZXRDb21wb25lbnQoUHJlc3NCdXR0b24pLnNldElzQ2FuUHJlc3MoaXNDYW5TdWIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQWRkKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spOyAgICAgICAgXHJcbiAgICAgICAgbGV0IG51bT10aGlzLnVzZV9udW0rMTtcclxuICAgICAgICBpZihudW08PXRoaXMucHJvcF9kYXRhLnByb3BfbnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VfbnVtPW51bTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzTnVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3ViQWRkQnRuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuU3ViKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBudW09dGhpcy51c2VfbnVtLTE7XHJcbiAgICAgICAgaWYobnVtPj0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VfbnVtPW51bTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzTnVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3ViQWRkQnRuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjbGlja0J0bkJ1eSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9jb3N0X2lkLC10aGlzLnByb3BfZGF0YS5wcm9wX3ByaWNlKSl7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLHRoaXMucHJvcF9kYXRhLnByb3BfbnVtKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLHRoaXMucHJvcF9kYXRhLnByb3BfbnVtKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYnV5X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA0MSkpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVXNlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5wcm9wX2RhdGEucHJvcF9pZCl7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMTE6e1xyXG4gICAgICAgICAgICAgICAgLy/ph5HluIHmjILmnLoqMVxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lUmV3YXJkNjAoKSp0aGlzLnVzZV9udW07ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUwMDEyOntcclxuICAgICAgICAgICAgICAgIC8v6YeR5biB5oyC5py6KjJcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZVJld2FyZDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMTM6e1xyXG4gICAgICAgICAgICAgICAgLy/ph5HluIHmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lUmV3YXJkNjAoKSp0aGlzLnVzZV9udW0qNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAxNDp7XHJcbiAgICAgICAgICAgICAgICAvL+mHkeW4geaMguacuio4XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVSZXdhcmQ2MCgpKnRoaXMudXNlX251bSo4O1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUwMDE1OntcclxuICAgICAgICAgICAgICAgIC8v6YeR5biB5oyC5py6KjI0XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVSZXdhcmQ2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAyMTp7XHJcbiAgICAgICAgICAgICAgICAvL+iLsembhOe7j+mqjOaMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVIZXJvRXhwNjAoKSp0aGlzLnVzZV9udW07XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjI6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjM6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjQ7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjQ6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjg7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjU6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUhlcm9FeHA2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvRXhwLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5IZXJvRXhwLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAzMTp7XHJcbiAgICAgICAgICAgICAgICAvL+mtguefs+aMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVIZXJvU3RvbmU2MCgpKnRoaXMudXNlX251bTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzI6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qMjtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzM6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzQ6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qODtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzU6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUhlcm9TdG9uZTYwKCkqdGhpcy51c2VfbnVtKjI0O1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb1N0b25lLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDA0MTp7XHJcbiAgICAgICAgICAgICAgICAvL+WFveeyruaMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVBbmltYWxGb29kNjAoKSp0aGlzLnVzZV9udW07XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDI6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDM6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjQ7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDQ6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjg7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDU6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUFuaW1hbEZvb2Q2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5BbmltYWxGb29kLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5BbmltYWxGb29kLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy51c2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19