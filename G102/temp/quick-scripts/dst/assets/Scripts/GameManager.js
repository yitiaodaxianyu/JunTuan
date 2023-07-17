
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
        //动画位置
        _this.aniType = 2;
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
        this.aniType = 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQThKO0FBTTlKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUNyRCx5Q0FBb0M7QUFDcEMscURBQTRFO0FBQzVFLGtEQUE2QztBQUM3QywwQ0FBcUQ7QUFDckQsNkNBQXdDO0FBQ3hDLHVEQUE2RDtBQUU3RCx5REFBb0Q7QUFDcEQsa0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3QyxvRUFBK0Q7QUFDL0QseURBQStEO0FBQy9ELDBFQUFnRjtBQUVoRiw0RUFBa0Y7QUFDbEYscURBQWdEO0FBSXhDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBdzRDQztRQXA0Q1csaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFDOUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDekMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDbkQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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LHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBdzRDL0I7SUFBRCxrQkFBQztDQXg0Q0QsQUF3NENDLENBeDRDd0MsRUFBRSxDQUFDLFNBQVMsR0F3NENwRDtrQkF4NENvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIEdvX1R5cGUsIElzRGVidWcsIFNlbGVjdFNraWxsX1R5cGUsIFZJREVPX1RZUEUsIFpoZW5nX1hpbmdfVHlwZSwgR2FtZU1vZGUsIEZpZ2h0aW5nSW5mbywgSmlhU3UgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENodVNoZW5nRGlhbiBmcm9tIFwiLi9HYW1lL0NodVNoZW5nRGlhblwiO1xyXG5pbXBvcnQgRW5lbXlIcE1hbmFnZXIgZnJvbSBcIi4vRW5lbXkvRW5lbXlIcE1hbmFnZXJcIjtcclxuaW1wb3J0IEhwVGV4dEhwTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL0hwVGV4dE1hbmFnZXJcIjtcclxuaW1wb3J0IE11c2ljIGZyb20gXCIuL1NvdW5kL011aXNjXCI7XHJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi9Tb3VuZC9Tb3VuZFwiO1xyXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9Ib21lXCI7XHJcbmltcG9ydCBIaW50IGZyb20gXCIuL0hpbnRcIjtcclxuaW1wb3J0IEdldFRpcCBmcm9tIFwiLi9VSS9HZXRUaXBcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZS9HYW1lXCI7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4vVUkvRGlhbG9nXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCBMb2NhbFZpZGVvIGZyb20gXCIuL0xvY2FsVmlkZW9cIjtcclxuaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFVubG9ja1NraWxsIGZyb20gXCIuL1VJL1VubG9ja1NraWxsXCI7XHJcbmltcG9ydCB7IFpoZW5YaW5nRGF0YSB9IGZyb20gXCIuL1poZW5YaW5nRGF0YVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IEJvc3NNYW5hZ2VyIGZyb20gXCIuL0Jvc3MvQm9zc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXIvVG93ZXJMZXZlbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckNvbmZpZ3VyZSwgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBIZXJvSW5mbywgSGVyb19UeXBlIH0gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEd1YUppR2lmdCBmcm9tIFwiLi9HdWFKaS9VaS9HdWFKaUdpZnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgR2FtZVdpbiBmcm9tIFwiLi9HYW1lL1VpL0dhbWVXaW5cIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBCdWZmRGlzcGxheSBmcm9tIFwiLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBSZXdhcmRTU1VpIGZyb20gXCIuL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHByZWZhYl9oaW50OiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmVmYWJfZ2V0X3RpcDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcm9sZV9zaG93X2hlcm86IEhlcm9fVHlwZSA9IEhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5ZCE56eN566h55CG5ZmoXHJcbiAgICBnYW1lOiBHYW1lID0gbnVsbDtcclxuICAgIGVuZW15X2hwX21hbmFnZXI6IEVuZW15SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGhwX3RleHRfbWFuYWdlcjogSHBUZXh0SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGNodV9zaGVuZ19kaWFuOiBDaHVTaGVuZ0RpYW4gPSBudWxsO1xyXG4gICAgLy/lo7Dpn7NcclxuICAgIHNvdW5kX21hbmFnZXI6IFNvdW5kID0gbnVsbDtcclxuICAgIG11c2ljX21hbmFnZXI6IE11c2ljID0gbnVsbDtcclxuICAgIC8v5ZCE5aSn6Iux6ZuE55qEXHJcbiAgICBhbGxfaGVybzogTWFwPG51bWJlciwgSGVybz4gPSBudWxsO1xyXG4gICAgLy9EUFPnu5/orqFcclxuICAgIGhlcm9fc2tpbGxfZHBzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgICBoZXJvX2F0dGFja19kcHM6IG51bWJlcltdID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqeS4u+WKqOaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfYWN0aXZlX2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG4gICAgLyoq5a6g54mp6L+e5pC65oqA6IO96YCg5oiQ55qE5Lyk5a6zICovXHJcbiAgICBwcml2YXRlIHBldF9jb25uZWN0X2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG5cclxuICAgIGN1cl9nYW1lX3N0YXRlOiBHYW1lU3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgIGN1cl9nYW1lX21vZGU6IEdhbWVNb2RlID0gR2FtZU1vZGUuTWFpbjtcclxuICAgIGN1cl9nYW1lX3NjZW5lOiBHYW1lU2NlbmUgPSBHYW1lU2NlbmUuaG9tZTtcclxuXHJcbiAgICAvL+W9k+WJjeeahOWKoOi9vei/m+W6plxyXG4gICAgY3VyX2xvYWRfcHJvZ3Jlc3M6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mr4/kuKroi7Hpm4TojrflvpfnmoTmuLjmiI/lhoXmioDog71cclxuICAgIGluZ2FtZV9za2lsbHM6IFNlbGVjdFNraWxsX1R5cGVbXSA9IFtdO1xyXG4gICAgLy/lvIDlp4vnmoTlhbPljaHnmoTmlbDmja5cclxuICAgIGN1cl93YXZlOiBudW1iZXIgPSAwO1xyXG4gICAgZmlnaHRpbmdfaW5mbzogRmlnaHRpbmdJbmZvID0gbnVsbDtcclxuICAgIC8vZHJvcF9kYXRhOkRyb3BEYXRhPW51bGw7XHJcbiAgICByZXdhcmRfZGF0YTogUmV3YXJkRGF0YVtdID0gW107XHJcbiAgICBpc19sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5o6J6JC954mp5ZOB55qE5oCq54mpaWRcclxuICAgIC8vZHJvcF9lbmVteV90eXBlOm51bWJlcj0wO1xyXG5cclxuICAgIGdhbWVfdG9faG9tZTogR29fVHlwZSA9IEdvX1R5cGUuTWFpbjtcclxuXHJcbiAgICBmdWh1b19udW06IG51bWJlciA9IDE7XHJcbiAgICBpc19zaG93X3RleHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmioDog73mp73kvY1cclxuICAgIG1heF9za2lsbF9zbG90OiBudW1iZXIgPSAyO1xyXG4gICAgLy/lkITkuKroi7Hpm4TmlbDmja7vvIzmuLjmiI/lhoXkvb/nlKjvvIzlhbPljaHlhoVidWZm44CCXHJcbiAgICBnYW1lX2hlcm9fZGF0YTogTWFwPG51bWJlciwgSGVyb0RhdGE+ID0gbnVsbDtcclxuICAgIC8v56ys5Yeg5Liq5oCq5pyJ5Y+v6IO954iG5pif5pifYnVmZlxyXG4gICAgLy9zdGFyX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLy9cclxuICAgIC8qKuW9k+WJjeaAu+WFseeahOaAqueJqeaVsOmHjyAqL1xyXG4gICAgY3VyX3RvdGFsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWunumZheS4iuW3sue7j+eUn+aIkOWHuuaAqueJqeeahOaVsOmHjyAqL1xyXG4gICAgY3VyX2NyZWF0ZV9udW06IG51bWJlciA9IDA7XHJcbiAgICBlbmVteV9vZmZzZXRfeTogbnVtYmVyID0gMDtcclxuICAgIGVuZW15X2F0dF95OiBudW1iZXIgPSAtMzAwO1xyXG4gICAgZW5lbXlfY3JlYXRlX3k6IG51bWJlciA9IDEwODA7XHJcbiAgICBsb2FkX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgbG9hZF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgamlzaHVfdGltZTogbnVtYmVyID0gMDtcclxuICAgIC8v6YCa5YWz5qyh5pWwXHJcbiAgICBwYXNzX2xldmVsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKua4uOaIj+mAn+eOhyAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmjInpkq7mjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgYnRuX3NldHVwX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmiJjmlpfmjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfc2V0dXBfcmF0ZTogbnVtYmVyID0gMTtcclxuICAgIC8qKuWNleasoeacgOmrmOS8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfZGFtYWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Y2V5qyh5pyA5bCP5Lyk5a6z5YC8ICovXHJcbiAgICBwcml2YXRlIG1pbl9kYW1hZ2U6IG51bWJlciA9IDk5OTk7XHJcbiAgICAvKiroh6rliqjmiJjmlpfmoIfor4YgKi9cclxuICAgIHB1YmxpYyBhdXRvX2ZpZ2h0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlvZPliY3nmoTpmJ/liJcgKi9cclxuICAgIHB1YmxpYyBjdXJfdGVhbV9saXN0OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLy/mmK/lkKbmmL7npLrkuobpgIDlh7rmuLjmiI/nmoTlr7nor53moYZcclxuICAgIHB1YmxpYyBpc19zaG93X2V4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5Yqo55S75L2N572uXHJcbiAgICBwdWJsaWMgYW5pVHlwZTogbnVtYmVyID0gMjtcclxuICAgIC8v5ri45oiP5Yqo55S75a2Y5YKo5pWw5o2uXHJcbiAgICAvLyBwdWJsaWMgbW92ZURhdGE6IEFycmF5PGNjLlZlYzI+ID0gW107XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWVNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVMb2FkZXJvblwiKTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0KHNjZW5lOiBHYW1lU2NlbmUpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3NjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5pc19sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaVR5cGU9MjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfc2NlbmUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuaG9tZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXRQbGF5R2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnJvbGVfc2hvd19oZXJvPUhlcm9fVHlwZS5TaGVTaG91O1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVTY2VuZS5nYW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsX2hlcm8gPSBuZXcgTWFwPG51bWJlciwgSGVybz4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtID0gdGhpcy5jdXJfY3JlYXRlX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5nYW1lX3NraWxscyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfZGF0YSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWh1b19udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvX2ZpZ2h0aW5nID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5BdXRvRmlnaHRpbmcpID4gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRHYW1lSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IDA7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRUaXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5TZXR1cFJhdGUocmF0ZTogbnVtYmVyLCBpc0FjdGl2aXR5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuYnRuX3NldHVwX3JhdGUgPSByYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgaWYgKGlzQWN0aXZpdHkpIHtcclxuICAgICAgICAgICAgaWYgKHJhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf5YWz6Zet5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXV0b0ZpZ2h0aW5nKGlzQXV0bzogYm9vbGVhbiwgaXNBY3Rpdml0eTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLmF1dG9fZmlnaHRpbmcgPSBpc0F1dG87XHJcbiAgICAgICAgaWYgKGlzQWN0aXZpdHkpIHtcclxuICAgICAgICAgICAgaWYgKGlzQXV0bykge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX5YWz6Zet5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRCdG5TZXR1cFJhdGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idG5fc2V0dXBfcmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWdodGluZ1JhdGUocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maWdodGluZ19zZXR1cF9yYXRlID0gcmF0ZTtcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVSYXRlKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9yYXRlID0gcmF0ZSAqIHRoaXMuYnRuX3NldHVwX3JhdGUgKiB0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGU7XHJcbiAgICAgICAgY2Mua1NwZWVkKHRoaXMuZ2FtZV9yYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lUmF0ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVfcmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3JhdGUgPSAxO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWF4RGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IHRoaXMubWF4X2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heF9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heERhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWluRGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IHRoaXMubWluX2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pbkRhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlID0gMS40O1xyXG4gICAgICAgIGxldCBzY2FsZVZhbHVlID0gMTtcclxuICAgICAgICBsZXQgcmF0ZSA9IGRhbWFnZSAvIHRoaXMuZ2V0TWF4RGFtYWdlKCk7XHJcbiAgICAgICAgc2NhbGVWYWx1ZSA9IHJhdGUgKiBtYXhTY2FsZTtcclxuICAgICAgICBpZiAoc2NhbGVWYWx1ZSA8IDEpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY2FsZVZhbHVlID4gbWF4U2NhbGUpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IG1heFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBkYW1hZ2UgLyB0aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIGlmIChyYXRlIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDAuNCkge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCAwLjYpIHtcclxuICAgICAgICAgICAgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgMC44KSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF80O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF81O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVybyhoZXJvSWQ6IEhlcm9fVHlwZSk6IEhlcm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbF9oZXJvLmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRHYW1lSGVyb0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGlzSW5pdERwcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9fYXR0YWNrX2Rwcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YSA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmN1cl90ZWFtX2xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KHRoaXMuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0RhdGEgPSBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGaWdodGluZ0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSGVyb19UeXBlLkhlcm9fTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5pdERwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGhvbWVIZXJvRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaSk7XHJcbiAgICAgICAgICAgIGlmIChob21lSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUoaG9tZUhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90ZWFtX2xpc3QuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/t+Wuq+aooeW8j+WKoOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKz0gKGZpZ2h0aW5nRGF0YS5BdHRhY2tQZXIpICogaGVyb0RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKz0gKGZpZ2h0aW5nRGF0YS5EZWZlbnNlUGVyKSAqIGhlcm9EYXRhLmZpeF9kZWZlbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5Dcml0aWNhbCArPSBmaWdodGluZ0RhdGEuQ3JpdGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuSGl0ICs9IGZpZ2h0aW5nRGF0YS5IaXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLCBoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmluaXRXYWxsKG1haW5XYWxsRGF0YSwgV2FsbFR5cGUuTWFpbik7XHJcbiAgICAgICAgLy8gaWYoaHA8MzAwMCl7XHJcbiAgICAgICAgLy8gICAgIGhwPTMwMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRlZmVuc2U8MTAwKXtcclxuICAgICAgICAvLyAgICAgZGVmZW5zZT0xMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy53YWxsX2RhdGEuaW5pdEluaGVyaXREYXRhKGhwLGRlZmVuc2UsbWlzcyxhbnRpQ3JpdGljYWwsYW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpIHtcclxuICAgICAgICBsZXQgaXNJbml0RHBzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGVyb19hdHRhY2tfZHBzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luaXREcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMgPSBuZXcgTWFwPFBldEluZm8sIG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhID0gbmV3IE1hcDxudW1iZXIsIEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdCA9IFtIZXJvX1R5cGUuU2hvdVdhbmcsIEhlcm9fVHlwZS5BTnVCaVNpLCBIZXJvX1R5cGUuWmhlbkRlLCBIZXJvX1R5cGUuTWVpTW8sIEhlcm9fVHlwZS5MZWlTaGVuXTtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VyX3RlYW1fbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmFkZFR1dG90aWFsc0hlcm9GdWxsKHRoaXMuY3VyX3RlYW1fbGlzdFtpXSwgaSwgbnVsbCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0ICs9IGhlcm9EYXRhLkhpdCAqIDAuMjtcclxuICAgICAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1heERhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICB0aGlzLnNldE1pbkRhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGksaGVyb0RhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5pbml0V2FsbChtYWluV2FsbERhdGEsIFdhbGxUeXBlLk1haW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hNYWluV2FsbERhdGEoKSB7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlZnJlc2hXYWxsRGF0YShtYWluV2FsbERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFRpcCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJlZmFiX2hpbnQpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfaGludCA9IGFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5wcmVmYWJfZ2V0X3RpcCkge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYl9nZXRfdGlwID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBkdD86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9oaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgaGludC5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLCBkdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBoaW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGludCk7XHJcbiAgICAgICAgICAgIGhpbnQucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICBoaW50SnMuc2hvd0hpbnRNZXNzYWdlKG1lc3NhZ2UsIGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldFRpcChnZXROb2RlOiBjYy5Ob2RlLCBjYWxsQmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiX2hpbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsIGNhbGxCYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9nZXRfdGlwKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsIGNhbGxCYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd011bHRpcGxlR2V0VGlwKGdldE5vZGVzOiBjYy5Ob2RlW10sIGNhbGxCYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5wcmVmYWJfaGludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdnZXRfdGlwJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLCBjYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfZ2V0X3RpcCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRNdWx0aXBsZVBvcnAoZ2V0Tm9kZXMsIGNhbGxCYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHllc0NhbGxiYWNrOiBGdW5jdGlvbiwgbm9DYWxsYmFjazogRnVuY3Rpb24sIHNob3dUeXBlPzogbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfc2hvd19leGl0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfZXhpdCA9IHRydWU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLCB5ZXNDYWxsYmFjaywgbm9DYWxsYmFjaywgc2hvd1R5cGUsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0geTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCdXlEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IHN0cmluZyB8IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZGlhbG9nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGlhbG9nKS5zaG93RGlhbG9nKG1lc3NhZ2UsIHllc0NhbGxiYWNrLCBub0NhbGxiYWNrLCBzaG93VHlwZSwgeSwgY3VycmVuY3kpO1xyXG4gICAgICAgICAgICAvLyBpZih5KXtcclxuICAgICAgICAgICAgLy8gICAgIG5vZGUueT15O1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvY2FsVmlkZW8oeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbiwgaXNWaWRlbz86IGJvb2xlYW4pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndmlkZW9fZGlhbG9nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTG9jYWxWaWRlbykuaW5pdCh5ZXNDYWxsYmFjaywgbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR0FNRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtID0gMDtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lBbGxEcm9wKCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95QWxsTW9uc3RlcigpO1xyXG4gICAgICAgIHN3aXRjaCAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBUdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LnJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsUm91bmQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubG9hZExldmVsLCAwLjUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlumYteWIl+exu+Wei1xyXG4gICAgZ2V0WmhlbmdYaW5nRGF0YSgpOiBaaGVuWGluZ0RhdGEge1xyXG4gICAgICAgIGxldCB3YXZlRGF0YSA9IHRoaXMuZmlnaHRpbmdfaW5mb1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAvL+ino+aekOmYteWei+aVsOaNrlxyXG4gICAgICAgIGxldCB6eERhdGEgPSBuZXcgWmhlblhpbmdEYXRhKCk7XHJcbiAgICAgICAgbGV0IGFsbEVuZW15RGF0YSA9IG5ldyBBcnJheTxKc29uTW9uc3RlckNvbmZpZ3VyZT4oKTtcclxuICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdmVEYXRhLm1vbnN0ZXJfbnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtSWQgPSB3YXZlRGF0YS5tb25zdGVyX2lkW2ldO1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGEgPSBNQ00uZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobUlkKTtcclxuICAgICAgICAgICAgbGV0IGVuZW15TnVtID0gd2F2ZURhdGEubW9uc3Rlcl9udW1baV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgZW5lbXlOdW07IG4rKykge1xyXG4gICAgICAgICAgICAgICAgYWxsRW5lbXlEYXRhLnB1c2goanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LqM5qyh5aSE55CG77yM5oqKYm9zc+i3n2J1ZmbmgKrmlL7mnIDliY3pnaJcclxuICAgICAgICBhbGxFbmVteURhdGEuc29ydCgoYTogSnNvbk1vbnN0ZXJDb25maWd1cmUsIGI6IEpzb25Nb25zdGVyQ29uZmlndXJlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLlN0cmVuZ3RoVHlwZSAtIGEuU3RyZW5ndGhUeXBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoYWxsRW5lbXlEYXRhLCB6eERhdGEsIDAsIDApO1xyXG4gICAgICAgIHJldHVybiB6eERhdGE7XHJcbiAgICB9XHJcbiAgICBnZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShlbmVteURhdGFzOiBKc29uTW9uc3RlckNvbmZpZ3VyZVtdLCBvdXQ6IFpoZW5YaW5nRGF0YSwgYnVmZk51bTogbnVtYmVyLCBtaW5ZOiBudW1iZXIpIHtcclxuICAgICAgICAvL+mYteWei1xyXG4gICAgICAgIGxldCB6eFR5cGUgPSBaaGVuZ19YaW5nX1R5cGUuWlgwO1xyXG4gICAgICAgIC8v6ZqP5py65LiA5Liq6Zi15Z6LXHJcbiAgICAgICAgenhUeXBlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogWmhlbmdfWGluZ19UeXBlLm51bSk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHp4VHlwZT1aaGVuZ19YaW5nX1R5cGUu566t5aS0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgenhEYXRhID0gbmV3IFpoZW5YaW5nRGF0YSgpO1xyXG4gICAgICAgIC8venhEYXRhPXRoaXMuZ2FtZS56aGVuX3hpbmcuanNvblt6eFR5cGVdO1xyXG4gICAgICAgIGxldCBsZW4gPSBlbmVteURhdGFzLmxlbmd0aDtcclxuICAgICAgICBsZXQgaXNOZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG90aGVyTnVtID0gMDtcclxuICAgICAgICBsZXQgaXNIYXZlQm9zcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBld2FpTnVtID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlQm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgKHp4RGF0YS5vdGhlcl9wb3MubGVuZ3RoICsgZXdhaU51bSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5LiA5LiL5piv5ZCmYm9zc+S9jee9ruW3sue7j+eUqOS6hu+8jOWmguaenOeUqOS6huS7o+ihqOi/meWFs+aciTLkuKpib3Nz77yM6ZyA6KaB5oqK6L+Z5LiqYm9zc+aUvuWIsGJ1ZmbkvY3nva7kuIpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS5i+WJjeayoeacieiuvue9rmJvc3PkvY3nva4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXQuYm9zc19wb3MueSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5ib3NzX3BvcyA9IGRpc1BvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXQuYnVmZl9wb3MubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5idWZmX3Bvc1tidWZmTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGUgPT0gU3RyZW5ndGhUeXBlLkVsaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5idWZmX3Bvcy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzov5nms6LmsqHmnIlib3Nz77yM5bm25LiU5pyJYnVmZu+8jOWImWJ1Zmbku6Pmm79ib3Nz5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0hhdmVCb3NzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJvc3NfcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZUJvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5idWZmX3Bvc1tidWZmTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dC5vdGhlcl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc05leHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTmV4dCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1pblkgPSB6eERhdGEub3RoZXJfcG9zW3p4RGF0YS5vdGhlcl9wb3MubGVuZ3RoIC0gMV0ueSArIDYwIC0gNTA1O1xyXG4gICAgICAgICAgICB0aGlzLmdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGVuZW15RGF0YXMuc2xpY2UoenhEYXRhLm90aGVyX3Bvcy5sZW5ndGgpLCBvdXQsIGJ1ZmZOdW0sIG1pblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5pi+56S65YWz5Y2h5pWw5o2uXHJcbiAgICBwdWJsaWMgbG9hZExldmVsKCkge1xyXG5cclxuICAgICAgICBpZiAoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKSAmJiBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2xvYWRfb2sgJiYgKEhlcm8uY3VyX2xvYWRlZF9udW0gPj0gSGVyby5tYXhfbG9hZF9udW0pICYmIChQZXQuY3VyX2xvYWRlZF9udW0gPj0gUGV0Lm1heF9sb2FkX251bSkgJiYgdGhpcy5maWdodGluZ19pbmZvICYmIHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZykge1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkVuZGxlc3MpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCkgKyAxXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIHdhdmVudW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHdhdmVudW1iZXIvLyhFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFdhdmUoKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX1/ov5vmnaXkuoZcIilcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyRGF0YSA9IHRoaXMuZmlnaHRpbmdfaW5mby5tb25zdGVyX2RhdGFzW3RoaXMuY3VyX3dhdmVdO1xyXG4gICAgICAgICAgICBsZXQgaXNCYW9YaWFuZ0xldmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBNQ00gPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICBsZXQgdXNlV2lkdGggPSA2MDA7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gKGNjLndpblNpemUud2lkdGggLSB1c2VXaWR0aCkgLyAyIC0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlfY3JlYXRlX3kgPSBjYy53aW5TaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbmVteV9jcmVhdGVfeT0wO1xyXG4gICAgICAgICAgICBsZXQgcmVmcmVzaFRpbWUgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnN0ZXJEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG1vbnN0ZXJEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1JZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyZW5ndGhUeXBlID0gTUNNLmdldFN0cmVuZ3RoVHlwZShtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IGRhdGEubnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJMZXZlbCA9IGRhdGEubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAvL+S4gOe7hOaAqizmr4/nu4TmgKrpg73kuIDoh7TnmoTvvIzmiYDku6Xlj5blhbbkuK3kuIDkuKrlsLHooYzkuoZcclxuICAgICAgICAgICAgICAgIC8v5YiG5LiA5LiL57yd6ZqZICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gTUNNLmdldE1vbnN0ZXJTcGFjaW5nKG1JZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4TnVtWFggPSBNYXRoLmZsb29yKHVzZVdpZHRoIC8gd2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbldpZHRoID0gdXNlV2lkdGggJSBtYXhOdW1YWDtcclxuICAgICAgICAgICAgICAgIHdpZHRoICs9IE1hdGguZmxvb3IocmVtYWluV2lkdGggLyBtYXhOdW1YWCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlSW5kZXhzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbWF4TnVtWFg7IHh4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3jovbTmt7vliqDnmoTmlbDph4/vvIzovr7liLBtYXhOdW1YWOWQju+8jHl5TnVtKytcclxuICAgICAgICAgICAgICAgIGxldCB4eE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeXlOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRpbWUgKz0gZGF0YS5yZWZyZXNoX3RpbWVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbnVtOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3RhbF9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAvL+WQkeS4iuaOkuWIl1lZXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl5ID0gdGhpcy5lbmVteV9jcmVhdGVfeSArIHdpZHRoICogeXlOdW0gKyBNYXRoLnJhbmRvbSgpICogd2lkdGggKiAwLjc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pmo/mnLrnrpflh7pYWFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYW5kSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1c2VJbmRleHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gY2MudjIobGVmdCArIHdpZHRoIC8gMiArIHdpZHRoICogdXNlSW5kZXhzW3JhbmRJbmRleF0gKyBNYXRoLnJhbmRvbSgpICogMTAgLSA1LCB5eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlSW5kZXhzLnNwbGljZShyYW5kSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJlbmd0aFR5cGUgIT0gU3RyZW5ndGhUeXBlLkJvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVNb25zdGVyQnlJZChtSWQsIHBvcywgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfY3JlYXRlX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dKaWFuVG91UG9zKHRoaXMuY3VyX2NyZWF0ZV9udW0gLyB0aGlzLmN1cl90b3RhbF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByZWZyZXNoVGltZSArIE1hdGgucmFuZG9tKCkgKiAoNjAgLyBNQ00uZ2V0U3BlZWQobUlkKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4eE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeHhOdW0gPiBtYXhOdW1YWCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeXlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHh4TnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHh4ID0gMDsgeHggPCBtYXhOdW1YWDsgeHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5wdXNoKHh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuVG93ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb3NzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEJvc3MobUlkLCBtb25zdGVyTGV2ZWwsIGRhdGEuaHBfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCwgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+aAqueJqea9rlxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpW3RoaXMuY3VyX3dhdmVdID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vbnN0ZXJXYXJuaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jaGVja1R1dG90aWFscygpO1xyXG4gICAgICAgICAgICAvL+WboOS4uuWuneeuseWFs+WNoeaYr+aPkui/m+WOu+eahO+8jOaJgOS7peaDs+imgeiOt+WPluWHhuehrueahOaVsOWAvO+8jOmcgOimgeWHj+WOu+WFtuWHuueOsOeahOasoeaVsFxyXG4gICAgICAgICAgICAvL3RoaXMuZHJvcF9kYXRhPUxldmVsSnNvbkRhdGEuZ2V0V2F2ZURyb3BEYXRhKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUtdGhpcy5sZXZlbF9idWZmX251bSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICBsZXQgaXNMb2FkTmV4dCA9ICFpc0Jhb1hpYW5nTGV2ZWw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlID49IHRoaXMuZmlnaHRpbmdfaW5mby5tb25zdGVyX2RhdGFzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGlzTG9hZE5leHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzTG9hZE5leHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZWx5VCA9IHRoaXMuZmlnaHRpbmdfaW5mby53YXZlX3JlZnJlc2hfdGltZVt0aGlzLmN1cl93YXZlICsgMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sIGRlbHlUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maWdodGluZ19pbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRMZXZlbERhdGFzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICB9LCAwLjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkTmV4dFdhdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPCB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUrKztcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkTGV2ZWxEYXRhcygpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS7gOS5iOaXtuWAmei/m+adpVwiKVxyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IG5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApOy8v5rOi5pWwXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFJvdW5kKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBUb3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBhZGRDaGVja1R1dG90aWFsc0hlcm8oaGVyb0lkOiBIZXJvX1R5cGUsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzogSGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBoZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDEwMDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gNTtcclxuICAgICAgICBsZXQgZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgNCwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgLyoq5re75Yqg5LiA5Liq5ruh57qn5ruh6KOF5ruh5a6g54mp55qE6Iux6ZuEICovXHJcbiAgICBhZGRUdXRvdGlhbHNIZXJvRnVsbChoZXJvSWQ6IEhlcm9fVHlwZSwgdGVhbUluZGV4OiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEhlcm9EYXRhIHtcclxuICAgICAgICBsZXQgaGVyb0luZm86IEhlcm9JbmZvID0gbmV3IEhlcm9JbmZvKCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb190eXBlID0gaGVyb0lkO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fbGV2ZWwgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwoaGVyb0lkKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gMS8vSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9JZCk7ICAgXHJcbiAgICAgICAgaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlID0gRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvSWQpO1xyXG4gICAgICAgIGxldCBlcXVpcE1heFN0YWdlID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKCk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjEgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDEsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIyID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgyLCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMyA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMywgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjQgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDQsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIHN3aXRjaCAoaGVyb0lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzA0MTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAyMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMjEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDExOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDExMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMjoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAzMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoaGVyb0luZm8pXHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaGVyb0lkLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLCB0ZWFtSW5kZXgsIGNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1dG90aWFscygpIHtcclxuICAgICAgICBpZiAoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxIC8gSmlhU3UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aVjOS6uuatu+S6oeS6hizlk6rkuKrmlYzkurrmrbvkuqHkuobvvIzlk6rkuKroi7Hpm4Tlh7vmnYDnmoRcclxuICAgIG9uRW5lbXlEaWUoc2NvcmU6IG51bWJlciwgaXNBZGQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNBZGQpIHtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW0gPj0gdGhpcy5jdXJfdG90YWxfbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bSA+PSB0aGlzLmN1cl90b3RhbF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlKz1lbmVteVRzLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlnaHRDZW50ZXIoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKDAsICg3MDAgKyB0aGlzLmVuZW15X29mZnNldF95IC0gdGhpcy5lbmVteV9hdHRfeSkgLyAyICsgdGhpcy5lbmVteV9hdHRfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxDYW5jZWwoaXNTaG93OiBib29sZWFuKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4aXRQbGF5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmxvYWRfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZF9qaXNodSA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVybyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja1RvSG9tZShzaG93SGVybz86IEhlcm9fVHlwZSkge1xyXG4gICAgICAgIHRoaXMucm9sZV9zaG93X2hlcm8gPSBzaG93SGVybyA/IHNob3dIZXJvIDogSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX190eXBlMVwiLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lKVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSwgKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8v55yf5a6e6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1RydWUgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlID0gcHJvZ3Jlc3NUcnVlIC8gMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmcgPSAobG9hZGluZ0Jhci5wcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RhbmdlclRleHQoKSB7XHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvZGFuZ2VyVGV4dCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZVBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVQYXVzZVVpKCk7XHJcbiAgICB9XHJcbiAgICBzaG93QnRuQnVmZih0eXBlKS8vMDpCdWZm5bGV56S6ICAgMe+8mkJ1ZmbpgInmi6lcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9QYXVzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CdWZmRGlzcGxheSwgVUlMYXllckxldmVsLlR3bywge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdFVpKHR5cGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVdpbigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaJk+WujOS4gOWbnuWQiOS6hlwiKVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbiB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX0xvc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIucGF1c2UoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfV2luO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clN0YXJ0TGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ56ysTueroOeOqeWutuaVsCArIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGN1clN0YXJ0TGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ5oyR5oiY5YWz5Y2hICsgY3VyU3RhcnRMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID0gY3VyU3RhcnRMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaEZyb21HYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjA0LCgpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy/lvIDlp4vmraPlvI/lhbPljaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuYWRkVG93ZXJMZXZlbCgxKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuS4iemAieS4gFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMSk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy/nhormtojlpLFcclxuICAgICAgICBsZXQgc2hvd3dhbmcgPSB0aGlzLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIGlmIChzaG93d2FuZykge1xyXG4gICAgICAgICAgICBzaG93d2FuZy5vbkdhbWVXaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdFNraWxsKGRlbGF5VGltZTogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL+W7tui/n+WxleekulxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvc2VsZWN0X3NraWxsJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmdWkgPSBjYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSwgeyB5OiAtMTQwMCB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZGVsYXlUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb2NrU2tpbGwoeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS91bmxvY2tfdWknLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChVbmxvY2tTa2lsbCkuaW5pdCh5ZXNDYWxsYmFjaywgbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlYWtMZXZlbFNraWxsKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgLy8gICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNb2RlLk1haW4pO1xyXG4gICAgLy8gICAgIGxldCBpc0NhblNob3c9ZmFsc2U7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8NTsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV0IGhlcm86SGVybz1udWxsO1xyXG4gICAgLy8gICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAvLyAgICAgICAgIGlmKGhlcm9UeXBlPj0wKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBoZXJvPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm9baGVyb1R5cGVdOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGlmKGhlcm8ubGV2ZWxfYnVmZi5sZW5ndGg8dGhpcy5tYXhfc2tpbGxfc2xvdClcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpc0NhblNob3c9dHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZihpc0NhblNob3c9PWZhbHNlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5tYXhfc2tpbGxfc2xvdD09MSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/or7TmmI7mnKrop4bpopHop6PplIFcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1VubG9ja1NraWxsKCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKChpc1N1Yzpib29sZWFuKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihpc1N1YylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhfc2tpbGxfc2xvdD0yO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vkuIvkuIDms6LmgKpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxWSURFT19UWVBFLkh1b2RvbmcpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8v55u05o6l5byA5aeL5LiL5LiA5rOi5oCqXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/nm7TmjqXmj5DnpLrmioDog73mu6HkuobvvIzot7Pov4flvLnnqpdcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguU2tpbGxfaXNfZnVsbCkpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgb25GdWh1bygpIHtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZzs7XHJcblxyXG4gICAgICAgIGxldCBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICBpZiAoZGFuZ2VyVGV4dCkge1xyXG4gICAgICAgICAgICBkYW5nZXJUZXh0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93RnVodW8oKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlTGV2ZWxXYXZlKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL2Z1aHVvX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5mdWh1b19udW0tLTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZUxvc2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlpLHotKVcIiwpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfTG9zZSB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9Mb3NlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2VVaSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLml6DlsL3mjJHmiJjog5zliKlcIilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJCb3Nz5oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uV2FsbERpZSgpIHtcclxuICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZnVodW9fbnVtPjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0Z1aHVvKCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9uc3Rlcldhcm5pbmcoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0VuZW15Q29taW5nKTtcclxuICAgICAgICBsZXQgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgY2MudjIoMCwgMCksIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUpO1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMjUsIHsgb3BhY2l0eTogMjU1IH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAxMDAgfSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS50bygwLjUsIHsgb3BhY2l0eTogMTAwIH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkudG8oMC4yNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9zc1dhcm5pbmcoKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvYm9zc193YXJuaW5nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGNodXhpYW5BY3QgPSAwLjM7XHJcbiAgICAgICAgICAgIGxldCB4aWFvc2hpQWN0ID0gMC4xNTtcclxuICAgICAgICAgICAgbGV0IHRpbmdsaXVBY3QgPSAyO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGF1dG8gPSBub2RlLmdldENoaWxkQnlOYW1lKCdhdXRvJyk7XHJcbiAgICAgICAgICAgIGF1dG8ueCA9IC0zMjA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGF1dG8pLnRvKGNodXhpYW5BY3QsIHsgeDogMzIwIH0pLnRvKDIsIHsgeDogMTA4MCB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhcm5pbmdMYWJlbCcpO1xyXG4gICAgICAgICAgICB3YXJuaW5nTGFiZWwueCA9IDY0MDtcclxuICAgICAgICAgICAgY2MudHdlZW4od2FybmluZ0xhYmVsKS50byhjaHV4aWFuQWN0LCB7IHg6IDAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oeGlhb3NoaUFjdCwgeyB4OiAtNjQwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCBib3NzTGFiZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKCdib3NzTGFiZWwnKTtcclxuICAgICAgICAgICAgYm9zc0xhYmVsLnggPSAtNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihib3NzTGFiZWwpLnRvKGNodXhpYW5BY3QsIHsgeDogMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50byh4aWFvc2hpQWN0LCB7IHg6IDY0MCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0cyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VmZmVjdHMnKTtcclxuICAgICAgICAgICAgZWZmZWN0cy5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oZWZmZWN0cykuZGVsYXkoY2h1eGlhbkFjdCArIDAuMikuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkuZGVsYXkodGluZ2xpdUFjdCAtIGNodXhpYW5BY3QgLSAwLjIpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5kZWxheSh0aW5nbGl1QWN0KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMix7eToyMDB9KS5kZWxheSgwLjUpLnRvKDAuMix7c2NhbGU6MS4yfSkudG8oMC4yLHtzY2FsZTowLjh9KS50bygwLjEse3NjYWxlOjMyLG9wYWNpdHk6MH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnNhdmVNdXNpY011dGUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnNhdmVTb3VuZE11dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U3BlZWRVcFVpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5nYW1lKSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3NwZWVkX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcmVmcmVzaENvaW5TaG93KCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEdlbVNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hMb25nSmluZ1Nob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoTG9uZ0ppbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVXNlckV4cFNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoVXNlckV4cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGp1bW9Ub1VpKGluZGV4OiBCdG5fSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpLmp1bW9Ub1VpKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vQW5kU2hvd1VpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBob21lLmNoZWFrVW5sb2NrKCk7XHJcbiAgICAgICAgICAgIGhvbWUuc2hvd1VpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2haaGFubGlTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaFpoYW5MaVNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG9wU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIGhvbWUucmVmcmVzaFRvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hHdWFKaUdpZnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGJ0bk9mZmxpbmVHaWZ0ID0gY2MuZmluZCgnQ2FudmFzL21haW5fdWkvYnRuT2ZmbGluZUdpZnQnKTtcclxuICAgICAgICAgICAgYnRuT2ZmbGluZUdpZnQuZ2V0Q29tcG9uZW50KEd1YUppR2lmdCkuY2hlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVmcmVzaFJvbGUoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmUhPUdhbWVTY2VuZS5ob21lKVxyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBsZXQgcm9sZVVpPWNjLmZpbmQoJ0NhbnZhcy9yb2xlX3VpJyk7XHJcbiAgICAvLyAgICAgaWYocm9sZVVpLmFjdGl2ZT09dHJ1ZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJvbGVVaS5nZXRDb21wb25lbnQoUm9sZVVpKS5vbkVuYWJsZSgpO1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfSAgICBcclxuXHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWuoOeJqS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEBwYXJhbSBudW0g5aKe5Yqg55qE5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vd051bSA9IHRoaXMuZ2V0UGV0QWN0aXZlRHBzKHBldElkKTtcclxuICAgICAgICBsZXQgbmV3TnVtID0gbm93TnVtICsgbnVtO1xyXG4gICAgICAgIHRoaXMuc2V0UGV0QWN0aXZlRHBzKHBldElkLCBuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHJldHVybnMg5b2T5YmN55qEZHBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldF9hY3RpdmVfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQocGV0SWQsIG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFBldENvbm5lY3REcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vd051bSA9IHRoaXMuZ2V0UGV0Q29ubmVjdERwcyhwZXRJZCk7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IG5vd051bSArIG51bTtcclxuICAgICAgICB0aGlzLnNldFBldENvbm5lY3REcHMocGV0SWQsIG5ld051bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nmoRkcHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBldENvbm5lY3REcHMocGV0SWQ6IFBldEluZm8pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldF9jb25uZWN0X2Rwcy5nZXQocGV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQocGV0SWQsIG51bSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==