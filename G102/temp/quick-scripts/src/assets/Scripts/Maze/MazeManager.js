"use strict";
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