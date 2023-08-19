
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/VipSystem/VipSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVmlwU3lzdGVtXFxWaXBTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsd0RBQW1FO0FBQ25FLCtEQUFxRTtBQUNyRSw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsOERBQXlEO0FBQ3pELGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsc0RBQW1GO0FBQ25GLGlEQUE0QztBQUM1Qyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUFnVEM7UUE3U0csYUFBTyxHQUFTLElBQUksQ0FBQSxDQUFBLEtBQUs7UUFFekIsYUFBTyxHQUFTLElBQUksQ0FBQSxDQUFBLE9BQU87UUFDM0IsU0FBRyxHQUFXLEVBQUUsQ0FBQSxDQUFBLE9BQU87UUFDdkIsWUFBTSxHQUFRLEVBQUUsQ0FBQTtRQUVoQixtQkFBYSxHQUFTLElBQUksQ0FBQSxDQUFBLGdDQUFnQztRQUMxRCxxQkFBcUI7UUFDckIscUNBQXFDO1FBRXJDLFlBQU0sR0FBUyxJQUFJLENBQUEsQ0FBQSxvQkFBb0I7UUFFdkMsaUJBQVcsR0FBUyxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBRTdCLFNBQUcsR0FBUyxJQUFJLENBQUEsQ0FBQSxZQUFZO1FBRTVCLFlBQU0sR0FBUSxHQUFHLENBQUE7O1FBNFJqQixpQkFBaUI7SUFDckIsQ0FBQztJQTVSRywwQkFBTSxHQUFOO1FBQUEsaUJBZ0RDO1FBL0NHLGtDQUFrQztRQUNsQyxpRkFBaUY7UUFDakYsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QixJQUFJO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBQyxzQ0FBcUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO2dDQUNoRCxTQUFTO1lBQ2QsSUFBSSxPQUFPLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFLLE9BQU8sQ0FBQyxDQUFBO1lBRXhDLElBQUksRUFBRSxHQUFDLFNBQVMsR0FBQyxDQUFDLENBQUE7WUFDbEIsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2SyxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtZQUNoQixLQUFLLENBQUMsTUFBTSxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUMsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzSCxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtZQUNoQixLQUFLLENBQUMsTUFBTSxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUMsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzSyxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtZQUNoQixLQUFLLENBQUMsTUFBTSxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUMsOERBQThEO1lBQzlELDBEQUEwRDtZQUMxRCwrREFBK0Q7WUFDL0QsbUVBQW1FO1lBRW5FLElBQUksRUFBRSxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxTQUFTO1lBQzVDLElBQUksRUFBRSxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxTQUFTO1lBQzVDLElBQUksR0FBRyxHQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxJQUFJO1lBQ3pDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO1lBQ3ZDLDBDQUEwQztZQUMxQyxnQ0FBZ0M7WUFDaEMsZ0NBQWdDO1lBQ2hDLElBQUk7WUFDSixtREFBbUQ7WUFDbkQsa0NBQWtDO1lBQ2xDLGtDQUFrQztZQUNsQyxJQUFJO1lBQ0osRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUM7Z0JBQzlCLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzVCLENBQUMsU0FBTSxDQUFDO1lBQ1IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUM7Z0JBQzlCLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdEIsQ0FBQyxTQUFNLENBQUM7WUFFUixPQUFPLENBQUMsTUFBTSxHQUFDLE9BQUssT0FBTyxDQUFBO1lBQzNCLE9BQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTs7O1FBdEMxQixLQUFLLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTtvQkFBakUsU0FBUztTQXVDakI7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUNELDZCQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUMsRUFBRTtRQUNiLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsV0FBVyxHQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUoscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0Msa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsbUJBQW1CLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVFLHlCQUFXLENBQUMsSUFBSSxDQUFDLHdCQUFVLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUNELDZCQUFTLEdBQVQsVUFBVSxFQUFFO1FBQ1IsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoSCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hLLElBQUksS0FBSyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsSUFBSSxFQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0gsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzSyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUQsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hGLHlCQUFXLENBQUMsSUFBSSxDQUFDLHdCQUFVLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUNELDJCQUFPLEdBQVA7UUFDSSxJQUFJLE1BQU0sR0FBQyxDQUFDLENBQUE7UUFDWixJQUFJLGNBQWMsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQ2xHLElBQUksV0FBVyxHQUFDLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFHLHdDQUF3QztRQUM5SCxJQUFJLE9BQU8sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqRCxJQUFHLFdBQVcsSUFBRSxDQUFDLEVBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEcsT0FBTyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0YsT0FBTyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hEO2FBQUssSUFBRyxXQUFXLElBQUUsQ0FBQyxFQUFDO1lBQ3BCLE9BQU8sQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFBLE1BQU07WUFDM0QsdUlBQXVJO1lBQ3ZJLDJEQUEyRDtZQUMzRCxtQ0FBbUM7WUFDbkMsdUdBQXVHO1lBQ3ZHLHNHQUFzRztZQUN0Ryx5Q0FBeUM7WUFDekMsNEdBQTRHO1lBQzVHLDJHQUEyRztZQUMzRyxJQUFJO1NBQ1A7UUFDRCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUMxRCxJQUFJLEVBQUUsR0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFBO1lBQ2xCLElBQUksY0FBYyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDdkUsSUFBSSxZQUFZLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDbkUsSUFBSSxZQUFZLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBQSxLQUFLO1lBQ3hFLElBQUksY0FBYyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQSxLQUFLO1lBQzVFLElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUEsS0FBSztZQUN0RSxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFBLEdBQUc7WUFDaEUsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQSxHQUFHO1lBQ2hFLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUEsR0FBRztZQUNqRSxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFBLEdBQUc7WUFDakUsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQSxHQUFHO1lBQ2pFLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUEsTUFBTTtZQUN2RCxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLFNBQVM7WUFDeEQsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxTQUFTO1lBQ3hELElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUEsV0FBVztZQUNwRSxJQUFJLE9BQU8sR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFBLFdBQVc7WUFDcEUsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxJQUFJO1lBQ3JELElBQUksbUJBQW1CLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsbUJBQW1CLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsaUNBQWlDO1lBQzFJLElBQUksdUJBQXVCLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsaUNBQWlDO1lBQ2xKLEdBQUcsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ2hCLFdBQVcsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3hCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLEVBQUUsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ2YsRUFBRSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7WUFFZixPQUFPLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUNwQixPQUFPLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUVwQixZQUFZLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUN6QixjQUFjLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUMzQixJQUFHLFdBQVcsSUFBRSxDQUFDLEVBQUM7Z0JBQ2QsU0FBUyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7Z0JBQ3JCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2FBQ3hCO1lBRUQsSUFBSSxVQUFVLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUEsT0FBTztZQUU1RSxJQUFHLFVBQVUsSUFBRSxjQUFjLEVBQUM7Z0JBQzFCLElBQUcsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsNkJBQVcsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFDO29CQUNuRSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDakUsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JFO2dCQUNELElBQUcsU0FBUyxHQUFDLENBQUMsRUFBQztvQkFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBLENBQUEsS0FBSztpQkFDMUU7Z0JBQ0QsWUFBWSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7Z0JBQ3hCLFdBQVcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2dCQUN2QixFQUFFLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtnQkFDZCxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtnQkFDbkIsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQTtnQkFDOUMsSUFBRyxXQUFXLElBQUUsQ0FBQyxFQUFDO29CQUNkLEVBQUUsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO29CQUNkLE9BQU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2lCQUN0QjthQUNKO2lCQUFJO2dCQUNELElBQUcsTUFBTSxJQUFFLENBQUMsRUFBQztvQkFDVCxNQUFNLEdBQUMsVUFBVSxDQUFBO2lCQUNwQjtnQkFDRCxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFBO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTthQUNsQjtZQUNELElBQUcsbUJBQW1CLElBQUUsQ0FBQyxFQUFDO2dCQUN0QixFQUFFLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtnQkFDZixPQUFPLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtnQkFDcEIsU0FBUyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7YUFDeEI7WUFDRCxJQUFHLHVCQUF1QixJQUFFLENBQUMsRUFBQztnQkFDMUIsRUFBRSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7Z0JBQ2YsT0FBTyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7Z0JBQ3BCLFNBQVMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2dCQUNyQixTQUFTLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTthQUN4QjtZQUNELElBQUcsU0FBUyxJQUFFLENBQUMsRUFBQyxFQUFDLHNCQUFzQjtnQkFDbkMsWUFBWSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7Z0JBQ3pCLFlBQVksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO2FBQzVCO1lBQUEsbUJBQU0sQ0FBQyxHQUFHLENBQUE7WUFDWCxJQUFHLFNBQVMsSUFBRSxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxFQUFDLG1CQUFtQjtnQkFDNUMsY0FBYyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7Z0JBQzNCLGNBQWMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO2FBQzlCO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1NBQ2xDO1FBQ0QsSUFBRyxjQUFjLElBQUUsTUFBTSxFQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFBO1NBQ3ZEO2FBQUk7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLGNBQWMsR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFBO1lBQ2hFLElBQUksU0FBUyxHQUFDLGNBQWMsR0FBQyxNQUFNLENBQUE7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUE7U0FDL0Q7SUFDTCxDQUFDO0lBQ0QsNEJBQVEsR0FBUjtRQUNJLCtGQUErRjtRQUMvRixVQUFVO1FBQ1YsSUFBSSxXQUFXLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUcsbUNBQW1DO1FBQ3pILElBQUcsV0FBVyxJQUFFLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtZQUM5Qix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3RFO2FBQUssSUFBRyxXQUFXLElBQUUsQ0FBQyxFQUFDO1lBQ3BCLDBCQUEwQjtZQUMxQixJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUE7WUFDVixLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxFQUFFLEdBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQTtnQkFDbEIsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxTQUFTO2dCQUN4RCxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLFNBQVM7Z0JBQ3hELElBQUcsRUFBRSxDQUFDLE1BQU0sSUFBRSxJQUFJLEVBQUM7b0JBQ2YsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BFLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLG1CQUFtQixHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQTtvQkFDNUUseUJBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQVUsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2Syx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM1SixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNsQjtnQkFDRCxJQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUUsSUFBSSxFQUFDO29CQUNmLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsV0FBVyxHQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwRSxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2hGLHlCQUFXLENBQUMsSUFBSSxDQUFDLHdCQUFVLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0gsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0sseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDaEgseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDaEssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNsQjtnQkFHRCxzQkFBc0I7Z0JBQ3RCLG1LQUFtSztnQkFDbkssa0RBQWtEO2dCQUNsRCxtRkFBbUY7Z0JBQ25GLHFCQUFxQjtnQkFDckIsSUFBSTtnQkFDSixpQkFBaUI7Z0JBQ2pCLHVIQUF1SDtnQkFDdkgsdUtBQXVLO2dCQUN2SyxrSUFBa0k7Z0JBQ2xJLGtMQUFrTDtnQkFDbEwsbUVBQW1FO2dCQUNuRSx1RkFBdUY7Z0JBQ3ZGLHFCQUFxQjtnQkFDckIsSUFBSTthQUNQO1lBRUQsSUFBRyxHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQztnQkFDWixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDakI7aUJBQUk7Z0JBQ0QscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxRQUFRO2FBQzFHO1lBR0QsdUlBQXVJO1lBQ3ZJLG1DQUFtQztZQUNuQyxnQkFBZ0I7WUFDaEIsdUVBQXVFO1lBQ3ZFLG1FQUFtRTtZQUNuRSxxRkFBcUY7WUFDckYscUJBQXFCO1lBQ3JCLHlDQUF5QztZQUN6QyxzR0FBc0c7WUFDdEcsSUFBSTtTQUNQO0lBQ0wsQ0FBQztJQUNELGlDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZiwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQywyQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxhQUFhO0lBRWIsSUFBSTtJQUVKOzs7OztPQUtHO0lBQ0ssNkNBQXlCLEdBQWpDLFVBQWtDLEtBQVksRUFBQyxJQUFXO1FBQ3RELElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxHQUFHLEdBQUMsS0FBSyxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1lBQ1AsU0FBUyxFQUFDLEdBQUc7WUFDYixVQUFVLEVBQUMsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBMVNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0U7SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDRTtJQUlwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNRO0lBSTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ0M7SUFFbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNGO0lBakJDLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FnVDdCO0lBQUQsZ0JBQUM7Q0FoVEQsQUFnVEMsQ0FoVHNDLHFCQUFXLEdBZ1RqRDtrQkFoVG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCYXR0bGVQYXNzRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXBTeXN0ZW0gZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OmNjLk5vZGU9bnVsbC8v54i26IqC54K5XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFZpcGl0bWU6Y2MuTm9kZT1udWxsLy92aXDoioLngrlcclxuICAgIFZpcDpjYy5Ob2RlW109W10vL3ZpcOiKgueCuVxyXG4gICAgdmlwbnVtOm51bWJlcj0xNVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBWSVBQcml2aWxlZ2VzOmNjLk5vZGU9bnVsbC8vdmlw54m55p2D5by556qXICAgIOWmguaenOayoeaciei0reS5sHZpcCDmiJZ2aXDliLDmnJ8gICBcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgLy8gaXRtZTpjYy5Ob2RlPW51bGwvL+avj+WkqemihuWPlueahDUwMOmSu+efs+mBk+WFt+eItuiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5MYW46Y2MuTm9kZT1udWxsLy/otK3kubDmjInpkq4gICAg6aKG5Y+W5oyJ6ZKuICAg5bey6aKG5Y+WXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFZJUF9CYXJfMl8xOmNjLk5vZGU9bnVsbC8v6L+b5bqm5p2hXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGpkdDpjYy5Ob2RlPW51bGwvL+i/m+W6puadoSAgIOaVsC/mgLvmlbBcclxuXHJcbiAgICBHZW1udW06bnVtYmVyPTM2MFxyXG4gICAgaW5pdFVpKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaXRtZS5jaGlsZHJlbkNvdW50PT0wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGl0bWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHRoaXMuR2VtbnVtKTtcclxuICAgICAgICAvLyAgICAgaXRtZS5zY2FsZT0wLjg1XHJcbiAgICAgICAgLy8gICAgIGl0bWUucGFyZW50PXRoaXMuaXRtZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnZpcG51bT1CYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0TWF4QmF0dGxlUGFzc0xldmVsKClcclxuICAgICAgICBmb3IgKGxldCBpdG1laW5kZXggPSB0aGlzLlZpcC5sZW5ndGg7IGl0bWVpbmRleCA8IHRoaXMudmlwbnVtOyBpdG1laW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgVmlwaXRtZT1jYy5pbnN0YW50aWF0ZSh0aGlzLlZpcGl0bWUpXHJcblxyXG4gICAgICAgICAgICBsZXQgaWQ9aXRtZWluZGV4KzFcclxuICAgICAgICAgICAgbGV0IGl0bWUwPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnJlZVJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmROdW0oaWQpKTtcclxuICAgICAgICAgICAgaXRtZTAuc2NhbGU9MC44M1xyXG4gICAgICAgICAgICBpdG1lMC5wYXJlbnQ9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIml0bWUwXCIpXHJcbiAgICAgICAgICAgIGxldCBpdG1lMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgICAgICBpdG1lMS5zY2FsZT0wLjgzXHJcbiAgICAgICAgICAgIGl0bWUxLnBhcmVudD1WaXBpdG1lLmdldENoaWxkQnlOYW1lKFwiaXRtZTFcIilcclxuICAgICAgICAgICAgbGV0IGl0bWUyPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgIGl0bWUyLnNjYWxlPTAuODNcclxuICAgICAgICAgICAgaXRtZTIucGFyZW50PVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lMlwiKVxyXG4gICAgICAgICAgICAvLyBsZXQgVklQX0Jhcl9kb3duXzA9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfZG93bl8wXCIpXHJcbiAgICAgICAgICAgIC8vIGxldCBWSVBfQmFyX3VwXzA9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfdXBfMFwiKVxyXG4gICAgICAgICAgICAvLyBsZXQgVklQX0Jhcl91cF8xPVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyX3VwXzFcIikvL+S4iumdouS6rlxyXG4gICAgICAgICAgICAvLyBsZXQgVklQX0Jhcl9kb3duXzE9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfZG93bl8xXCIpLy/kuIvpnaLkuq5cclxuXHJcbiAgICAgICAgICAgIGxldCBtZj1WaXBpdG1lLmdldENoaWxkQnlOYW1lKFwibWZcIikvL+WFjei0ueeahOmihuWPlumBrue9qVxyXG4gICAgICAgICAgICBsZXQgZ2o9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcImdqXCIpLy/pq5jnuqfnmoTpooblj5bpga7nvalcclxuICAgICAgICAgICAgbGV0IG51bT1WaXBpdG1lLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLy/mlbDlrZdcclxuICAgICAgICAgICAgbnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIraWRcclxuICAgICAgICAgICAgLy8gaWYoaXRtZWluZGV4PT0wKXsvL+esrOS4gOS4quWlluWKseebtOaOpeiOt+W+lyAg5bCG5LiK6Z2i55qE6L+b5bqm5p2h5LiN6KaBXHJcbiAgICAgICAgICAgIC8vICAgICBWSVBfQmFyX3VwXzAuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIC8vICAgICBWSVBfQmFyX3VwXzEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYoaXRtZWluZGV4PT10aGlzLnZpcG51bS0xKXsvL+acgOWQjuS4gOS4quWlluWKsSAg5bCG5LiL6Z2i55qE6L+b5bqm5p2h5LiN6KaBXHJcbiAgICAgICAgICAgIC8vICAgICBWSVBfQmFyX2Rvd25fMC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgLy8gICAgIFZJUF9CYXJfZG93bl8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIG1mLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlbWYoaXRtZTAsaWQpXHJcbiAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIGdqLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlZ2ooaWQpXHJcbiAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBWaXBpdG1lLnBhcmVudD10aGlzLmNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5WaXAucHVzaChWaXBpdG1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgfVxyXG4gICAgUmVjZWl2ZW1mKGl0bWUsaWQpe1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TlhY3otLnlpZblirHpooblj5ZfeOe6pytpZCk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0bWUpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEZyZWVSZXdhcmRTdGF0dXMraWQsMSlcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuc2F2ZUdhbWVUYXNrLHRoaXMuZ2V0U2F2ZUdhbWVUYXNrSnNvblN0cmluZyhpZCwxKSk7XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoKClcclxuICAgIH1cclxuICAgIFJlY2VpdmVnaihpZCl7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOmrmOe6p+WlluWKsemihuWPll9457qnK2lkKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkR2VtKGlkKSk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgIGxldCBpdG1lMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgIGxldCBpdG1lMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKFtpdG1lMSxpdG1lMl0pO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK2lkLDEpXHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayx0aGlzLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcoaWQsMikpO1xyXG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoKCl7XHJcbiAgICAgICAgbGV0IHpvbnNodT0wXHJcbiAgICAgICAgbGV0IEFsbEFjdGl2aXR5TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5BbGxBY3Rpdml0eU51bSwwKTsvL+aAu+a0u+i3g+W6plxyXG4gICAgICAgIGxldCBWaXBJZGVudGl0eT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcElkZW50aXR5LDApICAgLy/mmK/lkKblvIDpgJrkuoZ2aXAgICAwOuayoeW8gOmAmiDplIHmmL7npLogICAx77ya5byA6YCa5LqGIOaJgOaciemUgemakOiXjyAgICBcclxuICAgICAgICBsZXQgd2luVGV4dD10aGlzLmJ0bkxhbi5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIilcclxuICAgICAgICBpZihWaXBJZGVudGl0eT09MCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTGFuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHdpblRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgd2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQ1MDAwMilcclxuICAgICAgICB9ZWxzZSBpZihWaXBJZGVudGl0eT09MSl7XHJcbiAgICAgICAgICAgIHdpblRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE0NTAwMTIpLy/kuIDplK7pooblj5ZcclxuICAgICAgICAgICAgLy8gbGV0IFZpcERhaWx5Q29sbGVjdGlvblN0YXR1cz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcERhaWx5Q29sbGVjdGlvblN0YXR1cywwKSAvLzA65pyq6aKG5Y+WICAgMe+8muW3sumihuWPliAgIOavj+aXpeWIt+aWsFxyXG4gICAgICAgICAgICAvLyB3aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMTEpLy/pooblj5ZcclxuICAgICAgICAgICAgLy8gaWYoVmlwRGFpbHlDb2xsZWN0aW9uU3RhdHVzPT0wKXtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYnRuTGFuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIC8vICAgICB3aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNlIGlmKFZpcERhaWx5Q29sbGVjdGlvblN0YXR1cz09MSl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bkxhbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIC8vICAgICB3aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpdG1laW5kZXggPSAwOyBpdG1laW5kZXggPCB0aGlzLnZpcG51bTsgaXRtZWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGlkPWl0bWVpbmRleCsxXHJcbiAgICAgICAgICAgIGxldCBWSVBfQmFyX2Rvd25fMD10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiVklQX0Jhcl9kb3duXzBcIilcclxuICAgICAgICAgICAgbGV0IFZJUF9CYXJfdXBfMD10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiVklQX0Jhcl91cF8wXCIpXHJcbiAgICAgICAgICAgIGxldCBWSVBfQmFyX3VwXzE9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfdXBfMVwiKS8v5LiK6Z2i5LquXHJcbiAgICAgICAgICAgIGxldCBWSVBfQmFyX2Rvd25fMT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiVklQX0Jhcl9kb3duXzFcIikvL+S4i+mdouS6rlxyXG4gICAgICAgICAgICBsZXQgVklQX0Jhcl8xXzE9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfMV8xXCIpLy/kuK3pl7Tkuq5cclxuICAgICAgICAgICAgbGV0IFZJUF9Mb2NrMT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiVklQX0xvY2sxXCIpLy/plIFcclxuICAgICAgICAgICAgbGV0IFZJUF9Mb2NrMj10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiVklQX0xvY2syXCIpLy/plIFcclxuICAgICAgICAgICAgbGV0IEVuZF9UaWNrMT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiRW5kX1RpY2tfMVwiKS8v5Yu+XHJcbiAgICAgICAgICAgIGxldCBFbmRfVGljazI9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkVuZF9UaWNrXzJcIikvL+WLvlxyXG4gICAgICAgICAgICBsZXQgRW5kX1RpY2szPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJFbmRfVGlja18zXCIpLy/li75cclxuICAgICAgICAgICAgbGV0IGhlaT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiaGVpXCIpLy/pu5HoibLpga7nvalcclxuICAgICAgICAgICAgbGV0IG1mPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJtZlwiKS8v5YWN6LS555qE6aKG5Y+W6YGu572pXHJcbiAgICAgICAgICAgIGxldCBnaj10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiZ2pcIikvL+mrmOe6p+eahOmihuWPlumBrue9qVxyXG4gICAgICAgICAgICBsZXQgbWZ0b2RheT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwibWZ0b2RheVwiKS8v5YWN6LS555qE6aKG5Y+W6YGu572p54m55pWIXHJcbiAgICAgICAgICAgIGxldCBnanRvZGF5PXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJnanRvZGF5XCIpLy/pq5jnuqfnmoTpooblj5bpga7nvannibnmlYhcclxuICAgICAgICAgICAgbGV0IG51bT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLy/mlbDlrZdcclxuICAgICAgICAgICAgbGV0IFZpcEZyZWVSZXdhcmRTdGF0dXMgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcEZyZWVSZXdhcmRTdGF0dXMraWQsMCk7Ly92aXDlhY3otLnlpZblirHnirbmgIEgICAgMOacqumihuWPliwx5bey6aKG5Y+WICAgICAwLTE0XHJcbiAgICAgICAgICAgIGxldCBWaXBBZHZhbmNlZFJld2FyZFN0YXR1cyA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMraWQsMCk7Ly92aXDpq5jnuqflpZblirHnirbmgIEgICAgMOacqumihuWPliwx5bey6aKG5Y+WICAgICAwLTE0XHJcbiAgICAgICAgICAgIGhlaS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgVklQX0Jhcl8xXzEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIFZJUF9Mb2NrMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgVklQX0xvY2syLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBFbmRfVGljazEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIEVuZF9UaWNrMi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgRW5kX1RpY2szLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBtZi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgZ2ouYWN0aXZlPWZhbHNlXHJcblxyXG4gICAgICAgICAgICBtZnRvZGF5LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBnanRvZGF5LmFjdGl2ZT1mYWxzZVxyXG5cclxuICAgICAgICAgICAgVklQX0Jhcl91cF8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBWSVBfQmFyX2Rvd25fMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgaWYoVmlwSWRlbnRpdHk9PTApe1xyXG4gICAgICAgICAgICAgICAgVklQX0xvY2sxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBWSVBfTG9jazIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IFJlcXVpcmVkRXg9QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVxdWlyZWRFeHAoaWQpLy/miYDpnIDmtLvot4PluqZcclxuXHJcbiAgICAgICAgICAgIGlmKFJlcXVpcmVkRXg8PUFsbEFjdGl2aXR5TnVtKXtcclxuICAgICAgICAgICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLuaImOS7pOino+mUgeetiee6p19457qnK2lkKTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEZpcnN0RG8oRm9sbG93X1R5cGUu5oiY5Luk6Kej6ZSB562J57qnX3jnuqcraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Top6PplIHnrYnnuqdfeOe6pytpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpdG1laW5kZXg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5WaXBbaXRtZWluZGV4LTFdLmdldENoaWxkQnlOYW1lKFwiVklQX0Jhcl9kb3duXzFcIikuYWN0aXZlPXRydWUvL+S4i+mdouS6rlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgVklQX0Jhcl91cF8xLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBWSVBfQmFyXzFfMS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgbWYuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIG1mdG9kYXkuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIG51bS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5lbmFibGVkPXRydWVcclxuICAgICAgICAgICAgICAgIGlmKFZpcElkZW50aXR5PT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBnai5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGdqdG9kYXkuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih6b25zaHU9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHpvbnNodT1SZXF1aXJlZEV4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBudW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZD1mYWxzZVxyXG4gICAgICAgICAgICAgICAgaGVpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoVmlwRnJlZVJld2FyZFN0YXR1cz09MSl7XHJcbiAgICAgICAgICAgICAgICBtZi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIG1mdG9kYXkuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBFbmRfVGljazEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihWaXBBZHZhbmNlZFJld2FyZFN0YXR1cz09MSl7XHJcbiAgICAgICAgICAgICAgICBnai5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIGdqdG9kYXkuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBFbmRfVGljazIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIEVuZF9UaWNrMy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGl0bWVpbmRleD09MCl7Ly/nrKzkuIDkuKrlpZblirHnm7TmjqXojrflvpcgIOWwhuS4iumdoueahOi/m+W6puadoeS4jeimgVxyXG4gICAgICAgICAgICAgICAgVklQX0Jhcl91cF8wLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgVklQX0Jhcl91cF8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB9UHJvcElkLkdlbVxyXG4gICAgICAgICAgICBpZihpdG1laW5kZXg9PXRoaXMudmlwbnVtLTEpey8v5pyA5ZCO5LiA5Liq5aWW5YqxICDlsIbkuIvpnaLnmoTov5vluqbmnaHkuI3opoFcclxuICAgICAgICAgICAgICAgIFZJUF9CYXJfZG93bl8wLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgVklQX0Jhcl9kb3duXzEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5WaXBbaXRtZWluZGV4XS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihBbGxBY3Rpdml0eU51bT49em9uc2h1KXtcclxuICAgICAgICAgICAgdGhpcy5qZHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJNQVhcIlxyXG4gICAgICAgICAgICB0aGlzLlZJUF9CYXJfMl8xLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZT0xXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuamR0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUFsbEFjdGl2aXR5TnVtK1wiL1wiK3pvbnNodVxyXG4gICAgICAgICAgICBsZXQgZmlsbFJhbmdlPUFsbEFjdGl2aXR5TnVtL3pvbnNodVxyXG4gICAgICAgICAgICB0aGlzLlZJUF9CYXJfMl8xLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZT1maWxsUmFuZ2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbmJ0bkxhbigpe1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSk7XHJcbiAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIGxldCBWaXBJZGVudGl0eT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcElkZW50aXR5LDApICAgLy/mmK/lkKblvIDpgJrkuoZ2aXAgICAwOuayoeW8gOmAmiDlvIDpgJrlvLnnqpcgIDHvvJrlvIDpgJrkuoYg6aKG5Y+W5oyJ6ZKuXHJcbiAgICAgICAgaWYoVmlwSWRlbnRpdHk9PTApe1xyXG4gICAgICAgICAgICB0aGlzLlZJUFByaXZpbGVnZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuino+mUgemrmOe6p+aImOS7pOeahOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgfWVsc2UgaWYoVmlwSWRlbnRpdHk9PTEpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKyvkuIDplK7pooblj5ZcIilcclxuICAgICAgICAgICAgbGV0IGFycj1bXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdG1laW5kZXggPSAwOyBpdG1laW5kZXggPCB0aGlzLnZpcG51bTsgaXRtZWluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZD1pdG1laW5kZXgrMVxyXG4gICAgICAgICAgICAgICAgbGV0IG1mPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJtZlwiKS8v5YWN6LS555qE6aKG5Y+W6YGu572pXHJcbiAgICAgICAgICAgICAgICBsZXQgZ2o9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImdqXCIpLy/pq5jnuqfnmoTpooblj5bpga7nvalcclxuICAgICAgICAgICAgICAgIGlmKG1mLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOWFjei0ueWlluWKsemihuWPll9457qnK2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK2lkLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayx0aGlzLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcoaWQsMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdG1lMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRtZTEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihnai5hY3RpdmU9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Tpq5jnuqflpZblirHpooblj5ZfeOe6pytpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMraWQsMSlcclxuICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuc2F2ZUdhbWVUYXNrLHRoaXMuZ2V0U2F2ZUdhbWVUYXNrSnNvblN0cmluZyhpZCwyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0bWUxPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkR2VtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0bWUyPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmROdW0oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdG1lMSlcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdG1lMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlY2VpdmVtZihpdG1lLGlkKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnJlZVJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmROdW0oaWQpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwRnJlZVJld2FyZFN0YXR1cytpZCwxKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBSZWNlaXZlZ2ooaWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRHZW0oaWQpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGl0bWUxPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkR2VtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGl0bWUyPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoW2l0bWUxLGl0bWUyXSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMraWQsMSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoYXJyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDUwMDEzKSwzKTsvL+W3sue7j+mihuWPlui/h+S6hlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gbGV0IFZpcERhaWx5Q29sbGVjdGlvblN0YXR1cz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcERhaWx5Q29sbGVjdGlvblN0YXR1cywwKSAvLzA65pyq6aKG5Y+WICAgMe+8muW3sumihuWPliAgIOavj+aXpeWIt+aWsFxyXG4gICAgICAgICAgICAvLyBpZihWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXM9PTApe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/pooblj5YzNjDpkrvnn7NcclxuICAgICAgICAgICAgLy8gICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLHRoaXMuR2VtbnVtKTtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcCh0aGlzLml0bWUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwRGFpbHlDb2xsZWN0aW9uU3RhdHVzLDEpXHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAvLyB9ZWxzZSBpZihWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXM9PTEpe1xyXG4gICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDUwMDExKSwzKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fVmlwKTtcclxuICAgIH1cclxuICAgIC8vIHN0YXJ0ICgpIHtcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpbmRleCDmoIforrBpZFxyXG4gICAgICogQHBhcmFtIHR5cGUgMeaZrumAmu+8jDLpq5jnuqdcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcoaW5kZXg6bnVtYmVyLHR5cGU6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCBudW09aW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgcGxheUxldmVsOm51bSxcclxuICAgICAgICAgICAgcmV3YXJkVHlwZTp0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19