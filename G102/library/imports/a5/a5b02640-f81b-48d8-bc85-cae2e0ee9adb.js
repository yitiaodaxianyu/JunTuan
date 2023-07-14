"use strict";
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