
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
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVmlwU3lzdGVtXFxWaXBTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsd0RBQW1FO0FBQ25FLCtEQUFxRTtBQUNyRSw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsOERBQXlEO0FBQ3pELGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsc0RBQW1GO0FBQ25GLGlEQUE0QztBQUM1Qyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUFnVEM7UUE3U0csYUFBTyxHQUFTLElBQUksQ0FBQSxDQUFBLEtBQUs7UUFFekIsYUFBTyxHQUFTLElBQUksQ0FBQSxDQUFBLE9BQU87UUFDM0IsU0FBRyxHQUFXLEVBQUUsQ0FBQSxDQUFBLE9BQU87UUFDdkIsWUFBTSxHQUFRLEVBQUUsQ0FBQTtRQUVoQixtQkFBYSxHQUFTLElBQUksQ0FBQSxDQUFBLGdDQUFnQztRQUMxRCxxQkFBcUI7UUFDckIscUNBQXFDO1FBRXJDLFlBQU0sR0FBUyxJQUFJLENBQUEsQ0FBQSxvQkFBb0I7UUFFdkMsaUJBQVcsR0FBUyxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBRTdCLFNBQUcsR0FBUyxJQUFJLENBQUEsQ0FBQSxZQUFZO1FBRTVCLFlBQU0sR0FBUSxHQUFHLENBQUE7O1FBNFJqQixpQkFBaUI7SUFDckIsQ0FBQztJQTVSRywwQkFBTSxHQUFOO1FBQUEsaUJBZ0RDO1FBL0NH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QUFDLElBQUksQ0FBQztvREFDUTtJQUkxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNDO0lBRW5CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ007SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FDRjtJQWpCQyxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBZ1Q3QjtJQUFELGdCQUFDO0NBaFRELEFBZ1RDLENBaFRzQyxxQkFBVyxHQWdUakQ7a0JBaFRvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0RhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlwU3lzdGVtIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udGVudDpjYy5Ob2RlPW51bGwvL+eItuiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBWaXBpdG1lOmNjLk5vZGU9bnVsbC8vdmlw6IqC54K5XHJcbiAgICBWaXA6Y2MuTm9kZVtdPVtdLy92aXDoioLngrlcclxuICAgIHZpcG51bTpudW1iZXI9MTVcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVklQUHJpdmlsZWdlczpjYy5Ob2RlPW51bGwvL3ZpcOeJueadg+W8ueeqlyAgICDlpoLmnpzmsqHmnInotK3kubB2aXAg5oiWdmlw5Yiw5pyfICAgXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIGl0bWU6Y2MuTm9kZT1udWxsLy/mr4/lpKnpooblj5bnmoQ1MDDpkrvnn7PpgZPlhbfniLboioLngrlcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuTGFuOmNjLk5vZGU9bnVsbC8v6LSt5Lmw5oyJ6ZKuICAgIOmihuWPluaMiemSriAgIOW3sumihuWPllxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBWSVBfQmFyXzJfMTpjYy5Ob2RlPW51bGwvL+i/m+W6puadoVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBqZHQ6Y2MuTm9kZT1udWxsLy/ov5vluqbmnaEgICDmlbAv5oC75pWwXHJcblxyXG4gICAgR2VtbnVtOm51bWJlcj0zNjBcclxuICAgIGluaXRVaSgpIHtcclxuICAgICAgICAvLyBpZih0aGlzLml0bWUuY2hpbGRyZW5Db3VudD09MCl7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdG1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSx0aGlzLkdlbW51bSk7XHJcbiAgICAgICAgLy8gICAgIGl0bWUuc2NhbGU9MC44NVxyXG4gICAgICAgIC8vICAgICBpdG1lLnBhcmVudD10aGlzLml0bWVcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy52aXBudW09QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldE1heEJhdHRsZVBhc3NMZXZlbCgpXHJcbiAgICAgICAgZm9yIChsZXQgaXRtZWluZGV4ID0gdGhpcy5WaXAubGVuZ3RoOyBpdG1laW5kZXggPCB0aGlzLnZpcG51bTsgaXRtZWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IFZpcGl0bWU9Y2MuaW5zdGFudGlhdGUodGhpcy5WaXBpdG1lKVxyXG5cclxuICAgICAgICAgICAgbGV0IGlkPWl0bWVpbmRleCsxXHJcbiAgICAgICAgICAgIGxldCBpdG1lMD1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgIGl0bWUwLnNjYWxlPTAuODNcclxuICAgICAgICAgICAgaXRtZTAucGFyZW50PVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lMFwiKVxyXG4gICAgICAgICAgICBsZXQgaXRtZTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRHZW0oaWQpKTtcclxuICAgICAgICAgICAgaXRtZTEuc2NhbGU9MC44M1xyXG4gICAgICAgICAgICBpdG1lMS5wYXJlbnQ9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIml0bWUxXCIpXHJcbiAgICAgICAgICAgIGxldCBpdG1lMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICBpdG1lMi5zY2FsZT0wLjgzXHJcbiAgICAgICAgICAgIGl0bWUyLnBhcmVudD1WaXBpdG1lLmdldENoaWxkQnlOYW1lKFwiaXRtZTJcIilcclxuICAgICAgICAgICAgLy8gbGV0IFZJUF9CYXJfZG93bl8wPVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyX2Rvd25fMFwiKVxyXG4gICAgICAgICAgICAvLyBsZXQgVklQX0Jhcl91cF8wPVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyX3VwXzBcIilcclxuICAgICAgICAgICAgLy8gbGV0IFZJUF9CYXJfdXBfMT1WaXBpdG1lLmdldENoaWxkQnlOYW1lKFwiVklQX0Jhcl91cF8xXCIpLy/kuIrpnaLkuq5cclxuICAgICAgICAgICAgLy8gbGV0IFZJUF9CYXJfZG93bl8xPVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyX2Rvd25fMVwiKS8v5LiL6Z2i5LquXHJcblxyXG4gICAgICAgICAgICBsZXQgbWY9VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIm1mXCIpLy/lhY3otLnnmoTpooblj5bpga7nvalcclxuICAgICAgICAgICAgbGV0IGdqPVZpcGl0bWUuZ2V0Q2hpbGRCeU5hbWUoXCJnalwiKS8v6auY57qn55qE6aKG5Y+W6YGu572pXHJcbiAgICAgICAgICAgIGxldCBudW09VmlwaXRtZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS8v5pWw5a2XXHJcbiAgICAgICAgICAgIG51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2lkXHJcbiAgICAgICAgICAgIC8vIGlmKGl0bWVpbmRleD09MCl7Ly/nrKzkuIDkuKrlpZblirHnm7TmjqXojrflvpcgIOWwhuS4iumdoueahOi/m+W6puadoeS4jeimgVxyXG4gICAgICAgICAgICAvLyAgICAgVklQX0Jhcl91cF8wLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgVklQX0Jhcl91cF8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmKGl0bWVpbmRleD09dGhpcy52aXBudW0tMSl7Ly/mnIDlkI7kuIDkuKrlpZblirEgIOWwhuS4i+mdoueahOi/m+W6puadoeS4jeimgVxyXG4gICAgICAgICAgICAvLyAgICAgVklQX0Jhcl9kb3duXzAuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIC8vICAgICBWSVBfQmFyX2Rvd25fMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBtZi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZW1mKGl0bWUwLGlkKVxyXG4gICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICBnai5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZWdqKGlkKVxyXG4gICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVmlwaXRtZS5wYXJlbnQ9dGhpcy5jb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuVmlwLnB1c2goVmlwaXRtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoKClcclxuICAgIH1cclxuICAgIFJlY2VpdmVtZihpdG1lLGlkKXtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk5YWN6LS55aWW5Yqx6aKG5Y+WX3jnuqcraWQpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnJlZVJld2FyZE51bShpZCkpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdG1lKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK2lkLDEpXHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayx0aGlzLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcoaWQsMSkpO1xyXG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICB9XHJcbiAgICBSZWNlaXZlZ2ooaWQpe1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Tpq5jnuqflpZblirHpooblj5ZfeOe6pytpZCk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmROdW0oaWQpKTtcclxuICAgICAgICBsZXQgaXRtZTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRHZW0oaWQpKTtcclxuICAgICAgICBsZXQgaXRtZTI9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmROdW0oaWQpKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChbaXRtZTEsaXRtZTJdKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBBZHZhbmNlZFJld2FyZFN0YXR1cytpZCwxKVxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssdGhpcy5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKGlkLDIpKTtcclxuICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgfVxyXG4gICAgUmVmcmVzaCgpe1xyXG4gICAgICAgIGxldCB6b25zaHU9MFxyXG4gICAgICAgIGxldCBBbGxBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQWxsQWN0aXZpdHlOdW0sMCk7Ly/mgLvmtLvot4PluqZcclxuICAgICAgICBsZXQgVmlwSWRlbnRpdHk9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBJZGVudGl0eSwwKSAgIC8v5piv5ZCm5byA6YCa5LqGdmlwICAgMDrmsqHlvIDpgJog6ZSB5pi+56S6ICAgMe+8muW8gOmAmuS6hiDmiYDmnInplIHpmpDol48gICAgXHJcbiAgICAgICAgbGV0IHdpblRleHQ9dGhpcy5idG5MYW4uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpXHJcbiAgICAgICAgaWYoVmlwSWRlbnRpdHk9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkxhbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB3aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHdpblRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE0NTAwMDIpXHJcbiAgICAgICAgfWVsc2UgaWYoVmlwSWRlbnRpdHk9PTEpe1xyXG4gICAgICAgICAgICB3aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDUwMDEyKS8v5LiA6ZSu6aKG5Y+WXHJcbiAgICAgICAgICAgIC8vIGxldCBWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXM9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBEYWlseUNvbGxlY3Rpb25TdGF0dXMsMCkgLy8wOuacqumihuWPliAgIDHvvJrlt7Lpooblj5YgICDmr4/ml6XliLfmlrBcclxuICAgICAgICAgICAgLy8gd2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDExKS8v6aKG5Y+WXHJcbiAgICAgICAgICAgIC8vIGlmKFZpcERhaWx5Q29sbGVjdGlvblN0YXR1cz09MCl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ0bkxhbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAvLyAgICAgd2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZSBpZihWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXM9PTEpe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5idG5MYW4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAvLyAgICAgd2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaXRtZWluZGV4ID0gMDsgaXRtZWluZGV4IDwgdGhpcy52aXBudW07IGl0bWVpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpZD1pdG1laW5kZXgrMVxyXG4gICAgICAgICAgICBsZXQgVklQX0Jhcl9kb3duXzA9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfZG93bl8wXCIpXHJcbiAgICAgICAgICAgIGxldCBWSVBfQmFyX3VwXzA9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfdXBfMFwiKVxyXG4gICAgICAgICAgICBsZXQgVklQX0Jhcl91cF8xPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyX3VwXzFcIikvL+S4iumdouS6rlxyXG4gICAgICAgICAgICBsZXQgVklQX0Jhcl9kb3duXzE9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfZG93bl8xXCIpLy/kuIvpnaLkuq5cclxuICAgICAgICAgICAgbGV0IFZJUF9CYXJfMV8xPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJWSVBfQmFyXzFfMVwiKS8v5Lit6Ze05LquXHJcbiAgICAgICAgICAgIGxldCBWSVBfTG9jazE9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9Mb2NrMVwiKS8v6ZSBXHJcbiAgICAgICAgICAgIGxldCBWSVBfTG9jazI9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9Mb2NrMlwiKS8v6ZSBXHJcbiAgICAgICAgICAgIGxldCBFbmRfVGljazE9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkVuZF9UaWNrXzFcIikvL+WLvlxyXG4gICAgICAgICAgICBsZXQgRW5kX1RpY2syPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJFbmRfVGlja18yXCIpLy/li75cclxuICAgICAgICAgICAgbGV0IEVuZF9UaWNrMz10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiRW5kX1RpY2tfM1wiKS8v5Yu+XHJcbiAgICAgICAgICAgIGxldCBoZWk9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImhlaVwiKS8v6buR6Imy6YGu572pXHJcbiAgICAgICAgICAgIGxldCBtZj10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwibWZcIikvL+WFjei0ueeahOmihuWPlumBrue9qVxyXG4gICAgICAgICAgICBsZXQgZ2o9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImdqXCIpLy/pq5jnuqfnmoTpooblj5bpga7nvalcclxuICAgICAgICAgICAgbGV0IG1mdG9kYXk9dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIm1mdG9kYXlcIikvL+WFjei0ueeahOmihuWPlumBrue9qeeJueaViFxyXG4gICAgICAgICAgICBsZXQgZ2p0b2RheT10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwiZ2p0b2RheVwiKS8v6auY57qn55qE6aKG5Y+W6YGu572p54m55pWIXHJcbiAgICAgICAgICAgIGxldCBudW09dGhpcy5WaXBbaXRtZWluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS8v5pWw5a2XXHJcbiAgICAgICAgICAgIGxldCBWaXBGcmVlUmV3YXJkU3RhdHVzID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK2lkLDApOy8vdmlw5YWN6LS55aWW5Yqx54q25oCBICAgIDDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG4gICAgICAgICAgICBsZXQgVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK2lkLDApOy8vdmlw6auY57qn5aWW5Yqx54q25oCBICAgIDDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG4gICAgICAgICAgICBoZWkuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIFZJUF9CYXJfMV8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBWSVBfTG9jazEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIFZJUF9Mb2NrMi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgRW5kX1RpY2sxLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBFbmRfVGljazIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIEVuZF9UaWNrMy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgbWYuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIGdqLmFjdGl2ZT1mYWxzZVxyXG5cclxuICAgICAgICAgICAgbWZ0b2RheS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgZ2p0b2RheS5hY3RpdmU9ZmFsc2VcclxuXHJcbiAgICAgICAgICAgIFZJUF9CYXJfdXBfMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgVklQX0Jhcl9kb3duXzEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIGlmKFZpcElkZW50aXR5PT0wKXtcclxuICAgICAgICAgICAgICAgIFZJUF9Mb2NrMS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgVklQX0xvY2syLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBSZXF1aXJlZEV4PUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJlcXVpcmVkRXhwKGlkKS8v5omA6ZyA5rS76LeD5bqmXHJcblxyXG4gICAgICAgICAgICBpZihSZXF1aXJlZEV4PD1BbGxBY3Rpdml0eU51bSl7XHJcbiAgICAgICAgICAgICAgICBpZihGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3REbyhGb2xsb3dfVHlwZS7miJjku6Top6PplIHnrYnnuqdfeOe6pytpZCk8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLuaImOS7pOino+mUgeetiee6p19457qnK2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6Kej6ZSB562J57qnX3jnuqcraWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXRtZWluZGV4PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVmlwW2l0bWVpbmRleC0xXS5nZXRDaGlsZEJ5TmFtZShcIlZJUF9CYXJfZG93bl8xXCIpLmFjdGl2ZT10cnVlLy/kuIvpnaLkuq5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFZJUF9CYXJfdXBfMS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgVklQX0Jhcl8xXzEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIG1mLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBtZnRvZGF5LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBudW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZD10cnVlXHJcbiAgICAgICAgICAgICAgICBpZihWaXBJZGVudGl0eT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2ouYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICBnanRvZGF5LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoem9uc2h1PT0wKXtcclxuICAgICAgICAgICAgICAgICAgICB6b25zaHU9UmVxdWlyZWRFeFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbnVtLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmVuYWJsZWQ9ZmFsc2VcclxuICAgICAgICAgICAgICAgIGhlaS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKFZpcEZyZWVSZXdhcmRTdGF0dXM9PTEpe1xyXG4gICAgICAgICAgICAgICAgbWYuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBtZnRvZGF5LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgRW5kX1RpY2sxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXM9PTEpe1xyXG4gICAgICAgICAgICAgICAgZ2ouYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBnanRvZGF5LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgRW5kX1RpY2syLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBFbmRfVGljazMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpdG1laW5kZXg9PTApey8v56ys5LiA5Liq5aWW5Yqx55u05o6l6I635b6XICDlsIbkuIrpnaLnmoTov5vluqbmnaHkuI3opoFcclxuICAgICAgICAgICAgICAgIFZJUF9CYXJfdXBfMC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIFZJUF9CYXJfdXBfMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgfVByb3BJZC5HZW1cclxuICAgICAgICAgICAgaWYoaXRtZWluZGV4PT10aGlzLnZpcG51bS0xKXsvL+acgOWQjuS4gOS4quWlluWKsSAg5bCG5LiL6Z2i55qE6L+b5bqm5p2h5LiN6KaBXHJcbiAgICAgICAgICAgICAgICBWSVBfQmFyX2Rvd25fMC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIFZJUF9CYXJfZG93bl8xLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuVmlwW2l0bWVpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQWxsQWN0aXZpdHlOdW0+PXpvbnNodSl7XHJcbiAgICAgICAgICAgIHRoaXMuamR0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiTUFYXCJcclxuICAgICAgICAgICAgdGhpcy5WSVBfQmFyXzJfMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2U9MVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmpkdC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1BbGxBY3Rpdml0eU51bStcIi9cIit6b25zaHVcclxuICAgICAgICAgICAgbGV0IGZpbGxSYW5nZT1BbGxBY3Rpdml0eU51bS96b25zaHVcclxuICAgICAgICAgICAgdGhpcy5WSVBfQmFyXzJfMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2U9ZmlsbFJhbmdlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25idG5MYW4oKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMykpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgVmlwSWRlbnRpdHk9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBJZGVudGl0eSwwKSAgIC8v5piv5ZCm5byA6YCa5LqGdmlwICAgMDrmsqHlvIDpgJog5byA6YCa5by556qXICAx77ya5byA6YCa5LqGIOmihuWPluaMiemSrlxyXG4gICAgICAgIGlmKFZpcElkZW50aXR5PT0wKXtcclxuICAgICAgICAgICAgdGhpcy5WSVBQcml2aWxlZ2VzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7op6PplIHpq5jnuqfmiJjku6TnmoTmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIH1lbHNlIGlmKFZpcElkZW50aXR5PT0xKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysr5LiA6ZSu6aKG5Y+WXCIpXHJcbiAgICAgICAgICAgIGxldCBhcnI9W11cclxuICAgICAgICAgICAgZm9yIChsZXQgaXRtZWluZGV4ID0gMDsgaXRtZWluZGV4IDwgdGhpcy52aXBudW07IGl0bWVpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9aXRtZWluZGV4KzFcclxuICAgICAgICAgICAgICAgIGxldCBtZj10aGlzLlZpcFtpdG1laW5kZXhdLmdldENoaWxkQnlOYW1lKFwibWZcIikvL+WFjei0ueeahOmihuWPlumBrue9qVxyXG4gICAgICAgICAgICAgICAgbGV0IGdqPXRoaXMuVmlwW2l0bWVpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJnalwiKS8v6auY57qn55qE6aKG5Y+W6YGu572pXHJcbiAgICAgICAgICAgICAgICBpZihtZi5hY3RpdmU9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TlhY3otLnlpZblirHpooblj5ZfeOe6pytpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwRnJlZVJld2FyZFN0YXR1cytpZCwxKVxyXG4gICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssdGhpcy5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKGlkLDEpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRtZTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnJlZVJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnJlZVJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0bWUxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZ2ouYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6auY57qn5aWW5Yqx6aKG5Y+WX3jnuqcraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK2lkLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayx0aGlzLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcoaWQsMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdG1lMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdG1lMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTZW5pb3JSZXdhcmRHZW0oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkSXRlbShpZCksQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRtZTEpXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRtZTIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWNlaXZlbWYoaXRtZSxpZCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZyZWVSZXdhcmRJdGVtKGlkKSxCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlUmV3YXJkTnVtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0bWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEZyZWVSZXdhcmRTdGF0dXMraWQsMSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gUmVjZWl2ZWdqKGlkKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2VuaW9yUmV3YXJkR2VtKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBpdG1lMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEdlbShpZCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBpdG1lMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZEl0ZW0oaWQpLEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNlbmlvclJld2FyZE51bShpZCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKFtpdG1lMSxpdG1lMl0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK2lkLDEpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5SZWZyZXNoKClcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGFycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQ1MDAxMyksMyk7Ly/lt7Lnu4/pooblj5bov4fkuoZcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGxldCBWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXM9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBEYWlseUNvbGxlY3Rpb25TdGF0dXMsMCkgLy8wOuacqumihuWPliAgIDHvvJrlt7Lpooblj5YgICDmr4/ml6XliLfmlrBcclxuICAgICAgICAgICAgLy8gaWYoVmlwRGFpbHlDb2xsZWN0aW9uU3RhdHVzPT0wKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v6aKG5Y+WMzYw6ZK755+zXHJcbiAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSx0aGlzLkdlbW51bSk7XHJcbiAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAodGhpcy5pdG1lLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcERhaWx5Q29sbGVjdGlvblN0YXR1cywxKVxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5SZWZyZXNoKClcclxuICAgICAgICAgICAgLy8gfWVsc2UgaWYoVmlwRGFpbHlDb2xsZWN0aW9uU3RhdHVzPT0xKXtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQ1MDAxMSksMyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCkvL+WFs+mXrVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1ZpcCk7XHJcbiAgICB9XHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg5qCH6K6waWRcclxuICAgICAqIEBwYXJhbSB0eXBlIDHmma7pgJrvvIwy6auY57qnXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKGluZGV4Om51bWJlcix0eXBlOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBsZXQgbnVtPWluZGV4O1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIHBsYXlMZXZlbDpudW0sXHJcbiAgICAgICAgICAgIHJld2FyZFR5cGU6dHlwZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==