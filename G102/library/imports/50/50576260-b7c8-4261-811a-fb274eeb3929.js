"use strict";
cc._RF.push(module, '50576Jgt8hCYYEa+ydO6zkp', 'FuHuo');
// Scripts/UI/FuHuo.ts

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
var AdManager_1 = require("../Ads/AdManager");
var VipManager_1 = require("../Ads/VipManager");
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FuHuo = /** @class */ (function (_super) {
    __extends(FuHuo, _super);
    function FuHuo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 10;
        return _this;
    }
    FuHuo.prototype.onLoad = function () {
        this.remain_time = 11;
        this.showRemain();
        this.schedule(this.showRemain, 1);
        if (VipManager_1.VipManager.getIsVip() == true) {
            this.node.getChildByName('ads').active = false;
        }
    };
    FuHuo.prototype.showRemain = function () {
        this.remain_time--;
        var remainLabel = this.node.getChildByName('btnFuHuo').getChildByName('remainLabel');
        remainLabel.getComponent(cc.Label).string = this.remain_time + 's';
        if (this.remain_time <= 0) {
            this.showGameLose();
        }
    };
    FuHuo.prototype.showGameLose = function () {
        GameManager_1.default.getInstance().showGameLose();
        this.destroySelf();
    };
    FuHuo.prototype.clickBtnFangQi = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.showGameLose();
    };
    FuHuo.prototype.clickBtnFuhuo = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (VipManager_1.VipManager.getIsVip() == true) {
            GameManager_1.default.getInstance().onFuhuo();
            this.destroySelf();
            return;
        }
        this.unschedule(this.showRemain);
        AdManager_1.default.getInstance().showVideo(function (isSuc) {
            if (isSuc) {
                GameManager_1.default.getInstance().onFuhuo();
                _this.destroySelf();
            }
            else {
                _this.schedule(_this.showRemain, 1);
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
        }, Constants_1.VIDEO_TYPE.Coin);
    };
    FuHuo.prototype.destroySelf = function () {
        cc.director.resume();
        this.node.removeFromParent();
    };
    FuHuo = __decorate([
        ccclass
    ], FuHuo);
    return FuHuo;
}(cc.Component));
exports.default = FuHuo;

cc._RF.pop();