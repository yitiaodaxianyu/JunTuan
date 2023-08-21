
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
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            if (this.type == 2) {
                WXManagerEX_1.default.getInstance().cardByAd = tt.createRewardedVideoAd({
                    adUnitId: 'cq3jq17i33b23821a7'
                });
            }
            else if (this.type == 3) {
                WXManagerEX_1.default.getInstance().cardByAd = tt.createRewardedVideoAd({
                    adUnitId: '93m8bddier87lmhp60'
                });
            }
            else if (this.type == 4) {
                WXManagerEX_1.default.getInstance().cardByAd = tt.createRewardedVideoAd({
                    adUnitId: '67vsag2cirn46uvsek'
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
                WXManagerEX_1.default.getInstance().cardByAd.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXHB1cmNoYXNlc251bWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtEQUEwRDtBQUUxRCx5Q0FBb0M7QUFFcEMsaURBQTRDO0FBQzVDLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsb0RBQStDO0FBQy9DLHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxvREFBK0M7QUFDL0MsOENBQXlEO0FBQ3pELGdEQUErQztBQUd6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQWdMQztRQTlLRyxTQUFHLEdBQVksSUFBSSxDQUFBO1FBQ25CLFdBQUssR0FBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQSxjQUFjO1FBQzlDLFVBQUksR0FBVyxDQUFDLENBQUEsQ0FBQSxtQkFBbUI7O1FBbUtuQyx3QkFBd0I7UUFFeEIsZUFBZTtRQUVmLGFBQWE7UUFFYixJQUFJO1FBRUosaUJBQWlCO0lBQ3JCLENBQUM7SUExS0csK0JBQU0sR0FBTixVQUFPLElBQUk7UUFDUCxJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsTUFBTSxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLDBCQUEwQixFQUFFLENBQUMs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RUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RixJQUFJLEdBQUcsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRixHQUFHLEVBQUUsQ0FBQTtZQUNMLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFDRCxzQ0FBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFwS0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDQztJQUZGLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FnTGxDO0lBQUQscUJBQUM7Q0FoTEQsQUFnTEMsQ0FoTDJDLHFCQUFXLEdBZ0x0RDtrQkFoTG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb2luUG9wIGZyb20gXCIuLi8uLi9Db2luUG9wXCI7XHJcbmltcG9ydCB7IFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCb3NzV2Vla2x5UmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0Jvc3NXZWVrbHlSZXdhcmRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwdXJjaGFzZXNudW1iZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbnVtOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgbXludW06IG51bWJlcltdID0gWzUwLCAyMDAsIDMwMF0vL1s1MCwxMDAsMTUwXVxyXG4gICAgdHlwZTogbnVtYmVyID0gMC8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG5cclxuICAgIGluaXRVaSh0eXBlKSB7XHJcbiAgICAgICAgbGV0IGJ1eW51bVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5udW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgdGhpcy5teW51bVszIC0gYnV5bnVtXVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5CdXkoKSB7Ly/pkrvnn7PotK3kubBcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChnZW0gPj0gdGhpcy5teW51bVszIC0gYnV5bnVtXSkge1xyXG4gICAgICAgICAgICAvL+WPr+S7pei0reS5sFxyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwgLXRoaXMubXludW1bMyAtIGJ1eW51bV0pO1xyXG4gICAgICAgICAgICBidXludW0tLVxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/mjJHmiJjmrKHmlbDotK3kubDmlbBf5q+P5pel56yseOasoei0reS5sCArICgzIC0gYnV5bnVtKSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5CdXlVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgYnV5bnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgbnVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJhf5oyR5oiY5qyh5pWw6LSt5Lmw5pWwX+avj+aXpeesrHjmrKHotK3kubAgKyAoMyAtIGJ1eW51bSkpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Qm9zc0NoYWxsZW5nZVRpbWVzLCBidXludW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7omZrnqbroo4LnvJ3mjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiZmuepuuijgue8nV/mjJHmiJjmrKHmlbDotK3kubDmlbBf5q+P5pel56yseOasoei0reS5sCArICgzIC0gYnV5bnVtKSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5CdXlWb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywgYnV5bnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgICAgIG51bSsrXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywgbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v6ZKx5LiN5aSfXHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCwgVUlMYXllckxldmVsLlRocmVlLCB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1eUFkKCkgey8v5bm/5ZGK6LSt5LmwXHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICBcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQgPSB0dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnY3EzanExN2kzM2IyMzgyMWE3J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuIFxyXG5cclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQgPSB0dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnOTNtOGJkZGllcjg3bG1ocDYwJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IDQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkID0gdHQuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzY3dnNhZzJjaXJuNDZ1dnNlaydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZC5vZmZDbG9zZSgpO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmNhcmRCeUFkLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZC5zaG93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlub/lkYrmi4nlj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jYXJkQnlBZC5vbkNsb3NlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobjgJDlhbPpl63lub/lkYrjgJHmjInpkq5cclxuICAgICAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuY2FyZEJ5QWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2hpcGluQ29tcCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lj6/ku6XotK3kubBcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwgLXRoaXMubXludW1bMyAtIGJ1eW51bV0pO1xyXG4gICAgICAgIGJ1eW51bS0tXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJjmjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIGJ1eW51bSk7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImOaMkeaImOasoeaVsOi0reS5sOaVsCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5CT1NT5oyR5oiYX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Qm9zc0NoYWxsZW5nZVRpbWVzLCBidXludW0pO1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIDApO1xyXG4gICAgICAgICAgICBudW0rK1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7omZrnqbroo4LnvJ3mjJHmiJjmrKHmlbDotK3kubDmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Jma56m66KOC57ydX+aMkeaImOasoeaVsOi0reS5sOaVsF/mr4/ml6XnrKx45qyh6LSt5LmwICsgKDMgLSBidXludW0pKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIGJ1eW51bSk7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAwKTtcclxuICAgICAgICAgICAgbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCkvL+WFs+mXrVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19