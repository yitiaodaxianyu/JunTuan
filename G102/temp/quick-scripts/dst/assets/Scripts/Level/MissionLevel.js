
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Level/MissionLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        return this.getChapter(level) + '-' + this.getLevelNum(level);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXE1pc3Npb25MZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsMENBQXFEO0FBQ3JELG9FQUErRDtBQUMvRCwrRUFBcUY7QUFDckYscUVBQTJFO0FBRTNFLG1GQUF5RjtBQUN6Riw2REFBbUU7QUFFbkU7SUFBQTtRQUNJLFVBQVU7UUFDVixPQUFFLEdBQVEsS0FBSyxDQUFDO1FBQ2hCLFVBQVU7UUFDVixRQUFHLEdBQVEsQ0FBQyxDQUFDO1FBQ2IsVUFBVTtRQUNWLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixZQUFZO1FBQ1osWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFZO1FBQ1osaUJBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSw0Q0FBZ0I7QUFlN0I7SUFBQTtRQUNJLFdBQVc7UUFDSixZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFdBQVc7UUFDSiwwQkFBcUIsR0FBWSxFQUFFLENBQUU7UUFDNUMsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILG9CQUFlLEdBQVksRUFBRSxDQUFFO1FBQ3RDLFlBQVk7UUFDTCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsaUJBQVksR0FBWSxFQUFFLENBQUU7UUFDbkMsVUFB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QUMsU0FBUyxHQUFDLFVBQVUsR0FBQyxPQUFPLENBQUMsQ0FBQzt3Q0FDcEQsTUFBTSxHQUFDLElBQUksQ0FBQztxQ0FDZjtpQ0FDSjs2QkFFSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixxQkFBcUI7UUFDckIsa0NBQWtDO1FBQ2xDLElBQUk7UUFDSixTQUFTO0lBRWIsQ0FBQztJQW5VYyw2QkFBUyxHQUF3QixJQUFJLENBQUM7SUFvVXpELDBCQUFDO0NBclVELEFBcVVDLElBQUE7QUFyVVksa0RBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaWdodGluZ0luZm8sIElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJHcm91cENvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJTa2lsbE1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJTa2lsbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlTW9uc3RlckRhdGF7XHJcbiAgICAvKirmgKrnialpZCAqL1xyXG4gICAgaWQ6bnVtYmVyPTUwMDEwO1xyXG4gICAgLyoq5oCq54mp5pWw6YePICovXHJcbiAgICBudW06bnVtYmVyPTE7XHJcbiAgICAvKirmgKrniannrYnnuqcgKi9cclxuICAgIGxldmVsOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mpaHDns7vmlbAgKi9cclxuICAgIGhwX3JhdGU6bnVtYmVyPTE7XHJcbiAgICAvKirmgKrnianliLfmlrDpl7TpmpQgKi9cclxuICAgIHJlZnJlc2hfdGltZTpudW1iZXI9MDtcclxuICAgIC8qKuaAqueJqeWIhuaVsO+8iOa0u+WKqOaooeW8j+S4k+eUqO+8iSAqL1xyXG4gICAgc2NvcmU6bnVtYmVyPTEwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbk1pc3Npb25MZXZlbCB7XHJcbiAgICAvKirlhbPljaHmlbBpZCAqL1xyXG4gICAgcHVibGljIExldmVsSWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlhbPljaHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBMZXZlbFR5cGVzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq56ug6IqCICovXHJcbiAgICBwdWJsaWMgQ2hhcHRlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWwj+WFs+e8luWPtyAqL1xyXG4gICAgcHVibGljIExldmVsTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoqeOi9tCAqL1xyXG4gICAgcHVibGljIFBvc1g6bnVtYmVyID0gMCA7XHJcbiAgICAvKip56L20ICovXHJcbiAgICBwdWJsaWMgUG9zWTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqueJqee7hOmFjee9riAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJHcm91cENvbmZpZ3VyZTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuacgOWkp+azouasoSAqL1xyXG4gICAgcHVibGljIE1heFdhdmU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrmva7ms6LmrKEgKi9cclxuICAgIHB1YmxpYyBNb25zdGVyVGlkZVdhdmU6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmr4/ms6Lml7bpl7Tpl7TpmpQgKi9cclxuICAgIHB1YmxpYyBUaW1lSW50ZXJ2YWw6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmgKrniannrYnnuqcgKi9cclxuICAgIHB1YmxpYyBNb25zdGVyTGV2ZWw6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirooYDph4/ns7vmlbAgKi9cclxuICAgIHB1YmxpYyBIcENvZWZmaWNpZW50Om51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6YeR5biB5oC75pWw6YePICovXHJcbiAgICBwdWJsaWMgUGFzc1Jld2FyZF9Db2luOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5o6o6I2Q5oiY5YqbICovXHJcbiAgICBwdWJsaWMgUmVjb21tZW5kZWRDb21iYXRQb3dlcjpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1pc3Npb25MZXZlbE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNaXNzaW9uTGV2ZWxNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbk1pc3Npb25MZXZlbD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TWlzc2lvbkxldmVsTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IE1pc3Npb25MZXZlbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignTWlzc2lvbkxldmVsJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbk1pc3Npb25MZXZlbOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25NaXNzaW9uTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkxldmVsSWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25NaXNzaW9uTGV2ZWwoaWQ6bnVtYmVyKTpKc29uTWlzc2lvbkxldmVsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluWFs+WNoeexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldExldmVsVHlwZXMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTGV2ZWxUeXBlcztcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W56ug6IqCICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5blsI/lhbPnvJblj7cgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+WeOi9tCAqL1xyXG4gICAgcHVibGljIGdldFBvc1goaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUG9zWDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+Weei9tCAqL1xyXG4gICAgcHVibGljIGdldFBvc1koaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUG9zWTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5oCq54mp57uE6YWN572uICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3Rlckdyb3VwQ29uZmlndXJlKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3Rlckdyb3VwQ29uZmlndXJlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmnIDlpKfms6LmrKEgKi9cclxuICAgIHB1YmxpYyBnZXRNYXhXYXZlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1heFdhdmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaAqua9ruazouasoSAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJUaWRlV2F2ZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJUaWRlV2F2ZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5q+P5rOi5pe26Ze06Ze06ZqUICovXHJcbiAgICBwdWJsaWMgZ2V0VGltZUludGVydmFsKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGltZUludGVydmFsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmgKrniannrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyTGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluihgOmHj+ezu+aVsCAqL1xyXG4gICAgcHVibGljIGdldEhwQ29lZmZpY2llbnQoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5IcENvZWZmaWNpZW50O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bph5HluIHmgLvmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzUmV3YXJkX0NvaW4oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUGFzc1Jld2FyZF9Db2luO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmjqjojZDmiJjlipsgKi9cclxuICAgIHB1YmxpYyBnZXRSZWNvbW1lbmRlZENvbWJhdFBvd2VyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJlY29tbWVuZGVkQ29tYmF0UG93ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlhbPljaHmlbBpZCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heExldmVsSWQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA2O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKuagueaNruWFs+WNoeaVsOWSjOazouaVsOiOt+W+l+S4gOS4qmlkICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldElkKGxldmVsOm51bWJlcix3YXZlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAxMDAwMCpsZXZlbCt3YXZlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qE5YWz5Y2h5pWwKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TGV2ZWwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAyNTU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbDojrflvpfor6XlhbPljaHnmoTmgLvms6LmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRXYXZlTnVtQnlMZXZlbChsZXZlbDpudW1iZXIpOm51bWJlclxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IG51bT10aGlzLmdldE1vbnN0ZXJHcm91cENvbmZpZ3VyZShsZXZlbCkubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5YWz5Y2h5ZCN5a2XICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxOYW1lKGxldmVsOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENoYXB0ZXIobGV2ZWwpKyctJyt0aGlzLmdldExldmVsTnVtKGxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlnZDmoIcgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxQb3NYWShpZDpudW1iZXIpOmNjLlZlYzIge1xyXG4gICAgICAgIGxldCBwb3M9bmV3IGNjLlZlYzIodGhpcy5nZXRQb3NYKGlkKSx0aGlzLmdldFBvc1koaWQpKVxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpdsZXZlbOeahOWFs+WNoeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEZpZ2h0aW5nSW5mbyhsZXZlbDpudW1iZXIpOkZpZ2h0aW5nSW5mb1xyXG4gICAge1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25NaXNzaW9uTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEzMDAwNykrJyAnK3RoaXMuZ2V0TGV2ZWxOYW1lKGxldmVsKTtcclxuICAgICAgICAvL+iDjOaZr+WbvueJh+WQjeensCAgICBcclxuICAgICAgICBsZXQgYmdJbmRleD0odGhpcy5nZXRDaGFwdGVyKGxldmVsKSUxMSk7XHJcbiAgICAgICAgbGV0IGJnTmFtZT0nYmcvYmcnK2JnSW5kZXg7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YWxsX25hbWU9YmdOYW1lKydfd2FsbCc7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfdHlwZXM9anNvbkRhdGEuTW9uc3RlclRpZGVXYXZlO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YXZlX3JlZnJlc2hfdGltZT1qc29uRGF0YS5UaW1lSW50ZXJ2YWw7XHJcbiAgICAgICAgLy/mgKrniankv6Hmga/liJfooahcclxuICAgICAgICBsZXQgbW9uc3RlckRhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBtb25zdGVyR3JvdXBzPWpzb25EYXRhLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgICAgICBsZXQgTUdDPU1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyR3JvdXBzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGxldCBncm91cElkPW1vbnN0ZXJHcm91cHNbaV07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtb25zdGVySnNvbkRhdGE9TUdDLmdldEpzb25Nb25zdGVyR3JvdXBDb25maWd1cmUoZ3JvdXBJZClcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJJZC5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVNb25zdGVyRGF0YT1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5pZD1tb25zdGVySnNvbkRhdGEuTW9uc3RlcklkW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5udW09bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJOdW1bbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLnJlZnJlc2hfdGltZT1tb25zdGVySnNvbkRhdGEuUmVmcmVzaEludGVydmFsW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5sZXZlbD1qc29uRGF0YS5Nb25zdGVyTGV2ZWxbaV07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmhwX3JhdGU9anNvbkRhdGEuSHBDb2VmZmljaWVudFtpXTtcclxuICAgICAgICAgICAgICAgIGRhdGFBcnIucHVzaCh0YWJsZU1vbnN0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bSs9dGFibGVNb25zdGVyRGF0YS5udW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9uc3RlckRhdGFzLnB1c2goZGF0YUFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby5tb25zdGVyX2RhdGFzPW1vbnN0ZXJEYXRhcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS4u+e6v+WFs+WNoS1cIitsZXZlbCk7XHJcbiAgICAgICAgcmV0dXJuIGZpZ2h0aW5nSW5mbztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldExldmVsUG9zKGxldmVsOm51bWJlcik6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25NaXNzaW9uTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBwb3M9Y2MudjIoanNvbkRhdGEuUG9zWCxqc29uRGF0YS5Qb3NZKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNruS4gOS4quaImOWKm++8jOiOt+W+l+WFs+WNoeaVsCAqL1xyXG4gICAgcHVibGljIGdldExldmVsQnlaaGFubGkoemhhbmxpOm51bWJlcix0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBsZXZlbD0xO1xyXG4gICAgICAgIC8v5pCc57Si5YWz5Y2hXHJcbiAgICAgICAgbGV0IG1pbk9mZnNldFpoYW5saT16aGFubGk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgoanNvbkRhdGEsa2V5KT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlPT1qc29uRGF0YS5MZXZlbFR5cGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJaaGFubGk9anNvbkRhdGEuUmVjb21tZW5kZWRDb21iYXRQb3dlcjtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRaTD1NYXRoLmFicyhjdXJaaGFubGktemhhbmxpKTtcclxuICAgICAgICAgICAgICAgIGlmKG9mZnNldFpMPG1pbk9mZnNldFpoYW5saSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluT2Zmc2V0WmhhbmxpPW9mZnNldFpMO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsPWtleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h6I635Y+W5b2T5YmN5YWz5Y2h5a+55bqU55qE56ug6IqC55qE5pyA5ZCO5LiA5YWz5YWz5Y2h5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0TGFzdExldmVsKGxldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBsYXN0TGV2ZWw9MTtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeeroOiKglxyXG4gICAgICAgIGxldCBjaGFwdGVyPXRoaXMuZ2V0Q2hhcHRlcihsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1jaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgIGxhc3RMZXZlbD12LkxldmVsTnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbGFzdExldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56ug6IqC6I635Y+W5b2T5YmN56ug6IqC5a+55bqU55qE5YWz5Y2h55qE5pyA5ZCO5LiA5YWzICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlckxldmVsKGNoYXB0ZXI6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IExldmVsSWQ9MTtcclxuICAgICAgICAvL+iOt+WPluS4juS8oOi/h+adpeeroOiKguS4gOagt+eahOWFs+WNoVxyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuQ2hhcHRlcj09Y2hhcHRlcil7XHJcbiAgICAgICAgICAgICAgICBMZXZlbElkPXYuTGV2ZWxJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICByZXR1cm4gTGV2ZWxJZDtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPlkpzb27nmoTplb/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxMZW5ndGgoKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBwb3M9dGhpcy5kYXRhLnNpemVcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W6L+Z5Liq56ug6IqC55qE6ZW/5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkxldmVsY2hhcHRlckxlbmd0aChudW1iZXIpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aD0wXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgbGVuZ3RoKz0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W6L+Z5Liq56ug6IqC5LmL5YmN56ug6IqC55qE5YWo6YOo6ZW/5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkxldmVsY2hhcHRlcndob2xlTGVuZ3RoKG51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVuZ3RoPTBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMTspIHtcclxuICAgICAgICAgICAgbnVtYmVyLS1cclxuICAgICAgICAgICAgaWYobnVtYmVyPT0wKXtcclxuICAgICAgICAgICAgICAgIG51bWJlci0tXHJcbiAgICAgICAgICAgICAgICBpbmRleD0yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtYmVyPj0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGgrPTFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVjaygpe1xyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12Lk1vbnN0ZXJHcm91cENvbmZpZ3VyZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoVwiK2srJ+aAqueJqee7hOmFjee9rumVv+W6puaYr++8micrdi5Nb25zdGVyR3JvdXBDb25maWd1cmUubGVuZ3RoK1wiLOacgOWkp+mVv+W6pu+8mlwiK3YuTWF4V2F2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12LlRpbWVJbnRlcnZhbC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoVwiK2srJ+aXtumXtOmXtOmalOmVv+W6puaYr++8micrdi5UaW1lSW50ZXJ2YWwubGVuZ3RoK1wiLOacgOWkp+mVv+W6pu+8mlwiK3YuTWF4V2F2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12LkhwQ29lZmZpY2llbnQubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLlhbPljaFcIitrKyfooYDph4/ns7vmlbDmmK/vvJonK3YuSHBDb2VmZmljaWVudC5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih2Lk1heFdhdmUhPXYuTW9uc3RlckxldmVsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5YWz5Y2hXCIraysn562J57qn6ZW/5bqm5piv77yaJyt2Lk1vbnN0ZXJMZXZlbC5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlckdyb3VwQ29uZmlndXJlPXYuTW9uc3Rlckdyb3VwQ29uZmlndXJlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyR3JvdXBDb25maWd1cmUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwSWQ9bW9uc3Rlckdyb3VwQ29uZmlndXJlW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25NR0M9TW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3JvdXBDb25maWd1cmUoZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICBpZighanNvbk1HQyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqee7hOmFjee9rmlk5LiN5a2Y5Zyo77yaXCIrZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWtmOWcqO+8jOafpeaJvui/meS4quaAqueJqee7hOmFjee9ruaYr+WQpuaciemXrumimFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGpzb25NR0MuTW9uc3RlcklkLmxlbmd0aCE9anNvbk1HQy5Nb25zdGVyTnVtLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmgKrniannu4TphY3nva5pZOWSjOaAqueJqeaVsOmHj+WtmOWcqOmVv+W6puS4jeS4gOiHtO+8mlwiK2dyb3VwSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihqc29uTUdDLk1vbnN0ZXJJZC5sZW5ndGghPWpzb25NR0MuUmVmcmVzaEludGVydmFsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmgKrniannu4TphY3nva5pZOWSjOWIt+aWsOaXtumXtOWtmOWcqOmVv+W6puS4jeS4gOiHtO+8mlwiK2dyb3VwSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWtmOWcqO+8jOafpeaJvuaAqueJqeaYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyQXJyPWpzb25NR0MuTW9uc3RlcklkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgbT0wOyBtPG1vbnN0ZXJBcnIubGVuZ3RoOyBtKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcklkPW1vbnN0ZXJBcnJbbV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uTW9uc3Rlcj1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFqc29uTW9uc3Rlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5oCq54mpaWTkuI3lrZjlnKjvvJpcIittb25zdGVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mn6Xmib7nrYnnuqfmmK/lkKblrZjlnKhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbD12Lk1vbnN0ZXJMZXZlbFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRiSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKG1vbnN0ZXJJZCxsZXZlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uQXR0Yj1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0YklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFqc29uQXR0Yil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqeWxnuaAp2lk5LiN5a2Y5Zyo77yaXCIrYXR0YklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5qOA5p+l5oqA6IO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBzPTE7IHM8PWpzb25Nb25zdGVyLlNraWxsTnVtOyBzKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2tpbGxJZD1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQoanNvbk1vbnN0ZXIuTW9uc3RlcklkLHMsanNvbkF0dGIuU2tpbGxMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBza2lsbEpzb249TW9uc3RlclNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyU2tpbGwoc2tpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFza2lsbEpzb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqWlk77yaXCIrbW9uc3RlcklkK1wi5oqA6IO9aWTkuI3lrZjlnKjvvJpcIitza2lsbElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBpZihpc0hhdmU9PWZhbHNlKXtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLlhbPljaHmo4DmtYvpgJrov4cs5rKh6Zeu6aKYIVwiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/mgKrniannu4TphY3nva7mo4DmtYtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19