
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/Ui/OfflineUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70aa5YBs+BBqJMVGmnlvfoN', 'OfflineUi');
// Scripts/GuaJi/Ui/OfflineUi.ts

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
var AdManager_1 = require("../../Ads/AdManager");
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
var EquipmentManager_1 = require("../../Equipment/EquipmentManager");
var GameManager_1 = require("../../GameManager");
var OfflineRevenue_1 = require("../../JsonData/OfflineRevenue");
var LevelManager_1 = require("../../Level/LevelManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropManager_1 = require("../../Prop/PropManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var EventManager_1 = require("../../Tools/EventManager");
var UIComponent_1 = require("../../UI/UIComponent");
var UIManager_1 = require("../../UI/UIManager");
var UIConfig_1 = require("../../UI/UIConfig");
var FastGuaJiUi_1 = require("./FastGuaJiUi");
var MyTool_1 = require("../../Tools/MyTool");
var TaskManager_1 = require("../../Task/TaskManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OfflineUi = /** @class */ (function (_super) {
    __extends(OfflineUi, _super);
    function OfflineUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_num = null;
        _this.sp_vip = null; //0=金币,1=英雄经验，2=玩家经验
        _this.reward_num0 = 60;
        _this.reward_num1 = 60;
        _this.reward_num2 = 60;
        _this.reward_equip_list = [];
        _this.reward_equip_num = [];
        _this.prop_reward = null;
        return _this;
    }
    OfflineUi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.prop_reward = new Map();
    };
    OfflineUi.prototype.onEnable = function () {
        this.showGuaJiTime();
        this.schedule(this.showGuaJiTime, 1);
        ApkManager_1.default.getInstance().showBanner();
        this.showRewardList();
    };
    OfflineUi.prototype.showGuaJiTime = function () {
        var offsetSec = OfflineRevenue_1.OfflineRevenueManager.getGuaJiSec();
        var shi = Math.floor(offsetSec / 3600);
        var shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        var fen = Math.floor((offsetSec - shi * 3600) / 60);
        var fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        var miao = offsetSec % 60;
        var miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        var timeLabel = this.node.getChildByName('timeLabel').getComponent(cc.Label);
        timeLabel.string = LanguageManager_1.default.getInstance().getStrByTextId(100117) + shiStr + ':' + fenStr + ':' + miaoStr;
        // let timeProgressBar=this.node.getChildByName('timeProgressBar');
        // timeProgressBar.getComponent(cc.ProgressBar).progress=offsetSec/(60*60*8);
        //let level=GameData.getInstance().finish_level;  
        var offsetMin = Math.floor(offsetSec / 60);
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        var maxMin = OfflineRevenue_1.OfflineRevenueManager.getInstance().getTime(level);
        if (offsetMin > maxMin) {
            offsetMin = maxMin;
        }
        if (offsetMin < 0) {
            offsetMin = 0;
        }
        var jsonData = OfflineRevenue_1.OfflineRevenueManager.getInstance().getJsonOfflineRevenue(level);
        var coinLabel = this.node.getChildByName('coinLabel').getComponent(cc.Label);
        coinLabel.string = MyTool_1.default.getCoinDanwei(jsonData.GetGold * 60) + '/h';
        var heroExpLabel = this.node.getChildByName('heroExpLabel').getComponent(cc.Label);
        heroExpLabel.string = jsonData.GetHeroExp + '/min';
        var userExpLabel = this.node.getChildByName('userExpLabel').getComponent(cc.Label);
        userExpLabel.string = jsonData.GetPromotion + '/min';
        var remainMin = offsetMin - OfflineRevenue_1.OfflineRevenueManager.getInstance().getRefreshTime();
        if (remainMin > 0) {
            this.showRewardList();
        }
        //设置领取按钮
        var btnGet = this.node.getChildByName('btnGet');
        var claimText = btnGet.getChildByName('claimText');
        // let btnVideo=this.node.getChildByName('btnVideo');
        var richText = this.node.getChildByName('richText');
        var needMin = Constants_1.IsDebug ? 1 : 60;
        if (offsetMin >= needMin) {
            // btnGet.x=0;
            // btnGet.y=-280;
            // btnGet.getComponent(cc.Button).interactable=true;
            // claimText.color=cc.color(63,45,33);
            // btnVideo.active=true;
            // richText.active=false;
        }
        else {
            // btnGet.x=0;
            // btnGet.y=-247;
            // btnGet.getComponent(cc.Button).interactable=false;
            // claimText.getComponent(cc.LabelOutline).color = cc.color(138,138,138);
            // btnVideo.active=false;
            // richText.active=true;
            // let str1=LanguageManager.getInstance().getString(LanguageIndex.You_can_claim_after);
            // offsetSec=3600-offsetSec;
            // let fen=Math.floor((offsetSec-shi*3600)/60);
            // fenStr='0'+fen;
            // if(fen>=10)
            // {
            //     fenStr=''+fen;
            // }
            // miao=offsetSec%60;
            // miaoStr='0'+miao;
            // if(miao>=10)
            // {
            //     miaoStr=''+miao;
            // }
            // let str2=fenStr+':'+miaoStr;
            // richText.ge tComponent(cc.RichText).string="<b>"+LanguageManager.getInstance().getString(LanguageIndex.You_can_claim_after)+"</b>";
        }
    };
    //显示挂机奖励的列表
    OfflineUi.prototype.showRewardList = function () {
        var rewardScrollview = this.node.getChildByName('rewardScrollview').getComponent(cc.ScrollView);
        var content = rewardScrollview.content;
        content.removeAllChildren();
        var numRoot = content.parent.getChildByName('num_root');
        numRoot.removeAllChildren();
        var equipRoot = content.parent.getChildByName('equip_root');
        equipRoot.removeAllChildren();
        //添加金币等资源列表
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        var jsonData = OfflineRevenue_1.OfflineRevenueManager.getInstance().getJsonOfflineRevenue(level);
        var offsetMin = OfflineRevenue_1.OfflineRevenueManager.getGuaJiMin();
        //金币
        var coinNum = jsonData.GetGold * offsetMin;
        //英雄经验
        var heroExpNum = jsonData.GetHeroExp * offsetMin;
        //玩家经验
        var userExpNum = jsonData.GetPlayerExp * offsetMin;
        //晋升石头
        var stonePromotion = Math.floor(jsonData.GetPromotion * offsetMin);
        //普通精炼石
        var jinglian1 = Math.floor(jsonData.GetOrdinaryEnhancementStone * offsetMin);
        //中级精炼石
        var jinglian2 = Math.floor(jsonData.GetIntermediateEnhancementStone * offsetMin);
        //高级精炼石
        var jinglian3 = Math.floor(jsonData.GetSeniorEnhancementStone * offsetMin);
        this.reward_num0 = coinNum;
        this.reward_num1 = heroExpNum;
        this.reward_num2 = userExpNum;
        //判断一下是否VIP
        var item = null;
        if (coinNum > 0) {
            coinNum = Math.floor(coinNum);
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, coinNum);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.Coin, coinNum);
        }
        if (heroExpNum > 0) {
            heroExpNum = Math.floor(heroExpNum);
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroExp, heroExpNum);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.HeroExp, heroExpNum);
        }
        if (userExpNum > 0) {
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.UserExp, userExpNum);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.UserExp, userExpNum);
        }
        if (stonePromotion > 0) {
            stonePromotion = Math.floor(stonePromotion);
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.HeroStone, stonePromotion);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.HeroStone, stonePromotion);
        }
        if (jinglian1 > 0) {
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.ExclusiveWeaponStone1, jinglian1);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.ExclusiveWeaponStone1, jinglian1);
        }
        if (jinglian2 > 0) {
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.ExclusiveWeaponStone2, jinglian2);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.ExclusiveWeaponStone2, jinglian2);
        }
        if (jinglian3 > 0) {
            item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.ExclusiveWeaponStone3, jinglian3);
            content.addChild(item);
            this.prop_reward.set(PropConfig_1.PropId.ExclusiveWeaponStone3, jinglian3);
        }
        //添加装备id列表
        var idList = OfflineRevenue_1.OfflineRevenueManager.getInstance().getNowEquipIdList();
        var len = idList.length;
        var em = EquipmentManager_1.EquipmentManager.getInstance();
        this.reward_equip_list = new Array();
        this.reward_equip_num = new Array();
        //筛选出所有唯一id
        for (var i = 0; i < len; i++) {
            var id = idList[i];
            var index = this.reward_equip_list.indexOf(id);
            if (index == -1) {
                this.reward_equip_list.push(id);
                this.reward_equip_num.push(1);
            }
            else {
                this.reward_equip_num[index]++;
            }
        }
        len = this.reward_equip_list.length;
        for (var i = 0; i < len; i++) {
            var item_1 = em.getEquipNodeById(this.reward_equip_list[i]);
            content.addChild(item_1);
        }
    };
    OfflineUi.prototype.addCoin = function () {
    };
    // createKuang(kuangIndex:number):cc.Node{
    //     let kuang=new cc.Node();
    //     kuang.addComponent(cc.Sprite).spriteFrame=this.sp_kuang[kuangIndex];
    //     return kuang;
    // }
    // createWupin(kuangIndex:number,isVip:boolean,num:number):cc.Node{
    //     let content=this.node.getChildByName('rewardScrollview').getComponent(cc.ScrollView).content;
    //     let numRoot=content.parent.getChildByName('num_root');
    //     //框
    //     let kuang=this.createKuang(kuangIndex);               
    //     let node=new cc.Node();
    //     node.addComponent(cc.Sprite).spriteFrame=this.sp_wupin[kuangIndex];
    //     kuang.addChild(node);
    //     let numLabel=cc.instantiate(this.prefab_num);
    //     numLabel.getComponent(cc.Label).string=MyTool.getCoinDanwei(num);
    //     numLabel.setAnchorPoint(cc.v2(0,0.5));
    //     numLabel.getComponent(FixedPos).init(kuang,cc.v2(-16,-32.5),content);
    //     numRoot.addChild(numLabel);
    //     //vip标识
    //     if(isVip){
    //         let vipNode=new cc.Node();
    //         vipNode.addComponent(cc.Sprite).spriteFrame=this.sp_vip;
    //         vipNode.setPosition(cc.v2(36,44));
    //         kuang.addChild(vipNode);
    //     }
    //     content.addChild(kuang);
    //     switch(kuangIndex){
    //         case 0:{
    //             kuang.name="coin"; 
    //             node.name="coin"; 
    //         }break;
    //     }
    //     return node;
    // }
    OfflineUi.prototype.clickBtnFive = function () {
        var _this = this;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.挂机奖励5倍领取用户数);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.reward_num0 > 0) {
            AdManager_1.default.getInstance().showVideo(function (isSuc) {
                if (isSuc) {
                    _this.getReward(3);
                }
                else {
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
                }
            }, Constants_1.VIDEO_TYPE.Coin);
        }
    };
    OfflineUi.prototype.clickBtnClaim = function () {
        // FollowManager.getInstance().followEvent(Follow_Type.挂机奖励普通领取用户数);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.获取离线奖励次数);
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.领取挂机奖励2次);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.reward_num0 > 0) {
            this.getReward(1);
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_Guaji_Btn_GuaJi, false);
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100115));
        }
    };
    OfflineUi.prototype.clickBtnFast = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.快速挂机按钮点击次数);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.FastGuaJi, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(FastGuaJiUi_1.default).init(null);
            } });
    };
    OfflineUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Guaji);
        this.destroySelf();
    };
    OfflineUi.prototype.getReward = function (beishu) {
        var nodeList = new Array();
        var em = EquipmentManager_1.EquipmentManager.getInstance();
        this.prop_reward.forEach(function (v, k) {
            PropManager_1.PropManager.getInstance().changePropNum(k, v);
            var item = PropManager_1.PropManager.getInstance().createPropItem(k, v);
            nodeList.push(item);
        });
        //获取装备列表
        // let len=this.reward_equip_list.length;        
        // for(let i=0;i<len;i++){
        //     let id=this.reward_equip_list[i];
        //     PropManager.getInstance().changePropNum(id,1);
        //     let item=em.getEquipNodeById(id);                       
        //     let numLabel=cc.instantiate(this.prefab_num);
        //     numLabel.getComponent(cc.Label).string=''+this.reward_equip_num[i];
        //     numLabel.setPosition(cc.v2(40,-36));
        //     item.addChild(numLabel);
        //     nodeList.push(item);
        // }
        var rewardDatas = [];
        var len = this.reward_equip_list.length;
        for (var i = 0; i < len; i++) {
            var info = new LevelJsonData_1.RewardData();
            info.reward_id = this.reward_equip_list[i];
            info.reward_num = this.reward_equip_num[i];
            rewardDatas.push(info);
        }
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
        rewardMap.forEach(function (num, id) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(id, num);
            PropManager_1.PropManager.getInstance().changePropNum(id, num);
            nodeList.push(item);
        });
        OfflineRevenue_1.OfflineRevenueManager.saveGuaJiTime();
        GameManager_1.default.getInstance().showMultipleGetTip(nodeList);
        this.showRewardList();
        _super.prototype.onRefresh.call(this);
        this.destroySelf();
    };
    OfflineUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.Prefab)
    ], OfflineUi.prototype, "prefab_num", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], OfflineUi.prototype, "sp_vip", void 0);
    OfflineUi = __decorate([
        ccclass
    ], OfflineUi);
    return OfflineUi;
}(UIComponent_1.default));
exports.default = OfflineUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXFVpXFxPZmZsaW5lVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBQzVDLG1EQUE4QztBQUM5Qyw2Q0FBc0Q7QUFDdEQscUVBQW9FO0FBQ3BFLGlEQUE0QztBQUM1QyxnRUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsMkVBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxzREFBcUQ7QUFDckQsb0RBQStDO0FBQy9DLDZEQUF3RDtBQUN4RCx5REFBc0Y7QUFFdEYsb0RBQStDO0FBQy9DLGdEQUErQztBQUMvQyw4Q0FBeUQ7QUFDekQsNkNBQXdDO0FBQ3hDLDZDQUF3QztBQUN4QyxzREFBaUQ7QUFDakQsZ0RBQStDO0FBQy9DLDhEQUEwRDtBQUdwRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBVztJQUFsRDtRQUFBLHFFQXdXQztRQXJXRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixZQUFNLEdBQWdCLElBQUksQ0FBQyxDQUFBLG9CQUFvQjtRQUUvQyxpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0Qix1QkFBaUIsR0FBVSxFQUFFLENBQUM7UUFDOUIsc0JBQWdCLEdBQVUsRUFBRSxDQUFDO1FBQzdCLGlCQUFXLEdBQW9CLElBQUksQ0FBQzs7SUEyVnhDLENBQUM7SUF6VkcsMEJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLEdBQUcsRUFBaUIsQ0FBQztJQUM5QyxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUVJLElBQUks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QztpREFDTTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNFO0lBTlYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXdXN0I7SUFBRCxnQkFBQztDQXhXRCxBQXdXQyxDQXhXc0MscUJBQVcsR0F3V2pEO2tCQXhXb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElzRGVidWcsIFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvT2ZmbGluZVJldmVudWVcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERpbmdZdWVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCBGYXN0R3VhSmlVaSBmcm9tIFwiLi9GYXN0R3VhSmlVaVwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPZmZsaW5lVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9udW06Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgc3BfdmlwOmNjLlNwcml0ZUZyYW1lPW51bGw7Ly8wPemHkeW4gSwxPeiLsembhOe7j+mqjO+8jDI9546p5a6257uP6aqMXHJcblxyXG4gICAgcmV3YXJkX251bTA6bnVtYmVyPTYwO1xyXG4gICAgcmV3YXJkX251bTE6bnVtYmVyPTYwO1xyXG4gICAgcmV3YXJkX251bTI6bnVtYmVyPTYwO1xyXG4gICAgcmV3YXJkX2VxdWlwX2xpc3Q6bnVtYmVyW109W107XHJcbiAgICByZXdhcmRfZXF1aXBfbnVtOm51bWJlcltdPVtdO1xyXG4gICAgcHJvcF9yZXdhcmQ6TWFwPG51bWJlcixudW1iZXI+PW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5wcm9wX3Jld2FyZD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2hvd0d1YUppVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG93R3VhSmlUaW1lLDEpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QmFubmVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93UmV3YXJkTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dHdWFKaVRpbWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBvZmZzZXRTZWM9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEd1YUppU2VjKCk7XHJcbiAgICAgICAgbGV0IHNoaT1NYXRoLmZsb29yKG9mZnNldFNlYy8zNjAwKTtcclxuICAgICAgICBsZXQgc2hpU3RyPScwJytzaGk7XHJcbiAgICAgICAgaWYoc2hpPj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNoaVN0cj0nJytzaGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmZW49TWF0aC5mbG9vcigob2Zmc2V0U2VjLXNoaSozNjAwKS82MCk7XHJcbiAgICAgICAgbGV0IGZlblN0cj0nMCcrZmVuO1xyXG4gICAgICAgIGlmKGZlbj49MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZW5TdHI9JycrZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbz1vZmZzZXRTZWMlNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHI9JzAnK21pYW87XHJcbiAgICAgICAgaWYobWlhbz49MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtaWFvU3RyPScnK21pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0aW1lTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aW1lTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpbWVMYWJlbC5zdHJpbmc9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExNykgKyBzaGlTdHIrJzonK2ZlblN0cisnOicrbWlhb1N0cjtcclxuICAgICAgICAvLyBsZXQgdGltZVByb2dyZXNzQmFyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGltZVByb2dyZXNzQmFyJyk7XHJcbiAgICAgICAgLy8gdGltZVByb2dyZXNzQmFyLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3M9b2Zmc2V0U2VjLyg2MCo2MCo4KTtcclxuICAgICAgICAvL2xldCBsZXZlbD1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDsgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBvZmZzZXRNaW49TWF0aC5mbG9vcihvZmZzZXRTZWMvNjApO1xyXG4gICAgICAgIGxldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG1heE1pbj1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaW1lKGxldmVsKTtcclxuICAgICAgICBpZihvZmZzZXRNaW4+bWF4TWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2Zmc2V0TWluPW1heE1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob2Zmc2V0TWluPDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvZmZzZXRNaW49MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBqc29uRGF0YT1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uT2ZmbGluZVJldmVudWUobGV2ZWwpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvaW5MYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvaW5MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgY29pbkxhYmVsLnN0cmluZz1NeVRvb2wuZ2V0Q29pbkRhbndlaShqc29uRGF0YS5HZXRHb2xkICogNjApKycvaCc7XHJcbiAgICAgICAgbGV0IGhlcm9FeHBMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9FeHBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgaGVyb0V4cExhYmVsLnN0cmluZz1qc29uRGF0YS5HZXRIZXJvRXhwKycvbWluJztcclxuICAgICAgICBsZXQgdXNlckV4cExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlckV4cExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB1c2VyRXhwTGFiZWwuc3RyaW5nPWpzb25EYXRhLkdldFByb21vdGlvbisnL21pbic7XHJcbiAgICAgICAgbGV0IHJlbWFpbk1pbj1vZmZzZXRNaW4tT2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVmcmVzaFRpbWUoKTtcclxuICAgICAgICBpZihyZW1haW5NaW4+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jld2FyZExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/orr7nva7pooblj5bmjInpkq5cclxuICAgICAgICBsZXQgYnRuR2V0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuR2V0Jyk7XHJcbiAgICAgICAgbGV0IGNsYWltVGV4dD1idG5HZXQuZ2V0Q2hpbGRCeU5hbWUoJ2NsYWltVGV4dCcpO1xyXG4gICAgICAgIC8vIGxldCBidG5WaWRlbz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blZpZGVvJyk7XHJcbiAgICAgICAgbGV0IHJpY2hUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmljaFRleHQnKTtcclxuICAgICAgICBsZXQgbmVlZE1pbj1Jc0RlYnVnPzE6NjA7XHJcbiAgICAgICAgaWYob2Zmc2V0TWluPj1uZWVkTWluKXtcclxuICAgICAgICAgICAgLy8gYnRuR2V0Lng9MDtcclxuICAgICAgICAgICAgLy8gYnRuR2V0Lnk9LTI4MDtcclxuICAgICAgICAgICAgLy8gYnRuR2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgICAgICAvLyBjbGFpbVRleHQuY29sb3I9Y2MuY29sb3IoNjMsNDUsMzMpO1xyXG4gICAgICAgICAgICAvLyBidG5WaWRlby5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gcmljaFRleHQuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gYnRuR2V0Lng9MDtcclxuICAgICAgICAgICAgLy8gYnRuR2V0Lnk9LTI0NztcclxuICAgICAgICAgICAgLy8gYnRuR2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gY2xhaW1UZXh0LmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gY2MuY29sb3IoMTM4LDEzOCwxMzgpO1xyXG4gICAgICAgICAgICAvLyBidG5WaWRlby5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHJpY2hUZXh0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAvLyBsZXQgc3RyMT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Zb3VfY2FuX2NsYWltX2FmdGVyKTtcclxuICAgICAgICAgICAgLy8gb2Zmc2V0U2VjPTM2MDAtb2Zmc2V0U2VjO1xyXG4gICAgICAgICAgICAvLyBsZXQgZmVuPU1hdGguZmxvb3IoKG9mZnNldFNlYy1zaGkqMzYwMCkvNjApO1xyXG4gICAgICAgICAgICAvLyBmZW5TdHI9JzAnK2ZlbjtcclxuICAgICAgICAgICAgLy8gaWYoZmVuPj0xMClcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgZmVuU3RyPScnK2ZlbjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBtaWFvPW9mZnNldFNlYyU2MDtcclxuICAgICAgICAgICAgLy8gbWlhb1N0cj0nMCcrbWlhbztcclxuICAgICAgICAgICAgLy8gaWYobWlhbz49MTApXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIG1pYW9TdHI9JycrbWlhbztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBsZXQgc3RyMj1mZW5TdHIrJzonK21pYW9TdHI7XHJcbiAgICAgICAgICAgIC8vIHJpY2hUZXh0LmdlIHRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZz1cIjxiPlwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LllvdV9jYW5fY2xhaW1fYWZ0ZXIpK1wiPC9iPlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuuaMguacuuWlluWKseeahOWIl+ihqFxyXG4gICAgc2hvd1Jld2FyZExpc3QoKXtcclxuICAgICAgICBsZXQgcmV3YXJkU2Nyb2xsdmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jld2FyZFNjcm9sbHZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9cmV3YXJkU2Nyb2xsdmlldy5jb250ZW50O1xyXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgbnVtUm9vdD1jb250ZW50LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnbnVtX3Jvb3QnKTtcclxuICAgICAgICBudW1Sb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGVxdWlwUm9vdD1jb250ZW50LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnZXF1aXBfcm9vdCcpO1xyXG4gICAgICAgIGVxdWlwUm9vdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8v5re75Yqg6YeR5biB562J6LWE5rqQ5YiX6KGoXHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQganNvbkRhdGE9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk9mZmxpbmVSZXZlbnVlKGxldmVsKTtcclxuICAgICAgICBsZXQgb2Zmc2V0TWluPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRHdWFKaU1pbigpO1xyXG4gICAgICAgIC8v6YeR5biBXHJcbiAgICAgICAgbGV0IGNvaW5OdW09anNvbkRhdGEuR2V0R29sZCpvZmZzZXRNaW47XHJcbiAgICAgICAgLy/oi7Hpm4Tnu4/pqoxcclxuICAgICAgICBsZXQgaGVyb0V4cE51bT1qc29uRGF0YS5HZXRIZXJvRXhwKm9mZnNldE1pbjsgICAgICAgIFxyXG4gICAgICAgIC8v546p5a6257uP6aqMXHJcbiAgICAgICAgbGV0IHVzZXJFeHBOdW09anNvbkRhdGEuR2V0UGxheWVyRXhwKm9mZnNldE1pbjtcclxuICAgICAgICAvL+aZi+WNh+efs+WktFxyXG4gICAgICAgIGxldCBzdG9uZVByb21vdGlvbj1NYXRoLmZsb29yKGpzb25EYXRhLkdldFByb21vdGlvbipvZmZzZXRNaW4pO1xyXG4gICAgICAgIC8v5pmu6YCa57K+54K855+zXHJcbiAgICAgICAgbGV0IGppbmdsaWFuMT1NYXRoLmZsb29yKGpzb25EYXRhLkdldE9yZGluYXJ5RW5oYW5jZW1lbnRTdG9uZSpvZmZzZXRNaW4pO1xyXG4gICAgICAgIC8v5Lit57qn57K+54K855+zXHJcbiAgICAgICAgbGV0IGppbmdsaWFuMj1NYXRoLmZsb29yKGpzb25EYXRhLkdldEludGVybWVkaWF0ZUVuaGFuY2VtZW50U3RvbmUqb2Zmc2V0TWluKTtcclxuICAgICAgICAvL+mrmOe6p+eyvueCvOefs1xyXG4gICAgICAgIGxldCBqaW5nbGlhbjM9TWF0aC5mbG9vcihqc29uRGF0YS5HZXRTZW5pb3JFbmhhbmNlbWVudFN0b25lKm9mZnNldE1pbik7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfbnVtMD1jb2luTnVtO1xyXG4gICAgICAgIHRoaXMucmV3YXJkX251bTE9aGVyb0V4cE51bTtcclxuICAgICAgICB0aGlzLnJld2FyZF9udW0yPXVzZXJFeHBOdW07XHJcbiAgICAgICAgLy/liKTmlq3kuIDkuIvmmK/lkKZWSVBcclxuICAgICAgICBsZXQgaXRlbSA9IG51bGw7ICAgICAgICBcclxuICAgICAgICBpZihjb2luTnVtPjApe1xyXG4gICAgICAgICAgICBjb2luTnVtPU1hdGguZmxvb3IoY29pbk51bSk7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLGNvaW5OdW0pXHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9yZXdhcmQuc2V0KFByb3BJZC5Db2luLGNvaW5OdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihoZXJvRXhwTnVtPjApe1xyXG4gICAgICAgICAgICBoZXJvRXhwTnVtPU1hdGguZmxvb3IoaGVyb0V4cE51bSk7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5IZXJvRXhwLGhlcm9FeHBOdW0pXHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9yZXdhcmQuc2V0KFByb3BJZC5IZXJvRXhwLGhlcm9FeHBOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih1c2VyRXhwTnVtPjApe1xyXG4gICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuVXNlckV4cCx1c2VyRXhwTnVtKVxyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BfcmV3YXJkLnNldChQcm9wSWQuVXNlckV4cCx1c2VyRXhwTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RvbmVQcm9tb3Rpb24+MCl7XHJcbiAgICAgICAgICAgIHN0b25lUHJvbW90aW9uPU1hdGguZmxvb3Ioc3RvbmVQcm9tb3Rpb24pO1xyXG4gICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuSGVyb1N0b25lLHN0b25lUHJvbW90aW9uKVxyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BfcmV3YXJkLnNldChQcm9wSWQuSGVyb1N0b25lLHN0b25lUHJvbW90aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoamluZ2xpYW4xPjApe1xyXG4gICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuRXhjbHVzaXZlV2VhcG9uU3RvbmUxLGppbmdsaWFuMSlcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wX3Jld2FyZC5zZXQoUHJvcElkLkV4Y2x1c2l2ZVdlYXBvblN0b25lMSxqaW5nbGlhbjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihqaW5nbGlhbjI+MCl7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5FeGNsdXNpdmVXZWFwb25TdG9uZTIsamluZ2xpYW4yKVxyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BfcmV3YXJkLnNldChQcm9wSWQuRXhjbHVzaXZlV2VhcG9uU3RvbmUyLGppbmdsaWFuMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGppbmdsaWFuMz4wKXtcclxuICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkV4Y2x1c2l2ZVdlYXBvblN0b25lMyxqaW5nbGlhbjMpXHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9yZXdhcmQuc2V0KFByb3BJZC5FeGNsdXNpdmVXZWFwb25TdG9uZTMsamluZ2xpYW4zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mt7vliqDoo4XlpIdpZOWIl+ihqFxyXG4gICAgICAgIGxldCBpZExpc3Q9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93RXF1aXBJZExpc3QoKTtcclxuXHJcbiAgICAgICAgbGV0IGxlbj1pZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIGxldCBlbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfZXF1aXBfbGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLnJld2FyZF9lcXVpcF9udW09bmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy/nrZvpgInlh7rmiYDmnInllK/kuIBpZFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGlkPWlkTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMucmV3YXJkX2VxdWlwX2xpc3QuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4PT0tMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9lcXVpcF9saXN0LnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfZXF1aXBfbnVtLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfZXF1aXBfbnVtW2luZGV4XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlbj10aGlzLnJld2FyZF9lcXVpcF9saXN0Lmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1lbS5nZXRFcXVpcE5vZGVCeUlkKHRoaXMucmV3YXJkX2VxdWlwX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRDb2luKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlS3Vhbmcoa3VhbmdJbmRleDpudW1iZXIpOmNjLk5vZGV7XHJcbiAgICAvLyAgICAgbGV0IGt1YW5nPW5ldyBjYy5Ob2RlKCk7XHJcbiAgICAvLyAgICAga3VhbmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5zcF9rdWFuZ1trdWFuZ0luZGV4XTtcclxuICAgIC8vICAgICByZXR1cm4ga3Vhbmc7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gY3JlYXRlV3VwaW4oa3VhbmdJbmRleDpudW1iZXIsaXNWaXA6Ym9vbGVhbixudW06bnVtYmVyKTpjYy5Ob2Rle1xyXG4gICAgLy8gICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkU2Nyb2xsdmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgLy8gICAgIGxldCBudW1Sb290PWNvbnRlbnQucGFyZW50LmdldENoaWxkQnlOYW1lKCdudW1fcm9vdCcpO1xyXG4gICAgLy8gICAgIC8v5qGGXHJcbiAgICAvLyAgICAgbGV0IGt1YW5nPXRoaXMuY3JlYXRlS3Vhbmcoa3VhbmdJbmRleCk7ICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoKTtcclxuICAgIC8vICAgICBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3Bfd3VwaW5ba3VhbmdJbmRleF07XHJcbiAgICAvLyAgICAga3VhbmcuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgbGV0IG51bUxhYmVsPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX251bSk7XHJcbiAgICAvLyAgICAgbnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkobnVtKTtcclxuICAgIC8vICAgICBudW1MYWJlbC5zZXRBbmNob3JQb2ludChjYy52MigwLDAuNSkpO1xyXG4gICAgLy8gICAgIG51bUxhYmVsLmdldENvbXBvbmVudChGaXhlZFBvcykuaW5pdChrdWFuZyxjYy52MigtMTYsLTMyLjUpLGNvbnRlbnQpO1xyXG4gICAgLy8gICAgIG51bVJvb3QuYWRkQ2hpbGQobnVtTGFiZWwpO1xyXG4gICAgLy8gICAgIC8vdmlw5qCH6K+GXHJcbiAgICAvLyAgICAgaWYoaXNWaXApe1xyXG4gICAgLy8gICAgICAgICBsZXQgdmlwTm9kZT1uZXcgY2MuTm9kZSgpO1xyXG4gICAgLy8gICAgICAgICB2aXBOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3BfdmlwO1xyXG4gICAgLy8gICAgICAgICB2aXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDM2LDQ0KSk7XHJcbiAgICAvLyAgICAgICAgIGt1YW5nLmFkZENoaWxkKHZpcE5vZGUpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBjb250ZW50LmFkZENoaWxkKGt1YW5nKTtcclxuICAgIC8vICAgICBzd2l0Y2goa3VhbmdJbmRleCl7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMDp7XHJcbiAgICAvLyAgICAgICAgICAgICBrdWFuZy5uYW1lPVwiY29pblwiOyBcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUubmFtZT1cImNvaW5cIjsgXHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5GaXZlKClcclxuICAgIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oyC5py65aWW5YqxNeWAjemihuWPlueUqOaIt+aVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZih0aGlzLnJld2FyZF9udW0wPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgICAgICBpZihpc1N1YylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJld2FyZCgzKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVGhlX2FkX2ZhaWxlZF90b19wbGF5X2FuZF90aGVfcmV3YXJkX2Nhbm5vdF9iZV9vYnRhaW5lZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFZJREVPX1RZUEUuQ29pbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xhaW0oKVxyXG4gICAge1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mjILmnLrlpZblirHmma7pgJrpooblj5bnlKjmiLfmlbApO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ojrflj5bnprvnur/lpZblirHmrKHmlbApO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6aKG5Y+W5oyC5py65aWW5YqxMuasoSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZih0aGlzLnJld2FyZF9udW0wPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdldFJld2FyZCgxKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfVElQLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaV9CdG5fR3VhSmksZmFsc2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExNSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkZhc3QoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5b+r6YCf5oyC5py65oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZhc3RHdWFKaSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEZhc3RHdWFKaVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgIH19KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaSk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJld2FyZChiZWlzaHU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlTGlzdD1uZXcgQXJyYXkoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGVtPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLnByb3BfcmV3YXJkLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGssdik7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oayx2KTtcclxuICAgICAgICAgICAgbm9kZUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v6I635Y+W6KOF5aSH5YiX6KGoXHJcbiAgICAgICAgLy8gbGV0IGxlbj10aGlzLnJld2FyZF9lcXVpcF9saXN0Lmxlbmd0aDsgICAgICAgIFxyXG4gICAgICAgIC8vIGZvcihsZXQgaT0wO2k8bGVuO2krKyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9dGhpcy5yZXdhcmRfZXF1aXBfbGlzdFtpXTtcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGlkLDEpO1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbT1lbS5nZXRFcXVpcE5vZGVCeUlkKGlkKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBsZXQgbnVtTGFiZWw9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbnVtKTtcclxuICAgICAgICAvLyAgICAgbnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9JycrdGhpcy5yZXdhcmRfZXF1aXBfbnVtW2ldO1xyXG4gICAgICAgIC8vICAgICBudW1MYWJlbC5zZXRQb3NpdGlvbihjYy52Mig0MCwtMzYpKTtcclxuICAgICAgICAvLyAgICAgaXRlbS5hZGRDaGlsZChudW1MYWJlbCk7XHJcbiAgICAgICAgLy8gICAgIG5vZGVMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCByZXdhcmREYXRhcyA9IFtdO1xyXG4gICAgICAgIGxldCBsZW49dGhpcy5yZXdhcmRfZXF1aXBfbGlzdC5sZW5ndGg7ICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgIGluZm8ucmV3YXJkX2lkPXRoaXMucmV3YXJkX2VxdWlwX2xpc3RbaV07XHJcbiAgICAgICAgICAgIGluZm8ucmV3YXJkX251bSA9IHRoaXMucmV3YXJkX2VxdWlwX251bVtpXTtcclxuICAgICAgICAgICAgcmV3YXJkRGF0YXMucHVzaChpbmZvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXdhcmRNYXAgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgcmV3YXJkRGF0YXMuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZihyZXdhcmRNYXAuaGFzKHYucmV3YXJkX2lkKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gcmV3YXJkTWFwLmdldCh2LnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICBudW0gKz0gdi5yZXdhcmRfbnVtO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkTWFwLnNldCh2LnJld2FyZF9pZCxudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJld2FyZE1hcC5zZXQodi5yZXdhcmRfaWQsdi5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV3YXJkTWFwLmZvckVhY2goKG51bSxpZCk9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCxudW0pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oaWQsbnVtKTtcclxuICAgICAgICAgICAgbm9kZUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIuc2F2ZUd1YUppVGltZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKG5vZGVMaXN0KTtcclxuICAgICAgICB0aGlzLnNob3dSZXdhcmRMaXN0KCk7XHJcbiAgICAgICAgc3VwZXIub25SZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCl7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==