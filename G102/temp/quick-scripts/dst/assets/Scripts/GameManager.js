
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91f98a7VVdOw4dP/bHemejR', 'GameManager');
// Scripts/GameManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var Home_1 = require("./Home");
var Hint_1 = require("./Hint");
var GetTip_1 = require("./UI/GetTip");
var Dialog_1 = require("./UI/Dialog");
var FollowManager_1 = require("./multiLanguage/FollowManager");
var FollowConstants_1 = require("./multiLanguage/FollowConstants");
var LocalVideo_1 = require("./LocalVideo");
var HeroData_1 = require("./Hero/Data/HeroData");
var UnlockSkill_1 = require("./UI/UnlockSkill");
var ZhenXingData_1 = require("./ZhenXingData");
var TutorailsManager_1 = require("./Tutorials/TutorailsManager");
var HeroManager_1 = require("./Hero/Data/HeroManager");
var LevelManager_1 = require("./Level/LevelManager");
var MissionLevel_1 = require("./Level/MissionLevel");
var EndlessLevels_1 = require("./Activity/EndlessLevels");
var BossManager_1 = require("./Boss/BossManager");
var BossChallenge_1 = require("./Activity/BossChallenge");
var TowerLevel_1 = require("./Tower/TowerLevel");
var TowerManager_1 = require("./Tower/TowerManager");
var MonsterConfigure_1 = require("./Monster/Data/MonsterConfigure");
var MonsterData_1 = require("./Monster/MonsterData");
var MonsterManager_1 = require("./Monster/MonsterManager");
var UIManager_1 = require("./UI/UIManager");
var Pet_1 = require("./Pet/Game/Pet");
var MazeManager_1 = require("./Maze/MazeManager");
var GameEffectsManager_1 = require("./Game/GameEffectsManager");
var StorageManager_1 = require("./Storage/StorageManager");
var StorageConfig_1 = require("./Storage/StorageConfig");
var Hero_1 = require("./Hero/Game/Hero");
var HeroConfig_1 = require("./Hero/Game/HeroConfig");
var GuaJiGift_1 = require("./GuaJi/Ui/GuaJiGift");
var UIConfig_1 = require("./UI/UIConfig");
var GameWin_1 = require("./Game/Ui/GameWin");
var TutorialLevel_1 = require("./Level/TutorialLevel");
var AudioConstants_1 = require("./Sound/AudioConstants");
var WallManager_1 = require("./Wall/WallManager");
var WallConfig_1 = require("./Wall/WallConfig");
var BuffDisplay_1 = require("./copy/endlesschallenges/BuffDisplay");
var HeroBaseInfo_1 = require("./Hero/Data/HeroBaseInfo");
var EquipmentAttribute_1 = require("./Equipment/Data/EquipmentAttribute");
var ExclusiveWeaponMessage_1 = require("./JsonData/ExclusiveWeaponMessage");
var RewardSSUi_1 = require("./Tutorials/RewardSSUi");
var ccclass = cc._decorator.ccclass;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_hint = null;
        _this.prefab_get_tip = null;
        //-----------------------------HOME-------------------------------
        _this.role_show_hero = HeroConfig_1.Hero_Type.ChangMaoShou;
        //-----------------------------Game-------------------------------
        //各种管理器
        _this.game = null;
        _this.enemy_hp_manager = null;
        _this.hp_text_manager = null;
        _this.chu_sheng_dian = null;
        //声音
        _this.sound_manager = null;
        _this.music_manager = null;
        //各大英雄的
        _this.all_hero = null;
        //DPS统计
        _this.hero_skill_dps = null;
        _this.hero_attack_dps = null;
        /**宠物主动技能造成的伤害 */
        _this.pet_active_dps = null;
        /**宠物连携技能造成的伤害 */
        _this.pet_connect_dps = null;
        _this.cur_game_state = Constants_1.GameState.Game_Ready;
        _this.cur_game_mode = Constants_1.GameMode.Main;
        _this.cur_game_scene = Constants_1.GameScene.home;
        //当前的加载进度
        _this.cur_load_progress = 0;
        //每个英雄获得的游戏内技能
        _this.ingame_skills = [];
        //开始的关卡的数据
        _this.cur_wave = 0;
        _this.fighting_info = null;
        //drop_data:DropData=null;
        _this.reward_data = [];
        _this.is_loaded = false;
        //掉落物品的怪物id
        //drop_enemy_type:number=0;
        _this.game_to_home = Constants_1.Go_Type.Main;
        _this.fuhuo_num = 1;
        _this.is_show_text = true;
        //最大的技能槽位
        _this.max_skill_slot = 2;
        //各个英雄数据，游戏内使用，关卡内buff。
        _this.game_hero_data = null;
        //第几个怪有可能爆星星buff
        //star_index:number=0;
        //
        /**当前总共的怪物数量 */
        _this.cur_total_num = 0;
        /**实际上已经生成出怪物的数量 */
        _this.cur_create_num = 0;
        _this.enemy_offset_y = 0;
        _this.enemy_att_y = -300;
        _this.enemy_create_y = 1080;
        _this.load_jishu = 0;
        _this.load_callback = null;
        _this.jishu_time = 0;
        //通关次数
        _this.pass_level_num = 0;
        /**游戏速率 */
        _this.game_rate = 1.5;
        /**按钮指定速率 */
        _this.btn_setup_rate = 1;
        /**战斗指定速率 */
        _this.fighting_setup_rate = 1;
        /**单次最高伤害值 */
        _this.max_damage = 0;
        /**单次最小伤害值 */
        _this.min_damage = 9999;
        /**自动战斗标识 */
        _this.auto_fighting = false;
        /**当前的队列 */
        _this.cur_team_list = [];
        //是否显示了退出游戏的对话框
        _this.is_show_exit = false;
        //动画位置
        _this.aniType = 4;
        //战车的位置x
        _this.charPosX = 0;
        return _this;
    }
    GameManager_1 = GameManager;
    //游戏动画存储数据
    // public moveData: Array<cc.Vec2> = [];
    GameManager.getInstance = function () {
        return this._instance;
    };
    GameManager.prototype.onLoad = function () {
        console.log("gameLoaderon");
        cc.game.addPersistRootNode(this.node);
        GameManager_1._instance = this;
    };
    //初始化游戏数据
    GameManager.prototype.init = function (scene) {
        this.unscheduleAllCallbacks();
        this.cur_game_scene = scene;
        this.is_loaded = false;
        this.aniType = 4;
        switch (this.cur_game_scene) {
            case Constants_1.GameScene.home:
                {
                    this.cur_load_progress = 0;
                    this.is_loaded = true;
                    this.exitPlayGame();
                    //this.role_show_hero=Hero_Type.SheShou;
                }
                break;
            case Constants_1.GameScene.game:
                {
                    this.game_to_home = Constants_1.Go_Type.Main;
                    this.cur_game_state = Constants_1.GameState.Game_Ready;
                    this.all_hero = new Map();
                    this.hero_attack_dps = null;
                    this.hero_skill_dps = null;
                    this.cur_total_num = this.cur_create_num = 0;
                    this.cur_wave = 0;
                    this.ingame_skills = new Array();
                    this.reward_data = new Array();
                    this.fuhuo_num = 1;
                    this.auto_fighting = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.AutoFighting) > 0;
                    this.loadLevel();
                    this.loadGameHeroData();
                }
                break;
            default:
                this.cur_load_progress = 0;
                break;
        }
        this.loadTip();
    };
    GameManager.prototype.setBtnSetupRate = function (rate, isActivity) {
        if (isActivity === void 0) { isActivity = true; }
        this.btn_setup_rate = rate;
        this.setGameRate(1);
        if (isActivity) {
            if (rate == 2) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.二倍速开启成功次数);
            }
            else {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.二倍速关闭成功次数);
            }
        }
    };
    GameManager.prototype.setAutoFighting = function (isAuto, isActivity) {
        if (isActivity === void 0) { isActivity = true; }
        this.auto_fighting = isAuto;
        if (isActivity) {
            if (isAuto) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.自动战斗开启成功次数);
            }
            else {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.自动战斗关闭成功次数);
            }
        }
    };
    GameManager.prototype.getBtnSetupRate = function () {
        return this.btn_setup_rate;
    };
    GameManager.prototype.setFightingRate = function (rate) {
        this.fighting_setup_rate = rate;
        this.setGameRate(1);
    };
    GameManager.prototype.setGameRate = function (rate) {
        //this.game_rate = rate * this.btn_setup_rate * this.fighting_setup_rate;
        cc.kSpeed(this.game_rate);
    };
    GameManager.prototype.getGameRate = function () {
        return this.game_rate;
    };
    GameManager.prototype.resetRate = function () {
        this.game_rate = 1;
        cc.kSpeed(this.game_rate);
    };
    GameManager.prototype.setMaxDamage = function (num) {
        if (num > this.max_damage) {
            this.max_damage = num;
        }
    };
    GameManager.prototype.getMaxDamage = function () {
        return this.max_damage;
    };
    GameManager.prototype.setMinDamage = function (num) {
        if (num < this.min_damage) {
            this.min_damage = num;
        }
    };
    GameManager.prototype.getMinDamage = function () {
        return this.min_damage;
    };
    GameManager.prototype.getDamageTextScale = function (damage) {
        var maxScale = 1.4;
        var scaleValue = 1;
        var rate = damage / this.getMaxDamage();
        scaleValue = rate * maxScale;
        if (scaleValue < 1) {
            scaleValue = 1;
        }
        if (scaleValue > maxScale) {
            scaleValue = maxScale;
        }
        return scaleValue;
    };
    GameManager.prototype.getDamageTextEffect = function (damage) {
        var effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
        var rate = damage / this.getMaxDamage();
        if (rate < 0.2) {
            effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
        }
        else if (rate < 0.4) {
            effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_2;
        }
        else if (rate < 0.6) {
            effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_3;
        }
        else if (rate < 0.8) {
            effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_4;
        }
        else {
            effectId = GameEffectsManager_1.GameEffectId.front_normal_attack_text_5;
        }
        return effectId;
    };
    GameManager.prototype.getHero = function (heroId) {
        return this.all_hero.get(heroId);
    };
    GameManager.prototype.loadGameHeroData = function () {
        var isInitDps = false;
        if (this.cur_game_mode == Constants_1.GameMode.Main) {
            this.hero_skill_dps = new Array();
            this.hero_attack_dps = new Array();
        }
        else {
            if (!this.hero_attack_dps) {
                this.hero_skill_dps = new Array();
                this.hero_attack_dps = new Array();
                isInitDps = true;
            }
        }
        this.pet_active_dps = new Map();
        this.pet_connect_dps = new Map();
        this.game_hero_data = new Map();
        this.cur_team_list = HeroManager_1.HeroManager.getInstance().getTeamList(this.cur_game_mode);
        var fightingData = MazeManager_1.MazeManager.getInstance().refreshFightingData();
        //
        var mainWallData = new HeroConfig_1.AttributeData();
        for (var i = 0; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            if (this.cur_game_mode == Constants_1.GameMode.Main) {
                this.hero_skill_dps.push(0);
                this.hero_attack_dps.push(0);
            }
            else {
                if (isInitDps) {
                    this.hero_skill_dps.push(0);
                    this.hero_attack_dps.push(0);
                }
            }
            var heroData = new HeroData_1.HeroData();
            var homeHeroData = HeroManager_1.HeroManager.getInstance().getHeroData(i);
            if (homeHeroData) {
                heroData = cc.instantiate(homeHeroData);
                if (this.cur_team_list.includes(i)) {
                    //迷宫模式加成
                    if (this.cur_game_mode == Constants_1.GameMode.Maze) {
                        heroData.total_attack += (fightingData.AttackPer) * heroData.fixed_attck;
                        heroData.total_defense += (fightingData.DefensePer) * heroData.fix_defense;
                        heroData.Critical += fightingData.CriticalValue;
                        heroData.Hit += fightingData.HitValue;
                    }
                    mainWallData.Health += heroData.total_hp * 0.2;
                    mainWallData.Defense += heroData.total_defense * 0.2;
                    mainWallData.Miss += heroData.Miss * 0.2;
                    mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
                    mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
                    mainWallData.Attack += heroData.total_attack * 0.2;
                    mainWallData.Hit += heroData.Hit * 0.2;
                    this.pet_active_dps.set(heroData.pet_info, 0);
                    this.pet_connect_dps.set(heroData.pet_info, 0);
                    this.setMaxDamage(heroData.total_attack * heroData.ExtraCritical);
                    this.setMinDamage(heroData.total_attack);
                    this.game_hero_data.set(i, heroData);
                }
            }
        }
        WallManager_1.default.getInstance().getMainWall().startNextLevel();
        WallManager_1.default.getInstance().getMainWall().initWall(mainWallData, WallConfig_1.WallType.Main);
        // if(hp<3000){
        //     hp=3000;
        // }
        // if(defense<100){
        //     defense=100;
        // }
        //this.wall_data.initInheritData(hp,defense,miss,antiCritical,antiExtraCritical);
    };
    GameManager.prototype.loadTutorailsHeroData = function () {
        var isInitDps = false;
        if (this.cur_game_mode == Constants_1.GameMode.Main) {
            this.hero_skill_dps = new Array();
            this.hero_attack_dps = new Array();
        }
        else {
            if (!this.hero_attack_dps) {
                this.hero_skill_dps = new Array();
                this.hero_attack_dps = new Array();
                isInitDps = true;
            }
        }
        for (var i = 0; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            if (this.cur_game_mode == Constants_1.GameMode.Main) {
                this.hero_skill_dps.push(0);
                this.hero_attack_dps.push(0);
            }
            else {
                if (isInitDps) {
                    this.hero_skill_dps.push(0);
                    this.hero_attack_dps.push(0);
                }
            }
        }
        this.pet_active_dps = new Map();
        this.pet_connect_dps = new Map();
        this.game_hero_data = new Map();
        this.cur_team_list = [HeroConfig_1.Hero_Type.ShouWang, HeroConfig_1.Hero_Type.ANuBiSi, HeroConfig_1.Hero_Type.ZhenDe, HeroConfig_1.Hero_Type.MeiMo, HeroConfig_1.Hero_Type.LeiShen];
        var mainWallData = new HeroConfig_1.AttributeData();
        for (var i = 0; i < this.cur_team_list.length; i++) {
            var heroData = this.addTutotialsHeroFull(this.cur_team_list[i], i, null);
            mainWallData.Health += heroData.total_hp * 0.2;
            mainWallData.Defense += heroData.total_defense * 0.2;
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
            this.pet_active_dps.set(heroData.pet_info, 0);
            this.pet_connect_dps.set(heroData.pet_info, 0);
            this.setMaxDamage(heroData.total_attack * heroData.ExtraCritical);
            this.setMinDamage(heroData.total_attack);
            //this.game_hero_data.set(i,heroData);
        }
        WallManager_1.default.getInstance().getMainWall().startNextLevel();
        WallManager_1.default.getInstance().getMainWall().initWall(mainWallData, WallConfig_1.WallType.Main);
    };
    GameManager.prototype.refreshMainWallDataByaddHero = function () {
        var mainWallData = new HeroConfig_1.AttributeData();
        this.all_hero.forEach(function (v, k) {
            var heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2;
            mainWallData.Defense += heroData.total_defense * 0.2;
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
        });
        WallManager_1.default.getInstance().getMainWall().refreshWallDataByaddHero(mainWallData);
    };
    GameManager.prototype.refreshMainWallData = function () {
        var mainWallData = new HeroConfig_1.AttributeData();
        this.all_hero.forEach(function (v, k) {
            var heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2;
            mainWallData.Defense += heroData.total_defense * 0.2;
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
        });
        WallManager_1.default.getInstance().getMainWall().refreshWallData(mainWallData);
    };
    GameManager.prototype.loadTip = function () {
        var _this = this;
        if (!this.prefab_hint) {
            cc.resources.load('hint', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                _this.prefab_hint = assets;
            });
        }
        if (!this.prefab_get_tip) {
            cc.resources.load('get_tip', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                _this.prefab_get_tip = assets;
            });
        }
    };
    GameManager.prototype.showMessage = function (message, dt) {
        if (this.prefab_hint == null) {
            cc.resources.load('hint', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var hint = cc.instantiate(assets);
                hint.parent = cc.find('Canvas/Ui_Root');
                var hintJs = hint.getComponent(Hint_1.default);
                hintJs.showHintMessage(message, dt);
            });
        }
        else {
            var hint = cc.instantiate(this.prefab_hint);
            hint.parent = cc.find('Canvas/Ui_Root');
            var hintJs = hint.getComponent(Hint_1.default);
            hintJs.showHintMessage(message, dt);
        }
    };
    GameManager.prototype.showGetTip = function (getNode, callBack) {
        if (this.prefab_hint == null) {
            cc.resources.load('get_tip', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                node.getComponent(GetTip_1.default).addShowGetPorp(getNode, callBack);
            });
        }
        else {
            var node = cc.instantiate(this.prefab_get_tip);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(GetTip_1.default).addShowGetPorp(getNode, callBack);
        }
    };
    GameManager.prototype.showMultipleGetTip = function (getNodes, callBack) {
        if (this.prefab_hint == null) {
            cc.resources.load('get_tip', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                node.getComponent(GetTip_1.default).addMultiplePorp(getNodes, callBack);
            });
        }
        else {
            var node = cc.instantiate(this.prefab_get_tip);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(GetTip_1.default).addMultiplePorp(getNodes, callBack);
        }
    };
    GameManager.prototype.showDialog = function (message, yesCallback, noCallback, showType, y) {
        if (this.is_show_exit == true) {
            return;
        }
        this.is_show_exit = true;
        cc.resources.load('dialog', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(Dialog_1.default).showDialog(message, yesCallback, noCallback, showType, y);
            if (y) {
                node.y = y;
            }
        });
    };
    GameManager.prototype.showBuyDialog = function (message, yesCallback, noCallback, showType, y, currency) {
        cc.resources.load('dialog', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(Dialog_1.default).showDialog(message, yesCallback, noCallback, showType, y, currency);
            // if(y){
            //     node.y=y;
            // }
        });
    };
    GameManager.prototype.showLocalVideo = function (yesCallback, noCallback, isVideo) {
        cc.resources.load('video_dialog', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(LocalVideo_1.default).init(yesCallback, noCallback);
        });
    };
    //----------------------------------------------------GAME------------------------------------------------------------------------
    GameManager.prototype.startNextLevel = function () {
        this.unscheduleAllCallbacks();
        MonsterManager_1.default.getInstance().destroyAllDrop();
        MonsterManager_1.default.getInstance().destroyAllMonster();
        this.cur_wave = 0;
        this.cur_total_num = 0;
        switch (GameManager_1.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    if (!TutorailsManager_1.default.getInstance().is_finish_game) {
                        this.fighting_info = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
                    }
                    else {
                        this.fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
                    }
                    GameEffectsManager_1.GameEffectsManager.getInstance().removeAllEffect();
                    this.all_hero.forEach(function (v, k) {
                        v.resetState();
                    });
                    //数据
                    this.loadGameHeroData();
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    this.fighting_info = MazeManager_1.MazeManager.getInstance().getFightingInfo();
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    this.fighting_info = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(TowerManager_1.default.getTowerLevel());
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0); //波数
                    var Round = EndlessLevels_1.EndlessLevelsManager.getInstance().getRound(wavenumber); //回合数
                    // console.log("+++++++",Round)
                    this.fighting_info = EndlessLevels_1.EndlessLevelsManager.getInstance().getFightingInfo(Round);
                }
                break;
        }
        MonsterManager_1.default.getInstance().loadData();
        this.game.startNextLevel();
        this.cur_game_state = Constants_1.GameState.Game_Playing;
        this.setGameRate(1);
        this.scheduleOnce(this.loadLevel, 0.5);
        this.music_manager.resume();
    };
    //获取阵列类型
    GameManager.prototype.getZhengXingData = function () {
        var waveData = this.fighting_info[this.cur_wave];
        //解析阵型数据
        var zxData = new ZhenXingData_1.ZhenXingData();
        var allEnemyData = new Array();
        var MCM = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var i = 0; i < waveData.monster_num.length; i++) {
            var mId = waveData.monster_id[i];
            var jsonData = MCM.getJsonMonsterConfigure(mId);
            var enemyNum = waveData.monster_num[i];
            for (var n = 0; n < enemyNum; n++) {
                allEnemyData.push(jsonData);
            }
        }
        //二次处理，把boss跟buff怪放最前面
        allEnemyData.sort(function (a, b) {
            return b.StrengthType - a.StrengthType;
        });
        this.getZhenXingDataByEnemyData(allEnemyData, zxData, 0, 0);
        return zxData;
    };
    GameManager.prototype.getZhenXingDataByEnemyData = function (enemyDatas, out, buffNum, minY) {
        //阵型
        var zxType = Constants_1.Zheng_Xing_Type.ZX0;
        //随机一个阵型
        zxType = Math.floor(Math.random() * Constants_1.Zheng_Xing_Type.num);
        // if(IsDebug)
        // {
        //     zxType=Zheng_Xing_Type.箭头;
        // }
        var zxData = new ZhenXingData_1.ZhenXingData();
        //zxData=this.game.zhen_xing.json[zxType];
        var len = enemyDatas.length;
        var isNext = false;
        var otherNum = 0;
        var isHaveBoss = false;
        var ewaiNum = 0;
        for (var i = 0; i < len; i++) {
            if (enemyDatas[i].StrengthType == MonsterData_1.StrengthType.Boss) {
                isHaveBoss = true;
                break;
            }
        }
        for (var i = 0; i < len; i++) {
            if (i < (zxData.other_pos.length + ewaiNum)) {
                if (enemyDatas[i].StrengthType == MonsterData_1.StrengthType.Boss) {
                    //判断一下是否boss位置已经用了，如果用了代表这关有2个boss，需要把这个boss放到buff位置上
                    var pos = zxData.boss_pos;
                    var disPos = cc.v2(pos.x, pos.y + minY);
                    //如果之前没有设置boss位置                    
                    if (out.boss_pos.y == 0) {
                        out.boss_pos = disPos;
                        ewaiNum++;
                    }
                    else {
                        if (out.buff_pos.length < 4) {
                            var pos_1 = zxData.buff_pos[buffNum];
                            disPos = cc.v2(pos_1.x, pos_1.y + minY);
                            out.buff_pos.push(disPos);
                            ewaiNum++;
                            buffNum++;
                        }
                        else {
                            var pos_2 = zxData.other_pos[otherNum];
                            disPos = cc.v2(pos_2.x, pos_2.y + minY);
                            out.other_pos.push(disPos);
                            otherNum++;
                        }
                    }
                }
                else if (enemyDatas[i].StrengthType == MonsterData_1.StrengthType.Elite) {
                    if (out.buff_pos.length < 4) {
                        ewaiNum++;
                        //如果这波没有boss，并且有buff，则buff代替boss位置
                        if (isHaveBoss == false) {
                            var pos = zxData.boss_pos;
                            var disPos = cc.v2(pos.x, pos.y + minY);
                            out.buff_pos.push(disPos);
                            isHaveBoss = true;
                        }
                        else {
                            var pos = zxData.buff_pos[buffNum];
                            var disPos = cc.v2(pos.x, pos.y + minY);
                            out.buff_pos.push(disPos);
                            buffNum++;
                        }
                    }
                    else {
                        var pos = zxData.other_pos[otherNum];
                        var disPos = cc.v2(pos.x, pos.y + minY);
                        out.other_pos.push(disPos);
                        otherNum++;
                    }
                }
                else {
                    var pos = zxData.other_pos[otherNum];
                    var disPos = cc.v2(pos.x, pos.y + minY);
                    out.other_pos.push(disPos);
                    otherNum++;
                }
            }
            else {
                isNext = true;
                break;
            }
        }
        if (isNext == true) {
            minY = zxData.other_pos[zxData.other_pos.length - 1].y + 60 - 505;
            this.getZhenXingDataByEnemyData(enemyDatas.slice(zxData.other_pos.length), out, buffNum, minY);
        }
    };
    //显示关卡数据
    GameManager.prototype.loadLevel = function () {
        var _this = this;
        if (MonsterManager_1.default.getInstance() && MonsterManager_1.default.getInstance().is_load_ok && (Hero_1.default.cur_loaded_num >= Hero_1.default.max_load_num) && (Pet_1.default.cur_loaded_num >= Pet_1.default.max_load_num) && this.fighting_info && this.cur_game_state == Constants_1.GameState.Game_Playing) {
            if (GameManager_1.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
                var top = cc.find("Canvas/Ui_Root/top_ui");
                var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0) + 1;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, wavenumber);
                top.getChildByName('curLabel').getComponent(cc.Label).string = "" + wavenumber; //(EndlessLevelsManager.getInstance().getMaxWave())
            }
            // console.log("_______进来了")
            //this.unscheduleAllCallbacks();
            var monsterData = this.fighting_info.monster_datas[this.cur_wave];
            var isBaoXiangLevel = false;
            var MCM = MonsterConfigure_1.MonsterConfigureManager.getInstance();
            var useWidth = 600;
            var left = (cc.winSize.width - useWidth) / 2 - cc.winSize.width / 2;
            this.enemy_create_y = cc.winSize.height / 2;
            //this.enemy_create_y=0;
            var refreshTime = 0;
            var _loop_1 = function (i) {
                var data = monsterData[i];
                var mId = data.id;
                var strengthType = MCM.getStrengthType(mId);
                var num = data.num;
                var monsterLevel = data.level;
                //一组怪,每组怪都一致的，所以取其中一个就行了
                //分一下缝隙                
                var width = MCM.getMonsterSpacing(mId);
                var maxNumXX = Math.floor(useWidth / width);
                var remainWidth = useWidth % maxNumXX;
                width += Math.floor(remainWidth / maxNumXX);
                var useIndexs = [];
                for (var xx = 0; xx < maxNumXX; xx++) {
                    useIndexs.push(xx);
                }
                //x轴添加的数量，达到maxNumXX后，yyNum++
                var xxNum = 0;
                var yyNum = 0;
                refreshTime += data.refresh_time;
                var _loop_2 = function (n) {
                    this_1.cur_total_num++;
                    //向上排列YY
                    var yy = this_1.enemy_create_y + width * yyNum + Math.random() * width * 0.7;
                    //随机算出XX
                    var randIndex = Math.floor(Math.random() * useIndexs.length);
                    var pos = cc.v2(left + width / 2 + width * useIndexs[randIndex] + Math.random() * 10 - 5, yy);
                    useIndexs.splice(randIndex, 1);
                    if (strengthType != MonsterData_1.StrengthType.Boss) {
                        this_1.scheduleOnce(function () {
                            MonsterManager_1.default.getInstance().createMonsterById(mId, pos, monsterLevel, data.hp_rate);
                            _this.cur_create_num++;
                            _this.game.showJianTouPos(_this.cur_create_num / _this.cur_total_num);
                        }, refreshTime + Math.random() * (60 / MCM.getSpeed(mId)));
                        xxNum++;
                        if (xxNum > maxNumXX) {
                            yyNum++;
                            xxNum = 0;
                            for (var xx = 0; xx < maxNumXX; xx++) {
                                useIndexs.push(xx);
                            }
                        }
                    }
                    else {
                        if (this_1.cur_game_mode == Constants_1.GameMode.Tower) {
                            this_1.scheduleOnce(function () {
                                BossManager_1.default.getInstance().addBoss(mId, monsterLevel, data.hp_rate);
                            }, 3);
                        }
                        else {
                            BossManager_1.default.getInstance().addBoss(mId, monsterLevel, data.hp_rate);
                        }
                    }
                };
                for (var n = 0; n < num; n++) {
                    _loop_2(n);
                }
            };
            var this_1 = this;
            for (var i = 0; i < monsterData.length; i++) {
                _loop_1(i);
            }
            //怪物潮
            if (this.fighting_info.getWaveTypes()[this.cur_wave] == 1) {
                this.showMonsterWarning();
            }
            this.checkTutotials();
            //因为宝箱关卡是插进去的，所以想要获取准确的数值，需要减去其出现的次数
            //this.drop_data=LevelJsonData.getWaveDropData(LevelManager.getInstance().start_level,this.cur_wave-this.level_buff_num);
            this.game.showLevelProgress();
            var isLoadNext = !isBaoXiangLevel;
            if (this.cur_wave >= this.fighting_info.monster_datas.length - 1) {
                isLoadNext = false;
            }
            if (this.cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
                isLoadNext = false;
            }
            if (isLoadNext) {
                var delyT = this.fighting_info.wave_refresh_time[this.cur_wave + 1];
                this.scheduleOnce(function () {
                    _this.loadNextWave();
                }, delyT);
            }
        }
        else {
            this.scheduleOnce(function () {
                if (!_this.fighting_info) {
                    _this.reloadLevelDatas();
                }
                _this.loadLevel();
            }, 0.2);
        }
    };
    GameManager.prototype.loadNextWave = function () {
        if (this.cur_wave < this.fighting_info.monster_datas.length - 1) {
            this.cur_wave++;
            console.log("关卡增加到" + this.cur_wave + " " + this.cur_wave % 3);
            if (this.cur_wave % 3 == 0) {
                console.log("显示提示TIp");
                this.showRoguelike();
            }
            else {
                this.loadLevel();
            }
        }
    };
    GameManager.prototype.reloadLevelDatas = function () {
        // console.log("什么时候进来")
        this.fighting_info = new Constants_1.FightingInfo();
        switch (this.cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    this.fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0); //波数
                    var Round = EndlessLevels_1.EndlessLevelsManager.getInstance().getRound(wavenumber); //回合数
                    this.fighting_info = EndlessLevels_1.EndlessLevelsManager.getInstance().getFightingInfo(Round);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    this.fighting_info = BossChallenge_1.BossChallengeManager.getInstance().getFightingInfo(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode);
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    this.fighting_info = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(TowerManager_1.default.getTowerLevel());
                }
                break;
        }
    };
    GameManager.prototype.addCheckTutotialsHero = function (heroId, callback) {
        var heroInfo = new HeroConfig_1.HeroInfo();
        heroInfo.hero_type = heroId;
        heroInfo.hero_level = 100;
        heroInfo.hero_stage = 5;
        var data = HeroManager_1.HeroManager.getInstance().getTryPlayHeroData(heroInfo);
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, 4, callback);
    };
    GameManager.prototype.addHero = function (heroId, teamIndex, callback) {
        if (callback === void 0) { callback = null; }
        var data = HeroManager_1.HeroManager.getInstance().getTryPlayHeroData(HeroManager_1.HeroManager.getInstance().getHeroInfo(heroId));
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, teamIndex, callback);
        // this.refreshMainWallData();
    };
    /**添加一个满级满装满宠物的英雄 */
    GameManager.prototype.addTutotialsHeroFull = function (heroId, teamIndex, callback) {
        var heroInfo = new HeroConfig_1.HeroInfo();
        heroInfo.hero_type = heroId;
        heroInfo.hero_level = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(heroId);
        heroInfo.hero_stage = 1; //HeroBaseInfoManager.getInstance().getMaxStage(heroId);   
        heroInfo.exclusive_equip_stage = ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance().getMaxStage(heroId);
        var equipMaxStage = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getMaxStage();
        heroInfo.wear1 = EquipmentAttribute_1.EquipmentAttributeManager.getID(1, equipMaxStage);
        heroInfo.wear2 = EquipmentAttribute_1.EquipmentAttributeManager.getID(2, equipMaxStage);
        heroInfo.wear3 = EquipmentAttribute_1.EquipmentAttributeManager.getID(3, equipMaxStage);
        heroInfo.wear4 = EquipmentAttribute_1.EquipmentAttributeManager.getID(4, equipMaxStage);
        switch (heroId) {
            case 2:
                {
                    heroInfo.pet_id = 70413;
                }
                break;
            case 6:
                {
                    heroInfo.pet_id = 70213;
                }
                break;
            case 10:
                {
                    heroInfo.pet_id = 70213;
                }
                break;
            case 11:
                {
                    heroInfo.pet_id = 70113;
                }
                break;
            case 12:
                {
                    heroInfo.pet_id = 70313;
                }
                break;
        }
        var data = HeroManager_1.HeroManager.getInstance().getTryPlayHeroData(heroInfo);
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, teamIndex, callback);
        return data;
    };
    GameManager.prototype.checkTutotials = function () {
        var _this = this;
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            if (this.cur_game_mode == Constants_1.GameMode.Main) {
                if (this.cur_wave == 5) {
                    if (LevelManager_1.LevelManager.getInstance().start_level == 1) {
                        if (TutorailsManager_1.default.getInstance().isShowTutorials(202)) {
                            TutorailsManager_1.default.getInstance().showTutorials(202, function () {
                                _this.setGameRate(1 / Constants_1.JiaSu);
                            }, function () {
                                _this.setGameRate(1);
                            });
                        }
                    }
                }
            }
        }
    };
    //敌人死亡了,哪个敌人死亡了，哪个英雄击杀的
    GameManager.prototype.onEnemyDie = function (score, isAdd) {
        if (isAdd) {
            switch (this.cur_game_mode) {
                case Constants_1.GameMode.Main:
                    {
                        if (MonsterManager_1.default.getInstance().killed_monster_num >= this.cur_total_num) {
                            this.loadNextWave();
                        }
                    }
                    break;
                case Constants_1.GameMode.Endless:
                    {
                        if (MonsterManager_1.default.getInstance().killed_monster_num >= this.cur_total_num) {
                            this.loadNextWave();
                        }
                    }
                    break;
                // case GameMode.Boss_Prsonal:{
                //     BossChallengeManager.getInstance().cur_score+=enemyTs.score;
                // }break;
            }
        }
        //this.game.showLevelProgress();        
    };
    GameManager.prototype.getFightCenter = function () {
        return cc.v2(0, (700 + this.enemy_offset_y - this.enemy_att_y) / 2 + this.enemy_att_y);
    };
    GameManager.prototype.setSkillCancel = function (isShow) {
    };
    GameManager.prototype.exitPlayGame = function () {
        this.load_callback = null;
        this.load_jishu = 0;
        this.unscheduleAllCallbacks();
        this.all_hero = null;
    };
    GameManager.prototype.backToHome = function (showHero) {
        var _this = this;
        this.role_show_hero = showHero ? showHero : HeroConfig_1.Hero_Type.ChangMaoShou;
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        var loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        // console.log("________type1",GameManager.getInstance().game_to_home)
        cc.director.preloadScene(Constants_1.GameScene.home, function (completedCount, totalCount, item) {
            //真实进度
            var progressTrue = completedCount / totalCount;
            //假的进度
            var progressFalse = progressTrue / 2;
            loadingBar.progress = progressFalse;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            _this.cur_load_progress = progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        }, function () {
            cc.director.loadScene(Constants_1.GameScene.home);
        });
        //cc.director.loadScene(GameScene.home);
    };
    GameManager.prototype.showDangerText = function () {
        var dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
        if (dangerText == null) {
            cc.resources.load('ui/game/dangerText', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
                if (dangerText == null) {
                    var node = cc.instantiate(assets);
                    node.parent = cc.find('Canvas/Fighting_Ui');
                }
            });
        }
        else {
            dangerText.active = true;
        }
    };
    GameManager.prototype.showRoguelike = function () {
        if (this.cur_game_state == Constants_1.GameState.Game_Roguelike)
            return;
        this.cur_game_state = Constants_1.GameState.Game_Roguelike;
        cc.director.pause();
        UIManager_1.UIManager.getInstance().showRoguelikeTip();
    };
    GameManager.prototype.showGamePause = function () {
        if (this.cur_game_state == Constants_1.GameState.Game_Pause)
            return;
        this.cur_game_state = Constants_1.GameState.Game_Pause;
        cc.director.pause();
        UIManager_1.UIManager.getInstance().showGamePauseUi();
    };
    GameManager.prototype.showBtnBuff = function (type) {
        if (this.cur_game_state == Constants_1.GameState.Game_Pause)
            return;
        this.cur_game_state = Constants_1.GameState.Game_Pause;
        //cc.director.pause();
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BuffDisplay, UIConfig_1.UILayerLevel.Two, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(BuffDisplay_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(BuffDisplay_1.default).initUi(type);
            },
        });
    };
    GameManager.prototype.showGameWin = function () {
        // console.log("打完一回合了")
        if (this.cur_game_state == Constants_1.GameState.Game_Win || this.cur_game_state == Constants_1.GameState.Game_Lose) {
            return;
        }
        this.music_manager.pause();
        this.cur_game_state = Constants_1.GameState.Game_Win;
        this.resetRate();
        this.game.setBtnRateShow();
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_rate_fight_remain, Math.floor(this.game.try_rate_ramain));
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_auto_fight_remain, Math.floor(this.game.try_auto_ramain));
        switch (this.cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    var curStartLevel = LevelManager_1.LevelManager.getInstance().start_level;
                    if (TutorailsManager_1.default.getInstance().is_finish_game) {
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.完成第N章玩家数 + MissionLevel_1.MissionLevelManager.getInstance().getChapter(curStartLevel));
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.完成挑战关卡 + curStartLevel);
                        LevelManager_1.LevelManager.getInstance().finish_level = curStartLevel;
                        this.game.showCoin();
                        this.scheduleOnce(function () {
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, {
                                onCompleted: function (uiNode) {
                                    uiNode.getComponent(GameWin_1.default).initUi();
                                }
                            });
                        }, 1);
                    }
                    else {
                        if (LevelManager_1.LevelManager.getInstance().start_level == 1 && TutorailsManager_1.default.getInstance().isShowTutorials(204)) {
                            TutorailsManager_1.default.getInstance().saveTutorials(200);
                            TutorailsManager_1.default.getInstance().saveTutorials(202);
                            TutorailsManager_1.default.getInstance().saveTutorials(203);
                            TutorailsManager_1.default.getInstance().saveFinishFromGame();
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardSSUI, UIConfig_1.UILayerLevel.One, {
                                onCompleted: function (uiNode) {
                                    uiNode.getComponent(RewardSSUi_1.default).initData(0);
                                }
                            });
                            // TutorailsManager.getInstance().showTutorials(204,()=>{
                            //     TutorailsManager.getInstance().saveTutorials(204);
                            //     TutorailsManager.getInstance().saveFinishFromGame();
                            // },()=>{
                            //     //开始正式关卡
                            // });
                            // TutorailsManager.getInstance().is_tutorails_state=false;
                        }
                    }
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    TowerManager_1.default.addTowerLevel(1);
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    //显示三选一
                    // console.log("+++++++++")
                    GameManager_1.getInstance().showBtnBuff(1); //Buff选择弹窗
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    this.game.showCoin();
                    this.scheduleOnce(function () {
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, {
                            onCompleted: function (uiNode) {
                                uiNode.getComponent(GameWin_1.default).initUi();
                            }
                        });
                    }, 1);
                }
                break;
        }
        //熊消失
        var showwang = this.all_hero.get(HeroConfig_1.Hero_Type.ShouWang);
        if (showwang) {
            showwang.onGameWin();
        }
    };
    GameManager.prototype.showSelectSkill = function (delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 1; }
        this.cur_game_state = Constants_1.GameState.Game_Pause;
        //延迟展示
        this.scheduleOnce(function () {
            cc.resources.load('ui/game/select_skill', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var fui = cc.find('Canvas/Drop_Root');
                for (var i = 0; i < fui.childrenCount; i++) {
                    cc.tween(fui.children[i]).by(0.5, { y: -1400 }).removeSelf().start();
                }
                var node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                _this.cur_game_state = Constants_1.GameState.Game_Pause;
            });
        }, delayTime);
    };
    GameManager.prototype.showUnlockSkill = function (yesCallback, noCallback) {
        this.cur_game_state = Constants_1.GameState.Game_Pause;
        cc.resources.load('ui/game/unlock_ui', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(UnlockSkill_1.default).init(yesCallback, noCallback);
        });
    };
    // cheakLevelSkill()
    // {
    //     this.cur_game_state=GameState.Game_Pause;
    //     let teamList=HeroManager.getInstance().getTeamList(GameMode.Main);
    //     let isCanShow=false;
    //     for(let i=0; i<5; i++)
    //     {
    //         let hero:Hero=null;
    //         let heroType=teamList[i];
    //         if(heroType>=0)
    //         {
    //             hero=GameManager.getInstance().all_hero[heroType];                
    //             if(hero.level_buff.length<this.max_skill_slot)
    //             {
    //                 isCanShow=true;
    //                 break;
    //             }
    //         }
    //     }
    //     if(isCanShow==false)
    //     {
    //         if(this.max_skill_slot==1)
    //         {
    //             //说明未视频解锁
    //             this.showUnlockSkill(()=>{
    //                 AdManager.getInstance().showVideo((isSuc:boolean)=>{
    //                     if(isSuc)
    //                     {
    //                         this.max_skill_slot=2;
    //                         this.showSelectSkill();
    //                     }else
    //                     {
    //                         //直接开始下一波怪
    //                         GameManager.getInstance().cur_game_state=GameState.Game_Playing;
    //                         this.loadLevel();
    //                         let fui=cc.find('Canvas/Drop_Root');
    //                         for(let i=0; i<fui.childrenCount; i++)
    //                         {
    //                             cc.tween(fui.children[i]).by(0.5,{y:1400}).removeSelf().start();
    //                         }
    //                     }
    //                 },VIDEO_TYPE.Huodong);
    //             },()=>{
    //                 //直接开始下一波怪
    //                 GameManager.getInstance().cur_game_state=GameState.Game_Playing;
    //                 this.loadLevel();
    //                 let fui=cc.find('Canvas/Drop_Root');
    //                 for(let i=0; i<fui.childrenCount; i++)
    //                 {
    //                     cc.tween(fui.children[i]).by(0.5,{y:1400}).removeSelf().start();
    //                 }
    //             });
    //         }else
    //         {
    //             //直接提示技能满了，跳过弹窗
    //             this.showMessage(LanguageManager.getInstance().getString(LanguageIndex.Skill_is_full));
    //             GameManager.getInstance().cur_game_state=GameState.Game_Playing;
    //             this.loadLevel();
    //             let fui=cc.find('Canvas/Drop_Root');
    //             for(let i=0; i<fui.childrenCount; i++)
    //             {
    //                 cc.tween(fui.children[i]).by(0.5,{y:1400}).removeSelf().start();
    //             }
    //         }
    //     }else
    //     {
    //         this.showSelectSkill();
    //     }
    // }
    GameManager.prototype.onFuhuo = function () {
        this.cur_game_state = Constants_1.GameState.Game_Playing;
        ;
        var dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
        if (dangerText) {
            dangerText.active = false;
        }
    };
    GameManager.prototype.showFuhuo = function () {
        var _this = this;
        this.cur_game_state = Constants_1.GameState.Game_Pause;
        this.resetRate();
        this.game.setBtnRateShow();
        //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
        cc.resources.load('ui/game/fuhuo_ui', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            _this.fuhuo_num--;
        });
    };
    GameManager.prototype.showGameLose = function () {
        // console.log("失败",)
        if (this.cur_game_state == Constants_1.GameState.Game_Lose || this.cur_game_state == Constants_1.GameState.Game_Win) {
            return;
        }
        this.cur_game_state = Constants_1.GameState.Game_Lose;
        this.resetRate();
        this.game.setBtnRateShow();
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_rate_fight_remain, Math.floor(this.game.try_rate_ramain));
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_auto_fight_remain, Math.floor(this.game.try_auto_ramain));
        switch (this.cur_game_mode) {
            case Constants_1.GameMode.Tower:
                {
                }
                break;
            case Constants_1.GameMode.Main:
                {
                    this.game.showCoin();
                    //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
                    this.scheduleOnce(function () {
                        UIManager_1.UIManager.getInstance().showGameLoseUi();
                    }, 1);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    this.game.showCoin();
                    //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
                    this.scheduleOnce(function () {
                        UIManager_1.UIManager.getInstance().showGameLoseUi();
                    }, 1);
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    // console.log("无尽挑战胜利")
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(GameWin_1.default).initUi();
                        }
                    });
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    // console.log("Boss挑战胜利")
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(GameWin_1.default).initUi();
                        }
                    });
                }
                break;
        }
    };
    GameManager.prototype.onWallDie = function () {
        this.showGameLose();
        // if(this.cur_game_mode==GameMode.Main){
        //     if(this.fuhuo_num>0)
        //     {
        //         this.showFuhuo();
        //     }else
        //     {
        //         this.showGameLose();
        //     }
        // }else{
        //     this.showGameLose();
        // }        
    };
    GameManager.prototype.showMonsterWarning = function () {
        this.sound_manager.playSound(AudioConstants_1.SoundIndex.YX_EnemyComing);
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.ui_monster_warning, cc.v2(0, 0), UIManager_1.UIManager.getInstance().node);
        node.opacity = 0;
        node.stopAllActions();
        cc.tween(node).to(0.25, { opacity: 255 }).to(0.5, { opacity: 100 }).to(0.5, { opacity: 255 }).to(0.5, { opacity: 100 }).to(0.5, { opacity: 255 }).to(0.25, { opacity: 0 }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.ui_monster_warning, node);
        }).start();
    };
    GameManager.prototype.showBossWarning = function () {
        cc.resources.load('ui/game/boss_warning', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            if (GameManager_1.getInstance().cur_game_scene == Constants_1.GameScene.home)
                return;
            var chuxianAct = 0.3;
            var xiaoshiAct = 0.15;
            var tingliuAct = 2;
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            var auto = node.getChildByName('auto');
            auto.x = -320;
            cc.tween(auto).to(chuxianAct, { x: 320 }).to(2, { x: 1080 }).start();
            var warningLabel = node.getChildByName('warningLabel');
            warningLabel.x = 640;
            cc.tween(warningLabel).to(chuxianAct, { x: 0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(xiaoshiAct, { x: -640 }).start();
            var bossLabel = node.getChildByName('bossLabel');
            bossLabel.x = -640;
            cc.tween(bossLabel).to(chuxianAct, { x: 0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(xiaoshiAct, { x: 640 }).start();
            var effects = node.getChildByName('effects');
            effects.opacity = 0;
            cc.tween(effects).delay(chuxianAct + 0.2).call(function () {
                effects.opacity = 255;
                effects.getComponent(cc.Animation).play();
            }).delay(tingliuAct - chuxianAct - 0.2).removeSelf().start();
            cc.tween(node).delay(tingliuAct).removeSelf().start();
            // cc.tween(node).to(0.2,{y:200}).delay(0.5).to(0.2,{scale:1.2}).to(0.2,{scale:0.8}).to(0.1,{scale:32,opacity:0}).removeSelf().start();
        });
    };
    GameManager.prototype.saveSound = function () {
        this.music_manager.saveMusicVolume();
        this.music_manager.saveMusicMute();
        this.sound_manager.saveSoundVolume();
        this.sound_manager.saveSoundMute();
    };
    GameManager.prototype.showSpeedUpUi = function () {
        var _this = this;
        if (this.cur_game_scene == Constants_1.GameScene.game) {
            cc.resources.load('ui/game/speed_ui', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                _this.cur_game_state = Constants_1.GameState.Game_Pause;
                cc.director.pause();
                var node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
            });
        }
    };
    //----------------------------------------------------HOME------------------------------------------------------------------------
    GameManager.prototype.refreshCoinShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                return home.refreshCoinShow();
            }
        }
    };
    GameManager.prototype.refreshGemShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                return home.refreshGemShow();
            }
        }
    };
    GameManager.prototype.refreshLongJingShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                return home.refreshLongJing();
            }
        }
    };
    GameManager.prototype.refreshUserExpShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                return home.refreshUserExp();
            }
        }
    };
    GameManager.prototype.jumoToUi = function (index) {
        if (this.cur_game_scene == Constants_1.GameScene.home)
            cc.find('Canvas').getComponent(Home_1.default).jumoToUi(index);
    };
    GameManager.prototype.jumoAndShowUi = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            home.cheakUnlock();
            home.showUi();
        }
    };
    GameManager.prototype.refreshZhanliShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                return home.refreshZhanLiShow();
            }
        }
    };
    GameManager.prototype.refreshTopShow = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var home = cc.find('Canvas').getComponent(Home_1.default);
            if (home) {
                home.refreshTop();
            }
        }
    };
    GameManager.prototype.refreshGuaJiGift = function () {
        if (this.cur_game_scene == Constants_1.GameScene.home) {
            var btnOfflineGift = cc.find('Canvas/main_ui/btnOfflineGift');
            btnOfflineGift.getComponent(GuaJiGift_1.default).cheak();
        }
    };
    // refreshRole()
    // {
    //     if(this.cur_game_scene!=GameScene.home)
    //     return;
    //     let roleUi=cc.find('Canvas/role_ui');
    //     if(roleUi.active==true)
    //     {
    //         roleUi.getComponent(RoleUi).onEnable();
    //     }        
    // }    
    /**----------------------------------------------宠物---------------------------------------------- */
    /**
     *
     * @param petId 宠物id
     * @param num 增加的数值
     */
    GameManager.prototype.addPetActiveDps = function (petId, num) {
        var nowNum = this.getPetActiveDps(petId);
        var newNum = nowNum + num;
        this.setPetActiveDps(petId, newNum);
    };
    /**
     *
     * @param petId 宠物id
     * @returns 当前的dps
     */
    GameManager.prototype.getPetActiveDps = function (petId) {
        return this.pet_active_dps.get(petId);
    };
    GameManager.prototype.setPetActiveDps = function (petId, num) {
        this.pet_active_dps.set(petId, num);
    };
    /**
     *
     * @param petId 宠物id
     * @param num 增加的数值
     */
    GameManager.prototype.addPetConnectDps = function (petId, num) {
        var nowNum = this.getPetConnectDps(petId);
        var newNum = nowNum + num;
        this.setPetConnectDps(petId, newNum);
    };
    /**
     *
     * @param petId 宠物id
     * @returns 当前的dps
     */
    GameManager.prototype.getPetConnectDps = function (petId) {
        return this.pet_connect_dps.get(petId);
    };
    GameManager.prototype.setPetConnectDps = function (petId, num) {
        this.pet_connect_dps.set(petId, num);
    };
    var GameManager_1;
    GameManager._instance = null;
    GameManager = GameManager_1 = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQThKO0FBTTlKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUNyRCx5Q0FBb0M7QUFDcEMscURBQTRFO0FBQzVFLGtEQUE2QztBQUM3QywwQ0FBcUQ7QUFDckQsNkNBQXdDO0FBQ3hDLHVEQUE2RDtBQUU3RCx5REFBb0Q7QUFDcEQsa0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3QyxvRUFBK0Q7QUFDL0QseURBQStEO0FBQy9ELDBFQUFnRjtBQUVoRiw0RUFBa0Y7QUFDbEYscURBQWdEO0FBSXhDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBcTdDQztRQWo3Q1csaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFDOUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDekMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDbkQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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QUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFPLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNuQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdE8sSUFBSSxPQUFPLEdB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QyxDQUFDO0lBRU8scUNBQWUsR0FBdkIsVUFBd0IsS0FBYyxFQUFFLEdBQVc7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksc0NBQWdCLEdBQXZCLFVBQXdCLEtBQWMsRUFBRSxHQUFXO1FBQy9DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxzQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBYztRQUNsQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxzQ0FBZ0IsR0FBeEIsVUFBeUIsS0FBYyxFQUFFLEdBQVc7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O0lBbDdDYyxxQkFBUyxHQUFnQixJQUFJLENBQUM7SUFGNUIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXE3Qy9CO0lBQUQsa0JBQUM7Q0FyN0NELEFBcTdDQyxDQXI3Q3dDLEVBQUUsQ0FBQyxTQUFTLEdBcTdDcEQ7a0JBcjdDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEdhbWVTY2VuZSwgR2FtZVN0YXRlLCBHb19UeXBlLCBJc0RlYnVnLCBTZWxlY3RTa2lsbF9UeXBlLCBWSURFT19UWVBFLCBaaGVuZ19YaW5nX1R5cGUsIEdhbWVNb2RlLCBGaWdodGluZ0luZm8sIEppYVN1IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBDaHVTaGVuZ0RpYW4gZnJvbSBcIi4vR2FtZS9DaHVTaGVuZ0RpYW5cIjtcclxuaW1wb3J0IEVuZW15SHBNYW5hZ2VyIGZyb20gXCIuL0VuZW15L0VuZW15SHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBIcFRleHRIcE1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlci9IcFRleHRNYW5hZ2VyXCI7XHJcbmltcG9ydCBNdXNpYyBmcm9tIFwiLi9Tb3VuZC9NdWlzY1wiO1xyXG5pbXBvcnQgU291bmQgZnJvbSBcIi4vU291bmQvU291bmRcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xyXG5pbXBvcnQgSGludCBmcm9tIFwiLi9IaW50XCI7XHJcbmltcG9ydCBHZXRUaXAgZnJvbSBcIi4vVUkvR2V0VGlwXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWUvR2FtZVwiO1xyXG5pbXBvcnQgRGlhbG9nIGZyb20gXCIuL1VJL0RpYWxvZ1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgTG9jYWxWaWRlbyBmcm9tIFwiLi9Mb2NhbFZpZGVvXCI7XHJcbmltcG9ydCB7IEhlcm9EYXRhIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBVbmxvY2tTa2lsbCBmcm9tIFwiLi9VSS9VbmxvY2tTa2lsbFwiO1xyXG5pbXBvcnQgeyBaaGVuWGluZ0RhdGEgfSBmcm9tIFwiLi9aaGVuWGluZ0RhdGFcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCBCb3NzTWFuYWdlciBmcm9tIFwiLi9Cb3NzL0Jvc3NNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJDb25maWd1cmUsIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi9QZXQvR2FtZS9QZXRcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9cIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlRGF0YSwgSGVyb0luZm8sIEhlcm9fVHlwZSB9IGZyb20gXCIuL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBHdWFKaUdpZnQgZnJvbSBcIi4vR3VhSmkvVWkvR3VhSmlHaWZ0XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IEdhbWVXaW4gZnJvbSBcIi4vR2FtZS9VaS9HYW1lV2luXCI7XHJcbmltcG9ydCB7IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZkRpc3BsYXkgZnJvbSBcIi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9CdWZmRGlzcGxheVwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL0V4Y2x1c2l2ZUVuaGFuY2VtZW50XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlV2VhcG9uTWVzc2FnZVwiO1xyXG5pbXBvcnQgUmV3YXJkU1NVaSBmcm9tIFwiLi9UdXRvcmlhbHMvUmV3YXJkU1NVaVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVmYWJfaGludDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIHByaXZhdGUgcHJlZmFiX2dldF90aXA6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSE9NRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJvbGVfc2hvd19oZXJvOiBIZXJvX1R5cGUgPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdhbWUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL+WQhOenjeeuoeeQhuWZqFxyXG4gICAgZ2FtZTogR2FtZSA9IG51bGw7XHJcbiAgICBlbmVteV9ocF9tYW5hZ2VyOiBFbmVteUhwTWFuYWdlciA9IG51bGw7XHJcbiAgICBocF90ZXh0X21hbmFnZXI6IEhwVGV4dEhwTWFuYWdlciA9IG51bGw7XHJcbiAgICBjaHVfc2hlbmdfZGlhbjogQ2h1U2hlbmdEaWFuID0gbnVsbDtcclxuICAgIC8v5aOw6Z+zXHJcbiAgICBzb3VuZF9tYW5hZ2VyOiBTb3VuZCA9IG51bGw7XHJcbiAgICBtdXNpY19tYW5hZ2VyOiBNdXNpYyA9IG51bGw7XHJcbiAgICAvL+WQhOWkp+iLsembhOeahFxyXG4gICAgYWxsX2hlcm86IE1hcDxudW1iZXIsIEhlcm8+ID0gbnVsbDtcclxuICAgIC8vRFBT57uf6K6hXHJcbiAgICBoZXJvX3NraWxsX2RwczogbnVtYmVyW10gPSBudWxsO1xyXG4gICAgaGVyb19hdHRhY2tfZHBzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgICAvKirlrqDniankuLvliqjmioDog73pgKDmiJDnmoTkvKTlrrMgKi9cclxuICAgIHByaXZhdGUgcGV0X2FjdGl2ZV9kcHM6IE1hcDxQZXRJbmZvLCBudW1iZXI+ID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqei/nuaQuuaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfY29ubmVjdF9kcHM6IE1hcDxQZXRJbmZvLCBudW1iZXI+ID0gbnVsbDtcclxuXHJcbiAgICBjdXJfZ2FtZV9zdGF0ZTogR2FtZVN0YXRlID0gR2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICBjdXJfZ2FtZV9tb2RlOiBHYW1lTW9kZSA9IEdhbWVNb2RlLk1haW47XHJcbiAgICBjdXJfZ2FtZV9zY2VuZTogR2FtZVNjZW5lID0gR2FtZVNjZW5lLmhvbWU7XHJcblxyXG4gICAgLy/lvZPliY3nmoTliqDovb3ov5vluqZcclxuICAgIGN1cl9sb2FkX3Byb2dyZXNzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8v5q+P5Liq6Iux6ZuE6I635b6X55qE5ri45oiP5YaF5oqA6IO9XHJcbiAgICBpbmdhbWVfc2tpbGxzOiBTZWxlY3RTa2lsbF9UeXBlW10gPSBbXTtcclxuICAgIC8v5byA5aeL55qE5YWz5Y2h55qE5pWw5o2uXHJcbiAgICBjdXJfd2F2ZTogbnVtYmVyID0gMDtcclxuICAgIGZpZ2h0aW5nX2luZm86IEZpZ2h0aW5nSW5mbyA9IG51bGw7XHJcbiAgICAvL2Ryb3BfZGF0YTpEcm9wRGF0YT1udWxsO1xyXG4gICAgcmV3YXJkX2RhdGE6IFJld2FyZERhdGFbXSA9IFtdO1xyXG4gICAgaXNfbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+aOieiQveeJqeWTgeeahOaAqueJqWlkXHJcbiAgICAvL2Ryb3BfZW5lbXlfdHlwZTpudW1iZXI9MDtcclxuXHJcbiAgICBnYW1lX3RvX2hvbWU6IEdvX1R5cGUgPSBHb19UeXBlLk1haW47XHJcblxyXG4gICAgZnVodW9fbnVtOiBudW1iZXIgPSAxO1xyXG4gICAgaXNfc2hvd190ZXh0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8v5pyA5aSn55qE5oqA6IO95qe95L2NXHJcbiAgICBtYXhfc2tpbGxfc2xvdDogbnVtYmVyID0gMjtcclxuICAgIC8v5ZCE5Liq6Iux6ZuE5pWw5o2u77yM5ri45oiP5YaF5L2/55So77yM5YWz5Y2h5YaFYnVmZuOAglxyXG4gICAgZ2FtZV9oZXJvX2RhdGE6IE1hcDxudW1iZXIsIEhlcm9EYXRhPiA9IG51bGw7XHJcbiAgICAvL+esrOWHoOS4quaAquacieWPr+iDveeIhuaYn+aYn2J1ZmZcclxuICAgIC8vc3Rhcl9pbmRleDpudW1iZXI9MDtcclxuICAgIC8vXHJcbiAgICAvKirlvZPliY3mgLvlhbHnmoTmgKrnianmlbDph48gKi9cclxuICAgIGN1cl90b3RhbF9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirlrp7pmYXkuIrlt7Lnu4/nlJ/miJDlh7rmgKrniannmoTmlbDph48gKi9cclxuICAgIGN1cl9jcmVhdGVfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgZW5lbXlfb2Zmc2V0X3k6IG51bWJlciA9IDA7XHJcbiAgICBlbmVteV9hdHRfeTogbnVtYmVyID0gLTMwMDtcclxuICAgIGVuZW15X2NyZWF0ZV95OiBudW1iZXIgPSAxMDgwO1xyXG4gICAgbG9hZF9qaXNodTogbnVtYmVyID0gMDtcclxuICAgIGxvYWRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIGppc2h1X3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvL+mAmuWFs+asoeaVsFxyXG4gICAgcGFzc19sZXZlbF9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirmuLjmiI/pgJ/njocgKi9cclxuICAgIHByaXZhdGUgZ2FtZV9yYXRlOiBudW1iZXIgPSAxLjU7XHJcbiAgICAvKirmjInpkq7mjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgYnRuX3NldHVwX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmiJjmlpfmjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfc2V0dXBfcmF0ZTogbnVtYmVyID0gMTtcclxuICAgIC8qKuWNleasoeacgOmrmOS8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfZGFtYWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Y2V5qyh5pyA5bCP5Lyk5a6z5YC8ICovXHJcbiAgICBwcml2YXRlIG1pbl9kYW1hZ2U6IG51bWJlciA9IDk5OTk7XHJcbiAgICAvKiroh6rliqjmiJjmlpfmoIfor4YgKi9cclxuICAgIHB1YmxpYyBhdXRvX2ZpZ2h0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlvZPliY3nmoTpmJ/liJcgKi9cclxuICAgIHB1YmxpYyBjdXJfdGVhbV9saXN0OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLy/mmK/lkKbmmL7npLrkuobpgIDlh7rmuLjmiI/nmoTlr7nor53moYZcclxuICAgIHB1YmxpYyBpc19zaG93X2V4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5Yqo55S75L2N572uXHJcbiAgICBwdWJsaWMgYW5pVHlwZTogbnVtYmVyID0gNDtcclxuXHJcbiAgICAvL+aImOi9pueahOS9jee9rnhcclxuICAgIHB1YmxpYyBjaGFyUG9zWDogbnVtYmVyID0gMDtcclxuICAgIC8v5ri45oiP5Yqo55S75a2Y5YKo5pWw5o2uXHJcbiAgICAvLyBwdWJsaWMgbW92ZURhdGE6IEFycmF5PGNjLlZlYzI+ID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lTG9hZGVyb25cIik7XHJcblxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgaW5pdChzY2VuZTogR2FtZVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMuaXNfbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmlUeXBlPTQ7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX3NjZW5lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmhvbWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leGl0UGxheUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yb2xlX3Nob3dfaGVybz1IZXJvX1R5cGUuU2hlU2hvdTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuZ2FtZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvID0gbmV3IE1hcDxudW1iZXIsIEhlcm8+KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdGFsX251bSA9IHRoaXMuY3VyX2NyZWF0ZV9udW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZ2FtZV9za2lsbHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2RhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVodW9fbnVtID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b19maWdodGluZyA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuQXV0b0ZpZ2h0aW5nKSA+IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3MgPSAwOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkVGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuU2V0dXBSYXRlKHJhdGU6IG51bWJlciwgaXNBY3Rpdml0eTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLmJ0bl9zZXR1cF9yYXRlID0gcmF0ZTtcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIGlmIChpc0FjdGl2aXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChyYXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/lvIDlkK/miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+WFs+mXreaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldEF1dG9GaWdodGluZyhpc0F1dG86IGJvb2xlYW4sIGlzQWN0aXZpdHk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvX2ZpZ2h0aW5nID0gaXNBdXRvO1xyXG4gICAgICAgIGlmIChpc0FjdGl2aXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChpc0F1dG8pIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpflvIDlkK/miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+WFs+mXreaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnRuU2V0dXBSYXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnRuX3NldHVwX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmlnaHRpbmdSYXRlKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfc2V0dXBfcmF0ZSA9IHJhdGU7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYW1lUmF0ZShyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICAvL3RoaXMuZ2FtZV9yYXRlID0gcmF0ZSAqIHRoaXMuYnRuX3NldHVwX3JhdGUgKiB0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGU7XHJcbiAgICAgICAgY2Mua1NwZWVkKHRoaXMuZ2FtZV9yYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lUmF0ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVfcmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3JhdGUgPSAxO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWF4RGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IHRoaXMubWF4X2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heF9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heERhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWluRGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IHRoaXMubWluX2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pbkRhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlID0gMS40O1xyXG4gICAgICAgIGxldCBzY2FsZVZhbHVlID0gMTtcclxuICAgICAgICBsZXQgcmF0ZSA9IGRhbWFnZSAvIHRoaXMuZ2V0TWF4RGFtYWdlKCk7XHJcbiAgICAgICAgc2NhbGVWYWx1ZSA9IHJhdGUgKiBtYXhTY2FsZTtcclxuICAgICAgICBpZiAoc2NhbGVWYWx1ZSA8IDEpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY2FsZVZhbHVlID4gbWF4U2NhbGUpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IG1heFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBkYW1hZ2UgLyB0aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIGlmIChyYXRlIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDAuNCkge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCAwLjYpIHtcclxuICAgICAgICAgICAgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgMC44KSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF80O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF81O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVybyhoZXJvSWQ6IEhlcm9fVHlwZSk6IEhlcm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbF9oZXJvLmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRHYW1lSGVyb0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGlzSW5pdERwcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9fYXR0YWNrX2Rwcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YSA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmN1cl90ZWFtX2xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KHRoaXMuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0RhdGEgPSBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGaWdodGluZ0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSGVyb19UeXBlLkhlcm9fTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5pdERwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGhvbWVIZXJvRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaSk7XHJcbiAgICAgICAgICAgIGlmIChob21lSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUoaG9tZUhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90ZWFtX2xpc3QuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/t+Wuq+aooeW8j+WKoOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKz0gKGZpZ2h0aW5nRGF0YS5BdHRhY2tQZXIpICogaGVyb0RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKz0gKGZpZ2h0aW5nRGF0YS5EZWZlbnNlUGVyKSAqIGhlcm9EYXRhLmZpeF9kZWZlbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5Dcml0aWNhbCArPSBmaWdodGluZ0RhdGEuQ3JpdGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuSGl0ICs9IGZpZ2h0aW5nRGF0YS5IaXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLCBoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmluaXRXYWxsKG1haW5XYWxsRGF0YSwgV2FsbFR5cGUuTWFpbik7XHJcbiAgICAgICAgLy8gaWYoaHA8MzAwMCl7XHJcbiAgICAgICAgLy8gICAgIGhwPTMwMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRlZmVuc2U8MTAwKXtcclxuICAgICAgICAvLyAgICAgZGVmZW5zZT0xMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy53YWxsX2RhdGEuaW5pdEluaGVyaXREYXRhKGhwLGRlZmVuc2UsbWlzcyxhbnRpQ3JpdGljYWwsYW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpIHtcclxuICAgICAgICBsZXQgaXNJbml0RHBzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGVyb19hdHRhY2tfZHBzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luaXREcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMgPSBuZXcgTWFwPFBldEluZm8sIG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhID0gbmV3IE1hcDxudW1iZXIsIEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdCA9IFtIZXJvX1R5cGUuU2hvdVdhbmcsIEhlcm9fVHlwZS5BTnVCaVNpLCBIZXJvX1R5cGUuWmhlbkRlLCBIZXJvX1R5cGUuTWVpTW8sIEhlcm9fVHlwZS5MZWlTaGVuXTtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VyX3RlYW1fbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmFkZFR1dG90aWFsc0hlcm9GdWxsKHRoaXMuY3VyX3RlYW1fbGlzdFtpXSwgaSwgbnVsbCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0ICs9IGhlcm9EYXRhLkhpdCAqIDAuMjtcclxuICAgICAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1heERhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICB0aGlzLnNldE1pbkRhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGksaGVyb0RhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5pbml0V2FsbChtYWluV2FsbERhdGEsIFdhbGxUeXBlLk1haW4pO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaE1haW5XYWxsRGF0YUJ5YWRkSGVybygpIHtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUodi5oZXJvX2RhdGEpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoICs9IGhlcm9EYXRhLnRvdGFsX2hwICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcyArPSBoZXJvRGF0YS5NaXNzICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrICs9IGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCArPSBoZXJvRGF0YS5IaXQgKiAwLjI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkucmVmcmVzaFdhbGxEYXRhQnlhZGRIZXJvKG1haW5XYWxsRGF0YSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoTWFpbldhbGxEYXRhKCkge1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBjYy5pbnN0YW50aWF0ZSh2Lmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0ICs9IGhlcm9EYXRhLkhpdCAqIDAuMjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5yZWZyZXNoV2FsbERhdGEobWFpbldhbGxEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRUaXAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZWZhYl9oaW50KSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoaW50JywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiX2hpbnQgPSBhc3NldHM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucHJlZmFiX2dldF90aXApIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2dldF90aXAnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfZ2V0X3RpcCA9IGFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgZHQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmVmYWJfaGludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoaW50JywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBoaW50ID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGhpbnQucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIGxldCBoaW50SnMgPSBoaW50LmdldENvbXBvbmVudChIaW50KTtcclxuICAgICAgICAgICAgICAgIGhpbnRKcy5zaG93SGludE1lc3NhZ2UobWVzc2FnZSwgZHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaGludCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2hpbnQpO1xyXG4gICAgICAgICAgICBoaW50LnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIGxldCBoaW50SnMgPSBoaW50LmdldENvbXBvbmVudChIaW50KTtcclxuICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLCBkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHZXRUaXAoZ2V0Tm9kZTogY2MuTm9kZSwgY2FsbEJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9oaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2dldF90aXAnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRTaG93R2V0UG9ycChnZXROb2RlLCBjYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfZ2V0X3RpcCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRTaG93R2V0UG9ycChnZXROb2RlLCBjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNdWx0aXBsZUdldFRpcChnZXROb2RlczogY2MuTm9kZVtdLCBjYWxsQmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiX2hpbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZE11bHRpcGxlUG9ycChnZXROb2RlcywgY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLCBjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3Nob3dfZXhpdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X2V4aXQgPSB0cnVlO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdkaWFsb2cnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChEaWFsb2cpLnNob3dEaWFsb2cobWVzc2FnZSwgeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2ssIHNob3dUeXBlLCB5KTtcclxuICAgICAgICAgICAgaWYgKHkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueSA9IHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QnV5RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbiwgc2hvd1R5cGU/OiBudW1iZXIsIHk/OiBzdHJpbmcgfCBudW1iZXIsIGN1cnJlbmN5Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLCB5ZXNDYWxsYmFjaywgbm9DYWxsYmFjaywgc2hvd1R5cGUsIHksIGN1cnJlbmN5KTtcclxuICAgICAgICAgICAgLy8gaWYoeSl7XHJcbiAgICAgICAgICAgIC8vICAgICBub2RlLnk9eTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMb2NhbFZpZGVvKHllc0NhbGxiYWNrOiBGdW5jdGlvbiwgbm9DYWxsYmFjazogRnVuY3Rpb24sIGlzVmlkZW8/OiBib29sZWFuKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3ZpZGVvX2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExvY2FsVmlkZW8pLmluaXQoeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdBTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95QWxsRHJvcCgpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUFsbE1vbnN0ZXIoKTtcclxuICAgICAgICB0aGlzLmN1cl93YXZlID0gMDtcclxuICAgICAgICB0aGlzLmN1cl90b3RhbF9udW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBUdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LnJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsUm91bmQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubG9hZExldmVsLCAwLjUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlumYteWIl+exu+Wei1xyXG4gICAgZ2V0WmhlbmdYaW5nRGF0YSgpOiBaaGVuWGluZ0RhdGEge1xyXG4gICAgICAgIGxldCB3YXZlRGF0YSA9IHRoaXMuZmlnaHRpbmdfaW5mb1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAvL+ino+aekOmYteWei+aVsOaNrlxyXG4gICAgICAgIGxldCB6eERhdGEgPSBuZXcgWmhlblhpbmdEYXRhKCk7XHJcbiAgICAgICAgbGV0IGFsbEVuZW15RGF0YSA9IG5ldyBBcnJheTxKc29uTW9uc3RlckNvbmZpZ3VyZT4oKTtcclxuICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdmVEYXRhLm1vbnN0ZXJfbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtSWQgPSB3YXZlRGF0YS5tb25zdGVyX2lkW2ldO1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGEgPSBNQ00uZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobUlkKTtcclxuICAgICAgICAgICAgbGV0IGVuZW15TnVtID0gd2F2ZURhdGEubW9uc3Rlcl9udW1baV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgZW5lbXlOdW07IG4rKykge1xyXG4gICAgICAgICAgICAgICAgYWxsRW5lbXlEYXRhLnB1c2goanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LqM5qyh5aSE55CG77yM5oqKYm9zc+i3n2J1ZmbmgKrmlL7mnIDliY3pnaJcclxuICAgICAgICBhbGxFbmVteURhdGEuc29ydCgoYTogSnNvbk1vbnN0ZXJDb25maWd1cmUsIGI6IEpzb25Nb25zdGVyQ29uZmlndXJlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLlN0cmVuZ3RoVHlwZSAtIGEuU3RyZW5ndGhUeXBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoYWxsRW5lbXlEYXRhLCB6eERhdGEsIDAsIDApO1xyXG4gICAgICAgIHJldHVybiB6eERhdGE7XHJcbiAgICB9XHJcbiAgICBnZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShlbmVteURhdGFzOiBKc29uTW9uc3RlckNvbmZpZ3VyZVtdLCBvdXQ6IFpoZW5YaW5nRGF0YSwgYnVmZk51bTogbnVtYmVyLCBtaW5ZOiBudW1iZXIpIHtcclxuICAgICAgICAvL+mYteWei1xyXG4gICAgICAgIGxldCB6eFR5cGUgPSBaaGVuZ19YaW5nX1R5cGUuWlgwO1xyXG4gICAgICAgIC8v6ZqP5py65LiA5Liq6Zi15Z6LXHJcbiAgICAgICAgenhUeXBlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogWmhlbmdfWGluZ19UeXBlLm51bSk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHp4VHlwZT1aaGVuZ19YaW5nX1R5cGUu566t5aS0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgenhEYXRhID0gbmV3IFpoZW5YaW5nRGF0YSgpO1xyXG4gICAgICAgIC8venhEYXRhPXRoaXMuZ2FtZS56aGVuX3hpbmcuanNvblt6eFR5cGVdO1xyXG4gICAgICAgIGxldCBsZW4gPSBlbmVteURhdGFzLmxlbmd0aDtcclxuICAgICAgICBsZXQgaXNOZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG90aGVyTnVtID0gMDtcclxuICAgICAgICBsZXQgaXNIYXZlQm9zcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBld2FpTnVtID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlQm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgKHp4RGF0YS5vdGhlcl9wb3MubGVuZ3RoICsgZXdhaU51bSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5LiA5LiL5piv5ZCmYm9zc+S9jee9ruW3sue7j+eUqOS6hu+8jOWmguaenOeUqOS6huS7o+ihqOi/meWFs+aciTLkuKpib3Nz77yM6ZyA6KaB5oqK6L+Z5LiqYm9zc+aUvuWIsGJ1ZmbkvY3nva7kuIpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS5i+WJjeayoeacieiuvue9rmJvc3PkvY3nva4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXQuYm9zc19wb3MueSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5ib3NzX3BvcyA9IGRpc1BvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXQuYnVmZl9wb3MubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5idWZmX3Bvc1tidWZmTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGUgPT0gU3RyZW5ndGhUeXBlLkVsaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5idWZmX3Bvcy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzov5nms6LmsqHmnIlib3Nz77yM5bm25LiU5pyJYnVmZu+8jOWImWJ1Zmbku6Pmm79ib3Nz5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0hhdmVCb3NzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZUJvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5idWZmX3Bvc1tidWZmTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dC5vdGhlcl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc05leHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTmV4dCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1pblkgPSB6eERhdGEub3RoZXJfcG9zW3p4RGF0YS5vdGhlcl9wb3MubGVuZ3RoIC0gMV0ueSArIDYwIC0gNTA1O1xyXG4gICAgICAgICAgICB0aGlzLmdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGVuZW15RGF0YXMuc2xpY2UoenhEYXRhLm90aGVyX3Bvcy5sZW5ndGgpLCBvdXQsIGJ1ZmZOdW0sIG1pblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5pi+56S65YWz5Y2h5pWw5o2uXHJcbiAgICBwdWJsaWMgbG9hZExldmVsKCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkgJiYgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19sb2FkX29rICYmIChIZXJvLmN1cl9sb2FkZWRfbnVtID49IEhlcm8ubWF4X2xvYWRfbnVtKSAmJiAoUGV0LmN1cl9sb2FkZWRfbnVtID49IFBldC5tYXhfbG9hZF9udW0pICYmIHRoaXMuZmlnaHRpbmdfaW5mbyAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApICsgMVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCB3YXZlbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB3YXZlbnVtYmVyLy8oRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19f6L+b5p2l5LqGXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckRhdGEgPSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhc1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgbGV0IGlzQmFvWGlhbmdMZXZlbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHVzZVdpZHRoID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IChjYy53aW5TaXplLndpZHRoIC0gdXNlV2lkdGgpIC8gMiAtIGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15X2NyZWF0ZV95ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW5lbXlfY3JlYXRlX3k9MDtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hUaW1lID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25zdGVyRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtb25zdGVyRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtSWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZSA9IE1DTS5nZXRTdHJlbmd0aFR5cGUobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBkYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyTGV2ZWwgPSBkYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgLy/kuIDnu4TmgKos5q+P57uE5oCq6YO95LiA6Ie055qE77yM5omA5Lul5Y+W5YW25Lit5LiA5Liq5bCx6KGM5LqGXHJcbiAgICAgICAgICAgICAgICAvL+WIhuS4gOS4i+e8nemamSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IE1DTS5nZXRNb25zdGVyU3BhY2luZyhtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heE51bVhYID0gTWF0aC5mbG9vcih1c2VXaWR0aCAvIHdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5XaWR0aCA9IHVzZVdpZHRoICUgbWF4TnVtWFg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSBNYXRoLmZsb29yKHJlbWFpbldpZHRoIC8gbWF4TnVtWFgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUluZGV4cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IG1heE51bVhYOyB4eCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlSW5kZXhzLnB1c2goeHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy946L205re75Yqg55qE5pWw6YeP77yM6L6+5YiwbWF4TnVtWFjlkI7vvIx5eU51bSsrXHJcbiAgICAgICAgICAgICAgICBsZXQgeHhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5TnVtID0gMDtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUaW1lICs9IGRhdGEucmVmcmVzaF90aW1lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrmjpLliJdZWVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5eSA9IHRoaXMuZW5lbXlfY3JlYXRlX3kgKyB3aWR0aCAqIHl5TnVtICsgTWF0aC5yYW5kb20oKSAqIHdpZHRoICogMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py6566X5Ye6WFhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlSW5kZXhzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGxlZnQgKyB3aWR0aCAvIDIgKyB3aWR0aCAqIHVzZUluZGV4c1tyYW5kSW5kZXhdICsgTWF0aC5yYW5kb20oKSAqIDEwIC0gNSwgeXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5zcGxpY2UocmFuZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZW5ndGhUeXBlICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlTW9uc3RlckJ5SWQobUlkLCBwb3MsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2NyZWF0ZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93SmlhblRvdVBvcyh0aGlzLmN1cl9jcmVhdGVfbnVtIC8gdGhpcy5jdXJfdG90YWxfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVmcmVzaFRpbWUgKyBNYXRoLnJhbmRvbSgpICogKDYwIC8gTUNNLmdldFNwZWVkKG1JZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh4TnVtID4gbWF4TnVtWFgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl5TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4eE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbWF4TnVtWFg7IHh4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLlRvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCwgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQm9zcyhtSWQsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKVt0aGlzLmN1cl93YXZlXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb25zdGVyV2FybmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUdXRvdGlhbHMoKTtcclxuICAgICAgICAgICAgLy/lm6DkuLrlrp3nrrHlhbPljaHmmK/mj5Lov5vljrvnmoTvvIzmiYDku6Xmg7PopoHojrflj5blh4bnoa7nmoTmlbDlgLzvvIzpnIDopoHlh4/ljrvlhbblh7rnjrDnmoTmrKHmlbBcclxuICAgICAgICAgICAgLy90aGlzLmRyb3BfZGF0YT1MZXZlbEpzb25EYXRhLmdldFdhdmVEcm9wRGF0YShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlLXRoaXMubGV2ZWxfYnVmZl9udW0pO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgbGV0IGlzTG9hZE5leHQgPSAhaXNCYW9YaWFuZ0xldmVsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA+PSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0xvYWROZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVseVQgPSB0aGlzLmZpZ2h0aW5nX2luZm8ud2F2ZV9yZWZyZXNoX3RpbWVbdGhpcy5jdXJfd2F2ZSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBkZWx5VCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmdfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkTGV2ZWxEYXRhcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE5leHRXYXZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YXZlIDwgdGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZSsrO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWFs+WNoeWinuWKoOWIsFwiK3RoaXMuY3VyX3dhdmUrXCIgXCIrdGhpcy5jdXJfd2F2ZSUzKTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfd2F2ZSUzPT0wKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S65o+Q56S6VElwXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSb2d1ZWxpa2UoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZExldmVsRGF0YXMoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLku4DkuYjml7blgJnov5vmnaVcIilcclxuICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBuZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKTsvL+azouaVsFxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgYWRkQ2hlY2tUdXRvdGlhbHNIZXJvKGhlcm9JZDogSGVyb19UeXBlLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgaGVyb0luZm86IEhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gaGVyb0lkO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSAxMDA7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDU7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbylcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChoZXJvSWQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkSGVybyhoZXJvSWQsIDQsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRIZXJvKGhlcm9JZDogSGVyb19UeXBlLCB0ZWFtSW5kZXg6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uPW51bGwpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9JZCkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgdGVhbUluZGV4LCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmVmcmVzaE1haW5XYWxsRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgLyoq5re75Yqg5LiA5Liq5ruh57qn5ruh6KOF5ruh5a6g54mp55qE6Iux6ZuEICovXHJcbiAgICBhZGRUdXRvdGlhbHNIZXJvRnVsbChoZXJvSWQ6IEhlcm9fVHlwZSwgdGVhbUluZGV4OiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEhlcm9EYXRhIHtcclxuICAgICAgICBsZXQgaGVyb0luZm86IEhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gaGVyb0lkO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb0lkKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMS8vSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9JZCk7ICAgXHJcbiAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvSWQpO1xyXG4gICAgICAgIGxldCBlcXVpcE1heFN0YWdlID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKCk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjEgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDEsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIyID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgyLCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMyA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMywgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjQgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDQsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIHN3aXRjaCAoaGVyb0lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzA0MTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAyMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMjEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDExOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDExMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAzMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoaGVyb0luZm8pXHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaGVyb0lkLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLCB0ZWFtSW5kZXgsIGNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1dG90aWFscygpIHtcclxuICAgICAgICBpZiAoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxIC8gSmlhU3UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aVjOS6uuatu+S6oeS6hizlk6rkuKrmlYzkurrmrbvkuqHkuobvvIzlk6rkuKroi7Hpm4Tlh7vmnYDnmoRcclxuICAgIG9uRW5lbXlEaWUoc2NvcmU6IG51bWJlciwgaXNBZGQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNBZGQpIHtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW0gPj0gdGhpcy5jdXJfdG90YWxfbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bSA+PSB0aGlzLmN1cl90b3RhbF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlKz1lbmVteVRzLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlnaHRDZW50ZXIoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKDAsICg3MDAgKyB0aGlzLmVuZW15X29mZnNldF95IC0gdGhpcy5lbmVteV9hdHRfeSkgLyAyICsgdGhpcy5lbmVteV9hdHRfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxDYW5jZWwoaXNTaG93OiBib29sZWFuKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4aXRQbGF5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmxvYWRfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZF9qaXNodSA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVybyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja1RvSG9tZShzaG93SGVybz86IEhlcm9fVHlwZSkge1xyXG4gICAgICAgIHRoaXMucm9sZV9zaG93X2hlcm8gPSBzaG93SGVybyA/IHNob3dIZXJvIDogSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX190eXBlMVwiLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lKVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSwgKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8v55yf5a6e6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1RydWUgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlID0gcHJvZ3Jlc3NUcnVlIC8gMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmcgPSAobG9hZGluZ0Jhci5wcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RhbmdlclRleHQoKSB7XHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvZGFuZ2VyVGV4dCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dSb2d1ZWxpa2UoKXtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9Sb2d1ZWxpa2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1JvZ3VlbGlrZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dSb2d1ZWxpa2VUaXAoKTtcclxuICAgIH1cclxuICAgIHNob3dHYW1lUGF1c2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGF1c2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVBhdXNlVWkoKTtcclxuICAgIH1cclxuICAgIHNob3dCdG5CdWZmKHR5cGUpLy8wOkJ1ZmblsZXnpLogICAx77yaQnVmZumAieaLqVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJ1ZmZEaXNwbGF5LCBVSUxheWVyTGV2ZWwuVHdvLCB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0VWkodHlwZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNob3dHYW1lV2luKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5omT5a6M5LiA5Zue5ZCI5LqGXCIpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfV2luIHx8IHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfTG9zZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9XaW47XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9yYXRlX3JhbWFpbikpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X2F1dG9fcmFtYWluKSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyU3RhcnRMZXZlbCA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsO1xyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDnrKxO56ug546p5a625pWwICsgTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoY3VyU3RhcnRMZXZlbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDmjJHmiJjlhbPljaEgKyBjdXJTdGFydExldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPSBjdXJTdGFydExldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDEgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMDQsKCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvL+W8gOWni+ato+W8j+WFs+WNoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIFRvd2VyTWFuYWdlci5hZGRUb3dlckxldmVsKDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIC8v5pi+56S65LiJ6YCJ5LiAXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK1wiKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigxKTsvL0J1ZmbpgInmi6nlvLnnqpdcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgMSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL+eGiua2iOWksVxyXG4gICAgICAgIGxldCBzaG93d2FuZyA9IHRoaXMuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgaWYgKHNob3d3YW5nKSB7XHJcbiAgICAgICAgICAgIHNob3d3YW5nLm9uR2FtZVdpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93U2VsZWN0U2tpbGwoZGVsYXlUaW1lOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIC8v5bu26L+f5bGV56S6XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9zZWxlY3Rfc2tpbGwnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGZ1aSA9IGNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LCB7IHk6IC0xNDAwIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBkZWxheVRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVbmxvY2tTa2lsbCh5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3VubG9ja191aScsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFVubG9ja1NraWxsKS5pbml0KHllc0NhbGxiYWNrLCBub0NhbGxiYWNrKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVha0xldmVsU2tpbGwoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAvLyAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1vZGUuTWFpbik7XHJcbiAgICAvLyAgICAgbGV0IGlzQ2FuU2hvdz1mYWxzZTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTw1OyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBsZXQgaGVybzpIZXJvPW51bGw7XHJcbiAgICAvLyAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpXTtcclxuICAgIC8vICAgICAgICAgaWYoaGVyb1R5cGU+PTApXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGhlcm89R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyb1toZXJvVHlwZV07ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgaWYoaGVyby5sZXZlbF9idWZmLmxlbmd0aDx0aGlzLm1heF9za2lsbF9zbG90KVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlzQ2FuU2hvdz10cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmKGlzQ2FuU2hvdz09ZmFsc2UpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZih0aGlzLm1heF9za2lsbF9zbG90PT0xKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+ivtOaYjuacquinhumikeino+mUgVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93VW5sb2NrU2tpbGwoKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBBZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKGlzU3VjKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1heF9za2lsbF9zbG90PTI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RTa2lsbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAvL+ebtOaOpeW8gOWni+S4i+S4gOazouaAqlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9LFZJREVPX1RZUEUuSHVvZG9uZyk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vkuIvkuIDms6LmgKpcclxuICAgIC8vICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+ebtOaOpeaPkOekuuaKgOiDvea7oeS6hu+8jOi3s+i/h+W8ueeql1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Ta2lsbF9pc19mdWxsKSk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1lbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNob3dTZWxlY3RTa2lsbCgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBvbkZ1aHVvKCkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nOztcclxuXHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0KSB7XHJcbiAgICAgICAgICAgIGRhbmdlclRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dGdWh1bygpIHtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvZnVodW9fdWknLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmZ1aHVvX251bS0tO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lTG9zZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWksei0pVwiLClcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9Mb3NlIHx8IHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfV2luKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX0xvc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9yYXRlX3JhbWFpbikpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X2F1dG9fcmFtYWluKSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2VVaSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlTGV2ZWxXYXZlKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZVVpKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaXoOWwveaMkeaImOiDnOWIqVwiKVxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHYW1lV2luKS5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJvc3PmjJHmiJjog5zliKlcIilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgb25XYWxsRGllKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5mdWh1b19udW0+MClcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93RnVodW8oKTtcclxuICAgICAgICAvLyAgICAgfWVsc2VcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb25zdGVyV2FybmluZygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfRW5lbXlDb21pbmcpO1xyXG4gICAgICAgIGxldCBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQudWlfbW9uc3Rlcl93YXJuaW5nLCBjYy52MigwLCAwKSwgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZSk7XHJcbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4yNSwgeyBvcGFjaXR5OiAyNTUgfSkudG8oMC41LCB7IG9wYWNpdHk6IDEwMCB9KS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAxMDAgfSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS50bygwLjI1LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQudWlfbW9uc3Rlcl93YXJuaW5nLCBub2RlKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCb3NzV2FybmluZygpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9ib3NzX3dhcm5pbmcnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgY2h1eGlhbkFjdCA9IDAuMztcclxuICAgICAgICAgICAgbGV0IHhpYW9zaGlBY3QgPSAwLjE1O1xyXG4gICAgICAgICAgICBsZXQgdGluZ2xpdUFjdCA9IDI7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBsZXQgYXV0byA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2F1dG8nKTtcclxuICAgICAgICAgICAgYXV0by54ID0gLTMyMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oYXV0bykudG8oY2h1eGlhbkFjdCwgeyB4OiAzMjAgfSkudG8oMiwgeyB4OiAxMDgwIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2FybmluZ0xhYmVsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FybmluZ0xhYmVsJyk7XHJcbiAgICAgICAgICAgIHdhcm5pbmdMYWJlbC54ID0gNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih3YXJuaW5nTGFiZWwpLnRvKGNodXhpYW5BY3QsIHsgeDogMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50byh4aWFvc2hpQWN0LCB7IHg6IC02NDAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgbGV0IGJvc3NMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3NMYWJlbCcpO1xyXG4gICAgICAgICAgICBib3NzTGFiZWwueCA9IC02NDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJvc3NMYWJlbCkudG8oY2h1eGlhbkFjdCwgeyB4OiAwIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKHhpYW9zaGlBY3QsIHsgeDogNjQwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3RzID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnZWZmZWN0cycpO1xyXG4gICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYy50d2VlbihlZmZlY3RzKS5kZWxheShjaHV4aWFuQWN0ICsgMC4yKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICB9KS5kZWxheSh0aW5nbGl1QWN0IC0gY2h1eGlhbkFjdCAtIDAuMikucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KHRpbmdsaXVBY3QpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2MudHdlZW4obm9kZSkudG8oMC4yLHt5OjIwMH0pLmRlbGF5KDAuNSkudG8oMC4yLHtzY2FsZToxLjJ9KS50bygwLjIse3NjYWxlOjAuOH0pLnRvKDAuMSx7c2NhbGU6MzIsb3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNvdW5kKCkge1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5zYXZlTXVzaWNWb2x1bWUoKTtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljTXV0ZSgpO1xyXG4gICAgICAgIHRoaXMuc291bmRfbWFuYWdlci5zYXZlU291bmRWb2x1bWUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kTXV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTcGVlZFVwVWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmdhbWUpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvc3BlZWRfdWknLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUhPTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICByZWZyZXNoQ29pblNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR2VtU2hvdygpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaExvbmdKaW5nU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hMb25nSmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVc2VyRXhwU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hVc2VyRXhwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAganVtb1RvVWkoaW5kZXg6IEJ0bl9JbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSkuanVtb1RvVWkoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bW9BbmRTaG93VWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGhvbWUuY2hlYWtVbmxvY2soKTtcclxuICAgICAgICAgICAgaG9tZS5zaG93VWkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFpoYW5saVNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoWmhhbkxpU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUb3BTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgaG9tZS5yZWZyZXNoVG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEd1YUppR2lmdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgYnRuT2ZmbGluZUdpZnQgPSBjYy5maW5kKCdDYW52YXMvbWFpbl91aS9idG5PZmZsaW5lR2lmdCcpO1xyXG4gICAgICAgICAgICBidG5PZmZsaW5lR2lmdC5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyByZWZyZXNoUm9sZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZSE9R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCByb2xlVWk9Y2MuZmluZCgnQ2FudmFzL3JvbGVfdWknKTtcclxuICAgIC8vICAgICBpZihyb2xlVWkuYWN0aXZlPT10cnVlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcm9sZVVpLmdldENvbXBvbmVudChSb2xlVWkpLm9uRW5hYmxlKCk7XHJcbiAgICAvLyAgICAgfSAgICAgICAgXHJcbiAgICAvLyB9ICAgIFxyXG5cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm93TnVtID0gdGhpcy5nZXRQZXRBY3RpdmVEcHMocGV0SWQpO1xyXG4gICAgICAgIGxldCBuZXdOdW0gPSBub3dOdW0gKyBudW07XHJcbiAgICAgICAgdGhpcy5zZXRQZXRBY3RpdmVEcHMocGV0SWQsIG5ld051bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nmoRkcHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0X2FjdGl2ZV9kcHMuZ2V0KHBldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzLnNldChwZXRJZCwgbnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gbnVtIOWinuWKoOeahOaVsOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm93TnVtID0gdGhpcy5nZXRQZXRDb25uZWN0RHBzKHBldElkKTtcclxuICAgICAgICBsZXQgbmV3TnVtID0gbm93TnVtICsgbnVtO1xyXG4gICAgICAgIHRoaXMuc2V0UGV0Q29ubmVjdERwcyhwZXRJZCwgbmV3TnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeeahGRwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0X2Nvbm5lY3RfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQZXRDb25uZWN0RHBzKHBldElkOiBQZXRJbmZvLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzLnNldChwZXRJZCwgbnVtKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19