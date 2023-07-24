
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpRkFBdUY7QUFHdkYsNkNBQXdDO0FBRXhDLHFDQUFnQztBQUNoQyx5Q0FBd0Y7QUFFeEYsdURBQThEO0FBQzlELGlFQUFnRTtBQUNoRSx1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCxxREFBbUQ7QUFHbkQsb0VBQTBFO0FBRTFFLDBEQUFnRTtBQUNoRSxxREFBb0Q7QUFDcEQsa0RBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBQzlELCtEQUEwRDtBQUMxRCxtREFBa0Q7QUFDbEQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUVqRCx5REFBZ0U7QUFDaEUseURBQXFEO0FBQ3JELDJEQUE2RDtBQUc3RCw0Q0FBMkM7QUFDM0Msa0RBQTZDO0FBRzdDLG1EQUE4QztBQUU5QyxxREFBZ0Q7QUFDaEQsaUVBQTREO0FBQzVELHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLDJDQUFzQztBQUN0QyxxREFBZ0Q7QUFFaEQsMENBQXFEO0FBQ3JELDRDQUEyQztBQUMzQyx1Q0FBa0M7QUFHNUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFxdEJDO1FBbnRCRyx3QkFBa0IsR0FBVyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztRQUVoRCxZQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXBCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsV0FBSyxHQUFXLEVBQUUsQ0FBQzs7UUEwcUJuQixtQkFBbUI7UUFDbkIsSUFBSTtRQUNKLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsOENBQThDO1FBQzlDLCtEQUErRDtRQUMvRCx5Q0FB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QyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUM7YUFDOUM7U0FDSjtJQUNMLENBQUM7O0lBNXFCRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDQTtJQUVwQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztzQ0FDRjtJQUVsQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt1Q0FDRDtJQVJGLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FxdEJ4QjtJQUFELFdBQUM7Q0FydEJELEFBcXRCQyxDQXJ0QmlDLEVBQUUsQ0FBQyxTQUFTLEdBcXRCN0M7a0JBcnRCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi9BY2N1bXVsYXRlZFJlY2hhcmdlL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIsIENoYWxsZW5nZU1vZGUgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4vQ29pblBvcFwiO1xyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEZ1bmNUeXBlLCBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHb19UeXBlLCBJc0RlYnVnfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBDb3N0RGF0YSwgRXF1aXBUeXBlIH0gZnJvbSBcIi4vRXF1aXBtZW50L0VxdWlwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvTGlzdFVpIGZyb20gXCIuL0hlcm8vVWkvSGVyb0xpc3RVaVwiO1xyXG5pbXBvcnQgUm9sZVVpIGZyb20gXCIuL0hlcm8vVWkvUm9sZVVpXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUmV3YXJkSGVyb0RhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IFBsYXllckxldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4vUGF5bWVudC9QYXlGaXJzdENoYXJnZVVpXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgUmFua2luZ0xpc3QgZnJvbSBcIi4vUmFua2luZ0xpc3QvUmFua2luZ0xpc3RcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERhaWx5U2hvcE1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yZS9EYWlseVNob3BcIjtcclxuaW1wb3J0IFN0b3JlSGVyb1VpIGZyb20gXCIuL1N0b3JlL1N0b3JlSGVyb1VpXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuL1Rhc2svVGFza1VpXCI7XHJcbmltcG9ydCB7IFBheVVpSW5kZXggfSBmcm9tIFwiLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IE51bWJlckxhYmVsIGZyb20gXCIuL1Rvb2xzL051bWJlckxhYmVsXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgUmV3YXJkU1NVaSBmcm9tIFwiLi9UdXRvcmlhbHMvUmV3YXJkU1NVaVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFnVWkgZnJvbSBcIi4vVUkvaG9tZS9CYWdVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCBTZXR0aW5nVWkgZnJvbSBcIi4vVUkvaG9tZS9TZXR0aW5nVWlcIjtcclxuaW1wb3J0IFNpZ25VaSBmcm9tIFwiLi9VSS9ob21lL1NpZ25VaVwiO1xyXG5pbXBvcnQgU2lnblVpRGFpbHkgZnJvbSBcIi4vVUkvaG9tZS9TaWduVWlEYWlseVwiO1xyXG5pbXBvcnQgVG9QbGF5TWFpblVpIGZyb20gXCIuL1VJL2hvbWUvVG9QbGF5TWFpblVpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgVmlwU3lzdGVtIGZyb20gXCIuL1ZpcFN5c3RlbS9WaXBTeXN0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgY3VyX3NlbGVjdGVkX2luZGV4OkJ0bl9JbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgYWxsX3VpOmNjLk5vZGVbXT1bXTtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBidG5zOmNjLk5vZGVbXT1bXTtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBuYW1lczpjYy5Ob2RlW109W107XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u55m75b2VWOasoea4uOaIjyk7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7nmbvlvZXmuLjmiI8x5qyhKTtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvZGF5SXNGaXJzdExvZ0luLDApID09IDApe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub2RheUlzRmlyc3RMb2dJbiwxKVxyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoeeZu+W9lVjlpKkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmRlYnVnLnNldERpc3BsYXlTdGF0cyhJc0RlYnVnKTtcclxuICAgICAgICAvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZEFsbEhlcm9EYXRhKCk7XHJcbiAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QW5kcm9pZElkKCk7XHJcbiAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInmlZnnqItcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICAgICAgdGhpcy5jaGVha1VubG9jaygpO1xyXG4gICAgICAgIC8vdGhpcy5kYXRhVGVzdCgpO1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAod2luZG93LnZDb25zb2xlKSB7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy52Q29uc29sZS5kZXN0cm95KCk7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy52Q29uc29sZSA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldEhlcm9CaW5kKCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgICAgICAvLyDmi4nlj5bmnI3liqHlmajml7bpl7RcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hTZXJ2ZXJUaW1lKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldFJhdGUoKTtcclxuICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5nZXRab25nWmhhbkxpSnNvblN0cmluZygpKTtcclxuICAgICAgICBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fSG9tZSk7XHJcbiAgICAgICAgaWYoRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpcnN0RG8oRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Li76aG1KTw9MCl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLummluasoei/m+WFpeS4u+mhtSk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXkuLvpobUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL0Fwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVha0RZSW5mbygpO1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SXNTaWduVG9kYXkoKSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5RaWFuRGFvKSlcclxuICAgICAgICAgICAgICAgIGdtLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW5fU2lnbjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkZpcnN0Q2hhcmdlKSYmUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheU51bSgnYzMwMScpPD0wJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmlyc3RDaGFyZ2UsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpblVpPWNjLmZpbmQoXCJDYW52YXMvbWFpbl91aVwiKS5nZXRDb21wb25lbnQoTWFpblVpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluVWkucmVmcmVzaExlZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH0sMSkgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5qC55o2uZ2FtZV90b19ob21l6K6+572u5pi+56S655qE55WM6Z2iXHJcbiAgICAgICAgdGhpcy5zaG93VWkoKTtcclxuICAgICAgICB0aGlzLmluaXRUb3AoKTtcclxuICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTsgICAgICBcclxuICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtMjAwKTtcclxuICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sMjAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgY2hlY2tUdXRvcmFpbHMoKTpib29sZWFue1xyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoKVxyXG4gICAgICAgIHsgICAvL+i3s+i9rOWIsOWVhuWculxyXG4gICAgICAgICAgICAvLyBsZXQgZmluaXNoTGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgICAgICAvLyBpZihmaW5pc2hMZXZlbDw1KXtcclxuICAgICAgICAgICAgLy8gICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjIyKSYmZmluaXNoTGV2ZWw+PTMpXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/mlZnnqItcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/lvLrliLbmmL7npLrllYbln47pobVcclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGJ0blN0YXJ0PWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpL2J0blN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHdvcmRQb3M9YnRuU3RhcnQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5TdGFydC5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsb2NhbFBvcy54LT1jYy5maW5kKCdDYW52YXMvbWFpbl91aScpLng7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAxLG51bGwsKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSx0cnVlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIH0gICAgIFxyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMikpe1xyXG4gICAgICAgICAgICAgICAgLy8yMTjlrozmiJDmmL7npLpcclxuICAgICAgICAgICAgICAgIC8v5Y2H57qn5byV5a+8XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLlJvbGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTIpKXtcclxuICAgICAgICAgICAgICAgIC8v5pi+56S66Iux6ZuE6aG1XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLlJvbGU7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbD49NSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwNSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSZXdhcmRTU1VpKS5pbml0RGF0YSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2hlYWtVbmxvY2soKXtcclxuICAgICAgICBsZXQgYnRuQ2l0eT1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuQ2l0eScpO1xyXG4gICAgICAgIC8vIGJ0bkNpdHkuZ2V0Q2hpbGRCeU5hbWUoJ2xvY2snKS5hY3RpdmU9IUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fQ2l0eSk7XHJcblxyXG4gICAgICAgIGxldCBidG5GdUJlbj1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuRnVCZW4nKTtcclxuICAgICAgICAvLyBidG5GdUJlbi5nZXRDaGlsZEJ5TmFtZSgnbG9jaycpLmFjdGl2ZT0hRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9GdUJlbik7XHJcbiAgICAgICAgbGV0IGJ0blBldD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuUGV0Jyk7XHJcbiAgICAgICAgLy8gaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpKXtcclxuICAgICAgICAvLyAgICAgbGV0IGJ0blBldD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuUGV0Jyk7XHJcbiAgICAgICAgLy8gICAgIGJ0blBldC5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9hZGluZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2xvYWRfcHJvZ3Jlc3M7XHJcbiAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdChHYW1lU2NlbmUuaG9tZSk7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdTY2hlZHVsZT0oKT0+e1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzKz0wLjAxO1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nPShsb2FkaW5nQmFyLnByb2dyZXNzKjEwMCkudG9GaXhlZCgwKSsnJSc7XHJcbiAgICAgICAgICAgIGlmKGxvYWRpbmdCYXIucHJvZ3Jlc3M+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3M9MTtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfbG9hZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJnTG9hZGluZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGxvYWRpbmdTY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1NjaGVkdWxlPW51bGw7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUsMC4wMik7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuIrkuIvmqKHlnZcgICAgICAgIFxyXG4gICAgICAgIGxldCB0b3BVaT1jYy5maW5kKCdDYW52YXMvVG9wX1VpJyk7XHJcbiAgICAgICAgbGV0IGRvd249dG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2Rvd24nKTtcclxuICAgICAgICBsZXQgdG9wPXRvcFVpLmdldENoaWxkQnlOYW1lKCd0b3AnKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WT10b3AueTtcclxuICAgICAgICBsZXQgd3A9Y2Mud2luU2l6ZTtcclxuICAgICAgICBkb3duLnk9LXdwLmhlaWdodC8yK2Rvd24uaGVpZ2h0LzI7XHJcbiAgICAgICAgdG9wLnk9d3AuaGVpZ2h0LzItdG9wLmhlaWdodC8yO1xyXG4gICAgICAgIG9mZnNldFk9dG9wLnktb2Zmc2V0WTtcclxuICAgICAgICAvL+W8gOWni+aMiemSrlxyXG4gICAgICAgIGxldCBtYWluVWk9Y2MuZmluZCgnQ2FudmFzL21haW5fdWknKTtcclxuICAgICAgICBsZXQgYnRuU3RhcnQ9bWFpblVpLmdldENoaWxkQnlOYW1lKCdidG5TdGFydCcpO1xyXG4gICAgICAgIGxldCBNYWluX0ljb25fTWFwPW1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnTWFpbl9JY29uX01hcCcpO1xyXG4gICAgICAgIE1haW5fSWNvbl9NYXAueT1kb3duLnkrMTUwO1xyXG4gICAgICAgIGxldCBtYWluVGFzaz1tYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ21haW5UYXNrJyk7XHJcbiAgICAgICAgbWFpblRhc2sueT1kb3duLnkrMjkwO1xyXG4gICAgICAgIGxldCBtYWluVGFza0VmZmVjdD1tYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ21haW5UYXNrRWZmZWN0Jyk7XHJcbiAgICAgICAgbWFpblRhc2tFZmZlY3QueT1kb3duLnkrMjkwO1xyXG4gICAgICAgIGxldCBNYWluX0ljb25fSWRsZT1tYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ01haW5fSWNvbl9JZGxlJyk7XHJcbiAgICAgICAgTWFpbl9JY29uX0lkbGUueT1kb3duLnkrMTUwO1xyXG4gICAgICAgIGJ0blN0YXJ0Lnk9ZG93bi55KzE1MDtcclxuICAgICAgICBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bk9mZmxpbmVHaWZ0JykueT1idG5TdGFydC55KzgwO1xyXG4gICAgICAgIC8v5Li755WM6Z2iXHJcbiAgICAgICAgbWFpblVpLmdldENoaWxkQnlOYW1lKCdsZWZ0JykueT10b3AueS0yMDg7XHJcbiAgICAgICAgbWFpblVpLmdldENoaWxkQnlOYW1lKCdyaWdodCcpLnk9dG9wLnktMjA4O1xyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKS55Kz1vZmZzZXRZO1xyXG4gICAgICAgIC8v6KeS6Imy55WM6Z2iXHJcbiAgICAgICAgLy8gbGV0IHJvbGVVaT1jYy5maW5kKCdDYW52YXMvcm9sZV91aScpO1xyXG4gICAgICAgIC8vIHJvbGVVaS55Kz1vZmZzZXRZO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5TaG93KClcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeeahGluZGV45piv5Li75Z+O77yM6ZyA6KaB5o+Q5YmN5Yik5pat5LiA5LiL5Li75Z+O5piv5ZCm5pyJ6Kej6ZSB55qE5Yqf6IO9XHJcbiAgICAgICAgbGV0IG5ld0luZGV4PS0xO1xyXG4gICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleCh0aGlzLmN1cl9zZWxlY3RlZF9pbmRleCkpe1xyXG4gICAgICAgICAgICBuZXdJbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PT1uZXdJbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvln47miZPlvIDmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xldCBkb3duPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvZG93bicpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidG49dGhpcy5idG5zW2ldO1xyXG4gICAgICAgICAgICBsZXQgYnRucz1idG4uZ2V0Q29tcG9uZW50cyhjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW5CdG49dGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXghPWk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hbGxfdWlbaV0uYWN0aXZlPSFpc0NhbkJ0bjtcclxuICAgICAgICAgICAgdGhpcy5hbGxfdWlbaV0ub3BhY2l0eT1pc0NhbkJ0bj8wOjI1NTtcclxuICAgICAgICAgICAgdGhpcy5hbGxfdWlbaV0ueD1pc0NhbkJ0bj8tMTI4MDowO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVzW2ldLmNvbG9yID0gaXNDYW5CdG4/Y2MuY29sb3IoMjEwLDE4NCwxNDUpOmNjLmNvbG9yKDI1NSwyMzMsMjAxKTtcclxuICAgICAgICAgICAgdGhpcy5idG5zW2ldLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9ICFpc0NhbkJ0bjtcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48YnRucy5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICBidG5zW25dLmludGVyYWN0YWJsZT1pc0NhbkJ0bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0VG9wKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdG9wPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wJyk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytsZXZlbDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImF0a1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpICsgJyc7XHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhcj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRQb3J0cmFpdCcpLmdldENoaWxkQnlOYW1lKCdidG5BdmF0YXInKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXg9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKGF2YXRhckluZGV4KTtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPWN1ckV4cC9tYXhFeHA7XHJcbiAgICAgICAgaWYoSXNEZWJ1ZyAmJiBjdXJFeHAvbWF4RXhwPj0xICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9PWZhbHNlKXtcclxuICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VzZXJMZXZlbFVpKCk7XHJcbiAgICAgICAgICAgIC8vVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Vc2VyTGV2ZWwsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7fSx9KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAvL0NPSU5cclxuICAgICAgICBsZXQgY29pbkxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NvaW5MYWJlbCcpO1xyXG4gICAgICAgIGNvaW5MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSx0cnVlKTtcclxuICAgICAgICAvL+aYr+WQpumcgOimgeWKoEvmmL7npLpcclxuICAgICAgICAvL0dlbVxyXG4gICAgICAgIGxldCBnZW1MYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9nZW1MYWJlbCcpO1xyXG4gICAgICAgIGdlbUxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksdHJ1ZSk7XHJcbiAgICAgICAgLy/pvpnmmbZcclxuICAgICAgICBsZXQgY3J5c3RhbExhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NyeXN0YWxMYWJlbCcpO1xyXG4gICAgICAgIGNyeXN0YWxMYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Mb25nSmluZyksdHJ1ZSk7XHJcbiAgICAgICAgLy/miJjliptcclxuICAgICAgICBsZXQgemhhbmxpTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvemhhbmxpTGFiZWwnKTtcclxuICAgICAgICB6aGFubGlMYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCksZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUb3AoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0b3A9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AnKTtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbD10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKTtcclxuICAgICAgICBsZXQgbGV2ZWw9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTGV2ZWwoKTtcclxuICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPScnK2xldmVsO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiYXRrXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCkgKyAnJztcclxuICAgICAgICBsZXQgYnRuQXZhdGFyPXRvcC5nZXRDaGlsZEJ5TmFtZSgnaGVhZFBvcnRyYWl0JykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkF2YXRhcicpO1xyXG4gICAgICAgIGxldCBhdmF0YXJJbmRleD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUoYXZhdGFySW5kZXgpO1xyXG4gICAgICAgIC8v6L+b5bqmXHJcbiAgICAgICAgbGV0IGN1ckV4cD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJFeHAoKTtcclxuICAgICAgICBsZXQgbWF4RXhwPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKCdleHBQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3M9Y3VyRXhwL21heEV4cDtcclxuICAgICAgICBpZihJc0RlYnVnICYmIGN1ckV4cC9tYXhFeHA+PTEpe1xyXG4gICAgICAgICAgICAvL1VJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVXNlckxldmVsLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ09JTlxyXG4gICAgICAgIHRoaXMucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgLy/mmK/lkKbpnIDopoHliqBL5pi+56S6XHJcbiAgICAgICAgLy9HZW1cclxuICAgICAgICB0aGlzLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgLy/miJjliptcclxuICAgICAgICB0aGlzLnJlZnJlc2haaGFuTGlTaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENvaW5TaG93KCk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb2luTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvY29pbkxhYmVsJyk7XHJcbiAgICAgICAgY29pbkxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbiksMC41KTtcclxuICAgICAgICByZXR1cm4gY29pbkxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hHZW1TaG93KCk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnZW1MYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9nZW1MYWJlbCcpO1xyXG4gICAgICAgIGdlbUxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSwwLjUpO1xyXG4gICAgICAgIHJldHVybiBnZW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoWmhhbkxpU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHpoYW5saUxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL3poYW5saUxhYmVsJyk7XHJcbiAgICAgICAgemhhbmxpTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCksMC41LHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hMb25nSmluZygpe1xyXG4gICAgICAgIC8v6b6Z5pm2XHJcbiAgICAgICAgbGV0IGNyeXN0YWxMYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9jcnlzdGFsTGFiZWwnKTtcclxuICAgICAgICBjcnlzdGFsTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuTG9uZ0ppbmcpLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVc2VyRXhwKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdG9wPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wJyk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nTHYuJytsZXZlbDtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIGxldCBwcD1jdXJFeHAvbWF4RXhwO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPXBwO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bW9Ub1VpKGluZGV4OkJ0bl9JbmRleCl7XHJcbiAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9aW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F2YXRhcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBpY29uPXRvcC5nZXRDaGlsZEJ5TmFtZSgnYnRuU2V0dGluZycpLmdldENoaWxkQnlOYW1lKCdpY29uJyk7XHJcbiAgICAgICAgbGV0IGF2YXRhckluZGV4PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpO1xyXG4gICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycrYXZhdGFySW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgdXNlck5hbWVMYWJlbD10b3AuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJOYW1lTGFiZWwnKTtcclxuICAgICAgICB1c2VyTmFtZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTtcclxuICAgICAgICBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgLy9Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtNzUwMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5QYW9TaG91KTtcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oSGVyb19UeXBlLkRlTHVZaSk7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5MZWlTaGVuKTtcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oSGVyb19UeXBlLkdvbmdKaWFuU2hvdSk7XHJcbiAgICAgICAgLy8gW3tcImhlcm9fdHlwZVwiOjIsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjIsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfSx7XCJoZXJvX3R5cGVcIjozLFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjoyLFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX0se1wiaGVyb190eXBlXCI6NCxcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6MyxcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjEyLFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjo1LFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX0se1wiaGVyb190eXBlXCI6OCxcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6NCxcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9XVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dVaSgpe1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCB1bT1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2goZ20uZ2FtZV90b19ob21lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1NpZ246e1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkNhblNpZ25JbiwwKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW5EYWlseSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaURhaWx5KS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaExlZnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TcGluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdW0uc2hvd1NwaW5VaSh7b25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fVGFzazp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVGFzayxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQobnVsbCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9LDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaExlZnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9SYW5rOntcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdW0uc2hvd1JhbmtVaSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwxKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hSaWdodCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5Sb2xlOnRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fUm9sZTticmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLlBldExpc3Q6dGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9QZXQ7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuQ2l0eTp7XHJcbiAgICAgICAgICAgICAgICAvL2lmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5DaGVuZ0Jhb1lhbmdDaGVuZykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fQ2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VsdGl2YXRlVWk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjdWx0aXZhdGVfdWknKS5nZXRDb21wb25lbnQoQ3VsdGl2YXRlVWkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN1bHRpdmF0ZVVpLmlzX2hpbnRfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1bHRpdmF0ZVVpLmN1cl9zZWxlY3RlZF9pbmRleD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VsdGl2YXRlVWkuc2V0QnRuU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkFjdGl2aXR5OntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fRnVCZW47XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkFjdGl2aXR5X0VuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKyvml6DlsL3noa7orqTmjInpkq7pgIDlh7rmnaVcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fRnVCZW47XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkFjdGl2aXR5X0Jvc3M6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9GdUJlbjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xpY2tCdG5Eb3duKGJ0bjpjYy5FdmVudC5FdmVudFRvdWNoLGluZGV4OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBOdW1iZXIoaW5kZXgpID09IDMgfHwgXHJcbiAgICAgICAgLy8gaWYoTnVtYmVyKGluZGV4KSA9PSA0KXtcclxuICAgICAgICAvLyAgICAgbGV0IHMgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PXBhcnNlSW50KGluZGV4KTtcclxuICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD09NCl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lia/mnKzpobXpnaLlsZXnpLrmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEJ0blNob3coKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Db2luKClcclxuICAgIHtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5Db2luKVxyXG4gICAgICAgIH0sfSk7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR2VtKClcclxuICAgIHsgIFxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAvLyB9LH0pO1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spOyAgIFxyXG4gICAgICAgIGlmKGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudChIb21lKS5jdXJfc2VsZWN0ZWRfaW5kZXggPT0gQnRuX0luZGV4LkJ0bl9DaXR5KXtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3N0b3JlX3VpL3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5O1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VBbGxVaURpYWxvZyhVSUxheWVyTGV2ZWwuT25lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blNldHRpbmcoKVxyXG4gICAgeyAgXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW1MaXN0PVtdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8OTsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oTWF0aC5yYW5kb20oKTwwLjU/MjAxMTA6MjAxMTAsNSk7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oMzA0MDUsNSk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1MaXN0KTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBwcm9wRGF0YXM9bmV3IEFycmF5PFByb3BPYmplY3Q+KCk7XHJcbiAgICAgICAgLy8gbGV0IHByb3BEYXRhPW5ldyBQcm9wT2JqZWN0KCk7XHJcbiAgICAgICAgLy8gcHJvcERhdGEuaXRlbXNJZD0xMDAwMlxyXG4gICAgICAgIC8vIHByb3BEYXRhLml0ZW1zTnVtPTEwMDAwMDtcclxuICAgICAgICAvLyBwcm9wRGF0YXMucHVzaChwcm9wRGF0YSk7XHJcbiAgICAgICAgLy8gLy8gbGV0IHByb3BEYXRhMT1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhMS5pdGVtc0lkPTEwMDA0XHJcbiAgICAgICAgLy8gLy8gcHJvcERhdGExLml0ZW1zTnVtPTMyO1xyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhcy5wdXNoKHByb3BEYXRhMSk7XHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5IdHRwQWRkUHJvcERhdGEocHJvcERhdGFzKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzA0KTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAxKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAyKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KDMwMzAzKTtcclxuICAgICAgICAvLyBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbEVxdWlwbWVudExpc3QoKTtcclxuICAgICAgICAvLyBsZXQgY29zdExpc3Q9bmV3IEFycmF5PENvc3REYXRhPigpO1xyXG4gICAgICAgIC8vIGxldCBpc0Nhbj1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tBRXF1aXBNZXJnZSgzMDMwNCxjb3N0TGlzdCk7XHJcbiAgICAgICAgLy8gaWYoaXNDYW4pe1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coSlNPTi5zdHJpbmdpZnkoY29zdExpc3QpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1NldHRpbmcoe1xyXG4gICAgICAgIC8vICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICAvLyAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZpcFN5c3RlbSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChWaXBTeXN0ZW0pLmluaVVpKClcclxuICAgICAgICAvLyB9LH0pOy8v5Lya5ZGY57O757ufICBWSVDns7vnu59cclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKENoYWxsZW5nZU1vZGUuTm9hbWFsKTtcclxuICAgICAgICAvLyAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmFua2luZ0xpc3QsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmFua2luZ0xpc3QpLmluaXRVaSgpXHJcbiAgICAgICAgLy8gfSx9KTsvL+aOkuihjOamnFxyXG4gICAgICAgIC8vIHJldHVybjtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlR1cm50YWJsZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgLy8gfSx9KTsvL+i9rOebmFxyXG4gICAgICAgIC8vIHJldHVybjtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNldCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTZXR0aW5nVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhDaGFsbGVuZ2VNb2RlLk5vYW1hbCk7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0VG9Jc3N1ZWQoVVJMX1RZUEUuc3ViVXNlckl0ZW1zTnVtLEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAvLyAgICAgXCJ1aWRcIjpcIlpSMTY0ODYwNzQ3OTBhMFwiLCAvL+eUqOaIt+agh+ivhmlkXHJcbiAgICAgICAgLy8gICAgIFwiaXRlbVZvTGlzdFwiOltcclxuICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBcIml0ZW1zSWRcIjoxMDAwMSwgLy/pgZPlhbdpZFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNOdW1cIjotMjAgLy/mlrDlop7miJblh4/lsJHmlbDph49cclxuICAgICAgICAvLyAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJpdGVtc0lkXCI6MTAwMDQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJpdGVtc051bVwiOi0yMFxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICBdXHJcbiAgICAgICAgLy8gfSksKGRhdGEpPT57XHJcbiAgICAgICAgLy8gICAgIGNjLmxvZyhkYXRhKTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC8vUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zeW5jUHJvcERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWFwVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNpdHlMb2NrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0NpdHkpPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLlh1WXVhbkNoaSlcclxuICAgICAgICAgICAgbGV0IG51bT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5YdVl1YW5DaGkpXHJcbiAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK251bSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW0pXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BY3Rpdml0eUxvY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pXHJcbiAgICAgICAgICAgIGxldCBudW09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuV3VKaW5UaWFvWmhhbilcclxuICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bSlcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blBldExvY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fUGV0KT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKVxyXG4gICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpXHJcbiAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK251bSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW0pXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5MZXZlbExhYmVsKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDMxMDAwMiksMyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CYWcoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCYWdVaShudWxsKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJhZyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCYWdVaSkuaW5pdChudWxsKTtcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGFUZXN0KCl7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApPD0wKXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGaXJzdERvKEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApXHJcbiAgICAgICAgICAgICAgICBsZXQgZW09RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPUVxdWlwVHlwZS5XdVFpOyBpPEVxdWlwVHlwZS5OdW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaD1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91OyBoPEhlcm9fVHlwZS5IZXJvX051bTsgaCsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvTGlzdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGhlcm9MaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUhlcm9RdWFsaXR5KGksMzYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUhlcm9MZXZlbChpLDE2MCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDEpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAyKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA1KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDcpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA4KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTApO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjExKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE0KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTYpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE3KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxOCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTkpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjIpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIzKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyNCk7XHJcbiAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw9MjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dSZW1haW5UaW1lKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBpZihHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLm5FbmVyZ3k8R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRNYXhFbmVyZ3koKSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVtYWluX2xhYmVsLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAvLyAgICAgICAgIGxldCBwcmV2VD1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEdldEVuZXJneVRpbWUoKTtcclxuICAgIC8vICAgICAgICAgbGV0IGN1clQ9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBvZmZzZXRUaW1lPU1hdGguZmxvb3IoKGN1clQtcHJldlQpLzEwMDApO1xyXG4gICAgLy8gICAgICAgICBsZXQgZmVuPU1hdGguZmxvb3Iob2Zmc2V0VGltZS82MCk7XHJcbiAgICAvLyAgICAgICAgIGlmKGZlbj49NSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy/nrpflh7rmnInlpJrlsJHliIZcclxuICAgIC8vICAgICAgICAgICAgIGxldCBhZGRFbmVyZ3k9TWF0aC5mbG9vcihmZW4vNSk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmNoYW5nZUVuZXJneShhZGRFbmVyZ3kpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlR2V0RW5lcmd5VGltZShwcmV2VCthZGRFbmVyZ3kqNSo2MCoxMDAwKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucmVmcmVzaEVuZXJneVNob3coKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBsZXQgcmVtYWluVGltZT01KjYwLW9mZnNldFRpbWU7XHJcbiAgICAvLyAgICAgICAgIGZlbj1NYXRoLmZsb29yKHJlbWFpblRpbWUvNjApO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWlhbz1yZW1haW5UaW1lJTYwO1xyXG4gICAgLy8gICAgICAgICBpZihtaWFvPDEwKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5zdHJpbmc9XCIwXCIrZmVuK1wiOjBcIittaWFvO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5zdHJpbmc9XCIwXCIrZmVuK1wiOlwiK21pYW87XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgLy90aGlzLnRvcF9mcmVlLng9Mzk1O1xyXG4gICAgLy8gICAgIH1lbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIC8vICAgICAgICAgLy90aGlzLnRvcF9mcmVlLng9MzU1O1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxufVxyXG4iXX0=