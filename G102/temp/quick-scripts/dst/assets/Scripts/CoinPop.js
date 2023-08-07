
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/CoinPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
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
        _super.prototype.init.call(this, uiAc);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29pblBvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixxREFBZ0U7QUFDaEUsaUZBQXVGO0FBQ3ZGLCtDQUEwQztBQUMxQyx5Q0FBNkQ7QUFDN0QsNkNBQXdDO0FBRXhDLG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBQzlELDZEQUF3RDtBQUN4RCxtREFBa0Q7QUFDbEQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUNqRCx5REFBZ0U7QUFDaEUseURBQXFEO0FBQ3JELDJEQUE2RDtBQUM3RCw2REFBeUY7QUFDekYsZ0RBQTJDO0FBQzNDLDBDQUE2QztBQUU3Qyw0Q0FBMkM7QUFDM0MsdUNBQWtDO0FBQ2xDLGdEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBVztJQUFoRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBOE9DO1FBek9HLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLFVBQUksR0FBUyxJQUFJLENBQUE7UUFFakIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixlQUFlO1FBQ2YsVUFBSSxHQUFRLG1CQUFNLENBQUMsSUFBSSxDQUFBLENBQUEsTUFBTTtRQUU3QixTQUFHLEdBQVEsS0FBSyxDQUFBLENBQUEsT0FBTzs7UUEyTnZCLGlCQUFpQjtJQUNyQixDQUFDO0lBM05HLHdCQUFNLEdBQU4sVUFBTyxJQUFJO1FBQVgsaUJBMkhDO1FBMUhHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMs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REFBK0IsR0FBdkMsVUFBd0MsTUFBYTtRQUNqRCxJQUFJLEdBQUcsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLElBQUksR0FBRyxHQUFDLE1BQU0sQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxHQUFHO1lBQ1AsS0FBSyxFQUFDLEdBQUc7U0FDWixDQUFDLENBQUM7SUFDUCxDQUFDO0lBak9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0Q7SUFFakI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDTTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNNO0lBZGQsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQThPM0I7SUFBRCxjQUFDO0NBOU9ELEFBOE9DLENBOU9vQyxxQkFBVyxHQThPL0M7a0JBOU9vQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyIH0gZnJvbSBcIi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR29fVHlwZSwgVklERU9fVFlQRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaWFtb25kc1JlY2hhcmdlTWFuYWdlciwgSnNvbkRpYW1vbmRzUmVjaGFyZ2UgfSBmcm9tIFwiLi9TdG9yZS9EaWFtb25kc1JlY2hhcmdlXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2luUG9wIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpdG1lOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGdlbV9pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBzdG9yZV91aTpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHR5cGU6UHJvcElkPVByb3BJZC5Db2luLy/pu5jorqTph5HluIFcclxuXHJcbiAgICBudW06bnVtYmVyPTIwMDAwLy8xMDAwMFxyXG4gICAgaW5pdFVpKHR5cGUpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA0MSkpO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6LWE5rqQ5LiN6Laz5by556qX5by55Ye65qyh5pWwKTtcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fVEpQKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6ZOB5Yyg6ZO65omT5byA5qyh5pWwKTtcclxuICAgICAgICAvL+mHkeW4gSAxMDAwMFxyXG4gICAgICAgIGlmKHRoaXMuaXRtZS5jaGlsZHJlbkNvdW50PjApe1xyXG4gICAgICAgICAgICB0aGlzLml0bWUuY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpdGVtc1xyXG4gICAgICAgIGlmKHRoaXMudHlwZT09UHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLDIwMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5udW09MjAwMDA7XHJcbiAgICAgICAgICAgIGl0ZW1zLnBhcmVudD10aGlzLml0bWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29pblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy50eXBlPT1Qcm9wSWQuR2VtKXtcclxuICAgICAgICAgICAgLy8gaXRlbXM9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLDIwMCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubnVtPTIwMFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSlcclxuICAgICAgICAgICAgbGV0IGdlbURhdGEgPSBEaWFtb25kc1JlY2hhcmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGxldCBnZW1Sb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ2VtXCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICAgICAgaWYoZ2VtUm9vdC5jaGlsZHJlbkNvdW50ID09IDApe1xyXG4gICAgICAgICAgICAgICAgZ2VtRGF0YS5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ2VtX2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9ICdnZW0nICsgdi5SZWNoYXJnZUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwLjgyO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoNDAwMDAyKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc3RyaW5nID0gdi5EaWFtb25kc051bSArIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBheUluZm8gPSBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbyh2LlByb2R1Y3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBheUluZm8ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zdG9yZV91aS5nZXRTcHJpdGVGcmFtZShcIlNob3BfSWNvbl9HZW1fXCIgKyAodi5SZWNoYXJnZUlEIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKFN0b3JhZ2VLZXkuU3RvcmVHZW1JdGVtICsgdi5SZWNoYXJnZUlELCcnKSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgndGlwJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQxMDAwNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+Jyx2LkdldERpYW1vbmRzTnVtICsgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGl0ZW0uYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRyYW5zaXRpb24gPSBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uZHVyYXRpb24gPSAwLjE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnpvb21TY2FsZSA9IDAuOTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsaWNrRXZlbnQ9bmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnRhcmdldD10aGlzLm5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5jb21wb25lbnQ9J0NvaW5Qb3AnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuaGFuZGxlcj0nb25HZW1CdG5DbGljayc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5jdXN0b21FdmVudERhdGEgPSB2LlJlY2hhcmdlSUQgKyAnJztcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXN1bHQ6KGlzRHkpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmKGlzRHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUueOmSu+efs+eCueWHu+i0reS5sOasoeaVsCArIHYuUHJvZHVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJycpID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSArIHYuR2V0RGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSArIHYuR2V0RGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuU3RvcmVHZW1JdGVtICsgdi5SZWNoYXJnZUlELCcxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgndGlwJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSx2LlByb2R1Y3RJZClcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZW1Sb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZ2VtRGF0YS5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGdlbVJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2dlbScgKyB2LlJlY2hhcmdlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoNDAwMDAyKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc3RyaW5nID0gdi5EaWFtb25kc051bSArIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBheUluZm8gPSBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbyh2LlByb2R1Y3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBheUluZm8ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zdG9yZV91aS5nZXRTcHJpdGVGcmFtZShcIlNob3BfSWNvbl9HZW1fXCIgKyAodi5SZWNoYXJnZUlEIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKFN0b3JhZ2VLZXkuU3RvcmVHZW1JdGVtICsgdi5SZWNoYXJnZUlELCcnKSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgndGlwJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQxMDAwNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+Jyx2LkdldERpYW1vbmRzTnVtICsgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaXRlbS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXN1bHQ6KGlzRHkpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmKGlzRHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUueOmSu+efs+eCueWHu+i0reS5sOasoeaVsCArIHYuUHJvZHVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJycpID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSArIHYuR2V0RGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSArIHYuR2V0RGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuU3RvcmVHZW1JdGVtICsgdi5SZWNoYXJnZUlELCcxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgndGlwJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSx2LlByb2R1Y3RJZClcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvaW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdlbVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICBjbGlja0J0bkFkKCl7XHJcbiAgICAgICAgLy9jb2luIDEwMDAwICAgemh1YW5zaGk6MTAwXHJcblxyXG4gICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ29pblBvcEFkLDApID4gNCl7XHJcbiAgICAgICAgICAgIC8vIOayoeasoeaVsOaPkOekujEwMDEyMFxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEyMCksMyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCB2aWRlb1R5cGU9VklERU9fVFlQRS5Db2luO1xyXG4gICAgICAgICAgICBpZih0aGlzLnR5cGU9PVByb3BJZC5HZW0pe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9UeXBlPVZJREVPX1RZUEUuR2VtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKChpc1RydWUpPT57XHJcbiAgICAgICAgICAgICAgICBpZihpc1RydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7votYTmupDkuI3otrPml7blub/lkYrojrflvpfmjInpkq7mrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pyJ5qyh5pWwICzlj6/ku6XnnIvlub/lkYpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Db2luUG9wQWQsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ29pblBvcEFkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMudHlwZSx0aGlzLm51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy50eXBlLHRoaXMubnVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksdmlkZW9UeXBlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuU2hvdygpe1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMilcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHlcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye76LWE5rqQ5LiN6Laz5pe25YmN5b6A55qE5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pdG1lLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXRtZS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkdlbUJ0bkNsaWNrKGUsaWQ6c3RyaW5nKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdlbVwiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1cIiArIGlkKTtcclxuICAgICAgICBsZXQgdjpKc29uRGlhbW9uZHNSZWNoYXJnZSA9IERpYW1vbmRzUmVjaGFyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRpYW1vbmRzUmVjaGFyZ2UoTnVtYmVyKGlkKSk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXkoe1xyXG4gICAgICAgICAgICByZXN1bHQ6KGlzRHkpPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNEeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnjpkrvnn7Pngrnlh7votK3kubDmrKHmlbAgKyB2LlByb2R1Y3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJycpID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtICsgdi5HZXREaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0gKyB2LkdldERpYW1vbmRzTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5wYXlHZW0gKz0gdi5EaWFtb25kc051bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuc2V0Q3VtdWxhdGl2ZVJlY2hhcmdlSnNvblN0cmluZyh2LkRpYW1vbmRzTnVtKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgndGlwJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5wYXlHZW0gKz0gdi5EaWFtb25kc051bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuc2V0Q3VtdWxhdGl2ZVJlY2hhcmdlSnNvblN0cmluZyh2LkRpYW1vbmRzTnVtKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHYuUHJvZHVjdElkKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q3VtdWxhdGl2ZVJlY2hhcmdlSnNvblN0cmluZyhhZGROdW06bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCBudW09YWRkTnVtO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6OCxcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6bnVtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19