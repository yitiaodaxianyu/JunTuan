
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
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, 900);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0U7QUFDaEUseUNBQTRGO0FBRTVGLDZDQUF3QztBQUN4QywyQ0FBNkM7QUFDN0MscURBQW9EO0FBQ3BELDhEQUE2RDtBQUM3RCx1Q0FBa0M7QUFDbEMscURBQWtGO0FBQ2xGLHlEQUFxRDtBQUVyRCwyREFBMEQ7QUFDMUQscURBQWdEO0FBQ2hELHNEQUE0RDtBQUM1RCxtREFBa0Q7QUFDbEQsMkRBQTZEO0FBQzdELGtEQUFpRDtBQUdqRCxnREFBMkM7QUFFM0Msb0VBQTBFO0FBQzFFLHVEQUE2RDtBQUM3RCxxRUFBMkU7QUFFckUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtJQXVkQSxDQUFDO2lCQXZkb0IsUUFBUTtJQUl6Qix1QkFBSSxHQUFKO1FBQ0ksZ0NBQWdDO0lBQ3BDLENBQUM7SUFHYSxvQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFVBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFFSSxJQUFJLEdBQUcsR0FBQywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxzQkFBVSxDQUFDO1FBQzNELElBQUcsR0FBRyxHQUFDLEVBQUUsRUFDVDtZQUNJLEdBQUcsR0FBQyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFFSSxRQUFRO1FBQ1IsSUFBSSxPQUFPLEdB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LENBQUM7UUFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMseUJBQXlCLEVBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFdBQVcsSUFBSSxDQUFDLEVBQUM7WUFDakgsT0FBTyxJQUFJLENBQUE7U0FDZDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHRCxzR0FBc0c7SUFHOUYsbUNBQWdCLEdBQXhCO1FBQ0ksSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFDLEdBQUc7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDOztJQWpkYyxrQkFBUyxHQUFhLElBQUksQ0FBQztJQUZ6QixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBdWQ1QjtJQUFELGVBQUM7Q0F2ZEQsQUF1ZEMsSUFBQTtrQkF2ZG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7RnVuY1R5cGUsIEdhbWVTY2VuZSwgSXNEZWJ1ZyxJc1Rlc3RTZXJ2ZXIsSXRlbV9UeXBlLCBNQVhfRU5FUkdZfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMb2dNYW5hZ2VyIH0gZnJvbSBcIi4vVG9vbHMvTG9nSW5mb1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvQWN0aXZpdHlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4vUGV0L1BldE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi9QYXltZW50L0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN5Y2xlUGFja01hbmFnZXIgfSBmcm9tIFwiLi9QYXltZW50L0RhdGEvQ3ljbGVQYWNrXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IERhaWx5U2hvcE1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yZS9EYWlseVNob3BcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBQdXJjaGFzZUNvaW5zTWFuYWdlciB9IGZyb20gXCIuL1N0b3JlL1B1cmNoYXNlQ29pbnNcIjtcclxuaW1wb3J0IHsgQ29tbW9kaXR5SW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmUvQ29tbW9kaXR5SW5mb3JtYXRpb25cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZURhdGEge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR2FtZURhdGEgPSBudWxsO1xyXG5cclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tJc05ld0RheSgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6R2FtZURhdGFcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBHYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhFbmVyZ3koKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbWF4PUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCtNQVhfRU5FUkdZO1xyXG4gICAgICAgIGlmKG1heD4zMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1heD0zMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FeGl0KClcclxuICAgIHtcclxuICAgICAgICAvL+iusOW9lemAgOWHuuaXtumXtFxyXG4gICAgICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2V4aXRfdGltZScsY3VyRGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgcmFuZG9tTGV0dGVyKGxlbjpudW1iZXIpOnN0cmluZyBcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgbGV0IHJlcyA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXMgKz0gbGV0dGVyc1tuXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUV4aXRUaW1lKClcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUubG9hZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/orrDlvZXpgIDlh7rml7bpl7RcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdleGl0X3RpbWUnLGN1ckRhdGUuZ2V0VGltZSgpKTtcclxuICAgICAgICBsZXQgbG9naW5UaW1lPXRoaXMuZ2V0TG9naW5UaW1lKCk7XHJcbiAgICAgICAgbGV0IG9ubGluZVRpbWU9TWF0aC5mbG9vcigoY3VyRGF0ZS5nZXRUaW1lKCktbG9naW5UaW1lKS8xMDAwKTtcclxuICAgICAgICBsZXQgdG90YWxUaW1lPUdhbWVEYXRhLmdldFRvdGFsVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVRvdGFsVGltZSh0b3RhbFRpbWUrb25saW5lVGltZSk7XHJcbiAgICAgICAgTG9nTWFuYWdlci5zYXZlTG9nTGlzdCgpO1xyXG4gICAgICAgIC8v5LiK5Lyg5L+h5oGvXHJcbiAgICAgICAgaWYoSXNUZXN0U2VydmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUHJvcE51bSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiuS/oeaBr+WQjOatpeWIsOaWh+S7tuS4rVxyXG4gICAgICAgIC8vRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxFcXVpcG1lbnRMaXN0KCk7XHJcbiAgICAgICAgLy9QZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFBldExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTG9naW5UaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dpbl90aW1lJyxjdXJEYXRlLmdldFRpbWUoKSk7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldExvZ2luVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dpbl90aW1lJyk7XHJcbiAgICAgICAgaWYobnVtPT09Jyd8fG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRvdGFsVGltZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG90YWxfb25saW5lX3RpbWUnLG51bSk7XHJcbiAgICAgICAgdGhpcy5zYXZlTG9naW5UaW1lKCk7XHJcbiAgICAgICAgLy9Gb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93TmVpQnUodGhpcy5maW5pc2hfbGV2ZWwsbnVtLHRoaXMuZ2V0VXNlck5hbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFRvdGFsVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3RhbF9vbmxpbmVfdGltZScpO1xyXG4gICAgICAgIGlmKG51bT09PScnfHxudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTA7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku4rlpKnmmK/lkKblj6/ku6Xnrb7liLBcclxuICAgIGdldElzU2lnblRvZGF5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwwKSA9PSAwXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUlzU2lnblRvZGF5KGlzU2lnbjpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzU2lnbj09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvZGF5U2lnbk51bVwiLDEpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb2RheVNpZ25OdW1cIiwwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bnrb7liLDlpKnmlbBcclxuICAgIGdldFNpZ25EYXlzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgc2lnbkRheXMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTaWduRGF5c1wiKTtcclxuICAgICAgICBpZihzaWduRGF5cyE9XCJcIiAmJiBzaWduRGF5cyE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNpZ25EYXlzPXBhcnNlSW50KHNpZ25EYXlzKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2lnbkRheXM9MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ25EYXlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrSXNOZXdNb250aCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzTmV3TW9udGg6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJNb250aD1uZXcgRGF0ZSgpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgbGV0IG1vbnRoPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkxvZ2luTW9udGhcIik7XHJcbiAgICAgICAgaWYobW9udGghPVwiXCImJm1vbnRoIT1udWxsKXtcclxuICAgICAgICAgICAgbW9udGg9cGFyc2VJbnQobW9udGgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBtb250aD0tMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1vbnRoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG1vbnRoIT1jdXJNb250aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXNOZXdNb250aCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNOZXdNb250aCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTmV3TW9udGgpe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVOZXdNb250aCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzTmV3TW9udGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZU5ld01vbnRoKGlzTmV3TW9udGg6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICAvLyBsZXQgY3VyTW9udGg9bmV3IERhdGUoKS5nZXRNb250aCgpO1xyXG4gICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkxvZ2luTW9udGhcIiwgY3VyTW9udGgpOyAgICAgICAgXHJcbiAgICAgICAgLy8gaWYoaXNOZXdNb250aD09dHJ1ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIC8v6YeN572u5oiY5LukXHJcbiAgICAgICAgLy8gICAgIEJhdHRsZVBhc3NNYW5hZ2VyLnJlc2V0QmF0dGxlUGFzcygpO1xyXG4gICAgICAgIC8vICAgICBDeWNsZVBhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRNb250aERhdGEoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WWVhcldlZWsoeWVhciwgbW9udGgsIGRheSkgey8vYeS4uuW5tCBi5Li65pyIIGPkuLrml6VcclxuICAgICAgICB2YXIgZGF0ZTEgPSBuZXcgRGF0ZSh5ZWFyLCBwYXJzZUludChtb250aCkgLSAxLCBkYXkpLFxyXG4gICAgICAgICAgICBkYXRlMiA9IG5ldyBEYXRlKHllYXIsIDAsIDEpLFxyXG4gICAgICAgICAgICBkID0gTWF0aC5yb3VuZCgoZGF0ZTEudmFsdWVPZigpIC0gZGF0ZTIudmFsdWVPZigpKSAvIDg2NDAwMDAwKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKChkICsgKChkYXRlMi5nZXREYXkoKSArIDEpIC0gMSkpIC8gNyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNoZWNrSXNOZXdXZWVrKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaXNOZXdXZWVrOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGN1cldlZWs9dGhpcy5nZXRZZWFyV2VlayhkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgICBsZXQgd2Vlaz1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJMb2dpbldlZWtcIik7XHJcbiAgICAgICAgaWYod2VlayE9XCJcIiYmd2VlayE9bnVsbCl7XHJcbiAgICAgICAgICAgIHdlZWs9cGFyc2VJbnQod2Vlayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdlZWs9LTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih3ZWVrID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHdlZWshPWN1cldlZWspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzTmV3V2VlayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNOZXdXZWVrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNOZXdXZWVrKXtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTmV3V2Vlayh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzTmV3V2VlaztcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTmV3V2Vlayhpc05ld1dlZWs6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGN1cldlZWs9dGhpcy5nZXRZZWFyV2VlayhkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJMb2dpbldlZWtcIiwgY3VyV2Vlayk7ICAgICAgICBcclxuICAgICAgICBpZihpc05ld1dlZWs9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+mHjee9ruaImOS7pFxyXG4gICAgICAgICAgICAvLyBCYXR0bGVQYXNzTWFuYWdlci5yZXNldEJhdHRsZVBhc3MoKTtcclxuICAgICAgICAgICAgQ3ljbGVQYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0V2Vla0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tJc05ld0RheSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgaXNOZXdEYXk6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJEYXkgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgbG9naW5EYXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJMb2dpbkRheVwiKTtcclxuICAgICAgICBpZihsb2dpbkRheSE9XCJcIiAmJiBsb2dpbkRheSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxvZ2luRGF5PXBhcnNlSW50KGxvZ2luRGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBsb2dpbkRheT0wO1xyXG4gICAgICAgIGlmKGxvZ2luRGF5ID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxvZ2luRGF5IT0gY3VyRGF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc05ld0RheSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNOZXdEYXkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVOZXdEYXkoaXNOZXdEYXkpO1xyXG4gICAgICAgIHJldHVybiBpc05ld0RheTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgc2F2ZU5ld0RheShpc05ld0RheTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjdXJEYXkgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJMb2dpbkRheVwiLCBjdXJEYXkpOyAgICAgICAgXHJcbiAgICAgICAgaWYoaXNOZXdEYXk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrSXNOZXdNb250aCgpO1xyXG4gICAgICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVOZXdEYXlaaGFubGkoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlSXNTaWduVG9kYXkoZmFsc2UpOyAgICAgICAgICBcclxuICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0QWxsVG9kYXlTaG93KCk7XHJcbiAgICAgICAgICAgIERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRUb2RheUdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIFRvd2VyTWFuYWdlci5yZXNldFRvZGF5UGFzc051bSgpO1xyXG4gICAgICAgICAgICBDeWNsZVBhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXREYXlEYXRhKCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgICAgICAgICBBY3Rpdml0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldFRpY2tldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBnZXRUb3RhbFZpZGVvTnVtKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdGFsX3ZpZGVvX251bScpO1xyXG4gICAgICAgIGlmKG51bSE9XCJcIiYmbnVtIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvdGFsVmlkZW9OdW0obnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBsZXQgbmV3TnVtPXRoaXMuZ2V0VG90YWxWaWRlb051bSgpK251bTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvdGFsX3ZpZGVvX251bScsbmV3TnVtKTtcclxuICAgICAgICB0aGlzLkh0dHBBZGRQYXlQcmljZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEh0dHBBZGRQYXlQcmljZSgpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mbyx0aGlzLmdldFBheUpzb25TdHJpbmcoKSxmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBheUpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6NyxcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6MSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirku47mnI3liqHlmajmm7TmlrDml7bpl7TmiLPliLDmnKzlnLAgKi9cclxuICAgIHJlZnJlc2hTZXJ2ZXJUaW1lKCl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIuZ2FtZVRpbWVQb3N0KEFjY2Vzc05hbWUuZ2V0U2VydmVyVGltZSx0aGlzLmdldFVpZEpzb25TdHJpbmcoKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc2VydmVyVGltZSl7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvbW9yb3daZXJvVGltZVN0YW1wLDApIDw9IGRhdGEuc2VydmVyVGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uZURheSA9IDYwKjYwKjI0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lem9uZSA9IDYwICogKC1uZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RheVNwZWVuZFRpbWUgPSBkYXRhLnNlcnZlclRpbWUgJSBvbmVEYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvZGF5WmVybyA9IGRhdGEuc2VydmVyVGltZSAtIHRvZGF5U3BlZW5kVGltZSAgLSB0aW1lem9uZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9tb3Jvd1plcm8gPSB0b2RheVplcm8gKyBvbmVEYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoRGFpbHlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG9tb3Jvd1plcm9UaW1lU3RhbXAsdG9tb3Jvd1plcm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXh0V2Vla1plcm9UaW1lU3RhbXAsMCkgPD0gZGF0YS5zZXJ2ZXJUaW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb25lRGF5ID0gNjAqNjAqMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWV6b25lID0gNjAgKiAoLW5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvZGF5U3BlZW5kVGltZSA9IGRhdGEuc2VydmVyVGltZSAlIG9uZURheTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kYXlaZXJvID0gZGF0YS5zZXJ2ZXJUaW1lIC0gdG9kYXlTcGVlbmRUaW1lICAtIHRpbWV6b25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ID0gbmV3IERhdGUodG9kYXlaZXJvICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWsgPSB0LmdldERheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWsgPT0gMCkgd2VlayA9IDc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtTcGVlZFRpbWUgPSAod2VlayAtIDEpICogb25lRGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25kYXlaZXJvID0gKHRvZGF5WmVybyAtIHdlZWtTcGVlZFRpbWUpICsgb25lRGF5ICogNztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXZWVrRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5leHRXZWVrWmVyb1RpbWVTdGFtcCxtb25kYXlaZXJvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV4dE1vbnRoWmVyb1RpbWVTdGFtcCwwKSA8PSBkYXRhLnNlcnZlclRpbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbmVEYXkgPSA2MCo2MCoyNDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXpvbmUgPSA2MCAqICgtbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kYXlTcGVlbmRUaW1lID0gZGF0YS5zZXJ2ZXJUaW1lICUgb25lRGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RheVplcm8gPSBkYXRhLnNlcnZlclRpbWUgLSB0b2RheVNwZWVuZFRpbWUgIC0gdGltZXpvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6L2s5o2i5Yiw5b2T5aSp6Zu254K555qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0b2RheVplcm8gKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuZXcgRGF0ZSgp56ysM+S4quWPguaVsOm7mOiupOS4ujHvvIzlsLHmmK/mr4/kuKrmnIjnmoQx5Y+377yM5oqK5a6D6K6+572u5Li6MOaXtu+8jCBcclxuICAgICAgICAgICAgICAgICAgICAvLyBuZXcgRGF0ZSgp5Lya6L+U5Zue5LiK5LiA5Liq5pyI55qE5pyA5ZCO5LiA5aSp77yM54S25ZCO6YCa6L+HZ2V0RGF0ZSgp5pa55rOV5b6X5Yiw5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSArIDEsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Yiw5b2T5pyI55qE5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRheXMgPSB0ZW1wRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Yiw5Ymp5L2Z55qE5aSp5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ0RheSA9IGRheXMgLSBkYXRlLmdldERhdGUoKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiL5Liq5pyI5LiA5Y+36Zu254K555qE5pe26Ze05oizKOWNleS9jeenkilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dE1vbnRoWmVybyA9IHRvZGF5WmVybyArIChyZW1haW5pbmdEYXkgKiBvbmVEYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vbnRoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5leHRNb250aFplcm9UaW1lU3RhbXAsbmV4dE1vbnRoWmVybyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLmlbDmja7ojrflj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyKT0+e1xyXG4gICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiAg5Yi35paw5pel5bi45pWw5o2u77yM5Y2z6ZyA6KaB5q+P5pel5pu05paw55qE5pWw5o2u5Zyo6L+Z5pu05pawKi9cclxuICAgIHJlZnJlc2hEYWlseURhdGEoKXtcclxuICAgICAgICAvLyDmr4/ml6XllYblupfmlbDmja7mm7TmlrBcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZURhaWx5U2hvcElkLCcnKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8NjtpKyspe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZURhaWx5U2hvcE51bSArIGksJycpO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TdG9yZURhaWx5U2hvcERpc2NvdW50ICsgaSwnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTwzO2krKyl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlQ29pbkl0ZW0gKyBpLDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwnMCcpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhbkZhc3RPZmZsaW5lLCcnKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5BZEZhc3RPZmZsaW5lLCcnKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Db2luUG9wQWQsJycpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlR1cm10YWJsZUFkLCcnKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlLCcnKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlWWVzLCAxKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UdXJtdGFibGVGcmVlVGltZSwgOTAwKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eU51bSwnJyk7XHJcblxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcERhaWx5Q29sbGVjdGlvblN0YXR1cywwKTtcclxuXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywgMyk7XHJcblxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDIwO2k8MTAxO2krPTIwKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIGksJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrSWQgKyAwLDApO1xyXG4gICAgICAgIC8vIOWRqOWNoeavj+aXpemihuWPluWIt+aWsFxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkSXNSZWNlaXZlVG9kYXksMCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuV2Vla0NhcmRGcmVlQWROdW0sMTApO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvZGF5SXNGaXJzdExvZ0luLDApO1xyXG5cclxuICAgICAgICAvLyBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoeeZu+W9lVjlpKkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIt+aWsOWRqOabtOaVsOaNru+8jOWNs+avj+WRqOWIt+aWsOeahOaVsOaNruWcqOatpOabtOaWsCAqL1xyXG4gICAgcmVmcmVzaFdlZWtEYXRhKCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1dlZWtBY3Rpdml0eU51bSwnJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTAwO2k8NTAxO2krPTEwMCl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlICsgaSwnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIt+aWsOaciOabtOaVsOaNru+8jOWNs+avj+aciOWIt+aWsOeahOaVsOaNruWcqOatpOabtOaWsCAqL1xyXG4gICAgcmVmcmVzaE1vbnRoRGF0YSgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkRhaWx5U2lnbkluTnVtLCcnKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2k8MzI7aSsrKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5EYXkgKyBpLCcnKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5DdW11bGF0aXZlRGF5ICsgaSwnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTaWduVW5sb2NrSGludCgpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdTaWduVW5sb2NrSGludCcsMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5ZWG5bqX6ZK755+z57qi54K55L+h5oGvICovXHJcbiAgICBnZXRHZW1GcmVlUmVkVGlwKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgc3RvcmVJdGVtSW5mbz1Db21tb2RpdHlJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQ29tbW9kaXR5SW5mb3JtYXRpb24oMTAwMTAxKTtcclxuICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuU3RvcmVEYWlseVNob3BOdW0gKyAwLDApOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bSA8IHN0b3JlSXRlbUluZm8uQWRQbGF5YWJsZVRpbWVzXHJcbiAgICB9XHJcbiAgICBnZXRDb2luRnJlZVJlZFRpcCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGNvaW5EYXRhID0gUHVyY2hhc2VDb2luc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5Q2hhcHRlcihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCkpO1xyXG4gICAgICAgIGxldCBpc1RpcD1mYWxzZTtcclxuICAgICAgICBjb2luRGF0YS5mb3JFYWNoKCh2LGspID0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih2LkFkUmV3YXJkID09IDEpe1xyXG4gICAgICAgICAgICAgICAgaWYoaXNUaXA9PWZhbHNlICYmIChOdW1iZXIoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5TdG9yZUNvaW5JdGVtICsgaywwKSkgPCB2LkFkUGxheWFibGVUaW1lcykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVGlwPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBpc1RpcFxyXG4gICAgfVxyXG4gICAgLyoq5oub5Yuf5Y2B6L+e5oq9ICovXHJcbiAgICBnZXRIZXJvUmVjcnVpdGluZ1JlZFRpcCgpOmJvb2xlYW57ICAgICAgICBcclxuICAgICAgICByZXR1cm4gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5PcmRpbmFyeVdpc2hpbmdDb2luKT49MTA7XHJcbiAgICB9XHJcbiAgICBnZXRQZXRSZWNydWl0aW5nUmVkVGlwKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgb25lRGF5VGltZSA9IDYwKjYwKjI0KjEwMDA7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuUGV0UGFyYWRpc2UpID09IHRydWUgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5TdG9yZU15c3RlcnlQZXRGcmVlVGltZSwwKSArIG9uZURheVRpbWUgLSBjdXJyZW50VGltZSA8PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1aXBGcmVlUmVkVGlwKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgb25lRGF5VGltZSA9IDYwKjYwKjI0KjEwMDA7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlN0b3JlTXlzdGVyeUVxdWlwRnJlZVRpbWUsMCkgKyBvbmVEYXlUaW1lIC0gY3VycmVudFRpbWUgPD0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKui0puaIt+S/oeaBryoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICBcclxuICBcclxuXHJcbiAgICBwcml2YXRlIGdldFVpZEpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==