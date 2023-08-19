"use strict";
cc._RF.push(module, 'ff318LVRw5NLrK5HatJmAre', 'FastGuaJiUi');
// Scripts/GuaJi/Ui/FastGuaJiUi.ts

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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var ApkManager_1 = require("../../Ads/ApkManager");
var CoinPop_1 = require("../../CoinPop");
var GameManager_1 = require("../../GameManager");
var OfflineRevenue_1 = require("../../JsonData/OfflineRevenue");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var EventManager_1 = require("../../Tools/EventManager");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FastGuaJiUi = /** @class */ (function (_super) {
    __extends(FastGuaJiUi, _super);
    function FastGuaJiUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time_label = null;
        return _this;
    }
    FastGuaJiUi.prototype.init = function (uiAc) {
        var _this = this;
        _super.prototype.init.call(this, uiAc);
        this.time_label = this.node.getChildByName('time').getComponent(cc.Label);
        this.node.getChildByName('Reward_Bg_1').getComponentInChildren(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(100119);
        // this.showRemainingNum();
        this.schedule(this.showRemainTime, 1);
        this.showRemainTime();
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanAdFastOffline, 0) == 1) {
            this.node.getChildByName("btnRoot").getChildByName("ad").active = false;
        }
        else {
            this.node.getChildByName("btnRoot").getChildByName("ad").active = true;
        }
        var bg = this.node.getChildByName('bg');
        bg.off(cc.Node.EventType.TOUCH_START);
        bg.on(cc.Node.EventType.TOUCH_START, function () {
            _this.clickBtnClose();
        }, this);
        cc.director.on(WXManagerEX_1.WXADEnvnt.KUAISUGUAJISHIPIN, this.onShipinComp, this);
    };
    // onLoad(): void {
    //     super.onLoad();
    // }
    FastGuaJiUi.prototype.showRemainingNum = function () {
        // let lm=LanguageManager.getInstance();
        // let freeNum=GameData.getInstance().getFreeFastGuaJiNum();
        // let gemNum=GameData.getInstance().getFastGuaJiNum();
        // let totalNum=freeNum+gemNum;
        // let costGem=150-(gemNum*50);
        // let gem=PropManager.getInstance().getPropNum(PropId.Gem);
        // let gemIcon=this.node.getChildByName('btnRoot').getChildByName("btnFast").getChildByName("gemIcon");
        // let gemText=gemIcon.getChildByName('gemNum').getComponent(cc.Label);
        // let useText=this.node.getChildByName('useText');
        // let btnFast=this.node.getChildByName('btnFast').getComponent(cc.Button);
        // this.node.getChildByName('remainText').getComponent(cc.Label).string=lm.getString(LanguageIndex.UsesRemainingToday)+totalNum;
        // this.node.getChildByName('text1').getComponent(cc.RichText).string="<b><color=#253147 size=24>"+lm.getStrByTextId(220002)+": </c><color=#F9E06E><outline color=#865B2C width=3><size=30>120 min</></outline></c></b>";
        // this.node.getChildByName('text2').getComponent(cc.RichText).string="<b><outline color=#33203F width=3><color=#EBD9B1>"+lm.getStrByTextId(930001)+": 2</c></outline></b>";
        // gemText.string=costGem+'';
        // if(freeNum>0){
        // gemIcon.active=false;
        // useText.x=btnFast.node.x;
        // }else{
        // gemIcon.active=gemNum>0;
        // gemText.node.color=gem>=costGem?cc.Color.WHITE:cc.Color.RED;
        // useText.x=gemNum>0?18:btnFast.node.x;
        // }
        // btnFast.interactable=totalNum>0;
        // useText.color=totalNum>0?cc.color(124,82,13):cc.Color.WHITE;
        // if(totalNum > 0){
        // useText.color = cc.color(63, 45, 33);
        // }else{
        // useText.getComponent(cc.LabelOutline).color = cc.color(138,138,138);
        // this.node.getChildByName("btnFast").getComponent(cc.Button).interactable = false;
        // }
    };
    FastGuaJiUi.prototype.showRemainTime = function () {
        var s;
        var nowTime = Date.now() / 1000;
        var residueTime = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp, 0) - nowTime;
        if (residueTime < 0) {
            residueTime = ((new Date(new Date().toLocaleDateString()).getTime() + 8640000) / 1000) - nowTime;
        }
        var hh = Math.floor(residueTime / (60 * 60));
        if (hh < 10) {
            s = '0' + hh + ':';
        }
        else {
            s = hh + ':';
        }
        var mm = Math.floor(residueTime % (60 * 60) / 60);
        if (mm < 10) {
            s += '0' + mm + ':';
        }
        else {
            s += mm + ':';
        }
        var ss = Math.floor(residueTime % (60 * 60) % 60);
        if (ss < 10) {
            s += '0' + ss;
        }
        else {
            s += ss;
        }
        this.time_label.string = s;
        // if(TheStorageManager.getInstance().getNumber(StorageKey.CanFastOffline,0) == 1){
        //     this.showRemainingNum();
        // }
        //获取当前时间
        // let date=new Date();
        // let curHours=date.getHours();
        // let curMin=date.getMinutes();
        // let curSec=date.getSeconds();
        // let remainHours=24-curHours-1;
        // let remainMin=60-curMin;
        // let remainSec=60-curSec;
        // let shiStr='0'+remainHours;
        // if(remainHours>=10)
        // {
        //     shiStr=''+remainHours;
        // }
        // let fenStr='0'+remainMin;
        // if(remainMin>=10)
        // {
        //     fenStr=''+remainMin;
        // }
        // let miaoStr='0'+remainSec;
        // if(remainSec>=10)
        // {
        //     miaoStr=''+remainSec;
        // }
        // if(GameData.getInstance().checkIsNewDay())
        // {
        // }
        // if(remainSec%5==0)
        // {
        //     GameData.getInstance().saveIsSignToday(false);
        //     this.showSignDay();
        // }
    };
    FastGuaJiUi.prototype.clickBtnAd = function () {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-e66e307225f3960f'
            });
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.offError();
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.onError(function (err) {
                console.log(err);
            });
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.offClose();
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                });
            });
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.onClose(function (res) {
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
    };
    FastGuaJiUi.prototype.onShipinComp = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.快速挂机广告按钮点击);
        GameManager_1.default.getInstance().refreshGemShow();
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取挂机奖励2次);
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取快速挂机1次);
        // TheStorageManager.getInstance().setItem(StorageKey.CanFastOffline,1);
        // GameData.getInstance().saveFastGuaJiNum(gemNum-1);
        this.showRemainingNum();
        var rewardDatas = OfflineRevenue_1.OfflineRevenueManager.getInstance().getRewards(5 * 60);
        var rewardMap = new Map();
        rewardDatas.forEach(function (v, k) {
            if (rewardMap.has(v.reward_id)) {
                var num = rewardMap.get(v.reward_id);
                num += v.reward_num;
                rewardMap.set(v.reward_id, num);
            }
            else {
                rewardMap.set(v.reward_id, v.reward_num);
            }
        });
        var rdNodes = new Array();
        rewardMap.forEach(function (num, id) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
            PropManager_1.PropManager.getInstance().changePropNum(id, num);
            rdNodes.push(item);
        });
        // for(let i=0; i<rewardDatas.length; i++){
        //     let rd=rewardDatas[i];
        //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
        //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
        //     rdNodes.push(item);
        // }
        GameManager_1.default.getInstance().showMultipleGetTip(rdNodes);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanAdFastOffline, 1);
        this.node.getChildByName("btnRoot").getChildByName("ad").active = false;
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_Guaji_Btn_Fast, false);
    };
    FastGuaJiUi.prototype.clickBtnFast = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanFastOffline, 0) == 0) {
            if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -200)) {
                // FollowManager.getInstance().addTotal(Follow_Type.快速挂机消耗的钻石数量,costGem);
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanFastOffline, 1);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取快速挂机1次);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取挂机奖励2次);
                // GameData.getInstance().saveFastGuaJiNum(gemNum-1);
                this.showRemainingNum();
                var rewardDatas = OfflineRevenue_1.OfflineRevenueManager.getInstance().getRewards(5 * 60);
                var rewardMap_1 = new Map();
                rewardDatas.forEach(function (v, k) {
                    if (rewardMap_1.has(v.reward_id)) {
                        var num = rewardMap_1.get(v.reward_id);
                        num += v.reward_num;
                        rewardMap_1.set(v.reward_id, num);
                    }
                    else {
                        rewardMap_1.set(v.reward_id, v.reward_num);
                    }
                });
                var rdNodes_1 = new Array();
                rewardMap_1.forEach(function (num, id) {
                    var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
                    PropManager_1.PropManager.getInstance().changePropNum(id, num);
                    rdNodes_1.push(item);
                });
                // let rdNodes=new Array();
                // for(let i=0; i<rewardDatas.length; i++){
                //     let rd=rewardDatas[i];
                //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
                //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
                //     rdNodes.push(item);
                // }
                GameManager_1.default.getInstance().showMultipleGetTip(rdNodes_1);
                // GameManager.getInstance().refreshGemShow();
            }
            else {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                        uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                    }, });
            }
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100120));
        }
        // TaskManger.getInstance().setTaskItem(TaskItem.快速挂机1次);
        // TaskManger.getInstance().setTaskItem(TaskItem.收取挂机奖励2次);
        // FollowManager.getInstance().followEvent(Follow_Type.快速挂机使用次数);
        // let freeNum=GameData.getInstance().getFreeFastGuaJiNum();
        // let gemNum=GameData.getInstance().getFastGuaJiNum();
        // if(freeNum>0){
        //     GameData.getInstance().saveFreeFastGuaJiNum(freeNum-1);
        //     this.showRemainingNum();
        //     let rewardDatas=OfflineRevenueManager.getInstance().getRewards(2*60);
        //     let rdNodes=new Array();
        //     for(let i=0; i<rewardDatas.length; i++){
        //         let rd=rewardDatas[i];
        //         let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
        //         PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
        //         rdNodes.push(item);
        //     }
        //     GameManager.getInstance().showMultipleGetTip(rdNodes);
        //     EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Fast);
        // }else{
        //     if(gemNum>0){
        //         let costGem=150-(gemNum*50);
        //         if(PropManager.getInstance().changePropNum(PropId.Gem,-costGem)){
        //             FollowManager.getInstance().addTotal(Follow_Type.快速挂机消耗的钻石数量,costGem);
        //             GameManager.getInstance().refreshGemShow();
        //             GameData.getInstance().saveFastGuaJiNum(gemNum-1);
        //             this.showRemainingNum();
        //             let rewardDatas=OfflineRevenueManager.getInstance().getRewards(2*60);
        //             let rdNodes=new Array();
        //             for(let i=0; i<rewardDatas.length; i++){
        //                 let rd=rewardDatas[i];
        //                 let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
        //                 PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
        //                 rdNodes.push(item);
        //             }
        //             GameManager.getInstance().showMultipleGetTip(rdNodes);
        //         }else{
        //             GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.Insufficient_gems));
        //         }                
        //     }else{
        //     }
        // }
    };
    FastGuaJiUi.prototype.clickBtnVip = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showPayUi({ onClose: function () {
                _this.showRemainTime();
            } }, 0);
    };
    FastGuaJiUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.unschedule(this.showRemainTime);
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        cc.director.on(WXManagerEX_1.WXADEnvnt.KUAISUGUAJISHIPIN, this.onShipinComp, this);
    };
    FastGuaJiUi = __decorate([
        ccclass
    ], FastGuaJiUi);
    return FastGuaJiUi;
}(UIComponent_1.default));
exports.default = FastGuaJiUi;

cc._RF.pop();