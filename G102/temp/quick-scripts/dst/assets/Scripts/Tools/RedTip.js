
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/RedTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd86ceFBrd5KFKGsYJnTJoUj', 'RedTip');
// Scripts/Tools/RedTip.ts

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
var ActivityManager_1 = require("../Activity/ActivityManager");
var Constants_1 = require("../Constants");
var EquipmentManager_1 = require("../Equipment/EquipmentManager");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var FunctionDefinition_1 = require("../JsonData/FunctionDefinition");
var OfflineRevenue_1 = require("../JsonData/OfflineRevenue");
var EventManager_1 = require("./EventManager");
var EquipConfig_1 = require("../Equipment/EquipConfig");
var PayManager_1 = require("../Payment/PayManager");
var StorageManager_1 = require("../Storage/StorageManager");
var PropManager_1 = require("../Prop/PropManager");
var MazeManager_1 = require("../Maze/MazeManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var BattlePassData_1 = require("../BattlePass/BattlePassData");
var TaskManager_1 = require("../Task/TaskManager");
var DingYueManager_1 = require("../Payment/DingYueManager");
var CumulativeRecharges_1 = require("../AccumulatedRecharge/CumulativeRecharges");
var PetManager_1 = require("../Pet/PetManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RedTip = /** @class */ (function (_super) {
    __extends(RedTip, _super);
    function RedTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.self_red_type = EventManager_1.RedEventType.Btn_Main_SignIn;
        _this.super_red_type = [EventManager_1.RedEventType.Btn_Main];
        _this.child_red_type = [EventManager_1.RedEventType.Btn_Main];
        //是否是广告按钮，广告按钮的话，红点展示一次就可以了
        _this.is_video_btn = false;
        /**第一次显示时，是否自测 */
        _this.is_check_self = false;
        _this.show_num = 0;
        _this.is_show_red = false;
        //下级反馈false的次数
        _this.false_red_type = [];
        //下级反馈的总次数
        _this.tip_num = [];
        return _this;
    }
    /**加载时，自注册事件，red_type需要在组件上预先设置 */
    RedTip.prototype.onLoad = function () {
        this.registerEvent();
    };
    RedTip.prototype.start = function () {
        if (this.is_check_self) {
            this.checkSelf(true);
            //this.tip_num=0;
        }
    };
    /**销毁时，删除事件，red_type需要在组件上预先设置 */
    RedTip.prototype.onDestroy = function () {
        this.cancelEvent();
    };
    /**注册事件*/
    RedTip.prototype.registerEvent = function () {
        EventManager_1.EventManager.addRedEvent(EventManager_1.RedEventString.RED_TIP, this.self_red_type, this.onChangeTip, this);
        EventManager_1.EventManager.addRedEvent(EventManager_1.RedEventString.RED_CHECK, this.self_red_type, this.onCheck, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(false);
        }
    };
    /**取消事件*/
    RedTip.prototype.cancelEvent = function () {
        EventManager_1.EventManager.removeRedEvent(EventManager_1.RedEventString.RED_TIP, this.self_red_type, this.onChangeTip, this);
        EventManager_1.EventManager.removeRedEvent(EventManager_1.RedEventString.RED_CHECK, this.self_red_type, this.onCheck, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // let tanhao=this.node.getChildByName('tanhao');
        // if(tanhao)
        // tanhao.removeFromParent();
    };
    RedTip.prototype.onTouchEnd = function () {
        if (this.is_show_red) {
            this.show_num++;
            if (this.is_video_btn) {
                this.onChangeTip(false, this.self_red_type);
            }
        }
    };
    /**更改红点事件类型,主要适用于同一个界面的同一个按钮，切换不同的关联类型时，比如角色页的升级按钮*/
    RedTip.prototype.changeRedType = function (redType) {
        if (redType != this.self_red_type) {
            this.cancelEvent();
            this.self_red_type = redType;
            this.registerEvent();
        }
    };
    /**当事件发生变化时回调
     * isShow：是否显示红点，一般由下级通知
     * redType:发送onChangeTip的红点类型红点类型
     * */
    RedTip.prototype.onChangeTip = function (isShow, postRedType) {
        if (this.self_red_type == EventManager_1.RedEventType.Btn_Main) {
            //cc.log('1::'+this.false_red_type.length);
        }
        this.is_show_red = isShow;
        if (postRedType) {
            if (!this.tip_num.includes(postRedType)) {
                this.tip_num.push(postRedType);
            }
        }
        if (isShow == true) {
            this.addTip();
            //如果显示红点，需要通知上级也要显示
            this.super_red_type.forEach(function (redType) {
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, redType, true);
            });
        }
        else {
            if (postRedType) {
                if (postRedType != this.self_red_type) {
                    if (!this.false_red_type.includes(postRedType)) {
                        this.false_red_type.push(postRedType);
                    }
                    if (this.false_red_type.length >= this.child_red_type.length) {
                        this.removeTip();
                    }
                }
                else {
                    this.removeTip();
                }
            }
            else {
                this.removeTip();
            }
        }
        //cc.log("我我我是"+this.self_red_type+",提示次数：:"+this.tip_num);
        if (this.tip_num.length >= this.child_red_type.length) {
            this.false_red_type = new Array();
            this.tip_num = new Array();
        }
    };
    /**主动检测一个红点事件是否能显示
     *  如果有下级，则让下级进行检查，当没有自己下级的时候才开始检查自身
     *
     *  一般由上级通知,也可主动调用
     * */
    RedTip.prototype.onCheck = function () {
        if (this.child_red_type.length > 0) {
            this.false_red_type = new Array();
            this.tip_num = new Array();
            this.child_red_type.forEach(function (redType) {
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, redType, true);
            });
        }
        else {
            //没有下级就检测自己，只有检查到为true时才上报
            this.checkSelf(true);
        }
    };
    /**
     * 检测自己，基本所有的的类型都要有自测方案
     * @param isPost 自测完毕后是否上报给自己的上级
     * @param redType 红点类型ID。不传时，默认是自身id，传值时，用于上级向下级传达检测命令
     * @returns 是否需要红点提示
     */
    RedTip.prototype.checkSelf = function (isPost, redType) {
        var _this = this;
        if (redType === void 0) { redType = this.self_red_type; }
        var isTip = false;
        switch (redType) {
            /**主城的 */
            case EventManager_1.RedEventType.Btn_Shop:
                {
                    var gd = GameData_1.default.getInstance();
                    isTip = gd.getHeroRecruitingRedTip(); //||gd.getPetRecruitingRedTip()||gd.getEquipFreeRedTip()||gd.getGemFreeRedTip()||gd.getCoinFreeRedTip();
                }
                break;
            // case RedEventType.Btn_City_Equip_1:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.WuQi);
            // }break;
            // case RedEventType.Btn_City_Equip_2:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.HuJia);
            // }break;
            // case RedEventType.Btn_City_Equip_3:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.ShiPin);
            // }break;
            // case RedEventType.Btn_City_Equip_MergeAll:{
            //     if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ZhuangBeiHeCheng)){
            //         isTip=false;
            //         break;
            //     }
            //     for(let i=EquipType.WuQi; i<EquipType.Num; i++){
            //         isTip=EquipmentManager.getInstance().checkEquipMerge(i);
            //         if(isTip){
            //             break;
            //         }
            //     }
            // }break;
            case EventManager_1.RedEventType.Btn_Task:
                {
                    this.child_red_type.forEach(function (redType) {
                        var isT = _this.checkSelf(false, redType);
                        if (isT) {
                            isTip = true;
                        }
                    });
                }
                break;
            case EventManager_1.RedEventType.Btn_Task_Daily:
                {
                    isTip = TaskManager_1.default.getInstance().getDailyTaskIsCanGet();
                }
                break;
            case EventManager_1.RedEventType.Btn_Task_Achievenment:
                {
                    isTip = TaskManager_1.default.getInstance().getAchievenmentTaskIsCanGet();
                }
                break;
            case EventManager_1.RedEventType.Btn_Role:
                {
                    for (var i = 0; i < this.child_red_type.length; i++) {
                        isTip = this.checkSelf(false, this.child_red_type[i]);
                        if (isTip == true) {
                            break;
                        }
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Role_List_1:
            case EventManager_1.RedEventType.Btn_Role_List_2:
            case EventManager_1.RedEventType.Btn_Role_List_3:
            case EventManager_1.RedEventType.Btn_Role_List_4:
            case EventManager_1.RedEventType.Btn_Role_List_5:
            case EventManager_1.RedEventType.Btn_Role_List_6:
            case EventManager_1.RedEventType.Btn_Role_List_7:
            case EventManager_1.RedEventType.Btn_Role_List_8:
            case EventManager_1.RedEventType.Btn_Role_List_9:
            case EventManager_1.RedEventType.Btn_Role_List_10:
            case EventManager_1.RedEventType.Btn_Role_List_11:
            case EventManager_1.RedEventType.Btn_Role_List_12:
                {
                    var hm = HeroManager_1.HeroManager.getInstance();
                    var heroType = HeroManager_1.HeroManager.getHeroTypeByRedType(redType);
                    var heroInfo = hm.getHeroInfo(heroType);
                    if (heroInfo != null) {
                        //判断升级
                        isTip = HeroManager_1.HeroManager.getInstance().checkUpgrade(heroType).is_can_up;
                        //判断升星
                        if (!isTip) {
                            isTip = HeroManager_1.HeroManager.getInstance().checkUpStar(heroType);
                        }
                        //判断装备
                        if (!isTip) {
                            for (var i = 1; i < EquipConfig_1.EquipType.Num; i++) {
                                isTip = EquipmentManager_1.EquipmentManager.getInstance().checkWear(heroType, i);
                                if (isTip) {
                                    break;
                                }
                            }
                        }
                        //判断宠物
                        if (!isTip) {
                            isTip = PetManager_1.PetManager.getInstance().checkRedTip(heroType);
                        }
                        //判断专武
                        if (!isTip) {
                            isTip = HeroManager_1.HeroManager.getInstance().checkExUp(heroType);
                        }
                    }
                    else {
                        //判断解锁
                        isTip = HeroManager_1.HeroManager.getInstance().checkUnlock(heroType);
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Role_Info_UpgradeAll:
                {
                    //升级
                    var hm = HeroManager_1.HeroManager.getInstance();
                    var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
                    for (var i = 0; i < heroList.length; i++) {
                        // let upData=hm.checkUpgrade(heroList[i].hero_type);
                        // if(upData.is_can_up){
                        //     isTip=true;
                        //     break;
                        // }
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Role_Equip_WearAll:
                {
                    var em = EquipmentManager_1.EquipmentManager.getInstance();
                    var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
                    for (var i = 0; i < heroList.length; i++) {
                        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(heroList[i].hero_type) > 0) {
                            var isCanWear = em.checkQuickWear(heroList[i].hero_type, false);
                            if (isCanWear) {
                                isTip = true;
                                break;
                            }
                        }
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Main:
                {
                    this.child_red_type.forEach(function (redType) {
                        var isT = _this.checkSelf(false, redType);
                        if (isT) {
                            isTip = true;
                        }
                    });
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Spin:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.ZhuanPan)) {
                        isTip = false;
                        break;
                    }
                    isTip = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeYes, 0) == 1;
                    // || TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd,0) < 10;                
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Task:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.MeiRiRenWu)) {
                        isTip = false;
                        break;
                    }
                    //设置奖励物品
                    // isTip=TaskManger.getInstance().getIsHaveGet();
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Rank:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.PaiHangBang)) {
                        isTip = false;
                        break;
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_SignIn:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.QianDao)) {
                        isTip = false;
                        break;
                    }
                    isTip = GameData_1.default.getInstance().getIsSignToday();
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_SignIn_BtnGet:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.QianDao)) {
                        isTip = false;
                        break;
                    }
                    isTip = GameData_1.default.getInstance().getIsSignToday();
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Guaji:
                {
                    //挂机按钮
                    isTip = this.checkSelf(false, EventManager_1.RedEventType.Btn_Main_Guaji_Btn_GuaJi);
                    //快速挂机是否有广告机会
                    if (!isTip) {
                        isTip = this.checkSelf(false, EventManager_1.RedEventType.Btn_Main_Guaji_Btn_Fast);
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Guaji_Btn_Fast:
                {
                    isTip = OfflineRevenue_1.OfflineRevenueManager.getInstance().isCanAdFastGuaJi();
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Guaji_Btn_Fast_Ad:
                {
                    isTip = OfflineRevenue_1.OfflineRevenueManager.getInstance().isCanAdFastGuaJi();
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Guaji_Btn_GuaJi:
                {
                    isTip = OfflineRevenue_1.OfflineRevenueManager.getInstance().isCanGuaJiRedTip();
                }
                break;
            case EventManager_1.RedEventType.Btn_Map_Team_0:
            case EventManager_1.RedEventType.Btn_Map_Team_1:
            case EventManager_1.RedEventType.Btn_Map_Team_2:
            case EventManager_1.RedEventType.Btn_Map_Team_3:
            case EventManager_1.RedEventType.Btn_Map_Team_4:
                {
                    if (GameManager_1.default.getInstance().cur_game_mode != Constants_1.GameMode.Main) {
                        isTip = false;
                        break;
                    }
                    var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(Constants_1.GameMode.Main);
                    var mNum = 0;
                    for (var i = 0; i < teamList.length; i++) {
                        if (teamList[i] > 0) {
                            mNum++;
                        }
                    }
                    var unlockNum = 0;
                    var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
                    for (var i = 0; i < heroList.length; i++) {
                        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(heroList[i].hero_type) > 0) {
                            unlockNum++;
                        }
                    }
                    //没满员，并且解锁的数量比成员数量大
                    if (mNum < teamList.length && mNum < unlockNum) {
                        var chechIndex = redType - EventManager_1.RedEventType.Btn_Map_Team_0;
                        var heroType = teamList[chechIndex];
                        if (heroType <= 0) {
                            //该位置空了
                            isTip = true;
                        }
                    }
                    else {
                        isTip = false;
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_Vip:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.VIP)) {
                        isTip = false;
                        break;
                    }
                    //判断是否可以在未购买的情况下，显示一次。
                    var VipIdentity = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipIdentity, 0);
                    if (VipIdentity == 0) {
                        if (PayManager_1.PayManager.getInstance().getFuncTodayShow(Constants_1.FuncType.VIP) <= 0) {
                            isTip = true;
                            break;
                        }
                    }
                    var AllActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.AllActivityNum, 0); //总活跃度   
                    for (var itmeindex = 0; itmeindex < 15; itmeindex++) {
                        var id = itmeindex + 1;
                        var RequiredEx = BattlePassData_1.BattlePassDataManager.getInstance().getRequiredExp(id); //所需活跃度
                        if (RequiredEx <= AllActivityNum) {
                            var VipFreeRewardStatus = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipFreeRewardStatus + id, 0); //vip免费奖励状态    0未领取,1已领取     0-14
                            var VipAdvancedRewardStatus = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VipAdvancedRewardStatus + id, 0); //vip高级奖励状态    0未领取,1已领
                            if (VipFreeRewardStatus == 0) {
                                isTip = true;
                                break;
                            }
                            if (VipAdvancedRewardStatus == 0 && VipIdentity == 1) {
                                isTip = true;
                                break;
                            }
                        }
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_ShouChong:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.FirstCharge) || PayManager_1.PayManager.getInstance().getPayNum('c301') > 0) {
                        isTip = false;
                        break;
                    }
                    isTip = PayManager_1.PayManager.getInstance().getFuncTodayShow(Constants_1.FuncType.FirstCharge) <= 0;
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_WeekCard:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.WeekCard)) {
                        isTip = false;
                        break;
                    }
                    isTip = PayManager_1.PayManager.getInstance().getFuncTodayShow(Constants_1.FuncType.WeekCard) <= 0 || (DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy && StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 0) <= 0);
                }
                break;
            case EventManager_1.RedEventType.Btn_Main_LeiChong:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.AccumulatedRecharge)) {
                        isTip = false;
                        break;
                    }
                    isTip = PayManager_1.PayManager.getInstance().getFuncTodayShow(Constants_1.FuncType.AccumulatedRecharge) <= 0;
                    if (!isTip) {
                        var isCanGet_1 = false;
                        var rewarMap = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().rewardMap;
                        rewarMap.forEach(function (v, k) {
                            if (isCanGet_1 == false && v == 1) {
                                isCanGet_1 = true;
                            }
                        });
                        isTip = isCanGet_1;
                    }
                }
                break;
            case EventManager_1.RedEventType.Btn_Activity:
                {
                    isTip = (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.WuJinTiaoZhan) && StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 0) > 0) || (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.GeRenBoss) && StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.BossChallengeTimes, 0) > 0);
                }
                break;
            case EventManager_1.RedEventType.Btn_Activity_Endless:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.WuJinTiaoZhan)) {
                        isTip = false;
                        break;
                    }
                    isTip = ActivityManager_1.ActivityManager.getInstance().getTicket(ActivityManager_1.ActivityType.Endless) > 0;
                }
                break;
            case EventManager_1.RedEventType.Btn_Activity_Boss:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.GeRenBoss)) {
                        isTip = false;
                        break;
                    }
                    isTip = ActivityManager_1.ActivityManager.getInstance().getTicket(ActivityManager_1.ActivityType.Boss) > 0;
                }
                break;
            case EventManager_1.RedEventType.Btn_Activity_Maze:
                {
                    if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.MiGong)) {
                        isTip = false;
                        break;
                    }
                    isTip = MazeManager_1.MazeManager.getInstance().checkDate();
                }
                break;
        }
        //只有isPost为true时才发送
        if (isPost) {
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, this.self_red_type, isTip);
        }
        return isTip;
    };
    RedTip.prototype.addTip = function () {
        var tanhao = this.node.getChildByName('tanhao');
        if (!tanhao) {
            tanhao = new cc.Node('tanhao');
            tanhao.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName('Common_Icon_RedDot');
            this.node.addChild(tanhao);
            tanhao.x = this.node.width / 2;
            tanhao.y = this.node.height / 2;
            tanhao.opacity = 0;
            if (this.node.scale < 1)
                tanhao.scale = 1 / this.node.scale;
            cc.tween(tanhao).to(0.2, { opacity: 255 }).start();
        }
    };
    RedTip.prototype.removeTip = function () {
        var _this = this;
        this.super_red_type.forEach(function (redType) {
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, redType, false, _this.self_red_type);
        });
        var tanhao = this.node.getChildByName('tanhao');
        if (tanhao)
            tanhao.removeFromParent();
        this.false_red_type = new Array();
    };
    __decorate([
        property({ type: cc.Enum(EventManager_1.RedEventType), tooltip: "当前按钮自己的红点类型" })
    ], RedTip.prototype, "self_red_type", void 0);
    __decorate([
        property({ type: [cc.Enum(EventManager_1.RedEventType)], tooltip: "当前按钮所有上级的红点类型,静态节点挂载有redtip的" })
    ], RedTip.prototype, "super_red_type", void 0);
    __decorate([
        property({ type: [cc.Enum(EventManager_1.RedEventType)], tooltip: "当前按钮所有下级的红点类型,静态节点挂载有redtip的" })
    ], RedTip.prototype, "child_red_type", void 0);
    __decorate([
        property()
    ], RedTip.prototype, "is_video_btn", void 0);
    __decorate([
        property()
    ], RedTip.prototype, "is_check_self", void 0);
    RedTip = __decorate([
        ccclass
    ], RedTip);
    return RedTip;
}(cc.Component));
exports.default = RedTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXFJlZFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEU7QUFDNUUsMENBQTJEO0FBQzNELGtFQUFpRTtBQUNqRSx3Q0FBbUM7QUFDbkMsOENBQXlDO0FBQ3pDLHdEQUF1RDtBQUN2RCxxRUFBMkU7QUFDM0UsNkRBQW1FO0FBRW5FLCtDQUE0RTtBQUM1RSx3REFBcUQ7QUFDckQsb0RBQW1EO0FBQ25ELDREQUE4RDtBQUM5RCxtREFBa0Q7QUFDbEQsbURBQWtEO0FBQ2xELDBEQUFzRDtBQUN0RCwrREFBcUU7QUFDckUsbURBQThDO0FBQzlDLDREQUEyRDtBQUMzRCxrRkFBd0Y7QUFDeEYsZ0RBQStDO0FBRXpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBaWZDO1FBOWVHLG1CQUFhLEdBQWMsMkJBQVksQ0FBQyxlQUFlLENBQUM7UUFHeEQsb0JBQWMsR0FBZ0IsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3RELG9CQUFjLEdBQWdCLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0RCwyQkFBMkI7UUFFM0Isa0JBQVksR0FBUyxLQUFLLENBQUM7UUFDM0IsaUJBQWlCO1FBRWpCLG1CQUFhLEdBQVMsS0FBSyxDQUFDO1FBRTVCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsaUJBQVcsR0FBUyxLQUFLLENBQUM7UUFFMUIsY0FBYztRQUNkLG9CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUNqQyxVQUFVO1FBQ1YsYUFBTyxHQUFnQixFQUFFLENBQUM7O0lBeWQ5QixDQUFDO0lBdmRHLGtDQUFrQztJQUN4Qix1QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FB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QUFHLE1BQU07WUFDVCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQTVlRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLENBQUM7aURBQ0w7SUFHeEQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxDQUFDO2tEQUMxQjtJQUd0RDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLENBQUM7a0RBQzFCO0lBSXREO1FBREMsUUFBUSxFQUFFO2dEQUNnQjtJQUczQjtRQURDLFFBQVEsRUFBRTtpREFDaUI7SUFoQlgsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWlmMUI7SUFBRCxhQUFDO0NBamZELEFBaWZDLENBamZtQyxFQUFFLENBQUMsU0FBUyxHQWlmL0M7a0JBamZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZpdHlNYW5hZ2VyLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQWN0aXZpdHlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmNUeXBlLCBHYW1lTW9kZSwgSXNEZWJ1ZyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBQYXlJZCwgUGF5VWlJbmRleCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4vRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwVHlwZSB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0RhdGFcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERpbmdZdWVNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0L1BldE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkVGlwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkVudW0oUmVkRXZlbnRUeXBlKSx0b29sdGlwOlwi5b2T5YmN5oyJ6ZKu6Ieq5bex55qE57qi54K557G75Z6LXCJ9KVxyXG4gICAgc2VsZl9yZWRfdHlwZTpSZWRFdmVudFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25JbjtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6W2NjLkVudW0oUmVkRXZlbnRUeXBlKV0sdG9vbHRpcDpcIuW9k+WJjeaMiemSruaJgOacieS4iue6p+eahOe6oueCueexu+WeiyzpnZnmgIHoioLngrnmjILovb3mnIlyZWR0aXDnmoRcIn0pXHJcbiAgICBzdXBlcl9yZWRfdHlwZTpSZWRFdmVudFR5cGVbXT1bUmVkRXZlbnRUeXBlLkJ0bl9NYWluXTtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6W2NjLkVudW0oUmVkRXZlbnRUeXBlKV0sdG9vbHRpcDpcIuW9k+WJjeaMiemSruaJgOacieS4i+e6p+eahOe6oueCueexu+WeiyzpnZnmgIHoioLngrnmjILovb3mnIlyZWR0aXDnmoRcIn0pXHJcbiAgICBjaGlsZF9yZWRfdHlwZTpSZWRFdmVudFR5cGVbXT1bUmVkRXZlbnRUeXBlLkJ0bl9NYWluXTtcclxuXHJcbiAgICAvL+aYr+WQpuaYr+W5v+WRiuaMiemSru+8jOW5v+WRiuaMiemSrueahOivne+8jOe6oueCueWxleekuuS4gOasoeWwseWPr+S7peS6hlxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGlzX3ZpZGVvX2J0bjpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq56ys5LiA5qyh5pi+56S65pe277yM5piv5ZCm6Ieq5rWLICovXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgaXNfY2hlY2tfc2VsZjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHNob3dfbnVtOm51bWJlcj0wO1xyXG4gICAgaXNfc2hvd19yZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICAvL+S4i+e6p+WPjemmiGZhbHNl55qE5qyh5pWwXHJcbiAgICBmYWxzZV9yZWRfdHlwZTpSZWRFdmVudFR5cGVbXT1bXTtcclxuICAgIC8v5LiL57qn5Y+N6aaI55qE5oC75qyh5pWwXHJcbiAgICB0aXBfbnVtOlJlZEV2ZW50VHlwZVtdPVtdO1xyXG5cclxuICAgIC8qKuWKoOi9veaXtu+8jOiHquazqOWGjOS6i+S7tu+8jHJlZF90eXBl6ZyA6KaB5Zyo57uE5Lu25LiK6aKE5YWI6K6+572uICovXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmlzX2NoZWNrX3NlbGYpe1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgLy90aGlzLnRpcF9udW09MDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKumUgOavgeaXtu+8jOWIoOmZpOS6i+S7tu+8jHJlZF90eXBl6ZyA6KaB5Zyo57uE5Lu25LiK6aKE5YWI6K6+572uICovXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsRXZlbnQoKTtcclxuICAgIH1cclxuICAgIC8qKuazqOWGjOS6i+S7tiovXHJcbiAgICByZWdpc3RlckV2ZW50KCl7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAsdGhpcy5zZWxmX3JlZF90eXBlLHRoaXMub25DaGFuZ2VUaXAsdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyx0aGlzLnNlbGZfcmVkX3R5cGUsdGhpcy5vbkNoZWNrLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vblRvdWNoRW5kLHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5Y+W5raI5LqL5Lu2Ki9cclxuICAgIGNhbmNlbEV2ZW50KCl7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnJlbW92ZVJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAsdGhpcy5zZWxmX3JlZF90eXBlLHRoaXMub25DaGFuZ2VUaXAsdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnJlbW92ZVJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyx0aGlzLnNlbGZfcmVkX3R5cGUsdGhpcy5vbkNoZWNrLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAvLyBsZXQgdGFuaGFvPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGFuaGFvJyk7XHJcbiAgICAgICAgLy8gaWYodGFuaGFvKVxyXG4gICAgICAgIC8vIHRhbmhhby5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaEVuZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfc2hvd19yZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dfbnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfdmlkZW9fYnRuKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VUaXAoZmFsc2UsdGhpcy5zZWxmX3JlZF90eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlLnnuqLngrnkuovku7bnsbvlnoss5Li76KaB6YCC55So5LqO5ZCM5LiA5Liq55WM6Z2i55qE5ZCM5LiA5Liq5oyJ6ZKu77yM5YiH5o2i5LiN5ZCM55qE5YWz6IGU57G75Z6L5pe277yM5q+U5aaC6KeS6Imy6aG155qE5Y2H57qn5oyJ6ZKuKi9cclxuICAgIGNoYW5nZVJlZFR5cGUocmVkVHlwZTpSZWRFdmVudFR5cGUpe1xyXG4gICAgICAgIGlmKHJlZFR5cGUhPXRoaXMuc2VsZl9yZWRfdHlwZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsRXZlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxmX3JlZF90eXBlPXJlZFR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq5b2T5LqL5Lu25Y+R55Sf5Y+Y5YyW5pe25Zue6LCDXHJcbiAgICAgKiBpc1Nob3fvvJrmmK/lkKbmmL7npLrnuqLngrnvvIzkuIDoiKznlLHkuIvnuqfpgJrnn6VcclxuICAgICAqIHJlZFR5cGU65Y+R6YCBb25DaGFuZ2VUaXDnmoTnuqLngrnnsbvlnovnuqLngrnnsbvlnotcclxuICAgICAqICovXHJcbiAgICBvbkNoYW5nZVRpcChpc1Nob3c6Ym9vbGVhbixwb3N0UmVkVHlwZTpSZWRFdmVudFR5cGUpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZl9yZWRfdHlwZT09UmVkRXZlbnRUeXBlLkJ0bl9NYWluKXtcclxuICAgICAgICAgICAgLy9jYy5sb2coJzE6OicrdGhpcy5mYWxzZV9yZWRfdHlwZS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfcmVkPWlzU2hvdztcclxuICAgICAgICBpZihwb3N0UmVkVHlwZSl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnRpcF9udW0uaW5jbHVkZXMocG9zdFJlZFR5cGUpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwX251bS5wdXNoKHBvc3RSZWRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1Nob3c9PXRydWUpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hZGRUaXAoKTtcclxuICAgICAgICAgICAgLy/lpoLmnpzmmL7npLrnuqLngrnvvIzpnIDopoHpgJrnn6XkuIrnuqfkuZ/opoHmmL7npLpcclxuICAgICAgICAgICAgdGhpcy5zdXBlcl9yZWRfdHlwZS5mb3JFYWNoKChyZWRUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfVElQLHJlZFR5cGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHBvc3RSZWRUeXBlKXtcclxuICAgICAgICAgICAgICAgIGlmKHBvc3RSZWRUeXBlIT10aGlzLnNlbGZfcmVkX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmZhbHNlX3JlZF90eXBlLmluY2x1ZGVzKHBvc3RSZWRUeXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFsc2VfcmVkX3R5cGUucHVzaChwb3N0UmVkVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmFsc2VfcmVkX3R5cGUubGVuZ3RoPj10aGlzLmNoaWxkX3JlZF90eXBlLmxlbmd0aCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRpcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGlwKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGlwKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coXCLmiJHmiJHmiJHmmK9cIit0aGlzLnNlbGZfcmVkX3R5cGUrXCIs5o+Q56S65qyh5pWw77yaOlwiK3RoaXMudGlwX251bSk7XHJcbiAgICAgICAgaWYodGhpcy50aXBfbnVtLmxlbmd0aD49dGhpcy5jaGlsZF9yZWRfdHlwZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmZhbHNlX3JlZF90eXBlPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9udW09bmV3IEFycmF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5Li75Yqo5qOA5rWL5LiA5Liq57qi54K55LqL5Lu25piv5ZCm6IO95pi+56S6XHJcbiAgICAgKiAg5aaC5p6c5pyJ5LiL57qn77yM5YiZ6K6p5LiL57qn6L+b6KGM5qOA5p+l77yM5b2T5rKh5pyJ6Ieq5bex5LiL57qn55qE5pe25YCZ5omN5byA5aeL5qOA5p+l6Ieq6LqrXHJcbiAgICAgKiAgXHJcbiAgICAgKiAg5LiA6Iis55Sx5LiK57qn6YCa55+lLOS5n+WPr+S4u+WKqOiwg+eUqFxyXG4gICAgICogKi9cclxuICAgIG9uQ2hlY2soKXtcclxuICAgICAgICBpZih0aGlzLmNoaWxkX3JlZF90eXBlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdGhpcy5mYWxzZV9yZWRfdHlwZT1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy50aXBfbnVtPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkX3JlZF90eXBlLmZvckVhY2goKHJlZFR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxyZWRUeXBlLHRydWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+ayoeacieS4i+e6p+WwseajgOa1i+iHquW3se+8jOWPquacieajgOafpeWIsOS4unRydWXml7bmiY3kuIrmiqVcclxuICAgICAgICAgICAgdGhpcy5jaGVja1NlbGYodHJ1ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvoh6rlt7HvvIzln7rmnKzmiYDmnInnmoTnmoTnsbvlnovpg73opoHmnInoh6rmtYvmlrnmoYhcclxuICAgICAqIEBwYXJhbSBpc1Bvc3Qg6Ieq5rWL5a6M5q+V5ZCO5piv5ZCm5LiK5oql57uZ6Ieq5bex55qE5LiK57qnXHJcbiAgICAgKiBAcGFyYW0gcmVkVHlwZSDnuqLngrnnsbvlnotJROOAguS4jeS8oOaXtu+8jOm7mOiupOaYr+iHqui6q2lk77yM5Lyg5YC85pe277yM55So5LqO5LiK57qn5ZCR5LiL57qn5Lyg6L6+5qOA5rWL5ZG95LukXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbpnIDopoHnuqLngrnmj5DnpLpcclxuICAgICAqL1xyXG4gICAgY2hlY2tTZWxmKGlzUG9zdDpib29sZWFuLHJlZFR5cGU6UmVkRXZlbnRUeXBlPXRoaXMuc2VsZl9yZWRfdHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoKHJlZFR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKirkuLvln47nmoQgKi9cclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1Nob3A6eyAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGdkPUdhbWVEYXRhLmdldEluc3RhbmNlKCk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICBpc1RpcD1nZC5nZXRIZXJvUmVjcnVpdGluZ1JlZFRpcCgpLy98fGdkLmdldFBldFJlY3J1aXRpbmdSZWRUaXAoKXx8Z2QuZ2V0RXF1aXBGcmVlUmVkVGlwKCl8fGdkLmdldEdlbUZyZWVSZWRUaXAoKXx8Z2QuZ2V0Q29pbkZyZWVSZWRUaXAoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2FzZSBSZWRFdmVudFR5cGUuQnRuX0NpdHlfRXF1aXBfMTp7XHJcbiAgICAgICAgICAgIC8vICAgICBpc1RpcD1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tFcXVpcE1lcmdlKEVxdWlwVHlwZS5XdVFpKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQ2l0eV9FcXVpcF8yOntcclxuICAgICAgICAgICAgLy8gICAgIGlzVGlwPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0VxdWlwTWVyZ2UoRXF1aXBUeXBlLkh1SmlhKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQ2l0eV9FcXVpcF8zOntcclxuICAgICAgICAgICAgLy8gICAgIGlzVGlwPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0VxdWlwTWVyZ2UoRXF1aXBUeXBlLlNoaVBpbik7XHJcbiAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBSZWRFdmVudFR5cGUuQnRuX0NpdHlfRXF1aXBfTWVyZ2VBbGw6e1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5aaHVhbmdCZWlIZUNoZW5nKSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBmb3IobGV0IGk9RXF1aXBUeXBlLld1UWk7IGk8RXF1aXBUeXBlLk51bTsgaSsrKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpc1RpcD1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tFcXVpcE1lcmdlKGkpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGlzVGlwKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1Rhc2s6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZF9yZWRfdHlwZS5mb3JFYWNoKChyZWRUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc1Q9dGhpcy5jaGVja1NlbGYoZmFsc2UscmVkVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNUKXtcclxuICAgICAgICAgICAgICAgICAgICAgaXNUaXA9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fVGFza19EYWlseTp7XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1UYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhaWx5VGFza0lzQ2FuR2V0KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9UYXNrX0FjaGlldmVubWVudDp7XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1UYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFjaGlldmVubWVudFRhc2tJc0NhbkdldCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlOntcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuY2hpbGRfcmVkX3R5cGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPXRoaXMuY2hlY2tTZWxmKGZhbHNlLHRoaXMuY2hpbGRfcmVkX3R5cGVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzVGlwPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzI6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMzpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF80OlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzU6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNjpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF83OlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzg6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfOTpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMDpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMTpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhtPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPUhlcm9NYW5hZ2VyLmdldEhlcm9UeXBlQnlSZWRUeXBlKHJlZFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9JbmZvPWhtLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9JbmZvIT1udWxsKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5Y2H57qnXHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VwZ3JhZGUoaGVyb1R5cGUpLmlzX2Nhbl91cDsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreWNh+aYn1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tVcFN0YXIoaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreijheWkh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0xOyBpPEVxdWlwVHlwZS5OdW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RpcD1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tXZWFyKGhlcm9UeXBlLGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lrqDnialcclxuICAgICAgICAgICAgICAgICAgICBpZighaXNUaXApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RpcD1QZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tSZWRUaXAoaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreS4k+atplxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tFeFVwKGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreino+mUgVxyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tVbmxvY2soaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0luZm9fVXBncmFkZUFsbDp7XHJcbiAgICAgICAgICAgICAgICAvL+WNh+e6p1xyXG4gICAgICAgICAgICAgICAgbGV0IGhtPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdXBEYXRhPWhtLmNoZWNrVXBncmFkZShoZXJvTGlzdFtpXS5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKHVwRGF0YS5pc19jYW5fdXApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfRXF1aXBfV2VhckFsbDp7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW09RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGhlcm9MaXN0W2ldLmhlcm9fdHlwZSk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0NhbldlYXI9ZW0uY2hlY2tRdWlja1dlYXIoaGVyb0xpc3RbaV0uaGVyb190eXBlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNDYW5XZWFyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRfcmVkX3R5cGUuZm9yRWFjaCgocmVkVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgIGxldCBpc1Q9dGhpcy5jaGVja1NlbGYoZmFsc2UscmVkVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICBpZihpc1Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9YnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NwaW46e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5aaHVhblBhbikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAwKT09MVxyXG4gICAgICAgICAgICAgICAgLy8gfHwgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UdXJtdGFibGVBZCwwKSA8IDEwOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9UYXNrOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuTWVpUmlSZW5XdSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lpZblirHnianlk4FcclxuICAgICAgICAgICAgICAgIC8vIGlzVGlwPVRhc2tNYW5nZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc0hhdmVHZXQoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fUmFuazp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlBhaUhhbmdCYW5nKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW46e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5RaWFuRGFvKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldElzU2lnblRvZGF5KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluX0J0bkdldDp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlFpYW5EYW8pKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzVGlwPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SXNTaWduVG9kYXkoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaTp7ICAgIFxyXG4gICAgICAgICAgICAgICAgLy/mjILmnLrmjInpkq5cclxuICAgICAgICAgICAgICAgIGlzVGlwPXRoaXMuY2hlY2tTZWxmKGZhbHNlLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaV9CdG5fR3VhSmkpICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/lv6vpgJ/mjILmnLrmmK/lkKbmnInlub/lkYrmnLrkvJpcclxuICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9dGhpcy5jaGVja1NlbGYoZmFsc2UsUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppX0J0bl9GYXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaV9CdG5fRmFzdDp7XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc0NhbkFkRmFzdEd1YUppKCk7XHJcbiAgICAgICAgICAgIH1icmVhazsgIFxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaV9CdG5fRmFzdF9BZDp7XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc0NhbkFkRmFzdEd1YUppKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fR3VhamlfQnRuX0d1YUppOntcclxuICAgICAgICAgICAgICAgIGlzVGlwPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzQ2FuR3VhSmlSZWRUaXAoKTtcclxuICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV8wOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFwX1RlYW1fMTpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01hcF9UZWFtXzI6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV8zOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFwX1RlYW1fNDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlIT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNb2RlLk1haW4pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1OdW09MDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHRlYW1MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0ZWFtTGlzdFtpXT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB1bmxvY2tOdW09MDtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvTGlzdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChoZXJvTGlzdFtpXS5oZXJvX3R5cGUpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2tOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+ayoea7oeWRmO+8jOW5tuS4lOino+mUgeeahOaVsOmHj+avlOaIkOWRmOaVsOmHj+Wkp1xyXG4gICAgICAgICAgICAgICAgaWYobU51bTx0ZWFtTGlzdC5sZW5ndGggJiYgbU51bTx1bmxvY2tOdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVjaEluZGV4PXJlZFR5cGUtUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV8wOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbY2hlY2hJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaGVyb1R5cGU8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ivpeS9jee9ruepuuS6hlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1ZpcDp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlZJUCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblj6/ku6XlnKjmnKrotK3kubDnmoTmg4XlhrXkuIvvvIzmmL7npLrkuIDmrKHjgIJcclxuICAgICAgICAgICAgICAgIGxldCBWaXBJZGVudGl0eT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcElkZW50aXR5LDApIFxyXG4gICAgICAgICAgICAgICAgaWYoVmlwSWRlbnRpdHk9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGdW5jVG9kYXlTaG93KEZ1bmNUeXBlLlZJUCk8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgQWxsQWN0aXZpdHlOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkFsbEFjdGl2aXR5TnVtLDApOy8v5oC75rS76LeD5bqmICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdG1laW5kZXggPSAwOyBpdG1laW5kZXggPCAxNTsgaXRtZWluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ9aXRtZWluZGV4KzEgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBSZXF1aXJlZEV4PUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJlcXVpcmVkRXhwKGlkKS8v5omA6ZyA5rS76LeD5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoUmVxdWlyZWRFeDw9QWxsQWN0aXZpdHlOdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgVmlwRnJlZVJld2FyZFN0YXR1cyA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVmlwRnJlZVJld2FyZFN0YXR1cytpZCwwKTsvL3ZpcOWFjei0ueWlluWKseeKtuaAgSAgICAw5pyq6aKG5Y+WLDHlt7Lpooblj5YgICAgIDAtMTRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBBZHZhbmNlZFJld2FyZFN0YXR1cytpZCwwKTsvL3ZpcOmrmOe6p+WlluWKseeKtuaAgSAgICAw5pyq6aKG5Y+WLDHlt7LpooZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVmlwRnJlZVJld2FyZFN0YXR1cz09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXM9PTAmJlZpcElkZW50aXR5PT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3VDaG9uZzp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkZpcnN0Q2hhcmdlKXx8UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheU51bSgnYzMwMScpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZ1bmNUb2RheVNob3coRnVuY1R5cGUuRmlyc3RDaGFyZ2UpPD0wO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1dlZWtDYXJkOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuV2Vla0NhcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzVGlwPVBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGdW5jVG9kYXlTaG93KEZ1bmNUeXBlLldlZWtDYXJkKTw9MHx8KERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXkmJlRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuV2Vla0NhcmRJc1JlY2VpdmVUb2RheSwwKTw9MCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fTGVpQ2hvbmc6e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5BY2N1bXVsYXRlZFJlY2hhcmdlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnVuY1RvZGF5U2hvdyhGdW5jVHlwZS5BY2N1bXVsYXRlZFJlY2hhcmdlKTw9MDtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2FuR2V0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyTWFwPUN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmV3YXJkTWFwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyTWFwLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNDYW5HZXQ9PWZhbHNlICYmIHYgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NhbkdldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9aXNDYW5HZXQ7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQWN0aXZpdHk6e1xyXG4gICAgICAgICAgICAgICAgaXNUaXA9KEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5XdUppblRpYW9aaGFuKSYmVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywwKT4wKXx8KEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5HZVJlbkJvc3MpJiZUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywwKT4wKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQWN0aXZpdHlfRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzVGlwPUFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpY2tldChBY3Rpdml0eVR5cGUuRW5kbGVzcyk+MDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQWN0aXZpdHlfQm9zczp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkdlUmVuQm9zcykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9QWN0aXZpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGlja2V0KEFjdGl2aXR5VHlwZS5Cb3NzKT4wO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9BY3Rpdml0eV9NYXplOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuTWlHb25nKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrRGF0ZSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y+q5pyJaXNQb3N05Li6dHJ1ZeaXtuaJjeWPkemAgVxyXG4gICAgICAgIGlmKGlzUG9zdCl7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCx0aGlzLnNlbGZfcmVkX3R5cGUsaXNUaXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNUaXA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGlwKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFuaGFvPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGFuaGFvJyk7XHJcbiAgICAgICAgaWYoIXRhbmhhbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhbmhhbz1uZXcgY2MuTm9kZSgndGFuaGFvJyk7XHJcbiAgICAgICAgICAgIHRhbmhhby5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKCdDb21tb25fSWNvbl9SZWREb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRhbmhhbyk7XHJcbiAgICAgICAgICAgIHRhbmhhby54PXRoaXMubm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICB0YW5oYW8ueT10aGlzLm5vZGUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIHRhbmhhby5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5zY2FsZTwxKVxyXG4gICAgICAgICAgICB0YW5oYW8uc2NhbGU9MS90aGlzLm5vZGUuc2NhbGU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhbmhhbykudG8oMC4yLHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVGlwKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN1cGVyX3JlZF90eXBlLmZvckVhY2goKHJlZFR5cGUpPT57XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxyZWRUeXBlLGZhbHNlLHRoaXMuc2VsZl9yZWRfdHlwZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdGFuaGFvPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGFuaGFvJyk7XHJcbiAgICAgICAgaWYodGFuaGFvKVxyXG4gICAgICAgIHRhbmhhby5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5mYWxzZV9yZWRfdHlwZT1uZXcgQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19