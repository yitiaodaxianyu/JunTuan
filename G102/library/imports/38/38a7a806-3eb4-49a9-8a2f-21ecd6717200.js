"use strict";
cc._RF.push(module, '38a7agGPrRJqYovIezWcXIA', 'VIPPrivileges');
// Scripts/VipSystem/VIPPrivileges.ts

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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var PayManager_1 = require("../Payment/PayManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var VipSystem_1 = require("./VipSystem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VIPPrivileges = /** @class */ (function (_super) {
    __extends(VIPPrivileges, _super);
    function VIPPrivileges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itme = []; //每天领取的500钻石道具父节点
        _this.id = "c401"; //c401  c501
        _this.Gemnum = 360;
        // propid=[PropId.Gem,10002,40004,101004]
        // num=[this.Gemnum,500,10,20]
        _this.propid = [10002, 40004, 101004];
        _this.num = [500, 10, 20];
        _this.lanText = null; //价格
        _this.maxAadNum = 10;
        return _this;
        // update (dt) {}
    }
    VIPPrivileges.prototype.start = function () {
        for (var index = 0; index < this.itme.length; index++) {
            var itme = PropManager_1.PropManager.getInstance().createPropItem(this.propid[index], this.num[index]);
            itme.scale = 0.85;
            itme.parent = this.itme[index];
        }
    };
    VIPPrivileges.prototype.onEnable = function () {
        var adNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VIPADNum, 0); //观看广告次数
        this.lanText.getComponent(cc.Label).string = "已观看" + adNum + "次广告，还差" + (this.maxAadNum - adNum) + "次可解锁";
        cc.director.on(WXManagerEX_1.WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
    };
    VIPPrivileges.prototype.clickBtnbtnLan = function () {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-5d0148773715f613'
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.offError();
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.onError(function (err) {
                console.log(err);
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.offClose();
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                });
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
            });
        }
        else {
            this.onShipinComp();
        }
        // ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
        //     if(isPay){
        //         FollowManager.getInstance().followEvent(Follow_Type.战令购买高级战令成功人数);
        //         let itme=[]
        //         for (let index = 0; index < this.itme.length; index++) {
        //             PropManager.getInstance().changePropNum(this.propid[index],this.num[index]);
        //             let itmes=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
        //             itme.push(itmes)
        //         }
        //         GameManager.getInstance().showMultipleGetTip(itme);
        //         TheStorageManager.getInstance().setItem(StorageKey.VipIdentity,1)
        //         PayManager.getInstance().addPayNum(this.id);
        //         this.node.parent.getComponent(VipSystem).Refresh()
        //         this.clickBtnClose()
        //     }
        // }},this.id) 
    };
    VIPPrivileges.prototype.onShipinComp = function () {
        var adNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VIPADNum, 0) + 1; //观看广告次数
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VIPADNum, adNum);
        if (adNum == 10) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令购买高级战令成功人数);
            var itme = [];
            for (var index = 0; index < this.itme.length; index++) {
                PropManager_1.PropManager.getInstance().changePropNum(this.propid[index], this.num[index]);
                var itmes = PropManager_1.PropManager.getInstance().createPropItem(this.propid[index], this.num[index]);
                itme.push(itmes);
            }
            GameManager_1.default.getInstance().showMultipleGetTip(itme);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipIdentity, 1);
            PayManager_1.PayManager.getInstance().addPayNum(this.id);
            this.node.parent.getComponent(VipSystem_1.default).Refresh();
            this.clickBtnClose();
        }
        else {
            this.lanText.getComponent(cc.Label).string = "已观看" + adNum + "次广告，还差" + (this.maxAadNum - adNum) + "次可解锁";
        }
    };
    VIPPrivileges.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        cc.director.off(WXManagerEX_1.WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], VIPPrivileges.prototype, "itme", void 0);
    __decorate([
        property(cc.Node)
    ], VIPPrivileges.prototype, "lanText", void 0);
    VIPPrivileges = __decorate([
        ccclass
    ], VIPPrivileges);
    return VIPPrivileges;
}(cc.Component));
exports.default = VIPPrivileges;

cc._RF.pop();