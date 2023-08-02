"use strict";
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