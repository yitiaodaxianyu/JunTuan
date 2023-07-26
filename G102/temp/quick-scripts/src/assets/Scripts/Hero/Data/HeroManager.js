"use strict";
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