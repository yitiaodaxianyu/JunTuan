
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
var AdManager_1 = require("../Ads/AdManager");
var VipManager_1 = require("../Ads/VipManager");
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FuHuo = /** @class */ (function (_super) {
    __extends(FuHuo, _super);
    function FuHuo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 10;
        return _this;
    }
    FuHuo.prototype.onLoad = function () {
        this.remain_time = 11;
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
        if (VipManager_1.VipManager.getIsVip() == true) {
            GameManager_1.default.getInstance().onFuhuo();
            this.destroySelf();
            return;
        }
        this.unschedule(this.showRemain);
        AdManager_1.default.getInstance().showVideo(function (isSuc) {
            if (isSuc) {
                GameManager_1.default.getInstance().onFuhuo();
                _this.destroySelf();
            }
            else {
                _this.schedule(_this.showRemain, 1);
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
        }, Constants_1.VIDEO_TYPE.Coin);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEZ1SHVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxnREFBK0M7QUFDL0MsMENBQTBDO0FBQzFDLDhDQUF5QztBQUN6Qyx3RUFBbUU7QUFDbkUsb0VBQStEO0FBQy9ELDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWlFQztRQS9ERyxpQkFBVyxHQUFRLEVBQUUsQ0FBQzs7SUErRDFCLENBQUM7SUE3REcsc0JBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBRyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFFLElBQUksRUFBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25GLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQztRQUMvRCxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUN0QjtZQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCw0QkFBWSxHQUFaO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVGLDhCQUFjLEdBQWQ7UUFFSyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFBQSxpQkFxQkM7UUFuQkkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBRyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFFLElBQUksRUFDOUI7WUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxtQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWE7WUFDNUMsSUFBRyxLQUFLLEVBQ1I7Z0JBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO2lCQUNEO2dCQUNJLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUNBQWEsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDLENBQUM7YUFDeko7UUFDTCxDQUFDLEVBQUMsc0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsMkJBQVcsR0FBWDtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFoRWlCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FpRXpCO0lBQUQsWUFBQztDQWpFRCxBQWlFQyxDQWpFa0MsRUFBRSxDQUFDLFNBQVMsR0FpRTlDO2tCQWpFb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZE1hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmlwTWFuYWdlciB9IGZyb20gXCIuLi9BZHMvVmlwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBWSURFT19UWVBFIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdUh1byBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTEwO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT0xMTtcclxuICAgICAgICB0aGlzLnNob3dSZW1haW4oKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbiwxKTtcclxuICAgICAgICBpZihWaXBNYW5hZ2VyLmdldElzVmlwKCk9PXRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2FkcycpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlbWFpbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZS0tO1xyXG4gICAgICAgIGxldCByZW1haW5MYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkZ1SHVvJykuZ2V0Q2hpbGRCeU5hbWUoJ3JlbWFpbkxhYmVsJyk7XHJcbiAgICAgICAgcmVtYWluTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5yZW1haW5fdGltZSsncyc7XHJcbiAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTw9MClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lTG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICBjbGlja0J0bkZhbmdRaSgpXHJcbiAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgIH1cclxuXHJcbiAgIGNsaWNrQnRuRnVodW8oKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihWaXBNYW5hZ2VyLmdldElzVmlwKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uRnVodW8oKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW4pO1xyXG4gICAgICAgIEFkTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoaXNTdWM6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgaWYoaXNTdWMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkub25GdWh1bygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpbiwxKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVGhlX2FkX2ZhaWxlZF90b19wbGF5X2FuZF90aGVfcmV3YXJkX2Nhbm5vdF9iZV9vYnRhaW5lZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxWSURFT19UWVBFLkNvaW4pO1xyXG4gICB9XHJcblxyXG4gICBkZXN0cm95U2VsZigpXHJcbiAgIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgfVxyXG59XHJcbiJdfQ==