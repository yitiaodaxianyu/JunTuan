
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/purchasesnumbe.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8e7126kLIBB7L4jC47qrDcO', 'purchasesnumbe');
// Scripts/copy/endlesschallenges/purchasesnumbe.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CoinPop_1 = require("../../CoinPop");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var purchasesnumbe = /** @class */ (function (_super) {
    __extends(purchasesnumbe, _super);
    function purchasesnumbe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.num = null;
        _this.mynum = [50, 200, 300]; //[50,100,150]
        _this.type = 0; //2:无尽挑战   3：boss挑战
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    purchasesnumbe.prototype.initUi = function (type) {
        var buynum;
        this.type = type;
        if (this.type == 2) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, 3);
        }
        else if (this.type == 3) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyBossChallengeTimes, 3);
        }
        else if (this.type == 4) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, 3);
        }
        this.num.getComponent(cc.Label).string = "" + this.mynum[3 - buynum];
    };
    purchasesnumbe.prototype.clickBtnBuy = function () {
        var buynum;
        if (this.type == 2) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, 3);
        }
        else if (this.type == 3) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyBossChallengeTimes, 3);
        }
        else if (this.type == 4) {
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, 3);
        }
        var gem = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem);
        if (gem >= this.mynum[3 - buynum]) {
            //可以购买
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -this.mynum[3 - buynum]);
            buynum--;
            if (this.type == 2) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战挑战次数购买数);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_挑战次数购买数_每日第x次购买 + (3 - buynum));
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, buynum);
                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 0);
                num++;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, num);
            }
            else if (this.type == 3) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战挑战次数购买数);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战_挑战次数购买数_每日第x次购买 + (3 - buynum));
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyBossChallengeTimes, buynum);
                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 0);
                num++;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, num);
            }
            else if (this.type == 4) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.虚空裂缝挑战次数购买数);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.虚空裂缝_挑战次数购买数_每日第x次购买 + (3 - buynum));
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, buynum);
                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 0);
                num++;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, num);
            }
            this.clickBtnClose();
        }
        else {
            //钱不够
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
        }
    };
    purchasesnumbe.prototype.clickBtnBuyAd = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            if (isTrue) {
                var buynum = void 0;
                if (_this.type == 2) {
                    buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, 3);
                }
                else if (_this.type == 3) {
                    buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyBossChallengeTimes, 3);
                }
                else if (_this.type == 4) {
                    buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, 3);
                }
                //可以购买
                PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -_this.mynum[3 - buynum]);
                buynum--;
                if (_this.type == 2) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战挑战次数购买数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_挑战次数购买数_每日第x次购买 + (3 - buynum));
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, buynum);
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, num);
                }
                else if (_this.type == 3) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战挑战次数购买数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战_挑战次数购买数_每日第x次购买 + (3 - buynum));
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyBossChallengeTimes, buynum);
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, num);
                }
                else if (_this.type == 4) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.虚空裂缝挑战次数购买数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.虚空裂缝_挑战次数购买数_每日第x次购买 + (3 - buynum));
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, buynum);
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, num);
                }
                _this.clickBtnClose();
            }
        }), Constants_1.VIDEO_TYPE.Equip);
    };
    purchasesnumbe.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], purchasesnumbe.prototype, "num", void 0);
    purchasesnumbe = __decorate([
        ccclass
    ], purchasesnumbe);
    return purchasesnumbe;
}(UIComponent_1.default));
exports.default = purchasesnumbe;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXHB1cmNoYXNlc251bWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsNkNBQTZDO0FBQzdDLGlEQUE0QztBQUM1Qyx1RUFBa0U7QUFDbEUsbUVBQThEO0FBRTlELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsb0RBQStDO0FBQy9DLDhDQUF5RDtBQUN6RCxnREFBK0M7QUFHekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVc7SUFBdkQ7UUFBQSxxRUEwSEM7UUF4SEcsU0FBRyxHQUFZLElBQUksQ0FBQTtRQUNuQixXQUFLLEdBQVUsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUEsY0FBYztRQUN6QyxVQUFJLEdBQVcsQ0FBQyxDQUFBLENBQUEsbUJBQW1COztRQTZHbkMsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixhQUFhO1FBRWIsSUFBSTtRQUVKLGlCQUFpQjtJQUNyQixDQUFDO0lBcEhHLCtCQUFNLEdBQU4sVUFBTyxJQUFJO1FBQ1AsSUFBSSxNQUFNLENBQUE7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQTtRQUNkLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLEVBQUM7WUFDWixNQUFNLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsMEJBQTBC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LENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDQztJQUZGLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0EwSGxDO0lBQUQscUJBQUM7Q0ExSEQsQUEwSEMsQ0ExSDJDLHFCQUFXLEdBMEh0RDtrQkExSG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4uLy4uL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4vQm9zc1dlZWtseVJld2FyZFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHB1cmNoYXNlc251bWJlIGV4dGVuZHMgVUlDb21wb25lbnQgeyAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbnVtOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgbXludW06bnVtYmVyW109WzUwLDIwMCwzMDBdLy9bNTAsMTAwLDE1MF1cclxuICAgIHR5cGU6IG51bWJlciA9IDAvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgIFxyXG4gICAgaW5pdFVpKHR5cGUpIHtcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGVcclxuICAgICAgICBpZih0aGlzLnR5cGU9PTIpe1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMudHlwZT09Myl7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Qm9zc0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMudHlwZT09NCl7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrdGhpcy5teW51bVszLWJ1eW51bV1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQnV5KCl7Ly/pkrvnn7PotK3kubBcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgaWYodGhpcy50eXBlPT0yKXtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnR5cGU9PTMpe1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnR5cGU9PTQpe1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2VtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuXHJcblxyXG4gICAgICAgIGlmKGdlbT49dGhpcy5teW51bVszLWJ1eW51bV0pe1xyXG4gICAgICAgICAgICAvL+WPr+S7pei0reS5sFxyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtdGhpcy5teW51bVszLWJ1eW51bV0pO1xyXG4gICAgICAgICAgICBidXludW0tLVxyXG4gICAgICAgICAgICBpZih0aGlzLnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImOaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwKygzLWJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsYnV5bnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyxudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnR5cGU9PTMpe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJhf5oyR5oiY5qyh5pWw6LSt5Lmw5pWwX+avj+aXpeesrHjmrKHotK3kubArKDMtYnV5bnVtKSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsYnV5bnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgICAgICBudW0rK1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnR5cGU9PTQpe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiZmuepuuijgue8neaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57ydX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwKygzLWJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsYnV5bnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcyxudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v6ZKx5LiN5aSfXHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVGhyZWUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1eUFkKCl7Ly/lub/lkYrotK3kubBcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKCgoaXNUcnVlKT0+e1xyXG4gICAgICAgICAgICBpZihpc1RydWUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1eW51bVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy50eXBlPT0zKXtcclxuICAgICAgICAgICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy50eXBlPT00KXtcclxuICAgICAgICAgICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lj6/ku6XotK3kubBcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC10aGlzLm15bnVtWzMtYnV5bnVtXSk7XHJcbiAgICAgICAgICAgICAgICBidXludW0tLVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiY5oyR5oiY5qyh5pWw6LSt5Lmw5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwKygzLWJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLGJ1eW51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsbnVtKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudHlwZT09Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5CT1NT5oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwKygzLWJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcyxidXludW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsbnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy50eXBlPT00KXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57yd5oyR5oiY5qyh5pWw6LSt5Lmw5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57ydX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwKygzLWJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLGJ1eW51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsbnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxWSURFT19UWVBFLkVxdWlwKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==