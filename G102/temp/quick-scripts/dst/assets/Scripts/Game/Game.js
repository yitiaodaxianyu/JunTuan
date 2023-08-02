
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
        /**试用文本 */
        _this.waveBar = null;
        _this.easing = 0.1;
        _this.wavaNartagY = 0;
        _this.allWaveLength = 0;
        _this.waveHeight = 281;
        //cur_wave_node: cc.Node = null;
        //cur_wave_sp: cc.Node = null;
        //wave_pos_x: number[] = [];
        _this.left_xx = 0;
        //dist_xx: number = 0;
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
        /**剩余多少次显示 */
        _this.rogueText = null;
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
            node.x = GameManager_1.default.getInstance().aniType + posX;
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
    Game.prototype.setRogueText = function (n) {
        this.rogueText.string = n + "";
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
        // this.try_auto_label.node.active = this.try_auto_ramain > 0 && LevelManager.getInstance().finish_level >= 5 && this.is_unlock_auto == false;
        // this.try_auto_label.string = MyTool.getTimeStr(Math.floor(this.try_auto_ramain))
    };
    Game.prototype.setTryRateLabel = function () {
        // this.try_rate_label.node.active = this.try_rate_ramain > 0 && LevelManager.getInstance().finish_level >= 5 && this.is_unlock_rate == false;
        // this.try_rate_label.string = MyTool.getTimeStr(Math.floor(this.try_rate_ramain))
    };
    Game.prototype.setBtnRateShow = function () {
        // let rate = cc.find('Canvas/Ui_Root/btnRate');
        // if (this.is_unlock_rate == true || this.try_rate_ramain > 0) {
        //     let rateNum = GameManager.getInstance().getBtnSetupRate();
        //     rate.getComponent(cc.Sprite).spriteFrame = this.sp_rate[rateNum - 1];
        // } else {
        //     rate.getComponent(cc.Sprite).spriteFrame = this.sp_rate[0];
        // }
        // this.try_rate_ramain = Math.floor(this.try_rate_ramain)
        // TheStorageManager.getInstance().setItem(StorageKey.try_rate_fight_remain, this.try_rate_ramain);
        // rate.active = LevelManager.getInstance().finish_level >= 5;
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
        var waveBg = cc.find('Canvas/Ui_Root/waveBg');
        //this.cur_wave_node = waveBg.parent.getChildByName('cur_wave');
        // this.cur_wave_node.y = waveBg.y - 20;
        // this.cur_wave_node.x = -315;
        // this.dist_xx = -315;
        //this.wave_pos_x = new Array();
        var waveTypes = GameManager_1.default.getInstance().fighting_info.getWaveTypes();
        var len = waveTypes.length;
        this.allWaveLength = waveTypes.length;
        //算出每个的长度
        var jiangeNum = len - 1;
        var jiangeWidth = 4;
        var jiangeTotalWidth = jiangeNum * jiangeWidth;
        var waveTotalWidth = waveBg.width - 5 * 2 - jiangeTotalWidth;
        var waveWidth = waveTotalWidth / len;
        this.left_xx = -waveBg.width / 2 + 5;
        var oneWidth = waveWidth + jiangeWidth;
        this.one_width = oneWidth;
        this.waveBar.height = 0;
        this.wavaNartagY = 0;
        console.log("初始化关卡" + waveTypes.length);
        // for (let i = 0; i < len; i++) {
        //     let type = waveTypes[i];
        //     let node: cc.Node = null;
        //     node = cc.instantiate(this.prefab_normal_wave);
        //     // switch (type) {
        //     //     case 0: {
        //     //         node = cc.instantiate(this.prefab_normal_wave);
        //     //     } break;
        //     //     case 1: {
        //     //         node = cc.instantiate(this.prefab_boss_wave);
        //     //     } break;
        //     // }
        //     waveBg.addChild(node);
        //     node.name = i.toString();
        //     node.width = waveWidth;
        //     node.x = this.left_xx + i * oneWidth;
        //     node.y = 0;
        //     node.getComponent(cc.Sprite).spriteFrame = this.sp_wave[0];
        //     node.active = type > 0;
        //     let jiangePosX = node.x + node.width + jiangeWidth / 2;
        //     // if (i != len - 1) {
        //     //     let jiange = cc.instantiate(this.prefab_jiange);
        //     //     jiange.x = jiangePosX;
        //     //     jiange.y = 0;
        //     //     waveBg.addChild(jiange);
        //     // }
        //     this.wave_pos_x.push(jiangePosX);
        // }
        this.showLevelProgress();
        this.setRogueText(GameManager_1.default.getInstance().getRogueLikeNum());
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
                    // if (this.cur_wave_sp) {
                    //     this.cur_wave_sp.width = this.one_width;
                    // }
                    // let waveBg = cc.find('Canvas/Ui_Root/waveBg');
                    console.log("开始关卡" + gm.cur_wave);
                    this.wavaNartagY = gm.cur_wave / this.allWaveLength * this.waveHeight;
                    //this.cur_wave_sp = waveBg.getChildByName(gm.cur_wave.toString());
                    // let types = GameManager.getInstance().fighting_info.getWaveTypes();
                    // this.cur_wave_sp.getComponent(cc.Sprite).spriteFrame = this.sp_wave[types[gm.cur_wave] + 1];
                    // this.cur_wave_sp.active = true;
                    // this.cur_wave_sp.width = 0;
                    // let curWave = GameManager.getInstance().cur_wave;
                    //let prevWave=GameManager.getInstance().cur_wave-1;
                    //let curXX = this.wave_pos_x[curWave];
                    //let prevXX=prevWave>=0?this.wave_pos_x[prevWave]:this.left_xx;
                    //let offsetXX=curXX-prevXX;        
                    //this.dist_xx = curXX;
                    this.setRogueText(GameManager_1.default.getInstance().getRogueLikeNum());
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
            // if (this.cur_wave_node.x < this.dist_xx) {
            //     this.cur_wave_node.x += dt * 30;
            //     //this.cur_wave_sp.width = this.one_width - (this.dist_xx - this.cur_wave_node.x);
            //     if (this.cur_wave_node.x > this.dist_xx) {
            //         this.cur_wave_node.x = this.dist_xx;
            //         //this.cur_wave_sp.width = this.one_width;
            //     }
            // }
            var vh = (this.wavaNartagY - this.waveBar.height) * this.easing;
            this.waveBar.height += vh;
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
        property(cc.Node)
    ], Game.prototype, "waveBar", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "try_auto_label", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "try_rate_label", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "rogueText", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBaUU7QUFDakUscURBQWdEO0FBRWhELDJEQUFpRTtBQUNqRSwwQ0FBOEU7QUFDOUUscUVBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELDBDQUFxQztBQUVyQyxzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCw0REFBMkQ7QUFDM0QsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsMERBQWlFO0FBQ2pFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QywwQ0FBcUM7QUFDckMsc0RBQWlEO0FBRWpELGtFQUE2RDtBQUM3RCwyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLG1EQUE4QztBQUM5QyxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELDJEQUF3RTtBQUV4RSx3REFBbUQ7QUFFN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE2aUNDO1FBMWlDRyxhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFlBQVk7UUFDWixVQUFVO1FBRVYsYUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixZQUFNLEdBQVcsR0FBRyxDQUFD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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCBCb3NzR2FtZVVpIGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzR2FtZVVpXCI7XHJcbmltcG9ydCBFbmRsZXNzZ0dhbWVVaSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc2dHYW1lVWlcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQnVmZkRpc3BsYXkgZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvQnVmZkRpc3BsYXlcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9cIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L0RpbmdZdWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4uL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4uL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgV2Vla0NhcmRVaSBmcm9tIFwiLi4vV2Vla0NhcmQvV2Vla0NhcmRVaVwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4vVG91Y2hQbGFuZS9Ub3VjaFBsYW5lXCI7XHJcbmltcG9ydCBCdXlCYXR0bGVQb3Rpb24gZnJvbSBcIi4vVWkvQnV5QmF0dGxlUG90aW9uXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9yYXRlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9hdXRvOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF93YXZlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ub3JtYWxfd2F2ZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYm9zc193YXZlOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9qaWFuZ2U6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICAvKirlvZPliY3ms6LmlbDoioLngrkgKi9cclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3YXZlQmFyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBlYXNpbmc6IG51bWJlciA9IDAuMTtcclxuICAgIHdhdmFOYXJ0YWdZOm51bWJlcj0wO1xyXG4gICAgYWxsV2F2ZUxlbmd0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgICB3YXZlSGVpZ2h0OiBudW1iZXIgPSAyODE7XHJcbiAgICAvL2N1cl93YXZlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy9jdXJfd2F2ZV9zcDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvL3dhdmVfcG9zX3g6IG51bWJlcltdID0gW107XHJcbiAgICBsZWZ0X3h4OiBudW1iZXIgPSAwO1xyXG4gICAgLy9kaXN0X3h4OiBudW1iZXIgPSAwO1xyXG4gICAgb25lX3dpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIC8vIHpoZW5feGluZzpjYy5Kc29uQXNzZXQ9bnVsbDtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6humAn+eOhyAqL1xyXG4gICAgaXNfdW5sb2NrX3JhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X3JhdGVfcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X3JhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaYr+WQpuino+mUgeS6huiHquWKqOaImOaWlyAqL1xyXG4gICAgaXNfdW5sb2NrX2F1dG86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJ5X2F1dG9fcmFtYWluOiBudW1iZXIgPSA2MCAqIDEwO1xyXG4gICAgaXNfdHJ5X2F1dG86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X2F1dG9fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKuivleeUqOaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHJ5X3JhdGVfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvKirliankvZnlpJrlsJHmrKHmmL7npLogKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHJvZ3VlVGV4dDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLy/mtYvor5VcclxuICAgIHN0YXJ0X3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICB0aW1lX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgdGltZV9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgYmcwOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJnMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBkcHNfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8v5YWz5Y2h6L+b5bqm5p2hXHJcbiAgICBsZXZlbF9wcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG4gICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGNvaW5fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIHRvdGFsX2NvaW46IG51bWJlciA9IDA7XHJcbiAgICBlbmRsZXNzX3RzOiBFbmRsZXNzZ0dhbWVVaSA9IG51bGw7XHJcbiAgICAvL+W9k+WJjeiDjOaZr+S9v+eUqOeahOWQjeensFxyXG4gICAgY3VyX2JnX25hbWU6IHN0cmluZyA9ICdiZzInO1xyXG5cclxuICAgIHByaXZhdGUgYmdTcGVlZDogbnVtYmVyID0gNjA7XHJcblxyXG4gICAgLy/miJjmlpfoja/msLRcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlcG90aW9uOiBjYy5Ob2RlW10gPSBbXTsvL+e6ouiJsiAgIOe7v+iJsiAgIOiTneiJslxyXG4gICAgYmF0dGxlcG90aW9uUHJvcElkOiBQcm9wSWRbXSA9IFtQcm9wSWQuUmVkUG90aW9uLCBQcm9wSWQuR3JlZW5Qb3Rpb24sIFByb3BJZC5CbHVlUG90aW9uXS8v5oiY5paX6I2v5rC055qE6YGT5YW3aWRcclxuICAgIGJhdHRsZXBvdGlvbnN0YXRlOiBudW1iZXJbXSA9IFsxLCAxLCAxXS8v5oiY5paX6I2v5rC05Zyo6L+Z5LiA5bGA5piv5ZCm5L2/55So5LqGICDpu5jorqTmr4/kuIDkuKroja/msLTmnInkuIDmrKHkvb/nlKjnmoTmnLrkvJpcclxuXHJcbiAgICAvLyBiZzJfd2FsbDogY2MuTm9kZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0KEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdz10cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0QmdJbWcoKTtcclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEhlcm9zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkVHV0b3JhaWxzSGVyb0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3VubG9ja19hdXRvID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3VubG9ja19yYXRlID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNfdW5sb2NrX3JhdGUpIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRBdXRvRmlnaHRpbmcoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgNjAgKiAxMCk7XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgNjAgKiAxMCk7XHJcbiAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcblxyXG4gICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgLy90aGlzLnN0YXJ0VGVzdCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fQmF0dGxlKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuTnVsbCwgNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgMSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsU2hvdygpO1xyXG5cclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguUmV3YXJkU1NVSSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguU3RvcmVIZXJvU2hvd1VpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGVzdENhbWVyYSgpIHtcclxuICAgICAgICAvLyDliJvlu7rmuLLmn5PnurnnkIbvvIzlubborr7nva7nurnnkIblpKflsI/lkIzmmL7npLrlsY8oc2hvd1Nwcml0ZSnlpKflsI/kuIDmoLdcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoMzAwLCAyNDApO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9UZXN0Q2FtZXJhJykuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgbGV0IHNob3dTcHJpdGUgPSBjYy5maW5kKCdDYW52YXMvVGVzdC9zaG93Um9vdC9zaG93U3ByaXRlJyk7XHJcbiAgICAgICAgc2hvd1Nwcml0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpIHtcclxuICAgICAgICAvL+S4iuS4i+aooeWdl1xyXG4gICAgICAgIGxldCB0b3BVaSA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aScpO1xyXG4gICAgICAgIGxldCB3cCA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdG9wVWkueSA9IHdwLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9wcm9ncmVzcyA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdsZXZlbFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmxldmVsX3Byb2dyZXNzLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmxldmVsX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29pbl9sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdpY29uQmcnKS5nZXRDaGlsZEJ5TmFtZSgnY29pbkxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmRwc19sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdkcHNMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy/ln47loplcclxuICAgICAgICBsZXQgd2FsbEJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsX2JnJyk7XHJcbiAgICAgICAgd2FsbEJnLnkgPSAtKGNjLndpblNpemUuaGVpZ2h0IC8gMikgKyB3YWxsQmcuaGVpZ2h0IC8gMjtcclxuICAgICAgICAvL2hwXHJcbiAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgIGhwLnkgPSAtd3AuaGVpZ2h0IC8gMiArIGhwLmhlaWdodCAtIDI3Oy8vMjfmmK/ooYDmnaHnmoTlnZDmoIdcclxuICAgICAgICB0aGlzLmJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgdGhpcy5iZzEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpO1xyXG4gICAgICAgIHRoaXMuYmcwLnkgPSBjYy53aW5TaXplLmhlaWdodCAvIDIgLSB0aGlzLmJnMC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgIC8v5LiK56Kw5pKe54K5XHJcbiAgICAgICAgLy9jYy5maW5kKCdDYW52YXMvd2FsbF9yb290L3dhbGxfdG9wJykueT10b3BVaS55O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMb2FkaW5nKCkge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmcgPSBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyID0gYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbCA9IGxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcztcclxuICAgICAgICBsZXQgbG9hZGluZ1NjaGVkdWxlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzICs9IDAuMDA1O1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nID0gKGxvYWRpbmdCYXIucHJvZ3Jlc3MgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgICAgIGlmIChsb2FkaW5nQmFyLnByb2dyZXNzID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2NoZWR1bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSwgMC4wMik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGFydEdhbWUoKSB7XHJcbiAgICAgICAgaWYgKEhlcm8uY3VyX2xvYWRlZF9udW0gPj0gSGVyby5tYXhfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgbGV0IGJnTG9hZGluZyA9IFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL5peg5bC95oyR5oiY5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYWOasoeaXoOWwveaMkeaImCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHml6DlsL3mjJHmiJgpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh5peg5bC95oyR5oiYKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1cclxuICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbG51bVxyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgICAgICAgICBudW0tLTtcclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJvdW5kIC0gMSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gKFJvdW5kIC0gMilcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDEpOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJidWZmOlwiLEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIsUm91bmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbmRleExvYWQ6IEFycmF5PG51bWJlcj4gPSBbMiwgMSwgMywgMCwgNF07XHJcbiAgICBsb2FkSGVyb3MoKSB7XHJcbiAgICAgICAgLy/ojrflj5bpmJ/liJdcclxuICAgICAgICBIZXJvLm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSA9IDA7XHJcbiAgICAgICAgUGV0Lm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgUGV0LmN1cl9sb2FkZWRfbnVtID0gMDtcclxuICAgICAgICBsZXQgdGVhbUxpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlYW1MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvVHlwZSA9IHRlYW1MaXN0W3RoaXMuaW5kZXhMb2FkW2ldXTtcclxuICAgICAgICAgICAgaWYgKGhlcm9UeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGVybyhoZXJvVHlwZSwgdGhpcy5pbmRleExvYWRbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxoZXJvUm9vdC5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgIC8vICAgICBsZXQgaGVybz1oZXJvUm9vdC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoSGVybyk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+mihOWKoOi9veW8k+aJi0hlcm9fUm9vdFxyXG4gICAgICAgIC8vIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gNSkge1xyXG4gICAgICAgIC8vICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvaGVybzgnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluZGV4RGF0YTogQXJyYXk8bnVtYmVyPiA9IFszLCAxLCAwLCAyLCA0XTtcclxuICAgIGxvYWRIZXJvKGhlcm9UeXBlOiBIZXJvX1R5cGUsIHBvc0luZGV4OiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBIZXJvLm1heF9sb2FkX251bSsrO1xyXG4gICAgICAgIGxldCB4SW5kZXhUZXBtID0gcG9zSW5kZXg7XHJcbiAgICAgICAgbGV0IHlJbmRleFRlcG0gPSBwb3NJbmRleDtcclxuICAgICAgICBpZiAocG9zSW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB4SW5kZXhUZXBtID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvc0luZGV4ID09IDQpIHtcclxuICAgICAgICAgICAgeEluZGV4VGVwbSA9IDM7XHJcbiAgICAgICAgICAgIHlJbmRleFRlcG0gPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc0luZGV4ID09IDMpIHtcclxuICAgICAgICAgICAgeUluZGV4VGVwbSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwb3NYID0geEluZGV4VGVwbSAqIDQ1IC0gOTA7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB5SW5kZXhUZXBtICogNjAgLSAxMjA7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm8nICsgaGVyb1R5cGUsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS54ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlICsgcG9zWDtcclxuICAgICAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgICAgICBub2RlLnkgPSBocC55ICsgcG9zWSArIDE1MCArIDMwMDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykudGFyZ2V0WCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVybykucG9zWCA9IHBvc1g7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm8pLnBvc0luZGV4ID0gcG9zSW5kZXg7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0U2libGluZ0luZGV4KHRoaXMuaW5kZXhEYXRhW3Bvc0luZGV4XSk7XHJcbiAgICAgICAgICAgIEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmUm9vdChjYy52Mihwb3NYLCBub2RlLnkgKyAxNTApLCBoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHNldFJvZ3VlVGV4dChuOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJvZ3VlVGV4dC5zdHJpbmcgPSBuICsgXCJcIjtcclxuICAgIH1cclxuICAgIHNob3dLYWlaaGFuKCkge1xyXG4gICAgICAgIGxldCBrYWlaaGFuID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvS2FpWmhhbicpO1xyXG4gICAgICAgIGthaVpoYW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc3BpbmUgPSBrYWlaaGFuLmdldENoaWxkQnlOYW1lKCdLYWlaaGFuJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBsZXQgYW5pbWEgPSBzcGluZS5zZXRBbmltYXRpb24oMCwgJ0thaVpoYW4nLCBmYWxzZSk7Ly9ZWF9LYWl6aGFuXHJcbiAgICAgICAgc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKGFuaW1hLCAoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gJ0F0dGFjaycpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9LYWl6aGFuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgICAgICBrYWlaaGFuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdHVzQmF0dGxlUG90aW9uKCkge1xyXG4gICAgICAgIC8v5Yi35paw5oiY5paX6I2v5rC055qE54q25oCBXHJcbiAgICAgICAgZm9yIChsZXQgYmF0dGxlcG90aW9uaW5kZXggPSAwOyBiYXR0bGVwb3Rpb25pbmRleCA8IHRoaXMuYmF0dGxlcG90aW9uLmxlbmd0aDsgYmF0dGxlcG90aW9uaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvL+aVsOmHj1xyXG4gICAgICAgICAgICBsZXQgYmF0dGxlcG90aW9ubnVtYmVyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuYmF0dGxlcG90aW9uUHJvcElkW2JhdHRsZXBvdGlvbmluZGV4XSlcclxuICAgICAgICAgICAgLy/mlbDph4/mlLnlj5hcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiUmVkdHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBiYXR0bGVwb3Rpb25udW1iZXJcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiQmF0dGxlX0xvY2tcIikuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVwb3Rpb25udW1iZXIgPT0gMCkgey8v5pWw6YeP5Li6MOWPmOeBsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9IGVsc2Ugey8v5pWw6YeP5aSn5LqOMOWPmOS6rlxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+i/meS4gOWxgOaYr+WQpueUqOS6huS4gOasoVxyXG4gICAgICAgICAgICBsZXQgd2hldGhlcnVzZSA9IHRoaXMuYmF0dGxlcG90aW9uc3RhdGVbYmF0dGxlcG90aW9uaW5kZXhdXHJcbiAgICAgICAgICAgIGlmICh3aGV0aGVydXNlID09IDApIHsvL+aVsOmHj+S4ujDlj5jngbBcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfSBlbHNlIHsvL+aVsOmHj+Wkp+S6jjDlj5jkuq5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R2FtZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIpXHJcbiAgICAgICAgdGhpcy5TdGF0dXNCYXR0bGVQb3Rpb24oKVxyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZ20uY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvaW4oKTtcclxuICAgICAgICB0aGlzLnNob3dLYWlaaGFuKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgIGxldCB0b3AgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpXCIpO1xyXG5cclxuICAgICAgICAvL2xldCBjb2luQmc9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL2ljb25CZycpO1xyXG4gICAgICAgIHN3aXRjaCAoZ20uY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnY3VyTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbF9jb2luID0gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NSZXdhcmRfQ29pbihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL56ysTueroOeOqeWutuaVsCArIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKSk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL5oyR5oiY5YWz5Y2hICsgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5YWz5Y2hKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeWFs+WNoSk7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDAwMTcpXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC41KVxyXG5cclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkVuZGxlc3NfQnRuX0J1ZmZcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFByb2dyZXNzQmFyXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImN1ckxhYmVsXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIikuYWN0aXZlPWZhbHNlOyAgXHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LCAyKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWx0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAxOCkvLzgwMDAxOFxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvL+azouaVsC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHdhdmVudW1iZXJcclxuXHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeLQk9TU+aMkeaImOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBub2RlPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vZGVCeUlkKFVJUGF0aC5Db2luUG9wKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lOb2RlKFVJUGF0aC5Db2luUG9wLG5vZGUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSwwLjUpXHJcbiAgICAgICAgICAgICAgICAvLyB9LDAuNSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoXCJ1aS9nYW1lL2VuZGxlc3NfZ2FtZV91aVwiLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdCb3NzSHBSb290JykuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5lbmRsZXNzX3RzID0gbm9kZS5nZXRDb21wb25lbnQoRW5kbGVzc2dHYW1lVWkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZW5kbGVzc190cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYWOasoWJvc3Pni6nnjI4pO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyhQk9TU+eLqeeMjik7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDPmrKFCT1NT54up54yOKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsUHJvZ3Jlc3NCYXJcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiY3VyTGFiZWxcIikuYWN0aXZlPWZhbHNlOyBcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRvdGFsbnVtXHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIDMpO1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgICAgICAvLyB0b3RhbG51bSsrXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcyx0b3RhbG51bSk7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9ICcwLzEnO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiQm9zc1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInVpL2dhbWUvYm9zc19nYW1lX3VpXCIsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ0Jvc3NIcFJvb3QnKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NfY2hhbGxlbmdlX3RzID0gbm9kZS5nZXRDb21wb25lbnQoQm9zc0dhbWVVaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzX2NoYWxsZW5nZV90cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVfbGFiZWwubm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5jb2xvciA9IGNjLkNvbG9yLldISVRFXHJcbiAgICAgICAgICAgICAgICAvL3RvcC5nZXRDaGlsZEJ5TmFtZSgnaWNvblRpbWUnKS5jb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5UaW1lKClcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh54is5aGUKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeeIrOWhlCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5Yaw5rKz5o6i6ZmpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDAwMTcpXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0odHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1ZmYoKSB7Ly9idWZm5by556qXXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIisrKysrKytCdWZm5bGV56S65by556qXXCIpXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigwKTsvL0J1ZmblsZXnpLrlvLnnqpdcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDApOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgIGlmIChJc0RlYnVnKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coayArIFwiLOS4u+WKqOaKgOiDveWGt+WNtOaXtumXtDpcIiArIHYuc2tpbGxfdG90YWxfdGltZSArIFwiLOaUu+mAnzpcIiArIDEgLyB2Lmhlcm9fZGF0YS5nb25namlfamlhbmdlICsgXCLlop7kvKTvvJpcIiArIHYuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsIHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRBdHRyaWJ1dGVEYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRCZ0ltZygpIHtcclxuICAgICAgICAvLy9sZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgLy8gbGV0IGJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgbGV0IHdhbGxCZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9iZycpO1xyXG4gICAgICAgIGxldCB3YWxsRG93biA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJyk7XHJcbiAgICAgICAgLy/pgILphY3lnZDmoIdcclxuICAgICAgICAvLyBsZXQgaHA9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3Qvd2FsbF9yb290Jyk7XHJcbiAgICAgICAgLy8gd2FsbEJnLnk9aHAueSsxMDg7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSA9IHdhbGxCZy55ICsgd2FsbERvd24ueSArIHdhbGxEb3duLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzAueSA9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgLy/nq6BcclxuICAgICAgICAvL2xldCBuYW1lPUxldmVsTWFuYWdlci5nZXRMZXZlbE5hbWUobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm8gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm87XHJcbiAgICAgICAgbGV0IGJnTmFtZSA9IGZpZ2h0aW5nSW5mby5iZ19uYW1lO1xyXG4gICAgICAgIHRoaXMuY3VyX2JnX25hbWUgPSBiZ05hbWU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoYmdOYW1lLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJnMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICAgICAgdGhpcy5iZzEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBhc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoZmlnaHRpbmdJbmZvLndhbGxfbmFtZSwgY2MuU3ByaXRlRnJhbWUsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuU3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gd2FsbEJnLmdldENoaWxkQnlOYW1lKCdiZzJfd2FsbCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYXNzZXRzO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJnMl93YWxsID0gd2FsbEJnLmdldENoaWxkQnlOYW1lKCdiZzJfd2FsbCcpO1xyXG4gICAgICAgICAgICAvL2xldCBiYyA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJykuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgYmMuc2l6ZSA9IHdhbGxCZy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSA9IHdhbGxCZy55ICsgYmMubm9kZS55ICsgYmMubm9kZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAvLyB9LCAwLjUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCYW94aWFuZygpIHtcclxuICAgICAgICAvL+agueaNruW9k+WJjeaJgOWcqOazouaVsOaYvuekulxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5leHRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLmluaXRMZXZlbFNob3coKTtcclxuICAgICAgICB0aGlzLnNob3dEcHMoKTtcclxuICAgICAgICB0aGlzLnNob3dMZXZlbFByb2dyZXNzKCk7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRfdGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvaW4oKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJfYmdfbmFtZSAhPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uYmdfbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJnSW1nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmcgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9iZ19sb2FkaW5nJyk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy/lvIDlp4vliqDovb3lhbPljaHmiYDpnIDnmoTmgKrnialcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBwcm9ncmVzcy5wcm9ncmVzcyA9IDAuMDtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkRvdWJsZShidG46IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LqM5YCN6YCf54K55Ye75qyh5pWwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlICYmIHRoaXMudHJ5X3JhdGVfcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDAwMTA4KSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QYXVzZTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5XZWVrQ2FyZCwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfYXV0byA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19yYXRlID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdG5TZXR1cFJhdGUoKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgyKTtcclxuICAgICAgICAgICAgICAgIC8v5ZCv5Yqo6K+V55SoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9yYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63or5XnlKhcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkF1dG8oKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Ieq5Yqo5oiY5paX54K55Ye75qyh5pWwKTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0byA9PSBmYWxzZSAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDEwNykpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX2F1dG8gPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfYXV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8gPT0gZmFsc2UgJiYgdGhpcy50cnlfYXV0b19yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5pyJ5Ymp5L2Z5pe26Ze077yM5ZCv55SoL+WFs+mXreivleeUqFxyXG4gICAgICAgICAgICB0aGlzLmlzX3RyeV9hdXRvID0gIUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfdHJ5X2F1dG8gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5YWz6Zet77yM6YKj5bCx5YWz6Zet6K6h5pe2XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeV9hdXRvX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfYXV0b19yYW1haW4pXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIHRoaXMudHJ5X2F1dG9fcmFtYWluKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyghR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blBhdXNlKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X2F1dG9fcmFtYWluKVxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfYXV0b19yYW1haW4pO1xyXG4gICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9yYXRlX3JhbWFpbilcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIHRoaXMudHJ5X3JhdGVfcmFtYWluKTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5jaGFuZ2VIcCgtR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuZ2V0TWF4SHAoKSowLjY1KTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lUGF1c2UoKTsvL+aaguWBnFxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVXaW4oKTsvL+iDnOWIqVxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7Ly/lpLHotKVcclxuICAgICAgICAvL2NjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSZXdhcmRTU1VpKS5pbml0RGF0YSgxKTtcclxuICAgICAgICAvLyAgICAgfX0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRlc3QxKCkge1xyXG4gICAgICAgIC8vU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0MigpIHtcclxuICAgICAgICAvLyBsZXQgYm9zcz1Cb3NzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3MxJyk7XHJcbiAgICAgICAgLy8gaWYoYm9zcyl7XHJcbiAgICAgICAgLy8gICAgIGJvc3MuZ2V0Q29tcG9uZW50KEJ1bGxEZW1vbikuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCb3NzV2FybmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVwbGF5KCkge1xyXG4gICAgICAgIC8vIGxldCBwb3NYPU1hdGgucmFuZG9tKCkqNDAwLTIwMDtcclxuICAgICAgICAvLyBsZXQgcG9zWT1NYXRoLnJhbmRvbSgpKjQwMC0yMDA7XHJcbiAgICAgICAgLy8gbGV0IHBvcz1jYy52Mihwb3NYLHBvc1kpO1xyXG4gICAgICAgIC8vIGxldCBieD1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X21hbmFnZXIuY3JlYXRlQmFvWGlhbmdHdWFpKHBvcyk7XHJcbiAgICAgICAgLy8gYnguZ2V0Q29tcG9uZW50KEJhb1hpYW5nR3VhaSkuaW5pdChuZXcgTGV2ZWxCdWZmKCkpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CYXR0bGVwb3Rpb24oZXZlbnQsIHR5cGUpIHsvL+aImOaWl+iNr+awtOaMiemSriAgIOe6oiAgIOe7vyAgICDok51cclxuICAgICAgICBsZXQgbnVtID0gdHlwZVxyXG4gICAgICAgIGxldCBiYXR0bGVwb3Rpb25udW1iZXIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5iYXR0bGVwb3Rpb25Qcm9wSWRbbnVtXSlcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmF0dGxlcG90aW9uc3RhdGVbbnVtXSA9PSAwKSB7Ly/ov5nlsYDlt7Lnu4/nlKjov4fkuoYgICDpo5jlrZdcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMzApLCAzKTtcclxuICAgICAgICB9IGVsc2Ugey8v5aaC5p6c5rKh5pyJ55So6L+HXHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVwb3Rpb25udW1iZXIgPT0gMCkgey8v5pWw6YeP5LiN5aSfIOW8ueeql+i0reS5sOW8ueeqlyAgICAgICAg5aaC5p6c6ZK755+z55qE5pWw6YeP5aSf77yM55u05o6l6LSt5Lmw5LmL5ZCO5L2/55SoICBcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQnV5QmF0dGxlUG90aW9uLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCdXlCYXR0bGVQb3Rpb24pLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnV5QmF0dGxlUG90aW9uKS5pbml0VWkodHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8v6aaW5YWF5rKh5pyJ5a6M5oiQICAgIOWmguaenOmmluWFheayoeaciei0reS5sOWwseW8ueWHuummluWFhVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmlyc3RDaGFyZ2UsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+mmluWFheWujOaIkOS6hiAgIOW8ueWHuumSu+efs+i0reS5sFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5L2/55So6YGT5YW3OlwiLG51bSlcclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5SZWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkdyZWVuKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5CbHVlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blJlZCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya57qiXCIpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkdyZWVuKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLpgZPlhbfvvJrnu79cIilcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQmx1ZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya6JOdXCIpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzZXRUcnlBdXRvTGFiZWwoKSB7XHJcbiAgICAgICAgLy8gdGhpcy50cnlfYXV0b19sYWJlbC5ub2RlLmFjdGl2ZSA9IHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNSAmJiB0aGlzLmlzX3VubG9ja19hdXRvID09IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMudHJ5X2F1dG9fbGFiZWwuc3RyaW5nID0gTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcih0aGlzLnRyeV9hdXRvX3JhbWFpbikpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0VHJ5UmF0ZUxhYmVsKCkge1xyXG4gICAgICAgIC8vIHRoaXMudHJ5X3JhdGVfbGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDAgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDUgJiYgdGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnRyeV9yYXRlX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodGhpcy50cnlfcmF0ZV9yYW1haW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blJhdGVTaG93KCkge1xyXG4gICAgICAgIC8vIGxldCByYXRlID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvYnRuUmF0ZScpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmlzX3VubG9ja19yYXRlID09IHRydWUgfHwgdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCByYXRlTnVtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdG5TZXR1cFJhdGUoKTtcclxuICAgICAgICAvLyAgICAgcmF0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfcmF0ZVtyYXRlTnVtIC0gMV07XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgcmF0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BfcmF0ZVswXTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy50cnlfcmF0ZV9yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X3JhdGVfcmFtYWluKVxyXG4gICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgdGhpcy50cnlfcmF0ZV9yYW1haW4pO1xyXG4gICAgICAgIC8vIHJhdGUuYWN0aXZlID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuQXV0bygpIHtcclxuICAgICAgICAvLyBsZXQgYXV0byA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2J0bkF1dG8nKTtcclxuICAgICAgICAvLyBsZXQgYXV0b051bSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZyA/IDEgOiAwO1xyXG4gICAgICAgIC8vIGF1dG8uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX2F1dG9bYXV0b051bV07XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAvLyAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQXV0b0ZpZ2h0aW5nLCBhdXRvTnVtKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gYXV0by5hY3RpdmUgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPj0gNTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGltZSgpIHtcclxuICAgICAgICBsZXQgc2hpID0gTWF0aC5mbG9vcih0aGlzLnN0YXJ0X3RpbWUgLyAzNjAwKTtcclxuICAgICAgICBsZXQgc2hpU3RyID0gJzAnICsgc2hpO1xyXG4gICAgICAgIGlmIChzaGkgPj0gMTApIHtcclxuICAgICAgICAgICAgc2hpU3RyID0gJycgKyBzaGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmZW4gPSBNYXRoLmZsb29yKCh0aGlzLnN0YXJ0X3RpbWUgLSBzaGkgKiAzNjAwKSAvIDYwKTtcclxuICAgICAgICBsZXQgZmVuU3RyID0gJzAnICsgZmVuO1xyXG4gICAgICAgIGlmIChmZW4gPj0gMTApIHtcclxuICAgICAgICAgICAgZmVuU3RyID0gJycgKyBmZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaWFvID0gdGhpcy5zdGFydF90aW1lICUgNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHIgPSAnMCcgKyBtaWFvO1xyXG4gICAgICAgIGlmIChtaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIG1pYW9TdHIgPSAnJyArIG1pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZV9sYWJlbC5zdHJpbmcgPSBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UmVtYWluVGltZSgpIHtcclxuICAgICAgICBsZXQgcmVtYWluVGltZSA9IDkwIC0gdGhpcy5zdGFydF90aW1lO1xyXG4gICAgICAgIGxldCBzaGkgPSBNYXRoLmZsb29yKHJlbWFpblRpbWUgLyAzNjAwKTtcclxuICAgICAgICBsZXQgc2hpU3RyID0gJzAnICsgc2hpO1xyXG4gICAgICAgIGlmIChzaGkgPj0gMTApIHtcclxuICAgICAgICAgICAgc2hpU3RyID0gJycgKyBzaGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmZW4gPSBNYXRoLmZsb29yKChyZW1haW5UaW1lIC0gc2hpICogMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgbGV0IGZlblN0ciA9ICcwJyArIGZlbjtcclxuICAgICAgICBpZiAoZmVuID49IDEwKSB7XHJcbiAgICAgICAgICAgIGZlblN0ciA9ICcnICsgZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbyA9IHJlbWFpblRpbWUgJSA2MDtcclxuICAgICAgICBsZXQgbWlhb1N0ciA9ICcwJyArIG1pYW87XHJcbiAgICAgICAgaWYgKG1pYW8gPj0gMTApIHtcclxuICAgICAgICAgICAgbWlhb1N0ciA9ICcnICsgbWlhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsLnN0cmluZyA9IHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3MvdGltZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHNoaVN0ciArICc6JyArIGZlblN0ciArICc6JyArIG1pYW9TdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZW1haW5UaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExldmVsU2hvdygpIHtcclxuICAgICAgICBsZXQgd2F2ZUJnID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3Qvd2F2ZUJnJyk7XHJcbiAgICAgICAgLy90aGlzLmN1cl93YXZlX25vZGUgPSB3YXZlQmcucGFyZW50LmdldENoaWxkQnlOYW1lKCdjdXJfd2F2ZScpO1xyXG4gICAgICAgIC8vIHRoaXMuY3VyX3dhdmVfbm9kZS55ID0gd2F2ZUJnLnkgLSAyMDtcclxuICAgICAgICAvLyB0aGlzLmN1cl93YXZlX25vZGUueCA9IC0zMTU7XHJcbiAgICAgICAgLy8gdGhpcy5kaXN0X3h4ID0gLTMxNTtcclxuICAgICAgICAvL3RoaXMud2F2ZV9wb3NfeCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCB3YXZlVHlwZXMgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uZ2V0V2F2ZVR5cGVzKCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgbGVuID0gd2F2ZVR5cGVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmFsbFdhdmVMZW5ndGggPSB3YXZlVHlwZXMubGVuZ3RoO1xyXG4gICAgICAgIC8v566X5Ye65q+P5Liq55qE6ZW/5bqmXHJcbiAgICAgICAgbGV0IGppYW5nZU51bSA9IGxlbiAtIDE7XHJcbiAgICAgICAgbGV0IGppYW5nZVdpZHRoID0gNDtcclxuICAgICAgICBsZXQgamlhbmdlVG90YWxXaWR0aCA9IGppYW5nZU51bSAqIGppYW5nZVdpZHRoO1xyXG4gICAgICAgIGxldCB3YXZlVG90YWxXaWR0aCA9IHdhdmVCZy53aWR0aCAtIDUgKiAyIC0gamlhbmdlVG90YWxXaWR0aDtcclxuICAgICAgICBsZXQgd2F2ZVdpZHRoID0gd2F2ZVRvdGFsV2lkdGggLyBsZW47XHJcbiAgICAgICAgdGhpcy5sZWZ0X3h4ID0gLXdhdmVCZy53aWR0aCAvIDIgKyA1O1xyXG4gICAgICAgIGxldCBvbmVXaWR0aCA9IHdhdmVXaWR0aCArIGppYW5nZVdpZHRoO1xyXG4gICAgICAgIHRoaXMub25lX3dpZHRoID0gb25lV2lkdGg7XHJcbiAgICAgICAgdGhpcy53YXZlQmFyLmhlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy53YXZhTmFydGFnWT0wO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyW5YWz5Y2hXCIgKyB3YXZlVHlwZXMubGVuZ3RoKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCB0eXBlID0gd2F2ZVR5cGVzW2ldO1xyXG4gICAgICAgIC8vICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ub3JtYWxfd2F2ZSk7XHJcbiAgICAgICAgLy8gICAgIC8vIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgY2FzZSAwOiB7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX25vcm1hbF93YXZlKTtcclxuICAgICAgICAvLyAgICAgLy8gICAgIH0gYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBjYXNlIDE6IHtcclxuICAgICAgICAvLyAgICAgLy8gICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfYm9zc193YXZlKTtcclxuICAgICAgICAvLyAgICAgLy8gICAgIH0gYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAvLyAgICAgd2F2ZUJnLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIC8vICAgICBub2RlLm5hbWUgPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gICAgIG5vZGUud2lkdGggPSB3YXZlV2lkdGg7XHJcbiAgICAgICAgLy8gICAgIG5vZGUueCA9IHRoaXMubGVmdF94eCArIGkgKiBvbmVXaWR0aDtcclxuICAgICAgICAvLyAgICAgbm9kZS55ID0gMDtcclxuICAgICAgICAvLyAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfd2F2ZVswXTtcclxuICAgICAgICAvLyAgICAgbm9kZS5hY3RpdmUgPSB0eXBlID4gMDtcclxuICAgICAgICAvLyAgICAgbGV0IGppYW5nZVBvc1ggPSBub2RlLnggKyBub2RlLndpZHRoICsgamlhbmdlV2lkdGggLyAyO1xyXG4gICAgICAgIC8vICAgICAvLyBpZiAoaSAhPSBsZW4gLSAxKSB7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBsZXQgamlhbmdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfamlhbmdlKTtcclxuICAgICAgICAvLyAgICAgLy8gICAgIGppYW5nZS54ID0gamlhbmdlUG9zWDtcclxuICAgICAgICAvLyAgICAgLy8gICAgIGppYW5nZS55ID0gMDtcclxuICAgICAgICAvLyAgICAgLy8gICAgIHdhdmVCZy5hZGRDaGlsZChqaWFuZ2UpO1xyXG4gICAgICAgIC8vICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMud2F2ZV9wb3NfeC5wdXNoKGppYW5nZVBvc1gpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNob3dMZXZlbFByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRSb2d1ZVRleHQoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZUxpa2VOdW0oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xldmVsUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2ggKGdtLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGFsbEVuZW15TnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQga2lsbE51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwcm9ncmVzcz0oa2lsbE51bS9hbGxFbmVteU51bSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxldmVsX3Byb2dyZXNzLnByb2dyZXNzPXByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmc9a2lsbE51bSsnLycrYWxsRW5lbXlOdW07ICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cl93YXZlX25vZGUueD10aGlzLndhdmVfcG9zX3hbZ20uY3VyX3dhdmVdO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuY3VyX3dhdmVfc3ApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgd2F2ZUJnID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3Qvd2F2ZUJnJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+WFs+WNoVwiK2dtLmN1cl93YXZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhdmFOYXJ0YWdZPWdtLmN1cl93YXZlL3RoaXMuYWxsV2F2ZUxlbmd0aCp0aGlzLndhdmVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY3VyX3dhdmVfc3AgPSB3YXZlQmcuZ2V0Q2hpbGRCeU5hbWUoZ20uY3VyX3dhdmUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgdHlwZXMgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8uZ2V0V2F2ZVR5cGVzKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cl93YXZlX3NwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF93YXZlW3R5cGVzW2dtLmN1cl93YXZlXSArIDFdO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJfd2F2ZV9zcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgY3VyV2F2ZSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmU7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBwcmV2V2F2ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlLTE7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjdXJYWCA9IHRoaXMud2F2ZV9wb3NfeFtjdXJXYXZlXTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHByZXZYWD1wcmV2V2F2ZT49MD90aGlzLndhdmVfcG9zX3hbcHJldldhdmVdOnRoaXMubGVmdF94eDtcclxuICAgICAgICAgICAgICAgIC8vbGV0IG9mZnNldFhYPWN1clhYLXByZXZYWDsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmRpc3RfeHggPSBjdXJYWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9ndWVUZXh0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgICAgICAgICAgICAgLy93YXZlQmcuZ2V0Q1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZGxlc3NfdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZGxlc3NfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBHYW1lTW9kZS5Cb3NzX1Byc29uYWw6e1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodGhpcy5ib3NzX2NoYWxsZW5nZV90cyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5ib3NzX2NoYWxsZW5nZV90cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dKaWFuVG91UG9zKHBlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gbGV0IGN1cldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZTtcclxuICAgICAgICAvLyBsZXQgcHJldldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZS0xO1xyXG4gICAgICAgIC8vIGxldCBjdXJYWD10aGlzLndhdmVfcG9zX3hbY3VyV2F2ZV07XHJcbiAgICAgICAgLy8gbGV0IHByZXZYWD1wcmV2V2F2ZT49MD90aGlzLndhdmVfcG9zX3hbcHJldldhdmVdOnRoaXMubGVmdF94eDtcclxuICAgICAgICAvLyBsZXQgb2Zmc2V0WFg9Y3VyWFgtcHJldlhYOyAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5kaXN0X3h4PXByZXZYWCtvZmZzZXRYWCpwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvaW4oKSB7XHJcbiAgICAgICAgLy8gbGV0IGFsbEVuZW15TnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgLy8gbGV0IGtpbGxOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgLy8gdGhpcy5jb2luX2xhYmVsLnN0cmluZz1NeVRvb2wuZ2V0Q29pbkRhbndlaShraWxsTnVtL2FsbEVuZW15TnVtKnRoaXMudG90YWxfY29pbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0RwcygpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgICAgIGxldCBnZyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGxlbiA9IGdnLmhlcm9fc2tpbGxfZHBzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lsbERwcyA9IGdnLmhlcm9fc2tpbGxfZHBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgYXR0YWNrRHBzID0gZ2cuaGVyb19hdHRhY2tfZHBzW2ldO1xyXG4gICAgICAgICAgICB0b3RhbCArPSAoc2tpbGxEcHMgKyBhdHRhY2tEcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHBzID0gTWF0aC5yb3VuZCh0b3RhbCAvIHRoaXMuc3RhcnRfdGltZSk7XHJcbiAgICAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoZHBzKTsvLyAgICAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nPSdEUFMgJytNeVRvb2wuZ2V0Q29pbkRhbndlaShkcHMpO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL2Rwc0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGRwcylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBpZihJc0RlYnVnKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWknKTtcclxuICAgICAgICAvLyAgICAgbGV0IHRvdGFsPTA7XHJcbiAgICAgICAgLy8gICAgIGxldCBnZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vICAgICBsZXQgbGVuPWdnLmhlcm9fc2tpbGxfZHBzLmxlbmd0aDtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBza2lsbERwcz1nZy5oZXJvX3NraWxsX2Rwc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBhdHRhY2tEcHM9Z2cuaGVyb19hdHRhY2tfZHBzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgdG90YWwrPShza2lsbERwcythdHRhY2tEcHMpO1xyXG4gICAgICAgIC8vICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdhdHRMYWJlbCcraSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J+aUu+WHu++8micrYXR0YWNrRHBzO1xyXG4gICAgICAgIC8vICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdza2lsbExhYmVsJytpKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0n5oqA6IO977yaJytza2lsbERwcztcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgZHBzPU1hdGgucm91bmQodG90YWwvdGhpcy5zdGFydF90aW1lKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5kcHNfbGFiZWwuc3RyaW5nPSdEUFMgJytkcHM7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZV9qaXNodSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZV9qaXNodSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF90aW1lICs9IDE7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5UaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEcHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5jdXJfd2F2ZV9ub2RlLnggPCB0aGlzLmRpc3RfeHgpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY3VyX3dhdmVfbm9kZS54ICs9IGR0ICogMzA7XHJcbiAgICAgICAgICAgIC8vICAgICAvL3RoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSB0aGlzLm9uZV93aWR0aCAtICh0aGlzLmRpc3RfeHggLSB0aGlzLmN1cl93YXZlX25vZGUueCk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5jdXJfd2F2ZV9ub2RlLnggPiB0aGlzLmRpc3RfeHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cl93YXZlX25vZGUueCA9IHRoaXMuZGlzdF94eDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvL3RoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSB0aGlzLm9uZV93aWR0aDtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZoOiBudW1iZXIgPSAodGhpcy53YXZhTmFydGFnWSAtICB0aGlzLndhdmVCYXIuaGVpZ2h0KSAqIHRoaXMuZWFzaW5nO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVCYXIuaGVpZ2h0ICs9IHZoO1xyXG4gICAgICAgICAgICBsZXQgYUR0ID0gZHQ7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgYUR0ID0gZHQgLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhRHQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBhRHQgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9hdXRvICYmIHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gLT0gYUR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJ5X2F1dG9fcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9hdXRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QXV0b0ZpZ2h0aW5nKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9yYXRlICYmIHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gLT0gYUR0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJ5X3JhdGVfcmFtYWluIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3RyeV9yYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6IOM5pmv5b6q546vXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJnMCAmJiB0aGlzLmJnMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZzEueSAtPSBkdCAqIHRoaXMuYmdTcGVlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmcwLnkgLT0gZHQgKiB0aGlzLmJnU3BlZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmcwLnkgPD0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMiAtIGNjLndpblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZzAueSA9IHRoaXMuYmcxLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmcxLnkgPD0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5iZzAuaGVpZ2h0IC8gMiAtIGNjLndpblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmJnMl93YWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLmJnMl93YWxsLngpICogdGhpcy5lYXNpbmc7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJnMl93YWxsLnggKz0gdng7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvdGVjdGVkIGxhdGVVcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY3VyX3dhdmVfbm9kZS54PHRoaXMuZGlzdF94eCl7XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyB9XHJcbiAgICAvKirmlZnnqIsgKi9cclxuICAgIGNoZWNrVHV0b3JhaWxzKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSAmJiBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lUmF0ZSgxIC8gSmlhU3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIxMSwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTIsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIxMywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxICogR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19