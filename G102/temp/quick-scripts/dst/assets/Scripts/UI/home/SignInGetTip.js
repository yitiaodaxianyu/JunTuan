
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
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
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
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.Two);
            PropManager_1.PropManager.getInstance().changePropNum(_this.reward_info.reward_id, _this.reward_info.reward_num);
        }), Constants_1.VIDEO_TYPE.Equip);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25JbkdldFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNkNBQTZDO0FBRTdDLHNEQUFxRDtBQUNyRCw4Q0FBeUM7QUFDekMsd0NBQTJDO0FBRTNDLDBDQUF5QztBQUVuQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBVztJQUFyRDtRQUFBLHFFQXVCQztRQXJCRyxpQkFBVyxHQUFjLElBQUksQ0FBQzs7SUFxQmxDLENBQUM7SUFuQkcsMkJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxVQUFxQjtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxtQ0FBWSxHQUFaO1FBQUEsaUJBS0M7UUFKRyxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQUMsTUFBTTtZQUN2QyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLHVCQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRyxDQUFDLENBQUMsRUFBQyxzQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFyQmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F1QmhDO0lBQUQsbUJBQUM7Q0F2QkQsQUF1QkMsQ0F2QnlDLHFCQUFXLEdBdUJwRDtrQkF2Qm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5HZXRUaXAgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgcmV3YXJkX2luZm86UmV3YXJkRGF0YSA9IG51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEocmV3YXJkSW5mbzpSZXdhcmREYXRhKXtcclxuICAgICAgICB0aGlzLnJld2FyZF9pbmZvID0gcmV3YXJkSW5mbztcclxuICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmRJbmZvLnJld2FyZF9pZCxyZXdhcmRJbmZvLnJld2FyZF9udW0pO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIik7XHJcbiAgICAgICAgcm9vdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHJvb3QuYWRkQ2hpbGQocmV3YXJkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQWRCdG4oKXtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKCgoaXNUcnVlKT0+e1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5Ud28pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5yZXdhcmRfaW5mby5yZXdhcmRfaWQsdGhpcy5yZXdhcmRfaW5mby5yZXdhcmRfbnVtKTtcclxuICAgICAgICB9KSxWSURFT19UWVBFLkVxdWlwKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19