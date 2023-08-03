
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/btn_hero_team', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/btn_hero_role', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/hero_fragment', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/hero_list_ui', cc.SpriteAtlas, function (error, assets) {
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
    //     WXManagerEX.getInstance().resourcesBundle.load('heros/role_ui',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/hero', cc.SpriteAtlas, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.loadDir('heros/body', cc.SpriteFrame, function (error, assets) {
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
            heroInfo.hero_quality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(heroInfo.hero_type);
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
        heroInfo.hero_quality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(heroInfo.hero_type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1EO0FBQ25ELDhFQUFvRjtBQUNwRixxRUFBb0U7QUFDcEUsK0NBQXFEO0FBQ3JELDZDQUFtRDtBQUNuRCxxQ0FBMkM7QUFDM0MseURBQXVGO0FBQ3ZGLHVDQUFzQztBQUN0Qyx1REFBNkQ7QUFDN0QsaURBQTBFO0FBQzFFLHNEQUFxRDtBQUNyRCxvREFBK0M7QUFDL0MsMkRBQWlFO0FBRWpFLHlEQUF3RDtBQUN4RCwyREFBbUU7QUFDbkUsNEVBQWtGO0FBQ2xGLCtEQUFpRTtBQUNqRSw2REFBeUQ7QUFDekQseUNBQStDO0FBQy9DLGlEQUF5RDtBQUN6RCw2REFBbUU7QUFDbkUsc0RBQWlEO0FBQ2pELGdEQUErQztBQUMvQyxpREFBNEM7QUFDNUMsa0VBQXdFO0FBQ3hFLDREQUFrRTtBQUNsRSw0RUFBa0Y7QUFDbEYsMkNBQXNDO0FBQ3RDLDJEQUFrRjtBQUNsRixvREFBbUQ7QUFDbkQsZ0ZBQXNGO0FBQ3RGLCtEQUEwRDtBQUUxRCxZQUFZO0FBQ1o7SUFBQTtRQUNJLFdBQVc7UUFDWCxjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGdCQUFnQjtRQUNoQixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGdCQUFnQjtRQUNoQixhQUFRLEdBQVMsS0FBSyxDQUFDO1FBQ3ZCLGFBQWE7UUFDYixhQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLGVBQWU7UUFDZixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGNBQWM7UUFDZCxZQUFPLEdBQVMsS0FBSyxDQUFDO1FBQ3RCLGdCQUFnQjtRQUNoQixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQiwwQkFBMEI7UUFDMUIsbUJBQW1CO1FBQ25CLDJCQUEyQjtR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QVksQ0FBQyxlQUFlLENBQUM7Z0JBQUMsTUFBTTtZQUNsRSxLQUFLLHNCQUFTLENBQUMsT0FBTztnQkFBQyxPQUFPLEdBQUMsMkJBQVksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFBQyxNQUFNO1lBQ3BFLEtBQUssc0JBQVMsQ0FBQyxLQUFLO2dCQUFDLE9BQU8sR0FBQywyQkFBWSxDQUFDLGdCQUFnQixDQUFDO2dCQUFDLE1BQU07WUFDbEUsS0FBSyxzQkFBUyxDQUFDLE9BQU87Z0JBQUMsT0FBTyxHQUFDLDJCQUFZLENBQUMsZ0JBQWdCLENBQUM7Z0JBQUMsTUFBTTtTQUN2RTtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTywyQ0FBcUIsR0FBN0I7UUFDSSxJQUFJLEdBQUcsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixHQUFHLEVBQUMsR0FBRztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywyQ0FBcUIsR0FBN0IsVUFBOEIsU0FBc0I7UUFDaEQsSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsR0FBRyxFQUFDLEdBQUc7WUFDUCxRQUFRLEVBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBeDVDYyxxQkFBUyxHQUFnQixJQUFJLENBQUM7SUF5NUNqRCxrQkFBQztDQTM1Q0QsQUEyNUNDLElBQUE7QUEzNUNZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1vZGUsIElzRGVidWd9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9RdWFsaXR5TWFuYWdlciB9IGZyb20gXCIuL0hlcm9RdWFsaXR5XCI7XHJcbmltcG9ydCB7IExldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBBc3NldHNFdmVudFR5cGUsIEV2ZW50TWFuYWdlciwgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvRGF0YSB9IGZyb20gXCIuL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4vU2tpbGxMZXZlbFVubG9ja1wiO1xyXG5pbXBvcnQgeyBIZXJvQXR0cmlidXRlTWFuYWdlciwgSnNvbkhlcm9BdHRyaWJ1dGUgfSBmcm9tIFwiLi9IZXJvQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vU2tpbGxDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IFBldEluZm8sIFBldE1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbywgRXF1aXBUeXBlIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBIZXJvVGl0bGVNYW5hZ2VyIH0gZnJvbSBcIi4vSGVyb1RpdGxlXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSwgSGVyb0luZm8gfSBmcm9tIFwiLi4vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyIH0gZnJvbSBcIi4vQ29tYmF0RWZmZWN0aXZlbmVzc1wiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGV0L0RhdGEvU3Bpcml0QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEVXVW5sb2NrQ29zdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRVdVbmxvY2tDb3N0XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25Ta2lsbFwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEhlcm9PYmplY3QsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi8uLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuLyoq6Iux6ZuE5Y2H57qn5pWw5o2uICovXHJcbmV4cG9ydCBjbGFzcyBIZXJvVXBncmFkZURhdGF7XHJcbiAgICAvKirlvZPliY3nmoTnrYnnuqcgKi9cclxuICAgIGN1cl9sZXZlbDpudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeiDveWkn+WNh+e6p+eahOacgOWkp+e6pyAqL1xyXG4gICAgbWF4X2xldmVsOm51bWJlcj0wO1xyXG4gICAgLyoq5b2T5YmN562J57qn5piv5ZCm5Y+v5Lul5Y2H57qnICovXHJcbiAgICBpc19sZXZlbDpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5b2T5YmN5oul5pyJ55qE6YeR5biBICovXHJcbiAgICBjdXJfY29pbjpudW1iZXI9MDtcclxuICAgIC8qKuWNh+e6p+mcgOimgeiKsei0ueeahOmHkeW4gSAqL1xyXG4gICAgY29zdF9jb2luOm51bWJlcj0wO1xyXG4gICAgLyoq5Y2H57qn6YeR5biB5piv5ZCm6Laz5aSfICovXHJcbiAgICBpc19jb2luOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvLyAvKirlvZPliY3mi6XmnInnmoTnu4/pqowgKi9cclxuICAgIC8vIGN1cl9leHA6bnVtYmVyPTA7XHJcbiAgICAvLyAvKirljYfnuqfpnIDopoHoirHotLnnmoTnu4/pqowgKi9cclxuICAgIC8vIGNvc3RfZXhwOm51bWJlcj0wO1xyXG4gICAgLy8gLyoq5Y2H57qn57uP6aqM5piv5ZCm6Laz5aSfICovXHJcbiAgICAvLyBpc19leHA6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8vIC8qKuW9k+WJjeaLpeacieeahOi/m+mYtuefsyAqL1xyXG4gICAgLy8gY3VyX2ppbmppZTogbnVtYmVyID0gMDtcclxuICAgIC8vIC8qKuWNh+e6p+mcgOimgeiKsei0ueeahOi/m+mYtuefsyAqL1xyXG4gICAgLy8gY29zdF9qaW5qaWU6IG51bWJlciA9IDA7XHJcbiAgICAvLyAvKirljYfnuqfov5vpmLbnn7PmmK/lkKbotrPlpJ8gKi9cclxuICAgIC8vIGlzX2ppbmppZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5piv5ZCm6IO95aSf5Y2H57qnICovXHJcbiAgICBpc19jYW5fdXA6Ym9vbGVhbj1mYWxzZTtcclxufVxyXG4vKiroi7Hpm4TkuJPmrabmlbDmja4gKi9cclxuZXhwb3J0IGNsYXNzIEhlcm9FeGNsdXNpdmVEYXRhe1xyXG4gICAgLyoq5b2T5YmN5oul5pyJ55qE6YGT5YW35pWw6YePICovXHJcbiAgICBjdXJfcHJvcF9udW06bnVtYmVyPTA7XHJcbiAgICAvKirljYfnuqfpnIDopoHnmoTpgZPlhbfmlbDph48gKi9cclxuICAgIGNvc3RfcHJvcF9udW06bnVtYmVyPTA7XHJcbiAgICAvKirljYfnuqfpnIDopoHnmoTpgZPlhbdpZCAqL1xyXG4gICAgY29zdF9wcm9wX2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5piv5ZCm6IO95aSf5Y2H57qnICovXHJcbiAgICBpc19jYW5fdXA6Ym9vbGVhbj1mYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9NYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEhlcm9NYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v6LWE5rqQXHJcbiAgICBwcml2YXRlIGJ0bl9oZXJvX3RlYW06Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBwcml2YXRlIGJ0bl9oZXJvX3JvbGU6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBwcml2YXRlIHNwcml0ZV9hdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG4gICAgcHJpdmF0ZSBzcHJpdGVfYXRsYXNzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcbiAgICAvLyBwcml2YXRlIHJvbGVfYXRsYXM6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzcF9ib2R5Ok1hcDxudW1iZXIsY2MuU3ByaXRlRnJhbWU+PW51bGw7XHJcbiAgICBwcml2YXRlIGhlcm9fZnJhZ21lbnQ6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICAvL+iLsembhOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBoZXJvX2RhdGE6TWFwPG51bWJlcixIZXJvRGF0YT49bnVsbDtcclxuICAgIC8vIHByaXZhdGUgaGVyb19sZXZlbDpudW1iZXJbXT1bXTtcclxuICAgIC8vIHByaXZhdGUgaGVyb19xdWFsaXR5Om51bWJlcltdPVtdO1xyXG4gICAgcHJpdmF0ZSBoZXJvX2xpc3Q6SGVyb0luZm9bXSA9IFtdO1xyXG5cclxuICAgIC8vMOaYn+WPr+WNh+e6pzQw57qn77ybMeaYn+WPr+WIsDgw57qn77ybMuaYn+WIsDEyMOe6p++8mzPmmJ/liLAxNjDnuqfvvJs05pif5YiwMjAw57qn77ybNeaYn+WIsDI0MOe6py5cclxuICAgIHB1YmxpYyBoZXJvX3N0YWdlTGlzdDpBcnJheTxudW1iZXI+PVs0MCw4MCwxMjAsMTYwLDIwMCwyNDBdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpIZXJvTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEhlcm9NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICBcclxuICAgICAgICBIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgIFxyXG4gICAgICAgIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgdGhpcy5sb2FkVGVhbVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFJvbGVQcmVmYWIoKTtcclxuICAgICAgICB0aGlzLmxvYWRGcmFnbWVudFByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwKCk7ICAgICBcclxuICAgICAgICAvLyB0aGlzLmxvYWRSb2xlU3AoKTsgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZFNwcygpO1xyXG4gICAgICAgIHRoaXMubG9hZEJvZHkoKTtcclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3otYTmupDnmoTor7vlj5YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJpdmF0ZSBsb2FkVGVhbVByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMuYnRuX2hlcm9fdGVhbSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnaGVyb3MvYnRuX2hlcm9fdGVhbScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5faGVyb190ZWFtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRSb2xlUHJlZmFiKCl7XHJcbiAgICAgICAgaWYodGhpcy5idG5faGVyb19yb2xlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9idG5faGVyb19yb2xlJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ0bl9oZXJvX3JvbGU9YXNzZXRzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEZyYWdtZW50UHJlZmFiKCl7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX2ZyYWdtZW50KVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9oZXJvX2ZyYWdtZW50JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhlcm9fZnJhZ21lbnQ9YXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwKCl7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVfYXRsYXMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2hlcm9zL2hlcm9fbGlzdF91aScsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WKoOi9vUVxdWlwbWVudEF0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZV9hdGxhcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBsb2FkUm9sZVNwKCl7XHJcbiAgICAvLyAgICAgaWYodGhpcy5yb2xlX2F0bGFzKVxyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9yb2xlX3VpJyxjYy5TcHJpdGVBdGxhcywoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAvLyAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZygn5Yqg6L29RXF1aXBtZW50QXR0cmlidXRl5oiQ5YqfJyk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucm9sZV9hdGxhcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU3BzKCl7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVfYXRsYXNzKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9oZXJvJyxjYy5TcHJpdGVBdGxhcywoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygn5Yqg6L29RXF1aXBtZW50QXR0cmlidXRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlX2F0bGFzcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKirliqDovb3nq4vnu5jkuLvkvZMgKi9cclxuICAgIHByaXZhdGUgbG9hZEJvZHkoKXtcclxuICAgICAgICBpZih0aGlzLnNwX2JvZHkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BfYm9keT1uZXcgTWFwPG51bWJlcixjYy5TcHJpdGVGcmFtZT4oKTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkRGlyKCdoZXJvcy9ib2R5JyxjYy5TcHJpdGVGcmFtZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlRnJhbWVbXSk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuPWFzc2V0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3A9YXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9c3AubmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleD1uYW1lLmxhc3RJbmRleE9mKCdfJyk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXJvSWQ9cGFyc2VJbnQobmFtZS5zdWJzdHJpbmcoaW5kZXgrMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BfYm9keS5zZXQoaGVyb0lkLHNwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlRnJhbWVCeU5hbWUoa2V5OnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzLmdldFNwcml0ZUZyYW1lKGtleSk7XHJcbiAgICB9XHJcbiAgICAvLyBwdWJsaWMgZ2V0Um9sZVNwcml0ZUZyYW1lQnlOYW1lKGtleTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLnJvbGVfYXRsYXMuZ2V0U3ByaXRlRnJhbWUoa2V5KTtcclxuICAgIC8vIH1cclxuICAgIHB1YmxpYyBnZXRTcHJpdGVGcmFtZUJ5TmFtZXMoa2V5OnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzcy5nZXRTcHJpdGVGcmFtZShrZXkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1Nwcml0ZUZyYW1lKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK2hlcm9UeXBlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRIZXJvU3ByaXRlRnJhbWVzKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKCdIZWFkX0hlcm9fU18nK2hlcm9UeXBlKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+S4gOW8oOiLsembhOeahOeri+e7mOS4u+S9kyAqL1xyXG4gICAgcHVibGljIGdldEhlcm9Cb2R5KGhlcm9JZDpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwX2JvZHkuZ2V0KGhlcm9JZCk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pWw5o2u5L+d5a2Y5LiO6K+75Y+WLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgb25Mb2FkSGVyb0RhdGEoKXtcclxuICAgICAgICB0aGlzLmxvYWRIZXJvTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbEhlcm9EYXRhKCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5L+d5a2Y5b2T5YmN55qE5oul5pyJ55qE6Iux6ZuE5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHNhdmVIZXJvTGlzdCgpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgICAgICAvLyB0aGlzLmxvYWRIZXJvTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbEhlcm9EYXRhKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIHJlcG9ydEhlcm9MaXN0KCl7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGxldCBoZXJvT2JqZWN0Okhlcm9PYmplY3QgPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0Lmhlcm9JZCA9IHYuaGVyb190eXBlO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0Lmhlcm9MZXZlbCA9IHYuaGVyb19sZXZlbDtcclxuICAgICAgICAgICAgaGVyb09iamVjdC5oZXJvU3RhZ2UgPSB2Lmhlcm9fc3RhZ2U7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QuaGVyb1dlYXBvblN0YWdlID0gdi5leGNsdXNpdmVfZXF1aXBfc3RhZ2U7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3Qud2VhcG9ucyA9IHYud2VhcjE7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QuYXJtb3IgPSB2LndlYXIyO1xyXG4gICAgICAgICAgICBoZXJvT2JqZWN0LmFjY2Vzc29yaWVzID0gdi53ZWFyMztcclxuICAgICAgICAgICAgaGVyb09iamVjdC5zaG9lcyA9IHYud2VhcjQ7XHJcbiAgICAgICAgICAgIGhlcm9PYmplY3QucGV0ID0gdi5wZXRfaWQ7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChoZXJvT2JqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucmVwb3J0SGVyb0xpc3QsdGhpcy5zZXRIZXJvTGlzdEpzb25TdHJpbmcobGlzdCksZmFsc2UpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veiLsembhOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBsb2FkSGVyb0xpc3QoKXtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5oZXJvTGlzdDtcclxuICAgICAgICBsaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZT12Lmhlcm9JZDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbD12Lmhlcm9MZXZlbDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZT12Lmhlcm9TdGFnZTtcclxuICAgICAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlPXYuaGVyb1dlYXBvblN0YWdlO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFyMT12LndlYXBvbnM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXIyPXYuYXJtb3I7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXIzPXYuYWNjZXNzb3JpZXM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXI0PXYuc2hvZXM7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZD12LnBldDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5PUhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19saXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0LHRoaXMuaGVyb19saXN0KTtcclxuICAgICAgICAvLyBsZXQgbGlzdCA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0KVxyXG4gICAgICAgIC8vIGlmKGxpc3Qpe1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2k8bGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGluZm8gPSBsaXN0W2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gaW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gaW5mby5oZXJvX2xldmVsO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5ID0gaW5mby5oZXJvX3F1YWxpdHk7XHJcbiAgICAgICAgLy8gICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBpbmZvLmhlcm9fdHlwZTtcclxuICAgICAgICAvLyAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IGluZm8ucGV0X2lkO1xyXG4gICAgICAgIC8vICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9aW5mby5oZXJvX3N0YWdlO1xyXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBlPUVxdWlwVHlwZS5XdVFpOyBlPEVxdWlwVHlwZS5OdW07IGUrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm9bXCJ3ZWFyXCIrZV09aW5mb1tcIndlYXJcIitlXTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmdldEhlcm9MaXN0LHRoaXMuZ2V0SGVyb0xpc3RKc29uU3RyaW5nKCksZmFsc2UpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgIC8vICAgICBpZihkYXRhKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVyb19saXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgICAgIC8vICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8uaGVyb190eXBlPXYuaGVyb0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLmhlcm9fbGV2ZWw9di5oZXJvTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8uaGVyb19zdGFnZT12Lmhlcm9TdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U9di5oZXJvV2VhcG9uU3RhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ud2VhcjE9di53ZWFwb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLndlYXIyPXYuYXJtb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyb0luZm8ud2VhcjM9di5hY2Nlc3NvcmllcztcclxuICAgICAgICAgICAgICAgICAgICAvLyBoZXJvSW5mby53ZWFyND12LnNob2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcm9JbmZvLnBldF9pZD12LnBldDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsaXN0LnB1c2goaGVyb0luZm8pXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVyb19saXN0ID0gbGlzdDtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuaGVyb19saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gSGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHBhb3Nob3UgPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91LmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcGFvc2hvdS5oZXJvX2xldmVsID0gMTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91Lmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwYW9zaG91Lmhlcm9fc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHBhb3Nob3UuaGVyb190eXBlID0gSGVyb19UeXBlLlBhb1Nob3U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcGFvc2hvdS5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuaGVyb19saXN0LnB1c2gocGFvc2hvdSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRKc29uKFN0b3JhZ2VLZXkuSGVyb0xpc3QsdGhpcy5oZXJvX2xpc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5sb2FkQWxsSGVyb0RhdGEoKTsgIFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5yZXBvcnRIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IDA7XHJcbiAgICAgICAgLy8gICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5oZXJvX3F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgaGVyb0luZm8uaGVyb190eXBlID0gSGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgIC8vICAgICBoZXJvSW5mby5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAvLyAgICAgbGV0IHBhb3Nob3UgPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSAwO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fbGV2ZWwgPSAxO1xyXG4gICAgICAgIC8vICAgICBwYW9zaG91Lmhlcm9fcXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5oZXJvX3N0YWdlID0gMDtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5oZXJvX3R5cGUgPSBIZXJvX1R5cGUuUGFvU2hvdTtcclxuICAgICAgICAvLyAgICAgcGFvc2hvdS5wZXRfaWQgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKHBhb3Nob3UpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5bey5oul5pyJ6Iux6ZuE5YiX6KGoXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0SGVyb0xpc3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aKe5Yqg5LiA5Liq6Iux6ZuE5L+h5oGvXHJcbiAgICBhZGRIZXJvKGhlcm9UeXBlOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gaGVyb1R5cGU7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDE7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19xdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoaGVyb1R5cGUpO1xyXG4gICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDA7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDA7XHJcbiAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gMDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3F1YWxpdHk9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6h5pS26ZuGWOS4quiLsembhCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOafpeivouiLsembhOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOiLsembhOexu+Wei1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvSW5mbyhoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaGVyb19sZXZlbFtoZXJvVHlwZS0xXTtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmhlcm9fbGlzdC5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgaWYodi5oZXJvX3R5cGUgPT0gaGVyb1R5cGUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihpbmRleCA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19saXN0W2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKiroi7Hpm4TnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaW5mby5oZXJvX2xldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5aKe5Yqg6Iux6ZuE562J57qnICovXHJcbiAgICBwdWJsaWMgYWRkSGVyb0xldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKVxyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaW5mby5oZXJvX2xldmVsKys7XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX2xldmVsID09IDEwKXtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7lsIbku7vmhI9Y5ZCN6Iux6ZuE5Y2H5YiwMTDnuqcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmZvLmhlcm9fbGV2ZWwgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7ntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOe6pykpe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY57qnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX2xldmVsID49IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvVHlwZSkpe1xyXG4gICAgICAgICAgICBpbmZvLmhlcm9fbGV2ZWwgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoq6YeN572u6Iux6ZuE562J57qnICovXHJcbiAgICBwdWJsaWMgcmVzZXRIZXJvTHZlbChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaW5mby5oZXJvX2xldmVsID0gMTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoq6Iux6ZuE5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaW5mby5oZXJvX3F1YWxpdHk7XHJcbiAgICB9IFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boi7Hpm4TnmoTkuJPmrabnrYnnuqdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4TnsbvlnotcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmZvID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg6Iux6ZuE55qE5LiT5q2m562J57qnXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuE57G75Z6LXHJcbiAgICAgKi9cclxuICAgIGFkZEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgKys7XHJcbiAgICAgICAgdGhpcy5zYXZlSGVyb0xpc3QoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6Iux6ZuE55qE5LiT5q2m562J57qnXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuE57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gbnVtIOiuvue9rueahOetiee6p1xyXG4gICAgICovXHJcbiAgICBzZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlOkhlcm9fVHlwZSxudW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpXHJcbiAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boi7Hpm4TnmoTpmLbmrrVcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRIZXJvU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uaGVyb19zdGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRIZXJvU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGluZm8uaGVyb19zdGFnZSArKztcclxuICAgICAgICBpZihoZXJvVHlwZSA9PSBIZXJvX1R5cGUuUGFvU2hvdSAmJiBpbmZvLmhlcm9fc3RhZ2UgPT0gNil7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5bCG54Ku5omL5Y2H6IezMeWkp+aYnyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZm8uaGVyb19zdGFnZSAlIDYgPT0gMFxyXG4gICAgICAgICAgICAmJiBNYXRoLmZsb29yKGluZm8uaGVyb19zdGFnZSAvIDYpID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u57Sv6K6hMeS4quiLsembhOWNh+WIsFjmmJ8pICl7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY5pifKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5mby5oZXJvX3N0YWdlID49IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvVHlwZSkpe1xyXG4gICAgICAgICAgICBpbmZvLmhlcm9fc3RhZ2UgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVIZXJvTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ2FuQWRkSGVyb1N0YWdlKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WPquacieabtOaUueeahOaXtuWAmeWGjeS/neWtmOWIsOaWh+S7tu+8jOWHj+WwkeaWh+S7tuivu+WPluasoeaVsFxyXG4gICAgLy8gcHVibGljIGFkZEhlcm9MZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUsbGV2ZWw6bnVtYmVyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAvLyAgICAgbGV0IG5vd0xldmVsPWluZm8uaGVyb19sZXZlbCtsZXZlbDtcclxuICAgIC8vICAgICBpZihub3dMZXZlbDw9TGV2ZWxVcE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgIC8vICAgICAgICAgdGhpcy5zYXZlSGVyb0xldmVsKGhlcm9UeXBlLG5vd0xldmVsKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2F2ZUhlcm9MZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUsbGV2ZWw6bnVtYmVyKVxyXG4gICAgLy8geyAgICAgICAgXHJcbiAgICAvLyAgICAgaWYobGV2ZWw+TGV2ZWxVcE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldmVsPUxldmVsVXBNYW5hZ2VyLmdldE1heExldmVsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCBpbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAvLyAgICAgaW5mby5oZXJvX2xldmVsPWxldmVsO1xyXG4gICAgLy8gICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7ICAgICAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZ2V0VGVhbUxpc3QodHlwZTpHYW1lTW9kZSk6SGVyb19UeXBlW11cclxuICAgIHtcclxuICAgICAgICBsZXQgdGVhbT1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPDU7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGVhbS5wdXNoKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlYW1TdHI6c3RyaW5nPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGVhbV9saXN0XycrdHlwZSk7XHJcbiAgICAgICAgaWYodGVhbVN0cj09PVwiXCIgfHwgdGVhbVN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgICAgIC8vIHRlYW1bMV09KEhlcm9fVHlwZS5EZUx1WWkpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGVhbVsyXT0oSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAgICAgICAgIC8vIHRlYW1bM109KEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAgICAgICAgIHRlYW1bMl09KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVUZWFtTGlzdCh0eXBlLHRlYW0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZWFtPXRoaXMuZ2V0VGVhbUxpc3QoR2FtZU1vZGUuTWFpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBsaXN0PXRlYW1TdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPXBhcnNlSW50KGxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSm9pbj1oZXJvVHlwZT4wJiZ0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSk+MDtcclxuICAgICAgICAgICAgICAgIHRlYW1baV09aXNKb2luP2hlcm9UeXBlOi0xOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVhbTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGVhbUxpc3QodHlwZTpHYW1lTW9kZSx0ZW1wOkhlcm9fVHlwZVtdKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGVhbV9saXN0XycrdHlwZSx0ZW1wLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yqg6L295omA5pyJ55qE6Iux6ZuE5pWw5o2uXHJcbiAgICBsb2FkQWxsSGVyb0RhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIC8v6ZyA6KaB5qC55o2u5Yab6KGU562J57qn77yM6KOF5aSH562J57qn77yM6Iux6ZuE562J57qnXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGE9bmV3IE1hcDxudW1iZXIsSGVyb0RhdGE+KCk7XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGVyb0RhdGEoaGVyb0xpc3RbaV0uaGVyb190eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEhlcm9EYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSk6SGVyb0RhdGFcclxuICAgIHtcclxuICAgICAgICAvLyBpZih0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSk8PTApe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9dGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKTtcclxuICAgICAgICBpZighbG9jYWxIRCl7XHJcbiAgICAgICAgICAgIGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWuoOeJqeWxnuaAp+WumuS5iVxyXG4gICAgICAgIGxldCBwZXRBdGsgPSAwLHBldERlZmVuY2UgPSAwLHBldEhlYWx0aCA9IDAscGV0SGl0ID0gMCxwZXRNaXNzID0gMCxwZXRDcml0aWNhbCA9IDAscGV0QW50aUNyaXRpY2FsID0gMCxwZXRFeHRyYUNyaXRpY2FsID0gMCxwZXRBbnRpRXh0cmFDcml0aWNhbCA9IDA7XHJcbiAgICAgICAgLy8g5LiT5bGe5q2m5Zmo55qE5Yqg5oiQXHJcbiAgICAgICAgbGV0IGV4SHAgPSAwLGV4QXR0YWNrID0gMCxleERlZmVuc2UgPSAwO1xyXG4gICAgICAgIC8vLS3lm7rlrprlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0cmlidXRlRGF0YTpKc29uSGVyb0F0dHJpYnV0ZSA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGUsdGhpcy5nZXRIZXJvU3RhZ2UoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgaGVyb0luZm86SGVyb0luZm8gPSB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2hwID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aEhlYWx0aCkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VIZWFsdGg7XHJcbiAgICAgICAgbG9jYWxIRC5maXhlZF9hdHRjayA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhBdHRhY2spICsgYXR0cmlidXRlRGF0YS5CYXNlQXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuZml4X2RlZmVuc2UgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoRGVmZW5zZSkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VEZWZlbnNlO1xyXG4gICAgICAgIC8vIOS4k+WxnuatpuWZqOaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBleFN0YWdlID0gdGhpcy5nZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlKVxyXG4gICAgICAgIGlmKGV4U3RhZ2UgPiAwKXtcclxuICAgICAgICAgICAgbGV0IGV4SnNvbkRhdGEgPSBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxleFN0YWdlKTtcclxuICAgICAgICAgICAgZXhIcCA9IChleEpzb25EYXRhLkhlYWx0aCkgKiBsb2NhbEhELmZpeGVkX2hwO1xyXG4gICAgICAgICAgICBleEF0dGFjayA9IChleEpzb25EYXRhLkF0dGFjaykgKiBsb2NhbEhELmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICBleERlZmVuc2UgPSAoZXhKc29uRGF0YS5EZWZlbnNlKSAqIGxvY2FsSEQuZml4X2RlZmVuc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlrqDnianmlbDmja7ojrflj5ZcclxuICAgICAgICBsZXQgcGV0SWQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKHBldElkIT0wKXtcclxuICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgIHBldEF0ayA9IHBldEluZm8uQXR0YWNrO1xyXG4gICAgICAgICAgICBwZXREZWZlbmNlID0gcGV0SW5mby5EZWZlbnNlO1xyXG4gICAgICAgICAgICBwZXRIZWFsdGggPSBwZXRJbmZvLkhlYWx0aDtcclxuICAgICAgICAgICAgcGV0SGl0ID0gcGV0SW5mby5IaXQ7XHJcbiAgICAgICAgICAgIHBldE1pc3MgPSBwZXRJbmZvLk1pc3M7XHJcbiAgICAgICAgICAgIHBldENyaXRpY2FsID0gcGV0SW5mby5Dcml0aWNhbDtcclxuICAgICAgICAgICAgcGV0QW50aUNyaXRpY2FsID0gcGV0SW5mby5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEV4dHJhQ3JpdGljYWwgPSBwZXRJbmZvLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEFudGlFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxIRC5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgLy8g5ZG95Lit5YC8XHJcbiAgICAgICAgbG9jYWxIRC5IaXQgPSBhdHRyaWJ1dGVEYXRhLkhpdCArIHBldEhpdDtcclxuICAgICAgICAvLyDpl6rpgb/lgLxcclxuICAgICAgICBsb2NhbEhELk1pc3MgPSBhdHRyaWJ1dGVEYXRhLk1pc3MgKyBwZXRNaXNzO1xyXG4gICAgICAgIC8vIOaatOWHu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkNyaXRpY2FsICsgcGV0Q3JpdGljYWw7XHJcbiAgICAgICAgLy8g6Ziy54iG5YC8XHJcbiAgICAgICAgbG9jYWxIRC5BbnRpQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlDcml0aWNhbCArIHBldEFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vlop7luYVcclxuICAgICAgICBsb2NhbEhELkV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkV4dHJhQ3JpdGljYWwgKyBwZXRFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIOaatOWHu+aKl+aAp1xyXG4gICAgICAgIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwgPSBhdHRyaWJ1dGVEYXRhLkFudGlFeHRyYUNyaXRpY2FsICsgcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcblxyXG4gICAgICAgIC8vIOaUu+mAn1xyXG4gICAgICAgIGxldCBIQklNID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxvY2FsSEQuYmFzZV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmdvbmdqaV9qaWFuZ2UgPSAxL0hCSU0uZ2V0QmFzZVNwZWVkKGhlcm9UeXBlKTtcclxuICAgICAgICBsb2NhbEhELmF0a1NwZWVkID0gSEJJTS5nZXRCYXNlU3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuYnVsbGV0X3NwZWVkID0gSEJJTS5nZXRCYXNlQnVsbGV0U3BlZWQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuZ29uZ2ppX2ZhbndlaSA9IEhCSU0uZ2V0QXR0YWNrUmFuZ2UoaGVyb1R5cGUpO1xyXG5cclxuICAgICAgICAvLyDmrablmajliqDmiJBcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gRXF1aXBUeXBlLld1UWk7aTxFcXVpcFR5cGUuTnVtO2krKyl7XHJcbiAgICAgICAgICAgIGxldCB3ZWFwb25JbmZvID0gaGVyb0luZm9bXCJ3ZWFyXCIraV07XHJcbiAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhcG9uRGF0YSA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzYWRkaXRpb25hbCh3ZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGFsbFdlYXBvbkF0ayArPSB3ZWFwb25EYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uSHAgKz0gd2VhcG9uRGF0YVsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS3mgLvlgLxcclxuICAgICAgICBsb2NhbEhELkF0dGFjayA9IGxvY2FsSEQudG90YWxfYXR0YWNrID0gbG9jYWxIRC5maXhlZF9hdHRjayArIGFsbFdlYXBvbkF0ayArIHBldEF0ayArIGV4QXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aCArIGV4SHA7XHJcbiAgICAgICAgbG9jYWxIRC5EZWZlbnNlID0gbG9jYWxIRC50b3RhbF9kZWZlbnNlID0gbG9jYWxIRC5maXhfZGVmZW5zZSArIGFsbFdlYXBvbkRlZmVuY2UgKyBwZXREZWZlbmNlICsgZXhEZWZlbnNlO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKSArIDE7XHJcblxyXG4gICAgICAgIGxvY2FsSEQuQ29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3o9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTsgIFxyXG4gICAgICAgIGxvY2FsSEQudW5sb2NrX3N0YXRlPW5ldyBNYXA8bnVtYmVyLGJvb2xlYW4+KCk7XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU2tpbGxQb3NBbmRTa2lsbExldmVsKGhlcm9UeXBlLHMsc3Rhcik7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfei5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBsb2NhbEhELkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICAgICAgbG9jYWxIRC51bmxvY2tfc3RhdGUuc2V0KHMsaGVyb0luZm8uaGVyb19sZXZlbD49U2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwocykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9NDsgcysrKXtcclxuICAgICAgICAgICAgaWYoZXhTdGFnZT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBleElkPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKGhlcm9UeXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U3Rhcj1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyKGV4SWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U2tpbGxJZD1FeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChoZXJvVHlwZSxleFN0YXIrMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9RXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkV4Y2x1c2l2ZVdlYXBvblNraWxsKGV4U2tpbGxJZCk7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxvY2FsSERbXCJFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlX1wiK3NdPWpzb25EYXRhW1wiRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV9cIitzXTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YS5zZXQoaGVyb1R5cGUsbG9jYWxIRCk7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsSEQ7XHJcblxyXG4gICAgICAgIC8vbG9jYWxIRD10aGlzLmdldEJhc2VIZXJvRGF0YShpKTtcclxuICAgICAgICAvLyAvL+aUu+WHu+iMg+WbtFxyXG4gICAgICAgIC8vIGxldCBoZXJvU3RhZ2U9dGhpcy5nZXRIZXJvU3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIC8vbGV0IGhlcm9RdWFsaXR5PXRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIC8vbGV0IGhlcm9UaWVyPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpZXIoaGVyb1F1YWxpdHkpO1xyXG4gICAgICAgIC8vIGxldCBoYW1JZD1IZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJZChoZXJvVHlwZSxoZXJvU3RhZ2UpO1xyXG4gICAgICAgIC8vIGxldCBqc29uSEFNPUhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9BdHRyaWJ1dGUoaGFtSWQpO1xyXG4gICAgICAgIC8vIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHu+aUu+mAn+aatOWHu+eIhueOh+etiS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gLy/mlLvlh7vlipss5Z+65pys5pS75Ye7XHJcbiAgICAgICAgLy8gbGV0IGJhc2VHSj1qc29uSEFNLkF0dGFjaztcclxuICAgICAgICAvLyBsZXQgZXF1aXBBdHRhY2s9MDtcclxuICAgICAgICAvLyAvKirpop3lpJbnmb7liIbmr5TmlLvpgJ8gKi9cclxuICAgICAgICAvLyBsZXQgZXF1aXBBdHRhY2tTcGVlZD0gMCA7XHJcbiAgICAgICAgLy8gLyoq6Ziy5b6h5YqbICovXHJcbiAgICAgICAgLy8gbGV0IGVxdWlwRGVmZW5zZSA9IDAgO1xyXG4gICAgICAgIC8vIC8qKueUn+WRveWAvCAqL1xyXG4gICAgICAgIC8vIGxldCBlcXVpcEhlYWx0aCA9IDAgO1xyXG4gICAgICAgIC8vIGxldCBlaW09RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGxldCBlYW09RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQgd2VhckVxdWlwSW5mbz1laW0uZ2V0TmV3V2VhckVxdWlwbWVudChoZXJvVHlwZSxpKTtcclxuICAgICAgICAvLyAgICAgaWYod2VhckVxdWlwSW5mbylcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGpzb25EYXRhPWVhbS5nZXRKc29uRXF1aXBtZW50QXR0cmlidXRlKHdlYXJFcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/ov5nph4zmmK/nm7jliqBcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwQXR0YWNrKz1qc29uRGF0YS5BdHRhY2s7XHJcbiAgICAgICAgLy8gICAgICAgICBlcXVpcEF0dGFja1NwZWVkKz1qc29uRGF0YS5BdHRhY2tTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwRGVmZW5zZSs9anNvbkRhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgICAgIGVxdWlwSGVhbHRoKz1qc29uRGF0YS5IZWFsdGg7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gLy/lrqDnianliqDmiJBcclxuICAgICAgICAvLyBsZXQgcGV0R0o9MDtcclxuICAgICAgICAvLyBsZXQgcGVEZWZlbnNlPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEhlYWx0aD0wO1xyXG4gICAgICAgIC8vIGxldCBwZXRNaXNzPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldENyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgcGV0QW50aUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEFudGlFeHRyYUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IHBldEhpdD0wO1xyXG4gICAgICAgIC8vIC8vXHJcbiAgICAgICAgLy8gaWYobG9jYWxIRC5wZXRfaW5mbyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBwZXREYXRhPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXREYXRhKGxvY2FsSEQucGV0X2luZm8pO1xyXG4gICAgICAgIC8vICAgICBwZXRHSj1wZXREYXRhLkF0dGFjaztcclxuICAgICAgICAvLyAgICAgcGVEZWZlbnNlPXBldERhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgcGV0SGVhbHRoPXBldERhdGEuSGVhbHRoO1xyXG4gICAgICAgIC8vICAgICBwZXRNaXNzPXBldERhdGEuTWlzcztcclxuICAgICAgICAvLyAgICAgcGV0Q3JpdGljYWw9cGV0RGF0YS5Dcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0RXh0cmFDcml0aWNhbD1wZXREYXRhLkV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gICAgIHBldEFudGlDcml0aWNhbD1wZXREYXRhLkFudGlDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0QW50aUV4dHJhQ3JpdGljYWw9cGV0RGF0YS5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgcGV0SGl0PXBldERhdGEuSGl0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+S4k+WxnuatpuWZqOWKoOaIkCglLOmZpOS6huaatOWHu+WAvOWSjOWRveS4reWAvOaYr+WFt+S9k+aVsOWAvO+8jOWFtuS7lueahOmDveaYr+eZvuWIhuavlOaVsOWAvClcclxuICAgICAgICAvLyBsZXQgZXhHSj0wO1xyXG4gICAgICAgIC8vIGxldCBleERlZmVuc2U9MDtcclxuICAgICAgICAvLyBsZXQgZXhIZWFsdGg9MDtcclxuICAgICAgICAvLyBsZXQgZXhNaXNzPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4Q3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhFeHRyYUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4QW50aUNyaXRpY2FsPTA7XHJcbiAgICAgICAgLy8gbGV0IGV4QW50aUV4dHJhQ3JpdGljYWw9MDtcclxuICAgICAgICAvLyBsZXQgZXhIaXQ9MDtcclxuICAgICAgICAvLyAvL+S4k+atpuetiee6p1xyXG4gICAgICAgIC8vIGxvY2FsSEQuaGVyb19pbmZvID0gdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gaWYobG9jYWxIRC5oZXJvX2luZm8uZXhjbHVzaXZlX2VxdWlwX2xldmVsPj0wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGV4SWQ9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldElkKGhlcm9UeXBlLGxvY2FsSEQuaGVyb19pbmZvLmV4Y2x1c2l2ZV9lcXVpcF9sZXZlbCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBleEpzb25EYXRhPUV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVFbmhhbmNlbWVudChleElkKTtcclxuICAgICAgICAvLyAgICAgZXhHSj1leEpzb25EYXRhLkF0dGFjaztcclxuICAgICAgICAvLyAgICAgZXhEZWZlbnNlPWV4SnNvbkRhdGEuRGVmZW5zZTtcclxuICAgICAgICAvLyAgICAgZXhIZWFsdGg9ZXhKc29uRGF0YS5IZWFsdGg7XHJcbiAgICAgICAgLy8gICAgIGV4TWlzcz1leEpzb25EYXRhLk1pc3M7XHJcbiAgICAgICAgLy8gICAgIGV4Q3JpdGljYWw9ZXhKc29uRGF0YS5Dcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhFeHRyYUNyaXRpY2FsPWV4SnNvbkRhdGEuRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhBbnRpQ3JpdGljYWw9ZXhKc29uRGF0YS5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8gICAgIGV4QW50aUV4dHJhQ3JpdGljYWw9ZXhKc29uRGF0YS5BbnRpRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyAgICAgZXhIaXQ9ZXhKc29uRGF0YS5IaXQ7XHJcbiAgICAgICAgLy8gICAgIC8v5LiT5q2m5oqA6IO95Y+C5pWwICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGxldCBza2lsbElkPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJZChFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeFN0YWdlKGxvY2FsSEQuaGVyb19pbmZvLmV4Y2x1c2l2ZV9lcXVpcF9sZXZlbCksaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vICAgICBsZXQgZXhTa2lsbEpzb25EYXRhPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbChza2lsbElkKTtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzI9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMjtcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzM9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMztcclxuICAgICAgICAvLyAgICAgbG9jYWxIRC5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzQ9ZXhTa2lsbEpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfNDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLy/mlLvlh7vlips95Z+656GA5pS75Ye75YqbKu+8iCUrJe+8iVxyXG4gICAgICAgIC8vIC8v5Zu65a6a5pS75Ye75YqbICAgICAgICBcclxuICAgICAgICAvLyBsZXQgdG90YWxHSj0oYmFzZUdKK2VxdWlwQXR0YWNrK3BldEdKKTtcclxuICAgICAgICAvLyBsZXQgZml4QXR0YWNrPXRvdGFsR0o7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5maXhlZF9hdHRjaz1maXhBdHRhY2s7XHJcbiAgICAgICAgLy8gdG90YWxHSis9dG90YWxHSiooZXhHSik7XHJcbiAgICAgICAgLy8gbG9jYWxIRC50b3RhbF9hdHRhY2s9TWF0aC5yb3VuZCh0b3RhbEdKKTtcclxuICAgICAgICAvLyBsb2NhbEhELkF0dGFjaz1sb2NhbEhELnRvdGFsX2F0dGFjazsgICAgICAgIFxyXG4gICAgICAgIC8vIC8v5Z+656GA5pS75Ye76YCf5bqmKu+8iOijheWkhyUr6KOF5aSH6ZmE5YqgJe+8iSzov5nph4zlvpfliLDnmoTlgLzmmK/mr4/np5LmlLvlh7vmrKHmlbBcclxuICAgICAgICAvLyAvL2xldCB0YWxlbnRHUz1UYWxlbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFsZW50RGF0YShUYWxlbnRUeXBlLkF0dFNwZWVkKTtcclxuICAgICAgICAvLyBsZXQgYXR0U3BlZWQ9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5iYXNlX2ppYW5nZT0xL2F0dFNwZWVkO1xyXG4gICAgICAgIC8vIC8v55u05o6l5Yqg5aSp6LWL55qEXHJcbiAgICAgICAgLy8gYXR0U3BlZWQrPWF0dFNwZWVkKigoZXF1aXBBdHRhY2tTcGVlZCkvMTAwKTtcclxuICAgICAgICAvLyAvL+i9rOaNouaIkOWkmuWwkeenkuaUu+WHu+S4gOasoSzljbPmlLvlh7vpl7TpmpRcclxuICAgICAgICAvLyBsb2NhbEhELmdvbmdqaV9qaWFuZ2U9MS9hdHRTcGVlZDsgICAgICAgIFxyXG4gICAgICAgIC8vIC8v6Ziy5b6h5YqbXHJcbiAgICAgICAgLy8gbGV0IGJhc2VEZWZlbnNlPWpzb25IQU0uRGVmZW5zZTtcclxuICAgICAgICAvLyBsb2NhbEhELkRlZmVuc2U9YmFzZURlZmVuc2UrcGVEZWZlbnNlK2VxdWlwRGVmZW5zZTtcclxuICAgICAgICAvLyBsb2NhbEhELkRlZmVuc2UrPWxvY2FsSEQuRGVmZW5zZSooZXhEZWZlbnNlKTtcclxuICAgICAgICAvLyAvL+eUn+WRveWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlSHA9anNvbkhBTS5IZWFsdGg7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5maXhlZF9ocD1iYXNlSHArcGV0SGVhbHRoK2VxdWlwSGVhbHRoO1xyXG4gICAgICAgIC8vIGxvY2FsSEQudG90YWxfaHA9bG9jYWxIRC5maXhlZF9ocCtsb2NhbEhELmZpeGVkX2hwKihleEhlYWx0aCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5IZWFsdGg9bG9jYWxIRC50b3RhbF9ocDtcclxuICAgICAgICAvLyAvL+WRveS4reWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlSGl0PWpzb25IQU0uSGl0O1xyXG4gICAgICAgIC8vIGxvY2FsSEQuSGl0PWJhc2VIaXQrcGV0SGl0K2V4SGl0O1xyXG4gICAgICAgIC8vIC8v6Zeq6YG/5YC8XHJcbiAgICAgICAgLy8gbGV0IGJhc2VNaXNzPWpzb25IQU0uTWlzcztcclxuICAgICAgICAvLyBsb2NhbEhELk1pc3M9YmFzZU1pc3MrcGV0TWlzcztcclxuICAgICAgICAvLyBsb2NhbEhELk1pc3MrPWxvY2FsSEQuTWlzcyooZXhNaXNzKTtcclxuICAgICAgICAvLyAvL+aatOWHu+WAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlQ3JpdGljYWw9anNvbkhBTS5Dcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkNyaXRpY2FsPWJhc2VDcml0aWNhbCtwZXRDcml0aWNhbCtleENyaXRpY2FsO1xyXG4gICAgICAgIC8vIC8v5pq05Ye75aKe5bmFXHJcbiAgICAgICAgLy8gbGV0IGJhc2VFeHRyYUNyaXRpY2FsPWpzb25IQU0uRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkV4dHJhQ3JpdGljYWw9YmFzZUV4dHJhQ3JpdGljYWwrcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyBsb2NhbEhELkV4dHJhQ3JpdGljYWwrPWxvY2FsSEQuRXh0cmFDcml0aWNhbCooZXhFeHRyYUNyaXRpY2FsKTtcclxuICAgICAgICAvLyAvL+mYsuaatOWAvFxyXG4gICAgICAgIC8vIGxldCBiYXNlQW50aUNyaXRpY2FsPWpzb25IQU0uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUNyaXRpY2FsPWJhc2VBbnRpQ3JpdGljYWwrcGV0QW50aUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUNyaXRpY2FsKz1sb2NhbEhELkFudGlDcml0aWNhbCooZXhBbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgIC8vIC8v5pq05Ye75oqX5oCnXHJcbiAgICAgICAgLy8gbGV0IGJhc2VBbnRpRXh0cmFDcml0aWNhbD1qc29uSEFNLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWw9YmFzZUFudGlFeHRyYUNyaXRpY2FsK3BldEFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwrPWxvY2FsSEQuQW50aUV4dHJhQ3JpdGljYWwqKGV4QW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgICAgIC8vIC8vXHJcbiAgICAgICAgLy8gbG9jYWxIRC5Db2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5Ta2lsbFZhbHVlX3g9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIC8vIGxvY2FsSEQuU2tpbGxWYWx1ZV95PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAvLyBsb2NhbEhELlNraWxsVmFsdWVfej1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5Ta2lsbFZhbHVlXzQ9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpOyAgICAgICAgXHJcbiAgICAgICAgLy8gLy8z5Liq5oqA6IO95qe955qEXHJcbiAgICAgICAgLy8gZm9yKGxldCBzPTE7IHM8PTM7IHMrKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBza2lsbExldmVsPVNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxMZXZlbChzLGhlcm9TdGFnZSk7XHJcbiAgICAgICAgLy8gICAgIGlmKHNraWxsTGV2ZWw+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2tpbGxJZD1Ta2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJZChzLHNraWxsTGV2ZWwpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNraWxsTGV2ZWxJZD1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldElkKGhlcm9UeXBlLHNraWxsSWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGpzb25EYXRhPVNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU2tpbGxDb25maWd1cmF0aW9uKHNraWxsTGV2ZWxJZCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgIC8vICAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3kuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8yKTtcclxuICAgICAgICAvLyAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgLy8gICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgIC8vICAgICAgICAgbG9jYWxIRC5Db2xkRG93bi5zZXQocyxqc29uRGF0YS5Db2xkRG93bik7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5oZXJvX2RhdGEuc2V0KGhlcm9UeXBlLGxvY2FsSEQpO1xyXG4gICAgICAgIC8vIHJldHVybiBsb2NhbEhEO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbzpIZXJvSW5mbyk6SGVyb0RhdGF7XHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgLy8g5a6g54mp5bGe5oCn5a6a5LmJXHJcbiAgICAgICAgbGV0IHBldEF0ayA9IDAscGV0RGVmZW5jZSA9IDAscGV0SGVhbHRoID0gMCxwZXRIaXQgPSAwLHBldE1pc3MgPSAwLHBldENyaXRpY2FsID0gMCxwZXRBbnRpQ3JpdGljYWwgPSAwLHBldEV4dHJhQ3JpdGljYWwgPSAwLHBldEFudGlFeHRyYUNyaXRpY2FsID0gMDtcclxuICAgICAgICAvLyDkuJPlsZ7mrablmajnmoTliqDmiJBcclxuICAgICAgICBsZXQgZXhIcCA9IDAsZXhBdHRhY2sgPSAwLGV4RGVmZW5zZSA9IDA7XHJcbiAgICAgICAgLy8tLeWbuuWumuWxnuaAp1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVEYXRhOkpzb25IZXJvQXR0cmlidXRlID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvSW5mby5oZXJvX3R5cGUsaGVyb0luZm8uaGVyb19zdGFnZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbG9jYWxIRC5maXhlZF9ocCA9IChoZXJvSW5mby5oZXJvX2xldmVsICogYXR0cmlidXRlRGF0YS5Hcm93dGhIZWFsdGgpICsgYXR0cmlidXRlRGF0YS5CYXNlSGVhbHRoO1xyXG4gICAgICAgIGxvY2FsSEQuZml4ZWRfYXR0Y2sgPSAoaGVyb0luZm8uaGVyb19sZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoQXR0YWNrKSArIGF0dHJpYnV0ZURhdGEuQmFzZUF0dGFjaztcclxuICAgICAgICBsb2NhbEhELmZpeF9kZWZlbnNlID0gKGhlcm9JbmZvLmhlcm9fbGV2ZWwgKiBhdHRyaWJ1dGVEYXRhLkdyb3d0aERlZmVuc2UpICsgYXR0cmlidXRlRGF0YS5CYXNlRGVmZW5zZTtcclxuICAgICAgICAvLyDkuJPlsZ7mrablmajmlbDmja7ojrflj5ZcclxuICAgICAgICBsZXQgZXhTdGFnZSA9IGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTtcclxuICAgICAgICBpZihleFN0YWdlID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBleEpzb25EYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb0luZm8uaGVyb190eXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICBleEhwID0gKGV4SnNvbkRhdGEuSGVhbHRoKSAqIGxvY2FsSEQuZml4ZWRfaHA7XHJcbiAgICAgICAgICAgIGV4QXR0YWNrID0gKGV4SnNvbkRhdGEuQXR0YWNrKSAqIGxvY2FsSEQuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgIGV4RGVmZW5zZSA9IChleEpzb25EYXRhLkRlZmVuc2UpICogbG9jYWxIRC5maXhfZGVmZW5zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWuoOeJqeaVsOaNruiOt+WPllxyXG4gICAgICAgIGxldCBwZXRJZCA9IGhlcm9JbmZvLnBldF9pZDtcclxuICAgICAgICBpZihwZXRJZCE9MCl7XHJcbiAgICAgICAgICAgIGxldCBwZXRJbmZvID0gU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRBdHRyaWJ1dGUocGV0SWQpO1xyXG4gICAgICAgICAgICBwZXRBdGsgPSBwZXRJbmZvLkF0dGFjaztcclxuICAgICAgICAgICAgcGV0RGVmZW5jZSA9IHBldEluZm8uRGVmZW5zZTtcclxuICAgICAgICAgICAgcGV0SGVhbHRoID0gcGV0SW5mby5IZWFsdGg7XHJcbiAgICAgICAgICAgIHBldEhpdCA9IHBldEluZm8uSGl0O1xyXG4gICAgICAgICAgICBwZXRNaXNzID0gcGV0SW5mby5NaXNzO1xyXG4gICAgICAgICAgICBwZXRDcml0aWNhbCA9IHBldEluZm8uQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIHBldEFudGlDcml0aWNhbCA9IHBldEluZm8uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgICAgICBwZXRFeHRyYUNyaXRpY2FsID0gcGV0SW5mby5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgICAgICBwZXRBbnRpRXh0cmFDcml0aWNhbCA9IHBldEluZm8uQW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2FsSEQucGV0X2lkPXBldElkO1xyXG4gICAgICAgIC8vIOWRveS4reWAvFxyXG4gICAgICAgIGxvY2FsSEQuSGl0ID0gYXR0cmlidXRlRGF0YS5IaXQgKyBwZXRIaXQ7XHJcbiAgICAgICAgLy8g6Zeq6YG/5YC8XHJcbiAgICAgICAgbG9jYWxIRC5NaXNzID0gYXR0cmlidXRlRGF0YS5NaXNzICsgcGV0TWlzcztcclxuICAgICAgICAvLyDmmrTlh7vlgLxcclxuICAgICAgICBsb2NhbEhELkNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5Dcml0aWNhbCArIHBldENyaXRpY2FsO1xyXG4gICAgICAgIC8vIOmYsueIhuWAvFxyXG4gICAgICAgIGxvY2FsSEQuQW50aUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpQ3JpdGljYWwgKyBwZXRBbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8g5pq05Ye75aKe5bmFXHJcbiAgICAgICAgbG9jYWxIRC5FeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5FeHRyYUNyaXRpY2FsICsgcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vmipfmgKdcclxuICAgICAgICBsb2NhbEhELkFudGlFeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArIHBldEFudGlFeHRyYUNyaXRpY2FsO1xyXG5cclxuICAgICAgICAvLyDmlLvpgJ9cclxuICAgICAgICBsZXQgSEJJTSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsb2NhbEhELmJhc2VfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxvY2FsSEQuZ29uZ2ppX2ppYW5nZSA9IDEvSEJJTS5nZXRCYXNlU3BlZWQoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICBsb2NhbEhELmF0a1NwZWVkID0gSEJJTS5nZXRCYXNlU3BlZWQoaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICBsb2NhbEhELmJ1bGxldF9zcGVlZCA9IEhCSU0uZ2V0QmFzZUJ1bGxldFNwZWVkKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfZmFud2VpID0gSEJJTS5nZXRBdHRhY2tSYW5nZShoZXJvSW5mby5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICAvLyDmrablmajliqDmiJBcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gRXF1aXBUeXBlLld1UWk7aTxFcXVpcFR5cGUuTnVtO2krKyl7XHJcbiAgICAgICAgICAgIGxldCB3ZWFwb25JbmZvID0gaGVyb0luZm9bXCJ3ZWFyXCIraV07XHJcbiAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhcG9uRGF0YSA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzYWRkaXRpb25hbCh3ZWFwb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGFsbFdlYXBvbkF0ayArPSB3ZWFwb25EYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgYWxsV2VhcG9uSHAgKz0gd2VhcG9uRGF0YVsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS3mgLvlgLxcclxuICAgICAgICBsb2NhbEhELkF0dGFjayA9IGxvY2FsSEQudG90YWxfYXR0YWNrID0gbG9jYWxIRC5maXhlZF9hdHRjayArIGFsbFdlYXBvbkF0ayArIHBldEF0ayArIGV4QXR0YWNrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aCArIGV4SHA7XHJcbiAgICAgICAgbG9jYWxIRC5EZWZlbnNlID0gbG9jYWxIRC50b3RhbF9kZWZlbnNlID0gbG9jYWxIRC5maXhfZGVmZW5zZSArIGFsbFdlYXBvbkRlZmVuY2UgKyBwZXREZWZlbmNlICsgZXhEZWZlbnNlO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvSW5mby5oZXJvX3R5cGUsaGVyb0luZm8uaGVyb19zdGFnZSkgKyAxO1xyXG5cclxuICAgICAgICBsb2NhbEhELkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3k9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7ICBcclxuICAgICAgICBsb2NhbEhELnVubG9ja19zdGF0ZT1uZXcgTWFwPG51bWJlcixib29sZWFuPigpO1xyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD00OyBzKyspe1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGE9U2tpbGxDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFNraWxsUG9zQW5kU2tpbGxMZXZlbChoZXJvSW5mby5oZXJvX3R5cGUscyxzdGFyKTtcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV94LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV95LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgICAgIGxvY2FsSEQuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgICAgICBsb2NhbEhELnVubG9ja19zdGF0ZS5zZXQocyxoZXJvSW5mby5oZXJvX2xldmVsPj1Ta2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD00OyBzKyspe1xyXG4gICAgICAgICAgICBpZihleFN0YWdlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4SWQ9RXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQoaGVyb0luZm8uaGVyb190eXBlLGV4U3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U3Rhcj1FeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyKGV4SWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4U2tpbGxJZD1FeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZChoZXJvSW5mby5oZXJvX3R5cGUsZXhTdGFyKzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPUV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbChleFNraWxsSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEhEW1wiRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV9cIitzXT1qc29uRGF0YVtcIkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfXCIrc107XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsSEQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBnZXRUYXJnZXRIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyLGxldmVsOm51bWJlcik6SGVyb0RhdGF7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvY2FsSEQ9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgbGV0IGhlcm9MZXZlbCA9IGxldmVsO1xyXG5cclxuICAgICAgICAvLyDlrqDnianlsZ7mgKflrprkuYlcclxuICAgICAgICBsZXQgcGV0QXRrID0gMCxwZXREZWZlbmNlID0gMCxwZXRIZWFsdGggPSAwLHBldEhpdCA9IDAscGV0TWlzcyA9IDAscGV0Q3JpdGljYWwgPSAwLHBldEFudGlDcml0aWNhbCA9IDAscGV0RXh0cmFDcml0aWNhbCA9IDAscGV0QW50aUV4dHJhQ3JpdGljYWwgPSAwO1xyXG5cclxuICAgICAgICAvLy0t5Zu65a6a5bGe5oCnXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZURhdGE6SnNvbkhlcm9BdHRyaWJ1dGUgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKGhlcm9UeXBlLHN0YWdlKTtcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2hwID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoSGVhbHRoKSArIGF0dHJpYnV0ZURhdGEuQmFzZUhlYWx0aDtcclxuICAgICAgICBsb2NhbEhELmZpeGVkX2F0dGNrID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoQXR0YWNrKSArIGF0dHJpYnV0ZURhdGEuQmFzZUF0dGFjaztcclxuICAgICAgICBsb2NhbEhELmZpeF9kZWZlbnNlID0gKGhlcm9MZXZlbCAqIGF0dHJpYnV0ZURhdGEuR3Jvd3RoRGVmZW5zZSkgKyBhdHRyaWJ1dGVEYXRhLkJhc2VEZWZlbnNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOatpuWZqCblrqDnianliqDmiJBcclxuICAgICAgICBsZXQgaGVyb0luZm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgYWxsV2VhcG9uSHAgPSAwLGFsbFdlYXBvbkF0ayA9IDAsYWxsV2VhcG9uRGVmZW5jZSA9IDA7XHJcbiAgICAgICAgaWYoaGVyb0luZm8hPW51bGwpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHBldElkID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgaWYocGV0SWQhPTApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgICAgICBwZXRBdGsgPSBwZXRJbmZvLkF0dGFjaztcclxuICAgICAgICAgICAgICAgIHBldERlZmVuY2UgPSBwZXRJbmZvLkRlZmVuc2U7XHJcbiAgICAgICAgICAgICAgICBwZXRIZWFsdGggPSBwZXRJbmZvLkhlYWx0aDtcclxuICAgICAgICAgICAgICAgIHBldEhpdCA9IHBldEluZm8uSGl0O1xyXG4gICAgICAgICAgICAgICAgcGV0TWlzcyA9IHBldEluZm8uTWlzcztcclxuICAgICAgICAgICAgICAgIHBldENyaXRpY2FsID0gcGV0SW5mby5Dcml0aWNhbDtcclxuICAgICAgICAgICAgICAgIHBldEFudGlDcml0aWNhbCA9IHBldEluZm8uQW50aUNyaXRpY2FsO1xyXG4gICAgICAgICAgICAgICAgcGV0RXh0cmFDcml0aWNhbCA9IHBldEluZm8uRXh0cmFDcml0aWNhbDtcclxuICAgICAgICAgICAgICAgIHBldEFudGlFeHRyYUNyaXRpY2FsID0gcGV0QW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxIRC5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IEVxdWlwVHlwZS5XdVFpO2k8RXF1aXBUeXBlLk51bTtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlYXBvbkluZm8gPSBoZXJvSW5mb1tcIndlYXJcIitpXTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYXBvbkluZm8gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlYXBvbkRhdGEgPSBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXR0cmlidXRlc2FkZGl0aW9uYWwod2VhcG9uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2VhcG9uQXRrICs9IHdlYXBvbkRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2VhcG9uRGVmZW5jZSArPSB3ZWFwb25EYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFdlYXBvbkhwICs9IHdlYXBvbkRhdGFbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWRveS4reWAvFxyXG4gICAgICAgIGxvY2FsSEQuSGl0ID0gYXR0cmlidXRlRGF0YS5IaXQgKyBwZXRIaXQ7XHJcbiAgICAgICAgLy8g6Zeq6YG/5YC8XHJcbiAgICAgICAgbG9jYWxIRC5NaXNzID0gYXR0cmlidXRlRGF0YS5NaXNzICsgcGV0TWlzcztcclxuICAgICAgICAvLyDmmrTlh7vlgLxcclxuICAgICAgICBsb2NhbEhELkNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5Dcml0aWNhbCArIHBldENyaXRpY2FsO1xyXG4gICAgICAgIC8vIOmYsueIhuWAvFxyXG4gICAgICAgIGxvY2FsSEQuQW50aUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpQ3JpdGljYWwgKyBwZXRBbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgLy8g5pq05Ye75aKe5bmFXHJcbiAgICAgICAgbG9jYWxIRC5FeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5FeHRyYUNyaXRpY2FsICsgcGV0RXh0cmFDcml0aWNhbDtcclxuICAgICAgICAvLyDmmrTlh7vmipfmgKdcclxuICAgICAgICBsb2NhbEhELkFudGlFeHRyYUNyaXRpY2FsID0gYXR0cmlidXRlRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArIHBldEFudGlFeHRyYUNyaXRpY2FsO1xyXG5cclxuICAgICAgICAvLyDmlLvpgJ9cclxuICAgICAgICBsZXQgSEJJTSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsb2NhbEhELmJhc2VfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfamlhbmdlID0gMS9IQklNLmdldEJhc2VTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5idWxsZXRfc3BlZWQgPSBIQklNLmdldEJhc2VCdWxsZXRTcGVlZChoZXJvVHlwZSk7XHJcbiAgICAgICAgbG9jYWxIRC5nb25namlfZmFud2VpID0gSEJJTS5nZXRBdHRhY2tSYW5nZShoZXJvVHlwZSk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyAtLeaAu+WAvFxyXG4gICAgICAgIGxvY2FsSEQuQXR0YWNrID0gbG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrICsgYWxsV2VhcG9uQXRrICsgcGV0QXRrO1xyXG4gICAgICAgIGxvY2FsSEQuSGVhbHRoID0gbG9jYWxIRC50b3RhbF9ocCA9IGxvY2FsSEQuZml4ZWRfaHAgKyBhbGxXZWFwb25IcCArIHBldEhlYWx0aDtcclxuICAgICAgICBsb2NhbEhELkRlZmVuc2UgPSBsb2NhbEhELnRvdGFsX2RlZmVuc2UgPSBsb2NhbEhELmZpeF9kZWZlbnNlICsgYWxsV2VhcG9uRGVmZW5jZSArIHBldERlZmVuY2U7XHJcblxyXG4gICAgICAgIC8vIC0t5oC75YC8XHJcbiAgICAgICAgLy8gbG9jYWxIRC5BdHRhY2s9bG9jYWxIRC50b3RhbF9hdHRhY2sgPSBsb2NhbEhELmZpeGVkX2F0dGNrIDtcclxuICAgICAgICAvLyBsb2NhbEhELkhlYWx0aD1sb2NhbEhELnRvdGFsX2hwID0gbG9jYWxIRC5maXhlZF9ocCA7XHJcbiAgICAgICAgLy8gbG9jYWxIRC5EZWZlbnNlPWxvY2FsSEQudG90YWxfZGVmZW5zZSA9IGxvY2FsSEQuZml4X2RlZmVuc2UgO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZSxzdGFnZSkgKyAxO1xyXG5cclxuICAgICAgICBsb2NhbEhELkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeD1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbG9jYWxIRC5Ta2lsbFZhbHVlX3k9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGxvY2FsSEQuU2tpbGxWYWx1ZV96PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7ICBcclxuXHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTQ7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Ta2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU2tpbGxQb3NBbmRTa2lsbExldmVsKGhlcm9UeXBlLHMsc3Rhcik7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfeS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfei5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBsb2NhbEhELlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBsb2NhbEhELkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaGVyb19kYXRhLnNldChoZXJvVHlwZSxsb2NhbEhEKTtcclxuICAgICAgICByZXR1cm4gbG9jYWxIRDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9EYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZXBIZXJvRGF0YShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9EYXRhe1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpO1xyXG4gICAgICAgIGRhdGEudG90YWxfYXR0YWNrID0gdGVtcC50b3RhbF9hdHRhY2s7XHJcbiAgICAgICAgZGF0YS50b3RhbF9kZWZlbnNlID0gdGVtcC50b3RhbF9kZWZlbnNlO1xyXG4gICAgICAgIGRhdGEudG90YWxfaHAgPSB0ZW1wLnRvdGFsX2hwO1xyXG4gICAgICAgIGRhdGEuSGl0ID0gdGVtcC5IaXQ7XHJcbiAgICAgICAgZGF0YS5NaXNzID0gdGVtcC5NaXNzO1xyXG4gICAgICAgIGRhdGEuQ3JpdGljYWwgPSB0ZW1wLkNyaXRpY2FsO1xyXG4gICAgICAgIGRhdGEuQW50aUNyaXRpY2FsID0gdGVtcC5BbnRpQ3JpdGljYWw7XHJcbiAgICAgICAgZGF0YS5FeHRyYUNyaXRpY2FsID0gdGVtcC5FeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIGRhdGEuQW50aUV4dHJhQ3JpdGljYWwgPSB0ZW1wLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUJpbmRQZXQoaGVyb1R5cGU6SGVyb19UeXBlLHBldEluZm86UGV0SW5mbyl7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX2RhdGEuZ2V0KGhlcm9UeXBlKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSkucGV0X2luZm89cGV0SW5mbztcclxuICAgICAgICAgICAgLy90aGlzLmhlcm9fZGF0YS5nZXQoaGVyb1R5cGUpLnBldF9pbmZvLnNlcXVlbmNlX2lkPTEyMztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoSGVyb0RhdGEoaGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZEhlcm9EYXRhKGhlcm9UeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5oiY5YqbXHJcbiAgICBnZXRBbGxIZXJvWmhhbmxpKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT0wO1xyXG4gICAgICAgIGxldCBsaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtKz1NYXRoLmZsb29yKHRoaXMuZ2V0SGVyb1poYW5saShsaXN0W2ldLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9aaGFubGkoaGVyb1R5cGU6SGVyb19UeXBlKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hIZXJvRGF0YShoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhPXRoaXMuaGVyb19kYXRhLmdldChoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IHpoYW5saSA9IGhlcm9EYXRhLnRvdGFsX2hwICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDEpIFxyXG4gICAgICAgICsgaGVyb0RhdGEudG90YWxfYXR0YWNrICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDIpXHJcbiAgICAgICAgKyBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDMpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5IaXQgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNClcclxuICAgICAgICArIGhlcm9EYXRhLk1pc3MgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNSlcclxuICAgICAgICArIChoZXJvRGF0YS5Dcml0aWNhbCAtIDEwMCkgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNilcclxuICAgICAgICArIGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig3KVxyXG4gICAgICAgICsgKGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwgLSAyKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig4KVxyXG4gICAgICAgICsgaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoOSlcclxuICAgICAgICByZXR1cm4gemhhbmxpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhcmdldEhlcm9aaGFubGkoaGVyb1R5cGU6SGVyb19UeXBlLHN0YWdlOm51bWJlcixsZXZlbDpudW1iZXIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBoZXJvRGF0YT10aGlzLmdldFRhcmdldEhlcm9EYXRhKGhlcm9UeXBlLHN0YWdlLGxldmVsKTtcclxuICAgICAgICBsZXQgemhhbmxpID0gaGVyb0RhdGEudG90YWxfaHAgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgKyBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMilcclxuICAgICAgICArIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMylcclxuICAgICAgICArIGhlcm9EYXRhLkhpdCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig0KVxyXG4gICAgICAgICsgaGVyb0RhdGEuTWlzcyAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig1KVxyXG4gICAgICAgICsgKGhlcm9EYXRhLkNyaXRpY2FsIC0gMTAwKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig2KVxyXG4gICAgICAgICsgaGVyb0RhdGEuQW50aUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDcpXHJcbiAgICAgICAgKyAoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCAtIDIpICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDgpXHJcbiAgICAgICAgKyBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig5KVxyXG4gICAgICAgIHJldHVybiB6aGFubGk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3RGF5WmhhbmxpKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5X3poYW5saV8nKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09dGhpcy5nZXRBbGxIZXJvWmhhbmxpKCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRIZXJvSXNOZWVkVGlwKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBpc1RpcD1mYWxzZTtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVyb19nZXRfdGlwXycraGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzVGlwPXRydWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzVGlwPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNUaXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldEhlcm9Jc05lZWRUaXAoaGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGVyb19nZXRfdGlwXycraGVyb1R5cGUsMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFNraW5JbmRleCh0aWVyOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHN3aXRjaCh0aWVyKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiA3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDojrflvpfkuIDkuKrkuIrpmLXnmoTpmo/mnLroi7Hpm4RcclxuICAgICogQHBhcmFtIG1vZGUg5ri45oiP5qih5byPXHJcbiAgICAqIEBwYXJhbSBleElkIOaOkumZpOeahGlkXHJcbiAgICAqIEByZXR1cm5zIOmZpGV4SWTkuYvlpJbnmoRpZFxyXG4gICAgKi9cclxuICAgIGdldFJhbmRIZXJvSWQobW9kZTpHYW1lTW9kZSxleElkOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTCx0ZWFtTGlzdD86bnVtYmVyW10pOkhlcm9fVHlwZXtcclxuICAgICAgICAvL+maj+acuuiLsembhFxyXG4gICAgICAgIGlmKCF0ZWFtTGlzdClcclxuICAgICAgICB0ZWFtTGlzdD10aGlzLmdldFRlYW1MaXN0KG1vZGUpO1xyXG4gICAgICAgIGxldCByYW5kTGlzdD1bXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0ZWFtTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZD10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaWQ+SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaWQhPWV4SWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRMaXN0LnB1c2godGVhbUxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVyb0lkPTA7XHJcbiAgICAgICAgaWYocmFuZExpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBoZXJvSWQ9cmFuZExpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJhbmRMaXN0Lmxlbmd0aCldO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgcmV0dXJuIGhlcm9JZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiotLS0tLS0tLS0tLS0tLS0t6KOF5aSHLS0tLS0tLS0tLS0tLS0tLS0tLSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiDnqb/miLTkuIDkuKroo4XlpIcsZXF1aXBJZOS4ujDml7bvvIzor7fliqHlv4XmioplcXVpcFR5cGXlhpnkuIpcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZCAgICAgXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBJZCDoo4XlpIdpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwVHlwZSDoo4XlpIfkvY1cclxuICAgICAqL1xyXG4gICAgYWRkV2VhckVxdWlwbWVudChoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBJZDpudW1iZXIsZXF1aXBUeXBlPzpFcXVpcFR5cGUpe1xyXG4gICAgICAgIGlmKCFlcXVpcFR5cGUpe1xyXG4gICAgICAgICAgICBlcXVpcFR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKGVxdWlwSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mcgOimgemBjeWOhuijheWkh+WIl+ihqO+8jOiOt+WPlmhlcm9fdHlwZeWPmOmHj1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5Li65Lu75oSPWOWQjeiLsembhOepv+aItDHku7boo4XlpIcpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpW1wid2VhclwiK2VxdWlwVHlwZV09ZXF1aXBJZDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjkuIvkuIDkuKroo4XlpIdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwUG9zIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgdW5sb2FkV2VhckVxdWlwbWVudChoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBUeXBlOkVxdWlwVHlwZSl7XHJcbiAgICAgICAgLy/pnIDopoHpgY3ljoboo4XlpIfliJfooajvvIzojrflj5ZoZXJvX3R5cGXlj5jph49cclxuICAgICAgICB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKVtcIndlYXJcIitlcXVpcFR5cGVdPTA7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkVRVUlQX1dFQVJfVU5MT0FEKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+ato+WcqOijheWkh+eahOijheWkh2lkICovXHJcbiAgICBnZXRXZWFyRXF1aXBtZW50KGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcFR5cGU6RXF1aXBUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpW1wid2VhclwiK2VxdWlwVHlwZV07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bliankvZnnmoToo4XlpIfmlbDph48gKi9cclxuICAgIGdldEVxdWlwbWVudFJlbWFpbk51bShlcXVpcEluZm86RXF1aXBJbmZvKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1lcXVpcEluZm8uZXF1aXBfbnVtO1xyXG4gICAgICAgIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbihlcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBoZXJvTGlzdD10aGlzLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihoZXJvTGlzdFtpXVtcIndlYXJcIit0eXBlXT09ZXF1aXBJbmZvLmVxdWlwX2lkKXtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bkuIDkuKroo4XlpIdpZOiiq+ijheWkh+eahOiLsembhOWIl+ihqCAqL1xyXG4gICAgZ2V0V2VhckVxdWlwbWVudEhlcm9MaXN0KGVxdWlwSW5mbzpFcXVpcEluZm8pOkhlcm9fVHlwZVtde1xyXG4gICAgICAgIGxldCBsaXN0PVtdO1xyXG4gICAgICAgIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbihlcXVpcEluZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBoZXJvTGlzdD10aGlzLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaGVyb0luZm89aGVyb0xpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKGhlcm9JbmZvW1wid2VhclwiK3R5cGVdPT1lcXVpcEluZm8uZXF1aXBfaWQpe1xyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGhlcm9JbmZvLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lrqDniaktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog56m/5oi05LiA5Liq5a6g54mpLGVxdWlwSWTkuLow5pe277yM6K+35Yqh5b+F5oqKZXF1aXBUeXBl5YaZ5LiKXHJcbiAgICAgKiBAcGFyYW0gaGVyb1R5cGUg6Iux6ZuEaWQgICAgIFxyXG4gICAgICogQHBhcmFtIHBldElkIOijheWkh2lkXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBUeXBlIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgYWRkV2VhclBldChoZXJvVHlwZTpIZXJvX1R5cGUscGV0SWQ6bnVtYmVyKXtcclxuICAgICAgICAvL+mcgOimgemBjeWOhuijheWkh+WIl+ihqO+8jOiOt+WPlmhlcm9fdHlwZeWPmOmHj1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5Li65Lu75oSPWOWQjeiLsembhOepv+aItDHku7boo4XlpIcpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpLnBldF9pZD1wZXRJZDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuRVFVSVBfV0VBUl9VTkxPQUQpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUhlcm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjkuIvkuIDkuKroo4XlpIdcclxuICAgICAqIEBwYXJhbSBoZXJvVHlwZSDoi7Hpm4RpZFxyXG4gICAgICogQHBhcmFtIGVxdWlwUG9zIOijheWkh+S9jVxyXG4gICAgICovXHJcbiAgICAgdW5sb2FkV2VhclBldChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG4gICAgICAgIC8v6ZyA6KaB6YGN5Y6G6KOF5aSH5YiX6KGo77yM6I635Y+WaGVyb190eXBl5Y+Y6YePXHJcbiAgICAgICAgdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSkucGV0X2lkPTA7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkVRVUlQX1dFQVJfVU5MT0FEKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+ato+WcqOijheWkh+eahOijheWkh2lkICovXHJcbiAgICBnZXRXZWFyUGV0KGhlcm9UeXBlOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKS5wZXRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5Ymp5L2Z55qE6KOF5aSH5pWw6YePICovXHJcbiAgICBnZXRQZXRSZW1haW5OdW0ocGV0SW5mbzpQZXRNZXNzYWdlKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1wZXRJbmZvLnBldF9udW07XHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHBldEluZm8ucGV0X2lkKTtcclxuICAgICAgICBsZXQgaGVyb0xpc3Q9dGhpcy5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaGVyb0xpc3RbaV1bXCJ3ZWFyXCIrdHlwZV09PXBldEluZm8ucGV0X2lkKXtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bkuIDkuKroo4XlpIdpZOiiq+ijheWkh+eahOiLsembhOWIl+ihqCAqL1xyXG4gICAgZ2V0V2VhclBldEhlcm9MaXN0KHBldEluZm86UGV0TWVzc2FnZSk6SGVyb19UeXBlW117XHJcbiAgICAgICAgbGV0IGxpc3Q9W107XHJcbiAgICAgICAgbGV0IGhlcm9MaXN0PXRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSW5mbz1oZXJvTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaGVyb0luZm8ucGV0X2lkPT1wZXRJbmZvLnBldF9pZCl7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goaGVyb0luZm8uaGVyb190eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmo4Dmn6XmmK/lkKblj6/ku6XljYfnuqcgKi9cclxuICAgIGNoZWNrVXBncmFkZShoZXJvVHlwZTpIZXJvX1R5cGUpOkhlcm9VcGdyYWRlRGF0YXtcclxuICAgICAgICAvLyBsZXQgaGVyb1F1YWxpdHkgPSB0aGlzLmdldEhlcm9RdWFsaXR5KGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgdXBEYXRhID0gbmV3IEhlcm9VcGdyYWRlRGF0YSgpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKSA9PSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb1R5cGUpKSByZXR1cm4gdXBEYXRhXHJcbiAgICAgICAgbGV0IGNvaW5IYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKTtcclxuICAgICAgICBsZXQgY29pbk5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RDb2luKHRoaXMuZ2V0SGVyb0xldmVsKGhlcm9UeXBlKSk7XHJcbiAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgbGV0IGdlbU5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RHZW0odGhpcy5nZXRIZXJvTGV2ZWwoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgZmluaXNoTGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG5lZWRGaW5pc2hMZXZlbCA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxMaW1pdCh0aGlzLmdldEhlcm9MZXZlbChoZXJvVHlwZSkpO1xyXG4gICAgICAgIC8vIOWNh+e6p+aMiemSrue9rueBsO+8jOS8mOWFiOWFs+WNoee9rueBsCjljbPlnKjph5HluIHotrPlpJ/nmoTmg4XlhrXkuIvvvIzpgJrov4flhbPljaHmsqHovr7liLDopoHmsYLliJnmjInpkq7nva7ngbAp44CCXHJcbiAgICAgICAgLy8g5aaC5p6c5piv5Lul5Li66YeR5biB5LiN6Laz572u54Gw5YiZ54K55Ye75Y2H57qn5oyJ6ZKu5by55Ye66LWE5rqQ5LiN6Laz5by556qX77yM5aaC5p6c5piv5YWz5Y2h6ZmQ5Yi2572u54Gw77yM54K55Ye75Y2H57qn5oyJ6ZKu5YiZ5o+Q56S66YCa6L+H5YWz5Y2h5LiN6Laz6aOY5a2X5o+Q6YaSXHJcbiAgICAgICAgdXBEYXRhLmlzX2Nhbl91cD1jb2luSGF2ZU51bT49Y29pbk5lZWROdW0gJiYgZmluaXNoTGV2ZWw+PW5lZWRGaW5pc2hMZXZlbCAmJiBnZW1IYXZlTnVtID49IGdlbU5lZWROdW07XHJcbiAgICAgICAgcmV0dXJuIHVwRGF0YTtcclxuICAgIH1cclxuICAgIC8qKuajgOafpeaYr+WQpuWPr+S7peWNh+aYnyAqL1xyXG4gICAgY2hlY2tVcFN0YXIoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBoZXJvSW5mbz10aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpZighaGVyb0luZm8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjdXJTdGFnZT10aGlzLmdldEhlcm9TdGFnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudChoZXJvVHlwZSkpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZSh0aGlzLmdldEhlcm9RdWFsaXR5KGhlcm9UeXBlKSxjdXJTdGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGhhdmVOdW0gPj0gbmVlZE51bSAmJiBjdXJTdGFnZTxIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb1R5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoq5qOA5p+l5piv5ZCm5Y+v5Lul5L2/55So5LiH6IO956KO54mHICovXHJcbiAgICBjaGVja0FsbFB1cnBvc2VGcmFnbWVudChoZXJvVHlwZTpIZXJvX1R5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvPXRoaXMuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIGlmKCFoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1clN0YWdlPXRoaXMuZ2V0SGVyb1N0YWdlKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KGhlcm9UeXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKHRoaXMuZ2V0SGVyb1F1YWxpdHkoaGVyb1R5cGUpLGN1clN0YWdlKTtcclxuICAgICAgICBsZXQgb2Zmc2V0TnVtPW5lZWROdW0taGF2ZU51bTtcclxuICAgICAgICByZXR1cm4gaGF2ZU51bSA8IG5lZWROdW0gJiYgY3VyU3RhZ2U8SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9UeXBlKSAmJiBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5nZXRIZXJvRnJhZ21lbnRJZChoZXJvVHlwZSkpPj1vZmZzZXROdW07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb0ZyYWdtZW50SWQoaGVyb0lkOkhlcm9fVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIC8v5ZOB6LSoXHJcbiAgICAgICAgbGV0IHF1YWxpdHk9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoaGVyb0lkKTtcclxuICAgICAgICByZXR1cm4gMTAxMDAwK3F1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmo4DmtYvoi7Hpm4TmmK/lkKblj6/ku6Xop6PplIEgKi9cclxuICAgIGNoZWNrVW5sb2NrKGhlcm9UeXBlOkhlcm9fVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgaGVyb0luZm89dGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoaGVyb0luZm8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQoaGVyb1R5cGUpKTtcclxuICAgICAgICBsZXQgbmVlZE51bSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tGcmFnbWVudE51bShoZXJvVHlwZSk7XHJcbiAgICAgICAgaWYoaGF2ZU51bT49bmVlZE51bSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TnVtPW5lZWROdW0taGF2ZU51bTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmdldEhlcm9GcmFnbWVudElkKGhlcm9UeXBlKSk+PW9mZnNldE51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0V4VXAoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBoZXJvSW5mbz10aGlzLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICBpZihoZXJvSW5mbyl7XHJcbiAgICAgICAgICAgIGxldCBld1Nob3dEYXRhID0gRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRXhjbHVzaXZlV2VhcG9uTWVzc2FnZShoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIGlmKGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA+PSBld1Nob3dEYXRhLk1heFN0YWdlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbmVlZE51bSA9IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0luZm8uaGVyb19xdWFsaXR5KTtcclxuICAgICAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIGhhdmVOdW0+PW5lZWROdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEV4Y2x1c2l2ZVdlYXBvbkRhdGEoaGVyb1R5cGU6SGVyb19UeXBlLHN0YWdlOm51bWJlcik6SGVyb0RhdGF7XHJcbiAgICAgICAgbGV0IGluZm8gPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmdldEhlcm9EYXRhKGhlcm9UeXBlKTtcclxuICAgICAgICBsZXQgZXhEYXRhID0gRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGUsc3RhZ2UpO1xyXG5cclxuICAgICAgICBpZihleERhdGEgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGluZm8udG90YWxfaHAgPSBoZXJvRGF0YS5maXhlZF9ocCAqIGV4RGF0YS5IZWFsdGg7XHJcbiAgICAgICAgaW5mby50b3RhbF9hdHRhY2sgPSBoZXJvRGF0YS5maXhlZF9hdHRjayAqIGV4RGF0YS5BdHRhY2s7XHJcbiAgICAgICAgaW5mby50b3RhbF9kZWZlbnNlID0gaGVyb0RhdGEuZml4X2RlZmVuc2UgKiBleERhdGEuRGVmZW5zZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXhjbHVzaXZlV2VhcG9uQ29tYmJhdChoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgbGV0IGV4RGF0YSA9IHRoaXMuZ2V0RXhjbHVzaXZlV2VhcG9uRGF0YShoZXJvVHlwZSxzdGFnZSk7XHJcblxyXG4gICAgICAgIGlmKGV4RGF0YSE9IG51bGwpe1xyXG4gICAgICAgICAgICBudW0gPSBleERhdGEudG90YWxfaHAgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgICAgICsgZXhEYXRhLnRvdGFsX2F0dGFjayAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigyKVxyXG4gICAgICAgICAgICArIGV4RGF0YS50b3RhbF9kZWZlbnNlICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOa1i+S4k+atpuiDveWQpuWNh+e6pyAqL1xyXG4gICAgY2hlY2tFeGNsdXNpdmUoaGVyb1R5cGU6SGVyb19UeXBlKTpIZXJvRXhjbHVzaXZlRGF0YXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSGVyb0V4Y2x1c2l2ZURhdGEoKTtcclxuICAgICAgICAvLyBsZXQgd2VhcG9uRGF0YSA9IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25CeUhlcm9UeXBlQW5kV2VhcG9uTGV2ZWwoaGVyb1R5cGUsdGhpcy5nZXRIZXJvSW5mbyhoZXJvVHlwZSkuZXhjbHVzaXZlX2VxdWlwX2xldmVsKTtcclxuICAgICAgICAvLyBkYXRhLmNvc3RfcHJvcF9pZD13ZWFwb25EYXRhLlNwZW5kUHJvcElEXHJcbiAgICAgICAgLy8gZGF0YS5jdXJfcHJvcF9udW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGRhdGEuY29zdF9wcm9wX2lkKTtcclxuICAgICAgICAvLyBkYXRhLmNvc3RfcHJvcF9udW09d2VhcG9uRGF0YS5TcGVuZFByb3BOdW07XHJcbiAgICAgICAgLy8gZGF0YS5pc19jYW5fdXA9ZGF0YS5jdXJfcHJvcF9udW0+PWRhdGEuY29zdF9wcm9wX251bTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIC8qKumAmui/h+e6oueCueexu+Wei+iOt+WPluiLsembhOexu+WeiyAqL1xyXG4gICAgc3RhdGljIGdldEhlcm9UeXBlQnlSZWRUeXBlKHJlZFR5cGU6UmVkRXZlbnRUeXBlKTpIZXJvX1R5cGV7XHJcbiAgICAgICAgbGV0IGhlcm9UeXBlPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAgICAgc3dpdGNoKHJlZFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE6aGVyb1R5cGU9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMjpoZXJvVHlwZT1IZXJvX1R5cGUuU2hvdVdhbmc7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzM6aGVyb1R5cGU9SGVyb19UeXBlLlBhb1Nob3U7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzQ6aGVyb1R5cGU9SGVyb19UeXBlLkRlTHVZaTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNTpoZXJvVHlwZT1IZXJvX1R5cGUuS3VhbmdaaGFuU2hpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF82Omhlcm9UeXBlPUhlcm9fVHlwZS5aaGVuRGU7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzc6aGVyb1R5cGU9SGVyb19UeXBlLk52V3U7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzg6aGVyb1R5cGU9SGVyb19UeXBlLkdvbmdKaWFuU2hvdTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfOTpoZXJvVHlwZT1IZXJvX1R5cGUuQmluZ052OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMDpoZXJvVHlwZT1IZXJvX1R5cGUuQU51QmlTaTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTE6aGVyb1R5cGU9SGVyb19UeXBlLk1laU1vOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xMjpoZXJvVHlwZT1IZXJvX1R5cGUuTGVpU2hlbjsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirpgJrov4fnuqLngrnnsbvlnovojrflj5boi7Hpm4TnsbvlnosgKi9cclxuICAgIHN0YXRpYyBnZXRSZWRUeXBlQnlIZXJvVHlwZShoZXJvVHlwZTpIZXJvX1R5cGUpOlJlZEV2ZW50VHlwZXtcclxuICAgICAgICBsZXQgcmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF8xO1xyXG4gICAgICAgIHN3aXRjaChoZXJvVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkNoYW5nTWFvU2hvdTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzE7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5TaG91V2FuZzpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzI7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5QYW9TaG91OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkRlTHVZaTpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzQ7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5LdWFuZ1poYW5TaGk6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF81OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuWmhlbkRlOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfNjsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLk52V3U6cmVkVHlwZT1SZWRFdmVudFR5cGUuQnRuX1JvbGVfTGlzdF83OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuR29uZ0ppYW5TaG91OnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfODsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19UeXBlLkJpbmdOdjpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0Xzk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5BTnVCaVNpOnJlZFR5cGU9UmVkRXZlbnRUeXBlLkJ0bl9Sb2xlX0xpc3RfMTA7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fVHlwZS5NZWlNbzpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzExOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1R5cGUuTGVpU2hlbjpyZWRUeXBlPVJlZEV2ZW50VHlwZS5CdG5fUm9sZV9MaXN0XzEyOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlZFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRIZXJvTGlzdEpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRIZXJvTGlzdEpzb25TdHJpbmcoaGVyb0RhdGFzOkhlcm9PYmplY3RbXSk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICBoZXJvTGlzdDpoZXJvRGF0YXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19