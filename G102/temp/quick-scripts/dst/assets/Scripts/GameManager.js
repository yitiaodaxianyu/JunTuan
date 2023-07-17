
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
        //游戏动画存储数据
        _this.moveData = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQTRKO0FBTTVKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUNyRCx5Q0FBb0M7QUFDcEMscURBQTRFO0FBQzVFLGtEQUE2QztBQUM3QywwQ0FBcUQ7QUFDckQsNkNBQXdDO0FBQ3hDLHVEQUE2RDtBQUU3RCx5REFBb0Q7QUFDcEQsa0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3QyxvRUFBK0Q7QUFDL0QseURBQStEO0FBQy9ELDBFQUFnRjtBQUVoRiw0RUFBa0Y7QUFDbEYscURBQWdEO0FBSXpDLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBODlDQztRQTE5Q1csaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFDdEMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQVcsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDaEQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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LFlBQVksQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFNLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0MsU0FBUyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNqQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMs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QUUsQ0FBQyxTQUFTLEdBODlDcEQ7a0JBOTlDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEdhbWVTY2VuZSwgR2FtZVN0YXRlLCBHb19UeXBlLCBJc0RlYnVnLCBTZWxlY3RTa2lsbF9UeXBlLCBWSURFT19UWVBFLCBaaGVuZ19YaW5nX1R5cGUsR2FtZU1vZGUsIEZpZ2h0aW5nSW5mbywgSmlhU3V9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ2h1U2hlbmdEaWFuIGZyb20gXCIuL0dhbWUvQ2h1U2hlbmdEaWFuXCI7XHJcbmltcG9ydCBFbmVteUhwTWFuYWdlciBmcm9tIFwiLi9FbmVteS9FbmVteUhwTWFuYWdlclwiO1xyXG5pbXBvcnQgSHBUZXh0SHBNYW5hZ2VyIGZyb20gXCIuL01vbnN0ZXIvSHBUZXh0TWFuYWdlclwiO1xyXG5pbXBvcnQgTXVzaWMgZnJvbSBcIi4vU291bmQvTXVpc2NcIjtcclxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL1NvdW5kL1NvdW5kXCI7XHJcbmltcG9ydCBIb21lIGZyb20gXCIuL0hvbWVcIjtcclxuaW1wb3J0IEhpbnQgZnJvbSBcIi4vSGludFwiO1xyXG5pbXBvcnQgR2V0VGlwIGZyb20gXCIuL1VJL0dldFRpcFwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lL0dhbWVcIjtcclxuaW1wb3J0IERpYWxvZyBmcm9tIFwiLi9VSS9EaWFsb2dcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IHsgIFJld2FyZERhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCBMb2NhbFZpZGVvIGZyb20gXCIuL0xvY2FsVmlkZW9cIjtcclxuaW1wb3J0IHtIZXJvRGF0YX0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBVbmxvY2tTa2lsbCBmcm9tIFwiLi9VSS9VbmxvY2tTa2lsbFwiO1xyXG5pbXBvcnQgeyBaaGVuWGluZ0RhdGEgfSBmcm9tIFwiLi9aaGVuWGluZ0RhdGFcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCBCb3NzTWFuYWdlciBmcm9tIFwiLi9Cb3NzL0Jvc3NNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJDb25maWd1cmUsIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi9QZXQvR2FtZS9QZXRcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9cIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlRGF0YSwgSGVyb0luZm8sIEhlcm9fVHlwZSB9IGZyb20gXCIuL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBHdWFKaUdpZnQgZnJvbSBcIi4vR3VhSmkvVWkvR3VhSmlHaWZ0XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IEdhbWVXaW4gZnJvbSBcIi4vR2FtZS9VaS9HYW1lV2luXCI7XHJcbmltcG9ydCB7IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZkRpc3BsYXkgZnJvbSBcIi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9CdWZmRGlzcGxheVwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL0V4Y2x1c2l2ZUVuaGFuY2VtZW50XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlV2VhcG9uTWVzc2FnZVwiO1xyXG5pbXBvcnQgUmV3YXJkU1NVaSBmcm9tIFwiLi9UdXRvcmlhbHMvUmV3YXJkU1NVaVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzc30gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnR7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVmYWJfaGludDpjYy5QcmVmYWI9bnVsbDtcclxuICAgIHByaXZhdGUgcHJlZmFiX2dldF90aXA6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSE9NRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJvbGVfc2hvd19oZXJvOkhlcm9fVHlwZT1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdhbWUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL+WQhOenjeeuoeeQhuWZqFxyXG4gICAgZ2FtZTpHYW1lPW51bGw7XHJcbiAgICBlbmVteV9ocF9tYW5hZ2VyOkVuZW15SHBNYW5hZ2VyPW51bGw7XHJcbiAgICBocF90ZXh0X21hbmFnZXI6SHBUZXh0SHBNYW5hZ2VyPW51bGw7XHJcbiAgICBjaHVfc2hlbmdfZGlhbjpDaHVTaGVuZ0RpYW49bnVsbDtcclxuICAgIC8v5aOw6Z+zXHJcbiAgICBzb3VuZF9tYW5hZ2VyOlNvdW5kPW51bGw7XHJcbiAgICBtdXNpY19tYW5hZ2VyOk11c2ljPW51bGw7XHJcbiAgICAvL+WQhOWkp+iLsembhOeahFxyXG4gICAgYWxsX2hlcm86TWFwPG51bWJlcixIZXJvPj1udWxsO1xyXG4gICAgLy9EUFPnu5/orqFcclxuICAgIGhlcm9fc2tpbGxfZHBzOm51bWJlcltdPW51bGw7XHJcbiAgICBoZXJvX2F0dGFja19kcHM6bnVtYmVyW109bnVsbDtcclxuICAgIC8qKuWuoOeJqeS4u+WKqOaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfYWN0aXZlX2RwczpNYXA8UGV0SW5mbyxudW1iZXI+PW51bGw7XHJcbiAgICAvKirlrqDnianov57mkLrmioDog73pgKDmiJDnmoTkvKTlrrMgKi9cclxuICAgIHByaXZhdGUgcGV0X2Nvbm5lY3RfZHBzOk1hcDxQZXRJbmZvLG51bWJlcj49bnVsbDtcclxuXHJcbiAgICBjdXJfZ2FtZV9zdGF0ZTpHYW1lU3RhdGU9R2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICBjdXJfZ2FtZV9tb2RlOkdhbWVNb2RlPUdhbWVNb2RlLk1haW47XHJcbiAgICBjdXJfZ2FtZV9zY2VuZTpHYW1lU2NlbmU9R2FtZVNjZW5lLmhvbWU7XHJcblxyXG4gICAgLy/lvZPliY3nmoTliqDovb3ov5vluqZcclxuICAgIGN1cl9sb2FkX3Byb2dyZXNzOm51bWJlcj0wO1xyXG5cclxuICAgIC8v5q+P5Liq6Iux6ZuE6I635b6X55qE5ri45oiP5YaF5oqA6IO9XHJcbiAgICBpbmdhbWVfc2tpbGxzOlNlbGVjdFNraWxsX1R5cGVbXT1bXTtcclxuICAgIC8v5byA5aeL55qE5YWz5Y2h55qE5pWw5o2uXHJcbiAgICBjdXJfd2F2ZTpudW1iZXI9MDtcclxuICAgIGZpZ2h0aW5nX2luZm86RmlnaHRpbmdJbmZvPW51bGw7XHJcbiAgICAvL2Ryb3BfZGF0YTpEcm9wRGF0YT1udWxsO1xyXG4gICAgcmV3YXJkX2RhdGE6UmV3YXJkRGF0YVtdPVtdO1xyXG4gICAgaXNfbG9hZGVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvL+aOieiQveeJqeWTgeeahOaAqueJqWlkXHJcbiAgICAvL2Ryb3BfZW5lbXlfdHlwZTpudW1iZXI9MDtcclxuXHJcbiAgICBnYW1lX3RvX2hvbWU6R29fVHlwZT1Hb19UeXBlLk1haW47XHJcblxyXG4gICAgZnVodW9fbnVtOm51bWJlcj0xO1xyXG4gICAgaXNfc2hvd190ZXh0OmJvb2xlYW49dHJ1ZTtcclxuICAgIC8v5pyA5aSn55qE5oqA6IO95qe95L2NXHJcbiAgICBtYXhfc2tpbGxfc2xvdDpudW1iZXI9MjtcclxuICAgIC8v5ZCE5Liq6Iux6ZuE5pWw5o2u77yM5ri45oiP5YaF5L2/55So77yM5YWz5Y2h5YaFYnVmZuOAglxyXG4gICAgZ2FtZV9oZXJvX2RhdGE6TWFwPG51bWJlcixIZXJvRGF0YT49bnVsbDtcclxuICAgIC8v56ys5Yeg5Liq5oCq5pyJ5Y+v6IO954iG5pif5pifYnVmZlxyXG4gICAgLy9zdGFyX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLy9cclxuICAgIC8qKuW9k+WJjeaAu+WFseeahOaAqueJqeaVsOmHjyAqL1xyXG4gICAgY3VyX3RvdGFsX251bTpudW1iZXI9MDtcclxuICAgIC8qKuWunumZheS4iuW3sue7j+eUn+aIkOWHuuaAqueJqeeahOaVsOmHjyAqL1xyXG4gICAgY3VyX2NyZWF0ZV9udW06bnVtYmVyPTA7XHJcbiAgICBlbmVteV9vZmZzZXRfeTpudW1iZXI9MDtcclxuICAgIGVuZW15X2F0dF95Om51bWJlcj0tMzAwO1xyXG4gICAgZW5lbXlfY3JlYXRlX3k6bnVtYmVyPTEwODA7XHJcbiAgICBsb2FkX2ppc2h1Om51bWJlcj0wO1xyXG4gICAgbG9hZF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgamlzaHVfdGltZTpudW1iZXI9MDsgICAgXHJcbiAgICAvL+mAmuWFs+asoeaVsFxyXG4gICAgcGFzc19sZXZlbF9udW06bnVtYmVyPTA7XHJcbiAgICAvKirmuLjmiI/pgJ/njocgKi9cclxuICAgIHByaXZhdGUgZ2FtZV9yYXRlOm51bWJlcj0xO1xyXG4gICAgLyoq5oyJ6ZKu5oyH5a6a6YCf546HICovXHJcbiAgICBwcml2YXRlIGJ0bl9zZXR1cF9yYXRlOm51bWJlcj0xO1xyXG4gICAgLyoq5oiY5paX5oyH5a6a6YCf546HICovXHJcbiAgICBwcml2YXRlIGZpZ2h0aW5nX3NldHVwX3JhdGU6bnVtYmVyPTE7XHJcbiAgICAvKirljZXmrKHmnIDpq5jkvKTlrrPlgLwgKi9cclxuICAgIHByaXZhdGUgbWF4X2RhbWFnZTpudW1iZXI9MDtcclxuICAgIC8qKuWNleasoeacgOWwj+S8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtaW5fZGFtYWdlOm51bWJlcj05OTk5O1xyXG4gICAgLyoq6Ieq5Yqo5oiY5paX5qCH6K+GICovXHJcbiAgICBwdWJsaWMgYXV0b19maWdodGluZzpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5b2T5YmN55qE6Zif5YiXICovXHJcbiAgICBwdWJsaWMgY3VyX3RlYW1fbGlzdDpudW1iZXJbXT1bXTtcclxuICAgIC8v5piv5ZCm5pi+56S65LqG6YCA5Ye65ri45oiP55qE5a+56K+d5qGGXHJcbiAgICBwdWJsaWMgaXNfc2hvd19leGl0OmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgLy/muLjmiI/liqjnlLvlrZjlgqjmlbDmja5cclxuICAgIHB1YmxpYyBtb3ZlRGF0YTogQXJyYXk8Y2MuVmVjMj4gPSBbXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpHYW1lTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZUxvYWRlcm9uXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIGluaXQgKHNjZW5lOkdhbWVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc2NlbmU9c2NlbmU7XHJcbiAgICAgICAgdGhpcy5pc19sb2FkZWQ9ZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2dhbWVfc2NlbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVTY2VuZS5ob21lOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3M9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXRQbGF5R2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnJvbGVfc2hvd19oZXJvPUhlcm9fVHlwZS5TaGVTaG91O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmdhbWU6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsX2hlcm89bmV3IE1hcDxudW1iZXIsSGVybz4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzPW51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzPW51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3RhbF9udW09dGhpcy5jdXJfY3JlYXRlX251bT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmdhbWVfc2tpbGxzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfZGF0YT1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVodW9fbnVtPTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9fZmlnaHRpbmc9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5BdXRvRmlnaHRpbmcpPjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp0aGlzLmN1cl9sb2FkX3Byb2dyZXNzPTA7YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blNldHVwUmF0ZShyYXRlOm51bWJlcixpc0FjdGl2aXR5OmJvb2xlYW49dHJ1ZSl7XHJcbiAgICAgICAgdGhpcy5idG5fc2V0dXBfcmF0ZT1yYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgaWYoaXNBY3Rpdml0eSl7XHJcbiAgICAgICAgICAgIGlmKHJhdGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+WFs+mXreaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXV0b0ZpZ2h0aW5nKGlzQXV0bzpib29sZWFuLGlzQWN0aXZpdHk6Ym9vbGVhbj10cnVlKXtcclxuICAgICAgICB0aGlzLmF1dG9fZmlnaHRpbmc9aXNBdXRvO1xyXG4gICAgICAgIGlmKGlzQWN0aXZpdHkpe1xyXG4gICAgICAgICAgICBpZihpc0F1dG8pe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+WFs+mXreaIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ0blNldHVwUmF0ZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5idG5fc2V0dXBfcmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWdodGluZ1JhdGUocmF0ZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfc2V0dXBfcmF0ZT1yYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZVJhdGUocmF0ZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZ2FtZV9yYXRlPXJhdGUqdGhpcy5idG5fc2V0dXBfcmF0ZSp0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGU7XHJcbiAgICAgICAgY2Mua1NwZWVkKHRoaXMuZ2FtZV9yYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lUmF0ZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSYXRlKCl7XHJcbiAgICAgICAgdGhpcy5nYW1lX3JhdGU9MTtcclxuICAgICAgICBjYy5rU3BlZWQodGhpcy5nYW1lX3JhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1heERhbWFnZShudW06bnVtYmVyKXtcclxuICAgICAgICBpZihudW0+dGhpcy5tYXhfZGFtYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5tYXhfZGFtYWdlPW51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4RGFtYWdlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWluRGFtYWdlKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKG51bTx0aGlzLm1pbl9kYW1hZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9kYW1hZ2U9bnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNaW5EYW1hZ2UoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWluX2RhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0U2NhbGUoZGFtYWdlOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlPTEuNDtcclxuICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xO1xyXG4gICAgICAgIGxldCByYXRlPWRhbWFnZS90aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIHNjYWxlVmFsdWU9cmF0ZSptYXhTY2FsZTtcclxuICAgICAgICBpZihzY2FsZVZhbHVlPDEpe1xyXG4gICAgICAgICAgICBzY2FsZVZhbHVlPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNjYWxlVmFsdWU+bWF4U2NhbGUpe1xyXG4gICAgICAgICAgICBzY2FsZVZhbHVlPW1heFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIGxldCByYXRlPWRhbWFnZS90aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIGlmKHJhdGU8MC4yKXtcclxuICAgICAgICAgICAgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIH1lbHNlIGlmKHJhdGU8MC40KXtcclxuICAgICAgICAgICAgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8yO1xyXG4gICAgICAgIH1lbHNlIGlmKHJhdGU8MC42KXtcclxuICAgICAgICAgICAgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8zO1xyXG4gICAgICAgIH1lbHNlIGlmKHJhdGU8MC44KXtcclxuICAgICAgICAgICAgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF80O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlZmZlY3RJZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvKGhlcm9JZDpIZXJvX1R5cGUpOkhlcm97XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsX2hlcm8uZ2V0KGhlcm9JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEdhbWVIZXJvRGF0YSgpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgaXNJbml0RHBzPWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighdGhpcy5oZXJvX2F0dGFja19kcHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHM9bmV3IE1hcDxQZXRJbmZvLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcz1uZXcgTWFwPFBldEluZm8sbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGE9bmV3IE1hcDxudW1iZXIsSGVyb0RhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5jdXJfdGVhbV9saXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QodGhpcy5jdXJfZ2FtZV9tb2RlKTtcclxuXHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nRGF0YT1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGaWdodGluZ0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGE9bmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxIZXJvX1R5cGUuSGVyb19OdW07IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGlzSW5pdERwcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGE9bmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIGxldCBob21lSGVyb0RhdGE9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShpKTtcclxuICAgICAgICAgICAgaWYoaG9tZUhlcm9EYXRhKXtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhPWNjLmluc3RhbnRpYXRlKGhvbWVIZXJvRGF0YSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfdGVhbV9saXN0LmluY2x1ZGVzKGkpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/t+Wuq+aooeW8j+WKoOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWF6ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnRvdGFsX2F0dGFjays9KGZpZ2h0aW5nRGF0YS5BdHRhY2tQZXIpKmhlcm9EYXRhLmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9kZWZlbnNlKz0oZmlnaHRpbmdEYXRhLkRlZmVuc2VQZXIpKmhlcm9EYXRhLmZpeF9kZWZlbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5Dcml0aWNhbCs9ZmlnaHRpbmdEYXRhLkNyaXRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLkhpdCs9ZmlnaHRpbmdEYXRhLkhpdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoKz1oZXJvRGF0YS50b3RhbF9ocCowLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UrPWhlcm9EYXRhLnRvdGFsX2RlZmVuc2UqMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzKz1oZXJvRGF0YS5NaXNzKjAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsKz1oZXJvRGF0YS5BbnRpQ3JpdGljYWwqMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCs9aGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwqMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2srPWhlcm9EYXRhLnRvdGFsX2F0dGFjayowLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCs9aGVyb0RhdGEuSGl0KjAuMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzLnNldChoZXJvRGF0YS5wZXRfaW5mbywwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhEYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKmhlcm9EYXRhLkV4dHJhQ3JpdGljYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLGhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaW5pdFdhbGwobWFpbldhbGxEYXRhLFdhbGxUeXBlLk1haW4pOyAgICAgICAgXHJcbiAgICAgICAgLy8gaWYoaHA8MzAwMCl7XHJcbiAgICAgICAgLy8gICAgIGhwPTMwMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRlZmVuc2U8MTAwKXtcclxuICAgICAgICAvLyAgICAgZGVmZW5zZT0xMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy53YWxsX2RhdGEuaW5pdEluaGVyaXREYXRhKGhwLGRlZmVuc2UsbWlzcyxhbnRpQ3JpdGljYWwsYW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgaXNJbml0RHBzPWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighdGhpcy5oZXJvX2F0dGFja19kcHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8SGVyb19UeXBlLkhlcm9fTnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihpc0luaXREcHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHM9bmV3IE1hcDxQZXRJbmZvLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcz1uZXcgTWFwPFBldEluZm8sbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGE9bmV3IE1hcDxudW1iZXIsSGVyb0RhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5jdXJfdGVhbV9saXN0PVtIZXJvX1R5cGUuU2hvdVdhbmcsSGVyb19UeXBlLkFOdUJpU2ksSGVyb19UeXBlLlpoZW5EZSxIZXJvX1R5cGUuTWVpTW8sSGVyb19UeXBlLkxlaVNoZW5dO1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGE9bmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmN1cl90ZWFtX2xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGE9dGhpcy5hZGRUdXRvdGlhbHNIZXJvRnVsbCh0aGlzLmN1cl90ZWFtX2xpc3RbaV0saSxudWxsKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCs9aGVyb0RhdGEudG90YWxfaHAqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSs9aGVyb0RhdGEudG90YWxfZGVmZW5zZSowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzKz1oZXJvRGF0YS5NaXNzKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCs9aGVyb0RhdGEuQW50aUNyaXRpY2FsKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsKz1oZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2srPWhlcm9EYXRhLnRvdGFsX2F0dGFjayowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQrPWhlcm9EYXRhLkhpdCowLjI7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLDApO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjaypoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICB0aGlzLnNldE1pbkRhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGksaGVyb0RhdGEpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5pbml0V2FsbChtYWluV2FsbERhdGEsV2FsbFR5cGUuTWFpbik7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTWFpbldhbGxEYXRhKCl7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YT1uZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuYWxsX2hlcm8uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGE9Y2MuaW5zdGFudGlhdGUodi5oZXJvX2RhdGEpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoKz1oZXJvRGF0YS50b3RhbF9ocCowLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlKz1oZXJvRGF0YS50b3RhbF9kZWZlbnNlKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MrPWhlcm9EYXRhLk1pc3MqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsKz1oZXJvRGF0YS5BbnRpQ3JpdGljYWwqMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwrPWhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjays9aGVyb0RhdGEudG90YWxfYXR0YWNrKjAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCs9aGVyb0RhdGEuSGl0KjAuMjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5yZWZyZXNoV2FsbERhdGEobWFpbldhbGxEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRUaXAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLnByZWZhYl9oaW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiX2hpbnQ9YXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucHJlZmFiX2dldF90aXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfZ2V0X3RpcD1hc3NldHM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TWVzc2FnZShtZXNzYWdlOnN0cmluZyxkdD86bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucHJlZmFiX2hpbnQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGludCcsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQ9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGhpbnQucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGludEpzPWhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLGR0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBoaW50PWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2hpbnQpO1xyXG4gICAgICAgICAgICBoaW50LnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBsZXQgaGludEpzPWhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICBoaW50SnMuc2hvd0hpbnRNZXNzYWdlKG1lc3NhZ2UsZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93R2V0VGlwKGdldE5vZGU6Y2MuTm9kZSxjYWxsQmFjaz86RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5wcmVmYWJfaGludD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdnZXRfdGlwJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkU2hvd0dldFBvcnAoZ2V0Tm9kZSxjYWxsQmFjayk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsY2FsbEJhY2spOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd011bHRpcGxlR2V0VGlwKGdldE5vZGVzOmNjLk5vZGVbXSxjYWxsQmFjaz86RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5wcmVmYWJfaGludD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdnZXRfdGlwJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLGNhbGxCYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZE11bHRpcGxlUG9ycChnZXROb2RlcyxjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dEaWFsb2cobWVzc2FnZTpzdHJpbmcseWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbixzaG93VHlwZT86bnVtYmVyLHk/Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmlzX3Nob3dfZXhpdD09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X2V4aXQ9dHJ1ZTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZGlhbG9nJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChEaWFsb2cpLnNob3dEaWFsb2cobWVzc2FnZSx5ZXNDYWxsYmFjayxub0NhbGxiYWNrLHNob3dUeXBlLHkpO1xyXG4gICAgICAgICAgICBpZih5KXtcclxuICAgICAgICAgICAgICAgIG5vZGUueT15O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0J1eURpYWxvZyhtZXNzYWdlOnN0cmluZyx5ZXNDYWxsYmFjazpGdW5jdGlvbixub0NhbGxiYWNrOkZ1bmN0aW9uLHNob3dUeXBlPzpudW1iZXIseT86c3RyaW5nIHwgbnVtYmVyLGN1cnJlbmN5PzpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2RpYWxvZycsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGlhbG9nKS5zaG93RGlhbG9nKG1lc3NhZ2UseWVzQ2FsbGJhY2ssbm9DYWxsYmFjayxzaG93VHlwZSx5LGN1cnJlbmN5KTtcclxuICAgICAgICAgICAgLy8gaWYoeSl7XHJcbiAgICAgICAgICAgIC8vICAgICBub2RlLnk9eTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93TG9jYWxWaWRlbyh5ZXNDYWxsYmFjazpGdW5jdGlvbixub0NhbGxiYWNrOkZ1bmN0aW9uLGlzVmlkZW8/OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3ZpZGVvX2RpYWxvZycsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTG9jYWxWaWRlbykuaW5pdCh5ZXNDYWxsYmFjayxub0NhbGxiYWNrKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1HQU1FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzdGFydE5leHRMZXZlbCgpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZT0wO1xyXG4gICAgICAgIHRoaXMuY3VyX3RvdGFsX251bT0wO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUFsbERyb3AoKTtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lBbGxNb25zdGVyKCk7ICAgICAgICBcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1UdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICB2LnJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPVRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlcj1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwwKTsvL+azouaVsFxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiLFJvdW5kKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFJvdW5kKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhcnROZXh0TGV2ZWwoKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubG9hZExldmVsLDAuNSk7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnJlc3VtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W6Zi15YiX57G75Z6LXHJcbiAgICBnZXRaaGVuZ1hpbmdEYXRhKCk6WmhlblhpbmdEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHdhdmVEYXRhPXRoaXMuZmlnaHRpbmdfaW5mb1t0aGlzLmN1cl93YXZlXTsgICAgICAgIFxyXG4gICAgICAgIC8v6Kej5p6Q6Zi15Z6L5pWw5o2uXHJcbiAgICAgICAgbGV0IHp4RGF0YT1uZXcgWmhlblhpbmdEYXRhKCk7XHJcbiAgICAgICAgbGV0IGFsbEVuZW15RGF0YT1uZXcgQXJyYXk8SnNvbk1vbnN0ZXJDb25maWd1cmU+KCk7XHJcbiAgICAgICAgbGV0IE1DTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHdhdmVEYXRhLm1vbnN0ZXJfbnVtLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1JZD13YXZlRGF0YS5tb25zdGVyX2lkW2ldO1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGE9TUNNLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1JZCk7XHJcbiAgICAgICAgICAgIGxldCBlbmVteU51bT13YXZlRGF0YS5tb25zdGVyX251bVtpXTtcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48ZW5lbXlOdW07IG4rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWxsRW5lbXlEYXRhLnB1c2goanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LqM5qyh5aSE55CG77yM5oqKYm9zc+i3n2J1ZmbmgKrmlL7mnIDliY3pnaJcclxuICAgICAgICBhbGxFbmVteURhdGEuc29ydCgoYTpKc29uTW9uc3RlckNvbmZpZ3VyZSxiOkpzb25Nb25zdGVyQ29uZmlndXJlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYi5TdHJlbmd0aFR5cGUtYS5TdHJlbmd0aFR5cGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShhbGxFbmVteURhdGEsenhEYXRhLDAsMCk7XHJcbiAgICAgICAgcmV0dXJuIHp4RGF0YTtcclxuICAgIH1cclxuICAgIGdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGVuZW15RGF0YXM6SnNvbk1vbnN0ZXJDb25maWd1cmVbXSxvdXQ6WmhlblhpbmdEYXRhLGJ1ZmZOdW06bnVtYmVyLG1pblk6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8v6Zi15Z6LXHJcbiAgICAgICAgbGV0IHp4VHlwZT1aaGVuZ19YaW5nX1R5cGUuWlgwO1xyXG4gICAgICAgIC8v6ZqP5py65LiA5Liq6Zi15Z6LXHJcbiAgICAgICAgenhUeXBlPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpaaGVuZ19YaW5nX1R5cGUubnVtKTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgenhUeXBlPVpoZW5nX1hpbmdfVHlwZS7nrq3lpLQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCB6eERhdGE9bmV3IFpoZW5YaW5nRGF0YSgpO1xyXG4gICAgICAgIC8venhEYXRhPXRoaXMuZ2FtZS56aGVuX3hpbmcuanNvblt6eFR5cGVdO1xyXG4gICAgICAgIGxldCBsZW49ZW5lbXlEYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGlzTmV4dD1mYWxzZTtcclxuICAgICAgICBsZXQgb3RoZXJOdW09MDtcclxuICAgICAgICBsZXQgaXNIYXZlQm9zcz1mYWxzZTtcclxuICAgICAgICBsZXQgZXdhaU51bT0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVCb3NzPXRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGk8KHp4RGF0YS5vdGhlcl9wb3MubGVuZ3RoK2V3YWlOdW0pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkJvc3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3kuIDkuIvmmK/lkKZib3Nz5L2N572u5bey57uP55So5LqG77yM5aaC5p6c55So5LqG5Luj6KGo6L+Z5YWz5pyJMuS4qmJvc3PvvIzpnIDopoHmiorov5nkuKpib3Nz5pS+5YiwYnVmZuS9jee9ruS4ilxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3M9enhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3M9Y2MudjIocG9zLngscG9zLnkrbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuYvliY3msqHmnInorr7nva5ib3Nz5L2N572uICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihvdXQuYm9zc19wb3MueT09MClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5ib3NzX3Bvcz1kaXNQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3V0LmJ1ZmZfcG9zLmxlbmd0aDw0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXp4RGF0YS5idWZmX3Bvc1tidWZmTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc1Bvcz1jYy52Mihwb3MueCxwb3MueSttaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmTnVtKys7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9enhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNQb3M9Y2MudjIocG9zLngscG9zLnkrbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkVsaXRlKVxyXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihvdXQuYnVmZl9wb3MubGVuZ3RoPDQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c6L+Z5rOi5rKh5pyJYm9zc++8jOW5tuS4lOaciWJ1ZmbvvIzliJlidWZm5Luj5pu/Ym9zc+S9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpc0hhdmVCb3NzPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz16eERhdGEuYm9zc19wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zPWNjLnYyKHBvcy54LHBvcy55K21pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZUJvc3M9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz16eERhdGEuYnVmZl9wb3NbYnVmZk51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zPWNjLnYyKHBvcy54LHBvcy55K21pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zPWNjLnYyKHBvcy54LHBvcy55K21pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3M9enhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1Bvcz1jYy52Mihwb3MueCxwb3MueSttaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc05leHQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTmV4dD09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1pblk9enhEYXRhLm90aGVyX3Bvc1t6eERhdGEub3RoZXJfcG9zLmxlbmd0aC0xXS55KzYwLTUwNTtcclxuICAgICAgICAgICAgdGhpcy5nZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShlbmVteURhdGFzLnNsaWNlKHp4RGF0YS5vdGhlcl9wb3MubGVuZ3RoKSxvdXQsYnVmZk51bSxtaW5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+aYvuekuuWFs+WNoeaVsOaNrlxyXG4gICAgcHVibGljIGxvYWRMZXZlbCgpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkgJiYgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19sb2FkX29rICYmIChIZXJvLmN1cl9sb2FkZWRfbnVtPj1IZXJvLm1heF9sb2FkX251bSkgJiYgKFBldC5jdXJfbG9hZGVkX251bT49UGV0Lm1heF9sb2FkX251bSkgJiYgdGhpcy5maWdodGluZ19pbmZvICYmIHRoaXMuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkVuZGxlc3Mpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9IGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWlcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlcj1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwwKSsxXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2Usd2F2ZW51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiK3dhdmVudW1iZXIvLyhFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFdhdmUoKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX1/ov5vmnaXkuoZcIilcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyRGF0YT10aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhc1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgbGV0IGlzQmFvWGlhbmdMZXZlbD1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IE1DTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICBsZXQgdXNlV2lkdGg9NjAwO1xyXG4gICAgICAgICAgICBsZXQgbGVmdD0oY2Mud2luU2l6ZS53aWR0aC11c2VXaWR0aCkvMi1jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlfY3JlYXRlX3k9Y2Mud2luU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgLy90aGlzLmVuZW15X2NyZWF0ZV95PTA7XHJcbiAgICAgICAgICAgIGxldCByZWZyZXNoVGltZT0wO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVyRGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlckRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbUlkPWRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyZW5ndGhUeXBlPU1DTS5nZXRTdHJlbmd0aFR5cGUobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09ZGF0YS5udW07XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlckxldmVsPWRhdGEubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAvL+S4gOe7hOaAqizmr4/nu4TmgKrpg73kuIDoh7TnmoTvvIzmiYDku6Xlj5blhbbkuK3kuIDkuKrlsLHooYzkuoZcclxuICAgICAgICAgICAgICAgIC8v5YiG5LiA5LiL57yd6ZqZICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoPU1DTS5nZXRNb25zdGVyU3BhY2luZyhtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heE51bVhYPU1hdGguZmxvb3IodXNlV2lkdGgvd2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbldpZHRoPXVzZVdpZHRoJW1heE51bVhYO1xyXG4gICAgICAgICAgICAgICAgd2lkdGgrPU1hdGguZmxvb3IocmVtYWluV2lkdGgvbWF4TnVtWFgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUluZGV4cz1bXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeHg9MDsgeHg8bWF4TnVtWFg7IHh4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5wdXNoKHh4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8veOi9tOa3u+WKoOeahOaVsOmHj++8jOi+vuWIsG1heE51bVhY5ZCO77yMeXlOdW0rK1xyXG4gICAgICAgICAgICAgICAgbGV0IHh4TnVtPTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeXlOdW09MDtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUaW1lKz1kYXRhLnJlZnJlc2hfdGltZVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bnVtOyBuKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrmjpLliJdZWVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5eT10aGlzLmVuZW15X2NyZWF0ZV95K3dpZHRoKnl5TnVtK01hdGgucmFuZG9tKCkqd2lkdGgqMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py6566X5Ye6WFhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZEluZGV4PU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp1c2VJbmRleHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPWNjLnYyKGxlZnQrd2lkdGgvMit3aWR0aCp1c2VJbmRleHNbcmFuZEluZGV4XStNYXRoLnJhbmRvbSgpKjEwLTUseXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5zcGxpY2UocmFuZEluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0cmVuZ3RoVHlwZSE9U3RyZW5ndGhUeXBlLkJvc3MpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVNb25zdGVyQnlJZChtSWQscG9zLG1vbnN0ZXJMZXZlbCxkYXRhLmhwX3JhdGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfY3JlYXRlX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dKaWFuVG91UG9zKHRoaXMuY3VyX2NyZWF0ZV9udW0vdGhpcy5jdXJfdG90YWxfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxyZWZyZXNoVGltZStNYXRoLnJhbmRvbSgpKig2MC9NQ00uZ2V0U3BlZWQobUlkKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4eE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih4eE51bT5tYXhOdW1YWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5eU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW09MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgeHg9MDsgeHg8bWF4TnVtWFg7IHh4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5wdXNoKHh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLlRvd2VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCxtb25zdGVyTGV2ZWwsZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb3NzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEJvc3MobUlkLG1vbnN0ZXJMZXZlbCxkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+aAqueJqea9rlxyXG4gICAgICAgICAgICBpZih0aGlzLmZpZ2h0aW5nX2luZm8uZ2V0V2F2ZVR5cGVzKClbdGhpcy5jdXJfd2F2ZV09PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TW9uc3Rlcldhcm5pbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3RpYWxzKCk7XHJcbiAgICAgICAgICAgIC8v5Zug5Li65a6d566x5YWz5Y2h5piv5o+S6L+b5Y6755qE77yM5omA5Lul5oOz6KaB6I635Y+W5YeG56Gu55qE5pWw5YC877yM6ZyA6KaB5YeP5Y675YW25Ye6546w55qE5qyh5pWwXHJcbiAgICAgICAgICAgIC8vdGhpcy5kcm9wX2RhdGE9TGV2ZWxKc29uRGF0YS5nZXRXYXZlRHJvcERhdGEoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZS10aGlzLmxldmVsX2J1ZmZfbnVtKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dMZXZlbFByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIGxldCBpc0xvYWROZXh0PSFpc0Jhb1hpYW5nTGV2ZWw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyX3dhdmU+PXRoaXMuZmlnaHRpbmdfaW5mby5tb25zdGVyX2RhdGFzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIGlzTG9hZE5leHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSl7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0PWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzTG9hZE5leHQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbHlUPXRoaXMuZmlnaHRpbmdfaW5mby53YXZlX3JlZnJlc2hfdGltZVt0aGlzLmN1cl93YXZlKzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWROZXh0V2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxkZWx5VCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmZpZ2h0aW5nX2luZm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRMZXZlbERhdGFzKCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAgICAgICAgIH0sMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE5leHRXYXZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfd2F2ZTx0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGgtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUrKztcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkTGV2ZWxEYXRhcygpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LuA5LmI5pe25YCZ6L+b5p2lXCIpXHJcbiAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPW5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm89RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbz1Ub3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgYWRkQ2hlY2tUdXRvdGlhbHNIZXJvKGhlcm9JZDpIZXJvX1R5cGUsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzpIZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZT1oZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbD0xMDA7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZT01O1xyXG4gICAgICAgIGxldCBkYXRhPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCxkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLDQsY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgLyoq5re75Yqg5LiA5Liq5ruh57qn5ruh6KOF5ruh5a6g54mp55qE6Iux6ZuEICovXHJcbiAgICBhZGRUdXRvdGlhbHNIZXJvRnVsbChoZXJvSWQ6SGVyb19UeXBlLHRlYW1JbmRleDpudW1iZXIsY2FsbGJhY2s6RnVuY3Rpb24pOkhlcm9EYXRhe1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzpIZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZT1oZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbD1IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb0lkKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlPTEvL0hlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvSWQpOyAgIFxyXG4gICAgICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZT1FeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9JZCk7XHJcbiAgICAgICAgbGV0IGVxdWlwTWF4U3RhZ2U9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKCk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjE9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgxLGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIyPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMixlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMz1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDMsZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCg0LGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIHN3aXRjaChoZXJvSWQpe1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkPTcwNDEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjp7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQ9NzAyMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDp7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQ9NzAyMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMTp7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQ9NzAxMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMjp7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQ9NzAzMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGE9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoaGVyb0luZm8pXHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaGVyb0lkLGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkSGVybyhoZXJvSWQsdGVhbUluZGV4LGNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1dG90aWFscygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl93YXZlPT01KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAyKSl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAyLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxL0ppYVN1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlYzkurrmrbvkuqHkuoYs5ZOq5Liq5pWM5Lq65q275Lqh5LqG77yM5ZOq5Liq6Iux6ZuE5Ye75p2A55qEXHJcbiAgICBvbkVuZW15RGllKHNjb3JlOm51bWJlcixpc0FkZDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzQWRkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgICAgICBpZihNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bT49dGhpcy5jdXJfdG90YWxfbnVtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW0+PXRoaXMuY3VyX3RvdGFsX251bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlKz1lbmVteVRzLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlnaHRDZW50ZXIoKTpjYy5WZWMye1xyXG4gICAgICAgIHJldHVybiBjYy52MigwLCg3MDArdGhpcy5lbmVteV9vZmZzZXRfeS10aGlzLmVuZW15X2F0dF95KS8yK3RoaXMuZW5lbXlfYXR0X3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNraWxsQ2FuY2VsKGlzU2hvdzpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4aXRQbGF5R2FtZSgpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWRfY2FsbGJhY2s9bnVsbDtcclxuICAgICAgICB0aGlzLmxvYWRfamlzaHU9MDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuYWxsX2hlcm89bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBiYWNrVG9Ib21lKHNob3dIZXJvPzpIZXJvX1R5cGUpe1xyXG4gICAgICAgIHRoaXMucm9sZV9zaG93X2hlcm89c2hvd0hlcm8/c2hvd0hlcm86SGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyPWJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWw9bG9hZGluZ0Jhci5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2FkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fdHlwZTFcIixHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSlcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmhvbWUsKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KT0+e1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlPWNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlPXByb2dyZXNzVHJ1ZS8yO1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9sb2FkX3Byb2dyZXNzPXByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RhbmdlclRleHQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYW5nZXJUZXh0PWNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19VaS9kYW5nZXJUZXh0Jyk7XHJcbiAgICAgICAgaWYoZGFuZ2VyVGV4dD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL2RhbmdlclRleHQnLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhbmdlclRleHQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhbmdlclRleHQ9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYW5nZXJUZXh0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZVBhdXNlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QYXVzZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lUGF1c2VVaSgpO1xyXG4gICAgfVxyXG4gICAgc2hvd0J0bkJ1ZmYodHlwZSkvLzA6QnVmZuWxleekuiAgIDHvvJpCdWZm6YCJ5oupXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGF1c2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5wYXVzZSgpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQnVmZkRpc3BsYXksVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnVmZkRpc3BsYXkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnVmZkRpc3BsYXkpLmluaXRVaSh0eXBlKVxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVdpbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLmiZPlrozkuIDlm57lkIjkuoZcIilcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9XaW4gfHwgdGhpcy5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnBhdXNlKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9XaW47XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X3JhdGVfcmFtYWluKSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clN0YXJ0TGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDnrKxO56ug546p5a625pWwK01pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGN1clN0YXJ0TGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ5oyR5oiY5YWz5Y2hK2N1clN0YXJ0TGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbD1jdXJTdGFydExldmVsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHYW1lV2luKS5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwxKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTEgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJld2FyZFNTVUksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwNCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvL+W8gOWni+ato+W8j+WFs+WNoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6eyAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFRvd2VyTWFuYWdlci5hZGRUb3dlckxldmVsKDEpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuS4iemAieS4gFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMSk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOnsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICB9LDEpXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nhormtojlpLFcclxuICAgICAgICBsZXQgc2hvd3dhbmc9dGhpcy5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICBpZihzaG93d2FuZyl7XHJcbiAgICAgICAgICAgIHNob3d3YW5nLm9uR2FtZVdpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93U2VsZWN0U2tpbGwoZGVsYXlUaW1lOm51bWJlcj0xKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL+W7tui/n+WxleekulxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3NlbGVjdF9za2lsbCcsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5Oi0xNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sZGVsYXlUaW1lKTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb2NrU2tpbGwoeWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvdW5sb2NrX3VpJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChVbmxvY2tTa2lsbCkuaW5pdCh5ZXNDYWxsYmFjayxub0NhbGxiYWNrKTtcclxuICAgICAgICB9KTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlYWtMZXZlbFNraWxsKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgLy8gICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNb2RlLk1haW4pO1xyXG4gICAgLy8gICAgIGxldCBpc0NhblNob3c9ZmFsc2U7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8NTsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV0IGhlcm86SGVybz1udWxsO1xyXG4gICAgLy8gICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAvLyAgICAgICAgIGlmKGhlcm9UeXBlPj0wKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBoZXJvPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm9baGVyb1R5cGVdOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGlmKGhlcm8ubGV2ZWxfYnVmZi5sZW5ndGg8dGhpcy5tYXhfc2tpbGxfc2xvdClcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpc0NhblNob3c9dHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZihpc0NhblNob3c9PWZhbHNlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5tYXhfc2tpbGxfc2xvdD09MSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/or7TmmI7mnKrop4bpopHop6PplIFcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1VubG9ja1NraWxsKCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKChpc1N1Yzpib29sZWFuKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihpc1N1YylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhfc2tpbGxfc2xvdD0yO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vkuIvkuIDms6LmgKpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxWSURFT19UWVBFLkh1b2RvbmcpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8v55u05o6l5byA5aeL5LiL5LiA5rOi5oCqXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/nm7TmjqXmj5DnpLrmioDog73mu6HkuobvvIzot7Pov4flvLnnqpdcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguU2tpbGxfaXNfZnVsbCkpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgb25GdWh1bygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nOztcclxuXHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICBpZihkYW5nZXJUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dGdWh1bygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICB0aGlzLnJlc2V0UmF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS9mdWh1b191aScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5mdWh1b19udW0tLTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZUxvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlXCIsKVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX0xvc2UgfHwgdGhpcy5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfV2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX0xvc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X3JhdGVfcmFtYWluKSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sMSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sMSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5peg5bC95oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOnsgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJvc3PmjJHmiJjog5zliKlcIilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHYW1lV2luKS5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgIH19KVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBvbldhbGxEaWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gaWYodGhpcy5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5mdWh1b19udW0+MClcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93RnVodW8oKTtcclxuICAgICAgICAvLyAgICAgfWVsc2VcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb25zdGVyV2FybmluZygpe1xyXG4gICAgICAgIHRoaXMuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9FbmVteUNvbWluZyk7XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQudWlfbW9uc3Rlcl93YXJuaW5nLGNjLnYyKDAsMCksVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZSk7XHJcbiAgICAgICAgbm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMjUse29wYWNpdHk6MjU1fSkudG8oMC41LHtvcGFjaXR5OjEwMH0pLnRvKDAuNSx7b3BhY2l0eToyNTV9KS50bygwLjUse29wYWNpdHk6MTAwfSkudG8oMC41LHtvcGFjaXR5OjI1NX0pLnRvKDAuMjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC51aV9tb25zdGVyX3dhcm5pbmcsbm9kZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9zc1dhcm5pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL2Jvc3Nfd2FybmluZycsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBjaHV4aWFuQWN0PTAuMztcclxuICAgICAgICAgICAgbGV0IHhpYW9zaGlBY3Q9MC4xNTtcclxuICAgICAgICAgICAgbGV0IHRpbmdsaXVBY3Q9MjtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGF1dG89bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYXV0bycpO1xyXG4gICAgICAgICAgICBhdXRvLng9LTMyMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oYXV0bykudG8oY2h1eGlhbkFjdCx7eDozMjB9KS50bygyLHt4OjEwODB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdMYWJlbD1ub2RlLmdldENoaWxkQnlOYW1lKCd3YXJuaW5nTGFiZWwnKTtcclxuICAgICAgICAgICAgd2FybmluZ0xhYmVsLng9NjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih3YXJuaW5nTGFiZWwpLnRvKGNodXhpYW5BY3Qse3g6MH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKDAuMjUse3NjYWxlOjEuMX0pLnRvKDAuMjUse3NjYWxlOjEuMH0pLnRvKHhpYW9zaGlBY3Qse3g6LTY0MH0pLnN0YXJ0KCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBib3NzTGFiZWw9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm9zc0xhYmVsJyk7XHJcbiAgICAgICAgICAgIGJvc3NMYWJlbC54PS02NDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJvc3NMYWJlbCkudG8oY2h1eGlhbkFjdCx7eDowfSkudG8oMC4yNSx7c2NhbGU6MS4xfSkudG8oMC4yNSx7c2NhbGU6MS4wfSkudG8oMC4yNSx7c2NhbGU6MS4xfSkudG8oMC4yNSx7c2NhbGU6MS4wfSkudG8oMC4yNSx7c2NhbGU6MS4xfSkudG8oMC4yNSx7c2NhbGU6MS4wfSkudG8oeGlhb3NoaUFjdCx7eDo2NDB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0cz1ub2RlLmdldENoaWxkQnlOYW1lKCdlZmZlY3RzJyk7XHJcbiAgICAgICAgICAgIGVmZmVjdHMub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICBjYy50d2VlbihlZmZlY3RzKS5kZWxheShjaHV4aWFuQWN0KzAuMikuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0cy5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSkuZGVsYXkodGluZ2xpdUFjdC1jaHV4aWFuQWN0LTAuMikucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KHRpbmdsaXVBY3QpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2MudHdlZW4obm9kZSkudG8oMC4yLHt5OjIwMH0pLmRlbGF5KDAuNSkudG8oMC4yLHtzY2FsZToxLjJ9KS50bygwLjIse3NjYWxlOjAuOH0pLnRvKDAuMSx7c2NhbGU6MzIsb3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNvdW5kKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnNhdmVNdXNpY011dGUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnNhdmVTb3VuZE11dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U3BlZWRVcFVpKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3NwZWVkX3VpJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUhPTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBcclxuICAgIHJlZnJlc2hDb2luU2hvdygpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSApe1xyXG4gICAgICAgICAgICBsZXQgaG9tZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmKGhvbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEdlbVNob3coKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKXtcclxuICAgICAgICAgICAgbGV0IGhvbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZihob21lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaExvbmdKaW5nU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKXtcclxuICAgICAgICAgICAgbGV0IGhvbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZihob21lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hMb25nSmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVc2VyRXhwU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKXtcclxuICAgICAgICAgICAgbGV0IGhvbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZihob21lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hVc2VyRXhwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAganVtb1RvVWkoaW5kZXg6QnRuX0luZGV4KXtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSApXHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpLmp1bW9Ub1VpKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vQW5kU2hvd1VpKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUgKXtcclxuICAgICAgICAgICAgbGV0IGhvbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBob21lLmNoZWFrVW5sb2NrKCk7XHJcbiAgICAgICAgICAgIGhvbWUuc2hvd1VpKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFpoYW5saVNob3coKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lICl7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYoaG9tZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoWmhhbkxpU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUb3BTaG93KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBob21lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYoaG9tZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaG9tZS5yZWZyZXNoVG9wKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR3VhSmlHaWZ0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidG5PZmZsaW5lR2lmdD1jYy5maW5kKCdDYW52YXMvbWFpbl91aS9idG5PZmZsaW5lR2lmdCcpO1xyXG4gICAgICAgICAgICBidG5PZmZsaW5lR2lmdC5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlZnJlc2hSb2xlKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lIT1HYW1lU2NlbmUuaG9tZSlcclxuICAgIC8vICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgbGV0IHJvbGVVaT1jYy5maW5kKCdDYW52YXMvcm9sZV91aScpO1xyXG4gICAgLy8gICAgIGlmKHJvbGVVaS5hY3RpdmU9PXRydWUpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByb2xlVWkuZ2V0Q29tcG9uZW50KFJvbGVVaSkub25FbmFibGUoKTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH0gICAgXHJcbiAgICBcclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFBldEFjdGl2ZURwcyhwZXRJZDpQZXRJbmZvLG51bTpudW1iZXIpe1xyXG4gICAgICAgIGxldCBub3dOdW09dGhpcy5nZXRQZXRBY3RpdmVEcHMocGV0SWQpO1xyXG4gICAgICAgIGxldCBuZXdOdW09bm93TnVtK251bTtcclxuICAgICAgICB0aGlzLnNldFBldEFjdGl2ZURwcyhwZXRJZCxuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHJldHVybnMg5b2T5YmN55qEZHBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRBY3RpdmVEcHMocGV0SWQ6UGV0SW5mbyk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldF9hY3RpdmVfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc2V0UGV0QWN0aXZlRHBzKHBldElkOlBldEluZm8sbnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQocGV0SWQsbnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gbnVtIOWinuWKoOeahOaVsOWAvFxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFkZFBldENvbm5lY3REcHMocGV0SWQ6UGV0SW5mbyxudW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgbm93TnVtPXRoaXMuZ2V0UGV0Q29ubmVjdERwcyhwZXRJZCk7XHJcbiAgICAgICAgbGV0IG5ld051bT1ub3dOdW0rbnVtO1xyXG4gICAgICAgIHRoaXMuc2V0UGV0Q29ubmVjdERwcyhwZXRJZCxuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHJldHVybnMg5b2T5YmN55qEZHBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRDb25uZWN0RHBzKHBldElkOlBldEluZm8pOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXRfY29ubmVjdF9kcHMuZ2V0KHBldElkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzZXRQZXRDb25uZWN0RHBzKHBldElkOlBldEluZm8sbnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KHBldElkLG51bSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==