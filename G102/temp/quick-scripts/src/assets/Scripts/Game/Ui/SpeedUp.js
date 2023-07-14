"use strict";
cc._RF.push(module, '0ca409lwtJMuZjL0LUftyrp', 'SpeedUp');
// Scripts/Game/Ui/SpeedUp.ts

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
var AdManager_1 = require("../../Ads/AdManager");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Game_1 = require("../Game");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpeedUp = /** @class */ (function (_super) {
    __extends(SpeedUp, _super);
    function SpeedUp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeedUp.prototype.clickBtnSpeedUp = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        AdManager_1.default.getInstance().showVideo(function (isSuc) {
            if (isSuc) {
                //cc.kSpeed(JiaSu);
                var game = cc.find('Canvas').getComponent(Game_1.default);
                game.is_unlock_rate = true;
                game.setBtnRateShow();
            }
            else {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
            _this.destroySelf();
        }, Constants_1.VIDEO_TYPE.Coin);
    };
    SpeedUp.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SpeedUp.prototype.destroySelf = function () {
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        cc.director.resume();
        this.node.removeFromParent();
    };
    SpeedUp = __decorate([
        ccclass
    ], SpeedUp);
    return SpeedUp;
}(cc.Component));
exports.default = SpeedUp;

cc._RF.pop();