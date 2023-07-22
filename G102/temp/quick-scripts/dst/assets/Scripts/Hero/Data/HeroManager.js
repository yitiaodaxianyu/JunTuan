
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1EO0FBQ25ELDhFQUFvRjtBQUNwRixxRUFBb0U7QUFDcEUsK0NBQXFEO0FBQ3JELDZDQUFtRDtBQUNuRCxxQ0FBMkM7QUFDM0MseURBQXVGO0FBQ3ZGLHVDQUFzQztBQUN0Qyx1REFBNkQ7QUFDN0QsaURBQTBFO0FBQzFFLHNEQUFxRDtBQUNyRCxvREFBK0M7QUFDL0MsMkRBQWlFO0FBRWpFLHlEQUF3RDtBQUN4RCwyREFBbUU7QUFDbkUsNEVBQWtGO0FBQ2xGLCtEQUFpRTtBQUNqRSw2REFBeUQ7QUFDekQseUNBQStDO0FBQy9DLGlEQUF5RDtBQUN6RCw2REFBbUU7QUFDbkUsc0RBQWlEO0FBQ2pELGdEQUErQztBQUMvQyxpREFBNEM7QUFDNUMsa0VBQXdFO0FBQ3hFLDREQUFrRTtBQUNsRSw0RUFBa0Y7QUFDbEYsMkNBQXNDO0FBQ3RDLDJEQUFrRjtBQUNsRixvREFBbUQ7QUFDbkQsZ0ZBQXNGO0FBRXRGLFlBQVk7QUFDWjtJQUFBO1FBQ0ksV0FBVztRQUNYLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsZ0JBQWdCO1FBQ2hCLGFBQVEsR0FBUyxLQUFLLENBQUM7UUFDdkIsYUFBYTtRQUNiLGFBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsZUFBZTtRQUNmLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsY0FBYztRQUNkLFlBQU8sR0FBUyxLQUFLLENBQUM7UUFDdEIsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLGtCQUFrQjtR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TyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDJDQUFxQixHQUE3QixVQUE4QixTQUFzQjtRQUNoRCxJQUFJLEdBQUcsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixHQUFHLEVBQUMsR0FBRztZQUNQLFFBQVEsRUFBQyxTQUFTO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsNUNjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQW01Q2pELGtCQUFDO0NBcjVDRCxBQXE1Q0MsSUFBQTtBQXI1Q1ksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTW9kZSwgSXNEZWJ1Z30gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgSGVyb1F1YWxpdHlNYW5hZ2VyIH0gZnJvbSBcIi4vSGVyb1F1YWxpdHlcIjtcclxuaW1wb3J0IHsgTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbFVwXCI7XHJcbmltcG9ydCB7IEFzc2V0c0V2ZW50VHlwZSwgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9EYXRhIH0gZnJvbSBcIi4vSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIgfSBmcm9tIFwiLi9Ta2lsbExldmVsVW5sb2NrXCI7XHJcbmltcG9ydCB7IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLCBKc29uSGVyb0F0dHJpYnV0ZSB9IGZyb20gXCIuL0hlcm9BdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9Ta2lsbENvbmZpZ3VyYXRpb25cIjtcclxuaW1wb3J0IHsgUGV0SW5mbywgUGV0TWVzc2FnZSB9IGZyb20gXCIuLi8uLi9QZXQvUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXF1aXBJbmZvLCBFcXVpcFR5cGUgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0VxdWlwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IEhlcm9UaXRsZU1hbmFnZXIgfSBmcm9tIFwiLi9IZXJvVGl0bGVcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlLCBIZXJvSW5mbyB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIgfSBmcm9tIFwiLi9Db21iYXRFZmZlY3RpdmVuZXNzXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3Bpcml0QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9QZXQvRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRVdVbmxvY2tDb3N0TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FV1VubG9ja0Nvc3RcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvblNraWxsXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSGVyb09iamVjdCwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uLy4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VcIjtcclxuXHJcbi8qKuiLsembhOWNh+e6p+aVsOaNriAqL1xyXG5leHBvcnQgY2xhc3MgSGVyb1VwZ3JhZGVEYXRhe1xyXG4gICAgLyoq5b2T5YmN55qE562J57qnICovXHJcbiAgICBjdXJfbGV2ZWw6bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3og73lpJ/ljYfnuqfnmoTmnIDlpKfnuqcgKi9cclxuICAgIG1heF9sZXZlbDpudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeetiee6p+aYr+WQpuWPr+S7peWNh+e6pyAqL1xyXG4gICAgaXNfbGV2ZWw6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKuW9k+WJjeaLpeacieeahOmHkeW4gSAqL1xyXG4gICAgY3VyX2NvaW46bnVtYmVyPTA7XHJcbiAgICAvKirljYfnuqfpnIDopoHoirHotLnnmoTph5HluIEgKi9cclxuICAgIGNvc3RfY29pbjpudW1iZXI9MDtcclxuICAgIC8qKuWNh+e6p+mHkeW4geaYr+WQpui2s+WknyAqL1xyXG4gICAgaXNfY29pbjpib29sZWFuPWZhbHNlO1xyXG4gICAgLy8gLyoq5b2T5YmN5oul5pyJ55qE57uP6aqMICovXHJcbiAgICAvLyBjdXJfZXhwOm51bWJlcj0wO1xyXG4gICAgLy8gLyoq5Y2H57qn6ZyA6KaB6Iqx6LS555qE57uP6aqMICovXHJcbiAgICAvLyBjb3N0X2V4cDpudW1iZXI9MDtcclxuICAgIC8vIC8qKuWNh+e6p+e7j+mqjOaYr+WQpui2s+WknyAqL1xyXG4gICAgLy8gaXNfZXhwOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvLyAvKirlvZPliY3mi6XmnInnmoTov5vpmLbnn7MgKi9cclxuICAgIC8vIGN1cl9qaW5qaWU6IG51bWJlciA9IDA7XHJcbiAgICAvLyAvKirljYfnuqfpnIDopoHoirHotLnnmoTov5vpmLbnn7MgKi9cclxuICAgIC8vIGNvc3RfamluamllOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gLyoq5Y2H57qn6L+b6Zi255+z5piv5ZCm6Laz5aSfICovXHJcbiAgICAvLyBpc19qaW5qaWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaYr+WQpuiDveWkn+WNh+e6pyAqL1xyXG4gICAgaXNfY2FuX3VwOmJvb2xlYW49ZmFsc2U7XHJcbn1cclxuLyoq6Iux6ZuE5LiT5q2m5pWw5o2uICovXHJcbmV4cG9ydCBjbGFzcyBIZXJvRXhjbHVzaXZlRGF0YXtcclxuICAgIC8qKuW9k+WJjeaLpeacieeahOmBk+WFt+aVsOmHjyAqL1xyXG4gICAgY3VyX3Byb3BfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5Y2H57qn6ZyA6KaB55qE6YGT5YW35pWw6YePICovXHJcbiAgICBjb3N0X3Byb3BfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5Y2H57qn6ZyA6KaB55qE6YGT5YW3aWQgKi9cclxuICAgIGNvc3RfcHJvcF9pZDpudW1iZXI9MDtcclxuICAgIC8qKuaYr+WQpuiDveWkn+WNh+e6pyAqL1xyXG4gICAgaXNfY2FuX3VwOmJvb2xlYW49ZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZXJvTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBIZXJvTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+i1hOa6kFxyXG4gICAgcHJpdmF0ZSBidG5faGVyb190ZWFtOmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBidG5faGVyb19yb2xlOmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBzcHJpdGVfYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuICAgIHByaXZhdGUgc3ByaXRlX2F0bGFzczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG4gICAgLy8gcHJpdmF0ZSByb2xlX2F0bGFzOmNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3BfYm9keTpNYXA8bnVtYmVyLGNjLlNwcml0ZUZyYW1lPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBoZXJvX2ZyYWdtZW50OmNjLlByZWZhYj1udWxsO1xyXG4gICAgLy/oi7Hpm4TmlbDmja5cclxuICAgIHByaXZhdGUgaGVyb19kYXRhOk1hcDxudW1iZXIsSGVyb0RhdGE+PW51bGw7XHJcbiAgICAvLyBwcml2YXRlIGhlcm9fbGV2ZWw6bnVtYmVyW109W107XHJcbiAgICAvLyBwcml2YXRlIGhlcm9fcXVhbGl0eTpudW1iZXJbXT1bXTtcclxuICAgIHByaXZhdGUgaGVyb19saXN0Okhlcm9JbmZvW10gPSBbXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpIZXJvTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEhlcm9NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICBcclxuICAgICAgICBIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgIFxyXG4gICAgICAgIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgdGhpcy5sb2FkVGVhbVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFJvbGVQcmVmYWIoKTtcclxuICAgICAgICB0aGlzLmxvYWRGcmFnbWVudFByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwKCk7ICAgICBcclxuICAgICAgICAvLyB0aGlzLmxvYWRSb2xlU3AoKTsgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZFNwcygpO1xyXG4gICAgICAgIHRoaXMubG9hZEJvZHkoKTtcclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3otYTmupDnmoTor7vlj5YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJpdmF0ZSBsb2FkVGVhbVByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMuYnRuX2hlcm9fdGVhbSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2J0bl9oZXJvX3RlYW0nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2hlcm9fdGVhbT1hc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUm9sZVByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMuYnRuX2hlcm9fcm9sZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2J0bl9oZXJvX3JvbGUnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2hlcm9fcm9sZT1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkRnJhZ21lbnRQcmVmYWIoKXtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZnJhZ21lbnQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvX2ZyYWdtZW50JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhlcm9fZnJhZ21lbnQ9YXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwKCl7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVfYXRsYXMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvX2xpc3RfdWknLGNjLlNwcml0ZUF0bGFzLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVBdGxhcyk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCfliqDovb1FcXVpcG1lbnRBdHRyaWJ1dGXmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVfYXRsYXM9YXNzZXRzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgbG9hZFJvbGVTcCgpe1xyXG4gICAgLy8gICAgIGlmKHRoaXMucm9sZV9hdGxhcylcclxuICAgIC8vICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL3JvbGVfdWknLGNjLlNwcml0ZUF0bGFzLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVBdGxhcyk9PntcclxuICAgIC8vICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKCfliqDovb1FcXVpcG1lbnRBdHRyaWJ1dGXmiJDlip8nKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5yb2xlX2F0bGFzPWFzc2V0czsgICAgICAgICAgICBcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTcHMoKXtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZV9hdGxhc3MpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvJyxjYy5TcHJpdGVBdGxhcywoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygn5Yqg6L29RXF1aXBtZW50QXR0cmlidXRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlX2F0bGFzcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKirliqDovb3nq4vnu5jkuLvkvZMgKi9cclxuICAgIHByaXZhdGUgbG9hZEJvZHkoKXtcclxuICAgICAgICBpZih0aGlzLnNwX2JvZHkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BfYm9keT1uZXcgTWFwPG51bWJlcixjYy5TcHJpdGVGcmFtZT4oKTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcignaGVyb3MvYm9keScsY2MuU3ByaXRlRnJhbWUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUZyYW1lW10pPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxlbj1hc3NldHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwPWFzc2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lPXNwLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9bmFtZS5sYXN0SW5kZXhPZignXycpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXghPS0xKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb0lkPXBhcnNlSW50KG5hbWUuc3Vic3RyaW5nKGluZGV4KzEpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwX2JvZHkuc2V0KGhlcm9JZCxzcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGdldFNwcml0ZUZyYW1lQnlOYW1lKGtleTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZV9hdGxhcy5nZXRTcHJpdGVGcmFtZShrZXkpO1xyXG4gICAgfVxyXG4gICAgLy8gcHVibGljIGdldFJvbGVTcHJpdGVGcmFtZUJ5TmFtZShrZXk6c3RyaW5nKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5yb2xlX2F0bGFzLmdldFNwcml0ZUZyYW1lKGtleSk7XHJcbiAgICAvLyB9XHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKGtleTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZV9hdGxhc3MuZ2V0U3ByaXRlRnJhbWUoa2V5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldEhlcm9TcHJpdGVGcmFtZShoZXJvVHlwZTpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwcml0ZUZyYW1lQnlOYW1lKCdoZXJvJytoZXJvVHlwZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0SGVyb1Nwcml0ZUZyYW1lcyhoZXJvVHlwZTpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwcml0ZUZyYW1lQnlOYW1lcygnSGVhZF9IZXJvX1NfJytoZXJvVHlwZSk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfkuIDlvKDoi7Hpm4TnmoTnq4vnu5jkuLvkvZMgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvQm9keShoZXJvSWQ6SGVyb19UeXBlKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcF9ib2R5LmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaVsOaNruS/neWtmOS4juivu+WPli0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIG9uTG9hZEhlcm9EYXRhKCl7XHJcbiAgICAgICAgdGhpcy5sb2FkSGVyb0xpc3QoKTtcclxuICAgICAgICB0aGlzLmxvYWRBbGxIZXJvRGF0YSgpOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOS/neWtmOW9k+WJjeeahOaLpeacieeahOiLsembhOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBzYXZlSGVyb0xpc3QoKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEpzb24oU3RvcmFnZUtleS5IZXJvTGlzdCx0aGlzLmhlcm9fbGlzdCk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkSGVyb0xpc3QoKTtcclxuICAgICAgICB0aGlzLmxvYWRBbGxIZXJvRGF0YSgpOyBcclxuICAgIH1cclxuXHJcbiAgICByZXBvcnRIZXJvTGlzdCgpe1xyXG4gICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBsZXQgaGVyb09iamVjdDpIZXJvT2JqZWN0ID0gbmV3IEhlcm9PYmplY3QoKTtcclxuICAgICAgICAgICAgaGVyb09iamVjdC5oZXJvSWQgPSB2Lmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgaGVyb09iamVjdC5oZXJvTGV2ZWwgPSB2Lmhlcm9fbGV2ZWw7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QuaGVyb1N0YWdlID0gdi5oZXJvX3N0YWdlO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0Lmhlcm9XZWFwb25TdGFnZSA9IHYuZXhjbHVzaXZlX2VxdWlwX3N0YWdlO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0LndlYXBvbnMgPSB2LndlYXIxO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0LmFybW9yID0gdi53ZWFyMjtcclxuICAgICAgICAgICAgaGVyb09iamVjdC5hY2Nlc3NvcmllcyA9IHYud2VhcjM7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3Quc2hvZXMgPSB2LndlYXI0O1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0LnBldCA9IHYucGV0X2lkO1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goaGVyb09iamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnJlcG9ydEhlcm9MaXN0LHRoaXMuc2V0SGVyb0xpc3RKc29uU3RyaW5nKGxpc3QpLGZhbHNlKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEpzb24oU3RvcmFnZUtleS5IZXJvTGlzdCx0aGlzLmhlcm9fbGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3oi7Hpm4Tkv6Hmga9cclxuICAgICAqL1xyXG4gICAgbG9hZEhlcm9MaXN0KCl7XHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgbGlzdCA9IFVzZXJJbmZvLmdldEluc3RhbmNlKCkuaGVyb0xpc3Q7XHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGU9di5oZXJvSWQ7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWw9di5oZXJvTGV2ZWw7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2U9di5oZXJvU3RhZ2U7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZT12Lmhlcm9XZWFwb25TdGFnZTtcclxuICAgICAgICAgICAgaGVyb0luZm8ud2VhcjE9di53ZWFwb25zO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFyMj12LmFybW9yO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFyMz12LmFjY2Vzc29yaWVzO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFyND12LnNob2VzO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQ9di5wZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19saXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgICAgICAvLyBsZXQgbGlzdCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0KVxyXG4gICAgICAgIC8vIGlmKGxpc3Qpe1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2k8bGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGluZm8gPSBsaXN0W2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gaW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gaW5mby5oZXJvX2xldmVsO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5ID0gaW5mby5oZXJvX3F1YWxpdHk7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBpbmZvLmhlcm9fdHlwZTtcclxuICAgICAgICAvLyAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IGluZm8ucGV0X2lkO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9aW5mby5oZXJvX3N0YWdlO1xyXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBlPUVxdWlwVHlwZS5XdVFpOyBlPEVxdWlwVHlwZS5OdW07IGUrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm9bXCJ3ZWFyXCIrZV09aW5mb1tcIndlYXJcIitlXTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmdldEhlcm9MaXN0LHRoaXMuZ2V0SGVyb0xpc3RKc29uU3RyaW5nKCksZmFsc2UpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgIC8vICAgICBpZihkYXRhKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVyb19saXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgICAgIC8vICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8uaGVyb190eXBlPXYuaGVyb0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLmhlcm9fbGV2ZWw9di5oZXJvTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8uaGVyb19zdGFnZT12Lmhlcm9TdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U9di5oZXJvV2VhcG9uU3RhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ud2VhcjE9di53ZWFwb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLndlYXIyPXYuYXJtb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ud2VhcjM9di5hY2Nlc3NvcmllcztcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby53ZWFyND12LnNob2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLnBldF9pZD12LnBldDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsaXN0LnB1c2goaGVyb0luZm8pXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVyb19saXN0ID0gbGlzdDtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuaGVyb19saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gSGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHBhb3Nob3UgPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91LmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcGFvc2hvdS5oZXJvX2xldmVsID0gMTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91Lmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91Lmhlcm9fc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHBhb3Nob3UuaGVyb190eXBlID0gSGVyb19UeXBlLlBhb1Nob3U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcGFvc2hvdS5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaGVyb19saXN0LnB1c2gocGFvc2hvdSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRKc29uKFN0b3JhZ2VLZXkuSGVyb0xpc3QsdGhpcy5oZXJvX2xpc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5sb2FkQWxsSGVyb0RhdGEoKTsgIFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5yZXBvcnRIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5oZXJvX3F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgaGVyb0luZm8uaGVyb190eXBlID0gSGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAvLyAgICAgbGV0IHBhb3Nob3UgPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5oZXJvX3R5cGUgPSBIZXJvX1R5cGUuUGFvU2hvdTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKHBhb3Nob3UpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5bey5oul5pyJ6Iux6ZuE5YiX6KGoXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0SGVyb0xpc3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aKe5Yqg5LiA5Liq6Iux6ZuE5L+h5oGvXHJcbiAgICBhZGRIZXJvKGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gaGVyb1R5cGU7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDE7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoaGVyb1R5cGUpO1xyXG4gICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDA7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDA7XHJcbiAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gMDtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6h5pS26ZuGWOS4quiLsembhCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOafpeivouiLsembhOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhOexu+Wei1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvSW5mbyhoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaGVyb19sZXZlbFtoZXJvVHlwZS0xXTtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgaWYodi5oZXJvX3R5cGUgPT0gaGVyb1R5cGUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihpbmRleCA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19saXN0W2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKiroi7Hpm4TnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaW5mby5oZXJvX2xldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5aKe5Yqg6Iux6ZuE562J57qnICovXHJcbiAgICBwdWJsaWMgYWRkSGVyb0xldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKVxyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaW5mby5oZXJvX2xldmVsKys7XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX2xldmVsID09IDEwKXtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7lsIbku7vmhI9Y5ZCN6Iux6ZuE5Y2H5YiwMTDnuqcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmZvLmhlcm9fbGV2ZWwgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7ntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOe6pykpe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY57qnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX2xldmVsID49IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvVHlwZSkpe1xyXG4gICAgICAgICAgICBpbmZvLmhlcm9fbGV2ZWwgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoq6YeN572u6Iux6ZuE562J57qnICovXHJcbiAgICBwdWJsaWMgcmVzZXRIZXJvTHZlbChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaW5mby5oZXJvX2xldmVsID0gMTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoq6Iux6ZuE5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaW5mby5oZXJvX3F1YWxpdHk7XHJcbiAgICB9IFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boi7Hpm4TnmoTkuJPmrabnrYnnuqdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4TnsbvlnotcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg6Iux6ZuE55qE5LiT5q2m562J57qnXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuE57G75Z6LXHJcbiAgICAgKi9cclxuICAgIGFkZEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgKys7XHJcbiAgICAgICAgdGhpcy5zYXZlSGVyb0xpc3QoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6Iux6ZuE55qE5LiT5q2m562J57qnXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuE57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gbnVtIOiuvue9rueahOetiee6p1xyXG4gICAgICovXHJcbiAgICBzZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSxudW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boi7Hpm4TnmoTpmLbmrrVcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRIZXJvU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uaGVyb19zdGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRIZXJvU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGluZm8uaGVyb19zdGFnZSArKztcclxuICAgICAgICBpZihoZXJvVHlwZSA9PSBIZXJvX1R5cGUuUGFvU2hvdSAmJiBpbmZvLmhlcm9fc3RhZ2UgPT0gNil7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5bCG54Ku5omL5Y2H6IezMeWkp+aYnyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZm8uaGVyb19zdGFnZSAlIDYgPT0gMFxyXG4gICAgICAgICAgICAmJiBNYXRoLmZsb29yKGluZm8uaGVyb19zdGFnZSAvIDYpID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u57Sv6K6hMeS4quiLsembhOWNh+WIsFjmmJ8pICl7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY5pifKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX3N0YWdlID49IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvVHlwZSkpe1xyXG4gICAgICAgICAgICBpbmZvLmhlcm9fc3RhZ2UgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ2FuQWRkSGVyb1N0YWdlKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WPquacieabtOaUueeahOaXtuWAmeWGjeS/neWtmOWIsOaWh+S7tu+8jOWHj+WwkeaWh+S7tuivu+WPluasoeaVsFxyXG4gICAgLy8gcHVibGljIGFkZEhlcm9MZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUsbGV2ZWw6bnVtYmVyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAvLyAgICAgbGV0IG5vd0xldmVsPWluZm8uaGVyb19sZXZlbCtsZXZlbDtcclxuICAgIC8vICAgICBpZihub3dMZXZlbDw9TGV2ZWxVcE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgIC8vICAgICAgICAgdGhpcy5zYXZlSGVyb0xldmVsKGhlcm9UeXBlLG5vd0xldmVsKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2F2ZUhlcm9MZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUsbGV2ZWw6bnVtYmVyKVxyXG4gICAgLy8geyAgICAgICAgXHJcbiAgICAvLyAgICAgaWYobGV2ZWw+TGV2ZWxVcE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldmVsPUxldmVsVXBNYW5hZ2VyLmdldE1heExldmVsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAvLyAgICAgaW5mby5oZXJvX2xldmVsPWxldmVsO1xyXG4gICAgLy8gICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7ICAgICAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZ2V0VGVhbUxpc3QodHlwZTpHYW1lTW9kZSk6SGVyb19UeXBlW11cclxuICAgIHtcclxuICAgICAgICBsZXQgdGVhbT1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPDU7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGVhbS5wdXNoKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlYW1TdHI6c3RyaW5nPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGVhbV9saXN0XycrdHlwZSk7XHJcbiAgICAgICAgaWYodGVhbVN0cj09PVwiXCIgfHwgdGVhbVN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgICAgIC8vIHRlYW1bMV09KEhlcm9fVHlwZS5EZUx1WWkpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGVhbVsyXT0oSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAgICAgICAgIC8vIHRlYW1bM109KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAgICAgICAgIHRlYW1bMl09KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVUZWFtTGlzdCh0eXBlLHRlYW0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZWFtPXRoaXMuZ2V0VGVhbUxpc3QoR2FtZU1vZGUuTWFpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBsaXN0PXRlYW1TdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPXBhcnNlSW50KGxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSm9pbj1oZXJvVHlwZT4wJiZ0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSk+MDtcclxuICAgICAgICAgICAgICAgIHRlYW1baV09aXNKb2luP2hlcm9UeXBlOi0xOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVhbTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGVhbUxpc3QodHlwZTpHYW1lTW9kZSx0ZW1wOkhlcm9fVHlwZVtdKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGVhbV9saXN0XycrdHlwZSx0ZW1wLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yqg6L295omA5pyJ55qE6Iux6ZuE5pWw5o2uXHJcbiAgICBsb2FkQWxsSGVyb0RhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIC8v6ZyA6KaB5qC55o2u5Yab6KGU562J57qn77yM6KOF5aSH562J57qn77yM6Iux6ZuE562J57qnXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGE9bmV3IE1hcDxudW1iZXIsSGVyb0RhdGE+KCk7XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGVyb0RhdGEoaGVyb0xpc3RbaV0uaGVyb190eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEhlcm9EYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb0RhdGFcclxuICAgIHtcclxuICAgICAgICAvLyBpZih0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSk8PTApe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9dGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKTtcclxuICAgICAgICBpZighbG9jYWxIRCl7XHJcbiAgICAgICAgICAgIGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWuoOeJqeWxnuaAp+WumuS5iVxyXG4gICAgICAgIGxldCBwZXRBdGsgPSAwLHBldERlZmVuY2UgPSAwLHBldEhlYWx0aCA9IDAscGV0SGl0ID0gMCxwZXRNaXNzID0gMCxwZXRDcml0aWNhbCA9IDAscGV0QW50aUNyaXRpY2FsID0gMCxwZXRFeHRyYUNyaXRpY2FsID0gMCxwZXRBbnRpRXh0cmFDcml0aWNhbCA9IDA7XHJcbiAgICAgICAgLy8g5LiT5bGe5q2m5Zmo55qE5Yqg5oiQXHJcbiAgICAgICAgbGV0IGV4SHAgPSAwLGV4QXR0YWNrID0gMCxleERlZmVuc2UgPSAwO1xyXG4gICAgICAgIC8vLS3lm7rlrprlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0cmlidXRlRGF0YTpKc29uSGVyb0F0dHJpYnV0ZSA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGUsdGhpcy5nZXRIZXJvU3RhZ2UoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgaGVyb0luZm86SGVyb0luZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2hwID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aEhlYWx0aCkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VIZWFsdGg7XHJcbiAgICAgICAgbG9jYWxIRC5maXhlZF9hdHRjayA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhBdHRhY2spICsgYXR0cmlidXRlRGF0YS5CYXNlQXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuZml4X2RlZmVuc2UgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoRGVmZW5zZSkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VEZWZlbnNlO1xyXG4gICAgICAgIC8vIOS4k+WxnuatpuWZqOaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBleFN0YWdlID0gdGhpcy5nZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlKVxyXG4gICAgICAgIGlmKGV4U3RhZ2UgPiAwKXtcclxuICAgICAgICAgICAgbGV0IGV4SnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxleFN0YWdlKTtcclxuICAgICAgICAgICAgZXhIcCA9IChleEpzb25EYXRhLkhlYWx0aCkgKiBsb2NhbEhELmZpeGVkX2hwO1xyXG4gICAgICAgICAgICBleEF0dGFjayA9IChleEpzb25EYXRhLkF0dGFjaykgKiBsb2NhbEhELmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICBleERlZmVuc2UgPSAoZXhKc29uRGF0YS5EZWZlbnNlKSAqIGxvY2FsSEQuZml4X2RlZmVuc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlrqDnianmlbDmja7ojrflj5ZcclxuICAgICAgICBsZXQgcGV0SWQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKHBldElkIT0wKXtcclxuICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgIHBldEF0ayA9IHBldEluZm8uQXR0YWNrO1xyXG4gICAgICAgICAgICBwZXREZWZlbmNlID0gcGV0SW5mby5EZWZlbnNlO1xyXG4gICAgICAgICAgICBwZXRIZWFsdGggPSBwZXRJbmZvLkhlYWx0aDtcclxuICAgICAgICAgICAgcGV0SGl0ID0gcGV0SW5mby5IaXQ7XHJcbiAgICAgICAgICAgIHBldE1pc3MgPSBwZXRJbmZvLk1pc3M7XHJcbiAgICAgICAgICAgIHBldENyaXRpY2FsID0gcGV0SW5mby5Dcml0aWNhbDtcclxuICAgICAgICAgICAgcGV0QW50aUNyaXRpY2FsID0gcGV0SW5mby5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEV4dHJhQ3JpdGljYWwgPSBwZXRJbmZvLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEFudGlFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxIRC5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgLy8g5ZG95Lit5YC8XHJcbiAgICAgICAgbG9jYWxIRC5IaXQgPSBhdHRyaWJ1dGVEYXRhLkhpdCArIHBldEhpdDtcclxuICAgICAgICAvLyDpl6rpgb/lgLxcclxuICAgICAgICBsb2NhbEhELk1pc3MgPSBhdHRyaWJ1dGVEYXRhLk1pc3MgKyBwZXRNaXNzO1xyXG4gICAgICAgIC8vIOaatOWHu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkNyaXRpY2FsICsgcGV0Q3JpdGljYWw7XHJcbiAgICAgICAgLy8g6Ziy54iG5YC8XHJcbiAgICAgICAgbG9jYWxIRC5BbnRpQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlDcml0aWNhbCArIHBldEFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vlop7luYVcclxuICAgICAgICBsb2NhbEhELkV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkV4dHJhQ3JpdGljYWwgKyBwZXRFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIOaatOWHu+aKl+aAp1xyXG4gICAgICAgIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlFeHRyYUNyaXRpY2FsICsgcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcblxyXG4gICAgICAgIC8vIOaUu+mAn1xyXG4gICAgICAgIGxldCBIQklNID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxvY2FsSEQuYmFzZV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmdvbmdqaV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmF0a1NwZWVkID0gSEJJTS5nZXRCYXNlU3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuYnVsbGV0X3NwZWVkID0gSEJJTS5nZXRCYXNlQnVsbGV0U3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuZ29uZ2ppX2ZhbndlaSA9IEhCSU0uZ2V0QXR0YWNrUmFuZ2UoaGVyb1R5cGUpO1xyXG5cclxuICAgICAgICAvLyDmrablmajliqDmiJBcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gRXF1aXBUeXBlLld1UWk7aTxFcXVpcFR5cGUuTnVtO2krKyl7XHJcbiAgICAgICAgICAgIGxldCB3ZWFwb25JbmZvID0gaGVyb0luZm9bXCJ3ZWFyXCIraV07XHJcbiAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhcG9uRGF0YSA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzYWRkaXRpb25hbCh3ZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGFsbFdlYXBvbkF0ayArPSB3ZWFwb25EYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uSHAgKz0gd2VhcG9uRGF0YVsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS3mgLvlgLxcclxuICAgICAgICBsb2NhbEhELkF0dGFjayA9IGxvY2FsSEQudG90YWxfYXR0YWNrID0gbG9jYWxIRC5maXhlZF9hdHRjayArIGFsbFdlYXBvbkF0ayArIHBldEF0ayArIGV4QXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aCArIGV4SHA7XHJcbiAgICAgICAgbG9jYWxIRC5EZWZlbnNlID0gbG9jYWxIRC50b3RhbF9kZWZlbnNlID0gbG9jYWxIRC5maXhfZGVmZW5zZSArIGFsbFdlYXBvbkRlZmVuY2UgKyBwZXREZWZlbmNlICsgZXhEZWZlbnNlO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKSArIDE7XHJcblxyXG4gICAgICAgIGxvY2FsSEQuQ29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3o9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTsgIFxyXG4gICAgICAgIGxvY2FsSEQudW5sb2NrX3N0YXRlPW5ldyBNYXA8bnVtYmVyLGJvb2xlYW4+KCk7XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU2tpbGxQb3NBbmRTa2lsbExldmVsKGhlcm9UeXBlLHMsc3Rhcik7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfei5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBsb2NhbEhELkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICAgICAgbG9jYWxIRC51bmxvY2tfc3RhdGUuc2V0KHMsaGVyb0luZm8uaGVyb19sZXZlbD49U2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwocykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9NDsgcysrKXtcclxuICAgICAgICAgICAgaWYoZXhTdGFnZT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBleElkPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKGhlcm9UeXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U3Rhcj1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyKGV4SWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U2tpbGxJZD1FeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChoZXJvVHlwZSxleFN0YXIrMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9RXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkV4Y2x1c2l2ZVdlYXBvblNraWxsKGV4U2tpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxvY2FsSERbXCJFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlX1wiK3NdPWpzb25EYXRhW1wiRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV9cIitzXTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YS5zZXQoaGVyb1R5cGUsbG9jYWxIRCk7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsSEQ7XHJcblxyXG4gICAgICAgIC8vbG9jYWxIRD10aGlzLmdldEJhc2VIZXJvRGF0YShpKTtcclxuICAgICAgICAvLyAvL+aUu+WHu+iMg+WbtFxyXG4gICAgICAgIC8vIGxldCBoZXJvU3RhZ2U9dGhpcy5nZXRIZXJvU3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIC8vbGV0IGhlcm9RdWFsaXR5PXRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIC8vbGV0IGhlcm9UaWVyPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpZXIoaGVyb1F1YWxpdHkpO1xyXG4gICAgICAgIC8vIGxldCBoYW1JZD1IZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJZChoZXJvVHlwZSxoZXJvU3RhZ2UpO1xyXG4gICAgICAgIC8vIGxldCBqc29uSEFNPUhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9BdHRyaWJ1dGUoaGFtSWQpO1xyXG4gICAgICAgIC8vIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHu+aUu+mAn+aatOWHu+eIhueOh+etiS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gLy/mlLvlh7vlipss5Z+65pys5pS75Ye7XHJcbiAgICAgICAgLy8gbGV0IGJhc2VHSj1qc29uSEFNLkF0dGFjaztcclxuICAgICAgICAvLyBsZXQgZXF1aXBBdHRhY2s9MDtcclxuICAgICAgICAvLyAvKirpop3lpJbnmb7liIbmr5TmlLvpgJ8gKi9cclxuICAgICAgICAvLyBsZXQgZXF1aXBBdHRhY2tTcGVlZD0gMCA7XHJcbiAgICAgICAgLy8gLyoq6Ziy5b6h5YqbICovXHJcbiAgICAgICAgLy8gbGV0IGVxdWlwRGVmZW5zZSA9IDAgO1xyXG4gICAgICAgIC8vIC8qKueUn+WRveWAvCAqL1xyXG4gICAgICAgIC8vIGxldCBlcXVpcEhlYWx0aCA9IDAgO1xyXG4gICAgICAgIC8vIGxldCBlaW09RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGxldCBlYW09RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQgd2VhckVxdWlwSW5mbz1laW0uZ2V0TmV3V2VhckVxdWlwbWVudChoZXJvVHlwZSxpKTtcclxuICAgICAgICAvLyAgICAgaWYod2VhckVxdWlwSW5mbylcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGpzb25EYXRhPWVhbS5nZXRKc29uRXF1aXBtZW50QXR0cmlidXRlKHdlYXJFcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/ov5nph4zmmK/nm7jliqBcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwQXR0YWNrKz1qc29uRGF0YS5BdHRhY2s7XHJcbiAgICAgICAgLy8gICAgICAgICBlcXVpcEF0dGFja1NwZWVkKz1qc29uRGF0YS5BdHRhY2tTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwRGVmZW5zZSs9anNvbkRhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwSGVhbHRoKz1qc29uRGF0YS5IZWFsdGg7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gLy/lrqDnianliqDmiJBcclxuICAgICAgICAvLyBsZXQgcGV0R0o9MDtcclxuICAgICAgICAvLyBsZXQgcGVEZWZlbnNlPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEhlYWx0aD0wO1xyXG4gICAgICAgIC8vIGxldCBwZXRNaXNzPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldENyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgcGV0QW50aUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEFudGlFeHRyYUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEhpdD0wO1xyXG4gICAgICAgIC8vIC8vXHJcbiAgICAgICAgLy8gaWYobG9jYWxIRC5wZXRfaW5mbyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBwZXREYXRhPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXREYXRhKGxvY2FsSEQucGV0X2luZm8pO1xyXG4gICAgICAgIC8vICAgICBwZXRHSj1wZXREYXRhLkF0dGFjaztcclxuICAgICAgICAvLyAgICAgcGVEZWZlbnNlPXBldERhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgcGV0SGVhbHRoPXBldERhdGEuSGVhbHRoO1xyXG4gICAgICAgIC8vICAgICBwZXRNaXNzPXBldERhdGEuTWlzcztcclxuICAgICAgICAvLyAgICAgcGV0Q3JpdGljYWw9cGV0RGF0YS5Dcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0RXh0cmFDcml0aWNhbD1wZXREYXRhLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gICAgIHBldEFudGlDcml0aWNhbD1wZXREYXRhLkFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0QW50aUV4dHJhQ3JpdGljYWw9cGV0RGF0YS5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0SGl0PXBldERhdGEuSGl0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+S4k+WxnuatpuWZqOWKoOaIkCglLOmZpOS6huaatOWHu+WAvOWSjOWRveS4reWAvOaYr+WFt+S9k+aVsOWAvO+8jOWFtuS7lueahOmDveaYr+eZvuWIhuavlOaVsOWAvClcclxuICAgICAgICAvLyBsZXQgZXhHSj0wO1xyXG4gICAgICAgIC8vIGxldCBleERlZmVuc2U9MDtcclxuICAgICAgICAvLyBsZXQgZXhIZWFsdGg9MDtcclxuICAgICAgICAvLyBsZXQgZXhNaXNzPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4Q3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhFeHRyYUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4QW50aUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4QW50aUV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhIaXQ9MDtcclxuICAgICAgICAvLyAvL+S4k+atpuetiee6p1xyXG4gICAgICAgIC8vIGxvY2FsSEQuaGVyb19pbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gaWYobG9jYWxIRC5oZXJvX2luZm8uZXhjbHVzaXZlX2VxdWlwX2xldmVsPj0wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGV4SWQ9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldElkKGhlcm9UeXBlLGxvY2FsSEQuaGVyb19pbmZvLmV4Y2x1c2l2ZV9lcXVpcF9sZXZlbCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBleEpzb25EYXRhPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVFbmhhbmNlbWVudChleElkKTtcclxuICAgICAgICAvLyAgICAgZXhHSj1leEpzb25EYXRhLkF0dGFjaztcclxuICAgICAgICAvLyAgICAgZXhEZWZlbnNlPWV4SnNvbkRhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgZXhIZWFsdGg9ZXhKc29uRGF0YS5IZWFsdGg7XHJcbiAgICAgICAgLy8gICAgIGV4TWlzcz1leEpzb25EYXRhLk1pc3M7XHJcbiAgICAgICAgLy8gICAgIGV4Q3JpdGljYWw9ZXhKc29uRGF0YS5Dcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhFeHRyYUNyaXRpY2FsPWV4SnNvbkRhdGEuRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhBbnRpQ3JpdGljYWw9ZXhKc29uRGF0YS5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gICAgIGV4QW50aUV4dHJhQ3JpdGljYWw9ZXhKc29uRGF0YS5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhIaXQ9ZXhKc29uRGF0YS5IaXQ7XHJcbiAgICAgICAgLy8gICAgIC8v5LiT5q2m5oqA6IO95Y+C5pWwICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGxldCBza2lsbElkPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJZChFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeFN0YWdlKGxvY2FsSEQuaGVyb19pbmZvLmV4Y2x1c2l2ZV9lcXVpcF9sZXZlbCksaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vICAgICBsZXQgZXhTa2lsbEpzb25EYXRhPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbChza2lsbElkKTtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzI9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMjtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzM9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMztcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzQ9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfNDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLy/mlLvlh7vlips95Z+656GA5pS75Ye75YqbKu+8iCUrJe+8iVxyXG4gICAgICAgIC8vIC8v5Zu65a6a5pS75Ye75YqbICAgICAgICBcclxuICAgICAgICAvLyBsZXQgdG90YWxHSj0oYmFzZUdKK2VxdWlwQXR0YWNrK3BldEdKKTtcclxuICAgICAgICAvLyBsZXQgZml4QXR0YWNrPXRvdGFsR0o7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5maXhlZF9hdHRjaz1maXhBdHRhY2s7XHJcbiAgICAgICAgLy8gdG90YWxHSis9dG90YWxHSiooZXhHSik7XHJcbiAgICAgICAgLy8gbG9jYWxIRC50b3RhbF9hdHRhY2s9TWF0aC5yb3VuZCh0b3RhbEdKKTtcclxuICAgICAgICAvLyBsb2NhbEhELkF0dGFjaz1sb2NhbEhELnRvdGFsX2F0dGFjazsgICAgICAgIFxyXG4gICAgICAgIC8vIC8v5Z+656GA5pS75Ye76YCf5bqmKu+8iOijheWkhyUr6KOF5aSH6ZmE5YqgJe+8iSzov5nph4zlvpfliLDnmoTlgLzmmK/mr4/np5LmlLvlh7vmrKHmlbBcclxuICAgICAgICAvLyAvL2xldCB0YWxlbnRHUz1UYWxlbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFsZW50RGF0YShUYWxlbnRUeXBlLkF0dFNwZWVkKTtcclxuICAgICAgICAvLyBsZXQgYXR0U3BlZWQ9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5iYXNlX2ppYW5nZT0xL2F0dFNwZWVkO1xyXG4gICAgICAgIC8vIC8v55u05o6l5Yqg5aSp6LWL55qEXHJcbiAgICAgICAgLy8gYXR0U3BlZWQrPWF0dFNwZWVkKigoZXF1aXBBdHRhY2tTcGVlZCkvMTAwKTtcclxuICAgICAgICAvLyAvL+i9rOaNouaIkOWkmuWwkeenkuaUu+WHu+S4gOasoSzljbPmlLvlh7vpl7TpmpRcclxuICAgICAgICAvLyBsb2NhbEhELmdvbmdqaV9qaWFuZ2U9MS9hdHRTcGVlZDsgICAgICAgIFxyXG4gICAgICAgIC8vIC8v6Ziy5b6h5YqbXHJcbiAgICAgICAgLy8gbGV0IGJhc2VEZWZlbnNlPWpzb25IQU0uRGVmZW5zZTtcclxuICAgICAgICAvLyBsb2NhbEhELkRlZmVuc2U9YmFzZURlZmVuc2UrcGVEZWZlbnNlK2VxdWlwRGVmZW5zZTtcclxuICAgICAgICAvLyBsb2NhbEhELkRlZmVuc2UrPWxvY2FsSEQuRGVmZW5zZSooZXhEZWZlbnNlKTtcclxuICAgICAgICAvLyAvL+eUn+WRveWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlSHA9anNvbkhBTS5IZWFsdGg7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5maXhlZF9ocD1iYXNlSHArcGV0SGVhbHRoK2VxdWlwSGVhbHRoO1xyXG4gICAgICAgIC8vIGxvY2FsSEQudG90YWxfaHA9bG9jYWxIRC5maXhlZF9ocCtsb2NhbEhELmZpeGVkX2hwKihleEhlYWx0aCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5IZWFsdGg9bG9jYWxIRC50b3RhbF9ocDtcclxuICAgICAgICAvLyAvL+WRveS4reWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlSGl0PWpzb25IQU0uSGl0O1xyXG4gICAgICAgIC8vIGxvY2FsSEQuSGl0PWJhc2VIaXQrcGV0SGl0K2V4SGl0O1xyXG4gICAgICAgIC8vIC8v6Zeq6YG/5YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VNaXNzPWpzb25IQU0uTWlzcztcclxuICAgICAgICAvLyBsb2NhbEhELk1pc3M9YmFzZU1pc3MrcGV0TWlzcztcclxuICAgICAgICAvLyBsb2NhbEhELk1pc3MrPWxvY2FsSEQuTWlzcyooZXhNaXNzKTtcclxuICAgICAgICAvLyAvL+aatOWHu+WAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlQ3JpdGljYWw9anNvbkhBTS5Dcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkNyaXRpY2FsPWJhc2VDcml0aWNhbCtwZXRDcml0aWNhbCtleENyaXRpY2FsO1xyXG4gICAgICAgIC8vIC8v5pq05Ye75aKe5bmFXHJcbiAgICAgICAgLy8gbGV0IGJhc2VFeHRyYUNyaXRpY2FsPWpzb25IQU0uRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkV4dHJhQ3JpdGljYWw9YmFzZUV4dHJhQ3JpdGljYWwrcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkV4dHJhQ3JpdGljYWwrPWxvY2FsSEQuRXh0cmFDcml0aWNhbCooZXhFeHRyYUNyaXRpY2FsKTtcclxuICAgICAgICAvLyAvL+mYsuaatOWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlQW50aUNyaXRpY2FsPWpzb25IQU0uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUNyaXRpY2FsPWJhc2VBbnRpQ3JpdGljYWwrcGV0QW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUNyaXRpY2FsKz1sb2NhbEhELkFudGlDcml0aWNhbCooZXhBbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgIC8vIC8v5pq05Ye75oqX5oCnXHJcbiAgICAgICAgLy8gbGV0IGJhc2VBbnRpRXh0cmFDcml0aWNhbD1qc29uSEFNLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWw9YmFzZUFudGlFeHRyYUNyaXRpY2FsK3BldEFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwrPWxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwqKGV4QW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgICAgIC8vIC8vXHJcbiAgICAgICAgLy8gbG9jYWxIRC5Db2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5Ta2lsbFZhbHVlX3g9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuU2tpbGxWYWx1ZV95PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAvLyBsb2NhbEhELlNraWxsVmFsdWVfej1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5Ta2lsbFZhbHVlXzQ9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpOyAgICAgICAgXHJcbiAgICAgICAgLy8gLy8z5Liq5oqA6IO95qe955qEXHJcbiAgICAgICAgLy8gZm9yKGxldCBzPTE7IHM8PTM7IHMrKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBza2lsbExldmVsPVNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxMZXZlbChzLGhlcm9TdGFnZSk7XHJcbiAgICAgICAgLy8gICAgIGlmKHNraWxsTGV2ZWw+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2tpbGxJZD1Ta2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJZChzLHNraWxsTGV2ZWwpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNraWxsTGV2ZWxJZD1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldElkKGhlcm9UeXBlLHNraWxsSWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGpzb25EYXRhPVNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU2tpbGxDb25maWd1cmF0aW9uKHNraWxsTGV2ZWxJZCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgIC8vICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3kuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8yKTtcclxuICAgICAgICAvLyAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgIC8vICAgICAgICAgbG9jYWxIRC5Db2xkRG93bi5zZXQocyxqc29uRGF0YS5Db2xkRG93bik7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5oZXJvX2RhdGEuc2V0KGhlcm9UeXBlLGxvY2FsSEQpO1xyXG4gICAgICAgIC8vIHJldHVybiBsb2NhbEhEO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbzpIZXJvSW5mbyk6SGVyb0RhdGF7XHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgLy8g5a6g54mp5bGe5oCn5a6a5LmJXHJcbiAgICAgICAgbGV0IHBldEF0ayA9IDAscGV0RGVmZW5jZSA9IDAscGV0SGVhbHRoID0gMCxwZXRIaXQgPSAwLHBldE1pc3MgPSAwLHBldENyaXRpY2FsID0gMCxwZXRBbnRpQ3JpdGljYWwgPSAwLHBldEV4dHJhQ3JpdGljYWwgPSAwLHBldEFudGlFeHRyYUNyaXRpY2FsID0gMDtcclxuICAgICAgICAvLyDkuJPlsZ7mrablmajnmoTliqDmiJBcclxuICAgICAgICBsZXQgZXhIcCA9IDAsZXhBdHRhY2sgPSAwLGV4RGVmZW5zZSA9IDA7XHJcbiAgICAgICAgLy8tLeWbuuWumuWxnuaAp1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVEYXRhOkpzb25IZXJvQXR0cmlidXRlID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvSW5mby5oZXJvX3R5cGUsaGVyb0luZm8uaGVyb19zdGFnZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbG9jYWxIRC5maXhlZF9ocCA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhIZWFsdGgpICsgYXR0cmlidXRlRGF0YS5CYXNlSGVhbHRoO1xyXG4gICAgICAgIGxvY2FsSEQuZml4ZWRfYXR0Y2sgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoQXR0YWNrKSArIGF0dHJpYnV0ZURhdGEuQmFzZUF0dGFjaztcclxuICAgICAgICBsb2NhbEhELmZpeF9kZWZlbnNlID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aERlZmVuc2UpICsgYXR0cmlidXRlRGF0YS5CYXNlRGVmZW5zZTtcclxuICAgICAgICAvLyDkuJPlsZ7mrablmajmlbDmja7ojrflj5ZcclxuICAgICAgICBsZXQgZXhTdGFnZSA9IGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTtcclxuICAgICAgICBpZihleFN0YWdlID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBleEpzb25EYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb0luZm8uaGVyb190eXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICBleEhwID0gKGV4SnNvbkRhdGEuSGVhbHRoKSAqIGxvY2FsSEQuZml4ZWRfaHA7XHJcbiAgICAgICAgICAgIGV4QXR0YWNrID0gKGV4SnNvbkRhdGEuQXR0YWNrKSAqIGxvY2FsSEQuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgIGV4RGVmZW5zZSA9IChleEpzb25EYXRhLkRlZmVuc2UpICogbG9jYWxIRC5maXhfZGVmZW5zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWuoOeJqeaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBwZXRJZCA9IGhlcm9JbmZvLnBldF9pZDtcclxuICAgICAgICBpZihwZXRJZCE9MCl7XHJcbiAgICAgICAgICAgIGxldCBwZXRJbmZvID0gU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRBdHRyaWJ1dGUocGV0SWQpO1xyXG4gICAgICAgICAgICBwZXRBdGsgPSBwZXRJbmZvLkF0dGFjaztcclxuICAgICAgICAgICAgcGV0RGVmZW5jZSA9IHBldEluZm8uRGVmZW5zZTtcclxuICAgICAgICAgICAgcGV0SGVhbHRoID0gcGV0SW5mby5IZWFsdGg7XHJcbiAgICAgICAgICAgIHBldEhpdCA9IHBldEluZm8uSGl0O1xyXG4gICAgICAgICAgICBwZXRNaXNzID0gcGV0SW5mby5NaXNzO1xyXG4gICAgICAgICAgICBwZXRDcml0aWNhbCA9IHBldEluZm8uQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEFudGlDcml0aWNhbCA9IHBldEluZm8uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgICAgICBwZXRFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgICAgICBwZXRBbnRpRXh0cmFDcml0aWNhbCA9IHBldEluZm8uQW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsSEQucGV0X2lkPXBldElkO1xyXG4gICAgICAgIC8vIOWRveS4reWAvFxyXG4gICAgICAgIGxvY2FsSEQuSGl0ID0gYXR0cmlidXRlRGF0YS5IaXQgKyBwZXRIaXQ7XHJcbiAgICAgICAgLy8g6Zeq6YG/5YC8XHJcbiAgICAgICAgbG9jYWxIRC5NaXNzID0gYXR0cmlidXRlRGF0YS5NaXNzICsgcGV0TWlzcztcclxuICAgICAgICAvLyDmmrTlh7vlgLxcclxuICAgICAgICBsb2NhbEhELkNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5Dcml0aWNhbCArIHBldENyaXRpY2FsO1xyXG4gICAgICAgIC8vIOmYsueIhuWAvFxyXG4gICAgICAgIGxvY2FsSEQuQW50aUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpQ3JpdGljYWwgKyBwZXRBbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8g5pq05Ye75aKe5bmFXHJcbiAgICAgICAgbG9jYWxIRC5FeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5FeHRyYUNyaXRpY2FsICsgcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vmipfmgKdcclxuICAgICAgICBsb2NhbEhELkFudGlFeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArIHBldEFudGlFeHRyYUNyaXRpY2FsO1xyXG5cclxuICAgICAgICAvLyDmlLvpgJ9cclxuICAgICAgICBsZXQgSEJJTSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsb2NhbEhELmJhc2VfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuZ29uZ2ppX2ppYW5nZSA9IDEvSEJJTS5nZXRCYXNlU3BlZWQoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICBsb2NhbEhELmF0a1NwZWVkID0gSEJJTS5nZXRCYXNlU3BlZWQoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICBsb2NhbEhELmJ1bGxldF9zcGVlZCA9IEhCSU0uZ2V0QmFzZUJ1bGxldFNwZWVkKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfZmFud2VpID0gSEJJTS5nZXRBdHRhY2tSYW5nZShoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICAvLyDmrablmajliqDmiJBcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gRXF1aXBUeXBlLld1UWk7aTxFcXVpcFR5cGUuTnVtO2krKyl7XHJcbiAgICAgICAgICAgIGxldCB3ZWFwb25JbmZvID0gaGVyb0luZm9bXCJ3ZWFyXCIraV07XHJcbiAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhcG9uRGF0YSA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzYWRkaXRpb25hbCh3ZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGFsbFdlYXBvbkF0ayArPSB3ZWFwb25EYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uSHAgKz0gd2VhcG9uRGF0YVsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS3mgLvlgLxcclxuICAgICAgICBsb2NhbEhELkF0dGFjayA9IGxvY2FsSEQudG90YWxfYXR0YWNrID0gbG9jYWxIRC5maXhlZF9hdHRjayArIGFsbFdlYXBvbkF0ayArIHBldEF0ayArIGV4QXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aCArIGV4SHA7XHJcbiAgICAgICAgbG9jYWxIRC5EZWZlbnNlID0gbG9jYWxIRC50b3RhbF9kZWZlbnNlID0gbG9jYWxIRC5maXhfZGVmZW5zZSArIGFsbFdlYXBvbkRlZmVuY2UgKyBwZXREZWZlbmNlICsgZXhEZWZlbnNlO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvSW5mby5oZXJvX3R5cGUsaGVyb0luZm8uaGVyb19zdGFnZSkgKyAxO1xyXG5cclxuICAgICAgICBsb2NhbEhELkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3k9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7ICBcclxuICAgICAgICBsb2NhbEhELnVubG9ja19zdGF0ZT1uZXcgTWFwPG51bWJlcixib29sZWFuPigpO1xyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD00OyBzKyspe1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGE9U2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFNraWxsUG9zQW5kU2tpbGxMZXZlbChoZXJvSW5mby5oZXJvX3R5cGUscyxzdGFyKTtcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV95LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgICAgICBsb2NhbEhELnVubG9ja19zdGF0ZS5zZXQocyxoZXJvSW5mby5oZXJvX2xldmVsPj1Ta2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD00OyBzKyspe1xyXG4gICAgICAgICAgICBpZihleFN0YWdlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4SWQ9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQoaGVyb0luZm8uaGVyb190eXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U3Rhcj1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyKGV4SWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U2tpbGxJZD1FeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChoZXJvSW5mby5oZXJvX3R5cGUsZXhTdGFyKzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbChleFNraWxsSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEhEW1wiRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV9cIitzXT1qc29uRGF0YVtcIkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfXCIrc107XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsSEQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBnZXRUYXJnZXRIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyLGxldmVsOm51bWJlcik6SGVyb0RhdGF7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgbGV0IGhlcm9MZXZlbCA9IGxldmVsO1xyXG5cclxuICAgICAgICAvLyDlrqDnianlsZ7mgKflrprkuYlcclxuICAgICAgICBsZXQgcGV0QXRrID0gMCxwZXREZWZlbmNlID0gMCxwZXRIZWFsdGggPSAwLHBldEhpdCA9IDAscGV0TWlzcyA9IDAscGV0Q3JpdGljYWwgPSAwLHBldEFudGlDcml0aWNhbCA9IDAscGV0RXh0cmFDcml0aWNhbCA9IDAscGV0QW50aUV4dHJhQ3JpdGljYWwgPSAwO1xyXG5cclxuICAgICAgICAvLy0t5Zu65a6a5bGe5oCnXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZURhdGE6SnNvbkhlcm9BdHRyaWJ1dGUgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9UeXBlLHN0YWdlKTtcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2hwID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoSGVhbHRoKSArIGF0dHJpYnV0ZURhdGEuQmFzZUhlYWx0aDtcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2F0dGNrID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoQXR0YWNrKSArIGF0dHJpYnV0ZURhdGEuQmFzZUF0dGFjaztcclxuICAgICAgICBsb2NhbEhELmZpeF9kZWZlbnNlID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoRGVmZW5zZSkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VEZWZlbnNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOatpuWZqCblrqDnianliqDmiJBcclxuICAgICAgICBsZXQgaGVyb0luZm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgaWYoaGVyb0luZm8hPW51bGwpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHBldElkID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgaWYocGV0SWQhPTApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgICAgICBwZXRBdGsgPSBwZXRJbmZvLkF0dGFjaztcclxuICAgICAgICAgICAgICAgIHBldERlZmVuY2UgPSBwZXRJbmZvLkRlZmVuc2U7XHJcbiAgICAgICAgICAgICAgICBwZXRIZWFsdGggPSBwZXRJbmZvLkhlYWx0aDtcclxuICAgICAgICAgICAgICAgIHBldEhpdCA9IHBldEluZm8uSGl0O1xyXG4gICAgICAgICAgICAgICAgcGV0TWlzcyA9IHBldEluZm8uTWlzcztcclxuICAgICAgICAgICAgICAgIHBldENyaXRpY2FsID0gcGV0SW5mby5Dcml0aWNhbDtcclxuICAgICAgICAgICAgICAgIHBldEFudGlDcml0aWNhbCA9IHBldEluZm8uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgICAgICAgICAgcGV0RXh0cmFDcml0aWNhbCA9IHBldEluZm8uRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAgICAgICAgIHBldEFudGlFeHRyYUNyaXRpY2FsID0gcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxIRC5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IEVxdWlwVHlwZS5XdVFpO2k8RXF1aXBUeXBlLk51bTtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlYXBvbkluZm8gPSBoZXJvSW5mb1tcIndlYXJcIitpXTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlYXBvbkRhdGEgPSBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXR0cmlidXRlc2FkZGl0aW9uYWwod2VhcG9uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2VhcG9uQXRrICs9IHdlYXBvbkRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFdlYXBvbkhwICs9IHdlYXBvbkRhdGFbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWRveS4reWAvFxyXG4gICAgICAgIGxvY2FsSEQuSGl0ID0gYXR0cmlidXRlRGF0YS5IaXQgKyBwZXRIaXQ7XHJcbiAgICAgICAgLy8g6Zeq6YG/5YC8XHJcbiAgICAgICAgbG9jYWxIRC5NaXNzID0gYXR0cmlidXRlRGF0YS5NaXNzICsgcGV0TWlzcztcclxuICAgICAgICAvLyDmmrTlh7vlgLxcclxuICAgICAgICBsb2NhbEhELkNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5Dcml0aWNhbCArIHBldENyaXRpY2FsO1xyXG4gICAgICAgIC8vIOmYsueIhuWAvFxyXG4gICAgICAgIGxvY2FsSEQuQW50aUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpQ3JpdGljYWwgKyBwZXRBbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8g5pq05Ye75aKe5bmFXHJcbiAgICAgICAgbG9jYWxIRC5FeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5FeHRyYUNyaXRpY2FsICsgcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vmipfmgKdcclxuICAgICAgICBsb2NhbEhELkFudGlFeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArIHBldEFudGlFeHRyYUNyaXRpY2FsO1xyXG5cclxuICAgICAgICAvLyDmlLvpgJ9cclxuICAgICAgICBsZXQgSEJJTSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsb2NhbEhELmJhc2VfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5idWxsZXRfc3BlZWQgPSBIQklNLmdldEJhc2VCdWxsZXRTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfZmFud2VpID0gSEJJTS5nZXRBdHRhY2tSYW5nZShoZXJvVHlwZSk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyAtLeaAu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQXR0YWNrID0gbG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrICsgYWxsV2VhcG9uQXRrICsgcGV0QXRrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aDtcclxuICAgICAgICBsb2NhbEhELkRlZmVuc2UgPSBsb2NhbEhELnRvdGFsX2RlZmVuc2UgPSBsb2NhbEhELmZpeF9kZWZlbnNlICsgYWxsV2VhcG9uRGVmZW5jZSArIHBldERlZmVuY2U7XHJcblxyXG4gICAgICAgIC8vIC0t5oC75YC8XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BdHRhY2s9bG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrIDtcclxuICAgICAgICAvLyBsb2NhbEhELkhlYWx0aD1sb2NhbEhELnRvdGFsX2hwID0gbG9jYWxIRC5maXhlZF9ocCA7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5EZWZlbnNlPWxvY2FsSEQudG90YWxfZGVmZW5zZSA9IGxvY2FsSEQuZml4X2RlZmVuc2UgO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxzdGFnZSkgKyAxO1xyXG5cclxuICAgICAgICBsb2NhbEhELkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3k9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7ICBcclxuXHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU2tpbGxQb3NBbmRTa2lsbExldmVsKGhlcm9UeXBlLHMsc3Rhcik7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfei5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBsb2NhbEhELkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaGVyb19kYXRhLnNldChoZXJvVHlwZSxsb2NhbEhEKTtcclxuICAgICAgICByZXR1cm4gbG9jYWxIRDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9EYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZXBIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9EYXRhe1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGRhdGEudG90YWxfYXR0YWNrID0gdGVtcC50b3RhbF9hdHRhY2s7XHJcbiAgICAgICAgZGF0YS50b3RhbF9kZWZlbnNlID0gdGVtcC50b3RhbF9kZWZlbnNlO1xyXG4gICAgICAgIGRhdGEudG90YWxfaHAgPSB0ZW1wLnRvdGFsX2hwO1xyXG4gICAgICAgIGRhdGEuSGl0ID0gdGVtcC5IaXQ7XHJcbiAgICAgICAgZGF0YS5NaXNzID0gdGVtcC5NaXNzO1xyXG4gICAgICAgIGRhdGEuQ3JpdGljYWwgPSB0ZW1wLkNyaXRpY2FsO1xyXG4gICAgICAgIGRhdGEuQW50aUNyaXRpY2FsID0gdGVtcC5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgZGF0YS5FeHRyYUNyaXRpY2FsID0gdGVtcC5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIGRhdGEuQW50aUV4dHJhQ3JpdGljYWwgPSB0ZW1wLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUJpbmRQZXQoaGVyb1R5cGU6SGVyb19UeXBlLHBldEluZm86UGV0SW5mbyl7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSkucGV0X2luZm89cGV0SW5mbztcclxuICAgICAgICAgICAgLy90aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpLnBldF9pbmZvLnNlcXVlbmNlX2lkPTEyMztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoSGVyb0RhdGEoaGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZEhlcm9EYXRhKGhlcm9UeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5oiY5YqbXHJcbiAgICBnZXRBbGxIZXJvWmhhbmxpKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT0wO1xyXG4gICAgICAgIGxldCBsaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtKz1NYXRoLmZsb29yKHRoaXMuZ2V0SGVyb1poYW5saShsaXN0W2ldLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9aaGFubGkoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIZXJvRGF0YShoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhPXRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IHpoYW5saSA9IGhlcm9EYXRhLnRvdGFsX2hwICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDEpIFxyXG4gICAgICAgICsgaGVyb0RhdGEudG90YWxfYXR0YWNrICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDIpXHJcbiAgICAgICAgKyBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDMpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5IaXQgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNClcclxuICAgICAgICArIGhlcm9EYXRhLk1pc3MgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNSlcclxuICAgICAgICArIChoZXJvRGF0YS5Dcml0aWNhbCAtIDEwMCkgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNilcclxuICAgICAgICArIGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig3KVxyXG4gICAgICAgICsgKGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwgLSAyKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig4KVxyXG4gICAgICAgICsgaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoOSlcclxuICAgICAgICByZXR1cm4gemhhbmxpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhcmdldEhlcm9aaGFubGkoaGVyb1R5cGU6SGVyb19UeXBlLHN0YWdlOm51bWJlcixsZXZlbDpudW1iZXIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBoZXJvRGF0YT10aGlzLmdldFRhcmdldEhlcm9EYXRhKGhlcm9UeXBlLHN0YWdlLGxldmVsKTtcclxuICAgICAgICBsZXQgemhhbmxpID0gaGVyb0RhdGEudG90YWxfaHAgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgKyBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMilcclxuICAgICAgICArIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMylcclxuICAgICAgICArIGhlcm9EYXRhLkhpdCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig0KVxyXG4gICAgICAgICsgaGVyb0RhdGEuTWlzcyAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig1KVxyXG4gICAgICAgICsgKGhlcm9EYXRhLkNyaXRpY2FsIC0gMTAwKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig2KVxyXG4gICAgICAgICsgaGVyb0RhdGEuQW50aUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDcpXHJcbiAgICAgICAgKyAoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCAtIDIpICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDgpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig5KVxyXG4gICAgICAgIHJldHVybiB6aGFubGk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3RGF5WmhhbmxpKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5X3poYW5saV8nKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09dGhpcy5nZXRBbGxIZXJvWmhhbmxpKCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRIZXJvSXNOZWVkVGlwKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBpc1RpcD1mYWxzZTtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVyb19nZXRfdGlwXycraGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzVGlwPXRydWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNUaXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldEhlcm9Jc05lZWRUaXAoaGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGVyb19nZXRfdGlwXycraGVyb1R5cGUsMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFNraW5JbmRleCh0aWVyOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHN3aXRjaCh0aWVyKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiA3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDojrflvpfkuIDkuKrkuIrpmLXnmoTpmo/mnLroi7Hpm4RcclxuICAgICogQHBhcmFtIG1vZGUg5ri45oiP5qih5byPXHJcbiAgICAqIEBwYXJhbSBleElkIOaOkumZpOeahGlkXHJcbiAgICAqIEByZXR1cm5zIOmZpGV4SWTkuYvlpJbnmoRpZFxyXG4gICAgKi9cclxuICAgIGdldFJhbmRIZXJvSWQobW9kZTpHYW1lTW9kZSxleElkOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTCx0ZWFtTGlzdD86bnVtYmVyW10pOkhlcm9fVHlwZXtcclxuICAgICAgICAvL+maj+acuuiLsembhFxyXG4gICAgICAgIGlmKCF0ZWFtTGlzdClcclxuICAgICAgICB0ZWFtTGlzdD10aGlzLmdldFRlYW1MaXN0KG1vZGUpO1xyXG4gICAgICAgIGxldCByYW5kTGlzdD1bXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0ZWFtTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZD10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaWQ+SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaWQhPWV4SWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRMaXN0LnB1c2godGVhbUxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVyb0lkPTA7XHJcbiAgICAgICAgaWYocmFuZExpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBoZXJvSWQ9cmFuZExpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJhbmRMaXN0Lmxlbmd0aCldO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgcmV0dXJuIGhlcm9JZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiotLS0tLS0tLS0tLS0tLS0t6KOF5aSHLS0tLS0tLS0tLS0tLS0tLS0tLSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiDnqb/miLTkuIDkuKroo4XlpIcsZXF1aXBJZOS4ujDml7bvvIzor7fliqHlv4XmioplcXVpcFR5cGXlhpnkuIpcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZCAgICAgXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBJZCDoo4XlpIdpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwVHlwZSDoo4XlpIfkvY1cclxuICAgICAqL1xyXG4gICAgYWRkV2VhckVxdWlwbWVudChoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBJZDpudW1iZXIsZXF1aXBUeXBlPzpFcXVpcFR5cGUpe1xyXG4gICAgICAgIGlmKCFlcXVpcFR5cGUpe1xyXG4gICAgICAgICAgICBlcXVpcFR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKGVxdWlwSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mcgOimgemBjeWOhuijheWkh+WIl+ihqO+8jOiOt+WPlmhlcm9fdHlwZeWPmOmHj1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5Li65Lu75oSPWOWQjeiLsembhOepv+aItDHku7boo4XlpIcpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpW1wid2VhclwiK2VxdWlwVHlwZV09ZXF1aXBJZDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjkuIvkuIDkuKroo4XlpIdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwUG9zIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgdW5sb2FkV2VhckVxdWlwbWVudChoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBUeXBlOkVxdWlwVHlwZSl7XHJcbiAgICAgICAgLy/pnIDopoHpgY3ljoboo4XlpIfliJfooajvvIzojrflj5ZoZXJvX3R5cGXlj5jph49cclxuICAgICAgICB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKVtcIndlYXJcIitlcXVpcFR5cGVdPTA7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkVRVUlQX1dFQVJfVU5MT0FEKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+ato+WcqOijheWkh+eahOijheWkh2lkICovXHJcbiAgICBnZXRXZWFyRXF1aXBtZW50KGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcFR5cGU6RXF1aXBUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpW1wid2VhclwiK2VxdWlwVHlwZV07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bliankvZnnmoToo4XlpIfmlbDph48gKi9cclxuICAgIGdldEVxdWlwbWVudFJlbWFpbk51bShlcXVpcEluZm86RXF1aXBJbmZvKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1lcXVpcEluZm8uZXF1aXBfbnVtO1xyXG4gICAgICAgIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbihlcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBoZXJvTGlzdD10aGlzLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihoZXJvTGlzdFtpXVtcIndlYXJcIit0eXBlXT09ZXF1aXBJbmZvLmVxdWlwX2lkKXtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bkuIDkuKroo4XlpIdpZOiiq+ijheWkh+eahOiLsembhOWIl+ihqCAqL1xyXG4gICAgZ2V0V2VhckVxdWlwbWVudEhlcm9MaXN0KGVxdWlwSW5mbzpFcXVpcEluZm8pOkhlcm9fVHlwZVtde1xyXG4gICAgICAgIGxldCBsaXN0PVtdO1xyXG4gICAgICAgIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbihlcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBoZXJvTGlzdD10aGlzLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaGVyb0luZm89aGVyb0xpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKGhlcm9JbmZvW1wid2VhclwiK3R5cGVdPT1lcXVpcEluZm8uZXF1aXBfaWQpe1xyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lrqDniaktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog56m/5oi05LiA5Liq5a6g54mpLGVxdWlwSWTkuLow5pe277yM6K+35Yqh5b+F5oqKZXF1aXBUeXBl5YaZ5LiKXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuEaWQgICAgIFxyXG4gICAgICogQHBhcmFtIHBldElkIOijheWkh2lkXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBUeXBlIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgYWRkV2VhclBldChoZXJvVHlwZTpIZXJvX1R5cGUscGV0SWQ6bnVtYmVyKXtcclxuICAgICAgICAvL+mcgOimgemBjeWOhuijheWkh+WIl+ihqO+8jOiOt+WPlmhlcm9fdHlwZeWPmOmHj1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5Li65Lu75oSPWOWQjeiLsembhOepv+aItDHku7boo4XlpIcpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpLnBldF9pZD1wZXRJZDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjkuIvkuIDkuKroo4XlpIdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwUG9zIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgdW5sb2FkV2VhclBldChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIC8v6ZyA6KaB6YGN5Y6G6KOF5aSH5YiX6KGo77yM6I635Y+WaGVyb190eXBl5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSkucGV0X2lkPTA7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkVRVUlQX1dFQVJfVU5MT0FEKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+ato+WcqOijheWkh+eahOijheWkh2lkICovXHJcbiAgICBnZXRXZWFyUGV0KGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKS5wZXRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5Ymp5L2Z55qE6KOF5aSH5pWw6YePICovXHJcbiAgICBnZXRQZXRSZW1haW5OdW0ocGV0SW5mbzpQZXRNZXNzYWdlKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1wZXRJbmZvLnBldF9udW07XHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHBldEluZm8ucGV0X2lkKTtcclxuICAgICAgICBsZXQgaGVyb0xpc3Q9dGhpcy5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaGVyb0xpc3RbaV1bXCJ3ZWFyXCIrdHlwZV09PXBldEluZm8ucGV0X2lkKXtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bkuIDkuKroo4XlpIdpZOiiq+ijheWkh+eahOiLsembhOWIl+ihqCAqL1xyXG4gICAgZ2V0V2VhclBldEhlcm9MaXN0KHBldEluZm86UGV0TWVzc2FnZSk6SGVyb19UeXBlW117XHJcbiAgICAgICAgbGV0IGxpc3Q9W107XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSW5mbz1oZXJvTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaGVyb0luZm8ucGV0X2lkPT1wZXRJbmZvLnBldF9pZCl7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmo4Dmn6XmmK/lkKblj6/ku6XljYfnuqcgKi9cclxuICAgIGNoZWNrVXBncmFkZShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9VcGdyYWRlRGF0YXtcclxuICAgICAgICAvLyBsZXQgaGVyb1F1YWxpdHkgPSB0aGlzLmdldEhlcm9RdWFsaXR5KGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgdXBEYXRhID0gbmV3IEhlcm9VcGdyYWRlRGF0YSgpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKSA9PSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb1R5cGUpKSByZXR1cm4gdXBEYXRhXHJcbiAgICAgICAgbGV0IGNvaW5IYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKTtcclxuICAgICAgICBsZXQgY29pbk5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RDb2luKHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKSk7XHJcbiAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgbGV0IGdlbU5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RHZW0odGhpcy5nZXRIZXJvTGV2ZWwoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgZmluaXNoTGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG5lZWRGaW5pc2hMZXZlbCA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxMaW1pdCh0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSkpO1xyXG4gICAgICAgIC8vIOWNh+e6p+aMiemSrue9rueBsO+8jOS8mOWFiOWFs+WNoee9rueBsCjljbPlnKjph5HluIHotrPlpJ/nmoTmg4XlhrXkuIvvvIzpgJrov4flhbPljaHmsqHovr7liLDopoHmsYLliJnmjInpkq7nva7ngbAp44CCXHJcbiAgICAgICAgLy8g5aaC5p6c5piv5Lul5Li66YeR5biB5LiN6Laz572u54Gw5YiZ54K55Ye75Y2H57qn5oyJ6ZKu5by55Ye66LWE5rqQ5LiN6Laz5by556qX77yM5aaC5p6c5piv5YWz5Y2h6ZmQ5Yi2572u54Gw77yM54K55Ye75Y2H57qn5oyJ6ZKu5YiZ5o+Q56S66YCa6L+H5YWz5Y2h5LiN6Laz6aOY5a2X5o+Q6YaSXHJcbiAgICAgICAgdXBEYXRhLmlzX2Nhbl91cD1jb2luSGF2ZU51bT49Y29pbk5lZWROdW0gJiYgZmluaXNoTGV2ZWw+PW5lZWRGaW5pc2hMZXZlbCAmJiBnZW1IYXZlTnVtID49IGdlbU5lZWROdW07XHJcbiAgICAgICAgcmV0dXJuIHVwRGF0YTtcclxuICAgIH1cclxuICAgIC8qKuajgOafpeaYr+WQpuWPr+S7peWNh+aYnyAqL1xyXG4gICAgY2hlY2tVcFN0YXIoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBoZXJvSW5mbz10aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpZighaGVyb0luZm8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjdXJTdGFnZT10aGlzLmdldEhlcm9TdGFnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudChoZXJvVHlwZSkpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZSh0aGlzLmdldEhlcm9RdWFsaXR5KGhlcm9UeXBlKSxjdXJTdGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGhhdmVOdW0gPj0gbmVlZE51bSAmJiBjdXJTdGFnZTxIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoq5qOA5p+l5piv5ZCm5Y+v5Lul5L2/55So5LiH6IO956KO54mHICovXHJcbiAgICBjaGVja0FsbFB1cnBvc2VGcmFnbWVudChoZXJvVHlwZTpIZXJvX1R5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvPXRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKCFoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1clN0YWdlPXRoaXMuZ2V0SGVyb1N0YWdlKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KGhlcm9UeXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKHRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpLGN1clN0YWdlKTtcclxuICAgICAgICBsZXQgb2Zmc2V0TnVtPW5lZWROdW0taGF2ZU51bTtcclxuICAgICAgICByZXR1cm4gaGF2ZU51bSA8IG5lZWROdW0gJiYgY3VyU3RhZ2U8SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9UeXBlKSAmJiBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5nZXRIZXJvRnJhZ21lbnRJZChoZXJvVHlwZSkpPj1vZmZzZXROdW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb0ZyYWdtZW50SWQoaGVyb0lkOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIC8v5ZOB6LSoXHJcbiAgICAgICAgbGV0IHF1YWxpdHk9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoaGVyb0lkKTtcclxuICAgICAgICByZXR1cm4gMTAxMDAwK3F1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmo4DmtYvoi7Hpm4TmmK/lkKblj6/ku6Xop6PplIEgKi9cclxuICAgIGNoZWNrVW5sb2NrKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaGVyb0luZm89dGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoaGVyb0luZm8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgbmVlZE51bSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tGcmFnbWVudE51bShoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoaGF2ZU51bT49bmVlZE51bSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TnVtPW5lZWROdW0taGF2ZU51bTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmdldEhlcm9GcmFnbWVudElkKGhlcm9UeXBlKSk+PW9mZnNldE51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0V4VXAoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBoZXJvSW5mbz10aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpZihoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIGxldCBld1Nob3dEYXRhID0gRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRXhjbHVzaXZlV2VhcG9uTWVzc2FnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIGlmKGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA+PSBld1Nob3dEYXRhLk1heFN0YWdlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbmVlZE51bSA9IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0luZm8uaGVyb19xdWFsaXR5KTtcclxuICAgICAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIGhhdmVOdW0+PW5lZWROdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEV4Y2x1c2l2ZVdlYXBvbkRhdGEoaGVyb1R5cGU6SGVyb19UeXBlLHN0YWdlOm51bWJlcik6SGVyb0RhdGF7XHJcbiAgICAgICAgbGV0IGluZm8gPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmdldEhlcm9EYXRhKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgZXhEYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGUsc3RhZ2UpO1xyXG5cclxuICAgICAgICBpZihleERhdGEgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGluZm8udG90YWxfaHAgPSBoZXJvRGF0YS5maXhlZF9ocCAqIGV4RGF0YS5IZWFsdGg7XHJcbiAgICAgICAgaW5mby50b3RhbF9hdHRhY2sgPSBoZXJvRGF0YS5maXhlZF9hdHRjayAqIGV4RGF0YS5BdHRhY2s7XHJcbiAgICAgICAgaW5mby50b3RhbF9kZWZlbnNlID0gaGVyb0RhdGEuZml4X2RlZmVuc2UgKiBleERhdGEuRGVmZW5zZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXhjbHVzaXZlV2VhcG9uQ29tYmJhdChoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgbGV0IGV4RGF0YSA9IHRoaXMuZ2V0RXhjbHVzaXZlV2VhcG9uRGF0YShoZXJvVHlwZSxzdGFnZSk7XHJcblxyXG4gICAgICAgIGlmKGV4RGF0YSE9IG51bGwpe1xyXG4gICAgICAgICAgICBudW0gPSBleERhdGEudG90YWxfaHAgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgICAgICsgZXhEYXRhLnRvdGFsX2F0dGFjayAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigyKVxyXG4gICAgICAgICAgICArIGV4RGF0YS50b3RhbF9kZWZlbnNlICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOa1i+S4k+atpuiDveWQpuWNh+e6pyAqL1xyXG4gICAgY2hlY2tFeGNsdXNpdmUoaGVyb1R5cGU6SGVyb19UeXBlKTpIZXJvRXhjbHVzaXZlRGF0YXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSGVyb0V4Y2x1c2l2ZURhdGEoKTtcclxuICAgICAgICAvLyBsZXQgd2VhcG9uRGF0YSA9IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25CeUhlcm9UeXBlQW5kV2VhcG9uTGV2ZWwoaGVyb1R5cGUsdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSkuZXhjbHVzaXZlX2VxdWlwX2xldmVsKTtcclxuICAgICAgICAvLyBkYXRhLmNvc3RfcHJvcF9pZD13ZWFwb25EYXRhLlNwZW5kUHJvcElEXHJcbiAgICAgICAgLy8gZGF0YS5jdXJfcHJvcF9udW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGRhdGEuY29zdF9wcm9wX2lkKTtcclxuICAgICAgICAvLyBkYXRhLmNvc3RfcHJvcF9udW09d2VhcG9uRGF0YS5TcGVuZFByb3BOdW07XHJcbiAgICAgICAgLy8gZGF0YS5pc19jYW5fdXA9ZGF0YS5jdXJfcHJvcF9udW0+PWRhdGEuY29zdF9wcm9wX251bTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIC8qKumAmui/h+e6oueCueexu+Wei+iOt+WPluiLsembhOexu+WeiyAqL1xyXG4gICAgc3RhdGljIGdldEhlcm9UeXBlQnlSZWRUeXBlKHJlZFR5cGU6UmVkRXZlbnRUeXBlKTpIZXJvX1R5cGV7XHJcbiAgICAgICAgbGV0IGhlcm9UeXBlPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAgICAgc3dpdGNoKHJlZFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE6aGVyb1R5cGU9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMjpoZXJvVHlwZT1IZXJvX1R5cGUuU2hvdVdhbmc7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzM6aGVyb1R5cGU9SGVyb19UeXBlLlBhb1Nob3U7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzQ6aGVyb1R5cGU9SGVyb19UeXBlLkRlTHVZaTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNTpoZXJvVHlwZT1IZXJvX1R5cGUuS3VhbmdaaGFuU2hpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF82Omhlcm9UeXBlPUhlcm9fVHlwZS5aaGVuRGU7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzc6aGVyb1R5cGU9SGVyb19UeXBlLk52V3U7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzg6aGVyb1R5cGU9SGVyb19UeXBlLkdvbmdKaWFuU2hvdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfOTpoZXJvVHlwZT1IZXJvX1R5cGUuQmluZ052OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMDpoZXJvVHlwZT1IZXJvX1R5cGUuQU51QmlTaTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTE6aGVyb1R5cGU9SGVyb19UeXBlLk1laU1vOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMjpoZXJvVHlwZT1IZXJvX1R5cGUuTGVpU2hlbjsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirpgJrov4fnuqLngrnnsbvlnovojrflj5boi7Hpm4TnsbvlnosgKi9cclxuICAgIHN0YXRpYyBnZXRSZWRUeXBlQnlIZXJvVHlwZShoZXJvVHlwZTpIZXJvX1R5cGUpOlJlZEV2ZW50VHlwZXtcclxuICAgICAgICBsZXQgcmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xO1xyXG4gICAgICAgIHN3aXRjaChoZXJvVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkNoYW5nTWFvU2hvdTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5TaG91V2FuZzpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzI7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5QYW9TaG91OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkRlTHVZaTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzQ7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5LdWFuZ1poYW5TaGk6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF81OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuWmhlbkRlOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNjsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLk52V3U6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF83OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuR29uZ0ppYW5TaG91OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfODsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkJpbmdOdjpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5BTnVCaVNpOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTA7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5NZWlNbzpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzExOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuTGVpU2hlbjpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEyOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlZFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRIZXJvTGlzdEpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRIZXJvTGlzdEpzb25TdHJpbmcoaGVyb0RhdGFzOkhlcm9PYmplY3RbXSk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICBoZXJvTGlzdDpoZXJvRGF0YXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19