
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterDataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee044l0JoRBp4dSxSQhZ07k', 'MonsterDataManager');
// Scripts/Monster/Data/MonsterDataManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterDataManager = void 0;
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var MonsterAttribute_1 = require("./MonsterAttribute");
var MonsterFeature_1 = require("./MonsterFeature");
var MonsterManual_1 = require("./MonsterManual");
var MonsterConfigure_1 = require("./MonsterConfigure");
var MonsterGrowthAttributes_1 = require("./MonsterGrowthAttributes");
var MonsterGroupConfigure_1 = require("./MonsterGroupConfigure");
var MonsterSkill_1 = require("./MonsterSkill");
var MonsterDataManager = /** @class */ (function () {
    function MonsterDataManager() {
        //资源
        //怪物数据
        //消灭的敌人数量统计
        this.kill_enemys = [];
    }
    MonsterDataManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterDataManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterDataManager.prototype.init = function () {
        MonsterAttribute_1.MonsterAttributeManager.getInstance();
        MonsterFeature_1.MonsterFeatureManager.getInstance();
        MonsterManual_1.MonsterManualManager.getInstance();
        MonsterConfigure_1.MonsterConfigureManager.getInstance();
        MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance();
        MonsterGroupConfigure_1.MonsterGroupConfigureManager.getInstance();
        MonsterSkill_1.MonsterSkillManager.getInstance();
        //this.loadAllKillEnemy();
    };
    //********************************************敌人的*************************************************
    MonsterDataManager.prototype.loadAllKillEnemy = function () {
        this.kill_enemys = new Array();
        for (var i = 0; i < EnemyConfig_1.Enemy_Type.enemy_num; i++) {
            var num = cc.sys.localStorage.getItem('kill_enemy_' + i);
            if (num === "" || num === null) {
                num = 0;
                this.saveKillEnemy(i, num);
            }
            else {
                num = parseInt(num);
                // if(IsDebug)
                // num=99999;
                this.kill_enemys[i] = num;
            }
        }
    };
    MonsterDataManager.prototype.getKillEnemy = function (type) {
        return this.kill_enemys[type];
    };
    MonsterDataManager.prototype.addKillEnemy = function (type, addNum) {
        this.kill_enemys[type] += addNum;
    };
    MonsterDataManager.prototype.saveKillEnemy = function (type, num) {
        this.kill_enemys[type] = num;
        cc.sys.localStorage.setItem('kill_enemy_' + type, num);
    };
    MonsterDataManager.prototype.saveAllKillEnemy = function () {
        for (var i = 0; i < EnemyConfig_1.Enemy_Type.enemy_num; i++) {
            cc.sys.localStorage.setItem('kill_enemy_' + i, this.kill_enemys[i]);
        }
        //EventManager.postAssetsEvent(AssetsEventType.KILL_ENEMY);
    };
    //获取击杀奖励阶段
    MonsterDataManager.prototype.getKillRewardLevel = function (type) {
        var num = cc.sys.localStorage.getItem('kill_reward_level_' + type);
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    MonsterDataManager.prototype.saveKillRewardLevel = function (type, num) {
        // let enemyData=EnemyJsonData[type];
        // let killNums=enemyData.kill_num.split('|');
        // let maxLevel=killNums.length;
        // if(num<=maxLevel)
        cc.sys.localStorage.setItem('kill_reward_level_' + type, num);
    };
    MonsterDataManager.prototype.getIsCanGetKillReward = function (enemyType) {
        var jieduan = this.getKillRewardLevel(enemyType);
        var id = this.getMonsterIdByType(enemyType);
        var killNums = MonsterManual_1.MonsterManualManager.getInstance().getKillNumber(id);
        if (jieduan > killNums.length) {
            return false;
        }
        else {
            if (jieduan == killNums.length) {
                jieduan = killNums.length - 1;
            }
            var needNum = killNums[jieduan];
            var killNum = this.kill_enemys[enemyType];
            if (killNum >= needNum) {
                return true;
            }
        }
        return false;
    };
    MonsterDataManager.prototype.getIsUnlockEnemy = function (enemyType) {
        return this.kill_enemys[enemyType] > 0 ? true : false;
    };
    /**根据怪物类型获取怪物ID */
    MonsterDataManager.prototype.getMonsterIdByType = function (type) {
        return 50000 + (type) * 10;
    };
    /**根据怪物类型和击杀阶段获取钻石奖励的数量 */
    MonsterDataManager.prototype.getDiamondRewardByLevel = function (type, level) {
        var id = this.getMonsterIdByType(type);
        var diamondNums = MonsterManual_1.MonsterManualManager.getInstance().getDiamondReward(id);
        if (level >= diamondNums.length) {
            level = diamondNums.length - 1;
        }
        return diamondNums[level];
    };
    MonsterDataManager._instance = null;
    return MonsterDataManager;
}());
exports.MonsterDataManager = MonsterDataManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3RlckRhdGFNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUFxRDtBQUNyRCx1REFBNkQ7QUFDN0QsbURBQXlEO0FBQ3pELGlEQUF1RDtBQUN2RCx1REFBNkQ7QUFDN0QscUVBQTJFO0FBQzNFLGlFQUF1RTtBQUN2RSwrQ0FBcUQ7QUFHckQ7SUFBQTtRQUdJLElBQUk7UUFFSixNQUFNO1FBQ04sV0FBVztRQUNILGdCQUFXLEdBQVUsRUFBRSxDQUFDO0lBeUlwQyxDQUFDO0lBdklpQiw4QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELGlDQUFJLEdBQVo7UUFDSSwwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0Qyx3REFBOEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxvREFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMxQyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQywwQkFBMEI7SUFDOUIsQ0FBQztJQUdELGtHQUFrRztJQUMxRiw2Q0FBZ0IsR0FBeEI7UUFFSSxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksS0FBSyxFQUFVLENBQUM7UUFDckMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFD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Y2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0c0V2ZW50VHlwZSwgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmVteV9UeXBlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4vTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyRmVhdHVyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyRmVhdHVyZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyTWFudWFsTWFuYWdlciB9IGZyb20gXCIuL01vbnN0ZXJNYW51YWxcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciB9IGZyb20gXCIuL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyR3JvdXBDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlclNraWxsTWFuYWdlciB9IGZyb20gXCIuL01vbnN0ZXJTa2lsbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVyRGF0YU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW9uc3RlckRhdGFNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v6LWE5rqQXHJcblxyXG4gICAgLy/mgKrnianmlbDmja5cclxuICAgIC8v5raI54Gt55qE5pWM5Lq65pWw6YeP57uf6K6hXHJcbiAgICBwcml2YXRlIGtpbGxfZW5lbXlzOm51bWJlcltdPVtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpNb25zdGVyRGF0YU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBNb25zdGVyRGF0YU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuICAgICAgICBNb25zdGVyQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIE1vbnN0ZXJGZWF0dXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW51YWxNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBNb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy90aGlzLmxvYWRBbGxLaWxsRW5lbXkoKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlYzkurrnmoQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBwcml2YXRlIGxvYWRBbGxLaWxsRW5lbXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMua2lsbF9lbmVteXM9bmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxFbmVteV9UeXBlLmVuZW15X251bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2tpbGxfZW5lbXlfJytpKTtcclxuICAgICAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBudW09MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUtpbGxFbmVteShpLG51bSk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAgICAgICAgIC8vIG51bT05OTk5OTtcclxuICAgICAgICAgICAgICAgIHRoaXMua2lsbF9lbmVteXNbaV09bnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEtpbGxFbmVteSh0eXBlOkVuZW15X1R5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtpbGxfZW5lbXlzW3R5cGVdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEtpbGxFbmVteSh0eXBlOkVuZW15X1R5cGUsYWRkTnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmtpbGxfZW5lbXlzW3R5cGVdKz1hZGROdW07XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUtpbGxFbmVteSh0eXBlOkVuZW15X1R5cGUsbnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmtpbGxfZW5lbXlzW3R5cGVdPW51bTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2tpbGxfZW5lbXlfJyt0eXBlLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUFsbEtpbGxFbmVteSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8RW5lbXlfVHlwZS5lbmVteV9udW07IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2lsbF9lbmVteV8nK2ksdGhpcy5raWxsX2VuZW15c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuS0lMTF9FTkVNWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blh7vmnYDlpZblirHpmLbmrrVcclxuICAgIGdldEtpbGxSZXdhcmRMZXZlbCh0eXBlOkVuZW15X1R5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdraWxsX3Jld2FyZF9sZXZlbF8nK3R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlS2lsbFJld2FyZExldmVsKHR5cGU6RW5lbXlfVHlwZSxudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBlbmVteURhdGE9RW5lbXlKc29uRGF0YVt0eXBlXTtcclxuICAgICAgICAvLyBsZXQga2lsbE51bXM9ZW5lbXlEYXRhLmtpbGxfbnVtLnNwbGl0KCd8Jyk7XHJcbiAgICAgICAgLy8gbGV0IG1heExldmVsPWtpbGxOdW1zLmxlbmd0aDtcclxuICAgICAgICAvLyBpZihudW08PW1heExldmVsKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2lsbF9yZXdhcmRfbGV2ZWxfJyt0eXBlLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5HZXRLaWxsUmV3YXJkKGVuZW15VHlwZTpFbmVteV9UeXBlKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGppZWR1YW49dGhpcy5nZXRLaWxsUmV3YXJkTGV2ZWwoZW5lbXlUeXBlKTtcclxuICAgICAgICBsZXQgaWQ9dGhpcy5nZXRNb25zdGVySWRCeVR5cGUoZW5lbXlUeXBlKTtcclxuICAgICAgICBsZXQga2lsbE51bXM9TW9uc3Rlck1hbnVhbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRLaWxsTnVtYmVyKGlkKTtcclxuICAgICAgICBpZihqaWVkdWFuPmtpbGxOdW1zLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoamllZHVhbj09a2lsbE51bXMubGVuZ3RoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBqaWVkdWFuPWtpbGxOdW1zLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZWVkTnVtPWtpbGxOdW1zW2ppZWR1YW5dO1xyXG4gICAgICAgICAgICBsZXQga2lsbE51bT10aGlzLmtpbGxfZW5lbXlzW2VuZW15VHlwZV07XHJcbiAgICAgICAgICAgIGlmKGtpbGxOdW0+PW5lZWROdW0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc1VubG9ja0VuZW15KGVuZW15VHlwZTpFbmVteV9UeXBlKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2lsbF9lbmVteXNbZW5lbXlUeXBlXT4wP3RydWU6ZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoq5qC55o2u5oCq54mp57G75Z6L6I635Y+W5oCq54mpSUQgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVySWRCeVR5cGUodHlwZTpFbmVteV9UeXBlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNTAwMDArKHR5cGUpKjEwO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mp57G75Z6L5ZKM5Ye75p2A6Zi25q616I635Y+W6ZK755+z5aWW5Yqx55qE5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0RGlhbW9uZFJld2FyZEJ5TGV2ZWwodHlwZTpFbmVteV9UeXBlLGxldmVsOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGlkPXRoaXMuZ2V0TW9uc3RlcklkQnlUeXBlKHR5cGUpO1xyXG4gICAgICAgIGxldCBkaWFtb25kTnVtcz1Nb25zdGVyTWFudWFsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERpYW1vbmRSZXdhcmQoaWQpO1xyXG4gICAgICAgIGlmKGxldmVsPj1kaWFtb25kTnVtcy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXZlbD1kaWFtb25kTnVtcy5sZW5ndGgtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpYW1vbmROdW1zW2xldmVsXTtcclxuICAgIH1cclxufVxyXG4iXX0=