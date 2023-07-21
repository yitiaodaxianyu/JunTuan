
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
        _this.indexLoad = [2, 1, 3, 0, 4];
        _this.indexData = [3, 1, 0, 2, 4];
        return _this;
    }
    // bg2_wall: cc.Node;
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
        // instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    };
    Game.prototype.onDestroy = function () {
        // instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
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
            var heroType = teamList[this.indexLoad[i]];
            if (heroType > 0) {
                this.loadHero(heroType, this.indexLoad[i]);
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
        var _this = this;
        Hero_1.default.max_load_num++;
        var xIndexTepm = posIndex;
        var yIndexTepm = posIndex;
        if (posIndex == 0) {
            xIndexTepm = 1;
        }
        if (posIndex == 4) {
            xIndexTepm = 3;
            yIndexTepm = 0;
        }
        if (posIndex == 3) {
            yIndexTepm = 1;
        }
        var posX = xIndexTepm * 45 - 90;
        var posY = yIndexTepm * 60 - 120;
        cc.resources.load('heros/hero' + heroType, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Hero_Root');
            node.x = posX;
            var hp = cc.find('Canvas/Ui_Root/hp_root');
            node.y = hp.y + posY + 150 + 300;
            node.getComponent(Hero_1.default).targetX = node.x;
            node.getComponent(Hero_1.default).posX = node.x;
            node.getComponent(Hero_1.default).posIndex = posIndex;
            node.setSiblingIndex(_this.indexData[posIndex]);
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
            // wallBg.getChildByName('bg2_wall').getComponent(cc.Sprite).spriteFrame = assets;
            // this.bg2_wall = wallBg.getChildByName('bg2_wall');
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
        console.log("初始化关卡" + waveTypes.length);
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
                    console.log("开始关卡" + gm.cur_wave);
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
            // if (this.bg2_wall) {
            //     let vx: number = (this.targetX - this.bg2_wall.x) * this.easing;
            //     this.bg2_wall.x += vx;
            // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBaUU7QUFDakUscURBQWdEO0FBRWhELDJEQUFpRTtBQUNqRSwwQ0FBOEU7QUFDOUUscUVBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELDBDQUFxQztBQUVyQyxzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCw0REFBMkQ7QUFDM0QsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQWlFO0FBQ2pFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QywwQ0FBcUM7QUFDckMsc0RBQWlEO0FBRWpELGtFQUE2RDtBQUM3RCwyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QyxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELDJEQUF3RTtBQUV4RSx3REFBbUQ7QUFFN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFvaENDO1FBamhDRyxhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFlBQVk7UUFDWixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qixn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QUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5Q0FDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNpQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNlO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ1k7SUFvQmhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDYTtJQXFCaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDVztJQTVEWixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBb2hDeEI7SUFBRCxXQUFDO0NBcGhDRCxBQW9oQ0MsQ0FwaENpQyxFQUFFLENBQUMsU0FBUyxHQW9oQzdDO2tCQXBoQ29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCBCb3NzR2FtZVVpIGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzR2FtZVVpXCI7XHJcbmltcG9ydCBFbmRsZXNzZ0dhbWVVaSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc2dHYW1lVWlcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQnVmZkRpc3BsYXkgZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvQnVmZkRpc3BsYXlcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9cIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4uL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4uL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgV2Vla0NhcmRVaSBmcm9tIFwiLi4vV2Vla0NhcmQvV2Vla0NhcmRVaVwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4vVG91Y2hQbGFuZS9Ub3VjaFBsYW5lXCI7XHJcbmltcG9ydCBCdXlCYXR0bGVQb3Rpb24gZnJvbSBcIi4vVWkvQnV5QmF0dGxlUG90aW9uXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9yYXRlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9hdXRvOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF93YXZlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ub3JtYWxfd2F2ZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYm9zc193YXZlOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9qaWFuZ2U6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICAvKirlvZPliY3ms6LmlbDoioLngrkgKi9cclxuICAgIGN1cl93YXZlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgY3VyX3dhdmVfc3A6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgd2F2ZV9wb3NfeDogbnVtYmVyW10gPSBbXTtcclxuICAgIGxlZnRfeHg6IG51bWJlciA9IDA7XHJcbiAgICBkaXN0X3h4OiBudW1iZXIgPSAwO1xyXG4gICAgb25lX3dpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIC8vIHpoZW5feGluZzpjYy5Kc29uQXNzZXQ9bnVsbDtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6humAn+eOhyAqL1xyXG4gICAgaXNfdW5sb2NrX3JhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X3JhdGVfcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X3JhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6huiHquWKqOaImOaWlyAqL1xyXG4gICAgaXNfdW5sb2NrX2F1dG86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X2F1dG9fcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X2F1dG86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X2F1dG9fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X3JhdGVfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8v5rWL6K+VXHJcbiAgICBzdGFydF90aW1lOiBudW1iZXIgPSAwO1xyXG4gICAgdGltZV9qaXNodTogbnVtYmVyID0gMDtcclxuICAgIHRpbWVfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGJnMDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBiZzE6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgZHBzX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvL+WFs+WNoei/m+W6puadoVxyXG4gICAgbGV2ZWxfcHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBjb2luX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICB0b3RhbF9jb2luOiBudW1iZXIgPSAwO1xyXG4gICAgZW5kbGVzc190czogRW5kbGVzc2dHYW1lVWkgPSBudWxsO1xyXG4gICAgLy/lvZPliY3og4zmma/kvb/nlKjnmoTlkI3np7BcclxuICAgIGN1cl9iZ19uYW1lOiBzdHJpbmcgPSAnYmcyJztcclxuXHJcbiAgICBwcml2YXRlIGJnU3BlZWQ6IG51bWJlciA9IDUwO1xyXG5cclxuICAgIC8v5oiY5paX6I2v5rC0XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJhdHRsZXBvdGlvbjogY2MuTm9kZVtdID0gW107Ly/nuqLoibIgICDnu7/oibIgICDok53oibJcclxuICAgIGJhdHRsZXBvdGlvblByb3BJZDogUHJvcElkW10gPSBbUHJvcElkLlJlZFBvdGlvbiwgUHJvcElkLkdyZWVuUG90aW9uLCBQcm9wSWQuQmx1ZVBvdGlvbl0vL+aImOaWl+iNr+awtOeahOmBk+WFt2lkXHJcbiAgICBiYXR0bGVwb3Rpb25zdGF0ZTogbnVtYmVyW10gPSBbMSwgMSwgMV0vL+aImOaWl+iNr+awtOWcqOi/meS4gOWxgOaYr+WQpuS9v+eUqOS6hiAg6buY6K6k5q+P5LiA5Liq6I2v5rC05pyJ5LiA5qyh5L2/55So55qE5py65LyaXHJcblxyXG4gICAgLy8gYmcyX3dhbGw6IGNjLk5vZGU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdChHYW1lU2NlbmUuZ2FtZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXc9dHJ1ZTtcclxuICAgICAgICB0aGlzLnNldEJnSW1nKCk7XHJcbiAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIZXJvcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFR1dG9yYWlsc0hlcm9EYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfYXV0byA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3VubG9ja19yYXRlKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3VubG9ja19hdXRvKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIDYwICogMTApO1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIDYwICogMTApO1xyXG4gICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgLy90aGlzLnN0YXJ0VGVzdCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fQmF0dGxlKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuTnVsbCwgNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgMSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsU2hvdygpO1xyXG5cclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguUmV3YXJkU1NVSSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguU3RvcmVIZXJvU2hvd1VpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGVzdENhbWVyYSgpIHtcclxuICAgICAgICAvLyDliJvlu7rmuLLmn5PnurnnkIbvvIzlubborr7nva7nurnnkIblpKflsI/lkIzmmL7npLrlsY8oc2hvd1Nwcml0ZSnlpKflsI/kuIDmoLdcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoMzAwLCAyNDApO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9UZXN0Q2FtZXJhJykuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgbGV0IHNob3dTcHJpdGUgPSBjYy5maW5kKCdDYW52YXMvVGVzdC9zaG93Um9vdC9zaG93U3ByaXRlJyk7XHJcbiAgICAgICAgc2hvd1Nwcml0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpIHtcclxuICAgICAgICAvL+S4iuS4i+aooeWdl1xyXG4gICAgICAgIGxldCB0b3BVaSA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aScpO1xyXG4gICAgICAgIGxldCB3cCA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdG9wVWkueSA9IHdwLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9wcm9ncmVzcyA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdsZXZlbFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmxldmVsX3Byb2dyZXNzLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmxldmVsX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29pbl9sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdpY29uQmcnKS5nZXRDaGlsZEJ5TmFtZSgnY29pbkxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmRwc19sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdkcHNMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy/ln47loplcclxuICAgICAgICBsZXQgd2FsbEJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsX2JnJyk7XHJcbiAgICAgICAgd2FsbEJnLnkgPSAtKGNjLndpblNpemUuaGVpZ2h0IC8gMikgKyB3YWxsQmcuaGVpZ2h0IC8gMjtcclxuICAgICAgICAvL2hwXHJcbiAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgIGhwLnkgPSAtd3AuaGVpZ2h0IC8gMiArIGhwLmhlaWdodCAtIDI3Oy8vMjfmmK/ooYDmnaHnmoTlnZDmoIdcclxuICAgICAgICB0aGlzLmJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgdGhpcy5iZzEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpO1xyXG4gICAgICAgIHRoaXMuYmcwLnkgPSBjYy53aW5TaXplLmhlaWdodCAvIDIgLSB0aGlzLmJnMC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgIC8v5LiK56Kw5pKe54K5XHJcbiAgICAgICAgLy9jYy5maW5kKCdDYW52YXMvd2FsbF9yb290L3dhbGxfdG9wJykueT10b3BVaS55O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMb2FkaW5nKCkge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmcgPSBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyID0gYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbCA9IGxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcztcclxuICAgICAgICBsZXQgbG9hZGluZ1NjaGVkdWxlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzICs9IDAuMDA1O1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nID0gKGxvYWRpbmdCYXIucHJvZ3Jlc3MgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgICAgIGlmIChsb2FkaW5nQmFyLnByb2dyZXNzID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2NoZWR1bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSwgMC4wMik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGFydEdhbWUoKSB7XHJcbiAgICAgICAgaWYgKEhlcm8uY3VyX2xvYWRlZF9udW0gPj0gSGVyby5tYXhfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgbGV0IGJnTG9hZGluZyA9IFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL5peg5bC95oyR5oiY5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYWOasoeaXoOWwveaMkeaImCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHml6DlsL3mjJHmiJgpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh5peg5bC95oyR5oiYKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1cclxuICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbG51bVxyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgICAgICAgICBudW0tLTtcclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJvdW5kIC0gMSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gKFJvdW5kIC0gMilcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDEpOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJidWZmOlwiLEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIsUm91bmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbmRleExvYWQ6IEFycmF5PG51bWJlcj4gPSBbMiwgMSwgMywgMCwgNF07XHJcbiAgICBsb2FkSGVyb3MoKSB7XHJcbiAgICAgICAgLy/ojrflj5bpmJ/liJdcclxuICAgICAgICBIZXJvLm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSA9IDA7XHJcbiAgICAgICAgUGV0Lm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgUGV0LmN1cl9sb2FkZWRfbnVtID0gMDtcclxuICAgICAgICBsZXQgdGVhbUxpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlYW1MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvVHlwZSA9IHRlYW1MaXN0W3RoaXMuaW5kZXhMb2FkW2ldXTtcclxuICAgICAgICAgICAgaWYgKGhlcm9UeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGVybyhoZXJvVHlwZSwgdGhpcy5pbmRleExvYWRbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxoZXJvUm9vdC5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgIC8vICAgICBsZXQgaGVybz1oZXJvUm9vdC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoSGVybyk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+mihOWKoOi9veW8k+aJi0hlcm9fUm9vdFxyXG4gICAgICAgIC8vIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gNSkge1xyXG4gICAgICAgIC8vICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvaGVybzgnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluZGV4RGF0YTogQXJyYXk8bnVtYmVyPiA9IFszLCAxLCAwLCAyLCA0XTtcclxuICAgIGxvYWRIZXJvKGhlcm9UeXBlOiBIZXJvX1R5cGUsIHBvc0luZGV4OiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBIZXJvLm1heF9sb2FkX251bSsrO1xyXG4gICAgICAgIGxldCB4SW5kZXhUZXBtID0gcG9zSW5kZXg7XHJcbiAgICAgICAgbGV0IHlJbmRleFRlcG0gPSBwb3NJbmRleDtcclxuICAgICAgICBpZiAocG9zSW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB4SW5kZXhUZXBtID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvc0luZGV4ID09IDQpIHtcclxuICAgICAgICAgICAgeEluZGV4VGVwbSA9IDM7XHJcbiAgICAgICAgICAgIHlJbmRleFRlcG0gPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc0luZGV4ID09IDMpIHtcclxuICAgICAgICAgICAgeUluZGV4VGVwbSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwb3NYID0geEluZGV4VGVwbSAqIDQ1IC0gOTA7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB5SW5kZXhUZXBtICogNjAgLSAxMjA7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm8nICsgaGVyb1R5cGUsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS54ID0gcG9zWDtcclxuICAgICAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLnkgPSBocC55ICsgcG9zWSArIDE1MCArIDMwMDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykudGFyZ2V0WCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykucG9zWCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykucG9zSW5kZXggPSBwb3NJbmRleDtcclxuICAgICAgICAgICAgbm9kZS5zZXRTaWJsaW5nSW5kZXgodGhpcy5pbmRleERhdGFbcG9zSW5kZXhdKTtcclxuICAgICAgICAgICAgQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZSb290KGNjLnYyKHBvc1gsIG5vZGUueSArIDE1MCksIGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNob3dLYWlaaGFuKCkge1xyXG4gICAgICAgIGxldCBrYWlaaGFuID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvS2FpWmhhbicpO1xyXG4gICAgICAgIGthaVpoYW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc3BpbmUgPSBrYWlaaGFuLmdldENoaWxkQnlOYW1lKCdLYWlaaGFuJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBsZXQgYW5pbWEgPSBzcGluZS5zZXRBbmltYXRpb24oMCwgJ0thaVpoYW4nLCBmYWxzZSk7Ly9ZWF9LYWl6aGFuXHJcbiAgICAgICAgc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKGFuaW1hLCAoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gJ0F0dGFjaycpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9LYWl6aGFuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgICAgICBrYWlaaGFuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdHVzQmF0dGxlUG90aW9uKCkge1xyXG4gICAgICAgIC8v5Yi35paw5oiY5paX6I2v5rC055qE54q25oCBXHJcbiAgICAgICAgZm9yIChsZXQgYmF0dGxlcG90aW9uaW5kZXggPSAwOyBiYXR0bGVwb3Rpb25pbmRleCA8IHRoaXMuYmF0dGxlcG90aW9uLmxlbmd0aDsgYmF0dGxlcG90aW9uaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvL+aVsOmHj1xyXG4gICAgICAgICAgICBsZXQgYmF0dGxlcG90aW9ubnVtYmVyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuYmF0dGxlcG90aW9uUHJvcElkW2JhdHRsZXBvdGlvbmluZGV4XSlcclxuICAgICAgICAgICAgLy/mlbDph4/mlLnlj5hcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiUmVkdHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiYXR0bGVwb3Rpb25udW1iZXJcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiQmF0dGxlX0xvY2tcIikuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVwb3Rpb25udW1iZXIgPT0gMCkgey8v5pWw6YeP5Li6MOWPmOeBsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9IGVsc2Ugey8v5pWw6YeP5aSn5LqOMOWPmOS6rlxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+i/meS4gOWxgOaYr+WQpueUqOS6huS4gOasoVxyXG4gICAgICAgICAgICBsZXQgd2hldGhlcnVzZSA9IHRoaXMuYmF0dGxlcG90aW9uc3RhdGVbYmF0dGxlcG90aW9uaW5kZXhdXHJcbiAgICAgICAgICAgIGlmICh3aGV0aGVydXNlID09IDApIHsvL+aVsOmHj+S4ujDlj5jngbBcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfSBlbHNlIHsvL+aVsOmHj+Wkp+S6jjDlj5jkuq5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R2FtZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIpXHJcbiAgICAgICAgdGhpcy5TdGF0dXNCYXR0bGVQb3Rpb24oKVxyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZ20uY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvaW4oKTtcclxuICAgICAgICB0aGlzLnNob3dLYWlaaGFuKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgIGxldCB0b3AgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpXCIpO1xyXG5cclxuICAgICAgICAvL2xldCBjb2luQmc9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL2ljb25CZycpO1xyXG4gICAgICAgIHN3aXRjaCAoZ20uY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbF9jb2luID0gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NSZXdhcmRfQ29pbihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL56ysTueroOeOqeWutuaVsCArIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKSk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL5oyR5oiY5YWz5Y2hICsgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5YWz5Y2hKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeWFs+WNoSk7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDAwMTcpXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC41KVxyXG5cclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkVuZGxlc3NfQnRuX0J1ZmZcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFByb2dyZXNzQmFyXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImN1ckxhYmVsXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIikuYWN0aXZlPWZhbHNlOyAgXHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LCAyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWx0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAxOCkvLzgwMDAxOFxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvL+azouaVsC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHdhdmVudW1iZXJcclxuXHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeLQk9TU+aMkeaImOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBub2RlPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vZGVCeUlkKFVJUGF0aC5Db2luUG9wKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lOb2RlKFVJUGF0aC5Db2luUG9wLG5vZGUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSwwLjUpXHJcbiAgICAgICAgICAgICAgICAvLyB9LDAuNSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoXCJ1aS9nYW1lL2VuZGxlc3NfZ2FtZV91aVwiLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdCb3NzSHBSb290JykuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5lbmRsZXNzX3RzID0gbm9kZS5nZXRDb21wb25lbnQoRW5kbGVzc2dHYW1lVWkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZW5kbGVzc190cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYWOasoWJvc3Pni6nnjI4pO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyhQk9TU+eLqeeMjik7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDPmrKFCT1NT54up54yOKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsUHJvZ3Jlc3NCYXJcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiY3VyTGFiZWxcIikuYWN0aXZlPWZhbHNlOyBcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRvdGFsbnVtXHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bSsrXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcyx0b3RhbG51bSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9ICcwLzEnO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiQm9zc1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInVpL2dhbWUvYm9zc19nYW1lX3VpXCIsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ0Jvc3NIcFJvb3QnKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NfY2hhbGxlbmdlX3RzID0gbm9kZS5nZXRDb21wb25lbnQoQm9zc0dhbWVVaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzX2NoYWxsZW5nZV90cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVfbGFiZWwubm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5jb2xvciA9IGNjLkNvbG9yLldISVRFXHJcbiAgICAgICAgICAgICAgICAvL3RvcC5nZXRDaGlsZEJ5TmFtZSgnaWNvblRpbWUnKS5jb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5UaW1lKClcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh54is5aGUKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeeIrOWhlCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5Yaw5rKz5o6i6ZmpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDAwMTcpXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0odHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1ZmYoKSB7Ly9idWZm5by556qXXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIisrKysrKytCdWZm5bGV56S65by556qXXCIpXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigwKTsvL0J1ZmblsZXnpLrlvLnnqpdcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDApOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgIGlmIChJc0RlYnVnKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coayArIFwiLOS4u+WKqOaKgOiDveWGt+WNtOaXtumXtDpcIiArIHYuc2tpbGxfdG90YWxfdGltZSArIFwiLOaUu+mAnzpcIiArIDEgLyB2Lmhlcm9fZGF0YS5nb25namlfamlhbmdlICsgXCLlop7kvKTvvJpcIiArIHYuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsIHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRBdHRyaWJ1dGVEYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRCZ0ltZygpIHtcclxuICAgICAgICAvLy9sZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgLy8gbGV0IGJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgbGV0IHdhbGxCZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9iZycpO1xyXG4gICAgICAgIGxldCB3YWxsRG93biA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJyk7XHJcbiAgICAgICAgLy/pgILphY3lnZDmoIdcclxuICAgICAgICAvLyBsZXQgaHA9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3Qvd2FsbF9yb290Jyk7XHJcbiAgICAgICAgLy8gd2FsbEJnLnk9aHAueSsxMDg7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSA9IHdhbGxCZy55ICsgd2FsbERvd24ueSArIHdhbGxEb3duLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzAueSA9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgLy/nq6BcclxuICAgICAgICAvL2xldCBuYW1lPUxldmVsTWFuYWdlci5nZXRMZXZlbE5hbWUobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm8gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm87XHJcbiAgICAgICAgbGV0IGJnTmFtZSA9IGZpZ2h0aW5nSW5mby5iZ19uYW1lO1xyXG4gICAgICAgIHRoaXMuY3VyX2JnX25hbWUgPSBiZ05hbWU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoYmdOYW1lLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJnMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICAgICAgdGhpcy5iZzEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBhc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoZmlnaHRpbmdJbmZvLndhbGxfbmFtZSwgY2MuU3ByaXRlRnJhbWUsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuU3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gd2FsbEJnLmdldENoaWxkQnlOYW1lKCdiZzJfd2FsbCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYXNzZXRzO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJnMl93YWxsID0gd2FsbEJnLmdldENoaWxkQnlOYW1lKCdiZzJfd2FsbCcpO1xyXG4gICAgICAgICAgICAvL2xldCBiYyA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJykuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgYmMuc2l6ZSA9IHdhbGxCZy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSA9IHdhbGxCZy55ICsgYmMubm9kZS55ICsgYmMubm9kZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvLyB9LCAwLjUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCYW94aWFuZygpIHtcclxuICAgICAgICAvL+agueaNruW9k+WJjeaJgOWcqOazouaVsOaYvuekulxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5leHRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLmluaXRMZXZlbFNob3coKTtcclxuICAgICAgICB0aGlzLnNob3dEcHMoKTtcclxuICAgICAgICB0aGlzLnNob3dMZXZlbFByb2dyZXNzKCk7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRfdGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvaW4oKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJfYmdfbmFtZSAhPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uYmdfbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJnSW1nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmcgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9iZ19sb2FkaW5nJyk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/lvIDlp4vliqDovb3lhbPljaHmiYDpnIDnmoTmgKrnialcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBwcm9ncmVzcy5wcm9ncmVzcyA9IDAuMDtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkRvdWJsZShidG46IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf54K55Ye75qyh5pWwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlICYmIHRoaXMudHJ5X3JhdGVfcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDAwMTA4KSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5XZWVrQ2FyZCwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfYXV0byA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19yYXRlID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdG5TZXR1cFJhdGUoKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgyKTtcclxuICAgICAgICAgICAgICAgIC8v5ZCv5Yqo6K+V55SoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9yYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63or5XnlKhcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkF1dG8oKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX54K55Ye75qyh5pWwKTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0byA9PSBmYWxzZSAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDEwNykpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX2F1dG8gPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8gPT0gZmFsc2UgJiYgdGhpcy50cnlfYXV0b19yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pyJ5Ymp5L2Z5pe26Ze077yM5ZCv55SoL+WFs+mXreivleeUqFxyXG4gICAgICAgICAgICB0aGlzLmlzX3RyeV9hdXRvID0gIUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfdHJ5X2F1dG8gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5YWz6Zet77yM6YKj5bCx5YWz6Zet6K6h5pe2XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeV9hdXRvX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfYXV0b19yYW1haW4pXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIHRoaXMudHJ5X2F1dG9fcmFtYWluKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyghR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blBhdXNlKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X2F1dG9fcmFtYWluKVxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfYXV0b19yYW1haW4pO1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9yYXRlX3JhbWFpbilcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIHRoaXMudHJ5X3JhdGVfcmFtYWluKTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5jaGFuZ2VIcCgtR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuZ2V0TWF4SHAoKSowLjY1KTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lUGF1c2UoKTsvL+aaguWBnFxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVXaW4oKTsvL+iDnOWIqVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7Ly/lpLHotKVcclxuICAgICAgICAvL2NjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSZXdhcmRTU1VpKS5pbml0RGF0YSgxKTtcclxuICAgICAgICAvLyAgICAgfX0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRlc3QxKCkge1xyXG4gICAgICAgIC8vU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0MigpIHtcclxuICAgICAgICAvLyBsZXQgYm9zcz1Cb3NzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3MxJyk7XHJcbiAgICAgICAgLy8gaWYoYm9zcyl7XHJcbiAgICAgICAgLy8gICAgIGJvc3MuZ2V0Q29tcG9uZW50KEJ1bGxEZW1vbikuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCb3NzV2FybmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVwbGF5KCkge1xyXG4gICAgICAgIC8vIGxldCBwb3NYPU1hdGgucmFuZG9tKCkqNDAwLTIwMDtcclxuICAgICAgICAvLyBsZXQgcG9zWT1NYXRoLnJhbmRvbSgpKjQwMC0yMDA7XHJcbiAgICAgICAgLy8gbGV0IHBvcz1jYy52Mihwb3NYLHBvc1kpO1xyXG4gICAgICAgIC8vIGxldCBieD1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X21hbmFnZXIuY3JlYXRlQmFvWGlhbmdHdWFpKHBvcyk7XHJcbiAgICAgICAgLy8gYnguZ2V0Q29tcG9uZW50KEJhb1hpYW5nR3VhaSkuaW5pdChuZXcgTGV2ZWxCdWZmKCkpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CYXR0bGVwb3Rpb24oZXZlbnQsIHR5cGUpIHsvL+aImOaWl+iNr+awtOaMiemSriAgIOe6oiAgIOe7vyAgICDok51cclxuICAgICAgICBsZXQgbnVtID0gdHlwZVxyXG4gICAgICAgIGxldCBiYXR0bGVwb3Rpb25udW1iZXIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5iYXR0bGVwb3Rpb25Qcm9wSWRbbnVtXSlcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmF0dGxlcG90aW9uc3RhdGVbbnVtXSA9PSAwKSB7Ly/ov5nlsYDlt7Lnu4/nlKjov4fkuoYgICDpo5jlrZdcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMzApLCAzKTtcclxuICAgICAgICB9IGVsc2Ugey8v5aaC5p6c5rKh5pyJ55So6L+HXHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVwb3Rpb25udW1iZXIgPT0gMCkgey8v5pWw6YeP5LiN5aSfIOW8ueeql+i0reS5sOW8ueeqlyAgICAgICAg5aaC5p6c6ZK755+z55qE5pWw6YeP5aSf77yM55u05o6l6LSt5Lmw5LmL5ZCO5L2/55SoICBcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQnV5QmF0dGxlUG90aW9uLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdXlCYXR0bGVQb3Rpb24pLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnV5QmF0dGxlUG90aW9uKS5pbml0VWkodHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8v6aaW5YWF5rKh5pyJ5a6M5oiQICAgIOWmguaenOmmluWFheayoeaciei0reS5sOWwseW8ueWHuummluWFhVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmlyc3RDaGFyZ2UsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+mmluWFheWujOaIkOS6hiAgIOW8ueWHuumSu+efs+i0reS5sFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5L2/55So6YGT5YW3OlwiLG51bSlcclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5SZWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkdyZWVuKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5CbHVlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blJlZCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya57qiXCIpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkdyZWVuKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLpgZPlhbfvvJrnu79cIilcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQmx1ZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya6JOdXCIpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzZXRUcnlBdXRvTGFiZWwoKSB7XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19sYWJlbC5ub2RlLmFjdGl2ZSA9IHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNSAmJiB0aGlzLmlzX3VubG9ja19hdXRvID09IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fbGFiZWwuc3RyaW5nID0gTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcih0aGlzLnRyeV9hdXRvX3JhbWFpbikpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0VHJ5UmF0ZUxhYmVsKCkge1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfbGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDAgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDUgJiYgdGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyeV9yYXRlX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodGhpcy50cnlfcmF0ZV9yYW1haW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blJhdGVTaG93KCkge1xyXG4gICAgICAgIGxldCByYXRlID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvYnRuUmF0ZScpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IHRydWUgfHwgdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByYXRlTnVtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdG5TZXR1cFJhdGUoKTtcclxuICAgICAgICAgICAgcmF0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfcmF0ZVtyYXRlTnVtIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmF0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfcmF0ZVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X3JhdGVfcmFtYWluKVxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfcmF0ZV9yYW1haW4pO1xyXG4gICAgICAgIHJhdGUuYWN0aXZlID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuQXV0bygpIHtcclxuICAgICAgICBsZXQgYXV0byA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2J0bkF1dG8nKTtcclxuICAgICAgICBsZXQgYXV0b051bSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZyA/IDEgOiAwO1xyXG4gICAgICAgIGF1dG8uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX2F1dG9bYXV0b051bV07XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQXV0b0ZpZ2h0aW5nLCBhdXRvTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXV0by5hY3RpdmUgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGltZSgpIHtcclxuICAgICAgICBsZXQgc2hpID0gTWF0aC5mbG9vcih0aGlzLnN0YXJ0X3RpbWUgLyAzNjAwKTtcclxuICAgICAgICBsZXQgc2hpU3RyID0gJzAnICsgc2hpO1xyXG4gICAgICAgIGlmIChzaGkgPj0gMTApIHtcclxuICAgICAgICAgICAgc2hpU3RyID0gJycgKyBzaGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmZW4gPSBNYXRoLmZsb29yKCh0aGlzLnN0YXJ0X3RpbWUgLSBzaGkgKiAzNjAwKSAvIDYwKTtcclxuICAgICAgICBsZXQgZmVuU3RyID0gJzAnICsgZmVuO1xyXG4gICAgICAgIGlmIChmZW4gPj0gMTApIHtcclxuICAgICAgICAgICAgZmVuU3RyID0gJycgKyBmZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaWFvID0gdGhpcy5zdGFydF90aW1lICUgNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHIgPSAnMCcgKyBtaWFvO1xyXG4gICAgICAgIGlmIChtaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIG1pYW9TdHIgPSAnJyArIG1pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZV9sYWJlbC5zdHJpbmcgPSBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UmVtYWluVGltZSgpIHtcclxuICAgICAgICBsZXQgcmVtYWluVGltZSA9IDkwIC0gdGhpcy5zdGFydF90aW1lO1xyXG4gICAgICAgIGxldCBzaGkgPSBNYXRoLmZsb29yKHJlbWFpblRpbWUgLyAzNjAwKTtcclxuICAgICAgICBsZXQgc2hpU3RyID0gJzAnICsgc2hpO1xyXG4gICAgICAgIGlmIChzaGkgPj0gMTApIHtcclxuICAgICAgICAgICAgc2hpU3RyID0gJycgKyBzaGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmZW4gPSBNYXRoLmZsb29yKChyZW1haW5UaW1lIC0gc2hpICogMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgbGV0IGZlblN0ciA9ICcwJyArIGZlbjtcclxuICAgICAgICBpZiAoZmVuID49IDEwKSB7XHJcbiAgICAgICAgICAgIGZlblN0ciA9ICcnICsgZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbyA9IHJlbWFpblRpbWUgJSA2MDtcclxuICAgICAgICBsZXQgbWlhb1N0ciA9ICcwJyArIG1pYW87XHJcbiAgICAgICAgaWYgKG1pYW8gPj0gMTApIHtcclxuICAgICAgICAgICAgbWlhb1N0ciA9ICcnICsgbWlhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsLnN0cmluZyA9IHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3MvdGltZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZW1haW5UaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExldmVsU2hvdygpIHtcclxuICAgICAgICBsZXQgd2F2ZUJnID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL3dhdmVCZycpO1xyXG4gICAgICAgIHRoaXMuY3VyX3dhdmVfbm9kZSA9IHdhdmVCZy5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2N1cl93YXZlJyk7XHJcbiAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlLnkgPSB3YXZlQmcueSAtIDIwO1xyXG4gICAgICAgIHRoaXMuY3VyX3dhdmVfbm9kZS54ID0gLTMxNTtcclxuICAgICAgICB0aGlzLmRpc3RfeHggPSAtMzE1O1xyXG4gICAgICAgIHRoaXMud2F2ZV9wb3NfeCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCB3YXZlVHlwZXMgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uZ2V0V2F2ZVR5cGVzKCk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGVuID0gd2F2ZVR5cGVzLmxlbmd0aDtcclxuICAgICAgICB3YXZlQmcucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAvL+eul+WHuuavj+S4queahOmVv+W6plxyXG4gICAgICAgIGxldCBqaWFuZ2VOdW0gPSBsZW4gLSAxO1xyXG4gICAgICAgIGxldCBqaWFuZ2VXaWR0aCA9IDQ7XHJcbiAgICAgICAgbGV0IGppYW5nZVRvdGFsV2lkdGggPSBqaWFuZ2VOdW0gKiBqaWFuZ2VXaWR0aDtcclxuICAgICAgICBsZXQgd2F2ZVRvdGFsV2lkdGggPSB3YXZlQmcud2lkdGggLSA1ICogMiAtIGppYW5nZVRvdGFsV2lkdGg7XHJcbiAgICAgICAgbGV0IHdhdmVXaWR0aCA9IHdhdmVUb3RhbFdpZHRoIC8gbGVuO1xyXG4gICAgICAgIHRoaXMubGVmdF94eCA9IC13YXZlQmcud2lkdGggLyAyICsgNTtcclxuICAgICAgICBsZXQgb25lV2lkdGggPSB3YXZlV2lkdGggKyBqaWFuZ2VXaWR0aDtcclxuICAgICAgICB0aGlzLm9uZV93aWR0aCA9IG9uZVdpZHRoO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyW5YWz5Y2hXCIrd2F2ZVR5cGVzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHdhdmVUeXBlc1tpXTtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ub3JtYWxfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2Jvc3Nfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdhdmVCZy5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5uYW1lID0gaS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBub2RlLndpZHRoID0gd2F2ZVdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLnggPSB0aGlzLmxlZnRfeHggKyBpICogb25lV2lkdGg7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3dhdmVbMF07XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHlwZSA+IDA7XHJcbiAgICAgICAgICAgIGxldCBqaWFuZ2VQb3NYID0gbm9kZS54ICsgbm9kZS53aWR0aCArIGppYW5nZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKGkgIT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGppYW5nZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2ppYW5nZSk7XHJcbiAgICAgICAgICAgICAgICBqaWFuZ2UueCA9IGppYW5nZVBvc1g7XHJcbiAgICAgICAgICAgICAgICBqaWFuZ2UueSA9IDA7XHJcbiAgICAgICAgICAgICAgICB3YXZlQmcuYWRkQ2hpbGQoamlhbmdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndhdmVfcG9zX3gucHVzaChqaWFuZ2VQb3NYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93TGV2ZWxQcm9ncmVzcygpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xldmVsUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2ggKGdtLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGFsbEVuZW15TnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQga2lsbE51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwcm9ncmVzcz0oa2lsbE51bS9hbGxFbmVteU51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxldmVsX3Byb2dyZXNzLnByb2dyZXNzPXByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmc9a2lsbE51bSsnLycrYWxsRW5lbXlOdW07ICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cl93YXZlX25vZGUueD10aGlzLndhdmVfcG9zX3hbZ20uY3VyX3dhdmVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmVfc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZUJnID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL3dhdmVCZycpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vlhbPljaFcIitnbS5jdXJfd2F2ZSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwID0gd2F2ZUJnLmdldENoaWxkQnlOYW1lKGdtLmN1cl93YXZlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGVzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfd2F2ZVt0eXBlc1tnbS5jdXJfd2F2ZV0gKyAxXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cldhdmUgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcHJldldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZS0xO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1clhYID0gdGhpcy53YXZlX3Bvc194W2N1cldhdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcHJldlhYPXByZXZXYXZlPj0wP3RoaXMud2F2ZV9wb3NfeFtwcmV2V2F2ZV06dGhpcy5sZWZ0X3h4O1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgb2Zmc2V0WFg9Y3VyWFgtcHJldlhYOyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RfeHggPSBjdXJYWDtcclxuICAgICAgICAgICAgICAgIC8vd2F2ZUJnLmdldENcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRsZXNzX3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRsZXNzX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgR2FtZU1vZGUuQm9zc19QcnNvbmFsOntcclxuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuYm9zc19jaGFsbGVuZ2VfdHMpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYm9zc19jaGFsbGVuZ2VfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SmlhblRvdVBvcyhwZXI6IG51bWJlcikge1xyXG4gICAgICAgIC8vIGxldCBjdXJXYXZlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmU7XHJcbiAgICAgICAgLy8gbGV0IHByZXZXYXZlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmUtMTtcclxuICAgICAgICAvLyBsZXQgY3VyWFg9dGhpcy53YXZlX3Bvc194W2N1cldhdmVdO1xyXG4gICAgICAgIC8vIGxldCBwcmV2WFg9cHJldldhdmU+PTA/dGhpcy53YXZlX3Bvc194W3ByZXZXYXZlXTp0aGlzLmxlZnRfeHg7XHJcbiAgICAgICAgLy8gbGV0IG9mZnNldFhYPWN1clhYLXByZXZYWDsgICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMuZGlzdF94eD1wcmV2WFgrb2Zmc2V0WFgqcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dDb2luKCkge1xyXG4gICAgICAgIC8vIGxldCBhbGxFbmVteU51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIC8vIGxldCBraWxsTnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIC8vIHRoaXMuY29pbl9sYWJlbC5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkoa2lsbE51bS9hbGxFbmVteU51bSp0aGlzLnRvdGFsX2NvaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dEcHMoKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcclxuICAgICAgICBsZXQgZ2cgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsZW4gPSBnZy5oZXJvX3NraWxsX2Rwcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGxEcHMgPSBnZy5oZXJvX3NraWxsX2Rwc1tpXTtcclxuICAgICAgICAgICAgbGV0IGF0dGFja0RwcyA9IGdnLmhlcm9fYXR0YWNrX2Rwc1tpXTtcclxuICAgICAgICAgICAgdG90YWwgKz0gKHNraWxsRHBzICsgYXR0YWNrRHBzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRwcyA9IE1hdGgucm91bmQodG90YWwgLyB0aGlzLnN0YXJ0X3RpbWUpO1xyXG4gICAgICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKGRwcyk7Ly8gICAgICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZz0nRFBTICcrTXlUb29sLmdldENvaW5EYW53ZWkoZHBzKTtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy9kcHNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShkcHMpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCB0b3A9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpJyk7XHJcbiAgICAgICAgLy8gICAgIGxldCB0b3RhbD0wO1xyXG4gICAgICAgIC8vICAgICBsZXQgZ2c9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyAgICAgbGV0IGxlbj1nZy5oZXJvX3NraWxsX2Rwcy5sZW5ndGg7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2tpbGxEcHM9Z2cuaGVyb19za2lsbF9kcHNbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYXR0YWNrRHBzPWdnLmhlcm9fYXR0YWNrX2Rwc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgIHRvdGFsKz0oc2tpbGxEcHMrYXR0YWNrRHBzKTtcclxuICAgICAgICAvLyAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnYXR0TGFiZWwnK2kpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSfmlLvlh7vvvJonK2F0dGFja0RwcztcclxuICAgICAgICAvLyAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnc2tpbGxMYWJlbCcraSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J+aKgOiDve+8micrc2tpbGxEcHM7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbGV0IGRwcz1NYXRoLnJvdW5kKHRvdGFsL3RoaXMuc3RhcnRfdGltZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZz0nRFBTICcrZHBzO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVfamlzaHUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVfamlzaHUgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfdGltZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHBzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhdmVfbm9kZS54IDwgdGhpcy5kaXN0X3h4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueCArPSBkdCAqIDMwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IHRoaXMub25lX3dpZHRoIC0gKHRoaXMuZGlzdF94eCAtIHRoaXMuY3VyX3dhdmVfbm9kZS54KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlX25vZGUueCA+IHRoaXMuZGlzdF94eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfbm9kZS54ID0gdGhpcy5kaXN0X3h4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSB0aGlzLm9uZV93aWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYUR0ID0gZHQ7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgYUR0ID0gZHQgLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhRHQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBhRHQgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9hdXRvICYmIHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gLT0gYUR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJ5X2F1dG9fcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9yYXRlICYmIHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gLT0gYUR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJ5X3JhdGVfcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9yYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6IOM5pmv5b6q546vXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJnMCAmJiB0aGlzLmJnMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZzEueSAtPSBkdCAqIHRoaXMuYmdTcGVlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmcwLnkgLT0gZHQgKiB0aGlzLmJnU3BlZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmcwLnkgPD0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMiAtIGNjLndpblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZzAueSA9IHRoaXMuYmcxLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmcxLnkgPD0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMiAtIGNjLndpblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmJnMl93YWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLmJnMl93YWxsLngpICogdGhpcy5lYXNpbmc7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJnMl93YWxsLnggKz0gdng7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvdGVjdGVkIGxhdGVVcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY3VyX3dhdmVfbm9kZS54PHRoaXMuZGlzdF94eCl7XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyB9XHJcbiAgICAvKirmlZnnqIsgKi9cclxuICAgIGNoZWNrVHV0b3JhaWxzKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lUmF0ZSgxIC8gSmlhU3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIxMSwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTIsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIxMywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxICogR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19