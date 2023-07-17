"use strict";
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