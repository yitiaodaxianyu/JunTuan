
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
var ApkManager_1 = require("../../Ads/ApkManager");
var CoinPop_1 = require("../../CoinPop");
var Constants_1 = require("../../Constants");
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
        ApkManager_1.default.getInstance().showBanner();
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
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            if (isTrue) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.快速挂机广告按钮点击);
                GameManager_1.default.getInstance().refreshGemShow();
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取挂机奖励2次);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取快速挂机1次);
                // TheStorageManager.getInstance().setItem(StorageKey.CanFastOffline,1);
                // GameData.getInstance().saveFastGuaJiNum(gemNum-1);
                _this.showRemainingNum();
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
                // for(let i=0; i<rewardDatas.length; i++){
                //     let rd=rewardDatas[i];
                //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
                //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
                //     rdNodes.push(item);
                // }
                GameManager_1.default.getInstance().showMultipleGetTip(rdNodes_1);
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanAdFastOffline, 1);
                _this.node.getChildByName("btnRoot").getChildByName("ad").active = false;
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_Guaji_Btn_Fast, false);
            }
        }), Constants_1.VIDEO_TYPE.Coin);
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
                var rewardMap_2 = new Map();
                rewardDatas.forEach(function (v, k) {
                    if (rewardMap_2.has(v.reward_id)) {
                        var num = rewardMap_2.get(v.reward_id);
                        num += v.reward_num;
                        rewardMap_2.set(v.reward_id, num);
                    }
                    else {
                        rewardMap_2.set(v.reward_id, v.reward_num);
                    }
                });
                var rdNodes_2 = new Array();
                rewardMap_2.forEach(function (num, id) {
                    var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
                    PropManager_1.PropManager.getInstance().changePropNum(id, num);
                    rdNodes_2.push(item);
                });
                // let rdNodes=new Array();
                // for(let i=0; i<rewardDatas.length; i++){
                //     let rd=rewardDatas[i];
                //     let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
                //     PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
                //     rdNodes.push(item);
                // }
                GameManager_1.default.getInstance().showMultipleGetTip(rdNodes_2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXFVpXFxGYXN0R3VhSmlVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFFOUMseUNBQW9DO0FBQ3BDLDZDQUE2QztBQUU3QyxpREFBNEM7QUFDNUMsZ0VBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsdUVBQWtFO0FBQ2xFLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCx5REFBc0Y7QUFDdEYsb0RBQStDO0FBQy9DLDhDQUF5RDtBQUV6RCxnREFBK0M7QUFHekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVc7SUFBcEQ7UUFBQSxxRUFxUkM7UUFuUkcsZ0JBQVUsR0FBVSxJQUFJLENBQUM7O0lBbVI3QixDQUFDO0lBalJHLDBCQUFJLEdBQUosVUFBSyxJQUFjO1FBQW5CLGlCQW9CQztRQW5CRyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUksMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFD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RC9CLE9BQU87T0FDYSxXQUFXLENBcVIvQjtJQUFELGtCQUFDO0NBclJELEFBcVJDLENBclJ3QyxxQkFBVyxHQXFSbkQ7a0JBclJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4uLy4uL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXN0R3VhSmlVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICB0aW1lX2xhYmVsOmNjLkxhYmVsPW51bGw7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGltZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdSZXdhcmRfQmdfMScpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuUmljaFRleHQpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExOSk7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW5UaW1lLDEpO1xyXG4gICAgICAgIHRoaXMuc2hvd1JlbWFpblRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5BZEZhc3RPZmZsaW5lLDApID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Sb290XCIpLmdldENoaWxkQnlOYW1lKFwiYWRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0blJvb3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICBiZy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIGJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd1JlbWFpbmluZ051bSgpe1xyXG4gICAgICAgIC8vIGxldCBsbT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBsZXQgZnJlZU51bT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEZyZWVGYXN0R3VhSmlOdW0oKTtcclxuICAgICAgICAvLyBsZXQgZ2VtTnVtPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0RmFzdEd1YUppTnVtKCk7XHJcbiAgICAgICAgLy8gbGV0IHRvdGFsTnVtPWZyZWVOdW0rZ2VtTnVtO1xyXG4gICAgICAgIC8vIGxldCBjb3N0R2VtPTE1MC0oZ2VtTnVtKjUwKTtcclxuICAgICAgICAvLyBsZXQgZ2VtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGdlbUljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5Sb290JykuZ2V0Q2hpbGRCeU5hbWUoXCJidG5GYXN0XCIpLmdldENoaWxkQnlOYW1lKFwiZ2VtSWNvblwiKTtcclxuICAgICAgICAvLyBsZXQgZ2VtVGV4dD1nZW1JY29uLmdldENoaWxkQnlOYW1lKCdnZW1OdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIGxldCB1c2VUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlVGV4dCcpO1xyXG5cclxuICAgICAgICAvLyBsZXQgYnRuRmFzdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkZhc3QnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JlbWFpblRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Vc2VzUmVtYWluaW5nVG9kYXkpK3RvdGFsTnVtO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGV4dDEnKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZz1cIjxiPjxjb2xvcj0jMjUzMTQ3IHNpemU9MjQ+XCIrbG0uZ2V0U3RyQnlUZXh0SWQoMjIwMDAyKStcIjogPC9jPjxjb2xvcj0jRjlFMDZFPjxvdXRsaW5lIGNvbG9yPSM4NjVCMkMgd2lkdGg9Mz48c2l6ZT0zMD4xMjAgbWluPC8+PC9vdXRsaW5lPjwvYz48L2I+XCI7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0ZXh0MicpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPVwiPGI+PG91dGxpbmUgY29sb3I9IzMzMjAzRiB3aWR0aD0zPjxjb2xvcj0jRUJEOUIxPlwiK2xtLmdldFN0ckJ5VGV4dElkKDkzMDAwMSkrXCI6IDI8L2M+PC9vdXRsaW5lPjwvYj5cIjtcclxuXHJcbiAgICAgICAgLy8gZ2VtVGV4dC5zdHJpbmc9Y29zdEdlbSsnJztcclxuICAgICAgICBcclxuICAgICAgICAvLyBpZihmcmVlTnVtPjApe1xyXG4gICAgICAgICAgICAvLyBnZW1JY29uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gdXNlVGV4dC54PWJ0bkZhc3Qubm9kZS54O1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBnZW1JY29uLmFjdGl2ZT1nZW1OdW0+MDtcclxuICAgICAgICAgICAgLy8gZ2VtVGV4dC5ub2RlLmNvbG9yPWdlbT49Y29zdEdlbT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIC8vIHVzZVRleHQueD1nZW1OdW0+MD8xODpidG5GYXN0Lm5vZGUueDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gYnRuRmFzdC5pbnRlcmFjdGFibGU9dG90YWxOdW0+MDtcclxuICAgICAgICAvLyB1c2VUZXh0LmNvbG9yPXRvdGFsTnVtPjA/Y2MuY29sb3IoMTI0LDgyLDEzKTpjYy5Db2xvci5XSElURTtcclxuICAgICAgICAvLyBpZih0b3RhbE51bSA+IDApe1xyXG4gICAgICAgICAgICAvLyB1c2VUZXh0LmNvbG9yID0gY2MuY29sb3IoNjMsIDQ1LCAzMyk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIHVzZVRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigxMzgsMTM4LDEzOCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkZhc3RcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dSZW1haW5UaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgczpzdHJpbmc7XHJcbiAgICAgICAgbGV0IG5vd1RpbWUgPSBEYXRlLm5vdygpIC8gMTAwMDtcclxuICAgICAgICBsZXQgcmVzaWR1ZVRpbWUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvbW9yb3daZXJvVGltZVN0YW1wLDApIC0gbm93VGltZTtcclxuICAgICAgICBpZihyZXNpZHVlVGltZSA8IDApe1xyXG4gICAgICAgICAgICByZXNpZHVlVGltZSA9ICgobmV3IERhdGUobmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKSkuZ2V0VGltZSgpKzg2NDAwMDApLyAxMDAwKSAtIG5vd1RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoaCA9IE1hdGguZmxvb3IocmVzaWR1ZVRpbWUgLyAoNjAqNjApKTtcclxuICAgICAgICBpZihoaCA8IDEwKXtcclxuICAgICAgICAgICAgcyA9ICcwJyArIGhoICsgJzonO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzID0gaGggKyc6JztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1tID0gTWF0aC5mbG9vcihyZXNpZHVlVGltZSAlICg2MCo2MCkvNjApO1xyXG4gICAgICAgIGlmKG1tIDwgMTApe1xyXG4gICAgICAgICAgICBzICs9ICcwJyArIG1tICsgJzonXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHMgKz0gbW0gKyAnOidcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNzID0gTWF0aC5mbG9vcihyZXNpZHVlVGltZSAlICg2MCo2MCklNjApXHJcbiAgICAgICAgaWYoc3MgPCAxMCl7XHJcbiAgICAgICAgICAgIHMgKz0gJzAnICsgc3NcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcyArPSBzc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwuc3RyaW5nPXM7XHJcbiAgICAgICAgLy8gaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5GYXN0T2ZmbGluZSwwKSA9PSAxKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgLy8gbGV0IGRhdGU9bmV3IERhdGUoKTtcclxuICAgICAgICAvLyBsZXQgY3VySG91cnM9ZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIC8vIGxldCBjdXJNaW49ZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgLy8gbGV0IGN1clNlYz1kYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAvLyBsZXQgcmVtYWluSG91cnM9MjQtY3VySG91cnMtMTtcclxuICAgICAgICAvLyBsZXQgcmVtYWluTWluPTYwLWN1ck1pbjtcclxuICAgICAgICAvLyBsZXQgcmVtYWluU2VjPTYwLWN1clNlYztcclxuICAgICAgICAvLyBsZXQgc2hpU3RyPScwJytyZW1haW5Ib3VycztcclxuICAgICAgICAvLyBpZihyZW1haW5Ib3Vycz49MTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzaGlTdHI9JycrcmVtYWluSG91cnM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBmZW5TdHI9JzAnK3JlbWFpbk1pbjtcclxuICAgICAgICAvLyBpZihyZW1haW5NaW4+PTEwKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgZmVuU3RyPScnK3JlbWFpbk1pbjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbGV0IG1pYW9TdHI9JzAnK3JlbWFpblNlYztcclxuICAgICAgICAvLyBpZihyZW1haW5TZWM+PTEwKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbWlhb1N0cj0nJytyZW1haW5TZWM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuY2hlY2tJc05ld0RheSgpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYocmVtYWluU2VjJTU9PTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVJc1NpZ25Ub2RheShmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvd1NpZ25EYXkoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BZCgpe1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKChpc1RydWUpPT57XHJcbiAgICAgICAgICAgIGlmKGlzVHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65bm/5ZGK5oyJ6ZKu54K55Ye7KTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6aKG5Y+W5oyC5py65aWW5YqxMuasoSk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumihuWPluW/q+mAn+aMguacujHmrKEpO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuRmFzdE9mZmxpbmUsMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVGYXN0R3VhSmlOdW0oZ2VtTnVtLTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkRGF0YXM9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkcyg1KjYwKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRNYXAgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhcy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmV3YXJkTWFwLmhhcyh2LnJld2FyZF9pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gcmV3YXJkTWFwLmdldCh2LnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSArPSB2LnJld2FyZF9udW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZE1hcC5zZXQodi5yZXdhcmRfaWQsbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTWFwLnNldCh2LnJld2FyZF9pZCx2LnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZE1hcC5mb3JFYWNoKChudW0saWQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8cmV3YXJkRGF0YXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCByZD1yZXdhcmREYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJkTm9kZXMpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuQWRGYXN0T2ZmbGluZSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0blJvb3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxSZWRFdmVudFR5cGUuQnRuX01haW5fR3VhamlfQnRuX0Zhc3QsZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksVklERU9fVFlQRS5Db2luKVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRmFzdCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5GYXN0T2ZmbGluZSwwKSA9PSAwKXtcclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTIwMCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuW/q+mAn+aMguacuua2iOiAl+eahOmSu+efs+aVsOmHjyxjb3N0R2VtKTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhbkZhc3RPZmZsaW5lLDEpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7pooblj5blv6vpgJ/mjILmnLox5qyhKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6aKG5Y+W5oyC5py65aWW5YqxMuasoSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVGYXN0R3VhSmlOdW0oZ2VtTnVtLTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkRGF0YXM9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkcyg1KjYwKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmRNYXAgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhcy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmV3YXJkTWFwLmhhcyh2LnJld2FyZF9pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtID0gcmV3YXJkTWFwLmdldCh2LnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSArPSB2LnJld2FyZF9udW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZE1hcC5zZXQodi5yZXdhcmRfaWQsbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTWFwLnNldCh2LnJld2FyZF9pZCx2LnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZE1hcC5mb3JFYWNoKChudW0saWQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShpZCxudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHJkTm9kZXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxyZXdhcmREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHJkPXJld2FyZERhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcmROb2Rlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAocmROb2Rlcyk7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNDEpKTtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTIwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRhc2tNYW5nZXIuZ2V0SW5zdGFuY2UoKS5zZXRUYXNrSXRlbShUYXNrSXRlbS7lv6vpgJ/mjILmnLox5qyhKTtcclxuICAgICAgICAvLyBUYXNrTWFuZ2VyLmdldEluc3RhbmNlKCkuc2V0VGFza0l0ZW0oVGFza0l0ZW0u5pS25Y+W5oyC5py65aWW5YqxMuasoSk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuW/q+mAn+aMguacuuS9v+eUqOasoeaVsCk7XHJcbiAgICAgICAgLy8gbGV0IGZyZWVOdW09R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRGcmVlRmFzdEd1YUppTnVtKCk7XHJcbiAgICAgICAgLy8gbGV0IGdlbU51bT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEZhc3RHdWFKaU51bSgpO1xyXG4gICAgICAgIC8vIGlmKGZyZWVOdW0+MCl7XHJcbiAgICAgICAgLy8gICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUZyZWVGYXN0R3VhSmlOdW0oZnJlZU51bS0xKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93UmVtYWluaW5nTnVtKCk7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXdhcmREYXRhcz1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRzKDIqNjApO1xyXG4gICAgICAgIC8vICAgICBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8cmV3YXJkRGF0YXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHJkPXJld2FyZERhdGFzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgcmROb2Rlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJkTm9kZXMpO1xyXG4gICAgICAgIC8vICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fRmFzdCk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGlmKGdlbU51bT4wKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBjb3N0R2VtPTE1MC0oZ2VtTnVtKjUwKTtcclxuICAgICAgICAvLyAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC1jb3N0R2VtKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuW/q+mAn+aMguacuua2iOiAl+eahOmSu+efs+aVsOmHjyxjb3N0R2VtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRmFzdEd1YUppTnVtKGdlbU51bS0xKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5pbmdOdW0oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgcmV3YXJkRGF0YXM9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkcygyKjYwKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgcmROb2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxyZXdhcmREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCByZD1yZXdhcmREYXRhc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJkTm9kZXMucHVzaChpdGVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAocmROb2Rlcyk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lkluc3VmZmljaWVudF9nZW1zKSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVmlwKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5VWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluVGltZSgpO1xyXG4gICAgICAgIH19LDApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnNob3dSZW1haW5UaW1lKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuIl19