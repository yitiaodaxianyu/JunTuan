"use strict";
cc._RF.push(module, '29608xUcEtIPZXaFB9g6Ws8', 'EndlessLevels');
// Scripts/Activity/EndlessLevels.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessLevelsManager = exports.JsonEndlessLevels = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var Constants_1 = require("../Constants");
var MissionLevel_1 = require("../Level/MissionLevel");
var LoadManager_1 = require("../Loading/LoadManager");
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterGrowthAttributes_1 = require("../Monster/Data/MonsterGrowthAttributes");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var MyTool_1 = require("../Tools/MyTool");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var JsonEndlessLevels = /** @class */ (function () {
    function JsonEndlessLevels() {
        /**回合 */
        this.Round = 0;
        /**等级上限 */
        this.LevelLimit_Upper = 0;
        /**等级下限 */
        this.LevelLimit_Lower = 0;
        /**怪物数量 */
        this.MonsterNum = [];
        /**血量系数 */
        this.HpCoefficient = [];
        /**怪潮波次 */
        this.MonsterTideWave = [];
        /**每波时间间隔 */
        this.TimeInterval = [];
        /**普通怪id */
        this.NormalMonster = [];
        /**精英怪id */
        this.EliteMonster = [];
        /**精英怪概率 */
        this.ProbabilityOfElite = [];
    }
    return JsonEndlessLevels;
}());
exports.JsonEndlessLevels = JsonEndlessLevels;
var EndlessLevelsManager = /** @class */ (function () {
    function EndlessLevelsManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        this.endless_score = 0;
    }
    EndlessLevelsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EndlessLevelsManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EndlessLevelsManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EndlessLevelsManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EndlessLevels', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessLevels成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEndlessLevels();
                jsonData = json[i];
                _this.data.set(jsonData.Round, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EndlessLevelsManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EndlessLevelsManager.prototype.getJsonEndlessLevels = function (id) {
        return this.data.get(id);
    };
    /**根据回合获取等级上限 */
    EndlessLevelsManager.prototype.getLevelLimit_Upper = function (id) {
        return this.data.get(id).LevelLimit_Upper;
    };
    /**根据回合获取等级下限 */
    EndlessLevelsManager.prototype.getLevelLimit_Lower = function (id) {
        return this.data.get(id).LevelLimit_Lower;
    };
    /**根据回合获取怪物数量 */
    EndlessLevelsManager.prototype.getMonsterNum = function (id) {
        return this.data.get(id).MonsterNum;
    };
    /**根据回合获取血量系数 */
    EndlessLevelsManager.prototype.getHpCoefficient = function (id) {
        return this.data.get(id).HpCoefficient;
    };
    /**根据回合获取怪潮波次 */
    EndlessLevelsManager.prototype.getMonsterTideWave = function (id) {
        return this.data.get(id).MonsterTideWave;
    };
    /**根据回合获取每波时间间隔 */
    EndlessLevelsManager.prototype.getTimeInterval = function (id) {
        return this.data.get(id).TimeInterval;
    };
    /**根据回合获取普通怪id */
    EndlessLevelsManager.prototype.getNormalMonster = function (id) {
        return this.data.get(id).NormalMonster;
    };
    /**根据回合获取精英怪id */
    EndlessLevelsManager.prototype.getEliteMonster = function (id) {
        return this.data.get(id).EliteMonster;
    };
    /**根据回合获取精英怪概率 */
    EndlessLevelsManager.prototype.getProbabilityOfElite = function (id) {
        return this.data.get(id).ProbabilityOfElite;
    };
    /** 静态方法，获取最大的 回合*/
    EndlessLevelsManager.getMaxRound = function () {
        return 85;
    };
    /**获得回合数的关卡数据 */
    EndlessLevelsManager.prototype.getFightingInfo = function (round) {
        var fightingInfo = new Constants_1.FightingInfo();
        //LanguageManager.getInstance().getStrByTextId(0)+
        fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(800001);
        //背景图片名称    
        // let bgIndex=2;
        var bgName = "bg/bg_Endless"; //'bg/bg'+bgIndex;
        fightingInfo.bg_name = bgName;
        fightingInfo.wall_name = "bg/bg5_wall";
        //怪物信息列表
        var monsterDatas = new Array();
        var jsonData = this.getJsonEndlessLevels(round);
        //怪物潮
        fightingInfo.wave_types = jsonData.MonsterTideWave;
        fightingInfo.wave_refresh_time = jsonData.TimeInterval;
        //当前回合的怪物组
        for (var i = 0; i < jsonData.MonsterNum.length; i++) {
            var dataArr = new Array();
            //每波怪的数量
            var monsterNum = jsonData.MonsterNum[i];
            var delayTime = (jsonData.TimeInterval[i] - 2) / monsterNum;
            if (delayTime < 0) {
                delayTime = 0;
            }
            for (var n = 0; n < monsterNum; n++) {
                //每只怪物都要单独随机
                //1.随机怪物等级
                var useLevel = MyTool_1.default.randomRangeInt(jsonData.LevelLimit_Lower, jsonData.LevelLimit_Upper, true);
                //2.找出存在该等级的怪物池A
                var monsterArrA = new Array();
                for (var x = 0; x < jsonData.NormalMonster.length; x++) {
                    var monsterIdA = jsonData.NormalMonster[x];
                    var attriId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(monsterIdA, useLevel);
                    //属性表是否包含该id
                    if (MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)) {
                        monsterArrA.push(monsterIdA);
                    }
                }
                //存在该等级的精英池A
                var eliteArrA = new Array();
                for (var x = 0; x < jsonData.EliteMonster.length; x++) {
                    var eliteIdA = jsonData.EliteMonster[x];
                    var attriId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(eliteIdA, useLevel);
                    //属性表是否包含该id
                    if (MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)) {
                        eliteArrA.push(eliteIdA);
                    }
                }
                if (monsterArrA.length <= 0 && eliteArrA.length <= 0) {
                    cc.error("不存在等级：" + useLevel);
                    ;
                }
                //3.如果存在精英怪，则优先随机是否有精英怪
                var isHaveElite = false;
                if (eliteArrA.length > 0) {
                    isHaveElite = Math.random() < jsonData.ProbabilityOfElite[i];
                }
                var useMonsterId = 0;
                if (isHaveElite) {
                    //随机精英怪
                    useMonsterId = eliteArrA[MyTool_1.default.randomRangeInt(0, eliteArrA.length)];
                }
                else {
                    //随机普通怪
                    useMonsterId = monsterArrA[MyTool_1.default.randomRangeInt(0, monsterArrA.length)];
                }
                var md = new MissionLevel_1.TableMonsterData();
                md.id = useMonsterId;
                md.num = 1;
                md.level = useLevel;
                md.refresh_time = Math.random() * delayTime;
                dataArr.push(md);
                fightingInfo.total_monster_num += md.num;
            }
            monsterDatas.push(dataArr);
        }
        fightingInfo.monster_datas = monsterDatas;
        return fightingInfo;
    };
    /**
     * 获得回合数
     * @param waveNum 波数
     * @returns 回合数
     */
    EndlessLevelsManager.prototype.getRound = function (waveNum) {
        var round = 1;
        var totalWave = 0;
        this.data.forEach(function (v, k) {
            totalWave += v.MonsterNum.length;
            if (totalWave <= waveNum) { //16<9
                round = v.Round;
                round += 1;
            }
        });
        if (round > EndlessLevelsManager.getMaxRound()) {
            round = EndlessLevelsManager.getMaxRound();
        }
        // console.log("回合数：",round)
        return round;
    };
    /**
     * 获得这个回合的第一波的波数
     * @param round 回合数
     * @returns 波数
     */
    EndlessLevelsManager.prototype.getWave = function (round) {
        var mywave = 0;
        var totalWave = 0;
        this.data.forEach(function (v, k) {
            if (round > k) {
                totalWave += v.MonsterNum.length;
                mywave = totalWave;
            }
        });
        return mywave;
    };
    EndlessLevelsManager.prototype.setWave = function (wave) {
        if (wave > this.getMaxWave()) {
            this.saveWave(wave);
        }
    };
    EndlessLevelsManager.prototype.saveWave = function (wave) {
        UserInfo_1.UserInfo.getInstance().waveNumber = wave;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, this.setCopyWaveJsonString(wave));
        // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamageMax,wave);
    };
    EndlessLevelsManager.prototype.getMaxWave = function () {
        var damage = UserInfo_1.UserInfo.getInstance().waveNumber;
        return damage;
    };
    /**检测表格数据 */
    EndlessLevelsManager.prototype.check = function () {
        //怪物潮
        //MonsterGrowthAttributesManager.getInstance().getLevel(123);
        this.data.forEach(function (jsonData, k) {
            //当前回合的怪物组
            for (var i = 0; i < jsonData.MonsterNum.length; i++) {
                //每波怪的数量
                for (var level = jsonData.LevelLimit_Lower; level <= jsonData.LevelLimit_Upper; level++) {
                    var monsterArrA = new Array();
                    for (var x = 0; x < jsonData.NormalMonster.length; x++) {
                        var monsterIdA = jsonData.NormalMonster[x];
                        if (!MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterIdA)) {
                            console.error("不存在怪物id:" + monsterIdA);
                        }
                        var attriId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(monsterIdA, level);
                        //属性表是否包含该id
                        if (MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)) {
                            monsterArrA.push(monsterIdA);
                        }
                    }
                    //存在该等级的精英池A
                    var eliteArrA = new Array();
                    for (var x = 0; x < jsonData.EliteMonster.length; x++) {
                        var eliteIdA = jsonData.EliteMonster[x];
                        if (!MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(eliteIdA)) {
                            console.error("不存在精英怪物id:" + eliteIdA);
                        }
                        var attriId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(eliteIdA, level);
                        //属性表是否包含该id
                        if (MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)) {
                            eliteArrA.push(eliteIdA);
                        }
                    }
                    if (monsterArrA.length <= 0 && eliteArrA.length <= 0) {
                        console.error("不存在等级：" + level);
                    }
                }
            }
        });
    };
    EndlessLevelsManager.prototype.setCopyWaveJsonString = function (Wave) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = Wave;
        return JSON.stringify({
            type: 9,
            uid: uid,
            value: num,
        });
    };
    EndlessLevelsManager._instance = null;
    return EndlessLevelsManager;
}());
exports.EndlessLevelsManager = EndlessLevelsManager;

cc._RF.pop();