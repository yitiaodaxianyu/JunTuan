
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/EndlessLevels.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEVuZGxlc3NMZXZlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1FO0FBRW5FLDBDQUE0QztBQUM1QyxzREFBeUQ7QUFDekQsc0RBQXFEO0FBRXJELHFFQUEyRTtBQUMzRSxtRkFBeUY7QUFDekYsb0VBQStEO0FBRy9ELDBDQUFpRDtBQUNqRCx3Q0FBbUM7QUFDbkMsaURBQWdEO0FBR2hEO0lBQUE7UUFDSSxRQUFRO1FBQ0QsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixVQUFVO1FBQ0gscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFVBQVU7UUFDSCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsVUFBVTtRQUNILGVBQVUsR0FBWSxFQUFFLENBQUU7UUFDakMsVUFBVTtRQUNILGtCQUFhLEdBQVksRUFBRSxDQUFFO1FBQ3BDLFVBQVU7UUFDSCxvQkFBZSxHQUFZLEVBQUUsQ0FBRTtRQUN0QyxZQUFZO1FBQ0wsaUJBQVksR0FBWSxFQUFFLENBQUU7UUFDbkMsV0FBVztRQUNKLGtCQUFhLEdBQVksRUFBRSxDQUFFO1FBQ3BDLFdBQVc7UUFDSixpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxXQUFXO1FBQ0osdUJBQWtCLEdBQVksRUFBRSxDQUFFO0lBQzdDLENBQUM7SUFBRCx3QkFBQztBQUFELENBckJBLEFBcUJDLElBQUE7QUFyQlksOENBQWlCO0FBdUI5QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUErQixJQUFJLENBQUM7UUFDeEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBb0Z4Qyx5QkFBeUI7UUFFekIsa0JBQWEsR0FBUSxDQUFDLENBQUM7SUE2TDNCLENBQUM7SUFqUmlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUks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LCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCB7IEZpZ2h0aW5nSW5mbyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVGFibGVNb25zdGVyRGF0YSB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCwgeyBEaWdpdHMgfSBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuaW1wb3J0IFdhdmVEYXRhIGZyb20gXCIuLi9XYXZlRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25FbmRsZXNzTGV2ZWxzIHtcclxuICAgIC8qKuWbnuWQiCAqL1xyXG4gICAgcHVibGljIFJvdW5kOm51bWJlciA9IDAgO1xyXG4gICAgLyoq562J57qn5LiK6ZmQICovXHJcbiAgICBwdWJsaWMgTGV2ZWxMaW1pdF9VcHBlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuetiee6p+S4i+mZkCAqL1xyXG4gICAgcHVibGljIExldmVsTGltaXRfTG93ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrnianmlbDph48gKi9cclxuICAgIHB1YmxpYyBNb25zdGVyTnVtOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgSHBDb2VmZmljaWVudDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaAqua9ruazouasoSAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJUaWRlV2F2ZTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIFRpbWVJbnRlcnZhbDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaZrumAmuaAqmlkICovXHJcbiAgICBwdWJsaWMgTm9ybWFsTW9uc3RlcjpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKueyvuiLseaAqmlkICovXHJcbiAgICBwdWJsaWMgRWxpdGVNb25zdGVyOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq57K+6Iux5oCq5qaC546HICovXHJcbiAgICBwdWJsaWMgUHJvYmFiaWxpdHlPZkVsaXRlOm51bWJlcltdID0gW10gO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5kbGVzc0xldmVsc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFbmRsZXNzTGV2ZWxzTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25FbmRsZXNzTGV2ZWxzPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFbmRsZXNzTGV2ZWxzTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEVuZGxlc3NMZXZlbHNNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0VuZGxlc3NMZXZlbHMnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRW5kbGVzc0xldmVsc+aIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25FbmRsZXNzTGV2ZWxzKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Sb3VuZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkVuZGxlc3NMZXZlbHMoaWQ6bnVtYmVyKTpKc29uRW5kbGVzc0xldmVscyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Zue5ZCI6I635Y+W562J57qn5LiK6ZmQICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxMaW1pdF9VcHBlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbExpbWl0X1VwcGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Zue5ZCI6I635Y+W562J57qn5LiL6ZmQICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxMaW1pdF9Mb3dlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbExpbWl0X0xvd2VyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Zue5ZCI6I635Y+W5oCq54mp5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3Rlck51bShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lm57lkIjojrflj5booYDph4/ns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRIcENvZWZmaWNpZW50KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSHBDb2VmZmljaWVudDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbnuWQiOiOt+WPluaAqua9ruazouasoSAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJUaWRlV2F2ZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJUaWRlV2F2ZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbnuWQiOiOt+WPluavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIGdldFRpbWVJbnRlcnZhbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRpbWVJbnRlcnZhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbnuWQiOiOt+WPluaZrumAmuaAqmlkICovXHJcbiAgICBwdWJsaWMgZ2V0Tm9ybWFsTW9uc3RlcihpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk5vcm1hbE1vbnN0ZXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lm57lkIjojrflj5bnsr7oi7HmgKppZCAqL1xyXG4gICAgcHVibGljIGdldEVsaXRlTW9uc3RlcihpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkVsaXRlTW9uc3RlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbnuWQiOiOt+WPlueyvuiLseaAquamgueOhyAqL1xyXG4gICAgcHVibGljIGdldFByb2JhYmlsaXR5T2ZFbGl0ZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb2JhYmlsaXR5T2ZFbGl0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWbnuWQiCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJvdW5kKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gODU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZW5kbGVzc19zY29yZTpudW1iZXI9MDtcclxuXHJcbiAgICAvKirojrflvpflm57lkIjmlbDnmoTlhbPljaHmlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRGaWdodGluZ0luZm8ocm91bmQ6bnVtYmVyKTpGaWdodGluZ0luZm9cclxuICAgIHtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvPW5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAvL0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDApK1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAwMSk7XHJcbiAgICAgICAgLy/og4zmma/lm77niYflkI3np7AgICAgXHJcbiAgICAgICAgLy8gbGV0IGJnSW5kZXg9MjtcclxuICAgICAgICBsZXQgYmdOYW1lPVwiYmcvYmdfRW5kbGVzc1wiLy8nYmcvYmcnK2JnSW5kZXg7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YWxsX25hbWU9XCJiZy9iZzVfd2FsbFwiO1xyXG4gICAgICAgIC8v5oCq54mp5L+h5oGv5YiX6KGoXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9dGhpcy5nZXRKc29uRW5kbGVzc0xldmVscyhyb3VuZCk7XHJcbiAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICBmaWdodGluZ0luZm8ud2F2ZV90eXBlcz1qc29uRGF0YS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfcmVmcmVzaF90aW1lPWpzb25EYXRhLlRpbWVJbnRlcnZhbDtcclxuICAgICAgICAvL+W9k+WJjeWbnuWQiOeahOaAqueJqee7hFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb25EYXRhLk1vbnN0ZXJOdW0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycj1uZXcgQXJyYXkoKTsgXHJcbiAgICAgICAgICAgIC8v5q+P5rOi5oCq55qE5pWw6YePXHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyTnVtPWpzb25EYXRhLk1vbnN0ZXJOdW1baV07XHJcbiAgICAgICAgICAgIGxldCBkZWxheVRpbWU9KGpzb25EYXRhLlRpbWVJbnRlcnZhbFtpXS0yKS9tb25zdGVyTnVtO1xyXG4gICAgICAgICAgICBpZihkZWxheVRpbWU8MCl7XHJcbiAgICAgICAgICAgICAgICBkZWxheVRpbWU9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IG49MDsgbjxtb25zdGVyTnVtOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgLy/mr4/lj6rmgKrnianpg73opoHljZXni6zpmo/mnLpcclxuICAgICAgICAgICAgICAgIC8vMS7pmo/mnLrmgKrniannrYnnuqdcclxuICAgICAgICAgICAgICAgIGxldCB1c2VMZXZlbD1NeVRvb2wucmFuZG9tUmFuZ2VJbnQoanNvbkRhdGEuTGV2ZWxMaW1pdF9Mb3dlcixqc29uRGF0YS5MZXZlbExpbWl0X1VwcGVyLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8yLuaJvuWHuuWtmOWcqOivpeetiee6p+eahOaAqueJqeaxoEFcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyQXJyQT1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wOyB4PGpzb25EYXRhLk5vcm1hbE1vbnN0ZXIubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVySWRBPWpzb25EYXRhLk5vcm1hbE1vbnN0ZXJbeF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKG1vbnN0ZXJJZEEsdXNlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5bGe5oCn6KGo5piv5ZCm5YyF5ZCr6K+laWRcclxuICAgICAgICAgICAgICAgICAgICBpZihNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQXJyQS5wdXNoKG1vbnN0ZXJJZEEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5a2Y5Zyo6K+l562J57qn55qE57K+6Iux5rGgQVxyXG4gICAgICAgICAgICAgICAgbGV0IGVsaXRlQXJyQT1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wOyB4PGpzb25EYXRhLkVsaXRlTW9uc3Rlci5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsaXRlSWRBPWpzb25EYXRhLkVsaXRlTW9uc3Rlclt4XTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlJZD1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SWQoZWxpdGVJZEEsdXNlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5bGe5oCn6KGo5piv5ZCm5YyF5ZCr6K+laWRcclxuICAgICAgICAgICAgICAgICAgICBpZihNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGl0ZUFyckEucHVzaChlbGl0ZUlkQSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlckFyckEubGVuZ3RoPD0wICYmIGVsaXRlQXJyQS5sZW5ndGg8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5LiN5a2Y5Zyo562J57qn77yaXCIrdXNlTGV2ZWwpOztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vMy7lpoLmnpzlrZjlnKjnsr7oi7HmgKrvvIzliJnkvJjlhYjpmo/mnLrmmK/lkKbmnInnsr7oi7HmgKpcclxuICAgICAgICAgICAgICAgIGxldCBpc0hhdmVFbGl0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKGVsaXRlQXJyQS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZlRWxpdGU9TWF0aC5yYW5kb20oKTxqc29uRGF0YS5Qcm9iYWJpbGl0eU9mRWxpdGVbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlTW9uc3RlcklkPTA7XHJcbiAgICAgICAgICAgICAgICBpZihpc0hhdmVFbGl0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pmo/mnLrnsr7oi7HmgKpcclxuICAgICAgICAgICAgICAgICAgICB1c2VNb25zdGVySWQ9ZWxpdGVBcnJBW015VG9vbC5yYW5kb21SYW5nZUludCgwLGVsaXRlQXJyQS5sZW5ndGgpXTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py65pmu6YCa5oCqXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlTW9uc3RlcklkPW1vbnN0ZXJBcnJBW015VG9vbC5yYW5kb21SYW5nZUludCgwLG1vbnN0ZXJBcnJBLmxlbmd0aCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG1kPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBtZC5pZD11c2VNb25zdGVySWQ7XHJcbiAgICAgICAgICAgICAgICBtZC5udW09MTtcclxuICAgICAgICAgICAgICAgIG1kLmxldmVsPXVzZUxldmVsO1xyXG4gICAgICAgICAgICAgICAgbWQucmVmcmVzaF90aW1lPU1hdGgucmFuZG9tKCkqZGVsYXlUaW1lO1xyXG4gICAgICAgICAgICAgICAgZGF0YUFyci5wdXNoKG1kKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bSs9bWQubnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vbnN0ZXJEYXRhcy5wdXNoKGRhdGFBcnIpOyAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLm1vbnN0ZXJfZGF0YXM9bW9uc3RlckRhdGFzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBmaWdodGluZ0luZm87XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+W+l+WbnuWQiOaVsFxyXG4gICAgICogQHBhcmFtIHdhdmVOdW0g5rOi5pWwXHJcbiAgICAgKiBAcmV0dXJucyDlm57lkIjmlbBcclxuICAgICAqL1xyXG4gICAgZ2V0Um91bmQod2F2ZU51bTpudW1iZXIpOm51bWJlcnsvLzlcclxuICAgICAgICBsZXQgcm91bmQ9MTtcclxuICAgICAgICBsZXQgdG90YWxXYXZlPTA7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdG90YWxXYXZlKz12Lk1vbnN0ZXJOdW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZih0b3RhbFdhdmU8PXdhdmVOdW0pey8vMTY8OVxyXG4gICAgICAgICAgICAgICAgcm91bmQ9di5Sb3VuZDtcclxuICAgICAgICAgICAgICAgIHJvdW5kKz0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKHJvdW5kPkVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldE1heFJvdW5kKCkpe1xyXG4gICAgICAgICAgICByb3VuZD1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRNYXhSb3VuZCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Zue5ZCI5pWw77yaXCIscm91bmQpXHJcbiAgICAgICAgcmV0dXJuIHJvdW5kO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpfov5nkuKrlm57lkIjnmoTnrKzkuIDms6LnmoTms6LmlbBcclxuICAgICAqIEBwYXJhbSByb3VuZCDlm57lkIjmlbBcclxuICAgICAqIEByZXR1cm5zIOazouaVsFxyXG4gICAgICovXHJcbiAgICBnZXRXYXZlKHJvdW5kOm51bWJlcik6bnVtYmVyey8v56ysMTDms6IgICDov5Tlm57nrKznrKzkuozlm57lkIjnrKzkuIDms6I9OS0xXHJcbiAgICAgICAgbGV0IG15d2F2ZT0wO1xyXG4gICAgICAgIGxldCB0b3RhbFdhdmU9MDtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZihyb3VuZD5rKXtcclxuICAgICAgICAgICAgICAgIHRvdGFsV2F2ZSs9di5Nb25zdGVyTnVtLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIG15d2F2ZT10b3RhbFdhdmVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG15d2F2ZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHNldFdhdmUod2F2ZTpudW1iZXIpey8v5aaC5p6c5Zue5ZCI5pWw5q+U5LmL5YmN55qE5Zue5ZCI5pWw5aSaICAgcyDmlL7ov5vlm57lkIjmlbBcclxuICAgICAgICBpZih3YXZlPnRoaXMuZ2V0TWF4V2F2ZSgpKXtcclxuICAgICAgICAgICAgdGhpcy5zYXZlV2F2ZSh3YXZlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2F2ZVdhdmUod2F2ZSl7Ly/mlL7ov5vlm57lkIjmlbBcclxuICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLndhdmVOdW1iZXI9d2F2ZVxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mbyx0aGlzLnNldENvcHlXYXZlSnNvblN0cmluZyh3YXZlKSk7XHJcbiAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlTWF4LHdhdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF4V2F2ZSgpOm51bWJlcnsvL+eOsOWcqOeahOWbnuWQiOaVsFxyXG4gICAgICAgIGxldCBkYW1hZ2U9VXNlckluZm8uZ2V0SW5zdGFuY2UoKS53YXZlTnVtYmVyO1xyXG4gICAgICAgIHJldHVybiBkYW1hZ2VcclxuICAgIH1cclxuXHJcbiAgICAvKirmo4DmtYvooajmoLzmlbDmja4gKi9cclxuICAgIGNoZWNrKCl7XHJcbiAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAvL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsKDEyMyk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGpzb25EYXRhLGspPT57XHJcbiAgICAgICAgICAgIC8v5b2T5YmN5Zue5ZCI55qE5oCq54mp57uEXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb25EYXRhLk1vbnN0ZXJOdW0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy/mr4/ms6LmgKrnmoTmlbDph49cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgbGV2ZWw9anNvbkRhdGEuTGV2ZWxMaW1pdF9Mb3dlcjsgbGV2ZWw8PWpzb25EYXRhLkxldmVsTGltaXRfVXBwZXI7IGxldmVsKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyQXJyQT1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDsgeDxqc29uRGF0YS5Ob3JtYWxNb25zdGVyLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJJZEE9anNvbkRhdGEuTm9ybWFsTW9uc3Rlclt4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobW9uc3RlcklkQSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuS4jeWtmOWcqOaAqueJqWlkOlwiK21vbnN0ZXJJZEEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaUlkPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJZChtb25zdGVySWRBLGxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lsZ7mgKfooajmmK/lkKbljIXlkKvor6VpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckFyckEucHVzaChtb25zdGVySWRBKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WtmOWcqOivpeetiee6p+eahOeyvuiLseaxoEFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxpdGVBcnJBPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wOyB4PGpzb25EYXRhLkVsaXRlTW9uc3Rlci5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGl0ZUlkQT1qc29uRGF0YS5FbGl0ZU1vbnN0ZXJbeF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKGVsaXRlSWRBKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5LiN5a2Y5Zyo57K+6Iux5oCq54mpaWQ6XCIrZWxpdGVJZEEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaUlkPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJZChlbGl0ZUlkQSxsZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bGe5oCn6KGo5piv5ZCm5YyF5ZCr6K+laWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKGF0dHJpSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsaXRlQXJyQS5wdXNoKGVsaXRlSWRBKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyQXJyQS5sZW5ndGg8PTAgJiYgZWxpdGVBcnJBLmxlbmd0aDw9MCl7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLkuI3lrZjlnKjnrYnnuqfvvJpcIitsZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0Q29weVdhdmVKc29uU3RyaW5nKFdhdmU6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCBudW09V2F2ZTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOjksXHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIHZhbHVlOm51bSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=