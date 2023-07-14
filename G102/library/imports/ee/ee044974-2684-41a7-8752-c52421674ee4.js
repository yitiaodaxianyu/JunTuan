"use strict";
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