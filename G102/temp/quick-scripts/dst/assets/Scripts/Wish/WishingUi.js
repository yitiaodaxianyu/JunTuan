
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wish/WishingUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3e93MXLtpOcKB+yX3p5cis', 'WishingUi');
// Scripts/Wish/WishingUi.ts

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
exports.WishingState = void 0;
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var Jackpot_1 = require("../JsonData/Jackpot");
var JackpotCollection_1 = require("../JsonData/JackpotCollection");
var LevelJsonData_1 = require("../JsonData/LevelJsonData");
var LevelManager_1 = require("../Level/LevelManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var CumulativeCard_1 = require("./CumulativeCard");
var WishingCardUi_1 = require("./WishingCardUi");
var WishSpend_1 = require("./WishSpend");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WishingState;
(function (WishingState) {
    WishingState[WishingState["Odinary"] = 1] = "Odinary";
    WishingState[WishingState["Premium"] = 2] = "Premium";
})(WishingState = exports.WishingState || (exports.WishingState = {}));
var WishingUi = /** @class */ (function (_super) {
    __extends(WishingUi, _super);
    function WishingUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wishing_state = WishingState.Odinary;
        _this.show_cumulative_tip = false;
        _this.wishing_ui = null;
        _this.effect = null;
        _this.wishing_card_ui = null;
        return _this;
    }
    // protected start(): void{
    //     this.init(null);
    // };
    WishingUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        var canvas = cc.find("Canvas");
        this.node.getChildByName("wishingBg").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        var bottom = this.node.getChildByName("bottom");
        this.node.getChildByName("top").getChildByName("cumulativeTipsLabel").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840021);
        bottom.getChildByName("Common_Btn_3").getComponentInChildren(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840020);
        bottom.getChildByName("Common_Btn_3 copy").getComponentInChildren(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840010);
        bottom.getChildByName("freeTime").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840014);
        bottom.getChildByName("ordinaryWishing").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840012);
        bottom.getChildByName("premiumWishing").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840013);
        this.onClickRewardBtn(true);
        this.refreshUi();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_XuYuan);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.许愿池打开次数);
    };
    WishingUi.prototype.start = function () {
        if (!TutorailsManager_1.default.getInstance().isShowTutorials(209) && TutorailsManager_1.default.getInstance().isShowTutorials(211)) {
            TutorailsManager_1.default.getInstance().showTutorials(211, null, function () {
                TutorailsManager_1.default.getInstance().saveTutorials(210);
                TutorailsManager_1.default.getInstance().saveTutorials(211);
            });
        }
    };
    WishingUi.prototype.refreshUi = function () {
        var _this = this;
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        top.getChildByName("gemNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem), 1);
        top.getChildByName("ordinaryWishingCoinNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin), 1);
        top.getChildByName("premiumWishingCoinNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.PremiumWishingCoin), 1);
        if (this.wishing_state == WishingState.Odinary) {
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string =
                LanguageManager_1.default.getInstance().getStrByTextId(840030);
        }
        else {
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string =
                LanguageManager_1.default.getInstance().getStrByTextId(840011);
        }
        if (this.wishing_state == WishingState.Odinary) {
            // 普通
            // 单发
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_1");
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40005");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getOneDrawPropsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10002");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getOneDrawDiamondsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            // 十连
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40005");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getTenDrawPropsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10002");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getTenDrawDiamondSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
        }
        else {
            // 高级
            // 单发
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_2");
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.PremiumWishingCoin) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40004");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getOneDrawPropsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10002");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getOneDrawDiamondsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            // 十连
            if (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.PremiumWishingCoin) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40004");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getTenDrawPropsSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10002");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + WishSpend_1.WishSpendManager.getInstance().getTenDrawDiamondSpend(this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state));
            }
        }
        var arr = CumulativeCard_1.CumulativeCardManager.getInstance().getWishingRewardList(this.wishing_state);
        var isFree = Number(cc.sys.localStorage.getItem("WishingFree" + this.wishing_state));
        var timeCountdownLable = bottom.getChildByName("freeTimeCountdown");
        var timeLable = bottom.getChildByName("freeTime");
        var timesLabel = bottom.getChildByName("wishingSingleCostNum");
        if (isFree == 1) {
            var func = void 0;
            var t_1 = parseInt(cc.sys.localStorage.getItem("WishingFreeTime" + this.wishing_state));
            var tt = new Date().getTime();
            var ddd_1 = Math.floor((tt - t_1) / 1000);
            var remainSec_1 = 24 * 60 * 60 - ddd_1;
            func = function () {
                var tt = new Date().getTime();
                ddd_1 = Math.floor((tt - t_1) / 1000);
                remainSec_1 = 24 * 60 * 60 - ddd_1;
                timeCountdownLable.getComponent(cc.Label).string = MyTool_1.default.getTimeStr(remainSec_1);
                if (remainSec_1 <= 0) {
                    _this.unscheduleAllCallbacks();
                    cc.sys.localStorage.setItem("WishingFree" + _this.wishing_state, 0);
                    _this.refreshUi();
                }
            };
            this.unscheduleAllCallbacks();
            timeCountdownLable.active = true;
            timeLable.active = true;
            if (remainSec_1 <= 0) {
                this.unscheduleAllCallbacks();
                cc.sys.localStorage.setItem("WishingFree" + this.wishing_state, 0);
                this.refreshUi();
            }
            timeCountdownLable.getComponent(cc.Label).string = MyTool_1.default.getTimeStr(remainSec_1);
            this.unscheduleAllCallbacks();
            this.schedule(func, 1, cc.macro.REPEAT_FOREVER, 0);
        }
        else {
            timeCountdownLable.active = false;
            timeLable.active = false;
            timesLabel.color = cc.color(145, 255, 119);
            timesLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(840014);
        }
        top.getChildByName("cumulativeNum").getComponent(cc.Label).string =
            Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + "/" +
                arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes;
        top.getChildByName("cumulativeBar").getComponent(cc.ProgressBar).progress =
            Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state))
                / arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes;
        if (this.wishing_state == WishingState.Odinary) {
            this.node.getChildByName("wishingBg").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bg_0");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_0");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_1_1");
            var ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            var premiumWishingLabel = bottom.getChildByName("premiumWishing");
            ordinaryWishingLabel.color = cc.color(168, 179, 200);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28, 36, 54);
            premiumWishingLabel.color = cc.color(126, 135, 151);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20, 26, 39);
        }
        else {
            this.node.getChildByName("wishingBg").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bg_1");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_0_1");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Btn_Tab_1");
            var ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            var premiumWishingLabel = bottom.getChildByName("premiumWishing");
            premiumWishingLabel.color = cc.color(168, 179, 200);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28, 36, 54);
            ordinaryWishingLabel.color = cc.color(126, 135, 151);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20, 26, 39);
        }
    };
    WishingUi.prototype.onClickRewardBtn = function (isAuto) {
        if (isAuto === void 0) { isAuto = false; }
        if (isAuto == false) {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            var arr = CumulativeCard_1.CumulativeCardManager.getInstance().getWishingRewardList(this.wishing_state);
            if (Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) >= arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) - arr[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state))].CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state, num);
                var index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + this.wishing_state) || -1;
                index++;
                if (index >= arr.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + this.wishing_state, index);
                var gm = GameManager_1.default.getInstance();
                var item = PropManager_1.PropManager.getInstance().createPropItem(arr[index].ItemID, arr[index].RewardNum);
                gm.showGetTip(item);
                this.refreshUi();
            }
        }
        else {
            var arr1 = CumulativeCard_1.CumulativeCardManager.getInstance().getWishingRewardList(WishingState.Odinary);
            var arr2 = CumulativeCard_1.CumulativeCardManager.getInstance().getWishingRewardList(WishingState.Premium);
            var gm = GameManager_1.default.getInstance();
            var item1 = null;
            var item2 = null;
            if (Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Odinary) || 0) >=
                arr1[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0)]
                    .CumulativeCardDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Odinary) || 0) -
                    arr1[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0)]
                        .CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + WishingState.Odinary, num);
                var index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Odinary) || 0;
                index++;
                if (index >= arr1.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + WishingState.Odinary, index);
                item1 = PropManager_1.PropManager.getInstance().createPropItem(arr1[index].ItemID, arr1[index].RewardNum);
                PropManager_1.PropManager.getInstance().setPropNum(arr1[index].ItemID, arr1[index].RewardNum);
            }
            if (Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Premium) || 0) >=
                arr2[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0)]
                    .CumulativeCardDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + WishingState.Premium) || 0) -
                    arr2[Number(cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0)]
                        .CumulativeCardDrawingTimes;
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + WishingState.Premium, num);
                var index = cc.sys.localStorage.getItem("WishingCumulativeRewardIndex" + WishingState.Premium) || 0;
                index++;
                if (index >= arr2.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("WishingCumulativeRewardIndex" + WishingState.Premium, index);
                item2 = PropManager_1.PropManager.getInstance().createPropItem(arr2[index].ItemID, arr2[index].RewardNum);
                PropManager_1.PropManager.getInstance().setPropNum(arr2[index].ItemID, arr2[index].RewardNum);
            }
            // gm.showGetTip(item);
            if (item1 != null && item2 != null) {
                gm.showMultipleGetTip([item1, item2]);
            }
            else {
                if (item1 != null) {
                    gm.showGetTip(item1);
                }
                if (item2 != null) {
                    gm.showGetTip(item2);
                }
            }
            this.refreshUi();
        }
    };
    WishingUi.prototype.ondClickTypeBtn = function (e, type) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        type = Number(type);
        this.wishing_state = type;
        this.refreshUi();
    };
    WishingUi.prototype.checkCanWishing = function (type) {
        var pm = PropManager_1.PropManager.getInstance();
        var ws = WishSpend_1.WishSpendManager.getInstance();
        var lm = LevelManager_1.LevelManager.getInstance();
        if (type == 1) {
            // 单抽
            if (this.wishing_state == WishingState.Odinary) {
                // 普通
                if (pm.getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin) >= ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.OrdinaryWishingCoin, -ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通许愿消耗的许愿币, ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                if (pm.getPropNum(PropConfig_1.PropId.Gem) >= ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.Gem, -ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通许愿消耗的钻石, ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                return false;
            }
            else {
                // 高级
                if (pm.getPropNum(PropConfig_1.PropId.PremiumWishingCoin) >= ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.PremiumWishingCoin, -ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级许愿消耗的许愿币, ws.getOneDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                if (pm.getPropNum(PropConfig_1.PropId.Gem) >= ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.Gem, -ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级许愿消耗的钻石, ws.getOneDrawDiamondsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                return false;
            }
        }
        else {
            // 十抽
            if (this.wishing_state == WishingState.Odinary) {
                // 普通
                if (pm.getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin) >= ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.OrdinaryWishingCoin, -ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通许愿消耗的许愿币, ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                if (pm.getPropNum(PropConfig_1.PropId.Gem) >= ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.Gem, -ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通许愿消耗的钻石, ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                return false;
            }
            else {
                // 高级
                if (pm.getPropNum(PropConfig_1.PropId.PremiumWishingCoin) >= ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.PremiumWishingCoin, -ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级许愿消耗的许愿币, ws.getTenDrawPropsSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                if (pm.getPropNum(PropConfig_1.PropId.Gem) >= ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state))) {
                    pm.changePropNum(PropConfig_1.PropId.Gem, -ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级许愿消耗的钻石, ws.getTenDrawDiamondSpend(this.getWishSpendId(lm.getFinishChapter(), this.wishing_state)));
                    return true;
                }
                return false;
            }
        }
    };
    WishingUi.prototype.onClickWishingBtn = function (e, type) {
        var _this = this;
        type = Number(type);
        if (type == 1) {
            var isFree = Number(cc.sys.localStorage.getItem("WishingFree" + this.wishing_state));
            if (isFree == 1) {
                if (this.checkCanWishing(type) == false) {
                    return;
                }
                else {
                    cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state, Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 1);
                    // if (type == 1) {
                    // } else {
                    // cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state,
                    //     Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 10);
                    // }
                }
            }
            else {
                var date = new Date();
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state, Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 1);
                cc.sys.localStorage.setItem("WishingFree" + this.wishing_state, 1);
                cc.sys.localStorage.setItem("WishingFreeTime" + this.wishing_state, date.getTime());
            }
        }
        else {
            if (this.checkCanWishing(type) == false) {
                return;
            }
            else {
                cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.wishing_state, Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.wishing_state)) + 10);
            }
        }
        var effect = cc.instantiate(this.effect);
        var effectRoot = this.node.getChildByName("bottom").getChildByName("effectRoot");
        effect.parent = effectRoot;
        var anim;
        var reward = [];
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_YingBi);
        if (this.wishing_state == 1) {
            // 普通池
            anim = effect.getComponent(sp.Skeleton).setAnimation(0, "CommonWish", false);
            if (type == 2) {
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false)
                // },0.1,9,0.4);
                for (var i = 1; i < 10; i++) {
                    setTimeout(function () {
                        var coin = cc.instantiate(_this.effect);
                        coin.parent = effectRoot;
                        var a = coin.getComponent(sp.Skeleton).setAnimation(0, "Common", false);
                        coin.getComponent(sp.Skeleton).setTrackEventListener(a, function (entry, event) {
                            if (event.data.name == "RuShui") {
                                _this.RuShui();
                            }
                        });
                    }, 100 * i);
                }
            }
        }
        else {
            // 高级池
            anim = effect.getComponent(sp.Skeleton).setAnimation(0, "SeniorWish", false);
            if (type == 2) {
                // 十抽
                // this.schedule(()=>{
                //     let coin = cc.instantiate(this.effect);
                //     coin.parent = effectRoot;
                //     coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
                // },0.1,9,0.4);
                for (var i = 1; i < 10; i++) {
                    setTimeout(function () {
                        var coin = cc.instantiate(_this.effect);
                        coin.parent = effectRoot;
                        var a = coin.getComponent(sp.Skeleton).setAnimation(0, "Senior", false);
                        coin.getComponent(sp.Skeleton).setTrackEventListener(a, function (entry, event) {
                            if (event.data.name == "RuShui") {
                                _this.RuShui();
                            }
                        });
                    }, 100 * i);
                }
            }
        }
        if (type == 1) {
            // 单抽
            if (this.wishing_state == WishingState.Odinary) {
                FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.记录单次普通许愿的次数);
            }
            else {
                FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.记录单次高级许愿的次数);
            }
            var chapters = LevelManager_1.LevelManager.getInstance().getFinishChapter();
            var prizePoolId = WishSpend_1.WishSpendManager.getInstance().getGetRewardID(this.getWishSpendId(chapters, this.wishing_state));
            var poolId = JackpotCollection_1.JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
            if (TutorailsManager_1.default.getInstance().isShowTutorials(212) && !TutorailsManager_1.default.getInstance().isShowTutorials(211)) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = 70018;
                rd.reward_num = 1;
                reward.push(rd);
            }
            else {
                reward.push(Jackpot_1.JackpotManager.getInstance().getRewardDataById(poolId));
            }
        }
        else {
            // 十抽
            if (this.wishing_state == WishingState.Odinary) {
                FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.记录十连普通许愿的次数);
            }
            else {
                FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.记录十连高级许愿的次数);
            }
            for (var i = 0; i < 10; i++) {
                var chapters = LevelManager_1.LevelManager.getInstance().getFinishChapter();
                var prizePoolId = WishSpend_1.WishSpendManager.getInstance().getGetRewardID(this.getWishSpendId(chapters, this.wishing_state));
                var poolId = JackpotCollection_1.JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
                reward.push(Jackpot_1.JackpotManager.getInstance().getRewardDataById(poolId));
            }
            var minId = 0;
            var minQuality = 10;
            for (var i = 0; i < reward.length; i++) {
                if (Item_1.ItemManager.getInstance().getQuality(reward[i].reward_id) < minQuality) {
                    minQuality = Item_1.ItemManager.getInstance().getQuality(reward[i].reward_id);
                    minId = i;
                }
            }
            if (this.wishing_state == WishingState.Odinary) {
                var poolId = JackpotCollection_1.JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010009);
                var rewardInfo = Jackpot_1.JackpotManager.getInstance().getRewardDataById(poolId);
                reward[minId] = rewardInfo;
            }
            else {
                var poolId = JackpotCollection_1.JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010010);
                var rewardInfo = Jackpot_1.JackpotManager.getInstance().getRewardDataById(poolId);
                reward[minId] = rewardInfo;
            }
        }
        effect.getComponent(sp.Skeleton).setTrackEventListener(anim, function (entry, event) {
            if (event.data.name == "ShowCard") {
                _this.showCards(type, reward);
            }
            if (event.data.name == "RuShui") {
                _this.RuShui();
            }
            if (event.data.name == "FeiChu") {
                _this.TanChu();
            }
        });
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry,event)=>[
        // ])
        for (var i = 0; i < reward.length; i++) {
            if (Item_1.ItemManager.getInstance().getJsonItem(reward[i].reward_id).Type == 7) {
                // 宠物
                // PetManager.getInstance().addPet(PetManager.getInstance().getPetId(reward[i].reward_id));
            }
            else {
                // 道具
                PropManager_1.PropManager.getInstance().changePropNum(reward[i].reward_id, reward[i].reward_num);
            }
        }
        this.refreshUi();
    };
    WishingUi.prototype.onClickTipBtn = function () {
        var id = this.getWishSpendId(LevelManager_1.LevelManager.getInstance().getFinishChapter(), this.wishing_state);
        // UIManager.getInstance().showWishingTipUi(null,this.wishing_state,id);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.WishingTips, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                // uiNode.getComponent(WishingTipUi).init(null);
                // uiNode.getComponent(WishingTipUi).initUi(this.wishing_state,id);
            }, });
    };
    WishingUi.prototype.onClickCumulativeTipBtn = function () {
        var _this = this;
        if (this.show_cumulative_tip == true)
            return;
        this.show_cumulative_tip = true;
        var label = this.node.getChildByName("top").getChildByName("cumulativeTipsLabel");
        var tip = this.node.getChildByName("top").getChildByName("cumulativeTips");
        label.active = true;
        tip.active = true;
        this.scheduleOnce(function () {
            label.active = false;
            tip.active = false;
            _this.show_cumulative_tip = false;
        }, 2);
    };
    WishingUi.prototype.showCards = function (type, reward) {
        var _this = this;
        var card = cc.instantiate(this.wishing_card_ui);
        card.getComponent(WishingCardUi_1.default).initCard(type, reward, (function () {
            _this.onClickRewardBtn();
        }).bind(this));
        card.parent = this.node.getChildByName("bottom").getChildByName("cardRoot");
    };
    WishingUi.prototype.RuShui = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RuShui);
    };
    WishingUi.prototype.TanChu = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_KaTanChu);
    };
    WishingUi.prototype.getWishSpendId = function (chapters, type) {
        return type * 1000 + chapters;
    };
    WishingUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    WishingUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], WishingUi.prototype, "wishing_ui", void 0);
    __decorate([
        property(cc.Prefab)
    ], WishingUi.prototype, "effect", void 0);
    __decorate([
        property(cc.Prefab)
    ], WishingUi.prototype, "wishing_card_ui", void 0);
    WishingUi = __decorate([
        ccclass
    ], WishingUi);
    return WishingUi;
}(UIComponent_1.default));
exports.default = WishingUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2lzaFxcV2lzaGluZ1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLCtDQUFxRDtBQUNyRCxtRUFBeUU7QUFDekUsMkRBQXVEO0FBQ3ZELHNEQUFxRDtBQUNyRCxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUUvRCwwQ0FBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBaUU7QUFDakUsMENBQXFDO0FBQ3JDLGtFQUE2RDtBQUM3RCxpREFBNEM7QUFDNUMsMkNBQXNEO0FBRXRELDZDQUE0QztBQUM1QyxtREFBeUQ7QUFDekQsaURBQTRDO0FBQzVDLHlDQUErQztBQUV6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIscURBQVcsQ0FBQTtJQUNYLHFEQUFXLENBQUE7QUFDZixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFHRDtJQUF1Qyw2QkFBVztJQUFsRDtRQUFBLHFFQTRqQkM7UUExakJHLG1CQUFhLEdBQWlCLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDbkQseUJBQW1CLEdBQVcsS0FBSyxDQUFDO1FBR3BDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUVsQyxZQUFNLEdBQWEsSUFBSSxDQUFDO1FBRXhCLHFCQUFlLEdBQVcsSUFBSSxDQUFDOztJQWtqQm5DLENBQUM7SUFoakJHLDJCQUEyQjtJQUMzQix1QkFBdUI7SUFDdkIsS0FBSztJQUVMLHdCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksTUFBTSxHQUFHLEVBQUUs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QUFPO09BQ2EsU0FBUyxDQTRqQjdCO0lBQUQsZ0JBQUM7Q0E1akJELEFBNGpCQyxDQTVqQnNDLHFCQUFXLEdBNGpCakQ7a0JBNWpCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKYWNrcG90TWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9KYWNrcG90XCI7XHJcbmltcG9ydCB7IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9KYWNrcG90Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0L1BldE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyIH0gZnJvbSBcIi4vQ3VtdWxhdGl2ZUNhcmRcIjtcclxuaW1wb3J0IFdpc2hpbmdDYXJkVWkgZnJvbSBcIi4vV2lzaGluZ0NhcmRVaVwiO1xyXG5pbXBvcnQgeyBXaXNoU3BlbmRNYW5hZ2VyIH0gZnJvbSBcIi4vV2lzaFNwZW5kXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gV2lzaGluZ1N0YXRlIHtcclxuICAgIE9kaW5hcnkgPSAxLFxyXG4gICAgUHJlbWl1bSA9IDJcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lzaGluZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIHdpc2hpbmdfc3RhdGU6IFdpc2hpbmdTdGF0ZSA9IFdpc2hpbmdTdGF0ZS5PZGluYXJ5O1xyXG4gICAgc2hvd19jdW11bGF0aXZlX3RpcDpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgd2lzaGluZ191aTogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGVmZmVjdDpjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHdpc2hpbmdfY2FyZF91aTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICAvLyBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZHtcclxuICAgIC8vICAgICB0aGlzLmluaXQobnVsbCk7XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0JnXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50YXJnZXQgPSBjYW52YXM7XHJcblxyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlVGlwc0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODQwMDIxKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX0J0bl8zXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAyMCk7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX0J0bl8zIGNvcHlcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODQwMDEwKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmcmVlVGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAxNCk7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODQwMDEyKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmVtaXVtV2lzaGluZ1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAxMyk7XHJcblxyXG4gICAgICAgIHRoaXMub25DbGlja1Jld2FyZEJ0bih0cnVlKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9YdVl1YW4pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrjmhL/msaDmiZPlvIDmrKHmlbApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDkpJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIxMSkpe1xyXG4gICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTEsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKVxyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIilcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1OdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksMSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nQ29pbk51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuT3JkaW5hcnlXaXNoaW5nQ29pbiksMSlcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJwcmVtaXVtV2lzaGluZ0NvaW5OdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLlByZW1pdW1XaXNoaW5nQ29pbiksMSlcclxuXHJcbiAgICAgICAgaWYodGhpcy53aXNoaW5nX3N0YXRlID09IFdpc2hpbmdTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcclxuICAgICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODQwMDMwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcclxuICAgICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODQwMDExKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMud2lzaGluZ19zdGF0ZSA9PSBXaXNoaW5nU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgIC8vIOaZrumAmlxyXG4gICAgICAgICAgICAvLyDljZXlj5FcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiV2lzaF9CYXJfMF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiV2lzaF9CYXJfMF8xXCIpO1xyXG4gICAgICAgICAgICBpZiAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5PcmRpbmFyeVdpc2hpbmdDb2luKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdDb3N0SWNvbjFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV80MDAwNVwiKVxyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ1NpbmdsZUNvc3ROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiw5dcIiArIFdpc2hTcGVuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRPbmVEcmF3UHJvcHNTcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRXaXNoU3BlbmRJZChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCksIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDJcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBXaXNoU3BlbmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T25lRHJhd0RpYW1vbmRzU3BlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0V2lzaFNwZW5kSWQoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpLCB0aGlzLndpc2hpbmdfc3RhdGUpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWNgei/nlxyXG4gICAgICAgICAgICBpZiAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5PcmRpbmFyeVdpc2hpbmdDb2luKSA+IDkpIHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdDb3N0SWNvbjJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV80MDAwNVwiKVxyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ1RlbkNvc3ROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiw5dcIiArIFdpc2hTcGVuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZW5EcmF3UHJvcHNTcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRXaXNoU3BlbmRJZChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCksIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24yXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDJcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdUZW5Db3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBXaXNoU3BlbmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVuRHJhd0RpYW1vbmRTcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRXaXNoU3BlbmRJZChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCksIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8g6auY57qnXHJcbiAgICAgICAgICAgIC8vIOWNleWPkVxyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJXaXNoX0Jhcl8wXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLndpc2hpbmdfdWkuZ2V0U3ByaXRlRnJhbWUoXCJXaXNoX0Jhcl8wXzJcIik7XHJcbiAgICAgICAgICAgIGlmIChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLlByZW1pdW1XaXNoaW5nQ29pbikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fNDAwMDRcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBXaXNoU3BlbmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0T25lRHJhd1Byb3BzU3BlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0V2lzaFNwZW5kSWQoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpLCB0aGlzLndpc2hpbmdfc3RhdGUpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0Nvc3RJY29uMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtXzEwMDAyXCIpXHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nU2luZ2xlQ29zdE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCLDl1wiICsgV2lzaFNwZW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE9uZURyYXdEaWFtb25kc1NwZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFdpc2hTcGVuZElkKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpbmlzaENoYXB0ZXIoKSwgdGhpcy53aXNoaW5nX3N0YXRlKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDljYHov55cclxuICAgICAgICAgICAgaWYgKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuUHJlbWl1bVdpc2hpbmdDb2luKSA+IDkpIHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdDb3N0SWNvbjJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV80MDAwNFwiKVxyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ1RlbkNvc3ROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiw5dcIiArIFdpc2hTcGVuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZW5EcmF3UHJvcHNTcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRXaXNoU3BlbmRJZChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCksIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24yXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDJcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdUZW5Db3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBXaXNoU3BlbmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVuRHJhd0RpYW1vbmRTcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRXaXNoU3BlbmRJZChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCksIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgYXJyID0gQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2lzaGluZ1Jld2FyZExpc3QodGhpcy53aXNoaW5nX3N0YXRlKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBpc0ZyZWUgPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiV2lzaGluZ0ZyZWVcIiArIHRoaXMud2lzaGluZ19zdGF0ZSkpXHJcbiAgICAgICAgbGV0IHRpbWVDb3VudGRvd25MYWJsZSA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZyZWVUaW1lQ291bnRkb3duXCIpXHJcbiAgICAgICAgbGV0IHRpbWVMYWJsZSA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZyZWVUaW1lXCIpXHJcbiAgICAgICAgbGV0IHRpbWVzTGFiZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nU2luZ2xlQ29zdE51bVwiKVxyXG5cclxuXHJcbiAgICAgICAgaWYoaXNGcmVlID09IDEpe1xyXG4gICAgICAgICAgICBsZXQgZnVuYzpGdW5jdGlvbjtcclxuICAgICAgICAgICAgbGV0IHQgPSBwYXJzZUludChjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJXaXNoaW5nRnJlZVRpbWVcIit0aGlzLndpc2hpbmdfc3RhdGUpKTtcclxuICAgICAgICAgICAgbGV0IHR0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGxldCBkZGQgPSBNYXRoLmZsb29yKCh0dCAtIHQpLzEwMDApO1xyXG4gICAgICAgICAgICBsZXQgcmVtYWluU2VjPTI0KjYwKjYwLWRkZDtcclxuXHJcbiAgICAgICAgICAgIGZ1bmMgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgIGxldCB0dCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgZGRkID0gTWF0aC5mbG9vcigodHQgLSB0KS8xMDAwKTtcclxuICAgICAgICAgICAgICAgIHJlbWFpblNlYz0yNCo2MCo2MC1kZGQ7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnRkb3duTGFibGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihyZW1haW5TZWMpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVtYWluU2VjIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIldpc2hpbmdGcmVlXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgdGltZUNvdW50ZG93bkxhYmxlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRpbWVMYWJsZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYocmVtYWluU2VjIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJXaXNoaW5nRnJlZVwiICsgdGhpcy53aXNoaW5nX3N0YXRlLDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWVDb3VudGRvd25MYWJsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKHJlbWFpblNlYyk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmMsMSxjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwwKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aW1lQ291bnRkb3duTGFibGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRpbWVMYWJsZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGltZXNMYWJlbC5jb2xvciA9IGNjLmNvbG9yKDE0NSwyNTUsMTE5KTtcclxuICAgICAgICAgICAgdGltZXNMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAxNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgICAgIE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy53aXNoaW5nX3N0YXRlKSkgKyBcIi9cIiArIFxyXG4gICAgICAgICAgICBhcnJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIit0aGlzLndpc2hpbmdfc3RhdGUpKV0uQ3VtdWxhdGl2ZUNhcmREcmF3aW5nVGltZXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlQmFyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBcclxuICAgICAgICAgICAgTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSBcclxuICAgICAgICAgICAgLyBhcnJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIHRoaXMud2lzaGluZ19zdGF0ZSkpXS5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcztcclxuICAgICAgICBpZiAodGhpcy53aXNoaW5nX3N0YXRlID09IFdpc2hpbmdTdGF0ZS5PZGluYXJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2lzaGluZ191aS5nZXRTcHJpdGVGcmFtZShcIldpc2hfQmdfMFwiKTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiV2lzaF9CdG5fVGFiXzBcIik7XHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZW1pdW1XaXNoaW5nQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiV2lzaF9CdG5fVGFiXzFfMVwiKTtcclxuICAgICAgICAgICAgbGV0IG9yZGluYXJ5V2lzaGluZ0xhYmVsID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nXCIpO1xyXG4gICAgICAgICAgICBsZXQgcHJlbWl1bVdpc2hpbmdMYWJlbCA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZW1pdW1XaXNoaW5nXCIpO1xyXG4gICAgICAgICAgICBvcmRpbmFyeVdpc2hpbmdMYWJlbC5jb2xvciA9IGNjLmNvbG9yKDE2OCwxNzksMjAwKTtcclxuICAgICAgICAgICAgb3JkaW5hcnlXaXNoaW5nTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigyOCwzNiw1NCk7XHJcbiAgICAgICAgICAgIHByZW1pdW1XaXNoaW5nTGFiZWwuY29sb3IgPSBjYy5jb2xvcigxMjYsMTM1LDE1MSk7XHJcbiAgICAgICAgICAgIHByZW1pdW1XaXNoaW5nTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigyMCwyNiwzOSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0JnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiV2lzaF9CZ18xXCIpO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJvcmRpbmFyeVdpc2hpbmdCdG5cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLndpc2hpbmdfdWkuZ2V0U3ByaXRlRnJhbWUoXCJXaXNoX0J0bl9UYWJfMF8xXCIpO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmVtaXVtV2lzaGluZ0J0blwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2lzaGluZ191aS5nZXRTcHJpdGVGcmFtZShcIldpc2hfQnRuX1RhYl8xXCIpO1xyXG4gICAgICAgICAgICBsZXQgb3JkaW5hcnlXaXNoaW5nTGFiZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJvcmRpbmFyeVdpc2hpbmdcIik7XHJcbiAgICAgICAgICAgIGxldCBwcmVtaXVtV2lzaGluZ0xhYmVsID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJlbWl1bVdpc2hpbmdcIik7XHJcbiAgICAgICAgICAgIHByZW1pdW1XaXNoaW5nTGFiZWwuY29sb3IgPSBjYy5jb2xvcigxNjgsMTc5LDIwMCk7XHJcbiAgICAgICAgICAgIHByZW1pdW1XaXNoaW5nTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigyOCwzNiw1NCk7XHJcbiAgICAgICAgICAgIG9yZGluYXJ5V2lzaGluZ0xhYmVsLmNvbG9yID0gY2MuY29sb3IoMTI2LDEzNSwxNTEpO1xyXG4gICAgICAgICAgICBvcmRpbmFyeVdpc2hpbmdMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDIwLDI2LDM5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1Jld2FyZEJ0bihpc0F1dG86Ym9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICBpZihpc0F1dG8gPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2lzaGluZ1Jld2FyZExpc3QodGhpcy53aXNoaW5nX3N0YXRlKTtcclxuICAgICAgICAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSA+PSBhcnJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIHRoaXMud2lzaGluZ19zdGF0ZSkpXS5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSAtIGFycltOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiV2lzaGluZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgdGhpcy53aXNoaW5nX3N0YXRlKSldLkN1bXVsYXRpdmVDYXJkRHJhd2luZ1RpbWVzO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTm93V2lzaGluZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMud2lzaGluZ19zdGF0ZSxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiV2lzaGluZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgdGhpcy53aXNoaW5nX3N0YXRlKSB8fCAtMTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBhcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJXaXNoaW5nQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyB0aGlzLndpc2hpbmdfc3RhdGUsaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oYXJyW2luZGV4XS5JdGVtSUQsYXJyW2luZGV4XS5SZXdhcmROdW0pO1xyXG4gICAgICAgICAgICAgICAgZ20uc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGFycjEgPSBDdW11bGF0aXZlQ2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaXNoaW5nUmV3YXJkTGlzdChXaXNoaW5nU3RhdGUuT2RpbmFyeSk7XHJcbiAgICAgICAgICAgIGxldCBhcnIyID0gQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2lzaGluZ1Jld2FyZExpc3QoV2lzaGluZ1N0YXRlLlByZW1pdW0pO1xyXG4gICAgICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0xOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTI6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgV2lzaGluZ1N0YXRlLk9kaW5hcnkpIHx8IDApID49IFxyXG4gICAgICAgICAgICBhcnIxW051bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJXaXNoaW5nQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyBXaXNoaW5nU3RhdGUuT2RpbmFyeSkgfHwgMCldXHJcbiAgICAgICAgICAgIC5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyBXaXNoaW5nU3RhdGUuT2RpbmFyeSkgfHwgMCkgLSBcclxuICAgICAgICAgICAgICAgIGFycjFbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFdpc2hpbmdTdGF0ZS5PZGluYXJ5KSB8fCAwKV1cclxuICAgICAgICAgICAgICAgIC5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcztcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyBXaXNoaW5nU3RhdGUuT2RpbmFyeSxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiV2lzaGluZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgV2lzaGluZ1N0YXRlLk9kaW5hcnkpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPj0gYXJyMS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFdpc2hpbmdTdGF0ZS5PZGluYXJ5LGluZGV4KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpdGVtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGFycjFbaW5kZXhdLkl0ZW1JRCxhcnIxW2luZGV4XS5SZXdhcmROdW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQcm9wTnVtKGFycjFbaW5kZXhdLkl0ZW1JRCxhcnIxW2luZGV4XS5SZXdhcmROdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgV2lzaGluZ1N0YXRlLlByZW1pdW0pIHx8IDApID49IFxyXG4gICAgICAgICAgICBhcnIyW051bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJXaXNoaW5nQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyBXaXNoaW5nU3RhdGUuUHJlbWl1bSkgfHwgMCldXHJcbiAgICAgICAgICAgIC5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyBXaXNoaW5nU3RhdGUuUHJlbWl1bSkgfHwgMCkgLSBcclxuICAgICAgICAgICAgICAgIGFycjJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFdpc2hpbmdTdGF0ZS5QcmVtaXVtKSB8fCAwKV1cclxuICAgICAgICAgICAgICAgIC5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcztcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyBXaXNoaW5nU3RhdGUuUHJlbWl1bSxudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiV2lzaGluZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgV2lzaGluZ1N0YXRlLlByZW1pdW0pIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPj0gYXJyMi5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIldpc2hpbmdDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFdpc2hpbmdTdGF0ZS5QcmVtaXVtLGluZGV4KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpdGVtMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGFycjJbaW5kZXhdLkl0ZW1JRCxhcnIyW2luZGV4XS5SZXdhcmROdW0pO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQcm9wTnVtKGFycjJbaW5kZXhdLkl0ZW1JRCxhcnIyW2luZGV4XS5SZXdhcmROdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGdtLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0xICE9IG51bGwgJiYgaXRlbTIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBnbS5zaG93TXVsdGlwbGVHZXRUaXAoW2l0ZW0xLGl0ZW0yXSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbTEhPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnNob3dHZXRUaXAoaXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbTIhPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnNob3dHZXRUaXAoaXRlbTIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uZENsaWNrVHlwZUJ0bihlLHR5cGU6bnVtYmVyKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHR5cGUgPSBOdW1iZXIodHlwZSk7XHJcbiAgICAgICAgdGhpcy53aXNoaW5nX3N0YXRlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ2FuV2lzaGluZyh0eXBlOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBsZXQgcG0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgbGV0IHdzID0gV2lzaFNwZW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgbGV0IGxtID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBpZih0eXBlID09IDEpe1xyXG4gICAgICAgICAgICAvLyDljZXmir1cclxuICAgICAgICAgICAgaWYodGhpcy53aXNoaW5nX3N0YXRlID09IFdpc2hpbmdTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgICAgIC8vIOaZrumAmlxyXG4gICAgICAgICAgICAgICAgaWYocG0uZ2V0UHJvcE51bShQcm9wSWQuT3JkaW5hcnlXaXNoaW5nQ29pbikgPj0gd3MuZ2V0T25lRHJhd1Byb3BzU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBtLmNoYW5nZVByb3BOdW0oUHJvcElkLk9yZGluYXJ5V2lzaGluZ0NvaW4sLXdzLmdldE9uZURyYXdQcm9wc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu6K6w5b2V5pmu6YCa6K645oS/5raI6ICX55qE6K645oS/5biBLHdzLmdldE9uZURyYXdQcm9wc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oUHJvcElkLkdlbSkgPj0gd3MuZ2V0T25lRHJhd0RpYW1vbmRzU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBtLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtd3MuZ2V0T25lRHJhd0RpYW1vbmRzU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7orrDlvZXmma7pgJrorrjmhL/mtojogJfnmoTpkrvnn7Msd3MuZ2V0T25lRHJhd0RpYW1vbmRzU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIOmrmOe6p1xyXG4gICAgICAgICAgICAgICAgaWYocG0uZ2V0UHJvcE51bShQcm9wSWQuUHJlbWl1bVdpc2hpbmdDb2luKSA+PSB3cy5nZXRPbmVEcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcG0uY2hhbmdlUHJvcE51bShQcm9wSWQuUHJlbWl1bVdpc2hpbmdDb2luLC13cy5nZXRPbmVEcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+iuuOaEv+a2iOiAl+eahOiuuOaEv+W4gSx3cy5nZXRPbmVEcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihwbS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pID49IHdzLmdldE9uZURyYXdEaWFtb25kc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLXdzLmdldE9uZURyYXdEaWFtb25kc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu6K6w5b2V6auY57qn6K645oS/5raI6ICX55qE6ZK755+zLHdzLmdldE9uZURyYXdEaWFtb25kc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDljYHmir1cclxuICAgICAgICAgICAgaWYodGhpcy53aXNoaW5nX3N0YXRlID09IFdpc2hpbmdTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgICAgIC8vIOaZrumAmlxyXG4gICAgICAgICAgICAgICAgaWYocG0uZ2V0UHJvcE51bShQcm9wSWQuT3JkaW5hcnlXaXNoaW5nQ29pbikgPj0gd3MuZ2V0VGVuRHJhd1Byb3BzU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBtLmNoYW5nZVByb3BOdW0oUHJvcElkLk9yZGluYXJ5V2lzaGluZ0NvaW4sLXdzLmdldFRlbkRyYXdQcm9wc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu6K6w5b2V5pmu6YCa6K645oS/5raI6ICX55qE6K645oS/5biBLHdzLmdldFRlbkRyYXdQcm9wc1NwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oUHJvcElkLkdlbSkgPj0gd3MuZ2V0VGVuRHJhd0RpYW1vbmRTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcG0uY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC13cy5nZXRUZW5EcmF3RGlhbW9uZFNwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu6K6w5b2V5pmu6YCa6K645oS/5raI6ICX55qE6ZK755+zLHdzLmdldFRlbkRyYXdEaWFtb25kU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIOmrmOe6p1xyXG4gICAgICAgICAgICAgICAgaWYocG0uZ2V0UHJvcE51bShQcm9wSWQuUHJlbWl1bVdpc2hpbmdDb2luKSA+PSB3cy5nZXRUZW5EcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcG0uY2hhbmdlUHJvcE51bShQcm9wSWQuUHJlbWl1bVdpc2hpbmdDb2luLC13cy5nZXRUZW5EcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+iuuOaEv+a2iOiAl+eahOiuuOaEv+W4gSx3cy5nZXRUZW5EcmF3UHJvcHNTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihwbS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pID49IHdzLmdldFRlbkRyYXdEaWFtb25kU3BlbmQodGhpcy5nZXRXaXNoU3BlbmRJZChsbS5nZXRGaW5pc2hDaGFwdGVyKCksdGhpcy53aXNoaW5nX3N0YXRlKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBtLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtd3MuZ2V0VGVuRHJhd0RpYW1vbmRTcGVuZCh0aGlzLmdldFdpc2hTcGVuZElkKGxtLmdldEZpbmlzaENoYXB0ZXIoKSx0aGlzLndpc2hpbmdfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+iuuOaEv+a2iOiAl+eahOmSu+efsyx3cy5nZXRUZW5EcmF3RGlhbW9uZFNwZW5kKHRoaXMuZ2V0V2lzaFNwZW5kSWQobG0uZ2V0RmluaXNoQ2hhcHRlcigpLHRoaXMud2lzaGluZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrV2lzaGluZ0J0bihlLHR5cGU6bnVtYmVyKXtcclxuICAgICAgICB0eXBlID0gTnVtYmVyKHR5cGUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgaXNGcmVlID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIldpc2hpbmdGcmVlXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKVxyXG4gICAgICAgICAgICBpZiAoaXNGcmVlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQ2FuV2lzaGluZyh0eXBlKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTm93V2lzaGluZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMud2lzaGluZ19zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy53aXNoaW5nX3N0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSArIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTm93V2lzaGluZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMud2lzaGluZ19zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93V2lzaGluZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMud2lzaGluZ19zdGF0ZSkpICsgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJXaXNoaW5nRnJlZVwiICsgdGhpcy53aXNoaW5nX3N0YXRlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIldpc2hpbmdGcmVlVGltZVwiICsgdGhpcy53aXNoaW5nX3N0YXRlLCBkYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tDYW5XaXNoaW5nKHR5cGUpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy53aXNoaW5nX3N0YXRlLFxyXG4gICAgICAgICAgICAgICAgTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1dpc2hpbmdDdW11bGF0aXZlTnVtXCIgKyB0aGlzLndpc2hpbmdfc3RhdGUpKSArIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVmZmVjdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZWZmZWN0KTtcclxuICAgICAgICBsZXQgZWZmZWN0Um9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdFJvb3RcIilcclxuICAgICAgICBlZmZlY3QucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICBsZXQgYW5pbTtcclxuICAgICAgICBsZXQgcmV3YXJkOlJld2FyZERhdGFbXSA9IFtdO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9ZaW5nQmkpO1xyXG4gICAgICAgIGlmKHRoaXMud2lzaGluZ19zdGF0ZSA9PSAxKXtcclxuICAgICAgICAgICAgLy8g5pmu6YCa5rGgXHJcbiAgICAgICAgICAgIGFuaW0gPSBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIkNvbW1vbldpc2hcIixmYWxzZSlcclxuICAgICAgICAgICAgaWYodHlwZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgIC8vIOWNgeaKvVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBjb2luID0gY2MuaW5zdGFudGlhdGUodGhpcy5lZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvaW4ucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb2luLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJDb21tb25cIixmYWxzZSlcclxuICAgICAgICAgICAgICAgIC8vIH0sMC4xLDksMC40KTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTwxMDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvaW4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4ucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSBjb2luLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJDb21tb25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQuZGF0YS5uYW1lID09IFwiUnVTaHVpXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUnVTaHVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwKmkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8g6auY57qn5rGgXHJcbiAgICAgICAgICAgIGFuaW0gPSBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIlNlbmlvcldpc2hcIixmYWxzZSlcclxuICAgICAgICAgICAgaWYodHlwZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgIC8vIOWNgeaKvVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBjb2luID0gY2MuaW5zdGFudGlhdGUodGhpcy5lZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvaW4ucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb2luLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJTZW5pb3JcIixmYWxzZSlcclxuICAgICAgICAgICAgICAgIC8vIH0sMC4xLDksMC40KTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTwxMDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvaW4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4ucGFyZW50ID0gZWZmZWN0Um9vdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSBjb2luLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJTZW5pb3JcIixmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWUgPT0gXCJSdVNodWlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SdVNodWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAqaSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgLy8g5Y2V5oq9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud2lzaGluZ19zdGF0ZSA9PSBXaXNoaW5nU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7orrDlvZXljZXmrKHmma7pgJrorrjmhL/nmoTmrKHmlbApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLuiusOW9leWNleasoemrmOe6p+iuuOaEv+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNoYXB0ZXJzID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgcHJpemVQb29sSWQgPSBXaXNoU3BlbmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2V0UmV3YXJkSUQodGhpcy5nZXRXaXNoU3BlbmRJZChjaGFwdGVycyx0aGlzLndpc2hpbmdfc3RhdGUpKTtcclxuICAgICAgICAgICAgbGV0IHBvb2xJZCA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEphY2twb3RJZEJ5SkNJZChwcml6ZVBvb2xJZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIxMikmJiFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIxMSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICByZC5yZXdhcmRfaWQ9NzAwMTg7XHJcbiAgICAgICAgICAgICAgICByZC5yZXdhcmRfbnVtPTE7XHJcbiAgICAgICAgICAgICAgICByZXdhcmQucHVzaChyZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkLnB1c2goSmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChwb29sSWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDljYHmir1cclxuICAgICAgICAgICAgaWYodGhpcy53aXNoaW5nX3N0YXRlID09IFdpc2hpbmdTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLuiusOW9leWNgei/nuaZrumAmuiuuOaEv+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEZpcnN0RG8oRm9sbG93X1R5cGUu6K6w5b2V5Y2B6L+e6auY57qn6K645oS/55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2k8MTA7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFwdGVycyA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpbmlzaENoYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGxldCBwcml6ZVBvb2xJZCA9IFdpc2hTcGVuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHZXRSZXdhcmRJRCh0aGlzLmdldFdpc2hTcGVuZElkKGNoYXB0ZXJzLHRoaXMud2lzaGluZ19zdGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvb2xJZCA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEphY2twb3RJZEJ5SkNJZChwcml6ZVBvb2xJZCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmQucHVzaChKYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKHBvb2xJZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtaW5JZCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtaW5RdWFsaXR5ID0gMTA7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTxyZXdhcmQubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkocmV3YXJkW2ldLnJld2FyZF9pZCkgPCBtaW5RdWFsaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5RdWFsaXR5ID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHJld2FyZFtpXS5yZXdhcmRfaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud2lzaGluZ19zdGF0ZSA9PSBXaXNoaW5nU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9vbElkID0gSmFja3BvdENvbGxlY3Rpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SmFja3BvdElkQnlKQ0lkKDEwMTAwMDkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZEluZm8gPSBKYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKHBvb2xJZCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRbbWluSWRdID0gcmV3YXJkSW5mbztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9vbElkID0gSmFja3BvdENvbGxlY3Rpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SmFja3BvdElkQnlKQ0lkKDEwMTAwMTApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZEluZm8gPSBKYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKHBvb2xJZCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRbbWluSWRdID0gcmV3YXJkSW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KT0+e1xyXG4gICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWUgPT0gXCJTaG93Q2FyZFwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NhcmRzKHR5cGUscmV3YXJkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWUgPT0gXCJSdVNodWlcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJ1U2h1aSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZSA9PSBcIkZlaUNodVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGFuQ2h1KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksZXZlbnQpPT5bXHJcblxyXG4gICAgICAgIC8vIF0pXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHJld2FyZC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSXRlbShyZXdhcmRbaV0ucmV3YXJkX2lkKS5UeXBlID09IDcpe1xyXG4gICAgICAgICAgICAgICAgLy8g5a6g54mpXHJcbiAgICAgICAgICAgICAgICAvLyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGV0KFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRJZChyZXdhcmRbaV0ucmV3YXJkX2lkKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8g6YGT5YW3XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkW2ldLnJld2FyZF9pZCxyZXdhcmRbaV0ucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1RpcEJ0bigpe1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0V2lzaFNwZW5kSWQoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpLCB0aGlzLndpc2hpbmdfc3RhdGUpO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dXaXNoaW5nVGlwVWkobnVsbCx0aGlzLndpc2hpbmdfc3RhdGUsaWQpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguV2lzaGluZ1RpcHMsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1RpcFVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAvLyB1aU5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdUaXBVaSkuaW5pdFVpKHRoaXMud2lzaGluZ19zdGF0ZSxpZCk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQ3VtdWxhdGl2ZVRpcEJ0bigpe1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd19jdW11bGF0aXZlX3RpcCA9PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaG93X2N1bXVsYXRpdmVfdGlwID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlVGlwc0xhYmVsXCIpO1xyXG4gICAgICAgIGxldCB0aXAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlVGlwc1wiKTtcclxuICAgICAgICBsYWJlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGxhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19jdW11bGF0aXZlX3RpcCA9IGZhbHNlO1xyXG4gICAgICAgIH0sMilcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FyZHModHlwZTpudW1iZXIscmV3YXJkOlJld2FyZERhdGFbXSl7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndpc2hpbmdfY2FyZF91aSlcclxuICAgICAgICBjYXJkLmdldENvbXBvbmVudChXaXNoaW5nQ2FyZFVpKS5pbml0Q2FyZCh0eXBlLHJld2FyZCwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tSZXdhcmRCdG4oKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjYXJkLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRSb290XCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSdVNodWkoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfUnVTaHVpKTtcclxuICAgIH1cclxuXHJcbiAgICBUYW5DaHUoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS2FUYW5DaHUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFdpc2hTcGVuZElkKGNoYXB0ZXJzOm51bWJlcix0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0eXBlKjEwMDArY2hhcHRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==