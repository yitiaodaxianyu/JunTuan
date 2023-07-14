"use strict";
cc._RF.push(module, '6e502Nu3KpH66sQOZiGttrH', 'ConsumptionTipUi');
// Scripts/UI/ConsumptionTipUi.ts

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
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("./UIComponent");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var MyTool_1 = require("../Tools/MyTool");
var Item_1 = require("../Prop/Data/Item");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ConsumptionTipUi = /** @class */ (function (_super) {
    __extends(ConsumptionTipUi, _super);
    function ConsumptionTipUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sure_call_back = null;
        _this.currency_type = PropConfig_1.PropId.Coin;
        _this.currency_num = 0;
        return _this;
    }
    ConsumptionTipUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    ConsumptionTipUi.prototype.initCallBack = function (currencyType, currencyNum, sureCallBack) {
        this.sure_call_back = sureCallBack;
        this.currency_type = currencyType;
        this.currency_num = currencyNum;
        this.initUi();
    };
    ConsumptionTipUi.prototype.initUi = function () {
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100003);
        this.node.getChildByName("contentLabel1").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100022);
        this.node.getChildByName("contentLabel2").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100004);
        this.node.getChildByName("cancelLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100002);
        this.node.getChildByName("sureLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100001);
        this.node.getChildByName("useIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(this.currency_type);
        this.node.getChildByName("tipIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(this.currency_type);
        this.node.getChildByName("useLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(this.currency_num);
        var tipLabel = this.node.getChildByName("tipLabel");
        tipLabel.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(this.currency_type));
        // console.log("初始化Ui",this.currency_num,PropManager.getInstance().getPropNum(this.currency_type));
        if (this.currency_num > PropManager_1.PropManager.getInstance().getPropNum(this.currency_type)) {
            // console.log("钱不够了");
            tipLabel.color = cc.color(209, 44, 45);
        }
    };
    ConsumptionTipUi.prototype.clickBtnSure = function () {
        if (this.currency_num > PropManager_1.PropManager.getInstance().getPropNum(this.currency_type)) {
            // console.log("钱不够的提示")
            var str = "";
            str = LanguageManager_1.default.getInstance().getStrByTextId(Item_1.ItemManager.getInstance().getNameTextId(this.currency_type)) + LanguageManager_1.default.getInstance().getStrByTextId(100021);
            GameManager_1.default.getInstance().showMessage(str);
        }
        else {
            // console.log("扣钱之前的数量：" + PropManager.getInstance().getPropNum(this.currency_type),this.currency_num * -1)
            PropManager_1.PropManager.getInstance().changePropNum(this.currency_type, this.currency_num * -1);
            // console.log("扣钱之后的数量：" + PropManager.getInstance().getPropNum(this.currency_type))
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            this.sure_call_back();
            this.destroySelf();
        }
    };
    ConsumptionTipUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ConsumptionTipUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    ConsumptionTipUi = __decorate([
        ccclass
    ], ConsumptionTipUi);
    return ConsumptionTipUi;
}(UIComponent_1.default));
exports.default = ConsumptionTipUi;

cc._RF.pop();