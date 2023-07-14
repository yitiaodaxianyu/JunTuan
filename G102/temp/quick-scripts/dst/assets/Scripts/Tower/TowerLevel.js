
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4027c+77ftP5ICsTamubh6V', 'TowerLevel');
// Scripts/Tower/TowerLevel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowerLevelManager = exports.JsonTowerLevel = void 0;
var Constants_1 = require("../Constants");
var MissionLevel_1 = require("../Level/MissionLevel");
var LoadManager_1 = require("../Loading/LoadManager");
var MonsterGroupConfigure_1 = require("../Monster/Data/MonsterGroupConfigure");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TowerManager_1 = require("./TowerManager");
var JsonTowerLevel = /** @class */ (function () {
    function JsonTowerLevel() {
        /**层数 */
        this.Floor = 0;
        /**怪物组 */
        this.MonsterGroup = 0;
        /**怪物等级 */
        this.MonsterLevel = 0;
    }
    return JsonTowerLevel;
}());
exports.JsonTowerLevel = JsonTowerLevel;
var TowerLevelManager = /** @class */ (function () {
    function TowerLevelManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TowerLevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TowerLevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TowerLevelManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TowerLevelManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TowerLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTowerLevel成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTowerLevel();
                jsonData = json[i];
                _this.data.set(jsonData.Floor, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TowerLevelManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TowerLevelManager.prototype.getJsonTowerLevel = function (id) {
        return this.data.get(id);
    };
    /**根据层数获取怪物组 */
    TowerLevelManager.prototype.getMonsterGroup = function (id) {
        return this.data.get(id).MonsterGroup;
    };
    /**根据层数获取怪物等级 */
    TowerLevelManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /** 静态方法，获取最大的 层数*/
    TowerLevelManager.getMaxFloor = function () {
        return 480;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**获取当前挑战的信息----迷宫怪物信息/标题信息/背景图片名称 */
    TowerLevelManager.prototype.getFightingInfo = function (level) {
        var fightingInfo = new Constants_1.FightingInfo();
        //LanguageManager.getInstance().getStrByTextId(810001)+
        fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(810001) + TowerManager_1.default.getTowerLevel() + ' F';
        //背景图片名称    
        var bgIndex = 2;
        var bgName = 'bg/bg' + bgIndex;
        fightingInfo.bg_name = bgName;
        //怪物信息列表
        var monsterDatas = new Array();
        var dataArr = new Array();
        var jsonData = this.getJsonTowerLevel(level);
        var monsterJsonData = MonsterGroupConfigure_1.MonsterGroupConfigureManager.getInstance().getJsonMonsterGroupConfigure(jsonData.MonsterGroup);
        for (var n = 0; n < monsterJsonData.MonsterId.length; n++) {
            var tableMonsterData = new MissionLevel_1.TableMonsterData();
            tableMonsterData.id = monsterJsonData.MonsterId[n];
            tableMonsterData.num = monsterJsonData.MonsterNum[n];
            tableMonsterData.level = jsonData.MonsterLevel;
            dataArr.push(tableMonsterData);
            fightingInfo.total_monster_num += tableMonsterData.num;
        }
        monsterDatas.push(dataArr);
        fightingInfo.monster_datas = monsterDatas;
        return fightingInfo;
    };
    TowerLevelManager._instance = null;
    return TowerLevelManager;
}());
exports.TowerLevelManager = TowerLevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyTGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLHNEQUF5RDtBQUN6RCxzREFBcUQ7QUFDckQsK0VBQXFGO0FBQ3JGLG9FQUErRDtBQUMvRCwrQ0FBMEM7QUFFMUM7SUFBQTtRQUNJLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFNBQVM7UUFDRixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7SUFDcEMsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSx3Q0FBYztBQVMzQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUE0QixJQUFJLENBQUM7UUFDckMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBb0Y1QyxDQUFDO0lBbEZpQiw2QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELGdDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0Esb0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDdEYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFD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LENBQUMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9CLFlBQVksQ0FBQyxpQkFBaUIsSUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7U0FDeEQ7UUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxhQUFhLEdBQUMsWUFBWSxDQUFDO1FBQ3hDLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUF0RmMsMkJBQVMsR0FBc0IsSUFBSSxDQUFDO0lBdUZ2RCx3QkFBQztDQXhGRCxBQXdGQyxJQUFBO0FBeEZZLDhDQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZ2h0aW5nSW5mbyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVGFibGVNb25zdGVyRGF0YSB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyR3JvdXBDb25maWd1cmVcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi9Ub3dlck1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uVG93ZXJMZXZlbCB7XHJcbiAgICAvKirlsYLmlbAgKi9cclxuICAgIHB1YmxpYyBGbG9vcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqueJqee7hCAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJHcm91cDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqueJqeetiee6pyAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJMZXZlbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvd2VyTGV2ZWxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVG93ZXJMZXZlbE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uVG93ZXJMZXZlbD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VG93ZXJMZXZlbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBUb3dlckxldmVsTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdUb3dlckxldmVsJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblRvd2VyTGV2ZWzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uVG93ZXJMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuRmxvb3IsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Ub3dlckxldmVsKGlkOm51bWJlcik6SnNvblRvd2VyTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxguaVsOiOt+WPluaAqueJqee7hCAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJHcm91cChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyR3JvdXA7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsYLmlbDojrflj5bmgKrniannrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5bGC5pWwKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Rmxvb3IoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA0ODA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgLyoq6I635Y+W5b2T5YmN5oyR5oiY55qE5L+h5oGvLS0tLei/t+Wuq+aAqueJqeS/oeaBry/moIfpopjkv6Hmga8v6IOM5pmv5Zu+54mH5ZCN56ewICovXHJcbiAgICBnZXRGaWdodGluZ0luZm8obGV2ZWw6bnVtYmVyKTpGaWdodGluZ0luZm97XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbz1uZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgLy9MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MTAwMDEpK1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgxMDAwMSkrVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSsnIEYnO1xyXG4gICAgICAgIC8v6IOM5pmv5Zu+54mH5ZCN56ewICAgIFxyXG4gICAgICAgIGxldCBiZ0luZGV4PTI7XHJcbiAgICAgICAgbGV0IGJnTmFtZT0nYmcvYmcnK2JnSW5kZXg7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIC8v5oCq54mp5L+h5oGv5YiX6KGoXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgZGF0YUFycj1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9dGhpcy5nZXRKc29uVG93ZXJMZXZlbChsZXZlbCk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJKc29uRGF0YT1Nb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZShqc29uRGF0YS5Nb25zdGVyR3JvdXApO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPG1vbnN0ZXJKc29uRGF0YS5Nb25zdGVySWQubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICBsZXQgdGFibGVNb25zdGVyRGF0YT1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmlkPW1vbnN0ZXJKc29uRGF0YS5Nb25zdGVySWRbbl07XHJcbiAgICAgICAgICAgIHRhYmxlTW9uc3RlckRhdGEubnVtPW1vbnN0ZXJKc29uRGF0YS5Nb25zdGVyTnVtW25dO1xyXG4gICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmxldmVsPWpzb25EYXRhLk1vbnN0ZXJMZXZlbDtcclxuICAgICAgICAgICAgZGF0YUFyci5wdXNoKHRhYmxlTW9uc3RlckRhdGEpO1xyXG4gICAgICAgICAgICBmaWdodGluZ0luZm8udG90YWxfbW9uc3Rlcl9udW0rPXRhYmxlTW9uc3RlckRhdGEubnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb25zdGVyRGF0YXMucHVzaChkYXRhQXJyKTtcclxuICAgICAgICBmaWdodGluZ0luZm8ubW9uc3Rlcl9kYXRhcz1tb25zdGVyRGF0YXM7XHJcbiAgICAgICAgcmV0dXJuIGZpZ2h0aW5nSW5mbztcclxuICAgIH1cclxufVxyXG4iXX0=