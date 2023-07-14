"use strict";
cc._RF.push(module, 'ee1ba6O+J5FNatvv78/poLi', 'VersionTip');
// Scripts/Loading/VersionTip.ts

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
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VersionTip = /** @class */ (function (_super) {
    __extends(VersionTip, _super);
    function VersionTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_dialog_index = 0;
        _this.arr_content_text = [];
        _this.arr_left_text = [];
        _this.arr_right_text = [];
        _this.text_content = null;
        _this.text_left = null;
        _this.text_right = null;
        return _this;
    }
    VersionTip.prototype.start = function () {
    };
    VersionTip.prototype.refreshUi = function () {
        if (this.text_content) {
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }
        else {
            this.text_content = this.node.getChildByName("mytxt").getComponent(TextLanguage_1.default);
            this.text_left = this.node.getChildByName("btnad").getChildByName("text").getComponent(TextLanguage_1.default);
            this.text_right = this.node.getChildByName("btnGo").getChildByName("text").getComponent(TextLanguage_1.default);
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }
    };
    VersionTip.prototype.clickBtnLeft = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_dialog_index) {
            case 0:
                {
                    //取消，跳转下一个页面显示
                    this.cur_dialog_index++;
                    this.refreshUi();
                }
                break;
            case 1:
                {
                    //跳转到GP
                    this.jumpToGP();
                }
                break;
        }
    };
    VersionTip.prototype.clickBtnRight = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_dialog_index) {
            case 0:
                {
                    //跳转到GP
                    this.jumpToGP();
                }
                break;
            case 1:
                {
                    //直接开始游戏
                    UserData_1.default.getInstance().version_is_ok = true;
                    this.node.removeFromParent();
                }
                break;
        }
    };
    VersionTip.prototype.jumpToGP = function () {
        ApkManager_1.default.getInstance().jumpToGP();
    };
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_content_text", void 0);
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_left_text", void 0);
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_right_text", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_content", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_left", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_right", void 0);
    VersionTip = __decorate([
        ccclass
    ], VersionTip);
    return VersionTip;
}(cc.Component));
exports.default = VersionTip;

cc._RF.pop();