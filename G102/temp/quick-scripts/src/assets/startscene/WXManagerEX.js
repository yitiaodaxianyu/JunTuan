"use strict";
cc._RF.push(module, 'd92b2QAzyVKCpEtlk6LfpjX', 'WXManagerEX');
// startscene/WXManagerEX.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
exports.WXADEnvnt = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WXManagerEX = /** @class */ (function (_super) {
    __extends(WXManagerEX, _super);
    function WXManagerEX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusBarHeight = 0;
        _this.resourcesBundle = cc.resources;
        _this.sharFlag = false;
        return _this;
        // update (dt) {}
    }
    WXManagerEX_1 = WXManagerEX;
    WXManagerEX.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WXManagerEX_1();
        }
        return this._instance;
    };
    WXManagerEX.prototype.initData = function () {
        this.getSystemInfo();
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //wx.cloud.init();
            // this.fuhuoShipin = wx.createRewardedVideoAd({
            //     adUnitId: 'adunit-81a1f1f3d7c367bb'
            // });
            wx.onShow(this.showWX);
        }
    };
    WXManagerEX.prototype.showWX = function (res) {
        console.log(JSON.stringify(res));
        if (this.sharFlag == true) {
            WXManagerEX_1.getInstance().sharFlag = false;
        }
    };
    WXManagerEX.prototype.vibrateShort = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.vibrateShort({ type: "medium" });
        }
    };
    WXManagerEX.prototype.shareAppMessage = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage({
                imageUrlId: "d2CFfPcmRESFpy28mMsJWA==",
                imageUrl: "https://mmocgame.qpic.cn/wechatgame/EGmcoSgicQus18ObjEjwSIjSJzMu2XD3z3gFVeuTXBGPD3n1UyfbgO8OlUebNibDVr/0"
            });
        }
    };
    WXManagerEX.prototype.getSystemInfo = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            try {
                var res = wx.getSystemInfoSync();
                console.log("wx:" + res.model);
                console.log("statusBarHeight:" + res.statusBarHeight);
                if (res.statusBarHeight > 20) {
                    WXManagerEX_1.getInstance().statusBarHeight = res.statusBarHeight;
                }
                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline']
                });
                wx.onShareAppMessage(function () {
                    return {
                        imageUrlId: "d2CFfPcmRESFpy28mMsJWA==",
                        imageUrl: "https://mmocgame.qpic.cn/wechatgame/EGmcoSgicQus18ObjEjwSIjSJzMu2XD3z3gFVeuTXBGPD3n1UyfbgO8OlUebNibDVr/0"
                    };
                });
            }
            catch (e) {
                // Do something when catch error
            }
        }
    };
    WXManagerEX.prototype.start = function () {
    };
    var WXManagerEX_1;
    WXManagerEX._instance = null;
    WXManagerEX = WXManagerEX_1 = __decorate([
        ccclass
    ], WXManagerEX);
    return WXManagerEX;
}(cc.Component));
exports.default = WXManagerEX;
var WXADEnvnt;
(function (WXADEnvnt) {
    //转盘奖励
    WXADEnvnt["ZHUANPANJIANGLISHIPIN"] = "ZHUANPANJIANGLISHIPIN";
    //签到双倍领取
    WXADEnvnt["QIRIQIANDAOSHIPIN"] = "QIRIQIANDAOSHIPIN";
    //快速挂机
    WXADEnvnt["KUAISUGUAJISHIPIN"] = "KUAISUGUAJISHIPIN";
    //战令解锁
    WXADEnvnt["ZHANLINGJIESUOSHIPIN"] = "ZHANLINGJIESUOSHIPIN";
    //免费钻石
    WXADEnvnt["ZUANSHILINGQUSHIPIN"] = "ZUANSHILINGQU";
    //免费金币
    WXADEnvnt["JINBISHIPIN"] = "JINBISHIPIN";
    //装备库抽奖
    WXADEnvnt["ZHUANGBEICHOUJIANG"] = "ZHUANGBEICHOUJIANG";
    //局内复活
    WXADEnvnt["JUNEIFUHUOSHIPIN"] = "JUNEIFUHUOSHIPIN";
})(WXADEnvnt = exports.WXADEnvnt || (exports.WXADEnvnt = {}));

cc._RF.pop();