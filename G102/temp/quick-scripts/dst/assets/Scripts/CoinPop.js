
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29pblBvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixxREFBZ0U7QUFDaEUsaUZBQXVGO0FBQ3ZGLCtDQUEwQztBQUMxQyx5Q0FBNkQ7QUFDN0QsNkNBQXdDO0FBRXhDLG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBQzlELDZEQUF3RDtBQUN4RCxtREFBa0Q7QUFDbEQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUNqRCx5REFBZ0U7QUFDaEUseURBQXFEO0FBQ3JELDJEQUE2RDtBQUM3RCw2REFBeUY7QUFDekYsZ0RBQTJDO0FBQzNDLDBDQUE2QztBQUU3Qyw0Q0FBMkM7QUFDM0MsdUNBQWtDO0FBQ2xDLGdEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBVztJQUFoRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBMk9DO1FBdE9HLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLFVBQUksR0FBUyxJQUFJLENBQUE7UUFFakIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixlQUFlO1FBQ2YsVUFBSSxHQUFRLG1CQUFNLENBQUMsSUFBSSxDQUFBLENBQUEsTUFBTTtRQUU3QixTQUFHLEdBQVEsS0FBSyxDQUFBLENBQUEsT0FBTzs7UUF3TnZCLGlCQUFpQjtJQUNyQixDQUFDO0lBeE5HLHdCQUFNLEdBQU4sVUFBTyxJQUFJO1FBQVgsaUJBd0hDO1FBdkhHLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMs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QVMsQ0FBQztZQUNsQixJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxHQUFHO1lBQ1AsS0FBSyxFQUFDLEdBQUc7U0FDWixDQUFDLENBQUM7SUFDUCxDQUFDO0lBOU5EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0Q7SUFFakI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDTTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNNO0lBZGQsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTJPM0I7SUFBRCxjQUFDO0NBM09ELEFBMk9DLENBM09vQyxxQkFBVyxHQTJPL0M7a0JBM09vQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyIH0gZnJvbSBcIi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR29fVHlwZSwgVklERU9fVFlQRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaWFtb25kc1JlY2hhcmdlTWFuYWdlciwgSnNvbkRpYW1vbmRzUmVjaGFyZ2UgfSBmcm9tIFwiLi9TdG9yZS9EaWFtb25kc1JlY2hhcmdlXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2luUG9wIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpdG1lOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGdlbV9pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBzdG9yZV91aTpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHR5cGU6UHJvcElkPVByb3BJZC5Db2luLy/pu5jorqTph5HluIFcclxuXHJcbiAgICBudW06bnVtYmVyPTIwMDAwLy8xMDAwMFxyXG4gICAgaW5pdFVpKHR5cGUpIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6LWE5rqQ5LiN6Laz5by556qX5by55Ye65qyh5pWwKTtcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fVEpQKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6ZOB5Yyg6ZO65omT5byA5qyh5pWwKTtcclxuICAgICAgICAvL+mHkeW4gSAxMDAwMFxyXG4gICAgICAgIGlmKHRoaXMuaXRtZS5jaGlsZHJlbkNvdW50PjApe1xyXG4gICAgICAgICAgICB0aGlzLml0bWUuY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpdGVtc1xyXG4gICAgICAgIGlmKHRoaXMudHlwZT09UHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLDIwMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5udW09MjAwMDBcclxuICAgICAgICAgICAgaXRlbXMucGFyZW50PXRoaXMuaXRtZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdlbVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnR5cGU9PVByb3BJZC5HZW0pe1xyXG4gICAgICAgICAgICAvLyBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sMjAwKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5udW09MjAwXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lKVxyXG4gICAgICAgICAgICBsZXQgZ2VtRGF0YSA9IERpYW1vbmRzUmVjaGFyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGdlbVJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1cIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgICAgICBpZihnZW1Sb290LmNoaWxkcmVuQ291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBnZW1EYXRhLmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5nZW1faXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gJ2dlbScgKyB2LlJlY2hhcmdlSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDAuODI7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg0MDAwMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmcgPSB2LkRpYW1vbmRzTnVtICsgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF5SW5mbyA9IFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKHYuUHJvZHVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGF5SW5mby5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnN0b3JlX3VpLmdldFNwcml0ZUZyYW1lKFwiU2hvcF9JY29uX0dlbV9cIiArICh2LlJlY2hhcmdlSUQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJycpID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDEwMDA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLHYuR2V0RGlhbW9uZHNOdW0gKyAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3RpcCcpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gaXRlbS5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kdXJhdGlvbiA9IDAuMTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uem9vbVNjYWxlID0gMC45O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xpY2tFdmVudD1uZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQudGFyZ2V0PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LmNvbXBvbmVudD0nQ29pblBvcCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5oYW5kbGVyPSdvbkdlbUJ0bkNsaWNrJztcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LmN1c3RvbUV2ZW50RGF0YSA9IHYuUmVjaGFyZ2VJRCArICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlc3VsdDooaXNEeSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYoaXNEeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS546ZK755+z54K55Ye76LSt5Lmw5qyh5pWwICsgdi5Qcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhTdG9yYWdlS2V5LlN0b3JlR2VtSXRlbSArIHYuUmVjaGFyZ2VJRCwnJykgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtICsgdi5HZXREaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtICsgdi5HZXREaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LHYuUHJvZHVjdElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdlbVJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBnZW1EYXRhLmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZ2VtUm9vdC5nZXRDaGlsZEJ5TmFtZSgnZ2VtJyArIHYuUmVjaGFyZ2VJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg0MDAwMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmcgPSB2LkRpYW1vbmRzTnVtICsgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF5SW5mbyA9IFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKHYuUHJvZHVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGF5SW5mby5wcmljZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnN0b3JlX3VpLmdldFNwcml0ZUZyYW1lKFwiU2hvcF9JY29uX0dlbV9cIiArICh2LlJlY2hhcmdlSUQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJycpID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDEwMDA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLHYuR2V0RGlhbW9uZHNOdW0gKyAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3RpcCcpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlc3VsdDooaXNEeSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYoaXNEeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS546ZK755+z54K55Ye76LSt5Lmw5qyh5pWwICsgdi5Qcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhTdG9yYWdlS2V5LlN0b3JlR2VtSXRlbSArIHYuUmVjaGFyZ2VJRCwnJykgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtICsgdi5HZXREaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtICsgdi5HZXREaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZUdlbUl0ZW0gKyB2LlJlY2hhcmdlSUQsJzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx2LkRpYW1vbmRzTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LHYuUHJvZHVjdElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29pblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ2VtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0ICgpIHtcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIGNsaWNrQnRuQWQoKXtcclxuICAgICAgICAvL2NvaW4gMTAwMDAgICB6aHVhbnNoaToxMDBcclxuXHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Db2luUG9wQWQsMCkgPiA0KXtcclxuICAgICAgICAgICAgLy8g5rKh5qyh5pWw5o+Q56S6MTAwMTIwXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTIwKSwzKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHZpZGVvVHlwZT1WSURFT19UWVBFLkNvaW47XHJcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZT09UHJvcElkLkdlbSl7XHJcbiAgICAgICAgICAgICAgICB2aWRlb1R5cGU9VklERU9fVFlQRS5HZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoKGlzVHJ1ZSk9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzVHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueCueWHu+i1hOa6kOS4jei2s+aXtuW5v+WRiuiOt+W+l+aMiemSruasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnInmrKHmlbAgLOWPr+S7peeci+W5v+WRilxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNvaW5Qb3BBZCwwKTtcclxuICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Db2luUG9wQWQsbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy50eXBlLHRoaXMubnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnR5cGUsdGhpcy5udW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSx2aWRlb1R5cGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5TaG93KCl7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL3N0b3JlX3VpL3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eVxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7votYTmupDkuI3otrPml7bliY3lvoDnmoTmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpXHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VBbGxVaURpYWxvZyhVSUxheWVyTGV2ZWwuT25lKTtcclxuICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLml0bWUuY2hpbGRyZW5Db3VudD4wKXtcclxuICAgICAgICAgICAgdGhpcy5pdG1lLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2VtQnRuQ2xpY2soZSxpZDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ2VtXCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcImdlbVwiICsgaWQpO1xyXG4gICAgICAgIGxldCB2Okpzb25EaWFtb25kc1JlY2hhcmdlID0gRGlhbW9uZHNSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGlhbW9uZHNSZWNoYXJnZShOdW1iZXIoaWQpKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7XHJcbiAgICAgICAgICAgIHJlc3VsdDooaXNEeSk9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihpc0R5KXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUueOmSu+efs+eCueWHu+i0reS5sOasoeaVsCArIHYuUHJvZHVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhTdG9yYWdlS2V5LlN0b3JlR2VtSXRlbSArIHYuUmVjaGFyZ2VJRCwnJykgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0gKyB2LkdldERpYW1vbmRzTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSArIHYuR2V0RGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLnBheUdlbSArPSB2LkRpYW1vbmRzTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5zZXRDdW11bGF0aXZlUmVjaGFyZ2VKc29uU3RyaW5nKHYuRGlhbW9uZHNOdW0pKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJJbmZvLmdldEluc3RhbmNlKCkucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlR2VtSXRlbSArIHYuUmVjaGFyZ2VJRCwnMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCd0aXAnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKHJld2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0sdi5EaWFtb25kc051bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLHYuRGlhbW9uZHNOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLnBheUdlbSArPSB2LkRpYW1vbmRzTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5zZXRDdW11bGF0aXZlUmVjaGFyZ2VKc29uU3RyaW5nKHYuRGlhbW9uZHNOdW0pKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJJbmZvLmdldEluc3RhbmNlKCkucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sdi5Qcm9kdWN0SWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDdW11bGF0aXZlUmVjaGFyZ2VKc29uU3RyaW5nKGFkZE51bTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IG51bT1hZGROdW07XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdHlwZTo4LFxyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICB2YWx1ZTpudW0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=