
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Level/TutorialLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab208po5IZPoaDGIFMQUgYj', 'TutorialLevel');
// Scripts/Level/TutorialLevel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialLevelManager = exports.JsonTutorialLevel = void 0;
var Constants_1 = require("../Constants");
var LoadManager_1 = require("../Loading/LoadManager");
var MonsterGroupConfigure_1 = require("../Monster/Data/MonsterGroupConfigure");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var MissionLevel_1 = require("./MissionLevel");
var JsonTutorialLevel = /** @class */ (function () {
    function JsonTutorialLevel() {
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
    return JsonTutorialLevel;
}());
exports.JsonTutorialLevel = JsonTutorialLevel;
var TutorialLevelManager = /** @class */ (function () {
    function TutorialLevelManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TutorialLevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TutorialLevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TutorialLevelManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TutorialLevelManager.prototype.loadJson = function () {
        var _this = this;
        // LoadManager.loadJson('TutorialLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
        //     if(error){
        //         console.log(error);
        //         return;
        //     }
        //     console.log('加载JsonTutorialLevel成功');
        //     this.data=new Map();
        //     let json=assets.json;
        //     for(let i=0; i<json.length; i++){
        //         let jsonData=new JsonTutorialLevel();
        //         jsonData=json[i];
        //         this.data.set(jsonData.LevelId,jsonData);
        //     }
        //     this.is_load_completed=true;
        // });
        LoadManager_1.LoadManager.loadJson('MissionLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMissionLevel成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTutorialLevel();
                jsonData = json[i];
                _this.data.set(jsonData.LevelId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TutorialLevelManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TutorialLevelManager.prototype.getJsonTutorialLevel = function (id) {
        return this.data.get(id);
    };
    /**根据关卡数id获取关卡类型 */
    TutorialLevelManager.prototype.getLevelTypes = function (id) {
        return this.data.get(id).LevelTypes;
    };
    /**根据关卡数id获取章节 */
    TutorialLevelManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据关卡数id获取小关编号 */
    TutorialLevelManager.prototype.getLevelNum = function (id) {
        return this.data.get(id).LevelNum;
    };
    /**根据关卡数id获取x轴 */
    TutorialLevelManager.prototype.getPosX = function (id) {
        return this.data.get(id).PosX;
    };
    /**根据关卡数id获取y轴 */
    TutorialLevelManager.prototype.getPosY = function (id) {
        return this.data.get(id).PosY;
    };
    /**根据关卡数id获取怪物组配置 */
    TutorialLevelManager.prototype.getMonsterGroupConfigure = function (id) {
        return this.data.get(id).MonsterGroupConfigure;
    };
    /**根据关卡数id获取最大波次 */
    TutorialLevelManager.prototype.getMaxWave = function (id) {
        return this.data.get(id).MaxWave;
    };
    /**根据关卡数id获取怪潮波次 */
    TutorialLevelManager.prototype.getMonsterTideWave = function (id) {
        return this.data.get(id).MonsterTideWave;
    };
    /**根据关卡数id获取每波时间间隔 */
    TutorialLevelManager.prototype.getTimeInterval = function (id) {
        return this.data.get(id).TimeInterval;
    };
    /**根据关卡数id获取怪物等级 */
    TutorialLevelManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /**根据关卡数id获取血量系数 */
    TutorialLevelManager.prototype.getHpCoefficient = function (id) {
        return this.data.get(id).HpCoefficient;
    };
    /**根据关卡数id获取金币总数量 */
    TutorialLevelManager.prototype.getPassReward_Coin = function (id) {
        return this.data.get(id).PassReward_Coin;
    };
    /**根据关卡数id获取推荐战力 */
    TutorialLevelManager.prototype.getRecommendedCombatPower = function (id) {
        return this.data.get(id).RecommendedCombatPower;
    };
    /** 静态方法，获取最大的 关卡数id*/
    TutorialLevelManager.getMaxLevelId = function () {
        return;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**获得level的关卡数据 */
    TutorialLevelManager.prototype.getFightingInfo = function (level) {
        var jsonData = this.getJsonTutorialLevel(level);
        var fightingInfo = new Constants_1.FightingInfo();
        fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(130007) + ' ' + MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level);
        //背景图片名称    
        var bgIndex = 1; //(this.getChapter(level)%11);
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
                var tableMonsterData = new MissionLevel_1.TableMonsterData();
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
        console.log("新手教程关卡-" + level + "波数:" + monsterGroups.length);
        return fightingInfo;
    };
    TutorialLevelManager._instance = null;
    return TutorialLevelManager;
}());
exports.TutorialLevelManager = TutorialLevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXFR1dG9yaWFsTGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLHNEQUFxRDtBQUNyRCwrRUFBcUY7QUFDckYsb0VBQStEO0FBQy9ELCtDQUF1RTtBQUV2RTtJQUFBO1FBQ0ksV0FBVztRQUNKLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsV0FBVztRQUNKLDBCQUFxQixHQUFZLEVBQUUsQ0FBRTtRQUM1QyxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsb0JBQWUsR0FBWSxFQUFFLENBQUU7UUFDdEMsWUFBWTtRQUNMLGlCQUFZLEdBQVksRUFBRSxDQUFFO1FBQ25DLFVBQVU7UUFDSCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsa0JBQWEsR0FBWSxFQUFFLENBQUU7UUFDcEMsV0FBVztRQUNKLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7SUFDOUMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQTdCWSw4Q0FBaUI7QUErQjlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUEySjVDLENBQUM7SUF6SmlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFB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LENBQUM7SUE3SmMsOEJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBOEoxRCwyQkFBQztDQS9KRCxBQStKQyxJQUFBO0FBL0pZLG9EQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZ2h0aW5nSW5mbyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3JvdXBDb25maWd1cmVcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciwgVGFibGVNb25zdGVyRGF0YSB9IGZyb20gXCIuL01pc3Npb25MZXZlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25UdXRvcmlhbExldmVsIHtcclxuICAgIC8qKuWFs+WNoeaVsGlkICovXHJcbiAgICBwdWJsaWMgTGV2ZWxJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWFs+WNoeexu+WeiyAqL1xyXG4gICAgcHVibGljIExldmVsVHlwZXM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnq6DoioIgKi9cclxuICAgIHB1YmxpYyBDaGFwdGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5bCP5YWz57yW5Y+3ICovXHJcbiAgICBwdWJsaWMgTGV2ZWxOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKip46L20ICovXHJcbiAgICBwdWJsaWMgUG9zWDpudW1iZXIgPSAwIDtcclxuICAgIC8qKnnovbQgKi9cclxuICAgIHB1YmxpYyBQb3NZOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mp57uE6YWN572uICovXHJcbiAgICBwdWJsaWMgTW9uc3Rlckdyb3VwQ29uZmlndXJlOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5pyA5aSn5rOi5qyhICovXHJcbiAgICBwdWJsaWMgTWF4V2F2ZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqua9ruazouasoSAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJUaWRlV2F2ZTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIFRpbWVJbnRlcnZhbDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaAqueJqeetiee6pyAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJMZXZlbDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuihgOmHj+ezu+aVsCAqL1xyXG4gICAgcHVibGljIEhwQ29lZmZpY2llbnQ6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirph5HluIHmgLvmlbDph48gKi9cclxuICAgIHB1YmxpYyBQYXNzUmV3YXJkX0NvaW46bnVtYmVyID0gMCA7XHJcbiAgICAvKirmjqjojZDmiJjlipsgKi9cclxuICAgIHB1YmxpYyBSZWNvbW1lbmRlZENvbWJhdFBvd2VyOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHV0b3JpYWxMZXZlbE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBUdXRvcmlhbExldmVsTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25UdXRvcmlhbExldmVsPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUdXRvcmlhbExldmVsTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgLy8gTG9hZE1hbmFnZXIubG9hZEpzb24oJ1R1dG9yaWFsTGV2ZWwnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAvLyAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uVHV0b3JpYWxMZXZlbOaIkOWKnycpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgIC8vICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25UdXRvcmlhbExldmVsKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5MZXZlbElkLGpzb25EYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01pc3Npb25MZXZlbCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25NaXNzaW9uTGV2ZWzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uVHV0b3JpYWxMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuTGV2ZWxJZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblR1dG9yaWFsTGV2ZWwoaWQ6bnVtYmVyKTpKc29uVHV0b3JpYWxMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5blhbPljaHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbFR5cGVzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsVHlwZXM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlueroOiKgiAqL1xyXG4gICAgcHVibGljIGdldENoYXB0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ2hhcHRlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5bCP5YWz57yW5Y+3ICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTGV2ZWxOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlnjovbQgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NYKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBvc1g7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlnnovbQgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NZKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBvc1k7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaAqueJqee7hOmFjee9riAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJHcm91cENvbmZpZ3VyZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5pyA5aSn5rOi5qyhICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4V2F2ZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5NYXhXYXZlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmgKrmva7ms6LmrKEgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyVGlkZVdhdmUoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIGdldFRpbWVJbnRlcnZhbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRpbWVJbnRlcnZhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlckxldmVsKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5booYDph4/ns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRIcENvZWZmaWNpZW50KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSHBDb2VmZmljaWVudDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W6YeR5biB5oC75pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0UGFzc1Jld2FyZF9Db2luKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NSZXdhcmRfQ29pbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5o6o6I2Q5oiY5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb21tZW5kZWRDb21iYXRQb3dlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZWNvbW1lbmRlZENvbWJhdFBvd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5YWz5Y2h5pWwaWQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhMZXZlbElkKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKuiOt+W+l2xldmVs55qE5YWz5Y2h5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0RmlnaHRpbmdJbmZvKGxldmVsOm51bWJlcik6RmlnaHRpbmdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPXRoaXMuZ2V0SnNvblR1dG9yaWFsTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEzMDAwNykrJyAnK01pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUobGV2ZWwpO1xyXG4gICAgICAgIC8v6IOM5pmv5Zu+54mH5ZCN56ewICAgIFxyXG4gICAgICAgIGxldCBiZ0luZGV4PTEvLyh0aGlzLmdldENoYXB0ZXIobGV2ZWwpJTExKTtcclxuICAgICAgICBsZXQgYmdOYW1lPSdiZy9iZycrYmdJbmRleDtcclxuICAgICAgICBmaWdodGluZ0luZm8uYmdfbmFtZT1iZ05hbWU7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhbGxfbmFtZT1iZ05hbWUrJ193YWxsJztcclxuICAgICAgICBmaWdodGluZ0luZm8ud2F2ZV90eXBlcz1qc29uRGF0YS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfcmVmcmVzaF90aW1lPWpzb25EYXRhLlRpbWVJbnRlcnZhbDtcclxuICAgICAgICAvL+aAqueJqeS/oeaBr+WIl+ihqFxyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJHcm91cHM9anNvbkRhdGEuTW9uc3Rlckdyb3VwQ29uZmlndXJlO1xyXG4gICAgICAgIGxldCBNR0M9TW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJHcm91cHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycj1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgbGV0IGdyb3VwSWQ9bW9uc3Rlckdyb3Vwc1tpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJKc29uRGF0YT1NR0MuZ2V0SnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZShncm91cElkKVxyXG4gICAgICAgICAgICBmb3IobGV0IG49MDsgbjxtb25zdGVySnNvbkRhdGEuTW9uc3RlcklkLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YWJsZU1vbnN0ZXJEYXRhPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmlkPW1vbnN0ZXJKc29uRGF0YS5Nb25zdGVySWRbbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLm51bT1tb25zdGVySnNvbkRhdGEuTW9uc3Rlck51bVtuXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEucmVmcmVzaF90aW1lPW1vbnN0ZXJKc29uRGF0YS5SZWZyZXNoSW50ZXJ2YWxbbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmxldmVsPWpzb25EYXRhLk1vbnN0ZXJMZXZlbFtpXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEuaHBfcmF0ZT1qc29uRGF0YS5IcENvZWZmaWNpZW50W2ldO1xyXG4gICAgICAgICAgICAgICAgZGF0YUFyci5wdXNoKHRhYmxlTW9uc3RlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvLnRvdGFsX21vbnN0ZXJfbnVtKz10YWJsZU1vbnN0ZXJEYXRhLm51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb25zdGVyRGF0YXMucHVzaChkYXRhQXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLm1vbnN0ZXJfZGF0YXM9bW9uc3RlckRhdGFzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5paw5omL5pWZ56iL5YWz5Y2hLVwiK2xldmVsK1wi5rOi5pWwOlwiK21vbnN0ZXJHcm91cHMubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gZmlnaHRpbmdJbmZvO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==