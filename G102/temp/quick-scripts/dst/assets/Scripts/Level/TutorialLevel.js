
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
        LoadManager_1.LoadManager.loadJson('TutorialLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTutorialLevel成功');
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
        var bgIndex = 10; //(this.getChapter(level)%11);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXFR1dG9yaWFsTGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLHNEQUFxRDtBQUNyRCwrRUFBcUY7QUFDckYsb0VBQStEO0FBQy9ELCtDQUF1RTtBQUV2RTtJQUFBO1FBQ0ksV0FBVztRQUNKLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsV0FBVztRQUNKLDBCQUFxQixHQUFZLEVBQUUsQ0FBRTtRQUM1QyxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsb0JBQWUsR0FBWSxFQUFFLENBQUU7UUFDdEMsWUFBWTtRQUNMLGlCQUFZLEdBQVksRUFBRSxDQUFFO1FBQ25DLFVBQVU7UUFDSCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsa0JBQWEsR0FBWSxFQUFFLENBQUU7UUFDcEMsV0FBVztRQUNKLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7SUFDOUMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQTdCWSw4Q0FBaUI7QUErQjlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE0STVDLENBQUM7SUExSWlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFB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QUUsQ0FBQyxHQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNqRCxJQUFJLGdCQUFnQixHQUFDLElBQUksK0JBQWdCLEVBQUUsQ0FBQztnQkFDNUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELGdCQUFnQixDQUFDLEdBQUcsR0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsZ0JBQWdCLENBQUMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELGdCQUFnQixDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9CLFlBQVksQ0FBQyxpQkFBaUIsSUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7YUFDeEQ7WUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsWUFBWSxDQUFDLGFBQWEsR0FBQyxZQUFZLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUMsS0FBSyxHQUFDLEtBQUssR0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQTlJYyw4QkFBUyxHQUF5QixJQUFJLENBQUM7SUErSTFELDJCQUFDO0NBaEpELEFBZ0pDLElBQUE7QUFoSlksb0RBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlnaHRpbmdJbmZvIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJHcm91cENvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyLCBUYWJsZU1vbnN0ZXJEYXRhIH0gZnJvbSBcIi4vTWlzc2lvbkxldmVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblR1dG9yaWFsTGV2ZWwge1xyXG4gICAgLyoq5YWz5Y2h5pWwaWQgKi9cclxuICAgIHB1YmxpYyBMZXZlbElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5YWz5Y2h57G75Z6LICovXHJcbiAgICBwdWJsaWMgTGV2ZWxUeXBlczpudW1iZXIgPSAwIDtcclxuICAgIC8qKueroOiKgiAqL1xyXG4gICAgcHVibGljIENoYXB0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsI/lhbPnvJblj7cgKi9cclxuICAgIHB1YmxpYyBMZXZlbE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKnjovbQgKi9cclxuICAgIHB1YmxpYyBQb3NYOm51bWJlciA9IDAgO1xyXG4gICAgLyoqeei9tCAqL1xyXG4gICAgcHVibGljIFBvc1k6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrniannu4TphY3nva4gKi9cclxuICAgIHB1YmxpYyBNb25zdGVyR3JvdXBDb25maWd1cmU6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmnIDlpKfms6LmrKEgKi9cclxuICAgIHB1YmxpYyBNYXhXYXZlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq5r2u5rOi5qyhICovXHJcbiAgICBwdWJsaWMgTW9uc3RlclRpZGVXYXZlOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5q+P5rOi5pe26Ze06Ze06ZqUICovXHJcbiAgICBwdWJsaWMgVGltZUludGVydmFsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgTW9uc3RlckxldmVsOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgSHBDb2VmZmljaWVudDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKumHkeW4geaAu+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFBhc3NSZXdhcmRfQ29pbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaOqOiNkOaImOWKmyAqL1xyXG4gICAgcHVibGljIFJlY29tbWVuZGVkQ29tYmF0UG93ZXI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUdXRvcmlhbExldmVsTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblR1dG9yaWFsTGV2ZWw+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlR1dG9yaWFsTGV2ZWxNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVHV0b3JpYWxMZXZlbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignVHV0b3JpYWxMZXZlbCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25UdXRvcmlhbExldmVs5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblR1dG9yaWFsTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkxldmVsSWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25UdXRvcmlhbExldmVsKGlkOm51bWJlcik6SnNvblR1dG9yaWFsTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5YWz5Y2h57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxUeXBlcyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbFR5cGVzO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bnq6DoioIgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFwdGVyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNoYXB0ZXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluWwj+WFs+e8luWPtyAqL1xyXG4gICAgcHVibGljIGdldExldmVsTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5Z46L20ICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zWChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qb3NYO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5Z56L20ICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zWShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qb3NZO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmgKrniannu4TphY3nva4gKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyR3JvdXBDb25maWd1cmUoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyR3JvdXBDb25maWd1cmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluacgOWkp+azouasoSAqL1xyXG4gICAgcHVibGljIGdldE1heFdhdmUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWF4V2F2ZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W5oCq5r2u5rOi5qyhICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlclRpZGVXYXZlKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlclRpZGVXYXZlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2h5pWwaWTojrflj5bmr4/ms6Lml7bpl7Tpl7TpmpQgKi9cclxuICAgIHB1YmxpYyBnZXRUaW1lSW50ZXJ2YWwoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5UaW1lSW50ZXJ2YWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaAqueJqeetiee6pyAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJMZXZlbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoeaVsGlk6I635Y+W6KGA6YeP57O75pWwICovXHJcbiAgICBwdWJsaWMgZ2V0SHBDb2VmZmljaWVudChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhwQ29lZmZpY2llbnQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPlumHkeW4geaAu+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NSZXdhcmRfQ29pbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzUmV3YXJkX0NvaW47XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaHmlbBpZOiOt+WPluaOqOiNkOaImOWKmyAqL1xyXG4gICAgcHVibGljIGdldFJlY29tbWVuZGVkQ29tYmF0UG93ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmVjb21tZW5kZWRDb21iYXRQb3dlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWFs+WNoeaVsGlkKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TGV2ZWxJZCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKirojrflvpdsZXZlbOeahOWFs+WNoeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEZpZ2h0aW5nSW5mbyhsZXZlbDpudW1iZXIpOkZpZ2h0aW5nSW5mb1xyXG4gICAge1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25UdXRvcmlhbExldmVsKGxldmVsKTtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvPW5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICBcclxuICAgICAgICBmaWdodGluZ0luZm8udGl0bGVfbmFtZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMzAwMDcpKycgJytNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKGxldmVsKTtcclxuICAgICAgICAvL+iDjOaZr+WbvueJh+WQjeensCAgICBcclxuICAgICAgICBsZXQgYmdJbmRleD0xMC8vKHRoaXMuZ2V0Q2hhcHRlcihsZXZlbCklMTEpO1xyXG4gICAgICAgIGxldCBiZ05hbWU9J2JnL2JnJytiZ0luZGV4O1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby5iZ19uYW1lPWJnTmFtZTtcclxuICAgICAgICBmaWdodGluZ0luZm8ud2FsbF9uYW1lPWJnTmFtZSsnX3dhbGwnO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YXZlX3R5cGVzPWpzb25EYXRhLk1vbnN0ZXJUaWRlV2F2ZTtcclxuICAgICAgICBmaWdodGluZ0luZm8ud2F2ZV9yZWZyZXNoX3RpbWU9anNvbkRhdGEuVGltZUludGVydmFsO1xyXG4gICAgICAgIC8v5oCq54mp5L+h5oGv5YiX6KGoXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgbW9uc3Rlckdyb3Vwcz1qc29uRGF0YS5Nb25zdGVyR3JvdXBDb25maWd1cmU7XHJcbiAgICAgICAgbGV0IE1HQz1Nb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3Rlckdyb3Vwcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBJZD1tb25zdGVyR3JvdXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlckpzb25EYXRhPU1HQy5nZXRKc29uTW9uc3Rlckdyb3VwQ29uZmlndXJlKGdyb3VwSWQpXHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPG1vbnN0ZXJKc29uRGF0YS5Nb25zdGVySWQubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlTW9uc3RlckRhdGE9bmV3IFRhYmxlTW9uc3RlckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEuaWQ9bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJJZFtuXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEubnVtPW1vbnN0ZXJKc29uRGF0YS5Nb25zdGVyTnVtW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5yZWZyZXNoX3RpbWU9bW9uc3Rlckpzb25EYXRhLlJlZnJlc2hJbnRlcnZhbFtuXTtcclxuICAgICAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEubGV2ZWw9anNvbkRhdGEuTW9uc3RlckxldmVsW2ldO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5ocF9yYXRlPWpzb25EYXRhLkhwQ29lZmZpY2llbnRbaV07XHJcbiAgICAgICAgICAgICAgICBkYXRhQXJyLnB1c2godGFibGVNb25zdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm8udG90YWxfbW9uc3Rlcl9udW0rPXRhYmxlTW9uc3RlckRhdGEubnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vbnN0ZXJEYXRhcy5wdXNoKGRhdGFBcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaWdodGluZ0luZm8ubW9uc3Rlcl9kYXRhcz1tb25zdGVyRGF0YXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmlrDmiYvmlZnnqIvlhbPljaEtXCIrbGV2ZWwrXCLms6LmlbA6XCIrbW9uc3Rlckdyb3Vwcy5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBmaWdodGluZ0luZm87XHJcbiAgICB9XHJcbn1cclxuIl19