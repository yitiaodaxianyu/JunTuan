
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSG9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpRkFBdUY7QUFHdkYsNkNBQXdDO0FBRXhDLHFDQUFnQztBQUNoQyx5Q0FBd0Y7QUFFeEYsdURBQThEO0FBQzlELGlFQUFnRTtBQUNoRSx1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCxxREFBbUQ7QUFHbkQsb0VBQTBFO0FBRTFFLDBEQUFnRTtBQUNoRSxxREFBb0Q7QUFDcEQsa0RBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCwrREFBMEQ7QUFDMUQsbUVBQThEO0FBQzlELCtEQUEwRDtBQUMxRCxtREFBa0Q7QUFDbEQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUVqRCx5REFBZ0U7QUFDaEUseURBQXFEO0FBQ3JELDJEQUE2RDtBQUc3RCw0Q0FBMkM7QUFDM0Msa0RBQTZDO0FBRzdDLG1EQUE4QztBQUU5QyxxREFBZ0Q7QUFDaEQsaUVBQTREO0FBQzVELHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLDJDQUFzQztBQUN0QyxxREFBZ0Q7QUFFaEQsMENBQXFEO0FBQ3JELDRDQUEyQztBQUMzQyx1Q0FBa0M7QUFHNUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUF3dEJDO1FBdHRCRyx3QkFBa0IsR0FBVyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztRQUVoRCxZQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXBCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsV0FBSyxHQUFXLEVBQUUsQ0FBQzs7UUE2cUJuQixtQkFBbUI7UUFDbkIsSUFBSTtRQUNKLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsOENBQThDO1FBQzlDLCtEQUErRDtRQUMvRCx5Q0FB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QyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUM7YUFDOUM7U0FDSjtJQUNMLENBQUM7O0lBL3FCRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDQTtJQUVwQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztzQ0FDRjtJQUVsQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt1Q0FDRDtJQVJGLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0F3dEJ4QjtJQUFELFdBQUM7Q0F4dEJELEFBd3RCQyxDQXh0QmlDLEVBQUUsQ0FBQyxTQUFTLEdBd3RCN0M7a0JBeHRCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi9BY2N1bXVsYXRlZFJlY2hhcmdlL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIsIENoYWxsZW5nZU1vZGUgfSBmcm9tIFwiLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuL0Fkcy9BZE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4vQ29pblBvcFwiO1xyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEZ1bmNUeXBlLCBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHb19UeXBlLCBJc0RlYnVnfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBDb3N0RGF0YSwgRXF1aXBUeXBlIH0gZnJvbSBcIi4vRXF1aXBtZW50L0VxdWlwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvTGlzdFVpIGZyb20gXCIuL0hlcm8vVWkvSGVyb0xpc3RVaVwiO1xyXG5pbXBvcnQgUm9sZVVpIGZyb20gXCIuL0hlcm8vVWkvUm9sZVVpXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUmV3YXJkSGVyb0RhdGEgfSBmcm9tIFwiLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IFBsYXllckxldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4vUGF5bWVudC9QYXlGaXJzdENoYXJnZVVpXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgUmFua2luZ0xpc3QgZnJvbSBcIi4vUmFua2luZ0xpc3QvUmFua2luZ0xpc3RcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERhaWx5U2hvcE1hbmFnZXIgfSBmcm9tIFwiLi9TdG9yZS9EYWlseVNob3BcIjtcclxuaW1wb3J0IFN0b3JlSGVyb1VpIGZyb20gXCIuL1N0b3JlL1N0b3JlSGVyb1VpXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuL1Rhc2svVGFza1VpXCI7XHJcbmltcG9ydCB7IFBheVVpSW5kZXggfSBmcm9tIFwiLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IE51bWJlckxhYmVsIGZyb20gXCIuL1Rvb2xzL051bWJlckxhYmVsXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgUmV3YXJkU1NVaSBmcm9tIFwiLi9UdXRvcmlhbHMvUmV3YXJkU1NVaVwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFnVWkgZnJvbSBcIi4vVUkvaG9tZS9CYWdVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCBTZXR0aW5nVWkgZnJvbSBcIi4vVUkvaG9tZS9TZXR0aW5nVWlcIjtcclxuaW1wb3J0IFNpZ25VaSBmcm9tIFwiLi9VSS9ob21lL1NpZ25VaVwiO1xyXG5pbXBvcnQgU2lnblVpRGFpbHkgZnJvbSBcIi4vVUkvaG9tZS9TaWduVWlEYWlseVwiO1xyXG5pbXBvcnQgVG9QbGF5TWFpblVpIGZyb20gXCIuL1VJL2hvbWUvVG9QbGF5TWFpblVpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgVmlwU3lzdGVtIGZyb20gXCIuL1ZpcFN5c3RlbS9WaXBTeXN0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgY3VyX3NlbGVjdGVkX2luZGV4OkJ0bl9JbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgYWxsX3VpOmNjLk5vZGVbXT1bXTtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBidG5zOmNjLk5vZGVbXT1bXTtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBuYW1lczpjYy5Ob2RlW109W107XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u55m75b2VWOasoea4uOaIjyk7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7nmbvlvZXmuLjmiI8x5qyhKTtcclxuICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvZGF5SXNGaXJzdExvZ0luLDApID09IDApe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub2RheUlzRmlyc3RMb2dJbiwxKVxyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLue0r+iuoeeZu+W9lVjlpKkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmRlYnVnLnNldERpc3BsYXlTdGF0cyhJc0RlYnVnKTtcclxuICAgICAgICAvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZEFsbEhlcm9EYXRhKCk7XHJcbiAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QW5kcm9pZElkKCk7XHJcbiAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInmlZnnqItcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICAgICAgdGhpcy5jaGVha1VubG9jaygpO1xyXG4gICAgICAgIC8vdGhpcy5kYXRhVGVzdCgpO1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAod2luZG93LnZDb25zb2xlKSB7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy52Q29uc29sZS5kZXN0cm95KCk7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy52Q29uc29sZSA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldEhlcm9CaW5kKCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5ouJ5Y+W5pyN5Yqh5Zmo5pe26Ze0XHJcbiAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoU2VydmVyVGltZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRSYXRlKCk7XHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuZ2V0Wm9uZ1poYW5MaUpzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX0hvbWUpO1xyXG4gICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoei/m+WFpeS4u+mhtSk8PTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXkuLvpobUpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Li76aG1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlYWtEWUluZm8oKTtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldElzU2lnblRvZGF5KCkgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuUWlhbkRhbykpXHJcbiAgICAgICAgICAgICAgICBnbS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluX1NpZ247XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5GaXJzdENoYXJnZSkmJlBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2MzMDEnKTw9MCYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5VaT1jYy5maW5kKFwiQ2FudmFzL21haW5fdWlcIikuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpblVpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9LDEpICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+agueaNrmdhbWVfdG9faG9tZeiuvue9ruaYvuekuueahOeVjOmdolxyXG4gICAgICAgIHRoaXMuc2hvd1VpKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VG9wKCk7XHJcbiAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7ICAgICAgXHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTIwMCk7XHJcbiAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLDIwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGNoZWNrVHV0b3JhaWxzKCk6Ym9vbGVhbntcclxuICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaClcclxuICAgICAgICB7ICAgLy/ot7PovazliLDllYblnLpcclxuICAgICAgICAgICAgLy8gbGV0IGZpbmlzaExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICAgICAgLy8gaWYoZmluaXNoTGV2ZWw8NSl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMikmJmZpbmlzaExldmVsPj0zKVxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5pWZ56iLXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5by65Yi25pi+56S65ZWG5Z+O6aG1XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBidG5TdGFydD1jYy5maW5kKCdDYW52YXMvbWFpbl91aS9idG5TdGFydCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCB3b3JkUG9zPWJ0blN0YXJ0LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuU3RhcnQuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbG9jYWxQb3MueC09Y2MuZmluZCgnQ2FudmFzL21haW5fdWknKS54O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwMSxudWxsLCgpPT57XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB9ICAgICBcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpKXtcclxuICAgICAgICAgICAgICAgIC8vMjE45a6M5oiQ5pi+56S6XHJcbiAgICAgICAgICAgICAgICAvL+WNh+e6p+W8leWvvFxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5Sb2xlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzExKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzEyKSl7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuiLsembhOmhtVxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5Sb2xlOyBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw+PTUgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgICAgICB9LDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWFrVW5sb2NrKCl7XHJcbiAgICAgICAgbGV0IGJ0bkNpdHk9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0bkNpdHknKTtcclxuICAgICAgICAvLyBidG5DaXR5LmdldENoaWxkQnlOYW1lKCdsb2NrJykuYWN0aXZlPSFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0NpdHkpO1xyXG5cclxuICAgICAgICBsZXQgYnRuRnVCZW49Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0bkZ1QmVuJyk7XHJcbiAgICAgICAgLy8gYnRuRnVCZW4uZ2V0Q2hpbGRCeU5hbWUoJ2xvY2snKS5hY3RpdmU9IUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pO1xyXG4gICAgICAgIGxldCBidG5QZXQ9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0blBldCcpO1xyXG4gICAgICAgIC8vIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBidG5QZXQ9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS9kb3duL2J0blBldCcpO1xyXG4gICAgICAgIC8vICAgICBidG5QZXQuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvYWRpbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXI9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbD1sb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzO1xyXG4gICAgICAgIGxvYWRMYWJlbC5zdHJpbmc9KGxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXQoR2FtZVNjZW5lLmhvbWUpO1xyXG4gICAgICAgIGxldCBsb2FkaW5nU2NoZWR1bGU9KCk9PntcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcys9MC4wMTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBpZihsb2FkaW5nQmFyLnByb2dyZXNzPj0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzPTE7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2xvYWRlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShsb2FkaW5nU2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZT1udWxsOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUobG9hZGluZ1NjaGVkdWxlLDAuMDIpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIC8v5LiK5LiL5qih5Z2XICAgICAgICBcclxuICAgICAgICBsZXQgdG9wVWk9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaScpO1xyXG4gICAgICAgIGxldCBkb3duPXRvcFVpLmdldENoaWxkQnlOYW1lKCdkb3duJyk7XHJcbiAgICAgICAgbGV0IHRvcD10b3BVaS5nZXRDaGlsZEJ5TmFtZSgndG9wJyk7XHJcbiAgICAgICAgbGV0IG9mZnNldFk9dG9wLnk7XHJcbiAgICAgICAgbGV0IHdwPWNjLndpblNpemU7XHJcbiAgICAgICAgZG93bi55PS13cC5oZWlnaHQvMitkb3duLmhlaWdodC8yO1xyXG4gICAgICAgIHRvcC55PXdwLmhlaWdodC8yLXRvcC5oZWlnaHQvMjtcclxuICAgICAgICBvZmZzZXRZPXRvcC55LW9mZnNldFk7XHJcbiAgICAgICAgLy/lvIDlp4vmjInpkq5cclxuICAgICAgICBsZXQgbWFpblVpPWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJyk7XHJcbiAgICAgICAgbGV0IGJ0blN0YXJ0PW1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnYnRuU3RhcnQnKTtcclxuICAgICAgICBsZXQgTWFpbl9JY29uX01hcD1tYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ01haW5fSWNvbl9NYXAnKTtcclxuICAgICAgICBNYWluX0ljb25fTWFwLnk9ZG93bi55KzE1MDtcclxuICAgICAgICBsZXQgbWFpblRhc2s9bWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFzaycpO1xyXG4gICAgICAgIG1haW5UYXNrLnk9ZG93bi55KzI5MDtcclxuICAgICAgICBsZXQgbWFpblRhc2tFZmZlY3Q9bWFpblVpLmdldENoaWxkQnlOYW1lKCdtYWluVGFza0VmZmVjdCcpO1xyXG4gICAgICAgIG1haW5UYXNrRWZmZWN0Lnk9ZG93bi55KzI5MDtcclxuICAgICAgICBsZXQgTWFpbl9JY29uX0lkbGU9bWFpblVpLmdldENoaWxkQnlOYW1lKCdNYWluX0ljb25fSWRsZScpO1xyXG4gICAgICAgIE1haW5fSWNvbl9JZGxlLnk9ZG93bi55KzE1MDtcclxuICAgICAgICBidG5TdGFydC55PWRvd24ueSsxNTA7XHJcbiAgICAgICAgbWFpblVpLmdldENoaWxkQnlOYW1lKCdidG5PZmZsaW5lR2lmdCcpLnk9YnRuU3RhcnQueSs4MDtcclxuICAgICAgICAvL+S4u+eVjOmdolxyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpLnk9dG9wLnktMjA4O1xyXG4gICAgICAgIG1haW5VaS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKS55PXRvcC55LTIwODtcclxuICAgICAgICBtYWluVWkuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykueSs9b2Zmc2V0WTtcclxuICAgICAgICAvL+inkuiJsueVjOmdolxyXG4gICAgICAgIC8vIGxldCByb2xlVWk9Y2MuZmluZCgnQ2FudmFzL3JvbGVfdWknKTtcclxuICAgICAgICAvLyByb2xlVWkueSs9b2Zmc2V0WTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnRuU2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3nmoRpbmRleOaYr+S4u+Wfju+8jOmcgOimgeaPkOWJjeWIpOaWreS4gOS4i+S4u+WfjuaYr+WQpuacieino+mUgeeahOWKn+iDvVxyXG4gICAgICAgIGxldCBuZXdJbmRleD0tMTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXgpKXtcclxuICAgICAgICAgICAgbmV3SW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD09bmV3SW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4ID09IDApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li75Z+O5omT5byA5qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sZXQgZG93bj1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24nKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTw1OyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnRuPXRoaXMuYnRuc1tpXTtcclxuICAgICAgICAgICAgbGV0IGJ0bnM9YnRuLmdldENvbXBvbmVudHMoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuQnRuPXRoaXMuY3VyX3NlbGVjdGVkX2luZGV4IT1pO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWxsX3VpW2ldLmFjdGl2ZT0haXNDYW5CdG47XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3VpW2ldLm9wYWNpdHk9aXNDYW5CdG4/MDoyNTU7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3VpW2ldLng9aXNDYW5CdG4/LTEyODA6MDtcclxuICAgICAgICAgICAgdGhpcy5uYW1lc1tpXS5jb2xvciA9IGlzQ2FuQnRuP2NjLmNvbG9yKDIxMCwxODQsMTQ1KTpjYy5jb2xvcigyNTUsMjMzLDIwMSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuc1tpXS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSAhaXNDYW5CdG47XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGJ0bnMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgYnRuc1tuXS5pbnRlcmFjdGFibGU9aXNDYW5CdG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsPXRvcC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9JycrbGV2ZWw7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKSArICcnO1xyXG4gICAgICAgIGxldCBidG5BdmF0YXI9dG9wLmdldENoaWxkQnlOYW1lKCdoZWFkUG9ydHJhaXQnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuQXZhdGFyJyk7XHJcbiAgICAgICAgbGV0IGF2YXRhckluZGV4PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpO1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShhdmF0YXJJbmRleCk7XHJcbiAgICAgICAgLy/ov5vluqZcclxuICAgICAgICBsZXQgY3VyRXhwPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckV4cCgpO1xyXG4gICAgICAgIGxldCBtYXhFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2V4cFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1jdXJFeHAvbWF4RXhwO1xyXG4gICAgICAgIGlmKElzRGVidWcgJiYgY3VyRXhwL21heEV4cD49MSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVc2VyTGV2ZWxVaSgpO1xyXG4gICAgICAgICAgICAvL1VJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVXNlckxldmVsLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgLy9DT0lOXHJcbiAgICAgICAgbGV0IGNvaW5MYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9jb2luTGFiZWwnKTtcclxuICAgICAgICBjb2luTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbiksdHJ1ZSk7XHJcbiAgICAgICAgLy/mmK/lkKbpnIDopoHliqBL5pi+56S6XHJcbiAgICAgICAgLy9HZW1cclxuICAgICAgICBsZXQgZ2VtTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvZ2VtTGFiZWwnKTtcclxuICAgICAgICBnZW1MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pLHRydWUpO1xyXG4gICAgICAgIC8v6b6Z5pm2XHJcbiAgICAgICAgbGV0IGNyeXN0YWxMYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9jcnlzdGFsTGFiZWwnKTtcclxuICAgICAgICBjcnlzdGFsTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuTG9uZ0ppbmcpLHRydWUpO1xyXG4gICAgICAgIC8v5oiY5YqbXHJcbiAgICAgICAgbGV0IHpoYW5saUxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL3poYW5saUxhYmVsJyk7XHJcbiAgICAgICAgemhhbmxpTGFiZWwuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG9wKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdG9wPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wJyk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytsZXZlbDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImF0a1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpICsgJyc7XHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhcj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRQb3J0cmFpdCcpLmdldENoaWxkQnlOYW1lKCdidG5BdmF0YXInKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXg9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKGF2YXRhckluZGV4KTtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPWN1ckV4cC9tYXhFeHA7XHJcbiAgICAgICAgaWYoSXNEZWJ1ZyAmJiBjdXJFeHAvbWF4RXhwPj0xKXtcclxuICAgICAgICAgICAgLy9VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlVzZXJMZXZlbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NPSU5cclxuICAgICAgICB0aGlzLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgIC8v5piv5ZCm6ZyA6KaB5YqgS+aYvuekulxyXG4gICAgICAgIC8vR2VtXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgIC8v5oiY5YqbXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoWmhhbkxpU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDb2luU2hvdygpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgY29pbkxhYmVsPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvdG9wL2NvaW5MYWJlbCcpO1xyXG4gICAgICAgIGNvaW5MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLDAuNSk7XHJcbiAgICAgICAgcmV0dXJuIGNvaW5MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoR2VtU2hvdygpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgZ2VtTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvZ2VtTGFiZWwnKTtcclxuICAgICAgICBnZW1MYWJlbC5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksMC41KTtcclxuICAgICAgICByZXR1cm4gZ2VtTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFpoYW5MaVNob3coKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB6aGFubGlMYWJlbD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC96aGFubGlMYWJlbCcpO1xyXG4gICAgICAgIHpoYW5saUxhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLDAuNSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTG9uZ0ppbmcoKXtcclxuICAgICAgICAvL+m+meaZtlxyXG4gICAgICAgIGxldCBjcnlzdGFsTGFiZWw9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvY3J5c3RhbExhYmVsJyk7XHJcbiAgICAgICAgY3J5c3RhbExhYmVsLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkxvbmdKaW5nKSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVXNlckV4cCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcD1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcCcpO1xyXG4gICAgICAgIGxldCBsZXZlbExhYmVsPXRvcC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J0x2LicrbGV2ZWw7XHJcbiAgICAgICAgLy/ov5vluqZcclxuICAgICAgICBsZXQgY3VyRXhwPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckV4cCgpO1xyXG4gICAgICAgIGxldCBtYXhFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTtcclxuICAgICAgICBsZXQgcHA9Y3VyRXhwL21heEV4cDtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2V4cFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1wcDtcclxuICAgIH1cclxuXHJcbiAgICBqdW1vVG9VaShpbmRleDpCdG5fSW5kZXgpe1xyXG4gICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PWluZGV4O1xyXG4gICAgICAgIHRoaXMuc2V0QnRuU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0b3A9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AnKTtcclxuICAgICAgICBsZXQgaWNvbj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2J0blNldHRpbmcnKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgIGxldCBhdmF0YXJJbmRleD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICBpY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK2F2YXRhckluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHVzZXJOYW1lTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCd1c2VyTmFtZUxhYmVsJyk7XHJcbiAgICAgICAgdXNlck5hbWVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIC8vUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTc1MDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuUGFvU2hvdSk7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5TaG91V2FuZyk7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5EZUx1WWkpO1xyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhIZXJvX1R5cGUuTGVpU2hlbik7XHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKEhlcm9fVHlwZS5Hb25nSmlhblNob3UpO1xyXG4gICAgICAgIC8vIFt7XCJoZXJvX3R5cGVcIjoyLFwiaGVyb19sZXZlbFwiOjEsXCJoZXJvX3F1YWxpdHlcIjoyLFwiaGVyb19zdGFnZVwiOjAsXCJwZXRfaW5mb1wiOm51bGwsXCJleGNsdXNpdmVfZXF1aXBfbGV2ZWxcIjotMX0se1wiaGVyb190eXBlXCI6MyxcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6MixcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjQsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjMsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfSx7XCJoZXJvX3R5cGVcIjoxMixcImhlcm9fbGV2ZWxcIjoxLFwiaGVyb19xdWFsaXR5XCI6NSxcImhlcm9fc3RhZ2VcIjowLFwicGV0X2luZm9cIjpudWxsLFwiZXhjbHVzaXZlX2VxdWlwX2xldmVsXCI6LTF9LHtcImhlcm9fdHlwZVwiOjgsXCJoZXJvX2xldmVsXCI6MSxcImhlcm9fcXVhbGl0eVwiOjQsXCJoZXJvX3N0YWdlXCI6MCxcInBldF9pbmZvXCI6bnVsbCxcImV4Y2x1c2l2ZV9lcXVpcF9sZXZlbFwiOi0xfV1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VWkoKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgdW09VUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoKGdtLmdhbWVfdG9faG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fTWFpbjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TaWduOntcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5DYW5TaWduSW4sMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5PdmVyLDApID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2lnbkluRGFpbHksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWlEYWlseSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fU3Bpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVtLnNob3dTcGluVWkoe29uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hSaWdodCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1Rhc2s6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9QnRuX0luZGV4LkJ0bl9NYWluO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRhc2ssVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KG51bGwpOyBcclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fUmFuazp7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX01haW47XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVtLnNob3dSYW5rVWkoKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoUmlnaHQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuUm9sZTp0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX1JvbGU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5QZXRMaXN0OnRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fUGV0OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLkNpdHk6e1xyXG4gICAgICAgICAgICAgICAgLy9pZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuQ2hlbmdCYW9ZYW5nQ2hlbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0NpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1bHRpdmF0ZVVpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY3VsdGl2YXRlX3VpJykuZ2V0Q29tcG9uZW50KEN1bHRpdmF0ZVVpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjdWx0aXZhdGVVaS5pc19oaW50X3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdWx0aXZhdGVVaS5jdXJfc2VsZWN0ZWRfaW5kZXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1bHRpdmF0ZVVpLnNldEJ0blNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eV9FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysr5peg5bC956Gu6K6k5oyJ6ZKu6YCA5Ye65p2lXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1CdG5fSW5kZXguQnRuX0Z1QmVuO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5BY3Rpdml0eV9Cb3NzOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PUJ0bl9JbmRleC5CdG5fRnVCZW47XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsaWNrQnRuRG93bihidG46Y2MuRXZlbnQuRXZlbnRUb3VjaCxpbmRleDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gTnVtYmVyKGluZGV4KSA9PSAzIHx8IFxyXG4gICAgICAgIC8vIGlmKE51bWJlcihpbmRleCkgPT0gNCl7XHJcbiAgICAgICAgLy8gICAgIGxldCBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKTtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD1wYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9PTQpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Ymv5pys6aG16Z2i5bGV56S65qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCdG5TaG93KCk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ29pbigpXHJcbiAgICB7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuQ29pbilcclxuICAgICAgICB9LH0pO1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdlbSgpXHJcbiAgICB7ICBcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgLy8gfSx9KTtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBnbS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICBcclxuICAgICAgICBpZihjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoSG9tZSkuY3VyX3NlbGVjdGVkX2luZGV4ID09IEJ0bl9JbmRleC5CdG5fQ2l0eSl7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TZXR0aW5nKClcclxuICAgIHsgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtTGlzdD1bXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDk7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKE1hdGgucmFuZG9tKCk8MC41PzIwMTEwOjIwMTEwLDUpO1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKDMwNDA1LDUpO1xyXG4gICAgICAgIC8vICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChpdGVtTGlzdCk7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgcHJvcERhdGFzPW5ldyBBcnJheTxQcm9wT2JqZWN0PigpO1xyXG4gICAgICAgIC8vIGxldCBwcm9wRGF0YT1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgIC8vIHByb3BEYXRhLml0ZW1zSWQ9MTAwMDJcclxuICAgICAgICAvLyBwcm9wRGF0YS5pdGVtc051bT0xMDAwMDA7XHJcbiAgICAgICAgLy8gcHJvcERhdGFzLnB1c2gocHJvcERhdGEpO1xyXG4gICAgICAgIC8vIC8vIGxldCBwcm9wRGF0YTE9bmV3IFByb3BPYmplY3QoKTtcclxuICAgICAgICAvLyAvLyBwcm9wRGF0YTEuaXRlbXNJZD0xMDAwNFxyXG4gICAgICAgIC8vIC8vIHByb3BEYXRhMS5pdGVtc051bT0zMjtcclxuICAgICAgICAvLyAvLyBwcm9wRGF0YXMucHVzaChwcm9wRGF0YTEpO1xyXG4gICAgICAgIC8vIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuSHR0cEFkZFByb3BEYXRhKHByb3BEYXRhcyk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwNCk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMSk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMik7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudCgzMDMwMyk7XHJcbiAgICAgICAgLy8gRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxFcXVpcG1lbnRMaXN0KCk7XHJcbiAgICAgICAgLy8gbGV0IGNvc3RMaXN0PW5ldyBBcnJheTxDb3N0RGF0YT4oKTtcclxuICAgICAgICAvLyBsZXQgaXNDYW49RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQUVxdWlwTWVyZ2UoMzAzMDQsY29zdExpc3QpO1xyXG4gICAgICAgIC8vIGlmKGlzQ2FuKXtcclxuICAgICAgICAvLyAgICAgY2MubG9nKEpTT04uc3RyaW5naWZ5KGNvc3RMaXN0KSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTZXR0aW5nKHtcclxuICAgICAgICAvLyAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7XHJcbiAgICAgICAgLy8gICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WaXBTeXN0ZW0sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5pbmlVaSgpXHJcbiAgICAgICAgLy8gfSx9KTsvL+S8muWRmOezu+e7nyAgVklQ57O757ufXHJcbiAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhDaGFsbGVuZ2VNb2RlLk5vYW1hbCk7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtpbmdMaXN0KS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/mjpLooYzmppxcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5pbml0VWkoKVxyXG4gICAgICAgIC8vIH0sfSk7Ly/ovaznm5hcclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TZXQsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2V0dGluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sfSlcclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQ2hhbGxlbmdlTW9kZS5Ob2FtYWwpO1xyXG4gICAgICAgIC8vICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdFRvSXNzdWVkKFVSTF9UWVBFLnN1YlVzZXJJdGVtc051bSxKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgLy8gICAgIFwidWlkXCI6XCJaUjE2NDg2MDc0NzkwYTBcIiwgLy/nlKjmiLfmoIfor4ZpZFxyXG4gICAgICAgIC8vICAgICBcIml0ZW1Wb0xpc3RcIjpbXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgXCJpdGVtc0lkXCI6MTAwMDEsIC8v6YGT5YW3aWRcclxuICAgICAgICAvLyAgICAgICAgICAgICBcIml0ZW1zTnVtXCI6LTIwIC8v5paw5aKe5oiW5YeP5bCR5pWw6YePXHJcbiAgICAgICAgLy8gICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNJZFwiOjEwMDA0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwiaXRlbXNOdW1cIjotMjBcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgXVxyXG4gICAgICAgIC8vIH0pLChkYXRhKT0+e1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coZGF0YSk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvL1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3luY1Byb3BEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hcFVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2V0QWN0aXZpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DaXR5TG9jaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9DaXR5KT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5YdVl1YW5DaGkpXHJcbiAgICAgICAgICAgIGxldCBudW09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuWHVZdWFuQ2hpKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQWN0aXZpdHlMb2NrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX0Z1QmVuKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pXHJcbiAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK251bSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW0pXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5QZXRMb2NrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX1BldCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHR5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZylcclxuICAgICAgICAgICAgbGV0IG51bT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGV2ZWxMYWJlbCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgzMTAwMDIpLDMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQmFnKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QmFnVWkobnVsbCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CYWcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhVGVzdCgpe1xyXG4gICAgICAgIGlmKElzRGVidWcpe1xyXG4gICAgICAgICAgICBpZihGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3REbyhGb2xsb3dfVHlwZS5Mb2Fk6aG15bGV56S65oC75qyh5pWwKTw9MCl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS5Mb2Fk6aG15bGV56S65oC75qyh5pWwKVxyXG4gICAgICAgICAgICAgICAgbGV0IGVtPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGg9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTsgaDxIZXJvX1R5cGUuSGVyb19OdW07IGgrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVIZXJvUXVhbGl0eShpLDM2KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVIZXJvTGV2ZWwoaSwxNjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAxKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDMpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA0KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDYpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA3KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDkpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTIpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTUpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE2KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTgpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE5KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjEpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIyKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjQpO1xyXG4gICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPTIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93UmVtYWluVGltZSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYoR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5uRW5lcmd5PEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0TWF4RW5lcmd5KCkpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlbWFpbl9sYWJlbC5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgLy8gICAgICAgICBsZXQgcHJldlQ9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRHZXRFbmVyZ3lUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBjdXJUPW5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0VGltZT1NYXRoLmZsb29yKChjdXJULXByZXZUKS8xMDAwKTtcclxuICAgIC8vICAgICAgICAgbGV0IGZlbj1NYXRoLmZsb29yKG9mZnNldFRpbWUvNjApO1xyXG4gICAgLy8gICAgICAgICBpZihmZW4+PTUpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIC8v566X5Ye65pyJ5aSa5bCR5YiGXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgYWRkRW5lcmd5PU1hdGguZmxvb3IoZmVuLzUpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VFbmVyZ3koYWRkRW5lcmd5KTtcclxuICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUdldEVuZXJneVRpbWUocHJldlQrYWRkRW5lcmd5KjUqNjAqMTAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZnJlc2hFbmVyZ3lTaG93KCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgbGV0IHJlbWFpblRpbWU9NSo2MC1vZmZzZXRUaW1lO1xyXG4gICAgLy8gICAgICAgICBmZW49TWF0aC5mbG9vcihyZW1haW5UaW1lLzYwKTtcclxuICAgIC8vICAgICAgICAgbGV0IG1pYW89cmVtYWluVGltZSU2MDtcclxuICAgIC8vICAgICAgICAgaWYobWlhbzwxMClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjowXCIrbWlhbztcclxuICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwuc3RyaW5nPVwiMFwiK2ZlbitcIjpcIittaWFvO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM5NTtcclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5yZW1haW5fbGFiZWwubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy50b3BfZnJlZS54PTM1NTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbn1cclxuIl19