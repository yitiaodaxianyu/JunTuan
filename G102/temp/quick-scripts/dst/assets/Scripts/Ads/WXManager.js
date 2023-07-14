
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Ads/WXManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxXWE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1QkFBdUI7QUFDdkIsaURBQWlEO0FBQ2pELHVEQUF1RDtBQUN2RCxrREFBa0Q7QUFFNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUdZLGNBQVMsR0FBUSx3Q0FBd0MsQ0FBQztRQUMxRCxvQkFBZSxHQUFRLHdDQUF3QyxDQUFDO1FBQ2hFLGNBQVMsR0FBUSx3Q0FBd0MsQ0FBQztRQUcxRCxtQkFBYyxHQUFDLENBQUMsQ0FBQztRQUNqQixvQkFBZSxHQUFDLENBQUMsQ0FBQztJQXVGOUIsQ0FBQztrQkFoR29CLFNBQVM7SUFXWixxQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFdBQVMsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ1Qsd0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUVJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQ3ZDO1lBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDYixlQUFlLEVBQUUsSUFBSTthQUN0QixDQUFDLENBQUM7U0FDUjtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYsOEJBQVUsR0FBVjtJQUdBLENBQUM7SUFBQSxDQUFDO0lBQ0Ysb0NBQWdCLEdBQWhCO1FBRUksSUFBSSxPQUFPLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBRyxPQUFPLEdBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUMsRUFBRSxFQUN0QztZQUNJLE9BQU8sR0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFDLE9BQU8sQ0FBQztTQUMvQjtRQUNELElBQUcsT0FBTyxJQUFFLEtBQUssRUFDakI7WUFDSSxPQUFPO1NBQ1Y7SUFFTCxDQUFDO0lBQUEsQ0FBQztJQUNGLHdCQUF3QjtJQUN4Qiw2QkFBUyxHQUFULFVBQVUsUUFBUTtRQUVkLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksV0FBVyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxJQUFHLFdBQVcsSUFBRSxFQUFFLElBQUUsV0FBVyxJQUFFLElBQUksRUFDckM7WUFDSSxXQUFXLEdBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksT0FBTyxHQUFDLE9BQU8sR0FBQyxXQUFXLENBQUM7WUFDaEMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUM7WUFDakIsSUFBRyxPQUFPLElBQUUsRUFBRSxFQUNkO2dCQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3REO2lCQUNEO2dCQUNJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBQyxPQUFPLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsb0ZBQW9GO2FBQ3ZGO1NBRUo7YUFDRDtZQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEQ7UUFPRCxvQ0FBb0M7UUFDcEMscUJBQXFCO1FBQ3JCLGtFQUFrRTtRQUNsRSxxQkFBcUI7UUFDckIsSUFBSTtRQUNKLG9CQUFvQjtRQUNwQixvQ0FBb0M7UUFDcEMsSUFBSTtJQUVSLENBQUM7SUFBQSxDQUFDOztJQTdGYSxtQkFBUyxHQUFjLElBQUksQ0FBQztJQUYxQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBZ0c3QjtJQUFELGdCQUFDO0NBaEdELEFBZ0dDLElBQUE7a0JBaEdvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkTWFuYWdlciBmcm9tIFwiLi9BZE1hbmFnZXJcIjtcclxuXHJcbi8vIEJhdHRsZSByYWNpbmcgIDY1Mzk4XHJcbi8vIGJhbm5lciAgY2EtYXBwLXB1Yi0yNDc2MTc1MDI2MjcxMjkzLzk1MzU1MzcxMDJcclxuLy8gaW50ZXJzdGl0aWFsICBjYS1hcHAtcHViLTI0NzYxNzUwMjYyNzEyOTMvNTAwNTU4MjM4MlxyXG4vLyByZXdhcmRlZCBjYS1hcHAtcHViLTI0NzYxNzUwMjYyNzEyOTMvMzMzOTQ3ODYyM1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXWE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogV1hNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgYmFubmVyX2lkOnN0cmluZz0nY2EtYXBwLXB1Yi0yNDc2MTc1MDI2MjcxMjkzLzk1MzU1MzcxMDInO1xyXG4gICAgcHJpdmF0ZSBpbnRlcnN0aXRpYWxfaWQ6c3RyaW5nPSdjYS1hcHAtcHViLTI0NzYxNzUwMjYyNzEyOTMvNTAwNTU4MjM4Mic7XHJcbiAgICBwcml2YXRlIHJld2FyZF9pZDpzdHJpbmc9J2NhLWFwcC1wdWItMjQ3NjE3NTAyNjI3MTI5My8zMzM5NDc4NjIzJztcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwZXJ2X2luc3RfdGltZT0wO1xyXG4gICAgcHJpdmF0ZSBwZXJ2X3ZpZGVvX3RpbWU9MDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6V1hNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgV1hNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB0aGlzLmluaXRBZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QWRzKClcclxuICAgIHtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm09PT1jYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIHNob3dCYW5uZXIoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgc2hvd0ludGVyc3RpdGlhbCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1clRpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGlzQ2FuQWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYoY3VyVGltZS10aGlzLnBlcnZfaW5zdF90aW1lPjEwMDAqMTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc0NhbkFkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGVydl9pbnN0X3RpbWU9Y3VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNDYW5BZD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIC8vY2FsbGJhY2vvvIzop4bpopHmkq3mlL7mmK/lkKbmiJDlip/nmoTlm57osIPlh73mlbBcclxuICAgIHNob3dWaWRlbyhjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGN1clRpbWU9Y3VyRGF0ZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IHJld2FyZF90aW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmV3YXJkX3RpbWUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocmV3YXJkX3RpbWUhPVwiXCImJnJld2FyZF90aW1lIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV3YXJkX3RpbWU9cGFyc2VJbnQocmV3YXJkX3RpbWUpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0VD1jdXJUaW1lLXJld2FyZF90aW1lO1xyXG4gICAgICAgICAgICBsZXQgdHQ9Myo2MCoxMDAwO1xyXG4gICAgICAgICAgICBpZihvZmZzZXRUPj10dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jld2FyZF90aW1lJyxjdXJUaW1lKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN5PU1hdGgucm91bmQoKHR0LW9mZnNldFQpLzEwMDApO1xyXG4gICAgICAgICAgICAgICAgLy9BZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZSgn5YaF5rWL5pyf6Ze0LOaaguaXoOa/gOWKseW5v+WRiizmr48z5YiG6ZKf5Y+v5Lul5YWN6LS56aKG5Y+W5LiA5qyh5aWW5Yqx77yM6L+Y5beuICcrc3krJyDnp5Llj6/ku6Xpooblj5YnKTtcclxuICAgICAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jld2FyZF90aW1lJyxjdXJUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBsZXQgY3VyVGltZT1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyBsZXQgaXNDYW5BZD1mYWxzZTtcclxuICAgICAgICAvLyBsZXQgb2Zmc2V0VGltZT1NYXRoLnJvdW5kKChjdXJUaW1lLXRoaXMucGVydl92aWRlb190aW1lKS8xMDAwKTtcclxuICAgICAgICAvLyBpZihvZmZzZXRUaW1lPjEyMClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlzQ2FuQWQ9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5wZXJ2X3ZpZGVvX3RpbWU9Y3VyVGltZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgICBcclxuICAgIH07XHJcbn1cclxuXHJcbiJdfQ==