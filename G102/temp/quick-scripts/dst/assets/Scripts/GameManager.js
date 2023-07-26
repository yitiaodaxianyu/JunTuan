
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
        _this.game_rate = 2;
        /**按钮指定速率 */
        _this.btn_setup_rate = 1;
        /**战斗指定速率 */
        _this.fighting_setup_rate = 1;
        /**单次最高伤害值 */
        _this.max_damage = 0;
        /**单次最小伤害值 */
        _this.min_damage = 9999;
        /**自动战斗标识 */
        _this.auto_fighting = true;
        /**当前的队列 */
        _this.cur_team_list = [];
        _this.charioUpgradationData = [0, 0, 0, 0, 0, 0, 0];
        _this.charioTip = ["加攻击", "血量上限", "攻速", "防御", "技能间隔", "左右移动", "回血"];
        _this.charioContent = ["每一级增加全体英雄攻击力10%", "每一级增加战车血量上限10%", "每一级增加全体英雄攻速10%", "每一级增加战车防御10%", "每一级减少技能间隔10%", "每一级增加战车移动速度10%", "回复战车最大血量20%"];
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
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0, 0];
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
                    //this.auto_fighting = TheStorageManager.getInstance().getInt(StorageKey.AutoFighting) > 0;
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
        // this.auto_fighting = isAuto;
        // if (isActivity) {
        //     if (isAuto) {
        //         FollowManager.getInstance().followEvent(Follow_Type.自动战斗开启成功次数);
        //     } else {
        //         FollowManager.getInstance().followEvent(Follow_Type.自动战斗关闭成功次数);
        //     }
        // }
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
        //this.game_rate = 1;
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
                    mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();
                    ;
                    mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
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
            mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();
            ;
            mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
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
        var _this = this;
        var mainWallData = new HeroConfig_1.AttributeData();
        this.all_hero.forEach(function (v, k) {
            var heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2 * _this.getCharioHealthRatio();
            mainWallData.Defense += heroData.total_defense * 0.2 * _this.getCharioDefenseRotio();
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
        });
        WallManager_1.default.getInstance().getMainWall().refreshWallDataByaddHero(mainWallData);
    };
    GameManager.prototype.refreshMainWallData = function () {
        var _this = this;
        var mainWallData = new HeroConfig_1.AttributeData();
        this.all_hero.forEach(function (v, k) {
            var heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2 * _this.getCharioHealthRatio();
            ;
            mainWallData.Defense += heroData.total_defense * 0.2 * _this.getCharioDefenseRotio();
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
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0, 0];
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
    //根据当前charioUpgradationData获取一个升级组
    GameManager.prototype.getcharioUpgradationData = function () {
        var arr = [];
        var arTemp = [];
        for (var i = 0; i < this.charioUpgradationData.length; i++) {
            if (this.charioUpgradationData[i] < 5 || i == 6) {
                arTemp.push(i);
            }
        }
        //可升级技能数量小于3
        if (arTemp.length <= 3) {
            return arTemp;
        }
        arTemp.sort(function () {
            return Math.random() - 0.5;
        });
        arr[0] = arTemp[0];
        arr[1] = arTemp[1];
        arr[2] = arTemp[2];
        return arr;
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
        if (MonsterManager_1.default.getInstance() && MonsterManager_1.default.getInstance().is_load_ok && (Pet_1.default.cur_loaded_num >= Pet_1.default.max_load_num) && this.fighting_info && this.cur_game_state == Constants_1.GameState.Game_Playing) {
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
                    console.log("延迟加载下一关");
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
    //获取因为技能等级变化的血量比率
    GameManager.prototype.getCharioHealthRatio = function () {
        return this.charioUpgradationData[1] * 0.1 + 1;
    };
    //获取因为技能等级变化的防御比率
    GameManager.prototype.getCharioDefenseRotio = function () {
        return this.charioUpgradationData[3] * 0.1 + 1;
    };
    //攻击力比率
    GameManager.prototype.getCharioAttackRotio = function () {
        return this.charioUpgradationData[0] * 0.1;
    };
    //攻击速度比率
    GameManager.prototype.getCharioSpeedRotio = function () {
        return this.charioUpgradationData[2] * 0.1;
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
                            console.log("敌人死亡加载下一关");
                            this.loadNextWave();
                        }
                    }
                    break;
                case Constants_1.GameMode.Endless:
                    {
                        if (MonsterManager_1.default.getInstance().killed_monster_num >= this.cur_total_num) {
                            console.log("敌人死亡加载下一关2");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQThKO0FBTTlKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUVyRCxxREFBNEU7QUFDNUUsa0RBQTZDO0FBQzdDLDBDQUFxRDtBQUNyRCw2Q0FBd0M7QUFDeEMsdURBQTZEO0FBRTdELHlEQUFvRDtBQUNwRCxrREFBNkM7QUFDN0MsZ0RBQTZDO0FBQzdDLG9FQUErRDtBQUMvRCx5REFBK0Q7QUFDL0QsMEVBQWdGO0FBRWhGLDRFQUFrRjtBQUNsRixxREFBZ0Q7QUFJeEMsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFHbEM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEyK0NDO1FBditDVyxpQkFBVyxHQUFjLElBQUksQ0FBQztRQUM5QixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUN6QyxrRUFBa0U7UUFDbEUsb0JBQWMsR0FBYyxzQkFBUyxDQUFDLFlBQVksQ0FBQztRQUNuRCxrRUFBa0U7UUFDbEUsT0FBTztRQUNQLFVBQUksR0FBUyxJQUFJLENB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SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBYyxFQUFFLEdBQVc7UUFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLHNDQUFnQixHQUF2QixVQUF3QixLQUFjO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLHNDQUFnQixHQUF4QixVQUF5QixLQUFjLEVBQUUsR0FBVztRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7SUF4K0NjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBMitDL0I7SUFBRCxrQkFBQztDQTMrQ0QsQUEyK0NDLENBMytDd0MsRUFBRSxDQUFDLFNBQVMsR0EyK0NwRDtrQkEzK0NvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIEdvX1R5cGUsIElzRGVidWcsIFNlbGVjdFNraWxsX1R5cGUsIFZJREVPX1RZUEUsIFpoZW5nX1hpbmdfVHlwZSwgR2FtZU1vZGUsIEZpZ2h0aW5nSW5mbywgSmlhU3UgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENodVNoZW5nRGlhbiBmcm9tIFwiLi9HYW1lL0NodVNoZW5nRGlhblwiO1xyXG5pbXBvcnQgRW5lbXlIcE1hbmFnZXIgZnJvbSBcIi4vRW5lbXkvRW5lbXlIcE1hbmFnZXJcIjtcclxuaW1wb3J0IEhwVGV4dEhwTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL0hwVGV4dE1hbmFnZXJcIjtcclxuaW1wb3J0IE11c2ljIGZyb20gXCIuL1NvdW5kL011aXNjXCI7XHJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi9Tb3VuZC9Tb3VuZFwiO1xyXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9Ib21lXCI7XHJcbmltcG9ydCBIaW50IGZyb20gXCIuL0hpbnRcIjtcclxuaW1wb3J0IEdldFRpcCBmcm9tIFwiLi9VSS9HZXRUaXBcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZS9HYW1lXCI7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4vVUkvRGlhbG9nXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCBMb2NhbFZpZGVvIGZyb20gXCIuL0xvY2FsVmlkZW9cIjtcclxuaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFVubG9ja1NraWxsIGZyb20gXCIuL1VJL1VubG9ja1NraWxsXCI7XHJcbmltcG9ydCB7IFpoZW5YaW5nRGF0YSB9IGZyb20gXCIuL1poZW5YaW5nRGF0YVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IEJvc3NNYW5hZ2VyIGZyb20gXCIuL0Jvc3MvQm9zc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXIvVG93ZXJMZXZlbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckNvbmZpZ3VyZSwgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBIZXJvSW5mbywgSGVyb19UeXBlIH0gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEd1YUppR2lmdCBmcm9tIFwiLi9HdWFKaS9VaS9HdWFKaUdpZnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgR2FtZVdpbiBmcm9tIFwiLi9HYW1lL1VpL0dhbWVXaW5cIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBCdWZmRGlzcGxheSBmcm9tIFwiLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBSZXdhcmRTU1VpIGZyb20gXCIuL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHByZWZhYl9oaW50OiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmVmYWJfZ2V0X3RpcDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcm9sZV9zaG93X2hlcm86IEhlcm9fVHlwZSA9IEhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5ZCE56eN566h55CG5ZmoXHJcbiAgICBnYW1lOiBHYW1lID0gbnVsbDtcclxuICAgIGVuZW15X2hwX21hbmFnZXI6IEVuZW15SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGhwX3RleHRfbWFuYWdlcjogSHBUZXh0SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGNodV9zaGVuZ19kaWFuOiBDaHVTaGVuZ0RpYW4gPSBudWxsO1xyXG4gICAgLy/lo7Dpn7NcclxuICAgIHNvdW5kX21hbmFnZXI6IFNvdW5kID0gbnVsbDtcclxuICAgIG11c2ljX21hbmFnZXI6IE11c2ljID0gbnVsbDtcclxuICAgIC8v5ZCE5aSn6Iux6ZuE55qEXHJcbiAgICBhbGxfaGVybzogTWFwPG51bWJlciwgSGVybz4gPSBudWxsO1xyXG4gICAgLy9EUFPnu5/orqFcclxuICAgIGhlcm9fc2tpbGxfZHBzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgICBoZXJvX2F0dGFja19kcHM6IG51bWJlcltdID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqeS4u+WKqOaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfYWN0aXZlX2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG4gICAgLyoq5a6g54mp6L+e5pC65oqA6IO96YCg5oiQ55qE5Lyk5a6zICovXHJcbiAgICBwcml2YXRlIHBldF9jb25uZWN0X2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG5cclxuICAgIGN1cl9nYW1lX3N0YXRlOiBHYW1lU3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgIGN1cl9nYW1lX21vZGU6IEdhbWVNb2RlID0gR2FtZU1vZGUuTWFpbjtcclxuICAgIGN1cl9nYW1lX3NjZW5lOiBHYW1lU2NlbmUgPSBHYW1lU2NlbmUuaG9tZTtcclxuXHJcbiAgICAvL+W9k+WJjeeahOWKoOi9vei/m+W6plxyXG4gICAgY3VyX2xvYWRfcHJvZ3Jlc3M6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mr4/kuKroi7Hpm4TojrflvpfnmoTmuLjmiI/lhoXmioDog71cclxuICAgIGluZ2FtZV9za2lsbHM6IFNlbGVjdFNraWxsX1R5cGVbXSA9IFtdO1xyXG4gICAgLy/lvIDlp4vnmoTlhbPljaHnmoTmlbDmja5cclxuICAgIGN1cl93YXZlOiBudW1iZXIgPSAwO1xyXG4gICAgZmlnaHRpbmdfaW5mbzogRmlnaHRpbmdJbmZvID0gbnVsbDtcclxuICAgIC8vZHJvcF9kYXRhOkRyb3BEYXRhPW51bGw7XHJcbiAgICByZXdhcmRfZGF0YTogUmV3YXJkRGF0YVtdID0gW107XHJcbiAgICBpc19sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5o6J6JC954mp5ZOB55qE5oCq54mpaWRcclxuICAgIC8vZHJvcF9lbmVteV90eXBlOm51bWJlcj0wO1xyXG5cclxuICAgIGdhbWVfdG9faG9tZTogR29fVHlwZSA9IEdvX1R5cGUuTWFpbjtcclxuXHJcbiAgICBmdWh1b19udW06IG51bWJlciA9IDE7XHJcbiAgICBpc19zaG93X3RleHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmioDog73mp73kvY1cclxuICAgIG1heF9za2lsbF9zbG90OiBudW1iZXIgPSAyO1xyXG4gICAgLy/lkITkuKroi7Hpm4TmlbDmja7vvIzmuLjmiI/lhoXkvb/nlKjvvIzlhbPljaHlhoVidWZm44CCXHJcbiAgICBnYW1lX2hlcm9fZGF0YTogTWFwPG51bWJlciwgSGVyb0RhdGE+ID0gbnVsbDtcclxuICAgIC8v56ys5Yeg5Liq5oCq5pyJ5Y+v6IO954iG5pif5pifYnVmZlxyXG4gICAgLy9zdGFyX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLy9cclxuICAgIC8qKuW9k+WJjeaAu+WFseeahOaAqueJqeaVsOmHjyAqL1xyXG4gICAgY3VyX3RvdGFsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWunumZheS4iuW3sue7j+eUn+aIkOWHuuaAqueJqeeahOaVsOmHjyAqL1xyXG4gICAgY3VyX2NyZWF0ZV9udW06IG51bWJlciA9IDA7XHJcbiAgICBlbmVteV9vZmZzZXRfeTogbnVtYmVyID0gMDtcclxuICAgIGVuZW15X2F0dF95OiBudW1iZXIgPSAtMzAwO1xyXG4gICAgZW5lbXlfY3JlYXRlX3k6IG51bWJlciA9IDEwODA7XHJcbiAgICBsb2FkX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgbG9hZF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgamlzaHVfdGltZTogbnVtYmVyID0gMDtcclxuICAgIC8v6YCa5YWz5qyh5pWwXHJcbiAgICBwYXNzX2xldmVsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKua4uOaIj+mAn+eOhyAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lX3JhdGU6IG51bWJlciA9IDI7XHJcbiAgICAvKirmjInpkq7mjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgYnRuX3NldHVwX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmiJjmlpfmjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfc2V0dXBfcmF0ZTogbnVtYmVyID0gMTtcclxuICAgIC8qKuWNleasoeacgOmrmOS8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfZGFtYWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Y2V5qyh5pyA5bCP5Lyk5a6z5YC8ICovXHJcbiAgICBwcml2YXRlIG1pbl9kYW1hZ2U6IG51bWJlciA9IDk5OTk7XHJcbiAgICAvKiroh6rliqjmiJjmlpfmoIfor4YgKi9cclxuICAgIHB1YmxpYyBhdXRvX2ZpZ2h0aW5nOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKuW9k+WJjeeahOmYn+WIlyAqL1xyXG4gICAgcHVibGljIGN1cl90ZWFtX2xpc3Q6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgcHVibGljIGNoYXJpb1VwZ3JhZGF0aW9uRGF0YTogQXJyYXk8bnVtYmVyPiA9IFswLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuXHJcbiAgICBwdWJsaWMgY2hhcmlvVGlwOiBBcnJheTxzdHJpbmc+ID0gW1wi5Yqg5pS75Ye7XCIsIFwi6KGA6YeP5LiK6ZmQXCIsIFwi5pS76YCfXCIsIFwi6Ziy5b6hXCIsIFwi5oqA6IO96Ze06ZqUXCIsIFwi5bem5Y+z56e75YqoXCIsIFwi5Zue6KGAXCJdO1xyXG5cclxuICAgIHB1YmxpYyBjaGFyaW9Db250ZW50OiBBcnJheTxzdHJpbmc+ID0gW1wi5q+P5LiA57qn5aKe5Yqg5YWo5L2T6Iux6ZuE5pS75Ye75YqbMTAlXCIsIFwi5q+P5LiA57qn5aKe5Yqg5oiY6L2m6KGA6YeP5LiK6ZmQMTAlXCIsIFwi5q+P5LiA57qn5aKe5Yqg5YWo5L2T6Iux6ZuE5pS76YCfMTAlXCIsIFwi5q+P5LiA57qn5aKe5Yqg5oiY6L2m6Ziy5b6hMTAlXCIsIFwi5q+P5LiA57qn5YeP5bCR5oqA6IO96Ze06ZqUMTAlXCIsIFwi5q+P5LiA57qn5aKe5Yqg5oiY6L2m56e75Yqo6YCf5bqmMTAlXCIsIFwi5Zue5aSN5oiY6L2m5pyA5aSn6KGA6YePMjAlXCJdO1xyXG4gICAgLy/mmK/lkKbmmL7npLrkuobpgIDlh7rmuLjmiI/nmoTlr7nor53moYZcclxuICAgIHB1YmxpYyBpc19zaG93X2V4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5Yqo55S75L2N572uXHJcbiAgICBwdWJsaWMgYW5pVHlwZTogbnVtYmVyID0gNDtcclxuXHJcbiAgICAvL+aImOi9pueahOS9jee9rnhcclxuICAgIHB1YmxpYyBjaGFyUG9zWDogbnVtYmVyID0gMDtcclxuICAgIC8v5ri45oiP5Yqo55S75a2Y5YKo5pWw5o2uXHJcbiAgICAvLyBwdWJsaWMgbW92ZURhdGE6IEFycmF5PGNjLlZlYzI+ID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lTG9hZGVyb25cIik7XHJcblxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgaW5pdChzY2VuZTogR2FtZVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMuaXNfbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmlUeXBlID0gNDtcclxuICAgICAgICB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfc2NlbmUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuaG9tZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXRQbGF5R2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnJvbGVfc2hvd19oZXJvPUhlcm9fVHlwZS5TaGVTaG91O1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVTY2VuZS5nYW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsX2hlcm8gPSBuZXcgTWFwPG51bWJlciwgSGVybz4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtID0gdGhpcy5jdXJfY3JlYXRlX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5nYW1lX3NraWxscyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfZGF0YSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWh1b19udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmF1dG9fZmlnaHRpbmcgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LkF1dG9GaWdodGluZykgPiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLmN1cl9sb2FkX3Byb2dyZXNzID0gMDsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blNldHVwUmF0ZShyYXRlOiBudW1iZXIsIGlzQWN0aXZpdHk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc2V0dXBfcmF0ZSA9IHJhdGU7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICBpZiAoaXNBY3Rpdml0eSkge1xyXG4gICAgICAgICAgICBpZiAocmF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf5byA5ZCv5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/lhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRBdXRvRmlnaHRpbmcoaXNBdXRvOiBib29sZWFuLCBpc0FjdGl2aXR5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIHRoaXMuYXV0b19maWdodGluZyA9IGlzQXV0bztcclxuICAgICAgICAvLyBpZiAoaXNBY3Rpdml0eSkge1xyXG4gICAgICAgIC8vICAgICBpZiAoaXNBdXRvKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX5byA5ZCv5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpflhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ0blNldHVwUmF0ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ0bl9zZXR1cF9yYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZpZ2h0aW5nUmF0ZShyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGUgPSByYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZVJhdGUocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy90aGlzLmdhbWVfcmF0ZSA9IHJhdGUgKiB0aGlzLmJ0bl9zZXR1cF9yYXRlICogdGhpcy5maWdodGluZ19zZXR1cF9yYXRlO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZVJhdGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSYXRlKCkge1xyXG4gICAgICAgIC8vdGhpcy5nYW1lX3JhdGUgPSAxO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWF4RGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IHRoaXMubWF4X2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heF9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heERhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWluRGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IHRoaXMubWluX2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pbkRhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlID0gMS40O1xyXG4gICAgICAgIGxldCBzY2FsZVZhbHVlID0gMTtcclxuICAgICAgICBsZXQgcmF0ZSA9IGRhbWFnZSAvIHRoaXMuZ2V0TWF4RGFtYWdlKCk7XHJcbiAgICAgICAgc2NhbGVWYWx1ZSA9IHJhdGUgKiBtYXhTY2FsZTtcclxuICAgICAgICBpZiAoc2NhbGVWYWx1ZSA8IDEpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY2FsZVZhbHVlID4gbWF4U2NhbGUpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IG1heFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBkYW1hZ2UgLyB0aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIGlmIChyYXRlIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDAuNCkge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCAwLjYpIHtcclxuICAgICAgICAgICAgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgMC44KSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF80O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF81O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVybyhoZXJvSWQ6IEhlcm9fVHlwZSk6IEhlcm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbF9oZXJvLmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRHYW1lSGVyb0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGlzSW5pdERwcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9fYXR0YWNrX2Rwcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YSA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmN1cl90ZWFtX2xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KHRoaXMuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0RhdGEgPSBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGaWdodGluZ0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSGVyb19UeXBlLkhlcm9fTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5pdERwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGhvbWVIZXJvRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaSk7XHJcbiAgICAgICAgICAgIGlmIChob21lSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUoaG9tZUhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90ZWFtX2xpc3QuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/t+Wuq+aooeW8j+WKoOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKz0gKGZpZ2h0aW5nRGF0YS5BdHRhY2tQZXIpICogaGVyb0RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKz0gKGZpZ2h0aW5nRGF0YS5EZWZlbnNlUGVyKSAqIGhlcm9EYXRhLmZpeF9kZWZlbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5Dcml0aWNhbCArPSBmaWdodGluZ0RhdGEuQ3JpdGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuSGl0ICs9IGZpZ2h0aW5nRGF0YS5IaXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvRGVmZW5zZVJvdGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCArPSBoZXJvRGF0YS5IaXQgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLCBoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmluaXRXYWxsKG1haW5XYWxsRGF0YSwgV2FsbFR5cGUuTWFpbik7XHJcbiAgICAgICAgLy8gaWYoaHA8MzAwMCl7XHJcbiAgICAgICAgLy8gICAgIGhwPTMwMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRlZmVuc2U8MTAwKXtcclxuICAgICAgICAvLyAgICAgZGVmZW5zZT0xMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy53YWxsX2RhdGEuaW5pdEluaGVyaXREYXRhKGhwLGRlZmVuc2UsbWlzcyxhbnRpQ3JpdGljYWwsYW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpIHtcclxuICAgICAgICBsZXQgaXNJbml0RHBzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGVyb19hdHRhY2tfZHBzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luaXREcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMgPSBuZXcgTWFwPFBldEluZm8sIG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhID0gbmV3IE1hcDxudW1iZXIsIEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdCA9IFtIZXJvX1R5cGUuU2hvdVdhbmcsIEhlcm9fVHlwZS5BTnVCaVNpLCBIZXJvX1R5cGUuWmhlbkRlLCBIZXJvX1R5cGUuTWVpTW8sIEhlcm9fVHlwZS5MZWlTaGVuXTtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VyX3RlYW1fbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmFkZFR1dG90aWFsc0hlcm9GdWxsKHRoaXMuY3VyX3RlYW1fbGlzdFtpXSwgaSwgbnVsbCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjIgKiB0aGlzLmdldENoYXJpb0hlYWx0aFJhdGlvKCk7O1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yICogdGhpcy5nZXRDaGFyaW9EZWZlbnNlUm90aW8oKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNYXhEYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrICogaGVyb0RhdGEuRXh0cmFDcml0aWNhbClcclxuICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgLy90aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLGhlcm9EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaW5pdFdhbGwobWFpbldhbGxEYXRhLCBXYWxsVHlwZS5NYWluKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKSB7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvRGVmZW5zZVJvdGlvKCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0ICs9IGhlcm9EYXRhLkhpdCAqIDAuMjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkucmVmcmVzaFdhbGxEYXRhQnlhZGRIZXJvKG1haW5XYWxsRGF0YSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoTWFpbldhbGxEYXRhKCkge1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBjYy5pbnN0YW50aWF0ZSh2Lmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjIgKiB0aGlzLmdldENoYXJpb0hlYWx0aFJhdGlvKCk7O1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yICogdGhpcy5nZXRDaGFyaW9EZWZlbnNlUm90aW8oKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlZnJlc2hXYWxsRGF0YShtYWluV2FsbERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFRpcCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJlZmFiX2hpbnQpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfaGludCA9IGFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5wcmVmYWJfZ2V0X3RpcCkge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYl9nZXRfdGlwID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBkdD86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9oaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgaGludC5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLCBkdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBoaW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGludCk7XHJcbiAgICAgICAgICAgIGhpbnQucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICBoaW50SnMuc2hvd0hpbnRNZXNzYWdlKG1lc3NhZ2UsIGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldFRpcChnZXROb2RlOiBjYy5Ob2RlLCBjYWxsQmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiX2hpbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsIGNhbGxCYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9nZXRfdGlwKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZFNob3dHZXRQb3JwKGdldE5vZGUsIGNhbGxCYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd011bHRpcGxlR2V0VGlwKGdldE5vZGVzOiBjYy5Ob2RlW10sIGNhbGxCYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5wcmVmYWJfaGludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdnZXRfdGlwJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLCBjYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfZ2V0X3RpcCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0VGlwKS5hZGRNdWx0aXBsZVBvcnAoZ2V0Tm9kZXMsIGNhbGxCYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHllc0NhbGxiYWNrOiBGdW5jdGlvbiwgbm9DYWxsYmFjazogRnVuY3Rpb24sIHNob3dUeXBlPzogbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfc2hvd19leGl0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfZXhpdCA9IHRydWU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLCB5ZXNDYWxsYmFjaywgbm9DYWxsYmFjaywgc2hvd1R5cGUsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0geTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCdXlEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IHN0cmluZyB8IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnZGlhbG9nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGlhbG9nKS5zaG93RGlhbG9nKG1lc3NhZ2UsIHllc0NhbGxiYWNrLCBub0NhbGxiYWNrLCBzaG93VHlwZSwgeSwgY3VycmVuY3kpO1xyXG4gICAgICAgICAgICAvLyBpZih5KXtcclxuICAgICAgICAgICAgLy8gICAgIG5vZGUueT15O1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvY2FsVmlkZW8oeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbiwgaXNWaWRlbz86IGJvb2xlYW4pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndmlkZW9fZGlhbG9nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTG9jYWxWaWRlbykuaW5pdCh5ZXNDYWxsYmFjaywgbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR0FNRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95QWxsRHJvcCgpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUFsbE1vbnN0ZXIoKTtcclxuICAgICAgICB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmN1cl93YXZlID0gMDtcclxuICAgICAgICB0aGlzLmN1cl90b3RhbF9udW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBUdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LnJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsUm91bmQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMubG9hZExldmVsLCAwLjUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuICAgIC8v5qC55o2u5b2T5YmNY2hhcmlvVXBncmFkYXRpb25EYXRh6I635Y+W5LiA5Liq5Y2H57qn57uEXHJcbiAgICBnZXRjaGFyaW9VcGdyYWRhdGlvbkRhdGEoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIGFycjogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciBhclRlbXA6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmlvVXBncmFkYXRpb25EYXRhW2ldIDwgNSB8fCBpID09IDYpIHtcclxuICAgICAgICAgICAgICAgIGFyVGVtcC5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y+v5Y2H57qn5oqA6IO95pWw6YeP5bCP5LqOM1xyXG4gICAgICAgIGlmIChhclRlbXAubGVuZ3RoIDw9IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyVGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJUZW1wLnNvcnQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAtIDAuNVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFyclswXSA9IGFyVGVtcFswXTtcclxuICAgICAgICBhcnJbMV0gPSBhclRlbXBbMV07XHJcbiAgICAgICAgYXJyWzJdID0gYXJUZW1wWzJdO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcblxyXG4gICAgfVxyXG4gICAgLy/ojrflj5bpmLXliJfnsbvlnotcclxuICAgIGdldFpoZW5nWGluZ0RhdGEoKTogWmhlblhpbmdEYXRhIHtcclxuICAgICAgICBsZXQgd2F2ZURhdGEgPSB0aGlzLmZpZ2h0aW5nX2luZm9bdGhpcy5jdXJfd2F2ZV07XHJcbiAgICAgICAgLy/op6PmnpDpmLXlnovmlbDmja5cclxuICAgICAgICBsZXQgenhEYXRhID0gbmV3IFpoZW5YaW5nRGF0YSgpO1xyXG4gICAgICAgIGxldCBhbGxFbmVteURhdGEgPSBuZXcgQXJyYXk8SnNvbk1vbnN0ZXJDb25maWd1cmU+KCk7XHJcbiAgICAgICAgbGV0IE1DTSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3YXZlRGF0YS5tb25zdGVyX251bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbUlkID0gd2F2ZURhdGEubW9uc3Rlcl9pZFtpXTtcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhID0gTUNNLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1JZCk7XHJcbiAgICAgICAgICAgIGxldCBlbmVteU51bSA9IHdhdmVEYXRhLm1vbnN0ZXJfbnVtW2ldO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGVuZW15TnVtOyBuKyspIHtcclxuICAgICAgICAgICAgICAgIGFsbEVuZW15RGF0YS5wdXNoKGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S6jOasoeWkhOeQhu+8jOaKimJvc3Pot59idWZm5oCq5pS+5pyA5YmN6Z2iXHJcbiAgICAgICAgYWxsRW5lbXlEYXRhLnNvcnQoKGE6IEpzb25Nb25zdGVyQ29uZmlndXJlLCBiOiBKc29uTW9uc3RlckNvbmZpZ3VyZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5TdHJlbmd0aFR5cGUgLSBhLlN0cmVuZ3RoVHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGFsbEVuZW15RGF0YSwgenhEYXRhLCAwLCAwKTtcclxuICAgICAgICByZXR1cm4genhEYXRhO1xyXG4gICAgfVxyXG4gICAgZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoZW5lbXlEYXRhczogSnNvbk1vbnN0ZXJDb25maWd1cmVbXSwgb3V0OiBaaGVuWGluZ0RhdGEsIGJ1ZmZOdW06IG51bWJlciwgbWluWTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/pmLXlnotcclxuICAgICAgICBsZXQgenhUeXBlID0gWmhlbmdfWGluZ19UeXBlLlpYMDtcclxuICAgICAgICAvL+maj+acuuS4gOS4qumYteWei1xyXG4gICAgICAgIHp4VHlwZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFpoZW5nX1hpbmdfVHlwZS5udW0pO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB6eFR5cGU9WmhlbmdfWGluZ19UeXBlLueureWktDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IHp4RGF0YSA9IG5ldyBaaGVuWGluZ0RhdGEoKTtcclxuICAgICAgICAvL3p4RGF0YT10aGlzLmdhbWUuemhlbl94aW5nLmpzb25benhUeXBlXTtcclxuICAgICAgICBsZXQgbGVuID0gZW5lbXlEYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGlzTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBvdGhlck51bSA9IDA7XHJcbiAgICAgICAgbGV0IGlzSGF2ZUJvc3MgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZXdhaU51bSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGUgPT0gU3RyZW5ndGhUeXBlLkJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZUJvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8ICh6eERhdGEub3RoZXJfcG9zLmxlbmd0aCArIGV3YWlOdW0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5lbXlEYXRhc1tpXS5TdHJlbmd0aFR5cGUgPT0gU3RyZW5ndGhUeXBlLkJvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreS4gOS4i+aYr+WQpmJvc3PkvY3nva7lt7Lnu4/nlKjkuobvvIzlpoLmnpznlKjkuobku6Pooajov5nlhbPmnIky5LiqYm9zc++8jOmcgOimgeaKiui/meS4qmJvc3PmlL7liLBidWZm5L2N572u5LiKXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5ib3NzX3BvcztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuYvliY3msqHmnInorr7nva5ib3Nz5L2N572uICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3V0LmJvc3NfcG9zLnkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQuYm9zc19wb3MgPSBkaXNQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3YWlOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0LmJ1ZmZfcG9zLmxlbmd0aCA8IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYnVmZl9wb3NbYnVmZk51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLm90aGVyX3Bvc1tvdGhlck51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5vdGhlcl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5FbGl0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXQuYnVmZl9wb3MubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c6L+Z5rOi5rKh5pyJYm9zc++8jOW5tuS4lOaciWJ1ZmbvvIzliJlidWZm5Luj5pu/Ym9zc+S9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNIYXZlQm9zcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5ib3NzX3BvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dC5idWZmX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmVCb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYnVmZl9wb3NbYnVmZk51bV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZk51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5vdGhlcl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNQb3MgPSBjYy52Mihwb3MueCwgcG9zLnkgKyBtaW5ZKTtcclxuICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBvdGhlck51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXNOZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc05leHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBtaW5ZID0genhEYXRhLm90aGVyX3Bvc1t6eERhdGEub3RoZXJfcG9zLmxlbmd0aCAtIDFdLnkgKyA2MCAtIDUwNTtcclxuICAgICAgICAgICAgdGhpcy5nZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShlbmVteURhdGFzLnNsaWNlKHp4RGF0YS5vdGhlcl9wb3MubGVuZ3RoKSwgb3V0LCBidWZmTnVtLCBtaW5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+aYvuekuuWFs+WNoeaVsOaNrlxyXG4gICAgcHVibGljIGxvYWRMZXZlbCgpIHtcclxuXHJcbiAgICAgICAgaWYgKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkgJiYgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19sb2FkX29rICAmJiAoUGV0LmN1cl9sb2FkZWRfbnVtID49IFBldC5tYXhfbG9hZF9udW0pICYmIHRoaXMuZmlnaHRpbmdfaW5mbyAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApICsgMVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCB3YXZlbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB3YXZlbnVtYmVyLy8oRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19f6L+b5p2l5LqGXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckRhdGEgPSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhc1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgbGV0IGlzQmFvWGlhbmdMZXZlbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHVzZVdpZHRoID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IChjYy53aW5TaXplLndpZHRoIC0gdXNlV2lkdGgpIC8gMiAtIGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15X2NyZWF0ZV95ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW5lbXlfY3JlYXRlX3k9MDtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hUaW1lID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25zdGVyRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtb25zdGVyRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtSWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZSA9IE1DTS5nZXRTdHJlbmd0aFR5cGUobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBkYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyTGV2ZWwgPSBkYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgLy/kuIDnu4TmgKos5q+P57uE5oCq6YO95LiA6Ie055qE77yM5omA5Lul5Y+W5YW25Lit5LiA5Liq5bCx6KGM5LqGXHJcbiAgICAgICAgICAgICAgICAvL+WIhuS4gOS4i+e8nemamSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IE1DTS5nZXRNb25zdGVyU3BhY2luZyhtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heE51bVhYID0gTWF0aC5mbG9vcih1c2VXaWR0aCAvIHdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5XaWR0aCA9IHVzZVdpZHRoICUgbWF4TnVtWFg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSBNYXRoLmZsb29yKHJlbWFpbldpZHRoIC8gbWF4TnVtWFgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUluZGV4cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IG1heE51bVhYOyB4eCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlSW5kZXhzLnB1c2goeHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy946L205re75Yqg55qE5pWw6YeP77yM6L6+5YiwbWF4TnVtWFjlkI7vvIx5eU51bSsrXHJcbiAgICAgICAgICAgICAgICBsZXQgeHhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5TnVtID0gMDtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUaW1lICs9IGRhdGEucmVmcmVzaF90aW1lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrmjpLliJdZWVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5eSA9IHRoaXMuZW5lbXlfY3JlYXRlX3kgKyB3aWR0aCAqIHl5TnVtICsgTWF0aC5yYW5kb20oKSAqIHdpZHRoICogMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py6566X5Ye6WFhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlSW5kZXhzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGxlZnQgKyB3aWR0aCAvIDIgKyB3aWR0aCAqIHVzZUluZGV4c1tyYW5kSW5kZXhdICsgTWF0aC5yYW5kb20oKSAqIDEwIC0gNSwgeXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5zcGxpY2UocmFuZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZW5ndGhUeXBlICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlTW9uc3RlckJ5SWQobUlkLCBwb3MsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2NyZWF0ZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93SmlhblRvdVBvcyh0aGlzLmN1cl9jcmVhdGVfbnVtIC8gdGhpcy5jdXJfdG90YWxfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVmcmVzaFRpbWUgKyBNYXRoLnJhbmRvbSgpICogKDYwIC8gTUNNLmdldFNwZWVkKG1JZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh4TnVtID4gbWF4TnVtWFgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl5TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4eE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbWF4TnVtWFg7IHh4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLlRvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCwgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQm9zcyhtSWQsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKVt0aGlzLmN1cl93YXZlXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb25zdGVyV2FybmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUdXRvdGlhbHMoKTtcclxuICAgICAgICAgICAgLy/lm6DkuLrlrp3nrrHlhbPljaHmmK/mj5Lov5vljrvnmoTvvIzmiYDku6Xmg7PopoHojrflj5blh4bnoa7nmoTmlbDlgLzvvIzpnIDopoHlh4/ljrvlhbblh7rnjrDnmoTmrKHmlbBcclxuICAgICAgICAgICAgLy90aGlzLmRyb3BfZGF0YT1MZXZlbEpzb25EYXRhLmdldFdhdmVEcm9wRGF0YShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlLXRoaXMubGV2ZWxfYnVmZl9udW0pO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgbGV0IGlzTG9hZE5leHQgPSAhaXNCYW9YaWFuZ0xldmVsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA+PSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0xvYWROZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVseVQgPSB0aGlzLmZpZ2h0aW5nX2luZm8ud2F2ZV9yZWZyZXNoX3RpbWVbdGhpcy5jdXJfd2F2ZSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bu26L+f5Yqg6L295LiL5LiA5YWzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBkZWx5VCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmdfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkTGV2ZWxEYXRhcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE5leHRXYXZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YXZlIDwgdGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXMubGVuZ3RoIC0gMSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUrKztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPljaHlop7liqDliLBcIiArIHRoaXMuY3VyX3dhdmUgKyBcIiBcIiArIHRoaXMuY3VyX3dhdmUgJSAzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgJSAzID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S65o+Q56S6VElwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JvZ3VlbGlrZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkTGV2ZWxEYXRhcygpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS7gOS5iOaXtuWAmei/m+adpVwiKVxyXG4gICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IG5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApOy8v5rOi5pWwXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFJvdW5kKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBUb3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBhZGRDaGVja1R1dG90aWFsc0hlcm8oaGVyb0lkOiBIZXJvX1R5cGUsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzogSGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBoZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IDEwMDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3N0YWdlID0gNTtcclxuICAgICAgICBsZXQgZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgNCwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZEhlcm8oaGVyb0lkOiBIZXJvX1R5cGUsIHRlYW1JbmRleDogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvSW5mbyhoZXJvSWQpKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChoZXJvSWQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkSGVybyhoZXJvSWQsIHRlYW1JbmRleCwgY2FsbGJhY2spO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJlZnJlc2hNYWluV2FsbERhdGEoKTtcclxuICAgIH1cclxuICAgIC8v6I635Y+W5Zug5Li65oqA6IO9562J57qn5Y+Y5YyW55qE6KGA6YeP5q+U546HXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbMV0gKiAwLjEgKyAxO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blm6DkuLrmioDog73nrYnnuqflj5jljJbnmoTpmLLlvqHmr5TnjodcclxuICAgIHB1YmxpYyBnZXRDaGFyaW9EZWZlbnNlUm90aW8oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbM10gKiAwLjEgKyAxO1xyXG4gICAgfVxyXG4gICAgLy/mlLvlh7vlipvmr5TnjodcclxuICAgIHB1YmxpYyBnZXRDaGFyaW9BdHRhY2tSb3RpbygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbMF0gKiAwLjE7XHJcbiAgICB9XHJcblxyXG4gICAgIC8v5pS75Ye76YCf5bqm5q+U546HXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcmlvU3BlZWRSb3RpbygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbMl0gKiAwLjE7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqDkuIDkuKrmu6Hnuqfmu6Hoo4Xmu6HlrqDniannmoToi7Hpm4QgKi9cclxuICAgIGFkZFR1dG90aWFsc0hlcm9GdWxsKGhlcm9JZDogSGVyb19UeXBlLCB0ZWFtSW5kZXg6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogSGVyb0RhdGEge1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzogSGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBoZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvSWQpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2UgPSAxLy9IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb0lkKTsgICBcclxuICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9JZCk7XHJcbiAgICAgICAgbGV0IGVxdWlwTWF4U3RhZ2UgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMSA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMSwgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjIgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDIsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIzID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgzLCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyNCA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoNCwgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgc3dpdGNoIChoZXJvSWQpIHtcclxuICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDQxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDIxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAyMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTE6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMTEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEyOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDMxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbylcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChoZXJvSWQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkSGVybyhoZXJvSWQsIHRlYW1JbmRleCwgY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVHV0b3RpYWxzKCkge1xyXG4gICAgICAgIGlmICghVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMDIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEgLyBKaWFTdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pWM5Lq65q275Lqh5LqGLOWTquS4quaVjOS6uuatu+S6oeS6hu+8jOWTquS4quiLsembhOWHu+adgOeahFxyXG4gICAgb25FbmVteURpZShzY29yZTogbnVtYmVyLCBpc0FkZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChpc0FkZCkge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bSA+PSB0aGlzLmN1cl90b3RhbF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlYzkurrmrbvkuqHliqDovb3kuIvkuIDlhbNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWROZXh0V2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW0gPj0gdGhpcy5jdXJfdG90YWxfbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pWM5Lq65q275Lqh5Yqg6L295LiL5LiA5YWzMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlKz1lbmVteVRzLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlnaHRDZW50ZXIoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKDAsICg3MDAgKyB0aGlzLmVuZW15X29mZnNldF95IC0gdGhpcy5lbmVteV9hdHRfeSkgLyAyICsgdGhpcy5lbmVteV9hdHRfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxDYW5jZWwoaXNTaG93OiBib29sZWFuKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4aXRQbGF5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmxvYWRfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZF9qaXNodSA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVybyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja1RvSG9tZShzaG93SGVybz86IEhlcm9fVHlwZSkge1xyXG4gICAgICAgIHRoaXMucm9sZV9zaG93X2hlcm8gPSBzaG93SGVybyA/IHNob3dIZXJvIDogSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX190eXBlMVwiLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lKVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSwgKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8v55yf5a6e6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1RydWUgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlID0gcHJvZ3Jlc3NUcnVlIC8gMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmcgPSAobG9hZGluZ0Jhci5wcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RhbmdlclRleHQoKSB7XHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvZGFuZ2VyVGV4dCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dSb2d1ZWxpa2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUm9ndWVsaWtlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9Sb2d1ZWxpa2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Um9ndWVsaWtlVGlwKCk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVQYXVzZVVpKCk7XHJcbiAgICB9XHJcbiAgICBzaG93QnRuQnVmZih0eXBlKS8vMDpCdWZm5bGV56S6ICAgMe+8mkJ1ZmbpgInmi6lcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9QYXVzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CdWZmRGlzcGxheSwgVUlMYXllckxldmVsLlR3bywge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdFVpKHR5cGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVdpbigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaJk+WujOS4gOWbnuWQiOS6hlwiKVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbiB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX0xvc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIucGF1c2UoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfV2luO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clN0YXJ0TGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ56ysTueroOeOqeWutuaVsCArIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGN1clN0YXJ0TGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ5oyR5oiY5YWz5Y2hICsgY3VyU3RhcnRMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID0gY3VyU3RhcnRMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaEZyb21HYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjA0LCgpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy/lvIDlp4vmraPlvI/lhbPljaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuYWRkVG93ZXJMZXZlbCgxKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuS4iemAieS4gFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMSk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy/nhormtojlpLFcclxuICAgICAgICBsZXQgc2hvd3dhbmcgPSB0aGlzLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIGlmIChzaG93d2FuZykge1xyXG4gICAgICAgICAgICBzaG93d2FuZy5vbkdhbWVXaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdFNraWxsKGRlbGF5VGltZTogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL+W7tui/n+WxleekulxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvc2VsZWN0X3NraWxsJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmdWkgPSBjYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSwgeyB5OiAtMTQwMCB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZGVsYXlUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb2NrU2tpbGwoeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndWkvZ2FtZS91bmxvY2tfdWknLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChVbmxvY2tTa2lsbCkuaW5pdCh5ZXNDYWxsYmFjaywgbm9DYWxsYmFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlYWtMZXZlbFNraWxsKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgLy8gICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNb2RlLk1haW4pO1xyXG4gICAgLy8gICAgIGxldCBpc0NhblNob3c9ZmFsc2U7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8NTsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV0IGhlcm86SGVybz1udWxsO1xyXG4gICAgLy8gICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAvLyAgICAgICAgIGlmKGhlcm9UeXBlPj0wKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBoZXJvPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm9baGVyb1R5cGVdOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGlmKGhlcm8ubGV2ZWxfYnVmZi5sZW5ndGg8dGhpcy5tYXhfc2tpbGxfc2xvdClcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpc0NhblNob3c9dHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZihpc0NhblNob3c9PWZhbHNlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5tYXhfc2tpbGxfc2xvdD09MSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/or7TmmI7mnKrop4bpopHop6PplIFcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1VubG9ja1NraWxsKCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKChpc1N1Yzpib29sZWFuKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihpc1N1YylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhfc2tpbGxfc2xvdD0yO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vkuIvkuIDms6LmgKpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxWSURFT19UWVBFLkh1b2RvbmcpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8v55u05o6l5byA5aeL5LiL5LiA5rOi5oCqXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/nm7TmjqXmj5DnpLrmioDog73mu6HkuobvvIzot7Pov4flvLnnqpdcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguU2tpbGxfaXNfZnVsbCkpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93U2VsZWN0U2tpbGwoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgb25GdWh1bygpIHtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZzs7XHJcblxyXG4gICAgICAgIGxldCBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICBpZiAoZGFuZ2VyVGV4dCkge1xyXG4gICAgICAgICAgICBkYW5nZXJUZXh0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93RnVodW8oKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlTGV2ZWxXYXZlKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL2Z1aHVvX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5mdWh1b19udW0tLTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZUxvc2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlpLHotKVcIiwpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfTG9zZSB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9Mb3NlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2VVaSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLml6DlsL3mjJHmiJjog5zliKlcIilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJCb3Nz5oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uV2FsbERpZSgpIHtcclxuICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZnVodW9fbnVtPjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0Z1aHVvKCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9uc3Rlcldhcm5pbmcoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0VuZW15Q29taW5nKTtcclxuICAgICAgICBsZXQgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgY2MudjIoMCwgMCksIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUpO1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMjUsIHsgb3BhY2l0eTogMjU1IH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAxMDAgfSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS50bygwLjUsIHsgb3BhY2l0eTogMTAwIH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkudG8oMC4yNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9zc1dhcm5pbmcoKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2dhbWUvYm9zc193YXJuaW5nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGNodXhpYW5BY3QgPSAwLjM7XHJcbiAgICAgICAgICAgIGxldCB4aWFvc2hpQWN0ID0gMC4xNTtcclxuICAgICAgICAgICAgbGV0IHRpbmdsaXVBY3QgPSAyO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGF1dG8gPSBub2RlLmdldENoaWxkQnlOYW1lKCdhdXRvJyk7XHJcbiAgICAgICAgICAgIGF1dG8ueCA9IC0zMjA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGF1dG8pLnRvKGNodXhpYW5BY3QsIHsgeDogMzIwIH0pLnRvKDIsIHsgeDogMTA4MCB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhcm5pbmdMYWJlbCcpO1xyXG4gICAgICAgICAgICB3YXJuaW5nTGFiZWwueCA9IDY0MDtcclxuICAgICAgICAgICAgY2MudHdlZW4od2FybmluZ0xhYmVsKS50byhjaHV4aWFuQWN0LCB7IHg6IDAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oeGlhb3NoaUFjdCwgeyB4OiAtNjQwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCBib3NzTGFiZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKCdib3NzTGFiZWwnKTtcclxuICAgICAgICAgICAgYm9zc0xhYmVsLnggPSAtNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihib3NzTGFiZWwpLnRvKGNodXhpYW5BY3QsIHsgeDogMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50byh4aWFvc2hpQWN0LCB7IHg6IDY0MCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0cyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VmZmVjdHMnKTtcclxuICAgICAgICAgICAgZWZmZWN0cy5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oZWZmZWN0cykuZGVsYXkoY2h1eGlhbkFjdCArIDAuMikuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkuZGVsYXkodGluZ2xpdUFjdCAtIGNodXhpYW5BY3QgLSAwLjIpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5kZWxheSh0aW5nbGl1QWN0KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMix7eToyMDB9KS5kZWxheSgwLjUpLnRvKDAuMix7c2NhbGU6MS4yfSkudG8oMC4yLHtzY2FsZTowLjh9KS50bygwLjEse3NjYWxlOjMyLG9wYWNpdHk6MH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnNhdmVNdXNpY011dGUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnNhdmVTb3VuZE11dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U3BlZWRVcFVpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5nYW1lKSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCd1aS9nYW1lL3NwZWVkX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcmVmcmVzaENvaW5TaG93KCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEdlbVNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hMb25nSmluZ1Nob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoTG9uZ0ppbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVXNlckV4cFNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoVXNlckV4cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGp1bW9Ub1VpKGluZGV4OiBCdG5fSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpLmp1bW9Ub1VpKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vQW5kU2hvd1VpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBob21lLmNoZWFrVW5sb2NrKCk7XHJcbiAgICAgICAgICAgIGhvbWUuc2hvd1VpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2haaGFubGlTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaFpoYW5MaVNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG9wU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIGhvbWUucmVmcmVzaFRvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hHdWFKaUdpZnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGJ0bk9mZmxpbmVHaWZ0ID0gY2MuZmluZCgnQ2FudmFzL21haW5fdWkvYnRuT2ZmbGluZUdpZnQnKTtcclxuICAgICAgICAgICAgYnRuT2ZmbGluZUdpZnQuZ2V0Q29tcG9uZW50KEd1YUppR2lmdCkuY2hlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVmcmVzaFJvbGUoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY3VyX2dhbWVfc2NlbmUhPUdhbWVTY2VuZS5ob21lKVxyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBsZXQgcm9sZVVpPWNjLmZpbmQoJ0NhbnZhcy9yb2xlX3VpJyk7XHJcbiAgICAvLyAgICAgaWYocm9sZVVpLmFjdGl2ZT09dHJ1ZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJvbGVVaS5nZXRDb21wb25lbnQoUm9sZVVpKS5vbkVuYWJsZSgpO1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfSAgICBcclxuXHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWuoOeJqS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEBwYXJhbSBudW0g5aKe5Yqg55qE5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vd051bSA9IHRoaXMuZ2V0UGV0QWN0aXZlRHBzKHBldElkKTtcclxuICAgICAgICBsZXQgbmV3TnVtID0gbm93TnVtICsgbnVtO1xyXG4gICAgICAgIHRoaXMuc2V0UGV0QWN0aXZlRHBzKHBldElkLCBuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHJldHVybnMg5b2T5YmN55qEZHBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldF9hY3RpdmVfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQZXRBY3RpdmVEcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQocGV0SWQsIG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFBldENvbm5lY3REcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vd051bSA9IHRoaXMuZ2V0UGV0Q29ubmVjdERwcyhwZXRJZCk7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IG5vd051bSArIG51bTtcclxuICAgICAgICB0aGlzLnNldFBldENvbm5lY3REcHMocGV0SWQsIG5ld051bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nmoRkcHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBldENvbm5lY3REcHMocGV0SWQ6IFBldEluZm8pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldF9jb25uZWN0X2Rwcy5nZXQocGV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQocGV0SWQsIG51bSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==