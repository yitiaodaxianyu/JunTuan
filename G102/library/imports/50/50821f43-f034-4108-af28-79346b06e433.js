"use strict";
cc._RF.push(module, '508219D8DRBCK8oeTRrBuQz', 'MissionLevel');
// Scripts/Level/MissionLevel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionLevelManager = exports.JsonMissionLevel = exports.TableMonsterData = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var Constants_1 = require("../Constants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var MonsterGroupConfigure_1 = require("../Monster/Data/MonsterGroupConfigure");
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterGrowthAttributes_1 = require("../Monster/Data/MonsterGrowthAttributes");
var MonsterSkill_1 = require("../Monster/Data/MonsterSkill");
var TableMonsterData = /** @class */ (function () {
    function TableMonsterData() {
        /**怪物id */
        this.id = 50010;
        /**怪物数量 */
        this.num = 1;
        /**怪物等级 */
        this.level = 1;
        /**怪物hp系数 */
        this.hp_rate = 1;
        /**怪物刷新间隔 */
        this.refresh_time = 0;
        /**怪物分数（活动模式专用） */
        this.score = 10;
    }
    return TableMonsterData;
}());
exports.TableMonsterData = TableMonsterData;
var JsonMissionLevel = /** @class */ (function () {
    function JsonMissionLevel() {
        /**关卡数id */
        this.LevelId = 0;
        /**关卡类型 */
        this.LevelTypes = 0;
        /**章节 */
        this.Chapter = 0;
        /**小关编号 */
        this.LevelNum = 0;
        /**x轴 */
        this.PosX = 0;
        /**y轴 */
        this.PosY = 0;
        /**怪物组配置 */
        this.MonsterGroupConfigure = [];
        /**最大波次 */
        this.MaxWave = 0;
        /**怪潮波次 */
        this.MonsterTideWave = [];
        /**每波时间间隔 */
        this.TimeInterval = [];
        /**怪物等级 */
        this.MonsterLevel = [];
        /**血量系数 */
        this.HpCoefficient = [];
        /**金币总数量 */
        this.PassReward_Coin = 0;
        /**推荐战力 */
        this.RecommendedCombatPower = 0;
    }
    return JsonMissionLevel;
}());
exports.JsonMissionLevel = JsonMissionLevel;
var MissionLevelManager = /** @class */ (function () {
    function MissionLevelManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MissionLevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MissionLevelManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MissionLevelManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MissionLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMissionLevel成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMissionLevel();
                jsonData = json[i];
                _this.data.set(jsonData.LevelId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MissionLevelManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MissionLevelManager.prototype.getJsonMissionLevel = function (id) {
        return this.data.get(id);
    };
    /**根据关卡数id获取关卡类型 */
    MissionLevelManager.prototype.getLevelTypes = function (id) {
        return this.data.get(id).LevelTypes;
    };
    /**根据关卡数id获取章节 */
    MissionLevelManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据关卡数id获取小关编号 */
    MissionLevelManager.prototype.getLevelNum = function (id) {
        return this.data.get(id).LevelNum;
    };
    /**根据关卡数id获取x轴 */
    MissionLevelManager.prototype.getPosX = function (id) {
        return this.data.get(id).PosX;
    };
    /**根据关卡数id获取y轴 */
    MissionLevelManager.prototype.getPosY = function (id) {
        return this.data.get(id).PosY;
    };
    /**根据关卡数id获取怪物组配置 */
    MissionLevelManager.prototype.getMonsterGroupConfigure = function (id) {
        return this.data.get(id).MonsterGroupConfigure;
    };
    /**根据关卡数id获取最大波次 */
    MissionLevelManager.prototype.getMaxWave = function (id) {
        return this.data.get(id).MaxWave;
    };
    /**根据关卡数id获取怪潮波次 */
    MissionLevelManager.prototype.getMonsterTideWave = function (id) {
        return this.data.get(id).MonsterTideWave;
    };
    /**根据关卡数id获取每波时间间隔 */
    MissionLevelManager.prototype.getTimeInterval = function (id) {
        return this.data.get(id).TimeInterval;
    };
    /**根据关卡数id获取怪物等级 */
    MissionLevelManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /**根据关卡数id获取血量系数 */
    MissionLevelManager.prototype.getHpCoefficient = function (id) {
        return this.data.get(id).HpCoefficient;
    };
    /**根据关卡数id获取金币总数量 */
    MissionLevelManager.prototype.getPassReward_Coin = function (id) {
        return this.data.get(id).PassReward_Coin;
    };
    /**根据关卡数id获取推荐战力 */
    MissionLevelManager.prototype.getRecommendedCombatPower = function (id) {
        return this.data.get(id).RecommendedCombatPower;
    };
    /** 静态方法，获取最大的 关卡数id*/
    MissionLevelManager.getMaxLevelId = function () {
        return 6;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据关卡数和波数获得一个id */
    MissionLevelManager.getId = function (level, wave) {
        return 10000 * level + wave;
    };
    /** 静态方法，获取最大的关卡数*/
    MissionLevelManager.getMaxLevel = function () {
        return 255;
    };
    /**根据关卡数获得该关卡的总波数 */
    MissionLevelManager.prototype.getWaveNumByLevel = function (level) {
        var num = this.getMonsterGroupConfigure(level).length;
        return num;
    };
    /**获取关卡名字 */
    MissionLevelManager.prototype.getLevelName = function (level) {
        return this.getChapter(level) + "";
    };
    /**根据id号获取Json的坐标 */
    MissionLevelManager.prototype.getJsonLevelPosXY = function (id) {
        var pos = new cc.Vec2(this.getPosX(id), this.getPosY(id));
        return pos;
    };
    /**获得level的关卡数据 */
    MissionLevelManager.prototype.getFightingInfo = function (level) {
        var jsonData = this.getJsonMissionLevel(level);
        var fightingInfo = new Constants_1.FightingInfo();
        fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(130007) + ' ' + this.getLevelName(level);
        //背景图片名称    
        var bgIndex = (this.getChapter(level) % 11);
        var bgName = 'bg/bg' + bgIndex;
        fightingInfo.bg_name = bgName;
        fightingInfo.wall_name = bgName + '_wall';
        fightingInfo.wave_types = jsonData.MonsterTideWave;
        fightingInfo.wave_refresh_time = jsonData.TimeInterval;
        //怪物信息列表
        var monsterDatas = new Array();
        var monsterGroups = jsonData.MonsterGroupConfigure;
        var MGC = MonsterGroupConfigure_1.MonsterGroupConfigureManager.getInstance();
        for (var i = 0; i < monsterGroups.length; i++) {
            var dataArr = new Array();
            var groupId = monsterGroups[i];
            var monsterJsonData = MGC.getJsonMonsterGroupConfigure(groupId);
            for (var n = 0; n < monsterJsonData.MonsterId.length; n++) {
                var tableMonsterData = new TableMonsterData();
                tableMonsterData.id = monsterJsonData.MonsterId[n];
                tableMonsterData.num = monsterJsonData.MonsterNum[n];
                tableMonsterData.refresh_time = monsterJsonData.RefreshInterval[n];
                tableMonsterData.level = jsonData.MonsterLevel[i];
                tableMonsterData.hp_rate = jsonData.HpCoefficient[i];
                dataArr.push(tableMonsterData);
                fightingInfo.total_monster_num += tableMonsterData.num;
            }
            monsterDatas.push(dataArr);
        }
        fightingInfo.monster_datas = monsterDatas;
        console.log("主线关卡-" + level);
        return fightingInfo;
    };
    MissionLevelManager.prototype.getLevelPos = function (level) {
        var jsonData = this.getJsonMissionLevel(level);
        var pos = cc.v2(jsonData.PosX, jsonData.PosY);
        return pos;
    };
    /**根据一个战力，获得关卡数 */
    MissionLevelManager.prototype.getLevelByZhanli = function (zhanli, type) {
        var level = 1;
        //搜索关卡
        var minOffsetZhanli = zhanli;
        this.data.forEach(function (jsonData, key) {
            if (type == jsonData.LevelTypes) {
                var curZhanli = jsonData.RecommendedCombatPower;
                var offsetZL = Math.abs(curZhanli - zhanli);
                if (offsetZL < minOffsetZhanli) {
                    minOffsetZhanli = offsetZL;
                    level = key;
                }
            }
        });
        return level;
    };
    /**根据关卡获取当前关卡对应的章节的最后一关关卡数 */
    MissionLevelManager.prototype.getLastLevel = function (level) {
        var lastLevel = 1;
        //获取当前章节
        var chapter = this.getChapter(level);
        this.data.forEach(function (v, k) {
            if (v.Chapter == chapter) {
                lastLevel = v.LevelNum;
            }
        });
        return lastLevel;
    };
    /**根据章节获取当前章节对应的关卡的最后一关 */
    MissionLevelManager.prototype.getChapterLevel = function (chapter) {
        var LevelId = 1;
        //获取与传过来章节一样的关卡
        this.data.forEach(function (v, k) {
            if (v.Chapter == chapter) {
                LevelId = v.LevelId;
            }
        });
        return LevelId;
    };
    /**获取Json的长度 */
    MissionLevelManager.prototype.getJsonLevelLength = function () {
        var pos = this.data.size;
        return pos;
    };
    /**获取这个章节的长度 */
    MissionLevelManager.prototype.getJsonLevelchapterLength = function (number) {
        var length = 0;
        this.data.forEach(function (v, k) {
            if (v.Chapter == number) {
                length += 1;
            }
        });
        return length;
    };
    /**获取这个章节之前章节的全部长度 */
    MissionLevelManager.prototype.getJsonLevelchapterwholeLength = function (number) {
        var length = 0;
        for (var index = 0; index < 1;) {
            number--;
            if (number == 0) {
                number--;
                index = 2;
            }
            if (number >= 1) {
                this.data.forEach(function (v, k) {
                    if (v.Chapter == number) {
                        length += 1;
                    }
                });
            }
        }
        return length;
    };
    MissionLevelManager.prototype.check = function () {
        var isHave = false;
        this.data.forEach(function (v, k) {
            if (v.MaxWave != v.MonsterGroupConfigure.length) {
                console.error("关卡" + k + '怪物组配置长度是：' + v.MonsterGroupConfigure.length + ",最大长度：" + v.MaxWave);
            }
            if (v.MaxWave != v.TimeInterval.length) {
                console.error("关卡" + k + '时间间隔长度是：' + v.TimeInterval.length + ",最大长度：" + v.MaxWave);
            }
            if (v.MaxWave != v.HpCoefficient.length) {
                console.error("关卡" + k + '血量系数是：' + v.HpCoefficient.length + ",最大长度：" + v.MaxWave);
            }
            if (v.MaxWave != v.MonsterLevel.length) {
                console.error("关卡" + k + '等级长度是：' + v.MonsterLevel.length + ",最大长度：" + v.MaxWave);
            }
            var monsterGroupConfigure = v.MonsterGroupConfigure;
            for (var i = 0; i < monsterGroupConfigure.length; i++) {
                var groupId = monsterGroupConfigure[i];
                var jsonMGC = MonsterGroupConfigure_1.MonsterGroupConfigureManager.getInstance().getJsonMonsterGroupConfigure(groupId);
                if (!jsonMGC) {
                    console.error("怪物组配置id不存在：" + groupId);
                    isHave = true;
                }
                else {
                    //如果存在，查找这个怪物组配置是否有问题
                    if (jsonMGC.MonsterId.length != jsonMGC.MonsterNum.length) {
                        console.error("怪物组配置id和怪物数量存在长度不一致：" + groupId);
                    }
                    if (jsonMGC.MonsterId.length != jsonMGC.RefreshInterval.length) {
                        console.error("怪物组配置id和刷新时间存在长度不一致：" + groupId);
                    }
                    //如果存在，查找怪物是否存在
                    var monsterArr = jsonMGC.MonsterId;
                    for (var m = 0; m < monsterArr.length; m++) {
                        var monsterId = monsterArr[m];
                        var jsonMonster = MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
                        if (!jsonMonster) {
                            console.error("怪物id不存在：" + monsterId);
                            isHave = true;
                        }
                        else {
                            //查找等级是否存在
                            var level = v.MonsterLevel[i];
                            var attbId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(monsterId, level);
                            var jsonAttb = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attbId);
                            if (!jsonAttb) {
                                console.error("怪物属性id不存在：" + attbId);
                                isHave = true;
                            }
                            else {
                                //检查技能
                                for (var s = 1; s <= jsonMonster.SkillNum; s++) {
                                    var skillId = MonsterSkill_1.MonsterSkillManager.getInstance().getId(jsonMonster.MonsterId, s, jsonAttb.SkillLevel);
                                    var skillJson = MonsterSkill_1.MonsterSkillManager.getInstance().getJsonMonsterSkill(skillId);
                                    if (!skillJson) {
                                        console.error("怪物id：" + monsterId + "技能id不存在：" + skillId);
                                        isHave = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        // if(isHave==false){
        //     console.log("关卡检测通过,没问题!");
        // }
        //怪物组配置检测
    };
    MissionLevelManager._instance = null;
    return MissionLevelManager;
}());
exports.MissionLevelManager = MissionLevelManager;

cc._RF.pop();