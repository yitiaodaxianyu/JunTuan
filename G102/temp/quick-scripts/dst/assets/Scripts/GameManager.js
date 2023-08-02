
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
var WXManagerEX_1 = require("../startscene/WXManagerEX");
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
        _this.charioUpgradationData = [0, 0, 0, 0, 0, 0];
        _this.charioTip = ["攻击伤害", "血量上限", "攻击速度", "增强防御", "技能间隔", "恢复血量"];
        _this.charioContent = [
            ["没有加成", "所有英雄攻击力提升+10%", "所有英雄攻击力提升+20%", "所有英雄攻击力提升+30%", "所有英雄攻击力提升+40%", "所有英雄攻击力提升+50%"],
            ["没有加成", "战车血量上限+20%", "战车血量上限+40%", "战车血量上限+60%", "战车血量上限+80%", "战车血量上限+100%"],
            ["没有加成", "所有英雄攻击速度提升+10%", "所有英雄攻击速度提升+20%", "所有英雄攻击速度提升+30%", "所有英雄攻击速度提升+40%", "所有英雄攻击速度提升+50%"],
            ["没有加成", "战车防御力提升+15%", "战车防御力提升+30%", "战车防御力提升+45%", "战车防御力提升+60%", "战车防御力提升+75%"],
            ["没有加成", "所有英雄技能CD-0.5秒", "所有英雄技能CD-1秒", "所有英雄技能CD-1.5秒", "所有英雄技能CD-2秒", "所有英雄技能CD-2.5秒"],
            ["没有加成", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%"]
        ];
        _this.herUpContent = [[],
            ["没有加成", "1.普攻伤害增加+5%\n2.技能伤害增加+5%", "1.普攻伤害增加+10%\n2.技能伤害增加+10%", "1.普攻伤害增加+15%\n2.技能伤害增加+15%", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+25%\n2.技能伤害增加+25%"],
            ["没有加成", "1.普攻弓箭穿透敌人个数+1\n2.技能伤害增加+5%", "1.普攻弓箭穿透敌人个数+2\n2.技能伤害增加+10%", "1.普攻弓箭穿透敌人个数+3\n2.技能伤害增加+15%", "1.普攻弓箭穿透敌人个数+3\n2.技能伤害增加+20%", "1.普攻弓箭穿透敌人个数+5\n2.技能伤害增加+25%"],
            ["没有加成", "1.普攻伤害增加+5%\n2.技能伤害增加+5%", "1.普攻伤害增加+10%\n2.技能伤害增加+10%", "1.普攻伤害增加+15%\n2.技能伤害增加+15%", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+25%\n2.技能伤害增加+25%"],
            ["没有加成", "1.普攻伤害增加+5%\n2.技能伤害增加+5%,缠绕时间增加0.5秒。", "1.普攻伤害增加+10%\n2.技能伤害增加+10%,缠绕时间增加1秒。", "1.普攻伤害增加+15%\n2.技能伤害增加+15%,缠绕时间增加1.5秒。", "1.普攻伤害增加+20%\n2.技能伤害增加+20%,缠绕时间增加2秒。", "1.普攻伤害增加+25%\n2.技能伤害增加+25%,缠绕时间增加2.5秒。"],
            ["没有加成", "1.普攻伤害增加+10%\n2.技能伤害增加+10%", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+30%\n2.技能伤害增加+30%", "1.普攻伤害增加+40%\n2.技能伤害增加+40%", "1.普攻伤害增加+50%\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻伤害增加+10%，加血能量增加+0.2%\n2.给战车护盾时长增加+0.5秒", "1.普攻伤害增加+20%，加血能量增加+0.4%\n2.给战车护盾时长增加+1秒", "1.普攻伤害增加+30%，加血能量增加+0.6%\n2.给战车护盾时长增加+1.5秒", "1.普攻伤害增加+40%，加血能量增加+0.8%\n2.给战车护盾时长增加+2秒", "1.普攻伤害增加+50%，加血能量增加+1%\n2.给战车护盾时长增加+2.5秒"],
            ["没有加成", "1.普攻伤害增加+10%，增加中毒时长+0.5秒\n2.技能伤害增加+10%", "1.普攻伤害增加+20%，增加中毒时长+1秒\n2.技能伤害增加+20%", "1.普攻伤害增加+30%，增加中毒时长+1.5秒\n2.技能伤害增加+30%", "1.普攻伤害增加+40%，增加中毒时长+2秒\n2.技能伤害增加+40%", "1.普攻伤害增加+50%，增加中毒时长+2.5秒\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻弓箭个数增加+1\n2.技能伤害增加+10%", "1.普攻弓箭个数增加+2\n2.技能伤害增加+20%", "1.普攻弓箭个数增加+3\n2.技能伤害增加+30%", "1.普攻弓箭个数增加+4\n2.技能伤害增加+40%", "1.普攻弓箭个数增加+5\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻伤害增加+15%，冰弹范围加20，持续加0.5秒\n2.技能伤害增加+15%", "1.普攻伤害增加+30%，冰弹范围加40，持续加1秒\n2.技能伤害增加+30%", "1.普攻伤害增加+45%，冰弹范围加60，持续加1.5秒\n2.技能伤害增加+45%", "1.普攻伤害增加+60%，冰弹范围加80，持续加2秒\n2.技能伤害增加+60%", "1.普攻伤害增加+75%，冰弹范围加100，持续加2.5秒\n2.技能伤害增加+75%"],
            ["没有加成", "1.普攻伤害增加+15%\n2.技能伤害增加+15%", "1.普攻伤害增加+30%\n2.技能伤害增加+30%", "1.普攻伤害增加+45%\n2.技能伤害增加+45%", "1.普攻伤害增加+60%\n2.技能伤害增加+60%", "1.普攻伤害增加+75%\n2.技能伤害增加+75%"],
            ["没有加成", "1.普攻伤害增加+15%\n2.技能伤害增加+15%", "1.普攻伤害增加+30%\n2.技能伤害增加+30%", "1.普攻伤害增加+45%\n2.技能伤害增加+45%", "1.普攻伤害增加+60%\n2.技能伤害增加+60%", "1.普攻伤害增加+75%\n2.技能伤害增加+75%"],
            ["没有加成", "1.普攻伤害增加+15%，闪电弹射人数加+1\n2.技能伤害增加+15%", "1.普攻伤害增加+30%，闪电弹射人数加+2\n2.技能伤害增加+30%", "1.普攻伤害增加+45%，闪电弹射人数加+3\n2.技能伤害增加+45%", "1.普攻伤害增加+60%，闪电弹射人数加+4\n2.技能伤害增加+60%", "1.普攻伤害增加+75%，闪电弹射人数加+5\n2.技能伤害增加+75%"]];
        //是否显示了退出游戏的对话框
        _this.is_show_exit = false;
        //动画位置
        _this.aniType = 0;
        //战车的位置x
        _this.charPosX = 0;
        //游戏动画存储数据
        // public moveData: Array<cc.Vec2> = [];
        _this.roguelikeWave = [3, 6, 11, 16, 21, 26, 31, 39, 47, 55, 63, 71, 79, 87, 99, 111, 123, 135, 147, 159, 171, 183, 195, 207, 219, 231, 243, 255, 267, 279, 291, 303, 315, 327];
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
        this.aniType = 0;
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0];
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
        // this.game.setRogueText(this.getRogueLikeNum());
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('hint', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                _this.prefab_hint = assets;
            });
        }
        if (!this.prefab_get_tip) {
            WXManagerEX_1.default.getInstance().resourcesBundle.load('get_tip', cc.Prefab, function (error, assets) {
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('hint', cc.Prefab, function (error, assets) {
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('get_tip', cc.Prefab, function (error, assets) {
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('get_tip', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('dialog', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('dialog', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('video_dialog', cc.Prefab, function (error, assets) {
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
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0];
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
            if (this.charioUpgradationData[i] < 5 || i == 5) {
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
            console.log("关卡增加到" + this.cur_wave + " " + this.getIsRogueLikeWave() + " " + this.getRogueLikeNum());
            this.game.setRogueText(this.getRogueLikeNum());
            if (this.getIsRogueLikeWave() && this.cur_game_state == Constants_1.GameState.Game_Playing) {
                console.log("显示提示TIp");
                this.showRoguelike();
            }
            else {
                this.loadLevel();
            }
        }
    };
    //获取是否是Rougue关卡
    GameManager.prototype.getIsRogueLikeWave = function () {
        for (var i = 0; i < this.roguelikeWave.length; i++) {
            if (this.cur_wave == (this.roguelikeWave[i] + 1)) {
                return true;
            }
        }
        return false;
    };
    //获取当前关卡距离下一个rogue关卡数字
    GameManager.prototype.getRogueLikeNum = function () {
        for (var i = 0; i < this.roguelikeWave.length; i++) {
            if (this.cur_wave < (this.roguelikeWave[i] + 1)) {
                if (this.cur_wave == 0) {
                    return this.roguelikeWave[i];
                }
                else {
                    return this.roguelikeWave[i] + 1 - this.cur_wave;
                }
            }
        }
        return 3;
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
        return this.charioUpgradationData[1] * 0.2 + 1;
    };
    //获取因为技能等级变化的防御比率
    GameManager.prototype.getCharioDefenseRotio = function () {
        return this.charioUpgradationData[3] * 0.15 + 1;
    };
    //攻击力比率
    GameManager.prototype.getCharioAttackRotio = function () {
        return this.charioUpgradationData[0] * 0.1;
    };
    //攻击速度比率
    GameManager.prototype.getCharioSpeedRotio = function () {
        return this.charioUpgradationData[2] * 0.1;
    };
    //冷却缩减
    GameManager.prototype.getCharioColdDownRotio = function () {
        return this.charioUpgradationData[4] * 0.5;
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
                            //this.loadNextWave();
                        }
                    }
                    break;
                case Constants_1.GameMode.Endless:
                    {
                        if (MonsterManager_1.default.getInstance().killed_monster_num >= this.cur_total_num) {
                            console.log("敌人死亡加载下一关2");
                            //this.loadNextWave();
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/dangerText', cc.Prefab, function (error, assets) {
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/select_skill', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/unlock_ui', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/fuhuo_ui', cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/boss_warning', cc.Prefab, function (error, assets) {
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
            WXManagerEX_1.default.getInstance().resourcesBundle.load('ui/game/speed_ui', cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQThKO0FBTTlKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUVyRCxxREFBNEU7QUFDNUUsa0RBQTZDO0FBQzdDLDBDQUFxRDtBQUNyRCw2Q0FBd0M7QUFDeEMsdURBQTZEO0FBRTdELHlEQUFvRDtBQUNwRCxrREFBNkM7QUFDN0MsZ0RBQTZDO0FBQzdDLG9FQUErRDtBQUMvRCx5REFBK0Q7QUFDL0QsMEVBQWdGO0FBRWhGLDRFQUFrRjtBQUNsRixxREFBZ0Q7QUFDaEQseURBQW9EO0FBSTVDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBbWlEQztRQS9oRFcsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFDOUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDekMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDbkQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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RUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFPLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNuQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdE8sSUFBSSxP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QUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLHFDQUFlLEdBQXZCLFVBQXdCLEtBQWMsRUFBRSxHQUFXO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHNDQUFnQixHQUF2QixVQUF3QixLQUFjLEVBQUUsR0FBVztRQUMvQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksc0NBQWdCLEdBQXZCLFVBQXdCLEtBQWM7UUFDbEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sc0NBQWdCLEdBQXhCLFVBQXlCLEtBQWMsRUFBRSxHQUFXO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDOztJQWhpRGMscUJBQVMsR0FBZ0IsSUFBSSxDQUFDO0lBRjVCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FtaUQvQjtJQUFELGtCQUFDO0NBbmlERCxBQW1pREMsQ0FuaUR3QyxFQUFFLENBQUMsU0FBUyxHQW1pRHBEO2tCQW5pRG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQnRuX0luZGV4LCBHYW1lU2NlbmUsIEdhbWVTdGF0ZSwgR29fVHlwZSwgSXNEZWJ1ZywgU2VsZWN0U2tpbGxfVHlwZSwgVklERU9fVFlQRSwgWmhlbmdfWGluZ19UeXBlLCBHYW1lTW9kZSwgRmlnaHRpbmdJbmZvLCBKaWFTdSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ2h1U2hlbmdEaWFuIGZyb20gXCIuL0dhbWUvQ2h1U2hlbmdEaWFuXCI7XHJcbmltcG9ydCBFbmVteUhwTWFuYWdlciBmcm9tIFwiLi9FbmVteS9FbmVteUhwTWFuYWdlclwiO1xyXG5pbXBvcnQgSHBUZXh0SHBNYW5hZ2VyIGZyb20gXCIuL01vbnN0ZXIvSHBUZXh0TWFuYWdlclwiO1xyXG5pbXBvcnQgTXVzaWMgZnJvbSBcIi4vU291bmQvTXVpc2NcIjtcclxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL1NvdW5kL1NvdW5kXCI7XHJcbmltcG9ydCBIb21lIGZyb20gXCIuL0hvbWVcIjtcclxuaW1wb3J0IEhpbnQgZnJvbSBcIi4vSGludFwiO1xyXG5pbXBvcnQgR2V0VGlwIGZyb20gXCIuL1VJL0dldFRpcFwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lL0dhbWVcIjtcclxuaW1wb3J0IERpYWxvZyBmcm9tIFwiLi9VSS9EaWFsb2dcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IExvY2FsVmlkZW8gZnJvbSBcIi4vTG9jYWxWaWRlb1wiO1xyXG5pbXBvcnQgeyBIZXJvRGF0YSB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgVW5sb2NrU2tpbGwgZnJvbSBcIi4vVUkvVW5sb2NrU2tpbGxcIjtcclxuaW1wb3J0IHsgWmhlblhpbmdEYXRhIH0gZnJvbSBcIi4vWmhlblhpbmdEYXRhXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQm9zc01hbmFnZXIgZnJvbSBcIi4vQm9zcy9Cb3NzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgVG93ZXJMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9Ub3dlci9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyQ29uZmlndXJlLCBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4vUGV0L0dhbWUvUGV0XCI7XHJcbmltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi9QZXQvUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL0hlcm8vR2FtZS9IZXJvXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZURhdGEsIEhlcm9JbmZvLCBIZXJvX1R5cGUgfSBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgR3VhSmlHaWZ0IGZyb20gXCIuL0d1YUppL1VpL0d1YUppR2lmdFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCBHYW1lV2luIGZyb20gXCIuL0dhbWUvVWkvR2FtZVdpblwiO1xyXG5pbXBvcnQgeyBUdXRvcmlhbExldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL1R1dG9yaWFsTGV2ZWxcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IEJ1ZmZEaXNwbGF5IGZyb20gXCIuL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvQnVmZkRpc3BsYXlcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4vVHV0b3JpYWxzL1Jld2FyZFNTVWlcIjtcclxuaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHByZWZhYl9oaW50OiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmVmYWJfZ2V0X3RpcDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1IT01FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcm9sZV9zaG93X2hlcm86IEhlcm9fVHlwZSA9IEhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR2FtZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5ZCE56eN566h55CG5ZmoXHJcbiAgICBnYW1lOiBHYW1lID0gbnVsbDtcclxuICAgIGVuZW15X2hwX21hbmFnZXI6IEVuZW15SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGhwX3RleHRfbWFuYWdlcjogSHBUZXh0SHBNYW5hZ2VyID0gbnVsbDtcclxuICAgIGNodV9zaGVuZ19kaWFuOiBDaHVTaGVuZ0RpYW4gPSBudWxsO1xyXG4gICAgLy/lo7Dpn7NcclxuICAgIHNvdW5kX21hbmFnZXI6IFNvdW5kID0gbnVsbDtcclxuICAgIG11c2ljX21hbmFnZXI6IE11c2ljID0gbnVsbDtcclxuICAgIC8v5ZCE5aSn6Iux6ZuE55qEXHJcbiAgICBhbGxfaGVybzogTWFwPG51bWJlciwgSGVybz4gPSBudWxsO1xyXG4gICAgLy9EUFPnu5/orqFcclxuICAgIGhlcm9fc2tpbGxfZHBzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgICBoZXJvX2F0dGFja19kcHM6IG51bWJlcltdID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqeS4u+WKqOaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfYWN0aXZlX2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG4gICAgLyoq5a6g54mp6L+e5pC65oqA6IO96YCg5oiQ55qE5Lyk5a6zICovXHJcbiAgICBwcml2YXRlIHBldF9jb25uZWN0X2RwczogTWFwPFBldEluZm8sIG51bWJlcj4gPSBudWxsO1xyXG5cclxuICAgIGN1cl9nYW1lX3N0YXRlOiBHYW1lU3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9SZWFkeTtcclxuICAgIGN1cl9nYW1lX21vZGU6IEdhbWVNb2RlID0gR2FtZU1vZGUuTWFpbjtcclxuICAgIGN1cl9nYW1lX3NjZW5lOiBHYW1lU2NlbmUgPSBHYW1lU2NlbmUuaG9tZTtcclxuXHJcbiAgICAvL+W9k+WJjeeahOWKoOi9vei/m+W6plxyXG4gICAgY3VyX2xvYWRfcHJvZ3Jlc3M6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mr4/kuKroi7Hpm4TojrflvpfnmoTmuLjmiI/lhoXmioDog71cclxuICAgIGluZ2FtZV9za2lsbHM6IFNlbGVjdFNraWxsX1R5cGVbXSA9IFtdO1xyXG4gICAgLy/lvIDlp4vnmoTlhbPljaHnmoTmlbDmja5cclxuICAgIGN1cl93YXZlOiBudW1iZXIgPSAwO1xyXG4gICAgZmlnaHRpbmdfaW5mbzogRmlnaHRpbmdJbmZvID0gbnVsbDtcclxuICAgIC8vZHJvcF9kYXRhOkRyb3BEYXRhPW51bGw7XHJcbiAgICByZXdhcmRfZGF0YTogUmV3YXJkRGF0YVtdID0gW107XHJcbiAgICBpc19sb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5o6J6JC954mp5ZOB55qE5oCq54mpaWRcclxuICAgIC8vZHJvcF9lbmVteV90eXBlOm51bWJlcj0wO1xyXG5cclxuICAgIGdhbWVfdG9faG9tZTogR29fVHlwZSA9IEdvX1R5cGUuTWFpbjtcclxuXHJcbiAgICBmdWh1b19udW06IG51bWJlciA9IDE7XHJcbiAgICBpc19zaG93X3RleHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmioDog73mp73kvY1cclxuICAgIG1heF9za2lsbF9zbG90OiBudW1iZXIgPSAyO1xyXG4gICAgLy/lkITkuKroi7Hpm4TmlbDmja7vvIzmuLjmiI/lhoXkvb/nlKjvvIzlhbPljaHlhoVidWZm44CCXHJcbiAgICBnYW1lX2hlcm9fZGF0YTogTWFwPG51bWJlciwgSGVyb0RhdGE+ID0gbnVsbDtcclxuICAgIC8v56ys5Yeg5Liq5oCq5pyJ5Y+v6IO954iG5pif5pifYnVmZlxyXG4gICAgLy9zdGFyX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLy9cclxuICAgIC8qKuW9k+WJjeaAu+WFseeahOaAqueJqeaVsOmHjyAqL1xyXG4gICAgY3VyX3RvdGFsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWunumZheS4iuW3sue7j+eUn+aIkOWHuuaAqueJqeeahOaVsOmHjyAqL1xyXG4gICAgY3VyX2NyZWF0ZV9udW06IG51bWJlciA9IDA7XHJcbiAgICBlbmVteV9vZmZzZXRfeTogbnVtYmVyID0gMDtcclxuICAgIGVuZW15X2F0dF95OiBudW1iZXIgPSAtMzAwO1xyXG4gICAgZW5lbXlfY3JlYXRlX3k6IG51bWJlciA9IDEwODA7XHJcbiAgICBsb2FkX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgbG9hZF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgamlzaHVfdGltZTogbnVtYmVyID0gMDtcclxuICAgIC8v6YCa5YWz5qyh5pWwXHJcbiAgICBwYXNzX2xldmVsX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKua4uOaIj+mAn+eOhyAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lX3JhdGU6IG51bWJlciA9IDI7XHJcbiAgICAvKirmjInpkq7mjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgYnRuX3NldHVwX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmiJjmlpfmjIflrprpgJ/njocgKi9cclxuICAgIHByaXZhdGUgZmlnaHRpbmdfc2V0dXBfcmF0ZTogbnVtYmVyID0gMTtcclxuICAgIC8qKuWNleasoeacgOmrmOS8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfZGFtYWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Y2V5qyh5pyA5bCP5Lyk5a6z5YC8ICovXHJcbiAgICBwcml2YXRlIG1pbl9kYW1hZ2U6IG51bWJlciA9IDk5OTk7XHJcbiAgICAvKiroh6rliqjmiJjmlpfmoIfor4YgKi9cclxuICAgIHB1YmxpYyBhdXRvX2ZpZ2h0aW5nOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKuW9k+WJjeeahOmYn+WIlyAqL1xyXG4gICAgcHVibGljIGN1cl90ZWFtX2xpc3Q6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgcHVibGljIGNoYXJpb1VwZ3JhZGF0aW9uRGF0YTogQXJyYXk8bnVtYmVyPiA9IFswLCAwLCAwLCAwLCAwLCAwXTtcclxuXHJcbiAgICBwdWJsaWMgY2hhcmlvVGlwOiBBcnJheTxzdHJpbmc+ID0gW1wi5pS75Ye75Lyk5a6zXCIsIFwi6KGA6YeP5LiK6ZmQXCIsIFwi5pS75Ye76YCf5bqmXCIsIFwi5aKe5by66Ziy5b6hXCIsIFwi5oqA6IO96Ze06ZqUXCIsIFwi5oGi5aSN6KGA6YePXCJdO1xyXG5cclxuICAgIHB1YmxpYyBjaGFyaW9Db250ZW50OiBBcnJheTxBcnJheTxzdHJpbmc+PiA9IFtcclxuICAgICBbXCLmsqHmnInliqDmiJBcIixcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhysxMCVcIixcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhysyMCVcIixcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhyszMCVcIixcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhys0MCVcIixcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhys1MCVcIl0sXHJcbiAgICAgW1wi5rKh5pyJ5Yqg5oiQXCIsXCLmiJjovabooYDph4/kuIrpmZArMjAlXCIsXCLmiJjovabooYDph4/kuIrpmZArNDAlXCIsXCLmiJjovabooYDph4/kuIrpmZArNjAlXCIsXCLmiJjovabooYDph4/kuIrpmZArODAlXCIsXCLmiJjovabooYDph4/kuIrpmZArMTAwJVwiXSxcclxuICAgICBbXCLmsqHmnInliqDmiJBcIixcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhysxMCVcIixcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhysyMCVcIixcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhyszMCVcIixcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhys0MCVcIixcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhys1MCVcIl0sXHJcbiAgICAgW1wi5rKh5pyJ5Yqg5oiQXCIsXCLmiJjovabpmLLlvqHlipvmj5DljYcrMTUlXCIsXCLmiJjovabpmLLlvqHlipvmj5DljYcrMzAlXCIsXCLmiJjovabpmLLlvqHlipvmj5DljYcrNDUlXCIsXCLmiJjovabpmLLlvqHlipvmj5DljYcrNjAlXCIsXCLmiJjovabpmLLlvqHlipvmj5DljYcrNzUlXCJdLFxyXG4gICAgIFtcIuayoeacieWKoOaIkFwiLFwi5omA5pyJ6Iux6ZuE5oqA6IO9Q0QtMC4156eSXCIsXCLmiYDmnInoi7Hpm4TmioDog71DRC0x56eSXCIsXCLmiYDmnInoi7Hpm4TmioDog71DRC0xLjXnp5JcIixcIuaJgOacieiLsembhOaKgOiDvUNELTLnp5JcIixcIuaJgOacieiLsembhOaKgOiDvUNELTIuNeenklwiXSxcclxuICAgICBbXCLmsqHmnInliqDmiJBcIixcIuaBouWkjeaImOi9puacgOWkp+ihgOmHj+eahDIwJVwiLFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsXCLmgaLlpI3miJjovabmnIDlpKfooYDph4/nmoQyMCVcIixcIuaBouWkjeaImOi9puacgOWkp+ihgOmHj+eahDIwJVwiLFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCJdXTtcclxuICAgIFxyXG4gICAgcHVibGljIGhlclVwQ29udGVudDpBcnJheTxBcnJheTxzdHJpbmc+Pj1bW10sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzUlXFxuMi7mioDog73kvKTlrrPlop7liqArNSVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMTUlXFxuMi7mioDog73kvKTlrrPlop7liqArMTUlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsyMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsyMCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzI1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzI1JVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLFwiMS7mma7mlLvlvJPnrq3nqb/pgI/mlYzkurrkuKrmlbArMVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzUlXCIsXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCsyXFxuMi7mioDog73kvKTlrrPlop7liqArMTAlXCIsXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCszXFxuMi7mioDog73kvKTlrrPlop7liqArMTUlXCIsXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCszXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCs1XFxuMi7mioDog73kvKTlrrPlop7liqArMjUlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzUlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsxMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzE1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzE1JVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAlXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsyNSVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsyNSVcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzUlXFxuMi7mioDog73kvKTlrrPlop7liqArNSUs57yg57uV5pe26Ze05aKe5YqgMC4156eS44CCXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsxMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMCUs57yg57uV5pe26Ze05aKe5YqgMeenkuOAglwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMTUlXFxuMi7mioDog73kvKTlrrPlop7liqArMTUlLOe8oOe7leaXtumXtOWinuWKoDEuNeenkuOAglwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAlXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlLOe8oOe7leaXtumXtOWinuWKoDLnp5LjgIJcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzI1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzI1JSznvKDnu5Xml7bpl7Tlop7liqAyLjXnp5LjgIJcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAlXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCszMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCszMCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzQwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNTAlXFxuMi7mioDog73kvKTlrrPlop7liqArNTAlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsxMCXvvIzliqDooYDog73ph4/lop7liqArMC4yJVxcbjIu57uZ5oiY6L2m5oqk55u+5pe26ZW/5aKe5YqgKzAuNeenklwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAl77yM5Yqg6KGA6IO96YeP5aKe5YqgKzAuNCVcXG4yLue7meaImOi9puaKpOebvuaXtumVv+WinuWKoCsx56eSXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCszMCXvvIzliqDooYDog73ph4/lop7liqArMC42JVxcbjIu57uZ5oiY6L2m5oqk55u+5pe26ZW/5aKe5YqgKzEuNeenklwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNDAl77yM5Yqg6KGA6IO96YeP5aKe5YqgKzAuOCVcXG4yLue7meaImOi9puaKpOebvuaXtumVv+WinuWKoCsy56eSXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs1MCXvvIzliqDooYDog73ph4/lop7liqArMSVcXG4yLue7meaImOi9puaKpOebvuaXtumVv+WinuWKoCsyLjXnp5JcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwJe+8jOWinuWKoOS4reavkuaXtumVvyswLjXnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzIwJe+8jOWinuWKoOS4reavkuaXtumVvysx56eSXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCszMCXvvIzlop7liqDkuK3mr5Lml7bplb8rMS4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArMzAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs0MCXvvIzlop7liqDkuK3mr5Lml7bplb8rMuenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNTAl77yM5aKe5Yqg5Lit5q+S5pe26ZW/KzIuNeenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzUwJVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArMVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwJVwiLFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArMlxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzIwJVwiLFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArM1xcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArNFxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArNVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzUwJVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMTUl77yM5Yaw5by56IyD5Zu05YqgMjDvvIzmjIHnu63liqAwLjXnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxNSVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJe+8jOWGsOW8ueiMg+WbtOWKoDQw77yM5oyB57ut5YqgMeenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNDUl77yM5Yaw5by56IyD5Zu05YqgNjDvvIzmjIHnu63liqAxLjXnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCs0NSVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzYwJe+8jOWGsOW8ueiMg+WbtOWKoDgw77yM5oyB57ut5YqgMuenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzYwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNzUl77yM5Yaw5by56IyD5Zu05YqgMTAw77yM5oyB57ut5YqgMi4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArNzUlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCsxNSVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxNSVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNDUlXFxuMi7mioDog73kvKTlrrPlop7liqArNDUlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs2MCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCs2MCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzc1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzc1JVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArMTUlXFxuMi7mioDog73kvKTlrrPlop7liqArMTUlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCszMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCszMCVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzQ1JVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQ1JVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNjAlXFxuMi7mioDog73kvKTlrrPlop7liqArNjAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs3NSVcXG4yLuaKgOiDveS8pOWus+WinuWKoCs3NSVcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzE1Je+8jOmXqueUteW8ueWwhOS6uuaVsOWKoCsxXFxuMi7mioDog73kvKTlrrPlop7liqArMTUlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCszMCXvvIzpl6rnlLXlvLnlsITkurrmlbDliqArMlxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFwiMS7mma7mlLvkvKTlrrPlop7liqArNDUl77yM6Zeq55S15by55bCE5Lq65pWw5YqgKzNcXG4yLuaKgOiDveS8pOWus+WinuWKoCs0NSVcIixcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzYwJe+8jOmXqueUteW8ueWwhOS6uuaVsOWKoCs0XFxuMi7mioDog73kvKTlrrPlop7liqArNjAlXCIsXCIxLuaZruaUu+S8pOWus+WinuWKoCs3NSXvvIzpl6rnlLXlvLnlsITkurrmlbDliqArNVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzc1JVwiXV07XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy/mmK/lkKbmmL7npLrkuobpgIDlh7rmuLjmiI/nmoTlr7nor53moYZcclxuICAgIHB1YmxpYyBpc19zaG93X2V4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5Yqo55S75L2N572uXHJcbiAgICBwdWJsaWMgYW5pVHlwZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvL+aImOi9pueahOS9jee9rnhcclxuICAgIHB1YmxpYyBjaGFyUG9zWDogbnVtYmVyID0gMDtcclxuICAgIC8v5ri45oiP5Yqo55S75a2Y5YKo5pWw5o2uXHJcbiAgICAvLyBwdWJsaWMgbW92ZURhdGE6IEFycmF5PGNjLlZlYzI+ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSByb2d1ZWxpa2VXYXZlOiBBcnJheTxudW1iZXI+ID0gWzMsIDYsIDExLCAxNiwgMjEsIDI2LCAzMSwgMzksIDQ3LCA1NSwgNjMsIDcxLCA3OSwgODcsIDk5LCAxMTEsIDEyMywgMTM1LCAxNDcsIDE1OSwgMTcxLCAxODMsIDE5NSwgMjA3LCAyMTksIDIzMSwgMjQzLCAyNTUsIDI2NywgMjc5LCAyOTEsIDMwMywgMzE1LCAzMjddO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR2FtZU1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZUxvYWRlcm9uXCIpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIGluaXQoc2NlbmU6IEdhbWVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLmlzX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pVHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX3NjZW5lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmhvbWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leGl0UGxheUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yb2xlX3Nob3dfaGVybz1IZXJvX1R5cGUuU2hlU2hvdTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuZ2FtZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9oZXJvID0gbmV3IE1hcDxudW1iZXIsIEhlcm8+KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdGFsX251bSA9IHRoaXMuY3VyX2NyZWF0ZV9udW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZ2FtZV9za2lsbHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2RhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVodW9fbnVtID0gMTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5hdXRvX2ZpZ2h0aW5nID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5BdXRvRmlnaHRpbmcpID4gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRHYW1lSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IDA7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmdhbWUuc2V0Um9ndWVUZXh0KHRoaXMuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgIHRoaXMubG9hZFRpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blNldHVwUmF0ZShyYXRlOiBudW1iZXIsIGlzQWN0aXZpdHk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc2V0dXBfcmF0ZSA9IHJhdGU7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICBpZiAoaXNBY3Rpdml0eSkge1xyXG4gICAgICAgICAgICBpZiAocmF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf5byA5ZCv5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/lhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRBdXRvRmlnaHRpbmcoaXNBdXRvOiBib29sZWFuLCBpc0FjdGl2aXR5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIHRoaXMuYXV0b19maWdodGluZyA9IGlzQXV0bztcclxuICAgICAgICAvLyBpZiAoaXNBY3Rpdml0eSkge1xyXG4gICAgICAgIC8vICAgICBpZiAoaXNBdXRvKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX5byA5ZCv5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpflhbPpl63miJDlip/mrKHmlbApO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ0blNldHVwUmF0ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ0bl9zZXR1cF9yYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZpZ2h0aW5nUmF0ZShyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpZ2h0aW5nX3NldHVwX3JhdGUgPSByYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FtZVJhdGUocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy90aGlzLmdhbWVfcmF0ZSA9IHJhdGUgKiB0aGlzLmJ0bl9zZXR1cF9yYXRlICogdGhpcy5maWdodGluZ19zZXR1cF9yYXRlO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZVJhdGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSYXRlKCkge1xyXG4gICAgICAgIC8vdGhpcy5nYW1lX3JhdGUgPSAxO1xyXG4gICAgICAgIGNjLmtTcGVlZCh0aGlzLmdhbWVfcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWF4RGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA+IHRoaXMubWF4X2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heF9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heERhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWluRGFtYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IHRoaXMubWluX2RhbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9kYW1hZ2UgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pbkRhbWFnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlID0gMS40O1xyXG4gICAgICAgIGxldCBzY2FsZVZhbHVlID0gMTtcclxuICAgICAgICBsZXQgcmF0ZSA9IGRhbWFnZSAvIHRoaXMuZ2V0TWF4RGFtYWdlKCk7XHJcbiAgICAgICAgc2NhbGVWYWx1ZSA9IHJhdGUgKiBtYXhTY2FsZTtcclxuICAgICAgICBpZiAoc2NhbGVWYWx1ZSA8IDEpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY2FsZVZhbHVlID4gbWF4U2NhbGUpIHtcclxuICAgICAgICAgICAgc2NhbGVWYWx1ZSA9IG1heFNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBkYW1hZ2UgLyB0aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIGlmIChyYXRlIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDAuNCkge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCAwLjYpIHtcclxuICAgICAgICAgICAgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgMC44KSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF80O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF81O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVybyhoZXJvSWQ6IEhlcm9fVHlwZSk6IEhlcm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbF9oZXJvLmdldChoZXJvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRHYW1lSGVyb0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGlzSW5pdERwcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9fYXR0YWNrX2Rwcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YSA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmN1cl90ZWFtX2xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KHRoaXMuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0RhdGEgPSBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGaWdodGluZ0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBtYWluV2FsbERhdGEgPSBuZXcgQXR0cmlidXRlRGF0YSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSGVyb19UeXBlLkhlcm9fTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5pdERwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBuZXcgSGVyb0RhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGhvbWVIZXJvRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaSk7XHJcbiAgICAgICAgICAgIGlmIChob21lSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUoaG9tZUhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90ZWFtX2xpc3QuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/t+Wuq+aooeW8j+WKoOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKz0gKGZpZ2h0aW5nRGF0YS5BdHRhY2tQZXIpICogaGVyb0RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKz0gKGZpZ2h0aW5nRGF0YS5EZWZlbnNlUGVyKSAqIGhlcm9EYXRhLmZpeF9kZWZlbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5Dcml0aWNhbCArPSBmaWdodGluZ0RhdGEuQ3JpdGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuSGl0ICs9IGZpZ2h0aW5nRGF0YS5IaXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvRGVmZW5zZVJvdGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCArPSBoZXJvRGF0YS5IaXQgKiAwLjI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF4RGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLCBoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmluaXRXYWxsKG1haW5XYWxsRGF0YSwgV2FsbFR5cGUuTWFpbik7XHJcbiAgICAgICAgLy8gaWYoaHA8MzAwMCl7XHJcbiAgICAgICAgLy8gICAgIGhwPTMwMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRlZmVuc2U8MTAwKXtcclxuICAgICAgICAvLyAgICAgZGVmZW5zZT0xMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy53YWxsX2RhdGEuaW5pdEluaGVyaXREYXRhKGhwLGRlZmVuc2UsbWlzcyxhbnRpQ3JpdGljYWwsYW50aUV4dHJhQ3JpdGljYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpIHtcclxuICAgICAgICBsZXQgaXNJbml0RHBzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGVyb19hdHRhY2tfZHBzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0RHBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luaXREcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMgPSBuZXcgTWFwPFBldEluZm8sIG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhID0gbmV3IE1hcDxudW1iZXIsIEhlcm9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY3VyX3RlYW1fbGlzdCA9IFtIZXJvX1R5cGUuU2hvdVdhbmcsIEhlcm9fVHlwZS5BTnVCaVNpLCBIZXJvX1R5cGUuWmhlbkRlLCBIZXJvX1R5cGUuTWVpTW8sIEhlcm9fVHlwZS5MZWlTaGVuXTtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VyX3RlYW1fbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSB0aGlzLmFkZFR1dG90aWFsc0hlcm9GdWxsKHRoaXMuY3VyX3RlYW1fbGlzdFtpXSwgaSwgbnVsbCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjIgKiB0aGlzLmdldENoYXJpb0hlYWx0aFJhdGlvKCk7O1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yICogdGhpcy5nZXRDaGFyaW9EZWZlbnNlUm90aW8oKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9jb25uZWN0X2Rwcy5zZXQoaGVyb0RhdGEucGV0X2luZm8sIDApO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1heERhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICB0aGlzLnNldE1pbkRhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGksaGVyb0RhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5pbml0V2FsbChtYWluV2FsbERhdGEsIFdhbGxUeXBlLk1haW4pO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaE1haW5XYWxsRGF0YUJ5YWRkSGVybygpIHtcclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhID0gY2MuaW5zdGFudGlhdGUodi5oZXJvX2RhdGEpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoICs9IGhlcm9EYXRhLnRvdGFsX2hwICogMC4yICogdGhpcy5nZXRDaGFyaW9IZWFsdGhSYXRpbygpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuRGVmZW5zZSArPSBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICogMC4yICogdGhpcy5nZXRDaGFyaW9EZWZlbnNlUm90aW8oKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLk1pc3MgKz0gaGVyb0RhdGEuTWlzcyAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpRXh0cmFDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpRXh0cmFDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkF0dGFjayArPSBoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5yZWZyZXNoV2FsbERhdGFCeWFkZEhlcm8obWFpbldhbGxEYXRhKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hNYWluV2FsbERhdGEoKSB7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTs7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjIgKiB0aGlzLmdldENoYXJpb0RlZmVuc2VSb3RpbygpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcyArPSBoZXJvRGF0YS5NaXNzICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrICs9IGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCArPSBoZXJvRGF0YS5IaXQgKiAwLjI7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlZnJlc2hXYWxsRGF0YShtYWluV2FsbERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFRpcCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJlZmFiX2hpbnQpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnaGludCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYl9oaW50ID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZWZhYl9nZXRfdGlwKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2dldF90aXAnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfZ2V0X3RpcCA9IGFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgZHQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmVmYWJfaGludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgaGludC5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLCBkdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBoaW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGludCk7XHJcbiAgICAgICAgICAgIGhpbnQucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICBoaW50SnMuc2hvd0hpbnRNZXNzYWdlKG1lc3NhZ2UsIGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldFRpcChnZXROb2RlOiBjYy5Ob2RlLCBjYWxsQmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiX2hpbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdnZXRfdGlwJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkU2hvd0dldFBvcnAoZ2V0Tm9kZSwgY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkU2hvd0dldFBvcnAoZ2V0Tm9kZSwgY2FsbEJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TXVsdGlwbGVHZXRUaXAoZ2V0Tm9kZXM6IGNjLk5vZGVbXSwgY2FsbEJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9oaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZE11bHRpcGxlUG9ycChnZXROb2RlcywgY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLCBjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3Nob3dfZXhpdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X2V4aXQgPSB0cnVlO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLCB5ZXNDYWxsYmFjaywgbm9DYWxsYmFjaywgc2hvd1R5cGUsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0geTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCdXlEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IHN0cmluZyB8IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcpIHtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdkaWFsb2cnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChEaWFsb2cpLnNob3dEaWFsb2cobWVzc2FnZSwgeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2ssIHNob3dUeXBlLCB5LCBjdXJyZW5jeSk7XHJcbiAgICAgICAgICAgIC8vIGlmKHkpe1xyXG4gICAgICAgICAgICAvLyAgICAgbm9kZS55PXk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9jYWxWaWRlbyh5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBpc1ZpZGVvPzogYm9vbGVhbikge1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3ZpZGVvX2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExvY2FsVmlkZW8pLmluaXQoeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdBTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUFsbERyb3AoKTtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lBbGxNb25zdGVyKCk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtID0gMDtcclxuICAgICAgICBzd2l0Y2ggKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIGlmICghVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUFsbEVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5yZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IFRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApOy8v5rOi5pWwXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiLFJvdW5kKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmxvYWRMZXZlbCwgMC41KTtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIucmVzdW1lKCk7XHJcbiAgICB9XHJcbiAgICAvL+agueaNruW9k+WJjWNoYXJpb1VwZ3JhZGF0aW9uRGF0YeiOt+WPluS4gOS4quWNh+e6p+e7hFxyXG4gICAgZ2V0Y2hhcmlvVXBncmFkYXRpb25EYXRhKCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBhcnI6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICB2YXIgYXJUZW1wOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuY2hhcmlvVXBncmFkYXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVtpXSA8IDUgfHwgaSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBhclRlbXAucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WPr+WNh+e6p+aKgOiDveaVsOmHj+Wwj+S6jjNcclxuICAgICAgICBpZiAoYXJUZW1wLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhclRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyVGVtcC5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcnJbMF0gPSBhclRlbXBbMF07XHJcbiAgICAgICAgYXJyWzFdID0gYXJUZW1wWzFdO1xyXG4gICAgICAgIGFyclsyXSA9IGFyVGVtcFsyXTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG5cclxuICAgIH1cclxuICAgIC8v6I635Y+W6Zi15YiX57G75Z6LXHJcbiAgICBnZXRaaGVuZ1hpbmdEYXRhKCk6IFpoZW5YaW5nRGF0YSB7XHJcbiAgICAgICAgbGV0IHdhdmVEYXRhID0gdGhpcy5maWdodGluZ19pbmZvW3RoaXMuY3VyX3dhdmVdO1xyXG4gICAgICAgIC8v6Kej5p6Q6Zi15Z6L5pWw5o2uXHJcbiAgICAgICAgbGV0IHp4RGF0YSA9IG5ldyBaaGVuWGluZ0RhdGEoKTtcclxuICAgICAgICBsZXQgYWxsRW5lbXlEYXRhID0gbmV3IEFycmF5PEpzb25Nb25zdGVyQ29uZmlndXJlPigpO1xyXG4gICAgICAgIGxldCBNQ00gPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2F2ZURhdGEubW9uc3Rlcl9udW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1JZCA9IHdhdmVEYXRhLm1vbnN0ZXJfaWRbaV07XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IE1DTS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtSWQpO1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlOdW0gPSB3YXZlRGF0YS5tb25zdGVyX251bVtpXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBlbmVteU51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxFbmVteURhdGEucHVzaChqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/kuozmrKHlpITnkIbvvIzmiopib3Nz6LefYnVmZuaAquaUvuacgOWJjemdolxyXG4gICAgICAgIGFsbEVuZW15RGF0YS5zb3J0KChhOiBKc29uTW9uc3RlckNvbmZpZ3VyZSwgYjogSnNvbk1vbnN0ZXJDb25maWd1cmUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuU3RyZW5ndGhUeXBlIC0gYS5TdHJlbmd0aFR5cGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShhbGxFbmVteURhdGEsIHp4RGF0YSwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHp4RGF0YTtcclxuICAgIH1cclxuICAgIGdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGVuZW15RGF0YXM6IEpzb25Nb25zdGVyQ29uZmlndXJlW10sIG91dDogWmhlblhpbmdEYXRhLCBidWZmTnVtOiBudW1iZXIsIG1pblk6IG51bWJlcikge1xyXG4gICAgICAgIC8v6Zi15Z6LXHJcbiAgICAgICAgbGV0IHp4VHlwZSA9IFpoZW5nX1hpbmdfVHlwZS5aWDA7XHJcbiAgICAgICAgLy/pmo/mnLrkuIDkuKrpmLXlnotcclxuICAgICAgICB6eFR5cGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBaaGVuZ19YaW5nX1R5cGUubnVtKTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgenhUeXBlPVpoZW5nX1hpbmdfVHlwZS7nrq3lpLQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCB6eERhdGEgPSBuZXcgWmhlblhpbmdEYXRhKCk7XHJcbiAgICAgICAgLy96eERhdGE9dGhpcy5nYW1lLnpoZW5feGluZy5qc29uW3p4VHlwZV07XHJcbiAgICAgICAgbGV0IGxlbiA9IGVuZW15RGF0YXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBpc05leHQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb3RoZXJOdW0gPSAwO1xyXG4gICAgICAgIGxldCBpc0hhdmVCb3NzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV3YWlOdW0gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVCb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPCAoenhEYXRhLm90aGVyX3Bvcy5sZW5ndGggKyBld2FpTnVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3kuIDkuIvmmK/lkKZib3Nz5L2N572u5bey57uP55So5LqG77yM5aaC5p6c55So5LqG5Luj6KGo6L+Z5YWz5pyJMuS4qmJvc3PvvIzpnIDopoHmiorov5nkuKpib3Nz5pS+5YiwYnVmZuS9jee9ruS4ilxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYm9zc19wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LmL5YmN5rKh5pyJ6K6+572uYm9zc+S9jee9riAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5ib3NzX3Bvcy55ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJvc3NfcG9zID0gZGlzUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5idWZmX3Bvcy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJ1ZmZfcG9zW2J1ZmZOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZk51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuRWxpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3V0LmJ1ZmZfcG9zLmxlbmd0aCA8IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOi/meazouayoeaciWJvc3PvvIzlubbkuJTmnIlidWZm77yM5YiZYnVmZuS7o+abv2Jvc3PkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSGF2ZUJvc3MgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYm9zc19wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlQm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJ1ZmZfcG9zW2J1ZmZOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlzTmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOZXh0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgbWluWSA9IHp4RGF0YS5vdGhlcl9wb3NbenhEYXRhLm90aGVyX3Bvcy5sZW5ndGggLSAxXS55ICsgNjAgLSA1MDU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoZW5lbXlEYXRhcy5zbGljZSh6eERhdGEub3RoZXJfcG9zLmxlbmd0aCksIG91dCwgYnVmZk51bSwgbWluWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mmL7npLrlhbPljaHmlbDmja5cclxuICAgIHB1YmxpYyBsb2FkTGV2ZWwoKSB7XHJcblxyXG4gICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpICYmIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfbG9hZF9vayAmJiAoUGV0LmN1cl9sb2FkZWRfbnVtID49IFBldC5tYXhfbG9hZF9udW0pICYmIHRoaXMuZmlnaHRpbmdfaW5mbyAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApICsgMVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCB3YXZlbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB3YXZlbnVtYmVyLy8oRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19f6L+b5p2l5LqGXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckRhdGEgPSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhc1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgbGV0IGlzQmFvWGlhbmdMZXZlbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHVzZVdpZHRoID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IChjYy53aW5TaXplLndpZHRoIC0gdXNlV2lkdGgpIC8gMiAtIGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15X2NyZWF0ZV95ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW5lbXlfY3JlYXRlX3k9MDtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hUaW1lID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25zdGVyRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtb25zdGVyRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtSWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZSA9IE1DTS5nZXRTdHJlbmd0aFR5cGUobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBkYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyTGV2ZWwgPSBkYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgLy/kuIDnu4TmgKos5q+P57uE5oCq6YO95LiA6Ie055qE77yM5omA5Lul5Y+W5YW25Lit5LiA5Liq5bCx6KGM5LqGXHJcbiAgICAgICAgICAgICAgICAvL+WIhuS4gOS4i+e8nemamSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IE1DTS5nZXRNb25zdGVyU3BhY2luZyhtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heE51bVhYID0gTWF0aC5mbG9vcih1c2VXaWR0aCAvIHdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5XaWR0aCA9IHVzZVdpZHRoICUgbWF4TnVtWFg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSBNYXRoLmZsb29yKHJlbWFpbldpZHRoIC8gbWF4TnVtWFgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUluZGV4cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IG1heE51bVhYOyB4eCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlSW5kZXhzLnB1c2goeHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy946L205re75Yqg55qE5pWw6YeP77yM6L6+5YiwbWF4TnVtWFjlkI7vvIx5eU51bSsrXHJcbiAgICAgICAgICAgICAgICBsZXQgeHhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5TnVtID0gMDtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUaW1lICs9IGRhdGEucmVmcmVzaF90aW1lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrmjpLliJdZWVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5eSA9IHRoaXMuZW5lbXlfY3JlYXRlX3kgKyB3aWR0aCAqIHl5TnVtICsgTWF0aC5yYW5kb20oKSAqIHdpZHRoICogMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py6566X5Ye6WFhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlSW5kZXhzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGxlZnQgKyB3aWR0aCAvIDIgKyB3aWR0aCAqIHVzZUluZGV4c1tyYW5kSW5kZXhdICsgTWF0aC5yYW5kb20oKSAqIDEwIC0gNSwgeXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5zcGxpY2UocmFuZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZW5ndGhUeXBlICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlTW9uc3RlckJ5SWQobUlkLCBwb3MsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2NyZWF0ZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93SmlhblRvdVBvcyh0aGlzLmN1cl9jcmVhdGVfbnVtIC8gdGhpcy5jdXJfdG90YWxfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVmcmVzaFRpbWUgKyBNYXRoLnJhbmRvbSgpICogKDYwIC8gTUNNLmdldFNwZWVkKG1JZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh4TnVtID4gbWF4TnVtWFgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl5TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4eE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbWF4TnVtWFg7IHh4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLlRvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCwgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQm9zcyhtSWQsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKVt0aGlzLmN1cl93YXZlXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb25zdGVyV2FybmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUdXRvdGlhbHMoKTtcclxuICAgICAgICAgICAgLy/lm6DkuLrlrp3nrrHlhbPljaHmmK/mj5Lov5vljrvnmoTvvIzmiYDku6Xmg7PopoHojrflj5blh4bnoa7nmoTmlbDlgLzvvIzpnIDopoHlh4/ljrvlhbblh7rnjrDnmoTmrKHmlbBcclxuICAgICAgICAgICAgLy90aGlzLmRyb3BfZGF0YT1MZXZlbEpzb25EYXRhLmdldFdhdmVEcm9wRGF0YShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlLXRoaXMubGV2ZWxfYnVmZl9udW0pO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgbGV0IGlzTG9hZE5leHQgPSAhaXNCYW9YaWFuZ0xldmVsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA+PSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0xvYWROZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVseVQgPSB0aGlzLmZpZ2h0aW5nX2luZm8ud2F2ZV9yZWZyZXNoX3RpbWVbdGhpcy5jdXJfd2F2ZSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bu26L+f5Yqg6L295LiL5LiA5YWzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBkZWx5VCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmdfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkTGV2ZWxEYXRhcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE5leHRXYXZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YXZlIDwgdGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXMubGVuZ3RoIC0gMSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUrKztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPljaHlop7liqDliLBcIiArIHRoaXMuY3VyX3dhdmUgKyBcIiBcIiArIHRoaXMuZ2V0SXNSb2d1ZUxpa2VXYXZlKCkgKyBcIiBcIiArIHRoaXMuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2V0Um9ndWVUZXh0KHRoaXMuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRJc1JvZ3VlTGlrZVdhdmUoKSAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S65o+Q56S6VElwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JvZ3VlbGlrZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluaYr+WQpuaYr1JvdWd1ZeWFs+WNoVxyXG4gICAgcHJpdmF0ZSBnZXRJc1JvZ3VlTGlrZVdhdmUoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnJvZ3VlbGlrZVdhdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPT0gKHRoaXMucm9ndWVsaWtlV2F2ZVtpXSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blvZPliY3lhbPljaHot53nprvkuIvkuIDkuKpyb2d1ZeWFs+WNoeaVsOWtl1xyXG4gICAgcHVibGljIGdldFJvZ3VlTGlrZU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnJvZ3VlbGlrZVdhdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPCh0aGlzLnJvZ3VlbGlrZVdhdmVbaV0gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfd2F2ZT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9ndWVsaWtlV2F2ZVtpXTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvZ3VlbGlrZVdhdmVbaV0gKyAxIC0gdGhpcy5jdXJfd2F2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMztcclxuXHJcbiAgICB9XHJcbiAgICByZWxvYWRMZXZlbERhdGFzKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LuA5LmI5pe25YCZ6L+b5p2lXCIpXHJcbiAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gbmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9jaGFsbGVuZ2VfbW9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IFRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGFkZENoZWNrVHV0b3RpYWxzSGVybyhoZXJvSWQ6IEhlcm9fVHlwZSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvOiBIZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZSA9IGhlcm9JZDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gMTAwO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2UgPSA1O1xyXG4gICAgICAgIGxldCBkYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoaGVyb0luZm8pXHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaGVyb0lkLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLCA0LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkSGVybyhoZXJvSWQ6IEhlcm9fVHlwZSwgdGVhbUluZGV4OiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9JZCkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgdGVhbUluZGV4LCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmVmcmVzaE1haW5XYWxsRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blm6DkuLrmioDog73nrYnnuqflj5jljJbnmoTooYDph4/mr5TnjodcclxuICAgIHB1YmxpYyBnZXRDaGFyaW9IZWFsdGhSYXRpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVsxXSAqIDAuMiArIDE7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWboOS4uuaKgOiDveetiee6p+WPmOWMlueahOmYsuW+oeavlOeOh1xyXG4gICAgcHVibGljIGdldENoYXJpb0RlZmVuc2VSb3RpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVszXSAqIDAuMTUgKyAxO1xyXG4gICAgfVxyXG4gICAgLy/mlLvlh7vlipvmr5TnjodcclxuICAgIHB1YmxpYyBnZXRDaGFyaW9BdHRhY2tSb3RpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVswXSAqIDAuMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUu+WHu+mAn+W6puavlOeOh1xyXG4gICAgcHVibGljIGdldENoYXJpb1NwZWVkUm90aW8oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbMl0gKiAwLjE7XHJcbiAgICB9XHJcbiAgICAvL+WGt+WNtOe8qeWHj1xyXG4gICAgcHVibGljIGdldENoYXJpb0NvbGREb3duUm90aW8oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbNF0gKiAwLjU7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqDkuIDkuKrmu6Hnuqfmu6Hoo4Xmu6HlrqDniannmoToi7Hpm4QgKi9cclxuICAgIGFkZFR1dG90aWFsc0hlcm9GdWxsKGhlcm9JZDogSGVyb19UeXBlLCB0ZWFtSW5kZXg6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogSGVyb0RhdGEge1xyXG4gICAgICAgIGxldCBoZXJvSW5mbzogSGVyb0luZm8gPSBuZXcgSGVyb0luZm8oKTtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX3R5cGUgPSBoZXJvSWQ7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19sZXZlbCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbChoZXJvSWQpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2UgPSAxLy9IZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb0lkKTsgICBcclxuICAgICAgICBoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPSBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKGhlcm9JZCk7XHJcbiAgICAgICAgbGV0IGVxdWlwTWF4U3RhZ2UgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMSA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMSwgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjIgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDIsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIzID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgzLCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyNCA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoNCwgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgc3dpdGNoIChoZXJvSWQpIHtcclxuICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDQxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDIxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDoge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAyMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTE6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMTEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEyOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDMxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShoZXJvSW5mbylcclxuICAgICAgICB0aGlzLmdhbWVfaGVyb19kYXRhLnNldChoZXJvSWQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkSGVybyhoZXJvSWQsIHRlYW1JbmRleCwgY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVHV0b3RpYWxzKCkge1xyXG4gICAgICAgIGlmICghVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMDIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEgLyBKaWFTdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pWM5Lq65q275Lqh5LqGLOWTquS4quaVjOS6uuatu+S6oeS6hu+8jOWTquS4quiLsembhOWHu+adgOeahFxyXG4gICAgb25FbmVteURpZShzY29yZTogbnVtYmVyLCBpc0FkZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChpc0FkZCkge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bSA+PSB0aGlzLmN1cl90b3RhbF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlYzkurrmrbvkuqHliqDovb3kuIvkuIDlhbNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bSA+PSB0aGlzLmN1cl90b3RhbF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlYzkurrmrbvkuqHliqDovb3kuIvkuIDlhbMyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGNhc2UgR2FtZU1vZGUuQm9zc19QcnNvbmFsOntcclxuICAgICAgICAgICAgICAgIC8vICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZSs9ZW5lbXlUcy5zY29yZTtcclxuICAgICAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZ2h0Q2VudGVyKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIHJldHVybiBjYy52MigwLCAoNzAwICsgdGhpcy5lbmVteV9vZmZzZXRfeSAtIHRoaXMuZW5lbXlfYXR0X3kpIC8gMiArIHRoaXMuZW5lbXlfYXR0X3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNraWxsQ2FuY2VsKGlzU2hvdzogYm9vbGVhbikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleGl0UGxheUdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkX2NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxvYWRfamlzaHUgPSAwO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuYWxsX2hlcm8gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2tUb0hvbWUoc2hvd0hlcm8/OiBIZXJvX1R5cGUpIHtcclxuICAgICAgICB0aGlzLnJvbGVfc2hvd19oZXJvID0gc2hvd0hlcm8gPyBzaG93SGVybyA6IEhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZyA9IFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXIgPSBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsID0gbG9hZGluZ0Jhci5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2FkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fdHlwZTFcIixHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSlcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmhvbWUsIChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xyXG4gICAgICAgICAgICAvL+WBh+eahOi/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NGYWxzZSA9IHByb2dyZXNzVHJ1ZSAvIDI7XHJcbiAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBwcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nID0gKGxvYWRpbmdCYXIucHJvZ3Jlc3MgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3MgPSBwcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGluZ19saWdodC54ID0gdGhpcy5sb2FkaW5nX2Jhci5wcm9ncmVzcyp0aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLXRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgvMjtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmhvbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dEYW5nZXJUZXh0KCkge1xyXG4gICAgICAgIGxldCBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICBpZiAoZGFuZ2VyVGV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3VpL2dhbWUvZGFuZ2VyVGV4dCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW5nZXJUZXh0ID0gY2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpL2RhbmdlclRleHQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dSb2d1ZWxpa2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUm9ndWVsaWtlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9Sb2d1ZWxpa2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Um9ndWVsaWtlVGlwKCk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVQYXVzZVVpKCk7XHJcbiAgICB9XHJcbiAgICBzaG93QnRuQnVmZih0eXBlKS8vMDpCdWZm5bGV56S6ICAgMe+8mkJ1ZmbpgInmi6lcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9QYXVzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CdWZmRGlzcGxheSwgVUlMYXllckxldmVsLlR3bywge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdWZmRGlzcGxheSkuaW5pdFVpKHR5cGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93R2FtZVdpbigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaJk+WujOS4gOWbnuWQiOS6hlwiKVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbiB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX0xvc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIucGF1c2UoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfV2luO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clN0YXJ0TGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ56ysTueroOeOqeWutuaVsCArIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGN1clN0YXJ0TGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ5oyR5oiY5YWz5Y2hICsgY3VyU3RhcnRMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID0gY3VyU3RhcnRMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaEZyb21HYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjA0LCgpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy/lvIDlp4vmraPlvI/lhbPljaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuYWRkVG93ZXJMZXZlbCgxKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuS4iemAieS4gFxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIilcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMSk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy/nhormtojlpLFcclxuICAgICAgICBsZXQgc2hvd3dhbmcgPSB0aGlzLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIGlmIChzaG93d2FuZykge1xyXG4gICAgICAgICAgICBzaG93d2FuZy5vbkdhbWVXaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdFNraWxsKGRlbGF5VGltZTogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAvL+W7tui/n+WxleekulxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndWkvZ2FtZS9zZWxlY3Rfc2tpbGwnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGZ1aSA9IGNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LCB7IHk6IC0xNDAwIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBkZWxheVRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVbmxvY2tTa2lsbCh5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3VpL2dhbWUvdW5sb2NrX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVW5sb2NrU2tpbGwpLmluaXQoeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWFrTGV2ZWxTa2lsbCgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgIC8vICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYWluKTtcclxuICAgIC8vICAgICBsZXQgaXNDYW5TaG93PWZhbHNlO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldCBoZXJvOkhlcm89bnVsbDtcclxuICAgIC8vICAgICAgICAgbGV0IGhlcm9UeXBlPXRlYW1MaXN0W2ldO1xyXG4gICAgLy8gICAgICAgICBpZihoZXJvVHlwZT49MClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaGVybz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvW2hlcm9UeXBlXTsgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBpZihoZXJvLmxldmVsX2J1ZmYubGVuZ3RoPHRoaXMubWF4X3NraWxsX3Nsb3QpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXNDYW5TaG93PXRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoaXNDYW5TaG93PT1mYWxzZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMubWF4X3NraWxsX3Nsb3Q9PTEpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v6K+05piO5pyq6KeG6aKR6Kej6ZSBXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dVbmxvY2tTa2lsbCgoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIEFkTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoaXNTdWM6Ym9vbGVhbik9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYoaXNTdWMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4X3NraWxsX3Nsb3Q9MjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlbGVjdFNraWxsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC8v55u05o6l5byA5aeL5LiL5LiA5rOi5oCqXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sVklERU9fVFlQRS5IdW9kb25nKTtcclxuICAgIC8vICAgICAgICAgICAgIH0sKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL+ebtOaOpeW8gOWni+S4i+S4gOazouaAqlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNlXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v55u05o6l5o+Q56S65oqA6IO95ruh5LqG77yM6Lez6L+H5by556qXXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlNraWxsX2lzX2Z1bGwpKTtcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZExldmVsKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfWVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2hvd1NlbGVjdFNraWxsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIG9uRnVodW8oKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7O1xyXG5cclxuICAgICAgICBsZXQgZGFuZ2VyVGV4dCA9IGNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19VaS9kYW5nZXJUZXh0Jyk7XHJcbiAgICAgICAgaWYgKGRhbmdlclRleHQpIHtcclxuICAgICAgICAgICAgZGFuZ2VyVGV4dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Z1aHVvKCkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICB0aGlzLnJlc2V0UmF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCd1aS9nYW1lL2Z1aHVvX3VpJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5mdWh1b19udW0tLTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93R2FtZUxvc2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlpLHotKVcIiwpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfTG9zZSB8fCB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1dpbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9Mb3NlO1xyXG4gICAgICAgIHRoaXMucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfcmF0ZV9yYW1haW4pKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9hdXRvX3JhbWFpbikpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAgICAgICAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUxldmVsV2F2ZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2VVaSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLml6DlsL3mjJHmiJjog5zliKlcIilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJCb3Nz5oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uV2FsbERpZSgpIHtcclxuICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZnVodW9fbnVtPjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0Z1aHVvKCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9uc3Rlcldhcm5pbmcoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0VuZW15Q29taW5nKTtcclxuICAgICAgICBsZXQgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgY2MudjIoMCwgMCksIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUpO1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMjUsIHsgb3BhY2l0eTogMjU1IH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAxMDAgfSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS50bygwLjUsIHsgb3BhY2l0eTogMTAwIH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkudG8oMC4yNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgbm9kZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9zc1dhcm5pbmcoKSB7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndWkvZ2FtZS9ib3NzX3dhcm5pbmcnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgY2h1eGlhbkFjdCA9IDAuMztcclxuICAgICAgICAgICAgbGV0IHhpYW9zaGlBY3QgPSAwLjE1O1xyXG4gICAgICAgICAgICBsZXQgdGluZ2xpdUFjdCA9IDI7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBsZXQgYXV0byA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2F1dG8nKTtcclxuICAgICAgICAgICAgYXV0by54ID0gLTMyMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oYXV0bykudG8oY2h1eGlhbkFjdCwgeyB4OiAzMjAgfSkudG8oMiwgeyB4OiAxMDgwIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2FybmluZ0xhYmVsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FybmluZ0xhYmVsJyk7XHJcbiAgICAgICAgICAgIHdhcm5pbmdMYWJlbC54ID0gNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih3YXJuaW5nTGFiZWwpLnRvKGNodXhpYW5BY3QsIHsgeDogMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50byh4aWFvc2hpQWN0LCB7IHg6IC02NDAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgbGV0IGJvc3NMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3NMYWJlbCcpO1xyXG4gICAgICAgICAgICBib3NzTGFiZWwueCA9IC02NDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJvc3NMYWJlbCkudG8oY2h1eGlhbkFjdCwgeyB4OiAwIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKHhpYW9zaGlBY3QsIHsgeDogNjQwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3RzID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnZWZmZWN0cycpO1xyXG4gICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYy50d2VlbihlZmZlY3RzKS5kZWxheShjaHV4aWFuQWN0ICsgMC4yKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIGVmZmVjdHMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICB9KS5kZWxheSh0aW5nbGl1QWN0IC0gY2h1eGlhbkFjdCAtIDAuMikucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KHRpbmdsaXVBY3QpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2MudHdlZW4obm9kZSkudG8oMC4yLHt5OjIwMH0pLmRlbGF5KDAuNSkudG8oMC4yLHtzY2FsZToxLjJ9KS50bygwLjIse3NjYWxlOjAuOH0pLnRvKDAuMSx7c2NhbGU6MzIsb3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNvdW5kKCkge1xyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5zYXZlTXVzaWNWb2x1bWUoKTtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljTXV0ZSgpO1xyXG4gICAgICAgIHRoaXMuc291bmRfbWFuYWdlci5zYXZlU291bmRWb2x1bWUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kTXV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTcGVlZFVwVWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmdhbWUpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndWkvZ2FtZS9zcGVlZF91aScsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSE9NRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHJlZnJlc2hDb2luU2hvdygpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hHZW1TaG93KCk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTG9uZ0ppbmdTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaExvbmdKaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVzZXJFeHBTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbWUucmVmcmVzaFVzZXJFeHAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBqdW1vVG9VaShpbmRleDogQnRuX0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKS5qdW1vVG9VaShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAganVtb0FuZFNob3dVaSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaG9tZS5jaGVha1VubG9jaygpO1xyXG4gICAgICAgICAgICBob21lLnNob3dVaSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoWmhhbmxpU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2haaGFuTGlTaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFRvcFNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICBob21lLnJlZnJlc2hUb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR3VhSmlHaWZ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBidG5PZmZsaW5lR2lmdCA9IGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpL2J0bk9mZmxpbmVHaWZ0Jyk7XHJcbiAgICAgICAgICAgIGJ0bk9mZmxpbmVHaWZ0LmdldENvbXBvbmVudChHdWFKaUdpZnQpLmNoZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlZnJlc2hSb2xlKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl9nYW1lX3NjZW5lIT1HYW1lU2NlbmUuaG9tZSlcclxuICAgIC8vICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgbGV0IHJvbGVVaT1jYy5maW5kKCdDYW52YXMvcm9sZV91aScpO1xyXG4gICAgLy8gICAgIGlmKHJvbGVVaS5hY3RpdmU9PXRydWUpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByb2xlVWkuZ2V0Q29tcG9uZW50KFJvbGVVaSkub25FbmFibGUoKTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH0gICAgXHJcblxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lrqDniaktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gbnVtIOWinuWKoOeahOaVsOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUGV0QWN0aXZlRHBzKHBldElkOiBQZXRJbmZvLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3dOdW0gPSB0aGlzLmdldFBldEFjdGl2ZURwcyhwZXRJZCk7XHJcbiAgICAgICAgbGV0IG5ld051bSA9IG5vd051bSArIG51bTtcclxuICAgICAgICB0aGlzLnNldFBldEFjdGl2ZURwcyhwZXRJZCwgbmV3TnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeeahGRwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0QWN0aXZlRHBzKHBldElkOiBQZXRJbmZvKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXRfYWN0aXZlX2Rwcy5nZXQocGV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UGV0QWN0aXZlRHBzKHBldElkOiBQZXRJbmZvLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KHBldElkLCBudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEBwYXJhbSBudW0g5aKe5Yqg55qE5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQZXRDb25uZWN0RHBzKHBldElkOiBQZXRJbmZvLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3dOdW0gPSB0aGlzLmdldFBldENvbm5lY3REcHMocGV0SWQpO1xyXG4gICAgICAgIGxldCBuZXdOdW0gPSBub3dOdW0gKyBudW07XHJcbiAgICAgICAgdGhpcy5zZXRQZXRDb25uZWN0RHBzKHBldElkLCBuZXdOdW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHJldHVybnMg5b2T5YmN55qEZHBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRDb25uZWN0RHBzKHBldElkOiBQZXRJbmZvKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXRfY29ubmVjdF9kcHMuZ2V0KHBldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBldENvbm5lY3REcHMocGV0SWQ6IFBldEluZm8sIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KHBldElkLCBudW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=