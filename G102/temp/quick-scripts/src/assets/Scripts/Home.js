"use strict";
cc._RF.push(module, '70ab1B2xyFD543Bv75Yge9c', 'Home');
// Scripts/Home.ts

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
var CumulativeRecharges_1 = require("./AccumulatedRecharge/CumulativeRecharges");
var AdManager_1 = require("./Ads/AdManager");
var CoinPop_1 = require("./CoinPop");
var Constants_1 = require("./Constants");
var EquipConfig_1 = require("./Equipment/EquipConfig");
var EquipmentManager_1 = require("./Equipment/EquipmentManager");
var GameData_1 = require("./GameData");
var GameManager_1 = require("./GameManager");
var HeroManager_1 = require("./Hero/Data/HeroManager");
var HeroConfig_1 = require("./Hero/Game/HeroConfig");
var FunctionDefinition_1 = require("./JsonData/FunctionDefinition");
var PlayerLevelUp_1 = require("./JsonData/PlayerLevelUp");
var LevelManager_1 = require("./Level/LevelManager");
var MazeManager_1 = require("./Maze/MazeManager");
var FollowConstants_1 = require("./multiLanguage/FollowConstants");
var FollowManager_1 = require("./multiLanguage/FollowManager");
var LanguageManager_1 = require("./multiLanguage/LanguageManager");
var PayManager_1 = require("./Payment/PayManager");
var PropConfig_1 = require("./Prop/PropConfig");
var PropManager_1 = require("./Prop/PropManager");
var AudioConstants_1 = require("./Sound/AudioConstants");
var StorageConfig_1 = require("./Storage/StorageConfig");
var StorageManager_1 = require("./Storage/StorageManager");
var TaskEnum_1 = require("./Task/TaskEnum");
var TaskManager_1 = require("./Task/TaskManager");
var NumberLabel_1 = require("./Tools/NumberLabel");
var RewardSSUi_1 = require("./Tutorials/RewardSSUi");
var TutorailsManager_1 = require("./Tutorials/TutorailsManager");
var BagUi_1 = require("./UI/home/BagUi");
var MainUi_1 = require("./UI/home/MainUi");
var SettingUi_1 = require("./UI/home/SettingUi");
var SignUi_1 = require("./UI/home/SignUi");
var SignUiDaily_1 = require("./UI/home/SignUiDaily");
var UIConfig_1 = require("./UI/UIConfig");
var UIManager_1 = require("./UI/UIManager");
var UserData_1 = require("./UserData");
var WXManagerEX_1 = require("../startscene/WXManagerEX");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_selected_index = Constants_1.Btn_Index.Btn_Main;
        _this.all_ui = [];
        _this.btns = [];
        _this.names = [];
        return _this;
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
    Home_1 = Home;
    Home.prototype.onLoad = function () {
        this.adaptation();
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.登录X次游戏);
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.登录游戏1次);
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TodayIsFirstLogIn, 0) == 0) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TodayIsFirstLogIn, 1);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计登录X天);
        }
        //cc.debug.setDisplayStats(IsDebug);
        //HeroManager.getInstance().loadAllHeroData();
        AdManager_1.default.getInstance();
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
        MazeManager_1.MazeManager.getInstance().resetHeroBind();
    };
    Home.prototype.start = function () {
        cc.director.resume();
        // 拉取服务器时间
        GameData_1.default.getInstance().refreshServerTime();
        GameManager_1.default.getInstance().resetRate();
        // HttpManager.post(AccessName.updateUserInfo,this.getZongZhanLiJsonString());
        CumulativeRecharges_1.CumulativeRechargesManager.getInstance().refreshData();
        this.showLoading();
        GameManager_1.default.getInstance().music_manager.playMusic(AudioConstants_1.MusicIndex.BGM_Home);
        if (FollowManager_1.default.getInstance().getFirstDo(FollowConstants_1.Follow_Type.首次进入主页) <= 0) {
            FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.首次进入主页);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首次进入主页);
        }
        //ApkManager.getInstance().cheakDYInfo();
        var gm = GameManager_1.default.getInstance();
        if (GameData_1.default.getInstance().getIsSignToday() && TutorailsManager_1.default.getInstance().is_tutorails_state == false) {
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.QianDao))
                gm.game_to_home = Constants_1.Go_Type.Main_Sign;
        }
        else {
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.FirstCharge) && PayManager_1.PayManager.getInstance().getPayNum('c301') <= 0 && TutorailsManager_1.default.getInstance().is_tutorails_state == false) {
                // this.scheduleOnce(() => {
                //     UIManager.getInstance().showUiDialog(UIPath.FirstCharge, UILayerLevel.One, {
                //         onCompleted: (uiNode) => {
                //             uiNode.getComponent(PayFirstChargeUi).init({
                //                 onClose: () => {
                //                     let mainUi = cc.find("Canvas/main_ui").getComponent(MainUi);
                //                     mainUi.refreshLeft();
                //                 }
                //             });
                //         },
                //     });
                // }, 1)
            }
        }
        //根据game_to_home设置显示的界面
        this.showUi();
        this.initTop();
        this.showAvatar();
        // PropManager.getInstance().changePropNum(PropId.Gem,-200);
        // PropManager.getInstance().changePropNum(PropId.Coin,2000);
    };
    Home.prototype.checkTutorails = function () {
        if (!TutorailsManager_1.default.getInstance().is_finish) { //跳转到商场
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
            if (TutorailsManager_1.default.getInstance().isShowTutorials(301) == false && TutorailsManager_1.default.getInstance().isShowTutorials(302)) {
                //218完成显示
                //升级引导
                TutorailsManager_1.default.getInstance().is_tutorails_state = true;
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Role;
                return true;
            }
            else if (TutorailsManager_1.default.getInstance().isShowTutorials(311) == false && TutorailsManager_1.default.getInstance().isShowTutorials(312)) {
                //显示英雄页
                TutorailsManager_1.default.getInstance().is_tutorails_state = true;
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Role;
                return true;
            }
            else {
                if (LevelManager_1.LevelManager.getInstance().finish_level >= 5 && TutorailsManager_1.default.getInstance().isShowTutorials(205)) {
                    this.scheduleOnce(function () {
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardSSUI, UIConfig_1.UILayerLevel.Two, {
                            onCompleted: function (uiNode) {
                                uiNode.getComponent(RewardSSUi_1.default).initData(1);
                            }
                        });
                    }, 0.5);
                }
            }
        }
        return false;
    };
    Home.prototype.cheakUnlock = function () {
        var btnCity = cc.find('Canvas/Top_Ui/down/btnCity');
        // btnCity.getChildByName('lock').active=!FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_City);
        var btnFuBen = cc.find('Canvas/Top_Ui/down/btnFuBen');
        // btnFuBen.getChildByName('lock').active=!FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen);
        var btnPet = cc.find('Canvas/Top_Ui/down/btnPet');
        // if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChongWuXiTong)){
        //     let btnPet=cc.find('Canvas/Top_Ui/down/btnPet');
        //     btnPet.getChildByName("lock").active = false;
        // }
    };
    Home.prototype.showLoading = function () {
        var _this = this;
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        var loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        loadingBar.progress = GameManager_1.default.getInstance().cur_load_progress;
        loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
        GameManager_1.default.getInstance().init(Constants_1.GameScene.home);
        var loadingSchedule = function () {
            loadingBar.progress += 0.01;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            if (loadingBar.progress >= 1) {
                loadingBar.progress = 1;
                if (GameManager_1.default.getInstance().is_loaded) {
                    bgLoading.active = false;
                    _this.unschedule(loadingSchedule);
                    loadingSchedule = null;
                }
            }
        };
        this.schedule(loadingSchedule, 0.02);
    };
    Home.prototype.adaptation = function () {
        //上下模块        
        var topUi = cc.find('Canvas/Top_Ui');
        var down = topUi.getChildByName('down');
        var top = topUi.getChildByName('top');
        var offsetY = top.y;
        var wp = cc.winSize;
        down.y = -wp.height / 2 + down.height / 2;
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            top.y = wp.height / 2 - top.height / 2 - 90;
        }
        else {
            top.y = wp.height / 2 - top.height / 2;
        }
        offsetY = top.y - offsetY;
        //开始按钮
        var mainUi = cc.find('Canvas/main_ui');
        var btnStart = mainUi.getChildByName('btnStart');
        var Main_Icon_Map = mainUi.getChildByName('Main_Icon_Map');
        Main_Icon_Map.y = down.y + 150;
        var mainTask = mainUi.getChildByName('mainTask');
        mainTask.y = down.y + 290;
        var mainTaskEffect = mainUi.getChildByName('mainTaskEffect');
        mainTaskEffect.y = down.y + 290;
        var Main_Icon_Idle = mainUi.getChildByName('Main_Icon_Idle');
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
    };
    Home.prototype.setBtnShow = function () {
        //如果当前的index是主城，需要提前判断一下主城是否有解锁的功能
        var newIndex = -1;
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlockIndex(this.cur_selected_index)) {
            newIndex = Constants_1.Btn_Index.Btn_Main;
        }
        if (this.cur_selected_index == newIndex) {
            return;
        }
        if (this.cur_selected_index == 0) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主城打开次数);
        }
        //let down=cc.find('Canvas/Top_Ui/down');
        for (var i = 0; i < 5; i++) {
            var btn = this.btns[i];
            var btns = btn.getComponents(cc.Button);
            var isCanBtn = this.cur_selected_index != i;
            //this.all_ui[i].active=!isCanBtn;
            this.all_ui[i].opacity = isCanBtn ? 0 : 255;
            this.all_ui[i].x = isCanBtn ? -1280 : 0;
            this.names[i].color = isCanBtn ? cc.color(210, 184, 145) : cc.color(255, 233, 201);
            this.btns[i].getChildByName('bg').active = !isCanBtn;
            for (var n = 0; n < btns.length; n++) {
                btns[n].interactable = isCanBtn;
            }
        }
    };
    Home.prototype.initTop = function () {
        var top = cc.find('Canvas/Top_Ui/top');
        var levelLabel = top.getChildByName('levelLabel');
        var level = UserData_1.default.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = '' + level;
        top.getChildByName("name").getComponent(cc.Label).string = UserData_1.default.getInstance().getUserName();
        top.getChildByName("atk").getComponent(cc.Label).string = HeroManager_1.HeroManager.getInstance().getAllHeroZhanli() + '';
        var btnAvatar = top.getChildByName('headPortrait').getChildByName('btnAvatar');
        var avatarIndex = UserData_1.default.getInstance().getUserAvatar();
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(avatarIndex);
        //进度
        var curExp = UserData_1.default.getInstance().getUserExp();
        var maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = curExp / maxExp;
        if (Constants_1.IsDebug && curExp / maxExp >= 1 && TutorailsManager_1.default.getInstance().is_tutorails_state == false) {
            // UIManager.getInstance().showUserLevelUi();
            //UIManager.getInstance().showUiDialog(UIPath.UserLevel,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        }
        //COIN
        var coinLabel = cc.find('Canvas/Top_Ui/top/coinLabel');
        coinLabel.getComponent(NumberLabel_1.default).init(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin), true);
        //是否需要加K显示
        //Gem
        var gemLabel = cc.find('Canvas/Top_Ui/top/gemLabel');
        gemLabel.getComponent(NumberLabel_1.default).init(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem), true);
        //龙晶
        var crystalLabel = cc.find('Canvas/Top_Ui/top/crystalLabel');
        crystalLabel.getComponent(NumberLabel_1.default).init(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.LongJing), true);
        //战力
        var zhanliLabel = cc.find('Canvas/Top_Ui/top/zhanliLabel');
        zhanliLabel.getComponent(NumberLabel_1.default).init(HeroManager_1.HeroManager.getInstance().getAllHeroZhanli(), false);
    };
    Home.prototype.refreshTop = function () {
        var top = cc.find('Canvas/Top_Ui/top');
        var levelLabel = top.getChildByName('levelLabel');
        var level = UserData_1.default.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = '' + level;
        top.getChildByName("name").getComponent(cc.Label).string = UserData_1.default.getInstance().getUserName();
        top.getChildByName("atk").getComponent(cc.Label).string = HeroManager_1.HeroManager.getInstance().getAllHeroZhanli() + '';
        var btnAvatar = top.getChildByName('headPortrait').getChildByName('btnAvatar');
        var avatarIndex = UserData_1.default.getInstance().getUserAvatar();
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(avatarIndex);
        //进度
        var curExp = UserData_1.default.getInstance().getUserExp();
        var maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = curExp / maxExp;
        if (Constants_1.IsDebug && curExp / maxExp >= 1) {
            //UIManager.getInstance().showUiDialog(UIPath.UserLevel,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        }
        //COIN
        this.refreshCoinShow();
        //是否需要加K显示
        //Gem
        this.refreshGemShow();
        //战力
        this.refreshZhanLiShow();
    };
    Home.prototype.refreshCoinShow = function () {
        var coinLabel = cc.find('Canvas/Top_Ui/top/coinLabel');
        coinLabel.getComponent(NumberLabel_1.default).setTarget(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin), 0.5);
        return coinLabel;
    };
    Home.prototype.refreshGemShow = function () {
        var gemLabel = cc.find('Canvas/Top_Ui/top/gemLabel');
        gemLabel.getComponent(NumberLabel_1.default).setTarget(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem), 0.5);
        return gemLabel;
    };
    Home.prototype.refreshZhanLiShow = function () {
        var zhanliLabel = cc.find('Canvas/Top_Ui/top/zhanliLabel');
        zhanliLabel.getComponent(NumberLabel_1.default).setTarget(HeroManager_1.HeroManager.getInstance().getAllHeroZhanli(), 0.5, true);
    };
    Home.prototype.refreshLongJing = function () {
        //龙晶
        var crystalLabel = cc.find('Canvas/Top_Ui/top/crystalLabel');
        crystalLabel.getComponent(NumberLabel_1.default).init(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.LongJing), true);
    };
    Home.prototype.refreshUserExp = function () {
        var top = cc.find('Canvas/Top_Ui/top');
        var levelLabel = top.getChildByName('levelLabel');
        var level = UserData_1.default.getInstance().getUserLevel();
        levelLabel.getComponent(cc.Label).string = 'Lv.' + level;
        //进度
        var curExp = UserData_1.default.getInstance().getUserExp();
        var maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        var pp = curExp / maxExp;
        top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress = pp;
    };
    Home.prototype.jumoToUi = function (index) {
        this.cur_selected_index = index;
        this.setBtnShow();
    };
    Home.prototype.showAvatar = function () {
        var top = cc.find('Canvas/Top_Ui/top');
        var icon = top.getChildByName('btnSetting').getChildByName('icon');
        var avatarIndex = UserData_1.default.getInstance().getUserAvatar();
        icon.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + avatarIndex);
        var userNameLabel = top.getChildByName('userNameLabel');
        userNameLabel.getComponent(cc.Label).string = UserData_1.default.getInstance().getUserName();
        if (Constants_1.IsDebug) {
            //PropManager.getInstance().changePropNum(PropId.Gem,-750000);
        }
        // HeroManager.getInstance().addHero(Hero_Type.PaoShou);
        // HeroManager.getInstance().addHero(Hero_Type.ShouWang);
        // HeroManager.getInstance().addHero(Hero_Type.DeLuYi);
        // HeroManager.getInstance().addHero(Hero_Type.LeiShen);
        // HeroManager.getInstance().addHero(Hero_Type.GongJianShou);
        // [{"hero_type":2,"hero_level":1,"hero_quality":2,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":3,"hero_level":1,"hero_quality":2,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":4,"hero_level":1,"hero_quality":3,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":12,"hero_level":1,"hero_quality":5,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1},{"hero_type":8,"hero_level":1,"hero_quality":4,"hero_stage":0,"pet_info":null,"exclusive_equip_level":-1}]
    };
    Home.prototype.showUi = function () {
        var gm = GameManager_1.default.getInstance();
        var um = UIManager_1.UIManager.getInstance();
        switch (gm.game_to_home) {
            case Constants_1.Go_Type.Main:
                {
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_Main;
                }
                break;
            case Constants_1.Go_Type.Main_Sign:
                {
                    //this.cur_selected_index=Btn_Index.Btn_Main;
                    this.scheduleOnce(function () {
                        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.CanSignIn, 0) == 0) {
                            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 0) == 0) {
                                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignIn, UIConfig_1.UILayerLevel.One, {
                                    onCompleted: function (uiNode) {
                                        uiNode.getComponent(SignUi_1.default).init(null);
                                    },
                                });
                            }
                            else {
                                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInDaily, UIConfig_1.UILayerLevel.One, {
                                    onCompleted: function (uiNode) {
                                        uiNode.getComponent(SignUiDaily_1.default).init(null);
                                    },
                                });
                            }
                        }
                    }, 1);
                    this.node.getChildByName('main_ui').getComponent(MainUi_1.default).refreshLeft();
                }
                break;
            case Constants_1.Go_Type.Main_Spin:
                {
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_Main;
                    // this.scheduleOnce(()=>{
                    //     um.showSpinUi({onClose:()=>{
                    //     }});
                    // },1);
                    this.node.getChildByName('main_ui').getComponent(MainUi_1.default).refreshRight();
                }
                break;
            case Constants_1.Go_Type.Main_Task:
                {
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_Main;
                    this.scheduleOnce(function () {
                        um.showUiDialog(UIConfig_1.UIPath.Task, UIConfig_1.UILayerLevel.One, {
                            onCompleted: function (uiNode) {
                                // uiNode.getComponent(TaskUi).init(null); 
                            },
                        });
                    }, 1);
                    this.node.getChildByName('main_ui').getComponent(MainUi_1.default).refreshLeft();
                }
                break;
            case Constants_1.Go_Type.Main_Rank:
                {
                    // this.cur_selected_index=Btn_Index.Btn_Main;
                    // this.scheduleOnce(()=>{
                    //     um.showRankUi();
                    // },1);
                    // this.node.getChildByName('main_ui').getComponent(MainUi).refreshRight();
                }
                break;
            case Constants_1.Go_Type.Role:
                this.cur_selected_index = Constants_1.Btn_Index.Btn_Role;
                break;
            case Constants_1.Go_Type.PetList:
                this.cur_selected_index = Constants_1.Btn_Index.Btn_Pet;
                break;
            case Constants_1.Go_Type.City:
                {
                    //if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChengBaoYangCheng)){
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_City;
                    // let cultivateUi=this.node.getChildByName('cultivate_ui').getComponent(CultivateUi);
                    // cultivateUi.is_hint_state=true;
                    //cultivateUi.cur_selected_index=0;
                    //cultivateUi.setBtnShow();
                    //}
                }
                break;
            case Constants_1.Go_Type.Activity:
                {
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_FuBen;
                }
                break;
            case Constants_1.Go_Type.Activity_Endless:
                {
                    // console.log("+++++++++无尽确认按钮退出来")
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_FuBen;
                }
                break;
            case Constants_1.Go_Type.Activity_Boss:
                {
                    this.cur_selected_index = Constants_1.Btn_Index.Btn_FuBen;
                }
                break;
        }
        this.setBtnShow();
    };
    Home.prototype.clickBtnDown = function (btn, index) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // Number(index) == 3 || 
        // if(Number(index) == 4){
        //     let s = LanguageManager.getInstance().getStrByTextId(100113);
        //     GameManager.getInstance().showMessage(s);
        //     return;
        // }
        this.cur_selected_index = parseInt(index);
        if (this.cur_selected_index == 4) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.副本页面展示次数);
        }
        this.setBtnShow();
    };
    Home.prototype.clickBtnCoin = function () {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
            },
        });
        var gm = GameManager_1.default.getInstance();
        gm.sound_manager.playSound(AudioConstants_1.SoundIndex.click);
    };
    Home.prototype.clickBtnGem = function () {
        // UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.One,{onCompleted:(uiNode)=> {
        //     uiNode.getComponent(CoinPop).initUi(PropId.Gem)
        // },});
        var gm = GameManager_1.default.getInstance();
        gm.sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (cc.find('Canvas').getComponent(Home_1).cur_selected_index == Constants_1.Btn_Index.Btn_City) {
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
            GameManager_1.default.getInstance().jumoAndShowUi();
            UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
            return;
        }
        else {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.One, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                },
            });
        }
    };
    Home.prototype.clickBtnSetting = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Set, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(SettingUi_1.default).init({
                    onClose: function () {
                        _this.showAvatar();
                    },
                });
            },
        });
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
    };
    Home.prototype.clickBtnCityLock = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlockIndex(Constants_1.Btn_Index.Btn_City) == false) {
            var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.XuYuanChi);
            var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.XuYuanChi);
            if (type == 1) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + num);
            }
            else if (type == 2) {
                var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                var str = textStr.replace('~', '' + num);
                GameManager_1.default.getInstance().showMessage(str);
            }
        }
    };
    Home.prototype.clickBtnActivityLock = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlockIndex(Constants_1.Btn_Index.Btn_FuBen) == false) {
            var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.WuJinTiaoZhan);
            var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.WuJinTiaoZhan);
            if (type == 1) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + num);
            }
            else if (type == 2) {
                var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                var str = textStr.replace('~', '' + num);
                GameManager_1.default.getInstance().showMessage(str);
            }
        }
    };
    Home.prototype.clickBtnPetLock = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlockIndex(Constants_1.Btn_Index.Btn_Pet) == false) {
            var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.ChongWuXiTong);
            var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.ChongWuXiTong);
            if (type == 1) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + num);
            }
            else if (type == 2) {
                var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                var str = textStr.replace('~', '' + num);
                GameManager_1.default.getInstance().showMessage(str);
            }
        }
    };
    Home.prototype.clickBtnLevelLabel = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(310002), 3);
    };
    Home.prototype.clickBtnBag = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // UIManager.getInstance().showBagUi(null);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Bag, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(BagUi_1.default).init(null);
            },
        });
    };
    Home.prototype.dataTest = function () {
        if (Constants_1.IsDebug) {
            if (FollowManager_1.default.getInstance().getFirstDo(FollowConstants_1.Follow_Type.Load页展示总次数) <= 0) {
                FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.Load页展示总次数);
                var em = EquipmentManager_1.EquipmentManager.getInstance();
                for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
                    for (var h = HeroConfig_1.Hero_Type.ChangMaoShou; h < HeroConfig_1.Hero_Type.Hero_Num; h++) {
                    }
                }
                var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
                for (var i = 0; i < heroList.length; i++) {
                    // HeroManager.getInstance().saveHeroQuality(i,36);
                    // HeroManager.getInstance().saveHeroLevel(i,160);
                }
                TutorailsManager_1.default.getInstance().saveTutorials(201);
                TutorailsManager_1.default.getInstance().saveTutorials(202);
                TutorailsManager_1.default.getInstance().saveTutorials(203);
                TutorailsManager_1.default.getInstance().saveTutorials(204);
                TutorailsManager_1.default.getInstance().saveTutorials(205);
                TutorailsManager_1.default.getInstance().saveTutorials(206);
                TutorailsManager_1.default.getInstance().saveTutorials(207);
                TutorailsManager_1.default.getInstance().saveTutorials(208);
                TutorailsManager_1.default.getInstance().saveTutorials(209);
                TutorailsManager_1.default.getInstance().saveTutorials(210);
                TutorailsManager_1.default.getInstance().saveTutorials(211);
                TutorailsManager_1.default.getInstance().saveTutorials(212);
                TutorailsManager_1.default.getInstance().saveTutorials(213);
                TutorailsManager_1.default.getInstance().saveTutorials(214);
                TutorailsManager_1.default.getInstance().saveTutorials(215);
                TutorailsManager_1.default.getInstance().saveTutorials(216);
                TutorailsManager_1.default.getInstance().saveTutorials(217);
                TutorailsManager_1.default.getInstance().saveTutorials(218);
                TutorailsManager_1.default.getInstance().saveTutorials(219);
                TutorailsManager_1.default.getInstance().saveTutorials(220);
                TutorailsManager_1.default.getInstance().saveTutorials(221);
                TutorailsManager_1.default.getInstance().saveTutorials(222);
                TutorailsManager_1.default.getInstance().saveTutorials(223);
                TutorailsManager_1.default.getInstance().saveTutorials(224);
                LevelManager_1.LevelManager.getInstance().finish_level = 20;
            }
        }
    };
    var Home_1;
    __decorate([
        property([cc.Node])
    ], Home.prototype, "all_ui", void 0);
    __decorate([
        property([cc.Node])
    ], Home.prototype, "btns", void 0);
    __decorate([
        property([cc.Node])
    ], Home.prototype, "names", void 0);
    Home = Home_1 = __decorate([
        ccclass
    ], Home);
    return Home;
}(cc.Component));
exports.default = Home;

cc._RF.pop();