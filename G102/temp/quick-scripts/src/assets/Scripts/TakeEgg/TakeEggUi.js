"use strict";
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