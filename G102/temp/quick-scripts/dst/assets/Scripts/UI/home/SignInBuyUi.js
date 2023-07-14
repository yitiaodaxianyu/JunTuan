
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignInBuyUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '954f1hEmxZIerjfvPFRvPRS', 'SignInBuyUi');
// Scripts/UI/home/SignInBuyUi.ts

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
var HttpManager_1 = require("../.././NetWork/HttpManager");
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var SignIn_1 = require("../../JsonData/SignIn");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var PayManager_1 = require("../../Payment/PayManager");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var googldId = "c601";
var SignInBuyUi = /** @class */ (function (_super) {
    __extends(SignInBuyUi, _super);
    function SignInBuyUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInBuyUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    SignInBuyUi.prototype.iniData = function () {
        this.refreshUi();
    };
    SignInBuyUi.prototype.refreshUi = function () {
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(googldId);
        var rewardList = new Map();
        for (var i = 0; i < data.length; i++) {
            // let item:cc.Node = null;
            if (i < index) {
                // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                if (rewardList.has(data[i].Item)) {
                    var num = rewardList.get(data[i].Item);
                    num += data[i].Num * 4;
                    rewardList.set(data[i].Item, num);
                }
                else {
                    rewardList.set(data[i].Item, data[i].Num * 4);
                }
            }
            else {
                if (rewardList.has(data[i].Item)) {
                    var num = rewardList.get(data[i].Item);
                    num += data[i].Num * 5;
                    rewardList.set(data[i].Item, num);
                }
                else {
                    rewardList.set(data[i].Item, data[i].Num * 5);
                }
            }
        }
        rewardList.forEach(function (num, id) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
            content.addChild(item);
        });
        this.node.getChildByName("sure").getComponentInChildren(cc.Label).string = payInfo.price;
    };
    SignInBuyUi.prototype.onClickSureBtn = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showPay({
            result: function (isDy) {
                if (isDy) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击解锁5倍奖励的购买成功次数);
                    var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
                    var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
                    var rewardList = new Map();
                    for (var i = 0; i < data.length; i++) {
                        // let item:cc.Node = null;
                        if (i < index) {
                            // item = PropManager.getInstance().createPropItem(data[i].Item,data[i].Num * 4);
                            if (rewardList.has(data[i].Item)) {
                                var num = rewardList.get(data[i].Item);
                                num += data[i].Num * 4;
                                rewardList.set(data[i].Item, num);
                            }
                            else {
                                rewardList.set(data[i].Item, data[i].Num * 4);
                            }
                        }
                        else {
                            if (rewardList.has(data[i].Item)) {
                                var num = rewardList.get(data[i].Item);
                                num += data[i].Num * 5;
                                rewardList.set(data[i].Item, num);
                            }
                            else {
                                rewardList.set(data[i].Item, data[i].Num * 5);
                            }
                        }
                    }
                    var rewardList1_1 = [];
                    rewardList.forEach(function (num, id) {
                        PropManager_1.PropManager.getInstance().changePropNum(id, num);
                        var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
                        rewardList1_1.push(item);
                    });
                    GameManager_1.default.getInstance().showMultipleGetTip(rewardList1_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 1);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateSevenGift, _this.getUserIdJsonString());
                    _this.onClose();
                }
            }
        }, googldId);
    };
    SignInBuyUi.prototype.onClickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignInBuyUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    SignInBuyUi.prototype.getUserIdJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    SignInBuyUi = __decorate([
        ccclass
    ], SignInBuyUi);
    return SignInBuyUi;
}(UIComponent_1.default));
exports.default = SignInBuyUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25JbkJ1eVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRTtBQUN0RSxtREFBOEM7QUFDOUMsaURBQTRDO0FBQzVDLGdEQUFrRTtBQUNsRSx1RUFBa0U7QUFDbEUsbUVBQThEO0FBQzlELHVEQUFzRDtBQUN0RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsMkNBQXNDO0FBQ3RDLDhDQUF5QztBQUduQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFHeEI7SUFBeUMsK0JBQVc7SUFBcEQ7O0lBNEdBLENBQUM7SUExR0csMEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLEtBQUssR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQywwQkFBMEIsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUM5RixJQUFJLElBQUksR0FBRyxzQkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLG1CQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDckYsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENB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RCxpQ0FBVyxHQUFYO1FBRUksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxvRkFBb0Y7SUFDeEYsQ0FBQztJQUVPLHlDQUFtQixHQUEzQjtRQUNJLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNHZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTRHL0I7SUFBRCxrQkFBQztDQTVHRCxBQTRHQyxDQTVHd0MscUJBQVcsR0E0R25EO2tCQTVHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNYW5hZ2VyLCBBY2Nlc3NOYW1lIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaWduSW5NYW5hZ2VyLCBTaWduSW5UeXBlIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1NpZ25JblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VaUludGVyZmFjZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBnb29nbGRJZCA9IFwiYzYwMVwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbkluQnV5VWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pRGF0YSgpe1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwwKVxyXG4gICAgICAgIGxldCBkYXRhID0gU2lnbkluTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVNpZ25JblR5cGUoU2lnbkluVHlwZS5TYXZlbkRheSk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBwYXlJbmZvID0gUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8oZ29vZ2xkSWQpO1xyXG4gICAgICAgIGxldCByZXdhcmRMaXN0ID0gbmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAvLyBsZXQgaXRlbTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoaTxpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvLyBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShkYXRhW2ldLkl0ZW0sZGF0YVtpXS5OdW0gKiA0KTtcclxuICAgICAgICAgICAgICAgIGlmKHJld2FyZExpc3QuaGFzKGRhdGFbaV0uSXRlbSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSByZXdhcmRMaXN0LmdldChkYXRhW2ldLkl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSArPSBkYXRhW2ldLk51bSAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQoZGF0YVtpXS5JdGVtLG51bSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sZGF0YVtpXS5OdW0gKiA0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihyZXdhcmRMaXN0LmhhcyhkYXRhW2ldLkl0ZW0pKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gcmV3YXJkTGlzdC5nZXQoZGF0YVtpXS5JdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0gKz0gZGF0YVtpXS5OdW0gKiA1O1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KGRhdGFbaV0uSXRlbSxudW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQoZGF0YVtpXS5JdGVtLGRhdGFbaV0uTnVtICogNSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV3YXJkTGlzdC5mb3JFYWNoKChudW0saWQpPT57XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3VyZVwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBwYXlJbmZvLnByaWNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tTdXJlQnRuKCl7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXkoe1xyXG4gICAgICAgICAgICByZXN1bHQ6KGlzRHkpPT57XHJcbiAgICAgICAgICAgICAgICBpZihpc0R5KXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye76Kej6ZSBNeWAjeWlluWKseeahOi0reS5sOaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gU2lnbkluTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVNpZ25JblR5cGUoU2lnbkluVHlwZS5TYXZlbkRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZExpc3QgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBpdGVtOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpPGluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMoZGF0YVtpXS5JdGVtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KGRhdGFbaV0uSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtICs9IGRhdGFbaV0uTnVtICogNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSAqIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJld2FyZExpc3QuaGFzKGRhdGFbaV0uSXRlbSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSByZXdhcmRMaXN0LmdldChkYXRhW2ldLkl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bSArPSBkYXRhW2ldLk51bSAqIDU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQoZGF0YVtpXS5JdGVtLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0LnNldChkYXRhW2ldLkl0ZW0sZGF0YVtpXS5OdW0gKiA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkTGlzdDEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0LmZvckVhY2goKG51bSxpZCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGlkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0MS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAocmV3YXJkTGlzdDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwxKTtcclxuICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlU2V2ZW5HaWZ0LHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sZ29vZ2xkSWQpXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VXNlcklkSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=