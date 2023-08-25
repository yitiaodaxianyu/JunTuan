
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Home.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.One, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
            },
        });
        // if (cc.find('Canvas').getComponent(Home).cur_selected_index == Btn_Index.Btn_City) {
        //     cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
        //     GameManager.getInstance().game_to_home = Go_Type.City;
        //     GameManager.getInstance().jumoAndShowUi();
        //     UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
        //     return;
        // } else {
        //     UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.One, {
        //         onCompleted: (uiNode) => {
        //             uiNode.getComponent(CoinPop).initUi(PropId.Gem)
        //         },
        //     });
        // }
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
    __decorate([
        property([cc.Node])
    ], Home.prototype, "all_ui", void 0);
    __decorate([
        property([cc.Node])
    ], Home.prototype, "btns", void 0);
    __decorate([
        property([cc.Node])
    ], Home.prototype, "names", void 0);
    Home = __decorate([
        ccclass
    ], Home);
    return Home;
}(cc.Component));
exports.default = Home;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpRkFBdUY7QUFHdkYsNkNBQXdDO0FBRXhDLHFDQUFnQztBQUNoQyx5Q0FBeUY7QUFFekYsdURBQThEO0FBQzlELGlFQUFnRTtBQUNoRSx1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCxxREFBbUQ7QUFHbkQsb0VBQTBFO0FBRTFFLDBEQUFnRTtBQUNoRSxxREFBb0Q7QUFDcEQsa0RBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBRTlELG1EQUFrRDtBQUNsRCxnREFBMkM7QUFDM0Msa0RBQWlEO0FBRWpELHlEQUFnRTtBQUNoRSx5REFBcUQ7QUFDckQsMkRBQTZEO0FBRzdELDRDQUEyQztBQUMzQyxrREFBNkM7QUFHN0MsbURBQThDO0FBRTlDLHFEQUFnRDtBQUNoRCxpRUFBNEQ7QUFDNUQseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLHFEQUFnRDtBQUVoRCwwQ0FBcUQ7QUFDckQsNENBQTJDO0FBQzNDLHVDQUFrQztBQUVsQyx5REFBb0Q7QUFFOUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE2dEJDO1FBM3RCRyx3QkFBa0IsR0FBYyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztRQUVuRCxZQUFNLEdBQWMsRUFBRSxDQUFDO1FBRXZCLFVBQUksR0FBYyxFQUFFLENBQUM7UUFFckIsV0FBSyxHQUFjLEVBQUUsQ0FBQzs7UUFrckJ0QixtQkFBbUI7UUFDbkIsSUFBSTtRQUNKLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsOENBQThDO1FBQzlDLCtEQUErRDtRQUMvRCx5Q0FB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QUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2FBQ2hEO1NBQ0o7SUFDTCxDQUFDO0lBcHJCRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDRztJQUV2QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztzQ0FDQztJQUVyQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt1Q0FDRTtJQVJMLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0E2dEJ4QjtJQUFELFdBQUM7Q0E3dEJELEFBNnRCQyxDQTd0QmlDLEVBQUUsQ0FBQyxTQUFTLEdBNnRCN0M7a0JBN3RCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi9BY2N1bXVsYXRlZFJlY2hhcmdlL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIsIENoYWxsZW5nZU1vZGUgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4vQ29pblBvcFwiO1xyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEZ1bmNUeXBlLCBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHb19UeXBlLCBJc0RlYnVnIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgQ29zdERhdGEsIEVxdWlwVHlwZSB9IGZyb20gXCIuL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSGVyb0xpc3RVaSBmcm9tIFwiLi9IZXJvL1VpL0hlcm9MaXN0VWlcIjtcclxuaW1wb3J0IFJvbGVVaSBmcm9tIFwiLi9IZXJvL1VpL1JvbGVVaVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFJld2FyZEhlcm9EYXRhIH0gZnJvbSBcIi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBQbGF5ZXJMZXZlbFVwTWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL1BsYXllckxldmVsVXBcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuL1JhbmtpbmdMaXN0L1JhbmtpbmdMaXN0XCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEYWlseVNob3BNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmUvRGFpbHlTaG9wXCI7XHJcbmltcG9ydCBTdG9yZUhlcm9VaSBmcm9tIFwiLi9TdG9yZS9TdG9yZUhlcm9VaVwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi9UYXNrL1Rhc2tVaVwiO1xyXG5pbXBvcnQgeyBQYXlVaUluZGV4IH0gZnJvbSBcIi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCBOdW1iZXJMYWJlbCBmcm9tIFwiLi9Ub29scy9OdW1iZXJMYWJlbFwiO1xyXG5pbXBvcnQgVHVybXRhYmxlIGZyb20gXCIuL1R1cm50YWJsZS9UdXJtdGFibGVcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4vVHV0b3JpYWxzL1Jld2FyZFNTVWlcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEJhZ1VpIGZyb20gXCIuL1VJL2hvbWUvQmFnVWlcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgU2V0dGluZ1VpIGZyb20gXCIuL1VJL2hvbWUvU2V0dGluZ1VpXCI7XHJcbmltcG9ydCBTaWduVWkgZnJvbSBcIi4vVUkvaG9tZS9TaWduVWlcIjtcclxuaW1wb3J0IFNpZ25VaURhaWx5IGZyb20gXCIuL1VJL2hvbWUvU2lnblVpRGFpbHlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9VSS9ob21lL1RvUGxheU1haW5VaVwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFZpcFN5c3RlbSBmcm9tIFwiLi9WaXBTeXN0ZW0vVmlwU3lzdGVtXCI7XHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGN1cl9zZWxlY3RlZF9pbmRleDogQnRuX0luZGV4ID0gQnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIGFsbF91aTogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgYnRuczogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgbmFtZXM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLueZu+W9lVjmrKHmuLjmiI8pO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u55m75b2V5ri45oiPMeasoSk7XHJcbiAgICAgICAgaWYgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG9kYXlJc0ZpcnN0TG9nSW4sIDApID09IDApIHtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG9kYXlJc0ZpcnN0TG9nSW4sIDEpXHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6h55m75b2VWOWkqSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzKElzRGVidWcpO1xyXG4gICAgICAgIC8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkQWxsSGVyb0RhdGEoKTtcclxuICAgICAgICBBZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvL0Fwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbmRyb2lkSWQoKTtcclxuICAgICAgICAvL+ajgOa1i+aYr+WQpuacieaVmeeoi1xyXG4gICAgICAgIHRoaXMuY2hlY2tUdXRvcmFpbHMoKTtcclxuICAgICAgICB0aGlzLmNoZWFrVW5sb2NrKCk7XHJcbiAgICAgICAgLy90aGlzLmRhdGFUZXN0KCk7XHJcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmICh3aW5kb3cudkNvbnNvbGUpIHtcclxuICAgICAgICAvLyAgICAgd2luZG93LnZDb25zb2xlLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyAgICAgd2luZG93LnZDb25zb2xlID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB9LCAxMDAwKTtcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0SGVyb0JpbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyDmi4nlj5bmnI3liqHlmajml7bpl7RcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hTZXJ2ZXJUaW1lKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldFJhdGUoKTtcclxuICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5nZXRab25nWmhhbkxpSnNvblN0cmluZygpKTtcclxuICAgICAgICBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fSG9tZSk7XHJcbiAgICAgICAgaWYgKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoei/m+WFpeS4u+mhtSkgPD0gMCkge1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXkuLvpobUpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Li76aG1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWFrRFlJbmZvKCk7XHJcbiAgICAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZiAoR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRJc1NpZ25Ub2RheSgpICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5RaWFuRGFvKSlcclxuICAgICAgICAgICAgICAgIGdtLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuTWFpbl9TaWduO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuRmlyc3RDaGFyZ2UpICYmIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2MzMDEnKSA8PSAwICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5VaSA9IGNjLmZpbmQoXCJDYW52YXMvbWFpbl91aVwiKS5nZXRDb21wb25lbnQoTWFpblVpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWFpblVpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5qC55o2uZ2FtZV90b19ob21l6K6+572u5pi+56S655qE55WM6Z2iXHJcbiAgICAgICAgdGhpcy5zaG93VWkoKTtcclxuICAgICAgICB0aGlzLmluaXRUb3AoKTtcclxuICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtMjAwKTtcclxuICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sMjAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBjaGVja1R1dG9yYWlscygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2gpIHsgICAvL+i3s+i9rOWIsOWVhuWculxyXG4gICAgICAgICAgICAvLyBsZXQgZmluaXNoTGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgICAgICAvLyBpZihmaW5pc2hMZXZlbDw1KXtcclxuICAgICAgICAgICAgLy8gICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjIyKSYmZmluaXNoTGV2ZWw+PTMpXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/mlZnnqItcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/lvLrliLbmmL7npLrllYbln47pobVcclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGJ0blN0YXJ0PWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpL2J0blN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHdvcmRQb3M9YnRuU3RhcnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5TdGFydC5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsb2NhbFBvcy54LT1jYy5maW5kKCdDYW52YXMvbWFpbl91aScpLng7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAxLG51bGwsKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSx0cnVlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIH0gICAgIFxyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSkgPT0gZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAvLzIxOOWujOaIkOaYvuekulxyXG4gICAgICAgICAgICAgICAgLy/ljYfnuqflvJXlr7xcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLlJvbGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMSkgPT0gZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTIpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuiLsembhOmhtVxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuUm9sZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCA+PSA1ICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA1KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLCBVSUxheWVyTGV2ZWwuVHdvLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDAuNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVha1VubG9jaygpIHtcclxuICAgICAgICBsZXQgYnRuQ2l0eSA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvZG93bi9idG5DaXR5Jyk7XHJcbiAgICAgICAgLy8gYnRuQ2l0eS5nZXRDaGlsZEJ5TmFtZSgnbG9jaycpLmFjdGl2ZT0hRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9DaXR5KTtcclxuXHJcbiAgICAgICAgbGV0IGJ0bkZ1QmVuID0gY2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0bkZ1QmVuJyk7XHJcbiAgICAgICAgLy8gYnRuRnVCZW4uZ2V0Q2hpbGRCeU5hbWUoJ2xvY2snKS5hY3RpdmU9IUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pO1xyXG4gICAgICAgIGxldCBidG5QZXQgPSBjYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuUGV0Jyk7XHJcbiAgICAgICAgLy8gaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpKXtcclxuICAgICAgICAvLyAgICAgbGV0IGJ0blBldD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuUGV0Jyk7XHJcbiAgICAgICAgLy8gICAgIGJ0blBldC5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9hZGluZygpIHtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0JhciA9IGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWwgPSBsb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2xvYWRfcHJvZ3Jlc3M7XHJcbiAgICAgICAgbG9hZExhYmVsLnN0cmluZyA9IChsb2FkaW5nQmFyLnByb2dyZXNzICogMTAwKS50b0ZpeGVkKDApICsgJyUnO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdChHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdTY2hlZHVsZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyArPSAwLjAxO1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nID0gKGxvYWRpbmdCYXIucHJvZ3Jlc3MgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgICAgIGlmIChsb2FkaW5nQmFyLnByb2dyZXNzID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUobG9hZGluZ1NjaGVkdWxlLCAwLjAyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKSB7XHJcbiAgICAgICAgLy/kuIrkuIvmqKHlnZcgICAgICAgIFxyXG4gICAgICAgIGxldCB0b3BVaSA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWknKTtcclxuICAgICAgICBsZXQgZG93biA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCdkb3duJyk7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRvcFVpLmdldENoaWxkQnlOYW1lKCd0b3AnKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IHRvcC55O1xyXG4gICAgICAgIGxldCB3cCA9IGNjLndpblNpemU7XHJcbiAgICAgICAgZG93bi55ID0gLXdwLmhlaWdodCAvIDIgKyBkb3duLmhlaWdodCAvIDI7XHJcbiAgICAgICAgaWYgKFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuc3RhdHVzQmFySGVpZ2h0ID4gMjApIHtcclxuICAgICAgICAgICAgdG9wLnkgPSB3cC5oZWlnaHQgLyAyIC0gdG9wLmhlaWdodCAvIDIgLSA5MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b3AueSA9IHdwLmhlaWdodCAvIDIgLSB0b3AuaGVpZ2h0IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZnNldFkgPSB0b3AueSAtIG9mZnNldFk7XHJcbiAgICAgICAgLy/lvIDlp4vmjInpkq5cclxuICAgICAgICBsZXQgbWFpblVpID0gY2MuZmluZCgnQ2FudmFzL21haW5fdWknKTtcclxuICAgICAgICBsZXQgYnRuU3RhcnQgPSBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ2J0blN0YXJ0Jyk7XHJcbiAgICAgICAgbGV0IE1haW5fSWNvbl9NYXAgPSBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ01haW5fSWNvbl9NYXAnKTtcclxuICAgICAgICBNYWluX0ljb25fTWFwLnkgPSBkb3duLnkgKyAxNTA7XHJcbiAgICAgICAgbGV0IG1haW5UYXNrID0gbWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFzaycpO1xyXG4gICAgICAgIG1haW5UYXNrLnkgPSBkb3duLnkgKyAyOTA7XHJcbiAgICAgICAgbGV0IG1haW5UYXNrRWZmZWN0ID0gbWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFza0VmZmVjdCcpO1xyXG4gICAgICAgIG1haW5UYXNrRWZmZWN0LnkgPSBkb3duLnkgKyAyOTA7XHJcbiAgICAgICAgbGV0IE1haW5fSWNvbl9JZGxlID0gbWFpblVpLmdldENoaWxkQnlOYW1lKCdNYWluX0ljb25fSWRsZScpO1xyXG4gICAgICAgIE1haW5fSWNvbl9JZGxlLnkgPSBkb3duLnkgKyAxNTA7XHJcbiAgICAgICAgYnRuU3RhcnQueSA9IGRvd24ueSArIDE1MDtcclxuICAgICAgICBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bk9mZmxpbmVHaWZ0JykueSA9IGJ0blN0YXJ0LnkgKyA4MDtcclxuICAgICAgICAvL+S4u+eVjOmdolxyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpLnkgPSB0b3AueSAtIDIwODtcclxuICAgICAgICBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ3JpZ2h0JykueSA9IHRvcC55IC0gMjA4O1xyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKS55ICs9IG9mZnNldFk7XHJcbiAgICAgICAgLy/op5LoibLnlYzpnaJcclxuICAgICAgICAvLyBsZXQgcm9sZVVpPWNjLmZpbmQoJ0NhbnZhcy9yb2xlX3VpJyk7XHJcbiAgICAgICAgLy8gcm9sZVVpLnkrPW9mZnNldFk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0blNob3coKSB7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3nmoRpbmRleOaYr+S4u+Wfju+8jOmcgOimgeaPkOWJjeWIpOaWreS4gOS4i+S4u+WfjuaYr+WQpuacieino+mUgeeahOWKn+iDvVxyXG4gICAgICAgIGxldCBuZXdJbmRleCA9IC0xO1xyXG4gICAgICAgIGlmICghRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIG5ld0luZGV4ID0gQnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPT0gbmV3SW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li75Z+O5omT5byA5qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sZXQgZG93bj1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24nKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gdGhpcy5idG5zW2ldO1xyXG4gICAgICAgICAgICBsZXQgYnRucyA9IGJ0bi5nZXRDb21wb25lbnRzKGNjLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIGxldCBpc0NhbkJ0biA9IHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ICE9IGk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hbGxfdWlbaV0uYWN0aXZlPSFpc0NhbkJ0bjtcclxuICAgICAgICAgICAgdGhpcy5hbGxfdWlbaV0ub3BhY2l0eSA9IGlzQ2FuQnRuID8gMCA6IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5hbGxfdWlbaV0ueCA9IGlzQ2FuQnRuID8gLTEyODAgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVzW2ldLmNvbG9yID0gaXNDYW5CdG4gPyBjYy5jb2xvcigyMTAsIDE4NCwgMTQ1KSA6IGNjLmNvbG9yKDI1NSwgMjMzLCAyMDEpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bnNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gIWlzQ2FuQnRuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGJ0bnMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgIGJ0bnNbbl0uaW50ZXJhY3RhYmxlID0gaXNDYW5CdG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRvcCgpIHtcclxuICAgICAgICBsZXQgdG9wID0gY2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AnKTtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IHRvcC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgbGV2ZWw7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKSArICcnO1xyXG4gICAgICAgIGxldCBidG5BdmF0YXIgPSB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRQb3J0cmFpdCcpLmdldENoaWxkQnlOYW1lKCdidG5BdmF0YXInKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXggPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShhdmF0YXJJbmRleCk7XHJcbiAgICAgICAgLy/ov5vluqZcclxuICAgICAgICBsZXQgY3VyRXhwID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cCA9IFBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdleHBQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBjdXJFeHAgLyBtYXhFeHA7XHJcbiAgICAgICAgaWYgKElzRGVidWcgJiYgY3VyRXhwIC8gbWF4RXhwID49IDEgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VXNlckxldmVsVWkoKTtcclxuICAgICAgICAgICAgLy9VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlVzZXJMZXZlbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NPSU5cclxuICAgICAgICBsZXQgY29pbkxhYmVsID0gY2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvY29pbkxhYmVsJyk7XHJcbiAgICAgICAgY29pbkxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLCB0cnVlKTtcclxuICAgICAgICAvL+aYr+WQpumcgOimgeWKoEvmmL7npLpcclxuICAgICAgICAvL0dlbVxyXG4gICAgICAgIGxldCBnZW1MYWJlbCA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2dlbUxhYmVsJyk7XHJcbiAgICAgICAgZ2VtTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSwgdHJ1ZSk7XHJcbiAgICAgICAgLy/pvpnmmbZcclxuICAgICAgICBsZXQgY3J5c3RhbExhYmVsID0gY2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvY3J5c3RhbExhYmVsJyk7XHJcbiAgICAgICAgY3J5c3RhbExhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkxvbmdKaW5nKSwgdHJ1ZSk7XHJcbiAgICAgICAgLy/miJjliptcclxuICAgICAgICBsZXQgemhhbmxpTGFiZWwgPSBjYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC96aGFubGlMYWJlbCcpO1xyXG4gICAgICAgIHpoYW5saUxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUb3AoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wJyk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWwgPSB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJyArIGxldmVsO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiYXRrXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCkgKyAnJztcclxuICAgICAgICBsZXQgYnRuQXZhdGFyID0gdG9wLmdldENoaWxkQnlOYW1lKCdoZWFkUG9ydHJhaXQnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuQXZhdGFyJyk7XHJcbiAgICAgICAgbGV0IGF2YXRhckluZGV4ID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUoYXZhdGFySW5kZXgpO1xyXG4gICAgICAgIC8v6L+b5bqmXHJcbiAgICAgICAgbGV0IGN1ckV4cCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckV4cCgpO1xyXG4gICAgICAgIGxldCBtYXhFeHAgPSBQbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gY3VyRXhwIC8gbWF4RXhwO1xyXG4gICAgICAgIGlmIChJc0RlYnVnICYmIGN1ckV4cCAvIG1heEV4cCA+PSAxKSB7XHJcbiAgICAgICAgICAgIC8vVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Vc2VyTGV2ZWwsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7fSx9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9DT0lOXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAvL+aYr+WQpumcgOimgeWKoEvmmL7npLpcclxuICAgICAgICAvL0dlbVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAvL+aImOWKm1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFpoYW5MaVNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoQ29pblNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IGNvaW5MYWJlbCA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NvaW5MYWJlbCcpO1xyXG4gICAgICAgIGNvaW5MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLCAwLjUpO1xyXG4gICAgICAgIHJldHVybiBjb2luTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEdlbVNob3coKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IGdlbUxhYmVsID0gY2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvZ2VtTGFiZWwnKTtcclxuICAgICAgICBnZW1MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksIDAuNSk7XHJcbiAgICAgICAgcmV0dXJuIGdlbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2haaGFuTGlTaG93KCkge1xyXG4gICAgICAgIGxldCB6aGFubGlMYWJlbCA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL3poYW5saUxhYmVsJyk7XHJcbiAgICAgICAgemhhbmxpTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCksIDAuNSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaExvbmdKaW5nKCkge1xyXG4gICAgICAgIC8v6b6Z5pm2XHJcbiAgICAgICAgbGV0IGNyeXN0YWxMYWJlbCA9IGNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NyeXN0YWxMYWJlbCcpO1xyXG4gICAgICAgIGNyeXN0YWxMYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Mb25nSmluZyksIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVc2VyRXhwKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSBjYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsID0gdG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTGV2ZWwoKTtcclxuICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ0x2LicgKyBsZXZlbDtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHAgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJFeHAoKTtcclxuICAgICAgICBsZXQgbWF4RXhwID0gUGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTtcclxuICAgICAgICBsZXQgcHAgPSBjdXJFeHAgLyBtYXhFeHA7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdleHBQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBwcDtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vVG9VaShpbmRleDogQnRuX0luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QXZhdGFyKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSBjYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBpY29uID0gdG9wLmdldENoaWxkQnlOYW1lKCdidG5TZXR0aW5nJykuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXggPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICBpY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycgKyBhdmF0YXJJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCB1c2VyTmFtZUxhYmVsID0gdG9wLmdldENoaWxkQnlOYW1lKCd1c2VyTmFtZUxhYmVsJyk7XHJcbiAgICAgICAgdXNlck5hbWVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTtcclxuICAgICAgICBpZiAoSXNEZWJ1Zykge1xyXG4gICAgICAgICAgICAvL1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC03NTAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oSGVyb19UeXBlLlBhb1Nob3UpO1xyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuU2hvdVdhbmcpO1xyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuRGVMdVlpKTtcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oSGVyb19UeXBlLkxlaVNoZW4pO1xyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuR29uZ0ppYW5TaG91KTtcclxuICAgICAgICAvLyBbe1wiaGVyb190eXBlXCI6MixcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6MixcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjMsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjIsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfSx7XCJoZXJvX3R5cGVcIjo0LFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjozLFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX0se1wiaGVyb190eXBlXCI6MTIsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjUsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfSx7XCJoZXJvX3R5cGVcIjo4LFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjo0LFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX1dXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VpKCkge1xyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHVtID0gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoIChnbS5nYW1lX3RvX2hvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW46IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID0gQnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TaWduOiB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW4sIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbkRhaWx5LCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWlEYWlseSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTGVmdCgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TcGluOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9IEJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdW0uc2hvd1NwaW5VaSh7b25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1Rhc2s6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID0gQnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVGFzaywgVUlMYXllckxldmVsLk9uZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDogKHVpTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQobnVsbCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTGVmdCgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9SYW5rOiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVtLnNob3dSYW5rVWkoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoUmlnaHQoKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLlJvbGU6IHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID0gQnRuX0luZGV4LkJ0bl9Sb2xlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLlBldExpc3Q6IHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID0gQnRuX0luZGV4LkJ0bl9QZXQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkNpdHk6IHtcclxuICAgICAgICAgICAgICAgIC8vaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkNoZW5nQmFvWWFuZ0NoZW5nKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9IEJ0bl9JbmRleC5CdG5fQ2l0eTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBjdWx0aXZhdGVVaT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2N1bHRpdmF0ZV91aScpLmdldENvbXBvbmVudChDdWx0aXZhdGVVaSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjdWx0aXZhdGVVaS5pc19oaW50X3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL2N1bHRpdmF0ZVVpLmN1cl9zZWxlY3RlZF9pbmRleD0wO1xyXG4gICAgICAgICAgICAgICAgLy9jdWx0aXZhdGVVaS5zZXRCdG5TaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkFjdGl2aXR5OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9IEJ0bl9JbmRleC5CdG5fRnVCZW47XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eV9FbmRsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK+aXoOWwveehruiupOaMiemSrumAgOWHuuadpVwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPSBCdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuQWN0aXZpdHlfQm9zczoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPSBCdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xpY2tCdG5Eb3duKGJ0bjogY2MuRXZlbnQuRXZlbnRUb3VjaCwgaW5kZXg6IHN0cmluZykge1xyXG5cclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBOdW1iZXIoaW5kZXgpID09IDMgfHwgXHJcbiAgICAgICAgLy8gaWYoTnVtYmVyKGluZGV4KSA9PSA0KXtcclxuICAgICAgICAvLyAgICAgbGV0IHMgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID0gcGFyc2VJbnQoaW5kZXgpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lia/mnKzpobXpnaLlsZXnpLrmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNvaW4oKSB7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuQ29pbilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZ20gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR2VtKCkge1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAvLyB9LH0pO1xyXG4gICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLCBVSUxheWVyTGV2ZWwuT25lLCB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGlmIChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSkuY3VyX3NlbGVjdGVkX2luZGV4ID09IEJ0bl9JbmRleC5CdG5fQ2l0eSkge1xyXG4gICAgICAgIC8vICAgICBjYy5maW5kKCdDYW52YXMvc3RvcmVfdWkvc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDIpO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAvLyAgICAgICAgIG9uQ29tcGxldGVkOiAodWlOb2RlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAvLyAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blNldHRpbmcoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW1MaXN0PVtdO1xyXG5cclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8OTsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oTWF0aC5yYW5kb20oKTwwLjU/MjAxMTA6MjAxMTAsNSk7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oMzA0MDUsNSk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1MaXN0KTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBwcm9wRGF0YXM9bmV3IEFycmF5PFByb3BPYmplY3Q+KCk7XHJcbiAgICAgICAgLy8gbGV0IHByb3BEYXRhPW5ldyBQcm9wT2JqZWN0KCk7XHJcbiAgICAgICAgLy8gcHJvcERhdGEuaXRlbXNJZD0xMDAwMlxyXG4gICAgICAgIC8vIHByb3BEYXRhLml0ZW1zTnVtPTEwMDAwMDtcclxuICAgICAgICAvLyBwcm9wRGF0YXMucHVzaChwcm9wRGF0YSk7XHJcbiAgICAgICAgLy8gLy8gbGV0IHByb3BEYXRhMT1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhMS5pdGVtc0lkPTEwMDA0XHJcbiAgICAgICAgLy8gLy8gcHJvcERhdGExLml0ZW1zTnVtPTMyO1xyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhcy5wdXNoKHByb3BEYXRhMSk7XHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5IdHRwQWRkUHJvcERhdGEocHJvcERhdGFzKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAxKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAyKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAzKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbEVxdWlwbWVudExpc3QoKTtcclxuICAgICAgICAvLyBsZXQgY29zdExpc3Q9bmV3IEFycmF5PENvc3REYXRhPigpO1xyXG4gICAgICAgIC8vIGxldCBpc0Nhbj1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tBRXF1aXBNZXJnZSgzMDMwNCxjb3N0TGlzdCk7XHJcbiAgICAgICAgLy8gaWYoaXNDYW4pe1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coSlNPTi5zdHJpbmdpZnkoY29zdExpc3QpKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTZXR0aW5nKHtcclxuICAgICAgICAvLyAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7XHJcbiAgICAgICAgLy8gICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WaXBTeXN0ZW0sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5pbmlVaSgpXHJcbiAgICAgICAgLy8gfSx9KTsvL+S8muWRmOezu+e7nyAgVklQ57O757ufXHJcbiAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhDaGFsbGVuZ2VNb2RlLk5vYW1hbCk7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtpbmdMaXN0KS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/mjpLooYzmppxcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/ovaznm5hcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TZXQsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2V0dGluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhDaGFsbGVuZ2VNb2RlLk5vYW1hbCk7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdFRvSXNzdWVkKFVSTF9UWVBFLnN1YlVzZXJJdGVtc051bSxKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgLy8gICAgIFwidWlkXCI6XCJaUjE2NDg2MDc0NzkwYTBcIiwgLy/nlKjmiLfmoIfor4ZpZFxyXG4gICAgICAgIC8vICAgICBcIml0ZW1Wb0xpc3RcIjpbXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJpdGVtc0lkXCI6MTAwMDEsIC8v6YGT5YW3aWRcclxuICAgICAgICAvLyAgICAgICAgICAgICBcIml0ZW1zTnVtXCI6LTIwIC8v5paw5aKe5oiW5YeP5bCR5pWw6YePXHJcbiAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNJZFwiOjEwMDA0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNOdW1cIjotMjBcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgXVxyXG4gICAgICAgIC8vIH0pLChkYXRhKT0+e1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvL1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3luY1Byb3BEYXRhKCk7XHJcblxyXG5cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWFwVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgIC8vIH19KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DaXR5TG9jaygpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmIChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0NpdHkpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuWHVZdWFuQ2hpKVxyXG4gICAgICAgICAgICBsZXQgbnVtID0gRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuWHVZdWFuQ2hpKVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkgKyBcIjpcIiArIG51bSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0gdGV4dFN0ci5yZXBsYWNlKCd+JywgJycgKyBudW0pXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BY3Rpdml0eUxvY2soKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZiAoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9GdUJlbikgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgICAgICBsZXQgbnVtID0gRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuV3VKaW5UaWFvWmhhbilcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpICsgXCI6XCIgKyBudW0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IHRleHRTdHIucmVwbGFjZSgnficsICcnICsgbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUGV0TG9jaygpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmIChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX1BldCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKVxyXG4gICAgICAgICAgICBsZXQgbnVtID0gRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZylcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpICsgXCI6XCIgKyBudW0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IHRleHRTdHIucmVwbGFjZSgnficsICcnICsgbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGV2ZWxMYWJlbCgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMzEwMDAyKSwgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CYWcoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QmFnVWkobnVsbCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CYWcsIFVJTGF5ZXJMZXZlbC5PbmUsIHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZWQ6ICh1aU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YVRlc3QoKSB7XHJcbiAgICAgICAgaWYgKElzRGVidWcpIHtcclxuICAgICAgICAgICAgaWYgKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApXHJcbiAgICAgICAgICAgICAgICBsZXQgZW0gPSBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBFcXVpcFR5cGUuV3VRaTsgaSA8IEVxdWlwVHlwZS5OdW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGggPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91OyBoIDwgSGVyb19UeXBlLkhlcm9fTnVtOyBoKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZXJvTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUhlcm9RdWFsaXR5KGksMzYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUhlcm9MZXZlbChpLDE2MCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDEpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAyKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA1KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDcpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA4KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTApO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjExKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE0KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTYpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE3KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxOCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTkpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjIpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIzKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyNCk7XHJcbiAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgPSAyMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93UmVtYWluVGltZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYoR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5uRW5lcmd5PEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0TWF4RW5lcmd5KCkpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgLy8gICAgICAgICBsZXQgcHJldlQ9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRHZXRFbmVyZ3lUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBjdXJUPW5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0VGltZT1NYXRoLmZsb29yKChjdXJULXByZXZUKS8xMDAwKTtcclxuICAgIC8vICAgICAgICAgbGV0IGZlbj1NYXRoLmZsb29yKG9mZnNldFRpbWUvNjApO1xyXG4gICAgLy8gICAgICAgICBpZihmZW4+PTUpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v566X5Ye65pyJ5aSa5bCR5YiGXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgYWRkRW5lcmd5PU1hdGguZmxvb3IoZmVuLzUpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VFbmVyZ3koYWRkRW5lcmd5KTtcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUdldEVuZXJneVRpbWUocHJldlQrYWRkRW5lcmd5KjUqNjAqMTAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZnJlc2hFbmVyZ3lTaG93KCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgbGV0IHJlbWFpblRpbWU9NSo2MC1vZmZzZXRUaW1lO1xyXG4gICAgLy8gICAgICAgICBmZW49TWF0aC5mbG9vcihyZW1haW5UaW1lLzYwKTtcclxuICAgIC8vICAgICAgICAgbGV0IG1pYW89cmVtYWluVGltZSU2MDtcclxuICAgIC8vICAgICAgICAgaWYobWlhbzwxMClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjowXCIrbWlhbztcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjpcIittaWFvO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM5NTtcclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM1NTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbn1cclxuIl19