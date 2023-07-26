
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
        _this.bgSpeed = 60;
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
            node.x = (GameManager_1.default.getInstance().aniType - 4) * 75 + posX;
            var hp = cc.find('Canvas/Ui_Root/hp_root');
            node.y = hp.y + posY + 150 + 300;
            node.getComponent(Hero_1.default).targetX = node.x;
            node.getComponent(Hero_1.default).posX = posX;
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
        // let auto = cc.find('Canvas/Ui_Root/btnAuto');
        // let autoNum = GameManager.getInstance().auto_fighting ? 1 : 0;
        // auto.getComponent(cc.Sprite).spriteFrame = this.sp_auto[autoNum];
        // if (this.is_unlock_auto) {
        //     TheStorageManager.getInstance().setItem(StorageKey.AutoFighting, autoNum);
        // }
        // auto.active = LevelManager.getInstance().finish_level >= 5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBaUU7QUFDakUscURBQWdEO0FBRWhELDJEQUFpRTtBQUNqRSwwQ0FBOEU7QUFDOUUscUVBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELDBDQUFxQztBQUVyQyxzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCw0REFBMkQ7QUFDM0QsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQWlFO0FBQ2pFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QywwQ0FBcUM7QUFDckMsc0RBQWlEO0FBRWpELGtFQUE2RDtBQUM3RCwyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QyxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELDJEQUF3RTtBQUV4RSx3REFBbUQ7QUFFN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFxaENDO1FBbGhDRyxhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFlBQVk7UUFDWixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qixn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QUFFLENBQUMsS0FBSyxDQUFDO2dEQUNhO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2E7SUFxQmhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1c7SUE1RFosSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXFoQ3hCO0lBQUQsV0FBQztDQXJoQ0QsQUFxaENDLENBcmhDaUMsRUFBRSxDQUFDLFNBQVMsR0FxaEM3QztrQkFyaENvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgQm9zc0dhbWVVaSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0dhbWVVaVwiO1xyXG5pbXBvcnQgRW5kbGVzc2dHYW1lVWkgZnJvbSBcIi4uL0FjdGl2aXR5L0VuZGxlc3NnR2FtZVVpXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IHsgR2FtZU1vZGUsIEdhbWVTY2VuZSwgR2FtZVN0YXRlLCBJc0RlYnVnLCBKaWFTdSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJ1ZmZEaXNwbGF5IGZyb20gXCIuLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5XCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9EaW5nWXVlTWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuLi9QZXQvR2FtZS9QZXRcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBSZXdhcmRTU1VpIGZyb20gXCIuLi9UdXRvcmlhbHMvUmV3YXJkU1NVaVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFdlZWtDYXJkVWkgZnJvbSBcIi4uL1dlZWtDYXJkL1dlZWtDYXJkVWlcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4vQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBpbnN0YW5jZSB9IGZyb20gXCIuL1RvdWNoUGxhbmUvVG91Y2hQbGFuZVwiO1xyXG5pbXBvcnQgQnV5QmF0dGxlUG90aW9uIGZyb20gXCIuL1VpL0J1eUJhdHRsZVBvdGlvblwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfcmF0ZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfYXV0bzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3Bfd2F2ZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfbm9ybWFsX3dhdmU6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2Jvc3Nfd2F2ZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfamlhbmdlOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN5rOi5pWw6IqC54K5ICovXHJcbiAgICBjdXJfd2F2ZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGN1cl93YXZlX3NwOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHdhdmVfcG9zX3g6IG51bWJlcltdID0gW107XHJcbiAgICBsZWZ0X3h4OiBudW1iZXIgPSAwO1xyXG4gICAgZGlzdF94eDogbnVtYmVyID0gMDtcclxuICAgIG9uZV93aWR0aDogbnVtYmVyID0gMDtcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Kc29uQXNzZXQpXHJcbiAgICAvLyB6aGVuX3hpbmc6Y2MuSnNvbkFzc2V0PW51bGw7XHJcbiAgICAvKirmmK/lkKbop6PplIHkuobpgJ/njocgKi9cclxuICAgIGlzX3VubG9ja19yYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyeV9yYXRlX3JhbWFpbjogbnVtYmVyID0gNjAgKiAxMDtcclxuICAgIGlzX3RyeV9yYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKbop6PplIHkuoboh6rliqjmiJjmlpcgKi9cclxuICAgIGlzX3VubG9ja19hdXRvOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyeV9hdXRvX3JhbWFpbjogbnVtYmVyID0gNjAgKiAxMDtcclxuICAgIGlzX3RyeV9hdXRvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiror5XnlKjmlofmnKwgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRyeV9hdXRvX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKiror5XnlKjmlofmnKwgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRyeV9yYXRlX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvL+a1i+ivlVxyXG4gICAgc3RhcnRfdGltZTogbnVtYmVyID0gMDtcclxuICAgIHRpbWVfamlzaHU6IG51bWJlciA9IDA7XHJcbiAgICB0aW1lX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBiZzA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgYmcxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGRwc19sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLy/lhbPljaHov5vluqbmnaFcclxuICAgIGxldmVsX3Byb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgICBsZXZlbF9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgY29pbl9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgdG90YWxfY29pbjogbnVtYmVyID0gMDtcclxuICAgIGVuZGxlc3NfdHM6IEVuZGxlc3NnR2FtZVVpID0gbnVsbDtcclxuICAgIC8v5b2T5YmN6IOM5pmv5L2/55So55qE5ZCN56ewXHJcbiAgICBjdXJfYmdfbmFtZTogc3RyaW5nID0gJ2JnMic7XHJcblxyXG4gICAgcHJpdmF0ZSBiZ1NwZWVkOiBudW1iZXIgPSA2MDtcclxuXHJcbiAgICAvL+aImOaWl+iNr+awtFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiYXR0bGVwb3Rpb246IGNjLk5vZGVbXSA9IFtdOy8v57qi6ImyICAg57u/6ImyICAg6JOd6ImyXHJcbiAgICBiYXR0bGVwb3Rpb25Qcm9wSWQ6IFByb3BJZFtdID0gW1Byb3BJZC5SZWRQb3Rpb24sIFByb3BJZC5HcmVlblBvdGlvbiwgUHJvcElkLkJsdWVQb3Rpb25dLy/miJjmlpfoja/msLTnmoTpgZPlhbdpZFxyXG4gICAgYmF0dGxlcG90aW9uc3RhdGU6IG51bWJlcltdID0gWzEsIDEsIDFdLy/miJjmlpfoja/msLTlnKjov5nkuIDlsYDmmK/lkKbkvb/nlKjkuoYgIOm7mOiupOavj+S4gOS4quiNr+awtOacieS4gOasoeS9v+eUqOeahOacuuS8mlxyXG5cclxuICAgIC8vIGJnMl93YWxsOiBjYy5Ob2RlO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXQoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3PXRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRCZ0ltZygpO1xyXG4gICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGVyb3MoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRUdXRvcmFpbHNIZXJvRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX2F1dG8gPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX3JhdGUgPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc191bmxvY2tfcmF0ZSkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc191bmxvY2tfYXV0bykge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyeV9hdXRvX3JhbWFpbiA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLCA2MCAqIDEwKTtcclxuICAgICAgICB0aGlzLnRyeV9yYXRlX3JhbWFpbiA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCA2MCAqIDEwKTtcclxuICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJ5UmF0ZUxhYmVsKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIC8vdGhpcy5zdGFydFRlc3QoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX0JhdHRsZSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLk51bGwsIDQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC51aV9tb25zdGVyX3dhcm5pbmcsIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICB0aGlzLmluaXRMZXZlbFNob3coKTtcclxuXHJcbiAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wcmVsb2FkVWlCeVBhdGgoVUlQYXRoLlJld2FyZFNTVUkpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wcmVsb2FkVWlCeVBhdGgoVUlQYXRoLlN0b3JlSGVyb1Nob3dVaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRlc3RDYW1lcmEoKSB7XHJcbiAgICAgICAgLy8g5Yib5bu65riy5p+T57q555CG77yM5bm26K6+572u57q555CG5aSn5bCP5ZCM5pi+56S65bGPKHNob3dTcHJpdGUp5aSn5bCP5LiA5qC3XHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuUmVuZGVyVGV4dHVyZSgpO1xyXG4gICAgICAgIHRleHR1cmUuaW5pdFdpdGhTaXplKDMwMCwgMjQwKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVGVzdENhbWVyYScpLmdldENvbXBvbmVudChjYy5DYW1lcmEpLnRhcmdldFRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGxldCBzaG93U3ByaXRlID0gY2MuZmluZCgnQ2FudmFzL1Rlc3Qvc2hvd1Jvb3Qvc2hvd1Nwcml0ZScpO1xyXG4gICAgICAgIHNob3dTcHJpdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKSB7XHJcbiAgICAgICAgLy/kuIrkuIvmqKHlnZdcclxuICAgICAgICBsZXQgdG9wVWkgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWknKTtcclxuICAgICAgICBsZXQgd3AgPSBjYy53aW5TaXplO1xyXG4gICAgICAgIHRvcFVpLnkgPSB3cC5oZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMudGltZV9sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCd0aW1lTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfcHJvZ3Jlc3MgPSB0b3BVaS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9wcm9ncmVzcy5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmNvaW5fbGFiZWwgPSB0b3BVaS5nZXRDaGlsZEJ5TmFtZSgnaWNvbkJnJykuZ2V0Q2hpbGRCeU5hbWUoJ2NvaW5MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5kcHNfbGFiZWwgPSB0b3BVaS5nZXRDaGlsZEJ5TmFtZSgnZHBzTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8v5Z+O5aKZXHJcbiAgICAgICAgbGV0IHdhbGxCZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9iZycpO1xyXG4gICAgICAgIHdhbGxCZy55ID0gLShjYy53aW5TaXplLmhlaWdodCAvIDIpICsgd2FsbEJnLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy9ocFxyXG4gICAgICAgIGxldCBocCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICBocC55ID0gLXdwLmhlaWdodCAvIDIgKyBocC5oZWlnaHQgLSAyNzsvLzI35piv6KGA5p2h55qE5Z2Q5qCHXHJcbiAgICAgICAgdGhpcy5iZzAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMCcpO1xyXG4gICAgICAgIHRoaXMuYmcxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZzEnKTtcclxuICAgICAgICB0aGlzLmJnMC55ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLmJnMS55ID0gdGhpcy5iZzAueSArIHRoaXMuYmcwLmhlaWdodDtcclxuICAgICAgICAvL+S4iueisOaSnueCuVxyXG4gICAgICAgIC8vY2MuZmluZCgnQ2FudmFzL3dhbGxfcm9vdC93YWxsX3RvcCcpLnk9dG9wVWkueTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9hZGluZygpIHtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2xvYWRfcHJvZ3Jlc3M7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdTY2hlZHVsZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyArPSAwLjAwNTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZyA9IChsb2FkaW5nQmFyLnByb2dyZXNzICogMTAwKS50b0ZpeGVkKDApICsgJyUnO1xyXG4gICAgICAgICAgICBpZiAobG9hZGluZ0Jhci5wcm9ncmVzcyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ1NjaGVkdWxlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUsIDAuMDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIGlmIChIZXJvLmN1cl9sb2FkZWRfbnVtID49IEhlcm8ubWF4X2xvYWRfbnVtKSB7XHJcbiAgICAgICAgICAgIGxldCBiZ0xvYWRpbmcgPSBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuRW5kbGVzcykge1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuW8gOWni+aXoOWwveaMkeaImOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImFjmrKHml6DlsL3mjJHmiJgpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5peg5bC95oyR5oiYKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeaXoOWwveaMkeaImCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgdG90YWxudW1cclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bSsrXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLHRvdGFsbnVtKTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMClcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChSb3VuZCAtIDEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQnVmZkRpc3BsYXkuc3VycGx1c251bWJlciA9IChSb3VuZCAtIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigxKTsvL0J1ZmbpgInmi6nlvLnnqpdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQnVmZkRpc3BsYXkuc3VycGx1c251bWJlciA9IC0xXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYnVmZjpcIixCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyLFJvdW5kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICB9LCAwLjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5kZXhMb2FkOiBBcnJheTxudW1iZXI+ID0gWzIsIDEsIDMsIDAsIDRdO1xyXG4gICAgbG9hZEhlcm9zKCkge1xyXG4gICAgICAgIC8v6I635Y+W6Zif5YiXXHJcbiAgICAgICAgSGVyby5tYXhfbG9hZF9udW0gPSAwO1xyXG4gICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0gPSAwO1xyXG4gICAgICAgIFBldC5tYXhfbG9hZF9udW0gPSAwO1xyXG4gICAgICAgIFBldC5jdXJfbG9hZGVkX251bSA9IDA7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZWFtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb1R5cGUgPSB0ZWFtTGlzdFt0aGlzLmluZGV4TG9hZFtpXV07XHJcbiAgICAgICAgICAgIGlmIChoZXJvVHlwZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEhlcm8oaGVyb1R5cGUsIHRoaXMuaW5kZXhMb2FkW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8aGVyb1Jvb3QuY2hpbGRyZW5Db3VudDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgbGV0IGhlcm89aGVyb1Jvb3QuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KEhlcm8pO1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/pooTliqDovb3lvJPmiYtIZXJvX1Jvb3RcclxuICAgICAgICAvLyBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lID09IGZhbHNlICYmIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDUpIHtcclxuICAgICAgICAvLyAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm84Jyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbmRleERhdGE6IEFycmF5PG51bWJlcj4gPSBbMywgMSwgMCwgMiwgNF07XHJcbiAgICBsb2FkSGVybyhoZXJvVHlwZTogSGVyb19UeXBlLCBwb3NJbmRleDogbnVtYmVyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgSGVyby5tYXhfbG9hZF9udW0rKztcclxuICAgICAgICBsZXQgeEluZGV4VGVwbSA9IHBvc0luZGV4O1xyXG4gICAgICAgIGxldCB5SW5kZXhUZXBtID0gcG9zSW5kZXg7XHJcbiAgICAgICAgaWYgKHBvc0luZGV4ID09IDApIHtcclxuICAgICAgICAgICAgeEluZGV4VGVwbSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3NJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgIHhJbmRleFRlcG0gPSAzO1xyXG4gICAgICAgICAgICB5SW5kZXhUZXBtID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3NJbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAgIHlJbmRleFRlcG0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zWCA9IHhJbmRleFRlcG0gKiA0NSAtIDkwO1xyXG4gICAgICAgIGxldCBwb3NZID0geUluZGV4VGVwbSAqIDYwIC0gMTIwO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvJyArIGhlcm9UeXBlLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSA0KSAqIDc1ICsgcG9zWDtcclxuICAgICAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLnkgPSBocC55ICsgcG9zWSArIDE1MCArIDMwMDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykudGFyZ2V0WCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykucG9zWCA9IHBvc1g7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm8pLnBvc0luZGV4ID0gcG9zSW5kZXg7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0U2libGluZ0luZGV4KHRoaXMuaW5kZXhEYXRhW3Bvc0luZGV4XSk7XHJcbiAgICAgICAgICAgIEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmUm9vdChjYy52Mihwb3NYLCBub2RlLnkgKyAxNTApLCBoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG93S2FpWmhhbigpIHtcclxuICAgICAgICBsZXQga2FpWmhhbiA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L0thaVpoYW4nKTtcclxuICAgICAgICBrYWlaaGFuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNwaW5lID0ga2FpWmhhbi5nZXRDaGlsZEJ5TmFtZSgnS2FpWmhhbicpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IGFuaW1hID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdLYWlaaGFuJywgZmFsc2UpOy8vWVhfS2FpemhhblxyXG4gICAgICAgIHNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09ICdBdHRhY2snKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS2Fpemhhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAga2FpWmhhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0YXR1c0JhdHRsZVBvdGlvbigpIHtcclxuICAgICAgICAvL+WIt+aWsOaImOaWl+iNr+awtOeahOeKtuaAgVxyXG4gICAgICAgIGZvciAobGV0IGJhdHRsZXBvdGlvbmluZGV4ID0gMDsgYmF0dGxlcG90aW9uaW5kZXggPCB0aGlzLmJhdHRsZXBvdGlvbi5sZW5ndGg7IGJhdHRsZXBvdGlvbmluZGV4KyspIHtcclxuICAgICAgICAgICAgLy/mlbDph49cclxuICAgICAgICAgICAgbGV0IGJhdHRsZXBvdGlvbm51bWJlciA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmJhdHRsZXBvdGlvblByb3BJZFtiYXR0bGVwb3Rpb25pbmRleF0pXHJcbiAgICAgICAgICAgIC8v5pWw6YeP5pS55Y+YXHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlJlZHR4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmF0dGxlcG90aW9ubnVtYmVyXHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlcG90aW9ubnVtYmVyID09IDApIHsvL+aVsOmHj+S4ujDlj5jngbBcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfSBlbHNlIHsvL+aVsOmHj+Wkp+S6jjDlj5jkuq5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/ov5nkuIDlsYDmmK/lkKbnlKjkuobkuIDmrKFcclxuICAgICAgICAgICAgbGV0IHdoZXRoZXJ1c2UgPSB0aGlzLmJhdHRsZXBvdGlvbnN0YXRlW2JhdHRsZXBvdGlvbmluZGV4XVxyXG4gICAgICAgICAgICBpZiAod2hldGhlcnVzZSA9PSAwKSB7Ly/mlbDph4/kuLow5Y+Y54GwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJCYXR0bGVfTG9ja1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7Ly/mlbDph4/lpKfkuo4w5Y+Y5LquXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJCYXR0bGVfTG9ja1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiKVxyXG4gICAgICAgIHRoaXMuU3RhdHVzQmF0dGxlUG90aW9uKClcclxuICAgICAgICBsZXQgZ20gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNob3dDb2luKCk7XHJcbiAgICAgICAgdGhpcy5zaG93S2FpWmhhbigpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuXHJcbiAgICAgICAgLy9sZXQgY29pbkJnPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS9pY29uQmcnKTtcclxuICAgICAgICBzd2l0Y2ggKGdtLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxfY29pbiA9IE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzUmV3YXJkX0NvaW4oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuW8gOWni+esrE7nq6DnjqnlrrbmlbAgKyBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCkpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuW8gOWni+aMkeaImOWFs+WNoSArIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYMeasoeWFs+WNoSk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDPmrKHlhbPljaEpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbHR4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQwMDE3KVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiQm9zc1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tUdXRvcmFpbHMoKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuNSlcclxuXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxQcm9ncmVzc0JhclwiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjdXJMYWJlbFwiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpLmFjdGl2ZT1mYWxzZTsgIFxyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCwgMik7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MDAwMTgpLy84MDAwMThcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkVuZGxlc3NfQnRuX0J1ZmZcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiQm9zc1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy/ms6LmlbAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXIgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwgMClcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyB3YXZlbnVtYmVyXHJcblxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuW8gOWni0JPU1PmjJHmiJjmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgbm9kZT1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROb2RlQnlJZChVSVBhdGguQ29pblBvcClcclxuICAgICAgICAgICAgICAgIC8vICAgICBub2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95Tm9kZShVSVBhdGguQ29pblBvcCxub2RlKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sMC41KVxyXG4gICAgICAgICAgICAgICAgLy8gfSwwLjUpXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKFwidWkvZ2FtZS9lbmRsZXNzX2dhbWVfdWlcIiwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnQm9zc0hwUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZW5kbGVzc190cyA9IG5vZGUuZ2V0Q29tcG9uZW50KEVuZGxlc3NnR2FtZVVpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmVuZGxlc3NfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImFjmrKFib3Nz54up54yOKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYMeasoUJPU1Pni6nnjI4pO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyhQk9TU+eLqeeMjik7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFByb2dyZXNzQmFyXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImN1ckxhYmVsXCIpLmFjdGl2ZT1mYWxzZTsgXHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1cclxuICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbG51bVxyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW0rK1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSAnMC8xJztcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJ1aS9nYW1lL2Jvc3NfZ2FtZV91aVwiLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdCb3NzSHBSb290JykuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzX2NoYWxsZW5nZV90cyA9IG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NHYW1lVWkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuYm9zc19jaGFsbGVuZ2VfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lX2xhYmVsLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy90aW1lTGFiZWxcIikuY29sb3IgPSBjYy5Db2xvci5XSElURVxyXG4gICAgICAgICAgICAgICAgLy90b3AuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25UaW1lJykuY29sb3I9Y2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluVGltZSgpXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYMeasoeeIrOWhlCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDPmrKHniKzloZQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6IHtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYMeasoeWGsOays+aOoumZqSk7XHJcblxyXG4gICAgICAgICAgICAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbHR4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTQwMDE3KVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiQm9zc1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxQcm9wTnVtKHRydWUpO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5CdWZmKCkgey8vYnVmZuW8ueeql1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIrKysrKysrQnVmZuWxleekuuW8ueeql1wiKVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J0bkJ1ZmYoMCk7Ly9CdWZm5bGV56S65by556qXXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigwKTsvL0J1ZmbpgInmi6nlvLnnqpdcclxuICAgICAgICBpZiAoSXNEZWJ1Zykge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGsgKyBcIizkuLvliqjmioDog73lhrfljbTml7bpl7Q6XCIgKyB2LnNraWxsX3RvdGFsX3RpbWUgKyBcIizmlLvpgJ86XCIgKyAxIC8gdi5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSArIFwi5aKe5Lyk77yaXCIgKyB2Lmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlLCB2Lmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0QXR0cmlidXRlRGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QmdJbWcoKSB7XHJcbiAgICAgICAgLy8vbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsO1xyXG4gICAgICAgIC8vIGxldCBiZzAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMCcpO1xyXG4gICAgICAgIGxldCB3YWxsQmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfYmcnKTtcclxuICAgICAgICBsZXQgd2FsbERvd24gPSB3YWxsQmcuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpO1xyXG4gICAgICAgIC8v6YCC6YWN5Z2Q5qCHXHJcbiAgICAgICAgLy8gbGV0IGhwPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3dhbGxfcm9vdCcpO1xyXG4gICAgICAgIC8vIHdhbGxCZy55PWhwLnkrMTA4O1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kgPSB3YWxsQmcueSArIHdhbGxEb3duLnkgKyB3YWxsRG93bi5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYmcwLnkgPSBjYy53aW5TaXplLmhlaWdodCAvIDIgLSB0aGlzLmJnMC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgIC8v56ugXHJcbiAgICAgICAgLy9sZXQgbmFtZT1MZXZlbE1hbmFnZXIuZ2V0TGV2ZWxOYW1lKGxldmVsKTtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvO1xyXG4gICAgICAgIGxldCBiZ05hbWUgPSBmaWdodGluZ0luZm8uYmdfbmFtZTtcclxuICAgICAgICB0aGlzLmN1cl9iZ19uYW1lID0gYmdOYW1lO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGJnTmFtZSwgY2MuU3ByaXRlRnJhbWUsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuU3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBhc3NldHM7XHJcbiAgICAgICAgICAgIHRoaXMuYmcxLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGZpZ2h0aW5nSW5mby53YWxsX25hbWUsIGNjLlNwcml0ZUZyYW1lLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnYmcyX3dhbGwnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICAgICAgLy8gdGhpcy5iZzJfd2FsbCA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnYmcyX3dhbGwnKTtcclxuICAgICAgICAgICAgLy9sZXQgYmMgPSB3YWxsQmcuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGJjLnNpemUgPSB3YWxsQmcuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kgPSB3YWxsQmcueSArIGJjLm5vZGUueSArIGJjLm5vZGUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgLy8gfSwgMC41KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QmFveGlhbmcoKSB7XHJcbiAgICAgICAgLy/moLnmja7lvZPliY3miYDlnKjms6LmlbDmmL7npLpcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxTaG93KCk7XHJcbiAgICAgICAgdGhpcy5zaG93RHBzKCk7XHJcbiAgICAgICAgdGhpcy5zaG93TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0X3RpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB0aGlzLnNob3dDb2luKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2JnX25hbWUgIT0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmJnX25hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZ0ltZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQcm9ncmVzcygpIHtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvYmdfbG9hZGluZycpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5byA5aeL5Yqg6L295YWz5Y2h5omA6ZyA55qE5oCq54mpXHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgcHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Eb3VibGUoYnRuOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDEwOCkpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX2F1dG8gPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnRuU2V0dXBSYXRlKCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMik7XHJcbiAgICAgICAgICAgICAgICAvL+WQr+WKqOivleeUqFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2UgJiYgdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIC8v5YWz6Zet6K+V55SoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHJ5X3JhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BdXRvKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8gPT0gZmFsc2UgJiYgdGhpcy50cnlfYXV0b19yYW1haW4gPD0gMCkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAxMDcpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLldlZWtDYXJkLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19hdXRvID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX3JhdGUgPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5UmF0ZUxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19hdXRvID09IGZhbHNlICYmIHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAvL+acieWJqeS9meaXtumXtO+8jOWQr+eUqC/lhbPpl63or5XnlKhcclxuICAgICAgICAgICAgdGhpcy5pc190cnlfYXV0byA9ICFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9hdXRvID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXre+8jOmCo+WwseWFs+mXreiuoeaXtlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X2F1dG9fcmFtYWluKVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9hdXRvX3JhbWFpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRBdXRvRmlnaHRpbmcoIUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZyk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5QYXVzZSgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9hdXRvX3JhbWFpbilcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIHRoaXMudHJ5X2F1dG9fcmFtYWluKTtcclxuICAgICAgICB0aGlzLnRyeV9yYXRlX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfcmF0ZV9yYW1haW4pXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9yYXRlX3JhbWFpbik7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuY2hhbmdlSHAoLUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmdldE1heEhwKCkqMC42NSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVBhdXNlKCk7Ly/mmoLlgZxcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lV2luKCk7Ly/og5zliKlcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZSgpOy8v5aSx6LSlXHJcbiAgICAgICAgLy9jYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgLy8gICAgIH19KTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0MSgpIHtcclxuICAgICAgICAvL1NraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVGVzdDIoKSB7XHJcbiAgICAgICAgLy8gbGV0IGJvc3M9Qm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENoaWxkQnlOYW1lKCdib3NzMScpO1xyXG4gICAgICAgIC8vIGlmKGJvc3Mpe1xyXG4gICAgICAgIC8vICAgICBib3NzLmdldENvbXBvbmVudChCdWxsRGVtb24pLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Qm9zc1dhcm5pbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJlcGxheSgpIHtcclxuICAgICAgICAvLyBsZXQgcG9zWD1NYXRoLnJhbmRvbSgpKjQwMC0yMDA7XHJcbiAgICAgICAgLy8gbGV0IHBvc1k9TWF0aC5yYW5kb20oKSo0MDAtMjAwO1xyXG4gICAgICAgIC8vIGxldCBwb3M9Y2MudjIocG9zWCxwb3NZKTtcclxuICAgICAgICAvLyBsZXQgYng9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9tYW5hZ2VyLmNyZWF0ZUJhb1hpYW5nR3VhaShwb3MpO1xyXG4gICAgICAgIC8vIGJ4LmdldENvbXBvbmVudChCYW9YaWFuZ0d1YWkpLmluaXQobmV3IExldmVsQnVmZigpKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQmF0dGxlcG90aW9uKGV2ZW50LCB0eXBlKSB7Ly/miJjmlpfoja/msLTmjInpkq4gICDnuqIgICDnu78gICAg6JOdXHJcbiAgICAgICAgbGV0IG51bSA9IHR5cGVcclxuICAgICAgICBsZXQgYmF0dGxlcG90aW9ubnVtYmVyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuYmF0dGxlcG90aW9uUHJvcElkW251bV0pXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJhdHRsZXBvdGlvbnN0YXRlW251bV0gPT0gMCkgey8v6L+Z5bGA5bey57uP55So6L+H5LqGICAg6aOY5a2XXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTMwKSwgMyk7XHJcbiAgICAgICAgfSBlbHNlIHsvL+WmguaenOayoeacieeUqOi/h1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlcG90aW9ubnVtYmVyID09IDApIHsvL+aVsOmHj+S4jeWknyDlvLnnqpfotK3kubDlvLnnqpcgICAgICAgIOWmguaenOmSu+efs+eahOaVsOmHj+Wkn++8jOebtOaOpei0reS5sOS5i+WQjuS9v+eUqCAgXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJ1eUJhdHRsZVBvdGlvbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnV5QmF0dGxlUG90aW9uKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1eUJhdHRsZVBvdGlvbikuaW5pdFVpKHR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheU51bSgnYzMwMScpPD0wKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+mmluWFheayoeacieWujOaIkCAgICDlpoLmnpzpppblhYXmsqHmnInotK3kubDlsLHlvLnlh7rpppblhYVcclxuICAgICAgICAgICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb25DbG9zZTooKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/pppblhYXlrozmiJDkuoYgICDlvLnlh7rpkrvnn7PotK3kubBcclxuICAgICAgICAgICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuS9v+eUqOmBk+WFtzpcIixudW0pXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuUmVkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5HcmVlbigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQmx1ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5SZWQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt++8mue6olwiKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5HcmVlbigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya57u/XCIpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJsdWUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt++8muiTnVwiKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2V0VHJ5QXV0b0xhYmVsKCkge1xyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fbGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDAgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDUgJiYgdGhpcy5pc191bmxvY2tfYXV0byA9PSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyeV9hdXRvX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodGhpcy50cnlfYXV0b19yYW1haW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRyeVJhdGVMYWJlbCgpIHtcclxuICAgICAgICB0aGlzLnRyeV9yYXRlX2xhYmVsLm5vZGUuYWN0aXZlID0gdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwICYmIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1ICYmIHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9sYWJlbC5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHRoaXMudHJ5X3JhdGVfcmFtYWluKSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5SYXRlU2hvdygpIHtcclxuICAgICAgICBsZXQgcmF0ZSA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2J0blJhdGUnKTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSB0cnVlIHx8IHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZU51bSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnRuU2V0dXBSYXRlKCk7XHJcbiAgICAgICAgICAgIHJhdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3JhdGVbcmF0ZU51bSAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJhdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3JhdGVbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9yYXRlX3JhbWFpbilcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIHRoaXMudHJ5X3JhdGVfcmFtYWluKTtcclxuICAgICAgICByYXRlLmFjdGl2ZSA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0bkF1dG8oKSB7XHJcbiAgICAgICAgLy8gbGV0IGF1dG8gPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9idG5BdXRvJyk7XHJcbiAgICAgICAgLy8gbGV0IGF1dG9OdW0gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmcgPyAxIDogMDtcclxuICAgICAgICAvLyBhdXRvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9hdXRvW2F1dG9OdW1dO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmlzX3VubG9ja19hdXRvKSB7XHJcbiAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkF1dG9GaWdodGluZywgYXV0b051bSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGF1dG8uYWN0aXZlID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RpbWUoKSB7XHJcbiAgICAgICAgbGV0IHNoaSA9IE1hdGguZmxvb3IodGhpcy5zdGFydF90aW1lIC8gMzYwMCk7XHJcbiAgICAgICAgbGV0IHNoaVN0ciA9ICcwJyArIHNoaTtcclxuICAgICAgICBpZiAoc2hpID49IDEwKSB7XHJcbiAgICAgICAgICAgIHNoaVN0ciA9ICcnICsgc2hpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmVuID0gTWF0aC5mbG9vcigodGhpcy5zdGFydF90aW1lIC0gc2hpICogMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgbGV0IGZlblN0ciA9ICcwJyArIGZlbjtcclxuICAgICAgICBpZiAoZmVuID49IDEwKSB7XHJcbiAgICAgICAgICAgIGZlblN0ciA9ICcnICsgZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbyA9IHRoaXMuc3RhcnRfdGltZSAlIDYwO1xyXG4gICAgICAgIGxldCBtaWFvU3RyID0gJzAnICsgbWlhbztcclxuICAgICAgICBpZiAobWlhbyA+PSAxMCkge1xyXG4gICAgICAgICAgICBtaWFvU3RyID0gJycgKyBtaWFvO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwuc3RyaW5nID0gc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy90aW1lTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlbWFpblRpbWUoKSB7XHJcbiAgICAgICAgbGV0IHJlbWFpblRpbWUgPSA5MCAtIHRoaXMuc3RhcnRfdGltZTtcclxuICAgICAgICBsZXQgc2hpID0gTWF0aC5mbG9vcihyZW1haW5UaW1lIC8gMzYwMCk7XHJcbiAgICAgICAgbGV0IHNoaVN0ciA9ICcwJyArIHNoaTtcclxuICAgICAgICBpZiAoc2hpID49IDEwKSB7XHJcbiAgICAgICAgICAgIHNoaVN0ciA9ICcnICsgc2hpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmVuID0gTWF0aC5mbG9vcigocmVtYWluVGltZSAtIHNoaSAqIDM2MDApIC8gNjApO1xyXG4gICAgICAgIGxldCBmZW5TdHIgPSAnMCcgKyBmZW47XHJcbiAgICAgICAgaWYgKGZlbiA+PSAxMCkge1xyXG4gICAgICAgICAgICBmZW5TdHIgPSAnJyArIGZlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pYW8gPSByZW1haW5UaW1lICUgNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHIgPSAnMCcgKyBtaWFvO1xyXG4gICAgICAgIGlmIChtaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIG1pYW9TdHIgPSAnJyArIG1pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZV9sYWJlbC5zdHJpbmcgPSBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVtYWluVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRMZXZlbFNob3coKSB7XHJcbiAgICAgICAgbGV0IHdhdmVCZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS93YXZlQmcnKTtcclxuICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUgPSB3YXZlQmcucGFyZW50LmdldENoaWxkQnlOYW1lKCdjdXJfd2F2ZScpO1xyXG4gICAgICAgIHRoaXMuY3VyX3dhdmVfbm9kZS55ID0gd2F2ZUJnLnkgLSAyMDtcclxuICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueCA9IC0zMTU7XHJcbiAgICAgICAgdGhpcy5kaXN0X3h4ID0gLTMxNTtcclxuICAgICAgICB0aGlzLndhdmVfcG9zX3ggPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgd2F2ZVR5cGVzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxlbiA9IHdhdmVUeXBlcy5sZW5ndGg7XHJcbiAgICAgICAgd2F2ZUJnLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgLy/nrpflh7rmr4/kuKrnmoTplb/luqZcclxuICAgICAgICBsZXQgamlhbmdlTnVtID0gbGVuIC0gMTtcclxuICAgICAgICBsZXQgamlhbmdlV2lkdGggPSA0O1xyXG4gICAgICAgIGxldCBqaWFuZ2VUb3RhbFdpZHRoID0gamlhbmdlTnVtICogamlhbmdlV2lkdGg7XHJcbiAgICAgICAgbGV0IHdhdmVUb3RhbFdpZHRoID0gd2F2ZUJnLndpZHRoIC0gNSAqIDIgLSBqaWFuZ2VUb3RhbFdpZHRoO1xyXG4gICAgICAgIGxldCB3YXZlV2lkdGggPSB3YXZlVG90YWxXaWR0aCAvIGxlbjtcclxuICAgICAgICB0aGlzLmxlZnRfeHggPSAtd2F2ZUJnLndpZHRoIC8gMiArIDU7XHJcbiAgICAgICAgbGV0IG9uZVdpZHRoID0gd2F2ZVdpZHRoICsgamlhbmdlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5vbmVfd2lkdGggPSBvbmVXaWR0aDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIneWni+WMluWFs+WNoVwiK3dhdmVUeXBlcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSB3YXZlVHlwZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbm9ybWFsX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ib3NzX3dhdmUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3YXZlQmcuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUubmFtZSA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHdhdmVXaWR0aDtcclxuICAgICAgICAgICAgbm9kZS54ID0gdGhpcy5sZWZ0X3h4ICsgaSAqIG9uZVdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLnkgPSAwO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF93YXZlWzBdO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHR5cGUgPiAwO1xyXG4gICAgICAgICAgICBsZXQgamlhbmdlUG9zWCA9IG5vZGUueCArIG5vZGUud2lkdGggKyBqaWFuZ2VXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChpICE9IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuZ2UgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9qaWFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgamlhbmdlLnggPSBqaWFuZ2VQb3NYO1xyXG4gICAgICAgICAgICAgICAgamlhbmdlLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2F2ZUJnLmFkZENoaWxkKGppYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53YXZlX3Bvc194LnB1c2goamlhbmdlUG9zWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0xldmVsUHJvZ3Jlc3MoKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dMZXZlbFByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhbGxFbmVteU51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGtpbGxOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHJvZ3Jlc3M9KGtpbGxOdW0vYWxsRW5lbXlOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbF9wcm9ncmVzcy5wcm9ncmVzcz1wcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nPWtpbGxOdW0rJy8nK2FsbEVuZW15TnVtOyAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jdXJfd2F2ZV9ub2RlLng9dGhpcy53YXZlX3Bvc194W2dtLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlX3NwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IHRoaXMub25lX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVCZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS93YXZlQmcnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL5YWz5Y2hXCIrZ20uY3VyX3dhdmUpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9zcCA9IHdhdmVCZy5nZXRDaGlsZEJ5TmFtZShnbS5jdXJfd2F2ZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby5nZXRXYXZlVHlwZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3AuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3dhdmVbdHlwZXNbZ20uY3VyX3dhdmVdICsgMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLndpZHRoID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJXYXZlID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHByZXZXYXZlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmUtMTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJYWCA9IHRoaXMud2F2ZV9wb3NfeFtjdXJXYXZlXTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHByZXZYWD1wcmV2V2F2ZT49MD90aGlzLndhdmVfcG9zX3hbcHJldldhdmVdOnRoaXMubGVmdF94eDtcclxuICAgICAgICAgICAgICAgIC8vbGV0IG9mZnNldFhYPWN1clhYLXByZXZYWDsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0X3h4ID0gY3VyWFg7XHJcbiAgICAgICAgICAgICAgICAvL3dhdmVCZy5nZXRDXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5kbGVzc190cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kbGVzc190cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIEdhbWVNb2RlLkJvc3NfUHJzb25hbDp7XHJcbiAgICAgICAgICAgIC8vICAgICBpZih0aGlzLmJvc3NfY2hhbGxlbmdlX3RzKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmJvc3NfY2hhbGxlbmdlX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0ppYW5Ub3VQb3MocGVyOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBsZXQgY3VyV2F2ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlO1xyXG4gICAgICAgIC8vIGxldCBwcmV2V2F2ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlLTE7XHJcbiAgICAgICAgLy8gbGV0IGN1clhYPXRoaXMud2F2ZV9wb3NfeFtjdXJXYXZlXTtcclxuICAgICAgICAvLyBsZXQgcHJldlhYPXByZXZXYXZlPj0wP3RoaXMud2F2ZV9wb3NfeFtwcmV2V2F2ZV06dGhpcy5sZWZ0X3h4O1xyXG4gICAgICAgIC8vIGxldCBvZmZzZXRYWD1jdXJYWC1wcmV2WFg7ICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLmRpc3RfeHg9cHJldlhYK29mZnNldFhYKnBlcjtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q29pbigpIHtcclxuICAgICAgICAvLyBsZXQgYWxsRW5lbXlOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS50b3RhbF9tb25zdGVyX251bTtcclxuICAgICAgICAvLyBsZXQga2lsbE51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bTtcclxuICAgICAgICAvLyB0aGlzLmNvaW5fbGFiZWwuc3RyaW5nPU15VG9vbC5nZXRDb2luRGFud2VpKGtpbGxOdW0vYWxsRW5lbXlOdW0qdGhpcy50b3RhbF9jb2luKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93RHBzKCkge1xyXG4gICAgICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICAgICAgbGV0IGdnID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbGVuID0gZ2cuaGVyb19za2lsbF9kcHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNraWxsRHBzID0gZ2cuaGVyb19za2lsbF9kcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBhdHRhY2tEcHMgPSBnZy5oZXJvX2F0dGFja19kcHNbaV07XHJcbiAgICAgICAgICAgIHRvdGFsICs9IChza2lsbERwcyArIGF0dGFja0Rwcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcHMgPSBNYXRoLnJvdW5kKHRvdGFsIC8gdGhpcy5zdGFydF90aW1lKTtcclxuICAgICAgICB0aGlzLmRwc19sYWJlbC5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShkcHMpOy8vICAgICAgICB0aGlzLmRwc19sYWJlbC5zdHJpbmc9J0RQUyAnK015VG9vbC5nZXRDb2luRGFud2VpKGRwcyk7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3MvZHBzTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgTXlUb29sLmdldENvaW5EYW53ZWkoZHBzKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQgdG9wPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aScpO1xyXG4gICAgICAgIC8vICAgICBsZXQgdG90YWw9MDtcclxuICAgICAgICAvLyAgICAgbGV0IGdnPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBsZW49Z2cuaGVyb19za2lsbF9kcHMubGVuZ3RoO1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNraWxsRHBzPWdnLmhlcm9fc2tpbGxfZHBzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGF0dGFja0Rwcz1nZy5oZXJvX2F0dGFja19kcHNbaV07XHJcbiAgICAgICAgLy8gICAgICAgICB0b3RhbCs9KHNraWxsRHBzK2F0dGFja0Rwcyk7XHJcbiAgICAgICAgLy8gICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2F0dExhYmVsJytpKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0n5pS75Ye777yaJythdHRhY2tEcHM7XHJcbiAgICAgICAgLy8gICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ3NraWxsTGFiZWwnK2kpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSfmioDog73vvJonK3NraWxsRHBzO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCBkcHM9TWF0aC5yb3VuZCh0b3RhbC90aGlzLnN0YXJ0X3RpbWUpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRwc19sYWJlbC5zdHJpbmc9J0RQUyAnK2RwcztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lX2ppc2h1ID49IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0X3RpbWUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlbWFpblRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RwcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YXZlX25vZGUueCA8IHRoaXMuZGlzdF94eCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlLnggKz0gZHQgKiAzMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSB0aGlzLm9uZV93aWR0aCAtICh0aGlzLmRpc3RfeHggLSB0aGlzLmN1cl93YXZlX25vZGUueCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2F2ZV9ub2RlLnggPiB0aGlzLmRpc3RfeHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueCA9IHRoaXMuZGlzdF94eDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFEdCA9IGR0O1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIGFEdCA9IGR0IC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYUR0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgYUR0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfYXV0byAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9hdXRvX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfYXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfcmF0ZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9yYXRlX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+iDjOaZr+W+queOr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iZzAgJiYgdGhpcy5iZzEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gZHQgKiB0aGlzLmJnU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnMC55IC09IGR0ICogdGhpcy5iZ1NwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMC55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcwLnkgPSB0aGlzLmJnMS55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMS55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5iZzJfd2FsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHZ4OiBudW1iZXIgPSAodGhpcy50YXJnZXRYIC0gdGhpcy5iZzJfd2FsbC54KSAqIHRoaXMuZWFzaW5nO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iZzJfd2FsbC54ICs9IHZ4O1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl93YXZlX25vZGUueDx0aGlzLmRpc3RfeHgpe1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfVxyXG4gICAgLyoq5pWZ56iLICovXHJcbiAgICBjaGVja1R1dG9yYWlscygpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjExKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSAvIEppYVN1KTtcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTEsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjEyLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSAqIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==