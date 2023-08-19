"use strict";
cc._RF.push(module, 'fedf20GX+NOgaBR4JROyu4Q', 'VipSystem');
// Scripts/VipSystem/VipSystem.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var HttpManager_1 = require(".././NetWork/HttpManager");
var BattlePassData_1 = require("../BattlePass/BattlePassData");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipSystem = /** @class */ (function (_super) {
    __extends(VipSystem, _super);
    function VipSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null; //父节点
        _this.Vipitme = null; //vip节点
        _this.Vip = []; //vip节点
        _this.vipnum = 15;
        _this.VIPPrivileges = null; //vip特权弹窗    如果没有购买vip 或vip到期   
        // @property(cc.Node)
        // itme:cc.Node=null//每天领取的500钻石道具父节点
        _this.btnLan = null; //购买按钮    领取按钮   已领取
        _this.VIP_Bar_2_1 = null; //进度条
        _this.jdt = null; //进度条   数/总数
        _this.Gemnum = 360;
        return _this;
        // update (dt) {}
    }
    VipSystem.prototype.initUi = function () {
        var _this = this;
        // if(this.itme.childrenCount==0){
        //     let itme=PropManager.getInstance().createPropItem(PropId.Gem,this.Gemnum);
        //     itme.scale=0.85
        //     itme.parent=this.itme
        // }
        this.vipnum = BattlePassData_1.BattlePassDataManager.getMaxBattlePassLevel();
        var _loop_1 = function (itmeindex) {
            var Vipitme = cc.instantiate(this_1.Vipitme);
            var id = itmeindex + 1;
            var itme0 = PropManager_1.PropManager.getInstance().createPropItem(BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardNum(id));
            itme0.scale = 0.83;
            itme0.parent = Vipitme.getChildByName("itme0");
            var itme1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardGem(id));
            itme1.scale = 0.83;
            itme1.parent = Vipitme.getChildByName("itme1");
            var itme2 = PropManager_1.PropManager.getInstance().createPropItem(BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardNum(id));
            itme2.scale = 0.83;
            itme2.parent = Vipitme.getChildByName("itme2");
            // let VIP_Bar_down_0=Vipitme.getChildByName("VIP_Bar_down_0")
            // let VIP_Bar_up_0=Vipitme.getChildByName("VIP_Bar_up_0")
            // let VIP_Bar_up_1=Vipitme.getChildByName("VIP_Bar_up_1")//上面亮
            // let VIP_Bar_down_1=Vipitme.getChildByName("VIP_Bar_down_1")//下面亮
            var mf = Vipitme.getChildByName("mf"); //免费的领取遮罩
            var gj = Vipitme.getChildByName("gj"); //高级的领取遮罩
            var num = Vipitme.getChildByName("num"); //数字
            num.getComponent(cc.Label).string = "" + id;
            // if(itmeindex==0){//第一个奖励直接获得  将上面的进度条不要
            //     VIP_Bar_up_0.active=false
            //     VIP_Bar_up_1.active=false
            // }
            // if(itmeindex==this.vipnum-1){//最后一个奖励  将下面的进度条不要
            //     VIP_Bar_down_0.active=false
            //     VIP_Bar_down_1.active=false
            // }
            mf.on(cc.Node.EventType.TOUCH_END, function () {
                _this.Receivemf(itme0, id);
            }, this_1);
            gj.on(cc.Node.EventType.TOUCH_END, function () {
                _this.Receivegj(id);
            }, this_1);
            Vipitme.parent = this_1.content;
            this_1.Vip.push(Vipitme);
        };
        var this_1 = this;
        for (var itmeindex = this.Vip.length; itmeindex < this.vipnum; itmeindex++) {
            _loop_1(itmeindex);
        }
        this.Refresh();
    };
    VipSystem.prototype.Receivemf = function (itme, id) {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令免费奖励领取_x级 + id);
        PropManager_1.PropManager.getInstance().changePropNum(BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardNum(id));
        GameManager_1.default.getInstance().showGetTip(itme);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipFreeRewardStatus + id, 1);
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, this.getSaveGameTaskJsonString(id, 1));
        this.Refresh();
    };
    VipSystem.prototype.Receivegj = function (id) {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令高级奖励领取_x级 + id);
        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardGem(id));
        PropManager_1.PropManager.getInstance().changePropNum(BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardNum(id));
        var itme1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardGem(id));
        var itme2 = PropManager_1.PropManager.getInstance().createPropItem(BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardNum(id));
        GameManager_1.default.getInstance().showMultipleGetTip([itme1, itme2]);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipAdvancedRewardStatus + id, 1);
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, this.getSaveGameTaskJsonString(id, 2));
        this.Refresh();
    };
    VipSystem.prototype.Refresh = function () {
        var zonshu = 0;
        var AllActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.AllActivityNum, 0); //总活跃度
        var VipIdentity = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipIdentity, 0); //是否开通了vip   0:没开通 锁显示   1：开通了 所有锁隐藏    
        var winText = this.btnLan.getChildByName("winText");
        if (VipIdentity == 0) {
            this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            winText.getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            winText.getComponent(TextLanguage_1.default).setTextId(1450002);
        }
        else if (VipIdentity == 1) {
            winText.getComponent(TextLanguage_1.default).setTextId(1450012); //一键领取
            // let VipDailyCollectionStatus=TheStorageManager.getInstance().getNumber(StorageKey.VipDailyCollectionStatus,0) //0:未领取   1：已领取   每日刷新
            // winText.getComponent(TextLanguage).setTextId(100011)//领取
            // if(VipDailyCollectionStatus==0){
            //     this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            //     winText.getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            // }else if(VipDailyCollectionStatus==1){
            //     this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            //     winText.getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            // }
        }
        for (var itmeindex = 0; itmeindex < this.vipnum; itmeindex++) {
            var id = itmeindex + 1;
            var VIP_Bar_down_0 = this.Vip[itmeindex].getChildByName("VIP_Bar_down_0");
            var VIP_Bar_up_0 = this.Vip[itmeindex].getChildByName("VIP_Bar_up_0");
            var VIP_Bar_up_1 = this.Vip[itmeindex].getChildByName("VIP_Bar_up_1"); //上面亮
            var VIP_Bar_down_1 = this.Vip[itmeindex].getChildByName("VIP_Bar_down_1"); //下面亮
            var VIP_Bar_1_1 = this.Vip[itmeindex].getChildByName("VIP_Bar_1_1"); //中间亮
            var VIP_Lock1 = this.Vip[itmeindex].getChildByName("VIP_Lock1"); //锁
            var VIP_Lock2 = this.Vip[itmeindex].getChildByName("VIP_Lock2"); //锁
            var End_Tick1 = this.Vip[itmeindex].getChildByName("End_Tick_1"); //勾
            var End_Tick2 = this.Vip[itmeindex].getChildByName("End_Tick_2"); //勾
            var End_Tick3 = this.Vip[itmeindex].getChildByName("End_Tick_3"); //勾
            var hei = this.Vip[itmeindex].getChildByName("hei"); //黑色遮罩
            var mf = this.Vip[itmeindex].getChildByName("mf"); //免费的领取遮罩
            var gj = this.Vip[itmeindex].getChildByName("gj"); //高级的领取遮罩
            var mftoday = this.Vip[itmeindex].getChildByName("mftoday"); //免费的领取遮罩特效
            var gjtoday = this.Vip[itmeindex].getChildByName("gjtoday"); //高级的领取遮罩特效
            var num = this.Vip[itmeindex].getChildByName("num"); //数字
            var VipFreeRewardStatus = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipFreeRewardStatus + id, 0); //vip免费奖励状态    0未领取,1已领取     0-14
            var VipAdvancedRewardStatus = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipAdvancedRewardStatus + id, 0); //vip高级奖励状态    0未领取,1已领取     0-14
            hei.active = false;
            VIP_Bar_1_1.active = false;
            VIP_Lock1.active = false;
            VIP_Lock2.active = false;
            End_Tick1.active = false;
            End_Tick2.active = false;
            End_Tick3.active = false;
            mf.active = false;
            gj.active = false;
            mftoday.active = false;
            gjtoday.active = false;
            VIP_Bar_up_1.active = false;
            VIP_Bar_down_1.active = false;
            if (VipIdentity == 0) {
                VIP_Lock1.active = true;
                VIP_Lock2.active = true;
            }
            var RequiredEx = BattlePassData_1.BattlePassDataManager.getInstance().getRequiredExp(id); //所需活跃度
            if (RequiredEx <= AllActivityNum) {
                if (FollowManager_1.default.getInstance().getFirstDo(FollowConstants_1.Follow_Type.战令解锁等级_x级 + id) <= 0) {
                    FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.战令解锁等级_x级 + id);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令解锁等级_x级 + id);
                }
                if (itmeindex > 0) {
                    this.Vip[itmeindex - 1].getChildByName("VIP_Bar_down_1").active = true; //下面亮
                }
                VIP_Bar_up_1.active = true;
                VIP_Bar_1_1.active = true;
                mf.active = true;
                mftoday.active = true;
                num.getComponent(cc.LabelOutline).enabled = true;
                if (VipIdentity == 1) {
                    gj.active = true;
                    gjtoday.active = true;
                }
            }
            else {
                if (zonshu == 0) {
                    zonshu = RequiredEx;
                }
                num.getComponent(cc.LabelOutline).enabled = false;
                hei.active = true;
            }
            if (VipFreeRewardStatus == 1) {
                mf.active = false;
                mftoday.active = false;
                End_Tick1.active = true;
            }
            if (VipAdvancedRewardStatus == 1) {
                gj.active = false;
                gjtoday.active = false;
                End_Tick2.active = true;
                End_Tick3.active = true;
            }
            if (itmeindex == 0) { //第一个奖励直接获得  将上面的进度条不要
                VIP_Bar_up_0.active = false;
                VIP_Bar_up_1.active = false;
            }
            PropConfig_1.PropId.Gem;
            if (itmeindex == this.vipnum - 1) { //最后一个奖励  将下面的进度条不要
                VIP_Bar_down_0.active = false;
                VIP_Bar_down_1.active = false;
            }
            this.Vip[itmeindex].active = true;
        }
        if (AllActivityNum >= zonshu) {
            this.jdt.getComponent(cc.Label).string = "MAX";
            this.VIP_Bar_2_1.getComponent(cc.Sprite).fillRange = 1;
        }
        else {
            this.jdt.getComponent(cc.Label).string = AllActivityNum + "/" + zonshu;
            var fillRange = AllActivityNum / zonshu;
            this.VIP_Bar_2_1.getComponent(cc.Sprite).fillRange = fillRange;
        }
    };
    VipSystem.prototype.onbtnLan = function () {
        // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113));
        // return;
        var VipIdentity = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipIdentity, 0); //是否开通了vip   0:没开通 开通弹窗  1：开通了 领取按钮
        if (VipIdentity == 0) {
            this.VIPPrivileges.active = true;
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.解锁高级战令的按钮点击次数);
        }
        else if (VipIdentity == 1) {
            // console.log("++++一键领取")
            var arr = [];
            for (var itmeindex = 0; itmeindex < this.vipnum; itmeindex++) {
                var id = itmeindex + 1;
                var mf = this.Vip[itmeindex].getChildByName("mf"); //免费的领取遮罩
                var gj = this.Vip[itmeindex].getChildByName("gj"); //高级的领取遮罩
                if (mf.active == true) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令免费奖励领取_x级 + id);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipFreeRewardStatus + id, 1);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, this.getSaveGameTaskJsonString(id, 1));
                    var itme1 = PropManager_1.PropManager.getInstance().createPropItem(BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardNum(id));
                    PropManager_1.PropManager.getInstance().changePropNum(BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getFreeRewardNum(id));
                    arr.push(itme1);
                }
                if (gj.active == true) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令高级奖励领取_x级 + id);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipAdvancedRewardStatus + id, 1);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, this.getSaveGameTaskJsonString(id, 2));
                    var itme1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                    var itme2 = PropManager_1.PropManager.getInstance().createPropItem(BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                    PropManager_1.PropManager.getInstance().changePropNum(BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardItem(id), BattlePassData_1.BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                    arr.push(itme1);
                    arr.push(itme2);
                }
                // Receivemf(itme,id){
                //     PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
                //     GameManager.getInstance().showGetTip(itme);
                //     TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+id,1)
                //     this.Refresh()
                // }
                // Receivegj(id){
                //     PropManager.getInstance().changePropNum(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                //     PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                //     let itme1=PropManager.getInstance().createPropItem(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                //     let itme2=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                //     GameManager.getInstance().showMultipleGetTip([itme1,itme2]);
                //     TheStorageManager.getInstance().setItem(StorageKey.VipAdvancedRewardStatus+id,1)
                //     this.Refresh()
                // }
            }
            if (arr.length > 0) {
                GameManager_1.default.getInstance().showMultipleGetTip(arr);
                this.Refresh();
            }
            else {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1450013), 3); //已经领取过了
            }
            // let VipDailyCollectionStatus=TheStorageManager.getInstance().getNumber(StorageKey.VipDailyCollectionStatus,0) //0:未领取   1：已领取   每日刷新
            // if(VipDailyCollectionStatus==0){
            //     //领取360钻石
            //     PropManager.getInstance().changePropNum(PropId.Gem,this.Gemnum);
            //     GameManager.getInstance().showGetTip(this.itme.children[0]);
            //     TheStorageManager.getInstance().setItem(StorageKey.VipDailyCollectionStatus,1)
            //     this.Refresh()
            // }else if(VipDailyCollectionStatus==1){
            //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1450011),3);
            // }
        }
    };
    VipSystem.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Vip);
    };
    // start () {
    // }
    /**
     *
     * @param index 标记id
     * @param type 1普通，2高级
     * @returns
     */
    VipSystem.prototype.getSaveGameTaskJsonString = function (index, type) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = index;
        return JSON.stringify({
            uid: uid,
            playLevel: num,
            rewardType: type,
        });
    };
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "Vipitme", void 0);
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "VIPPrivileges", void 0);
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "btnLan", void 0);
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "VIP_Bar_2_1", void 0);
    __decorate([
        property(cc.Node)
    ], VipSystem.prototype, "jdt", void 0);
    VipSystem = __decorate([
        ccclass
    ], VipSystem);
    return VipSystem;
}(UIComponent_1.default));
exports.default = VipSystem;

cc._RF.pop();