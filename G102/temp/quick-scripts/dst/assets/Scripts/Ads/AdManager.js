
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Ads/AdManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxBZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMsMENBQTBFO0FBRTFFLHlDQUFvQztBQUNwQyx1RUFBdUU7QUFFakUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUdZLGVBQVUsR0FBVSxJQUFJLENBQUM7SUE0RXJDLENBQUM7a0JBL0VvQixTQUFTO0lBS1oscUJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxXQUFTLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ1Qsd0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsMkJBQU8sR0FBUDtRQUVJLFFBQU8sd0JBQVksRUFDbkI7WUFDSSxLQUFLLDRCQUFnQixDQUFDLEdBQUc7Z0JBQUUsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQ2xFLEtBQUssNEJBQWdCLENBQUMsTUFBTTtnQkFBRSxtQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUFDLE1BQU07WUFDcEUsMEVBQTBFO1lBQzFFLEtBQUssNEJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTTtTQUN6QztJQUVMLENBQUM7SUFBQSxDQUFDO0lBRUYsOEJBQVUsR0FBVjtRQUVJLFFBQU8sd0JBQVksRUFDbkI7WUFDSSwwRUFBMEU7WUFDMUUsaUZBQWlGO1lBQ2pGLEtBQUssNEJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTTtTQUN6QztJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYsb0NBQWdCLEdBQWhCLFVBQWlCLE9BQWM7UUFFM0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNCLFFBQU8sd0JBQVksRUFDbkI7WUFDSSxLQUFLLDRCQUFnQixDQUFDLEdBQUc7Z0JBQUUsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFBQyxNQUFNO1lBQ3JGLHVGQUF1RjtZQUN2RixLQUFLLDRCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU07U0FDekM7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNGLHdCQUF3QjtJQUN4Qiw2QkFBUyxHQUFULFVBQVUsUUFBOEIsRUFBQyxJQUFlO1FBQXhELGlCQWNDO1FBWkcsSUFBSSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUM7UUFDekIsUUFBTyx3QkFBWSxFQUNuQjtZQUNJLEtBQUssNEJBQWdCLENBQUMsR0FBRztnQkFBRSxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWE7b0JBQ3hFLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNO1lBQ2YsS0FBSyw0QkFBZ0IsQ0FBQyxNQUFNO2dCQUFFLG1CQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDakYsZ0dBQWdHO1lBQ2hHLEtBQUssNEJBQWdCLENBQUMsUUFBUTtnQkFBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkI7Z0JBQUMsTUFBTTtTQUNYO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFFRiw0QkFBUSxHQUFSLFVBQVMsTUFBYztRQUVuQixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUUsSUFBSSxFQUN4QjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUM7WUFDckIsSUFBRyxNQUFNLElBQUUsSUFBSSxFQUNmO2dCQUNJLGtFQUFrRTthQUNyRTtTQUNKO0lBQ0wsQ0FBQzs7SUE1RWMsbUJBQVMsR0FBYyxJQUFJLENBQUM7SUFGMUIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQStFN0I7SUFBRCxnQkFBQztDQS9FRCxBQStFQyxJQUFBO2tCQS9Fb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ1VSX1BsYXRmb3JtLCBSZWxlYXNlX1BsYXRmb3JtLCBWSURFT19UWVBFIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgSGludCBmcm9tIFwiLi4vSGludFwiO1xyXG5pbXBvcnQgV1hNYW5hZ2VyIGZyb20gXCIuL1dYTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgVGFza01hbmdlciwgeyBNdXN0VHlwZSwgVGFza1R5cGUgfSBmcm9tIFwiLi4vVGFzay9UYXNrTWFuZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBZE1hbmFnZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhZENhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkFkTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEFkTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB0aGlzLmluaXRBZHMoKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgaW5pdEFkcygpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKENVUl9QbGF0Zm9ybSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgUmVsZWFzZV9QbGF0Zm9ybS5BUEs6IEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlbGVhc2VfUGxhdGZvcm0uQ1BLX1dYOiBXWE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAvL2Nhc2UgUmVsZWFzZV9QbGF0Zm9ybS5DUEtfSktXOkNwa0pLV01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlbGVhc2VfUGxhdGZvcm0uV0VCX1RFU1Q6IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH07XHJcbiAgICBcclxuICAgIHNob3dCYW5uZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChDVVJfUGxhdGZvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2Nhc2UgUmVsZWFzZV9QbGF0Zm9ybS5BUEs6IEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QmFubmVyKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAvL2Nhc2UgUmVsZWFzZV9QbGF0Zm9ybS5DUEtfSktXOiBDcGtKS1dNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0Jhbm5lcigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWxlYXNlX1BsYXRmb3JtLldFQl9URVNUOiBicmVhaztcclxuICAgICAgICB9ICAgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBzaG93SW50ZXJzdGl0aWFsKG1lc3NhZ2U6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnc2hvd0ludGVyc3RpdGlhbCcpO1xyXG4gICAgICAgIHN3aXRjaChDVVJfUGxhdGZvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFJlbGVhc2VfUGxhdGZvcm0uQVBLOiBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0ludGVyc3RpdGlhbChtZXNzYWdlKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vY2FzZSBSZWxlYXNlX1BsYXRmb3JtLkNQS19KS1c6IENwa0pLV01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93SW50ZXJzdGl0aWFsKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlbGVhc2VfUGxhdGZvcm0uV0VCX1RFU1Q6IGJyZWFrO1xyXG4gICAgICAgIH0gIFxyXG4gICAgfTtcclxuICAgIC8vY2FsbGJhY2vvvIzop4bpopHmkq3mlL7mmK/lkKbmiJDlip/nmoTlm57osIPlh73mlbBcclxuICAgIHNob3dWaWRlbyhjYWxsYmFjazooaXNTdWM6Ym9vbGVhbik9PnZvaWQsdHlwZTpWSURFT19UWVBFKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICBzd2l0Y2goQ1VSX1BsYXRmb3JtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBSZWxlYXNlX1BsYXRmb3JtLkFQSzogQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoaXNTdWM6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRSZXN1bHQoaXNTdWMpO1xyXG4gICAgICAgICAgICB9LHR5cGUpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWxlYXNlX1BsYXRmb3JtLkNQS19XWDogV1hNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKGNhbGxiYWNrKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vY2FzZSBSZWxlYXNlX1BsYXRmb3JtLkNQS19KS1c6IENwa0pLV01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oY2FsbGJhY2ssY29udGV4dCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlbGVhc2VfUGxhdGZvcm0uV0VCX1RFU1Q6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZFJlc3VsdCh0cnVlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGFkUmVzdWx0KHJlc3VsdDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuYWRDYWxsYmFjayE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkQ2FsbGJhY2s9bnVsbDtcclxuICAgICAgICAgICAgaWYocmVzdWx0PT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBUYXNrTWFuZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlTXVzdFByb2dyZXNzKE11c3RUeXBlLue0r+iuoeaSreaUvuinhumikSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19