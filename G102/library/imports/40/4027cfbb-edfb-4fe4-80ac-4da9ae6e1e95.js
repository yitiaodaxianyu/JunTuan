"use strict";
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