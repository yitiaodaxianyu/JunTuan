
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
        _this.tumTableTime = 60 * 60 * 12; //免费抽奖倒计时
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
            ["没有加成", "所有英雄攻击力提升+20%", "所有英雄攻击力提升+40%", "所有英雄攻击力提升+60%", "所有英雄攻击力提升+80%", "所有英雄攻击力提升+100%"],
            ["没有加成", "战车血量上限+40%", "战车血量上限+80%", "战车血量上限+120%", "战车血量上限+160%", "战车血量上限+200%"],
            ["没有加成", "所有英雄攻击速度提升+10%", "所有英雄攻击速度提升+20%", "所有英雄攻击速度提升+30%", "所有英雄攻击速度提升+40%", "所有英雄攻击速度提升+50%"],
            ["没有加成", "战车防御力提升+30%", "战车防御力提升+60%", "战车防御力提升+90%", "战车防御力提升+120%", "战车防御力提升+150%"],
            ["没有加成", "所有英雄技能CD-0.5秒", "所有英雄技能CD-1秒", "所有英雄技能CD-1.5秒", "所有英雄技能CD-2秒", "所有英雄技能CD-2.5秒"],
            ["恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%", "恢复战车最大血量的20%"]
        ];
        _this.herUpContent = [[],
            ["没有加成", "1.普攻伤害增加+10%\n2.技能伤害增加+10%", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+30%\n2.技能伤害增加+30%", "1.普攻伤害增加+40%\n2.技能伤害增加+40%", "1.普攻伤害增加+50%\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻弓箭穿透敌人个数+1\n2.技能伤害增加+10%", "1.普攻弓箭穿透敌人个数+2\n2.技能伤害增加+20%", "1.普攻弓箭穿透敌人个数+3\n2.技能伤害增加+30%", "1.普攻弓箭穿透敌人个数+3\n2.技能伤害增加+40%", "1.普攻弓箭穿透敌人个数+5\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻伤害增加+10%\n2.技能伤害增加+10%", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+30%\n2.技能伤害增加+30%", "1.普攻伤害增加+40%\n2.技能伤害增加+40%", "1.普攻伤害增加+50%\n2.技能伤害增加+50%"],
            ["没有加成", "1.普攻伤害增加+10%\n2.技能伤害增加+10%,缠绕时间增加0.5秒。", "1.普攻伤害增加+20%\n2.技能伤害增加+20%,缠绕时间增加1秒。", "1.普攻伤害增加+30%\n2.技能伤害增加+30%,缠绕时间增加1.5秒。", "1.普攻伤害增加+40%\n2.技能伤害增加+40%,缠绕时间增加2秒。", "1.普攻伤害增加+50%\n2.技能伤害增加+50%,缠绕时间增加2.5秒。"],
            ["没有加成", "1.普攻伤害增加+20%\n2.技能伤害增加+20%", "1.普攻伤害增加+40%\n2.技能伤害增加+40%", "1.普攻伤害增加+60%\n2.技能伤害增加+60%", "1.普攻伤害增加+80%\n2.技能伤害增加+80%", "1.普攻伤害增加+100%\n2.技能伤害增加+100%"],
            ["没有加成", "1.普攻伤害增加+20%，加血能量增加+0.2%\n2.给战车护盾时长增加+0.5秒", "1.普攻伤害增加+40%，加血能量增加+0.4%\n2.给战车护盾时长增加+1秒", "1.普攻伤害增加+60%，加血能量增加+0.6%\n2.给战车护盾时长增加+1.5秒", "1.普攻伤害增加+80%，加血能量增加+0.8%\n2.给战车护盾时长增加+2秒", "1.普攻伤害增加+100%，加血能量增加+1%\n2.给战车护盾时长增加+2.5秒"],
            ["没有加成", "1.普攻伤害增加+20%，增加中毒时长+0.5秒\n2.技能伤害增加+20%", "1.普攻伤害增加+40%，增加中毒时长+1秒\n2.技能伤害增加+40%", "1.普攻伤害增加+60%，增加中毒时长+1.5秒\n2.技能伤害增加+60%", "1.普攻伤害增加+80%，增加中毒时长+2秒\n2.技能伤害增加+80%", "1.普攻伤害增加+100%，增加中毒时长+2.5秒\n2.技能伤害增加+100%"],
            ["没有加成", "1.普攻弓箭个数增加+1\n2.技能伤害增加+20%", "1.普攻弓箭个数增加+2\n2.技能伤害增加+40%", "1.普攻弓箭个数增加+3\n2.技能伤害增加+60%", "1.普攻弓箭个数增加+4\n2.技能伤害增加+80%", "1.普攻弓箭个数增加+5\n2.技能伤害增加+100%"],
            ["没有加成",
                "1.普攻伤害增加+30%，冰弹范围加20，持续加0.5秒\n2.技能伤害增加+30%",
                "1.普攻伤害增加+60%，冰弹范围加40，持续加1秒\n2.技能伤害增加+60%",
                "1.普攻伤害增加+90%，冰弹范围加60，持续加1.5秒\n2.技能伤害增加+90%",
                "1.普攻伤害增加+120%，冰弹范围加80，持续加2秒\n2.技能伤害增加+120%",
                "1.普攻伤害增加+150%，冰弹范围加100，持续加2.5秒\n2.技能伤害增加+150%"],
            ["没有加成",
                "1.普攻伤害增加+30%\n2.技能伤害增加+30%",
                "1.普攻伤害增加+60%\n2.技能伤害增加+60%",
                "1.普攻伤害增加+90%\n2.技能伤害增加+90%",
                "1.普攻伤害增加+120%\n2.技能伤害增加+120%",
                "1.普攻伤害增加+150%\n2.技能伤害增加+150%"],
            ["没有加成", "1.普攻伤害增加+30%\n2.技能伤害增加+30%",
                "1.普攻伤害增加+60%\n2.技能伤害增加+60%",
                "1.普攻伤害增加+90%\n2.技能伤害增加+90%",
                "1.普攻伤害增加+120%\n2.技能伤害增加+120%",
                "1.普攻伤害增加+150%\n2.技能伤害增加+150%"],
            ["没有加成", "1.普攻伤害增加+30%，闪电弹射人数加+1\n2.技能伤害增加+30%",
                "1.普攻伤害增加+60%，闪电弹射人数加+2\n2.技能伤害增加+60%",
                "1.普攻伤害增加+90%，闪电弹射人数加+3\n2.技能伤害增加+90%",
                "1.普攻伤害增加+120%，闪电弹射人数加+4\n2.技能伤害增加+120%",
                "1.普攻伤害增加+150%，闪电弹射人数加+5\n2.技能伤害增加+150%"]];
        //是否显示了退出游戏的对话框
        _this.is_show_exit = false;
        //动画位置
        _this.aniType = 0;
        //战车的位置x
        _this.charPosX = 0;
        //游戏动画存储数据
        // public moveData: Array<cc.Vec2> = [];
        _this.roguelikeWave = [3, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110];
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
            if (heroData) {
                mainWallData.Health += heroData.total_hp * 0.2 * _this.getCharioHealthRatio();
                mainWallData.Defense += heroData.total_defense * 0.2 * _this.getCharioDefenseRotio();
                mainWallData.Miss += heroData.Miss * 0.2;
                mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
                mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
                mainWallData.Attack += heroData.total_attack * 0.2;
                mainWallData.Hit += heroData.Hit * 0.2;
            }
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
        return this.charioUpgradationData[1] * 0.4 + 1;
    };
    //获取因为技能等级变化的防御比率
    GameManager.prototype.getCharioDefenseRotio = function () {
        return this.charioUpgradationData[3] * 0.3 + 1;
    };
    //攻击力比率
    GameManager.prototype.getCharioAttackRotio = function () {
        return this.charioUpgradationData[0] * 0.2;
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
                    GameManager_1.getInstance().startNextLevel();
                    //GameManager.getInstance().showBtnBuff(1);//Buff选择弹窗
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQThKO0FBTTlKLCtCQUEwQjtBQUMxQiwrQkFBMEI7QUFDMUIsc0NBQWlDO0FBRWpDLHNDQUFpQztBQUNqQywrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELDJDQUFzQztBQUN0QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLCtDQUE4QztBQUM5QyxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBQ3RELHFEQUFvRDtBQUNwRCxxREFBMkQ7QUFDM0QsMERBQWdFO0FBQ2hFLGtEQUE2QztBQUM3QywwREFBZ0U7QUFDaEUsaURBQXVEO0FBQ3ZELHFEQUFnRDtBQUNoRCxvRUFBZ0c7QUFDaEcscURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCw0Q0FBMkM7QUFDM0Msc0NBQWlDO0FBRWpDLGtEQUFpRDtBQUNqRCxnRUFBNkU7QUFDN0UsMkRBQTZEO0FBQzdELHlEQUFxRDtBQUVyRCxxREFBNEU7QUFDNUUsa0RBQTZDO0FBQzdDLDBDQUFxRDtBQUNyRCw2Q0FBd0M7QUFDeEMsdURBQTZEO0FBRTdELHlEQUFvRDtBQUNwRCxrREFBNkM7QUFDN0MsZ0RBQTZDO0FBQzdDLG9FQUErRDtBQUMvRCx5REFBK0Q7QUFDL0QsMEVBQWdGO0FBRWhGLDRFQUFrRjtBQUNsRixxREFBZ0Q7QUFDaEQseURBQW9EO0FBSTVDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBMGpEQztRQXRqRFcsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFDOUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDekMsa0VBQWtFO1FBQ2xFLG9CQUFjLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDbkQsa0VBQWtFO1FBQ2xFLE9BQU87UUFDUCxVQUFJ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LENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxTyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxF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cUNBQWUsR0FBdEIsVUFBdUIsS0FBYztRQUNqQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxxQ0FBZSxHQUF2QixVQUF3QixLQUFjLEVBQUUsR0FBVztRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBYyxFQUFFLEdBQVc7UUFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLHNDQUFnQixHQUF2QixVQUF3QixLQUFjO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLHNDQUFnQixHQUF4QixVQUF5QixLQUFjLEVBQUUsR0FBVztRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7SUF2akRjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBMGpEL0I7SUFBRCxrQkFBQztDQTFqREQsQUEwakRDLENBMWpEd0MsRUFBRSxDQUFDLFNBQVMsR0EwakRwRDtrQkExakRvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIEdvX1R5cGUsIElzRGVidWcsIFNlbGVjdFNraWxsX1R5cGUsIFZJREVPX1RZUEUsIFpoZW5nX1hpbmdfVHlwZSwgR2FtZU1vZGUsIEZpZ2h0aW5nSW5mbywgSmlhU3UgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENodVNoZW5nRGlhbiBmcm9tIFwiLi9HYW1lL0NodVNoZW5nRGlhblwiO1xyXG5pbXBvcnQgRW5lbXlIcE1hbmFnZXIgZnJvbSBcIi4vRW5lbXkvRW5lbXlIcE1hbmFnZXJcIjtcclxuaW1wb3J0IEhwVGV4dEhwTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL0hwVGV4dE1hbmFnZXJcIjtcclxuaW1wb3J0IE11c2ljIGZyb20gXCIuL1NvdW5kL011aXNjXCI7XHJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi9Tb3VuZC9Tb3VuZFwiO1xyXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9Ib21lXCI7XHJcbmltcG9ydCBIaW50IGZyb20gXCIuL0hpbnRcIjtcclxuaW1wb3J0IEdldFRpcCBmcm9tIFwiLi9VSS9HZXRUaXBcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZS9HYW1lXCI7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4vVUkvRGlhbG9nXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCBMb2NhbFZpZGVvIGZyb20gXCIuL0xvY2FsVmlkZW9cIjtcclxuaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFVubG9ja1NraWxsIGZyb20gXCIuL1VJL1VubG9ja1NraWxsXCI7XHJcbmltcG9ydCB7IFpoZW5YaW5nRGF0YSB9IGZyb20gXCIuL1poZW5YaW5nRGF0YVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IEJvc3NNYW5hZ2VyIGZyb20gXCIuL0Jvc3MvQm9zc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXIvVG93ZXJMZXZlbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckNvbmZpZ3VyZSwgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBIZXJvSW5mbywgSGVyb19UeXBlIH0gZnJvbSBcIi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEd1YUppR2lmdCBmcm9tIFwiLi9HdWFKaS9VaS9HdWFKaUdpZnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgR2FtZVdpbiBmcm9tIFwiLi9HYW1lL1VpL0dhbWVXaW5cIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBCdWZmRGlzcGxheSBmcm9tIFwiLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCBSZXdhcmRTU1VpIGZyb20gXCIuL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVmYWJfaGludDogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIHByaXZhdGUgcHJlZmFiX2dldF90aXA6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSE9NRS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJvbGVfc2hvd19oZXJvOiBIZXJvX1R5cGUgPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdhbWUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL+WQhOenjeeuoeeQhuWZqFxyXG4gICAgZ2FtZTogR2FtZSA9IG51bGw7XHJcbiAgICBlbmVteV9ocF9tYW5hZ2VyOiBFbmVteUhwTWFuYWdlciA9IG51bGw7XHJcbiAgICBocF90ZXh0X21hbmFnZXI6IEhwVGV4dEhwTWFuYWdlciA9IG51bGw7XHJcbiAgICBjaHVfc2hlbmdfZGlhbjogQ2h1U2hlbmdEaWFuID0gbnVsbDtcclxuICAgIC8v5aOw6Z+zXHJcbiAgICBzb3VuZF9tYW5hZ2VyOiBTb3VuZCA9IG51bGw7XHJcbiAgICBtdXNpY19tYW5hZ2VyOiBNdXNpYyA9IG51bGw7XHJcbiAgICAvL+WQhOWkp+iLsembhOeahFxyXG4gICAgYWxsX2hlcm86IE1hcDxudW1iZXIsIEhlcm8+ID0gbnVsbDtcclxuICAgIC8vRFBT57uf6K6hXHJcbiAgICBoZXJvX3NraWxsX2RwczogbnVtYmVyW10gPSBudWxsO1xyXG4gICAgaGVyb19hdHRhY2tfZHBzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgICAvKirlrqDniankuLvliqjmioDog73pgKDmiJDnmoTkvKTlrrMgKi9cclxuICAgIHByaXZhdGUgcGV0X2FjdGl2ZV9kcHM6IE1hcDxQZXRJbmZvLCBudW1iZXI+ID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqei/nuaQuuaKgOiDvemAoOaIkOeahOS8pOWusyAqL1xyXG4gICAgcHJpdmF0ZSBwZXRfY29ubmVjdF9kcHM6IE1hcDxQZXRJbmZvLCBudW1iZXI+ID0gbnVsbDtcclxuXHJcbiAgICBjdXJfZ2FtZV9zdGF0ZTogR2FtZVN0YXRlID0gR2FtZVN0YXRlLkdhbWVfUmVhZHk7XHJcbiAgICBjdXJfZ2FtZV9tb2RlOiBHYW1lTW9kZSA9IEdhbWVNb2RlLk1haW47XHJcbiAgICBjdXJfZ2FtZV9zY2VuZTogR2FtZVNjZW5lID0gR2FtZVNjZW5lLmhvbWU7XHJcblxyXG4gICAgdHVtVGFibGVUaW1lOiBudW1iZXIgPSA2MCo2MCoxMjsvL+WFjei0ueaKveWlluWAkuiuoeaXtlxyXG4gICAgLy/lvZPliY3nmoTliqDovb3ov5vluqZcclxuICAgIGN1cl9sb2FkX3Byb2dyZXNzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8v5q+P5Liq6Iux6ZuE6I635b6X55qE5ri45oiP5YaF5oqA6IO9XHJcbiAgICBpbmdhbWVfc2tpbGxzOiBTZWxlY3RTa2lsbF9UeXBlW10gPSBbXTtcclxuICAgIC8v5byA5aeL55qE5YWz5Y2h55qE5pWw5o2uXHJcbiAgICBjdXJfd2F2ZTogbnVtYmVyID0gMDtcclxuICAgIGZpZ2h0aW5nX2luZm86IEZpZ2h0aW5nSW5mbyA9IG51bGw7XHJcbiAgICAvL2Ryb3BfZGF0YTpEcm9wRGF0YT1udWxsO1xyXG4gICAgcmV3YXJkX2RhdGE6IFJld2FyZERhdGFbXSA9IFtdO1xyXG4gICAgaXNfbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+aOieiQveeJqeWTgeeahOaAqueJqWlkXHJcbiAgICAvL2Ryb3BfZW5lbXlfdHlwZTpudW1iZXI9MDtcclxuXHJcbiAgICBnYW1lX3RvX2hvbWU6IEdvX1R5cGUgPSBHb19UeXBlLk1haW47XHJcblxyXG4gICAgZnVodW9fbnVtOiBudW1iZXIgPSAxO1xyXG4gICAgaXNfc2hvd190ZXh0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8v5pyA5aSn55qE5oqA6IO95qe95L2NXHJcbiAgICBtYXhfc2tpbGxfc2xvdDogbnVtYmVyID0gMjtcclxuICAgIC8v5ZCE5Liq6Iux6ZuE5pWw5o2u77yM5ri45oiP5YaF5L2/55So77yM5YWz5Y2h5YaFYnVmZuOAglxyXG4gICAgZ2FtZV9oZXJvX2RhdGE6IE1hcDxudW1iZXIsIEhlcm9EYXRhPiA9IG51bGw7XHJcbiAgICAvL+esrOWHoOS4quaAquacieWPr+iDveeIhuaYn+aYn2J1ZmZcclxuICAgIC8vc3Rhcl9pbmRleDpudW1iZXI9MDtcclxuICAgIC8vXHJcbiAgICAvKirlvZPliY3mgLvlhbHnmoTmgKrnianmlbDph48gKi9cclxuICAgIGN1cl90b3RhbF9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirlrp7pmYXkuIrlt7Lnu4/nlJ/miJDlh7rmgKrniannmoTmlbDph48gKi9cclxuICAgIGN1cl9jcmVhdGVfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgZW5lbXlfb2Zmc2V0X3k6IG51bWJlciA9IDA7XHJcbiAgICBlbmVteV9hdHRfeTogbnVtYmVyID0gLTMwMDtcclxuICAgIGVuZW15X2NyZWF0ZV95OiBudW1iZXIgPSAxMDgwO1xyXG4gICAgbG9hZF9qaXNodTogbnVtYmVyID0gMDtcclxuICAgIGxvYWRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIGppc2h1X3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvL+mAmuWFs+asoeaVsFxyXG4gICAgcGFzc19sZXZlbF9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirmuLjmiI/pgJ/njocgKi9cclxuICAgIHByaXZhdGUgZ2FtZV9yYXRlOiBudW1iZXIgPSAyO1xyXG4gICAgLyoq5oyJ6ZKu5oyH5a6a6YCf546HICovXHJcbiAgICBwcml2YXRlIGJ0bl9zZXR1cF9yYXRlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5oiY5paX5oyH5a6a6YCf546HICovXHJcbiAgICBwcml2YXRlIGZpZ2h0aW5nX3NldHVwX3JhdGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirljZXmrKHmnIDpq5jkvKTlrrPlgLwgKi9cclxuICAgIHByaXZhdGUgbWF4X2RhbWFnZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWNleasoeacgOWwj+S8pOWus+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBtaW5fZGFtYWdlOiBudW1iZXIgPSA5OTk5O1xyXG4gICAgLyoq6Ieq5Yqo5oiY5paX5qCH6K+GICovXHJcbiAgICBwdWJsaWMgYXV0b19maWdodGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKirlvZPliY3nmoTpmJ/liJcgKi9cclxuICAgIHB1YmxpYyBjdXJfdGVhbV9saXN0OiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBjaGFyaW9VcGdyYWRhdGlvbkRhdGE6IEFycmF5PG51bWJlcj4gPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgcHVibGljIGNoYXJpb1RpcDogQXJyYXk8c3RyaW5nPiA9IFtcIuaUu+WHu+S8pOWus1wiLCBcIuihgOmHj+S4iumZkFwiLCBcIuaUu+WHu+mAn+W6plwiLCBcIuWinuW8uumYsuW+oVwiLCBcIuaKgOiDvemXtOmalFwiLCBcIuaBouWkjeihgOmHj1wiXTtcclxuXHJcbiAgICBwdWJsaWMgY2hhcmlvQ29udGVudDogQXJyYXk8QXJyYXk8c3RyaW5nPj4gPSBbXHJcbiAgICAgICAgW1wi5rKh5pyJ5Yqg5oiQXCIsIFwi5omA5pyJ6Iux6ZuE5pS75Ye75Yqb5o+Q5Y2HKzIwJVwiLCBcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhys0MCVcIiwgXCLmiYDmnInoi7Hpm4TmlLvlh7vlipvmj5DljYcrNjAlXCIsIFwi5omA5pyJ6Iux6ZuE5pS75Ye75Yqb5o+Q5Y2HKzgwJVwiLCBcIuaJgOacieiLsembhOaUu+WHu+WKm+aPkOWNhysxMDAlXCJdLFxyXG4gICAgICAgIFtcIuayoeacieWKoOaIkFwiLCBcIuaImOi9puihgOmHj+S4iumZkCs0MCVcIiwgXCLmiJjovabooYDph4/kuIrpmZArODAlXCIsIFwi5oiY6L2m6KGA6YeP5LiK6ZmQKzEyMCVcIiwgXCLmiJjovabooYDph4/kuIrpmZArMTYwJVwiLCBcIuaImOi9puihgOmHj+S4iumZkCsyMDAlXCJdLFxyXG4gICAgICAgIFtcIuayoeacieWKoOaIkFwiLCBcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhysxMCVcIiwgXCLmiYDmnInoi7Hpm4TmlLvlh7vpgJ/luqbmj5DljYcrMjAlXCIsIFwi5omA5pyJ6Iux6ZuE5pS75Ye76YCf5bqm5o+Q5Y2HKzMwJVwiLCBcIuaJgOacieiLsembhOaUu+WHu+mAn+W6puaPkOWNhys0MCVcIiwgXCLmiYDmnInoi7Hpm4TmlLvlh7vpgJ/luqbmj5DljYcrNTAlXCJdLFxyXG4gICAgICAgIFtcIuayoeacieWKoOaIkFwiLCBcIuaImOi9pumYsuW+oeWKm+aPkOWNhyszMCVcIiwgXCLmiJjovabpmLLlvqHlipvmj5DljYcrNjAlXCIsIFwi5oiY6L2m6Ziy5b6h5Yqb5o+Q5Y2HKzkwJVwiLCBcIuaImOi9pumYsuW+oeWKm+aPkOWNhysxMjAlXCIsIFwi5oiY6L2m6Ziy5b6h5Yqb5o+Q5Y2HKzE1MCVcIl0sXHJcbiAgICAgICAgW1wi5rKh5pyJ5Yqg5oiQXCIsIFwi5omA5pyJ6Iux6ZuE5oqA6IO9Q0QtMC4156eSXCIsIFwi5omA5pyJ6Iux6ZuE5oqA6IO9Q0QtMeenklwiLCBcIuaJgOacieiLsembhOaKgOiDvUNELTEuNeenklwiLCBcIuaJgOacieiLsembhOaKgOiDvUNELTLnp5JcIiwgXCLmiYDmnInoi7Hpm4TmioDog71DRC0yLjXnp5JcIl0sXHJcbiAgICAgICAgW1wi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsIFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsIFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsIFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsIFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCIsIFwi5oGi5aSN5oiY6L2m5pyA5aSn6KGA6YeP55qEMjAlXCJdXTtcclxuXHJcbiAgICBwdWJsaWMgaGVyVXBDb250ZW50OiBBcnJheTxBcnJheTxzdHJpbmc+PiA9IFtbXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzIwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzIwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzQwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzUwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzUwJVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLCBcIjEu5pmu5pS75byT566t56m/6YCP5pWM5Lq65Liq5pWwKzFcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMCVcIiwgXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCsyXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsIFwiMS7mma7mlLvlvJPnrq3nqb/pgI/mlYzkurrkuKrmlbArM1xcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLCBcIjEu5pmu5pS75byT566t56m/6YCP5pWM5Lq65Liq5pWwKzNcXG4yLuaKgOiDveS8pOWus+WinuWKoCs0MCVcIiwgXCIxLuaZruaUu+W8k+eureepv+mAj+aVjOS6uuS4quaVsCs1XFxuMi7mioDog73kvKTlrrPlop7liqArNTAlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMTAlXFxuMi7mioDog73kvKTlrrPlop7liqArMTAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAlXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMzAlXFxuMi7mioDog73kvKTlrrPlop7liqArMzAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArNDAlXFxuMi7mioDog73kvKTlrrPlop7liqArNDAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArNTAlXFxuMi7mioDog73kvKTlrrPlop7liqArNTAlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMTAlXFxuMi7mioDog73kvKTlrrPlop7liqArMTAlLOe8oOe7leaXtumXtOWinuWKoDAuNeenkuOAglwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzIwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzIwJSznvKDnu5Xml7bpl7Tlop7liqAx56eS44CCXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMzAlXFxuMi7mioDog73kvKTlrrPlop7liqArMzAlLOe8oOe7leaXtumXtOWinuWKoDEuNeenkuOAglwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzQwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJSznvKDnu5Xml7bpl7Tlop7liqAy56eS44CCXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArNTAlXFxuMi7mioDog73kvKTlrrPlop7liqArNTAlLOe8oOe7leaXtumXtOWinuWKoDIuNeenkuOAglwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzIwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzIwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzQwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzYwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzYwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzgwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzgwJVwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMDAlXCJdLFxyXG4gICAgW1wi5rKh5pyJ5Yqg5oiQXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArMjAl77yM5Yqg6KGA6IO96YeP5aKe5YqgKzAuMiVcXG4yLue7meaImOi9puaKpOebvuaXtumVv+WinuWKoCswLjXnp5JcIiwgXCIxLuaZruaUu+S8pOWus+WinuWKoCs0MCXvvIzliqDooYDog73ph4/lop7liqArMC40JVxcbjIu57uZ5oiY6L2m5oqk55u+5pe26ZW/5aKe5YqgKzHnp5JcIiwgXCIxLuaZruaUu+S8pOWus+WinuWKoCs2MCXvvIzliqDooYDog73ph4/lop7liqArMC42JVxcbjIu57uZ5oiY6L2m5oqk55u+5pe26ZW/5aKe5YqgKzEuNeenklwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzgwJe+8jOWKoOihgOiDvemHj+WinuWKoCswLjglXFxuMi7nu5nmiJjovabmiqTnm77ml7bplb/lop7liqArMuenklwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEwMCXvvIzliqDooYDog73ph4/lop7liqArMSVcXG4yLue7meaImOi9puaKpOebvuaXtumVv+WinuWKoCsyLjXnp5JcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIiwgXCIxLuaZruaUu+S8pOWus+WinuWKoCsyMCXvvIzlop7liqDkuK3mr5Lml7bplb8rMC4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArNDAl77yM5aKe5Yqg5Lit5q+S5pe26ZW/KzHnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCs0MCVcIiwgXCIxLuaZruaUu+S8pOWus+WinuWKoCs2MCXvvIzlop7liqDkuK3mr5Lml7bplb8rMS4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArNjAlXCIsIFwiMS7mma7mlLvkvKTlrrPlop7liqArODAl77yM5aKe5Yqg5Lit5q+S5pe26ZW/KzLnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCs4MCVcIiwgXCIxLuaZruaUu+S8pOWus+WinuWKoCsxMDAl77yM5aKe5Yqg5Lit5q+S5pe26ZW/KzIuNeenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwMCVcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIiwgXCIxLuaZruaUu+W8k+eureS4quaVsOWinuWKoCsxXFxuMi7mioDog73kvKTlrrPlop7liqArMjAlXCIsIFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArMlxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzQwJVwiLCBcIjEu5pmu5pS75byT566t5Liq5pWw5aKe5YqgKzNcXG4yLuaKgOiDveS8pOWus+WinuWKoCs2MCVcIiwgXCIxLuaZruaUu+W8k+eureS4quaVsOWinuWKoCs0XFxuMi7mioDog73kvKTlrrPlop7liqArODAlXCIsIFwiMS7mma7mlLvlvJPnrq3kuKrmlbDlop7liqArNVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEwMCVcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJe+8jOWGsOW8ueiMg+WbtOWKoDIw77yM5oyB57ut5YqgMC4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArMzAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCs2MCXvvIzlhrDlvLnojIPlm7TliqA0MO+8jOaMgee7reWKoDHnp5JcXG4yLuaKgOiDveS8pOWus+WinuWKoCs2MCVcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzkwJe+8jOWGsOW8ueiMg+WbtOWKoDYw77yM5oyB57ut5YqgMS4156eSXFxuMi7mioDog73kvKTlrrPlop7liqArOTAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCsxMjAl77yM5Yaw5by56IyD5Zu05YqgODDvvIzmjIHnu63liqAy56eSXFxuMi7mioDog73kvKTlrrPlop7liqArMTIwJVwiLFxyXG4gICAgICAgIFwiMS7mma7mlLvkvKTlrrPlop7liqArMTUwJe+8jOWGsOW8ueiMg+WbtOWKoDEwMO+8jOaMgee7reWKoDIuNeenklxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzE1MCVcIl0sXHJcbiAgICBbXCLmsqHmnInliqDmiJBcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFxyXG4gICAgICAgIFwiMS7mma7mlLvkvKTlrrPlop7liqArNjAlXFxuMi7mioDog73kvKTlrrPlop7liqArNjAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCs5MCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCs5MCVcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEyMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMjAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCsxNTAlXFxuMi7mioDog73kvKTlrrPlop7liqArMTUwJVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzMwJVwiLFxyXG4gICAgICAgIFwiMS7mma7mlLvkvKTlrrPlop7liqArNjAlXFxuMi7mioDog73kvKTlrrPlop7liqArNjAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCs5MCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCs5MCVcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEyMCVcXG4yLuaKgOiDveS8pOWus+WinuWKoCsxMjAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCsxNTAlXFxuMi7mioDog73kvKTlrrPlop7liqArMTUwJVwiXSxcclxuICAgIFtcIuayoeacieWKoOaIkFwiLCBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzMwJe+8jOmXqueUteW8ueWwhOS6uuaVsOWKoCsxXFxuMi7mioDog73kvKTlrrPlop7liqArMzAlXCIsXHJcbiAgICAgICAgXCIxLuaZruaUu+S8pOWus+WinuWKoCs2MCXvvIzpl6rnlLXlvLnlsITkurrmlbDliqArMlxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzYwJVwiLFxyXG4gICAgICAgIFwiMS7mma7mlLvkvKTlrrPlop7liqArOTAl77yM6Zeq55S15by55bCE5Lq65pWw5YqgKzNcXG4yLuaKgOiDveS8pOWus+WinuWKoCs5MCVcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzEyMCXvvIzpl6rnlLXlvLnlsITkurrmlbDliqArNFxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzEyMCVcIixcclxuICAgICAgICBcIjEu5pmu5pS75Lyk5a6z5aKe5YqgKzE1MCXvvIzpl6rnlLXlvLnlsITkurrmlbDliqArNVxcbjIu5oqA6IO95Lyk5a6z5aKe5YqgKzE1MCVcIl1dO1xyXG5cclxuXHJcbiAgICAvL+aYr+WQpuaYvuekuuS6humAgOWHuua4uOaIj+eahOWvueivneahhlxyXG4gICAgcHVibGljIGlzX3Nob3dfZXhpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy/liqjnlLvkvY3nva5cclxuICAgIHB1YmxpYyBhbmlUeXBlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8v5oiY6L2m55qE5L2N572ueFxyXG4gICAgcHVibGljIGNoYXJQb3NYOiBudW1iZXIgPSAwO1xyXG4gICAgLy/muLjmiI/liqjnlLvlrZjlgqjmlbDmja5cclxuICAgIC8vIHB1YmxpYyBtb3ZlRGF0YTogQXJyYXk8Y2MuVmVjMj4gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIHJvZ3VlbGlrZVdhdmU6IEFycmF5PG51bWJlcj4gPSBbMywgNiwgMTAsIDE0LCAxOCwgMjIsIDI2LCAzMCwgMzQsIDM4LCA0MiwgNDYsIDUwLCA1NCwgNTgsIDYyLCA2NiwgNzAsIDc0LCA3OCwgODIsIDg2LCA5MCwgOTQsIDk4LCAxMDIsIDEwNiwgMTEwXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdhbWVNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVMb2FkZXJvblwiKTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0KHNjZW5lOiBHYW1lU2NlbmUpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3NjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5pc19sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaVR5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvVXBncmFkYXRpb25EYXRhID0gWzAsIDAsIDAsIDAsIDAsIDBdO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9zY2VuZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVTY2VuZS5ob21lOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX3Byb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhpdFBsYXlHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMucm9sZV9zaG93X2hlcm89SGVyb19UeXBlLlNoZVNob3U7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmdhbWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV90b19ob21lID0gR29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1JlYWR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfaGVybyA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvPigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3RhbF9udW0gPSB0aGlzLmN1cl9jcmVhdGVfbnVtID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmdhbWVfc2tpbGxzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9kYXRhID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1aHVvX251bSA9IDE7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYXV0b19maWdodGluZyA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuQXV0b0ZpZ2h0aW5nKSA+IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuY3VyX2xvYWRfcHJvZ3Jlc3MgPSAwOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5nYW1lLnNldFJvZ3VlVGV4dCh0aGlzLmdldFJvZ3VlTGlrZU51bSgpKTtcclxuICAgICAgICB0aGlzLmxvYWRUaXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5TZXR1cFJhdGUocmF0ZTogbnVtYmVyLCBpc0FjdGl2aXR5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuYnRuX3NldHVwX3JhdGUgPSByYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgaWYgKGlzQWN0aXZpdHkpIHtcclxuICAgICAgICAgICAgaWYgKHJhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf5YWz6Zet5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXV0b0ZpZ2h0aW5nKGlzQXV0bzogYm9vbGVhbiwgaXNBY3Rpdml0eTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvLyB0aGlzLmF1dG9fZmlnaHRpbmcgPSBpc0F1dG87XHJcbiAgICAgICAgLy8gaWYgKGlzQWN0aXZpdHkpIHtcclxuICAgICAgICAvLyAgICAgaWYgKGlzQXV0bykge1xyXG4gICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+W8gOWQr+aIkOWKn+asoeaVsCk7XHJcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX5YWz6Zet5oiQ5Yqf5qyh5pWwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRCdG5TZXR1cFJhdGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idG5fc2V0dXBfcmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWdodGluZ1JhdGUocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maWdodGluZ19zZXR1cF9yYXRlID0gcmF0ZTtcclxuICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVSYXRlKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIC8vdGhpcy5nYW1lX3JhdGUgPSByYXRlICogdGhpcy5idG5fc2V0dXBfcmF0ZSAqIHRoaXMuZmlnaHRpbmdfc2V0dXBfcmF0ZTtcclxuICAgICAgICBjYy5rU3BlZWQodGhpcy5nYW1lX3JhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVSYXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZV9yYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UmF0ZSgpIHtcclxuICAgICAgICAvL3RoaXMuZ2FtZV9yYXRlID0gMTtcclxuICAgICAgICBjYy5rU3BlZWQodGhpcy5nYW1lX3JhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1heERhbWFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW0gPiB0aGlzLm1heF9kYW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhfZGFtYWdlID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhEYW1hZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1pbkRhbWFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW0gPCB0aGlzLm1pbl9kYW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5fZGFtYWdlID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNaW5EYW1hZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taW5fZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhbWFnZVRleHRTY2FsZShkYW1hZ2U6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtYXhTY2FsZSA9IDEuNDtcclxuICAgICAgICBsZXQgc2NhbGVWYWx1ZSA9IDE7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBkYW1hZ2UgLyB0aGlzLmdldE1heERhbWFnZSgpO1xyXG4gICAgICAgIHNjYWxlVmFsdWUgPSByYXRlICogbWF4U2NhbGU7XHJcbiAgICAgICAgaWYgKHNjYWxlVmFsdWUgPCAxKSB7XHJcbiAgICAgICAgICAgIHNjYWxlVmFsdWUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2NhbGVWYWx1ZSA+IG1heFNjYWxlKSB7XHJcbiAgICAgICAgICAgIHNjYWxlVmFsdWUgPSBtYXhTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFtYWdlVGV4dEVmZmVjdChkYW1hZ2U6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgIGxldCByYXRlID0gZGFtYWdlIC8gdGhpcy5nZXRNYXhEYW1hZ2UoKTtcclxuICAgICAgICBpZiAocmF0ZSA8IDAuMikge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCAwLjQpIHtcclxuICAgICAgICAgICAgZWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgMC42KSB7XHJcbiAgICAgICAgICAgIGVmZmVjdElkID0gR2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8zO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDAuOCkge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfNDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVmZmVjdElkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm8oaGVyb0lkOiBIZXJvX1R5cGUpOiBIZXJvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxfaGVyby5nZXQoaGVyb0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkR2FtZUhlcm9EYXRhKCkge1xyXG4gICAgICAgIGxldCBpc0luaXREcHMgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fYXR0YWNrX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oZXJvX2F0dGFja19kcHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBpc0luaXREcHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMgPSBuZXcgTWFwPFBldEluZm8sIG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLnBldF9jb25uZWN0X2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEgPSBuZXcgTWFwPG51bWJlciwgSGVyb0RhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5jdXJfdGVhbV9saXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdCh0aGlzLmN1cl9nYW1lX21vZGUpO1xyXG5cclxuICAgICAgICBsZXQgZmlnaHRpbmdEYXRhID0gTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRmlnaHRpbmdEYXRhKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBsZXQgbWFpbldhbGxEYXRhID0gbmV3IEF0dHJpYnV0ZURhdGEoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luaXREcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhID0gbmV3IEhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIGxldCBob21lSGVyb0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKGkpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZUhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKGhvbWVIZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfdGVhbV9saXN0LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov7flrqvmqKHlvI/liqDmiJBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1hemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEudG90YWxfYXR0YWNrICs9IChmaWdodGluZ0RhdGEuQXR0YWNrUGVyKSAqIGhlcm9EYXRhLmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS50b3RhbF9kZWZlbnNlICs9IChmaWdodGluZ0RhdGEuRGVmZW5zZVBlcikgKiBoZXJvRGF0YS5maXhfZGVmZW5zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuQ3JpdGljYWwgKz0gZmlnaHRpbmdEYXRhLkNyaXRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLkhpdCArPSBmaWdodGluZ0RhdGEuSGl0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IZWFsdGggKz0gaGVyb0RhdGEudG90YWxfaHAgKiAwLjIgKiB0aGlzLmdldENoYXJpb0hlYWx0aFJhdGlvKCk7O1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjIgKiB0aGlzLmdldENoYXJpb0RlZmVuc2VSb3RpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzLnNldChoZXJvRGF0YS5wZXRfaW5mbywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1heERhbWFnZShoZXJvRGF0YS50b3RhbF9hdHRhY2sgKiBoZXJvRGF0YS5FeHRyYUNyaXRpY2FsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWluRGFtYWdlKGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaSwgaGVyb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5pbml0V2FsbChtYWluV2FsbERhdGEsIFdhbGxUeXBlLk1haW4pO1xyXG4gICAgICAgIC8vIGlmKGhwPDMwMDApe1xyXG4gICAgICAgIC8vICAgICBocD0zMDAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihkZWZlbnNlPDEwMCl7XHJcbiAgICAgICAgLy8gICAgIGRlZmVuc2U9MTAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL3RoaXMud2FsbF9kYXRhLmluaXRJbmhlcml0RGF0YShocCxkZWZlbnNlLG1pc3MsYW50aUNyaXRpY2FsLGFudGlFeHRyYUNyaXRpY2FsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkVHV0b3JhaWxzSGVyb0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IGlzSW5pdERwcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9fYXR0YWNrX2Rwcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2RwcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19kcHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGlzSW5pdERwcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBIZXJvX1R5cGUuSGVyb19OdW07IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9kcHMucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJbml0RHBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2Rwcy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfZHBzLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXRfYWN0aXZlX2RwcyA9IG5ldyBNYXA8UGV0SW5mbywgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzID0gbmV3IE1hcDxQZXRJbmZvLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YSA9IG5ldyBNYXA8bnVtYmVyLCBIZXJvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmN1cl90ZWFtX2xpc3QgPSBbSGVyb19UeXBlLlNob3VXYW5nLCBIZXJvX1R5cGUuQU51QmlTaSwgSGVyb19UeXBlLlpoZW5EZSwgSGVyb19UeXBlLk1laU1vLCBIZXJvX1R5cGUuTGVpU2hlbl07XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1cl90ZWFtX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhID0gdGhpcy5hZGRUdXRvdGlhbHNIZXJvRnVsbCh0aGlzLmN1cl90ZWFtX2xpc3RbaV0sIGksIG51bGwpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoICs9IGhlcm9EYXRhLnRvdGFsX2hwICogMC4yICogdGhpcy5nZXRDaGFyaW9IZWFsdGhSYXRpbygpOztcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvRGVmZW5zZVJvdGlvKCk7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5NaXNzICs9IGhlcm9EYXRhLk1pc3MgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BbnRpQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5BdHRhY2sgKz0gaGVyb0RhdGEudG90YWxfYXR0YWNrICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuSGl0ICs9IGhlcm9EYXRhLkhpdCAqIDAuMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGV0X2FjdGl2ZV9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfY29ubmVjdF9kcHMuc2V0KGhlcm9EYXRhLnBldF9pbmZvLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNYXhEYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrICogaGVyb0RhdGEuRXh0cmFDcml0aWNhbClcclxuICAgICAgICAgICAgdGhpcy5zZXRNaW5EYW1hZ2UoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICAgICAgLy90aGlzLmdhbWVfaGVyb19kYXRhLnNldChpLGhlcm9EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaW5pdFdhbGwobWFpbldhbGxEYXRhLCBXYWxsVHlwZS5NYWluKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKSB7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgaWYgKGhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuSGVhbHRoICs9IGhlcm9EYXRhLnRvdGFsX2hwICogMC4yICogdGhpcy5nZXRDaGFyaW9IZWFsdGhSYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkRlZmVuc2UgKz0gaGVyb0RhdGEudG90YWxfZGVmZW5zZSAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvRGVmZW5zZVJvdGlvKCk7XHJcbiAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcyArPSBoZXJvRGF0YS5NaXNzICogMC4yO1xyXG4gICAgICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlDcml0aWNhbCArPSBoZXJvRGF0YS5BbnRpQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUV4dHJhQ3JpdGljYWwgKz0gaGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrICs9IGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIDAuMjtcclxuICAgICAgICAgICAgICAgIG1haW5XYWxsRGF0YS5IaXQgKz0gaGVyb0RhdGEuSGl0ICogMC4yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5yZWZyZXNoV2FsbERhdGFCeWFkZEhlcm8obWFpbldhbGxEYXRhKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hNYWluV2FsbERhdGEoKSB7XHJcbiAgICAgICAgbGV0IG1haW5XYWxsRGF0YSA9IG5ldyBBdHRyaWJ1dGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YSA9IGNjLmluc3RhbnRpYXRlKHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhlYWx0aCArPSBoZXJvRGF0YS50b3RhbF9ocCAqIDAuMiAqIHRoaXMuZ2V0Q2hhcmlvSGVhbHRoUmF0aW8oKTs7XHJcbiAgICAgICAgICAgIG1haW5XYWxsRGF0YS5EZWZlbnNlICs9IGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UgKiAwLjIgKiB0aGlzLmdldENoYXJpb0RlZmVuc2VSb3RpbygpO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuTWlzcyArPSBoZXJvRGF0YS5NaXNzICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQW50aUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlDcml0aWNhbCAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkFudGlFeHRyYUNyaXRpY2FsICs9IGhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsICogMC4yO1xyXG4gICAgICAgICAgICBtYWluV2FsbERhdGEuQXR0YWNrICs9IGhlcm9EYXRhLnRvdGFsX2F0dGFjayAqIDAuMjtcclxuICAgICAgICAgICAgbWFpbldhbGxEYXRhLkhpdCArPSBoZXJvRGF0YS5IaXQgKiAwLjI7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlZnJlc2hXYWxsRGF0YShtYWluV2FsbERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFRpcCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJlZmFiX2hpbnQpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnaGludCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYl9oaW50ID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZWZhYl9nZXRfdGlwKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2dldF90aXAnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJfZ2V0X3RpcCA9IGFzc2V0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgZHQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmVmYWJfaGludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2hpbnQnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgaGludC5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaGludEpzLnNob3dIaW50TWVzc2FnZShtZXNzYWdlLCBkdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBoaW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGludCk7XHJcbiAgICAgICAgICAgIGhpbnQucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGhpbnRKcyA9IGhpbnQuZ2V0Q29tcG9uZW50KEhpbnQpO1xyXG4gICAgICAgICAgICBoaW50SnMuc2hvd0hpbnRNZXNzYWdlKG1lc3NhZ2UsIGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldFRpcChnZXROb2RlOiBjYy5Ob2RlLCBjYWxsQmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZmFiX2hpbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdnZXRfdGlwJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkU2hvd0dldFBvcnAoZ2V0Tm9kZSwgY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkU2hvd0dldFBvcnAoZ2V0Tm9kZSwgY2FsbEJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TXVsdGlwbGVHZXRUaXAoZ2V0Tm9kZXM6IGNjLk5vZGVbXSwgY2FsbEJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9oaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnZ2V0X3RpcCcsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRUaXApLmFkZE11bHRpcGxlUG9ycChnZXROb2RlcywgY2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dldF90aXApO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdldFRpcCkuYWRkTXVsdGlwbGVQb3JwKGdldE5vZGVzLCBjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3Nob3dfZXhpdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X2V4aXQgPSB0cnVlO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERpYWxvZykuc2hvd0RpYWxvZyhtZXNzYWdlLCB5ZXNDYWxsYmFjaywgbm9DYWxsYmFjaywgc2hvd1R5cGUsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0geTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCdXlEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBzaG93VHlwZT86IG51bWJlciwgeT86IHN0cmluZyB8IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcpIHtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdkaWFsb2cnLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChEaWFsb2cpLnNob3dEaWFsb2cobWVzc2FnZSwgeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2ssIHNob3dUeXBlLCB5LCBjdXJyZW5jeSk7XHJcbiAgICAgICAgICAgIC8vIGlmKHkpe1xyXG4gICAgICAgICAgICAvLyAgICAgbm9kZS55PXk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9jYWxWaWRlbyh5ZXNDYWxsYmFjazogRnVuY3Rpb24sIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uLCBpc1ZpZGVvPzogYm9vbGVhbikge1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3ZpZGVvX2RpYWxvZycsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExvY2FsVmlkZW8pLmluaXQoeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdBTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUFsbERyb3AoKTtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lBbGxNb25zdGVyKCk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW9VcGdyYWRhdGlvbkRhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtID0gMDtcclxuICAgICAgICBzd2l0Y2ggKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIGlmICghVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gVHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUFsbEVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5yZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IFRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApOy8v5rOi5pWwXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiLFJvdW5kKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgdGhpcy5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmxvYWRMZXZlbCwgMC41KTtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIucmVzdW1lKCk7XHJcbiAgICB9XHJcbiAgICAvL+agueaNruW9k+WJjWNoYXJpb1VwZ3JhZGF0aW9uRGF0YeiOt+WPluS4gOS4quWNh+e6p+e7hFxyXG4gICAgZ2V0Y2hhcmlvVXBncmFkYXRpb25EYXRhKCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBhcnI6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICB2YXIgYXJUZW1wOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuY2hhcmlvVXBncmFkYXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVtpXSA8IDUgfHwgaSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBhclRlbXAucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WPr+WNh+e6p+aKgOiDveaVsOmHj+Wwj+S6jjNcclxuICAgICAgICBpZiAoYXJUZW1wLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhclRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyVGVtcC5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcnJbMF0gPSBhclRlbXBbMF07XHJcbiAgICAgICAgYXJyWzFdID0gYXJUZW1wWzFdO1xyXG4gICAgICAgIGFyclsyXSA9IGFyVGVtcFsyXTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG5cclxuICAgIH1cclxuICAgIC8v6I635Y+W6Zi15YiX57G75Z6LXHJcbiAgICBnZXRaaGVuZ1hpbmdEYXRhKCk6IFpoZW5YaW5nRGF0YSB7XHJcbiAgICAgICAgbGV0IHdhdmVEYXRhID0gdGhpcy5maWdodGluZ19pbmZvW3RoaXMuY3VyX3dhdmVdO1xyXG4gICAgICAgIC8v6Kej5p6Q6Zi15Z6L5pWw5o2uXHJcbiAgICAgICAgbGV0IHp4RGF0YSA9IG5ldyBaaGVuWGluZ0RhdGEoKTtcclxuICAgICAgICBsZXQgYWxsRW5lbXlEYXRhID0gbmV3IEFycmF5PEpzb25Nb25zdGVyQ29uZmlndXJlPigpO1xyXG4gICAgICAgIGxldCBNQ00gPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2F2ZURhdGEubW9uc3Rlcl9udW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1JZCA9IHdhdmVEYXRhLm1vbnN0ZXJfaWRbaV07XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IE1DTS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtSWQpO1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlOdW0gPSB3YXZlRGF0YS5tb25zdGVyX251bVtpXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBlbmVteU51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxFbmVteURhdGEucHVzaChqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/kuozmrKHlpITnkIbvvIzmiopib3Nz6LefYnVmZuaAquaUvuacgOWJjemdolxyXG4gICAgICAgIGFsbEVuZW15RGF0YS5zb3J0KChhOiBKc29uTW9uc3RlckNvbmZpZ3VyZSwgYjogSnNvbk1vbnN0ZXJDb25maWd1cmUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuU3RyZW5ndGhUeXBlIC0gYS5TdHJlbmd0aFR5cGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRaaGVuWGluZ0RhdGFCeUVuZW15RGF0YShhbGxFbmVteURhdGEsIHp4RGF0YSwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHp4RGF0YTtcclxuICAgIH1cclxuICAgIGdldFpoZW5YaW5nRGF0YUJ5RW5lbXlEYXRhKGVuZW15RGF0YXM6IEpzb25Nb25zdGVyQ29uZmlndXJlW10sIG91dDogWmhlblhpbmdEYXRhLCBidWZmTnVtOiBudW1iZXIsIG1pblk6IG51bWJlcikge1xyXG4gICAgICAgIC8v6Zi15Z6LXHJcbiAgICAgICAgbGV0IHp4VHlwZSA9IFpoZW5nX1hpbmdfVHlwZS5aWDA7XHJcbiAgICAgICAgLy/pmo/mnLrkuIDkuKrpmLXlnotcclxuICAgICAgICB6eFR5cGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBaaGVuZ19YaW5nX1R5cGUubnVtKTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgenhUeXBlPVpoZW5nX1hpbmdfVHlwZS7nrq3lpLQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCB6eERhdGEgPSBuZXcgWmhlblhpbmdEYXRhKCk7XHJcbiAgICAgICAgLy96eERhdGE9dGhpcy5nYW1lLnpoZW5feGluZy5qc29uW3p4VHlwZV07XHJcbiAgICAgICAgbGV0IGxlbiA9IGVuZW15RGF0YXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBpc05leHQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb3RoZXJOdW0gPSAwO1xyXG4gICAgICAgIGxldCBpc0hhdmVCb3NzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV3YWlOdW0gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVCb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPCAoenhEYXRhLm90aGVyX3Bvcy5sZW5ndGggKyBld2FpTnVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15RGF0YXNbaV0uU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3kuIDkuIvmmK/lkKZib3Nz5L2N572u5bey57uP55So5LqG77yM5aaC5p6c55So5LqG5Luj6KGo6L+Z5YWz5pyJMuS4qmJvc3PvvIzpnIDopoHmiorov5nkuKpib3Nz5pS+5YiwYnVmZuS9jee9ruS4ilxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYm9zc19wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LmL5YmN5rKh5pyJ6K6+572uYm9zc+S9jee9riAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5ib3NzX3Bvcy55ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJvc3NfcG9zID0gZGlzUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBld2FpTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5idWZmX3Bvcy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJ1ZmZfcG9zW2J1ZmZOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZk51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHp4RGF0YS5vdGhlcl9wb3Nbb3RoZXJOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmVteURhdGFzW2ldLlN0cmVuZ3RoVHlwZSA9PSBTdHJlbmd0aFR5cGUuRWxpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3V0LmJ1ZmZfcG9zLmxlbmd0aCA8IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXdhaU51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOi/meazouayoeaciWJvc3PvvIzlubbkuJTmnIlidWZm77yM5YiZYnVmZuS7o+abv2Jvc3PkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSGF2ZUJvc3MgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEuYm9zc19wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQuYnVmZl9wb3MucHVzaChkaXNQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlQm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0genhEYXRhLmJ1ZmZfcG9zW2J1ZmZOdW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0LmJ1ZmZfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc1BvcyA9IGNjLnYyKHBvcy54LCBwb3MueSArIG1pblkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQub3RoZXJfcG9zLnB1c2goZGlzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB6eERhdGEub3RoZXJfcG9zW290aGVyTnVtXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzUG9zID0gY2MudjIocG9zLngsIHBvcy55ICsgbWluWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm90aGVyX3Bvcy5wdXNoKGRpc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJOdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlzTmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOZXh0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgbWluWSA9IHp4RGF0YS5vdGhlcl9wb3NbenhEYXRhLm90aGVyX3Bvcy5sZW5ndGggLSAxXS55ICsgNjAgLSA1MDU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0WmhlblhpbmdEYXRhQnlFbmVteURhdGEoZW5lbXlEYXRhcy5zbGljZSh6eERhdGEub3RoZXJfcG9zLmxlbmd0aCksIG91dCwgYnVmZk51bSwgbWluWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mmL7npLrlhbPljaHmlbDmja5cclxuICAgIHB1YmxpYyBsb2FkTGV2ZWwoKSB7XHJcblxyXG4gICAgICAgIGlmIChNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpICYmIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfbG9hZF9vayAmJiAoUGV0LmN1cl9sb2FkZWRfbnVtID49IFBldC5tYXhfbG9hZF9udW0pICYmIHRoaXMuZmlnaHRpbmdfaW5mbyAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApICsgMVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCB3YXZlbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB3YXZlbnVtYmVyLy8oRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19f6L+b5p2l5LqGXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckRhdGEgPSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhc1t0aGlzLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgbGV0IGlzQmFvWGlhbmdMZXZlbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgTUNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHVzZVdpZHRoID0gNjAwO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IChjYy53aW5TaXplLndpZHRoIC0gdXNlV2lkdGgpIC8gMiAtIGNjLndpblNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15X2NyZWF0ZV95ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW5lbXlfY3JlYXRlX3k9MDtcclxuICAgICAgICAgICAgbGV0IHJlZnJlc2hUaW1lID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25zdGVyRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtb25zdGVyRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtSWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZSA9IE1DTS5nZXRTdHJlbmd0aFR5cGUobUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBkYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyTGV2ZWwgPSBkYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgLy/kuIDnu4TmgKos5q+P57uE5oCq6YO95LiA6Ie055qE77yM5omA5Lul5Y+W5YW25Lit5LiA5Liq5bCx6KGM5LqGXHJcbiAgICAgICAgICAgICAgICAvL+WIhuS4gOS4i+e8nemamSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IE1DTS5nZXRNb25zdGVyU3BhY2luZyhtSWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heE51bVhYID0gTWF0aC5mbG9vcih1c2VXaWR0aCAvIHdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5XaWR0aCA9IHVzZVdpZHRoICUgbWF4TnVtWFg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSBNYXRoLmZsb29yKHJlbWFpbldpZHRoIC8gbWF4TnVtWFgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUluZGV4cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IG1heE51bVhYOyB4eCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlSW5kZXhzLnB1c2goeHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy946L205re75Yqg55qE5pWw6YeP77yM6L6+5YiwbWF4TnVtWFjlkI7vvIx5eU51bSsrXHJcbiAgICAgICAgICAgICAgICBsZXQgeHhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5TnVtID0gMDtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUaW1lICs9IGRhdGEucmVmcmVzaF90aW1lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG51bTsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG90YWxfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrmjpLliJdZWVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5eSA9IHRoaXMuZW5lbXlfY3JlYXRlX3kgKyB3aWR0aCAqIHl5TnVtICsgTWF0aC5yYW5kb20oKSAqIHdpZHRoICogMC43O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py6566X5Ye6WFhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlSW5kZXhzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYyKGxlZnQgKyB3aWR0aCAvIDIgKyB3aWR0aCAqIHVzZUluZGV4c1tyYW5kSW5kZXhdICsgTWF0aC5yYW5kb20oKSAqIDEwIC0gNSwgeXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZUluZGV4cy5zcGxpY2UocmFuZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZW5ndGhUeXBlICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlTW9uc3RlckJ5SWQobUlkLCBwb3MsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2NyZWF0ZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93SmlhblRvdVBvcyh0aGlzLmN1cl9jcmVhdGVfbnVtIC8gdGhpcy5jdXJfdG90YWxfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVmcmVzaFRpbWUgKyBNYXRoLnJhbmRvbSgpICogKDYwIC8gTUNNLmdldFNwZWVkKG1JZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeHhOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh4TnVtID4gbWF4TnVtWFgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl5TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4eE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbWF4TnVtWFg7IHh4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VJbmRleHMucHVzaCh4eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLlRvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRCb3NzKG1JZCwgbW9uc3RlckxldmVsLCBkYXRhLmhwX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQm9zcyhtSWQsIG1vbnN0ZXJMZXZlbCwgZGF0YS5ocF9yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mgKrnianmva5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKVt0aGlzLmN1cl93YXZlXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb25zdGVyV2FybmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUdXRvdGlhbHMoKTtcclxuICAgICAgICAgICAgLy/lm6DkuLrlrp3nrrHlhbPljaHmmK/mj5Lov5vljrvnmoTvvIzmiYDku6Xmg7PopoHojrflj5blh4bnoa7nmoTmlbDlgLzvvIzpnIDopoHlh4/ljrvlhbblh7rnjrDnmoTmrKHmlbBcclxuICAgICAgICAgICAgLy90aGlzLmRyb3BfZGF0YT1MZXZlbEpzb25EYXRhLmdldFdhdmVEcm9wRGF0YShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCx0aGlzLmN1cl93YXZlLXRoaXMubGV2ZWxfYnVmZl9udW0pO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2hvd0xldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgbGV0IGlzTG9hZE5leHQgPSAhaXNCYW9YaWFuZ0xldmVsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZSA+PSB0aGlzLmZpZ2h0aW5nX2luZm8ubW9uc3Rlcl9kYXRhcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xvYWROZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICAgICAgaXNMb2FkTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0xvYWROZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVseVQgPSB0aGlzLmZpZ2h0aW5nX2luZm8ud2F2ZV9yZWZyZXNoX3RpbWVbdGhpcy5jdXJfd2F2ZSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bu26L+f5Yqg6L295LiL5LiA5YWzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRXYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBkZWx5VCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmdfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkTGV2ZWxEYXRhcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE5leHRXYXZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YXZlIDwgdGhpcy5maWdodGluZ19pbmZvLm1vbnN0ZXJfZGF0YXMubGVuZ3RoIC0gMSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhdmUrKztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPljaHlop7liqDliLBcIiArIHRoaXMuY3VyX3dhdmUgKyBcIiBcIiArIHRoaXMuZ2V0SXNSb2d1ZUxpa2VXYXZlKCkgKyBcIiBcIiArIHRoaXMuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2V0Um9ndWVUZXh0KHRoaXMuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRJc1JvZ3VlTGlrZVdhdmUoKSAmJiB0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S65o+Q56S6VElwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JvZ3VlbGlrZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluaYr+WQpuaYr1JvdWd1ZeWFs+WNoVxyXG4gICAgcHJpdmF0ZSBnZXRJc1JvZ3VlTGlrZVdhdmUoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnJvZ3VlbGlrZVdhdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPT0gKHRoaXMucm9ndWVsaWtlV2F2ZVtpXSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blvZPliY3lhbPljaHot53nprvkuIvkuIDkuKpyb2d1ZeWFs+WNoeaVsOWtl1xyXG4gICAgcHVibGljIGdldFJvZ3VlTGlrZU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnJvZ3VlbGlrZVdhdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPCAodGhpcy5yb2d1ZWxpa2VXYXZlW2ldICsgMSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb2d1ZWxpa2VXYXZlW2ldO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb2d1ZWxpa2VXYXZlW2ldICsgMSAtIHRoaXMuY3VyX3dhdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMztcclxuXHJcbiAgICB9XHJcbiAgICByZWxvYWRMZXZlbERhdGFzKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LuA5LmI5pe25YCZ6L+b5p2lXCIpXHJcbiAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gbmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdodGluZ19pbmZvID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0aW5nX2luZm8gPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9jaGFsbGVuZ2VfbW9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRpbmdfaW5mbyA9IFRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGFkZENoZWNrVHV0b3RpYWxzSGVybyhoZXJvSWQ6IEhlcm9fVHlwZSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvOiBIZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZSA9IGhlcm9JZDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gMTAwO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fc3RhZ2UgPSA1O1xyXG4gICAgICAgIGxldCBkYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUcnlQbGF5SGVyb0RhdGEoaGVyb0luZm8pXHJcbiAgICAgICAgdGhpcy5nYW1lX2hlcm9fZGF0YS5zZXQoaGVyb0lkLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZEhlcm8oaGVyb0lkLCA0LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkSGVybyhoZXJvSWQ6IEhlcm9fVHlwZSwgdGVhbUluZGV4OiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRyeVBsYXlIZXJvRGF0YShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9JZCkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgdGVhbUluZGV4LCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmVmcmVzaE1haW5XYWxsRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blm6DkuLrmioDog73nrYnnuqflj5jljJbnmoTooYDph4/mr5TnjodcclxuICAgIHB1YmxpYyBnZXRDaGFyaW9IZWFsdGhSYXRpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVsxXSAqIDAuNCArIDE7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWboOS4uuaKgOiDveetiee6p+WPmOWMlueahOmYsuW+oeavlOeOh1xyXG4gICAgcHVibGljIGdldENoYXJpb0RlZmVuc2VSb3RpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVszXSAqIDAuMyArIDE7XHJcbiAgICB9XHJcbiAgICAvL+aUu+WHu+WKm+avlOeOh1xyXG4gICAgcHVibGljIGdldENoYXJpb0F0dGFja1JvdGlvKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmlvVXBncmFkYXRpb25EYXRhWzBdICogMC4yO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS75Ye76YCf5bqm5q+U546HXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcmlvU3BlZWRSb3RpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVsyXSAqIDAuMTtcclxuICAgIH1cclxuICAgIC8v5Ya35Y2057yp5YePXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcmlvQ29sZERvd25Sb3RpbygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVs0XSAqIDAuNTtcclxuICAgIH1cclxuICAgIC8qKua3u+WKoOS4gOS4qua7oee6p+a7oeijhea7oeWuoOeJqeeahOiLsembhCAqL1xyXG4gICAgYWRkVHV0b3RpYWxzSGVyb0Z1bGwoaGVyb0lkOiBIZXJvX1R5cGUsIHRlYW1JbmRleDogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24pOiBIZXJvRGF0YSB7XHJcbiAgICAgICAgbGV0IGhlcm9JbmZvOiBIZXJvSW5mbyA9IG5ldyBIZXJvSW5mbygpO1xyXG4gICAgICAgIGhlcm9JbmZvLmhlcm9fdHlwZSA9IGhlcm9JZDtcclxuICAgICAgICBoZXJvSW5mby5oZXJvX2xldmVsID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKGhlcm9JZCk7XHJcbiAgICAgICAgaGVyb0luZm8uaGVyb19zdGFnZSA9IDEvL0hlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZShoZXJvSWQpOyAgIFxyXG4gICAgICAgIGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSA9IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4U3RhZ2UoaGVyb0lkKTtcclxuICAgICAgICBsZXQgZXF1aXBNYXhTdGFnZSA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSgpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXIxID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCgxLCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBoZXJvSW5mby53ZWFyMiA9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoMiwgZXF1aXBNYXhTdGFnZSk7XHJcbiAgICAgICAgaGVyb0luZm8ud2VhcjMgPSBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKDMsIGVxdWlwTWF4U3RhZ2UpO1xyXG4gICAgICAgIGhlcm9JbmZvLndlYXI0ID0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCg0LCBlcXVpcE1heFN0YWdlKTtcclxuICAgICAgICBzd2l0Y2ggKGhlcm9JZCkge1xyXG4gICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwNDEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMjEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOiB7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXRfaWQgPSA3MDIxMztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMToge1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0X2lkID0gNzAxMTM7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6IHtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldF9pZCA9IDcwMzEzO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHJ5UGxheUhlcm9EYXRhKGhlcm9JbmZvKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9oZXJvX2RhdGEuc2V0KGhlcm9JZCwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWRIZXJvKGhlcm9JZCwgdGVhbUluZGV4LCBjYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tUdXRvdGlhbHMoKSB7XHJcbiAgICAgICAgaWYgKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2FtZVJhdGUoMSAvIEppYVN1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlYzkurrmrbvkuqHkuoYs5ZOq5Liq5pWM5Lq65q275Lqh5LqG77yM5ZOq5Liq6Iux6ZuE5Ye75p2A55qEXHJcbiAgICBvbkVuZW15RGllKHNjb3JlOiBudW1iZXIsIGlzQWRkOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGlzQWRkKSB7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtID49IHRoaXMuY3VyX3RvdGFsX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaVjOS6uuatu+S6oeWKoOi9veS4i+S4gOWFs1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtID49IHRoaXMuY3VyX3RvdGFsX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaVjOS6uuatu+S6oeWKoOi9veS4i+S4gOWFszJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkTmV4dFdhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlKz1lbmVteVRzLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuZ2FtZS5zaG93TGV2ZWxQcm9ncmVzcygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlnaHRDZW50ZXIoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKDAsICg3MDAgKyB0aGlzLmVuZW15X29mZnNldF95IC0gdGhpcy5lbmVteV9hdHRfeSkgLyAyICsgdGhpcy5lbmVteV9hdHRfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxDYW5jZWwoaXNTaG93OiBib29sZWFuKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4aXRQbGF5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmxvYWRfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZF9qaXNodSA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5hbGxfaGVybyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja1RvSG9tZShzaG93SGVybz86IEhlcm9fVHlwZSkge1xyXG4gICAgICAgIHRoaXMucm9sZV9zaG93X2hlcm8gPSBzaG93SGVybyA/IHNob3dIZXJvIDogSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX190eXBlMVwiLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lKVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSwgKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8v55yf5a6e6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1RydWUgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlID0gcHJvZ3Jlc3NUcnVlIC8gMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmcgPSAobG9hZGluZ0Jhci5wcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICAgICAgdGhpcy5jdXJfbG9hZF9wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RhbmdlclRleHQoKSB7XHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndWkvZ2FtZS9kYW5nZXJUZXh0JywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhbmdlclRleHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19VaScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYW5nZXJUZXh0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvd1JvZ3VlbGlrZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9Sb2d1ZWxpa2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1JvZ3VlbGlrZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dSb2d1ZWxpa2VUaXAoKTtcclxuICAgIH1cclxuICAgIHNob3dHYW1lUGF1c2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGF1c2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVBhdXNlVWkoKTtcclxuICAgIH1cclxuICAgIHNob3dCdG5CdWZmKHR5cGUpLy8wOkJ1ZmblsZXnpLogICAx77yaQnVmZumAieaLqVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJ1ZmZEaXNwbGF5LCBVSUxheWVyTGV2ZWwuVHdvLCB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZEaXNwbGF5KS5pbml0VWkodHlwZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNob3dHYW1lV2luKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5omT5a6M5LiA5Zue5ZCI5LqGXCIpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfV2luIHx8IHRoaXMuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfTG9zZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVzaWNfbWFuYWdlci5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9XaW47XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIE1hdGguZmxvb3IodGhpcy5nYW1lLnRyeV9yYXRlX3JhbWFpbikpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X2F1dG9fcmFtYWluKSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyU3RhcnRMZXZlbCA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsO1xyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDnrKxO56ug546p5a625pWwICsgTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoY3VyU3RhcnRMZXZlbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDmjJHmiJjlhbPljaEgKyBjdXJTdGFydExldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPSBjdXJTdGFydExldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2FtZVdpbikuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDEgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMDQsKCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvL+W8gOWni+ato+W8j+WFs+WNoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIFRvd2VyTWFuYWdlci5hZGRUb3dlckxldmVsKDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIC8v5pi+56S65LiJ6YCJ5LiAXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK1wiKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDEpOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR2FtZVdpbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHYW1lV2luKS5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8v54aK5raI5aSxXHJcbiAgICAgICAgbGV0IHNob3d3YW5nID0gdGhpcy5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICBpZiAoc2hvd3dhbmcpIHtcclxuICAgICAgICAgICAgc2hvd3dhbmcub25HYW1lV2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dTZWxlY3RTa2lsbChkZWxheVRpbWU6IG51bWJlciA9IDEpIHtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgLy/lu7bov5/lsZXnpLpcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3VpL2dhbWUvc2VsZWN0X3NraWxsJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmdWkgPSBjYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1aS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSwgeyB5OiAtMTQwMCB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZGVsYXlUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb2NrU2tpbGwoeWVzQ2FsbGJhY2s6IEZ1bmN0aW9uLCBub0NhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCd1aS9nYW1lL3VubG9ja191aScsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFVubG9ja1NraWxsKS5pbml0KHllc0NhbGxiYWNrLCBub0NhbGxiYWNrKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVha0xldmVsU2tpbGwoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAvLyAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1vZGUuTWFpbik7XHJcbiAgICAvLyAgICAgbGV0IGlzQ2FuU2hvdz1mYWxzZTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTw1OyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBsZXQgaGVybzpIZXJvPW51bGw7XHJcbiAgICAvLyAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpXTtcclxuICAgIC8vICAgICAgICAgaWYoaGVyb1R5cGU+PTApXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGhlcm89R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyb1toZXJvVHlwZV07ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgaWYoaGVyby5sZXZlbF9idWZmLmxlbmd0aDx0aGlzLm1heF9za2lsbF9zbG90KVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlzQ2FuU2hvdz10cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmKGlzQ2FuU2hvdz09ZmFsc2UpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZih0aGlzLm1heF9za2lsbF9zbG90PT0xKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+ivtOaYjuacquinhumikeino+mUgVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93VW5sb2NrU2tpbGwoKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBBZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKGlzU3VjKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1heF9za2lsbF9zbG90PTI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RTa2lsbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAvL+ebtOaOpeW8gOWni+S4i+S4gOazouaAqlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdWk9Y2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZnVpLmNoaWxkcmVuQ291bnQ7IGkrKylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmdWkuY2hpbGRyZW5baV0pLmJ5KDAuNSx7eToxNDAwfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9LFZJREVPX1RZUEUuSHVvZG9uZyk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vkuIvkuIDms6LmgKpcclxuICAgIC8vICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTGV2ZWwoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgZnVpPWNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZnVpLmNoaWxkcmVuW2ldKS5ieSgwLjUse3k6MTQwMH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+ebtOaOpeaPkOekuuaKgOiDvea7oeS6hu+8jOi3s+i/h+W8ueeql1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Ta2lsbF9pc19mdWxsKSk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGZ1aT1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWkuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZ1aS5jaGlsZHJlbltpXSkuYnkoMC41LHt5OjE0MDB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1lbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNob3dTZWxlY3RTa2lsbCgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBvbkZ1aHVvKCkge1xyXG4gICAgICAgIHRoaXMuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nOztcclxuXHJcbiAgICAgICAgbGV0IGRhbmdlclRleHQgPSBjYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWkvZGFuZ2VyVGV4dCcpO1xyXG4gICAgICAgIGlmIChkYW5nZXJUZXh0KSB7XHJcbiAgICAgICAgICAgIGRhbmdlclRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dGdWh1bygpIHtcclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFJhdGUoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndWkvZ2FtZS9mdWh1b191aScsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnVodW9fbnVtLS07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dhbWVMb3NlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5aSx6LSlXCIsKVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX0xvc2UgfHwgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9XaW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfTG9zZTtcclxuICAgICAgICB0aGlzLnJlc2V0UmF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgTWF0aC5mbG9vcih0aGlzLmdhbWUudHJ5X3JhdGVfcmFtYWluKSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLCBNYXRoLmZsb29yKHRoaXMuZ2FtZS50cnlfYXV0b19yYW1haW4pKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcblxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgICAgICAgICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlTGV2ZWxXYXZlKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLHRoaXMuY3VyX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZVVpKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVMZXZlbFdhdmUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwsdGhpcy5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5peg5bC95oyR5oiY6IOc5YipXCIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdhbWVXaW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdhbWVXaW4pLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQm9zc+aMkeaImOiDnOWIqVwiKVxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HYW1lV2luLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHYW1lV2luKS5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbldhbGxEaWUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLmZ1aHVvX251bT4wKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNob3dGdWh1bygpO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgLy8gfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vbnN0ZXJXYXJuaW5nKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9FbmVteUNvbWluZyk7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC51aV9tb25zdGVyX3dhcm5pbmcsIGNjLnYyKDAsIDApLCBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlKTtcclxuICAgICAgICBub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjI1LCB7IG9wYWNpdHk6IDI1NSB9KS50bygwLjUsIHsgb3BhY2l0eTogMTAwIH0pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkudG8oMC41LCB7IG9wYWNpdHk6IDEwMCB9KS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnRvKDAuMjUsIHsgb3BhY2l0eTogMCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC51aV9tb25zdGVyX3dhcm5pbmcsIG5vZGUpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Jvc3NXYXJuaW5nKCkge1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3VpL2dhbWUvYm9zc193YXJuaW5nJywgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGNodXhpYW5BY3QgPSAwLjM7XHJcbiAgICAgICAgICAgIGxldCB4aWFvc2hpQWN0ID0gMC4xNTtcclxuICAgICAgICAgICAgbGV0IHRpbmdsaXVBY3QgPSAyO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgbGV0IGF1dG8gPSBub2RlLmdldENoaWxkQnlOYW1lKCdhdXRvJyk7XHJcbiAgICAgICAgICAgIGF1dG8ueCA9IC0zMjA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGF1dG8pLnRvKGNodXhpYW5BY3QsIHsgeDogMzIwIH0pLnRvKDIsIHsgeDogMTA4MCB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhcm5pbmdMYWJlbCcpO1xyXG4gICAgICAgICAgICB3YXJuaW5nTGFiZWwueCA9IDY0MDtcclxuICAgICAgICAgICAgY2MudHdlZW4od2FybmluZ0xhYmVsKS50byhjaHV4aWFuQWN0LCB7IHg6IDAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oeGlhb3NoaUFjdCwgeyB4OiAtNjQwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGxldCBib3NzTGFiZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKCdib3NzTGFiZWwnKTtcclxuICAgICAgICAgICAgYm9zc0xhYmVsLnggPSAtNjQwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihib3NzTGFiZWwpLnRvKGNodXhpYW5BY3QsIHsgeDogMCB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjEgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4wIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMSB9KS50bygwLjI1LCB7IHNjYWxlOiAxLjAgfSkudG8oMC4yNSwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMjUsIHsgc2NhbGU6IDEuMCB9KS50byh4aWFvc2hpQWN0LCB7IHg6IDY0MCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0cyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VmZmVjdHMnKTtcclxuICAgICAgICAgICAgZWZmZWN0cy5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2MudHdlZW4oZWZmZWN0cykuZGVsYXkoY2h1eGlhbkFjdCArIDAuMikuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkuZGVsYXkodGluZ2xpdUFjdCAtIGNodXhpYW5BY3QgLSAwLjIpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5kZWxheSh0aW5nbGl1QWN0KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMix7eToyMDB9KS5kZWxheSgwLjUpLnRvKDAuMix7c2NhbGU6MS4yfSkudG8oMC4yLHtzY2FsZTowLjh9KS50bygwLjEse3NjYWxlOjMyLG9wYWNpdHk6MH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm11c2ljX21hbmFnZXIuc2F2ZU11c2ljVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY19tYW5hZ2VyLnNhdmVNdXNpY011dGUoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIuc2F2ZVNvdW5kVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9tYW5hZ2VyLnNhdmVTb3VuZE11dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U3BlZWRVcFVpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5nYW1lKSB7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3VpL2dhbWUvc3BlZWRfdWknLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUhPTUUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICByZWZyZXNoQ29pblNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR2VtU2hvdygpOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaExvbmdKaW5nU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hMb25nSmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVc2VyRXhwU2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9tZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKTtcclxuICAgICAgICAgICAgaWYgKGhvbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBob21lLnJlZnJlc2hVc2VyRXhwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAganVtb1RvVWkoaW5kZXg6IEJ0bl9JbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSkuanVtb1RvVWkoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bW9BbmRTaG93VWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGhvbWUuY2hlYWtVbmxvY2soKTtcclxuICAgICAgICAgICAgaG9tZS5zaG93VWkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFpoYW5saVNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2dhbWVfc2NlbmUgPT0gR2FtZVNjZW5lLmhvbWUpIHtcclxuICAgICAgICAgICAgbGV0IGhvbWUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSk7XHJcbiAgICAgICAgICAgIGlmIChob21lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9tZS5yZWZyZXNoWmhhbkxpU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUb3BTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9nYW1lX3NjZW5lID09IEdhbWVTY2VuZS5ob21lKSB7XHJcbiAgICAgICAgICAgIGxldCBob21lID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KEhvbWUpO1xyXG4gICAgICAgICAgICBpZiAoaG9tZSkge1xyXG4gICAgICAgICAgICAgICAgaG9tZS5yZWZyZXNoVG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEd1YUppR2lmdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJfZ2FtZV9zY2VuZSA9PSBHYW1lU2NlbmUuaG9tZSkge1xyXG4gICAgICAgICAgICBsZXQgYnRuT2ZmbGluZUdpZnQgPSBjYy5maW5kKCdDYW52YXMvbWFpbl91aS9idG5PZmZsaW5lR2lmdCcpO1xyXG4gICAgICAgICAgICBidG5PZmZsaW5lR2lmdC5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyByZWZyZXNoUm9sZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYodGhpcy5jdXJfZ2FtZV9zY2VuZSE9R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCByb2xlVWk9Y2MuZmluZCgnQ2FudmFzL3JvbGVfdWknKTtcclxuICAgIC8vICAgICBpZihyb2xlVWkuYWN0aXZlPT10cnVlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcm9sZVVpLmdldENvbXBvbmVudChSb2xlVWkpLm9uRW5hYmxlKCk7XHJcbiAgICAvLyAgICAgfSAgICAgICAgXHJcbiAgICAvLyB9ICAgIFxyXG5cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwZXRJZCDlrqDnialpZFxyXG4gICAgICogQHBhcmFtIG51bSDlop7liqDnmoTmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm93TnVtID0gdGhpcy5nZXRQZXRBY3RpdmVEcHMocGV0SWQpO1xyXG4gICAgICAgIGxldCBuZXdOdW0gPSBub3dOdW0gKyBudW07XHJcbiAgICAgICAgdGhpcy5zZXRQZXRBY3RpdmVEcHMocGV0SWQsIG5ld051bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nmoRkcHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0X2FjdGl2ZV9kcHMuZ2V0KHBldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBldEFjdGl2ZURwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBldF9hY3RpdmVfZHBzLnNldChwZXRJZCwgbnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gbnVtIOWinuWKoOeahOaVsOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkUGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbywgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm93TnVtID0gdGhpcy5nZXRQZXRDb25uZWN0RHBzKHBldElkKTtcclxuICAgICAgICBsZXQgbmV3TnVtID0gbm93TnVtICsgbnVtO1xyXG4gICAgICAgIHRoaXMuc2V0UGV0Q29ubmVjdERwcyhwZXRJZCwgbmV3TnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGV0SWQg5a6g54mpaWRcclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeeahGRwc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0Q29ubmVjdERwcyhwZXRJZDogUGV0SW5mbyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0X2Nvbm5lY3RfZHBzLmdldChwZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQZXRDb25uZWN0RHBzKHBldElkOiBQZXRJbmZvLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGV0X2Nvbm5lY3RfZHBzLnNldChwZXRJZCwgbnVtKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19