
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
var Turmtable_1 = require("../Turntable/Turmtable");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
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
            //GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                    uiNode.getComponent(Turmtable_1.default).initUi();
                }, }); //转盘
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcEluZm9VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsb0NBQTBDO0FBQzFDLG9FQUErRDtBQUMvRCwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLDZDQUE0QztBQUM1QywyQ0FBNEQ7QUFDNUQsMENBQXFDO0FBQ3JDLG9EQUErQztBQUMvQyw2REFBbUU7QUFDbkUsb0RBQStDO0FBQy9DLDJDQUFzRDtBQUN0RCw2Q0FBNEM7QUFHdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVc7SUFBbkQ7UUFBQSxxRUFxV0M7UUFuV0csZUFBUyxHQUFVLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFZLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBRXZDLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIsa0JBQVksR0FBVSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBVSxJQUFJLENBQUM7O1FBNFYzQixpQkFBaUI7SUFDckIsQ0FBQztJQTNWVSxpQ0FBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRU0saUNBQVksR0FBbkIsVUFBb0IsUUFBaUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw2QkFBUSxHQUFSLFVBQVMsSUFBYSxFQUFDLE1BQWlCO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFD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QUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7b0JBQ3JGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QztnQkFBQSxNQUFNO1NBQ1Y7UUFDRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBbFdnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBcVc5QjtJQUFELGlCQUFDO0NBcldELEFBcVdDLENBcld1QyxxQkFBVyxHQXFXbEQ7a0JBcldvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJdGVtTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvSXRlbVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wRGF0YSwgUHJvcElkIH0gZnJvbSBcIi4vUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFByZXNzQnV0dG9uIGZyb20gXCIuLi9Ub29scy9QcmVzc0J1dHRvblwiO1xyXG5pbXBvcnQgeyBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvT2ZmbGluZVJldmVudWVcIjtcclxuaW1wb3J0IFR1cm10YWJsZSBmcm9tIFwiLi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wSW5mb1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIHByb3BfZGF0YTpQcm9wRGF0YT1udWxsO1xyXG4gICAgcHJvcF9hY3Rpb246UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLk51bGw7XHJcblxyXG4gICAgdXNlX251bTpudW1iZXI9MTtcclxuXHJcbiAgICBidXlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHVzZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBhZGRCdXlMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmJ1eV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVXNlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51c2VfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpZCDpgZPlhbdpZFxyXG4gICAgICogQHBhcmFtIHByb3BBYyDpgZPlhbfnmoTooYzkuLrvvIzmn6XnnIsv5L2/55SoL+i0reS5sC/nrYlcclxuICAgICAqL1xyXG4gICAgaW5pdERhdGEoZGF0YTpQcm9wRGF0YSxwcm9wQWM6UHJvcEFjdGlvbil7XHJcbiAgICAgICAgdGhpcy5wcm9wX2RhdGE9ZGF0YTtcclxuICAgICAgICB0aGlzLnByb3BfYWN0aW9uPXByb3BBYztcclxuICAgICAgICB0aGlzLnVzZV9udW09dGhpcy5wcm9wX2RhdGEucHJvcF9udW07XHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkgKCkge1xyXG4gICAgICAgIGxldCBMTT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsMCxQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgIGxldCBwcm9wUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BSb290Jyk7XHJcbiAgICAgICAgcHJvcFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSXRlbSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkKTtcclxuICAgICAgICAvL+WQjeensFxyXG4gICAgICAgIGxldCBwcm9wTmFtZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BOYW1lJyk7XHJcbiAgICAgICAgbGV0IG5hbWVTdHI9TE0uZ2V0U3RyQnlUZXh0SWQoanNvbkRhdGEuTmFtZVRleHRJZCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8v5YaF5a655o+P6L+wXHJcbiAgICAgICAgbGV0IHByb3BEZXRhaWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wRGV0YWlsJyk7XHJcbiAgICAgICAgbGV0IGRldGFpbFN0cj1MTS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5EaXNjcmlwaXRpb25UZXh0SWQpOyAgXHJcbiAgICAgICAgaWYoanNvbkRhdGEuVHlwZT09NSl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVN0cj0yNDtcclxuICAgICAgICAgICAgbGV0IHl1c2h1PWpzb25EYXRhLkl0ZW1JRCUxMC0xO1xyXG4gICAgICAgICAgICBpZih5dXNodTw0KXtcclxuICAgICAgICAgICAgICAgIHZhbHVlU3RyPU1hdGgucG93KDIseXVzaHUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5hbWVTdHI9bmFtZVN0ci5yZXBsYWNlKCd+Jyx2YWx1ZVN0ci50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGV0YWlsU3RyPWRldGFpbFN0ci5yZXBsYWNlKCd+Jyx2YWx1ZVN0ci50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvcE5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bmFtZVN0cjtcclxuICAgICAgICBwcm9wRGV0YWlsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRldGFpbFN0cjtcclxuICAgICAgICAvL+aVsOmHj1xyXG4gICAgICAgIGxldCBwcm9wTnVtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcE51bScpO1xyXG4gICAgICAgIHByb3BOdW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9JycrdGhpcy5wcm9wX2RhdGEucHJvcF9udW07XHJcbiAgICAgICAgLy/moIfpophcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxNLmdldFN0ckJ5VGV4dElkKDEwMDA0MCk7XHJcbiAgICAgICAgdGhpcy5zaG93QWNpdG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FjaXRvbigpe1xyXG4gICAgICAgIGZvcihsZXQgaT1Qcm9wQWN0aW9uLlVzZTsgaTxQcm9wQWN0aW9uLk51bTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdhY3Rpb24nK2kpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZT10aGlzLnByb3BfYWN0aW9uPT1pO1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BfYWN0aW9uPT1pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS5oZWlnaHQ9NjQ5XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYmdcIikueT0zMlxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS5oZWlnaHQ9NTgwXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYmdcIikueT02OVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCh0aGlzLnByb3BfYWN0aW9uKXtcclxuICAgICAgICAgICAgY2FzZSBQcm9wQWN0aW9uLlVzZTp7XHJcbiAgICAgICAgICAgICAgICAvL+aVsOmHj1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzTnVtKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9wQWN0aW9uLkJ1eTp7XHJcbiAgICAgICAgICAgICAgICAvL+S7t+agvFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2FjdGlvbicrdGhpcy5wcm9wX2FjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPWFjUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbnVtJyk7XHJcbiAgICAgICAgICAgICAgICBudW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkodGhpcy5wcm9wX2RhdGEucHJvcF9wcmljZSk7XHJcbiAgICAgICAgICAgICAgICAvL+aMiemSruiDveWQpueCueWHu1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0blllcz1hY1Jvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2J0blllcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzQ2FuQnV5PVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2Nvc3RfaWQpPj10aGlzLnByb3BfZGF0YS5wcm9wX3ByaWNlO1xyXG4gICAgICAgICAgICAgICAgYnRuWWVzLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1pc0NhbkJ1eTtcclxuICAgICAgICAgICAgICAgIGFjUm9vdC5nZXRDaGlsZEJ5TmFtZShcImdlbVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX1wiICsgdGhpcy5wcm9wX2RhdGEucHJvcF9jb3N0X2lkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuui1hOa6kOaVsOmHj1xyXG4gICAgc2hvd1Jlc051bSgpe1xyXG4gICAgICAgIGxldCBhY3Rpb24yPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWN0aW9uMicpO1xyXG4gICAgICAgIGxldCBlZGl0Ym94PWFjdGlvbjIuZ2V0Q2hpbGRCeU5hbWUoJ2VkaXRib3gnKTtcclxuICAgICAgICBsZXQgbmV3TnVtPWVkaXRib3guZ2V0Q2hpbGRCeU5hbWUoJ25ld051bScpXHJcbiAgICAgICAgbmV3TnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrdGhpcy51c2VfbnVtOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkVkaXRGaW5pc2goZWRpdGJveDpjYy5FZGl0Qm94KXtcclxuICAgICAgICBsZXQgbnVtPXBhcnNlSW50KGVkaXRib3guc3RyaW5nKVxyXG4gICAgICAgIGlmKG51bSl7XHJcbiAgICAgICAgICAgIGlmKG51bT50aGlzLnByb3BfZGF0YS5wcm9wX251bSl7XHJcbiAgICAgICAgICAgICAgICBudW09dGhpcy5wcm9wX2RhdGEucHJvcF9udW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtPDEpe1xyXG4gICAgICAgICAgICAgICAgbnVtPTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51c2VfbnVtPW51bTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzTnVtKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudXNlX251bT0xO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXNOdW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FZGl0U3RhcnQoZWRpdGJveDpjYy5FZGl0Qm94KXtcclxuICAgICAgICBlZGl0Ym94LnN0cmluZz10aGlzLnVzZV9udW0rJyc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3ViQWRkQnRuKCl7XHJcbiAgICAgICAgbGV0IGFjdGlvbjI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdhY3Rpb24yJyk7XHJcbiAgICAgICAgbGV0IGJ0bkFkZD1hY3Rpb24yLmdldENoaWxkQnlOYW1lKCdidG5BZGQnKTtcclxuICAgICAgICBsZXQgbnVtPXRoaXMudXNlX251bTtcclxuICAgICAgICBsZXQgaXNDYW5BZGQ9bnVtPHRoaXMucHJvcF9kYXRhLnByb3BfbnVtO1xyXG4gICAgICAgIGJ0bkFkZC5nZXRDb21wb25lbnQoUHJlc3NCdXR0b24pLnNldElzQ2FuUHJlc3MoaXNDYW5BZGQpO1xyXG4gICAgICAgIGxldCBidG5TdWI9YWN0aW9uMi5nZXRDaGlsZEJ5TmFtZSgnYnRuU3ViJyk7XHJcbiAgICAgICAgbnVtPXRoaXMudXNlX251bTtcclxuICAgICAgICBsZXQgaXNDYW5TdWI9bnVtPjE7XHJcbiAgICAgICAgYnRuU3ViLmdldENvbXBvbmVudChQcmVzc0J1dHRvbikuc2V0SXNDYW5QcmVzcyhpc0NhblN1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BZGQoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBsZXQgbnVtPXRoaXMudXNlX251bSsxO1xyXG4gICAgICAgIGlmKG51bTw9dGhpcy5wcm9wX2RhdGEucHJvcF9udW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9udW09bnVtO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXNOdW0oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdWJBZGRCdG4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TdWIoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLnVzZV9udW0tMTtcclxuICAgICAgICBpZihudW0+PTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9udW09bnVtO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXNOdW0oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdWJBZGRCdG4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsaWNrQnRuQnV5KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2Nvc3RfaWQsLXRoaXMucHJvcF9kYXRhLnByb3BfcHJpY2UpKXtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsdGhpcy5wcm9wX2RhdGEucHJvcF9udW0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsdGhpcy5wcm9wX2RhdGEucHJvcF9udW0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgaWYodGhpcy5idXlfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXlfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNDEpKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFR1cm10YWJsZSkuaW5pdFVpKClcclxuICAgICAgICAgICAgfSx9KTsvL+i9rOebmFxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVXNlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5wcm9wX2RhdGEucHJvcF9pZCl7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMTE6e1xyXG4gICAgICAgICAgICAgICAgLy/ph5HluIHmjILmnLoqMVxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lUmV3YXJkNjAoKSp0aGlzLnVzZV9udW07ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUwMDEyOntcclxuICAgICAgICAgICAgICAgIC8v6YeR5biB5oyC5py6KjJcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZVJld2FyZDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMTM6e1xyXG4gICAgICAgICAgICAgICAgLy/ph5HluIHmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lUmV3YXJkNjAoKSp0aGlzLnVzZV9udW0qNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAxNDp7XHJcbiAgICAgICAgICAgICAgICAvL+mHkeW4geaMguacuio4XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVSZXdhcmQ2MCgpKnRoaXMudXNlX251bSo4O1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sbnVtKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUwMDE1OntcclxuICAgICAgICAgICAgICAgIC8v6YeR5biB5oyC5py6KjI0XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVSZXdhcmQ2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAyMTp7XHJcbiAgICAgICAgICAgICAgICAvL+iLsembhOe7j+mqjOaMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVIZXJvRXhwNjAoKSp0aGlzLnVzZV9udW07XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjI6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjM6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjQ7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjQ6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb0V4cDYwKCkqdGhpcy51c2VfbnVtKjg7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb0V4cCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMjU6e1xyXG4gICAgICAgICAgICAgICAgLy/oi7Hpm4Tnu4/pqozmjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUhlcm9FeHA2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvRXhwLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5IZXJvRXhwLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDAzMTp7XHJcbiAgICAgICAgICAgICAgICAvL+mtguefs+aMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVIZXJvU3RvbmU2MCgpKnRoaXMudXNlX251bTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzI6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qMjtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzM6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzQ6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lSGVyb1N0b25lNjAoKSp0aGlzLnVzZV9udW0qODtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5IZXJvU3RvbmUsbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwMzU6e1xyXG4gICAgICAgICAgICAgICAgLy/prYLnn7PmjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUhlcm9TdG9uZTYwKCkqdGhpcy51c2VfbnVtKjI0O1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcF9kYXRhLnByb3BfaWQsLXRoaXMudXNlX251bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkhlcm9TdG9uZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb1N0b25lLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1MDA0MTp7XHJcbiAgICAgICAgICAgICAgICAvL+WFveeyruaMguacuioxXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9mZmxpbmVBbmltYWxGb29kNjAoKSp0aGlzLnVzZV9udW07XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDI6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqMlxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjI7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDM6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqNFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjQ7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDQ6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqOFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPZmZsaW5lQW5pbWFsRm9vZDYwKCkqdGhpcy51c2VfbnVtKjg7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9wX2RhdGEucHJvcF9pZCwtdGhpcy51c2VfbnVtKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQW5pbWFsRm9vZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTAwNDU6e1xyXG4gICAgICAgICAgICAgICAgLy/lhb3nsq7mjILmnLoqMjRcclxuICAgICAgICAgICAgICAgIGxldCBudW09T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T2ZmbGluZUFuaW1hbEZvb2Q2MCgpKnRoaXMudXNlX251bSoyNDtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2lkLC10aGlzLnVzZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5BbmltYWxGb29kLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5BbmltYWxGb29kLG51bSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy51c2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19