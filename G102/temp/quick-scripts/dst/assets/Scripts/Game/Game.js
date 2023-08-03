
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        _this.waveBarBg = null;
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
        _this.rogueBg = null;
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
                    GameManager_1.default.getInstance().startNextLevel();
                    //GameManager.getInstance().showBtnBuff(1);//Buff选择弹窗
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
        //     WXManagerEX.getInstance().resourcesBundle.load('heros/hero8');
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('heros/hero' + heroType, cc.Prefab, function (error, assets) {
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
        this.waveBarBg.active = true;
        this.rogueBg.active = true;
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
                    top.getChildByName("Endless_Btn_Buff").active = false;
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
                    // WXManagerEX.getInstance().resourcesBundle.load("ui/game/endless_game_ui", cc.Prefab, (error: Error, assets: cc.Prefab) => {
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
                    this.waveBarBg.active = false;
                    this.rogueBg.active = false;
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
                    WXManagerEX_1.default.getInstance().resourcesBundle.load("ui/game/boss_game_ui", cc.Prefab, function (error, assets) {
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load(bgName, cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.bg0.getComponent(cc.Sprite).spriteFrame = assets;
            _this.bg1.getComponent(cc.Sprite).spriteFrame = assets;
        });
        WXManagerEX_1.default.getInstance().resourcesBundle.load(fightingInfo.wall_name, cc.SpriteFrame, function (error, assets) {
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
        property(cc.Node)
    ], Game.prototype, "waveBarBg", void 0);
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
    ], Game.prototype, "rogueBg", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBdUQ7QUFDdkQsMkRBQWlFO0FBQ2pFLHFEQUFnRDtBQUVoRCwyREFBaUU7QUFDakUsMENBQThFO0FBQzlFLHFFQUFnRTtBQUNoRSx3Q0FBbUM7QUFDbkMsOENBQXlDO0FBQ3pDLHdEQUF1RDtBQUN2RCwwQ0FBcUM7QUFFckMsc0RBQXFEO0FBQ3JELHNEQUE0RDtBQUM1RCxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCw4REFBeUQ7QUFDekQsNERBQTJEO0FBQzNELHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsbURBQWtEO0FBQ2xELDBEQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMsMENBQXFDO0FBQ3JDLHNEQUFpRDtBQUVqRCxrRUFBNkQ7QUFDN0QsMkNBQXNEO0FBQ3RELDZDQUE0QztBQUM1QyxtREFBOEM7QUFDOUMscURBQWdEO0FBQ2hELHVEQUFrRDtBQUNsRCwyREFBd0U7QUFFeEUsd0RBQW1EO0FBRTdDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBeWpDQztRQXRqQ0csYUFBTyxHQUFxQixFQUFFLENBQUM7UUFHL0IsYUFBTyxHQUFxQixFQUFFLENBQUM7UUFHL0IsYUFBTyxHQUFxQixFQUFFLENBQUM7UUFHL0Isd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBRXJDLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUVuQyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUNoQyxZQUFZO1FBQ1osVUFBVTtRQUVWLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsZUFBUyxH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LEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ1E7SUF3QjFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDYTtJQUloQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ007SUFxQnhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1c7SUE3RVosSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXlqQ3hCO0lBQUQsV0FBQztDQXpqQ0QsQUF5akNDLENBempDaUMsRUFBRSxDQUFDLFNBQVMsR0F5akM3QztrQkF6akNvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IEJvc3NHYW1lVWkgZnJvbSBcIi4uL0FjdGl2aXR5L0Jvc3NHYW1lVWlcIjtcclxuaW1wb3J0IEVuZGxlc3NnR2FtZVVpIGZyb20gXCIuLi9BY3Rpdml0eS9FbmRsZXNzZ0dhbWVVaVwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCdWZmRGlzcGxheSBmcm9tIFwiLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9CdWZmRGlzcGxheVwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IERpbmdZdWVNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi4vUGV0L0dhbWUvUGV0XCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgUmV3YXJkU1NVaSBmcm9tIFwiLi4vVHV0b3JpYWxzL1Jld2FyZFNTVWlcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBXZWVrQ2FyZFVpIGZyb20gXCIuLi9XZWVrQ2FyZC9XZWVrQ2FyZFVpXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgaW5zdGFuY2UgfSBmcm9tIFwiLi9Ub3VjaFBsYW5lL1RvdWNoUGxhbmVcIjtcclxuaW1wb3J0IEJ1eUJhdHRsZVBvdGlvbiBmcm9tIFwiLi9VaS9CdXlCYXR0bGVQb3Rpb25cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX3JhdGU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX2F1dG86IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX3dhdmU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX25vcm1hbF93YXZlOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ib3NzX3dhdmU6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2ppYW5nZTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8qKuW9k+WJjeazouaVsOiKgueCuSAqL1xyXG4gICAgLyoq6K+V55So5paH5pysICovXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHdhdmVCYXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3YXZlQmFyQmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgZWFzaW5nOiBudW1iZXIgPSAwLjE7XHJcbiAgICB3YXZhTmFydGFnWTpudW1iZXI9MDtcclxuICAgIGFsbFdhdmVMZW5ndGg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgd2F2ZUhlaWdodDogbnVtYmVyID0gMjgxO1xyXG4gICAgLy9jdXJfd2F2ZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8vY3VyX3dhdmVfc3A6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy93YXZlX3Bvc194OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgbGVmdF94eDogbnVtYmVyID0gMDtcclxuICAgIC8vZGlzdF94eDogbnVtYmVyID0gMDtcclxuICAgIG9uZV93aWR0aDogbnVtYmVyID0gMDtcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Kc29uQXNzZXQpXHJcbiAgICAvLyB6aGVuX3hpbmc6Y2MuSnNvbkFzc2V0PW51bGw7XHJcbiAgICAvKirmmK/lkKbop6PplIHkuobpgJ/njocgKi9cclxuICAgIGlzX3VubG9ja19yYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyeV9yYXRlX3JhbWFpbjogbnVtYmVyID0gNjAgKiAxMDtcclxuICAgIGlzX3RyeV9yYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKbop6PplIHkuoboh6rliqjmiJjmlpcgKi9cclxuICAgIGlzX3VubG9ja19hdXRvOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyeV9hdXRvX3JhbWFpbjogbnVtYmVyID0gNjAgKiAxMDtcclxuICAgIGlzX3RyeV9hdXRvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiror5XnlKjmlofmnKwgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRyeV9hdXRvX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKiror5XnlKjmlofmnKwgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRyeV9yYXRlX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLyoq5Ymp5L2Z5aSa5bCR5qyh5pi+56S6ICovXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICByb2d1ZVRleHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHJvZ3VlQmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy/mtYvor5VcclxuICAgIHN0YXJ0X3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICB0aW1lX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgdGltZV9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgYmcwOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJnMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBkcHNfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8v5YWz5Y2h6L+b5bqm5p2hXHJcbiAgICBsZXZlbF9wcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG4gICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIGNvaW5fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIHRvdGFsX2NvaW46IG51bWJlciA9IDA7XHJcbiAgICBlbmRsZXNzX3RzOiBFbmRsZXNzZ0dhbWVVaSA9IG51bGw7XHJcbiAgICAvL+W9k+WJjeiDjOaZr+S9v+eUqOeahOWQjeensFxyXG4gICAgY3VyX2JnX25hbWU6IHN0cmluZyA9ICdiZzInO1xyXG5cclxuICAgIHByaXZhdGUgYmdTcGVlZDogbnVtYmVyID0gNjA7XHJcblxyXG4gICAgLy/miJjmlpfoja/msLRcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlcG90aW9uOiBjYy5Ob2RlW10gPSBbXTsvL+e6ouiJsiAgIOe7v+iJsiAgIOiTneiJslxyXG4gICAgYmF0dGxlcG90aW9uUHJvcElkOiBQcm9wSWRbXSA9IFtQcm9wSWQuUmVkUG90aW9uLCBQcm9wSWQuR3JlZW5Qb3Rpb24sIFByb3BJZC5CbHVlUG90aW9uXS8v5oiY5paX6I2v5rC055qE6YGT5YW3aWRcclxuICAgIGJhdHRsZXBvdGlvbnN0YXRlOiBudW1iZXJbXSA9IFsxLCAxLCAxXS8v5oiY5paX6I2v5rC05Zyo6L+Z5LiA5bGA5piv5ZCm5L2/55So5LqGICDpu5jorqTmr4/kuIDkuKroja/msLTmnInkuIDmrKHkvb/nlKjnmoTmnLrkvJpcclxuXHJcbiAgICAvLyBiZzJfd2FsbDogY2MuTm9kZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0KEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdz10cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0QmdJbWcoKTtcclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEhlcm9zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkVHV0b3JhaWxzSGVyb0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3VubG9ja19hdXRvID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3VubG9ja19yYXRlID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNfdW5sb2NrX3JhdGUpIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRBdXRvRmlnaHRpbmcoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LnRyeV9hdXRvX2ZpZ2h0X3JlbWFpbiwgNjAgKiAxMCk7XHJcbiAgICAgICAgdGhpcy50cnlfcmF0ZV9yYW1haW4gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LnRyeV9yYXRlX2ZpZ2h0X3JlbWFpbiwgNjAgKiAxMCk7XHJcbiAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICB0aGlzLnNldFRyeVJhdGVMYWJlbCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcblxyXG4gICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgLy90aGlzLnN0YXJ0VGVzdCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fQmF0dGxlKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuTnVsbCwgNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnVpX21vbnN0ZXJfd2FybmluZywgMSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsU2hvdygpO1xyXG5cclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguUmV3YXJkU1NVSSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRVaUJ5UGF0aChVSVBhdGguU3RvcmVIZXJvU2hvd1VpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGVzdENhbWVyYSgpIHtcclxuICAgICAgICAvLyDliJvlu7rmuLLmn5PnurnnkIbvvIzlubborr7nva7nurnnkIblpKflsI/lkIzmmL7npLrlsY8oc2hvd1Nwcml0ZSnlpKflsI/kuIDmoLdcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoMzAwLCAyNDApO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9UZXN0Q2FtZXJhJykuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgbGV0IHNob3dTcHJpdGUgPSBjYy5maW5kKCdDYW52YXMvVGVzdC9zaG93Um9vdC9zaG93U3ByaXRlJyk7XHJcbiAgICAgICAgc2hvd1Nwcml0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpIHtcclxuICAgICAgICAvL+S4iuS4i+aooeWdl1xyXG4gICAgICAgIGxldCB0b3BVaSA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aScpO1xyXG4gICAgICAgIGxldCB3cCA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdG9wVWkueSA9IHdwLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy50aW1lX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9wcm9ncmVzcyA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdsZXZlbFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmxldmVsX3Byb2dyZXNzLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmxldmVsX2xhYmVsID0gdG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29pbl9sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdpY29uQmcnKS5nZXRDaGlsZEJ5TmFtZSgnY29pbkxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmRwc19sYWJlbCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdkcHNMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy/ln47loplcclxuICAgICAgICBsZXQgd2FsbEJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsX2JnJyk7XHJcbiAgICAgICAgd2FsbEJnLnkgPSAtKGNjLndpblNpemUuaGVpZ2h0IC8gMikgKyB3YWxsQmcuaGVpZ2h0IC8gMjtcclxuICAgICAgICAvL2hwXHJcbiAgICAgICAgbGV0IGhwID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgIGhwLnkgPSAtd3AuaGVpZ2h0IC8gMiArIGhwLmhlaWdodCAtIDI3Oy8vMjfmmK/ooYDmnaHnmoTlnZDmoIdcclxuICAgICAgICB0aGlzLmJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgdGhpcy5iZzEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpO1xyXG4gICAgICAgIHRoaXMuYmcwLnkgPSBjYy53aW5TaXplLmhlaWdodCAvIDIgLSB0aGlzLmJnMC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgIC8v5LiK56Kw5pKe54K5XHJcbiAgICAgICAgLy9jYy5maW5kKCdDYW52YXMvd2FsbF9yb290L3dhbGxfdG9wJykueT10b3BVaS55O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMb2FkaW5nKCkge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmcgPSBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyID0gYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbCA9IGxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcztcclxuICAgICAgICBsZXQgbG9hZGluZ1NjaGVkdWxlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzICs9IDAuMDA1O1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nID0gKGxvYWRpbmdCYXIucHJvZ3Jlc3MgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgICAgIGlmIChsb2FkaW5nQmFyLnByb2dyZXNzID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2NoZWR1bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSwgMC4wMik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGFydEdhbWUoKSB7XHJcbiAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEhlcm8uY3VyX2xvYWRlZF9udW0gPj0gSGVyby5tYXhfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgbGV0IGJnTG9hZGluZyA9IFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeL5peg5bC95oyR5oiY5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYWOasoeaXoOWwveaMkeaImCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHml6DlsL3mjJHmiJgpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh5peg5bC95oyR5oiYKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1cclxuICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbG51bVxyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywgMyk7XHJcbiAgICAgICAgICAgICAgICBudW0tLTtcclxuICAgICAgICAgICAgICAgIC8vIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsIG51bSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJvdW5kIC0gMSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gKFJvdW5kIC0gMilcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDEpOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJidWZmOlwiLEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIsUm91bmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbmRleExvYWQ6IEFycmF5PG51bWJlcj4gPSBbMiwgMSwgMywgMCwgNF07XHJcbiAgICBsb2FkSGVyb3MoKSB7XHJcbiAgICAgICAgLy/ojrflj5bpmJ/liJdcclxuICAgICAgICBIZXJvLm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSA9IDA7XHJcbiAgICAgICAgUGV0Lm1heF9sb2FkX251bSA9IDA7XHJcbiAgICAgICAgUGV0LmN1cl9sb2FkZWRfbnVtID0gMDtcclxuICAgICAgICBsZXQgdGVhbUxpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlYW1MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvVHlwZSA9IHRlYW1MaXN0W3RoaXMuaW5kZXhMb2FkW2ldXTtcclxuICAgICAgICAgICAgaWYgKGhlcm9UeXBlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGVybyhoZXJvVHlwZSwgdGhpcy5pbmRleExvYWRbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxoZXJvUm9vdC5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgIC8vICAgICBsZXQgaGVybz1oZXJvUm9vdC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoSGVybyk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+mihOWKoOi9veW8k+aJi0hlcm9fUm9vdFxyXG4gICAgICAgIC8vIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gNSkge1xyXG4gICAgICAgIC8vICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9oZXJvOCcpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5kZXhEYXRhOiBBcnJheTxudW1iZXI+ID0gWzMsIDEsIDAsIDIsIDRdO1xyXG4gICAgbG9hZEhlcm8oaGVyb1R5cGU6IEhlcm9fVHlwZSwgcG9zSW5kZXg6IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIEhlcm8ubWF4X2xvYWRfbnVtKys7XHJcbiAgICAgICAgbGV0IHhJbmRleFRlcG0gPSBwb3NJbmRleDtcclxuICAgICAgICBsZXQgeUluZGV4VGVwbSA9IHBvc0luZGV4O1xyXG4gICAgICAgIGlmIChwb3NJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHhJbmRleFRlcG0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgICB4SW5kZXhUZXBtID0gMztcclxuICAgICAgICAgICAgeUluZGV4VGVwbSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zSW5kZXggPT0gMykge1xyXG4gICAgICAgICAgICB5SW5kZXhUZXBtID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvc1ggPSB4SW5kZXhUZXBtICogNDUgLSA5MDtcclxuICAgICAgICBsZXQgcG9zWSA9IHlJbmRleFRlcG0gKiA2MCAtIDEyMDtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdoZXJvcy9oZXJvJyArIGhlcm9UeXBlLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSArIHBvc1g7XHJcbiAgICAgICAgICAgIGxldCBocCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICAgICAgbm9kZS55ID0gaHAueSArIHBvc1kgKyAxNTAgKyAzMDA7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm8pLnRhcmdldFggPSBub2RlLng7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm8pLnBvc1ggPSBwb3NYO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChIZXJvKS5wb3NJbmRleCA9IHBvc0luZGV4O1xyXG4gICAgICAgICAgICBub2RlLnNldFNpYmxpbmdJbmRleCh0aGlzLmluZGV4RGF0YVtwb3NJbmRleF0pO1xyXG4gICAgICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIocG9zWCwgbm9kZS55ICsgMTUwKSwgaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBzZXRSb2d1ZVRleHQobjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yb2d1ZVRleHQuc3RyaW5nID0gbiArIFwiXCI7XHJcbiAgICB9XHJcbiAgICBzaG93S2FpWmhhbigpIHtcclxuICAgICAgICBsZXQga2FpWmhhbiA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L0thaVpoYW4nKTtcclxuICAgICAgICBrYWlaaGFuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNwaW5lID0ga2FpWmhhbi5nZXRDaGlsZEJ5TmFtZSgnS2FpWmhhbicpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IGFuaW1hID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdLYWlaaGFuJywgZmFsc2UpOy8vWVhfS2FpemhhblxyXG4gICAgICAgIHNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09ICdBdHRhY2snKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS2Fpemhhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAga2FpWmhhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0YXR1c0JhdHRsZVBvdGlvbigpIHtcclxuICAgICAgICAvL+WIt+aWsOaImOaWl+iNr+awtOeahOeKtuaAgVxyXG4gICAgICAgIGZvciAobGV0IGJhdHRsZXBvdGlvbmluZGV4ID0gMDsgYmF0dGxlcG90aW9uaW5kZXggPCB0aGlzLmJhdHRsZXBvdGlvbi5sZW5ndGg7IGJhdHRsZXBvdGlvbmluZGV4KyspIHtcclxuICAgICAgICAgICAgLy/mlbDph49cclxuICAgICAgICAgICAgbGV0IGJhdHRsZXBvdGlvbm51bWJlciA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmJhdHRsZXBvdGlvblByb3BJZFtiYXR0bGVwb3Rpb25pbmRleF0pXHJcbiAgICAgICAgICAgIC8v5pWw6YeP5pS55Y+YXHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlJlZHR4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgYmF0dGxlcG90aW9ubnVtYmVyXHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIkJhdHRsZV9Mb2NrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlcG90aW9ubnVtYmVyID09IDApIHsvL+aVsOmHj+S4ujDlj5jngbBcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfSBlbHNlIHsvL+aVsOmHj+Wkp+S6jjDlj5jkuq5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlcG90aW9uW2JhdHRsZXBvdGlvbmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/ov5nkuIDlsYDmmK/lkKbnlKjkuobkuIDmrKFcclxuICAgICAgICAgICAgbGV0IHdoZXRoZXJ1c2UgPSB0aGlzLmJhdHRsZXBvdGlvbnN0YXRlW2JhdHRsZXBvdGlvbmluZGV4XVxyXG4gICAgICAgICAgICBpZiAod2hldGhlcnVzZSA9PSAwKSB7Ly/mlbDph4/kuLow5Y+Y54GwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJCYXR0bGVfTG9ja1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7Ly/mlbDph4/lpKfkuo4w5Y+Y5LquXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXBvdGlvbltiYXR0bGVwb3Rpb25pbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJCYXR0bGVfTG9ja1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVwb3Rpb25bYmF0dGxlcG90aW9uaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiKVxyXG4gICAgICAgIHRoaXMuU3RhdHVzQmF0dGxlUG90aW9uKClcclxuICAgICAgICBsZXQgZ20gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICB0aGlzLnNob3dDb2luKCk7XHJcbiAgICAgICAgdGhpcy5zaG93S2FpWmhhbigpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuUmF0ZVNob3coKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkF1dG8oKTtcclxuICAgICAgICBsZXQgdG9wID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aVwiKTtcclxuICAgICAgICB0aGlzLndhdmVCYXJCZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLnJvZ3VlQmcuYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgIC8vbGV0IGNvaW5CZz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvaWNvbkJnJyk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjoge1xyXG4gICAgICAgICAgICAgICAgLy9jb2luQmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2NvaW4gPSBNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc1Jld2FyZF9Db2luKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4vnrKxO56ug546p5a625pWwICsgTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lvIDlp4vmjJHmiJjlhbPljaEgKyBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKHlhbPljaEpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgz5qyh5YWz5Y2hKTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWx0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE0MDAxNylcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjUpXHJcblxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6IHtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImxldmVsUHJvZ3Jlc3NCYXJcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwiY3VyTGFiZWxcIikuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbFwiKS5hY3RpdmU9ZmFsc2U7ICBcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsb19oaXQsIDIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbHR4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDE4KS8vODAwMDE4XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvL+azouaVsC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlciA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLCAwKVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHdhdmVudW1iZXJcclxuXHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5byA5aeLQk9TU+aMkeaImOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBub2RlPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vZGVCeUlkKFVJUGF0aC5Db2luUG9wKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lOb2RlKFVJUGF0aC5Db2luUG9wLG5vZGUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSwwLjUpXHJcbiAgICAgICAgICAgICAgICAvLyB9LDAuNSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChcInVpL2dhbWUvZW5kbGVzc19nYW1lX3VpXCIsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ0Jvc3NIcFJvb3QnKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmVuZGxlc3NfdHMgPSBub2RlLmdldENvbXBvbmVudChFbmRsZXNzZ0dhbWVVaSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5lbmRsZXNzX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZToge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJhY5qyhYm9zc+eLqeeMjik7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaMkeaImDHmrKFCT1NT54up54yOKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoUJPU1Pni6nnjI4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMud2F2ZUJhckJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9ndWVCZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFByb2dyZXNzQmFyXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcImN1ckxhYmVsXCIpLmFjdGl2ZT1mYWxzZTsgXHJcbiAgICAgICAgICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vY29pbkJnLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1cclxuICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbG51bVxyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCAzKTtcclxuICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICAgICAgLy8gdG90YWxudW0rK1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSAnMC8xJztcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIkJvc3NcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiRW5kbGVzc19CdG5fQnVmZlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChcInVpL2dhbWUvYm9zc19nYW1lX3VpXCIsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ0Jvc3NIcFJvb3QnKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NfY2hhbGxlbmdlX3RzID0gbm9kZS5nZXRDb21wb25lbnQoQm9zc0dhbWVVaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzX2NoYWxsZW5nZV90cy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVfbGFiZWwubm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5jb2xvciA9IGNjLkNvbG9yLldISVRFXHJcbiAgICAgICAgICAgICAgICAvL3RvcC5nZXRDaGlsZEJ5TmFtZSgnaWNvblRpbWUnKS5jb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZW1haW5UaW1lKClcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjoge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh54is5aGUKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5oyR5oiYM+asoeeIrOWhlCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvaW5CZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZToge1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7mjJHmiJgx5qyh5Yaw5rKz5o6i6ZmpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdjdXJMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsdHh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxNDAwMTcpXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJCb3NzXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJFbmRsZXNzX0J0bl9CdWZmXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0odHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1ZmYoKSB7Ly9idWZm5by556qXXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIisrKysrKytCdWZm5bGV56S65by556qXXCIpXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QnRuQnVmZigwKTsvL0J1ZmblsZXnpLrlvLnnqpdcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdG5CdWZmKDApOy8vQnVmZumAieaLqeW8ueeql1xyXG4gICAgICAgIGlmIChJc0RlYnVnKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coayArIFwiLOS4u+WKqOaKgOiDveWGt+WNtOaXtumXtDpcIiArIHYuc2tpbGxfdG90YWxfdGltZSArIFwiLOaUu+mAnzpcIiArIDEgLyB2Lmhlcm9fZGF0YS5nb25namlfamlhbmdlICsgXCLlop7kvKTvvJpcIiArIHYuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsIHYuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRBdHRyaWJ1dGVEYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRCZ0ltZygpIHtcclxuICAgICAgICAvLy9sZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgLy8gbGV0IGJnMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgbGV0IHdhbGxCZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9iZycpO1xyXG4gICAgICAgIGxldCB3YWxsRG93biA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJyk7XHJcbiAgICAgICAgLy/pgILphY3lnZDmoIdcclxuICAgICAgICAvLyBsZXQgaHA9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3Qvd2FsbF9yb290Jyk7XHJcbiAgICAgICAgLy8gd2FsbEJnLnk9aHAueSsxMDg7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSA9IHdhbGxCZy55ICsgd2FsbERvd24ueSArIHdhbGxEb3duLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzAueSA9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy5iZzEueSA9IHRoaXMuYmcwLnkgKyB0aGlzLmJnMC5oZWlnaHQ7XHJcbiAgICAgICAgLy/nq6BcclxuICAgICAgICAvL2xldCBuYW1lPUxldmVsTWFuYWdlci5nZXRMZXZlbE5hbWUobGV2ZWwpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm8gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm87XHJcbiAgICAgICAgbGV0IGJnTmFtZSA9IGZpZ2h0aW5nSW5mby5iZ19uYW1lO1xyXG4gICAgICAgIHRoaXMuY3VyX2JnX25hbWUgPSBiZ05hbWU7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChiZ05hbWUsIGNjLlNwcml0ZUZyYW1lLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmcwLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYXNzZXRzO1xyXG4gICAgICAgICAgICB0aGlzLmJnMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKGZpZ2h0aW5nSW5mby53YWxsX25hbWUsIGNjLlNwcml0ZUZyYW1lLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnYmcyX3dhbGwnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGFzc2V0cztcclxuICAgICAgICAgICAgLy8gdGhpcy5iZzJfd2FsbCA9IHdhbGxCZy5nZXRDaGlsZEJ5TmFtZSgnYmcyX3dhbGwnKTtcclxuICAgICAgICAgICAgLy9sZXQgYmMgPSB3YWxsQmcuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGJjLnNpemUgPSB3YWxsQmcuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kgPSB3YWxsQmcueSArIGJjLm5vZGUueSArIGJjLm5vZGUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgLy8gfSwgMC41KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QmFveGlhbmcoKSB7XHJcbiAgICAgICAgLy/moLnmja7lvZPliY3miYDlnKjms6LmlbDmmL7npLpcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxTaG93KCk7XHJcbiAgICAgICAgdGhpcy5zaG93RHBzKCk7XHJcbiAgICAgICAgdGhpcy5zaG93TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0X3RpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB0aGlzLnNob3dDb2luKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2JnX25hbWUgIT0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmJnX25hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCZ0ltZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQcm9ncmVzcygpIHtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvYmdfbG9hZGluZycpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5byA5aeL5Yqg6L295YWz5Y2h5omA6ZyA55qE5oCq54mpXHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgcHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Eb3VibGUoYnRuOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS6jOWAjemAn+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDEwOCkpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGF1c2U7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX2F1dG8gPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc191bmxvY2tfcmF0ZSA9IERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QnRuU2V0dXBSYXRlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5QXV0b0xhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnRuU2V0dXBSYXRlKCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdG5TZXR1cFJhdGUoMik7XHJcbiAgICAgICAgICAgICAgICAvL+WQr+WKqOivleeUqFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2UgJiYgdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIC8v5YWz6Zet6K+V55SoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHJ5X3JhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blJhdGVTaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BdXRvKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiHquWKqOaImOaWl+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8gPT0gZmFsc2UgJiYgdGhpcy50cnlfYXV0b19yYW1haW4gPD0gMCkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAxMDcpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BhdXNlO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLldlZWtDYXJkLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3VubG9ja19hdXRvID0gRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdW5sb2NrX3JhdGUgPSBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlZWtJbmZvKCkuaXNfYnV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfdW5sb2NrX2F1dG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyeUF1dG9MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJ5UmF0ZUxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzX3VubG9ja19hdXRvID09IGZhbHNlICYmIHRoaXMudHJ5X2F1dG9fcmFtYWluID4gMCkge1xyXG4gICAgICAgICAgICAvL+acieWJqeS9meaXtumXtO+8jOWQr+eUqC/lhbPpl63or5XnlKhcclxuICAgICAgICAgICAgdGhpcy5pc190cnlfYXV0byA9ICFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX3RyeV9hdXRvID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXre+8jOmCo+WwseWFs+mXreiuoeaXtlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlfYXV0b19yYW1haW4gPSBNYXRoLmZsb29yKHRoaXMudHJ5X2F1dG9fcmFtYWluKVxyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X2F1dG9fZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9hdXRvX3JhbWFpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRBdXRvRmlnaHRpbmcoIUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZyk7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5BdXRvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5QYXVzZSgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9hdXRvX3JhbWFpbilcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfYXV0b19maWdodF9yZW1haW4sIHRoaXMudHJ5X2F1dG9fcmFtYWluKTtcclxuICAgICAgICB0aGlzLnRyeV9yYXRlX3JhbWFpbiA9IE1hdGguZmxvb3IodGhpcy50cnlfcmF0ZV9yYW1haW4pXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkudHJ5X3JhdGVfZmlnaHRfcmVtYWluLCB0aGlzLnRyeV9yYXRlX3JhbWFpbik7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuY2hhbmdlSHAoLUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmdldE1heEhwKCkqMC42NSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVBhdXNlKCk7Ly/mmoLlgZxcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lV2luKCk7Ly/og5zliKlcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZSgpOy8v5aSx6LSlXHJcbiAgICAgICAgLy9jYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgLy8gICAgIH19KTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0MSgpIHtcclxuICAgICAgICAvL1NraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVGVzdDIoKSB7XHJcbiAgICAgICAgLy8gbGV0IGJvc3M9Qm9zc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENoaWxkQnlOYW1lKCdib3NzMScpO1xyXG4gICAgICAgIC8vIGlmKGJvc3Mpe1xyXG4gICAgICAgIC8vICAgICBib3NzLmdldENvbXBvbmVudChCdWxsRGVtb24pLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Qm9zc1dhcm5pbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJlcGxheSgpIHtcclxuICAgICAgICAvLyBsZXQgcG9zWD1NYXRoLnJhbmRvbSgpKjQwMC0yMDA7XHJcbiAgICAgICAgLy8gbGV0IHBvc1k9TWF0aC5yYW5kb20oKSo0MDAtMjAwO1xyXG4gICAgICAgIC8vIGxldCBwb3M9Y2MudjIocG9zWCxwb3NZKTtcclxuICAgICAgICAvLyBsZXQgYng9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9tYW5hZ2VyLmNyZWF0ZUJhb1hpYW5nR3VhaShwb3MpO1xyXG4gICAgICAgIC8vIGJ4LmdldENvbXBvbmVudChCYW9YaWFuZ0d1YWkpLmluaXQobmV3IExldmVsQnVmZigpKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQmF0dGxlcG90aW9uKGV2ZW50LCB0eXBlKSB7Ly/miJjmlpfoja/msLTmjInpkq4gICDnuqIgICDnu78gICAg6JOdXHJcbiAgICAgICAgbGV0IG51bSA9IHR5cGVcclxuICAgICAgICBsZXQgYmF0dGxlcG90aW9ubnVtYmVyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuYmF0dGxlcG90aW9uUHJvcElkW251bV0pXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJhdHRsZXBvdGlvbnN0YXRlW251bV0gPT0gMCkgey8v6L+Z5bGA5bey57uP55So6L+H5LqGICAg6aOY5a2XXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTMwKSwgMyk7XHJcbiAgICAgICAgfSBlbHNlIHsvL+WmguaenOayoeacieeUqOi/h1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlcG90aW9ubnVtYmVyID09IDApIHsvL+aVsOmHj+S4jeWknyDlvLnnqpfotK3kubDlvLnnqpcgICAgICAgIOWmguaenOmSu+efs+eahOaVsOmHj+Wkn++8jOebtOaOpei0reS5sOS5i+WQjuS9v+eUqCAgXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJ1eUJhdHRsZVBvdGlvbiwgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQnV5QmF0dGxlUG90aW9uKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJ1eUJhdHRsZVBvdGlvbikuaW5pdFVpKHR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheU51bSgnYzMwMScpPD0wKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+mmluWFheayoeacieWujOaIkCAgICDlpoLmnpzpppblhYXmsqHmnInotK3kubDlsLHlvLnlh7rpppblhYVcclxuICAgICAgICAgICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb25DbG9zZTooKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/pppblhYXlrozmiJDkuoYgICDlvLnlh7rpkrvnn7PotK3kubBcclxuICAgICAgICAgICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuS9v+eUqOmBk+WFtzpcIixudW0pXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuUmVkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5HcmVlbigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQmx1ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5SZWQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt++8mue6olwiKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5HcmVlbigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwi6YGT5YW377ya57u/XCIpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJsdWUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt++8muiTnVwiKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2V0VHJ5QXV0b0xhYmVsKCkge1xyXG4gICAgICAgIC8vIHRoaXMudHJ5X2F1dG9fbGFiZWwubm9kZS5hY3RpdmUgPSB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDAgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDUgJiYgdGhpcy5pc191bmxvY2tfYXV0byA9PSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnRyeV9hdXRvX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodGhpcy50cnlfYXV0b19yYW1haW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRyeVJhdGVMYWJlbCgpIHtcclxuICAgICAgICAvLyB0aGlzLnRyeV9yYXRlX2xhYmVsLm5vZGUuYWN0aXZlID0gdGhpcy50cnlfcmF0ZV9yYW1haW4gPiAwICYmIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1ICYmIHRoaXMuaXNfdW5sb2NrX3JhdGUgPT0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy50cnlfcmF0ZV9sYWJlbC5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHRoaXMudHJ5X3JhdGVfcmFtYWluKSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5SYXRlU2hvdygpIHtcclxuICAgICAgICAvLyBsZXQgcmF0ZSA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2J0blJhdGUnKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5pc191bmxvY2tfcmF0ZSA9PSB0cnVlIHx8IHRoaXMudHJ5X3JhdGVfcmFtYWluID4gMCkge1xyXG4gICAgICAgIC8vICAgICBsZXQgcmF0ZU51bSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnRuU2V0dXBSYXRlKCk7XHJcbiAgICAgICAgLy8gICAgIHJhdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3JhdGVbcmF0ZU51bSAtIDFdO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHJhdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3JhdGVbMF07XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gTWF0aC5mbG9vcih0aGlzLnRyeV9yYXRlX3JhbWFpbilcclxuICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS50cnlfcmF0ZV9maWdodF9yZW1haW4sIHRoaXMudHJ5X3JhdGVfcmFtYWluKTtcclxuICAgICAgICAvLyByYXRlLmFjdGl2ZSA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0bkF1dG8oKSB7XHJcbiAgICAgICAgLy8gbGV0IGF1dG8gPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9idG5BdXRvJyk7XHJcbiAgICAgICAgLy8gbGV0IGF1dG9OdW0gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmcgPyAxIDogMDtcclxuICAgICAgICAvLyBhdXRvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcF9hdXRvW2F1dG9OdW1dO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmlzX3VubG9ja19hdXRvKSB7XHJcbiAgICAgICAgLy8gICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkF1dG9GaWdodGluZywgYXV0b051bSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGF1dG8uYWN0aXZlID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsID49IDU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RpbWUoKSB7XHJcbiAgICAgICAgbGV0IHNoaSA9IE1hdGguZmxvb3IodGhpcy5zdGFydF90aW1lIC8gMzYwMCk7XHJcbiAgICAgICAgbGV0IHNoaVN0ciA9ICcwJyArIHNoaTtcclxuICAgICAgICBpZiAoc2hpID49IDEwKSB7XHJcbiAgICAgICAgICAgIHNoaVN0ciA9ICcnICsgc2hpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmVuID0gTWF0aC5mbG9vcigodGhpcy5zdGFydF90aW1lIC0gc2hpICogMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgbGV0IGZlblN0ciA9ICcwJyArIGZlbjtcclxuICAgICAgICBpZiAoZmVuID49IDEwKSB7XHJcbiAgICAgICAgICAgIGZlblN0ciA9ICcnICsgZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbyA9IHRoaXMuc3RhcnRfdGltZSAlIDYwO1xyXG4gICAgICAgIGxldCBtaWFvU3RyID0gJzAnICsgbWlhbztcclxuICAgICAgICBpZiAobWlhbyA+PSAxMCkge1xyXG4gICAgICAgICAgICBtaWFvU3RyID0gJycgKyBtaWFvO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVfbGFiZWwuc3RyaW5nID0gc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy90aW1lTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgc2hpU3RyICsgJzonICsgZmVuU3RyICsgJzonICsgbWlhb1N0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlbWFpblRpbWUoKSB7XHJcbiAgICAgICAgbGV0IHJlbWFpblRpbWUgPSA5MCAtIHRoaXMuc3RhcnRfdGltZTtcclxuICAgICAgICBsZXQgc2hpID0gTWF0aC5mbG9vcihyZW1haW5UaW1lIC8gMzYwMCk7XHJcbiAgICAgICAgbGV0IHNoaVN0ciA9ICcwJyArIHNoaTtcclxuICAgICAgICBpZiAoc2hpID49IDEwKSB7XHJcbiAgICAgICAgICAgIHNoaVN0ciA9ICcnICsgc2hpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmVuID0gTWF0aC5mbG9vcigocmVtYWluVGltZSAtIHNoaSAqIDM2MDApIC8gNjApO1xyXG4gICAgICAgIGxldCBmZW5TdHIgPSAnMCcgKyBmZW47XHJcbiAgICAgICAgaWYgKGZlbiA+PSAxMCkge1xyXG4gICAgICAgICAgICBmZW5TdHIgPSAnJyArIGZlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pYW8gPSByZW1haW5UaW1lICUgNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHIgPSAnMCcgKyBtaWFvO1xyXG4gICAgICAgIGlmIChtaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIG1pYW9TdHIgPSAnJyArIG1pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZV9sYWJlbC5zdHJpbmcgPSBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzL3RpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBzaGlTdHIgKyAnOicgKyBmZW5TdHIgKyAnOicgKyBtaWFvU3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVtYWluVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRMZXZlbFNob3coKSB7XHJcbiAgICAgICAgbGV0IHdhdmVCZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3dhdmVCZycpO1xyXG4gICAgICAgIC8vdGhpcy5jdXJfd2F2ZV9ub2RlID0gd2F2ZUJnLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnY3VyX3dhdmUnKTtcclxuICAgICAgICAvLyB0aGlzLmN1cl93YXZlX25vZGUueSA9IHdhdmVCZy55IC0gMjA7XHJcbiAgICAgICAgLy8gdGhpcy5jdXJfd2F2ZV9ub2RlLnggPSAtMzE1O1xyXG4gICAgICAgIC8vIHRoaXMuZGlzdF94eCA9IC0zMTU7XHJcbiAgICAgICAgLy90aGlzLndhdmVfcG9zX3ggPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgd2F2ZVR5cGVzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxlbiA9IHdhdmVUeXBlcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5hbGxXYXZlTGVuZ3RoID0gd2F2ZVR5cGVzLmxlbmd0aDtcclxuICAgICAgICAvL+eul+WHuuavj+S4queahOmVv+W6plxyXG4gICAgICAgIGxldCBqaWFuZ2VOdW0gPSBsZW4gLSAxO1xyXG4gICAgICAgIGxldCBqaWFuZ2VXaWR0aCA9IDQ7XHJcbiAgICAgICAgbGV0IGppYW5nZVRvdGFsV2lkdGggPSBqaWFuZ2VOdW0gKiBqaWFuZ2VXaWR0aDtcclxuICAgICAgICBsZXQgd2F2ZVRvdGFsV2lkdGggPSB3YXZlQmcud2lkdGggLSA1ICogMiAtIGppYW5nZVRvdGFsV2lkdGg7XHJcbiAgICAgICAgbGV0IHdhdmVXaWR0aCA9IHdhdmVUb3RhbFdpZHRoIC8gbGVuO1xyXG4gICAgICAgIHRoaXMubGVmdF94eCA9IC13YXZlQmcud2lkdGggLyAyICsgNTtcclxuICAgICAgICBsZXQgb25lV2lkdGggPSB3YXZlV2lkdGggKyBqaWFuZ2VXaWR0aDtcclxuICAgICAgICB0aGlzLm9uZV93aWR0aCA9IG9uZVdpZHRoO1xyXG4gICAgICAgIHRoaXMud2F2ZUJhci5oZWlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMud2F2YU5hcnRhZ1k9MDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIneWni+WMluWFs+WNoVwiICsgd2F2ZVR5cGVzLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgdHlwZSA9IHdhdmVUeXBlc1tpXTtcclxuICAgICAgICAvLyAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbm9ybWFsX3dhdmUpO1xyXG4gICAgICAgIC8vICAgICAvLyBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAvLyAgICAgLy8gICAgIGNhc2UgMDoge1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ub3JtYWxfd2F2ZSk7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICB9IGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2Jvc3Nfd2F2ZSk7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICB9IGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIHdhdmVCZy5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAvLyAgICAgbm9kZS5uYW1lID0gaS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vICAgICBub2RlLndpZHRoID0gd2F2ZVdpZHRoO1xyXG4gICAgICAgIC8vICAgICBub2RlLnggPSB0aGlzLmxlZnRfeHggKyBpICogb25lV2lkdGg7XHJcbiAgICAgICAgLy8gICAgIG5vZGUueSA9IDA7XHJcbiAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwX3dhdmVbMF07XHJcbiAgICAgICAgLy8gICAgIG5vZGUuYWN0aXZlID0gdHlwZSA+IDA7XHJcbiAgICAgICAgLy8gICAgIGxldCBqaWFuZ2VQb3NYID0gbm9kZS54ICsgbm9kZS53aWR0aCArIGppYW5nZVdpZHRoIC8gMjtcclxuICAgICAgICAvLyAgICAgLy8gaWYgKGkgIT0gbGVuIC0gMSkge1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgbGV0IGppYW5nZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2ppYW5nZSk7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBqaWFuZ2UueCA9IGppYW5nZVBvc1g7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBqaWFuZ2UueSA9IDA7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICB3YXZlQmcuYWRkQ2hpbGQoamlhbmdlKTtcclxuICAgICAgICAvLyAgICAgLy8gfVxyXG4gICAgICAgIC8vICAgICB0aGlzLndhdmVfcG9zX3gucHVzaChqaWFuZ2VQb3NYKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zaG93TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMuc2V0Um9ndWVUZXh0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVMaWtlTnVtKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMZXZlbFByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5jdXJfZ2FtZV9tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjpcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46IHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhbGxFbmVteU51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGtpbGxOdW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5raWxsZWRfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHJvZ3Jlc3M9KGtpbGxOdW0vYWxsRW5lbXlOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbF9wcm9ncmVzcy5wcm9ncmVzcz1wcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nPWtpbGxOdW0rJy8nK2FsbEVuZW15TnVtOyAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jdXJfd2F2ZV9ub2RlLng9dGhpcy53YXZlX3Bvc194W2dtLmN1cl93YXZlXTtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmN1cl93YXZlX3NwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5jdXJfd2F2ZV9zcC53aWR0aCA9IHRoaXMub25lX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHdhdmVCZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3dhdmVCZycpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vlhbPljaFcIitnbS5jdXJfd2F2ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy53YXZhTmFydGFnWT1nbS5jdXJfd2F2ZS90aGlzLmFsbFdhdmVMZW5ndGgqdGhpcy53YXZlSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cl93YXZlX3NwID0gd2F2ZUJnLmdldENoaWxkQnlOYW1lKGdtLmN1cl93YXZlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHR5cGVzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLmdldFdhdmVUeXBlcygpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJfd2F2ZV9zcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3Bfd2F2ZVt0eXBlc1tnbS5jdXJfd2F2ZV0gKyAxXTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VyX3dhdmVfc3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VyX3dhdmVfc3Aud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGN1cldhdmUgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl93YXZlO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcHJldldhdmU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfd2F2ZS0xO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgY3VyWFggPSB0aGlzLndhdmVfcG9zX3hbY3VyV2F2ZV07XHJcbiAgICAgICAgICAgICAgICAvL2xldCBwcmV2WFg9cHJldldhdmU+PTA/dGhpcy53YXZlX3Bvc194W3ByZXZXYXZlXTp0aGlzLmxlZnRfeHg7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBvZmZzZXRYWD1jdXJYWC1wcmV2WFg7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5kaXN0X3h4ID0gY3VyWFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvZ3VlVGV4dChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvZ3VlTGlrZU51bSgpKTtcclxuICAgICAgICAgICAgICAgIC8vd2F2ZUJnLmdldENcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRsZXNzX3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRsZXNzX3RzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgR2FtZU1vZGUuQm9zc19QcnNvbmFsOntcclxuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuYm9zc19jaGFsbGVuZ2VfdHMpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYm9zc19jaGFsbGVuZ2VfdHMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SmlhblRvdVBvcyhwZXI6IG51bWJlcikge1xyXG4gICAgICAgIC8vIGxldCBjdXJXYXZlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmU7XHJcbiAgICAgICAgLy8gbGV0IHByZXZXYXZlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3dhdmUtMTtcclxuICAgICAgICAvLyBsZXQgY3VyWFg9dGhpcy53YXZlX3Bvc194W2N1cldhdmVdO1xyXG4gICAgICAgIC8vIGxldCBwcmV2WFg9cHJldldhdmU+PTA/dGhpcy53YXZlX3Bvc194W3ByZXZXYXZlXTp0aGlzLmxlZnRfeHg7XHJcbiAgICAgICAgLy8gbGV0IG9mZnNldFhYPWN1clhYLXByZXZYWDsgICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMuZGlzdF94eD1wcmV2WFgrb2Zmc2V0WFgqcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dDb2luKCkge1xyXG4gICAgICAgIC8vIGxldCBhbGxFbmVteU51bT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIC8vIGxldCBraWxsTnVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIC8vIHRoaXMuY29pbl9sYWJlbC5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkoa2lsbE51bS9hbGxFbmVteU51bSp0aGlzLnRvdGFsX2NvaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dEcHMoKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcclxuICAgICAgICBsZXQgZ2cgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsZW4gPSBnZy5oZXJvX3NraWxsX2Rwcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2tpbGxEcHMgPSBnZy5oZXJvX3NraWxsX2Rwc1tpXTtcclxuICAgICAgICAgICAgbGV0IGF0dGFja0RwcyA9IGdnLmhlcm9fYXR0YWNrX2Rwc1tpXTtcclxuICAgICAgICAgICAgdG90YWwgKz0gKHNraWxsRHBzICsgYXR0YWNrRHBzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRwcyA9IE1hdGgucm91bmQodG90YWwgLyB0aGlzLnN0YXJ0X3RpbWUpO1xyXG4gICAgICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKGRwcyk7Ly8gICAgICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZz0nRFBTICcrTXlUb29sLmdldENvaW5EYW53ZWkoZHBzKTtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zcy9kcHNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShkcHMpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1ZylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCB0b3A9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpJyk7XHJcbiAgICAgICAgLy8gICAgIGxldCB0b3RhbD0wO1xyXG4gICAgICAgIC8vICAgICBsZXQgZ2c9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyAgICAgbGV0IGxlbj1nZy5oZXJvX3NraWxsX2Rwcy5sZW5ndGg7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2tpbGxEcHM9Z2cuaGVyb19za2lsbF9kcHNbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYXR0YWNrRHBzPWdnLmhlcm9fYXR0YWNrX2Rwc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgIHRvdGFsKz0oc2tpbGxEcHMrYXR0YWNrRHBzKTtcclxuICAgICAgICAvLyAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnYXR0TGFiZWwnK2kpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSfmlLvlh7vvvJonK2F0dGFja0RwcztcclxuICAgICAgICAvLyAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnc2tpbGxMYWJlbCcraSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J+aKgOiDve+8micrc2tpbGxEcHM7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbGV0IGRwcz1NYXRoLnJvdW5kKHRvdGFsL3RoaXMuc3RhcnRfdGltZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZHBzX2xhYmVsLnN0cmluZz0nRFBTICcrZHBzO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVfamlzaHUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVfamlzaHUgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfdGltZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHBzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuY3VyX3dhdmVfbm9kZS54IDwgdGhpcy5kaXN0X3h4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmN1cl93YXZlX25vZGUueCArPSBkdCAqIDMwO1xyXG4gICAgICAgICAgICAvLyAgICAgLy90aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGggLSAodGhpcy5kaXN0X3h4IC0gdGhpcy5jdXJfd2F2ZV9ub2RlLngpO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHRoaXMuY3VyX3dhdmVfbm9kZS54ID4gdGhpcy5kaXN0X3h4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJfd2F2ZV9ub2RlLnggPSB0aGlzLmRpc3RfeHg7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy90aGlzLmN1cl93YXZlX3NwLndpZHRoID0gdGhpcy5vbmVfd2lkdGg7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2aDogbnVtYmVyID0gKHRoaXMud2F2YU5hcnRhZ1kgLSAgdGhpcy53YXZlQmFyLmhlaWdodCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICAgICAgdGhpcy53YXZlQmFyLmhlaWdodCArPSB2aDtcclxuICAgICAgICAgICAgbGV0IGFEdCA9IGR0O1xyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpICE9IDEpIHtcclxuICAgICAgICAgICAgICAgIGFEdCA9IGR0IC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYUR0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgYUR0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfYXV0byAmJiB0aGlzLnRyeV9hdXRvX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9hdXRvX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfYXV0byA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X2F1dG9fcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEF1dG9GaWdodGluZyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnRuQXV0bygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlBdXRvTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc190cnlfcmF0ZSAmJiB0aGlzLnRyeV9yYXRlX3JhbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluIC09IGFEdDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeV9yYXRlX3JhbWFpbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190cnlfcmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5X3JhdGVfcmFtYWluID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEJ0blNldHVwUmF0ZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCdG5SYXRlU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcnlSYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+iDjOaZr+W+queOr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iZzAgJiYgdGhpcy5iZzEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gZHQgKiB0aGlzLmJnU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnMC55IC09IGR0ICogdGhpcy5iZ1NwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMC55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcwLnkgPSB0aGlzLmJnMS55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnMS55IDw9IGNjLndpblNpemUuaGVpZ2h0IC8gMiAtIHRoaXMuYmcwLmhlaWdodCAvIDIgLSBjYy53aW5TaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmcxLnkgPSB0aGlzLmJnMC55ICsgdGhpcy5iZzAuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5iZzJfd2FsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHZ4OiBudW1iZXIgPSAodGhpcy50YXJnZXRYIC0gdGhpcy5iZzJfd2FsbC54KSAqIHRoaXMuZWFzaW5nO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5iZzJfd2FsbC54ICs9IHZ4O1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl93YXZlX25vZGUueDx0aGlzLmRpc3RfeHgpe1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfVxyXG4gICAgLyoq5pWZ56iLICovXHJcbiAgICBjaGVja1R1dG9yYWlscygpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgJiYgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjExKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSAvIEppYVN1KTtcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTEsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjEyLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSAqIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==