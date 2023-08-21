
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
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxXWE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1QkFBdUI7QUFDdkIsaURBQWlEO0FBQ2pELHVEQUF1RDtBQUN2RCxrREFBa0Q7QUFFNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUdZLGNBQVMsR0FBUSx3Q0FBd0MsQ0FBQztRQUMxRCxvQkFBZSxHQUFRLHdDQUF3QyxDQUFDO1FBQ2hFLGNBQVMsR0FBUSx3Q0FBd0MsQ0FBQztRQUcxRCxtQkFBYyxHQUFDLENBQUMsQ0FBQztRQUNqQixvQkFBZSxHQUFDLENBQUMsQ0FBQztJQXFGOUIsQ0FBQztrQkE5Rm9CLFNBQVM7SUFXWixxQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFdBQVMsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ1Qsd0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUVJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQzFDO1NBRUM7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLDhCQUFVLEdBQVY7SUFHQSxDQUFDO0lBQUEsQ0FBQztJQUNGLG9DQUFnQixHQUFoQjtRQUVJLElBQUksT0FBTyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxPQUFPLEdBQUMsS0FBSyxDQUFDO1FBQ2xCLElBQUcsT0FBTyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxHQUFDLEVBQUUsRUFDdEM7WUFDSSxPQUFPLEdBQUMsSUFBSSxDQUFDO1lBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBQyxPQUFPLENBQUM7U0FDL0I7UUFDRCxJQUFHLE9BQU8sSUFBRSxLQUFLLEVBQ2pCO1lBQ0ksT0FBTztTQUNWO0lBRUwsQ0FBQztJQUFBLENBQUM7SUFDRix3QkFBd0I7SUFDeEIsNkJBQVMsR0FBVCxVQUFVLFFBQVE7UUFFZCxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksT0FBTyxHQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QixJQUFJLFdBQVcsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsSUFBRyxXQUFXLElBQUUsRUFBRSxJQUFFLFdBQVcsSUFBRSxJQUFJLEVBQ3JDO1lBQ0ksV0FBVyxHQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsQyxJQUFJLE9BQU8sR0FBQyxPQUFPLEdBQUMsV0FBVyxDQUFDO1lBQ2hDLElBQUksRUFBRSxHQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUcsT0FBTyxJQUFFLEVBQUUsRUFDZDtnQkFDSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxPQUFPLENBQUMsQ0FBQzthQUN0RDtpQkFDRDtnQkFDSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUMsT0FBTyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLG9GQUFvRjthQUN2RjtTQUVKO2FBQ0Q7WUFDSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3REO1FBT0Qsb0NBQW9DO1FBQ3BDLHFCQUFxQjtRQUNyQixrRUFBa0U7UUFDbEUscUJBQXFCO1FBQ3JCLElBQUk7UUFDSixvQkFBb0I7UUFDcEIsb0NBQW9DO1FBQ3BDLElBQUk7SUFFUixDQUFDO0lBQUEsQ0FBQzs7SUEzRmEsbUJBQVMsR0FBYyxJQUFJLENBQUM7SUFGMUIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQThGN0I7SUFBRCxnQkFBQztDQTlGRCxBQThGQyxJQUFBO2tCQTlGb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZE1hbmFnZXIgZnJvbSBcIi4vQWRNYW5hZ2VyXCI7XHJcblxyXG4vLyBCYXR0bGUgcmFjaW5nICA2NTM5OFxyXG4vLyBiYW5uZXIgIGNhLWFwcC1wdWItMjQ3NjE3NTAyNjI3MTI5My85NTM1NTM3MTAyXHJcbi8vIGludGVyc3RpdGlhbCAgY2EtYXBwLXB1Yi0yNDc2MTc1MDI2MjcxMjkzLzUwMDU1ODIzODJcclxuLy8gcmV3YXJkZWQgY2EtYXBwLXB1Yi0yNDc2MTc1MDI2MjcxMjkzLzMzMzk0Nzg2MjNcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hNYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFdYTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIGJhbm5lcl9pZDpzdHJpbmc9J2NhLWFwcC1wdWItMjQ3NjE3NTAyNjI3MTI5My85NTM1NTM3MTAyJztcclxuICAgIHByaXZhdGUgaW50ZXJzdGl0aWFsX2lkOnN0cmluZz0nY2EtYXBwLXB1Yi0yNDc2MTc1MDI2MjcxMjkzLzUwMDU1ODIzODInO1xyXG4gICAgcHJpdmF0ZSByZXdhcmRfaWQ6c3RyaW5nPSdjYS1hcHAtcHViLTI0NzYxNzUwMjYyNzEyOTMvMzMzOTQ3ODYyMyc7XHJcblxyXG5cclxuICAgIHByaXZhdGUgcGVydl9pbnN0X3RpbWU9MDtcclxuICAgIHByaXZhdGUgcGVydl92aWRlb190aW1lPTA7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOldYTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFdYTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgaW5pdCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QWRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEFkcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkJZVEVEQU5DRV9HQU1FKVxyXG4gICAgICAgIHtcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIHNob3dCYW5uZXIoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgc2hvd0ludGVyc3RpdGlhbCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1clRpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGlzQ2FuQWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYoY3VyVGltZS10aGlzLnBlcnZfaW5zdF90aW1lPjEwMDAqMTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc0NhbkFkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGVydl9pbnN0X3RpbWU9Y3VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNDYW5BZD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIC8vY2FsbGJhY2vvvIzop4bpopHmkq3mlL7mmK/lkKbmiJDlip/nmoTlm57osIPlh73mlbBcclxuICAgIHNob3dWaWRlbyhjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGN1clRpbWU9Y3VyRGF0ZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IHJld2FyZF90aW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmV3YXJkX3RpbWUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocmV3YXJkX3RpbWUhPVwiXCImJnJld2FyZF90aW1lIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV3YXJkX3RpbWU9cGFyc2VJbnQocmV3YXJkX3RpbWUpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0VD1jdXJUaW1lLXJld2FyZF90aW1lO1xyXG4gICAgICAgICAgICBsZXQgdHQ9Myo2MCoxMDAwO1xyXG4gICAgICAgICAgICBpZihvZmZzZXRUPj10dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jld2FyZF90aW1lJyxjdXJUaW1lKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN5PU1hdGgucm91bmQoKHR0LW9mZnNldFQpLzEwMDApO1xyXG4gICAgICAgICAgICAgICAgLy9BZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZSgn5YaF5rWL5pyf6Ze0LOaaguaXoOa/gOWKseW5v+WRiizmr48z5YiG6ZKf5Y+v5Lul5YWN6LS56aKG5Y+W5LiA5qyh5aWW5Yqx77yM6L+Y5beuICcrc3krJyDnp5Llj6/ku6Xpooblj5YnKTtcclxuICAgICAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jld2FyZF90aW1lJyxjdXJUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBsZXQgY3VyVGltZT1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyBsZXQgaXNDYW5BZD1mYWxzZTtcclxuICAgICAgICAvLyBsZXQgb2Zmc2V0VGltZT1NYXRoLnJvdW5kKChjdXJUaW1lLXRoaXMucGVydl92aWRlb190aW1lKS8xMDAwKTtcclxuICAgICAgICAvLyBpZihvZmZzZXRUaW1lPjEyMClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlzQ2FuQWQ9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5wZXJ2X3ZpZGVvX3RpbWU9Y3VyVGltZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgICBcclxuICAgIH07XHJcbn1cclxuXHJcbiJdfQ==