
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXE1pc3Npb25MZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsMENBQXFEO0FBQ3JELG9FQUErRDtBQUMvRCwrRUFBcUY7QUFDckYscUVBQTJFO0FBRTNFLG1GQUF5RjtBQUN6Riw2REFBbUU7QUFFbkU7SUFBQTtRQUNJLFVBQVU7UUFDVixPQUFFLEdBQVEsS0FBSyxDQUFDO1FBQ2hCLFVBQVU7UUFDVixRQUFHLEdBQVEsQ0FBQyxDQUFDO1FBQ2IsVUFBVTtRQUNWLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixZQUFZO1FBQ1osWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFZO1FBQ1osaUJBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSw0Q0FBZ0I7QUFlN0I7SUFBQTtRQUNJLFdBQVc7UUFDSixZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFdBQVc7UUFDSiwwQkFBcUIsR0FBWSxFQUFFLENBQUU7UUFDNUMsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILG9CQUFlLEdBQVksRUFBRSxDQUFFO1FBQ3RDLFlBQVk7UUFDTCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsaUJBQVksR0FBWSxFQUFFLENBQUU7UUFDbkMsVUFB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QUM7d0NBQ3BELE1BQU0sR0FBQyxJQUFJLENBQUM7cUNBQ2Y7aUNBQ0o7NkJBRUo7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osU0FBUztJQUViLENBQUM7SUFuVWMsNkJBQVMsR0FBd0IsSUFBSSxDQUFDO0lBb1V6RCwwQkFBQztDQXJVRCxBQXFVQyxJQUFBO0FBclVZLGtEQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlnaHRpbmdJbmZvLCBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3JvdXBDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyU2tpbGxNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyU2tpbGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZU1vbnN0ZXJEYXRhe1xyXG4gICAgLyoq5oCq54mpaWQgKi9cclxuICAgIGlkOm51bWJlcj01MDAxMDtcclxuICAgIC8qKuaAqueJqeaVsOmHjyAqL1xyXG4gICAgbnVtOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBsZXZlbDpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqWhw57O75pWwICovXHJcbiAgICBocF9yYXRlOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp5Yi35paw6Ze06ZqUICovXHJcbiAgICByZWZyZXNoX3RpbWU6bnVtYmVyPTA7XHJcbiAgICAvKirmgKrnianliIbmlbDvvIjmtLvliqjmqKHlvI/kuJPnlKjvvIkgKi9cclxuICAgIHNjb3JlOm51bWJlcj0xMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW9uTGV2ZWwge1xyXG4gICAgLyoq5YWz5Y2h5pWwaWQgKi9cclxuICAgIHB1YmxpYyBMZXZlbElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5YWz5Y2h57G75Z6LICovXHJcbiAgICBwdWJsaWMgTGV2ZWxUeXBlczpudW1iZXIgPSAwIDtcclxuICAgIC8qKueroOiKgiAqL1xyXG4gICAgcHVibGljIENoYXB0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsI/lhbPnvJblj7cgKi9cclxuICAgIHB1YmxpYyBMZXZlbE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKnjovbQgKi9cclxuICAgIHB1YmxpYyBQb3NYOm51bWJlciA9IDAgO1xyXG4gICAgLyoqeei9tCAqL1xyXG4gICAgcHVibGljIFBvc1k6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrniannu4TphY3nva4gKi9cclxuICAgIHB1YmxpYyBNb25zdGVyR3JvdXBDb25maWd1cmU6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmnIDlpKfms6LmrKEgKi9cclxuICAgIHB1YmxpYyBNYXhXYXZlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq5r2u5rOi5qyhICovXHJcbiAgICBwdWJsaWMgTW9uc3RlclRpZGVXYXZlOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5q+P5rOi5pe26Ze06Ze06ZqUICovXHJcbiAgICBwdWJsaWMgVGltZUludGVydmFsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgTW9uc3RlckxldmVsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgSHBDb2VmZmljaWVudDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKumHkeW4geaAu+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFBhc3NSZXdhcmRfQ29pbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaOqOiNkOaImOWKmyAqL1xyXG4gICAgcHVibGljIFJlY29tbWVuZGVkQ29tYmF0UG93ZXI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWlzc2lvbkxldmVsTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25NaXNzaW9uTGV2ZWw+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOk1pc3Npb25MZXZlbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBNaXNzaW9uTGV2ZWxNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01pc3Npb25MZXZlbCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25NaXNzaW9uTGV2ZWzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uTWlzc2lvbkxldmVsKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5MZXZlbElkLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTWlzc2lvbkxldmVsKGlkOm51bWJlcik6SnNvbk1pc3Npb25MZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5blhbPljaHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbFR5cGVzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsVHlwZXM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlueroOiKgiAqL1xyXG4gICAgcHVibGljIGdldENoYXB0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ2hhcHRlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5bCP5YWz57yW5Y+3ICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTGV2ZWxOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlnjovbQgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NYKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBvc1g7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlnnovbQgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NZKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBvc1k7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaAqueJqee7hOmFjee9riAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJHcm91cENvbmZpZ3VyZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5pyA5aSn5rOi5qyhICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4V2F2ZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5NYXhXYXZlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmgKrmva7ms6LmrKEgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyVGlkZVdhdmUoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIGdldFRpbWVJbnRlcnZhbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRpbWVJbnRlcnZhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlckxldmVsKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5booYDph4/ns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRIcENvZWZmaWNpZW50KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSHBDb2VmZmljaWVudDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W6YeR5biB5oC75pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0UGFzc1Jld2FyZF9Db2luKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NSZXdhcmRfQ29pbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5o6o6I2Q5oiY5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tZW5kZWRDb21iYXRQb3dlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZWNvbW1lbmRlZENvbWJhdFBvd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5YWz5Y2h5pWwaWQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhMZXZlbElkKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKirmoLnmja7lhbPljaHmlbDlkozms6LmlbDojrflvpfkuIDkuKppZCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJZChsZXZlbDpudW1iZXIsd2F2ZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gMTAwMDAqbGV2ZWwrd2F2ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahOWFs+WNoeaVsCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heExldmVsKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjU1O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWw6I635b6X6K+l5YWz5Y2h55qE5oC75rOi5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0V2F2ZU51bUJ5TGV2ZWwobGV2ZWw6bnVtYmVyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBudW09dGhpcy5nZXRNb25zdGVyR3JvdXBDb25maWd1cmUobGV2ZWwpLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluWFs+WNoeWQjeWtlyAqL1xyXG4gICAgcHVibGljIGdldExldmVsTmFtZShsZXZlbDpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGFwdGVyKGxldmVsKStcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWdkOaghyAqL1xyXG4gICAgcHVibGljIGdldEpzb25MZXZlbFBvc1hZKGlkOm51bWJlcik6Y2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcz1uZXcgY2MuVmVjMih0aGlzLmdldFBvc1goaWQpLHRoaXMuZ2V0UG9zWShpZCkpXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l2xldmVs55qE5YWz5Y2h5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0RmlnaHRpbmdJbmZvKGxldmVsOm51bWJlcik6RmlnaHRpbmdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPXRoaXMuZ2V0SnNvbk1pc3Npb25MZXZlbChsZXZlbCk7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbz1uZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLnRpdGxlX25hbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDA3KSsnICcrdGhpcy5nZXRMZXZlbE5hbWUobGV2ZWwpO1xyXG4gICAgICAgIC8v6IOM5pmv5Zu+54mH5ZCN56ewICAgIFxyXG4gICAgICAgIGxldCBiZ0luZGV4PSh0aGlzLmdldENoYXB0ZXIobGV2ZWwpJTExKTtcclxuICAgICAgICBsZXQgYmdOYW1lPSdiZy9iZycrYmdJbmRleDtcclxuICAgICAgICBmaWdodGluZ0luZm8uYmdfbmFtZT1iZ05hbWU7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhbGxfbmFtZT1iZ05hbWUrJ193YWxsJztcclxuICAgICAgICBmaWdodGluZ0luZm8ud2F2ZV90eXBlcz1qc29uRGF0YS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfcmVmcmVzaF90aW1lPWpzb25EYXRhLlRpbWVJbnRlcnZhbDtcclxuICAgICAgICAvL+aAqueJqeS/oeaBr+WIl+ihqFxyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJHcm91cHM9anNvbkRhdGEuTW9uc3Rlckdyb3VwQ29uZmlndXJlO1xyXG4gICAgICAgIGxldCBNR0M9TW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJHcm91cHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycj1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgbGV0IGdyb3VwSWQ9bW9uc3Rlckdyb3Vwc1tpXTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJKc29uRGF0YT1NR0MuZ2V0SnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZShncm91cElkKVxyXG4gICAgICAgICAgICBmb3IobGV0IG49MDsgbjxtb25zdGVySnNvbkRhdGEuTW9uc3RlcklkLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YWJsZU1vbnN0ZXJEYXRhPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmlkPW1vbnN0ZXJKc29uRGF0YS5Nb25zdGVySWRbbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLm51bT1tb25zdGVySnNvbkRhdGEuTW9uc3Rlck51bVtuXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEucmVmcmVzaF90aW1lPW1vbnN0ZXJKc29uRGF0YS5SZWZyZXNoSW50ZXJ2YWxbbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmxldmVsPWpzb25EYXRhLk1vbnN0ZXJMZXZlbFtpXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEuaHBfcmF0ZT1qc29uRGF0YS5IcENvZWZmaWNpZW50W2ldO1xyXG4gICAgICAgICAgICAgICAgZGF0YUFyci5wdXNoKHRhYmxlTW9uc3RlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvLnRvdGFsX21vbnN0ZXJfbnVtKz10YWJsZU1vbnN0ZXJEYXRhLm51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb25zdGVyRGF0YXMucHVzaChkYXRhQXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLm1vbnN0ZXJfZGF0YXM9bW9uc3RlckRhdGFzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Li757q/5YWz5Y2hLVwiK2xldmVsKTtcclxuICAgICAgICByZXR1cm4gZmlnaHRpbmdJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxQb3MobGV2ZWw6bnVtYmVyKTpjYy5WZWMyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPXRoaXMuZ2V0SnNvbk1pc3Npb25MZXZlbChsZXZlbCk7XHJcbiAgICAgICAgbGV0IHBvcz1jYy52Mihqc29uRGF0YS5Qb3NYLGpzb25EYXRhLlBvc1kpO1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2u5LiA5Liq5oiY5Yqb77yM6I635b6X5YWz5Y2h5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxCeVpoYW5saSh6aGFubGk6bnVtYmVyLHR5cGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGxldmVsPTE7XHJcbiAgICAgICAgLy/mkJzntKLlhbPljaFcclxuICAgICAgICBsZXQgbWluT2Zmc2V0WmhhbmxpPXpoYW5saTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChqc29uRGF0YSxrZXkpPT57XHJcbiAgICAgICAgICAgIGlmKHR5cGU9PWpzb25EYXRhLkxldmVsVHlwZXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clpoYW5saT1qc29uRGF0YS5SZWNvbW1lbmRlZENvbWJhdFBvd2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFpMPU1hdGguYWJzKGN1clpoYW5saS16aGFubGkpO1xyXG4gICAgICAgICAgICAgICAgaWYob2Zmc2V0Wkw8bWluT2Zmc2V0WmhhbmxpKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5PZmZzZXRaaGFubGk9b2Zmc2V0Wkw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw9a2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHojrflj5blvZPliY3lhbPljaHlr7nlupTnmoTnq6DoioLnmoTmnIDlkI7kuIDlhbPlhbPljaHmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRMYXN0TGV2ZWwobGV2ZWw6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGxhc3RMZXZlbD0xO1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN56ug6IqCXHJcbiAgICAgICAgbGV0IGNoYXB0ZXI9dGhpcy5nZXRDaGFwdGVyKGxldmVsKTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkNoYXB0ZXI9PWNoYXB0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGFzdExldmVsPXYuTGV2ZWxOdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBsYXN0TGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nq6DoioLojrflj5blvZPliY3nq6DoioLlr7nlupTnmoTlhbPljaHnmoTmnIDlkI7kuIDlhbMgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFwdGVyTGV2ZWwoY2hhcHRlcjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgTGV2ZWxJZD0xO1xyXG4gICAgICAgIC8v6I635Y+W5LiO5Lyg6L+H5p2l56ug6IqC5LiA5qC355qE5YWz5Y2hXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5DaGFwdGVyPT1jaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgIExldmVsSWQ9di5MZXZlbElkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7ICAgICAgIFxyXG4gICAgICAgIHJldHVybiBMZXZlbElkO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+WSnNvbueahOmVv+W6piAqL1xyXG4gICAgcHVibGljIGdldEpzb25MZXZlbExlbmd0aCgpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IHBvcz10aGlzLmRhdGEuc2l6ZVxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bov5nkuKrnq6DoioLnmoTplb/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxjaGFwdGVyTGVuZ3RoKG51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVuZ3RoPTBcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkNoYXB0ZXI9PW51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBsZW5ndGgrPTFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bov5nkuKrnq6DoioLkuYvliY3nq6DoioLnmoTlhajpg6jplb/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTGV2ZWxjaGFwdGVyd2hvbGVMZW5ndGgobnVtYmVyKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBsZW5ndGg9MFxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAxOykge1xyXG4gICAgICAgICAgICBudW1iZXItLVxyXG4gICAgICAgICAgICBpZihudW1iZXI9PTApe1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyLS1cclxuICAgICAgICAgICAgICAgIGluZGV4PTJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihudW1iZXI+PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih2LkNoYXB0ZXI9PW51bWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCs9MVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCl7XHJcbiAgICAgICAgbGV0IGlzSGF2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2Lk1heFdhdmUhPXYuTW9uc3Rlckdyb3VwQ29uZmlndXJlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5YWz5Y2hXCIraysn5oCq54mp57uE6YWN572u6ZW/5bqm5piv77yaJyt2Lk1vbnN0ZXJHcm91cENvbmZpZ3VyZS5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih2Lk1heFdhdmUhPXYuVGltZUludGVydmFsLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5YWz5Y2hXCIraysn5pe26Ze06Ze06ZqU6ZW/5bqm5piv77yaJyt2LlRpbWVJbnRlcnZhbC5sZW5ndGgrXCIs5pyA5aSn6ZW/5bqm77yaXCIrdi5NYXhXYXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih2Lk1heFdhdmUhPXYuSHBDb2VmZmljaWVudC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoVwiK2srJ+ihgOmHj+ezu+aVsOaYr++8micrdi5IcENvZWZmaWNpZW50Lmxlbmd0aCtcIizmnIDlpKfplb/luqbvvJpcIit2Lk1heFdhdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHYuTWF4V2F2ZSE9di5Nb25zdGVyTGV2ZWwubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLlhbPljaFcIitrKyfnrYnnuqfplb/luqbmmK/vvJonK3YuTW9uc3RlckxldmVsLmxlbmd0aCtcIizmnIDlpKfplb/luqbvvJpcIit2Lk1heFdhdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyR3JvdXBDb25maWd1cmU9di5Nb25zdGVyR3JvdXBDb25maWd1cmU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJHcm91cENvbmZpZ3VyZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBJZD1tb25zdGVyR3JvdXBDb25maWd1cmVbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbk1HQz1Nb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZShncm91cElkKTtcclxuICAgICAgICAgICAgICAgIGlmKCFqc29uTUdDKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5oCq54mp57uE6YWN572uaWTkuI3lrZjlnKjvvJpcIitncm91cElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo77yM5p+l5om+6L+Z5Liq5oCq54mp57uE6YWN572u5piv5ZCm5pyJ6Zeu6aKYXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoanNvbk1HQy5Nb25zdGVySWQubGVuZ3RoIT1qc29uTUdDLk1vbnN0ZXJOdW0ubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqee7hOmFjee9rmlk5ZKM5oCq54mp5pWw6YeP5a2Y5Zyo6ZW/5bqm5LiN5LiA6Ie077yaXCIrZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGpzb25NR0MuTW9uc3RlcklkLmxlbmd0aCE9anNvbk1HQy5SZWZyZXNoSW50ZXJ2YWwubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaAqueJqee7hOmFjee9rmlk5ZKM5Yi35paw5pe26Ze05a2Y5Zyo6ZW/5bqm5LiN5LiA6Ie077yaXCIrZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo77yM5p+l5om+5oCq54mp5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJBcnI9anNvbk1HQy5Nb25zdGVySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBtPTA7IG08bW9uc3RlckFyci5sZW5ndGg7IG0rKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVySWQ9bW9uc3RlckFyclttXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb25Nb25zdGVyPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobW9uc3RlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWpzb25Nb25zdGVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmgKrnialpZOS4jeWtmOWcqO+8mlwiK21vbnN0ZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+afpeaJvuetiee6p+aYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsPXYuTW9uc3RlckxldmVsW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGJJZD1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SWQobW9uc3RlcklkLGxldmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb25BdHRiPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyhhdHRiSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWpzb25BdHRiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5oCq54mp5bGe5oCnaWTkuI3lrZjlnKjvvJpcIithdHRiSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mo4Dmn6XmioDog71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHM9MTsgczw9anNvbk1vbnN0ZXIuU2tpbGxOdW07IHMrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBza2lsbElkPU1vbnN0ZXJTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChqc29uTW9uc3Rlci5Nb25zdGVySWQscyxqc29uQXR0Yi5Ta2lsbExldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsSnNvbj1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJTa2lsbChza2lsbElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNraWxsSnNvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5oCq54mpaWTvvJpcIittb25zdGVySWQrXCLmioDog71pZOS4jeWtmOWcqO+8mlwiK3NraWxsSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGlmKGlzSGF2ZT09ZmFsc2Upe1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWFs+WNoeajgOa1i+mAmui/hyzmsqHpl67popghXCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+aAqueJqee7hOmFjee9ruajgOa1i1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=