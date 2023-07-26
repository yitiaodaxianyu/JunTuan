
import { Btn_Index, GameScene, GameState, Go_Type, IsDebug, SelectSkill_Type, VIDEO_TYPE, Zheng_Xing_Type, GameMode, FightingInfo, JiaSu } from "./Constants";
import ChuShengDian from "./Game/ChuShengDian";
import EnemyHpManager from "./Enemy/EnemyHpManager";
import HpTextHpManager from "./Monster/HpTextManager";
import Music from "./Sound/Muisc";
import Sound from "./Sound/Sound";
import Home from "./Home";
import Hint from "./Hint";
import GetTip from "./UI/GetTip";
import Game from "./Game/Game";
import Dialog from "./UI/Dialog";
import FollowManager from "./multiLanguage/FollowManager";
import { Follow_Type } from "./multiLanguage/FollowConstants";
import { RewardData } from "./JsonData/LevelJsonData";
import LocalVideo from "./LocalVideo";
import { HeroData } from "./Hero/Data/HeroData";
import UnlockSkill from "./UI/UnlockSkill";
import { ZhenXingData } from "./ZhenXingData";
import TutorailsManager from "./Tutorials/TutorailsManager";
import { HeroManager } from "./Hero/Data/HeroManager";
import { LevelManager } from "./Level/LevelManager";
import { MissionLevelManager } from "./Level/MissionLevel";
import { EndlessLevelsManager } from "./Activity/EndlessLevels";
import BossManager from "./Boss/BossManager";
import { BossChallengeManager } from "./Activity/BossChallenge";
import { TowerLevelManager } from "./Tower/TowerLevel";
import TowerManager from "./Tower/TowerManager";
import { JsonMonsterConfigure, MonsterConfigureManager } from "./Monster/Data/MonsterConfigure";
import { StrengthType } from "./Monster/MonsterData";
import MonsterManager from "./Monster/MonsterManager";
import { UIManager } from "./UI/UIManager";
import Pet from "./Pet/Game/Pet";
import { PetInfo } from "./Pet/PetConfig";
import { MazeManager } from "./Maze/MazeManager";
import { GameEffectId, GameEffectsManager } from "./Game/GameEffectsManager";
import { TheStorageManager } from "./Storage/StorageManager";
import { StorageKey } from "./Storage/StorageConfig";
import Hero from "./Hero/Game/Hero";
import { AttributeData, HeroInfo, Hero_Type } from "./Hero/Game/HeroConfig";
import GuaJiGift from "./GuaJi/Ui/GuaJiGift";
import { UILayerLevel, UIPath } from "./UI/UIConfig";
import GameWin from "./Game/Ui/GameWin";
import { TutorialLevelManager } from "./Level/TutorialLevel";
import SkillManager from "./Game/SkillManager";
import { SoundIndex } from "./Sound/AudioConstants";
import WallManager from "./Wall/WallManager";
import { WallType } from "./Wall/WallConfig";
import BuffDisplay from "./copy/endlesschallenges/BuffDisplay";
import { HeroBaseInfoManager } from "./Hero/Data/HeroBaseInfo";
import { EquipmentAttributeManager } from "./Equipment/Data/EquipmentAttribute";
import { ExclusiveEnhancementManager } from "./JsonData/ExclusiveEnhancement";
import { ExclusiveWeaponMessageManager } from "./JsonData/ExclusiveWeaponMessage";
import RewardSSUi from "./Tutorials/RewardSSUi";



const { ccclass } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager = null;

    private prefab_hint: cc.Prefab = null;
    private prefab_get_tip: cc.Prefab = null;
    //-----------------------------HOME-------------------------------
    role_show_hero: Hero_Type = Hero_Type.ChangMaoShou;
    //-----------------------------Game-------------------------------
    //各种管理器
    game: Game = null;
    enemy_hp_manager: EnemyHpManager = null;
    hp_text_manager: HpTextHpManager = null;
    chu_sheng_dian: ChuShengDian = null;
    //声音
    sound_manager: Sound = null;
    music_manager: Music = null;
    //各大英雄的
    all_hero: Map<number, Hero> = null;
    //DPS统计
    hero_skill_dps: number[] = null;
    hero_attack_dps: number[] = null;
    /**宠物主动技能造成的伤害 */
    private pet_active_dps: Map<PetInfo, number> = null;
    /**宠物连携技能造成的伤害 */
    private pet_connect_dps: Map<PetInfo, number> = null;

    cur_game_state: GameState = GameState.Game_Ready;
    cur_game_mode: GameMode = GameMode.Main;
    cur_game_scene: GameScene = GameScene.home;

    //当前的加载进度
    cur_load_progress: number = 0;

    //每个英雄获得的游戏内技能
    ingame_skills: SelectSkill_Type[] = [];
    //开始的关卡的数据
    cur_wave: number = 0;
    fighting_info: FightingInfo = null;
    //drop_data:DropData=null;
    reward_data: RewardData[] = [];
    is_loaded: boolean = false;
    //掉落物品的怪物id
    //drop_enemy_type:number=0;

    game_to_home: Go_Type = Go_Type.Main;

    fuhuo_num: number = 1;
    is_show_text: boolean = true;
    //最大的技能槽位
    max_skill_slot: number = 2;
    //各个英雄数据，游戏内使用，关卡内buff。
    game_hero_data: Map<number, HeroData> = null;
    //第几个怪有可能爆星星buff
    //star_index:number=0;
    //
    /**当前总共的怪物数量 */
    cur_total_num: number = 0;
    /**实际上已经生成出怪物的数量 */
    cur_create_num: number = 0;
    enemy_offset_y: number = 0;
    enemy_att_y: number = -300;
    enemy_create_y: number = 1080;
    load_jishu: number = 0;
    load_callback: Function = null;
    jishu_time: number = 0;
    //通关次数
    pass_level_num: number = 0;
    /**游戏速率 */
    private game_rate: number = 2;
    /**按钮指定速率 */
    private btn_setup_rate: number = 1;
    /**战斗指定速率 */
    private fighting_setup_rate: number = 1;
    /**单次最高伤害值 */
    private max_damage: number = 0;
    /**单次最小伤害值 */
    private min_damage: number = 9999;
    /**自动战斗标识 */
    public auto_fighting: boolean = true;
    /**当前的队列 */
    public cur_team_list: number[] = [];

    public charioUpgradationData: Array<number> = [0, 0, 0, 0, 0, 0, 0];

    public charioTip: Array<string> = ["加攻击", "血量上限", "攻速", "防御", "技能间隔", "左右移动", "回血"];

    public charioContent: Array<string> = ["每一级增加全体英雄攻击力10%", "每一级增加战车血量上限10%", "每一级增加全体英雄攻速10%", "每一级增加战车防御10%", "每一级减少技能间隔10%", "每一级增加战车移动速度10%", "回复战车最大血量20%"];
    //是否显示了退出游戏的对话框
    public is_show_exit: boolean = false;
    //动画位置
    public aniType: number = 4;

    //战车的位置x
    public charPosX: number = 0;
    //游戏动画存储数据
    // public moveData: Array<cc.Vec2> = [];

    public static getInstance(): GameManager {
        return this._instance;
    }

    protected onLoad(): void {
        console.log("gameLoaderon");

        cc.game.addPersistRootNode(this.node);
        GameManager._instance = this;
    }

    //初始化游戏数据
    init(scene: GameScene) {
        this.unscheduleAllCallbacks();
        this.cur_game_scene = scene;
        this.is_loaded = false;
        this.aniType = 4;
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0, 0];
        switch (this.cur_game_scene) {
            case GameScene.home: {
                this.cur_load_progress = 0;
                this.is_loaded = true;
                this.exitPlayGame();
                //this.role_show_hero=Hero_Type.SheShou;
            } break;
            case GameScene.game: {
                this.game_to_home = Go_Type.Main;
                this.cur_game_state = GameState.Game_Ready;
                this.all_hero = new Map<number, Hero>();
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
            } break;
            default: this.cur_load_progress = 0; break;
        }
        this.loadTip();
    }

    setBtnSetupRate(rate: number, isActivity: boolean = true) {
        this.btn_setup_rate = rate;
        this.setGameRate(1);
        if (isActivity) {
            if (rate == 2) {
                FollowManager.getInstance().followEvent(Follow_Type.二倍速开启成功次数);
            } else {
                FollowManager.getInstance().followEvent(Follow_Type.二倍速关闭成功次数);
            }
        }

    }

    setAutoFighting(isAuto: boolean, isActivity: boolean = true) {
        // this.auto_fighting = isAuto;
        // if (isActivity) {
        //     if (isAuto) {
        //         FollowManager.getInstance().followEvent(Follow_Type.自动战斗开启成功次数);
        //     } else {
        //         FollowManager.getInstance().followEvent(Follow_Type.自动战斗关闭成功次数);
        //     }
        // }
    }

    getBtnSetupRate(): number {
        return this.btn_setup_rate;
    }

    setFightingRate(rate: number) {
        this.fighting_setup_rate = rate;
        this.setGameRate(1);
    }

    setGameRate(rate: number) {
        //this.game_rate = rate * this.btn_setup_rate * this.fighting_setup_rate;
        cc.kSpeed(this.game_rate);
    }

    getGameRate(): number {
        return this.game_rate;
    }

    resetRate() {
        //this.game_rate = 1;
        cc.kSpeed(this.game_rate);
    }

    setMaxDamage(num: number) {
        if (num > this.max_damage) {
            this.max_damage = num;
        }
    }

    getMaxDamage(): number {
        return this.max_damage;
    }

    setMinDamage(num: number) {
        if (num < this.min_damage) {
            this.min_damage = num;
        }
    }

    getMinDamage(): number {
        return this.min_damage;
    }

    getDamageTextScale(damage: number) {
        let maxScale = 1.4;
        let scaleValue = 1;
        let rate = damage / this.getMaxDamage();
        scaleValue = rate * maxScale;
        if (scaleValue < 1) {
            scaleValue = 1;
        }
        if (scaleValue > maxScale) {
            scaleValue = maxScale;
        }
        return scaleValue;
    }

    getDamageTextEffect(damage: number): number {
        let effectId = GameEffectId.front_normal_attack_text_1;
        let rate = damage / this.getMaxDamage();
        if (rate < 0.2) {
            effectId = GameEffectId.front_normal_attack_text_1;
        } else if (rate < 0.4) {
            effectId = GameEffectId.front_normal_attack_text_2;
        } else if (rate < 0.6) {
            effectId = GameEffectId.front_normal_attack_text_3;
        } else if (rate < 0.8) {
            effectId = GameEffectId.front_normal_attack_text_4;
        } else {
            effectId = GameEffectId.front_normal_attack_text_5;
        }
        return effectId;
    }

    getHero(heroId: Hero_Type): Hero {
        return this.all_hero.get(heroId);
    }

    loadGameHeroData() {
        let isInitDps = false;
        if (this.cur_game_mode == GameMode.Main) {
            this.hero_skill_dps = new Array();
            this.hero_attack_dps = new Array();
        } else {
            if (!this.hero_attack_dps) {
                this.hero_skill_dps = new Array();
                this.hero_attack_dps = new Array();
                isInitDps = true;
            }
        }
        this.pet_active_dps = new Map<PetInfo, number>();
        this.pet_connect_dps = new Map<PetInfo, number>();
        this.game_hero_data = new Map<number, HeroData>();
        this.cur_team_list = HeroManager.getInstance().getTeamList(this.cur_game_mode);

        let fightingData = MazeManager.getInstance().refreshFightingData();
        //
        let mainWallData = new AttributeData();
        for (let i = 0; i < Hero_Type.Hero_Num; i++) {
            if (this.cur_game_mode == GameMode.Main) {
                this.hero_skill_dps.push(0);
                this.hero_attack_dps.push(0);
            } else {
                if (isInitDps) {
                    this.hero_skill_dps.push(0);
                    this.hero_attack_dps.push(0);
                }
            }

            let heroData = new HeroData();
            let homeHeroData = HeroManager.getInstance().getHeroData(i);
            if (homeHeroData) {
                heroData = cc.instantiate(homeHeroData);
                if (this.cur_team_list.includes(i)) {
                    //迷宫模式加成
                    if (this.cur_game_mode == GameMode.Maze) {
                        heroData.total_attack += (fightingData.AttackPer) * heroData.fixed_attck;
                        heroData.total_defense += (fightingData.DefensePer) * heroData.fix_defense;
                        heroData.Critical += fightingData.CriticalValue;
                        heroData.Hit += fightingData.HitValue;
                    }
                    mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();;
                    mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
                    mainWallData.Miss += heroData.Miss * 0.2;
                    mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
                    mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
                    mainWallData.Attack += heroData.total_attack * 0.2;
                    mainWallData.Hit += heroData.Hit * 0.2;
                  
                    this.pet_active_dps.set(heroData.pet_info, 0);
                    this.pet_connect_dps.set(heroData.pet_info, 0);
                    this.setMaxDamage(heroData.total_attack * heroData.ExtraCritical)
                    this.setMinDamage(heroData.total_attack);
                    this.game_hero_data.set(i, heroData);
                }
            }
        }
        WallManager.getInstance().getMainWall().startNextLevel();
        WallManager.getInstance().getMainWall().initWall(mainWallData, WallType.Main);
        // if(hp<3000){
        //     hp=3000;
        // }
        // if(defense<100){
        //     defense=100;
        // }
        //this.wall_data.initInheritData(hp,defense,miss,antiCritical,antiExtraCritical);
    }

    loadTutorailsHeroData() {
        let isInitDps = false;
        if (this.cur_game_mode == GameMode.Main) {
            this.hero_skill_dps = new Array();
            this.hero_attack_dps = new Array();
        } else {
            if (!this.hero_attack_dps) {
                this.hero_skill_dps = new Array();
                this.hero_attack_dps = new Array();
                isInitDps = true;
            }
        }
        for (let i = 0; i < Hero_Type.Hero_Num; i++) {
            if (this.cur_game_mode == GameMode.Main) {
                this.hero_skill_dps.push(0);
                this.hero_attack_dps.push(0);
            } else {
                if (isInitDps) {
                    this.hero_skill_dps.push(0);
                    this.hero_attack_dps.push(0);
                }
            }
        }
        this.pet_active_dps = new Map<PetInfo, number>();
        this.pet_connect_dps = new Map<PetInfo, number>();
        this.game_hero_data = new Map<number, HeroData>();
        this.cur_team_list = [Hero_Type.ShouWang, Hero_Type.ANuBiSi, Hero_Type.ZhenDe, Hero_Type.MeiMo, Hero_Type.LeiShen];
        let mainWallData = new AttributeData();
        for (let i = 0; i < this.cur_team_list.length; i++) {
            let heroData = this.addTutotialsHeroFull(this.cur_team_list[i], i, null);
            mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();;
            mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
          
            this.pet_active_dps.set(heroData.pet_info, 0);
            this.pet_connect_dps.set(heroData.pet_info, 0);
            this.setMaxDamage(heroData.total_attack * heroData.ExtraCritical)
            this.setMinDamage(heroData.total_attack);
            //this.game_hero_data.set(i,heroData);
        }


        WallManager.getInstance().getMainWall().startNextLevel();
        WallManager.getInstance().getMainWall().initWall(mainWallData, WallType.Main);
    }
    refreshMainWallDataByaddHero() {
        let mainWallData = new AttributeData();
        this.all_hero.forEach((v, k) => {
            let heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();
            mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
            
        })
        WallManager.getInstance().getMainWall().refreshWallDataByaddHero(mainWallData);
    }
    refreshMainWallData() {
        let mainWallData = new AttributeData();
        this.all_hero.forEach((v, k) => {
            let heroData = cc.instantiate(v.hero_data);
            mainWallData.Health += heroData.total_hp * 0.2 * this.getCharioHealthRatio();;
            mainWallData.Defense += heroData.total_defense * 0.2 * this.getCharioDefenseRotio();
            mainWallData.Miss += heroData.Miss * 0.2;
            mainWallData.AntiCritical += heroData.AntiCritical * 0.2;
            mainWallData.AntiExtraCritical += heroData.AntiExtraCritical * 0.2;
            mainWallData.Attack += heroData.total_attack * 0.2;
            mainWallData.Hit += heroData.Hit * 0.2;
           
        })
        WallManager.getInstance().getMainWall().refreshWallData(mainWallData);
    }

    private loadTip() {
        if (!this.prefab_hint) {
            cc.resources.load('hint', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                this.prefab_hint = assets;
            });
        }
        if (!this.prefab_get_tip) {
            cc.resources.load('get_tip', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                this.prefab_get_tip = assets;
            });
        }
    }

    showMessage(message: string, dt?: number) {
        if (this.prefab_hint == null) {
            cc.resources.load('hint', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let hint = cc.instantiate(assets);
                hint.parent = cc.find('Canvas/Ui_Root');
                let hintJs = hint.getComponent(Hint);
                hintJs.showHintMessage(message, dt);
            });
        } else {
            let hint = cc.instantiate(this.prefab_hint);
            hint.parent = cc.find('Canvas/Ui_Root');
            let hintJs = hint.getComponent(Hint);
            hintJs.showHintMessage(message, dt);
        }
    }

    showGetTip(getNode: cc.Node, callBack?: Function) {
        if (this.prefab_hint == null) {
            cc.resources.load('get_tip', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                node.getComponent(GetTip).addShowGetPorp(getNode, callBack);
            });
        } else {
            let node = cc.instantiate(this.prefab_get_tip);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(GetTip).addShowGetPorp(getNode, callBack);
        }
    }

    showMultipleGetTip(getNodes: cc.Node[], callBack?: Function) {
        if (this.prefab_hint == null) {
            cc.resources.load('get_tip', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                node.getComponent(GetTip).addMultiplePorp(getNodes, callBack);
            });
        } else {
            let node = cc.instantiate(this.prefab_get_tip);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(GetTip).addMultiplePorp(getNodes, callBack);
        }
    }

    showDialog(message: string, yesCallback: Function, noCallback: Function, showType?: number, y?: number) {
        if (this.is_show_exit == true) {
            return;
        }
        this.is_show_exit = true;
        cc.resources.load('dialog', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(Dialog).showDialog(message, yesCallback, noCallback, showType, y);
            if (y) {
                node.y = y;
            }
        });
    }

    showBuyDialog(message: string, yesCallback: Function, noCallback: Function, showType?: number, y?: string | number, currency?: string) {
        cc.resources.load('dialog', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(Dialog).showDialog(message, yesCallback, noCallback, showType, y, currency);
            // if(y){
            //     node.y=y;
            // }
        });
    }

    showLocalVideo(yesCallback: Function, noCallback: Function, isVideo?: boolean) {
        cc.resources.load('video_dialog', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(LocalVideo).init(yesCallback, noCallback);
        });
    }

    //----------------------------------------------------GAME------------------------------------------------------------------------
    startNextLevel() {
        this.unscheduleAllCallbacks();



        MonsterManager.getInstance().destroyAllDrop();
        MonsterManager.getInstance().destroyAllMonster();
        this.charioUpgradationData = [0, 0, 0, 0, 0, 0, 0];
        this.cur_wave = 0;
        this.cur_total_num = 0;
        switch (GameManager.getInstance().cur_game_mode) {
            case GameMode.Main: {
                if (!TutorailsManager.getInstance().is_finish_game) {
                    this.fighting_info = TutorialLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                } else {
                    this.fighting_info = MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                }
                GameEffectsManager.getInstance().removeAllEffect();
                this.all_hero.forEach((v, k) => {
                    v.resetState();
                })
                //数据
                this.loadGameHeroData();
            } break;
            case GameMode.Maze: {
                this.fighting_info = MazeManager.getInstance().getFightingInfo();
            } break;
            case GameMode.Tower: {
                this.fighting_info = TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
            } break;
            case GameMode.Endless: {
                let wavenumber = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage, 0);//波数
                let Round = EndlessLevelsManager.getInstance().getRound(wavenumber)//回合数
                // console.log("+++++++",Round)
                this.fighting_info = EndlessLevelsManager.getInstance().getFightingInfo(Round);
            } break;
        }
        MonsterManager.getInstance().loadData();
        this.game.startNextLevel();
        this.cur_game_state = GameState.Game_Playing;
        this.setGameRate(1);
        this.scheduleOnce(this.loadLevel, 0.5);
        this.music_manager.resume();
    }
    //根据当前charioUpgradationData获取一个升级组
    getcharioUpgradationData(): Array<number> {
        var arr: Array<number> = [];
        var arTemp: Array<number> = [];
        for (var i: number = 0; i < this.charioUpgradationData.length; i++) {
            if (this.charioUpgradationData[i] < 5 || i == 6) {
                arTemp.push(i);
            }
        }
        //可升级技能数量小于3
        if (arTemp.length <= 3) {
            return arTemp;
        }
        arTemp.sort(function () {
            return Math.random() - 0.5
        });
        arr[0] = arTemp[0];
        arr[1] = arTemp[1];
        arr[2] = arTemp[2];
        return arr;

    }
    //获取阵列类型
    getZhengXingData(): ZhenXingData {
        let waveData = this.fighting_info[this.cur_wave];
        //解析阵型数据
        let zxData = new ZhenXingData();
        let allEnemyData = new Array<JsonMonsterConfigure>();
        let MCM = MonsterConfigureManager.getInstance();
        for (let i = 0; i < waveData.monster_num.length; i++) {
            let mId = waveData.monster_id[i];
            let jsonData = MCM.getJsonMonsterConfigure(mId);
            let enemyNum = waveData.monster_num[i];
            for (let n = 0; n < enemyNum; n++) {
                allEnemyData.push(jsonData);
            }
        }
        //二次处理，把boss跟buff怪放最前面
        allEnemyData.sort((a: JsonMonsterConfigure, b: JsonMonsterConfigure) => {
            return b.StrengthType - a.StrengthType;
        });
        this.getZhenXingDataByEnemyData(allEnemyData, zxData, 0, 0);
        return zxData;
    }
    getZhenXingDataByEnemyData(enemyDatas: JsonMonsterConfigure[], out: ZhenXingData, buffNum: number, minY: number) {
        //阵型
        let zxType = Zheng_Xing_Type.ZX0;
        //随机一个阵型
        zxType = Math.floor(Math.random() * Zheng_Xing_Type.num);
        // if(IsDebug)
        // {
        //     zxType=Zheng_Xing_Type.箭头;
        // }
        let zxData = new ZhenXingData();
        //zxData=this.game.zhen_xing.json[zxType];
        let len = enemyDatas.length;
        let isNext = false;
        let otherNum = 0;
        let isHaveBoss = false;
        let ewaiNum = 0;
        for (let i = 0; i < len; i++) {
            if (enemyDatas[i].StrengthType == StrengthType.Boss) {
                isHaveBoss = true;
                break;
            }
        }
        for (let i = 0; i < len; i++) {
            if (i < (zxData.other_pos.length + ewaiNum)) {
                if (enemyDatas[i].StrengthType == StrengthType.Boss) {
                    //判断一下是否boss位置已经用了，如果用了代表这关有2个boss，需要把这个boss放到buff位置上
                    let pos = zxData.boss_pos;
                    let disPos = cc.v2(pos.x, pos.y + minY);
                    //如果之前没有设置boss位置                    
                    if (out.boss_pos.y == 0) {
                        out.boss_pos = disPos;
                        ewaiNum++;
                    } else {
                        if (out.buff_pos.length < 4) {
                            let pos = zxData.buff_pos[buffNum];
                            disPos = cc.v2(pos.x, pos.y + minY);
                            out.buff_pos.push(disPos);
                            ewaiNum++;
                            buffNum++;
                        } else {
                            let pos = zxData.other_pos[otherNum];
                            disPos = cc.v2(pos.x, pos.y + minY);
                            out.other_pos.push(disPos);
                            otherNum++;
                        }
                    }

                } else if (enemyDatas[i].StrengthType == StrengthType.Elite) {
                    if (out.buff_pos.length < 4) {
                        ewaiNum++;
                        //如果这波没有boss，并且有buff，则buff代替boss位置
                        if (isHaveBoss == false) {
                            let pos = zxData.boss_pos;
                            let disPos = cc.v2(pos.x, pos.y + minY);
                            out.buff_pos.push(disPos);
                            isHaveBoss = true;
                        } else {
                            let pos = zxData.buff_pos[buffNum];
                            let disPos = cc.v2(pos.x, pos.y + minY);
                            out.buff_pos.push(disPos);
                            buffNum++;
                        }
                    } else {
                        let pos = zxData.other_pos[otherNum];
                        let disPos = cc.v2(pos.x, pos.y + minY);
                        out.other_pos.push(disPos);
                        otherNum++;
                    }
                } else {
                    let pos = zxData.other_pos[otherNum];
                    let disPos = cc.v2(pos.x, pos.y + minY);
                    out.other_pos.push(disPos);
                    otherNum++;
                }
            } else {
                isNext = true;
                break;
            }
        }
        if (isNext == true) {
            minY = zxData.other_pos[zxData.other_pos.length - 1].y + 60 - 505;
            this.getZhenXingDataByEnemyData(enemyDatas.slice(zxData.other_pos.length), out, buffNum, minY);
        }

    }


    //显示关卡数据
    public loadLevel() {

        if (MonsterManager.getInstance() && MonsterManager.getInstance().is_load_ok  && (Pet.cur_loaded_num >= Pet.max_load_num) && this.fighting_info && this.cur_game_state == GameState.Game_Playing) {
            if (GameManager.getInstance().cur_game_mode == GameMode.Endless) {
                let top = cc.find("Canvas/Ui_Root/top_ui");
                let wavenumber = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage, 0) + 1
                TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamage, wavenumber);
                top.getChildByName('curLabel').getComponent(cc.Label).string = "" + wavenumber//(EndlessLevelsManager.getInstance().getMaxWave())
            }
            // console.log("_______进来了")

            //this.unscheduleAllCallbacks();
            let monsterData = this.fighting_info.monster_datas[this.cur_wave];
            let isBaoXiangLevel = false;
            let MCM = MonsterConfigureManager.getInstance();
            let useWidth = 600;
            let left = (cc.winSize.width - useWidth) / 2 - cc.winSize.width / 2;
            this.enemy_create_y = cc.winSize.height / 2;
            //this.enemy_create_y=0;
            let refreshTime = 0;
            for (let i = 0; i < monsterData.length; i++) {
                let data = monsterData[i];
                let mId = data.id;
                let strengthType = MCM.getStrengthType(mId);
                let num = data.num;
                let monsterLevel = data.level;
                //一组怪,每组怪都一致的，所以取其中一个就行了
                //分一下缝隙                
                let width = MCM.getMonsterSpacing(mId);
                let maxNumXX = Math.floor(useWidth / width);
                let remainWidth = useWidth % maxNumXX;
                width += Math.floor(remainWidth / maxNumXX);
                let useIndexs = [];
                for (let xx = 0; xx < maxNumXX; xx++) {
                    useIndexs.push(xx);
                }
                //x轴添加的数量，达到maxNumXX后，yyNum++
                let xxNum = 0;
                let yyNum = 0;
                refreshTime += data.refresh_time
                for (let n = 0; n < num; n++) {
                    this.cur_total_num++;
                    //向上排列YY
                    let yy = this.enemy_create_y + width * yyNum + Math.random() * width * 0.7;
                    //随机算出XX
                    let randIndex = Math.floor(Math.random() * useIndexs.length);
                    let pos = cc.v2(left + width / 2 + width * useIndexs[randIndex] + Math.random() * 10 - 5, yy);
                    useIndexs.splice(randIndex, 1);
                    if (strengthType != StrengthType.Boss) {
                        this.scheduleOnce(() => {
                            MonsterManager.getInstance().createMonsterById(mId, pos, monsterLevel, data.hp_rate);
                            this.cur_create_num++;
                            this.game.showJianTouPos(this.cur_create_num / this.cur_total_num);
                        }, refreshTime + Math.random() * (60 / MCM.getSpeed(mId)));
                        xxNum++;
                        if (xxNum > maxNumXX) {
                            yyNum++;
                            xxNum = 0;
                            for (let xx = 0; xx < maxNumXX; xx++) {
                                useIndexs.push(xx);
                            }
                        }
                    } else {
                        if (this.cur_game_mode == GameMode.Tower) {
                            this.scheduleOnce(() => {
                                BossManager.getInstance().addBoss(mId, monsterLevel, data.hp_rate);
                            }, 3)
                        } else {
                            BossManager.getInstance().addBoss(mId, monsterLevel, data.hp_rate);
                        }

                    }
                }
            }
            //怪物潮
            if (this.fighting_info.getWaveTypes()[this.cur_wave] == 1) {
                this.showMonsterWarning();
            }
            this.checkTutotials();
            //因为宝箱关卡是插进去的，所以想要获取准确的数值，需要减去其出现的次数
            //this.drop_data=LevelJsonData.getWaveDropData(LevelManager.getInstance().start_level,this.cur_wave-this.level_buff_num);
            this.game.showLevelProgress();
            let isLoadNext = !isBaoXiangLevel;
            if (this.cur_wave >= this.fighting_info.monster_datas.length - 1) {
                isLoadNext = false;
            }
            if (this.cur_game_mode == GameMode.Boss_Challenge) {
                isLoadNext = false;
            }
            if (isLoadNext) {
                let delyT = this.fighting_info.wave_refresh_time[this.cur_wave + 1];
                this.scheduleOnce(() => {
                    console.log("延迟加载下一关");
                    this.loadNextWave();
                }, delyT);
            }
        } else {
            this.scheduleOnce(() => {
                if (!this.fighting_info) {
                    this.reloadLevelDatas();
                }
                this.loadLevel();
            }, 0.2);
        }
    }

    loadNextWave() {
        if (this.cur_wave < this.fighting_info.monster_datas.length - 1) {


            this.cur_wave++;
            console.log("关卡增加到" + this.cur_wave + " " + this.cur_wave % 3);
            if (this.cur_wave % 3 == 0) {
                console.log("显示提示TIp");

                this.showRoguelike();
            } else {
                this.loadLevel();
            }

        }
    }

    reloadLevelDatas() {
        // console.log("什么时候进来")
        this.fighting_info = new FightingInfo();
        switch (this.cur_game_mode) {
            case GameMode.Main: {
                this.fighting_info = MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
            } break;
            case GameMode.Endless: {
                let wavenumber = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage, 0);//波数
                let Round = EndlessLevelsManager.getInstance().getRound(wavenumber)//回合数
                this.fighting_info = EndlessLevelsManager.getInstance().getFightingInfo(Round);
            } break;
            case GameMode.Boss_Challenge: {
                this.fighting_info = BossChallengeManager.getInstance().getFightingInfo(BossChallengeManager.getInstance().cur_challenge_mode);
            } break;
            case GameMode.Tower: {
                this.fighting_info = TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
            } break;
        }
    }



    addCheckTutotialsHero(heroId: Hero_Type, callback: Function) {
        let heroInfo: HeroInfo = new HeroInfo();
        heroInfo.hero_type = heroId;
        heroInfo.hero_level = 100;
        heroInfo.hero_stage = 5;
        let data = HeroManager.getInstance().getTryPlayHeroData(heroInfo)
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, 4, callback);
    }
    public addHero(heroId: Hero_Type, teamIndex: number, callback: Function = null): void {

        let data = HeroManager.getInstance().getTryPlayHeroData(HeroManager.getInstance().getHeroInfo(heroId));
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, teamIndex, callback);

        // this.refreshMainWallData();
    }
    //获取因为技能等级变化的血量比率
    public getCharioHealthRatio(): number {
        return this.charioUpgradationData[1] * 0.1 + 1;
    }
    //获取因为技能等级变化的防御比率
    public getCharioDefenseRotio(): number {
        return this.charioUpgradationData[3] * 0.1 + 1;
    }
    //攻击力比率
    public getCharioAttackRotio():number{
        return this.charioUpgradationData[0] * 0.1;
    }

     //攻击速度比率
    public getCharioSpeedRotio():number{
        return this.charioUpgradationData[2] * 0.1;
    }
    /**添加一个满级满装满宠物的英雄 */
    addTutotialsHeroFull(heroId: Hero_Type, teamIndex: number, callback: Function): HeroData {
        let heroInfo: HeroInfo = new HeroInfo();
        heroInfo.hero_type = heroId;
        heroInfo.hero_level = HeroBaseInfoManager.getInstance().getMaxLevel(heroId);
        heroInfo.hero_stage = 1//HeroBaseInfoManager.getInstance().getMaxStage(heroId);   
        heroInfo.exclusive_equip_stage = ExclusiveWeaponMessageManager.getInstance().getMaxStage(heroId);
        let equipMaxStage = EquipmentAttributeManager.getInstance().getMaxStage();
        heroInfo.wear1 = EquipmentAttributeManager.getID(1, equipMaxStage);
        heroInfo.wear2 = EquipmentAttributeManager.getID(2, equipMaxStage);
        heroInfo.wear3 = EquipmentAttributeManager.getID(3, equipMaxStage);
        heroInfo.wear4 = EquipmentAttributeManager.getID(4, equipMaxStage);
        switch (heroId) {
            case 2: {
                heroInfo.pet_id = 70413;
            } break;
            case 6: {
                heroInfo.pet_id = 70213;
            } break;
            case 10: {
                heroInfo.pet_id = 70213;
            } break;
            case 11: {
                heroInfo.pet_id = 70113;
            } break;
            case 12: {
                heroInfo.pet_id = 70313;
            } break;
        }
        let data = HeroManager.getInstance().getTryPlayHeroData(heroInfo)
        this.game_hero_data.set(heroId, data);
        this.game.loadHero(heroId, teamIndex, callback);
        return data;
    }

    checkTutotials() {
        if (!TutorailsManager.getInstance().is_finish_game) {
            if (this.cur_game_mode == GameMode.Main) {

                if (this.cur_wave == 5) {
                    if (LevelManager.getInstance().start_level == 1) {
                        if (TutorailsManager.getInstance().isShowTutorials(202)) {
                            TutorailsManager.getInstance().showTutorials(202, () => {
                                this.setGameRate(1 / JiaSu);
                            }, () => {
                                this.setGameRate(1);
                            });
                        }
                    }
                }
            }
        }
    }

    //敌人死亡了,哪个敌人死亡了，哪个英雄击杀的
    onEnemyDie(score: number, isAdd: boolean) {
        if (isAdd) {

            switch (this.cur_game_mode) {
                case GameMode.Main: {
                    if (MonsterManager.getInstance().killed_monster_num >= this.cur_total_num) {
                        console.log("敌人死亡加载下一关");
                        
                        this.loadNextWave();
                    }
                } break;
                case GameMode.Endless: {
                    if (MonsterManager.getInstance().killed_monster_num >= this.cur_total_num) {
                        console.log("敌人死亡加载下一关2");
                        this.loadNextWave();
                    }
                } break;
                // case GameMode.Boss_Prsonal:{
                //     BossChallengeManager.getInstance().cur_score+=enemyTs.score;
                // }break;
            }

        }
        //this.game.showLevelProgress();        
    }

    getFightCenter(): cc.Vec2 {
        return cc.v2(0, (700 + this.enemy_offset_y - this.enemy_att_y) / 2 + this.enemy_att_y);
    }

    setSkillCancel(isShow: boolean) {

    }

    exitPlayGame() {
        this.load_callback = null;
        this.load_jishu = 0;
        this.unscheduleAllCallbacks();
        this.all_hero = null;
    }

    backToHome(showHero?: Hero_Type) {
        this.role_show_hero = showHero ? showHero : Hero_Type.ChangMaoShou;
        let bgLoading = UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        let loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        let loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);

        // console.log("________type1",GameManager.getInstance().game_to_home)
        cc.director.preloadScene(GameScene.home, (completedCount: number, totalCount: number, item: any) => {
            //真实进度
            let progressTrue = completedCount / totalCount;
            //假的进度
            let progressFalse = progressTrue / 2;
            loadingBar.progress = progressFalse;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            this.cur_load_progress = progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        }, () => {
            cc.director.loadScene(GameScene.home);
        });
        //cc.director.loadScene(GameScene.home);
    }

    showDangerText() {
        let dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
        if (dangerText == null) {
            cc.resources.load('ui/game/dangerText', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
                if (dangerText == null) {
                    let node = cc.instantiate(assets);
                    node.parent = cc.find('Canvas/Fighting_Ui');
                }
            });
        } else {
            dangerText.active = true;
        }
    }
    showRoguelike() {
        if (this.cur_game_state == GameState.Game_Roguelike)
            return;

        this.cur_game_state = GameState.Game_Roguelike;
        cc.director.pause();
        UIManager.getInstance().showRoguelikeTip();
    }
    showGamePause() {
        if (this.cur_game_state == GameState.Game_Pause)
            return;
        this.cur_game_state = GameState.Game_Pause;
        cc.director.pause();
        UIManager.getInstance().showGamePauseUi();
    }
    showBtnBuff(type)//0:Buff展示   1：Buff选择
    {
        if (this.cur_game_state == GameState.Game_Pause)
            return;
        this.cur_game_state = GameState.Game_Pause;
        //cc.director.pause();
        UIManager.getInstance().showUiDialog(UIPath.BuffDisplay, UILayerLevel.Two, {
            onCompleted: (uiNode) => {
                uiNode.getComponent(BuffDisplay).init({
                    onClose: () => {

                    }
                })
                uiNode.getComponent(BuffDisplay).initUi(type)
            },
        });
    }
    showGameWin() {
        // console.log("打完一回合了")
        if (this.cur_game_state == GameState.Game_Win || this.cur_game_state == GameState.Game_Lose) {
            return;
        }
        this.music_manager.pause();
        this.cur_game_state = GameState.Game_Win;
        this.resetRate();
        this.game.setBtnRateShow();
        TheStorageManager.getInstance().setItem(StorageKey.try_rate_fight_remain, Math.floor(this.game.try_rate_ramain));
        TheStorageManager.getInstance().setItem(StorageKey.try_auto_fight_remain, Math.floor(this.game.try_auto_ramain));
        switch (this.cur_game_mode) {
            case GameMode.Main: {
                let curStartLevel = LevelManager.getInstance().start_level;
                if (TutorailsManager.getInstance().is_finish_game) {
                    FollowManager.getInstance().followEvent(Follow_Type.完成第N章玩家数 + MissionLevelManager.getInstance().getChapter(curStartLevel));
                    FollowManager.getInstance().followEvent(Follow_Type.完成挑战关卡 + curStartLevel);
                    LevelManager.getInstance().finish_level = curStartLevel;
                    this.game.showCoin();
                    this.scheduleOnce(() => {
                        UIManager.getInstance().showUiDialog(UIPath.GameWin, UILayerLevel.One, {
                            onCompleted: (uiNode: cc.Node) => {
                                uiNode.getComponent(GameWin).initUi();
                            }
                        })
                    }, 1)
                } else {
                    if (LevelManager.getInstance().start_level == 1 && TutorailsManager.getInstance().isShowTutorials(204)) {
                        TutorailsManager.getInstance().saveTutorials(200);
                        TutorailsManager.getInstance().saveTutorials(202);
                        TutorailsManager.getInstance().saveTutorials(203);
                        TutorailsManager.getInstance().saveFinishFromGame();
                        UIManager.getInstance().showUiDialog(UIPath.RewardSSUI, UILayerLevel.One, {
                            onCompleted: (uiNode) => {
                                uiNode.getComponent(RewardSSUi).initData(0);
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
            } break;
            case GameMode.Tower: {
                TowerManager.addTowerLevel(1);
            } break;
            case GameMode.Endless: {
                //显示三选一
                // console.log("+++++++++")
                GameManager.getInstance().showBtnBuff(1);//Buff选择弹窗
            } break;
            case GameMode.Maze: {
                this.game.showCoin();
                this.scheduleOnce(() => {
                    UIManager.getInstance().showUiDialog(UIPath.GameWin, UILayerLevel.One, {
                        onCompleted: (uiNode: cc.Node) => {
                            uiNode.getComponent(GameWin).initUi();
                        }
                    })
                }, 1)
            } break;
        }


        //熊消失
        let showwang = this.all_hero.get(Hero_Type.ShouWang);
        if (showwang) {
            showwang.onGameWin();
        }
    }

    showSelectSkill(delayTime: number = 1) {
        this.cur_game_state = GameState.Game_Pause;
        //延迟展示
        this.scheduleOnce(() => {
            cc.resources.load('ui/game/select_skill', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let fui = cc.find('Canvas/Drop_Root');
                for (let i = 0; i < fui.childrenCount; i++) {
                    cc.tween(fui.children[i]).by(0.5, { y: -1400 }).removeSelf().start();
                }
                let node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
                this.cur_game_state = GameState.Game_Pause;
            });
        }, delayTime);
    }

    showUnlockSkill(yesCallback: Function, noCallback: Function) {
        this.cur_game_state = GameState.Game_Pause;
        cc.resources.load('ui/game/unlock_ui', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            node.getComponent(UnlockSkill).init(yesCallback, noCallback);
        });
    }

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

    onFuhuo() {
        this.cur_game_state = GameState.Game_Playing;;

        let dangerText = cc.find('Canvas/Fighting_Ui/dangerText');
        if (dangerText) {
            dangerText.active = false;
        }
    }

    showFuhuo() {
        this.cur_game_state = GameState.Game_Pause;
        this.resetRate();
        this.game.setBtnRateShow();
        //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
        cc.resources.load('ui/game/fuhuo_ui', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            this.fuhuo_num--;
        });
    }

    showGameLose() {
        // console.log("失败",)
        if (this.cur_game_state == GameState.Game_Lose || this.cur_game_state == GameState.Game_Win) {
            return;
        }
        this.cur_game_state = GameState.Game_Lose;
        this.resetRate();
        this.game.setBtnRateShow();
        TheStorageManager.getInstance().setItem(StorageKey.try_rate_fight_remain, Math.floor(this.game.try_rate_ramain));
        TheStorageManager.getInstance().setItem(StorageKey.try_auto_fight_remain, Math.floor(this.game.try_auto_ramain));
        switch (this.cur_game_mode) {
            case GameMode.Tower: {

            } break;
            case GameMode.Main: {
                this.game.showCoin();
                //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
                this.scheduleOnce(() => {
                    UIManager.getInstance().showGameLoseUi();
                }, 1);
            } break;

            case GameMode.Maze: {
                this.game.showCoin();
                //LevelManager.getInstance().saveLevelWave(LevelManager.getInstance().start_level,this.cur_wave);
                this.scheduleOnce(() => {
                    UIManager.getInstance().showGameLoseUi();
                }, 1);
            } break;
            case GameMode.Endless: {
                // console.log("无尽挑战胜利")
                UIManager.getInstance().showUiDialog(UIPath.GameWin, UILayerLevel.One, {
                    onCompleted: (uiNode: cc.Node) => {
                        uiNode.getComponent(GameWin).initUi();
                    }
                })
            } break;
            case GameMode.Boss_Challenge: {
                // console.log("Boss挑战胜利")
                UIManager.getInstance().showUiDialog(UIPath.GameWin, UILayerLevel.One, {
                    onCompleted: (uiNode: cc.Node) => {
                        uiNode.getComponent(GameWin).initUi();
                    }
                })
            } break;
        }

    }



    onWallDie() {
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
    }

    showMonsterWarning() {
        this.sound_manager.playSound(SoundIndex.YX_EnemyComing);
        let node = GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.ui_monster_warning, cc.v2(0, 0), UIManager.getInstance().node);
        node.opacity = 0;
        node.stopAllActions();
        cc.tween(node).to(0.25, { opacity: 255 }).to(0.5, { opacity: 100 }).to(0.5, { opacity: 255 }).to(0.5, { opacity: 100 }).to(0.5, { opacity: 255 }).to(0.25, { opacity: 0 }).call(() => {
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.ui_monster_warning, node);
        }).start();
    }

    showBossWarning() {
        cc.resources.load('ui/game/boss_warning', cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
            if (GameManager.getInstance().cur_game_scene == GameScene.home)
                return;
            let chuxianAct = 0.3;
            let xiaoshiAct = 0.15;
            let tingliuAct = 2;
            let node = cc.instantiate(assets);
            node.parent = cc.find('Canvas/Ui_Root');
            let auto = node.getChildByName('auto');
            auto.x = -320;
            cc.tween(auto).to(chuxianAct, { x: 320 }).to(2, { x: 1080 }).start();

            let warningLabel = node.getChildByName('warningLabel');
            warningLabel.x = 640;
            cc.tween(warningLabel).to(chuxianAct, { x: 0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(xiaoshiAct, { x: -640 }).start();
            let bossLabel = node.getChildByName('bossLabel');
            bossLabel.x = -640;
            cc.tween(bossLabel).to(chuxianAct, { x: 0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(0.25, { scale: 1.1 }).to(0.25, { scale: 1.0 }).to(xiaoshiAct, { x: 640 }).start();
            let effects = node.getChildByName('effects');
            effects.opacity = 0;
            cc.tween(effects).delay(chuxianAct + 0.2).call(() => {
                effects.opacity = 255;
                effects.getComponent(cc.Animation).play();
            }).delay(tingliuAct - chuxianAct - 0.2).removeSelf().start();
            cc.tween(node).delay(tingliuAct).removeSelf().start();

            // cc.tween(node).to(0.2,{y:200}).delay(0.5).to(0.2,{scale:1.2}).to(0.2,{scale:0.8}).to(0.1,{scale:32,opacity:0}).removeSelf().start();
        });
    }

    saveSound() {
        this.music_manager.saveMusicVolume();
        this.music_manager.saveMusicMute();
        this.sound_manager.saveSoundVolume();
        this.sound_manager.saveSoundMute();
    }

    showSpeedUpUi() {
        if (this.cur_game_scene == GameScene.game) {
            cc.resources.load('ui/game/speed_ui', cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                this.cur_game_state = GameState.Game_Pause;
                cc.director.pause();
                let node = cc.instantiate(assets);
                node.parent = cc.find('Canvas/Ui_Root');
            });
        }
    }

    //----------------------------------------------------HOME------------------------------------------------------------------------

    refreshCoinShow(): cc.Node {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                return home.refreshCoinShow();
            }
        }
    }

    refreshGemShow(): cc.Node {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                return home.refreshGemShow();
            }
        }
    }

    refreshLongJingShow() {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                return home.refreshLongJing();
            }
        }
    }

    refreshUserExpShow() {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                return home.refreshUserExp();
            }
        }
    }

    jumoToUi(index: Btn_Index) {
        if (this.cur_game_scene == GameScene.home)
            cc.find('Canvas').getComponent(Home).jumoToUi(index);
    }

    jumoAndShowUi() {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            home.cheakUnlock();
            home.showUi();
        }
    }

    refreshZhanliShow() {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                return home.refreshZhanLiShow();
            }
        }
    }

    refreshTopShow() {
        if (this.cur_game_scene == GameScene.home) {
            let home = cc.find('Canvas').getComponent(Home);
            if (home) {
                home.refreshTop();
            }
        }
    }

    refreshGuaJiGift() {
        if (this.cur_game_scene == GameScene.home) {
            let btnOfflineGift = cc.find('Canvas/main_ui/btnOfflineGift');
            btnOfflineGift.getComponent(GuaJiGift).cheak();
        }
    }

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
    public addPetActiveDps(petId: PetInfo, num: number) {
        let nowNum = this.getPetActiveDps(petId);
        let newNum = nowNum + num;
        this.setPetActiveDps(petId, newNum);
    }
    /**
     * 
     * @param petId 宠物id
     * @returns 当前的dps
     */
    public getPetActiveDps(petId: PetInfo): number {
        return this.pet_active_dps.get(petId);
    }

    private setPetActiveDps(petId: PetInfo, num: number) {
        this.pet_active_dps.set(petId, num);
    }

    /**
     * 
     * @param petId 宠物id
     * @param num 增加的数值
     */
    public addPetConnectDps(petId: PetInfo, num: number) {
        let nowNum = this.getPetConnectDps(petId);
        let newNum = nowNum + num;
        this.setPetConnectDps(petId, newNum);
    }
    /**
     * 
     * @param petId 宠物id
     * @returns 当前的dps
     */
    public getPetConnectDps(petId: PetInfo): number {
        return this.pet_connect_dps.get(petId);
    }

    private setPetConnectDps(petId: PetInfo, num: number) {
        this.pet_connect_dps.set(petId, num);
    }
}

