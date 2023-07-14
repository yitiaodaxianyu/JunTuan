"use strict";
cc._RF.push(module, 'b258azMabtG+KKJtdkMH8qk', 'BossChallenge');
// Scripts/Activity/BossChallenge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossChallengeManager = exports.JsonBossChallenge = exports.ChallengeMode = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var Constants_1 = require("../Constants");
var MissionLevel_1 = require("../Level/MissionLevel");
var LoadManager_1 = require("../Loading/LoadManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var ChallengeMode;
(function (ChallengeMode) {
    ChallengeMode[ChallengeMode["Noamal"] = 1] = "Noamal";
    ChallengeMode[ChallengeMode["Hard"] = 2] = "Hard";
    ChallengeMode[ChallengeMode["World"] = 3] = "World";
})(ChallengeMode = exports.ChallengeMode || (exports.ChallengeMode = {}));
var JsonBossChallenge = /** @class */ (function () {
    function JsonBossChallenge() {
        /**挑战ID */
        this.ChallengeID = 0;
        /**轮换顺序 */
        this.RotationOrder = 0;
        /**阶段 */
        this.Stage = 0;
        /**怪物ID */
        this.MonsterId = 0;
        /**承伤上限 */
        this.InjuryLimit = 0;
        /**怪物等级 */
        this.MonsterLevel = 0;
        /**章节场景 */
        this.ChapterScene = 0;
    }
    return JsonBossChallenge;
}());
exports.JsonBossChallenge = JsonBossChallenge;
var BossChallengeManager = /** @class */ (function () {
    function BossChallengeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        this.cur_challenge_mode = ChallengeMode.Noamal;
        this.cur_score = 0;
        this.boss_challenge_ts = null;
    }
    BossChallengeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BossChallengeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    BossChallengeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    BossChallengeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('BossChallenge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonBossChallenge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonBossChallenge();
                jsonData = json[i];
                _this.data.set(jsonData.ChallengeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    BossChallengeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    BossChallengeManager.prototype.getJsonBossChallenge = function (id) {
        return this.data.get(id);
    };
    /**根据挑战ID获取轮换顺序 */
    BossChallengeManager.prototype.getRotationOrder = function (id) {
        return this.data.get(id).RotationOrder;
    };
    /**根据挑战ID获取阶段 */
    BossChallengeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据挑战ID获取怪物ID */
    BossChallengeManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据挑战ID获取承伤上限 */
    BossChallengeManager.prototype.getInjuryLimit = function (id) {
        return this.data.get(id).InjuryLimit;
    };
    /**根据挑战ID获取怪物等级 */
    BossChallengeManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /**根据挑战ID获取章节场景 */
    BossChallengeManager.prototype.getChapterScene = function (id) {
        return this.data.get(id).ChapterScene;
    };
    /** 静态方法，获取最大的 挑战ID*/
    BossChallengeManager.getMaxChallengeID = function () {
        return 10047;
    };
    BossChallengeManager.getId = function (mode, rewardLevel) {
        return 1000 * mode + rewardLevel;
    };
    /**获得level的关卡数据 */
    BossChallengeManager.prototype.getFightingInfo = function (mode) {
        // console.log("++++++获取关卡数据",)
        var fightingInfo = new Constants_1.FightingInfo();
        //LanguageManager.getInstance().getStrByTextId(0)+
        fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(820001);
        var md = new MissionLevel_1.TableMonsterData();
        var dataArr = new Array();
        var RotationOrder = UserInfo_1.UserInfo.getInstance().RotationOrder; //1//轮换顺序
        var Stage = 1; //阶段
        var ChallengeID = RotationOrder * 1000 + Stage; //挑战ID
        //背景图片名称    
        var bgIndex = BossChallengeManager.getInstance().getChapterScene(ChallengeID) + 1;
        var bgName = 'bg/bg' + bgIndex;
        fightingInfo.wall_name = bgName + '_wall';
        fightingInfo.bg_name = bgName;
        fightingInfo.total_monster_num = 1;
        fightingInfo.wave_types = [0];
        fightingInfo.wave_refresh_time = [0];
        //怪物信息列表
        var monsterDatas = new Array();
        // this.data.forEach((v,k)=>{
        //     if(mode==1){
        //         let dataArr=new Array();
        //         for(let i=1; i<=1; i++){
        //             let md=new TableMonsterData();
        //             md.id=v.MonsterId;
        //             md.num=1;
        //             md.level=v.MonsterLevel;
        //             dataArr.push(md);
        //             fightingInfo.total_monster_num+=1;
        //         }
        //         monsterDatas.push(dataArr);
        //     }            
        // })
        md.id = BossChallengeManager.getInstance().getMonsterId(ChallengeID); //怪物id//v.MonsterId;
        md.num = 1;
        md.level = BossChallengeManager.getInstance().getMonsterLevel(ChallengeID); //v.MonsterLevel;
        dataArr.push(md);
        fightingInfo.total_monster_num += 1;
        monsterDatas.push(dataArr);
        fightingInfo.monster_datas = monsterDatas;
        return fightingInfo;
    };
    BossChallengeManager.prototype.addScore = function (score) {
        this.cur_score += score;
        return this.boss_challenge_ts.refreshData();
    };
    BossChallengeManager.prototype.showProgress = function () {
        return this.boss_challenge_ts.refreshData();
    };
    BossChallengeManager.prototype.getBossChallengeStage = function (mode) {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.BossChallengeStage + mode, -1);
    };
    BossChallengeManager.prototype.saveBossChallengeStage = function (mode, num) {
        if (num > this.getBossChallengeStage(mode)) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeStage + mode, num);
        }
    };
    BossChallengeManager.prototype.setDamageNumber = function (damageNumber) {
        if (damageNumber > this.getMaxDamageNumber()) {
            this.saveDamageNumber(damageNumber);
        }
    };
    BossChallengeManager.prototype.saveDamageNumber = function (damageNumber) {
        UserInfo_1.UserInfo.getInstance().damageNumber = damageNumber;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, this.setCopyDamageNumberJsonString(damageNumber));
        // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamageMax,damageNumber);
    };
    BossChallengeManager.prototype.getMaxDamageNumber = function () {
        var damage = UserInfo_1.UserInfo.getInstance().damageNumber;
        return damage;
    };
    BossChallengeManager.prototype.setCopyDamageNumberJsonString = function (damageNumber) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = damageNumber;
        return JSON.stringify({
            type: 10,
            uid: uid,
            value: num,
        });
    };
    BossChallengeManager._instance = null;
    return BossChallengeManager;
}());
exports.BossChallengeManager = BossChallengeManager;

cc._RF.pop();