
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SignUiDaily.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '533b1crXb5PY6FPWfFNph8L', 'SignUiDaily');
// Scripts/UI/home/SignUiDaily.ts

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
var SignNum_1 = require("../../JsonData/SignNum");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Prop_1 = require("../../Prop/Prop");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var SignInGetTip_1 = require("./SignInGetTip");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignUiDaily = /** @class */ (function (_super) {
    __extends(SignUiDaily, _super);
    function SignUiDaily() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Node)
        // today_bg:cc.Node = null;
        // @property(cc.Node)
        // today_light:cc.Node = null;
        _this.sign_in_item = null;
        _this.sign_in_cumulative_item = null;
        _this.sign_in_ui = null;
        _this.today = null;
        return _this;
    }
    SignUiDaily.prototype.init = function (uiAc) {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日签到点击次数);
        this.refreshUi();
    };
    SignUiDaily.prototype.refreshUi = function () {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var todayZero = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp) - (60 * 60 * 24);
        var date = new Date(todayZero * 1000);
        var tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        // 获取到当月的天数
        var days = tempDate.getDate();
        var monthType = days;
        var data = SignIn_1.SignInManager.getInstance().getDataBySignInType(monthType);
        content.removeAllChildren();
        data.forEach(function (v, k) {
            var item = cc.instantiate(_this.sign_in_item);
            var reward = PropManager_1.PropManager.getInstance().createPropItem(v.Item, v.Num);
            reward.name = 'reward';
            reward.scale = 0.74;
            item.addChild(reward);
            reward.setPosition(cc.v2(0, -15));
            item.getComponentInChildren(TextLanguage_1.default).setReplaceValue('~', (k + 1) + '');
            var bg = new cc.Node();
            var gou = new cc.Node();
            bg.name = 'bg';
            if (v.Day < date.getDate()) {
                bg.addComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Bg_1_Mask");
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInDay + v.Day, 0) == 1) {
                    gou.addComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Got");
                    bg.addChild(gou);
                    gou.setPosition(cc.v2(0, -7));
                }
                item.addChild(bg);
            }
            else if (v.Day == date.getDate()) {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInDay + v.Day, 0) == 1) {
                    bg.addComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Bg_1_Mask");
                    gou.addComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Got");
                    bg.addChild(gou);
                    gou.setPosition(cc.v2(0, -7));
                    item.addChild(bg);
                }
                else {
                    _this.today.parent = item;
                    _this.today.zIndex = -1;
                    _this.today.setPosition(cc.v2(0, -15));
                    // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollTo(cc.v2(item.x,item.y),0.2);
                    _this.scheduleOnce(function () {
                        // let offset = content.y - item.y
                        if (date.getDate() > 12) {
                            if (date.getDate() > 24) {
                                _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(0.2);
                            }
                            else {
                                cc.tween(content).to(0.2, { y: -item.y }).start();
                            }
                        }
                    }, 0.2);
                }
            }
            content.addChild(item);
        });
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 1) {
            this.today.active = false;
            this.node.getChildByName("receiveBtn").active = false;
        }
        else {
            this.today.active = true;
            this.node.getChildByName("receiveBtn").active = true;
            this.node.getChildByName("receiveBtn").getChildByName('RedTip').active = true;
        }
        var cumulativeContent = this.node.getChildByName("checkBoxScroll").getComponent(cc.ScrollView).content;
        var cumulativeData = SignNum_1.SignNumManager.getInstance().getJsonData();
        cumulativeContent.removeAllChildren();
        cumulativeData.forEach(function (v, k) {
            var item = cc.instantiate(_this.sign_in_cumulative_item);
            item.name = "item" + k;
            item.getChildByName("days").getComponentInChildren(TextLanguage_1.default).setReplaceValue('~', v.DayNum + '');
            if (v.DayNum <= StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)) {
                item.getComponent(cc.ProgressBar).progress = 1;
            }
            else if (k > 0) {
                if (v.DayNum > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)
                    && cumulativeData[k - 1].DayNum <= StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)) {
                    item.getComponent(cc.ProgressBar).progress =
                        (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum) - cumulativeData[k - 1].DayNum) / (v.DayNum - cumulativeData[k - 1].DayNum);
                }
                else {
                    item.getComponent(cc.ProgressBar).progress = 0;
                }
            }
            else {
                if (v.DayNum > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)) {
                    item.getComponent(cc.ProgressBar).progress =
                        (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum) / (v.DayNum));
                }
                else {
                    item.getComponent(cc.ProgressBar).progress = 0;
                }
            }
            if (v.DayNum <= StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum, 0)) {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.DayNum, 0) == 1) {
                    // 已领取
                    item.getChildByName("light").active = false;
                    item.getChildByName("box").getComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Chesk_1");
                }
                else {
                    // 未领取
                    item.getChildByName("light").active = true;
                    item.getChildByName("box").getComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Chesk_0");
                }
            }
            item.on(cc.Node.EventType.TOUCH_END, function () {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.DayNum, 0) == 1
                    || v.DayNum > StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
                    var tip = cumulativeContent.parent.parent.getChildByName("tip");
                    tip.active = true;
                    var itemRoot = tip.getChildByName("itemRoot");
                    itemRoot.removeAllChildren();
                    itemRoot.width = 0;
                    var pos = cc.v2(cumulativeContent.getPosition().x + item.x + 40, cumulativeContent.getPosition().y + item.y + 70);
                    itemRoot.setPosition(pos);
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.Item, v.Num);
                    reward.scale = 0.7;
                    if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.DayNum, 0) == 1) {
                        // 已领取
                        var ss = new cc.Node();
                        ss.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                        ss.opacity = 155;
                        reward.addChild(ss);
                        var isOk = new cc.Node();
                        isOk.addComponent(cc.Sprite).spriteFrame = _this.sign_in_ui.getSpriteFrame("SignIn_Got");
                        reward.addChild(isOk);
                        ss.setPosition(cc.v2(0, 0));
                        isOk.setPosition(cc.v2(0, 0));
                    }
                    reward.parent = itemRoot;
                }
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.DayNum, 0) == 0
                    && v.DayNum <= StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum)) {
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.Item, v.Num);
                    PropManager_1.PropManager.getInstance().changePropNum(v.Item, v.Num);
                    GameManager_1.default.getInstance().showGetTip(reward);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.addSignGift, _this.getMonthJsonString(v.DayNum));
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.DayNum, 1);
                    _this.refreshUi();
                }
            });
            cumulativeContent.addChild(item);
        });
        this.node.getChildByName("checkBoxScroll").getChildByName("cumulativeDays").getComponent(TextLanguage_1.default).setReplaceValue('~', StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum, 0) + '');
    };
    SignUiDaily.prototype.onSignInBtnClick = function () {
        var todayZero = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp) - (60 * 60 * 24);
        var date = new Date(todayZero * 1000);
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var reward = null;
        content.children.forEach(function (v, k) {
            if (reward == null) {
                if (v.getChildByName('bg') == null) {
                    reward = v.getChildByName("reward").getComponent(Prop_1.default);
                }
            }
        });
        // let rewardItem = PropManager.getInstance().createPropItem(reward.prop_id,reward.prop_num);
        PropManager_1.PropManager.getInstance().changePropNum(reward.prop_id, reward.prop_num);
        GameManager_1.default.getInstance().refreshGemShow();
        GameManager_1.default.getInstance().refreshCoinShow();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_SignIn, false, EventManager_1.RedEventType.Btn_Main_SignIn_BtnGet);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInGet, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(SignInGetTip_1.default).init(null);
                uiNode.getComponent(SignInGetTip_1.default).initData({
                    reward_id: reward.prop_id,
                    reward_num: reward.prop_num
                });
            } });
        // GameManager.getInstance().showGetTip(rewardItem);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInDay + date.getDate(), 1);
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.monthSign, this.getUserIdJsonString());
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum, 0);
        num++;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInNum, num);
        this.refreshUi();
    };
    SignUiDaily.prototype.clickSignIn = function (node) {
        // this.today_bg.active = false;
        // this.today_light.active = false;
        // node.off(cc.Node.EventType.TOUCH_START)
        // let today = new Date().getDate();
        // node.getChildByName("dark").active = true;
        // node.getChildByName("checkmark").active = true;
        // node.getChildByName("item").getChildByName("effect1").active = false;
        // this.signInDays++;
        // this.node.getChildByName("cumulativeDays").getComponent(cc.Label).string = String(this.signInDays);
        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }
        // let infoSignNumManager = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // str += infoSignNumManager.DayNum;
        // // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        // if(this.signInDays >= Number(infoSignNumManager.DayNum)){
        //     // 特效显示
        //     this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = true;
        // }
        // let gm = GameManager.getInstance();
        // let prop = node.getChildByName("item").getComponent(Prop);
        // // let info = gm.box_json_data.getRewardByid(prop.prop_id,prop.prop_num)
        // // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);;
        // let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        // // if(info != null){
        // //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        // // }else{
        // // }
        // gm.showGetTip(item);
        // // 保存签到记录
        // cc.sys.localStorage.setItem("SignUiDaily_" + today,"1")
        // GameData.getInstance().saveIsSignToday(true);
    };
    SignUiDaily.prototype.supplementarySignIn = function (node) {
        // console.log(node)
        // let supplementaryDay = Number(node.name);
        // node.getChildByName("checkmark").active = true;
        // node.off(cc.Node.EventType.TOUCH_START)
        // let label = node.getChildByName("day")
        // // label.getComponent(cc.Label).string = this.getJointString(100001,supplementaryDay);
        // label.color = new cc.Color(51,32,63);
        // label.getComponent(cc.LabelOutline).enabled = false;
        // this.signInDays++;
        // this.node.getChildByName("cumulativeDays").getComponent(cc.Label).string = String(this.signInDays);
        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }
        // // console.log(600 + Number(index))
        // let infoSignNumManager = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // str += infoSignNumManager.DayNum;
        // // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        // if(this.signInDays >= Number(infoSignNumManager.DayNum)){
        //     // 特效显示
        //     this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = true;
        // }
        // let gm = GameManager.getInstance();
        // let prop = node.getChildByName("item").getComponent(Prop);
        // // let info = gm.box_json_data.getRewardByid(prop.prop_type,prop.prop_num)
        // // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);;
        // let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        // // if(info != null){
        // //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        // // }else{
        // // }
        // gm.showGetTip(item);
        // // 保存签到记录
        // cc.sys.localStorage.setItem("SignUiDaily_" + supplementaryDay,"1")
    };
    SignUiDaily.prototype.cumulativeReward = function (node) {
        // let str = String(this.signInDays) + "/";
        // let index = cc.sys.localStorage.getItem("SignUiDailyCumulative");
        // if(index == "" || index == null){
        //     cc.sys.localStorage.setItem("SignUiDailyCumulative",1);
        //     index = 1;
        // }
        // let infoReward = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        // if(this.signInDays >= Number(infoReward.DayNum)){
        //     let gm = GameManager.getInstance();
        //     let prop = node.getComponent(Prop);
        //     // let info = gm.box_json_data.getRewardByid(prop.prop_type,prop.prop_num)
        //     // let item = gm.box_json_data.createBoxItem(prop.prop_id,prop.prop_num);
        //     let item = PropManager.getInstance().createPropItem(prop.prop_id,prop.prop_num);
        //     // if(info != null){
        //     //     item = gm.box_json_data.createBoxItem(info.reward_id,info.reward_num);
        //     // }else{
        //     // }
        //     index++;
        //     if(SignNumManager.getInstance().getJsonSignNum(600 + Number(index))){
        //         cc.sys.localStorage.setItem("SignUiDailyCumulative",index);
        //         let newItem = SignNumManager.getInstance().getJsonSignNum(600 + Number(index));
        //         if(this.signInDays < newItem.DayNum){
        //             this.node.getChildByName("cumulativeItem").getChildByName("itemRoot").getChildByName("effect2").active = false;
        //         }
        //         prop.init(newItem.Item,newItem.Num,PropAction.Look);
        //         str += newItem.DayNum;
        //         // this.node.getChildByName("daysRatio").getComponent(cc.Label).string = str;
        //         gm.showGetTip(item);
        //     }
        // }
    };
    SignUiDaily.prototype.onClickTipBg = function () {
        this.node.getChildByName("checkBoxScroll").getChildByName("tip").active = false;
    };
    SignUiDaily.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    SignUiDaily.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_SignIn);
    };
    SignUiDaily.prototype.getUserIdJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    SignUiDaily.prototype.getMonthJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        var t = type;
        return JSON.stringify({
            uid: uid,
            type: t,
        });
    };
    __decorate([
        property(cc.Prefab)
    ], SignUiDaily.prototype, "sign_in_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], SignUiDaily.prototype, "sign_in_cumulative_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], SignUiDaily.prototype, "sign_in_ui", void 0);
    __decorate([
        property(cc.Node)
    ], SignUiDaily.prototype, "today", void 0);
    SignUiDaily = __decorate([
        ccclass
    ], SignUiDaily);
    return SignUiDaily;
}(UIComponent_1.default));
exports.default = SignUiDaily;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNpZ25VaURhaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRTtBQUN0RSxtREFBOEM7QUFFOUMsaURBQTRDO0FBQzVDLGdEQUFrRTtBQUNsRSxrREFBd0Q7QUFDeEQsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUU5RCxpRUFBNEQ7QUFDNUQsd0NBQW1DO0FBRW5DLHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSx5REFBc0Y7QUFDdEYsMkNBQXNDO0FBQ3RDLDhDQUF5QztBQUN6Qyx3Q0FBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLCtDQUEwQztBQUVwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQTRWQztRQTFWRyxxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQiw4QkFBOEI7UUFFOUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFFOUIsNkJBQXVCLEdBQWEsSUFBSSxDQUFDO1FBRXpDLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUVqQyxXQUFLLEdBQVcsSUFBSSxDQUFDOztJQStVekIsQ0FBQztJQTdVRywwQkFBSSxHQUFKLFVBQUssSUFBYztRQUNmLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQUEsaUJBaUpDO1FBaEpHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENB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VyxDQTRWL0I7SUFBRCxrQkFBQztDQTVWRCxBQTRWQyxDQTVWd0MscUJBQVcsR0E0Vm5EO2tCQTVWb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNpZ25Jbk1hbmFnZXIsIFNpZ25JblR5cGUgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvU2lnbkluXCI7XHJcbmltcG9ydCB7IFNpZ25OdW1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1NpZ25OdW1cIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgUHJvcCBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFNpZ25JbkdldFRpcCBmcm9tIFwiLi9TaWduSW5HZXRUaXBcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVpRGFpbHkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICAvLyB0b2RheV9iZzpjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgLy8gdG9kYXlfbGlnaHQ6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2lnbl9pbl9pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgc2lnbl9pbl9jdW11bGF0aXZlX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHNpZ25faW5fdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0b2RheTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKSB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aXpeetvuWIsOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgdG9kYXlaZXJvID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub21vcm93WmVyb1RpbWVTdGFtcCkgLSAoNjAqNjAqMjQpO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodG9kYXlaZXJvICogMTAwMCk7XHJcbiAgICAgICAgbGV0IHRlbXBEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSArIDEsMCk7XHJcbiAgICAgICAgLy8g6I635Y+W5Yiw5b2T5pyI55qE5aSp5pWwXHJcbiAgICAgICAgbGV0IGRheXMgPSB0ZW1wRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IG1vbnRoVHlwZTpTaWduSW5UeXBlID0gZGF5cztcclxuICAgICAgICBsZXQgZGF0YSA9IFNpZ25Jbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhQnlTaWduSW5UeXBlKG1vbnRoVHlwZSk7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNpZ25faW5faXRlbSk7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuSXRlbSx2Lk51bSk7XHJcbiAgICAgICAgICAgIHJld2FyZC5uYW1lID0gJ3Jld2FyZCc7XHJcbiAgICAgICAgICAgIHJld2FyZC5zY2FsZSA9IDAuNzQ7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQocmV3YXJkKTtcclxuICAgICAgICAgICAgcmV3YXJkLnNldFBvc2l0aW9uKGNjLnYyKDAsLTE1KSk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGsrMSkrJycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIGJnLm5hbWUgPSAnYmcnO1xyXG4gICAgICAgICAgICBpZih2LkRheSA8IGRhdGUuZ2V0RGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluX0JnXzFfTWFza1wiKTtcclxuICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5EYXkgKyB2LkRheSwwKSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ291LnNldFBvc2l0aW9uKGNjLnYyKDAsLTcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih2LkRheSA9PSBkYXRlLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluRGF5ICsgdi5EYXksMCkgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNpZ25faW5fdWkuZ2V0U3ByaXRlRnJhbWUoXCJTaWduSW5fQmdfMV9NYXNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBnb3Uuc2V0UG9zaXRpb24oY2MudjIoMCwtNykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheS5wYXJlbnQgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9kYXkuekluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheS5zZXRQb3NpdGlvbihjYy52MigwLC0xNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG8oY2MudjIoaXRlbS54LGl0ZW0ueSksMC4yKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgb2Zmc2V0ID0gY29udGVudC55IC0gaXRlbS55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGUuZ2V0RGF0ZSgpPjEyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGUuZ2V0RGF0ZSgpPjI0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDAuMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihjb250ZW50KS50bygwLjIse3k6LWl0ZW0ueX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSwwLjIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sMCkgPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWNlaXZlQnRuXCIpLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1bXVsYXRpdmVDb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2hlY2tCb3hTY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGN1bXVsYXRpdmVEYXRhID0gU2lnbk51bU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YSgpO1xyXG4gICAgICAgIGN1bXVsYXRpdmVDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgY3VtdWxhdGl2ZURhdGEuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNpZ25faW5fY3VtdWxhdGl2ZV9pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJpdGVtXCIgKyBrO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiZGF5c1wiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+Jyx2LkRheU51bSArICcnKTtcclxuICAgICAgICAgICAgaWYodi5EYXlOdW0gPD0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSkpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGs+MCl7XHJcbiAgICAgICAgICAgICAgICBpZih2LkRheU51bSA+IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5OdW0pIFxyXG4gICAgICAgICAgICAgICAgJiYgY3VtdWxhdGl2ZURhdGFbay0xXS5EYXlOdW0gPD0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gXHJcbiAgICAgICAgICAgICAgICAgICAgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5OdW0pIC0gY3VtdWxhdGl2ZURhdGFbay0xXS5EYXlOdW0pLyh2LkRheU51bSAtIGN1bXVsYXRpdmVEYXRhW2stMV0uRGF5TnVtKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodi5EYXlOdW0gPiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluTnVtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluTnVtKS8odi5EYXlOdW0pKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodi5EYXlOdW0gPD0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSwwKSl7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluQ3VtdWxhdGl2ZURheSArIHYuRGF5TnVtLDApID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW3sumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYm94XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluX0NoZXNrXzFcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmnKrpooblj5ZcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYm94XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zaWduX2luX3VpLmdldFNwcml0ZUZyYW1lKFwiU2lnbkluX0NoZXNrXzBcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluQ3VtdWxhdGl2ZURheSArIHYuRGF5TnVtLDApID09IDEgXHJcbiAgICAgICAgICAgICAgICB8fCB2LkRheU51bSA+IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5OdW0pKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aXAgPSBjdW11bGF0aXZlQ29udGVudC5wYXJlbnQucGFyZW50LmdldENoaWxkQnlOYW1lKFwidGlwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IHRpcC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Sb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3Qud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBjYy52MihjdW11bGF0aXZlQ29udGVudC5nZXRQb3NpdGlvbigpLnggKyBpdGVtLnggKyA0MCwgY3VtdWxhdGl2ZUNvbnRlbnQuZ2V0UG9zaXRpb24oKS55ICsgaXRlbS55KzcwKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtUm9vdC5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuSXRlbSx2Lk51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkLnNjYWxlID0gMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5DdW11bGF0aXZlRGF5ICsgdi5EYXlOdW0sMCkgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3sumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3MgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzLm9wYWNpdHkgPSAxNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZC5hZGRDaGlsZChzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc09rID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc2lnbl9pbl91aS5nZXRTcHJpdGVGcmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZC5hZGRDaGlsZChpc09rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Muc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT2suc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZC5wYXJlbnQgPSBpdGVtUm9vdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluQ3VtdWxhdGl2ZURheSArIHYuRGF5TnVtLDApID09IDAgXHJcbiAgICAgICAgICAgICAgICAmJiB2LkRheU51bSA8PSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluTnVtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5JdGVtLHYuTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5JdGVtLHYuTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuYWRkU2lnbkdpZnQsdGhpcy5nZXRNb250aEpzb25TdHJpbmcodi5EYXlOdW0pKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5EYWlseVNpZ25JbkN1bXVsYXRpdmVEYXkgKyB2LkRheU51bSwxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGN1bXVsYXRpdmVDb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrQm94U2Nyb2xsXCIpLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZURheXNcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JyxUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkRhaWx5U2lnbkluTnVtLDApICsgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2lnbkluQnRuQ2xpY2soKXtcclxuICAgICAgICBsZXQgdG9kYXlaZXJvID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub21vcm93WmVyb1RpbWVTdGFtcCkgLSAoNjAqNjAqMjQpO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodG9kYXlaZXJvICogMTAwMCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IHJld2FyZDpQcm9wID0gbnVsbDtcclxuICAgICAgICBjb250ZW50LmNoaWxkcmVuLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYocmV3YXJkID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgaWYodi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmQgPSB2LmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpLmdldENvbXBvbmVudChQcm9wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxldCByZXdhcmRJdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmQucHJvcF9pZCxyZXdhcmQucHJvcF9udW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZXdhcmQucHJvcF9pZCxyZXdhcmQucHJvcF9udW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluLGZhbHNlLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW5fQnRuR2V0KTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbkdldCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25JbkdldFRpcCkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduSW5HZXRUaXApLmluaXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHJld2FyZF9pZDpyZXdhcmQucHJvcF9pZCxcclxuICAgICAgICAgICAgICAgIHJld2FyZF9udW06cmV3YXJkLnByb3BfbnVtXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH19KVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmRJdGVtKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5TaWduSW4sMSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5EYXkgKyBkYXRlLmdldERhdGUoKSwxKTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUubW9udGhTaWduLHRoaXMuZ2V0VXNlcklkSnNvblN0cmluZygpKTtcclxuICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSwwKTtcclxuICAgICAgICBudW0rKztcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSxudW0pO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTaWduSW4obm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICAvLyB0aGlzLnRvZGF5X2JnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMudG9kYXlfbGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpXHJcbiAgICAgICAgLy8gbGV0IHRvZGF5ID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XHJcbiAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImRhcmtcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyBub2RlLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QxXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuc2lnbkluRGF5cysrO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImN1bXVsYXRpdmVEYXlzXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKHRoaXMuc2lnbkluRGF5cyk7XHJcbiAgICAgICAgLy8gbGV0IHN0ciA9IFN0cmluZyh0aGlzLnNpZ25JbkRheXMpICsgXCIvXCI7XHJcbiAgICAgICAgLy8gbGV0IGluZGV4ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2lnblVpRGFpbHlDdW11bGF0aXZlXCIpO1xyXG4gICAgICAgIC8vIGlmKGluZGV4ID09IFwiXCIgfHwgaW5kZXggPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNpZ25VaURhaWx5Q3VtdWxhdGl2ZVwiLDEpO1xyXG4gICAgICAgIC8vICAgICBpbmRleCA9IDE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBpbmZvU2lnbk51bU1hbmFnZXIgPSBTaWduTnVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TaWduTnVtKDYwMCArIE51bWJlcihpbmRleCkpO1xyXG4gICAgICAgIC8vIHN0ciArPSBpbmZvU2lnbk51bU1hbmFnZXIuRGF5TnVtO1xyXG4gICAgICAgIC8vIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRheXNSYXRpb1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcclxuICAgICAgICAvLyBpZih0aGlzLnNpZ25JbkRheXMgPj0gTnVtYmVyKGluZm9TaWduTnVtTWFuYWdlci5EYXlOdW0pKXtcclxuICAgICAgICAvLyAgICAgLy8g54m55pWI5pi+56S6XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImN1bXVsYXRpdmVJdGVtXCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBsZXQgZ20gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGxldCBwcm9wID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikuZ2V0Q29tcG9uZW50KFByb3ApO1xyXG4gICAgICAgIC8vIC8vIGxldCBpbmZvID0gZ20uYm94X2pzb25fZGF0YS5nZXRSZXdhcmRCeWlkKHByb3AucHJvcF9pZCxwcm9wLnByb3BfbnVtKVxyXG4gICAgICAgIC8vIC8vIGxldCBpdGVtID0gZ20uYm94X2pzb25fZGF0YS5jcmVhdGVCb3hJdGVtKHByb3AucHJvcF9pZCxwcm9wLnByb3BfbnVtKTs7XHJcbiAgICAgICAgLy8gbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHByb3AucHJvcF9pZCxwcm9wLnByb3BfbnVtKTtcclxuICAgICAgICAvLyAvLyBpZihpbmZvICE9IG51bGwpe1xyXG4gICAgICAgIC8vIC8vICAgICBpdGVtID0gZ20uYm94X2pzb25fZGF0YS5jcmVhdGVCb3hJdGVtKGluZm8ucmV3YXJkX2lkLGluZm8ucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gLy8gfVxyXG4gICAgICAgIC8vIGdtLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgLy8gLy8g5L+d5a2Y562+5Yiw6K6w5b2VXHJcbiAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiU2lnblVpRGFpbHlfXCIgKyB0b2RheSxcIjFcIilcclxuICAgICAgICAvLyBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVJc1NpZ25Ub2RheSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBwbGVtZW50YXJ5U2lnbkluKG5vZGU6Y2MuTm9kZSl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobm9kZSlcclxuICAgICAgICAvLyBsZXQgc3VwcGxlbWVudGFyeURheSA9IE51bWJlcihub2RlLm5hbWUpO1xyXG4gICAgICAgIC8vIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVClcclxuICAgICAgICAvLyBsZXQgbGFiZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiZGF5XCIpXHJcbiAgICAgICAgLy8gLy8gbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEpvaW50U3RyaW5nKDEwMDAwMSxzdXBwbGVtZW50YXJ5RGF5KTtcclxuICAgICAgICAvLyBsYWJlbC5jb2xvciA9IG5ldyBjYy5Db2xvcig1MSwzMiw2Myk7XHJcbiAgICAgICAgLy8gbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuc2lnbkluRGF5cysrO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImN1bXVsYXRpdmVEYXlzXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKHRoaXMuc2lnbkluRGF5cyk7XHJcbiAgICAgICAgLy8gbGV0IHN0ciA9IFN0cmluZyh0aGlzLnNpZ25JbkRheXMpICsgXCIvXCI7XHJcbiAgICAgICAgLy8gbGV0IGluZGV4ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2lnblVpRGFpbHlDdW11bGF0aXZlXCIpO1xyXG4gICAgICAgIC8vIGlmKGluZGV4ID09IFwiXCIgfHwgaW5kZXggPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNpZ25VaURhaWx5Q3VtdWxhdGl2ZVwiLDEpO1xyXG4gICAgICAgIC8vICAgICBpbmRleCA9IDE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKDYwMCArIE51bWJlcihpbmRleCkpXHJcbiAgICAgICAgLy8gbGV0IGluZm9TaWduTnVtTWFuYWdlciA9IFNpZ25OdW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNpZ25OdW0oNjAwICsgTnVtYmVyKGluZGV4KSk7XHJcbiAgICAgICAgLy8gc3RyICs9IGluZm9TaWduTnVtTWFuYWdlci5EYXlOdW07XHJcbiAgICAgICAgLy8gLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGF5c1JhdGlvXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2lnbkluRGF5cyA+PSBOdW1iZXIoaW5mb1NpZ25OdW1NYW5hZ2VyLkRheU51bSkpe1xyXG4gICAgICAgIC8vICAgICAvLyDnibnmlYjmmL7npLpcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY3VtdWxhdGl2ZUl0ZW1cIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gbGV0IHByb3AgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5nZXRDb21wb25lbnQoUHJvcCk7XHJcbiAgICAgICAgLy8gLy8gbGV0IGluZm8gPSBnbS5ib3hfanNvbl9kYXRhLmdldFJld2FyZEJ5aWQocHJvcC5wcm9wX3R5cGUscHJvcC5wcm9wX251bSlcclxuICAgICAgICAvLyAvLyBsZXQgaXRlbSA9IGdtLmJveF9qc29uX2RhdGEuY3JlYXRlQm94SXRlbShwcm9wLnByb3BfaWQscHJvcC5wcm9wX251bSk7O1xyXG4gICAgICAgIC8vIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShwcm9wLnByb3BfaWQscHJvcC5wcm9wX251bSk7XHJcbiAgICAgICAgLy8gLy8gaWYoaW5mbyAhPSBudWxsKXtcclxuICAgICAgICAvLyAvLyAgICAgaXRlbSA9IGdtLmJveF9qc29uX2RhdGEuY3JlYXRlQm94SXRlbShpbmZvLnJld2FyZF9pZCxpbmZvLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vIC8vIH1lbHNle1xyXG4gICAgICAgIC8vIC8vIH1cclxuICAgICAgICAvLyBnbS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgIC8vIC8vIOS/neWtmOetvuWIsOiusOW9lVxyXG4gICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNpZ25VaURhaWx5X1wiICsgc3VwcGxlbWVudGFyeURheSxcIjFcIilcclxuICAgIH1cclxuXHJcbiAgICBjdW11bGF0aXZlUmV3YXJkKG5vZGU6Y2MuTm9kZSl7XHJcblxyXG4gICAgICAgIC8vIGxldCBzdHIgPSBTdHJpbmcodGhpcy5zaWduSW5EYXlzKSArIFwiL1wiO1xyXG4gICAgICAgIC8vIGxldCBpbmRleCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNpZ25VaURhaWx5Q3VtdWxhdGl2ZVwiKTtcclxuICAgICAgICAvLyBpZihpbmRleCA9PSBcIlwiIHx8IGluZGV4ID09IG51bGwpe1xyXG4gICAgICAgIC8vICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTaWduVWlEYWlseUN1bXVsYXRpdmVcIiwxKTtcclxuICAgICAgICAvLyAgICAgaW5kZXggPSAxO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IGluZm9SZXdhcmQgPSBTaWduTnVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TaWduTnVtKDYwMCArIE51bWJlcihpbmRleCkpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2lnbkluRGF5cyA+PSBOdW1iZXIoaW5mb1Jld2FyZC5EYXlOdW0pKXtcclxuICAgICAgICAvLyAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyAgICAgbGV0IHByb3AgPSBub2RlLmdldENvbXBvbmVudChQcm9wKTtcclxuICAgICAgICAvLyAgICAgLy8gbGV0IGluZm8gPSBnbS5ib3hfanNvbl9kYXRhLmdldFJld2FyZEJ5aWQocHJvcC5wcm9wX3R5cGUscHJvcC5wcm9wX251bSlcclxuICAgICAgICAvLyAgICAgLy8gbGV0IGl0ZW0gPSBnbS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocHJvcC5wcm9wX2lkLHByb3AucHJvcF9udW0pO1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocHJvcC5wcm9wX2lkLHByb3AucHJvcF9udW0pO1xyXG4gICAgICAgIC8vICAgICAvLyBpZihpbmZvICE9IG51bGwpe1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgaXRlbSA9IGdtLmJveF9qc29uX2RhdGEuY3JlYXRlQm94SXRlbShpbmZvLnJld2FyZF9pZCxpbmZvLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgLy8gfVxyXG4gICAgICAgIC8vICAgICBpbmRleCsrO1xyXG4gICAgICAgIC8vICAgICBpZihTaWduTnVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TaWduTnVtKDYwMCArIE51bWJlcihpbmRleCkpKXtcclxuICAgICAgICAvLyAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNpZ25VaURhaWx5Q3VtdWxhdGl2ZVwiLGluZGV4KTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBuZXdJdGVtID0gU2lnbk51bU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU2lnbk51bSg2MDAgKyBOdW1iZXIoaW5kZXgpKTtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuc2lnbkluRGF5cyA8IG5ld0l0ZW0uRGF5TnVtKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjdW11bGF0aXZlSXRlbVwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0MlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIHByb3AuaW5pdChuZXdJdGVtLkl0ZW0sbmV3SXRlbS5OdW0sUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAvLyAgICAgICAgIHN0ciArPSBuZXdJdGVtLkRheU51bTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRheXNSYXRpb1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcclxuICAgICAgICAvLyAgICAgICAgIGdtLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1RpcEJnKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2hlY2tCb3hTY3JvbGxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFVzZXJJZEpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNb250aEpzb25TdHJpbmcodHlwZTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IHQgPSB0eXBlO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIHR5cGU6dCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19