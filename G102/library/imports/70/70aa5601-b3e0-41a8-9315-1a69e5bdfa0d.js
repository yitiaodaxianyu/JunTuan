"use strict";
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