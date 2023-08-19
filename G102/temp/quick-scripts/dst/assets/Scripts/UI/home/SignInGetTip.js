
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignInGetTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25JbkdldFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBeUU7QUFHekUsaURBQTRDO0FBRTVDLHNEQUFxRDtBQUNyRCw4Q0FBeUM7QUFDekMsd0NBQTJDO0FBRTNDLDBDQUF5QztBQUVuQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBVztJQUFyRDtRQUFBLHFFQThEQztRQTVERyxpQkFBVyxHQUFjLElBQUksQ0FBQzs7SUE0RGxDLENBQUM7SUExREcsMkJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsVUFBcUI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxNQUFNLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUFBLGlCQWtDQztRQWpDRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBRXhDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsRSxRQUFRLEVBQUUseUJBQXlCO2FBQ3RDLENBQUMsQ0FBQztZQUNILHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0MscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ1gscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDckQsT0FBTztnQkFDUCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRTtxQkFDN0MsSUFBSSxDQUFDLGNBQU0sT0FBQSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFsRCxDQUFrRCxDQUFDO3FCQUM5RCxLQUFLLENBQUMsVUFBQSxHQUFHO29CQUNOLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFBO1lBQ0YscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNuRCxnQkFBZ0I7Z0JBQ2hCLG9DQUFvQztnQkFDcEMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUMzQyxrQkFBa0I7b0JBQ2xCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDckI7cUJBQ0k7b0JBQ0QsaUJBQWlCO2lCQUNwQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1NBRUw7YUFBSTtZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDTyxtQ0FBWSxHQUFwQjtRQUNJLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsdUJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFDRCw4QkFBTyxHQUFQO1FBQ0ksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTFFLENBQUM7SUE1RGdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E4RGhDO0lBQUQsbUJBQUM7Q0E5REQsQUE4REMsQ0E5RHlDLHFCQUFXLEdBOERwRDtrQkE5RG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV1hNYW5hZ2VyRVgsIHsgV1hBREVudm50IH0gZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5HZXRUaXAgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgcmV3YXJkX2luZm86UmV3YXJkRGF0YSA9IG51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oV1hBREVudm50LlFJUklRSUFOREFPU0hJUElOLCB0aGlzLm9uU2hpcGluQ29tcCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEocmV3YXJkSW5mbzpSZXdhcmREYXRhKXtcclxuICAgICAgICB0aGlzLnJld2FyZF9pbmZvID0gcmV3YXJkSW5mbztcclxuICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmRJbmZvLnJld2FyZF9pZCxyZXdhcmRJbmZvLnJld2FyZF9udW0pO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIik7XHJcbiAgICAgICAgcm9vdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHJvb3QuYWRkQ2hpbGQocmV3YXJkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQWRCdG4oKXtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW49IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogJ2FkdW5pdC1mYWZlNWQwNWFjMjBjMDFiJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5vZmZFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ub2ZmQ2xvc2UoKTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5xaXJpUWlhbmRhb1NoaXBpbi5zaG93KCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5aSx6LSl6YeN6K+VXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnFpcmlRaWFuZGFvU2hpcGluLmxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4uc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi5bm/5ZGK5ouJ5Y+W5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucWlyaVFpYW5kYW9TaGlwaW4ub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNoaXBpbkNvbXAoKTogdm9pZCB7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VBbGxVaURpYWxvZyhVSUxheWVyTGV2ZWwuVHdvKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5yZXdhcmRfaW5mby5yZXdhcmRfaWQsdGhpcy5yZXdhcmRfaW5mby5yZXdhcmRfbnVtKTtcclxuICAgIH1cclxuICAgIG9uQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihXWEFERW52bnQuUUlSSVFJQU5EQU9TSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==