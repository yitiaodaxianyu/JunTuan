"use strict";
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