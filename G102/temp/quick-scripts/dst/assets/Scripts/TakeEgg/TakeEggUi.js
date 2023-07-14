
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/TakeEgg/TakeEggUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b87cRJwXNOjY83FQDj/hHo', 'TakeEggUi');
// Scripts/TakeEgg/TakeEggUi.ts

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
exports.TakeEggState = void 0;
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var EggCumulative_1 = require("./EggCumulative");
var Jackpot_1 = require("../JsonData/Jackpot");
var JackpotCollection_1 = require("../JsonData/JackpotCollection");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var BtnPet_1 = require("../Pet/Ui/BtnPet");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var UIManager_1 = require("../UI/UIManager");
var EggInformation_1 = require("./EggInformation");
var UIConfig_1 = require("../UI/UIConfig");
// import WishingTipUi from "../Wish/WishingTipUi";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TakeEggState;
(function (TakeEggState) {
    TakeEggState[TakeEggState["Odinary"] = 1] = "Odinary";
    TakeEggState[TakeEggState["Premium"] = 2] = "Premium";
})(TakeEggState = exports.TakeEggState || (exports.TakeEggState = {}));
var TakeEggUi = /** @class */ (function (_super) {
    __extends(TakeEggUi, _super);
    function TakeEggUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.take_egg_state = TakeEggState.Odinary;
        _this.show_cumulative_tip = false;
        _this.take_egg_ui = null;
        _this.wishing_ui = null;
        _this.pet_icon = null;
        _this.animation_name = [];
        _this.isPlay = false;
        _this.pet_reward_list = [];
        return _this;
    }
    // @property(cc.Prefab)
    // effect:cc.Prefab = null;
    // @property(cc.Prefab)
    // wishing_card_ui:cc.Prefab=null;
    // protected start(): void{
    //     this.init(null);
    // };
    TakeEggUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        var canvas = cc.find("Canvas");
        this.node.getChildByName("takeEggBg").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        var bottom = this.node.getChildByName("bottom");
        this.node.getChildByName("top").getChildByName("cumulativeTipsLabel").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840021);
        bottom.getChildByName("Common_Btn_3").getComponentInChildren(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840026);
        bottom.getChildByName("Common_Btn_3 copy").getComponentInChildren(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840027);
        bottom.getChildByName("freeTime").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840014);
        bottom.getChildByName("ordinaryWishing").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840032);
        bottom.getChildByName("premiumWishing").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(840033);
        this.onClickRewardBtn(true);
        this.refreshUi();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_KaiEggjiemian);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.龙巢打开次数);
    };
    TakeEggUi.prototype.refreshUi = function () {
        var _this = this;
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        top.getChildByName("gemNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.LongJing), 1);
        top.getChildByName("ordinaryWishingCoinNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.OrdinaryTakeEgg), 1);
        top.getChildByName("premiumWishingCoinNum").getComponent(cc.Label).string =
            MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.PremiumTakeEgg), 1);
        if (this.take_egg_state == TakeEggState.Odinary) {
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string =
                LanguageManager_1.default.getInstance().getStrByTextId(840029);
        }
        else {
            bottom.getChildByName("tipLabel").getComponent(cc.RichText).string =
                LanguageManager_1.default.getInstance().getStrByTextId(840028);
        }
        if (this.take_egg_state == TakeEggState.Odinary) {
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_1");
        }
        else {
            top.getChildByName("Wish_Bar_0_1").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("Wish_Bar_0_2");
        }
        if (this.take_egg_state == TakeEggState.Odinary) {
            //     普通
            //     单发
            if (PropManager_1.PropManager.getInstance().getPropNum(EggInformation_1.EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40006");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10003");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state));
            }
            // 十连
            if (PropManager_1.PropManager.getInstance().getPropNum(EggInformation_1.EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40006");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10003");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state));
            }
        }
        else {
            // 高级
            // 单发
            if (PropManager_1.PropManager.getInstance().getPropNum(EggInformation_1.EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 0) {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40007");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10003");
                bottom.getChildByName("wishingSingleCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state));
            }
            // 十连
            if (PropManager_1.PropManager.getInstance().getPropNum(EggInformation_1.EggInformationManager.getInstance().getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) > 9) {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_40007");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state));
            }
            else {
                bottom.getChildByName("wishingCostIcon2").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_10003");
                bottom.getChildByName("wishingTenCostNum").getComponent(cc.Label).string =
                    "×" + EggInformation_1.EggInformationManager.getInstance().getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state));
            }
        }
        var arr = EggCumulative_1.EggCumulativeManager.getInstance().getTakeEggRewardList(this.take_egg_state);
        var isFree = Number(cc.sys.localStorage.getItem("TakeEggFree" + this.take_egg_state));
        var timeCountdownLable = bottom.getChildByName("freeTimeCountdown");
        var timeLable = bottom.getChildByName("freeTime");
        var timesLabel = bottom.getChildByName("wishingSingleCostNum");
        if (isFree == 1) {
            var func = void 0;
            var t_1 = parseInt(cc.sys.localStorage.getItem("TakeEggFreeTime" + this.take_egg_state));
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
                    cc.sys.localStorage.setItem("TakeEggFree" + _this.take_egg_state, 0);
                    _this.refreshUi();
                }
            };
            this.unscheduleAllCallbacks();
            timeCountdownLable.active = true;
            timeLable.active = true;
            if (remainSec_1 <= 0) {
                this.unscheduleAllCallbacks();
                cc.sys.localStorage.setItem("TakeEggFree" + this.take_egg_state, 0);
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
        // console.log(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + "/" + 
        // arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex"+this.take_egg_state))].CumulativeEggsDrawingTimes);
        top.getChildByName("cumulativeNum").getComponent(cc.Label).string =
            Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + "/" +
                arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes;
        // console.log(Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) 
        // , arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes) 
        top.getChildByName("cumulativeBar").getComponent(cc.ProgressBar).progress =
            Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state))
                / arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes;
        if (this.take_egg_state == TakeEggState.Odinary) {
            this.node.getChildByName("takeEggBg").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Bg_0");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_0");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_1_1");
            var ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            var premiumWishingLabel = bottom.getChildByName("premiumWishing");
            ordinaryWishingLabel.color = cc.color(168, 179, 200);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28, 36, 54);
            premiumWishingLabel.color = cc.color(126, 135, 151);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20, 26, 39);
        }
        else {
            this.node.getChildByName("takeEggBg").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Bg_1");
            bottom.getChildByName("ordinaryWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_0_1");
            bottom.getChildByName("premiumWishingBtn").getComponent(cc.Sprite).spriteFrame = this.take_egg_ui.getSpriteFrame("Hatch_Btn_Tab_1");
            var ordinaryWishingLabel = bottom.getChildByName("ordinaryWishing");
            var premiumWishingLabel = bottom.getChildByName("premiumWishing");
            premiumWishingLabel.color = cc.color(168, 179, 200);
            premiumWishingLabel.getComponent(cc.LabelOutline).color = cc.color(28, 36, 54);
            ordinaryWishingLabel.color = cc.color(126, 135, 151);
            ordinaryWishingLabel.getComponent(cc.LabelOutline).color = cc.color(20, 26, 39);
        }
    };
    TakeEggUi.prototype.onClickRewardBtn = function (isAuto) {
        if (isAuto === void 0) { isAuto = false; }
        if (isAuto == false) {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            var arr = EggCumulative_1.EggCumulativeManager.getInstance().getTakeEggRewardList(this.take_egg_state);
            if (Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) >=
                arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) - arr[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state))].CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state, num);
                var index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + this.take_egg_state) || -1;
                index++;
                if (index >= arr.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + this.take_egg_state, index);
                var gm = GameManager_1.default.getInstance();
                var item = PropManager_1.PropManager.getInstance().createPropItem(arr[index].ItemID, arr[index].RewardNum);
                gm.showGetTip(item);
                this.refreshUi();
            }
        }
        else {
            var arr1 = EggCumulative_1.EggCumulativeManager.getInstance().getTakeEggRewardList(TakeEggState.Odinary);
            var arr2 = EggCumulative_1.EggCumulativeManager.getInstance().getTakeEggRewardList(TakeEggState.Premium);
            var gm = GameManager_1.default.getInstance();
            var item1 = null;
            var item2 = null;
            if (Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary) || 0) >=
                arr1[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0)]
                    .CumulativeEggsDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary) || 0) -
                    arr1[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0)]
                        .CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + TakeEggState.Odinary, num);
                var index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary) || 0;
                index++;
                if (index >= arr1.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + TakeEggState.Odinary, index);
                item1 = PropManager_1.PropManager.getInstance().createPropItem(arr1[index].ItemID, arr1[index].RewardNum);
                PropManager_1.PropManager.getInstance().setPropNum(arr1[index].ItemID, arr1[index].RewardNum);
            }
            if (Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Premium) || 0) >=
                arr2[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0)]
                    .CumulativeEggsDrawingTimes) {
                var num = Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + TakeEggState.Premium) || 0) -
                    arr2[Number(cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0)]
                        .CumulativeEggsDrawingTimes;
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + TakeEggState.Premium, num);
                var index = cc.sys.localStorage.getItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium) || 0;
                index++;
                if (index >= arr2.length) {
                    index = 0;
                }
                cc.sys.localStorage.setItem("TakeEggCumulativeRewardIndex" + TakeEggState.Premium, index);
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
    TakeEggUi.prototype.ondClickTypeBtn = function (e, type) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        type = Number(type);
        this.take_egg_state = type;
        this.refreshUi();
    };
    TakeEggUi.prototype.checkCanWishing = function (type) {
        var pm = PropManager_1.PropManager.getInstance();
        var eim = EggInformation_1.EggInformationManager.getInstance();
        // let lm = LevelManager.getInstance()
        if (type == 1) {
            // 单抽
            if (this.take_egg_state == TakeEggState.Odinary) {
                // 普通
                if (pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)), -eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通开蛋消耗的普通宠物蛋数量, eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if (pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)), -eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通开蛋消耗的龙晶数量, eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
            else {
                // 高级
                if (pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)), -eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级开蛋消耗的高级宠物蛋数量, eim.getEggPropNum_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if (pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)), -eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级开蛋消耗的龙晶数量, eim.getEggPropNum_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
        }
        else {
            // 十抽
            if (this.take_egg_state == TakeEggState.Odinary) {
                // 普通
                if (pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)), -eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通开蛋消耗的普通宠物蛋数量, eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if (pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)), -eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录普通开蛋消耗的龙晶数量, eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
            else {
                // 高级
                if (pm.getPropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_1(this.getTakeEggSpendId(this.take_egg_state)), -eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级开蛋消耗的高级宠物蛋数量, eim.getTenEggProp_1(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                if (pm.getPropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state))) >= eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state))) {
                    pm.changePropNum(eim.getEggPropID_2(this.getTakeEggSpendId(this.take_egg_state)), -eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录高级开蛋消耗的龙晶数量, eim.getTenEggProp_2(this.getTakeEggSpendId(this.take_egg_state)));
                    return true;
                }
                return false;
            }
        }
    };
    TakeEggUi.prototype.onClickWishingBtn = function (e, type) {
        var _this = this;
        type = Number(type);
        if (type == 1) {
            var isFree = Number(cc.sys.localStorage.getItem("TakeEggFree" + this.take_egg_state));
            if (isFree == 1) {
                if (this.checkCanWishing(type) == false) {
                    return;
                }
                else {
                    cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state, Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 1);
                    // if (type == 1) {
                    // } else {
                    // cc.sys.localStorage.setItem("NowWishingCumulativeNum" + this.take_egg_state,
                    //     Number(cc.sys.localStorage.getItem("NowWishingCumulativeNum" + this.take_egg_state)) + 10);
                    // }
                }
            }
            else {
                var date = new Date();
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state, Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 1);
                cc.sys.localStorage.setItem("TakeEggFree" + this.take_egg_state, 1);
                cc.sys.localStorage.setItem("TakeEggFreeTime" + this.take_egg_state, date.getTime());
            }
        }
        else {
            if (this.checkCanWishing(type) == false) {
                return;
            }
            else {
                cc.sys.localStorage.setItem("NowTakeEggCumulativeNum" + this.take_egg_state, Number(cc.sys.localStorage.getItem("NowTakeEggCumulativeNum" + this.take_egg_state)) + 10);
            }
        }
        // let effect = cc.instantiate(this.effect);
        // let effectRoot = this.node.getChildByName("bottom").getChildByName("effectRoot")
        // effect.parent = effectRoot;
        // let anim;
        var reward = [];
        // if(this.take_egg_state == 1){
        // 普通池
        // anim = effect.getComponent(sp.Skeleton).setAnimation(0,"CommonWish",false)
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_YingBi);
        // if(type == 2){
        // 十抽
        // this.schedule(()=>{
        //     let coin = cc.instantiate(this.effect);
        //     coin.parent = effectRoot;
        //     coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false)
        // },0.1,9,0.4);
        // for(let i = 1;i<10;i++){
        //     setTimeout(()=>{
        //         let coin = cc.instantiate(this.effect);
        //         coin.parent = effectRoot;
        //         let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Common",false);
        //         coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
        //             if(event.data.name == "RuShui"){
        //                 this.RuShui();
        //             }
        //         });
        //     },100*i)
        // }
        //     }
        // }else{
        // 高级池
        // anim = effect.getComponent(sp.Skeleton).setAnimation(0,"SeniorWish",false)
        // if(type == 2){
        // 十抽
        // this.schedule(()=>{
        //     let coin = cc.instantiate(this.effect);
        //     coin.parent = effectRoot;
        //     coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
        // },0.1,9,0.4);
        // for(let i = 1;i<10;i++){
        //     setTimeout(()=>{
        //         let coin = cc.instantiate(this.effect);
        //         coin.parent = effectRoot;
        //         let a = coin.getComponent(sp.Skeleton).setAnimation(0,"Senior",false)
        //         coin.getComponent(sp.Skeleton).setTrackEventListener(a,(entry: sp.spine.TrackEntry, event)=>{
        //             if(event.data.name == "RuShui"){
        //                 this.RuShui();
        //             }
        //         });
        //     },100*i)
        // }
        // }
        // }
        if (type == 1) {
            // 单抽
            // let chapters = LevelManager.getInstance().getFinishChapter();
            if (this.take_egg_state == TakeEggState.Odinary) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录单次普通开蛋的次数);
            }
            else {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录单次高级开蛋的次数);
            }
            var prizePoolId = EggInformation_1.EggInformationManager.getInstance().getEggsReward(this.getTakeEggSpendId(this.take_egg_state));
            var poolId = JackpotCollection_1.JackpotCollectionManager.getInstance().getJackpotIdByJCId(prizePoolId);
            reward.push(Jackpot_1.JackpotManager.getInstance().getRewardDataById(poolId));
        }
        else {
            // 十抽
            if (this.take_egg_state == TakeEggState.Odinary) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录十连普通开蛋的次数);
            }
            else {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录十连高级开蛋的次数);
            }
            for (var i = 0; i < 10; i++) {
                // let chapters = LevelManager.getInstance().getFinishChapter();
                var prizePoolId = EggInformation_1.EggInformationManager.getInstance().getEggsReward(this.getTakeEggSpendId(this.take_egg_state));
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
            if (this.take_egg_state == TakeEggState.Odinary) {
                // let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010009);
                var rewardInfo = Jackpot_1.JackpotManager.getInstance().getRewardDataById(30002);
                reward[minId] = rewardInfo;
            }
            else {
                // let poolId = JackpotCollectionManager.getInstance().getJackpotIdByJCId(1010010);
                var rewardInfo = Jackpot_1.JackpotManager.getInstance().getRewardDataById(30003);
                reward[minId] = rewardInfo;
            }
        }
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry, event)=>{
        //     if(event.data.name == "ShowCard"){
        //         this.showCards(type,reward);
        //     }
        //     if(event.data.name == "RuShui"){
        //         this.RuShui();
        //     }
        //     if(event.data.name == "FeiChu"){
        //         this.TanChu();
        //     }
        // });
        // effect.getComponent(sp.Skeleton).setTrackEventListener(anim,(entry: sp.spine.TrackEntry,event)=>[
        // ])
        var maxQuality = 1;
        this.pet_reward_list = [];
        for (var i = 0; i < reward.length; i++) {
            // TaskManger.getInstance().setTaskItem(TaskItem.在许愿池中进行一次许愿);
            // TaskManger.getInstance().setTaskItem(TaskItem.在许愿池中许愿20次);
            // this.pet_reward_list.push(PetManager.getInstance().addPet(PetManager.getInstance().getPetId(reward[i].reward_id)));
            if (Item_1.ItemManager.getInstance().getQuality(reward[i].reward_id) > maxQuality)
                maxQuality = Item_1.ItemManager.getInstance().getQuality(reward[i].reward_id);
            // if(ItemManager.getInstance().getJsonItem(reward[i].reward_id).Type == 7){
            //     // 宠物
            // }else{
            //     // 道具
            //     PropManager.getInstance().changePropNum(reward[i].reward_id,reward[i].reward_num);
            // }
        }
        var animRoot = this.node.getChildByName("Hatch_Bg_2");
        animRoot.active = true;
        var animNode = animRoot.children[0];
        this.isPlay = true;
        var anim;
        if (type == 1) {
            anim = animNode.getComponent(sp.Skeleton).setAnimation(0, this.animation_name[maxQuality - 1], false);
        }
        else {
            anim = animNode.getComponent(sp.Skeleton).setAnimation(0, this.animation_name[(maxQuality - 1) + 4], false);
        }
        animNode.getComponent(sp.Skeleton).setTrackEventListener(anim, function (entry, event) {
            if (event.data.name == "OpenEgg") {
                _this.onShowLight();
            }
        });
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_KaiDan1);
        this.refreshUi();
    };
    TakeEggUi.prototype.onShowLight = function () {
        var _this = this;
        var animRoot = this.node.getChildByName("Hatch_Bg_2");
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Kaidan2);
        animRoot.children[1].active = true;
        cc.tween(animRoot.children[1]).to(0.5, { opacity: 255 }).to(0.5, { opacity: 0 }).call(function () {
            animRoot.children[1].active = false;
            _this.showGet();
        }).start();
    };
    TakeEggUi.prototype.showGet = function () {
        var _this = this;
        var itemList = [];
        // PetManager.getInstance().sortPetList(this.pet_reward_list);
        for (var i = 0; i < this.pet_reward_list.length; i++) {
            var item = cc.instantiate(this.pet_icon);
            item.getComponent(BtnPet_1.default).init(this.pet_reward_list[i]);
            itemList.push(item);
        }
        if (itemList.length > 1) {
            GameManager_1.default.getInstance().showMultipleGetTip(itemList, (function () {
                _this.isPlay = false;
                _this.onClickTakeEggBg();
                _this.onClickRewardBtn(true);
            }).bind(this));
        }
        else {
            GameManager_1.default.getInstance().showGetTip(itemList[0], (function () {
                _this.isPlay = false;
                _this.onClickTakeEggBg();
                _this.onClickRewardBtn(true);
            }).bind(this));
        }
    };
    // 点击背景
    TakeEggUi.prototype.onClickTakeEggBg = function () {
        if (this.isPlay == false) {
            this.node.getChildByName("Hatch_Bg_2").active = false;
        }
    };
    TakeEggUi.prototype.onClickTipBtn = function () {
        var id = this.getTakeEggSpendId(this.take_egg_state);
        // 抽蛋概率界面
        // UIManager.getInstance().showWishingTipUi(null,this.take_egg_state,id,true);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.WishingTips, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                // uiNode.getComponent(WishingTipUi).init(null);
                // uiNode.getComponent(WishingTipUi).initUi(this.take_egg_state,id,true);
            }, });
    };
    TakeEggUi.prototype.onClickCumulativeTipBtn = function () {
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
    // showCards(type:number,reward:RewardData[]){
    //     let card = cc.instantiate(this.wishing_card_ui)
    //     card.getComponent(WishingCardUi).initCard(type,reward);
    //     card.parent = this.node.getChildByName("bottom").getChildByName("cardRoot");
    // }
    // RuShui(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RuShui);
    // }
    // TanChu(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KaTanChu);
    // }
    TakeEggUi.prototype.getTakeEggSpendId = function (type) {
        return type * 10000 + 1;
    };
    TakeEggUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    TakeEggUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], TakeEggUi.prototype, "take_egg_ui", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], TakeEggUi.prototype, "wishing_ui", void 0);
    __decorate([
        property(cc.Prefab)
    ], TakeEggUi.prototype, "pet_icon", void 0);
    __decorate([
        property([cc.String])
    ], TakeEggUi.prototype, "animation_name", void 0);
    TakeEggUi = __decorate([
        ccclass
    ], TakeEggUi);
    return TakeEggUi;
}(UIComponent_1.default));
exports.default = TakeEggUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFrZUVnZ1xcVGFrZUVnZ1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLGlEQUF1RDtBQUN2RCwrQ0FBcUQ7QUFDckQsbUVBQXlFO0FBRXpFLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBRy9ELDJDQUFzQztBQUN0QywwQ0FBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBaUU7QUFDakUsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUU1Qyw2Q0FBNEM7QUFDNUMsbURBQXlEO0FBQ3pELDJDQUFzRDtBQUN0RCxtREFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3BCLHFEQUFXLENBQUE7SUFDWCxxREFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBR0Q7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUFzbkJDO1FBcm5CRyxvQkFBYyxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3BELHlCQUFtQixHQUFXLEtBQUssQ0FBQztRQUdwQyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFFbkMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFMUIsb0JBQWMsR0FBWSxFQUFFLENBQUM7UUFFckIsWUFBTSxHQUFXLEtBQUssQ0FBQztRQUN2QixxQkFBZSxHQUFhLEVBQUUsQ0FBQzs7SUF3bUIzQyxDQUFDO0lBdm1CRyx1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLHVCQUF1QjtJQUN2QixrQ0FBa0M7SUFFbEMsMkJBQTJCO0lB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InNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRWdnQ3VtdWxhdGl2ZU1hbmFnZXIgfSBmcm9tIFwiLi9FZ2dDdW11bGF0aXZlXCI7XHJcbmltcG9ydCB7IEphY2twb3RNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0phY2twb3RcIjtcclxuaW1wb3J0IHsgSmFja3BvdENvbGxlY3Rpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0phY2twb3RDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdG5QZXQgZnJvbSBcIi4uL1BldC9VaS9CdG5QZXRcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9FZ2dJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG4vLyBpbXBvcnQgV2lzaGluZ1RpcFVpIGZyb20gXCIuLi9XaXNoL1dpc2hpbmdUaXBVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gVGFrZUVnZ1N0YXRlIHtcclxuICAgIE9kaW5hcnkgPSAxLFxyXG4gICAgUHJlbWl1bSA9IDJcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFrZUVnZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG4gICAgdGFrZV9lZ2dfc3RhdGU6IFRha2VFZ2dTdGF0ZSA9IFRha2VFZ2dTdGF0ZS5PZGluYXJ5O1xyXG4gICAgc2hvd19jdW11bGF0aXZlX3RpcDpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgdGFrZV9lZ2dfdWk6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHdpc2hpbmdfdWk6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwZXRfaWNvbjpjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KFtjYy5TdHJpbmddKVxyXG4gICAgYW5pbWF0aW9uX25hbWU6c3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGlzUGxheTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHBldF9yZXdhcmRfbGlzdDpQZXRJbmZvW10gPSBbXTtcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBlZmZlY3Q6Y2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyB3aXNoaW5nX2NhcmRfdWk6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgLy8gcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWR7XHJcbiAgICAvLyAgICAgdGhpcy5pbml0KG51bGwpO1xyXG4gICAgLy8gfTtcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRha2VFZ2dCZ1wiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50YXJnZXQgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2FudmFzO1xyXG5cclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZVRpcHNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAyMSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9CdG5fM1wiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMjYpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9CdG5fMyBjb3B5XCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAyNyk7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZnJlZVRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMTQpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIm9yZGluYXJ5V2lzaGluZ1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDg0MDAzMik7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJlbWl1bVdpc2hpbmdcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMzMpO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2xpY2tSZXdhcmRCdG4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fS2FpRWdnamllbWlhbik7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLum+meW3ouaJk+W8gOasoeaVsCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIilcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZ2VtTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Mb25nSmluZyksMSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nQ29pbk51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuT3JkaW5hcnlUYWtlRWdnKSwxKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInByZW1pdW1XaXNoaW5nQ29pbk51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuUHJlbWl1bVRha2VFZ2cpLDEpXHJcblxyXG4gICAgICAgIGlmKHRoaXMudGFrZV9lZ2dfc3RhdGUgPT0gVGFrZUVnZ1N0YXRlLk9kaW5hcnkpe1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFxyXG4gICAgICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMjkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFxyXG4gICAgICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMjgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy50YWtlX2VnZ19zdGF0ZSA9PSBUYWtlRWdnU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIldpc2hfQmFyXzBfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2lzaGluZ191aS5nZXRTcHJpdGVGcmFtZShcIldpc2hfQmFyXzBfMVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiV2lzaF9CYXJfMF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiV2lzaF9CYXJfMF8yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50YWtlX2VnZ19zdGF0ZSA9PSBUYWtlRWdnU3RhdGUuT2RpbmFyeSkge1xyXG4gICAgICAgICAgICAvLyAgICAg5pmu6YCaXHJcbiAgICAgICAgICAgIC8vICAgICDljZXlj5FcclxuICAgICAgICAgICAgaWYgKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFZ2dQcm9wSURfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fNDAwMDZcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFZ2dQcm9wTnVtXzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDNcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFZ2dQcm9wTnVtXzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Y2B6L+eXHJcbiAgICAgICAgICAgIGlmIChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RWdnUHJvcElEXzEodGhpcy5nZXRUYWtlRWdnU3BlbmRJZCh0aGlzLnRha2VfZWdnX3N0YXRlKSkpID4gOSkge1xyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0Nvc3RJY29uMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtXzQwMDA2XCIpXHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nVGVuQ29zdE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCLDl1wiICsgRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVuRWdnUHJvcF8xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0Nvc3RJY29uMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtXzEwMDAzXCIpXHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nVGVuQ29zdE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCLDl1wiICsgRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVuRWdnUHJvcF8yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDpq5jnuqdcclxuICAgICAgICAgICAgLy8g5Y2V5Y+RXHJcbiAgICAgICAgICAgIGlmIChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RWdnUHJvcElEXzFcclxuICAgICAgICAgICAgICAgICh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fNDAwMDdcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFZ2dQcm9wTnVtXzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDNcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdTaW5nbGVDb3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFZ2dQcm9wTnVtXzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Y2B6L+eXHJcbiAgICAgICAgICAgIGlmIChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RWdnUHJvcElEXzFcclxuICAgICAgICAgICAgICAgICh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSkgPiA5KSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24yXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fNDAwMDdcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdUZW5Db3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZW5FZ2dQcm9wXzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nQ29zdEljb24yXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fMTAwMDNcIilcclxuICAgICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdUZW5Db3N0TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIsOXXCIgKyBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZW5FZ2dQcm9wXzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgYXJyID0gRWdnQ3VtdWxhdGl2ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWtlRWdnUmV3YXJkTGlzdCh0aGlzLnRha2VfZWdnX3N0YXRlKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBpc0ZyZWUgPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0ZyZWVcIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKVxyXG4gICAgICAgIGxldCB0aW1lQ291bnRkb3duTGFibGUgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmcmVlVGltZUNvdW50ZG93blwiKVxyXG4gICAgICAgIGxldCB0aW1lTGFibGUgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmcmVlVGltZVwiKVxyXG4gICAgICAgIGxldCB0aW1lc0xhYmVsID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ1NpbmdsZUNvc3ROdW1cIilcclxuXHJcblxyXG4gICAgICAgIGlmKGlzRnJlZSA9PSAxKXtcclxuICAgICAgICAgICAgbGV0IGZ1bmM6RnVuY3Rpb247XHJcbiAgICAgICAgICAgIGxldCB0ID0gcGFyc2VJbnQoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0ZyZWVUaW1lXCIrdGhpcy50YWtlX2VnZ19zdGF0ZSkpO1xyXG4gICAgICAgICAgICBsZXQgdHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IGRkZCA9IE1hdGguZmxvb3IoKHR0IC0gdCkvMTAwMCk7XHJcbiAgICAgICAgICAgIGxldCByZW1haW5TZWM9MjQqNjAqNjAtZGRkO1xyXG5cclxuICAgICAgICAgICAgZnVuYyA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHR0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBkZGQgPSBNYXRoLmZsb29yKCh0dCAtIHQpLzEwMDApO1xyXG4gICAgICAgICAgICAgICAgcmVtYWluU2VjPTI0KjYwKjYwLWRkZDtcclxuICAgICAgICAgICAgICAgIHRpbWVDb3VudGRvd25MYWJsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKHJlbWFpblNlYyk7XHJcbiAgICAgICAgICAgICAgICBpZihyZW1haW5TZWMgPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFrZUVnZ0ZyZWVcIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgdGltZUNvdW50ZG93bkxhYmxlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRpbWVMYWJsZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYocmVtYWluU2VjIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUYWtlRWdnRnJlZVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSwwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1lQ291bnRkb3duTGFibGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihyZW1haW5TZWMpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jLDEsY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsMClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGltZUNvdW50ZG93bkxhYmxlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aW1lTGFibGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRpbWVzTGFiZWwuY29sb3IgPSBjYy5jb2xvcigxNDUsMjU1LDExOSk7XHJcbiAgICAgICAgICAgIHRpbWVzTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4NDAwMTQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSArIFwiL1wiICsgXHJcbiAgICAgICAgLy8gYXJyW051bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIrdGhpcy50YWtlX2VnZ19zdGF0ZSkpXS5DdW11bGF0aXZlRWdnc0RyYXdpbmdUaW1lcyk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgICAgICBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSArIFwiL1wiICsgXHJcbiAgICAgICAgICAgIGFycltOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiK3RoaXMudGFrZV9lZ2dfc3RhdGUpKV0uQ3VtdWxhdGl2ZUVnZ3NEcmF3aW5nVGltZXM7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1Rha2VFZ2dDdW11bGF0aXZlTnVtXCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlKSkgXHJcbiAgICAgICAgLy8gLCBhcnJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRha2VFZ2dDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKV0uQ3VtdWxhdGl2ZUVnZ3NEcmF3aW5nVGltZXMpIFxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImN1bXVsYXRpdmVCYXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IFxyXG4gICAgICAgICAgICBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSBcclxuICAgICAgICAgICAgLyBhcnJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRha2VFZ2dDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKV0uQ3VtdWxhdGl2ZUVnZ3NEcmF3aW5nVGltZXM7XHJcbiAgICAgICAgaWYgKHRoaXMudGFrZV9lZ2dfc3RhdGUgPT0gVGFrZUVnZ1N0YXRlLk9kaW5hcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGFrZUVnZ0JnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YWtlX2VnZ191aS5nZXRTcHJpdGVGcmFtZShcIkhhdGNoX0JnXzBcIik7XHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIm9yZGluYXJ5V2lzaGluZ0J0blwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFrZV9lZ2dfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIYXRjaF9CdG5fVGFiXzBcIik7XHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZW1pdW1XaXNoaW5nQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YWtlX2VnZ191aS5nZXRTcHJpdGVGcmFtZShcIkhhdGNoX0J0bl9UYWJfMV8xXCIpO1xyXG4gICAgICAgICAgICBsZXQgb3JkaW5hcnlXaXNoaW5nTGFiZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJvcmRpbmFyeVdpc2hpbmdcIik7XHJcbiAgICAgICAgICAgIGxldCBwcmVtaXVtV2lzaGluZ0xhYmVsID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJlbWl1bVdpc2hpbmdcIik7XHJcbiAgICAgICAgICAgIG9yZGluYXJ5V2lzaGluZ0xhYmVsLmNvbG9yID0gY2MuY29sb3IoMTY4LDE3OSwyMDApO1xyXG4gICAgICAgICAgICBvcmRpbmFyeVdpc2hpbmdMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDI4LDM2LDU0KTtcclxuICAgICAgICAgICAgcHJlbWl1bVdpc2hpbmdMYWJlbC5jb2xvciA9IGNjLmNvbG9yKDEyNiwxMzUsMTUxKTtcclxuICAgICAgICAgICAgcHJlbWl1bVdpc2hpbmdMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDIwLDI2LDM5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0YWtlRWdnQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRha2VfZWdnX3VpLmdldFNwcml0ZUZyYW1lKFwiSGF0Y2hfQmdfMVwiKTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwib3JkaW5hcnlXaXNoaW5nQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YWtlX2VnZ191aS5nZXRTcHJpdGVGcmFtZShcIkhhdGNoX0J0bl9UYWJfMF8xXCIpO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmVtaXVtV2lzaGluZ0J0blwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFrZV9lZ2dfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIYXRjaF9CdG5fVGFiXzFcIik7XHJcbiAgICAgICAgICAgIGxldCBvcmRpbmFyeVdpc2hpbmdMYWJlbCA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIm9yZGluYXJ5V2lzaGluZ1wiKTtcclxuICAgICAgICAgICAgbGV0IHByZW1pdW1XaXNoaW5nTGFiZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmVtaXVtV2lzaGluZ1wiKTtcclxuICAgICAgICAgICAgcHJlbWl1bVdpc2hpbmdMYWJlbC5jb2xvciA9IGNjLmNvbG9yKDE2OCwxNzksMjAwKTtcclxuICAgICAgICAgICAgcHJlbWl1bVdpc2hpbmdMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDI4LDM2LDU0KTtcclxuICAgICAgICAgICAgb3JkaW5hcnlXaXNoaW5nTGFiZWwuY29sb3IgPSBjYy5jb2xvcigxMjYsMTM1LDE1MSk7XHJcbiAgICAgICAgICAgIG9yZGluYXJ5V2lzaGluZ0xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gY2MuY29sb3IoMjAsMjYsMzkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrUmV3YXJkQnRuKGlzQXV0bzpib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmKGlzQXV0byA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBFZ2dDdW11bGF0aXZlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRha2VFZ2dSZXdhcmRMaXN0KHRoaXMudGFrZV9lZ2dfc3RhdGUpO1xyXG4gICAgICAgICAgICBpZihOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSA+PSBcclxuICAgICAgICAgICAgYXJyW051bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlKSldLkN1bXVsYXRpdmVFZ2dzRHJhd2luZ1RpbWVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSAtIGFycltOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSkpXS5DdW11bGF0aXZlRWdnc0RyYXdpbmdUaW1lcztcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIk5vd1Rha2VFZ2dDdW11bGF0aXZlTnVtXCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlKSB8fCAtMTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBhcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlLGluZGV4KVxyXG4gICAgICAgICAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGFycltpbmRleF0uSXRlbUlELGFycltpbmRleF0uUmV3YXJkTnVtKTtcclxuICAgICAgICAgICAgICAgIGdtLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBhcnIxID0gRWdnQ3VtdWxhdGl2ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWtlRWdnUmV3YXJkTGlzdChUYWtlRWdnU3RhdGUuT2RpbmFyeSk7XHJcbiAgICAgICAgICAgIGxldCBhcnIyID0gRWdnQ3VtdWxhdGl2ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWtlRWdnUmV3YXJkTGlzdChUYWtlRWdnU3RhdGUuUHJlbWl1bSk7XHJcbiAgICAgICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTE6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBpdGVtMjpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1Rha2VFZ2dDdW11bGF0aXZlTnVtXCIgKyBUYWtlRWdnU3RhdGUuT2RpbmFyeSkgfHwgMCkgPj0gXHJcbiAgICAgICAgICAgIGFycjFbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRha2VFZ2dDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFRha2VFZ2dTdGF0ZS5PZGluYXJ5KSB8fCAwKV1cclxuICAgICAgICAgICAgLkN1bXVsYXRpdmVFZ2dzRHJhd2luZ1RpbWVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIFRha2VFZ2dTdGF0ZS5PZGluYXJ5KSB8fCAwKSAtIFxyXG4gICAgICAgICAgICAgICAgYXJyMVtOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgVGFrZUVnZ1N0YXRlLk9kaW5hcnkpIHx8IDApXVxyXG4gICAgICAgICAgICAgICAgLkN1bXVsYXRpdmVFZ2dzRHJhd2luZ1RpbWVzO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIFRha2VFZ2dTdGF0ZS5PZGluYXJ5LG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyBUYWtlRWdnU3RhdGUuT2RpbmFyeSkgfHwgMDtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBhcnIxLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgVGFrZUVnZ1N0YXRlLk9kaW5hcnksaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGl0ZW0xPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oYXJyMVtpbmRleF0uSXRlbUlELGFycjFbaW5kZXhdLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFByb3BOdW0oYXJyMVtpbmRleF0uSXRlbUlELGFycjFbaW5kZXhdLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vd1Rha2VFZ2dDdW11bGF0aXZlTnVtXCIgKyBUYWtlRWdnU3RhdGUuUHJlbWl1bSkgfHwgMCkgPj0gXHJcbiAgICAgICAgICAgIGFycjJbTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRha2VFZ2dDdW11bGF0aXZlUmV3YXJkSW5kZXhcIiArIFRha2VFZ2dTdGF0ZS5QcmVtaXVtKSB8fCAwKV1cclxuICAgICAgICAgICAgLkN1bXVsYXRpdmVFZ2dzRHJhd2luZ1RpbWVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIFRha2VFZ2dTdGF0ZS5QcmVtaXVtKSB8fCAwKSAtIFxyXG4gICAgICAgICAgICAgICAgYXJyMltOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgVGFrZUVnZ1N0YXRlLlByZW1pdW0pIHx8IDApXVxyXG4gICAgICAgICAgICAgICAgLkN1bXVsYXRpdmVFZ2dzRHJhd2luZ1RpbWVzO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIFRha2VFZ2dTdGF0ZS5QcmVtaXVtLG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUYWtlRWdnQ3VtdWxhdGl2ZVJld2FyZEluZGV4XCIgKyBUYWtlRWdnU3RhdGUuUHJlbWl1bSkgfHwgMDtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBhcnIyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFrZUVnZ0N1bXVsYXRpdmVSZXdhcmRJbmRleFwiICsgVGFrZUVnZ1N0YXRlLlByZW1pdW0saW5kZXgpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGl0ZW0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oYXJyMltpbmRleF0uSXRlbUlELGFycjJbaW5kZXhdLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFByb3BOdW0oYXJyMltpbmRleF0uSXRlbUlELGFycjJbaW5kZXhdLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ20uc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgaWYoaXRlbTEgIT0gbnVsbCAmJiBpdGVtMiAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGdtLnNob3dNdWx0aXBsZUdldFRpcChbaXRlbTEsaXRlbTJdKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtMSE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uc2hvd0dldFRpcChpdGVtMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtMiE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uc2hvd0dldFRpcChpdGVtMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25kQ2xpY2tUeXBlQnRuKGUsdHlwZTpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdHlwZSA9IE51bWJlcih0eXBlKTtcclxuICAgICAgICB0aGlzLnRha2VfZWdnX3N0YXRlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ2FuV2lzaGluZyh0eXBlOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBsZXQgcG0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgbGV0IGVpbSA9IEVnZ0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgLy8gbGV0IGxtID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBpZih0eXBlID09IDEpe1xyXG4gICAgICAgICAgICAvLyDljZXmir1cclxuICAgICAgICAgICAgaWYodGhpcy50YWtlX2VnZ19zdGF0ZSA9PSBUYWtlRWdnU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgICAgICAvLyDmma7pgJpcclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0RWdnUHJvcE51bV8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldEVnZ1Byb3BOdW1fMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9leaZrumAmuW8gOibi+a2iOiAl+eahOaZrumAmuWuoOeJqeibi+aVsOmHjyxlaW0uZ2V0RWdnUHJvcE51bV8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0RWdnUHJvcE51bV8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldEVnZ1Byb3BOdW1fMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9leaZrumAmuW8gOibi+a2iOiAl+eahOm+meaZtuaVsOmHjyxlaW0uZ2V0RWdnUHJvcE51bV8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDpq5jnuqdcclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0RWdnUHJvcE51bV8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldEVnZ1Byb3BOdW1fMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+W8gOibi+a2iOiAl+eahOmrmOe6p+WuoOeJqeibi+aVsOmHjyxlaW0uZ2V0RWdnUHJvcE51bV8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0RWdnUHJvcE51bV8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldEVnZ1Byb3BOdW1fMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+W8gOibi+a2iOiAl+eahOm+meaZtuaVsOmHjyxlaW0uZ2V0RWdnUHJvcE51bV8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDljYHmir1cclxuICAgICAgICAgICAgaWYodGhpcy50YWtlX2VnZ19zdGF0ZSA9PSBUYWtlRWdnU3RhdGUuT2RpbmFyeSl7XHJcbiAgICAgICAgICAgICAgICAvLyDmma7pgJpcclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0VGVuRWdnUHJvcF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldFRlbkVnZ1Byb3BfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9leaZrumAmuW8gOibi+a2iOiAl+eahOaZrumAmuWuoOeJqeibi+aVsOmHjyxlaW0uZ2V0VGVuRWdnUHJvcF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0VGVuRWdnUHJvcF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldFRlbkVnZ1Byb3BfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9leaZrumAmuW8gOibi+a2iOiAl+eahOm+meaZtuaVsOmHjyxlaW0uZ2V0VGVuRWdnUHJvcF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDpq5jnuqdcclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0VGVuRWdnUHJvcF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldFRlbkVnZ1Byb3BfMSh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+W8gOibi+a2iOiAl+eahOmrmOe6p+WuoOeJqeibi+aVsOmHjyxlaW0uZ2V0VGVuRWdnUHJvcF8xKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBtLmdldFByb3BOdW0oZWltLmdldEVnZ1Byb3BJRF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKSA+PSBlaW0uZ2V0VGVuRWdnUHJvcF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbS5jaGFuZ2VQcm9wTnVtKGVpbS5nZXRFZ2dQcm9wSURfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSwtZWltLmdldFRlbkVnZ1Byb3BfMih0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuiusOW9lemrmOe6p+W8gOibi+a2iOiAl+eahOm+meaZtuaVsOmHjyxlaW0uZ2V0VGVuRWdnUHJvcF8yKHRoaXMuZ2V0VGFrZUVnZ1NwZW5kSWQodGhpcy50YWtlX2VnZ19zdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrV2lzaGluZ0J0bihlLHR5cGU6bnVtYmVyKXtcclxuICAgICAgICB0eXBlID0gTnVtYmVyKHR5cGUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgaXNGcmVlID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRha2VFZ2dGcmVlXCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlKSlcclxuICAgICAgICAgICAgaWYgKGlzRnJlZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0Nhbldpc2hpbmcodHlwZSkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIk5vd1Rha2VFZ2dDdW11bGF0aXZlTnVtXCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJOb3dXaXNoaW5nQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSkpICsgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJOb3dUYWtlRWdnQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTm93VGFrZUVnZ0N1bXVsYXRpdmVOdW1cIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUpKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFrZUVnZ0ZyZWVcIiArIHRoaXMudGFrZV9lZ2dfc3RhdGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFrZUVnZ0ZyZWVUaW1lXCIgKyB0aGlzLnRha2VfZWdnX3N0YXRlLCBkYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tDYW5XaXNoaW5nKHR5cGUpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJOb3dUYWtlRWdnQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSxcclxuICAgICAgICAgICAgICAgIE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJOb3dUYWtlRWdnQ3VtdWxhdGl2ZU51bVwiICsgdGhpcy50YWtlX2VnZ19zdGF0ZSkpICsgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgZWZmZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5lZmZlY3QpO1xyXG4gICAgICAgIC8vIGxldCBlZmZlY3RSb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0Um9vdFwiKVxyXG4gICAgICAgIC8vIGVmZmVjdC5wYXJlbnQgPSBlZmZlY3RSb290O1xyXG4gICAgICAgIC8vIGxldCBhbmltO1xyXG4gICAgICAgIGxldCByZXdhcmQ6UmV3YXJkRGF0YVtdID0gW107XHJcbiAgICAgICAgLy8gaWYodGhpcy50YWtlX2VnZ19zdGF0ZSA9PSAxKXtcclxuICAgICAgICAgICAgLy8g5pmu6YCa5rGgXHJcbiAgICAgICAgICAgIC8vIGFuaW0gPSBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIkNvbW1vbldpc2hcIixmYWxzZSlcclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1lpbmdCaSk7XHJcbiAgICAgICAgICAgIC8vIGlmKHR5cGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAvLyDljYHmir1cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgY29pbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb2luLnBhcmVudCA9IGVmZmVjdFJvb3Q7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29pbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiQ29tbW9uXCIsZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAvLyB9LDAuMSw5LDAuNCk7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAxO2k8MTA7aSsrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBjb2luID0gY2MuaW5zdGFudGlhdGUodGhpcy5lZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb2luLnBhcmVudCA9IGVmZmVjdFJvb3Q7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBhID0gY29pbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiQ29tbW9uXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb2luLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0VHJhY2tFdmVudExpc3RlbmVyKGEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZSA9PSBcIlJ1U2h1aVwiKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlJ1U2h1aSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LDEwMCppKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIOmrmOe6p+axoFxyXG4gICAgICAgICAgICAvLyBhbmltID0gZWZmZWN0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJTZW5pb3JXaXNoXCIsZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIGlmKHR5cGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAvLyDljYHmir1cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgY29pbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb2luLnBhcmVudCA9IGVmZmVjdFJvb3Q7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29pbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiU2VuaW9yXCIsZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAvLyB9LDAuMSw5LDAuNCk7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAxO2k8MTA7aSsrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBjb2luID0gY2MuaW5zdGFudGlhdGUodGhpcy5lZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb2luLnBhcmVudCA9IGVmZmVjdFJvb3Q7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBhID0gY29pbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiU2VuaW9yXCIsZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvaW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYoZXZlbnQuZGF0YS5uYW1lID09IFwiUnVTaHVpXCIpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuUnVTaHVpKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sMTAwKmkpXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgIC8vIOWNleaKvVxyXG4gICAgICAgICAgICAvLyBsZXQgY2hhcHRlcnMgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGFrZV9lZ2dfc3RhdGUgPT0gVGFrZUVnZ1N0YXRlLk9kaW5hcnkpe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiusOW9leWNleasoeaZrumAmuW8gOibi+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiusOW9leWNleasoemrmOe6p+W8gOibi+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHByaXplUG9vbElkID0gRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RWdnc1Jld2FyZCh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKTtcclxuICAgICAgICAgICAgbGV0IHBvb2xJZCA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEphY2twb3RJZEJ5SkNJZChwcml6ZVBvb2xJZCk7XHJcbiAgICAgICAgICAgIHJld2FyZC5wdXNoKEphY2twb3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YUJ5SWQocG9vbElkKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIOWNgeaKvVxyXG4gICAgICAgICAgICBpZih0aGlzLnRha2VfZWdnX3N0YXRlID09IFRha2VFZ2dTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXljYHov57mma7pgJrlvIDom4vnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXljYHov57pq5jnuqflvIDom4vnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTwxMDtpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGNoYXB0ZXJzID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByaXplUG9vbElkID0gRWdnSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RWdnc1Jld2FyZCh0aGlzLmdldFRha2VFZ2dTcGVuZElkKHRoaXMudGFrZV9lZ2dfc3RhdGUpKTtcclxuICAgICAgICAgICAgICAgIGxldCBwb29sSWQgPSBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKYWNrcG90SWRCeUpDSWQocHJpemVQb29sSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkLnB1c2goSmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChwb29sSWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbWluSWQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbWluUXVhbGl0eSA9IDEwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2k8cmV3YXJkLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHJld2FyZFtpXS5yZXdhcmRfaWQpIDwgbWluUXVhbGl0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluUXVhbGl0eSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShyZXdhcmRbaV0ucmV3YXJkX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIG1pbklkID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnRha2VfZWdnX3N0YXRlID09IFRha2VFZ2dTdGF0ZS5PZGluYXJ5KXtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwb29sSWQgPSBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKYWNrcG90SWRCeUpDSWQoMTAxMDAwOSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkSW5mbyA9IEphY2twb3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YUJ5SWQoMzAwMDIpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkW21pbklkXSA9IHJld2FyZEluZm87XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHBvb2xJZCA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEphY2twb3RJZEJ5SkNJZCgxMDEwMDEwKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRJbmZvID0gSmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZCgzMDAwMyk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRbbWluSWRdID0gcmV3YXJkSW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KT0+e1xyXG4gICAgICAgIC8vICAgICBpZihldmVudC5kYXRhLm5hbWUgPT0gXCJTaG93Q2FyZFwiKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0NhcmRzKHR5cGUscmV3YXJkKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZihldmVudC5kYXRhLm5hbWUgPT0gXCJSdVNodWlcIil7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLlJ1U2h1aSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmKGV2ZW50LmRhdGEubmFtZSA9PSBcIkZlaUNodVwiKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuVGFuQ2h1KCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyBlZmZlY3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksZXZlbnQpPT5bXHJcblxyXG4gICAgICAgIC8vIF0pXHJcbiAgICAgICAgbGV0IG1heFF1YWxpdHkgPSAxO1xyXG4gICAgICAgIHRoaXMucGV0X3Jld2FyZF9saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHJld2FyZC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgLy8gVGFza01hbmdlci5nZXRJbnN0YW5jZSgpLnNldFRhc2tJdGVtKFRhc2tJdGVtLuWcqOiuuOaEv+axoOS4rei/m+ihjOS4gOasoeiuuOaEvyk7XHJcbiAgICAgICAgICAgIC8vIFRhc2tNYW5nZXIuZ2V0SW5zdGFuY2UoKS5zZXRUYXNrSXRlbShUYXNrSXRlbS7lnKjorrjmhL/msaDkuK3orrjmhL8yMOasoSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucGV0X3Jld2FyZF9saXN0LnB1c2goUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFBldChQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0SWQocmV3YXJkW2ldLnJld2FyZF9pZCkpKTtcclxuICAgICAgICAgICAgaWYoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHJld2FyZFtpXS5yZXdhcmRfaWQpID4gbWF4UXVhbGl0eSkgbWF4UXVhbGl0eSA9ICBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkocmV3YXJkW2ldLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgIC8vIGlmKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkl0ZW0ocmV3YXJkW2ldLnJld2FyZF9pZCkuVHlwZSA9PSA3KXtcclxuICAgICAgICAgICAgLy8gICAgIC8vIOWuoOeJqVxyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIC8vIOmBk+WFt1xyXG4gICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZFtpXS5yZXdhcmRfaWQscmV3YXJkW2ldLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYW5pbVJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJIYXRjaF9CZ18yXCIpO1xyXG4gICAgICAgIGFuaW1Sb290LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGFuaW1Ob2RlID0gYW5pbVJvb3QuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgdGhpcy5pc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGxldCBhbmltO1xyXG4gICAgICAgIGlmKHR5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgIGFuaW0gPSBhbmltTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLHRoaXMuYW5pbWF0aW9uX25hbWVbbWF4UXVhbGl0eSAtIDFdLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYW5pbSA9IGFuaW1Ob2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsdGhpcy5hbmltYXRpb25fbmFtZVsobWF4UXVhbGl0eSAtIDEpICsgNF0sZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbmltTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpPT57XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZSA9PSBcIk9wZW5FZ2dcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvd0xpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS2FpRGFuMSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNob3dMaWdodCgpe1xyXG4gICAgICAgIGxldCBhbmltUm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkhhdGNoX0JnXzJcIik7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0thaWRhbjIpO1xyXG4gICAgICAgIGFuaW1Sb290LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2MudHdlZW4oYW5pbVJvb3QuY2hpbGRyZW5bMV0pLnRvKDAuNSx7b3BhY2l0eToyNTV9KS50bygwLjUse29wYWNpdHk6MH0pLmNhbGwoKCkgPT57XHJcbiAgICAgICAgICAgIGFuaW1Sb290LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZXQoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dHZXQoKXtcclxuICAgICAgICBsZXQgaXRlbUxpc3Q6Y2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgLy8gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvcnRQZXRMaXN0KHRoaXMucGV0X3Jld2FyZF9saXN0KTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8dGhpcy5wZXRfcmV3YXJkX2xpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfaWNvbik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEJ0blBldCkuaW5pdCh0aGlzLnBldF9yZXdhcmRfbGlzdFtpXSk7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGl0ZW1MaXN0Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoaXRlbUxpc3QsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tUYWtlRWdnQmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja1Jld2FyZEJ0bih0cnVlKTtcclxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7IFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbUxpc3RbMF0sKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tUYWtlRWdnQmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja1Jld2FyZEJ0bih0cnVlKTtcclxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g54K55Ye76IOM5pmvXHJcbiAgICBvbkNsaWNrVGFrZUVnZ0JnKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1BsYXkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJIYXRjaF9CZ18yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVGlwQnRuKCl7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRUYWtlRWdnU3BlbmRJZCh0aGlzLnRha2VfZWdnX3N0YXRlKTtcclxuICAgICAgICAvLyDmir3om4vmpoLnjofnlYzpnaJcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93V2lzaGluZ1RpcFVpKG51bGwsdGhpcy50YWtlX2VnZ19zdGF0ZSxpZCx0cnVlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLldpc2hpbmdUaXBzLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAvLyB1aU5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdUaXBVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChXaXNoaW5nVGlwVWkpLmluaXRVaSh0aGlzLnRha2VfZWdnX3N0YXRlLGlkLHRydWUpO1xyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0N1bXVsYXRpdmVUaXBCdG4oKXtcclxuICAgICAgICBpZih0aGlzLnNob3dfY3VtdWxhdGl2ZV90aXAgPT0gdHJ1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hvd19jdW11bGF0aXZlX3RpcCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZVRpcHNMYWJlbFwiKTtcclxuICAgICAgICBsZXQgdGlwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZVRpcHNcIik7XHJcbiAgICAgICAgbGFiZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBsYWJlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGlwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dfY3VtdWxhdGl2ZV90aXAgPSBmYWxzZTtcclxuICAgICAgICB9LDIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd0NhcmRzKHR5cGU6bnVtYmVyLHJld2FyZDpSZXdhcmREYXRhW10pe1xyXG4gICAgLy8gICAgIGxldCBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy53aXNoaW5nX2NhcmRfdWkpXHJcbiAgICAvLyAgICAgY2FyZC5nZXRDb21wb25lbnQoV2lzaGluZ0NhcmRVaSkuaW5pdENhcmQodHlwZSxyZXdhcmQpO1xyXG4gICAgLy8gICAgIGNhcmQucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFJvb3RcIik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gUnVTaHVpKCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1J1U2h1aSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gVGFuQ2h1KCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0thVGFuQ2h1KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXRUYWtlRWdnU3BlbmRJZCh0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0eXBlKjEwMDAwKzE7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcbn1cclxuIl19