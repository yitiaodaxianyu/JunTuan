"use strict";
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