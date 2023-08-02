import { BossChallengeManager } from "../Activity/BossChallenge";
import BossGameUi from "../Activity/BossGameUi";
import EndlessgGameUi from "../Activity/EndlessgGameUi";
import { EndlessLevelsManager } from "../Activity/EndlessLevels";
import { GameMode, GameScene, GameState, IsDebug, JiaSu } from "../Constants";
import BuffDisplay from "../copy/endlesschallenges/BuffDisplay";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import Hero from "../Hero/Game/Hero";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { DingYueManager } from "../Payment/DingYueManager";
import Pet from "../Pet/Game/Pet";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { MusicIndex, SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { TaskItem } from "../Task/TaskEnum";
import TaskManager from "../Task/TaskManager";
import MyTool from "../Tools/MyTool";
import TowerManager from "../Tower/TowerManager";
import RewardSSUi from "../Tutorials/RewardSSUi";
import TutorailsManager from "../Tutorials/TutorailsManager";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import WallManager from "../Wall/WallManager";
import WeekCardUi from "../WeekCard/WeekCardUi";
import BuffStateManager from "./BuffStateManager";
import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";
import { instance } from "./TouchPlane/TouchPlane";
import BuyBattlePotion from "./Ui/BuyBattlePotion";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property([cc.SpriteFrame])
    sp_rate: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    sp_auto: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    sp_wave: cc.SpriteFrame[] = [];

    @property(cc.Prefab)
    prefab_normal_wave: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_boss_wave: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_jiange: cc.Prefab = null;
    /**当前波数节点 */
    /**试用文本 */
    @property(cc.Node)
    waveBar: cc.Node = null;

    easing: number = 0.1;
    wavaNartagY:number=0;
    allWaveLength: number = 0;

    waveHeight: number = 281;
    //cur_wave_node: cc.Node = null;
    //cur_wave_sp: cc.Node = null;
    //wave_pos_x: number[] = [];
    left_xx: number = 0;
    //dist_xx: number = 0;
    one_width: number = 0;
    // @property(cc.JsonAsset)
    // zhen_xing:cc.JsonAsset=null;
    /**是否解锁了速率 */
    is_unlock_rate: boolean = true;
    try_rate_ramain: number = 60 * 10;
    is_try_rate: boolean = false;
    /**是否解锁了自动战斗 */
    is_unlock_auto: boolean = true;
    try_auto_ramain: number = 60 * 10;
    is_try_auto: boolean = false;
    /**试用文本 */
    @property(cc.Label)
    try_auto_label: cc.Label = null;
    /**试用文本 */
    @property(cc.Label)
    try_rate_label: cc.Label = null;

    /**剩余多少次显示 */
    @property(cc.Label)
    rogueText: cc.Label = null;
    //测试
    start_time: number = 0;
    time_jishu: number = 0;
    time_label: cc.Label = null;
    bg0: cc.Node = null;
    bg1: cc.Node = null;
    dps_label: cc.Label = null;
    //关卡进度条
    level_progress: cc.ProgressBar = null;
    level_label: cc.Label = null;
    coin_label: cc.Label = null;
    total_coin: number = 0;
    endless_ts: EndlessgGameUi = null;
    //当前背景使用的名称
    cur_bg_name: string = 'bg2';

    private bgSpeed: number = 60;

    //战斗药水
    @property(cc.Node)
    battlepotion: cc.Node[] = [];//红色   绿色   蓝色
    battlepotionPropId: PropId[] = [PropId.RedPotion, PropId.GreenPotion, PropId.BluePotion]//战斗药水的道具id
    battlepotionstate: number[] = [1, 1, 1]//战斗药水在这一局是否使用了  默认每一个药水有一次使用的机会

    // bg2_wall: cc.Node;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        GameData.getInstance();
        GameManager.getInstance().init(GameScene.game);
        GameManager.getInstance().game = this;
        this.adaptation();
        //cc.director.resume();
        //cc.director.getCollisionManager().enabledDebugDraw=true;
        this.setBgImg();
        if (TutorailsManager.getInstance().is_finish_game) {
            this.loadHeros();
        } else {
            GameManager.getInstance().loadTutorailsHeroData();
        }
        if (DingYueManager.getInstance().getWeekInfo()) {
            this.is_unlock_auto = DingYueManager.getInstance().getWeekInfo().is_buy;
        }
        if (DingYueManager.getInstance().getWeekInfo()) {
            this.is_unlock_rate = DingYueManager.getInstance().getWeekInfo().is_buy;
        }


        if (!this.is_unlock_rate) {
            GameManager.getInstance().setBtnSetupRate(1, false);
        }
        if (!this.is_unlock_auto) {
            GameManager.getInstance().setAutoFighting(false, false);
        }
        this.try_auto_ramain = TheStorageManager.getInstance().getInt(StorageKey.try_auto_fight_remain, 60 * 10);
        this.try_rate_ramain = TheStorageManager.getInstance().getInt(StorageKey.try_rate_fight_remain, 60 * 10);
        this.setTryAutoLabel();
        this.setTryRateLabel();
        GameManager.getInstance().setGameRate(1);

        // instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    }
    protected onDestroy(): void {
        // instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    }
    start() {
        this.showLoading();
        //this.startTest();
        GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Battle);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.Null, 4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.ui_monster_warning, 1);
        this.setBtnAuto();
        this.setBtnRateShow();
        this.initLevelShow();

        if (TutorailsManager.getInstance().is_finish_game == false) {
            UIManager.getInstance().preloadUiByPath(UIPath.RewardSSUI);
            UIManager.getInstance().preloadUiByPath(UIPath.StoreHeroShowUi);
        }
    }

    testCamera() {
        // 创建渲染纹理，并设置纹理大小同显示屏(showSprite)大小一样
        let texture = new cc.RenderTexture();
        texture.initWithSize(300, 240);
        cc.find('Canvas/TestCamera').getComponent(cc.Camera).targetTexture = texture;
        let showSprite = cc.find('Canvas/Test/showRoot/showSprite');
        showSprite.getComponent(cc.Sprite).spriteFrame.setTexture(texture);
    }

    private adaptation() {
        //上下模块
        let topUi = cc.find('Canvas/Ui_Root/top_ui');
        let wp = cc.winSize;
        topUi.y = wp.height / 2;

        //
        this.time_label = topUi.getChildByName('timeLabel').getComponent(cc.Label);
        this.level_progress = topUi.getChildByName('levelProgressBar').getComponent(cc.ProgressBar);
        this.level_progress.progress = 0;
        this.level_label = topUi.getChildByName('levelLabel').getComponent(cc.Label);
        this.coin_label = topUi.getChildByName('iconBg').getChildByName('coinLabel').getComponent(cc.Label);
        this.dps_label = topUi.getChildByName('dpsLabel').getComponent(cc.Label);
        //城墙
        let wallBg = this.node.getChildByName('wall_bg');
        wallBg.y = -(cc.winSize.height / 2) + wallBg.height / 2;
        //hp
        let hp = cc.find('Canvas/Ui_Root/hp_root');
        hp.y = -wp.height / 2 + hp.height - 27;//27是血条的坐标
        this.bg0 = this.node.getChildByName('bg0');
        this.bg1 = this.node.getChildByName('bg1');
        this.bg0.y = cc.winSize.height / 2 - this.bg0.height / 2;
        this.bg1.y = this.bg0.y + this.bg0.height;
        //上碰撞点
        //cc.find('Canvas/wall_root/wall_top').y=topUi.y;
    }

    showLoading() {
        let bgLoading = UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        let loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        let loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        loadingBar.progress = GameManager.getInstance().cur_load_progress;
        let loadingSchedule = () => {
            loadingBar.progress += 0.005;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            if (loadingBar.progress >= 1) {
                loadingBar.progress = 1;
                this.unschedule(loadingSchedule);
                loadingSchedule = null;
                this.checkStartGame();
            }
        };
        this.schedule(loadingSchedule, 0.02);
    }

    checkStartGame() {
        if (Hero.cur_loaded_num >= Hero.max_load_num) {
            let bgLoading = UIManager.getInstance().getLoadingNode();
            bgLoading.active = false;
            this.startGame();
            if (GameManager.getInstance().cur_game_mode == GameMode.Endless) {
                FollowManager.getInstance().followEvent(Follow_Type.开始无尽挑战次数);
                TaskManager.getInstance().emitTask(TaskItem.挑战X次无尽挑战);
                TaskManager.getInstance().emitTask(TaskItem.挑战1次无尽挑战);
                TaskManager.getInstance().emitTask(TaskItem.挑战3次无尽挑战);
                let num
                // let totalnum
                // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
                num = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes, 3);
                num--;
                // totalnum++
                // TheStorageManager.getInstance().setItem(StorageKey.TotalUnlimitedChallengeTimes,totalnum);
                TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeTimes, num);
                let wavenumber = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage, 0)
                let Round = EndlessLevelsManager.getInstance().getRound(wavenumber)//回合数

                if (Round - 1 > 0) {
                    BuffDisplay.surplusnumber = (Round - 2)
                    GameManager.getInstance().showBtnBuff(1);//Buff选择弹窗
                } else {
                    BuffDisplay.surplusnumber = -1
                }
                //console.log("buff:",BuffDisplay.surplusnumber,Round)
            }
        } else {
            this.scheduleOnce(() => {
                this.checkStartGame();
            }, 0.2);
        }
    }
    private indexLoad: Array<number> = [2, 1, 3, 0, 4];
    loadHeros() {
        //获取队列
        Hero.max_load_num = 0;
        Hero.cur_loaded_num = 0;
        Pet.max_load_num = 0;
        Pet.cur_loaded_num = 0;
        let teamList = HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);


        for (let i = 0; i < teamList.length; i++) {
            let heroType = teamList[this.indexLoad[i]];
            if (heroType > 0) {
                this.loadHero(heroType, this.indexLoad[i])
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
    }
    private indexData: Array<number> = [3, 1, 0, 2, 4];
    loadHero(heroType: Hero_Type, posIndex: number, callback?: Function) {
        Hero.max_load_num++;
        let xIndexTepm = posIndex;
        let yIndexTepm = posIndex;
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
        let posX = xIndexTepm * 45 - 90;
        let posY = yIndexTepm * 60 - 120;
        cc.resources.load('heros/hero' + heroType, cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Hero_Root');
            node.x = GameManager.getInstance().aniType + posX;
            let hp = cc.find('Canvas/Ui_Root/hp_root');
            node.y = hp.y + posY + 150 + 300;
            node.getComponent(Hero).targetX = node.x;
            node.getComponent(Hero).posX = posX;
            node.getComponent(Hero).posIndex = posIndex;
            node.setSiblingIndex(this.indexData[posIndex]);
            BuffStateManager.getInstance().createBuffRoot(cc.v2(posX, node.y + 150), heroType);
            if (callback) {
                callback();
            }
        });

    }
    setRogueText(n: number) {
        this.rogueText.string = n + "";
    }
    showKaiZhan() {
        let kaiZhan = cc.find('Canvas/Ui_Root/KaiZhan');
        kaiZhan.active = true;
        let spine = kaiZhan.getChildByName('KaiZhan').getComponent(sp.Skeleton);
        let anima = spine.setAnimation(0, 'KaiZhan', false);//YX_Kaizhan
        spine.setTrackEventListener(anima, (entry: sp.spine.TrackEntry, event) => {
            if (event.data.name == 'Attack') {
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Kaizhan);
            }
        });
        spine.setCompleteListener(() => {
            spine.setCompleteListener(null);
            kaiZhan.active = false;
        });
    }
    StatusBattlePotion() {
        //刷新战斗药水的状态
        for (let battlepotionindex = 0; battlepotionindex < this.battlepotion.length; battlepotionindex++) {
            //数量
            let battlepotionnumber = PropManager.getInstance().getPropNum(this.battlepotionPropId[battlepotionindex])
            //数量改变
            this.battlepotion[battlepotionindex].getChildByName("Redtxt").getComponent(cc.Label).string = "x" + battlepotionnumber
            this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = false

            if (battlepotionnumber == 0) {//数量为0变灰
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"))
            } else {//数量大于0变亮
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"))
            }
            //这一局是否用了一次
            let whetheruse = this.battlepotionstate[battlepotionindex]
            if (whetheruse == 0) {//数量为0变灰
                this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = true
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"))
            } else {//数量大于0变亮
                this.battlepotion[battlepotionindex].getChildByName("Battle_Lock").active = false
                this.battlepotion[battlepotionindex].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"))
            }
        }
    }

    startGame() {
        // console.log("++++++++")
        this.StatusBattlePotion()
        let gm = GameManager.getInstance();
        gm.cur_game_state = GameState.Game_Playing;
        this.showCoin();
        this.showKaiZhan();
        this.setBtnRateShow();
        this.setBtnAuto();
        let top = cc.find("Canvas/Ui_Root/top_ui");

        //let coinBg=cc.find('Canvas/Ui_Root/top_ui/iconBg');
        switch (gm.cur_game_mode) {
            case GameMode.Main: {
                //coinBg.active=false;
                top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager.getInstance().fighting_info.title_name;
                this.total_coin = MissionLevelManager.getInstance().getPassReward_Coin(LevelManager.getInstance().start_level);
                FollowManager.getInstance().followEvent(Follow_Type.开始第N章玩家数 + MissionLevelManager.getInstance().getChapter(LevelManager.getInstance().start_level));
                FollowManager.getInstance().followEvent(Follow_Type.开始挑战关卡 + LevelManager.getInstance().start_level);
                TaskManager.getInstance().emitTask(TaskItem.挑战1次关卡);
                TaskManager.getInstance().emitTask(TaskItem.挑战3次关卡);
                top.getChildByName("levelLabeltxt").getComponent(TextLanguage).setTextId(140017)
                top.getChildByName("Boss").active = false
                this.scheduleOnce(() => {
                    this.checkTutorails();
                }, 0.5)

                top.getChildByName("Endless_Btn_Buff").active = false
            } break;
            case GameMode.Endless: {
                // top.getChildByName("bg").active=false;
                // top.getChildByName("levelProgressBar").active=false;
                // top.getChildByName("curLabel").active=false;
                // top.getChildByName("levelLabel").active=false;  
                //coinBg.active=false;
                GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhiliao_halo_hit, 2);
                top.getChildByName("levelLabeltxt").getComponent(TextLanguage).setTextId(800018)//800018
                top.getChildByName("Endless_Btn_Buff").active = true
                top.getChildByName("Boss").active = false
                //波数//GameManager.getInstance().fighting_info.title_name;
                let wavenumber = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage, 0)
                top.getChildByName('curLabel').getComponent(cc.Label).string = "" + wavenumber

                FollowManager.getInstance().followEvent(Follow_Type.开始BOSS挑战次数);
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
            } break;
            case GameMode.Boss_Challenge: {
                TaskManager.getInstance().emitTask(TaskItem.挑战X次boss狩猎);
                TaskManager.getInstance().emitTask(TaskItem.挑战1次BOSS狩猎);
                TaskManager.getInstance().emitTask(TaskItem.挑战3次BOSS狩猎);
                // top.getChildByName("bg").active=false;
                // top.getChildByName("levelProgressBar").active=false;
                // top.getChildByName("curLabel").active=false; 
                // top.getChildByName("levelLabel").active=false;
                //coinBg.active=false;
                let num
                // let totalnum
                // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
                num = TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes, 3);
                num--;
                // totalnum++
                // TheStorageManager.getInstance().setItem(StorageKey.TotalBossChallengeTimes,totalnum);
                TheStorageManager.getInstance().setItem(StorageKey.BossChallengeTimes, num);
                this.level_label.string = '0/1';
                top.getChildByName("Boss").active = true
                top.getChildByName("Endless_Btn_Buff").active = false
                cc.resources.load("ui/game/boss_game_ui", cc.Prefab, (error: Error, assets: cc.Prefab) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    let node = cc.instantiate(assets);
                    top.getChildByName('BossHpRoot').addChild(node);
                    BossChallengeManager.getInstance().boss_challenge_ts = node.getComponent(BossGameUi);
                    BossChallengeManager.getInstance().boss_challenge_ts.refreshData();
                });
                this.time_label.node.color = cc.Color.WHITE;
                cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").color = cc.Color.WHITE
                //top.getChildByName('iconTime').color=cc.Color.RED;
                this.showRemainTime()
            } break;
            case GameMode.Tower: {
                TaskManager.getInstance().emitTask(TaskItem.挑战1次爬塔);
                TaskManager.getInstance().emitTask(TaskItem.挑战3次爬塔);
                //coinBg.active=false;
                TowerManager.is_show_tower = false;
                top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager.getInstance().fighting_info.title_name;
            } break;
            case GameMode.Maze: {
                TaskManager.getInstance().emitTask(TaskItem.挑战1次冰河探险);

                TowerManager.is_show_tower = false;
                top.getChildByName('curLabel').getComponent(cc.Label).string = GameManager.getInstance().fighting_info.title_name;
                top.getChildByName("levelLabeltxt").getComponent(TextLanguage).setTextId(140017)
                top.getChildByName("Boss").active = false
                top.getChildByName("Endless_Btn_Buff").active = false
            } break;
        }
        PropManager.getInstance().saveAllPropNum(true);
    }
    clickBtnBuff() {//buff弹窗
        //console.log("+++++++Buff展示弹窗")
        // GameManager.getInstance().showBtnBuff(0);//Buff展示弹窗
        GameManager.getInstance().showBtnBuff(0);//Buff选择弹窗
        if (IsDebug) {
            GameManager.getInstance().all_hero.forEach((v, k) => {
                console.log(k + ",主动技能冷却时间:" + v.skill_total_time + ",攻速:" + 1 / v.hero_data.gongji_jiange + "增伤：" + v.hero_data.all_increase_damage, v.hero_data);
            });
            console.log(WallManager.getInstance().getMainWall().getAttributeData());
        }
    }

    setBgImg() {
        ///let level=LevelManager.getInstance().start_level;
        // let bg0 = this.node.getChildByName('bg0');
        let wallBg = this.node.getChildByName('wall_bg');
        let wallDown = wallBg.getChildByName('wall_down');
        //适配坐标
        // let hp=cc.find('Canvas/Ui_Root/wall_root');
        // wallBg.y=hp.y+108;
        GameManager.getInstance().enemy_att_y = wallBg.y + wallDown.y + wallDown.height / 2;
        this.bg0.y = cc.winSize.height / 2 - this.bg0.height / 2;
        this.bg1.y = this.bg0.y + this.bg0.height;
        //章
        //let name=LevelManager.getLevelName(level);
        let fightingInfo = GameManager.getInstance().fighting_info;
        let bgName = fightingInfo.bg_name;
        this.cur_bg_name = bgName;
        cc.resources.load(bgName, cc.SpriteFrame, (error: Error, assets: cc.SpriteFrame) => {
            if (error) {
                console.log(error);
                return;
            }
            this.bg0.getComponent(cc.Sprite).spriteFrame = assets;
            this.bg1.getComponent(cc.Sprite).spriteFrame = assets;
        });
        cc.resources.load(fightingInfo.wall_name, cc.SpriteFrame, (error: Error, assets: cc.SpriteFrame) => {
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
    }

    showBaoxiang() {
        //根据当前所在波数显示

    }

    startNextLevel() {
        this.initLevelShow();
        this.showDps();
        this.showLevelProgress();
        if (GameManager.getInstance().cur_game_mode == GameMode.Main) {
            this.start_time = 0;
        }
        this.showTime();
        this.startGame();
        this.showCoin();
        if (this.cur_bg_name != GameManager.getInstance().fighting_info.bg_name) {
            this.setBgImg();
        }
    }

    setProgress() {
        let bgLoading = cc.find('Canvas/Ui_Root/bg_loading');
        bgLoading.active = true;
        //开始加载关卡所需的怪物
        let progress = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        progress.progress = 0.0;
    }

    clickBtnDouble(btn: cc.Event.EventTouch) {
        FollowManager.getInstance().followEvent(Follow_Type.二倍速点击次数);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if (this.is_unlock_rate == false && this.try_rate_ramain <= 0) {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1400108));
            GameManager.getInstance().cur_game_state = GameState.Game_Pause;
            UIManager.getInstance().showUiDialog(UIPath.WeekCard, UILayerLevel.One, {
                onCompleted: (uiNode) => {
                    uiNode.getComponent(WeekCardUi).refreshUi();
                    uiNode.getComponent(WeekCardUi).init({
                        onClose: () => {
                            GameManager.getInstance().cur_game_state = GameState.Game_Playing;
                            this.is_unlock_auto = DingYueManager.getInstance().getWeekInfo().is_buy;
                            this.is_unlock_rate = DingYueManager.getInstance().getWeekInfo().is_buy;
                            if (this.is_unlock_rate) {
                                GameManager.getInstance().setBtnSetupRate(2);
                                this.setTryAutoLabel();
                                this.setTryRateLabel();
                                this.setBtnRateShow();
                            }
                        }
                    })
                }
            })
            return;
        } else {
            if (GameManager.getInstance().getBtnSetupRate() == 1) {
                GameManager.getInstance().setBtnSetupRate(2);
                //启动试用
                if (this.is_unlock_rate == false && this.try_rate_ramain > 0) {
                    this.is_try_rate = true;
                }
            } else {
                GameManager.getInstance().setBtnSetupRate(1);
                //关闭试用
                if (this.is_unlock_rate == false) {
                    this.is_try_rate = false;
                }
            }
        }
        this.setBtnRateShow();
    }

    clickBtnAuto() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.自动战斗点击次数);
        if (this.is_unlock_auto == false && this.try_auto_ramain <= 0) {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1400107));
            GameManager.getInstance().cur_game_state = GameState.Game_Pause;
            UIManager.getInstance().showUiDialog(UIPath.WeekCard, UILayerLevel.One, {
                onCompleted: (uiNode) => {
                    uiNode.getComponent(WeekCardUi).refreshUi();
                    uiNode.getComponent(WeekCardUi).init({
                        onClose: () => {
                            GameManager.getInstance().cur_game_state = GameState.Game_Playing;
                            this.is_unlock_auto = DingYueManager.getInstance().getWeekInfo().is_buy;
                            this.is_unlock_rate = DingYueManager.getInstance().getWeekInfo().is_buy;
                            if (this.is_unlock_auto) {
                                GameManager.getInstance().setAutoFighting(true);
                                this.setTryAutoLabel();
                                this.setTryRateLabel();
                                this.setBtnAuto();
                            }
                        }
                    })
                }
            })
            return;
        }
        if (this.is_unlock_auto == false && this.try_auto_ramain > 0) {
            //有剩余时间，启用/关闭试用
            this.is_try_auto = !GameManager.getInstance().auto_fighting;
            if (this.is_try_auto == false) {
                //关闭，那就关闭计时
                this.try_auto_ramain = Math.floor(this.try_auto_ramain)
                TheStorageManager.getInstance().setItem(StorageKey.try_auto_fight_remain, this.try_auto_ramain);
            }
        }
        GameManager.getInstance().setAutoFighting(!GameManager.getInstance().auto_fighting);
        this.setBtnAuto();
    }

    clickBtnPause() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.try_auto_ramain = Math.floor(this.try_auto_ramain)
        TheStorageManager.getInstance().setItem(StorageKey.try_auto_fight_remain, this.try_auto_ramain);
        this.try_rate_ramain = Math.floor(this.try_rate_ramain)
        TheStorageManager.getInstance().setItem(StorageKey.try_rate_fight_remain, this.try_rate_ramain);
        // GameManager.getInstance().wall_data.changeHp(-GameManager.getInstance().wall_data.getMaxHp()*0.65);
        GameManager.getInstance().showGamePause();//暂停
        // GameManager.getInstance().showGameWin();//胜利
        // GameManager.getInstance().showGameLose();//失败
        //cc.log(cc.assetManager.assets.count);
        // if(IsDebug){
        //     UIManager.getInstance().showUiDialog(UIPath.RewardSSUI,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //         uiNode.getComponent(RewardSSUi).initData(1);
        //     }});
        // }
    }

    clickBtnTest1() {
        //SkillManager.getInstance().releaseSkill();
    }

    clickBtnTest2() {
        // let boss=BossManager.getInstance().node.getChildByName('boss1');
        // if(boss){
        //     boss.getComponent(BullDemon).startSkill();
        // }
        GameManager.getInstance().showBossWarning();
    }

    clickBtnReplay() {
        // let posX=Math.random()*400-200;
        // let posY=Math.random()*400-200;
        // let pos=cc.v2(posX,posY);
        // let bx=GameManager.getInstance().enemy_manager.createBaoXiangGuai(pos);
        // bx.getComponent(BaoXiangGuai).init(new LevelBuff());        
    }

    clickBtnBattlepotion(event, type) {//战斗药水按钮   红   绿    蓝
        let num = type
        let battlepotionnumber = PropManager.getInstance().getPropNum(this.battlepotionPropId[num])

        if (this.battlepotionstate[num] == 0) {//这局已经用过了   飘字
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100130), 3);
        } else {//如果没有用过
            if (battlepotionnumber == 0) {//数量不够 弹窗购买弹窗        如果钻石的数量够，直接购买之后使用  
                UIManager.getInstance().showUiDialog(UIPath.BuyBattlePotion, UILayerLevel.One, {
                    onCompleted: (uiNode) => {
                        uiNode.getComponent(BuyBattlePotion).init({
                            onClose: () => {

                            }
                        });
                        uiNode.getComponent(BuyBattlePotion).initUi(type)
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

            } else {
                //console.log("使用道具:",num)
                if (num == 0) {
                    this.clickBtnRed()
                }
                if (num == 1) {
                    this.clickBtnGreen()
                }
                if (num == 2) {
                    this.clickBtnBlue()
                }
            }
        }

    }
    clickBtnRed() {
        //console.log("道具：红")
    }
    clickBtnGreen() {
        //console.log("道具：绿")
    }
    clickBtnBlue() {
        //console.log("道具：蓝")
    }



    setTryAutoLabel() {
        // this.try_auto_label.node.active = this.try_auto_ramain > 0 && LevelManager.getInstance().finish_level >= 5 && this.is_unlock_auto == false;
        // this.try_auto_label.string = MyTool.getTimeStr(Math.floor(this.try_auto_ramain))
    }

    setTryRateLabel() {
        // this.try_rate_label.node.active = this.try_rate_ramain > 0 && LevelManager.getInstance().finish_level >= 5 && this.is_unlock_rate == false;
        // this.try_rate_label.string = MyTool.getTimeStr(Math.floor(this.try_rate_ramain))
    }

    setBtnRateShow() {
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
    }

    setBtnAuto() {
        // let auto = cc.find('Canvas/Ui_Root/btnAuto');
        // let autoNum = GameManager.getInstance().auto_fighting ? 1 : 0;
        // auto.getComponent(cc.Sprite).spriteFrame = this.sp_auto[autoNum];
        // if (this.is_unlock_auto) {
        //     TheStorageManager.getInstance().setItem(StorageKey.AutoFighting, autoNum);
        // }
        // auto.active = LevelManager.getInstance().finish_level >= 5;
    }

    showTime() {
        let shi = Math.floor(this.start_time / 3600);
        let shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        let fen = Math.floor((this.start_time - shi * 3600) / 60);
        let fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        let miao = this.start_time % 60;
        let miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        this.time_label.string = shiStr + ':' + fenStr + ':' + miaoStr;
        if (GameManager.getInstance().cur_game_mode == GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").getComponent(cc.Label).string = "" + shiStr + ':' + fenStr + ':' + miaoStr;
        }
    }

    showRemainTime() {
        let remainTime = 90 - this.start_time;
        let shi = Math.floor(remainTime / 3600);
        let shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        let fen = Math.floor((remainTime - shi * 3600) / 60);
        let fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        let miao = remainTime % 60;
        let miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        this.time_label.string = shiStr + ':' + fenStr + ':' + miaoStr;
        if (GameManager.getInstance().cur_game_mode == GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/timeLabel").getComponent(cc.Label).string = "" + shiStr + ':' + fenStr + ':' + miaoStr;
        }
        if (remainTime <= 0) {
            GameManager.getInstance().showGameLose();
        }
    }

    initLevelShow() {
        let waveBg = cc.find('Canvas/Ui_Root/waveBg');
        //this.cur_wave_node = waveBg.parent.getChildByName('cur_wave');
        // this.cur_wave_node.y = waveBg.y - 20;
        // this.cur_wave_node.x = -315;
        // this.dist_xx = -315;
        //this.wave_pos_x = new Array();
        let waveTypes = GameManager.getInstance().fighting_info.getWaveTypes();


        let len = waveTypes.length;
        this.allWaveLength = waveTypes.length;
        //算出每个的长度
        let jiangeNum = len - 1;
        let jiangeWidth = 4;
        let jiangeTotalWidth = jiangeNum * jiangeWidth;
        let waveTotalWidth = waveBg.width - 5 * 2 - jiangeTotalWidth;
        let waveWidth = waveTotalWidth / len;
        this.left_xx = -waveBg.width / 2 + 5;
        let oneWidth = waveWidth + jiangeWidth;
        this.one_width = oneWidth;
        this.waveBar.height = 0;
        this.wavaNartagY=0;
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
        this.setRogueText(GameManager.getInstance().getRogueLikeNum());
    }

    showLevelProgress() {
        let gm = GameManager.getInstance();
        switch (gm.cur_game_mode) {
            case GameMode.Maze:
            case GameMode.Tower:
            case GameMode.Endless:
            case GameMode.Main: {
              
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
                console.log("开始关卡"+gm.cur_wave);

                this.wavaNartagY=gm.cur_wave/this.allWaveLength*this.waveHeight;
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
                this.setRogueText(GameManager.getInstance().getRogueLikeNum());
                //waveBg.getC
            } break;
            case GameMode.Endless: {
                if (this.endless_ts) {
                    this.endless_ts.refreshData();
                }
            } break;
            // case GameMode.Boss_Prsonal:{
            //     if(this.boss_challenge_ts){
            //         this.boss_challenge_ts.refreshData();
            //     }
            // }break;
        }
    }

    showJianTouPos(per: number) {
        // let curWave=GameManager.getInstance().cur_wave;
        // let prevWave=GameManager.getInstance().cur_wave-1;
        // let curXX=this.wave_pos_x[curWave];
        // let prevXX=prevWave>=0?this.wave_pos_x[prevWave]:this.left_xx;
        // let offsetXX=curXX-prevXX;        
        // this.dist_xx=prevXX+offsetXX*per;
    }

    showCoin() {
        // let allEnemyNum=MonsterManager.getInstance().total_monster_num;
        // let killNum=MonsterManager.getInstance().killed_monster_num;
        // this.coin_label.string=MyTool.getCoinDanwei(killNum/allEnemyNum*this.total_coin);
    }

    showDps() {
        let total = 0;
        let gg = GameManager.getInstance();
        let len = gg.hero_skill_dps.length;
        for (let i = 0; i < len; i++) {
            let skillDps = gg.hero_skill_dps[i];
            let attackDps = gg.hero_attack_dps[i];
            total += (skillDps + attackDps);
        }
        let dps = Math.round(total / this.start_time);
        this.dps_label.string = MyTool.getCoinDanwei(dps);//        this.dps_label.string='DPS '+MyTool.getCoinDanwei(dps);
        if (GameManager.getInstance().cur_game_mode == GameMode.Boss_Challenge) {
            cc.find("Canvas/Ui_Root/top_ui/Boss/dpsLabel").getComponent(cc.Label).string = "" + MyTool.getCoinDanwei(dps)
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

    }




    update(dt) {
        if (GameManager.getInstance().cur_game_state == GameState.Game_Playing) {
            this.time_jishu += dt;
            if (this.time_jishu >= 1) {
                this.time_jishu = 0;
                this.start_time += 1;
                switch (GameManager.getInstance().cur_game_mode) {
                    case GameMode.Tower:
                    case GameMode.Endless:
                    case GameMode.Maze:
                    case GameMode.Main: {
                        this.showTime();
                    } break;
                    case GameMode.Boss_Challenge: {
                        this.showRemainTime();
                    } break;
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

            let vh: number = (this.wavaNartagY -  this.waveBar.height) * this.easing;
            this.waveBar.height += vh;
            let aDt = dt;
            if (GameManager.getInstance().getGameRate() != 1) {
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
                    GameManager.getInstance().setAutoFighting(false, false);
                    this.setBtnAuto();
                }
                this.setTryAutoLabel();
            }
            if (this.is_try_rate && this.try_rate_ramain > 0) {
                this.try_rate_ramain -= aDt;
                if (this.try_rate_ramain <= 0) {
                    this.is_try_rate = false;
                    this.try_rate_ramain = 0;
                    GameManager.getInstance().setBtnSetupRate(1, false);
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


    }

    // protected lateUpdate(dt: number): void {
    //     if(this.cur_wave_node.x<this.dist_xx){

    //     }

    // }
    /**教程 */
    checkTutorails() {
        this.scheduleOnce(() => {
            if (TutorailsManager.getInstance().is_finish_game && LevelManager.getInstance().start_level == 1) {
                if (TutorailsManager.getInstance().isShowTutorials(211)) {
                    TutorailsManager.getInstance().is_tutorails_state = true;
                    GameManager.getInstance().setGameRate(1 / JiaSu);
                    TutorailsManager.getInstance().showTutorials(211, null, () => {
                        TutorailsManager.getInstance().showTutorials(212, null, () => {
                            TutorailsManager.getInstance().showTutorials(213, () => {
                                TutorailsManager.getInstance().saveTutorials(211);
                                TutorailsManager.getInstance().saveTutorials(212);
                                TutorailsManager.getInstance().saveTutorials(213);
                            }, () => {
                                GameManager.getInstance().setGameRate(1);
                            });
                        });
                    });
                }
            }
        }, 1 * GameManager.getInstance().getGameRate());

    }
}
