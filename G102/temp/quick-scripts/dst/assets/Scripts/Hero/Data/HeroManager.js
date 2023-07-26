
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a672B/O41OUqKVWVUEduzr', 'HeroManager');
// Scripts/Hero/Data/HeroManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroManager = exports.HeroExclusiveData = exports.HeroUpgradeData = void 0;
var Constants_1 = require("../../Constants");
var EquipmentAttribute_1 = require("../../Equipment/Data/EquipmentAttribute");
var EquipmentManager_1 = require("../../Equipment/EquipmentManager");
var HeroBaseInfo_1 = require("./HeroBaseInfo");
var HeroQuality_1 = require("./HeroQuality");
var LevelUp_1 = require("./LevelUp");
var EventManager_1 = require("../../Tools/EventManager");
var HeroData_1 = require("./HeroData");
var SkillLevelUnlock_1 = require("./SkillLevelUnlock");
var HeroAttribute_1 = require("./HeroAttribute");
var PropManager_1 = require("../../Prop/PropManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var SkillConfiguration_1 = require("./SkillConfiguration");
var LevelManager_1 = require("../../Level/LevelManager");
var EquipConfig_1 = require("../../Equipment/EquipConfig");
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var StorageManager_1 = require("../../Storage/StorageManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var HeroTitle_1 = require("./HeroTitle");
var HeroConfig_1 = require("../Game/HeroConfig");
var CombatEffectiveness_1 = require("./CombatEffectiveness");
var TaskManager_1 = require("../../Task/TaskManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var GameManager_1 = require("../../GameManager");
var SpiritAttribute_1 = require("../../Pet/Data/SpiritAttribute");
var EWUnlockCost_1 = require("../../JsonData/EWUnlockCost");
var ExclusiveWeaponSkill_1 = require("../../JsonData/ExclusiveWeaponSkill");
var UserData_1 = require("../../UserData");
var HttpManager_1 = require("../.././NetWork/HttpManager");
var UserInfo_1 = require("../../UserInfo/UserInfo");
var ExclusiveWeaponMessage_1 = require("../../JsonData/ExclusiveWeaponMessage");
/**英雄升级数据 */
var HeroUpgradeData = /** @class */ (function () {
    function HeroUpgradeData() {
        /**当前的等级 */
        this.cur_level = 0;
        /**当前能够升级的最大级 */
        this.max_level = 0;
        /**当前等级是否可以升级 */
        this.is_level = false;
        /**当前拥有的金币 */
        this.cur_coin = 0;
        /**升级需要花费的金币 */
        this.cost_coin = 0;
        /**升级金币是否足够 */
        this.is_coin = false;
        // /**当前拥有的经验 */
        // cur_exp:number=0;
        // /**升级需要花费的经验 */
        // cost_exp:number=0;
        // /**升级经验是否足够 */
        // is_exp:boolean=false;
        // /**当前拥有的进阶石 */
        // cur_jinjie: number = 0;
        // /**升级需要花费的进阶石 */
        // cost_jinjie: number = 0;
        // /**升级进阶石是否足够 */
        // is_jinjie: boolean = false;
        /**是否能够升级 */
        this.is_can_up = false;
    }
    return HeroUpgradeData;
}());
exports.HeroUpgradeData = HeroUpgradeData;
/**英雄专武数据 */
var HeroExclusiveData = /** @class */ (function () {
    function HeroExclusiveData() {
        /**当前拥有的道具数量 */
        this.cur_prop_num = 0;
        /**升级需要的道具数量 */
        this.cost_prop_num = 0;
        /**升级需要的道具id */
        this.cost_prop_id = 0;
        /**是否能够升级 */
        this.is_can_up = false;
    }
    return HeroExclusiveData;
}());
exports.HeroExclusiveData = HeroExclusiveData;
var HeroManager = /** @class */ (function () {
    function HeroManager() {
        //资源
        this.btn_hero_team = null;
        this.btn_hero_role = null;
        this.sprite_atlas = null;
        this.sprite_atlass = null;
        // private role_atlas:cc.SpriteAtlas = null;
        this.sp_body = null;
        this.hero_fragment = null;
        //英雄数据
        this.hero_data = null;
        // private hero_level:number[]=[];
        // private hero_quality:number[]=[];
        this.hero_list = [];
        //0星可升级40级；1星可到80级；2星到120级；3星到160级；4星到200级；5星到240级.
        this.hero_stageList = [40, 80, 120, 160, 200, 240];
    }
    HeroManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroManager.prototype.init = function () {
        HeroBaseInfo_1.HeroBaseInfoManager.getInstance();
        HeroQuality_1.HeroQualityManager.getInstance();
        LevelUp_1.LevelUpManager.getInstance();
        SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance();
        HeroAttribute_1.HeroAttributeManager.getInstance();
        SkillConfiguration_1.SkillConfigurationManager.getInstance();
        HeroTitle_1.HeroTitleManager.getInstance();
        CombatEffectiveness_1.CombatEffectivenessManager.getInstance();
        EWUnlockCost_1.EWUnlockCostManager.getInstance();
        this.loadTeamPrefab();
        this.loadRolePrefab();
        this.loadFragmentPrefab();
        this.loadSp();
        // this.loadRoleSp();     
        this.loadSps();
        this.loadBody();
    };
    //-----------------------资源的读取-----------------------------
    HeroManager.prototype.loadTeamPrefab = function () {
        var _this = this;
        if (this.btn_hero_team)
            return;
        cc.resources.load('heros/btn_hero_team', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.btn_hero_team = assets;
        });
    };
    HeroManager.prototype.loadRolePrefab = function () {
        var _this = this;
        if (this.btn_hero_role)
            return;
        cc.resources.load('heros/btn_hero_role', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.btn_hero_role = assets;
        });
    };
    HeroManager.prototype.loadFragmentPrefab = function () {
        var _this = this;
        if (this.hero_fragment)
            return;
        cc.resources.load('heros/hero_fragment', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.hero_fragment = assets;
        });
    };
    HeroManager.prototype.loadSp = function () {
        var _this = this;
        if (this.sprite_atlas)
            return;
        cc.resources.load('heros/hero_list_ui', cc.SpriteAtlas, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            //console.log('加载EquipmentAttribute成功');
            _this.sprite_atlas = assets;
        });
    };
    // private loadRoleSp(){
    //     if(this.role_atlas)
    //     return;
    //     cc.resources.load('heros/role_ui',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
    //         if(error)
    //         {
    //             console.log(error);
    //             return;
    //         }
    //         //console.log('加载EquipmentAttribute成功');
    //         this.role_atlas=assets;            
    //     });
    // }
    HeroManager.prototype.loadSps = function () {
        var _this = this;
        if (this.sprite_atlass)
            return;
        cc.resources.load('heros/hero', cc.SpriteAtlas, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            //console.log('加载EquipmentAttribute成功');
            _this.sprite_atlass = assets;
        });
    };
    /**加载立绘主体 */
    HeroManager.prototype.loadBody = function () {
        var _this = this;
        if (this.sp_body) {
            return;
        }
        this.sp_body = new Map();
        cc.resources.loadDir('heros/body', cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var len = assets.length;
            for (var i = 0; i < len; i++) {
                var sp = assets[i];
                var name = sp.name;
                var index = name.lastIndexOf('_');
                if (index != -1) {
                    var heroId = parseInt(name.substring(index + 1));
                    _this.sp_body.set(heroId, sp);
                }
            }
        });
    };
    HeroManager.prototype.getSpriteFrameByName = function (key) {
        return this.sprite_atlas.getSpriteFrame(key);
    };
    // public getRoleSpriteFrameByName(key:string):cc.SpriteFrame{
    //     return this.role_atlas.getSpriteFrame(key);
    // }
    HeroManager.prototype.getSpriteFrameByNames = function (key) {
        return this.sprite_atlass.getSpriteFrame(key);
    };
    HeroManager.prototype.getHeroSpriteFrame = function (heroType) {
        return this.getSpriteFrameByName('hero' + heroType);
    };
    HeroManager.prototype.getHeroSpriteFrames = function (heroType) {
        return this.getSpriteFrameByNames('Head_Hero_S_' + heroType);
    };
    /**获得一张英雄的立绘主体 */
    HeroManager.prototype.getHeroBody = function (heroId) {
        return this.sp_body.get(heroId);
    };
    //-----------------------数据保存与读取-----------------------------
    HeroManager.prototype.onLoadHeroData = function () {
        this.loadHeroList();
        this.loadAllHeroData();
    };
    /**
     * 保存当前的拥有的英雄信息
     */
    HeroManager.prototype.saveHeroList = function () {
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.HeroList, this.hero_list);
        // this.loadHeroList();
        this.loadAllHeroData();
    };
    HeroManager.prototype.reportHeroList = function () {
        var list = [];
        this.hero_list.forEach(function (v, k) {
            var heroObject = new HttpManager_1.HeroObject();
            heroObject.heroId = v.hero_type;
            heroObject.heroLevel = v.hero_level;
            heroObject.heroStage = v.hero_stage;
            heroObject.heroWeaponStage = v.exclusive_equip_stage;
            heroObject.weapons = v.wear1;
            heroObject.armor = v.wear2;
            heroObject.accessories = v.wear3;
            heroObject.shoes = v.wear4;
            heroObject.pet = v.pet_id;
            list.push(heroObject);
        });
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.reportHeroList, this.setHeroListJsonString(list), false);
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.HeroList, this.hero_list);
    };
    /**
     * 加载英雄信息
     */
    HeroManager.prototype.loadHeroList = function () {
        var _this = this;
        this.hero_list = new Array();
        var list = UserInfo_1.UserInfo.getInstance().heroList;
        list.forEach(function (v, k) {
            var heroInfo = new HeroConfig_1.HeroInfo();
            heroInfo.hero_type = v.heroId;
            heroInfo.hero_level = v.heroLevel;
            heroInfo.hero_stage = v.heroStage;
            heroInfo.exclusive_equip_stage = v.heroWeaponStage;
            heroInfo.wear1 = v.weapons;
            heroInfo.wear2 = v.armor;
            heroInfo.wear3 = v.accessories;
            heroInfo.wear4 = v.shoes;
            heroInfo.pet_id = v.pet;
            _this.hero_list.push(heroInfo);
        });
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.HeroList, this.hero_list);
        // let list = TheStorageManager.getInstance().getJson(StorageKey.HeroList)
        // if(list){
        //     for(let i = 0;i<list.length;i++){
        //         let heroInfo = new HeroInfo();
        //         let info = list[i];
        //         heroInfo.exclusive_equip_stage = info.exclusive_equip_stage;
        //         heroInfo.hero_level = info.hero_level;
        //         heroInfo.hero_quality = info.hero_quality;
        //         heroInfo.hero_type = info.hero_type;
        //         heroInfo.pet_id = info.pet_id;
        //         heroInfo.hero_stage =info.hero_stage;
        //         for(let e=EquipType.WuQi; e<EquipType.Num; e++){
        //             heroInfo["wear"+e]=info["wear"+e];
        //         }
        //         this.hero_list.push(heroInfo);
        //     }
        // }
        // HttpManager.post(AccessName.getHeroList,this.getHeroListJsonString(),false).then((data:any)=>{
        //     if(data){
        //         this.hero_list = new Array();
        //         let list = [];
        //         data.forEach((v,k)=>{
        // let heroInfo = new HeroInfo();
        // heroInfo.hero_type=v.heroId;
        // heroInfo.hero_level=v.heroLevel;
        // heroInfo.hero_stage=v.heroStage;
        // heroInfo.exclusive_equip_stage=v.heroWeaponStage;
        // heroInfo.wear1=v.weapons;
        // heroInfo.wear2=v.armor;
        // heroInfo.wear3=v.accessories;
        // heroInfo.wear4=v.shoes;
        // heroInfo.pet_id=v.pet;
        // list.push(heroInfo)
        //         });
        //         this.hero_list = list;
        //         if(this.hero_list.length == 0){
        //             let heroInfo = new HeroInfo();
        //             heroInfo.exclusive_equip_stage = 0;
        //             heroInfo.hero_level = 1;
        //             heroInfo.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.ShouWang);
        //             heroInfo.hero_stage = 0;
        //             heroInfo.hero_type = Hero_Type.ShouWang;
        //             heroInfo.pet_id = 0;
        //             this.hero_list.push(heroInfo);
        //             let paoshou = new HeroInfo();
        //             paoshou.exclusive_equip_stage = 0;
        //             paoshou.hero_level = 1;
        //             paoshou.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.PaoShou);
        //             paoshou.hero_stage = 0;
        //             paoshou.hero_type = Hero_Type.PaoShou;
        //             paoshou.pet_id = 0;
        //             this.hero_list.push(paoshou);
        //         }
        //         // this.saveHeroList();
        //         TheStorageManager.getInstance().setJson(StorageKey.HeroList,this.hero_list);
        //         // this.loadAllHeroData();  
        //         // this.reportHeroList();
        //     }
        // });
        // else{
        //     let heroInfo = new HeroInfo();
        //     heroInfo.exclusive_equip_stage = 0;
        //     heroInfo.hero_level = 1;
        //     heroInfo.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.ShouWang);
        //     heroInfo.hero_stage = 0;
        //     heroInfo.hero_type = Hero_Type.ShouWang;
        //     heroInfo.pet_id = 0;
        //     this.hero_list.push(heroInfo);
        //     let paoshou = new HeroInfo();
        //     paoshou.exclusive_equip_stage = 0;
        //     paoshou.hero_level = 1;
        //     paoshou.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.PaoShou);
        //     paoshou.hero_stage = 0;
        //     paoshou.hero_type = Hero_Type.PaoShou;
        //     paoshou.pet_id = 0;
        //     this.hero_list.push(paoshou);
        //     this.saveHeroList();
        // }
    };
    /**
     * 获取已拥有英雄列表
     * @returns
     */
    HeroManager.prototype.getHeroList = function () {
        return this.hero_list;
    };
    // 增加一个英雄信息
    HeroManager.prototype.addHero = function (heroType) {
        var heroInfo = new HeroConfig_1.HeroInfo();
        heroInfo.hero_type = heroType;
        heroInfo.hero_level = 1;
        heroInfo.hero_quality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(heroType);
        heroInfo.pet_id = 0;
        heroInfo.hero_stage = 0;
        heroInfo.exclusive_equip_stage = 0;
        this.hero_list.push(heroInfo);
        this.saveHeroList();
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计收集X个英雄);
    };
    /**
     * 查询英雄数据
     * @param heroType 英雄类型
     * @returns
     */
    HeroManager.prototype.getHeroInfo = function (heroType) {
        // return this.hero_level[heroType-1];
        var index = -1;
        this.hero_list.forEach(function (v, k) {
            if (v.hero_type == heroType) {
                index = k;
            }
        });
        if (index < 0) {
            return null;
        }
        return this.hero_list[index];
    };
    /**英雄等级 */
    HeroManager.prototype.getHeroLevel = function (heroType) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        return info.hero_level;
    };
    /**增加英雄等级 */
    HeroManager.prototype.addHeroLevel = function (heroType) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        info.hero_level++;
        if (info.hero_level == 10) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.将任意X名英雄升到10级);
        }
        if (info.hero_level > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.累计1个英雄升到X级)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计1个英雄升到X级);
        }
        if (info.hero_level >= HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(heroType)) {
            info.hero_level = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(heroType);
        }
        this.saveHeroList();
    };
    /**重置英雄等级 */
    HeroManager.prototype.resetHeroLvel = function (heroType) {
        var info = this.getHeroInfo(heroType);
        info.hero_level = 1;
        this.saveHeroList();
    };
    /**英雄品质 */
    HeroManager.prototype.getHeroQuality = function (heroType) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        return info.hero_quality;
    };
    /**
     * 获取英雄的专武等级
     * @param heroType 英雄类型
     * @returns
     */
    HeroManager.prototype.getExclusiveEquipLevel = function (heroType) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        return info.exclusive_equip_stage;
    };
    /**
     * 增加英雄的专武等级
     * @param heroType 英雄类型
     */
    HeroManager.prototype.addExclusiveEquipLevel = function (heroType) {
        var info = this.getHeroInfo(heroType);
        info.exclusive_equip_stage++;
        this.saveHeroList();
    };
    /**
     * 设置英雄的专武等级
     * @param heroType 英雄类型
     * @param num 设置的等级
     */
    HeroManager.prototype.setExclusiveEquipLevel = function (heroType, num) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        info.exclusive_equip_stage = num;
        this.saveHeroList();
    };
    /**
     * 获取英雄的阶段
     * @param heroType
     * @returns
     */
    HeroManager.prototype.getHeroStage = function (heroType) {
        var info = this.getHeroInfo(heroType);
        if (info == null)
            return null;
        return info.hero_stage;
    };
    HeroManager.prototype.addHeroStage = function (heroType) {
        var info = this.getHeroInfo(heroType);
        info.hero_stage++;
        if (heroType == HeroConfig_1.Hero_Type.PaoShou && info.hero_stage == 6) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.将炮手升至1大星);
        }
        if (info.hero_stage % 6 == 0
            && Math.floor(info.hero_stage / 6) > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.累计1个英雄升到X星)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计1个英雄升到X星);
        }
        if (info.hero_stage >= HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(heroType)) {
            info.hero_stage = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(heroType);
        }
        this.saveHeroList();
    };
    HeroManager.prototype.checkCanAddHeroStage = function (heroType) {
        return true;
    };
    //只有更改的时候再保存到文件，减少文件读取次数
    // public addHeroLevel(heroType:Hero_Type,level:number)
    // {
    //     let info = this.getHeroInfo(heroType);
    //     let nowLevel=info.hero_level+level;
    //     if(nowLevel<=LevelUpManager.getMaxLevel())
    //         this.saveHeroLevel(heroType,nowLevel);
    // }
    // public saveHeroLevel(heroType:Hero_Type,level:number)
    // {        
    //     if(level>LevelUpManager.getMaxLevel())
    //     {
    //         level=LevelUpManager.getMaxLevel();
    //     }
    //     let info = this.getHeroInfo(heroType);
    //     info.hero_level=level;
    //     this.saveHeroList();            
    // }
    HeroManager.prototype.getTeamList = function (type) {
        var team = new Array();
        for (var i = 0; i < 5; i++) {
            team.push(-1);
        }
        var teamStr = cc.sys.localStorage.getItem('team_list_' + type);
        if (teamStr === "" || teamStr === null) {
            if (type == Constants_1.GameMode.Main) {
                // team[1]=(Hero_Type.DeLuYi);
                // team[2]=(Hero_Type.ShouWang);
                // team[3]=(Hero_Type.PaoShou);
                team[2] = (HeroConfig_1.Hero_Type.ShouWang);
                this.saveTeamList(type, team);
            }
            else {
                team = this.getTeamList(Constants_1.GameMode.Main);
            }
        }
        else {
            var list = teamStr.split(',');
            for (var i = 0; i < list.length; i++) {
                var heroType = parseInt(list[i]);
                var isJoin = heroType > 0 && this.getHeroLevel(heroType) > 0;
                team[i] = isJoin ? heroType : -1;
            }
        }
        return team;
    };
    HeroManager.prototype.saveTeamList = function (type, temp) {
        cc.sys.localStorage.setItem('team_list_' + type, temp.toString());
    };
    //加载所有的英雄数据
    HeroManager.prototype.loadAllHeroData = function () {
        //需要根据军衔等级，装备等级，英雄等级
        this.hero_data = new Map();
        var heroList = HeroManager.getInstance().getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            this.loadHeroData(heroList[i].hero_type);
        }
    };
    HeroManager.prototype.loadHeroData = function (heroType) {
        // if(this.getHeroLevel(heroType)<=0){
        //     return null;
        // }
        var localHD = this.hero_data.get(heroType);
        if (!localHD) {
            localHD = new HeroData_1.HeroData();
        }
        // 宠物属性定义
        var petAtk = 0, petDefence = 0, petHealth = 0, petHit = 0, petMiss = 0, petCritical = 0, petAntiCritical = 0, petExtraCritical = 0, petAntiExtraCritical = 0;
        // 专属武器的加成
        var exHp = 0, exAttack = 0, exDefense = 0;
        //--固定属性
        var attributeData = HeroAttribute_1.HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroType, this.getHeroStage(heroType));
        var heroInfo = this.getHeroInfo(heroType);
        localHD.fixed_hp = (heroInfo.hero_level * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroInfo.hero_level * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroInfo.hero_level * attributeData.GrowthDefense) + attributeData.BaseDefense;
        // 专属武器数据获取
        var exStage = this.getExclusiveEquipLevel(heroType);
        if (exStage > 0) {
            var exJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroType, exStage);
            exHp = (exJsonData.Health) * localHD.fixed_hp;
            exAttack = (exJsonData.Attack) * localHD.fixed_attck;
            exDefense = (exJsonData.Defense) * localHD.fix_defense;
        }
        // 宠物数据获取
        var petId = HeroManager.getInstance().getWearPet(heroType);
        if (petId != 0) {
            var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            petAtk = petInfo.Attack;
            petDefence = petInfo.Defense;
            petHealth = petInfo.Health;
            petHit = petInfo.Hit;
            petMiss = petInfo.Miss;
            petCritical = petInfo.Critical;
            petAntiCritical = petInfo.AntiCritical;
            petExtraCritical = petInfo.ExtraCritical;
            petAntiExtraCritical = petInfo.AntiExtraCritical;
        }
        localHD.pet_id = petId;
        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;
        // 攻速
        var HBIM = HeroBaseInfo_1.HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1 / HBIM.getBaseSpeed(heroType);
        localHD.gongji_jiange = 1 / HBIM.getBaseSpeed(heroType);
        localHD.atkSpeed = HBIM.getBaseSpeed(heroType);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroType);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroType);
        // 武器加成
        var allWeaponHp = 0, allWeaponAtk = 0, allWeaponDefence = 0;
        for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
            var weaponInfo = heroInfo["wear" + i];
            if (weaponInfo != 0) {
                var weaponData = EquipmentManager_1.EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                allWeaponAtk += weaponData[0];
                allWeaponDefence += weaponData[1];
                allWeaponHp += weaponData[2];
            }
        }
        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk + exAttack;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth + exHp;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence + exDefense;
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType, heroInfo.hero_stage) + 1;
        localHD.ColdDown = new Map();
        localHD.SkillValue_x = new Map();
        localHD.SkillValue_y = new Map();
        localHD.SkillValue_z = new Map();
        localHD.SkillValue_4 = new Map();
        localHD.unlock_state = new Map();
        for (var s = 1; s <= 4; s++) {
            var jsonData = SkillConfiguration_1.SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroType, s, star);
            if (jsonData == null)
                continue;
            localHD.SkillValue_x.set(s, jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s, jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s, jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s, jsonData.SkillValue_4);
            localHD.ColdDown.set(s, jsonData.ColdDown);
            localHD.unlock_state.set(s, heroInfo.hero_level >= SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(s));
        }
        for (var s = 1; s <= 4; s++) {
            if (exStage > 0) {
                var exId = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getId(heroType, exStage);
                var exStar = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getStar(exId);
                var exSkillId = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getId(heroType, exStar + 1);
                var jsonData = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(exSkillId);
                if (jsonData == null)
                    continue;
                localHD["ExclusiveWeaponSkillValue_" + s] = jsonData["ExclusiveWeaponSkillValue_" + s];
            }
        }
        this.hero_data.set(heroType, localHD);
        return localHD;
        //localHD=this.getBaseHeroData(i);
        // //攻击范围
        // let heroStage=this.getHeroStage(heroType);
        // //let heroQuality=this.getHeroQuality(heroType);
        // //let heroTier=HeroQualityManager.getInstance().getTier(heroQuality);
        // let hamId=HeroAttributeManager.getId(heroType,heroStage);
        // let jsonHAM=HeroAttributeManager.getInstance().getJsonHeroAttribute(hamId);
        // //-------------------------------攻击攻速暴击爆率等--------------------------
        // //攻击力,基本攻击
        // let baseGJ=jsonHAM.Attack;
        // let equipAttack=0;
        // /**额外百分比攻速 */
        // let equipAttackSpeed= 0 ;
        // /**防御力 */
        // let equipDefense = 0 ;
        // /**生命值 */
        // let equipHealth = 0 ;
        // let eim=EquipmentManager.getInstance();
        // let eam=EquipmentAttributeManager.getInstance();
        // for(let i=EquipType.WuQi; i<EquipType.Num; i++)
        // {
        //     let wearEquipInfo=eim.getNewWearEquipment(heroType,i);
        //     if(wearEquipInfo)
        //     {
        //         let jsonData=eam.getJsonEquipmentAttribute(wearEquipInfo.equip_id);
        //         //这里是相加
        //         equipAttack+=jsonData.Attack;
        //         equipAttackSpeed+=jsonData.AttackSpeed;
        //         equipDefense+=jsonData.Defense;
        //         equipHealth+=jsonData.Health;
        //     }
        // }
        // //宠物加成
        // let petGJ=0;
        // let peDefense=0;
        // let petHealth=0;
        // let petMiss=0;
        // let petCritical=0;
        // let petExtraCritical=0;
        // let petAntiCritical=0;
        // let petAntiExtraCritical=0;
        // let petHit=0;
        // //
        // if(localHD.pet_info){
        //     let petData=PetManager.getInstance().getPetData(localHD.pet_info);
        //     petGJ=petData.Attack;
        //     peDefense=petData.Defense;
        //     petHealth=petData.Health;
        //     petMiss=petData.Miss;
        //     petCritical=petData.Critical;
        //     petExtraCritical=petData.ExtraCritical;
        //     petAntiCritical=petData.AntiCritical;
        //     petAntiExtraCritical=petData.AntiExtraCritical;
        //     petHit=petData.Hit;
        // }
        // //专属武器加成(%,除了暴击值和命中值是具体数值，其他的都是百分比数值)
        // let exGJ=0;
        // let exDefense=0;
        // let exHealth=0;
        // let exMiss=0;
        // let exCritical=0;
        // let exExtraCritical=0;
        // let exAntiCritical=0;
        // let exAntiExtraCritical=0;
        // let exHit=0;
        // //专武等级
        // localHD.hero_info = this.getHeroInfo(heroType);
        // if(localHD.hero_info.exclusive_equip_level>=0){
        //     let exId=ExclusiveEnhancementManager.getId(heroType,localHD.hero_info.exclusive_equip_level);
        //     let exJsonData=ExclusiveEnhancementManager.getInstance().getJsonExclusiveEnhancement(exId);
        //     exGJ=exJsonData.Attack;
        //     exDefense=exJsonData.Defense;
        //     exHealth=exJsonData.Health;
        //     exMiss=exJsonData.Miss;
        //     exCritical=exJsonData.Critical;
        //     exExtraCritical=exJsonData.ExtraCritical;
        //     exAntiCritical=exJsonData.AntiCritical;
        //     exAntiExtraCritical=exJsonData.AntiExtraCritical;
        //     exHit=exJsonData.Hit;
        //     //专武技能参数            
        //     let skillId=ExclusiveWeaponSkillManager.getId(ExclusiveWeaponSkillManager.getInstance().getExStage(localHD.hero_info.exclusive_equip_level),heroType);
        //     let exSkillJsonData=ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(skillId);
        //     localHD.ExclusiveWeaponSkillValue_1=exSkillJsonData.ExclusiveWeaponSkillValue_1;
        //     localHD.ExclusiveWeaponSkillValue_2=exSkillJsonData.ExclusiveWeaponSkillValue_2;
        //     localHD.ExclusiveWeaponSkillValue_3=exSkillJsonData.ExclusiveWeaponSkillValue_3;
        //     localHD.ExclusiveWeaponSkillValue_4=exSkillJsonData.ExclusiveWeaponSkillValue_4;
        // }
        // //攻击力=基础攻击力*（%+%）
        // //固定攻击力        
        // let totalGJ=(baseGJ+equipAttack+petGJ);
        // let fixAttack=totalGJ;
        // localHD.fixed_attck=fixAttack;
        // totalGJ+=totalGJ*(exGJ);
        // localHD.total_attack=Math.round(totalGJ);
        // localHD.Attack=localHD.total_attack;        
        // //基础攻击速度*（装备%+装备附加%）,这里得到的值是每秒攻击次数
        // //let talentGS=TalentManager.getInstance().getTalentData(TalentType.AttSpeed);
        // let attSpeed=HeroBaseInfoManager.getInstance().getBaseSpeed(heroType);
        // localHD.base_jiange=1/attSpeed;
        // //直接加天赋的
        // attSpeed+=attSpeed*((equipAttackSpeed)/100);
        // //转换成多少秒攻击一次,即攻击间隔
        // localHD.gongji_jiange=1/attSpeed;        
        // //防御力
        // let baseDefense=jsonHAM.Defense;
        // localHD.Defense=baseDefense+peDefense+equipDefense;
        // localHD.Defense+=localHD.Defense*(exDefense);
        // //生命值
        // let baseHp=jsonHAM.Health;
        // localHD.fixed_hp=baseHp+petHealth+equipHealth;
        // localHD.total_hp=localHD.fixed_hp+localHD.fixed_hp*(exHealth);
        // localHD.Health=localHD.total_hp;
        // //命中值
        // let baseHit=jsonHAM.Hit;
        // localHD.Hit=baseHit+petHit+exHit;
        // //闪避值
        // let baseMiss=jsonHAM.Miss;
        // localHD.Miss=baseMiss+petMiss;
        // localHD.Miss+=localHD.Miss*(exMiss);
        // //暴击值
        // let baseCritical=jsonHAM.Critical;
        // localHD.Critical=baseCritical+petCritical+exCritical;
        // //暴击增幅
        // let baseExtraCritical=jsonHAM.ExtraCritical;
        // localHD.ExtraCritical=baseExtraCritical+petExtraCritical;
        // localHD.ExtraCritical+=localHD.ExtraCritical*(exExtraCritical);
        // //防暴值
        // let baseAntiCritical=jsonHAM.AntiCritical;
        // localHD.AntiCritical=baseAntiCritical+petAntiCritical;
        // localHD.AntiCritical+=localHD.AntiCritical*(exAntiCritical);
        // //暴击抗性
        // let baseAntiExtraCritical=jsonHAM.AntiExtraCritical;
        // localHD.AntiExtraCritical=baseAntiExtraCritical+petAntiExtraCritical;
        // localHD.AntiExtraCritical+=localHD.AntiExtraCritical*(exAntiExtraCritical);
        // //
        // localHD.ColdDown=new Map<number,number>();
        // localHD.SkillValue_x=new Map<number,number>();
        // localHD.SkillValue_y=new Map<number,number>();
        // localHD.SkillValue_z=new Map<number,number>();
        // localHD.SkillValue_4=new Map<number,number>();        
        // //3个技能槽的
        // for(let s=1; s<=3; s++){
        //     let skillLevel=SkillLevelUnlockManager.getInstance().getSkillLevel(s,heroStage);
        //     if(skillLevel>0){
        //         let skillId=SkillLevelUnlockManager.getId(s,skillLevel);
        //         let skillLevelId=SkillConfigurationManager.getId(heroType,skillId);
        //         let jsonData=SkillConfigurationManager.getInstance().getJsonSkillConfiguration(skillLevelId);
        //         localHD.SkillValue_x.set(s,jsonData.SkillValue_1);
        //         localHD.SkillValue_y.set(s,jsonData.SkillValue_2);
        //         localHD.SkillValue_z.set(s,jsonData.SkillValue_3);
        //         localHD.SkillValue_4.set(s,jsonData.SkillValue_4);
        //         localHD.ColdDown.set(s,jsonData.ColdDown);
        //     }else{
        //     }
        // }
        // this.hero_data.set(heroType,localHD);
        // return localHD;
    };
    HeroManager.prototype.getTryPlayHeroData = function (heroInfo) {
        var localHD = new HeroData_1.HeroData();
        // 宠物属性定义
        var petAtk = 0, petDefence = 0, petHealth = 0, petHit = 0, petMiss = 0, petCritical = 0, petAntiCritical = 0, petExtraCritical = 0, petAntiExtraCritical = 0;
        // 专属武器的加成
        var exHp = 0, exAttack = 0, exDefense = 0;
        //--固定属性
        var attributeData = HeroAttribute_1.HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroInfo.hero_type, heroInfo.hero_stage);
        localHD.fixed_hp = (heroInfo.hero_level * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroInfo.hero_level * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroInfo.hero_level * attributeData.GrowthDefense) + attributeData.BaseDefense;
        // 专属武器数据获取
        var exStage = heroInfo.exclusive_equip_stage;
        if (exStage > 0) {
            var exJsonData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroInfo.hero_type, exStage);
            exHp = (exJsonData.Health) * localHD.fixed_hp;
            exAttack = (exJsonData.Attack) * localHD.fixed_attck;
            exDefense = (exJsonData.Defense) * localHD.fix_defense;
        }
        // 宠物数据获取
        var petId = heroInfo.pet_id;
        if (petId != 0) {
            var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            petAtk = petInfo.Attack;
            petDefence = petInfo.Defense;
            petHealth = petInfo.Health;
            petHit = petInfo.Hit;
            petMiss = petInfo.Miss;
            petCritical = petInfo.Critical;
            petAntiCritical = petInfo.AntiCritical;
            petExtraCritical = petInfo.ExtraCritical;
            petAntiExtraCritical = petInfo.AntiExtraCritical;
        }
        localHD.pet_id = petId;
        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;
        // 攻速
        var HBIM = HeroBaseInfo_1.HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1 / HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.gongji_jiange = 1 / HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.atkSpeed = HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroInfo.hero_type);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroInfo.hero_type);
        // 武器加成
        var allWeaponHp = 0, allWeaponAtk = 0, allWeaponDefence = 0;
        for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
            var weaponInfo = heroInfo["wear" + i];
            if (weaponInfo != 0) {
                var weaponData = EquipmentManager_1.EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                allWeaponAtk += weaponData[0];
                allWeaponDefence += weaponData[1];
                allWeaponHp += weaponData[2];
            }
        }
        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk + exAttack;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth + exHp;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence + exDefense;
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroInfo.hero_type, heroInfo.hero_stage) + 1;
        localHD.ColdDown = new Map();
        localHD.SkillValue_x = new Map();
        localHD.SkillValue_y = new Map();
        localHD.SkillValue_z = new Map();
        localHD.SkillValue_4 = new Map();
        localHD.unlock_state = new Map();
        for (var s = 1; s <= 4; s++) {
            var jsonData = SkillConfiguration_1.SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroInfo.hero_type, s, star);
            if (jsonData == null)
                continue;
            localHD.SkillValue_x.set(s, jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s, jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s, jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s, jsonData.SkillValue_4);
            localHD.ColdDown.set(s, jsonData.ColdDown);
            localHD.unlock_state.set(s, heroInfo.hero_level >= SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(s));
        }
        for (var s = 1; s <= 4; s++) {
            if (exStage > 0) {
                var exId = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getId(heroInfo.hero_type, exStage);
                var exStar = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getStar(exId);
                var exSkillId = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getId(heroInfo.hero_type, exStar + 1);
                var jsonData = ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(exSkillId);
                if (jsonData == null)
                    continue;
                localHD["ExclusiveWeaponSkillValue_" + s] = jsonData["ExclusiveWeaponSkillValue_" + s];
            }
        }
        return localHD;
    };
    HeroManager.prototype.getTargetHeroData = function (heroType, stage, level) {
        var localHD = new HeroData_1.HeroData();
        var heroLevel = level;
        // 宠物属性定义
        var petAtk = 0, petDefence = 0, petHealth = 0, petHit = 0, petMiss = 0, petCritical = 0, petAntiCritical = 0, petExtraCritical = 0, petAntiExtraCritical = 0;
        //--固定属性
        var attributeData = HeroAttribute_1.HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroType, stage);
        localHD.fixed_hp = (heroLevel * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroLevel * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroLevel * attributeData.GrowthDefense) + attributeData.BaseDefense;
        // 武器&宠物加成
        var heroInfo = HeroManager.getInstance().getHeroInfo(heroType);
        var allWeaponHp = 0, allWeaponAtk = 0, allWeaponDefence = 0;
        if (heroInfo != null) {
            var petId = HeroManager.getInstance().getWearPet(heroType);
            if (petId != 0) {
                var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
                petAtk = petInfo.Attack;
                petDefence = petInfo.Defense;
                petHealth = petInfo.Health;
                petHit = petInfo.Hit;
                petMiss = petInfo.Miss;
                petCritical = petInfo.Critical;
                petAntiCritical = petInfo.AntiCritical;
                petExtraCritical = petInfo.ExtraCritical;
                petAntiExtraCritical = petAntiExtraCritical;
            }
            localHD.pet_id = petId;
            for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
                var weaponInfo = heroInfo["wear" + i];
                if (weaponInfo != 0) {
                    var weaponData = EquipmentManager_1.EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                    allWeaponAtk += weaponData[0];
                    allWeaponDefence += weaponData[1];
                    allWeaponHp += weaponData[2];
                }
            }
        }
        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;
        // 攻速
        var HBIM = HeroBaseInfo_1.HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1 / HBIM.getBaseSpeed(heroType);
        localHD.gongji_jiange = 1 / HBIM.getBaseSpeed(heroType);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroType);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroType);
        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence;
        // --总值
        // localHD.Attack=localHD.total_attack = localHD.fixed_attck ;
        // localHD.Health=localHD.total_hp = localHD.fixed_hp ;
        // localHD.Defense=localHD.total_defense = localHD.fix_defense ;
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType, stage) + 1;
        localHD.ColdDown = new Map();
        localHD.SkillValue_x = new Map();
        localHD.SkillValue_y = new Map();
        localHD.SkillValue_z = new Map();
        localHD.SkillValue_4 = new Map();
        for (var s = 1; s <= 4; s++) {
            var jsonData = SkillConfiguration_1.SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroType, s, star);
            if (jsonData == null)
                continue;
            localHD.SkillValue_x.set(s, jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s, jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s, jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s, jsonData.SkillValue_4);
            localHD.ColdDown.set(s, jsonData.ColdDown);
        }
        // this.hero_data.set(heroType,localHD);
        return localHD;
    };
    HeroManager.prototype.getHeroData = function (heroType) {
        return this.hero_data.get(heroType);
    };
    HeroManager.prototype.getDeepHeroData = function (heroType) {
        var data = new HeroData_1.HeroData();
        var temp = this.hero_data.get(heroType);
        data.total_attack = temp.total_attack;
        data.total_defense = temp.total_defense;
        data.total_hp = temp.total_hp;
        data.Hit = temp.Hit;
        data.Miss = temp.Miss;
        data.Critical = temp.Critical;
        data.AntiCritical = temp.AntiCritical;
        data.ExtraCritical = temp.ExtraCritical;
        data.AntiExtraCritical = temp.AntiExtraCritical;
        return data;
    };
    HeroManager.prototype.changeBindPet = function (heroType, petInfo) {
        if (this.hero_data.get(heroType)) {
            this.hero_data.get(heroType).pet_info = petInfo;
            //this.hero_data.get(heroType).pet_info.sequence_id=123;
        }
    };
    HeroManager.prototype.refreshHeroData = function (heroType) {
        this.loadHeroData(heroType);
    };
    //获取战力
    HeroManager.prototype.getAllHeroZhanli = function () {
        var num = 0;
        var list = this.getHeroList();
        for (var i = 0; i < list.length; i++) {
            num += Math.floor(this.getHeroZhanli(list[i].hero_type));
        }
        return num;
    };
    HeroManager.prototype.getHeroZhanli = function (heroType) {
        this.refreshHeroData(heroType);
        var heroData = this.hero_data.get(heroType);
        var zhanli = heroData.total_hp * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(1)
            + heroData.total_attack * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(2)
            + heroData.total_defense * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(3)
            + heroData.Hit * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(4)
            + heroData.Miss * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(5)
            + (heroData.Critical - 100) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(6)
            + heroData.AntiCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(7)
            + (heroData.ExtraCritical - 2) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(8)
            + heroData.AntiExtraCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(9);
        return zhanli;
    };
    HeroManager.prototype.getTargetHeroZhanli = function (heroType, stage, level) {
        var heroData = this.getTargetHeroData(heroType, stage, level);
        var zhanli = heroData.total_hp * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(1)
            + heroData.total_attack * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(2)
            + heroData.total_defense * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(3)
            + heroData.Hit * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(4)
            + heroData.Miss * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(5)
            + (heroData.Critical - 100) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(6)
            + heroData.AntiCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(7)
            + (heroData.ExtraCritical - 2) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(8)
            + heroData.AntiExtraCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(9);
        return zhanli;
    };
    HeroManager.prototype.getNewDayZhanli = function () {
        var num = cc.sys.localStorage.getItem('today_zhanli_');
        if (num === "" || num === null) {
            num = this.getAllHeroZhanli();
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    HeroManager.getHeroIsNeedTip = function (heroType) {
        var isTip = false;
        var num = cc.sys.localStorage.getItem('hero_get_tip_' + heroType);
        if (num === "" || num === null) {
            isTip = true;
        }
        else {
            isTip = false;
        }
        return isTip;
    };
    HeroManager.setHeroIsNeedTip = function (heroType) {
        cc.sys.localStorage.setItem('hero_get_tip_' + heroType, 1);
    };
    HeroManager.getSkinIndex = function (tier) {
        switch (tier) {
            case 1: {
                return 1;
            }
            case 2: {
                return 2;
            }
            case 3: {
                return 4;
            }
            case 4: {
                return 7;
            }
            case 5: {
                return 10;
            }
            case 6: {
                return 11;
            }
        }
    };
    /**
    * 获得一个上阵的随机英雄
    * @param mode 游戏模式
    * @param exId 排除的id
    * @returns 除exId之外的id
    */
    HeroManager.prototype.getRandHeroId = function (mode, exId, teamList) {
        if (exId === void 0) { exId = HeroConfig_1.Hero_Type.NULL; }
        //随机英雄
        if (!teamList)
            teamList = this.getTeamList(mode);
        var randList = [];
        for (var i = 0; i < teamList.length; i++) {
            var id = teamList[i];
            if (id > HeroConfig_1.Hero_Type.NULL) {
                if (id != exId) {
                    randList.push(teamList[i]);
                }
            }
        }
        var heroId = 0;
        if (randList.length > 0) {
            heroId = randList[Math.floor(Math.random() * randList.length)];
        }
        return heroId;
    };
    //*******************************----------------装备-------------------************************************************ */
    /**
     * 穿戴一个装备,equipId为0时，请务必把equipType写上
     * @param heroType 英雄id
     * @param equipId 装备id
     * @param equipType 装备位
     */
    HeroManager.prototype.addWearEquipment = function (heroType, equipId, equipType) {
        if (!equipType) {
            equipType = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId);
        }
        //需要遍历装备列表，获取hero_type变量
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.为任意X名英雄穿戴1件装备);
        this.getHeroInfo(heroType)["wear" + equipType] = equipId;
        GameManager_1.default.getInstance().refreshZhanliShow();
        EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.EQUIP_WEAR_UNLOAD);
        this.saveHeroList();
    };
    /**
     * 卸下一个装备
     * @param heroType 英雄id
     * @param equipPos 装备位
     */
    HeroManager.prototype.unloadWearEquipment = function (heroType, equipType) {
        //需要遍历装备列表，获取hero_type变量
        this.getHeroInfo(heroType)["wear" + equipType] = 0;
        GameManager_1.default.getInstance().refreshZhanliShow();
        EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.EQUIP_WEAR_UNLOAD);
    };
    /**获得正在装备的装备id */
    HeroManager.prototype.getWearEquipment = function (heroType, equipType) {
        return this.getHeroInfo(heroType)["wear" + equipType];
    };
    /**获取剩余的装备数量 */
    HeroManager.prototype.getEquipmentRemainNum = function (equipInfo) {
        var num = equipInfo.equip_num;
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(equipInfo.equip_id);
        var heroList = this.getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            if (heroList[i]["wear" + type] == equipInfo.equip_id) {
                num--;
            }
        }
        return num;
    };
    /**获取一个装备id被装备的英雄列表 */
    HeroManager.prototype.getWearEquipmentHeroList = function (equipInfo) {
        var list = [];
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(equipInfo.equip_id);
        var heroList = this.getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            var heroInfo = heroList[i];
            if (heroInfo["wear" + type] == equipInfo.equip_id) {
                list.push(heroInfo.hero_type);
            }
        }
        return list;
    };
    // --------------------------------------宠物---------------------------------------------
    /**
     * 穿戴一个宠物,equipId为0时，请务必把equipType写上
     * @param heroType 英雄id
     * @param petId 装备id
     * @param equipType 装备位
     */
    HeroManager.prototype.addWearPet = function (heroType, petId) {
        //需要遍历装备列表，获取hero_type变量
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.为任意X名英雄穿戴1件装备);
        this.getHeroInfo(heroType).pet_id = petId;
        GameManager_1.default.getInstance().refreshZhanliShow();
        // EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
        this.saveHeroList();
    };
    /**
     * 卸下一个装备
     * @param heroType 英雄id
     * @param equipPos 装备位
     */
    HeroManager.prototype.unloadWearPet = function (heroType) {
        //需要遍历装备列表，获取hero_type变量
        this.getHeroInfo(heroType).pet_id = 0;
        GameManager_1.default.getInstance().refreshZhanliShow();
        // EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
    };
    /**获得正在装备的装备id */
    HeroManager.prototype.getWearPet = function (heroType) {
        return this.getHeroInfo(heroType).pet_id;
    };
    /**获取剩余的装备数量 */
    HeroManager.prototype.getPetRemainNum = function (petInfo) {
        var num = petInfo.pet_num;
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(petInfo.pet_id);
        var heroList = this.getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            if (heroList[i]["wear" + type] == petInfo.pet_id) {
                num--;
            }
        }
        return num;
    };
    /**获取一个装备id被装备的英雄列表 */
    HeroManager.prototype.getWearPetHeroList = function (petInfo) {
        var list = [];
        var heroList = this.getHeroList();
        for (var i = 0; i < heroList.length; i++) {
            var heroInfo = heroList[i];
            if (heroInfo.pet_id == petInfo.pet_id) {
                list.push(heroInfo.hero_type);
            }
        }
        return list;
    };
    /**检查是否可以升级 */
    HeroManager.prototype.checkUpgrade = function (heroType) {
        // let heroQuality = this.getHeroQuality(heroType);
        var upData = new HeroUpgradeData();
        if (this.getHeroLevel(heroType) == HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(heroType))
            return upData;
        var coinHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin);
        var coinNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostCoin(this.getHeroLevel(heroType));
        var gemHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem);
        var gemNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostGem(this.getHeroLevel(heroType));
        var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var needFinishLevel = LevelUp_1.LevelUpManager.getInstance().getLevelLimit(this.getHeroLevel(heroType));
        // 升级按钮置灰，优先关卡置灰(即在金币足够的情况下，通过关卡没达到要求则按钮置灰)。
        // 如果是以为金币不足置灰则点击升级按钮弹出资源不足弹窗，如果是关卡限制置灰，点击升级按钮则提示通过关卡不足飘字提醒
        upData.is_can_up = coinHaveNum >= coinNeedNum && finishLevel >= needFinishLevel && gemHaveNum >= gemNeedNum;
        return upData;
    };
    /**检查是否可以升星 */
    HeroManager.prototype.checkUpStar = function (heroType) {
        var heroInfo = this.getHeroInfo(heroType);
        if (!heroInfo) {
            return false;
        }
        var curStage = this.getHeroStage(heroType);
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        var needNum = HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(this.getHeroQuality(heroType), curStage);
        return haveNum >= needNum && curStage < HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(heroType);
    };
    /**检查是否可以使用万能碎片 */
    HeroManager.prototype.checkAllPurposeFragment = function (heroType) {
        var heroInfo = this.getHeroInfo(heroType);
        if (!heroInfo) {
            return false;
        }
        var curStage = this.getHeroStage(heroType);
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        var needNum = HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(this.getHeroQuality(heroType), curStage);
        var offsetNum = needNum - haveNum;
        return haveNum < needNum && curStage < HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(heroType) && PropManager_1.PropManager.getInstance().getPropNum(this.getHeroFragmentId(heroType)) >= offsetNum;
    };
    HeroManager.prototype.getHeroFragmentId = function (heroId) {
        //品质
        var quality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(heroId);
        return 101000 + quality;
    };
    /**检测英雄是否可以解锁 */
    HeroManager.prototype.checkUnlock = function (heroType) {
        var heroInfo = this.getHeroInfo(heroType);
        if (heroInfo) {
            return false;
        }
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        var needNum = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getUnlockFragmentNum(heroType);
        if (haveNum >= needNum) {
            return true;
        }
        else {
            var offsetNum = needNum - haveNum;
            return PropManager_1.PropManager.getInstance().getPropNum(this.getHeroFragmentId(heroType)) >= offsetNum;
        }
    };
    HeroManager.prototype.checkExUp = function (heroType) {
        var heroInfo = this.getHeroInfo(heroType);
        if (heroInfo) {
            var ewShowData = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(heroType);
            if (heroInfo.exclusive_equip_stage >= ewShowData.MaxStage) {
                return false;
            }
            var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(heroType);
            var needNum = EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
            var haveNum = PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
            return haveNum >= needNum;
        }
        return false;
    };
    HeroManager.prototype.getExclusiveWeaponData = function (heroType, stage) {
        var info = new HeroData_1.HeroData();
        var heroData = this.getHeroData(heroType);
        var exData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroType, stage);
        if (exData == null)
            return null;
        info.total_hp = heroData.fixed_hp * exData.Health;
        info.total_attack = heroData.fixed_attck * exData.Attack;
        info.total_defense = heroData.fix_defense * exData.Defense;
        return info;
    };
    HeroManager.prototype.getExclusiveWeaponCombbat = function (heroType, stage) {
        var num = 0;
        var exData = this.getExclusiveWeaponData(heroType, stage);
        if (exData != null) {
            num = exData.total_hp * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(1)
                + exData.total_attack * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(2)
                + exData.total_defense * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(3);
        }
        return num;
    };
    /**检测专武能否升级 */
    HeroManager.prototype.checkExclusive = function (heroType) {
        var data = new HeroExclusiveData();
        // let weaponData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(heroType,this.getHeroInfo(heroType).exclusive_equip_level);
        // data.cost_prop_id=weaponData.SpendPropID
        // data.cur_prop_num=PropManager.getInstance().getPropNum(data.cost_prop_id);
        // data.cost_prop_num=weaponData.SpendPropNum;
        // data.is_can_up=data.cur_prop_num>=data.cost_prop_num;
        return data;
    };
    /**通过红点类型获取英雄类型 */
    HeroManager.getHeroTypeByRedType = function (redType) {
        var heroType = HeroConfig_1.Hero_Type.ChangMaoShou;
        switch (redType) {
            case EventManager_1.RedEventType.Btn_Role_List_1:
                heroType = HeroConfig_1.Hero_Type.ChangMaoShou;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_2:
                heroType = HeroConfig_1.Hero_Type.ShouWang;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_3:
                heroType = HeroConfig_1.Hero_Type.PaoShou;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_4:
                heroType = HeroConfig_1.Hero_Type.DeLuYi;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_5:
                heroType = HeroConfig_1.Hero_Type.KuangZhanShi;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_6:
                heroType = HeroConfig_1.Hero_Type.ZhenDe;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_7:
                heroType = HeroConfig_1.Hero_Type.NvWu;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_8:
                heroType = HeroConfig_1.Hero_Type.GongJianShou;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_9:
                heroType = HeroConfig_1.Hero_Type.BingNv;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_10:
                heroType = HeroConfig_1.Hero_Type.ANuBiSi;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_11:
                heroType = HeroConfig_1.Hero_Type.MeiMo;
                break;
            case EventManager_1.RedEventType.Btn_Role_List_12:
                heroType = HeroConfig_1.Hero_Type.LeiShen;
                break;
        }
        return heroType;
    };
    /**通过红点类型获取英雄类型 */
    HeroManager.getRedTypeByHeroType = function (heroType) {
        var redType = EventManager_1.RedEventType.Btn_Role_List_1;
        switch (heroType) {
            case HeroConfig_1.Hero_Type.ChangMaoShou:
                redType = EventManager_1.RedEventType.Btn_Role_List_1;
                break;
            case HeroConfig_1.Hero_Type.ShouWang:
                redType = EventManager_1.RedEventType.Btn_Role_List_2;
                break;
            case HeroConfig_1.Hero_Type.PaoShou:
                redType = EventManager_1.RedEventType.Btn_Role_List_3;
                break;
            case HeroConfig_1.Hero_Type.DeLuYi:
                redType = EventManager_1.RedEventType.Btn_Role_List_4;
                break;
            case HeroConfig_1.Hero_Type.KuangZhanShi:
                redType = EventManager_1.RedEventType.Btn_Role_List_5;
                break;
            case HeroConfig_1.Hero_Type.ZhenDe:
                redType = EventManager_1.RedEventType.Btn_Role_List_6;
                break;
            case HeroConfig_1.Hero_Type.NvWu:
                redType = EventManager_1.RedEventType.Btn_Role_List_7;
                break;
            case HeroConfig_1.Hero_Type.GongJianShou:
                redType = EventManager_1.RedEventType.Btn_Role_List_8;
                break;
            case HeroConfig_1.Hero_Type.BingNv:
                redType = EventManager_1.RedEventType.Btn_Role_List_9;
                break;
            case HeroConfig_1.Hero_Type.ANuBiSi:
                redType = EventManager_1.RedEventType.Btn_Role_List_10;
                break;
            case HeroConfig_1.Hero_Type.MeiMo:
                redType = EventManager_1.RedEventType.Btn_Role_List_11;
                break;
            case HeroConfig_1.Hero_Type.LeiShen:
                redType = EventManager_1.RedEventType.Btn_Role_List_12;
                break;
        }
        return redType;
    };
    HeroManager.prototype.getHeroListJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    HeroManager.prototype.setHeroListJsonString = function (heroDatas) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            heroList: heroDatas,
        });
    };
    HeroManager._instance = null;
    return HeroManager;
}());
exports.HeroManager = HeroManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1EO0FBQ25ELDhFQUFvRjtBQUNwRixxRUFBb0U7QUFDcEUsK0NBQXFEO0FBQ3JELDZDQUFtRDtBQUNuRCxxQ0FBMkM7QUFDM0MseURBQXVGO0FBQ3ZGLHVDQUFzQztBQUN0Qyx1REFBNkQ7QUFDN0QsaURBQTBFO0FBQzFFLHNEQUFxRDtBQUNyRCxvREFBK0M7QUFDL0MsMkRBQWlFO0FBRWpFLHlEQUF3RDtBQUN4RCwyREFBbUU7QUFDbkUsNEVBQWtGO0FBQ2xGLCtEQUFpRTtBQUNqRSw2REFBeUQ7QUFDekQseUNBQStDO0FBQy9DLGlEQUF5RDtBQUN6RCw2REFBbUU7QUFDbkUsc0RBQWlEO0FBQ2pELGdEQUErQztBQUMvQyxpREFBNEM7QUFDNUMsa0VBQXdFO0FBQ3hFLDREQUFrRTtBQUNsRSw0RUFBa0Y7QUFDbEYsMkNBQXNDO0FBQ3RDLDJEQUFrRjtBQUNsRixvREFBbUQ7QUFDbkQsZ0ZBQXNGO0FBRXRGLFlBQVk7QUFDWjtJQUFBO1FBQ0ksV0FBVztRQUNYLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsZ0JBQWdCO1FBQ2hCLGFBQVEsR0FBUyxLQUFLLENBQUM7UUFDdkIsYUFBYTtRQUNiLGFBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsZUFBZTtRQUNmLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsY0FBYztRQUNkLFlBQU8sR0FBUyxLQUFLLENBQUM7UUFDdEIsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLGtCQUFrQjtR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O0lBQ25CLENBQUM7SUFFTywyQ0FBcUIsR0FBN0I7UUFDSSxJQUFJLEdBQUcsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixHQUFHLEVBQUMsR0FBRztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywyQ0FBcUIsR0FBN0IsVUFBOEIsU0FBc0I7UUFDaEQsSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFDLEdBQUc7WUFDUCxRQUFRLEVBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBdDVDYyxxQkFBUyxHQUFnQixJQUFJLENBQUM7SUF1NUNqRCxrQkFBQztDQXo1Q0QsQUF5NUNDLElBQUE7QUF6NUNZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1vZGUsIElzRGVidWd9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9RdWFsaXR5TWFuYWdlciB9IGZyb20gXCIuL0hlcm9RdWFsaXR5XCI7XHJcbmltcG9ydCB7IExldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBBc3NldHNFdmVudFR5cGUsIEV2ZW50TWFuYWdlciwgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvRGF0YSB9IGZyb20gXCIuL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4vU2tpbGxMZXZlbFVubG9ja1wiO1xyXG5pbXBvcnQgeyBIZXJvQXR0cmlidXRlTWFuYWdlciwgSnNvbkhlcm9BdHRyaWJ1dGUgfSBmcm9tIFwiLi9IZXJvQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vU2tpbGxDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IFBldEluZm8sIFBldE1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbywgRXF1aXBUeXBlIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBIZXJvVGl0bGVNYW5hZ2VyIH0gZnJvbSBcIi4vSGVyb1RpdGxlXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSwgSGVyb0luZm8gfSBmcm9tIFwiLi4vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyIH0gZnJvbSBcIi4vQ29tYmF0RWZmZWN0aXZlbmVzc1wiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGV0L0RhdGEvU3Bpcml0QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEVXVW5sb2NrQ29zdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRVdVbmxvY2tDb3N0XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25Ta2lsbFwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEhlcm9PYmplY3QsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi8uLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcblxyXG4vKiroi7Hpm4TljYfnuqfmlbDmja4gKi9cclxuZXhwb3J0IGNsYXNzIEhlcm9VcGdyYWRlRGF0YXtcclxuICAgIC8qKuW9k+WJjeeahOetiee6pyAqL1xyXG4gICAgY3VyX2xldmVsOm51bWJlcj0wO1xyXG4gICAgLyoq5b2T5YmN6IO95aSf5Y2H57qn55qE5pyA5aSn57qnICovXHJcbiAgICBtYXhfbGV2ZWw6bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3nrYnnuqfmmK/lkKblj6/ku6XljYfnuqcgKi9cclxuICAgIGlzX2xldmVsOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirlvZPliY3mi6XmnInnmoTph5HluIEgKi9cclxuICAgIGN1cl9jb2luOm51bWJlcj0wO1xyXG4gICAgLyoq5Y2H57qn6ZyA6KaB6Iqx6LS555qE6YeR5biBICovXHJcbiAgICBjb3N0X2NvaW46bnVtYmVyPTA7XHJcbiAgICAvKirljYfnuqfph5HluIHmmK/lkKbotrPlpJ8gKi9cclxuICAgIGlzX2NvaW46Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8vIC8qKuW9k+WJjeaLpeacieeahOe7j+mqjCAqL1xyXG4gICAgLy8gY3VyX2V4cDpudW1iZXI9MDtcclxuICAgIC8vIC8qKuWNh+e6p+mcgOimgeiKsei0ueeahOe7j+mqjCAqL1xyXG4gICAgLy8gY29zdF9leHA6bnVtYmVyPTA7XHJcbiAgICAvLyAvKirljYfnuqfnu4/pqozmmK/lkKbotrPlpJ8gKi9cclxuICAgIC8vIGlzX2V4cDpib29sZWFuPWZhbHNlO1xyXG4gICAgLy8gLyoq5b2T5YmN5oul5pyJ55qE6L+b6Zi255+zICovXHJcbiAgICAvLyBjdXJfamluamllOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gLyoq5Y2H57qn6ZyA6KaB6Iqx6LS555qE6L+b6Zi255+zICovXHJcbiAgICAvLyBjb3N0X2ppbmppZTogbnVtYmVyID0gMDtcclxuICAgIC8vIC8qKuWNh+e6p+i/m+mYtuefs+aYr+WQpui2s+WknyAqL1xyXG4gICAgLy8gaXNfamluamllOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKbog73lpJ/ljYfnuqcgKi9cclxuICAgIGlzX2Nhbl91cDpib29sZWFuPWZhbHNlO1xyXG59XHJcbi8qKuiLsembhOS4k+atpuaVsOaNriAqL1xyXG5leHBvcnQgY2xhc3MgSGVyb0V4Y2x1c2l2ZURhdGF7XHJcbiAgICAvKirlvZPliY3mi6XmnInnmoTpgZPlhbfmlbDph48gKi9cclxuICAgIGN1cl9wcm9wX251bTpudW1iZXI9MDtcclxuICAgIC8qKuWNh+e6p+mcgOimgeeahOmBk+WFt+aVsOmHjyAqL1xyXG4gICAgY29zdF9wcm9wX251bTpudW1iZXI9MDtcclxuICAgIC8qKuWNh+e6p+mcgOimgeeahOmBk+WFt2lkICovXHJcbiAgICBjb3N0X3Byb3BfaWQ6bnVtYmVyPTA7XHJcbiAgICAvKirmmK/lkKbog73lpJ/ljYfnuqcgKi9cclxuICAgIGlzX2Nhbl91cDpib29sZWFuPWZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb01hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSGVyb01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/otYTmupBcclxuICAgIHByaXZhdGUgYnRuX2hlcm9fdGVhbTpjYy5QcmVmYWI9bnVsbDtcclxuICAgIHByaXZhdGUgYnRuX2hlcm9fcm9sZTpjYy5QcmVmYWI9bnVsbDtcclxuICAgIHByaXZhdGUgc3ByaXRlX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcbiAgICBwcml2YXRlIHNwcml0ZV9hdGxhc3M6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuICAgIC8vIHByaXZhdGUgcm9sZV9hdGxhczpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHNwX2JvZHk6TWFwPG51bWJlcixjYy5TcHJpdGVGcmFtZT49bnVsbDtcclxuICAgIHByaXZhdGUgaGVyb19mcmFnbWVudDpjYy5QcmVmYWI9bnVsbDtcclxuICAgIC8v6Iux6ZuE5pWw5o2uXHJcbiAgICBwcml2YXRlIGhlcm9fZGF0YTpNYXA8bnVtYmVyLEhlcm9EYXRhPj1udWxsO1xyXG4gICAgLy8gcHJpdmF0ZSBoZXJvX2xldmVsOm51bWJlcltdPVtdO1xyXG4gICAgLy8gcHJpdmF0ZSBoZXJvX3F1YWxpdHk6bnVtYmVyW109W107XHJcbiAgICBwcml2YXRlIGhlcm9fbGlzdDpIZXJvSW5mb1tdID0gW107XHJcblxyXG4gICAgLy8w5pif5Y+v5Y2H57qnNDDnuqfvvJsx5pif5Y+v5YiwODDnuqfvvJsy5pif5YiwMTIw57qn77ybM+aYn+WIsDE2MOe6p++8mzTmmJ/liLAyMDDnuqfvvJs15pif5YiwMjQw57qnLlxyXG4gICAgcHVibGljIGhlcm9fc3RhZ2VMaXN0OkFycmF5PG51bWJlcj49WzQwLDgwLDEyMCwxNjAsMjAwLDI0MF07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkhlcm9NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgSGVyb01hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuICAgICAgICBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgIFxyXG4gICAgICAgIEhlcm9UaXRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgXHJcbiAgICAgICAgQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICB0aGlzLmxvYWRUZWFtUHJlZmFiKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUm9sZVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZEZyYWdtZW50UHJlZmFiKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU3AoKTsgICAgIFxyXG4gICAgICAgIC8vIHRoaXMubG9hZFJvbGVTcCgpOyAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkU3BzKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQm9keSgpO1xyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLei1hOa6kOeahOivu+WPli0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcml2YXRlIGxvYWRUZWFtUHJlZmFiKCl7XHJcbiAgICAgICAgaWYodGhpcy5idG5faGVyb190ZWFtKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvYnRuX2hlcm9fdGVhbScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5faGVyb190ZWFtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRSb2xlUHJlZmFiKCl7XHJcbiAgICAgICAgaWYodGhpcy5idG5faGVyb19yb2xlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvYnRuX2hlcm9fcm9sZScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5faGVyb19yb2xlPWFzc2V0czsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRGcmFnbWVudFByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb19mcmFnbWVudClcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm9fZnJhZ21lbnQnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19mcmFnbWVudD1hc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU3AoKXtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZV9hdGxhcylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm9fbGlzdF91aScsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WKoOi9vUVxdWlwbWVudEF0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZV9hdGxhcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBsb2FkUm9sZVNwKCl7XHJcbiAgICAvLyAgICAgaWYodGhpcy5yb2xlX2F0bGFzKVxyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3Mvcm9sZV91aScsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgLy8gICAgICAgICBpZihlcnJvcilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coJ+WKoOi9vUVxdWlwbWVudEF0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJvbGVfYXRsYXM9YXNzZXRzOyAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwcygpe1xyXG4gICAgICAgIGlmKHRoaXMuc3ByaXRlX2F0bGFzcylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm8nLGNjLlNwcml0ZUF0bGFzLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVBdGxhcyk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCfliqDovb1FcXVpcG1lbnRBdHRyaWJ1dGXmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVfYXRsYXNzPWFzc2V0czsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKuWKoOi9veeri+e7mOS4u+S9kyAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkQm9keSgpe1xyXG4gICAgICAgIGlmKHRoaXMuc3BfYm9keSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zcF9ib2R5PW5ldyBNYXA8bnVtYmVyLGNjLlNwcml0ZUZyYW1lPigpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkRGlyKCdoZXJvcy9ib2R5JyxjYy5TcHJpdGVGcmFtZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlRnJhbWVbXSk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuPWFzc2V0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3A9YXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9c3AubmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleD1uYW1lLmxhc3RJbmRleE9mKCdfJyk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXJvSWQ9cGFyc2VJbnQobmFtZS5zdWJzdHJpbmcoaW5kZXgrMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BfYm9keS5zZXQoaGVyb0lkLHNwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlRnJhbWVCeU5hbWUoa2V5OnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzLmdldFNwcml0ZUZyYW1lKGtleSk7XHJcbiAgICB9XHJcbiAgICAvLyBwdWJsaWMgZ2V0Um9sZVNwcml0ZUZyYW1lQnlOYW1lKGtleTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLnJvbGVfYXRsYXMuZ2V0U3ByaXRlRnJhbWUoa2V5KTtcclxuICAgIC8vIH1cclxuICAgIHB1YmxpYyBnZXRTcHJpdGVGcmFtZUJ5TmFtZXMoa2V5OnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzcy5nZXRTcHJpdGVGcmFtZShrZXkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1Nwcml0ZUZyYW1lKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK2hlcm9UeXBlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRIZXJvU3ByaXRlRnJhbWVzKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKCdIZWFkX0hlcm9fU18nK2hlcm9UeXBlKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+S4gOW8oOiLsembhOeahOeri+e7mOS4u+S9kyAqL1xyXG4gICAgcHVibGljIGdldEhlcm9Cb2R5KGhlcm9JZDpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwX2JvZHkuZ2V0KGhlcm9JZCk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pWw5o2u5L+d5a2Y5LiO6K+75Y+WLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgb25Mb2FkSGVyb0RhdGEoKXtcclxuICAgICAgICB0aGlzLmxvYWRIZXJvTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbEhlcm9EYXRhKCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5L+d5a2Y5b2T5YmN55qE5oul5pyJ55qE6Iux6ZuE5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHNhdmVIZXJvTGlzdCgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgICAgICAvLyB0aGlzLmxvYWRIZXJvTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbEhlcm9EYXRhKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIHJlcG9ydEhlcm9MaXN0KCl7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGxldCBoZXJvT2JqZWN0Okhlcm9PYmplY3QgPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0Lmhlcm9JZCA9IHYuaGVyb190eXBlO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0Lmhlcm9MZXZlbCA9IHYuaGVyb19sZXZlbDtcclxuICAgICAgICAgICAgaGVyb09iamVjdC5oZXJvU3RhZ2UgPSB2Lmhlcm9fc3RhZ2U7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QuaGVyb1dlYXBvblN0YWdlID0gdi5leGNsdXNpdmVfZXF1aXBfc3RhZ2U7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3Qud2VhcG9ucyA9IHYud2VhcjE7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QuYXJtb3IgPSB2LndlYXIyO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0LmFjY2Vzc29yaWVzID0gdi53ZWFyMztcclxuICAgICAgICAgICAgaGVyb09iamVjdC5zaG9lcyA9IHYud2VhcjQ7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QucGV0ID0gdi5wZXRfaWQ7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChoZXJvT2JqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucmVwb3J0SGVyb0xpc3QsdGhpcy5zZXRIZXJvTGlzdEpzb25TdHJpbmcobGlzdCksZmFsc2UpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veiLsembhOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBsb2FkSGVyb0xpc3QoKXtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5oZXJvTGlzdDtcclxuICAgICAgICBsaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZT12Lmhlcm9JZDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbD12Lmhlcm9MZXZlbDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZT12Lmhlcm9TdGFnZTtcclxuICAgICAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlPXYuaGVyb1dlYXBvblN0YWdlO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFyMT12LndlYXBvbnM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXIyPXYuYXJtb3I7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXIzPXYuYWNjZXNzb3JpZXM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXI0PXYuc2hvZXM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZD12LnBldDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRKc29uKFN0b3JhZ2VLZXkuSGVyb0xpc3QsdGhpcy5oZXJvX2xpc3QpO1xyXG4gICAgICAgIC8vIGxldCBsaXN0ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uKFN0b3JhZ2VLZXkuSGVyb0xpc3QpXHJcbiAgICAgICAgLy8gaWYobGlzdCl7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aTxsaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaW5mbyA9IGxpc3RbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTtcclxuICAgICAgICAvLyAgICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSBpbmZvLmhlcm9fbGV2ZWw7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX3F1YWxpdHkgPSBpbmZvLmhlcm9fcXVhbGl0eTtcclxuICAgICAgICAvLyAgICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZSA9IGluZm8uaGVyb190eXBlO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gaW5mby5wZXRfaWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID1pbmZvLmhlcm9fc3RhZ2U7XHJcbiAgICAgICAgLy8gICAgICAgICBmb3IobGV0IGU9RXF1aXBUeXBlLld1UWk7IGU8RXF1aXBUeXBlLk51bTsgZSsrKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvSW5mb1tcIndlYXJcIitlXT1pbmZvW1wid2VhclwiK2VdO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuZ2V0SGVyb0xpc3QsdGhpcy5nZXRIZXJvTGlzdEpzb25TdHJpbmcoKSxmYWxzZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgLy8gICAgIGlmKGRhdGEpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZXJvX2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgLy8gICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby5oZXJvX3R5cGU9di5oZXJvSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8uaGVyb19sZXZlbD12Lmhlcm9MZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby5oZXJvX3N0YWdlPXYuaGVyb1N0YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZT12Lmhlcm9XZWFwb25TdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby53ZWFyMT12LndlYXBvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ud2VhcjI9di5hcm1vcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby53ZWFyMz12LmFjY2Vzc29yaWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLndlYXI0PXYuc2hvZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ucGV0X2lkPXYucGV0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpc3QucHVzaChoZXJvSW5mbylcclxuICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZXJvX2xpc3QgPSBsaXN0O1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5oZXJvX2xpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBIZXJvX1R5cGUuU2hvdVdhbmc7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgcGFvc2hvdSA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHBhb3Nob3UuZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91Lmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHBhb3Nob3UuaGVyb19xdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoSGVyb19UeXBlLlBhb1Nob3UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHBhb3Nob3UuaGVyb19zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcGFvc2hvdS5oZXJvX3R5cGUgPSBIZXJvX1R5cGUuUGFvU2hvdTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91LnBldF9pZCA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChwYW9zaG91KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEpzb24oU3RvcmFnZUtleS5IZXJvTGlzdCx0aGlzLmhlcm9fbGlzdCk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLmxvYWRBbGxIZXJvRGF0YSgpOyAgXHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLnJlcG9ydEhlcm9MaXN0KCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgIC8vICAgICBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDE7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBIZXJvX1R5cGUuU2hvdVdhbmc7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLnBldF9pZCA9IDA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaGVyb19saXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgIC8vICAgICBsZXQgcGFvc2hvdSA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91LmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgIHBhb3Nob3UuaGVyb19sZXZlbCA9IDE7XHJcbiAgICAgICAgLy8gICAgIHBhb3Nob3UuaGVyb19xdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoSGVyb19UeXBlLlBhb1Nob3UpO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fdHlwZSA9IEhlcm9fVHlwZS5QYW9TaG91O1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91LnBldF9pZCA9IDA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaGVyb19saXN0LnB1c2gocGFvc2hvdSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blt7Lmi6XmnInoi7Hpm4TliJfooahcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRIZXJvTGlzdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlop7liqDkuIDkuKroi7Hpm4Tkv6Hmga9cclxuICAgIGFkZEhlcm8oaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBoZXJvVHlwZTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gMTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShoZXJvVHlwZSk7XHJcbiAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gMDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMuaGVyb19saXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ntK/orqHmlLbpm4ZY5Liq6Iux6ZuEKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i6Iux6ZuE5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuE57G75Z6LXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhlcm9JbmZvKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb0luZm9cclxuICAgIHtcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5oZXJvX2xldmVsW2hlcm9UeXBlLTFdO1xyXG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaGVyb19saXN0LmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICBpZih2Lmhlcm9fdHlwZSA9PSBoZXJvVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2xpc3RbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiLsembhOetiee6pyAqL1xyXG4gICAgcHVibGljIGdldEhlcm9MZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBpbmZvLmhlcm9fbGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirlop7liqDoi7Hpm4TnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBhZGRIZXJvTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpbmZvLmhlcm9fbGV2ZWwrKztcclxuICAgICAgICBpZihpbmZvLmhlcm9fbGV2ZWwgPT0gMTApe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuWwhuS7u+aEj1jlkI3oi7Hpm4TljYfliLAxMOe6pyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZm8uaGVyb19sZXZlbCA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY57qnKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6hMeS4quiLsembhOWNh+WIsFjnuqcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmZvLmhlcm9fbGV2ZWwgPj0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKGhlcm9UeXBlKSl7XHJcbiAgICAgICAgICAgIGluZm8uaGVyb19sZXZlbCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcbiAgICAvKirph43nva7oi7Hpm4TnrYnnuqcgKi9cclxuICAgIHB1YmxpYyByZXNldEhlcm9MdmVsKGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpbmZvLmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcbiAgICAvKiroi7Hpm4Tlk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvUXVhbGl0eShoZXJvVHlwZTpIZXJvX1R5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBpbmZvLmhlcm9fcXVhbGl0eTtcclxuICAgIH0gXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiLsembhOeahOS4k+atpuetiee6p1xyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhOexu+Wei1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKVxyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlop7liqDoi7Hpm4TnmoTkuJPmrabnrYnnuqdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4TnsbvlnotcclxuICAgICAqL1xyXG4gICAgYWRkRXhjbHVzaXZlRXF1aXBMZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSArKztcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7oi7Hpm4TnmoTkuJPmrabnrYnnuqdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4TnsbvlnotcclxuICAgICAqIEBwYXJhbSBudW0g6K6+572u55qE562J57qnXHJcbiAgICAgKi9cclxuICAgIHNldEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlLG51bTpudW1iZXIpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGluZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiLsembhOeahOmYtuautVxyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldEhlcm9TdGFnZShoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaW5mby5oZXJvX3N0YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEhlcm9TdGFnZShoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaW5mby5oZXJvX3N0YWdlICsrO1xyXG4gICAgICAgIGlmKGhlcm9UeXBlID09IEhlcm9fVHlwZS5QYW9TaG91ICYmIGluZm8uaGVyb19zdGFnZSA9PSA2KXtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7lsIbngq7miYvljYfoh7Mx5aSn5pifKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX3N0YWdlICUgNiA9PSAwXHJcbiAgICAgICAgICAgICYmIE1hdGguZmxvb3IoaW5mby5oZXJvX3N0YWdlIC8gNikgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7ntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOaYnykgKXtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6hMeS4quiLsembhOWNh+WIsFjmmJ8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmZvLmhlcm9fc3RhZ2UgPj0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9UeXBlKSl7XHJcbiAgICAgICAgICAgIGluZm8uaGVyb19zdGFnZSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tDYW5BZGRIZXJvU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+q5pyJ5pu05pS555qE5pe25YCZ5YaN5L+d5a2Y5Yiw5paH5Lu277yM5YeP5bCR5paH5Lu26K+75Y+W5qyh5pWwXHJcbiAgICAvLyBwdWJsaWMgYWRkSGVyb0xldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSxsZXZlbDpudW1iZXIpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICBsZXQgbm93TGV2ZWw9aW5mby5oZXJvX2xldmVsK2xldmVsO1xyXG4gICAgLy8gICAgIGlmKG5vd0xldmVsPD1MZXZlbFVwTWFuYWdlci5nZXRNYXhMZXZlbCgpKVxyXG4gICAgLy8gICAgICAgICB0aGlzLnNhdmVIZXJvTGV2ZWwoaGVyb1R5cGUsbm93TGV2ZWwpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyBzYXZlSGVyb0xldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSxsZXZlbDpudW1iZXIpXHJcbiAgICAvLyB7ICAgICAgICBcclxuICAgIC8vICAgICBpZihsZXZlbD5MZXZlbFVwTWFuYWdlci5nZXRNYXhMZXZlbCgpKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV2ZWw9TGV2ZWxVcE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICBpbmZvLmhlcm9fbGV2ZWw9bGV2ZWw7XHJcbiAgICAvLyAgICAgdGhpcy5zYXZlSGVyb0xpc3QoKTsgICAgICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXRUZWFtTGlzdCh0eXBlOkdhbWVNb2RlKTpIZXJvX1R5cGVbXVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0ZWFtPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8NTtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZWFtLnB1c2goLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVhbVN0cjpzdHJpbmc9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0ZWFtX2xpc3RfJyt0eXBlKTtcclxuICAgICAgICBpZih0ZWFtU3RyPT09XCJcIiB8fCB0ZWFtU3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgLy8gdGVhbVsxXT0oSGVyb19UeXBlLkRlTHVZaSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0ZWFtWzJdPShIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGVhbVszXT0oSGVyb19UeXBlLlBhb1Nob3UpO1xyXG4gICAgICAgICAgICAgICAgdGVhbVsyXT0oSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRlYW1MaXN0KHR5cGUsdGVhbSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRlYW09dGhpcy5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYWluKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGxpc3Q9dGVhbVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb1R5cGU9cGFyc2VJbnQobGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNKb2luPWhlcm9UeXBlPjAmJnRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKT4wO1xyXG4gICAgICAgICAgICAgICAgdGVhbVtpXT1pc0pvaW4/aGVyb1R5cGU6LTE7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZWFtO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVUZWFtTGlzdCh0eXBlOkdhbWVNb2RlLHRlbXA6SGVyb19UeXBlW10pXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0ZWFtX2xpc3RfJyt0eXBlLHRlbXAudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb3miYDmnInnmoToi7Hpm4TmlbDmja5cclxuICAgIGxvYWRBbGxIZXJvRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/pnIDopoHmoLnmja7lhpvooZTnrYnnuqfvvIzoo4XlpIfnrYnnuqfvvIzoi7Hpm4TnrYnnuqdcclxuICAgICAgICB0aGlzLmhlcm9fZGF0YT1uZXcgTWFwPG51bWJlcixIZXJvRGF0YT4oKTtcclxuICAgICAgICBsZXQgaGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIZXJvRGF0YShoZXJvTGlzdFtpXS5oZXJvX3R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkSGVyb0RhdGEoaGVyb1R5cGU6SGVyb19UeXBlKTpIZXJvRGF0YVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKTw9MCl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgbG9jYWxIRD10aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKCFsb2NhbEhEKXtcclxuICAgICAgICAgICAgbG9jYWxIRD1uZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5a6g54mp5bGe5oCn5a6a5LmJXHJcbiAgICAgICAgbGV0IHBldEF0ayA9IDAscGV0RGVmZW5jZSA9IDAscGV0SGVhbHRoID0gMCxwZXRIaXQgPSAwLHBldE1pc3MgPSAwLHBldENyaXRpY2FsID0gMCxwZXRBbnRpQ3JpdGljYWwgPSAwLHBldEV4dHJhQ3JpdGljYWwgPSAwLHBldEFudGlFeHRyYUNyaXRpY2FsID0gMDtcclxuICAgICAgICAvLyDkuJPlsZ7mrablmajnmoTliqDmiJBcclxuICAgICAgICBsZXQgZXhIcCA9IDAsZXhBdHRhY2sgPSAwLGV4RGVmZW5zZSA9IDA7XHJcbiAgICAgICAgLy8tLeWbuuWumuWxnuaAp1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVEYXRhOkpzb25IZXJvQXR0cmlidXRlID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSx0aGlzLmdldEhlcm9TdGFnZShoZXJvVHlwZSkpO1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzpIZXJvSW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxvY2FsSEQuZml4ZWRfaHAgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoSGVhbHRoKSArIGF0dHJpYnV0ZURhdGEuQmFzZUhlYWx0aDtcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2F0dGNrID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aEF0dGFjaykgKyBhdHRyaWJ1dGVEYXRhLkJhc2VBdHRhY2s7XHJcbiAgICAgICAgbG9jYWxIRC5maXhfZGVmZW5zZSA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhEZWZlbnNlKSArIGF0dHJpYnV0ZURhdGEuQmFzZURlZmVuc2U7XHJcbiAgICAgICAgLy8g5LiT5bGe5q2m5Zmo5pWw5o2u6I635Y+WXHJcbiAgICAgICAgbGV0IGV4U3RhZ2UgPSB0aGlzLmdldEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoZXhTdGFnZSA+IDApe1xyXG4gICAgICAgICAgICBsZXQgZXhKc29uRGF0YSA9IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9UeXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICBleEhwID0gKGV4SnNvbkRhdGEuSGVhbHRoKSAqIGxvY2FsSEQuZml4ZWRfaHA7XHJcbiAgICAgICAgICAgIGV4QXR0YWNrID0gKGV4SnNvbkRhdGEuQXR0YWNrKSAqIGxvY2FsSEQuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgIGV4RGVmZW5zZSA9IChleEpzb25EYXRhLkRlZmVuc2UpICogbG9jYWxIRC5maXhfZGVmZW5zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWuoOeJqeaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBwZXRJZCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhclBldChoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYocGV0SWQhPTApe1xyXG4gICAgICAgICAgICBsZXQgcGV0SW5mbyA9IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0QXR0cmlidXRlKHBldElkKTtcclxuICAgICAgICAgICAgcGV0QXRrID0gcGV0SW5mby5BdHRhY2s7XHJcbiAgICAgICAgICAgIHBldERlZmVuY2UgPSBwZXRJbmZvLkRlZmVuc2U7XHJcbiAgICAgICAgICAgIHBldEhlYWx0aCA9IHBldEluZm8uSGVhbHRoO1xyXG4gICAgICAgICAgICBwZXRIaXQgPSBwZXRJbmZvLkhpdDtcclxuICAgICAgICAgICAgcGV0TWlzcyA9IHBldEluZm8uTWlzcztcclxuICAgICAgICAgICAgcGV0Q3JpdGljYWwgPSBwZXRJbmZvLkNyaXRpY2FsO1xyXG4gICAgICAgICAgICBwZXRBbnRpQ3JpdGljYWwgPSBwZXRJbmZvLkFudGlDcml0aWNhbDtcclxuICAgICAgICAgICAgcGV0RXh0cmFDcml0aWNhbCA9IHBldEluZm8uRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAgICAgcGV0QW50aUV4dHJhQ3JpdGljYWwgPSBwZXRJbmZvLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhbEhELnBldF9pZD1wZXRJZDtcclxuICAgICAgICAvLyDlkb3kuK3lgLxcclxuICAgICAgICBsb2NhbEhELkhpdCA9IGF0dHJpYnV0ZURhdGEuSGl0ICsgcGV0SGl0O1xyXG4gICAgICAgIC8vIOmXqumBv+WAvFxyXG4gICAgICAgIGxvY2FsSEQuTWlzcyA9IGF0dHJpYnV0ZURhdGEuTWlzcyArIHBldE1pc3M7XHJcbiAgICAgICAgLy8g5pq05Ye75YC8XHJcbiAgICAgICAgbG9jYWxIRC5Dcml0aWNhbCA9IGF0dHJpYnV0ZURhdGEuQ3JpdGljYWwgKyBwZXRDcml0aWNhbDtcclxuICAgICAgICAvLyDpmLLniIblgLxcclxuICAgICAgICBsb2NhbEhELkFudGlDcml0aWNhbCA9IGF0dHJpYnV0ZURhdGEuQW50aUNyaXRpY2FsICsgcGV0QW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIOaatOWHu+WinuW5hVxyXG4gICAgICAgIGxvY2FsSEQuRXh0cmFDcml0aWNhbCA9IGF0dHJpYnV0ZURhdGEuRXh0cmFDcml0aWNhbCArIHBldEV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgLy8g5pq05Ye75oqX5oCnXHJcbiAgICAgICAgbG9jYWxIRC5BbnRpRXh0cmFDcml0aWNhbCA9IGF0dHJpYnV0ZURhdGEuQW50aUV4dHJhQ3JpdGljYWwgKyBwZXRBbnRpRXh0cmFDcml0aWNhbDtcclxuXHJcbiAgICAgICAgLy8g5pS76YCfXHJcbiAgICAgICAgbGV0IEhCSU0gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbG9jYWxIRC5iYXNlX2ppYW5nZSA9IDEvSEJJTS5nZXRCYXNlU3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuZ29uZ2ppX2ppYW5nZSA9IDEvSEJJTS5nZXRCYXNlU3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuYXRrU3BlZWQgPSBIQklNLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5idWxsZXRfc3BlZWQgPSBIQklNLmdldEJhc2VCdWxsZXRTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfZmFud2VpID0gSEJJTS5nZXRBdHRhY2tSYW5nZShoZXJvVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIOatpuWZqOWKoOaIkFxyXG4gICAgICAgIGxldCBhbGxXZWFwb25IcCA9IDAsYWxsV2VhcG9uQXRrID0gMCxhbGxXZWFwb25EZWZlbmNlID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSBFcXVpcFR5cGUuV3VRaTtpPEVxdWlwVHlwZS5OdW07aSsrKXtcclxuICAgICAgICAgICAgbGV0IHdlYXBvbkluZm8gPSBoZXJvSW5mb1tcIndlYXJcIitpXTtcclxuICAgICAgICAgICAgaWYod2VhcG9uSW5mbyAhPSAwKXtcclxuICAgICAgICAgICAgICAgIGxldCB3ZWFwb25EYXRhID0gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEF0dHJpYnV0ZXNhZGRpdGlvbmFsKHdlYXBvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uQXRrICs9IHdlYXBvbkRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBhbGxXZWFwb25EZWZlbmNlICs9IHdlYXBvbkRhdGFbMV07XHJcbiAgICAgICAgICAgICAgICBhbGxXZWFwb25IcCArPSB3ZWFwb25EYXRhWzJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLeaAu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQXR0YWNrID0gbG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrICsgYWxsV2VhcG9uQXRrICsgcGV0QXRrICsgZXhBdHRhY2s7XHJcbiAgICAgICAgbG9jYWxIRC5IZWFsdGggPSBsb2NhbEhELnRvdGFsX2hwID0gbG9jYWxIRC5maXhlZF9ocCArIGFsbFdlYXBvbkhwICsgcGV0SGVhbHRoICsgZXhIcDtcclxuICAgICAgICBsb2NhbEhELkRlZmVuc2UgPSBsb2NhbEhELnRvdGFsX2RlZmVuc2UgPSBsb2NhbEhELmZpeF9kZWZlbnNlICsgYWxsV2VhcG9uRGVmZW5jZSArIHBldERlZmVuY2UgKyBleERlZmVuc2U7XHJcblxyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9UeXBlLGhlcm9JbmZvLmhlcm9fc3RhZ2UpICsgMTtcclxuXHJcbiAgICAgICAgbG9jYWxIRC5Db2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3g9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV95PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfej1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlXzQ9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpOyAgXHJcbiAgICAgICAgbG9jYWxIRC51bmxvY2tfc3RhdGU9bmV3IE1hcDxudW1iZXIsYm9vbGVhbj4oKTtcclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9NDsgcysrKXtcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPVNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTa2lsbFBvc0FuZFNraWxsTGV2ZWwoaGVyb1R5cGUscyxzdGFyKTtcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV95LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgICAgICBsb2NhbEhELnVubG9ja19zdGF0ZS5zZXQocyxoZXJvSW5mby5oZXJvX2xldmVsPj1Ta2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD00OyBzKyspe1xyXG4gICAgICAgICAgICBpZihleFN0YWdlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4SWQ9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQoaGVyb1R5cGUsZXhTdGFnZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhTdGFyPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXIoZXhJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhTa2lsbElkPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKGhlcm9UeXBlLGV4U3RhcisxKTtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1FeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRXhjbHVzaXZlV2VhcG9uU2tpbGwoZXhTa2lsbElkKTtcclxuICAgICAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxIRFtcIkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfXCIrc109anNvbkRhdGFbXCJFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlX1wiK3NdO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhLnNldChoZXJvVHlwZSxsb2NhbEhEKTtcclxuICAgICAgICByZXR1cm4gbG9jYWxIRDtcclxuXHJcbiAgICAgICAgLy9sb2NhbEhEPXRoaXMuZ2V0QmFzZUhlcm9EYXRhKGkpO1xyXG4gICAgICAgIC8vIC8v5pS75Ye76IyD5Zu0XHJcbiAgICAgICAgLy8gbGV0IGhlcm9TdGFnZT10aGlzLmdldEhlcm9TdGFnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gLy9sZXQgaGVyb1F1YWxpdHk9dGhpcy5nZXRIZXJvUXVhbGl0eShoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gLy9sZXQgaGVyb1RpZXI9SGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGllcihoZXJvUXVhbGl0eSk7XHJcbiAgICAgICAgLy8gbGV0IGhhbUlkPUhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldElkKGhlcm9UeXBlLGhlcm9TdGFnZSk7XHJcbiAgICAgICAgLy8gbGV0IGpzb25IQU09SGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSGVyb0F0dHJpYnV0ZShoYW1JZCk7XHJcbiAgICAgICAgLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pS75Ye75pS76YCf5pq05Ye754iG546H562JLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyAvL+aUu+WHu+WKmyzln7rmnKzmlLvlh7tcclxuICAgICAgICAvLyBsZXQgYmFzZUdKPWpzb25IQU0uQXR0YWNrO1xyXG4gICAgICAgIC8vIGxldCBlcXVpcEF0dGFjaz0wO1xyXG4gICAgICAgIC8vIC8qKumineWklueZvuWIhuavlOaUu+mAnyAqL1xyXG4gICAgICAgIC8vIGxldCBlcXVpcEF0dGFja1NwZWVkPSAwIDtcclxuICAgICAgICAvLyAvKirpmLLlvqHlipsgKi9cclxuICAgICAgICAvLyBsZXQgZXF1aXBEZWZlbnNlID0gMCA7XHJcbiAgICAgICAgLy8gLyoq55Sf5ZG95YC8ICovXHJcbiAgICAgICAgLy8gbGV0IGVxdWlwSGVhbHRoID0gMCA7XHJcbiAgICAgICAgLy8gbGV0IGVpbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gbGV0IGVhbT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPUVxdWlwVHlwZS5XdVFpOyBpPEVxdWlwVHlwZS5OdW07IGkrKylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCB3ZWFyRXF1aXBJbmZvPWVpbS5nZXROZXdXZWFyRXF1aXBtZW50KGhlcm9UeXBlLGkpO1xyXG4gICAgICAgIC8vICAgICBpZih3ZWFyRXF1aXBJbmZvKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQganNvbkRhdGE9ZWFtLmdldEpzb25FcXVpcG1lbnRBdHRyaWJ1dGUod2VhckVxdWlwSW5mby5lcXVpcF9pZCk7XHJcbiAgICAgICAgLy8gICAgICAgICAvL+i/memHjOaYr+ebuOWKoFxyXG4gICAgICAgIC8vICAgICAgICAgZXF1aXBBdHRhY2srPWpzb25EYXRhLkF0dGFjaztcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwQXR0YWNrU3BlZWQrPWpzb25EYXRhLkF0dGFja1NwZWVkO1xyXG4gICAgICAgIC8vICAgICAgICAgZXF1aXBEZWZlbnNlKz1qc29uRGF0YS5EZWZlbnNlO1xyXG4gICAgICAgIC8vICAgICAgICAgZXF1aXBIZWFsdGgrPWpzb25EYXRhLkhlYWx0aDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+WuoOeJqeWKoOaIkFxyXG4gICAgICAgIC8vIGxldCBwZXRHSj0wO1xyXG4gICAgICAgIC8vIGxldCBwZURlZmVuc2U9MDtcclxuICAgICAgICAvLyBsZXQgcGV0SGVhbHRoPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldE1pc3M9MDtcclxuICAgICAgICAvLyBsZXQgcGV0Q3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgcGV0RXh0cmFDcml0aWNhbD0wO1xyXG4gICAgICAgIC8vIGxldCBwZXRBbnRpQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgcGV0QW50aUV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgcGV0SGl0PTA7XHJcbiAgICAgICAgLy8gLy9cclxuICAgICAgICAvLyBpZihsb2NhbEhELnBldF9pbmZvKXtcclxuICAgICAgICAvLyAgICAgbGV0IHBldERhdGE9UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldERhdGEobG9jYWxIRC5wZXRfaW5mbyk7XHJcbiAgICAgICAgLy8gICAgIHBldEdKPXBldERhdGEuQXR0YWNrO1xyXG4gICAgICAgIC8vICAgICBwZURlZmVuc2U9cGV0RGF0YS5EZWZlbnNlO1xyXG4gICAgICAgIC8vICAgICBwZXRIZWFsdGg9cGV0RGF0YS5IZWFsdGg7XHJcbiAgICAgICAgLy8gICAgIHBldE1pc3M9cGV0RGF0YS5NaXNzO1xyXG4gICAgICAgIC8vICAgICBwZXRDcml0aWNhbD1wZXREYXRhLkNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBwZXRFeHRyYUNyaXRpY2FsPXBldERhdGEuRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0QW50aUNyaXRpY2FsPXBldERhdGEuQW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBwZXRBbnRpRXh0cmFDcml0aWNhbD1wZXREYXRhLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBwZXRIaXQ9cGV0RGF0YS5IaXQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8v5LiT5bGe5q2m5Zmo5Yqg5oiQKCUs6Zmk5LqG5pq05Ye75YC85ZKM5ZG95Lit5YC85piv5YW35L2T5pWw5YC877yM5YW25LuW55qE6YO95piv55m+5YiG5q+U5pWw5YC8KVxyXG4gICAgICAgIC8vIGxldCBleEdKPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4RGVmZW5zZT0wO1xyXG4gICAgICAgIC8vIGxldCBleEhlYWx0aD0wO1xyXG4gICAgICAgIC8vIGxldCBleE1pc3M9MDtcclxuICAgICAgICAvLyBsZXQgZXhDcml0aWNhbD0wO1xyXG4gICAgICAgIC8vIGxldCBleEV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhBbnRpQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhBbnRpRXh0cmFDcml0aWNhbD0wO1xyXG4gICAgICAgIC8vIGxldCBleEhpdD0wO1xyXG4gICAgICAgIC8vIC8v5LiT5q2m562J57qnXHJcbiAgICAgICAgLy8gbG9jYWxIRC5oZXJvX2luZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICAvLyBpZihsb2NhbEhELmhlcm9faW5mby5leGNsdXNpdmVfZXF1aXBfbGV2ZWw+PTApe1xyXG4gICAgICAgIC8vICAgICBsZXQgZXhJZD1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SWQoaGVyb1R5cGUsbG9jYWxIRC5oZXJvX2luZm8uZXhjbHVzaXZlX2VxdWlwX2xldmVsKTtcclxuICAgICAgICAvLyAgICAgbGV0IGV4SnNvbkRhdGE9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkV4Y2x1c2l2ZUVuaGFuY2VtZW50KGV4SWQpO1xyXG4gICAgICAgIC8vICAgICBleEdKPWV4SnNvbkRhdGEuQXR0YWNrO1xyXG4gICAgICAgIC8vICAgICBleERlZmVuc2U9ZXhKc29uRGF0YS5EZWZlbnNlO1xyXG4gICAgICAgIC8vICAgICBleEhlYWx0aD1leEpzb25EYXRhLkhlYWx0aDtcclxuICAgICAgICAvLyAgICAgZXhNaXNzPWV4SnNvbkRhdGEuTWlzcztcclxuICAgICAgICAvLyAgICAgZXhDcml0aWNhbD1leEpzb25EYXRhLkNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBleEV4dHJhQ3JpdGljYWw9ZXhKc29uRGF0YS5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBleEFudGlDcml0aWNhbD1leEpzb25EYXRhLkFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhBbnRpRXh0cmFDcml0aWNhbD1leEpzb25EYXRhLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vICAgICBleEhpdD1leEpzb25EYXRhLkhpdDtcclxuICAgICAgICAvLyAgICAgLy/kuJPmrabmioDog73lj4LmlbAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgbGV0IHNraWxsSWQ9RXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLmdldElkKEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4U3RhZ2UobG9jYWxIRC5oZXJvX2luZm8uZXhjbHVzaXZlX2VxdWlwX2xldmVsKSxoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBleFNraWxsSnNvbkRhdGE9RXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkV4Y2x1c2l2ZVdlYXBvblNraWxsKHNraWxsSWQpO1xyXG4gICAgICAgIC8vICAgICBsb2NhbEhELkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMT1leFNraWxsSnNvbkRhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgIC8vICAgICBsb2NhbEhELkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMj1leFNraWxsSnNvbkRhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8yO1xyXG4gICAgICAgIC8vICAgICBsb2NhbEhELkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMz1leFNraWxsSnNvbkRhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8zO1xyXG4gICAgICAgIC8vICAgICBsb2NhbEhELkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfND1leFNraWxsSnNvbkRhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV80O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyAvL+aUu+WHu+WKmz3ln7rnoYDmlLvlh7vlipsq77yIJSsl77yJXHJcbiAgICAgICAgLy8gLy/lm7rlrprmlLvlh7vlipsgICAgICAgIFxyXG4gICAgICAgIC8vIGxldCB0b3RhbEdKPShiYXNlR0orZXF1aXBBdHRhY2srcGV0R0opO1xyXG4gICAgICAgIC8vIGxldCBmaXhBdHRhY2s9dG90YWxHSjtcclxuICAgICAgICAvLyBsb2NhbEhELmZpeGVkX2F0dGNrPWZpeEF0dGFjaztcclxuICAgICAgICAvLyB0b3RhbEdKKz10b3RhbEdKKihleEdKKTtcclxuICAgICAgICAvLyBsb2NhbEhELnRvdGFsX2F0dGFjaz1NYXRoLnJvdW5kKHRvdGFsR0opO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQXR0YWNrPWxvY2FsSEQudG90YWxfYXR0YWNrOyAgICAgICAgXHJcbiAgICAgICAgLy8gLy/ln7rnoYDmlLvlh7vpgJ/luqYq77yI6KOF5aSHJSvoo4XlpIfpmYTliqAl77yJLOi/memHjOW+l+WIsOeahOWAvOaYr+avj+enkuaUu+WHu+asoeaVsFxyXG4gICAgICAgIC8vIC8vbGV0IHRhbGVudEdTPVRhbGVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWxlbnREYXRhKFRhbGVudFR5cGUuQXR0U3BlZWQpO1xyXG4gICAgICAgIC8vIGxldCBhdHRTcGVlZD1IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICAvLyBsb2NhbEhELmJhc2VfamlhbmdlPTEvYXR0U3BlZWQ7XHJcbiAgICAgICAgLy8gLy/nm7TmjqXliqDlpKnotYvnmoRcclxuICAgICAgICAvLyBhdHRTcGVlZCs9YXR0U3BlZWQqKChlcXVpcEF0dGFja1NwZWVkKS8xMDApO1xyXG4gICAgICAgIC8vIC8v6L2s5o2i5oiQ5aSa5bCR56eS5pS75Ye75LiA5qyhLOWNs+aUu+WHu+mXtOmalFxyXG4gICAgICAgIC8vIGxvY2FsSEQuZ29uZ2ppX2ppYW5nZT0xL2F0dFNwZWVkOyAgICAgICAgXHJcbiAgICAgICAgLy8gLy/pmLLlvqHliptcclxuICAgICAgICAvLyBsZXQgYmFzZURlZmVuc2U9anNvbkhBTS5EZWZlbnNlO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuRGVmZW5zZT1iYXNlRGVmZW5zZStwZURlZmVuc2UrZXF1aXBEZWZlbnNlO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuRGVmZW5zZSs9bG9jYWxIRC5EZWZlbnNlKihleERlZmVuc2UpO1xyXG4gICAgICAgIC8vIC8v55Sf5ZG95YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VIcD1qc29uSEFNLkhlYWx0aDtcclxuICAgICAgICAvLyBsb2NhbEhELmZpeGVkX2hwPWJhc2VIcCtwZXRIZWFsdGgrZXF1aXBIZWFsdGg7XHJcbiAgICAgICAgLy8gbG9jYWxIRC50b3RhbF9ocD1sb2NhbEhELmZpeGVkX2hwK2xvY2FsSEQuZml4ZWRfaHAqKGV4SGVhbHRoKTtcclxuICAgICAgICAvLyBsb2NhbEhELkhlYWx0aD1sb2NhbEhELnRvdGFsX2hwO1xyXG4gICAgICAgIC8vIC8v5ZG95Lit5YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VIaXQ9anNvbkhBTS5IaXQ7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5IaXQ9YmFzZUhpdCtwZXRIaXQrZXhIaXQ7XHJcbiAgICAgICAgLy8gLy/pl6rpgb/lgLxcclxuICAgICAgICAvLyBsZXQgYmFzZU1pc3M9anNvbkhBTS5NaXNzO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuTWlzcz1iYXNlTWlzcytwZXRNaXNzO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuTWlzcys9bG9jYWxIRC5NaXNzKihleE1pc3MpO1xyXG4gICAgICAgIC8vIC8v5pq05Ye75YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VDcml0aWNhbD1qc29uSEFNLkNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQ3JpdGljYWw9YmFzZUNyaXRpY2FsK3BldENyaXRpY2FsK2V4Q3JpdGljYWw7XHJcbiAgICAgICAgLy8gLy/mmrTlh7vlop7luYVcclxuICAgICAgICAvLyBsZXQgYmFzZUV4dHJhQ3JpdGljYWw9anNvbkhBTS5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuRXh0cmFDcml0aWNhbD1iYXNlRXh0cmFDcml0aWNhbCtwZXRFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuRXh0cmFDcml0aWNhbCs9bG9jYWxIRC5FeHRyYUNyaXRpY2FsKihleEV4dHJhQ3JpdGljYWwpO1xyXG4gICAgICAgIC8vIC8v6Ziy5pq05YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VBbnRpQ3JpdGljYWw9anNvbkhBTS5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BbnRpQ3JpdGljYWw9YmFzZUFudGlDcml0aWNhbCtwZXRBbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BbnRpQ3JpdGljYWwrPWxvY2FsSEQuQW50aUNyaXRpY2FsKihleEFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgLy8gLy/mmrTlh7vmipfmgKdcclxuICAgICAgICAvLyBsZXQgYmFzZUFudGlFeHRyYUNyaXRpY2FsPWpzb25IQU0uQW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BbnRpRXh0cmFDcml0aWNhbD1iYXNlQW50aUV4dHJhQ3JpdGljYWwrcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BbnRpRXh0cmFDcml0aWNhbCs9bG9jYWxIRC5BbnRpRXh0cmFDcml0aWNhbCooZXhBbnRpRXh0cmFDcml0aWNhbCk7XHJcbiAgICAgICAgLy8gLy9cclxuICAgICAgICAvLyBsb2NhbEhELkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAvLyBsb2NhbEhELlNraWxsVmFsdWVfeD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5Ta2lsbFZhbHVlX3k9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuU2tpbGxWYWx1ZV96PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAvLyBsb2NhbEhELlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7ICAgICAgICBcclxuICAgICAgICAvLyAvLzPkuKrmioDog73mp73nmoRcclxuICAgICAgICAvLyBmb3IobGV0IHM9MTsgczw9MzsgcysrKXtcclxuICAgICAgICAvLyAgICAgbGV0IHNraWxsTGV2ZWw9U2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbExldmVsKHMsaGVyb1N0YWdlKTtcclxuICAgICAgICAvLyAgICAgaWYoc2tpbGxMZXZlbD4wKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBza2lsbElkPVNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldElkKHMsc2tpbGxMZXZlbCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2tpbGxMZXZlbElkPVNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SWQoaGVyb1R5cGUsc2tpbGxJZCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQganNvbkRhdGE9U2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Ta2lsbENvbmZpZ3VyYXRpb24oc2tpbGxMZXZlbElkKTtcclxuICAgICAgICAvLyAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgIC8vICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3ouc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8zKTtcclxuICAgICAgICAvLyAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLmhlcm9fZGF0YS5zZXQoaGVyb1R5cGUsbG9jYWxIRCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGxvY2FsSEQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvOkhlcm9JbmZvKTpIZXJvRGF0YXtcclxuICAgICAgICBsZXQgbG9jYWxIRD1uZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICAvLyDlrqDnianlsZ7mgKflrprkuYlcclxuICAgICAgICBsZXQgcGV0QXRrID0gMCxwZXREZWZlbmNlID0gMCxwZXRIZWFsdGggPSAwLHBldEhpdCA9IDAscGV0TWlzcyA9IDAscGV0Q3JpdGljYWwgPSAwLHBldEFudGlDcml0aWNhbCA9IDAscGV0RXh0cmFDcml0aWNhbCA9IDAscGV0QW50aUV4dHJhQ3JpdGljYWwgPSAwO1xyXG4gICAgICAgIC8vIOS4k+WxnuatpuWZqOeahOWKoOaIkFxyXG4gICAgICAgIGxldCBleEhwID0gMCxleEF0dGFjayA9IDAsZXhEZWZlbnNlID0gMDtcclxuICAgICAgICAvLy0t5Zu65a6a5bGe5oCnXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZURhdGE6SnNvbkhlcm9BdHRyaWJ1dGUgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9JbmZvLmhlcm9fdHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKTtcclxuICAgICAgICBcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2hwID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aEhlYWx0aCkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VIZWFsdGg7XHJcbiAgICAgICAgbG9jYWxIRC5maXhlZF9hdHRjayA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhBdHRhY2spICsgYXR0cmlidXRlRGF0YS5CYXNlQXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuZml4X2RlZmVuc2UgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoRGVmZW5zZSkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VEZWZlbnNlO1xyXG4gICAgICAgIC8vIOS4k+WxnuatpuWZqOaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBleFN0YWdlID0gaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlO1xyXG4gICAgICAgIGlmKGV4U3RhZ2UgPiAwKXtcclxuICAgICAgICAgICAgbGV0IGV4SnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvSW5mby5oZXJvX3R5cGUsZXhTdGFnZSk7XHJcbiAgICAgICAgICAgIGV4SHAgPSAoZXhKc29uRGF0YS5IZWFsdGgpICogbG9jYWxIRC5maXhlZF9ocDtcclxuICAgICAgICAgICAgZXhBdHRhY2sgPSAoZXhKc29uRGF0YS5BdHRhY2spICogbG9jYWxIRC5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgZXhEZWZlbnNlID0gKGV4SnNvbkRhdGEuRGVmZW5zZSkgKiBsb2NhbEhELmZpeF9kZWZlbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5a6g54mp5pWw5o2u6I635Y+WXHJcbiAgICAgICAgbGV0IHBldElkID0gaGVyb0luZm8ucGV0X2lkO1xyXG4gICAgICAgIGlmKHBldElkIT0wKXtcclxuICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgIHBldEF0ayA9IHBldEluZm8uQXR0YWNrO1xyXG4gICAgICAgICAgICBwZXREZWZlbmNlID0gcGV0SW5mby5EZWZlbnNlO1xyXG4gICAgICAgICAgICBwZXRIZWFsdGggPSBwZXRJbmZvLkhlYWx0aDtcclxuICAgICAgICAgICAgcGV0SGl0ID0gcGV0SW5mby5IaXQ7XHJcbiAgICAgICAgICAgIHBldE1pc3MgPSBwZXRJbmZvLk1pc3M7XHJcbiAgICAgICAgICAgIHBldENyaXRpY2FsID0gcGV0SW5mby5Dcml0aWNhbDtcclxuICAgICAgICAgICAgcGV0QW50aUNyaXRpY2FsID0gcGV0SW5mby5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEV4dHJhQ3JpdGljYWwgPSBwZXRJbmZvLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEFudGlFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxIRC5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgLy8g5ZG95Lit5YC8XHJcbiAgICAgICAgbG9jYWxIRC5IaXQgPSBhdHRyaWJ1dGVEYXRhLkhpdCArIHBldEhpdDtcclxuICAgICAgICAvLyDpl6rpgb/lgLxcclxuICAgICAgICBsb2NhbEhELk1pc3MgPSBhdHRyaWJ1dGVEYXRhLk1pc3MgKyBwZXRNaXNzO1xyXG4gICAgICAgIC8vIOaatOWHu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkNyaXRpY2FsICsgcGV0Q3JpdGljYWw7XHJcbiAgICAgICAgLy8g6Ziy54iG5YC8XHJcbiAgICAgICAgbG9jYWxIRC5BbnRpQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlDcml0aWNhbCArIHBldEFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vlop7luYVcclxuICAgICAgICBsb2NhbEhELkV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkV4dHJhQ3JpdGljYWwgKyBwZXRFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIOaatOWHu+aKl+aAp1xyXG4gICAgICAgIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlFeHRyYUNyaXRpY2FsICsgcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcblxyXG4gICAgICAgIC8vIOaUu+mAn1xyXG4gICAgICAgIGxldCBIQklNID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxvY2FsSEQuYmFzZV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuYXRrU3BlZWQgPSBIQklNLmdldEJhc2VTcGVlZChoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuYnVsbGV0X3NwZWVkID0gSEJJTS5nZXRCYXNlQnVsbGV0U3BlZWQoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICBsb2NhbEhELmdvbmdqaV9mYW53ZWkgPSBIQklNLmdldEF0dGFja1JhbmdlKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgIC8vIOatpuWZqOWKoOaIkFxyXG4gICAgICAgIGxldCBhbGxXZWFwb25IcCA9IDAsYWxsV2VhcG9uQXRrID0gMCxhbGxXZWFwb25EZWZlbmNlID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSBFcXVpcFR5cGUuV3VRaTtpPEVxdWlwVHlwZS5OdW07aSsrKXtcclxuICAgICAgICAgICAgbGV0IHdlYXBvbkluZm8gPSBoZXJvSW5mb1tcIndlYXJcIitpXTtcclxuICAgICAgICAgICAgaWYod2VhcG9uSW5mbyAhPSAwKXtcclxuICAgICAgICAgICAgICAgIGxldCB3ZWFwb25EYXRhID0gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEF0dHJpYnV0ZXNhZGRpdGlvbmFsKHdlYXBvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uQXRrICs9IHdlYXBvbkRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBhbGxXZWFwb25EZWZlbmNlICs9IHdlYXBvbkRhdGFbMV07XHJcbiAgICAgICAgICAgICAgICBhbGxXZWFwb25IcCArPSB3ZWFwb25EYXRhWzJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLeaAu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQXR0YWNrID0gbG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrICsgYWxsV2VhcG9uQXRrICsgcGV0QXRrICsgZXhBdHRhY2s7XHJcbiAgICAgICAgbG9jYWxIRC5IZWFsdGggPSBsb2NhbEhELnRvdGFsX2hwID0gbG9jYWxIRC5maXhlZF9ocCArIGFsbFdlYXBvbkhwICsgcGV0SGVhbHRoICsgZXhIcDtcclxuICAgICAgICBsb2NhbEhELkRlZmVuc2UgPSBsb2NhbEhELnRvdGFsX2RlZmVuc2UgPSBsb2NhbEhELmZpeF9kZWZlbnNlICsgYWxsV2VhcG9uRGVmZW5jZSArIHBldERlZmVuY2UgKyBleERlZmVuc2U7XHJcblxyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9JbmZvLmhlcm9fdHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKSArIDE7XHJcblxyXG4gICAgICAgIGxvY2FsSEQuQ29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3o9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTsgIFxyXG4gICAgICAgIGxvY2FsSEQudW5sb2NrX3N0YXRlPW5ldyBNYXA8bnVtYmVyLGJvb2xlYW4+KCk7XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU2tpbGxQb3NBbmRTa2lsbExldmVsKGhlcm9JbmZvLmhlcm9fdHlwZSxzLHN0YXIpO1xyXG4gICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3guc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8xKTtcclxuICAgICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3kuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8yKTtcclxuICAgICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3ouc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8zKTtcclxuICAgICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlXzQuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV80KTtcclxuICAgICAgICAgICAgbG9jYWxIRC5Db2xkRG93bi5zZXQocyxqc29uRGF0YS5Db2xkRG93bik7XHJcbiAgICAgICAgICAgIGxvY2FsSEQudW5sb2NrX3N0YXRlLnNldChzLGhlcm9JbmZvLmhlcm9fbGV2ZWw+PVNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGlmKGV4U3RhZ2U+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhJZD1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChoZXJvSW5mby5oZXJvX3R5cGUsZXhTdGFnZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhTdGFyPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXIoZXhJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhTa2lsbElkPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKGhlcm9JbmZvLmhlcm9fdHlwZSxleFN0YXIrMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9RXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkV4Y2x1c2l2ZVdlYXBvblNraWxsKGV4U2tpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxvY2FsSERbXCJFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlX1wiK3NdPWpzb25EYXRhW1wiRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV9cIitzXTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9jYWxIRDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGdldFRhcmdldEhlcm9EYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSxzdGFnZTpudW1iZXIsbGV2ZWw6bnVtYmVyKTpIZXJvRGF0YXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbG9jYWxIRD1uZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICBsZXQgaGVyb0xldmVsID0gbGV2ZWw7XHJcblxyXG4gICAgICAgIC8vIOWuoOeJqeWxnuaAp+WumuS5iVxyXG4gICAgICAgIGxldCBwZXRBdGsgPSAwLHBldERlZmVuY2UgPSAwLHBldEhlYWx0aCA9IDAscGV0SGl0ID0gMCxwZXRNaXNzID0gMCxwZXRDcml0aWNhbCA9IDAscGV0QW50aUNyaXRpY2FsID0gMCxwZXRFeHRyYUNyaXRpY2FsID0gMCxwZXRBbnRpRXh0cmFDcml0aWNhbCA9IDA7XHJcblxyXG4gICAgICAgIC8vLS3lm7rlrprlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0cmlidXRlRGF0YTpKc29uSGVyb0F0dHJpYnV0ZSA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGUsc3RhZ2UpO1xyXG4gICAgICAgIGxvY2FsSEQuZml4ZWRfaHAgPSAoaGVyb0xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhIZWFsdGgpICsgYXR0cmlidXRlRGF0YS5CYXNlSGVhbHRoO1xyXG4gICAgICAgIGxvY2FsSEQuZml4ZWRfYXR0Y2sgPSAoaGVyb0xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhBdHRhY2spICsgYXR0cmlidXRlRGF0YS5CYXNlQXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuZml4X2RlZmVuc2UgPSAoaGVyb0xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhEZWZlbnNlKSArIGF0dHJpYnV0ZURhdGEuQmFzZURlZmVuc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5q2m5ZmoJuWuoOeJqeWKoOaIkFxyXG4gICAgICAgIGxldCBoZXJvSW5mbyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGxldCBhbGxXZWFwb25IcCA9IDAsYWxsV2VhcG9uQXRrID0gMCxhbGxXZWFwb25EZWZlbmNlID0gMDtcclxuICAgICAgICBpZihoZXJvSW5mbyE9bnVsbCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGV0SWQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICBpZihwZXRJZCE9MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGV0SW5mbyA9IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0QXR0cmlidXRlKHBldElkKTtcclxuICAgICAgICAgICAgICAgIHBldEF0ayA9IHBldEluZm8uQXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgcGV0RGVmZW5jZSA9IHBldEluZm8uRGVmZW5zZTtcclxuICAgICAgICAgICAgICAgIHBldEhlYWx0aCA9IHBldEluZm8uSGVhbHRoO1xyXG4gICAgICAgICAgICAgICAgcGV0SGl0ID0gcGV0SW5mby5IaXQ7XHJcbiAgICAgICAgICAgICAgICBwZXRNaXNzID0gcGV0SW5mby5NaXNzO1xyXG4gICAgICAgICAgICAgICAgcGV0Q3JpdGljYWwgPSBwZXRJbmZvLkNyaXRpY2FsO1xyXG4gICAgICAgICAgICAgICAgcGV0QW50aUNyaXRpY2FsID0gcGV0SW5mby5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgICAgICAgICBwZXRFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgICAgICAgICAgcGV0QW50aUV4dHJhQ3JpdGljYWwgPSBwZXRBbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbEhELnBldF9pZD1wZXRJZDtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gRXF1aXBUeXBlLld1UWk7aTxFcXVpcFR5cGUuTnVtO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhcG9uSW5mbyA9IGhlcm9JbmZvW1wid2VhclwiK2ldO1xyXG4gICAgICAgICAgICAgICAgaWYod2VhcG9uSW5mbyAhPSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2VhcG9uRGF0YSA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzYWRkaXRpb25hbCh3ZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxXZWFwb25BdGsgKz0gd2VhcG9uRGF0YVswXTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxXZWFwb25EZWZlbmNlICs9IHdlYXBvbkRhdGFbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2VhcG9uSHAgKz0gd2VhcG9uRGF0YVsyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5ZG95Lit5YC8XHJcbiAgICAgICAgbG9jYWxIRC5IaXQgPSBhdHRyaWJ1dGVEYXRhLkhpdCArIHBldEhpdDtcclxuICAgICAgICAvLyDpl6rpgb/lgLxcclxuICAgICAgICBsb2NhbEhELk1pc3MgPSBhdHRyaWJ1dGVEYXRhLk1pc3MgKyBwZXRNaXNzO1xyXG4gICAgICAgIC8vIOaatOWHu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkNyaXRpY2FsICsgcGV0Q3JpdGljYWw7XHJcbiAgICAgICAgLy8g6Ziy54iG5YC8XHJcbiAgICAgICAgbG9jYWxIRC5BbnRpQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlDcml0aWNhbCArIHBldEFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vlop7luYVcclxuICAgICAgICBsb2NhbEhELkV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkV4dHJhQ3JpdGljYWwgKyBwZXRFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIOaatOWHu+aKl+aAp1xyXG4gICAgICAgIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlFeHRyYUNyaXRpY2FsICsgcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcblxyXG4gICAgICAgIC8vIOaUu+mAn1xyXG4gICAgICAgIGxldCBIQklNID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxvY2FsSEQuYmFzZV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmdvbmdqaV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmJ1bGxldF9zcGVlZCA9IEhCSU0uZ2V0QmFzZUJ1bGxldFNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmdvbmdqaV9mYW53ZWkgPSBIQklNLmdldEF0dGFja1JhbmdlKGhlcm9UeXBlKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIC0t5oC75YC8XHJcbiAgICAgICAgbG9jYWxIRC5BdHRhY2sgPSBsb2NhbEhELnRvdGFsX2F0dGFjayA9IGxvY2FsSEQuZml4ZWRfYXR0Y2sgKyBhbGxXZWFwb25BdGsgKyBwZXRBdGs7XHJcbiAgICAgICAgbG9jYWxIRC5IZWFsdGggPSBsb2NhbEhELnRvdGFsX2hwID0gbG9jYWxIRC5maXhlZF9ocCArIGFsbFdlYXBvbkhwICsgcGV0SGVhbHRoO1xyXG4gICAgICAgIGxvY2FsSEQuRGVmZW5zZSA9IGxvY2FsSEQudG90YWxfZGVmZW5zZSA9IGxvY2FsSEQuZml4X2RlZmVuc2UgKyBhbGxXZWFwb25EZWZlbmNlICsgcGV0RGVmZW5jZTtcclxuXHJcbiAgICAgICAgLy8gLS3mgLvlgLxcclxuICAgICAgICAvLyBsb2NhbEhELkF0dGFjaz1sb2NhbEhELnRvdGFsX2F0dGFjayA9IGxvY2FsSEQuZml4ZWRfYXR0Y2sgO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuSGVhbHRoPWxvY2FsSEQudG90YWxfaHAgPSBsb2NhbEhELmZpeGVkX2hwIDtcclxuICAgICAgICAvLyBsb2NhbEhELkRlZmVuc2U9bG9jYWxIRC50b3RhbF9kZWZlbnNlID0gbG9jYWxIRC5maXhfZGVmZW5zZSA7XHJcblxyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9UeXBlLHN0YWdlKSArIDE7XHJcblxyXG4gICAgICAgIGxvY2FsSEQuQ29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3o9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTsgIFxyXG5cclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9NDsgcysrKXtcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPVNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTa2lsbFBvc0FuZFNraWxsTGV2ZWwoaGVyb1R5cGUscyxzdGFyKTtcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV95LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcy5oZXJvX2RhdGEuc2V0KGhlcm9UeXBlLGxvY2FsSEQpO1xyXG4gICAgICAgIHJldHVybiBsb2NhbEhEO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9EYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb0RhdGF7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVlcEhlcm9EYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb0RhdGF7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICBsZXQgdGVtcCA9IHRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSk7XHJcbiAgICAgICAgZGF0YS50b3RhbF9hdHRhY2sgPSB0ZW1wLnRvdGFsX2F0dGFjaztcclxuICAgICAgICBkYXRhLnRvdGFsX2RlZmVuc2UgPSB0ZW1wLnRvdGFsX2RlZmVuc2U7XHJcbiAgICAgICAgZGF0YS50b3RhbF9ocCA9IHRlbXAudG90YWxfaHA7XHJcbiAgICAgICAgZGF0YS5IaXQgPSB0ZW1wLkhpdDtcclxuICAgICAgICBkYXRhLk1pc3MgPSB0ZW1wLk1pc3M7XHJcbiAgICAgICAgZGF0YS5Dcml0aWNhbCA9IHRlbXAuQ3JpdGljYWw7XHJcbiAgICAgICAgZGF0YS5BbnRpQ3JpdGljYWwgPSB0ZW1wLkFudGlDcml0aWNhbDtcclxuICAgICAgICBkYXRhLkV4dHJhQ3JpdGljYWwgPSB0ZW1wLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgZGF0YS5BbnRpRXh0cmFDcml0aWNhbCA9IHRlbXAuQW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQmluZFBldChoZXJvVHlwZTpIZXJvX1R5cGUscGV0SW5mbzpQZXRJbmZvKXtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpKXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKS5wZXRfaW5mbz1wZXRJbmZvO1xyXG4gICAgICAgICAgICAvL3RoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSkucGV0X2luZm8uc2VxdWVuY2VfaWQ9MTIzO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkSGVyb0RhdGEoaGVyb1R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmiJjliptcclxuICAgIGdldEFsbEhlcm9aaGFubGkoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtPTA7XHJcbiAgICAgICAgbGV0IGxpc3Q9dGhpcy5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW0rPU1hdGguZmxvb3IodGhpcy5nZXRIZXJvWmhhbmxpKGxpc3RbaV0uaGVyb190eXBlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb1poYW5saShoZXJvVHlwZTpIZXJvX1R5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEhlcm9EYXRhKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGE9dGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgemhhbmxpID0gaGVyb0RhdGEudG90YWxfaHAgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgKyBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMilcclxuICAgICAgICArIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMylcclxuICAgICAgICArIGhlcm9EYXRhLkhpdCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig0KVxyXG4gICAgICAgICsgaGVyb0RhdGEuTWlzcyAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig1KVxyXG4gICAgICAgICsgKGhlcm9EYXRhLkNyaXRpY2FsIC0gMTAwKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig2KVxyXG4gICAgICAgICsgaGVyb0RhdGEuQW50aUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDcpXHJcbiAgICAgICAgKyAoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCAtIDIpICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDgpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig5KVxyXG4gICAgICAgIHJldHVybiB6aGFubGk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFyZ2V0SGVyb1poYW5saShoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyLGxldmVsOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhPXRoaXMuZ2V0VGFyZ2V0SGVyb0RhdGEoaGVyb1R5cGUsc3RhZ2UsbGV2ZWwpO1xyXG4gICAgICAgIGxldCB6aGFubGkgPSBoZXJvRGF0YS50b3RhbF9ocCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigxKSBcclxuICAgICAgICArIGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigyKVxyXG4gICAgICAgICsgaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigzKVxyXG4gICAgICAgICsgaGVyb0RhdGEuSGl0ICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDQpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5NaXNzICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDUpXHJcbiAgICAgICAgKyAoaGVyb0RhdGEuQ3JpdGljYWwgLSAxMDApICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDYpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNylcclxuICAgICAgICArIChoZXJvRGF0YS5FeHRyYUNyaXRpY2FsIC0gMikgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoOClcclxuICAgICAgICArIGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDkpXHJcbiAgICAgICAgcmV0dXJuIHpoYW5saTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXdEYXlaaGFubGkoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlfemhhbmxpXycpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT10aGlzLmdldEFsbEhlcm9aaGFubGkoKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEhlcm9Jc05lZWRUaXAoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlzVGlwPWZhbHNlO1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZXJvX2dldF90aXBfJytoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNUaXA9dHJ1ZTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNUaXA9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1RpcDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0SGVyb0lzTmVlZFRpcChoZXJvVHlwZTpIZXJvX1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoZXJvX2dldF90aXBfJytoZXJvVHlwZSwxKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0U2tpbkluZGV4KHRpZXI6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgc3dpdGNoKHRpZXIpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA1OntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDY6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+W+l+S4gOS4quS4iumYteeahOmaj+acuuiLsembhFxyXG4gICAgKiBAcGFyYW0gbW9kZSDmuLjmiI/mqKHlvI9cclxuICAgICogQHBhcmFtIGV4SWQg5o6S6Zmk55qEaWRcclxuICAgICogQHJldHVybnMg6ZmkZXhJZOS5i+WklueahGlkXHJcbiAgICAqL1xyXG4gICAgZ2V0UmFuZEhlcm9JZChtb2RlOkdhbWVNb2RlLGV4SWQ6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMLHRlYW1MaXN0PzpudW1iZXJbXSk6SGVyb19UeXBle1xyXG4gICAgICAgIC8v6ZqP5py66Iux6ZuEXHJcbiAgICAgICAgaWYoIXRlYW1MaXN0KVxyXG4gICAgICAgIHRlYW1MaXN0PXRoaXMuZ2V0VGVhbUxpc3QobW9kZSk7XHJcbiAgICAgICAgbGV0IHJhbmRMaXN0PVtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRlYW1MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlkPXRlYW1MaXN0W2ldO1xyXG4gICAgICAgICAgICBpZihpZD5IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICBpZihpZCE9ZXhJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZExpc3QucHVzaCh0ZWFtTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvSWQ9MDtcclxuICAgICAgICBpZihyYW5kTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGhlcm9JZD1yYW5kTGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmFuZExpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICByZXR1cm4gaGVyb0lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi0tLS0tLS0tLS0tLS0tLS3oo4XlpIctLS0tLS0tLS0tLS0tLS0tLS0tKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICAvKipcclxuICAgICAqIOepv+aItOS4gOS4quijheWkhyxlcXVpcElk5Li6MOaXtu+8jOivt+WKoeW/heaKimVxdWlwVHlwZeWGmeS4ilxyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhGlkICAgICBcclxuICAgICAqIEBwYXJhbSBlcXVpcElkIOijheWkh2lkXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBUeXBlIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICBhZGRXZWFyRXF1aXBtZW50KGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcElkOm51bWJlcixlcXVpcFR5cGU/OkVxdWlwVHlwZSl7XHJcbiAgICAgICAgaWYoIWVxdWlwVHlwZSl7XHJcbiAgICAgICAgICAgIGVxdWlwVHlwZT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50UG9zaXRpb24oZXF1aXBJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZyA6KaB6YGN5Y6G6KOF5aSH5YiX6KGo77yM6I635Y+WaGVyb190eXBl5Y+Y6YePXHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7kuLrku7vmhI9Y5ZCN6Iux6ZuE56m/5oi0MeS7tuijheWkhyk7XHJcbiAgICAgICAgdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlbXCJ3ZWFyXCIrZXF1aXBUeXBlXT1lcXVpcElkO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFpoYW5saVNob3coKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5FUVVJUF9XRUFSX1VOTE9BRCk7XHJcbiAgICAgICAgdGhpcy5zYXZlSGVyb0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNuOS4i+S4gOS4quijheWkh1xyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhGlkXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBQb3Mg6KOF5aSH5L2NXHJcbiAgICAgKi9cclxuICAgICB1bmxvYWRXZWFyRXF1aXBtZW50KGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcFR5cGU6RXF1aXBUeXBlKXtcclxuICAgICAgICAvL+mcgOimgemBjeWOhuijheWkh+WIl+ihqO+8jOiOt+WPlmhlcm9fdHlwZeWPmOmHj1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpW1wid2VhclwiK2VxdWlwVHlwZV09MDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5q2j5Zyo6KOF5aSH55qE6KOF5aSHaWQgKi9cclxuICAgIGdldFdlYXJFcXVpcG1lbnQoaGVyb1R5cGU6SGVyb19UeXBlLGVxdWlwVHlwZTpFcXVpcFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlbXCJ3ZWFyXCIrZXF1aXBUeXBlXTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWJqeS9meeahOijheWkh+aVsOmHjyAqL1xyXG4gICAgZ2V0RXF1aXBtZW50UmVtYWluTnVtKGVxdWlwSW5mbzpFcXVpcEluZm8pOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPWVxdWlwSW5mby5lcXVpcF9udW07XHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKGVxdWlwSW5mby5lcXVpcF9pZCk7XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGhlcm9MaXN0W2ldW1wid2VhclwiK3R5cGVdPT1lcXVpcEluZm8uZXF1aXBfaWQpe1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluS4gOS4quijheWkh2lk6KKr6KOF5aSH55qE6Iux6ZuE5YiX6KGoICovXHJcbiAgICBnZXRXZWFyRXF1aXBtZW50SGVyb0xpc3QoZXF1aXBJbmZvOkVxdWlwSW5mbyk6SGVyb19UeXBlW117XHJcbiAgICAgICAgbGV0IGxpc3Q9W107XHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKGVxdWlwSW5mby5lcXVpcF9pZCk7XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSW5mbz1oZXJvTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaGVyb0luZm9bXCJ3ZWFyXCIrdHlwZV09PWVxdWlwSW5mby5lcXVpcF9pZCl7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWuoOeJqS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDnqb/miLTkuIDkuKrlrqDniaksZXF1aXBJZOS4ujDml7bvvIzor7fliqHlv4XmioplcXVpcFR5cGXlhpnkuIpcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZCAgICAgXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg6KOF5aSHaWRcclxuICAgICAqIEBwYXJhbSBlcXVpcFR5cGUg6KOF5aSH5L2NXHJcbiAgICAgKi9cclxuICAgICBhZGRXZWFyUGV0KGhlcm9UeXBlOkhlcm9fVHlwZSxwZXRJZDpudW1iZXIpe1xyXG4gICAgICAgIC8v6ZyA6KaB6YGN5Y6G6KOF5aSH5YiX6KGo77yM6I635Y+WaGVyb190eXBl5Y+Y6YePXHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7kuLrku7vmhI9Y5ZCN6Iux6ZuE56m/5oi0MeS7tuijheWkhyk7XHJcbiAgICAgICAgdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSkucGV0X2lkPXBldElkO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFpoYW5saVNob3coKTtcclxuICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5FUVVJUF9XRUFSX1VOTE9BRCk7XHJcbiAgICAgICAgdGhpcy5zYXZlSGVyb0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNuOS4i+S4gOS4quijheWkh1xyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhGlkXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBQb3Mg6KOF5aSH5L2NXHJcbiAgICAgKi9cclxuICAgICB1bmxvYWRXZWFyUGV0KGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgLy/pnIDopoHpgY3ljoboo4XlpIfliJfooajvvIzojrflj5ZoZXJvX3R5cGXlj5jph49cclxuICAgICAgICB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKS5wZXRfaWQ9MDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5q2j5Zyo6KOF5aSH55qE6KOF5aSHaWQgKi9cclxuICAgIGdldFdlYXJQZXQoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpLnBldF9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bliankvZnnmoToo4XlpIfmlbDph48gKi9cclxuICAgIGdldFBldFJlbWFpbk51bShwZXRJbmZvOlBldE1lc3NhZ2UpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPXBldEluZm8ucGV0X251bTtcclxuICAgICAgICBsZXQgdHlwZT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50UG9zaXRpb24ocGV0SW5mby5wZXRfaWQpO1xyXG4gICAgICAgIGxldCBoZXJvTGlzdD10aGlzLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihoZXJvTGlzdFtpXVtcIndlYXJcIit0eXBlXT09cGV0SW5mby5wZXRfaWQpe1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluS4gOS4quijheWkh2lk6KKr6KOF5aSH55qE6Iux6ZuE5YiX6KGoICovXHJcbiAgICBnZXRXZWFyUGV0SGVyb0xpc3QocGV0SW5mbzpQZXRNZXNzYWdlKTpIZXJvX1R5cGVbXXtcclxuICAgICAgICBsZXQgbGlzdD1bXTtcclxuICAgICAgICBsZXQgaGVyb0xpc3Q9dGhpcy5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGhlcm9JbmZvPWhlcm9MaXN0W2ldO1xyXG4gICAgICAgICAgICBpZihoZXJvSW5mby5wZXRfaWQ9PXBldEluZm8ucGV0X2lkKXtcclxuICAgICAgICAgICAgICAgIGxpc3QucHVzaChoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOafpeaYr+WQpuWPr+S7peWNh+e6pyAqL1xyXG4gICAgY2hlY2tVcGdyYWRlKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb1VwZ3JhZGVEYXRhe1xyXG4gICAgICAgIC8vIGxldCBoZXJvUXVhbGl0eSA9IHRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxldCB1cERhdGEgPSBuZXcgSGVyb1VwZ3JhZGVEYXRhKCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRIZXJvTGV2ZWwoaGVyb1R5cGUpID09IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvVHlwZSkpIHJldHVybiB1cERhdGFcclxuICAgICAgICBsZXQgY29pbkhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pO1xyXG4gICAgICAgIGxldCBjb2luTmVlZE51bSA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdENvaW4odGhpcy5nZXRIZXJvTGV2ZWwoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgZ2VtSGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuICAgICAgICBsZXQgZ2VtTmVlZE51bSA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEdlbSh0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSkpO1xyXG4gICAgICAgIGxldCBmaW5pc2hMZXZlbCA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQgbmVlZEZpbmlzaExldmVsID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbExpbWl0KHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKSk7XHJcbiAgICAgICAgLy8g5Y2H57qn5oyJ6ZKu572u54Gw77yM5LyY5YWI5YWz5Y2h572u54GwKOWNs+WcqOmHkeW4gei2s+Wkn+eahOaDheWGteS4i++8jOmAmui/h+WFs+WNoeayoei+vuWIsOimgeaxguWImeaMiemSrue9rueBsCnjgIJcclxuICAgICAgICAvLyDlpoLmnpzmmK/ku6XkuLrph5HluIHkuI3otrPnva7ngbDliJnngrnlh7vljYfnuqfmjInpkq7lvLnlh7rotYTmupDkuI3otrPlvLnnqpfvvIzlpoLmnpzmmK/lhbPljaHpmZDliLbnva7ngbDvvIzngrnlh7vljYfnuqfmjInpkq7liJnmj5DnpLrpgJrov4flhbPljaHkuI3otrPpo5jlrZfmj5DphpJcclxuICAgICAgICB1cERhdGEuaXNfY2FuX3VwPWNvaW5IYXZlTnVtPj1jb2luTmVlZE51bSAmJiBmaW5pc2hMZXZlbD49bmVlZEZpbmlzaExldmVsICYmIGdlbUhhdmVOdW0gPj0gZ2VtTmVlZE51bTtcclxuICAgICAgICByZXR1cm4gdXBEYXRhO1xyXG4gICAgfVxyXG4gICAgLyoq5qOA5p+l5piv5ZCm5Y+v5Lul5Y2H5pifICovXHJcbiAgICBjaGVja1VwU3RhcihoZXJvVHlwZTpIZXJvX1R5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvPXRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKCFoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1clN0YWdlPXRoaXMuZ2V0SGVyb1N0YWdlKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KGhlcm9UeXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKHRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpLGN1clN0YWdlKTtcclxuICAgICAgICByZXR1cm4gaGF2ZU51bSA+PSBuZWVkTnVtICYmIGN1clN0YWdlPEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvVHlwZSk7XHJcbiAgICB9XHJcbiAgICAvKirmo4Dmn6XmmK/lkKblj6/ku6Xkvb/nlKjkuIfog73noo7niYcgKi9cclxuICAgIGNoZWNrQWxsUHVycG9zZUZyYWdtZW50KGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaGVyb0luZm89dGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoIWhlcm9JbmZvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3VyU3RhZ2U9dGhpcy5nZXRIZXJvU3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgbmVlZE51bSA9IEhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3REZWJyaXNCeUhlcm9RdWFsaXR5QW5kU3RhZ2UodGhpcy5nZXRIZXJvUXVhbGl0eShoZXJvVHlwZSksY3VyU3RhZ2UpO1xyXG4gICAgICAgIGxldCBvZmZzZXROdW09bmVlZE51bS1oYXZlTnVtO1xyXG4gICAgICAgIHJldHVybiBoYXZlTnVtIDwgbmVlZE51bSAmJiBjdXJTdGFnZTxIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb1R5cGUpICYmIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmdldEhlcm9GcmFnbWVudElkKGhlcm9UeXBlKSk+PW9mZnNldE51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvRnJhZ21lbnRJZChoZXJvSWQ6SGVyb19UeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgLy/lk4HotKhcclxuICAgICAgICBsZXQgcXVhbGl0eT1IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShoZXJvSWQpO1xyXG4gICAgICAgIHJldHVybiAxMDEwMDArcXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuajgOa1i+iLsembhOaYr+WQpuWPr+S7peino+mUgSAqL1xyXG4gICAgY2hlY2tVbmxvY2soaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBoZXJvSW5mbz10aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpZihoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudChoZXJvVHlwZSkpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0ZyYWdtZW50TnVtKGhlcm9UeXBlKTtcclxuICAgICAgICBpZihoYXZlTnVtPj1uZWVkTnVtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXROdW09bmVlZE51bS1oYXZlTnVtO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuZ2V0SGVyb0ZyYWdtZW50SWQoaGVyb1R5cGUpKT49b2Zmc2V0TnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrRXhVcChoZXJvVHlwZTpIZXJvX1R5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvPXRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKGhlcm9JbmZvKXtcclxuICAgICAgICAgICAgbGV0IGV3U2hvd0RhdGEgPSBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25NZXNzYWdlKGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgaWYoaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID49IGV3U2hvd0RhdGEuTWF4U3RhZ2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIGxldCBuZWVkTnVtID0gRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RGcmFnbWVudChoZXJvSW5mby5oZXJvX3F1YWxpdHkpO1xyXG4gICAgICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShoZXJvQmFzZUluZm8uRXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGF2ZU51bT49bmVlZE51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0RXhjbHVzaXZlV2VhcG9uRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyKTpIZXJvRGF0YXtcclxuICAgICAgICBsZXQgaW5mbyA9IG5ldyBIZXJvRGF0YSgpO1xyXG4gICAgICAgIGxldCBoZXJvRGF0YSA9IHRoaXMuZ2V0SGVyb0RhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxldCBleERhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxzdGFnZSk7XHJcblxyXG4gICAgICAgIGlmKGV4RGF0YSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaW5mby50b3RhbF9ocCA9IGhlcm9EYXRhLmZpeGVkX2hwICogZXhEYXRhLkhlYWx0aDtcclxuICAgICAgICBpbmZvLnRvdGFsX2F0dGFjayA9IGhlcm9EYXRhLmZpeGVkX2F0dGNrICogZXhEYXRhLkF0dGFjaztcclxuICAgICAgICBpbmZvLnRvdGFsX2RlZmVuc2UgPSBoZXJvRGF0YS5maXhfZGVmZW5zZSAqIGV4RGF0YS5EZWZlbnNlO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBnZXRFeGNsdXNpdmVXZWFwb25Db21iYmF0KGhlcm9UeXBlOkhlcm9fVHlwZSxzdGFnZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBsZXQgZXhEYXRhID0gdGhpcy5nZXRFeGNsdXNpdmVXZWFwb25EYXRhKGhlcm9UeXBlLHN0YWdlKTtcclxuXHJcbiAgICAgICAgaWYoZXhEYXRhIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIG51bSA9IGV4RGF0YS50b3RhbF9ocCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigxKSBcclxuICAgICAgICAgICAgKyBleERhdGEudG90YWxfYXR0YWNrICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDIpXHJcbiAgICAgICAgICAgICsgZXhEYXRhLnRvdGFsX2RlZmVuc2UgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVtXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qOA5rWL5LiT5q2m6IO95ZCm5Y2H57qnICovXHJcbiAgICBjaGVja0V4Y2x1c2l2ZShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9FeGNsdXNpdmVEYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBIZXJvRXhjbHVzaXZlRGF0YSgpO1xyXG4gICAgICAgIC8vIGxldCB3ZWFwb25EYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkJ5SGVyb1R5cGVBbmRXZWFwb25MZXZlbChoZXJvVHlwZSx0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKS5leGNsdXNpdmVfZXF1aXBfbGV2ZWwpO1xyXG4gICAgICAgIC8vIGRhdGEuY29zdF9wcm9wX2lkPXdlYXBvbkRhdGEuU3BlbmRQcm9wSURcclxuICAgICAgICAvLyBkYXRhLmN1cl9wcm9wX251bT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oZGF0YS5jb3N0X3Byb3BfaWQpO1xyXG4gICAgICAgIC8vIGRhdGEuY29zdF9wcm9wX251bT13ZWFwb25EYXRhLlNwZW5kUHJvcE51bTtcclxuICAgICAgICAvLyBkYXRhLmlzX2Nhbl91cD1kYXRhLmN1cl9wcm9wX251bT49ZGF0YS5jb3N0X3Byb3BfbnVtO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgLyoq6YCa6L+H57qi54K557G75Z6L6I635Y+W6Iux6ZuE57G75Z6LICovXHJcbiAgICBzdGF0aWMgZ2V0SGVyb1R5cGVCeVJlZFR5cGUocmVkVHlwZTpSZWRFdmVudFR5cGUpOkhlcm9fVHlwZXtcclxuICAgICAgICBsZXQgaGVyb1R5cGU9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBzd2l0Y2gocmVkVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTpoZXJvVHlwZT1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8yOmhlcm9UeXBlPUhlcm9fVHlwZS5TaG91V2FuZzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMzpoZXJvVHlwZT1IZXJvX1R5cGUuUGFvU2hvdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNDpoZXJvVHlwZT1IZXJvX1R5cGUuRGVMdVlpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF81Omhlcm9UeXBlPUhlcm9fVHlwZS5LdWFuZ1poYW5TaGk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzY6aGVyb1R5cGU9SGVyb19UeXBlLlpoZW5EZTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNzpoZXJvVHlwZT1IZXJvX1R5cGUuTnZXdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfODpoZXJvVHlwZT1IZXJvX1R5cGUuR29uZ0ppYW5TaG91OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF85Omhlcm9UeXBlPUhlcm9fVHlwZS5CaW5nTnY7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEwOmhlcm9UeXBlPUhlcm9fVHlwZS5BTnVCaVNpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMTpoZXJvVHlwZT1IZXJvX1R5cGUuTWVpTW87IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEyOmhlcm9UeXBlPUhlcm9fVHlwZS5MZWlTaGVuOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlcm9UeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKumAmui/h+e6oueCueexu+Wei+iOt+WPluiLsembhOexu+WeiyAqL1xyXG4gICAgc3RhdGljIGdldFJlZFR5cGVCeUhlcm9UeXBlKGhlcm9UeXBlOkhlcm9fVHlwZSk6UmVkRXZlbnRUeXBle1xyXG4gICAgICAgIGxldCByZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9UeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLlNob3VXYW5nOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMjsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLlBhb1Nob3U6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8zOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuRGVMdVlpOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNDsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkt1YW5nWmhhblNoaTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzU7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5aaGVuRGU6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF82OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuTnZXdTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzc7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5Hb25nSmlhblNob3U6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF84OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuQmluZ052OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfOTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkFOdUJpU2k6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMDsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLk1laU1vOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTE7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5MZWlTaGVuOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTI7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVkVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEhlcm9MaXN0SnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEhlcm9MaXN0SnNvblN0cmluZyhoZXJvRGF0YXM6SGVyb09iamVjdFtdKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGhlcm9MaXN0Omhlcm9EYXRhcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=