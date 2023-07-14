
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/OfflineRevenue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXE9mZmxpbmVSZXZlbnVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJFQUFpRjtBQUNqRixzREFBcUQ7QUFDckQsc0RBQXFEO0FBRXJELGlEQUE0QztBQUM1QywwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELHFDQUEyQztBQUMzQyxpREFBNkM7QUFFN0M7SUFBQTtRQUNJLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLGNBQWM7UUFDUCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFlBQVk7UUFDTCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixrQkFBa0I7UUFDWCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixhQUFhO1FBQ04sZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixhQUFhO1FBQ04saUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsWUFBWTtRQUNMLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxjQUFjO1FBQ1AsZ0NBQTJCLEdBQVUsQ0FBQyxDQUFFO1FBQy9DLGNBQWM7UUFDUCxvQ0FBK0IsR0FBVSxDQUFDLENBQUU7UUFDbkQsY0FBYztRQUNQLDhCQUF5QixHQUFVLENBQUMsQ0FBRTtJQUNqRCxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJZLGdEQUFrQjtBQTJCL0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBZ0MsSUFBSSxDQUFDO1FBQ3pDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQTRGeEMseUJBQXlCO1FBR3pCLFVBQVU7UUFDRixrQkFBYSxHQUFRLENBQUMsQ0FBQztRQUMvQixlQUFlO1FBQ1Asb0JBQWUsR0FBVSxFQUFFLENBQUM7SUEwT3hD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QUMsSUFBSSwwQkFBVSxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUM7WUFDaEIsRUFBRSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUM7WUFDaEIsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQixrREFBa0Q7U0FDckQ7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLGdEQUFnQixHQUFoQjtRQUNJLE9BQU8sa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hGLENBQUM7SUFFRCxrQkFBa0I7SUFDbEIsZ0RBQWdCLEdBQWhCO1FBQ0ksT0FBTyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsSUFBRSxFQUFFLENBQUE7SUFDbEQsQ0FBQztJQTlVYywrQkFBUyxHQUEwQixJQUFJLENBQUM7SUErVTNELDRCQUFDO0NBaFZELEFBZ1ZDLElBQUE7QUFoVlksc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKYWNrcG90TWFuYWdlciB9IGZyb20gXCIuL0phY2twb3RcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuL0xldmVsSnNvbkRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uT2ZmbGluZVJldmVudWUge1xyXG4gICAgLyoq6YCa5YWz5YWz5Y2hICovXHJcbiAgICBwdWJsaWMgUGFzc0xldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5q+P5YiG6ZKf6YeR5biBICovXHJcbiAgICBwdWJsaWMgR2V0R29sZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKua7oea6ouaXtumXtCjliIbpkp8pICovXHJcbiAgICBwdWJsaWMgVGltZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaOieiQveijheWkh+WlluaxoCAqL1xyXG4gICAgcHVibGljIERyb3BKYWNrUG90Om51bWJlciA9IDAgO1xyXG4gICAgLyoq5q+P5YiG6ZKf5o6J6JC95qaC546H77yI5Y2D5YiG5q+U77yJICovXHJcbiAgICBwdWJsaWMgUHJvYmFiaWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmr4/liIbpkp/oi7Hpm4Tnu4/pqowgKi9cclxuICAgIHB1YmxpYyBHZXRIZXJvRXhwOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5q+P5YiG6ZKf546p5a6257uP6aqMICovXHJcbiAgICBwdWJsaWMgR2V0UGxheWVyRXhwOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5q+P5YiG6ZKf5pmL5Y2H55+zICovXHJcbiAgICBwdWJsaWMgR2V0UHJvbW90aW9uOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5q+P5YiG6ZKf5YW957KuICovXHJcbiAgICBwdWJsaWMgR2V0QW5pbWFsRm9vZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuavj+WIhumSn+aZrumAmueyvueCvOefsyAqL1xyXG4gICAgcHVibGljIEdldE9yZGluYXJ5RW5oYW5jZW1lbnRTdG9uZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuavj+WIhumSn+S4ree6p+eyvueCvOefsyAqL1xyXG4gICAgcHVibGljIEdldEludGVybWVkaWF0ZUVuaGFuY2VtZW50U3RvbmU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmr4/liIbpkp/pq5jnuqfnsr7ngrznn7MgKi9cclxuICAgIHB1YmxpYyBHZXRTZW5pb3JFbmhhbmNlbWVudFN0b25lOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmbGluZVJldmVudWVNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogT2ZmbGluZVJldmVudWVNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbk9mZmxpbmVSZXZlbnVlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpPZmZsaW5lUmV2ZW51ZU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignT2ZmbGluZVJldmVudWUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uT2ZmbGluZVJldmVudWXmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uT2ZmbGluZVJldmVudWUoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlBhc3NMZXZlbCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbk9mZmxpbmVSZXZlbnVlKGlkOm51bWJlcik6SnNvbk9mZmxpbmVSZXZlbnVlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmr4/liIbpkp/ph5HluIEgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHb2xkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldEdvbGQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmu6HmuqLml7bpl7Qo5YiG6ZKfKSAqL1xyXG4gICAgcHVibGljIGdldFRpbWUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGltZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumAmuWFs+WFs+WNoeiOt+WPluaOieiQveijheWkh+WlluaxoCAqL1xyXG4gICAgcHVibGljIGdldERyb3BKYWNrUG90KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRyb3BKYWNrUG90O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5YWz5Y2h6I635Y+W5q+P5YiG6ZKf5o6J6JC95qaC546H77yI5Y2D5YiG5q+U77yJICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvYmFiaWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvYmFiaWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmr4/liIbpkp/oi7Hpm4Tnu4/pqowgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRIZXJvRXhwKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldEhlcm9FeHA7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmr4/liIbpkp/njqnlrrbnu4/pqowgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRQbGF5ZXJFeHAoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0UGxheWVyRXhwO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz5YWz5Y2h6I635Y+W5q+P5YiG6ZKf5pmL5Y2H55+zICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0UHJvbW90aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldFByb21vdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumAmuWFs+WFs+WNoeiOt+WPluavj+WIhumSn+WFveeyriAqL1xyXG4gICAgcHVibGljIGdldEdldEFuaW1hbEZvb2QoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0QW5pbWFsRm9vZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumAmuWFs+WFs+WNoeiOt+WPluavj+WIhumSn+aZrumAmueyvueCvOefsyAqL1xyXG4gICAgcHVibGljIGdldEdldE9yZGluYXJ5RW5oYW5jZW1lbnRTdG9uZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRPcmRpbmFyeUVuaGFuY2VtZW50U3RvbmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmr4/liIbpkp/kuK3nuqfnsr7ngrznn7MgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRJbnRlcm1lZGlhdGVFbmhhbmNlbWVudFN0b25lKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldEludGVybWVkaWF0ZUVuaGFuY2VtZW50U3RvbmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7pgJrlhbPlhbPljaHojrflj5bmr4/liIbpkp/pq5jnuqfnsr7ngrznn7MgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRTZW5pb3JFbmhhbmNlbWVudFN0b25lKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldFNlbmlvckVuaGFuY2VtZW50U3RvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDpgJrlhbPlhbPljaEqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhQYXNzTGV2ZWwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAyNDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxuICAgIC8v5bey57uP5Yi35paw55qE5YiG6ZKf5pWwXHJcbiAgICBwcml2YXRlIHJlZnJlc2hlZF9taW46bnVtYmVyPTA7XHJcbiAgICAvL+W3sue7j+WIt+aWsOWHuuadpeeahOijheWkh2lk5YiX6KGoXHJcbiAgICBwcml2YXRlIHJlZnJlc2hlZF9lcXVpcDpudW1iZXJbXT1bXTtcclxuXHJcbiAgICAvKirojrflj5blt7Lnu4/liLfmlrDnmoTliIbpkp/mlbAqL1xyXG4gICAgcHVibGljIGdldFJlZnJlc2hUaW1lKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hlZF9taW47XHJcbiAgICB9XHJcbiAgICAvKirkv53lrZjlt7Lnu4/liLfmlrDnmoTliIbpkp/mlbAqL1xyXG4gICAgcHVibGljIHNhdmVSZWZyZXNoVGltZShtaW46bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hlZF9taW49bWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluW3sue7j+WIt+aWsOeahOijheWkh2lk5YiX6KGoKi9cclxuICAgIHB1YmxpYyBnZXRSZWZyZXNoRXF1aXBJZCgpOm51bWJlcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hlZF9lcXVpcDtcclxuICAgIH1cclxuICAgIC8qKua3u+WKoOS4gOS4quijheWkh2lk5Yiw5YiX6KGoKi9cclxuICAgIHB1YmxpYyBhZGRSZWZyZXNoRXF1aXBJZChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucmVmcmVzaGVkX2VxdWlwLnB1c2goaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5pyA5paw55qE6KOF5aSHaWTliJfooagqL1xyXG4gICAgcHVibGljIGdldE5vd0VxdWlwSWRMaXN0KCk6bnVtYmVyW117XHJcbiAgICAgICAgLy9cclxuICAgICAgICBsZXQgdG90YWxUaW1lPU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRHdWFKaU1pbigpO1xyXG4gICAgICAgIGxldCByZW1haW5UaW1lPXRvdGFsVGltZS10aGlzLmdldFJlZnJlc2hUaW1lKCk7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3nmoTmpoLnjofvvIjljYPliIbmr5TvvIlcclxuICAgICAgICBsZXQgZmluaXNoTGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCByYXRlPXRoaXMuZ2V0UHJvYmFiaWxpdHkoZmluaXNoTGV2ZWwpO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpXHJcbiAgICAgICAgLy8gcmF0ZT1yYXRlKjEwO1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5L2/55So55qE5aWW5rGgaWRcclxuICAgICAgICBsZXQgaklkPXRoaXMuZ2V0RHJvcEphY2tQb3QoZmluaXNoTGV2ZWwpOyAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8cmVtYWluVGltZTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJhbmRvbUluZGV4PU1hdGgucmFuZG9tKCkqMTAwMDtcclxuICAgICAgICAgICAgaWYocmFuZG9tSW5kZXg8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICAvL+S7juWlluaxoOmHjOmaj+acuuS4gOS4quijheWkh+WIl+ihqFxyXG4gICAgICAgICAgICAgICAgbGV0IHJkPUphY2twb3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YUJ5SWQoaklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVmcmVzaEVxdWlwSWQocmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVSZWZyZXNoVGltZSh0b3RhbFRpbWUpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaGVkX2VxdWlwLnNvcnQoKGE6bnVtYmVyLGI6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxBPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShhKTtcclxuICAgICAgICAgICAgbGV0IGxldmVsQj1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYik7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXZlbEItbGV2ZWxBO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hlZF9lcXVpcDtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bpooblj5bmjILmnLrlpZblirHnmoTml7bpl7Qt5YiGLOacieacgOWkp+WAvOmZkOWItiovXHJcbiAgICBzdGF0aWMgZ2V0R3VhSmlNaW4oKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgb2Zmc2V0U2VjPXRoaXMuZ2V0R3VhSmlTZWMoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0TWluPU1hdGguZmxvb3Iob2Zmc2V0U2VjLzYwKTtcclxuICAgICAgICByZXR1cm4gb2Zmc2V0TWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlumihuWPluaMguacuuWlluWKseeahOaXtumXtC3np5IqL1xyXG4gICAgc3RhdGljIGdldEd1YUppU2VjKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2d1YWppX3RpbWUnKTtcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFNlYz0wO1xyXG4gICAgICAgIC8vbGV0IG9mZnNldE1pbj0wO1xyXG4gICAgICAgIGlmKG51bSE9XCJcIiYmbnVtIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgICAgIG9mZnNldFNlYz1NYXRoLmZsb29yKChjdXJEYXRlLmdldFRpbWUoKS1udW0pLzEwMDApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVHdWFKaVRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQgbWF4PU9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpbWUobGV2ZWwpO1xyXG4gICAgICAgIGlmKG9mZnNldFNlYz5tYXgqNjApXHJcbiAgICAgICAgb2Zmc2V0U2VjPW1heCo2MDtcclxuXHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyBvZmZzZXRTZWM9NjAqNjA7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gb2Zmc2V0U2VjO1xyXG4gICAgfVxyXG4gICAgLy/kv53lrZjpooblj5bml7bpl7RcclxuICAgIHN0YXRpYyBzYXZlR3VhSmlUaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdndWFqaV90aW1lJyxjdXJEYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UucmVmcmVzaGVkX21pbj0wO1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnJlZnJlc2hlZF9lcXVpcD1bXTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmr482MOWIhumSn+eahOmHkeW4geWlluWKsS0qL1xyXG4gICAgZ2V0T2ZmbGluZVJld2FyZDYwKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHZXRHb2xkKGxldmVsKSo2MDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmr4/liIbpkp/nmoTph5HluIHlpZblirEtKi9cclxuICAgIGdldE9mZmxpbmVSZXdhcmQoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdldEdvbGQobGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuavjzYw5YiG6ZKf55qE57uP6aqM5aWW5YqxLSovXHJcbiAgICBnZXRPZmZsaW5lSGVyb0V4cDYwKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHZXRIZXJvRXhwKGxldmVsKSo2MDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmr4/liIbpkp/nmoToi7Hpm4Tnu4/pqozlpZblirEt56eSKi9cclxuICAgIGdldE9mZmxpbmVIZXJvRXhwKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHZXRIZXJvRXhwKGxldmVsKTtcclxuICAgIH1cclxuICAgIC8qKuavjzYw5YiG6ZKf56a757q/5aWW5YqxLei/m+mYtuefsyAqL1xyXG4gICAgZ2V0T2ZmbGluZUhlcm9TdG9uZTYwKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R2V0UHJvbW90aW9uKGxldmVsKSo2MDtcclxuICAgIH1cclxuICAgIC8qKuavjzYw5YiG6ZKf56a757q/5aWW5YqxLeWFveeyriAqL1xyXG4gICAgZ2V0T2ZmbGluZUFuaW1hbEZvb2Q2MCgpOm51bWJlcntcclxuICAgICAgICBsZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdldEFuaW1hbEZvb2QobGV2ZWwpKjYwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+S7pW51beWIhumSn+emu+e6v+aXtumXtOS9nOS4uuWlluWKsSAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZHMobnVtOm51bWJlcik6UmV3YXJkRGF0YVtde1xyXG4gICAgICAgIGxldCBmaW5pc2hMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IHRvdGFsVGltZT1udW07XHJcbiAgICAgICAgbGV0IHJld2FyZERhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25PZmZsaW5lUmV2ZW51ZShmaW5pc2hMZXZlbCk7XHJcbiAgICAgICAgbGV0IGNvaW5OdW09anNvbkRhdGEuR2V0R29sZCp0b3RhbFRpbWU7XHJcbiAgICAgICAgbGV0IGhlcm9FeHBOdW09anNvbkRhdGEuR2V0SGVyb0V4cCp0b3RhbFRpbWU7XHJcbiAgICAgICAgbGV0IHVzZXJFeHBOdW09anNvbkRhdGEuR2V0UGxheWVyRXhwKnRvdGFsVGltZTtcclxuICAgICAgICAvL+aZi+WNh+efs+WktFxyXG4gICAgICAgIGxldCBzdG9uZVByb21vdGlvbj1NYXRoLmZsb29yKGpzb25EYXRhLkdldFByb21vdGlvbip0b3RhbFRpbWUpO1xyXG4gICAgICAgIC8v5pmu6YCa57K+54K855+zXHJcbiAgICAgICAgbGV0IGppbmdsaWFuMT1NYXRoLmZsb29yKGpzb25EYXRhLkdldE9yZGluYXJ5RW5oYW5jZW1lbnRTdG9uZSp0b3RhbFRpbWUpO1xyXG4gICAgICAgIC8v5Lit57qn57K+54K855+zXHJcbiAgICAgICAgbGV0IGppbmdsaWFuMj1NYXRoLmZsb29yKGpzb25EYXRhLkdldEludGVybWVkaWF0ZUVuaGFuY2VtZW50U3RvbmUqdG90YWxUaW1lKTtcclxuICAgICAgICAvL+mrmOe6p+eyvueCvOefs1xyXG4gICAgICAgIGxldCBqaW5nbGlhbjM9TWF0aC5mbG9vcihqc29uRGF0YS5HZXRTZW5pb3JFbmhhbmNlbWVudFN0b25lKnRvdGFsVGltZSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBtSW5mbz1EaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnRoQ2FyZEluZm8oKTtcclxuICAgICAgICAvLyBsZXQgcUluZm89RGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFydGVyQ2FyZEluZm8oKTtcclxuICAgICAgICBpZihjb2luTnVtPjApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29pbk51bT1NYXRoLmZsb29yKGNvaW5OdW0pO1xyXG4gICAgICAgICAgICBsZXQgY29pblJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgIGNvaW5SZC5yZXdhcmRfaWQ9UHJvcElkLkNvaW47XHJcbiAgICAgICAgICAgIGNvaW5SZC5yZXdhcmRfbnVtPWNvaW5OdW07XHJcbiAgICAgICAgICAgIHJld2FyZERhdGFzLnB1c2goY29pblJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaGVyb0V4cE51bT4wKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhlcm9FeHBOdW09TWF0aC5mbG9vcihoZXJvRXhwTnVtKTtcclxuICAgICAgICAgICAgbGV0IGhlcm9FeHBSZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICBoZXJvRXhwUmQucmV3YXJkX2lkPVByb3BJZC5IZXJvRXhwO1xyXG4gICAgICAgICAgICBoZXJvRXhwUmQucmV3YXJkX251bT1oZXJvRXhwTnVtO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKGhlcm9FeHBSZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHVzZXJFeHBOdW0peyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdXNlckV4cFJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgIHVzZXJFeHBSZC5yZXdhcmRfaWQ9UHJvcElkLlVzZXJFeHA7XHJcbiAgICAgICAgICAgIHVzZXJFeHBSZC5yZXdhcmRfbnVtPXVzZXJFeHBOdW07XHJcbiAgICAgICAgICAgIHJld2FyZERhdGFzLnB1c2godXNlckV4cFJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RvbmVQcm9tb3Rpb24+MCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdG9uZVByb21vdGlvbj1NYXRoLmZsb29yKHN0b25lUHJvbW90aW9uKTtcclxuICAgICAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9pZD1Qcm9wSWQuSGVyb1N0b25lO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfbnVtPXN0b25lUHJvbW90aW9uO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoamluZ2xpYW4xPjApe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5FeGNsdXNpdmVXZWFwb25TdG9uZTE7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09amluZ2xpYW4xO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoamluZ2xpYW4yPjApe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5FeGNsdXNpdmVXZWFwb25TdG9uZTI7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09amluZ2xpYW4yO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoamluZ2xpYW4zPjApe1xyXG4gICAgICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5FeGNsdXNpdmVXZWFwb25TdG9uZTM7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09amluZ2xpYW4zO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3nmoTmpoLnjofvvIjljYPliIbmr5TvvIlcclxuICAgICAgICBsZXQgcmF0ZT10aGlzLmdldFByb2JhYmlsaXR5KGZpbmlzaExldmVsKTtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeS9v+eUqOeahOWlluaxoGlkXHJcbiAgICAgICAgbGV0IGpJZD10aGlzLmdldERyb3BKYWNrUG90KGZpbmlzaExldmVsKTtcclxuICAgICAgICBsZXQgc2RFcXVpcD1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0b3RhbFRpbWU7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByYW5kb21JbmRleD1NYXRoLnJhbmRvbSgpKjEwMDA7XHJcbiAgICAgICAgICAgIGlmKHJhbmRvbUluZGV4PHJhdGUpe1xyXG4gICAgICAgICAgICAgICAgLy/ku47lpZbmsaDph4zpmo/mnLrkuIDkuKroo4XlpIfliJfooahcclxuICAgICAgICAgICAgICAgIGxldCByZD1KYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKGpJZCk7XHJcbiAgICAgICAgICAgICAgICBzZEVxdWlwLnB1c2gocmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZEVxdWlwLnNvcnQoKGE6bnVtYmVyLGI6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxBPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShhKTtcclxuICAgICAgICAgICAgbGV0IGxldmVsQj1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYik7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXZlbEItbGV2ZWxBO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHNkRXF1aXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaWQ9c2RFcXVpcFtpXTtcclxuICAgICAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9pZD1pZDtcclxuICAgICAgICAgICAgcmQucmV3YXJkX251bT0xO1xyXG4gICAgICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkKTtcclxuICAgICAgICAgICAgLy9FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJld2FyZERhdGFzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+W5v+WRiumihuWPluW/q+mAn+aMguacuiAqL1xyXG4gICAgaXNDYW5BZEZhc3RHdWFKaSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuQWRGYXN0T2ZmbGluZSwwKSA9PSAwXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5piv5ZCm5Y+v5Lul57qi54K55o+Q56S65oyC5py65oyJ6ZKuICovXHJcbiAgICBpc0Nhbkd1YUppUmVkVGlwKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gT2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEd1YUppTWluKCk+PTYwXHJcbiAgICB9XHJcbn1cclxuIl19