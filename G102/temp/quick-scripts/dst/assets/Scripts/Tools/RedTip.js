
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
                    isTip = PayManager_1.PayManager.getInstance().getFuncTodayShow(Constants_1.FuncType.WeekCard) <= 0 || (DingYueManager_1.DingYueManager.getInstance().getWeekInfo() && DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy && StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 0) <= 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXFJlZFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEU7QUFDNUUsMENBQTJEO0FBQzNELGtFQUFpRTtBQUNqRSx3Q0FBbUM7QUFDbkMsOENBQXlDO0FBQ3pDLHdEQUF1RDtBQUN2RCxxRUFBMkU7QUFDM0UsNkRBQW1FO0FBRW5FLCtDQUE0RTtBQUM1RSx3REFBcUQ7QUFDckQsb0RBQW1EO0FBQ25ELDREQUE4RDtBQUM5RCxtREFBa0Q7QUFDbEQsbURBQWtEO0FBQ2xELDBEQUFzRDtBQUN0RCwrREFBcUU7QUFDckUsbURBQThDO0FBQzlDLDREQUEyRDtBQUMzRCxrRkFBd0Y7QUFDeEYsZ0RBQStDO0FBRXpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBaWZDO1FBOWVHLG1CQUFhLEdBQWMsMkJBQVksQ0FBQyxlQUFlLENBQUM7UUFHeEQsb0JBQWMsR0FBZ0IsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3RELG9CQUFjLEdBQWdCLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0RCwyQkFBMkI7UUFFM0Isa0JBQVksR0FBUyxLQUFLLENBQUM7UUFDM0IsaUJBQWlCO1FBRWpCLG1CQUFhLEdBQVMsS0FBSyxDQUFDO1FBRTVCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsaUJBQVcsR0FBUyxLQUFLLENBQUM7UUFFMUIsY0FBYztRQUNkLG9CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUNqQyxVQUFVO1FBQ1YsYUFBTyxHQUFnQixFQUFFLENBQUM7O0lBeWQ5QixDQUFDO0lBdmRHLGtDQUFrQztJQUN4Qix1QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsc0JBQUssR0FBZjtRQUNJLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLGlCQUFpQjtTQUNwQjtJQUNMLENBQUM7SUFDRCxpQ0FBaUM7SUFDdkIsMEJBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFNBQVM7SUFDVCw4QkFBYSxHQUFiO1FBQ0ksMkJBQVksQ0FBQyxXQUFXLENBQUMsNkJBQWMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFGLDJCQUFZLENBQUMsV0FBVyxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUMzQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUNELFNBQVM7SUFDVCw0QkFBVyxHQUFYO1FBQ0ksMkJBQVksQ0FBQyxjQUFjLENBQUMsNkJBQWMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdGLDJCQUFZLENBQUMsY0FBYyxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxpREFBaUQ7UUFDakQsYUFBYTtRQUNiLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsMkJBQVUsR0FBVjtRQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO2dCQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDOUM7U0FDSjtJQUNMLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsOEJBQWEsR0FBYixVQUFjLE9BQW9CO1FBQzlCLElBQUcsT0FBTyxJQUFFLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUVMLENBQUM7SUFFRDs7O1NBR0s7SUFDTCw0QkFBVyxHQUFYLFVBQVksTUFBYyxFQUFDLFdBQXdCO1FBQy9DLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBRSwyQkFBWSxDQUFDLFFBQVEsRUFBQztZQUN6QywyQ0FBMkM7U0FDOUM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFHLFdBQVcsRUFBQztZQUNYLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQztnQkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUNELElBQUcsTUFBTSxJQUFFLElBQUksRUFBQztZQUVaLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQ2hDLDJCQUFZLENBQUMsWUFBWSxDQUFDLDZCQUFjLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQTtTQUNMO2FBQ0c7WUFDQSxJQUFHLFdBQVcsRUFBQztnQkFDWCxJQUFHLFdBQVcsSUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDO29CQUMvQixJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7d0JBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUN6QztvQkFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDO3dCQUN0RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7cUJBQ3BCO2lCQUNKO3FCQUFJO29CQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDcEI7YUFDSjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7U0FDSjtRQUNELDJEQUEyRDtRQUMzRCxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0Q7Ozs7U0FJSztJQUNMLHdCQUFPLEdBQVA7UUFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDaEMsMkJBQVksQ0FBQyxZQUFZLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFBSTtZQUNELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0lBRUwsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsMEJBQVMsR0FBVCxVQUFVLE1BQWMsRUFBQyxPQUF1QztRQUFoRSxpQkE4VEM7UUE5VHdCLHdCQUFBLEVBQUEsVUFBcUIsSUFBSSxDQUFDLGFBQWE7UUFDNUQsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDO1FBQ2hCLFFBQU8sT0FBTyxFQUNkO1lBQ0ksU0FBUztZQUNULEtBQUssMkJBQVksQ0FBQyxRQUFRO2dCQUFDO29CQUN2QixJQUFJLEVBQUUsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM5QixLQUFLLEdBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUEsQ0FBQSx3R0FBd0c7aUJBQzdJO2dCQUFBLE1BQU07WUFFUCx1Q0FBdUM7WUFDdkMsNEVBQTRFO1lBQzVFLFVBQVU7WUFDVix1Q0FBdUM7WUFDdkMsNkVBQTZFO1lBQzdFLFVBQVU7WUFDVix1Q0FBdUM7WUFDdkMsOEVBQThFO1lBQzlFLFVBQVU7WUFDViw4Q0FBOEM7WUFDOUMsMkZBQTJGO1lBQzNGLHVCQUF1QjtZQUN2QixpQkFBaUI7WUFDakIsUUFBUTtZQUNSLHVEQUF1RDtZQUN2RCxtRUFBbUU7WUFDbkUscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixZQUFZO1lBQ1osUUFBUTtZQUNSLFVBQVU7WUFHVixLQUFLLDJCQUFZLENBQUMsUUFBUTtnQkFBQztvQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO3dCQUNoQyxJQUFJLEdBQUcsR0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEMsSUFBRyxHQUFHLEVBQUM7NEJBQ04sS0FBSyxHQUFDLElBQUksQ0FBQzt5QkFDWDtvQkFDSixDQUFDLENBQUMsQ0FBQTtpQkFDTjtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLGNBQWM7Z0JBQUM7b0JBQzdCLEtBQUssR0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUM7aUJBQzFEO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMscUJBQXFCO2dCQUFDO29CQUNwQyxLQUFLLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2lCQUNqRTtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLFFBQVE7Z0JBQUM7b0JBQ3ZCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDM0MsS0FBSyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkQsSUFBRyxLQUFLLElBQUUsSUFBSSxFQUFDOzRCQUNmLE1BQU07eUJBQ0w7cUJBQ0o7aUJBQ0o7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxlQUFlLENBQUM7WUFDbEMsS0FBSywyQkFBWSxDQUFDLGVBQWUsQ0FBQztZQUNsQyxLQUFLLDJCQUFZLENBQUMsZUFBZSxDQUFDO1lBQ2xDLEtBQUssMkJBQVksQ0FBQyxlQUFlLENBQUM7WUFDbEMsS0FBSywyQkFBWSxDQUFDLGVBQWUsQ0FBQztZQUNsQyxLQUFLLDJCQUFZLENBQUMsZUFBZSxDQUFDO1lBQ2xDLEtBQUssMkJBQVksQ0FBQyxlQUFlLENBQUM7WUFDbEMsS0FBSywyQkFBWSxDQUFDLGVBQWUsQ0FBQztZQUNsQyxLQUFLLDJCQUFZLENBQUMsZUFBZSxDQUFDO1lBQ2xDLEtBQUssMkJBQVksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuQyxLQUFLLDJCQUFZLENBQUMsZ0JBQWdCLENBQUM7WUFDbkMsS0FBSywyQkFBWSxDQUFDLGdCQUFnQjtnQkFDbEM7b0JBQ0ksSUFBSSxFQUFFLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxRQUFRLEdBQUMseUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkQsSUFBSSxRQUFRLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsSUFBRyxRQUFRLElBQUUsSUFBSSxFQUFDO3dCQUNkLE1BQU07d0JBQ04sS0FBSyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDakUsTUFBTTt3QkFDTixJQUFHLENBQUMsS0FBSyxFQUFDOzRCQUNOLEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDekQ7d0JBQ0QsTUFBTTt3QkFDTixJQUFHLENBQUMsS0FBSyxFQUFDOzRCQUNOLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyx1QkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQztnQ0FDOUIsS0FBSyxHQUFDLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQzFELElBQUcsS0FBSyxFQUFDO29DQUNMLE1BQU07aUNBQ1Q7NkJBQ0o7eUJBQ0o7d0JBQ0QsTUFBTTt3QkFDTixJQUFHLENBQUMsS0FBSyxFQUFDOzRCQUNOLEtBQUssR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDeEQ7d0JBQ0QsTUFBTTt3QkFDTixJQUFHLENBQUMsS0FBSyxFQUFDOzRCQUNOLEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDdkQ7cUJBQ0o7eUJBQUk7d0JBQ0QsTUFBTTt3QkFDTixLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsd0JBQXdCO2dCQUFDO29CQUN2QyxJQUFJO29CQUNKLElBQUksRUFBRSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2pDLElBQUksUUFBUSxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3ZELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUNoQyxxREFBcUQ7d0JBQ3JELHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQixhQUFhO3dCQUNiLElBQUk7cUJBQ1A7aUJBQ0o7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxzQkFBc0I7Z0JBQUM7b0JBQ3JDLElBQUksRUFBRSxHQUFDLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN0QyxJQUFJLFFBQVEsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN2RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDaEMsSUFBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUMsQ0FBQyxFQUFDOzRCQUMvRCxJQUFJLFNBQVMsR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzdELElBQUcsU0FBUyxFQUFDO2dDQUNULEtBQUssR0FBQyxJQUFJLENBQUM7Z0NBQ1gsTUFBTTs2QkFDVDt5QkFDSjtxQkFDSjtpQkFDSjtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLFFBQVE7Z0JBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTzt3QkFDakMsSUFBSSxHQUFHLEdBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RDLElBQUcsR0FBRyxFQUFDOzRCQUNOLEtBQUssR0FBQyxJQUFJLENBQUM7eUJBQ1g7b0JBQ0osQ0FBQyxDQUFDLENBQUE7aUJBQ0w7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxhQUFhO2dCQUFDO29CQUM1QixJQUFHLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7d0JBQ3ZFLEtBQUssR0FBQyxLQUFLLENBQUM7d0JBQ1osTUFBTTtxQkFDVDtvQkFDRCxLQUFLLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBO29CQUNsRiwrRkFBK0Y7aUJBQ2xHO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsYUFBYTtnQkFBQztvQkFDNUIsSUFBRyxDQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDO3dCQUN6RSxLQUFLLEdBQUMsS0FBSyxDQUFDO3dCQUNaLE1BQU07cUJBQ1Q7b0JBQ0QsUUFBUTtvQkFDUixpREFBaUQ7aUJBQ2hEO2dCQUFBLE1BQU07WUFDWCxLQUFLLDJCQUFZLENBQUMsYUFBYTtnQkFBQztvQkFDNUIsSUFBRyxDQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDO3dCQUMxRSxLQUFLLEdBQUMsS0FBSyxDQUFDO3dCQUNaLE1BQU07cUJBQ1Q7aUJBRUo7Z0JBQUEsTUFBTTtZQUVQLEtBQUssMkJBQVksQ0FBQyxlQUFlO2dCQUFDO29CQUM5QixJQUFHLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsT0FBTyxDQUFDLEVBQUM7d0JBQ3RFLEtBQUssR0FBQyxLQUFLLENBQUM7d0JBQ1osTUFBTTtxQkFDVDtvQkFDRCxLQUFLLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDakQ7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxzQkFBc0I7Z0JBQUM7b0JBQ3JDLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQzt3QkFDdEUsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUNqRDtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLGNBQWM7Z0JBQUM7b0JBQzdCLE1BQU07b0JBQ04sS0FBSyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLDJCQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtvQkFDakUsYUFBYTtvQkFDYixJQUFHLENBQUMsS0FBSyxFQUFDO3dCQUNOLEtBQUssR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQywyQkFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUM7cUJBQ3BFO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsdUJBQXVCO2dCQUFDO29CQUN0QyxLQUFLLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDaEU7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQywwQkFBMEI7Z0JBQUM7b0JBQ3pDLEtBQUssR0FBQyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUNoRTtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLHdCQUF3QjtnQkFBQztvQkFDdkMsS0FBSyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQ2hFO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsY0FBYyxDQUFDO1lBQ2pDLEtBQUssMkJBQVksQ0FBQyxjQUFjLENBQUM7WUFDakMsS0FBSywyQkFBWSxDQUFDLGNBQWMsQ0FBQztZQUNqQyxLQUFLLDJCQUFZLENBQUMsY0FBYyxDQUFDO1lBQ2pDLEtBQUssMkJBQVksQ0FBQyxjQUFjO2dCQUNoQztvQkFDSSxJQUFHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxJQUFFLG9CQUFRLENBQUMsSUFBSSxFQUFDO3dCQUN0RCxLQUFLLEdBQUMsS0FBSyxDQUFDO3dCQUNaLE1BQU07cUJBQ1Q7b0JBQ0QsSUFBSSxRQUFRLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxJQUFJLEdBQUMsQ0FBQyxDQUFDO29CQUNYLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUNoQyxJQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7NEJBQ2IsSUFBSSxFQUFFLENBQUM7eUJBQ1Y7cUJBQ0o7b0JBQ0QsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO29CQUNoQixJQUFJLFFBQVEsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN2RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDaEMsSUFBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUMsQ0FBQyxFQUFDOzRCQUMvRCxTQUFTLEVBQUUsQ0FBQzt5QkFDZjtxQkFDSjtvQkFDRCxtQkFBbUI7b0JBQ25CLElBQUcsSUFBSSxHQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFDLFNBQVMsRUFBQzt3QkFDdEMsSUFBSSxVQUFVLEdBQUMsT0FBTyxHQUFDLDJCQUFZLENBQUMsY0FBYyxDQUFDO3dCQUNuRCxJQUFJLFFBQVEsR0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ2xDLElBQUcsUUFBUSxJQUFFLENBQUMsRUFBQzs0QkFDWCxPQUFPOzRCQUNQLEtBQUssR0FBQyxJQUFJLENBQUM7eUJBQ2Q7cUJBQ0o7eUJBQUk7d0JBQ0QsS0FBSyxHQUFDLEtBQUssQ0FBQztxQkFDZjtpQkFDSjtnQkFBQSxNQUFNO1lBQ1AsS0FBSywyQkFBWSxDQUFDLFlBQVk7Z0JBQUM7b0JBQzNCLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQzt3QkFDbEUsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELHNCQUFzQjtvQkFDdEIsSUFBSSxXQUFXLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNuRixJQUFHLFdBQVcsSUFBRSxDQUFDLEVBQUM7d0JBQ2QsSUFBRyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9CQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxFQUFDOzRCQUMxRCxLQUFLLEdBQUMsSUFBSSxDQUFDOzRCQUNYLE1BQU07eUJBQ1Q7cUJBQ0o7b0JBQ0QsSUFBSSxjQUFjLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsU0FBUztvQkFDckcsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRTt3QkFDakQsSUFBSSxFQUFFLEdBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQTt3QkFFbEIsSUFBSSxVQUFVLEdBQUMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUEsT0FBTzt3QkFDNUUsSUFBRyxVQUFVLElBQUUsY0FBYyxFQUFDOzRCQUMxQixJQUFJLG1CQUFtQixHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLG1CQUFtQixHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLGlDQUFpQzs0QkFDMUksSUFBSSx1QkFBdUIsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSx1QkFBdUI7NEJBQ3hJLElBQUcsbUJBQW1CLElBQUUsQ0FBQyxFQUFDO2dDQUN0QixLQUFLLEdBQUMsSUFBSSxDQUFDO2dDQUNYLE1BQU07NkJBQ1Q7NEJBQ0QsSUFBRyx1QkFBdUIsSUFBRSxDQUFDLElBQUUsV0FBVyxJQUFFLENBQUMsRUFBQztnQ0FDMUMsS0FBSyxHQUFDLElBQUksQ0FBQztnQ0FDWCxNQUFNOzZCQUNUO3lCQUNKO3FCQUNKO2lCQUNKO2dCQUFBLE1BQU07WUFFUCxLQUFLLDJCQUFZLENBQUMsa0JBQWtCO2dCQUFDO29CQUNqQyxJQUFHLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsV0FBVyxDQUFDLElBQUUsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxFQUFDO3dCQUN4SCxLQUFLLEdBQUMsS0FBSyxDQUFDO3dCQUNaLE1BQU07cUJBQ1Q7b0JBQ0QsS0FBSyxHQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsb0JBQVEsQ0FBQyxXQUFXLENBQUMsSUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsaUJBQWlCO2dCQUFDO29CQUNoQyxJQUFHLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7d0JBQ3ZFLEtBQUssR0FBQyxLQUFLLENBQUM7d0JBQ1osTUFBTTtxQkFDVDtvQkFDRCxLQUFLLEdBQUMsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLCtCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUUsK0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLElBQUUsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUFVLENBQUMsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFQO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsaUJBQWlCO2dCQUFDO29CQUNoQyxJQUFHLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBQzt3QkFDbEYsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9CQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBRSxDQUFDLENBQUM7b0JBQ2pGLElBQUcsQ0FBQyxLQUFLLEVBQUM7d0JBQ04sSUFBSSxVQUFRLEdBQVMsS0FBSyxDQUFDO3dCQUMzQixJQUFJLFFBQVEsR0FBQyxnREFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ2hFLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQzs0QkFDakIsSUFBRyxVQUFRLElBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0NBQ3pCLFVBQVEsR0FBQyxJQUFJLENBQUM7NkJBQ2pCO3dCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUssR0FBQyxVQUFRLENBQUM7cUJBQ2xCO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxLQUFLLDJCQUFZLENBQUMsWUFBWTtnQkFBQztvQkFDM0IsS0FBSyxHQUFDLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLG9CQUFRLENBQUMsYUFBYSxDQUFDLElBQUUsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxTQUFTLENBQUMsSUFBRSxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQVUsQ0FBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN1Q7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxvQkFBb0I7Z0JBQUM7b0JBQ25DLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxhQUFhLENBQUMsRUFBQzt3QkFDNUUsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBQyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyw4QkFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQztpQkFDekU7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxpQkFBaUI7Z0JBQUM7b0JBQ2hDLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxTQUFTLENBQUMsRUFBQzt3QkFDeEUsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBQyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyw4QkFBWSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztpQkFDdEU7Z0JBQUEsTUFBTTtZQUNQLEtBQUssMkJBQVksQ0FBQyxpQkFBaUI7Z0JBQUM7b0JBQ2hDLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQzt3QkFDckUsS0FBSyxHQUFDLEtBQUssQ0FBQzt3QkFDWixNQUFNO3FCQUNUO29CQUNELEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUMvQztnQkFBQSxNQUFNO1NBQ1Y7UUFDRCxtQkFBbUI7UUFDbkIsSUFBRyxNQUFNLEVBQUM7WUFDTiwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHVCQUFNLEdBQU47UUFFSSxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFHLENBQUMsTUFBTSxFQUNWO1lBQ0ksTUFBTSxHQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2RyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztZQUNqQixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2xEO0lBRUwsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFBQSxpQkFTQztRQVBHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUNoQywyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUcsTUFBTTtZQUNULE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBNWVEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsQ0FBQztpREFDTDtJQUd4RDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLENBQUM7a0RBQzFCO0lBR3REO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywyQkFBWSxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsQ0FBQztrREFDMUI7SUFJdEQ7UUFEQyxRQUFRLEVBQUU7Z0RBQ2dCO0lBRzNCO1FBREMsUUFBUSxFQUFFO2lEQUNpQjtJQWhCWCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBaWYxQjtJQUFELGFBQUM7Q0FqZkQsQUFpZkMsQ0FqZm1DLEVBQUUsQ0FBQyxTQUFTLEdBaWYvQztrQkFqZm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpdml0eU1hbmFnZXIsIEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi9BY3Rpdml0eS9BY3Rpdml0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRnVuY1R5cGUsIEdhbWVNb2RlLCBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgT2ZmbGluZVJldmVudWVNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL09mZmxpbmVSZXZlbnVlXCI7XHJcbmltcG9ydCB7IFBheUlkLCBQYXlVaUluZGV4IH0gZnJvbSBcIi4uL3RoaXJkUGFydHkvVGhpcmRQYXJ0eVwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXF1aXBUeXBlIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCYXR0bGVQYXNzRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzRGF0YVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9EaW5nWXVlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlciB9IGZyb20gXCIuLi9BY2N1bXVsYXRlZFJlY2hhcmdlL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRUaXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShSZWRFdmVudFR5cGUpLHRvb2x0aXA6XCLlvZPliY3mjInpkq7oh6rlt7HnmoTnuqLngrnnsbvlnotcIn0pXHJcbiAgICBzZWxmX3JlZF90eXBlOlJlZEV2ZW50VHlwZT1SZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuRW51bShSZWRFdmVudFR5cGUpXSx0b29sdGlwOlwi5b2T5YmN5oyJ6ZKu5omA5pyJ5LiK57qn55qE57qi54K557G75Z6LLOmdmeaAgeiKgueCueaMgui9veaciXJlZHRpcOeahFwifSlcclxuICAgIHN1cGVyX3JlZF90eXBlOlJlZEV2ZW50VHlwZVtdPVtSZWRFdmVudFR5cGUuQnRuX01haW5dO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuRW51bShSZWRFdmVudFR5cGUpXSx0b29sdGlwOlwi5b2T5YmN5oyJ6ZKu5omA5pyJ5LiL57qn55qE57qi54K557G75Z6LLOmdmeaAgeiKgueCueaMgui9veaciXJlZHRpcOeahFwifSlcclxuICAgIGNoaWxkX3JlZF90eXBlOlJlZEV2ZW50VHlwZVtdPVtSZWRFdmVudFR5cGUuQnRuX01haW5dO1xyXG5cclxuICAgIC8v5piv5ZCm5piv5bm/5ZGK5oyJ6ZKu77yM5bm/5ZGK5oyJ6ZKu55qE6K+d77yM57qi54K55bGV56S65LiA5qyh5bCx5Y+v5Lul5LqGXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgaXNfdmlkZW9fYnRuOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirnrKzkuIDmrKHmmL7npLrml7bvvIzmmK/lkKboh6rmtYsgKi9cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBpc19jaGVja19zZWxmOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgc2hvd19udW06bnVtYmVyPTA7XHJcbiAgICBpc19zaG93X3JlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIC8v5LiL57qn5Y+N6aaIZmFsc2XnmoTmrKHmlbBcclxuICAgIGZhbHNlX3JlZF90eXBlOlJlZEV2ZW50VHlwZVtdPVtdO1xyXG4gICAgLy/kuIvnuqflj43ppojnmoTmgLvmrKHmlbBcclxuICAgIHRpcF9udW06UmVkRXZlbnRUeXBlW109W107XHJcblxyXG4gICAgLyoq5Yqg6L295pe277yM6Ieq5rOo5YaM5LqL5Lu277yMcmVkX3R5cGXpnIDopoHlnKjnu4Tku7bkuIrpooTlhYjorr7nva4gKi9cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2hlY2tfc2VsZil7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTZWxmKHRydWUpO1xyXG4gICAgICAgICAgICAvL3RoaXMudGlwX251bT0wO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq6ZSA5q+B5pe277yM5Yig6Zmk5LqL5Lu277yMcmVkX3R5cGXpnIDopoHlnKjnu4Tku7bkuIrpooTlhYjorr7nva4gKi9cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgLyoq5rOo5YaM5LqL5Lu2Ki9cclxuICAgIHJlZ2lzdGVyRXZlbnQoKXtcclxuICAgICAgICBFdmVudE1hbmFnZXIuYWRkUmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCx0aGlzLnNlbGZfcmVkX3R5cGUsdGhpcy5vbkNoYW5nZVRpcCx0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIuYWRkUmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLHRoaXMuc2VsZl9yZWRfdHlwZSx0aGlzLm9uQ2hlY2ssdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirlj5bmtojkuovku7YqL1xyXG4gICAgY2FuY2VsRXZlbnQoKXtcclxuICAgICAgICBFdmVudE1hbmFnZXIucmVtb3ZlUmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCx0aGlzLnNlbGZfcmVkX3R5cGUsdGhpcy5vbkNoYW5nZVRpcCx0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucmVtb3ZlUmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLHRoaXMuc2VsZl9yZWRfdHlwZSx0aGlzLm9uQ2hlY2ssdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vblRvdWNoRW5kLHRoaXMpO1xyXG4gICAgICAgIC8vIGxldCB0YW5oYW89dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0YW5oYW8nKTtcclxuICAgICAgICAvLyBpZih0YW5oYW8pXHJcbiAgICAgICAgLy8gdGFuaGFvLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoRW5kKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc19zaG93X3JlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19udW0rKztcclxuICAgICAgICAgICAgaWYodGhpcy5pc192aWRlb19idG4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZVRpcChmYWxzZSx0aGlzLnNlbGZfcmVkX3R5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaUuee6oueCueS6i+S7tuexu+WeiyzkuLvopoHpgILnlKjkuo7lkIzkuIDkuKrnlYzpnaLnmoTlkIzkuIDkuKrmjInpkq7vvIzliIfmjaLkuI3lkIznmoTlhbPogZTnsbvlnovml7bvvIzmr5TlpoLop5LoibLpobXnmoTljYfnuqfmjInpkq4qL1xyXG4gICAgY2hhbmdlUmVkVHlwZShyZWRUeXBlOlJlZEV2ZW50VHlwZSl7XHJcbiAgICAgICAgaWYocmVkVHlwZSE9dGhpcy5zZWxmX3JlZF90eXBlKXtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxFdmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZfcmVkX3R5cGU9cmVkVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirlvZPkuovku7blj5HnlJ/lj5jljJbml7blm57osINcclxuICAgICAqIGlzU2hvd++8muaYr+WQpuaYvuekuue6oueCue+8jOS4gOiIrOeUseS4i+e6p+mAmuefpVxyXG4gICAgICogcmVkVHlwZTrlj5HpgIFvbkNoYW5nZVRpcOeahOe6oueCueexu+Wei+e6oueCueexu+Wei1xyXG4gICAgICogKi9cclxuICAgIG9uQ2hhbmdlVGlwKGlzU2hvdzpib29sZWFuLHBvc3RSZWRUeXBlOlJlZEV2ZW50VHlwZSl7XHJcbiAgICAgICAgaWYodGhpcy5zZWxmX3JlZF90eXBlPT1SZWRFdmVudFR5cGUuQnRuX01haW4pe1xyXG4gICAgICAgICAgICAvL2NjLmxvZygnMTo6Jyt0aGlzLmZhbHNlX3JlZF90eXBlLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfc2hvd19yZWQ9aXNTaG93O1xyXG4gICAgICAgIGlmKHBvc3RSZWRUeXBlKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMudGlwX251bS5pbmNsdWRlcyhwb3N0UmVkVHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBfbnVtLnB1c2gocG9zdFJlZFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzU2hvdz09dHJ1ZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFkZFRpcCgpO1xyXG4gICAgICAgICAgICAvL+WmguaenOaYvuekuue6oueCue+8jOmcgOimgemAmuefpeS4iue6p+S5n+imgeaYvuekulxyXG4gICAgICAgICAgICB0aGlzLnN1cGVyX3JlZF90eXBlLmZvckVhY2goKHJlZFR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAscmVkVHlwZSx0cnVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYocG9zdFJlZFR5cGUpe1xyXG4gICAgICAgICAgICAgICAgaWYocG9zdFJlZFR5cGUhPXRoaXMuc2VsZl9yZWRfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuZmFsc2VfcmVkX3R5cGUuaW5jbHVkZXMocG9zdFJlZFR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWxzZV9yZWRfdHlwZS5wdXNoKHBvc3RSZWRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5mYWxzZV9yZWRfdHlwZS5sZW5ndGg+PXRoaXMuY2hpbGRfcmVkX3R5cGUubGVuZ3RoKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGlwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUaXAoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUaXAoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhcIuaIkeaIkeaIkeaYr1wiK3RoaXMuc2VsZl9yZWRfdHlwZStcIizmj5DnpLrmrKHmlbDvvJo6XCIrdGhpcy50aXBfbnVtKTtcclxuICAgICAgICBpZih0aGlzLnRpcF9udW0ubGVuZ3RoPj10aGlzLmNoaWxkX3JlZF90eXBlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuZmFsc2VfcmVkX3R5cGU9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGlwX251bT1uZXcgQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirkuLvliqjmo4DmtYvkuIDkuKrnuqLngrnkuovku7bmmK/lkKbog73mmL7npLpcclxuICAgICAqICDlpoLmnpzmnInkuIvnuqfvvIzliJnorqnkuIvnuqfov5vooYzmo4Dmn6XvvIzlvZPmsqHmnInoh6rlt7HkuIvnuqfnmoTml7blgJnmiY3lvIDlp4vmo4Dmn6Xoh6rouqtcclxuICAgICAqICBcclxuICAgICAqICDkuIDoiKznlLHkuIrnuqfpgJrnn6Us5Lmf5Y+v5Li75Yqo6LCD55SoXHJcbiAgICAgKiAqL1xyXG4gICAgb25DaGVjaygpe1xyXG4gICAgICAgIGlmKHRoaXMuY2hpbGRfcmVkX3R5cGUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0aGlzLmZhbHNlX3JlZF90eXBlPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9udW09bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRfcmVkX3R5cGUuZm9yRWFjaCgocmVkVHlwZSk9PntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLHJlZFR5cGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ5LiL57qn5bCx5qOA5rWL6Ieq5bex77yM5Y+q5pyJ5qOA5p+l5Yiw5Li6dHJ1ZeaXtuaJjeS4iuaKpVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2VsZih0cnVlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+iHquW3se+8jOWfuuacrOaJgOacieeahOeahOexu+Wei+mDveimgeacieiHqua1i+aWueahiFxyXG4gICAgICogQHBhcmFtIGlzUG9zdCDoh6rmtYvlrozmr5XlkI7mmK/lkKbkuIrmiqXnu5noh6rlt7HnmoTkuIrnuqdcclxuICAgICAqIEBwYXJhbSByZWRUeXBlIOe6oueCueexu+Wei0lE44CC5LiN5Lyg5pe277yM6buY6K6k5piv6Ieq6LqraWTvvIzkvKDlgLzml7bvvIznlKjkuo7kuIrnuqflkJHkuIvnuqfkvKDovr7mo4DmtYvlkb3ku6RcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpumcgOimgee6oueCueaPkOekulxyXG4gICAgICovXHJcbiAgICBjaGVja1NlbGYoaXNQb3N0OmJvb2xlYW4scmVkVHlwZTpSZWRFdmVudFR5cGU9dGhpcy5zZWxmX3JlZF90eXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc1RpcD1mYWxzZTtcclxuICAgICAgICBzd2l0Y2gocmVkVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qKuS4u+WfjueahCAqL1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fU2hvcDp7ICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgZ2Q9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKTsgICAgICBcclxuICAgICAgICAgICAgICAgIGlzVGlwPWdkLmdldEhlcm9SZWNydWl0aW5nUmVkVGlwKCkvL3x8Z2QuZ2V0UGV0UmVjcnVpdGluZ1JlZFRpcCgpfHxnZC5nZXRFcXVpcEZyZWVSZWRUaXAoKXx8Z2QuZ2V0R2VtRnJlZVJlZFRpcCgpfHxnZC5nZXRDb2luRnJlZVJlZFRpcCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQ2l0eV9FcXVpcF8xOntcclxuICAgICAgICAgICAgLy8gICAgIGlzVGlwPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0VxdWlwTWVyZ2UoRXF1aXBUeXBlLld1UWkpO1xyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9DaXR5X0VxdWlwXzI6e1xyXG4gICAgICAgICAgICAvLyAgICAgaXNUaXA9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrRXF1aXBNZXJnZShFcXVpcFR5cGUuSHVKaWEpO1xyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9DaXR5X0VxdWlwXzM6e1xyXG4gICAgICAgICAgICAvLyAgICAgaXNUaXA9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrRXF1aXBNZXJnZShFcXVpcFR5cGUuU2hpUGluKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQ2l0eV9FcXVpcF9NZXJnZUFsbDp7XHJcbiAgICAgICAgICAgIC8vICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlpodWFuZ0JlaUhlQ2hlbmcpKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlzVGlwPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0VxdWlwTWVyZ2UoaSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoaXNUaXApe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fVGFzazp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkX3JlZF90eXBlLmZvckVhY2goKHJlZFR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzVD10aGlzLmNoZWNrU2VsZihmYWxzZSxyZWRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9UYXNrX0RhaWx5OntcclxuICAgICAgICAgICAgICAgIGlzVGlwPVRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGFpbHlUYXNrSXNDYW5HZXQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1Rhc2tfQWNoaWV2ZW5tZW50OntcclxuICAgICAgICAgICAgICAgIGlzVGlwPVRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWNoaWV2ZW5tZW50VGFza0lzQ2FuR2V0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGU6e1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5jaGlsZF9yZWRfdHlwZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9dGhpcy5jaGVja1NlbGYoZmFsc2UsdGhpcy5jaGlsZF9yZWRfdHlwZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNUaXA9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMjpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8zOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzQ6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNTpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF82OlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzc6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfODpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF85OlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEwOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzExOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEyOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG09SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb1R5cGU9SGVyb01hbmFnZXIuZ2V0SGVyb1R5cGVCeVJlZFR5cGUocmVkVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0luZm89aG0uZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGVyb0luZm8hPW51bGwpeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3ljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrVXBncmFkZShoZXJvVHlwZSkuaXNfY2FuX3VwOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5Y2H5pifXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzVGlwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUaXA9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VwU3RhcihoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat6KOF5aSHXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzVGlwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTE7IGk8RXF1aXBUeXBlLk51bTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1dlYXIoaGVyb1R5cGUsaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzVGlwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreWuoOeJqVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc1RpcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1JlZFRpcChoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5LiT5q2mXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzVGlwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUaXA9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0V4VXAoaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat6Kej6ZSBXHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VubG9jayhoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfSW5mb19VcGdyYWRlQWxsOntcclxuICAgICAgICAgICAgICAgIC8v5Y2H57qnXHJcbiAgICAgICAgICAgICAgICBsZXQgaG09SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvTGlzdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB1cERhdGE9aG0uY2hlY2tVcGdyYWRlKGhlcm9MaXN0W2ldLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYodXBEYXRhLmlzX2Nhbl91cCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9FcXVpcF9XZWFyQWxsOntcclxuICAgICAgICAgICAgICAgIGxldCBlbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoaGVyb0xpc3RbaV0uaGVyb190eXBlKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2FuV2Vhcj1lbS5jaGVja1F1aWNrV2VhcihoZXJvTGlzdFtpXS5oZXJvX3R5cGUsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpc0NhbldlYXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUaXA9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW46e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZF9yZWRfdHlwZS5mb3JFYWNoKChyZWRUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgbGV0IGlzVD10aGlzLmNoZWNrU2VsZihmYWxzZSxyZWRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgIGlmKGlzVCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fU3Bpbjp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlpodWFuUGFuKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDApPT0xXHJcbiAgICAgICAgICAgICAgICAvLyB8fCBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlR1cm10YWJsZUFkLDApIDwgMTA7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Rhc2s6e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5NZWlSaVJlbld1KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+iuvue9ruWlluWKseeJqeWTgVxyXG4gICAgICAgICAgICAgICAgLy8gaXNUaXA9VGFza01hbmdlci5nZXRJbnN0YW5jZSgpLmdldElzSGF2ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9SYW5rOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuUGFpSGFuZ0JhbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbjp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlFpYW5EYW8pKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzVGlwPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SXNTaWduVG9kYXkoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW5fQnRuR2V0OntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuUWlhbkRhbykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRJc1NpZ25Ub2RheSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppOnsgICAgXHJcbiAgICAgICAgICAgICAgICAvL+aMguacuuaMiemSrlxyXG4gICAgICAgICAgICAgICAgaXNUaXA9dGhpcy5jaGVja1NlbGYoZmFsc2UsUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppX0J0bl9HdWFKaSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+W/q+mAn+aMguacuuaYr+WQpuacieW5v+WRiuacuuS8mlxyXG4gICAgICAgICAgICAgICAgaWYoIWlzVGlwKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD10aGlzLmNoZWNrU2VsZihmYWxzZSxSZWRFdmVudFR5cGUuQnRuX01haW5fR3VhamlfQnRuX0Zhc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppX0J0bl9GYXN0OntcclxuICAgICAgICAgICAgICAgIGlzVGlwPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzQ2FuQWRGYXN0R3VhSmkoKTtcclxuICAgICAgICAgICAgfWJyZWFrOyAgXHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppX0J0bl9GYXN0X0FkOntcclxuICAgICAgICAgICAgICAgIGlzVGlwPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzQ2FuQWRGYXN0R3VhSmkoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9HdWFqaV9CdG5fR3VhSmk6e1xyXG4gICAgICAgICAgICAgICAgaXNUaXA9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNDYW5HdWFKaVJlZFRpcCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01hcF9UZWFtXzA6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV8xOlxyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fTWFwX1RlYW1fMjpcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01hcF9UZWFtXzM6XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV80OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUhPUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1vZGUuTWFpbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbU51bT0wO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGVhbUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlYW1MaXN0W2ldPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHVubG9ja051bT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGhlcm9MaXN0W2ldLmhlcm9fdHlwZSk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubG9ja051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5rKh5ruh5ZGY77yM5bm25LiU6Kej6ZSB55qE5pWw6YeP5q+U5oiQ5ZGY5pWw6YeP5aSnXHJcbiAgICAgICAgICAgICAgICBpZihtTnVtPHRlYW1MaXN0Lmxlbmd0aCAmJiBtTnVtPHVubG9ja051bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNoSW5kZXg9cmVkVHlwZS1SZWRFdmVudFR5cGUuQnRuX01hcF9UZWFtXzA7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtjaGVjaEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihoZXJvVHlwZTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6K+l5L2N572u56m65LqGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fVmlwOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuVklQKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuWPr+S7peWcqOacqui0reS5sOeahOaDheWGteS4i++8jOaYvuekuuS4gOasoeOAglxyXG4gICAgICAgICAgICAgICAgbGV0IFZpcElkZW50aXR5PVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVmlwSWRlbnRpdHksMCkgXHJcbiAgICAgICAgICAgICAgICBpZihWaXBJZGVudGl0eT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZ1bmNUb2RheVNob3coRnVuY1R5cGUuVklQKTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBBbGxBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQWxsQWN0aXZpdHlOdW0sMCk7Ly/mgLvmtLvot4PluqYgICBcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0bWVpbmRleCA9IDA7IGl0bWVpbmRleCA8IDE1OyBpdG1laW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZD1pdG1laW5kZXgrMSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFJlcXVpcmVkRXg9QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVxdWlyZWRFeHAoaWQpLy/miYDpnIDmtLvot4PluqZcclxuICAgICAgICAgICAgICAgICAgICBpZihSZXF1aXJlZEV4PD1BbGxBY3Rpdml0eU51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBWaXBGcmVlUmV3YXJkU3RhdHVzID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK2lkLDApOy8vdmlw5YWN6LS55aWW5Yqx54q25oCBICAgIDDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK2lkLDApOy8vdmlw6auY57qn5aWW5Yqx54q25oCBICAgIDDmnKrpooblj5YsMeW3sumihlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihWaXBGcmVlUmV3YXJkU3RhdHVzPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihWaXBBZHZhbmNlZFJld2FyZFN0YXR1cz09MCYmVmlwSWRlbnRpdHk9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUaXA9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvdUNob25nOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuRmlyc3RDaGFyZ2UpfHxQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnVuY1RvZGF5U2hvdyhGdW5jVHlwZS5GaXJzdENoYXJnZSk8PTA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX01haW5fV2Vla0NhcmQ6e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5XZWVrQ2FyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZ1bmNUb2RheVNob3coRnVuY1R5cGUuV2Vla0NhcmQpPD0wfHwoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpJiZEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5JiZUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LldlZWtDYXJkSXNSZWNlaXZlVG9kYXksMCk8PTApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0xlaUNob25nOntcclxuICAgICAgICAgICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuQWNjdW11bGF0ZWRSZWNoYXJnZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZ1bmNUb2RheVNob3coRnVuY1R5cGUuQWNjdW11bGF0ZWRSZWNoYXJnZSk8PTA7XHJcbiAgICAgICAgICAgICAgICBpZighaXNUaXApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0NhbkdldDpib29sZWFuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXdhck1hcD1DdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJld2FyZE1hcDtcclxuICAgICAgICAgICAgICAgICAgICByZXdhck1hcC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzQ2FuR2V0PT1mYWxzZSAmJiB2ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYW5HZXQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWlzQ2FuR2V0O1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX0FjdGl2aXR5OntcclxuICAgICAgICAgICAgICAgIGlzVGlwPShGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuV3VKaW5UaWFvWmhhbikmJlRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk+MCl8fChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuR2VSZW5Cb3NzKSYmVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMCk+MCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX0FjdGl2aXR5X0VuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5XdUppblRpYW9aaGFuKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc1RpcD1BY3Rpdml0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaWNrZXQoQWN0aXZpdHlUeXBlLkVuZGxlc3MpPjA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX0FjdGl2aXR5X0Jvc3M6e1xyXG4gICAgICAgICAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5HZVJlbkJvc3MpKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzVGlwPUFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpY2tldChBY3Rpdml0eVR5cGUuQm9zcyk+MDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fQWN0aXZpdHlfTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLk1pR29uZykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNUaXA9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0RhdGUoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WPquaciWlzUG9zdOS4unRydWXml7bmiY3lj5HpgIFcclxuICAgICAgICBpZihpc1Bvc3Qpe1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAsdGhpcy5zZWxmX3JlZF90eXBlLGlzVGlwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzVGlwO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRpcCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhbmhhbz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RhbmhhbycpO1xyXG4gICAgICAgIGlmKCF0YW5oYW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YW5oYW89bmV3IGNjLk5vZGUoJ3RhbmhhbycpO1xyXG4gICAgICAgICAgICB0YW5oYW8uYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZSgnQ29tbW9uX0ljb25fUmVkRG90Jyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0YW5oYW8pO1xyXG4gICAgICAgICAgICB0YW5oYW8ueD10aGlzLm5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgdGFuaGFvLnk9dGhpcy5ub2RlLmhlaWdodC8yO1xyXG4gICAgICAgICAgICB0YW5oYW8ub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUuc2NhbGU8MSlcclxuICAgICAgICAgICAgdGFuaGFvLnNjYWxlPTEvdGhpcy5ub2RlLnNjYWxlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0YW5oYW8pLnRvKDAuMix7b3BhY2l0eToyNTV9KS5zdGFydCgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRpcCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdXBlcl9yZWRfdHlwZS5mb3JFYWNoKChyZWRUeXBlKT0+e1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9USVAscmVkVHlwZSxmYWxzZSx0aGlzLnNlbGZfcmVkX3R5cGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRhbmhhbz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RhbmhhbycpO1xyXG4gICAgICAgIGlmKHRhbmhhbylcclxuICAgICAgICB0YW5oYW8ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuZmFsc2VfcmVkX3R5cGU9bmV3IEFycmF5KCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==