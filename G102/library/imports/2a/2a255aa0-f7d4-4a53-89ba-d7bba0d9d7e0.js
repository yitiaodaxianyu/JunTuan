"use strict";
cc._RF.push(module, '2a255qg99RKU4m617ug2dfg', 'OfflineRevenue');
// Scripts/JsonData/OfflineRevenue.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineRevenueManager = exports.JsonOfflineRevenue = void 0;
var EquipmentAttribute_1 = require("../Equipment/Data/EquipmentAttribute");
var LevelManager_1 = require("../Level/LevelManager");
var LoadManager_1 = require("../Loading/LoadManager");
var PropConfig_1 = require("../Prop/PropConfig");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var Jackpot_1 = require("./Jackpot");
var LevelJsonData_1 = require("./LevelJsonData");
var JsonOfflineRevenue = /** @class */ (function () {
    function JsonOfflineRevenue() {
        /**通关关卡 */
        this.PassLevel = 0;
        /**每分钟金币 */
        this.GetGold = 0;
        /**满溢时间(分钟) */
        this.Time = 0;
        /**掉落装备奖池 */
        this.DropJackPot = 0;
        /**每分钟掉落概率（千分比） */
        this.Probability = 0;
        /**每分钟英雄经验 */
        this.GetHeroExp = 0;
        /**每分钟玩家经验 */
        this.GetPlayerExp = 0;
        /**每分钟晋升石 */
        this.GetPromotion = 0;
        /**每分钟兽粮 */
        this.GetAnimalFood = 0;
        /**每分钟普通精炼石 */
        this.GetOrdinaryEnhancementStone = 0;
        /**每分钟中级精炼石 */
        this.GetIntermediateEnhancementStone = 0;
        /**每分钟高级精炼石 */
        this.GetSeniorEnhancementStone = 0;
    }
    return JsonOfflineRevenue;
}());
exports.JsonOfflineRevenue = JsonOfflineRevenue;
var OfflineRevenueManager = /** @class */ (function () {
    function OfflineRevenueManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        //已经刷新的分钟数
        this.refreshed_min = 0;
        //已经刷新出来的装备id列表
        this.refreshed_equip = [];
    }
    OfflineRevenueManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new OfflineRevenueManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    OfflineRevenueManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    OfflineRevenueManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('OfflineRevenue', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenue成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonOfflineRevenue();
                jsonData = json[i];
                _this.data.set(jsonData.PassLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    OfflineRevenueManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    OfflineRevenueManager.prototype.getJsonOfflineRevenue = function (id) {
        return this.data.get(id);
    };
    /**根据通关关卡获取每分钟金币 */
    OfflineRevenueManager.prototype.getGetGold = function (id) {
        return this.data.get(id).GetGold;
    };
    /**根据通关关卡获取满溢时间(分钟) */
    OfflineRevenueManager.prototype.getTime = function (id) {
        return this.data.get(id).Time;
    };
    /**根据通关关卡获取掉落装备奖池 */
    OfflineRevenueManager.prototype.getDropJackPot = function (id) {
        return this.data.get(id).DropJackPot;
    };
    /**根据通关关卡获取每分钟掉落概率（千分比） */
    OfflineRevenueManager.prototype.getProbability = function (id) {
        return this.data.get(id).Probability;
    };
    /**根据通关关卡获取每分钟英雄经验 */
    OfflineRevenueManager.prototype.getGetHeroExp = function (id) {
        return this.data.get(id).GetHeroExp;
    };
    /**根据通关关卡获取每分钟玩家经验 */
    OfflineRevenueManager.prototype.getGetPlayerExp = function (id) {
        return this.data.get(id).GetPlayerExp;
    };
    /**根据通关关卡获取每分钟晋升石 */
    OfflineRevenueManager.prototype.getGetPromotion = function (id) {
        return this.data.get(id).GetPromotion;
    };
    /**根据通关关卡获取每分钟兽粮 */
    OfflineRevenueManager.prototype.getGetAnimalFood = function (id) {
        return this.data.get(id).GetAnimalFood;
    };
    /**根据通关关卡获取每分钟普通精炼石 */
    OfflineRevenueManager.prototype.getGetOrdinaryEnhancementStone = function (id) {
        return this.data.get(id).GetOrdinaryEnhancementStone;
    };
    /**根据通关关卡获取每分钟中级精炼石 */
    OfflineRevenueManager.prototype.getGetIntermediateEnhancementStone = function (id) {
        return this.data.get(id).GetIntermediateEnhancementStone;
    };
    /**根据通关关卡获取每分钟高级精炼石 */
    OfflineRevenueManager.prototype.getGetSeniorEnhancementStone = function (id) {
        return this.data.get(id).GetSeniorEnhancementStone;
    };
    /** 静态方法，获取最大的 通关关卡*/
    OfflineRevenueManager.getMaxPassLevel = function () {
        return 240;
    };
    /**获取已经刷新的分钟数*/
    OfflineRevenueManager.prototype.getRefreshTime = function () {
        return this.refreshed_min;
    };
    /**保存已经刷新的分钟数*/
    OfflineRevenueManager.prototype.saveRefreshTime = function (min) {
        this.refreshed_min = min;
    };
    /**获取已经刷新的装备id列表*/
    OfflineRevenueManager.prototype.getRefreshEquipId = function () {
        return this.refreshed_equip;
    };
    /**添加一个装备id到列表*/
    OfflineRevenueManager.prototype.addRefreshEquipId = function (id) {
        this.refreshed_equip.push(id);
    };
    /**获取最新的装备id列表*/
    OfflineRevenueManager.prototype.getNowEquipIdList = function () {
        //
        var totalTime = OfflineRevenueManager.getGuaJiMin();
        var remainTime = totalTime - this.getRefreshTime();
        //获取当前的概率（千分比）
        var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var rate = this.getProbability(finishLevel);
        // if(IsDebug)
        // rate=rate*10;
        //获取当前使用的奖池id
        var jId = this.getDropJackPot(finishLevel);
        for (var i = 0; i < remainTime; i++) {
            var randomIndex = Math.random() * 1000;
            if (randomIndex < rate) {
                //从奖池里随机一个装备列表
                var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(jId);
                this.addRefreshEquipId(rd.reward_id);
            }
        }
        this.saveRefreshTime(totalTime);
        this.refreshed_equip.sort(function (a, b) {
            var levelA = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(a);
            var levelB = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(b);
            return levelB - levelA;
        });
        return this.refreshed_equip;
    };
    /**获取领取挂机奖励的时间-分,有最大值限制*/
    OfflineRevenueManager.getGuaJiMin = function () {
        var offsetSec = this.getGuaJiSec();
        var offsetMin = Math.floor(offsetSec / 60);
        return offsetMin;
    };
    /**获取领取挂机奖励的时间-秒*/
    OfflineRevenueManager.getGuaJiSec = function () {
        var num = cc.sys.localStorage.getItem('guaji_time');
        var curDate = new Date();
        var offsetSec = 0;
        //let offsetMin=0;
        if (num != "" && num != null) {
            num = parseInt(num);
            offsetSec = Math.floor((curDate.getTime() - num) / 1000);
        }
        else {
            this.saveGuaJiTime();
        }
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        var max = OfflineRevenueManager.getInstance().getTime(level);
        if (offsetSec > max * 60)
            offsetSec = max * 60;
        // if(IsDebug)
        // offsetSec=60*60;        
        return offsetSec;
    };
    //保存领取时间
    OfflineRevenueManager.saveGuaJiTime = function () {
        var curDate = new Date();
        cc.sys.localStorage.setItem('guaji_time', curDate.getTime());
        this._instance.refreshed_min = 0;
        this._instance.refreshed_equip = [];
    };
    /**每60分钟的金币奖励-*/
    OfflineRevenueManager.prototype.getOfflineReward60 = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetGold(level) * 60;
    };
    /**每分钟的金币奖励-*/
    OfflineRevenueManager.prototype.getOfflineReward = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetGold(level);
    };
    /**每60分钟的经验奖励-*/
    OfflineRevenueManager.prototype.getOfflineHeroExp60 = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetHeroExp(level) * 60;
    };
    /**每分钟的英雄经验奖励-秒*/
    OfflineRevenueManager.prototype.getOfflineHeroExp = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetHeroExp(level);
    };
    /**每60分钟离线奖励-进阶石 */
    OfflineRevenueManager.prototype.getOfflineHeroStone60 = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetPromotion(level) * 60;
    };
    /**每60分钟离线奖励-兽粮 */
    OfflineRevenueManager.prototype.getOfflineAnimalFood60 = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level;
        return this.getGetAnimalFood(level) * 60;
    };
    /**获得以num分钟离线时间作为奖励 */
    OfflineRevenueManager.prototype.getRewards = function (num) {
        var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var totalTime = num;
        var rewardDatas = new Array();
        var jsonData = this.getJsonOfflineRevenue(finishLevel);
        var coinNum = jsonData.GetGold * totalTime;
        var heroExpNum = jsonData.GetHeroExp * totalTime;
        var userExpNum = jsonData.GetPlayerExp * totalTime;
        //晋升石头
        var stonePromotion = Math.floor(jsonData.GetPromotion * totalTime);
        //普通精炼石
        var jinglian1 = Math.floor(jsonData.GetOrdinaryEnhancementStone * totalTime);
        //中级精炼石
        var jinglian2 = Math.floor(jsonData.GetIntermediateEnhancementStone * totalTime);
        //高级精炼石
        var jinglian3 = Math.floor(jsonData.GetSeniorEnhancementStone * totalTime);
        // let mInfo=DingYueManager.getInstance().getMonthCardInfo();
        // let qInfo=DingYueManager.getInstance().getQuarterCardInfo();
        if (coinNum > 0) {
            coinNum = Math.floor(coinNum);
            var coinRd = new LevelJsonData_1.RewardData();
            coinRd.reward_id = PropConfig_1.PropId.Coin;
            coinRd.reward_num = coinNum;
            rewardDatas.push(coinRd);
        }
        if (heroExpNum > 0) {
            heroExpNum = Math.floor(heroExpNum);
            var heroExpRd = new LevelJsonData_1.RewardData();
            heroExpRd.reward_id = PropConfig_1.PropId.HeroExp;
            heroExpRd.reward_num = heroExpNum;
            rewardDatas.push(heroExpRd);
        }
        if (userExpNum) {
            var userExpRd = new LevelJsonData_1.RewardData();
            userExpRd.reward_id = PropConfig_1.PropId.UserExp;
            userExpRd.reward_num = userExpNum;
            rewardDatas.push(userExpRd);
        }
        if (stonePromotion > 0) {
            stonePromotion = Math.floor(stonePromotion);
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.HeroStone;
            rd.reward_num = stonePromotion;
            rewardDatas.push(rd);
        }
        if (jinglian1 > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.ExclusiveWeaponStone1;
            rd.reward_num = jinglian1;
            rewardDatas.push(rd);
        }
        if (jinglian2 > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.ExclusiveWeaponStone2;
            rd.reward_num = jinglian2;
            rewardDatas.push(rd);
        }
        if (jinglian3 > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.ExclusiveWeaponStone3;
            rd.reward_num = jinglian3;
            rewardDatas.push(rd);
        }
        //获取当前的概率（千分比）
        var rate = this.getProbability(finishLevel);
        //获取当前使用的奖池id
        var jId = this.getDropJackPot(finishLevel);
        var sdEquip = new Array();
        for (var i = 0; i < totalTime; i++) {
            var randomIndex = Math.random() * 1000;
            if (randomIndex < rate) {
                //从奖池里随机一个装备列表
                var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(jId);
                sdEquip.push(rd.reward_id);
            }
        }
        sdEquip.sort(function (a, b) {
            var levelA = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(a);
            var levelB = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(b);
            return levelB - levelA;
        });
        for (var i = 0; i < sdEquip.length; i++) {
            var id = sdEquip[i];
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = id;
            rd.reward_num = 1;
            rewardDatas.push(rd);
            //EquipmentManager.getInstance().addEquipment(id);
        }
        return rewardDatas;
    };
    /**是否可以通过广告领取快速挂机 */
    OfflineRevenueManager.prototype.isCanAdFastGuaJi = function () {
        return StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanAdFastOffline, 0) == 0;
    };
    /**是否可以红点提示挂机按钮 */
    OfflineRevenueManager.prototype.isCanGuaJiRedTip = function () {
        return OfflineRevenueManager.getGuaJiMin() >= 60;
    };
    OfflineRevenueManager._instance = null;
    return OfflineRevenueManager;
}());
exports.OfflineRevenueManager = OfflineRevenueManager;

cc._RF.pop();