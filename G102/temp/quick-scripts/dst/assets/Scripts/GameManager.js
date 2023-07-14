
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
        _this.game_rate = 1;
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
        return _this;
    }
    GameManager_1 = GameManager;
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
        this.game_rate = rate * this.btn_setup_rate * this.fighting_setup_rate;
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
        this.cur_wave = 0;
        this.cur_total_num = 0;
        MonsterManager_1.default.getInstance().destroyAllDrop();
        MonsterManager_1.default.getInstance().destroyAllMonster();
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
            this.loadLevel();
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BuffDisplay, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(BuffDisplay_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(BuffDisplay_1.default).initUi(type);
            }, });
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
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                    uiNode.getComponent(GameWin_1.default).initUi();
                                } });
                        }, 1);
                    }
                    else {
                        if (LevelManager_1.LevelManager.getInstance().start_level == 1 && TutorailsManager_1.default.getInstance().isShowTutorials(204)) {
                            TutorailsManager_1.default.getInstance().saveTutorials(200);
                            TutorailsManager_1.default.getInstance().saveTutorials(202);
                            TutorailsManager_1.default.getInstance().saveTutorials(203);
                            TutorailsManager_1.default.getInstance().saveFinishFromGame();
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardSSUI, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                    uiNode.getComponent(RewardSSUi_1.default).initData(0);
                                } });
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
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(GameWin_1.default).initUi();
                            } });
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
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(GameWin_1.default).initUi();
                        } });
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    // console.log("Boss挑战胜利")
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GameWin, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(GameWin_1.default).initUi();
                        } });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQTRKO0FBTTVKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUNyRCx5Q0FBb0M7QUFDcEMscURBQTRFO0FBQzVFLGtEQUE2QztBQUM3QywwQ0FBcUQ7QUFDckQsNkNBQXdDO0FBQ3hDLHVEQUE2RDtBQUU3RCx5REFBb0Q7QUFDcEQsa0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3QyxvRUFBK0Q7QUFDL0QseURBQStEO0FBQy9ELDBFQUFnRjtBQUVoRiw0RUFBa0Y7QUFDbEYscURBQWdEO0FBSXpDLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBNDlDQztRQXg5Q1csaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFDdEMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQVcsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDaEQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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RUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMU0sSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENB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ZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIEdvX1R5cGUsIElzRGVidWcsIFNlbGVjdFNraWxsX1R5cGUsIFZJREVPX1RZUEUsIFpoZW5nX1hpbmdfVHlwZSxHYW1lTW9kZSwgRmlnaHRpbmdJbmZvLCBKaWFTdX0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBDaHVTaGVuZ0RpYW4gZnJvbSBcIi4vR2FtZS9DaHVTaGVuZ0RpYW5cIjtcclxuaW1wb3J0IEVuZW15SHBNYW5hZ2VyIGZyb20gXCIuL0VuZW15L0VuZW15SHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBIcFRleHRIcE1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlci9IcFRleHRNYW5hZ2VyXCI7XHJcbmltcG9ydCBNdXNpYyBmcm9tIFwiLi9Tb3VuZC9NdWlzY1wiO1xyXG5pbXBvcnQgU291bmQgZnJvbSBcIi4vU291bmQvU291bmRcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xyXG5pbXBvcnQgSGludCBmcm9tIFwiLi9IaW50XCI7XHJcbmltcG9ydCBHZXRUaXAgZnJvbSBcIi4vVUkvR2V0VGlwXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWUvR2FtZVwiO1xyXG5pbXBvcnQgRGlhbG9nIGZyb20gXCIuL1VJL0RpYWxvZ1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyAgUmV3YXJkRGF0YSB9IGZyb20gXCIuL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IExvY2FsVmlkZW8gZnJvbSBcIi4vTG9jYWxWaWRlb1wiO1xyXG5pbXBvcnQge0hlcm9EYXRhfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFVubG9ja1NraWxsIGZyb20gXCIuL1VJL1VubG9ja1NraWxsXCI7XHJcbmltcG9ydCB7IFpoZW5YaW5nRGF0YSB9IGZyb20gXCIuL1poZW5YaW5nRGF0YVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IEJvc3NNYW5hZ2VyIGZyb20gXCIuL0Jvc3MvQm9zc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXIvVG93ZXJMZXZlbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckNvbmZpZ3VyZSwgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBIZXJvSW5mbywgSGVyb19UeXBlIH0gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEd1YUppR2lmdCBmcm9tIFwiLi9HdWFKaS9VaS9HdWFKaUdpZnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgR2FtZVdpbiBmcm9tIFwiLi9HYW1lL1VpL0dhbWVXaW5cIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBCdWZmRGlzcGxheSBmcm9tIFwiLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBSZXdhcmRTU1VpIGZyb20gXCIuL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHByZWZhYl9oaW50OmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBwcmVmYWJfZ2V0X3RpcDpjYy5QcmVmYWI9bnVsbDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcm9sZV9zaG93X2hlcm86SGVyb19UeXBlPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5ZCE56eN566h55CG5ZmoXHJcbiAgICBnYW1lOkdhbWU9bnVsbDtcclxuICAgIGVuZW15X2hwX21hbmFnZXI6RW5lbXlIcE1hbmFnZXI9bnVsbDtcclxuICAgIGhwX3RleHRfbWFuYWdlcjpIcFRleHRIcE1hbmFnZXI9bnVsbDtcclxuICAgIGNodV9zaGVuZ19kaWFuOkNodVNoZW5nRGlhbj1udWxsO1xyXG4gICAgLy/lo7Dpn7NcclxuICAgIHNvdW5kX21hbmFnZXI6U291bmQ9bnVsbDtcclxuICAgIG11c2ljX21hbmFnZXI6TXVzaWM9bnVsbDtcclxuICAgIC8v5ZCE5aSn6Iux6ZuE55qEXHJcbiAgICBhbGxfaGVybzpNYXA8bnVtYmVyLEhlcm8+PW51bGw7XHJcbiAgICAvL0RQU+e7n+iuoVxyXG4gICAgaGVyb19za2lsbF9kcHM6bnVtYmVyW109bnVsbDtcclxuICAgIGhlcm9fYXR0YWNrX2RwczpudW1iZXJbXT1udWxsO1xyXG4gICAgLyoq5a6g54mp5Li75Yqo5oqA6IO96YCg5oiQ55qE5Lyk5a6zICovXHJcbiAgICBwcml2YXRlIHBldF9hY3RpdmVfZHBzOk1hcDxQZXRJbmZvLG51bWJlcj49bnVsbDtcclxuICAgIC8qKuWuoOeJqei/nuaQuuaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfY29ubmVjdF9kcHM6TWFwPFBldEluZm8sbnVtYmVyPj1udWxsO1xyXG5cclxuICAgIGN1cl9nYW1lX3N0YXRlOkdhbWVTdGF0ZT1HYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgIGN1cl9nYW1lX21vZGU6R2FtZU1vZGU9R2FtZU1vZGUuTWFpbjtcclxuICAgIGN1cl9nYW1lX3NjZW5lOkdhbWVTY2VuZT1HYW1lU2NlbmUuaG9tZTtcclxuXHJcbiAgICAvL+W9k+WJjeeahOWKoOi9vei/m+W6plxyXG4gICAgY3VyX2xvYWRfcHJvZ3Jlc3M6bnVtYmVyPTA7XHJcblxyXG4gICAgLy/mr4/kuKroi7Hpm4TojrflvpfnmoTmuLjmiI/lhoXmioDog71cclxuICAgIGluZ2FtZV9za2lsbHM6U2VsZWN0U2tpbGxfVHlwZVtdPVtdO1xyXG4gICAgLy/lvIDlp4vnmoTlhbPljaHnmoTmlbDmja5cclxuICAgIGN1cl93YXZlOm51bWJlcj0wO1xyXG4gICAgZmlnaHRpbmdfaW5mbzpGaWdodGluZ0luZm89bnVsbDtcclxuICAgIC8vZHJvcF9kYXRhOkRyb3BEYXRhPW51bGw7XHJcbiAgICByZXdhcmRfZGF0YTpSZXdhcmREYXRhW109W107XHJcbiAgICBpc19sb2FkZWQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8v5o6J6JC954mp5ZOB55qE5oCq54mpaWRcclxuICAgIC8vZHJvcF9lbmVteV90eXBlOm51bWJlcj0wO1xyXG5cclxuICAgIGdhbWVfdG9faG9tZTpHb19UeXBlPUdvX1R5cGUuTWFpbjtcclxuXHJcbiAgICBmdWh1b19udW06bnVtYmVyPTE7XHJcbiAgICBpc19zaG93X3RleHQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmioDog73mp73kvY1cclxuICAgIG1heF9za2lsbF9zbG90Om51bWJlcj0yO1xyXG4gICAgLy/lkITkuKroi7Hpm4TmlbDmja7vvIzmuLjmiI/lhoXkvb/nlKjvvIzlhbPljaHlhoVidWZm44CCXHJcbiAgICBnYW1lX2hlcm9fZGF0YTpNYXA8bnVtYmVyLEhlcm9EYXRhPj1udWxsO1xyXG4gICAgLy/nrKzlh6DkuKrmgKrmnInlj6/og73niIbmmJ/mmJ9idWZmXHJcbiAgICAvL3N0YXJfaW5kZXg6bnVtYmVyPTA7XHJcbiAgICAvL1xyXG4gICAgLyoq5b2T5YmN5oC75YWx55qE5oCq54mp5pWw6YePICovXHJcbiAgICBjdXJfdG90YWxfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5a6e6ZmF5LiK5bey57uP55Sf5oiQ5Ye65oCq54mp55qE5pWw6YePICovXHJcbiAgICBjdXJfY3JlYXRlX251bTpudW1iZXI9MDtcclxuICAgIGVuZW15X29mZnNldF95Om51bWJlcj0wO1xyXG4gICAgZW5lbXlfYXR0X3k6bnVtYmVyPS0zMDA7XHJcbiAgICBlbmVteV9jcmVhdGVfeTpudW1iZXI9MTA4MDtcclxuICAgIGxvYWRfamlzaHU6bnVtYmVyPTA7XHJcbiAgICBsb2FkX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBqaXNodV90aW1lOm51bWJlcj0wOyAgICBcclxuICAgIC8v6YCa5YWz5qyh5pWwXHJcbiAgICBwYXNzX2xldmVsX251bTpudW1iZXI9MDtcclxuICAgIC8qKua4uOaIj+mAn+eOhyAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lX3JhdGU6bnVtYmVyPTE7XHJcbiAgICAvKirmjInpkq7mjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgYnRuX3NldHVwX3JhdGU6bnVtYmVyPTE7XHJcbiAgICAvKirmiJjmlpfmjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfc2V0dXBfcmF0ZTpudW1iZXI9MTtcclxuICAgIC8qKuWNleasoeacgOmrmOS8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfZGFtYWdlOm51bWJlcj0wO1xyXG4gICAgLyoq5Y2V5qyh5pyA5bCP5Lyk5a6z5YC8ICovXHJcbiAgICBwcml2YXRlIG1pbl9kYW1hZ2U6bnVtYmVyPTk5OTk7XHJcbiAgICAvKiroh6rliqjmiJjmlpfmoIfor4YgKi9cclxuICAgIHB1YmxpYyBhdXRvX2ZpZ2h0aW5nOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirlvZPliY3nmoTpmJ/liJcgKi9cclxuICAgIHB1YmxpYyBjdXJfdGVhbV9saXN0Om51bWJlcltdPVtdO1xyXG4gICAgLy/mmK/lkKbmmL7npLrkuobpgIDlh7rmuLjmiI/nmoTlr7nor53moYZcclxuICAgIHB1YmxpYyBpc19zaG93X2V4aXQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6R2FtZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVMb2FkZXJvblwiKTtcclxuICAgICAgICBcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0IChzY2VuZTpHYW1lU2NlbmUpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3NjZW5lPXNjZW5lO1xyXG4gICAgICAgIHRoaXMuaXNfbG9hZGVkPWZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9nYW1lX3NjZW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuaG9tZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX3Byb2dyZXNzPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leGl0UGxheUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yb2xlX3Nob3dfaGVybz1IZXJvX1R5cGUuU2hlU2hvdTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVTY2VuZS5nYW1lOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV90b19ob21lPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvPW5ldyBNYXA8bnVtYmVyLEhlcm8+KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcz1udWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcz1udWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtPXRoaXMuY3VyX2NyZWF0ZV9udW09MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5nYW1lX3NraWxscz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2RhdGE9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1aHVvX251bT0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvX2ZpZ2h0aW5nPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuQXV0b0ZpZ2h0aW5nKT4wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6dGhpcy5jdXJfbG9hZF9wcm9ncmVzcz0wO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRUaXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5TZXR1cFJhdGUocmF0ZTpudW1iZXIsaXNBY3Rpdml0eTpib29sZWFuPXRydWUpe1xyXG4gICAgICAgIHRoaXMuYnRuX3NldHVwX3JhdGU9cmF0ZTtcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIGlmKGlzQWN0aXZpdHkpe1xyXG4gICAgICAgICAgICBpZihyYXRlPT0yKXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/lvIDlkK/miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/lhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldEF1dG9GaWdodGluZyhpc0F1dG86Ym9vbGVhbixpc0FjdGl2aXR5OmJvb2xlYW49dHJ1ZSl7XHJcbiAgICAgICAgdGhpcy5hdXRvX2ZpZ2h0aW5nPWlzQXV0bztcclxuICAgICAgICBpZihpc0FjdGl2aXR5KXtcclxuICAgICAgICAgICAgaWYoaXNBdXRvKXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpflvIDlkK/miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpflhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdG5TZXR1cFJhdGUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnRuX3NldHVwX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmlnaHRpbmdSYXRlKHJhdGU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGU9cmF0ZTtcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVSYXRlKHJhdGU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmdhbWVfcmF0ZT1yYXRlKnRoaXMuYnRuX3NldHVwX3JhdGUqdGhpcy5maWdodGluZ19zZXR1cF9yYXRlO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZVJhdGUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZV9yYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuZ2FtZV9yYXRlPTE7XHJcbiAgICAgICAgY2Mua1NwZWVkKHRoaXMuZ2FtZV9yYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYXhEYW1hZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYobnVtPnRoaXMubWF4X2RhbWFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMubWF4X2RhbWFnZT1udW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heERhbWFnZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1pbkRhbWFnZShudW06bnVtYmVyKXtcclxuICAgICAgICBpZihudW08dGhpcy5taW5fZGFtYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5taW5fZGFtYWdlPW51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWluRGFtYWdlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCBtYXhTY2FsZT0xLjQ7XHJcbiAgICAgICAgbGV0IHNjYWxlVmFsdWU9MTtcclxuICAgICAgICBsZXQgcmF0ZT1kYW1hZ2UvdGhpcy5nZXRNYXhEYW1hZ2UoKTtcclxuICAgICAgICBzY2FsZVZhbHVlPXJhdGUqbWF4U2NhbGU7XHJcbiAgICAgICAgaWYoc2NhbGVWYWx1ZTwxKXtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZT0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzY2FsZVZhbHVlPm1heFNjYWxlKXtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZT1tYXhTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dEVmZmVjdChkYW1hZ2U6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICBsZXQgcmF0ZT1kYW1hZ2UvdGhpcy5nZXRNYXhEYW1hZ2UoKTtcclxuICAgICAgICBpZihyYXRlPDAuMil7XHJcbiAgICAgICAgICAgIGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICB9ZWxzZSBpZihyYXRlPDAuNCl7XHJcbiAgICAgICAgICAgIGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMjtcclxuICAgICAgICB9ZWxzZSBpZihyYXRlPDAuNil7XHJcbiAgICAgICAgICAgIGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMztcclxuICAgICAgICB9ZWxzZSBpZihyYXRlPDAuOCl7XHJcbiAgICAgICAgICAgIGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfNDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF81O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVybyhoZXJvSWQ6SGVyb19UeXBlKTpIZXJve1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbF9oZXJvLmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRHYW1lSGVyb0RhdGEoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzSW5pdERwcz1mYWxzZTtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaGVyb19hdHRhY2tfZHBzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcz10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzPW5ldyBNYXA8UGV0SW5mbyxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHM9bmV3IE1hcDxQZXRJbmZvLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhPW5ldyBNYXA8bnVtYmVyLEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KHRoaXMuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0RhdGE9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRmlnaHRpbmdEYXRhKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhPW5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8SGVyb19UeXBlLkhlcm9fTnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihpc0luaXREcHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhPW5ldyBIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICBsZXQgaG9tZUhlcm9EYXRhPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaSk7XHJcbiAgICAgICAgICAgIGlmKGhvbWVIZXJvRGF0YSl7XHJcbiAgICAgICAgICAgICAgICBoZXJvRGF0YT1jYy5pbnN0YW50aWF0ZShob21lSGVyb0RhdGEpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX3RlYW1fbGlzdC5pbmNsdWRlcyhpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov7flrqvmqKHlvI/liqDmiJBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1hemUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9hdHRhY2srPShmaWdodGluZ0RhdGEuQXR0YWNrUGVyKSpoZXJvRGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEudG90YWxfZGVmZW5zZSs9KGZpZ2h0aW5nRGF0YS5EZWZlbnNlUGVyKSpoZXJvRGF0YS5maXhfZGVmZW5zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuQ3JpdGljYWwrPWZpZ2h0aW5nRGF0YS5Dcml0aWNhbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5IaXQrPWZpZ2h0aW5nRGF0YS5IaXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCs9aGVyb0RhdGEudG90YWxfaHAqMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlKz1oZXJvRGF0YS50b3RhbF9kZWZlbnNlKjAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcys9aGVyb0RhdGEuTWlzcyowLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCs9aGVyb0RhdGEuQW50aUNyaXRpY2FsKjAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwrPWhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsKjAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrKz1oZXJvRGF0YS50b3RhbF9hdHRhY2sqMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQrPWhlcm9EYXRhLkhpdCowLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjaypoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWluRGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaSxoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmluaXRXYWxsKG1haW5XYWxsRGF0YSxXYWxsVHlwZS5NYWluKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGlmKGhwPDMwMDApe1xyXG4gICAgICAgIC8vICAgICBocD0zMDAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihkZWZlbnNlPDEwMCl7XHJcbiAgICAgICAgLy8gICAgIGRlZmVuc2U9MTAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL3RoaXMud2FsbF9kYXRhLmluaXRJbmhlcml0RGF0YShocCxkZWZlbnNlLG1pc3MsYW50aUNyaXRpY2FsLGFudGlFeHRyYUNyaXRpY2FsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkVHV0b3JhaWxzSGVyb0RhdGEoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzSW5pdERwcz1mYWxzZTtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaGVyb19hdHRhY2tfZHBzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcz10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoaXNJbml0RHBzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzPW5ldyBNYXA8UGV0SW5mbyxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHM9bmV3IE1hcDxQZXRJbmZvLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhPW5ldyBNYXA8bnVtYmVyLEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdD1bSGVyb19UeXBlLlNob3VXYW5nLEhlcm9fVHlwZS5BTnVCaVNpLEhlcm9fVHlwZS5aaGVuRGUsSGVyb19UeXBlLk1laU1vLEhlcm9fVHlwZS5MZWlTaGVuXTtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhPW5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5jdXJfdGVhbV9saXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhPXRoaXMuYWRkVHV0b3RpYWxzSGVyb0Z1bGwodGhpcy5jdXJfdGVhbV9saXN0W2ldLGksbnVsbCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGgrPWhlcm9EYXRhLnRvdGFsX2hwKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UrPWhlcm9EYXRhLnRvdGFsX2RlZmVuc2UqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcys9aGVyb0RhdGEuTWlzcyowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwrPWhlcm9EYXRhLkFudGlDcml0aWNhbCowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCs9aGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrKz1oZXJvRGF0YS50b3RhbF9hdHRhY2sqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0Kz1oZXJvRGF0YS5IaXQqMC4yO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzLnNldChoZXJvRGF0YS5wZXRfaW5mbywwKTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLDApO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1heERhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2sqaGVyb0RhdGEuRXh0cmFDcml0aWNhbClcclxuICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgLy90aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLGhlcm9EYXRhKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaW5pdFdhbGwobWFpbldhbGxEYXRhLFdhbGxUeXBlLk1haW4pOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaE1haW5XYWxsRGF0YSgpe1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGE9bmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhPWNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCs9aGVyb0RhdGEudG90YWxfaHAqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSs9aGVyb0RhdGEudG90YWxfZGVmZW5zZSowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzKz1oZXJvRGF0YS5NaXNzKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCs9aGVyb0RhdGEuQW50aUNyaXRpY2FsKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsKz1oZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2srPWhlcm9EYXRhLnRvdGFsX2F0dGFjayowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQrPWhlcm9EYXRhLkhpdCowLjI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkucmVmcmVzaFdhbGxEYXRhKG1haW5XYWxsRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkVGlwKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5wcmVmYWJfaGludClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoaW50JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYl9oaW50PWFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnByZWZhYl9nZXRfdGlwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2dldF90aXAnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiX2dldF90aXA9YXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01lc3NhZ2UobWVzc2FnZTpzdHJpbmcsZHQ/Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnByZWZhYl9oaW50PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBoaW50PWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBoaW50LnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnRKcz1oaW50LmdldENvbXBvbmVudChIaW50KTtcclxuICAgICAgICAgICAgICAgIGhpbnRKcy5zaG93SGludE1lc3NhZ2UobWVzc2FnZSxkdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaGludD1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9oaW50KTtcclxuICAgICAgICAgICAgaGludC5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGhpbnRKcz1oaW50LmdldENvbXBvbmVudChIaW50KTtcclxuICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldFRpcChnZXROb2RlOmNjLk5vZGUsY2FsbEJhY2s/OkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucHJlZmFiX2hpbnQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsY2FsbEJhY2spOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9nZXRfdGlwKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRTaG93R2V0UG9ycChnZXROb2RlLGNhbGxCYWNrKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNdWx0aXBsZUdldFRpcChnZXROb2RlczpjYy5Ob2RlW10sY2FsbEJhY2s/OkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucHJlZmFiX2hpbnQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZE11bHRpcGxlUG9ycChnZXROb2RlcyxjYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9nZXRfdGlwKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRNdWx0aXBsZVBvcnAoZ2V0Tm9kZXMsY2FsbEJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6c3RyaW5nLHllc0NhbGxiYWNrOkZ1bmN0aW9uLG5vQ2FsbGJhY2s6RnVuY3Rpb24sc2hvd1R5cGU/Om51bWJlcix5PzpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19zaG93X2V4aXQ9PXRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfc2hvd19leGl0PXRydWU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2RpYWxvZycsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGlhbG9nKS5zaG93RGlhbG9nKG1lc3NhZ2UseWVzQ2FsbGJhY2ssbm9DYWxsYmFjayxzaG93VHlwZSx5KTtcclxuICAgICAgICAgICAgaWYoeSl7XHJcbiAgICAgICAgICAgICAgICBub2RlLnk9eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCdXlEaWFsb2cobWVzc2FnZTpzdHJpbmcseWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbixzaG93VHlwZT86bnVtYmVyLHk/OnN0cmluZyB8IG51bWJlcixjdXJyZW5jeT86c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdkaWFsb2cnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLHllc0NhbGxiYWNrLG5vQ2FsbGJhY2ssc2hvd1R5cGUseSxjdXJyZW5jeSk7XHJcbiAgICAgICAgICAgIC8vIGlmKHkpe1xyXG4gICAgICAgICAgICAvLyAgICAgbm9kZS55PXk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0xvY2FsVmlkZW8oeWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbixpc1ZpZGVvPzpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd2aWRlb19kaWFsb2cnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExvY2FsVmlkZW8pLmluaXQoeWVzQ2FsbGJhY2ssbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR0FNRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuY3VyX3dhdmU9MDtcclxuICAgICAgICB0aGlzLmN1cl90b3RhbF9udW09MDtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lBbGxEcm9wKCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95QWxsTW9uc3RlcigpOyAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89VHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUFsbEVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdi5yZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1Ub3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKytcIixSb3VuZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXJ0TmV4dExldmVsKCk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmxvYWRMZXZlbCwwLjUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlumYteWIl+exu+Wei1xyXG4gICAgZ2V0WmhlbmdYaW5nRGF0YSgpOlpoZW5YaW5nRGF0YVxyXG4gICAge1xyXG4gICAgICAgIGxldCB3YXZlRGF0YT10aGlzLmZpZ2h0aW5nX2luZm9bdGhpcy5jdXJfd2F2ZV07ICAgICAgICBcclxuICAgICAgICAvL+ino+aekOmYteWei+aVsOaNrlxyXG4gICAgICAgIGxldCB6eERhdGE9bmV3IFpoZW5YaW5nRGF0YSgpO1xyXG4gICAgICAgIGxldCBhbGxFbmVteURhdGE9bmV3IEFycmF5PEpzb25Nb25zdGVyQ29uZmlndXJlPigpO1xyXG4gICAgICAgIGxldCBNQ009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx3YXZlRGF0YS5tb25zdGVyX251bS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtSWQ9d2F2ZURhdGEubW9uc3Rlcl9pZFtpXTtcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPU1DTS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtSWQpO1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlOdW09d2F2ZURhdGEubW9uc3Rlcl9udW1baV07XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGVuZW15TnVtOyBuKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsbEVuZW15RGF0YS5wdXNoKGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S6jOasoeWkhOeQhu+8jOaKimJvc3Pot59idWZm5oCq5pS+5pyA5YmN6Z2iXHJcbiAgICAgICAgYWxsRW5lbXlEYXRhLnNvcnQoKGE6SnNvbk1vbnN0ZXJDb25maWd1cmUsYjpKc29uTW9uc3RlckNvbmZpZ3VyZSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGIuU3RyZW5ndGhUeXBlLWEuU3RyZW5ndGhUeXBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoYWxsRW5lbXlEYXRhLHp4RGF0YSwwLDApO1xyXG4gICAgICAgIHJldHVybiB6eERhdGE7XHJcbiAgICB9XHJcbiAgICBnZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShlbmVteURhdGFzOkpzb25Nb25zdGVyQ29uZmlndXJlW10sb3V0OlpoZW5YaW5nRGF0YSxidWZmTnVtOm51bWJlcixtaW5ZOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL+mYteWei1xyXG4gICAgICAgIGxldCB6eFR5cGU9WmhlbmdfWGluZ19UeXBlLlpYMDtcclxuICAgICAgICAvL+maj+acuuS4gOS4qumYteWei1xyXG4gICAgICAgIHp4VHlwZT1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqWmhlbmdfWGluZ19UeXBlLm51bSk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHp4VHlwZT1aaGVuZ19YaW5nX1R5cGUu566t5aS0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgenhEYXRhPW5ldyBaaGVuWGluZ0RhdGEoKTtcclxuICAgICAgICAvL3p4RGF0YT10aGlzLmdhbWUuemhlbl94aW5nLmpzb25benhUeXBlXTtcclxuICAgICAgICBsZXQgbGVuPWVuZW15RGF0YXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBpc05leHQ9ZmFsc2U7XHJcbiAgICAgICAgbGV0IG90aGVyTnVtPTA7XHJcbiAgICAgICAgbGV0IGlzSGF2ZUJvc3M9ZmFsc2U7XHJcbiAgICAgICAgbGV0IGV3YWlOdW09MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlPT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlQm9zcz10cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpPCh6eERhdGEub3RoZXJfcG9zLmxlbmd0aCtld2FpTnVtKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5LiA5LiL5piv5ZCmYm9zc+S9jee9ruW3sue7j+eUqOS6hu+8jOWmguaenOeUqOS6huS7o+ihqOi/meWFs+aciTLkuKpib3Nz77yM6ZyA6KaB5oqK6L+Z5LiqYm9zc+aUvuWIsGJ1ZmbkvY3nva7kuIpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXp4RGF0YS5ib3NzX3BvcztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zPWNjLnYyKHBvcy54LHBvcy55K21pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LmL5YmN5rKh5pyJ6K6+572uYm9zc+S9jee9riAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYob3V0LmJvc3NfcG9zLnk9PTApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQuYm9zc19wb3M9ZGlzUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG91dC5idWZmX3Bvcy5sZW5ndGg8NClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz16eERhdGEuYnVmZl9wb3NbYnVmZk51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNQb3M9Y2MudjIocG9zLngscG9zLnkrbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZk51bSsrOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzUG9zPWNjLnYyKHBvcy54LHBvcy55K21pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5FbGl0ZSlcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYob3V0LmJ1ZmZfcG9zLmxlbmd0aDw0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOi/meazouayoeaciWJvc3PvvIzlubbkuJTmnIlidWZm77yM5YiZYnVmZuS7o+abv2Jvc3PkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNIYXZlQm9zcz09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9enhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1Bvcz1jYy52Mihwb3MueCxwb3MueSttaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmVCb3NzPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9enhEYXRhLmJ1ZmZfcG9zW2J1ZmZOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1Bvcz1jYy52Mihwb3MueCxwb3MueSttaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz16eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1Bvcz1jYy52Mihwb3MueCxwb3MueSttaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3M9Y2MudjIocG9zLngscG9zLnkrbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXNOZXh0PXRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc05leHQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtaW5ZPXp4RGF0YS5vdGhlcl9wb3NbenhEYXRhLm90aGVyX3Bvcy5sZW5ndGgtMV0ueSs2MC01MDU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoZW5lbXlEYXRhcy5zbGljZSh6eERhdGEub3RoZXJfcG9zLmxlbmd0aCksb3V0LGJ1ZmZOdW0sbWluWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mmL7npLrlhbPljaHmlbDmja5cclxuICAgIHB1YmxpYyBsb2FkTGV2ZWwoKVxyXG4gICAge1xyXG5cclxuICAgICAgICBpZihNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpICYmIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfbG9hZF9vayAmJiAoSGVyby5jdXJfbG9hZGVkX251bT49SGVyby5tYXhfbG9hZF9udW0pICYmIChQZXQuY3VyX2xvYWRlZF9udW0+PVBldC5tYXhfbG9hZF9udW0pICYmIHRoaXMuZmlnaHRpbmdfaW5mbyAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5FbmRsZXNzKXtcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCkrMVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLHdhdmVudW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIit3YXZlbnVtYmVyLy8oRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19f6L+b5p2l5LqGXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckRhdGE9dGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXNbdGhpcy5jdXJfd2F2ZV07XHJcbiAgICAgICAgICAgIGxldCBpc0Jhb1hpYW5nTGV2ZWw9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBNQ009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHVzZVdpZHRoPTYwMDtcclxuICAgICAgICAgICAgbGV0IGxlZnQ9KGNjLndpblNpemUud2lkdGgtdXNlV2lkdGgpLzItY2Mud2luU2l6ZS53aWR0aC8yO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15X2NyZWF0ZV95PWNjLndpblNpemUuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbmVteV9jcmVhdGVfeT0wO1xyXG4gICAgICAgICAgICBsZXQgcmVmcmVzaFRpbWU9MDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlckRhdGEubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1JZD1kYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZT1NQ00uZ2V0U3RyZW5ndGhUeXBlKG1JZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPWRhdGEubnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJMZXZlbD1kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgLy/kuIDnu4TmgKos5q+P57uE5oCq6YO95LiA6Ie055qE77yM5omA5Lul5Y+W5YW25Lit5LiA5Liq5bCx6KGM5LqGXHJcbiAgICAgICAgICAgICAgICAvL+WIhuS4gOS4i+e8nemamSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aD1NQ00uZ2V0TW9uc3RlclNwYWNpbmcobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhOdW1YWD1NYXRoLmZsb29yKHVzZVdpZHRoL3dpZHRoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5XaWR0aD11c2VXaWR0aCVtYXhOdW1YWDtcclxuICAgICAgICAgICAgICAgIHdpZHRoKz1NYXRoLmZsb29yKHJlbWFpbldpZHRoL21heE51bVhYKTtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VJbmRleHM9W107XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHh4PTA7IHh4PG1heE51bVhYOyB4eCsrKXtcclxuICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3jovbTmt7vliqDnmoTmlbDph4/vvIzovr7liLBtYXhOdW1YWOWQju+8jHl5TnVtKytcclxuICAgICAgICAgICAgICAgIGxldCB4eE51bT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5TnVtPTA7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoVGltZSs9ZGF0YS5yZWZyZXNoX3RpbWVcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPG51bTsgbisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdGFsX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5ZCR5LiK5o6S5YiXWVlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeXk9dGhpcy5lbmVteV9jcmVhdGVfeSt3aWR0aCp5eU51bStNYXRoLnJhbmRvbSgpKndpZHRoKjAuNztcclxuICAgICAgICAgICAgICAgICAgICAvL+maj+acuueul+WHulhYXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmRJbmRleD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdXNlSW5kZXhzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz1jYy52MihsZWZ0K3dpZHRoLzIrd2lkdGgqdXNlSW5kZXhzW3JhbmRJbmRleF0rTWF0aC5yYW5kb20oKSoxMC01LHl5KTtcclxuICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMuc3BsaWNlKHJhbmRJbmRleCwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdHJlbmd0aFR5cGUhPVN0cmVuZ3RoVHlwZS5Cb3NzKXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlTW9uc3RlckJ5SWQobUlkLHBvcyxtb25zdGVyTGV2ZWwsZGF0YS5ocF9yYXRlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2NyZWF0ZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93SmlhblRvdVBvcyh0aGlzLmN1cl9jcmVhdGVfbnVtL3RoaXMuY3VyX3RvdGFsX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0scmVmcmVzaFRpbWUrTWF0aC5yYW5kb20oKSooNjAvTUNNLmdldFNwZWVkKG1JZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoeHhOdW0+bWF4TnVtWFgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeXlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHh4TnVtPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHh4PTA7IHh4PG1heE51bVhYOyB4eCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Ub3dlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQm9zcyhtSWQsbW9uc3RlckxldmVsLGRhdGEuaHBfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCxtb25zdGVyTGV2ZWwsZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAgICAgaWYodGhpcy5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpW3RoaXMuY3VyX3dhdmVdPT0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vbnN0ZXJXYXJuaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jaGVja1R1dG90aWFscygpO1xyXG4gICAgICAgICAgICAvL+WboOS4uuWuneeuseWFs+WNoeaYr+aPkui/m+WOu+eahO+8jOaJgOS7peaDs+imgeiOt+WPluWHhuehrueahOaVsOWAvO+8jOmcgOimgeWHj+WOu+WFtuWHuueOsOeahOasoeaVsFxyXG4gICAgICAgICAgICAvL3RoaXMuZHJvcF9kYXRhPUxldmVsSnNvbkRhdGEuZ2V0V2F2ZURyb3BEYXRhKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUtdGhpcy5sZXZlbF9idWZmX251bSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICBsZXQgaXNMb2FkTmV4dD0haXNCYW9YaWFuZ0xldmVsO1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl93YXZlPj10aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0PWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkTmV4dD1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0xvYWROZXh0KXtcclxuICAgICAgICAgICAgICAgIGxldCBkZWx5VD10aGlzLmZpZ2h0aW5nX2luZm8ud2F2ZV9yZWZyZXNoX3RpbWVbdGhpcy5jdXJfd2F2ZSsxXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sZGVseVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5maWdodGluZ19pbmZvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkTGV2ZWxEYXRhcygpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICB9LDAuMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWROZXh0V2F2ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3dhdmU8dGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXMubGVuZ3RoLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YXZlKys7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZExldmVsRGF0YXMoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS7gOS5iOaXtuWAmei/m+adpVwiKVxyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1uZXcgRmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLDApOy8v5rOi5pWwXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFJvdW5kKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9jaGFsbGVuZ2VfbW9kZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89VG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGFkZENoZWNrVHV0b3RpYWxzSGVybyhoZXJvSWQ6SGVyb19UeXBlLGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgaGVyb0luZm86SGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGU9aGVyb0lkO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWw9MTAwO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2U9NTtcclxuICAgICAgICBsZXQgZGF0YT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbylcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChoZXJvSWQsZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCw0LGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIC8qKua3u+WKoOS4gOS4qua7oee6p+a7oeijhea7oeWuoOeJqeeahOiLsembhCAqL1xyXG4gICAgYWRkVHV0b3RpYWxzSGVyb0Z1bGwoaGVyb0lkOkhlcm9fVHlwZSx0ZWFtSW5kZXg6bnVtYmVyLGNhbGxiYWNrOkZ1bmN0aW9uKTpIZXJvRGF0YXtcclxuICAgICAgICBsZXQgaGVyb0luZm86SGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGU9aGVyb0lkO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWw9SGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKGhlcm9JZCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZT0xLy9IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb0lkKTsgICBcclxuICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U9RXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvSWQpO1xyXG4gICAgICAgIGxldCBlcXVpcE1heFN0YWdlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSgpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIxPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMSxlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMj1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDIsZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjM9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgzLGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXI0PUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoNCxlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBzd2l0Y2goaGVyb0lkKXtcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZD03MDQxMztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6e1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkPTcwMjEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6e1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkPTcwMjEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTE6e1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkPTcwMTEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkPTcwMzEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCxkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLHRlYW1JbmRleCxjYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tUdXRvdGlhbHMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfd2F2ZT09NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwMikpeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwMiwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMS9KaWFTdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pWM5Lq65q275Lqh5LqGLOWTquS4quaVjOS6uuatu+S6oeS6hu+8jOWTquS4quiLsembhOWHu+adgOeahFxyXG4gICAgb25FbmVteURpZShzY29yZTpudW1iZXIsaXNBZGQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZihpc0FkZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW0+PXRoaXMuY3VyX3RvdGFsX251bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtPj10aGlzLmN1cl90b3RhbF9udW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWROZXh0V2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgR2FtZU1vZGUuQm9zc19QcnNvbmFsOntcclxuICAgICAgICAgICAgICAgIC8vICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZSs9ZW5lbXlUcy5zY29yZTtcclxuICAgICAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZ2h0Q2VudGVyKCk6Y2MuVmVjMntcclxuICAgICAgICByZXR1cm4gY2MudjIoMCwoNzAwK3RoaXMuZW5lbXlfb2Zmc2V0X3ktdGhpcy5lbmVteV9hdHRfeSkvMit0aGlzLmVuZW15X2F0dF95KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTa2lsbENhbmNlbChpc1Nob3c6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleGl0UGxheUdhbWUoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkX2NhbGxiYWNrPW51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkX2ppc2h1PTA7ICAgICAgICBcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmFsbF9oZXJvPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja1RvSG9tZShzaG93SGVybz86SGVyb19UeXBlKXtcclxuICAgICAgICB0aGlzLnJvbGVfc2hvd19oZXJvPXNob3dIZXJvP3Nob3dIZXJvOkhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX3R5cGUxXCIsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUpXHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lLChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSk9PntcclxuICAgICAgICAgICAgLy/nnJ/lrp7ov5vluqZcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzVHJ1ZT1jb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xyXG4gICAgICAgICAgICAvL+WBh+eahOi/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NGYWxzZT1wcm9ncmVzc1RydWUvMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmc9KGxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcz1wcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGluZ19saWdodC54ID0gdGhpcy5sb2FkaW5nX2Jhci5wcm9ncmVzcyp0aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLXRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgvMjtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmhvbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dEYW5nZXJUZXh0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgZGFuZ2VyVGV4dD1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmKGRhbmdlclRleHQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9kYW5nZXJUZXh0JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW5nZXJUZXh0PWNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19VaS9kYW5nZXJUZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZihkYW5nZXJUZXh0PT1udWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpJyk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dhbWVQYXVzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGF1c2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVBhdXNlVWkoKTtcclxuICAgIH1cclxuICAgIHNob3dCdG5CdWZmKHR5cGUpLy8wOkJ1ZmblsZXnpLogICAx77yaQnVmZumAieaLqVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJ1ZmZEaXNwbGF5LFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0VWkodHlwZSlcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgc2hvd0dhbWVXaW4oKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5omT5a6M5LiA5Zue5ZCI5LqGXCIpXHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfV2luIHx8IHRoaXMuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX0xvc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfV2luO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9yYXRlX3JhbWFpbikpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbixNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfYXV0b19yYW1haW4pKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIGxldCBjdXJTdGFydExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsO1xyXG4gICAgICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ56ysTueroOeOqeWutuaVsCtNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihjdXJTdGFydExldmVsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWujOaIkOaMkeaImOWFs+WNoStjdXJTdGFydExldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw9Y3VyU3RhcnRMZXZlbDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sMSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT0xICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA0KSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSZXdhcmRTU1VpKS5pbml0RGF0YSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMDQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy/lvIDlp4vmraPlvI/lhbPljaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOnsgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuYWRkVG93ZXJMZXZlbCgxKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgLy/mmL7npLrkuInpgInkuIBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrXCIpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDEpOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19KVxyXG4gICAgICAgICAgICAgICAgfSwxKVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v54aK5raI5aSxXHJcbiAgICAgICAgbGV0IHNob3d3YW5nPXRoaXMuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgaWYoc2hvd3dhbmcpe1xyXG4gICAgICAgICAgICBzaG93d2FuZy5vbkdhbWVXaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdFNraWxsKGRlbGF5VGltZTpudW1iZXI9MSlcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgLy/lu7bov5/lsZXnpLpcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9zZWxlY3Rfc2tpbGwnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eTotMTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LGRlbGF5VGltZSk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VubG9ja1NraWxsKHllc0NhbGxiYWNrOkZ1bmN0aW9uLG5vQ2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3VubG9ja191aScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVW5sb2NrU2tpbGwpLmluaXQoeWVzQ2FsbGJhY2ssbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWFrTGV2ZWxTa2lsbCgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgIC8vICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYWluKTtcclxuICAgIC8vICAgICBsZXQgaXNDYW5TaG93PWZhbHNlO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldCBoZXJvOkhlcm89bnVsbDtcclxuICAgIC8vICAgICAgICAgbGV0IGhlcm9UeXBlPXRlYW1MaXN0W2ldO1xyXG4gICAgLy8gICAgICAgICBpZihoZXJvVHlwZT49MClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaGVybz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvW2hlcm9UeXBlXTsgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBpZihoZXJvLmxldmVsX2J1ZmYubGVuZ3RoPHRoaXMubWF4X3NraWxsX3Nsb3QpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXNDYW5TaG93PXRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoaXNDYW5TaG93PT1mYWxzZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMubWF4X3NraWxsX3Nsb3Q9PTEpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v6K+05piO5pyq6KeG6aKR6Kej6ZSBXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dVbmxvY2tTa2lsbCgoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIEFkTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoaXNTdWM6Ym9vbGVhbik9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYoaXNTdWMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4X3NraWxsX3Nsb3Q9MjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlbGVjdFNraWxsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC8v55u05o6l5byA5aeL5LiL5LiA5rOi5oCqXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sVklERU9fVFlQRS5IdW9kb25nKTtcclxuICAgIC8vICAgICAgICAgICAgIH0sKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL+ebtOaOpeW8gOWni+S4i+S4gOazouaAqlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNlXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v55u05o6l5o+Q56S65oqA6IO95ruh5LqG77yM6Lez6L+H5by556qXXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlNraWxsX2lzX2Z1bGwpKTtcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfWVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2hvd1NlbGVjdFNraWxsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIG9uRnVodW8oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZzs7XHJcblxyXG4gICAgICAgIGxldCBkYW5nZXJUZXh0PWNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19VaS9kYW5nZXJUZXh0Jyk7XHJcbiAgICAgICAgaWYoZGFuZ2VyVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhbmdlclRleHQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93RnVodW8oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvZnVodW9fdWknLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnVodW9fbnVtLS07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dhbWVMb3NlKClcclxuICAgIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWksei0pVwiLClcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9Mb3NlIHx8IHRoaXMuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1dpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9Mb3NlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9yYXRlX3JhbWFpbikpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbixNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfYXV0b19yYW1haW4pKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZVVpKCk7XHJcbiAgICAgICAgICAgICAgICB9LDEpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZVVpKCk7XHJcbiAgICAgICAgICAgICAgICB9LDEpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaXoOWwveaMkeaImOiDnOWIqVwiKVxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7IFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJCb3Nz5oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgb25XYWxsRGllKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZnVodW9fbnVtPjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0Z1aHVvKCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9uc3Rlcldhcm5pbmcoKXtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfRW5lbXlDb21pbmcpO1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZyxjYy52MigwLDApLFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUpO1xyXG4gICAgICAgIG5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjI1LHtvcGFjaXR5OjI1NX0pLnRvKDAuNSx7b3BhY2l0eToxMDB9KS50bygwLjUse29wYWNpdHk6MjU1fSkudG8oMC41LHtvcGFjaXR5OjEwMH0pLnRvKDAuNSx7b3BhY2l0eToyNTV9KS50bygwLjI1LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQudWlfbW9uc3Rlcl93YXJuaW5nLG5vZGUpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Jvc3NXYXJuaW5nKClcclxuICAgIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9ib3NzX3dhcm5pbmcnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgY2h1eGlhbkFjdD0wLjM7XHJcbiAgICAgICAgICAgIGxldCB4aWFvc2hpQWN0PTAuMTU7XHJcbiAgICAgICAgICAgIGxldCB0aW5nbGl1QWN0PTI7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIGxldCBhdXRvPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2F1dG8nKTtcclxuICAgICAgICAgICAgYXV0by54PS0zMjA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGF1dG8pLnRvKGNodXhpYW5BY3Qse3g6MzIwfSkudG8oMix7eDoxMDgwfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nTGFiZWw9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FybmluZ0xhYmVsJyk7XHJcbiAgICAgICAgICAgIHdhcm5pbmdMYWJlbC54PTY0MDtcclxuICAgICAgICAgICAgY2MudHdlZW4od2FybmluZ0xhYmVsKS50byhjaHV4aWFuQWN0LHt4OjB9KS50bygwLjI1LHtzY2FsZToxLjF9KS50bygwLjI1LHtzY2FsZToxLjB9KS50bygwLjI1LHtzY2FsZToxLjF9KS50bygwLjI1LHtzY2FsZToxLjB9KS50bygwLjI1LHtzY2FsZToxLjF9KS50bygwLjI1LHtzY2FsZToxLjB9KS50byh4aWFvc2hpQWN0LHt4Oi02NDB9KS5zdGFydCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYm9zc0xhYmVsPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3NMYWJlbCcpO1xyXG4gICAgICAgICAgICBib3NzTGFiZWwueD0tNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihib3NzTGFiZWwpLnRvKGNodXhpYW5BY3Qse3g6MH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKHhpYW9zaGlBY3Qse3g6NjQwfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgbGV0IGVmZmVjdHM9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZWZmZWN0cycpO1xyXG4gICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgY2MudHdlZW4oZWZmZWN0cykuZGVsYXkoY2h1eGlhbkFjdCswLjIpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pLmRlbGF5KHRpbmdsaXVBY3QtY2h1eGlhbkFjdC0wLjIpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5kZWxheSh0aW5nbGl1QWN0KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMix7eToyMDB9KS5kZWxheSgwLjUpLnRvKDAuMix7c2NhbGU6MS4yfSkudG8oMC4yLHtzY2FsZTowLjh9KS50bygwLjEse3NjYWxlOjMyLG9wYWNpdHk6MH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTb3VuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnNhdmVNdXNpY1ZvbHVtZSgpO1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5zYXZlTXVzaWNNdXRlKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnNhdmVTb3VuZFZvbHVtZSgpO1xyXG4gICAgICAgIHRoaXMuc291bmRfbWFuYWdlci5zYXZlU291bmRNdXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NwZWVkVXBVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9zcGVlZF91aScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgXHJcbiAgICByZWZyZXNoQ29pblNob3coKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKXtcclxuICAgICAgICAgICAgbGV0IGhvbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZihob21lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hHZW1TaG93KCk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lICl7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYoaG9tZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hMb25nSmluZ1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lICl7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYoaG9tZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoTG9uZ0ppbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVXNlckV4cFNob3coKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lICl7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYoaG9tZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoVXNlckV4cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGp1bW9Ub1VpKGluZGV4OkJ0bl9JbmRleCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKS5qdW1vVG9VaShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAganVtb0FuZFNob3dVaSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lICl7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaG9tZS5jaGVha1VubG9jaygpO1xyXG4gICAgICAgICAgICBob21lLnNob3dVaSgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2haaGFubGlTaG93KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSApe1xyXG4gICAgICAgICAgICBsZXQgaG9tZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmKGhvbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaFpoYW5MaVNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG9wU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaG9tZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmKGhvbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhvbWUucmVmcmVzaFRvcCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEd1YUppR2lmdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnRuT2ZmbGluZUdpZnQ9Y2MuZmluZCgnQ2FudmFzL21haW5fdWkvYnRuT2ZmbGluZUdpZnQnKTtcclxuICAgICAgICAgICAgYnRuT2ZmbGluZUdpZnQuZ2V0Q29tcG9uZW50KEd1YUppR2lmdCkuY2hlYWsoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyByZWZyZXNoUm9sZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZSE9R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCByb2xlVWk9Y2MuZmluZCgnQ2FudmFzL3JvbGVfdWknKTtcclxuICAgIC8vICAgICBpZihyb2xlVWkuYWN0aXZlPT10cnVlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcm9sZVVpLmdldENvbXBvbmVudChSb2xlVWkpLm9uRW5hYmxlKCk7XHJcbiAgICAvLyAgICAgfSAgICAgICAgXHJcbiAgICAvLyB9ICAgIFxyXG4gICAgXHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWuoOeJqS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEBwYXJhbSBudW0g5aKe5Yqg55qE5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQZXRBY3RpdmVEcHMocGV0SWQ6UGV0SW5mbyxudW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgbm93TnVtPXRoaXMuZ2V0UGV0QWN0aXZlRHBzKHBldElkKTtcclxuICAgICAgICBsZXQgbmV3TnVtPW5vd051bStudW07XHJcbiAgICAgICAgdGhpcy5zZXRQZXRBY3RpdmVEcHMocGV0SWQsbmV3TnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeeahGRwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0QWN0aXZlRHBzKHBldElkOlBldEluZm8pOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXRfYWN0aXZlX2Rwcy5nZXQocGV0SWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHNldFBldEFjdGl2ZURwcyhwZXRJZDpQZXRJbmZvLG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KHBldElkLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhZGRQZXRDb25uZWN0RHBzKHBldElkOlBldEluZm8sbnVtOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG5vd051bT10aGlzLmdldFBldENvbm5lY3REcHMocGV0SWQpO1xyXG4gICAgICAgIGxldCBuZXdOdW09bm93TnVtK251bTtcclxuICAgICAgICB0aGlzLnNldFBldENvbm5lY3REcHMocGV0SWQsbmV3TnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeeahGRwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0Q29ubmVjdERwcyhwZXRJZDpQZXRJbmZvKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0X2Nvbm5lY3RfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc2V0UGV0Q29ubmVjdERwcyhwZXRJZDpQZXRJbmZvLG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzLnNldChwZXRJZCxudW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=