"use strict";
cc._RF.push(module, '6708cxFXB1AuLNbaEG3y8/8', 'WXManager');
// Scripts/Ads/WXManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Battle racing  65398
// banner  ca-app-pub-2476175026271293/9535537102
// interstitial  ca-app-pub-2476175026271293/5005582382
// rewarded ca-app-pub-2476175026271293/3339478623
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WXManager = /** @class */ (function () {
    function WXManager() {
        this.banner_id = 'ca-app-pub-2476175026271293/9535537102';
        this.interstitial_id = 'ca-app-pub-2476175026271293/5005582382';
        this.reward_id = 'ca-app-pub-2476175026271293/3339478623';
        this.perv_inst_time = 0;
        this.perv_video_time = 0;
    }
    WXManager_1 = WXManager;
    WXManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WXManager_1();
        }
        return this._instance;
    };
    //初始化游戏数据
    WXManager.prototype.init = function () {
        this.initAds();
    };
    WXManager.prototype.initAds = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.showShareMenu({
                withShareTicket: true
            });
        }
    };
    ;
    WXManager.prototype.showBanner = function () {
    };
    ;
    WXManager.prototype.showInterstitial = function () {
        var curTime = new Date().getTime();
        var isCanAd = false;
        if (curTime - this.perv_inst_time > 1000 * 10) {
            isCanAd = true;
            this.perv_inst_time = curTime;
        }
        if (isCanAd == false) {
            return;
        }
    };
    ;
    //callback，视频播放是否成功的回调函数
    WXManager.prototype.showVideo = function (callback) {
        var curDate = new Date();
        var curTime = curDate.getTime();
        var reward_time = cc.sys.localStorage.getItem('reward_time');
        if (reward_time != "" && reward_time != null) {
            reward_time = parseInt(reward_time);
            var offsetT = curTime - reward_time;
            var tt = 3 * 60 * 1000;
            if (offsetT >= tt) {
                callback(true);
                cc.sys.localStorage.setItem('reward_time', curTime);
            }
            else {
                callback(false);
                var sy = Math.round((tt - offsetT) / 1000);
                //AdManager.getInstance().showMessage('内测期间,暂无激励广告,每3分钟可以免费领取一次奖励，还差 '+sy+' 秒可以领取');
            }
        }
        else {
            callback(true);
            cc.sys.localStorage.setItem('reward_time', curTime);
        }
        // let curTime=new Date().getTime();
        // let isCanAd=false;
        // let offsetTime=Math.round((curTime-this.perv_video_time)/1000);
        // if(offsetTime>120)
        // {
        //     isCanAd=true;
        //     this.perv_video_time=curTime;
        // }
    };
    ;
    var WXManager_1;
    WXManager._instance = null;
    WXManager = WXManager_1 = __decorate([
        ccclass
    ], WXManager);
    return WXManager;
}());
exports.default = WXManager;

cc._RF.pop();