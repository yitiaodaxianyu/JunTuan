
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/BossChallenge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEJvc3NDaGFsbGVuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1FO0FBQ25FLDBDQUE0QztBQUM1QyxzREFBeUQ7QUFDekQsc0RBQXFEO0FBQ3JELG9FQUErRDtBQUMvRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELHdDQUFtQztBQUNuQyxpREFBZ0Q7QUFHaEQsSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3JCLHFEQUFRLENBQUE7SUFDUixpREFBTSxDQUFBO0lBQ04sbURBQU8sQ0FBQTtBQUNYLENBQUMsRUFKVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUl4QjtBQUNEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFVBQVU7UUFDSCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO0lBQ3BDLENBQUM7SUFBRCx3QkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksOENBQWlCO0FBaUI5QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUErQixJQUFJLENBQUM7UUFDeEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBd0V4Qyx5QkFBeUI7UUFFekIsdUJBQWtCLEdBQWUsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN0RCxjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLHNCQUFpQixHQUFZLElBQUksQ0FBQztJQW9HdEMsQ0FBQztJQTlLaUIsZ0NBQVcsR0FBekI7UUFDSSxJQUFH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LElBQUksRUFBQyxFQUFFO1lBQ1AsR0FBRyxFQUFDLEdBQUc7WUFDUCxLQUFLLEVBQUMsR0FBRztTQUNaLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsTGMsOEJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBbUwxRCwyQkFBQztDQXBMRCxBQW9MQyxJQUFBO0FBcExZLG9EQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNYW5hZ2VyLCBBY2Nlc3NOYW1lIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaWdodGluZ0luZm8gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFRhYmxlTW9uc3RlckRhdGEgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcbmltcG9ydCBCb3NzR2FtZVVpIGZyb20gXCIuL0Jvc3NHYW1lVWlcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENoYWxsZW5nZU1vZGV7XHJcbiAgICBOb2FtYWw9MSxcclxuICAgIEhhcmQ9MixcclxuICAgIFdvcmxkPTMsXHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25Cb3NzQ2hhbGxlbmdlIHtcclxuICAgIC8qKuaMkeaImElEICovXHJcbiAgICBwdWJsaWMgQ2hhbGxlbmdlSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirova7mjaLpobrluo8gKi9cclxuICAgIHB1YmxpYyBSb3RhdGlvbk9yZGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Zi25q61ICovXHJcbiAgICBwdWJsaWMgU3RhZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrnialJRCAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaJv+S8pOS4iumZkCAqL1xyXG4gICAgcHVibGljIEluanVyeUxpbWl0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgTW9uc3RlckxldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq56ug6IqC5Zy65pmvICovXHJcbiAgICBwdWJsaWMgQ2hhcHRlclNjZW5lOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9zc0NoYWxsZW5nZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBCb3NzQ2hhbGxlbmdlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Cb3NzQ2hhbGxlbmdlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpCb3NzQ2hhbGxlbmdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0Jvc3NDaGFsbGVuZ2UnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQm9zc0NoYWxsZW5nZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Cb3NzQ2hhbGxlbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5DaGFsbGVuZ2VJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkJvc3NDaGFsbGVuZ2UoaWQ6bnVtYmVyKTpKc29uQm9zc0NoYWxsZW5nZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oyR5oiYSUTojrflj5bova7mjaLpobrluo8gKi9cclxuICAgIHB1YmxpYyBnZXRSb3RhdGlvbk9yZGVyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvdGF0aW9uT3JkZXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mjJHmiJhJROiOt+WPlumYtuautSAqL1xyXG4gICAgcHVibGljIGdldFN0YWdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YWdlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oyR5oiYSUTojrflj5bmgKrnialJRCAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJJZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVySWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mjJHmiJhJROiOt+WPluaJv+S8pOS4iumZkCAqL1xyXG4gICAgcHVibGljIGdldEluanVyeUxpbWl0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkluanVyeUxpbWl0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oyR5oiYSUTojrflj5bmgKrniannrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oyR5oiYSUTojrflj5bnq6DoioLlnLrmma8gKi9cclxuICAgIHB1YmxpYyBnZXRDaGFwdGVyU2NlbmUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ2hhcHRlclNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5oyR5oiYSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDaGFsbGVuZ2VJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEwMDQ3O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGN1cl9jaGFsbGVuZ2VfbW9kZTpDaGFsbGVuZ2VNb2RlPUNoYWxsZW5nZU1vZGUuTm9hbWFsO1xyXG4gICAgY3VyX3Njb3JlOm51bWJlcj0wO1xyXG4gICAgYm9zc19jaGFsbGVuZ2VfdHM6Qm9zc0dhbWVVaT1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SWQobW9kZTpDaGFsbGVuZ2VNb2RlLHJld2FyZExldmVsOm51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTAwMCptb2RlK3Jld2FyZExldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l2xldmVs55qE5YWz5Y2h5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0RmlnaHRpbmdJbmZvKG1vZGU6Q2hhbGxlbmdlTW9kZSk6RmlnaHRpbmdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKyvojrflj5blhbPljaHmlbDmja5cIiwpXHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbz1uZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgLy9MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgwKStcclxuICAgICAgICBmaWdodGluZ0luZm8udGl0bGVfbmFtZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MjAwMDEpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IG1kPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgbGV0IGRhdGFBcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXIgPSBVc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIvLzEvL+i9ruaNoumhuuW6j1xyXG4gICAgICAgIGxldCBTdGFnZSA9IDEvL+mYtuautVxyXG4gICAgICAgIGxldCBDaGFsbGVuZ2VJRCA9IFJvdGF0aW9uT3JkZXIgKiAxMDAwICsgU3RhZ2UvL+aMkeaImElEXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/og4zmma/lm77niYflkI3np7AgICAgXHJcbiAgICAgICAgbGV0IGJnSW5kZXg9IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlclNjZW5lKENoYWxsZW5nZUlEKSsxO1xyXG4gICAgICAgIGxldCBiZ05hbWU9J2JnL2JnJytiZ0luZGV4O1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YWxsX25hbWU9YmdOYW1lKydfd2FsbCc7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bT0xO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YXZlX3R5cGVzPVswXTtcclxuICAgICAgICBmaWdodGluZ0luZm8ud2F2ZV9yZWZyZXNoX3RpbWU9WzBdO1xyXG4gICAgICAgIC8v5oCq54mp5L+h5oGv5YiX6KGoXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAvLyB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgIC8vICAgICBpZihtb2RlPT0xKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhQXJyPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBpPTE7IGk8PTE7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG1kPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbWQuaWQ9di5Nb25zdGVySWQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbWQubnVtPTE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbWQubGV2ZWw9di5Nb25zdGVyTGV2ZWw7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YUFyci5wdXNoKG1kKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBmaWdodGluZ0luZm8udG90YWxfbW9uc3Rlcl9udW0rPTE7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBtb25zdGVyRGF0YXMucHVzaChkYXRhQXJyKTtcclxuICAgICAgICAvLyAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIG1kLmlkPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcklkKENoYWxsZW5nZUlEKS8v5oCq54mpaWQvL3YuTW9uc3RlcklkO1xyXG4gICAgICAgIG1kLm51bT0xO1xyXG4gICAgICAgIG1kLmxldmVsPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckxldmVsKENoYWxsZW5nZUlEKS8vdi5Nb25zdGVyTGV2ZWw7XHJcbiAgICAgICAgZGF0YUFyci5wdXNoKG1kKTtcclxuICAgICAgICBmaWdodGluZ0luZm8udG90YWxfbW9uc3Rlcl9udW0rPTE7XHJcbiAgICAgICAgbW9uc3RlckRhdGFzLnB1c2goZGF0YUFycik7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLm1vbnN0ZXJfZGF0YXM9bW9uc3RlckRhdGFzO1xyXG4gICAgICAgIHJldHVybiBmaWdodGluZ0luZm87XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2NvcmUoc2NvcmU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdGhpcy5jdXJfc2NvcmUrPXNjb3JlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvc3NfY2hhbGxlbmdlX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Byb2dyZXNzKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvc3NfY2hhbGxlbmdlX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldEJvc3NDaGFsbGVuZ2VTdGFnZShtb2RlOkNoYWxsZW5nZU1vZGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlU3RhZ2UrbW9kZSwtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUJvc3NDaGFsbGVuZ2VTdGFnZShtb2RlOkNoYWxsZW5nZU1vZGUsbnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYobnVtPnRoaXMuZ2V0Qm9zc0NoYWxsZW5nZVN0YWdlKG1vZGUpKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVN0YWdlK21vZGUsbnVtKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzZXREYW1hZ2VOdW1iZXIoZGFtYWdlTnVtYmVyOm51bWJlcil7Ly/lpoLmnpzkvKTlrrPmlbDmr5TkuYvliY3nmoTkvKTlrrPmlbDlpJogICBzIOaUvui/m+S8pOWus+aVsFxyXG4gICAgICAgIGlmKGRhbWFnZU51bWJlcj50aGlzLmdldE1heERhbWFnZU51bWJlcigpKXtcclxuICAgICAgICAgICAgdGhpcy5zYXZlRGFtYWdlTnVtYmVyKGRhbWFnZU51bWJlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNhdmVEYW1hZ2VOdW1iZXIoZGFtYWdlTnVtYmVyKXsvL+aUvui/m+S8pOWus+aVsFxyXG4gICAgICAgIFVzZXJJbmZvLmdldEluc3RhbmNlKCkuZGFtYWdlTnVtYmVyPWRhbWFnZU51bWJlclxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mbyx0aGlzLnNldENvcHlEYW1hZ2VOdW1iZXJKc29uU3RyaW5nKGRhbWFnZU51bWJlcikpO1xyXG4gICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZU1heCxkYW1hZ2VOdW1iZXIpO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF4RGFtYWdlTnVtYmVyKCk6bnVtYmVyey8v546w5Zyo55qE5Lyk5a6z5pWwXHJcbiAgICAgICAgbGV0IGRhbWFnZT1Vc2VySW5mby5nZXRJbnN0YW5jZSgpLmRhbWFnZU51bWJlcjtcclxuICAgICAgICByZXR1cm4gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldENvcHlEYW1hZ2VOdW1iZXJKc29uU3RyaW5nKGRhbWFnZU51bWJlcjpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IG51bT1kYW1hZ2VOdW1iZXI7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdHlwZToxMCxcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6bnVtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==