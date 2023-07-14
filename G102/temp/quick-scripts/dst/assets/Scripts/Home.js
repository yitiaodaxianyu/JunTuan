
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
var PayFirstChargeUi_1 = require("./Payment/PayFirstChargeUi");
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
                this.scheduleOnce(function () {
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.FirstCharge, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(PayFirstChargeUi_1.default).init({
                                onClose: function () {
                                    var mainUi = cc.find("Canvas/main_ui").getComponent(MainUi_1.default);
                                    mainUi.refreshLeft();
                                }
                            });
                        }, });
                }, 1);
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
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardSSUI, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                                uiNode.getComponent(RewardSSUi_1.default).initData(1);
                            } });
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
        top.y = wp.height / 2 - top.height / 2;
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
                                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignIn, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                        uiNode.getComponent(SignUi_1.default).init(null);
                                    }, });
                            }
                            else {
                                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInDaily, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                        uiNode.getComponent(SignUiDaily_1.default).init(null);
                                    }, });
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
                        um.showUiDialog(UIConfig_1.UIPath.Task, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                // uiNode.getComponent(TaskUi).init(null); 
                            }, });
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
            }, });
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
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Set, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(SettingUi_1.default).init({
                    onClose: function () {
                        _this.showAvatar();
                    },
                });
            }, });
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
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Bag, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(BagUi_1.default).init(null);
            }, });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpRkFBdUY7QUFHdkYsNkNBQXdDO0FBRXhDLHFDQUFnQztBQUNoQyx5Q0FBd0Y7QUFFeEYsdURBQThEO0FBQzlELGlFQUFnRTtBQUNoRSx1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCxxREFBbUQ7QUFHbkQsb0VBQTBFO0FBRTFFLDBEQUFnRTtBQUNoRSxxREFBb0Q7QUFDcEQsa0RBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBQzlELCtEQUEwRDtBQUMxRCxtREFBa0Q7QUFDbEQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUVqRCx5REFBZ0U7QUFDaEUseURBQXFEO0FBQ3JELDJEQUE2RDtBQUc3RCw0Q0FBMkM7QUFDM0Msa0RBQTZDO0FBRzdDLG1EQUE4QztBQUU5QyxxREFBZ0Q7QUFDaEQsaUVBQTREO0FBQzVELHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLDJDQUFzQztBQUN0QyxxREFBZ0Q7QUFFaEQsMENBQXFEO0FBQ3JELDRDQUEyQztBQUMzQyx1Q0FBa0M7QUFHNUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFvdEJDO1FBbHRCRyx3QkFBa0IsR0FBVyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztRQUVoRCxZQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXBCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsV0FBSyxHQUFXLEVBQUUsQ0FBQzs7UUF5cUJuQixtQkFBbUI7UUFDbkIsSUFBSTtRQUNKLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsOENBQThDO1FBQzlDLCtEQUErRDtRQUMvRCx5Q0FB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RUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsRUFBRSxDQUFDO2FBQzlDO1NBQ0o7SUFDTCxDQUFDOztJQTNxQkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7d0NBQ0E7SUFFcEI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7c0NBQ0Y7SUFFbEI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7dUNBQ0Q7SUFSRixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBb3RCeEI7SUFBRCxXQUFDO0NBcHRCRCxBQW90QkMsQ0FwdEJpQyxFQUFFLENBQUMsU0FBUyxHQW90QjdDO2tCQXB0Qm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyIH0gZnJvbSBcIi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLCBDaGFsbGVuZ2VNb2RlIH0gZnJvbSBcIi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IEFkTWFuYWdlciBmcm9tIFwiLi9BZHMvQWRNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb2luUG9wIGZyb20gXCIuL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgQnRuX0luZGV4LCBGdW5jVHlwZSwgR2FtZU1vZGUsIEdhbWVTY2VuZSwgR29fVHlwZSwgSXNEZWJ1Z30gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgQ29zdERhdGEsIEVxdWlwVHlwZSB9IGZyb20gXCIuL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSGVyb0xpc3RVaSBmcm9tIFwiLi9IZXJvL1VpL0hlcm9MaXN0VWlcIjtcclxuaW1wb3J0IFJvbGVVaSBmcm9tIFwiLi9IZXJvL1VpL1JvbGVVaVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFJld2FyZEhlcm9EYXRhIH0gZnJvbSBcIi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBQbGF5ZXJMZXZlbFVwTWFuYWdlciB9IGZyb20gXCIuL0pzb25EYXRhL1BsYXllckxldmVsVXBcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuL1JhbmtpbmdMaXN0L1JhbmtpbmdMaXN0XCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEYWlseVNob3BNYW5hZ2VyIH0gZnJvbSBcIi4vU3RvcmUvRGFpbHlTaG9wXCI7XHJcbmltcG9ydCBTdG9yZUhlcm9VaSBmcm9tIFwiLi9TdG9yZS9TdG9yZUhlcm9VaVwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi9UYXNrL1Rhc2tVaVwiO1xyXG5pbXBvcnQgeyBQYXlVaUluZGV4IH0gZnJvbSBcIi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCBOdW1iZXJMYWJlbCBmcm9tIFwiLi9Ub29scy9OdW1iZXJMYWJlbFwiO1xyXG5pbXBvcnQgVHVybXRhYmxlIGZyb20gXCIuL1R1cm50YWJsZS9UdXJtdGFibGVcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4vVHV0b3JpYWxzL1Jld2FyZFNTVWlcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEJhZ1VpIGZyb20gXCIuL1VJL2hvbWUvQmFnVWlcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgU2V0dGluZ1VpIGZyb20gXCIuL1VJL2hvbWUvU2V0dGluZ1VpXCI7XHJcbmltcG9ydCBTaWduVWkgZnJvbSBcIi4vVUkvaG9tZS9TaWduVWlcIjtcclxuaW1wb3J0IFNpZ25VaURhaWx5IGZyb20gXCIuL1VJL2hvbWUvU2lnblVpRGFpbHlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9VSS9ob21lL1RvUGxheU1haW5VaVwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFZpcFN5c3RlbSBmcm9tIFwiLi9WaXBTeXN0ZW0vVmlwU3lzdGVtXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGN1cl9zZWxlY3RlZF9pbmRleDpCdG5fSW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIGFsbF91aTpjYy5Ob2RlW109W107XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgYnRuczpjYy5Ob2RlW109W107XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgbmFtZXM6Y2MuTm9kZVtdPVtdO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmFkYXB0YXRpb24oKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLueZu+W9lVjmrKHmuLjmiI8pO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u55m75b2V5ri45oiPMeasoSk7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub2RheUlzRmlyc3RMb2dJbiwwKSA9PSAwKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG9kYXlJc0ZpcnN0TG9nSW4sMSlcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ntK/orqHnmbvlvZVY5aSpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5kZWJ1Zy5zZXREaXNwbGF5U3RhdHMoSXNEZWJ1Zyk7XHJcbiAgICAgICAgLy9IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRBbGxIZXJvRGF0YSgpO1xyXG4gICAgICAgIEFkTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFuZHJvaWRJZCgpO1xyXG4gICAgICAgIC8v5qOA5rWL5piv5ZCm5pyJ5pWZ56iLXHJcbiAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpO1xyXG4gICAgICAgIHRoaXMuY2hlYWtVbmxvY2soKTtcclxuICAgICAgICAvL3RoaXMuZGF0YVRlc3QoKTtcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgaWYgKHdpbmRvdy52Q29uc29sZSkge1xyXG4gICAgICAgIC8vICAgICB3aW5kb3cudkNvbnNvbGUuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vICAgICB3aW5kb3cudkNvbnNvbGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0sIDEwMDApO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRIZXJvQmluZCgpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8g5ouJ5Y+W5pyN5Yqh5Zmo5pe26Ze0XHJcbiAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoU2VydmVyVGltZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuZ2V0Wm9uZ1poYW5MaUpzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX0hvbWUpO1xyXG4gICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoei/m+WFpeS4u+mhtSk8PTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXkuLvpobUpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Li76aG1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlYWtEWUluZm8oKTtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldElzU2lnblRvZGF5KCkgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuUWlhbkRhbykpXHJcbiAgICAgICAgICAgICAgICBnbS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluX1NpZ247XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5GaXJzdENoYXJnZSkmJlBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2MzMDEnKTw9MCYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5VaT1jYy5maW5kKFwiQ2FudmFzL21haW5fdWlcIikuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpblVpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9LDEpICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+agueaNrmdhbWVfdG9faG9tZeiuvue9ruaYvuekuueahOeVjOmdolxyXG4gICAgICAgIHRoaXMuc2hvd1VpKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VG9wKCk7XHJcbiAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7ICAgICAgXHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTIwMCk7XHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLDIwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGNoZWNrVHV0b3JhaWxzKCk6Ym9vbGVhbntcclxuICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaClcclxuICAgICAgICB7ICAgLy/ot7PovazliLDllYblnLpcclxuICAgICAgICAgICAgLy8gbGV0IGZpbmlzaExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICAgICAgLy8gaWYoZmluaXNoTGV2ZWw8NSl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMikmJmZpbmlzaExldmVsPj0zKVxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5pWZ56iLXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5by65Yi25pi+56S65ZWG5Z+O6aG1XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBidG5TdGFydD1jYy5maW5kKCdDYW52YXMvbWFpbl91aS9idG5TdGFydCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCB3b3JkUG9zPWJ0blN0YXJ0LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuU3RhcnQuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbG9jYWxQb3MueC09Y2MuZmluZCgnQ2FudmFzL21haW5fdWknKS54O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwMSxudWxsLCgpPT57XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB9ICAgICBcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpKXtcclxuICAgICAgICAgICAgICAgIC8vMjE45a6M5oiQ5pi+56S6XHJcbiAgICAgICAgICAgICAgICAvL+WNh+e6p+W8leWvvFxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5Sb2xlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzExKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzEyKSl7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuiLsembhOmhtVxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5Sb2xlOyBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw+PTUgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgICAgICB9LDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWFrVW5sb2NrKCl7XHJcbiAgICAgICAgbGV0IGJ0bkNpdHk9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0bkNpdHknKTtcclxuICAgICAgICAvLyBidG5DaXR5LmdldENoaWxkQnlOYW1lKCdsb2NrJykuYWN0aXZlPSFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0NpdHkpO1xyXG5cclxuICAgICAgICBsZXQgYnRuRnVCZW49Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0bkZ1QmVuJyk7XHJcbiAgICAgICAgLy8gYnRuRnVCZW4uZ2V0Q2hpbGRCeU5hbWUoJ2xvY2snKS5hY3RpdmU9IUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pO1xyXG4gICAgICAgIGxldCBidG5QZXQ9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0blBldCcpO1xyXG4gICAgICAgIC8vIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBidG5QZXQ9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0blBldCcpO1xyXG4gICAgICAgIC8vICAgICBidG5QZXQuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvYWRpbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXI9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbD1sb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzO1xyXG4gICAgICAgIGxvYWRMYWJlbC5zdHJpbmc9KGxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXQoR2FtZVNjZW5lLmhvbWUpO1xyXG4gICAgICAgIGxldCBsb2FkaW5nU2NoZWR1bGU9KCk9PntcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcys9MC4wMTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBpZihsb2FkaW5nQmFyLnByb2dyZXNzPj0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzPTE7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2xvYWRlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZT1udWxsOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUobG9hZGluZ1NjaGVkdWxlLDAuMDIpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIC8v5LiK5LiL5qih5Z2XICAgICAgICBcclxuICAgICAgICBsZXQgdG9wVWk9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaScpO1xyXG4gICAgICAgIGxldCBkb3duPXRvcFVpLmdldENoaWxkQnlOYW1lKCdkb3duJyk7XHJcbiAgICAgICAgbGV0IHRvcD10b3BVaS5nZXRDaGlsZEJ5TmFtZSgndG9wJyk7XHJcbiAgICAgICAgbGV0IG9mZnNldFk9dG9wLnk7XHJcbiAgICAgICAgbGV0IHdwPWNjLndpblNpemU7XHJcbiAgICAgICAgZG93bi55PS13cC5oZWlnaHQvMitkb3duLmhlaWdodC8yO1xyXG4gICAgICAgIHRvcC55PXdwLmhlaWdodC8yLXRvcC5oZWlnaHQvMjtcclxuICAgICAgICBvZmZzZXRZPXRvcC55LW9mZnNldFk7XHJcbiAgICAgICAgLy/lvIDlp4vmjInpkq5cclxuICAgICAgICBsZXQgbWFpblVpPWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJyk7XHJcbiAgICAgICAgbGV0IGJ0blN0YXJ0PW1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnYnRuU3RhcnQnKTtcclxuICAgICAgICBsZXQgTWFpbl9JY29uX01hcD1tYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ01haW5fSWNvbl9NYXAnKTtcclxuICAgICAgICBNYWluX0ljb25fTWFwLnk9ZG93bi55KzE1MDtcclxuICAgICAgICBsZXQgbWFpblRhc2s9bWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFzaycpO1xyXG4gICAgICAgIG1haW5UYXNrLnk9ZG93bi55KzI5MDtcclxuICAgICAgICBsZXQgbWFpblRhc2tFZmZlY3Q9bWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFza0VmZmVjdCcpO1xyXG4gICAgICAgIG1haW5UYXNrRWZmZWN0Lnk9ZG93bi55KzI5MDtcclxuICAgICAgICBsZXQgTWFpbl9JY29uX0lkbGU9bWFpblVpLmdldENoaWxkQnlOYW1lKCdNYWluX0ljb25fSWRsZScpO1xyXG4gICAgICAgIE1haW5fSWNvbl9JZGxlLnk9ZG93bi55KzE1MDtcclxuICAgICAgICBidG5TdGFydC55PWRvd24ueSsxNTA7XHJcbiAgICAgICAgbWFpblVpLmdldENoaWxkQnlOYW1lKCdidG5PZmZsaW5lR2lmdCcpLnk9YnRuU3RhcnQueSs4MDtcclxuICAgICAgICAvL+S4u+eVjOmdolxyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpLnk9dG9wLnktMjA4O1xyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKS55PXRvcC55LTIwODtcclxuICAgICAgICBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykueSs9b2Zmc2V0WTtcclxuICAgICAgICAvL+inkuiJsueVjOmdolxyXG4gICAgICAgIC8vIGxldCByb2xlVWk9Y2MuZmluZCgnQ2FudmFzL3JvbGVfdWknKTtcclxuICAgICAgICAvLyByb2xlVWkueSs9b2Zmc2V0WTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3nmoRpbmRleOaYr+S4u+Wfju+8jOmcgOimgeaPkOWJjeWIpOaWreS4gOS4i+S4u+WfjuaYr+WQpuacieino+mUgeeahOWKn+iDvVxyXG4gICAgICAgIGxldCBuZXdJbmRleD0tMTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXgpKXtcclxuICAgICAgICAgICAgbmV3SW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD09bmV3SW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID09IDApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li75Z+O5omT5byA5qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sZXQgZG93bj1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24nKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTw1OyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnRuPXRoaXMuYnRuc1tpXTtcclxuICAgICAgICAgICAgbGV0IGJ0bnM9YnRuLmdldENvbXBvbmVudHMoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuQnRuPXRoaXMuY3VyX3NlbGVjdGVkX2luZGV4IT1pO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWxsX3VpW2ldLmFjdGl2ZT0haXNDYW5CdG47XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3VpW2ldLm9wYWNpdHk9aXNDYW5CdG4/MDoyNTU7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3VpW2ldLng9aXNDYW5CdG4/LTEyODA6MDtcclxuICAgICAgICAgICAgdGhpcy5uYW1lc1tpXS5jb2xvciA9IGlzQ2FuQnRuP2NjLmNvbG9yKDIxMCwxODQsMTQ1KTpjYy5jb2xvcigyNTUsMjMzLDIwMSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc1tpXS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSAhaXNDYW5CdG47XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGJ0bnMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgYnRuc1tuXS5pbnRlcmFjdGFibGU9aXNDYW5CdG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsPXRvcC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9JycrbGV2ZWw7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKSArICcnO1xyXG4gICAgICAgIGxldCBidG5BdmF0YXI9dG9wLmdldENoaWxkQnlOYW1lKCdoZWFkUG9ydHJhaXQnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuQXZhdGFyJyk7XHJcbiAgICAgICAgbGV0IGF2YXRhckluZGV4PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpO1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShhdmF0YXJJbmRleCk7XHJcbiAgICAgICAgLy/ov5vluqZcclxuICAgICAgICBsZXQgY3VyRXhwPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckV4cCgpO1xyXG4gICAgICAgIGxldCBtYXhFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2V4cFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1jdXJFeHAvbWF4RXhwO1xyXG4gICAgICAgIGlmKElzRGVidWcgJiYgY3VyRXhwL21heEV4cD49MSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVc2VyTGV2ZWxVaSgpO1xyXG4gICAgICAgICAgICAvL1VJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVXNlckxldmVsLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgLy9DT0lOXHJcbiAgICAgICAgbGV0IGNvaW5MYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9jb2luTGFiZWwnKTtcclxuICAgICAgICBjb2luTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbiksdHJ1ZSk7XHJcbiAgICAgICAgLy/mmK/lkKbpnIDopoHliqBL5pi+56S6XHJcbiAgICAgICAgLy9HZW1cclxuICAgICAgICBsZXQgZ2VtTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvZ2VtTGFiZWwnKTtcclxuICAgICAgICBnZW1MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pLHRydWUpO1xyXG4gICAgICAgIC8v6b6Z5pm2XHJcbiAgICAgICAgbGV0IGNyeXN0YWxMYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9jcnlzdGFsTGFiZWwnKTtcclxuICAgICAgICBjcnlzdGFsTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuTG9uZ0ppbmcpLHRydWUpO1xyXG4gICAgICAgIC8v5oiY5YqbXHJcbiAgICAgICAgbGV0IHpoYW5saUxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL3poYW5saUxhYmVsJyk7XHJcbiAgICAgICAgemhhbmxpTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG9wKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdG9wPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wJyk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytsZXZlbDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImF0a1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpICsgJyc7XHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhcj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRQb3J0cmFpdCcpLmdldENoaWxkQnlOYW1lKCdidG5BdmF0YXInKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXg9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKGF2YXRhckluZGV4KTtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPWN1ckV4cC9tYXhFeHA7XHJcbiAgICAgICAgaWYoSXNEZWJ1ZyAmJiBjdXJFeHAvbWF4RXhwPj0xKXtcclxuICAgICAgICAgICAgLy9VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlVzZXJMZXZlbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NPSU5cclxuICAgICAgICB0aGlzLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgIC8v5piv5ZCm6ZyA6KaB5YqgS+aYvuekulxyXG4gICAgICAgIC8vR2VtXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgIC8v5oiY5YqbXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoWmhhbkxpU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDb2luU2hvdygpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgY29pbkxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NvaW5MYWJlbCcpO1xyXG4gICAgICAgIGNvaW5MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLDAuNSk7XHJcbiAgICAgICAgcmV0dXJuIGNvaW5MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR2VtU2hvdygpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgZ2VtTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvZ2VtTGFiZWwnKTtcclxuICAgICAgICBnZW1MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksMC41KTtcclxuICAgICAgICByZXR1cm4gZ2VtTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFpoYW5MaVNob3coKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB6aGFubGlMYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC96aGFubGlMYWJlbCcpO1xyXG4gICAgICAgIHpoYW5saUxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLDAuNSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTG9uZ0ppbmcoKXtcclxuICAgICAgICAvL+m+meaZtlxyXG4gICAgICAgIGxldCBjcnlzdGFsTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvY3J5c3RhbExhYmVsJyk7XHJcbiAgICAgICAgY3J5c3RhbExhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkxvbmdKaW5nKSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVXNlckV4cCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsPXRvcC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J0x2LicrbGV2ZWw7XHJcbiAgICAgICAgLy/ov5vluqZcclxuICAgICAgICBsZXQgY3VyRXhwPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckV4cCgpO1xyXG4gICAgICAgIGxldCBtYXhFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTtcclxuICAgICAgICBsZXQgcHA9Y3VyRXhwL21heEV4cDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2V4cFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1wcDtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vVG9VaShpbmRleDpCdG5fSW5kZXgpe1xyXG4gICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PWluZGV4O1xyXG4gICAgICAgIHRoaXMuc2V0QnRuU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0b3A9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AnKTtcclxuICAgICAgICBsZXQgaWNvbj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2J0blNldHRpbmcnKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgIGxldCBhdmF0YXJJbmRleD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICBpY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK2F2YXRhckluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHVzZXJOYW1lTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCd1c2VyTmFtZUxhYmVsJyk7XHJcbiAgICAgICAgdXNlck5hbWVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIC8vUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTc1MDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuUGFvU2hvdSk7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5EZUx1WWkpO1xyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuTGVpU2hlbik7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5Hb25nSmlhblNob3UpO1xyXG4gICAgICAgIC8vIFt7XCJoZXJvX3R5cGVcIjoyLFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjoyLFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX0se1wiaGVyb190eXBlXCI6MyxcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6MixcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjQsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjMsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfSx7XCJoZXJvX3R5cGVcIjoxMixcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6NSxcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjgsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjQsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfV1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VWkoKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgdW09VUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoKGdtLmdhbWVfdG9faG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TaWduOntcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5PdmVyLDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2lnbkluRGFpbHksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWlEYWlseSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fU3Bpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVtLnNob3dTcGluVWkoe29uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hSaWdodCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1Rhc2s6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRhc2ssVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KG51bGwpOyBcclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fUmFuazp7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVtLnNob3dSYW5rVWkoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoUmlnaHQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuUm9sZTp0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX1JvbGU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5QZXRMaXN0OnRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fUGV0OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkNpdHk6e1xyXG4gICAgICAgICAgICAgICAgLy9pZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuQ2hlbmdCYW9ZYW5nQ2hlbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0NpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1bHRpdmF0ZVVpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY3VsdGl2YXRlX3VpJykuZ2V0Q29tcG9uZW50KEN1bHRpdmF0ZVVpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjdWx0aXZhdGVVaS5pc19oaW50X3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdWx0aXZhdGVVaS5jdXJfc2VsZWN0ZWRfaW5kZXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1bHRpdmF0ZVVpLnNldEJ0blNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eV9FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysr5peg5bC956Gu6K6k5oyJ6ZKu6YCA5Ye65p2lXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eV9Cb3NzOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fRnVCZW47XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsaWNrQnRuRG93bihidG46Y2MuRXZlbnQuRXZlbnRUb3VjaCxpbmRleDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gTnVtYmVyKGluZGV4KSA9PSAzIHx8IFxyXG4gICAgICAgIC8vIGlmKE51bWJlcihpbmRleCkgPT0gNCl7XHJcbiAgICAgICAgLy8gICAgIGxldCBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKTtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1wYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9PTQpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Ymv5pys6aG16Z2i5bGV56S65qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ29pbigpXHJcbiAgICB7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuQ29pbilcclxuICAgICAgICB9LH0pO1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdlbSgpXHJcbiAgICB7ICBcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgLy8gfSx9KTtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBnbS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICBcclxuICAgICAgICBpZihjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSkuY3VyX3NlbGVjdGVkX2luZGV4ID09IEJ0bl9JbmRleC5CdG5fQ2l0eSl7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TZXR0aW5nKClcclxuICAgIHsgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtTGlzdD1bXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDk7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKE1hdGgucmFuZG9tKCk8MC41PzIwMTEwOjIwMTEwLDUpO1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKDMwNDA1LDUpO1xyXG4gICAgICAgIC8vICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChpdGVtTGlzdCk7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgcHJvcERhdGFzPW5ldyBBcnJheTxQcm9wT2JqZWN0PigpO1xyXG4gICAgICAgIC8vIGxldCBwcm9wRGF0YT1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgIC8vIHByb3BEYXRhLml0ZW1zSWQ9MTAwMDJcclxuICAgICAgICAvLyBwcm9wRGF0YS5pdGVtc051bT0xMDAwMDA7XHJcbiAgICAgICAgLy8gcHJvcERhdGFzLnB1c2gocHJvcERhdGEpO1xyXG4gICAgICAgIC8vIC8vIGxldCBwcm9wRGF0YTE9bmV3IFByb3BPYmplY3QoKTtcclxuICAgICAgICAvLyAvLyBwcm9wRGF0YTEuaXRlbXNJZD0xMDAwNFxyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhMS5pdGVtc051bT0zMjtcclxuICAgICAgICAvLyAvLyBwcm9wRGF0YXMucHVzaChwcm9wRGF0YTEpO1xyXG4gICAgICAgIC8vIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuSHR0cEFkZFByb3BEYXRhKHByb3BEYXRhcyk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMSk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMik7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMyk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxFcXVpcG1lbnRMaXN0KCk7XHJcbiAgICAgICAgLy8gbGV0IGNvc3RMaXN0PW5ldyBBcnJheTxDb3N0RGF0YT4oKTtcclxuICAgICAgICAvLyBsZXQgaXNDYW49RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQUVxdWlwTWVyZ2UoMzAzMDQsY29zdExpc3QpO1xyXG4gICAgICAgIC8vIGlmKGlzQ2FuKXtcclxuICAgICAgICAvLyAgICAgY2MubG9nKEpTT04uc3RyaW5naWZ5KGNvc3RMaXN0KSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTZXR0aW5nKHtcclxuICAgICAgICAvLyAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7XHJcbiAgICAgICAgLy8gICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WaXBTeXN0ZW0sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5pbmlVaSgpXHJcbiAgICAgICAgLy8gfSx9KTsvL+S8muWRmOezu+e7nyAgVklQ57O757ufXHJcbiAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhDaGFsbGVuZ2VNb2RlLk5vYW1hbCk7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtpbmdMaXN0KS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/mjpLooYzmppxcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/ovaznm5hcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TZXQsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2V0dGluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sfSlcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQ2hhbGxlbmdlTW9kZS5Ob2FtYWwpO1xyXG4gICAgICAgIC8vICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdFRvSXNzdWVkKFVSTF9UWVBFLnN1YlVzZXJJdGVtc051bSxKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgLy8gICAgIFwidWlkXCI6XCJaUjE2NDg2MDc0NzkwYTBcIiwgLy/nlKjmiLfmoIfor4ZpZFxyXG4gICAgICAgIC8vICAgICBcIml0ZW1Wb0xpc3RcIjpbXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJpdGVtc0lkXCI6MTAwMDEsIC8v6YGT5YW3aWRcclxuICAgICAgICAvLyAgICAgICAgICAgICBcIml0ZW1zTnVtXCI6LTIwIC8v5paw5aKe5oiW5YeP5bCR5pWw6YePXHJcbiAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNJZFwiOjEwMDA0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNOdW1cIjotMjBcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgXVxyXG4gICAgICAgIC8vIH0pLChkYXRhKT0+e1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvL1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3luY1Byb3BEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hcFVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2V0QWN0aXZpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DaXR5TG9jaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9DaXR5KT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5YdVl1YW5DaGkpXHJcbiAgICAgICAgICAgIGxldCBudW09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuWHVZdWFuQ2hpKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQWN0aXZpdHlMb2NrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0Z1QmVuKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pXHJcbiAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK251bSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW0pXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5QZXRMb2NrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX1BldCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHR5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZylcclxuICAgICAgICAgICAgbGV0IG51bT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGV2ZWxMYWJlbCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgzMTAwMDIpLDMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQmFnKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QmFnVWkobnVsbCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CYWcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhVGVzdCgpe1xyXG4gICAgICAgIGlmKElzRGVidWcpe1xyXG4gICAgICAgICAgICBpZihGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3REbyhGb2xsb3dfVHlwZS5Mb2Fk6aG15bGV56S65oC75qyh5pWwKTw9MCl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS5Mb2Fk6aG15bGV56S65oC75qyh5pWwKVxyXG4gICAgICAgICAgICAgICAgbGV0IGVtPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGg9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTsgaDxIZXJvX1R5cGUuSGVyb19OdW07IGgrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVIZXJvUXVhbGl0eShpLDM2KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVIZXJvTGV2ZWwoaSwxNjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAxKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDMpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDYpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA3KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDkpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTIpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTUpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE2KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTgpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE5KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjEpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIyKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjQpO1xyXG4gICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPTIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93UmVtYWluVGltZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYoR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5uRW5lcmd5PEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0TWF4RW5lcmd5KCkpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgLy8gICAgICAgICBsZXQgcHJldlQ9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRHZXRFbmVyZ3lUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBjdXJUPW5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0VGltZT1NYXRoLmZsb29yKChjdXJULXByZXZUKS8xMDAwKTtcclxuICAgIC8vICAgICAgICAgbGV0IGZlbj1NYXRoLmZsb29yKG9mZnNldFRpbWUvNjApO1xyXG4gICAgLy8gICAgICAgICBpZihmZW4+PTUpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v566X5Ye65pyJ5aSa5bCR5YiGXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgYWRkRW5lcmd5PU1hdGguZmxvb3IoZmVuLzUpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VFbmVyZ3koYWRkRW5lcmd5KTtcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUdldEVuZXJneVRpbWUocHJldlQrYWRkRW5lcmd5KjUqNjAqMTAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZnJlc2hFbmVyZ3lTaG93KCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgbGV0IHJlbWFpblRpbWU9NSo2MC1vZmZzZXRUaW1lO1xyXG4gICAgLy8gICAgICAgICBmZW49TWF0aC5mbG9vcihyZW1haW5UaW1lLzYwKTtcclxuICAgIC8vICAgICAgICAgbGV0IG1pYW89cmVtYWluVGltZSU2MDtcclxuICAgIC8vICAgICAgICAgaWYobWlhbzwxMClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjowXCIrbWlhbztcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjpcIittaWFvO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM5NTtcclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM1NTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbn1cclxuIl19