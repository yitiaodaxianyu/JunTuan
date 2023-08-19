"use strict";
cc._RF.push(module, '55c80m4oZ5MIoGs4ITFrINz', 'SignInGetTip');
// Scripts/UI/home/SignInGetTip.ts

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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var GameManager_1 = require("../../GameManager");
var PropManager_1 = require("../../Prop/PropManager");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignInGetTip = /** @class */ (function (_super) {
    __extends(SignInGetTip, _super);
    function SignInGetTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_info = null;
        return _this;
    }
    SignInGetTip.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        cc.director.on(WXManagerEX_1.WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
    };
    SignInGetTip.prototype.initData = function (rewardInfo) {
        this.reward_info = rewardInfo;
        var reward = PropManager_1.PropManager.getInstance().createPropItem(rewardInfo.reward_id, rewardInfo.reward_num);
        var root = this.node.getChildByName("itemRoot");
        root.removeAllChildren();
        root.addChild(reward);
    };
    SignInGetTip.prototype.onClickAdBtn = function () {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-fafe5d05ac20c01b'
            });
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin.offError();
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin.onError(function (err) {
                console.log(err);
            });
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin.offClose();
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().qiriQiandaoShipin.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().qiriQiandaoShipin.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                });
            });
            WXManagerEX_1.default.getInstance().qiriQiandaoShipin.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
            });
        }
        else {
            this.onShipinComp();
        }
    };
    SignInGetTip.prototype.onShipinComp = function () {
        UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.Two);
        PropManager_1.PropManager.getInstance().changePropNum(this.reward_info.reward_id, this.reward_info.reward_num);
    };
    SignInGetTip.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        cc.director.off(WXManagerEX_1.WXADEnvnt.QIRIQIANDAOSHIPIN, this.onShipinComp, this);
    };
    SignInGetTip = __decorate([
        ccclass
    ], SignInGetTip);
    return SignInGetTip;
}(UIComponent_1.default));
exports.default = SignInGetTip;

cc._RF.pop();