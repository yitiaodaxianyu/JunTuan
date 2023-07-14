"use strict";
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