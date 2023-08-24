"use strict";
cc._RF.push(module, '1d62b3gumlP9b0ZcwtkhXmM', 'CoinPop');
// Scripts/CoinPop.ts

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
var HttpManager_1 = require("./NetWork/HttpManager");
var CumulativeRecharges_1 = require("./AccumulatedRecharge/CumulativeRecharges");
var ApkManager_1 = require("./Ads/ApkManager");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var FollowConstants_1 = require("./multiLanguage/FollowConstants");
var FollowManager_1 = require("./multiLanguage/FollowManager");
var LanguageManager_1 = require("./multiLanguage/LanguageManager");
var TextLanguage_1 = require("./multiLanguage/TextLanguage");
var PayManager_1 = require("./Payment/PayManager");
var PropConfig_1 = require("./Prop/PropConfig");
var PropManager_1 = require("./Prop/PropManager");
var AudioConstants_1 = require("./Sound/AudioConstants");
var StorageConfig_1 = require("./Storage/StorageConfig");
var StorageManager_1 = require("./Storage/StorageManager");
var DiamondsRecharge_1 = require("./Store/DiamondsRecharge");
var UIComponent_1 = require("./UI/UIComponent");
var UIConfig_1 = require("./UI/UIConfig");
var UIManager_1 = require("./UI/UIManager");
var UserData_1 = require("./UserData");
var UserInfo_1 = require("./UserInfo/UserInfo");
var Turmtable_1 = require("./Turntable/Turmtable");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinPop = /** @class */ (function (_super) {
    __extends(CoinPop, _super);
    function CoinPop() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.itme = null;
        _this.gem_item = null;
        _this.store_ui = null;
        // onLoad () {}
        _this.type = PropConfig_1.PropId.Coin; //默认金币
        _this.num = 20000; //10000
        return _this;
        // update (dt) {}
    }
    CoinPop.prototype.initUi = function (type) {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(Turmtable_1.default).initUi();
            }, }); //转盘
        this.onClose();
        return;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.资源不足弹窗弹出次数);
        this.type = type;
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        //金币 10000
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        var items;
        if (this.type == PropConfig_1.PropId.Coin) {
            items = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, 20000);
            this.num = 20000;
            items.parent = this.itme;
            this.node.getChildByName("coin").active = true;
            this.node.getChildByName("gem").active = false;
        }
        else if (this.type == PropConfig_1.PropId.Gem) {
            // items=PropManager.getInstance().createPropItem(PropId.Gem,200);
            // this.num=200
            // console.log(GameManager.getInstance().game_to_home)
            var gemData = DiamondsRecharge_1.DiamondsRechargeManager.getInstance().getJsonData();
            var gemRoot_1 = this.node.getChildByName("gem").getChildByName("content");
            if (gemRoot_1.childrenCount == 0) {
                gemData.forEach(function (v, k) {
                    var item = cc.instantiate(_this.gem_item);
                    item.name = 'gem' + v.RechargeID;
                    item.scale = 0.82;
                    item.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(400002);
                    item.getChildByName("title").getComponent(TextLanguage_1.default).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage_1.default).string;
                    var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(v.ProductId);
                    item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
                    item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
                    if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                        item.getChildByName('bg').active = true;
                        item.getChildByName('tip').active = true;
                        item.getChildByName("tip").getComponent(TextLanguage_1.default).setTextId(1410004);
                        item.getChildByName("tip").getComponent(TextLanguage_1.default).setReplaceValue('~', v.GetDiamondsNum + '');
                    }
                    else {
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                    }
                    var button = item.addComponent(cc.Button);
                    button.transition = cc.Button.Transition.SCALE;
                    button.duration = 0.1;
                    button.zoomScale = 0.9;
                    var clickEvent = new cc.Component.EventHandler();
                    clickEvent.target = _this.node;
                    clickEvent.component = 'CoinPop';
                    clickEvent.handler = 'onGemBtnClick';
                    clickEvent.customEventData = v.RechargeID + '';
                    button.clickEvents.push(clickEvent);
                    // item.on(cc.Node.EventType.TOUCH_END,()=>{
                    //     ApkManager.getInstance().showPay({
                    //         result:(isDy)=> {
                    //             if(isDy){
                    //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
                    //                     item.getChildByName('bg').active = false;
                    //                     item.getChildByName('tip').active = false;
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }else{
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }
                    //             }
                    //         }
                    //     },v.ProductId)
                    // });
                    gemRoot_1.addChild(item);
                });
            }
            else {
                gemData.forEach(function (v, k) {
                    var item = gemRoot_1.getChildByName('gem' + v.RechargeID);
                    item.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(400002);
                    item.getChildByName("title").getComponent(TextLanguage_1.default).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage_1.default).string;
                    var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(v.ProductId);
                    item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
                    item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
                    if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                        item.getChildByName('bg').active = true;
                        item.getChildByName('tip').active = true;
                        item.getChildByName("tip").getComponent(TextLanguage_1.default).setTextId(1410004);
                        item.getChildByName("tip").getComponent(TextLanguage_1.default).setReplaceValue('~', v.GetDiamondsNum + '');
                    }
                    else {
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                    }
                    // item.off(cc.Node.EventType.TOUCH_END);
                    // item.on(cc.Node.EventType.TOUCH_END,()=>{
                    //     ApkManager.getInstance().showPay({
                    //         result:(isDy)=> {
                    //             if(isDy){
                    //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
                    //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
                    //                     item.getChildByName('bg').active = false;
                    //                     item.getChildByName('tip').active = false;
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }else{
                    //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
                    //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
                    //                     GameManager.getInstance().showGetTip(reward);
                    //                 }
                    //             }
                    //         }
                    //     },v.ProductId)
                    // });
                });
            }
            this.node.getChildByName("coin").active = false;
            this.node.getChildByName("gem").active = true;
        }
    };
    CoinPop.prototype.init = function (uiAc) {
        //super.init(uiAc);
    };
    // start () {
    // }
    CoinPop.prototype.clickBtnAd = function () {
        //coin 10000   zhuanshi:100
        var _this = this;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CoinPopAd, 0) > 4) {
            // 没次数提示100120
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100120), 3);
        }
        else {
            var videoType = Constants_1.VIDEO_TYPE.Coin;
            if (this.type == PropConfig_1.PropId.Gem) {
                videoType = Constants_1.VIDEO_TYPE.Gem;
            }
            ApkManager_1.default.getInstance().showVideo((function (isTrue) {
                if (isTrue) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击资源不足时广告获得按钮次数);
                    //有次数 ,可以看广告
                    var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CoinPopAd, 0);
                    num++;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CoinPopAd, num);
                    PropManager_1.PropManager.getInstance().changePropNum(_this.type, _this.num);
                    GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(_this.type, _this.num));
                    _this.clickBtnClose();
                }
            }), videoType);
        }
    };
    CoinPop.prototype.clickBtnShow = function () {
        cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击资源不足时前往的按钮点击次数);
        GameManager_1.default.getInstance().jumoAndShowUi();
        UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
        this.clickBtnClose();
    };
    CoinPop.prototype.clickBtnClose = function () {
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    CoinPop.prototype.onGemBtnClick = function (e, id) {
        var _this = this;
        var item = this.node.getChildByName("gem").getChildByName("content").getChildByName("gem" + id);
        var v = DiamondsRecharge_1.DiamondsRechargeManager.getInstance().getJsonDiamondsRecharge(Number(id));
        ApkManager_1.default.getInstance().showPay({
            result: function (isDy) {
                if (isDy) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x钻石点击购买次数 + v.ProductId);
                    if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        UserInfo_1.UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, _this.setCumulativeRechargeJsonString(v.DiamondsNum)).then(function (data) {
                            UserInfo_1.UserInfo.getInstance().refreshData();
                            CumulativeRecharges_1.CumulativeRechargesManager.getInstance().refreshData();
                        });
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '1');
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                        GameManager_1.default.getInstance().showGetTip(reward);
                    }
                    else {
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.DiamondsNum);
                        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, v.DiamondsNum);
                        UserInfo_1.UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, _this.setCumulativeRechargeJsonString(v.DiamondsNum)).then(function (data) {
                            UserInfo_1.UserInfo.getInstance().refreshData();
                            CumulativeRecharges_1.CumulativeRechargesManager.getInstance().refreshData();
                        });
                        GameManager_1.default.getInstance().showGetTip(reward);
                    }
                }
            }
        }, v.ProductId);
    };
    CoinPop.prototype.setCumulativeRechargeJsonString = function (addNum) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = addNum;
        return JSON.stringify({
            type: 8,
            uid: uid,
            value: num,
        });
    };
    __decorate([
        property(cc.Node)
    ], CoinPop.prototype, "itme", void 0);
    __decorate([
        property(cc.Prefab)
    ], CoinPop.prototype, "gem_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], CoinPop.prototype, "store_ui", void 0);
    CoinPop = __decorate([
        ccclass
    ], CoinPop);
    return CoinPop;
}(UIComponent_1.default));
exports.default = CoinPop;

cc._RF.pop();