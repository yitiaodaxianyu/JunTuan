
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/FuHuo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        this.schedule(this.showRemain, 2);
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
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (VipManager_1.VipManager.getIsVip() == true) {
                GameManager_1.default.getInstance().onFuhuo();
                this.destroySelf();
                return;
            }
            this.unschedule(this.showRemain);
            WXManagerEX_1.default.getInstance().fuhuoShipin = tt.createRewardedVideoAd({
                adUnitId: '511higl95hjd24k2xg'
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
                WXManagerEX_1.default.getInstance().fuhuoShipin.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEZ1SHVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUV2RCxnREFBK0M7QUFFL0MsOENBQXlDO0FBR3pDLDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWlHQztRQS9GRyxpQkFBVyxHQUFRLEVBQUUsQ0FBQzs7SUErRjFCLENBQUM7SUE3Rkcsc0JBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBRyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFFLElBQUksRUFBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25GLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQztRQUMvRCxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUN0QjtZQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNM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Q0w7YUFBSTtZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUdOLENBQUM7SUFDQSxRQUFRO0lBQ0EsNEJBQVksR0FBcEI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0YsMkJBQVcsR0FBWDtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFoR2lCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FpR3pCO0lBQUQsWUFBQztDQWpHRCxBQWlHQyxDQWpHa0MsRUFBRSxDQUFDLFNBQVMsR0FpRzlDO2tCQWpHb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVIdW8gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbWFpbl90aW1lOm51bWJlcj0yMDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9MjE7XHJcbiAgICAgICAgdGhpcy5zaG93UmVtYWluKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW4sMik7XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5nZXRJc1ZpcCgpPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdhZHMnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dSZW1haW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWUtLTtcclxuICAgICAgICBsZXQgcmVtYWluTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5GdUh1bycpLmdldENoaWxkQnlOYW1lKCdyZW1haW5MYWJlbCcpO1xyXG4gICAgICAgIHJlbWFpbkxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMucmVtYWluX3RpbWUrJ3MnO1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU8PTApXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZUxvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgY2xpY2tCdG5GYW5nUWkoKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICB9XHJcblxyXG4gICBjbGlja0J0bkZ1aHVvKClcclxuICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XHJcbiAgICAgICAgICAgIGlmKFZpcE1hbmFnZXIuZ2V0SXNWaXAoKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbkZ1aHVvKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluID0gdHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnNTExaGlnbDk1aGpkMjRrMnhnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5mdWh1b1NoaXBpbi5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG93UmVtYWluLDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5mdWh1b1NoaXBpbi5vZmZDbG9zZSgpO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4ubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5mdWh1b1NoaXBpbi5zaG93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlub/lkYrmi4nlj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG93UmVtYWluLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4ub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW4sMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgfVxyXG4gICAgLy/op4bpopHop4LnnIvlrozmiJBcclxuICAgIHByaXZhdGUgb25TaGlwaW5Db21wKCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkub25GdWh1bygpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuICAgZGVzdHJveVNlbGYoKVxyXG4gICB7XHJcbiAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgIH1cclxufVxyXG4iXX0=