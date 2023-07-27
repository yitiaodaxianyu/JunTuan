
import { AccessName, HttpManager } from "./NetWork/HttpManager";
import { CumulativeRechargesManager } from "./AccumulatedRecharge/CumulativeRecharges";
import { BossChallengeManager, ChallengeMode } from "./Activity/BossChallenge";
import { EndlessLevelsManager } from "./Activity/EndlessLevels";
import AdManager from "./Ads/AdManager";
import ApkManager from "./Ads/ApkManager";
import CoinPop from "./CoinPop";
import { Btn_Index, FuncType, GameMode, GameScene, Go_Type, IsDebug } from "./Constants";
import { EquipmentAttributeManager } from "./Equipment/Data/EquipmentAttribute";
import { CostData, EquipType } from "./Equipment/EquipConfig";
import { EquipmentManager } from "./Equipment/EquipmentManager";
import GameData from "./GameData";
import GameManager from "./GameManager";
import { HeroManager } from "./Hero/Data/HeroManager";
import { Hero_Type } from "./Hero/Game/HeroConfig";
import HeroListUi from "./Hero/Ui/HeroListUi";
import RoleUi from "./Hero/Ui/RoleUi";
import { FunctionDefinitionManager } from "./JsonData/FunctionDefinition";
import { RewardHeroData } from "./JsonData/LevelJsonData";
import { PlayerLevelUpManager } from "./JsonData/PlayerLevelUp";
import { LevelManager } from "./Level/LevelManager";
import { MazeManager } from "./Maze/MazeManager";
import { Follow_Type } from "./multiLanguage/FollowConstants";
import FollowManager from "./multiLanguage/FollowManager";
import LanguageManager from "./multiLanguage/LanguageManager";
import PayFirstChargeUi from "./Payment/PayFirstChargeUi";
import { PayManager } from "./Payment/PayManager";
import { PropId } from "./Prop/PropConfig";
import { PropManager } from "./Prop/PropManager";
import RankingList from "./RankingList/RankingList";
import { MusicIndex, SoundIndex } from "./Sound/AudioConstants";
import { StorageKey } from "./Storage/StorageConfig";
import { TheStorageManager } from "./Storage/StorageManager";
import { DailyShopManager } from "./Store/DailyShop";
import StoreHeroUi from "./Store/StoreHeroUi";
import { TaskItem } from "./Task/TaskEnum";
import TaskManager from "./Task/TaskManager";
import TaskUi from "./Task/TaskUi";
import { PayUiIndex } from "./thirdParty/ThirdParty";
import NumberLabel from "./Tools/NumberLabel";
import Turmtable from "./Turntable/Turmtable";
import RewardSSUi from "./Tutorials/RewardSSUi";
import TutorailsManager from "./Tutorials/TutorailsManager";
import BagUi from "./UI/home/BagUi";
import MainUi from "./UI/home/MainUi";
import SettingUi from "./UI/home/SettingUi";
import SignUi from "./UI/home/SignUi";
import SignUiDaily from "./UI/home/SignUiDaily";
import ToPlayMainUi from "./UI/home/ToPlayMainUi";
import { UILayerLevel, UIPath } from "./UI/UIConfig";
import { UIManager } from "./UI/UIManager";
import UserData from "./UserData";
import VipSystem from "./VipSystem/VipSystem";
import WXManagerEX from "../startscene/WXManagerEX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    cur_selected_index: Btn_Index = Btn_Index.Btn_Main;
    @property([cc.Node])
    all_ui: cc.Node[] = [];
    @property([cc.Node])
    btns: cc.Node[] = [];
    @property([cc.Node])
    names: cc.Node[] = [];

    onLoad() {
        this.adaptation();
        TaskManager.getInstance().emitTask(TaskItem.登录X次游戏);
        TaskManager.getInstance().emitTask(TaskItem.登录游戏1次);
        if (TheStorageManager.getInstance().getNumber(StorageKey.TodayIsFirstLogIn, 0) == 0) {
            TheStorageManager.getInstance().setItem(StorageKey.TodayIsFirstLogIn, 1)
            TaskManager.getInstance().emitTask(TaskItem.累计登录X天);
        }
        //cc.debug.setDisplayStats(IsDebug);
        //HeroManager.getInstance().loadAllHeroData();
        AdManager.getInstance();
        //ApkManager.getInstance().getAndroidId();
        //检测是否有教程
        this.checkTutorails();
        this.cheakUnlock();
        //this.dataTest();
        // setTimeout(() => {
        //     if (window.vConsole) {
        //     window.vConsole.destroy();
        //     window.vConsole = null;
        //     }
        //     }, 1000);
        MazeManager.getInstance().resetHeroBind();
    }

    start() {
        cc.director.resume();



        // 拉取服务器时间
        GameData.getInstance().refreshServerTime();
        GameManager.getInstance().resetRate();
        // HttpManager.post(AccessName.updateUserInfo,this.getZongZhanLiJsonString());
        CumulativeRechargesManager.getInstance().refreshData();
        this.showLoading();
        GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Home);
        if (FollowManager.getInstance().getFirstDo(Follow_Type.首次进入主页) <= 0) {
            FollowManager.getInstance().addFirstDo(Follow_Type.首次进入主页);
            FollowManager.getInstance().followEvent(Follow_Type.首次进入主页);
        }

        //ApkManager.getInstance().cheakDYInfo();
        let gm = GameManager.getInstance();
        if (GameData.getInstance().getIsSignToday() && TutorailsManager.getInstance().is_tutorails_state == false) {
            if (FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.QianDao))
                gm.game_to_home = Go_Type.Main_Sign;
        } else {
            if (FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.FirstCharge) && PayManager.getInstance().getPayNum('c301') <= 0 && TutorailsManager.getInstance().is_tutorails_state == false) {
                this.scheduleOnce(() => {
                    UIManager.getInstance().showUiDialog(UIPath.FirstCharge, UILayerLevel.One, {
                        onCompleted: (uiNode) => {
                            uiNode.getComponent(PayFirstChargeUi).init({
                                onClose: () => {
                                    let mainUi = cc.find("Canvas/main_ui").getComponent(MainUi);
                                    mainUi.refreshLeft();
                                }
                            });
                        },
                    });
                }, 1)
            }
        }
        //根据game_to_home设置显示的界面
        this.showUi();
        this.initTop();
        this.showAvatar();
        // PropManager.getInstance().changePropNum(PropId.Gem,-200);
        // PropManager.getInstance().changePropNum(PropId.Coin,2000);
    }



    checkTutorails(): boolean {
        if (!TutorailsManager.getInstance().is_finish) {   //跳转到商场
            // let finishLevel=LevelManager.getInstance().finish_level;
            // if(finishLevel<5){
            //     if(TutorailsManager.getInstance().isShowTutorials(222)&&finishLevel>=3)
            //     {
            //         //教程
            //         TutorailsManager.getInstance().is_tutorails_state=true;
            //         //强制显示商城页
            //         GameManager.getInstance().game_to_home=Go_Type.City;
            //         return true;
            //     }else{
            //         GameManager.getInstance().game_to_home=Go_Type.Main;
            //         let btnStart=cc.find('Canvas/main_ui/btnStart');
            //         let wordPos=btnStart.parent.convertToWorldSpaceAR(btnStart.getPosition());
            //         let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            //         localPos.x-=cc.find('Canvas/main_ui').x;
            //         TutorailsManager.getInstance().showTutorials(201,null,()=>{

            //         },true,null,localPos);
            //         TutorailsManager.getInstance().is_tutorails_state=true;
            //         return true;
            //     }     
            // }else{


            // }
            if (TutorailsManager.getInstance().isShowTutorials(301) == false && TutorailsManager.getInstance().isShowTutorials(302)) {
                //218完成显示
                //升级引导
                TutorailsManager.getInstance().is_tutorails_state = true;
                GameManager.getInstance().game_to_home = Go_Type.Role;
                return true;
            } else if (TutorailsManager.getInstance().isShowTutorials(311) == false && TutorailsManager.getInstance().isShowTutorials(312)) {
                //显示英雄页
                TutorailsManager.getInstance().is_tutorails_state = true;
                GameManager.getInstance().game_to_home = Go_Type.Role;
                return true;
            } else {
                if (LevelManager.getInstance().finish_level >= 5 && TutorailsManager.getInstance().isShowTutorials(205)) {
                    this.scheduleOnce(() => {
                        UIManager.getInstance().showUiDialog(UIPath.RewardSSUI, UILayerLevel.Two, {
                            onCompleted: (uiNode) => {
                                uiNode.getComponent(RewardSSUi).initData(1);
                            }
                        });
                    }, 0.5);

                }
            }
        }
        return false;
    }

    cheakUnlock() {
        let btnCity = cc.find('Canvas/Top_Ui/down/btnCity');
        // btnCity.getChildByName('lock').active=!FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_City);

        let btnFuBen = cc.find('Canvas/Top_Ui/down/btnFuBen');
        // btnFuBen.getChildByName('lock').active=!FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen);
        let btnPet = cc.find('Canvas/Top_Ui/down/btnPet');
        // if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChongWuXiTong)){
        //     let btnPet=cc.find('Canvas/Top_Ui/down/btnPet');
        //     btnPet.getChildByName("lock").active = false;
        // }

    }

    showLoading() {
        let bgLoading = UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        let loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        let loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        loadingBar.progress = GameManager.getInstance().cur_load_progress;
        loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
        GameManager.getInstance().init(GameScene.home);
        let loadingSchedule = () => {
            loadingBar.progress += 0.01;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            if (loadingBar.progress >= 1) {
                loadingBar.progress = 1;
                if (GameManager.getInstance().is_loaded) {
                    bgLoading.active = false;
                    this.unschedule(loadingSchedule);
                    loadingSchedule = null;
                }
            }
        };
        this.schedule(loadingSchedule, 0.02);
    }

    private adaptation() {
        //上下模块        
        let topUi = cc.find('Canvas/Top_Ui');
        let down = topUi.getChildByName('down');
        let top = topUi.getChildByName('top');
        let offsetY = top.y;
        let wp = cc.winSize;
        down.y = -wp.height / 2 + down.height / 2;
        if (WXManagerEX.getInstance().statusBarHeight > 20) {
            top.y = wp.height / 2 - top.height / 2 - 90;
        } else {
            top.y = wp.height / 2 - top.height / 2;
        }

        offsetY = top.y - offsetY;
        //开始按钮
        let mainUi = cc.find('Canvas/main_ui');
        let btnStart = mainUi.getChildByName('btnStart');
        let Main_Icon_Map = mainUi.getChildByName('Main_Icon_Map');
        Main_Icon_Map.y = down.y + 150;
        let mainTask = mainUi.getChildByName('mainTask');
        mainTask.y = down.y + 290;
        let mainTaskEffect = mainUi.getChildByName('mainTaskEffect');
        mainTaskEffect.y = down.y + 290;
        let Main_Icon_Idle = mainUi.getChildByName('Main_Icon_Idle');
        Main_Icon_Idle.y = down.y + 150;
        btnStart.y = down.y + 150;
        mainUi.getChildByName('btnOfflineGift').y = btnStart.y + 80;
        //主界面
        mainUi.getChildByName('left').y = top.y - 208;
        mainUi.getChildByName('right').y = top.y - 208;
        mainUi.getChildByName('level').y += offsetY;
        //角色界面
        // let roleUi=cc.find('Canvas/role_ui');
        // roleUi.y+=offsetY;

    }

    setBtnShow() {
        //如果当前的index是主城，需要提前判断一下主城是否有解锁的功能
        let newIndex = -1;
        if (!FunctionDefinitionManager.getInstance().getIsUnlockIndex(this.cur_selected_index)) {
            newIndex = Btn_Index.Btn_Main;
        }
        if (this.cur_selected_index == newIndex) {
            return;
        }
        if (this.cur_selected_index == 0) {
            FollowManager.getInstance().followEvent(Follow_Type.主城打开次数);
        }
        //let down=cc.find('Canvas/Top_Ui/down');
        for (let i = 0; i < 5; i++) {
            let btn = this.btns[i];
            let btns = btn.getComponents(cc.Button);
            let isCanBtn = this.cur_selected_index != i;
            //this.all_ui[i].active=!isCanBtn;
            this.all_ui[i].opacity = isCanBtn ? 0 : 255;
            this.all_ui[i].x = isCanBtn ? -1280 : 0;
            this.names[i].color = isCanBtn ? cc.color(210, 184, 145) : cc.color(255, 233, 201);
            this.btns[i].getChildByName('bg').active = !isCanBtn;
            for (let n = 0; n < btns.length; n++) {
                btns[n].interactable = isCanBtn;
            }
        }
    }

    initTop() {
        let top = cc.find('Canvas/Top_Ui/top');
        let levelLabel = top.getChildByName('levelLabel');
        let level = UserData.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = '' + level;
        top.getChildByName("name").getComponent(cc.Label).string = UserData.getInstance().getUserName();
        top.getChildByName("atk").getComponent(cc.Label).string = HeroManager.getInstance().getAllHeroZhanli() + '';
        let btnAvatar = top.getChildByName('headPortrait').getChildByName('btnAvatar');
        let avatarIndex = UserData.getInstance().getUserAvatar();
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(avatarIndex);
        //进度
        let curExp = UserData.getInstance().getUserExp();
        let maxExp = PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = curExp / maxExp;
        if (IsDebug && curExp / maxExp >= 1 && TutorailsManager.getInstance().is_tutorails_state == false) {
            // UIManager.getInstance().showUserLevelUi();
            //UIManager.getInstance().showUiDialog(UIPath.UserLevel,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        }
        //COIN
        let coinLabel = cc.find('Canvas/Top_Ui/top/coinLabel');
        coinLabel.getComponent(NumberLabel).init(PropManager.getInstance().getPropNum(PropId.Coin), true);
        //是否需要加K显示
        //Gem
        let gemLabel = cc.find('Canvas/Top_Ui/top/gemLabel');
        gemLabel.getComponent(NumberLabel).init(PropManager.getInstance().getPropNum(PropId.Gem), true);
        //龙晶
        let crystalLabel = cc.find('Canvas/Top_Ui/top/crystalLabel');
        crystalLabel.getComponent(NumberLabel).init(PropManager.getInstance().getPropNum(PropId.LongJing), true);
        //战力
        let zhanliLabel = cc.find('Canvas/Top_Ui/top/zhanliLabel');
        zhanliLabel.getComponent(NumberLabel).init(HeroManager.getInstance().getAllHeroZhanli(), false);
    }

    refreshTop() {
        let top = cc.find('Canvas/Top_Ui/top');
        let levelLabel = top.getChildByName('levelLabel');
        let level = UserData.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = '' + level;
        top.getChildByName("name").getComponent(cc.Label).string = UserData.getInstance().getUserName();
        top.getChildByName("atk").getComponent(cc.Label).string = HeroManager.getInstance().getAllHeroZhanli() + '';
        let btnAvatar = top.getChildByName('headPortrait').getChildByName('btnAvatar');
        let avatarIndex = UserData.getInstance().getUserAvatar();
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(avatarIndex);
        //进度
        let curExp = UserData.getInstance().getUserExp();
        let maxExp = PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = curExp / maxExp;
        if (IsDebug && curExp / maxExp >= 1) {
            //UIManager.getInstance().showUiDialog(UIPath.UserLevel,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        }
        //COIN
        this.refreshCoinShow();
        //是否需要加K显示
        //Gem
        this.refreshGemShow();
        //战力
        this.refreshZhanLiShow();
    }

    refreshCoinShow(): cc.Node {
        let coinLabel = cc.find('Canvas/Top_Ui/top/coinLabel');
        coinLabel.getComponent(NumberLabel).setTarget(PropManager.getInstance().getPropNum(PropId.Coin), 0.5);
        return coinLabel;
    }

    refreshGemShow(): cc.Node {
        let gemLabel = cc.find('Canvas/Top_Ui/top/gemLabel');
        gemLabel.getComponent(NumberLabel).setTarget(PropManager.getInstance().getPropNum(PropId.Gem), 0.5);
        return gemLabel;
    }

    refreshZhanLiShow() {
        let zhanliLabel = cc.find('Canvas/Top_Ui/top/zhanliLabel');
        zhanliLabel.getComponent(NumberLabel).setTarget(HeroManager.getInstance().getAllHeroZhanli(), 0.5, true);
    }

    refreshLongJing() {
        //龙晶
        let crystalLabel = cc.find('Canvas/Top_Ui/top/crystalLabel');
        crystalLabel.getComponent(NumberLabel).init(PropManager.getInstance().getPropNum(PropId.LongJing), true);
    }

    refreshUserExp() {
        let top = cc.find('Canvas/Top_Ui/top');
        let levelLabel = top.getChildByName('levelLabel');
        let level = UserData.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = 'Lv.' + level;
        //进度
        let curExp = UserData.getInstance().getUserExp();
        let maxExp = PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        let pp = curExp / maxExp;
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = pp;
    }

    jumoToUi(index: Btn_Index) {
        this.cur_selected_index = index;
        this.setBtnShow();
    }

    showAvatar() {
        let top = cc.find('Canvas/Top_Ui/top');
        let icon = top.getChildByName('btnSetting').getChildByName('icon');
        let avatarIndex = UserData.getInstance().getUserAvatar();
        icon.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('hero' + avatarIndex);

        let userNameLabel = top.getChildByName('userNameLabel');
        userNameLabel.getComponent(cc.Label).string = UserData.getInstance().getUserName();
        if (IsDebug) {
            //PropManager.getInstance().changePropNum(PropId.Gem,-750000);
        }
        // HeroManager.getInstance().addHero(Hero_Type.PaoShou);
        // HeroManager.getInstance().addHero(Hero_Type.ShouWang);
        // HeroManager.getInstance().addHero(Hero_Type.DeLuYi);
        // HeroManager.getInstance().addHero(Hero_Type.LeiShen);
        // HeroManager.getInstance().addHero(Hero_Type.GongJianShou);
        // [{"hero_type":2,"hero_level":1,"hero_quality":2,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":3,"hero_level":1,"hero_quality":2,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":4,"hero_level":1,"hero_quality":3,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":12,"hero_level":1,"hero_quality":5,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":8,"hero_level":1,"hero_quality":4,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1}]
    }

    showUi() {
        let gm = GameManager.getInstance();
        let um = UIManager.getInstance();
        switch (gm.game_to_home) {
            case Go_Type.Main: {
                this.cur_selected_index = Btn_Index.Btn_Main;
            } break;
            case Go_Type.Main_Sign: {
                //this.cur_selected_index=Btn_Index.Btn_Main;
                this.scheduleOnce(() => {

                    if (TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn, 0) == 0) {
                        if (TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInOver, 0) == 0) {
                            UIManager.getInstance().showUiDialog(UIPath.SignIn, UILayerLevel.One, {
                                onCompleted: (uiNode) => {
                                    uiNode.getComponent(SignUi).init(null);
                                },
                            });
                        } else {
                            UIManager.getInstance().showUiDialog(UIPath.SignInDaily, UILayerLevel.One, {
                                onCompleted: (uiNode) => {
                                    uiNode.getComponent(SignUiDaily).init(null);
                                },
                            });
                        }
                    }

                }, 1);
                this.node.getChildByName('main_ui').getComponent(MainUi).refreshLeft();
            } break;
            case Go_Type.Main_Spin: {
                this.cur_selected_index = Btn_Index.Btn_Main;
                // this.scheduleOnce(()=>{
                //     um.showSpinUi({onClose:()=>{

                //     }});
                // },1);
                this.node.getChildByName('main_ui').getComponent(MainUi).refreshRight();
            } break;
            case Go_Type.Main_Task: {
                this.cur_selected_index = Btn_Index.Btn_Main;
                this.scheduleOnce(() => {
                    um.showUiDialog(UIPath.Task, UILayerLevel.One, {
                        onCompleted: (uiNode) => {
                            // uiNode.getComponent(TaskUi).init(null); 
                        },
                    });
                }, 1);
                this.node.getChildByName('main_ui').getComponent(MainUi).refreshLeft();
            } break;
            case Go_Type.Main_Rank: {
                // this.cur_selected_index=Btn_Index.Btn_Main;
                // this.scheduleOnce(()=>{
                //     um.showRankUi();
                // },1);
                // this.node.getChildByName('main_ui').getComponent(MainUi).refreshRight();
            } break;
            case Go_Type.Role: this.cur_selected_index = Btn_Index.Btn_Role; break;
            case Go_Type.PetList: this.cur_selected_index = Btn_Index.Btn_Pet;
                break;
            case Go_Type.City: {
                //if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChengBaoYangCheng)){
                this.cur_selected_index = Btn_Index.Btn_City;
                // let cultivateUi=this.node.getChildByName('cultivate_ui').getComponent(CultivateUi);
                // cultivateUi.is_hint_state=true;
                //cultivateUi.cur_selected_index=0;
                //cultivateUi.setBtnShow();
                //}
            } break;
            case Go_Type.Activity: {
                this.cur_selected_index = Btn_Index.Btn_FuBen;
            } break;
            case Go_Type.Activity_Endless: {
                // console.log("+++++++++无尽确认按钮退出来")
                this.cur_selected_index = Btn_Index.Btn_FuBen;
            } break;
            case Go_Type.Activity_Boss: {
                this.cur_selected_index = Btn_Index.Btn_FuBen;
            } break;
        }
        this.setBtnShow();
    }


    clickBtnDown(btn: cc.Event.EventTouch, index: string) {


        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // Number(index) == 3 || 
        // if(Number(index) == 4){
        //     let s = LanguageManager.getInstance().getStrByTextId(100113);
        //     GameManager.getInstance().showMessage(s);
        //     return;
        // }
        this.cur_selected_index = parseInt(index);
        if (this.cur_selected_index == 4) {
            FollowManager.getInstance().followEvent(Follow_Type.副本页面展示次数);
        }
        this.setBtnShow();
    }

    clickBtnCoin() {
        UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.One, {
            onCompleted: (uiNode) => {
                uiNode.getComponent(CoinPop).initUi(PropId.Coin)
            },
        });
        let gm = GameManager.getInstance();
        gm.sound_manager.playSound(SoundIndex.click);
    }

    clickBtnGem() {
        // UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //     uiNode.getComponent(CoinPop).initUi(PropId.Gem)
        // },});
        let gm = GameManager.getInstance();
        gm.sound_manager.playSound(SoundIndex.click);
        if (cc.find('Canvas').getComponent(Home).cur_selected_index == Btn_Index.Btn_City) {
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
            GameManager.getInstance().game_to_home = Go_Type.City;
            GameManager.getInstance().jumoAndShowUi();
            UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
            return;
        } else {
            UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.One, {
                onCompleted: (uiNode) => {
                    uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                },
            });
        }
    }

    clickBtnSetting() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // if(IsDebug){
        //     let itemList=[];

        //     for(let i=0; i<9; i++){
        //         let item=PropManager.getInstance().createPropItem(Math.random()<0.5?20110:20110,5);
        //         itemList.push(item);
        //     }
        //     let item=PropManager.getInstance().createPropItem(30405,5);
        //     itemList.push(item);
        //     GameManager.getInstance().showMultipleGetTip(itemList);
        //     return
        // }
        // let propDatas=new Array<PropObject>();
        // let propData=new PropObject();
        // propData.itemsId=10002
        // propData.itemsNum=100000;
        // propDatas.push(propData);
        // // let propData1=new PropObject();
        // // propData1.itemsId=10004
        // // propData1.itemsNum=32;
        // // propDatas.push(propData1);
        // PropManager.getInstance().HttpAddPropData(propDatas);
        // EquipmentManager.getInstance().addEquipment(30304);
        // EquipmentManager.getInstance().addEquipment(30304);
        // EquipmentManager.getInstance().addEquipment(30304);
        // EquipmentManager.getInstance().addEquipment(30304);
        // EquipmentManager.getInstance().addEquipment(30301);
        // EquipmentManager.getInstance().addEquipment(30302);
        // EquipmentManager.getInstance().addEquipment(30303);
        // EquipmentManager.getInstance().saveAllEquipmentList();
        // let costList=new Array<CostData>();
        // let isCan=EquipmentManager.getInstance().checkAEquipMerge(30304,costList);
        // if(isCan){
        //     cc.log(JSON.stringify(costList));
        // }

        // UIManager.getInstance().showSetting({
        //     onClose: () => {
        //         this.showAvatar();
        //     },            
        // });
        // UIManager.getInstance().showUiDialog(UIPath.VipSystem,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //     uiNode.getComponent(VipSystem).iniUi()
        // },});//会员系统  VIP系统
        // return;
        // if(IsDebug){
        //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
        //     GameManager.getInstance().fighting_info=BossChallengeManager.getInstance().getFightingInfo(ChallengeMode.Noamal);
        //     cc.director.loadScene('game');
        // }
        // UIManager.getInstance().showUiDialog(UIPath.RankingList,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //     uiNode.getComponent(RankingList).initUi()
        // },});//排行榜
        // return;
        // UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //     uiNode.getComponent(Turmtable).initUi()
        // },});//转盘
        // return;
        UIManager.getInstance().showUiDialog(UIPath.Set, UILayerLevel.One, {
            onCompleted: (uiNode) => {
                uiNode.getComponent(SettingUi).init({
                    onClose: () => {
                        this.showAvatar();
                    },
                });
            },
        })
        // if(IsDebug){
        //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
        //     GameManager.getInstance().fighting_info=BossChallengeManager.getInstance().getFightingInfo(ChallengeMode.Noamal);
        //     cc.director.loadScene('game');
        // }

        // HttpManager.postToIssued(URL_TYPE.subUserItemsNum,JSON.stringify({
        //     "uid":"ZR16486074790a0", //用户标识id
        //     "itemVoList":[
        //         {
        //             "itemsId":10001, //道具id
        //             "itemsNum":-20 //新增或减少数量
        //         },
        //         {
        //             "itemsId":10004,
        //             "itemsNum":-20
        //         }
        //     ]
        // }),(data)=>{
        //     cc.log(data);
        // })
        //PropManager.getInstance().syncPropData();


        // UIManager.getInstance().showMapUi({onClose:()=>{
        //     this.setActivity();
        // }});

    }

    clickBtnCityLock() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if (FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_City) == false) {
            let type = FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.XuYuanChi)
            let num = FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.XuYuanChi)
            if (type == 1) {
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051) + ":" + num);
            } else if (type == 2) {
                let textStr = LanguageManager.getInstance().getStrByTextId(100052);
                let str = textStr.replace('~', '' + num)
                GameManager.getInstance().showMessage(str);
            }
        }
    }

    clickBtnActivityLock() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if (FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen) == false) {
            let type = FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.WuJinTiaoZhan)
            let num = FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.WuJinTiaoZhan)
            if (type == 1) {
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051) + ":" + num);
            } else if (type == 2) {
                let textStr = LanguageManager.getInstance().getStrByTextId(100052);
                let str = textStr.replace('~', '' + num)
                GameManager.getInstance().showMessage(str);
            }
        }
    }

    clickBtnPetLock() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if (FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_Pet) == false) {
            let type = FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.ChongWuXiTong)
            let num = FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ChongWuXiTong)
            if (type == 1) {
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051) + ":" + num);
            } else if (type == 2) {
                let textStr = LanguageManager.getInstance().getStrByTextId(100052);
                let str = textStr.replace('~', '' + num)
                GameManager.getInstance().showMessage(str);
            }
        }
    }

    clickBtnLevelLabel() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(310002), 3);
    }

    clickBtnBag() {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // UIManager.getInstance().showBagUi(null);
        UIManager.getInstance().showUiDialog(UIPath.Bag, UILayerLevel.One, {
            onCompleted: (uiNode) => {
                uiNode.getComponent(BagUi).init(null);
            },
        });
    }

    dataTest() {
        if (IsDebug) {
            if (FollowManager.getInstance().getFirstDo(Follow_Type.Load页展示总次数) <= 0) {
                FollowManager.getInstance().addFirstDo(Follow_Type.Load页展示总次数)
                let em = EquipmentManager.getInstance()
                for (let i = EquipType.WuQi; i < EquipType.Num; i++) {
                    for (let h = Hero_Type.ChangMaoShou; h < Hero_Type.Hero_Num; h++) {

                    }
                }
                let heroList = HeroManager.getInstance().getHeroList();
                for (let i = 0; i < heroList.length; i++) {
                    // HeroManager.getInstance().saveHeroQuality(i,36);
                    // HeroManager.getInstance().saveHeroLevel(i,160);
                }
                TutorailsManager.getInstance().saveTutorials(201);
                TutorailsManager.getInstance().saveTutorials(202);
                TutorailsManager.getInstance().saveTutorials(203);
                TutorailsManager.getInstance().saveTutorials(204);
                TutorailsManager.getInstance().saveTutorials(205);
                TutorailsManager.getInstance().saveTutorials(206);
                TutorailsManager.getInstance().saveTutorials(207);
                TutorailsManager.getInstance().saveTutorials(208);
                TutorailsManager.getInstance().saveTutorials(209);
                TutorailsManager.getInstance().saveTutorials(210);
                TutorailsManager.getInstance().saveTutorials(211);
                TutorailsManager.getInstance().saveTutorials(212);
                TutorailsManager.getInstance().saveTutorials(213);
                TutorailsManager.getInstance().saveTutorials(214);
                TutorailsManager.getInstance().saveTutorials(215);
                TutorailsManager.getInstance().saveTutorials(216);
                TutorailsManager.getInstance().saveTutorials(217);
                TutorailsManager.getInstance().saveTutorials(218);
                TutorailsManager.getInstance().saveTutorials(219);
                TutorailsManager.getInstance().saveTutorials(220);
                TutorailsManager.getInstance().saveTutorials(221);
                TutorailsManager.getInstance().saveTutorials(222);
                TutorailsManager.getInstance().saveTutorials(223);
                TutorailsManager.getInstance().saveTutorials(224);
                LevelManager.getInstance().finish_level = 20;
            }
        }
    }

    // showRemainTime()
    // {
    //     if(GameData.getInstance().nEnergy<GameData.getInstance().getMaxEnergy())
    //     {
    //         this.remain_label.node.active=true;
    //         let prevT=GameData.getInstance().getGetEnergyTime();
    //         let curT=new Date().getTime();
    //         let offsetTime=Math.floor((curT-prevT)/1000);
    //         let fen=Math.floor(offsetTime/60);
    //         if(fen>=5)
    //         {
    //             //算出有多少分
    //             let addEnergy=Math.floor(fen/5);
    //             GameData.getInstance().changeEnergy(addEnergy);
    //             GameData.getInstance().saveGetEnergyTime(prevT+addEnergy*5*60*1000);
    //             this.refreshEnergyShow();
    //         }
    //         let remainTime=5*60-offsetTime;
    //         fen=Math.floor(remainTime/60);
    //         let miao=remainTime%60;
    //         if(miao<10)
    //         {
    //             this.remain_label.string="0"+fen+":0"+miao;
    //         }else
    //         {
    //             this.remain_label.string="0"+fen+":"+miao;
    //         }
    //         //this.top_free.x=395;
    //     }else
    //     {
    //         this.remain_label.node.active=false;
    //         //this.top_free.x=355;
    //     }        
    // }

}
