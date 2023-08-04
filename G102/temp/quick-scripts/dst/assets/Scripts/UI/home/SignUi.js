
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '199d4jMcb1PxrnT7MaRKx4x', 'SignUi');
// Scripts/UI/home/SignUi.ts

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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var SignInBuyUi_1 = require("./SignInBuyUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignUi = /** @class */ (function (_super) {
    __extends(SignUi, _super);
    function SignUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sign_in_ui = null;
        _this.today = null;
        return _this;
    }
    SignUi.prototype.init = function (uiAc) {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手签到点击次数);
        _super.prototype.init.call(this, uiAc);
        this.refreshUi();
    };
    SignUi.prototype.refreshUi = function () {
        var root = this.node.getChildByName("dayBgRoot");
        var itemRoot = this.node.getChildByName("itemRoot");
        itemRoot.removeAllChildren();
        var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
        for (var i = 0; i < data.length; i++) {
            var itemParent = root.getChildByName("day" + i);
            itemParent.getComponentInChildren(TextLanguage_1.default).setReplaceValue('~', (i + 1) + '');
            var item = PropManager_1.PropManager.getInstance().createPropItem(data[i].Item, data[i].Num);
            // let temp = itemParent.children[0];
            // itemParent.removeAllChildren();
            // itemParent.addChild(temp);
            item.name = "item" + i;
            itemRoot.addChild(item);
            item.setPosition(cc.v2(itemParent.x, itemParent.y - 15));
            if (i < StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                var bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn_Got");
                bg.addChild(gou);
                gou.setPosition(cc.v2(0, -10));
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            }
            else if (i > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)) {
                var bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                if (i == 6) {
                    bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                }
                bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                itemRoot.addChild(bg);
            }
            else {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
                    item.getComponent(cc.Button).enabled = false;
                }
                else {
                    var bg = new cc.Node();
                    bg.addComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_2_Mask");
                    if (i == 6) {
                        bg.getComponent(cc.Sprite).spriteFrame = this.sign_in_ui.getSpriteFrame("SignIn7_Bg_3_Mask");
                    }
                    bg.setPosition(cc.v2(itemParent.x, itemParent.y));
                    itemRoot.addChild(bg);
                }
            }
        }
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 1) {
            // this.node.getChildByName("receiveBtn").active = false;
            this.today.active = false;
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = false;
        }
        else {
            // this.node.getChildByName("receiveBtn").active = true;
            this.today.active = true;
            var item = itemRoot.getChildByName("item" + (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0)));
            this.today.setPosition(item.x, item.y - 5);
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = true;
        }
    };
    SignUi.prototype.onReceiveBtnClick = function (e, num) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0);
        if (num == '' || num == undefined)
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, 0) + '';
        if (Number(num) != index)
            return;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
            var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(SignIn_1.SignInType.SavenDay);
            var reward = PropManager_1.PropManager.getInstance().createPropItem(data[index].Item, data[index].Num);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手签到x天的点击次数 + index);
            PropManager_1.PropManager.getInstance().changePropNum(data[index].Item, data[index].Num);
            GameManager_1.default.getInstance().showGetTip(reward);
            // this.node.getChildByName("receiveBtn").active = false;
            index++;
            if (index > 6) {
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 1);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateSevenGift, this.getUserIdJsonString());
            }
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, index);
            this.refreshUi();
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_SignIn, false, EventManager_1.RedEventType.Btn_Main_SignIn_BtnGet);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInTime, new Date().getTime());
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.sevenSign, this.getUserIdJsonString());
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(230008));
        }
    };
    SignUi.prototype.onClickBuyBtn = function () {
        this.onClose();
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击解锁5倍奖励按钮的点击次数);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInBuy, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(SignInBuyUi_1.default).init(null);
                uiNode.getComponent(SignInBuyUi_1.default).iniData();
            }
        });
    };
    SignUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    SignUi.prototype.getUserIdJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], SignUi.prototype, "sign_in_ui", void 0);
    __decorate([
        property(cc.Node)
    ], SignUi.prototype, "today", void 0);
    SignUi = __decorate([
        ccclass
    ], SignUi);
    return SignUi;
}(UIComponent_1.default));
exports.default = SignUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0U7QUFDdEUsbURBQThDO0FBRTlDLGlEQUE0QztBQUM1QyxnREFBa0U7QUFDbEUsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBRTVELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSx5REFBc0Y7QUFDdEYsMkNBQXNDO0FBQ3RDLDhDQUF5QztBQUN6Qyx3Q0FBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLDZDQUF3QztBQUdsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBVztJQUEvQztRQUFBLHFFQTBJQztRQXZJRyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFXLElBQUksQ0FBQzs7SUFxSXpCLENBQUM7SUFuSUcscUJBQUksR0FBSixVQUFLLElBQWM7UUFDZix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksR0FB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WyJpbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaWduSW5NYW5hZ2VyLCBTaWduSW5UeXBlIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1NpZ25JblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgU2lnbkluQnV5VWkgZnJvbSBcIi4vU2lnbkluQnV5VWlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgc2lnbl9pbl91aTpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRvZGF5OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5paw5omL562+5Yiw54K55Ye75qyh5pWwKTtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkYXlCZ1Jvb3RcIik7XHJcbiAgICAgICAgbGV0IGl0ZW1Sb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIik7XHJcbiAgICAgICAgaXRlbVJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgZGF0YSA9IFNpZ25Jbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhQnlTaWduSW5UeXBlKFNpZ25JblR5cGUuU2F2ZW5EYXkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbVBhcmVudCA9IHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJkYXlcIiArIGkpO1xyXG4gICAgICAgICAgICBpdGVtUGFyZW50LmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLChpKzEpKycnKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGRhdGFbaV0uSXRlbSxkYXRhW2ldLk51bSk7XHJcbiAgICAgICAgICAgIC8vIGxldCB0ZW1wID0gaXRlbVBhcmVudC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgLy8gaXRlbVBhcmVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAvLyBpdGVtUGFyZW50LmFkZENoaWxkKHRlbXApO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBcIml0ZW1cIiArIGk7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKGNjLnYyKGl0ZW1QYXJlbnQueCxpdGVtUGFyZW50LnktMTUpKTtcclxuICAgICAgICAgICAgaWYoaSA8IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sMCkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18yX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICBpZihpID09IDYpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18zX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgZ291LnNldFBvc2l0aW9uKGNjLnYyKDAsLTEwKSk7XHJcbiAgICAgICAgICAgICAgICBiZy5zZXRQb3NpdGlvbihjYy52MihpdGVtUGFyZW50LngsaXRlbVBhcmVudC55KSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihpID4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwwKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzJfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgIGlmKGkgPT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzNfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJnLnNldFBvc2l0aW9uKGNjLnYyKGl0ZW1QYXJlbnQueCxpdGVtUGFyZW50LnkpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGJnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwwKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5CdXR0b24pLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzJfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09IDYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfM19NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZy5zZXRQb3NpdGlvbihjYy52MihpdGVtUGFyZW50LngsaXRlbVBhcmVudC55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApID09IDEpe1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50b2RheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1Sb290LmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKyhUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLDApKSk7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkuc2V0UG9zaXRpb24oaXRlbS54LGl0ZW0ueSAtIDUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiBcclxuICAgIG9uUmVjZWl2ZUJ0bkNsaWNrKGUsbnVtOnN0cmluZyl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLDApO1xyXG4gICAgICAgIGlmKG51bSA9PSAnJyB8fCBudW0gPT0gdW5kZWZpbmVkKSBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLDApICsgJyc7XHJcbiAgICAgICAgaWYoTnVtYmVyKG51bSkgIT0gaW5kZXgpIHJldHVybjtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwwKSA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YUJ5U2lnbkluVHlwZShTaWduSW5UeXBlLlNhdmVuRGF5KTtcclxuICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YVtpbmRleF0uSXRlbSxkYXRhW2luZGV4XS5OdW0pO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5paw5omL562+5YiweOWkqeeahOeCueWHu+asoeaVsCArIGluZGV4KTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGRhdGFbaW5kZXhdLkl0ZW0sZGF0YVtpbmRleF0uTnVtKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKHJld2FyZCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID4gNil7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsMSk7XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlU2V2ZW5HaWZ0LHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5TaWduSW4sMSk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAsUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25JbixmYWxzZSxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluX0J0bkdldCk7XHJcblxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25JblRpbWUsbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuc2V2ZW5TaWduLHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgyMzAwMDgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J1eUJ0bigpe1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueCueWHu+ino+mUgTXlgI3lpZblirHmjInpkq7nmoTngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2lnbkluQnV5LFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduSW5CdXlVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnbkluQnV5VWkpLmluaURhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgZ2V0VXNlcklkSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19