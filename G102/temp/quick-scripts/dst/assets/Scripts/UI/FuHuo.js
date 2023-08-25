
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEZ1SHVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUV2RCxnREFBK0M7QUFFL0MsOENBQXlDO0FBR3pDLDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWdHQztRQTlGRyxpQkFBVyxHQUFRLEVBQUUsQ0FBQzs7SUE4RjFCLENBQUM7SUE1Rkcsc0JBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBRyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFFLElBQUksRUFBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25GLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQztRQUMvRCxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUN0QjtZQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNM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LFFBQVE7SUFDQSw0QkFBWSxHQUFwQjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRiwyQkFBVyxHQUFYO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQS9GaUIsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQWdHekI7SUFBRCxZQUFDO0NBaEdELEFBZ0dDLENBaEdrQyxFQUFFLENBQUMsU0FBUyxHQWdHOUM7a0JBaEdvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBBZE1hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmlwTWFuYWdlciB9IGZyb20gXCIuLi9BZHMvVmlwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBWSURFT19UWVBFIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdUh1byBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTIwO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT0yMTtcclxuICAgICAgICB0aGlzLnNob3dSZW1haW4oKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbiwxKTtcclxuICAgICAgICBpZihWaXBNYW5hZ2VyLmdldElzVmlwKCk9PXRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2FkcycpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlbWFpbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZS0tO1xyXG4gICAgICAgIGxldCByZW1haW5MYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkZ1SHVvJykuZ2V0Q2hpbGRCeU5hbWUoJ3JlbWFpbkxhYmVsJyk7XHJcbiAgICAgICAgcmVtYWluTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5yZW1haW5fdGltZSsncyc7XHJcbiAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTw9MClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lTG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICBjbGlja0J0bkZhbmdRaSgpXHJcbiAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgIH1cclxuXHJcbiAgIGNsaWNrQnRuRnVodW8oKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgaWYoVmlwTWFuYWdlci5nZXRJc1ZpcCgpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uRnVodW8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zaG93UmVtYWluKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4gPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtODFhMWYxZjNkN2MzNjdiYidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4ub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5mdWh1b1NoaXBpbi5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbiwxKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4ub2ZmQ2xvc2UoKTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5mdWh1b1NoaXBpbi5zaG93KCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluLmxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuZnVodW9TaGlwaW4uc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi5bm/5ZGK5ouJ5Y+W5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbiwxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmZ1aHVvU2hpcGluLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG93UmVtYWluLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICB9XHJcbiAgICAvL+inhumikeingueci+WujOaIkFxyXG4gICAgcHJpdmF0ZSBvblNoaXBpbkNvbXAoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbkZ1aHVvKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG4gICBkZXN0cm95U2VsZigpXHJcbiAgIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgfVxyXG59XHJcbiJdfQ==