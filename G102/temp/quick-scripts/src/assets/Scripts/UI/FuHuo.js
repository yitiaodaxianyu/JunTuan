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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var VipManager_1 = require("../Ads/VipManager");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FuHuo = /** @class */ (function (_super) {
    __extends(FuHuo, _super);
    function FuHuo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 20;
        return _this;
    }
    FuHuo.prototype.onLoad = function () {
        this.remain_time = 21;
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
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (VipManager_1.VipManager.getIsVip() == true) {
                GameManager_1.default.getInstance().onFuhuo();
                this.destroySelf();
                return;
            }
            this.unschedule(this.showRemain);
            WXManagerEX_1.default.getInstance().fuhuoShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-81a1f1f3d7c367bb'
            });
            WXManagerEX_1.default.getInstance().fuhuoShipin.offError();
            WXManagerEX_1.default.getInstance().fuhuoShipin.onError(function (err) {
                console.log(err);
                _this.schedule(_this.showRemain, 1);
            });
            WXManagerEX_1.default.getInstance().fuhuoShipin.offClose();
            WXManagerEX_1.default.getInstance().fuhuoShipin.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().fuhuoShipin.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().fuhuoShipin.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                    _this.schedule(_this.showRemain, 1);
                });
            });
            WXManagerEX_1.default.getInstance().fuhuoShipin.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    _this.schedule(_this.showRemain, 1);
                }
            });
        }
        else {
            this.onShipinComp();
        }
    };
    //视频观看完成
    FuHuo.prototype.onShipinComp = function () {
        GameManager_1.default.getInstance().onFuhuo();
        this.destroySelf();
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