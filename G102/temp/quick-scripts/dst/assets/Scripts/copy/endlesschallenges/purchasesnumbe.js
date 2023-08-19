
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var CoinPop_1 = require("../../CoinPop");
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
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                },
            });
        }
    };
    purchasesnumbe.prototype.clickBtnBuyAd = function () {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (this.type == 2) {
                WXManagerEX_1.default.getInstance().cardByAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-f93dddec700f320f'
                });
            }
            else if (this.type == 3) {
                WXManagerEX_1.default.getInstance().cardByAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-a569c3a5f40ffd43'
                });
            }
            else if (this.type == 4) {
                WXManagerEX_1.default.getInstance().cardByAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-5d9c656083442416'
                });
            }
            WXManagerEX_1.default.getInstance().cardByAd.offError();
            WXManagerEX_1.default.getInstance().cardByAd.onError(function (err) {
                console.log(err);
            });
            WXManagerEX_1.default.getInstance().cardByAd.offClose();
            WXManagerEX_1.default.getInstance().cardByAd.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().cardByAd.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().cardByAd.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                });
            });
            WXManagerEX_1.default.getInstance().cardByAd.onClose(function (res) {
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
    purchasesnumbe.prototype.onShipinComp = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXHB1cmNoYXNlc251bWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtEQUEwRDtBQUUxRCx5Q0FBb0M7QUFFcEMsaURBQTRDO0FBQzVDLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsb0RBQStDO0FBQy9DLHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxvREFBK0M7QUFDL0MsOENBQXlEO0FBQ3pELGdEQUErQztBQUd6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQStLQztRQTdLRyxTQUFHLEdBQVksSUFBSSxDQUFBO1FBQ25CLFdBQUssR0FBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQSxjQUFjO1FBQzlDLFVBQUksR0FBVyxDQUFDLENBQUEsQ0FBQSxtQkFBbUI7O1FBa0tuQyx3QkFBd0I7UUFFeEIsZUFBZTtRQUVmLGFBQWE7UUFFYixJQUFJO1FBRUosaUJBQWlCO0lBQ3JCLENBQUM7SUF6S0csK0JBQU0sR0FBTixVQUFPLElBQUk7UUFDUCxJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsTUFBTSxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLDBCQUEwQixFQUFFLENBQUMs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RUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNGLEdBQUcsRUFBRSxDQUFBO1lBQ0wsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDcEY7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELHNDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQW5LRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNDO0lBRkYsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQStLbEM7SUFBRCxxQkFBQztDQS9LRCxBQStLQyxDQS9LMkMscUJBQVcsR0ErS3REO2tCQS9Lb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4uLy4uL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4vQm9zc1dlZWtseVJld2FyZFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHB1cmNoYXNlc251bWJlIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBudW06IGNjLk5vZGUgPSBudWxsXHJcbiAgICBteW51bTogbnVtYmVyW10gPSBbNTAsIDIwMCwgMzAwXS8vWzUwLDEwMCwxNTBdXHJcbiAgICB0eXBlOiBudW1iZXIgPSAwLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcblxyXG4gICAgaW5pdFVpKHR5cGUpIHtcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Qm9zc0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB0aGlzLm15bnVtWzMgLSBidXludW1dXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1eSgpIHsvL+mSu+efs+i0reS5sFxyXG4gICAgICAgIGxldCBidXludW1cclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2VtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGdlbSA+PSB0aGlzLm15bnVtWzMgLSBidXludW1dKSB7XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul6LSt5LmwXHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLCAtdGhpcy5teW51bVszIC0gYnV5bnVtXSk7XHJcbiAgICAgICAgICAgIGJ1eW51bS0tXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImOaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLCBidXludW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIDApO1xyXG4gICAgICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCBudW0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImOaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImF/mjJHmiJjmrKHmlbDotK3kubDmlbBf5q+P5pel56yseOasoei0reS5sCArICgzIC0gYnV5bnVtKSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsIGJ1eW51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIDApO1xyXG4gICAgICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywgbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiZmuepuuijgue8neaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57ydX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCBidXludW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIDApO1xyXG4gICAgICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCBudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/pkrHkuI3lpJ9cclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLCBVSUxheWVyTGV2ZWwuVGhyZWUsIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQnV5QWQoKSB7Ly/lub/lkYrotK3kubBcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtZjkzZGRkZWM3MDBmMzIwZidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiBcclxuXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJ2FkdW5pdC1hNTY5YzNhNWY0MGZmZDQzJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IDQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJ2FkdW5pdC01ZDljNjU2MDgzNDQyNDE2J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkLm9mZkNsb3NlKCk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQuc2hvdygpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZC5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkLnNob3coKSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuW5v+WRiuaLieWPluWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2hpcGluQ29tcCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lj6/ku6XotK3kubBcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwgLXRoaXMubXludW1bMyAtIGJ1eW51bV0pO1xyXG4gICAgICAgIGJ1eW51bS0tXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIGJ1eW51bSk7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImOaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5CT1NT5oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Qm9zc0NoYWxsZW5nZVRpbWVzLCBidXludW0pO1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIDApO1xyXG4gICAgICAgICAgICBudW0rK1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7omZrnqbroo4LnvJ3mjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57ydX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIGJ1eW51bSk7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCkvL+WFs+mXrVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19