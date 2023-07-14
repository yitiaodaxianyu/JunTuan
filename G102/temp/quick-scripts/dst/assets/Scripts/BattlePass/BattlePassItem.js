
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/BattlePass/BattlePassItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5b02ZA+BtI2LyFyuLg7prb', 'BattlePassItem');
// Scripts/BattlePass/BattlePassItem.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropManager_1 = require("../Prop/PropManager");
var PropConfig_1 = require("../Prop/PropConfig");
var AudioConstants_1 = require("../Sound/AudioConstants");
var BattlePassData_1 = require("./BattlePassData");
var BattlePassManager_1 = require("./BattlePassManager");
var PayManager_1 = require("../Payment/PayManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var google_id = 'b501';
var BattlePassItem = /** @class */ (function (_super) {
    __extends(BattlePassItem, _super);
    function BattlePassItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_lock = null;
        _this.prefab_claimed = null;
        // @property(cc.Prefab)
        // mask:cc.Prefab = null;
        _this.id = 0;
        _this.pos_xx = [-205, 90, 205];
        _this.cur_level = 0;
        //刷新后回调
        _this.refresh_callback = null;
        //购买回调
        _this.buy_callback = null;
        return _this;
        // update (dt) {}
    }
    // private google_id:string = 'b501';
    BattlePassItem.prototype.init = function (id, loadLevel, clickCallback, buyCallback) {
        this.id = id;
        this.cur_level = loadLevel;
        this.refresh_callback = clickCallback;
        this.buy_callback = buyCallback;
        this.loadItem();
        this.refreshData();
    };
    BattlePassItem.prototype.loadItem = function () {
        var bpdm = BattlePassData_1.BattlePassDataManager.getInstance();
        // let boxM=GameManager.getInstance().box_json_data;
        var jsonData = bpdm.getJsonBattlePassData(this.id);
        var clickEvent = new cc.Component.EventHandler();
        clickEvent.target = this.node;
        clickEvent.component = 'BattlePassItem';
        clickEvent.handler = 'clickBtnClaim';
        // try{
        var item0 = PropManager_1.PropManager.getInstance().createPropItem(jsonData.FreeRewardItem, jsonData.FreeRewardNum, PropConfig_1.PropAction.Null);
        item0.getComponent(cc.Button).clickEvents.push(clickEvent);
        // let item0=boxM.createBoxItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum);
        this.node.addChild(item0);
        item0.x = this.pos_xx[0];
        item0.name = 'item0';
        var item1 = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, jsonData.SeniorRewardGem, PropConfig_1.PropAction.Null);
        item1.getComponent(cc.Button).clickEvents.push(clickEvent);
        // let item1=boxM.createBoxItem(PropId.Gem,jsonData.SeniorRewardGem);
        this.node.addChild(item1);
        item1.x = this.pos_xx[1];
        item1.name = 'item1';
        var item2 = PropManager_1.PropManager.getInstance().createPropItem(jsonData.SeniorRewardItem, jsonData.SeniorRewardNum, PropConfig_1.PropAction.Null);
        item2.getComponent(cc.Button).clickEvents.push(clickEvent);
        // let item2=boxM.createBoxItem(jsonData.SeniorRewardItem,jsonData.SeniorRewardNum);
        this.node.addChild(item2);
        item2.x = this.pos_xx[2];
        item2.name = 'item2';
        // }catch(error){
        //     console.log(error,jsonData)
        // }
    };
    BattlePassItem.prototype.refreshData = function () {
        //是否需要加锁
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        var isLock = curLevel < this.cur_level;
        if (isLock) {
            this.addLock(0);
            this.addLock(1);
            this.addLock(2);
            // let mask = cc.instantiate(this.mask);
            // this.node.addChild(mask);
        }
        else {
            this.removeLock(0);
            if (isBuy) {
                this.removeLock(1);
                this.removeLock(2);
            }
            else {
                this.addLock(1);
                this.addLock(2);
            }
        }
        //设置领取状态
        var btnClaim = this.node.getChildByName('btnClaim').getComponent(cc.Button);
        var claimText = this.node.getChildByName('claimText').getComponent(TextLanguage_1.default);
        claimText.node.zIndex = 1;
        var claimState0 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id);
        var claimState1 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Buy, this.id);
        claimText.setTextId(100011);
        var isClaimOk = claimState0 > 0 && claimState1 > 0;
        btnClaim.interactable = !isLock && !isClaimOk;
        if (claimState0 > 0 && claimState1 <= 0) {
            // claimText.setLanguageIndex(LanguageIndex.ContinueClaim);
        }
        claimText.node.color = btnClaim.interactable ? cc.color(124, 82, 13) : cc.color(91, 91, 91);
        if (isClaimOk) {
            claimText.setTextId(100013);
            claimText.node.color = cc.color(242, 225, 172);
            btnClaim.node.active = false;
        }
        if (claimState0 > 0) {
            this.addClaim(0);
        }
        if (claimState1 > 0) {
            this.addClaim(1);
            this.addClaim(2);
        }
    };
    BattlePassItem.prototype.addLock = function (index) {
        var lock = this.node.getChildByName('lock' + index);
        if (!lock) {
            var item = this.node.getChildByName('item' + index);
            var lock_1 = cc.instantiate(this.prefab_lock);
            lock_1.x = item.x + item.width / 2 * item.scaleX;
            lock_1.y = item.y + item.height / 2 * item.scaleY;
            lock_1.name = 'lock' + index;
            this.node.addChild(lock_1);
        }
    };
    BattlePassItem.prototype.removeLock = function (index) {
        var lock = this.node.getChildByName('lock' + index);
        if (lock) {
            lock.removeFromParent();
        }
    };
    BattlePassItem.prototype.addClaim = function (index) {
        var claimed = this.node.getChildByName('claimed' + index);
        if (!claimed) {
            var item = this.node.getChildByName('item' + index);
            var claimed_1 = cc.instantiate(this.prefab_claimed);
            claimed_1.x = item.x;
            claimed_1.y = item.y;
            claimed_1.name = 'claimed' + index;
            this.node.addChild(claimed_1);
        }
    };
    BattlePassItem.prototype.removeClaim = function (index) {
        var claimed = this.node.getChildByName('claimed' + index);
        if (claimed) {
            claimed.removeFromParent();
        }
    };
    BattlePassItem.prototype.toClaimFree = function (isShow) {
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var isUnLock = curLevel >= this.cur_level;
        var bpdm = BattlePassData_1.BattlePassDataManager.getInstance();
        // let boxM=GameManager.getInstance().box_json_data;
        var jsonData = bpdm.getJsonBattlePassData(this.id);
        var state0 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id);
        var item = null;
        if (isUnLock && state0 <= 0) {
            // let rd=boxM.getRewardByid(jsonData.FreeRewardItem,jsonData.FreeRewardNum)
            // if(rd){
            //     item=boxM.createBoxItem(rd.reward_id,rd.reward_num);
            // }else{
            //     item=boxM.createBoxItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum,true);
            // }
            item = PropManager_1.PropManager.getInstance().createPropItem(jsonData.FreeRewardItem, jsonData.FreeRewardNum);
            BattlePassManager_1.BattlePassManager.saveClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id, 1);
            if (isShow)
                GameManager_1.default.getInstance().showGetTip(item);
            //设置领取状态
            BattlePassManager_1.BattlePassManager.saveClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id, 1);
            this.refreshData();
        }
        return item;
    };
    BattlePassItem.prototype.toClaimAll = function (isShow) {
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        var isUnLock = curLevel >= this.cur_level;
        var bpdm = BattlePassData_1.BattlePassDataManager.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var jsonData = bpdm.getJsonBattlePassData(this.id);
        var nodes = new Array();
        var state0 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id);
        if (isUnLock && state0 <= 0) {
            PM.changePropNum(jsonData.FreeRewardItem, jsonData.FreeRewardNum);
            var item0 = PM.createPropItem(jsonData.FreeRewardItem, jsonData.FreeRewardNum, PropConfig_1.PropAction.Look);
            nodes.push(item0);
            BattlePassManager_1.BattlePassManager.saveClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id, 1);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令免费奖励领取_x级 + BattlePassData_1.BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
        }
        var state1 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Buy, this.id);
        if (isBuy && isUnLock && state1 <= 0) {
            var item1 = PM.createPropItem(PropConfig_1.PropId.Gem, jsonData.SeniorRewardGem);
            var item2 = PM.createPropItem(jsonData.SeniorRewardItem, jsonData.SeniorRewardNum, PropConfig_1.PropAction.Look);
            PM.changePropNum(PropConfig_1.PropId.Gem, jsonData.SeniorRewardGem);
            PM.changePropNum(jsonData.SeniorRewardItem, jsonData.SeniorRewardNum);
            nodes.push(item1);
            nodes.push(item2);
            BattlePassManager_1.BattlePassManager.saveClaimState(BattlePassManager_1.BattlePassClaimType.Buy, this.id, 1);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令高级奖励领取_x级 + BattlePassData_1.BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
        }
        if (isShow && nodes.length > 0)
            GameManager_1.default.getInstance().showMultipleGetTip(nodes);
        //设置领取状态
        this.refreshData();
        return nodes;
    };
    BattlePassItem.prototype.clickBtnClaim = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //在这里领取东西，并且刷新
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        if (isBuy) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令高级奖励点击_x级 + BattlePassData_1.BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
            this.toClaimAll(true);
            if (this.refresh_callback) {
                this.refresh_callback(this.id);
            }
        }
        else {
            var state = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Free, this.id);
            if (state <= 0) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令免费奖励点击_x级 + BattlePassData_1.BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
                this.toClaimFree(true);
                if (this.refresh_callback) {
                    this.refresh_callback(this.id);
                }
            }
            else {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令继续领取_x级 + BattlePassData_1.BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
                //弹出支付
                //cc.log('弹出支付提示')
                GameManager_1.default.getInstance().showBuyDialog(LanguageManager_1.default.getInstance().getStrByTextId(910002), function () {
                    ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                            if (isPay) {
                                PayManager_1.PayManager.getInstance().addPayNum(google_id);
                                BattlePassManager_1.BattlePassManager.refreshBuyState();
                                if (_this.buy_callback) {
                                    _this.buy_callback();
                                }
                            }
                        } }, google_id);
                }, null, 2, PayManager_1.PayManager.getInstance().getPayInfo(google_id).price, PayManager_1.PayManager.getInstance().getPayInfo(google_id).currency);
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], BattlePassItem.prototype, "prefab_lock", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassItem.prototype, "prefab_claimed", void 0);
    BattlePassItem = __decorate([
        ccclass
    ], BattlePassItem);
    return BattlePassItem;
}(cc.Component));
exports.default = BattlePassItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQmF0dGxlUGFzc1xcQmF0dGxlUGFzc0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCxtREFBa0Q7QUFDbEQsaURBQXdEO0FBQ3hELDBEQUFxRDtBQUNyRCxtREFBeUQ7QUFDekQseURBQTZFO0FBQzdFLG9EQUFtRDtBQUNuRCw4REFBeUQ7QUFHbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBTSxTQUFTLEdBQVUsTUFBTSxDQUFDO0FBR2hDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBMlBDO1FBeFBHLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBRWpDLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFFekIsUUFBRSxHQUFRLENBQUMsQ0FBQztRQUNaLFlBQU0sR0FBVSxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixlQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLE9BQU87UUFDUCxzQkFBZ0IsR0FBVSxJQUFJLENBQUM7UUFDL0IsTUFBTTtRQUNOLGtCQUFZLEdBQVUsSUFBSSxDQUFDOztRQXlPM0IsaUJBQWlCO0lBQ3JCLENBQUM7SUF4T0cscUNBQXFDO0lBRXJDLDZCQUFJLEdBQUosVUFBSyxFQUFTLEVBQUMsU0FBZ0IsRUFBQyxhQUFzQixFQUFDLFdBQXFCO1FBQ3hFLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLGFBQWEsQ0FBQztR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Q0FDdkI7NkJBQ0o7d0JBQ0wsQ0FBQyxFQUFDLEVBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ2pCLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMxSDtTQUNKO0lBQ0wsQ0FBQztJQXJQRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQ2E7SUFOaEIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTJQbEM7SUFBRCxxQkFBQztDQTNQRCxBQTJQQyxDQTNQMkMsRUFBRSxDQUFDLFNBQVMsR0EyUHZEO2tCQTNQb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4vQmF0dGxlUGFzc0RhdGFcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0NsYWltVHlwZSwgQmF0dGxlUGFzc01hbmFnZXIgfSBmcm9tIFwiLi9CYXR0bGVQYXNzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgZ29vZ2xlX2lkOnN0cmluZyA9ICdiNTAxJztcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHRsZVBhc3NJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2xvY2s6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9jbGFpbWVkOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBtYXNrOmNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIGlkOm51bWJlcj0wO1xyXG4gICAgcG9zX3h4Om51bWJlcltdPVstMjA1LDkwLDIwNV07XHJcbiAgICBjdXJfbGV2ZWw6bnVtYmVyPTA7XHJcbiAgICAvL+WIt+aWsOWQjuWbnuiwg1xyXG4gICAgcmVmcmVzaF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLy/otK3kubDlm57osINcclxuICAgIGJ1eV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG5cclxuICAgIC8vIHByaXZhdGUgZ29vZ2xlX2lkOnN0cmluZyA9ICdiNTAxJztcclxuXHJcbiAgICBpbml0KGlkOm51bWJlcixsb2FkTGV2ZWw6bnVtYmVyLGNsaWNrQ2FsbGJhY2s6RnVuY3Rpb24sYnV5Q2FsbGJhY2s/OkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmlkPWlkO1xyXG4gICAgICAgIHRoaXMuY3VyX2xldmVsPWxvYWRMZXZlbDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hfY2FsbGJhY2s9Y2xpY2tDYWxsYmFjaztcclxuICAgICAgICB0aGlzLmJ1eV9jYWxsYmFjaz1idXlDYWxsYmFjaztcclxuICAgICAgICB0aGlzLmxvYWRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJdGVtKCl7XHJcbiAgICAgICAgbGV0IGJwZG09QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gbGV0IGJveE09R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3hfanNvbl9kYXRhO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1icGRtLmdldEpzb25CYXR0bGVQYXNzRGF0YSh0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgbGV0IGNsaWNrRXZlbnQ9bmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBjbGlja0V2ZW50LnRhcmdldD10aGlzLm5vZGU7XHJcbiAgICAgICAgY2xpY2tFdmVudC5jb21wb25lbnQ9J0JhdHRsZVBhc3NJdGVtJztcclxuICAgICAgICBjbGlja0V2ZW50LmhhbmRsZXI9J2NsaWNrQnRuQ2xhaW0nO1xyXG5cclxuICAgICAgICAvLyB0cnl7XHJcbiAgICAgICAgbGV0IGl0ZW0wPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oanNvbkRhdGEuRnJlZVJld2FyZEl0ZW0sanNvbkRhdGEuRnJlZVJld2FyZE51bSxQcm9wQWN0aW9uLk51bGwpO1xyXG5cclxuICAgICAgICBpdGVtMC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBsZXQgaXRlbTA9Ym94TS5jcmVhdGVCb3hJdGVtKGpzb25EYXRhLkZyZWVSZXdhcmRJdGVtLGpzb25EYXRhLkZyZWVSZXdhcmROdW0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtMCk7XHJcbiAgICAgICAgaXRlbTAueD10aGlzLnBvc194eFswXTtcclxuICAgICAgICBpdGVtMC5uYW1lPSdpdGVtMCc7XHJcbiAgICAgICAgbGV0IGl0ZW0xPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmRHZW0sUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICBpdGVtMS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgIC8vIGxldCBpdGVtMT1ib3hNLmNyZWF0ZUJveEl0ZW0oUHJvcElkLkdlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmRHZW0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtMSk7XHJcbiAgICAgICAgaXRlbTEueD10aGlzLnBvc194eFsxXTtcclxuICAgICAgICBpdGVtMS5uYW1lPSdpdGVtMSc7XHJcbiAgICAgICAgbGV0IGl0ZW0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oanNvbkRhdGEuU2VuaW9yUmV3YXJkSXRlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmROdW0sUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICBpdGVtMi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgIC8vIGxldCBpdGVtMj1ib3hNLmNyZWF0ZUJveEl0ZW0oanNvbkRhdGEuU2VuaW9yUmV3YXJkSXRlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmROdW0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtMik7XHJcbiAgICAgICAgaXRlbTIueD10aGlzLnBvc194eFsyXTtcclxuICAgICAgICBpdGVtMi5uYW1lPSdpdGVtMic7XHJcbiAgICAgICAgLy8gfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZXJyb3IsanNvbkRhdGEpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7ICAgICAgICBcclxuICAgICAgICAvL+aYr+WQpumcgOimgeWKoOmUgVxyXG4gICAgICAgIGxldCBjdXJMZXZlbD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDdXJMZXZlbCgpO1xyXG4gICAgICAgIGxldCBpc0J1eT1CYXR0bGVQYXNzTWFuYWdlci5pc19idXk7XHJcbiAgICAgICAgbGV0IGlzTG9jaz1jdXJMZXZlbDx0aGlzLmN1cl9sZXZlbDtcclxuICAgICAgICBpZihpc0xvY2spe1xyXG4gICAgICAgICAgICB0aGlzLmFkZExvY2soMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTG9jaygxKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRMb2NrKDIpO1xyXG4gICAgICAgICAgICAvLyBsZXQgbWFzayA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWFzayk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVMb2NrKDApO1xyXG4gICAgICAgICAgICBpZihpc0J1eSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMb2NrKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMb2NrKDIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9jaygxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9jaygyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iuvue9rumihuWPlueKtuaAgVxyXG4gICAgICAgIGxldCBidG5DbGFpbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkNsYWltJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgbGV0IGNsYWltVGV4dD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NsYWltVGV4dCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpO1xyXG4gICAgICAgIGNsYWltVGV4dC5ub2RlLnpJbmRleD0xO1xyXG4gICAgICAgIGxldCBjbGFpbVN0YXRlMD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSx0aGlzLmlkKTtcclxuICAgICAgICBsZXQgY2xhaW1TdGF0ZTE9QmF0dGxlUGFzc01hbmFnZXIuZ2V0Q2xhaW1TdGF0ZShCYXR0bGVQYXNzQ2xhaW1UeXBlLkJ1eSx0aGlzLmlkKTtcclxuICAgICAgICBjbGFpbVRleHQuc2V0VGV4dElkKDEwMDAxMSk7XHJcbiAgICAgICAgbGV0IGlzQ2xhaW1Paz1jbGFpbVN0YXRlMD4wJiZjbGFpbVN0YXRlMT4wO1xyXG4gICAgICAgIGJ0bkNsYWltLmludGVyYWN0YWJsZT0haXNMb2NrJiYhaXNDbGFpbU9rO1xyXG4gICAgICAgIGlmKGNsYWltU3RhdGUwPjAmJmNsYWltU3RhdGUxPD0wKXtcclxuICAgICAgICAgICAgLy8gY2xhaW1UZXh0LnNldExhbmd1YWdlSW5kZXgoTGFuZ3VhZ2VJbmRleC5Db250aW51ZUNsYWltKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhaW1UZXh0Lm5vZGUuY29sb3I9YnRuQ2xhaW0uaW50ZXJhY3RhYmxlP2NjLmNvbG9yKDEyNCw4MiwxMyk6Y2MuY29sb3IoOTEsOTEsOTEpO1xyXG4gICAgICAgIGlmKGlzQ2xhaW1Payl7XHJcbiAgICAgICAgICAgIGNsYWltVGV4dC5zZXRUZXh0SWQoMTAwMDEzKTtcclxuICAgICAgICAgICAgY2xhaW1UZXh0Lm5vZGUuY29sb3I9Y2MuY29sb3IoMjQyLDIyNSwxNzIpO1xyXG4gICAgICAgICAgICBidG5DbGFpbS5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2xhaW1TdGF0ZTA+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhaW0oMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNsYWltU3RhdGUxPjApe1xyXG4gICAgICAgICAgICB0aGlzLmFkZENsYWltKDEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENsYWltKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRMb2NrKGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGxvY2s9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2NrJytpbmRleCk7XHJcbiAgICAgICAgaWYoIWxvY2spe1xyXG4gICAgICAgICAgICBsZXQgaXRlbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nK2luZGV4KTsgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbG9jaz1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9sb2NrKTtcclxuICAgICAgICAgICAgbG9jay54PWl0ZW0ueCtpdGVtLndpZHRoLzIqaXRlbS5zY2FsZVg7XHJcbiAgICAgICAgICAgIGxvY2sueT1pdGVtLnkraXRlbS5oZWlnaHQvMippdGVtLnNjYWxlWTtcclxuICAgICAgICAgICAgbG9jay5uYW1lPSdsb2NrJytpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGxvY2spO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUxvY2soaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBsZXQgbG9jaz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvY2snK2luZGV4KTtcclxuICAgICAgICBpZihsb2NrKXtcclxuICAgICAgICAgICAgbG9jay5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENsYWltKGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGNsYWltZWQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjbGFpbWVkJytpbmRleCk7XHJcbiAgICAgICAgaWYoIWNsYWltZWQpe1xyXG4gICAgICAgICAgICBsZXQgaXRlbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nK2luZGV4KTtcclxuICAgICAgICAgICAgbGV0IGNsYWltZWQ9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfY2xhaW1lZCk7XHJcbiAgICAgICAgICAgIGNsYWltZWQueD1pdGVtLng7XHJcbiAgICAgICAgICAgIGNsYWltZWQueT1pdGVtLnk7XHJcbiAgICAgICAgICAgIGNsYWltZWQubmFtZT0nY2xhaW1lZCcraW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChjbGFpbWVkKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDbGFpbShpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBjbGFpbWVkPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2xhaW1lZCcraW5kZXgpO1xyXG4gICAgICAgIGlmKGNsYWltZWQpe1xyXG4gICAgICAgICAgICBjbGFpbWVkLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9DbGFpbUZyZWUoaXNTaG93OmJvb2xlYW4pOmNjLk5vZGV7ICAgICAgICBcclxuICAgICAgICBsZXQgY3VyTGV2ZWw9QmF0dGxlUGFzc01hbmFnZXIuZ2V0Q3VyTGV2ZWwoKTtcclxuICAgICAgICBsZXQgaXNVbkxvY2s9Y3VyTGV2ZWw+PXRoaXMuY3VyX2xldmVsO1xyXG4gICAgICAgIGxldCBicGRtPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGxldCBib3hNPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYm94X2pzb25fZGF0YTtcclxuICAgICAgICBsZXQganNvbkRhdGE9YnBkbS5nZXRKc29uQmF0dGxlUGFzc0RhdGEodGhpcy5pZCk7XHJcbiAgICAgICAgbGV0IHN0YXRlMD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSx0aGlzLmlkKTtcclxuICAgICAgICBsZXQgaXRlbT1udWxsO1xyXG4gICAgICAgIGlmKGlzVW5Mb2NrJiZzdGF0ZTA8PTApe1xyXG4gICAgICAgICAgICAvLyBsZXQgcmQ9Ym94TS5nZXRSZXdhcmRCeWlkKGpzb25EYXRhLkZyZWVSZXdhcmRJdGVtLGpzb25EYXRhLkZyZWVSZXdhcmROdW0pXHJcbiAgICAgICAgICAgIC8vIGlmKHJkKXtcclxuICAgICAgICAgICAgLy8gICAgIGl0ZW09Ym94TS5jcmVhdGVCb3hJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBpdGVtPWJveE0uY3JlYXRlQm94SXRlbShqc29uRGF0YS5GcmVlUmV3YXJkSXRlbSxqc29uRGF0YS5GcmVlUmV3YXJkTnVtLHRydWUpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGpzb25EYXRhLkZyZWVSZXdhcmRJdGVtLGpzb25EYXRhLkZyZWVSZXdhcmROdW0pO1xyXG4gICAgICAgICAgICBCYXR0bGVQYXNzTWFuYWdlci5zYXZlQ2xhaW1TdGF0ZShCYXR0bGVQYXNzQ2xhaW1UeXBlLkZyZWUsdGhpcy5pZCwxKTtcclxuICAgICAgICAgICAgaWYoaXNTaG93KVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgIC8v6K6+572u6aKG5Y+W54q25oCBXHJcbiAgICAgICAgICAgIEJhdHRsZVBhc3NNYW5hZ2VyLnNhdmVDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSx0aGlzLmlkLDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRvQ2xhaW1BbGwoaXNTaG93OmJvb2xlYW4pOmNjLk5vZGVbXXtcclxuICAgICAgICBsZXQgY3VyTGV2ZWw9QmF0dGxlUGFzc01hbmFnZXIuZ2V0Q3VyTGV2ZWwoKTtcclxuICAgICAgICBsZXQgaXNCdXk9QmF0dGxlUGFzc01hbmFnZXIuaXNfYnV5O1xyXG4gICAgICAgIGxldCBpc1VuTG9jaz1jdXJMZXZlbD49dGhpcy5jdXJfbGV2ZWw7XHJcblxyXG4gICAgICAgIGxldCBicGRtPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBQTT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1icGRtLmdldEpzb25CYXR0bGVQYXNzRGF0YSh0aGlzLmlkKTtcclxuICAgICAgICBsZXQgbm9kZXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IHN0YXRlMD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSx0aGlzLmlkKTtcclxuICAgICAgICBpZihpc1VuTG9jayYmc3RhdGUwPD0wKXtcclxuICAgICAgICAgICAgUE0uY2hhbmdlUHJvcE51bShqc29uRGF0YS5GcmVlUmV3YXJkSXRlbSxqc29uRGF0YS5GcmVlUmV3YXJkTnVtKVxyXG4gICAgICAgICAgICBsZXQgaXRlbTA9UE0uY3JlYXRlUHJvcEl0ZW0oanNvbkRhdGEuRnJlZVJld2FyZEl0ZW0sanNvbkRhdGEuRnJlZVJld2FyZE51bSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICBub2Rlcy5wdXNoKGl0ZW0wKTtcclxuICAgICAgICAgICAgQmF0dGxlUGFzc01hbmFnZXIuc2F2ZUNsYWltU3RhdGUoQmF0dGxlUGFzc0NsYWltVHlwZS5GcmVlLHRoaXMuaWQsMSk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TlhY3otLnlpZblirHpooblj5ZfeOe6pytCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCYXR0bGVQYXNzTGV2ZWwodGhpcy5pZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhdGUxPUJhdHRsZVBhc3NNYW5hZ2VyLmdldENsYWltU3RhdGUoQmF0dGxlUGFzc0NsYWltVHlwZS5CdXksdGhpcy5pZCk7XHJcbiAgICAgICAgaWYoaXNCdXkmJmlzVW5Mb2NrJiZzdGF0ZTE8PTApe1xyXG4gICAgICAgICAgICBsZXQgaXRlbTE9UE0uY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmRHZW0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTI9UE0uY3JlYXRlUHJvcEl0ZW0oanNvbkRhdGEuU2VuaW9yUmV3YXJkSXRlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmROdW0sUHJvcEFjdGlvbi5Mb29rKTsgICAgICAgXHJcbiAgICAgICAgICAgIFBNLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmRHZW0pXHJcbiAgICAgICAgICAgIFBNLmNoYW5nZVByb3BOdW0oanNvbkRhdGEuU2VuaW9yUmV3YXJkSXRlbSxqc29uRGF0YS5TZW5pb3JSZXdhcmROdW0pICAgICAgICBcclxuICAgICAgICAgICAgbm9kZXMucHVzaChpdGVtMSk7XHJcbiAgICAgICAgICAgIG5vZGVzLnB1c2goaXRlbTIpO1xyXG4gICAgICAgICAgICBCYXR0bGVQYXNzTWFuYWdlci5zYXZlQ2xhaW1TdGF0ZShCYXR0bGVQYXNzQ2xhaW1UeXBlLkJ1eSx0aGlzLmlkLDEpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6auY57qn5aWW5Yqx6aKG5Y+WX3jnuqcrQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmF0dGxlUGFzc0xldmVsKHRoaXMuaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNTaG93JiZub2Rlcy5sZW5ndGg+MClcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAobm9kZXMpO1xyXG4gICAgICAgIC8v6K6+572u6aKG5Y+W54q25oCBXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiBub2RlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsYWltKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvL+WcqOi/memHjOmihuWPluS4nOilv++8jOW5tuS4lOWIt+aWsFxyXG4gICAgICAgIGxldCBpc0J1eT1CYXR0bGVQYXNzTWFuYWdlci5pc19idXk7XHJcbiAgICAgICAgaWYoaXNCdXkpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6auY57qn5aWW5Yqx54K55Ye7X3jnuqcrQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmF0dGxlUGFzc0xldmVsKHRoaXMuaWQpKTtcclxuICAgICAgICAgICAgdGhpcy50b0NsYWltQWxsKHRydWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLnJlZnJlc2hfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoX2NhbGxiYWNrKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzdGF0ZT1CYXR0bGVQYXNzTWFuYWdlci5nZXRDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSx0aGlzLmlkKTtcclxuICAgICAgICAgICAgaWYoc3RhdGU8PTApe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOWFjei0ueWlluWKseeCueWHu19457qnK0JhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhdHRsZVBhc3NMZXZlbCh0aGlzLmlkKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvQ2xhaW1GcmVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWZyZXNoX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hfY2FsbGJhY2sodGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOe7p+e7remihuWPll9457qnK0JhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhdHRsZVBhc3NMZXZlbCh0aGlzLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAvL+W8ueWHuuaUr+S7mFxyXG4gICAgICAgICAgICAgICAgLy9jYy5sb2coJ+W8ueWHuuaUr+S7mOaPkOekuicpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdXlEaWFsb2coTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoOTEwMDAyKSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtyZXN1bHQ6KGlzUGF5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzUGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0oZ29vZ2xlX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZVBhc3NNYW5hZ2VyLnJlZnJlc2hCdXlTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5idXlfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9fSxnb29nbGVfaWQpXHJcbiAgICAgICAgICAgICAgICB9LG51bGwsMixQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbyhnb29nbGVfaWQpLnByaWNlLFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKGdvb2dsZV9pZCkuY3VycmVuY3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19