
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/Ui/FastGuaJiUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            WXManagerEX_1.default.getInstance().kuaisuGuajiShipin = tt.createRewardedVideoAd({
                adUnitId: '3iifgrgt8f2515m1sg'
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
                WXManagerEX_1.default.getInstance().kuaisuGuajiShipin.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXFVpXFxGYXN0R3VhSmlVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBeUU7QUFDekUsbURBQThDO0FBRTlDLHlDQUFvQztBQUdwQyxpREFBNEM7QUFDNUMsZ0VBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsdUVBQWtFO0FBQ2xFLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCx5REFBc0Y7QUFDdEYsb0RBQStDO0FBQy9DLDhDQUF5RDtBQUV6RCxnREFBK0M7QUFHekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVc7SUFBcEQ7UUFBQSxxRUEyVEM7UUF6VEcsZ0JBQVUsR0FBVSxJQUFJLENBQUM7O0lBeVQ3QixDQUFDO0lBdlRHLDBCQUFJLEdBQUosVUFBSyxJQUFjO1FBQW5CLGlCQXNCQztRQXJCRyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUksMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFD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LElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUF4VGdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EyVC9CO0lBQUQsa0JBQUM7Q0EzVEQsQUEyVEMsQ0EzVHdDLHFCQUFXLEdBMlRuRDtrQkEzVG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV1hNYW5hZ2VyRVgsIHsgV1hBREVudm50IH0gZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4uLy4uL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXN0R3VhSmlVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICB0aW1lX2xhYmVsOmNjLkxhYmVsPW51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGltZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdSZXdhcmRfQmdfMScpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuUmljaFRleHQpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExOSk7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW5UaW1lLDEpO1xyXG4gICAgICAgIHRoaXMuc2hvd1JlbWFpblRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5BZEZhc3RPZmZsaW5lLDApID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Sb290XCIpLmdldENoaWxkQnlOYW1lKFwiYWRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0blJvb3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICBiZy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIGJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH0sdGhpcyk7XHJcblxyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihXWEFERW52bnQuS1VBSVNVR1VBSklTSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd1JlbWFpbmluZ051bSgpe1xyXG4gICAgICAgIC8vIGxldCBsbT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBsZXQgZnJlZU51bT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEZyZWVGYXN0R3VhSmlOdW0oKTtcclxuICAgICAgICAvLyBsZXQgZ2VtTnVtPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0RmFzdEd1YUppTnVtKCk7XHJcbiAgICAgICAgLy8gbGV0IHRvdGFsTnVtPWZyZWVOdW0rZ2VtTnVtO1xyXG4gICAgICAgIC8vIGxldCBjb3N0R2VtPTE1MC0oZ2VtTnVtKjUwKTtcclxuICAgICAgICAvLyBsZXQgZ2VtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGdlbUljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5Sb290JykuZ2V0Q2hpbGRCeU5hbWUoXCJidG5GYXN0XCIpLmdldENoaWxkQnlOYW1lKFwiZ2VtSWNvblwiKTtcclxuICAgICAgICAvLyBsZXQgZ2VtVGV4dD1nZW1JY29uLmdldENoaWxkQnlOYW1lKCdnZW1OdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIGxldCB1c2VUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlVGV4dCcpO1xyXG5cclxuICAgICAgICAvLyBsZXQgYnRuRmFzdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkZhc3QnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JlbWFpblRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Vc2VzUmVtYWluaW5nVG9kYXkpK3RvdGFsTnVtO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGV4dDEnKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZz1cIjxiPjxjb2xvcj0jMjUzMTQ3IHNpemU9MjQ+XCIrbG0uZ2V0U3RyQnlUZXh0SWQoMjIwMDAyKStcIjogPC9jPjxjb2xvcj0jRjlFMDZFPjxvdXRsaW5lIGNvbG9yPSM4NjVCMkMgd2lkdGg9Mz48c2l6ZT0zMD4xMjAgbWluPC8+PC9vdXRsaW5lPjwvYz48L2I+XCI7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0ZXh0MicpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPVwiPGI+PG91dGxpbmUgY29sb3I9IzMzMjAzRiB3aWR0aD0zPjxjb2xvcj0jRUJEOUIxPlwiK2xtLmdldFN0ckJ5VGV4dElkKDkzMDAwMSkrXCI6IDI8L2M+PC9vdXRsaW5lPjwvYj5cIjtcclxuXHJcbiAgICAgICAgLy8gZ2VtVGV4dC5zdHJpbmc9Y29zdEdlbSsnJztcclxuICAgICAgICBcclxuICAgICAgICAvLyBpZihmcmVlTnVtPjApe1xyXG4gICAgICAgICAgICAvLyBnZW1JY29uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gdXNlVGV4dC54PWJ0bkZhc3Qubm9kZS54O1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBnZW1JY29uLmFjdGl2ZT1nZW1OdW0+MDtcclxuICAgICAgICAgICAgLy8gZ2VtVGV4dC5ub2RlLmNvbG9yPWdlbT49Y29zdEdlbT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIC8vIHVzZVRleHQueD1nZW1OdW0+MD8xODpidG5GYXN0Lm5vZGUueDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gYnRuRmFzdC5pbnRlcmFjdGFibGU9dG90YWxOdW0+MDtcclxuICAgICAgICAvLyB1c2VUZXh0LmNvbG9yPXRvdGFsTnVtPjA/Y2MuY29sb3IoMTI0LDgyLDEzKTpjYy5Db2xvci5XSElURTtcclxuICAgICAgICAvLyBpZih0b3RhbE51bSA+IDApe1xyXG4gICAgICAgICAgICAvLyB1c2VUZXh0LmNvbG9yID0gY2MuY29sb3IoNjMsIDQ1LCAzMyk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIHVzZVRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigxMzgsMTM4LDEzOCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkZhc3RcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dSZW1haW5UaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgczpzdHJpbmc7XHJcbiAgICAgICAgbGV0IG5vd1RpbWUgPSBEYXRlLm5vdygpIC8gMTAwMDtcclxuICAgICAgICBsZXQgcmVzaWR1ZVRpbWUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvbW9yb3daZXJvVGltZVN0YW1wLDApIC0gbm93VGltZTtcclxuICAgICAgICBpZihyZXNpZHVlVGltZSA8IDApe1xyXG4gICAgICAgICAgICByZXNpZHVlVGltZSA9ICgobmV3IERhdGUobmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKSkuZ2V0VGltZSgpKzg2NDAwMDApLyAxMDAwKSAtIG5vd1RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoaCA9IE1hdGguZmxvb3IocmVzaWR1ZVRpbWUgLyAoNjAqNjApKTtcclxuICAgICAgICBpZihoaCA8IDEwKXtcclxuICAgICAgICAgICAgcyA9ICcwJyArIGhoICsgJzonO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzID0gaGggKyc6JztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1tID0gTWF0aC5mbG9vcihyZXNpZHVlVGltZSAlICg2MCo2MCkvNjApO1xyXG4gICAgICAgIGlmKG1tIDwgMTApe1xyXG4gICAgICAgICAgICBzICs9ICcwJyArIG1tICsgJzonXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHMgKz0gbW0gKyAnOidcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNzID0gTWF0aC5mbG9vcihyZXNpZHVlVGltZSAlICg2MCo2MCklNjApXHJcbiAgICAgICAgaWYoc3MgPCAxMCl7XHJcbiAgICAgICAgICAgIHMgKz0gJzAnICsgc3NcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcyArPSBzc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwuc3RyaW5nPXM7XHJcbiAgICAgICAgLy8gaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5GYXN0T2ZmbGluZSwwKSA9PSAxKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgLy8gbGV0IGRhdGU9bmV3IERhdGUoKTtcclxuICAgICAgICAvLyBsZXQgY3VySG91cnM9ZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIC8vIGxldCBjdXJNaW49ZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgLy8gbGV0IGN1clNlYz1kYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAvLyBsZXQgcmVtYWluSG91cnM9MjQtY3VySG91cnMtMTtcclxuICAgICAgICAvLyBsZXQgcmVtYWluTWluPTYwLWN1ck1pbjtcclxuICAgICAgICAvLyBsZXQgcmVtYWluU2VjPTYwLWN1clNlYztcclxuICAgICAgICAvLyBsZXQgc2hpU3RyPScwJytyZW1haW5Ib3VycztcclxuICAgICAgICAvLyBpZihyZW1haW5Ib3Vycz49MTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzaGlTdHI9JycrcmVtYWluSG91cnM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBmZW5TdHI9JzAnK3JlbWFpbk1pbjtcclxuICAgICAgICAvLyBpZihyZW1haW5NaW4+PTEwKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgZmVuU3RyPScnK3JlbWFpbk1pbjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbGV0IG1pYW9TdHI9JzAnK3JlbWFpblNlYztcclxuICAgICAgICAvLyBpZihyZW1haW5TZWM+PTEwKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbWlhb1N0cj0nJytyZW1haW5TZWM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuY2hlY2tJc05ld0RheSgpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYocmVtYWluU2VjJTU9PTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVJc1NpZ25Ub2RheShmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvd1NpZ25EYXkoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BZCgpe1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSkge1xyXG5cclxuIFxyXG5cclxuXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkua3VhaXN1R3VhamlTaGlwaW49IHR0LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzNpaWZncmd0OGYyNTE1bTFzZydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkua3VhaXN1R3VhamlTaGlwaW4ub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmt1YWlzdUd1YWppU2hpcGluLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmt1YWlzdUd1YWppU2hpcGluLm9mZkNsb3NlKCk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkua3VhaXN1R3VhamlTaGlwaW4uc2hvdygpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5rdWFpc3VHdWFqaVNoaXBpbi5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmt1YWlzdUd1YWppU2hpcGluLnNob3coKSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuW5v+WRiuaLieWPluWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmt1YWlzdUd1YWppU2hpcGluLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm9uU2hpcGluQ29tcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmt1YWlzdUd1YWppU2hpcGluLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25TaGlwaW5Db21wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2hpcGluQ29tcCgpOiB2b2lkIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65bm/5ZGK5oyJ6ZKu54K55Ye7KTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6aKG5Y+W5oyC5py65aWW5YqxMuasoSk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumihuWPluW/q+mAn+aMguacujHmrKEpO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuRmFzdE9mZmxpbmUsMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVGYXN0R3VhSmlOdW0oZ2VtTnVtLTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkRGF0YXM9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkcyg1KjYwKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRNYXAgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhcy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmV3YXJkTWFwLmhhcyh2LnJld2FyZF9pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gcmV3YXJkTWFwLmdldCh2LnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSArPSB2LnJld2FyZF9udW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZE1hcC5zZXQodi5yZXdhcmRfaWQsbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTWFwLnNldCh2LnJld2FyZF9pZCx2LnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZE1hcC5mb3JFYWNoKChudW0saWQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8cmV3YXJkRGF0YXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCByZD1yZXdhcmREYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJkTm9kZXMpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuQWRGYXN0T2ZmbGluZSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0blJvb3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxSZWRFdmVudFR5cGUuQnRuX01haW5fR3VhamlfQnRuX0Zhc3QsZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5GYXN0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhbkZhc3RPZmZsaW5lLDApID09IDApe1xyXG4gICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtMjAwKSl7XHJcbiAgICAgICAgICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65raI6ICX55qE6ZK755+z5pWw6YePLGNvc3RHZW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuRmFzdE9mZmxpbmUsMSk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumihuWPluW/q+mAn+aMguacujHmrKEpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7pooblj5bmjILmnLrlpZblirEy5qyhKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUZhc3RHdWFKaU51bShnZW1OdW0tMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5pbmdOdW0oKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmREYXRhcz1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRzKDUqNjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZE1hcCA9IG5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZERhdGFzLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXdhcmRNYXAuaGFzKHYucmV3YXJkX2lkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSByZXdhcmRNYXAuZ2V0KHYucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtICs9IHYucmV3YXJkX251bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTWFwLnNldCh2LnJld2FyZF9pZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRNYXAuc2V0KHYucmV3YXJkX2lkLHYucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGxldCByZE5vZGVzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkTWFwLmZvckVhY2goKG51bSxpZCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGlkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGlkLG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmROb2Rlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPHJld2FyZERhdGFzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgcmQ9cmV3YXJkRGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZE5vZGVzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChyZE5vZGVzKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA0MSkpO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMjApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVGFza01hbmdlci5nZXRJbnN0YW5jZSgpLnNldFRhc2tJdGVtKFRhc2tJdGVtLuW/q+mAn+aMguacujHmrKEpO1xyXG4gICAgICAgIC8vIFRhc2tNYW5nZXIuZ2V0SW5zdGFuY2UoKS5zZXRUYXNrSXRlbShUYXNrSXRlbS7mlLblj5bmjILmnLrlpZblirEy5qyhKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65L2/55So5qyh5pWwKTtcclxuICAgICAgICAvLyBsZXQgZnJlZU51bT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEZyZWVGYXN0R3VhSmlOdW0oKTtcclxuICAgICAgICAvLyBsZXQgZ2VtTnVtPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0RmFzdEd1YUppTnVtKCk7XHJcbiAgICAgICAgLy8gaWYoZnJlZU51bT4wKXtcclxuICAgICAgICAvLyAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRnJlZUZhc3RHdWFKaU51bShmcmVlTnVtLTEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3dSZW1haW5pbmdOdW0oKTtcclxuICAgICAgICAvLyAgICAgbGV0IHJld2FyZERhdGFzPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZHMoMio2MCk7XHJcbiAgICAgICAgLy8gICAgIGxldCByZE5vZGVzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxyZXdhcmREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmQ9cmV3YXJkRGF0YXNbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICByZE5vZGVzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAocmROb2Rlcyk7XHJcbiAgICAgICAgLy8gICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9GYXN0KTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgaWYoZ2VtTnVtPjApe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGNvc3RHZW09MTUwLShnZW1OdW0qNTApO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLWNvc3RHZW0pKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65raI6ICX55qE6ZK755+z5pWw6YePLGNvc3RHZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVGYXN0R3VhSmlOdW0oZ2VtTnVtLTEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1JlbWFpbmluZ051bSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCByZXdhcmREYXRhcz1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRzKDIqNjApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCByZE5vZGVzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHJld2FyZERhdGFzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHJkPXJld2FyZERhdGFzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmROb2Rlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChyZE5vZGVzKTtcclxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguSW5zdWZmaWNpZW50X2dlbXMpKTtcclxuICAgICAgICAvLyAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5WaXAoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXlVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZW1haW5UaW1lKCk7XHJcbiAgICAgICAgfX0sMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpblRpbWUpO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihXWEFERW52bnQuS1VBSVNVR1VBSklTSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG4iXX0=