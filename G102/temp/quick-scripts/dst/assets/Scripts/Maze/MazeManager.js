
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74f26nB3IhOEIlPPsqnOlbu', 'MazeManager');
// Scripts/Maze/MazeManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeManager = exports.MazeFightingData = void 0;
var Constants_1 = require("../Constants");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MissionLevel_1 = require("../Level/MissionLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PetConfig_1 = require("../Pet/PetConfig");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var MazeRoad_1 = require("./Data/MazeRoad");
var RogueBuff_1 = require("./Data/RogueBuff");
var RogueConfiguration_1 = require("./Data/RogueConfiguration");
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var RogueReward_1 = require("./Data/RogueReward");
// import { RogueShopManager } from "./Data/RogueShop";
var RogueText_1 = require("./Data/RogueText");
var RogueLevel_1 = require("../copy/voidcrack/RogueLevel");
var MonsterGroupConfigure_1 = require("../Monster/Data/MonsterGroupConfigure");
var Times_1 = require("../Turntable/Times");
var MazeFightingData = /** @class */ (function () {
    function MazeFightingData() {
        /**攻击力 % */
        this.AttackPer = 0;
        /**暴击值 固定*/
        this.CriticalValue = 0;
        /**命中值 固定*/
        this.HitValue = 0;
        /**防御力 %*/
        this.DefensePer = 0;
        /**伤害减免 %*/
        this.InjuryReductionPer = 0;
        /**斩杀效果 %*/
        this.BeheadPer = 0;
        /**开局恢复效果 % */
        this.RecoveryStartPer = 0;
    }
    return MazeFightingData;
}());
exports.MazeFightingData = MazeFightingData;
var MazeManager = /** @class */ (function () {
    function MazeManager() {
        /**正在战斗的格子id */
        this.fighting_id = 10012;
        /**正在完成了的格子id */
        this.passing_id = 10012;
        /**已经通关了的格子id */
        this.passed_ids = [];
        this.fighting_data = null;
        this.lease_pet_list = [];
    }
    MazeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MazeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MazeManager.prototype.init = function () {
        MazeRoad_1.MazeRoadManager.getInstance();
        RogueBuff_1.RogueBuffManager.getInstance();
        RogueConfiguration_1.RogueConfigurationManager.getInstance();
        RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance();
        RogueReward_1.RogueRewardManager.getInstance();
        // RogueShopManager.getInstance();
        RogueText_1.RogueTextManager.getInstance();
        this.loadData();
    };
    //-----------------------数据保存与读取-----------------------------
    MazeManager.prototype.loadData = function () {
        this.loadFightingId();
        this.loadMazePassedId();
        this.loadPassingId();
        this.loadLeasePetList();
        this.fighting_data = new MazeFightingData();
    };
    MazeManager.prototype.loadMazePassedId = function () {
        this.passed_ids = new Array();
        var ids = StorageManager_1.TheStorageManager.getInstance().getItem(StorageConfig_1.StorageKey.MazePassId);
        if (ids === "" || ids === null) {
            this.passed_ids.push(RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.getFloor(), 1, 2));
        }
        else {
            var list = ids.split(',');
            for (var i = 0; i < list.length; i++) {
                var id = parseInt(list[i]);
                this.passed_ids.push(id);
            }
        }
    };
    MazeManager.prototype.resetMazeData = function () {
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBuffList);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeFightingId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazePassId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazePassingId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeShopList);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeUnSelectSpoils);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBoxIdList);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeSubHp);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeFloor);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeLeasePetList);
        var buffDate = RogueBuff_1.RogueBuffManager.getInstance().getData();
        buffDate.forEach(function (v) {
            StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBuffStage + v.RogueBuff_ID);
        });
        var data = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getData();
        data.forEach(function (v) {
            StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeRandPetList + v.Hexagon_ID);
        });
        //内存数据也要清空
        this.loadData();
    };
    /**重置楼层数据 */
    MazeManager.prototype.resetFloorData = function () {
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeFightingId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazePassId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazePassingId);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeShopList);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeUnSelectSpoils);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBoxIdList);
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeRandPetList);
        this.loadData();
    };
    /**迷宫刚通关的id */
    MazeManager.prototype.getMazePassedIds = function () {
        return this.passed_ids;
    };
    MazeManager.prototype.addMazePassedId = function (id) {
        if (RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id)) {
            if (!this.passed_ids.includes(id)) {
                this.passed_ids.push(id);
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazePassId, this.passed_ids);
                return true;
            }
            return false;
        }
        return false;
    };
    MazeManager.prototype.loadFightingId = function () {
        this.fighting_id = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazeFightingId, RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.getFloor(), 1, 2));
    };
    MazeManager.prototype.getFightingId = function () {
        return this.fighting_id;
    };
    MazeManager.prototype.setFightingId = function (id) {
        if (RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id)) {
            this.fighting_id = id;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeFightingId, id);
            return true;
        }
        return false;
    };
    MazeManager.prototype.loadPassingId = function () {
        this.passing_id = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazePassingId, RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.getFloor(), 1, 2));
    };
    MazeManager.prototype.getPassingId = function () {
        return this.passing_id;
    };
    MazeManager.prototype.setPassingId = function (id) {
        if (RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id)) {
            this.passing_id = id;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazePassingId, id);
            if (id == 10092) {
            }
            else if (id == 20092) {
            }
            return true;
        }
        return false;
    };
    MazeManager.prototype.getFloor = function () {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazeFloor, 1);
    };
    MazeManager.prototype.setFloor = function (num) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeFloor, num);
    };
    /**获取当前未选择的战利品 */
    MazeManager.prototype.getUnSelectSpoils = function () {
        var idList = new Array();
        var ids = StorageManager_1.TheStorageManager.getInstance().getItem(StorageConfig_1.StorageKey.MazeUnSelectSpoils);
        if (ids === '' || ids === null) {
        }
        else {
            var list = ids.split(',');
            for (var i = 0; i < list.length; i++) {
                var id = parseInt(list[i]);
                idList.push(id);
            }
        }
        return idList;
    };
    MazeManager.prototype.setUnSelectSpoils = function (idList) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeUnSelectSpoils, idList);
    };
    /**获取商店列表 */
    MazeManager.prototype.getAllShopPropList = function () {
        var arrList = new Array();
        var ids = StorageManager_1.TheStorageManager.getInstance().getItem(StorageConfig_1.StorageKey.MazeShopList);
        if (ids === '' || ids === null) {
        }
        else {
            arrList = JSON.parse(ids);
        }
        return arrList;
    };
    /**根据id获得一个商店道具的列表 */
    MazeManager.prototype.getAPropIndex = function (boxId) {
        var listArr = this.getAllShopPropList();
        var list = [];
        for (var i = 0; i < listArr.length; i++) {
            var obj = listArr[i];
            if (boxId == obj.box_id) {
                list = obj.prop_list;
                break;
            }
        }
        return list;
    };
    MazeManager.prototype.setShopProp = function (list) {
        var listArr = this.getAllShopPropList();
        listArr.push(list);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeShopList, JSON.stringify(listArr));
    };
    /**
     *
     * @param r1 格子1的行
     * @param r2 格子2的行
     * @param c1 格子1的列
     * @param c2 格子2的列
     * @param even 偶数行
     */
    MazeManager.prototype.checkAdjacent = function (r1, c1, r2, c2, r1IsEven) {
        if (r1IsEven) {
            //偶数行是R1，判断大于等于
            var offsetC = c2 - c1;
            if (Math.abs(r1 - r2) <= 1 && offsetC >= 0 && Math.abs(offsetC) <= 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            //奇数行是R1，判断大于等于
            var offsetC = c2 - c1;
            if (Math.abs(r1 - r2) <= 1 && offsetC <= 0 && Math.abs(offsetC) <= 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /**获得Buff的列表 */
    MazeManager.prototype.getBuffList = function () {
        var list = StorageManager_1.TheStorageManager.getInstance().getIntList(StorageConfig_1.StorageKey.MazeBuffList, []);
        return list;
    };
    /**是否存在一些buff */
    MazeManager.prototype.isHaveABuff = function (checkList) {
        var isHave = false;
        var list = this.getBuffList();
        for (var n = 0; n < checkList.length; n++) {
            if (list.indexOf(checkList[n]) != -1) {
                return true;
            }
        }
        return isHave;
    };
    /**检查buff阶段是否可以升级 */
    MazeManager.prototype.checkBuffStage = function (checkList) {
        var haveList = [];
        var list = this.getBuffList();
        for (var n = 0; n < checkList.length; n++) {
            var buffId = checkList[n];
            if (list.indexOf(buffId) != -1) {
                this.addBuffStage(buffId);
            }
        }
        return haveList;
    };
    MazeManager.prototype.addBuff = function (id) {
        var list = this.getBuffList();
        list.push(id);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeBuffList, list);
    };
    MazeManager.prototype.resetBuffList = function () {
        StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBuffList);
    };
    /**获得Buff的列表 */
    MazeManager.prototype.getBuffStage = function (buffId) {
        var stage = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazeBuffStage + buffId, 0);
        return stage;
    };
    MazeManager.prototype.addBuffStage = function (buffId) {
        var stage = this.getBuffStage(buffId);
        stage += 1;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeBuffStage + buffId, stage);
    };
    MazeManager.prototype.resetBuffStage = function () {
        var idList = RogueBuff_1.RogueBuffManager.getInstance().getBuffIdList();
        for (var i = 0; i < idList.length; i++) {
            StorageManager_1.TheStorageManager.getInstance().removeItem(StorageConfig_1.StorageKey.MazeBuffStage + idList[i]);
        }
    };
    MazeManager.prototype.refreshFightingData = function () {
        this.fighting_data = new MazeFightingData();
        var buffList = this.getBuffList();
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        for (var i = 0; i < buffList.length; i++) {
            var buffId = buffList[i];
            var jsonData = RBM.getJsonRogueBuff(buffId);
            switch (jsonData.RogueBuff_Type) {
                case 1:
                    {
                        this.fighting_data.AttackPer += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 2:
                    {
                        var stage = this.getBuffStage(buffId);
                        var value = jsonData.RogueBuff1_Value * stage;
                        if (value > jsonData.RogueBuff2_Value) {
                            value = jsonData.RogueBuff2_Value;
                        }
                        this.fighting_data.AttackPer += value;
                    }
                    break;
                case 3:
                    {
                        this.fighting_data.CriticalValue += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 4:
                    {
                        this.fighting_data.HitValue += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 5:
                    {
                        this.fighting_data.DefensePer += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 6:
                    {
                        var stage = this.getBuffStage(buffId);
                        var value = jsonData.RogueBuff1_Value * stage;
                        if (value > jsonData.RogueBuff2_Value) {
                            value = jsonData.RogueBuff2_Value;
                        }
                        this.fighting_data.DefensePer += value;
                    }
                    break;
                case 7:
                    {
                        this.fighting_data.InjuryReductionPer += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 8:
                    {
                        this.fighting_data.BeheadPer += jsonData.RogueBuff1_Value;
                    }
                    break;
                case 9:
                    {
                        this.fighting_data.RecoveryStartPer += jsonData.RogueBuff1_Value;
                    }
                    break;
            }
        }
        return this.fighting_data;
    };
    /**获取迷宫地基对应的格子排布二维列表 */
    MazeManager.prototype.getGroundBoxIdList = function () {
        var idList = [];
        var data = StorageManager_1.TheStorageManager.getInstance().getItem(StorageConfig_1.StorageKey.MazeBoxIdList);
        if (data === "" || data === null) {
            idList = [];
        }
        else {
            idList = JSON.parse(data);
        }
        return idList;
    };
    MazeManager.prototype.saveGroundBoxIdList = function (list) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeBoxIdList, JSON.stringify(list));
    };
    /**获取当前挑战的信息----迷宫怪物信息/标题信息/背景图片名称 */
    MazeManager.prototype.getFightingInfo = function (fightingId) {
        var jsonData = RogueLevel_1.RogueLevelManager.getInstance().getJsonRogueLevel(fightingId);
        var fightingInfo = new Constants_1.FightingInfo();
        var xagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(Times_1.default.voidsensid);
        if (xagonType == 1) {
            fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(830002); //普通战役
        }
        if (xagonType == 3) {
            fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(830003); //普通战役
        }
        if (xagonType == 5) {
            fightingInfo.title_name = LanguageManager_1.default.getInstance().getStrByTextId(830004); //普通战役
        }
        //背景图片名称    
        // let bgIndex=0;
        var bgName = 'bg/Maze_Bg_Battle';
        fightingInfo.bg_name = bgName;
        fightingInfo.wall_name = 'bg/Maze_Bg_Wall';
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
        return fightingInfo;
    };
    /**获取剩余的血量 */
    MazeManager.prototype.getMazeHp = function () {
        var fullHp = this.getMazeMaxHp();
        var subHp = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazeSubHp, 0);
        return fullHp - subHp * fullHp;
    };
    MazeManager.prototype.getMazeMaxHp = function () {
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(Constants_1.GameMode.Maze);
        var fullHp = 0;
        var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            if (teamList.includes(heroList[i].hero_type)) {
                fullHp += HeroManager_1.HeroManager.getInstance().getHeroData(heroList[i].hero_type).total_hp * 0.25;
            }
        }
        if (fullHp < 3000) {
            fullHp = 3000;
        }
        fullHp = Math.round(fullHp);
        return fullHp;
    };
    /**设置迷宫扣掉的血量% */
    MazeManager.prototype.setMazeSubHp = function (hp) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeSubHp, hp);
        return false;
    };
    /**获得租借列表 */
    MazeManager.prototype.getLeasePetList = function () {
        return this.lease_pet_list;
    };
    MazeManager.prototype.loadLeasePetList = function () {
        var list = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.MazeLeasePetList);
        this.lease_pet_list = new Array();
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var petInfo = new PetConfig_1.PetInfo();
                var info = list[i];
                petInfo.hero_type = info.hero_type;
                petInfo.pet_awaken_stage = info.pet_awaken_stage;
                petInfo.pet_id = info.pet_id;
                petInfo.pet_level = info.pet_level;
                petInfo.pet_quality = info.pet_quality;
                petInfo.sequence_id = info.sequence_id;
                petInfo.lease_type = info.lease_type;
                this.lease_pet_list.push(petInfo);
            }
        }
    };
    MazeManager.prototype.saveLeasePetList = function () {
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.MazeLeasePetList, this.lease_pet_list);
    };
    /**添加一个宠物至租借列表 */
    MazeManager.prototype.addLeasePetList = function (petInfo) {
        var list = this.getLeasePetList();
        list.push(petInfo);
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.MazeLeasePetList, list);
    };
    MazeManager.prototype.resetLeasePetList = function () {
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.MazeLeasePetList, []);
    };
    /**获得租借的已经随机出的列表 */
    MazeManager.prototype.getRandPetList = function (boxId) {
        var list = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.MazeRandPetList + boxId);
        var petList = new Array();
        if (list) {
            //this.pet_list=list;
            for (var i = 0; i < list.length; i++) {
                var petInfo = new PetConfig_1.PetInfo();
                var info = list[i];
                petInfo.hero_type = info.hero_type;
                petInfo.pet_awaken_stage = info.pet_awaken_stage;
                petInfo.pet_id = info.pet_id;
                petInfo.pet_level = info.pet_level;
                petInfo.pet_quality = info.pet_quality;
                petInfo.sequence_id = info.sequence_id;
                petInfo.lease_type = info.lease_type;
                petList.push(petInfo);
            }
        }
        return petList;
    };
    /**设置租借的已经随机出的列表 */
    MazeManager.prototype.setRandPetList = function (boxId, petList) {
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.MazeRandPetList + boxId, petList);
    };
    /**单方面重置英雄的绑定信息 */
    MazeManager.prototype.resetHeroBind = function () {
        var list = this.getLeasePetList();
        for (var i = 0; i < list.length; i++) {
            var petInfo = list[i];
            if (petInfo.hero_type != HeroConfig_1.Hero_Type.NULL) {
                // let mainList=PetManager.getInstance().getPetList();
                var isHave = false;
                // for(let m=0; m<mainList.length; m++){
                //     let mainInfo=mainList[m]
                //     if(mainInfo.hero_type==petInfo.hero_type){
                //         HeroManager.getInstance().getHeroData(petInfo.hero_type).pet_info=mainInfo;
                //         isHave=true;
                //         break;
                //     }
                // }
                if (!isHave) {
                    HeroManager_1.HeroManager.getInstance().getHeroData(petInfo.hero_type).pet_info = null;
                }
            }
        }
    };
    /**恢复英雄的绑定，在进入迷宫时调用,如果主列表与迷宫列表的宠物不绑定同一个英雄时或者主列表宠物绑定的英雄为NULL时 */
    MazeManager.prototype.recoverHeroBind = function () {
        // let list=PetManager.getInstance().getPetList();
        var leaseList = this.getLeasePetList();
        for (var m = 0; m < leaseList.length; m++) {
            var leaseInfo = leaseList[m];
            if (leaseInfo.hero_type != HeroConfig_1.Hero_Type.NULL) {
                var isHave = false;
                // for(let i=0; i<list.length; i++){
                //     let petInfo=list[i];
                //     if(petInfo.hero_type!=Hero_Type.NULL){
                //         if(petInfo.hero_type==leaseInfo.hero_type){
                //             //HeroManager.getInstance().getHeroData(leaseInfo.hero_type).pet_info=leaseInfo;
                //             //如果主线宠物绑定的英雄跟租借宠物绑定的英雄一致，则使用主线的
                //             isHave=true;
                //             leaseInfo.hero_type=Hero_Type.NULL;
                //         }
                //     }
                // }
                if (isHave == false) {
                    //如果主线宠物绑定的英雄和租借宠物绑定的英雄没有冲突，则需要租借的绑定英雄
                    HeroManager_1.HeroManager.getInstance().getHeroData(leaseInfo.hero_type).pet_info = leaseInfo;
                }
            }
        }
    };
    /**是否重置 */
    MazeManager.prototype.checkDate = function () {
        var startTime = this.getStartDate();
        var endTime = this.getEndTime();
        var offsetTime = Math.floor((endTime - startTime) / 1000);
        var day2 = 2 * 24 * 60 * 60;
        // if(IsDebug){
        //     day2=2*60;
        // }
        if (offsetTime >= day2) {
            if (this.getPassingId() != RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.getFloor(), 1, 2)) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法最终完成的格子数);
            }
            this.setStartDate();
            this.resetMazeData();
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法开始次数);
            return true;
        }
        return false;
    };
    MazeManager.prototype.getEndTime = function () {
        var startTime = new Date(2022, 8, 1, 0, 0, 0, 0).getTime();
        //cc.log("日期："+new Date(timeNum).toLocaleString());
        var nowTime = new Date().getTime();
        var offsetTime = nowTime - startTime;
        var offsetDay = Math.floor(offsetTime / (24 * 60 * 60 * 1000));
        var endDay = offsetDay + 2 - (offsetDay) % 2;
        var endTime = startTime + (endDay) * (24 * 60 * 60 * 1000);
        return endTime;
    };
    MazeManager.prototype.getRemainTime = function () {
        var nowTime = new Date().getTime();
        var remainTimeSec = (this.getEndTime() - nowTime) / 1000;
        return remainTimeSec;
    };
    MazeManager.prototype.getStartDate = function () {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.MazeStartDate, 0);
    };
    MazeManager.prototype.setStartDate = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.MazeStartDate, new Date().getTime());
    };
    MazeManager._instance = null;
    return MazeManager;
}());
exports.MazeManager = MazeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQStEO0FBQy9ELHdEQUF1RDtBQUN2RCxzREFBb0Q7QUFFcEQsc0RBQThFO0FBQzlFLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhDQUEyQztBQUUzQywwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDRDQUFrRDtBQUNsRCw4Q0FBb0Q7QUFDcEQsZ0VBQXNFO0FBQ3RFLHlFQUErRTtBQUMvRSxrREFBd0Q7QUFDeEQsdURBQXVEO0FBQ3ZELDhDQUFvRDtBQUNwRCwyREFBaUU7QUFDakUsK0VBQXFGO0FBQ3JGLDRDQUF1QztBQVl2QztJQUFBO1FBQ0ksV0FBVztRQUNYLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsV0FBVztRQUNYLGtCQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLFdBQVc7UUFDWCxhQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLFVBQVU7UUFDVixlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLFdBQVc7UUFDWCx1QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsV0FBVztRQUNYLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsY0FBYztRQUNkLHFCQUFnQixHQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDRDQUFnQjtBQWlCN0I7SUFBQTtRQUlJLGVBQWU7UUFDUCxnQkFBVyxHQUFRLEtBQUssQ0FBQztRQUNqQyxnQkFBZ0I7UUFDUixlQUFVLEdBQVEsS0FBSyxDQUFDO1FBQ2hDLGdCQUFnQjtRQUNSLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFFdkIsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBRXBDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO0lBd2tCeEMsQ0FBQztJQXRrQmlCLHVCQUFXLEdBQXpCO1FB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YW1lTW9kZSwgSXNEZWJ1ZyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIsIFRhYmxlTW9uc3RlckRhdGEgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuLi9QZXQvUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0L1BldE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNYXplUm9hZE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01hemVSb2FkXCI7XHJcbmltcG9ydCB7IFJvZ3VlQnVmZk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlQnVmZlwiO1xyXG5pbXBvcnQgeyBSb2d1ZUNvbmZpZ3VyYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUNvbmZpZ3VyYXRpb25cIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IFJvZ3VlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUm9ndWVSZXdhcmRcIjtcclxuLy8gaW1wb3J0IHsgUm9ndWVTaG9wTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUm9ndWVTaG9wXCI7XHJcbmltcG9ydCB7IFJvZ3VlVGV4dE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlVGV4dFwiO1xyXG5pbXBvcnQgeyBSb2d1ZUxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUxldmVsXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJHcm91cENvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgVGltZXMgZnJvbSBcIi4uL1R1cm50YWJsZS9UaW1lc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9wSW5kZXh7XHJcbiAgICBwcm9wX2luZGV4Om51bWJlcjtcclxuICAgIHByb3Bfc2FsZTpudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2hvcFByb3BMaXN0e1xyXG4gICAgYm94X2lkOm51bWJlcjtcclxuICAgIHByb3BfbGlzdDpQcm9wSW5kZXhbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hemVGaWdodGluZ0RhdGF7XHJcbiAgICAvKirmlLvlh7vlipsgJSAqL1xyXG4gICAgQXR0YWNrUGVyOm51bWJlcj0wO1xyXG4gICAgLyoq5pq05Ye75YC8IOWbuuWumiovXHJcbiAgICBDcml0aWNhbFZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq5ZG95Lit5YC8IOWbuuWumiovXHJcbiAgICBIaXRWYWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKumYsuW+oeWKmyAlKi9cclxuICAgIERlZmVuc2VQZXI6bnVtYmVyPTA7XHJcbiAgICAvKirkvKTlrrPlh4/lhY0gJSovXHJcbiAgICBJbmp1cnlSZWR1Y3Rpb25QZXI6bnVtYmVyPTA7XHJcbiAgICAvKirmlqnmnYDmlYjmnpwgJSovXHJcbiAgICBCZWhlYWRQZXI6bnVtYmVyPTA7XHJcbiAgICAvKirlvIDlsYDmgaLlpI3mlYjmnpwgJSAqL1xyXG4gICAgUmVjb3ZlcnlTdGFydFBlcjpudW1iZXI9MDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hemVNYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1hemVNYW5hZ2VyID0gbnVsbDtcclxuICAgIFxyXG4gICAgLyoq5q2j5Zyo5oiY5paX55qE5qC85a2QaWQgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfaWQ6bnVtYmVyPTEwMDEyO1xyXG4gICAgLyoq5q2j5Zyo5a6M5oiQ5LqG55qE5qC85a2QaWQgKi9cclxuICAgIHByaXZhdGUgcGFzc2luZ19pZDpudW1iZXI9MTAwMTI7XHJcbiAgICAvKirlt7Lnu4/pgJrlhbPkuobnmoTmoLzlrZBpZCAqL1xyXG4gICAgcHJpdmF0ZSBwYXNzZWRfaWRzOm51bWJlcltdPVtdO1xyXG5cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfZGF0YTpNYXplRmlnaHRpbmdEYXRhPW51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBsZWFzZV9wZXRfbGlzdDpQZXRJbmZvW109W107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOk1hemVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTWF6ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuICAgICAgICBNYXplUm9hZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBSb2d1ZUJ1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUm9ndWVDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIFJvZ3VlU2hvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBSb2d1ZVRleHRNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlbDmja7kv53lrZjkuI7or7vlj5YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJpdmF0ZSBsb2FkRGF0YSgpe1xyXG4gICAgICAgIHRoaXMubG9hZEZpZ2h0aW5nSWQoKTtcclxuICAgICAgICB0aGlzLmxvYWRNYXplUGFzc2VkSWQoKTtcclxuICAgICAgICB0aGlzLmxvYWRQYXNzaW5nSWQoKTtcclxuICAgICAgICB0aGlzLmxvYWRMZWFzZVBldExpc3QoKTtcclxuICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGE9bmV3IE1hemVGaWdodGluZ0RhdGEoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBwcml2YXRlIGxvYWRNYXplUGFzc2VkSWQoKXtcclxuICAgICAgICB0aGlzLnBhc3NlZF9pZHM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGlkcz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW0oU3RvcmFnZUtleS5NYXplUGFzc0lkKTsgXHJcbiAgICAgICAgaWYoaWRzPT09XCJcIiB8fCBpZHM9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYXNzZWRfaWRzLnB1c2goUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldElkKHRoaXMuZ2V0Rmxvb3IoKSwxLDIpKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGxpc3Q9aWRzLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZD1wYXJzZUludChsaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2VkX2lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldE1hemVEYXRhKCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJ1ZmZMaXN0KTsgICAgICAgIFxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVGaWdodGluZ0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplUGFzc0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplUGFzc2luZ0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplU2hvcExpc3QpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVVblNlbGVjdFNwb2lscyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJveElkTGlzdCk7ICAgICAgICBcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplU3ViSHApO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVGbG9vcik7XHJcblxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVMZWFzZVBldExpc3QpO1xyXG4gICAgICAgIGxldCBidWZmRGF0ZT1Sb2d1ZUJ1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGJ1ZmZEYXRlLmZvckVhY2goKHYpPT57XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVCdWZmU3RhZ2Urdi5Sb2d1ZUJ1ZmZfSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkYXRhPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGEoKTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHYpPT57XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVSYW5kUGV0TGlzdCt2LkhleGFnb25fSUQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/lhoXlrZjmlbDmja7kuZ/opoHmuIXnqbpcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6YeN572u5qW85bGC5pWw5o2uICovXHJcbiAgICByZXNldEZsb29yRGF0YSgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVGaWdodGluZ0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplUGFzc0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplUGFzc2luZ0lkKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUl0ZW0oU3RvcmFnZUtleS5NYXplU2hvcExpc3QpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVVblNlbGVjdFNwb2lscyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJveElkTGlzdCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVJdGVtKFN0b3JhZ2VLZXkuTWF6ZVJhbmRQZXRMaXN0KTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6L+35a6r5Yia6YCa5YWz55qEaWQgKi9cclxuICAgIHB1YmxpYyBnZXRNYXplUGFzc2VkSWRzKCk6bnVtYmVyW117ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXNzZWRfaWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRNYXplUGFzc2VkSWQoaWQ6bnVtYmVyKTpib29sZWFueyAgICAgICAgXHJcbiAgICAgICAgaWYoUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUoaWQpKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMucGFzc2VkX2lkcy5pbmNsdWRlcyhpZCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzZWRfaWRzLnB1c2goaWQpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk1hemVQYXNzSWQsdGhpcy5wYXNzZWRfaWRzKTsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsb2FkRmlnaHRpbmdJZCgpe1xyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfaWQ9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5NYXplRmlnaHRpbmdJZCxSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SWQodGhpcy5nZXRGbG9vcigpLDEsMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGaWdodGluZ0lkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpZ2h0aW5nX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGaWdodGluZ0lkKGlkOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBpZihSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZShpZCkpe1xyXG4gICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2lkPWlkOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5NYXplRmlnaHRpbmdJZCxpZCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUGFzc2luZ0lkKCl7XHJcbiAgICAgICAgdGhpcy5wYXNzaW5nX2lkPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuTWF6ZVBhc3NpbmdJZCxSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SWQodGhpcy5nZXRGbG9vcigpLDEsMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXNzaW5nSWQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFzc2luZ19pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGFzc2luZ0lkKGlkOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBpZihSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZShpZCkpe1xyXG4gICAgICAgICAgICB0aGlzLnBhc3NpbmdfaWQ9aWQ7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk1hemVQYXNzaW5nSWQsaWQpO1xyXG4gICAgICAgICAgICBpZihpZD09MTAwOTIpe1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICBpZihpZD09MjAwOTIpe1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rmxvb3IoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuTWF6ZUZsb29yLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGbG9vcihudW06bnVtYmVyKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5NYXplRmxvb3IsbnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5blvZPliY3mnKrpgInmi6nnmoTmiJjliKnlk4EgKi9cclxuICAgIHB1YmxpYyBnZXRVblNlbGVjdFNwb2lscygpOm51bWJlcltde1xyXG4gICAgICAgIGxldCBpZExpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGlkcz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW0oU3RvcmFnZUtleS5NYXplVW5TZWxlY3RTcG9pbHMpO1xyXG4gICAgICAgIGlmKGlkcz09PScnIHx8IGlkcz09PW51bGwpe1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGxpc3Q9aWRzLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZD1wYXJzZUludChsaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIGlkTGlzdC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVblNlbGVjdFNwb2lscyhpZExpc3Q6bnVtYmVyW10pe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk1hemVVblNlbGVjdFNwb2lscyxpZExpc3QpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5ZWG5bqX5YiX6KGoICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsU2hvcFByb3BMaXN0KCk6U2hvcFByb3BMaXN0W117XHJcbiAgICAgICAgbGV0IGFyckxpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGlkcz1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEl0ZW0oU3RvcmFnZUtleS5NYXplU2hvcExpc3QpO1xyXG4gICAgICAgIGlmKGlkcz09PScnIHx8IGlkcz09PW51bGwpe1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXJyTGlzdD1KU09OLnBhcnNlKGlkcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJMaXN0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTojrflvpfkuIDkuKrllYblupfpgZPlhbfnmoTliJfooaggKi9cclxuICAgIHB1YmxpYyBnZXRBUHJvcEluZGV4KGJveElkOm51bWJlcik6UHJvcEluZGV4W117XHJcbiAgICAgICAgbGV0IGxpc3RBcnI9dGhpcy5nZXRBbGxTaG9wUHJvcExpc3QoKTtcclxuICAgICAgICBsZXQgbGlzdD1bXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0QXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG9iaj1saXN0QXJyW2ldO1xyXG4gICAgICAgICAgICBpZihib3hJZD09b2JqLmJveF9pZCl7XHJcbiAgICAgICAgICAgICAgICBsaXN0PW9iai5wcm9wX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2hvcFByb3AobGlzdDpTaG9wUHJvcExpc3Qpe1xyXG4gICAgICAgIGxldCBsaXN0QXJyPXRoaXMuZ2V0QWxsU2hvcFByb3BMaXN0KCk7XHJcbiAgICAgICAgbGlzdEFyci5wdXNoKGxpc3QpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk1hemVTaG9wTGlzdCxKU09OLnN0cmluZ2lmeShsaXN0QXJyKSk7ICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSByMSDmoLzlrZAx55qE6KGMXHJcbiAgICAgKiBAcGFyYW0gcjIg5qC85a2QMueahOihjFxyXG4gICAgICogQHBhcmFtIGMxIOagvOWtkDHnmoTliJdcclxuICAgICAqIEBwYXJhbSBjMiDmoLzlrZAy55qE5YiXXHJcbiAgICAgKiBAcGFyYW0gZXZlbiDlgbbmlbDooYxcclxuICAgICAqL1xyXG4gICAgY2hlY2tBZGphY2VudChyMTpudW1iZXIsYzE6bnVtYmVyLHIyOm51bWJlcixjMjpudW1iZXIscjFJc0V2ZW46Ym9vbGVhbik6Ym9vbGVhbntcclxuICAgICAgICBpZihyMUlzRXZlbil7XHJcbiAgICAgICAgICAgIC8v5YG25pWw6KGM5pivUjHvvIzliKTmlq3lpKfkuo7nrYnkuo5cclxuICAgICAgICAgICAgbGV0IG9mZnNldEM9YzItYzE7XHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHIxLXIyKTw9MSAmJiBvZmZzZXRDPj0wICYmIE1hdGguYWJzKG9mZnNldEMpPD0xKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIC8v5aWH5pWw6KGM5pivUjHvvIzliKTmlq3lpKfkuo7nrYnkuo5cclxuICAgICAgICAgICBsZXQgb2Zmc2V0Qz1jMi1jMTtcclxuICAgICAgICAgICBpZihNYXRoLmFicyhyMS1yMik8PTEgJiYgb2Zmc2V0Qzw9MCAmJiBNYXRoLmFicyhvZmZzZXRDKTw9MSl7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6XQnVmZueahOWIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldEJ1ZmZMaXN0KCk6bnVtYmVyW117ICAgICAgICBcclxuICAgICAgICBsZXQgbGlzdD1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludExpc3QoU3RvcmFnZUtleS5NYXplQnVmZkxpc3QsW10pO1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgLyoq5piv5ZCm5a2Y5Zyo5LiA5LqbYnVmZiAqL1xyXG4gICAgcHVibGljIGlzSGF2ZUFCdWZmKGNoZWNrTGlzdDpudW1iZXJbXSk6Ym9vbGVhbnsgICAgICAgIFxyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgbGV0IGxpc3Q9dGhpcy5nZXRCdWZmTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPGNoZWNrTGlzdC5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgIGlmKGxpc3QuaW5kZXhPZihjaGVja0xpc3Rbbl0pIT0tMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpc0hhdmU7XHJcbiAgICB9XHJcbiAgICAvKirmo4Dmn6VidWZm6Zi25q615piv5ZCm5Y+v5Lul5Y2H57qnICovXHJcbiAgICBwdWJsaWMgY2hlY2tCdWZmU3RhZ2UoY2hlY2tMaXN0Om51bWJlcltdKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBoYXZlTGlzdD1bXTtcclxuICAgICAgICBsZXQgbGlzdD10aGlzLmdldEJ1ZmZMaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBuPTA7IG48Y2hlY2tMaXN0Lmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZJZD1jaGVja0xpc3Rbbl1cclxuICAgICAgICAgICAgaWYobGlzdC5pbmRleE9mKGJ1ZmZJZCkhPS0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YWdlKGJ1ZmZJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhdmVMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRCdWZmKGlkOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGxpc3Q9dGhpcy5nZXRCdWZmTGlzdCgpO1xyXG4gICAgICAgIGxpc3QucHVzaChpZCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJ1ZmZMaXN0LGxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldEJ1ZmZMaXN0KCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJ1ZmZMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpdCdWZm55qE5YiX6KGoICovXHJcbiAgICBwdWJsaWMgZ2V0QnVmZlN0YWdlKGJ1ZmZJZDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgc3RhZ2U9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5NYXplQnVmZlN0YWdlK2J1ZmZJZCwwKTtcclxuICAgICAgICByZXR1cm4gc3RhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEJ1ZmZTdGFnZShidWZmSWQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgc3RhZ2U9dGhpcy5nZXRCdWZmU3RhZ2UoYnVmZklkKTtcclxuICAgICAgICBzdGFnZSs9MTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5NYXplQnVmZlN0YWdlK2J1ZmZJZCxzdGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0QnVmZlN0YWdlKCl7XHJcbiAgICAgICAgbGV0IGlkTGlzdD1Sb2d1ZUJ1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZklkTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGlkTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlSXRlbShTdG9yYWdlS2V5Lk1hemVCdWZmU3RhZ2UraWRMaXN0W2ldKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaEZpZ2h0aW5nRGF0YSgpOk1hemVGaWdodGluZ0RhdGF7XHJcbiAgICAgICAgdGhpcy5maWdodGluZ19kYXRhPW5ldyBNYXplRmlnaHRpbmdEYXRhKCk7XHJcbiAgICAgICAgbGV0IGJ1ZmZMaXN0PXRoaXMuZ2V0QnVmZkxpc3QoKTtcclxuICAgICAgICBsZXQgUkJNPVJvZ3VlQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxidWZmTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBidWZmSWQ9YnVmZkxpc3RbaV07ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1SQk0uZ2V0SnNvblJvZ3VlQnVmZihidWZmSWQpO1xyXG4gICAgICAgICAgICBzd2l0Y2goanNvbkRhdGEuUm9ndWVCdWZmX1R5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGEuQXR0YWNrUGVyKz1qc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhZ2U9dGhpcy5nZXRCdWZmU3RhZ2UoYnVmZklkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU9anNvbkRhdGEuUm9ndWVCdWZmMV9WYWx1ZSpzdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZT5qc29uRGF0YS5Sb2d1ZUJ1ZmYyX1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9anNvbkRhdGEuUm9ndWVCdWZmMl9WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19kYXRhLkF0dGFja1Blcis9dmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfZGF0YS5Dcml0aWNhbFZhbHVlKz1qc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGEuSGl0VmFsdWUrPWpzb25EYXRhLlJvZ3VlQnVmZjFfVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfZGF0YS5EZWZlbnNlUGVyKz1qc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhZ2U9dGhpcy5nZXRCdWZmU3RhZ2UoYnVmZklkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU9anNvbkRhdGEuUm9ndWVCdWZmMV9WYWx1ZSpzdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZT5qc29uRGF0YS5Sb2d1ZUJ1ZmYyX1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9anNvbkRhdGEuUm9ndWVCdWZmMl9WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19kYXRhLkRlZmVuc2VQZXIrPXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGEuSW5qdXJ5UmVkdWN0aW9uUGVyKz1qc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGEuQmVoZWFkUGVyKz1qc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2RhdGEuUmVjb3ZlcnlTdGFydFBlcis9anNvbkRhdGEuUm9ndWVCdWZmMV9WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5maWdodGluZ19kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlui/t+Wuq+WcsOWfuuWvueW6lOeahOagvOWtkOaOkuW4g+S6jOe7tOWIl+ihqCAqL1xyXG4gICAgZ2V0R3JvdW5kQm94SWRMaXN0KCk6bnVtYmVyW11bXXtcclxuICAgICAgICBsZXQgaWRMaXN0PVtdO1xyXG4gICAgICAgIGxldCBkYXRhPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXRlbShTdG9yYWdlS2V5Lk1hemVCb3hJZExpc3QpO1xyXG4gICAgICAgIGlmKGRhdGE9PT1cIlwiIHx8IGRhdGE9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWRMaXN0PVtdO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZExpc3Q9SlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlkTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlR3JvdW5kQm94SWRMaXN0KGxpc3Q6bnVtYmVyW11bXSl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTWF6ZUJveElkTGlzdCxKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5b2T5YmN5oyR5oiY55qE5L+h5oGvLS0tLei/t+Wuq+aAqueJqeS/oeaBry/moIfpopjkv6Hmga8v6IOM5pmv5Zu+54mH5ZCN56ewICovXHJcbiAgICBnZXRGaWdodGluZ0luZm8oZmlnaHRpbmdJZD86bnVtYmVyKTpGaWdodGluZ0luZm97XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPVJvZ3VlTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblJvZ3VlTGV2ZWwoZmlnaHRpbmdJZCk7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbz1uZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgbGV0IHhhZ29uVHlwZT0gUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUoVGltZXMudm9pZHNlbnNpZClcclxuICAgICAgICBpZih4YWdvblR5cGU9PTEpe1xyXG4gICAgICAgICAgICBmaWdodGluZ0luZm8udGl0bGVfbmFtZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMDIpOy8v5pmu6YCa5oiY5b25XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHhhZ29uVHlwZT09Myl7XHJcbiAgICAgICAgICAgIGZpZ2h0aW5nSW5mby50aXRsZV9uYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAwMyk7Ly/mma7pgJrmiJjlvblcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoeGFnb25UeXBlPT01KXtcclxuICAgICAgICAgICAgZmlnaHRpbmdJbmZvLnRpdGxlX25hbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDA0KTsvL+aZrumAmuaImOW9uVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/og4zmma/lm77niYflkI3np7AgICAgXHJcbiAgICAgICAgLy8gbGV0IGJnSW5kZXg9MDtcclxuICAgICAgICBsZXQgYmdOYW1lPSdiZy9NYXplX0JnX0JhdHRsZSc7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLmJnX25hbWU9YmdOYW1lO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YWxsX25hbWU9J2JnL01hemVfQmdfV2FsbCc7XHJcbiAgICAgICAgZmlnaHRpbmdJbmZvLndhdmVfdHlwZXM9anNvbkRhdGEuTW9uc3RlclRpZGVXYXZlO1xyXG4gICAgICAgIGZpZ2h0aW5nSW5mby53YXZlX3JlZnJlc2hfdGltZT1qc29uRGF0YS5UaW1lSW50ZXJ2YWw7XHJcbiAgICAgICAgLy/mgKrniankv6Hmga/liJfooahcclxuICAgICAgICBsZXQgbW9uc3RlckRhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBtb25zdGVyR3JvdXBzPWpzb25EYXRhLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgICAgICBsZXQgTUdDPU1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyR3JvdXBzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGxldCBncm91cElkPW1vbnN0ZXJHcm91cHNbaV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVySnNvbkRhdGE9TUdDLmdldEpzb25Nb25zdGVyR3JvdXBDb25maWd1cmUoZ3JvdXBJZClcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJJZC5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVNb25zdGVyRGF0YT1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5pZD1tb25zdGVySnNvbkRhdGEuTW9uc3RlcklkW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5udW09bW9uc3Rlckpzb25EYXRhLk1vbnN0ZXJOdW1bbl07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLnJlZnJlc2hfdGltZT1tb25zdGVySnNvbkRhdGEuUmVmcmVzaEludGVydmFsW25dO1xyXG4gICAgICAgICAgICAgICAgdGFibGVNb25zdGVyRGF0YS5sZXZlbD1qc29uRGF0YS5Nb25zdGVyTGV2ZWxbaV07XHJcbiAgICAgICAgICAgICAgICB0YWJsZU1vbnN0ZXJEYXRhLmhwX3JhdGU9anNvbkRhdGEuSHBDb2VmZmljaWVudFtpXTtcclxuICAgICAgICAgICAgICAgIGRhdGFBcnIucHVzaCh0YWJsZU1vbnN0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bSs9dGFibGVNb25zdGVyRGF0YS5udW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9uc3RlckRhdGFzLnB1c2goZGF0YUFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpZ2h0aW5nSW5mby5tb25zdGVyX2RhdGFzPW1vbnN0ZXJEYXRhcztcclxuICAgICAgICByZXR1cm4gZmlnaHRpbmdJbmZvO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Ymp5L2Z55qE6KGA6YePICovXHJcbiAgICBwdWJsaWMgZ2V0TWF6ZUhwKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBmdWxsSHA9dGhpcy5nZXRNYXplTWF4SHAoKTtcclxuICAgICAgICBsZXQgc3ViSHA9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5NYXplU3ViSHAsMCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxIcC1zdWJIcCpmdWxsSHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1hemVNYXhIcCgpOm51bWJlcntcclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYXplKTtcclxuICAgICAgICBsZXQgZnVsbEhwPTA7XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGVhbUxpc3QuaW5jbHVkZXMoaGVyb0xpc3RbaV0uaGVyb190eXBlKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZnVsbEhwKz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKGhlcm9MaXN0W2ldLmhlcm9fdHlwZSkudG90YWxfaHAqMC4yNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmdWxsSHA8MzAwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZ1bGxIcD0zMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdWxsSHA9TWF0aC5yb3VuZChmdWxsSHApO1xyXG4gICAgICAgIHJldHVybiBmdWxsSHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u6L+35a6r5omj5o6J55qE6KGA6YePJSAqL1xyXG4gICAgcHVibGljIHNldE1hemVTdWJIcChocDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTWF6ZVN1YkhwLGhwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfnp5/lgJ/liJfooaggKi9cclxuICAgIHB1YmxpYyBnZXRMZWFzZVBldExpc3QoKTpQZXRJbmZvW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhc2VfcGV0X2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRMZWFzZVBldExpc3QoKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBsaXN0PVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5Lk1hemVMZWFzZVBldExpc3QpO1xyXG4gICAgICAgIHRoaXMubGVhc2VfcGV0X2xpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgaWYobGlzdCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBldEluZm89bmV3IFBldEluZm8oKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvPWxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBwZXRJbmZvLmhlcm9fdHlwZT1pbmZvLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgIHBldEluZm8ucGV0X2F3YWtlbl9zdGFnZT1pbmZvLnBldF9hd2FrZW5fc3RhZ2U7XHJcbiAgICAgICAgICAgICAgICBwZXRJbmZvLnBldF9pZD1pbmZvLnBldF9pZDtcclxuICAgICAgICAgICAgICAgIHBldEluZm8ucGV0X2xldmVsPWluZm8ucGV0X2xldmVsO1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5wZXRfcXVhbGl0eT1pbmZvLnBldF9xdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5zZXF1ZW5jZV9pZD1pbmZvLnNlcXVlbmNlX2lkO1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5sZWFzZV90eXBlPWluZm8ubGVhc2VfdHlwZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVhc2VfcGV0X2xpc3QucHVzaChwZXRJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZUxlYXNlUGV0TGlzdCgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lk1hemVMZWFzZVBldExpc3QsdGhpcy5sZWFzZV9wZXRfbGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5Liq5a6g54mp6Iez56ef5YCf5YiX6KGoICovXHJcbiAgICBwdWJsaWMgYWRkTGVhc2VQZXRMaXN0KHBldEluZm86UGV0SW5mbyl7XHJcbiAgICAgICAgbGV0IGxpc3Q9dGhpcy5nZXRMZWFzZVBldExpc3QoKTtcclxuICAgICAgICBsaXN0LnB1c2gocGV0SW5mbyk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRKc29uKFN0b3JhZ2VLZXkuTWF6ZUxlYXNlUGV0TGlzdCxsaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldExlYXNlUGV0TGlzdCgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lk1hemVMZWFzZVBldExpc3QsW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+enn+WAn+eahOW3sue7j+maj+acuuWHuueahOWIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldFJhbmRQZXRMaXN0KGJveElkOm51bWJlcik6UGV0SW5mb1tde1xyXG4gICAgICAgIGxldCBsaXN0PVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5Lk1hemVSYW5kUGV0TGlzdCtib3hJZCk7XHJcbiAgICAgICAgbGV0IHBldExpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgaWYobGlzdCl7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wZXRfbGlzdD1saXN0O1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBwZXRJbmZvPW5ldyBQZXRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbz1saXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5oZXJvX3R5cGU9aW5mby5oZXJvX3R5cGU7XHJcbiAgICAgICAgICAgICAgICBwZXRJbmZvLnBldF9hd2FrZW5fc3RhZ2U9aW5mby5wZXRfYXdha2VuX3N0YWdlO1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5wZXRfaWQ9aW5mby5wZXRfaWQ7XHJcbiAgICAgICAgICAgICAgICBwZXRJbmZvLnBldF9sZXZlbD1pbmZvLnBldF9sZXZlbDtcclxuICAgICAgICAgICAgICAgIHBldEluZm8ucGV0X3F1YWxpdHk9aW5mby5wZXRfcXVhbGl0eTtcclxuICAgICAgICAgICAgICAgIHBldEluZm8uc2VxdWVuY2VfaWQ9aW5mby5zZXF1ZW5jZV9pZDtcclxuICAgICAgICAgICAgICAgIHBldEluZm8ubGVhc2VfdHlwZT1pbmZvLmxlYXNlX3R5cGU7XHJcbiAgICAgICAgICAgICAgICBwZXRMaXN0LnB1c2gocGV0SW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBldExpc3Q7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7np5/lgJ/nmoTlt7Lnu4/pmo/mnLrlh7rnmoTliJfooaggKi9cclxuICAgIHB1YmxpYyBzZXRSYW5kUGV0TGlzdChib3hJZDpudW1iZXIscGV0TGlzdDpQZXRJbmZvW10pe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lk1hemVSYW5kUGV0TGlzdCtib3hJZCxwZXRMaXN0KTtcclxuICAgIH1cclxuICAgIC8qKuWNleaWuemdoumHjee9ruiLsembhOeahOe7keWumuS/oeaBryAqL1xyXG4gICAgcmVzZXRIZXJvQmluZCgpe1xyXG4gICAgICAgIGxldCBsaXN0PXRoaXMuZ2V0TGVhc2VQZXRMaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBwZXRJbmZvPWxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKHBldEluZm8uaGVyb190eXBlIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbWFpbkxpc3Q9UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldExpc3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IG09MDsgbTxtYWluTGlzdC5sZW5ndGg7IG0rKyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG1haW5JbmZvPW1haW5MaXN0W21dXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYobWFpbkluZm8uaGVyb190eXBlPT1wZXRJbmZvLmhlcm9fdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEocGV0SW5mby5oZXJvX3R5cGUpLnBldF9pbmZvPW1haW5JbmZvO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgaWYoIWlzSGF2ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShwZXRJbmZvLmhlcm9fdHlwZSkucGV0X2luZm89bnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuaBouWkjeiLsembhOeahOe7keWumu+8jOWcqOi/m+WFpei/t+Wuq+aXtuiwg+eUqCzlpoLmnpzkuLvliJfooajkuI7ov7flrqvliJfooajnmoTlrqDniankuI3nu5HlrprlkIzkuIDkuKroi7Hpm4Tml7bmiJbogIXkuLvliJfooajlrqDniannu5HlrprnmoToi7Hpm4TkuLpOVUxM5pe2ICovXHJcbiAgICByZWNvdmVySGVyb0JpbmQoKXtcclxuICAgICAgICAvLyBsZXQgbGlzdD1QZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0TGlzdCgpO1xyXG4gICAgICAgIGxldCBsZWFzZUxpc3Q9dGhpcy5nZXRMZWFzZVBldExpc3QoKTtcclxuICAgICAgICBmb3IobGV0IG09MDsgbTxsZWFzZUxpc3QubGVuZ3RoOyBtKyspe1xyXG4gICAgICAgICAgICBsZXQgbGVhc2VJbmZvPWxlYXNlTGlzdFttXVxyXG4gICAgICAgICAgICBpZihsZWFzZUluZm8uaGVyb190eXBlIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNIYXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHBldEluZm89bGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZihwZXRJbmZvLmhlcm9fdHlwZSE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZihwZXRJbmZvLmhlcm9fdHlwZT09bGVhc2VJbmZvLmhlcm9fdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEobGVhc2VJbmZvLmhlcm9fdHlwZSkucGV0X2luZm89bGVhc2VJbmZvO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy/lpoLmnpzkuLvnur/lrqDniannu5HlrprnmoToi7Hpm4Tot5/np5/lgJ/lrqDniannu5HlrprnmoToi7Hpm4TkuIDoh7TvvIzliJnkvb/nlKjkuLvnur/nmoRcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGVhc2VJbmZvLmhlcm9fdHlwZT1IZXJvX1R5cGUuTlVMTDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIGlmKGlzSGF2ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5Li757q/5a6g54mp57uR5a6a55qE6Iux6ZuE5ZKM56ef5YCf5a6g54mp57uR5a6a55qE6Iux6ZuE5rKh5pyJ5Yay56qB77yM5YiZ6ZyA6KaB56ef5YCf55qE57uR5a6a6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShsZWFzZUluZm8uaGVyb190eXBlKS5wZXRfaW5mbz1sZWFzZUluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpumHjee9riAqL1xyXG4gICAgY2hlY2tEYXRlKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgc3RhcnRUaW1lPXRoaXMuZ2V0U3RhcnREYXRlKCk7XHJcbiAgICAgICAgbGV0IGVuZFRpbWU9dGhpcy5nZXRFbmRUaW1lKCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFRpbWU9TWF0aC5mbG9vcigoZW5kVGltZS1zdGFydFRpbWUpLzEwMDApO1xyXG4gICAgICAgIGxldCBkYXkyPTIqMjQqNjAqNjA7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIGRheTI9Mio2MDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYob2Zmc2V0VGltZT49ZGF5Mil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0UGFzc2luZ0lkKCkhPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJZCh0aGlzLmdldEZsb29yKCksMSwyKSl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5XmnIDnu4jlrozmiJDnmoTmoLzlrZDmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRNYXplRGF0YSgpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5XlvIDlp4vmrKHmlbApO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZFRpbWUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZT1uZXcgRGF0ZSgyMDIyLDgsMSwwLDAsMCwwKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy9jYy5sb2coXCLml6XmnJ/vvJpcIituZXcgRGF0ZSh0aW1lTnVtKS50b0xvY2FsZVN0cmluZygpKTtcclxuICAgICAgICBsZXQgbm93VGltZT1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0VGltZT1ub3dUaW1lLXN0YXJ0VGltZTtcclxuICAgICAgICBsZXQgb2Zmc2V0RGF5PU1hdGguZmxvb3Iob2Zmc2V0VGltZS8oMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgIGxldCBlbmREYXk9b2Zmc2V0RGF5KzItKG9mZnNldERheSklMjtcclxuICAgICAgICBsZXQgZW5kVGltZT1zdGFydFRpbWUrKGVuZERheSkqKDI0KjYwKjYwKjEwMDApO1xyXG4gICAgICAgIHJldHVybiBlbmRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlbWFpblRpbWUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG5vd1RpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IHJlbWFpblRpbWVTZWM9KHRoaXMuZ2V0RW5kVGltZSgpLW5vd1RpbWUpLzEwMDA7XHJcbiAgICAgICAgcmV0dXJuIHJlbWFpblRpbWVTZWM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RhcnREYXRlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5Lk1hemVTdGFydERhdGUsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcnREYXRlKCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuTWF6ZVN0YXJ0RGF0ZSxuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==