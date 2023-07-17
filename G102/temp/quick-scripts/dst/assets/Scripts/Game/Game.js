
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37373GfXV9Ibq0DJHXKFoBS', 'Game');
// Scripts/Game/Game.ts

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
var BossChallenge_1 = require("../Activity/BossChallenge");
var BossGameUi_1 = require("../Activity/BossGameUi");
var EndlessLevels_1 = require("../Activity/EndlessLevels");
var Constants_1 = require("../Constants");
var BuffDisplay_1 = require("../copy/endlesschallenges/BuffDisplay");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var Hero_1 = require("../Hero/Game/Hero");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var DingYueManager_1 = require("../Payment/DingYueManager");
var Pet_1 = require("../Pet/Game/Pet");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var TaskEnum_1 = require("../Task/TaskEnum");
var TaskManager_1 = require("../Task/TaskManager");
var MyTool_1 = require("../Tools/MyTool");
var TowerManager_1 = require("../Tower/TowerManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var WallManager_1 = require("../Wall/WallManager");
var WeekCardUi_1 = require("../WeekCard/WeekCardUi");
var BuffStateManager_1 = require("./BuffStateManager");
var GameEffectsManager_1 = require("./GameEffectsManager");
var BuyBattlePotion_1 = require("./Ui/BuyBattlePotion");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_rate = [];
        _this.sp_auto = [];
        _this.sp_wave = [];
        _this.prefab_normal_wave = null;
        _this.prefab_boss_wave = null;
        _this.prefab_jiange = null;
        /**当前波数节点 */
        _this.cur_wave_node = null;
        _this.cur_wave_sp = null;
        _this.wave_pos_x = [];
        _this.left_xx = 0;
        _this.dist_xx = 0;
        _this.one_width = 0;
        // @property(cc.JsonAsset)
        // zhen_xing:cc.JsonAsset=null;
        /**是否解锁了速率 */
        _this.is_unlock_rate = true;
        _this.try_rate_ramain = 60 * 10;
        _this.is_try_rate = false;
        /**是否解锁了自动战斗 */
        _this.is_unlock_auto = true;
        _this.try_auto_ramain = 60 * 10;
        _this.is_try_auto = false;
        /**试用文本 */
        _this.try_auto_label = null;
        /**试用文本 */
        _this.try_rate_label = null;
        //测试
        _this.start_time = 0;
        _this.time_jishu = 0;
        _this.time_label = null;
        _this.bg0 = null;
        _this.bg1 = null;
        _this.dps_label = null;
        //关卡进度条
        _this.level_progress = null;
        _this.level_label = null;
        _this.coin_label = null;
        _this.total_coin = 0;
        _this.endless_ts = null;
        //当前背景使用的名称
        _this.cur_bg_name = 'bg2';
        _this.bgSpeed = 50;
        //战斗药水
        _this.battlepotion = []; //红色   绿色   蓝色
        _this.battlepotionPropId = [PropConfig_1.PropId.RedPotion, PropConfig_1.PropId.GreenPotion, PropConfig_1.PropId.BluePotion]; //战斗药水的道具id
        _this.battlepotionstate = [1, 1, 1]; //战斗药水在这一局是否使用了  默认每一个药水有一次使用的机会
        return _this;
    }
    Game.prototype.onLoad = function () {
        cc.director.getCollisionManager().enabled = true;
        GameData_1.default.getInstance();
        GameManager_1.default.getInstance().init(Constants_1.GameScene.game);
        GameManager_1.default.getInstance().game = this;
        this.adaptation();
        //cc.director.resume();
        //cc.director.getCollisionManager().enabledDebugDraw=true;
        this.setBgImg();
        if (TutorailsManager_1.default.getInstance().is_finish_game) {
            this.loadHeros();
        }
        else {
            GameManager_1.default.getInstance().loadTutorailsHeroData();
        }
        if (DingYueManager_1.DingYueManager.getInstance().getWeekInfo()) {
            this.is_unlock_auto = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
        }
        if (DingYueManager_1.DingYueManager.getInstance().getWeekInfo()) {
            this.is_unlock_rate = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
        }
        if (!this.is_unlock_rate) {
            GameManager_1.default.getInstance().setBtnSetupRate(1, false);
        }
        if (!this.is_unlock_auto) {
            GameManager_1.default.getInstance().setAutoFighting(false, false);
        }
        this.try_auto_ramain = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.try_auto_fight_remain, 60 * 10);
        this.try_rate_ramain = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.try_rate_fight_remain, 60 * 10);
        this.setTryAutoLabel();
        this.setTryRateLabel();
        GameManager_1.default.getInstance().setGameRate(1);
    };
    Game.prototype.start = function () {
        this.showLoading();
        //this.startTest();
        GameManager_1.default.getInstance().music_manager.playMusic(AudioConstants_1.MusicIndex.BGM_Battle);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.Null, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.ui_monster_warning, 1);
        this.setBtnAuto();
        this.setBtnRateShow();
        this.initLevelShow();
        if (TutorailsManager_1.default.getInstance().is_finish_game == false) {
            UIManager_1.UIManager.getInstance().preloadUiByPath(UIConfig_1.UIPath.RewardSSUI);
            UIManager_1.UIManager.getInstance().preloadUiByPath(UIConfig_1.UIPath.StoreHeroShowUi);
        }
    };
    Game.prototype.testCamera = function () {
        // 创建渲染纹理，并设置纹理大小同显示屏(showSprite)大小一样
        var texture = new cc.RenderTexture();
        texture.initWithSize(300, 240);
        cc.find('Canvas/TestCamera').getComponent(cc.Camera).targetTexture = texture;
        var showSprite = cc.find('Canvas/Test/showRoot/showSprite');
        showSprite.getComponent(cc.Sprite).spriteFrame.setTexture(texture);
    };
    Game.prototype.adaptation = function () {
        //上下模块
        var topUi = cc.find('Canvas/Ui_Root/top_ui');
        var wp = cc.winSize;
        topUi.y = wp.height / 2;
        //
        this.time_label = topUi.getChildByName('timeLabel').getComponent(cc.Label);
        this.level_progress = topUi.getChildByName('levelProgressBar').getComponent(cc.ProgressBar);
        this.level_progress.progress = 0;
        this.level_label = topUi.getChildByName('levelLabel').getComponent(cc.Label);
        this.coin_label = topUi.getChildByName('iconBg').getChildByName('coinLabel').getComponent(cc.Label);
        this.dps_label = topUi.getChildByName('dpsLabel').getComponent(cc.Label);
        //城墙
        var wallBg = this.node.getChildByName('wall_bg');
        wallBg.y = -(cc.winSize.height / 2) + wallBg.height / 2;
        //hp
        var hp = cc.find('Canvas/Ui_Root/hp_root');
        hp.y = -wp.height / 2 + hp.height - 27; //27是血条的坐标
        this.bg0 = this.node.getChildByName('bg0');
        this.bg1 = this.node.getChildByName('bg1');
        this.bg0.y = cc.winSize.height / 2 - this.bg0.height / 2;
        this.bg1.y = this.bg0.y + this.bg0.height;
        //上碰撞点
        //cc.find('Canvas/wall_root/wall_top').y=topUi.y;
    };
    Game.prototype.showLoading = function () {
        var _this = this;
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        var loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        loadingBar.progress = GameManager_1.default.getInstance().cur_load_progress;
        var loadingSchedule = function () {
            loadingBar.progress += 0.005;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            if (loadingBar.progress >= 1) {
                loadingBar.progress = 1;
                _this.unschedule(loadingSchedule);
                loadingSchedule = null;
                _this.checkStartGame();
            }
        };
        this.schedule(loadingSchedule, 0.02);
    };
    Game.prototype.checkStartGame = function () {
        var _this = this;
        if (Hero_1.default.cur_loaded_num >= Hero_1.default.max_load_num) {
            var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
            bgLoading.active = false;
            this.startGame();
            if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.开始无尽挑战次数);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战X次无尽挑战);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战1次无尽挑战);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战3次无尽挑战);
                var num 
                // let totalnum
                // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
                = void 0;
                // let totalnum
                // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
                num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
                num--;
                // totalnum++
                // TheStorageManager.getInstance().setItem(StorageKey.TotalUnlimitedChallengeTimes,totalnum);
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, num);
                var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0);
                var Round = EndlessLevels_1.EndlessLevelsManager.getInstance().getRound(wavenumber); //回合数
                if (Round - 1 > 0) {
                    BuffDisplay_1.default.surplusnumber = (Round - 2);
                    GameManager_1.default.getInstance().showBtnBuff(1); //Buff选择弹窗
                }
                else {
                    BuffDisplay_1.default.surplusnumber = -1;
                }
                //console.log("buff:",BuffDisplay.surplusnumber,Round)
            }
        }
        else {
            this.scheduleOnce(function () {
                _this.checkStartGame();
            }, 0.2);
        }
    };
    Game.prototype.loadHeros = function () {
        //获取队列
        Hero_1.default.max_load_num = 0;
        Hero_1.default.cur_loaded_num = 0;
        Pet_1.default.max_load_num = 0;
        Pet_1.default.cur_loaded_num = 0;
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        for (var i = 0; i < teamList.length; i++) {
            var heroType = teamList[i];
            if (heroType > 0) {
                this.loadHero(heroType, i);
            }
        }
        // let heroRoot=cc.find('Canvas/Hero_Root');
        // for(let i=0; i<heroRoot.childrenCount; i++){
        //     let hero=heroRoot.children[i].getComponent(Hero);
        // }
        //预加载弓手Hero_Root
        // if (TutorailsManager.getInstance().is_finish_game == false && LevelManager.getInstance().start_level == 5) {
        //     cc.resources.load('heros/hero8');
        // }
    };
    Game.prototype.loadHero = function (heroType, posIndex, callback) {
        Hero_1.default.max_load_num++;
        var posX = 2 * 144 - 288;
        var posY = (4 - posIndex) * 70;
        cc.resources.load('heros/hero' + heroType, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Hero_Root');
            node.x = posX;
            var hp = cc.find('Canvas/Ui_Root/hp_root');
            node.y = hp.y + posY;
            node.setSiblingIndex(posIndex);
            node.getComponent(Hero_1.default).leaterNum = posIndex;
            BuffStateManager_1.default.getInstance().createBuffRoot(cc.v2(posX, node.y + 150), heroType);
            if (callback) {
                callback();
            }
        });
    };
    Game.prototype.showKaiZhan = function () {
        var kaiZhan = cc.find('Canvas/Ui_Root/KaiZhan');
        kaiZhan.active = true;
        var spine = kaiZhan.getChildByName('KaiZhan').getComponent(sp.Skeleton);
        var anima = spine.setAnimation(0, 'KaiZhan', false); //YX_Kaizhan
        spine.setTrackEventListener(anima, function (entry, event) {
            if (event.data.name == 'Attack') {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Kaizhan);
            }
        });
        spine.setCompleteListener(function () {
            spine.setCompleteListener(null);
            kaiZhan.active = false;
        });
    };
    Game.prototype.StatusBattlePotion = function () {
        //刷新战斗药水的状态
        for (var battlepotionindex = 0; battlepotionindex < this.battlepotion.length; battlepotionindex++) {
            //数量
            var battlepotionnumber = PropManager_1.PropManager.getInstance().getPropNum(this.battlepotionPropId[battlepotionindex]);
            //数量改变
            this.battlepotion[battlepotionindex].getChildByName("Redtxt").getComponent(cc.Label).string = "x" + battlepotionnumber;
            this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = false;
            if (battlepotionnumber == 0) { //数量为0变灰
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            else { //数量大于0变亮
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            }
            //这一局是否用了一次
            var whetheruse = this.battlepotionstate[battlepotionindex];
            if (whetheruse == 0) { //数量为0变灰
                this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = true;
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            else { //数量大于0变亮
                this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = false;
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            }
        }
    };
    Game.prototype.startGame = function () {
        var _this = this;
        // console.log("++++++++")
        this.StatusBattlePotion();
        var gm = GameManager_1.default.getInstance();
        gm.cur_game_state = Constants_1.GameState.Game_Playing;
        this.showCoin();
        this.showKaiZhan();
        this.setBtnRateShow();
        this.setBtnAuto();
        var top = cc.find("Canvas/Ui_Root/top_ui");
        //let coinBg=cc.find('Canvas/Ui_Root/top_ui/iconBg');
        switch (gm.cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    //coinBg.active=false;
                    top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                    this.total_coin = MissionLevel_1.MissionLevelManager.getInstance().getPassReward_Coin(LevelManager_1.LevelManager.getInstance().start_level);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.开始第N章玩家数 + MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().start_level));
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.开始挑战关卡 + LevelManager_1.LevelManager.getInstance().start_level);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战1次关卡);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战3次关卡);
                    top.getChildByName("levelLabeltxt").getComponent(TextLanguage_1.default).setTextId(140017);
                    top.getChildByName("Boss").active = false;
                    this.scheduleOnce(function () {
                        _this.checkTutorails();
                    }, 0.5);
                    top.getChildByName("Endless_Btn_Buff").active = false;
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    // top.getChildByName("bg").active=false;
                    // top.getChildByName("levelProgressBar").active=false;
                    // top.getChildByName("curLabel").active=false;
                    // top.getChildByName("levelLabel").active=false;  
                    //coinBg.active=false;
                    GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, 2);
                    top.getChildByName("levelLabeltxt").getComponent(TextLanguage_1.default).setTextId(800018); //800018
                    top.getChildByName("Endless_Btn_Buff").active = true;
                    top.getChildByName("Boss").active = false;
                    //波数//GameManager.getInstance().fighting_info.title_name;
                    var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0);
                    top.getChildByName('curLabel').getComponent(cc.Label).string = "" + wavenumber;
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.开始BOSS挑战次数);
                    // this.scheduleOnce(function(){
                    //     let node=UIManager.getInstance().getNodeById(UIPath.CoinPop)
                    //     node.getComponent(CoinPop).initUi(PropId.Gem)
                    //     this.scheduleOnce(function(){
                    //         UIManager.getInstance().destroyNode(UIPath.CoinPop,node)
                    //     },0.5)
                    // },0.5)
                    // cc.resources.load("ui/game/endless_game_ui", cc.Prefab, (error: Error, assets: cc.Prefab) => {
                    //     if (error) {
                    //         console.log(error);
                    //         return;
                    //     }
                    //     let node = cc.instantiate(assets);
                    //     top.getChildByName('BossHpRoot').addChild(node);
                    //     this.endless_ts = node.getComponent(EndlessgGameUi);
                    //     this.endless_ts.refreshData();
                    // });
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战X次boss狩猎);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战1次BOSS狩猎);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战3次BOSS狩猎);
                    // top.getChildByName("bg").active=false;
                    // top.getChildByName("levelProgressBar").active=false;
                    // top.getChildByName("curLabel").active=false; 
                    // top.getChildByName("levelLabel").active=false;
                    //coinBg.active=false;
                    var num 
                    // let totalnum
                    // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
                    = void 0;
                    // let totalnum
                    // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
                    num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
                    num--;
                    // totalnum++
                    // TheStorageManager.getInstance().setItem(StorageKey.TotalBossChallengeTimes,totalnum);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, num);
                    this.level_label.string = '0/1';
                    top.getChildByName("Boss").active = true;
                    top.getChildByName("Endless_Btn_Buff").active = false;
                    cc.resources.load("ui/game/boss_game_ui", cc.Prefab, function (error, assets) {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        var node = cc.instantiate(assets);
                        top.getChildByName('BossHpRoot').addChild(node);
                        BossChallenge_1.BossChallengeManager.getInstance().boss_challenge_ts = node.getComponent(BossGameUi_1.default);
                        BossChallenge_1.BossChallengeManager.getInstance().boss_challenge_ts.refreshData();
                    });
                    this.time_label.node.color = cc.Color.WHITE;
                    cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").color = cc.Color.WHITE;
                    //top.getChildByName('iconTime').color=cc.Color.RED;
                    this.showRemainTime();
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战1次爬塔);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战3次爬塔);
                    //coinBg.active=false;
                    TowerManager_1.default.is_show_tower = false;
                    top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.挑战1次冰河探险);
                    TowerManager_1.default.is_show_tower = false;
                    top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                    top.getChildByName("levelLabeltxt").getComponent(TextLanguage_1.default).setTextId(140017);
                    top.getChildByName("Boss").active = false;
                    top.getChildByName("Endless_Btn_Buff").active = false;
                }
                break;
        }
        PropManager_1.PropManager.getInstance().saveAllPropNum(true);
    };
    Game.prototype.clickBtnBuff = function () {
        //console.log("+++++++Buff展示弹窗")
        // GameManager.getInstance().showBtnBuff(0);//Buff展示弹窗
        GameManager_1.default.getInstance().showBtnBuff(0); //Buff选择弹窗
        if (Constants_1.IsDebug) {
            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                console.log(k + ",主动技能冷却时间:" + v.skill_total_time + ",攻速:" + 1 / v.hero_data.gongji_jiange + "增伤：" + v.hero_data.all_increase_damage, v.hero_data);
            });
            console.log(WallManager_1.default.getInstance().getMainWall().getAttributeData());
        }
    };
    Game.prototype.setBgImg = function () {
        var _this = this;
        ///let level=LevelManager.getInstance().start_level;
        // let bg0 = this.node.getChildByName('bg0');
        var wallBg = this.node.getChildByName('wall_bg');
        var wallDown = wallBg.getChildByName('wall_down');
        //适配坐标
        // let hp=cc.find('Canvas/Ui_Root/wall_root');
        // wallBg.y=hp.y+108;
        GameManager_1.default.getInstance().enemy_att_y = wallBg.y + wallDown.y + wallDown.height / 2;
        this.bg0.y = cc.winSize.height / 2 - this.bg0.height / 2;
        this.bg1.y = this.bg0.y + this.bg0.height;
        //章
        //let name=LevelManager.getLevelName(level);
        var fightingInfo = GameManager_1.default.getInstance().fighting_info;
        var bgName = fightingInfo.bg_name;
        this.cur_bg_name = bgName;
        cc.resources.load(bgName, cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.bg0.getComponent(cc.Sprite).spriteFrame = assets;
            _this.bg1.getComponent(cc.Sprite).spriteFrame = assets;
        });
        cc.resources.load(fightingInfo.wall_name, cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            wallBg.getChildByName('bg2_wall').getComponent(cc.Sprite).spriteFrame = assets;
            //let bc = wallBg.getChildByName('wall_down').getComponent(cc.BoxCollider);
            // this.scheduleOnce(() => {
            //     bc.size = wallBg.getContentSize();
            //     GameManager.getInstance().enemy_att_y = wallBg.y + bc.node.y + bc.node.height / 2;
            // }, 0.5);
        });
    };
    Game.prototype.showBaoxiang = function () {
        //根据当前所在波数显示
    };
    Game.prototype.startNextLevel = function () {
        this.initLevelShow();
        this.showDps();
        this.showLevelProgress();
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            this.start_time = 0;
        }
        this.showTime();
        this.startGame();
        this.showCoin();
        if (this.cur_bg_name != GameManager_1.default.getInstance().fighting_info.bg_name) {
            this.setBgImg();
        }
    };
    Game.prototype.setProgress = function () {
        var bgLoading = cc.find('Canvas/Ui_Root/bg_loading');
        bgLoading.active = true;
        //开始加载关卡所需的怪物
        var progress = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        progress.progress = 0.0;
    };
    Game.prototype.clickBtnDouble = function (btn) {
        var _this = this;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.二倍速点击次数);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.is_unlock_rate == false && this.try_rate_ramain <= 0) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1400108));
            GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Pause;
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.WeekCard, UIConfig_1.UILayerLevel.One, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(WeekCardUi_1.default).refreshUi();
                    uiNode.getComponent(WeekCardUi_1.default).init({
                        onClose: function () {
                            GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
                            _this.is_unlock_auto = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
                            _this.is_unlock_rate = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
                            if (_this.is_unlock_rate) {
                                GameManager_1.default.getInstance().setBtnSetupRate(2);
                                _this.setTryAutoLabel();
                                _this.setTryRateLabel();
                                _this.setBtnRateShow();
                            }
                        }
                    });
                }
            });
            return;
        }
        else {
            if (GameManager_1.default.getInstance().getBtnSetupRate() == 1) {
                GameManager_1.default.getInstance().setBtnSetupRate(2);
                //启动试用
                if (this.is_unlock_rate == false && this.try_rate_ramain > 0) {
                    this.is_try_rate = true;
                }
            }
            else {
                GameManager_1.default.getInstance().setBtnSetupRate(1);
                //关闭试用
                if (this.is_unlock_rate == false) {
                    this.is_try_rate = false;
                }
            }
        }
        this.setBtnRateShow();
    };
    Game.prototype.clickBtnAuto = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.自动战斗点击次数);
        if (this.is_unlock_auto == false && this.try_auto_ramain <= 0) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1400107));
            GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Pause;
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.WeekCard, UIConfig_1.UILayerLevel.One, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(WeekCardUi_1.default).refreshUi();
                    uiNode.getComponent(WeekCardUi_1.default).init({
                        onClose: function () {
                            GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
                            _this.is_unlock_auto = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
                            _this.is_unlock_rate = DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy;
                            if (_this.is_unlock_auto) {
                                GameManager_1.default.getInstance().setAutoFighting(true);
                                _this.setTryAutoLabel();
                                _this.setTryRateLabel();
                                _this.setBtnAuto();
                            }
                        }
                    });
                }
            });
            return;
        }
        if (this.is_unlock_auto == false && this.try_auto_ramain > 0) {
            //有剩余时间，启用/关闭试用
            this.is_try_auto = !GameManager_1.default.getInstance().auto_fighting;
            if (this.is_try_auto == false) {
                //关闭，那就关闭计时
                this.try_auto_ramain = Math.floor(this.try_auto_ramain);
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_auto_fight_remain, this.try_auto_ramain);
            }
        }
        GameManager_1.default.getInstance().setAutoFighting(!GameManager_1.default.getInstance().auto_fighting);
        this.setBtnAuto();
    };
    Game.prototype.clickBtnPause = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.try_auto_ramain = Math.floor(this.try_auto_ramain);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_auto_fight_remain, this.try_auto_ramain);
        this.try_rate_ramain = Math.floor(this.try_rate_ramain);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_rate_fight_remain, this.try_rate_ramain);
        // GameManager.getInstance().wall_data.changeHp(-GameManager.getInstance().wall_data.getMaxHp()*0.65);
        GameManager_1.default.getInstance().showGamePause(); //暂停
        // GameManager.getInstance().showGameWin();//胜利
        // GameManager.getInstance().showGameLose();//失败
        //cc.log(cc.assetManager.assets.count);
        // if(IsDebug){
        //     UIManager.getInstance().showUiDialog(UIPath.RewardSSUI,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //         uiNode.getComponent(RewardSSUi).initData(1);
        //     }});
        // }
    };
    Game.prototype.clickBtnTest1 = function () {
        //SkillManager.getInstance().releaseSkill();
    };
    Game.prototype.clickBtnTest2 = function () {
        // let boss=BossManager.getInstance().node.getChildByName('boss1');
        // if(boss){
        //     boss.getComponent(BullDemon).startSkill();
        // }
        GameManager_1.default.getInstance().showBossWarning();
    };
    Game.prototype.clickBtnReplay = function () {
        // let posX=Math.random()*400-200;
        // let posY=Math.random()*400-200;
        // let pos=cc.v2(posX,posY);
        // let bx=GameManager.getInstance().enemy_manager.createBaoXiangGuai(pos);
        // bx.getComponent(BaoXiangGuai).init(new LevelBuff());        
    };
    Game.prototype.clickBtnBattlepotion = function (event, type) {
        var num = type;
        var battlepotionnumber = PropManager_1.PropManager.getInstance().getPropNum(this.battlepotionPropId[num]);
        if (this.battlepotionstate[num] == 0) { //这局已经用过了   飘字
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100130), 3);
        }
        else { //如果没有用过
            if (battlepotionnumber == 0) { //数量不够 弹窗购买弹窗        如果钻石的数量够，直接购买之后使用  
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BuyBattlePotion, UIConfig_1.UILayerLevel.One, {
                    onCompleted: function (uiNode) {
                        uiNode.getComponent(BuyBattlePotion_1.default).init({
                            onClose: function () {
                            }
                        });
                        uiNode.getComponent(BuyBattlePotion_1.default).initUi(type);
                    },
                });
                // if(PayManager.getInstance().getPayNum('c301')<=0){
                //     //首充没有完成    如果首充没有购买就弹出首充
                //     UIManager.getInstance().showUiDialog(UIPath.FirstCharge,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                //         uiNode.getComponent(PayFirstChargeUi).init({
                //             onClose:() => {
                //             }
                //         });
                //     },});
                // }else{
                //     //首充完成了   弹出钻石购买
                //     UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                //         uiNode.getComponent(CoinPop).init({
                //             onClose:()=>{
                //             }
                //         })
                //         uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                //     },});
                // }
            }
            else {
                //console.log("使用道具:",num)
                if (num == 0) {
                    this.clickBtnRed();
                }
                if (num == 1) {
                    this.clickBtnGreen();
                }
                if (num == 2) {
                    this.clickBtnBlue();
                }
            }
        }
    };
    Game.prototype.clickBtnRed = function () {
        //console.log("道具：红")
    };
    Game.prototype.clickBtnGreen = function () {
        //console.log("道具：绿")
    };
    Game.prototype.clickBtnBlue = function () {
        //console.log("道具：蓝")
    };
    Game.prototype.setTryAutoLabel = function () {
        this.try_auto_label.node.active = this.try_auto_ramain > 0 && LevelManager_1.LevelManager.getInstance().finish_level >= 5 && this.is_unlock_auto == false;
        this.try_auto_label.string = MyTool_1.default.getTimeStr(Math.floor(this.try_auto_ramain));
    };
    Game.prototype.setTryRateLabel = function () {
        this.try_rate_label.node.active = this.try_rate_ramain > 0 && LevelManager_1.LevelManager.getInstance().finish_level >= 5 && this.is_unlock_rate == false;
        this.try_rate_label.string = MyTool_1.default.getTimeStr(Math.floor(this.try_rate_ramain));
    };
    Game.prototype.setBtnRateShow = function () {
        var rate = cc.find('Canvas/Ui_Root/btnRate');
        if (this.is_unlock_rate == true || this.try_rate_ramain > 0) {
            var rateNum = GameManager_1.default.getInstance().getBtnSetupRate();
            rate.getComponent(cc.Sprite).spriteFrame = this.sp_rate[rateNum - 1];
        }
        else {
            rate.getComponent(cc.Sprite).spriteFrame = this.sp_rate[0];
        }
        this.try_rate_ramain = Math.floor(this.try_rate_ramain);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.try_rate_fight_remain, this.try_rate_ramain);
        rate.active = LevelManager_1.LevelManager.getInstance().finish_level >= 5;
    };
    Game.prototype.setBtnAuto = function () {
        var auto = cc.find('Canvas/Ui_Root/btnAuto');
        var autoNum = GameManager_1.default.getInstance().auto_fighting ? 1 : 0;
        auto.getComponent(cc.Sprite).spriteFrame = this.sp_auto[autoNum];
        if (this.is_unlock_auto) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.AutoFighting, autoNum);
        }
        auto.active = LevelManager_1.LevelManager.getInstance().finish_level >= 5;
    };
    Game.prototype.showTime = function () {
        var shi = Math.floor(this.start_time / 3600);
        var shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        var fen = Math.floor((this.start_time - shi * 3600) / 60);
        var fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        var miao = this.start_time % 60;
        var miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        this.time_label.string = shiStr + ':' + fenStr + ':' + miaoStr;
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").getComponent(cc.Label).string = "" + shiStr + ':' + fenStr + ':' + miaoStr;
        }
    };
    Game.prototype.showRemainTime = function () {
        var remainTime = 90 - this.start_time;
        var shi = Math.floor(remainTime / 3600);
        var shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        var fen = Math.floor((remainTime - shi * 3600) / 60);
        var fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        var miao = remainTime % 60;
        var miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        this.time_label.string = shiStr + ':' + fenStr + ':' + miaoStr;
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").getComponent(cc.Label).string = "" + shiStr + ':' + fenStr + ':' + miaoStr;
        }
        if (remainTime <= 0) {
            GameManager_1.default.getInstance().showGameLose();
        }
    };
    Game.prototype.initLevelShow = function () {
        var waveBg = cc.find('Canvas/Ui_Root/top_ui/waveBg');
        this.cur_wave_node = waveBg.parent.getChildByName('cur_wave');
        this.cur_wave_node.y = waveBg.y - 20;
        this.cur_wave_node.x = -315;
        this.dist_xx = -315;
        this.wave_pos_x = new Array();
        var waveTypes = GameManager_1.default.getInstance().fighting_info.getWaveTypes();
        var len = waveTypes.length;
        waveBg.removeAllChildren();
        //算出每个的长度
        var jiangeNum = len - 1;
        var jiangeWidth = 4;
        var jiangeTotalWidth = jiangeNum * jiangeWidth;
        var waveTotalWidth = waveBg.width - 5 * 2 - jiangeTotalWidth;
        var waveWidth = waveTotalWidth / len;
        this.left_xx = -waveBg.width / 2 + 5;
        var oneWidth = waveWidth + jiangeWidth;
        this.one_width = oneWidth;
        for (var i = 0; i < len; i++) {
            var type = waveTypes[i];
            var node = null;
            switch (type) {
                case 0:
                    {
                        node = cc.instantiate(this.prefab_normal_wave);
                    }
                    break;
                case 1:
                    {
                        node = cc.instantiate(this.prefab_boss_wave);
                    }
                    break;
            }
            waveBg.addChild(node);
            node.name = i.toString();
            node.width = waveWidth;
            node.x = this.left_xx + i * oneWidth;
            node.y = 0;
            node.getComponent(cc.Sprite).spriteFrame = this.sp_wave[0];
            node.active = type > 0;
            var jiangePosX = node.x + node.width + jiangeWidth / 2;
            if (i != len - 1) {
                var jiange = cc.instantiate(this.prefab_jiange);
                jiange.x = jiangePosX;
                jiange.y = 0;
                waveBg.addChild(jiange);
            }
            this.wave_pos_x.push(jiangePosX);
        }
        this.showLevelProgress();
    };
    Game.prototype.showLevelProgress = function () {
        var gm = GameManager_1.default.getInstance();
        switch (gm.cur_game_mode) {
            case Constants_1.GameMode.Maze:
            case Constants_1.GameMode.Tower:
            case Constants_1.GameMode.Endless:
            case Constants_1.GameMode.Main:
                {
                    // let allEnemyNum=MonsterManager.getInstance().total_monster_num;
                    // let killNum=MonsterManager.getInstance().killed_monster_num;
                    // let progress=(killNum/allEnemyNum);
                    // this.level_progress.progress=progress;
                    // this.level_label.string=killNum+'/'+allEnemyNum;    
                    //this.cur_wave_node.x=this.wave_pos_x[gm.cur_wave];
                    if (this.cur_wave_sp) {
                        this.cur_wave_sp.width = this.one_width;
                    }
                    var waveBg = cc.find('Canvas/Ui_Root/top_ui/waveBg');
                    this.cur_wave_sp = waveBg.getChildByName(gm.cur_wave.toString());
                    var types = GameManager_1.default.getInstance().fighting_info.getWaveTypes();
                    this.cur_wave_sp.getComponent(cc.Sprite).spriteFrame = this.sp_wave[types[gm.cur_wave] + 1];
                    this.cur_wave_sp.active = true;
                    this.cur_wave_sp.width = 0;
                    var curWave = GameManager_1.default.getInstance().cur_wave;
                    //let prevWave=GameManager.getInstance().cur_wave-1;
                    var curXX = this.wave_pos_x[curWave];
                    //let prevXX=prevWave>=0?this.wave_pos_x[prevWave]:this.left_xx;
                    //let offsetXX=curXX-prevXX;        
                    this.dist_xx = curXX;
                    //waveBg.getC
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    if (this.endless_ts) {
                        this.endless_ts.refreshData();
                    }
                }
                break;
            // case GameMode.Boss_Prsonal:{
            //     if(this.boss_challenge_ts){
            //         this.boss_challenge_ts.refreshData();
            //     }
            // }break;
        }
    };
    Game.prototype.showJianTouPos = function (per) {
        // let curWave=GameManager.getInstance().cur_wave;
        // let prevWave=GameManager.getInstance().cur_wave-1;
        // let curXX=this.wave_pos_x[curWave];
        // let prevXX=prevWave>=0?this.wave_pos_x[prevWave]:this.left_xx;
        // let offsetXX=curXX-prevXX;        
        // this.dist_xx=prevXX+offsetXX*per;
    };
    Game.prototype.showCoin = function () {
        // let allEnemyNum=MonsterManager.getInstance().total_monster_num;
        // let killNum=MonsterManager.getInstance().killed_monster_num;
        // this.coin_label.string=MyTool.getCoinDanwei(killNum/allEnemyNum*this.total_coin);
    };
    Game.prototype.showDps = function () {
        var total = 0;
        var gg = GameManager_1.default.getInstance();
        var len = gg.hero_skill_dps.length;
        for (var i = 0; i < len; i++) {
            var skillDps = gg.hero_skill_dps[i];
            var attackDps = gg.hero_attack_dps[i];
            total += (skillDps + attackDps);
        }
        var dps = Math.round(total / this.start_time);
        this.dps_label.string = MyTool_1.default.getCoinDanwei(dps); //        this.dps_label.string='DPS '+MyTool.getCoinDanwei(dps);
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/dpsLabel").getComponent(cc.Label).string = "" + MyTool_1.default.getCoinDanwei(dps);
        }
        // if(IsDebug)
        // {
        //     let top=cc.find('Canvas/Ui_Root/top_ui');
        //     let total=0;
        //     let gg=GameManager.getInstance();
        //     let len=gg.hero_skill_dps.length;
        //     for(let i=0; i<len; i++)
        //     {
        //         let skillDps=gg.hero_skill_dps[i];
        //         let attackDps=gg.hero_attack_dps[i];
        //         total+=(skillDps+attackDps);
        //         top.getChildByName('attLabel'+i).getComponent(cc.Label).string='攻击：'+attackDps;
        //         top.getChildByName('skillLabel'+i).getComponent(cc.Label).string='技能：'+skillDps;
        //     }
        //     let dps=Math.round(total/this.start_time);
        //     this.dps_label.string='DPS '+dps;
        // }
    };
    Game.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            this.time_jishu += dt;
            if (this.time_jishu >= 1) {
                this.time_jishu = 0;
                this.start_time += 1;
                switch (GameManager_1.default.getInstance().cur_game_mode) {
                    case Constants_1.GameMode.Tower:
                    case Constants_1.GameMode.Endless:
                    case Constants_1.GameMode.Maze:
                    case Constants_1.GameMode.Main:
                        {
                            this.showTime();
                        }
                        break;
                    case Constants_1.GameMode.Boss_Challenge:
                        {
                            this.showRemainTime();
                        }
                        break;
                }
                this.showDps();
            }
            if (this.cur_wave_node.x < this.dist_xx) {
                this.cur_wave_node.x += dt * 30;
                this.cur_wave_sp.width = this.one_width - (this.dist_xx - this.cur_wave_node.x);
                if (this.cur_wave_node.x > this.dist_xx) {
                    this.cur_wave_node.x = this.dist_xx;
                    this.cur_wave_sp.width = this.one_width;
                }
            }
            var aDt = dt;
            if (GameManager_1.default.getInstance().getGameRate() != 1) {
                aDt = dt / 2;
            }
            if (aDt > 1) {
                aDt = 1;
            }
            if (this.is_try_auto && this.try_auto_ramain > 0) {
                this.try_auto_ramain -= aDt;
                if (this.try_auto_ramain <= 0) {
                    this.is_try_auto = false;
                    this.try_auto_ramain = 0;
                    GameManager_1.default.getInstance().setAutoFighting(false, false);
                    this.setBtnAuto();
                }
                this.setTryAutoLabel();
            }
            if (this.is_try_rate && this.try_rate_ramain > 0) {
                this.try_rate_ramain -= aDt;
                if (this.try_rate_ramain <= 0) {
                    this.is_try_rate = false;
                    this.try_rate_ramain = 0;
                    GameManager_1.default.getInstance().setBtnSetupRate(1, false);
                    this.setBtnRateShow();
                }
                this.setTryRateLabel();
            }
            //背景循环
            if (this.bg0 && this.bg1) {
                this.bg1.y -= dt * this.bgSpeed;
                this.bg0.y -= dt * this.bgSpeed;
                if (this.bg0.y <= cc.winSize.height / 2 - this.bg0.height / 2 - cc.winSize.height) {
                    this.bg0.y = this.bg1.y + this.bg0.height;
                }
                if (this.bg1.y <= cc.winSize.height / 2 - this.bg0.height / 2 - cc.winSize.height) {
                    this.bg1.y = this.bg0.y + this.bg0.height;
                }
            }
        }
    };
    // protected lateUpdate(dt: number): void {
    //     if(this.cur_wave_node.x<this.dist_xx){
    //     }
    // }
    /**教程 */
    Game.prototype.checkTutorails = function () {
        this.scheduleOnce(function () {
            if (TutorailsManager_1.default.getInstance().is_finish_game && LevelManager_1.LevelManager.getInstance().start_level == 1) {
                if (TutorailsManager_1.default.getInstance().isShowTutorials(211)) {
                    TutorailsManager_1.default.getInstance().is_tutorails_state = true;
                    GameManager_1.default.getInstance().setGameRate(1 / Constants_1.JiaSu);
                    TutorailsManager_1.default.getInstance().showTutorials(211, null, function () {
                        TutorailsManager_1.default.getInstance().showTutorials(212, null, function () {
                            TutorailsManager_1.default.getInstance().showTutorials(213, function () {
                                TutorailsManager_1.default.getInstance().saveTutorials(211);
                                TutorailsManager_1.default.getInstance().saveTutorials(212);
                                TutorailsManager_1.default.getInstance().saveTutorials(213);
                            }, function () {
                                GameManager_1.default.getInstance().setGameRate(1);
                            });
                        });
                    });
                }
            }
        }, 1 * GameManager_1.default.getInstance().getGameRate());
    };
    __decorate([
        property([cc.SpriteFrame])
    ], Game.prototype, "sp_rate", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Game.prototype, "sp_auto", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Game.prototype, "sp_wave", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "prefab_normal_wave", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "prefab_boss_wave", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "prefab_jiange", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "try_auto_label", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "try_rate_label", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "battlepotion", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBaUU7QUFDakUscURBQWdEO0FBRWhELDJEQUFpRTtBQUNqRSwwQ0FBOEU7QUFDOUUscUVBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELDBDQUFxQztBQUVyQyxzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCw0REFBMkQ7QUFDM0QsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQWlFO0FBQ2pFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QywwQ0FBcUM7QUFDckMsc0RBQWlEO0FBRWpELGtFQUE2RDtBQUM3RCwyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QyxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELDJEQUF3RTtBQUN4RSx3REFBbUQ7QUFFN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFtL0JDO1FBaC9CRyxhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFlBQVk7UUFDWixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qixn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LENBQUMsQ0FBQztJQUVwRCxDQUFDO0lBLytCRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNpQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNlO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ1k7SUFvQmhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDYTtJQXFCaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDVztJQTVEWixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBbS9CeEI7SUFBRCxXQUFDO0NBbi9CRCxBQW0vQkMsQ0FuL0JpQyxFQUFFLENBQUMsU0FBUyxHQW0vQjdDO2tCQW4vQm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCBCb3NzR2FtZVVpIGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzR2FtZVVpXCI7XHJcbmltcG9ydCBFbmRsZXNzZ0dhbWVVaSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc2dHYW1lVWlcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQnVmZkRpc3BsYXkgZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvQnVmZkRpc3BsYXlcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9cIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4uL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4uL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgV2Vla0NhcmRVaSBmcm9tIFwiLi4vV2Vla0NhcmQvV2Vla0NhcmRVaVwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdXlCYXR0bGVQb3Rpb24gZnJvbSBcIi4vVWkvQnV5QmF0dGxlUG90aW9uXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9yYXRlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9hdXRvOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF93YXZlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ub3JtYWxfd2F2ZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYm9zc193YXZlOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9qaWFuZ2U6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICAvKirlvZPliY3ms6LmlbDoioLngrkgKi9cclxuICAgIGN1cl93YXZlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgY3VyX3dhdmVfc3A6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgd2F2ZV9wb3NfeDogbnVtYmVyW10gPSBbXTtcclxuICAgIGxlZnRfeHg6IG51bWJlciA9IDA7XHJcbiAgICBkaXN0X3h4OiBudW1iZXIgPSAwO1xyXG4gICAgb25lX3dpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIC8vIHpoZW5feGluZzpjYy5Kc29uQXNzZXQ9bnVsbDtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6humAn+eOhyAqL1xyXG4gICAgaXNfdW5sb2NrX3JhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X3JhdGVfcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X3JhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6huiHquWKqOaImOaWlyAqL1xyXG4gICAgaXNfdW5sb2NrX2F1dG86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X2F1dG9fcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X2F1dG86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X2F1dG9fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X3JhdGVfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8v5rWL6K+VXHJcbiAgICBzdGFydF90aW1lOiBudW1iZXIgPSAwO1xyXG4gICAgdGltZV9qaXNodTogbnVtYmVyID0gMDtcclxuICAgIHRpbWVfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGJnMDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBiZzE6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgZHBzX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvL+WFs+WNoei/m+W6puadoVxyXG4gICAgbGV2ZWxfcHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBjb2luX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICB0b3RhbF9jb2luOiBudW1iZXIgPSAwO1xyXG4gICAgZW5kbGVzc190czogRW5kbGVzc2dHYW1lVWkgPSBudWxsO1xyXG4gICAgLy/lvZPliY3og4zmma/kvb/nlKjnmoTlkI3np7BcclxuICAgIGN1cl9iZ19uYW1lOiBzdHJpbmcgPSAnYmcyJztcclxuXHJcbiAgICBwcml2YXRlIGJnU3BlZWQ6IG51bWJlciA9IDUwO1xyXG5cclxuICAgIC8v5oiY5paX6I2v5rC0XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJhdHRsZXBvdGlvbjogY2MuTm9kZVtdID0gW107Ly/nuqLoibIgICDnu7/oibIgICDok53oibJcclxuICAgIGJhdHRsZXBvdGlvblByb3BJZDogUHJvcElkW10gPSBbUHJvcElkLlJlZFBvdGlvbiwgUHJvcElkLkdyZWVuUG90aW9uLCBQcm9wSWQuQmx1ZVBvdGlvbl0vL+aImOaWl+iNr+awtOeahOmBk+WFt2lkXHJcbiAgICBiYXR0bGVwb3Rpb25zdGF0ZTogbnVtYmVyW10gPSBbMSwgMSwgMV0vL+aImOaWl+iNr+awtOWcqOi/meS4gOWxgOaYr+WQpuS9v+eUqOS6hiAg6buY6K6k5q+P5LiA5Liq6I2v5rC05pyJ5LiA5qyh5L2/55So55qE5py65LyaXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdChHYW1lU2NlbmUuZ2FtZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXc9dHJ1ZTtcclxuICAgICAgICB0aGlzLnNldEJnSW1nKCk7XHJcbiAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIZXJvcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFR1dG9yYWlsc0hlcm9EYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfYXV0byA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3VubG9ja19yYXRlKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3VubG9ja19hdXRvKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIDYwICogMTApO1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIDYwICogMTApO1xyXG4gICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICAvL3RoaXMuc3RhcnRUZXN0KCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9CYXR0bGUpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5OdWxsLCA0KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQudWlfbW9uc3Rlcl93YXJuaW5nLCAxKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxTaG93KCk7XHJcblxyXG4gICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkucHJlbG9hZFVpQnlQYXRoKFVJUGF0aC5SZXdhcmRTU1VJKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkucHJlbG9hZFVpQnlQYXRoKFVJUGF0aC5TdG9yZUhlcm9TaG93VWkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0ZXN0Q2FtZXJhKCkge1xyXG4gICAgICAgIC8vIOWIm+W7uua4suafk+e6ueeQhu+8jOW5tuiuvue9rue6ueeQhuWkp+Wwj+WQjOaYvuekuuWxjyhzaG93U3ByaXRlKeWkp+Wwj+S4gOagt1xyXG4gICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IGNjLlJlbmRlclRleHR1cmUoKTtcclxuICAgICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZSgzMDAsIDI0MCk7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1Rlc3RDYW1lcmEnKS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKS50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBsZXQgc2hvd1Nwcml0ZSA9IGNjLmZpbmQoJ0NhbnZhcy9UZXN0L3Nob3dSb290L3Nob3dTcHJpdGUnKTtcclxuICAgICAgICBzaG93U3ByaXRlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLnNldFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGFwdGF0aW9uKCkge1xyXG4gICAgICAgIC8v5LiK5LiL5qih5Z2XXHJcbiAgICAgICAgbGV0IHRvcFVpID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpJyk7XHJcbiAgICAgICAgbGV0IHdwID0gY2Mud2luU2l6ZTtcclxuICAgICAgICB0b3BVaS55ID0gd3AuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwgPSB0b3BVaS5nZXRDaGlsZEJ5TmFtZSgndGltZUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmxldmVsX3Byb2dyZXNzID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfcHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwgPSB0b3BVaS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb2luX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25CZycpLmdldENoaWxkQnlOYW1lKCdjb2luTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuZHBzX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2Rwc0xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvL+WfjuWimVxyXG4gICAgICAgIGxldCB3YWxsQmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfYmcnKTtcclxuICAgICAgICB3YWxsQmcueSA9IC0oY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSArIHdhbGxCZy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vaHBcclxuICAgICAgICBsZXQgaHAgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9ocF9yb290Jyk7XHJcbiAgICAgICAgaHAueSA9IC13cC5oZWlnaHQgLyAyICsgaHAuaGVpZ2h0IC0gMjc7Ly8yN+aYr+ihgOadoeeahOWdkOagh1xyXG4gICAgICAgIHRoaXMuYmcwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZzAnKTtcclxuICAgICAgICB0aGlzLmJnMSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcxJyk7XHJcbiAgICAgICAgdGhpcy5iZzAueSA9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgLy/kuIrnorDmkp7ngrlcclxuICAgICAgICAvL2NjLmZpbmQoJ0NhbnZhcy93YWxsX3Jvb3Qvd2FsbF90b3AnKS55PXRvcFVpLnk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvYWRpbmcoKSB7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZyA9IFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXIgPSBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsID0gbG9hZGluZ0Jhci5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2FkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzO1xyXG4gICAgICAgIGxldCBsb2FkaW5nU2NoZWR1bGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgKz0gMC4wMDU7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmcgPSAobG9hZGluZ0Jhci5wcm9ncmVzcyAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICAgICAgaWYgKGxvYWRpbmdCYXIucHJvZ3Jlc3MgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUobG9hZGluZ1NjaGVkdWxlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUobG9hZGluZ1NjaGVkdWxlLCAwLjAyKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1N0YXJ0R2FtZSgpIHtcclxuICAgICAgICBpZiAoSGVyby5jdXJfbG9hZGVkX251bSA+PSBIZXJvLm1heF9sb2FkX251bSkge1xyXG4gICAgICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkVuZGxlc3MpIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4vml6DlsL3mjJHmiJjmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJhY5qyh5peg5bC95oyR5oiYKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYMeasoeaXoOWwveaMkeaImCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDPmrKHml6DlsL3mjJHmiJgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRvdGFsbnVtXHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW0rK1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyx0b3RhbG51bSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgbnVtKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApXHJcbiAgICAgICAgICAgICAgICBsZXQgUm91bmQgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoUm91bmQgLSAxID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIgPSAoUm91bmQgLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMSk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIgPSAtMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImJ1ZmY6XCIsQnVmZkRpc3BsYXkuc3VycGx1c251bWJlcixSb3VuZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEhlcm9zKCkge1xyXG4gICAgICAgIC8v6I635Y+W6Zif5YiXXHJcbiAgICAgICAgSGVyby5tYXhfbG9hZF9udW0gPSAwO1xyXG4gICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0gPSAwO1xyXG4gICAgICAgIFBldC5tYXhfbG9hZF9udW0gPSAwO1xyXG4gICAgICAgIFBldC5jdXJfbG9hZGVkX251bSA9IDA7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZWFtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb1R5cGUgPSB0ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGhlcm9UeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGVybyhoZXJvVHlwZSwgaSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPGhlcm9Sb290LmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBoZXJvPWhlcm9Sb290LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChIZXJvKTtcclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v6aKE5Yqg6L295byT5omLSGVyb19Sb290XHJcbiAgICAgICAgLy8gaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSA9PSBmYWxzZSAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSA1KSB7XHJcbiAgICAgICAgLy8gICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvOCcpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkSGVybyhoZXJvVHlwZTogSGVyb19UeXBlLCBwb3NJbmRleDogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgSGVyby5tYXhfbG9hZF9udW0rKztcclxuICAgICAgICBsZXQgcG9zWCA9IDIgKiAxNDQgLSAyODg7XHJcbiAgICAgICAgbGV0IHBvc1kgPSAoNCAtIHBvc0luZGV4KSAqIDcwO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvJyArIGhlcm9UeXBlLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IHBvc1g7XHJcbiAgICAgICAgICAgIGxldCBocCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS55ID0gaHAueSArIHBvc1k7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0U2libGluZ0luZGV4KHBvc0luZGV4KTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykubGVhdGVyTnVtPXBvc0luZGV4O1xyXG4gICAgICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIocG9zWCwgbm9kZS55ICsgMTUwKSwgaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0thaVpoYW4oKSB7XHJcbiAgICAgICAgbGV0IGthaVpoYW4gPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9LYWlaaGFuJyk7XHJcbiAgICAgICAga2FpWmhhbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzcGluZSA9IGthaVpoYW4uZ2V0Q2hpbGRCeU5hbWUoJ0thaVpoYW4nKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGxldCBhbmltYSA9IHNwaW5lLnNldEFuaW1hdGlvbigwLCAnS2FpWmhhbicsIGZhbHNlKTsvL1lYX0thaXpoYW5cclxuICAgICAgICBzcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEubmFtZSA9PSAnQXR0YWNrJykge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0thaXpoYW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIGthaVpoYW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBTdGF0dXNCYXR0bGVQb3Rpb24oKSB7XHJcbiAgICAgICAgLy/liLfmlrDmiJjmlpfoja/msLTnmoTnirbmgIFcclxuICAgICAgICBmb3IgKGxldCBiYXR0bGVwb3Rpb25pbmRleCA9IDA7IGJhdHRsZXBvdGlvbmluZGV4IDwgdGhpcy5iYXR0bGVwb3Rpb24ubGVuZ3RoOyBiYXR0bGVwb3Rpb25pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIC8v5pWw6YePXHJcbiAgICAgICAgICAgIGxldCBiYXR0bGVwb3Rpb25udW1iZXIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5iYXR0bGVwb3Rpb25Qcm9wSWRbYmF0dGxlcG90aW9uaW5kZXhdKVxyXG4gICAgICAgICAgICAvL+aVsOmHj+aUueWPmFxyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJSZWR0eHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIGJhdHRsZXBvdGlvbm51bWJlclxyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJCYXR0bGVfTG9ja1wiKS5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhdHRsZXBvdGlvbm51bWJlciA9PSAwKSB7Ly/mlbDph4/kuLow5Y+Y54GwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7Ly/mlbDph4/lpKfkuo4w5Y+Y5LquXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6L+Z5LiA5bGA5piv5ZCm55So5LqG5LiA5qyhXHJcbiAgICAgICAgICAgIGxldCB3aGV0aGVydXNlID0gdGhpcy5iYXR0bGVwb3Rpb25zdGF0ZVtiYXR0bGVwb3Rpb25pbmRleF1cclxuICAgICAgICAgICAgaWYgKHdoZXRoZXJ1c2UgPT0gMCkgey8v5pWw6YeP5Li6MOWPmOeBsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiQmF0dGxlX0xvY2tcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9IGVsc2Ugey8v5pWw6YeP5aSn5LqOMOWPmOS6rlxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiQmF0dGxlX0xvY2tcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRHYW1lKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIilcclxuICAgICAgICB0aGlzLlN0YXR1c0JhdHRsZVBvdGlvbigpXHJcbiAgICAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBnbS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgdGhpcy5zaG93Q29pbigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0thaVpoYW4oKTtcclxuICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgbGV0IHRvcCA9IGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWlcIik7XHJcblxyXG4gICAgICAgIC8vbGV0IGNvaW5CZz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvaWNvbkJnJyk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2NvaW4gPSBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc1Jld2FyZF9Db2luKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4vnrKxO56ug546p5a625pWwICsgTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4vmjJHmiJjlhbPljaEgKyBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHlhbPljaEpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh5YWz5Y2hKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWx0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE0MDAxNylcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjUpXHJcblxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsUHJvZ3Jlc3NCYXJcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiY3VyTGFiZWxcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbFwiKS5hY3RpdmU9ZmFsc2U7ICBcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsb19oaXQsIDIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbHR4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDE4KS8vODAwMDE4XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIC8v5rOi5pWwLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlbnVtYmVyID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsIDApXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgd2F2ZW51bWJlclxyXG5cclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4tCT1NT5oyR5oiY5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG5vZGU9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm9kZUJ5SWQoVUlQYXRoLkNvaW5Qb3ApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveU5vZGUoVUlQYXRoLkNvaW5Qb3Asbm9kZSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LDAuNSlcclxuICAgICAgICAgICAgICAgIC8vIH0sMC41KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZChcInVpL2dhbWUvZW5kbGVzc19nYW1lX3VpXCIsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ0Jvc3NIcFJvb3QnKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmVuZGxlc3NfdHMgPSBub2RlLmdldENvbXBvbmVudChFbmRsZXNzZ0dhbWVVaSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5lbmRsZXNzX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJhY5qyhYm9zc+eLqeeMjik7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKFCT1NT54up54yOKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoUJPU1Pni6nnjI4pO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxQcm9ncmVzc0JhclwiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjdXJMYWJlbFwiKS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbFwiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgdG90YWxudW1cclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgICAgICAgICBudW0tLTtcclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLHRvdGFsbnVtKTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywgbnVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gJzAvMSc7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkVuZGxlc3NfQnRuX0J1ZmZcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwidWkvZ2FtZS9ib3NzX2dhbWVfdWlcIiwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnQm9zc0hwUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuYm9zc19jaGFsbGVuZ2VfdHMgPSBub2RlLmdldENvbXBvbmVudChCb3NzR2FtZVVpKTtcclxuICAgICAgICAgICAgICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NfY2hhbGxlbmdlX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZV9sYWJlbC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3MvdGltZUxhYmVsXCIpLmNvbG9yID0gY2MuQ29sb3IuV0hJVEVcclxuICAgICAgICAgICAgICAgIC8vdG9wLmdldENoaWxkQnlOYW1lKCdpY29uVGltZScpLmNvbG9yPWNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlbWFpblRpbWUoKVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOiB7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHniKzloZQpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh54is5aGUKTtcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIFRvd2VyTWFuYWdlci5pc19zaG93X3Rvd2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOiB7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHlhrDmsrPmjqLpmakpO1xyXG5cclxuICAgICAgICAgICAgICAgIFRvd2VyTWFuYWdlci5pc19zaG93X3Rvd2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWx0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE0MDAxNylcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkVuZGxlc3NfQnRuX0J1ZmZcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUHJvcE51bSh0cnVlKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQnVmZigpIHsvL2J1ZmblvLnnqpdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiKysrKysrK0J1ZmblsZXnpLrlvLnnqpdcIilcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDApOy8vQnVmZuWxleekuuW8ueeql1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMCk7Ly9CdWZm6YCJ5oup5by556qXXHJcbiAgICAgICAgaWYgKElzRGVidWcpIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrICsgXCIs5Li75Yqo5oqA6IO95Ya35Y205pe26Ze0OlwiICsgdi5za2lsbF90b3RhbF90aW1lICsgXCIs5pS76YCfOlwiICsgMSAvIHYuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgKyBcIuWinuS8pO+8mlwiICsgdi5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSwgdi5oZXJvX2RhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldEF0dHJpYnV0ZURhdGEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJnSW1nKCkge1xyXG4gICAgICAgIC8vL2xldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAvLyBsZXQgYmcwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZzAnKTtcclxuICAgICAgICBsZXQgd2FsbEJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsX2JnJyk7XHJcbiAgICAgICAgbGV0IHdhbGxEb3duID0gd2FsbEJnLmdldENoaWxkQnlOYW1lKCd3YWxsX2Rvd24nKTtcclxuICAgICAgICAvL+mAgumFjeWdkOagh1xyXG4gICAgICAgIC8vIGxldCBocD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC93YWxsX3Jvb3QnKTtcclxuICAgICAgICAvLyB3YWxsQmcueT1ocC55KzEwODtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95ID0gd2FsbEJnLnkgKyB3YWxsRG93bi55ICsgd2FsbERvd24uaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLmJnMC55ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLmJnMS55ID0gdGhpcy5iZzAueSArIHRoaXMuYmcwLmhlaWdodDtcclxuICAgICAgICAvL+eroFxyXG4gICAgICAgIC8vbGV0IG5hbWU9TGV2ZWxNYW5hZ2VyLmdldExldmVsTmFtZShsZXZlbCk7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbztcclxuICAgICAgICBsZXQgYmdOYW1lID0gZmlnaHRpbmdJbmZvLmJnX25hbWU7XHJcbiAgICAgICAgdGhpcy5jdXJfYmdfbmFtZSA9IGJnTmFtZTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChiZ05hbWUsIGNjLlNwcml0ZUZyYW1lLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmcwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB0aGlzLmJnMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChmaWdodGluZ0luZm8ud2FsbF9uYW1lLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3YWxsQmcuZ2V0Q2hpbGRCeU5hbWUoJ2JnMl93YWxsJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBhc3NldHM7XHJcbiAgICAgICAgICAgIC8vbGV0IGJjID0gd2FsbEJnLmdldENoaWxkQnlOYW1lKCd3YWxsX2Rvd24nKS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBiYy5zaXplID0gd2FsbEJnLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95ID0gd2FsbEJnLnkgKyBiYy5ub2RlLnkgKyBiYy5ub2RlLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIC8vIH0sIDAuNSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Jhb3hpYW5nKCkge1xyXG4gICAgICAgIC8v5qC55o2u5b2T5YmN5omA5Zyo5rOi5pWw5pi+56S6XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsU2hvdygpO1xyXG4gICAgICAgIHRoaXMuc2hvd0RwcygpO1xyXG4gICAgICAgIHRoaXMuc2hvd0xldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydF90aW1lID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93VGltZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgdGhpcy5zaG93Q29pbigpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9iZ19uYW1lICE9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby5iZ19uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmdJbWcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2JnX2xvYWRpbmcnKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL+W8gOWni+WKoOi9veWFs+WNoeaJgOmcgOeahOaAqueJqVxyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHByb2dyZXNzLnByb2dyZXNzID0gMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRG91YmxlKGJ0bjogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuozlgI3pgJ/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2UgJiYgdGhpcy50cnlfcmF0ZV9yYW1haW4gPD0gMCkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAxMDgpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLldlZWtDYXJkLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19hdXRvID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX3JhdGUgPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5UmF0ZUxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJ0blNldHVwUmF0ZSgpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDIpO1xyXG4gICAgICAgICAgICAgICAgLy/lkK/liqjor5XnlKhcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlICYmIHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHJ5X3JhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXreivleeUqFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9yYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQXV0bygpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oh6rliqjmiJjmlpfngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19hdXRvID09IGZhbHNlICYmIHRoaXMudHJ5X2F1dG9fcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDAwMTA3KSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5XZWVrQ2FyZCwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfYXV0byA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19yYXRlID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRBdXRvRmlnaHRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0byA9PSBmYWxzZSAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgLy/mnInliankvZnml7bpl7TvvIzlkK/nlKgv5YWz6Zet6K+V55SoXHJcbiAgICAgICAgICAgIHRoaXMuaXNfdHJ5X2F1dG8gPSAhR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfYXV0byA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63vvIzpgqPlsLHlhbPpl63orqHml7ZcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9hdXRvX3JhbWFpbilcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfYXV0b19yYW1haW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKCFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmcpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUGF1c2UoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLnRyeV9hdXRvX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfYXV0b19yYW1haW4pXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9hdXRvX3JhbWFpbik7XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X3JhdGVfcmFtYWluKVxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfcmF0ZV9yYW1haW4pO1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmNoYW5nZUhwKC1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5nZXRNYXhIcCgpKjAuNjUpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVQYXVzZSgpOy8v5pqC5YGcXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVdpbigpOy8v6IOc5YipXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTsvL+Wksei0pVxyXG4gICAgICAgIC8vY2MubG9nKGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQpO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJld2FyZFNTVUksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDEpO1xyXG4gICAgICAgIC8vICAgICB9fSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVGVzdDEoKSB7XHJcbiAgICAgICAgLy9Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRlc3QyKCkge1xyXG4gICAgICAgIC8vIGxldCBib3NzPUJvc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm9zczEnKTtcclxuICAgICAgICAvLyBpZihib3NzKXtcclxuICAgICAgICAvLyAgICAgYm9zcy5nZXRDb21wb25lbnQoQnVsbERlbW9uKS5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0Jvc3NXYXJuaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5SZXBsYXkoKSB7XHJcbiAgICAgICAgLy8gbGV0IHBvc1g9TWF0aC5yYW5kb20oKSo0MDAtMjAwO1xyXG4gICAgICAgIC8vIGxldCBwb3NZPU1hdGgucmFuZG9tKCkqNDAwLTIwMDtcclxuICAgICAgICAvLyBsZXQgcG9zPWNjLnYyKHBvc1gscG9zWSk7XHJcbiAgICAgICAgLy8gbGV0IGJ4PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfbWFuYWdlci5jcmVhdGVCYW9YaWFuZ0d1YWkocG9zKTtcclxuICAgICAgICAvLyBieC5nZXRDb21wb25lbnQoQmFvWGlhbmdHdWFpKS5pbml0KG5ldyBMZXZlbEJ1ZmYoKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkJhdHRsZXBvdGlvbihldmVudCwgdHlwZSkgey8v5oiY5paX6I2v5rC05oyJ6ZKuICAg57qiICAg57u/ICAgIOiTnVxyXG4gICAgICAgIGxldCBudW0gPSB0eXBlXHJcbiAgICAgICAgbGV0IGJhdHRsZXBvdGlvbm51bWJlciA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmJhdHRsZXBvdGlvblByb3BJZFtudW1dKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5iYXR0bGVwb3Rpb25zdGF0ZVtudW1dID09IDApIHsvL+i/meWxgOW3sue7j+eUqOi/h+S6hiAgIOmjmOWtl1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEzMCksIDMpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmsqHmnInnlKjov4dcclxuICAgICAgICAgICAgaWYgKGJhdHRsZXBvdGlvbm51bWJlciA9PSAwKSB7Ly/mlbDph4/kuI3lpJ8g5by556qX6LSt5Lmw5by556qXICAgICAgICDlpoLmnpzpkrvnn7PnmoTmlbDph4/lpJ/vvIznm7TmjqXotK3kubDkuYvlkI7kvb/nlKggIFxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CdXlCYXR0bGVQb3Rpb24sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1eUJhdHRsZVBvdGlvbikuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdXlCYXR0bGVQb3Rpb24pLmluaXRVaSh0eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGlmKFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2MzMDEnKTw9MCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/pppblhYXmsqHmnInlrozmiJAgICAg5aaC5p6c6aaW5YWF5rKh5pyJ6LSt5Lmw5bCx5by55Ye66aaW5YWFXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5GaXJzdENoYXJnZSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChQYXlGaXJzdENoYXJnZVVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9uQ2xvc2U6KCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8v6aaW5YWF5a6M5oiQ5LqGICAg5by55Ye66ZK755+z6LSt5LmwXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCLkvb/nlKjpgZPlhbc6XCIsbnVtKVxyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0blJlZCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuR3JlZW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkJsdWUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGNsaWNrQnRuUmVkKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLpgZPlhbfvvJrnuqJcIilcclxuICAgIH1cclxuICAgIGNsaWNrQnRuR3JlZW4oKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt++8mue7v1wiKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5CbHVlKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLpgZPlhbfvvJrok51cIilcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHNldFRyeUF1dG9MYWJlbCgpIHtcclxuICAgICAgICB0aGlzLnRyeV9hdXRvX2xhYmVsLm5vZGUuYWN0aXZlID0gdGhpcy50cnlfYXV0b19yYW1haW4gPiAwICYmIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1ICYmIHRoaXMuaXNfdW5sb2NrX2F1dG8gPT0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19sYWJlbC5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHRoaXMudHJ5X2F1dG9fcmFtYWluKSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRUcnlSYXRlTGFiZWwoKSB7XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNSAmJiB0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfbGFiZWwuc3RyaW5nID0gTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcih0aGlzLnRyeV9yYXRlX3JhbWFpbikpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuUmF0ZVNob3coKSB7XHJcbiAgICAgICAgbGV0IHJhdGUgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9idG5SYXRlJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gdHJ1ZSB8fCB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHJhdGVOdW0gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJ0blNldHVwUmF0ZSgpO1xyXG4gICAgICAgICAgICByYXRlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9yYXRlW3JhdGVOdW0gLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByYXRlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9yYXRlWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyeV9yYXRlX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfcmF0ZV9yYW1haW4pXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9yYXRlX3JhbWFpbik7XHJcbiAgICAgICAgcmF0ZS5hY3RpdmUgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5BdXRvKCkge1xyXG4gICAgICAgIGxldCBhdXRvID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvYnRuQXV0bycpO1xyXG4gICAgICAgIGxldCBhdXRvTnVtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nID8gMSA6IDA7XHJcbiAgICAgICAgYXV0by5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfYXV0b1thdXRvTnVtXTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0bykge1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5BdXRvRmlnaHRpbmcsIGF1dG9OdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdXRvLmFjdGl2ZSA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dUaW1lKCkge1xyXG4gICAgICAgIGxldCBzaGkgPSBNYXRoLmZsb29yKHRoaXMuc3RhcnRfdGltZSAvIDM2MDApO1xyXG4gICAgICAgIGxldCBzaGlTdHIgPSAnMCcgKyBzaGk7XHJcbiAgICAgICAgaWYgKHNoaSA+PSAxMCkge1xyXG4gICAgICAgICAgICBzaGlTdHIgPSAnJyArIHNoaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZlbiA9IE1hdGguZmxvb3IoKHRoaXMuc3RhcnRfdGltZSAtIHNoaSAqIDM2MDApIC8gNjApO1xyXG4gICAgICAgIGxldCBmZW5TdHIgPSAnMCcgKyBmZW47XHJcbiAgICAgICAgaWYgKGZlbiA+PSAxMCkge1xyXG4gICAgICAgICAgICBmZW5TdHIgPSAnJyArIGZlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pYW8gPSB0aGlzLnN0YXJ0X3RpbWUgJSA2MDtcclxuICAgICAgICBsZXQgbWlhb1N0ciA9ICcwJyArIG1pYW87XHJcbiAgICAgICAgaWYgKG1pYW8gPj0gMTApIHtcclxuICAgICAgICAgICAgbWlhb1N0ciA9ICcnICsgbWlhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsLnN0cmluZyA9IHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3MvdGltZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dSZW1haW5UaW1lKCkge1xyXG4gICAgICAgIGxldCByZW1haW5UaW1lID0gOTAgLSB0aGlzLnN0YXJ0X3RpbWU7XHJcbiAgICAgICAgbGV0IHNoaSA9IE1hdGguZmxvb3IocmVtYWluVGltZSAvIDM2MDApO1xyXG4gICAgICAgIGxldCBzaGlTdHIgPSAnMCcgKyBzaGk7XHJcbiAgICAgICAgaWYgKHNoaSA+PSAxMCkge1xyXG4gICAgICAgICAgICBzaGlTdHIgPSAnJyArIHNoaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZlbiA9IE1hdGguZmxvb3IoKHJlbWFpblRpbWUgLSBzaGkgKiAzNjAwKSAvIDYwKTtcclxuICAgICAgICBsZXQgZmVuU3RyID0gJzAnICsgZmVuO1xyXG4gICAgICAgIGlmIChmZW4gPj0gMTApIHtcclxuICAgICAgICAgICAgZmVuU3RyID0gJycgKyBmZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaWFvID0gcmVtYWluVGltZSAlIDYwO1xyXG4gICAgICAgIGxldCBtaWFvU3RyID0gJzAnICsgbWlhbztcclxuICAgICAgICBpZiAobWlhbyA+PSAxMCkge1xyXG4gICAgICAgICAgICBtaWFvU3RyID0gJycgKyBtaWFvO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwuc3RyaW5nID0gc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy90aW1lTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbWFpblRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0TGV2ZWxTaG93KCkge1xyXG4gICAgICAgIGxldCB3YXZlQmcgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvd2F2ZUJnJyk7XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlID0gd2F2ZUJnLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnY3VyX3dhdmUnKTtcclxuICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueSA9IHdhdmVCZy55IC0gMjA7XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlLnggPSAtMzE1O1xyXG4gICAgICAgIHRoaXMuZGlzdF94eCA9IC0zMTU7XHJcbiAgICAgICAgdGhpcy53YXZlX3Bvc194ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IHdhdmVUeXBlcyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKTtcclxuICAgICAgICBsZXQgbGVuID0gd2F2ZVR5cGVzLmxlbmd0aDtcclxuICAgICAgICB3YXZlQmcucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAvL+eul+WHuuavj+S4queahOmVv+W6plxyXG4gICAgICAgIGxldCBqaWFuZ2VOdW0gPSBsZW4gLSAxO1xyXG4gICAgICAgIGxldCBqaWFuZ2VXaWR0aCA9IDQ7XHJcbiAgICAgICAgbGV0IGppYW5nZVRvdGFsV2lkdGggPSBqaWFuZ2VOdW0gKiBqaWFuZ2VXaWR0aDtcclxuICAgICAgICBsZXQgd2F2ZVRvdGFsV2lkdGggPSB3YXZlQmcud2lkdGggLSA1ICogMiAtIGppYW5nZVRvdGFsV2lkdGg7XHJcbiAgICAgICAgbGV0IHdhdmVXaWR0aCA9IHdhdmVUb3RhbFdpZHRoIC8gbGVuO1xyXG4gICAgICAgIHRoaXMubGVmdF94eCA9IC13YXZlQmcud2lkdGggLyAyICsgNTtcclxuICAgICAgICBsZXQgb25lV2lkdGggPSB3YXZlV2lkdGggKyBqaWFuZ2VXaWR0aDtcclxuICAgICAgICB0aGlzLm9uZV93aWR0aCA9IG9uZVdpZHRoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSB3YXZlVHlwZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbm9ybWFsX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ib3NzX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3YXZlQmcuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUubmFtZSA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHdhdmVXaWR0aDtcclxuICAgICAgICAgICAgbm9kZS54ID0gdGhpcy5sZWZ0X3h4ICsgaSAqIG9uZVdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLnkgPSAwO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF93YXZlWzBdO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHR5cGUgPiAwO1xyXG4gICAgICAgICAgICBsZXQgamlhbmdlUG9zWCA9IG5vZGUueCArIG5vZGUud2lkdGggKyBqaWFuZ2VXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChpICE9IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuZ2UgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9qaWFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgamlhbmdlLnggPSBqaWFuZ2VQb3NYO1xyXG4gICAgICAgICAgICAgICAgamlhbmdlLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2F2ZUJnLmFkZENoaWxkKGppYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53YXZlX3Bvc194LnB1c2goamlhbmdlUG9zWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0xldmVsUHJvZ3Jlc3MoKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dMZXZlbFByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhbGxFbmVteU51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGtpbGxOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHJvZ3Jlc3M9KGtpbGxOdW0vYWxsRW5lbXlOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbF9wcm9ncmVzcy5wcm9ncmVzcz1wcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nPWtpbGxOdW0rJy8nK2FsbEVuZW15TnVtOyAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jdXJfd2F2ZV9ub2RlLng9dGhpcy53YXZlX3Bvc194W2dtLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlX3NwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IHRoaXMub25lX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVCZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS93YXZlQmcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3AgPSB3YXZlQmcuZ2V0Q2hpbGRCeU5hbWUoZ20uY3VyX3dhdmUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZXMgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uZ2V0V2F2ZVR5cGVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF93YXZlW3R5cGVzW2dtLmN1cl93YXZlXSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyV2F2ZSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmU7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBwcmV2V2F2ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlLTE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyWFggPSB0aGlzLndhdmVfcG9zX3hbY3VyV2F2ZV07XHJcbiAgICAgICAgICAgICAgICAvL2xldCBwcmV2WFg9cHJldldhdmU+PTA/dGhpcy53YXZlX3Bvc194W3ByZXZXYXZlXTp0aGlzLmxlZnRfeHg7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBvZmZzZXRYWD1jdXJYWC1wcmV2WFg7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdF94eCA9IGN1clhYO1xyXG4gICAgICAgICAgICAgICAgLy93YXZlQmcuZ2V0Q1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZGxlc3NfdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZGxlc3NfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodGhpcy5ib3NzX2NoYWxsZW5nZV90cyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5ib3NzX2NoYWxsZW5nZV90cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dKaWFuVG91UG9zKHBlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gbGV0IGN1cldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZTtcclxuICAgICAgICAvLyBsZXQgcHJldldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZS0xO1xyXG4gICAgICAgIC8vIGxldCBjdXJYWD10aGlzLndhdmVfcG9zX3hbY3VyV2F2ZV07XHJcbiAgICAgICAgLy8gbGV0IHByZXZYWD1wcmV2V2F2ZT49MD90aGlzLndhdmVfcG9zX3hbcHJldldhdmVdOnRoaXMubGVmdF94eDtcclxuICAgICAgICAvLyBsZXQgb2Zmc2V0WFg9Y3VyWFgtcHJldlhYOyAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5kaXN0X3h4PXByZXZYWCtvZmZzZXRYWCpwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvaW4oKSB7XHJcbiAgICAgICAgLy8gbGV0IGFsbEVuZW15TnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgLy8gbGV0IGtpbGxOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgLy8gdGhpcy5jb2luX2xhYmVsLnN0cmluZz1NeVRvb2wuZ2V0Q29pbkRhbndlaShraWxsTnVtL2FsbEVuZW15TnVtKnRoaXMudG90YWxfY29pbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RwcygpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgICAgIGxldCBnZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGxlbiA9IGdnLmhlcm9fc2tpbGxfZHBzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbERwcyA9IGdnLmhlcm9fc2tpbGxfZHBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgYXR0YWNrRHBzID0gZ2cuaGVyb19hdHRhY2tfZHBzW2ldO1xyXG4gICAgICAgICAgICB0b3RhbCArPSAoc2tpbGxEcHMgKyBhdHRhY2tEcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHBzID0gTWF0aC5yb3VuZCh0b3RhbCAvIHRoaXMuc3RhcnRfdGltZSk7XHJcbiAgICAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoZHBzKTsvLyAgICAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nPSdEUFMgJytNeVRvb2wuZ2V0Q29pbkRhbndlaShkcHMpO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL2Rwc0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGRwcylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBpZihJc0RlYnVnKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWknKTtcclxuICAgICAgICAvLyAgICAgbGV0IHRvdGFsPTA7XHJcbiAgICAgICAgLy8gICAgIGxldCBnZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vICAgICBsZXQgbGVuPWdnLmhlcm9fc2tpbGxfZHBzLmxlbmd0aDtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBza2lsbERwcz1nZy5oZXJvX3NraWxsX2Rwc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBhdHRhY2tEcHM9Z2cuaGVyb19hdHRhY2tfZHBzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgdG90YWwrPShza2lsbERwcythdHRhY2tEcHMpO1xyXG4gICAgICAgIC8vICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdhdHRMYWJlbCcraSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J+aUu+WHu++8micrYXR0YWNrRHBzO1xyXG4gICAgICAgIC8vICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdza2lsbExhYmVsJytpKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0n5oqA6IO977yaJytza2lsbERwcztcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgZHBzPU1hdGgucm91bmQodG90YWwvdGhpcy5zdGFydF90aW1lKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nPSdEUFMgJytkcHM7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lX2ppc2h1ID49IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0X3RpbWUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlbWFpblRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RwcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlX25vZGUueCA8IHRoaXMuZGlzdF94eCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlLnggKz0gZHQgKiAzMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSB0aGlzLm9uZV93aWR0aCAtICh0aGlzLmRpc3RfeHggLSB0aGlzLmN1cl93YXZlX25vZGUueCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZV9ub2RlLnggPiB0aGlzLmRpc3RfeHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueCA9IHRoaXMuZGlzdF94eDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFEdCA9IGR0O1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIGFEdCA9IGR0IC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYUR0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgYUR0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfYXV0byAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9hdXRvX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfYXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfcmF0ZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9yYXRlX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+iDjOaZr+W+queOr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iZzAgJiYgdGhpcy5iZzEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gZHQgKiB0aGlzLmJnU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnMC55IC09IGR0ICogdGhpcy5iZ1NwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMC55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcwLnkgPSB0aGlzLmJnMS55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMS55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl93YXZlX25vZGUueDx0aGlzLmRpc3RfeHgpe1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfVxyXG4gICAgLyoq5pWZ56iLICovXHJcbiAgICBjaGVja1R1dG9yYWlscygpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjExKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSAvIEppYVN1KTtcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTEsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjEyLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSAqIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==