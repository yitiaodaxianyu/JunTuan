
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0U7QUFDdEUsbURBQThDO0FBRTlDLGlEQUE0QztBQUM1QyxnREFBa0U7QUFDbEUsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBRTVELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSx5REFBc0Y7QUFDdEYsMkNBQXNDO0FBQ3RDLDhDQUF5QztBQUN6Qyx3Q0FBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLDZDQUF3QztBQUdsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBVztJQUEvQztRQUFBLHFFQXdJQztRQXJJRyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFXLElBQUksQ0FBQzs7SUFtSXpCLENBQUM7SUFqSUcscUJBQUksR0FBSixVQUFLLElBQWM7UUFDZix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksR0FB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VUFBQyxNQUFNO2dCQUNmLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0MsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw4QkFBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBRUksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBR08sb0NBQW1CLEdBQTNCO1FBQ0ksSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFDLEdBQUc7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDO0lBbklEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7OENBQ1E7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDRztJQUxKLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0F3STFCO0lBQUQsYUFBQztDQXhJRCxBQXdJQyxDQXhJbUMscUJBQVcsR0F3STlDO2tCQXhJb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNpZ25Jbk1hbmFnZXIsIFNpZ25JblR5cGUgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvU2lnbkluXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uLy4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBTaWduSW5CdXlVaSBmcm9tIFwiLi9TaWduSW5CdXlVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBzaWduX2luX3VpOmNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdG9kYXk6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvnrb7liLDngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRheUJnUm9vdFwiKTtcclxuICAgICAgICBsZXQgaXRlbVJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKTtcclxuICAgICAgICBpdGVtUm9vdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBkYXRhID0gU2lnbkluTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVNpZ25JblR5cGUoU2lnbkluVHlwZS5TYXZlbkRheSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUGFyZW50ID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcImRheVwiICsgaSk7XHJcbiAgICAgICAgICAgIGl0ZW1QYXJlbnQuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGkrMSkrJycpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oZGF0YVtpXS5JdGVtLGRhdGFbaV0uTnVtKTtcclxuICAgICAgICAgICAgLy8gbGV0IHRlbXAgPSBpdGVtUGFyZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAvLyBpdGVtUGFyZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW1QYXJlbnQuYWRkQ2hpbGQodGVtcCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwiaXRlbVwiICsgaTtcclxuICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oY2MudjIoaXRlbVBhcmVudC54LGl0ZW1QYXJlbnQueS0xNSkpO1xyXG4gICAgICAgICAgICBpZihpIDwgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSwwKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzJfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgIGlmKGkgPT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW43X0JnXzNfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZ291LmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICBnb3Uuc2V0UG9zaXRpb24oY2MudjIoMCwtMTApKTtcclxuICAgICAgICAgICAgICAgIGJnLnNldFBvc2l0aW9uKGNjLnYyKGl0ZW1QYXJlbnQueCxpdGVtUGFyZW50LnkpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGJnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGkgPiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtLDApKXtcclxuICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfMl9NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoaSA9PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICBiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfM19NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYmcuc2V0UG9zaXRpb24oY2MudjIoaXRlbVBhcmVudC54LGl0ZW1QYXJlbnQueSkpO1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25JbjdfQmdfMl9NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluN19CZ18zX01hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJnLnNldFBvc2l0aW9uKGNjLnYyKGl0ZW1QYXJlbnQueCxpdGVtUGFyZW50LnkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sMCkgPT0gMSl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ1JlZFRpcCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbVJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIrKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sMCkpKTtcclxuICAgICAgICAgICAgdGhpcy50b2RheS5zZXRQb3NpdGlvbihpdGVtLngsaXRlbS55IC0gNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ1JlZFRpcCcpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgb25SZWNlaXZlQnRuQ2xpY2soZSxudW06c3RyaW5nKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBpbmRleCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sMCk7XHJcbiAgICAgICAgaWYobnVtID09ICcnIHx8IG51bSA9PSB1bmRlZmluZWQpIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0sMCkgKyAnJztcclxuICAgICAgICBpZihOdW1iZXIobnVtKSAhPSBpbmRleCkgcmV0dXJuO1xyXG4gICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApID09IDApe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IFNpZ25Jbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhQnlTaWduSW5UeXBlKFNpZ25JblR5cGUuU2F2ZW5EYXkpO1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShkYXRhW2luZGV4XS5JdGVtLGRhdGFbaW5kZXhdLk51bSk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvnrb7liLB45aSp55qE54K55Ye75qyh5pWwICsgaW5kZXgpO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oZGF0YVtpbmRleF0uSXRlbSxkYXRhW2luZGV4XS5OdW0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgaWYoaW5kZXggPiA2KXtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwxKTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVTZXZlbkdpZnQsdGhpcy5nZXRVc2VySWRKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwxKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0saW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluLGZhbHNlLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW5fQnRuR2V0KTtcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNldmVuU2lnbix0aGlzLmdldFVzZXJJZEpzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMjMwMDA4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tCdXlCdG4oKXtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vop6PplIE15YCN5aWW5Yqx5oyJ6ZKu55qE54K55Ye75qyh5pWwKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbkJ1eSxVSUxheWVyTGV2ZWwuT25lLHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnbkluQnV5VWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25JbkJ1eVVpKS5pbmlEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGdldFVzZXJJZEpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==