"use strict";
cc._RF.push(module, 'a721dYAKK1AcKVO3JWoi85H', 'PaymentUi');
// Scripts/Payment/PaymentUi.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var UIManager_1 = require("../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaymentUi = /** @class */ (function (_super) {
    __extends(PaymentUi, _super);
    function PaymentUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.all_ui = [];
        _this.cur_selected_index = 0;
        return _this;
    }
    PaymentUi_1 = PaymentUi;
    PaymentUi.prototype.onLoad = function () {
        PaymentUi_1._instance = this;
    };
    PaymentUi.prototype.onDestroy = function () {
        PaymentUi_1._instance = null;
    };
    PaymentUi.prototype.initData = function (showIndex) {
        this.cur_selected_index = showIndex;
    };
    PaymentUi.prototype.start = function () {
        this.adaptation();
        this.setBtnShow();
    };
    PaymentUi.prototype.adaptation = function () {
        var wp = cc.winSize;
        var bottom = this.node.getChildByName('bottom');
        bottom.y = -wp.height / 2;
        bottom.zIndex = 1;
        this.node.getChildByName('top').y = wp.height / 2;
        var rate = wp.height / wp.width;
        if (rate < 2) {
            this.node.getChildByName('premium_card').scale = rate - 1;
        }
    };
    PaymentUi.prototype.showIndex = function (index) {
        this.cur_selected_index = index;
        this.setBtnShow();
    };
    PaymentUi.prototype.setBtnShow = function () {
        var down = this.node.getChildByName('bottom');
        var content = down.getChildByName('btnScrollView').getComponent(cc.ScrollView).content;
        var textId = 0;
        for (var i = 0; i < 6; i++) {
            var btn = content.children[i];
            var btns = btn.getComponents(cc.Button);
            var isCanBtn = this.cur_selected_index != i;
            this.all_ui[i].active = !isCanBtn;
            if (!isCanBtn) {
                textId = btn.getChildByName('nameText').getComponent(TextLanguage_1.default).getTextId();
            }
            for (var n = 0; n < btns.length; n++) {
                btns[n].interactable = isCanBtn;
            }
        }
        //标题名称
        var top = this.node.getChildByName('top');
        top.getChildByName('titleText').getComponent(TextLanguage_1.default).setTextId(textId);
        if (this.cur_selected_index == 0 || this.cur_selected_index == 5) {
            this.node.getChildByName("top").getChildByName("btnHelp").active = true;
        }
        else {
            this.node.getChildByName("top").getChildByName("btnHelp").active = false;
        }
        //titleText.setTextId()
    };
    PaymentUi.prototype.clickBtnBottom = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        switch (index) {
            case 0:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_尊享卡页签点击次数);
                break;
            case 1:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_龙晶充值页签点击次数);
                break;
            case 2:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_热卖礼包签点击次数);
                break;
            case 3:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_通关返利签点击次数);
                break;
            case 4:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_累计充值页签点击次数);
                break;
            case 5:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城_战令页签点击次数);
                break;
        }
        if (this.cur_selected_index != index) {
            this.cur_selected_index = index;
            this.setBtnShow();
        }
    };
    PaymentUi.prototype.clickBtnHelp = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.cur_selected_index == 0) {
            UIManager_1.UIManager.getInstance().showHelpTipsUi(null, 100003, [1400201, 1400202, 1400203]);
        }
        else if (this.cur_selected_index == 5) {
            UIManager_1.UIManager.getInstance().showHelpTipsUi(null, 100003, [1450004, 1450005, 1450006]);
        }
    };
    PaymentUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop);
        _super.prototype.onClose.call(this);
    };
    var PaymentUi_1;
    PaymentUi._instance = null;
    __decorate([
        property([cc.Node])
    ], PaymentUi.prototype, "all_ui", void 0);
    PaymentUi = PaymentUi_1 = __decorate([
        ccclass
    ], PaymentUi);
    return PaymentUi;
}(UIComponent_1.default));
exports.default = PaymentUi;

cc._RF.pop();