"use strict";
cc._RF.push(module, '9b112ezpr1ILZfdmrmTsZmm', 'BattlePassHelpUi');
// Scripts/BattlePass/BattlePassHelpUi.ts

"use strict";
// Learn TypeScript:
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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BattlePassHelpUi = /** @class */ (function (_super) {
    __extends(BattlePassHelpUi, _super);
    function BattlePassHelpUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_label = null;
        _this.titleId = 0;
        _this.contentIds = [];
        return _this;
    }
    BattlePassHelpUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    BattlePassHelpUi.prototype.initData = function (titleId, contentIds) {
        this.titleId = titleId;
        this.contentIds = contentIds;
        this.refreshUi();
    };
    BattlePassHelpUi.prototype.refreshUi = function () {
        var _this = this;
        this.node.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(this.titleId);
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        this.contentIds.forEach(function (v, k) {
            var text = cc.instantiate(_this.prefab_label);
            text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(v);
            content.addChild(text);
        });
        // MyTool.allFadeIn(this.node);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     MyTool.allFadeOut(this.node,()=>{
        //         this.node.removeFromParent();
        //         GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //     })
        // },this);
    };
    BattlePassHelpUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    BattlePassHelpUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], BattlePassHelpUi.prototype, "prefab_label", void 0);
    BattlePassHelpUi = __decorate([
        ccclass
    ], BattlePassHelpUi);
    return BattlePassHelpUi;
}(UIComponent_1.default));
exports.default = BattlePassHelpUi;

cc._RF.pop();