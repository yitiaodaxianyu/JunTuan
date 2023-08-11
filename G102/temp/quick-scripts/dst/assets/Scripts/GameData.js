
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '725dbyHYdlMEK17RKNGdWGZ', 'GameData');
// Scripts/GameData.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpManager_1 = require("./NetWork/HttpManager");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var LogInfo_1 = require("./Tools/LogInfo");
var LevelManager_1 = require("./Level/LevelManager");
var ActivityManager_1 = require("./Activity/ActivityManager");
var UserData_1 = require("./UserData");
var EventManager_1 = require("./Tools/EventManager");
var StorageConfig_1 = require("./Storage/StorageConfig");
var DingYueManager_1 = require("./Payment/DingYueManager");
var TowerManager_1 = require("./Tower/TowerManager");
var CyclePack_1 = require("./Payment/Data/CyclePack");
var PayManager_1 = require("./Payment/PayManager");
var StorageManager_1 = require("./Storage/StorageManager");
var PropManager_1 = require("./Prop/PropManager");
var PropConfig_1 = require("./Prop/PropConfig");
var FunctionDefinition_1 = require("./JsonData/FunctionDefinition");
var PurchaseCoins_1 = require("./Store/PurchaseCoins");
var CommodityInformation_1 = require("./Store/CommodityInformation");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData_1 = GameData;
    GameData.prototype.init = function () {
        // this.checkIsNewDay();        
    };
    GameData.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameData_1();
            this._instance.init();
        }
        return this._instance;
    };
    GameData.prototype.getMaxEnergy = function () {
        var max = LevelManager_1.LevelManager.getInstance().finish_level + Constants_1.MAX_ENERGY;
        if (max > 30) {
            max = 30;
        }
        return max;
    };
    GameData.prototype.onExit = function () {
        //记录退出时间
        var curDate = new Date();
        cc.sys.localStorage.setItem('exit_time', curDate.getTime());
    };
    GameData.prototype.randomLetter = function (len) {
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var res = '';
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * letters.length);
            res += letters[n];
        }
        return res;
    };
    GameData.prototype.saveExitTime = function () {
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.load) {
            return;
        }
        //记录退出时间
        var curDate = new Date();
        cc.sys.localStorage.setItem('exit_time', curDate.getTime());
        var loginTime = this.getLoginTime();
        var onlineTime = Math.floor((curDate.getTime() - loginTime) / 1000);
        var totalTime = GameData_1.getTotalTime();
        this.saveTotalTime(totalTime + onlineTime);
        LogInfo_1.LogManager.saveLogList();
        //上传信息
        if (Constants_1.IsTestServer) {
            PropManager_1.PropManager.getInstance().saveAllPropNum();
        }
        //把信息同步到文件中
        //EquipmentManager.getInstance().saveAllEquipmentList();
        //PetManager.getInstance().saveAllPetList();
    };
    GameData.prototype.saveLoginTime = function () {
        var curDate = new Date();
        cc.sys.localStorage.setItem('login_time', curDate.getTime());
    };
    GameData.prototype.getLoginTime = function () {
        var num = cc.sys.localStorage.getItem('login_time');
        if (num === '' || num === null) {
            num = new Date().getTime();
        }
        num = parseInt(num);
        return num;
    };
    GameData.prototype.saveTotalTime = function (num) {
        cc.sys.localStorage.setItem('total_online_time', num);
        this.saveLoginTime();
        //FollowManager.getInstance().followNeiBu(this.finish_level,num,this.getUserName());
    };
    GameData.getTotalTime = function () {
        var num = cc.sys.localStorage.getItem('total_online_time');
        if (num === '' || num === null) {
            num = 0;
        }
        num = parseInt(num);
        return num;
    };
    //今天是否可以签到
    GameData.prototype.getIsSignToday = function () {
        return StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0;
    };
    GameData.prototype.saveIsSignToday = function (isSign) {
        if (isSign == true) {
            cc.sys.localStorage.setItem("TodaySignNum", 1);
        }
        else {
            cc.sys.localStorage.setItem("TodaySignNum", 0);
        }
    };
    //获取签到天数
    GameData.prototype.getSignDays = function () {
        var signDays = cc.sys.localStorage.getItem("SignDays");
        if (signDays != "" && signDays != null) {
            signDays = parseInt(signDays);
        }
        else {
            signDays = 0;
        }
        return signDays;
    };
    GameData.prototype.checkIsNewMonth = function () {
        var isNewMonth = false;
        var curMonth = new Date().getMonth();
        var month = cc.sys.localStorage.getItem("LoginMonth");
        if (month != "" && month != null) {
            month = parseInt(month);
        }
        else {
            month = -1;
        }
        if (month > 0) {
            if (month != curMonth) {
                isNewMonth = true;
            }
        }
        else {
            isNewMonth = true;
        }
        if (isNewMonth) {
            this.saveNewMonth(true);
        }
        return isNewMonth;
    };
    GameData.prototype.saveNewMonth = function (isNewMonth) {
        // let curMonth=new Date().getMonth();
        // cc.sys.localStorage.setItem("LoginMonth", curMonth);        
        // if(isNewMonth==true)
        // {
        //     //重置战令
        //     BattlePassManager.resetBattlePass();
        //     CyclePackManager.getInstance().resetMonthData();
        // }
    };
    GameData.prototype.getYearWeek = function (year, month, day) {
        var date1 = new Date(year, parseInt(month) - 1, day), date2 = new Date(year, 0, 1), d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };
    ;
    GameData.prototype.checkIsNewWeek = function () {
        var isNewWeek = false;
        var date = new Date();
        var curWeek = this.getYearWeek(date.getFullYear(), date.getMonth(), date.getDate());
        var week = cc.sys.localStorage.getItem("LoginWeek");
        if (week != "" && week != null) {
            week = parseInt(week);
        }
        else {
            week = -1;
        }
        if (week > 0) {
            if (week != curWeek) {
                isNewWeek = true;
            }
        }
        else {
            isNewWeek = true;
        }
        if (isNewWeek) {
            this.saveNewWeek(true);
        }
        return isNewWeek;
    };
    GameData.prototype.saveNewWeek = function (isNewWeek) {
        var date = new Date();
        var curWeek = this.getYearWeek(date.getFullYear(), date.getMonth(), date.getDate());
        cc.sys.localStorage.setItem("LoginWeek", curWeek);
        if (isNewWeek == true) {
            //重置战令
            // BattlePassManager.resetBattlePass();
            CyclePack_1.CyclePackManager.getInstance().resetWeekData();
        }
    };
    GameData.prototype.checkIsNewDay = function () {
        var isNewDay = false;
        var curDay = new Date().getDate();
        var loginDay = cc.sys.localStorage.getItem("LoginDay");
        if (loginDay != "" && loginDay != null) {
            loginDay = parseInt(loginDay);
        }
        else
            loginDay = 0;
        if (loginDay > 0) {
            if (loginDay != curDay) {
                isNewDay = true;
            }
        }
        else {
            isNewDay = true;
        }
        this.saveNewDay(isNewDay);
        return isNewDay;
    };
    GameData.prototype.saveNewDay = function (isNewDay) {
        var curDay = new Date().getDate();
        cc.sys.localStorage.setItem("LoginDay", curDay);
        if (isNewDay == true) {
            this.checkIsNewMonth();
            // HeroManager.getInstance().saveNewDayZhanli();
            this.saveIsSignToday(false);
            PayManager_1.PayManager.getInstance().resetAllTodayShow();
            DingYueManager_1.DingYueManager.getInstance().resetTodayGetState();
            TowerManager_1.default.resetTodayPassNum();
            CyclePack_1.CyclePackManager.getInstance().resetDayData();
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_SignIn);
            ActivityManager_1.ActivityManager.getInstance().resetTicket();
        }
    };
    GameData.prototype.getTotalVideoNum = function () {
        var num = cc.sys.localStorage.getItem('total_video_num');
        if (num != "" && num != null) {
            num = parseInt(num);
        }
        else {
            num = 0;
        }
        return num;
    };
    GameData.prototype.addTotalVideoNum = function (num) {
        var newNum = this.getTotalVideoNum() + num;
        cc.sys.localStorage.setItem('total_video_num', newNum);
        this.HttpAddPayPrice();
    };
    GameData.prototype.HttpAddPayPrice = function () {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, this.getPayJsonString(), false);
    };
    GameData.prototype.getPayJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            type: 7,
            uid: uid,
            value: 1,
        });
    };
    /**从服务器更新时间戳到本地 */
    GameData.prototype.refreshServerTime = function () {
        var _this = this;
        HttpManager_1.HttpManager.gameTimePost(HttpManager_1.AccessName.getServerTime, this.getUidJsonString()).then(function (data) {
            if (data.serverTime) {
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp, 0) <= data.serverTime) {
                    var oneDay = 60 * 60 * 24;
                    var timezone = 60 * (-new Date().getTimezoneOffset());
                    var todaySpeendTime = data.serverTime % oneDay;
                    var todayZero = data.serverTime - todaySpeendTime - timezone;
                    var tomorowZero = todayZero + oneDay;
                    _this.refreshDailyData();
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TomorowZeroTimeStamp, tomorowZero);
                }
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NextWeekZeroTimeStamp, 0) <= data.serverTime) {
                    var oneDay = 60 * 60 * 24;
                    var timezone = 60 * (-new Date().getTimezoneOffset());
                    var todaySpeendTime = data.serverTime % oneDay;
                    var todayZero = data.serverTime - todaySpeendTime - timezone;
                    var t = new Date(todayZero * 1000);
                    var week = t.getDay();
                    if (week == 0)
                        week = 7;
                    var weekSpeedTime = (week - 1) * oneDay;
                    var mondayZero = (todayZero - weekSpeedTime) + oneDay * 7;
                    _this.refreshWeekData();
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NextWeekZeroTimeStamp, mondayZero);
                }
                if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NextMonthZeroTimeStamp, 0) <= data.serverTime) {
                    var oneDay = 60 * 60 * 24;
                    var timezone = 60 * (-new Date().getTimezoneOffset());
                    var todaySpeendTime = data.serverTime % oneDay;
                    var todayZero = data.serverTime - todaySpeendTime - timezone;
                    // 转换到当天零点的时间
                    var date = new Date(todayZero * 1000);
                    // new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， 
                    // new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
                    var tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    // 获取到当月的天数
                    var days = tempDate.getDate();
                    // 获取到剩余的天数
                    var remainingDay = days - date.getDate() + 1;
                    // 下个月一号零点的时间戳(单位秒)
                    var nextMonthZero = todayZero + (remainingDay * oneDay);
                    _this.refreshMonthData();
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NextMonthZeroTimeStamp, nextMonthZero);
                }
            }
            else {
                cc.error("数据获取失败");
            }
        }).catch(function (err) {
            cc.error(err);
        });
    };
    /**  刷新日常数据，即需要每日更新的数据在这更新*/
    GameData.prototype.refreshDailyData = function () {
        // 每日商店数据更新
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopId, '');
        for (var i = 0; i < 6; i++) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopNum + i, '');
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopDiscount + i, '');
        }
        for (var i = 0; i < 3; i++) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreCoinItem + i, 0);
        }
        // TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,'0');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanFastOffline, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanAdFastOffline, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CoinPopAd, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableAd, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFree, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeYes, 1);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, GameManager_1.default.getInstance().tumTableTime);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityNum, '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipDailyCollectionStatus, 0);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyBossChallengeTimes, 3);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, 3);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, 3);
        for (var i = 20; i < 101; i += 20) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityState + i, '');
        }
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskId + 0, 0);
        // 周卡每日领取刷新
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardIsReceiveToday, 0);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardFreeAdNum, 10);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TodayIsFirstLogIn, 0);
        // TaskManager.getInstance().emitTask(TaskItem.累计登录X天);
    };
    /**刷新周更数据，即每周刷新的数据在此更新 */
    GameData.prototype.refreshWeekData = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeekActivityNum, '');
        for (var i = 100; i < 501; i += 100) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeeklyActivityState + i, '');
        }
    };
    /**刷新月更数据，即每月刷新的数据在此更新 */
    GameData.prototype.refreshMonthData = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInNum, '');
        for (var i = 1; i < 32; i++) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInDay + i, '');
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInCumulativeDay + i, '');
        }
    };
    GameData.prototype.saveSignUnlockHint = function () {
        cc.sys.localStorage.setItem('SignUnlockHint', 1);
    };
    /**商店钻石红点信息 */
    GameData.prototype.getGemFreeRedTip = function () {
        var storeItemInfo = CommodityInformation_1.CommodityInformationManager.getInstance().getJsonCommodityInformation(100101);
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopNum + 0, 0);
        return num < storeItemInfo.AdPlayableTimes;
    };
    GameData.prototype.getCoinFreeRedTip = function () {
        var coinData = PurchaseCoins_1.PurchaseCoinsManager.getInstance().getJsonDataByChapter(LevelManager_1.LevelManager.getInstance().getFinishChapter());
        var isTip = false;
        coinData.forEach(function (v, k) {
            if (v.AdReward == 1) {
                if (isTip == false && (Number(StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.StoreCoinItem + k, 0)) < v.AdPlayableTimes)) {
                    isTip = true;
                }
            }
        });
        return isTip;
    };
    /**招募十连抽 */
    GameData.prototype.getHeroRecruitingRedTip = function () {
        return PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.OrdinaryWishingCoin) >= 10;
    };
    GameData.prototype.getPetRecruitingRedTip = function () {
        var oneDayTime = 60 * 60 * 24 * 1000;
        var currentTime = Date.now();
        if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.PetParadise) == true && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0) {
            return true;
        }
        return false;
    };
    GameData.prototype.getEquipFreeRedTip = function () {
        var oneDayTime = 60 * 60 * 24 * 1000;
        var currentTime = Date.now();
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
            return true;
        }
        return false;
    };
    //********************************************账户信息*************************************************   
    GameData.prototype.getUidJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    var GameData_1;
    GameData._instance = null;
    GameData = GameData_1 = __decorate([
        ccclass
    ], GameData);
    return GameData;
}());
exports.default = GameData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0U7QUFDaEUseUNBQTRGO0FBRTVGLDZDQUF3QztBQUN4QywyQ0FBNkM7QUFDN0MscURBQW9EO0FBQ3BELDhEQUE2RDtBQUM3RCx1Q0FBa0M7QUFDbEMscURBQWtGO0FBQ2xGLHlEQUFxRDtBQUVyRCwyREFBMEQ7QUFDMUQscURBQWdEO0FBQ2hELHNEQUE0RDtBQUM1RCxtREFBa0Q7QUFDbEQsMkRBQTZEO0FBQzdELGtEQUFpRDtBQUdqRCxnREFBMkM7QUFFM0Msb0VBQTBFO0FBQzFFLHVEQUE2RDtBQUM3RCxxRUFBMkU7QUFFckUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtJQXVkQSxDQUFDO2lCQXZkb0IsUUFBUTtJQUl6Qix1QkFBSSxHQUFKO1FBQ0ksZ0NBQWdDO0lBQ3BDLENBQUM7SUFHYSxvQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFVBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFFSSxJQUFJLEdBQUcsR0FBQywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxzQkFBVSxDQUFDO1FBQzNELElBQUcsR0FBRyxHQUFDLEVBQUUsRUFDVDtZQUNJLEdBQUcsR0FBQyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFFSSxRQUFRO1FBQ1IsSUFBSSxPQUFPLEdB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QyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx5QkFBeUIsRUFBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsV0FBVyxJQUFJLENBQUMsRUFBQztZQUNqSCxPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUdELHNHQUFzRztJQUc5RixtQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLEdBQUcsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixHQUFHLEVBQUMsR0FBRztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBamRjLGtCQUFTLEdBQWEsSUFBSSxDQUFDO0lBRnpCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F1ZDVCO0lBQUQsZUFBQztDQXZkRCxBQXVkQyxJQUFBO2tCQXZkb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHtGdW5jVHlwZSwgR2FtZVNjZW5lLCBJc0RlYnVnLElzVGVzdFNlcnZlcixJdGVtX1R5cGUsIE1BWF9FTkVSR1l9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExvZ01hbmFnZXIgfSBmcm9tIFwiLi9Ub29scy9Mb2dJbmZvXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eU1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9BY3Rpdml0eU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3ljbGVQYWNrTWFuYWdlciB9IGZyb20gXCIuL1BheW1lbnQvRGF0YS9DeWNsZVBhY2tcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgRGFpbHlTaG9wTWFuYWdlciB9IGZyb20gXCIuL1N0b3JlL0RhaWx5U2hvcFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFB1cmNoYXNlQ29pbnNNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmUvUHVyY2hhc2VDb2luc1wiO1xyXG5pbXBvcnQgeyBDb21tb2RpdHlJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yZS9Db21tb2RpdHlJbmZvcm1hdGlvblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGF0YSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lRGF0YSA9IG51bGw7XHJcblxyXG4gICAgaW5pdCAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5jaGVja0lzTmV3RGF5KCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpHYW1lRGF0YVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEdhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1heEVuZXJneSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXg9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsK01BWF9FTkVSR1k7XHJcbiAgICAgICAgaWYobWF4PjMwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWF4PTMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkV4aXQoKVxyXG4gICAge1xyXG4gICAgICAgIC8v6K6w5b2V6YCA5Ye65pe26Ze0XHJcbiAgICAgICAgbGV0IGN1ckRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZXhpdF90aW1lJyxjdXJEYXRlLmdldFRpbWUoKSk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICByYW5kb21MZXR0ZXIobGVuOm51bWJlcik6c3RyaW5nIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICAgICAgICBsZXQgcmVzID0gJydcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJlcyArPSBsZXR0ZXJzW25dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRXhpdFRpbWUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5sb2FkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iusOW9lemAgOWHuuaXtumXtFxyXG4gICAgICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2V4aXRfdGltZScsY3VyRGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIGxldCBsb2dpblRpbWU9dGhpcy5nZXRMb2dpblRpbWUoKTtcclxuICAgICAgICBsZXQgb25saW5lVGltZT1NYXRoLmZsb29yKChjdXJEYXRlLmdldFRpbWUoKS1sb2dpblRpbWUpLzEwMDApO1xyXG4gICAgICAgIGxldCB0b3RhbFRpbWU9R2FtZURhdGEuZ2V0VG90YWxUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVG90YWxUaW1lKHRvdGFsVGltZStvbmxpbmVUaW1lKTtcclxuICAgICAgICBMb2dNYW5hZ2VyLnNhdmVMb2dMaXN0KCk7XHJcbiAgICAgICAgLy/kuIrkvKDkv6Hmga9cclxuICAgICAgICBpZihJc1Rlc3RTZXJ2ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxQcm9wTnVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5oqK5L+h5oGv5ZCM5q2l5Yiw5paH5Lu25LitXHJcbiAgICAgICAgLy9FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbEVxdWlwbWVudExpc3QoKTtcclxuICAgICAgICAvL1BldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUGV0TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVMb2dpblRpbWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luX3RpbWUnLGN1ckRhdGUuZ2V0VGltZSgpKTsgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9naW5UaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luX3RpbWUnKTtcclxuICAgICAgICBpZihudW09PT0nJ3x8bnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVG90YWxUaW1lKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3RhbF9vbmxpbmVfdGltZScsbnVtKTtcclxuICAgICAgICB0aGlzLnNhdmVMb2dpblRpbWUoKTtcclxuICAgICAgICAvL0ZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dOZWlCdSh0aGlzLmZpbmlzaF9sZXZlbCxudW0sdGhpcy5nZXRVc2VyTmFtZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VG90YWxUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdGFsX29ubGluZV90aW1lJyk7XHJcbiAgICAgICAgaWYobnVtPT09Jyd8fG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7iuWkqeaYr+WQpuWPr+S7peetvuWIsFxyXG4gICAgZ2V0SXNTaWduVG9kYXkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApID09IDBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlSXNTaWduVG9kYXkoaXNTaWduOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXNTaWduPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVG9kYXlTaWduTnVtXCIsMSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvZGF5U2lnbk51bVwiLDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluetvuWIsOWkqeaVsFxyXG4gICAgZ2V0U2lnbkRheXMoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzaWduRGF5cyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNpZ25EYXlzXCIpO1xyXG4gICAgICAgIGlmKHNpZ25EYXlzIT1cIlwiICYmIHNpZ25EYXlzIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2lnbkRheXM9cGFyc2VJbnQoc2lnbkRheXMpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzaWduRGF5cz0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2lnbkRheXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tJc05ld01vbnRoKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaXNOZXdNb250aDpib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGN1ck1vbnRoPW5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcclxuICAgICAgICBsZXQgbW9udGg9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTG9naW5Nb250aFwiKTtcclxuICAgICAgICBpZihtb250aCE9XCJcIiYmbW9udGghPW51bGwpe1xyXG4gICAgICAgICAgICBtb250aD1wYXJzZUludChtb250aCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1vbnRoPS0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobW9udGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobW9udGghPWN1ck1vbnRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc05ld01vbnRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc05ld01vbnRoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNOZXdNb250aCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZU5ld01vbnRoKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNOZXdNb250aDtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTmV3TW9udGgoaXNOZXdNb250aDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBjdXJNb250aD1uZXcgRGF0ZSgpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTG9naW5Nb250aFwiLCBjdXJNb250aCk7ICAgICAgICBcclxuICAgICAgICAvLyBpZihpc05ld01vbnRoPT10cnVlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgLy/ph43nva7miJjku6RcclxuICAgICAgICAvLyAgICAgQmF0dGxlUGFzc01hbmFnZXIucmVzZXRCYXR0bGVQYXNzKCk7XHJcbiAgICAgICAgLy8gICAgIEN5Y2xlUGFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldE1vbnRoRGF0YSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRZZWFyV2Vlayh5ZWFyLCBtb250aCwgZGF5KSB7Ly9h5Li65bm0IGLkuLrmnIggY+S4uuaXpVxyXG4gICAgICAgIHZhciBkYXRlMSA9IG5ldyBEYXRlKHllYXIsIHBhcnNlSW50KG1vbnRoKSAtIDEsIGRheSksXHJcbiAgICAgICAgICAgIGRhdGUyID0gbmV3IERhdGUoeWVhciwgMCwgMSksXHJcbiAgICAgICAgICAgIGQgPSBNYXRoLnJvdW5kKChkYXRlMS52YWx1ZU9mKCkgLSBkYXRlMi52YWx1ZU9mKCkpIC8gODY0MDAwMDApO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKGQgKyAoKGRhdGUyLmdldERheSgpICsgMSkgLSAxKSkgLyA3KTtcclxuICAgIH07XHJcblxyXG4gICAgY2hlY2tJc05ld1dlZWsoKTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc05ld1dlZWs6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgY3VyV2Vlaz10aGlzLmdldFllYXJXZWVrKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgICAgIGxldCB3ZWVrPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkxvZ2luV2Vla1wiKTtcclxuICAgICAgICBpZih3ZWVrIT1cIlwiJiZ3ZWVrIT1udWxsKXtcclxuICAgICAgICAgICAgd2Vlaz1wYXJzZUludCh3ZWVrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgd2Vlaz0tMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHdlZWsgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYod2VlayE9Y3VyV2VlaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXNOZXdXZWVrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc05ld1dlZWsgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc05ld1dlZWspe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVOZXdXZWVrKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNOZXdXZWVrO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVOZXdXZWVrKGlzTmV3V2Vlazpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgY3VyV2Vlaz10aGlzLmdldFllYXJXZWVrKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkxvZ2luV2Vla1wiLCBjdXJXZWVrKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGlzTmV3V2Vlaz09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6YeN572u5oiY5LukXHJcbiAgICAgICAgICAgIC8vIEJhdHRsZVBhc3NNYW5hZ2VyLnJlc2V0QmF0dGxlUGFzcygpO1xyXG4gICAgICAgICAgICBDeWNsZVBhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRXZWVrRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0lzTmV3RGF5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBpc05ld0RheTpib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGN1ckRheSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGxldCBsb2dpbkRheSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkxvZ2luRGF5XCIpO1xyXG4gICAgICAgIGlmKGxvZ2luRGF5IT1cIlwiICYmIGxvZ2luRGF5IT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9naW5EYXk9cGFyc2VJbnQobG9naW5EYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGxvZ2luRGF5PTA7XHJcbiAgICAgICAgaWYobG9naW5EYXkgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobG9naW5EYXkhPSBjdXJEYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzTmV3RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc05ld0RheSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZU5ld0RheShpc05ld0RheSk7XHJcbiAgICAgICAgcmV0dXJuIGlzTmV3RGF5O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgXHJcbiAgICBzYXZlTmV3RGF5KGlzTmV3RGF5OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1ckRheSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkxvZ2luRGF5XCIsIGN1ckRheSk7ICAgICAgICBcclxuICAgICAgICBpZihpc05ld0RheT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJc05ld01vbnRoKCk7XHJcbiAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZU5ld0RheVpoYW5saSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVJc1NpZ25Ub2RheShmYWxzZSk7ICAgICAgICAgIFxyXG4gICAgICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRBbGxUb2RheVNob3coKTtcclxuICAgICAgICAgICAgRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldFRvZGF5R2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgVG93ZXJNYW5hZ2VyLnJlc2V0VG9kYXlQYXNzTnVtKCk7XHJcbiAgICAgICAgICAgIEN5Y2xlUGFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldERheURhdGEoKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICAgICAgICAgIEFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0VGlja2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIGdldFRvdGFsVmlkZW9OdW0oKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG90YWxfdmlkZW9fbnVtJyk7XHJcbiAgICAgICAgaWYobnVtIT1cIlwiJiZudW0hPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG90YWxWaWRlb051bShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBuZXdOdW09dGhpcy5nZXRUb3RhbFZpZGVvTnVtKCkrbnVtO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG90YWxfdmlkZW9fbnVtJyxuZXdOdW0pO1xyXG4gICAgICAgIHRoaXMuSHR0cEFkZFBheVByaWNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSHR0cEFkZFBheVByaWNlKCl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuZ2V0UGF5SnNvblN0cmluZygpLGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UGF5SnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdHlwZTo3LFxyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICB2YWx1ZToxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuS7juacjeWKoeWZqOabtOaWsOaXtumXtOaIs+WIsOacrOWcsCAqL1xyXG4gICAgcmVmcmVzaFNlcnZlclRpbWUoKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5nYW1lVGltZVBvc3QoQWNjZXNzTmFtZS5nZXRTZXJ2ZXJUaW1lLHRoaXMuZ2V0VWlkSnNvblN0cmluZygpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YS5zZXJ2ZXJUaW1lKXtcclxuICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG9tb3Jvd1plcm9UaW1lU3RhbXAsMCkgPD0gZGF0YS5zZXJ2ZXJUaW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb25lRGF5ID0gNjAqNjAqMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWV6b25lID0gNjAgKiAoLW5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvZGF5U3BlZW5kVGltZSA9IGRhdGEuc2VydmVyVGltZSAlIG9uZURheTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kYXlaZXJvID0gZGF0YS5zZXJ2ZXJUaW1lIC0gdG9kYXlTcGVlbmRUaW1lICAtIHRpbWV6b25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b21vcm93WmVybyA9IHRvZGF5WmVybyArIG9uZURheTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hEYWlseURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub21vcm93WmVyb1RpbWVTdGFtcCx0b21vcm93WmVybyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5leHRXZWVrWmVyb1RpbWVTdGFtcCwwKSA8PSBkYXRhLnNlcnZlclRpbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbmVEYXkgPSA2MCo2MCoyNDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXpvbmUgPSA2MCAqICgtbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kYXlTcGVlbmRUaW1lID0gZGF0YS5zZXJ2ZXJUaW1lICUgb25lRGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RheVplcm8gPSBkYXRhLnNlcnZlclRpbWUgLSB0b2RheVNwZWVuZFRpbWUgIC0gdGltZXpvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSBuZXcgRGF0ZSh0b2RheVplcm8gKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2VlayA9IHQuZ2V0RGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2VlayA9PSAwKSB3ZWVrID0gNztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla1NwZWVkVGltZSA9ICh3ZWVrIC0gMSkgKiBvbmVEYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbmRheVplcm8gPSAodG9kYXlaZXJvIC0gd2Vla1NwZWVkVGltZSkgKyBvbmVEYXkgKiA3O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFdlZWtEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV4dFdlZWtaZXJvVGltZVN0YW1wLG1vbmRheVplcm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXh0TW9udGhaZXJvVGltZVN0YW1wLDApIDw9IGRhdGEuc2VydmVyVGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uZURheSA9IDYwKjYwKjI0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lem9uZSA9IDYwICogKC1uZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RheVNwZWVuZFRpbWUgPSBkYXRhLnNlcnZlclRpbWUgJSBvbmVEYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvZGF5WmVybyA9IGRhdGEuc2VydmVyVGltZSAtIHRvZGF5U3BlZW5kVGltZSAgLSB0aW1lem9uZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDovazmjaLliLDlvZPlpKnpm7bngrnnmoTml7bpl7RcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRvZGF5WmVybyAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5ldyBEYXRlKCnnrKwz5Liq5Y+C5pWw6buY6K6k5Li6Me+8jOWwseaYr+avj+S4quaciOeahDHlj7fvvIzmiorlroPorr7nva7kuLow5pe277yMIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5ldyBEYXRlKCnkvJrov5Tlm57kuIrkuIDkuKrmnIjnmoTmnIDlkI7kuIDlpKnvvIznhLblkI7pgJrov4dnZXREYXRlKCnmlrnms5XlvpfliLDlpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcERhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpICsgMSwwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bliLDlvZPmnIjnmoTlpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF5cyA9IHRlbXBEYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bliLDliankvZnnmoTlpKnmlbBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nRGF5ID0gZGF5cyAtIGRhdGUuZ2V0RGF0ZSgpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIvkuKrmnIjkuIDlj7fpm7bngrnnmoTml7bpl7TmiLMo5Y2V5L2N56eSKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0TW9udGhaZXJvID0gdG9kYXlaZXJvICsgKHJlbWFpbmluZ0RheSAqIG9uZURheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW9udGhEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTmV4dE1vbnRoWmVyb1RpbWVTdGFtcCxuZXh0TW9udGhaZXJvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIuaVsOaNruiOt+WPluWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpPT57XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqICDliLfmlrDml6XluLjmlbDmja7vvIzljbPpnIDopoHmr4/ml6Xmm7TmlrDnmoTmlbDmja7lnKjov5nmm7TmlrAqL1xyXG4gICAgcmVmcmVzaERhaWx5RGF0YSgpe1xyXG4gICAgICAgIC8vIOavj+aXpeWVhuW6l+aVsOaNruabtOaWsFxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlRGFpbHlTaG9wSWQsJycpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTw2O2krKyl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlRGFpbHlTaG9wTnVtICsgaSwnJyk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlRGFpbHlTaG9wRGlzY291bnQgKyBpLCcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPDM7aSsrKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuU3RvcmVDb2luSXRlbSArIGksMClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLCcwJyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuRmFzdE9mZmxpbmUsJycpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhbkFkRmFzdE9mZmxpbmUsJycpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNvaW5Qb3BBZCwnJyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVHVybXRhYmxlQWQsJycpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWUsJycpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVZZXMsIDEpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUZyZWVUaW1lLCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnR1bVRhYmxlVGltZSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlOdW0sJycpO1xyXG5cclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBEYWlseUNvbGxlY3Rpb25TdGF0dXMsMCk7XHJcblxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG5cclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAyMDtpPDEwMTtpKz0yMCl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5U3RhdGUgKyBpLCcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0lkICsgMCwwKTtcclxuICAgICAgICAvLyDlkajljaHmr4/ml6Xpooblj5bliLfmlrBcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5XZWVrQ2FyZElzUmVjZWl2ZVRvZGF5LDApO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkRnJlZUFkTnVtLDEwKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub2RheUlzRmlyc3RMb2dJbiwwKTtcclxuXHJcbiAgICAgICAgLy8gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ntK/orqHnmbvlvZVY5aSpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliLfmlrDlkajmm7TmlbDmja7vvIzljbPmr4/lkajliLfmlrDnmoTmlbDmja7lnKjmraTmm7TmlrAgKi9cclxuICAgIHJlZnJlc2hXZWVrRGF0YSgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrQWN0aXZpdHlOdW0sJycpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDEwMDtpPDUwMTtpKz0xMDApe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIGksJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliLfmlrDmnIjmm7TmlbDmja7vvIzljbPmr4/mnIjliLfmlrDnmoTmlbDmja7lnKjmraTmm7TmlrAgKi9cclxuICAgIHJlZnJlc2hNb250aERhdGEoKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5EYWlseVNpZ25Jbk51bSwnJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTtpPDMyO2krKyl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkRhaWx5U2lnbkluRGF5ICsgaSwnJyk7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkRhaWx5U2lnbkluQ3VtdWxhdGl2ZURheSArIGksJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlU2lnblVubG9ja0hpbnQoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnU2lnblVubG9ja0hpbnQnLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWVhuW6l+mSu+efs+e6oueCueS/oeaBryAqL1xyXG4gICAgZ2V0R2VtRnJlZVJlZFRpcCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IHN0b3JlSXRlbUluZm89Q29tbW9kaXR5SW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkNvbW1vZGl0eUluZm9ybWF0aW9uKDEwMDEwMSk7XHJcbiAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlN0b3JlRGFpbHlTaG9wTnVtICsgMCwwKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBudW0gPCBzdG9yZUl0ZW1JbmZvLkFkUGxheWFibGVUaW1lc1xyXG4gICAgfVxyXG4gICAgZ2V0Q29pbkZyZWVSZWRUaXAoKTpib29sZWFue1xyXG4gICAgICAgIGxldCBjb2luRGF0YSA9IFB1cmNoYXNlQ29pbnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUNoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpKTtcclxuICAgICAgICBsZXQgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgY29pbkRhdGEuZm9yRWFjaCgodixrKSA9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodi5BZFJld2FyZCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGlmKGlzVGlwPT1mYWxzZSAmJiAoTnVtYmVyKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuU3RvcmVDb2luSXRlbSArIGssMCkpIDwgdi5BZFBsYXlhYmxlVGltZXMpKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1RpcD10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gaXNUaXBcclxuICAgIH1cclxuICAgIC8qKuaLm+WLn+WNgei/nuaKvSAqL1xyXG4gICAgZ2V0SGVyb1JlY3J1aXRpbmdSZWRUaXAoKTpib29sZWFueyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuT3JkaW5hcnlXaXNoaW5nQ29pbik+PTEwO1xyXG4gICAgfVxyXG4gICAgZ2V0UGV0UmVjcnVpdGluZ1JlZFRpcCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IG9uZURheVRpbWUgPSA2MCo2MCoyNCoxMDAwO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlBldFBhcmFkaXNlKSA9PSB0cnVlICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuU3RvcmVNeXN0ZXJ5UGV0RnJlZVRpbWUsMCkgKyBvbmVEYXlUaW1lIC0gY3VycmVudFRpbWUgPD0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldEVxdWlwRnJlZVJlZFRpcCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IG9uZURheVRpbWUgPSA2MCo2MCoyNCoxMDAwO1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5TdG9yZU15c3RlcnlFcXVpcEZyZWVUaW1lLDApICsgb25lRGF5VGltZSAtIGN1cnJlbnRUaW1lIDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirotKbmiLfkv6Hmga8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgXHJcbiAgXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRVaWRKc29uU3RyaW5nKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG4iXX0=