"use strict";
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
        this.node.getChildByName("checkBoxScroll").getChildByName("cumulativeDays").getComponent(TextLanguage_1.default).setReplaceValue('~', StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.DailySignInNum) + '');
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