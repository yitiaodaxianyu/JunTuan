"use strict";
cc._RF.push(module, '8d5b42SZ6dDTKKKSRvEtXRV', 'AdManager');
// Scripts/Ads/AdManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApkManager_1 = require("./ApkManager");
var Constants_1 = require("../Constants");
var WXManager_1 = require("./WXManager");
// import TaskManger, { MustType, TaskType } from "../Task/TaskManger";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdManager = /** @class */ (function () {
    function AdManager() {
        this.adCallback = null;
    }
    AdManager_1 = AdManager;
    AdManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AdManager_1();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AdManager.prototype.init = function () {
        this.initAds();
    };
    AdManager.prototype.initAds = function () {
        switch (Constants_1.CUR_Platform) {
            case Constants_1.Release_Platform.APK:
                ApkManager_1.default.getInstance().init();
                break;
            case Constants_1.Release_Platform.CPK_WX:
                WXManager_1.default.getInstance().init();
                break;
            //case Release_Platform.CPK_JKW:CpkJKWManager.getInstance().init(); break;
            case Constants_1.Release_Platform.WEB_TEST: break;
        }
    };
    ;
    AdManager.prototype.showBanner = function () {
        switch (Constants_1.CUR_Platform) {
            //case Release_Platform.APK: ApkManager.getInstance().showBanner(); break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showBanner(); break;
            case Constants_1.Release_Platform.WEB_TEST: break;
        }
    };
    ;
    AdManager.prototype.showInterstitial = function (message) {
        cc.log('showInterstitial');
        switch (Constants_1.CUR_Platform) {
            case Constants_1.Release_Platform.APK:
                ApkManager_1.default.getInstance().showInterstitial(message);
                break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showInterstitial(); break;
            case Constants_1.Release_Platform.WEB_TEST: break;
        }
    };
    ;
    //callback，视频播放是否成功的回调函数
    AdManager.prototype.showVideo = function (callback, type) {
        var _this = this;
        this.adCallback = callback;
        switch (Constants_1.CUR_Platform) {
            case Constants_1.Release_Platform.APK:
                ApkManager_1.default.getInstance().showVideo(function (isSuc) {
                    _this.adResult(isSuc);
                }, type);
                break;
            case Constants_1.Release_Platform.CPK_WX:
                WXManager_1.default.getInstance().showVideo(callback);
                break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showVideo(callback,context); break;
            case Constants_1.Release_Platform.WEB_TEST:
                {
                    this.adResult(true);
                }
                break;
        }
    };
    ;
    AdManager.prototype.adResult = function (result) {
        if (this.adCallback != null) {
            this.adCallback(result);
            this.adCallback = null;
            if (result == true) {
                // TaskManger.getInstance().changeMustProgress(MustType.累计播放视频,1);
            }
        }
    };
    var AdManager_1;
    AdManager._instance = null;
    AdManager = AdManager_1 = __decorate([
        ccclass
    ], AdManager);
    return AdManager;
}());
exports.default = AdManager;

cc._RF.pop();