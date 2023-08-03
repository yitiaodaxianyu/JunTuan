
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
        console.log("chapterid:" + id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXE1pc3Npb25MZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsMENBQXFEO0FBQ3JELG9FQUErRDtBQUMvRCwrRUFBcUY7QUFDckYscUVBQTJFO0FBRTNFLG1GQUF5RjtBQUN6Riw2REFBbUU7QUFFbkU7SUFBQTtRQUNJLFVBQVU7UUFDVixPQUFFLEdBQVEsS0FBSyxDQUFDO1FBQ2hCLFVBQVU7UUFDVixRQUFHLEdBQVEsQ0FBQyxDQUFDO1FBQ2IsVUFBVTtRQUNWLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixZQUFZO1FBQ1osWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFZO1FBQ1osaUJBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSw0Q0FBZ0I7QUFlN0I7SUFBQTtRQUNJLFdBQVc7UUFDSixZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFdBQVc7UUFDSiwwQkFBcUIsR0FBWSxFQUFFLENBQUU7UUFDNUMsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILG9CQUFlLEdBQVksRUFBRSxDQUFFO1FBQ3RDLFlBQVk7UUFDTCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsaUJBQVksR0FBWSxFQUFFLENBQUU7UUFDbkMsVUFB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QUFLLENBQUMsT0FBTyxHQUFDLFNBQVMsR0FBQyxVQUFVLEdBQUMsT0FBTyxDQUFDLENBQUM7d0NBQ3BELE1BQU0sR0FBQyxJQUFJLENBQUM7cUNBQ2Y7aUNBQ0o7NkJBRUo7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osU0FBUztJQUViLENBQUM7SUFyVWMsNkJBQVMsR0FBd0IsSUFBSSxDQUFDO0lBc1V6RCwwQkFBQztDQXZVRCxBQXVVQyxJQUFBO0FBdlVZLGtEQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlnaHRpbmdJbmZvLCBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3JvdXBDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyU2tpbGxNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyU2tpbGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZU1vbnN0ZXJEYXRhe1xyXG4gICAgLyoq5oCq54mpaWQgKi9cclxuICAgIGlkOm51bWJlcj01MDAxMDtcclxuICAgIC8qKuaAqueJqeaVsOmHjyAqL1xyXG4gICAgbnVtOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBsZXZlbDpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqWhw57O75pWwICovXHJcbiAgICBocF9yYXRlOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp5Yi35paw6Ze06ZqUICovXHJcbiAgICByZWZyZXNoX3RpbWU6bnVtYmVyPTA7XHJcbiAgICAvKirmgKrnianliIbmlbDvvIjmtLvliqjmqKHlvI/kuJPnlKjvvIkgKi9cclxuICAgIHNjb3JlOm51bWJlcj0xMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW9uTGV2ZWwge1xyXG4gICAgLyoq5YWz5Y2h5pWwaWQgKi9cclxuICAgIHB1YmxpYyBMZXZlbElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5YWz5Y2h57G75Z6LICovXHJcbiAgICBwdWJsaWMgTGV2ZWxUeXBlczpudW1iZXIgPSAwIDtcclxuICAgIC8qKueroOiKgiAqL1xyXG4gICAgcHVibGljIENoYXB0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsI/lhbPnvJblj7cgKi9cclxuICAgIHB1YmxpYyBMZXZlbE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKnjovbQgKi9cclxuICAgIHB1YmxpYyBQb3NYOm51bWJlciA9IDAgO1xyXG4gICAgLyoqeei9tCAqL1xyXG4gICAgcHVibGljIFBvc1k6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrniannu4TphY3nva4gKi9cclxuICAgIHB1YmxpYyBNb25zdGVyR3JvdXBDb25maWd1cmU6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmnIDlpKfms6LmrKEgKi9cclxuICAgIHB1YmxpYyBNYXhXYXZlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq5r2u5rOi5qyhICovXHJcbiAgICBwdWJsaWMgTW9uc3RlclRpZGVXYXZlOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5q+P5rOi5pe26Ze06Ze06ZqUICovXHJcbiAgICBwdWJsaWMgVGltZUludGVydmFsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgTW9uc3RlckxldmVsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgSHBDb2VmZmljaWVudDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKumHkeW4geaAu+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFBhc3NSZXdhcmRfQ29pbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaOqOiNkOaImOWKmyAqL1xyXG4gICAgcHVibGljIFJlY29tbWVuZGVkQ29tYmF0UG93ZXI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWlzc2lvbkxldmVsTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25NaXNzaW9uTGV2ZWw+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOk1pc3Npb25MZXZlbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBNaXNzaW9uTGV2ZWxNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01pc3Npb25MZXZlbCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25NaXNzaW9uTGV2ZWzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uTWlzc2lvbkxldmVsKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5MZXZlbElkLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTWlzc2lvbkxldmVsKGlkOm51bWJlcik6SnNvbk1pc3Npb25MZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5blhbPljaHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbFR5cGVzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsVHlwZXM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlueroOiKgiAqL1xyXG4gICAgcHVibGljIGdldENoYXB0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNoYXB0ZXJpZDpcIitpZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNoYXB0ZXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluWwj+WFs+e8luWPtyAqL1xyXG4gICAgcHVibGljIGdldExldmVsTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5Z46L20ICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zWChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qb3NYO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5Z56L20ICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zWShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qb3NZO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmgKrniannu4TphY3nva4gKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyR3JvdXBDb25maWd1cmUoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyR3JvdXBDb25maWd1cmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluacgOWkp+azouasoSAqL1xyXG4gICAgcHVibGljIGdldE1heFdhdmUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWF4V2F2ZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5oCq5r2u5rOi5qyhICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlclRpZGVXYXZlKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlclRpZGVXYXZlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmr4/ms6Lml7bpl7Tpl7TpmpQgKi9cclxuICAgIHB1YmxpYyBnZXRUaW1lSW50ZXJ2YWwoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5UaW1lSW50ZXJ2YWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaAqueJqeetiee6pyAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJMZXZlbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgZ2V0SHBDb2VmZmljaWVudChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhwQ29lZmZpY2llbnQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlumHkeW4geaAu+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NSZXdhcmRfQ29pbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzUmV3YXJkX0NvaW47XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaOqOiNkOaImOWKmyAqL1xyXG4gICAgcHVibGljIGdldFJlY29tbWVuZGVkQ29tYmF0UG93ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmVjb21tZW5kZWRDb21iYXRQb3dlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWFs+WNoeaVsGlkKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TGV2ZWxJZCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWw5ZKM5rOi5pWw6I635b6X5LiA5LiqaWQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SWQobGV2ZWw6bnVtYmVyLHdhdmU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDEwMDAwKmxldmVsK3dhdmU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoTlhbPljaHmlbAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhMZXZlbCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDI1NTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsOiOt+W+l+ivpeWFs+WNoeeahOaAu+azouaVsCAqL1xyXG4gICAgcHVibGljIGdldFdhdmVOdW1CeUxldmVsKGxldmVsOm51bWJlcik6bnVtYmVyXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0TW9uc3Rlckdyb3VwQ29uZmlndXJlKGxldmVsKS5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5blhbPljaHlkI3lrZcgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbE5hbWUobGV2ZWw6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hhcHRlcihsZXZlbCkrXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlnZDmoIcgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxQb3NYWShpZDpudW1iZXIpOmNjLlZlYzIge1xyXG4gICAgICAgIGxldCBwb3M9bmV3IGNjLlZlYzIodGhpcy5nZXRQb3NYKGlkKSx0aGlzLmdldFBvc1koaWQpKVxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpdsZXZlbOeahOWFs+WNoeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEZpZ2h0aW5nSW5mbyhsZXZlbDpudW1iZXIpOkZpZ2h0aW5nSW5mb1xyXG4gICAge1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25NaXNzaW9uTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEzMDAwNykrJyAnK3RoaXMuZ2V0TGV2ZWxOYW1lKGxldmVsKTtcclxuICAgICAgICAvL+iDjOaZr+WbvueJh+WQjeensCAgICBcclxuICAgICAgICBsZXQgYmdJbmRleD0odGhpcy5nZXRDaGFwdGVyKGxldmVsKSUxMSk7XHJcbiAgICAgICAgbGV0IGJnTmFtZT0nYmcvYmcnK2JnSW5kZXg7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YWxsX25hbWU9YmdOYW1lKydfd2FsbCc7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfdHlwZXM9anNvbkRhdGEuTW9uc3RlclRpZGVXYXZlO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YXZlX3JlZnJlc2hfdGltZT1qc29uRGF0YS5UaW1lSW50ZXJ2YWw7XHJcbiAgICAgICAgLy/mgKrniankv6Hmga/liJfooahcclxuICAgICAgICBsZXQgbW9uc3RlckRhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBtb25zdGVyR3JvdXBzPWpzb25EYXRhLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgICAgICBsZXQgTUdDPU1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyR3JvdXBzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGxldCBncm91cElkPW1vbnN0ZXJHcm91cHNbaV07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtb25zdGVySnNvbkRhdGE9TUdDLmdldEpzb25Nb25zdGVyR3JvdXBDb25maWd1cmUoZ3JvdXBJZClcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJJZC5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVNb25zdGVyRGF0YT1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5pZD1tb25zdGVySnNvbkRhdGEuTW9uc3RlcklkW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5udW09bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJOdW1bbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLnJlZnJlc2hfdGltZT1tb25zdGVySnNvbkRhdGEuUmVmcmVzaEludGVydmFsW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5sZXZlbD1qc29uRGF0YS5Nb25zdGVyTGV2ZWxbaV07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmhwX3JhdGU9anNvbkRhdGEuSHBDb2VmZmljaWVudFtpXTtcclxuICAgICAgICAgICAgICAgIGRhdGFBcnIucHVzaCh0YWJsZU1vbnN0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bSs9dGFibGVNb25zdGVyRGF0YS5udW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9uc3RlckRhdGFzLnB1c2goZGF0YUFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby5tb25zdGVyX2RhdGFzPW1vbnN0ZXJEYXRhcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS4u+e6v+WFs+WNoS1cIitsZXZlbCk7XHJcbiAgICAgICAgcmV0dXJuIGZpZ2h0aW5nSW5mbztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldExldmVsUG9zKGxldmVsOm51bWJlcik6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25NaXNzaW9uTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBwb3M9Y2MudjIoanNvbkRhdGEuUG9zWCxqc29uRGF0YS5Qb3NZKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNruS4gOS4quaImOWKm++8jOiOt+W+l+WFs+WNoeaVsCAqL1xyXG4gICAgcHVibGljIGdldExldmVsQnlaaGFubGkoemhhbmxpOm51bWJlcix0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBsZXZlbD0xO1xyXG4gICAgICAgIC8v5pCc57Si5YWz5Y2hXHJcbiAgICAgICAgbGV0IG1pbk9mZnNldFpoYW5saT16aGFubGk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgoanNvbkRhdGEsa2V5KT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlPT1qc29uRGF0YS5MZXZlbFR5cGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJaaGFubGk9anNvbkRhdGEuUmVjb21tZW5kZWRDb21iYXRQb3dlcjtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRaTD1NYXRoLmFicyhjdXJaaGFubGktemhhbmxpKTtcclxuICAgICAgICAgICAgICAgIGlmKG9mZnNldFpMPG1pbk9mZnNldFpoYW5saSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluT2Zmc2V0WmhhbmxpPW9mZnNldFpMO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsPWtleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h6I635Y+W5b2T5YmN5YWz5Y2h5a+55bqU55qE56ug6IqC55qE5pyA5ZCO5LiA5YWz5YWz5Y2h5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0TGFzdExldmVsKGxldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBsYXN0TGV2ZWw9MTtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeeroOiKglxyXG4gICAgICAgIGxldCBjaGFwdGVyPXRoaXMuZ2V0Q2hhcHRlcihsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1jaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgIGxhc3RMZXZlbD12LkxldmVsTnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbGFzdExldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56ug6IqC6I635Y+W5b2T5YmN56ug6IqC5a+55bqU55qE5YWz5Y2h55qE5pyA5ZCO5LiA5YWzICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlckxldmVsKGNoYXB0ZXI6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IExldmVsSWQ9MTtcclxuICAgICAgICAvL+iOt+WPluS4juS8oOi/h+adpeeroOiKguS4gOagt+eahOWFs+WNoVxyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuQ2hhcHRlcj09Y2hhcHRlcil7XHJcbiAgICAgICAgICAgICAgICBMZXZlbElkPXYuTGV2ZWxJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICByZXR1cm4gTGV2ZWxJZDtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPlkpzb27nmoTplb/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxMZW5ndGgoKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBwb3M9dGhpcy5kYXRhLnNpemVcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W6L+Z5Liq56ug6IqC55qE6ZW/5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkxldmVsY2hhcHRlckxlbmd0aChudW1iZXIpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aD0wXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgbGVuZ3RoKz0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W6L+Z5Liq56ug6IqC5LmL5YmN56ug6IqC55qE5YWo6YOo6ZW/5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkxldmVsY2hhcHRlcndob2xlTGVuZ3RoKG51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVuZ3RoPTBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMTspIHtcclxuICAgICAgICAgICAgbnVtYmVyLS1cclxuICAgICAgICAgICAgaWYobnVtYmVyPT0wKXtcclxuICAgICAgICAgICAgICAgIG51bWJlci0tXHJcbiAgICAgICAgICAgICAgICBpbmRleD0yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtYmVyPj0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGgrPTFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVjaygpe1xyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12Lk1vbnN0ZXJHcm91cENvbmZpZ3VyZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoVwiK2srJ+aAqueJqee7hOmFjee9rumVv+W6puaYr++8micrdi5Nb25zdGVyR3JvdXBDb25maWd1cmUubGVuZ3RoK1wiLOacgOWkp+mVv+W6pu+8mlwiK3YuTWF4V2F2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12LlRpbWVJbnRlcnZhbC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoVwiK2srJ+aXtumXtOmXtOmalOmVv+W6puaYr++8micrdi5UaW1lSW50ZXJ2YWwubGVuZ3RoK1wiLOacgOWkp+mVv+W6pu+8mlwiK3YuTWF4V2F2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodi5NYXhXYXZlIT12LkhwQ29lZmZpY2llbnQubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLlhbPljaFcIitrKyfooYDph4/ns7vmlbDmmK/vvJonK3YuSHBDb2VmZmljaWVudC5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih2Lk1heFdhdmUhPXYuTW9uc3RlckxldmVsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5YWz5Y2hXCIraysn562J57qn6ZW/5bqm5piv77yaJyt2Lk1vbnN0ZXJMZXZlbC5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlckdyb3VwQ29uZmlndXJlPXYuTW9uc3Rlckdyb3VwQ29uZmlndXJlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyR3JvdXBDb25maWd1cmUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwSWQ9bW9uc3Rlckdyb3VwQ29uZmlndXJlW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25NR0M9TW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3JvdXBDb25maWd1cmUoZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICBpZighanNvbk1HQyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqee7hOmFjee9rmlk5LiN5a2Y5Zyo77yaXCIrZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWtmOWcqO+8jOafpeaJvui/meS4quaAqueJqee7hOmFjee9ruaYr+WQpuaciemXrumimFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGpzb25NR0MuTW9uc3RlcklkLmxlbmd0aCE9anNvbk1HQy5Nb25zdGVyTnVtLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmgKrniannu4TphY3nva5pZOWSjOaAqueJqeaVsOmHj+WtmOWcqOmVv+W6puS4jeS4gOiHtO+8mlwiK2dyb3VwSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihqc29uTUdDLk1vbnN0ZXJJZC5sZW5ndGghPWpzb25NR0MuUmVmcmVzaEludGVydmFsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmgKrniannu4TphY3nva5pZOWSjOWIt+aWsOaXtumXtOWtmOWcqOmVv+W6puS4jeS4gOiHtO+8mlwiK2dyb3VwSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWtmOWcqO+8jOafpeaJvuaAqueJqeaYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyQXJyPWpzb25NR0MuTW9uc3RlcklkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgbT0wOyBtPG1vbnN0ZXJBcnIubGVuZ3RoOyBtKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcklkPW1vbnN0ZXJBcnJbbV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uTW9uc3Rlcj1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFqc29uTW9uc3Rlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5oCq54mpaWTkuI3lrZjlnKjvvJpcIittb25zdGVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mn6Xmib7nrYnnuqfmmK/lkKblrZjlnKhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbD12Lk1vbnN0ZXJMZXZlbFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRiSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKG1vbnN0ZXJJZCxsZXZlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uQXR0Yj1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0YklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFqc29uQXR0Yil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqeWxnuaAp2lk5LiN5a2Y5Zyo77yaXCIrYXR0YklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5qOA5p+l5oqA6IO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBzPTE7IHM8PWpzb25Nb25zdGVyLlNraWxsTnVtOyBzKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2tpbGxJZD1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQoanNvbk1vbnN0ZXIuTW9uc3RlcklkLHMsanNvbkF0dGIuU2tpbGxMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBza2lsbEpzb249TW9uc3RlclNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyU2tpbGwoc2tpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFza2lsbEpzb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqWlk77yaXCIrbW9uc3RlcklkK1wi5oqA6IO9aWTkuI3lrZjlnKjvvJpcIitza2lsbElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBpZihpc0hhdmU9PWZhbHNlKXtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLlhbPljaHmo4DmtYvpgJrov4cs5rKh6Zeu6aKYIVwiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/mgKrniannu4TphY3nva7mo4DmtYtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19