
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Level/LevelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '994cc5U3CxFJYNkAe/orWvb', 'LevelManager');
// Scripts/Level/LevelManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelManager = void 0;
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var FirstCompleteReward_1 = require("./FirstCompleteReward");
var MissionLevel_1 = require("./MissionLevel");
var OfflineRevenueShow_1 = require("./OfflineRevenueShow");
var TutorialLevel_1 = require("./TutorialLevel");
var LevelManager = /** @class */ (function () {
    function LevelManager() {
        this.best_level = 0;
        this.item_nums = [];
        this.is_need_strengthen = false;
        this.maininterfacemap = null;
        this.game_start_level = 0;
    }
    Object.defineProperty(LevelManager.prototype, "finish_level", {
        get: function () {
            return this.best_level;
        },
        set: function (level) {
            this.saveFinishLevel(level);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LevelManager.prototype, "start_level", {
        get: function () {
            var level = 0;
            level = this.game_start_level;
            return level;
        },
        set: function (level) {
            this.saveStartLevel(level);
        },
        enumerable: false,
        configurable: true
    });
    LevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    LevelManager.prototype.init = function () {
        // console.log("______________________")
        FirstCompleteReward_1.FirstCompleteRewardManager.getInstance();
        MissionLevel_1.MissionLevelManager.getInstance();
        OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance();
        this.loadSpmaininterfacemap();
        this.loadFinishLevel();
        this.loadStartLevel();
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            TutorialLevel_1.TutorialLevelManager.getInstance();
        }
    };
    //-----------------------资源的读取-----------------------------
    //-----------------------数据保存与读取-----------------------------
    LevelManager.prototype.loadFinishLevel = function () {
        var level = cc.sys.localStorage.getItem('finish_level');
        if (level === "" || level === null) {
            level = 0;
            this.saveFinishLevel(level);
        }
        else {
            if (level >= 1) {
                if (TutorailsManager_1.default.getInstance().is_finish_game == false) {
                    TutorailsManager_1.default.getInstance().saveFinishFromGame();
                }
            }
        }
        this.best_level = parseInt(level);
    };
    LevelManager.prototype.saveFinishLevel = function (level) {
        if (level > this.best_level && level <= MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            this.best_level = level;
            cc.sys.localStorage.setItem('finish_level', this.best_level);
        }
    };
    //
    LevelManager.prototype.loadStartLevel = function () {
        var level = cc.sys.localStorage.getItem('start_level');
        if (level === "" || level === null) {
            level = 1;
            this.saveStartLevel(level);
        }
        else {
        }
        this.game_start_level = parseInt(level);
    };
    LevelManager.prototype.saveStartLevel = function (level) {
        if (level <= 1) {
            level = 1;
        }
        else if (level > MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            level = MissionLevel_1.MissionLevelManager.getMaxLevel();
        }
        this.game_start_level = level;
        cc.sys.localStorage.setItem('start_level', this.game_start_level);
    };
    LevelManager.prototype.saveLevelWave = function (level, wave) {
        var waveNum = this.getLevelWave(level);
        if (wave > waveNum) {
            cc.sys.localStorage.setItem('level_wave_' + level, wave);
        }
    };
    LevelManager.prototype.getLevelWave = function (level) {
        var wave = cc.sys.localStorage.getItem('level_wave_' + level);
        if (wave === "" || wave === null) {
            wave = 0;
        }
        else {
            wave = parseInt(wave);
        }
        return wave;
    };
    LevelManager.prototype.getPassNum = function (level) {
        var num = cc.sys.localStorage.getItem('pass_level_' + level);
        if (num != "" && num != null) {
            num = parseInt(num);
        }
        else {
            num = 0;
        }
        return num;
    };
    LevelManager.prototype.setNotFirstPassLevel = function (level, wave) {
        cc.sys.localStorage.setItem('pass_level_' + level + 'wave_' + wave, 1);
    };
    /** 根据关卡获得一个关卡名称*/
    LevelManager.getLevelName = function (level) {
        return MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level);
    };
    LevelManager.prototype.getFinishChapter = function () {
        var level = this.finish_level + 1;
        level = level > MissionLevel_1.MissionLevelManager.getMaxLevel() ? MissionLevel_1.MissionLevelManager.getMaxLevel() : level;
        return MissionLevel_1.MissionLevelManager.getInstance().getChapter(level);
    };
    /**获得level关卡的所有星级，返回数组，1：第一个任务，2：第二个任务，3：第三个任务 */
    LevelManager.prototype.getAllLevelStars = function (level) {
        var stars = [false, false, false];
        var levelStars = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.LevelStar + level, stars);
        for (var i = 0; i < stars.length; i++) {
            stars[i] = levelStars[i] > 0;
        }
        return stars;
    };
    /**获得level关卡的starIndex的星级，返回是否有星星，1：第一个任务，2：第二个任务，3：第三个任务 */
    LevelManager.prototype.getALevelStar = function (level, starIndex) {
        var stars = [false, false, false];
        // console.log("_____",level,starIndex)
        var levelStars = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.LevelStar + level, stars);
        return levelStars[starIndex - 1] > 0;
    };
    /**保存level的星级数组 */
    LevelManager.prototype.saveAllLevelStars = function (level, newStars) {
        var stars = [false, false, false];
        var levelStars = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.LevelStar + level, stars);
        for (var i = 0; i < stars.length; i++) {
            if (levelStars[i] <= 0) {
                levelStars[i] = newStars[i] ? 1 : 0;
            }
        }
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.LevelStar + level, JSON.stringify(levelStars));
    };
    /**保存level的starIndex是否有星级 */
    LevelManager.prototype.saveALevelStar = function (level, starIndex, isHave) {
        if (isHave === void 0) { isHave = true; }
        var stars = [false, false, false];
        var levelStars = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.LevelStar + level, stars);
        if (levelStars[starIndex - 1] <= 0) {
            levelStars[starIndex - 1] = isHave ? 1 : 0;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.LevelStar + level, JSON.stringify(levelStars));
        }
    };
    LevelManager.prototype.loadSpmaininterfacemap = function () {
        var _this = this;
        if (this.maininterfacemap) {
            return;
        }
        this.maininterfacemap = new Map();
        WXManagerEX_1.default.getInstance().resourcesBundle.loadDir('map/maininterfacemap', cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var len = assets.length;
            for (var i = 0; i < len; i++) {
                var sp = assets[i];
                var name = sp.name;
                _this.maininterfacemap.set(name, sp);
            }
        });
    };
    LevelManager._instance = null;
    return LevelManager;
}());
exports.LevelManager = LevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXExldmVsTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBdUQ7QUFHdkQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCxrRUFBNkQ7QUFDN0QsNkRBQW1FO0FBQ25FLCtDQUFxRDtBQUNyRCwyREFBaUU7QUFDakUsaURBQXVEO0FBRXZEO0lBQUE7UUFJWSxlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBRTVCLGNBQVMsR0FBVSxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdBQVMsS0FBSyxDQUFDO1FBQzFCLHFCQUFnQixHQUE0QixJQUFJLENBQUM7UUFZaEQscUJBQWdCLEdBQVEsQ0FBQyxDQUFDO0lBOE10QyxDQUFDO0lBeE5HLHNCQUFJLHNDQUFZO2FBQWhCO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFpQixLQUFLO1lBRWxCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7O09BTEE7SUFTRCxzQkFBSSxxQ0FBVzthQUFmO1lBRUksSUFBSSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxHQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO2FBRUQsVUFBZ0IsS0FBSztZQUVqQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7OztPQUxBO0lBT2Esd0JBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFD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IiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0ZpcnN0Q29tcGxldGVSZXdhcmRcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyIH0gZnJvbSBcIi4vT2ZmbGluZVJldmVudWVTaG93XCI7XHJcbmltcG9ydCB7IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVHV0b3JpYWxMZXZlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMZXZlbE1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYmVzdF9sZXZlbDpudW1iZXI9MDtcclxuXHJcbiAgICBpdGVtX251bXM6bnVtYmVyW109W107XHJcbiAgICBpc19uZWVkX3N0cmVuZ3RoZW46Ym9vbGVhbj1mYWxzZTtcclxuICAgIHB1YmxpYyBtYWluaW50ZXJmYWNlbWFwOk1hcDxzdHJpbmcsY2MuU3ByaXRlRnJhbWU+PW51bGw7XHJcblxyXG4gICAgZ2V0IGZpbmlzaF9sZXZlbCgpOm51bWJlclxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVzdF9sZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZmluaXNoX2xldmVsKGxldmVsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2F2ZUZpbmlzaExldmVsKGxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVfc3RhcnRfbGV2ZWw6bnVtYmVyPTA7XHJcblxyXG4gICAgZ2V0IHN0YXJ0X2xldmVsKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsPTA7XHJcbiAgICAgICAgbGV2ZWw9dGhpcy5nYW1lX3N0YXJ0X2xldmVsO1xyXG4gICAgICAgIHJldHVybiBsZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc3RhcnRfbGV2ZWwobGV2ZWwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zYXZlU3RhcnRMZXZlbChsZXZlbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpMZXZlbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBMZXZlbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX19fX19fX19fX19fX19cIilcclxuICAgICAgICBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU3BtYWluaW50ZXJmYWNlbWFwKClcclxuICAgICAgICB0aGlzLmxvYWRGaW5pc2hMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubG9hZFN0YXJ0TGV2ZWwoKTtcclxuICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgVHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6LWE5rqQ55qE6K+75Y+WLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlbDmja7kv53lrZjkuI7or7vlj5YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGxvYWRGaW5pc2hMZXZlbCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmluaXNoX2xldmVsJyk7XHJcbiAgICAgICAgaWYobGV2ZWw9PT1cIlwiIHx8IGxldmVsPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldmVsPTA7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUZpbmlzaExldmVsKGxldmVsKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobGV2ZWw+PTEpe1xyXG4gICAgICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmVzdF9sZXZlbD1wYXJzZUludChsZXZlbCk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVGaW5pc2hMZXZlbChsZXZlbClcclxuICAgIHtcclxuICAgICAgICBpZihsZXZlbD50aGlzLmJlc3RfbGV2ZWwgJiYgbGV2ZWw8PU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVzdF9sZXZlbD1sZXZlbDtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaW5pc2hfbGV2ZWwnLHRoaXMuYmVzdF9sZXZlbCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9cclxuICAgIGxvYWRTdGFydExldmVsKClcclxuICAgIHtcclxuICAgICAgICBsZXQgbGV2ZWw9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGFydF9sZXZlbCcpO1xyXG4gICAgICAgIGlmKGxldmVsPT09XCJcIiB8fCBsZXZlbD09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXZlbD0xO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGFydExldmVsKGxldmVsKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZV9zdGFydF9sZXZlbD1wYXJzZUludChsZXZlbCk7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlU3RhcnRMZXZlbChsZXZlbClcclxuICAgIHtcclxuICAgICAgICBpZihsZXZlbDw9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldmVsPTE7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICBpZihsZXZlbD5NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZV9zdGFydF9sZXZlbD1sZXZlbDtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXJ0X2xldmVsJyx0aGlzLmdhbWVfc3RhcnRfbGV2ZWwpOyAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUxldmVsV2F2ZShsZXZlbDpudW1iZXIsd2F2ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHdhdmVOdW09dGhpcy5nZXRMZXZlbFdhdmUobGV2ZWwpO1xyXG4gICAgICAgIGlmKHdhdmU+d2F2ZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGV2ZWxfd2F2ZV8nK2xldmVsLHdhdmUpOyBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZXZlbFdhdmUobGV2ZWw6bnVtYmVyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgd2F2ZT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xldmVsX3dhdmVfJytsZXZlbCk7XHJcbiAgICAgICAgaWYod2F2ZT09PVwiXCIgfHwgd2F2ZT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YXZlPTA7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhdmU9cGFyc2VJbnQod2F2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3YXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhc3NOdW0obGV2ZWw6bnVtYmVyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFzc19sZXZlbF8nK2xldmVsKTtcclxuICAgICAgICBpZihudW0hPVwiXCImJm51bSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROb3RGaXJzdFBhc3NMZXZlbChsZXZlbDpudW1iZXIsd2F2ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYXNzX2xldmVsXycrbGV2ZWwrJ3dhdmVfJyt3YXZlLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmoLnmja7lhbPljaHojrflvpfkuIDkuKrlhbPljaHlkI3np7AqL1xyXG4gICAgc3RhdGljIGdldExldmVsTmFtZShsZXZlbDpudW1iZXIpOnN0cmluZ1xyXG4gICAgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZShsZXZlbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRGaW5pc2hDaGFwdGVyKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBsZXZlbD10aGlzLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgIGxldmVsPWxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKT9NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk6bGV2ZWw7XHJcbiAgICAgICAgcmV0dXJuIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpdsZXZlbOWFs+WNoeeahOaJgOacieaYn+e6p++8jOi/lOWbnuaVsOe7hO+8jDHvvJrnrKzkuIDkuKrku7vliqHvvIwy77ya56ys5LqM5Liq5Lu75Yqh77yMM++8muesrOS4ieS4quS7u+WKoSAqL1xyXG4gICAgZ2V0QWxsTGV2ZWxTdGFycyhsZXZlbDpudW1iZXIpOmJvb2xlYW5bXXtcclxuICAgICAgICBsZXQgc3RhcnM9W2ZhbHNlLGZhbHNlLGZhbHNlXTtcclxuICAgICAgICBsZXQgbGV2ZWxTdGFycz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb24oU3RvcmFnZUtleS5MZXZlbFN0YXIrbGV2ZWwsc3RhcnMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHN0YXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgc3RhcnNbaV09bGV2ZWxTdGFyc1tpXT4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhcnM7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpdsZXZlbOWFs+WNoeeahHN0YXJJbmRleOeahOaYn+e6p++8jOi/lOWbnuaYr+WQpuacieaYn+aYn++8jDHvvJrnrKzkuIDkuKrku7vliqHvvIwy77ya56ys5LqM5Liq5Lu75Yqh77yMM++8muesrOS4ieS4quS7u+WKoSAqL1xyXG4gICAgZ2V0QUxldmVsU3RhcihsZXZlbDpudW1iZXIsc3RhckluZGV4Om51bWJlcik6Ym9vbGVhbnsgICAgICAgIFxyXG4gICAgICAgIGxldCBzdGFycz1bZmFsc2UsZmFsc2UsZmFsc2VdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19cIixsZXZlbCxzdGFySW5kZXgpXHJcbiAgICAgICAgbGV0IGxldmVsU3RhcnM9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uKFN0b3JhZ2VLZXkuTGV2ZWxTdGFyK2xldmVsLHN0YXJzKTtcclxuICAgICAgICByZXR1cm4gbGV2ZWxTdGFyc1tzdGFySW5kZXgtMV0+MDtcclxuICAgIH1cclxuICAgIC8qKuS/neWtmGxldmVs55qE5pif57qn5pWw57uEICovXHJcbiAgICBzYXZlQWxsTGV2ZWxTdGFycyhsZXZlbDpudW1iZXIsbmV3U3RhcnM6Ym9vbGVhbltdKXtcclxuICAgICAgICBsZXQgc3RhcnM9W2ZhbHNlLGZhbHNlLGZhbHNlXTtcclxuICAgICAgICBsZXQgbGV2ZWxTdGFycz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb24oU3RvcmFnZUtleS5MZXZlbFN0YXIrbGV2ZWwsc3RhcnMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHN0YXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYobGV2ZWxTdGFyc1tpXTw9MCl7XHJcbiAgICAgICAgICAgICAgICBsZXZlbFN0YXJzW2ldPW5ld1N0YXJzW2ldPzE6MDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5MZXZlbFN0YXIrbGV2ZWwsSlNPTi5zdHJpbmdpZnkobGV2ZWxTdGFycykpO1xyXG4gICAgfVxyXG4gICAgLyoq5L+d5a2YbGV2ZWznmoRzdGFySW5kZXjmmK/lkKbmnInmmJ/nuqcgKi9cclxuICAgIHNhdmVBTGV2ZWxTdGFyKGxldmVsOm51bWJlcixzdGFySW5kZXg6bnVtYmVyLGlzSGF2ZTpib29sZWFuPXRydWUpe1xyXG4gICAgICAgIGxldCBzdGFycz1bZmFsc2UsZmFsc2UsZmFsc2VdO1xyXG4gICAgICAgIGxldCBsZXZlbFN0YXJzPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5LkxldmVsU3RhcitsZXZlbCxzdGFycyk7XHJcbiAgICAgICAgaWYobGV2ZWxTdGFyc1tzdGFySW5kZXgtMV08PTApe1xyXG4gICAgICAgICAgICBsZXZlbFN0YXJzW3N0YXJJbmRleC0xXT1pc0hhdmU/MTowO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5MZXZlbFN0YXIrbGV2ZWwsSlNPTi5zdHJpbmdpZnkobGV2ZWxTdGFycykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgcHJpdmF0ZSBsb2FkU3BtYWluaW50ZXJmYWNlbWFwKCl7XHJcbiAgICAgICAgaWYodGhpcy5tYWluaW50ZXJmYWNlbWFwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1haW5pbnRlcmZhY2VtYXA9bmV3IE1hcDxzdHJpbmcsY2MuU3ByaXRlRnJhbWU+KCk7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZERpcignbWFwL21haW5pbnRlcmZhY2VtYXAnLGNjLlNwcml0ZUZyYW1lLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVGcmFtZVtdKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBsZW49YXNzZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3A9YXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9c3AubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbmludGVyZmFjZW1hcC5zZXQobmFtZSxzcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=