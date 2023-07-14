
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/GameWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45e47f/rQtKjI6gwyq353eo', 'GameWin');
// Scripts/Game/Ui/GameWin.ts

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
var HttpManager_1 = require("../.././NetWork/HttpManager");
var BossChallenge_1 = require("../../Activity/BossChallenge");
var BossReward_1 = require("../../Activity/BossReward");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var EndlessReward_1 = require("../../Activity/EndlessReward");
var AdManager_1 = require("../../Ads/AdManager");
var Constants_1 = require("../../Constants");
var RogueHexagonTypes_1 = require("../../copy/voidcrack/RogueHexagonTypes");
var GameManager_1 = require("../../GameManager");
var MapManager_1 = require("../../GuaJi/MapManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Jackpot_1 = require("../../JsonData/Jackpot");
var PlayerLevelUp_1 = require("../../JsonData/PlayerLevelUp");
var FirstCompleteReward_1 = require("../../Level/FirstCompleteReward");
var LevelManager_1 = require("../../Level/LevelManager");
var MissionLevel_1 = require("../../Level/MissionLevel");
var TutorialLevel_1 = require("../../Level/TutorialLevel");
var MazeManager_1 = require("../../Maze/MazeManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var TowerLevel_1 = require("../../Tower/TowerLevel");
var TowerManager_1 = require("../../Tower/TowerManager");
var TowerReward_1 = require("../../Tower/TowerReward");
var Times_1 = require("../../Turntable/Times");
var RewardSSUi_1 = require("../../Tutorials/RewardSSUi");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var UserData_1 = require("../../UserData");
var WallManager_1 = require("../../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_stats = null;
        _this.ScrollView = null;
        //跟着本次完成的星星数量
        _this.task = []; //任务文字
        _this.Star = []; //大的星星
        _this.Staranmtion = []; //大的星星的动画
        //跟着最大完成的星星数量
        _this.SmallStar = []; //小的星星一颗
        _this.SmallStar2 = []; //小的星星二颗
        _this.SmallStar3 = []; //小的星星三颗
        _this.End_Bg_hei = []; //黑色布之前任务领取的勾
        _this.txt = []; //已领取文字  之前任务领取的勾
        _this.go = null; //本次任务完成的勾
        _this.End_Star = []; //黑色的星星
        _this.label_level = null; //关卡
        _this.jiangli = null; //奖励
        _this.winText = null; //标题文字
        _this.First_Text_1_CN = null; //新纪录
        _this.Highesttxt = null; ///本次挑战最高波次~
        _this.text = null; ///副本确认按钮
        _this.texts = [100126, 100128, 100129]; //战力:~波数:~伤害:~
        _this.RankingSelf = null; //自己的头像  排名 
        return _this;
    }
    GameWin.prototype.initUi = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Win);
        //MonsterDataManager.getInstance().saveAllKillEnemy();
        this.showUserLevel();
        this.showReward();
    };
    GameWin.prototype.showTeamLevel = function (level) {
        var userLevel = this.node.getChildByName('userLevel');
        userLevel.getComponent(cc.Label).string = 'Lv.' + level;
    };
    GameWin.prototype.showUserLevel = function () {
        var userLevel = this.node.getChildByName('userLevel');
        var level = UserData_1.default.getInstance().getUserLevel();
        userLevel.getComponent(cc.Label).string = 'Lv.' + level;
        //进度
        var curExp = UserData_1.default.getInstance().getUserExp();
        var maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        this.node.getChildByName('userExp').getComponent(cc.ProgressBar).progress = curExp / maxExp;
    };
    GameWin.prototype.showUserExpAnimation = function (exp) {
        var _this = this;
        //进度
        var level = UserData_1.default.getInstance().getUserLevel();
        var curExp = UserData_1.default.getInstance().getUserExp();
        var maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        var progress = this.node.getChildByName('userExp').getComponent(cc.ProgressBar);
        progress.progress = curExp / maxExp;
        var num = 30;
        var startNum = 0;
        var isShow = false;
        this.showTeamLevel(level);
        this.schedule(function () {
            curExp += exp / num;
            var pro = curExp / maxExp;
            ;
            if (pro < 1) {
                progress.progress = pro;
            }
            else {
                level++;
                progress.progress = pro % 1;
                curExp -= maxExp;
                maxExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
                _this.showTeamLevel(level);
                //this.showUserLevel();
            }
            startNum++;
            if (!isShow && startNum > num) {
                isShow = true;
                UserData_1.default.getInstance().changeUserExp(exp);
                //this.showUserLevel();
            }
        }, 0.015, num);
        this.showUserLevel();
        //.progress=curExp/maxExp;
    };
    GameWin.prototype.cancelRemainTime = function () {
        var btnHome = this.node.getChildByName('btnHome');
        var label = btnHome.getChildByName('Label').getComponent(cc.Label);
        label.string = LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.HOME);
        btnHome.getChildByName('ads').active = false;
        btnHome.getChildByName('time').active = false;
    };
    GameWin.prototype.showReward = function () {
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    this.showMainReward();
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    this.showEndlessReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Endless);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    this.showBossChallengeReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Boss);
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    this.showTowerReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Tower3);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    this.showMazeReward();
                }
                break;
        }
    };
    GameWin.prototype.showMainReward = function () {
        var _this = this;
        for (var jiangliindex = 0; jiangliindex < this.jiangli.children.length; jiangliindex++) {
            this.jiangli.children[jiangliindex].destroy();
        }
        var startLevel = MapManager_1.default.Currentlevel;
        if (startLevel > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.累计通过X关)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计通过X关);
        }
        if (startLevel > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.通关X)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.通关X);
        }
        if (LevelManager_1.LevelManager.getInstance().getFinishChapter() > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.通关X)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.通过第X章);
        }
        // let labelLevel=this.node.getChildByName('label_level');
        var gm = GameManager_1.default.getInstance();
        var curStars = [false, false, false]; //LevelManager.getInstance().getAllLevelStars(startLevel);
        this.label_level.getComponent(cc.Label).string = "" + MissionLevel_1.MissionLevelManager.getInstance().getLevelName((startLevel));
        var mainWall = WallManager_1.default.getInstance().getMainWall();
        curStars[0] = true;
        curStars[1] = curStars[1] ? true : mainWall.getCurHpPer() >= 0.50;
        curStars[2] = curStars[2] ? true : mainWall.getCurHpPer() >= 0.90;
        var Starnumber = 0;
        var curStarsnumber = 0;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战斗成功1星展示次数_x关 + startLevel);
        if (curStars[1]) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战斗成功2星展示次数_x关 + startLevel);
        }
        if (curStars[2]) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战斗成功3星展示次数_x关 + startLevel);
        }
        //之前是否打过星星数量
        for (var LevelStarindex = 1; LevelStarindex < 4; LevelStarindex++) {
            if (LevelManager_1.LevelManager.getInstance().getALevelStar(startLevel, LevelStarindex)) {
                Starnumber++;
            }
        }
        //这次打的星星数量
        for (var curstarsindex = 0; curstarsindex < curStars.length; curstarsindex++) {
            // console.log("+++++++",curStars)
            this.Star[curstarsindex].scale = 0;
            if (curStars[curstarsindex]) {
                curStarsnumber++;
                this.task[curstarsindex].color = cc.color(85, 234, 85); //任务文字的颜色
                this.Star[curstarsindex].active = true; //大星星是否亮起
                //任务文字的文字是否完成
                this.task[curstarsindex].getComponent(TextLanguage_1.default).setTextId([140008 + curstarsindex, 140014], ""); //140014 完成   140015未完成
            }
            else {
                this.task[curstarsindex].color = cc.color(171, 163, 153);
                this.Star[curstarsindex].active = false;
                this.task[curstarsindex].getComponent(TextLanguage_1.default).setTextId([140008 + curstarsindex, 140015], ""); //140014 完成   140015未完成
            }
        }
        //如果这次的星星数量超过了之前的星星数量     就将这次的数量存本地   
        if (curStarsnumber > Starnumber) {
            LevelManager_1.LevelManager.getInstance().saveAllLevelStars(startLevel, curStars);
            //这次的星星比之前的星星多了几颗    
        }
        var cha = curStarsnumber - Starnumber;
        var itmeanmtoin = []; //存所有打钩的奖励
        for (var Starindex = 1; Starindex <= 3; Starindex++) {
            var levelId = FirstCompleteReward_1.FirstCompleteRewardManager.getId(startLevel, Starindex); //默认3个都完成  
            var RewardData_1 = FirstCompleteReward_1.FirstCompleteRewardManager.getInstance().getFirstRewardArr(levelId);
            //是否完成
            var isFinish = curStars[Starindex - 1];
            for (var level3 = 0; level3 < RewardData_1.length; level3++) {
                var rewardData = RewardData_1[level3];
                //可以获得奖品
                // this.scheduleOnce(()=>{
                var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
                item.x = -57 + level3 * 100;
                item.y = -131 - Starindex * 120 + 120; //item.y=-371+Starindex*120-120;
                item.scale = 0;
                if (cha > 0) { //差大于0，代表这次的星星数量比之前的星星数量多    
                    // console.log("星星差：",cha,Starindex,Starnumber,curStarsnumber)
                    if (Starindex <= Starnumber) { //这个星星小于等于之前打的星星    就显示已领取
                        this.End_Bg_hei[(Starindex - 1)].active = true; //已领取的黑布
                        this.txt[(Starindex - 1)].active = true; //已领取的文字
                        item.scale = 0.83;
                    }
                    if (Starindex > Starnumber) { //这个星星大于等于之前打的星星   未领取
                        if (Starindex > curStarsnumber) {
                            this.End_Bg_hei[(Starindex - 1)].active = false; //已领取的黑布
                            this.txt[(Starindex - 1)].active = false; //已领取的文字
                            // console.log("没有勾，没有黑布")
                            item.scale = 0.83;
                        }
                        else {
                            // console.log("有勾")
                            item.scale = 0;
                            this.End_Bg_hei[(Starindex - 1)].active = false; //已领取的黑布
                            this.txt[(Starindex - 1)].active = false; //已领取的文字
                            var mygo = cc.instantiate(this.go);
                            mygo.setPosition(0, 0);
                            mygo.active = true;
                            mygo.parent = item;
                            itmeanmtoin.push(item);
                            PropManager_1.PropManager.getInstance().changePropNum(rewardData.reward_id, rewardData.reward_num);
                        }
                    }
                }
                else { //差小于0，代表这次的星星数量比之前的星星数量少 
                    item.scale = 0.83;
                    if (Starindex <= Starnumber) { //这个星星小于等于之前打的星星    就显示已领取
                        this.End_Bg_hei[(Starindex - 1)].active = true; //已领取的黑布
                        this.txt[(Starindex - 1)].active = true; //已领取的文字
                    }
                    if (Starindex > Starnumber) { //这个星星大于等于之前打的星星   未领取
                        this.End_Bg_hei[(Starindex - 1)].active = false; //已领取的黑布
                        this.txt[(Starindex - 1)].active = false; //已领取的文字
                    }
                }
                this.jiangli.addChild(item);
                // },level3*0.1);
                // 
            }
        }
        // let scrollView=this.node.getChildByName('propsScrollView');
        //let content=scrollView.getComponent(cc.ScrollView).content;
        // let allRewardData=new Array<RewardData>();        
        // let nn=LevelManager.getInstance().getPassNum(startLevel);
        // //体力
        // if(nn==0)
        // {
        //     //HttpManager.postToUpload(URL_TYPE.rank_upload,Params_Type.rank_max_level);
        //     //BattlePassManager.addTodayTaskProgress(BattlePassTask.UnlockMission);
        // }
        // this.task[0].getComponent(TextLanguage).setTextId([140008,140014],"");//140014 完成   140015未完成
        // this.task[1].getComponent(TextLanguage).setTextId([140009,140014],"");//140014 完成   140015未完成
        // this.task[2].getComponent(TextLanguage).setTextId([140010,140014],"");//140014 完成   140015未完成
        this.ScrollView.getComponent(cc.ScrollView).scrollToBottom(2);
        // for(let i=1; i<=4; i++){
        //     if(jsonData['RewardItem_'+i]>0 && jsonData['RewardNum_'+i]>0){
        //         let rd=new RewardData();
        //         rd.reward_id=jsonData['RewardItem_'+i];
        //         rd.reward_num=jsonData['RewardNum_'+i];
        //         allRewardData.push(rd);
        //     }
        // }
        // let len=allRewardData.length;
        // for(let i=0; i<len; i++)
        // {
        //     let rewardData=allRewardData[i];
        //     //可以获得奖品
        //     this.scheduleOnce(()=>{
        //         let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
        //         this.node.addChild(item);
        //         item.x=90+i*60;
        //         item.y=150;
        //         item.scale=1;
        //     },i*0.1);
        //     PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
        // }
        //把前面的波数设置为已经通过
        for (var i = 0; i <= gm.cur_wave; i++) {
            LevelManager_1.LevelManager.getInstance().setNotFirstPassLevel(startLevel, i);
        }
        GameManager_1.default.getInstance().pass_level_num++;
        // if(MapManager.Currentlevel<MissionLevelManager.getMaxLevel()){
        // }
        var Up = this.node.getChildByName("Up");
        var Ins = this.node.getChildByName("Ins");
        var In = this.node.getChildByName("In");
        var Down = this.node.getChildByName("Down");
        Up.setScale(0, 0);
        Up.y = 100;
        Ins.y = -300;
        Ins.opacity = 0;
        In.opacity = 0;
        Down.opacity = 0;
        Down.getChildByName("bg").active = true;
        Down.getChildByName("btnHome").active = true;
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Start", false);
        cc.tween(Up) //上面的羽毛放大出来
            .to(0.24, { scaleX: 1.2, scaleY: 1.2 })
            .call(function () {
            cc.tween(Ins) //中上的任务出来
                .to(0.24, { opacity: 255 })
                .start();
        })
            .to(0.24, { scaleX: 0.9, scaleY: 0.9 }) //羽毛放小
            .to(0.26, { scaleX: 1, scaleY: 1 }) //羽毛放大
            .call(function () {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Loop", true);
            var _loop_1 = function (index) {
                if (_this.Star[index].active == true) {
                    _this.scheduleOnce(function () {
                        this.Staranmtion[index].getComponent(cc.Animation).play();
                        this.Star[index].getComponent(cc.Animation).play();
                    }, 0.47 * index);
                }
            };
            //星星动画
            for (var index = 0; index < _this.Star.length; index++) {
                _loop_1(index);
            }
        })
            .delay(1.5) //等待
            .call(function () {
            cc.tween(Up)
                .to(0.16, { y: 400 }) //羽毛上去
                .start();
            cc.tween(Ins)
                .to(0.16, { y: 0 }) //任务上去
                .start();
        })
            .delay(0.16) //等待
            .call(function () {
            cc.tween(In) //奖励出来
                .to(0.33, { opacity: 255 })
                .start();
        })
            .delay(0.33) //等待
            .call(function () {
            if (itmeanmtoin.length == 0) { //如果没有可领取的奖励直接出来按钮
                cc.tween(Down)
                    .to(0.33, { opacity: 255 })
                    .call(function () {
                    _this.checkTutorails();
                    Down.getChildByName("bg").active = false;
                })
                    .start();
            }
            else { //所有可领取的奖励放大缩小---一起放大缩小    之后弹出按钮    c最后弹新手教程
                var _loop_2 = function (itmeanmtionindex) {
                    itmeanmtoin[itmeanmtionindex].scale = 0;
                    cc.tween(itmeanmtoin[itmeanmtionindex])
                        .delay(itmeanmtionindex * 0.17)
                        .to(0.17, { scale: 0.83 })
                        .call(function () {
                        if (itmeanmtionindex == (itmeanmtoin.length - 1)) {
                            var _loop_3 = function (index) {
                                cc.tween(itmeanmtoin[index])
                                    .to(0.22, { scale: 0.83 + 0.3 })
                                    .delay(0.1)
                                    .to(0.22, { scale: 0.83 })
                                    .call(function () {
                                    if (index == (itmeanmtoin.length - 1)) {
                                        cc.tween(Down)
                                            .to(0.33, { opacity: 255 })
                                            .call(function () {
                                            _this.checkTutorails();
                                            Down.getChildByName("bg").active = false;
                                        })
                                            .start();
                                    }
                                })
                                    .start();
                            };
                            for (var index = 0; index < itmeanmtoin.length; index++) {
                                _loop_3(index);
                            }
                        }
                    })
                        .start();
                };
                for (var itmeanmtionindex = 0; itmeanmtionindex < itmeanmtoin.length; itmeanmtionindex++) {
                    _loop_2(itmeanmtionindex);
                }
            }
        })
            .start();
    };
    GameWin.prototype.checkTutorails = function () {
        var btnHome = this.node.getChildByName('Down').getChildByName('btnHome');
        btnHome.active = true;
        if (!TutorailsManager_1.default.getInstance().is_finish && GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            if (LevelManager_1.LevelManager.getInstance().start_level == 5 && TutorailsManager_1.default.getInstance().isShowTutorials(205)) {
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardSSUI, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                        uiNode.getComponent(RewardSSUi_1.default).initData(1);
                    } });
            }
            // else if(TutorailsManager.getInstance().isShowTutorials(214))
            // {
            //     btnHome.active=false
            //     TutorailsManager.getInstance().showTutorials(214,()=>{
            //         TutorailsManager.getInstance().saveTutorials(211);
            //         TutorailsManager.getInstance().saveTutorials(212);
            //         TutorailsManager.getInstance().saveTutorials(213);
            //         TutorailsManager.getInstance().saveTutorials(214);
            //     },()=>{
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }else if(LevelManager.getInstance().start_level==3 && TutorailsManager.getInstance().isShowTutorials(221))
            // {
            //     TutorailsManager.getInstance().showTutorials(221,null,()=>{
            //         //跳转到商场,C版本-商城招募开启
            //         GameManager.getInstance().game_to_home=Go_Type.Main;
            //         TutorailsManager.getInstance().saveTutorials(221);
            //         this.clickBtnHome();
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }
            // else if(LevelManager.getInstance().start_level==4 && TutorailsManager.getInstance().isShowTutorials(231))
            // {
            //     let btnHome=this.node.getChildByName('Down').getChildByName('btnHome');
            //     btnHome.active=false
            //     TutorailsManager.getInstance().showTutorials(231,null,()=>{
            //         //下一关
            //         TutorailsManager.getInstance().saveTutorials(210);
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }
            // else if(LevelManager.getInstance().start_level==5 && TutorailsManager.getInstance().isShowTutorials(253))
            // {
            //     TutorailsManager.getInstance().saveTutorials(241);
            //     TutorailsManager.getInstance().saveTutorials(251);
            //     TutorailsManager.getInstance().saveTutorials(252);                
            //     TutorailsManager.getInstance().saveFinishFromGame();
            //     TutorailsManager.getInstance().showTutorials(253,()=>{
            //         TutorailsManager.getInstance().saveTutorials(253);
            //     },()=>{
            //         let hero=GameManager.getInstance().all_hero.get(Hero_Type.GongJianShou);
            //         if(hero){
            //             hero.hideHero();
            //             hero.node.removeAllChildren();
            //             GameManager.getInstance().all_hero.delete(Hero_Type.GongJianShou);
            //         }
            //         TutorailsManager.getInstance().showTutorials(261,()=>{
            //             TutorailsManager.getInstance().saveTutorials(261);
            //         },null);
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }
            // else if(LevelManager.getInstance().start_level==7 && TutorailsManager.getInstance().isShowTutorials(221))
            // {
            //     TutorailsManager.getInstance().showTutorials(221,null,()=>{
            //         TutorailsManager.getInstance().saveTutorials(221);
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }
            // else if(LevelManager.getInstance().start_level==9 && TutorailsManager.getInstance().isShowTutorials(223))
            // {
            //     TutorailsManager.getInstance().showTutorials(223,null,()=>{
            //         TutorailsManager.getInstance().saveTutorials(223);                    
            //     });
            //     TutorailsManager.getInstance().is_tutorails_state=false;
            // }            
        }
    };
    GameWin.prototype.showEndlessReward = function () {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        // console.log("无尽挑战胜利界面")
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.完成无尽挑战次数);
        //黑色星星隐藏
        for (var index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active = false;
        }
        //隐藏关卡数
        this.label_level.active = false;
        //标题修改
        this.winText.getComponent(TextLanguage_1.default).setTextId(800027); //完成挑战
        //本次挑战最高波次~
        this.Highesttxt.active = true;
        this.Highesttxt.getComponent(TextLanguage_1.default).setTextId(800028);
        var ChallengeDamage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0);
        this.Highesttxt.getComponent(TextLanguage_1.default).setReplaceValue('~', StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0) + '');
        //是否显示新纪录
        if (ChallengeDamage > EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave()) {
            this.First_Text_1_CN.active = true;
            var totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, 0);
            totalnum++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, totalnum);
            EndlessLevels_1.EndlessLevelsManager.getInstance().setWave(ChallengeDamage); //游戏胜利之后保存
        }
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_完成时到达的波次 + ChallengeDamage);
        //副本确认按钮
        this.text.getComponent(TextLanguage_1.default).setTextId(100001);
        var Up = this.node.getChildByName("Up");
        var endless = this.node.getChildByName("endless");
        var Down = this.node.getChildByName("Down");
        Up.setScale(0, 0);
        Up.y = 100;
        endless.opacity = 0;
        Down.opacity = 0;
        Down.y = 72;
        Down.getChildByName("btnHome").active = true;
        Down.getChildByName("bg").active = true;
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Start", false);
        var combatPower = 0;
        var selfranking = -1;
        combatPower = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //HeroManager.getInstance().getAllHeroZhanli()//获取波数
        var CombatPower = this.RankingSelf.getChildByName("CombatPower");
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        CombatPower.getComponent(TextLanguage_1.default).setTextId(this.texts[1]); //是哪个排行榜
        CombatPower.getComponent(TextLanguage_1.default).setReplaceValue('~', (combatPower) + ''); //排行榜战力数据
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(2), false).then(function (data) {
            var max = data.length;
            for (var index = 0; index < max; index++) {
                if (data[index].uid == UserData_1.default.getInstance().getUserID()) { //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking = (index + 1);
                }
            }
            if (selfranking == -1) {
                _this.RankingSelf.getChildByName("Notlisted").active = true;
            }
            else {
                SerialNo.active = true;
                SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
                _this.RankingSelf.getChildByName("Notlisted").active = false;
            }
        });
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
        //生成这次所获得的奖励
        endless.getChildByName("item").x = 0;
        endless.getChildByName("item1").x = 0;
        var myitem = PropManager_1.PropManager.getInstance().createPropItem(EndlessReward_1.EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage), EndlessReward_1.EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
        myitem.scale = 0;
        PropManager_1.PropManager.getInstance().changePropNum(EndlessReward_1.EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage), EndlessReward_1.EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
        myitem.parent = endless.getChildByName("item");
        if (EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave() > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.无尽挑战分数到达X波次)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.无尽挑战分数到达X波次);
        }
        cc.tween(Up) //上面的羽毛放大出来
            .to(0.24, { scaleX: 1.2, scaleY: 1.2 })
            .to(0.24, { scaleX: 0.9, scaleY: 0.9 }) //羽毛放小
            .to(0.26, { scaleX: 1, scaleY: 1 }) //羽毛放大
            .call(function () {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Loop", true);
        })
            .delay(1.5) //等待
            .call(function () {
            cc.tween(Up)
                .to(0.16, { y: 327 }) //羽毛上去
                .start();
        })
            .delay(0.16) //等待
            .call(function () {
            cc.tween(endless) //奖励出来
                .to(0.33, { opacity: 255 })
                .start();
        })
            .delay(0.33) //等待
            .call(function () {
            // let myitem=PropManager.getInstance().createPropItem(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
            myitem.scale = 0;
            // myitem.parent=endless.getChildByName("item")
            cc.tween(myitem)
                .to(0.17, { scale: 0.83 })
                .call(function () {
                cc.tween(Down)
                    .to(0.33, { opacity: 255 })
                    .call(function () {
                    _this.checkTutorails();
                    Down.getChildByName("bg").active = false;
                })
                    .start();
            })
                .start();
        })
            .start();
    };
    GameWin.prototype.showBossChallengeReward = function () {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        // console.log("BOSS挑战胜利界面")
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.完成BOSS挑战次数);
        //黑色星星隐藏
        for (var index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active = false;
        }
        //隐藏关卡数
        this.label_level.active = false;
        //标题修改
        this.winText.getComponent(TextLanguage_1.default).setTextId(800027); //完成挑战
        //本次挑战最高波次~
        this.Highesttxt.active = true;
        this.Highesttxt.getComponent(TextLanguage_1.default).setTextId(820018);
        var ChallengeDamage = BossChallenge_1.BossChallengeManager.getInstance().cur_score; //TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeDamage,0)
        this.Highesttxt.getComponent(TextLanguage_1.default).setReplaceValue('~', ChallengeDamage + '');
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeDamage, ChallengeDamage);
        //是否显示新纪录
        var zon = ChallengeDamage + BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber();
        // console.log("++++++++",zon,ChallengeDamage,BossChallengeManager.getInstance().getMaxDamageNumber())
        var totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalBossChallengeTimes, 0);
        totalnum++;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalBossChallengeTimes, totalnum);
        BossChallenge_1.BossChallengeManager.getInstance().setDamageNumber(zon); //游戏胜利之后保存
        // if(ChallengeDamage>BossChallengeManager.getInstance().getMaxDamageNumber()){
        //     this.First_Text_1_CN.active=true
        //     BossChallengeManager.getInstance().setDamageNumber(ChallengeDamage)//游戏胜利之后保存
        // }
        //副本确认按钮
        this.text.getComponent(TextLanguage_1.default).setTextId(100001);
        var Up = this.node.getChildByName("Up");
        var endless = this.node.getChildByName("endless");
        var Down = this.node.getChildByName("Down");
        Up.setScale(0, 0);
        Up.y = 100;
        Down.getChildByName("btnHome").active = true;
        endless.opacity = 0;
        Down.opacity = 0;
        Down.y = 72;
        Down.getChildByName("bg").active = true;
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Start", false);
        var combatPowers = 0;
        var selfranking = -1;
        combatPowers = BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber(); //HeroManager.getInstance().getAllHeroZhanli()//获取伤害
        var CombatPower = this.RankingSelf.getChildByName("CombatPower");
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        CombatPower.getComponent(TextLanguage_1.default).setTextId(this.texts[2]); //是哪个排行榜
        CombatPower.getComponent(TextLanguage_1.default).setReplaceValue('~', (combatPowers) + ''); //排行榜战力数据
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(3), false).then(function (data) {
            var max = data.length;
            for (var index = 0; index < max; index++) {
                if (data[index].uid == UserData_1.default.getInstance().getUserID()) { //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking = (index + 1);
                }
            }
            if (selfranking == -1) {
                _this.RankingSelf.getChildByName("Notlisted").active = true;
            }
            else {
                SerialNo.active = true;
                SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
                _this.RankingSelf.getChildByName("Notlisted").active = false;
            }
        });
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
        //生成这次所获得的奖励
        var data = BossReward_1.BossRewardManager.getInstance().getRewardByScore(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode, ChallengeDamage);
        endless.getChildByName("item").x = -80;
        endless.getChildByName("item1").x = 80;
        var myitem = PropManager_1.PropManager.getInstance().createPropItem(BossReward_1.BossRewardManager.getInstance().getRewardItem(data.curData.RewardLevel), BossReward_1.BossRewardManager.getInstance().getRewardNum(data.curData.RewardLevel));
        myitem.scale = 0;
        PropManager_1.PropManager.getInstance().changePropNum(BossReward_1.BossRewardManager.getInstance().getRewardItem(data.curData.RewardLevel), BossReward_1.BossRewardManager.getInstance().getRewardNum(data.curData.RewardLevel));
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战_完成时拿到的奖励级别 + data.curData.RewardLevel);
        myitem.parent = endless.getChildByName("item");
        var myitem1 = PropManager_1.PropManager.getInstance().createPropItem(BossReward_1.BossRewardManager.getInstance().getRewardItem_2(data.curData.RewardLevel), BossReward_1.BossRewardManager.getInstance().getRewardNum_2(data.curData.RewardLevel));
        myitem1.scale = 0;
        PropManager_1.PropManager.getInstance().changePropNum(BossReward_1.BossRewardManager.getInstance().getRewardItem_2(data.curData.RewardLevel), BossReward_1.BossRewardManager.getInstance().getRewardNum_2(data.curData.RewardLevel));
        myitem1.parent = endless.getChildByName("item1");
        if (BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber() > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.boss狩猎分数到达X伤害)) {
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.boss狩猎分数到达X伤害);
        }
        cc.tween(Up) //上面的羽毛放大出来s
            .to(0.24, { scaleX: 1.2, scaleY: 1.2 })
            .to(0.24, { scaleX: 0.9, scaleY: 0.9 }) //羽毛放小
            .to(0.26, { scaleX: 1, scaleY: 1 }) //羽毛放大
            .call(function () {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Loop", true);
        })
            .delay(1.5) //等待
            .call(function () {
            cc.tween(Up)
                .to(0.16, { y: 327 }) //羽毛上去
                .start();
        })
            .delay(0.16) //等待
            .call(function () {
            cc.tween(endless) //奖励出来
                .to(0.33, { opacity: 255 })
                .start();
        })
            .delay(0.33) //等待
            .call(function () {
            // let myitem=PropManager.getInstance().createPropItem(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
            myitem.scale = 0;
            myitem1.scale = 0;
            // myitem.parent=endless.getChildByName("item")
            cc.tween(myitem)
                .to(0.17, { scale: 0.83 })
                .call(function () {
                cc.tween(myitem1)
                    .to(0.17, { scale: 0.83 })
                    .call(function () {
                    cc.tween(myitem)
                        .to(0.17, { scale: 1 })
                        .to(0.17, { scale: 0.83 })
                        .start();
                    cc.tween(myitem1)
                        .to(0.17, { scale: 1 })
                        .to(0.17, { scale: 0.83 })
                        .call(function () {
                        cc.tween(Down)
                            .to(0.33, { opacity: 255 })
                            .call(function () {
                            _this.checkTutorails();
                            Down.getChildByName("bg").active = false;
                        })
                            .start();
                    })
                        .start();
                })
                    .start();
            })
                .start();
        })
            .start();
        // let scrollView=this.node.getChildByName('propsScrollView');
        // let content=scrollView.getComponent(cc.ScrollView).content;
        // let mode=BossChallengeManager.getInstance().cur_challenge_mode;
        // let score=BossChallengeManager.getInstance().cur_score;
        // let allRewardData=BossRewardManager.getInstance().getBossReward(mode,score);
        // let len=allRewardData.length;
        // for(let i=0; i<len; i++)
        // {
        //     let rewardData=allRewardData[i];
        //     //可以获得奖品
        //     this.scheduleOnce(()=>{
        //         let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
        //         content.addChild(item);
        //     },i*0.1);
        //     PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
        //     //玩家经验
        //     if(rewardData.reward_id==PropId.UserExp&&rewardData.reward_num>0){
        //         this.showUserExpAnimation(rewardData.reward_num);
        //     }
        // }
        // BossChallengeManager.getInstance().saveBossChallengeStage(mode,score);
    };
    GameWin.prototype.showTowerReward = function () {
        var scrollView = this.node.getChildByName('propsScrollView');
        var content = scrollView.getComponent(cc.ScrollView).content;
        //添加金币等资源列表
        var rewardData = TowerReward_1.TowerRewardManager.getInstance().getRewardDatas(TowerManager_1.default.getTowerLevel() - 1);
        var _loop_4 = function (i) {
            var rd = rewardData[i];
            PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, rd.reward_num);
            this_1.scheduleOnce(function () {
                content.addChild(PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, rd.reward_num));
            }, i * 0.1);
            //玩家经验
            if (rd.reward_id == PropConfig_1.PropId.UserExp && rd.reward_num > 0) {
                this_1.showUserExpAnimation(rd.reward_num);
            }
        };
        var this_1 = this;
        for (var i = 0; i < rewardData.length; i++) {
            _loop_4(i);
        }
        TowerManager_1.default.is_show_tower = true;
    };
    GameWin.prototype.showMazeReward = function () {
        var gm = GameManager_1.default.getInstance();
        // console.log("虚空裂缝胜利界面")  
        var id = Times_1.default.voidsensid;
        var HexagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id);
        var Layers = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getLayers(id);
        if (HexagonType == 5) { //如果打完boss了，代表这一层完结了
            var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeDamage, 0);
            if (Layers > damage) {
                damage = Layers;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeDamage, damage);
                if (damage > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.虚空探险通过第X章)) {
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.虚空探险通过第X章);
                }
            }
        }
        //黑色星星隐藏
        for (var index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active = false;
        }
        //隐藏关卡数
        var xagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(Times_1.default.voidsensid);
        if (xagonType == 1) {
            this.label_level.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830002); //普通战役
        }
        if (xagonType == 3) {
            this.label_level.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830003); //精英战役
        }
        if (xagonType == 5) {
            this.label_level.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830004); //boss战役
        }
        this.label_level.active = true;
        //标题修改
        this.winText.getComponent(TextLanguage_1.default).setTextId(800027); //完成挑战
        //副本确认按钮
        this.text.getComponent(TextLanguage_1.default).setTextId(100001);
        var Up = this.node.getChildByName("Up");
        var voidsens = this.node.getChildByName("voidsens");
        var Down = this.node.getChildByName("Down");
        Up.setScale(0, 0);
        Up.y = 100;
        voidsens.opacity = 0;
        Down.opacity = 0;
        Down.y = 167;
        Down.getChildByName("btnHome").active = false;
        Down.getChildByName("bg").active = true;
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Start", false);
        //生成这次所获得的奖励
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(Times_1.default.voidsensid);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(Times_1.default.voidsensid);
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(Times_1.default.voidsensid);
        var Prop2_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_Sum(Times_1.default.voidsensid);
        var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(Prop2_ID);
        var myitem = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        myitem.scale = 0;
        PropManager_1.PropManager.getInstance().changePropNum(Prop1_ID, Prop1_Sum);
        myitem.parent = voidsens.getChildByName("item1");
        var myitem1 = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, Prop2_Sum);
        myitem1.scale = 0;
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, Prop2_Sum);
        myitem1.parent = voidsens.getChildByName("item2");
        cc.tween(Up) //上面的羽毛放大出来
            .to(0.24, { scaleX: 1.2, scaleY: 1.2 })
            .to(0.24, { scaleX: 0.9, scaleY: 0.9 }) //羽毛放小
            .to(0.26, { scaleX: 1, scaleY: 1 }) //羽毛放大
            .call(function () {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0, "Win_Loop", true);
        })
            .delay(1.5) //等待
            .call(function () {
            cc.tween(Up)
                .to(0.16, { y: 327 }) //羽毛上去
                .start();
        })
            .delay(0.16) //等待
            .call(function () {
            cc.tween(voidsens) //奖励出来
                .to(0.33, { opacity: 255 })
                .start();
        })
            .delay(0.33) //等待
            .call(function () {
            myitem.scale = 0;
            myitem1.scale = 0;
            cc.tween(myitem)
                .to(0.17, { scale: 0.83 })
                .call(function () {
                cc.tween(myitem1)
                    .to(0.17, { scale: 0.83 })
                    .call(function () {
                    cc.tween(myitem1)
                        .to(0.17, { scale: 1 })
                        .to(0.17, { scale: 0.83 })
                        .start();
                    cc.tween(myitem)
                        .to(0.17, { scale: 1 })
                        .to(0.17, { scale: 0.83 })
                        .call(function () {
                        cc.tween(Down)
                            .to(0.33, { opacity: 255 })
                            .call(function () {
                            Down.getChildByName("bg").active = false;
                        })
                            .start();
                    })
                        .start();
                })
                    .start();
            })
                .start();
        })
            .start();
    };
    GameWin.prototype.showUnlockHero = function () {
        //判断英雄是否新解锁
        for (var i = HeroConfig_1.Hero_Type.PaoShou; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            if (HeroManager_1.HeroManager.getInstance().getHeroLevel(i) > 0 && HeroManager_1.HeroManager.getHeroIsNeedTip(i) == true) {
                UIManager_1.UIManager.getInstance().showGetHeroUi(i);
                break;
            }
        }
    };
    // cheakFuncUnlock(){
    //     let unlockIds=new Array();
    //     let fdm=FunctionDefinitionManager.getInstance();
    //     let finishLevel=LevelManager.getInstance().finish_level;
    //     for(let i=Func_Type.LiChengBei; i<Func_Type.Num; i++){
    //         let jsonData=fdm.getJsonFunctionDefinition(i);
    //         let type=jsonData.UnlockConditionType;
    //         let value=jsonData.UnlockCondictionParameter;
    //         if(type==2){
    //             if(finishLevel>=value){
    //                 //判断是否提示过
    //                 if(FunctionDefinitionManager.getFuncHint(i)<=0){
    //                     unlockIds.push(i);
    //                 }
    //             }
    //         }
    //     }
    //     //目前解锁的
    //     if(unlockIds.length>0){
    //         FunctionDefinitionManager.saveFuncList(unlockIds);
    //         FunctionDefinitionManager.cheakFuncUnlock();
    //     }
    // }
    GameWin.prototype.cheakUserLevel = function () {
    };
    GameWin.prototype.getNameByType = function (type) {
        var name = '';
        var lm = LanguageManager_1.default.getInstance();
        switch (type) {
            case Constants_1.Go_Type.Main:
                name = lm.getString(LanguageConstants_1.LanguageIndex.fighting);
                break;
            case Constants_1.Go_Type.Main_EnemyInfo:
                name = lm.getString(LanguageConstants_1.LanguageIndex.MonsterManual);
                break;
            case Constants_1.Go_Type.Main_Milestone:
                name = lm.getString(LanguageConstants_1.LanguageIndex.Milestone);
                break;
            case Constants_1.Go_Type.Main_Sign:
                name = lm.getString(LanguageConstants_1.LanguageIndex.Sign_in);
                ;
                break;
            case Constants_1.Go_Type.Main_Spin:
                name = lm.getString(LanguageConstants_1.LanguageIndex.Lucky_Spin);
                ;
                break;
            case Constants_1.Go_Type.Main_Task:
                name = lm.getString(LanguageConstants_1.LanguageIndex.Daily_task);
                ;
                break;
            case Constants_1.Go_Type.Role:
                name = lm.getString(LanguageConstants_1.LanguageIndex.hero);
                ;
                break;
            case Constants_1.Go_Type.PetList:
                name = lm.getString(LanguageConstants_1.LanguageIndex.shop);
                ;
                break;
        }
        return name;
    };
    GameWin.prototype.clickBtnHome = function () {
        if ((MapManager_1.default.Currentlevel + 1) < MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            MapManager_1.default.Currentlevel = MapManager_1.default.Currentlevel + 1;
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    MazeManager_1.MazeManager.getInstance().resetHeroBind();
                }
                break;
        }
        GameManager_1.default.getInstance().backToHome();
    };
    GameWin.prototype.clickBtnVideo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var btnVideo = this.node.getChildByName('btnVideo');
        btnVideo.active = false;
        AdManager_1.default.getInstance().showVideo(function (isSuc) {
            if (isSuc == true) {
                //金币x3
                var coin = MissionLevel_1.MissionLevelManager.getInstance().getPassReward_Coin(LevelManager_1.LevelManager.getInstance().start_level);
                PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, coin * 3);
                GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, coin * 3));
            }
            else {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
        }, Constants_1.VIDEO_TYPE.Coin);
    };
    GameWin.prototype.clickBtnNext = function () {
        var gm = GameManager_1.default.getInstance();
        gm.sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    MapManager_1.default.Currentlevel = MapManager_1.default.Currentlevel + 1;
                    var nextLevel = MapManager_1.default.Currentlevel; //LevelManager.getInstance().start_level+1;
                    if (nextLevel > MissionLevel_1.MissionLevelManager.getMaxLevel()) {
                        MapManager_1.default.Currentlevel = MissionLevel_1.MissionLevelManager.getMaxLevel();
                        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100121), 3);
                        // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
                    }
                    else {
                        if (nextLevel <= (LevelManager_1.LevelManager.getInstance().finish_level + 1)) {
                            if (!TutorailsManager_1.default.getInstance().is_finish_game) {
                                LevelManager_1.LevelManager.getInstance().start_level = nextLevel;
                                gm.fighting_info = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
                            }
                            else {
                                LevelManager_1.LevelManager.getInstance().start_level = nextLevel;
                                gm.fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
                            }
                        }
                        GameManager_1.default.getInstance().startNextLevel();
                        _super.prototype.onClose.call(this);
                    }
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    if (TowerManager_1.default.getTowerLevel() < TowerLevel_1.TowerLevelManager.getMaxFloor()) {
                        GameManager_1.default.getInstance().startNextLevel();
                        _super.prototype.onClose.call(this);
                    }
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity_Endless;
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity_Boss;
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    var id = Times_1.default.voidsensid;
                    var HexagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id);
                    if (HexagonType == 5) { //如果打完boss了，代表这一层完结了
                        // let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
                        // damage++
                        // if(damage>8){
                        //     damage=8
                        // }
                        // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamage,damage);
                        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity_Maze_lose;
                    }
                    else {
                        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity_Maze;
                    }
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
        }
    };
    GameWin.prototype.clickBtnOk = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Maze:
                {
                    UIManager_1.UIManager.getInstance().showMazeUi();
                    _super.prototype.onClose.call(this);
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    GameManager_1.default.getInstance().startNextLevel();
                    _super.prototype.onClose.call(this);
                }
                break;
            default:
                {
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
        }
    };
    GameWin.prototype.clickBtnStats = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showDamageStatsUi();
    };
    GameWin.prototype.getLeaderboardByUserJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    };
    __decorate([
        property(cc.Prefab)
    ], GameWin.prototype, "hero_stats", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "ScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "task", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "Star", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "Staranmtion", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "SmallStar", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "SmallStar2", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "SmallStar3", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "End_Bg_hei", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "txt", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "go", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "End_Star", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "label_level", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "jiangli", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "winText", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "First_Text_1_CN", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "Highesttxt", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "RankingSelf", void 0);
    GameWin = __decorate([
        ccclass
    ], GameWin);
    return GameWin;
}(UIComponent_1.default));
exports.default = GameWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQXNFO0FBQ3RFLDhEQUFvRTtBQUNwRSx3REFBOEQ7QUFDOUQsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSxpREFBNEM7QUFDNUMsNkNBQTJFO0FBQzNFLDRFQUFrRjtBQUNsRixpREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsa0RBQXdEO0FBRXhELDhEQUFvRTtBQUNwRSx1RUFBNkU7QUFDN0UseURBQXdEO0FBQ3hELHlEQUErRDtBQUMvRCwyREFBaUU7QUFFakUsc0RBQXFEO0FBRXJELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsMkVBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxpRUFBNEQ7QUFDNUQsb0RBQStDO0FBQy9DLHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELHFEQUEyRDtBQUMzRCx5REFBb0Q7QUFDcEQsdURBQTZEO0FBQzdELCtDQUEwQztBQUMxQyx5REFBb0Q7QUFDcEQscUVBQWdFO0FBQ2hFLG9EQUErQztBQUMvQyw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLDJDQUFzQztBQUV0QyxzREFBaUQ7QUFHM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVc7SUFBaEQ7UUFBQSxxRUEyb0NDO1FBeG9DRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixnQkFBVSxHQUFTLElBQUksQ0FBQztRQUV4QixhQUFhO1FBRWIsVUFBSSxHQUFXLEVBQUUsQ0FBQyxDQUFBLE1BQU07UUFFeEIsVUFBSSxHQUFXLEVBQUUsQ0FB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QzsrQ0FDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dDQUNEO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dUNBQ0Y7SUFJaEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNPO0lBSXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDRztJQUdyQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDQTtJQUtsQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNTO0lBeERWLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0Eyb0MzQjtJQUFELGNBQUM7Q0Ezb0NELEFBMm9DQyxDQTNvQ29DLHFCQUFXLEdBMm9DL0M7a0JBM29Db0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCb3NzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9BY3Rpdml0eS9Cb3NzUmV3YXJkXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IHsgRW5kbGVzc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc1Jld2FyZFwiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuLi8uLi9BZHMvQWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdvX1R5cGUsIFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi8uLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgSmFja3BvdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvSmFja3BvdFwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgUGxheWVyTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9GaXJzdENvbXBsZXRlUmV3YXJkXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBSb2d1ZVJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9EYXRhL1JvZ3VlUmV3YXJkXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckRhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyRGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Ub3dlci9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb3dlclJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJSZXdhcmRcIjtcclxuaW1wb3J0IFRpbWVzIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVGltZXNcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lV2luIGV4dGVuZHMgVUlDb21wb25lbnQgeyAgICBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19zdGF0czpjYy5QcmVmYWI9bnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU2Nyb2xsVmlldzpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgLy/ot5/nnYDmnKzmrKHlrozmiJDnmoTmmJ/mmJ/mlbDph49cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGFzazpjYy5Ob2RlW109W107Ly/ku7vliqHmloflrZdcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3RhcjpjYy5Ob2RlW109W107Ly/lpKfnmoTmmJ/mmJ9cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3RhcmFubXRpb246Y2MuTm9kZVtdPVtdOy8v5aSn55qE5pif5pif55qE5Yqo55S7XHJcblxyXG4gICAgLy/ot5/nnYDmnIDlpKflrozmiJDnmoTmmJ/mmJ/mlbDph49cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU21hbGxTdGFyOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S4gOmil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTbWFsbFN0YXIyOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S6jOmil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTbWFsbFN0YXIzOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S4iemil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBFbmRfQmdfaGVpOmNjLk5vZGVbXT1bXTsvL+m7keiJsuW4g+S5i+WJjeS7u+WKoemihuWPlueahOWLvlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0eHQ6Y2MuTm9kZVtdPVtdOy8v5bey6aKG5Y+W5paH5a2XICDkuYvliY3ku7vliqHpooblj5bnmoTli75cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGdvOmNjLk5vZGU9bnVsbDsvL+acrOasoeS7u+WKoeWujOaIkOeahOWLvlxyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEVuZF9TdGFyOmNjLk5vZGVbXT1bXTsvL+m7keiJsueahOaYn+aYn1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFiZWxfbGV2ZWw6Y2MuTm9kZT1udWxsOy8v5YWz5Y2hXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamlhbmdsaTpjYy5Ob2RlPW51bGw7Ly/lpZblirFcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3aW5UZXh0OmNjLk5vZGU9bnVsbDsvL+agh+mimOaWh+Wtl1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEZpcnN0X1RleHRfMV9DTjpjYy5Ob2RlPW51bGw7Ly/mlrDnuqrlvZVcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEhpZ2hlc3R0eHQ6Y2MuTm9kZT1udWxsOy8vL+acrOasoeaMkeaImOacgOmrmOazouasoX5cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0ZXh0OmNjLk5vZGU9bnVsbDsvLy/lia/mnKznoa7orqTmjInpkq5cclxuICAgIFxyXG4gICAgdGV4dHM6IG51bWJlcltdID0gWzEwMDEyNiwgMTAwMTI4LCAxMDAxMjldLy/miJjlips6fuazouaVsDp+5Lyk5a6zOn5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFJhbmtpbmdTZWxmOiBjYy5Ob2RlID0gbnVsbC8v6Ieq5bex55qE5aS05YOPICDmjpLlkI0gXHJcbiAgICBpbml0VWkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9XaW4pO1xyXG4gICAgICAgIC8vTW9uc3RlckRhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbEtpbGxFbmVteSgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VXNlckxldmVsKCk7XHJcbiAgICAgICAgdGhpcy5zaG93UmV3YXJkKCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHNob3dUZWFtTGV2ZWwobGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICBsZXQgdXNlckxldmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlckxldmVsJyk7XHJcbiAgICAgICAgdXNlckxldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdMdi4nK2xldmVsOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93VXNlckxldmVsKCl7XHJcbiAgICAgICAgbGV0IHVzZXJMZXZlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJMZXZlbCcpO1xyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIHVzZXJMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nTHYuJytsZXZlbDtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlckV4cCcpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3M9Y3VyRXhwL21heEV4cDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VXNlckV4cEFuaW1hdGlvbihleHA6bnVtYmVyKXtcclxuICAgICAgICAvL+i/m+W6plxyXG4gICAgICAgIGxldCBsZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldCBjdXJFeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IG1heEV4cD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb2dyZXNzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlckV4cCcpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgcHJvZ3Jlc3MucHJvZ3Jlc3M9Y3VyRXhwL21heEV4cDtcclxuICAgICAgICBsZXQgbnVtPTMwO1xyXG4gICAgICAgIGxldCBzdGFydE51bT0wO1xyXG4gICAgICAgIGxldCBpc1Nob3c9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93VGVhbUxldmVsKGxldmVsKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XHJcbiAgICAgICAgICAgIGN1ckV4cCs9ZXhwL251bTtcclxuICAgICAgICAgICAgbGV0IHBybz1jdXJFeHAvbWF4RXhwOztcclxuICAgICAgICAgICAgaWYocHJvPDEpe1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MucHJvZ3Jlc3M9cHJvO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsKys7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcy5wcm9ncmVzcz1wcm8lMTtcclxuICAgICAgICAgICAgICAgIGN1ckV4cC09bWF4RXhwO1xyXG4gICAgICAgICAgICAgICAgbWF4RXhwPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGVhbUxldmVsKGxldmVsKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zaG93VXNlckxldmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhcnROdW0rKztcclxuICAgICAgICAgICAgaWYoIWlzU2hvdyYmc3RhcnROdW0+bnVtKXtcclxuICAgICAgICAgICAgICAgIGlzU2hvdz10cnVlO1xyXG4gICAgICAgICAgICAgICAgVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VVc2VyRXhwKGV4cCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2hvd1VzZXJMZXZlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwwLjAxNSxudW0pO1xyXG4gICAgICAgIHRoaXMuc2hvd1VzZXJMZXZlbCgpO1xyXG4gICAgICAgIC8vLnByb2dyZXNzPWN1ckV4cC9tYXhFeHA7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsUmVtYWluVGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ0bkhvbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5Ib21lJyk7XHJcbiAgICAgICAgbGV0IGxhYmVsPWJ0bkhvbWUuZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguSE9NRSk7XHJcbiAgICAgICAgYnRuSG9tZS5nZXRDaGlsZEJ5TmFtZSgnYWRzJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIGJ0bkhvbWUuZ2V0Q2hpbGRCeU5hbWUoJ3RpbWUnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Jld2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYWluUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0VuZGxlc3NSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIC8vQmF0dGxlUGFzc01hbmFnZXIuYWRkVG9kYXlUYXNrUHJvZ3Jlc3MoQmF0dGxlUGFzc1Rhc2suRW5kbGVzcyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCb3NzQ2hhbGxlbmdlUmV3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICAvL0JhdHRsZVBhc3NNYW5hZ2VyLmFkZFRvZGF5VGFza1Byb2dyZXNzKEJhdHRsZVBhc3NUYXNrLkJvc3MpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VG93ZXJSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIC8vQmF0dGxlUGFzc01hbmFnZXIuYWRkVG9kYXlUYXNrUHJvZ3Jlc3MoQmF0dGxlUGFzc1Rhc2suVG93ZXIzKTtcclxuICAgICAgICAgICAgfWJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYXplUmV3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYWluUmV3YXJkKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgamlhbmdsaWluZGV4ID0gMDsgamlhbmdsaWluZGV4IDwgdGhpcy5qaWFuZ2xpLmNoaWxkcmVuLmxlbmd0aDsgamlhbmdsaWluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5qaWFuZ2xpLmNoaWxkcmVuW2ppYW5nbGlpbmRleF0uZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGFydExldmVsPSBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbDsgICAgICAgXHJcblxyXG4gICAgICAgIGlmKHN0YXJ0TGV2ZWwgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7ntK/orqHpgJrov4dY5YWzKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u57Sv6K6h6YCa6L+HWOWFsyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGFydExldmVsID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u6YCa5YWzWCkpe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumAmuWFs1gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaW5pc2hDaGFwdGVyKCkgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7pgJrlhbNYKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6YCa6L+H56ysWOeroCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBsYWJlbExldmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWxfbGV2ZWwnKTtcclxuXHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGN1clN0YXJzPVtmYWxzZSxmYWxzZSxmYWxzZV0gLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxMZXZlbFN0YXJzKHN0YXJ0TGV2ZWwpO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsX2xldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgoc3RhcnRMZXZlbCkpXHJcbiAgICAgICAgbGV0IG1haW5XYWxsPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKTtcclxuICAgICAgICBjdXJTdGFyc1swXT10cnVlO1xyXG4gICAgICAgIGN1clN0YXJzWzFdPWN1clN0YXJzWzFdP3RydWU6bWFpbldhbGwuZ2V0Q3VySHBQZXIoKT49MC41MDtcclxuICAgICAgICBjdXJTdGFyc1syXT1jdXJTdGFyc1syXT90cnVlOm1haW5XYWxsLmdldEN1ckhwUGVyKCk+PTAuOTA7XHJcblxyXG4gICAgICAgIGxldCBTdGFybnVtYmVyPTBcclxuICAgICAgICBsZXQgY3VyU3RhcnNudW1iZXI9MFxyXG5cclxuXHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOaWl+aIkOWKnzHmmJ/lsZXnpLrmrKHmlbBfeOWFsyArIHN0YXJ0TGV2ZWwpO1xyXG5cclxuICAgICAgICBpZihjdXJTdGFyc1sxXSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjmlpfmiJDlip8y5pif5bGV56S65qyh5pWwX3jlhbMgKyBzdGFydExldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3VyU3RhcnNbMl0pe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5paX5oiQ5YqfM+aYn+WxleekuuasoeaVsF945YWzICsgc3RhcnRMZXZlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8v5LmL5YmN5piv5ZCm5omT6L+H5pif5pif5pWw6YePXHJcbiAgICAgICAgZm9yIChsZXQgTGV2ZWxTdGFyaW5kZXggPSAxOyBMZXZlbFN0YXJpbmRleCA8NDsgTGV2ZWxTdGFyaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTGV2ZWxTdGFyKHN0YXJ0TGV2ZWwsTGV2ZWxTdGFyaW5kZXgpKXtcclxuICAgICAgICAgICAgICAgIFN0YXJudW1iZXIrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+i/measoeaJk+eahOaYn+aYn+aVsOmHj1xyXG4gICAgICAgIGZvciAobGV0IGN1cnN0YXJzaW5kZXggPSAwOyBjdXJzdGFyc2luZGV4IDwgY3VyU3RhcnMubGVuZ3RoOyBjdXJzdGFyc2luZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsY3VyU3RhcnMpXHJcbiAgICAgICAgICAgIHRoaXMuU3RhcltjdXJzdGFyc2luZGV4XS5zY2FsZT0wXHJcbiAgICAgICAgICAgaWYoY3VyU3RhcnNbY3Vyc3RhcnNpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhcnNudW1iZXIrK1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrW2N1cnN0YXJzaW5kZXhdLmNvbG9yPWNjLmNvbG9yKDg1LDIzNCw4NSkvL+S7u+WKoeaWh+Wtl+eahOminOiJslxyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFyW2N1cnN0YXJzaW5kZXhdLmFjdGl2ZT10cnVlLy/lpKfmmJ/mmJ/mmK/lkKbkuq7otbdcclxuICAgICAgICAgICAgICAgIC8v5Lu75Yqh5paH5a2X55qE5paH5a2X5piv5ZCm5a6M5oiQXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tbY3Vyc3RhcnNpbmRleF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKFsxNDAwMDgrY3Vyc3RhcnNpbmRleCwxNDAwMTRdLFwiXCIpOy8vMTQwMDE0IOWujOaIkCAgIDE0MDAxNeacquWujOaIkFxyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrW2N1cnN0YXJzaW5kZXhdLmNvbG9yPWNjLmNvbG9yKDE3MSwxNjMsMTUzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFyW2N1cnN0YXJzaW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrW2N1cnN0YXJzaW5kZXhdLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChbMTQwMDA4K2N1cnN0YXJzaW5kZXgsMTQwMDE1XSxcIlwiKTsvLzE0MDAxNCDlrozmiJAgICAxNDAwMTXmnKrlrozmiJBcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WmguaenOi/measoeeahOaYn+aYn+aVsOmHj+i2hei/h+S6huS5i+WJjeeahOaYn+aYn+aVsOmHjyAgICAg5bCx5bCG6L+Z5qyh55qE5pWw6YeP5a2Y5pys5ZywICAgXHJcbiAgICAgICAgaWYoY3VyU3RhcnNudW1iZXI+U3Rhcm51bWJlcil7XHJcbiAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxMZXZlbFN0YXJzKHN0YXJ0TGV2ZWwsY3VyU3RhcnMpO1xyXG4gICAgICAgICAgICAvL+i/measoeeahOaYn+aYn+avlOS5i+WJjeeahOaYn+aYn+WkmuS6huWHoOmilyAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjaGE9Y3VyU3RhcnNudW1iZXItU3Rhcm51bWJlclxyXG4gICAgICAgIGxldCBpdG1lYW5tdG9pbj1bXS8v5a2Y5omA5pyJ5omT6ZKp55qE5aWW5YqxXHJcbiAgICAgICAgZm9yIChsZXQgU3RhcmluZGV4ID0gMTsgU3RhcmluZGV4IDw9IDM7IFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbElkPUZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyLmdldElkKHN0YXJ0TGV2ZWwsU3RhcmluZGV4KTsvL+m7mOiupDPkuKrpg73lrozmiJAgIFxyXG4gICAgICAgICAgICBsZXQgUmV3YXJkRGF0YT1GaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpcnN0UmV3YXJkQXJyKGxldmVsSWQpO1xyXG4gICAgICAgICAgICAvL+aYr+WQpuWujOaIkFxyXG4gICAgICAgICAgICBsZXQgaXNGaW5pc2g9Y3VyU3RhcnNbU3RhcmluZGV4LTFdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBsZXZlbDMgPSAwOyBsZXZlbDMgPCBSZXdhcmREYXRhLmxlbmd0aDsgbGV2ZWwzKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXdhcmREYXRhPVJld2FyZERhdGFbbGV2ZWwzXTtcclxuICAgICAgICAgICAgICAgIC8v5Y+v5Lul6I635b6X5aWW5ZOBXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmREYXRhLnJld2FyZF9pZCxyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpdGVtLng9LTU3K2xldmVsMyoxMDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnk9LTEzMS1TdGFyaW5kZXgqMTIwKzEyMDsvL2l0ZW0ueT0tMzcxK1N0YXJpbmRleCoxMjAtMTIwO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zY2FsZT0wO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hhPjApey8v5beu5aSn5LqOMO+8jOS7o+ihqOi/measoeeahOaYn+aYn+aVsOmHj+avlOS5i+WJjeeahOaYn+aYn+aVsOmHj+WkmiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaYn+aYn+W3ru+8mlwiLGNoYSxTdGFyaW5kZXgsU3Rhcm51bWJlcixjdXJTdGFyc251bWJlcilcclxuICAgICAgICAgICAgICAgICAgICBpZihTdGFyaW5kZXg8PVN0YXJudW1iZXIpey8v6L+Z5Liq5pif5pif5bCP5LqO562J5LqO5LmL5YmN5omT55qE5pif5pifICAgIOWwseaYvuekuuW3sumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZF9CZ19oZWlbKFN0YXJpbmRleC0xKV0uYWN0aXZlPXRydWUvL+W3sumihuWPlueahOm7keW4g1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR4dFsoU3RhcmluZGV4LTEpXS5hY3RpdmU9dHJ1ZSAgIC8v5bey6aKG5Y+W55qE5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGU9MC44MztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU3RhcmluZGV4PlN0YXJudW1iZXIpey8v6L+Z5Liq5pif5pif5aSn5LqO562J5LqO5LmL5YmN5omT55qE5pif5pifICAg5pyq6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFN0YXJpbmRleD5jdXJTdGFyc251bWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZF9CZ19oZWlbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlLy/lt7Lpooblj5bnmoTpu5HluINcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0WyhTdGFyaW5kZXgtMSldLmFjdGl2ZT1mYWxzZSAgIC8v5bey6aKG5Y+W55qE5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuayoeacieWLvu+8jOayoeaciem7keW4g1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjgzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pyJ5Yu+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZF9CZ19oZWlbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlLy/lt7Lpooblj5bnmoTpu5HluINcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0WyhTdGFyaW5kZXgtMSldLmFjdGl2ZT1mYWxzZSAgIC8v5bey6aKG5Y+W55qE5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXlnbz1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlnby5zZXRQb3NpdGlvbigwLDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteWdvLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteWdvLnBhcmVudD1pdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdG1lYW5tdG9pbi5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNley8v5beu5bCP5LqOMO+8jOS7o+ihqOi/measoeeahOaYn+aYn+aVsOmHj+avlOS5i+WJjeeahOaYn+aYn+aVsOmHj+WwkSBcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTAuODM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU3RhcmluZGV4PD1TdGFybnVtYmVyKXsvL+i/meS4quaYn+aYn+Wwj+S6juetieS6juS5i+WJjeaJk+eahOaYn+aYnyAgICDlsLHmmL7npLrlt7Lpooblj5ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmRfQmdfaGVpWyhTdGFyaW5kZXgtMSldLmFjdGl2ZT10cnVlLy/lt7Lpooblj5bnmoTpu5HluINcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eHRbKFN0YXJpbmRleC0xKV0uYWN0aXZlPXRydWUgICAvL+W3sumihuWPlueahOaWh+Wtl1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihTdGFyaW5kZXg+U3Rhcm51bWJlcil7Ly/ov5nkuKrmmJ/mmJ/lpKfkuo7nrYnkuo7kuYvliY3miZPnmoTmmJ/mmJ8gICDmnKrpooblj5ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmRfQmdfaGVpWyhTdGFyaW5kZXgtMSldLmFjdGl2ZT1mYWxzZS8v5bey6aKG5Y+W55qE6buR5biDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0WyhTdGFyaW5kZXgtMSldLmFjdGl2ZT1mYWxzZSAgIC8v5bey6aKG5Y+W55qE5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5qaWFuZ2xpLmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSxsZXZlbDMqMC4xKTtcclxuICAgICAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIC8vbGV0IGNvbnRlbnQ9c2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBsZXQgYWxsUmV3YXJkRGF0YT1uZXcgQXJyYXk8UmV3YXJkRGF0YT4oKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBubj1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXNzTnVtKHN0YXJ0TGV2ZWwpO1xyXG4gICAgICAgIC8vIC8v5L2T5YqbXHJcbiAgICAgICAgLy8gaWYobm49PTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICAvL0h0dHBNYW5hZ2VyLnBvc3RUb1VwbG9hZChVUkxfVFlQRS5yYW5rX3VwbG9hZCxQYXJhbXNfVHlwZS5yYW5rX21heF9sZXZlbCk7XHJcbiAgICAgICAgLy8gICAgIC8vQmF0dGxlUGFzc01hbmFnZXIuYWRkVG9kYXlUYXNrUHJvZ3Jlc3MoQmF0dGxlUGFzc1Rhc2suVW5sb2NrTWlzc2lvbik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgLy8gdGhpcy50YXNrWzBdLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChbMTQwMDA4LDE0MDAxNF0sXCJcIik7Ly8xNDAwMTQg5a6M5oiQICAgMTQwMDE15pyq5a6M5oiQXHJcbiAgICAgICAgLy8gdGhpcy50YXNrWzFdLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChbMTQwMDA5LDE0MDAxNF0sXCJcIik7Ly8xNDAwMTQg5a6M5oiQICAgMTQwMDE15pyq5a6M5oiQXHJcbiAgICAgICAgLy8gdGhpcy50YXNrWzJdLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChbMTQwMDEwLDE0MDAxNF0sXCJcIik7Ly8xNDAwMTQg5a6M5oiQICAgMTQwMDE15pyq5a6M5oiQXHJcbiAgICAgICAgdGhpcy5TY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKVxyXG5cclxuXHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTE7IGk8PTQ7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgIGlmKGpzb25EYXRhWydSZXdhcmRJdGVtXycraV0+MCAmJiBqc29uRGF0YVsnUmV3YXJkTnVtXycraV0+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAvLyAgICAgICAgIHJkLnJld2FyZF9pZD1qc29uRGF0YVsnUmV3YXJkSXRlbV8nK2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgcmQucmV3YXJkX251bT1qc29uRGF0YVsnUmV3YXJkTnVtXycraV07XHJcbiAgICAgICAgLy8gICAgICAgICBhbGxSZXdhcmREYXRhLnB1c2gocmQpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBsZW49YWxsUmV3YXJkRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQgcmV3YXJkRGF0YT1hbGxSZXdhcmREYXRhW2ldO1xyXG4gICAgICAgIC8vICAgICAvL+WPr+S7peiOt+W+l+WlluWTgVxyXG4gICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmREYXRhLnJld2FyZF9pZCxyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbS54PTkwK2kqNjA7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtLnk9MTUwO1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbS5zY2FsZT0xO1xyXG4gICAgICAgIC8vICAgICB9LGkqMC4xKTtcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v5oqK5YmN6Z2i55qE5rOi5pWw6K6+572u5Li65bey57uP6YCa6L+HXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8PWdtLmN1cl93YXZlOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXROb3RGaXJzdFBhc3NMZXZlbChzdGFydExldmVsLGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBhc3NfbGV2ZWxfbnVtKys7XHJcbiAgICAgICAgLy8gaWYoTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw8TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IFVwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwXCIpXHJcbiAgICAgICAgbGV0IElucz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJJbnNcIilcclxuICAgICAgICBsZXQgSW49dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiSW5cIilcclxuICAgICAgICBsZXQgRG93bj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJEb3duXCIpXHJcbiAgICAgICAgVXAuc2V0U2NhbGUoMCwwKVxyXG4gICAgICAgIFVwLnk9MTAwXHJcbiAgICAgICAgSW5zLnk9LTMwMFxyXG4gICAgICAgIElucy5vcGFjaXR5PTBcclxuICAgICAgICBJbi5vcGFjaXR5PTBcclxuICAgICAgICBEb3duLm9wYWNpdHk9MFxyXG4gICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ib21lXCIpLmFjdGl2ZT10cnVlXHJcblxyXG4gICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fU3RhcnRcIixmYWxzZSlcclxuICAgICAgICBjYy50d2VlbihVcCkvL+S4iumdoueahOe+veavm+aUvuWkp+WHuuadpVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDoxLjIsc2NhbGVZOjEuMn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihJbnMpLy/kuK3kuIrnmoTku7vliqHlh7rmnaVcclxuICAgICAgICAgICAgLnRvKDAuMjQsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgLnN0YXJ0KCkgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDowLjksc2NhbGVZOjAuOX0pLy/nvr3mr5vmlL7lsI9cclxuICAgICAgICAudG8oMC4yNiwgeyBzY2FsZVg6MSxzY2FsZVk6MX0pLy/nvr3mr5vmlL7lpKdcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v57695q+b5Yqo55S7XHJcbiAgICAgICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fTG9vcFwiLHRydWUpXHJcbiAgICAgICAgICAgIC8v5pif5pif5Yqo55S7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlN0YXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlN0YXJbaW5kZXhdLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFyYW5tdGlvbltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwwLjQ3KmluZGV4KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMS41KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihVcClcclxuICAgICAgICAgICAgLnRvKDAuMTYsIHt5IDo0MDB9KSAvL+e+veavm+S4iuWOu1xyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICBjYy50d2VlbihJbnMpXHJcbiAgICAgICAgICAgIC50bygwLjE2LCB7eSA6MH0pIC8v5Lu75Yqh5LiK5Y67XHJcbiAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMC4xNikvL+etieW+hVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4oSW4pLy/lpZblirHlh7rmnaVcclxuICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgLnN0YXJ0KCkgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgwLjMzKS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihpdG1lYW5tdG9pbi5sZW5ndGg9PTApey8v5aaC5p6c5rKh5pyJ5Y+v6aKG5Y+W55qE5aWW5Yqx55u05o6l5Ye65p2l5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihEb3duKVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpXHJcbiAgICAgICAgICAgICAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNley8v5omA5pyJ5Y+v6aKG5Y+W55qE5aWW5Yqx5pS+5aSn57yp5bCPLS0t5LiA6LW35pS+5aSn57yp5bCPICAgIOS5i+WQjuW8ueWHuuaMiemSriAgICBj5pyA5ZCO5by55paw5omL5pWZ56iLXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdG1lYW5tdGlvbmluZGV4ID0gMDsgaXRtZWFubXRpb25pbmRleCA8IGl0bWVhbm10b2luLmxlbmd0aDsgaXRtZWFubXRpb25pbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRtZWFubXRvaW5baXRtZWFubXRpb25pbmRleF0uc2NhbGU9MDtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpdG1lYW5tdG9pbltpdG1lYW5tdGlvbmluZGV4XSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoaXRtZWFubXRpb25pbmRleCowLjE3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0bWVhbm10aW9uaW5kZXg9PShpdG1lYW5tdG9pbi5sZW5ndGgtMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpdG1lYW5tdG9pbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oaXRtZWFubXRvaW5baW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4yMix7c2NhbGU6MC44MyswLjN9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC4xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4yMix7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PT0oaXRtZWFubXRvaW4ubGVuZ3RoLTEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjMzLCB7b3BhY2l0eSA6MjU1fSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCkgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1dG9yYWlscygpe1xyXG4gICAgICAgIGxldCBidG5Ib21lPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnRG93bicpLmdldENoaWxkQnlOYW1lKCdidG5Ib21lJyk7XHJcbiAgICAgICAgYnRuSG9tZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoJiZHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09NSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwNSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkU1NVSSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJld2FyZFNTVWkpLmluaXREYXRhKDEpO1xyXG4gICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMTQpKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBidG5Ib21lLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjE0LCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjExKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE0KTtcclxuICAgICAgICAgICAgLy8gICAgIH0sKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gfWVsc2UgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTMgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjEpKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMjEsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v6Lez6L2s5Yiw5ZWG5Zy6LEPniYjmnKwt5ZWG5Z+O5oub5Yuf5byA5ZCvXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jbGlja0J0bkhvbWUoKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBlbHNlIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT00ICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjMxKSlcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGJ0bkhvbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdEb3duJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkhvbWUnKTtcclxuICAgICAgICAgICAgLy8gICAgIGJ0bkhvbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMzEsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5LiL5LiA5YWzXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBlbHNlIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT01ICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjUzKSlcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjQxKTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDI1MSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyNTIpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoRnJvbUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDI1MywoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDI1Myk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGhlcm89R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoaGVybyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGhlcm8uaGlkZUhlcm8oKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaGVyby5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZGVsZXRlKEhlcm9fVHlwZS5Hb25nSmlhblNob3UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyNjEsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjYxKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9LG51bGwpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTcgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjEpKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMjEsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09OSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMykpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIyMyxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIzKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dFbmRsZXNzUmV3YXJkKCl7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLml6DlsL3mjJHmiJjog5zliKnnlYzpnaJcIilcclxuICAgICAgICBcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQ5peg5bC95oyR5oiY5qyh5pWwKTtcclxuICAgIFxyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL+m7keiJsuaYn+aYn+makOiXj1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkVuZF9TdGFyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkVuZF9TdGFyW2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pmpDol4/lhbPljaHmlbBcclxuICAgICAgICB0aGlzLmxhYmVsX2xldmVsLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8v5qCH6aKY5L+u5pS5XHJcbiAgICAgICAgdGhpcy53aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MDAwMjcpLy/lrozmiJDmjJHmiJhcclxuICAgICAgICAvL+acrOasoeaMkeaImOacgOmrmOazouasoX5cclxuICAgICAgICB0aGlzLkhpZ2hlc3R0eHQuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLkhpZ2hlc3R0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAyOClcclxuICAgICAgICBsZXQgQ2hhbGxlbmdlRGFtYWdlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLDApXHJcbiAgICAgICAgdGhpcy5IaWdoZXN0dHh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCkgKyAnJyk7XHJcbiAgICAgICAgLy/mmK/lkKbmmL7npLrmlrDnuqrlvZVcclxuXHJcblxyXG4gICAgICAgIGlmKENoYWxsZW5nZURhbWFnZT5FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFdhdmUoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuRmlyc3RfVGV4dF8xX0NOLmFjdGl2ZT10cnVlXHJcblxyXG4gICAgICAgICAgICBsZXQgdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICB0b3RhbG51bSsrXHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG5cclxuICAgICAgICAgICAgRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRXYXZlKENoYWxsZW5nZURhbWFnZSkvL+a4uOaIj+iDnOWIqeS5i+WQjuS/neWtmFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+WujOaIkOaXtuWIsOi+vueahOazouasoStDaGFsbGVuZ2VEYW1hZ2UpO1xyXG4gICAgICAgIC8v5Ymv5pys56Gu6K6k5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy50ZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMDEpXHJcbiAgICAgICAgbGV0IFVwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwXCIpXHJcbiAgICAgICAgbGV0IGVuZGxlc3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZW5kbGVzc1wiKVxyXG4gICAgICAgIGxldCBEb3duPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkRvd25cIilcclxuICAgICAgICBVcC5zZXRTY2FsZSgwLDApXHJcbiAgICAgICAgVXAueT0xMDBcclxuICAgICAgICBlbmRsZXNzLm9wYWNpdHk9MFxyXG4gICAgICAgIERvd24ub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi55PTcyXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJ0bkhvbWVcIikuYWN0aXZlPXRydWVcclxuICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICBVcC5nZXRDaGlsZEJ5TmFtZShcIldpblwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiV2luX1N0YXJ0XCIsZmFsc2UpXHJcbiAgICAgICAgbGV0IGNvbWJhdFBvd2VyPTBcclxuICAgICAgICBsZXQgc2VsZnJhbmtpbmcgPSAtMVxyXG4gICAgICAgIGNvbWJhdFBvd2VyID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLy/ojrflj5bms6LmlbBcclxuICAgICAgICBsZXQgQ29tYmF0UG93ZXIgPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiQ29tYmF0UG93ZXJcIilcclxuICAgICAgICBsZXQgU2VyaWFsTm8gPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiU2VyaWFsTm9cIilcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpXHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhciA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkUG9ydHJhaXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5BdmF0YXJcIilcclxuICAgICAgICBDb21iYXRQb3dlci5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQodGhpcy50ZXh0c1sxXSkvL+aYr+WTquS4quaOkuihjOamnFxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsIChjb21iYXRQb3dlcikgKyAnJyk7Ly/mjpLooYzmppzmiJjlipvmlbDmja5cclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUubGVhZGVyYm9hcmRCeVVzZXIsIHRoaXMuZ2V0TGVhZGVyYm9hcmRCeVVzZXJKc29uU3RyaW5nKDIpLCBmYWxzZSkudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXggPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtpbmRleF0udWlkPT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKXsgICAgLy/lpoLmnpzlnKjlkI7lj7Dmi4nlj5bnmoTmjpLlkI3kuK3mnIlpZOi3n+eOqeWutueahGlk5LiA5qC377yM6YKj5LmI546p5a6255qE5o6S5ZCN5Zyo5YmNMTAw5ZCN5LitICDlsIbmmL7npLrnjqnlrrbmjpLlkI0gICDlkKbliJnmmL7npLrmnKrkuIrmppxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmcmFua2luZz0oaW5kZXgrMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZnJhbmtpbmcgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIFNlcmlhbE5vLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIChzZWxmcmFua2luZykvL+W6j+WPt1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG15bmFtZSA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTsgLy/njqnlrrblkI3lrZdcclxuICAgICAgICBsZXQgc3BoZWEgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTsvL+eOqeWutuWktOWDj1xyXG4gICAgICAgIG5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgbXluYW1lLy/njqnlrrblkI3lrZdcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShzcGhlYSkvL+WktOWDj2lkXHJcbiAgICAgICAgLy/nlJ/miJDov5nmrKHmiYDojrflvpfnmoTlpZblirFcclxuICAgICAgICBlbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS54PTBcclxuICAgICAgICBlbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIikueD0wXHJcbiAgICAgICAgbGV0IG15aXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbShDaGFsbGVuZ2VEYW1hZ2UpLEVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtKENoYWxsZW5nZURhbWFnZSkpO1xyXG4gICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oQ2hhbGxlbmdlRGFtYWdlKSxFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bShDaGFsbGVuZ2VEYW1hZ2UpKTtcclxuICAgICAgICBteWl0ZW0ucGFyZW50PWVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpXHJcblxyXG4gICAgICAgIGlmKEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4V2F2ZSgpID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u5peg5bC95oyR5oiY5YiG5pWw5Yiw6L6+WOazouasoSkpe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuaXoOWwveaMkeaImOWIhuaVsOWIsOi+vljms6LmrKEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MudHdlZW4oVXApLy/kuIrpnaLnmoTnvr3mr5vmlL7lpKflh7rmnaVcclxuICAgICAgICAudG8oMC4yNCwgeyBzY2FsZVg6MS4yLHNjYWxlWToxLjJ9KVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDowLjksc2NhbGVZOjAuOX0pLy/nvr3mr5vmlL7lsI9cclxuICAgICAgICAudG8oMC4yNiwgeyBzY2FsZVg6MSxzY2FsZVk6MX0pLy/nvr3mr5vmlL7lpKdcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v57695q+b5Yqo55S7XHJcbiAgICAgICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fTG9vcFwiLHRydWUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMS41KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihVcClcclxuICAgICAgICAgICAgLnRvKDAuMTYsIHt5IDozMjd9KSAvL+e+veavm+S4iuWOu1xyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMTYpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGVuZGxlc3MpLy/lpZblirHlh7rmnaVcclxuICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgLnN0YXJ0KCkgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgwLjMzKS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgbXlpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRJdGVtKENoYWxsZW5nZURhbWFnZSksRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW0oQ2hhbGxlbmdlRGFtYWdlKSk7XHJcbiAgICAgICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgICAgICAvLyBteWl0ZW0ucGFyZW50PWVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbSlcclxuICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjAuODN9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihEb3duKVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpXHJcbiAgICAgICAgICAgICAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3dCb3NzQ2hhbGxlbmdlUmV3YXJkKCl7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJCT1NT5oyR5oiY6IOc5Yip55WM6Z2iXCIpXHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWujOaIkEJPU1PmjJHmiJjmrKHmlbApO1xyXG4gICAgICAgIC8v6buR6Imy5pif5pif6ZqQ6JePXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuRW5kX1N0YXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRW5kX1N0YXJbaW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+makOiXj+WFs+WNoeaVsFxyXG4gICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy/moIfpopjkv67mlLlcclxuICAgICAgICB0aGlzLndpblRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAyNykvL+WujOaIkOaMkeaImFxyXG4gICAgICAgIC8v5pys5qyh5oyR5oiY5pyA6auY5rOi5qyhflxyXG4gICAgICAgIHRoaXMuSGlnaGVzdHR4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuSGlnaGVzdHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODIwMDE4KVxyXG4gICAgICAgIGxldCBDaGFsbGVuZ2VEYW1hZ2U9Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfc2NvcmU7Ly9UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VEYW1hZ2UsMClcclxuICAgICAgICB0aGlzLkhpZ2hlc3R0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JyxDaGFsbGVuZ2VEYW1hZ2UgKyAnJyk7XHJcblxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VEYW1hZ2UsQ2hhbGxlbmdlRGFtYWdlKTtcclxuICAgICAgICAvL+aYr+WQpuaYvuekuuaWsOe6quW9lVxyXG4gICAgICAgIGxldCB6b249Q2hhbGxlbmdlRGFtYWdlK0Jvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsem9uLENoYWxsZW5nZURhbWFnZSxCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heERhbWFnZU51bWJlcigpKVxyXG4gICAgICAgIGxldCB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgIHRvdGFsbnVtKytcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcyx0b3RhbG51bSk7XHJcblxyXG4gICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RGFtYWdlTnVtYmVyKHpvbikvL+a4uOaIj+iDnOWIqeS5i+WQjuS/neWtmFxyXG4gICAgICAgIC8vIGlmKENoYWxsZW5nZURhbWFnZT5Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heERhbWFnZU51bWJlcigpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5GaXJzdF9UZXh0XzFfQ04uYWN0aXZlPXRydWVcclxuICAgICAgICAvLyAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXREYW1hZ2VOdW1iZXIoQ2hhbGxlbmdlRGFtYWdlKS8v5ri45oiP6IOc5Yip5LmL5ZCO5L+d5a2YXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL+WJr+acrOehruiupOaMiemSrlxyXG4gICAgICAgIHRoaXMudGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDAxKVxyXG4gICAgICAgIGxldCBVcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJVcFwiKVxyXG4gICAgICAgIGxldCBlbmRsZXNzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImVuZGxlc3NcIilcclxuICAgICAgICBsZXQgRG93bj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJEb3duXCIpXHJcbiAgICAgICAgVXAuc2V0U2NhbGUoMCwwKVxyXG4gICAgICAgIFVwLnk9MTAwXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJ0bkhvbWVcIikuYWN0aXZlPXRydWVcclxuICAgICAgICBlbmRsZXNzLm9wYWNpdHk9MFxyXG4gICAgICAgIERvd24ub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi55PTcyXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9TdGFydFwiLGZhbHNlKVxyXG4gICAgICAgIGxldCBjb21iYXRQb3dlcnM9MFxyXG4gICAgICAgIGxldCBzZWxmcmFua2luZyA9IC0xXHJcbiAgICAgICAgY29tYmF0UG93ZXJzID0gQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhEYW1hZ2VOdW1iZXIoKS8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCkvL+iOt+WPluS8pOWus1xyXG4gICAgICAgIGxldCBDb21iYXRQb3dlciA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJDb21iYXRQb3dlclwiKVxyXG4gICAgICAgIGxldCBTZXJpYWxObyA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJTZXJpYWxOb1wiKVxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIilcclxuICAgICAgICBsZXQgYnRuQXZhdGFyID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh0aGlzLnRleHRzWzJdKS8v5piv5ZOq5Liq5o6S6KGM5qacXHJcbiAgICAgICAgQ29tYmF0UG93ZXIuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywgKGNvbWJhdFBvd2VycykgKyAnJyk7Ly/mjpLooYzmppzmiJjlipvmlbDmja5cclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUubGVhZGVyYm9hcmRCeVVzZXIsIHRoaXMuZ2V0TGVhZGVyYm9hcmRCeVVzZXJKc29uU3RyaW5nKDMpLCBmYWxzZSkudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXggPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtpbmRleF0udWlkPT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKXsgICAgLy/lpoLmnpzlnKjlkI7lj7Dmi4nlj5bnmoTmjpLlkI3kuK3mnIlpZOi3n+eOqeWutueahGlk5LiA5qC377yM6YKj5LmI546p5a6255qE5o6S5ZCN5Zyo5YmNMTAw5ZCN5LitICDlsIbmmL7npLrnjqnlrrbmjpLlkI0gICDlkKbliJnmmL7npLrmnKrkuIrmppxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmcmFua2luZz0oaW5kZXgrMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZnJhbmtpbmcgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIFNlcmlhbE5vLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIChzZWxmcmFua2luZykvL+W6j+WPt1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG15bmFtZSA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTsgLy/njqnlrrblkI3lrZdcclxuICAgICAgICBsZXQgc3BoZWEgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTsvL+eOqeWutuWktOWDj1xyXG4gICAgICAgIG5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgbXluYW1lLy/njqnlrrblkI3lrZdcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShzcGhlYSkvL+WktOWDj2lkXHJcbiAgICAgICAgLy/nlJ/miJDov5nmrKHmiYDojrflvpfnmoTlpZblirFcclxuICAgICAgICBsZXQgZGF0YT1Cb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5U2NvcmUoQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUsQ2hhbGxlbmdlRGFtYWdlKTtcclxuICAgICAgICBlbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS54PS04MFxyXG4gICAgICAgIGVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS54PTgwXHJcblxyXG4gICAgICAgIGxldCBteWl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKSxCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bShkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpKTtcclxuICAgICAgICBteWl0ZW0uc2NhbGU9MDtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRJdGVtKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCksQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW0oZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJhf5a6M5oiQ5pe25ou/5Yiw55qE5aWW5Yqx57qn5YirK2RhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCk7XHJcblxyXG4gICAgICAgIG15aXRlbS5wYXJlbnQ9ZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIilcclxuXHJcbiAgICAgICAgbGV0IG15aXRlbTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW1fMihkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpLEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtXzIoZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKSk7XHJcbiAgICAgICAgbXlpdGVtMS5zY2FsZT0wO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW1fMihkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpLEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtXzIoZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbXlpdGVtMS5wYXJlbnQ9ZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW0xXCIpXHJcblxyXG4gICAgICAgIGlmKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKCkgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS5ib3Nz54up54yO5YiG5pWw5Yiw6L6+WOS8pOWusykpe1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLmJvc3Pni6nnjI7liIbmlbDliLDovr5Y5Lyk5a6zKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjYy50d2VlbihVcCkvL+S4iumdoueahOe+veavm+aUvuWkp+WHuuadpXNcclxuICAgICAgICAudG8oMC4yNCwgeyBzY2FsZVg6MS4yLHNjYWxlWToxLjJ9KVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDowLjksc2NhbGVZOjAuOX0pLy/nvr3mr5vmlL7lsI9cclxuICAgICAgICAudG8oMC4yNiwgeyBzY2FsZVg6MSxzY2FsZVk6MX0pLy/nvr3mr5vmlL7lpKdcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v57695q+b5Yqo55S7XHJcbiAgICAgICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fTG9vcFwiLHRydWUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMS41KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihVcClcclxuICAgICAgICAgICAgLnRvKDAuMTYsIHt5IDozMjd9KSAvL+e+veavm+S4iuWOu1xyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMTYpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGVuZGxlc3MpLy/lpZblirHlh7rmnaVcclxuICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgLnN0YXJ0KCkgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgwLjMzKS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgbXlpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRJdGVtKENoYWxsZW5nZURhbWFnZSksRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW0oQ2hhbGxlbmdlRGFtYWdlKSk7XHJcbiAgICAgICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgICAgICBteWl0ZW0xLnNjYWxlPTA7XHJcbiAgICAgICAgICAgIC8vIG15aXRlbS5wYXJlbnQ9ZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIilcclxuICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtKVxyXG4gICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbTEpXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZToxfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihteWl0ZW0xKVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZToxfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1R1dG9yYWlscygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLy8gbGV0IHNjcm9sbFZpZXc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKTtcclxuICAgICAgICAvLyBsZXQgY29udGVudD1zY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIC8vIGxldCBtb2RlPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlO1xyXG4gICAgICAgIC8vIGxldCBzY29yZT1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZTtcclxuICAgICAgICAvLyBsZXQgYWxsUmV3YXJkRGF0YT1Cb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJvc3NSZXdhcmQobW9kZSxzY29yZSk7XHJcbiAgICAgICAgLy8gbGV0IGxlbj1hbGxSZXdhcmREYXRhLmxlbmd0aDtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXdhcmREYXRhPWFsbFJld2FyZERhdGFbaV07XHJcbiAgICAgICAgLy8gICAgIC8v5Y+v5Lul6I635b6X5aWW5ZOBXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB9LGkqMC4xKTtcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgIC8v546p5a6257uP6aqMXHJcbiAgICAgICAgLy8gICAgIGlmKHJld2FyZERhdGEucmV3YXJkX2lkPT1Qcm9wSWQuVXNlckV4cCYmcmV3YXJkRGF0YS5yZXdhcmRfbnVtPjApe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93VXNlckV4cEFuaW1hdGlvbihyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUJvc3NDaGFsbGVuZ2VTdGFnZShtb2RlLHNjb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VG93ZXJSZXdhcmQoKXtcclxuICAgICAgICBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIGxldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy/mt7vliqDph5HluIHnrYnotYTmupDliJfooahcclxuICAgICAgICBsZXQgcmV3YXJkRGF0YT1Ub3dlclJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhcyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpLTEpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHJld2FyZERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmQ9cmV3YXJkRGF0YVtpXTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSkpO1xyXG4gICAgICAgICAgICB9LGkqMC4xKTtcclxuICAgICAgICAgICAgLy/njqnlrrbnu4/pqoxcclxuICAgICAgICAgICAgaWYocmQucmV3YXJkX2lkPT1Qcm9wSWQuVXNlckV4cCYmcmQucmV3YXJkX251bT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VzZXJFeHBBbmltYXRpb24ocmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXI9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF6ZVJld2FyZCgpe1xyXG5cclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuiZmuepuuijgue8neiDnOWIqeeVjOmdolwiKSAgXHJcbiAgICAgICAgbGV0IGlkPSBUaW1lcy52b2lkc2Vuc2lkXHJcbiAgICAgICAgbGV0IEhleGFnb25UeXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKGlkKVxyXG4gICAgICAgIGxldCBMYXllcnM9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGF5ZXJzKGlkKVxyXG4gICAgICAgIGlmKEhleGFnb25UeXBlPT01KXsvL+WmguaenOaJk+WujGJvc3PkuobvvIzku6Pooajov5nkuIDlsYLlroznu5PkuoZcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgaWYoTGF5ZXJzPmRhbWFnZSl7XHJcbiAgICAgICAgICAgICAgICBkYW1hZ2U9TGF5ZXJzXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VEYW1hZ2UsZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhbWFnZSA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLuiZmuepuuaOoumZqemAmui/h+esrFjnq6ApKXtcclxuICAgICAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuiZmuepuuaOoumZqemAmui/h+esrFjnq6ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6buR6Imy5pif5pif6ZqQ6JePXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuRW5kX1N0YXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRW5kX1N0YXJbaW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+makOiXj+WFs+WNoeaVsFxyXG4gICAgICAgIGxldCB4YWdvblR5cGU9IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKFRpbWVzLnZvaWRzZW5zaWQpXHJcbiAgICAgICAgaWYoeGFnb25UeXBlPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9sZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMDIpOy8v5pmu6YCa5oiY5b25XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHhhZ29uVHlwZT09Myl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDAzKTsvL+eyvuiLseaImOW9uVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih4YWdvblR5cGU9PTUpe1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2xldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAwNCk7Ly9ib3Nz5oiY5b25XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuYWN0aXZlPXRydWVcclxuICAgICAgICAvL+agh+mimOS/ruaUuVxyXG4gICAgICAgIHRoaXMud2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDI3KS8v5a6M5oiQ5oyR5oiYXHJcblxyXG4gICAgICAgIC8v5Ymv5pys56Gu6K6k5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy50ZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMDEpXHJcbiAgICAgICAgbGV0IFVwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwXCIpXHJcbiAgICAgICAgbGV0IHZvaWRzZW5zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZvaWRzZW5zXCIpXHJcbiAgICAgICAgbGV0IERvd249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiRG93blwiKVxyXG4gICAgICAgIFVwLnNldFNjYWxlKDAsMClcclxuICAgICAgICBVcC55PTEwMFxyXG4gICAgICAgIHZvaWRzZW5zLm9wYWNpdHk9MFxyXG4gICAgICAgIERvd24ub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi55PTE2N1xyXG4gICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ib21lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fU3RhcnRcIixmYWxzZSlcclxuXHJcbiAgICAgICAgLy/nlJ/miJDov5nmrKHmiYDojrflvpfnmoTlpZblirFcclxuICAgICAgICBsZXQgUHJvcDFfSUQ9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMV9JRChUaW1lcy52b2lkc2Vuc2lkKVxyXG4gICAgICAgIGxldCBQcm9wMV9TdW09Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMV9TdW0oVGltZXMudm9pZHNlbnNpZClcclxuICAgICAgICBsZXQgUHJvcDJfSUQ9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMl9JRChUaW1lcy52b2lkc2Vuc2lkKVxyXG4gICAgICAgIGxldCBQcm9wMl9TdW09Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMl9TdW0oVGltZXMudm9pZHNlbnNpZClcclxuICAgICAgICBsZXQgcmQ9SmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChQcm9wMl9JRCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgbXlpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcDFfSUQsUHJvcDFfU3VtKTtcclxuICAgICAgICBteWl0ZW0uc2NhbGU9MDtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcDFfSUQsUHJvcDFfU3VtKTtcclxuICAgICAgICBteWl0ZW0ucGFyZW50PXZvaWRzZW5zLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIilcclxuXHJcbiAgICAgICAgbGV0IG15aXRlbTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZC5yZXdhcmRfaWQsUHJvcDJfU3VtKTtcclxuICAgICAgICBteWl0ZW0xLnNjYWxlPTA7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJkLnJld2FyZF9pZCxQcm9wMl9TdW0pO1xyXG4gICAgICAgIG15aXRlbTEucGFyZW50PXZvaWRzZW5zLmdldENoaWxkQnlOYW1lKFwiaXRlbTJcIilcclxuXHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKFVwKS8v5LiK6Z2i55qE57695q+b5pS+5aSn5Ye65p2lXHJcbiAgICAgICAgLnRvKDAuMjQsIHsgc2NhbGVYOjEuMixzY2FsZVk6MS4yfSlcclxuICAgICAgICAudG8oMC4yNCwgeyBzY2FsZVg6MC45LHNjYWxlWTowLjl9KS8v57695q+b5pS+5bCPXHJcbiAgICAgICAgLnRvKDAuMjYsIHsgc2NhbGVYOjEsc2NhbGVZOjF9KS8v57695q+b5pS+5aSnXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+e+veavm+WKqOeUu1xyXG4gICAgICAgICAgICBVcC5nZXRDaGlsZEJ5TmFtZShcIldpblwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiV2luX0xvb3BcIix0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDEuNSkvL+etieW+hVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4oVXApXHJcbiAgICAgICAgICAgIC50bygwLjE2LCB7eSA6MzI3fSkgLy/nvr3mr5vkuIrljrtcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgwLjE2KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih2b2lkc2VucykvL+WlluWKseWHuuadpVxyXG4gICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAuc3RhcnQoKSAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMzMpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgICAgICBteWl0ZW0xLnNjYWxlPTA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbSlcclxuICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjAuODN9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihteWl0ZW0xKVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjAuODN9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihteWl0ZW0xKVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZToxfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZToxfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKSAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93VW5sb2NrSGVybygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/liKTmlq3oi7Hpm4TmmK/lkKbmlrDop6PplIFcclxuICAgICAgICBmb3IobGV0IGk9SGVyb19UeXBlLlBhb1Nob3U7IGk8SGVyb19UeXBlLkhlcm9fTnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChpKT4wICYmIEhlcm9NYW5hZ2VyLmdldEhlcm9Jc05lZWRUaXAoaSk9PXRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRIZXJvVWkoaSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlYWtGdW5jVW5sb2NrKCl7XHJcbiAgICAvLyAgICAgbGV0IHVubG9ja0lkcz1uZXcgQXJyYXkoKTtcclxuICAgIC8vICAgICBsZXQgZmRtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBsZXQgZmluaXNoTGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT1GdW5jX1R5cGUuTGlDaGVuZ0JlaTsgaTxGdW5jX1R5cGUuTnVtOyBpKyspe1xyXG4gICAgLy8gICAgICAgICBsZXQganNvbkRhdGE9ZmRtLmdldEpzb25GdW5jdGlvbkRlZmluaXRpb24oaSk7XHJcbiAgICAvLyAgICAgICAgIGxldCB0eXBlPWpzb25EYXRhLlVubG9ja0NvbmRpdGlvblR5cGU7XHJcbiAgICAvLyAgICAgICAgIGxldCB2YWx1ZT1qc29uRGF0YS5VbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyO1xyXG4gICAgLy8gICAgICAgICBpZih0eXBlPT0yKXtcclxuICAgIC8vICAgICAgICAgICAgIGlmKGZpbmlzaExldmVsPj12YWx1ZSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbmj5DnpLrov4dcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEZ1bmNIaW50KGkpPD0wKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdW5sb2NrSWRzLnB1c2goaSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8v55uu5YmN6Kej6ZSB55qEXHJcbiAgICAvLyAgICAgaWYodW5sb2NrSWRzLmxlbmd0aD4wKXtcclxuICAgIC8vICAgICAgICAgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5zYXZlRnVuY0xpc3QodW5sb2NrSWRzKTtcclxuICAgIC8vICAgICAgICAgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5jaGVha0Z1bmNVbmxvY2soKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2hlYWtVc2VyTGV2ZWwoKXtcclxuICAgICAgICBcclxuICAgIH0gICAgXHJcblxyXG4gICAgZ2V0TmFtZUJ5VHlwZSh0eXBlOkdvX1R5cGUpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCBuYW1lPScnO1xyXG4gICAgICAgIGxldCBsbT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2godHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluOiBuYW1lPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LmZpZ2h0aW5nKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX0VuZW15SW5mbzogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5Nb25zdGVyTWFudWFsKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX01pbGVzdG9uZTogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5NaWxlc3RvbmUpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fU2lnbjogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5TaWduX2luKTs7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TcGluOiBuYW1lPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lkx1Y2t5X1NwaW4pOzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1Rhc2s6IG5hbWU9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguRGFpbHlfdGFzayk7OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLlJvbGU6IG5hbWU9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguaGVybyk7OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLlBldExpc3Q6IG5hbWU9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguc2hvcCk7OyBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuSG9tZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKE1hcE1hbmFnZXIuQ3VycmVudGxldmVsKzEpPE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsPU1hcE1hbmFnZXIuQ3VycmVudGxldmVsKzFcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spOyAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRIZXJvQmluZCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVmlkZW8oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGJ0blZpZGVvPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuVmlkZW8nKTtcclxuICAgICAgICBidG5WaWRlby5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgQWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKChpc1N1Yzpib29sZWFuKT0+e1xyXG4gICAgICAgICAgICBpZihpc1N1Yz09dHJ1ZSlcclxuICAgICAgICAgICAgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/ph5HluIF4M1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvaW49TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NSZXdhcmRfQ29pbihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sY29pbiozKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLGNvaW4qMykpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVGhlX2FkX2ZhaWxlZF90b19wbGF5X2FuZF90aGVfcmV3YXJkX2Nhbm5vdF9iZV9vYnRhaW5lZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxWSURFT19UWVBFLkNvaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTmV4dCgpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46eyAgICAgXHJcbiAgICAgICAgICAgICAgICBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbCsxICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dExldmVsPU1hcE1hbmFnZXIuQ3VycmVudGxldmVsOyAgIC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwrMTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYobmV4dExldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMjEpLDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLkvaDlpKrljonlrrPllabvvIzmtYvor5XniYjmnKzmmoLml7bmsqHmnInkuobvvIzmlazor7fmnJ/lvoXlkI7nu63niYjmnKzvvIHorrDlvpfliqBpZFwiLDMpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobmV4dExldmVsPD0oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzEpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1uZXh0TGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5maWdodGluZ19pbmZvPVR1dG9yaWFsTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1uZXh0TGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5maWdodGluZ19pbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgaWYoVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKTxUb3dlckxldmVsTWFuYWdlci5nZXRNYXhGbG9vcigpKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eV9FbmRsZXNzO1xyXG4gICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eV9Cb3NzO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIGxldCBpZD0gVGltZXMudm9pZHNlbnNpZFxyXG4gICAgICAgICAgICAgICAgbGV0IEhleGFnb25UeXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKGlkKVxyXG4gICAgICAgICAgICAgICAgaWYoSGV4YWdvblR5cGU9PTUpey8v5aaC5p6c5omT5a6MYm9zc+S6hu+8jOS7o+ihqOi/meS4gOWxguWujOe7k+S6hlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBkYW1hZ2U9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VEYW1hZ2UsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGFtYWdlKytcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZihkYW1hZ2U+OCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhbWFnZT04XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSxkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHlfTWF6ZV9sb3NlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eV9NYXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Paygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eTtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXplVWkoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuU3RhdHMoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEYW1hZ2VTdGF0c1VpKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldExlYWRlcmJvYXJkQnlVc2VySnNvblN0cmluZyh0eXBlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGxpbWl0OiAxMDAsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19